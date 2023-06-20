module.exports = {
  root: true,
  extends: ['eslint:recommended'],
  env: {
    es6: true,
    node: true,
    mocha: true,
  },
  parserOptions: {
    ecmaVersion: 12,
  },
  plugins: ['no-only-tests'],
  rules: {
    indent: 'off', // prettier
    'no-only-tests/no-only-tests': 'error',
    'linebreak-style': 'off', // prettier
    quotes: 'off', // prettier
    semi: 'off', // prettier
    'no-inner-declarations': 'off',
    'max-len': 'off', // prettier
  },
  overrides: [
    {
      files: ['**/*.ts'],
      extends: ['plugin:@typescript-eslint/recommended'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: ['./tsconfig.eslint.json'],
      },
      rules: {
        '@typescript-eslint/no-floating-promises': 'error',
        '@typescript-eslint/no-var-requires': 0,
        '@typescript-eslint/no-non-null-assertion': 0,
        '@typescript-eslint/no-empty-function': 0,
      },
    },
  ],
};
