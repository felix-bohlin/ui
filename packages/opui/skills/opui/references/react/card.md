# Card

The card is extremely versatile and can be used on its own, or as a building block for [accordions](https://open-props-ui.netlify.app/react/components/accordion.md), [dialogs](https://open-props-ui.netlify.app/react/components/dialog.md) and more.

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

```tsx
import { Card, CardContent } from "opui-css/react"

export default function Variants() {
  return (
    <>
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
    </>
  )
}
```

### Why does a transparent variant exist?

On the page you won't see a difference. Put a card on a tonal surface or in a dialog, though, and the default plain one turns into a page-colored box. The transparent variant stays see-through.

## Header

Using `CardHeader`.

```tsx
import { Card, CardHeader } from "opui-css/react"

export default function Header() {
  return (
    <Card variant="outlined">
      <CardHeader>
        <p>Blog</p>
        <h3>My ultra-great blog post</h3>
        <p>Please read it.</p>
      </CardHeader>
    </Card>
  )
}
```

## Actions

Using `CardActions`.

There are some basic styles here to get you going, but for more advanced use-cases (which always happen), you might want to add your own styles.

```tsx
import { Button, Card, CardActions, CardContent } from "opui-css/react"

export default function Actions() {
  return (
    <>
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
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
            >
              <path
                fill="currentColor"
                d="M14 3a1 1 0 1 1 0 2H7.5A2.5 2.5 0 0 0 5 7.5v17A2.5 2.5 0 0 0 7.5 27h17a2.5 2.5 0 0 0 2.5-2.5V19a1 1 0 1 1 2 0v5.5a4.5 4.5 0 0 1-4.5 4.5h-17A4.5 4.5 0 0 1 3 24.5v-17A4.5 4.5 0 0 1 7.5 3zm5.58-.907a1 1 0 0 1 1.067.146l10 8.5a1 1 0 0 1 0 1.523l-10 8.5A1 1 0 0 1 18.999 20v-3.96c-3.193.258-5.636 1.722-7.34 3.213a15.6 15.6 0 0 0-2.115 2.26c-.234.307-.407.56-.52.733c-.085.13-.136.215-.152.243l-.006.006l.001.001A1 1 0 0 1 7 22.036c0-.222-.003-.444.003-.666c.011-.406.042-.982.12-1.67c.155-1.37.5-3.218 1.265-5.08s1.967-3.776 3.855-5.225C13.948 8.086 16.161 7.2 19 7.032V3a1 1 0 0 1 .58-.907M20.998 8a1 1 0 0 1-1 1c-2.925 0-5.018.814-6.539 1.98c-1.533 1.177-2.551 2.763-3.224 4.4a16.5 16.5 0 0 0-.957 3.38c.318-.33.672-.672 1.062-1.013C12.462 15.891 15.687 14 19.999 14a1 1 0 0 1 1 1v2.838l7.456-6.338L21 5.161z"
              ></path>
            </svg>
          </Button>
        </CardActions>
      </Card>
    </>
  )
}
```

### Alignment

Align actions to the end with `align="end"` on `CardActions`.

```tsx
import { Button, Card, CardActions, CardContent } from "opui-css/react"

export default function Alignment() {
  return (
    <>
      <Card variant="outlined">
        <CardContent>Buttons aligned to the end. Works too!</CardContent>
        <CardActions align="end">
          <Button>Cancel</Button>
          <Button>Save</Button>
        </CardActions>
      </Card>

      <Card variant="outlined">
        <CardContent>Again, buttons are aligned to the end!</CardContent>
        <CardActions align="end">
          <Button variant="outlined">Cancel</Button>
          <Button variant="filled">Save</Button>
        </CardActions>
      </Card>

      <Card variant="outlined">
        <CardContent>Icon buttons aligned to the end!</CardContent>
        <CardActions align="end">
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
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
            >
              <path
                fill="currentColor"
                d="M14 3a1 1 0 1 1 0 2H7.5A2.5 2.5 0 0 0 5 7.5v17A2.5 2.5 0 0 0 7.5 27h17a2.5 2.5 0 0 0 2.5-2.5V19a1 1 0 1 1 2 0v5.5a4.5 4.5 0 0 1-4.5 4.5h-17A4.5 4.5 0 0 1 3 24.5v-17A4.5 4.5 0 0 1 7.5 3zm5.58-.907a1 1 0 0 1 1.067.146l10 8.5a1 1 0 0 1 0 1.523l-10 8.5A1 1 0 0 1 18.999 20v-3.96c-3.193.258-5.636 1.722-7.34 3.213a15.6 15.6 0 0 0-2.115 2.26c-.234.307-.407.56-.52.733c-.085.13-.136.215-.152.243l-.006.006l.001.001A1 1 0 0 1 7 22.036c0-.222-.003-.444.003-.666c.011-.406.042-.982.12-1.67c.155-1.37.5-3.218 1.265-5.08s1.967-3.776 3.855-5.225C13.948 8.086 16.161 7.2 19 7.032V3a1 1 0 0 1 .58-.907M20.998 8a1 1 0 0 1-1 1c-2.925 0-5.018.814-6.539 1.98c-1.533 1.177-2.551 2.763-3.224 4.4a16.5 16.5 0 0 0-.957 3.38c.318-.33.672-.672 1.062-1.013C12.462 15.891 15.687 14 19.999 14a1 1 0 0 1 1 1v2.838l7.456-6.338L21 5.161z"
              ></path>
            </svg>
          </Button>
        </CardActions>
      </Card>
    </>
  )
}
```

## Clickable card

Add `.ui-card-link` to a link in the card, usually the one in the heading, and the whole card becomes clickable. The link stretches over the card, so Ctrl/Cmd+click and "Open in new tab" work from anywhere, and screen readers only hear the link text. Other links and buttons in the card stay clickable.

```tsx
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
} from "opui-css/react"

export default function Clickable() {
  return (
    <>
      <Card variant="outlined">
        <CardHeader>
          <h3>
            <a className="ui-card-link" href="#clickable">
              Pricing
            </a>
          </h3>
        </CardHeader>
        <CardContent>
          Plans for any team. Click anywhere on the card.
        </CardContent>
      </Card>

      <Card variant="outlined">
        <CardHeader>
          <h3>
            <a className="ui-card-link" href="#clickable">
              Changelog
            </a>
          </h3>
        </CardHeader>
        <CardContent>Every release in one place.</CardContent>
        <CardActions>
          <Button>Subscribe</Button>
        </CardActions>
      </Card>
    </>
  )
}
```

Only one `.ui-card-link` per card. The link covers the text, so selecting text in the card won't work. Fair trade.

## API

### Card API

| Prop       | Type                                                                  | Default   | Description                                                                            |
| ---------- | --------------------------------------------------------------------- | --------- | -------------------------------------------------------------------------------------- |
| `children` | `ReactNode`                                                           | -         | The card parts, and any other content.                                                 |
| `variant`  | `"elevated"` , `"outlined"` , `"plain"` , `"tonal"` , `"transparent"` | `"plain"` | The variant to use. The default `plain` card has the page surface color and no border. |

#### CSS variables

| Variable                    | Default                                                                           | Description                                                                                                                                                                                                                                 |
| --------------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--ui-border-color`         | `light-dark(var(--ui-gray-4), var(--ui-gray-12))`                                 | Default border color for cards, lists, tables and dividers.                                                                                                                                                                                 |
| `--ui-border-width`         | `1px`                                                                             | Default border width for components that draw a border.                                                                                                                                                                                     |
| `--ui-duration`             | `0.2s`                                                                            | Default transition duration. Multiplied by `--ui-motion`.                                                                                                                                                                                   |
| `--ui-ease`                 | `ease`                                                                            | Default easing for transitions.                                                                                                                                                                                                             |
| `--ui-focus-ring-color`     | `rgb( from var(--ui-surface-default) calc(255 - r) calc(255 - g) calc(255 - b) )` | Color of the keyboard focus ring. By default the page background color inverted.                                                                                                                                                            |
| `--ui-focus-ring-offset`    | `2px`                                                                             | Distance between a control and its focus ring.                                                                                                                                                                                              |
| `--ui-focus-ring-style`     | `solid`                                                                           | Outline style of the focus ring.                                                                                                                                                                                                            |
| `--ui-focus-ring-width`     | `2px`                                                                             | Width of the focus ring.                                                                                                                                                                                                                    |
| `--ui-font-size-body`       | `var(--ui-font-size-300)`                                                         | Font size of body copy, `Card` text and the `Callout` title. Defaults to `--ui-font-size-300`.                                                                                                                                              |
| `--ui-font-size-caption`    | `var(--ui-font-size-100)`                                                         | Font size of captions, `Badge`, `Chip`, `Divider` labels, `List` secondary text, `Menu` shortcuts, overlines, `small`, `figcaption` and x-small buttons, toggles and fields. Defaults to `--ui-font-size-100`.                              |
| `--ui-line-height-tight`    | `1.25`                                                                            | Line height of single-line controls and compact text: field inputs, `Table` cells, `Tooltip`, `Card` captions and keyboard hints in buttons.                                                                                                |
| `--ui-motion`               | `1`                                                                               | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/react/guide/theming.md#motion).                                   |
| `--ui-radius`               | `var(--size-2)`                                                                   | Corner radius for every component: cards, callouts, menus, buttons and fields follow it, and small parts like `kbd`, tooltips and checkboxes never get rounder than it. Set it to `0` for square corners. Takes a single length.            |
| `--ui-shadow-elevated`      | `var(--ui-shadow-elevated-light)` `var(--ui-shadow-elevated-dark)` in dark mode   | Shadow of elevated `Card` and `Accordion`. Switches between `--ui-shadow-elevated-light` and `--ui-shadow-elevated-dark` with the color scheme, also in `.ui-light` and `.ui-dark` parts of the page. Set those two instead of this one.    |
| `--ui-shadow-surface`       | `none`                                                                            | Shadow of tonal and outlined `Card` and `Accordion`, and of `Callout`. `none` by default, for themes that put every surface on the same plane.                                                                                              |
| `--ui-space-1`              | `calc(var(--size-1) * var(--ui-space-scale))`                                     | Spacing step 1: Open Props `--size-1` times `--ui-space-scale`.                                                                                                                                                                             |
| `--ui-space-2`              | `calc(var(--size-2) * var(--ui-space-scale))`                                     | Spacing step 2: Open Props `--size-2` times `--ui-space-scale`.                                                                                                                                                                             |
| `--ui-space-3`              | `calc(var(--size-3) * var(--ui-space-scale))`                                     | Spacing step 3: Open Props `--size-3` times `--ui-space-scale`.                                                                                                                                                                             |
| `--ui-space-4`              | `calc(var(--size-4) * var(--ui-space-scale))`                                     | Spacing step 4: Open Props `--size-4` times `--ui-space-scale`.                                                                                                                                                                             |
| `--ui-surface-border-color` | Unset                                                                             | Border color of tonal and elevated `Card` and `Accordion` and of `Callout` without a severity. When unset, cards and accordions use the page background color, so they stay visible on tonal surfaces, and callouts their tonal background. |
| `--ui-surface-default`      | `light-dark(var(--ui-gray-1), var(--ui-gray-13))`                                 | Page and card background.                                                                                                                                                                                                                   |
| `--ui-surface-elevated`     | `light-dark(var(--ui-gray-1), var(--ui-gray-12))`                                 | Background of elevated cards and accordions, dialogs, drawers, menus and native `Select` options.                                                                                                                                           |
| `--ui-surface-tonal`        | `light-dark(var(--ui-gray-3), var(--ui-gray-12))`                                 | Background of tonal variants.                                                                                                                                                                                                               |
| `--ui-text-muted`           | `light-dark(var(--ui-gray-13), var(--ui-gray-4))`                                 | Body text color.                                                                                                                                                                                                                            |

This component uses these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/react/guide/theme-tokens.md).

To make the whole card clickable, add `.ui-card-link` to one link in it. Other links and buttons stay clickable.

### Card actions API

| Prop       | Type                | Default   | Description                   |
| ---------- | ------------------- | --------- | ----------------------------- |
| `align`    | `"end"` , `"start"` | `"start"` | Alignment for the actions.    |
| `children` | `ReactNode`         | -         | The actions, such as buttons. |

#### CSS variables

| Variable                    | Default                                                                           | Description                                                                                                                                                                                                                                 |
| --------------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--ui-border-color`         | `light-dark(var(--ui-gray-4), var(--ui-gray-12))`                                 | Default border color for cards, lists, tables and dividers.                                                                                                                                                                                 |
| `--ui-border-width`         | `1px`                                                                             | Default border width for components that draw a border.                                                                                                                                                                                     |
| `--ui-duration`             | `0.2s`                                                                            | Default transition duration. Multiplied by `--ui-motion`.                                                                                                                                                                                   |
| `--ui-ease`                 | `ease`                                                                            | Default easing for transitions.                                                                                                                                                                                                             |
| `--ui-focus-ring-color`     | `rgb( from var(--ui-surface-default) calc(255 - r) calc(255 - g) calc(255 - b) )` | Color of the keyboard focus ring. By default the page background color inverted.                                                                                                                                                            |
| `--ui-focus-ring-offset`    | `2px`                                                                             | Distance between a control and its focus ring.                                                                                                                                                                                              |
| `--ui-focus-ring-style`     | `solid`                                                                           | Outline style of the focus ring.                                                                                                                                                                                                            |
| `--ui-focus-ring-width`     | `2px`                                                                             | Width of the focus ring.                                                                                                                                                                                                                    |
| `--ui-font-size-body`       | `var(--ui-font-size-300)`                                                         | Font size of body copy, `Card` text and the `Callout` title. Defaults to `--ui-font-size-300`.                                                                                                                                              |
| `--ui-font-size-caption`    | `var(--ui-font-size-100)`                                                         | Font size of captions, `Badge`, `Chip`, `Divider` labels, `List` secondary text, `Menu` shortcuts, overlines, `small`, `figcaption` and x-small buttons, toggles and fields. Defaults to `--ui-font-size-100`.                              |
| `--ui-line-height-tight`    | `1.25`                                                                            | Line height of single-line controls and compact text: field inputs, `Table` cells, `Tooltip`, `Card` captions and keyboard hints in buttons.                                                                                                |
| `--ui-motion`               | `1`                                                                               | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/react/guide/theming.md#motion).                                   |
| `--ui-radius`               | `var(--size-2)`                                                                   | Corner radius for every component: cards, callouts, menus, buttons and fields follow it, and small parts like `kbd`, tooltips and checkboxes never get rounder than it. Set it to `0` for square corners. Takes a single length.            |
| `--ui-shadow-elevated`      | `var(--ui-shadow-elevated-light)` `var(--ui-shadow-elevated-dark)` in dark mode   | Shadow of elevated `Card` and `Accordion`. Switches between `--ui-shadow-elevated-light` and `--ui-shadow-elevated-dark` with the color scheme, also in `.ui-light` and `.ui-dark` parts of the page. Set those two instead of this one.    |
| `--ui-shadow-surface`       | `none`                                                                            | Shadow of tonal and outlined `Card` and `Accordion`, and of `Callout`. `none` by default, for themes that put every surface on the same plane.                                                                                              |
| `--ui-space-1`              | `calc(var(--size-1) * var(--ui-space-scale))`                                     | Spacing step 1: Open Props `--size-1` times `--ui-space-scale`.                                                                                                                                                                             |
| `--ui-space-2`              | `calc(var(--size-2) * var(--ui-space-scale))`                                     | Spacing step 2: Open Props `--size-2` times `--ui-space-scale`.                                                                                                                                                                             |
| `--ui-space-3`              | `calc(var(--size-3) * var(--ui-space-scale))`                                     | Spacing step 3: Open Props `--size-3` times `--ui-space-scale`.                                                                                                                                                                             |
| `--ui-space-4`              | `calc(var(--size-4) * var(--ui-space-scale))`                                     | Spacing step 4: Open Props `--size-4` times `--ui-space-scale`.                                                                                                                                                                             |
| `--ui-surface-border-color` | Unset                                                                             | Border color of tonal and elevated `Card` and `Accordion` and of `Callout` without a severity. When unset, cards and accordions use the page background color, so they stay visible on tonal surfaces, and callouts their tonal background. |
| `--ui-surface-default`      | `light-dark(var(--ui-gray-1), var(--ui-gray-13))`                                 | Page and card background.                                                                                                                                                                                                                   |
| `--ui-surface-elevated`     | `light-dark(var(--ui-gray-1), var(--ui-gray-12))`                                 | Background of elevated cards and accordions, dialogs, drawers, menus and native `Select` options.                                                                                                                                           |
| `--ui-surface-tonal`        | `light-dark(var(--ui-gray-3), var(--ui-gray-12))`                                 | Background of tonal variants.                                                                                                                                                                                                               |
| `--ui-text-muted`           | `light-dark(var(--ui-gray-13), var(--ui-gray-4))`                                 | Body text color.                                                                                                                                                                                                                            |

This component uses these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/react/guide/theme-tokens.md).

