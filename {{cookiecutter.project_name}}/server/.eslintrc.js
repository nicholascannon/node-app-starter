module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'prettier',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'import/prefer-default-export': 0,
    'import/extensions': 0,
  },
  overrides: [
    {
      files: ['*.test.ts'],
      rules: {
        'no-unused-expressions': 'off',
        'import/no-extraneous-dependencies': 'off'
      }
    }
  ]
};
