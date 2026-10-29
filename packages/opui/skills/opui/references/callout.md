# Callout

Callouts call out for user attention. Should be part of the flow and used without interrupting the user's task.

- CSS: `opui-css/css/components/callout.css`.
- Full docs with every example: [HTML](https://open-props-ui.netlify.app/html/components/callout.md), [Astro](https://open-props-ui.netlify.app/astro/components/callout.md), [React](https://open-props-ui.netlify.app/react/components/callout.md), [Svelte](https://open-props-ui.netlify.app/svelte/components/callout.md), [Vue](https://open-props-ui.netlify.app/vue/components/callout.md).

## Callout

### Parts

- `.ui-callout` (root): Container element.
- `<svg>` (`CalloutIcon`): An optional icon before the content. In Astro, React, Svelte and Vue, `CalloutIcon` renders the default one for info, success, warning and critical.
- `.ui-content` (`CalloutContent`): The content, with an optional heading first.

### Props and modifiers

- `severity`: `"critical"` (`.ui-critical`), `"info"` (`.ui-info`), `"neutral"` (`.ui-neutral`), `"success"` (`.ui-success`), `"warning"` (`.ui-warning`). The severity. Sets the color, and in Astro, React, Svelte and Vue the icon `CalloutIcon` renders.
- `variant`: `"outlined"` (`.ui-outlined`), `"tonal"` (default). The variant to use.

### Slots

- `default`: The callout parts, and any other content.

### Notes

- Astro, React, Svelte and Vue: For a custom icon, put your own `<svg aria-hidden="true">` in the Callout instead of `CalloutIcon`, before `CalloutContent`.

## Component properties

Set inputs on the component, inline or in your CSS. Outputs follow the variant and state, so never override them.

### callout.css

- `--_content-gap`: Space between the children of `.ui-content`.
- `--_font-size`: Font size of `.ui-content`.
- `--_gap`: Gap between a direct child `svg` and `.ui-content`.
- `--_icon-size`: Width of the icon column when there's a direct child `svg`.
- `--_link-hover-text-color`: Link color on hover and focus. Defaults to `--ui-primary-text`, not used in `.ui-outlined`.
- `--_outlined-bg-color`: Background of `.ui-outlined`. Defaults to `--ui-surface`.
- `--_outlined-border-color`: Border color of `.ui-outlined`. Defaults to `--ui-border-color`, set by the severity classes.
- `--_outlined-icon-text-color`: Icon color of `.ui-outlined`. Set by the severity classes.
- `--_outlined-text-color`: Text color of `.ui-outlined`. Set by the severity classes.
- `--_padding`: The padding.
- `--_radius`: The corner radius. Defaults to `--ui-radius`.
- `--_shadow`: The shadow. Defaults to `--ui-shadow-surface`.
- `--_surface-bg-color`: The opaque background under the tint. Defaults to `--ui-surface`.
- `--_title-font-size`: Font size of headings in `.ui-content`.

Outputs: `--_bg-color`, `--_border-color`, `--_icon-text-color` and `--_text-color`.

## Theme tokens

The stylesheets read `--ui-border-color`, `--ui-border-color-on-raised`, `--ui-border-color-raised`, `--ui-border-width`, `--ui-field-border-color-on-raised`, `--ui-font-size-body`, `--ui-font-size-small`, `--ui-font-weight-semibold`, `--ui-icon-size`, `--ui-palette-accent`, `--ui-palette-border`, `--ui-palette-strong`, `--ui-palette-tint-subtle`, `--ui-primary-text`, `--ui-radius`, `--ui-shadow-surface`, `--ui-space-2`, `--ui-space-3`, `--ui-surface`, `--ui-surface-tonal` and `--ui-text-strong`. `theming.md` and `tokens.json` describe them.

## HTML

### Example: Variants

```html
<article class="ui-callout">
  <div class="ui-content">
    <h3>Note</h3>
    <p>
      This is a tonal Callout. Notice the lack of icons - it's not really needed
      here.
    </p>
  </div>
</article>
<article class="ui-callout ui-outlined">
  <div class="ui-content">
    <h3>Another Callout</h3>
    <p>
      This is an outlined Callout. Why not use a
      <a class="ui-link" href="#">Card</a>
      since they look very similar? For one, the Callout is a more focused
      component with different properties.
    </p>
  </div>
</article>
```

## Astro

`import { Callout, CalloutContent, CalloutIcon } from "opui-css/astro"`

### Example: Variants

```astro
---
import { Callout, CalloutContent } from "opui-css/astro"
---

<Callout>
  <CalloutContent>
    <h3>Note</h3>
    <p>
      This is a tonal Callout. Notice the lack of icons - it's not really needed
      here.
    </p>
  </CalloutContent>
</Callout>
<Callout variant="outlined">
  <CalloutContent>
    <h3>Another Callout</h3>
    <p>
      This is an outlined Callout. Why not use a <a class="ui-link" href="#"
        >Card</a
      > since they look very similar? For one, the Callout is a more focused component
      with different properties.
    </p>
  </CalloutContent>
</Callout>
```

## React

`import { Callout, CalloutContent, CalloutIcon } from "opui-css/react"`

- Client components (`"use client"`): `Callout`.

### Example: Variants

```tsx
import { Callout, CalloutContent } from "opui-css/react"

export default function Variants() {
  return (
    <>
      <Callout>
        <CalloutContent>
          <h3>Note</h3>
          <p>
            This is a tonal Callout. Notice the lack of icons - it's not really
            needed here.
          </p>
        </CalloutContent>
      </Callout>
      <Callout variant="outlined">
        <CalloutContent>
          <h3>Another Callout</h3>
          <p>
            This is an outlined Callout. Why not use a{" "}
            <a className="ui-link" href="#">
              Card
            </a>{" "}
            since they look very similar? For one, the Callout is a more focused
            component with different properties.
          </p>
        </CalloutContent>
      </Callout>
    </>
  )
}
```

## Svelte

`import { Callout, CalloutContent, CalloutIcon } from "opui-css/svelte"`

### Example: Variants

```svelte
<script lang="ts">
  import { Callout, CalloutContent } from "opui-css/svelte"
</script>

<Callout>
  <CalloutContent>
    <h3>Note</h3>
    <p>
      This is a tonal Callout. Notice the lack of icons - it's not really needed
      here.
    </p>
  </CalloutContent>
</Callout>
<Callout variant="outlined">
  <CalloutContent>
    <h3>Another Callout</h3>
    <p>
      This is an outlined Callout. Why not use a <a class="ui-link" href="#"
        >Card</a
      > since they look very similar? For one, the Callout is a more focused component
      with different properties.
    </p>
  </CalloutContent>
</Callout>
```

## Vue

`import { Callout, CalloutContent, CalloutIcon } from "opui-css/vue"`

### Example: Variants

```vue
<script setup lang="ts">
import { Callout, CalloutContent } from "opui-css/vue"
</script>

<template>
  <Callout>
    <CalloutContent>
      <h3>Note</h3>
      <p>
        This is a tonal Callout. Notice the lack of icons - it's not really
        needed here.
      </p>
    </CalloutContent>
  </Callout>
  <Callout variant="outlined">
    <CalloutContent>
      <h3>Another Callout</h3>
      <p>
        This is an outlined Callout. Why not use a
        <a class="ui-link" href="#">Card</a> since they look very similar? For
        one, the Callout is a more focused component with different properties.
      </p>
    </CalloutContent>
  </Callout>
</template>
```
