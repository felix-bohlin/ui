import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`open-props` is an optional peer dependency. `theme.css` and the example themes read nothing from Open Props: the sizes, radii, border size, easings, font stacks, font weights, hues and shadow shapes they took from it are written into `theme.css` with the same values, so `tokens.json` holds no `var(--size-2)` style values. `css/imports.css` no longer imports `open-props.css`, so a bundler build needs no `open-props` package. `dist/opui.css` still bundles Open Props, and `opui-css/open-props` (`dist/op.css`) and `open-props.css` stay for your own CSS. Install `open-props` only to import `open-props.css`.",
} satisfies Change
