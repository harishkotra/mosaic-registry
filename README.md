# MosaicRegistry Smart Contract

## Overview
MosaicRegistry is a smart contract that acts as an on-chain registry for all contracts deployed through the Mosaic platform. It provides transparency and traceability for every contract created using Mosaic's visual builder and AI generator.

## Purpose
- **Deployment Tracking**: Records every contract deployment with metadata including deployer address, contract type, and timestamp
- **Verification System**: Enables contract verification status tracking
- **Analytics Support**: Provides on-chain data for platform analytics
- **User History**: Maintains searchable deployment history for users

## Key Features

### Deployment Recording
- Tracks contract address
- Records deployer's address
- Stores contract type (ERC20, MetaTx, etc.)
- Saves deployment timestamp
- Maintains source code hash for verification

### Query Functions
- Get all contracts by deployer
- Get all contracts by type
- Retrieve detailed contract data
- View total platform deployments

### Security Features
- Ownable: Controlled admin functions
- Pausable: Emergency stop capability
- Event logging: Full transparency

## Contract Addresses
- Mantle Sepolia: [Your deployed address]

## How It Helps Mosaic

### 1. Platform Transparency
- Every contract created through Mosaic is registered on-chain
- Users can verify their deployment history
- Platform statistics are publicly verifiable

### 2. User Trust
- All deployments are traceable
- Contract verification status is public
- Source code hashes ensure code integrity

### 3. Platform Analytics
- Track popular contract types
- Monitor platform growth
- Analyze user activity

### 4. Integration Support
- Easy contract discovery
- Simple verification process
- Streamlined user history access

## Usage Example

```typescript
// Record a new contract deployment
await registry.recordDeployment(
  "0x123...", // Contract address
  "ERC20",    // Contract type
  "0xabc..."  // Source code hash
);

// Get deployment history for a user
const userDeployments = await registry.getDeployerContracts(
  "0x456..." // User address
);

// Get contract details
const contractData = await registry.getContractData(
  deploymentId
);
```

## Development

### Prerequisites
- Node.js v16+
- Hardhat
- MNT tokens for deployment

### Setup
```bash
# Install dependencies
npm install

# Compile contract
npx hardhat compile

# Deploy contract
npx hardhat run scripts/deploy.ts --network mantleSepolia
```

### Testing
```bash
# Run tests
npx hardhat test
```

## Security Considerations
- Admin functions are protected
- Contract is pausable for emergencies
- Events emitted for all important actions
- Source code hash stored for verification
