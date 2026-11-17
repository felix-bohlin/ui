import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`Accordion` clips its animating panel with `overflow-block: clip` instead of `overflow-y: clip`. `Drawer` and rich text use `overflow-inline`/`overflow-block` instead of `overflow-x`/`overflow-y`, so scrolling follows the writing mode. Browsers older than Chrome 135, Firefox 69 and Safari 26 ignore them, so there those containers, `Dialog` content, `ControlGroup` and `ToggleGroup` with `overflow="scroll"` and horizontal `Tabs` without `overflow="wrap"` scroll only through the `overflow-x` and `overflow-y` fallbacks in `compat.css`.',
  notes: {
    accordion: `The open <a href="#basics">panel</a> clips with <code>overflow-block: clip</code> while it animates, so it follows the writing mode.`,
  },
} satisfies Change
