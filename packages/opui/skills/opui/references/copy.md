# Copy

A button that copies text or a field's value to the clipboard.

- CSS: `opui-css/css/components/copy.css`.
- Full docs with every example: [HTML](https://open-props-ui.netlify.app/html/components/copy.md), [Astro](https://open-props-ui.netlify.app/astro/components/copy.md), [React](https://open-props-ui.netlify.app/react/components/copy.md), [Svelte](https://open-props-ui.netlify.app/svelte/components/copy.md), [Vue](https://open-props-ui.netlify.app/vue/components/copy.md).

## Copy

### Parts

- `opui-copy.ui-copy` (root): The `<opui-copy>` custom element, with `display: contents`. A button with `command="--copy"` copies the value of its first `input` or `textarea`, or else its text without buttons, and gets `data-copied` for two seconds.
- `<span role="status">`: The live region that announces the copy, visually hidden with `.ui-sr-only`.

### Props and modifiers

- `copiedLabel`: `string`, `[copied-label]`, default `"Copied"`. The text announced after a copy.
- `id`: `string`. The id the copy button points at with `commandfor`. Required.

### Slots

- `default`: The text or the field to copy, and the button if it sits inside.

### Notes

- HTML: Wrap the text or the field in `<opui-copy class="ui-copy">` with an id, and end it with `<span class="ui-sr-only" role="status">` for the announcement. Point a button at it with `commandfor` and `command="--copy"`, inside the element or right after it, and import `opui-css/elements/copy.js`. Until it loads, the button is hidden.
- Astro, React, Svelte and Vue: Attributes that aren't props go to the root `<opui-copy>`. The button works once the component hydrates, or once the page imports `opui-css/elements/copy.js`; the Astro component loads it.

## Component properties

Set inputs on the component, inline or in your CSS. Outputs follow the variant and state, so never override them.

### copy.css

Outputs: `--_accent`.

## Theme tokens

The stylesheets read `--ui-success`. `theming.md` and `tokens.json` describe them.

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
