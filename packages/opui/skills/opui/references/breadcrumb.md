# Breadcrumb

Shows where the page sits in a hierarchy, with a link to each level above it.

- CSS: `opui-css/css/components/breadcrumb.css`.
- Full docs with every example: [HTML](https://opui.dev/html/components/breadcrumb.md), [Astro](https://opui.dev/astro/components/breadcrumb.md), [Nunjucks](https://opui.dev/nunjucks/components/breadcrumb.md), [React](https://opui.dev/react/components/breadcrumb.md), [Solid](https://opui.dev/solid/components/breadcrumb.md), [Svelte](https://opui.dev/svelte/components/breadcrumb.md), [Vue](https://opui.dev/vue/components/breadcrumb.md).

## Breadcrumb

### Parts

- `nav.ui-breadcrumb` (root): The navigation landmark.
- `<ol>`: The list of levels.
- `<li>` (`BreadcrumbItem`, prop `items`): A level, with the separator before it.
- `<span class="ui-separator">` (slot `separator`): Replaces the drawn separator of the levels in `items`. Hidden from screen readers.

### Props and modifiers

- `aria-label`: `string`, `[aria-label]`. The accessible name of the landmark. The Astro, React, Solid and Svelte types require it, or `aria-labelledby`. In Vue it passes through as an attribute.
- `aria-labelledby`: `string`. The id of the element that names the landmark, instead of `aria-label`.
- `items`: `BreadcrumbItemData[]`. The levels, as `{ current, href, label }` objects, before the default slot. The last one is the current page unless it sets `current: false`. A level without `href` renders a `span`.
- `overflow`: `"scroll"` (`.ui-overflow-scroll`), `"shrink"` (`.ui-overflow-shrink`), `"wrap"` (default). What a trail too long for its row does: wrap onto more rows, scroll inline, or truncate every level but the first and the current one.
- `size`: `"medium"` (default), `"small"` (`.ui-small`). The size of the element.

### Slots

- `default`: The levels, after `items`.

### Notes

- HTML: The root is a `nav` with an `aria-label` around an `ol` of links. `aria-current="page"` marks the current page, on its link or on a `span`.

## BreadcrumbItem

### Parts

- `li` (root): A level.
- `<span class="ui-separator">` (slot `separator`): Replaces the drawn separator before the level. Hidden from screen readers.
- `<a>` (prop `current`, prop `href`, prop `label`): The level, as a link with `.ui-link`, or a `span`.

### Props and modifiers

- `current`: `boolean`, `[aria-current="page"]`. Marks the current page, in the text color and without an underline.
- `href`: `string`. Renders the level as a link. Without it, a `span`.
- `label`: `string`. The name of the level, before the default slot.

### Slots

- `default`: The name of the level, after `label`, such as an icon.

## Component properties

Set inputs on the component, inline or in your CSS. Outputs follow the variant and state, so never override them.

### breadcrumb.css

- `--_current-text-color`: Color of the current page. Defaults to `--ui-text-strong`.
- `--_font-size`: Font size of the trail. `--ui-font-size-body`, `--ui-font-size-caption` with `.ui-small`.
- `--_gap`: Space on each side of a separator. `--ui-space-2`, `--ui-space-1` with `.ui-small`.
- `--_separator`: The separator between two levels, as a string. Defaults to `"/"`. Screen readers skip it.
- `--_separator-text-color`: Color of the separators, drawn or slotted. Defaults to `--ui-text-subtle`.

## Theme tokens

The stylesheets read `--ui-focus-ring-offset`, `--ui-focus-ring-width`, `--ui-font-size-body`, `--ui-font-size-caption`, `--ui-font-weight-medium`, `--ui-icon-size-small`, `--ui-space-1`, `--ui-space-2`, `--ui-text-strong` and `--ui-text-subtle`. `theming.md` and `tokens.json` describe them.

## HTML

### Example: Basics

```html
<nav class="ui-breadcrumb" aria-label="Breadcrumb">
  <ol>
    <li>
      <a class="ui-link" href="#">Groups</a>
    </li>
    <li>
      <a class="ui-link" href="#">Low End Society</a>
    </li>
    <li>
      <span aria-current="page">Friday jam night</span>
    </li>
  </ol>
</nav>
```

## Astro

`import { Breadcrumb, BreadcrumbItem } from "opui-css/astro"`

- `Breadcrumb` named slots: `separator`. Fill one with `slot="separator"` on a child.
- `BreadcrumbItem` named slots: `separator`. Fill one with `slot="separator"` on a child.

### Example: Basics

```astro
---
import { Breadcrumb, BreadcrumbItem } from "opui-css/astro"
---

<Breadcrumb aria-label="Breadcrumb">
  <BreadcrumbItem href="#" label="Groups" />
  <BreadcrumbItem href="#" label="Low End Society" />
  <BreadcrumbItem current label="Friday jam night" />
</Breadcrumb>
```

## Nunjucks

`{% from "opui/index.njk" import Breadcrumb, BreadcrumbItem %}`

- `Breadcrumb` named slots: `slots.separator`. Pass a string, or markup captured with `{% set %}`.
- `BreadcrumbItem` named slots: `slots.separator`. Pass a string, or markup captured with `{% set %}`.

### Example: Basics

```njk
{% from "opui/index.njk" import Breadcrumb, BreadcrumbItem %}

{% call Breadcrumb({ "aria-label": "Breadcrumb" }) %}
  {{ BreadcrumbItem({ href: "#", label: "Groups" }) }}
  {{ BreadcrumbItem({ href: "#", label: "Low End Society" }) }}
  {{ BreadcrumbItem({ current: true, label: "Friday jam night" }) }}
{% endcall %}
```

## React

`import { Breadcrumb, BreadcrumbItem } from "opui-css/react"`

- `Breadcrumb` slot props (`ReactNode`): `children` and `separator`.
- `BreadcrumbItem` slot props (`ReactNode`): `children` and `separator`.

### Example: Basics

```tsx
import { Breadcrumb, BreadcrumbItem } from "opui-css/react"

export default function Basics() {
  return (
    <Breadcrumb aria-label="Breadcrumb">
      <BreadcrumbItem href="#" label="Groups" />
      <BreadcrumbItem href="#" label="Low End Society" />
      <BreadcrumbItem current label="Friday jam night" />
    </Breadcrumb>
  )
}
```

## Solid

`import { Breadcrumb, BreadcrumbItem } from "opui-css/solid"`

- `Breadcrumb` slot props (`JSX.Element`): `children` and `separator`.
- `BreadcrumbItem` slot props (`JSX.Element`): `children` and `separator`.

### Example: Basics

```tsx
/** @jsxImportSource @solidjs/web */
import { Breadcrumb, BreadcrumbItem } from "opui-css/solid"

export default function Basics() {
  return (
    <Breadcrumb aria-label="Breadcrumb">
      <BreadcrumbItem href="#" label="Groups" />
      <BreadcrumbItem href="#" label="Low End Society" />
      <BreadcrumbItem current label="Friday jam night" />
    </Breadcrumb>
  )
}
```

## Svelte

`import { Breadcrumb, BreadcrumbItem } from "opui-css/svelte"`

- `Breadcrumb` slot snippets: `children` and `separator`.
- `BreadcrumbItem` slot snippets: `children` and `separator`.

### Example: Basics

```svelte
<script lang="ts">
  import { Breadcrumb, BreadcrumbItem } from "opui-css/svelte"
</script>

<Breadcrumb aria-label="Breadcrumb">
  <BreadcrumbItem href="#" label="Groups" />
  <BreadcrumbItem href="#" label="Low End Society" />
  <BreadcrumbItem current label="Friday jam night" />
</Breadcrumb>
```

## Vue

`import { Breadcrumb, BreadcrumbItem } from "opui-css/vue"`

- `Breadcrumb` named slots: `separator`. Fill one with `<template #separator>`.
- `BreadcrumbItem` named slots: `separator`. Fill one with `<template #separator>`.

### Example: Basics

```vue
<script setup lang="ts">
import { Breadcrumb, BreadcrumbItem } from "opui-css/vue"
</script>

<template>
  <Breadcrumb aria-label="Breadcrumb">
    <BreadcrumbItem href="#" label="Groups" />
    <BreadcrumbItem href="#" label="Low End Society" />
    <BreadcrumbItem current label="Friday jam night" />
  </Breadcrumb>
</template>
```
