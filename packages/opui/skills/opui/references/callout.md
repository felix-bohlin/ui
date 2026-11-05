# Callout

Callouts call out for user attention. Should be part of the flow and used without interrupting the user's task.

- CSS: `opui-css/css/components/callout.css`.
- Full docs with every example: [HTML](https://open-props-ui.netlify.app/html/components/callout.md), [Astro](https://open-props-ui.netlify.app/astro/components/callout.md), [React](https://open-props-ui.netlify.app/react/components/callout.md), [Solid](https://open-props-ui.netlify.app/solid/components/callout.md), [Svelte](https://open-props-ui.netlify.app/svelte/components/callout.md), [Vue](https://open-props-ui.netlify.app/vue/components/callout.md).

## Callout

### Parts

- `.ui-callout` (root): Container element.
- `<svg>` (`CalloutIcon`): An optional icon before the content. In Astro, React, Solid, Svelte and Vue, `CalloutIcon` renders the default one for critical, info, success and warning.
- `.ui-content` (`CalloutContent`): The content, with an optional heading first.
- `.ui-actions` (`CalloutActions`): A row of buttons under the content.
- `<button>`: A close button, a `.ui-button` that is a direct child of the callout. It sits at the end of the first row.

### Props and modifiers

- `severity`: `"critical"` (`.ui-critical`), `"info"` (`.ui-info`), `"neutral"` (`.ui-neutral`), `"success"` (`.ui-success`), `"warning"` (`.ui-warning`). The severity. Sets the color, and in Astro, React, Solid, Svelte and Vue the icon `CalloutIcon` renders.
- `variant`: `"outlined"` (`.ui-outlined`), `"tonal"` (default). The variant to use.

### Slots

- `default`: The callout parts, and any other content.

### Notes

- Astro, React, Solid, Svelte and Vue: For a custom icon, put your own `<svg aria-hidden="true">` in the Callout instead of `CalloutIcon`, before `CalloutContent`.

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
      The dashboard is read-only on Sunday from 02:00 to 04:00 UTC while we
      upgrade the database.
    </p>
  </div>
</article>
<article class="ui-callout ui-outlined">
  <div class="ui-content">
    <h3>Billing has moved</h3>
    <p>
      Invoices and payment methods are now in the Billing tab of your workspace
      settings.
    </p>
  </div>
</article>
```

## Astro

`import { Callout, CalloutActions, CalloutContent, CalloutIcon } from "opui-css/astro"`

### Example: Variants

```astro
---
import { Callout, CalloutContent } from "opui-css/astro"
---

<Callout>
  <CalloutContent>
    <h3>Scheduled maintenance</h3>
    <p>
      The dashboard is read-only on Sunday from 02:00 to 04:00 UTC while we
      upgrade the database.
    </p>
  </CalloutContent>
</Callout>
<Callout variant="outlined">
  <CalloutContent>
    <h3>Billing has moved</h3>
    <p>
      Invoices and payment methods are now in the Billing tab of your workspace
      settings.
    </p>
  </CalloutContent>
</Callout>
```

## React

`import { Callout, CalloutActions, CalloutContent, CalloutIcon } from "opui-css/react"`

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
            The dashboard is read-only on Sunday from 02:00 to 04:00 UTC while
            we upgrade the database.
          </p>
        </CalloutContent>
      </Callout>
      <Callout variant="outlined">
        <CalloutContent>
          <h3>Billing has moved</h3>
          <p>
            Invoices and payment methods are now in the Billing tab of your
            workspace settings.
          </p>
        </CalloutContent>
      </Callout>
    </>
  )
}
```

## Solid

`import { Callout, CalloutActions, CalloutContent, CalloutIcon } from "opui-css/solid"`

### Example: Variants

```tsx
/** @jsxImportSource @solidjs/web */
import { Callout, CalloutContent } from "opui-css/solid"

export default function Variants() {
  return (
    <>
      <Callout>
        <CalloutContent>
          <h3>Scheduled maintenance</h3>
          <p>
            The dashboard is read-only on Sunday from 02:00 to 04:00 UTC while
            we upgrade the database.
          </p>
        </CalloutContent>
      </Callout>
      <Callout variant="outlined">
        <CalloutContent>
          <h3>Billing has moved</h3>
          <p>
            Invoices and payment methods are now in the Billing tab of your
            workspace settings.
          </p>
        </CalloutContent>
      </Callout>
    </>
  )
}
```

## Svelte

`import { Callout, CalloutActions, CalloutContent, CalloutIcon } from "opui-css/svelte"`

### Example: Variants

```svelte
<script lang="ts">
  import { Callout, CalloutContent } from "opui-css/svelte"
</script>

<Callout>
  <CalloutContent>
    <h3>Scheduled maintenance</h3>
    <p>
      The dashboard is read-only on Sunday from 02:00 to 04:00 UTC while we
      upgrade the database.
    </p>
  </CalloutContent>
</Callout>
<Callout variant="outlined">
  <CalloutContent>
    <h3>Billing has moved</h3>
    <p>
      Invoices and payment methods are now in the Billing tab of your workspace
      settings.
    </p>
  </CalloutContent>
</Callout>
```

## Vue

`import { Callout, CalloutActions, CalloutContent, CalloutIcon } from "opui-css/vue"`

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
        The dashboard is read-only on Sunday from 02:00 to 04:00 UTC while we
        upgrade the database.
      </p>
    </CalloutContent>
  </Callout>
  <Callout variant="outlined">
    <CalloutContent>
      <h3>Billing has moved</h3>
      <p>
        Invoices and payment methods are now in the Billing tab of your
        workspace settings.
      </p>
    </CalloutContent>
  </Callout>
</template>
```
