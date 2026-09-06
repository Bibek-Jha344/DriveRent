import { defineConfig, globalIgnores } from 'eslint/config';
import tsParser from '@typescript-eslint/parser';
export default defineConfig([
	globalIgnores(['.next/**', 'node_modules/**']),
	{ files: ['**/*.{js,mjs,ts,tsx}'], languageOptions: { parser: tsParser, parserOptions: { ecmaFeatures: { jsx: true } } }, rules: {} }
]);
