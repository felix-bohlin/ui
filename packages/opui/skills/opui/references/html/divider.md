# Divider

It's just a line.

## Basics

```html
This text is placed over
<hr class="ui-divider" />
This text is placed under
```

## Variants

Use `.ui-filled` or `.ui-tonal` to change the line color, and `.ui-primary` for a primary line.

```html
Filled
<hr class="ui-divider ui-filled" />

Primary
<hr class="ui-divider ui-primary" />

Tonal
<hr class="ui-divider ui-tonal" />
```

## Content

Put text or any element in a `<div class="ui-divider">` or `<p class="ui-divider">` to place it in the middle of the line, since an `<hr>` can't have content. Screen readers read it in order. Add `.ui-align-start` or `.ui-align-end` to move it to one side. The lines follow the variant and color classes.

```html
<div class="ui-divider">or continue with email</div>

<div class="ui-divider ui-align-start">Billing</div>

<div class="ui-divider ui-align-end ui-primary">Today</div>

<div class="ui-divider">
  <button class="ui-button ui-outlined ui-round ui-small" type="button">
    Show 12 more replies
  </button>
</div>
```

## Spacing

The space above and below a divider is `--ui-divider-gap`. Cards, callouts, dialogs and drawers set a tighter value, and a divider that is a direct child of a card has no margin, since the card's gap already spaces it. Set `--ui-divider-gap` on any wrapper to change it for every divider inside.

```html
<div class="ui-card ui-outlined">
  <div class="ui-content">Inside a card, the gap spaces the divider.</div>
  <hr class="ui-divider" />
  <div class="ui-content">
    Nested deeper, it uses the card's tighter space.
    <hr class="ui-divider" />
    So everything stays close together.
  </div>
</div>

<div style="--ui-divider-gap: var(--ui-space-1)">
  A custom space on any wrapper
  <hr class="ui-divider" />
  reaches every divider inside it.
</div>
```

## API

### Divider API

| Type | Modifiers | Default | Description |
| --- | --- | --- | --- |
| Alignment | default, `.ui-align-end`, `.ui-align-start` | default | Where the content sits on the line. |
| Colors | `.ui-primary` | - | Optional colors. |
| Variants | default, `.ui-filled`, `.ui-tonal` | default | The variant to use. |

#### Parts

| Part | Description |
| --- | --- |
| `.ui-divider` | The divider line. An `<hr>`, or a `<div>` or `<p>` with content in the middle. |

### CSS variables

| Variable | Default | Description |
| --- | --- | --- |
| `--ui-border-color` | `light-dark( color-mix( in oklch, var(--ui-text-strong) var(--ui-border-strength-light), var(--ui-surface) ), color-mix( in oklch, var(--ui-text-strong) var(--ui-border-strength-dark), var(--ui-surface) ) )` | Default border color for cards, lists, tables and dividers. `--ui-text-strong` mixed into `--ui-surface` at `--ui-border-strength-light` or `--ui-border-strength-dark`. |
| `--ui-border-width` | `1px` | Default border width for components that draw a border. |
| `--ui-divider-gap` | `calc(clamp(1.5rem, 3vi, 2rem) * var(--ui-space-scale))` | Block margin around a `Divider`, times `--ui-space-scale`. Cards, callouts, dialogs and drawers set it to `--ui-space-3`. A divider that is a direct child of a card has no margin, since the card's gap already spaces it. |
| `--ui-font-size-caption` | `var(--ui-font-size-100)` | Font size of captions, `Badge`, `Chip`, `Divider` labels, `List` secondary text, `Menu` shortcuts, overlines, `small`, `figcaption` and x-small buttons, toggles and fields. Defaults to `--ui-font-size-100`. |
| `--ui-primary` | `light-dark( oklch( from var(--ui-primary-source) min(l, var(--ui-primary-max-lightness)) c h ), oklch( from var(--ui-primary-source) max(l, var(--ui-primary-min-lightness)) min(c, var(--ui-accent-max-chroma)) h ) )` | Brand color for primary actions and accents. Derived from `--ui-primary-source` within `--ui-primary-max-lightness` and `--ui-primary-min-lightness`. Set `--ui-primary-source` to keep more contrast working, or this token to pin the color. |
| `--ui-space-3` | `calc(1rem * var(--ui-space-scale))` | Spacing step 3: `1rem` times `--ui-space-scale`. |
| `--ui-space-4` | `calc(1.25rem * var(--ui-space-scale))` | Spacing step 4: `1.25rem` times `--ui-space-scale`. |
| `--ui-surface-filled` | `light-dark(var(--ui-gray-4), var(--ui-gray-15))` | Background of filled areas such as progress tracks and table stripes. |
| `--ui-surface-tonal` | `light-dark(var(--ui-gray-3), var(--ui-gray-12))` | Background of tonal variants. |
| `--ui-text` | `light-dark( color-mix( in oklch, var(--ui-text-strong) var(--ui-text-strength-light), var(--ui-surface) ), color-mix( in oklch, var(--ui-text-strong) var(--ui-text-strength-dark), var(--ui-surface) ) )` | Body text color. `--ui-text-strong` mixed into `--ui-surface` at `--ui-text-strength-light` or `--ui-text-strength-dark`. |

The stylesheets on this page read these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md).

## Component properties

Set these on the component itself, inline or in your own CSS. Inputs are the knobs. Outputs are derived from the inputs and the current state, so overriding one fixes it in every state. [Customizing](https://open-props-ui.netlify.app/html/guide/customizing.md#component-properties) has examples.

| Property | Kind | Description |
| --- | --- | --- |
| `--_divider-border-color` | Input | The line color. Defaults to `--ui-border-color`, `.ui-filled`, `.ui-primary` and `.ui-tonal` set it. |

## Installation

Copy the CSS into your project to own it. It reads tokens from Open Props, `palette.css` and `theme.css`, so those go on the page too, after `layers.css`. See [Getting started](https://open-props-ui.netlify.app/html/guide/getting-started.md).

- `opui-css/css/components/divider.css`

## Used in blocks

- [Chat](https://open-props-ui.netlify.app/blocks/chat.md)
- [Checkout](https://open-props-ui.netlify.app/blocks/checkout.md)
- [Invoice](https://open-props-ui.netlify.app/blocks/invoice.md)
- [Sign in](https://open-props-ui.netlify.app/blocks/sign-in.md)
- [Two-factor authentication](https://open-props-ui.netlify.app/blocks/two-factor.md)
