# Tooltip

Built on top of [Anchor](https://open-props-ui.netlify.app/react/components/anchor.md).

Wrap the trigger in `<Tooltip>` and pass a stable `id`. Set `interestfor`, `commandfor`, and `command="toggle-popover"` on the trigger element itself (these attributes are only valid on real invokers like `<button>` or `<a>`). Put the tooltip in `TooltipContent` after the trigger.

## Basics

### Text only...

Put plain text in `TooltipContent`.

```tsx
import { Button, Tooltip, TooltipContent } from "opui-css/react"

export default function Basics() {
  return (
    <Tooltip id="tooltip-basics-1">
      <Button
        interestfor="tooltip-basics-1"
        commandfor="tooltip-basics-1"
        command="toggle-popover"
      >
        Save
      </Button>
      <TooltipContent>Save your changes</TooltipContent>
    </Tooltip>
  )
}
```

### ... or any markup you want

`TooltipContent` takes any markup, not only text.

```tsx
import { Button, Tooltip, TooltipContent } from "opui-css/react"

export default function RichContent() {
  return (
    <Tooltip id="tooltip-rich-content-1">
      <Button
        interestfor="tooltip-rich-content-1"
        commandfor="tooltip-rich-content-1"
        command="toggle-popover"
      >
        Keyboard shortcuts
      </Button>
      <TooltipContent>
        Press <kbd>⌘</kbd> + <kbd>K</kbd> to open the command palette.
      </TooltipContent>
    </Tooltip>
  )
}
```

## Position

Set `positionArea` to any `position-area` value.

```tsx
import { Button, Tooltip, TooltipContent } from "opui-css/react"

const tooltips = [
  {
    id: "tooltip-position-1",
    label: "Above",
    positionArea: "block-start",
    text: "Top",
  },
  {
    id: "tooltip-position-2",
    label: "Before",
    positionArea: "inline-start",
    text: "Start",
  },
  {
    id: "tooltip-position-3",
    label: "After",
    positionArea: "inline-end",
    text: "End",
  },
  {
    id: "tooltip-position-4",
    label: "Below",
    positionArea: "block-end",
    text: "Bottom",
  },
]

export default function Position() {
  return (
    <div className="example-compass">
      {tooltips.map(({ id, label, positionArea, text }) => (
        <Tooltip key={id} id={id} positionArea={positionArea}>
          <Button interestfor={id} commandfor={id} command="toggle-popover">
            {text}
          </Button>
          <TooltipContent>{label}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  )
}
```

## Arrow

Set the `arrow` prop. This would be cool to solve with `corner-shape` one day.

```tsx
import { Button, Tooltip, TooltipContent } from "opui-css/react"

export default function Arrow() {
  return (
    <Tooltip arrow id="tooltip-arrow-1">
      <Button
        interestfor="tooltip-arrow-1"
        commandfor="tooltip-arrow-1"
        command="toggle-popover"
      >
        Save
      </Button>
      <TooltipContent>Save your changes</TooltipContent>
    </Tooltip>
  )
}
```

## API

### Tooltip API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `arrow` | `boolean` | `false` | Adds an arrow that points to the trigger. |
| `children` | `ReactNode` | - | The trigger, followed by `TooltipContent`. |
| `id` | `string` | - | The id of the tooltip. Add `interestfor`, plus `commandfor` and `command="toggle-popover"` for touch, with the same id to the trigger. Required. |
| `positionArea` | `string` | `"self-block-start"` | Any valid `position-area` value. Controls where the tooltip is placed. The `self-` keywords follow the tooltip's own direction, so the placement mirrors in a right-to-left part of a left-to-right page. |

### CSS variables

| Variable | Default | Description |
| --- | --- | --- |
| `--ui-border-width` | `1px` | Default border width for components that draw a border. |
| `--ui-duration` | `0.2s` | Default transition duration. Multiplied by `--ui-motion`. |
| `--ui-ease-enter` | `cubic-bezier(0, 0, 0.3, 1)` | Easing for elements entering the screen: opening `Dialog`, `Drawer` and `Menu`, and the `Badge`, `Progress` and `Tooltip` transitions. |
| `--ui-font-size-small` | `var(--ui-font-size-200)` | Font size of helper text, `Callout`, `Table`, `Tooltip`, code blocks, dense `List` text and small buttons, chips, toggles and fields. Defaults to `--ui-font-size-200`. |
| `--ui-line-height-tight` | `1.25` | Line height of single-line controls and compact text: field inputs, `Table` cells, `Tooltip`, `Card` captions and keyboard hints in buttons. |
| `--ui-motion` | `1` | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/react/guide/theming.md#motion). |
| `--ui-on-inverse` | `light-dark(var(--ui-gray-1), var(--ui-gray-15))` | Text color on `--ui-surface-inverse`. |
| `--ui-radius-small` | `min(5px, var(--ui-radius))` | Corner radius of small parts: `kbd`, inline `code`, `mark`, `var`, `Tooltip`, the file input and a square `Avatar` image. `--ui-radius`, capped at 5px. |
| `--ui-space-1` | `calc(0.25rem * var(--ui-space-scale))` | Spacing step 1: `0.25rem` times `--ui-space-scale`. |
| `--ui-space-2` | `calc(0.5rem * var(--ui-space-scale))` | Spacing step 2: `0.5rem` times `--ui-space-scale`. |
| `--ui-space-4` | `calc(1.25rem * var(--ui-space-scale))` | Spacing step 4: `1.25rem` times `--ui-space-scale`. |
| `--ui-surface-inverse` | `light-dark(var(--ui-gray-15), var(--ui-gray-2))` | Background of `Tooltip`, the `Carousel` buttons and `kbd`, `var`, `.ui-kbd` and `.ui-var`, inverted against the page. |

The stylesheets on this page read these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/react/guide/theme-tokens.md).

