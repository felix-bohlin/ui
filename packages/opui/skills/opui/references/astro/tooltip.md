# Tooltip

Built on top of [Anchor](https://open-props-ui.netlify.app/astro/components/anchor.md).

### What's new

- Breaking: `id` is required.
- The arrow points at the trigger in every position, also after a flip.

Wrap the trigger in `<Tooltip>` and pass a stable `id`. Set `interestfor`, `commandfor`, and `command="toggle-popover"` on the trigger element itself (these attributes are only valid on real invokers like `<button>` or `<a>`). Pass a `label` prop for plain text or use the `content` slot for richer markup.

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

Set the `arrow` prop. This would be cool to solve with `corner-shape` one day.

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

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/astro/guide/theme-tokens.md) for the full list.

## Under the hood

1. Hint

   - `interestfor` + `popover="hint"`: opens on hover and focus, no JavaScript
   - `commandfor` toggles it on tap, where there is no hover
   - The invoker is the implicit anchor: no `anchor-name`, no ids to wire
   - `position-area: block-start` centers it above the trigger

2. Size

   - Hover the icon: long text wraps at `240px`
   - `calc-size()` keeps long text at least `10rem` wide near an edge, short text stays snug
   - `text-wrap: pretty` avoids a lonely last word

3. Shift

   - Scroll the trigger to the top of the window and hover it again
   - The two `@position-try` rules slide it sideways at the edge of the window, keeping it over the trigger
   - `anchors-visible` hides it when the trigger scrolls out of view

4. Arrow

   - Hover Share: a rotated square, half outside the tooltip
   - `[popover]` defaults to `overflow: auto`, which would clip it
   - A shifted tooltip would point the arrow at nothing, so it only flips

Step 1 of 4: Hint

- [Anchor positioning ](https://webstatus.dev/features/anchor-positioning)(Limited availability): Chrome 144+, Edge 144+, Firefox 151+, Safari 26+
- [Interest invokers ](https://webstatus.dev/features/interest-invokers)(Limited availability): Chrome 142+, Edge 142+, Firefox not supported, Safari not supported
- [Invoker commands ](https://webstatus.dev/features/invoker-commands)(Newly available): Chrome 135+, Edge 135+, Firefox 144+, Safari 26.2+
- [popover="hint" ](https://webstatus.dev/features/popover-hint)(Limited availability): Chrome 133+, Edge 133+, Firefox 149+, Safari not supported

```html
<button
  interestfor="tooltip"
  commandfor="tooltip"
  command="toggle-popover"
>
  Save
</button>


<span class="tooltip" id="tooltip" popover="hint">Save changes</span>
```

```css
.tooltip {
  background-color: var(--surface-inverse);
  border: 0;
  border-radius: var(--radius-2);
  color: var(--text-inverse);
  font-size: var(--font-size-05);
  inset: auto;
  line-height: 1.3;
  margin: 0.5rem;
  padding: 0.25rem 0.5rem;
  position-area: block-start;
}
```

Step 2 of 4: Size

- [`calc-size()` ](https://webstatus.dev/features/calc-size)(Limited availability): Chrome 129+, Edge 129+, Firefox not supported, Safari not supported
- [text-wrap: pretty ](https://webstatus.dev/features/text-wrap-pretty)(Limited availability): Chrome 117+, Edge 117+, Firefox not supported, Safari 26+

```css
.tooltip {
  max-inline-size: 240px;
  min-inline-size: calc-size(max-content, min(size, 10rem));
  text-align: center;
  text-wrap: pretty;
}
```

Step 3 of 4: Shift

```css
.tooltip {
  position-try-fallbacks:
    flip-block,
    --build-tooltip-shift-start,
    --build-tooltip-shift-end,
    --build-tooltip-shift-start flip-block,
    --build-tooltip-shift-end flip-block;
  position-visibility: anchors-visible;
}
```

Step 4 of 4: Arrow

```css
.tooltip.arrow {
  margin: 0.75rem;
  overflow: visible;
  position-try-fallbacks:
    flip-block,
    flip-inline,
    flip-block flip-inline;
}


.tooltip.arrow::before {
  background-color: inherit;
  block-size: 0.5rem;
  content: "";
  inline-size: 0.5rem;
  inset-block-end: -0.25rem;
  inset-inline: 0;
  margin-inline: auto;
  position: absolute;
  rotate: 45deg;
}
```

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
