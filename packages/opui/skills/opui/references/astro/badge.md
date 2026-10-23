# Badge

## Anatomy

5

- `<Badge>`

  Container element.

- `slot="default"`

  The element the badge is anchored to.

- `label / slot="indicator"`

  The indicator, inside `.ui-floating`. Holds `label`, the visible text with `hideLabel`, or only screen reader text with `dot`.

## Dot

Use `dot` to show a dot instead of the label.

```astro
---
import { Badge } from "opui-css/astro"
---

<Badge hideLabel label="5 unread messages">
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
  <Fragment slot="indicator">5</Fragment>
</Badge>

<Badge dot label="New messages">
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

<Badge color="critical" hideLabel label="5 unread messages">
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
  <Fragment slot="indicator">5</Fragment>
</Badge>
<Badge color="info" hideLabel label="5 unread messages">
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
  <Fragment slot="indicator">5</Fragment>
</Badge>
<Badge color="neutral" hideLabel label="5 unread messages">
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
  <Fragment slot="indicator">5</Fragment>
</Badge>
<Badge color="success" hideLabel label="5 unread messages">
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
  <Fragment slot="indicator">5</Fragment>
</Badge>
<Badge color="warning" hideLabel label="5 unread messages">
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
  <Fragment slot="indicator">5</Fragment>
</Badge>
```

## Indicator

Set the indicator text with `label`. When the visible text is short, like a count, set `hideLabel` and pass the whole sentence as `label`, such as "5 unread messages", and the short form in the `indicator` slot. Screen readers read the label and skip the slot. The default slot holds the anchored element.

The badge never joins the number and the words, so a translation can put the number wherever its language needs it, and the visible text can differ from the sentence ("99+" and "More than 99 unread messages").

```astro
---
import { Badge } from "opui-css/astro"
---

<Badge hideLabel label="5 unread messages">
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
  <Fragment slot="indicator">5</Fragment>
</Badge>

<Badge hideLabel label="More than 99 unread messages">
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

<Badge hideLabel invisible label="5 unread messages">
  <!-- -->
  <Fragment slot="indicator">5</Fragment>
</Badge>
```

## Corners

The corner of the child the badge sits on.

Set `corner` to `start-start`, `start-end` (the default), `end-start` or `end-end`.

```astro
---
import { Badge } from "opui-css/astro"
---

<Badge corner="start-start" hideLabel label="35 unread messages">
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
  <Fragment slot="indicator">35</Fragment>
</Badge>
<Badge hideLabel label="More than 99 unread messages">
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
<Badge corner="end-start" hideLabel label="Inbox synced">
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
  <Fragment slot="indicator">OK!</Fragment>
</Badge>
<Badge corner="end-end" hideLabel label="About 3,000 unread messages">
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
  <Fragment slot="indicator">3K</Fragment>
</Badge>
```

## Accessibility

- A count on its own is read without context, such as "5". Give the badge the whole sentence for screen readers, so it's read as "5 unread messages": `hideLabel` with the sentence as `label`.
- The indicator sits next to the anchored element, not inside it. On a button or a link, put the sentence in its name too, such as `aria-label="Inbox, 5 unread messages"`, since the name is what's read when it's focused.

## API

### Badge API

| Prop        | Type                                                              | Default       | Description                                                                                                                                                                          |
| ----------- | ----------------------------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `color`     | `"critical"` , `"info"` , `"neutral"` , `"success"` , `"warning"` | -             | Optional colors.                                                                                                                                                                     |
| `corner`    | `"end-end"` , `"end-start"` , `"start-end"` , `"start-start"`     | `"start-end"` | The corner the indicator sits on.                                                                                                                                                    |
| `dot`       | `boolean`                                                         | `false`       | Renders the indicator as a dot. `label` stays as screen reader text, and the `indicator` slot isn't shown.                                                                           |
| `hideLabel` | `boolean`                                                         | `false`       | Hides `label` visually, for the whole sentence screen readers read, such as "5 unread messages". The `indicator` slot then holds the visible text and is hidden from screen readers. |
| `invisible` | `boolean`                                                         | `false`       | Hides the indicator.                                                                                                                                                                 |
| `label`     | `string`                                                          | -             | The indicator, inside `.ui-floating`. Holds `label`, the visible text with `hideLabel`, or only screen reader text with `dot`.                                                       |

