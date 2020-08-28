module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    "standard",
    "eslint:recommended"
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaVersion: 2019
  },
  rules: {
    // セミコロンは冗長であってもよいので基本的に付ける
    "semi": ["error", "always"],
    "semi-spacing": ["error", {"after": true, "before": false}],
    "semi-style": ["error", "last"],
    "no-extra-semi": "error",
    "no-unexpected-multiline": "error",
    "no-unreachable": "error",
  }
}
