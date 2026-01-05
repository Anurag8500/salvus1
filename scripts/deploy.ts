import { ethers } from "hardhat";

async function main() {
  const USDC_ADDRESS = process.env.MOCK_USDC_ADDRESS;
  const PAYOUT_WALLET = "0xe92468aeDF0Fe4764a5115EfBf2a494fCF1Ff990";

  if (!USDC_ADDRESS) {
    throw new Error("MOCK_USDC_ADDRESS not set in .env");
  }

  const SalvusEscrow = await ethers.getContractFactory("SalvusEscrow");

  const contract = await SalvusEscrow.deploy(
    USDC_ADDRESS,
    PAYOUT_WALLET
  );

  await contract.waitForDeployment();

  const contractAddress = await contract.getAddress();

  console.log("✅ SalvusEscrow deployed to:", contractAddress);
  console.log("👉 Save this address in .env / .env.local");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
