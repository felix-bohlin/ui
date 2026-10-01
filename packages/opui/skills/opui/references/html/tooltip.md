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

### Tooltip API

| Type     | Modifiers                | Default       | Description                                                            |
| -------- | ------------------------ | ------------- | ---------------------------------------------------------------------- |
| Arrow    | `.ui-with-arrow`         | -             | Adds an arrow that points to the trigger.                              |
| Position | `--anchor-position-area` | `block-start` | Any valid `position-area` value. Controls where the tooltip is placed. |

#### Parts

| Part                  | Description                                            |
| --------------------- | ------------------------------------------------------ |
| `.ui-tooltip`         | Container element.                                     |
| `& > :first-child`    | The trigger that shows the tooltip on hover and focus. |
| `.ui-anchor-floating` | The tooltip, a `popover="hint"`.                       |

Also add `.ui-anchor` to the root. Give `.ui-anchor-floating` `popover="hint"` and an id, and add `interestfor` with that id to the trigger.

## Browser support

- Chromium: Full support Supported since v144.
- Firefox: Partial support Missing: interest-invokers.
- Safari: Partial support Missing: interest-invokers, popover-hint.

See also the [full browser support guide](https://open-props-ui.netlify.app/html/guide/browser-support.md).

## Installation

- `opui-css/css/components/tooltip.css`
- `opui-css/css/components/anchor.css`

## See also

- [Anchor](https://open-props-ui.netlify.app/html/components/anchor.md)
