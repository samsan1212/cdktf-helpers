module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier',
  ],
  env: {
    node: true,
    jest: true,
  },
  settings: {
    'import/extensions': ['.js'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts'],
    },
    'import/resolver': {
      typescript: {
        project: __dirname + '/tsconfig.json',
      },
    },
  },
  ignorePatterns: [
    'dist',
    'jest*.js',
    'spack.config.js',
    '.eslintrc.js',
    'cdk',
    'webpack.config.js',
  ],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        argsIgnorePattern: '^_',
        args: 'after-used',
        ignoreRestSiblings: true,
      },
    ],
    'no-duplicate-imports': 'off',
    '@typescript-eslint/no-duplicate-imports': ['error'],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'import/default': 'off',
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'object',
          'type',
        ],
        alphabetize: {
          order: 'asc',
          caseInsensitive: false,
        },
        'newlines-between': 'always',
        warnOnUnassignedImports: true,
      },
    ],
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'off',
    'import/namespace': 'off',
  },
};
