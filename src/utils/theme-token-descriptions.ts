export const themeTokenDescriptions: Record<string, string> = {
  "--ui-accent-fill-max-lightness":
    "The highest OKLCH lightness of an accent fill, an intent color filled under `--ui-on-accent` text: the critical, info, neutral and success `Badge`, and the fills of critical `Button`s, also in a critical `ButtonGroup`. Borders keep the intent color. `0.48`, and `0.45` with more contrast.",
  "--ui-accent-max-chroma":
    "The highest OKLCH chroma of `--ui-primary`, `--ui-invalid` and `--ui-palette-text` in dark mode when more contrast lifts them. `1` (no cap), and `0.1` with more contrast.",
  "--ui-accent-max-lightness":
    "The highest OKLCH lightness of the named colors, `--ui-neutral` and `--ui-palette-accent` in light mode. `1` (no cap), and `0.42` with more contrast.",
  "--ui-backdrop-bg-color":
    "Overlay color behind an open `Dialog` or `Drawer`.",
  "--ui-backdrop-blur": "Blur radius behind an open `Dialog` or `Drawer`.",
  "--ui-blue":
    "A literal blue, Open Props' `--hue-blue` at the palette lightness. No severity meaning.",
  "--ui-border-color":
    "Default border color for cards, lists, tables and dividers. `--ui-text-strong` mixed into `--ui-surface` at `--ui-border-strength-light` or `--ui-border-strength-dark`.",
  "--ui-border-color-on-filled":
    "Border color inside filled surfaces: lists without a variant and table headers. `List` and `Table` set `--ui-border-color` to it on those parts.",
  "--ui-border-color-on-raised":
    "Border color inside raised surfaces: tonal and elevated `Card` and `Accordion`, `Dialog`, `Drawer`, `Menu` and `Callout` without a severity. The light border mix in light mode and the page background in dark mode. Each raised component sets `--ui-border-color` to it on its root.",
  "--ui-border-color-raised":
    "Border color of tonal and elevated `Card` and `Accordion` and of `Callout` without a severity. When unset, cards and accordions use the page background color, so they stay visible on tonal surfaces, and callouts their tonal background.",
  "--ui-border-strength-dark":
    "How much of `--ui-text-strong` is mixed into `--ui-surface` for `--ui-border-color` in dark mode. `11%`, and `55%` with more contrast.",
  "--ui-border-strength-light":
    "How much of `--ui-text-strong` is mixed into `--ui-surface` for `--ui-border-color` and `--ui-border-color-on-raised` in light mode. `17%`, and `55%` with more contrast.",
  "--ui-border-width":
    "Default border width for components that draw a border.",
  "--ui-border-width-thick":
    "Width of emphasized rules: the head and foot rules of rich text tables, the `AvatarGroup` ring, the `Badge` border, the neutral `Chip` dot, the dotted `DescriptionList` rule, the `Tabs` indicator, the bar on a selected `List` row, the `Spinner` ring, and at one and a half times, the blockquote bar.",
  "--ui-button-accent":
    "Color of `Button` and `ButtonGroup` without `.ui-primary` or `.ui-critical`: the fill of filled buttons, the text and border of outlined and text buttons. When unset, the darkest palette color in light mode and the lightest in dark mode.",
  "--ui-button-accent-filled":
    "Fill of `Button` and `ButtonGroup` with `.ui-filled` and no `.ui-primary` or `.ui-critical`, and of hovered outlined and tonal ones. When unset, `--ui-button-accent`, so text, outlined and filled buttons share one color.",
  "--ui-button-font-weight":
    "Font weight of `Button`. When unset, buttons follow `--ui-font-weight-bold`.",
  "--ui-button-hover":
    "How `Button` and `ButtonGroup` show hover and pressed states. `layer` draws a translucent state layer in `--ui-state-hover-alpha-accent` and `--ui-state-active-alpha-accent`: the text color over filled and tonal buttons, the accent over outlined ones, which keep their text and border. When unset (`shade`), filled buttons shade their fill and outlined and tonal buttons fill with the accent.",
  "--ui-button-hover-shadow":
    "Shadow of `Button` with `.ui-filled`, `.ui-outlined` or `.ui-tonal` on hover. When unset, it keeps `--ui-shadow-control`.",
  "--ui-button-hover-translate":
    "Moves `Button` with `.ui-filled`, `.ui-outlined` or `.ui-tonal` on hover, as a `translate` value. Pair it with `--ui-button-hover-shadow` to press buttons into their shadow. `none` when unset.",
  "--ui-button-on-accent":
    "Text color on a filled `--ui-button-accent` button. Set it with `--ui-button-accent`.",
  "--ui-button-on-accent-filled":
    "Text color on a `--ui-button-accent-filled` fill. Set it with `--ui-button-accent-filled`.",
  "--ui-button-padding-inline":
    "Horizontal padding of `Button`. When unset, `1.5ex`, which scales with the font.",
  "--ui-button-padding-inline-large":
    "Horizontal padding of `Button` with `.ui-large`. When unset, `2.5ex`.",
  "--ui-button-padding-inline-small":
    "Horizontal padding of `Button` with `.ui-small`. When unset, `1.25ex`.",
  "--ui-button-padding-inline-x-small":
    "Horizontal padding of `Button` with `.ui-x-small`. When unset, `1ex`.",
  "--ui-button-radius":
    "Corner radius for `Button`, `ButtonGroup`, `ToggleButton` and `ToggleGroup`. When unset, they follow `--ui-radius`, also where it's set on a part of the page.",
  "--ui-button-size": "Default `Button` height.",
  "--ui-button-size-large": "`Button` height with `.ui-large`.",
  "--ui-button-size-small": "`Button` height with `.ui-small`.",
  "--ui-button-size-x-small":
    "`Button` and `ButtonGroup` height with `.ui-x-small`.",
  "--ui-card-padding":
    "Padding of `Card`, `Dialog` and `Accordion` content, headers and actions. When unset, `--ui-space-3`.",
  "--ui-chip-radius":
    "Corner radius for `Chip`. When unset, chips follow `--ui-radius`.",
  "--ui-chip-size": "Default `Chip` height.",
  "--ui-chip-size-large": "`Chip` height with `.ui-large`.",
  "--ui-chip-size-small": "`Chip` height with `.ui-small`.",
  "--ui-chip-size-x-small": "`Chip` height with `.ui-x-small`.",
  "--ui-choice-accent":
    "Fill of a checked `Checkbox`, `Radio` and `Switch`, and the thumb and fill of `Range`. When unset, `--ui-primary`, with its lightness capped in dark mode for the choice controls. Set it to `--ui-primary` for the plain primary, like Material and shadcn.",
  "--ui-choice-border-color":
    "Border of the unchecked `Checkbox`, `Radio` and `Switch` track. When unset, `--ui-field-border-color`. Set it for themes whose field border is fainter than 3:1, like shadcn, which outlines its choices with `--ui-primary` like shadcn/ui does.",
  "--ui-choice-fill-max-lightness":
    "The highest OKLCH lightness of a checked `Checkbox`, `Radio` and `Switch` fill in dark mode, so the light mark keeps 3:1. `0.62`.",
  "--ui-choice-label-offset":
    "Moves `Checkbox`, `Radio` and `Switch` labels down (positive) or up (negative) against their control. Use `em` or `cap` to scale with the label font.",
  "--ui-choice-on-accent":
    "Color of the mark on a checked `Checkbox`, `Radio` and `Switch`. Set it with `--ui-choice-accent`. When unset, `--ui-on-primary` in light mode and near-white in dark mode.",
  "--ui-choice-ripple-bg-color":
    "Halo color for the `Checkbox` and `Radio` hover effect.",
  "--ui-choice-size": "Default `Checkbox` and `Radio` input size.",
  "--ui-choice-size-large":
    "`Checkbox` and `Radio` input size with `.ui-large`.",
  "--ui-choice-size-small":
    "`Checkbox` and `Radio` input size with `.ui-small`, and in dense `List` rows unless the control has a size class.",
  "--ui-choice-size-x-small":
    "`Checkbox` and `Radio` input size with `.ui-x-small`.",
  "--ui-code-bg-color":
    "Background of inline `code` in rich text and `Typography`. A translucent black in light mode and white in dark mode, fainter with more contrast so the text stands out.",
  "--ui-code-block-bg-color":
    "Background of `pre.ui-code-block` and `pre` in rich text. A dark shade of the palette in both modes.",
  "--ui-code-block-text-color":
    "Text color of `pre.ui-code-block` and `pre` in rich text.",
  "--ui-contrast":
    "`more` tightens the contrast knobs (`--ui-text-strength-*`, `--ui-border-strength-*`, `--ui-field-border-strength`, the `*-max-lightness` and `*-min-lightness` limits and `--ui-focus-ring-width`), and every role derived from them follows. Set to `more` under `prefers-contrast: more` or by `.ui-contrast-more`. Components read it in style queries for shape changes. See [Contrast](/guide/theming#contrast).",
  "--ui-control-border-color":
    "Border color of controls without a fill: `Button` with `.ui-outlined`, the edge and dividers of an outlined `ButtonGroup`, `ToggleButton`, `ToggleGroup`, `Chip` with `.ui-outlined`, the track of `Tabs` with `.ui-outlined`, and the selected `Tabs` pill. When unset, outlined buttons use their color, the selected `Tabs` pill `--ui-field-border-color` and the rest `--ui-border-color`. Themes that outline controls like fields set it to `--ui-field-border-color`.",
  "--ui-control-border-color-filled":
    "Border color of controls with a fill: `Button` with `.ui-filled` or `.ui-tonal`, the edge and dividers of a `ButtonGroup` with one of them, a checked `ToggleButton`, `Chip` without `.ui-outlined` and the `Carousel` buttons. When unset, buttons have no visible border, the carousel buttons use a shade of their fill and the rest use `--ui-border-color`. Set it with `--ui-control-border-color` to outline every control.",
  "--ui-control-size":
    "Shared default height for fields and buttons so they line up.",
  "--ui-control-size-large": "Shared large height for fields and buttons.",
  "--ui-control-size-small": "Shared small height for fields and buttons.",
  "--ui-control-size-x-small": "Shared x-small height for fields and buttons.",
  "--ui-critical": "Severity color for errors and destructive actions.",
  "--ui-critical-text":
    "Critical as a text color: the `.ui-critical` items of a `Menu`, a `.ui-critical` `Button` with no variant or `.ui-outlined`, and `del` and `.ui-del` text. `--ui-critical` with its lightness kept within `--ui-text-max-lightness` and `--ui-text-min-lightness`.",
  "--ui-density":
    "Multiplier for the control sizes: `--ui-control-size*`, `--ui-chip-size*`, `--ui-choice-size*` and the `Switch` thumb and track sizes. `0.875` is compact, `1.125` is comfortable. See [Density](/guide/theming#density).",
  "--ui-dialog-radius":
    "Corner radius for `Dialog`. When unset, dialogs follow `--ui-radius`.",
  "--ui-disabled-opacity": "Opacity applied to disabled controls.",
  "--ui-divider-gap":
    "Block margin around a `Divider`, times `--ui-space-scale`. Cards, callouts, dialogs and drawers set it to `--ui-space-3`. A divider that is a direct child of a card has no margin, since the card's gap already spaces it.",
  "--ui-duration": "Default transition duration. Multiplied by `--ui-motion`.",
  "--ui-duration-fast": "Transition duration for hover and press feedback.",
  "--ui-duration-slow":
    "Transition duration for entering and leaving overlays: `Dialog`, `Drawer` and `Menu`.",
  "--ui-ease": "Default easing for transitions.",
  "--ui-ease-enter":
    "Easing for elements entering the screen: opening `Dialog`, `Drawer` and `Menu`, and the `Badge`, `Progress` and `Tooltip` transitions.",
  "--ui-ease-exit":
    "Easing for elements leaving the screen: closing `Drawer` and `Menu`.",
  "--ui-field-bg-color":
    "Background of `TextField`, `Textarea` and `Select` fields. When unset, `--ui-surface`, the page color.",
  "--ui-field-border-color":
    "Border color of every empty control: `TextField`, `Select`, `Textarea`, the unchecked `Checkbox`, `Radio` and `Switch` unless `--ui-choice-border-color` is set, the `Range` track and the `Progress` outline. `--ui-text-strong` mixed into `--ui-surface` at `--ui-field-border-strength`, so it reaches 3:1. Lighter than `--ui-border-color`, which is decorative, is a choice a theme can make.",
  "--ui-field-border-color-on-filled":
    "Field border color inside filled surfaces: lists without a variant and table headers. `--ui-text-strong` mixed into `--ui-surface-filled` at `--ui-field-border-strength`.",
  "--ui-field-border-color-on-raised":
    "Field border color inside raised surfaces. The same mix as `--ui-field-border-color` by default. Each raised component sets `--ui-field-border-color` to it on its root.",
  "--ui-field-border-strength":
    "How much of `--ui-text-strong` is mixed into the surface for `--ui-field-border-color` and its filled and raised variants. `50%`, and `70%` with more contrast.",
  "--ui-field-border-width":
    "Border width for fields, `Checkbox`, `Radio` and `Switch`.",
  "--ui-field-helper-font-size":
    "Font size for helper and end text under a field.",
  "--ui-field-helper-line-height":
    "Line height for helper and end text under a field.",
  "--ui-field-helper-text-color":
    "Text color for helper and end text under a field.",
  "--ui-field-label-font-size": "Font size for field labels.",
  "--ui-field-label-font-weight":
    "Font weight for emphasized field labels and legends.",
  "--ui-field-label-text-color": "Text color for field labels.",
  "--ui-field-padding-inline":
    "Horizontal padding inside `TextField`, `Textarea` and `Select` fields. When unset, `--ui-space-2`.",
  "--ui-field-placeholder-text-color":
    "Color of placeholder text in fields. When unset, `--ui-text-subtle`.",
  "--ui-field-radius":
    "Corner radius for fields. When unset, they follow `--ui-radius`, also where it's set on a part of the page.",
  "--ui-field-required-text-color": "Color of the required asterisk.",
  "--ui-field-size": "Default field height.",
  "--ui-field-size-large": "Field height with `.ui-large`.",
  "--ui-field-size-small": "Field height with `.ui-small`.",
  "--ui-field-size-x-small": "Field height with `.ui-x-small`.",
  "--ui-fluid-max-inline-size":
    "Viewport inline size where `--ui-fluid-progress` reaches 1 and the fluid heading sizes their maximum, 48rem.",
  "--ui-fluid-min-inline-size":
    "Viewport inline size where `--ui-fluid-progress` starts at 0 and the fluid heading sizes at their minimum, 20rem.",
  "--ui-fluid-progress":
    "Position of the viewport inline size in the `--ui-fluid-min-inline-size` to `--ui-fluid-max-inline-size` window, 0 to 1, from `progress()`. `--ui-font-size-h1` to `--ui-font-size-h4` grow with it, and a theme can ramp other values on the same window.",
  "--ui-focus-ring-color":
    "Color of the keyboard focus ring. Black on surfaces lighter than OKLCH 0.6 and white on darker ones, so it reaches 3:1 on any `--ui-surface`.",
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
    "Font size for `h1` and `.ui-h1`. Grows from `--ui-font-size-700` to `--ui-font-size-900` with `--ui-fluid-progress`.",
  "--ui-font-size-h2":
    "Font size for `h2` and `.ui-h2`. Grows from `--ui-font-size-600` to `--ui-font-size-800` with `--ui-fluid-progress`.",
  "--ui-font-size-h3":
    "Font size for `h3` and `.ui-h3`. Grows from `--ui-font-size-500` to `--ui-font-size-600` with `--ui-fluid-progress`.",
  "--ui-font-size-h4":
    "Font size for `h4` and `.ui-h4`. Grows from `--ui-font-size-400` to `--ui-font-size-500` with `--ui-fluid-progress`.",
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
  "--ui-icon-size-large":
    "Icon size inside `Avatar`, and of an `svg` without a `width` in `normalize.css`.",
  "--ui-icon-size-small":
    "Icon size inside `Chip`, x-small `Avatar` and dense `List` rows, and the `Select` and autosuggest chevron.",
  "--ui-icon-size-x-small":
    "Smallest icon size, for icons in x-small controls. Not read by a component yet.",
  "--ui-info":
    "Severity color for informational messages, and the dotted underline of `abbr`, `dfn`, `.ui-abbr` and `.ui-dfn`.",
  "--ui-info-text":
    "Info as a text color, for informational text outside an `.ui-info` scope. `--ui-info` with its lightness kept within `--ui-text-max-lightness` and `--ui-text-min-lightness`.",
  "--ui-invalid":
    "Color for invalid field borders, fills and outlines. Lifted to `--ui-invalid-min-lightness` in dark mode, so invalid borders stand out from the page with more contrast.",
  "--ui-invalid-min-lightness":
    "The lowest OKLCH lightness of `--ui-invalid` in dark mode. `0` (no floor), and `0.85` with more contrast, so invalid borders stand out from the page.",
  "--ui-invalid-text":
    "Color for validation messages and invalid labels. `--ui-invalid` with its lightness kept within `--ui-text-max-lightness` and `--ui-text-min-lightness`, so it stays readable where `--ui-invalid` is lighter for borders.",
  "--ui-letter-spacing-caps":
    "Letter spacing of uppercase text: overlines and the first paragraph of an `hgroup`.",
  "--ui-letter-spacing-display":
    "Letter spacing of `h1` and `h2`, tighter than the body.",
  "--ui-letter-spacing-heading":
    "Letter spacing of `h3` and `h4`, slightly tighter than the body.",
  "--ui-line-height":
    "Line height of body copy: prose, captions and `List` text.",
  "--ui-line-height-control":
    "Line height of interface text: labels, helpers, choice labels and field hints.",
  "--ui-line-height-relaxed":
    "Line height of the page text set on `html`, and of `Tabs` labels.",
  "--ui-line-height-tight":
    "Line height of single-line controls and compact text: field inputs, `Table` cells, `Tooltip`, `Card` captions and keyboard hints in buttons.",
  "--ui-list-item-padding-inline":
    "Horizontal padding of `List` and `Menu` items, headings and `Select` options. When unset, `--ui-space-3`.",
  "--ui-menu-radius":
    "Corner radius for `Menu`. When unset, menus follow `--ui-radius`.",
  "--ui-motion":
    "Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](/guide/theming#motion).",
  "--ui-neutral":
    "Severity color for neutral messages. `--ui-gray-9`, capped at `--ui-accent-max-lightness` in light mode. The `.ui-neutral` scope follows `--ui-gray-hue` and `--ui-gray-chroma`, not this token.",
  "--ui-neutral-text":
    "Neutral as a text color, for neutral text outside an `.ui-neutral` scope. `--ui-neutral` with its lightness kept within `--ui-text-max-lightness` and `--ui-text-min-lightness`.",
  "--ui-on-accent":
    "Text on an accent fill, an intent color kept within `--ui-accent-fill-max-lightness`: critical buttons, severity `Badge`s, the invalid choice mark and the checked choice mark in dark mode. Near-white in both modes, since the cap keeps every accent fill dark enough for it.",
  "--ui-on-inverse": "Text color on `--ui-surface-inverse`.",
  "--ui-on-primary":
    "Text color on `--ui-primary`. Derived with relative color from the primary's relative luminance (the `y` of `xyz-d65`): white on a primary below 0.182, near-black above it, so either side keeps 4.5:1 and a custom `--ui-primary` gets readable text.",
  "--ui-on-primary-tonal":
    "Text color on `--ui-primary-tonal`. Set it with `--ui-primary-tonal`.",
  "--ui-on-selected":
    "Text color on `--ui-selected`. When unset, `--ui-on-primary` on toggles, the item's own text color on list items and `--ui-primary-text` on a selected `Select` option.",
  "--ui-on-selected-strong":
    "Text color on `--ui-selected-strong`: the selected tab of filled `Tabs`. Defaults to `--ui-on-primary`.",
  "--ui-on-warning":
    "Text color on a `--ui-warning` fill: the warning `Badge`. White on a warning below 0.182 relative luminance and near-black above it, like `--ui-on-primary`.",
  "--ui-orange":
    "A literal orange, Open Props' `--hue-orange` at the palette lightness. No severity meaning.",
  "--ui-palette-accent":
    "The accent shade of the current palette: `Callout` icons and outlined borders. Stronger with more contrast. The severity `Chip` dot reads it. Re-derived inside every severity scope, so `.ui-success` gets a green one.",
  "--ui-palette-accent-min-lightness":
    "The lowest OKLCH lightness of `--ui-palette-accent` in dark mode. `0`, and `0.71` with more contrast.",
  "--ui-palette-border":
    "The border shade of the current palette: tonal `Callout` borders. Stronger with more contrast. Severity `Chip` borders read it. Re-derived inside every severity scope.",
  "--ui-palette-border-max-lightness":
    "The highest OKLCH lightness of `--ui-palette-border` in light mode. `1`, and `0.53` with more contrast.",
  "--ui-palette-border-min-lightness":
    "The lowest OKLCH lightness of `--ui-palette-border` in dark mode. `0`, and `0.66` with more contrast.",
  "--ui-palette-chroma":
    "Chroma of the palette source color, as a multiplier of `0.21`.",
  "--ui-palette-hue":
    "Hue of the palette source color in degrees. Open Props' `--hue-green` by default, in both color schemes.",
  "--ui-palette-hue-rotate-by":
    "Hue drift per palette step in degrees: each step rotates one more time than the last, so `1` spreads 15° across the ramp. The severity scopes use `1` for livelier tints, the brand palette `0`.",
  "--ui-palette-on-strong": "Text color on `--ui-palette-strong`.",
  "--ui-palette-on-tint": "Text color on `--ui-palette-tint`.",
  "--ui-palette-source":
    "The source color the palette is derived from. Set it to replace `--ui-palette-hue` and `--ui-palette-chroma`. Any color works: the palette keeps its oklch hue, scales its chroma and sets the lightness per step. See [Palette](/guide/theming#palette).",
  "--ui-palette-strong":
    "The strongest shade of the current palette, the darkest in light mode and the lightest in dark mode, with the most contrast against the page: `Callout` text, the default `Button` fill when `--ui-button-accent` is unset. Severity `Chip` text reads it. Re-derived inside every severity scope.",
  "--ui-palette-text":
    "A readable text shade of the current palette. Darker in light mode and lighter in dark mode with more contrast. Re-derived inside every severity scope.",
  "--ui-palette-text-max-lightness":
    "The highest OKLCH lightness of `--ui-palette-text` in light mode. `1`, and `0.35` with more contrast.",
  "--ui-palette-text-min-lightness":
    "The lowest OKLCH lightness of `--ui-palette-text` in dark mode. `0`, and `0.93` with more contrast.",
  "--ui-palette-tint":
    "The tonal fill of the current palette: primary and critical tonal buttons when `--ui-primary-tonal` is unset. Stronger with more contrast. Re-derived inside every severity scope.",
  "--ui-palette-tint-max-lightness":
    "The highest OKLCH lightness of `--ui-palette-tint` in dark mode. `1`, and `0.35` with more contrast.",
  "--ui-palette-tint-min-lightness":
    "The lowest OKLCH lightness of `--ui-palette-tint` in light mode. `0`, and `0.84` with more contrast.",
  "--ui-palette-tint-subtle":
    "A faint fill of the current palette: tonal severity `Callout`s. Tonal severity `Chip`s read it. Re-derived inside every severity scope.",
  "--ui-primary":
    "Brand color for primary actions and accents. Derived from `--ui-primary-source` within `--ui-primary-max-lightness` and `--ui-primary-min-lightness`. Set `--ui-primary-source` to keep more contrast working, or this token to pin the color.",
  "--ui-primary-max-lightness":
    "The highest OKLCH lightness of `--ui-primary` in light mode, applied to `--ui-primary-source`. `1` (no cap), and `0.35` with more contrast.",
  "--ui-primary-min-lightness":
    "The lowest OKLCH lightness of `--ui-primary` in dark mode, applied to `--ui-primary-source`. `0` (no floor), and `0.93` with more contrast.",
  "--ui-primary-source":
    "The brand color `--ui-primary` is derived from, within `--ui-primary-max-lightness` and `--ui-primary-min-lightness`. Set it to a theme's brand color so more contrast can darken or lighten it while keeping its hue. Setting `--ui-primary` directly pins the color in every contrast mode.",
  "--ui-primary-text":
    "Primary as a text color: links, rich text links, `Callout` link hover, `Button` and `ButtonGroup` with `.ui-primary` and no variant or `.ui-outlined`, and a selected `Select` option. Defaults to `--ui-primary` with its lightness kept within `--ui-text-max-lightness` and `--ui-text-min-lightness`, and is derived again from the more-contrast primary. Set it when the primary needs another shade for text.",
  "--ui-primary-tonal":
    "Background of `Button` and `ButtonGroup` with `.ui-primary` and `.ui-tonal`, and of a checked `Checkbox`, `Radio` or `Switch` card. When unset, buttons use `--ui-palette-tint` and cards `--ui-primary` at `--ui-state-active-alpha-accent`. Material's `primary-container` and shadcn's `secondary` go here.",
  "--ui-radius":
    "Corner radius for every component: cards, callouts, menus, buttons and fields follow it, and small parts like `kbd`, tooltips and checkboxes never get rounder than it. Set it to `0` for square corners. Takes a single length.",
  "--ui-radius-large":
    "Corner radius for large surfaces, such as cards and dialogs that want more rounding than controls. `--ui-radius` times 1.5, so `0` still squares it. Not read by a component yet.",
  "--ui-radius-round":
    "The pill radius for round buttons, avatars, badges, chips, radios, switches, the range track and the carousel buttons and markers.",
  "--ui-radius-small":
    "Corner radius of small parts: `kbd`, inline `code`, `mark`, `var`, `Tooltip`, the file input and a square `Avatar` image. `--ui-radius`, capped at 5px.",
  "--ui-radius-x-small":
    "Corner radius of the `Checkbox` box. `--ui-radius`, capped at 2px.",
  "--ui-red":
    "A literal red, Open Props' `--hue-red` at the palette lightness. No severity meaning.",
  "--ui-rhythm-step":
    "Vertical rhythm unit. Rich text margins and heading line heights round to it.",
  "--ui-selected":
    "Background of a selected control: a checked `ToggleButton`, the selected `ToggleGroup` item, and a selected or current `List` item and `Select` option. When unset, `--ui-primary` on toggles and `--ui-primary` at `--ui-state-active-alpha-accent` on list items and options. Pair it with `--ui-on-selected`.",
  "--ui-selected-strong":
    "Mark of a selected item that has to stand out from the page on its own: the current `Carousel` marker, the bar on the start edge of a selected `List` row and the selected tab of filled `Tabs`. Defaults to `--ui-primary`. `--ui-selected` is the fill behind a selected item and may be faint.",
  "--ui-shadow-color":
    "Hue, saturation and lightness of every shadow, as space-separated HSL channels: `220 3% 15%`, and `220 40% 2%` in dark mode. Sets Open Props `--shadow-color`, which the `--shadow-*` steps read.",
  "--ui-shadow-control":
    "Shadow of buttons with a variant, standalone `ToggleButton`, outlined `Chip` and fields. `none` by default, for themes that lift controls off the page.",
  "--ui-shadow-elevated":
    "Shadow of elevated `Card` and `Accordion`. Switches between `--ui-shadow-elevated-light` and `--ui-shadow-elevated-dark` with the color scheme, also in `.ui-light` and `.ui-dark` parts of the page. Set those two instead of this one.",
  "--ui-shadow-elevated-dark": "`--ui-shadow-elevated` in dark mode.",
  "--ui-shadow-elevated-light": "`--ui-shadow-elevated` in light mode.",
  "--ui-shadow-field":
    "Shadow of `TextField`, `Textarea` and `Select` fields. When unset, they follow `--ui-shadow-control`. Set it to `none` to lift buttons but keep fields flat.",
  "--ui-shadow-overlay":
    "Shadow of layers that float above the page: `Dialog`, `Drawer`, `Menu`, `Select` pickers and the `Carousel` buttons.",
  "--ui-shadow-scroll":
    "Shadow under the header and above the footer of a scrolled `Dialog` or `Drawer`, and under a sticky `Table` header. Defaults to Open Props `--shadow-4`.",
  "--ui-shadow-selected":
    "Shadow of the selected tab in default and `.ui-filled` `Tabs`. `.ui-line` and `.ui-outlined` have none. Defaults to Open Props `--shadow-1`.",
  "--ui-shadow-strength":
    "Opacity of the shadow layers: `1%`, and `20%` in dark mode. Sets Open Props `--shadow-strength`.",
  "--ui-shadow-surface":
    "Shadow of tonal and outlined `Card` and `Accordion`, and of `Callout`. `none` by default, for themes that put every surface on the same plane.",
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
    "Multiplier for the `--ui-space-*` scale, the gaps, padding and margins of containers such as cards, dialogs, forms, tables and rich text. Controls follow `--ui-density` instead. See [Spacing](/guide/theming#spacing).",
  "--ui-state-active-alpha-accent":
    "Alpha of the pressed state layer on primary and critical buttons.",
  "--ui-state-active-alpha-dark":
    "Alpha of the pressed state layer on neutral buttons in dark mode. `30%`, and `20%` with more contrast so the text keeps 7:1.",
  "--ui-state-active-alpha-light":
    "Alpha of the pressed state layer on neutral buttons in light mode.",
  "--ui-state-hover-alpha-accent":
    "Alpha of the hover state layer on primary and critical buttons.",
  "--ui-state-hover-alpha-dark":
    "Alpha of the hover state layer on neutral buttons in dark mode.",
  "--ui-state-hover-alpha-light":
    "Alpha of the hover state layer on neutral buttons in light mode.",
  "--ui-success": "Severity color for success messages.",
  "--ui-success-text":
    "Success as a text color, for success text outside an `.ui-success` scope, and `ins` and `.ui-ins` text. `--ui-success` with its lightness kept within `--ui-text-max-lightness` and `--ui-text-min-lightness`.",
  "--ui-surface": "Page and card background.",
  "--ui-surface-elevated":
    "Background of elevated cards and accordions, dialogs, drawers, menus and native `Select` options.",
  "--ui-surface-filled":
    "Background of filled areas such as progress tracks and table stripes.",
  "--ui-surface-inverse":
    "Background of `Tooltip`, the `Carousel` buttons and `kbd`, `var`, `.ui-kbd` and `.ui-var`, inverted against the page.",
  "--ui-surface-tonal": "Background of tonal variants.",
  "--ui-surface-tonal-hover":
    "Hover fill of a `--ui-surface-tonal` surface: clickable `Chip`s and filled `TextField`, `Select` and `Textarea` fields. Derived from `--ui-surface-tonal`, darker in light mode and lighter in dark mode.",
  "--ui-switch-thumb-bg-color":
    "Color of the unchecked `Switch` thumb. The checked thumb uses `--ui-choice-on-accent`.",
  "--ui-switch-thumb-size": "Diameter of the `Switch` thumb.",
  "--ui-switch-thumb-size-large":
    "Diameter of the `Switch` thumb with `.ui-large`.",
  "--ui-switch-thumb-size-small":
    "Diameter of the `Switch` thumb with `.ui-small`, and in `List` rows unless the switch has a size class.",
  "--ui-switch-thumb-size-x-small":
    "Diameter of the `Switch` thumb with `.ui-x-small`.",
  "--ui-switch-track-bg-color":
    "Background of the unchecked `Switch` track when `--ui-track-bg-color` is unset.",
  "--ui-switch-track-block-size": "Height of the `Switch` track.",
  "--ui-switch-track-block-size-large":
    "Height of the `Switch` track with `.ui-large`.",
  "--ui-switch-track-block-size-small":
    "Height of the `Switch` track with `.ui-small`, and in `List` rows unless the switch has a size class.",
  "--ui-switch-track-block-size-x-small":
    "Height of the `Switch` track with `.ui-x-small`.",
  "--ui-switch-track-inline-size":
    "Width of the `Switch` track. Twice `--ui-switch-track-block-size` until a theme sets it.",
  "--ui-switch-track-inline-size-large":
    "Width of the `Switch` track with `.ui-large`. Twice `--ui-switch-track-block-size-large` until a theme sets it.",
  "--ui-switch-track-inline-size-small":
    "Width of the `Switch` track with `.ui-small`, and in `List` rows unless the switch has a size class. Twice `--ui-switch-track-block-size-small` until a theme sets it.",
  "--ui-switch-track-inline-size-x-small":
    "Width of the `Switch` track with `.ui-x-small`. Twice `--ui-switch-track-block-size-x-small` until a theme sets it.",
  "--ui-tabs-accent":
    "Color of the selected `Tabs` label, and of the indicator with `.ui-line`. When unset, `--ui-text-strong`. Filled tabs keep `--ui-on-selected-strong`.",
  "--ui-text":
    "Body text color. `--ui-text-strong` mixed into `--ui-surface` at `--ui-text-strength-light` or `--ui-text-strength-dark`.",
  "--ui-text-disabled":
    "Text color of disabled buttons and chips. `--ui-text` mixed into `--ui-surface` at `--ui-text-disabled-strength`. Also the label and border of an unchecked disabled `ToggleButton`.",
  "--ui-text-disabled-strength":
    "How much of `--ui-text` is mixed into `--ui-surface` for `--ui-text-disabled`. `50%`, and `60%` with more contrast.",
  "--ui-text-max-chroma":
    "The highest OKLCH chroma of the intent text roles in dark mode, which keeps a light color inside sRGB. `0.1`. Also caps the dark mode text of `Button` and `ButtonGroup` without `.ui-primary` or `.ui-critical`.",
  "--ui-text-max-lightness":
    "The highest OKLCH lightness of the intent text roles (`--ui-primary-text`, `--ui-critical-text` and the other `-text` roles) in light mode, so they keep 4.5:1 on every surface. `0.41`, and `0.3` with more contrast.",
  "--ui-text-min-lightness":
    "The lowest OKLCH lightness of the intent text roles in dark mode, so they keep 4.5:1 on every surface. `0.8`, and `0.9` with more contrast. Their chroma is also capped at `--ui-text-max-chroma` in dark mode. Also the lowest lightness of `Button` and `ButtonGroup` text without `.ui-primary` or `.ui-critical` in dark mode.",
  "--ui-text-strength-dark":
    "How much of `--ui-text-strong` is mixed into `--ui-surface` for `--ui-text` in dark mode. `80%`, and `90%` with more contrast.",
  "--ui-text-strength-light":
    "How much of `--ui-text-strong` is mixed into `--ui-surface` for `--ui-text` in light mode. `87%`, and `90%` with more contrast.",
  "--ui-text-strong":
    "Strongest text color, for headings, labels and values. Body text is `--ui-text`.",
  "--ui-text-subtle":
    "Secondary text: placeholders, field helper text, descriptions in `List` and `Menu` items, unselected `Tabs` labels and `Table` captions. When unset, `--ui-text`.",
  "--ui-track-bg-color":
    "The empty part of a track: the unchecked `Switch`, `Progress` and the `Range` track. When unset, `Progress` and tonal ranges use `--ui-surface-tonal`, the default range its field border and the switch `--ui-switch-track-bg-color`.",
  "--ui-underline-offset":
    "Gap between text and its underline: `Link` and rich text links, and in Firefox `abbr`, `dfn`, `ins` and `u`.",
  "--ui-underline-offset-small":
    "Gap between text and the underline of `abbr`, `dfn`, `ins` and `u` and their classes. Firefox uses `--ui-underline-offset`.",
  "--ui-underline-thickness-hover":
    "Underline thickness of `Link` and rich text links on hover and keyboard focus. At rest they keep the font's own thickness.",
  "--ui-warning":
    "Severity color for warnings. Unlike the other severities it keeps its lightness with more contrast: the fill is light and takes dark `--ui-on-warning` text, and `--ui-warning-text` gets the stricter lightness limits instead.",
  "--ui-warning-text":
    "Warning as a text color, for warning text outside a `.ui-warning` scope. `--ui-warning` with its lightness kept within `--ui-text-max-lightness` and `--ui-text-min-lightness`.",
}
