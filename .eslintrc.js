/*
 * @Author: HanRui(JoyNop)
 * @Date: 2021-08-02 09:23:35
 * @LastEditors: HanRui(JoyNop)
 * @LastEditTime: 2021-08-02 11:00:44
 * @Description: file content
 * @FilePath: /blast-1/.eslintrc.js
 */
module.exports = {
  root: true,

  env: {
    browser: true,
    node: true,
    es6: true
  },

  parser: 'vue-eslint-parser',

  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module',
    jsxPragma: 'React',
    ecmaFeatures: {
      jsx: true
    }
  },

  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended'
  ],

  rules: {
    'vue/no-v-for-template-key-on-child': 'off',
    'vue/custom-event-name-casing': 'off',
    'vue/one-component-per-file': 'off',
    'space-before-function-paren': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'no-console': 'off',
    'no-debugger': 'off',
    'vue/html-self-closing': [
      'error',
      {
        html: {
          'void': 'always',
          normal: 'never',
          component: 'always'
        },
        svg: 'always',
        math: 'always'
      }
    ]
  },

  'extends': [
    'plugin:vue/essential',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended'
  ]
}
