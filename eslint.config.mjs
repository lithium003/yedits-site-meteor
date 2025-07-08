import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import globals from 'globals';
import reactPlugin from 'eslint-plugin-react';

export default [
  js.configs.recommended,
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    plugins: {
      prettier: prettierPlugin,
      react: reactPlugin
    },
    rules: {
      ...prettierConfig.rules,
      'prettier/prettier': 'error',
      'no-multi-spaces': 'error',
      'no-trailing-spaces': 'error',
      'eol-last': ['error', 'always'],
      'react/jsx-uses-react': 'error',
      'react/react-in-jsx-scope': 'error',
      'react/jsx-no-undef': 'error'
    }
  },
  {
    ignores: ['node_modules/', 'build/', 'dist/']
  },
  {
    files: ['**/*.jsx'],
    rules: {
      'no-unused-vars': ['warn', { varsIgnorePattern: '^React$' }],
      'react/jsx-uses-vars': 'warn'
    },
    plugins: {
      react: reactPlugin
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    }
  }
];
