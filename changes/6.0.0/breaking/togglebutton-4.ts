import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`ToggleButton` icon styles only apply to a direct child `svg`, sized with `--_icon-size`. An `svg` nested in another element is no longer sized, so move it out of its wrapper, like in `Button`.",
  migrating: ["toggle-button-and-toggle-group"],
  notes: {
    toggle: `<code>ToggleButton</code> <code>--_button-bg-color</code> is <code>--_selected-bg-color</code> for the checked button, and <code>--_svg-size</code> is <code>--_icon-size</code>, which sizes direct child <code>svg</code>s like Button (<a href="#under-the-hood">Under the hood</a>).`,
  },
} satisfies Change
