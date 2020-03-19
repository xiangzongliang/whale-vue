module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    //https://eslint.vuejs.org/rules/
    // 'plugin:vue/strongly-recommended',
    'plugin:vue/vue3-strongly-recommended',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'linebreak-style': [0 ,'error', 'windows'], //允许windows开发环境
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
