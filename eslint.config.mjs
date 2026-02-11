import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import reactRefresh from "eslint-plugin-react-refresh";

export default tseslint.config(
  { ignores: ["node_modules", "dist", "build"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      react: reactPlugin,
      "react-refresh": reactRefresh,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      react: { version: "detect" },
    },
    rules: {
      // Disable prop-types - TypeScript handles type checking
      "react/prop-types": "off",

      // Allow hooks co-located with their providers
      "react-refresh/only-export-components": [
        "warn",
        { allowExportNames: ["useActivityLog"] },
      ],
    },
  }
);