## Component properties

Set these on the component itself, inline or in your own CSS. Inputs are the knobs. Outputs are derived from the inputs and the current state, so overriding one fixes it in every state. [Customizing](https://open-props-ui.netlify.app/react/guide/customizing.md#component-properties) has examples.

| Property                   | Kind   | Description                                                                                                                                                                             |
| -------------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--_bg-color`              | Output | The current background. Set by the variants.                                                                                                                                            |
| `--_border-color`          | Output | The current border color. Set by the variants (`--ui-surface-border-color` in `.ui-tonal` and `.ui-elevated` when a theme sets it) and by hovering `.ui-card-link`.                     |
| `--_border-width`          | Output | The current border width. Set by the variants.                                                                                                                                          |
| `--_duration`              | Output | Duration of the focus ring animation, `--ui-duration` times `--_motion`.                                                                                                                |
| `--_ease`                  | Input  | Easing of the focus ring animation. Defaults to `--ui-ease`.                                                                                                                            |
| `--_elevated-bg-color`     | Input  | Background of `.ui-elevated`. Defaults to `--ui-surface-elevated`.                                                                                                                      |
| `--_elevated-shadow`       | Input  | Shadow of `.ui-elevated`. Defaults to `--ui-shadow-elevated`.                                                                                                                           |
| `--_motion`                | Input  | Motion multiplier for the focus ring animation. `0` turns it off.                                                                                                                       |
| `--_outlined-border-color` | Input  | Border color of `.ui-outlined`. Defaults to `--ui-border-color`.                                                                                                                        |
| `--_shadow`                | Output | The current shadow. `.ui-elevated` sets `--_elevated-shadow`, `.ui-tonal` and `.ui-outlined` set `--ui-shadow-surface`.                                                                 |
| `--_surface-bg-color`      | Input  | Background of default and `.ui-outlined` cards, and border color of `.ui-tonal` and `.ui-elevated` unless a theme sets `--ui-surface-border-color`. Defaults to `--ui-surface-default`. |
| `--_tonal-bg-color`        | Input  | Background of `.ui-tonal`. Defaults to `--ui-surface-tonal`.                                                                                                                            |

## Under the hood

1. Base

   - A flex column: header, content and actions share one `gap`
   - Padding sits on the children, so media can go edge to edge
   - Without actions, the last child pads the bottom itself
   - `overflow: hidden` clips children to the rounded corners

2. Variants

   - Variants only swap custom properties, the rules stay the same
   - `--ui-shadow-elevated` is a theme token that switches to a heavier shadow in dark mode
   - Shadows barely show on dark surfaces, switch the site to dark mode to compare

3. Actions

   - `margin-block-start: auto` pins the actions to the bottom of a stretched card
   - `:not(.ui-filled, .ui-outlined, .ui-tonal)` only matches a text button, with no variant class
   - A text button has no background, so the row shifts to line its label up with the text

Step 1 of 3: Base

- [Flexbox gap ](https://webstatus.dev/features/flexbox-gap)(Widely available): Chrome 84+, Edge 84+, Firefox 63+, Safari 14.1+
- [\<hgroup> ](https://webstatus.dev/features/hgroup)(Widely available): Chrome 5+, Edge 12+, Firefox 4+, Safari 5+

```html
<div class="card">
  <hgroup>
    <p>Overline</p>
    <h3>Headline</h3>
  </hgroup>
  <div class="content">…</div>
  <div class="actions">…</div>
</div>
```

```css
.card {
  --card-bg: var(--ui-surface-default);
  --card-border: transparent;
  --card-border-width: 0;
  --card-shadow: none;
  background-color: var(--card-bg);
  border: var(--card-border-width) solid var(--card-border);
  border-radius: var(--ui-radius);
  box-shadow: var(--card-shadow);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  min-inline-size: 0;
  overflow: hidden;
  overflow-wrap: break-word;
}

.card > :is(hgroup, .content) {
  margin-block: 0;
  padding-inline: 0.75rem;
}

.card > :is(hgroup, .content):last-child {
  padding-block-end: 0.75rem;
}

.card > hgroup {
  padding-block-start: 0.75rem;
}

.card > hgroup > * {
  margin-block: 0;
}
```

Step 2 of 3: Variants

- [Custom properties ](https://webstatus.dev/features/custom-properties)(Widely available): Chrome 49+, Edge 15+, Firefox 31+, Safari 9.1+

```css
.tonal {
  --card-bg: var(--ui-surface-tonal);
  --card-border: var(--ui-surface-default);
  --card-border-width: 1px;
}

.elevated {
  --card-bg: var(--ui-surface-elevated);
  --card-border: var(--ui-surface-default);
  --card-border-width: 1px;
  --card-shadow: var(--ui-shadow-elevated);
}
```

Step 3 of 3: Actions

- [`:has()` ](https://webstatus.dev/features/has)(Widely available): Chrome 105+, Edge 105+, Firefox 121+, Safari 15.4+

```css
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-block-start: auto;
  padding: 0.5rem 0.75rem;
}

