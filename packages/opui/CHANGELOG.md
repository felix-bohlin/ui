# Changelog

## 6.0.0 - Unreleased

### Breaking

- `Accordion` markers are the `svg` with `.ui-marker`. Add `.ui-marker` to the chevron to keep it rotating. Other icons in the `summary` stay put.
- `Accordion` renders a chevron marker by default in Astro and Vue, hidden from screen readers with `aria-hidden="true"`. The `marker` slot on `AccordionSummary` replaces it, so move a custom chevron there and give it `.ui-marker`, or it shows twice. An empty `marker` slot shows the native arrow.
- `TextField`, `Textarea` and `Select` in Astro and Vue no longer generate an input `id`. Pass `id` when something outside the component needs to reference the input.
- `ToggleButton` in Astro and Vue no longer generates an input `id`. Pass `id` when something outside the component needs to reference the input.
- `Checkbox` and `Radio` internal variables are private (`--_` prefix): `--highlight-size` is `--_ripple-size` and `--thumb-scale` is `--_thumb-scale`. `--isLTR` and `--isRTL` are removed, the halo centers itself in both directions. Rename any overrides to the new names.
- `TextField` and `Textarea` take a `size` prop instead of `small`. Replace `small` with `size="small"`.
- `Switch` takes `size="small"` instead of `small`, like `Checkbox`.
- `ButtonGroup` variants apply to the whole group. A variant class on a single button inside a group is no longer supported.
- `List` no longer takes `divided`. Use `bordered` (`.ui-bordered`) ([#395](https://github.com/felix-bohlin/ui/issues/395)).
- `Button` no longer takes `.ui-icon-only`. A button whose only child is an `svg` is square, at every size and inside `ButtonGroup`, so remove the class.
- `Button` in Astro and Vue no longer adds `.ui-disabled` to a disabled `<button>`. It sets `disabled`, and `aria-disabled="true"` on links. Target `:disabled` or `[aria-disabled="true"]` instead of `.ui-disabled`.
- `Button` icon styles only apply to a direct child `svg` (`> svg`), sized with `--_icon-size`. An `svg` nested in another element is no longer sized. Padding scales with `--_padding-inline` (`1ex` x-small, `1.25ex` small, `1.5ex` default, `2.5ex` large; was `0.5ex`, `0.75ex`, `1.5ex` and `4ex`), and the icon side gets tighter padding when a direct child `svg` sits next to a wrapped label (`<span class="ui-text">`). Wrap the label when the button has an icon: text next to an `svg` without a wrapper renders as icon-only.
- `Anchor` with `trigger="hover"` and `Tooltip` no longer wrap their trigger in a `<span interestfor>`. Add `interestfor` with the anchor's `id` to the trigger element.
- `Tabs` look like segmented controls: the tabs sit on a rounded track and the selected tab is a raised pill. `--_accent-color` and `--_bg-color` are gone, use `--_active-bg-color`, `--_active-text-color`, `--_indicator-color` and `--_track-color`, or a `variant`. The selected pill is outlined with `--ui-control-border-color`, or `--ui-field-border-color`, so it reaches 3:1 against the track without the shadow. The open panel gets a `--ui-space-2` top margin.
- `Typography` rich text only styles headings without a class, like lists. Component parts such as the `Callout` title keep their own styles. Use the `.ui-h1`–`.ui-h6` classes to style a heading that has a class.
- `Typography` theme tokens: `--ui-font-size-h3` is fluid with a higher minimum (`clamp(var(--ui-font-size-500), 4vi, var(--ui-font-size-600))`), `--ui-font-size-h4` scales between `--ui-font-size-400` and `--ui-font-size-500` instead of a fixed size, and `--ui-font-size-h6` is `--ui-font-size-300`, so heading sizes no longer invert or drop below body text on narrow viewports.
- `Typography` rich text lives in a new `components.prose` layer, below `components.root`, so component styles inside rich text win over prose styles. The layer order is `openprops, theme, normalize, components.prose, components.root, components.extended, utils`. If you declare the layer order yourself, add `components.prose` before `components.root`, or it sorts after `components.extended` and prose styles beat component styles inside rich text.
- `theme.css` `--ui-focus-ring-color` is the inverted page background instead of `var(--ui-primary)`, and the global `:focus-visible` ring and the component rings read it, with `--ui-focus-ring-width`, `--ui-focus-ring-style` and `--ui-focus-ring-offset`. Set `--ui-focus-ring-color: var(--ui-primary)` to keep the old value.
- `theme.css` holds `--ui-motion` and its `prefers-reduced-motion` default, which moved from `core/normalize.css`. The `.ui-motion-*` classes moved to `core/utils.css`. If you import single files, import `theme.css` and `utils.css` too, or `--ui-motion` is undefined and the `.ui-motion-*` classes are missing.
- `Avatar` requires `alt` when `src` is set (types). `alt=""` is still allowed for decorative images.
- `Tooltip` requires an `id` (types). Without it the trigger can't reference the tooltip.
- `Button`, and `Chip` and `Avatar` with `as="button"`, render `type="button"` by default in Astro and Vue, so they no longer submit forms. Pass `type="submit"` for submit buttons.
- `TextField` and `Textarea` in Astro pass extra attributes to the `<input>`/`<textarea>` instead of the `<label>`. `class` and `style` stay on the label. In Vue, `style` now goes to the label instead of the input.
- `DescriptionList` in Vue exports `DescriptionListDescription` instead of `Description`, like Astro.
- `ListItem` `as` only accepts `"a"`, `"button"` or `"div"` (types).
- `Tabs` render no `tablist`, `tab` or `tabpanel` roles and no `aria-controls`/`aria-labelledby`, so screen readers announce the radio group they are. `TabsItem` and `TabsPanel` no longer take `panelId`, and `TabsPanel` no longer takes `tabId`. `tabs.css` no longer matches `[role="tab"]` or `[role="tabpanel"]`, use `.ui-tab-label` and `.ui-tab-panel`.
- `FieldGroup` no longer sets `role="group"`. Wrap it in a `FieldSet` (a `<fieldset>`, already a group) to group and name the fields. `FieldSet` with another element in `as` gets `role="group"`.
- `Range` in Astro and Vue no longer sets `--_track-fill` from script. The track fill is a scroll-driven animation in CSS.
- `List`, `Range` and `Progress` no longer take `variant="default"` (`.ui-default`, the page surface), because it wasn't the default look. Use `outlined` (the default), `filled` or `tonal` on a `Range`, `tonal` (the default) or `filled` on a `Progress`, and `filled` (the default), `tonal` or `transparent` on a `List`.
- `TextField` and `Textarea` take `variant="filled"` like `Select` instead of the boolean `filled`. Replace `filled` with `variant="filled"`.
- `Divider` variants render `.ui-filled` and `.ui-tonal` instead of `.ui-border-filled` and `.ui-border-tonal`, and `variant="primary"` is `color="primary"`, which renders `.ui-primary` instead of `.ui-border-primary`. A primary line keeps its color with any variant.
- `Accordion`, `Avatar`, `Badge`, `Button`, `Callout`, `Card`, `Chip`, `Drawer`, `List`, `Progress`, `Range`, `Select`, `Switch`, `Table`, `TextField`, `Textarea`, `ToggleButton` and `Tooltip` private custom properties follow one scheme: `--_accent`, `--_text-color`, `--_bg-color`, `--_duration`/`--_ease`, `--_size` and `--_min-height`. MIGRATING lists every rename.
- `ToggleButton` no longer supports `.ui-disabled`, and Astro and Vue no longer add it. Set `disabled` on the input, the toggle is styled through `:has(input:disabled)`.
- `TextField`, `Textarea`, `Select`, `Switch`, `Checkbox`, `Radio` and `Range` are marked invalid with `aria-invalid="true"` on the control instead of `data-invalid` on the root. `error` in Astro and Vue sets only `aria-invalid`. Replace `data-invalid` on the root with `aria-invalid="true"` on the `<input>`, `<select>` or `<textarea>`.
- `FieldSet` (`.ui-fieldset`) no longer reads `data-invalid`. Its end text turns red when a control inside has `aria-invalid="true"` or is `:user-invalid`, so mark each control in the group (`error` on each `Checkbox`, `Radio` or `Switch` in Astro and Vue).
- `TabsItem` `open` and `ToggleButton` `pressed` are `checked`, the native attribute they set.
- `Anchor` and `Tooltip` `alignment` is `positionArea`, named after the CSS `position-area` value it takes, and `.ui-with-arrow` on a tooltip is `.ui-arrow`, like the `arrow` prop.
- `Badge` `alignment` is `corner`, since it picks a corner of the child. The classes are unchanged.
- `Badge` `label` is a `string` (types). Pass a number as a string.
- `Badge` indicator is `.ui-indicator` instead of `.ui-badge-indicator`.
- `FieldGroup` `direction` (`"row"`, `"column"`) is `orientation` (`"auto"`, `"horizontal"`, `"vertical"`), like `ButtonGroup`, `ToggleGroup` and `Carousel`, and `.ui-row` and `.ui-column` are `.ui-horizontal` and `.ui-vertical`. `auto`, the default, stacks fields and lines up a group of only buttons in a row.
- `Avatar` `variant` is `shape` (`"circle"`, `"rounded"`, `"squared"`, `"squircle"`), with `circle` as the default. The classes are unchanged.
- `Table` `variant` is `density` (`"dense"`, `"normal"`, `"spacious"`), so `variant` only names a surface. The classes are unchanged.
- `Card` `variant="text"` is `variant="transparent"` (`.ui-transparent` instead of `.ui-text`), so `.ui-text` only names the text part of a component. The default card is named `plain`.
- `Chip`, `Drawer` and `Progress` in Astro and Vue no longer render the class of their default look: no `.ui-tonal` on a tonal `Chip` or `Progress`, and no `.ui-inline-start` on a `Drawer` that opens from the inline start. In HTML these classes add nothing and can go. CSS that targets them can use `.ui-chip:not(.ui-outlined)`, `.ui-progress:not(.ui-filled)` and `.ui-drawer:not(.ui-block-end, .ui-block-start, .ui-inline-end)` instead.
- `Card` in Astro and Vue takes parts instead of slots: `CardHeader`, `CardContent` and `CardActions`. `actionsAlign` is `align` on `CardActions`.
- `Dialog` in Astro and Vue takes parts instead of slots: `DialogHeader`, `DialogContent` and `DialogActions`. `actionsAlign` is `align` on `DialogActions`. `aria-labelledby` points at the `DialogHeader` unless you pass `aria-label` or `aria-labelledby`, so a dialog without a `DialogHeader` needs `aria-label`. An `id` on `DialogHeader` only applies when the dialog has `aria-label` or `aria-labelledby`, and a dev warning says when it is replaced.
- `Tabs`, `Table` and `DescriptionList` in Astro no longer have dot aliases such as `Tabs.Item`, `Table.Head` and `DescriptionList.Item`. Import the flat names, such as `TabsItem`, `TableHead` and `DescriptionListItem`, like React, Svelte and Vue. The `components/{Tabs,Table,DescriptionList}/index.ts` files that held the aliases are gone.
- `Accordion` in Astro and Vue takes parts instead of slots: `AccordionSummary`, `AccordionContent` and `AccordionActions`. The root no longer wraps its children in `.ui-content`, and the `marker` slot moves to `AccordionSummary`.
- `Anchor` in Astro and Vue takes `AnchorContent` instead of the `anchored` slot. Without it, no floating element renders.
- `Tooltip` in Astro and Vue takes `TooltipContent` instead of `label` and the `content` slot.
- `Callout` in Astro and Vue takes parts instead of slots: `CalloutIcon` renders the severity icon and `CalloutContent` the content. The root no longer renders an icon or wraps its children in `.ui-content`. The `title` slot and `headingLevel` are gone: write the title as a plain heading of any level first in `CalloutContent`. A custom icon is an `svg` placed first in `Callout`.
- `Drawer` in Astro and Vue takes parts instead of slots: `DrawerHeader`, `DrawerTitle`, `DrawerContent` and `DrawerFooter`. `DrawerTitle` replaces the `DrawerHeader` `heading` prop and names the drawer. The drawer no longer looks for a heading: without a `DrawerTitle`, pass `aria-label`. An `id` on `DrawerTitle` only applies when the drawer has `aria-label` or `aria-labelledby`, and a dev warning says when it is replaced. In Astro and Vue, `DrawerHeader` in a `Drawer` closes it with `command="close"` (Invoker Commands) instead of a click handler, so the Vue `DrawerHeader` closes the drawer without hydration, and browsers without Invoker Commands need a polyfill.
- `Table` and `DescriptionList` part files are `components/Table/TableBody.*`, `TableCell.*`, `TableColumn.*`, `TableColumnGroup.*`, `TableHead.*`, `TableHeaderCell.*`, `TableRow.*` and `components/DescriptionList/DescriptionListDescription.*`, `DescriptionListItem.*`, `DescriptionListTerm.*`. The `opui-css/<framework>` exports are unchanged; update deep `./components/*` imports.
- `TableColumn` `width` takes a CSS length. A declaration string (`width="min-width: 10rem"`) is no longer parsed; pass `style` instead.
- `ToggleGroup` `size="default"` is `size="medium"`, and `Accordion` `variant="default"` is `variant="transparent"`, the names of their default looks.
- `choice.css` holds the layout, label, end text, sizes and disabled styles shared by `Checkbox`, `Radio` and `Switch`, which moved out of `checkbox.css`, `radio.css` and `switch.css`. Import it with them, in any order, or use `components.css`.
- `Anchor` requires `id` with `trigger="hover"` and no longer generates one. Pass the same `id` to `interestfor` on the trigger.
- `Avatar`, `Button` and `Chip` types match the rendered element: a button `Avatar` or `Chip` needs `as="button"`, a link `Chip` needs `href`, `disabled` only goes with a button or a link, and `Button` takes link attributes only with `href` (types).
- `Dialog` page scroll lock lives in `core/utils.css`, shared with the `Drawer` `.ui-scroll-lock`, and no longer sets `block-size: 100%` on `html`. If you import single files, import `utils.css` too, or the page scrolls behind a modal dialog.
- `ListItem` `type` can't be combined with `as` or `href` (types).
- `Select` items are typed `SelectItem`, with a `number | string` `value`. Rename imports of `Item` from `components/Select/types`.
- `Avatar` no longer takes `isGroup`. Wrap avatars in `AvatarGroup`, which renders `div.ui-avatar-group` with `role="group"`.
- `Button` and `Chip` links with `disabled` (`aria-disabled="true"`) no longer render `href`, so they can't be focused or followed. `button.css` and `chip.css` no longer set `pointer-events: none` on disabled links, so remove `href` from them in HTML.
- `TextField`, `Textarea` and `Select` take `startText` (the `start-text` slot) instead of `description`, matching `endText`, `Range` and the `.ui-start-text` class.
- `Checkbox`, `Progress`, `Radio`, `Range`, `Select`, `Switch` and `ToggleButton` in Astro and Vue put `style` on the root, like `class`, instead of the `<select>`, `<input>` or `<progress>`, so `--_` properties set through `style` apply.
- `TextField` styles in `text-input.css` moved into `text-field.css`, and `text-input.css` is removed. Remove its import.
- `Checkbox`, `Radio`, `Switch`, `Range`, `DescriptionList` and `Table` type files are named like the other components: `components/Checkbox/types*` export `Props` and `Slots` instead of `CheckboxProps` and `CheckboxSlots` (likewise `Radio`, `Switch` and `Range`), `DescriptionList` exports `DescriptionListTermProps`, `DescriptionListDescriptionProps` and `DescriptionListItemProps` instead of `TermProps`, `DescriptionProps` and `ItemProps`, and `Table` exports one type per part (`TableBodyProps`, `TableCellProps` and the rest) instead of `SectionProps`, and `TableColumnProps` instead of `ColumnProps`. Import the types from `opui-css/<framework>` instead.
- `Checkbox`, `Radio`, `Switch`, `CheckboxInput` and `SwitchInput` in Astro no longer type a `type` prop, and `Radio` no longer types the native `size` (types).
- `Range` in Astro types its extra attributes as `<input>` attributes only, since they go to the input (types).
- `ToggleButton` icon styles only apply to a direct child `svg`, sized with `--_icon-size`. An `svg` nested in another element is no longer sized.
- `normalize.css` no longer declares `--_page-bg-color`. The page background reads `--ui-surface-default`; set that, or `background-color` on `html`.
- `Card` no longer has `--_shadow-light` and `--_shadow-dark`. Set `--ui-shadow-elevated-light` and `--ui-shadow-elevated-dark` in your theme, or `--_elevated-shadow` on the card.
- `theme.css` no longer sets `--ui-button-radius` and `--ui-field-radius`. Components fall back to `--ui-radius` when they're unset. If your styles read them, add the fallback: `var(--ui-button-radius, var(--ui-radius))`.
- `theme.css`, `palette.css` and the components name every theme token with a `--ui-` prefix, like the classes: `--primary` is `--ui-primary`, `--space-3` is `--ui-space-3` and `--color-1` is `--ui-color-1`. Open Props tokens such as `--size-3` and `--shadow-color` keep their names. Add `ui-` to the tokens you set or read.
- `theme.css` `--font-size-05` is `--ui-font-size-small`. Rename it where you set or read it.
- `List` no longer styles `[aria-selected="true"]` on a row's `li`, `a`, `button` or `label`, where ARIA doesn't allow it. Mark the current row with `aria-current="page"`. Options (`option` and `[role="option"]`) keep the selected style.
- `theme.css` tokens follow one naming model: `--ui-on-*` is the text and icon color on a fill, `-text` after a color is that color tuned for reading, and `light`, `dark`, `inverse` and `contrast` each mean one thing. Beyond the `--ui-` prefix, `--text-primary` is `--ui-text-strong`, `--primary-contrast` is `--ui-on-primary`, `--text-primary-contrast` is `--ui-on-inverse`, `--text-muted-contrast` is `--ui-on-inverse-muted`, `--border-radius` is `--ui-radius`, `--button-border-radius` is `--ui-button-radius` and `--field-border-radius` is `--ui-field-radius`. MIGRATING lists them.
- `theme.css` roles are what components read, so overriding a palette step (`--ui-gray-N`, `--ui-color-N`) or an Open Props value such as `--size-3` on a part of the page no longer changes the components there. Override the role instead, such as `--ui-surface-default`, `--ui-border-color` or `--ui-space-3`, or put `.ui-palette` on the part so the roles are derived again from its palette.

### Removed

- `Accordion`, `Anchor`, `Callout`, `Card`, `Dialog`, `Drawer` and `Tooltip` no longer export a `Slots` type from `types.ts`, and the Vue `Drawer` types no longer export `DrawerHeadingIdKey`, `DrawerSlots`, `DrawerHeaderSlots` or `DrawerFooterSlots`.
- `Chip` hover and press ripple. Remove any `--ripple` overrides.
- `IconButton` (`.ui-icon-button`). Use `Button`: an icon-only button is square by default, `round` (`.ui-round`) makes it a circle. The hover halo is gone: icon-only buttons get the button's hover background. The old default size (28px) is `size="x-small"`. The old `small` (20px) has no preset: use `x-small` with `--_min-height: var(--size-4)`. Icons are smaller (`--_icon-size: var(--size-5)` matches the old 24px), and the icon color is the button's accent instead of the inherited text color.
- `palette.css` no longer registers the palette variables (`--color-*`, `--gray-*`, `--palette-source` and `--palette-hue`) with `@property`.
- `ToggleGroup` no longer exports the unused `ToggleContext` type.
- `TextField` and `Textarea` no longer take `supportingText` or the `supporting-text` slot. Use `endText` (`end-text`).
- `Avatar` squircle no longer falls back to a rounded square. Without `corner-shape` it is a circle.
- `Range` no longer wraps the scroll-driven track fill in `@supports (animation-timeline: view())`.
- `TextField` no longer styles `::-webkit-file-upload-button`, only `::file-selector-button`.
- `normalize.css` no longer includes `::-webkit-file-upload-button`, `:-webkit-autofill` and `::-moz-placeholder`.
- `normalize.css` no longer falls back to `--text-color-2` when `--ui-text-muted` is unset.
- `normalize.css` no longer sets `text-rendering: optimizeLegibility` on `body`.
- `Select` no longer hides `option::before`.
- `ClassicSelect`. Use `Select`: it renders the same field, with the browser's own picker where customizable select isn't supported.
- `open-props.css` no longer imports Open Props' `props.palette.css`, so `opui-css/open-props` (`dist/op.css`) no longer declares `--palette-hue`, `--palette-chroma`, `--palette-hue-rotate-by` or `--color-1` to `--color-16`. `core/palette.css` declares them as `--ui-palette-*` and `--ui-color-1` to `--ui-color-16`.
- `DescriptionList` `.ui-term` and `.ui-description`. The list styles `dt` and `dd` by element, and `DescriptionListTerm` and `DescriptionListDescription` render a plain `dt` and `dd`.
- `Range` thumbs no longer change their border inside a focused `.ui-fieldset-item`, a class no component renders.
- `Toast`. `toast.css` with `.ui-toast` and its parts (`.ui-close-button`, `.ui-exiting`, `.ui-icon`, `.ui-title`), `css/js/toast.js` with `initToastManager()` and `showToast()`, and their types are gone.
- `theme.css` `--primary-dark` and `--primary-light`. Derive a shade from `--ui-primary` with relative color instead, such as `oklch(from var(--ui-primary) calc(l * 0.75) c h)`.
- `types.solid.ts` from every component folder, and the `solid-js` peer dependency. There are no Solid components.

### Added

- `Carousel` takes an `aspectRatio` prop that crops media, like `--_media-aspect-ratio`.
- `Progress` has a `--_loop-duration` property for the length of its indeterminate loop.
- `opui-css/svelte` exports Svelte 5 components for every Astro and Vue component. Containers take parts, such as `CardHeader` and `DialogActions`. Other slots are snippets (`children`, and camelCased names such as `endText`), `TextField`, `Textarea`, `Select`, `Range` and `ToggleGroup` support `bind:value`, `Checkbox` and `Switch` support `bind:checked` and `bind:group`, `ToggleButton` supports `bind:checked`, and `Radio` supports `bind:group`. `svelte` `^5.29` is an optional peer dependency.
- `opui-css/react` exports React 19 components for every Astro and Vue component. Containers take parts, such as `CardHeader` and `DialogActions`. Other slots are props (`children`, and camelCased names such as `endText`), form controls (`ToggleButton` and `TabsItem` too) take the native `value`/`defaultValue`, `checked`/`defaultChecked` and `onChange` props, and components that need context, state or effects are marked `"use client"` so the rest also render as React Server Components. `react` and `react-dom` `^19` are optional peer dependencies.
- `Accordion` takes a `markerAnimation` prop (`rotate`, `flip`, `turn`) that sets how the marker animates when it opens. Defaults to `rotate`, which needs no class; `.ui-marker-animation-flip` mirrors the chevron and `.ui-marker-animation-turn` points it to the inline end when closed and down when open, also in right-to-left.
- `Button` takes a `round` prop (`.ui-round`). Icon size is set with `--_icon-size`.
- `Carousel` component (`ul.ui-carousel`). Scroll snap, with previous/next buttons (`::scroll-button()`) and markers (`::scroll-marker`) generated by CSS. Buttons use inverted colors with a gray border derived from the button color so they contrast with any item, show an SVG chevron that follows the color scheme, and sit over the items without a class, beside them (`buttons="outside"`, `.ui-buttons-outside`) or nowhere (`buttons="none"`, `.ui-buttons-none`). Images, videos and iframes fill the item with a configurable aspect ratio. Supports items per view (`itemsPerView`, `--_items-per-view`), peek, center alignment, RTL, and custom properties for every size, color, icon and label. No JavaScript needed, with Astro, React, Svelte and Vue components, and it falls back to a snapping scroller. The buttons take `--ui-shadow-overlay`, markers are 24px targets around an 8px ring in `--ui-text-muted`, which keeps its contrast in every theme, and the current marker is a 16px dot in `--ui-selected-strong`, and motion, smooth scrolling included, follows `--ui-motion` like the other components.
- `Menu` component (`menu.ui-menu.ui-list[popover]`). Opens with Invoker Commands, anchors to its trigger with no `anchor-name`, shrinks to the space on its side and flips when that side has less than `12rem`, and moves below or above its trigger when neither side fits. Browsers without `calc-size()` (Firefox and Safari) cap it at `60dvb`, flip it when it doesn't fit, and move it below or above its trigger, where it scrolls, when no side has room. Its placements use `self-` `position-area` keywords, so in a right-to-left part of a left-to-right page it opens from its trigger's right edge (not yet in Firefox, which places it toward the wrong side). Supports an `items` prop (items take native `a` and `button` attributes in every framework), `bordered` (`.ui-bordered`, a divider between items), custom `ListItem` content, placements, end alignment (`align="end"`, `.ui-align-end`), `--ui-anchor-position-area` and critical items. Items are built like `List` items, with the text in `.ui-text` and shortcuts in `.ui-end`. Items in a submenu close the whole menu. Group labels are HTML and CSS only. Submenus go in the `submenu` slot of a `ListItem`. On iOS, submenus anchor to their parent menu instead of their trigger item. When space is tight, the menu keeps at most 40% of the viewport height. Its border and dividers are `--ui-border-color-on-raised`, like other elevated surfaces.
- `ListItem` takes a `submenu` slot, rendered inside the `<li>` after the element set by `as`, for a nested `Menu`.
- `DrawerHeader` takes a `commandfor` prop (the drawer `id`). Inside a `Drawer` it defaults to the drawer's `id`, and the close button uses `command="close"` (Invoker Commands). Outside a `Drawer` without `commandfor`, it closes the nearest `<dialog>` with a script.
- `Button` links with `aria-disabled="true"` look disabled and get no hover or press styles.
- `Chip` supports `aria-disabled="true"`, and `.ui-disabled` dims a static chip (it doesn't disable a button or link chip).
- `Carousel` buttons take an image icon via `--_button-icon`, sized with `--_button-icon-size`. It defaults to a chevron that points right, drawn as the inverse of the button face so it follows `.ui-dark`, `.ui-light` and forced colors, mirrored for the previous button and in RTL, and rotated in vertical carousels.
- `Carousel` takes a `persistentButtons` prop (`.ui-persistent-buttons`) that keeps both buttons visible. A disabled button keeps its fill and gets a more muted border (`--_button-disabled-border-color`).
- `Tabs` take a `variant` prop. `filled` (`.ui-filled`) fills the selected tab with `--ui-selected-strong`, the primary color unless a theme sets it, `line` (`.ui-line`) drops the track and marks the selected tab with a line, and `outlined` (`.ui-outlined`) uses a bordered track without a background.
- `Tabs` take a `scrollable` prop (`.ui-scrollable`). The tabs stay on one row and scroll sideways when they don't fit, and the open panel stays in view. Takes any number of tabs.
- `layers.css` holds the `@layer` order, for importing single component files.
- `skills/opui` is an agent skill shipped with the package, with a reference for every component and an index that maps every exported component and part to its reference.
- `TextField`, `Textarea` and `Select` take `x-small` (`.ui-x-small`, 28px) and `large` (`.ui-large`, 46px) sizes, so every field size has a matching `Button` size. x-small fields set their text in `--ui-font-size-caption`, like x-small buttons. Their block padding follows `--ui-space-scale`, like the other sizes.
- `Chip` takes a `large` size (`.ui-large`, 40px) for chips next to default-size fields and buttons. Chip heights come from `--ui-chip-size-small`, `--ui-chip-size` and `--ui-chip-size-large`, which follow the control size scale.
- `ButtonGroup` and `ToggleGroup` take `scrollable` (`.ui-scrollable`) to keep their items on one row and scroll sideways, and `shrink` (`.ui-shrink`) to keep them on one row and truncate labels with an ellipsis.
- `theme.css` adds `--ui-choice-label-offset` to nudge `Checkbox`, `Radio` and `Switch` labels against their control for fonts with unusual metrics, and `--ui-invalid-text` for validation messages.
- `ToggleButton` and `ToggleGroup` take a `large` size (`.ui-large`), and `ButtonGroup` takes `x-small` (`.ui-x-small`).
- `Typography` reads a `--ui-rhythm-step` theme token (`0.25rem`). Heading font sizes snap to half a step and heading line heights to a full step with `round()`.
- `Typography` rich text styles `hr`, tables (which scroll sideways in a narrow column), `pre > samp` and preformatted text without `code`.
- `Typography` rich text task lists (an `li` that starts with a checkbox, or with a classless `label` around one) show the checkbox in place of the bullet.
- `theme.css` adds motion tokens: `--ui-duration-fast`, `--ui-duration`, `--ui-duration-slow`, `--ui-ease`, `--ui-ease-enter` and `--ui-ease-exit`. Every component transition and animation reads them, multiplied by `--ui-motion`.
- `theme.css` adds `--ui-focus-ring-inset` for focus rings drawn inside a control, read by `Accordion`, `ButtonGroup`, `List`, `Select`, `Tabs` and `ToggleButton`.
- `theme.css` adds icon tokens: `--ui-icon-size-small`, `--ui-icon-size` and `--ui-icon-size-large`.
- `theme.css` adds choice control tokens: `--ui-choice-size-small`, `--ui-choice-size`, `--ui-choice-size-large`, `--ui-switch-thumb-size-x-small`, `--ui-switch-thumb-size-small`, `--ui-switch-thumb-size`, `--ui-switch-thumb-size-large`, `--ui-switch-track-height-x-small`, `--ui-switch-track-height-small`, `--ui-switch-track-height`, `--ui-switch-track-height-large`, `--ui-switch-track-width-x-small`, `--ui-switch-track-width-small`, `--ui-switch-track-width` and `--ui-switch-track-width-large`. They are multiplied by `--ui-density`.
- `theme.css` adds overlay tokens, `--ui-backdrop-color` and `--ui-backdrop-blur`, read by `Dialog` and `Drawer`, and inverse surface tokens, `--ui-surface-inverse` and `--ui-on-inverse`.
- `theme.css` adds state and text tokens: `--ui-disabled-opacity`, `--ui-state-hover-alpha`, `--ui-state-hover-alpha-dark`, `--ui-state-active-alpha`, `--ui-state-active-alpha-dark`, `--ui-state-hover-alpha-accent`, `--ui-state-active-alpha-accent`, `--ui-text-disabled`, `--ui-invalid`, `--ui-font-weight-normal`, `--ui-font-weight-medium`, `--ui-font-weight-semibold` and `--ui-font-weight-bold`.
- `theme.css` adds field text tokens: `--ui-field-label-color`, `--ui-field-label-font-size`, `--ui-field-label-font-weight`, `--ui-field-helper-color`, `--ui-field-helper-font-size`, `--ui-field-helper-line-height` and `--ui-field-required-color`, read by `Checkbox`, `Form`, `Radio`, `Range`, `Switch` and `TextField`.
- `theme.css` re-derives every color token (`--ui-primary`, `--ui-surface-*`, `--ui-text-*`, `--ui-border-color`, `--ui-field-border-color` and the named and intent colors, the code block colors and the unchecked switch colors) inside `.ui-palette` from its own palette. A subtree with `class="ui-palette" style="--ui-palette-hue: 30"` is a complete second theme.
- `theme.css` adds `--ui-density`, a multiplier for `--ui-control-size-x-small`, `--ui-control-size-small`, `--ui-control-size` and `--ui-control-size-large`. Defaults to `1`. `Button`, `Select`, `Textarea` and `TextField` padding shrinks to fit a smaller control size, down to the height of the text.
- `Carousel` takes `orientation="vertical"` (`.ui-vertical`) to scroll on the block axis. Set its height with `--_block-size`. Markers sit in a column beside the items.
- `Select` items take `selected`, and `value` preselects options in Astro, Svelte and Vue, and `defaultValue` or `value` in React (an array with `multiple`). Options render `selected` on the server.
- `Carousel` takes `stretch` (`.ui-stretch`), which stretches each item's content, such as a card, to the item's height.
- `Divider` reads a `--ui-divider-space` theme token for the space around it. Cards, callouts, dialogs and drawers set it to `--ui-space-3`.
- `opui-css/astro`, `opui-css/react`, `opui-css/svelte` and `opui-css/vue` export the component `Props` types (`ButtonProps`, `TabsTabProps`, …), `MenuItem` and `SelectItem`.
- `Dialog` and `Drawer` show a subtle scroll shadow under the header and above the actions while the content scrolls (scroll-state container queries).
- `theme.css` adds `--ui-contrast`, set to `more` under `prefers-contrast: more` or with `.ui-contrast-more`. A style query then raises the contrast of muted text, borders, field borders, primary, intent colors and the focus ring, and components with translucent text or fills (`Badge`, `Button`, `ButtonGroup`, `Divider`, `List`, `Menu`, `Progress`, `Spinner`, `Tabs`, `TextField`, `ToggleButton` and `Typography`) follow. `.ui-contrast-more` also works on a subtree, and `.ui-contrast-normal` on `html` ignores the OS preference. The optional theme tokens that carry contrast (`--ui-button-accent`, `--ui-choice-accent`, `--ui-control-border-color`, `--ui-primary-tonal`, `--ui-selected`, `--ui-surface-border-color`, `--ui-track-color` and their pairs) are reset under it, so the library's values win. A theme keeps its own by setting the token again in its own `@container style(--ui-contrast: more)` block. The intent `-text` roles are derived again with stricter lightness limits, and a theme's `--ui-focus-ring-color` gives way to the library's ring.
- `Table` takes `stickyHeader` (`.ui-sticky-header`), which keeps the header rows at the top of the nearest scroll container and shows a shadow once they are stuck (scroll-state container queries). Offset it with `--_sticky-offset`.
- `Button` types require `aria-label` or `children` in React and Svelte, so a button always has a name (types only).
- `Range` takes an `error` prop (`aria-invalid="true"` on the input) for the invalid state, like the other fields.
- `theme.css` adds `--ui-choice-ripple-color` for the `Checkbox` and `Radio` hover halo.
- `CalloutIcon` renders a check icon for `severity="success"`, like `info`, `warning` and `critical`.
- `Radio` takes a `spread` prop (`.ui-spread`), like `Checkbox` and `Switch`.
- `Card` takes `.ui-card-link` on a link to make the whole card clickable. Other links and buttons in the card stay clickable.
- `Checkbox` and `Radio` take `size="x-small"` (`.ui-x-small`), 14px from the new `--ui-choice-size-x-small` token.
- `Switch` takes `size="x-small"` and `size="large"` (`.ui-x-small`, `.ui-large`), from the new `--ui-switch-dot-size-*`, `--ui-switch-track-height-*` and `--ui-switch-track-width-*` x-small and large tokens. The dot inset follows the track and dot size, so custom `--switch-*` values stay centered.
- `Chip` takes `size="x-small"` (`.ui-x-small`), 24px tall from the new `--ui-chip-size-x-small` token.
- `Badge` `corner` takes `"start-end"`, the default corner.
- `Badge` takes `hideLabel`, which renders `label` as visually hidden text (`.ui-sr-only`) inside the indicator, and hides the `indicator` slot from assistive technology. Pass the whole translated text as `label` ("5 unread messages") and the short visible form in the `indicator` slot ("5"), so the component never joins a number and words. A `dot` badge hides its `label` the same way.
- `Avatar` takes a `size` prop (`.ui-x-small`, `.ui-small`, `.ui-large`) that matches the control sizes. Letters and icons scale with it, and large initials are `--ui-font-size-large`.
- `DescriptionList` takes `inline` (`.ui-inline`), which keeps the term and the description side by side at any width.
- `Chip` takes a `severity` prop (`.ui-critical`, `.ui-info`, `.ui-neutral`, `.ui-success`, `.ui-warning`) that tints a tonal chip, and `dot` (`.ui-dot`) for a leading dot in that color. The dot is a diamond for critical, a triangle for warning and a ring for neutral, and stays visible in forced colors mode. On an outlined chip only the dot is colored. The tint, border, text and dot read the `--ui-palette-*` roles, like `Callout`.
- `Divider` takes content in the middle of the line, text or any element, through the default slot (a `<div>` instead of the `<hr>`), or in HTML as a `<div class="ui-divider">` or `<p class="ui-divider">`. `align` (`.ui-align-start`, `.ui-align-end`) moves it to one side, and the lines follow the variant.
- `checkbox.js` exports `syncIndeterminate(input)`, which sets a checkbox's `indeterminate` property from its `data-indeterminate` attribute.
- `Dialog` types `closedby` in every framework.
- `CheckboxInput`, `RadioInput` and `SwitchInput` take `class` in Vue, and the Vue entry exports `DescriptionListDescriptionProps`, `DescriptionListItemProps` and `DescriptionListTermProps`.
- `Chip` takes a `disabled` prop in Astro, React, Svelte and Vue. A button chip gets `disabled`, a link chip `aria-disabled="true"`.
- `Select` and `Range` export `SelectItem` and `RangeOption` from every framework barrel.
- `AvatarGroup` component (`div.ui-avatar-group[role="group"]`) in Astro, React, Svelte and Vue. It takes `class`, attributes such as `aria-label`, and avatars as children, and raises a focused avatar so the next one doesn't cover its focus ring.
- `ListItem` takes `color="critical"` (`li.ui-critical`) for a destructive item in a `Menu`.
- `ToggleGroup` takes a bindable `value`: `bind:value` in Svelte, `v-model` in Vue, and `value`, `defaultValue` and `onValueChange` in React. It is a string with `selection="single"` and an array of strings otherwise, and a `ToggleButton` in the group takes its checked state from it once the group has one. The button's own `checked` or `defaultChecked` is then ignored, and a dev warning says so.
- `Table` has `TableCaption` and `TableFoot` parts for `<caption>` and `<tfoot>`.
- `Checkbox`, `Radio` and `Switch` take an `endText` string in Astro and Vue, like `TextField`.
- `ButtonGroup` and `ToggleGroup` `orientation` takes `"horizontal"`, the default, like `Carousel`.
- `Table` exports a props type for every part from `opui-css/astro`, `opui-css/react`, `opui-css/svelte` and `opui-css/vue`: `TableBodyProps`, `TableCaptionProps`, `TableCellProps`, `TableColumnGroupProps`, `TableFootProps`, `TableHeadProps`, `TableHeaderCellProps` and `TableRowProps`.
- `Badge`, `Button`, `Card`, `Carousel`, `Checkbox`, `Dialog`, `Progress`, `Radio`, `Range`, `Table`, `Tabs`, `TextField`, `Textarea`, `ToggleButton` and `Tooltip` transitions read `--_duration` and `--_ease`, like `Accordion`, `Drawer`, `Menu`, `Select` and `Switch`. The `Carousel` button scale reads `--_scale-duration`, and the `Range` and `Tabs` focus rings `--_focus-ring-duration`.
- `theme.css` has font tokens: `--ui-font-body` for text, fields and buttons, `--ui-font-heading` for `h1`–`h6` and `.ui-h1`–`.ui-h6`, and `--ui-font-code` for `code`, `kbd`, `samp` and `pre` in rich text, `.ui-kbd`, `.ui-samp`, `.ui-var`, code blocks and `kbd` in buttons and lists. `--ui-font-heading` is unset and headings follow `--ui-font-body` per element.
- `theme.css` has a spacing scale, `--ui-space-1` to `--ui-space-8`, multiplied by `--ui-space-scale`. Every gap, padding, offset and small size in the components reads it instead of Open Props `--size-*`, and so do native `fieldset`, `dt` and `figure` and `--ui-divider-space`, so `--ui-space-scale` reaches all of them. Nothing moves at the default scale. Controls keep following `--ui-density`.
- `theme.css` has elevation tokens: `--ui-shadow-elevated` for elevated `Card` and `Accordion`, which switches between `--ui-shadow-elevated-light` (`--shadow-3`) and `--ui-shadow-elevated-dark` (`--shadow-4`) with the color scheme, and `--ui-shadow-overlay` for `Dialog`, `Drawer`, `Menu`, the `Select` picker and the `Carousel` buttons. `--ui-shadow-control` is the shadow of buttons with a variant, a standalone `ToggleButton`, an outlined `Chip` and fields, the file input included (the optional `--ui-shadow-field` overrides it for fields), and `--ui-shadow-surface` the shadow of tonal and outlined `Card` and `Accordion` and of `Callout`, both `none` by default. `--ui-shadow-tab` is the shadow of the selected tab (`--shadow-1`), and `--ui-shadow-scroll` the scroll shadow of `Dialog` and `Drawer` content and of a sticky `Table` header (`--shadow-4`).
- `Card`, `Accordion` and `Callout` read the optional `--ui-surface-border-color` token for the border of tonal and elevated cards and accordions and of callouts without a severity.
- `theme.css` has `--ui-border-color-on-raised` and `--ui-field-border-color-on-raised`, the borders inside tonal and elevated `Card` and `Accordion`, `Dialog`, `Drawer`, `Menu` and `Callout` without a severity, and `--ui-border-color-on-filled`, the border inside lists without a variant and table headers. In light mode the raised ones default to the theme's `--ui-border-color` and `--ui-field-border-color`, so a theme's borders reach inside those surfaces. The example themes set them.
- `Button` reads optional theme tokens: `--ui-button-accent` and `--ui-button-on-accent` for the color of buttons and button groups without `.ui-primary` or `.ui-critical`, `--ui-control-border-color` for the border of outlined buttons and the edge and dividers of outlined button groups, `--ui-control-border-color-filled` for filled and tonal ones, `--ui-button-font-weight`, and `--ui-button-hover-shadow` and `--ui-button-hover-translate` for the shadow and offset on hover. In dark mode their text keeps the accent's lightness at `--ui-text-min-lightness` or more and its chroma within `--ui-text-max-chroma`, like the intent `-text` roles. `--ui-font-size-control` sets the font size of the default `Button`, `Select`, `Tabs`, `TextField`, `Textarea` and `ToggleButton`.
- `Button`, `ButtonGroup`, `Callout`, `.ui-link` and rich text links read `--ui-primary-text` for primary text. It defaults to `--ui-primary` with its lightness kept within `--ui-text-max-lightness` and `--ui-text-min-lightness`, so it keeps 4.5:1 on every surface and every primary text is one color, and themes whose primary is too light or too dark to read set it.
- `layers.css` declares the `theme.palette`, `theme.base` and `theme.custom` sublayers. `theme.custom` is empty, for your own tokens: it beats the defaults in `theme.base` and loses to every component and utility.
- Component pages list their `--_` custom properties under Component properties, as inputs to set or outputs that states derive, and so does each agent skill reference.
- `tokens.json` lists every theme token in the W3C design tokens format: its `$type`, description and default as `$value`, and under `$extensions.opui` its CSS variable, tier (`role` or `component`), dark and more-contrast values (`modes`) and, where a token guarantees one, the contrast ratio it promises and against which tokens. Tokens that are unset by default have no `$value`, only an `example`. The theme tokens page shows the same promises. Import it from `opui-css/tokens.json`. The agent skill ships a copy and a table of which token to change for what.
- `ToggleButton`, `ToggleGroup`, outlined `Chip` and the outlined `Tabs` track read `--ui-control-border-color` for their border, like outlined buttons, so one token outlines every unfilled control. They keep their current border when a theme doesn't set it.
- A checked `ToggleButton`, `Chip` without `.ui-outlined` and the `Carousel` buttons read `--ui-control-border-color-filled` for their border, like filled buttons.
- `Checkbox`, `Radio`, `Switch` and `Range` read the optional `--ui-choice-accent` and `--ui-choice-on-accent` for their checked fill, thumb and mark. When unset, they keep `--ui-primary` with the dark mode lightness cap. m3 and shadcn set them to the plain primary.
- `Switch`, `Progress` and `Range` read the optional `--ui-track-color` for the empty part of their track. When unset, they keep their current colors. shadcn sets it to its field border.
- A checked `ToggleButton`, the selected `ToggleGroup` item, and selected or current `List` items and `Select` options read the optional `--ui-selected` and `--ui-on-selected`. When unset, toggles are filled with `--ui-primary` and List items and Select options get a primary tint. m3 and shadcn set them to their tonal surface.
- `Button` and `ButtonGroup` with `.ui-primary` and `.ui-tonal` read the optional `--ui-primary-tonal` and `--ui-on-primary-tonal`. When unset, they keep the palette tint. m3 sets Material's `primary-container`, shadcn its `secondary`.
- A type scale and type roles. `--ui-font-size-100` to `--ui-font-size-900` are the nine steps (12 to 56px); `--ui-font-size-caption`, `--ui-font-size-small`, `--ui-font-size-body`, `--ui-font-size-control`, `--ui-font-size-large` and the heading sizes read them, and every component reads a role instead of an Open Props step, the `normalize.css` body text and the field helper text (`--ui-field-helper-font-size`, `--ui-field-helper-line-height`) included. `--ui-line-height-tight`, `--ui-line-height`, `--ui-line-height-body` and `--ui-line-height-relaxed` replace the Open Props line heights and the literal ones, and `--ui-letter-spacing-display`, `--ui-letter-spacing-heading` and `--ui-letter-spacing-caps` the literal letter spacings. A theme pins one role, moves one step, or replaces the scale with its own.
- Shape roles. `--ui-radius-round` is the pill radius, `--ui-radius-small` (`--ui-radius` capped at 5px) rounds `kbd`, inline `code`, `mark`, `var`, `Tooltip`, the file input and rounded avatars, `--ui-radius-x-small` (capped at 2px) the checkbox box, and `--ui-border-width-thick` draws the table head and foot rules, the blockquote bar, the `AvatarGroup` ring, the `Badge` border, the neutral `Chip` dot, the dotted `DescriptionList` rule and the `Tabs` indicator. No component reads an Open Props radius or border size any more.
- Palette roles. `--ui-palette-strong`, `--ui-palette-on-strong`, `--ui-palette-text`, `--ui-palette-accent`, `--ui-palette-border`, `--ui-palette-tint`, `--ui-palette-on-tint`, and `--ui-palette-tint-subtle` name the shades of the current palette and are re-derived inside every severity scope, and the text, tint, accent and border shades get stronger with more contrast, so `Callout`, `Badge`, `Button`, `del`, `ins` and `abbr` read a role instead of a palette step. `--ui-on-accent` is the near-white text on saturated fills, `--ui-switch-thumb-color` and `--ui-switch-track-color` the unchecked switch, and `--ui-code-block-bg-color` and `--ui-code-block-text-color` the code blocks. Component CSS reads no palette step or Open Props primitive any more.
- `themes/bootstrap.css` (a Bootstrap 5 look), `themes/brutalist.css` (a neobrutalism look), `themes/m3.css` (a Material 3 look) and `themes/shadcn.css` (a shadcn/ui look) are example themes in the `theme.custom` layer, made only of tokens. They name their fonts but don't load them, and they copy their originals' contrast, also where it falls short of WCAG. They start with the layer order, so they work wherever they load. Import one, or copy it as a starting point.
- `Layout` classes for the space between components: `.ui-l-column` (a column), `.ui-l-row` (a row that wraps), `.ui-l-grid` (columns that fill the width without breakpoints) and `.ui-l-container` (a centered, capped width). Gaps come from the `--ui-space-*` scale, with `.ui-x-small`, `.ui-small` and `.ui-large`. CSS only, in `css/components/layout.css`, in the `utils` layer.
- `Range` has a `--_track-base-color` property for the empty track at rest. The pressed and disabled states override it.
- `theme.css` adds `--ui-selected-strong` and `--ui-on-selected-strong`, the mark of a selected item that has to stand out from the page on its own (3:1): the current `Carousel` marker, the bar on selected `List` rows and the selected tab of filled `Tabs`. They default to `--ui-primary` and `--ui-on-primary`. `--ui-selected` stays the fill behind a selected item.
- `theme.css` adds `--ui-critical-text`, `--ui-info-text`, `--ui-neutral-text`, `--ui-success-text` and `--ui-warning-text`, the intent colors as text with 4.5:1 on every surface, like `--ui-primary-text` and `--ui-invalid-text`. All seven keep the lightness of their color within `--ui-text-max-lightness` (`0.41`, `0.3` with more contrast) in light mode and `--ui-text-min-lightness` (`0.8`, `0.9` with more contrast) in dark mode, where their chroma is capped at `--ui-text-max-chroma` (`0.1`). `theme.css` adds the three limits too. The critical items of a `Menu` and a `.ui-critical` `Button` with no variant or `.ui-outlined` read `--ui-critical-text`. It also adds `--ui-on-warning`, the text on a warning fill, read by the warning `Badge`.
- `theme.css` adds `--ui-underline-offset`, `--ui-underline-offset-small` and `--ui-underline-thickness-hover`, read by `Link`, rich text links and the underlined text elements.
- `List` takes `--_selected-indicator-color`, `--_selected-indicator-size`, `--_start-image-size` and `--_start-video-size`, `Tooltip` takes `--_max-inline-size`, and `Carousel` takes `--_marker-active-padding` and `--_marker-border-color`.
- `theme.css` adds `--ui-fill-max-lightness`, the highest lightness of an intent color filled under light text (`0.48`, and `0.45` with more contrast), read by the critical, info, neutral and success `Badge` and the fills of critical `Button`s. It also adds `--ui-surface-tonal-hover`, the hover fill of clickable `Chip`s without a `severity` and filled `TextField`, `Select` and `Textarea` fields, and `--ui-code-bg-color`, the background of inline `code` in rich text (fainter with more contrast).
- `Accordion`, `Avatar`, `Button`, `ButtonGroup`, `Card`, `Checkbox`, `Chip`, `Divider`, `List`, `Progress`, `Radio`, `Range`, `Select`, `Switch`, `Tabs`, `TextField`, `Textarea`, `ToggleButton` and `ToggleGroup` accept their default by name, which adds no class: `size="medium"` on every sized component, `variant="transparent"` on `Accordion`, `Button` and `ButtonGroup`, `"plain"` on `Card`, `"outlined"` on `Divider` and `Range`, `"filled"` on `List`, and `"tonal"` on `Progress` and `Tabs`. In HTML, a `Drawer` opens from the inline start without `.ui-inline-start`.

### Changed

- `--ui-field-border-color` is a 50% mix of the text color into the page (3:1 or more) instead of `--ui-border-color`, so fields, checkboxes, radios, switches and the range track have a visible boundary without more contrast. Inside filled surfaces it mixes into `--ui-surface-filled` the same way. The example themes keep their own.
- `Progress` outlines its track with `--ui-field-border-color`, so the empty part is visible.
- `Range` with more contrast draws its empty track in the page color with an inset `--ui-field-border-color` edge, so the fill stands out from it.
- `Select` keeps the browser's checkmark at the end of the selected option instead of hiding it.
- A checked `ToggleButton` is filled with `--ui-primary` (or `--ui-selected`) instead of a tint.
- Tonal severity `Callout`s have a visible fill in light mode, 60% of the third palette step instead of 20% of the second.
- `TextField`, `Select` and `Textarea` with `.ui-small` set their text in `--ui-font-size-small`, like small buttons, instead of the default size. Fields under 16px make iOS zoom in on focus.
- `Card` captions, `Tooltip` text and keyboard hints in buttons use `--ui-line-height-tight` (1.25) instead of 1.3 and 1.2.
- Inline `code` in rich text is rounded with `--ui-radius-small` (5px by default) like `kbd` and `mark`, instead of the full `--ui-radius`.
- The file input takes `--ui-shadow-field` like other fields instead of an inset Open Props shadow, so it's flat by default.
- A standalone `ToggleButton` and an outlined `Chip` take `--ui-shadow-control` like buttons (none by default), and toggle corners are capped at half the control height so a round `--ui-button-radius` doesn't clip grouped toggles.
- `Accordion`, `Tabs` and `ToggleButton` focus rings sit at `--ui-focus-ring-inset`, like the other inset rings, instead of their own offsets.
- `ButtonGroup` buttons draw a `ButtonBorder` border under `forced-colors: active`, where their shadows disappear.
- `Dialog` takes `--ui-shadow-overlay`, like `Drawer` and `Menu`, instead of the raised card shadow.
- `Select` group labels take a shade of the picker's surface and `--ui-text-muted` for their text, instead of fixed gray steps.
- The severity scopes (`.ui-critical`, `.ui-info`, `.ui-success`, `.ui-warning`, `del`, `ins`, `abbr`, `dfn`) take their hue from the intent tokens, so a theme's `--ui-success` reaches every success surface.
- The unchecked `Switch` track border is `--ui-field-border-color`, like the checkbox and radio borders, instead of the dot color.
- `normalize.css` sets `box-shadow` instead of `-webkit-box-shadow` on autofilled fields, and font and color inheritance on `::file-selector-button`.
- `ButtonGroup` focus ring sits inside the button with a gap and uses `--ui-focus-ring-color`, so it shows on every variant and isn't clipped by the group.
- `List` start and end icons are smaller: `--ui-icon-size` by default and `--ui-icon-size-small` in dense lists (were `--ui-icon-size-large` and `--ui-icon-size`).
- `Select` chevron flips when the picker opens, with a transition, like the `Accordion` flip marker.
- `Table` centers a checkbox that is alone in a cell and shrinks the column to fit it.
- `Badge` on a round `Avatar` sits on the avatar's edge instead of the corner of its box.
- `Badge` in an `Avatar` group sits on the avatar's start side, the part the next avatar doesn't cover, with the same ring as the avatars (the group's `--_outline-color`).
- `theme.css` `--ui-primary` is `--ui-color-9` in light mode and `--ui-color-6` in dark mode, and `--ui-on-primary` is dark in dark mode, so text on primary and primary text both pass WCAG AA in light and dark.
- `Checkbox`, `Radio` and `Switch` keep a light marker in dark mode on a fill darkened to keep 3:1 contrast.
- `Button` critical keeps light text on a fill that, like its hover and pressed fills, stays within `--ui-fill-max-lightness` (`0.48`), a little darker than `--ui-critical`, while its border keeps `--ui-critical`, tonal primary and critical buttons use dark text on a light container in light mode and light text on a dark container in dark mode, and text and outlined buttons use a lighter accent for text in dark mode.
- `ButtonGroup` and `ToggleGroup` wrap onto more rows when they don't fit, instead of overflowing. The group draws its outer edge and rounded corners, and dividers sit between items in every row.
- `TextField`, `Textarea`, `Select` and `Range` with `spread` split their container into equal label and field columns, so spread fields line up at one width. The fixed `30ch` textarea and `25ch` range minimums are gone.
- `Typography` rich text spacing derives from one flow space (`1.25em` of the body text), and every margin derived from it snaps to `--ui-rhythm-step`. Headings get more space above than below, so they sit closer to the text they introduce, and lists with block content, description lists, `details`, `address`, code blocks and figures follow the same rhythm.
- `Typography` rich text list gutters are measured in `ch`, so two-digit markers fit, and ordered lists widen their gutter for three- and four-digit numbers, also with `start`. Bulleted and numbered list text starts at the same position.
- `Typography` `sup` and `sub` are `0.75em` in rich text and in `.ui-sup` and `.ui-sub`, and no longer change the line height.
- `Typography` rich text figure captions are muted and start-aligned under quotes, code blocks and tables.
- `Typography` heading group subtitle line heights and spacing, in rich text `hgroup` and `.ui-hgroup`, snap to `--ui-rhythm-step`.
- `Typography` headings share one line height, `1em + 0.5rem` rounded to `--ui-rhythm-step`, in rich text and in the `.ui-h1`–`.ui-h6` classes.
- `Accordion`, `ButtonGroup`, `Callout`, `Card`, `Chip`, `DescriptionList`, `List`, `Table`, `ToggleButton` and `ToggleGroup` borders read `--ui-border-width`, and `Checkbox`, `Radio`, `Switch` and `TextField` borders read `--ui-field-border-width`, instead of a hardcoded `1px`.
- `Chip` uses `--ui-radius` (8px) instead of Open Props `--radius-2` (5px).
- `Radio` is `--ui-choice-size` (20px) like `Checkbox`, instead of 18px.
- `ButtonGroup` small buttons are `--ui-button-size-small` (32px) instead of 30px, with the same `--ui-font-size-small` text as a small `Button`.
- `ToggleButton` and `ToggleGroup` text shrinks with the size like `Button`: `--ui-font-size-small` when small and `--ui-font-size-caption` when x-small.
- `Checkbox`, `Radio` and `Switch` line up with the first line of their label and center on it.
- `Chip` small is `--ui-chip-size-small` (28px, the x-small control size) instead of 24px.
- `Textarea` minimum height is three lines plus padding at every size. Small was a fixed 64px.
- `Range`, `Switch` and `TextField` invalid states use `--ui-invalid`.
- `Tooltip` uses `--ui-surface-inverse` and `--ui-on-inverse`.
- `Avatar` and `Badge` text uses `--ui-on-primary`.
- `Drawer` backdrop dims and blurs like `Dialog`, through `--ui-backdrop-color` and `--ui-backdrop-blur`. `.ui-backdrop-transparent` still removes it.
- `Avatar`, `List` and `ButtonGroup` sizes follow `--ui-control-size` and `--ui-button-size-*`.
- `theme.css` declares `--ui-palette-hue-rotate-by`, `--ui-gray-hue` and `--ui-gray-chroma` so every theme knob lives in one file.
- `Card` tonal and elevated variants (and `Dialog`) have a border in the page background color, so they stay visible on tonal surfaces. In dark mode, borders and field borders inside them also use the page background.
- `Dialog` has a maximum height. The header and actions stay in place and the content scrolls.
- `Card` actions stick to the bottom of stretched cards and wrap.
- `Chip` labels truncate with an ellipsis unless the chip is `multiline`.
- `List` dense rows keep the default inline padding, so they line up with `Card` content.
- `Table` dense cells have less block padding.
- `Typography` rich text headings, `pre` and `small` scale with the inherited font size.
- `theme.css` derives `--ui-on-primary` from `--ui-primary` with relative color: near-white text on dark primaries and near-black on light ones, with a hint of the primary's hue. Custom primaries get readable text.
- `Checkbox` and `Radio` root selectors are wrapped in `:where()`, like other components.
- `Checkbox` and `Radio` no longer render an empty `.ui-label` without a default slot, and warn in dev without an accessible name, like `Switch`.
- `Checkbox`, `Radio`, `Switch` and `Progress` align to the middle when there's no visible label, so they center in table cells and lines of text. Give them a hidden label (`hideLabel`, or `.ui-sr-only` in HTML). `Checkbox`, `Radio` and `Switch` then keep a box of at least `--ui-space-5` (24px) around the control, so the label stays a 24px pointer target.
- `TextField`, `Textarea` and `Select` keep a `12ch` minimum width in table cells.
- `Select` and `TextField` auto-suggest arrows share one size and inset, and keep the same space for the arrow, at every size.
- `Select` and `TextField` auto-suggest arrows are a chevron instead of a triangle.
- `List` only styles direct `li`/`option` children (and options in a `[role="group"]`) as rows, so nested lists inside a row stay normal lists. Headings and paragraphs in `.ui-text` have no margin.
- `Divider` that is a direct child of a card has no margin, since the card's gap spaces it.
- `Drawer` content padding is `--ui-space-3`, like its header and footer and `Dialog`. It was `--ui-space-4`, so the title and the body text didn't line up.
- `DialogActions` only renders a class for `align="start"` (`.ui-align-start`). `align="end"` is the default look and no longer adds `.ui-align-end`.
- `Accordion` with `variant="tonal"` or `variant="elevated"` has a border in the page background color unless a theme sets `--ui-surface-border-color`, like tonal and elevated cards, so it stays visible on tonal surfaces.
- `Drawer` header headings take the free space and the header has a gap, so several actions line up at the end. Without a heading, the first icon-only button is pushed to the end.
- `Link` (`.ui-link`) and rich text links darken in light mode and lighten in dark mode on hover and focus, from their own color so they keep the contrast of `--ui-primary-text`, and their underline gets `--ui-underline-thickness-hover` (`3px`) thick. Rich text links in a `List` read `--ui-primary-text` like other links, since it keeps 4.5:1 on the filled background.
- `theme.css` named colors read Open Props' hue tokens instead of fixed angles: `--ui-blue`, `--ui-green`, `--ui-orange` and `--ui-red` follow `--hue-blue`, `--hue-green`, `--hue-orange` and `--hue-red`, like the severity scopes. `--ui-info` and `--ui-blue` use `--hue-blue` (240), the same blue as the `.ui-info` palette. White text on an info `Badge` is 4.58:1.
- `ToggleGroup` is in the `components.extended` layer, like `ButtonGroup`.
- `Callout` links, `Card` links, `Chip`, `Link`, `List`, `Range`, `Table`, `TextField`, the `Checkbox` and `Radio` halo and rich text links only show hover styles on devices that can hover, so they no longer stick after a tap.
- `Spinner` shows on busy buttons and links that have `aria-describedby`. Other elements with `aria-describedby` still opt out, for the progress bar pattern.
- `ButtonGroup` item styles select `.ui-button` instead of `button`, so `Button` links (`<a class="ui-button">`) are styled like the buttons. A plain `<button>` without `.ui-button` no longer gets the group item styles.
- `open-props.css` imports the Open Props files one by one instead of `open-props/src/index.css`, so `dist/op.css` and `dist/opui.css` no longer contain Open Props' `@custom-media` rules. Import `open-props/media` yourself if a PostCSS plugin reads them.
- `Switch`, `Tooltip`, `Textarea`, `Table`, `List`, `Tabs`, `Spinner`, `Dialog`, `Drawer` and the typography styles use logical properties only (`min-inline-size`, `inset-inline-start`, `padding-block`/`padding-inline`, `resize: block` …), so they follow the writing mode, and the `DescriptionList`, `Range`, `Select` and `TextField` container queries read `inline-size`. Horizontal left-to-right rendering is unchanged.
- `Accordion` actions line up with the content and the chevron, with the summary's block padding below them instead of a large gap above.
- `Dialog` width is set with `--_max-inline-size` (`60ch` by default), and the dialog keeps its margin on small screens at any width.
- `FieldGroup` and `ToggleGroup` in Astro pass the group `name` and selection to their inputs through context instead of rewriting the slot HTML, so a bare `<input>`, `<select>` or `<textarea>` in a `FieldGroup` no longer gets the group `name`, like in React, Svelte and Vue.
- `Checkbox`, `Radio` and `Switch` in Vue warn in development when they have no label, `aria-label` or `aria-labelledby`, like Astro.
- `Form`, `FieldSet` and `FieldLegend` type `as` in Vue as `"div" | "form"`, `"div" | "fieldset"` and `"legend" | "p"`.
- `Avatar` no longer declares `command`, `commandfor` and `interestfor` as props. They pass through as attributes.
- `Button`, `Divider` and `Typography` borders read `--ui-border-width` instead of `--border-size-1`.
- `ButtonGroup` sizes and variants are Button's own rules, and icon-only buttons in a group use Button's icon size, the same as buttons with a label.
- `List` checked `option` uses `--ui-state-active-alpha-accent`.
- `ToggleButton` disabled state uses `--ui-disabled-opacity` like `Button`, and `--ui-text-disabled` when unchecked (a checked one keeps its selected text color), its hover uses `--ui-state-hover-alpha`, and `ToggleButton` and `ToggleGroup` read `--ui-button-size*` instead of `--ui-field-size*`.
- `Accordion`, `Drawer` and rich text use `overflow-inline`/`overflow-block` instead of `overflow-x`/`overflow-y`, so scrolling follows the writing mode. Browsers older than Chrome 135, Firefox 69 and Safari 26 ignore them, so those containers don't scroll there, and neither do `Dialog` content and scrollable `ButtonGroup`, `Tabs` and `ToggleGroup`.
- `Range` generates the `<datalist>` id when `options` or the `datalist` slot is used, so `list` is optional.
- `Range` in Vue scopes the `value` slot with the current `value`, so custom readout content follows the thumb.
- `ToggleButton` grows from `--ui-button-size` with its content instead of having a fixed height.
- `Range` thumb, halo and track fill follow `--_accent` on `.ui-range`.
- `Switch` turns its checked track red when invalid, like `Checkbox` and `Radio`, with a `--ui-on-accent` thumb.
- `Typography` `.ui-small` is at least `0.75em` of the surrounding text instead of `0.5em`, like rich text `small`, so it stays in proportion in headings.
- `Typography` rich text `var` uses the monospace font and wraps long names, like `.ui-var`.
- `Button`, `ButtonGroup`, `ToggleButton`, `ToggleGroup` and the fields follow `--ui-radius`, also where it's set on a part of the page, so one token sets the corners of every component. Small radii (`kbd`, `mark`, `var`, `Tooltip`, `Checkbox`, file inputs and rounded `Avatar`) never get rounder than `--ui-radius`.
- `Accordion` with `variant="elevated"` uses `--ui-shadow-elevated`, which is `--shadow-4` in dark mode like the elevated `Card` (was `--shadow-3`).
- `Select` pickers and `Drawer` use `--ui-shadow-overlay` (`--shadow-3`, was `--shadow-2`), like `Menu`.
- `theme.css` is in the `theme.base` layer instead of `theme`, so overrides in `@layer theme` or `@layer theme.custom` beat the defaults wherever they load.
- `Dialog` fades its backdrop in with the panel.
- `Drawer` sits on `--ui-surface-elevated`, like `Dialog` and `Menu`, and borders and field borders inside it read `--ui-border-color-on-raised` and `--ui-field-border-color-on-raised`.
- `Spinner` styles have no specificity (`:where()`), so a page's own `::before` rules override them, like other component roots.
- `List` selected and current rows and options have a bar on their start edge in `--ui-selected-strong`, and a stronger fill than hover (`--ui-state-active-alpha-accent`, the hover tint with more contrast), so they no longer differ from a hovered row by a tint alone. Selected `Select` options read `--ui-primary-text`. Images and videos in `.ui-start` are `3.5rem` and `4rem` instead of `56px` and `64px`.
- `--ui-invalid` is lighter in dark mode with more contrast, so invalid fields, checkboxes, radios, switches and ranges keep a visible edge. `TextField` no longer swaps it for `--ui-invalid-text` itself.
- `Spinner` ring is at least `--ui-border-width-thick` and grows with its size (`0.1875em`, `3px` at `16px`).
- `normalize.css` reads `--ui-line-height-relaxed` for the page line height, `--ui-icon-size-large` for an `svg` without `width` (`1.5rem` instead of `2rem`) and `--ui-space-7` for the scroll margin of `:target`.
- `Chip` hover is stronger in light mode: button and link chips without a `severity` read `--ui-surface-tonal-hover`, the hover of filled fields.

### Fixed

- `Button` `kbd` uses the button's text color, also on hover, instead of 80% of it, so it passes contrast on colored buttons.
- `Typography` rich text inline `code`, `kbd` and `var` no longer make their line taller than the line height.
- `Anchor` with `trigger="hover"` and `Tooltip` stay visible on a scrolled page in Chrome 141. `normalize.css` gives `html` `min-block-size: 100%` instead of `block-size: 100%`, and `body` `min-block-size: 100svb` instead of `100%`, because `position-visibility: anchors-visible` hid every popover whose trigger was below the first screen.
- `Checkbox`, `Radio`, `Switch` and `ToggleButton` style `aria-disabled="true"` on the input like `disabled`: dimmed, a `not-allowed` cursor and no hover tint on toggle buttons. The browser doesn't block the change, so a script has to.
- `ToggleGroup` keeps its control size in forced colors instead of being one border width short, and the selected item no longer shows a gray divider there.
- `Badge` no longer shrinks in flex rows, so an icon with a badge in an `Accordion` summary keeps its size next to long text. A bare `img` or `svg` in the summary keeps its size too.
- `Button` critical text buttons have readable text on tonal surfaces in dark mode.
- `Callout` keeps bare text and inline elements like links on one line instead of stacking them as separate rows.
- `Checkbox` and `Radio` show a red border when invalid and unchecked (`aria-invalid="true"` or `:user-invalid`), like Switch and TextField. Before, only a checked control turned red.
- `FieldSet` no longer overrides the error color of an invalid `Checkbox`, `Radio` or `Switch` end text inside it. Its helper styles only apply to its own end text.
- `Link` text stays readable on tonal and tinted surfaces: darker in light mode, lighter in dark mode.
- `List` separators (`.ui-bordered`, `.ui-border-top`) are visible on tonal lists in dark mode.
- `ToggleGroup` `.ui-vertical` items stretch to the group's width, like `ButtonGroup`, so dividers and the checked background line up.
- `Progress` pulses in place under reduced motion (`--ui-motion: 0`, or `--_motion: 0` on the bar) instead of freezing. Its indeterminate animation was scaled to `0s`.
- `Spinner` slows down to 1.5s per turn under reduced motion (`--ui-motion: 0`) instead of ignoring it.
- `Switch` icons shrink to fit beside the dot when the track is too narrow for both, instead of overlapping the dot.
- `package.json` `exports` resolve documented source imports with a `.css` extension (`opui-css/css/imports.css`, `opui-css/core/normalize.css`, `opui-css/css/components/button.css`, …) Previously they resolved to `*.css.css`.
- `Tooltip` transitions now respect `--ui-motion` (`prefers-reduced-motion`, `.ui-motion-off`).
- `Dialog` backdrop is themeable via `--_backdrop-bg-color` and `--_backdrop-blur` (same as `Drawer`).
- `Dialog` scroll-lock matches `.ui-scroll-lock` and no longer shifts the layout when the scrollbar disappears.
- `Button` and `ButtonGroup` style `[aria-disabled="true"]` the same as `[disabled]`, e.g. for `<a class="ui-button" aria-disabled="true">` or focusable disabled buttons.
- `ButtonGroup` only styles its direct child buttons, so a `Menu` inside it (split button) keeps its own item styles.
- `Button` and `ButtonGroup` hover styles only apply on devices that support hover, so they no longer stick after a tap.
- `ButtonGroup` dividers are no longer double thick.
- `opui-css/open-props.css` resolves through `exports`.
- `components/AGENTS.md`, the internal guide, no longer ships in the package.
- `dist` source maps no longer embed the sources (`sourcesContent`) or `node_modules/.pnpm` paths. Open Props sources point to `../../open-props/`, and `opui.components.css.map` accounts for the `@layer` order line.
- `package.json` peer dependency ranges are `astro` `^7`, `svelte` `^5.29` and `vue` `^3.5` instead of the versions used for development.
- `FieldGroup` `name` only applies to its own fields in Astro and Vue.
- `Tabs` and `ToggleGroup` context only applies to their own children in Astro.
- `Typography` rich text removes the top margin of the first child and the bottom margin of the last child in a component's `.ui-content`.
- `Typography` rich text lists after a heading or `hr` no longer get a top margin, and nested lists get their smaller margins.
- `Typography` rich text no longer overflows grid and flex parents with long words, URLs or code lines, and list items, figure content and table cells no longer push it wider than its container on narrow viewports.
- `Typography` rich text inline `code` styles no longer apply to `code` inside `pre`.
- `Typography` rich text `ol[type]` keeps its marker type, and consecutive `dt` elements are no longer spaced apart.
- `Typography` rich text no longer styles an `a` without `href` as a link.
- `Typography` rich text `code` inside a link gets a darker background in dark mode, so the link color keeps its contrast.
- `theme.css` gives `.ui-light` and `.ui-dark` on an element other than `html` the page surface and text color. `--ui-color-scheme` follows the OS preference, so `Card` elevated shadows are correct in dark mode without a class.
- `core/palette.css` lets `.ui-palette` and the severity scopes inherit `--ui-palette-hue`, `--ui-palette-chroma`, `--ui-palette-hue-rotate-by`, `--ui-gray-hue` and `--ui-gray-chroma` from their ancestors. It used to reset them to the defaults in every scope.
- `TextField`, `Textarea` and `Select` with `spread` (`.ui-spread`) collapse to a column when narrower than 400px. Previously the field was squeezed next to the label.
- `Select` with `spread` centers its arrow on the field.
- `TextField` and `Select` small fields are `--ui-field-size-small` (32px) high, like a small `Button`. They were 38px.
- `TextField`, `Textarea` and `Select` x-small and small fields keep the default `--ui-font-size-control` text on touch screens, so iOS Safari no longer zooms in when one is focused.
- `TextField` date, time, week and month inputs no longer grow taller than the field, so small ones are 32px and time inputs are no longer 41px.
- `TextField` file inputs are `--ui-field-size` high. They were 2px taller.
- `ToggleGroup` is as high as a `ToggleButton` of the same size. The group border made it 2px taller.
- `TextField`, `Textarea` and `Select` keep their field height when a grid or flex parent stretches them, e.g. next to a field with end text. The extra space went into the field.
- `TextField` prefix and suffix icons are capped at `--ui-icon-size`, so a large icon no longer makes the field taller.
- `TextField` autosuggest arrow sits at the inline end in RTL. It overlapped the text.
- `ToggleButton` only grows inside a `ToggleGroup`. On its own in a flex container it stretched to fill the row.
- `Range` with `spread` (`.ui-spread`) collapses to a column when narrower than 400px, like `TextField`. The container query had no container, so it never applied, and the slider's minimum width could push its parent wider.
- `TextField` and `Select` without a label are as high as their field. The empty label row added 4px above it.
- `TextField` prefix and suffix use the field line height, so they no longer make the field taller on pages with a large line height.
- `Radio` large (`.ui-large`) uses `--ui-choice-size-large`. It was the same size as the default.
- `Select` keeps its arrow and its space at the inline end in RTL. The arrow covered the text.
- `Select` keeps its padding and the height of the other fields in browsers that keep the `<button>` inside the `<select>` but have no customizable select, like Firefox, and wherever React, Svelte or Vue render it in the browser. The button turned the padding off there.
- `Badge` severity colors use their own text color instead of `--ui-on-primary`, and warning badges use `--ui-on-warning`, dark text on the warning fill.
- `Checkbox`, `Radio`, `Switch`, `Range`, `TextField`, `Textarea` and `Select` validation messages and invalid labels use `--ui-invalid-text`, which is darker in light mode and lighter in dark mode. They failed contrast on dark and tinted surfaces.
- `Badge` and `Tabs` respect `--ui-motion` and `prefers-reduced-motion`.
- `dist/opui.components.css` starts with the `@layer` order statement.
- `normalize.css` gives autofilled fields `--ui-surface-default` instead of the undefined `--well-1`.
- `Drawer` is hidden (`display: none`) when closed, so it is no longer keyboard focusable.
- `Tooltip` shifts along the viewport edge instead of squeezing, with or without an arrow, and shows when its trigger is more than one viewport down the page.
- `Badge` indicators mirror in RTL.
- `Callout` only uses the icon layout for a direct child `svg`, keeps its content at the top when stretched, and no longer shows lighter corners.
- `Card` wraps long words.
- `DescriptionList` switches layout based on its own width instead of the page, shares space between long terms and values, and wraps long values. A nested list sizes to its content and follows the outer list's layout, and `.ui-bordered` leaders only apply to the list's own items.
- `Table` padding no longer grows in narrow containers.
- `List` text can shrink below its longest word, and `.ui-inset` follows the dense gap.
- `Avatar` doesn't shrink in flex rows.
- `Avatar` groups overlap from the start, so the group's box ends at its last avatar.
- `Button` disabled text color applies to text and outlined buttons in every color. Filled and tonal buttons keep their own text color and dim with the disabled opacity, so the label stays readable on the fill.
- `Typography` `.ui-mark` has a background, `.ui-del`/`.ui-ins` use the critical/success palette, and `del`/`ins` text passes contrast in light and dark mode.
- `Typography` rich text `pre` and inline `code` run left to right in RTL.
- `Range` in Vue shows the default value without `value` or `v-model`, and `v-model` returns a number.
- `Range` and `ToggleButton` in Vue take the `FieldGroup` name.
- `Range` invalid state colors the thumb and its halo too, except on a disabled range.
- `Checkbox` forced-colors styles apply to checked and indeterminate boxes.
- `Callout` rich text inside `.ui-content` no longer gets doubled margins.
- `List` and `Table` borders on filled lists and table headers are visible in light mode.
- `ListItem` with `href` and no `as` renders a link in Astro and Vue.
- `FieldSet`, `FieldLegend`, `FieldDescription`, `FieldGroup` and `Form` in Vue no longer apply attributes and listeners twice.
- `Avatar` in Vue accepts arrays and objects for `class`, and the image always has an `alt` attribute.
- `Anchor` and `Badge` render a user `id` on the root. With `trigger="hover"` it stays the floating element's id.
- `Tooltip` arrow points at the trigger for every position, after flips and shifts.
- `Anchor`, `Badge`, `Divider`, `Drawer`, `TableColumn`, `Tabs`, `ToggleButton` and `ToggleGroup` in Vue update derived values when props change.
- `Accordion`, `Avatar`, `Divider`, `List`, `Progress`, `Range`, `Select`, `Switch`, `Tabs`, `Textarea`, `TextField` and `ToggleButton` keep their state visible in forced colors mode: selected tabs, toggles and list items use `SelectedItem`, switches, ranges, progress bars and dividers are drawn with system colors, focused fields get a `Highlight` outline, elevated and tonal accordions get a `CanvasText` border, and letter avatars an outline.
- `Table` uses `overflow: clip` instead of `overflow: hidden`, so it is no longer a scroll container and sticky cells inside it stick.
- `Range` fills the track in Chromium and Safari without JavaScript, also in plain HTML, with a scroll-driven animation. The hover ring is no longer clipped at min or max.
- `Badge` dots sit in every corner, not only the default one.
- `Badge` and `Anchor` no longer write the unused `--_anchor-inset`, and aligned badges no longer write `--ui-anchor-position-area`.
- `DialogActions` `align="start"` aligns the actions to the start.
- `FieldGroup` `orientation="vertical"` stacks a group of only buttons.
- `ToggleButton` in Vue is a radio in a single-selection `ToggleGroup`, like Astro, even with a `type`.
- `ToggleGroup` separators show in forced colors.
- `Accordion` focus ring is drawn inside the summary of `.ui-elevated`, `.ui-outlined`, `.ui-tonal` and grouped accordions, so the card no longer clips it, and outside the summary of an accordion without a variant, so it no longer cuts through the text and marker.
- `Select`, `Textarea` and `TextField` draw the focus ring around the field, like `Button`, only when the control itself has focus, not a link in the header or footer. The border keeps its color while the ring shows.
- `Switch` focus ring is rounded.
- `Button`, `ButtonGroup`, `Card`, `Range`, `Select`, `Tabs`, `Textarea`, `TextField` and `ToggleButton` focus rings grow in like the rest of the library. `normalize.css` animates the `:focus-visible` ring with the `ui-focus-ring` keyframes instead of an `outline-offset` transition, which a component's own `transition` overrode.
- `ButtonGroup` vertical only squares icon-only buttons.
- `Callout` icons take the severity color with `color`, so fill icons no longer get a colored outline.
- `Checkbox` and `Radio` required asterisks in stacked labels sit after the label in RTL.
- `Typography` `.ui-p.ui-small` is `--ui-font-size-small` (14px) instead of 12px.
- `Typography` `.ui-abbr` and `.ui-dfn` underlines use the info color, like `abbr` and `dfn`.
- `Typography` overline and heading group overline text, `code` in dark mode, `code` in `del`/`ins`, linked `code` in light mode and links in `mark` pass contrast.
- `List` keyboard shortcuts in `.ui-end` pass contrast.
- `DescriptionList`, `List` row links, `Card` (and `Dialog`) heading groups, `FieldDescription`, and `Button` and `List` `kbd` no longer pick up rich text padding, margins, font weight or font.
- `Dialog` only locks page scroll for modal dialogs (`showModal()`).
- `Select` only opts selects inside `.ui-select` into `appearance: base-select`.
- `env.d.ts` is in the package `exports`, so `/// <reference types="opui-css/env.d.ts" />` resolves.
- `Badge` critical, info, neutral and success fills cap their lightness at `--ui-fill-max-lightness` (`0.48`), so white text passes 4.5:1 (success was 4.44:1).
- `Checkbox` and `Radio` show their hover and press halo without `core/utils.css`, so `dist/opui.components.css` and single-file imports get it too.
- `Radio` sizes work on touch screens. Small and large radios were forced to `--size-4`, and the label sat off center.
- `Switch` draws its invalid ring as a `box-shadow`, so the focus ring shows outside it. In forced colors an invalid switch no longer looks focused.
- `ButtonGroup` vertical `small` items are as tall as their size.
- `theme.css` sets `--shadow-color` and `--shadow-strength` for dark mode (`.ui-dark` and the OS preference), so `--shadow-1` to `--shadow-6` show on dark surfaces. They used the light values before.
- `Radio` dot is centered at every size. It was half a pixel off at small, default and large.
- `Chip` with a start and an end icon gets the smaller padding on both sides, and an icon inside `.ui-text` no longer changes the padding.
- `Chip` disabled text color applies to tonal and outlined chips.
- `Checkbox` `initCheckbox()` adds its `astro:after-swap` listener once, however often it is called.
- `Drawer` with `.ui-backdrop-transparent` (`backdrop="transparent"`) no longer dims the page behind it. It only removed the blur before.
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
- `Radio` dot stays centered at every zoom level and screen scale. It's a `radial-gradient()` on the input's background instead of a separate `::after` box.
- `Range` with `spread`, a value and tick marks no longer draws the value over the tick labels, and the end text of a narrow spread range no longer overlaps the slider or the tick labels.
- `Range` tick labels line up with the thumb at both ends.
- `ToggleButton` keeps its selected tint on hover, also in a `ToggleGroup`, and a disabled selected button no longer changes on hover.
- `List` text inherits the item's font weight, so `font-weight` on an `li` makes the whole row bold, e.g. for unread items.
- `List` only caps the start column at the icon size when it holds an `svg` directly, so an `Avatar` with an icon keeps its size.
- `Table` row headers (`<th scope="row">`, or a `th` next to `td` cells in `tbody`) keep the body background instead of the header fill.
- `Checkbox`, `Radio` and `Switch` required asterisks, and the `FieldSet` legend's, follow the last word of a wrapped label instead of jumping to the end of the row.
- `Range` updates its value `<output>` after its form is reset.
- `TableColumn` in Astro keeps `width` when `style` is an object.
- `Checkbox`, `Radio`, `Switch`, `TextField`, `Textarea`, `Select` and `Range` pass a user `aria-invalid` to the control when `error` isn't set.
- `Select` and `Range` merge a user `aria-describedby` with the end text id instead of overwriting it.
- `FieldGroup` in Vue passes a `name` that changes or comes from an outer group to its inputs.
- `TabsItem` in Vue follows `id` and `tabId` changes.
- `Tabs`, `TabsItem`, `ToggleGroup`, `Select`, `Range`, `Checkbox`, `Radio` and `Switch` in Vue render the same generated id prefixes as the other frameworks.
- `Tabs` in Astro names a `TabsItem` outside a `Tabs` and links its `TabsTab`, like React and Svelte.
- `Chip` in Astro only renders `href` when the chip is an `a`.
- `DescriptionListDescription`, `DescriptionListItem` and `DescriptionListTerm` in Vue no longer accept the list's `bordered` prop.
- `Card` actions keep the edge padding for a text button with extra classes.
- `List` sizes switches, checkboxes and radios through the public tokens, so switch sizes round to whole pixels in lists, and a size class on the control wins over the list's size.
- `TextField` and `Textarea` with `autoFit` (`.ui-auto-fit`) shrink to their content in a block container or a field group, up to the container's width, and long helper text wraps at the field's width. They filled the container.
- `opui-css/css/js/checkbox.js` resolves through `exports`. It resolved to `checkbox.js.css`.
- `Accordion` group styles only apply to a `Card` with `role="group"` whose accordions are direct children, so a card with an accordion inside its `CardContent` keeps its layout and padding.
- `Accordion` (elevated and tonal) and the default `Callout` remap `--ui-border-color` and `--ui-field-border-color` like raised cards, so dividers and field borders inside them stay visible in dark mode.
- `Avatar`, `Button` and `Chip` share one helper for `disabled`, `aria-disabled`, `href` and `type`, so they render those attributes the same way in every framework.
- `Badge` with `invisible` hides the indicator from screen readers too.
- `Button`, `Chip`, `Checkbox` and `Radio` show no hover or active state inside a disabled fieldset.
- `Card`, `ToggleButton`, `Checkbox`, `Radio`, `Switch` and the busy spinner read the local `--_motion`, so `style="--_motion: 0"` turns off their focus ring animation, hover halo and spin speed-up like other components.
- `Checkbox` unchecked border reads `--ui-field-border-color` like Radio and the text fields.
- `Checkbox`, `Radio` and `Switch` no longer need Vite's `import.meta.env` types or runtime for their dev-only missing name warning.
- `Select` (Vue) keeps the browser's selection without `v-model`.
- `Dialog` actions only tighten the end padding when the last button is a text button, keeping room for its focus ring like `Card`, and start-aligned actions use Card's padding, so filled buttons line up with the content.
- `Dialog` and `Drawer` only style their own direct parts, so a Callout, Card or TextField inside them keeps its own padding and alignment.
- `List` `.ui-dense` tightens the separators of `.ui-bordered` lists too, not only `.ui-border-top`.
- `ListItem` `inset` no longer indents the label of a Chip or Button placed in `.ui-end`.
- `ListItem` with `type` renders the default slot inside `.ui-text` (or before `.ui-end` when there's no text), like it does without `type`.
- `ListItem` with `as="button" disabled` (or `aria-disabled="true"` on a link) looks disabled in a plain `List` too: dimmed, `not-allowed` cursor, no hover tint.
- `Radio` in Vue follows a passed `checked` without `v-model`.
- `Range` (Astro) updates its value output after `<ClientRouter>` navigation, leaves `value` slot content and ranges it didn't render alone, and wires each output once.
- `Select` adds its header, start text (`.ui-start-text`), end text and footer to `aria-describedby`, in that order.
- `Select` `--_motion: 0` on the root also stops the picker and chevron animations.
- `Select` and `Range` in Astro merge a passed `aria-labelledby` instead of rendering the attribute twice.
- `TextField`, `Textarea` and `Select` (Vue) can be edited when given a `value` without `v-model`.
- `Tooltip` aligned to a span switches inline sides before it jumps to the other block side.
- `Typography` links in rich text use the same text-safe primary as `.ui-link`.
- `env.d.ts` types `interestfor` on `<a>` and `<button>` for Astro.
- `checkbox.js` ships type declarations.
- `Checkbox`, `Radio`, `Switch`, `TextField` and `Textarea` no longer point `aria-describedby` at the end text, so screen readers don't read it twice. The wrapping `<label>` already makes it part of the name.
- `Anchor` and `Tooltip` inside a `Badge` no longer shift their floating element by the badge's offset.
- `TextField`, `Textarea` and `Select` required asterisks are spaced like the `Checkbox`, `Radio`, `Switch` and `FieldSet` ones (`0.25ex`).
- `Switch` gets the pointer cursor, `--ui-line-height` line height and `user-select: none` of `Checkbox` and `Radio`.
- `Range` thumb stays centered on the track when `--_thumb-size` or `--_track-height` changes, also on touch screens.
- `Button` without a variant shows its pressed background while held with the keyboard, like outlined, tonal and filled buttons.
- `Checkbox` and `Radio` no longer set `--ui-primary` when invalid, so links and other content in their label keep the primary color.
- `Callout` links use `--ui-primary-text` on hover and focus. They fell below 4.5:1 on the tonal background.
- `button.css` gives file inputs outside a `TextField` readable text (`--ui-text-muted`) and the field border tokens. The text used the inverse surface color.
- `Range` in a disabled `fieldset` gets the disabled thumb and no hover ring, like a disabled range.
- `Range` disabled thumb is opaque, so the track no longer shows through it.
- `Accordion` summaries with a marker let their items shrink and cut off with an ellipsis, so a badge, a chip or a long word no longer pushes the marker out.
- `Range` value lines up with the label's baseline.
- `Range` with a value readout points its root `<label>` at the input, so the label names the slider instead of the `<output>`.
- `Range` declares `--_track-height` and `--_track-radius` on the root, so setting them on the component works.
- `normalize.css` body text reads `--ui-font-weight-normal` and headings `--ui-font-weight-bold`, so a theme's weights reach bare text and headings.
- `Callout` severity icons use a lighter palette step in dark mode, so they reach 3:1 against the callout.
- `Checkbox`, `Radio`, `Switch`, `TextField`, `Textarea`, `Select` and `FieldSet` required asterisks are left out of the accessible name, so screen readers don't read "star".
- `Spinner` no longer sets `position: relative` on dialogs and popovers, so a busy `Drawer` stays in place.
- `Table` no longer clips the focus ring of controls in its first and last rows.
- `Tabs` directly in a `Card` draw the focus ring inside, so the card doesn't clip it.
- `Card` actions keep room for the focus ring of a text button at their start or end.
- `Card` content followed by a divider has no bottom padding, so the divider sits evenly between the two contents.
- `Avatar` button and link avatars dim and show the not-allowed cursor when disabled.
- `ButtonGroup` focus rings stay off the label when a theme or more contrast widens the ring.
- `List` without a variant sets the field border to its own border, so checkbox and radio rings show on the filled row.
- `Table` row headers keep the border color of the body cells next to them.
- `TextField` and `Select` with `spread` keep the start text under the label when the field has a header or footer.
- `Switch` checked icon uses the dot's contrast color, so it shows on the accent track.
- `Typography` inline `code` in `del` and `ins` has no inline padding, so no gap shows before the next character.
- `Checkbox`, `Radio`, `Range`, `Select`, `Switch`, `TextField` and `Textarea` in Vue render a text prop and its slot together, like Astro, instead of dropping the prop.
- `Accordion` actions keep room for the focus ring, so the last button's ring isn't clipped in a group without a variant.
- `Checkbox` draws a disabled box in `GrayText` in forced colors mode, like `Switch`, instead of the enabled colors at reduced opacity.
- `Checkbox` and `Radio` draw the check, dash and dot of a checked invalid control in `--ui-on-accent`, so they keep their contrast on the red fill when a theme sets `--ui-choice-on-accent` or `--ui-on-primary`.
- `DescriptionList` no longer clips the focus ring of a link or button in a term.
- `Form` only resets the margin of dividers that are its direct children, text dividers included, so dividers nested deeper keep `--ui-divider-space`.
- `List` `.ui-end` passes clicks to a `label`, `select`, `summary`, `textarea` or `[tabindex]` element inside it, not only to links, buttons and inputs.
- `List` rows no longer force every element inside them to the row's font size, so a `Chip`, `Badge` or `Button` in `.ui-start` or `.ui-end` keeps its own size.
- `Progress` in Astro types `max` and `value` like React and Svelte, instead of intersecting them with the native `progress` attributes.
- `Range` with `variant="filled"` or `variant="tonal"` darkens its track on press and takes the disabled track color.
- `Range` hides its tick mark `<datalist>` from assistive technology with `aria-hidden="true"`, so it isn't exposed as an unnamed listbox next to the slider.
- `Table` without a `thead` rounds its top corners when the first row starts with a row header `th`.
- `TextField`, `Select` and `Textarea` look disabled when a disabled `fieldset` disables the control or it has `aria-disabled="true"`, and a disabled `option` no longer makes a `Select` look disabled. Read-only and `aria-disabled` fields get no hover styles.
- `Typography` `abbr` and `dfn` with a `title` get the same underline offset as without one.
- `Typography` linked `code` in rich text has no inline padding where its background is transparent, so the underline doesn't run past the text.
- `Callout` with `variant="tonal"` no longer renders `.ui-tonal`, a class without a rule.
- `Callout` icon offset scales with the font size.
- `Spinner` keeps the gap in its ring in forced colors, so the spin stays visible.
- `Range` keeps the edge of its empty track in Firefox with more contrast.
- `core/palette.css` no longer declares palette and gray knobs of its own, which disagreed with `theme.css` and never applied. `theme.css` is the one place they are set.
- `Dialog` and `Drawer` open without a focus ring around them. Safari focuses the `dialog` itself when nothing inside it is in the Tab order, and `normalize.css` drew its focus ring there. The ring stays on the controls inside, and the rule no longer needs `!important`.
- `TextField` and `Select` keep the control height of buttons in Firefox and Safari. Single-line inputs and selects get a definite height, `1lh` plus their padding, so the engine's own input height and padding rounding no longer make the field up to 2px taller.
- `Anchor` and `Tooltip` default to `self-` `position-area` keywords (`self-start self-end` and `self-block-start`), so floating content follows its own writing direction and mirrors in a right-to-left part of a left-to-right page. Before, it followed the page's direction while its margins followed its own.
- `Typography` `.ui-small` on a `span` or `p` sits below the component layers, so a small `Chip` rendered as a `span` keeps its own font size.

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
