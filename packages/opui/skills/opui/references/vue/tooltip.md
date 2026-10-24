# Tooltip

Built on top of [Anchor](https://open-props-ui.netlify.app/vue/components/anchor.md).

Wrap the trigger in `<Tooltip>` and pass a stable `id`. Set `interestfor`, `commandfor`, and `command="toggle-popover"` on the trigger element itself (these attributes are only valid on real invokers like `<button>` or `<a>`). Put the tooltip in `TooltipContent` after the trigger.

## Basics

### Text only...

Put plain text in `TooltipContent`.

```vue
<script setup lang="ts">
import { Button, Tooltip, TooltipContent } from "opui-css/vue"
</script>

<template>
  <Tooltip id="tooltip-basics-1">
    <Button
      interestfor="tooltip-basics-1"
      commandfor="tooltip-basics-1"
      command="toggle-popover"
      >Save</Button
    >
    <TooltipContent>Save your changes</TooltipContent>
  </Tooltip>
</template>
```

### ... or any markup you want

`TooltipContent` takes any markup, not only text.

```vue
<script setup lang="ts">
import { Button, Tooltip, TooltipContent } from "opui-css/vue"
</script>

<template>
  <Tooltip id="tooltip-rich-content-1">
    <Button
      interestfor="tooltip-rich-content-1"
      commandfor="tooltip-rich-content-1"
      command="toggle-popover"
      >Keyboard shortcuts</Button
    >
    <TooltipContent>
      Press <kbd>⌘</kbd> + <kbd>K</kbd> to open the command palette.
    </TooltipContent>
  </Tooltip>
</template>
```

## Position

Set `positionArea` to any `position-area` value.

```vue
<script setup lang="ts">
import { Button, Tooltip, TooltipContent } from "opui-css/vue"
</script>

<template>
  <div class="example-compass">
    <Tooltip id="tooltip-position-1" positionArea="block-start">
      <Button
        interestfor="tooltip-position-1"
        commandfor="tooltip-position-1"
        command="toggle-popover"
        >Top</Button
      >
      <TooltipContent>Above</TooltipContent>
    </Tooltip>
    <Tooltip id="tooltip-position-2" positionArea="inline-start">
      <Button
        interestfor="tooltip-position-2"
        commandfor="tooltip-position-2"
        command="toggle-popover"
        >Start</Button
      >
      <TooltipContent>Before</TooltipContent>
    </Tooltip>
    <Tooltip id="tooltip-position-3" positionArea="inline-end">
      <Button
        interestfor="tooltip-position-3"
        commandfor="tooltip-position-3"
        command="toggle-popover"
        >End</Button
      >
      <TooltipContent>After</TooltipContent>
    </Tooltip>
    <Tooltip id="tooltip-position-4" positionArea="block-end">
      <Button
        interestfor="tooltip-position-4"
        commandfor="tooltip-position-4"
        command="toggle-popover"
        >Bottom</Button
      >
      <TooltipContent>Below</TooltipContent>
    </Tooltip>
  </div>
</template>
```

## Arrow

Set the `arrow` prop. This would be cool to solve with `corner-shape` one day.

```vue
<script setup lang="ts">
import { Button, Tooltip, TooltipContent } from "opui-css/vue"
</script>

<template>
  <Tooltip arrow id="tooltip-arrow-1">
    <Button
      interestfor="tooltip-arrow-1"
      commandfor="tooltip-arrow-1"
      command="toggle-popover"
      >Save</Button
    >
    <TooltipContent>Save your changes</TooltipContent>
  </Tooltip>
</template>
```

## API

### Tooltip API

| Prop           | Type      | Default              | Description                                                                                                                                                                                               |
| -------------- | --------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `arrow`        | `boolean` | `false`              | Adds an arrow that points to the trigger.                                                                                                                                                                 |
| `id`           | `string`  | -                    | The id of the tooltip. Add `interestfor`, plus `commandfor` and `command="toggle-popover"` for touch, with the same id to the trigger. Required.                                                          |
| `positionArea` | `string`  | `"self-block-start"` | Any valid `position-area` value. Controls where the tooltip is placed. The `self-` keywords follow the tooltip's own direction, so the placement mirrors in a right-to-left part of a left-to-right page. |

#### Slots

| Slot      | Description                                |
| --------- | ------------------------------------------ |
| `default` | The trigger, followed by `TooltipContent`. |

### CSS variables

| Variable                 | Default                                           | Description                                                                                                                                                                                             |
| ------------------------ | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--ui-border-width`      | `1px`                                             | Default border width for components that draw a border.                                                                                                                                                 |
| `--ui-duration`          | `0.2s`                                            | Default transition duration. Multiplied by `--ui-motion`.                                                                                                                                               |
| `--ui-ease-enter`        | `var(--ease-out-3)`                               | Easing for elements entering the screen: opening `Dialog`, `Drawer` and `Menu`, and the `Badge`, `Progress` and `Tooltip` transitions.                                                                  |
| `--ui-font-size-small`   | `var(--ui-font-size-200)`                         | Font size of helper text, `Callout`, `Table`, `Tooltip`, code blocks, dense `List` text and small buttons, chips, toggles and fields. Defaults to `--ui-font-size-200`.                                 |
| `--ui-line-height-tight` | `1.25`                                            | Line height of single-line controls and compact text: field inputs, `Table` cells, `Tooltip`, `Card` captions and keyboard hints in buttons.                                                            |
| `--ui-motion`            | `1`                                               | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/vue/guide/theming.md#motion). |
| `--ui-on-inverse`        | `light-dark(var(--ui-gray-1), var(--ui-gray-15))` | Text color on `--ui-surface-inverse`.                                                                                                                                                                   |
| `--ui-radius-small`      | `min(var(--radius-2), var(--ui-radius))`          | Corner radius of small parts: `kbd`, inline `code`, `mark`, `var`, `Tooltip`, the file input and a square `Avatar` image. `--ui-radius`, capped at 5px.                                                 |
| `--ui-space-1`           | `calc(var(--size-1) * var(--ui-space-scale))`     | Spacing step 1: Open Props `--size-1` times `--ui-space-scale`.                                                                                                                                         |
| `--ui-space-2`           | `calc(var(--size-2) * var(--ui-space-scale))`     | Spacing step 2: Open Props `--size-2` times `--ui-space-scale`.                                                                                                                                         |
| `--ui-space-4`           | `calc(var(--size-4) * var(--ui-space-scale))`     | Spacing step 4: Open Props `--size-4` times `--ui-space-scale`.                                                                                                                                         |
| `--ui-surface-inverse`   | `light-dark(var(--ui-gray-15), var(--ui-gray-2))` | Background of `Tooltip`, the `Carousel` buttons and `kbd`, `var`, `.ui-kbd` and `.ui-var`, inverted against the page.                                                                                   |

The stylesheets on this page read these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/vue/guide/theme-tokens.md).

## Component properties

Set these on the component itself, inline or in your own CSS. Inputs are the knobs. Outputs are derived from the inputs and the current state, so overriding one fixes it in every state. [Customizing](https://open-props-ui.netlify.app/vue/guide/customizing.md#component-properties) has examples.

| Property             | Kind   | Description                                                                  |
| -------------------- | ------ | ---------------------------------------------------------------------------- |
| `--_arrow-size`      | Input  | Size of the arrow in `.ui-arrow`.                                            |
| `--_bg-color`        | Input  | Background of the tooltip and its arrow. Defaults to `--ui-surface-inverse`. |
| `--_duration`        | Output | Duration of the fade, `--ui-duration` times `--_motion`.                     |
| `--_ease`            | Input  | Easing of the fade. Defaults to `--ui-ease-enter`.                           |
| `--_max-inline-size` | Input  | The maximum width. Longer content wraps.                                     |
| `--_min-inline-size` | Input  | The minimum width, unless the content is narrower.                           |
| `--_motion`          | Input  | Motion multiplier for the fade. `0` turns it off.                            |
| `--_offset`          | Input  | Distance from the trigger. `.ui-arrow` computes it from `--_arrow-size`.     |
| `--_shift`           | Input  | How far a shifted tooltip reaches past the center of the trigger.            |
| `--_text-color`      | Input  | The text color. Defaults to `--ui-on-inverse`.                               |

## Under the hood

Read the post: [Tooltips with interestfor](https://open-props-ui.netlify.app/learn/tooltip-interest-invokers)

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

   - Hover Share: a rotated square, centered on the tooltip's edge
   - The tooltip is its own anchor, the wrapper names the trigger
   - `clamp()` moves the arrow towards the trigger's center but keeps it on the tooltip's edge
   - So it still points at the trigger after a flip or a shift

5. Fade

   - `@starting-style` fades it in from `opacity: 0`
   - `allow-discrete` keeps `display` and `overlay` alive while it fades out
   - `--ui-motion` is `0` under reduced motion and with `.ui-motion-off`

Step 1 of 5: Hint

- [Anchor positioning ](https://webstatus.dev/features/anchor-positioning)(Limited availability): Chrome 151+, Edge 151+, Firefox 151+, Safari 27+
- [Interest invokers ](https://webstatus.dev/features/interest-invokers)(Limited availability): Chrome 142+, Edge 142+, Firefox not supported, Safari not supported
- [Invoker commands ](https://webstatus.dev/features/invoker-commands)(Newly available): Chrome 135+, Edge 135+, Firefox 144+, Safari 26.2+
- [popover="hint" ](https://webstatus.dev/features/popover-hint)(Limited availability): Chrome 151+, Edge 151+, Firefox 153+, Safari not supported

```html
<button
  type="button"
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
  background-color: var(--ui-surface-inverse);
  border: 0;
  border-radius: var(--ui-radius-small);
  color: var(--ui-on-inverse);
  font-size: var(--ui-font-size-small);
  inset: auto;
  line-height: var(--ui-line-height-tight);
  margin: var(--ui-space-2);
  padding: var(--ui-space-1) var(--ui-space-2);
  position-area: block-start;
}
```

Step 2 of 5: Size

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

Step 3 of 5: Shift

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

Step 4 of 5: Arrow

- [Anchor positioning ](https://webstatus.dev/features/anchor-positioning)(Limited availability): Chrome 151+, Edge 151+, Firefox 151+, Safari 27+
- [`min(), max(), and clamp()` ](https://webstatus.dev/features/min-max-clamp)(Widely available): Chrome 79+, Edge 79+, Firefox 75+, Safari 13.1+

```html
<span class="anchor">
  <button type="button" interestfor="share" …>Share</button>
  <span class="tooltip arrow" id="share" popover="hint">Copy a link</span>
