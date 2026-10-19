export const themeTokenDescriptions: Record<string, string> = {
  "--ui-backdrop-blur": "Blur radius behind an open `Dialog` or `Drawer`.",
  "--ui-backdrop-color": "Overlay color behind an open `Dialog` or `Drawer`.",
  "--ui-blue":
    "A literal blue, Open Props' `--hue-blue` at the palette lightness. No severity meaning.",
  "--ui-border-color":
    "Default border color for cards, lists, tables and dividers.",
  "--ui-border-radius":
    "Corner radius for every component: cards, callouts, menus, buttons and fields follow it, and small parts like `kbd`, tooltips and checkboxes never get rounder than it. Set it to `0` for square corners. Takes a single length.",
  "--ui-border-width":
    "Default border width for components that draw a border.",
  "--ui-button-border-color":
    "Border color of `Button` with `.ui-filled`, `.ui-outlined` or `.ui-tonal`, and of an outlined `ButtonGroup`. When unset, filled and tonal buttons have no visible border and outlined ones use their color.",
  "--ui-button-border-radius":
    "Corner radius for `Button`, `ButtonGroup`, `ToggleButton` and `ToggleGroup`. When unset, they follow `--ui-border-radius`, also where it's set on a part of the page.",
  "--ui-button-font-weight":
    "Font weight of `Button`. When unset, buttons follow `--ui-font-weight-bold`.",
  "--ui-button-hover-shadow":
    "Shadow of `Button` with `.ui-filled`, `.ui-outlined` or `.ui-tonal` on hover. When unset, it keeps `--ui-shadow-control`.",
  "--ui-button-hover-translate":
    "Moves `Button` with `.ui-filled`, `.ui-outlined` or `.ui-tonal` on hover, as a `translate` value. Pair it with `--ui-button-hover-shadow` to press buttons into their shadow. `none` when unset.",
  "--ui-button-size": "Default `Button` height.",
  "--ui-button-size-large": "`Button` height with `.ui-large`.",
  "--ui-button-size-small": "`Button` height with `.ui-small`.",
  "--ui-button-size-x-small":
    "`Button` and `ButtonGroup` height with `.ui-x-small`.",
  "--ui-chip-size": "Default `Chip` height.",
  "--ui-chip-size-large": "`Chip` height with `.ui-large`.",
  "--ui-chip-size-small": "`Chip` height with `.ui-small`.",
  "--ui-chip-size-x-small": "`Chip` height with `.ui-x-small`.",
  "--ui-choice-label-offset":
    "Moves `Checkbox`, `Radio` and `Switch` labels down (positive) or up (negative) against their control. Use `em` or `cap` to scale with the label font.",
  "--ui-choice-size": "Default `Checkbox` and `Radio` input size.",
  "--ui-choice-size-large":
    "`Checkbox` and `Radio` input size with `.ui-large`.",
  "--ui-choice-size-small":
    "`Checkbox` and `Radio` input size with `.ui-small` and inside `List`.",
  "--ui-choice-size-x-small":
    "`Checkbox` and `Radio` input size with `.ui-x-small`.",
  "--ui-contrast":
    "`more` raises text, border, primary and focus ring contrast through a style query. Set to `more` automatically under `prefers-contrast: more`. See [Contrast](/guide/theming#contrast).",
  "--ui-control-size":
    "Shared default height for fields and buttons so they line up.",
  "--ui-control-size-large": "Shared large height for fields and buttons.",
  "--ui-control-size-small": "Shared small height for fields and buttons.",
  "--ui-control-size-x-small": "Shared x-small height for fields and buttons.",
  "--ui-critical": "Severity color for errors and destructive actions.",
  "--ui-density":
    "Multiplier for the `--ui-control-size*` scale. `0.875` is compact, `1.125` is comfortable. See [Density](/guide/theming#density).",
  "--ui-disabled-opacity": "Opacity applied to disabled controls.",
  "--ui-divider-space":
    "Block margin around a `Divider`, times `--ui-space-scale`. Cards, callouts, dialogs and drawers set it to `--ui-space-3`. A divider that is a direct child of a card has no margin, since the card's gap already spaces it.",
  "--ui-duration": "Default transition duration. Multiplied by `--ui-motion`.",
  "--ui-duration-fast": "Transition duration for hover and press feedback.",
  "--ui-duration-slow":
    "Transition duration for entering and leaving overlays and toasts.",
  "--ui-ease": "Default easing for transitions.",
  "--ui-ease-enter": "Easing for elements entering the screen.",
  "--ui-ease-exit": "Easing for elements leaving the screen.",
  "--ui-field-border-color":
    "Border color for `TextField`, `Select`, `Textarea`, `Radio` and `Range`.",
  "--ui-field-border-radius":
    "Corner radius for fields. When unset, they follow `--ui-border-radius`, also where it's set on a part of the page.",
  "--ui-field-border-width":
    "Border width for fields, `Checkbox`, `Radio` and `Switch`.",
  "--ui-field-helper-color":
    "Text color for helper and end text under a field.",
  "--ui-field-helper-font-size":
    "Font size for helper and end text under a field.",
  "--ui-field-helper-line-height":
    "Line height for helper and end text under a field.",
  "--ui-field-label-color": "Text color for field labels.",
  "--ui-field-label-font-size": "Font size for field labels.",
  "--ui-field-label-font-weight":
    "Font weight for emphasized field labels and legends.",
  "--ui-field-required-color": "Color of the required asterisk.",
  "--ui-field-size": "Default field height.",
  "--ui-field-size-large": "Field height with `.ui-large`.",
  "--ui-field-size-small": "Field height with `.ui-small`.",
  "--ui-field-size-x-small": "Field height with `.ui-x-small`.",
  "--ui-focus-ring-color":
    "Color of the keyboard focus ring. By default the page background color inverted.",
  "--ui-focus-ring-inset":
    "Negative offset for focus rings drawn inside a control, such as `ButtonGroup`, `List` items and `Select` options.",
  "--ui-focus-ring-offset": "Distance between a control and its focus ring.",
  "--ui-focus-ring-style": "Outline style of the focus ring.",
  "--ui-focus-ring-width": "Width of the focus ring.",
  "--ui-font-body":
    "Font family for body text, fields and buttons. Defaults to Open Props `--font-sans`.",
  "--ui-font-code":
    "Font family for `code`, `kbd`, `samp` and `pre` in rich text, `.ui-kbd`, `.ui-samp`, `.ui-var`, code blocks and `kbd` in buttons and lists. Defaults to Open Props `--font-mono`.",
  "--ui-font-heading":
    "Font family for `h1`–`h6` and the `.ui-h1`–`.ui-h6` classes. When unset, headings follow `--ui-font-body`.",
  "--ui-font-size-05":
    "A font size between Open Props `--font-size-0` and `--font-size-1`, used for labels and compact text.",
  "--ui-font-size-control":
    "Font size of the default `Button`, `TextField`, `Textarea` and `Select`. The size classes set their own.",
  "--ui-font-size-h1": "Font size for `h1` and `.ui-h1`.",
  "--ui-font-size-h2": "Font size for `h2` and `.ui-h2`.",
  "--ui-font-size-h3": "Font size for `h3` and `.ui-h3`.",
  "--ui-font-size-h4": "Font size for `h4` and `.ui-h4`.",
  "--ui-font-size-h5": "Font size for `h5` and `.ui-h5`.",
  "--ui-font-size-h6": "Font size for `h6` and `.ui-h6`.",
  "--ui-font-weight-bold": "Font weight for headings, buttons and terms.",
  "--ui-font-weight-medium":
    "Font weight for badges, overlines and group labels.",
  "--ui-font-weight-normal":
    "Font weight for `List` text and `Button` keyboard shortcuts.",
  "--ui-font-weight-semibold":
    "Font weight for labels, table headers and titles.",
  "--ui-gray-chroma": "Chroma of the gray ramp. Raise it for tinted grays.",
  "--ui-gray-hue": "Hue of the gray ramp.",
  "--ui-green":
    "A literal green, Open Props' `--hue-green` at the palette lightness. No severity meaning.",
  "--ui-icon-size": "Default icon size inside components.",
  "--ui-icon-size-large": "Icon size inside `Avatar` and `List`.",
  "--ui-icon-size-small": "Icon size inside `Chip`.",
  "--ui-info": "Severity color for informational messages.",
  "--ui-invalid-color": "Color for invalid field borders, fills and outlines.",
  "--ui-invalid-text-color":
    "Color for validation messages and invalid labels. Lighter than `--ui-invalid-color` in dark mode so the text stays readable.",
  "--ui-motion":
    "Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](/guide/theming#motion).",
  "--ui-neutral": "Severity color for neutral messages.",
  "--ui-orange":
    "A literal orange, Open Props' `--hue-orange` at the palette lightness. No severity meaning.",
  "--ui-palette-chroma":
    "Chroma of the palette source color, as a multiplier of `0.21`.",
  "--ui-palette-hue":
    "Hue of the palette source color in degrees. Green in light mode and blue in dark mode by default.",
  "--ui-palette-hue-rotate-by":
    "Hue drift per palette step in degrees: each step rotates one more time than the last, so `1` spreads 15° across the ramp. The severity scopes use `1` for livelier tints, the brand palette `0`.",
  "--ui-palette-source":
    "The source color the palette is derived from. Set it to replace `--ui-palette-hue` and `--ui-palette-chroma`. Any color works: the palette keeps its oklch hue, scales its chroma and sets the lightness per step. See [Palette](/guide/theming#palette).",
  "--ui-primary": "Brand color for primary actions and accents.",
  "--ui-primary-contrast":
    "Text color on `--ui-primary`. Derived with relative color: near-black when the primary's lightness is above 0.565, near-white below, tinted with 15% of its chroma, so a custom `--ui-primary` gets readable text.",
  "--ui-primary-dark": "A darker `--ui-primary`.",
  "--ui-primary-light": "A lighter `--ui-primary`.",
  "--ui-primary-text":
    "Primary as a text color: links, and `Button` with `.ui-primary` and no variant or `.ui-outlined`. When unset, each derives a readable shade from `--ui-primary`. Set it when the primary is too light or too dark for text.",
  "--ui-red":
    "A literal red, Open Props' `--hue-red` at the palette lightness. No severity meaning.",
  "--ui-rhythm-step":
    "Vertical rhythm unit. Rich text margins and heading line heights round to it.",
  "--ui-ripple-color":
    "Halo color for the `Checkbox` and `Radio` hover effect.",
  "--ui-shadow-control":
    "Shadow of buttons with a variant and of fields. `none` by default, for themes that lift controls off the page.",
  "--ui-shadow-overlay":
    "Shadow of layers that float above the page: `Menu`, `Select` pickers, `Drawer` and `Toast`.",
  "--ui-shadow-raised":
    "Shadow of raised surfaces: elevated `Card` and `Accordion`. Switches between `--ui-shadow-raised-light` and `--ui-shadow-raised-dark` with the color scheme, also in `.ui-light` and `.ui-dark` parts of the page. Set those two instead of this one.",
  "--ui-shadow-raised-dark": "`--ui-shadow-raised` in dark mode.",
  "--ui-shadow-raised-light": "`--ui-shadow-raised` in light mode.",
  "--ui-space-1":
    "Spacing step 1: Open Props `--size-1` times `--ui-space-scale`.",
  "--ui-space-2":
    "Spacing step 2: Open Props `--size-2` times `--ui-space-scale`.",
  "--ui-space-3":
    "Spacing step 3: Open Props `--size-3` times `--ui-space-scale`.",
  "--ui-space-4":
    "Spacing step 4: Open Props `--size-4` times `--ui-space-scale`.",
  "--ui-space-5":
    "Spacing step 5: Open Props `--size-5` times `--ui-space-scale`.",
  "--ui-space-6":
    "Spacing step 6: Open Props `--size-6` times `--ui-space-scale`.",
  "--ui-space-7":
    "Spacing step 7: Open Props `--size-7` times `--ui-space-scale`.",
  "--ui-space-8":
    "Spacing step 8: Open Props `--size-8` times `--ui-space-scale`.",
  "--ui-space-scale":
    "Multiplier for the `--space-*` scale, the gaps, padding and margins of containers such as cards, dialogs, forms, tables and rich text. Controls follow `--ui-density` instead. See [Spacing](/guide/theming#spacing).",
  "--ui-state-active-alpha":
    "Alpha of the pressed state layer on neutral buttons in light mode.",
  "--ui-state-active-alpha-accent":
    "Alpha of the pressed state layer on primary and critical buttons.",
  "--ui-state-active-alpha-dark":
    "Alpha of the pressed state layer on neutral buttons in dark mode.",
  "--ui-state-hover-alpha":
    "Alpha of the hover state layer on neutral buttons in light mode.",
  "--ui-state-hover-alpha-accent":
    "Alpha of the hover state layer on primary and critical buttons.",
  "--ui-state-hover-alpha-dark":
    "Alpha of the hover state layer on neutral buttons in dark mode.",
  "--ui-success": "Severity color for success messages.",
  "--ui-surface-default": "Page and card background.",
  "--ui-surface-elevated": "Background of elevated cards and accordions.",
  "--ui-surface-filled":
    "Background of filled areas such as progress tracks and table stripes.",
  "--ui-surface-inverse":
    "Background of `Toast` and `Tooltip`, inverted against the page.",
  "--ui-surface-tonal": "Background of tonal variants.",
  "--ui-switch-dot-size": "Diameter of the `Switch` dot.",
  "--ui-switch-dot-size-large":
    "Diameter of the `Switch` dot with `.ui-large`.",
  "--ui-switch-dot-size-small":
    "Diameter of the `Switch` dot with `.ui-small` and inside `List`.",
  "--ui-switch-dot-size-x-small":
    "Diameter of the `Switch` dot with `.ui-x-small`.",
  "--ui-switch-track-height": "Height of the `Switch` track.",
  "--ui-switch-track-height-large":
    "Height of the `Switch` track with `.ui-large`.",
  "--ui-switch-track-height-small":
    "Height of the `Switch` track with `.ui-small` and inside `List`.",
  "--ui-switch-track-height-x-small":
    "Height of the `Switch` track with `.ui-x-small`.",
  "--ui-switch-track-width": "Width of the `Switch` track.",
  "--ui-switch-track-width-large":
    "Width of the `Switch` track with `.ui-large`.",
  "--ui-switch-track-width-small":
    "Width of the `Switch` track with `.ui-small` and inside `List`.",
  "--ui-switch-track-width-x-small":
    "Width of the `Switch` track with `.ui-x-small`.",
  "--ui-text-disabled": "Text color of disabled buttons and chips.",
  "--ui-text-inverse": "Text color on `--ui-surface-inverse`.",
  "--ui-text-muted": "Body text color.",
  "--ui-text-muted-contrast": "Muted text color on an inverted surface.",
  "--ui-text-primary": "Emphasized text color for headings, labels and values.",
  "--ui-text-primary-contrast":
    "Same as `--ui-text-inverse`. Kept for older themes, use `--ui-text-inverse` instead.",
  "--ui-warning": "Severity color for warnings.",
}
