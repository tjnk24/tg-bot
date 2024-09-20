module.exports = {
  plugins: [
    'eslint-plugin',
    '@typescript-eslint',
    'import',
    'eslint-comments',
    '@stylistic'
  ],
  env: {
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    ecmaVersion: 2018,
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  settings: {
    'import/parsers': {
        '@typescript-eslint/parser': ['.ts'],
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  root: true,
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    // Code Style
    'arrow-parens': ['error', 'as-needed'],
    camelcase: 0,
    'class-methods-use-this': 0,
    'consistent-return': 0,
    'comma-dangle': [
        'warn',
        {
            arrays: 'always-multiline',
            objects: 'always-multiline',
            imports: 'always-multiline',
            exports: 'always-multiline',
            functions: 'always-multiline',
        },
    ],
    quotes: ['error', 'single'],
    'import/no-extraneous-dependencies': 0,
    indent: [
        'error',
        4,
        {
            SwitchCase: 1,
            MemberExpression: 1,
            ignoredNodes: [
                'FunctionExpression > .params[decorators.length > 0]',
                'FunctionExpression > .params > :matches(Decorator, :not(:first-child))',
                'ClassBody.body > PropertyDefinition[decorators.length > 0] > .key',
            ],
        },
    ],
    'max-len': [
        'error',
        {
            code: 150,
            tabWidth: 4,
            ignoreComments: true,
            ignoreTrailingComments: true,
            ignoreUrls: true,
            ignoreStrings: true,
            ignoreTemplateLiterals: true,
        },
    ],
    'max-params': 0,
    'space-in-parens': ['error', 'never'],
    'array-bracket-spacing': ['error', 'never'],
    'space-before-blocks': ['error', 'always'],
    'keyword-spacing': ['error', {before: true, after: true}],
    '@stylistic/semi': ['error', 'always'],
    'eol-last': ['error', 'always'],
    'no-cond-assign': ['error', 'except-parens'],
    'no-implicit-coercion': 0,
    'no-else-return': 0,
    'no-extra-boolean-cast': 0,
    'no-nested-ternary': 0,
    'no-plusplus': 0,
    'no-prototype-builtins': 0,
    'no-return-await': 0,
    'no-underscore-dangle': 0,
    'no-unused-vars': 0,
    'no-use-before-define': 0,
    'no-useless-escape': 0,
    'prefer-rest-params': 0,
    'object-curly-spacing': ['error', 'never'],
    'operator-linebreak': 0,
    'space-before-function-paren': [
        'error',
        {
            anonymous: 'always',
            named: 'never',
            asyncArrow: 'always',
        },
    ],
    'no-console': 'warn',
    'no-process-exit': 'error',
    'no-multiple-empty-lines': [
        'error',
        {
            max: 1,
        },
    ],
    'no-multi-spaces': 'error',
    'object-curly-newline': [
        'error',
        {
            'ImportDeclaration': {
                'multiline': true,
                'minProperties': 3,
            },
        },
    ],

    // TypeScript
    '@typescript-eslint/no-angle-bracket-type-assertion': 0,
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/no-unnecessary-type-assertion': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-misused-promises': 0,
    '@typescript-eslint/no-this-alias': 0,
    '@typescript-eslint/unbound-method': 0,
    '@typescript-eslint/await-thenable': 0,
    '@typescript-eslint/prefer-regexp-exec': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/ban-ts-ignore': 0,
    '@typescript-eslint/no-unused-vars': [
        'error',
        {
            vars: 'all',
            args: 'all',
            varsIgnorePattern: '^_',
            argsIgnorePattern: '^_',
            ignoreRestSiblings: true,
        },
    ],
    '@stylistic/member-delimiter-style': [
        'error',
        {
            'multiline': {
                'delimiter': 'semi',
                'requireLast': true,
            },
            'singleline': {
                'delimiter': 'semi',
                'requireLast': false,
            },
        },
    ],
    '@typescript-eslint/no-unsafe-assignment': 0,
    '@typescript-eslint/no-unsafe-call': 0,
    '@typescript-eslint/no-unsafe-return': 0,
    '@typescript-eslint/no-unsafe-member-access': 0,
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,

    //imports
    'import/order': [
      'warn',
      {
          groups: [
              ['builtin', 'external'],
              'internal',
              'parent',
              'sibling',
              'index',
          ],
          pathGroups: [
              {
                  pattern: '*__*',
                  group: 'internal',
              },
              {
                  pattern: '*__*/**',
                  group: 'internal',
              },
          ],
          pathGroupsExcludedImportTypes: ['internal'],
          alphabetize: {
              order: 'asc',
              caseInsensitive: true,
          },
          'newlines-between': 'always',
      },
    ],
    'no-restricted-imports': [
      'error',
      {
        'paths': [
          {
              'name': 'lodash',
              'message': 'Use "import utilName from \'lodash/utilName\'" instead',
          },
        ],
      },
    ],
  },
};
