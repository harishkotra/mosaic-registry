import { writeFileSync } from 'fs';
import { join } from 'path';

export function saveDeployment(address: string) {
  const deploymentInfo = {
    network: 'mantle-sepolia',
    address,
    timestamp: new Date().toISOString()
  };

  writeFileSync(
    join(__dirname, '../deployment.json'),
    JSON.stringify(deploymentInfo, null, 2)
  );

  console.log('Deployment info saved to deployment.json');
}