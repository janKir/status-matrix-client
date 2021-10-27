// based on https://github.com/iamturns/create-exposed-app/blob/master/.eslintrc.js
module.exports = {
  parser: "@typescript-eslint/parser", // allows to lint typescript
  plugins: [
    "@typescript-eslint", // allows for TypeScript-specific linting rules to run.
    "eslint-comments", //Additional ESLint rules for ESLint directive comments (e.g. //eslint-disable-line).
    "jest", // rules specific for testing with jest
    "unicorn", // Various awesome ESLint rules 
    "prettier", //Runs Prettier as an ESLint rule and reports differences as individual ESLint issues.
    "deprecation", // reports usage of deprecated code
    "import",
    "react",
    "jsx-a11y"
  ],
  extends: [
    "airbnb-typescript", // use airbnb ruleset for typescript as base
    "airbnb/hooks", // add lint rules for use of react hooks
    "plugin:@typescript-eslint/recommended",
    "plugin:jest/recommended", // use recommended jest rules
    "plugin:unicorn/recommended", // use recommended rules of unicorn ruleset
    "prettier", // eslint-config-prettier Turns off all rules that are unnecessary or might conflict with Prettier.
    "plugin:prettier/recommended", // extend eslint-config-prettier rules
  ],
  parserOptions: {
    ecmaVersion: 2018,
    jsx: true,
    sourceType: "module",
    useJSXTextNode: true,
    project: "./tsconfig.json",
  },

  env: {
    node: true,
    browser: true,
    jest: true,
  },
  ignorePatterns: [".cache/**/*", "dist/**/*", ".git/**/*", "node_modules/**/*", ".*.js", "jest.*.js", "jest.*.ts", "vite.config.ts"],
  rules: {  
    // https://basarat.gitbooks.io/typescript/docs/tips/defaultIsBad.html
    "import/prefer-default-export": "off",
    "import/no-default-export": "error",
    // No jsx extension: https://github.com/facebook/create-react-app/issues/87#issuecomment-234627904
    "react/jsx-filename-extension": "off",
    "react/jsx-key": "warn",
    // Use function hoisting to improve code readability
    "@typescript-eslint/no-use-before-define": [
      "error",
      { functions: false, classes: true, variables: true },
    ],
    // Makes no sense to allow type inferrence for expression parameters, but require typing the response
    "@typescript-eslint/explicit-function-return-type": [
      "error",
      { allowExpressions: true, allowTypedFunctionExpressions: true },
    ],
    "@typescript-eslint/no-use-before-define": [
      "error",
      { functions: false, classes: false, variables: false, typedefs: false },
    ],
    // Common abbreviations are known and readable
    "unicorn/prevent-abbreviations": "off",
    "@typescript-eslint/no-implied-eval": "off",
    "@typescript-eslint/no-throw-literal": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "consistent-return": "off",
    "jest/expect-expect": ["error", { assertFunctionNames: ["expect*"] }],
    "react/prop-types": "off",
    "eslint-comments/no-duplicate-disable": "error",
    "eslint-comments/no-unlimited-disable": "error",
    "eslint-comments/no-unused-enable": "error",
    "unicorn/filename-case": "off",
    "unicorn/no-reduce": "off",
    "unicorn/no-useless-undefined": "off",
    "deprecation/deprecation": "warn", // will report all deprecated code
    "jsx-a11y/label-has-associated-control": ["error", {
      assert: "either"
    }]
  },
};
