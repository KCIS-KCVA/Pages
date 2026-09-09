import js from '@eslint/js';

export default [
  { ignores: ['dist/**', 'node_modules/**', '.pnpm/**'] },
  js.configs.recommended,
  {
    files: ['scripts/**/*.js', 'scripts/**/*.mjs', 'data/**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        document: 'readonly', window: 'readonly', navigator: 'readonly',
        HTMLElement: 'readonly', HTMLButtonElement: 'readonly',
        URL: 'readonly', console: 'readonly', process: 'readonly',
        fetch: 'readonly', WebSocket: 'readonly', Buffer: 'readonly', setTimeout: 'readonly',
        setInterval: 'readonly', localStorage: 'readonly', location: 'readonly'
      }
    },
    rules: { 'no-unused-vars': ['error', { argsIgnorePattern: '^_' }] }
  }
];
