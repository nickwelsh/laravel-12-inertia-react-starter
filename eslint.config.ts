import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
// @ts-ignore -- The type is there, not sure why it's not working?
import importPlugin from 'eslint-plugin-import';
import reactPlugin from 'eslint-plugin-react';
// @ts-ignore -- The type is there, not sure why it's not working?
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config({
    files: ['**/resources/js/**/*.{ts,tsx}'],
    ignores: ['vendor', 'node_modules', 'public', 'bootstrap/ssr'],
    extends: [
        eslint.configs.recommended,
        tseslint.configs.strictTypeChecked,
        tseslint.configs.stylisticTypeChecked,
        reactPlugin.configs.flat.recommended,
        reactPlugin.configs.flat['jsx-runtime'],
        eslintConfigPrettier,
    ],
    languageOptions: {
        parserOptions: {
            projectService: true,
            tsconfigRootDir: __dirname,
            ecmaVersion: 'latest',
            sourceType: 'module',
        },
        globals: {
            ...globals.browser,
            ...globals.node,
        },
    },
    plugins: {
        'react-hooks': reactHooksPlugin,
        import: importPlugin,
    },
    rules: {
        // TypeScript
        '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
        '@typescript-eslint/restrict-template-expressions': ['error', { allowNumber: true }],

        // React
        'react/react-in-jsx-scope': 'off',
        'react/jsx-uses-react': 'off',
        'react/prop-types': 'off',
        'react/no-unescaped-entities': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',

        // Imports
        '@typescript-eslint/consistent-type-imports': [
            'error',
            {
                prefer: 'type-imports',
                disallowTypeAnnotations: false,
            },
        ],
        'import/consistent-type-specifier-style': ['error', 'prefer-inline'],
        'import/order': [
            'warn',
            {
                groups: [
                    'builtin', // Node.js built-in modules
                    'external', // Packages
                    'internal', // Aliased modules
                    'parent', // Relative parent
                    'sibling', // Relative sibling
                    'index', // Relative index
                ],
                'newlines-between': 'never',
            },
        ],
        'no-restricted-imports': [
            'error',
            {
                paths: [
                    {
                        name: 'react',
                        importNames: ['default'],
                        message:
                            "Do not import React directly. Import hooks or components individually, e.g., `import { useEffect } from 'react'`.",
                    },
                ],
            },
        ],
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
});
