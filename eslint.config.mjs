import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';

export default {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  extends: [
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,
    'eslint:recommended',
    'prettier'
  ],
  plugins: ['react'],
  globals: {
    ...globals.browser,
  },
  rules: {
    'react/react-in-jsx-scope': 'off', // Для новых версий React, где импорт React не обязателен
    'react/prop-types': 'off', // Отключаем проверки prop-types
    'no-console': 'warn', // Предупреждения о консольных выводах
    'react/jsx-filename-extension': [1, {extensions: ['.jsx', '.tsx']}], // Поддержка JSX/TSX
  },
  overrides: [
    {
      files: ['*.js', '*.jsx'],
      parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
      },
      extends: ['plugin:@typescript-eslint/recommended'],
    },
  ],
};
