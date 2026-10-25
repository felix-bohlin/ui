# Callout

Callouts call out for user attention. Should be part of the flow and used **without** interrupting the user's task.

## Anatomy

### Title

Supporting text that explains the callout in more detail.

- `<Callout>`

  Container element.

- `<CalloutIcon>`

  An optional icon before the content. In Astro, React, Svelte and Vue, `CalloutIcon` renders the default one for info, success, warning and critical.

- `<CalloutContent>`

  The content, with an optional heading first.

### Alternatives

You might want to check out:

- [Dialog](https://open-props-ui.netlify.app/vue/components/dialog.md): takes over completely

## Variants

Tonal (default) and outlined variants are available via the `variant` prop. Put the text in `CalloutContent`, with an optional heading such as an `<h3>` first. Every heading level gets the same title style.

```vue
<script setup lang="ts">
import { Callout, CalloutContent } from "opui-css/vue"
</script>

<template>
  <Callout>
    <CalloutContent>
      <h3>Note</h3>
      <p>
        This is a tonal Callout. Notice the lack of icons - it's not really
        needed here.
      </p>
    </CalloutContent>
  </Callout>
  <Callout variant="outlined">
    <CalloutContent>
      <h3>Another Callout</h3>
      <p>
        This is an outlined Callout. Why not use a
        <a class="ui-link" href="#">Card</a> since they look very similar? For
        one, the Callout is a more focused component with different properties.
      </p>
    </CalloutContent>
  </Callout>
</template>
```

## Severities

The `severity` prop accepts `critical`, `info`, `neutral`, `success` and `warning`. `neutral` is a non-severity tone for brand-tinted attention. The default is a plain surface.

### Icons and accessibility

Omitting an icon is possible. However, it helps having one if you need to convey a specific kind of severity in your Callout message. For instance, colorblind users might be left confused if there's not enough visual guidance.

```vue
<script setup lang="ts">
import { Callout, CalloutContent, CalloutIcon } from "opui-css/vue"
</script>

<template>
  <Callout severity="critical">
    <CalloutIcon />
    <CalloutContent>This is a tonal critical Callout</CalloutContent>
  </Callout>
  <Callout severity="info">
    <CalloutIcon />
    <CalloutContent>This is a tonal info Callout</CalloutContent>
  </Callout>
  <Callout severity="neutral">
    <CalloutContent>This is a tonal neutral Callout</CalloutContent>
  </Callout>
  <Callout severity="success">
    <CalloutIcon />
    <CalloutContent>This is a tonal success Callout</CalloutContent>
  </Callout>
  <Callout severity="warning">
    <CalloutIcon />
    <CalloutContent>This is a tonal warning Callout</CalloutContent>
  </Callout>
  <Callout severity="critical" variant="outlined">
    <CalloutIcon />
    <CalloutContent>This is an outlined critical Callout</CalloutContent>
  </Callout>
  <Callout severity="info" variant="outlined">
    <CalloutIcon />
    <CalloutContent>This is an outlined info Callout</CalloutContent>
  </Callout>
  <Callout severity="neutral" variant="outlined">
    <CalloutContent>This is an outlined neutral Callout</CalloutContent>
  </Callout>
  <Callout severity="success" variant="outlined">
    <CalloutIcon />
    <CalloutContent>This is an outlined success Callout</CalloutContent>
  </Callout>
  <Callout severity="warning" variant="outlined">
    <CalloutIcon />
    <CalloutContent>This is an outlined warning Callout</CalloutContent>
  </Callout>
</template>
```

## Icon

`CalloutIcon` renders the default icon for `info`, `success`, `warning` and `critical`. For a custom icon, put your own `<svg aria-hidden="true">` in the `Callout` instead, before `CalloutContent`.

```vue
<script setup lang="ts">
import { Callout, CalloutContent } from "opui-css/vue"
</script>

<template>
  <Callout>
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
    >
      <path
        fill="currentColor"
        d="M16 13a1 1 0 0 1 1 1v9a1 1 0 1 1-2 0v-9a1 1 0 0 1 1-1m0-2a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3M2 16C2 8.268 8.268 2 16 2s14 6.268 14 14s-6.268 14-14 14S2 23.732 2 16M16 4C9.373 4 4 9.373 4 16s5.373 12 12 12s12-5.373 12-12S22.627 4 16 4"
      ></path>
    </svg>
    <CalloutContent>This is a tonal Callout with an icon.</CalloutContent>
  </Callout>
</template>
```

## Accessibility

- The Callout is an `<article>`, so screen readers announce it as self-contained content.
- Use both color and icon to help distinguish between Callout [severities](#severities). The icon is hidden from screen readers, so say the severity in the text, for example with a title like Warning.
- Don't interrupt the user with a Callout. In that case, use [Dialog](https://open-props-ui.netlify.app/vue/components/dialog.md).

## API

### Callout API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `severity` | `"critical"` , `"info"` , `"neutral"` , `"success"` , `"warning"` | - | The severity. Sets the color, and in Astro, React, Svelte and Vue the icon `CalloutIcon` renders. |
| `variant` | `"outlined"` , `"tonal"` | `"tonal"` | The variant to use. |

#### Slots

| Slot | Description |
| --- | --- |
| `default` | The callout parts, and any other content. |

For a custom icon, put your own `<svg aria-hidden="true">` in the Callout instead of `CalloutIcon`, before `CalloutContent`.

### CSS variables

| Variable | Default | Description |
| --- | --- | --- |
| `--ui-border-color` | `light-dark( color-mix( in oklch, var(--ui-text-strong) var(--ui-border-strength-light), var(--ui-surface) ), color-mix( in oklch, var(--ui-text-strong) var(--ui-border-strength-dark), var(--ui-surface) ) )` | Default border color for cards, lists, tables and dividers. `--ui-text-strong` mixed into `--ui-surface` at `--ui-border-strength-light` or `--ui-border-strength-dark`. |
| `--ui-border-color-on-raised` | `light-dark( color-mix( in oklch, var(--ui-text-strong) var(--ui-border-strength-light), var(--ui-surface) ), color-mix( in oklch, var(--ui-text-strong) var(--ui-border-strength-dark), var(--ui-surface) ) )` | Border color inside raised surfaces: tonal and elevated `Card` and `Accordion`, `Dialog`, `Drawer`, `Menu` and `Callout` without a severity. The same mix as `--ui-border-color` by default. Each raised component sets `--ui-border-color` to it on its root, so a theme that wants another border on raised surfaces, such as the page background in dark mode, sets this one. |
| `--ui-border-color-raised` | Unset | Border color of tonal and elevated `Card` and `Accordion` and of `Callout` without a severity. When unset, cards and accordions use the page background color, so they stay visible on tonal surfaces, and callouts their tonal background. |
| `--ui-border-width` | `1px` | Default border width for components that draw a border. |
| `--ui-field-border-color-on-raised` | `color-mix( in oklch, var(--ui-text-strong) var(--ui-field-border-strength), var(--ui-surface) )` | Field border color inside raised surfaces. The same mix as `--ui-field-border-color` by default. Each raised component sets `--ui-field-border-color` to it on its root. |
| `--ui-font-size-body` | `var(--ui-font-size-300)` | Font size of body copy, `Card` text and the `Callout` title. Defaults to `--ui-font-size-300`. |
| `--ui-font-size-small` | `var(--ui-font-size-200)` | Font size of helper text, `Callout`, `Table`, `Tooltip`, code blocks, dense `List` text and small buttons, chips, toggles and fields. Defaults to `--ui-font-size-200`. |
| `--ui-font-weight-semibold` | `600` | Font weight for labels, table headers and titles. |
| `--ui-icon-size` | `1.25rem` | Default icon size inside components. |
| `--ui-palette-accent` | `light-dark( oklch(from var(--ui-color-9) min(l, var(--ui-accent-max-lightness)) c h), oklch( from var(--ui-color-7) max(l, var(--ui-palette-accent-min-lightness)) c h ) )` | The accent shade of the current palette: `Callout` icons and outlined borders. Stronger with more contrast. The severity `Chip` dot reads it. Re-derived inside every severity scope, so `.ui-success` gets a green one. |
| `--ui-palette-border` | `light-dark( oklch( from var(--ui-color-5) min(l, var(--ui-palette-border-max-lightness)) c h ), oklch( from var(--ui-color-11) max(l, var(--ui-palette-border-min-lightness)) c h ) )` | The border shade of the current palette: tonal `Callout` borders. Stronger with more contrast. Severity `Chip` borders read it. Re-derived inside every severity scope. |
| `--ui-palette-strong` | `light-dark(var(--ui-color-16), var(--ui-color-1))` | The strongest shade of the current palette, the darkest in light mode and the lightest in dark mode, with the most contrast against the page: `Callout` text, the default `Button` fill when `--ui-button-accent` is unset. Severity `Chip` text reads it. Re-derived inside every severity scope. |
| `--ui-palette-tint-subtle` | `light-dark( oklch(from var(--ui-color-3) l c h / 60%), oklch(from var(--ui-color-6) l c h / 5%) )` | A faint fill of the current palette: tonal severity `Callout`s. Tonal severity `Chip`s read it. Re-derived inside every severity scope. |
| `--ui-primary-text` | `light-dark( oklch(from var(--ui-primary) min(l, var(--ui-text-max-lightness)) c h), oklch( from var(--ui-primary) max(l, var(--ui-text-min-lightness)) min(c, var(--ui-text-max-chroma)) h ) )` | Primary as a text color: links, rich text links, `Callout` link hover, `Button` and `ButtonGroup` with `.ui-primary` and no variant or `.ui-outlined`, and a selected `Select` option. Defaults to `--ui-primary` with its lightness kept within `--ui-text-max-lightness` and `--ui-text-min-lightness`, and is derived again from the more-contrast primary. Set it when the primary needs another shade for text. |
| `--ui-radius` | `0.5rem` | Corner radius for every component: cards, callouts, menus, buttons and fields follow it, and small parts like `kbd`, tooltips and checkboxes never get rounder than it. Set it to `0` for square corners. Takes a single length. |
| `--ui-shadow-surface` | `none` | Shadow of tonal and outlined `Card` and `Accordion`, and of `Callout`. `none` by default, for themes that put every surface on the same plane. |
| `--ui-space-2` | `calc(0.5rem * var(--ui-space-scale))` | Spacing step 2: `0.5rem` times `--ui-space-scale`. |
| `--ui-space-3` | `calc(1rem * var(--ui-space-scale))` | Spacing step 3: `1rem` times `--ui-space-scale`. |
| `--ui-surface` | `light-dark(var(--ui-gray-1), var(--ui-gray-13))` | Page and card background. |
| `--ui-surface-tonal` | `light-dark(var(--ui-gray-3), var(--ui-gray-12))` | Background of tonal variants. |
| `--ui-text-strong` | `light-dark(var(--ui-gray-15), var(--ui-gray-1))` | Strongest text color, for headings, labels and values. Body text is `--ui-text`. |

The stylesheets on this page read these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/vue/guide/theme-tokens.md).

## Component properties

Set these on the component itself, inline or in your own CSS. Inputs are the knobs. Outputs are derived from the inputs and the current state, so overriding one fixes it in every state. [Customizing](https://open-props-ui.netlify.app/vue/guide/customizing.md#component-properties) has examples.

| Property | Kind | Description |
| --- | --- | --- |
| `--_bg-color` | Output | The current tint, drawn over `--_surface-bg-color`. Set by the severity classes and `.ui-outlined`. |
| `--_border-color` | Output | The current border color. `--ui-border-color-raised` when a theme sets it, otherwise `--ui-surface-tonal`. Set by the severity classes and `.ui-outlined`. |
| `--_content-gap` | Input | Space between the children of `.ui-content`. |
| `--_font-size` | Input | Font size of `.ui-content`. |
| `--_gap` | Input | Gap between a direct child `svg` and `.ui-content`. |
| `--_icon-size` | Input | Width of the icon column when there's a direct child `svg`. |
| `--_icon-text-color` | Output | The current color of a direct child `svg`. Set by the severity classes and `.ui-outlined`. |
| `--_link-hover-text-color` | Input | Link color on hover and focus. Defaults to `--ui-primary-text`, not used in `.ui-outlined`. |
| `--_outlined-bg-color` | Input | Background of `.ui-outlined`. Defaults to `--ui-surface`. |
| `--_outlined-border-color` | Input | Border color of `.ui-outlined`. Defaults to `--ui-border-color`, set by the severity classes. |
| `--_outlined-icon-text-color` | Input | Icon color of `.ui-outlined`. Set by the severity classes. |
| `--_outlined-text-color` | Input | Text color of `.ui-outlined`. Set by the severity classes. |
| `--_padding` | Input | The padding. |
| `--_radius` | Input | The corner radius. Defaults to `--ui-radius`. |
| `--_shadow` | Input | The shadow. Defaults to `--ui-shadow-surface`. |
| `--_surface-bg-color` | Input | The opaque background under the tint. Defaults to `--ui-surface`. |
| `--_text-color` | Output | The current text color. Set by the severity classes and `.ui-outlined`. |
| `--_title-font-size` | Input | Font size of headings in `.ui-content`. |

## Installation

Import the components from `opui-css/vue`:

Copy the CSS into your project to own it. It reads tokens from Open Props, `palette.css` and `theme.css`, so those go on the page too, after `layers.css`. See [Getting started](https://open-props-ui.netlify.app/vue/guide/getting-started.md).

- `opui-css/css/components/callout.css`

`theme tokens (snippet)`

## Used in blocks

- [Billing](https://open-props-ui.netlify.app/blocks/billing.md)
- [Changelog](https://open-props-ui.netlify.app/blocks/changelog.md)
- [Checkout](https://open-props-ui.netlify.app/blocks/checkout.md)
- [Forgot password](https://open-props-ui.netlify.app/blocks/forgot-password.md)
- [Invoice](https://open-props-ui.netlify.app/blocks/invoice.md)
- [Onboarding checklist](https://open-props-ui.netlify.app/blocks/onboarding-checklist.md)
- [Order history](https://open-props-ui.netlify.app/blocks/order-history.md)
- [Project overview](https://open-props-ui.netlify.app/blocks/project-overview.md)
- [Server status](https://open-props-ui.netlify.app/blocks/server-status.md)
