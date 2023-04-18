/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "@vue/eslint-config-typescript",
    "prettier",
  ],
  rules: {
    "line-break": "off",
    "vue/require-default-prop": "off",
    "vue/no-unused-vars": "error",
    "@typescript-eslint/no-unused-vars": "error",
  },
};
