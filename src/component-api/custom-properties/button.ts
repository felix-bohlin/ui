import type { CustomProperties } from "../types"

export default {
  "--_accent": {
    description:
      "The accent color. Fills, borders, text, hover and active states are derived from it. Defaults to `--ui-button-accent` when a theme sets it. `.ui-primary` and `.ui-critical` set it.",
    kind: "input",
  },
  "--_accent-filled": {
    description:
      "Fill of filled buttons, of hovered outlined buttons unless `--ui-button-hover` is `layer`, of hovered tonal ones when it is unset, and the base of the filled hover and pressed shades. `--ui-button-accent-filled` when a theme sets it, else `--_accent`, and in `.ui-critical` `--ui-critical` kept within `--ui-accent-fill-max-lightness`, so the light text stays readable while the border keeps `--ui-critical`. `.ui-primary` resets it to `--_accent`, so the token applies to default buttons only.",
    kind: "input",
  },
  "--_accent-text": {
    description:
      "Text color of text and outlined buttons. `--_accent` in light mode. In dark mode its lightness is at least `--ui-text-min-lightness` and its chroma within `--ui-text-max-chroma`. `--ui-primary-text` in `.ui-primary` and `--ui-critical-text` in `.ui-critical`.",
    kind: "output",
  },
  "--_accent-tonal": {
    description:
      "Background of `.ui-tonal`. `--ui-surface-tonal`, a palette tint in `.ui-critical`, and `--ui-primary-tonal` or the tint in `.ui-primary`.",
    kind: "input",
  },
  "--_actions-shift": {
    description:
      "How far a text button at the start or end of `Card`, `Accordion` and `Dialog` actions pulls itself out, so its label lines up with the content: its padding and border, capped by `--ui-card-padding`, which card and accordion actions set to their own inline padding, so the focus ring stays inside the card.",
    kind: "output",
  },
  "--_bg-color": {
    description:
      "The current background. Set by the variant, hover and active states.",
    kind: "output",
  },
  "--_border-color": {
    description: "The current border color. Set by the variant and states.",
    kind: "output",
  },
  "--_border-width": {
    description: "The border width.",
    kind: "input",
  },
  "--_duration": {
    description:
      "Duration of the transitions, `--ui-duration-fast` times `--_motion`.",
    kind: "output",
  },
  "--_ease": {
    description: "Easing of the transitions. Defaults to `--ui-ease`.",
    kind: "input",
  },
  "--_end-end-radius": {
    description:
      "The radius of the end-end corner. Defaults to `--_radius`. A `ControlGroup` sets it to `0` where the button joins the next control.",
    kind: "input",
  },
  "--_end-start-radius": {
    description:
      "The radius of the end-start corner. Defaults to `--_radius`. A `ControlGroup` sets it to `0` where the button joins another control.",
    kind: "input",
  },
  "--_filled-active-bg-color": {
    description:
      "Pressed background of filled buttons, from `--_accent-filled`.",
    kind: "output",
  },
  "--_filled-hover-bg-color": {
    description: "Hover background of filled buttons, from `--_accent-filled`.",
    kind: "output",
  },
  "--_font-size": {
    description: "The font size. Set by `.ui-x-small` and `.ui-small`.",
    kind: "input",
  },
  "--_icon-size": {
    description:
      "The size of a direct child `svg`. Icon-only buttons scale it with `--_size`.",
    kind: "input",
  },
  "--_motion": {
    description: "Motion multiplier for the transitions. `0` turns them off.",
    kind: "input",
  },
  "--_on-accent": {
    description:
      "Text color on a fill of `--_accent`. Defaults to `--ui-button-on-accent` when a theme sets it. `.ui-primary` sets `--ui-on-primary`, `.ui-critical` `--ui-on-fill`.",
    kind: "input",
  },
  "--_on-accent-filled": {
    description:
      "Text color on `--_accent-filled`: filled buttons, hovered outlined ones unless `--ui-button-hover` is `layer`, and hovered tonal ones when it is unset. `--ui-button-on-accent-filled` when a theme sets it, else `--_on-accent`.",
    kind: "input",
  },
  "--_on-accent-tonal": {
    description: "Text color of `.ui-tonal`.",
    kind: "input",
  },
  "--_outlined-active-bg-color": {
    description:
      "Pressed background of outlined and tonal buttons: `--_filled-active-bg-color`. The pressed state layer with `--ui-button-hover: layer`.",
    kind: "output",
  },
  "--_outlined-active-border-color": {
    description:
      "Pressed border of outlined buttons. The pressed background, or `--_accent` with `--ui-button-hover: layer`.",
    kind: "output",
  },
  "--_outlined-active-text-color": {
    description:
      "Pressed text color of outlined buttons. `--_on-accent-filled`, or `--_accent-text` with `--ui-button-hover: layer`.",
    kind: "output",
  },
  "--_outlined-hover-bg-color": {
    description:
      "Hover background of outlined buttons. `--_accent-filled`, or the hover state layer with `--ui-button-hover: layer`.",
    kind: "output",
  },
  "--_outlined-hover-border-color": {
    description:
      "Hover border of outlined buttons. `--_accent-filled`, or `--_accent` with `--ui-button-hover: layer`.",
    kind: "output",
  },
  "--_outlined-hover-text-color": {
    description:
      "Hover text color of outlined buttons. `--_on-accent-filled`, or `--_accent-text` with `--ui-button-hover: layer`.",
    kind: "output",
  },
  "--_padding-inline": {
    description:
      "The inline padding. Set by the size classes from `--ui-button-padding-inline` and its size variants.",
    kind: "input",
  },
  "--_radius": {
    description:
      "The corner radius. Defaults to `--ui-button-radius`, or `--ui-radius` when the theme doesn't set it. `.ui-round` makes it round.",
    kind: "input",
  },
  "--_selected-bg-color": {
    description:
      'Background of the current page (`aria-current="page"`) in text and outlined buttons: `--_accent` at `--ui-state-selected-alpha-accent`, the tint of the current `List` row, so a theme tunes it apart from the hover and press feedback.',
    kind: "output",
  },
  "--_selected-text-color": {
    description:
      "Text color of the current page in text, outlined and tonal buttons. `--ui-text-strong`, which stays readable on the tint in every theme.",
    kind: "output",
  },
  "--_shadow": {
    description:
      "The shadow. `--ui-button-shadow`, or `--ui-shadow-control` when the theme leaves it unset, on `.ui-filled`, `.ui-outlined` and `.ui-tonal`, `--ui-button-hover-shadow` on hover when a theme sets it, none on text buttons and in a `ControlGroup`.",
    kind: "output",
  },
  "--_size": {
    description:
      "The height, and the width of an icon-only button. Defaults to `--ui-button-size`, set by the size classes.",
    kind: "input",
  },
  "--_start-end-radius": {
    description:
      "The radius of the start-end corner. Defaults to `--_radius`. A `ControlGroup` sets it to `0` where the button joins another control.",
    kind: "input",
  },
  "--_start-start-radius": {
    description:
      "The radius of the start-start corner. Defaults to `--_radius`. A `ControlGroup` sets it to `0` where the button joins the control before it.",
    kind: "input",
  },
  "--_text-color": {
    description:
      "The current text color. Set by the variant, hover, active and disabled states.",
    kind: "output",
  },
  "--_tonal-active-bg-color": {
    description:
      "Pressed background of tonal buttons. `--_outlined-active-bg-color`, the pressed state layer over `--_accent-tonal` with `--ui-button-hover: layer`, or `--_tonal-hover-bg-color` a step further from the page with `shade-all`.",
    kind: "output",
  },
  "--_tonal-active-text-color": {
    description:
      "Pressed text color of tonal buttons. `--_on-accent-filled`, or `--_on-accent-tonal` with `--ui-button-hover` set to `layer` or `shade-all`.",
    kind: "output",
  },
  "--_tonal-hover-bg-color": {
    description:
      "Hover background of tonal buttons. `--_accent-filled`, the hover state layer over `--_accent-tonal` with `--ui-button-hover: layer`, or with `shade-all` `--ui-surface-tonal-hover`, and in `.ui-primary` and `.ui-critical` `--_accent-tonal` shaded the same way.",
    kind: "output",
  },
  "--_tonal-hover-text-color": {
    description:
      "Hover text color of tonal buttons. `--_on-accent-filled`, or `--_on-accent-tonal` with `--ui-button-hover` set to `layer` or `shade-all`.",
    kind: "output",
  },
  "--_tonal-selected-bg-color": {
    description:
      "Background of the current page in tonal buttons: `--_accent-tonal` with white or black at `--ui-state-selected-alpha-accent`, away from the text where the fill has room. White on fills darker than L 0.9 in light mode and on fills darker than L 0.3 in dark mode, black on the rest, so it differs from its tonal neighbors even when the fill is already as light or as dark as the page.",
    kind: "output",
  },
  "--_transparent-active-bg-color": {
    description:
      "Pressed background of text buttons, from `--_accent`. As light as the hover background in dark mode with more contrast, so the text keeps 7:1.",
    kind: "output",
  },
  "--_transparent-hover-bg-color": {
    description: "Hover background of text buttons, from `--_accent`.",
    kind: "output",
  },
} satisfies CustomProperties
