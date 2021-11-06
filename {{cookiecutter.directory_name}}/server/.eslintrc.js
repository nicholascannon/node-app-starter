module.exports = {
  env: {
    node: true,
    es2021: true,
    mocha: true,
  },
  extends: ["airbnb-base", "prettier", "plugin:chai-friendly/recommended", "plugin:prettier/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 13,
    sourceType: "module",
    project: "tsconfig.eslint.json",
    tsconfigRootDir: __dirname,
  },
  plugins: ["@typescript-eslint"],
  rules: {},
};
