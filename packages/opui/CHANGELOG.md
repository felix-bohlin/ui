# Changelog

## 6.0.0 - Unreleased

The first major release since 5.0. The highlights for someone on 5.4.3:

- **Frameworks**: React 19 (`opui-css/react`) and Svelte 5 (`opui-css/svelte`) components next to Astro and Vue, rendering the same markup. `opui-css/vue` ships compiled modules.
- **New components**: `AvatarGroup`, `Carousel`, `Copy`, `Menu`, `Message`, `NumberField`, `OneTimeCode`, `Rating`, `SelectAll`, `SortableTable`, `Stat`, `Stepper`, `Timeline` and `Toaster`, which replaces `Toast`, and the `Layout` classes.
- **Themes and tokens**: five example themes in `themes/` (`bootstrap`, `brutalist`, `govuk`, `m3` and `shadcn`), `tokens.json` in the W3C design tokens format, and token scales for spacing, type, shape, elevation and motion. `.ui-palette` and `.ui-contrast-more` derive every token again from the knobs they set or inherit, and more contrast tightens those knobs instead of setting colors.
- **Breaking**: every theme token takes the `--ui-` prefix and one naming model, and most component props and private `--_` properties follow one naming model too. `Accordion`, `Callout`, `Card`, `Dialog` and `Drawer` take parts instead of slots, invalid controls take `aria-invalid="true"` instead of `data-invalid`, the palette is blue in both color schemes and the focus ring is black or white instead of the primary color. `ClassicSelect`, `IconButton` and `Toast` are removed.
- **Package**: custom elements in `opui-css/elements/`, browser fallbacks in `compat.css`, an agent skill (`npx opui-css skill`), Figma files for the default theme, `open-props` as an optional peer dependency, and Node 26.10 or later.

The steps per component are in [MIGRATING.md](./MIGRATING.md).

### Breaking

