const ethers = require('ethers');

class MosaicRegistryClient {
  constructor(registryAddress, providerOrSigner) {
    this.registryAddress = registryAddress;
    this.contract = new ethers.Contract(
      registryAddress,
      [
        "function recordDeployment(address contractAddress, string memory contractType, bytes32 sourceCodeHash) external returns (uint256)",
        "function getContractData(uint256 deploymentId) external view returns (tuple(address contractAddress, address deployer, string contractType, uint256 deploymentTime, bytes32 sourceCodeHash, bool verified))",
        "function getDeployerContracts(address deployer) external view returns (uint256[])",
        "function totalDeployments() external view returns (uint256)"
      ],
      providerOrSigner
    );
  }

  async recordDeployment(contractAddress, contractType, sourceCode) {
    const sourceCodeHash = ethers.utils.keccak256(
      ethers.utils.toUtf8Bytes(sourceCode)
    );

    const tx = await this.contract.recordDeployment(
      contractAddress,
      contractType,
      sourceCodeHash,
      {
        gasPrice: ethers.utils.parseUnits('0.02', 'gwei')
      }
    );

    const receipt = await tx.wait();
    const event = receipt.events.find(e => e.event === 'ContractDeployed');
    return event.args.deploymentId;
  }

  async getContractData(deploymentId) {
    return await this.contract.getContractData(deploymentId);
  }

  async getDeployerContracts(deployerAddress) {
    return await this.contract.getDeployerContracts(deployerAddress);
  }

  async getTotalDeployments() {
    return await this.contract.totalDeployments();
  }
}

module.exports = MosaicRegistryClient;