module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    extends: 'airbnb-base',
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    "parser": "babel-eslint",
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    rules: {
        "indent": [2],
        "no-restricted-syntax": 0,
        "guard-for-in": 0,
        "no-continue": 0,
        "no-bitwise": 0,

        // import
        "import/named": 0,
        "global-require": 0,
        "import/no-dynamic-require": 0,

        // object
        "object-curly-newline": 0,
        "prefer-destructuring": 0,
        "no-param-reassign": 0,
        "consistent-return": 0,
        "arrow-body-style": 0,
        "no-prototype-builtins": 0,
        "no-unused-expressions": 0,
    },
};
