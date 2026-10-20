# Badge

## Anatomy

5

- `<Badge>`

  Container element. Also takes `.ui-anchor`.

- `slot="default"`

  The element the badge is anchored to.

- `label / slot="indicator"`

  The indicator, inside `.ui-anchor-floating`.

## Dot

Use `dot` to show a dot instead of the label.

```astro
---
import { Badge } from "opui-css/astro"
---

<Badge label="5" srLabel="unread messages">
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    ><path
      fill="currentColor"
      d="M2.004 9.303A4.5 4.5 0 0 1 6.5 5h19a4.5 4.5 0 0 1 4.496 4.303l-1.476.82L16 16.864L3.48 10.123zM2 11.588V22.5A4.5 4.5 0 0 0 6.5 27h19a4.5 4.5 0 0 0 4.5-4.5V11.588l-.526.293l-13 7a1 1 0 0 1-.948 0L2.514 11.874z"
    ></path></svg
  >
</Badge>

<Badge dot srLabel="New messages">
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    ><path
      fill="currentColor"
      d="M2.004 9.303A4.5 4.5 0 0 1 6.5 5h19a4.5 4.5 0 0 1 4.496 4.303l-1.476.82L16 16.864L3.48 10.123zM2 11.588V22.5A4.5 4.5 0 0 0 6.5 27h19a4.5 4.5 0 0 0 4.5-4.5V11.588l-.526.293l-13 7a1 1 0 0 1-.948 0L2.514 11.874z"
    ></path></svg
  >
</Badge>
```

## Colors

Color the indicator with `color="critical"`, `color="info"`, `color="neutral"`, `color="success"` or `color="warning"`.

```astro
---
import { Badge } from "opui-css/astro"
---

<Badge color="critical" label="5" srLabel="unread messages">
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    ><path
      fill="currentColor"
      d="M2.004 9.303A4.5 4.5 0 0 1 6.5 5h19a4.5 4.5 0 0 1 4.496 4.303l-1.476.82L16 16.864L3.48 10.123zM2 11.588V22.5A4.5 4.5 0 0 0 6.5 27h19a4.5 4.5 0 0 0 4.5-4.5V11.588l-.526.293l-13 7a1 1 0 0 1-.948 0L2.514 11.874z"
    ></path></svg
  >
</Badge>
<Badge color="info" label="5" srLabel="unread messages">
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    ><path
      fill="currentColor"
      d="M2.004 9.303A4.5 4.5 0 0 1 6.5 5h19a4.5 4.5 0 0 1 4.496 4.303l-1.476.82L16 16.864L3.48 10.123zM2 11.588V22.5A4.5 4.5 0 0 0 6.5 27h19a4.5 4.5 0 0 0 4.5-4.5V11.588l-.526.293l-13 7a1 1 0 0 1-.948 0L2.514 11.874z"
    ></path></svg
  >
</Badge>
<Badge color="neutral" label="5" srLabel="unread messages">
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    ><path
      fill="currentColor"
      d="M2.004 9.303A4.5 4.5 0 0 1 6.5 5h19a4.5 4.5 0 0 1 4.496 4.303l-1.476.82L16 16.864L3.48 10.123zM2 11.588V22.5A4.5 4.5 0 0 0 6.5 27h19a4.5 4.5 0 0 0 4.5-4.5V11.588l-.526.293l-13 7a1 1 0 0 1-.948 0L2.514 11.874z"
    ></path></svg
  >
</Badge>
<Badge color="success" label="5" srLabel="unread messages">
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    ><path
      fill="currentColor"
      d="M2.004 9.303A4.5 4.5 0 0 1 6.5 5h19a4.5 4.5 0 0 1 4.496 4.303l-1.476.82L16 16.864L3.48 10.123zM2 11.588V22.5A4.5 4.5 0 0 0 6.5 27h19a4.5 4.5 0 0 0 4.5-4.5V11.588l-.526.293l-13 7a1 1 0 0 1-.948 0L2.514 11.874z"
    ></path></svg
  >
</Badge>
<Badge color="warning" label="5" srLabel="unread messages">
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    ><path
      fill="currentColor"
      d="M2.004 9.303A4.5 4.5 0 0 1 6.5 5h19a4.5 4.5 0 0 1 4.496 4.303l-1.476.82L16 16.864L3.48 10.123zM2 11.588V22.5A4.5 4.5 0 0 0 6.5 27h19a4.5 4.5 0 0 0 4.5-4.5V11.588l-.526.293l-13 7a1 1 0 0 1-.948 0L2.514 11.874z"
    ></path></svg
  >
</Badge>
```