- `Accordion` markers are the `svg` with `.ui-marker`. Add `.ui-marker` to the chevron to keep it rotating. Other icons in the `summary` stay put.
- `Accordion` renders a chevron marker by default in Astro and Vue, hidden from screen readers with `aria-hidden="true"`. The `marker` slot on `AccordionSummary` replaces it, so move a custom chevron there and give it `.ui-marker`, or it shows twice. An empty `marker` slot shows the native arrow.
- `Accordion` and `Dialog` no longer render `.ui-card`, and `Badge` and `Tooltip` no longer render `.ui-anchor`. `card.css` and `anchor.css` style `.ui-accordion`, `.ui-dialog` and `.ui-tooltip` themselves, and `badge.css` positions `.ui-badge` without `anchor.css`, so HTML takes one root class. CSS that reached these components through `.ui-card` or `.ui-anchor` needs their own class.
- `Accordion`, `Anchor`, `Avatar`, `Badge`, `Button`, `Callout`, `Card`, `Checkbox`, `Chip`, `ControlGroup`, `Drawer`, `List`, `Progress`, `Radio`, `Range`, `Select`, `Switch`, `Table`, `TextField`, `Textarea`, `ToggleButton`, `ToggleGroup` and `Tooltip` private custom properties follow one scheme: `--_accent`, `--_text-color`, `--_bg-color`, `--_duration`/`--_ease`, `--_size` and `--_radius`. A color says what it paints (`-bg-color`, `-text-color`, `-border-color`), `--_size` is the one name for a control's size (`--_min-height`, `--_height` and `--_input-size` are gone) and a part's size takes the part's name (`--_indicator-size` on `Badge`), other sizes are logical (`--_track-block-size`, not `--_track-height`), names aren't abbreviated (`--_shift-x`, not `--_anchor-tx`), a variant's states take the variant's name (`--_transparent-hover-bg-color` and `--_transparent-active-bg-color` on `Button`, not `--_default-hover-bg-color` and `--_default-active-bg-color`), and the halo around a thumb is a ripple, like `--_ripple-size` on `Checkbox` (`--_thumb-ripple-size` on `Range`, not `--_thumb-highlight-size`). MIGRATING lists every rename.
- `Accordion` in Astro and Vue no longer renders `role="region"` and `aria-labelledby` on the content or `aria-controls` on the `summary`. `details` and `summary` expose the disclosure on their own, so add the attributes yourself only where the content should be a named region.
- `Accordion` in Astro and Vue takes parts instead of slots: `AccordionSummary`, `AccordionContent` and `AccordionActions`. The root no longer wraps its children in `.ui-content`, and the `marker` slot moves to `AccordionSummary`.
- `Accordion` `variant="default"` is gone. An accordion without a variant is `plain`, the page surface with padding and no border, like a `Card`, and a group card without a variant pads its accordions too. Use `variant="transparent"` (`.ui-transparent`) for the previous look, with no surface or padding.
- `Anchor` with `trigger="hover"` and `Tooltip` no longer wrap their trigger in a `<span interestfor>`. Add `interestfor` with the anchor's `id` to the trigger element. `trigger` only takes `"hover"`: leave it out instead of `trigger="always"`.
- `Anchor`, `Badge` and `Tooltip` floating content is `.ui-floating` instead of `.ui-anchor-floating`.
- `Anchor` and `Tooltip` `alignment` is `positionArea`, named after the CSS `position-area` value it takes, and `.ui-with-arrow` on a tooltip is `.ui-arrow`, like the `arrow` prop.
- `Anchor` in Astro and Vue takes `AnchorContent` instead of the `anchored` slot. Without it, no floating element renders.
- `Anchor` requires `id` with `trigger="hover"` and no longer generates one. Pass the same `id` to `interestfor` on the trigger.
- `Avatar` requires `alt` when `src` is set (types). `alt=""` is still allowed for decorative images.
- `Avatar` `variant` is `shape` (`"circle"`, `"rounded"`, `"squared"`, `"squircle"`), with `circle` as the default. The classes are unchanged.
- `Avatar`, `Button` and `Chip` types match the rendered element: a button `Avatar` or `Chip` needs `as="button"`, a link `Chip` needs `href`, `disabled` only goes with a button or a link, and `Button` takes link attributes only with `href` (types).
- `Avatar` no longer takes `isGroup`. Wrap avatars in `AvatarGroup`, which renders `div.ui-avatar-group` with `role="group"` and overlaps the avatars by `--ui-space-2` (8px) instead of 16px.
- `Badge` `alignment` is `corner`, since it picks a corner of the child. The classes are unchanged.
- `Badge` `label` is a `string` (types), and `dot` and `hideLabel` require it. Pass a number as a string.
- `Badge` indicator is `.ui-indicator` instead of `.ui-badge-indicator`.
- `Button` no longer takes `.ui-icon-only`. A button whose only child is an `svg` is square, at every size and inside `ControlGroup`, so remove the class.
- `Button` in Astro and Vue no longer adds `.ui-disabled` to a disabled `<button>`. It sets `disabled`, and `aria-disabled="true"` on links. Target `:disabled` or `[aria-disabled="true"]` instead of `.ui-disabled`.
- `Button` icon styles only apply to a direct child `svg` (`> svg`), sized with `--_icon-size`. An `svg` nested in another element is no longer sized, so move it out of its wrapper. Padding scales with `--_padding-inline` (`1ex` x-small, `1.25ex` small, `1.5ex` default, `2.5ex` large; was `0.5ex`, `0.75ex`, `1.5ex` and `4ex`), and the icon side gets tighter padding when a direct child `svg` sits next to a wrapped label (`<span class="ui-text">`). Wrap the label when the button has an icon: text next to an `svg` without a wrapper renders as icon-only.
- `Button`, and `Chip` and `Avatar` with `as="button"`, render `type="button"` by default in Astro and Vue, so they no longer submit forms. Pass `type="submit"` for submit buttons.
- `Button` and `Chip` links with `disabled` (`aria-disabled="true"`) no longer render `href`, so they can't be focused or followed. They render `role="link"` instead, so a screen reader still hears a disabled link and its `aria-label`. The CSS doesn't block clicks on them, so remove `href` from them in HTML.
- `ButtonGroup` is `ControlGroup` (`components/ControlGroup/ControlGroup.*`), `.ui-button-group` is `.ui-control-group`, and `button-group.css` is `control-group.css`. The buttons keep their own borders and the group joins their edges, so it joins a `TextField`, `Select`, `NumberField` or `Textarea` too. Variants apply to the whole group: a variant class on a single button inside a group is no longer supported. The group no longer overflows its container: it wraps onto more rows, and `overflow` keeps it on one row instead. The root no longer needs `role="group"` to be styled, though the components still render it, and a passed `role` replaces it in every framework.
- `Callout` in Astro and Vue no longer renders `role="note"`, so screen readers announce the `<article>` it is. Add `role="note"` to the root to keep the old announcement.
- `Callout` in Astro and Vue takes parts instead of slots: `CalloutIcon` renders the severity icon and `CalloutContent` the content. The root no longer renders an icon or wraps its children in `.ui-content`. The `title` slot (a fixed `h3`) is gone: write the title as a plain heading of any level first in `CalloutContent`. A custom icon is an `svg` placed first in `Callout`.
- `Card` `variant="text"` is `variant="transparent"` (`.ui-transparent` instead of `.ui-text`), so `.ui-text` only names the text part of a component. The default card is named `plain`.
- `Card` in Astro and Vue takes parts instead of slots: `CardHeader`, `CardContent` and `CardActions`. `actionsAlign` is `align` on `CardActions`.
- `Card` actions sit at the end, like in `Accordion` and the `Dialog` and `Drawer` footers. `CardActions` `align="start"` (`.ui-align-start`) lines them up with the content, and `.ui-align-end` no longer does anything on them.
- `Card` no longer has `--_shadow-light` and `--_shadow-dark`. Set `--ui-shadow-elevated` in your theme, one shadow for both schemes whose default color follows `--ui-shadow-color`, or `--_elevated-shadow` on the card.
- `Checkbox` and `Radio` internal variables are private (`--_` prefix): `--highlight-size` is `--_ripple-size`, `--thumb-scale` is `--_ripple-scale` and `--_input-size` is `--_size`, the name every sized control uses. `--isLTR` and `--isRTL` are removed, the halo centers itself in both directions. `--_ripple-size` and `--_size` are inputs to override; `--_ripple-scale` is set by the hover and active states.
- `Checkbox`, `Radio` and `Switch` take `orientation="vertical"` (`.ui-vertical`) instead of `stack` (`.ui-stack`) to put the label under the control, like the other components with a layout axis.
- `Checkbox`, `Progress`, `Radio`, `Range`, `Select`, `Switch` and `ToggleButton` in Astro and Vue put `style` on the root, like `class`, instead of the `<select>`, `<input>` or `<progress>`, so `--_` properties set through `style` apply.
- `Checkbox`, `Radio`, `Switch`, `Range`, `DescriptionList` and `Table` type files are named like the other components: `components/Checkbox/types*` export `Props` and `Slots` instead of `CheckboxProps` and `CheckboxSlots` (likewise `Radio`, `Switch` and `Range`), `DescriptionList` exports `DescriptionListTermProps`, `DescriptionListDescriptionProps` and `DescriptionListItemProps` instead of `TermProps`, `DescriptionProps` and `ItemProps`, and `Table` exports one type per part (`TableBodyProps`, `TableCellProps` and the rest) instead of `SectionProps`, and `TableColumnProps` instead of `ColumnProps`. Import the types from `opui-css/<framework>` instead.
- `Checkbox`, `Radio`, `Switch`, `CheckboxInput` and `SwitchInput` in Astro no longer type a `type` prop, `Switch` and `SwitchInput` no longer type `role`, which stays `switch`, and `Radio` no longer types the native `size` (types).
- `Chip`, `Drawer` and `Progress` in Astro and Vue no longer render the class of their default look: no `.ui-tonal` on a tonal `Chip` or `Progress`, and no `.ui-inline-start` on a `Drawer` that opens from the inline start. In HTML these classes add nothing and can go. CSS that targets them can use `.ui-chip:not(.ui-outlined)`, `.ui-progress:not(.ui-filled)` and `.ui-drawer:not(.ui-block-end, .ui-block-start, .ui-inline-end)` instead.
- `Chip` no longer has a default slot. Pass the text as `label`, or rich content in the `label` slot, which renders in `.ui-text` like the prop.
- `ControlGroup` item styles select its direct child `.ui-button`s instead of every `button`, so `Button` links (`<a class="ui-button">`) are styled like the buttons and a `Menu` inside the group (split button) keeps its own item styles. A plain `<button>` without `.ui-button` gets no group item styles, so add `.ui-button` to it.
- `DescriptionList` in Vue exports `DescriptionListDescription` instead of `Description`, like Astro.
- `DescriptionList` takes `border` (`"solid"` or `"dotted"`) for the style of the line between a term and its description, and draws none without it: `bordered` is `border="solid"` and `bordered="dotted"` is `border="dotted"` in Astro and Vue. The classes are `.ui-border-solid` and `.ui-border-dotted`: in HTML, replace the 5.4.3 classes `.ui-bordered` with `.ui-border-solid` and `.ui-bordered.ui-dotted` with `.ui-border-dotted`. `.ui-dotted` is gone, and `.ui-bordered` stays on `List` and `Menu`.
- `DescriptionList` items are plain `div`s: `DescriptionListItem` no longer renders `.ui-item`, and the list styles `dl.ui-description-list > div`. Drop `.ui-item` from the items in HTML, and target `dl.ui-description-list > div` instead of `.ui-item` in your CSS.
- `Dialog` in Astro and Vue takes parts instead of slots: `DialogHeader`, `DialogTitle`, `DialogContent` and `DialogFooter`. `actionsAlign` is `align` on `DialogFooter`. `aria-labelledby` points at the `DialogTitle` unless you pass `aria-label` or `aria-labelledby`, so a dialog without a `DialogTitle` needs `aria-label`. An `id` on `DialogTitle` only applies when the dialog has `aria-label` or `aria-labelledby`, and a dev warning says when it is replaced. `align="start"` on `DialogFooter` adds `.ui-align-start`; `end` is the default and adds no class.
- `Dialog` regions are `.ui-header`, `.ui-content` and `.ui-footer`, like `Drawer`. The header is a `div.ui-header` row instead of an `hgroup`, and `aria-labelledby` points at the title heading inside it. `.ui-footer` replaces `.ui-actions` at the end of the dialog, and `.ui-align-end` on it is the default and can go. The title heading is `--ui-font-size-h4` through `--_title-font-size`, so it needs no `.ui-h4`.
- `Dialog` page scroll lock lives in `core/utils.css`, shared with a modal `Drawer` and `.ui-scroll-lock`, and no longer sets `block-size: 100%` on `html`. If you import single files, import `utils.css` too, or the page scrolls behind a modal dialog.
- `Divider` variants render `.ui-filled` and `.ui-tonal` instead of `.ui-border-filled` and `.ui-border-tonal`, and `variant="primary"` is `color="primary"`, which renders `.ui-primary` instead of `.ui-border-primary`. A primary line keeps its color with any variant.
- `Drawer` in Astro and Vue takes parts instead of slots: `DrawerHeader`, `DrawerTitle`, `DrawerContent` and `DrawerFooter`. `DrawerTitle` replaces the `DrawerHeader` `heading` prop and names the drawer. A drawer is named by `DrawerTitle`, or by `aria-label` without one (5.x set no name itself). An `id` on `DrawerTitle` only applies when the drawer has `aria-label` or `aria-labelledby`, and a dev warning says when it is replaced. `DrawerHeader` closes its `Drawer` with `command="close"` (Invoker Commands) instead of a click handler, so it closes the drawer without hydration, and browsers without Invoker Commands need a polyfill. Outside a `Drawer`, it closes the dialog its `commandfor` names instead of the nearest `<dialog>`, and a dev warning says when `commandfor` is missing.
- `Drawer` locks page scroll while it is modal, like `Dialog`, also without `.ui-scroll-lock`, except with a transparent backdrop on screens `31.25rem` and wider. `scrollLock` is off by default in Astro and Vue, so a drawer that `show()` opens no longer locks the page: set `scrollLock` (`.ui-scroll-lock`) on it to lock it.
- `Drawer` requires `id` (types) and no longer generates one, since its trigger points at it with `commandfor`.
- `Drawer` title is `--ui-font-size-h4`, like the `Dialog` title, instead of `--font-size-3`, and `--_header-font-size` is `--_title-font-size`. It sizes a heading that is a direct child of `.ui-header`.
- `Drawer` header, content and footer rules, its backdrop and its closed state live in `card.css`, shared with `Dialog`. If you import single files, import `card.css` too, or the drawer's parts lose their layout and scroll shadows, and a closed drawer stays on the page.
- `DrawerFooter` takes `align`, like `DialogFooter`. Its content sits at the end on every side, and `align="start"` (`.ui-align-start`) moves it to the start, instead of starting in an `inline-end` drawer.
- `DrawerHeader` renders its close button only with `closeButton`, like `DialogHeader` and `Callout`. Add `closeButton` to keep it. `closeLabel` names it ("Close" by default).
- `FieldGroup` no longer sets `role="group"`. Wrap it in a `Fieldset` (a `<fieldset>`, already a group) to group and name the fields. `Fieldset` with another element in `as` gets `role="group"`.
- `FieldGroup` `direction` (`"row"`, `"column"`) is `orientation` (`"auto"`, `"horizontal"`, `"vertical"`), like `ControlGroup`, `ToggleGroup` and `Carousel`, and `.ui-row` and `.ui-column` are `.ui-horizontal` and `.ui-vertical`. `auto`, the default, stacks fields and lines up a group of only buttons in a row, and `vertical` stacks the buttons too.
- `Fieldset` (`.ui-fieldset`) no longer reads `data-invalid`. Its end text turns red when a control inside has `aria-invalid="true"` or is `:user-invalid`, so mark each control in the group (`error` on each `Checkbox`, `Radio` or `Switch` in Astro and Vue).
- `FieldSet` is `Fieldset` (`components/Fieldset/Fieldset.*`), and `FieldDescription` renders `.ui-description` instead of `.ui-field-description`.
- `List` no longer takes `divided`. Use `bordered` (`.ui-bordered`) ([#395](https://github.com/felix-bohlin/ui/issues/395)).
- `List` `gutterless` (`.ui-gutterless`) is `flush` (`.ui-flush`).
- `List` styles `.ui-start` and `.ui-end` only as direct children of a row, or of the `a`, `button` or `label` directly in it. One inside another wrapper no longer gets the row layout.
- `List`, `Range` and `Progress` no longer take `variant="default"` (`.ui-default`, the page surface), because it wasn't the default look. Use `outlined` (the default), `filled` or `tonal` on a `Range`, `tonal` (the default) or `filled` on a `Progress`, and `filled` (the default), `tonal` or `transparent` on a `List`.
- `List` no longer styles `[aria-selected="true"]` on a row's `li`, `a`, `button` or `label`, where ARIA doesn't allow it. Mark the current row with `aria-current="page"`. Options (`option` and `[role="option"]`) keep the selected style.
- `ListItem` `headline` is `label`, and the `text` slot is gone: `label` and `description` take a string or, as slots of the same name, rich content, rendered as the two paragraphs in `.ui-text`. The default slot adds more content after them.
- `ListItem` `as` only accepts `"a"` or `"button"` (types). A static item leaves `as` out and renders its content straight in the `<li>`.
- `ListItem` `type` is `choice` (`checkbox`, `radio` or `switch`), and it can't be combined with `as` or `href` (types). An item with `as="button"` takes the native button `type` instead.
- `Range` `--_track-fill` is gone: the track fill is a scroll-driven animation in CSS, which fills the track in Chromium and Safari without JavaScript, also in plain HTML. Remove any code that sets it.
- `Range` takes `items` instead of `options` for its tick marks (`RangeItem[]`). In Astro and Vue, the label goes in the `label` slot instead of the default slot, and the readout slot is `value-text` instead of `value`, the name React and Svelte use (`valueText`).
- `Range` in Astro types its extra attributes as `<input>` attributes only, since they go to the input (types).
- `Select` items are typed `SelectItem`, with a `number | string` `value`, and take `label` instead of `text`, like `Menu` and `Range` items. Rename imports of `Item` from `components/Select/types`.
- `Switch` takes `size="small"` instead of `small`, like `Checkbox`.
- `Table` `variant` is `density` (`"dense"`, `"normal"`, `"spacious"`), so `variant` only names a surface. The classes are unchanged.
- `Table` and `DescriptionList` part files are `components/Table/TableBody.*`, `TableCell.*`, `TableColumn.*`, `TableColumnGroup.*`, `TableHead.*`, `TableHeaderCell.*`, `TableRow.*` and `components/DescriptionList/DescriptionListDescription.*`, `DescriptionListItem.*`, `DescriptionListTerm.*`. The Vue `Table` exports are unchanged, the Vue `Description` export is `DescriptionListDescription`, and the Astro entry adds the flat part names; update deep `./components/*` imports.
- `TableColumn` `width` takes a CSS length. A declaration string (`width="min-width: 10rem"`) is no longer parsed; pass `style` instead.
- `Tabs` look like segmented controls: the tabs sit on a rounded track and the selected tab is a raised pill. `--_accent-color` and `--_bg-color` are gone, use `--_selected-bg-color`, `--_selected-text-color`, `--_indicator-bg-color` and `--_track-bg-color`, or a `variant`. The selected pill is outlined with `--ui-control-border-color`, or `--ui-field-border-color`, so it reaches 3:1 against the track without the shadow. The open panel gets a `--ui-space-2` top margin. In dark mode the selected pill is `--ui-text-strong` at `--ui-state-selected-alpha-accent`, so it follows a theme's grays.
- `Tabs` render no `tablist`, `tab` or `tabpanel` roles and no `aria-controls`/`aria-labelledby`, so screen readers announce the radios they are, each as one of the set. Tabs with panels take no role, since the root holds the panels and a radio group holds only radios. Tabs without panels are a radio group: pass `role="radiogroup"` and an `aria-label` to `Tabs`, which warns in development when that group has no name, or put both on `.ui-tabs` in HTML. `TabsItem` and `TabsPanel` no longer take `panelId`, and `TabsPanel` no longer takes `tabId`. `tabs.css` no longer matches `[role="tab"]` or `[role="tabpanel"]`, use `.ui-label` and `.ui-panel`.
- `Tabs` parts are `.ui-input`, `.ui-label` and `.ui-panel` instead of `.ui-tab-input`, `.ui-tab-label` and `.ui-tab-panel`, and `TabsTab` is `TabsLabel` (`components/Tabs/TabsLabel.*`).
- `Tabs` that don't fit stay on one row and scroll sideways instead of wrapping onto more rows, and the open panel stays in view, padded by the focus ring's reach so a ring at its edge isn't clipped. Tabs with panels are a scroll container that sizes to its container, so give them a width inside flex and grid layouts that size to their content, or add `overflow="wrap"` (`.ui-overflow-wrap`) to wrap them as in 5.x. Tabs without panels size to their labels. Horizontal tabs that don't wrap draw the focus ring inside the tab, at `--ui-focus-ring-inset`.
- `Tabs`, `Table` and `DescriptionList` in Astro no longer have dot aliases such as `Tabs.Item`, `Table.Head` and `DescriptionList.Item`. Import the flat names, such as `TabsItem`, `TableHead` and `DescriptionListItem`, like React, Svelte and Vue. The `components/{Tabs,Table,DescriptionList}/index.ts` files that held the aliases are gone.
- `TabsItem` `open` and `ToggleButton` `pressed` are `checked`, the native attribute they set.
- `TabsItem` takes `id` instead of `tabId`, and `TabsLabel` takes `for` (`htmlFor` in React) instead of `tabId`, the native names of the attributes they set. The item still generates the id and passes it to its label when both are omitted.
- `TextField`, `Textarea` and `Select` in Astro and Vue no longer generate an input `id`. Pass `id` when something outside the component needs to reference the input.
- `TextField` and `Textarea` take a `size` prop instead of `small`. Replace `small` with `size="small"`.
- `TextField` and `Textarea` in Astro pass extra attributes to the `<input>`/`<textarea>` instead of the `<label>`. `class` and `style` stay on the label. In Vue, `style` now goes to the label instead of the input.
- `TextField` and `Textarea` take `variant="filled"` like `Select` instead of the boolean `filled`. Replace `filled` with `variant="filled"`.
- `TextField`, `Textarea`, `Select`, `Switch`, `Checkbox`, `Radio` and `Range` are marked invalid with `aria-invalid="true"` on the control instead of `data-invalid` on the root. `error` in Astro and Vue sets only `aria-invalid`. Replace `data-invalid` on the root with `aria-invalid="true"` on the `<input>`, `<select>` or `<textarea>`.
- `TextField`, `Textarea` and `Select` take `startText` (the `start-text` slot) instead of `description`, matching `endText`, `Range` and the `.ui-start-text` class.
- `TextField`, `Textarea` and `Select` slots inside the field's border are `start` and `end` (`.ui-start`, `.ui-end`) instead of `prefix` and `suffix` (`.ui-prefix`, `.ui-suffix`), and `top` and `bottom` (`.ui-top`, `.ui-bottom`) instead of `header` and `footer` (`.ui-header`, `.ui-footer`), so `start` and `end` mean the inline sides in every component and the container regions keep their own names.
- `TextField` styles in `text-input.css` moved into `text-field.css`, and `text-input.css` is removed. Remove its import.
- `TextField` and `Textarea` in Astro and Vue render a `div` root instead of a `label` when they have no `label`, like the HTML of a field named with `aria-label`, and link the start and end text to the control with `aria-describedby` (`x-start-text` and `x-end-text` for `id="x"`), like `NumberField`. The start and end text no longer name the control, so give a field without `label` an `aria-label` or `aria-labelledby`, and target `.ui-text-field` instead of `label.ui-text-field` in your CSS.
- `TextField` no longer takes `type="numeric"`, which rendered a text input with `inputmode="numeric"` and `pattern="[0-9]*"`. Pass those two attributes instead, or use `NumberField` for an amount. `type` goes to the `<input>` like any other attribute.
- `ToggleButton` in Astro and Vue no longer generates an input `id`. Pass `id` when something outside the component needs to reference the input.
- `ToggleButton` no longer supports `.ui-disabled`, and Astro and Vue no longer add it. Set `disabled` on the input, the toggle is styled through `:has(input:disabled)`.
- `ToggleButton` `value` no longer falls back to `label`. Pass `value` when the input needs one, such as in a form or a `ToggleGroup`.
- `ToggleButton` icon styles only apply to a direct child `svg`, sized with `--_icon-size`. An `svg` nested in another element is no longer sized, so move it out of its wrapper, like in `Button`.
- `ToggleGroup` `size="default"` is `size="medium"`, the name of its default look.
- `ToggleGroup` `selection` is `multiple`. A group is single-select by default, so add `multiple` to a group that left `selection` out or set `selection="multiple"`, and drop `selection="single"`.
- `Tooltip` requires an `id` (types). Without it the trigger can't reference the tooltip.
- `Tooltip` in Astro and Vue takes `TooltipContent` instead of `label` and the `content` slot.
- `Typography` rich text only styles headings without a class, like lists. Component parts such as the `Callout` title keep their own styles. Use the `.ui-h1`–`.ui-h6` classes to style a heading that has a class.
- `Typography` theme tokens: `--ui-font-size-h1` to `--ui-font-size-h4` grow from one type scale step to the next over one shared viewport window, `--ui-fluid-min-inline-size` (20rem) to `--ui-fluid-max-inline-size` (48rem), with `progress()`, instead of each over its own `vi` slope. `--ui-font-size-h3` has a higher minimum (`--ui-font-size-500`), `--ui-font-size-h4` scales between `--ui-font-size-400` and `--ui-font-size-500` instead of a fixed size, and `--ui-font-size-h6` is `--ui-font-size-300`, so heading sizes no longer invert or drop below body text on narrow viewports. Browsers without `progress()` keep the `clamp()` sizes, a fallback that `dist/opui.no-compat.css` and `dist/opui.baseline-2026.css` and later leave out.
- `Typography` rich text lives in a new `components.prose` layer, below `components.root`, so component styles inside rich text win over prose styles. The layer order is `openprops, theme, normalize, components.prose, components.root, components.extended, components.compat, utils`. If you declare the layer order yourself, add `components.prose` before `components.root`, or it sorts after `components.extended` and prose styles beat component styles inside rich text.
- `choice.css` holds the layout, label, end text, sizes and disabled styles shared by `Checkbox`, `Radio` and `Switch`, which moved out of `checkbox.css`, `radio.css` and `switch.css`. Import it with them, in any order, or use `components.css`.
- `dist/opui.components.css` needs `core/normalize.css`, or another reset that makes every box `border-box`, as the README now says: `Checkbox` and `Radio` no longer set `box-sizing` themselves, like the other components. Load `normalize.css` with it, or set `box-sizing: border-box` on every element in your own reset.
- `normalize.css` no longer declares `--_page-bg-color`. The page background reads `--ui-surface`; set that, or `background-color` on `html`.
- `package.json` `engines` requires Node 26.10 or later (`>=26.10.0`) instead of 22.
- `theme.css` and `core/palette.css` no longer make `del`, `ins`, `abbr` and `dfn` severity scopes. `del` and `.ui-del` read `--ui-critical-text` and `ins` and `.ui-ins` read `--ui-success-text`, so they pass contrast in light and dark mode, and the `abbr` and `dfn` underline reads `--ui-info`. Wrap content that read a `--ui-palette-*` role inside them in `.ui-critical`, `.ui-success` or `.ui-info`.
- `theme.css` `--ui-focus-ring-color` is black on light surfaces and white on dark ones, by the surface's OKLCH lightness, instead of `var(--ui-primary)`, and the global `:focus-visible` ring and the component rings read it, with `--ui-focus-ring-width`, `--ui-focus-ring-style` and `--ui-focus-ring-offset`. Set `--ui-focus-ring-color: var(--ui-primary)` to keep the old value.
- `theme.css` holds `--ui-motion` and its `prefers-reduced-motion` default, which moved from `core/normalize.css`. The `.ui-motion-*` classes moved to `core/utils.css`. If you import single files, import `theme.css` and `utils.css` too, or `--ui-motion` is undefined and the `.ui-motion-*` classes are missing.
- `theme.css` no longer sets `--ui-button-radius` and `--ui-field-radius`. `Button`, `ControlGroup`, `ToggleButton`, `ToggleGroup` and the fields fall back to `--ui-radius` when they're unset, also where it's set on a part of the page, so one token sets the corners of every component. If your styles read them, add the fallback: `var(--ui-button-radius, var(--ui-radius))`.
- `theme.css`, `palette.css` and the components name every theme token with a `--ui-` prefix, like the classes: `--primary` is `--ui-primary`, `--border-color` is `--ui-border-color` and `--color-1` is `--ui-color-1`. Open Props tokens such as `--size-3` keep their names, and no component or theme token reads them any more. Add `ui-` to the tokens you set or read.
- `theme.css` `--font-size-05` is `--ui-font-size-small`. Rename it where you set or read it.
- `theme.css` tokens follow one naming model: `--ui-on-*` is the text and icon color on a fill, `-text` after a color is that color tuned for reading, and `light`, `dark`, `inverse` and `contrast` each mean one thing. Beyond the `--ui-` prefix, `--text-primary` is `--ui-text-strong`, `--primary-contrast` is `--ui-on-primary`, `--text-primary-contrast` is `--ui-on-inverse`, `--text-muted` is `--ui-text`, `--text-muted-contrast` is removed (`kbd` and `var` read `--ui-surface-inverse` and `--ui-on-inverse`), `--surface-default` is `--ui-surface`, `--border-radius` is `--ui-radius`, `--button-border-radius` is `--ui-button-radius` and `--field-border-radius` is `--ui-field-radius`. MIGRATING lists them.
- `theme.css` roles are what components read, so overriding a palette step (`--ui-gray-N`, `--ui-color-N`) or an Open Props value such as `--size-3` on a part of the page no longer changes the components there. Override the role instead, such as `--ui-surface`, `--ui-border-color` or `--ui-space-3`, or put `.ui-palette` on the part so the roles are derived again from its palette. A subtree that should follow its own knobs takes `.ui-palette`.
- `theme.css` keeps one palette hue, blue (`222.8`), in both color schemes instead of green in light mode and blue in dark mode. Set `--ui-palette-hue: 145` on `html` and `240` on `html.ui-dark` and under `prefers-color-scheme: dark` to keep the v5 palette.
- `types.d.vue.ts` in every component folder is `types.vue-props.ts`, since TypeScript reads a `*.d.vue.ts` file as a declaration file and `skipLibCheck` skipped it. Update deep imports from `opui-css/components/<Name>/types.d.vue` to `types.vue-props`, or import the types from `opui-css/vue`.

### Removed

- `Accordion`, `Anchor`, `Card`, `Dialog`, `Drawer` and `Tooltip` no longer export a `Slots` type from `types.ts`, the `Callout` one drops `icon` and `title` and has `closeIcon` for the close button's icon, and the Vue `Drawer` types no longer export `DrawerSlots` or `DrawerFooterSlots`.
- `Accordion` no longer hides `::-webkit-details-marker` on a summary with a `.ui-marker`. Its `display: flex` removes the native marker in every current browser; only Safari before 18.2 drew it that way.
- `Chip` hover and press ripple. Remove any `--ripple` overrides.
- `ClassicSelect`. Use `Select`: it renders the same field, with the browser's own picker where customizable select isn't supported.
- `DescriptionList` `.ui-term` and `.ui-description`. The list styles `dt` and `dd` by element, and `DescriptionListTerm` and `DescriptionListDescription` render a plain `dt` and `dd`.
- `Dialog` takes only `.ui-elevated` from `card.css`: `.ui-tonal`, `.ui-outlined` and `.ui-text`, which a 5.x dialog took through `.ui-card`, no longer change it. Set `--_padding` for a denser dialog.
- `IconButton` (`.ui-icon-button`). Use `Button`: an icon-only button is square by default, `round` (`.ui-round`) makes it a circle. The hover halo is gone: icon-only buttons get the button's hover background. The old default size (28px) is `size="x-small"`. The old `small` (20px) has no preset: use `x-small` with `--_size: 1.25rem`. Icons are smaller (`--_icon-size: 1.5rem` matches the old 24px), and the icon color is the button's accent instead of the inherited text color.
- `Range` thumbs no longer change their border inside a focused `.ui-fieldset-item`, a class no component renders.
- `Select` no longer hides `option::before`.
- `TextField` and `Textarea` no longer take `supportingText` or the `supporting-text` slot. Use `endText` (`end-text`).
- `TextField` no longer styles `::-webkit-file-upload-button`, only `::file-selector-button`.
- `Toast`. The Astro and Vue components, `toast.css` with `.ui-toast` and its parts (`.ui-close-button`, `.ui-exiting`, `.ui-icon`, `.ui-title`), `css/js/toast.js` with `initToastManager()` and `showToast()`, and their types are gone. `Toaster` replaces them, and `toast()` replaces `showToast()`.
- `ToggleGroup` no longer exports the unused `ToggleContext` type.
- `normalize.css` no longer includes `::-webkit-file-upload-button`, `:-webkit-autofill` and `::-moz-placeholder`.
- `normalize.css` no longer falls back to `--text-color-2` when `--ui-text` is unset.
- `normalize.css` no longer sets `text-rendering: optimizeLegibility` on `body`.
- `open-props.css` no longer imports Open Props' `props.palette.css`, so `opui-css/open-props` (`dist/op.css`) no longer declares `--palette-hue`, `--palette-chroma`, `--palette-hue-rotate-by` or `--color-1` to `--color-16`. `core/palette.css` declares them as `--ui-palette-*` and `--ui-color-1` to `--ui-color-16`.
- `palette.css` no longer registers the palette variables (`--color-*`, `--gray-*`, `--palette-source` and `--palette-hue`) with `@property`.
- `theme.css` `--primary-dark` and `--primary-light`. Derive a shade from `--ui-primary` with relative color instead, such as `oklch(from var(--ui-primary) calc(l * 0.75) c h)`.
- `types.solid.ts` from every component folder. There are no Solid components.

### Added

- `Accordion` takes a `markerAnimation` prop (`rotate`, `flip`, `turn`) that sets how the marker animates when it opens. Defaults to `rotate`, which needs no class; `.ui-marker-animation-flip` mirrors the chevron and `.ui-marker-animation-turn` points it to the inline end when closed and down when open, also in right-to-left.
- `Accordion`, `Avatar`, `Button`, `Card`, `Checkbox`, `Chip`, `ControlGroup`, `Divider`, `List`, `Progress`, `Radio`, `Range`, `Select`, `Switch`, `Tabs`, `TextField`, `Textarea`, `ToggleButton` and `ToggleGroup` accept their default by name, which adds no class: `size="medium"` on every sized component, `variant="plain"` on `Accordion` and `Card`, `"transparent"` on `Button` and `ControlGroup`, `"outlined"` on `Divider` and `Range`, `"filled"` on `List`, and `"tonal"` on `Progress` and `Tabs`. In HTML, a `Drawer` opens from the inline start without `.ui-inline-start`.
- `Accordion`, `Callout`, `Card`, `Dialog`, `Drawer`, `Menu` and the `Select` picker read the optional `--ui-border-color-raised` for the edge of a raised surface: tonal and elevated cards, accordions and dialogs, callouts without a severity, drawers, menus and the picker. A theme sets it once to outline them all, or to `transparent` to drop the edges. `Drawer` takes `--_edge-border-color` for its edge alone.
- `AccordionActions` takes `align` (`.ui-align-start`), like `CardActions`, `DialogFooter` and `DrawerFooter`.
- `Anchor` with `trigger="hover"`, `Drawer`, `Menu` and `Tooltip` warn in development when `id` is missing, since their trigger reaches them through `commandfor` or `interestfor` and a `Drawer` names itself after it.
- `Avatar` and `ListItem` links take `disabled`, like `Button` and `Chip`: the link drops its `href` and gets `role="link"` and `aria-disabled="true"`, so a screen reader still hears a disabled link.
- `Avatar` takes a `size` prop (`.ui-x-small`, `.ui-small`, `.ui-large`) that matches the control sizes. Letters and icons scale with it, and large initials are `--ui-font-size-large`.
- `Avatar` takes `variant`: `filled` (the default, the primary color), `tonal` (`.ui-tonal`, the primary tint through `--_tonal-bg-color` and `--_tonal-text-color`) and `outlined` (`.ui-outlined`, the border color in `--_outlined-border-color` with no fill). An image avatar has no fill in any variant.
- `AvatarGroup` component (`div.ui-avatar-group[role="group"]`) in Astro, React, Svelte and Vue. It takes `class`, an `aria-label` or `aria-labelledby` that its types require in Astro, React and Svelte, a `role` that replaces `group`, other attributes, and avatars as children. The avatars overlap by `--ui-space-2` from the start, so the initials stay whole at every size and the group's box ends at its last avatar, a focused avatar is raised so the next one doesn't cover its focus ring, and a `Badge` on an avatar sits on its start side, the part the next avatar doesn't cover, with the same ring as the avatars (`--_outline-color`).
- `Badge` `corner` takes `"start-end"`, the default corner.
- `Badge` takes `hideLabel`, which renders `label` as visually hidden text (`.ui-sr-only`) inside the indicator, and hides the `indicator` slot from assistive technology. Pass the whole translated text as `label` ("5 unread messages") and the short visible form in the `indicator` slot ("5"), so the component never joins a number and words. A `dot` badge hides its `label` the same way.
- `Badge`, `Button`, `Card`, `Carousel`, `Checkbox`, `Dialog`, `Progress`, `Radio`, `Range`, `Table`, `Tabs`, `TextField`, `Textarea`, `ToggleButton` and `Tooltip` transitions read `--_duration` and `--_ease`, like `Accordion`, `Drawer`, `Menu` and `Select`. The `Carousel` button scale reads `--_scale-duration`, and the `Range` and `Tabs` focus rings `--_focus-ring-duration`.
- `Button` takes a `round` prop (`.ui-round`). Icon size is set with `--_icon-size`.
- `Button` types require `aria-label`, `aria-labelledby` or `children` in React and Svelte, so a button always has a name (types only).
- `Button` reads optional theme tokens: `--ui-button-accent` and `--ui-button-on-accent` for the color of buttons, also in a `ControlGroup`, without `.ui-primary` or `.ui-critical`, `--ui-control-border-color` for the border of outlined buttons, `--ui-control-border-color-filled` for filled and tonal ones and for the lines between buttons in a `ControlGroup` that isn't outlined, `--ui-button-font-weight`, and `--ui-button-hover-shadow` and `--ui-button-hover-translate` for the shadow and offset on hover. In dark mode their text keeps the accent's lightness at `--ui-text-min-lightness` or more and its chroma within `--ui-text-max-chroma`, like the intent `-text` roles. `--ui-font-size-control` sets the font size of the default `Button`, `Select`, `Tabs`, `TextField`, `Textarea` and `ToggleButton`.
- `Button`, `Callout`, `ControlGroup`, `.ui-link` and rich text links read `--ui-primary-text` for primary text. It defaults to `--ui-primary` with its lightness kept within `--ui-text-max-lightness` and `--ui-text-min-lightness`, so it keeps 4.5:1 on every surface and every primary text is one color, and themes whose primary is too light or too dark to read set it.
- `Button` and `ControlGroup` with `.ui-primary` and `.ui-tonal` read the optional `--ui-primary-tonal` and `--ui-on-primary-tonal`. When unset, they keep the palette tint. m3 sets Material's `primary-container`, shadcn its `secondary`.
- `Button` with `commandfor` or `popovertarget` keeps its pressed colors while the popover right after it is open, like a `Menu` trigger, without the press scale. A tooltip (`popover="hint"`) doesn't count.
- `Callout` takes `closeButton` in Astro, React, Svelte and Vue: the root becomes `<opui-callout>` with `role="article"` and an id, generated when it's left out, and a close `Button` named by `closeLabel` ("Close") sits at the end of the first row with `command="--dismiss"`, its icon in the `close-icon` slot (`closeIcon` in React and Svelte). The element (`opui-css/elements/callout.js`) fires a cancelable `dismiss` event that bubbles (`onDismiss` in React, `ondismiss` in Svelte, `@dismiss` in Vue), then sets `hidden` on the callout instead of removing it and moves focus that was inside it to the next focusable element after it, or else the one before, or the body. `dismiss()` does the same from a script. Until the element is defined, the close button is hidden (`callout.css`), and the React component ignores it until it has hydrated, so a press before hydration no longer hides the callout without `onDismiss`. Without `closeButton`, the callout is the `<article>` it was.
- `CalloutActions` part (`.ui-actions`) in Astro, React, Svelte and Vue puts a row of buttons under the callout's content, lined up with it. A `.ui-button` that is a direct child of a `Callout` sits at the end of the first row, for a close button. The toaster keeps its own layout.
- `CalloutIcon` renders a check icon for `severity="success"`, like `info`, `warning` and `critical`. Its types leave out the `aria-hidden`, `height`, `viewBox`, `width` and `xmlns` it sets.
- `Card` takes `as` in Astro, React, Svelte and Vue: `"article"` for a card that stands on its own, like a blog post, and `"section"` for a titled part of the page. The default is `"div"`.
- `Card` takes `.ui-card-link` on a link to make the whole card clickable. Other links and buttons in the card stay clickable.
- `Card` takes `density`: `spacious` (`.ui-spacious`) pads the parts with `--ui-space-5` for a card that stands alone, such as a sign-in form, and `dense` (`.ui-dense`) with `--ui-space-2` and a `--ui-space-2` gap for a small stat. The default is `normal`.
- `Card` takes `color="primary"` (`.ui-primary`), a thick `--ui-primary` outline inside the card's edge for the one card in a row that stands out, like a recommended plan.
- `Card` runs an `img`, `picture` or `video` child to its edges, at the top, between parts or at the bottom, with `object-fit: cover`, and pads the part after it like the top of the card. The gap between the parts is `--_gap`.
- `Card` takes `orientation`. With `auto`, the default, a card whose first child is an image, picture or video is a size container (`container: ui-card / inline-size`) that puts the image at the start, over the full height, with the other parts next to it, once it is `40rem` wide. `horizontal` (`.ui-horizontal`) always puts the image at the start, and `vertical` (`.ui-vertical`) keeps it on top without the container. The image takes `--_media-inline-size`, `40%` of the card.
- `CardHeader` renders `hgroup.ui-header`, the header region class `Dialog` and `Drawer` use, and `card.css` styles `.ui-header` like the `hgroup`.
- `CardHeader` takes `as="div"` and `as="header"`. A `div.ui-header` or `header.ui-header` with an `hgroup` inside is a row: the `hgroup` takes the free space, so an avatar before it and a chip or buttons after it line up on one row.
- `Carousel` takes an `aspectRatio` prop that crops media, like `--_media-aspect-ratio`.
- `Carousel` component (`ul.ui-carousel`). Scroll snap, with previous/next buttons (`::scroll-button()`) and markers (`markers`, `.ui-markers`, with `::scroll-marker`) generated by CSS. Buttons use inverted colors with a gray border derived from the button color so they contrast with any item, show an SVG chevron that follows the color scheme, and sit over the items without a class, above any `z-index` inside them since each item is its own stacking context, beside them (`buttons="outside"`, `.ui-buttons-outside`) or nowhere (`buttons="none"`, `.ui-buttons-none`). Images, videos and iframes fill the item with a configurable aspect ratio. Supports items per view (`itemsPerView`, `--_items-per-view`), peek (`peek`, `.ui-peek`), center alignment (`align="center"`, `.ui-align-center`), RTL, and custom properties for every size, color, icon and label. No JavaScript needed, with Astro, React, Svelte and Vue components, and it falls back to a snapping scroller. The buttons take `--ui-shadow-overlay`, markers are 24px targets around an 8px ring in `--ui-text`, which keeps its contrast in every theme, in a group as wide as the carousel in any parent, and the current marker is a 16px dot in `--ui-selected-strong`, and motion, smooth scrolling included, follows `--ui-motion` like the other components. The items keep room for their box shadows (`--_shadow-room`, `--ui-space-3`), padding that a negative margin cancels, so a card's shadow isn't clipped and the layout stays the same; on the scroll axis the room is at most `--_gap` less the peek, so the next item stays hidden. The buttons and markers are named "Previous", "Next" and "Slide" with the item number, by `previousLabel`, `nextLabel` and `markerLabel` (`{number}` for the number), which set `--_button-previous-label`, `--_button-next-label` and `--_marker-label` (`counter(ui-carousel-item)` for the number), so a translation can put the number anywhere. Its Astro, React and Svelte types require an `aria-label` or `aria-labelledby`, the carousel's name, and it renders `role="list"`, unless it's passed another `role`, so Safari keeps announcing it as a list.
- `Carousel` buttons take an image icon via `--_button-image`, sized with `--_button-image-size`. It defaults to `--ui-icon-next`, a chevron that points right, drawn in black like the icons of an icon set and shown as the inverse of the button face so it follows `.ui-dark`, `.ui-light` and forced colors, mirrored for the previous button and in RTL, and rotated in vertical carousels.
- `Carousel` takes a `persistentButtons` prop (`.ui-persistent-buttons`) that keeps both buttons visible. A disabled button keeps its fill and gets a more muted border (`--_button-disabled-border-color`).
- `Carousel` takes `orientation="vertical"` (`.ui-vertical`) to scroll on the block axis. Set its height with `--_block-size`. Markers sit in a column beside the items.
- `Carousel` takes `stretch` (`.ui-stretch`), which stretches each item's content, such as a card, to the item's height.
- `Checkbox`, `Radio` and `Switch` take `card` (`.ui-card`), which renders the control as a card styled by `card.css`: outlined by default, tinted when hovered and when checked, with the focus ring on the card. `variant` (`outlined`, `tonal` or `elevated`) changes the surface. Cards in a horizontal `FieldGroup` share the row equally, and a card keeps its layout whichever of `card.css` and `choice.css` is imported first. `--_hover-bg-color`, `--_padding` and `--_selected-bg-color` are the knobs. The checked fill is the control's accent at `--ui-state-selected-alpha-accent`, so the fill, the border and the checked input share one color (red when invalid), and more contrast lowers the alpha so the label and end text keep 7:1 in dark mode.
- `Checkbox`, `Radio` and `Switch` take a `label` string, a shorthand for the default slot.
- `Checkbox` and `Radio` take `size="x-small"` (`.ui-x-small`), 14px from the new `--ui-choice-size-x-small` token.
- `Checkbox`, `Radio` and `Switch` take an `endText` string in Astro and Vue, like `TextField`.
- `Checkbox`, `Radio`, `Switch` and `Range` read the optional `--ui-choice-accent` and `--ui-choice-on-accent` for their checked fill, thumb and mark. When unset, they keep `--ui-primary` with the dark mode lightness cap. brutalist sets them to its primary; m3 and shadcn set `--ui-control-accent`, which they read first. A checked invalid `Checkbox` or `Radio` draws its check, dash or dot in `--ui-on-fill`, so it keeps its contrast on the red fill when a theme sets `--ui-choice-on-accent`.
- `Checkbox`, `Radio` and `Switch` read the optional `--ui-choice-border-color` and `--ui-choice-border-width` for their unchecked border and track edge. When unset, they keep `--ui-field-border-color` and `--ui-field-border-width`, and the color promises 3:1 against `--ui-surface`. shadcn sets it to its primary, like shadcn/ui, so its faint field border no longer draws the choices.
- `CheckboxInput`, `RadioInput` and `SwitchInput` take `class` in Vue, and the Vue entry exports `DescriptionListDescriptionProps`, `DescriptionListItemProps` and `DescriptionListTermProps`.
- `Chip` supports `aria-disabled="true"` on a link chip. A static chip takes `.ui-disabled` for an inactive look, since a `div` can't carry a disabled state.
- `Chip` takes a `large` size (`.ui-large`, 40px) for chips next to default-size fields and buttons. Chip heights come from `--ui-chip-size-small`, `--ui-chip-size` and `--ui-chip-size-large`, which follow the control size scale.
- `Chip` takes `size="x-small"` (`.ui-x-small`), 24px tall from the new `--ui-chip-size-x-small` token.
- `Chip` takes a `severity` prop (`.ui-critical`, `.ui-info`, `.ui-neutral`, `.ui-success`, `.ui-warning`) that tints a tonal chip, and `dot` (`.ui-dot`) for a leading dot in that color. The dot is a diamond for critical, a triangle for warning and a ring for neutral, and stays visible in forced colors mode. On an outlined chip only the dot is colored. The tint, border, text, dot and the hover of a button or link chip read the `--ui-palette-*` roles, like `Callout`. In print, `print-color-adjust: exact` keeps the tint and the dot.
- `Chip` takes a `disabled` prop in Astro, React, Svelte and Vue. A button chip gets `disabled`, a link chip `aria-disabled="true"`.
- `Chip` takes `as="span"` in Astro, React, Svelte and Vue, for a chip inside a `<label>` or `<button>`, like a count in a tab.
- `Chip` styles a button chip with `aria-pressed="true"` as pressed, for filters and choices: filled with `--ui-selected`, or `--ui-primary`, under `--ui-on-selected` text like a checked `ToggleButton`, lighter or darker on hover like a filled button, dimmed with `--ui-disabled-opacity` and without the hover when disabled or `aria-disabled="true"`, and `SelectedItem` in forced colors, with a `SelectedItemText` dot. `--_selected-bg-color` sets the fill. In print, `print-color-adjust: exact` keeps it.
- `ControlGroup` joins a `TextField`, `Select`, `NumberField` or `Textarea` with its buttons into one control. Every control keeps its own border and focus ring: the group overlaps their edges by one border width, squares the corners they share, puts a field over the buttons next to it unless the group is outlined, then a hovered field or outlined button, an invalid control and a focused one on top, and drops their shadows. Children that don't render, such as a `Menu` or a tooltip, sit anywhere between the controls without changing their edges. A text field or textarea takes the free space, so a group with one fills the line like a field, a visible label sits above its control and the controls line up at the bottom. `size` sizes the fields with the buttons. `Button` and the fields draw their corners from `--_start-start-radius`, `--_start-end-radius`, `--_end-start-radius` and `--_end-end-radius`, which the group sets, and the fields take `--_radius` and `--_shadow`, like `Button`.
- `ControlGroup` and `ToggleGroup` take `overflow`: `"wrap"`, the default, wraps their items onto more rows, `"scroll"` (`.ui-overflow-scroll`) keeps them on one row, each on one line, and scrolls sideways, and `"shrink"` (`.ui-overflow-shrink`) keeps them on one row and truncates labels with an ellipsis. Icon-only items keep their size.
- `ControlGroup` and `ToggleGroup` `orientation` takes `"horizontal"`, the default, like `Carousel`.
- `Copy` component (`opui-copy.ui-copy`, `display: contents`) around a field or text. A button with `commandfor` set to its id and `command="--copy"` copies the value of its first `input` or `textarea`, or else its text without buttons, popovers and elements with `data-copy-ignore`, with `navigator.clipboard.writeText()`. A `<span class="ui-floating" popover aria-hidden="true">` label in the look of an outlined button, at the button's height and with its font size and corners, shows `copiedLabel` ("Copied") before the button for two seconds, opening with `--ui-ease-enter` and closing with `--ui-ease-exit`, and the `<span class="ui-sr-only" role="status">` inside announces it. The button itself doesn't change. The label closes a Tooltip on the button and keeps it closed while it shows, also in browsers without interest invokers (`css/compat/copy.css`). Without the Clipboard API, or when it refuses or doesn't answer within a second, the element copies through a selection with `document.execCommand("copy")`. Where that is blocked too, the label shows `failedLabel` ("Copy failed") until Esc, a click elsewhere or the next copy, and the element selects the text, focusing a field. Until `opui-css/elements/copy.js` loads, a copy button inside the element or right after it is hidden (`copy.css`).
- `DescriptionList` takes `orientation="horizontal"` (`.ui-horizontal`), which keeps the term and the description side by side at any width. The default, `auto`, stacks them when the list is `45ch` or narrower.
- `DescriptionListItem` takes `total` (`.ui-total`), which draws a line above the item and makes it larger, bold and strong, for the total of an order summary or an invoice.
- `Dialog` and `Drawer` share their parts: a header row whose title (`DialogTitle`, `DrawerTitle`) takes the free space and names the overlay, a paragraph in the header gets a row of its own under the title and the buttons next to it, the content draws its focus ring inside when it is focusable, and the footer (`DialogFooter`, `DrawerFooter`) is a row for buttons, text or anything else, with `align`. `.ui-actions` groups the buttons in a footer and moves them to the end when other content comes first.
- `Dialog` and `Drawer` show a subtle scroll shadow under the header and above the footer while the content scrolls (scroll-state container queries). A `Drawer` clips its own overflow, so only its content scrolls, also without a footer.
- `Dialog` types `closedby` in every framework.
- `DialogHeader` takes `closeButton`, which adds a close button at the end of the title row, like `DrawerHeader`, named by `closeLabel` ("Close" by default). It closes its `Dialog` with `command="close"`, through the dialog's `id`, and takes a `close-icon` slot (`closeIcon` in React and Svelte).
- `Divider` reads a `--ui-divider-gap` theme token for the space around it. Cards, callouts, dialogs and drawers set it to `--ui-space-3`.
- `Divider` takes content in the middle of the line, text or any element, through the default slot (a `<div>` instead of the `<hr>`), or in HTML as a `<div class="ui-divider">` or `<p class="ui-divider">`. `align` (`.ui-align-start`, `.ui-align-end`) moves it to one side, and the lines follow the variant. In a `Form`, a button row after a labeled divider drops its top margin, like after an `hr`.
- `Drawer` takes `closeOnNavigate` (`[data-close-on-navigate]`): the drawer closes when the page navigates, through a link inside it, Back and Forward or a client router, with `opui-css/elements/close-on-navigate.js`, which the component loads and which reads the Navigation API. A `pushState()` or `replaceState()` that keeps the path, like one that only updates the query, leaves it open.
- `DrawerHeader` takes a `commandfor` prop (the drawer `id`). Inside a `Drawer` it defaults to the drawer's `id`, and the close button uses `command="close"` (Invoker Commands). Outside a `Drawer`, set `commandfor` to the dialog's `id`. A dev warning says when it's missing.
- `DrawerHeader` takes a `close-icon` slot (`closeIcon` in React and Svelte) that replaces the close button's icon.
- `Layout` classes for the space between components: `.ui-layout-column` (a column, with `.ui-align-center` and `.ui-align-end` to line its children and their text up), `.ui-layout-row` (a row that wraps, with `.ui-align-center` and `.ui-align-end` to push its children along it and `.ui-spread` to push them to the two ends), `.ui-layout-grid` (columns that fill the width without breakpoints, with `.ui-stretch` to stretch them over the row when fewer children than fit, and `--_max-columns` to cap the count), `.ui-layout-columns` (one column that becomes the `--_columns` tracks, such as `3fr 2fr` or `15rem 1fr`, once the nearest container is `56rem` wide, or `40rem` with `.ui-breakpoint-small` and `72rem` with `.ui-breakpoint-large`, where a `.ui-sticky` child stays in view at `--_sticky-inset` while the other column scrolls), `.ui-layout-media` (a fixed-size start, such as an avatar, next to text that fills the rest and wraps instead of widening the row) and `.ui-layout-container` (a centered, capped width, and the container `.ui-layout-columns` measures). On a `ul` or `ol`, the column, the row and the grid drop the bullets and list margins, and a `.ui-card` alone in an `li` of a grid fills its cell. Gaps come from the `--ui-space-*` scale, with `.ui-x-small`, `.ui-small` and `.ui-large`, and `.ui-bordered`, like on a `List`, draws a line in each gap of a column, row, grid or columns with `column-rule` and `row-rule`, only between two children, so a wrapped row or the short last row of a grid gets no stray line (`--_divider-border-color`, `--ui-border-color` by default). Browsers without gap decorations leave the gap without the line. CSS only, in `css/components/layout.css`, in the `utils` layer.
- `List` takes `--_check-image`, `--_selected-indicator-bg-color`, `--_selected-indicator-size`, `--_start-image-size` and `--_start-video-size`, `Tooltip` takes `--_max-inline-size`, and `Carousel` takes `--_marker-selected-padding` and `--_marker-border-color`.
- `ListItem` takes a `submenu` slot, rendered inside the `<li>` after the element set by `as`, for a nested `Menu`.
- `ListItem` takes `color="critical"` (`li.ui-critical`) for a destructive item in a `Menu`.
- `ListItem` takes an `icon-checked` slot (`iconChecked` in React and Svelte, `.ui-icon-checked`): an icon of your own at the end of the row, shown while the row is selected or current. In a `Menu` or a `role="listbox"` list it replaces the check.
- `Menu` component (`menu.ui-menu[popover]`), styled by `list.css` like a `List`. It requires an `id` for its trigger's `commandfor`, opens over `--ui-duration-slow` with `--ui-ease-enter` and closes with `--ui-ease-exit`. Opens with Invoker Commands, anchors to its trigger with no `anchor-name`, shrinks to the space on its side and flips when that side has less than `12rem`, and moves below or above its trigger when neither side fits. Browsers without `calc-size()` (Firefox and Safari) cap it at `60dvb`, flip it when it doesn't fit, and move it below or above its trigger, where it scrolls, when no side has room. Its placements use `self-` `position-area` keywords, so in a right-to-left part of a left-to-right page it opens from its trigger's right edge (not yet in Firefox, which places it toward the wrong side). Supports an `items` prop (items take native `a` and `button` attributes in every framework), `bordered` (`.ui-bordered`, a divider between items), custom `ListItem` content, placements, end alignment (`align="end"`, `.ui-align-end`), `--ui-anchor-position-area` and critical items. Items are built like `List` items, with the text in `.ui-text` and shortcuts in `.ui-end`, change color at once on hover and fade back over `--ui-duration-fast`, and a disabled link item keeps the link role (`role="link"` and `aria-disabled="true"` without `href`). Critical items read `--ui-palette-text`, and `--ui-palette-accent` on hover, the roles of the critical scope. Items take a `label`, close the whole menu on click, also from a submenu, unless they set `keepOpen`. The current item (`aria-current`) gets a check at the end instead of the bar of a `List`, drawn from `--ui-icon-check`, and the `icon-checked` slot (`iconChecked` in React and Svelte, `.ui-icon-checked`) replaces it on every item from `items`. Group headings (`li.ui-heading`) are HTML and CSS only. Submenus go in the `submenu` slot of a `ListItem`, and in right-to-left text a submenu item mirrors only the chevron `svg` in `.ui-end`, not a shortcut next to it. On iOS, submenus anchor to their parent menu instead of their trigger item, at every depth (`css/compat/menu.css`). When space is tight, the menu keeps at most 40% of the viewport height. Its border and dividers are `--ui-border-color-on-raised`, like other elevated surfaces. Open menus close when the page navigates, also through a client router, with `opui-css/elements/close-on-navigate.js`, which the component loads. A `pushState()` or `replaceState()` that keeps the path, like one that only updates the query, leaves them open.
- `Message` component (`li.ui-message` in `ol.ui-message-list`) in Astro, React, Svelte and Vue: chat bubbles that group consecutive messages on the same side into a run with `:has()`, with tighter corners inside the run, the author on its first message and the avatar on its last. `Message` takes `author`, `time` with `datetime`, `outgoing` (`.ui-outgoing`), `newAuthor` (`.ui-new-author`) and `typing` (`.ui-typing`, animated dots over status text), and `start`, `end` and `bottom` slots for the avatar, a read receipt and the reactions, a `ToggleGroup` drawn as separate pills over the bottom edge of the bubble, a checked one filled with `--ui-selected`, or a primary tint, inside a `--ui-selected-strong` border. `MessageList` is the list, with `role="list"` so Safari keeps announcing it as one, or a passed `role` such as `log`, and spaces a date `li.ui-divider` between messages with `--ui-space-2`. In print, `print-color-adjust: exact` keeps the bubble fills, so an outgoing message's text never prints pale on white paper.
- `NumberField` component (`opui-number-field.ui-number-field`): a number field with decrease and increase buttons, styled by `text-field.css`, `button.css` and `number-field.css`, so it covers the browser's autofill color and gets a dashed border when invalid in forced colors, like `TextField`. The `<opui-number-field>` custom element steps the value when a button with `command="--step-down"` or `command="--step-up"` is pressed or held, or when a script calls its `stepDown()` or `stepUp()`, fires `input` and `change`, marks a button `aria-disabled="true"` at `min` or `max`, disables both buttons while the input is disabled, so Tab skips them (a disabled field also renders them disabled, so the server markup matches the hydrated one), marks both `aria-disabled` and doesn't step while the input is `aria-disabled`, and follows a form reset. Until it loads, the buttons are hidden and the input keeps the browser's spin buttons. The field fits its value (from `--_min-inline-size`, `4ch`), and a long start or end text wraps under it instead of widening it, unless `stretch` (`.ui-stretch`) fills the width. Takes `label`, `hideLabel`, `startText`, `endText`, `error`, `size`, `spread`, `stretch`, `variant`, `decreaseLabel` and `increaseLabel`, and the `decrease-icon` and `increase-icon` slots (`decreaseIcon` and `increaseIcon` in React and Svelte) for the button icons, binds `value` like `TextField`, links the start and end text with `aria-describedby` (`x-start-text` and `x-end-text` for `id="x"`), points the step buttons at the input with `aria-controls`, and loads the element itself in every framework.
- `OneTimeCode` component (`label.ui-text-field.ui-one-time-code`) in Astro, React, Svelte and Vue: one `<input autocomplete="one-time-code">` drawn as a box per character with the theme's field radius and border width (`--ui-field-radius`, else `--ui-radius`, and `--ui-field-border-width`), every box outlined thicker in the accent color while the field has focus, also once the code is complete, and a ring on the next empty one (not on iOS, where the input keeps a fixed width and a complete required code hides the caret, `css/compat/one-time-code.css`), so paste, SMS autofill and password managers work without JavaScript. It takes `length` (4 to 8, `maxlength`), `grouped` (`.ui-grouped`, a dash between the halves), `alphanumeric`, `label`, `endText`, `error`, the sizes and `value` as the model, which follows a form reset, and reads the TextField properties. A passed `autocapitalize`, `inputmode`, `pattern` or `spellcheck` (`autoCapitalize`, `inputMode` and `spellCheck` in React) replaces the default the component sets, and `autocomplete` stays `one-time-code`, so the types leave it out. In forced colors, an invalid code gets a dashed outline, like the dashed border of an invalid `TextField`.
- `Progress` has a `--_loop-duration` property for the length of its indeterminate loop.
- `Progress` takes `round` (`.ui-round`), which draws the progress as a ring, `--ui-icon-size-large` wide, filled to `value` over `max` with typed `attr()`, and spins a quarter arc while indeterminate, or pulses under reduced motion. `--_ring-size` and `--_ring-border-width` resize it. Browsers without typed `attr()` show the bar.
- `Radio` takes a `spread` prop (`.ui-spread`), like `Checkbox` and `Switch`.
- `Range` takes an `error` prop (`aria-invalid="true"` on the input) for the invalid state, like the other fields.
- `Range` takes a `size` prop (`.ui-x-small`, `.ui-small`, `.ui-large`), like the other form controls. The thumb and the track scale with it, and on touch screens the x-small and small thumbs keep the 30px touch size.
- `Range` has a `--_track-base-bg-color` property for the empty track at rest. The pressed and disabled states override it.
- `Range` names its value for screen readers with the label of the tick at it, since the datalist is hidden from them: with labeled `items`, or labeled options in the `datalist` slot, and no `valueSuffix`, the input's `aria-valuetext` is the label ("Medium" rather than 1), and `opui-css/css/js/range.js` keeps it in sync and removes it between labeled ticks.
- `Rating` component (`meter.ui-rating` for a score, `fieldset.ui-rating` for input) in Astro, React, Svelte and Vue: stars drawn with masks. The meter fills the exact fraction and is `max` stars wide, read with typed `attr()` or `--_max`, and `label` names it, or a passed `aria-label`. With `name` it renders a `<fieldset>` of radios, one per star plus a clear radio, that preview on hover and show a `3/5` counter, and takes `clearLabel`, `disabled`, `error`, `lang`, `required`, the sizes (`.ui-small`, `.ui-large`), `starLabel` and `value` as the model, with `defaultValue` and `onValueChange(value)` in React. `starLabel` is plain data, so it crosses a React Server Component boundary: a template per plural form with `{count}` for the number (`{ one: "{count} star", other: "{count} stars" }` by default), picked with `Intl.PluralRules` for the rating's `lang`, or English without one. Empty stars are outlines, so they differ from filled ones by shape as well as color in every theme, contrast setting and forced colors (on the meter where typed `attr()` is supported), and read `--ui-field-border-color`, which reaches 3:1 against the page. The stars and the clear icon are masks, `--_star-image`, `--_star-empty-image` and `--_clear-image`. In print, `print-color-adjust: exact` keeps the stars, also when the browser doesn't print backgrounds.
- `Select` items take `selected`, and `value` preselects options in Astro, Svelte and Vue, and `defaultValue` or `value` in React (an array with `multiple`), matched as text like the native select, so `"2"` picks an item valued `2`. Options render `selected` on the server.
- `Select` and `Range` export `SelectItem` and `RangeItem` from every framework barrel.
- `Select` takes `autoFit` (`.ui-auto-fit`), like `TextField`: the field's width follows the selected option, from `25ch`.
- `Select` styles `<optgroup>` groups like `<div role="group">` ones. A `<legend>` first in the group is the heading, and the `label` attribute names the group and shows in browsers without customizable select.
- `Select` options take the parts of a list item: an avatar, an icon or a `.ui-swatch` in `.ui-start`, and the label in `.ui-text`, with a second `span` as a description. The field shows the start part and the label of the selected option.
- `SelectAll` component (`opui-select-all.ui-select-all`, `display: contents`), documented on the Checkbox page. Around a group such as a `Fieldset` or a `Table`, the `<opui-select-all>` element makes the checkbox marked `data-select-all` check and uncheck the other enabled checkboxes inside, with `click()` so their own change handlers and bindings follow, and keeps it checked when they all are and `indeterminate` when some are, also after a form reset. The Astro component loads the element, and React, Svelte and Vue load it on the client.
- `SortableTable` component (`opui-sortable-table.ui-sortable-table`, `display: contents`), documented on the Table page, and `sortable` on `TableHeaderCell` (`th[data-sort]`), which puts the label in a `<button>`. A press sorts the body rows by that column with `Intl.Collator` and `numeric: true`, from a cell's `data-sort-value` or its text, ascending first, sets `aria-sort` on the header and announces the column and the direction ("Moons, sorted ascending"), which `ascendingLabel` and `descendingLabel` (`ascending-label` and `descending-label`) translate, with `{column}` where the header's label goes. It fires a cancelable `sort` event first (`onSort` in React, `onsort` in Svelte, `@sort` in Vue), so a framework can sort its own data, and the React component passes a `ref` on to the element. `sortable-table.css` draws the sort arrow. The component renders the live region it announces in, so React leaves its text alone, and the React component ignores header clicks until it has hydrated, so a sort before hydration no longer moves the rows React is about to hydrate or happens without `onSort`. In HTML without the live region the element adds one.
- `Stat` component (`dl.ui-stat`) in Astro, React, Svelte and Vue: a `dt.ui-label`, a `dd.ui-value` in bold tabular numbers and an optional `dd.ui-description`, for a key number on a dashboard. `label` and `description` take a string, with slots of the same name for rich content, and `size` (`.ui-small`, `.ui-large`) sizes the value through `--_value-font-size`.
- `Stepper` component (`ol.ui-stepper`) in Astro, React, Svelte and Vue: the steps of a flow such as a checkout, with numbered markers and a line between them. `aria-current="step"` marks the current step, and the steps before it show as complete. A passed `aria-current` replaces the one `current` sets. `StepperItem` takes `complete` (`.ui-complete`, a check in the marker), `error` (`.ui-error`, an exclamation mark and the invalid color), `href` (a link on a complete step or one with an error), `description` (`.ui-description`) and an `icon-complete` slot (`iconComplete` in React and Svelte, `.ui-icon-complete`) that replaces the check, which reads `--ui-icon-check`, and screen readers hear `completeLabel` (", completed") or `errorLabel` (", error") after the label. The list takes `items`, `current` (an index), `complete`, `orientation` (`auto` stacks the steps below `32rem`, `.ui-horizontal` and `.ui-vertical`) and `size="small"` (`.ui-small`). In print, `print-color-adjust: exact` keeps the markers and the line between them.
- `Switch` takes `size="x-small"` and `size="large"` (`.ui-x-small`, `.ui-large`), from the new `--ui-switch-thumb-size-*`, `--ui-switch-track-block-size-*` and `--ui-switch-track-inline-size-*` x-small and large tokens. The dot inset follows the track and dot size, so custom `--ui-switch-*` values stay centered.
- `Switch`, `Progress` and `Range` read the optional `--ui-track-bg-color` for the empty part of their track. When unset, they keep their current colors. shadcn sets it to its field border. A `Switch` reads the optional `--ui-switch-track-bg-color` first.
- `Table` takes `stickyHeader` (`.ui-sticky-header`), which keeps the header rows at the top of the nearest scroll container and shows a shadow once they are stuck (scroll-state container queries). Offset it with `--_sticky-inset`.
- `Table` has `TableCaption` and `TableFoot` parts for `<caption>` and `<tfoot>`.
- `Table` exports a props type for every part from `opui-css/astro`, `opui-css/react`, `opui-css/svelte` and `opui-css/vue`: `TableBodyProps`, `TableCaptionProps`, `TableCellProps`, `TableColumnGroupProps`, `TableFootProps`, `TableHeadProps`, `TableHeaderCellProps` and `TableRowProps`.
- `Table` takes `flush` (`.ui-flush`), which drops its block margin for a table in a card or another padded box, and `overflow="scroll"` (`.ui-overflow-scroll`), which keeps each cell on one line and scrolls the table sideways when the columns don't fit. The last column takes the space left over. A scrolling table needs `tabindex="0"`, and draws its focus ring inside, so a card doesn't clip it.
- `TableCell` and `TableHeaderCell` take `numeric` (`.ui-numeric`): the cell aligns to the end and uses tabular figures, so the digits of a number column line up.
- `Tabs` take a `variant` prop. `filled` (`.ui-filled`) fills the selected tab with `--ui-selected-strong`, the primary color unless a theme sets it, with its focus ring in `--ui-on-selected-strong` so the ring keeps 3:1 on the fill, `line` (`.ui-line`) drops the track and marks the selected tab with a line, and `outlined` (`.ui-outlined`) uses a bordered track without a background.
- `Tabs` take `overflow`: `"scroll"`, the default, or `"wrap"` (`.ui-overflow-wrap`), which wraps tabs that don't fit onto more rows instead of scrolling them.
- `Tabs` take a bindable `value`: `bind:value` in Svelte, `v-model` in Vue, `value`, `defaultValue` and `onValueChange` in React, and in Astro the `value` of the tab to select on the server. A `TabsItem` with a `value` takes its checked state from it once the tabs have one, so a tab that loses its check to another one no longer drifts from the state. The item's own `checked` or `defaultChecked` is then ignored, and a dev warning says so.
- `Tabs` reads `--_panel-gap` (`--ui-space-2`) for the space between the tab list and the panel.
- `Tabs` take `orientation="vertical"` (`.ui-vertical`): the tabs stack in a column at the inline start and the panel sits beside them, `--_panel-gap` away, in every variant, in right-to-left and in forced colors. Long labels wrap in a column up to half the width, long words in the labels and the panel break, hyphenated for the page's `lang`, the selected pill or line slides up and down, and `overflow` has no effect.
- `TextField`, `Textarea`, `Select` and `Range` take `hideLabel`, which renders the label as `.ui-sr-only` instead of `.ui-label`, so the field keeps its accessible name without a visible label.
- `TextField`, `Textarea` and `Select` take `x-small` (`.ui-x-small`, 28px) and `large` (`.ui-large`, 48px) sizes, so every field size has a matching `Button` size. x-small fields set their text in `--ui-font-size-caption`, like x-small buttons, and keep at least 16px on iPhone and iPad. Their block padding follows `--ui-space-scale`, like the other sizes.
- `TextField` takes `passwordToggle`: on a `type="password"` field, a button at the end shows and hides the password, with `aria-pressed` and the name `passwordToggleLabel` ("Show password" by default). The root becomes the `<opui-text-field>` custom element (`opui-css/elements/text-field.js`) with a `<label for>`, since a button inside a `<label>` joins the input's accessible name, and the start and end text describe the input. The password hides again when the form is submitted or reset, or the input is disabled, by itself or by a `fieldset`. The button is disabled while the input is, and `aria-disabled` while the input is, also when a script changes it later, and hidden until the element is defined. The `icon-unchecked` and `icon-checked` slots (`iconUnchecked` and `iconChecked` in React and Svelte) replace its eye icons, wrapped in `.ui-icon-unchecked` and `.ui-icon-checked`, and a `Button` treats either wrapper like a direct `svg`.
- `TextField` and `Textarea` take `characterCount`: with `maxlength`, the `<opui-character-count>` custom element (`opui-css/elements/character-count.js`) at the end of the end text shows the characters typed out of the limit. It is `aria-hidden`, so it stays out of the field's name, and once 10% or 10 characters are left, whichever is more, a polite live region outside the label, in the field's `dialog` when there is one, so a modal dialog or drawer doesn't make it inert, announces how many, in the field's `lang`. `characterCountLabel` sets the words, with `{count}` for the number ("Characters left: {count}" by default). The element's `control` is the input or textarea it counts.
- `TextField` takes `dropZone` (`.ui-drop-zone`), which makes a `type="file"` field a tall area with a dashed border that takes files dropped anywhere on it.
- `Timeline` component (`ol.ui-timeline`) in Astro, React, Svelte and Vue: dated events with markers and a connecting line, where the dates line up in their own column through subgrid and move above the titles under `24rem`. Items take `color`, `current` (`aria-current`, a `--ui-selected-strong` marker with a halo, like the current `Stepper` step, which a passed `aria-current` replaces), `label` with `headingLevel`, `time` with `datetime` and a `marker` slot for an icon (`.ui-marker`), and the list takes `items`, `tracked` (`.ui-tracked`, the line in `--ui-selected-strong` up to the current item) and `size="small"` (`.ui-small`). In print, `print-color-adjust: exact` keeps the filled markers.
- `Toaster` component (`opui-toaster.ui-toaster`): toasts that confirm an action and dismiss themselves. A button with `commandfor` set to its id and `command="--toast"` shows the text in its `data-toast` attribute, colored by `data-toast-severity` like a `Callout`, with its severity icon. The severity and close icons are masks on an empty `svg`, `--_critical-image`, `--_info-image`, `--_success-image`, `--_warning-image` and `--_close-image`, so they can be swapped in CSS. `toast(message, { action, duration, severity })` and its shorthands `toast.success(message)`, `toast.info`, `toast.warning`, `toast.critical` and `toast.neutral` do the same from a script, in the toaster inside the open modal dialog, else the first toaster on the page, or the one named by `toaster`. A toaster outside the open modal dialog warns in the console when it shows a toast, since the dialog makes it inert. A toaster shows at most `limit` toasts (`limit` attribute, 3 by default) and dismisses the oldest past it, unless it holds focus. `action` (`{ label, onClick }`) adds a button before the close button that runs `onClick` and dismisses the toast unless `onClick` calls `preventDefault()`, and the toast stays twice as long; `opui-css/react`, `opui-css/svelte` and `opui-css/vue` export `toast` next to `Toaster`, and `opui-css/elements/toaster.js` exports it for HTML and Astro. On the element, `show(message, options)` shows a toast like `toast()`, and `dismiss(toast)` returns a promise that resolves once the toast is gone. A toaster taken out of the page and put back keeps its toasts and the time they have left. Toasts stack in an `<ol popover="manual">` at the end corner of the viewport, or where `side` (`block-start`, `.ui-block-start`) and `align` (`start`, `center`, `.ui-align-start`, `.ui-align-center`) put them, stay for `duration` milliseconds (5000) while the pointer and focus are elsewhere, close with their button (`closeLabel`) or Esc, slide in and fade out before the stack closes the gap, and are announced through a polite live region outside the popover, a critical one through an assertive `role="alert"` region next to it so it interrupts other speech. Styled by `toaster.css`, `callout.css` and `button.css`.
- `ToggleButton` and `ToggleGroup` take a `large` size (`.ui-large`), and `ControlGroup` takes `x-small` (`.ui-x-small`).
- `ToggleButton`, `ToggleGroup`, outlined `Chip` and the outlined `Tabs` track read `--ui-control-border-color` for their border, like outlined buttons, so one token outlines every unfilled control. They keep their current border when a theme doesn't set it.
- `ToggleButton` when checked, `Chip` without `.ui-outlined` and the `Carousel` buttons read `--ui-control-border-color-filled` for their border, like filled buttons.
- `ToggleButton` when checked, the selected `ToggleGroup` item, and selected or current `List` items and `Select` options read the optional `--ui-selected` and `--ui-on-selected`. When unset, toggles are filled with `--ui-primary` and List items and Select options get a primary tint. m3 and shadcn set them to their tonal surface. Descriptions on a selected or current row read `--ui-on-selected` too.
- `ToggleButton` in Vue binds a standalone button's checked state with `v-model`, like `bind:checked` in Svelte and `checked` with `onChange` in React. In a `ToggleGroup` the group's `v-model` still wins.
- `ToggleGroup` takes a bindable `value`: `bind:value` in Svelte, `v-model` in Vue, `value`, `defaultValue` and `onValueChange` in React, and in Astro the `value` of the buttons to check on the server. It is a string, and an array of strings with `multiple`, in the types of every framework, and a `ToggleButton` in the group takes its checked state from it once the group has one. The button's own `checked` or `defaultChecked` is then ignored, and a dev warning says so.
- `Typography` reads a `--ui-rhythm-step` theme token (`0.25rem`). Heading font sizes snap to half a step and heading line heights to a full step with `round()`.
- `Typography` rich text styles `hr`, tables (which scroll sideways in a narrow column), `pre > samp` and preformatted text without `code`.
- `Typography` rich text task lists (an `li` that starts with a checkbox, or with a classless `label` around one) show the checkbox in place of the bullet.
- `Typography` `.ui-icon` sizes an `svg` to `--ui-icon-size` and keeps it from shrinking in a flex row, with `.ui-small` and `.ui-large` for `--ui-icon-size-small` and `--ui-icon-size-large`.
- `Typography` `.ui-swatch` is a small dot for a color legend. It takes a severity class (`.ui-info`) for its tone, or any color in `--_swatch-bg-color`, and defaults to the palette accent of the scope it sits in. In print, `print-color-adjust: exact` keeps its color.
- `Typography` `.ui-tabular-nums` gives every digit the same width, so prices and stats line up.
- `Typography` severity classes (`.ui-success`, `.ui-critical` and the rest) on `.ui-p`, `.ui-caption` and `.ui-overline` color the text in that tone, through `--ui-palette-text`.
- `checkbox.js` sets itself up on import and keeps each checkbox's `indeterminate` property in step with its `data-indeterminate` attribute, also when the attribute changes or a checkbox is added later, and exports `syncIndeterminate(input)`, which sets one checkbox's property from its attribute. The module ships type declarations.
- `compat.css` and the `components.compat` layer, after `components.extended`, hold the browser fallbacks that take more than the browser default, one file per component in `css/compat/`. Each one sits in `@supports`, so it only applies where a browser needs it. `imports.css`, `dist/opui.css` and `dist/opui.components.css` include them. `dist/opui.no-compat.css` leaves them out, and `dist/opui.baseline-<year>.css`, one per Baseline year from 2023, keeps only the ones for features that became Baseline after that year, plus the browser bug fixes, such as the iOS `Menu` submenu anchor. In browsers without `overflow-inline` and `overflow-block` (Chrome before 135, Safari before 26), `Carousel`, `ControlGroup`, `Dialog`, `Drawer`, `Menu`, `Table`, `Tabs`, `ToggleGroup` and rich text scroll through `overflow-x` and `overflow-y` instead, from their files in `css/compat/`.
- `elements/` holds the custom elements, one module per element in `opui-css/elements/*`, such as `opui-css/elements/number-field.js`. Each one defines its element once, renders in the light DOM so the component CSS styles it, and does nothing on the server. It works whether its module loads before or after its markup, drops its listeners, timers and open popovers when the element leaves the page, and picks up again when it comes back. It exports the element's class, named after the component with an `Element` suffix (`NumberFieldElement`), and its types add the tag to `HTMLElementTagNameMap`, so `document.querySelector("opui-number-field")` returns a `NumberFieldElement`. The Astro components load theirs, React, Svelte and Vue load theirs on the client, and HTML pages import them.
- `figma/` holds the default theme resolved for Figma, and the theme tokens page has the example themes too. `figma/themes/default/<mode>.tokens.json` is a DTCG file per mode (`light`, `dark`, `light-more-contrast`, `dark-more-contrast`) for Figma's Import mode: sRGB colors with a hex fallback and the oklch value, lengths in pixels, an alias where a token is another token in that mode, the CSS name as code syntax, scopes and hidden palette steps. `figma/themes/default.figma.json` adds the shadows as effect styles, with each layer bound to variables, and the type roles as text styles. `figma/sync.js` syncs a `.figma.json` into the open file through the Plugin API, with Display P3 colors in a P3 file and a collection per mode on plans with one mode, for the opui Figma plugin and for agents with the Figma MCP server's `use_figma` tool.
- `layers.css` holds the `@layer` order, for importing single component files.
- `layers.css` declares the `theme.palette`, `theme.base`, `theme.custom` and `theme.severity` sublayers. `theme.custom` is empty, for your own tokens: it beats the defaults in `theme.base` and loses to every component and utility. `theme.severity` holds the palette source of `.ui-critical`, `.ui-info`, `.ui-neutral`, `.ui-success` and `.ui-warning`, so a theme that sets `--ui-palette-source` on `.ui-palette` or `.ui-contrast-more` (bootstrap, brutalist and m3 do) no longer gives a severity class on the same element the theme's colors.
- `opui-css` has a command: `npx opui-css skill` copies the agent skill into `.claude/skills/opui`, or into `<path>/opui` with `--dir <path>` for another agent's skills folder. It prints where it wrote and the package version, and refuses to replace an existing copy without `--force`.
- `opui-css/astro`, `opui-css/react`, `opui-css/svelte` and `opui-css/vue` export the component `Props` types (`ButtonProps`, `TabsLabelProps`, …), `MenuItem` and `SelectItem`.
- `opui-css/react` exports React 19 components for every Astro and Vue component. Containers take parts, such as `CardHeader` and `DialogFooter`. Other slots are props (`children`, and camelCased names such as `endText`), form controls (`ToggleButton` and `TabsItem` too) take the native `value`/`defaultValue`, `checked`/`defaultChecked` and `onChange` props, and components that need context, state or effects are marked `"use client"` so the rest also render as React Server Components. It ships compiled ES modules with `.d.ts` types, source maps and declaration maps, so Next.js and server rendering in Vite need no `transpilePackages` or `ssr.noExternal`, and `skipLibCheck` skips its types. `opui-css/components/<Name>/<Part>.react` imports one component or part from the same compiled files, so it shares context with the entry point. `react` and `react-dom` `^19` are optional peer dependencies.
- `opui-css/svelte` exports Svelte 5 components for every Astro and Vue component. Containers take parts, such as `CardHeader` and `DialogFooter`. Other slots are snippets (`children`, and camelCased names such as `endText`), `TextField`, `Textarea`, `Select`, `Range` and `ToggleGroup` support `bind:value`, `Checkbox` and `Switch` support `bind:checked` and `bind:group`, `ToggleButton` supports `bind:checked`, and `Radio` supports `bind:group`. Form controls go back to the value and checked state they started with when their form is reset, and a bound value follows. A `defaultValue` or `defaultChecked` you pass is that starting state, rendered on the server. A `Radio`, `TabsItem` or `ToggleButton` keeps a choice made before the page hydrated, and the bound value of the `Radio`, `Tabs`, `ToggleButton` or `ToggleGroup` takes it. It ships the `.svelte` files with `.d.ts` types and declaration maps, which resolve with `moduleResolution` `"bundler"`, `"node16"` and `"nodenext"`, and its `.ts` modules compiled to JavaScript, so `skipLibCheck` skips its types. `opui-css/components/<Name>/<Part>.svelte` imports one component or part from the same files, so it shares context with the entry point. `svelte` `^5.57` is an optional peer dependency.
- `package.json` has a `svelte` field and a `svelte` export condition on `opui-css/svelte` (`./dist/svelte/index.js`), which `@sveltejs/vite-plugin-svelte` reads to compile the package for SSR in SvelteKit and Vite instead of externalizing it.
- `range.js` (`opui-css/css/js/range.js`) keeps every `.ui-range` `<output class="ui-value" data-live>` and the slider's `aria-valuetext` in sync with its slider once it's imported, after a form reset and in markup added after it loads, with one `input` and one `reset` listener and a `MutationObserver` on the document. `Range.astro` imports it; HTML pages can import it instead of wiring the output themselves. `initRange()` syncs the readouts again.
- `skills` references list each component's `--_` custom properties: the inputs to set, with their descriptions, and the outputs that states derive, like the Component properties tables on the docs pages.
- `skills/opui` is an agent skill shipped with the package. It has one reference per component page that covers every framework, generated from the API data: the parts and their selectors, the props with the class or attribute they render, their values and defaults, the slots, model and notes, the component properties and the theme tokens the stylesheets read, then a section per framework with its import line, slot syntax, hydration notes and the page's first example, and links to the full docs page per framework. Getting started has a section per framework, theming and customizing are written once, and an index maps every exported component and part to its reference.
- `theme.css` adds `--ui-icon-size-x-small` (`0.75rem`) and `--ui-radius-large` (`--ui-radius` times 1.5) to complete their families, and `--ui-shadow-color` under Elevation, the color and base opacity of every default shadow, a `light-dark()` pair of OKLCH colors that is darker in dark mode (`.ui-dark`, also on a part of the page, and the OS preference), so shadows show on dark surfaces.
- `theme.css` adds `--ui-choice-label-offset` to nudge `Checkbox`, `Radio` and `Switch` labels against their control for fonts with unusual metrics, and `--ui-invalid-text` for validation messages, darker in light mode and lighter in dark mode so it keeps its contrast on dark and tinted surfaces. The validation messages and invalid labels of `Checkbox`, `Radio`, `Switch`, `Range`, `TextField`, `Textarea` and `Select` read it.
- `theme.css` adds motion tokens: `--ui-duration-fast` (`0.1s`), `--ui-duration` (`0.15s`), `--ui-duration-slow` (`0.25s`), `--ui-ease`, `--ui-ease-enter` and `--ui-ease-exit`, which starts moving at once so a close doesn't look delayed. Every component transition and animation reads them, multiplied by `--ui-motion`. The optional `--ui-ease-move` is the easing of movement a theme may make springy (the `Tabs` indicator, the press scale, and `Menu`, `Select`, `Tooltip` and toasts as they open, never anything closing), and the optional `--ui-press-scale` scales `Button`, `ToggleButton` and button and link `Chip`s while pressed. Both are unset, so nothing changes until a theme sets them.
- `theme.css` adds `--ui-target-min-size` (`24px`, the WCAG 2.5.8 minimum target size), the least width and height of a `Button` in a field's `.ui-start` or `.ui-end` and of a `Checkbox`, `Radio` or `Switch` whose label is hidden. It follows neither `--ui-density` nor `--ui-space-scale`.
- `theme.css` adds `--ui-focus-ring-inset` for focus rings drawn inside a control, read by `Accordion`, `List`, `Select`, `Tabs` and `ToggleButton`.
- `theme.css` adds icon tokens: `--ui-icon-size-small`, `--ui-icon-size` and `--ui-icon-size-large`.
- `theme.css` adds icon tokens, one for each role an icon plays in the components. Each is an SVG image used as a mask, so only its shape counts and it takes the text color: `--ui-icon-check` (the current item of a `Menu`, the selected option of a `role="listbox"` list and a `Select` picker, and a complete `Stepper` step), `--ui-icon-clear` (the clear option of a `Rating`), `--ui-icon-close` (a `Toaster` toast), `--ui-icon-decrease` and `--ui-icon-increase` (the buttons of a `NumberField`), `--ui-icon-critical`, `--ui-icon-info`, `--ui-icon-success` and `--ui-icon-warning` (the severities of a `Toaster` toast), `--ui-icon-error` (a `Stepper` step with an error), `--ui-icon-expand` (a `Select` and a `TextField` with a datalist), `--ui-icon-hide` and `--ui-icon-show` (the password toggle of a `TextField`), `--ui-icon-next` (the `Carousel` buttons), `--ui-icon-rating` and `--ui-icon-rating-empty` (the stars of a `Rating`), and `--ui-icon-sort` (a `SortableTable` column). The defaults are Fluent UI System Icons. Set the tokens to the icons of your icon set, on `:root` or on one component. `none` isn't supported: leave the component's icon out instead.
- `theme.css` adds choice control tokens: `--ui-choice-fill-max-lightness` (the dark mode cap of a checked fill), `--ui-choice-size-small`, `--ui-choice-size`, `--ui-choice-size-large`, `--ui-switch-thumb-size-x-small`, `--ui-switch-thumb-size-small`, `--ui-switch-thumb-size`, `--ui-switch-thumb-size-large`, `--ui-switch-track-block-size-x-small`, `--ui-switch-track-block-size-small`, `--ui-switch-track-block-size`, `--ui-switch-track-block-size-large`, `--ui-switch-track-inline-size-x-small`, `--ui-switch-track-inline-size-small`, `--ui-switch-track-inline-size` and `--ui-switch-track-inline-size-large`. They are multiplied by `--ui-density`, and each track width is twice its track height until a theme sets it.
- `theme.css` adds overlay tokens, `--ui-backdrop-bg-color` (`--ui-text` at 50% in light mode, a darkened `--ui-surface` at 50% in dark mode) and `--ui-backdrop-blur`, read by `Dialog` and `Drawer`, and inverse surface tokens, `--ui-surface-inverse` and `--ui-on-inverse`.
- `theme.css` adds state and text tokens: `--ui-disabled-opacity`, `--ui-state-hover-alpha-light`, `--ui-state-hover-alpha-dark`, `--ui-state-active-alpha-light`, `--ui-state-active-alpha-dark`, `--ui-state-hover-alpha-accent`, `--ui-state-active-alpha-accent`, `--ui-text-disabled`, `--ui-invalid`, `--ui-font-weight-normal`, `--ui-font-weight-medium`, `--ui-font-weight-semibold` and `--ui-font-weight-bold`. A disabled control without a fill (text and outlined `Button`, `Chip`, an unchecked `ToggleButton`) takes `--ui-text-disabled` for its text and border and no opacity; filled and tonal controls and a checked toggle take `--ui-disabled-opacity`, so a disabled label is never dimmed twice. It also adds `--ui-state-selected-alpha-accent` (`25%`, `15%` with more contrast), the alpha of the primary tint behind selected `List` rows, `Select` options and checked choice cards when `--ui-selected` or `--ui-primary-tonal` is unset.
- `theme.css` adds field text tokens: `--ui-field-label-text-color`, `--ui-field-label-font-size`, `--ui-field-label-font-weight`, `--ui-field-helper-text-color`, `--ui-field-helper-font-size`, `--ui-field-helper-line-height` and `--ui-field-required-text-color`, read by `Checkbox`, `Form`, `Radio`, `Range`, `Switch` and `TextField`.
- `theme.css` declares every derived token (the color roles, the control, chip, choice and switch sizes, the spacing steps, the type roles and the radii) on `:where(html, .ui-palette, .ui-contrast-more)`, and the knobs (`--ui-palette-hue`, `--ui-density`, `--ui-space-scale`, the limits and strengths) on `html` only. A subtree with `class="ui-palette"` derives everything again from the knobs it sets or inherits, so `style="--ui-palette-hue: 30"` or `style="--ui-density: 0.875"` on it works. A theme sets its pinned roles on the same selector so the scopes keep them.
- `theme.css` adds `--ui-fluid-min-inline-size`, `--ui-fluid-max-inline-size` and `--ui-fluid-progress`: the viewport window the heading sizes grow over, and the position in it (0 to 1, from `progress()`) for themes to ramp other values on.
- `theme.css` adds `--ui-density`, a multiplier for `--ui-control-size-x-small`, `--ui-control-size-small`, `--ui-control-size` and `--ui-control-size-large`. Defaults to `1`. `Button`, `Select`, `Textarea` and `TextField` padding shrinks to fit a smaller control size, down to the height of the text.
- `theme.css` adds `--ui-contrast`, set to `more` under `prefers-contrast: more` or with `.ui-contrast-more`. More contrast sets no color: it tightens the knobs the roles derive from (`--ui-text-strength-light`, `--ui-text-strength-dark`, `--ui-border-strength-light`, `--ui-border-strength-dark`, `--ui-field-border-strength`, `--ui-text-disabled-strength`, `--ui-text-max-lightness`, `--ui-text-min-lightness`, `--ui-accent-fill-max-lightness`, `--ui-accent-max-lightness`, `--ui-accent-max-chroma`, `--ui-primary-max-lightness`, `--ui-primary-min-lightness`, `--ui-invalid-min-lightness`, `--ui-palette-accent-min-lightness`, `--ui-palette-border-max-lightness`, `--ui-palette-border-min-lightness`, `--ui-palette-text-max-lightness`, `--ui-palette-text-min-lightness`, `--ui-palette-tint-max-lightness`, `--ui-palette-tint-min-lightness`, `--ui-code-bg-alpha-light`, `--ui-code-bg-alpha-dark`, `--ui-state-active-alpha-dark`, `--ui-state-selected-alpha-accent` and `--ui-focus-ring-width`) on `html` and on `.ui-contrast-more`, which is a scope like `.ui-palette` and takes the text, accent and caret colors from `normalize.css`. `--ui-invalid` gets lighter in dark mode, so invalid fields, checkboxes, radios, switches and ranges keep a visible edge. Components with translucent text or fills (`Badge`, `Button`, `Divider`, `List`, `Menu`, `Progress`, `Spinner`, `Tabs`, `TextField`, `ToggleButton` and `Typography`) keep their own style queries, and a `Range` draws its empty track in the page color with an inset `--ui-field-border-color` edge, so the fill stands out from it. `.ui-contrast-normal` on `html` ignores the OS preference. A theme that sets knobs or `--ui-primary-source` works with more contrast; a role it pins stays pinned.
- `theme.css` adds `--ui-primary-source`, the color `--ui-primary` is derived from within `--ui-primary-max-lightness` and `--ui-primary-min-lightness`. Themes set it to their brand color so more contrast darkens or lightens the primary without changing its hue; setting `--ui-primary` pins it. The example themes set it instead of `--ui-primary`, `--ui-on-primary` and `--ui-primary-text`, so their primary, its text and the text on it follow more contrast (brutalist pins `--ui-primary-text` to its text color for black links). The named colors, `--ui-neutral`, `--ui-invalid`, `--ui-text`, `--ui-text-disabled`, `--ui-border-color` and `--ui-field-border-color` are formulas of the knobs too, so the same values come out at normal contrast and a theme that changes `--ui-text-strong` or `--ui-surface` moves them along.
- `theme.css` adds `--ui-choice-ripple-bg-color` for the `Checkbox` and `Radio` hover halo, `--ui-text` at 20%.
- `theme.css` has font tokens: `--ui-font-body` for text, fields and buttons, `--ui-font-heading` for `h1`–`h6` and `.ui-h1`–`.ui-h6`, and `--ui-font-code` for `code`, `kbd`, `samp` and `pre` in rich text, `.ui-kbd`, `.ui-samp`, `.ui-var`, code blocks and `kbd` in buttons and lists. `--ui-font-heading` is unset and headings follow `--ui-font-body` per element.
- `theme.css` has a spacing scale, `--ui-space-1` to `--ui-space-8`, multiplied by `--ui-space-scale`. Every gap, padding, offset and small size in the components reads it instead of Open Props `--size-*`, and so do native `fieldset`, `dt` and `figure` and `--ui-divider-gap`, so `--ui-space-scale` reaches all of them. Nothing moves at the default scale. Controls keep following `--ui-density`.
- `theme.css` has elevation tokens: `--ui-shadow-elevated` for elevated `Card` and `Accordion`, one shadow in both schemes whose layers take `--ui-shadow-color`, and `--ui-shadow-overlay` for `Dialog`, `Drawer`, `Menu`, the `Select` picker and the `Carousel` buttons, which is `--ui-shadow-elevated` unless a theme sets it, so a theme that sets only the elevated shadow changes both. `--ui-shadow-control` is the shadow of buttons with a variant, a standalone `ToggleButton`, an outlined `Chip` and fields, the file input included (the optional `--ui-field-shadow` overrides it for fields), and `--ui-shadow-surface` the shadow of tonal and outlined `Card` and `Accordion` and of `Callout`, both `none` by default. `--ui-shadow-selected` is the shadow of the selected tab, and `--ui-shadow-scroll` the scroll shadow of `Dialog` and `Drawer` content and of a sticky `Table` header. The elevated, overlay, scroll and selected shadows have the shapes of Open Props `--shadow-3`, `--shadow-3`, `--shadow-4` and `--shadow-1`, written into `theme.css`, and every layer adds its own opacity to `--ui-shadow-color` with relative color, so they darken in dark mode, also in a nested `.ui-dark`.
- `theme.css` has `--ui-border-color-on-raised` and `--ui-field-border-color-on-raised`, the borders inside tonal and elevated `Card` and `Accordion`, `Dialog`, `Drawer`, `Menu` and `Callout` without a severity, and `--ui-border-color-on-filled`, the border inside lists without a variant and table headers. `--ui-border-color-on-raised` is the border mix of `--ui-border-color` and `--ui-field-border-color-on-raised` the field border mix, both against `--ui-surface-elevated`, in both modes, so dividers and field borders inside those surfaces stay visible in dark mode. `--ui-field-border-color-on-filled` is the field border mix against `--ui-surface-filled`. Each of those components sets `--ui-border-color` and `--ui-field-border-color` to the pair on its own root, so `theme.css` names no component. A theme that wants another border on raised surfaces, such as the page background in dark mode, sets the `-on-raised` tokens.
- `theme.css` adds a type scale and type roles. `--ui-font-size-100` to `--ui-font-size-900` are the nine steps (12 to 56px); `--ui-font-size-caption`, `--ui-font-size-small`, `--ui-font-size-body`, `--ui-font-size-control`, `--ui-font-size-large` and the heading sizes read them, and every component reads a role instead of an Open Props step, the `normalize.css` body text and the field helper text (`--ui-field-helper-font-size`, `--ui-field-helper-line-height`) included. `--ui-line-height-tight`, `--ui-line-height-control`, `--ui-line-height` and `--ui-line-height-relaxed` replace the Open Props line heights and the literal ones, and `--ui-letter-spacing-display`, `--ui-letter-spacing-heading` and `--ui-letter-spacing-caps` the literal letter spacings. A theme pins one role, moves one step, or replaces the scale with its own.
- `theme.css` adds shape roles. `--ui-radius-round` is the pill radius, `--ui-radius-small` (`--ui-radius` capped at 5px) rounds `kbd`, inline `code`, `mark`, `var`, `Tooltip`, the file input and rounded avatars, `--ui-radius-x-small` (capped at 2px) the checkbox box, and `--ui-border-width-thick` draws the table head and foot rules, the blockquote bar, the `AvatarGroup` ring, the `Badge` border, the neutral `Chip` dot, the dotted `DescriptionList` rule and the `Tabs` indicator. No component reads an Open Props radius or border size any more.
- `theme.css` adds palette roles. `--ui-palette-strong`, `--ui-palette-on-strong`, `--ui-palette-text`, `--ui-palette-accent`, `--ui-palette-border`, `--ui-palette-tint`, `--ui-palette-on-tint`, and `--ui-palette-tint-subtle` name the shades of the current palette and are re-derived inside every severity scope, and the text, tint, accent and border shades get stronger with more contrast, so `Callout`, `Badge`, `Button`, `del`, `ins` and `abbr` read a role instead of a palette step. `--ui-on-fill` is the near-white text on an intent fill, an intent color kept within `--ui-accent-fill-max-lightness`, `--ui-switch-thumb-bg-color` the unchecked switch thumb, the optional `--ui-switch-track-bg-color` its track, and `--ui-code-block-bg-color` and `--ui-code-block-text-color` the code blocks, a dark block in both modes: `--ui-surface-inverse` and `--ui-on-inverse` in light mode, `--ui-surface-filled` and `--ui-text-strong` in dark mode. Component CSS reads no palette step or Open Props primitive any more.
- `theme.css` adds `--ui-selected-strong` and `--ui-on-selected-strong`, the mark of a selected item that has to stand out from the page on its own (3:1): the current `Carousel` marker, the bar on selected `List` rows and the selected tab of filled `Tabs`. They default to `--ui-primary` and `--ui-on-primary`. `--ui-selected` stays the fill behind a selected item.
- `theme.css` adds `--ui-critical-text`, `--ui-info-text`, `--ui-neutral-text`, `--ui-success-text` and `--ui-warning-text`, the intent colors as text with 4.5:1 on every surface, like `--ui-primary-text` and `--ui-invalid-text`. All seven keep the lightness of their color within `--ui-text-max-lightness` (`0.41`, `0.3` with more contrast) in light mode and `--ui-text-min-lightness` (`0.8`, `0.9` with more contrast) in dark mode, where their chroma is capped at `--ui-text-max-chroma` (`0.1`). `theme.css` adds the three limits too. The critical items of a `Menu` and a `.ui-critical` `Button` with no variant or `.ui-outlined` read `--ui-critical-text`. It also adds `--ui-on-warning`, the text on a warning fill, read by the warning `Badge`.
- `theme.css` adds `--ui-underline-offset`, `--ui-underline-offset-small` and `--ui-underline-thickness-hover`, read by `Link`, rich text links and the underlined text elements.
- `theme.css` adds `--ui-accent-fill-max-lightness`, the highest lightness of an intent color filled under light text (`0.48`, and `0.45` with more contrast), read by the critical, info, neutral and success `Badge` and the fills of critical `Button`s. It also adds `--ui-surface-tonal-hover`, the hover fill of clickable `Chip`s without a `severity` and filled `TextField`, `Select` and `Textarea` fields, and `--ui-code-bg-color`, the background of inline `code` in rich text: `--ui-text` at `--ui-code-bg-alpha-light` (`12%`) in light mode and `--ui-code-bg-alpha-dark` (`10%`) in dark mode, two knobs that more contrast lowers to `6%`.
- `theme.css` adds optional `--ui-button-hover`. `layer` makes `Button` and `ControlGroup` show hover and pressed states as translucent state layers: the text color over filled and tonal buttons, the accent over outlined ones, which keep their text and border. Filled, tonal, primary and critical buttons use `--ui-state-hover-alpha-accent` and `--ui-state-active-alpha-accent`, and neutral outlined buttons the light and dark alphas. `shade-all` shades the fill of every filled and tonal button: filled ones as when unset, tonal ones with `--ui-surface-tonal-hover`, darker in light mode and lighter in dark mode, and a step further when pressed, while outlined ones fill with the accent as when unset. Unset, filled buttons shade their fill and outlined and tonal buttons fill with the accent, as before.
- `theme.css` adds optional `--ui-button-padding-inline`, `--ui-button-padding-inline-x-small`, `--ui-button-padding-inline-small` and `--ui-button-padding-inline-large`, the horizontal padding of `Button` per size (`1.5ex`, `1ex`, `1.25ex` and `2.5ex` when unset).
- `theme.css` adds optional field tokens: `--ui-field-bg-color`, the background of `TextField`, `Textarea` and `Select` fields (`--ui-surface` when unset), `--ui-field-padding-inline`, their horizontal padding (`--ui-space-2` when unset) and `--ui-field-padding-inline-large` for `.ui-large` (`--ui-space-3` when unset), and `--ui-field-placeholder-text-color`, the placeholder color (`--ui-text-subtle` when unset).
- `theme.css` adds optional `--ui-chip-radius`, `--ui-dialog-radius` and `--ui-menu-radius`, the corner radius of `Chip`, `Dialog` and `Menu` (`--ui-radius` when unset). `--ui-menu-radius` also rounds the `Select` picker, which follows `--ui-field-radius` when it's unset.
- `theme.css` adds optional `--ui-tabs-accent`, the color of the selected `Tabs` label and of the indicator with `.ui-line` (`--ui-text-strong` when unset). m3 sets `--ui-primary-text`.
- `theme.css` adds `--ui-text-subtle`, the secondary text role: placeholders, field helper text (`--ui-field-helper-text-color` reads it), descriptions in `List` and `Menu` items, unselected `Tabs` labels and `Table` captions. It is `--ui-text` unless a theme sets it, so nothing changes by default. bootstrap, m3 and shadcn set their muted text colors, and m3 body text is its on-surface color.
- `theme.css` adds optional `--ui-button-accent-filled` and `--ui-button-on-accent-filled`, the fill and text of filled `Button`s and `ControlGroup`s without `.ui-primary` or `.ui-critical`, and of hovered outlined and tonal ones (`--ui-button-accent` and `--ui-button-on-accent` when unset). brutalist fills its buttons with the main blue while text and outlined buttons stay black.
- `theme.css` adds optional `--ui-card-padding`, the padding of `Card`, `Dialog`, `Drawer` and `Accordion` content, headers, footers and actions and of `Checkbox`, `Radio` and `Switch` cards, and `--ui-list-item-padding-inline`, the horizontal padding of `List` and `Menu` items and `Select` options (`--ui-space-3` when unset).
- `theme.css` adds optional `--ui-control-accent` and `--ui-control-on-accent`, a hook pair every control reads: `Button` and `ControlGroup` before `--ui-palette-strong`, and a checked `Checkbox`, `Radio` and `Switch` and the `Range` thumb and fill before `--ui-primary`. `--ui-control-accent: var(--ui-primary)` gives every control the brand color in one line, and `--ui-button-accent`, `--ui-button-on-accent`, `--ui-choice-accent` and `--ui-choice-on-accent` still override it per component. `themes/m3.css` and `themes/shadcn.css` set the pair instead of the four component tokens.
- `theme.css` adds optional `--ui-focus-border-color`, the border color of a focused `Button`, `Checkbox`, `Chip`, `Radio`, `Switch` and `ToggleButton`, of the field of a focused `NumberField`, `Select`, `Textarea` and `TextField`, and of a checkbox or radio card and a `Card` with a focused card link. It gives the focus ring a dark or light edge to sit on, the way Bootstrap, shadcn/ui and GOV.UK pair a bright ring with a border, and the focus ring promises its 3:1 against it instead of the page when it is set. When unset, each keeps its border, and forced colors ignore it. `Checkbox`, `Radio` and `ToggleButton` draw their border from `--_border-color`, and `Switch` its checked track from `--_track-border-color`, like the other controls.
- `theme.css` adds optional `--ui-focus-border-width`, the border width of a focused `Checkbox` and `Radio` and of the field of a focused `NumberField`, `Select`, `Textarea` and `TextField`, never thinner than their own border, so the focus edge can thicken, and, when wider than the ring, the bar under a highlighted link. The extra width grows inward, so the check, the dot and the text don't move, and forced colors keep the wider border.
- `theme.css` adds optional `--ui-link-focus` and `--ui-button-focus`. `highlight` fills a focused link or `Button` with `--ui-focus-highlight` and `--ui-on-focus-highlight` text instead of the focus ring, like GOV.UK, and draws a block-end bar under every line of a link. The outline stays, transparent, so forced colors still draw the ring, and a button with `aria-disabled="true"` keeps the ring. When unset (`ring`), the ring shows.
- `theme.css` adds `--ui-focus-highlight`, the fill of a focused element that highlights instead of showing the ring (`--ui-focus-ring-color` made opaque), and `--ui-on-focus-highlight`, black or white text on it that promises 4.5:1. It switches at OKLCH lightness 0.57, where both reach 4.5:1 on a gray.
- `theme.css` adds optional `--ui-link-font-weight`, the weight of `.ui-link` and of links in `.ui-rich-text` (`--ui-font-weight-bold`, the heading weight, when unset), and `--ui-link-visited-text-color`, the text and underline color of a visited link, which promises 4.5:1 against every surface. Visited links look like the others when it is unset.
- `theme.css` adds optional `--ui-choice-checked`. `mark` makes a checked `Checkbox` and `Radio` keep the surface and border of the unchecked input and draw the check, dash or dot in the choice accent, lifted to text lightness in dark mode. When unset (`fill`), they fill with the accent as before. Forced colors always fill, and `Switch` and checkbox and radio cards don't read it.
- `theme.css` adds optional `--ui-button-shadow`, the shadow of `Button` with `.ui-filled`, `.ui-outlined` or `.ui-tonal` and of the `Copy` confirmation (`--ui-shadow-control` when unset), so a theme can give buttons a shadow without giving one to toggle buttons, outlined chips and fields. `--ui-button-hover-shadow` falls back to it.
- `theme.css` adds optional rich text tokens, rounded to `--ui-rhythm-step` where they set a space. `--ui-rich-text-flow-gap` is the space between paragraphs, lists, blockquotes, tables, `details` and `address` in `.ui-rich-text` (`1.25em` when unset), and code blocks, figures and `hr` take multiples of it. `--ui-rich-text-heading-margin-block-start` and `--ui-rich-text-heading-margin-block-end` are the space above and below `h1` to `h6`, where `em` is the heading's own font size (a multiple of the flow gap per level when unset). `--ui-rich-text-line-height` is the line height of rich text (the surrounding one when unset).
- `themes/bootstrap.css` (a Bootstrap 5 look), `themes/brutalist.css` (a neobrutalism look), `themes/govuk.css` (a GOV.UK Design System look), `themes/m3.css` (a Material 3 look) and `themes/shadcn.css` (a shadcn/ui look) are example themes in the `theme.custom` layer, made only of tokens and with every color in OKLCH. They name their fonts but don't load them, and they copy their originals' contrast at normal contrast, also where it falls short of WCAG. They start with the layer order, so they work wherever they load. Import one, or copy it as a starting point. They set every token on `:where(html, .ui-palette, .ui-contrast-more)`, the selector the library derives on, so `.ui-palette` and `.ui-contrast-more` subtrees keep the theme. With more contrast, they hand their borders, field borders, focus ring and subtle text back to the library with `revert-layer` (brutalist draws its borders in `--ui-text`), so every theme meets the contrast promises. The bootstrap, brutalist, govuk and m3 themes derive their primary color and their tinted surfaces, text and borders from `--ui-palette-source`, so setting it recolors them, also in a `.ui-palette` scope. The gray ramp keeps `--ui-gray-hue`.
- `themes/bootstrap.css` is a Bootstrap 5 look: `oklch(0.91 0.007 248)` field borders, gray secondary default buttons (`oklch(0.525 0.017 245)`, darker than Bootstrap's `oklch(0.558 0.016 245)` so their text reads on the tonal surface and on the tint behind a `kbd` shortcut, and `oklch(0.77 0.014 248)` in dark mode), filled and tonal buttons that shade their own color on hover (`--ui-button-hover: shade-all`), the danger, warning, info and neutral colors and the subtle alert palettes on the severity scopes, white 32px switches, regular weight links, 16px checks with 4px corners and no ripple, `0.75rem` button and field padding, `0.875rem` helper text, 16px paragraph spacing with 8px under headings and only the paragraph gap above them, solid blue selected items, black tooltips, 1.5 line height, no heading letter spacing, no backdrop blur and no shadow on dropdowns, modals and drawers. The contrast test lists its field border as a known exception.
- `themes/brutalist.css` is a neobrutalism look: the `oklch(0.92 0.019 266)` and `oklch(0.283 0.019 276)` pages, white fields and tracks, 500 weight body text, 700 headings, 14px control text, main-colored filled buttons and selected items, state layers instead of fills on hover, black links, main-colored tooltips, 24px card padding, 8px menu item padding, 16px checks with 5px corners, the hard shadow on dialogs and menus, the 1.75 line height of Tailwind prose in rich text, and 36px and 44px small and large controls.
- `themes/govuk.css` is a GOV.UK Design System look, from GOV.UK Frontend 6: `oklch(0.153 0 0)` text on white, the `oklch(0.535 0.136 249.9)` brand blue, `oklch(0.497 0.125 249.8)` links, the `oklch(0.558 0.186 25.6)` error red and `oklch(0.514 0.11 161)` success green kept as they are (`--ui-text-max-lightness` and `--ui-accent-fill-max-lightness` at `0.56`), `oklch(0.404 0 0)` secondary text, `oklch(0.851 0 0)` borders, 2px black field borders, square corners, green default filled buttons with white text and a 2px bottom edge, gray secondary buttons, both darker on hover (`--ui-button-hover: shade-all`), regular weight buttons, labels and links, purple visited links, 40px checkboxes and radios (24px small) that keep their white box and draw a black check and dot (`--ui-choice-checked: mark`), with a gray hover ring, a black-bordered switch, 19px body, label, hint and control text on 25px lines, 16px small text, the 48, 36, 24 and 19px bold heading scale that steps down to 32, 27 and 21px on phones, a 24px lead that steps down to 21px, 5px spacing steps (`--ui-space-scale: 1.25`), 15px paragraph spacing that grows to 20px on wider screens (16px and 20px on the 4px rhythm), headings spaced from their own font size (`1.1em` above and `0.8em` below), 5px field padding, the 3px yellow focus ring on a black `--ui-focus-border-color` edge that thickens to 4px on checkboxes, radios and fields, links and buttons that turn yellow with black text and a black bar under links when focused (`--ui-link-focus` and `--ui-button-focus` set to `highlight`), the link underline offset and hover thickness, 0.5 disabled opacity, Arial, no shadows and no backdrop blur. GOV.UK has no dark mode, so dark mode swaps its black and white and keeps the yellow ring and black edge.
- `themes/m3.css` is a Material 3 look: the error red, 8% and 10% state layers on every button, 24px button padding, 28px dialogs, 4px menus, 8px chips, 18px checkboxes, 2px checkbox, radio and switch borders (`--ui-choice-border-width`), outlined fields that thicken to 2px when focused (`--ui-focus-border-width`), 52 by 32px switches with the outline thumb, 16px field padding, on-surface body text with on-surface-variant secondary text, primary tab labels and line indicators, the inverse surface for tooltips, the emphasized easing, a 32% scrim without blur, no rim on elevated cards and 1.5 line height.
- `themes/shadcn.css` is a shadcn/ui look: the accent tint on hover instead of a fill, the ring color on the border of a focused control, 16px button padding, 32px small and 40px large controls, 8px chips and menus, 10px dialogs, 16px checks with 4px corners, a 32px switch with a white thumb, the destructive red, primary-colored tooltips, 16px icons, 500 weight links, 14px helper text, placeholders, descriptions and tab labels in a slightly darker muted gray (`oklch(0.52 0 0)`, so it reads on tonal and checked cards), 12px field padding, 24px card padding, 8px menu item padding, 0.5 disabled opacity, 1.5 line height with the 1.75 of Tailwind prose in rich text, and the Tailwind shadows for selected tabs and scroll edges.
- `tokens.json` lists every theme token, the palette steps `--ui-color-1` to `--ui-color-16` and `--ui-gray-1` to `--ui-gray-16`, and the instance inputs components read (`--ui-anchor-position-area`) in the W3C design tokens format: its `$type`, description and default as `$value`, and under `$extensions.opui` its CSS variable, tier (`knob` for an input a theme turns, `primitive` for a step derived from the knobs that no component reads, `role`, `hook` for an optional role every component with that job reads with a default of its own, `component`, or `input` for a property set on an element that no theme sets, declared beside each token instead of guessed from its name), dark and more-contrast values (`modes`) and, where a token guarantees one, the contrast ratio it promises and against which tokens. Every `-text`, `-text-color` and `on-` role a component paints text with promises 4.5:1 against its fill or the surfaces it sits on, `--ui-on-fill` against each intent fill and `--ui-palette-text` and the field text colors against every surface included. `--ui-palette-text` is at least `0.8` lightness in dark mode (`--ui-palette-text-min-lightness`), like the intent text roles, so it keeps the promise in every example theme. A plain number, a `px` or `rem` length and an alias of another token are native design token values, with the CSS beside them as `$extensions.opui.css`; the other values are CSS expressions. Tokens that are unset by default have no `$value`, only an `example`. Each group has a fixed key (`intent`, `field`, `named-colors`, `elevation` and so on), the first part of every alias path (`{typography.ui-font-size-100}`) and of the Figma variable names. The theme tokens page shows the same promises. Import it from `opui-css/tokens.json`. The agent skill ships a copy and a table of which token to change for what.
- `utils.css` adds `.ui-focusable`, which shows a `.ui-sr-only` element while it has keyboard focus, for skip links.

### Changed

- `Accordion`, `Button`, `Callout`, `Card`, `Chip`, `ControlGroup`, `DescriptionList`, `Divider`, `List`, `Table`, `ToggleButton`, `ToggleGroup` and `Typography` borders read `--ui-border-width`, and `Checkbox`, `Radio`, `Switch` and `TextField` borders read `--ui-field-border-width`, instead of a hardcoded `1px` or Open Props `--border-size-1`.
- `Accordion` and `Card` with `variant="tonal"` or `variant="elevated"`, and `Dialog`, have a border in the page background color unless a theme sets `--ui-border-color-raised`, so they stay visible on tonal surfaces.
- `Accordion` actions line up with the content and the chevron, with the summary's block padding below them instead of a large gap above.
- `Accordion` clips its animating panel with `overflow-block: clip` instead of `overflow-y: clip`. `Drawer` and rich text use `overflow-inline`/`overflow-block` instead of `overflow-x`/`overflow-y`, so scrolling follows the writing mode. Browsers older than Chrome 135, Firefox 69 and Safari 26 ignore them, so there those containers, `Dialog` content, `ControlGroup` and `ToggleGroup` with `overflow="scroll"` and horizontal `Tabs` without `overflow="wrap"` scroll only through the `overflow-x` and `overflow-y` fallbacks in `compat.css`.
- `Accordion` with `variant="elevated"` uses `--ui-shadow-elevated`, the elevated `Card` shadow, which takes the darker `--ui-shadow-color` in dark mode.
- `Avatar` and `Badge` text uses `--ui-on-primary`, a severity `Badge` the text color of its own fill, and a warning `Badge` `--ui-on-warning`, dark text on the warning fill.
- `Avatar`, `ControlGroup` and `List` sizes follow `--ui-control-size` and `--ui-button-size-*`.
- `Avatar` no longer declares `command`, `commandfor` and `interestfor` as props. They pass through as attributes.
- `Avatar` squircle without `corner-shape` falls back to a rounded square with corners at 27% of its size instead of `--radius-3`. The fallback moved from `avatar.css` to `css/compat/avatar.css`: import it, or `compat.css`, with `avatar.css`, or the squircle is a circle there, as in `dist/opui.no-compat.css`.
- `Avatar` (rounded), `Checkbox`, `Tooltip`, file inputs outside `TextField`, `kbd`, `mark` and `var` never get rounder than `--ui-radius`.
- `Badge` indicator has a ring in the page background color (`--_border-color` is `--ui-surface`) instead of a border in its own fill color, so it stands out on a filled `Avatar` or `Button`.
- `Badge` on a round `Avatar` sits on the avatar's edge instead of the corner of its box.
- `Button` critical keeps light text on a fill a little darker than `--ui-critical`, while its border keeps `--ui-critical`, tonal primary and critical buttons use dark text on a light container in light mode and light text on a dark container in dark mode, and text and outlined buttons use a lighter accent for text in dark mode.
- `Button`, `Callout` links, `Card` links, `Chip`, `ControlGroup`, `Link`, `List`, `Range`, `Table`, `TextField`, the `Checkbox` and `Radio` halo and rich text links only show hover styles on devices that can hover, so they no longer stick after a tap.
- `Callout`, `Card`, `Chip`, `Link`, `List`, `Select`, `Table`, `TextField`, `Textarea`, `ToggleButton` and `ToggleGroup` fade their hover, pressed and selected colors, like `Button`: callout and rich text links, the border of a clickable card, button and link chips, filled fields and toggle buttons over `--_duration`. List and table rows and select options change at once on hover and fade back over `--ui-duration-fast` (`--_item-duration`, `--_row-duration`), so the highlight never lags behind the pointer. Every fade follows `--_motion`, and `Table` reads `--_motion`, `--_duration` and `--_ease` on its root.
- `Callout` tonal severities have a visible fill in light mode, 60% of the third palette step instead of 20% of the second.
- `Card` captions, `Tooltip` text and keyboard hints in buttons use `--ui-line-height-tight` (1.25) instead of 1.3 and 1.2.
- `Card` actions stick to the bottom of stretched cards and wrap.
- `Card`, `Accordion`, `Dialog` and `Drawer` content (`.ui-content`) is a stack: a grid with `--ui-space-3` between its children, which lose their block margins, so a body with a heading, a paragraph and a list needs no CSS of its own. Content with inline children (links, `strong`, chips, buttons) or a `Carousel` keeps the normal flow, and rich text content (`.ui-content.ui-rich-text`) keeps its own spacing. The rules have no specificity, so a `display` or `gap` set on the content wins.
- `Checkbox`, `Radio` and `Switch` keep a light marker in dark mode on a fill darkened to keep 3:1 contrast.
- `Checkbox`, `Radio` and `Switch` line up with the first line of their label and center on it.
- `Checkbox` and `Radio` root selectors are wrapped in `:where()`, like other components.
- `Checkbox` and `Radio` no longer render an empty `.ui-label` without a default slot, and warn in development when they have no label, `aria-label` or `aria-labelledby`, like `Switch`. All three warn in Vue too.
- `Checkbox`, `Radio`, `Switch` and `Progress` align to the middle when there's no visible label, so they center in table cells and lines of text. Give them a hidden label (`hideLabel`, or `.ui-sr-only` in HTML). `Checkbox`, `Radio` and `Switch` then keep a box of at least `--ui-target-min-size` (24px) around the control, so the label stays a 24px pointer target.
- `Chip` uses `--ui-radius` (8px) instead of Open Props `--radius-2` (5px).
- `Chip` small is `--ui-chip-size-small` (28px, the x-small control size) instead of 24px.
- `Chip` labels truncate with an ellipsis unless the chip is `multiline`.
- `Chip` hover is stronger in light mode: button and link chips without a `severity` read `--ui-surface-tonal-hover`, the hover of filled fields.
- `ControlGroup` buttons draw a `ButtonBorder` border under `forced-colors: active`, so the edges between them stay visible.
- `ControlGroup` controls keep their own focus ring outside the control, in `--ui-focus-ring-color` and on top of their neighbours, so it shows on every variant. In a filled group the ring's gap is painted in `--ui-surface`, so the ring shows over the next button's fill, and with `overflow="scroll"` the row is padded by the ring's reach, so the scrolling doesn't clip it.
- `ControlGroup` and `ToggleGroup` wrap onto more rows when they don't fit, instead of overflowing. A `ToggleGroup` draws its outer edge and rounded corners, and dividers sit between items in every row, drawn with `column-rule` and `row-rule` like a `ControlGroup`'s, and as shadows the group clips in browsers without gap decorations (`css/compat/toggle-group.css`). In a `ControlGroup` a text field shrinks to about ten characters before the next control wraps, and the corners where a row ends inside the group stay square. A `ControlGroup` of buttons that isn't outlined draws the lines between them with `column-rule` (`row-rule` when vertical), which the browser draws only between buttons on the same row, so a row that wraps doesn't start with a line. A field covers the rule where it meets another control, so a group with a field draws the lines between its buttons the same way. Browsers without gap decorations or `if()` overlap the buttons and color the later button's start border instead (`css/compat/control-group.css`), as does a group with a field whose label or help text shows or a textarea beside its buttons, a group in forced colors, and a tonal or filled group where `--ui-control-border-color-filled` is set, on the group or an ancestor. In a group whose buttons are all disabled, the lines are dimmed by `--ui-disabled-opacity`, like the buttons.
- `ControlGroup` small buttons are `--ui-button-size-small` (32px) instead of 30px, with the same `--ui-font-size-small` text as a small `Button`.
- `ControlGroup` sizes and variants are Button's own rules, and icon-only buttons in a group stay square and use Button's icon-only icon size, 60% of the button.
- `Dialog` and `Drawer` open over `--ui-duration-slow` (`0.25s`, was `0.2s`) with `--ui-ease-enter`, and close over the same duration with `--ui-ease-exit`, as the tokens describe. `Dialog` used to close at once.
- `Dialog`, `Drawer` and the `Select` picker take `--ui-shadow-overlay`, the shape of Open Props `--shadow-3`, like `Menu`, instead of the raised card shadow (`Dialog`) or `--shadow-2` (`Drawer` and the picker).
- `Dialog` has a maximum height. The header and footer stay in place and the content scrolls.
- `Dialog` width is set with `--_max-inline-size` (`60ch` by default), and the dialog keeps its margin on small screens at any width.
- `Dialog` fades and scales in from `0.96` with its backdrop, and fades and scales out again when it closes, kept in the top layer by `display` and `overlay` transitions with `allow-discrete`.
- `Dialog`, `Fieldset`, `Range` and `Select` start every id they generate with the `id` you pass, or with one id they generate per instance when `id` is missing or empty: for `id="x"` the label is `x-label`, the start and end text `x-start-text` and `x-end-text`, the affixes, top and bottom of a Select `x-start`, `x-end`, `x-top` and `x-bottom`, the tick list of a Range `x-list`, the title of a Dialog `x-title` and, for a Fieldset rendered as another element, the legend `x-legend`.
- `Divider` that is a direct child of a card has no margin, since the card's gap spaces it.
- `Drawer` backdrop dims and blurs like `Dialog`, through `--ui-backdrop-bg-color` and `--ui-backdrop-blur`. `.ui-backdrop-transparent` still removes it.
- `Drawer` content padding is `--ui-space-3`, like its header and footer and `Dialog`. It was `--ui-space-4`, so the title and the body text didn't line up.
- `Drawer` header headings take the free space and the header has a gap, so several actions line up at the end. Without a heading, the first icon-only button is pushed to the end.
- `Drawer` sits on `--ui-surface-elevated`, like `Dialog` and `Menu`, and borders and field borders inside it read `--ui-border-color-on-raised` and `--ui-field-border-color-on-raised`.
- `Drawer` footer spaces its items and the buttons in its `.ui-actions` by `--ui-space-2`, like `Dialog`, instead of `--ui-space-3`. `card.css` declares `--_footer-gap` for both, so setting it changes either.
- `FieldGroup` `orientation="horizontal"` (`.ui-horizontal`) lines the fields up at their end and lets a `TextField`, `Textarea`, `Select` or `NumberField` grow from `--_field-min-inline-size` (`11rem`) to share the row, so a field and its button sit on one line, with a `--ui-space-3` gap. A group of choice controls keeps its `--ui-space-4` gap.
- `Fieldset` rendered as another element with `as` names itself from its `FieldLegend`: it gets `aria-labelledby` pointing at the legend, which takes a generated id in every framework, also over an `id` you pass the legend, unless you pass `aria-label` or `aria-labelledby`.
- `Form`, `Fieldset` and `FieldLegend` type `as` in Vue as `"div" | "form"`, `"div" | "fieldset"` and `"legend" | "p"`.
- `Link` (`.ui-link`) and rich text links darken in light mode and lighten in dark mode on hover and focus, from their own color so they keep the contrast of `--ui-primary-text`, and their underline gets `--ui-underline-thickness-hover` (`3px`) thick.
- `List` start and end icons are smaller: `--ui-icon-size` by default and `--ui-icon-size-small` in dense lists (were `--ui-icon-size-large` and `--ui-icon-size`).
- `List` dense rows keep the default inline padding, so they line up with `Card` content.
- `List` rows with any `aria-current` but `false`, like `true` on the chosen button, get the current row look, not only `aria-current="page"`, also in a `Menu`.
- `List` only styles direct `li`/`option` children (and options in a `[role="group"]`) as rows, so nested lists inside a row stay normal lists. Headings and paragraphs in `.ui-text` have no margin.
- `List` selected and current rows and options, checked `option`s included, have a bar on their start edge in `--ui-selected-strong`, or a check at the end instead in a `Menu`, a `role="listbox"` list and a `Select` picker, and a stronger fill than hover (`--ui-state-selected-alpha-accent`, the hover tint with more contrast), so they no longer differ from a hovered row by a tint alone. Images and videos in `.ui-start` are `3.5rem` and `4rem` instead of `56px` and `64px`.
- `List` has rounded corners (`--_radius`, `--ui-radius`) and clips its rows to them, but still draws the focus ring of a control in `.ui-start` or `.ui-end` of a `.ui-flush` row inside it. As a direct child of a `Card`, `Accordion` or `Dialog` it stays square, since they round and clip it.
- `List` dense rows are `--ui-control-size-small` tall instead of a fixed `--ui-space-7`, so they follow `--ui-density`.
- `List` `flush` (`.ui-flush`) also drops the block padding of the list, like `Table` `flush` drops its margin, so a flush list in a card sits on the card padding.
- `Progress` outlines its track with `--ui-field-border-color`, so the empty part is visible.
- `Progress` fills its bar with `--ui-selected-strong`, the role the done part of a `Stepper` and a tracked `Timeline` reads, so a theme that sets it recolors all three. It's `--ui-primary` unless a theme sets it.
- `Radio` is `--ui-choice-size` (20px) like `Checkbox`, instead of 18px.
- `Range` pressed thumb ring reads `--ui-state-active-alpha-light` and `--ui-state-active-alpha-dark`, so it is 30% in dark mode (was 20%).
- `Range`, `Switch` and `TextField` invalid states use `--ui-invalid`.
- `Range` generates the `<datalist>` id when `items` or the `datalist` slot is used, so `list` is optional.
- `Range` in Vue keeps its readout in step with the thumb through `opui-css/css/js/range.js`, like Astro, with `data-live` on the `<output>`. Custom readout content in `value-text` renders from the value you bind.
- `Range` with a value readout announces each step once, with its unit: the input gets `aria-valuetext` (the value and `valueSuffix`) and the `.ui-value` output `aria-live="off"`, so screen readers no longer read the value twice. In HTML, `range.js` keeps `aria-valuetext` in sync when the output has a `data-suffix`.
- `Range` formats the `valueSuffix` readout and its `aria-valuetext` with `Intl.NumberFormat`, with the decimals of `min` and `step` and no grouping: for the `lang` you pass on the server, and for the closest `lang` in the page through `range.js`, so a German page shows 0,5 kg instead of 0.5 kg. `lang` goes to the `<label>` instead of the `<input>`, so the readout takes it too.
- `Range` thumb, halo and track fill follow `--_accent` on `.ui-range`.
- `Select` picker marks the selected option with the browser's check (`::checkmark`) at the end, drawn from `--ui-icon-check`, instead of hiding it. A `.ui-icon-checked` in the option replaces it.
- `Select` group labels take a shade of the picker's surface and `--ui-text` for their text, instead of fixed gray steps.
- `Select` chevron flips when the picker opens, with a transition, like the `Accordion` flip marker.
- `Select` and `TextField` auto-suggest arrows share one size and inset, and keep the same space for the arrow, at every size.
- `Select` and `TextField` auto-suggest arrows are a chevron instead of a triangle.
- `Select` picker paints `--ui-surface-elevated` with the raised edge and the `-on-raised` borders inside, like `Menu`, instead of `--ui-surface-filled` with a field border, so a theme that tunes overlays changes both.
- `Spinner` shows on busy buttons and links that have `aria-describedby`. Other elements with `aria-describedby` still opt out, for the progress bar pattern.
- `Spinner` styles have no specificity (`:where()`), so a page's own `::before` rules override them, like other component roots.
- `Spinner` ring is at least `--ui-border-width-thick` and grows with its size (`0.1875em`, `3px` at `16px`).
- `Switch` unchecked track border is `--ui-field-border-color`, like the checkbox and radio borders, instead of the dot color.
- `Switch`, `Tooltip`, `Textarea`, `Table`, `List`, `Tabs`, `Spinner`, `Dialog`, `Drawer` and the typography styles use logical properties only (`min-inline-size`, `inset-inline-start`, `padding-block`/`padding-inline`, `resize: block` …), so they follow the writing mode, and the `DescriptionList`, `Range`, `Select` and `TextField` container queries read `inline-size`. Horizontal left-to-right rendering is unchanged.
- `Switch` marks an invalid switch like an invalid `Checkbox` or `Radio`: its track border is `--ui-invalid`, and a checked track turns red with a `--ui-on-fill` thumb, instead of a ring around the track that pushed the focus ring out and looked like a focus ring in forced colors.
- `Switch` turns on and off at once, like `Checkbox` and `Radio`: the track and the thumb no longer transition, so a click or tap shows right away. `switch.css` no longer declares `--_motion`, `--_duration` and `--_ease`, which `choice.css` still sets for the card focus ring.
- `Table` centers a checkbox that is alone in a cell and shrinks the column to fit it.
- `Table` dense cells have less block padding.
- `Tabs` slide the selected pill, or the line of `.ui-line`, to the tab you select over `--_indicator-duration` (`--ui-duration`), where anchor positioning works: one indicator on the root follows the checked tab's `::before`, and each tab draws its part of the track on its `::after`. Elsewhere, and in forced colors, the pill stays on each tab and fades.
- `Textarea` minimum height is three lines plus padding at every size. Small was a fixed 64px.
- `TextField`, `Select` and `Textarea` with `.ui-small` set their text in `--ui-font-size-small`, like small buttons, instead of the default size. On iPhone and iPad, fields of every size set their text in `--ui-font-size-control` or 16px, whichever is larger (`css/compat/text-field.css`), since iOS Safari zooms in on a focused field with text under 16px, also when a theme sets smaller control text.
- `TextField` file input takes `--ui-field-shadow` like other fields instead of an inset Open Props shadow, so it's flat by default.
- `TextField`, `Textarea`, `Select` and `Range` with `spread` split their container into equal label and field columns, so spread fields line up at one width. The fixed `30ch` textarea and `25ch` range minimums are gone.
- `TextField`, `Textarea` and `Select` keep a `12ch` minimum width in table cells.
- `TextField`, `Textarea` and `Select` fit a `.ui-button` in `.ui-start` or `.ui-end` to the field's height, or to the control's first line in a `Textarea` and in a field with `.ui-top` or `.ui-bottom`, and center it there, `--_affix-inset` from the border on each side: `--ui-space-1`, less where that leaves no room for `--ui-target-min-size` (24px), the minimum target size, which the button never goes under. It doesn't make the field taller unless that box is under 24px. Then the button starts at the box's top, and an x-small field at a compact `--ui-density` or with `.ui-top` or `.ui-bottom` grows to fit it. Content taller than the button keeps the same distance from the border and makes the field taller, where it touched the border before. In a `Textarea` it starts `--_affix-inset` below the field's top instead of 8px, the text's padding, which also hung a button below the first line.
- `TextField` and `Textarea` with a `label` name the control with `aria-labelledby`, the label and then the `start` and `end` affixes, and describe it with the start text, top, bottom and end text through `aria-describedby`, like `Select`. A hint or an error is read once, as the description, instead of in the name. The part ids start with the `id`: `x-label`, `x-start`, `x-end`, `x-top`, `x-bottom`, `x-start-text` and `x-end-text` for `id="x"`.
- `ToggleButton` when checked is filled with `--ui-primary` (or `--ui-selected`) instead of a tint, and keeps the fill on hover, also in a `ToggleGroup`: it lightens a fill darker than L 0.3 and darkens the rest, like a filled `Button`, and doesn't change on a disabled button. Its focus ring takes `--ui-on-selected` (or `--ui-on-primary`), so the inset ring shows on the fill in dark mode.
- `ToggleButton` standalone and `Chip` outlined take `--ui-shadow-control` like buttons (none by default), and toggle corners are capped at half the control height, those of a `ToggleGroup` at half the height of its size, so a round `--ui-button-radius` doesn't clip grouped toggles.
- `ToggleButton` and `ToggleGroup` text shrinks with the size like `Button`: `--ui-font-size-small` when small and `--ui-font-size-caption` when x-small.
- `ToggleButton` disabled state uses `--ui-disabled-opacity` like `Button`, and `--ui-text-disabled` when unchecked (a checked one keeps its selected text color), its hover is `--ui-text-strong` at `--ui-state-hover-alpha-light` and `--ui-state-hover-alpha-dark` instead of black and white, so it follows a theme's grays, and `ToggleButton` and `ToggleGroup` read `--ui-button-size*` instead of `--ui-field-size*`.
- `ToggleButton` grows from `--ui-button-size` with its content instead of having a fixed height.
- `ToggleGroup` is in the `components.extended` layer, like `ControlGroup`.
- `ToggleGroup` warns in development when it has no `aria-label` or `aria-labelledby`, since a single-select group renders `role="radiogroup"`, which needs a name.
- `Tooltip` without an arrow scales in from `0.96` as it fades, like `Menu`. Tooltips with `.ui-arrow` only fade, since a scale would move the arrow's containing block. Every tooltip opens with `--ui-ease-enter` and closes with `--ui-ease-exit`, also in the compat layer.
- `Tooltip` uses `--ui-surface-inverse` and `--ui-on-inverse`.
- `Typography` inline `code` in rich text is rounded with `--ui-radius-small` (5px by default) like `kbd` and `mark`, instead of the full `--ui-radius`.
- `Typography` rich text spacing derives from one flow space (`1.25em` of the body text), and every margin derived from it snaps to `--ui-rhythm-step`. Headings get more space above than below, so they sit closer to the text they introduce, and lists with block content, description lists, `details`, `address`, code blocks and figures follow the same rhythm.
- `Typography` rich text list gutters are measured in `ch`, so two-digit markers fit, and ordered lists widen their gutter for three- and four-digit numbers, also with `start`. Bulleted and numbered list text starts at the same position.
- `Typography` `sup` and `sub` are `0.75em` in rich text and in `.ui-sup` and `.ui-sub`, and no longer change the line height.
- `Typography` rich text figure captions are muted and start-aligned under quotes, code blocks and tables.
- `Typography` heading group subtitle line heights and spacing, in rich text `hgroup` and `.ui-hgroup`, snap to `--ui-rhythm-step`.
- `Typography` headings share one line height, `1em + 0.5rem` rounded to `--ui-rhythm-step`, in rich text and in the `.ui-h1`–`.ui-h6` classes.
- `Typography` rich text headings, `pre` and `small` scale with the inherited font size.
- `Typography` `.ui-small` is at least `0.75em` of the surrounding text instead of `0.5em`, like rich text `small`, so it stays in proportion in headings.
- `Typography` styles `.ui-overline`, `.ui-hgroup` and rich text `hgroup`, and `.ui-code-block` and rich text `pre`, with one rule per pair in `@scope (…) to (.ui-not-rich-text)` blocks, and `link.css` styles `.ui-link` and rich text links the same way, so the class and the classless version can't drift. Rich text links need `link.css` next to `typography.css`.
- `Typography` rich text `var` uses the monospace font and wraps long names, like `.ui-var`.
- `Typography` overlines (`.ui-overline` and the first paragraph of a heading group) read `--ui-text-subtle` instead of a lighter or darker `--ui-text` of their own, and follow more contrast through the role.
- `Typography` `kbd`, `var`, `.ui-kbd` and `.ui-var` sit on `--ui-surface-inverse` with `--ui-on-inverse` text, like `Tooltip`, instead of on `--ui-text`.
- `--ui-field-border-color` is a 50% mix of the text color into the page (3:1 or more) instead of `--ui-border-color`, so fields, checkboxes, radios, switches and the range track have a visible boundary without more contrast. Inside filled surfaces it mixes into `--ui-surface-filled` the same way. The example themes keep their own.
- `normalize.css` sets `box-shadow` instead of `-webkit-box-shadow` on autofilled fields, and font and color inheritance on `::file-selector-button`.
- `normalize.css` reads `--ui-line-height-relaxed` for the page line height, `--ui-icon-size-large` for an `svg` without `width` (`1.5rem` instead of `2rem`) and `--ui-space-7` for the scroll margin of `:target`.
- `normalize.css` page smooth scrolling follows `--ui-motion`, like every transition, instead of only `prefers-reduced-motion`: `.ui-motion-off` and `.ui-motion-on` on `html`, or a theme that sets `--ui-motion`, turn it off and on. It reads the token with `if()`. A browser without `if()` follows `prefers-reduced-motion` and the two classes, not a theme's token.
- `normalize.css` gives a plain file input its field border, radius and shadow and `--ui-text` text, which `button.css` set before with the inverse surface color, so importing `button.css` on its own no longer restyles file inputs.
- `normalize.css` fills an `svg` without a `fill` attribute with `currentColor` instead of black, so icons from sets that leave `fill` out, such as Material Symbols and Fluent UI System Icons, take the text color. It applies to every `svg` on the page, charts and logos included, wherever their shapes rely on the default black.
- `open-props` is an optional peer dependency. `theme.css` and the example themes read nothing from Open Props: the sizes, radii, border size, easings, font stacks, font weights, hues and shadow shapes they took from it are written into `theme.css` with the same values, so `tokens.json` holds no `var(--size-2)` style values. `css/imports.css` no longer imports `open-props.css`, so a bundler build needs no `open-props` package. `dist/opui.css` still bundles Open Props, and `opui-css/open-props` (`dist/op.css`) and `open-props.css` stay for your own CSS. Install `open-props` only to import `open-props.css`.
- `open-props.css` imports the Open Props files one by one instead of `open-props/src/index.css`, so `dist/op.css` and `dist/opui.css` no longer contain Open Props' `@custom-media` rules. Import `open-props/media` yourself if a PostCSS plugin reads them.
- `opui-css/vue` exports compiled ES modules with `.d.ts` types, source maps and declaration maps instead of the `.vue` and `.ts` sources, so Nuxt and server rendering in Vite need no `build.transpile` or `ssr.noExternal`, `skipLibCheck` skips its types, and your `compilerOptions` only apply to your own code. The components are compiled in production mode, so Vue no longer warns at runtime about a prop of the wrong type. `opui-css/components/<Name>/<Part>.vue` resolves to the same compiled files, so it shares context with the entry point, and the sources stay in the package for the maps and for reading.
- `package.json` `homepage`, the README and the agent skill link the docs at `https://opui.dev` instead of the netlify.app address, which redirects there with the path.
- `theme.css` severity scopes (`.ui-critical`, `.ui-info`, `.ui-neutral`, `.ui-success`, `.ui-warning`) take their hue from the intent tokens, and `.ui-neutral` its chroma too, so a theme's `--ui-success` reaches every success surface and its `--ui-neutral` every neutral one. `--ui-neutral` and the named colors set the lightness of palette steps 7 and 9 as a number instead of reading the element's own palette, so a severity class also keeps its palette on a `.ui-palette` or `.ui-contrast-more` element.
- `theme.css` `--ui-primary` is `oklch(0.499 0.191 222.8)` in light mode, with the hue of the palette source and a chroma that follows `--ui-palette-chroma` up to `0.191`, and `--ui-color-6` in dark mode, and `--ui-on-primary` is dark in dark mode, so text on primary and primary text both pass WCAG AA in light and dark.
- `theme.css` declares every palette knob, `--ui-palette-hue`, `--ui-palette-chroma`, `--ui-palette-hue-rotate-by`, `--ui-gray-hue` and `--ui-gray-chroma`, and `core/palette.css` no longer declares its own, which disagreed with `theme.css` and never applied. `.ui-palette` and the severity scopes inherit the knobs from their ancestors instead of resetting them to the defaults.
- `theme.css` derives `--ui-on-primary` from `--ui-primary` and `--ui-on-warning` from `--ui-warning` with relative color, from the fill's relative luminance (the `y` of `xyz-d65`): white text on a fill below 0.182 and near-black above it, so either side keeps 4.5:1 and custom primaries get readable text.
- `theme.css` named colors use the Open Props hue angles: `--ui-blue` is `240`, `--ui-green` `145`, `--ui-orange` `75` and `--ui-red` `25`, like the severity scopes. `--ui-info` and `--ui-blue` use `240`, the same blue as the `.ui-info` palette. White text on an info `Badge` is 4.58:1.
- `theme.css` is in the `theme.base` layer instead of `theme`, so overrides in `@layer theme` or `@layer theme.custom` beat the defaults wherever they load.
- `theme.css` control and chip sizes are in `rem` (`1.75rem`, `2rem`, `2.5rem` and `3rem`, and `1.5rem` for the x-small chip) instead of `px`, like the choice, switch and icon sizes, so the whole size scale follows the root font size. At the default 16px the sizes are the same, except `--ui-control-size-large`, which is 48px instead of 46px, so large buttons, fields, toggles and selects grow by 2px.
- `theme.css` prints the light scheme: in print, `html`, `.ui-light` and `.ui-dark` set `--ui-color-scheme` and `color-scheme` to `light`, so a page shown in dark mode, by `.ui-dark` or by the OS preference, prints dark text on white paper instead of the dark scheme's pale text.

### Fixed

- `Accordion` summaries, `Button`, `Checkbox`, `Radio` and `Switch` labels, `List` items on touch screens, `Tabs` labels, `ToggleButton` and disabled fields, fieldsets and ranges can no longer be selected by a press or a drag in Safari, which only reads `-webkit-user-select`, like in Chromium and Firefox.
- `Accordion`, `Avatar`, `Divider`, `List`, `Progress`, `Range`, `Select`, `Switch`, `Tabs`, `Textarea`, `TextField` and `ToggleButton` keep their state visible in forced colors mode: selected tabs, toggles and list items use `SelectedItem`, with `SelectedItemText` for a list item's description too, switches, ranges, progress bars and dividers are drawn with system colors, focused fields get a `Highlight` outline, elevated and tonal accordions get a `CanvasText` border, and letter avatars an outline.
- `Accordion` focus ring is drawn inside the summary of `.ui-elevated`, `.ui-outlined`, `.ui-tonal` and grouped accordions, so the card no longer clips it, and outside the summary of a transparent accordion, so it no longer cuts through the text and marker.
- `Accordion` content in a transparent group lines up with the summary.
- `Accordion` group styles only apply to a `Card` with `role="group"` whose accordions are direct children, and to their own `summary`, so a card with an accordion inside its `CardContent` keeps its layout and padding, and an accordion nested in the first or last item keeps its own corners and focus ring.
- `Accordion` summaries with a marker let their items shrink and cut off with an ellipsis, so a badge, a chip or a long word no longer pushes the marker out.
- `Accordion` actions keep room for the focus ring, so the last button's ring isn't clipped in a transparent group.
- `Accordion`, `Callout`, `Card` and `Dialog` keep together on one page in print (`break-inside: avoid`), so a printed card or callout no longer starts on one page and ends on the next. One taller than the page still breaks.
- `Anchor` with `trigger="hover"` and `Tooltip` stay visible on a scrolled page in Chrome 141. `normalize.css` gives `html` `min-block-size: 100%` instead of `block-size: 100%`, and `body` `min-block-size: 100svb` instead of `100%`, because `position-visibility: anchors-visible` hid every popover whose trigger was below the first screen.
- `Anchor` and `Badge` render a user `id` on the root. With `trigger="hover"` it stays the floating element's id.
- `Anchor`, `Badge`, `Divider`, `Drawer`, `TableColumn`, `Tabs`, `ToggleButton` and `ToggleGroup` in Vue update derived values when props change.
- `Anchor` and `Tooltip` inside a `Badge` no longer shift their floating element by the badge's offset.
- `Anchor` and `Tooltip` default to `self-` `position-area` keywords (`self-start self-end` and `self-block-start`), so floating content follows its own writing direction and mirrors in a right-to-left part of a left-to-right page. Before, it followed the page's direction while its margins followed its own.
- `Anchor` hover cards and `Tooltip` open in browsers without interest invokers: `css/compat/anchor.css` and `css/compat/tooltip.css` show them while the trigger is hovered or has keyboard focus, and a hover card also while the pointer or the focus is in it. A tap follows the hover card's link there. A tooltip isn't in the top layer there, so an ancestor that clips its overflow and has a transform, filter or containment can hide it, and later content can cover it.
- `Avatar` and `Badge` no longer shrink in flex rows, so an icon with a badge in an `Accordion` summary keeps its size next to long text. A bare `img` or `svg` in the summary keeps its size too.
- `Avatar` in Vue accepts arrays and objects for `class`, and the image always has an `alt` attribute.
- `Avatar`, `Button` and `Chip` share one helper for `disabled`, `aria-disabled`, `href` and `type`, so they render those attributes the same way in every framework.
- `Avatar` button and link avatars dim and show the not-allowed cursor when disabled.
- `Avatar`, `Badge`, `Button`, `Checkbox`, `Chip`, `List`, `Progress`, `Radio`, `Range`, `Switch`, `Tabs`, `ToggleButton`, `Tooltip` and `Typography` keep their fills in print with `print-color-adjust: exact`, also when the browser doesn't print backgrounds, so text on a fill no longer prints pale on white paper and a state no longer disappears: letter and icon avatars, badge counts and dots, filled buttons, checked checkboxes, radios and switches, tonal chips, selected list items, the progress and range fill, the selected tab, checked toggle buttons, tooltips, `kbd`, `var`, `.ui-kbd` and `.ui-var`.
- `Avatar`, `Button`, `Checkbox`, `Chip`, `ControlGroup`, `Dialog`, `Drawer`, `Fieldset`, `List`, `Radio`, `Switch`, `Tabs` and `ToggleGroup` keep the attributes they set, such as `aria-labelledby`, `role` and `type`, when a caller passes the same attribute as `undefined` or `null`, as a wrapper that forwards its props does. This holds for every component in React, Svelte and Vue, and in Astro for the components that render a dynamic tag or a custom element.
- `Badge`, `Tabs` and `Tooltip` transitions respect `--ui-motion` (`prefers-reduced-motion`, `.ui-motion-off`).
- `Badge` indicators mirror in RTL.
- `Badge` dots sit in every corner, not only the default one.
- `Badge` and `Anchor` no longer write the unused `--_anchor-inset`, and aligned badges no longer write `--ui-anchor-position-area`.
- `Badge` with `invisible` hides the indicator from screen readers too.
- `Badge` in Astro renders `label` and the `indicator` slot next to each other, without the space its source line break added, like React, Svelte and Vue.
- `Button` `kbd` uses the button's text color, also on hover, instead of 80% of it, so it passes contrast on colored buttons.
- `Button` critical text buttons have readable text on tonal surfaces in dark mode.
- `Button`, `Checkbox`, `ControlGroup`, `Radio`, `Switch` and `ToggleButton` style `aria-disabled="true"` like `disabled`, on a link or a focusable button (`<a class="ui-button" aria-disabled="true">`) or on the input: dimmed, with a `not-allowed` cursor, and buttons and toggle buttons get no hover or press styles. In forced colors a `Button` or `Chip` with `aria-disabled="true"` gets `GrayText`, like a native disabled button. The browser doesn't block the change of an input, so a script has to.
- `Button` disabled text color applies to text and outlined buttons in every color. Filled and tonal buttons keep their own text color and dim with the disabled opacity, so the label stays readable on the fill.
- `Button`, `Card`, `ControlGroup`, `Range`, `Select`, `Tabs`, `Textarea`, `TextField` and `ToggleButton` focus rings grow in like the rest of the library. `normalize.css` animates the `:focus-visible` ring with the `ui-focus-ring` keyframes instead of an `outline-offset` transition, which a component's own `transition` overrode.
- `Button` without a variant shows its pressed background while held with the keyboard, like outlined, tonal and filled buttons.
- `Button` with `.ui-primary` or `.ui-critical` and an accent darker than L 0.3 lightens on hover and press like other buttons, instead of darkening further.
- `Button`, `Checkbox`, `Chip`, `ControlGroup`, `List`, `Radio`, `Range` and `Switch` match a disabled control with `:disabled` instead of the `[disabled]` attribute, so inside a disabled `fieldset` they look disabled and show no hover or active state, and a `Range` gets the disabled thumb and no hover ring.
- `Button` marks the current page (`aria-current="page"`) with `SelectedItem` in forced colors, where its tint is dropped.
- `Button` with `aria-current="page"` stands out from the other pages in every variant and theme. In a filled `ControlGroup` it drops its fill and reads like a text button, where it kept the light text of the fill on a pale tint. Text and outlined buttons take `--_accent` at `--ui-state-selected-alpha-accent` instead of the pressed tint, tonal ones shade their fill by that alpha away from the text, and all three use `--ui-text-strong`, where the current page barely differed from tonal neighbors in some themes and lowered gray text under 4.5:1. A filled, outlined or tonal `Button` outside a group shows the current page too, like one in a group.
- `Callout` keeps bare text and inline elements like links on one line instead of stacking them as separate rows.
- `Callout` only uses the icon layout for a direct child `svg`, keeps its content at the top when stretched, and no longer shows lighter corners.
- `Callout` rich text inside `.ui-content` no longer gets doubled margins.
- `Callout` icons take the severity color with `color`, so fill icons no longer get a colored outline.
- `Callout` links in a tonal callout take the hover color on keyboard focus too, and it keeps 4.5:1 on the tonal background.
- `Callout` only gives plain links and `.ui-link` its text color, so a link `Avatar`, `Button` or `Chip` in a callout or a toast keeps its own, where a filled link button's label took the color of its fill.
- `Callout` severity icons use a lighter palette step in dark mode, so they reach 3:1 against the callout.
- `Callout` with `variant="tonal"` no longer renders `.ui-tonal`, a class without a rule.
- `Callout` icon offset scales with the font size.
- `Card` wraps long words.
- `Card` actions line up a plain last button with the content, and no longer pull a filled or outlined last button to the edge.
- `Card` actions keep the edge padding for a text button with extra classes.
- `Card`, `Checkbox`, `Radio`, `Select`, `Switch`, `ToggleButton` and the busy spinner read the local `--_motion`, so `style="--_motion: 0"` turns off their focus ring animation, hover halo, picker animation and spin speed-up like other components.
- `Card`, `Accordion` and `Dialog` actions line up the label of a text button at their start or end with the content: the button pulls itself out by its padding and border (`--_actions-shift`), as far as the focus ring stays inside the padding the actions have (`--_actions-padding-inline`), in a dense or spacious card and an accordion group too. Accordion actions had no compensation, so the label sat 14px inside the content edge.
- `Card` content followed by a divider has no bottom padding, so the divider sits evenly between the two contents.
- `Checkbox` and `Radio` show a red border when invalid and unchecked (`aria-invalid="true"` or `:user-invalid`), like Switch and TextField. Before, only a checked control turned red.
- `Checkbox` forced-colors styles apply to checked and indeterminate boxes.
- `Checkbox` and `Radio` required asterisks in stacked labels sit after the label in RTL.
- `Checkbox` and `Radio` show their hover and press halo without `core/utils.css`, so `dist/opui.components.css` and single-file imports get it too.
- `Checkbox` and `Radio` put the hover and press halo behind the input with `isolation` and `z-index` instead of 3D transforms, so a long list of them no longer adds several compositor layers per control.
- `Checkbox`, `Radio` and `Switch` required asterisks, and the `Fieldset` legend's, follow the last word of a wrapped label instead of jumping to the end of the row.
- `Checkbox`, `Radio`, `Switch`, `TextField`, `Textarea`, `Select` and `Range` pass a user `aria-invalid` to the control when `error` isn't set.
- `Checkbox` unchecked border reads `--ui-field-border-color` like Radio and the text fields.
- `Checkbox`, `Dialog`, `Drawer`, `Radio`, `Switch`, `Tabs` and `ToggleButton` no longer need Vite's `import.meta.env` types or runtime for their dev-only warnings. Where `import.meta.env.DEV` is undefined they read `process.env.NODE_ENV`, so the warnings also show with webpack and Turbopack (Next.js).
- `Checkbox`, `Radio` and `Switch` no longer point `aria-describedby` at the end text, so screen readers don't read it twice. The wrapping `<label>` already makes it part of the name.
- `Checkbox` and `Radio` no longer set `--ui-primary` when invalid, so links and other content in their label keep the primary color.
- `Checkbox`, `Radio`, `Switch`, `TextField`, `Textarea`, `Select` and `Fieldset` required asterisks are left out of the accessible name, so screen readers don't read "star".
- `Checkbox`, `Radio`, `Range`, `Select`, `Switch`, `TextField` and `Textarea` in Vue render a text prop and its slot together, like Astro, instead of dropping the prop.
- `Checkbox`, `Radio`, `Select`, `Switch`, `TextField` and `Textarea` in Astro and Vue render the label slot without the whitespace around its content, like React and Svelte, so a required field no longer shows a space before its asterisk.
- `Checkbox` and `Radio` draw a disabled input in `GrayText` in forced colors mode, like `Switch`, instead of the enabled colors at reduced opacity.
- `Checkbox`, `Radio`, `Range`, `Select`, `Switch`, `Textarea` and `TextField` get a dashed border when invalid in forced colors, where the red is forced away: on the input, switch track, range thumb or card, and around the field.
- `Checkbox`, `Radio`, `Range`, `Select`, `Switch`, `TabsItem`, `Textarea`, `TextField` and `ToggleButton` in Vue keep what the user changed before the page hydrated (typed, picked, filled in by a password manager or restored by the browser) instead of resetting it, and the `v-model` of a `Tabs` or `ToggleGroup` takes a tab or button picked then. A form reset returns them to the value or state they were rendered with, also when the browser rendered them, and sets the `v-model` value to it, a number `TextField`'s as a number. A `Checkbox` or `Switch` bound to an array adds or removes its value instead of replacing the array with `true` or `false`. A color `TextField` without a value no longer logs a warning in Nuxt.
- `Chip` with a start and an end icon gets the smaller padding on both sides, and an icon inside `.ui-text` no longer changes the padding.
- `Chip` in Astro only renders `href` when the chip is an `a`.
- `Chip` button and link chips fade with `--ui-disabled-opacity` when disabled, like a tonal `Button`, and an outlined chip takes `--ui-text-disabled` for its text instead, so a disabled chip no longer keeps its full fill.
- `ControlGroup` vertical only squares icon-only buttons.
- `ControlGroup` vertical `small` items are as tall as their size.
- `DescriptionList` switches layout based on its own width instead of the page, shares space between long terms and values, and wraps long values. A nested list sizes to its content and follows the outer list's layout, and the leaders of `.ui-border-solid` and `.ui-border-dotted` only apply to the list's own items.
- `DescriptionList`, `List` row links, `Card` (and `Dialog`) heading groups, `FieldDescription`, and `Button` and `List` `kbd` no longer pick up rich text padding, margins, font weight or font.
- `DescriptionList` no longer clips the focus ring of a link or button in a term.
- `DescriptionListDescription`, `DescriptionListItem` and `DescriptionListTerm` in Vue no longer accept the list's `border` prop (`bordered` in 5.4.3).
- `Dialog` backdrop is themeable via `--_backdrop-bg-color` and `--_backdrop-blur` (same as `Drawer`).
- `Dialog` scroll-lock matches `.ui-scroll-lock` and no longer shifts the layout when the scrollbar disappears.
- `Dialog` only locks page scroll for modal dialogs (`showModal()`).
- `Dialog` actions only tighten the end padding when the last button is a text button, keeping room for its focus ring like `Card`, and start-aligned actions use Card's padding, so filled buttons line up with the content.
- `Dialog` and `Drawer` only style their own direct parts, so a Callout, Card or TextField inside them keeps its own padding and alignment.
- `Dialog` and `Drawer` open without a focus ring around them. Safari focuses the `dialog` itself when nothing inside it is in the Tab order, and `normalize.css` drew its focus ring there. The ring stays on the controls inside, and the rule no longer needs `!important`.
- `Dialog` sets `pointer-events: auto` when open, instead of the SVG-only value `all`.
- `Drawer` is hidden (`display: none`) when closed, so it is no longer keyboard focusable.
- `Drawer` `--_block-size` sets the height of a top or bottom drawer up to the full viewport, instead of stopping at 80%. Its default, `min(80dvb, 650px)`, keeps that cap.
- `Drawer` with `.ui-backdrop-transparent` (`backdrop="transparent"`) no longer dims the page behind it. It only removed the blur before.
- `Drawer` with a transparent backdrop locks the page below `31.25rem` instead of `500px`, so the threshold follows the reader's font size.
- `FieldGroup` `name` only applies to its own fields in Astro and Vue, and `ToggleGroup` `name` and selection only to its own buttons in Astro. A field or button after a group, or behind an async component in the next group, no longer takes the group's name.
- `FieldGroup` in Vue passes a `name` that changes or comes from an outer group to its inputs.
- `Fieldset` no longer overrides the error color of an invalid `Checkbox`, `Radio` or `Switch` end text inside it. Its helper styles only apply to its own end text.
- `Fieldset`, `FieldLegend`, `FieldDescription`, `FieldGroup` and `Form` in Vue no longer apply attributes and listeners twice.
- `Fieldset` with `disabled` dims its legend, description and end text instead of the whole fieldset, so the controls inside, which dim themselves, are no longer dimmed twice.
- `Form` only resets the margin of dividers that are its direct children, text dividers included, so dividers nested deeper keep `--ui-divider-gap`.
- `List` separators (`.ui-bordered`, `.ui-border-top`) are visible on tonal lists in dark mode.
- `List` text can shrink below its longest word, and `.ui-inset` follows the dense gap.
- `List` and `Table` borders on filled lists, table headers and table footers are visible in light mode.
- `List` keyboard shortcuts in `.ui-end` pass contrast: a `kbd` takes the description color, `--ui-on-selected` in a selected row, instead of 70% opacity.
- `List` rows with a video keep their end padding on the text side in right-to-left.
- `List` row text styles no longer reach the `.ui-text` of buttons and chips inside a row, and `.ui-end` only sizes `svg` icons that are its direct children.
- `List` `.ui-dense` also shrinks group labels in grouped lists, such as a dense Select.
- `List` text inherits the item's font weight, so `font-weight` on an `li` makes the whole row bold, e.g. for unread items.
- `List` only caps the start column at the icon size when it holds an `svg` directly, so an `Avatar` with an icon keeps its size.
- `List` sizes an `Avatar` in `.ui-start` or `.ui-end` of a dense row like `.ui-x-small` instead of capping its width, so a size class on the avatar wins and a large letter avatar stays round.
- `List` sizes switches, checkboxes and radios through the public tokens, so switch sizes round to whole pixels in lists, and a size class on the control wins over the list's size.
- `List` `.ui-dense` tightens the separators of `.ui-bordered` lists too, not only `.ui-border-top`.
- `List` without a variant sets the field border to its own border, so checkbox and radio rings show on the filled row.
- `List` `.ui-end` passes clicks to a `label`, `select`, `summary`, `textarea` or `[tabindex]` element inside it, not only to links, buttons and inputs.
- `List` rows no longer force every element inside them to the row's font size, so a `Chip`, `Badge` or `Button` in `.ui-start` or `.ui-end` keeps its own size.
- `List` on touch screens only stops text selection in clickable rows (`a`, `button` and `label`), so end text and `Select` options can be selected and copied.
- `List` options with `aria-selected="true"` keep their text color like a checked option or the current link, instead of turning `--ui-primary-text`.
- `List` renders `role="list"`, unless it's passed another `role` such as `listbox`, so Safari keeps announcing a list without bullets as a list with its item count outside a `nav`.
- `ListItem` with `href` and no `as` renders a link in Astro and Vue.
- `ListItem` with `as="button"` renders `type="button"`, so it no longer submits a surrounding form.
- `ListItem` `inset` no longer indents the label of a Chip or Button placed in `.ui-end`.
- `ListItem` with `choice` renders the default slot inside `.ui-text` (or before `.ui-end` when there's no text), like it does without `choice`.
- `ListItem` with `as="button" disabled` (or `aria-disabled="true"` on a link) looks disabled in a plain `List` too: dimmed, `not-allowed` cursor, no hover tint.
- `ListItem`, `Range`, `Textarea` and `TextField` in Vue follow a slot the parent adds or removes after they mount: an end text behind `v-if` shows and is linked with `aria-describedby`, and a `label` slot added later makes the `TextField` root a `<label>`.
- `Progress` pulses in place under reduced motion (`--ui-motion: 0`, or `--_motion: 0` on the bar) instead of freezing. Its indeterminate animation was scaled to `0s`.
- `Progress` in Astro types `max` and `value` like React and Svelte, instead of intersecting them with the native `progress` attributes.
- `Radio` large (`.ui-large`) uses `--ui-choice-size-large`. It was the same size as the default.
- `Radio` sizes work on touch screens. Small and large radios were forced to `--size-4`, and the label sat off center.
- `Radio` dot is centered at every size. It was half a pixel off at small, default and large.
- `Radio` dot stays centered at every zoom level and screen scale. It's a `radial-gradient()` on the input's background instead of a separate `::after` box.
- `Radio` in Vue follows a passed `checked` without `v-model`.
- `Radio` in Vue compares `v-model` with its `value` like a native radio, so `ref(1)` checks the radio with `value="1"`.
- `Radio` no longer puts the required asterisk on every option of a required group; the group's legend carries it.
- `Range` focus ring sits `--ui-focus-ring-offset` outside the thumb instead of `1ex` outside the track, also at every size.
- `Range`, `Select`, `TextField` and `Textarea` with `spread` (`.ui-spread`) collapse to a column when narrower than `25rem`, a breakpoint that follows the reader's font size. The field was squeezed next to the label, and the `Range` container query had no container, so it never applied and the slider's minimum width could push its parent wider.
- `Range` in Vue shows the default value without `value` or `v-model`, and `v-model` returns a number.
- `Range` writes the live readout through the `<output>` text node instead of replacing it, so each input no longer re-styles the whole page through `:has()` rules.
- `Range` and `ToggleButton` in Vue take the `FieldGroup` name.
- `Range` invalid state colors the thumb and its halo too, except on a disabled range.
- `Range` hover ring is no longer clipped at min or max.
- `Range` with `spread`, a value and tick marks no longer draws the value over the tick labels, and the end text of a narrow spread range no longer overlaps the slider or the tick labels.
- `Range` tick labels line up with the thumb, and the first and last line up with the ends of the track and grow inward, so a long translated label stays inside the slider.
- `Range` updates its value `<output>` after its form is reset, in every browser, and leaves it when a `reset` listener cancels the reset. In Vue the bound value follows the reset, so custom readout content does too.
- `Range` (Astro) updates its value output after `<ClientRouter>` navigation, leaves `value-text` slot content and ranges it didn't render alone, and wires each output once.
- `Range` thumb stays centered on the track when `--_thumb-size` or `--_track-block-size` changes, also on touch screens.
- `Range` disabled thumb is opaque, so the track no longer shows through it, and takes `--ui-text-disabled`, which more contrast strengthens, instead of a fixed mix.
- `Range` value lines up with the label's baseline.
- `Range` with a value readout points its root `<label>` at the input, so the label names the slider instead of the `<output>`.
- `Range` declares `--_track-block-size` and `--_track-radius` on the root, so setting them on the component works.
- `Range` tracks, filled, tonal and themed ones included, darken their own color while the thumb is held and keep it when disabled, instead of turning the field border gray.
- `Range` hides its tick mark `<datalist>` from assistive technology with `aria-hidden="true"`, so it isn't exposed as an unnamed listbox next to the slider.
- `Range` shows its filled track in `SelectedItem` in forced colors in Chromium, which dropped the gradient the fill is drawn with.
- `Select` with `spread` centers its arrow on the field.
- `Select` keeps its arrow and its space at the inline end in RTL. The arrow covered the text.
- `Select` keeps its padding and the height of the other fields in browsers that keep the `<button>` inside the `<select>` but have no customizable select, like Firefox, and wherever React, Svelte or Vue render it in the browser. The button turned the padding off there.
- `Select`, `Textarea` and `TextField` draw the focus ring around the field, like `Button`, only when the control itself has focus, not a link in the top or bottom slot. The border keeps its color while the ring shows.
- `Select` only opts selects inside `.ui-select` into `appearance: base-select`.
- `Select` and `TextField` show the select and autosuggest chevrons in forced colors mode.
- `Select` no longer shows the picker's square corners and shadow outside the rounded option list.
- `Select` and `Range` merge a user `aria-describedby` with the end text id instead of overwriting it.
- `Select` (Vue) keeps the browser's selection without `v-model`.
- `Select` adds its top slot, start text (`.ui-start-text`), end text and bottom slot to `aria-describedby`, in that order.
- `Select` adds its `start` and `end` affixes to its name after the label, like a `TextField`, so a unit such as "days" is read with it.
- `Select` and `Range` in Astro merge a passed `aria-labelledby` instead of rendering the attribute twice.
- `Select` in Astro closes its `<selectedcontent>` element. The Astro compiler drops the end tag of a literal `<selectedcontent>`, so the whitespace after it ended up inside it.
- `Select` draws the chevron of a plain select in `--ui-text-strong`, like the customizable select and the autosuggest field.
- `Spinner` slows down to 1.5s per turn under reduced motion (`--ui-motion: 0`) instead of ignoring it.
- `Spinner` keeps the gap in its ring in forced colors, so the spin stays visible.
- `Spinner` no longer makes a busy element `position: relative`, which moved a busy `Drawer` and the absolutely positioned descendants of a busy section, form or row.
- `Switch` icons shrink to fit beside the dot when the track is too narrow for both, instead of overlapping the dot.
- `Switch` focus ring is rounded.
- `Switch` gets the pointer cursor, `--ui-line-height-control` line height and `user-select: none` of `Checkbox` and `Radio`.
- `Switch` checked icon uses the dot's contrast color, so it shows on the accent track.
- `Table` padding no longer grows in narrow containers.
- `Table` uses `overflow: clip` instead of `overflow: hidden`, so it is no longer a scroll container and sticky cells inside it stick.
- `Table` footer rules and the row above the footer apply to `th` as well as `td`, so row headers line up with the footer line and a `th` in `tfoot` gets its top border and padding.
- `Table` row hover only highlights body rows, not the header or footer.
- `Table` row headers (`<th scope="row">`, or a `th` next to `td` cells in `tbody`) keep the body background instead of the header fill.
- `Table` no longer clips the focus ring of controls in its first and last rows.
- `Table` row headers keep the border color of the body cells next to them.
- `Table` without a `thead` rounds its top corners when the first row starts with a row header `th`.
- `TableColumn` in Astro keeps `width` when `style` is an object.
- `Tabs` and `ToggleGroup` context only applies to their own children in Astro.
- `Tabs`, `TabsItem`, `ToggleGroup`, `Select`, `Range`, `Checkbox`, `Radio` and `Switch` in Vue render the same generated id prefixes as the other frameworks.
- `Tabs` in Astro names a `TabsItem` outside a `Tabs` and links its `TabsLabel`, like React and Svelte.
- `Tabs` and `ToggleButton` hide their inputs in `tabs.css` and `toggle-button.css` instead of `core/utils.css`, so single-file imports and `dist/opui.components.css` no longer show the radio and checkbox inputs.
- `Tabs` directly in an `Accordion`, `Card` or `Dialog` draw the focus ring inside, so the surface doesn't clip it. A ring inside the selected tab is `SelectedItemText` in forced colors, so it shows on the `SelectedItem` fill.
- `TabsItem` in Vue follows `id` changes.
- `Textarea` no longer adds the border width to its minimum height.
- `Textarea` centers an icon in `.ui-start` or `.ui-end` on the first line. One shorter or taller than a line of text sat up to 2.5px high or low.
- `TextField` and `Select` small fields are `--ui-field-size-small` (32px) high, like a small `Button`. They were 38px.
- `TextField` date, time, week and month inputs no longer grow taller than the field, so small ones are 32px and time inputs are no longer 41px.
- `TextField` file inputs are `--ui-field-size` high. They were 2px taller. Their button shrinks the gap around it instead of cutting off its text when a theme's text is too large for the field.
- `TextField`, `Textarea` and `Select` keep their field height when a grid or flex parent stretches them, e.g. next to a field with end text. The extra space went into the field.
- `TextField` start and end icons are capped at `--ui-icon-size`, so a large icon no longer makes the field taller.
- `TextField` autosuggest arrow sits at the inline end in RTL. It overlapped the text.
- `TextField` and `Select` without a label are as high as their field. The empty label row added 4px above it.
- `TextField` start and end affixes use the field line height, so they no longer make the field taller on pages with a large line height.
- `TextField`, `Select` and `Textarea` text affixes shrink and end in an ellipsis when the field is too narrow, so the control keeps at least `--_min-inline-size` (`8ch`). A long affix squeezed the input to nothing and pushed the field out of its container.
- `TextField` with a `list` and `Select` no longer shorten the label by 28px.
- `TextField` and `Textarea` with `autoFit` (`.ui-auto-fit`) shrink to their content in a block container or a field group, up to the container's width, and long helper text wraps at the field's width. They filled the container.
- `TextField`, `Textarea` and `Select` (Vue) can be edited when given a `value` without `v-model`.
- `TextField`, `Textarea` and `Select` required asterisks are spaced like the `Checkbox`, `Radio`, `Switch` and `Fieldset` ones (`0.25ex`).
- `TextField` and `Select` with `spread` keep the start text under the label when the field has a top or bottom slot.
- `TextField`, `Select` and `Textarea` look disabled, and a filled field no longer darkens on hover, when a disabled `fieldset` disables the control or it has `aria-disabled="true"`, and a disabled `option` no longer makes a `Select` look disabled. Read-only and `aria-disabled` fields get no hover styles.
- `TextField` and `Select` keep the control height of buttons in Firefox and Safari. Single-line inputs and selects get a definite height, `1lh` plus their padding, so the engine's own input height and padding rounding no longer make the field up to 2px taller.
- `TextField`, `Select` and `Textarea` cover the browser's autofill color with the field's own background, so an autofilled input in a `.ui-filled` field no longer shows a page-colored box, and keep the field's text color, so an autofilled value no longer looks fainter than a typed one.
- `ToggleButton` only grows inside a `ToggleGroup`. On its own in a flex container it stretched to fill the row.
- `ToggleButton` in Vue is a radio in a single-selection `ToggleGroup`, like Astro, even with a `type`.
- `ToggleButton` declares `--_selected-bg-color` on the root with its other inputs, so an override on `.ui-toggle-button` reaches the checked button instead of losing to the checked rule.
- `ToggleGroup` in Vue leaves each button's own `checked` alone when no `value` is bound.
- `ToggleGroup` keeps its control size in forced colors instead of being one border width short, and the selected item no longer shows a gray divider there.
- `ToggleGroup` `.ui-vertical` items stretch to the group's width, like `ControlGroup`, so dividers and the checked background line up.
- `ToggleGroup` is as high as a `ToggleButton` of the same size. The group border made it 2px taller.
- `ToggleGroup` separators show in forced colors.
- `ToggleGroup` in Astro renders a passed `role` instead of `radiogroup` or `group`, like Vue.
- `Tooltip` shifts along the viewport edge instead of squeezing, with or without an arrow, and shows when its trigger is more than one viewport down the page.
- `Tooltip` arrow points at the trigger for every position, after flips and shifts.
- `Tooltip` keeps its edge in forced colors with a `CanvasText` border, and the arrow stays visible.
- `Tooltip` aligned to a span switches inline sides before it jumps to the other block side.
- `Typography` rich text inline `code`, `kbd` and `var` no longer make their line taller than the line height, and the background of inline `code` stays inside its line: the padding above and below it shrinks to the space the line leaves, up to `0.5ex`, so code on neighboring lines no longer overlaps with line heights under 1.75.
- `Typography` `kbd`, `var`, `.ui-kbd` and `.ui-var` no longer draw a border in their own background color. The border width is folded into the padding, so the box keeps its size.
- `Typography` rich text removes the top margin of the first child and the bottom margin of the last child in a component's `.ui-content`.
- `Typography` rich text lists after a heading or `hr` no longer get a top margin, and nested lists get their smaller margins.
- `Typography` rich text no longer overflows grid and flex parents with long words, URLs or code lines, and list items, figure content and table cells no longer push it wider than its container on narrow viewports. Inline `code`, `kbd` and `var` in table cells only break inside a word when it doesn't fit the table, so a narrow table keeps its columns wide enough for whole tokens.
- `Typography` rich text inline `code` styles no longer apply to `code` inside `pre`.
- `Typography` rich text `ol[type]` keeps its marker type, and consecutive `dt` elements are no longer spaced apart.
- `Typography` rich text no longer styles an `a` without `href` as a link.
- `Typography` rich text `code` inside a link gets a darker background in dark mode, so the link color keeps its contrast.
- `Typography` `.ui-mark` has a background.
- `Typography` rich text headings scale with the text around them against `--ui-font-size-body` instead of the root font size, so a theme with a larger body size gets the heading sizes it sets. The paragraph after an `hgroup` heading takes its line height from `--ui-line-height` instead of a fixed `1.6em`.
- `Typography` rich text `pre` and inline `code` run left to right in RTL.
- `Typography` `.ui-p.ui-small` is `--ui-font-size-small` (14px) instead of 12px.
- `Typography` `.ui-abbr` and `.ui-dfn` underlines use the info color, like `abbr` and `dfn`.
- `Typography` overline and heading group overline text, `code` in dark mode, `code` in `del`/`ins`, linked `code` in light mode and links in `mark` pass contrast.
- `Typography` inline `code` directly inside `.ui-rich-text` gets the same padding and radius as inline code in a paragraph.
- `Typography` `.ui-small` also applies to `<small>`.
- `Typography` inline `code` in `del` and `ins` has no inline padding, so no gap shows before the next character.
- `Typography` `abbr` and `dfn` with a `title` get the same underline offset as without one.
- `Typography` linked `code` in rich text has no inline padding where its background is transparent, so the underline doesn't run past the text.
- `Typography` `.ui-small` on a `span` or `p` sits below the component layers, so a small `Chip` rendered as a `span` keeps its own font size.
- `Typography` resets the margins of a blockquote's first and last child only, so a nested list inside it keeps its own top margin.
- `Typography` rich text `pre` and `.ui-code-block` wrap long lines in print (`white-space: pre-wrap`), so the end of a line wider than the page is no longer cut off. On screen they still scroll.
- `components/AGENTS.md`, the internal guide, no longer ships in the package.
- `dist` source maps no longer embed the sources (`sourcesContent`) or `node_modules/.pnpm` paths. Open Props sources point to `../../open-props/`, and `opui.components.css.map` accounts for the `@layer` order line.
- `dist/opui.components.css` starts with the `@layer` order statement.
- `env.d.ts` is in the package `exports`, so `/// <reference types="opui-css/env.d.ts" />` resolves.
- `env.d.ts` types `interestfor` on `<a>` and `<button>` for Astro.
- `normalize.css` gives `.ui-light` and `.ui-dark` on an element other than `html` the page surface and text color. `theme.css` declares `--ui-color-scheme`, `light` on `html` and `dark` under the OS preference or `.ui-dark`, so `Typography` reads the right scheme without a class.
- `normalize.css` gives autofilled fields `--ui-surface` instead of the undefined `--well-1`.
- `normalize.css` body text reads `--ui-font-weight-normal` and headings `--ui-font-weight-bold`, so a theme's weights reach bare text and headings.
- `opui-css/css/js/checkbox.js` resolves through `exports`. It resolved to `checkbox.js.css`.
- `opui-css/open-props.css` resolves through `exports`.
- `opui-css/vue` renders no `class` or `style` attribute on an element whose class list or style comes out empty, instead of `class=""` or `style=""`.
- `package.json` `exports` resolve documented source imports with a `.css` extension (`opui-css/css/imports.css`, `opui-css/core/normalize.css`, `opui-css/css/components/button.css`, …) Previously they resolved to `*.css.css`.
- `package.json` peer dependency ranges are `astro` `^7`, `svelte` `^5.57` and `vue` `^3.5.2` instead of the versions used for development.
- `theme.css` keeps its colors in builds that rewrite `light-dark()` for older browsers, like the defaults of Vite 8 and Next 16. `html` sets a plain `color-scheme` (`light`, or `dark` under `prefers-color-scheme: dark`) before `var(--ui-color-scheme)`, so the rewritten colors follow the OS and `.ui-light` or `.ui-dark` on `html`. Every color was invalid in those builds before: filled buttons were transparent and the page had no background. The README says which settings keep `light-dark()` for the `--ui-color-scheme` knob and the classes on a part of the page.
- `utils.css` hides an element with the `hidden` attribute whatever `display` its component sets, so a hidden `Button` or `TextField` no longer shows. `hidden="until-found"` keeps the browser's behavior.

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
