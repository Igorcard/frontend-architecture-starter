import js from '@eslint/js'
import boundaries from 'eslint-plugin-boundaries'
import oxlint from 'eslint-plugin-oxlint'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist', 'node_modules', 'src/routeTree.gen.ts'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      boundaries,
    },
    settings: {
      'boundaries/elements': [
        { type: 'core', pattern: 'src/core/**/*' },
        { type: 'ui', pattern: 'src/ui/**/*' },
        { type: 'pattern', pattern: 'src/pattern/**/*' },
        { type: 'layouts', pattern: 'src/layouts/**/*' },
        { type: 'features', pattern: 'src/features/**/*' },
        { type: 'routes', pattern: 'src/routes/**/*' },
        { type: 'mocks', pattern: 'src/mocks/**/*' },
        { type: 'app', pattern: 'src/*' },
      ],
      'boundaries/ignore': ['**/*.test.ts', '**/*.test.tsx', '**/__specs__/**'],
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          rules: [
            { from: 'core', allow: ['core', 'mocks'] },
            { from: 'ui', allow: ['ui'] },
            { from: 'layouts', allow: ['core', 'ui', 'layouts'] },
            { from: 'pattern', allow: ['core', 'ui', 'pattern'] },
            {
              from: 'features',
              allow: ['core', 'ui', 'pattern', 'features'],
            },
            {
              from: 'routes',
              allow: ['core', 'ui', 'pattern', 'layouts', 'features', 'routes'],
            },
            { from: 'mocks', allow: ['core', 'mocks', 'features'] },
            {
              from: 'app',
              allow: [
                'core',
                'ui',
                'pattern',
                'layouts',
                'features',
                'routes',
                'mocks',
                'app',
              ],
            },
          ],
        },
      ],
    },
  },
  ...oxlint.configs['flat/recommended'],
)
