# Copy

A button that copies text or a field's value to the clipboard.

- CSS: `opui-css/css/components/copy.css`.
- Full docs with every example: [HTML](https://open-props-ui.netlify.app/html/components/copy.md), [Astro](https://open-props-ui.netlify.app/astro/components/copy.md), [React](https://open-props-ui.netlify.app/react/components/copy.md), [Svelte](https://open-props-ui.netlify.app/svelte/components/copy.md), [Vue](https://open-props-ui.netlify.app/vue/components/copy.md).

## Copy

### Parts

- `opui-copy.ui-copy` (root): The `<opui-copy>` custom element around the text or field to copy, with `display: contents`.
- `<span popover>` (prop `copiedLabel`, prop `failedLabel`): The label next to the button that shows `copiedLabel` or `failedLabel`.
- `<span role="status">`: The live region that announces the copy, visually hidden with `.ui-sr-only`.

### Props and modifiers

- `copiedLabel`: `string`, `[copied-label]`, default `"Copied"`. The text shown and announced after a copy.
- `failedLabel`: `string`, `[failed-label]`, default `"Copy failed"`. The text shown and announced when the clipboard is blocked.
- `id`: `string`. The id the copy button points at with `commandfor`. Required.

### Slots

- `default`: The text or the field to copy, and the button if it sits inside.

### Notes

- HTML: Wrap the text or the field in `<opui-copy class="ui-copy">` with an id, and end it with `<span class="ui-sr-only" role="status">` for the announcement and `<span class="ui-floating" popover aria-hidden="true">` for the label. Point a button at it with `commandfor` and `command="--copy"`, inside the element or right after it, and import `opui-css/elements/copy.js`. Until it loads, the button is hidden.
- Astro: The component loads `opui-css/elements/copy.js`. Attributes that aren't props go to the root `<opui-copy>`, and the button works once the element runs.
- React: The component loads `opui-css/elements/copy.js` once it mounts, unless the page imports it first. Attributes that aren't props go to the root `<opui-copy>`, and the button works once the element runs.
- Svelte and Vue: The component imports `opui-css/elements/copy.js`, so the element runs as soon as the component's code loads. Attributes that aren't props go to the root `<opui-copy>`, and the button works once the element runs.

## Component properties

Set inputs on the component, inline or in your CSS. Outputs follow the variant and state, so never override them.

### copy.css

- `--_bg-color`: Background of the label. Defaults to `--ui-surface-elevated`.
- `--_motion`: Motion multiplier for the reveal and the fade. `0` turns them off.
- `--_offset`: The gap between the label and the button.

Outputs: `--_accent`, `--_border-color`, `--_duration`, `--_ease`, `--_font-size`, `--_hidden-clip-path`, `--_radius`, `--_shown-clip-path` and `--_text-color`.

## Theme tokens

The stylesheets read `--ui-border-width`, `--ui-button-accent`, `--ui-button-font-weight`, `--ui-button-padding-inline`, `--ui-button-radius`, `--ui-button-shadow`, `--ui-contrast`, `--ui-control-accent`, `--ui-control-border-color`, `--ui-duration`, `--ui-ease-enter`, `--ui-ease-exit`, `--ui-font-size-control`, `--ui-font-weight-bold`, `--ui-line-height-tight`, `--ui-motion`, `--ui-palette-strong`, `--ui-radius`, `--ui-shadow-control`, `--ui-space-1`, `--ui-space-4`, `--ui-surface-elevated`, `--ui-text-max-chroma` and `--ui-text-min-lightness`. `theming.md` and `tokens.json` describe them.

## HTML

### Example: Basics

```html
<opui-copy id="copy-basics-1" class="ui-copy">
  <div class="ui-text-field">
    <label class="ui-sr-only" for="copy-basics-2">Invite link</label>
    <span class="ui-field">
      <input
        readonly
        value="https://example.com/invite/8f3k2"
        id="copy-basics-2"
        type="text"
      />
    </span>
  </div>
  <span class="ui-sr-only" role="status"></span>
  <span aria-hidden="true" class="ui-floating" popover></span>
</opui-copy>
<button
  class="ui-button ui-outlined"
  type="button"
  command="--copy"
  commandfor="copy-basics-1"
>
  Copy
</button>

<script type="module">
  import "opui-css/elements/copy.js"
</script>
```

## Astro

`import { Copy } from "opui-css/astro"`

### Example: Basics

```astro
---
import { Button, Copy, TextField } from "opui-css/astro"
---

<Copy id="copy-basics-1">
  <TextField
    hideLabel
    label="Invite link"
    readonly
    value="https://example.com/invite/8f3k2"
  />
</Copy>
<Button command="--copy" commandfor="copy-basics-1" variant="outlined"
  >Copy</Button
>
```

## React

`import { Copy } from "opui-css/react"`

- Client components (`"use client"`): `Copy`.

### Example: Basics

```tsx
import { Button, Copy, TextField } from "opui-css/react"

export default function Basics() {
  return (
    <>
      <Copy id="copy-basics-1">
        <TextField
          hideLabel
          label="Invite link"
          readOnly
          value="https://example.com/invite/8f3k2"
        />
      </Copy>
      <Button command="--copy" commandfor="copy-basics-1" variant="outlined">
        Copy
      </Button>
    </>
  )
}
```

## Svelte

`import { Copy } from "opui-css/svelte"`

### Example: Basics

```svelte
<script lang="ts">
  import { Button, Copy, TextField } from "opui-css/svelte"
</script>

<Copy id="copy-basics-1">
  <TextField
    hideLabel
    label="Invite link"
    readonly
    value="https://example.com/invite/8f3k2"
  />
</Copy>
<Button command="--copy" commandfor="copy-basics-1" variant="outlined"
  >Copy</Button
>
```

## Vue

`import { Copy } from "opui-css/vue"`

### Example: Basics

```vue
<script setup lang="ts">
import { Button, Copy, TextField } from "opui-css/vue"
</script>

<template>
  <Copy id="copy-basics-1">
    <TextField
      hideLabel
      label="Invite link"
      readonly
      value="https://example.com/invite/8f3k2"
    />
  </Copy>
  <Button command="--copy" commandfor="copy-basics-1" variant="outlined"
    >Copy</Button
  >
</template>
```
