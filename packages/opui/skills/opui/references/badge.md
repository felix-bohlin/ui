# Badge

Badges attach a small count or status dot to another element.

- CSS: `opui-css/css/components/badge.css` and `opui-css/css/components/anchor.css`.
- Full docs with every example: [HTML](https://open-props-ui.netlify.app/html/components/badge.md), [Astro](https://open-props-ui.netlify.app/astro/components/badge.md), [React](https://open-props-ui.netlify.app/react/components/badge.md), [Svelte](https://open-props-ui.netlify.app/svelte/components/badge.md), [Vue](https://open-props-ui.netlify.app/vue/components/badge.md).

## Badge

### Parts

- `.ui-badge` (root): Container element.
- `& > :first-child` (slot `default`): The element the badge is anchored to.
- `.ui-indicator` (prop `label`, slot `indicator`): The indicator, inside `.ui-floating`. Holds `label`, the visible text with `hideLabel`, or only screen reader text with `dot`.

### Props and modifiers

- `color`: `"critical"` (`.ui-critical`), `"info"` (`.ui-info`), `"neutral"` (`.ui-neutral`), `"success"` (`.ui-success`), `"warning"` (`.ui-warning`). Optional colors.
- `corner`: `"end-end"` (`.ui-end-end`), `"end-start"` (`.ui-end-start`), `"start-end"` (default), `"start-start"` (`.ui-start-start`). The corner the indicator sits on.
- `dot`: `boolean`, `.ui-dot`. Renders the indicator as a dot. `label` stays as screen reader text, and the `indicator` slot isn't shown.
- `hideLabel`: `boolean`, `.ui-indicator > span.ui-sr-only`. Hides `label` visually, for the whole sentence screen readers read, such as "5 unread messages". The `indicator` slot then holds the visible text and is hidden from screen readers.
- `invisible`: `boolean`, `.ui-invisible`. Hides the indicator.

## Component properties

Set inputs on the component, inline or in your CSS. Outputs follow the variant and state, so never override them.

### badge.css

- `--_border-width`: Border width of the indicator.
- `--_dot-size`: Width and height of the indicator in `.ui-dot`.
- `--_ease`: Easing of the indicator fade. Defaults to `--ui-ease-enter`.
- `--_inset`: Distance of the indicator from the opposite edges. `100%` places it on the corner, round avatars move it onto the circle.
- `--_motion`: Motion multiplier for the transitions. `0` turns them off.
- `--_size`: Height and minimum width of the indicator.

Outputs: `--_accent`, `--_bg-color`, `--_border-color`, `--_direction`, `--_duration`, `--_inset-block`, `--_inset-inline`, `--_shift-x`, `--_shift-y`, `--_sign-x`, `--_sign-y` and `--_text-color`.

### anchor.css

- `--_shift-x`: Horizontal shift of `.ui-floating`. Defaults to `0`.
- `--_shift-y`: Vertical shift of `.ui-floating`. Defaults to `0`.

## Theme tokens

The stylesheets read `--ui-accent-fill-max-lightness`, `--ui-border-width-thick`, `--ui-critical`, `--ui-duration`, `--ui-ease-enter`, `--ui-font-size-caption`, `--ui-font-weight-medium`, `--ui-info`, `--ui-motion`, `--ui-neutral`, `--ui-on-accent`, `--ui-on-primary`, `--ui-on-warning`, `--ui-primary`, `--ui-radius-round`, `--ui-space-1`, `--ui-space-2`, `--ui-space-4`, `--ui-success` and `--ui-warning`. `theming.md` and `tokens.json` describe them.

## HTML

### Example: Basics

```html
<span class="ui-badge">
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
  >
    <path
      fill="currentColor"
      d="M2.004 9.303A4.5 4.5 0 0 1 6.5 5h19a4.5 4.5 0 0 1 4.496 4.303l-1.476.82L16 16.864L3.48 10.123zM2 11.588V22.5A4.5 4.5 0 0 0 6.5 27h19a4.5 4.5 0 0 0 4.5-4.5V11.588l-.526.293l-13 7a1 1 0 0 1-.948 0L2.514 11.874z"
    ></path>
  </svg>
  <span class="ui-floating">
    <span class="ui-indicator"
      ><span aria-hidden="true">5</span
      ><span class="ui-sr-only">5 unread messages</span></span
    >
  </span>
</span>

<span class="ui-badge ui-dot">
  <svg aria-hidden="true" viewBox="0 0 32 32"></svg>
  <span class="ui-floating">
    <span class="ui-indicator"
      ><span class="ui-sr-only">New messages</span></span
    >
  </span>
</span>
```

## Astro

`import { Badge } from "opui-css/astro"`

- `Badge` named slots: `indicator`. Fill one with `slot="indicator"` on a child.

### Example: Basics

```astro
---
import { Badge } from "opui-css/astro"
---

<Badge hideLabel label="5 unread messages">
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    ><path
      fill="currentColor"
      d="M2.004 9.303A4.5 4.5 0 0 1 6.5 5h19a4.5 4.5 0 0 1 4.496 4.303l-1.476.82L16 16.864L3.48 10.123zM2 11.588V22.5A4.5 4.5 0 0 0 6.5 27h19a4.5 4.5 0 0 0 4.5-4.5V11.588l-.526.293l-13 7a1 1 0 0 1-.948 0L2.514 11.874z"
    ></path></svg
  >
  <Fragment slot="indicator">5</Fragment>
</Badge>

<Badge dot label="New messages">
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    ><path
      fill="currentColor"
      d="M2.004 9.303A4.5 4.5 0 0 1 6.5 5h19a4.5 4.5 0 0 1 4.496 4.303l-1.476.82L16 16.864L3.48 10.123zM2 11.588V22.5A4.5 4.5 0 0 0 6.5 27h19a4.5 4.5 0 0 0 4.5-4.5V11.588l-.526.293l-13 7a1 1 0 0 1-.948 0L2.514 11.874z"
    ></path></svg
  >
</Badge>
```

## React

`import { Badge } from "opui-css/react"`

- `Badge` slot props (`ReactNode`): `children` and `indicator`.

### Example: Basics

```tsx
import { Badge } from "opui-css/react"

export default function Basics() {
  return (
    <>
      <Badge hideLabel indicator="5" label="5 unread messages">
        <svg aria-hidden="true" viewBox="0 0 32 32"></svg>
      </Badge>

      <Badge dot label="New messages">
        <svg aria-hidden="true" viewBox="0 0 32 32"></svg>
      </Badge>
    </>
  )
}
```

## Svelte

`import { Badge } from "opui-css/svelte"`

- `Badge` slot snippets: `children` and `indicator`.

### Example: Basics

```svelte
<script lang="ts">
  import { Badge } from "opui-css/svelte"
</script>

<Badge hideLabel label="5 unread messages">
  <svg aria-hidden="true" viewBox="0 0 32 32"></svg>
  {#snippet indicator()}5{/snippet}
</Badge>

<Badge dot label="New messages">
  <svg aria-hidden="true" viewBox="0 0 32 32"></svg>
</Badge>
```

## Vue

`import { Badge } from "opui-css/vue"`

- `Badge` named slots: `indicator`. Fill one with `<template #indicator>`.

### Example: Basics

```vue
<script setup lang="ts">
import { Badge } from "opui-css/vue"
</script>

<template>
  <Badge hideLabel label="5 unread messages">
    <svg aria-hidden="true" viewBox="0 0 32 32"></svg>
    <template #indicator>5</template>
  </Badge>

  <Badge dot label="New messages">
    <svg aria-hidden="true" viewBox="0 0 32 32"></svg>
  </Badge>
</template>
```