#### Slots

| Slot        | Description                                                                                                                    |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `default`   | The element the badge is anchored to.                                                                                          |
| `indicator` | The indicator, inside `.ui-floating`. Holds `label`, the visible text with `hideLabel`, or only screen reader text with `dot`. |

#### CSS variables

| Variable                  | Default                                                                                                                                                                                                                  | Description                                                                                                                                                                                                                                                                                                 |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--ui-border-width-thick` | `var(--border-size-2)`                                                                                                                                                                                                   | Width of emphasized rules: the head and foot rules of rich text tables, the `AvatarGroup` ring, the `Badge` border, the neutral `Chip` dot, the dotted `DescriptionList` rule, the `Tabs` indicator, the bar on a selected `List` row, the `Spinner` ring, and at one and a half times, the blockquote bar. |
| `--ui-critical`           | `var(--ui-red)`                                                                                                                                                                                                          | Severity color for errors and destructive actions.                                                                                                                                                                                                                                                          |
| `--ui-duration`           | `0.2s`                                                                                                                                                                                                                   | Default transition duration. Multiplied by `--ui-motion`.                                                                                                                                                                                                                                                   |
| `--ui-ease-enter`         | `var(--ease-out-3)`                                                                                                                                                                                                      | Easing for elements entering the screen: opening `Dialog`, `Drawer` and `Menu`, and the `Badge`, `Progress` and `Tooltip` transitions.                                                                                                                                                                      |
| `--ui-fill-max-lightness` | `0.48`                                                                                                                                                                                                                   | The highest OKLCH lightness of an intent color used as a fill under light text: the critical, info, neutral and success `Badge`, and the fills of critical `Button`s, also in a critical `ButtonGroup`. Borders keep the intent color. `0.48`, and `0.45` with more contrast.                               |
| `--ui-font-size-caption`  | `var(--ui-font-size-100)`                                                                                                                                                                                                | Font size of captions, `Badge`, `Chip`, `Divider` labels, `List` secondary text, `Menu` shortcuts, overlines, `small`, `figcaption` and x-small buttons, toggles and fields. Defaults to `--ui-font-size-100`.                                                                                              |
| `--ui-font-weight-medium` | `var(--font-weight-5)`                                                                                                                                                                                                   | Font weight for badges, overlines and group labels.                                                                                                                                                                                                                                                         |
| `--ui-info`               | `var(--ui-blue)`                                                                                                                                                                                                         | Severity color for informational messages.                                                                                                                                                                                                                                                                  |
| `--ui-motion`             | `1`                                                                                                                                                                                                                      | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/astro/guide/theming.md#motion).                                                                                                   |
| `--ui-neutral`            | `light-dark( oklch(from var(--ui-gray-9) min(l, var(--ui-accent-max-lightness)) c h), var(--ui-gray-9) )`                                                                                                                | Severity color for neutral messages. `--ui-gray-9`, capped at `--ui-accent-max-lightness` in light mode. The `.ui-neutral` scope follows `--ui-gray-hue` and `--ui-gray-chroma`, not this token.                                                                                                            |
| `--ui-on-accent`          | `var(--ui-gray-1)`                                                                                                                                                                                                       | Near-white text on a saturated fill in both modes: critical buttons, severity `Badge`s and the checked choice mark in dark mode.                                                                                                                                                                            |
| `--ui-on-primary`         | `oklch( from var(--ui-primary) clamp(0.15, (0.565 - l) * 1000, 0.98) calc(c * 0.15) h )`                                                                                                                                 | Text color on `--ui-primary`. Derived with relative color: near-black when the primary's lightness is above 0.565, near-white below, tinted with 15% of its chroma, so a custom `--ui-primary` gets readable text.                                                                                          |
| `--ui-on-warning`         | `oklch( from var(--ui-warning) clamp(0.15, (0.565 - l) * 1000, 0.98) calc(c * 0.15) h )`                                                                                                                                 | Text color on a `--ui-warning` fill: the warning `Badge`. Near black on a light warning and near white on a dark one.                                                                                                                                                                                       |
| `--ui-primary`            | `light-dark( oklch( from var(--ui-primary-source) min(l, var(--ui-primary-max-lightness)) c h ), oklch( from var(--ui-primary-source) max(l, var(--ui-primary-min-lightness)) min(c, var(--ui-accent-max-chroma)) h ) )` | Brand color for primary actions and accents. Derived from `--ui-primary-source` within `--ui-primary-max-lightness` and `--ui-primary-min-lightness`. Set `--ui-primary-source` to keep more contrast working, or this token to pin the color.                                                              |
| `--ui-radius-round`       | `var(--radius-round)`                                                                                                                                                                                                    | The pill radius for round buttons, avatars, badges, chips, radios, switches, the range track and the carousel buttons and markers.                                                                                                                                                                          |
| `--ui-space-1`            | `calc(var(--size-1) * var(--ui-space-scale))`                                                                                                                                                                            | Spacing step 1: Open Props `--size-1` times `--ui-space-scale`.                                                                                                                                                                                                                                             |
| `--ui-space-2`            | `calc(var(--size-2) * var(--ui-space-scale))`                                                                                                                                                                            | Spacing step 2: Open Props `--size-2` times `--ui-space-scale`.                                                                                                                                                                                                                                             |
| `--ui-space-4`            | `calc(var(--size-4) * var(--ui-space-scale))`                                                                                                                                                                            | Spacing step 4: Open Props `--size-4` times `--ui-space-scale`.                                                                                                                                                                                                                                             |
| `--ui-success`            | `var(--ui-green)`                                                                                                                                                                                                        | Severity color for success messages.                                                                                                                                                                                                                                                                        |
| `--ui-warning`            | `var(--ui-orange)`                                                                                                                                                                                                       | Severity color for warnings. Unlike the other severities it keeps its lightness with more contrast: the fill is light and takes dark `--ui-on-warning` text, and `--ui-warning-text` gets the stricter lightness limits instead.                                                                            |

This component uses these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/astro/guide/theme-tokens.md).

## Component properties

Set these on the component itself, inline or in your own CSS. Inputs are the knobs. Outputs are derived from the inputs and the current state, so overriding one fixes it in every state. [Customizing](https://open-props-ui.netlify.app/astro/guide/customizing.md#component-properties) has examples.

| Property          | Kind   | Description                                                                                                               |
| ----------------- | ------ | ------------------------------------------------------------------------------------------------------------------------- |
| `--_accent`       | Output | The color the indicator background is derived from. Set by `.ui-critical`, `.ui-info`, `.ui-neutral` and `.ui-success`.   |
| `--_bg-color`     | Output | Background of the indicator. Defaults to `--ui-primary`, set by the color classes.                                        |
| `--_border-color` | Output | Border color of the indicator. Set by the color classes.                                                                  |
| `--_border-width` | Input  | Border width of the indicator.                                                                                            |
| `--_direction`    | Output | Direction flag that flips `--_shift-x`. `1`, or `-1` in right-to-left.                                                    |
| `--_dot-size`     | Input  | Width and height of the indicator in `.ui-dot`.                                                                           |
| `--_duration`     | Output | Duration of the indicator fade, `--ui-duration` times `--_motion`.                                                        |
| `--_ease`         | Input  | Easing of the indicator fade. Defaults to `--ui-ease-enter`.                                                              |
| `--_inset`        | Input  | Distance of the indicator from the opposite edges. `100%` places it on the corner, round avatars move it onto the circle. |
| `--_inset-block`  | Output | Block inset of the indicator, from `--_inset` and the corner classes.                                                     |
| `--_inset-inline` | Output | Inline inset of the indicator, from `--_inset` and the corner classes.                                                    |
| `--_motion`       | Input  | Motion multiplier for the transitions. `0` turns them off.                                                                |
| `--_shift-x`      | Output | Horizontal shift of the indicator, from `--_sign-x`. `.ui-dot` and round avatars change it.                               |
| `--_shift-y`      | Output | Vertical shift of the indicator, from `--_sign-y`. `.ui-dot` and round avatars change it.                                 |
| `--_sign-x`       | Output | Horizontal side of the indicator, `-1` or `1`. Set by the corner classes.                                                 |
| `--_sign-y`       | Output | Vertical side of the indicator, `1` or `-1`. Set by the corner classes.                                                   |
| `--_size`         | Input  | Height and minimum width of the indicator.                                                                                |
| `--_text-color`   | Output | Text color of the indicator. Defaults to `--ui-on-primary`, set by the color classes.                                     |

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
   - Offsets follow `--sign-x` and `--sign-y`, so the corners only flip the signs

4. Dot

   - Same indicator, emptied and shrunk
   - New `--tx` and `--ty` tuck it inside the corner, no new positioning rules
   - Same signs, so it tucks in whichever corner it sits on

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
  border-radius: var(--ui-radius-round);
  color: var(--ui-on-primary);
  display: grid;
  font-size: var(--ui-font-size-caption);
  font-weight: var(--ui-font-weight-medium);
  inline-size: max-content;
  min-inline-size: var(--size);
  padding-inline: var(--ui-space-1);
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
  --dot: var(--ui-space-2);
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

- Chromium: Full support Supported since v125.
- Firefox: Full support Supported since v128.
- Safari: Full support Supported since v18.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/astro/guide/browser-support/?components=Badge.md).

## Installation

Import the component from `opui-css/astro`:

### Dependencies

- [Anchor](https://open-props-ui.netlify.app/astro/components/anchor.md)

Copy the CSS into your project to own it. It reads tokens from Open Props, `palette.css` and `theme.css`, so those go on the page too, after `layers.css`. See [Getting started](https://open-props-ui.netlify.app/astro/guide/getting-started.md).

- `opui-css/css/components/badge.css`
- `opui-css/css/components/anchor.css`

## Changelog

### What's new

- Breaking: `--_anchor-tx` and `--_anchor-ty` are `--_shift-x` and `--_shift-y` ([Under the hood](#under-the-hood)).
- Breaking: `Badge` no longer renders `.ui-anchor`. Style [`.ui-badge`](#api) instead.
- Severity text reads `--ui-on-accent` and `--ui-palette-strong` instead of fixed grays.
- Badges on round avatars sit on the avatar's edge ([Corners](#corners)), and in an avatar group on the start side.
- [Indicator](#indicator) text for screen readers with `hideLabel`: one translated `label`, and the short visible text in `indicator`.
- Breaking: the indicator is [`.ui-indicator`](#indicator) instead of `.ui-badge-indicator`, inside `.ui-floating` instead of `.ui-anchor-floating`.
- Breaking: [`label`](#indicator) is a string.
- [`corner`](#corners) takes `"start-end"`, the default corner.
- Breaking: `--_badge-inset` is `--_inset-block` and `--_inset-inline` ([Under the hood](#under-the-hood)).
- `--_duration` and `--_ease` set the transition duration and easing ([Under the hood](#under-the-hood)).
- The indicator border reads [`--ui-border-width-thick`](#api).
- [Warning](#colors) badges read `--ui-on-warning`, the text color on a warning fill.
- [Critical, info, neutral and success](#colors) fills stay below `--ui-fill-max-lightness`, so their text keeps its contrast.
- Breaking: `alignment` is [`corner`](#corners).
