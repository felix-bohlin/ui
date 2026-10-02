# Tooltip

Built on top of [Anchor](https://open-props-ui.netlify.app/astro/components/anchor.md).

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

Use the `content` slot instead, and it lets you put anything in the tooltip.

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
    align-items: center;
    display: grid;
    gap: var(--size-3);
    grid-template-areas:
      ".     top    .  "
      "start .      end"
      ".     bottom .  ";
    justify-items: center;
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

#### CSS variables

| Variable            | Default                                     | Description                                                                                                                |
| ------------------- | ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `--duration`        | `0.2s`                                      | Default transition duration. Multiplied by `--motion`.                                                                     |
| `--ease-enter`      | `var(--ease-out-3)`                         | Easing for elements entering the screen.                                                                                   |
| `--font-size-05`    | `0.875rem`                                  | A font size between Open Props `--font-size-0` and `--font-size-1`, used for labels and compact text.                      |
| `--motion`          | `1`                                         | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. |
| `--surface-inverse` | `light-dark(var(--gray-15), var(--gray-2))` | Background of `Toast` and `Tooltip`, inverted against the page.                                                            |
| `--text-inverse`    | `light-dark(var(--gray-1), var(--gray-15))` | Text color on `--surface-inverse`.                                                                                         |

Theme tokens this component reads. Override them on `html`or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/astro/guide/theme-tokens.md)for the full list.

## Browser support

- Chromium: Full support Supported since v144.
- Firefox: Partial support Missing: display-animation, interest-invokers, overlay, text-wrap-pretty.
- Safari: Partial support Missing: interest-invokers, overlay, popover-hint.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/astro/guide/browser-support/?components=Tooltip.md).

## Installation

- `opui-css/css/components/tooltip.css`
- `opui-css/css/components/anchor.css`

## See also

- [Anchor](https://open-props-ui.netlify.app/astro/components/anchor.md)
