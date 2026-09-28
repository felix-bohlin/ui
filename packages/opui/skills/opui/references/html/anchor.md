# Anchor

A structural primitive to enable CSS Anchor Positioning on stuff.

## Always Visible

Floating content that is always shown.

```html
<span class="ui-anchor">
  <button>Hover me</button>
  <span class="ui-anchor-floating">
    <span
      style="
        background: var(--surface-2);
        padding: var(--size-2) var(--size-3);
        border-radius: var(--radius-2);
        box-shadow: var(--shadow-3);
      "
      >Floating content</span
    >
  </span>
</span>
```

## Hover Trigger

Add `interestfor` on the trigger element pointing to the `.ui-anchor-floating` ID.

Add `interestfor`, `commandfor`, and `command="toggle-popover"` to the anchor trigger so touch devices can tap to show the floating content.

```html
<span class="ui-anchor">
  <button
    interestfor="anchor-hover-1"
    commandfor="anchor-hover-1"
    command="toggle-popover"
  >
    Hover me
  </button>
  <span class="ui-anchor-floating" id="anchor-hover-1" popover="hint">
    <div class="ui-card ui-elevated">Tooltip content</div>
  </span>
</span>
```

## Used By

- [Badge](https://open-props-ui.netlify.app/html/components/badge.md)
- [Tooltip](https://open-props-ui.netlify.app/html/components/tooltip.md)

## API

| Type      | Modifiers                | Default     | Description                                                                                                               |
| --------- | ------------------------ | ----------- | ------------------------------------------------------------------------------------------------------------------------- |
| Container | `.ui-anchor`             | -           | Wrapper element. Provides `anchor-scope` and sets `anchor-name` on its first child.                                       |
| Floating  | `.ui-anchor-floating`    | -           | Positioned floating element. Uses `position-anchor` and `position-area`.                                                  |
| Position  | `--anchor-position-area` | `start end` | CSS custom property. Any valid `position-area` value.                                                                     |
| Trigger   | `data-trigger="hover"`   | -           | Shows floating content on hover/focus. Add `interestfor` on the trigger element pointing to the `.ui-anchor-floating` ID. |

## Browser support

- Chromium: Full support Supported since v151.
- Firefox: Full support Supported since v153.
- Safari: Partial support Missing: popover-hint.

See also the [full browser support guide](https://open-props-ui.netlify.app/html/guide/browser-support.md).

## Installation

- `opui-css/css/components/anchor.css`

