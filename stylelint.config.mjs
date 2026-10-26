export default {
  ignoreFiles: ["**/dist/**", "**/node_modules/**"],
  overrides: [
    {
      files: ["packages/opui/**/*.css"],
      rules: {
        "at-rule-no-vendor-prefix": true,
        "declaration-no-important": [
          true,
          {
            message:
              'Unexpected !important: win with the layer order or a ":where()" that lowers the other rule instead',
          },
        ],
        "declaration-property-value-disallowed-list": {
          "/^(clear|float|text-align|text-align-last)$/": [/^(left|right)$/],
          "/^(inset|margin|padding)/": [
            /\banchor\([^)]*\b(top|right|bottom|left)\b/,
          ],
          "/^resize$/": [/^(horizontal|vertical)$/],
          "/size$/": [/\banchor-size\([^)]*\b(width|height)\b/],
          "/./": [/(^|[\s(,*/+-])[\d.]+[sdl]?v[wh]\b/],
        },
        "media-feature-name-no-vendor-prefix": true,
        "opui/focus-visible": true,
        "opui/hover-media": true,
        "opui/logical-shorthands": true,
        "opui/motion-duration": true,
        "opui/state-classes": true,
        "opui/vendor-prefix": true,
        "property-disallowed-list": [
          /^(-webkit-)?(min-|max-)?(width|height)$/,
          /^(top|right|bottom|left)$/,
          /^(margin|padding|scroll-margin|scroll-padding)-(top|right|bottom|left)$/,
          /^border-(top|right|bottom|left)(-(color|style|width))?$/,
          /^border-(top|bottom)-(left|right)-radius$/,
          /^contain-intrinsic-(width|height)$/,
          /^overflow-[xy]$/,
          /^overscroll-behavior-[xy]$/,
        ],
        "selector-no-vendor-prefix": [
          true,
          {
            message: (selector) =>
              `Expected the standard selector instead of "${selector}": a vendor selector is only for a native control part that has no standard one`,
          },
        ],
        "value-no-vendor-prefix": true,
      },
    },
    {
      files: [
        "packages/opui/core/*.css",
        "packages/opui/css/compat/*.css",
        "packages/opui/css/components/*.css",
      ],
      rules: { "opui/unused-classes": true },
    },
    {
      files: ["packages/opui/core/normalize.css"],
      rules: {
        "opui/focus-visible": [
          true,
          {
            except: [
              ":where(input):autofill:focus",
              ":where(select):autofill:focus",
              ":where(textarea):autofill:focus",
            ],
          },
        ],
        "opui/hover-media": [
          true,
          {
            except: [
              ":where(input):autofill:hover",
              ":where(select):autofill:hover",
              ":where(textarea):autofill:hover",
            ],
          },
        ],
        "opui/motion-duration": [
          true,
          { except: ["transition: background-color 5000s ease-in-out 0s"] },
        ],
      },
    },
    {
      files: ["packages/opui/css/components/chip.css"],
      rules: {
        "opui/state-classes": [
          true,
          { except: ["&.ui-disabled:not(a, button)"] },
        ],
      },
    },
    {
      files: ["packages/opui/css/components/progress.css"],
      rules: {
        "opui/motion-duration": [true, { except: ["--_loop-duration: 2s"] }],
      },
    },
    {
      files: ["packages/opui/css/components/text-field.css"],
      rules: { "opui/focus-visible": [true, { except: ["&:focus"] }] },
    },
    {
      files: ["src/**/*.css"],
      rules: { "selector-class-pattern": null },
    },
  ],
  plugins: [
    "./scripts/stylelint-focus-visible.mjs",
    "./scripts/stylelint-hover-media.mjs",
    "./scripts/stylelint-logical-shorthands.mjs",
    "./scripts/stylelint-motion-duration.mjs",
    "./scripts/stylelint-state-classes.mjs",
    "./scripts/stylelint-unused-classes.mjs",
    "./scripts/stylelint-vendor-prefix.mjs",
  ],
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
