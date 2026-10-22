# Description list

## Anatomy

- Price

  6 950 000

* `dl.ui-description-list`

  Container element.

* `.ui-item`

  Groups a term with its description.

* `<dt>`

  The term.

* `<dd>`

  The description.

## Basics

```html
<dl class="ui-description-list">
  <div class="ui-item">
    <dt>Price</dt>
    <dd>6 950 000</dd>
  </div>
  <div class="ui-item">
    <dt>Size</dt>
    <dd>64 m²</dd>
  </div>
  <div class="ui-item">
    <dt>Rooms</dt>
    <dd>3</dd>
  </div>
</dl>
```

## Bordered

Add `.ui-bordered` to the `<dl>` element. For a dotted style, also add `.ui-dotted`.

Above `45ch` the term and description share a row and the border fills the gap between them. Narrower lists stack and show no border, unless they're inline (`.ui-inline`).

```html
<dl class="ui-description-list ui-bordered">
  <div class="ui-item">
    <dt>Price</dt>
    <dd>6 950 000</dd>
  </div>
  <div class="ui-item">
    <dt>Size</dt>
    <dd>64 m²</dd>
  </div>
  <div class="ui-item">
    <dt>Rooms</dt>
    <dd>3</dd>
  </div>
</dl>

<dl class="ui-description-list ui-bordered ui-dotted">
  <div class="ui-item">
    <dt>Price</dt>
    <dd>6 950 000</dd>
  </div>
  <div class="ui-item">
    <dt>Size</dt>
    <dd>64 m²</dd>
  </div>
  <div class="ui-item">
    <dt>Rooms</dt>
    <dd>3</dd>
  </div>
</dl>
```

## Inline

The term and the description stack when the list is `45ch` or narrower, and sit side by side when it's wider. Set `.ui-inline` to keep them side by side at any width, for example for totals in a sidebar or summary card.

```html
<dl
  class="ui-description-list ui-bordered ui-inline"
  style="max-inline-size: 18rem"
>
  <div class="ui-item">
    <dt>Subtotal</dt>
    <dd>$120.00</dd>
  </div>
  <div class="ui-item">
    <dt>Shipping</dt>
    <dd>$8.00</dd>
  </div>
  <div class="ui-item">
    <dt>Total</dt>
    <dd>$128.00</dd>
  </div>
</dl>
```

## API

### Description list API

| Type     | Modifiers                                | Default | Description                                                                                                              |
| -------- | ---------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------ |
| Bordered | `.ui-bordered`, `.ui-bordered.ui-dotted` | -       | Adds a border between the term and the description.                                                                      |
| Layout   | `.ui-inline`                             | -       | Keeps the term and the description side by side at any width. Without it they stack when the list is `45ch` or narrower. |

#### Parts

| Part                     | Description                         |
| ------------------------ | ----------------------------------- |
| `dl.ui-description-list` | Container element.                  |
| `.ui-item`               | Groups a term with its description. |
| `<dt>`                   | The term.                           |
| `<dd>`                   | The description.                    |

#### CSS variables

