import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Typography` rich text lives in a new `components.prose` layer, below `components.root`, so component styles inside rich text win over prose styles. The layer order is `openprops, theme, normalize, components.prose, components.root, components.extended, components.compat, utils`. If you declare the layer order yourself, add `components.prose` before `components.root`, or it sorts after `components.extended` and prose styles beat component styles inside rich text.",
  migrating: ["typography-and-rich-text"],
  notes: {
    typography: `<a href="#classless">rich text</a> sits in the <code>components.prose</code> layer, below components, so components inside prose keep their own styles. If you declare the layer order yourself, add <code>components.prose</code> before <code>components.root</code>.`,
  },
} satisfies Change
