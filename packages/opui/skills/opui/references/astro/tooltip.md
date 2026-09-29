# Tooltip

Built on top of [Anchor](https://open-props-ui.netlify.app/astro/components/anchor.md).

**Quick start**

Run `npm install opui-css open-props`, then import the component and its styles.

```astro
---
import "opui-css/css/components/anchor.css"
import "opui-css/css/components/tooltip.css"
import { Tooltip } from "opui-css/astro"
---
```

[Getting started](https://open-props-ui.netlify.app/astro/guide/getting-started.md) · [CSS source](#installation)

Wrap the trigger in `<Tooltip>` and pass a stable`id`. Set `interestfor`, `commandfor`, and `command="toggle-popover"` on the trigger element itself (these attributes are only valid on real invokers like`<button>` or `<a>`). Pass a`label` prop for plain text or use the `content` slot for richer markup.

## Basics

### Text only...

Pass plain text via the `label` prop.

```astro
---
import { Button, Tooltip } from "opui-css/astro"
---


<Tooltip label="Save your changes" id="tooltip-basic">
  <Button
    interestfor="tooltip-basic"
    commandfor="tooltip-basic"
    command="toggle-popover">Save</Button
  >
</Tooltip>
```

### ... or any markup you want

Use the `content` slot instead, and it let's you put anything in the tooltip.

```astro
---
import { Button, Tooltip } from "opui-css/astro"
---


<Tooltip id="tooltip-rich">
  <Button
    interestfor="tooltip-rich"
    commandfor="tooltip-rich"
    command="toggle-popover">Keyboard shortcuts</Button
  >
  <Fragment slot="content">
    Press <kbd>⌘</kbd> + <kbd>K</kbd> to open the command palette.
  </Fragment>
</Tooltip>
```

## Alignment

Use the `alignment` prop.

```astro
---
import { Button, Tooltip } from "opui-css/astro"
---


<div class="tooltip-alignment-grid">
  <Tooltip label="Above" alignment="block-start" id="tooltip-top">
    <Button
      interestfor="tooltip-top"
      commandfor="tooltip-top"
      command="toggle-popover">Top</Button
    >
  </Tooltip>
  <Tooltip label="Before" alignment="inline-start" id="tooltip-start">
    <Button
      interestfor="tooltip-start"
      commandfor="tooltip-start"
      command="toggle-popover">Start</Button
    >
  </Tooltip>
  <Tooltip label="After" alignment="inline-end" id="tooltip-end">
    <Button
      interestfor="tooltip-end"
      commandfor="tooltip-end"
      command="toggle-popover">End</Button
    >
  </Tooltip>
  <Tooltip label="Below" alignment="block-end" id="tooltip-bottom">
    <Button
      interestfor="tooltip-bottom"
      commandfor="tooltip-bottom"
      command="toggle-popover">Bottom</Button
    >
  </Tooltip>
</div>


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

```astro
---
import { Button, Tooltip } from "opui-css/astro"
---


<Tooltip arrow label="Save your changes" id="tooltip-arrow">
  <Button
    interestfor="tooltip-arrow"
    commandfor="tooltip-arrow"
    command="toggle-popover">Save</Button
  >
</Tooltip>
```

## API

| Prop        | Type      | Default         | Description                                                                                                                                             |
| ----------- | --------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `alignment` | `string`  | `"block-start"` | Any valid `position-area` value. Controls where the tooltip is placed relative to the trigger.                                                          |
| `arrow`     | `boolean` | `false`         | When `true`, renders an arrow pointing from the tooltip toward the trigger. The arrow flips automatically with the tooltip via`position-try-fallbacks`. |
| `id`        | `string`  | auto-generated  | Identifier used to wire `interestfor` on the trigger to the floating element.                                                                           |
| `label`     | `string`  | —               | Plain-text tooltip content. For richer markup, use the `content` slot instead.                                                                          |

## Browser support

- Chromium: Full support Supported since v144.
- Firefox: Full support Supported since v151.
- Safari: Partial support Missing: popover-hint.

See also the [full browser support guide](https://open-props-ui.netlify.app/astro/guide/browser-support.md).

## Source

- `opui-css/css/components/tooltip.css`
- `opui-css/css/components/anchor.css`

## See also

- [Anchor](https://open-props-ui.netlify.app/astro/components/anchor.md)
