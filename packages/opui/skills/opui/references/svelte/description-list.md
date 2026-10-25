# Description list

## Anatomy

- Price

  6 950 000

* `<DescriptionList>`

  Container element.

* `<DescriptionListItem>`

  Groups a term with its description.

* `<DescriptionListTerm>`

  The term.

* `<DescriptionListDescription>`

  The description.

## Basics

```svelte
<script lang="ts">
  import {
    DescriptionList,
    DescriptionListDescription,
    DescriptionListItem,
    DescriptionListTerm,
  } from "opui-css/svelte"
</script>

<DescriptionList>
  <DescriptionListItem>
    <DescriptionListTerm>Price</DescriptionListTerm>
    <DescriptionListDescription>6 950 000</DescriptionListDescription>
  </DescriptionListItem>
  <DescriptionListItem>
    <DescriptionListTerm>Size</DescriptionListTerm>
    <DescriptionListDescription>64 m²</DescriptionListDescription>
  </DescriptionListItem>
  <DescriptionListItem>
    <DescriptionListTerm>Rooms</DescriptionListTerm>
    <DescriptionListDescription>3</DescriptionListDescription>
  </DescriptionListItem>
</DescriptionList>
```

## Bordered

Set `bordered` on `DescriptionList` to add a separator between the term and description on all items, and `dotted` with it for a dotted one.

Above `45ch` the term and description share a row and the border fills the gap between them. Narrower lists stack and show no border, unless they're horizontal (`orientation="horizontal"`).

```svelte
<script lang="ts">
  import {
    DescriptionList,
    DescriptionListDescription,
    DescriptionListItem,
    DescriptionListTerm,
  } from "opui-css/svelte"
</script>

<DescriptionList bordered>
  <DescriptionListItem>
    <DescriptionListTerm>Price</DescriptionListTerm>
    <DescriptionListDescription>6 950 000</DescriptionListDescription>
  </DescriptionListItem>
  <DescriptionListItem>
    <DescriptionListTerm>Size</DescriptionListTerm>
    <DescriptionListDescription>64 m²</DescriptionListDescription>
  </DescriptionListItem>
  <DescriptionListItem>
    <DescriptionListTerm>Rooms</DescriptionListTerm>
    <DescriptionListDescription>3</DescriptionListDescription>
  </DescriptionListItem>
</DescriptionList>

<DescriptionList bordered dotted>
  <DescriptionListItem>
    <DescriptionListTerm>Price</DescriptionListTerm>
    <DescriptionListDescription>6 950 000</DescriptionListDescription>
  </DescriptionListItem>
  <DescriptionListItem>
    <DescriptionListTerm>Size</DescriptionListTerm>
    <DescriptionListDescription>64 m²</DescriptionListDescription>
  </DescriptionListItem>
  <DescriptionListItem>
    <DescriptionListTerm>Rooms</DescriptionListTerm>
    <DescriptionListDescription>3</DescriptionListDescription>
  </DescriptionListItem>
</DescriptionList>
```

## Orientation

By default the term and the description stack when the list is `45ch` or narrower, and sit side by side when it's wider. Set `orientation="horizontal"` to keep them side by side at any width, for example for totals in a sidebar or summary card.

```svelte
<script lang="ts">
  import {
    DescriptionList,
    DescriptionListDescription,
    DescriptionListItem,
    DescriptionListTerm,
  } from "opui-css/svelte"
</script>

<DescriptionList
  bordered
  orientation="horizontal"
  style="max-inline-size: 18rem"
>
  <DescriptionListItem>
    <DescriptionListTerm>Subtotal</DescriptionListTerm>
    <DescriptionListDescription>$120.00</DescriptionListDescription>
  </DescriptionListItem>
  <DescriptionListItem>
    <DescriptionListTerm>Shipping</DescriptionListTerm>
    <DescriptionListDescription>$8.00</DescriptionListDescription>
  </DescriptionListItem>
  <DescriptionListItem>
    <DescriptionListTerm>Total</DescriptionListTerm>
    <DescriptionListDescription>$128.00</DescriptionListDescription>
  </DescriptionListItem>
</DescriptionList>
```

