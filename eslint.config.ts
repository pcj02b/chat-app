import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { 
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"], 
    plugins: { js, tseslint }, 
    extends: ["js/recommended", "ts/recommended"], 
    languageOptions: { 
      globals: globals.browser,
      node: true,
    },
  },
  tseslint.configs.recommended,
]);
