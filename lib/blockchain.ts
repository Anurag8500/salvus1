import { ethers } from "ethers";
import SalvusEscrowABI from "@/artifacts/contracts/SalvusEscrow.sol/SalvusEscrow.json";

export const provider = new ethers.JsonRpcProvider(
  process.env.RPC_URL
);

export const signer = new ethers.Wallet(
  process.env.PRIVATE_KEY!,
  provider
);

export const escrowContract = new ethers.Contract(
  process.env.ESCROW_ADDRESS!,
  (SalvusEscrowABI as any).abi,
  signer
);