## Indicator

Set indicator text with the `label` prop or the `indicator` slot. The default slot holds the anchored element.

```astro
---
import { Badge } from "opui-css/astro"
---

<Badge label="5" srLabel="unread messages">
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    ><path
      fill="currentColor"
      d="M2.004 9.303A4.5 4.5 0 0 1 6.5 5h19a4.5 4.5 0 0 1 4.496 4.303l-1.476.82L16 16.864L3.48 10.123zM2 11.588V22.5A4.5 4.5 0 0 0 6.5 27h19a4.5 4.5 0 0 0 4.5-4.5V11.588l-.526.293l-13 7a1 1 0 0 1-.948 0L2.514 11.874z"
    ></path></svg
  >
</Badge>

<Badge srLabel="unread messages">
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    ><path
      fill="currentColor"
      d="M2.004 9.303A4.5 4.5 0 0 1 6.5 5h19a4.5 4.5 0 0 1 4.496 4.303l-1.476.82L16 16.864L3.48 10.123zM2 11.588V22.5A4.5 4.5 0 0 0 6.5 27h19a4.5 4.5 0 0 0 4.5-4.5V11.588l-.526.293l-13 7a1 1 0 0 1-.948 0L2.514 11.874z"
    ></path></svg
  >
  <Fragment slot="indicator">99+</Fragment>
</Badge>
```

## Visibility

Change the badge's visibility using the `invisible` prop.

```astro
---
import { Badge } from "opui-css/astro"
---

<Badge invisible label="5" srLabel="unread messages">
  <!-- -->
</Badge>
```

## Alignment

Where the badge should be placed over the child.

`start-start`, default (`start-end`), `end-start`, `end-end`.

```astro
---
import { Badge } from "opui-css/astro"
---

<Badge alignment="start-start" label="35" srLabel="unread messages">
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    ><path
      fill="currentColor"
      d="M2.004 9.303A4.5 4.5 0 0 1 6.5 5h19a4.5 4.5 0 0 1 4.496 4.303l-1.476.82L16 16.864L3.48 10.123zM2 11.588V22.5A4.5 4.5 0 0 0 6.5 27h19a4.5 4.5 0 0 0 4.5-4.5V11.588l-.526.293l-13 7a1 1 0 0 1-.948 0L2.514 11.874z"
    ></path></svg
  >
</Badge>
<Badge label="99+" srLabel="unread messages">
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    ><path
      fill="currentColor"
      d="M2.004 9.303A4.5 4.5 0 0 1 6.5 5h19a4.5 4.5 0 0 1 4.496 4.303l-1.476.82L16 16.864L3.48 10.123zM2 11.588V22.5A4.5 4.5 0 0 0 6.5 27h19a4.5 4.5 0 0 0 4.5-4.5V11.588l-.526.293l-13 7a1 1 0 0 1-.948 0L2.514 11.874z"
    ></path></svg
  >
</Badge>
<Badge alignment="end-start" label="OK!" srLabel="inbox synced">
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    ><path
      fill="currentColor"
      d="M2.004 9.303A4.5 4.5 0 0 1 6.5 5h19a4.5 4.5 0 0 1 4.496 4.303l-1.476.82L16 16.864L3.48 10.123zM2 11.588V22.5A4.5 4.5 0 0 0 6.5 27h19a4.5 4.5 0 0 0 4.5-4.5V11.588l-.526.293l-13 7a1 1 0 0 1-.948 0L2.514 11.874z"
    ></path></svg
  >
</Badge>
<Badge alignment="end-end" label="3K" srLabel="unread messages">
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    ><path
      fill="currentColor"
      d="M2.004 9.303A4.5 4.5 0 0 1 6.5 5h19a4.5 4.5 0 0 1 4.496 4.303l-1.476.82L16 16.864L3.48 10.123zM2 11.588V22.5A4.5 4.5 0 0 0 6.5 27h19a4.5 4.5 0 0 0 4.5-4.5V11.588l-.526.293l-13 7a1 1 0 0 1-.948 0L2.514 11.874z"
    ></path></svg
  >
</Badge>
```

