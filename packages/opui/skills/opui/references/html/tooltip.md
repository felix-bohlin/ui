# Tooltip

Built on top of [Anchor](https://open-props-ui.netlify.app/html/components/anchor.md).

Add the `.ui-tooltip` class alongside `.ui-anchor` on the wrapper. Wire `interestfor` on the trigger to the`.ui-anchor-floating[popover="hint"]` element's ID.

## Basics

### Text only...

Set the tooltip text inside `.ui-anchor-floating[popover="hint"]`.

```html
<span class="ui-anchor ui-tooltip">
  <button
    class="ui-button"
    interestfor="tooltip-basic"
    commandfor="tooltip-basic"
    command="toggle-popover"
  >
    Save
  </button>
  <span class="ui-anchor-floating" id="tooltip-basic" popover="hint"
    >Save your changes</span
  >
</span>
```

### ... or any markup you want

You can place any markup you want (famous last words) inside `.ui-anchor-floating[popover="hint"]`, not only text.

```html
<span class="ui-anchor ui-tooltip">
  <button
    class="ui-button"
    interestfor="tooltip-rich"
    commandfor="tooltip-rich"
    command="toggle-popover"
  >
    Keyboard shortcuts
  </button>
  <span class="ui-anchor-floating" id="tooltip-rich" popover="hint">
    Press <kbd>⌘</kbd> + <kbd>K</kbd> to open the command palette.
  </span>
</span>
```

## Alignment

Set `--anchor-position-area` on the parent with your preferred`position-area` value.

```html
<div class="tooltip-alignment-grid">
  <span
    class="ui-anchor ui-tooltip"
    style="--anchor-position-area: block-start"
  >
    <button
      class="ui-button"
      interestfor="tooltip-top"
      commandfor="tooltip-top"
      command="toggle-popover"
    >
      Top
    </button>
    <span class="ui-anchor-floating" id="tooltip-top" popover="hint"
      >Above</span
    >
  </span>
  <span
    class="ui-anchor ui-tooltip"
    style="--anchor-position-area: inline-start"
  >
    <button
      class="ui-button"
      interestfor="tooltip-start"
      commandfor="tooltip-start"
      command="toggle-popover"
    >
      Start
    </button>
    <span class="ui-anchor-floating" id="tooltip-start" popover="hint"
      >Before</span
    >
  </span>
  <span class="ui-anchor ui-tooltip" style="--anchor-position-area: inline-end">
    <button
      class="ui-button"
      interestfor="tooltip-end"
      commandfor="tooltip-end"
      command="toggle-popover"
    >
      End
    </button>
    <span class="ui-anchor-floating" id="tooltip-end" popover="hint"
      >After</span
    >
  </span>
  <span class="ui-anchor ui-tooltip" style="--anchor-position-area: block-end">
    <button
      class="ui-button"
      interestfor="tooltip-bottom"
      commandfor="tooltip-bottom"
      command="toggle-popover"
    >
      Bottom
    </button>
    <span class="ui-anchor-floating" id="tooltip-bottom" popover="hint"
      >Below</span
    >
  </span>
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

Add the `.ui-with-arrow` class on the `.ui-tooltip`. This would be cool to solve with `corner-shape` one day.

```html
<span class="ui-anchor ui-tooltip ui-with-arrow">
  <button
    class="ui-button"
    interestfor="tooltip-arrow"
    commandfor="tooltip-arrow"
    command="toggle-popover"
  >
    Save
  </button>
  <span class="ui-anchor-floating" id="tooltip-arrow" popover="hint"
    >Save your changes</span
  >
</span>
```

## API

| Type      | Modifiers                             | Default       | Description                                                                                                                                |
| --------- | ------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Container | `.ui-anchor.ui-tooltip`               | -             | Wrapper element. Combines the anchor primitive with the tooltip styling.                                                                   |
| Floating  | `.ui-anchor-floating[popover="hint"]` | -             | Floating tooltip surface. Uses the `hint`popover so it auto-shows on `interestfor` hover/focus.                                            |
| Trigger   | `interestfor="id"`                    | -             | Add to the trigger element pointing to the floating element's ID. Pair with `commandfor` and `command="toggle-popover"` for touch support. |
| Arrow     | `.ui-with-arrow`                      | -             | Add to the `.ui-tooltip` wrapper to render an arrow pointing from the tooltip toward the trigger.                                          |
| Position  | `--anchor-position-area`              | `block-start` | CSS custom property. Any valid `position-area` value.                                                                                      |

## Browser support

- Chromium: Full support Supported since v144.
- Firefox: Full support Supported since v151.
- Safari: Partial support Missing: popover-hint.

See also the [full browser support guide](https://open-props-ui.netlify.app/html/guide/browser-support.md).

## Installation

- `opui-css/css/components/tooltip.css`
- `opui-css/css/components/anchor.css`

## See also

- [Anchor](https://open-props-ui.netlify.app/html/components/anchor.md)
