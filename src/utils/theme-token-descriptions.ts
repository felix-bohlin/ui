export const themeTokenDescriptions: Record<string, string> = {
  "--backdrop-blur": "Blur radius behind an open `Dialog` or `Drawer`.",
  "--backdrop-color": "Overlay color behind an open `Dialog` or `Drawer`.",
  "--blue":
    "A literal blue, Open Props' `--hue-blue` at the palette lightness. No severity meaning.",
  "--border-color":
    "Default border color for cards, lists, tables and dividers.",
  "--border-radius":
    "Corner radius for every component: cards, callouts, menus, buttons and fields follow it, and small parts like `kbd`, tooltips and checkboxes never get rounder than it. Set it to `0` for square corners. Takes a single length.",
  "--border-width": "Default border width for components that draw a border.",
  "--button-border-radius":
    "Corner radius for `Button`, `ButtonGroup`, `ToggleButton` and `ToggleGroup`. When unset, they follow `--border-radius`, also where it's set on a part of the page.",
  "--button-size": "Default `Button` height.",
  "--button-size-large": "`Button` height with `.ui-large`.",
  "--button-size-small": "`Button` height with `.ui-small`.",
  "--button-size-x-small":
    "`Button` and `ButtonGroup` height with `.ui-x-small`.",
  "--chip-size": "Default `Chip` height.",
  "--chip-size-large": "`Chip` height with `.ui-large`.",
  "--chip-size-small": "`Chip` height with `.ui-small`.",
  "--chip-size-x-small": "`Chip` height with `.ui-x-small`.",
  "--choice-label-offset":
    "Moves `Checkbox`, `Radio` and `Switch` labels down (positive) or up (negative) against their control. Use `em` or `cap` to scale with the label font.",
  "--choice-size": "Default `Checkbox` and `Radio` input size.",
  "--choice-size-large": "`Checkbox` and `Radio` input size with `.ui-large`.",
  "--choice-size-small":
    "`Checkbox` and `Radio` input size with `.ui-small` and inside `List`.",
  "--choice-size-x-small":
    "`Checkbox` and `Radio` input size with `.ui-x-small`.",
  "--contrast":
    "`more` raises text, border, primary and focus ring contrast through a style query. Set to `more` automatically under `prefers-contrast: more`. See [Contrast](/guide/theming#contrast).",
  "--control-size":
    "Shared default height for fields and buttons so they line up.",
  "--control-size-large": "Shared large height for fields and buttons.",
  "--control-size-small": "Shared small height for fields and buttons.",
  "--control-size-x-small": "Shared x-small height for fields and buttons.",
  "--critical": "Severity color for errors and destructive actions.",
  "--density":
    "Multiplier for the `--control-size*` scale. `0.875` is compact, `1.125` is comfortable. See [Density](/guide/theming#density).",
  "--disabled-opacity": "Opacity applied to disabled controls.",
  "--divider-space":
    "Block margin around a `Divider`, times `--space-scale`. Cards, callouts, dialogs and drawers set it to `--space-3`. A divider that is a direct child of a card has no margin, since the card's gap already spaces it.",
  "--duration": "Default transition duration. Multiplied by `--motion`.",
  "--duration-fast": "Transition duration for hover and press feedback.",
  "--duration-slow":
    "Transition duration for entering and leaving overlays and toasts.",
  "--ease": "Default easing for transitions.",
  "--ease-enter": "Easing for elements entering the screen.",
  "--ease-exit": "Easing for elements leaving the screen.",
  "--field-border-color":
    "Border color for `TextField`, `Select`, `Textarea`, `Radio` and `Range`.",
  "--field-border-radius":
    "Corner radius for fields. When unset, they follow `--border-radius`, also where it's set on a part of the page.",
  "--field-border-width":
    "Border width for fields, `Checkbox`, `Radio` and `Switch`.",
  "--field-helper-color": "Text color for helper and end text under a field.",
  "--field-helper-font-size":
    "Font size for helper and end text under a field.",
  "--field-helper-line-height":
    "Line height for helper and end text under a field.",
  "--field-label-color": "Text color for field labels.",
  "--field-label-font-size": "Font size for field labels.",
  "--field-label-font-weight":
    "Font weight for emphasized field labels and legends.",
  "--field-required-color": "Color of the required asterisk.",
  "--field-size": "Default field height.",
  "--field-size-large": "Field height with `.ui-large`.",
  "--field-size-small": "Field height with `.ui-small`.",
  "--field-size-x-small": "Field height with `.ui-x-small`.",
  "--focus-ring-color":
    "Color of the keyboard focus ring. By default the page background color inverted.",
  "--focus-ring-inset":
    "Negative offset for focus rings drawn inside a control, such as `ButtonGroup`, `List` items and `Select` options.",
  "--focus-ring-offset": "Distance between a control and its focus ring.",
  "--focus-ring-style": "Outline style of the focus ring.",
  "--focus-ring-width": "Width of the focus ring.",
  "--font-body":
    "Font family for body text, fields and buttons. Defaults to Open Props `--font-sans`.",
  "--font-code":
    "Font family for `code`, `kbd`, `samp` and `pre` in rich text, `.ui-kbd`, `.ui-samp`, `.ui-var`, code blocks and `kbd` in buttons and lists. Defaults to Open Props `--font-mono`.",
  "--font-heading":
    "Font family for `h1`–`h6` and the `.ui-h1`–`.ui-h6` classes. When unset, headings follow `--font-body`.",
  "--font-size-05":
    "A font size between Open Props `--font-size-0` and `--font-size-1`, used for labels and compact text.",
  "--font-size-h1": "Font size for `h1` and `.ui-h1`.",
  "--font-size-h2": "Font size for `h2` and `.ui-h2`.",
  "--font-size-h3": "Font size for `h3` and `.ui-h3`.",
  "--font-size-h4": "Font size for `h4` and `.ui-h4`.",
  "--font-size-h5": "Font size for `h5` and `.ui-h5`.",
  "--font-size-h6": "Font size for `h6` and `.ui-h6`.",
  "--font-weight-bold": "Font weight for headings, buttons and terms.",
  "--font-weight-medium": "Font weight for badges, overlines and group labels.",
  "--font-weight-normal":
    "Font weight for `List` text and `Button` keyboard shortcuts.",
  "--font-weight-semibold": "Font weight for labels, table headers and titles.",
  "--gray-chroma": "Chroma of the gray ramp. Raise it for tinted grays.",
  "--gray-hue": "Hue of the gray ramp.",
  "--green":
    "A literal green, Open Props' `--hue-green` at the palette lightness. No severity meaning.",
  "--icon-size": "Default icon size inside components.",
  "--icon-size-large": "Icon size inside `Avatar` and `List`.",
  "--icon-size-small": "Icon size inside `Chip`.",
  "--info": "Severity color for informational messages.",
  "--invalid-color": "Color for invalid field borders, fills and outlines.",
  "--invalid-text-color":
    "Color for validation messages and invalid labels. Lighter than `--invalid-color` in dark mode so the text stays readable.",
  "--motion":
    "Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](/guide/theming#motion).",
  "--neutral": "Severity color for neutral messages.",
  "--orange":
    "A literal orange, Open Props' `--hue-orange` at the palette lightness. No severity meaning.",
  "--palette-chroma":
    "Chroma of the palette source color, as a multiplier of `0.21`.",
  "--palette-hue":
    "Hue of the palette source color in degrees. Green in light mode and blue in dark mode by default.",
  "--palette-hue-rotate-by":
    "Hue drift per palette step in degrees: each step rotates one more time than the last, so `1` spreads 15° across the ramp. The severity scopes use `1` for livelier tints, the brand palette `0`.",
  "--palette-source":
    "The source color the palette is derived from. Set it to replace `--palette-hue` and `--palette-chroma`. Any color works: the palette keeps its oklch hue, scales its chroma and sets the lightness per step. See [Palette](/guide/theming#palette).",
  "--primary": "Brand color for primary actions and accents.",
  "--primary-contrast":
    "Text color on `--primary`. Derived with relative color: near-black when the primary's lightness is above 0.565, near-white below, tinted with 15% of its chroma, so a custom `--primary` gets readable text.",
  "--primary-dark": "A darker `--primary`.",
  "--primary-light": "A lighter `--primary`.",
  "--red":
    "A literal red, Open Props' `--hue-red` at the palette lightness. No severity meaning.",
  "--rhythm-step":
    "Vertical rhythm unit. Rich text margins and heading line heights round to it.",
  "--ripple-color": "Halo color for the `Checkbox` and `Radio` hover effect.",
  "--shadow-overlay":
    "Shadow of layers that float above the page: `Menu`, `Select` pickers, `Drawer` and `Toast`.",
  "--shadow-raised":
    "Shadow of raised surfaces: elevated `Card` and `Accordion`. Switches between `--shadow-raised-light` and `--shadow-raised-dark` with the color scheme, also in `.ui-light` and `.ui-dark` parts of the page. Set those two instead of this one.",
  "--shadow-raised-dark": "`--shadow-raised` in dark mode.",
  "--shadow-raised-light": "`--shadow-raised` in light mode.",
  "--space-1": "Spacing step 1: Open Props `--size-1` times `--space-scale`.",
  "--space-2": "Spacing step 2: Open Props `--size-2` times `--space-scale`.",
  "--space-3": "Spacing step 3: Open Props `--size-3` times `--space-scale`.",
  "--space-4": "Spacing step 4: Open Props `--size-4` times `--space-scale`.",
  "--space-5": "Spacing step 5: Open Props `--size-5` times `--space-scale`.",
  "--space-6": "Spacing step 6: Open Props `--size-6` times `--space-scale`.",
  "--space-7": "Spacing step 7: Open Props `--size-7` times `--space-scale`.",
  "--space-8": "Spacing step 8: Open Props `--size-8` times `--space-scale`.",
  "--space-scale":
    "Multiplier for the `--space-*` scale, the gaps, padding and margins of containers such as cards, dialogs, forms, tables and rich text. Controls follow `--density` instead. See [Spacing](/guide/theming#spacing).",
  "--state-active-alpha":
    "Alpha of the pressed state layer on neutral buttons in light mode.",
  "--state-active-alpha-accent":
    "Alpha of the pressed state layer on primary and critical buttons.",
  "--state-active-alpha-dark":
    "Alpha of the pressed state layer on neutral buttons in dark mode.",
  "--state-hover-alpha":
    "Alpha of the hover state layer on neutral buttons in light mode.",
  "--state-hover-alpha-accent":
    "Alpha of the hover state layer on primary and critical buttons.",
  "--state-hover-alpha-dark":
    "Alpha of the hover state layer on neutral buttons in dark mode.",
  "--success": "Severity color for success messages.",
  "--surface-default": "Page and card background.",
  "--surface-elevated": "Background of elevated cards and accordions.",
  "--surface-filled":
    "Background of filled areas such as progress tracks and table stripes.",
  "--surface-inverse":
    "Background of `Toast` and `Tooltip`, inverted against the page.",
  "--surface-tonal": "Background of tonal variants.",
  "--switch-dot-size": "Diameter of the `Switch` dot.",
  "--switch-dot-size-large": "Diameter of the `Switch` dot with `.ui-large`.",
  "--switch-dot-size-small":
    "Diameter of the `Switch` dot with `.ui-small` and inside `List`.",
  "--switch-dot-size-x-small":
    "Diameter of the `Switch` dot with `.ui-x-small`.",
  "--switch-track-height": "Height of the `Switch` track.",
  "--switch-track-height-large":
    "Height of the `Switch` track with `.ui-large`.",
  "--switch-track-height-small":
    "Height of the `Switch` track with `.ui-small` and inside `List`.",
  "--switch-track-height-x-small":
    "Height of the `Switch` track with `.ui-x-small`.",
  "--switch-track-width": "Width of the `Switch` track.",
  "--switch-track-width-large": "Width of the `Switch` track with `.ui-large`.",
  "--switch-track-width-small":
    "Width of the `Switch` track with `.ui-small` and inside `List`.",
  "--switch-track-width-x-small":
    "Width of the `Switch` track with `.ui-x-small`.",
  "--text-disabled": "Text color of disabled buttons and chips.",
  "--text-inverse": "Text color on `--surface-inverse`.",
  "--text-muted": "Body text color.",
  "--text-muted-contrast": "Muted text color on an inverted surface.",
  "--text-primary": "Emphasized text color for headings, labels and values.",
  "--text-primary-contrast":
    "Same as `--text-inverse`. Kept for older themes, use `--text-inverse` instead.",
  "--warning": "Severity color for warnings.",
}
