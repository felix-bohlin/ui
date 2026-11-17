import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Button`, `Callout`, `ControlGroup`, `.ui-link` and rich text links read `--ui-primary-text` for primary text. It defaults to `--ui-primary` with its lightness kept within `--ui-text-max-lightness` and `--ui-text-min-lightness`, so it keeps 4.5:1 on every surface and every primary text is one color, and themes whose primary is too light or too dark to read set it.",
  notes: {
    button: `<a href="#colors">Primary</a> outlined and text buttons read <code>--ui-primary-text</code>, the same readable primary as links, and critical ones <code>--ui-critical-text</code>.`,
    callout: `<a href="#severities">Links</a> in a callout turn <code>--ui-primary-text</code> on hover and focus, the primary that keeps 4.5:1 on every surface.`,
    "control-group": `<a href="#colors">Primary</a> outlined and text buttons read <code>--ui-primary-text</code>, the same readable primary as links.`,
  },
} satisfies Change
