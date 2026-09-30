const js = require("@eslint/js");
const globals = require("globals");

module.exports = [
    {
        ignores: ["eslint.config.js"]
    },

    js.configs.recommended,

    {
        files: ["app.js"],
        languageOptions: {
            ecmaVersion: 2021,
            sourceType: "commonjs",
            globals: {
                ...globals.node
            }
        }
    },

    {
        files: ["tests/**/*.js"],
        languageOptions: {
            ecmaVersion: 2021,
            sourceType: "commonjs",
            globals: {
                ...globals.node,
                ...globals.jest
            }
        }
    }
];