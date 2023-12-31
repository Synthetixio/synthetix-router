import { ok, rejects } from 'node:assert/strict';

import { compileContract } from '../../src/compile';
import { loadFile } from './helpers';

describe('src/compile.ts', function () {
  it('correctly compiles SampleRouter.sol with default version', async function () {
    const contractName = 'SampleRouter';
    const sourceCode = await loadFile('../fixtures/SampleRouter.sol');
    const result = await compileContract(contractName, sourceCode);

    console.log(result.solcVersion);

    ok(Array.isArray(result.abi));
    ok(typeof result.metadata === 'string');
    ok(typeof result.solcVersion === 'string');
    ok(typeof result.assembly === 'string');
    ok(typeof result.bytecode === 'string');
    ok(typeof result.deployedBytecode === 'string');
    ok(result.gasEstimates);
  });

  const evmVersions = ['constantinople', 'petersburg', 'istanbul', 'berlin', 'london', 'shanghai'];

  for (const evmVersion of evmVersions) {
    it(`correctly compiles when using evmVersion "${evmVersion}"`, async function () {
      const contractName = 'SampleRouter';
      const sourceCode = await loadFile('../fixtures/SampleRouter.sol');
      const result = await compileContract(contractName, sourceCode, evmVersion);

      ok(Array.isArray(result.abi));
      ok(typeof result.metadata === 'string');
      ok(typeof result.solcVersion === 'string');
      ok(typeof result.assembly === 'string');
      ok(typeof result.bytecode === 'string');
      ok(typeof result.deployedBytecode === 'string');
      ok(result.gasEstimates);
    });
  }

  it('throws an error on invalid settings', async function () {
    const contractName = 'SampleRouter';
    const sourceCode = await loadFile('../fixtures/SampleRouter.sol');

    await rejects(
      () => compileContract(contractName, sourceCode, 'invalid-version'),
      new Error('There was an error when compiling "SampleRouter". Invalid EVM version requested.')
    );
  });
});
