# Copy

A button that copies text or a field's value to the clipboard.

- CSS: `opui-css/css/components/copy.css`.
- Full docs with every example: [HTML](https://open-props-ui.netlify.app/html/components/copy.md), [Astro](https://open-props-ui.netlify.app/astro/components/copy.md), [React](https://open-props-ui.netlify.app/react/components/copy.md), [Svelte](https://open-props-ui.netlify.app/svelte/components/copy.md), [Vue](https://open-props-ui.netlify.app/vue/components/copy.md).

## Copy

### Parts

- `opui-copy.ui-copy` (root): The `<opui-copy>` custom element, with `display: contents`. A button with `command="--copy"` copies the value of its first `input` or `textarea`, or else its text without buttons and popovers. Where the clipboard is blocked, it selects the text instead.
- `<span role="status">`: The live region that announces the copy, visually hidden with `.ui-sr-only`.
- `<span popover>` (prop `copiedLabel`, prop `failedLabel`): The label next to the button, in the look of an outlined button at the button's height. It shows `copiedLabel` for two seconds, or `failedLabel` until Esc, a click elsewhere or the next copy.

### Props and modifiers

- `copiedLabel`: `string`, `[copied-label]`, default `"Copied"`. The text shown and announced after a copy.
- `failedLabel`: `string`, `[failed-label]`, default `"Copy failed"`. The text shown and announced when the clipboard is blocked.
- `id`: `string`. The id the copy button points at with `commandfor`. Required.

### Slots

- `default`: The text or the field to copy, and the button if it sits inside.

### Notes

- HTML: Wrap the text or the field in `<opui-copy class="ui-copy">` with an id, and end it with `<span class="ui-sr-only" role="status">` for the announcement and `<span class="ui-floating" popover aria-hidden="true">` for the label. Point a button at it with `commandfor` and `command="--copy"`, inside the element or right after it, and import `opui-css/elements/copy.js`. Until it loads, the button is hidden.
- Astro, React, Svelte and Vue: Attributes that aren't props go to the root `<opui-copy>`. The button works once the component hydrates, or once the page imports `opui-css/elements/copy.js`; the Astro component loads it.

## Component properties

Set inputs on the component, inline or in your CSS. Outputs follow the variant and state, so never override them.

### copy.css

- `--_bg-color`: Background of the label. Defaults to `--ui-surface-elevated`.
- `--_ease`: Easing of the reveal and the fade. Defaults to `--ui-ease-enter`.
- `--_motion`: Motion multiplier for the reveal and the fade. `0` turns them off.
- `--_offset`: The gap between the label and the button.

Outputs: `--_accent`, `--_border-color`, `--_duration`, `--_font-size`, `--_hidden`, `--_radius` and `--_text-color`.

## Theme tokens

The stylesheets read `--ui-border-width`, `--ui-button-accent`, `--ui-button-font-weight`, `--ui-button-padding-inline`, `--ui-button-radius`, `--ui-contrast`, `--ui-control-accent`, `--ui-control-border-color`, `--ui-duration`, `--ui-ease-enter`, `--ui-font-size-control`, `--ui-font-weight-bold`, `--ui-line-height-tight`, `--ui-motion`, `--ui-palette-strong`, `--ui-radius`, `--ui-shadow-control`, `--ui-space-1`, `--ui-surface-elevated`, `--ui-text-max-chroma` and `--ui-text-min-lightness`. `theming.md` and `tokens.json` describe them.

## HTML

### Example: Basics

```html
<opui-copy class="ui-copy" id="copy-basics-1">
  <label class="ui-text-field">
    <span class="ui-sr-only">Invite link</span>
    <span class="ui-field">
      <input readonly type="text" value="https://example.com/invite/8f3k2" />
    </span>
  </label>
  <span class="ui-sr-only" role="status"></span>
  <span class="ui-floating" popover aria-hidden="true"></span>
</opui-copy>
<button
  type="button"
  class="ui-button ui-outlined"
  commandfor="copy-basics-1"
  command="--copy"
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