.actions:has(> .ui-button:first-child:not(.ui-filled, .ui-outlined, .ui-tonal)) {
  padding-inline: 0.25rem 0.75rem;
}
```

## Browser support

- Chromium: Full support Supported since v111.
- Firefox: Full support Supported since v151.
- Safari: Full support Supported since v18.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/react/guide/browser-support/?components=Card.md).

## Installation

Import the components from `opui-css/react`:

### Used by

- [Accordion](https://open-props-ui.netlify.app/react/components/accordion.md)
- [Dialog](https://open-props-ui.netlify.app/react/components/dialog.md)

Copy the CSS into your project to own it. It reads tokens from Open Props, `palette.css` and `theme.css`, so those go on the page too, after `layers.css`. See [Getting started](https://open-props-ui.netlify.app/react/guide/getting-started.md).

- `opui-css/css/components/card.css`

## Changelog

### What's new

- Add `.ui-card-link` to a link to make the [whole card clickable](#clickable).
- [Tonal and elevated](#variants) cards have a border in the page background color, so they stay visible on tonal surfaces.
- [Actions](#actions) stick to the bottom of stretched cards and wrap when they don't fit.
- Breaking: `--_card-bg-color`, `--_card-border-color`, `--_card-border-width` and `--_card-shadow` drop the `card-` prefix, the outlined `--_border-color` is `--_outlined-border-color`, and `--_bg-surface`, `--_bg-tonal` and `--_bg-elevated` are `--_surface-bg-color`, `--_tonal-bg-color` and `--_elevated-bg-color`, and `--_shadow-elevated` is `--_elevated-shadow` ([Under the hood](#under-the-hood)).
- `--_duration` and `--_ease` set the focus ring animation's duration and easing ([Under the hood](#under-the-hood)).
- Elevated cards use [`--ui-shadow-elevated`](#api), and padding and gaps read the `--ui-space-*` scale.
- Breaking: `--_shadow-light` and `--_shadow-dark` are gone. Set [`--ui-shadow-elevated-light` and `--ui-shadow-elevated-dark`](#api) in your theme, or [`--_elevated-shadow`](#component-properties) on the card.
- [Tonal and outlined](#variants) cards read [`--ui-shadow-surface`](#api), and tonal and elevated cards `--ui-surface-border-color`, when a theme sets them.
- Borders inside [tonal and elevated](#variants) cards read `--ui-border-color-on-raised` and `--ui-field-border-color-on-raised`, so a theme's borders reach inside.
- [Variants](#variants) name the default: `variant="plain"`.
