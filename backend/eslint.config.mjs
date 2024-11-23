import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.js"],
    languageOptions: { sourceType: "commonjs" }
  },
  {
    files: ["**/*.test.js", "**/*.spec.js"],
    languageOptions: {
      globals: {
        ...globals.node,
        jest: "readonly",
        describe: "readonly",
        it: "readonly",
        expect: "readonly"
      }
    }
  },
  {
    languageOptions: { globals: globals.node }
  },
  pluginJs.configs.recommended
];
