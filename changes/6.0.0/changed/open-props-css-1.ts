import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`open-props.css` imports the Open Props files one by one instead of `open-props/src/index.css`, so `dist/op.css` and `dist/opui.css` no longer contain Open Props' `@custom-media` rules. Import `open-props/media` yourself if a PostCSS plugin reads them.",
} satisfies Change
