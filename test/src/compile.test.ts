import { ok } from 'node:assert/strict';

import { compileContract } from '../../src/compile';
import { loadFile } from './helpers';

describe('src/compile.ts', function () {
  it('correctly compiles SampleRouter.sol', async function () {
    const contractName = 'Router';
    const sourceCode = await loadFile('../fixtures/SampleRouter.sol');
    const result = await compileContract(contractName, sourceCode);

    ok(Array.isArray(result.abi));
    ok(typeof result.metadata === 'string');
    ok(typeof result.solcVersion === 'string');
    ok(typeof result.assembly === 'string');
    ok(typeof result.bytecode === 'string');
    ok(typeof result.deployedBytecode === 'string');
    ok(result.gasEstimates);
  });
});
