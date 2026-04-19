const base = require("./eslint-base");

module.exports = {
  ...base,
  extends: [...base.extends, "next/core-web-vitals", "next/typescript"],
  rules: {
    ...base.rules,
    "react/no-unescaped-entities": "off",
    "@next/next/no-img-element": "error",
  },
};
