# Toast

Short messages that confirm an action and dismiss themselves.

- CSS: `opui-css/css/components/toaster.css`, `opui-css/css/components/callout.css` and `opui-css/css/components/button.css`.
- Full docs with every example: [HTML](https://open-props-ui.netlify.app/html/components/toast.md), [Astro](https://open-props-ui.netlify.app/astro/components/toast.md), [React](https://open-props-ui.netlify.app/react/components/toast.md), [Svelte](https://open-props-ui.netlify.app/svelte/components/toast.md), [Vue](https://open-props-ui.netlify.app/vue/components/toast.md).

## Toaster

### Parts

- `opui-toaster.ui-toaster` (root): The `<opui-toaster>` custom element, with `display: contents`. A button with `commandfor` and `command="--toast"` shows a toast with its `data-toast` text and `data-toast-severity`, and `toast(message, { duration, severity })` or `toast.success(message)` does it from a script. `dismiss(toast)` returns a promise that resolves once the toast is gone.
- `<ol popover="manual">`: The stack of toasts, a manual popover at the block end and the inline end of the viewport unless `side` and `align` move it. It opens with the first toast and closes after the last.
- `<li>`: A toast, a `Callout` with the severity class, its icon, the message in `.ui-content` and a close `Button`. The element adds it, and on dismiss makes it `inert`, fades it out and closes its gap before it removes it.
- `<div role="status">`: The live region that announces each toast, visually hidden with `.ui-sr-only` and outside the popover, so it's always in the page.

### Props and modifiers

- `align`: `"center"` (`.ui-align-center`), `"end"` (default), `"start"` (`.ui-align-start`). Where the toasts sit along their side of the viewport.
- `closeLabel`: `string`, `[close-label]`, default `"Close"`. The accessible name of the close button of each toast.
- `duration`: `number`, `[duration]`, default `5000`. How long a toast stays, in milliseconds, while the pointer and focus are elsewhere.
- `id`: `string`. The id the buttons point at with `commandfor`. Required.
- `side`: `"block-end"` (default), `"block-start"` (`.ui-block-start`). The side of the viewport the toasts sit on.

### Notes

- HTML: Put an `<ol popover="manual">` and a `<div class="ui-sr-only" role="status">` in `<opui-toaster class="ui-toaster">` with an id, and import `opui-css/elements/toaster.js`.
- Astro: Attributes that aren't props go to the root `<opui-toaster>`. The component loads `opui-css/elements/toaster.js`, which exports `toast()` for a client script.
- React: Attributes that aren't props go to the root `<opui-toaster>`. Toasts show once the component hydrates. `opui-css/react` exports `toast()` next to `Toaster`.
- Svelte: Attributes that aren't props go to the root `<opui-toaster>`. Toasts show once the component hydrates. `opui-css/svelte` exports `toast()` next to `Toaster`.
- Vue: Attributes that aren't props go to the root `<opui-toaster>`. Toasts show once the component hydrates. `opui-css/vue` exports `toast()` next to `Toaster`.

## Component properties

Set inputs on the component, inline or in your CSS. Outputs follow the variant and state, so never override them.

### toaster.css

- `--_ease`: Easing of a toast fading and sliding in.
- `--_gap`: Space between stacked toasts.
- `--_inset`: Distance of the stack from the edges of the viewport.
- `--_max-inline-size`: Maximum width of a toast.
- `--_motion`: Motion multiplier, `0` with reduced motion.

Outputs: `--_duration` and `--_shadow`.

### callout.css

- `--_content-gap`: Space between the children of `.ui-content`.
- `--_font-size`: Font size of `.ui-content`.
- `--_gap`: Gap between a direct child `svg` and `.ui-content`.
- `--_icon-size`: Width of the icon column when there's a direct child `svg`.
- `--_link-ease`: Easing of the link color transition. Defaults to `--ui-ease`.
- `--_link-hover-text-color`: Link color on hover and focus. Defaults to `--ui-primary-text`, not used in `.ui-outlined`.
- `--_motion`: Motion multiplier for the link color transition. `0` turns it off.
- `--_outlined-bg-color`: Background of `.ui-outlined`. Defaults to `--ui-surface`.
- `--_outlined-border-color`: Border color of `.ui-outlined`. Defaults to `--ui-border-color`, set by the severity classes.
- `--_outlined-icon-text-color`: Icon color of `.ui-outlined`. Set by the severity classes.
- `--_outlined-text-color`: Text color of `.ui-outlined`. Set by the severity classes.
- `--_padding`: The padding.
- `--_radius`: The corner radius. Defaults to `--ui-radius`.
- `--_shadow`: The shadow. Defaults to `--ui-shadow-surface`.
- `--_surface-bg-color`: The opaque background under the tint. Defaults to `--ui-surface`.
- `--_title-font-size`: Font size of headings in `.ui-content`.

Outputs: `--_bg-color`, `--_border-color`, `--_icon-text-color`, `--_link-duration` and `--_text-color`.

### button.css

- `--_accent`: The accent color. Fills, borders, text, hover and active states are derived from it. Defaults to `--ui-button-accent` when a theme sets it. `.ui-primary` and `.ui-critical` set it.
- `--_accent-fill`: Fill of filled buttons, of hovered outlined and tonal buttons unless `--ui-button-hover` is `layer`, and the base of the filled hover and pressed shades. `--ui-button-accent-filled` when a theme sets it, else `--_accent`, and in `.ui-critical` `--ui-critical` kept within `--ui-accent-fill-max-lightness`, so the light text stays readable while the border keeps `--ui-critical`. `.ui-primary` resets it to `--_accent`, so the token applies to default buttons only.
- `--_accent-tonal`: Background of `.ui-tonal`. `--ui-surface-tonal`, a palette tint in `.ui-critical`, and `--ui-primary-tonal` or the tint in `.ui-primary`.
- `--_border-width`: The border width.
- `--_ease`: Easing of the transitions. Defaults to `--ui-ease`.
- `--_font-size`: The font size. Set by `.ui-x-small` and `.ui-small`.
- `--_icon-size`: The size of a direct child `svg`. Icon-only buttons scale it with `--_size`.
- `--_motion`: Motion multiplier for the transitions. `0` turns them off.
- `--_on-accent`: Text color on a fill of `--_accent`. Defaults to `--ui-button-on-accent` when a theme sets it. `.ui-primary` sets `--ui-on-primary`, `.ui-critical` `--ui-on-fill`.
- `--_on-accent-fill`: Text color on `--_accent-fill`: filled buttons, and hovered outlined and tonal ones unless `--ui-button-hover` is `layer`. `--ui-button-on-accent-filled` when a theme sets it, else `--_on-accent`.
- `--_on-accent-tonal`: Text color of `.ui-tonal`.
- `--_padding-inline`: The inline padding. Set by the size classes from `--ui-button-padding-inline` and its size variants.
- `--_radius`: The corner radius. Defaults to `--ui-button-radius`, or `--ui-radius` when the theme doesn't set it. `.ui-round` makes it round.
- `--_size`: The height, and the width of an icon-only button. Defaults to `--ui-button-size`, set by the size classes.

Outputs: `--_accent-text`, `--_actions-shift`, `--_bg-color`, `--_border-color`, `--_default-active-bg-color`, `--_default-hover-bg-color`, `--_duration`, `--_filled-active-bg-color`, `--_filled-hover-bg-color`, `--_outlined-active-bg-color`, `--_outlined-active-border-color`, `--_outlined-active-text-color`, `--_outlined-hover-bg-color`, `--_outlined-hover-border-color`, `--_outlined-hover-text-color`, `--_shadow`, `--_text-color`, `--_tonal-active-bg-color`, `--_tonal-active-text-color`, `--_tonal-hover-bg-color` and `--_tonal-hover-text-color`.

## Theme tokens

The stylesheets read `--ui-accent-fill-max-lightness`, `--ui-border-color`, `--ui-border-color-on-raised`, `--ui-border-color-raised`, `--ui-border-width`, `--ui-button-accent`, `--ui-button-accent-filled`, `--ui-button-font-weight`, `--ui-button-hover`, `--ui-button-hover-shadow`, `--ui-button-hover-translate`, `--ui-button-on-accent`, `--ui-button-on-accent-filled`, `--ui-button-padding-inline`, `--ui-button-padding-inline-large`, `--ui-button-padding-inline-small`, `--ui-button-padding-inline-x-small`, `--ui-button-radius`, `--ui-button-size`, `--ui-button-size-large`, `--ui-button-size-small`, `--ui-button-size-x-small`, `--ui-card-padding`, `--ui-contrast`, `--ui-control-accent`, `--ui-control-border-color`, `--ui-control-border-color-filled`, `--ui-critical`, `--ui-critical-text`, `--ui-disabled-opacity`, `--ui-duration`, `--ui-duration-fast`, `--ui-ease`, `--ui-ease-enter`, `--ui-ease-exit`, `--ui-ease-move`, `--ui-field-border-color`, `--ui-field-border-color-on-raised`, `--ui-field-border-width`, `--ui-focus-ring-offset`, `--ui-focus-ring-width`, `--ui-font-code`, `--ui-font-size-body`, `--ui-font-size-caption`, `--ui-font-size-control`, `--ui-font-size-small`, `--ui-font-weight-bold`, `--ui-font-weight-normal`, `--ui-font-weight-semibold`, `--ui-icon-size`, `--ui-line-height-tight`, `--ui-motion`, `--ui-on-control-accent`, `--ui-on-fill`, `--ui-on-primary`, `--ui-on-primary-tonal`, `--ui-palette-accent`, `--ui-palette-border`, `--ui-palette-on-strong`, `--ui-palette-on-tint`, `--ui-palette-strong`, `--ui-palette-tint`, `--ui-palette-tint-subtle`, `--ui-press-scale`, `--ui-primary`, `--ui-primary-text`, `--ui-primary-tonal`, `--ui-radius`, `--ui-radius-round`, `--ui-radius-small`, `--ui-shadow-control`, `--ui-shadow-field`, `--ui-shadow-overlay`, `--ui-shadow-surface`, `--ui-space-1`, `--ui-space-2`, `--ui-space-3`, `--ui-space-4`, `--ui-state-active-alpha-accent`, `--ui-state-active-alpha-dark`, `--ui-state-active-alpha-light`, `--ui-state-hover-alpha-accent`, `--ui-state-hover-alpha-dark`, `--ui-state-hover-alpha-light`, `--ui-surface`, `--ui-surface-tonal`, `--ui-text`, `--ui-text-disabled`, `--ui-text-max-chroma`, `--ui-text-min-lightness` and `--ui-text-strong`. `theming.md` and `tokens.json` describe them.

## HTML

### Example: Basics

```html
<button
  type="button"
  class="ui-button ui-filled"
  commandfor="toast-basics-1"
  command="--toast"
  data-toast="Changes saved"
  data-toast-severity="success"
>
  Save changes
</button>
<opui-toaster class="ui-toaster" id="toast-basics-1">
  <ol popover="manual"></ol>
  <div class="ui-sr-only" role="status"></div>
</opui-toaster>

<script type="module">
  import "opui-css/elements/toaster.js"
</script>
```

## Astro

`import { Toaster } from "opui-css/astro"`

### Example: Basics

```astro
---
import { Button, Toaster } from "opui-css/astro"
---

<Button
  command="--toast"
  commandfor="toast-basics-1"
  data-toast="Changes saved"
  data-toast-severity="success"
  variant="filled">Save changes</Button
>
<Toaster id="toast-basics-1" />
```

## React

`import { Toaster } from "opui-css/react"`

- Client components (`"use client"`): `Toaster`.

### Example: Basics

```tsx
import { Button, Toaster } from "opui-css/react"

export default function Basics() {
  return (
    <>
      <Button
        command="--toast"
        commandfor="toast-basics-1"
        data-toast="Changes saved"
        data-toast-severity="success"
        variant="filled"
      >
        Save changes
      </Button>
      <Toaster id="toast-basics-1" />
    </>
  )
}
```

## Svelte

`import { Toaster } from "opui-css/svelte"`

### Example: Basics

```svelte
<script lang="ts">
  import { Button, Toaster } from "opui-css/svelte"
</script>

<Button
  command="--toast"
  commandfor="toast-basics-1"
  data-toast="Changes saved"
  data-toast-severity="success"
  variant="filled">Save changes</Button
>
<Toaster id="toast-basics-1" />
```

## Vue

`import { Toaster } from "opui-css/vue"`

### Example: Basics

```vue
<script setup lang="ts">
import { Button, Toaster } from "opui-css/vue"
</script>

<template>
  <Button
    command="--toast"
    commandfor="toast-basics-1"
    data-toast="Changes saved"
    data-toast-severity="success"
    variant="filled"
    >Save changes</Button
  >
  <Toaster id="toast-basics-1" />
</template>
```
