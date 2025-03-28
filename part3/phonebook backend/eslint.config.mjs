import stylisticJs from '@stylistic/eslint-plugin-js'
import globals from 'globals'
import js from '@eslint/js'

export default [
  {
    files: ['**/*.{js,mjs,cjs}'],

    languageOptions: {
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },

    plugins: {
      '@stylistic/js': stylisticJs,
    },

    rules: {
      '@stylistic/js/indent': ['error', 2],
      '@stylistic/js/linebreak-style': ['error', 'unix'],
      '@stylistic/js/quotes': ['error', 'single'],
      '@stylistic/js/semi': ['error', 'never'],
      'no-console': 0,
      'object-curly-spacing': ['error','always'],
      'arrow-spacing': ['error',{ 'before':true, 'after':true }],
      'no-trailing-spaces': 'error',
      'eqeqeq': 'error',

    },

    ignores: [
      '**/node_modules/**',
      '**/dist/**',
    ]
  },
]