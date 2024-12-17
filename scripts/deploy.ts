import { ethers } from "hardhat";

async function main() {
  console.log("Deploying MosaicRegistry...");

  const MosaicRegistry = await ethers.getContractFactory("MosaicRegistry");
  const registry = await MosaicRegistry.deploy();

  // Wait for the deployment transaction to be mined
  await registry.waitForDeployment();

  // Get the deployed contract address
  const address = await registry.getAddress();
  
  console.log(`MosaicRegistry deployed to ${address}`);
  
  // Save deployment info - update the saveDeployment import and function call accordingly
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});