</span>
```

```css
.anchor {
  anchor-name: --anchor;
  anchor-scope: --anchor;
}

.tooltip.arrow {
  anchor-name: --tooltip;
  anchor-scope: --tooltip;
  margin: 0.75rem;
}

.tooltip.arrow::before {
  background-color: inherit;
  block-size: 0.5rem;
  content: "";
  inline-size: 0.5rem;
  inset-block-start: clamp(
    anchor(--tooltip self-start),
    anchor(--anchor center),
    anchor(--tooltip self-end)
  );
  inset-inline-start: clamp(
    anchor(--tooltip self-start),
    anchor(--anchor center),
    anchor(--tooltip self-end)
  );
  margin: -0.25rem;
  position: fixed;
  rotate: 45deg;
}
```

Step 5 of 5: Fade

- [display animation ](https://webstatus.dev/features/display-animation)(Limited availability): Chrome 117+, Edge 117+, Firefox not supported, Safari 18+
- [`overlay` ](https://webstatus.dev/features/overlay)(Limited availability): Chrome 117+, Edge 117+, Firefox not supported, Safari not supported
- [`@starting-style` ](https://webstatus.dev/features/starting-style)(Newly available): Chrome 117+, Edge 117+, Firefox 129+, Safari 17.5+
- [`transition-behavior` ](https://webstatus.dev/features/transition-behavior)(Newly available): Chrome 117+, Edge 117+, Firefox 129+, Safari 17.4+

```css
.tooltip {
  opacity: 0;
  transition:
    display calc(0.2s * var(--ui-motion, 1)) allow-discrete,
    opacity calc(0.2s * var(--ui-motion, 1)),
    overlay calc(0.2s * var(--ui-motion, 1)) allow-discrete;
}

