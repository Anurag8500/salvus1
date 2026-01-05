import { ethers } from "hardhat";

async function main() {
  const MockUSDC = await ethers.getContractFactory("MockUSDC");
  const usdc = await MockUSDC.deploy();

  await usdc.waitForDeployment();

  const usdcAddress = await usdc.getAddress();

  console.log("✅ Mock USDC deployed to:", usdcAddress);
  console.log("👉 Save this address in .env as MOCK_USDC_ADDRESS");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
