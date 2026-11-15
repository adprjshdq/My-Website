import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
  {
    // Skrip Node (mis. generator CV PDF) butuh global process/fs, bukan browser.
    files: ['scripts/**/*.{js,jsx}'],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      // Skrip ini bukan bagian dari modul yang di-refresh saat dev.
      'react-refresh/only-export-components': 'off',
    },
  },
])