| Variable                  | Default                                           | Description                                                                                                                                                                                                                                 |
| ------------------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--ui-border-color`       | `light-dark(var(--ui-gray-4), var(--ui-gray-12))` | Default border color for cards, lists, tables and dividers.                                                                                                                                                                                 |
| `--ui-border-width`       | `1px`                                             | Default border width for components that draw a border.                                                                                                                                                                                     |
| `--ui-border-width-thick` | `var(--border-size-2)`                            | Width of emphasized rules: the `Table` head and foot borders, the `AvatarGroup` ring, the `Badge` border, the neutral `Chip` dot, the dotted `DescriptionList` rule, the `Tabs` indicator, and at one and a half times, the blockquote bar. |
| `--ui-font-weight-bold`   | `var(--font-weight-7)`                            | Font weight for headings, buttons and terms.                                                                                                                                                                                                |
| `--ui-space-1`            | `calc(var(--size-1) * var(--ui-space-scale))`     | Spacing step 1: Open Props `--size-1` times `--ui-space-scale`.                                                                                                                                                                             |
| `--ui-space-3`            | `calc(var(--size-3) * var(--ui-space-scale))`     | Spacing step 3: Open Props `--size-3` times `--ui-space-scale`.                                                                                                                                                                             |
| `--ui-text-muted`         | `light-dark(var(--ui-gray-13), var(--ui-gray-4))` | Body text color.                                                                                                                                                                                                                            |

This component uses these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md).

## Component properties

Set these on the component itself, inline or in your own CSS. Inputs are the knobs. Outputs are derived from the inputs and the current state, so overriding one fixes it in every state. [Customizing](https://open-props-ui.netlify.app/html/guide/customizing.md#component-properties) has examples.

| Property          | Kind  | Description                                                                                      |
| ----------------- | ----- | ------------------------------------------------------------------------------------------------ |
| `--_border-style` | Input | Style of the line between term and description in `.ui-bordered`. `.ui-dotted` makes it dotted.  |
| `--_border-width` | Input | Width of the line between term and description in `.ui-bordered`. `.ui-dotted` sets it to `2px`. |

## Under the hood

Read the post: [Leader lines with grid](https://open-props-ui.netlify.app/learn/description-list-leader-lines)

1. Row

   - A `<div>` around each `<dt>` and `<dd>` pair is valid HTML
   - One box per pair: easy to lay out, easy to space
   - Term and description share a row by default

2. Leader line

   - `::after` is a grid item too
   - `order` slots it between term and description
   - The `1fr` middle column stretches the line to fill the gap

3. Dotted

   - The variant only sets two custom properties
   - The leader line rule stays the same

4. Container query

   - The list measures itself, not the viewport
   - `45ch` or narrower: the term stacks above the description, and the line goes
   - Drag **Width** below the breakpoint to stack it
   - `.inline` keeps the row at any width

Step 1 of 4: Row

```html
<dl class="dl">
  <div class="item">
    <dt>Price</dt>
    <dd>6 950 000</dd>
  </div>
  …
</dl>
```

```css
.dl {
  display: grid;
  margin: 0;
}

.item {
  align-items: baseline;
  display: grid;
  gap: 0.25rem;
  grid-template-columns: auto auto;
  justify-content: space-between;
}

.item + .item {
  margin-block-start: 0.25rem;
}

.item dt {
  font-weight: 700;
}

.item dd {
  color: var(--ui-text-muted);
  margin: 0;
  text-align: end;
}
```

Step 2 of 4: Leader line

```css
.bordered > .item {
  grid-template-columns: auto 1fr auto;
}

.bordered > .item::after {
  block-size: 2px;
  border-block-end: var(--line-width, 1px) var(--line-style, solid)
    var(--ui-border-color);
  content: "";
  order: 1;
}

.bordered > .item dd {
  order: 2;
}
```

Step 3 of 4: Dotted

```css
.dotted {
  --line-style: dotted;
  --line-width: 2px;
}
```

Step 4 of 4: Container query

- [`Container queries (size)` ](https://webstatus.dev/features/container-queries)(Widely available): Chrome 105+, Edge 105+, Firefox 110+, Safari 16+

```css
.dl {
  container-type: inline-size;
}

@container (inline-size <= 45ch) {
  .dl:not(.inline) > .item {
    align-items: normal;
    gap: 0;
    grid-template-columns: none;
    justify-content: normal;
  }

  .dl:not(.inline) > .item + .item {
    margin-block-start: 0.75rem;
  }

  .dl:not(.inline) > .item dd {
    color: inherit;
    text-align: start;
  }

  .dl:not(.inline) > .item::after {
    content: none;
  }
}
```

## Browser support

- Chromium: Full support Supported since v105.
- Firefox: Full support Supported since v110.
- Safari: Full support Supported since v16.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/html/guide/browser-support/?components=Description+List.md).

## Installation

Copy the CSS into your project to own it. It reads tokens from Open Props, `palette.css` and `theme.css`, so those go on the page too, after `layers.css`. See [Getting started](https://open-props-ui.netlify.app/html/guide/getting-started.md).

- `opui-css/css/components/description-list.css`

## Changelog

### What's new

- [Inline](#inline) keeps terms and descriptions side by side at any width with `.ui-inline`.
- Breaking: `.ui-term` and `.ui-description` are gone. The list styles `dt` and `dd` by element ([Basics](#basics)).
