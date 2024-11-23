// import globals from "globals";
// import pluginJs from "@eslint/js";

// /** @type {import('eslint').Linter.Config[]} */
// export default [
//   {files: ["**/*.js"], languageOptions: {sourceType: "commonjs"}},
//   {languageOptions: { globals: globals.node }},
//   pluginJs.configs.recommended,
// ];

import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.js"],
    languageOptions: { sourceType: "commonjs" }
  },
  {
    files: ["**/*.test.js", "**/*.spec.js"], // Для тестових файлів
    languageOptions: {
      globals: {
        ...globals.node, // Глобальні змінні для Node.js
        jest: "readonly", // Додаємо глобальні змінні для Jest
        describe: "readonly",
        it: "readonly",
        expect: "readonly"
      }
    }
  },
  pluginJs.configs.recommended
];
