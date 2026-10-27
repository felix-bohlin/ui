# Stat

A stat shows one number with its label and the change behind it.

- CSS: `opui-css/css/components/stat.css`.
- Full docs with every example: [HTML](https://open-props-ui.netlify.app/html/components/stat.md), [Astro](https://open-props-ui.netlify.app/astro/components/stat.md), [React](https://open-props-ui.netlify.app/react/components/stat.md), [Svelte](https://open-props-ui.netlify.app/svelte/components/stat.md), [Vue](https://open-props-ui.netlify.app/vue/components/stat.md).

## Stat

### Parts

- `dl.ui-stat` (root): A `dl` with the label, the value and the description, so a screen reader reads them as one term with its details.
- `<dt>` (prop `label`, slot `label`): The label.
- `<dd>` (slot `default`): The value, in tabular numbers.
- `<dd>` (prop `description`, slot `description`): The description.

### Props and modifiers

- `description`: `string`. Text under the value, such as the change since last week. Rich content, such as a severity colored change, goes in the `description` slot.
- `label`: `string`. What the value counts, such as Visitors. Rich content goes in the `label` slot.
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
  <dd class="ui-value">48 210</dd>
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
  48 210
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
      label="Visitors"
      description={
        <>
          <span className="ui-caption ui-success">+12.4%</span> from last week
        </>
      }
    >
      48 210
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
  48 210
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
    48 210
    <template #description>
      <span class="ui-caption ui-success">+12.4%</span> from last week
    </template>
  </Stat>
</template>
```
