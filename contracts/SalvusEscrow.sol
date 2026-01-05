// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title IERC20
 * @dev Minimal interface for ERC20 token interaction.
 */
interface IERC20 {
    function transfer(address recipient, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

/**
 * @title SalvusEscrow
 * @author Salvus Engineering
 * @notice A simplified, secure escrow contract for disaster relief payments.
 * @dev Holds USDC and releases it to a fixed payout wallet based on beneficiary allocation limits.
 *      Removes complexity: No categories, no on-chain verification steps, just strict allocation limits.
 */
contract SalvusEscrow {
    // =============================================================
    //                           STATE VARIABLES
    // =============================================================

    /// @notice The ERC-20 token used for payments (e.g., USDC)
    IERC20 public immutable usdcToken;

    /// @notice The admin/owner who manages allocations (cannot withdraw funds)
    address public immutable owner;

    /// @notice The fixed destination wallet for all released payments (store aggregator/treasury)
    address public immutable payoutWallet;

    struct Beneficiary {
        uint256 totalAllocation;
        uint256 totalSpent;
    }

    /// @notice Stores allocation and spending data for each beneficiary
    mapping(address => Beneficiary) public beneficiaries;

    // =============================================================
    //                               EVENTS
    // =============================================================

    event DonationReceived(address indexed donor, uint256 amount);
    event AllocationSet(address indexed beneficiary, uint256 allocation);
    event PaymentReleased(address indexed beneficiary, address indexed payoutWallet, uint256 amount);

    // =============================================================
    //                             MODIFIERS
    // =============================================================

    modifier onlyOwner() {
        require(msg.sender == owner, "SalvusEscrow: Caller is not the owner");
        _;
    }

    // =============================================================
    //                            CONSTRUCTOR
    // =============================================================

    /**
     * @param _usdcToken Address of the ERC-20 token contract.
     * @param _payoutWallet Address of the authorized payout wallet.
     */
    constructor(address _usdcToken, address _payoutWallet) {
        require(_usdcToken != address(0), "SalvusEscrow: Invalid token address");
        require(_payoutWallet != address(0), "SalvusEscrow: Invalid payout wallet");
        
        owner = msg.sender;
        usdcToken = IERC20(_usdcToken);
        payoutWallet = _payoutWallet;
    }

    // =============================================================
    //                          ADMIN FUNCTIONS
    // =============================================================

    /**
     * @notice Sets or updates the total allocation limit for a beneficiary.
     * @dev Acts as both onboarding and limit management. Setting to 0 effectively disables the beneficiary.
     * @param _beneficiary Address of the beneficiary.
     * @param _allocation Total amount of tokens this beneficiary is allowed to spend.
     */
    function setAllocation(address _beneficiary, uint256 _allocation) external onlyOwner {
        require(_beneficiary != address(0), "SalvusEscrow: Invalid beneficiary address");
        
        beneficiaries[_beneficiary].totalAllocation = _allocation;
        
        emit AllocationSet(_beneficiary, _allocation);
    }

    // =============================================================
    //                        CORE FUNCTIONALITY
    // =============================================================

    /**
     * @notice Allows donors to donate tokens to the escrow.
     * @dev Requires approval of tokens to this contract first.
     * @param _amount Amount of tokens to donate.
     */
    function donate(uint256 _amount) external {
        require(_amount > 0, "SalvusEscrow: Amount must be > 0");
        
        bool success = usdcToken.transferFrom(msg.sender, address(this), _amount);
        require(success, "SalvusEscrow: Donation transfer failed");
        
        emit DonationReceived(msg.sender, _amount);
    }

    /**
     * @notice Requests a payment release to the payout wallet.
     * @dev Checks against the caller's allocation limit. Funds go to payoutWallet, not caller.
     * @param _amount Amount of tokens requested.
     */
    function requestPayment(uint256 _amount) external {
        require(_amount > 0, "SalvusEscrow: Amount must be > 0");
        
        Beneficiary storage ben = beneficiaries[msg.sender];
        
        // Check 1: Allocation Limit
        require(
            ben.totalSpent + _amount <= ben.totalAllocation,
            "SalvusEscrow: Allocation limit exceeded"
        );

        // Check 2: Contract Balance
        uint256 contractBalance = usdcToken.balanceOf(address(this));
        require(contractBalance >= _amount, "SalvusEscrow: Insufficient contract balance");

        // Effect: Update state before interaction (Checks-Effects-Interactions)
        ben.totalSpent += _amount;

        // Interaction: Transfer funds to payout wallet
        bool success = usdcToken.transfer(payoutWallet, _amount);
        require(success, "SalvusEscrow: Payment transfer failed");

        emit PaymentReleased(msg.sender, payoutWallet, _amount);
    }

    // =============================================================
    //                          VIEW FUNCTIONS
    // =============================================================

    /**
     * @notice Returns the remaining allocation for a beneficiary.
     * @param _beneficiary Address of the beneficiary.
     */
    function getRemainingAllocation(address _beneficiary) external view returns (uint256) {
        Beneficiary memory ben = beneficiaries[_beneficiary];
        if (ben.totalSpent >= ben.totalAllocation) {
            return 0;
        }
        return ben.totalAllocation - ben.totalSpent;
    }
}
