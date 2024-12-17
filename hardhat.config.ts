import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    mantleSepolia: {
      url: process.env.MANTLE_SEPOLIA_RPC || "https://rpc.sepolia.mantle.xyz",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      gasPrice: 20000000, // 0.02 gwei
    }
  }
};

export default config;