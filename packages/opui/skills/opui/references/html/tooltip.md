# Tooltip

Built on top of [Anchor](https://open-props-ui.netlify.app/html/components/anchor.md).

Add the `.ui-tooltip` class to the wrapper. Give the `.ui-floating` element `popover="hint"` and an id. Add `interestfor`, plus `commandfor` and `command="toggle-popover"` for touch, with that id to the trigger.

## Basics

### Text only...

Set the tooltip text inside `.ui-floating[popover="hint"]`.

```html
<span class="ui-tooltip">
  <button
    type="button"
    class="ui-button"
    interestfor="tooltip-basics-1"
    commandfor="tooltip-basics-1"
    command="toggle-popover"
  >
    Save
  </button>
  <span class="ui-floating" id="tooltip-basics-1" popover="hint"
    >Save your changes</span
  >
</span>
```

### ... or any markup you want

You can place any markup you want (famous last words) inside `.ui-floating[popover="hint"]`, not only text.

```html
<span class="ui-tooltip">
  <button
    type="button"
    class="ui-button"
    interestfor="tooltip-rich-content-1"
    commandfor="tooltip-rich-content-1"
    command="toggle-popover"
  >
    Keyboard shortcuts
  </button>
  <span class="ui-floating" id="tooltip-rich-content-1" popover="hint">
    Press <kbd>⌘</kbd> + <kbd>K</kbd> to open the command palette.
  </span>
</span>
```

## Position

Set `--ui-anchor-position-area` on the parent with your preferred `position-area` value.

```html
<div class="example-compass">
  <span class="ui-tooltip" style="--ui-anchor-position-area: block-start">
    <button
      type="button"
      class="ui-button"
      interestfor="tooltip-position-1"
      commandfor="tooltip-position-1"
      command="toggle-popover"
    >
      Top
    </button>
    <span class="ui-floating" id="tooltip-position-1" popover="hint"
      >Above</span
    >
  </span>
  <span class="ui-tooltip" style="--ui-anchor-position-area: inline-start">
    <button
      type="button"
      class="ui-button"
      interestfor="tooltip-position-2"
      commandfor="tooltip-position-2"
      command="toggle-popover"
    >
      Start
    </button>
    <span class="ui-floating" id="tooltip-position-2" popover="hint"
      >Before</span
    >
  </span>
  <span class="ui-tooltip" style="--ui-anchor-position-area: inline-end">
    <button
      type="button"
      class="ui-button"
      interestfor="tooltip-position-3"
      commandfor="tooltip-position-3"
      command="toggle-popover"
    >
      End
    </button>
    <span class="ui-floating" id="tooltip-position-3" popover="hint"
      >After</span
    >
  </span>
  <span class="ui-tooltip" style="--ui-anchor-position-area: block-end">
    <button
      type="button"
      class="ui-button"
      interestfor="tooltip-position-4"
      commandfor="tooltip-position-4"
      command="toggle-popover"
    >
      Bottom
    </button>
    <span class="ui-floating" id="tooltip-position-4" popover="hint"
      >Below</span
    >
  </span>
</div>
```

## Arrow

Add the `.ui-arrow` class on the `.ui-tooltip`. This would be cool to solve with `corner-shape` one day.

```html
<span class="ui-tooltip ui-arrow">
  <button
    type="button"
    class="ui-button"
    interestfor="tooltip-arrow-1"
    commandfor="tooltip-arrow-1"
    command="toggle-popover"
  >
    Save
  </button>
  <span class="ui-floating" id="tooltip-arrow-1" popover="hint"
    >Save your changes</span
  >
</span>
```

## API

### Tooltip API

| Type | Modifiers | Default | Description |
| --- | --- | --- | --- |
| Arrow | `.ui-arrow` | - | Adds an arrow that points to the trigger. |
| Position | `--ui-anchor-position-area` | `self-block-start` | Any valid `position-area` value. Controls where the tooltip is placed. The `self-` keywords follow the tooltip's own direction, so the placement mirrors in a right-to-left part of a left-to-right page. |

#### Parts

| Part | Description |
| --- | --- |
| `.ui-tooltip` | Container element. |
| `& > :first-child` | The trigger that shows the tooltip on hover and focus. |
| `.ui-floating` | The tooltip, a `popover="hint"`. |

Give `.ui-floating` `popover="hint"` and an id. Add `interestfor`, plus `commandfor` and `command="toggle-popover"` for touch, with that id to the trigger.

### CSS variables

| Variable | Default | Description |
| --- | --- | --- |
| `--ui-border-width` | `1px` | Default border width for components that draw a border. |
| `--ui-duration` | `0.2s` | Default transition duration. Multiplied by `--ui-motion`. |
| `--ui-ease-enter` | `cubic-bezier(0, 0, 0.3, 1)` | Easing for elements entering the screen: opening `Dialog`, `Drawer` and `Menu`, and the `Badge`, `Progress` and `Tooltip` transitions. |
| `--ui-font-size-small` | `var(--ui-font-size-200)` | Font size of helper text, `Callout`, `Table`, `Tooltip`, code blocks, dense `List` text and small buttons, chips, toggles and fields. Defaults to `--ui-font-size-200`. |
| `--ui-line-height-tight` | `1.25` | Line height of single-line controls and compact text: field inputs, `Table` cells, `Tooltip`, `Card` captions and keyboard hints in buttons. |
| `--ui-motion` | `1` | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/html/guide/theming.md#motion). |
| `--ui-on-inverse` | `light-dark(var(--ui-gray-1), var(--ui-gray-15))` | Text color on `--ui-surface-inverse`. |
| `--ui-radius-small` | `min(5px, var(--ui-radius))` | Corner radius of small parts: `kbd`, inline `code`, `mark`, `var`, `Tooltip`, the file input and a square `Avatar` image. `--ui-radius`, capped at 5px. |
| `--ui-space-1` | `calc(0.25rem * var(--ui-space-scale))` | Spacing step 1: `0.25rem` times `--ui-space-scale`. |
| `--ui-space-2` | `calc(0.5rem * var(--ui-space-scale))` | Spacing step 2: `0.5rem` times `--ui-space-scale`. |
| `--ui-space-4` | `calc(1.25rem * var(--ui-space-scale))` | Spacing step 4: `1.25rem` times `--ui-space-scale`. |
| `--ui-surface-inverse` | `light-dark(var(--ui-gray-15), var(--ui-gray-2))` | Background of `Tooltip`, the `Carousel` buttons and `kbd`, `var`, `.ui-kbd` and `.ui-var`, inverted against the page. |

The stylesheets on this page read these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md).

## Component properties

Set these on the component itself, inline or in your own CSS. Inputs are the knobs. Outputs are derived from the inputs and the current state, so overriding one fixes it in every state. [Customizing](https://open-props-ui.netlify.app/html/guide/customizing.md#component-properties) has examples.

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

### Dependencies

- [Anchor](https://open-props-ui.netlify.app/html/components/anchor.md)

Copy the CSS into your project to own it. It reads tokens from Open Props, `palette.css` and `theme.css`, so those go on the page too, after `layers.css`. See [Getting started](https://open-props-ui.netlify.app/html/guide/getting-started.md).

- `opui-css/css/components/tooltip.css`
- `opui-css/css/components/anchor.css`

## Used in blocks

- [Notifications](https://open-props-ui.netlify.app/blocks/notifications.md)
- [Product detail](https://open-props-ui.netlify.app/blocks/product-detail.md)