## Component properties

Set these on the component itself, inline or in your own CSS. Inputs are the knobs. Outputs are derived from the inputs and the current state, so overriding one fixes it in every state. [Customizing](https://open-props-ui.netlify.app/react/guide/customizing.md#component-properties) has examples.

| Property | Kind | Description |
| --- | --- | --- |
| `--_arrow-size` | Input | Size of the arrow in `.ui-arrow`. |
| `--_bg-color` | Input | Background of the tooltip and its arrow. Defaults to `--ui-surface-inverse`. |
| `--_duration` | Output | Duration of the fade, `--ui-duration` times `--_motion`. |
| `--_ease` | Input | Easing of the fade. Defaults to `--ui-ease-enter`. |
| `--_max-inline-size` | Input | The maximum width. Longer content wraps. |
| `--_min-inline-size` | Input | The minimum width, unless the content is narrower. |
| `--_motion` | Input | Motion multiplier for the fade. `0` turns it off. |
| `--_offset` | Input | Distance from the trigger. `.ui-arrow` computes it from `--_arrow-size`. |
| `--_shift` | Input | How far a shifted tooltip reaches past the center of the trigger. |
| `--_text-color` | Input | The text color. Defaults to `--ui-on-inverse`. |

## Installation

Import the component from `opui-css/react`:

### Dependencies

- [Anchor](https://open-props-ui.netlify.app/react/components/anchor.md)

Copy the CSS into your project to own it. It reads tokens from Open Props, `palette.css` and `theme.css`, so those go on the page too, after `layers.css`. See [Getting started](https://open-props-ui.netlify.app/react/guide/getting-started.md).

- `opui-css/css/components/tooltip.css`
- `opui-css/css/components/anchor.css`

## Used in blocks

- [Notifications](https://open-props-ui.netlify.app/blocks/notifications.md)
- [Product detail](https://open-props-ui.netlify.app/blocks/product-detail.md)
