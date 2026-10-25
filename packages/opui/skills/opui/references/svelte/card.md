# Card

The card is extremely versatile and can be used on its own, or as a building block for [accordions](https://open-props-ui.netlify.app/svelte/components/accordion.md), [dialogs](https://open-props-ui.netlify.app/svelte/components/dialog.md) and more.

## Anatomy

Overline

## Headline

Subhead

Explain more about the topic shown in the headline and subhead through supporting text.

- `<Card>`

  Container element.

- `<CardHeader>`

  The card header.

- `<CardContent>`

  The card content.

- `<CardActions>`

  A group of actions, such as buttons.

## Variants

Change the card variant with the `variant` prop. The default, `plain`, has the page surface color and no border. Put the body in `CardContent`.

```svelte
<script lang="ts">
  import { Card, CardContent } from "opui-css/svelte"
</script>

<Card>
  <CardContent>Plain</CardContent>
</Card>

<Card variant="transparent">
  <CardContent>Transparent</CardContent>
</Card>

<Card variant="outlined">
  <CardContent>Outlined</CardContent>
</Card>

<Card variant="tonal">
  <CardContent>Tonal</CardContent>
</Card>

<Card variant="elevated">
  <CardContent>Elevated</CardContent>
</Card>
```

### Why does a transparent variant exist?

On the page you won't see a difference. Put a card on a tonal surface or in a dialog, though, and the default plain one turns into a page-colored box. The transparent variant stays see-through.

## Header

Using `CardHeader`.

```svelte
<script lang="ts">
  import { Card, CardHeader } from "opui-css/svelte"
</script>

<Card variant="outlined">
  <CardHeader>
    <p>Blog</p>
    <h3>My ultra-great blog post</h3>
    <p>Please read it.</p>
  </CardHeader>
</Card>
```

## Actions

Using `CardActions`.

There are some basic styles here to get you going, but for more advanced use-cases (which always happen), you might want to add your own styles.

```svelte
<script lang="ts">
  import { Button, Card, CardActions, CardContent } from "opui-css/svelte"
</script>

<Card variant="outlined">
  <CardContent>
    Notice how the buttons are made to align with the text above.
  </CardContent>
  <CardActions>
    <Button>Cancel</Button>
    <Button>Save</Button>
  </CardActions>
</Card>

<Card variant="outlined">
  <CardContent>Trying other button types too. Look at that!</CardContent>
  <CardActions>
    <Button variant="outlined">Cancel</Button>
    <Button variant="filled">Save</Button>
  </CardActions>
</Card>

<Card variant="outlined">
  <CardContent>Icon buttons work too!</CardContent>
  <CardActions>
    <Button aria-label="Favorite" round size="small">
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
      >
        <path
          fill="currentColor"
          d="M3.384 7.13c2.972-4.17 9.167-4.174 12.146-.008l.465.65l.417-.593c2.955-4.195 9.16-4.236 12.17-.081A7.48 7.48 0 0 1 28 16.583L16.732 28.681a1 1 0 0 1-1.464 0L3.992 16.54a7.46 7.46 0 0 1-.608-9.41m10.52 1.155c-2.181-3.05-6.716-3.046-8.892.007a5.46 5.46 0 0 0 .446 6.887L16.002 26.53l10.534-11.31a5.48 5.48 0 0 0 .427-6.95c-2.205-3.044-6.751-3.013-8.916.06l-1.229 1.744a1 1 0 0 1-1.63.006z"
        ></path>
      </svg>
    </Button>
    <Button aria-label="Share" round size="small">
      <svg aria-hidden="true" viewBox="0 0 32 32"></svg>
    </Button>
  </CardActions>
</Card>
```

### Alignment

Actions sit at the end. Set `align="start"` on `CardActions` to line them up with the content instead.

```svelte
<script lang="ts">
  import { Button, Card, CardActions, CardContent } from "opui-css/svelte"
</script>

<Card variant="outlined">
  <CardContent>Buttons aligned to the end. Works too!</CardContent>
  <CardActions align="start">
    <Button>Cancel</Button>
    <Button>Save</Button>
  </CardActions>
</Card>

<Card variant="outlined">
  <CardContent>Again, buttons are aligned to the end!</CardContent>
  <CardActions align="start">
    <Button variant="outlined">Cancel</Button>
    <Button variant="filled">Save</Button>
  </CardActions>
</Card>

<Card variant="outlined">
  <CardContent>Icon buttons aligned to the end!</CardContent>
  <CardActions align="start">
    <Button aria-label="Favorite" round size="small">
      <svg aria-hidden="true" viewBox="0 0 32 32"></svg>
    </Button>
    <Button aria-label="Share" round size="small">
      <svg aria-hidden="true" viewBox="0 0 32 32"></svg>
    </Button>
  </CardActions>
</Card>
```

## Clickable card

Add `.ui-card-link` to a link in the card, usually the one in the heading, and the whole card becomes clickable. The link stretches over the card, so Ctrl/Cmd+click and "Open in new tab" work from anywhere, and screen readers only hear the link text. Other links and buttons in the card stay clickable.

```svelte
<script lang="ts">
  import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
  } from "opui-css/svelte"
</script>

<Card variant="outlined">
  <CardHeader>
    <h3><a class="ui-card-link" href="#clickable">Pricing</a></h3>
  </CardHeader>
  <CardContent>Plans for any team. Click anywhere on the card.</CardContent>
</Card>

<Card variant="outlined">
  <CardHeader>
    <h3><a class="ui-card-link" href="#clickable">Changelog</a></h3>
  </CardHeader>
  <CardContent>Every release in one place.</CardContent>
  <CardActions>
    <Button>Subscribe</Button>
  </CardActions>
</Card>
```

Only one `.ui-card-link` per card. The link covers the text, so selecting text in the card won't work. Fair trade.

## API

### Card API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `Snippet` | - | The card parts, and any other content. |
| `variant` | `"elevated"` , `"outlined"` , `"plain"` , `"tonal"` , `"transparent"` | `"plain"` | The variant to use. The default `plain` card has the page surface color and no border. |

To make the whole card clickable, add `.ui-card-link` to one link in it. Other links and buttons stay clickable.

### Card actions API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `align` | `"end"` , `"start"` | `"end"` | Alignment for the actions. |
| `children` | `Snippet` | - | The actions, such as buttons. |

### CSS variables

| Variable | Default | Description |
| --- | --- | --- |
| `--ui-border-color` | `light-dark( color-mix( in oklch, var(--ui-text-strong) var(--ui-border-strength-light), var(--ui-surface) ), color-mix( in oklch, var(--ui-text-strong) var(--ui-border-strength-dark), var(--ui-surface) ) )` | Default border color for cards, lists, tables and dividers. `--ui-text-strong` mixed into `--ui-surface` at `--ui-border-strength-light` or `--ui-border-strength-dark`. |
| `--ui-border-color-on-raised` | `light-dark( color-mix( in oklch, var(--ui-text-strong) var(--ui-border-strength-light), var(--ui-surface) ), color-mix( in oklch, var(--ui-text-strong) var(--ui-border-strength-dark), var(--ui-surface) ) )` | Border color inside raised surfaces: tonal and elevated `Card` and `Accordion`, `Dialog`, `Drawer`, `Menu` and `Callout` without a severity. The same mix as `--ui-border-color` by default. Each raised component sets `--ui-border-color` to it on its root, so a theme that wants another border on raised surfaces, such as the page background in dark mode, sets this one. |
| `--ui-border-color-raised` | Unset | Border color of tonal and elevated `Card` and `Accordion` and of `Callout` without a severity. When unset, cards and accordions use the page background color, so they stay visible on tonal surfaces, and callouts their tonal background. |
| `--ui-border-width` | `1px` | Default border width for components that draw a border. |
| `--ui-card-padding` | Unset | Padding of `Card`, `Dialog` and `Accordion` content, headers and actions. When unset, `--ui-space-3`. |
| `--ui-duration` | `0.2s` | Default transition duration. Multiplied by `--ui-motion`. |
| `--ui-ease` | `ease` | Default easing for transitions. |
| `--ui-field-border-color-on-raised` | `color-mix( in oklch, var(--ui-text-strong) var(--ui-field-border-strength), var(--ui-surface) )` | Field border color inside raised surfaces. The same mix as `--ui-field-border-color` by default. Each raised component sets `--ui-field-border-color` to it on its root. |
| `--ui-focus-ring-color` | `oklch( from var(--ui-surface) clamp(0, (0.6 - l) * 1000, 1) 0 0 )` | Color of the keyboard focus ring. Black on surfaces lighter than OKLCH 0.6 and white on darker ones, so it reaches 3:1 on any `--ui-surface`. |
| `--ui-focus-ring-offset` | `2px` | Distance between a control and its focus ring. |
| `--ui-focus-ring-style` | `solid` | Outline style of the focus ring. |
| `--ui-focus-ring-width` | `2px` | Width of the focus ring. |
| `--ui-font-size-body` | `var(--ui-font-size-300)` | Font size of body copy, `Card` text and the `Callout` title. Defaults to `--ui-font-size-300`. |
| `--ui-font-size-caption` | `var(--ui-font-size-100)` | Font size of captions, `Badge`, `Chip`, `Divider` labels, `List` secondary text, `Menu` shortcuts, overlines, `small`, `figcaption` and x-small buttons, toggles and fields. Defaults to `--ui-font-size-100`. |
| `--ui-line-height-tight` | `1.25` | Line height of single-line controls and compact text: field inputs, `Table` cells, `Tooltip`, `Card` captions and keyboard hints in buttons. |
| `--ui-motion` | `1` | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/svelte/guide/theming.md#motion). |
| `--ui-radius` | `0.5rem` | Corner radius for every component: cards, callouts, menus, buttons and fields follow it, and small parts like `kbd`, tooltips and checkboxes never get rounder than it. Set it to `0` for square corners. Takes a single length. |
| `--ui-shadow-elevated` | `0 -1px 3px 0 hsl(from var(--ui-shadow-color) h s l / calc(alpha + 0.02)), 0 1px 2px -5px hsl(from var(--ui-shadow-color) h s l / calc(alpha + 0.02)), 0 2px 5px -5px hsl(from var(--ui-shadow-color) h s l / calc(alpha + 0.04)), 0 4px 12px -5px hsl(from var(--ui-shadow-color) h s l / calc(alpha + 0.05)), 0 12px 15px -5px hsl(from var(--ui-shadow-color) h s l / calc(alpha + 0.07))` | Shadow of elevated `Card` and `Accordion`. Five layers of `--ui-shadow-color`, which follows the color scheme, also in `.ui-light` and `.ui-dark` parts of the page. |
| `--ui-shadow-surface` | `none` | Shadow of tonal and outlined `Card` and `Accordion`, and of `Callout`. `none` by default, for themes that put every surface on the same plane. |
| `--ui-space-1` | `calc(0.25rem * var(--ui-space-scale))` | Spacing step 1: `0.25rem` times `--ui-space-scale`. |
| `--ui-space-2` | `calc(0.5rem * var(--ui-space-scale))` | Spacing step 2: `0.5rem` times `--ui-space-scale`. |
| `--ui-space-3` | `calc(1rem * var(--ui-space-scale))` | Spacing step 3: `1rem` times `--ui-space-scale`. |
| `--ui-surface` | `light-dark(var(--ui-gray-1), var(--ui-gray-13))` | Page and card background. |
| `--ui-surface-elevated` | `light-dark(var(--ui-gray-1), var(--ui-gray-12))` | Background of elevated cards and accordions, dialogs, drawers, menus and native `Select` options. |
| `--ui-surface-tonal` | `light-dark(var(--ui-gray-3), var(--ui-gray-12))` | Background of tonal variants. |
| `--ui-text` | `light-dark( color-mix( in oklch, var(--ui-text-strong) var(--ui-text-strength-light), var(--ui-surface) ), color-mix( in oklch, var(--ui-text-strong) var(--ui-text-strength-dark), var(--ui-surface) ) )` | Body text color. `--ui-text-strong` mixed into `--ui-surface` at `--ui-text-strength-light` or `--ui-text-strength-dark`. |

The stylesheets on this page read these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/svelte/guide/theme-tokens.md).

