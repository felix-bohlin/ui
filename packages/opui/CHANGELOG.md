# Changelog

## 6.0.0 - Unreleased

### Breaking

- `Accordion` markers only animate with a marker class on `details`. Add `.ui-marker-rotate` to keep the previous rotation.
- `Accordion` renders a chevron marker by default in Astro and Vue. The `marker` slot replaces it, so move a custom chevron from `summary` to the `marker` slot, or it shows twice.
- `TextField`, `Textarea` and `Select` in Astro and Vue no longer generate an input `id`. Pass `id` when something outside the component needs to reference the input.
- `Checkbox` and `Radio` internal variables are private (`--_` prefix): `--isLTR` and `--isRTL` are `--_dir-rtl`, `--highlight-size` is `--_ripple-size` and `--thumb-scale` is `--_thumb-scale`. Rename any overrides to the new names.
- `TextField` and `Textarea` take a `size` prop instead of `small`. Replace `small` with `size="small"`.
- `Switch` takes `size="small"` instead of `small`, like `Checkbox`.
- `ButtonGroup` variants apply to the whole group. A variant class on a single button inside a group is no longer supported.
- `List` no longer takes `divided`. Use `bordered` (`.ui-bordered`) ([#395](https://github.com/felix-bohlin/ui/issues/395)).
- `Button` no longer takes `.ui-icon-only`. A button whose only child is an `svg` is square, so remove the class.
- `Button` in Astro and Vue no longer adds `.ui-disabled` to a disabled `<button>`. It sets `disabled`, and `aria-disabled="true"` on links. Target `:disabled` or `[aria-disabled="true"]` instead of `.ui-disabled`.
- `Button` icon styles only apply to a direct child `svg` (`> svg`), sized with `--_icon-size`. An `svg` nested in another element is no longer sized. Padding scales with `--_padding-inline` (`1ex` x-small, `1.25ex` small, `1.5ex` default, `2.5ex` large; was `0.5ex`, `0.75ex`, `1.5ex` and `4ex`), and the icon side gets tighter padding when a direct child `svg` sits next to a wrapped label (`<span class="ui-text">`). Wrap the label when the button has an icon: text next to an `svg` without a wrapper renders as icon-only.
- `Anchor` with `trigger="hover"` and `Tooltip` no longer wrap their trigger in a `<span interestfor>`. Add `interestfor` with the anchor's `id` to the trigger element.
- `Tabs` look like segmented controls: the tabs sit on a rounded track and the selected tab is a raised pill. `--_accent-color` and `--_bg-color` are gone, use `--_active-bg-color`, `--_active-text-color`, `--_indicator-color` and `--_track-color`, or a `variant`. The open panel gets a `--size-2` top margin.
- `Typography` rich text only styles headings without a class, like lists. Component parts such as the `Callout` title keep their own styles. Use the `.ui-h1`–`.ui-h6` classes to style a heading that has a class.
- `Typography` theme tokens: `--font-size-h3` is fluid with a higher minimum (`clamp(var(--font-size-3), 4vw, var(--font-size-4))`), `--font-size-h4` scales between `--font-size-2` and `--font-size-3` instead of a fixed `--font-size-3`, and `--font-size-h6` is `--font-size-1`, so heading sizes no longer invert or drop below body text on narrow viewports.
- `Typography` rich text lives in a new `components.prose` layer, below `components.root`, so component styles inside rich text win over prose styles. The layer order is `openprops, theme, normalize, components.prose, components.root, components.extended, utils`. If you declare the layer order yourself, add `components.prose` before `components.root`, or it sorts after `components.extended` and prose styles beat component styles inside rich text.
- `theme.css` no longer sets `--focus-ring-color` (it was `var(--primary)` and unused). The global `:focus-visible` ring now reads `--focus-ring-color`, `--focus-ring-width`, `--focus-ring-style` and `--focus-ring-offset`, and keeps its inverted page background color while `--focus-ring-color` is unset. Set `--focus-ring-color` yourself where you read it.
- `theme.css` holds `--motion` and its `prefers-reduced-motion` default, which moved from `core/normalize.css`. The `.ui-motion-*` classes moved to `core/utils.css`. If you import single files, import `theme.css` and `utils.css` too, or `--motion` is undefined and the `.ui-motion-*` classes are missing.
- `Avatar` requires `alt` when `src` is set (types). `alt=""` is still allowed for decorative images.
- `Tooltip` requires an `id` (types). Without it the trigger can't reference the tooltip.
- `Button`, and `Chip` and `Avatar` with `as="button"`, render `type="button"` by default in Astro and Vue, so they no longer submit forms. Pass `type="submit"` for submit buttons.
- `TextField` and `Textarea` in Astro pass extra attributes to the `<input>`/`<textarea>` instead of the `<label>`. `class` and `style` stay on the label. In Vue, `style` now goes to the label instead of the input.
- `DescriptionList` in Vue exports `DescriptionListDescription` instead of `Description`, like Astro.
- `ListItem` `as` only accepts `"a"`, `"button"` or `"div"` (types).
- `Tabs` render no `tablist`, `tab` or `tabpanel` roles and no `aria-controls`/`aria-labelledby`, so screen readers announce the radio group they are. `TabsItem` and `TabsPanel` no longer take `panelId`, and `TabsPanel` no longer takes `tabId`. `tabs.css` no longer matches `[role="tab"]` or `[role="tabpanel"]`, use `.ui-tab-label` and `.ui-tab-panel`.
- `FieldGroup` no longer sets `role="group"`. Wrap it in a `FieldSet` (a `<fieldset>`, already a group) to group and name the fields. `FieldSet` with another element in `as` gets `role="group"`.
- `ClassicSelect` no longer sets `aria-labelledby` or a label `id`. The wrapping `<label>` names the select, so `endText` is part of the name, like `TextField`.
- `Range` in Astro and Vue no longer sets `--_track-fill` from script. The track fill is a scroll-driven animation in CSS.
- `List`, `Range` and `Progress` no longer take `variant="default"` (`.ui-default`, the page surface), because it wasn't the default look. Use no variant, `tonal`, or `transparent` on a `List`.
- `TextField` and `Textarea` take `variant="filled"` like `Select` instead of the boolean `filled`. Replace `filled` with `variant="filled"`.
- `Divider` variants render `.ui-filled`, `.ui-primary` and `.ui-tonal` instead of `.ui-border-filled`, `.ui-border-primary` and `.ui-border-tonal`. The `variant` values are unchanged.
- `Accordion`, `Avatar`, `Badge`, `Button`, `Callout`, `Card`, `Chip`, `Drawer`, `List`, `Menu`, `Progress`, `Range`, `Select`, `Switch`, `Table`, `TextField`, `Textarea`, `Toast`, `ToggleButton` and `Tooltip` private custom properties follow one scheme: `--_accent`, `--_text-color`, `--_bg-color`, `--_duration`/`--_ease`, `--_size` and `--_min-height`. MIGRATING lists every rename.
- `Toast` keyframes are `ui-toast-enter`, `ui-toast-hold` and `ui-toast-exit`, and `toast.js` listens for `ui-toast-exit`.
- `ToggleButton` no longer supports `.ui-disabled`, and Astro and Vue no longer add it. Set `disabled` on the input, the toggle is styled through `:has(input:disabled)`.
- `TextField`, `Textarea`, `Select`, `ClassicSelect`, `Switch`, `Checkbox`, `Radio` and `Range` are marked invalid with `aria-invalid="true"` on the control instead of `data-invalid` on the root. `error` in Astro and Vue sets only `aria-invalid`. Replace `data-invalid` on the root with `aria-invalid="true"` on the `<input>`, `<select>` or `<textarea>`.
- `FieldSet` (`.ui-fieldset`) no longer reads `data-invalid`. Its end text turns red when a control inside has `aria-invalid="true"`, so mark each control in the group (`error` on each `Checkbox`, `Radio` or `Switch` in Astro and Vue).

### Removed

- `Button` `ripple` prop (`.ui-ripple`). Icon-only buttons get the same hover background as other buttons, so drop the prop or class.
- `Chip` hover and press ripple. Remove any `--ripple` overrides.
- `IconButton`. Use `Button`: an icon-only button is square by default, `rounded` (`.ui-rounded`) makes it a circle. The hover halo is gone: icon-only buttons get the button's hover background. The old default size (28px) is `size="x-small"`. The old `small` (20px) has no preset: use `x-small` with `--_min-height: var(--size-4)`. Icons are smaller (`--_icon-size: var(--size-5)` matches the old 24px), and the icon color is the button's accent instead of the inherited text color.
- `palette.css` no longer registers the palette variables (`--color-*`, `--gray-*`, `--palette-source` and `--palette-hue`) with `@property`.
- `ToggleGroup` no longer exports the unused `ToggleContext` type.
- `TextField` and `Textarea` no longer declare a `startText` slot, which was never rendered. The `startText` prop stays.

### Added

- `Accordion` takes a `markerAnimation` prop (`.ui-marker-flip`, `.ui-marker-rotate`, `.ui-marker-turn`) that sets how the marker animates when it opens. Defaults to `rotate`.
- `Button` takes a `rounded` prop (`.ui-rounded`). Icon size is set with `--_icon-size`.
- `Carousel` component (`ul.ui-carousel`). Scroll snap, with previous/next buttons (`::scroll-button()`) and markers (`::scroll-marker`) generated by CSS. Buttons use inverted colors with a gray border derived from the button color so they contrast with any item, show an SVG chevron that follows the color scheme, and sit over or beside the items (`.ui-buttons-outside`). Images, videos and iframes fill the item with a configurable aspect ratio. Supports items per view, peek, center alignment, RTL, and custom properties for every size, color, icon and label. No JavaScript needed, with Astro and Vue components, and it falls back to a snapping scroller.
- `Menu` component (`menu.ui-menu.ui-list[popover]`). Opens with Invoker Commands, anchors to its trigger with no `anchor-name`, flips when it runs out of space, and moves below or above its trigger when neither side fits. Supports an `items` prop, custom `ListItem` content, placements, end alignment (`align="end"`, `.ui-align-end`), `--anchor-position-area` and critical items. Items are built like `List` items, with the label in `.ui-text` and shortcuts in `.ui-end`. Group labels are HTML and CSS only. Submenus go in the `submenu` slot of a `ListItem`. On iOS, submenus anchor to their parent menu instead of their trigger item.
- `ListItem` takes a `submenu` slot, rendered inside the `<li>` after the element set by `as`, for a nested `Menu`.
- `Button` is square when its only child is an `svg`, at every size and inside `ButtonGroup`.
- `DrawerHeader` takes a `commandfor` prop (the drawer `id`). When set, the close button uses `command="close"` (Invoker Commands), HTML only. Without it, the previous script fallback is used.
- `Button` links with `aria-disabled="true"` no longer receive clicks.
- `Chip` supports `aria-disabled="true"`, and `.ui-disabled` dims a static chip. Disabled links (`a[aria-disabled="true"]`, `a.ui-disabled`) no longer receive clicks.
- `Carousel` buttons take image icons via `--_button-prev-icon` and `--_button-next-icon`, sized with `--_button-icon-size`. They default to the chevron and swap in RTL.
- `Carousel` takes a `persistentButtons` prop (`.ui-buttons-persistent`) that keeps both buttons visible. A disabled button keeps its fill and gets a more muted border (`--_button-disabled-border-color`).
- `Tabs` take a `variant` prop. `filled` (`.ui-filled`) fills the selected tab with the primary color, `line` (`.ui-line`) drops the track and marks the selected tab with a line, and `outlined` (`.ui-outlined`) uses a bordered track without a background.
- `layers.css` with the `@layer` order, for importing single component files.
- The package ships an agent skill in `skills/opui` with a reference for every component.
- `TextField`, `Textarea`, `Select` and `ClassicSelect` take `x-small` (`.ui-x-small`, 28px) and `large` (`.ui-large`, 46px) sizes, so every field size has a matching `Button` size.
- `Chip` takes a `large` size (`.ui-large`, 40px) for chips next to default-size fields and buttons. Chip heights come from `--chip-size-small`, `--chip-size` and `--chip-size-large`, which follow the control size scale.
- `ButtonGroup` and `ToggleGroup` take `scrollable` (`.ui-scrollable`) to keep their items on one row and scroll sideways, and `shrink` (`.ui-shrink`) to keep them on one row and truncate labels with an ellipsis.
- `theme.css` adds `--choice-label-offset` to nudge `Checkbox`, `Radio` and `Switch` labels against their control for fonts with unusual metrics, and `--invalid-text-color` for validation messages.
- `ToggleButton` and `ToggleGroup` take a `large` size (`.ui-large`), and `ButtonGroup` takes `x-small` (`.ui-x-small`).
- `Typography` reads a `--rhythm-step` theme token (`0.25rem`). Heading font sizes snap to half a step and heading line heights to a full step with `round()`.
- `Typography` rich text styles `hr`, tables, `pre > samp` and preformatted text without `code`.
- `Typography` rich text task lists (an `li` that starts with a checkbox) show the checkbox in place of the bullet.
- `theme.css` adds motion tokens: `--duration-fast`, `--duration`, `--duration-slow`, `--ease`, `--ease-enter` and `--ease-exit`. Every component transition and animation reads them, multiplied by `--motion`.
- `theme.css` adds `--focus-ring-inset` for focus rings drawn inside a control, read by `ButtonGroup`, `List` and `Select`.
- `theme.css` adds icon tokens: `--icon-size-small`, `--icon-size` and `--icon-size-large`.
- `theme.css` adds choice control tokens: `--choice-size-small`, `--choice-size`, `--choice-size-large`, `--switch-dot-size`, `--switch-dot-size-small`, `--switch-track-height`, `--switch-track-height-small`, `--switch-track-width` and `--switch-track-width-small`.
- `theme.css` adds overlay tokens, `--backdrop-color` and `--backdrop-blur`, read by `Dialog` and `Drawer`, and inverse surface tokens, `--surface-inverse` and `--text-inverse`.
- `theme.css` adds state and text tokens: `--disabled-opacity`, `--state-hover-alpha`, `--state-hover-alpha-dark`, `--state-active-alpha`, `--state-active-alpha-dark`, `--state-hover-alpha-accent`, `--state-active-alpha-accent`, `--text-disabled`, `--invalid-color`, `--font-weight-medium`, `--font-weight-semibold` and `--font-weight-bold`.
- `theme.css` adds field text tokens: `--field-label-color`, `--field-label-font-size`, `--field-label-font-weight`, `--field-helper-color`, `--field-helper-font-size`, `--field-helper-line-height` and `--field-required-color`, read by `Checkbox`, `Form`, `Radio`, `Range`, `Switch` and `TextField`.
- `theme.css` re-derives every color token (`--primary`, `--surface-*`, `--text-*`, `--border-color`, `--field-border-color` and the named and intent colors) inside `.ui-palette` from its own palette. A subtree with `class="ui-palette" style="--palette-hue: 30"` is a complete second theme.
- `theme.css` adds `--density`, a multiplier for `--control-size-x-small`, `--control-size-small`, `--control-size` and `--control-size-large`. Defaults to `1`. `Button`, `Select`, `Textarea` and `TextField` padding shrinks to fit a smaller control size, down to the height of the text.
- `Carousel` takes `orientation="vertical"` (`.ui-vertical`) to scroll on the block axis. Set its height with `--_block-size`. Markers sit in a column beside the items.
- `Select` items take `selected`, and `value` preselects options in Astro and Vue (an array with `multiple`). Options render `selected` on the server.
- `Carousel` takes `stretch` (`.ui-stretch`), which stretches each item's content, such as a card, to the item's height.
- `Divider` reads a `--divider-space` theme token for the space around it. Cards, callouts, dialogs and drawers set it to `--size-3`.
- `opui-css/astro` and `opui-css/vue` export the component `Props` types (`ButtonProps`, `TabsTabProps`, …), `MenuItem`, `SelectItem` and `ClassicSelectItem`.
- `Dialog` and `Drawer` show a subtle scroll shadow under the header and above the actions while the content scrolls (scroll-state container queries).
- `theme.css` adds `--contrast`, set to `more` under `prefers-contrast: more` or with `.ui-contrast-more`. A style query then raises the contrast of muted text, borders, field borders, primary, intent colors and the focus ring, and components with translucent text or fills (`Badge`, `Button`, `Divider`, `List`, `Menu`, `Progress`, `Tabs`, `TextField`, `ToggleButton` and `Typography`) follow. `.ui-contrast-more` also works on a subtree, and `.ui-contrast-normal` on `html` ignores the OS preference.
- `Table` takes `stickyHeader` (`.ui-sticky-header`), which keeps the header rows at the top of the nearest scroll container and shows a shadow once they are stuck (scroll-state container queries). Offset it with `--_sticky-offset`.
- `Button` takes `iconOnly` (types only), which makes `label` required for icon-only buttons.
- `Range` takes an `error` prop (`aria-invalid="true"` on the input) for the invalid state, like the other fields.
- `theme.css` adds `--ripple-color` for the `Checkbox` and `Radio` hover halo.
- `Callout` with `severity="success"` shows a default check icon in Astro and Vue, like `info`, `warning` and `critical`.
- `Radio` takes a `spread` prop (`.ui-spread`), like `Checkbox` and `Switch`.
- `Card` takes `.ui-card-link` on a link to make the whole card clickable. Other links and buttons in the card stay clickable.
- `Checkbox` and `Radio` take `size="x-small"` (`.ui-x-small`), 14px from the new `--choice-size-x-small` token.
- `Switch` takes `size="x-small"` and `size="large"` (`.ui-x-small`, `.ui-large`), from the new `--switch-dot-size-*`, `--switch-track-height-*` and `--switch-track-width-*` x-small and large tokens. The dot inset follows the track and dot size, so custom `--switch-*` values stay centered.
- `Chip` takes `size="x-small"` (`.ui-x-small`), 24px tall from the new `--chip-size-x-small` token.
- `Badge` `alignment` takes `"start-end"`, the default placement.

### Changed

- `theme.css` `--primary` is `--color-9` in light mode and `--color-6` in dark mode, and `--primary-contrast` is dark in dark mode, so text on primary and primary text both pass WCAG AA in light and dark.
- `Checkbox`, `Radio` and `Switch` keep a light marker in dark mode on a fill darkened to keep 3:1 contrast.
- `Button` critical keeps light text on its fill, tonal primary and critical buttons use dark text on a light container in light mode and light text on a dark container in dark mode, and text and outlined buttons use a lighter accent for text in dark mode. `Menu` critical items do the same.
- `ButtonGroup` and `ToggleGroup` wrap onto more rows when they don't fit, instead of overflowing. The group draws its outer edge and rounded corners, and dividers sit between items in every row.
- `TextField`, `Textarea`, `Select` and `Range` with `spread` split their container into equal label and field columns, so spread fields line up at one width. The fixed `30ch` textarea and `25ch` range minimums are gone.
- `Tabs` take a `scrollable` prop (`.ui-scrollable`). The tabs stay on one row and scroll sideways when they don't fit, and the open panel stays in view. Supports up to 20 tabs.
- `Typography` rich text spacing derives from one flow space (`1.25em` of the body text), and every margin derived from it snaps to `--rhythm-step`. Headings get more space above than below, so they sit closer to the text they introduce, and lists with block content, description lists, `details`, `address`, code blocks and figures follow the same rhythm.
- `Typography` rich text list gutters are measured in `ch`, so two-digit markers fit, and ordered lists with 100 or more items get a wider gutter. Bulleted and numbered list text starts at the same position.
- `Typography` `sup` and `sub` are `0.75em` in rich text and in `.ui-sup` and `.ui-sub`, and no longer change the line height.
- `Typography` rich text figure captions are muted and start-aligned under quotes, code blocks and tables.
- `Typography` heading group subtitle line heights and spacing, in rich text `hgroup` and `.ui-hgroup`, snap to `--rhythm-step`.
- `Typography` headings share one line height, `1em + 0.5rem` rounded to `--rhythm-step`, in rich text and in the `.ui-h1`–`.ui-h6` classes.
- `Accordion`, `ButtonGroup`, `Callout`, `Card`, `Chip`, `DescriptionList`, `List`, `Table`, `ToggleButton` and `ToggleGroup` borders read `--border-width`, and `Checkbox`, `Radio`, `Switch` and `TextField` borders read `--field-border-width`, instead of a hardcoded `1px`. `Carousel` buttons, `Drawer`, `Menu`, the `Progress` high contrast outline and the `Textarea` minimum height also read `--border-width`, and `Select` reads `--field-border-width`.
- `Chip` uses `--border-radius` (8px) instead of Open Props `--radius-2` (5px).
- `Radio` is `--choice-size` (20px) like `Checkbox`, instead of 18px.
- `ButtonGroup` small buttons are `--button-size-small` (32px) instead of 30px, with the same `--font-size-05` text as a small `Button`.
- `ToggleButton` and `ToggleGroup` text shrinks with the size like `Button`: `--font-size-05` when small and `--font-size-0` when x-small.
- `Checkbox`, `Radio` and `Switch` line up with the first line of their label and center on it.
- `Chip` small is `--chip-size-small` (28px, the x-small control size) instead of 24px.
- `Textarea` minimum height is three lines plus padding at every size. Small was a fixed 64px.
- `Range`, `Switch` and `TextField` invalid states use `--invalid-color`.
- `Toast` severity icons are masks filled with `--success`, `--info`, `--warning` and `--critical` instead of hardcoded hex colors.
- `Tooltip` uses `--surface-inverse` and `--text-inverse`.
- `Avatar` and `Badge` text uses `--primary-contrast`.
- `Drawer` backdrop dims and blurs like `Dialog`, through `--backdrop-color` and `--backdrop-blur`. `.ui-backdrop-transparent` still removes it.
- `Avatar`, `List` and `ButtonGroup` sizes follow `--control-size` and `--button-size-*`.
- `theme.css` declares `--palette-hue-rotate-by`, `--gray-hue` and `--gray-chroma` so every theme knob lives in one file.
- `Card` tonal and elevated variants (and `Dialog`) have a border in the page background color, so they stay visible on tonal surfaces. In dark mode, borders and field borders inside them also use the page background.
- `Menu` has a subtle light gray border in dark mode (`--gray-6` at 40% opacity).
- `Dialog` has a maximum height. The header and actions stay in place and the content scrolls.
- `Card` actions stick to the bottom of stretched cards and wrap.
- `Chip` labels truncate with an ellipsis unless the chip is `multiline`.
- `List` dense rows keep the default inline padding, so they line up with `Card` content.
- `Table` dense cells have less block padding.
- `Typography` rich text headings, `pre` and `small` scale with the inherited font size.
- `theme.css` derives `--primary-contrast` from `--primary` with relative color: near-white text on dark primaries and near-black on light ones, with a hint of the primary's hue. Custom primaries get readable text.
- `Checkbox` and `Radio` root selectors are wrapped in `:where()`, like other components.
- `Checkbox` and `Radio` no longer render an empty `.ui-label` without a default slot, and warn in dev without an accessible name, like `Switch`.
- `Checkbox`, `Radio`, `Switch` and `Progress` align to the middle when there's no visible label, so they center in table cells and lines of text. Give them a hidden label (`hideLabel`, or `.ui-sr-only` in HTML).
- `TextField`, `Textarea` and `Select` keep a `12ch` minimum width in table cells.
- `TextField` auto-suggest arrow uses the `Select` arrow size and inset at every size.
- `Select`, `ClassicSelect` and `TextField` auto-suggest arrows are a chevron instead of a triangle.
- `List` only styles direct `li`/`option` children (and options in a `[role="group"]`) as rows, so nested lists inside a row stay normal lists. Headings and paragraphs in `.ui-text` have no margin.
- `Divider` that is a direct child of a card has no margin, since the card's gap spaces it.
- `Drawer` header headings take the free space and the header has a gap, so several actions line up at the end. Without a heading, the first icon-only button is pushed to the end.
- `Menu` is capped to the space on its side and only flips when that side has less than `12rem`.
- `Tooltip` with an arrow shifts along the edge like other tooltips.
- Links (`.ui-link` and rich text links) darken in light mode and lighten in dark mode on hover and focus, and their underline gets `3px` thick. Rich text links in a `List` are `--primary-dark` in light mode.
- `theme.css` `--info` and `--blue` use `--hue-blue` (240), the same blue as the `.ui-info` palette. White text on an info `Badge` is 4.58:1.
- `Typography` rich text tables scroll sideways in a narrow column instead of breaking words letter by letter.
- `Carousel` buttons use `--surface-inverse`.
- `ToggleGroup` is in the `components.extended` layer, like `ButtonGroup`.
- `Callout` links, `Chip`, `Link`, `List`, `Menu`, `Range`, `Table`, `TextField`, `Toast`, the `Checkbox` and `Radio` halo and rich text links only show hover styles on devices that can hover, so they no longer stick after a tap.
- `Spinner` shows on busy buttons and links that have `aria-describedby`. Other elements with `aria-describedby` still opt out, for the progress bar pattern.
- `ButtonGroup` item styles select `.ui-button` instead of `button`, so `Button` links (`<a class="ui-button">`) are styled like the buttons. A plain `<button>` without `.ui-button` no longer gets the group item styles.
- `open-props.css` imports the Open Props files one by one instead of `open-props/src/index.css`, so `dist/op.css` and `dist/opui.css` no longer contain Open Props' `@custom-media` rules. Import `open-props/media` yourself if a PostCSS plugin reads them.
- `Switch`, `Tooltip`, `Textarea`, `Menu`, `Table`, `List`, `Tabs`, `Toast`, `Spinner`, `Carousel`, `Dialog`, `Drawer` and the typography styles use logical properties only (`min-inline-size`, `inset-inline-start`, `padding-block`/`padding-inline`, `resize: block` …), so they follow the writing mode. Horizontal left-to-right rendering is unchanged.
- `Toast` sits in the bottom inline-end corner and slides in from the inline end, so in right-to-left pages it shows at the bottom left.

### Fixed

- `Progress` pulses in place under reduced motion (`--motion: 0`) instead of freezing. Its indeterminate animation was scaled to `0s`.
- `Spinner` slows down to 1.5s per turn under reduced motion (`--motion: 0`) instead of ignoring it.
- Documented source imports with a `.css` extension (`opui-css/css/imports.css`, `opui-css/core/normalize.css`, `opui-css/css/components/button.css`, …) now resolve through `exports`. Previously they resolved to `*.css.css`.
- `Tooltip` transitions now respect `--motion` (`prefers-reduced-motion`, `.ui-motion-off`).
- `Dialog` backdrop is themeable via `--_backdrop-bg-color` and `--_backdrop-blur` (same as `Drawer`).
- `Dialog` scroll-lock matches `.ui-scroll-lock` and no longer shifts the layout when the scrollbar disappears.
- `Button` and `ButtonGroup` style `[aria-disabled="true"]` the same as `[disabled]`, e.g. for `<a class="ui-button" aria-disabled="true">` or focusable disabled buttons.
- `ButtonGroup` only styles its direct child buttons, so a `Menu` inside it (split button) keeps its own item styles.
- `Button` and `ButtonGroup` hover styles only apply on devices that support hover, so they no longer stick after a tap.
- `ButtonGroup` dividers are no longer double thick.
- `opui-css/open-props.css` resolves through `exports`.
- The package no longer ships the internal `components/AGENTS.md`.
- `dist` source maps no longer embed the sources (`sourcesContent`) or `node_modules/.pnpm` paths. Open Props sources point to `../../open-props/`, and `opui.components.css.map` accounts for the `@layer` order line.
- Peer dependency ranges are `astro` `^7`, `solid-js` `^1.9`, `svelte` `^5` and `vue` `^3.5` instead of the versions used for development.
- Vue `DrawerHeader` closes the drawer without hydration.
- `FieldGroup` `name` only applies to its own fields in Astro and Vue.
- `Tabs` and `ToggleGroup` context only applies to their own children in Astro.
- `Typography` rich text removes the top margin of the first child and the bottom margin of the last child in a component's `.ui-content`.
- `Typography` rich text lists after a heading or `hr` no longer get a top margin, and nested lists get their smaller margins.
- `Typography` rich text no longer overflows grid and flex parents with long words, URLs or code lines, and list items, figure content and table cells no longer push it wider than its container on narrow viewports.
- `Typography` rich text inline `code` styles no longer apply to `code` inside `pre`.
- `Typography` rich text `ol[type]` keeps its marker type, and consecutive `dt` elements are no longer spaced apart.
- `Typography` rich text no longer styles an `a` without `href` as a link.
- `Typography` rich text `code` inside a link gets a darker background in dark mode, so the link color keeps its contrast.
- `Range` track is visible again. `linear-gradient(to inline-end, …)` is not supported, so the track background was dropped. The track color is now a `background-color` and the fill a separate image that starts from the right in RTL. `--_track-fill` inherits so the fill reaches the track.
- `theme.css` gives `.ui-light` and `.ui-dark` on an element other than `html` the page surface and text color. `--color-scheme` follows the OS preference, so `Card` elevated shadows are correct in dark mode without a class.
- `core/palette.css` lets `.ui-palette` and the severity scopes inherit `--palette-hue`, `--palette-chroma`, `--palette-hue-rotate-by`, `--gray-hue` and `--gray-chroma` from their ancestors. It used to reset them to the defaults in every scope.
- `TextField`, `Textarea` and `Select` with `spread` (`.ui-spread`) collapse to a column when narrower than 400px. Previously the field was squeezed next to the label.
- `Select` with `spread` centers its arrow on the field.
- `TextField` and `Select` small fields are `--field-size-small` (32px) high, like a small `Button`. They were 38px.
- `TextField` date, time, week and month inputs no longer grow taller than the field, so small ones are 32px and time inputs are no longer 41px.
- `TextField` file inputs are `--field-size` high. They were 2px taller.
- `ToggleGroup` is as high as a `ToggleButton` of the same size. The group border made it 2px taller.
- `TextField`, `Textarea` and `Select` keep their field height when a grid or flex parent stretches them, e.g. next to a field with end text. The extra space went into the field.
- `TextField` prefix and suffix icons are capped at `--icon-size`, so a large icon no longer makes the field taller.
- `TextField` autosuggest arrow sits at the inline end in RTL. It overlapped the text.
- `ToggleButton` only grows inside a `ToggleGroup`. On its own in a flex container it stretched to fill the row.
- `Range` with `spread` (`.ui-spread`) collapses to a column when narrower than 400px, like `TextField`. The container query had no container, so it never applied, and the slider's minimum width could push its parent wider.
- `ClassicSelect` truncates a long selected option with an ellipsis instead of clipping it.
- `TextField` and `Select` without a label are as high as their field. The empty label row added 4px above it.
- `TextField` prefix and suffix use the field line height, so they no longer make the field taller on pages with a large line height.
- `Radio` large (`.ui-large`) uses `--choice-size-large`. It was the same size as the default.
- `Select` and `ClassicSelect` keep their arrow and its space at the inline end in RTL. The arrow covered the text.
- `Badge` severity colors use their own text color instead of `--primary-contrast`, and warning badges use dark text for contrast.
- `Checkbox`, `Radio`, `Switch`, `Range`, `TextField`, `Textarea` and `Select` validation messages and invalid labels use `--invalid-text-color`, which is lighter in dark mode. They failed contrast on dark surfaces.
- `Badge`, `Tabs` and `Toast` respect `--motion` and `prefers-reduced-motion`.
- `dist/opui.components.css` starts with the `@layer` order statement.
- `normalize.css` gives autofilled fields `--surface-default` instead of the undefined `--well-1`.
- `Drawer` is hidden (`display: none`) when closed, so it is no longer keyboard focusable.
- `Tooltip` shows when its trigger is more than one viewport down the page, and shifts along the viewport edge instead of squeezing. Tooltips with an arrow only flip.
- `Menu` submenu arrows mirror in RTL.
- `Badge` indicators mirror in RTL.
- `Callout` only uses the icon layout for a direct child `svg`, keeps its content at the top when stretched, and no longer shows lighter corners.
- `Card` wraps long words.
- `DescriptionList` switches layout based on its own width instead of the page, shares space between long terms and values, and wraps long values. A nested list sizes to its content and follows the outer list's layout, and `.ui-bordered` leaders only apply to the list's own items.
- `Table` padding no longer grows in narrow containers.
- `List` text can shrink below its longest word, and `.ui-inset` follows the dense gap.
- `Avatar` doesn't shrink in flex rows.
- `Button` disabled text color applies to text and outlined buttons in every color. Filled and tonal buttons keep their own text color and dim with the disabled opacity, so the label stays readable on the fill.
- `Button` `kbd` follows the button's text color on hover.
- `Typography` `.ui-mark` has a background, `.ui-del`/`.ui-ins` use the critical/success palette, and `del`/`ins` text passes contrast in light and dark mode.
- `Typography` rich text `pre` and inline `code` run left to right in RTL.
- `Typography` rich text ordered lists widen their gutter for long numbers, including `ol[start]`, and task lists only match a classless `label`, so a `Checkbox` in a list keeps its own styles.
- `package.json` lists `solid-js` as an optional peer dependency, like `astro`, `svelte` and `vue`.
- `TextField`, `Textarea` and `Dialog` in Astro no longer crash without a middleware that sets `Astro.locals.$id`.
- `TextField` and `Textarea` merge a passed `aria-describedby` with the end text id.
- `Range` in Vue shows the default value without `value` or `v-model`, and `v-model` returns a number.
- `Range` and `ToggleButton` in Vue take the `FieldGroup` name.
- `Range` invalid state colors the thumb too.
- `ToggleButton` disabled styles apply to a disabled input without `.ui-disabled`.
- `Switch`, `Tabs` and `ToggleButton` use a theme's `--focus-ring-color` for the focus ring.
- `Checkbox` forced-colors styles apply to checked and indeterminate boxes.
- `Accordion` `.ui-marker-turn` turns the marker down in RTL.
- `Callout` rich text inside `.ui-content` no longer gets doubled margins.
- `List` and `Table` borders on filled lists and table headers are visible in light mode.
- `ListItem` with `href` and no `as` renders a link in Astro and Vue.
- `FieldSet`, `FieldLegend`, `FieldDescription`, `FieldGroup` and `Form` in Vue no longer apply attributes and listeners twice.
- `Avatar` in Vue accepts arrays and objects for `class`, and the image always has an `alt` attribute.
- `Anchor` and `Badge` render a user `id` on the root. With `trigger="hover"` it stays the floating element's id.
- `Menu` taller than the space on either side no longer runs off the viewport.
- `Menu` second-level submenus keep the flipped direction instead of opening over the root menu.
- `Tooltip` arrow points at the trigger for every position, after flips and shifts.
- Vue `Anchor`, `Badge`, `Divider`, `Drawer`, `Menu`, `Table` Column, `Tabs`, `ToggleButton` and `ToggleGroup` update derived values when props change.
- `Accordion`, `Avatar`, `Divider`, `List`, `Progress`, `Range`, `Select`, `Switch`, `Tabs`, `Textarea`, `TextField` and `ToggleButton` keep their state visible in forced colors mode: selected tabs, toggles and list items use `SelectedItem`, switches, ranges, progress bars and dividers are drawn with system colors, focused fields get a `Highlight` outline, and elevated and tonal accordions and letter avatars get an outline.
- `Table` uses `overflow: clip` instead of `overflow: hidden`, so it is no longer a scroll container and sticky cells inside it stick.
- `Range` fills the track in Chromium and Safari without JavaScript, also in plain HTML, with a scroll-driven animation. The hover ring is no longer clipped at min or max.
- `Badge` dots sit in the corner of every alignment, not only the default one.
- `Badge` and `Anchor` no longer write the unused `--_anchor-inset`, and aligned badges no longer write `--anchor-position-area`.
- `Drawer` is named by its header heading through `aria-labelledby`, in Astro (first heading in the `header` slot) and Vue (`DrawerHeader` `heading`).
- `Dialog` `actionsAlign="start"` aligns the actions to the start.
- `FieldGroup` `direction="column"` stacks a group of only buttons.
- `FieldGroup` `name` skips button, hidden, image, reset and submit inputs in Astro, and reaches `ClassicSelect` in Vue.
- `ToggleButton` in Vue is a radio in a single-selection `ToggleGroup`, like Astro, even with a `type`.
- `ToggleGroup` separators show in forced colors.
- `Accordion` focus ring is drawn inside the summary, so the card no longer clips it.
- `ButtonGroup` vertical only squares icon-only buttons.
- `Callout` icons take the severity color with `color`, so fill icons no longer get a colored outline.
- `Checkbox` and `Radio` required asterisks in stacked labels sit after the label in RTL.
- `Typography` `.ui-p.ui-small` is `--font-size-05` (14px) instead of 12px.
- `Typography` `.ui-abbr` and `.ui-dfn` underlines use the info color, like `abbr` and `dfn`.
- `Typography` overline and heading group overline text, `code` in dark mode, `code` in `del`/`ins`, linked `code` in light mode and links in `mark` pass contrast.
- `List` keyboard shortcuts in `.ui-end` pass contrast.
- `DescriptionList`, `List` row links, `Card` (and `Dialog`) heading groups, `FieldDescription`, and `Button` and `List` `kbd` no longer pick up rich text padding, margins, font weight or font.
- `Dialog` only locks page scroll for modal dialogs (`showModal()`).
- `Select` only opts selects inside `.ui-select` into `appearance: base-select`.
- `env.d.ts` is in the package `exports`, so `/// <reference types="opui-css/env.d.ts" />` resolves.
- `dist/opui.components.css` no longer starts with a stray `undefined` line, which dropped the layer order and the `Anchor` styles.
- `Badge` critical, info and success fills cap their lightness at 0.48, so white text passes 4.5:1 (success was 4.44:1).
- `Checkbox` and `Radio` show their hover and press halo without `core/utils.css`, so `dist/opui.components.css` and single-file imports get it too.
- `Radio` sizes work on touch screens. Small and large radios were forced to `--size-4`, and the label sat off center.
- `Range` fill works when the CSS is minified with lightningcss (Vite builds). `animation-timeline` was folded into the `animation` shorthand, which browsers reject.
- `Switch` draws its invalid ring as a `box-shadow`, so the focus ring shows outside it. In forced colors an invalid switch no longer looks focused.
- `Accordion` with `.ui-marker-turn` mirrors its chevron in right-to-left, so it points to the inline end when closed and down when open.
- `ButtonGroup` vertical `x-small` and `small` items are as tall as their size.
- `theme.css` sets `--shadow-color` and `--shadow-strength` for dark mode (`.ui-dark` and the OS preference), so `--shadow-1` to `--shadow-6` show on dark surfaces. They used the light values before.
- `Radio` dot is centered at every size. It was half a pixel off at small, default and large.
- `Chip` with a start and an end icon gets the smaller padding on both sides, and an icon inside `.ui-text` no longer changes the padding.
- `Chip` disabled text color applies to tonal and outlined chips.
- `Checkbox` `initCheckbox()` adds its `astro:after-swap` listener once, however often it is called.
- `Drawer` with `.ui-backdrop-transparent` (`backdrop="transparent"`) no longer dims the page behind it. It only removed the blur before.
- `Menu` shrinks to the space on its side before it flips, instead of flipping as soon as its margin box overflows by one offset.
- `Tooltip` keeps its edge in forced colors with a `CanvasText` border, and the arrow stays visible.
- `Select` and `TextField` show the select and autosuggest chevrons in forced colors mode.
- `TextField`, `Textarea` and `Select` no longer darken a filled field on hover when a disabled `fieldset` disables it.
- `TextField` with a `list` and `Select` no longer shorten the label by 28px.
- `Textarea` no longer adds the border width to its minimum height.
- `Select` no longer shows the picker's square corners and shadow outside the rounded option list.
- `Table` footer rules and the row above the footer apply to `th` as well as `td`, so row headers line up with the footer line and a `th` in `tfoot` gets its top border and padding.
- `Table` row hover only highlights body rows, not the header or footer.
- `Typography` inline `code` directly inside `.ui-rich-text` gets the same padding and radius as inline code in a paragraph.
- `Typography` `.ui-small` also applies to `<small>`.
- `List` rows with a video keep their end padding on the text side in right-to-left.
- `List` row text styles no longer reach the `.ui-text` of buttons and chips inside a row, and `.ui-end` only sizes `svg` icons that are its direct children.
- `List` `.ui-dense` also shrinks group labels in grouped lists, such as a dense Select.
- `ListItem` with `as="button"` renders `type="button"`, so it no longer submits a surrounding form.
- `Callout` links in a tonal callout take the hover color on keyboard focus too.
- `Card` actions aligned to the end line up a plain last button with the content, and no longer pull a filled or outlined last button to the edge.
- `Accordion` content in a group without a variant lines up with the summary.
- `Carousel` markers show in forced colors mode: they get a border, and the current marker is filled with `SelectedItem`.
- `Carousel` scroll buttons and markers show the library focus ring instead of the thin browser ring.
- `Carousel` stops smooth scrolling with `.ui-motion-off` or `--motion: 0`, like its other transitions. Before, only `prefers-reduced-motion` turned it off.
- `Range` with `spread`, a value and tick marks no longer draws the value over the tick labels, and the end text of a narrow spread range no longer overlaps the slider or the tick labels.
- `Range` tick labels line up with the thumb at both ends.
- `Tabs` keep the DOM focus order in Chromium: the selected tab, then the content of its open panel. `reading-flow` put the panel content first.
- `Tabs` show the whole focus ring on a focused tab. The next tab covered its end side.
- `ToggleButton` keeps its selected tint on hover, also in a `ToggleGroup` and under `--contrast: more`, and a disabled selected button no longer changes on hover.

## 5.5.0 - 2026-09-28

### Removed

- `Toast` component from Astro and Vue. Toast is still available in HTML as an alpha, using `toast.css` and `toast.js`.

## 5.4.3 - 2026-09-18

### Fixed

Fix publish pnpm issue ([#357](https://github.com/felix-bohlin/ui/issues/357)) - thanks @onokumus!

## 5.4.2 - 2026-06-29

### Fixed

- Make overline in `Card` header smaller.

## 5.4.1 - 2026-06-11

### Fixed

- Fixed a `@vue/compiler-sfc` compilation crash in `Avatar`.

## 5.4.0 - 2026-06-09

- Added global control for motion that lets you enable or disable all motion with a single class `.ui-motion-on`, `.ui-motion-off`, `.ui-motion-debug`. By default it will listen to `prefers-reduced-motion`. Locally each component individually has `--_motion` variable that can be changed as well.

## 5.3.0 - 2026-06-04

Vue support! 🎉
It's a lot of work but hopefully it's all good with them.

### Added

- Vue components, importable from `opui-css/vue`.
- Adjusted types for Vue, Svelte and Solid.

## 5.2.0 - 2026-06-03

### Changed

- Broke out types for components into their own files. All frameworks now have their own types file. Yes you read that right, there will be more frameworks soon. Svelte, Vue and Solid are coming soon (in that order).

Thank you to [somephic](https://github.com/somephic) for the contribution and discussions!

## 5.1.2 - 2026-05-29

### Fixed

- Removed Open Props gray imports that overrode OPUI custom grays. How did I miss that??

## 5.1.1 - 2026-05-29

### Added

- Added CSS `@property` types to the palette (`--color-*` and `--gray-*`) variables to hopefully improve perf.

### Changed

- Cleaned up comments and theme variable organization in `css/theme.css`.

## 5.1.0 - 2026-05-28

### Fixed

- [#351](https://github.com/felix-bohlin/ui/issues/351): (Attempted to) fix performance issue caused by palette being defined on `*` instead of `:root`. This was causing style recalculations on every element when the palette changed, oops. Hopefully now, recalculations will only happen on elements that use palette variables.

The heavy color math is now properly scoped down to `:root`, severity classes (ex `.ui-warning`), and invalid components (`[class*="ui-"]:has(:user-invalid)`).

- Palette no longer is included in the openprops layer, instead it's been placed in the `theme.palette` layer, so hopefully it will solve some potential specificity issues.

### Changed

- Renamed the `critical` prop to `error` for validation in form components (`TextField`, `Checkbox`, `Radio`, `Switch`, `Select`, `ClassicSelect`, `Textarea`). While `critical` remains the standard for severity coloring (e.g. Buttons, Callouts, Badges), `error` makes more contextual sense for validation states.

### Added

- Added a new `.ui-palette` util class. If you are building something where you want to make use of the palette you can just use that class and be able to use the palette right there.

### Migration

The `opui-css/open-props` export no longer bundles OPUI's custom palette variables (`--color-*` and `--gray-*`). It now strictly represents the underlying Open Props tokens.

If you were relying on OPUI’s dynamic palette colors while importing the `open-props` subpath, you must now explicitly import the palette module alongside it:

```diff
  import 'opui-css/open-props';
+ import 'opui-css/core/palette.css';
```

Alternately, you can import the default full bundle (`import 'opui-css';`) which includes everything.

### Thank you

- [yinhx3](https://github.com/yinhx3) for reporting [#351](https://github.com/felix-bohlin/ui/issues/351)!

## 5.0.1 - 2026-05-26

### Breaking

- **Progress**: the `.ui-progress` class is now placed on a wrapper `<div>` instead of directly on `<progress>`. Raw HTML users must change `<progress class="ui-progress">` → `<div class="ui-progress"><progress>…</progress></div>`. Variant modifiers (`ui-default`, `ui-filled`, `ui-tonal`) also move to the wrapper `<div>`. The Astro component handles this automatically.

## 5.0.0 - 2026-05-21

### Breaking

This is technically very breaking, but with a little prompting from you it's probably not a big deal for you. Hopefully you'll understand the reasoning behind this.

Every OPUI-owned class now has a `ui-` prefix. This eliminates collisions with consumer styles and makes library classes self-identifying in the DOM.

- Component prop API is **unchanged**: `<Button size="small" variant="outlined" color="primary">` works exactly as before.
- Raw HTML / CSS users **must** rename every library class. `<button class="button outlined">` → `<button class="ui-button ui-outlined">`. `.button { ... }` overrides → `.ui-button { ... }`.
- CSS custom properties (`--primary`, `--surface-default`, `--size-3`, …) are unchanged.
- The framework component renders prefixed classes (`<button class="ui-button ui-small ui-outlined ui-primary">`); only the rendered HTML changes, not the public prop API.
- **Divider**, **Progress**, **Table**, **Tabs**, and **Description List** now render and style prefixed classes end-to-end (`.ui-divider`, `.ui-progress`, `.ui-table`, `.ui-tab-label`, `.ui-tab-panel`, `.ui-term`). Plain `<hr>`, `<progress>`, and `<table>` elements no longer pick up library styles unless the class is present.
- **Toggle Button**: pressed state no longer adds an unprefixed `selected` class.
- **Avatar**: removed unused `spacing` prop and related group gap classes.

#### Migration

Run a project-wide find/replace per token, prompt or whatever. Below are all the classes that got a `ui-` prefix.

<details>
<summary>Migrated classes</summary>

`abbr`, `accordion`, `actions`, `align-end`, `anchor`, `anchor-floating`, `auto-fit`, `avatar`, `backdrop-transparent`, `badge`, `badge-indicator`, `block-end`, `block-start`, `blockquote`, `border-filled`, `border-primary`, `border-tonal`, `border-top`, `bordered`, `button`, `button-group`, `callout`, `caption`, `card`, `checkbox`, `chip`, `cite`, `close-button`, `code-block`, `content`, `critical`, `dark`, `default`, `del`, `dense`, `description`, `description-list`, `dfn`, `dialog`, `disabled`, `divider`, `dot`, `dotted`, `drawer`, `elevated`, `end`, `end-end`, `end-start`, `end-text`, `exiting`, `field`, `field-description`, `field-group`, `fieldset`, `fieldset-item`, `filled`, `footer`, `form`, `gutterless`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `header`, `hgroup`, `icon`, `icon-button`, `icon-checked`, `icon-only`, `icon-unchecked`, `info`, `inline-end`, `inline-start`, `ins`, `inset`, `invisible`, `item`, `kbd`, `label`, `large`, `legend`, `light`, `link`, `list`, `mark`, `multiline`, `neutral`, `not-rich-text`, `outlined`, `overline`, `p`, `prefix`, `primary`, `progress`, `radio`, `range`, `rich-text`, `rounded`, `row`, `s`, `samp`, `scroll-lock`, `select`, `small`, `spacious`, `spread`, `squared`, `squircle`, `sr-only`, `stack`, `start`, `start-start`, `start-text`, `sub`, `success`, `suffix`, `sup`, `switch`, `tab-input`, `tab-label`, `tab-panel`, `table`, `tabs`, `term`, `text`, `text-field`, `textarea`, `title`, `toast`, `toggle-button`, `toggle-group`, `tonal`, `tooltip`, `transparent`, `u`, `value`, `var`, `vertical`, `warning`, `with-arrow`, `x-small`.

</details>

After the search/replace, do a visual smoke test - there is no automated codemod for consumer projects.

## 4.1.0 - 2026-05-18

### Breaking

- **Card** and **Dialog** (Astro): the `actions` prop with an `align` field is removed. Use the `actionsAlign` prop instead (`"start"` | `"end"`).

## 4.0.1 - 2026-05-13

### Fixed

- Autosuggest arrow placement.

## 4.0.0

Complete rewrite. The library now also ships as an installable npm package with Astro components.

Don't forget, I'm just a single person working on this in my free time. I'm doing this for fun. There will be bugs.

### Breaking

- `theme-one` and `theme-two` are removed. I can't maintain a million themes. There is now a single theme in `css/theme.css`.
- The default package entry (`import "opui-css"`) now resolves to the single bundled stylesheet (`dist/opui.css`) instead of `dist/theme-two/theme-two.css`. The class names are the same, the file path is not.
- The `src/themes/` build pipeline is gone (vite + postcss + per-theme scripts). The package now builds with a small `postcss-import`-only pipeline that does not transform or lower any CSS syntax.
- Component CSS source moved from `src/components/` to `css/components/`. The pre-bundled output stays in `dist/`.
- Cascade layer order is now declared by the library in `css/imports.css`: `openprops, normalize, theme, components.root, components.extended, utils`.
- `astro` `^6` is required if you import from `opui-css/astro`. Pure-CSS consumers are unaffected (the peer is marked optional).

### Added

- Anchor, Drawer, Form, Toast, Toggle, Tooltip and a lot of re-writes and improvements to existing components.
- Definition List -> Description List
- Tab buttons -> Tabs
- Toggle button group -> Toggle
- Astro component entry: `import { Button } from "opui-css/astro"`.
- Per-component CSS imports under `opui-css/css/components/*.css`.
- Pre-bundled stylesheets in `opui-css/dist/`: `opui.css` (everything), `opui.components.css` (components only), and `op.css` (Open Props tokens, unchanged subpath from v3) for CDN / no-bundler use.
- `sideEffects` correctly declared so bundlers don't tree-shake CSS.

### Migration

See [`MIGRATING.md`](./MIGRATING.md).

## 3.3.5 - 2026-02-19

### Changed

- goof: forgot to leave open-props as a dependency

## 3.3.4 - 2026-02-19

### Changed

- Moved all dependencies to `devDependencies`.

## 3.3.3 - 2026-01-07

### Changed

- **Build Process**: Refactored `scripts/build-themes.js` to support organized theme exports. Files are now exported to theme-specific subdirectories in `dist/`.
- **Package Exports**: Updated `package.json` to use subpath exports:
  - Default export `"."` now points to `theme-two.css`.
  - Added `"./theme-one"` and `"./theme-two"` exports.
  - Added `"./theme-one/components"` and `"./theme-two/components"` component imports.
  - Added `"./open-props"` export for the base Open Props stuff.
- **Documentation**: Updated "Getting Started" guide with new usage examples and bundler configuration instructions (Vite vs. PostCSS).

### Fixed

- Improved build script to automatically create subdirectories in `dist/` if they don't exist.
- Fixed watch mode in `build-themes.js` to correctly track and rebuild both theme and component files.

## 3.3.1 - 2025-12-17

### Fixed

- `switch.css` goof.

## 3.3.0 - 2025-12-17

### Added

- Internal updates and optimizations.

## 3.2.0 - 2025-12-07

### Added

- Add support for `kbd` element inside of `<button>`.

## 3.1.2 - 2025-11-09

### Added

- Added CSS variable to control list hover `background-color`.

## 3.1.1 - 2025-10-23

### Added

- Add support for icons in Switch component (e.g., dark mode toggle).

### Fixed

- Bug fix for definition list where lists with lots of content weren't rendering correctly.

## 3.1.0 - 2025-10-23

### Changed

- Removed sticky header from `table` component to allow for custom implementations.

## 3.0.0 - 2025-10-22

### Added

- **Themes**: Introduced a formal theme system.
- Added `theme-two` as the new default theme (cleaner, more unified).
- Revised documentation and getting started guide for the new theme system.

### Changed

- Refactored component structure to better support multiple themes.

## 2.2.3 - 2025-09-21

### Changed

- Reverted `box-sizing` change from previous release.

## 2.2.2 - 2025-08-19

### Changed

- Moved `theme.css` out of the main bundle.
- Made `box-sizing` declaration in normalize less intrusive.

## 2.0.1 - 2025-08-19

### Removed

- Removed redundant code and assets.

## 2.0.0 - 2025-08-19

### Changed

- **Folder Structure**: New and improved folder structure.
- **PostCSS**: Switched from `lightningcss` to `postcss` for better stability.
- **NPM**: Made the package installable via npm.
- **Layers**: Renamed component sub-layers to `components.root` and `components.extended`.
- **Bundles**: Added pre-bundled versions with and without Open Props.

### Fixed

- Progress component wrapped in `@layer`.
- Theme color scheme fallback improvements.

## 1.2.4 - 2025-04-23

### Fixed

- Normalize custom-media improvements.

## 1.2.3 - 2025-04-16

### Fixed

- Button CSS updates.

## 1.2.2 - 2025-03-18

### Added

- Improved Select list animation and implementation of `::picker-icon`.
- Context-aware link colors in Alerts.

## 1.2.1 - 2025-03-07

### Fixed

- Removed unused border color in Switch component.

## 1.2.0 - 2025-02-18

### Added

- New component: `tab-buttons`.

## 1.1.4 - 2025-02-18

### Fixed

- Dialog component improvements when used with `.card` class.

## 1.1.3 - 2025-02-11

### Fixed

- Field component: Fixed issue where input was pushed down instead of label moving.

## 1.1.2 - 2025-02-10

### Changed

- Refactored pseudo-elements to use double colons (`::`).
- General package upgrades.

### Fixed

- Normalize `::before` fix.
- Outline offset clipping.

## 1.1.1 - 2025-01-26

### Added

- `box-decoration-clone` for `mark` elements.

## 1.1.0 - 2025-01-19

### Added

- New component: `range` input.

## 1.0.2 - 2025-01-17

### Fixed

- Select and documentation fixes.

## 1.0.1 - 2025-01-16

### Changed

- Adjusted for Select API changes (`<selectedoption>` to `<selectedcontent>`).
- Checkmark pseudo-element changed from `::before` to `::check`.

## 1.0.0 - 2025-01-14

### Added

- Initial release with 25+ components.
- Full documentation website.
- Added `[name]` attribute support to accordion.
- Support for stroke SVG icons in buttons.
