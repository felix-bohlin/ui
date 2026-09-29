export default {
  ignoreFiles: ["**/dist/**", "**/node_modules/**"],
  rules: {
    "block-no-empty": true,
    "color-no-invalid-hex": true,
    "declaration-block-no-duplicate-properties": [
      true,
      { ignore: ["consecutive-duplicates-with-different-values"] },
    ],
    "function-no-unknown": null,
    "no-duplicate-selectors": [true, { severity: "warning" }],
    "no-invalid-double-slash-comments": true,
    "property-no-unknown": true,
    "selector-class-pattern": [
      "^ui-[a-z0-9-]+$",
      {
        message: (selector) =>
          `Expected class "${selector}" to be prefixed with "ui-"`,
      },
    ],
    "unit-no-unknown": true,
  },
}
