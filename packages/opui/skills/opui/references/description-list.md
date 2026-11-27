# Description list

A list of terms and their values, like order details or totals.

- CSS: `opui-css/css/components/description-list.css`.
- Full docs with every example: [HTML](https://opui.dev/html/components/description-list.md), [Astro](https://opui.dev/astro/components/description-list.md), [Nunjucks](https://opui.dev/nunjucks/components/description-list.md), [React](https://opui.dev/react/components/description-list.md), [Solid](https://opui.dev/solid/components/description-list.md), [Svelte](https://opui.dev/svelte/components/description-list.md), [Vue](https://opui.dev/vue/components/description-list.md).

## DescriptionList

### Parts

- `dl.ui-description-list` (root): Container element.
- `<div>` (`DescriptionListItem`): Groups a term with its description.
- `<dt>` (`DescriptionListTerm`): The term.
- `<dd>` (`DescriptionListDescription`): The description.

### Props and modifiers

- `leader`: `"dotted"` (`.ui-leader-dotted`), `"solid"` (`.ui-leader-solid`). The style of the leader, the line between the term and the description. Without it, there's no line.
- `orientation`: `"auto"` (default), `"horizontal"` (`.ui-horizontal`), `"vertical"` (`.ui-vertical`). The orientation of the items. `auto` stacks the term and the description when the list is `45ch` or narrower, `horizontal` keeps them side by side at any width, and `vertical` always stacks them.

### Slots

- `default`: The items.

## DescriptionListItem

### Parts

- `dl.ui-description-list > div` (root): Groups a term with its description.

### Props and modifiers

- `total`: `boolean`, `.ui-total`. Marks the item as the total of the list: a line above it, larger bold text and the strong text color, for the last row of an order summary.

### Slots

- `default`: The term and the description.

## Component properties

Set inputs on the component, inline or in your CSS. Outputs follow the variant and state, so never override them.

### description-list.css

- `--_border-style`: Style of the leader, the line between term and description. `.ui-leader-dotted` makes it dotted.
- `--_border-width`: Width of the leader. Defaults to `--ui-border-width`, and `--ui-border-width-large` in `.ui-leader-dotted`.

## Theme tokens

The stylesheets read `--ui-border-color`, `--ui-border-width`, `--ui-border-width-large`, `--ui-font-size-large`, `--ui-font-weight-heading`, `--ui-space-1`, `--ui-space-4`, `--ui-text` and `--ui-text-strong`. `theming.md` and `tokens.json` describe them.

## HTML

### Example: Basics

```html
<dl class="ui-description-list">
  <div>
    <dt>Order number</dt>
    <dd>10482</dd>
  </div>
  <div>
    <dt>Placed on</dt>
    <dd>Oct 8, 2026</dd>
  </div>
  <div>
    <dt>Status</dt>
    <dd>Shipped</dd>
  </div>
</dl>
```

## Astro

`import { DescriptionList, DescriptionListDescription, DescriptionListItem, DescriptionListTerm } from "opui-css/astro"`

### Example: Basics

```astro
---
import {
  DescriptionList,
  DescriptionListDescription,
  DescriptionListItem,
  DescriptionListTerm,
} from "opui-css/astro"
---

<DescriptionList>
  <DescriptionListItem>
    <DescriptionListTerm>Order number</DescriptionListTerm>
    <DescriptionListDescription>10482</DescriptionListDescription>
  </DescriptionListItem>
  <DescriptionListItem>
    <DescriptionListTerm>Placed on</DescriptionListTerm>
    <DescriptionListDescription>Oct 8, 2026</DescriptionListDescription>
  </DescriptionListItem>
  <DescriptionListItem>
    <DescriptionListTerm>Status</DescriptionListTerm>
    <DescriptionListDescription>Shipped</DescriptionListDescription>
  </DescriptionListItem>
</DescriptionList>
```

## Nunjucks

`{% from "opui/index.njk" import DescriptionList, DescriptionListDescription, DescriptionListItem, DescriptionListTerm %}`

### Example: Basics

```njk
{% from "opui/index.njk" import
  DescriptionList,
  DescriptionListDescription,
  DescriptionListItem,
  DescriptionListTerm
%}

{% call DescriptionList() %}
  {% call DescriptionListItem() %}
    {% call DescriptionListTerm() %}Order number{% endcall %}
    {% call DescriptionListDescription() %}10482{% endcall %}
  {% endcall %}
  {% call DescriptionListItem() %}
    {% call DescriptionListTerm() %}Placed on{% endcall %}
    {% call DescriptionListDescription() %}Oct 8, 2026{% endcall %}
  {% endcall %}
  {% call DescriptionListItem() %}
    {% call DescriptionListTerm() %}Status{% endcall %}
    {% call DescriptionListDescription() %}Shipped{% endcall %}
  {% endcall %}
{% endcall %}
```

## React

`import { DescriptionList, DescriptionListDescription, DescriptionListItem, DescriptionListTerm } from "opui-css/react"`

### Example: Basics

```tsx
import {
  DescriptionList,
  DescriptionListDescription,
  DescriptionListItem,
  DescriptionListTerm,
} from "opui-css/react"

export default function Basics() {
  return (
    <DescriptionList>
      <DescriptionListItem>
        <DescriptionListTerm>Order number</DescriptionListTerm>
        <DescriptionListDescription>10482</DescriptionListDescription>
      </DescriptionListItem>
      <DescriptionListItem>
        <DescriptionListTerm>Placed on</DescriptionListTerm>
        <DescriptionListDescription>Oct 8, 2026</DescriptionListDescription>
      </DescriptionListItem>
      <DescriptionListItem>
        <DescriptionListTerm>Status</DescriptionListTerm>
        <DescriptionListDescription>Shipped</DescriptionListDescription>
      </DescriptionListItem>
    </DescriptionList>
  )
}
```

## Solid

`import { DescriptionList, DescriptionListDescription, DescriptionListItem, DescriptionListTerm } from "opui-css/solid"`

### Example: Basics

```tsx
/** @jsxImportSource @solidjs/web */
import {
  DescriptionList,
  DescriptionListDescription,
  DescriptionListItem,
  DescriptionListTerm,
} from "opui-css/solid"

export default function Basics() {
  return (
    <DescriptionList>
      <DescriptionListItem>
        <DescriptionListTerm>Order number</DescriptionListTerm>
        <DescriptionListDescription>10482</DescriptionListDescription>
      </DescriptionListItem>
      <DescriptionListItem>
        <DescriptionListTerm>Placed on</DescriptionListTerm>
        <DescriptionListDescription>Oct 8, 2026</DescriptionListDescription>
      </DescriptionListItem>
      <DescriptionListItem>
        <DescriptionListTerm>Status</DescriptionListTerm>
        <DescriptionListDescription>Shipped</DescriptionListDescription>
      </DescriptionListItem>
    </DescriptionList>
  )
}
```

## Svelte

`import { DescriptionList, DescriptionListDescription, DescriptionListItem, DescriptionListTerm } from "opui-css/svelte"`

### Example: Basics

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
    <DescriptionListTerm>Order number</DescriptionListTerm>
    <DescriptionListDescription>10482</DescriptionListDescription>
  </DescriptionListItem>
  <DescriptionListItem>
    <DescriptionListTerm>Placed on</DescriptionListTerm>
    <DescriptionListDescription>Oct 8, 2026</DescriptionListDescription>
  </DescriptionListItem>
  <DescriptionListItem>
    <DescriptionListTerm>Status</DescriptionListTerm>
    <DescriptionListDescription>Shipped</DescriptionListDescription>
  </DescriptionListItem>
</DescriptionList>
```

## Vue

`import { DescriptionList, DescriptionListDescription, DescriptionListItem, DescriptionListTerm } from "opui-css/vue"`

### Example: Basics

```vue
<script setup lang="ts">
import {
  DescriptionList,
  DescriptionListDescription,
  DescriptionListItem,
  DescriptionListTerm,
} from "opui-css/vue"
</script>

<template>
  <DescriptionList>
    <DescriptionListItem>
      <DescriptionListTerm>Order number</DescriptionListTerm>
      <DescriptionListDescription>10482</DescriptionListDescription>
    </DescriptionListItem>
    <DescriptionListItem>
      <DescriptionListTerm>Placed on</DescriptionListTerm>
      <DescriptionListDescription>Oct 8, 2026</DescriptionListDescription>
    </DescriptionListItem>
    <DescriptionListItem>
      <DescriptionListTerm>Status</DescriptionListTerm>
      <DescriptionListDescription>Shipped</DescriptionListDescription>
    </DescriptionListItem>
  </DescriptionList>
</template>
```
