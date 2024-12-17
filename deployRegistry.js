require('dotenv').config();
const ethers = require('ethers');
const fs = require('fs');

// Load contract ABI & bytecode
const contractArtifact = JSON.parse(fs.readFileSync('./MosaicRegistry.json'));

async function main() {
  try {
    // Connect to Mantle Sepolia
    const provider = new ethers.providers.JsonRpcProvider(process.env.MANTLE_SEPOLIA_RPC);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    
    console.log('Deploying MosaicRegistry to Mantle Sepolia...');
    console.log('Deployer address:', wallet.address);

    // Deploy contract
    const MosaicRegistry = new ethers.ContractFactory(
      contractArtifact.abi,
      contractArtifact.bytecode,
      wallet
    );

    const mosaicRegistry = await MosaicRegistry.deploy({
      gasPrice: ethers.utils.parseUnits('0.02', 'gwei'), // Mantle recommended gas price
    });

    console.log('Waiting for deployment...');
    await mosaicRegistry.deployed();

    console.log('MosaicRegistry deployed to:', mosaicRegistry.address);

    // Save deployment info
    const deploymentInfo = {
      network: 'mantle-sepolia',
      address: mosaicRegistry.address,
      timestamp: new Date().toISOString(),
      deployer: wallet.address
    };

    fs.writeFileSync(
      './deployment.json',
      JSON.stringify(deploymentInfo, null, 2)
    );

    console.log('Deployment info saved to deployment.json');
    
    // Verify deployment by calling a view function
    const totalDeployments = await mosaicRegistry.totalDeployments();
    console.log('Contract verified - Total deployments:', totalDeployments.toString());

  } catch (error) {
    console.error('Deployment failed:', error);
    process.exit(1);
  }
}

main();