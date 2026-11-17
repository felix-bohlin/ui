import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Button` reads optional theme tokens: `--ui-button-accent` and `--ui-button-on-accent` for the color of buttons, also in a `ControlGroup`, without `.ui-primary` or `.ui-critical`, `--ui-control-border-color` for the border of outlined buttons, `--ui-control-border-color-filled` for filled and tonal ones and for the lines between buttons in a `ControlGroup` that isn't outlined, `--ui-button-font-weight`, and `--ui-button-hover-shadow` and `--ui-button-hover-translate` for the shadow and offset on hover. In dark mode their text keeps the accent's lightness at `--ui-text-min-lightness` or more and its chroma within `--ui-text-max-chroma`, like the intent `-text` roles. `--ui-font-size-control` sets the font size of the default `Button`, `Select`, `Tabs`, `TextField`, `Textarea` and `ToggleButton`.",
  notes: {
    button: `Themes set the color of <a href="#colors">default buttons</a> with <a href="#api"><code>--ui-button-accent</code></a> and <code>--ui-button-on-accent</code>, or of every control at once with <code>--ui-control-accent</code> and <code>--ui-control-on-accent</code>, the border with <code>--ui-control-border-color</code> (outlined) and <code>--ui-control-border-color-filled</code> (filled and tonal), the font weight with <code>--ui-button-font-weight</code>, the shadow with <code>--ui-shadow-control</code>, the hover shadow and offset with <code>--ui-button-hover-shadow</code> and <code>--ui-button-hover-translate</code>, and the font size with <code>--ui-font-size-control</code>. In dark mode the text stays at least as light as <code>--ui-text-min-lightness</code>, like the intent text roles.`,
  },
} satisfies Change
