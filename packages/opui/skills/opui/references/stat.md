# Stat

A number with its label and its change, like revenue on a dashboard.

- CSS: `opui-css/css/components/stat.css`.
- Full docs with every example: [HTML](https://opui.dev/html/components/stat.md), [Astro](https://opui.dev/astro/components/stat.md), [React](https://opui.dev/react/components/stat.md), [Svelte](https://opui.dev/svelte/components/stat.md), [Vue](https://opui.dev/vue/components/stat.md).

## Stat

### Parts

- `dl.ui-stat` (root): A `dl` with the label, the value and the description, so a screen reader reads them as one term with its details.
- `<dt class="ui-label">` (prop `label`, slot `label`): The label.
- `<dd class="ui-value">` (slot `default`): The value, in tabular numbers.
- `<dd class="ui-description">` (prop `description`, slot `description`): The description.

### Props and modifiers

- `description`: `string`. Text under the value, such as the change since last week.
- `label`: `string`. What the value counts, such as Visitors.
- `size`: `"large"` (`.ui-large`), `"medium"` (default), `"small"` (`.ui-small`). The size of the value.

### Slots

- `default`: The value.

## Component properties

Set inputs on the component, inline or in your CSS. Outputs follow the variant and state, so never override them.

### stat.css

- `--_value-font-size`: Font size of the value. Defaults to `--ui-font-size-h4`, set by the size classes.

## Theme tokens

The stylesheets read `--ui-font-size-caption`, `--ui-font-size-h3`, `--ui-font-size-h4`, `--ui-font-size-large`, `--ui-font-weight-bold`, `--ui-line-height`, `--ui-line-height-tight`, `--ui-space-1`, `--ui-text` and `--ui-text-strong`. `theming.md` and `tokens.json` describe them.

## HTML

### Example: Basics

```html
<dl class="ui-stat">
  <dt class="ui-label">Visitors</dt>
  <dd class="ui-value">48,210</dd>
  <dd class="ui-description">
    <span class="ui-caption ui-success">+12.4%</span> from last week
  </dd>
</dl>
```

## Astro

`import { Stat } from "opui-css/astro"`

- `Stat` named slots: `description` and `label`. Fill one with `slot="description"` on a child.

### Example: Basics

```astro
---
import { Stat } from "opui-css/astro"
---

<Stat label="Visitors">
  48,210
  <Fragment slot="description">
    <span class="ui-caption ui-success">+12.4%</span> from last week
  </Fragment>
</Stat>
```

## React

`import { Stat } from "opui-css/react"`

- `Stat` slot props (`ReactNode`): `children`, `description` and `label`.

### Example: Basics

```tsx
import { Stat } from "opui-css/react"

export default function Basics() {
  return (
    <Stat
      description={
        <>
          <span className="ui-caption ui-success">+12.4%</span> from last week
        </>
      }
      label="Visitors"
    >
      48,210
    </Stat>
  )
}
```

## Svelte

`import { Stat } from "opui-css/svelte"`

- `Stat` slot snippets: `children`, `description` and `label`.

### Example: Basics

```svelte
<script lang="ts">
  import { Stat } from "opui-css/svelte"
</script>

<Stat label="Visitors">
  48,210
  {#snippet description()}
    <span class="ui-caption ui-success">+12.4%</span> from last week
  {/snippet}
</Stat>
```

## Vue

`import { Stat } from "opui-css/vue"`

- `Stat` named slots: `description` and `label`. Fill one with `<template #description>`.

### Example: Basics

```vue
<script setup lang="ts">
import { Stat } from "opui-css/vue"
</script>

<template>
  <Stat label="Visitors">
    48,210
    <template #description>
      <span class="ui-caption ui-success">+12.4%</span> from last week
    </template>
  </Stat>
</template>
```
