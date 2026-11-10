import type { CustomProperties } from "../types"

export default {
  "--_border-color": {
    description:
      "Border color of each button. `ButtonBorder` in forced colors, so the edges between buttons stay visible.",
    kind: "output",
  },
  "--_divider-accent": {
    description:
      "The color `--_divider-enabled-border-color` lightens or darkens by 0.1, like the button's `--_accent-tonal`: `--ui-surface-tonal`, the palette tint in `.ui-critical`, and `--ui-primary-tonal` or the tint in `.ui-primary`. In a filled `.ui-critical` or `.ui-primary` group, `--ui-critical` within `--ui-accent-fill-max-lightness` or `--ui-primary`, like the button's `--_accent-fill`.",
    kind: "input",
  },
  "--_divider-border-color": {
    description:
      "Color of the line between two buttons without a border of their own, which the rule reads, and `--_start-border-color` in a group that isn't tonal or filled: `--_divider-enabled-border-color`, or `--_divider-disabled-border-color` in a group whose buttons are all disabled.",
    kind: "output",
  },
  "--_divider-disabled-border-color": {
    description:
      "`--_divider-enabled-border-color` at `--ui-disabled-opacity`, the line in a group whose buttons are all disabled.",
    kind: "output",
  },
  "--_divider-enabled-border-color": {
    description:
      "Color of the line while a button in the group is enabled, from `--_divider-accent`. In a `.ui-filled` group without a color, `currentColor`, so where the buttons overlap each one draws the line in its own text color, and the rule between them is `transparent`, so the surface behind the group shows through. `--ui-control-border-color-filled`, the hook for filled controls, replaces it when a theme sets it.",
    kind: "input",
  },
  "--_divider-gap": {
    description:
      "The gap between two controls, and the width of the rule the browser draws in it (`column-rule`, or `row-rule` in `.ui-vertical`), only between controls on the same row. `--ui-border-width` in a group that isn't outlined, so a wrapped row never starts with a line. `0px` where a field's label or help text shows or a textarea sits beside the buttons, since the rule runs the full height of the row, in forced colors, in a tonal or filled group where `--ui-control-border-color-filled` is set on the group or an ancestor (`if()`), and in browsers without gap decorations or `if()` (`css/compat/control-group.css`). There the controls overlap and `--_start-border-color` draws the line.",
    kind: "output",
  },
  "--_end-end-radius": {
    description:
      "Set to `0` on every control but the last, so the corner it shares with the next control is square.",
    kind: "output",
  },
  "--_end-start-radius": {
    description:
      "Set to `0` on every control but the first, or every control but the last in `.ui-vertical`, so the corner it shares is square.",
    kind: "output",
  },
  "--_overlap": {
    description:
      "How far each control overlaps the next one, so their borders draw one line: the wider of `--ui-border-width` and `--ui-field-border-width` next to a field. Between two buttons the overlap is the button's own border width less `--_divider-gap`, so buttons with a rule between them don't overlap. A field after another control starts `--_divider-gap` earlier, so the rule sits under the field, and a field that wraps starts its row that much before the rows above.",
    kind: "output",
  },
  "--_ring-reach": {
    description:
      "How far a focus ring reaches past a control, from `--ui-focus-ring-width` and `--ui-focus-ring-offset`. `.ui-overflow-scroll` pads the scrolling row by it, so the rings aren't clipped.",
    kind: "output",
  },
  "--_shadow": {
    description:
      "Set to `none` on every control, so the group has no shadows between its controls.",
    kind: "output",
  },
  "--_start-border-color": {
    description:
      "Start border color of a button after another button, which the buttons inherit: `--_divider-border-color` where the buttons overlap and that border is the line between them, `--_divider-enabled-border-color` in a tonal or filled group, whose disabled buttons dim it with their opacity, and `transparent` where the group draws the line as a rule. In forced colors each button sets it to `ButtonBorder`, or `SelectedItem` on the current page.",
    kind: "output",
  },
  "--_start-end-radius": {
    description:
      "Set to `0` on every control but the last, or every control but the first in `.ui-vertical`, so the corner it shares is square.",
    kind: "output",
  },
  "--_start-start-radius": {
    description:
      "Set to `0` on every control but the first, so the corner it shares with the control before it is square.",
    kind: "output",
  },
} satisfies CustomProperties
