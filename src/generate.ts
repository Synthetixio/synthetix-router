import debug from 'debug';
import { renderRouter } from './internal/render-router';
import { DeployedContractData } from './types';

interface Params {
  contractName?: string;
  template?: string;
  contracts: DeployedContractData[];
  canReceivePlainETH?: boolean;
}

export function generateRouter({
  contractName = 'Router',
  template = undefined,
  canReceivePlainETH = false,
  contracts,
}: Params) {
  for (const c of contracts) debug(`${c.contractName}: ${c.deployedAddress}`);

  const sourceCode = renderRouter({
    routerName: contractName,
    template,
    canReceivePlainETH,
    contracts,
  });

  return sourceCode;
}
