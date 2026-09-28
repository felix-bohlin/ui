# Anchor

A structural primitive to enable CSS Anchor Positioning on stuff.

## Always Visible

Floating content that is always shown.

```vue
<script setup lang="ts">
import { Anchor } from "opui-css/vue"
</script>


<template>
  <Anchor>
    <button>Hover me</button>
    <template #anchored
      ><span
        style="
          background: var(--surface-2);
          padding: var(--size-2) var(--size-3);
          border-radius: var(--radius-2);
          box-shadow: var(--shadow-3);
        "
        >Floating content</span
      ></template
    >
  </Anchor>
</template>
```

## Hover Trigger

Set `trigger="hover"`. The component adds `interestfor` and `popover="hint"` declaratively.

Add `interestfor`, `commandfor`, and `command="toggle-popover"` to the anchor trigger so touch devices can tap to show the floating content.

```vue
<script setup lang="ts">
import { Anchor } from "opui-css/vue"
</script>


<template>
  <Anchor trigger="hover" id="anchor-hover">
    <button
      interestfor="anchor-hover"
      commandfor="anchor-hover"
      command="toggle-popover"
    >
      Hover me
    </button>
    <template #anchored
      ><span
        ><div class="ui-card ui-elevated">Tooltip content</div></span
      ></template
    >
  </Anchor>
</template>
```

## Used By

- [Badge](https://open-props-ui.netlify.app/vue/components/badge.md)
- [Tooltip](https://open-props-ui.netlify.app/vue/components/tooltip.md)

## API

| Prop        | Type                  | Default       | Description                                                                                                                |
| ----------- | --------------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `alignment` | `string`              | `"start end"` | Any valid `position-area` value. Controls where the floating content is placed.                                            |
| `trigger`   | `"always" \| "hover"` | `"always"`    | When set to `"hover"`, wraps the anchor slot in an`interestfor` invoker and uses `popover="hint"` on the floating element. |

## Browser support

- Chromium: Full support Supported since v144.
- Firefox: Full support Supported since v151.
- Safari: Partial support Missing: popover-hint.

See also the [full browser support guide](https://open-props-ui.netlify.app/vue/guide/browser-support.md).

## Installation

- `opui-css/css/components/anchor.css`