## Component properties

Set these on the component itself, inline or in your own CSS. Inputs are the knobs. Outputs are derived from the inputs and the current state, so overriding one fixes it in every state. [Customizing](https://open-props-ui.netlify.app/svelte/guide/customizing.md#component-properties) has examples.

| Property | Kind | Description |
| --- | --- | --- |
| `--_bg-color` | Output | The current background. Set by the variants. |
| `--_border-color` | Output | The current border color. Set by the variants (`--ui-border-color-raised` in `.ui-tonal` and `.ui-elevated` when a theme sets it) and by hovering `.ui-card-link`. |
| `--_border-width` | Output | The current border width. Set by the variants. |
| `--_duration` | Output | Duration of the focus ring animation, `--ui-duration` times `--_motion`. |
| `--_ease` | Input | Easing of the focus ring animation. Defaults to `--ui-ease`. |
| `--_elevated-bg-color` | Input | Background of `.ui-elevated`. Defaults to `--ui-surface-elevated`. |
| `--_elevated-shadow` | Input | Shadow of `.ui-elevated`. Defaults to `--ui-shadow-elevated`. |
| `--_motion` | Input | Motion multiplier for the focus ring animation. `0` turns it off. |
| `--_outlined-border-color` | Input | Border color of `.ui-outlined`. Defaults to `--ui-border-color`. |
| `--_padding` | Input | Padding of the header, content and actions. `--ui-card-padding`, or `--ui-space-3` when a theme leaves it unset. |
| `--_shadow` | Output | The current shadow. `.ui-elevated` sets `--_elevated-shadow`, `.ui-tonal` and `.ui-outlined` set `--ui-shadow-surface`. |
| `--_surface-bg-color` | Input | Background of default and `.ui-outlined` cards, and border color of `.ui-tonal` and `.ui-elevated` unless a theme sets `--ui-border-color-raised`. Defaults to `--ui-surface`. |
| `--_tonal-bg-color` | Input | Background of `.ui-tonal`. Defaults to `--ui-surface-tonal`. |

## Installation

Import the components from `opui-css/svelte`:

### Used by

- [Accordion](https://open-props-ui.netlify.app/svelte/components/accordion.md)
- [Checkbox](https://open-props-ui.netlify.app/svelte/components/checkbox.md)
- [Dialog](https://open-props-ui.netlify.app/svelte/components/dialog.md)
- [Radio](https://open-props-ui.netlify.app/svelte/components/radio.md)
- [Switch](https://open-props-ui.netlify.app/svelte/components/switch.md)

Copy the CSS into your project to own it. It reads tokens from Open Props, `palette.css` and `theme.css`, so those go on the page too, after `layers.css`. See [Getting started](https://open-props-ui.netlify.app/svelte/guide/getting-started.md).

- `opui-css/css/components/card.css`

## Used in blocks

- [Account settings](https://open-props-ui.netlify.app/blocks/account-settings.md)
- [Analytics dashboard](https://open-props-ui.netlify.app/blocks/analytics-dashboard.md)
- [App shell](https://open-props-ui.netlify.app/blocks/app-shell.md)
- [Billing](https://open-props-ui.netlify.app/blocks/billing.md)
- [Blog list](https://open-props-ui.netlify.app/blocks/blog-list.md)
- [Checkout](https://open-props-ui.netlify.app/blocks/checkout.md)
- [Empty states](https://open-props-ui.netlify.app/blocks/empty-states.md)
- [FAQ](https://open-props-ui.netlify.app/blocks/faq.md)
- [Feature grid](https://open-props-ui.netlify.app/blocks/feature-grid.md)
- [File manager](https://open-props-ui.netlify.app/blocks/file-manager.md)
- [Forgot password](https://open-props-ui.netlify.app/blocks/forgot-password.md)
- [Hero](https://open-props-ui.netlify.app/blocks/hero.md)
- [Invoice](https://open-props-ui.netlify.app/blocks/invoice.md)
- [Kanban board](https://open-props-ui.netlify.app/blocks/kanban-board.md)
- [Newsletter](https://open-props-ui.netlify.app/blocks/newsletter.md)
- [Notification settings](https://open-props-ui.netlify.app/blocks/notification-settings.md)
- [Notifications](https://open-props-ui.netlify.app/blocks/notifications.md)
- [Onboarding checklist](https://open-props-ui.netlify.app/blocks/onboarding-checklist.md)
- [Order history](https://open-props-ui.netlify.app/blocks/order-history.md)
- [Pricing](https://open-props-ui.netlify.app/blocks/pricing.md)
- [Product detail](https://open-props-ui.netlify.app/blocks/product-detail.md)
- [Project overview](https://open-props-ui.netlify.app/blocks/project-overview.md)
- [Sales dashboard](https://open-props-ui.netlify.app/blocks/sales-dashboard.md)
- [Server status](https://open-props-ui.netlify.app/blocks/server-status.md)
- [Shopping cart](https://open-props-ui.netlify.app/blocks/shopping-cart.md)
- [Sign in](https://open-props-ui.netlify.app/blocks/sign-in.md)
- [Sign up](https://open-props-ui.netlify.app/blocks/sign-up.md)
- [Team members](https://open-props-ui.netlify.app/blocks/team-members.md)
- [Testimonials](https://open-props-ui.netlify.app/blocks/testimonials.md)
- [Two-factor authentication](https://open-props-ui.netlify.app/blocks/two-factor.md)
- [User directory](https://open-props-ui.netlify.app/blocks/user-directory.md)
