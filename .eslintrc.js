module.exports = {
  root: true,

  env: {
    node: true,
  },

  extends: ['plugin:vue/recommended', '@vue/airbnb', 'prettier', 'prettier/vue'],

  parserOptions: {
    parser: 'babel-eslint',
  },

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    semi: ['error', 'never'],
    'max-len': 'off',
    'linebreak-style': 'off',
    camelcase: ['error', { properties: 'never', ignoreDestructuring: true, ignoreImports: true }],
    'arrow-parens': ['error', 'as-needed', { requireForBlockBody: true }],
    'vue/multiline-html-element-content-newline': 'off',
    'vue/max-attributes-per-line': [
      1,
      {
        singleline: 4,
        multiline: {
          max: 1,
          allowFirstLine: true,
        },
      },
    ],
  },

  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true,
      },
    },
  ],
}