## Accessibility

- A count on its own is read without context, such as "5". Add visually hidden text inside the indicator, so it's read as "5 unread messages": the `srLabel` prop.

## API

### Badge API

| Prop        | Type                                                              | Default       | Description                                                                                |
| ----------- | ----------------------------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------ |
| `alignment` | `"end-end"` , `"end-start"` , `"start-end"` , `"start-start"`     | `"start-end"` | Where the indicator is placed.                                                             |
| `color`     | `"critical"` , `"info"` , `"neutral"` , `"success"` , `"warning"` | -             | Optional colors.                                                                           |
| `dot`       | `boolean`                                                         | `false`       | Renders the indicator as a dot, without a label.                                           |
| `invisible` | `boolean`                                                         | `false`       | Hides the indicator.                                                                       |
| `label`     | `number` , `string`                                               | -             | The indicator, inside `.ui-anchor-floating`.                                               |
| `srLabel`   | `string`                                                          | -             | Visually hidden text that describes the badge to assistive technology, such as "3 unread". |

#### Slots

| Slot        | Description                                  |
| ----------- | -------------------------------------------- |
| `default`   | The element the badge is anchored to.        |
| `indicator` | The indicator, inside `.ui-anchor-floating`. |

#### CSS variables

| Variable                    | Default                                                                                  | Description                                                                                                                                                                                                                                |
| --------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `--ui-critical`             | `var(--ui-red)`                                                                          | Severity color for errors and destructive actions.                                                                                                                                                                                         |
| `--ui-duration`             | `0.2s`                                                                                   | Default transition duration. Multiplied by `--ui-motion`.                                                                                                                                                                                  |
| `--ui-ease-enter`           | `var(--ease-out-3)`                                                                      | Easing for elements entering the screen.                                                                                                                                                                                                   |
| `--ui-font-size-caption`    | `var(--ui-font-size-100)`                                                                | Font size of captions, `Badge`, `Chip`, `Divider` labels, `List` secondary text, `Menu` shortcuts, overlines, `small`, `figcaption` and x-small buttons, toggles and fields. Defaults to `--ui-font-size-100`.                             |
| `--ui-font-weight-medium`   | `var(--font-weight-5)`                                                                   | Font weight for badges, overlines and group labels.                                                                                                                                                                                        |
| `--ui-info`                 | `var(--ui-blue)`                                                                         | Severity color for informational messages.                                                                                                                                                                                                 |
| `--ui-motion`               | `1`                                                                                      | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/astro/guide/theming.md#motion).                                  |
| `--ui-neutral`              | `var(--ui-gray-9)`                                                                       | Severity color for neutral messages.                                                                                                                                                                                                       |
| `--ui-palette-ink`          | `light-dark(var(--ui-color-16), var(--ui-color-1))`                                      | The darkest shade of the current palette in light mode and the lightest in dark mode: `Callout` text, the default `Button` fill when `--ui-button-accent` is unset, the text of a warning `Badge`. Re-derived inside every severity scope. |
| `--ui-palette-ink-contrast` | `light-dark( var(--ui-color-1), var(--ui-color-16) )`                                    | Text color on `--ui-palette-ink`.                                                                                                                                                                                                          |
| `--ui-primary`              | `light-dark(var(--ui-color-9), var(--ui-color-6))`                                       | Brand color for primary actions and accents.                                                                                                                                                                                               |
| `--ui-primary-contrast`     | `oklch( from var(--ui-primary) clamp(0.15, (0.565 - l) * 1000, 0.98) calc(c * 0.15) h )` | Text color on `--ui-primary`. Derived with relative color: near-black when the primary's lightness is above 0.565, near-white below, tinted with 15% of its chroma, so a custom `--ui-primary` gets readable text.                         |
| `--ui-radius-round`         | `var(--radius-round)`                                                                    | The pill radius for round buttons, avatars, badges, chips, radios, switches, the range track and the carousel buttons and markers.                                                                                                         |
| `--ui-space-1`              | `calc(var(--size-1) * var(--ui-space-scale))`                                            | Spacing step 1: Open Props `--size-1` times `--ui-space-scale`.                                                                                                                                                                            |
| `--ui-space-2`              | `calc(var(--size-2) * var(--ui-space-scale))`                                            | Spacing step 2: Open Props `--size-2` times `--ui-space-scale`.                                                                                                                                                                            |
| `--ui-space-4`              | `calc(var(--size-4) * var(--ui-space-scale))`                                            | Spacing step 4: Open Props `--size-4` times `--ui-space-scale`.                                                                                                                                                                            |
| `--ui-success`              | `var(--ui-green)`                                                                        | Severity color for success messages.                                                                                                                                                                                                       |
| `--ui-text-on-accent`       | `var(--ui-gray-1)`                                                                       | Near-white text on a saturated fill in both modes: critical buttons, severity `Badge`s and the checked choice mark in dark mode.                                                                                                           |
| `--ui-warning`              | `var(--ui-orange)`                                                                       | Severity color for warnings.                                                                                                                                                                                                               |

