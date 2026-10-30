# Anchor

A structural primitive to enable CSS Anchor Positioning on stuff.

- CSS: `opui-css/css/components/anchor.css`.
- Full docs with every example: [HTML](https://open-props-ui.netlify.app/html/components/anchor.md), [Astro](https://open-props-ui.netlify.app/astro/components/anchor.md), [React](https://open-props-ui.netlify.app/react/components/anchor.md), [Svelte](https://open-props-ui.netlify.app/svelte/components/anchor.md), [Vue](https://open-props-ui.netlify.app/vue/components/anchor.md).

## Anchor

### Parts

- `.ui-anchor` (root): Container element. Scopes the anchor to its content.
- `& > :first-child`: The content the floating content is anchored to.
- `.ui-floating` (`AnchorContent`): The floating content.

### Props and modifiers

- `id`: `string`. The id of the root. With `trigger="hover"`, the id of `AnchorContent`. Add `interestfor` with the same id to the trigger. Required with `trigger="hover"`.
- `positionArea`: `string`, `--ui-anchor-position-area`, default `"self-start self-end"`. Any valid `position-area` value. Controls where the floating content is placed. The `self-` keywords follow the content's own direction, so the placement mirrors in a right-to-left part of a left-to-right page.
- `trigger`: `"hover"` (`.ui-floating[popover="hint"]`). Shows the floating content on hover and focus with `popover="hint"`. Without it, the content always shows.

### Slots

- `default`: The content to anchor to, followed by `AnchorContent`.

### Notes

- HTML: To show on hover, give `.ui-floating` `popover="hint"` and an id. Add `interestfor` with that id to the trigger.

## Component properties

Set inputs on the component, inline or in your CSS. Outputs follow the variant and state, so never override them.

### anchor.css

- `--_shift-x`: Horizontal shift of `.ui-floating`. Defaults to `0`.
- `--_shift-y`: Vertical shift of `.ui-floating`. Defaults to `0`.

## HTML

### Example: Always visible

```html
<span class="ui-anchor" style="--ui-anchor-position-area: inline-end">
  <button class="ui-button ui-outlined" type="button">Export</button>
  <span class="ui-floating">
    <div class="ui-card ui-tonal coach-mark">
      <div class="ui-content">
        <strong>New</strong>
        Export to PDF and CSV from the same menu.
      </div>
    </div>
  </span>
</span>

<style>
  .coach-mark {
    font-size: var(--ui-font-size-body);
    margin-inline-start: var(--ui-space-2);
    max-inline-size: 220px;
  }
</style>
```

## Astro

`import { Anchor, AnchorContent } from "opui-css/astro"`

### Example: Always visible

```astro
---
import {
  Anchor,
  AnchorContent,
  Button,
  Card,
  CardContent,
} from "opui-css/astro"
---

<Anchor positionArea="inline-end">
  <Button variant="outlined">Export</Button>
  <AnchorContent>
    <Card class="coach-mark" variant="tonal">
      <CardContent>
        <strong>New</strong> Export to PDF and CSV from the same menu.
      </CardContent>
    </Card>
  </AnchorContent>
</Anchor>

<style is:global>
  .coach-mark {
    font-size: var(--ui-font-size-body);
    margin-inline-start: var(--ui-space-2);
    max-inline-size: 220px;
  }
</style>
```

## React

`import { Anchor, AnchorContent } from "opui-css/react"`

- Client components (`"use client"`): `Anchor`.

### Example: Always visible

```tsx
import {
  Anchor,
  AnchorContent,
  Button,
  Card,
  CardContent,
} from "opui-css/react"

export default function AlwaysVisible() {
  return (
    <>
      <Anchor positionArea="inline-end">
        <Button variant="outlined">Export</Button>
        <AnchorContent>
          <Card className="coach-mark" variant="tonal">
            <CardContent>
              <strong>New</strong> Export to PDF and CSV from the same menu.
            </CardContent>
          </Card>
        </AnchorContent>
      </Anchor>
      <style>{`
        .coach-mark {
          font-size: var(--ui-font-size-body);
          margin-inline-start: var(--ui-space-2);
          max-inline-size: 220px;
        }
      `}</style>
    </>
  )
}
```

## Svelte

`import { Anchor, AnchorContent } from "opui-css/svelte"`

### Example: Always visible

```svelte
<script lang="ts">
  import {
    Anchor,
    AnchorContent,
    Button,
    Card,
    CardContent,
  } from "opui-css/svelte"
</script>

<Anchor positionArea="inline-end">
  <Button variant="outlined">Export</Button>
  <AnchorContent>
    <Card class="coach-mark" variant="tonal">
      <CardContent>
        <strong>New</strong> Export to PDF and CSV from the same menu.
      </CardContent>
    </Card>
  </AnchorContent>
</Anchor>

<style>
  :global {
    .coach-mark {
      font-size: var(--ui-font-size-body);
      margin-inline-start: var(--ui-space-2);
      max-inline-size: 220px;
    }
  }
</style>
```

## Vue

`import { Anchor, AnchorContent } from "opui-css/vue"`

### Example: Always visible

```vue
<script setup lang="ts">
import { Anchor, AnchorContent, Button, Card, CardContent } from "opui-css/vue"
</script>

<template>
  <Anchor positionArea="inline-end">
    <Button variant="outlined">Export</Button>
    <AnchorContent>
      <Card class="coach-mark" variant="tonal">
        <CardContent>
          <strong>New</strong> Export to PDF and CSV from the same menu.
        </CardContent>
      </Card>
    </AnchorContent>
  </Anchor>
</template>

<style>
.coach-mark {
  font-size: var(--ui-font-size-body);
  margin-inline-start: var(--ui-space-2);
  max-inline-size: 220px;
}
</style>
```
