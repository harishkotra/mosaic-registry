// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

/**
 * @title MosaicRegistry
 * @dev Tracks all smart contracts deployed through the Mosaic platform
 */
contract MosaicRegistry is Ownable, Pausable {
    // Structs
    struct ContractData {
        address contractAddress;      // Address of deployed contract
        address deployer;            // Address that deployed the contract
        string contractType;         // Type of contract (e.g. "ERC20", "MetaTx", etc)
        uint256 deploymentTime;      // Timestamp of deployment
        bytes32 sourceCodeHash;      // Hash of source code used for deployment
        bool verified;               // Whether contract has been verified
    }

    // State variables
    uint256 public totalDeployments;
    mapping(uint256 => ContractData) public contracts;        // deploymentId => ContractData
    mapping(address => uint256[]) public deployerContracts;   // deployer => array of their deployment IDs
    mapping(string => uint256[]) public contractsByType;      // contractType => array of deployment IDs
    
    // Events
    event ContractDeployed(
        uint256 indexed deploymentId,
        address indexed contractAddress,
        address indexed deployer,
        string contractType,
        uint256 deploymentTime,
        bytes32 sourceCodeHash
    );

    event ContractVerified(
        uint256 indexed deploymentId,
        address indexed contractAddress,
        address verifier
    );

    /**
     * @dev Records a new contract deployment
     * @param contractAddress The address of the deployed contract
     * @param contractType The type of contract deployed
     * @param sourceCodeHash Hash of the source code used for deployment
     */
    function recordDeployment(
        address contractAddress,
        string memory contractType,
        bytes32 sourceCodeHash
    ) external whenNotPaused returns (uint256) {
        require(contractAddress != address(0), "Invalid contract address");
        require(bytes(contractType).length > 0, "Contract type required");

        uint256 deploymentId = totalDeployments + 1;

        ContractData memory newContract = ContractData({
            contractAddress: contractAddress,
            deployer: msg.sender,
            contractType: contractType,
            deploymentTime: block.timestamp,
            sourceCodeHash: sourceCodeHash,
            verified: false
        });

        contracts[deploymentId] = newContract;
        deployerContracts[msg.sender].push(deploymentId);
        contractsByType[contractType].push(deploymentId);
        
        totalDeployments = deploymentId;

        emit ContractDeployed(
            deploymentId,
            contractAddress,
            msg.sender,
            contractType,
            block.timestamp,
            sourceCodeHash
        );

        return deploymentId;
    }

    /**
     * @dev Marks a contract as verified
     * @param deploymentId The ID of the deployment to verify
     */
    function verifyContract(uint256 deploymentId) external onlyOwner {
        require(deploymentId <= totalDeployments, "Invalid deployment ID");
        require(!contracts[deploymentId].verified, "Already verified");

        contracts[deploymentId].verified = true;

        emit ContractVerified(
            deploymentId,
            contracts[deploymentId].contractAddress,
            msg.sender
        );
    }

    /**
     * @dev Gets all deployment IDs for a deployer
     * @param deployer Address of the deployer
     */
    function getDeployerContracts(address deployer) 
        external 
        view 
        returns (uint256[] memory) 
    {
        return deployerContracts[deployer];
    }

    /**
     * @dev Gets all deployment IDs for a contract type
     * @param contractType Type of contract
     */
    function getContractsByType(string memory contractType)
        external
        view
        returns (uint256[] memory)
    {
        return contractsByType[contractType];
    }

    /**
     * @dev Gets contract data for a specific deployment
     * @param deploymentId The ID of the deployment
     */
    function getContractData(uint256 deploymentId)
        external
        view
        returns (ContractData memory)
    {
        require(deploymentId <= totalDeployments, "Invalid deployment ID");
        return contracts[deploymentId];
    }

    // Admin functions
    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }
}