## API

### Description list API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `bordered` | `boolean` | `false` | Adds a line between the term and the description. |
| `children` | `Snippet` | - | The items. |
| `dotted` | `boolean` | `false` | Makes the `bordered` line dotted. |
| `orientation` | `"auto"` , `"horizontal"` | `"auto"` | The orientation of the items. `auto` stacks the term and the description when the list is `45ch` or narrower, `horizontal` keeps them side by side at any width. |

### CSS variables

| Variable | Default | Description |
| --- | --- | --- |
| `--ui-border-color` | `light-dark( color-mix( in oklch, var(--ui-text-strong) var(--ui-border-strength-light), var(--ui-surface) ), color-mix( in oklch, var(--ui-text-strong) var(--ui-border-strength-dark), var(--ui-surface) ) )` | Default border color for cards, lists, tables and dividers. `--ui-text-strong` mixed into `--ui-surface` at `--ui-border-strength-light` or `--ui-border-strength-dark`. |
| `--ui-border-width` | `1px` | Default border width for components that draw a border. |
| `--ui-border-width-thick` | `2px` | Width of emphasized rules: the head and foot rules of rich text tables, the `AvatarGroup` ring, the `Badge` border, the neutral `Chip` dot, the dotted `DescriptionList` rule, the `Tabs` indicator, the bar on a selected `List` row, the `Spinner` ring, and at one and a half times, the blockquote bar. |
| `--ui-font-weight-bold` | `700` | Font weight for headings, buttons and terms. |
| `--ui-space-1` | `calc(0.25rem * var(--ui-space-scale))` | Spacing step 1: `0.25rem` times `--ui-space-scale`. |
| `--ui-space-3` | `calc(1rem * var(--ui-space-scale))` | Spacing step 3: `1rem` times `--ui-space-scale`. |
| `--ui-text` | `light-dark( color-mix( in oklch, var(--ui-text-strong) var(--ui-text-strength-light), var(--ui-surface) ), color-mix( in oklch, var(--ui-text-strong) var(--ui-text-strength-dark), var(--ui-surface) ) )` | Body text color. `--ui-text-strong` mixed into `--ui-surface` at `--ui-text-strength-light` or `--ui-text-strength-dark`. |

The stylesheets on this page read these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/svelte/guide/theme-tokens.md).

## Component properties

Set these on the component itself, inline or in your own CSS. Inputs are the knobs. Outputs are derived from the inputs and the current state, so overriding one fixes it in every state. [Customizing](https://open-props-ui.netlify.app/svelte/guide/customizing.md#component-properties) has examples.

| Property | Kind | Description |
| --- | --- | --- |
| `--_border-style` | Input | Style of the line between term and description. `.ui-bordered.ui-dotted` makes it dotted. |
| `--_border-width` | Input | Width of the line between term and description. `.ui-bordered.ui-dotted` sets it to `2px`. |

## Installation

Import the components from `opui-css/svelte`:

Copy the CSS into your project to own it. It reads tokens from Open Props, `palette.css` and `theme.css`, so those go on the page too, after `layers.css`. See [Getting started](https://open-props-ui.netlify.app/svelte/guide/getting-started.md).

- `opui-css/css/components/description-list.css`

## Used in blocks

- [Billing](https://open-props-ui.netlify.app/blocks/billing.md)
- [Checkout](https://open-props-ui.netlify.app/blocks/checkout.md)
- [Invoice](https://open-props-ui.netlify.app/blocks/invoice.md)
- [Project overview](https://open-props-ui.netlify.app/blocks/project-overview.md)
- [Server status](https://open-props-ui.netlify.app/blocks/server-status.md)
- [Shopping cart](https://open-props-ui.netlify.app/blocks/shopping-cart.md)
