module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/essential", "@vue/prettier", "@vue/typescript"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "vue/require-v-for-key": "off",
    "prettier/prettier": [
      "warn",
      {
        printWidth: 100,
        trailingComma: "all",
      },
    ],
  },
  parserOptions: {
    parser: "typescript-eslint-parser",
  },
};
