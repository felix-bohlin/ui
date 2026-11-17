import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Button` critical keeps light text on a fill a little darker than `--ui-critical`, while its border keeps `--ui-critical`, tonal primary and critical buttons use dark text on a light container in light mode and light text on a dark container in dark mode, and text and outlined buttons use a lighter accent for text in dark mode.",
  notes: {
    button: `<a href="#colors">Critical</a> fills and their hover and pressed shades stay within <code>--ui-accent-fill-max-lightness</code>, and the border keeps <code>--ui-critical</code>.`,
  },
} satisfies Change
