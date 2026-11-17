import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`package.json` `exports` resolve documented source imports with a `.css` extension (`opui-css/css/imports.css`, `opui-css/core/normalize.css`, `opui-css/css/components/button.css`, …) Previously they resolved to `*.css.css`.",
} satisfies Change
