# Divider

It's just a line.

## Basics

```svelte
<script lang="ts">
  import { Divider } from "opui-css/svelte"
</script>

This text is placed over
<Divider />
This text is placed under
```

## Variants

Use the `variant` prop to change the line color, and `color="primary"` for a primary line. The default variant, `outlined`, is the border color.

```svelte
<script lang="ts">
  import { Divider } from "opui-css/svelte"
</script>

Filled
<Divider variant="filled" />

Primary
<Divider color="primary" />

Tonal
<Divider variant="tonal" />
```

## Content

Put text or any element inside the divider (children in React and Svelte, the default slot in Astro and Vue) to place it in the middle of the line. The divider then renders a `<div>` instead of an `<hr>`, so screen readers read the content in order. Set `align` to `start` or `end` to move it to one side. The lines follow the `variant` and `color`.

```svelte
<script lang="ts">
  import { Button, Divider } from "opui-css/svelte"
</script>

<Divider>or continue with email</Divider>

<Divider align="start">Billing</Divider>

<Divider align="end" color="primary">Today</Divider>

<Divider>
  <Button round size="small" variant="outlined">Show 12 more replies</Button>
</Divider>
```

## Spacing

The space above and below a divider is `--ui-divider-gap`. Cards, callouts, dialogs and drawers set a tighter value, and a divider that is a direct child of a card has no margin, since the card's gap already spaces it. Set `--ui-divider-gap` on any wrapper to change it for every divider inside.

```svelte
<script lang="ts">
  import { Card, CardContent, Divider } from "opui-css/svelte"
</script>

<Card variant="outlined">
  <CardContent>Inside a card, the gap spaces the divider.</CardContent>
  <Divider />
  <CardContent>
    Nested deeper, it uses the card's tighter space.
    <Divider />
    So everything stays close together.
  </CardContent>
</Card>

<div style="--ui-divider-gap: var(--ui-space-1)">
  A custom space on any wrapper
  <Divider />
  reaches every divider inside it.
</div>
```

## API

### Divider API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `align` | `"center"` , `"end"` , `"start"` | `"center"` | Where the content sits on the line. |
| `children` | `Snippet` | - | Optional content in the middle of the line. Renders a `<div>`. |
| `color` | `"primary"` | - | Optional colors. |
| `variant` | `"filled"` , `"outlined"` , `"tonal"` | `"outlined"` | The variant to use. |

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

The stylesheets on this page read these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/svelte/guide/theme-tokens.md).

## Component properties

Set these on the component itself, inline or in your own CSS. Inputs are the knobs. Outputs are derived from the inputs and the current state, so overriding one fixes it in every state. [Customizing](https://open-props-ui.netlify.app/svelte/guide/customizing.md#component-properties) has examples.

| Property | Kind | Description |
| --- | --- | --- |
| `--_divider-border-color` | Input | The line color. Defaults to `--ui-border-color`, `.ui-filled`, `.ui-primary` and `.ui-tonal` set it. |

## Installation

Import the component from `opui-css/svelte`:

Copy the CSS into your project to own it. It reads tokens from Open Props, `palette.css` and `theme.css`, so those go on the page too, after `layers.css`. See [Getting started](https://open-props-ui.netlify.app/svelte/guide/getting-started.md).

- `opui-css/css/components/divider.css`

## Used in blocks

- [Chat](https://open-props-ui.netlify.app/blocks/chat.md)
- [Checkout](https://open-props-ui.netlify.app/blocks/checkout.md)
- [Invoice](https://open-props-ui.netlify.app/blocks/invoice.md)
- [Sign in](https://open-props-ui.netlify.app/blocks/sign-in.md)
- [Two-factor authentication](https://open-props-ui.netlify.app/blocks/two-factor.md)
