// eslint.config.js
// @ts-check
const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');

module.exports = tseslint.config(
  // Configuración para ficheros TypeScript
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      // Reglas base de Angular (las genera angular-eslint por defecto)
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],

      // RELAJAMOS REGLAS PARA NO ROMPER TU CÓDIGO ACTUAL
      '@angular-eslint/prefer-inject': 'off',
      '@angular-eslint/use-lifecycle-interface': 'warn',
      '@angular-eslint/no-empty-lifecycle-method': 'off',

      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',

      'prefer-const': 'warn',
    },
  },

  // Configuración para plantillas HTML
  {
    files: ['**/*.html'],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {
      // Permitimos seguir usando *ngIf en lugar de @if
      '@angular-eslint/template/prefer-control-flow': 'off',
    },
  }
);

