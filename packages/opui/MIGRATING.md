# Migrating from v5 to v6

v6 has breaking changes for most components. If you only use the Astro or Vue components, most of them are prop renames. If you write the HTML yourself or override component styles, check the class and custom property changes too. The notes are sorted by component, followed by the theme, typography and package changes. Every change is listed in the [changelog](https://github.com/felix-bohlin/ui/blob/main/packages/opui/CHANGELOG.md).

## Accordion

Only the `svg` with `.ui-marker` is the marker. Add `.ui-marker` to the chevron to keep it rotating, or add `.ui-marker-animation-flip` or `.ui-marker-animation-turn` to `details` for another animation (`markerAnimation` in Astro and Vue). Other icons in the `summary` no longer rotate.

```diff
  <details class="ui-accordion">
    <summary>
-     Title <svg>…</svg>
+     Title <svg class="ui-marker">…</svg>
    </summary>
```

In Astro and Vue the regions are parts instead of slots. The root no longer wraps its children in `.ui-content`, so put them in `AccordionContent`.

```diff
  <Accordion>
-   <Fragment slot="summary">Title</Fragment>
-   <p>Text</p>
-   <Button slot="actions">Agree</Button>
+   <AccordionSummary>Title</AccordionSummary>
+   <AccordionContent><p>Text</p></AccordionContent>
+   <AccordionActions><Button>Agree</Button></AccordionActions>
  </Accordion>
```

`types.ts` no longer exports a `Slots` type.

`AccordionSummary` renders a chevron marker by default. If you put your own chevron in the summary, you get two: move it to the `marker` slot on `AccordionSummary` and give it `.ui-marker`.

```diff
- <AccordionSummary>Title <svg>…</svg></AccordionSummary>
+ <AccordionSummary>
+   Title
+   <svg slot="marker" class="ui-marker">…</svg>
+ </AccordionSummary>
```

`variant` no longer accepts `"default"`. The default look is named `transparent`: write that, or leave the prop out.

```diff
- <Accordion variant="default">
+ <Accordion variant="transparent">
```

## Anchor

`Anchor` with `trigger="hover"` no longer wraps the trigger in a `<span interestfor>`. Give the anchor an `id` and add `interestfor` with that id to the trigger, like `Tooltip`.

In Astro and Vue the floating content goes in `AnchorContent` instead of the `anchored` slot.

```diff
  <Anchor>
    <Button>Profile</Button>
-   <Card slot="anchored">…</Card>
+   <AnchorContent><Card>…</Card></AnchorContent>
  </Anchor>
```

`types.ts` no longer exports a `Slots` type.

With `trigger="hover"`, `id` is required and no longer generated. Pass the same `id` to `interestfor` on the trigger.

```diff
- <Anchor trigger="hover">
+ <Anchor id="repo-card" trigger="hover">
```

`alignment` is `positionArea`, named after the CSS `position-area` value it takes.

```diff
- <Anchor alignment="inline-end">
+ <Anchor positionArea="inline-end">
```

## Avatar

`alt` is required when `src` is set (types). Use `alt=""` for decorative images.

`Avatar` with `as="button"` renders `type="button"` by default in Astro and Vue, so it no longer submits a form. Pass `type="submit"` if it should.

Text uses `--ui-on-primary`, and sizes follow `--ui-control-size` and `--ui-button-size-*`.

`isGroup` is removed. Wrap the avatars in `AvatarGroup`, which renders `.ui-avatar-group` with `role="group"`. It doesn't take `src`, `size` or `variant`.

```diff
- <Avatar aria-label="Team" isGroup>
+ <AvatarGroup aria-label="Team">
    <Avatar alt="Jane Doe" src="/jane.jpg" />
- </Avatar>
+ </AvatarGroup>
```

`variant` is `shape`, since it picks the shape. The classes are unchanged.

```diff
- <Avatar variant="rounded">
+ <Avatar shape="rounded">
```

## Badge

Text uses `--ui-on-primary`.

`alignment` is `corner`. The classes are unchanged.

```diff
- <Badge alignment="end-end">
+ <Badge corner="end-end">
```

The indicator is `.ui-indicator` instead of `.ui-badge-indicator`. For a count with words for screen readers, put the whole sentence in a `.ui-sr-only` element and hide the short visible text, so a translation can put the number wherever its language needs it:

```diff
  <span class="ui-anchor-floating">
-   <span class="ui-badge-indicator">5</span>
+   <span class="ui-indicator">
+     <span aria-hidden="true">5</span>
+     <span class="ui-sr-only">5 unread messages</span>
+   </span>
  </span>
```

`label` is a `string`. Pass a number as a string (`label="5"`).

## Button

`.ui-icon-only` is removed. A `Button` whose only child is an `svg` is square, so drop the class.

```diff
- <button class="ui-button ui-icon-only" aria-label="Edit">
+ <button class="ui-button" aria-label="Edit">
```

Icon styles only apply to a direct child `svg`. An icon nested in another element is no longer sized, so move it out. Button padding changed too: `x-small` is `1ex`, `small` `1.25ex` and `large` `2.5ex` (was `0.5ex`, `0.75ex` and `4ex`). Override `--_padding-inline` to restore the old values.

```diff
- <button class="ui-button"><span><svg>…</svg></span> Save</button>
+ <button class="ui-button"><svg>…</svg><span class="ui-text">Save</span></button>
```

Wrap the label in `<span class="ui-text">` when a `Button` has an icon. CSS can't see text nodes, so `<button class="ui-button"><svg>…</svg>Save</button>` has an `svg` as its only element and is styled as icon-only (square, no inline padding).

```diff
- <button class="ui-button"><svg>…</svg>Save</button>
+ <button class="ui-button"><svg>…</svg><span class="ui-text">Save</span></button>
```

In Astro and Vue, `Button` no longer adds `.ui-disabled` to a disabled `<button>`. It sets `disabled`, and `aria-disabled="true"` on links. Target `:disabled` (or `[aria-disabled="true"]` for links) in your own styles.

```diff
- .ui-button.ui-disabled { /* override */ }
+ .ui-button:disabled { /* override */ }
```

In Astro and Vue, `Button` renders `type="button"` by default, so it no longer submits a form. Pass `type="submit"` for submit buttons.

```diff
- <Button>Save</Button>
+ <Button type="submit">Save</Button>
```

Colors changed: critical buttons keep light text on their fill, tonal primary and critical buttons use dark text on a light container in light mode and light text on a dark container in dark mode, and text and outlined buttons use a lighter accent for text in dark mode.

A disabled link has no `href`. The components drop it for you. In HTML, remove `href` from links with `aria-disabled="true"`, because the CSS no longer blocks clicks on them. The same goes for `Chip` links.

```diff
- <a href="/x" class="ui-button" aria-disabled="true">…</a>
+ <a class="ui-button" aria-disabled="true">…</a>
```

## Button group

Variants apply to the whole group. Move a variant from a button inside a group to the group.

```diff
- <div role="group" class="ui-button-group">
-   <button class="ui-button ui-outlined">One</button>
+ <div role="group" class="ui-button-group ui-outlined">
+   <button class="ui-button">One</button>
```

Groups wrap onto more rows when they don't fit, instead of overflowing. Use `overflow="scroll"` (`.ui-overflow-scroll`) or `overflow="shrink"` (`.ui-overflow-shrink`) to keep them on one row. Small buttons are `--ui-button-size-small` (32px) instead of 30px.

## Callout

In Astro and Vue the regions are parts instead of slots. The root no longer renders the severity icon or wraps its children in `.ui-content`: add `CalloutIcon` and `CalloutContent`. The `title` slot and `headingLevel` are gone: write the title as a plain heading first in `CalloutContent`. A custom icon is an `svg` placed first in `Callout` instead of the `icon` slot.

```diff
- <Callout severity="info" headingLevel={4}>
-   <Fragment slot="title">Heads up</Fragment>
-   Text
- </Callout>
+ <Callout severity="info">
+   <CalloutIcon />
+   <CalloutContent>
+     <h4>Heads up</h4>
+     Text
+   </CalloutContent>
+ </Callout>
```

`types.ts` no longer exports a `Slots` type.

## Card

Tonal and elevated cards have a border in the page background color, so they stay visible on tonal surfaces. In dark mode, borders and field borders inside them use the page background too. Actions stick to the bottom of stretched cards and wrap.

In Astro and Vue the regions are parts instead of slots. `actionsAlign` is `align` on `CardActions`.

```diff
- <Card actionsAlign="end">
-   <h3 slot="header">Title</h3>
-   <p slot="content">Text</p>
-   <Button slot="actions">Open</Button>
- </Card>
+ <Card>
+   <CardHeader><h3>Title</h3></CardHeader>
+   <CardContent><p>Text</p></CardContent>
+   <CardActions align="end"><Button>Open</Button></CardActions>
+ </Card>
```

`types.ts` no longer exports a `Slots` type.

The text card is the transparent card, so `.ui-text` only names a text part.

```diff
- <Card variant="text">
+ <Card variant="transparent">
```

```diff
- <div class="ui-card ui-text">
+ <div class="ui-card ui-transparent">
```

## Checkbox

Internal variables are private. Rename any overrides:

| v5                   | v6                               |
| -------------------- | -------------------------------- |
| `--isLTR`, `--isRTL` | removed, the halo centers itself |
| `--highlight-size`   | `--_ripple-size`                 |
| `--thumb-scale`      | `--_thumb-scale`                 |

The root selector is wrapped in `:where()`, like other components, so your own selectors win more easily. The input lines up with the first line of the label. In dark mode the marker stays light on a darkened fill.

Without a visible label the checkbox aligns to the middle, so it centers in table cells. Give it a hidden label (`hideLabel`, or `.ui-sr-only` in HTML). Astro and Vue no longer render an empty `.ui-label` without a default slot, and warn in dev when there's no accessible name.

`aria-invalid="true"` on the `<input>` replaces `data-invalid` on `.ui-checkbox`.

In Astro, `type` is no longer a typed prop. Remove it, the component sets it.

In Astro and Vue, `style` goes to the root `<label>` instead of the `<input>`, like `class`. Set `--_` properties through `style`, and style the input itself with a class or CSS.

Deep type imports from `opui-css/components/*` are renamed, see [Package and imports](#package-and-imports).

## Chip

The hover and press ripple is removed. Delete any `--ripple` overrides.

`Chip` with `as="button"` renders `type="button"` by default in Astro and Vue. Pass `type="submit"` if it should submit a form.

Chips use `--ui-radius` (8px) instead of Open Props `--radius-2` (5px), small chips are `--ui-chip-size-small` (28px) instead of 24px, and labels truncate with an ellipsis unless the chip is `multiline`.

A button chip needs `as="button"` and a link chip needs `href` (types). `disabled` works on both: a link chip renders `aria-disabled="true"`. The same applies to `Avatar`, and `Button` takes link attributes only with `href`.

```diff
- <Chip disabled label="Archived" />
+ <Chip as="button" disabled label="Archived" />
```

In Astro and Vue, a tonal `Chip` no longer renders `.ui-tonal`. Target `.ui-chip:not(.ui-outlined)` in your CSS instead. In HTML the class adds nothing and can go.

```diff
- .ui-chip.ui-tonal { --_bg-color: var(--ui-primary-tonal); }
+ .ui-chip:not(.ui-outlined) { --_bg-color: var(--ui-primary-tonal); }
```

## Classic select

`ClassicSelect` is removed. Use `Select` with the same `label`, `items` (now `SelectItem[]`), `endText`, `size`, `variant` and `error`. Options passed as children go in Select's default slot. Browsers without customizable select show the native picker.

```diff
- <ClassicSelect label="Fruit" items={items} />
+ <Select label="Fruit" items={items} />
```

In HTML, add `<button><selectedcontent></selectedcontent></button>` and wrap the options in `<div class="ui-list">` inside the `<select>`.

## Description list

In Vue, the description part is exported as `DescriptionListDescription` instead of `Description`, like Astro.

```diff
- import { Description } from "opui-css/vue"
+ import { DescriptionListDescription } from "opui-css/vue"
```

In Astro, import the parts by their flat names. The `DescriptionList.Item`, `DescriptionList.Term` and `DescriptionList.Description` aliases are gone.

```diff
- <DescriptionList.Item>
+ <DescriptionListItem>
```

The part files are renamed to `DescriptionListDescription.*`, `DescriptionListItem.*` and `DescriptionListTerm.*`. The `opui-css/<framework>` exports are unchanged; update deep `opui-css/components/*` imports.

```diff
- import Item from "opui-css/components/DescriptionList/Item.astro"
+ import DescriptionListItem from "opui-css/components/DescriptionList/DescriptionListItem.astro"
```

`.ui-term` is gone, and the parts no longer render `.ui-term` or `.ui-description`. Drop the classes from `dt` and `dd`, and select `dt` and `dd` in your own CSS.

```diff
- <dt class="ui-term">Name</dt>
- <dd class="ui-description">Ada</dd>
+ <dt>Name</dt>
+ <dd>Ada</dd>
```

`bordered` takes `"solid"` or `"dotted"`, and the items are plain `div`s without `.ui-item`.

```diff
- <DescriptionList bordered>
+ <DescriptionList bordered="solid">
```

```diff
- <dl class="ui-description-list ui-bordered ui-dotted">
-   <div class="ui-item">
+ <dl class="ui-description-list ui-bordered-dotted">
+   <div>
```

Deep type imports from `opui-css/components/*` are renamed, see [Package and imports](#package-and-imports).

## Dialog

Dialogs have a maximum height. The header and actions stay in place and the content scrolls. Dialogs also get a border in the page background color.

In Astro and Vue the regions are parts instead of slots, like `Card`: `DialogHeader`, `DialogContent` and `DialogActions` (`align` replaces `actionsAlign`). `aria-labelledby` points at the `DialogHeader` unless you pass `aria-label` or `aria-labelledby`, so a dialog without a `DialogHeader` needs `aria-label`.

```diff
- <Dialog actionsAlign="end">
-   <h2 slot="header">Title</h2>
-   <p slot="content">Text</p>
-   <Button slot="actions">Close</Button>
- </Dialog>
+ <Dialog>
+   <DialogHeader><h2>Title</h2></DialogHeader>
+   <DialogContent><p>Text</p></DialogContent>
+   <DialogActions align="end"><Button>Close</Button></DialogActions>
+ </Dialog>
```

`types.ts` no longer exports a `Slots` type.

The page scroll lock behind a modal dialog moved to `core/utils.css`. If you import single files, import `utils.css` too.

## Divider

A divider that is a direct child of a card has no margin, since the card's gap spaces it.

The variant classes drop the `border-` prefix.

```diff
- <hr class="ui-divider ui-border-tonal" />
+ <hr class="ui-divider ui-tonal" />
```

`.ui-border-filled` and `.ui-border-primary` are `.ui-filled` and `.ui-primary`.

The primary line is a color, not a variant.

```diff
- <Divider variant="primary" />
+ <Divider color="primary" />
```

## Drawer

The backdrop dims and blurs like `Dialog`, through `--ui-backdrop-color` and `--ui-backdrop-blur`. `.ui-backdrop-transparent` still removes it. Header headings take the free space, so several header actions line up at the end.

In Astro and Vue the regions are parts instead of slots. `DrawerTitle` replaces the `DrawerHeader` `heading` prop, and `aria-labelledby` points at it. The drawer no longer looks for your own heading, so a drawer without a `DrawerTitle` needs `aria-label`. `DrawerHeader` closes its drawer with `command="close"` (Invoker Commands) instead of a click handler, so older browsers need a polyfill.

```diff
  <Drawer id="filters">
-   <DrawerHeader slot="header" heading="Filters" />
-   <Fragment slot="content">…</Fragment>
-   <DrawerFooter slot="footer">…</DrawerFooter>
+   <DrawerHeader>
+     <DrawerTitle>Filters</DrawerTitle>
+   </DrawerHeader>
+   <DrawerContent>…</DrawerContent>
+   <DrawerFooter>…</DrawerFooter>
  </Drawer>
```

`types.ts` no longer exports a `Slots` type, and the Vue types no longer export `DrawerHeadingIdKey`, `DrawerSlots`, `DrawerHeaderSlots` or `DrawerFooterSlots`.

In Astro and Vue, a drawer that opens from the inline start no longer renders `.ui-inline-start`. Target `.ui-drawer:not(.ui-block-end, .ui-block-start, .ui-inline-end)` in your CSS instead. In HTML the class adds nothing and can go.

```diff
- .ui-drawer.ui-inline-start { --_inline-size: 20rem; }
+ .ui-drawer:not(.ui-block-end, .ui-block-start, .ui-inline-end) { --_inline-size: 20rem; }
```

## Field group and field set

`FieldGroup` no longer sets `role="group"`. Inside a fieldset nothing changes. A `FieldGroup` without a fieldset can take `role` and `aria-label` itself. In HTML, drop `role="group"` from `.ui-field-group`.

```diff
  <fieldset class="ui-fieldset">
    <legend>Notifications</legend>
-   <div class="ui-field-group" role="group">…</div>
+   <div class="ui-field-group">…</div>
  </fieldset>
```

`FieldSet` with another element in `as` gets `role="group"`.

`data-invalid` on `.ui-fieldset` no longer colors the fields inside. Put `aria-invalid="true"` on each control (Astro and Vue: `error` on each `Checkbox`, `Radio` or `Switch`). The fieldset's own `.ui-end-text` (a direct child) turns red when a control inside has `aria-invalid="true"` or is `:user-invalid`. A checked invalid switch turns its track red, like Checkbox and Radio.

`FieldGroup` `direction` is `orientation`, like `ButtonGroup`, `ToggleGroup` and `Carousel`. `.ui-row` and `.ui-column` are `.ui-horizontal` and `.ui-vertical`.

```diff
- <FieldGroup direction="row">
+ <FieldGroup orientation="horizontal">
```

```diff
- <div class="ui-field-group ui-row">
+ <div class="ui-field-group ui-horizontal">
```

## Icon button

`IconButton` is removed. `Button` covers it: a button whose only child is an `svg` is square, `round` makes it a circle. The hover halo is gone: icon-only buttons get the button's hover background. The old default size (28px) is `size="x-small"`. The old `small` (20px) has no preset: use `x-small` with `--_min-height: var(--size-4)`.

```diff
- <IconButton aria-label="Edit">
+ <Button round size="x-small" aria-label="Edit">
```

```diff
- <button class="ui-icon-button">
+ <button class="ui-button ui-round ui-x-small">
```

Icons are smaller than before. Set `--_icon-size: var(--size-5)` to get the old 24px back. The icon color is the button's accent instead of the inherited text color.

`icon-button.css` is gone, so drop its import if you import single component files.

## List

`List` no longer takes `divided`. Use `bordered` (`.ui-bordered`).

```diff
- <List divided>
+ <List bordered>
```

Only direct `li`/`option` children (and options in a `[role="group"]`) are styled as rows, so nested lists inside a row stay normal lists. Headings and paragraphs in `.ui-text` have no margin. Dense rows keep the default inline padding, sizes follow `--ui-control-size`, and rich text links in a list are `--ui-primary-dark` in light mode.

`variant="default"` (`.ui-default`, the page surface) is gone. On the page, `transparent` looks the same. The default look is named `filled`.

```diff
- <List variant="default" />
+ <List variant="transparent" />
```

```diff
- <ul class="ui-list ui-default">
+ <ul class="ui-list ui-transparent">
```

`.ui-end` only sizes an `svg` that is its direct child. An icon wrapped in another element inside `.ui-end` keeps its own size.

Rows are no longer styled by `aria-selected="true"` on a `li`, `a`, `button` or `label`, where ARIA doesn't allow it. Mark the current row with `aria-current="page"`. Options (`option` and `[role="option"]`) keep the selected style.

```diff
- <a aria-selected="true" href="/inbox">
+ <a aria-current="page" href="/inbox">
```

## List item

`as` only accepts `"a"`, `"button"` or `"div"` (types).

`type` can't be combined with `as` or `href` (types).

## Progress

Without a visible label the progress bar aligns to the middle. Give it a hidden label (`.ui-sr-only` in HTML).

In Astro and Vue, `style` goes to the root `<div>` instead of the `<progress>`, like `class`. Set `--_` properties through `style`, and style the `<progress>` itself with a class or CSS.

`variant="default"` (`.ui-default`, the page surface) is gone. Use `tonal` (the default) or `filled`.

```diff
- <Progress variant="default" />
+ <Progress variant="tonal" />
```

```diff
- <div class="ui-progress ui-default">
+ <div class="ui-progress">
```

In Astro and Vue, a tonal `Progress` no longer renders `.ui-tonal`. Target `.ui-progress:not(.ui-filled)` in your CSS instead. In HTML the class adds nothing and can go.

```diff
- .ui-progress.ui-tonal { --_bg-color: var(--ui-primary-tonal); }
+ .ui-progress:not(.ui-filled) { --_bg-color: var(--ui-primary-tonal); }
```

## Radio

Internal variables are private. Rename any overrides:

| v5                   | v6                               |
| -------------------- | -------------------------------- |
| `--isLTR`, `--isRTL` | removed, the halo centers itself |
| `--highlight-size`   | `--_ripple-size`                 |
| `--thumb-scale`      | `--_thumb-scale`                 |

Radios are `--ui-choice-size` (20px) like `Checkbox`, instead of 18px. The root selector is wrapped in `:where()`, the input lines up with the first line of the label, and the marker stays light on a darkened fill in dark mode.

Without a visible label the radio aligns to the middle. Give it a hidden label (`hideLabel`, or `.ui-sr-only` in HTML). Astro and Vue no longer render an empty `.ui-label` without a default slot.

`aria-invalid="true"` on the `<input>` replaces `data-invalid` on `.ui-radio`. For an invalid group, put it on every radio in the group.

In Astro, `type` and the native `size` are no longer typed props. Remove `type`, the component sets it.

In Astro and Vue, `style` goes to the root `<label>` instead of the `<input>`, like `class`. Set `--_` properties through `style`, and style the input itself with a class or CSS.

Deep type imports from `opui-css/components/*` are renamed, see [Package and imports](#package-and-imports).

## Range

Astro and Vue no longer set `--_track-fill` from script. The track fill is a scroll-driven animation in CSS, so remove any script that sets it.

With `spread`, the label and the range split the container into equal columns, and the fixed `25ch` minimum is gone. The invalid state uses `--ui-invalid`.

`variant="default"` (`.ui-default`, the page surface) is gone. Use `outlined` (the default), `filled` or `tonal`.

```diff
- <Range variant="default" />
+ <Range variant="tonal" />
```

```diff
- <label class="ui-range ui-default">
+ <label class="ui-range ui-tonal">
```

`aria-invalid="true"` on the `<input type="range">` replaces `data-invalid` on `.ui-range`.

In Astro and Vue, `style` goes to the root `<label>` instead of the `<input>`, like `class`. Set `--_` properties through `style`, and style the input itself with a class or CSS.

In Astro, extra attributes are typed as `<input>` attributes only, since they go to the input.

Deep type imports from `opui-css/components/*` are renamed, see [Package and imports](#package-and-imports).

## Select

Astro and Vue no longer generate an `id` for the select. Pass `id` when something outside the component references it.

In Astro and Vue, `style` goes to the root `<label>` instead of the `<select>`, like `class`. Set `--_` properties through `style`, and style the select itself with a class or CSS.

With `spread`, label and field split the container into equal columns. Selects keep a `12ch` minimum width in table cells, and the arrow is a chevron instead of a triangle.

Same as Text field: `aria-invalid="true"` on the `<select>` replaces `data-invalid` on `.ui-select`.

The `items` type is `SelectItem`, exported from every framework barrel, and its `value` is `number | string` instead of `any`.

```diff
- import type { Item } from "opui-css/components/Select/types"
+ import type { SelectItem } from "opui-css/react"
```

`description` is `startText` (the `start-text` slot in Astro and Vue), like Text field.

```diff
- <Select label="Country" description="Where you live" items={items} />
+ <Select label="Country" startText="Where you live" items={items} />
```

## Switch

`Switch` takes `size="small"` instead of `small`.

```diff
- <Switch small>Notifications</Switch>
+ <Switch size="small">Notifications</Switch>
```

The switch lines up with the first line of its label, keeps a light marker in dark mode and uses `--ui-invalid` for the invalid state. Without a visible label it aligns to the middle, so give it a hidden label (`hideLabel`, or `.ui-sr-only` in HTML).

`aria-invalid="true"` on the `<input role="switch">` replaces `data-invalid` on `.ui-switch`.

In Astro, `type` is no longer a typed prop. Remove it, the component sets it.

In Astro and Vue, `style` goes to the root `<label>` instead of the `<input>`, like `class`. Set `--_` properties through `style`, and style the input itself with a class or CSS.

Deep type imports from `opui-css/components/*` are renamed, see [Package and imports](#package-and-imports).

## Table

Dense cells have less block padding.

`variant` is `density`, since it sets the cell padding. The classes are unchanged.

```diff
- <Table variant="dense">
+ <Table density="dense">
```

In Astro, import the parts by their flat names, such as `TableHead`, `TableRow` and `TableCell`. The `Table.Head`-style aliases are gone.

```diff
- import { Table } from "opui-css/astro"
- <Table.Head>
+ import { Table, TableHead } from "opui-css/astro"
+ <TableHead>
```

The part files are renamed to `TableBody.*`, `TableCell.*`, `TableColumn.*`, `TableColumnGroup.*`, `TableHead.*`, `TableHeaderCell.*` and `TableRow.*`. The `opui-css/<framework>` exports are unchanged; update deep `opui-css/components/*` imports.

```diff
- import Head from "opui-css/components/Table/Head.astro"
+ import TableHead from "opui-css/components/Table/TableHead.astro"
```

`TableColumn` `width` takes a CSS length. A declaration string is no longer parsed and renders invalid CSS without a warning, so pass it as `style`.

```diff
- <TableColumn width="min-width: 10rem" />
+ <TableColumn style="min-width: 10rem" />
```

Deep type imports from `opui-css/components/*` are renamed, see [Package and imports](#package-and-imports).

## Tabs

In Astro, import the parts by their flat names: `TabsItem`, `TabsTab` and `TabsPanel` replace `Tabs.Item`, `Tabs.Tab` and `Tabs.Panel`.

```diff
- <Tabs.Item>
+ <TabsItem>
```

Tabs look like segmented controls: the tabs sit on a rounded track and the selected tab is a raised pill. `--_accent-color` and `--_bg-color` are gone: use `--_active-bg-color`, `--_active-text-color`, `--_indicator-color` and `--_track-color`, or a `variant` (`filled`, `line`, `outlined`). The open panel has a `--ui-space-2` top margin, so remove any spacing you added above it.

```diff
- .ui-tabs { --_accent-color: var(--ui-critical); }
+ .ui-tabs { --_active-text-color: var(--ui-critical); }
```

Tabs are a radio group without tab roles. Remove `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-controls` and `aria-labelledby` from HTML tabs, and `panelId` (and `tabId` on the panel) from Astro and Vue. Styles that target `[role="tab"]` or `[role="tabpanel"]` need `.ui-tab-label` and `.ui-tab-panel`.

```diff
- <div class="ui-tabs" role="tablist">
-   <input type="radio" name="tabs" id="tab-1" class="ui-tab-input" aria-controls="panel-1" checked />
-   <label for="tab-1" class="ui-tab-label" role="tab">Profile</label>
-   <div id="panel-1" class="ui-tab-panel" role="tabpanel" aria-labelledby="tab-1">…</div>
+ <div class="ui-tabs">
+   <input type="radio" name="tabs" id="tab-1" class="ui-tab-input" checked />
+   <label for="tab-1" class="ui-tab-label">Profile</label>
+   <div class="ui-tab-panel">…</div>
```

Tabs that don't fit can stay on one row and scroll sideways with `overflow="scroll"` (`.ui-overflow-scroll`).

`TabsItem` `open` is `checked`, the attribute it sets on the radio.

```diff
- <TabsItem open>
+ <TabsItem checked>
```

## Text field

`TextField` takes a `size` prop like `Select`, with `x-small`, `small` and `large`.

```diff
- <TextField small label="Name" />
+ <TextField size="small" label="Name" />
```

Astro and Vue no longer generate an input `id`. Pass `id` when something outside the component references the input.

In Astro, extra attributes go to the `<input>` instead of the `<label>`. `class` and `style` stay on the label. In Vue, `style` now goes to the label instead of the input. Check selectors and tests that look for attributes on the label.

`description` is `startText` (the `start-text` slot in Astro and Vue), matching `endText`. `supportingText` (the `supporting-text` slot) is gone. Use `endText`.

```diff
- <TextField label="Name" startText="Full name" supportingText="Required" />
+ <TextField label="Name" startText="Full name" endText="Required" />
```

With `spread`, label and field split the container into equal columns. Fields keep a `12ch` minimum width in table cells, the invalid state uses `--ui-invalid`, and the auto-suggest arrow is a chevron with the `Select` arrow size.

The boolean `filled` is gone. Use `variant="filled"` like `Select`. The class is still `.ui-filled`.

```diff
- <TextField filled label="Name" />
+ <TextField variant="filled" label="Name" />
```

`data-invalid` on `.ui-text-field` no longer does anything. Put `aria-invalid="true"` on the `<input>` (Astro and Vue: `error`, unchanged). Styles that targeted `[data-invalid]` should target `:has([aria-invalid="true"])`.

```diff
- <label class="ui-text-field" data-invalid> … <input aria-invalid="true">
+ <label class="ui-text-field"> … <input aria-invalid="true">
```

`text-input.css` is gone, its styles are in `text-field.css`. Remove the import:

```diff
  @import "opui-css/css/components/text-field.css";
- @import "opui-css/css/components/text-input.css";
```

## Textarea

`Textarea` takes a `size` prop instead of `small`, like `TextField`.

```diff
- <Textarea small label="Message" />
+ <Textarea size="small" label="Message" />
```

Astro and Vue no longer generate an `id`, extra attributes go to the `<textarea>` in Astro (`class` and `style` stay on the label), and in Vue `style` goes to the label. `description` is `startText` (the `start-text` slot), like Text field. `supportingText` (the `supporting-text` slot) is gone. Use `endText`.

The minimum height is three lines plus padding at every size (small was a fixed 64px). With `spread`, the fixed `30ch` minimum is gone and label and field split the container into equal columns. Textareas keep a `12ch` minimum width in table cells.

The boolean `filled` is gone. Use `variant="filled"` like `Select`. The class is still `.ui-filled`.

```diff
- <Textarea filled label="Name" />
+ <Textarea variant="filled" label="Name" />
```

Same as Text field: `aria-invalid="true"` on the `<textarea>` replaces `data-invalid` on `.ui-textarea`.

## Toast

`Toast` is removed. `toast.css`, `css/js/toast.js` and its types are gone, so drop their imports and the `initToastManager()` and `showToast()` calls.

## Toggle button and toggle group

Text shrinks with the size like `Button`: `--ui-font-size-small` when small and `--ui-font-size-caption` when x-small. Groups wrap onto more rows when they don't fit; use `overflow="scroll"` or `overflow="shrink"` to keep them on one row.

`ToggleButton` in Astro and Vue no longer generates an input `id`. Pass `id` when something outside the component references the input.

In Astro and Vue, `style` on a `ToggleButton` goes to the root `<label>` instead of the `<input>`, like `class`. Set `--_` properties through `style`, and style the input itself with a class or CSS.

`ToggleGroup` no longer exports the unused `ToggleContext` type.

`ToggleButton` no longer supports `.ui-disabled`, and Astro and Vue no longer add it. Set `disabled` on the input, the toggle is styled through `:has(input:disabled)`.

```diff
- <label class="ui-toggle-button ui-disabled"><input type="checkbox" />Bold</label>
+ <label class="ui-toggle-button"><input type="checkbox" disabled />Bold</label>
```

`ToggleGroup` `size="default"` is now `size="medium"`, like every sized component.

```diff
- <ToggleGroup size="default">
+ <ToggleGroup size="medium">
```

`ToggleButton` icon styles only apply to a direct child `svg`, sized with `--_icon-size`. An `svg` nested in another element is no longer sized, so move it out of its wrapper:

```diff
- <label class="ui-toggle-button"><input type="checkbox" /><span><svg>…</svg></span></label>
+ <label class="ui-toggle-button"><input type="checkbox" /><svg>…</svg></label>
```

`ToggleButton` `pressed` is `checked`, the attribute it sets on the input.

```diff
- <ToggleButton pressed value="bold">
+ <ToggleButton checked value="bold">
```

## Tooltip

`Tooltip` no longer wraps the trigger in a `<span interestfor>`. Give the tooltip an `id` (now required in the types) and add `interestfor` with that id to the trigger.

In Astro and Vue the text goes in `TooltipContent` instead of `label` or the `content` slot.

```diff
- <Tooltip label="Save your changes">
-   <Button>Save</Button>
+ <Tooltip id="save-tooltip">
+   <Button interestfor="save-tooltip">Save</Button>
+   <TooltipContent>Save your changes</TooltipContent>
  </Tooltip>
```

`types.ts` no longer exports a `Slots` type.

Tooltips use `--ui-surface-inverse` and `--ui-on-inverse`, and shift along the viewport edge instead of squeezing, with or without an arrow.

`alignment` is `positionArea`, and `.ui-with-arrow` is `.ui-arrow`, like the `arrow` prop.

```diff
- <Tooltip alignment="block-end" id="hint">
+ <Tooltip id="hint" positionArea="block-end">
```

```diff
- <span class="ui-anchor ui-tooltip ui-with-arrow">
+ <span class="ui-anchor ui-tooltip ui-arrow">
```

## Theme and tokens

Every theme token has a `--ui-` prefix, like the classes: `--primary` is `--ui-primary`, `--space-3` is `--ui-space-3`, `--color-1` is `--ui-color-1` and `--gray-1` is `--ui-gray-1`. Open Props tokens keep their names: `--size-*`, `--font-size-0` to `--font-size-8`, `--shadow-1` to `--shadow-6`, `--hue-*`, `--shadow-color` and `--shadow-strength`. Add `ui-` to every token you set or read. `tokens.json` lists them all with their new names.

```diff
- .sidebar { --primary: var(--green); }
+ .sidebar { --ui-primary: var(--ui-green); }
```

These tokens also have a new name, so adding the prefix isn't enough:

| v5                        | v6                      |
| ------------------------- | ----------------------- |
| `--border-radius`         | `--ui-radius`           |
| `--button-border-radius`  | `--ui-button-radius`    |
| `--field-border-radius`   | `--ui-field-radius`     |
| `--primary-contrast`      | `--ui-on-primary`       |
| `--text-muted-contrast`   | `--ui-on-inverse-muted` |
| `--text-primary`          | `--ui-text-strong`      |
| `--text-primary-contrast` | `--ui-on-inverse`       |

`--ui-on-*` is the text and icon color on a fill, so `--ui-on-primary` goes on `--ui-primary` and `--ui-on-inverse` on `--ui-surface-inverse`. `--primary-dark` and `--primary-light` are gone. Derive a shade from the primary instead, such as `oklch(from var(--ui-primary) calc(l * 0.75) c h)`.

```diff
- .note { color: var(--text-primary); border-radius: var(--border-radius); }
+ .note { color: var(--ui-text-strong); border-radius: var(--ui-radius); }
```

`--font-size-05` is `--ui-font-size-small`, one of the type roles that replace the Open Props steps in the components: `--ui-font-size-caption`, `--ui-font-size-small`, `--ui-font-size-body`, `--ui-font-size-control` and `--ui-font-size-large`, which default to steps of the new `--ui-font-size-100` to `--ui-font-size-900` scale.

```diff
- .note { font-size: var(--font-size-05); }
+ .note { font-size: var(--ui-font-size-small); }
```

`theme.css` sets `--ui-focus-ring-color` to the inverted page background instead of `var(--ui-primary)`, and the global focus ring and the component rings read it. To keep the old value, set it in your theme:

```css
@layer theme.custom {
  :where(html) {
    --ui-focus-ring-color: var(--ui-primary);
  }
}
```

`theme.css` is in the `theme.base` layer, and `layers.css` adds an empty `theme.custom` layer after it for your own tokens. Overrides in `@layer theme` keep working and now beat the defaults wherever they load. If you copied a complete `theme.css` from the Theme generator, replace it with a new `custom-theme.css` from the generator: it only lists the tokens you changed, so it won't miss tokens added in later releases.

`theme.css` no longer sets `--ui-button-radius` and `--ui-field-radius`, and buttons and fields follow `--ui-radius` while they're unset, also where you set it on a part of the page. If your own styles read them, add the fallback: `var(--ui-button-radius, var(--ui-radius))`. If you set `--ui-radius` and want buttons and fields to keep their corners, set them back:

```css
@layer theme.custom {
  :where(html) {
    --ui-button-radius: var(--size-2);
    --ui-field-radius: var(--size-2);
  }
}
```

`kbd`, `mark`, `var`, `Tooltip`, `Checkbox`, file inputs and rounded `Avatar` never get rounder than `--ui-radius`.

Component padding, gaps and margins read `--ui-space-1` to `--ui-space-8` instead of the Open Props `--size-*` steps. The steps resolve on `html`, so overriding `--size-*` on a part of the page no longer changes the components in it. Set `--ui-space-scale` on `html` to change the spacing everywhere, or a component's `--_` property to change one.

The `Select` picker and `Drawer` use `--ui-shadow-overlay` (`--shadow-3`, was `--shadow-2`), and elevated `Accordion` uses `--ui-shadow-elevated` (`--ui-shadow-elevated-dark`, `--shadow-4`, in dark mode, was `--shadow-3`).

`--ui-primary` is `--ui-color-9` in light mode and `--ui-color-6` in dark mode, and `--ui-on-primary` is derived from `--ui-primary` with relative color. If you set your own `--ui-primary`, its text color now follows it.

`palette.css` no longer registers `--color-*`, `--gray-*`, `--palette-source` and `--palette-hue` with `@property`, so they can't be animated as colors anymore.

`--ui-motion` and its `prefers-reduced-motion` default moved from `core/normalize.css` to `theme.css`, and the `.ui-motion-*` classes moved to `core/utils.css`. `theme.css` also declares `--ui-palette-hue-rotate-by`, `--ui-gray-hue` and `--ui-gray-chroma`. If you import single files, import `theme.css` and `utils.css` too.

Component borders read `--ui-border-width` (`Accordion`, `ButtonGroup`, `Callout`, `Card`, `Chip`, `DescriptionList`, `List`, `Table`, `ToggleButton`, `ToggleGroup`) and `--ui-field-border-width` (`Checkbox`, `Radio`, `Switch`, `TextField`) instead of a hardcoded `1px`. If you set either token, check those components too.

Links (`.ui-link` and rich text links) darken in light mode and lighten in dark mode on hover and focus, and their underline gets `3px` thick.

Private custom properties (`--_*`) follow one scheme: `--_accent` for the accent color, `--_text-color` for text, `--_bg-color` for the component's own background (a sub-part keeps a prefix, like `--_thumb-bg-color`), `--_duration` and `--_ease` for motion, `--_size` and `--_min-height` for sizes. Rename them where you set them:

| Component                   | Old                                               | New                                                                                                            |
| --------------------------- | ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Accordion                   | `--_transition`                                   | `--_duration`                                                                                                  |
| Accordion                   | `--_svg-transition`                               | removed, the chevron uses `--_duration` and `--_ease`                                                          |
| Accordion                   | `--_gutter-color` (group)                         | `--_divider-color`                                                                                             |
| Avatar                      | `--_color`                                        | `--_text-color`                                                                                                |
| Avatar                      | `--_width`                                        | `--_size`                                                                                                      |
| Badge                       | `--_badge-inset`                                  | `--_inset-block`, `--_inset-inline`                                                                            |
| Button                      | `--_color`, `--_color-contrast`, `--_color-tonal` | `--_accent`, `--_on-accent`, `--_accent-tonal`                                                                 |
| Callout                     | `--_color`                                        | `--_text-color`                                                                                                |
| Callout                     | `--_outlined-color`                               | `--_outlined-text-color`                                                                                       |
| Callout                     | `--_surface-bg`                                   | `--_surface-bg-color`                                                                                          |
| Card                        | `--_card-bg-color`                                | `--_bg-color`                                                                                                  |
| Card                        | `--_card-border-color`                            | `--_border-color`                                                                                              |
| Card                        | `--_card-border-width`                            | `--_border-width`                                                                                              |
| Card                        | `--_card-shadow`                                  | `--_shadow`                                                                                                    |
| Card                        | `--_border-color` (outlined border)               | `--_outlined-border-color`                                                                                     |
| Card                        | `--_bg-surface`, `--_bg-tonal`, `--_bg-elevated`  | `--_surface-bg-color`, `--_tonal-bg-color`, `--_elevated-bg-color`                                             |
| Card                        | `--_shadow-elevated`                              | `--_elevated-shadow`                                                                                           |
| Card                        | `--_shadow-light`, `--_shadow-dark`               | removed, set `--ui-shadow-elevated-light` and `--ui-shadow-elevated-dark`, or `--_elevated-shadow` on the card |
| Chip                        | `--_color`                                        | `--_text-color`                                                                                                |
| Drawer                      | `--_color`                                        | `--_text-color`                                                                                                |
| Drawer                      | `--_transition-duration`, `--_transition-timing`  | `--_duration`, `--_ease`                                                                                       |
| List                        | `--_bg-color-hover`                               | `--_hover-bg-color`                                                                                            |
| normalize.css               | `--_page-bg-color`                                | removed, `html` reads `--ui-surface-default`                                                                   |
| Progress                    | `--_accent-color`                                 | `--_accent`                                                                                                    |
| Range                       | `--_thumb-bg`                                     | `--_thumb-bg-color`                                                                                            |
| Switch                      | `--_accent-color`                                 | `--_accent`                                                                                                    |
| Switch                      | `--_transition-time`, `--_transition-tf`          | `--_duration`, `--_ease`                                                                                       |
| Table                       | `--_table-border-radius`                          | `--_border-radius`                                                                                             |
| TextField, Textarea, Select | `--_accent-color`                                 | `--_accent`                                                                                                    |
| TextField, Textarea, Select | `--_height`                                       | `--_min-height`                                                                                                |
| TextField, Textarea, Select | `--_label-color`                                  | `--_affix-color`                                                                                               |
| TextField, Textarea, Select | `--_end-text-color`                               | `--_helper-color`                                                                                              |
| ToggleButton                | `--_button-bg-color`                              | `--_bg-color`                                                                                                  |
| ToggleButton                | `--_size`                                         | `--_min-height` (a minimum height)                                                                             |
| ToggleButton                | `--_svg-size`                                     | `--_icon-size` (direct child `svg`s only)                                                                      |
| Tooltip                     | `--_tooltip-bg`, `--_tooltip-color`               | `--_bg-color`, `--_text-color`                                                                                 |
| Tooltip                     | `--_tooltip-offset`                               | `--_offset`                                                                                                    |

`--ui-info` and `--ui-blue` use `--hue-blue` (240), the same blue as the `.ui-info` palette, so info badges and callouts match. If you relied on the old cyan-ish blue (hue 210), set `--ui-blue` in your theme.

Dark mode shadows are darker: `theme.css` sets `--shadow-color: 220 40% 2%` and `--shadow-strength: 20%` under `.ui-dark` and the OS dark preference. Override both on `html` to change them. The bundle no longer contains Open Props' `@custom-media` definitions (`--OSdark`, `--md-n-above` and so on); import `open-props/media` if your PostCSS setup used them.

Components read roles, not palette steps or Open Props values, and the roles are computed on `html`. Overriding a step such as `--ui-gray-4` or an Open Props value such as `--size-3` on a part of the page no longer changes the components there. Override the role, or add `.ui-palette` so the part derives its roles again from its own palette:

```diff
- .sidebar { --gray-4: #e5e7eb; }
+ .sidebar { --ui-surface-filled: #e5e7eb; }
```

## Typography and rich text

Rich text (`.ui-rich-text`) only styles headings without a class, like lists. Add a `.ui-h1`–`.ui-h6` class to a heading that has another class. Component parts such as the `Callout` title keep their own styles.

```diff
- <h2 class="intro">Title</h2>
+ <h2 class="intro ui-h2">Title</h2>
```

`--ui-font-size-h3` is fluid with a higher minimum (`--ui-font-size-500`), `--ui-font-size-h4` scales between `--ui-font-size-400` and `--ui-font-size-500` instead of a fixed size, and `--ui-font-size-h6` is `--ui-font-size-300`, so check pages that rely on the old heading sizes.

Rich text styles live in a new `components.prose` layer, below `components.root`, so component styles inside rich text win over prose styles. If you declare the layer order yourself, add it:

```diff
- @layer openprops, theme, normalize, components.root, components.extended, utils;
+ @layer openprops, theme, normalize, components.prose, components.root, components.extended, utils;
```

Spacing changed, so rich text pages look a bit different:

- Spacing derives from one flow space (`1.25em` of the body text) and snaps to `--ui-rhythm-step`. Headings get more space above than below.
- Headings share one line height, `1em + 0.5rem` rounded to `--ui-rhythm-step`, in rich text and in the `.ui-h1`–`.ui-h6` classes. Heading group subtitles snap to `--ui-rhythm-step` too.
- Headings, `pre` and `small` scale with the inherited font size.
- List gutters are measured in `ch`, and bulleted and numbered list text starts at the same position.
- `sup` and `sub` are `0.75em` and no longer change the line height.
- Figure captions are muted and start-aligned under quotes, code blocks and tables.

## Package and imports

Import `opui-css/css/layers.css` first when you import single component files, so the layers keep their order:

```css
@import "opui-css/css/layers.css";
@import "opui-css/css/components/button.css";
```

`checkbox.css`, `radio.css` and `switch.css` moved their layout, label, end text, sizes and disabled styles into `choice.css`. Import it with them, in any order, or the labels lose their layout:

```diff
  @import "opui-css/css/layers.css";
+ @import "opui-css/css/components/choice.css";
  @import "opui-css/css/components/checkbox.css";
```

Deep type imports from `opui-css/components/*` follow one naming scheme: the root is `Props`, its slots `Slots`, and each part is named after the part. `CheckboxProps` and `CheckboxSlots` in `components/Checkbox/types*` are `Props` and `Slots` (likewise `Radio`, `Switch` and `Range`), `TermProps`, `DescriptionProps` and `ItemProps` are `DescriptionListTermProps`, `DescriptionListDescriptionProps` and `DescriptionListItemProps`, and Table's `SectionProps` and `ColumnProps` are one type per part, such as `TableCellProps`, and `TableColumnProps`. Import the names from the framework entry instead:

```diff
- import type { CheckboxProps } from "opui-css/components/Checkbox/types.astro"
- import type { SectionProps } from "opui-css/components/Table/types.astro"
+ import type { CheckboxProps, TableCellProps } from "opui-css/astro"
```

`opui-css/open-props` (`dist/op.css`) no longer includes Open Props' palette (`--palette-*` and `--color-1` to `--color-16`). If you load `op.css` on its own and read those properties, import `opui-css/core/palette.css` with `opui-css/css/theme.css`, which sets the palette knobs, and read the `--ui-` names (`--ui-palette-*` and `--ui-color-1` to `--ui-color-16`).

The `types.solid.ts` files are gone, and so is the `solid-js` peer dependency. There are no Solid components; write your own prop types if you used them.

# Migrating from v5.4 to v5.5

`Toast` is no longer exported from `opui-css/astro` or `opui-css/vue`. It is still available in HTML as an alpha: import `opui-css/css/components/toast.css` and `opui-css/css/js/toast.js`, and call `initToastManager()` once.

# Migrating from v5.0 to v5.1

In v5.1.0, the `critical` prop has been renamed to `error` on all form components (`TextField`, `Checkbox`, `Radio`, `Switch`, `Select`, `ClassicSelect`, `Textarea`).

```diff
- <TextField critical label="Name" />
+ <TextField error label="Name" />
```

Note: Components that use `critical` for severity styling (such as `Button`, `Callout`, `Badge`) still use the `critical` prop.

# Migrating from v4 to v5

v5 prefixes every OPUI-owned class with `ui-`. The component props are unchanged apart from the changes at the end of this section, and the components render the prefixed classes.

If you use the framework component (e.g. `<Button size="small" variant="outlined">`), the component emits the prefixed classes for you.

If you use raw HTML or write CSS that targets library classes, you must rename every reference:

```diff
- <button class="button outlined small">Save</button>
+ <button class="ui-button ui-outlined ui-small">Save</button>
```

```diff
- .button.filled { /* override */ }
+ .ui-button.ui-filled { /* override */ }
```

The full list of renamed tokens is in [CHANGELOG.md](./CHANGELOG.md#500---2026-05-21). Run a project-wide find/replace per token, then visually smoke test.

CSS custom properties (`--ui-primary`, `--ui-surface-default`, `--size-3`, …) are unchanged.

These changes in 5.0.0 and 5.0.1 need a code change too:

- `Avatar` no longer takes `spacing`, and the group gap classes that went with it are removed.
- `ToggleButton` no longer adds an unprefixed `selected` class when pressed. Style the checked input instead, e.g. `.ui-toggle-button:has(input:checked)`.
- `Progress` (5.0.1): `.ui-progress` and its variant classes (`.ui-default`, `.ui-filled`, `.ui-tonal`) go on a wrapper `<div>` around `<progress>`. The Astro component renders the wrapper.

```diff
- <progress class="ui-progress ui-tonal" value="60" max="100"></progress>
+ <div class="ui-progress ui-tonal">
+   <progress value="60" max="100"></progress>
+ </div>
```

# Migrating from v3 to v4

v4 is a full re-platform.

## 1. `import "opui-css"` still works

The default export still resolves to a complete, ready-to-use stylesheet - just under a different filename. No code change needed unless you want one.

```diff
- import "opui-css"          // resolved to dist/theme-two/theme-two.css
+ import "opui-css"          // now resolves to dist/opui.css (single theme)
```

If you imported `theme-one` specifically, you need to either accept the new theme or vendor the v3 stylesheet into your repo:

```diff
- import "opui-css/theme-one"
- import "opui-css/theme-one/components"
+ import "opui-css"          // or your own override layer
```

## 2. `opui-css/open-props` is unchanged

```js
import "opui-css/open-props" // still points at compiled Open Props tokens
```

## 3. The other `dist/` subpaths

| v3                                       | v4                                  |
| ---------------------------------------- | ----------------------------------- |
| `opui-css/dist/theme-two/theme-two.css`  | `opui-css/dist/opui.css`            |
| `opui-css/dist/theme-two/components.css` | `opui-css/dist/opui.components.css` |
| `opui-css/dist/theme-one/theme-one.css`  | removed                             |
| `opui-css/dist/theme-one/components.css` | removed                             |
| `opui-css/dist/op.css`                   | `opui-css/dist/op.css` (unchanged)  |

## 4. Source layout moved

If you were importing from `src/`:

```diff
- @import "opui-css/src/components/button.css";
+ @import "opui-css/css/components/button.css";
```

The component CSS now lives under `css/`. The pre-bundled output stays in `dist/`.

## 5. Pick a theme - there's only one

`theme-one` and `theme-two` are removed. The shipped theme lives in `css/theme.css`. To customise, override variables in a layer:

```css
@layer theme {
  :root {
    --primary: oklch(60% 0.2 250);
  }
}
```

## 6. `open-props` is now a peer dependency

v3 had `open-props` as a regular dependency. v4 makes it a peer so you control the version:

```bash
pnpm add open-props
```

## 7. New: Astro components

```astro
---
import { Button, Dialog, Tabs } from "opui-css/astro"
---

<Button color="primary">Save</Button>
```

`astro` is an _optional_ peer - only required if you actually import from `opui-css/astro`. Pure-CSS consumers won't see a peer warning.

Astro components emit prefixed `ui-` classes (see [Migrating from v4 to v5](#migrating-from-v4-to-v5) above). Raw HTML and CSS overrides must use those prefixed names.

## 8. Cascade layers

v4 declares the layer order in `css/imports.css` / `dist/opui.css`:

```css
@layer openprops, theme, normalize, components.root, components.extended, utils;
```

Put your overrides in a later layer or unlayered. If your app already declared `@layer` with a different order, reconcile or import `dist/opui.components.css` and own the layer order yourself.

## 9. Copy/paste is still supported

The source files under `components/` and `css/components/` are unminified and free to vendor in - the license is unchanged (MIT).

## 10. Card and Dialog `actionsAlign` (4.1.0)

The Astro `Card` and `Dialog` no longer take an `actions` prop with an `align` field. Set the `actionsAlign` prop (`"start"` or `"end"`) instead.

## 11. Pinning v3

If you're not ready to migrate, pin the last v3 release:

```json
{ "dependencies": { "opui-css": "3.3.5" } }
```

v3 will not receive further updates.
