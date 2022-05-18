module.exports = {
    env: {
        node: true,
        es2021: true,
    },
    extends: ['google', 'plugin:prettier/recommended'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
    },
    plugins: ['@typescript-eslint'],
    rules: {
        'require-jsdoc': 0,
        'valid-jsdoc': 0,
    },
};
