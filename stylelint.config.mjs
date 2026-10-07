export default {
  ignoreFiles: ["**/dist/**", "**/node_modules/**"],
  overrides: [
    {
      files: ["packages/opui/**/*.css"],
      rules: {
        "declaration-property-value-disallowed-list": {
          "/^(clear|float|text-align|text-align-last)$/": [/^(left|right)$/],
          "/^(inset|margin|padding)/": [
            /\banchor\([^)]*\b(top|right|bottom|left)\b/,
          ],
          "/^resize$/": [/^(horizontal|vertical)$/],
          "/size$/": [/\banchor-size\([^)]*\b(width|height)\b/],
          "/./": [/(^|[\s(,*/+-])[\d.]+[sdl]?v[wh]\b/],
        },
        "opui/logical-shorthands": true,
        "property-disallowed-list": [
          /^(-webkit-)?(min-|max-)?(width|height)$/,
          /^(top|right|bottom|left)$/,
          /^(margin|padding|scroll-margin|scroll-padding)-(top|right|bottom|left)$/,
          /^border-(top|right|bottom|left)(-(color|style|width))?$/,
          /^border-(top|bottom)-(left|right)-radius$/,
          /^contain-intrinsic-(width|height)$/,
          /^overscroll-behavior-[xy]$/,
        ],
      },
    },
    {
      files: ["src/**/*.css"],
      rules: { "selector-class-pattern": null },
    },
  ],
  plugins: ["./scripts/stylelint-logical-shorthands.mjs"],
  rules: {
    "block-no-empty": true,
    "color-no-invalid-hex": true,
    "declaration-block-no-duplicate-properties": [
      true,
      { ignore: ["consecutive-duplicates-with-different-values"] },
    ],
    "declaration-block-no-shorthand-property-overrides": true,
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
