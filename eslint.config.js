import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      // Relax TypeScript rules
      "@typescript-eslint/no-explicit-any": "warn", // Change to 'off' to disable completely
      "@typescript-eslint/no-unused-vars": "warn",
      // Add other rules you want to relax:
      // '@typescript-eslint/ban-ts-comment': 'off',
      // '@typescript-eslint/no-non-null-assertion': 'warn',
    },
  },
]);
