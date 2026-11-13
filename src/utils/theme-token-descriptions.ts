import { paletteSteps } from "./palette-steps"

export const themeTokenDescriptions: Record<string, string> = {
  "--ui-accent-fill-max-lightness":
    "The highest OKLCH lightness of an intent fill, an intent color filled under `--ui-on-fill` text: the critical, info, neutral and success `Badge`, and the fills of critical `Button`s, also in a critical `ControlGroup`. Borders keep the intent color. `0.48`, and `0.45` with more contrast.",
  "--ui-accent-max-chroma":
    "The highest OKLCH chroma of `--ui-primary`, `--ui-invalid` and `--ui-palette-text` in dark mode when more contrast lifts them. `1` (no cap), and `0.1` with more contrast.",
  "--ui-accent-max-lightness":
    "The highest OKLCH lightness of the named colors except `--ui-orange`, `--ui-neutral` and `--ui-palette-accent` in light mode. `1` (no cap), and `0.42` with more contrast.",
  "--ui-anchor-position-area":
    "The `position-area` of the floating content of an `Anchor`, a popover `Menu` or a `Tooltip`. The `positionArea` prop sets it on one instance, or set it on an element for everything inside it. When unset, each keeps its own: `self-start self-end` for `Anchor`, its `side` and `span` for `Menu` (`self-block-end span-self-inline-end`), `self-block-start` for `Tooltip` and `self-inline-start` for the `Copy` label.",
  "--ui-backdrop-bg-color":
    "Overlay color behind an open `Dialog` or `Drawer`. `--ui-text` at 50% in light mode, and half the lightness of `--ui-surface` at 50% in dark mode.",
  "--ui-backdrop-blur": "Blur radius behind an open `Dialog` or `Drawer`.",
  "--ui-blue":
    "A literal blue, hue 240 at `0.53`, the lightness of palette step 9 in every palette. No severity meaning.",
  "--ui-border-color":
    "Default border color for cards, lists, tables and dividers. `--ui-text-strong` mixed into `--ui-surface` at `--ui-border-strength-light` or `--ui-border-strength-dark`.",
  "--ui-border-color-on-filled":
    "Border color inside filled surfaces: lists without a variant and table headers. `List` and `Table` set `--ui-border-color` to it on those parts.",
  "--ui-border-color-on-raised":
    "Borders drawn inside a raised surface (tonal and elevated `Card` and `Accordion`, `Dialog`, `Drawer`, `Menu`, the `Select` picker and tonal `Callout` without a severity): dividers, separators, outlined controls. The same mix as `--ui-border-color` by default. Each raised component sets `--ui-border-color` to it on its root, so a theme that wants another border inside raised surfaces sets this one. The edge of the surface itself is `--ui-border-color-raised`.",
  "--ui-border-color-raised":
    "The edge of every raised surface: tonal and elevated `Card`, `Accordion` and `Dialog`, tonal `Callout` without a severity, `Drawer`, `Menu` and the `Select` picker. Set it to outline them all at once, or to `transparent` to drop their edges. When unset, each keeps its own edge: cards, accordions and dialogs the page background, so they stay visible on tonal surfaces, callouts their tonal background, and drawers, menus and the picker `--ui-border-color-on-raised`. The borders inside a raised surface are `--ui-border-color-on-raised`.",
  "--ui-border-strength-dark":
    "How much of `--ui-text-strong` is mixed into `--ui-surface` for `--ui-border-color` in dark mode. `11%`, and `55%` with more contrast.",
  "--ui-border-strength-light":
    "How much of `--ui-text-strong` is mixed into `--ui-surface` for `--ui-border-color` in light mode. `17%`, and `55%` with more contrast.",
  "--ui-border-width":
    "Default border width for components that draw a border.",
  "--ui-border-width-thick":
    "Width of emphasized rules: the head and foot rules of rich text tables, the `AvatarGroup` ring, the `Badge` border, the neutral `Chip` dot, the dotted `DescriptionList` rule, the `Tabs` indicator, the bar on a selected `List` row, the `Spinner` ring, and at one and a half times, the blockquote bar.",
  "--ui-button-accent":
    "Color of `Button` and `ControlGroup` without `.ui-primary` or `.ui-critical`: the fill of filled buttons, the text and border of outlined and text buttons. When unset, `--ui-control-accent`, else the darkest palette color in light mode and the lightest in dark mode.",
  "--ui-button-accent-filled":
    "Fill of `Button` and `ControlGroup` with `.ui-filled` and no `.ui-primary` or `.ui-critical`, of hovered outlined ones unless `--ui-button-hover` is `layer`, and of hovered tonal ones when it is unset. When unset, `--ui-button-accent`, so text, outlined and filled buttons share one color.",
  "--ui-button-focus":
    'How a focused `Button` and `ControlGroup` button show focus. `highlight` fills the button with `--ui-focus-highlight` and `--ui-on-focus-highlight` text instead of the ring, like GOV.UK. The outline stays, transparent, so forced colors still draw the ring, and a button with `aria-disabled="true"` keeps the ring. When unset (`ring`), the focus ring shows.',
  "--ui-button-font-weight":
    "Font weight of `Button`. When unset, buttons follow `--ui-font-weight-bold`.",
  "--ui-button-hover":
    "How `Button` and `ControlGroup` show hover and pressed states. `layer` draws a translucent state layer: the text color over filled and tonal buttons, the accent over outlined ones, which keep their text and border. Filled, tonal, primary and critical buttons use `--ui-state-hover-alpha-accent` and `--ui-state-active-alpha-accent`, and neutral outlined buttons the light and dark alphas. `shade-all` shades the fill of every button that has one, filled and tonal: filled buttons as when unset, tonal ones with `--ui-surface-tonal-hover`, darker in light mode and lighter in dark mode, and a step further when pressed. Outlined buttons fill with the accent, as when unset. When unset (`shade`), filled buttons shade their fill and outlined and tonal buttons fill with the accent.",
  "--ui-button-hover-shadow":
    "Shadow of `Button` with `.ui-filled`, `.ui-outlined` or `.ui-tonal` on hover. When unset, it keeps `--ui-button-shadow`.",
  "--ui-button-hover-translate":
    "Moves `Button` with `.ui-filled`, `.ui-outlined` or `.ui-tonal` on hover, as a `translate` value. Pair it with `--ui-button-hover-shadow` to press buttons into their shadow. `none` when unset.",
  "--ui-button-on-accent":
    "Text color on a filled `--ui-button-accent` button. Set it with `--ui-button-accent`. When unset, `--ui-control-on-accent`, else `--ui-palette-on-strong`.",
  "--ui-button-on-accent-filled":
    "Text color on a `--ui-button-accent-filled` fill. Set it with `--ui-button-accent-filled`. When unset, `--ui-button-on-accent`.",
  "--ui-button-padding-inline":
    "Horizontal padding of `Button`. When unset, `1.5ex`, which scales with the font.",
  "--ui-button-padding-inline-large":
    "Horizontal padding of `Button` with `.ui-large`. When unset, `2.5ex`.",
  "--ui-button-padding-inline-small":
    "Horizontal padding of `Button` with `.ui-small`. When unset, `1.25ex`.",
  "--ui-button-padding-inline-x-small":
    "Horizontal padding of `Button` with `.ui-x-small`. When unset, `1ex`.",
  "--ui-button-radius":
    "Corner radius for `Button`, `ControlGroup`, `ToggleButton` and `ToggleGroup`. When unset, they follow `--ui-radius`, also where it's set on a part of the page.",
  "--ui-button-shadow":
    "Shadow of `Button` with `.ui-filled`, `.ui-outlined` or `.ui-tonal`, and of the `Copy` confirmation. Buttons in a `ControlGroup` have none. When unset, `--ui-shadow-control`, the shadow buttons share with toggle buttons, outlined chips and fields. Set it to give buttons alone a shadow, like a pressable edge.",
  "--ui-button-size": "Default `Button` height.",
  "--ui-button-size-large": "`Button` height with `.ui-large`.",
  "--ui-button-size-small": "`Button` height with `.ui-small`.",
  "--ui-button-size-x-small":
    "`Button` and `ControlGroup` height with `.ui-x-small`.",
  "--ui-card-padding":
    "Padding of `Card`, `Dialog`, `Drawer` and `Accordion` content, headers, footers and actions, and of `Checkbox`, `Radio` and `Switch` cards. When unset, `--ui-space-3`. Card and accordion actions set it to their own inline padding, which caps how far a text button at either end pulls itself out.",
  "--ui-chip-radius":
    "Corner radius for `Chip`. When unset, chips follow `--ui-radius`.",
  "--ui-chip-size": "Default `Chip` height.",
  "--ui-chip-size-large": "`Chip` height with `.ui-large`.",
  "--ui-chip-size-small": "`Chip` height with `.ui-small`.",
  "--ui-chip-size-x-small": "`Chip` height with `.ui-x-small`.",
  "--ui-choice-accent":
    "Fill of a checked `Checkbox`, `Radio` and `Switch`, and the thumb and fill of `Range`. When unset, `--ui-control-accent`, else `--ui-primary`, with its lightness capped in dark mode for the choice controls. Set it, or `--ui-control-accent`, to `--ui-primary` for the plain primary, like Material and shadcn.",
  "--ui-choice-border-color":
    "Border of the unchecked `Checkbox`, `Radio` and `Switch` track. When unset, `--ui-field-border-color`. Set it for themes whose field border is fainter than 3:1, like shadcn, which outlines its choices with `--ui-primary` like shadcn/ui does.",
  "--ui-choice-border-width":
    "Border width of `Checkbox`, `Radio` and the `Switch` track. When unset, `--ui-field-border-width`. Set it when a design draws its choices with a different border than its fields, like Material 3's 2dp checkbox, radio and switch outlines next to its 1dp outlined fields. The check and the dot fit inside it.",
  "--ui-choice-checked":
    "How a checked `Checkbox` and `Radio` look. `mark` keeps the surface and the border of the unchecked input and draws the check, dash or dot in the choice accent, lifted to text lightness in dark mode, like GOV.UK. When unset (`fill`), the input fills with the accent under a mark in its on-accent color. Forced colors always fill. `Switch` and checkbox and radio cards don't read it.",
  "--ui-choice-fill-max-lightness":
    "The highest OKLCH lightness of a checked `Checkbox`, `Radio` and `Switch` fill in dark mode, so the light mark keeps 3:1. `0.62`.",
  "--ui-choice-label-offset":
    "Moves `Checkbox`, `Radio` and `Switch` labels down (positive) or up (negative) against their control. Use `em` or `cap` to scale with the label font.",
  "--ui-choice-on-accent":
    "Color of the mark on a checked `Checkbox`, `Radio` and `Switch`. Set it with `--ui-choice-accent`. When unset, `--ui-control-on-accent`, else `--ui-on-primary` in light mode and near-white in dark mode.",
  "--ui-choice-ripple-bg-color":
    "Halo color for the `Checkbox` and `Radio` hover effect. `--ui-text` at 20%.",
  "--ui-choice-size": "Default `Checkbox` and `Radio` input size.",
  "--ui-choice-size-large":
    "`Checkbox` and `Radio` input size with `.ui-large`.",
  "--ui-choice-size-small":
    "`Checkbox` and `Radio` input size with `.ui-small`, and in dense `List` rows unless the control has a size class.",
  "--ui-choice-size-x-small":
    "`Checkbox` and `Radio` input size with `.ui-x-small`.",
  "--ui-code-bg-alpha-dark":
    "Opacity of `--ui-code-bg-color`, the inline `code` background, in dark mode. `10%`, and `6%` with more contrast.",
  "--ui-code-bg-alpha-light":
    "Opacity of `--ui-code-bg-color`, the inline `code` background, in light mode. `12%`, and `6%` with more contrast.",
  "--ui-code-bg-color":
    "Background of inline `code` in rich text and `Typography`. `--ui-text` at `--ui-code-bg-alpha-light` in light mode and `--ui-code-bg-alpha-dark` in dark mode, fainter with more contrast so the text stands out.",
  "--ui-code-block-bg-color":
    "Background of `pre.ui-code-block` and `pre` in rich text. `--ui-surface-inverse` in light mode and `--ui-surface-filled` in dark mode, so the block is dark in both.",
  "--ui-code-block-text-color":
    "Text color of `pre.ui-code-block` and `pre` in rich text. `--ui-on-inverse` in light mode and `--ui-text-strong` in dark mode, on `--ui-code-block-bg-color`.",
  "--ui-color-scheme":
    "The color scheme in force: `light`, or `dark` under `prefers-color-scheme: dark`. In print it is `light`, also under `.ui-dark`. `html` reads it as its `color-scheme`, `.ui-light` and `.ui-dark` set it on a part of the page, and `Typography` reads it in a style query. Set the classes, not the token.",
  "--ui-contrast":
    "`more` tightens the contrast knobs (`--ui-text-strength-*`, `--ui-text-disabled-strength`, `--ui-border-strength-*`, `--ui-field-border-strength`, `--ui-code-bg-alpha-*`, `--ui-accent-max-chroma`, the `*-max-lightness` and `*-min-lightness` limits, `--ui-state-active-alpha-dark`, `--ui-state-selected-alpha-accent` and `--ui-focus-ring-width`), and every role derived from them follows. Set to `more` under `prefers-contrast: more` or by `.ui-contrast-more`. Components read it in style queries for shape changes. See [Contrast](/guide/theming#contrast).",
  "--ui-control-accent":
    "The accent every control shares: `Button` and `ControlGroup` without `.ui-primary` or `.ui-critical`, a checked `Checkbox`, `Radio` and `Switch`, and the `Range` thumb and fill. Unset by default, so buttons keep `--ui-palette-strong` and choice controls `--ui-primary`. Set it to `--ui-primary` to give every control the brand color in one line, like Material and shadcn, and `--ui-button-accent` or `--ui-choice-accent` to override one of them.",
  "--ui-control-border-color":
    "Border color of controls without a fill: `Button` with `.ui-outlined`, also in an outlined `ControlGroup`, `ToggleButton`, `ToggleGroup`, `Chip` with `.ui-outlined`, the track of `Tabs` with `.ui-outlined`, and the selected `Tabs` pill. When unset, outlined buttons use their color, the selected `Tabs` pill `--ui-field-border-color` and the rest `--ui-border-color`. Themes that outline controls like fields set it to `--ui-field-border-color`.",
  "--ui-control-border-color-filled":
    "Border color of controls with a fill: `Button` with `.ui-filled` or `.ui-tonal`, also in a filled or tonal `ControlGroup`, the dividers between buttons in a `ControlGroup` that isn't outlined (unset, filled groups use `currentColor` dividers, or a shade of the accent in primary and critical ones), a checked `ToggleButton`, `Chip` without `.ui-outlined` and the `Carousel` buttons. When unset, buttons have no visible border, the carousel buttons use a shade of their fill and the rest use `--ui-border-color`. Set it with `--ui-control-border-color` to outline every control.",
  "--ui-control-on-accent":
    "Text and mark color on a `--ui-control-accent` fill. Set it with `--ui-control-accent`. `--ui-button-on-accent` and `--ui-choice-on-accent` override it per component.",
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
    "Easing for elements leaving the screen: closing `Dialog`, `Drawer` and `Menu`, and a dismissed toast.",
  "--ui-ease-move":
    "Easing for movement a theme may make springy: the `Tabs` indicator, the press scale, and `Menu`, `Select`, `Tooltip` and toasts as they open. Never for anything closing. When unset, each reads its own easing; a `linear()` spring with a little overshoot gives the controls some bounce.",
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
    "Horizontal padding inside `TextField`, `Textarea` and `Select` fields. When unset, `--ui-space-2`. `.ui-large` reads `--ui-field-padding-inline-large`.",
  "--ui-field-padding-inline-large":
    "Horizontal padding inside `TextField`, `Textarea` and `Select` fields with `.ui-large`. When unset, `--ui-space-3`.",
  "--ui-field-placeholder-text-color":
    "Color of placeholder text in fields. When unset, `--ui-text-subtle`.",
  "--ui-field-radius":
    "Corner radius for fields. When unset, they follow `--ui-radius`, also where it's set on a part of the page.",
  "--ui-field-required-text-color": "Color of the required asterisk.",
  "--ui-field-shadow":
    "Shadow of `TextField`, `Textarea` and `Select` fields. When unset, they follow `--ui-shadow-control`. Set it to `none` to lift buttons but keep fields flat.",
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
  "--ui-focus-border-color":
    "Border color of a focused `Button`, `Checkbox`, `Chip`, `Radio`, `Switch` and `ToggleButton`, of the field of a focused `NumberField`, `Select`, `Textarea` and `TextField`, and of a checkbox or radio card and a `Card` with a focused card link. It gives the focus ring a second color to sit on, like a dark edge under a bright ring, so pair it with `--ui-focus-ring-offset: 0px`. When set, the focus ring promises its contrast against this border instead of the page. Links and buttons that highlight, with `--ui-link-focus` or `--ui-button-focus` set to `highlight`, show neither the ring nor this border: `--ui-on-focus-highlight` carries their contrast. When unset, each keeps its own border. Forced colors ignore it.",
  "--ui-focus-border-width":
    "Border width of a focused `Checkbox` and `Radio` and of the field of a focused `NumberField`, `Select`, `Textarea` and `TextField`, so the focus edge thickens, like GOV.UK's 4px and Material 3's 2dp outlined fields. Never thinner than `--ui-choice-border-width` or `--ui-field-border-width`, and the extra width grows inward, so the check, the dot and the text keep their place. Forced colors keep the wider border. When wider than the ring, it is also the bar under a highlighted link, with `--ui-link-focus` set to `highlight`. When unset, the border keeps its width.",
  "--ui-focus-highlight":
    "Fill of a focused link or button that highlights instead of showing the ring, when `--ui-link-focus` or `--ui-button-focus` is `highlight`: `--ui-focus-ring-color` made opaque. A translucent ring, like Bootstrap's, fills at full strength, since text contrast on a see-through fill depends on what is behind it.",
  "--ui-focus-ring-color":
    "Color of the keyboard focus ring. Black on surfaces lighter than OKLCH 0.6 and white on darker ones, so it reaches 3:1 on any `--ui-surface`.",
  "--ui-focus-ring-inset":
    "Negative offset for focus rings drawn inside a control, such as `List` items and `Select` options.",
  "--ui-focus-ring-offset": "Distance between a control and its focus ring.",
  "--ui-focus-ring-style": "Outline style of the focus ring.",
  "--ui-focus-ring-width": "Width of the focus ring. `3px` with more contrast.",
  "--ui-font-body":
    "Font family for body text, fields and buttons. `system-ui, sans-serif` by default.",
  "--ui-font-code":
    "Font family for `code`, `kbd`, `samp` and `pre` in rich text, `.ui-kbd`, `.ui-samp`, `.ui-var`, code blocks and `kbd` in buttons and lists. A monospace stack by default.",
  "--ui-font-heading":
    "Font family for `h1`–`h6` and the `.ui-h1`–`.ui-h6` classes. When unset, headings follow `--ui-font-body`.",
  "--ui-font-size-100":
    "The smallest step of the type scale, 12px. `--ui-font-size-caption` reads it. Set the steps to reshape every size at once, or a role to move one.",
  "--ui-font-size-200":
    "Type scale step, 14px. `--ui-font-size-small` reads it.",
  "--ui-font-size-300":
    "Type scale step, 16px. `--ui-font-size-body`, `--ui-font-size-control` and `--ui-font-size-h6` read it.",
  "--ui-font-size-400":
    "Type scale step, 18px. `--ui-font-size-h5` reads it, and `--ui-font-size-h4` grows from it.",
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
    "Font size of lead paragraphs, `.ui-p.ui-large`, large `Avatar` initials, the `DescriptionList` total row, the value of a small `Stat` and the `OneTimeCode` digits. Defaults to `--ui-font-size-500`.",
  "--ui-font-size-small":
    "Font size of helper text, `Callout`, `Table`, `Tooltip`, code blocks, `List` text, small buttons, toggles and fields, and large chips. Defaults to `--ui-font-size-200`.",
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
    "A literal green, hue 145 at `0.53`, the lightness of palette step 9 in every palette. No severity meaning.",
  "--ui-icon-check":
    "The check that marks the current item of a `Menu`, the selected item of a listbox and `Select` picker, and a complete `Stepper` step. An SVG image used as a mask, so only its shape counts and it takes the text color.",
  "--ui-icon-clear":
    "The clear option of a `Rating`. An SVG image used as a mask, so only its shape counts and it takes the text color.",
  "--ui-icon-close":
    "The close button of a `Toaster` toast. An SVG image used as a mask, so only its shape counts and it takes the text color.",
  "--ui-icon-critical":
    "The icon of a critical `Toaster` toast. An SVG image used as a mask, so only its shape counts and it takes the text color.",
  "--ui-icon-decrease":
    "The icon for taking away from a value. An SVG image used as a mask, so only its shape counts and it takes the text color.",
  "--ui-icon-error":
    "The mark of a `Stepper` step with an error. An SVG image used as a mask, so only its shape counts and it takes the text color.",
  "--ui-icon-expand":
    "The arrow of a `Select` and of a `TextField` with a datalist. An SVG image used as a mask, so only its shape counts and it takes the text color.",
  "--ui-icon-hide":
    "The icon for hiding a value, such as a password. An SVG image used as a mask, so only its shape counts and it takes the text color.",
  "--ui-icon-increase":
    "The icon for adding to a value. An SVG image used as a mask, so only its shape counts and it takes the text color.",
  "--ui-icon-info":
    "The icon of an info `Toaster` toast. An SVG image used as a mask, so only its shape counts and it takes the text color.",
  "--ui-icon-next":
    "The `Carousel` buttons, pointing to the next item and turned for the previous one. An SVG image used as a mask, so only its shape counts and it takes the text color.",
  "--ui-icon-rating":
    "A filled star of a `Rating`, drawn over `--ui-icon-rating-empty`, so the two need the same outline. An SVG image used as a mask, so only its shape counts and it takes the text color.",
  "--ui-icon-rating-empty":
    "An empty star of a `Rating`. An SVG image used as a mask, so only its shape counts and it takes the text color.",
  "--ui-icon-show":
    "The icon for showing a hidden value, such as a password. An SVG image used as a mask, so only its shape counts and it takes the text color.",
  "--ui-icon-size": "Default icon size inside components.",
  "--ui-icon-size-large":
    "Icon size inside `Avatar`, and of an `svg` without a `width` in `normalize.css`.",
  "--ui-icon-size-small":
    "Icon size inside `Chip`, x-small `Avatar` and dense `List` rows, and the `Select` and autosuggest chevron.",
  "--ui-icon-size-x-small":
    "Smallest icon size, for icons in x-small controls. Not read by a component yet.",
  "--ui-icon-sort":
    "The arrow of a sorted `SortableTable` column, turned for the other direction. An SVG image used as a mask, so only its shape counts and it takes the text color.",
  "--ui-icon-success":
    "The icon of a success `Toaster` toast. An SVG image used as a mask, so only its shape counts and it takes the text color.",
  "--ui-icon-warning":
    "The icon of a warning `Toaster` toast. An SVG image used as a mask, so only its shape counts and it takes the text color.",
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
    "Line height of captions, `List` text, the `Stat` label and description and the `Stepper` description. Body text and prose use `--ui-line-height-relaxed`.",
  "--ui-line-height-control":
    "Line height of interface text: labels, helpers, choice labels and field hints.",
  "--ui-line-height-relaxed":
    "Line height of the page text set on `html`, and of `Tabs` labels.",
  "--ui-line-height-tight":
    "Line height of single-line controls and compact text: field inputs, dense `Table` cells, the `Stat` value, `Tooltip`, `Card` captions and keyboard hints in buttons.",
  "--ui-link-focus":
    "How a focused `.ui-link` and a focused link in `.ui-rich-text` show focus. `highlight` fills the link with `--ui-focus-highlight`, draws its text and a bar under it in `--ui-on-focus-highlight` and drops the underline, like GOV.UK. The bar is a block-end border as thick as the focus ring or `--ui-focus-border-width`, whichever is wider, so it follows the writing mode and sits under every line of a wrapped link. The outline stays, transparent, so forced colors still draw the ring. When unset (`ring`), the focus ring shows.",
  "--ui-link-font-weight":
    "Font weight of `.ui-link` and of links in `.ui-rich-text`. When unset, links follow `--ui-font-weight-bold`, the weight of headings.",
  "--ui-link-visited-text-color":
    "Text and underline color of a visited `.ui-link` and of visited links in `.ui-rich-text`. Hover and focus keep their own color. When unset, visited links look like the others.",
  "--ui-list-item-padding-inline":
    "Horizontal padding of `List` and `Menu` items, headings and `Select` options. When unset, `--ui-space-3`.",
  "--ui-menu-radius":
    "Corner radius for `Menu` and the `Select` picker. When unset, menus follow `--ui-radius` and the picker `--ui-field-radius`, like its field.",
  "--ui-motion":
    "Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](/guide/theming#motion).",
  "--ui-neutral":
    "Severity color for neutral messages. `--ui-gray-hue` and `--ui-gray-chroma` at `0.53`, the lightness of `--ui-gray-9`, capped at `--ui-accent-max-lightness` in light mode. The `.ui-neutral` scope derives its palette from its hue and chroma.",
  "--ui-neutral-text":
    "Neutral as a text color, for neutral text outside an `.ui-neutral` scope. `--ui-neutral` with its lightness kept within `--ui-text-max-lightness` and `--ui-text-min-lightness`.",
  "--ui-on-fill":
    "Text on an intent fill: an intent color with its lightness capped so light text reads on it, within `--ui-accent-fill-max-lightness` for critical `Button`s and the critical, info, neutral and success `Badge`, and within `--ui-choice-fill-max-lightness` for the invalid choice mark and the checked one in dark mode. Near-white in both modes. The fill has no token of its own, since each intent is one. Not `--ui-palette-on-strong`, which turns dark in dark mode for the light `--ui-palette-strong`.",
  "--ui-on-focus-highlight":
    "Text color on `--ui-focus-highlight`, and the bar under a highlighted link: black or white, whichever reads on it. It switches at OKLCH lightness 0.57, where black and white both reach 4.5:1 on a gray, since it colors text; the focus ring switches at 0.6, which only needs 3:1. Set it to match a brand's focus text, and hand it back under more contrast with the ring color.",
  "--ui-on-inverse": "Text color on `--ui-surface-inverse`.",
  "--ui-on-primary":
    "Text color on `--ui-primary`. Derived with relative color from the primary's relative luminance (the `y` of `xyz-d65`): white on a primary below 0.182, near-black above it, so either side keeps 4.5:1 and a custom `--ui-primary` gets readable text.",
  "--ui-on-primary-tonal":
    "Text color on `--ui-primary-tonal`. Set it with `--ui-primary-tonal`.",
  "--ui-on-selected":
    "Text color on `--ui-selected`. When unset, `--ui-on-primary` on toggles, the item's own text color on list items and selected `Select` options, and `--ui-text-strong` on a checked `Message` reaction.",
  "--ui-on-selected-strong":
    "Text color on `--ui-selected-strong`: the selected tab of filled `Tabs` and the number or icon of the current `Stepper` and `Timeline` markers. Defaults to `--ui-on-primary`.",
  "--ui-on-warning":
    "Text color on a `--ui-warning` fill: the warning `Badge`. White on a warning below 0.182 relative luminance and near-black above it, like `--ui-on-primary`.",
  "--ui-orange":
    "A literal orange, hue 75 at `0.66`, the lightness of palette step 7 in every palette. No severity meaning.",
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
    "Hue of the palette source color in degrees. `222.8` (blue) by default, in both color schemes.",
  "--ui-palette-hue-rotate-by":
    "Hue drift per palette step in degrees: each step rotates one more time than the last, so `1` spreads 15° across the ramp. `.ui-critical`, `.ui-info`, `.ui-success` and `.ui-warning` use `1` for livelier tints; `.ui-neutral` and the brand palette `0`.",
  "--ui-palette-on-strong": "Text color on `--ui-palette-strong`.",
  "--ui-palette-on-tint": "Text color on `--ui-palette-tint`.",
  "--ui-palette-source":
    "The source color the palette is derived from. A theme leaves it unset, and `palette.css` builds it from `--ui-palette-hue` and `--ui-palette-chroma`: `oklch(58% 0.105 222.8)` by default. Set it to replace those two knobs. Any color works: the palette keeps its oklch hue, scales its chroma and sets the lightness per step. See [Palette](/guide/theming#palette).",
  "--ui-palette-strong":
    "The strongest shade of the current palette, the darkest in light mode and the lightest in dark mode, with the most contrast against the page: `Callout` text, the default `Button` fill when `--ui-button-accent` is unset. Severity `Chip` text reads it. Re-derived inside every severity scope.",
  "--ui-palette-text":
    "A readable text shade of the current palette, at least `--ui-palette-text-min-lightness` in dark mode. Darker in light mode and lighter in dark mode with more contrast. Re-derived inside every severity scope.",
  "--ui-palette-text-max-lightness":
    "The highest OKLCH lightness of `--ui-palette-text` in light mode. `1`, and `0.35` with more contrast.",
  "--ui-palette-text-min-lightness":
    "The lowest OKLCH lightness of `--ui-palette-text` in dark mode, so it keeps 4.5:1 on every surface. `0.8` like `--ui-text-min-lightness`, and `0.93` with more contrast.",
  "--ui-palette-tint":
    "The tonal fill of the current palette: primary and critical tonal buttons when `--ui-primary-tonal` is unset. Stronger with more contrast. Re-derived inside every severity scope.",
  "--ui-palette-tint-max-lightness":
    "The highest OKLCH lightness of `--ui-palette-tint` in dark mode. `1`, and `0.35` with more contrast.",
  "--ui-palette-tint-min-lightness":
    "The lowest OKLCH lightness of `--ui-palette-tint` in light mode. `0`, and `0.84` with more contrast.",
  "--ui-palette-tint-subtle":
    "A faint fill of the current palette: tonal severity `Callout`s. Tonal severity `Chip`s read it. Re-derived inside every severity scope.",
  "--ui-press-scale":
    "Scale of `Button`, `ToggleButton` and button and link `Chip`s while pressed, over `--ui-duration` with `--ui-ease-move`. Unset, so pressing doesn't scale; `0.97` gives a light press. Buttons in a `ControlGroup` and toggles in a `ToggleGroup` never scale.",
  "--ui-primary":
    "Brand color for primary actions and accents. Derived from `--ui-primary-source` within `--ui-primary-max-lightness` and `--ui-primary-min-lightness`. Set `--ui-primary-source` to keep more contrast working, or this token to pin the color.",
  "--ui-primary-max-lightness":
    "The highest OKLCH lightness of `--ui-primary` in light mode, applied to `--ui-primary-source`. `1` (no cap), and `0.35` with more contrast.",
  "--ui-primary-min-lightness":
    "The lowest OKLCH lightness of `--ui-primary` in dark mode, applied to `--ui-primary-source`. `0` (no floor), and `0.93` with more contrast.",
  "--ui-primary-source":
    "The brand color `--ui-primary` is derived from, within `--ui-primary-max-lightness` and `--ui-primary-min-lightness`. Set it to a theme's brand color so more contrast can darken or lighten it while keeping its hue. Setting `--ui-primary` directly pins the color in every contrast mode.",
  "--ui-primary-text":
    "Primary as a text color: links, rich text links, `Callout` link hover, `Button` and `ControlGroup` with `.ui-primary` and no variant or `.ui-outlined`. Defaults to `--ui-primary` with its lightness kept within `--ui-text-max-lightness` and `--ui-text-min-lightness`, and is derived again from the more-contrast primary. Set it when the primary needs another shade for text.",
  "--ui-primary-tonal":
    "Background of `Button` and `ControlGroup` with `.ui-primary` and `.ui-tonal`, and of a tonal `Avatar`. When unset, they use `--ui-palette-tint`. Material's `primary-container` and shadcn's `secondary` go here.",
  "--ui-radius":
    "Corner radius for every component: cards, callouts, menus, buttons and fields follow it, and small parts like `kbd`, tooltips and checkboxes never get rounder than it. Set it to `0` for square corners. Takes a single length.",
  "--ui-radius-large":
    "Corner radius for large surfaces, such as cards and dialogs that want more rounding than controls. `--ui-radius` times 1.5, so `0` still squares it. Not read by a component yet.",
  "--ui-radius-round":
    "The pill radius for round buttons, avatars, badges, the chip dot, radios, switches, the range track and the carousel buttons and markers.",
  "--ui-radius-small":
    "Corner radius of small parts: `kbd`, inline `code`, `mark`, `var`, `Tooltip`, the file input and a `rounded` `Avatar`. `--ui-radius`, capped at 5px.",
  "--ui-radius-x-small":
    "Corner radius of the `Checkbox` box. `--ui-radius`, capped at 2px.",
  "--ui-red":
    "A literal red, hue 25 at `0.53`, the lightness of palette step 9 in every palette. No severity meaning.",
  "--ui-rhythm-step":
    "Vertical rhythm unit. Rich text margins and heading line heights round to it.",
  "--ui-rich-text-flow-gap":
    "Space between paragraphs, lists, blockquotes, tables, `details` and `address` in `.ui-rich-text`, rounded to `--ui-rhythm-step`. Headings, code blocks, figures and `hr` take multiples of it, with more room above headings than below. When unset, `1.25em` of the rich text font size.",
  "--ui-rich-text-heading-margin-block-end":
    "Space below `h1` to `h6` in `.ui-rich-text`, rounded to `--ui-rhythm-step`. `em` is the heading's own font size, so larger headings get more room, and `rem` gives every level the same space. When unset, each level takes a multiple of `--ui-rich-text-flow-gap`: 1 under `h1`, 0.75 under `h2` and 0.5 under `h3` to `h6`. A heading group keeps its own spacing.",
  "--ui-rich-text-heading-margin-block-start":
    "Space above `h1` to `h6` in `.ui-rich-text`, rounded to `--ui-rhythm-step`. It overlaps the margin of the block before, so `0px` leaves the paragraph gap. Give a length: a unitless `0` drops both margins. `em` is the heading's own font size, so larger headings get more room, and `rem` gives every level the same space. When unset, each level takes a multiple of `--ui-rich-text-flow-gap`: 3 above `h1` and `h2`, 2 above `h3` and 1.5 above `h4` to `h6`. A heading group keeps its own spacing.",
  "--ui-rich-text-line-height":
    "Line height of `.ui-rich-text`, for themes whose prose is looser than their interface text. When unset, rich text keeps the line height around it, `--ui-line-height-relaxed` on the page.",
  "--ui-selected":
    "Background of a selected control: a checked `ToggleButton`, the selected `ToggleGroup` item, a pressed `Chip`, a selected or current `List` item and `Select` option, and a checked `Message` reaction. When unset, `--ui-primary` on toggles, `--ui-primary` at `--ui-state-selected-alpha-accent` on list items and options, and the same mixed into `--ui-surface` on reactions. Pair it with `--ui-on-selected`.",
  "--ui-selected-strong":
    "Mark of a selected item that has to stand out from the page on its own: the current `Carousel` marker, the bar on the start edge of a selected `List` row, the selected tab of filled `Tabs`, the current `Stepper` and `Timeline` markers, the border of a checked `Message` reaction, and the done part of a `Progress` bar, a `Stepper` and a tracked `Timeline`. Defaults to `--ui-primary`. `--ui-selected` is the fill behind a selected item and may be faint.",
  "--ui-shadow-color":
    "Color of every shadow, with its base opacity. Each layer of `--ui-shadow-elevated`, `--ui-shadow-overlay`, `--ui-shadow-scroll` and `--ui-shadow-selected` adds its own opacity on top, with relative color. `oklch(0.268 0.003 265 / 1%)` in light mode and `oklch(0.11 0.01 259 / 20%)` in dark mode, also in `.ui-light` and `.ui-dark` parts of the page.",
  "--ui-shadow-control":
    "Shadow of buttons with a variant (unless `--ui-button-shadow` is set), standalone `ToggleButton`, outlined `Chip` and fields. `none` by default, for themes that lift controls off the page.",
  "--ui-shadow-elevated":
    "Shadow of elevated `Card` and `Accordion`. Five layers of `--ui-shadow-color`, which follows the color scheme, also in `.ui-light` and `.ui-dark` parts of the page.",
  "--ui-shadow-overlay":
    "Shadow of layers that float above the page: `Dialog`, `Drawer`, `Menu`, `Select` pickers and the `Carousel` buttons. Five layers of `--ui-shadow-color`.",
  "--ui-shadow-scroll":
    "Shadow under the header and above the footer of a scrolled `Dialog` or `Drawer`, and under a sticky `Table` header. Six layers of `--ui-shadow-color`.",
  "--ui-shadow-selected":
    "Shadow of the selected tab in default and `.ui-filled` `Tabs`. `.ui-line` and `.ui-outlined` have none. One layer of `--ui-shadow-color`.",
  "--ui-shadow-surface":
    "Shadow of tonal and outlined `Card` and `Accordion`, and of `Callout`. `none` by default, for themes that put every surface on the same plane.",
  "--ui-space-1": "Spacing step 1: `0.25rem` times `--ui-space-scale`.",
  "--ui-space-2": "Spacing step 2: `0.5rem` times `--ui-space-scale`.",
  "--ui-space-3": "Spacing step 3: `1rem` times `--ui-space-scale`.",
  "--ui-space-4": "Spacing step 4: `1.25rem` times `--ui-space-scale`.",
  "--ui-space-5": "Spacing step 5: `1.5rem` times `--ui-space-scale`.",
  "--ui-space-6": "Spacing step 6: `1.75rem` times `--ui-space-scale`.",
  "--ui-space-7": "Spacing step 7: `2rem` times `--ui-space-scale`.",
  "--ui-space-8": "Spacing step 8: `3rem` times `--ui-space-scale`.",
  "--ui-space-scale":
    "Multiplier for the `--ui-space-*` scale, the gaps, padding and margins of containers such as cards, dialogs, forms and tables, and the padding and gaps of rich text. Controls follow `--ui-density` instead. See [Spacing](/guide/theming#spacing).",
  "--ui-state-active-alpha-accent":
    "Alpha of the pressed state layer on primary and critical buttons (on every filled and tonal button with `--ui-button-hover: layer`) and the ring of the current `Timeline` marker.",
  "--ui-state-active-alpha-dark":
    "Alpha of the pressed state layer on neutral buttons in dark mode. `30%`, and `20%` with more contrast so the text keeps 7:1.",
  "--ui-state-active-alpha-light":
    "Alpha of the pressed state layer on neutral buttons in light mode.",
  "--ui-state-hover-alpha-accent":
    "Alpha of the hover state layer on primary and critical buttons (on every filled and tonal button with `--ui-button-hover: layer`), hovered `List` rows and critical `Menu` items.",
  "--ui-state-hover-alpha-dark":
    "Alpha of the hover state layer on neutral buttons and `ToggleButton` in dark mode.",
  "--ui-state-hover-alpha-light":
    "Alpha of the hover state layer on neutral buttons and `ToggleButton` in light mode.",
  "--ui-state-selected-alpha-accent":
    'Alpha of the tint behind selected `List` and `Menu` rows, `Select` options and checked `Message` reactions when `--ui-selected` is unset, behind checked `Checkbox`, `Radio` and `Switch` cards, which tint their accent, behind the current page (`aria-current="page"`) in text, outlined and tonal buttons, and of the selected `Tabs` pill in dark mode. `15%` with more contrast, so light text keeps 7:1 in dark mode.',
  "--ui-success": "Severity color for success messages.",
  "--ui-success-text":
    "Success as a text color, for success text outside an `.ui-success` scope, and `ins` and `.ui-ins` text. `--ui-success` with its lightness kept within `--ui-text-max-lightness` and `--ui-text-min-lightness`.",
  "--ui-surface": "Page and card background.",
  "--ui-surface-elevated":
    "Background of elevated cards and accordions, dialogs, drawers, menus and native `Select` options.",
  "--ui-surface-filled":
    "Background of filled areas: lists, `.ui-filled` progress and range tracks, table headers and footers, and hovered table rows.",
  "--ui-surface-inverse":
    "Background of `Tooltip`, the `Carousel` buttons and `kbd`, `var`, `.ui-kbd` and `.ui-var`, inverted against the page.",
  "--ui-surface-tonal": "Background of tonal variants.",
  "--ui-surface-tonal-hover":
    "Hover fill of a `--ui-surface-tonal` surface: clickable `Chip`s, filled `TextField`, `Select` and `Textarea` fields, and tonal `Button`s with `--ui-button-hover: shade-all`. Derived from `--ui-surface-tonal`, darker in light mode and lighter in dark mode.",
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
    "Background of the unchecked `Switch` track, ahead of `--ui-track-bg-color`. When both are unset, `--ui-surface-tonal`, at `0.58` lightness in dark mode.",
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
    "The highest OKLCH chroma of the intent text roles in dark mode, which keeps a light color inside sRGB. `0.1`. Also caps the dark mode text of `Button` and `ControlGroup` without `.ui-primary` or `.ui-critical`.",
  "--ui-text-max-lightness":
    "The highest OKLCH lightness of the intent text roles (`--ui-primary-text`, `--ui-critical-text` and the other `-text` roles) in light mode, so they keep 4.5:1 on every surface. `0.41`, and `0.3` with more contrast.",
  "--ui-text-min-lightness":
    "The lowest OKLCH lightness of the intent text roles in dark mode, so they keep 4.5:1 on every surface. `0.8`, and `0.9` with more contrast. Their chroma is also capped at `--ui-text-max-chroma` in dark mode. Also the lowest lightness of `Button` and `ControlGroup` text without `.ui-primary` or `.ui-critical` in dark mode.",
  "--ui-text-strength-dark":
    "How much of `--ui-text-strong` is mixed into `--ui-surface` for `--ui-text` in dark mode. `80%`, and `90%` with more contrast.",
  "--ui-text-strength-light":
    "How much of `--ui-text-strong` is mixed into `--ui-surface` for `--ui-text` in light mode. `87%`, and `90%` with more contrast.",
  "--ui-text-strong":
    "Strongest text color, for headings, labels and values. Body text is `--ui-text`.",
  "--ui-text-subtle":
    "Secondary text: placeholders, field helper text, overlines, descriptions in `List` and `Menu` items, unselected `Tabs` labels and `Table` captions. `--ui-text` unless a theme sets it.",
  "--ui-track-bg-color":
    "The empty part of a track: the unchecked `Switch`, `Progress` and the `Range` track. When unset, `Progress` and tonal ranges use `--ui-surface-tonal`, the default range its field border and the switch `--ui-surface-tonal` (at `0.58` lightness in dark mode). `--ui-switch-track-bg-color` comes first on the switch.",
  "--ui-underline-offset":
    "Gap between text and its underline for `Link`, rich text links and `Stepper` links.",
  "--ui-underline-offset-small":
    "Gap between text and the underline of `abbr`, `dfn`, `ins` and `u` and their classes.",
  "--ui-underline-thickness-hover":
    "Underline thickness of `Link` and rich text links on hover and keyboard focus. At rest they keep the font's own thickness.",
  "--ui-warning":
    "Severity color for warnings. Unlike the other severities it keeps its lightness with more contrast: the fill is light and takes dark `--ui-on-warning` text, and `--ui-warning-text` gets the stricter lightness limits instead.",
  "--ui-warning-text":
    "Warning as a text color, for warning text outside a `.ui-warning` scope. `--ui-warning` with its lightness kept within `--ui-text-max-lightness` and `--ui-text-min-lightness`.",
  ...Object.fromEntries(
    paletteSteps().map(({ family, lightness, name, step }) => [
      name,
      family === "color"
        ? `Step ${step} of the palette, at ${lightness} lightness.`
        : `Step ${step} of the gray palette: the lightness of \`--ui-color-${step}\` at \`--ui-gray-chroma\` and \`--ui-gray-hue\`.`,
    ]),
  ),
}
