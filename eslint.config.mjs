// ESLint flat config: type-checked TypeScript, Playwright best practices, import hygiene, Prettier-compatible.
// The Screenplay layer rules (what each folder may import) are enforced here, so the pattern
// stays honest while you build it. Tighten them further in M8 (docs/ROADMAP.md).
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import playwright from 'eslint-plugin-playwright';
import { importX } from 'eslint-plugin-import-x';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import prettier from 'eslint-config-prettier';

/** `restricted(group, message)` for no-restricted-imports patterns. */
const restricted = (group, message) => ({ group, message });

export default tseslint.config(
  {
    ignores: ['node_modules/', 'test-results/', 'playwright-report/', 'blob-report/', '**/*.mjs'],
  },
  js.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  importX.flatConfigs.recommended,
  importX.flatConfigs.typescript,
  {
    languageOptions: {
      parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname },
    },
    settings: {
      'import-x/resolver-next': [createTypeScriptImportResolver({ alwaysTryTypes: true })],
    },
    rules: {
      'no-console': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: true }],
      '@typescript-eslint/consistent-type-imports': ['error', { fixStyle: 'inline-type-imports' }],
      '@typescript-eslint/restrict-template-expressions': ['error', { allowNumber: true }],
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/prefer-nullish-coalescing': [
        'error',
        { ignorePrimitives: { string: true } },
      ],
      'import-x/no-cycle': 'error',
      'import-x/no-duplicates': 'error',
      'import-x/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index'], 'type'],
          pathGroups: [
            {
              pattern:
                '@{screenplay,abilities,interactions,tasks,questions,ui,api,config,data,fixtures}{,/**}',
              group: 'internal',
            },
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
    },
  },

  // ---- Screenplay layer boundaries -------------------------------------------------------------
  {
    // The core is app-agnostic: it knows nothing about the Market app.
    files: ['src/screenplay/**/*.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            restricted(
              ['@abilities/*', '@interactions/*', '@tasks/*', '@questions/*', '@ui/*', '@api/*'],
              'The Screenplay core must not depend on app code.',
            ),
          ],
        },
      ],
    },
  },
  {
    // Tasks compose Interactions (and other Tasks). They never reach for an Ability directly.
    files: ['src/tasks/**/*.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            restricted(
              ['@abilities/*'],
              'Tasks only compose activities: put the Ability call in an Interaction.',
            ),
          ],
        },
      ],
    },
  },
  {
    // Questions read state. They never perform activities.
    files: ['src/questions/**/*.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            restricted(['@interactions/*', '@tasks/*'], 'Questions must not perform activities.'),
          ],
        },
      ],
    },
  },
  {
    // Targets (src/ui) are locators only.
    files: ['src/ui/**/*.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            restricted(
              ['@interactions/*', '@tasks/*', '@questions/*', '@abilities/*'],
              'Targets describe where things are, nothing else.',
            ),
          ],
        },
      ],
    },
  },

  // ---- Specs ------------------------------------------------------------------------------------
  {
    files: ['tests/**/*.ts'],
    ...playwright.configs['flat/recommended'],
    rules: {
      ...playwright.configs['flat/recommended'].rules,
      'playwright/no-wait-for-timeout': 'error',
      'playwright/no-networkidle': 'error',
      'playwright/no-force-option': 'error',
      'playwright/no-focused-test': 'error',
      'playwright/no-conditional-in-test': 'error',
      'playwright/no-conditional-expect': 'error',
      // The skeleton parks every case with test.fixme until you implement it.
      'playwright/no-skipped-test': 'off',
      'playwright/expect-expect': 'off',
      'playwright/prefer-web-first-assertions': 'error',
      // Specs talk to actors only: no raw locators, no raw HTTP, no hand-made steps.
      'no-restricted-syntax': [
        'error',
        {
          selector:
            "CallExpression[callee.object.name='page'][callee.property.name=/^(locator|getBy\\w+|goto|click|fill|\\$|\\$\\$)$/]",
          message: 'Specs use actors: put locators in src/ui and actions in src/interactions.',
        },
        {
          selector:
            "CallExpression[callee.object.name='request'][callee.property.name=/^(get|post|put|patch|delete|fetch)$/]",
          message: 'HTTP calls belong in the CallAnApi ability, reached through Interactions.',
        },
        {
          selector: "CallExpression[callee.object.name='test'][callee.property.name='step']",
          message: 'Steps come from the Actor (src/screenplay/step.ts), not from specs.',
        },
      ],
    },
  },
  {
    // Auth setup and the core unit specs may talk to Playwright directly.
    files: ['tests/setup/**/*.ts', 'tests/core/**/*.ts'],
    rules: { 'no-restricted-syntax': 'off' },
  },
  prettier,
);
