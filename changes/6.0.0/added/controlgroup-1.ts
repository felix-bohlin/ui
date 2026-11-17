import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`ControlGroup` joins a `TextField`, `Select` or `NumberField` with its buttons into one control, and a `Textarea` in a vertical group (beside the buttons, a field that grows past one line would leave a corner square with nothing next to it). Every control keeps its own border and focus ring: the group overlaps their edges by one border width, squares the corners they share, puts a field over the buttons next to it unless the group is outlined, then a hovered field or outlined button, an invalid control and a focused one on top, and drops their shadows. Children that don't render, such as a `Menu` or a tooltip, sit anywhere between the controls without changing their edges. A text field or textarea takes the free space, so a group with one fills the line like a field, a visible label sits above its control and the controls line up at the bottom. `size` sizes the fields with the buttons. `Button` and the fields draw their corners from `--_start-start-radius`, `--_start-end-radius`, `--_end-start-radius` and `--_end-end-radius`, which the group sets, and the fields take `--_radius` and `--_shadow`, like `Button`.",
  notes: {
    "control-group": [
      `Buttons and fields draw their corners from <code>--_start-start-radius</code>, <code>--_start-end-radius</code>, <code>--_end-start-radius</code> and <code>--_end-end-radius</code>, which the group sets where controls meet, and fields take <code>--_radius</code> and <code>--_shadow</code> like buttons. Controls in a group drop their shadows (<a href="#under-the-hood">Under the hood</a>).`,
      `<a href="#split-button">Split button</a> with a <code>Menu</code>.`,
      {
        default: `<a href="#sizes">x-small</a> size with <code>size="x-small"</code>, and <code>size</code> sizes the fields with the buttons.`,
        html: `<a href="#sizes">x-small</a> size with <code>.ui-x-small</code>, and the size classes size the fields with the buttons.`,
      },
    ],
  },
} satisfies Change
