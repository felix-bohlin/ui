# Progress

See also: [Spinner](https://open-props-ui.netlify.app/react/components/spinner.md).

## Indeterminate

```tsx
import { Progress } from "opui-css/react"

export default function Indeterminate() {
  return <Progress aria-label="Loading" />
}
```

## Determinate

```tsx
"use client"

import { useEffect, useState } from "react"
import { Progress } from "opui-css/react"

export default function Determinate() {
  const [value, setValue] = useState(10)

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((value) => (value >= 100 ? 10 : value + 10))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Progress
      aria-label="Uploading"
      id="progress-determinate-1"
      max="100"
      value={value}
    />
  )
}
```

## Variants

Use the `variant` prop to swap the progress bar track surface for better contrast on different backgrounds. The default, `tonal`, is a tonal track.

```tsx
import { Progress } from "opui-css/react"

export default function Surfaces() {
  return (
    <>
      <Progress
        aria-label="Storage used"
        value="25"
        max="100"
        variant="filled"
      />
      <Progress aria-label="Memory used" value="75" max="100" variant="tonal" />
    </>
  )
}
```

## Inline

The bar is an `inline-block` aligned to the middle of the line, so it sits in a line of text or a table cell. Set an `inline-size` to keep it short.

```tsx
import { Progress } from "opui-css/react"

export default function Inline() {
  return (
    <div>
      Uploading 3 of 8 files{" "}
      <Progress
        aria-label="Uploading"
        max="8"
        style={{ inlineSize: "12rem" }}
        value="3"
      />
    </div>
  )
}
```

## Accessibility

Name the bar with `aria-label`, or `aria-labelledby` pointing at visible text.

If the `<progress>` element is describing the loading progress of a section of a page:

- use `aria-describedby` to point to the status
- set `aria-busy="true"` on the section that is being updated, removing it when loading is finished.

Source: [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress#accessibility)

```tsx
import { Progress } from "opui-css/react"

export default function AriaBusy() {
  return (
    <>
      <div aria-busy="true" aria-describedby="progress-aria-busy-1">
        Content here is loading.
      </div>
      <Progress aria-label="Content loading…" id="progress-aria-busy-1" />
    </>
  )
}
```

## API

### Progress API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | - | Fallback content inside the `<progress>`. |
| `max` | `number` , `string` | - | The maximum value. |
| `value` | `number` , `string` | - | The current value. Omit it for an indeterminate state. |
| `variant` | `"filled"` , `"tonal"` | `"tonal"` | The variant to use. |

Attributes that aren't props go to the `<progress>`, like `aria-busy`, `aria-label` and `id`, and `className` and `style` go to the root `<div>`.

### CSS variables

| Variable | Default | Description |
| --- | --- | --- |
| `--ui-border-width` | `1px` | Default border width for components that draw a border. |
| `--ui-duration` | `0.2s` | Default transition duration. Multiplied by `--ui-motion`. |
| `--ui-ease-enter` | `cubic-bezier(0, 0, 0.3, 1)` | Easing for elements entering the screen: opening `Dialog`, `Drawer` and `Menu`, and the `Badge`, `Progress` and `Tooltip` transitions. |
| `--ui-field-border-color` | `color-mix( in oklch, var(--ui-text-strong) var(--ui-field-border-strength), var(--ui-surface) )` | Border color of every empty control: `TextField`, `Select`, `Textarea`, the unchecked `Checkbox`, `Radio` and `Switch` unless `--ui-choice-border-color` is set, the `Range` track and the `Progress` outline. `--ui-text-strong` mixed into `--ui-surface` at `--ui-field-border-strength`, so it reaches 3:1. Lighter than `--ui-border-color`, which is decorative, is a choice a theme can make. |
| `--ui-motion` | `1` | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/react/guide/theming.md#motion). |
| `--ui-primary` | `light-dark( oklch( from var(--ui-primary-source) min(l, var(--ui-primary-max-lightness)) c h ), oklch( from var(--ui-primary-source) max(l, var(--ui-primary-min-lightness)) min(c, var(--ui-accent-max-chroma)) h ) )` | Brand color for primary actions and accents. Derived from `--ui-primary-source` within `--ui-primary-max-lightness` and `--ui-primary-min-lightness`. Set `--ui-primary-source` to keep more contrast working, or this token to pin the color. |
| `--ui-radius` | `0.5rem` | Corner radius for every component: cards, callouts, menus, buttons and fields follow it, and small parts like `kbd`, tooltips and checkboxes never get rounder than it. Set it to `0` for square corners. Takes a single length. |
| `--ui-space-1` | `calc(0.25rem * var(--ui-space-scale))` | Spacing step 1: `0.25rem` times `--ui-space-scale`. |
| `--ui-surface-filled` | `light-dark(var(--ui-gray-4), var(--ui-gray-15))` | Background of filled areas such as progress tracks and table stripes. |
| `--ui-surface-tonal` | `light-dark(var(--ui-gray-3), var(--ui-gray-12))` | Background of tonal variants. |
| `--ui-track-bg-color` | Unset | The empty part of a track: the unchecked `Switch`, `Progress` and the `Range` track. When unset, `Progress` and tonal ranges use `--ui-surface-tonal`, the default range its field border and the switch `--ui-switch-track-bg-color`. |

The stylesheets on this page read these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/react/guide/theme-tokens.md).

## Component properties

Set these on the component itself, inline or in your own CSS. Inputs are the knobs. Outputs are derived from the inputs and the current state, so overriding one fixes it in every state. [Customizing](https://open-props-ui.netlify.app/react/guide/customizing.md#component-properties) has examples.

| Property | Kind | Description |
| --- | --- | --- |
| `--_accent` | Input | Color of the bar. Defaults to `--ui-primary`. |
| `--_bg-color` | Input | Color of the track. `--ui-track-bg-color` when the theme sets it, otherwise `--ui-surface-tonal`; `.ui-filled` sets it to `--ui-surface-filled`. |
| `--_duration` | Output | Duration of the value transition, `--ui-duration` times `--_motion`. |
| `--_ease` | Input | Easing of the value transition. Defaults to `--ui-ease-enter`. |
| `--_loop-duration` | Input | Length of one cycle of the indeterminate animation, and of the pulse that replaces it when `--_motion` is `0`. `2s` by default, multiplied by `--_motion`. |
| `--_motion` | Input | Motion multiplier for the value transition and the indeterminate animation. |

## Installation

Import the component from `opui-css/react`:

Copy the CSS into your project to own it. It reads tokens from Open Props, `palette.css` and `theme.css`, so those go on the page too, after `layers.css`. See [Getting started](https://open-props-ui.netlify.app/react/guide/getting-started.md).

- `opui-css/css/components/progress.css`

## Used in blocks

- [Analytics dashboard](https://open-props-ui.netlify.app/blocks/analytics-dashboard.md)
- [Billing](https://open-props-ui.netlify.app/blocks/billing.md)
- [File manager](https://open-props-ui.netlify.app/blocks/file-manager.md)
- [Hero](https://open-props-ui.netlify.app/blocks/hero.md)
- [Onboarding checklist](https://open-props-ui.netlify.app/blocks/onboarding-checklist.md)
- [Order history](https://open-props-ui.netlify.app/blocks/order-history.md)
- [Project overview](https://open-props-ui.netlify.app/blocks/project-overview.md)
- [Sales dashboard](https://open-props-ui.netlify.app/blocks/sales-dashboard.md)
- [Shopping cart](https://open-props-ui.netlify.app/blocks/shopping-cart.md)
- [Sign up](https://open-props-ui.netlify.app/blocks/sign-up.md)
- [Team members](https://open-props-ui.netlify.app/blocks/team-members.md)
