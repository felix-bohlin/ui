# Anchor

A structural primitive to enable CSS Anchor Positioning on stuff.

## Anatomy

Floating content

- `.ui-anchor`

  Container element. Scopes the anchor to its content.

- `& > :first-child`

  The content the floating content is anchored to.

- `.ui-anchor-floating`

  The floating content.

## Always visible

Floating content that is always shown.

```html
<span class="ui-anchor">
  <button>Hover me</button>
  <span class="ui-anchor-floating">
    <span
      style="
        background: var(--surface-elevated);
        padding: var(--size-2) var(--size-3);
        border-radius: var(--radius-2);
        box-shadow: var(--shadow-3);
      "
      >Floating content</span
    >
  </span>
</span>
```

## Hover trigger

Add `interestfor` on the trigger element pointing to the`.ui-anchor-floating` ID.

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

## Used by

- [Badge](https://open-props-ui.netlify.app/html/components/badge.md)
- [Tooltip](https://open-props-ui.netlify.app/html/components/tooltip.md)

## API

### Anchor API

| Type     | Modifiers                                      | Default     | Description                                                                     |
| -------- | ---------------------------------------------- | ----------- | ------------------------------------------------------------------------------- |
| Position | `--anchor-position-area`                       | `start end` | Any valid `position-area` value. Controls where the floating content is placed. |
| Trigger  | default, `.ui-anchor-floating[popover="hint"]` | default     | Shows the floating content always, or on hover and focus with `popover="hint"`. |

#### Parts

| Part                  | Description                                          |
| --------------------- | ---------------------------------------------------- |
| `.ui-anchor`          | Container element. Scopes the anchor to its content. |
| `& > :first-child`    | The content the floating content is anchored to.     |
| `.ui-anchor-floating` | The floating content.                                |

For a hover trigger, add `popover="hint"` and an id to `.ui-anchor-floating`, and `interestfor` with that id to the anchor content.

## Browser support

- Chromium: Full support Supported since v144.
- Firefox: Partial support Missing: interest-invokers.
- Safari: Partial support Missing: interest-invokers, popover-hint.

See also the [full browser support guide](https://open-props-ui.netlify.app/html/guide/browser-support.md).

## Installation

- `opui-css/css/components/anchor.css`

