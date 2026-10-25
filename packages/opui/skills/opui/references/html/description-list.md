# Description list

## Anatomy

- Price

  6 950 000

* `dl.ui-description-list`

  Container element.

* `<div>`

  Groups a term with its description.

* `<dt>`

  The term.

* `<dd>`

  The description.

## Basics

```html
<dl class="ui-description-list">
  <div>
    <dt>Price</dt>
    <dd>6 950 000</dd>
  </div>
  <div>
    <dt>Size</dt>
    <dd>64 m²</dd>
  </div>
  <div>
    <dt>Rooms</dt>
    <dd>3</dd>
  </div>
</dl>
```

## Bordered

Add `.ui-bordered` to the `<dl>` element to add a separator between the term and description on all items, and `.ui-dotted` with it for a dotted one.

Above `45ch` the term and description share a row and the border fills the gap between them. Narrower lists stack and show no border, unless they're horizontal (`.ui-horizontal`).

```html
<dl class="ui-description-list ui-bordered">
  <div>
    <dt>Price</dt>
    <dd>6 950 000</dd>
  </div>
  <div>
    <dt>Size</dt>
    <dd>64 m²</dd>
  </div>
  <div>
    <dt>Rooms</dt>
    <dd>3</dd>
  </div>
</dl>

<dl class="ui-description-list ui-bordered ui-dotted">
  <div>
    <dt>Price</dt>
    <dd>6 950 000</dd>
  </div>
  <div>
    <dt>Size</dt>
    <dd>64 m²</dd>
  </div>
  <div>
    <dt>Rooms</dt>
    <dd>3</dd>
  </div>
</dl>
```

## Orientation

By default the term and the description stack when the list is `45ch` or narrower, and sit side by side when it's wider. Set `.ui-horizontal` to keep them side by side at any width, for example for totals in a sidebar or summary card.

```html
<dl
  class="ui-description-list ui-bordered ui-horizontal"
  style="max-inline-size: 18rem"
>
  <div>
    <dt>Subtotal</dt>
    <dd>$120.00</dd>
  </div>
  <div>
    <dt>Shipping</dt>
    <dd>$8.00</dd>
  </div>
  <div>
    <dt>Total</dt>
    <dd>$128.00</dd>
  </div>
</dl>
```

## API

### Description list API

| Type | Modifiers | Default | Description |
| --- | --- | --- | --- |
| Borders | `.ui-bordered` | - | Adds a line between the term and the description. |
| Dotted | `.ui-dotted` | - | Makes the `.ui-bordered` line dotted. |
| Orientation | default, `.ui-horizontal` | default | The orientation of the items. `auto` stacks the term and the description when the list is `45ch` or narrower, `horizontal` keeps them side by side at any width. |

#### Parts

| Part | Description |
| --- | --- |
| `dl.ui-description-list` | Container element. |
| `<div>` | Groups a term with its description. |
| `<dt>` | The term. |
| `<dd>` | The description. |

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

The stylesheets on this page read these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md).

## Component properties

Set these on the component itself, inline or in your own CSS. Inputs are the knobs. Outputs are derived from the inputs and the current state, so overriding one fixes it in every state. [Customizing](https://open-props-ui.netlify.app/html/guide/customizing.md#component-properties) has examples.

| Property | Kind | Description |
| --- | --- | --- |
| `--_border-style` | Input | Style of the line between term and description. `.ui-bordered.ui-dotted` makes it dotted. |
| `--_border-width` | Input | Width of the line between term and description. `.ui-bordered.ui-dotted` sets it to `2px`. |

## Installation

Copy the CSS into your project to own it. It reads tokens from Open Props, `palette.css` and `theme.css`, so those go on the page too, after `layers.css`. See [Getting started](https://open-props-ui.netlify.app/html/guide/getting-started.md).

- `opui-css/css/components/description-list.css`

## Used in blocks

- [Billing](https://open-props-ui.netlify.app/blocks/billing.md)
- [Checkout](https://open-props-ui.netlify.app/blocks/checkout.md)
- [Invoice](https://open-props-ui.netlify.app/blocks/invoice.md)
- [Project overview](https://open-props-ui.netlify.app/blocks/project-overview.md)
- [Server status](https://open-props-ui.netlify.app/blocks/server-status.md)
- [Shopping cart](https://open-props-ui.netlify.app/blocks/shopping-cart.md)
