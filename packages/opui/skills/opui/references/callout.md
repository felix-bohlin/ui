# Callout

A message in the flow of the page, without interrupting the task.

- CSS: `opui-css/css/components/callout.css`.
- Full docs with every example: [HTML](https://opui.dev/html/components/callout.md), [Astro](https://opui.dev/astro/components/callout.md), [React](https://opui.dev/react/components/callout.md), [Svelte](https://opui.dev/svelte/components/callout.md), [Vue](https://opui.dev/vue/components/callout.md).

## Callout

### Parts

- `.ui-callout` (root): Container element, an `<article>`. With `closeButton`, the `<opui-callout>` custom element with `role="article"`, which a button with `commandfor` and `command="--dismiss"` dismisses.
- `<svg>` (`CalloutIcon`): An optional icon before the content. In Astro, React, Svelte and Vue, `CalloutIcon` renders the default one for critical, info, success and warning.
- `.ui-content` (`CalloutContent`): The content, with an optional heading first.
- `<button>` (prop `closeButton`, prop `closeLabel`, slot `close-icon`): A close button, a `.ui-button` that is a direct child of the callout. It sits at the end of the first row. With `closeButton`, the component renders it with `command="--dismiss"` and `commandfor` naming the callout, hidden until `<opui-callout>` is defined. Renders a close icon by default, or the `svg` in `close-icon`.
- `.ui-actions` (`CalloutActions`): A row of buttons under the content.

### Props and modifiers

- `@dismiss` (Vue): `(event: Event) => void`. Called before the callout hides, with its cancelable `dismiss` event. `preventDefault()` keeps the callout, for example to ask first.
- `closeButton`: `boolean`. Adds a close button at the end of the first row that hides the callout. The root becomes `<opui-callout>` with `role="article"`, and the component loads `opui-css/elements/callout.js`, which runs the button. While the root has `data-hydrating`, which the React component renders until it hydrates, the button does nothing.
- `closeLabel`: `string`, default `"Close"`. The accessible name of the close button.
- `id`: `string`. The id of the callout. With `closeButton`, the close button points at it with `commandfor`, so the component generates one when it's left out.
- `ondismiss` (Svelte): `(event: Event) => void`. Called before the callout hides, with its cancelable `dismiss` event. `preventDefault()` keeps the callout, for example to ask first.
- `onDismiss` (React): `(event: Event) => void`. Called before the callout hides, with its cancelable `dismiss` event. `preventDefault()` keeps the callout, for example to ask first.
- `severity`: `"critical"` (`.ui-critical`), `"info"` (`.ui-info`), `"neutral"` (`.ui-neutral`), `"success"` (`.ui-success`), `"warning"` (`.ui-warning`). The severity. Sets the color, and in Astro, React, Svelte and Vue the icon `CalloutIcon` renders.
- `variant`: `"outlined"` (`.ui-outlined`), `"tonal"` (default). The variant to use.

### Slots

- `default`: The callout parts, and any other content.

### Element

- `<opui-callout>`, defined by `opui-css/elements/callout.js`:
  - `dismiss` event: Fires on the callout before it hides. It bubbles, and `preventDefault()` keeps the callout.
  - `dismiss()`: Fires `dismiss` and, unless a listener cancels it, sets `hidden` on the callout and moves focus that was inside it to the next focusable element after it, or else the one before. Returns whether the callout hid.

### Notes

- HTML: For a close button that hides the callout, use `<opui-callout class="ui-callout" role="article">` with an id, end it with a `.ui-button` with `commandfor` naming it and `command="--dismiss"`, and import `opui-css/elements/callout.js`. Until it loads, the button is hidden.
- Astro: For a custom icon, put your own `<svg aria-hidden="true">` in the Callout instead of `CalloutIcon`, before `CalloutContent`. The component loads `opui-css/elements/callout.js`. With `closeButton`, the root is `<opui-callout>`, and the close button shows and works once the element runs. Listen for `dismiss` in a client script.
- React: For a custom icon, put your own `<svg aria-hidden="true">` in the Callout instead of `CalloutIcon`, before `CalloutContent`. The component loads `opui-css/elements/callout.js` once it mounts, unless the page imports it first. With `closeButton`, the root is `<opui-callout>`, and the close button shows and works once the element runs.
- Svelte and Vue: For a custom icon, put your own `<svg aria-hidden="true">` in the Callout instead of `CalloutIcon`, before `CalloutContent`. The component imports `opui-css/elements/callout.js`, so the element runs as soon as the component's code loads. With `closeButton`, the root is `<opui-callout>`, and the close button shows and works once the element runs.

## Component properties

Set inputs on the component, inline or in your CSS. Outputs follow the variant and state, so never override them.

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

## Theme tokens

The stylesheets read `--ui-border-color`, `--ui-border-color-on-raised`, `--ui-border-color-raised`, `--ui-border-width`, `--ui-duration`, `--ui-ease`, `--ui-field-border-color-on-raised`, `--ui-font-size-body`, `--ui-font-size-small`, `--ui-font-weight-semibold`, `--ui-icon-size`, `--ui-motion`, `--ui-palette-accent`, `--ui-palette-border`, `--ui-palette-strong`, `--ui-palette-tint-subtle`, `--ui-primary-text`, `--ui-radius`, `--ui-shadow-surface`, `--ui-space-1`, `--ui-space-2`, `--ui-space-3`, `--ui-surface`, `--ui-surface-tonal` and `--ui-text-strong`. `theming.md` and `tokens.json` describe them.

## HTML

### Example: Variants

```html
<article class="ui-callout">
  <div class="ui-content">
    <h3>Scheduled maintenance</h3>
    <p>
      Bassbook is read-only on Sunday from 02:00 to 04:00 UTC while we restring
      the servers.
    </p>
  </div>
</article>
<article class="ui-callout ui-outlined">
  <div class="ui-content">
    <h3>Bassbook Gold has moved</h3>
    <p>
      Receipts and payment methods now live in the Gold tab of your profile
      settings, right next to your gear list.
    </p>
  </div>
</article>
```

## Astro

`import { Callout, CalloutActions, CalloutContent, CalloutIcon } from "opui-css/astro"`

- `Callout` named slots: `close-icon`. Fill one with `slot="close-icon"` on a child.

### Example: Variants

```astro
---
import { Callout, CalloutContent } from "opui-css/astro"
---

<Callout>
  <CalloutContent>
    <h3>Scheduled maintenance</h3>
    <p>
      Bassbook is read-only on Sunday from 02:00 to 04:00 UTC while we restring
      the servers.
    </p>
  </CalloutContent>
</Callout>
<Callout variant="outlined">
  <CalloutContent>
    <h3>Bassbook Gold has moved</h3>
    <p>
      Receipts and payment methods now live in the Gold tab of your profile
      settings, right next to your gear list.
    </p>
  </CalloutContent>
</Callout>
```

## React

`import { Callout, CalloutActions, CalloutContent, CalloutIcon } from "opui-css/react"`

- `Callout` slot props (`ReactNode`): `children` and `closeIcon`.
- Client components (`"use client"`): `Callout`.

### Example: Variants

```tsx
import { Callout, CalloutContent } from "opui-css/react"

export default function Variants() {
  return (
    <>
      <Callout>
        <CalloutContent>
          <h3>Scheduled maintenance</h3>
          <p>
            Bassbook is read-only on Sunday from 02:00 to 04:00 UTC while we
            restring the servers.
          </p>
        </CalloutContent>
      </Callout>
      <Callout variant="outlined">
        <CalloutContent>
          <h3>Bassbook Gold has moved</h3>
          <p>
            Receipts and payment methods now live in the Gold tab of your
            profile settings, right next to your gear list.
          </p>
        </CalloutContent>
      </Callout>
    </>
  )
}
```

## Svelte

`import { Callout, CalloutActions, CalloutContent, CalloutIcon } from "opui-css/svelte"`

- `Callout` slot snippets: `children` and `closeIcon`.

### Example: Variants

```svelte
<script lang="ts">
  import { Callout, CalloutContent } from "opui-css/svelte"
</script>

<Callout>
  <CalloutContent>
    <h3>Scheduled maintenance</h3>
    <p>
      Bassbook is read-only on Sunday from 02:00 to 04:00 UTC while we restring
      the servers.
    </p>
  </CalloutContent>
</Callout>
<Callout variant="outlined">
  <CalloutContent>
    <h3>Bassbook Gold has moved</h3>
    <p>
      Receipts and payment methods now live in the Gold tab of your profile
      settings, right next to your gear list.
    </p>
  </CalloutContent>
</Callout>
```

## Vue

`import { Callout, CalloutActions, CalloutContent, CalloutIcon } from "opui-css/vue"`

- `Callout` named slots: `close-icon`. Fill one with `<template #close-icon>`.

### Example: Variants

```vue
<script setup lang="ts">
import { Callout, CalloutContent } from "opui-css/vue"
</script>

<template>
  <Callout>
    <CalloutContent>
      <h3>Scheduled maintenance</h3>
      <p>
        Bassbook is read-only on Sunday from 02:00 to 04:00 UTC while we
        restring the servers.
      </p>
    </CalloutContent>
  </Callout>
  <Callout variant="outlined">
    <CalloutContent>
      <h3>Bassbook Gold has moved</h3>
      <p>
        Receipts and payment methods now live in the Gold tab of your profile
        settings, right next to your gear list.
      </p>
    </CalloutContent>
  </Callout>
</template>
```
