# Tooltip

Built on top of [Anchor](https://open-props-ui.netlify.app/vue/components/anchor.md).

Wrap the trigger in `<Tooltip>` and pass a stable`id`. Set `interestfor`, `commandfor`, and `command="toggle-popover"` on the trigger element itself (these attributes are only valid on real invokers like`<button>` or `<a>`). Pass a`label` prop for plain text or use the `content` slot for richer markup.

## Basics

### Text only...

Pass plain text via the `label` prop.

```vue
<script setup lang="ts">
import { Button, Tooltip } from "opui-css/vue"
</script>


<template>
  <Tooltip label="Save your changes" id="tooltip-basic">
    <Button
      interestfor="tooltip-basic"
      commandfor="tooltip-basic"
      command="toggle-popover"
      >Save</Button
    >
  </Tooltip>
</template>
```

### ... or any markup you want

Use the `content` slot instead, and it let's you put anything in the tooltip.

```vue
<script setup lang="ts">
import { Button, Tooltip } from "opui-css/vue"
</script>


<template>
  <Tooltip id="tooltip-rich">
    <Button
      interestfor="tooltip-rich"
      commandfor="tooltip-rich"
      command="toggle-popover"
      >Keyboard shortcuts</Button
    >
    <template #content>
      Press <kbd>⌘</kbd> + <kbd>K</kbd> to open the command palette.
    </template>
  </Tooltip>
</template>
```

## Alignment

Use the `alignment` prop.

```vue
<script setup lang="ts">
import { Button, Tooltip } from "opui-css/vue"
</script>


<template>
  <div class="tooltip-alignment-grid">
    <Tooltip label="Above" alignment="block-start" id="tooltip-top">
      <Button
        interestfor="tooltip-top"
        commandfor="tooltip-top"
        command="toggle-popover"
        >Top</Button
      >
    </Tooltip>
    <Tooltip label="Before" alignment="inline-start" id="tooltip-start">
      <Button
        interestfor="tooltip-start"
        commandfor="tooltip-start"
        command="toggle-popover"
        >Start</Button
      >
    </Tooltip>
    <Tooltip label="After" alignment="inline-end" id="tooltip-end">
      <Button
        interestfor="tooltip-end"
        commandfor="tooltip-end"
        command="toggle-popover"
        >End</Button
      >
    </Tooltip>
    <Tooltip label="Below" alignment="block-end" id="tooltip-bottom">
      <Button
        interestfor="tooltip-bottom"
        commandfor="tooltip-bottom"
        command="toggle-popover"
        >Bottom</Button
      >
    </Tooltip>
  </div>
</template>


<style>
.tooltip-alignment-grid {
  display: grid;
  gap: var(--size-3);
  grid-template-areas:
    ".     top    .  "
    "start .      end"
    ".     bottom .  ";
  justify-items: center;
  align-items: center;
}


.tooltip-alignment-grid > :nth-child(1) {
  grid-area: top;
}
.tooltip-alignment-grid > :nth-child(2) {
  grid-area: start;
}
.tooltip-alignment-grid > :nth-child(3) {
  grid-area: end;
}
.tooltip-alignment-grid > :nth-child(4) {
  grid-area: bottom;
}
</style>
```

## Arrow

Set the `arrow` prop. This would be cool to solve with `corner-shape`one day.

```vue
<script setup lang="ts">
import { Button, Tooltip } from "opui-css/vue"
</script>


<template>
  <Tooltip arrow label="Save your changes" id="tooltip-arrow">
    <Button
      interestfor="tooltip-arrow"
      commandfor="tooltip-arrow"
      command="toggle-popover"
      >Save</Button
    >
  </Tooltip>
</template>
```

## API

### Tooltip API

| Prop        | Type      | Default         | Description                                                               |
| ----------- | --------- | --------------- | ------------------------------------------------------------------------- |
| `alignment` | `string`  | `"block-start"` | Any valid `position-area` value. Controls where the tooltip is placed.    |
| `arrow`     | `boolean` | `false`         | Adds an arrow that points to the trigger.                                 |
| `id`        | `string`  | -               | The id of the tooltip. Add `interestfor` with the same id to the trigger. |
| `label`     | `string`  | -               | The tooltip, a `popover="hint"`.                                          |

#### Slots

| Slot      | Description                                            |
| --------- | ------------------------------------------------------ |
| `content` | The tooltip, a `popover="hint"`.                       |
| `default` | The trigger that shows the tooltip on hover and focus. |

## Browser support

- Chromium: Full support Supported since v144.
- Firefox: Full support Supported since v151.
- Safari: Partial support Missing: popover-hint.

See also the [full browser support guide](https://open-props-ui.netlify.app/vue/guide/browser-support.md).

## Installation

- `opui-css/css/components/tooltip.css`
- `opui-css/css/components/anchor.css`

## See also

- [Anchor](https://open-props-ui.netlify.app/vue/components/anchor.md)