This component uses these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/astro/guide/theme-tokens.md).

## Component properties

Set these on the component itself, inline or in your own CSS. Inputs are the knobs. Outputs are derived from the inputs and the current state, so overriding one fixes it in every state. [Customizing](https://open-props-ui.netlify.app/astro/guide/customizing.md#component-properties) has examples.

| Property          | Kind   | Description                                                                                                               |
| ----------------- | ------ | ------------------------------------------------------------------------------------------------------------------------- |
| `--_accent`       | Input  | The color the indicator background is derived from. Set by `.ui-critical`, `.ui-info` and `.ui-success`.                  |
| `--_anchor-tx`    | Output | Horizontal shift of the indicator, from `--_sign-x`. `.ui-dot` and round avatars change it.                               |
| `--_anchor-ty`    | Output | Vertical shift of the indicator, from `--_sign-y`. `.ui-dot` and round avatars change it.                                 |
| `--_bg-color`     | Output | Background of the indicator. Defaults to `--ui-primary`, set by the color classes.                                        |
| `--_border-color` | Output | Border color of the indicator. Set by the color classes.                                                                  |
| `--_border-width` | Input  | Border width of the indicator.                                                                                            |
| `--_dir`          | Output | Direction flag that flips `--_anchor-tx`. `1`, or `-1` in right-to-left.                                                  |
| `--_dot-size`     | Input  | Width and height of the indicator in `.ui-dot`.                                                                           |
| `--_duration`     | Output | Duration of the indicator fade, `--ui-duration` times `--_motion`.                                                        |
| `--_ease`         | Input  | Easing of the indicator fade. Defaults to `--ui-ease-enter`.                                                              |
| `--_inset`        | Input  | Distance of the indicator from the opposite edges. `100%` places it on the corner, round avatars move it onto the circle. |
| `--_inset-block`  | Output | Block inset of the indicator, from `--_inset` and the alignment classes.                                                  |
| `--_inset-inline` | Output | Inline inset of the indicator, from `--_inset` and the alignment classes.                                                 |
| `--_motion`       | Input  | Motion multiplier for the transitions. `0` turns them off.                                                                |
| `--_sign-x`       | Output | Horizontal side of the indicator, `-1` or `1`. Set by the alignment classes.                                              |
| `--_sign-y`       | Output | Vertical side of the indicator, `1` or `-1`. Set by the alignment classes.                                                |
| `--_size`         | Input  | Height and minimum width of the indicator.                                                                                |
| `--_text-color`   | Output | Text color of the indicator. Defaults to `--ui-primary-contrast`, set by the color classes.                               |

## Under the hood

1. Indicator

   - `min-inline-size` equals `block-size`: a circle for one digit, a pill for more
   - `max-content` keeps `99+` on one line
   - A bare count is read as "5", hidden text makes it "5 unread messages"

2. Corner

   - Insets of `100%` park the indicator just outside the top end corner
   - `translate` pulls its center back onto the corner
   - Built on Anchor, but plain insets: works without `position-area`

3. Direction

   - Logical insets flip in right-to-left, `translate` doesn't
   - `:dir(rtl)` sets `--dir: -1` and the offset follows
   - Offsets follow `--sign-x` and `--sign-y`, so alignments only flip the signs

4. Dot

   - Same indicator, emptied and shrunk
   - New `--tx` and `--ty` tuck it inside the corner, no new positioning rules
   - Same signs, so it tucks in whichever corner it's aligned to

Step 1 of 4: Indicator

```html
<span class="badge">
  <svg>…</svg>
  <span class="indicator">
    5 <span class="ui-sr-only">unread messages</span>
  </span>
</span>
```

```css
.indicator {
  background-color: var(--ui-primary);
  block-size: var(--size);
  border-radius: var(--radius-round);
  color: var(--ui-primary-contrast);
  display: grid;
  font-size: var(--font-size-0);
  font-weight: var(--ui-font-weight-medium);
  inline-size: max-content;
  min-inline-size: var(--size);
  padding-inline: 0.25rem;
  place-items: center;
}
```

Step 2 of 4: Corner

- [Individual transform properties ](https://webstatus.dev/features/individual-transforms)(Widely available): Chrome 104+, Edge 104+, Firefox 72+, Safari 14.1+
- [Logical properties ](https://webstatus.dev/features/logical-properties)(Widely available): Chrome 89+, Edge 89+, Firefox 66+, Safari 15+

```css
.badge {
  display: inline-flex;
  position: relative;
  vertical-align: middle;
}

.indicator {
  inset-block: auto 100%;
  inset-inline: 100% auto;
  position: absolute;
  translate: -50% 50%;
}
```

Step 3 of 4: Direction

- [`:dir()` ](https://webstatus.dev/features/dir-pseudo)(Widely available): Chrome 120+, Edge 120+, Firefox 49+, Safari 16.4+

```css
.badge {
  --dir: 1;
  --sign-x: -1;
  --sign-y: 1;
  --tx: calc(50% * var(--sign-x));
  --ty: calc(50% * var(--sign-y));
}

.badge:dir(rtl) {
  --dir: -1;
}

.indicator {
  translate: calc(var(--tx) * var(--dir)) var(--ty);
}
```

Step 4 of 4: Dot

```css
.badge.dot {
  --dot: 0.5rem;
  --tx: calc((var(--dot) - 2px) * var(--sign-x));
  --ty: calc(var(--dot) * var(--sign-y));
}

.badge.dot .indicator {
  block-size: var(--dot);
  inline-size: var(--dot);
  min-inline-size: var(--dot);
  padding: 0;
}
```

## Browser support

- Chromium: Full support Supported since v144.
- Firefox: Full support Supported since v151.
- Safari: Full support Supported since v26.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/astro/guide/browser-support/?components=Badge.md).

## Installation

Import the component from `opui-css/astro`:

### Dependencies

- [Anchor](https://open-props-ui.netlify.app/astro/components/anchor.md)

* `opui-css/css/components/badge.css`
* `opui-css/css/components/anchor.css`

## Changelog

### What's new

- Severity text reads `--ui-text-on-accent` and `--ui-palette-ink` instead of fixed grays.
- Badges on round avatars sit on the avatar's edge ([Alignment](#alignment)), and in an avatar group on the start side.
- [Indicator](#indicator) context for screen readers with `srLabel`.
- [`alignment`](#alignment) takes `"start-end"`, the default placement.
- Breaking: `--_badge-inset` is `--_inset-block` and `--_inset-inline` ([Under the hood](#under-the-hood)).
- `--_duration` and `--_ease` set the transition duration and easing ([Under the hood](#under-the-hood)).
