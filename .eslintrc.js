/** @type {import('@starfleet/eslint-config').EslintConfig} */
module.exports = {
  root: true,
  extends: [require.resolve('@starfleet/eslint-config')],
  ignorePatterns: ['**/node_modules/**', '**/dist/**'],
  rules: {
    'react/jsx-props-no-spreading': 'off',
  },
}