.tooltip:popover-open {
  opacity: 1;

  @starting-style {
    opacity: 0;
  }
}
```

## Browser support

- Chromium: Full support Supported since v151.
- Firefox: Partial support Missing: calc-size, display-animation, interest-invokers, overlay, text-wrap-pretty.
- Safari: Partial support Missing: calc-size, interest-invokers, overlay, popover-hint.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/vue/guide/browser-support/?components=Tooltip.md).

## Installation

Import the component from `opui-css/vue`:

### Dependencies

- [Anchor](https://open-props-ui.netlify.app/vue/components/anchor.md)

Copy the CSS into your project to own it. It reads tokens from Open Props, `palette.css` and `theme.css`, so those go on the page too, after `layers.css`. See [Getting started](https://open-props-ui.netlify.app/vue/guide/getting-started.md).

- `opui-css/css/components/tooltip.css`
- `opui-css/css/components/anchor.css`

## Changelog

### What's new

- Breaking: `Tooltip` no longer renders `.ui-anchor`. Style [`.ui-tooltip`](#basics) instead.
- Breaking: the floating content is [`.ui-floating`](#api) instead of `.ui-anchor-floating`.
- Breaking: [`TooltipContent`](#api) replaces `label` and the `content` slot.
- Breaking: [`id`](#api) is required.
- Breaking: no `<span interestfor>` around the trigger. Put `interestfor` with the tooltip `id` on the [trigger](#basics).
- The [arrow](#arrow) points at the trigger in every position, also after a flip.
- Breaking: `--_tooltip-bg` and `--_tooltip-color` are `--_bg-color` and `--_text-color`, and `--_tooltip-offset` is `--_offset` ([Under the hood](#under-the-hood)).
- `--_duration` and `--_ease` set the transition duration and easing ([Under the hood](#under-the-hood)).
- Corners never get rounder than [`--ui-radius`](#api), so `0` squares them.
- [`--_max-inline-size`](#api) sets the maximum width.
- Breaking: `alignment` is [`positionArea`](#position).
