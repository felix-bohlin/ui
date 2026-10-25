# Description list

Description lists are used to display a list of terms and their descriptions.

- CSS: `opui-css/css/components/description-list.css`.
- Full docs with every example: [HTML](https://open-props-ui.netlify.app/html/components/description-list.md), [Astro](https://open-props-ui.netlify.app/astro/components/description-list.md), [React](https://open-props-ui.netlify.app/react/components/description-list.md), [Svelte](https://open-props-ui.netlify.app/svelte/components/description-list.md), [Vue](https://open-props-ui.netlify.app/vue/components/description-list.md).

## DescriptionList

### Parts

- `dl.ui-description-list` (root): Container element.
- `<div>` (`DescriptionListItem`): Groups a term with its description.
- `<dt>` (`DescriptionListTerm`): The term.
- `<dd>` (`DescriptionListDescription`): The description.

### Props and modifiers

- `bordered`: `boolean`, `.ui-bordered`. Adds a line between the term and the description.
- `dotted`: `boolean`, `.ui-dotted`. Makes the `bordered` line dotted.
- `orientation`: `"auto"` (default), `"horizontal"` (`.ui-horizontal`). The orientation of the items. `auto` stacks the term and the description when the list is `45ch` or narrower, `horizontal` keeps them side by side at any width.

### Slots

- `default`: The items.

## Component properties

Set inputs on the component, inline or in your CSS. Outputs follow the variant and state, so never override them.

### description-list.css

- `--_border-style`: Style of the line between term and description. `.ui-bordered.ui-dotted` makes it dotted.
- `--_border-width`: Width of the line between term and description. `.ui-bordered.ui-dotted` sets it to `2px`.

## Theme tokens

The stylesheets read `--ui-border-color`, `--ui-border-width`, `--ui-border-width-thick`, `--ui-font-weight-bold`, `--ui-space-1`, `--ui-space-3` and `--ui-text`. `theming.md` and `tokens.json` describe them.

## HTML

### Example: Basics

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
</template>
```
