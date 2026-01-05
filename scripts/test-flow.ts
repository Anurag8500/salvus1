import { ethers } from "hardhat";

const ESCROW = process.env.ESCROW_ADDRESS!;
const USDC = process.env.MOCK_USDC_ADDRESS!;
const BENEFICIARY = "0x4826daC76bb3efAeb152720100b37B548EA3a514";

async function main() {
  const [admin] = await ethers.getSigners();

  const escrow = await ethers.getContractAt("SalvusEscrow", ESCROW);
  const usdc = await ethers.getContractAt("MockUSDC", USDC);

  // 🔢 USDC has 6 decimals
  const ALLOCATION = ethers.parseUnits("2000", 6); // 2000 USDC
  const DONATION   = ethers.parseUnits("1000", 6); // 1000 USDC
  const REQUEST    = ethers.parseUnits("200", 6);  // 200 USDC

  console.log("Admin:", admin.address);
  console.log("Beneficiary:", BENEFICIARY);

  // =============================================================
  // 1️⃣ Set allocation
  // =============================================================
  const allocTx = await escrow.setAllocation(BENEFICIARY, ALLOCATION);
  await allocTx.wait();
  console.log("✅ Allocation set");

  // =============================================================
  // 2️⃣ Approve escrow to pull USDC
  // =============================================================
  const approveTx = await usdc.approve(ESCROW, DONATION);
  await approveTx.wait();

  const allowance = await usdc.allowance(admin.address, ESCROW);
  console.log("Allowance before donate:", allowance.toString());

  // =============================================================
  // 3️⃣ Donate USDC to escrow
  // =============================================================
  const donateTx = await escrow.donate(DONATION);
  await donateTx.wait();
  console.log("✅ Donated USDC");

  // =============================================================
  // 4️⃣ Beneficiary requests payment
  // =============================================================
  const beneficiarySigner = new ethers.Wallet(
    process.env.BENEFICIARY_PRIVATE_KEY!,
    ethers.provider
  );

  const payTx = await escrow
    .connect(beneficiarySigner)
    .requestPayment(REQUEST);

  await payTx.wait();
  console.log("✅ Payment released");

  // =============================================================
  // 5️⃣ Remaining allocation
  // =============================================================
  const remaining = await escrow.getRemainingAllocation(BENEFICIARY);
  console.log(
    "Remaining allocation:",
    ethers.formatUnits(remaining, 6),
    "USDC"
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
