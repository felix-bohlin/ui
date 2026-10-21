export const themeTokenDescriptions: Record<string, string> = {
  "--ui-backdrop-blur": "Blur radius behind an open `Dialog` or `Drawer`.",
  "--ui-backdrop-color": "Overlay color behind an open `Dialog` or `Drawer`.",
  "--ui-blue":
    "A literal blue, Open Props' `--hue-blue` at the palette lightness. No severity meaning.",
  "--ui-border-color":
    "Default border color for cards, lists, tables and dividers.",
  "--ui-border-color-filled":
    "Border color inside filled surfaces: lists without a variant and table headers.",
  "--ui-border-color-raised":
    "Border color inside raised surfaces: tonal and elevated `Card` and `Accordion`, `Dialog`, `Drawer`, `Menu` and `Callout` without a severity. Defaults to `--ui-border-color` in light mode and the page background in dark mode.",
  "--ui-border-radius":
    "Corner radius for every component: cards, callouts, menus, buttons and fields follow it, and small parts like `kbd`, tooltips and checkboxes never get rounder than it. Set it to `0` for square corners. Takes a single length.",
  "--ui-border-width":
    "Default border width for components that draw a border.",
  "--ui-border-width-thick":
    "Width of emphasized rules: the `Table` head and foot borders, the `AvatarGroup` ring, the `Badge` border, the neutral `Chip` dot, the dotted `DescriptionList` rule, the `Tabs` indicator, and at one and a half times, the blockquote bar.",
  "--ui-button-accent":
    "Color of `Button` and `ButtonGroup` without `.ui-primary` or `.ui-critical`: the fill of filled buttons, the text and border of outlined and text buttons. When unset, the darkest palette color in light mode and the lightest in dark mode.",
  "--ui-button-accent-contrast":
    "Text color on a filled `--ui-button-accent` button. Set it with `--ui-button-accent`.",
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
  "--ui-choice-accent":
    "Fill of a checked `Checkbox`, `Radio` and `Switch`, and the thumb and fill of `Range`. When unset, `--ui-primary`, with its lightness capped in dark mode for the choice controls. Set it to `--ui-primary` for the plain primary, like Material and shadcn.",
  "--ui-choice-accent-contrast":
    "Color of the mark on a checked `Checkbox`, `Radio` and `Switch`. Set it with `--ui-choice-accent`. When unset, `--ui-primary-contrast` in light mode and near-white in dark mode.",
  "--ui-choice-label-offset":
    "Moves `Checkbox`, `Radio` and `Switch` labels down (positive) or up (negative) against their control. Use `em` or `cap` to scale with the label font.",
  "--ui-choice-size": "Default `Checkbox` and `Radio` input size.",
  "--ui-choice-size-large":
    "`Checkbox` and `Radio` input size with `.ui-large`.",
  "--ui-choice-size-small":
    "`Checkbox` and `Radio` input size with `.ui-small` and inside `List`.",
  "--ui-choice-size-x-small":
    "`Checkbox` and `Radio` input size with `.ui-x-small`.",
  "--ui-code-block-background":
    "Background of `pre.ui-code-block` and `pre` in rich text. A dark shade of the palette in both modes.",
  "--ui-code-block-color":
    "Text color of `pre.ui-code-block` and `pre` in rich text.",
  "--ui-contrast":
    "`more` raises text, border, primary and focus ring contrast through a style query. Set to `more` automatically under `prefers-contrast: more`. See [Contrast](/guide/theming#contrast).",
  "--ui-control-border-color":
    "Border color of controls without a fill: `Button` with `.ui-outlined`, the edge and dividers of an outlined `ButtonGroup`, `ToggleButton`, `ToggleGroup`, `Chip` with `.ui-outlined`, the track of `Tabs` with `.ui-outlined`, and the selected `Tabs` pill. When unset, outlined buttons use their color, the selected `Tabs` pill `--ui-field-border-color` and the rest `--ui-border-color`. Themes that outline controls like fields set it to `--ui-field-border-color`.",
  "--ui-control-filled-border-color":
    "Border color of controls with a fill: `Button` with `.ui-filled` or `.ui-tonal`, the edge and dividers of a `ButtonGroup` with one of them, a checked `ToggleButton`, `Chip` without `.ui-outlined` and the `Carousel` buttons. When unset, buttons have no visible border, the carousel buttons use a shade of their fill and the rest use `--ui-border-color`. Set it with `--ui-control-border-color` to outline every control.",
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
    "Transition duration for entering and leaving overlays.",
  "--ui-ease": "Default easing for transitions.",
  "--ui-ease-enter": "Easing for elements entering the screen.",
  "--ui-ease-exit": "Easing for elements leaving the screen.",
  "--ui-field-border-color":
    "Border color of every empty control: `TextField`, `Select`, `Textarea`, the unchecked `Checkbox`, `Radio` and `Switch`, the `Range` track and the `Progress` outline. A 50% mix of the text color into the page, so it reaches 3:1. Lighter than `--ui-border-color`, which is decorative, is a choice a theme can make.",
  "--ui-field-border-color-raised":
    "Field border color inside raised surfaces. Defaults to `--ui-field-border-color` in light mode and the page background in dark mode.",
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
  "--ui-font-size-100":
    "The smallest step of the type scale, 12px. `--ui-font-size-caption` reads it. Set the steps to reshape every size at once, or a role to move one.",
  "--ui-font-size-200":
    "Type scale step, 14px. `--ui-font-size-small` reads it.",
  "--ui-font-size-300":
    "Type scale step, 16px. `--ui-font-size-body`, `--ui-font-size-control` and `--ui-font-size-h6` read it.",
  "--ui-font-size-400":
    "Type scale step, 17.6px. `--ui-font-size-h5` reads it, and `--ui-font-size-h4` grows from it.",
  "--ui-font-size-500":
    "Type scale step, 20px. `--ui-font-size-large` reads it, `--ui-font-size-h3` grows from it and `--ui-font-size-h4` grows to it.",
  "--ui-font-size-600":
    "Type scale step, 24px. `--ui-font-size-h2` grows from it and `--ui-font-size-h3` grows to it.",
  "--ui-font-size-700":
    "Type scale step, 32px. `--ui-font-size-h1` grows from it.",
  "--ui-font-size-800":
    "Type scale step, 40px. `--ui-font-size-h2` grows to it.",
  "--ui-font-size-900":
    "The largest step of the type scale, 56px. `--ui-font-size-h1` grows to it.",
  "--ui-font-size-body":
    "Font size of body copy, `Card` text and the `Callout` title. Defaults to `--ui-font-size-300`.",
  "--ui-font-size-caption":
    "Font size of captions, `Badge`, `Chip`, `Divider` labels, `List` secondary text, `Menu` shortcuts, overlines, `small`, `figcaption` and x-small buttons, toggles and fields. Defaults to `--ui-font-size-100`.",
  "--ui-font-size-control":
    "Font size of the default `Button`, `Select`, `Tabs`, `TextField`, `Textarea` and `ToggleButton`. Small and x-small sizes read `--ui-font-size-small` and `--ui-font-size-caption`. Defaults to `--ui-font-size-300`.",
  "--ui-font-size-h1":
    "Font size for `h1` and `.ui-h1`. Fluid between `--ui-font-size-700` and `--ui-font-size-900`.",
  "--ui-font-size-h2":
    "Font size for `h2` and `.ui-h2`. Fluid between `--ui-font-size-600` and `--ui-font-size-800`.",
  "--ui-font-size-h3":
    "Font size for `h3` and `.ui-h3`. Fluid between `--ui-font-size-500` and `--ui-font-size-600`.",
  "--ui-font-size-h4":
    "Font size for `h4` and `.ui-h4`. Fluid between `--ui-font-size-400` and `--ui-font-size-500`.",
  "--ui-font-size-h5":
    "Font size for `h5` and `.ui-h5`. Defaults to `--ui-font-size-400`.",
  "--ui-font-size-h6":
    "Font size for `h6` and `.ui-h6`. Defaults to `--ui-font-size-300`.",
  "--ui-font-size-large":
    "Font size of lead paragraphs, `.ui-p.ui-large`, the `Drawer` title and large `Avatar` initials. Defaults to `--ui-font-size-500`.",
  "--ui-font-size-small":
    "Font size of helper text, `Callout`, `Table`, `Tooltip`, code blocks, dense `List` text and small buttons, chips, toggles and fields. Defaults to `--ui-font-size-200`.",
  "--ui-font-weight-bold": "Font weight for headings, buttons and terms.",
  "--ui-font-weight-medium":
    "Font weight for badges, overlines and group labels.",
  "--ui-font-weight-normal":
    "Font weight for body text, `List` text and `Button` keyboard shortcuts.",
  "--ui-font-weight-semibold":
    "Font weight for labels, table headers and titles.",
  "--ui-gray-chroma": "Chroma of the gray ramp. Raise it for tinted grays.",
  "--ui-gray-hue": "Hue of the gray ramp.",
  "--ui-green":
    "A literal green, Open Props' `--hue-green` at the palette lightness. No severity meaning.",
  "--ui-icon-size": "Default icon size inside components.",
  "--ui-icon-size-large": "Icon size inside `Avatar` and `List`.",
  "--ui-icon-size-small":
    "Icon size inside `Chip`, x-small `Avatar` and dense `List` rows, and the `Select` and autosuggest chevron.",
  "--ui-info": "Severity color for informational messages.",
  "--ui-invalid-color": "Color for invalid field borders, fills and outlines.",
  "--ui-invalid-text-color":
    "Color for validation messages and invalid labels. Lighter than `--ui-invalid-color` in dark mode so the text stays readable.",
  "--ui-letter-spacing-caps":
    "Letter spacing of uppercase text: overlines and the first paragraph of an `hgroup`.",
  "--ui-letter-spacing-display":
    "Letter spacing of `h1` and `h2`, tighter than the body.",
  "--ui-letter-spacing-heading":
    "Letter spacing of `h3` and `h4`, slightly tighter than the body.",
  "--ui-line-height":
    "Line height of interface text: labels, helpers, choice labels and field hints.",
  "--ui-line-height-body":
    "Line height of body copy: prose, captions and `List` text.",
  "--ui-line-height-relaxed": "Line height of `Tabs` labels.",
  "--ui-line-height-tight":
    "Line height of single-line controls and compact text: field inputs, `Table` cells, `Tooltip`, `Card` captions and keyboard hints in buttons.",
  "--ui-motion":
    "Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](/guide/theming#motion).",
  "--ui-neutral": "Severity color for neutral messages.",
  "--ui-orange":
    "A literal orange, Open Props' `--hue-orange` at the palette lightness. No severity meaning.",
  "--ui-palette-accent":
    "The accent shade of the current palette: `Callout` icons and outlined borders, the `abbr` underline. Stronger with more contrast. Re-derived inside every severity scope, so `.ui-success` gets a green one.",
  "--ui-palette-border":
    "The border shade of the current palette: tonal `Callout` borders. Stronger with more contrast. Re-derived inside every severity scope.",
  "--ui-palette-chroma":
    "Chroma of the palette source color, as a multiplier of `0.21`.",
  "--ui-palette-hue":
    "Hue of the palette source color in degrees. Green in light mode and blue in dark mode by default.",
  "--ui-palette-hue-rotate-by":
    "Hue drift per palette step in degrees: each step rotates one more time than the last, so `1` spreads 15° across the ramp. The severity scopes use `1` for livelier tints, the brand palette `0`.",
  "--ui-palette-ink":
    "The darkest shade of the current palette in light mode and the lightest in dark mode: `Callout` text, the default `Button` fill when `--ui-button-accent` is unset, the text of a warning `Badge`. Re-derived inside every severity scope.",
  "--ui-palette-ink-contrast": "Text color on `--ui-palette-ink`.",
  "--ui-palette-inverse":
    "A dark shade of the current palette in both modes, for inverted surfaces.",
  "--ui-palette-inverse-contrast": "Text color on `--ui-palette-inverse`.",
  "--ui-palette-source":
    "The source color the palette is derived from. Set it to replace `--ui-palette-hue` and `--ui-palette-chroma`. Any color works: the palette keeps its oklch hue, scales its chroma and sets the lightness per step. See [Palette](/guide/theming#palette).",
  "--ui-palette-text":
    "A readable text shade of the current palette: `del`, `ins`, `.ui-del` and `.ui-ins`. Darker in light mode and lighter in dark mode with more contrast. Re-derived inside every severity scope.",
  "--ui-palette-tint":
    "The tonal fill of the current palette: primary and critical tonal buttons when `--ui-primary-tonal` is unset. Stronger with more contrast. Re-derived inside every severity scope.",
  "--ui-palette-tint-contrast": "Text color on `--ui-palette-tint`.",
  "--ui-palette-tint-subtle":
    "A faint fill of the current palette: tonal severity `Callout`s. Re-derived inside every severity scope.",
  "--ui-primary": "Brand color for primary actions and accents.",
  "--ui-primary-contrast":
    "Text color on `--ui-primary`. Derived with relative color: near-black when the primary's lightness is above 0.565, near-white below, tinted with 15% of its chroma, so a custom `--ui-primary` gets readable text.",
  "--ui-primary-dark": "A darker `--ui-primary`.",
  "--ui-primary-light": "A lighter `--ui-primary`.",
  "--ui-primary-text":
    "Primary as a text color: links, and `Button` with `.ui-primary` and no variant or `.ui-outlined`. When unset, each derives a readable shade from `--ui-primary`. Set it when the primary is too light or too dark for text.",
  "--ui-primary-tonal":
    "Background of `Button` and `ButtonGroup` with `.ui-primary` and `.ui-tonal`. When unset, a light tint of the palette. Material's `primary-container` and shadcn's `secondary` go here.",
  "--ui-primary-tonal-contrast":
    "Text color on `--ui-primary-tonal`. Set it with `--ui-primary-tonal`.",
  "--ui-radius-round":
    "The pill radius for round buttons, avatars, badges, chips, radios, switches, the range track and the carousel buttons and markers.",
  "--ui-radius-small":
    "Corner radius of small parts: `kbd`, inline `code`, `mark`, `var`, `Tooltip`, the file input and a square `Avatar` image. `--ui-border-radius`, capped at 5px.",
  "--ui-radius-x-small":
    "Corner radius of the `Checkbox` box. `--ui-border-radius`, capped at 2px.",
  "--ui-red":
    "A literal red, Open Props' `--hue-red` at the palette lightness. No severity meaning.",
  "--ui-rhythm-step":
    "Vertical rhythm unit. Rich text margins and heading line heights round to it.",
  "--ui-ripple-color":
    "Halo color for the `Checkbox` and `Radio` hover effect.",
  "--ui-selected":
    "Background of a selected control: a checked `ToggleButton`, the selected `ToggleGroup` item, and a selected or current `List` item and `Select` option. When unset, `--ui-primary` on toggles and `--ui-primary` at `--ui-state-active-alpha-accent` on list items and options. Pair it with `--ui-selected-contrast`.",
  "--ui-selected-contrast":
    "Text color on `--ui-selected`. When unset, `--ui-primary-contrast` on toggles, the item's own text color on list items and `--ui-primary` on a selected `Select` option.",
  "--ui-shadow-control":
    "Shadow of buttons with a variant and of fields. `none` by default, for themes that lift controls off the page.",
  "--ui-shadow-field":
    "Shadow of `TextField`, `Textarea` and `Select` fields. When unset, they follow `--ui-shadow-control`. Set it to `none` to lift buttons but keep fields flat.",
  "--ui-shadow-overlay":
    "Shadow of layers that float above the page: `Menu`, `Select` pickers and `Drawer`.",
  "--ui-shadow-raised":
    "Shadow of raised surfaces: elevated `Card` and `Accordion`. Switches between `--ui-shadow-raised-light` and `--ui-shadow-raised-dark` with the color scheme, also in `.ui-light` and `.ui-dark` parts of the page. Set those two instead of this one.",
  "--ui-shadow-raised-dark": "`--ui-shadow-raised` in dark mode.",
  "--ui-shadow-raised-light": "`--ui-shadow-raised` in light mode.",
  "--ui-shadow-scroll":
    "Shadow under the header and above the footer of a scrolled `Dialog` or `Drawer`, and under a sticky `Table` header. Defaults to Open Props `--shadow-4`.",
  "--ui-shadow-surface":
    "Shadow of tonal and outlined `Card` and `Accordion`, and of `Callout`. `none` by default, for themes that put every surface on the same plane.",
  "--ui-shadow-tab":
    "Shadow of the selected tab in default and `.ui-filled` `Tabs`. `.ui-line` and `.ui-outlined` have none. Defaults to Open Props `--shadow-1`.",
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
  "--ui-surface-border-color":
    "Border color of tonal and elevated `Card` and `Accordion` and of `Callout` without a severity. When unset, cards and accordions use the page background color, so they stay visible on tonal surfaces, and callouts their tonal background.",
  "--ui-surface-default": "Page and card background.",
  "--ui-surface-elevated":
    "Background of elevated cards and accordions, dialogs, drawers, menus and native `Select` options.",
  "--ui-surface-filled":
    "Background of filled areas such as progress tracks and table stripes.",
  "--ui-surface-inverse": "Background of `Tooltip`, inverted against the page.",
  "--ui-surface-tonal": "Background of tonal variants.",
  "--ui-switch-dot-size": "Diameter of the `Switch` dot.",
  "--ui-switch-dot-size-large":
    "Diameter of the `Switch` dot with `.ui-large`.",
  "--ui-switch-dot-size-small":
    "Diameter of the `Switch` dot with `.ui-small` and inside `List`.",
  "--ui-switch-dot-size-x-small":
    "Diameter of the `Switch` dot with `.ui-x-small`.",
  "--ui-switch-thumb-color":
    "Color of the unchecked `Switch` thumb. The checked thumb uses `--ui-choice-accent-contrast`.",
  "--ui-switch-track-color":
    "Background of the unchecked `Switch` track when `--ui-track-color` is unset.",
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
  "--ui-text-on-accent":
    "Near-white text on a saturated fill in both modes: critical buttons, severity `Badge`s and the checked choice mark in dark mode.",
  "--ui-text-primary": "Emphasized text color for headings, labels and values.",
  "--ui-text-primary-contrast":
    "Same as `--ui-text-inverse`. Kept for older themes, use `--ui-text-inverse` instead.",
  "--ui-track-color":
    "The empty part of a track: the unchecked `Switch`, `Progress` and the `Range` track. When unset, `Progress` and tonal ranges use `--ui-surface-tonal`, the default range its field border and the switch a fixed gray.",
  "--ui-warning": "Severity color for warnings.",
}
