import solc from 'solc';
import { JsonFragment } from '@ethersproject/abi';

interface CompileResult {
  abi: JsonFragment[];
  metadata: string;
  solcVersion: string;
  assembly: string;
  bytecode: string;
  deployedBytecode: string;
  gasEstimates: {
    creation: {
      codeDepositCost: string;
      executionCost: string;
      totalCost: string;
    };
    external: {
      '': string;
    };
  };
}

export function getCompileInput(contractName: string, sourceCode: string) {
  return {
    language: 'Solidity',
    sources: {
      [`${contractName}.sol`]: {
        content: sourceCode,
      },
    },
    settings: {
      outputSelection: {
        '*': {
          '*': ['*'],
        },
      },
      evmVersion: 'paris', // lock to older evm version for the time b eing because there is no way to specify it from outside of the tool
    },
  };
}

export async function compileContract(contractName: string, sourceCode: string) {
  const input = getCompileInput(contractName, sourceCode);

  const solResult = JSON.parse(await solc.compile(JSON.stringify(input)));
  const info = solResult.contracts[`${contractName}.sol`][contractName];
  const metadata = JSON.parse(info.metadata);

  return {
    abi: info.abi,
    metadata: info.metadata,
    solcVersion: metadata.compiler.version,
    assembly: info.evm.assembly,
    bytecode: info.evm.bytecode.object,
    deployedBytecode: info.evm.deployedBytecode.object,
    gasEstimates: info.evm.gasEstimates,
  } as CompileResult;
}
