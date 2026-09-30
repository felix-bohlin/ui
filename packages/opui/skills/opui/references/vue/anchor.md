# Anchor

A structural primitive to enable CSS Anchor Positioning on stuff.

## Anatomy

Floating content

- `<Anchor>`

  Container element. Scopes the anchor to its content.

- `v-slot:default`

  The content the floating content is anchored to.

- `v-slot:anchored`

  The floating content.

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

Set `trigger="hover"` and an `id`, and add `interestfor` with that id to the trigger. The component adds `popover="hint"`.

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
      ><div class="ui-card ui-elevated">Tooltip content</div></template
    >
  </Anchor>
</template>
```

## Used By

- [Badge](https://open-props-ui.netlify.app/vue/components/badge.md)
- [Tooltip](https://open-props-ui.netlify.app/vue/components/tooltip.md)

## API

### Anchor API

| Prop        | Type                  | Default       | Description                                                                                                    |
| ----------- | --------------------- | ------------- | -------------------------------------------------------------------------------------------------------------- |
| `alignment` | `string`              | `"start end"` | Any valid `position-area` value. Controls where the floating content is placed.                                |
| `id`        | `string`              | -             | The id of the floating content when `trigger` is `"hover"`. Add `interestfor` with the same id to the trigger. |
| `trigger`   | `"always"`, `"hover"` | `"always"`    | Shows the floating content always, or on hover and focus with `popover="hint"`.                                |

#### Slots

| Slot       | Description                                      |
| ---------- | ------------------------------------------------ |
| `anchored` | The floating content.                            |
| `default`  | The content the floating content is anchored to. |

## Browser support

- Chromium: Full support Supported since v144.
- Firefox: Full support Supported since v151.
- Safari: Partial support Missing: popover-hint.

See also the [full browser support guide](https://open-props-ui.netlify.app/vue/guide/browser-support.md).

## Installation

- `opui-css/css/components/anchor.css`

