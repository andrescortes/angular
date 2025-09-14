// eslint.config.js
const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const eslintConfigPrettier = require('eslint-config-prettier');

module.exports = tseslint.config({
  ignores: ['.angular/**', 'dist/**', 'node_modules/**'],
  files: ['**/*.ts'],
  extends: [
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    ...tseslint.configs.stylistic,
    ...angular.configs.tsRecommended,
    eslintConfigPrettier,
  ],
  processor: angular.processInlineTemplates,
  rules: {
    '@angular-eslint/directive-selector': ['error', { type: 'attribute', prefix: 'app', style: 'camelCase' }],
    '@angular-eslint/component-selector': [
      'error',
      { type: ['attribute', 'element'], prefix: 'app', style: 'kebab-case' },
    ],
  },
});

module.exports = {
  files: ['**/*.html'],
  extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
  rules: {},
};
