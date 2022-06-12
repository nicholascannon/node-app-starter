module.exports = {
    env: {
        node: true,
        es2021: true,
    },
    extends: [
        'plugin:prettier/recommended',
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
    rules: {},
};
