import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat';

export default defineConfig([
  ...nextVitals,
  ...nextTypescript,
  prettier,
  {
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: 'ConditionalExpression ConditionalExpression',
          message: 'Avoid nested ternaries. Use named values or explicit branches.',
        },
        {
          selector: 'JSXExpressionContainer > ConditionalExpression:has(JSXElement, JSXFragment)',
          message: 'Move conditional markup into a named value or a focused component.',
        },
      ],
    },
  },
  globalIgnores(['.next/**', 'out/**', 'coverage/**', 'next-env.d.ts']),
]);
