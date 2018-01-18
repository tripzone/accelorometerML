module.exports = {
  parser: 'babel-eslint',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb',
    'prettier',
    'prettier/flowtype',
    'prettier/react',
    'prettier/standard',
  ],
  rules: {},
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  plugins: ['react'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 8,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
  },
  rules: {
    'react/no-unescaped-entities': 0,
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'no-console': [
      'warn',
      {
        allow: ['info', 'warn', 'error'],
      },
    ],
    'react/jsx-uses-vars': 1,
    'react/prop-types': 0,
    'react/prefer-stateless-function': 2,
    'import/extensions': 0,
    'react/jsx-filename-extension': 0,
    'react/prefer-stateless-function': 0,
    'import/prefer-default-export': 0,
    'import/first': 0,
    'no-use-before-define': 0,
    'no-underscore-dangle': 0,
    'react/jsx-no-bind': 0,
    camelcase: 0,
    'react/sort-comp': 0,
    'no-return-assign': 0,
    'jsx-a11y/href-no-hash': 0,
    'jsx-a11y/img-has-alt': 0,
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
      },
    },
  },
};
