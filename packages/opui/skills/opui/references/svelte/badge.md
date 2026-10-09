# Badge

## Anatomy

5

- `<Badge>`

  Container element. Also takes `.ui-anchor`.

- `children`

  The element the badge is anchored to.

- `indicator`

  The indicator, inside `.ui-anchor-floating`.

## Variants

Default, and `dot`.

```svelte
<script lang="ts">
  import { Badge } from "opui-css/svelte"
</script>

<Badge label="5">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
  >
    <path
      fill="currentColor"
      d="M2.004 9.303A4.5 4.5 0 0 1 6.5 5h19a4.5 4.5 0 0 1 4.496 4.303l-1.476.82L16 16.864L3.48 10.123zM2 11.588V22.5A4.5 4.5 0 0 0 6.5 27h19a4.5 4.5 0 0 0 4.5-4.5V11.588l-.526.293l-13 7a1 1 0 0 1-.948 0L2.514 11.874z"
    ></path>
  </svg>
</Badge>

<Badge dot>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
  >
    <path
      fill="currentColor"
      d="M2.004 9.303A4.5 4.5 0 0 1 6.5 5h19a4.5 4.5 0 0 1 4.496 4.303l-1.476.82L16 16.864L3.48 10.123zM2 11.588V22.5A4.5 4.5 0 0 0 6.5 27h19a4.5 4.5 0 0 0 4.5-4.5V11.588l-.526.293l-13 7a1 1 0 0 1-.948 0L2.514 11.874z"
    ></path>
  </svg>
</Badge>
```

## Severities

`critical`, `info`, `neutral`, `success`, `warning`.

```svelte
<script lang="ts">
  import { Badge } from "opui-css/svelte"
</script>

<Badge color="critical" label="5">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
  >
    <path
      fill="currentColor"
      d="M2.004 9.303A4.5 4.5 0 0 1 6.5 5h19a4.5 4.5 0 0 1 4.496 4.303l-1.476.82L16 16.864L3.48 10.123zM2 11.588V22.5A4.5 4.5 0 0 0 6.5 27h19a4.5 4.5 0 0 0 4.5-4.5V11.588l-.526.293l-13 7a1 1 0 0 1-.948 0L2.514 11.874z"
    ></path>
  </svg>
</Badge>
<Badge color="info" label="5">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
  >
    <path
      fill="currentColor"
      d="M2.004 9.303A4.5 4.5 0 0 1 6.5 5h19a4.5 4.5 0 0 1 4.496 4.303l-1.476.82L16 16.864L3.48 10.123zM2 11.588V22.5A4.5 4.5 0 0 0 6.5 27h19a4.5 4.5 0 0 0 4.5-4.5V11.588l-.526.293l-13 7a1 1 0 0 1-.948 0L2.514 11.874z"
    ></path>
  </svg>
</Badge>
<Badge color="success" label="5">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
  >
    <path
      fill="currentColor"
      d="M2.004 9.303A4.5 4.5 0 0 1 6.5 5h19a4.5 4.5 0 0 1 4.496 4.303l-1.476.82L16 16.864L3.48 10.123zM2 11.588V22.5A4.5 4.5 0 0 0 6.5 27h19a4.5 4.5 0 0 0 4.5-4.5V11.588l-.526.293l-13 7a1 1 0 0 1-.948 0L2.514 11.874z"
    ></path>
  </svg>
</Badge>
<Badge color="warning" label="5">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
  >
    <path
      fill="currentColor"
      d="M2.004 9.303A4.5 4.5 0 0 1 6.5 5h19a4.5 4.5 0 0 1 4.496 4.303l-1.476.82L16 16.864L3.48 10.123zM2 11.588V22.5A4.5 4.5 0 0 0 6.5 27h19a4.5 4.5 0 0 0 4.5-4.5V11.588l-.526.293l-13 7a1 1 0 0 1-.948 0L2.514 11.874z"
    ></path>
  </svg>
</Badge>
<Badge color="neutral" label="5">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
  >
    <path
      fill="currentColor"
      d="M2.004 9.303A4.5 4.5 0 0 1 6.5 5h19a4.5 4.5 0 0 1 4.496 4.303l-1.476.82L16 16.864L3.48 10.123zM2 11.588V22.5A4.5 4.5 0 0 0 6.5 27h19a4.5 4.5 0 0 0 4.5-4.5V11.588l-.526.293l-13 7a1 1 0 0 1-.948 0L2.514 11.874z"
    ></path>
  </svg>
</Badge>
```

## Indicator

Set indicator text with the `label` prop or the `indicator` snippet. The `children` snippet holds the anchored element.

```svelte
<script lang="ts">
  import { Badge } from "opui-css/svelte"
</script>

<Badge label="5" srLabel="unread messages">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
  >
    <path
      fill="currentColor"
      d="M2.004 9.303A4.5 4.5 0 0 1 6.5 5h19a4.5 4.5 0 0 1 4.496 4.303l-1.476.82L16 16.864L3.48 10.123zM2 11.588V22.5A4.5 4.5 0 0 0 6.5 27h19a4.5 4.5 0 0 0 4.5-4.5V11.588l-.526.293l-13 7a1 1 0 0 1-.948 0L2.514 11.874z"
    ></path>
  </svg>
</Badge>

<Badge srLabel="unread messages">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
  >
    <path
      fill="currentColor"
      d="M2.004 9.303A4.5 4.5 0 0 1 6.5 5h19a4.5 4.5 0 0 1 4.496 4.303l-1.476.82L16 16.864L3.48 10.123zM2 11.588V22.5A4.5 4.5 0 0 0 6.5 27h19a4.5 4.5 0 0 0 4.5-4.5V11.588l-.526.293l-13 7a1 1 0 0 1-.948 0L2.514 11.874z"
    ></path>
  </svg>
  {#snippet indicator()}99+{/snippet}
</Badge>
```

## Visibility

Change the badge's visibility using the `invisible` prop.

```svelte
<script lang="ts">
  import { Badge } from "opui-css/svelte"
</script>

<Badge label="5" invisible>
  <!-- -->
</Badge>

<Badge dot invisible>
  <!-- -->
</Badge>
```

## Alignment

Where the badge should be placed over the child.

`start-start`, default (`start-end`), `end-start`, `end-end`.

```svelte
<script lang="ts">
  import { Badge } from "opui-css/svelte"
</script>

<Badge alignment="start-start" label="35">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
  >
    <path
      fill="currentColor"
      d="M2.004 9.303A4.5 4.5 0 0 1 6.5 5h19a4.5 4.5 0 0 1 4.496 4.303l-1.476.82L16 16.864L3.48 10.123zM2 11.588V22.5A4.5 4.5 0 0 0 6.5 27h19a4.5 4.5 0 0 0 4.5-4.5V11.588l-.526.293l-13 7a1 1 0 0 1-.948 0L2.514 11.874z"
    ></path>
  </svg>
</Badge>
<Badge label="99+">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
  >
    <path
      fill="currentColor"
      d="M2.004 9.303A4.5 4.5 0 0 1 6.5 5h19a4.5 4.5 0 0 1 4.496 4.303l-1.476.82L16 16.864L3.48 10.123zM2 11.588V22.5A4.5 4.5 0 0 0 6.5 27h19a4.5 4.5 0 0 0 4.5-4.5V11.588l-.526.293l-13 7a1 1 0 0 1-.948 0L2.514 11.874z"
    ></path>
  </svg>
</Badge>
<Badge alignment="end-start" label="OK!">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
  >
    <path
      fill="currentColor"
      d="M2.004 9.303A4.5 4.5 0 0 1 6.5 5h19a4.5 4.5 0 0 1 4.496 4.303l-1.476.82L16 16.864L3.48 10.123zM2 11.588V22.5A4.5 4.5 0 0 0 6.5 27h19a4.5 4.5 0 0 0 4.5-4.5V11.588l-.526.293l-13 7a1 1 0 0 1-.948 0L2.514 11.874z"
    ></path>
  </svg>
</Badge>
<Badge alignment="end-end" label="3K">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
  >
    <path
      fill="currentColor"
      d="M2.004 9.303A4.5 4.5 0 0 1 6.5 5h19a4.5 4.5 0 0 1 4.496 4.303l-1.476.82L16 16.864L3.48 10.123zM2 11.588V22.5A4.5 4.5 0 0 0 6.5 27h19a4.5 4.5 0 0 0 4.5-4.5V11.588l-.526.293l-13 7a1 1 0 0 1-.948 0L2.514 11.874z"
    ></path>
  </svg>
</Badge>
```

## Accessibility

- A count on its own is read without context, such as "5". Add visually hidden text inside the indicator, so it's read as "5 unread messages": the `srLabel` prop.

## API

### Badge API

| Prop        | Type                                                              | Default       | Description                                                                                |
| ----------- | ----------------------------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------ |
| `alignment` | `"start-start"` , `"start-end"` , `"end-start"` , `"end-end"`     | `"start-end"` | Where the indicator is placed.                                                             |
| `children`  | `Snippet`                                                         | -             | The element the badge is anchored to.                                                      |
| `color`     | `"critical"` , `"info"` , `"neutral"` , `"success"` , `"warning"` | -             | Optional colors.                                                                           |
| `dot`       | `boolean`                                                         | `false`       | Renders the indicator as a dot, without a label.                                           |
| `indicator` | `Snippet`                                                         | -             | The indicator, inside `.ui-anchor-floating`.                                               |
| `invisible` | `boolean`                                                         | `false`       | Hides the indicator.                                                                       |
| `label`     | `string` , `number`                                               | -             | The indicator, inside `.ui-anchor-floating`.                                               |
| `srLabel`   | `string`                                                          | -             | Visually hidden text that describes the badge to assistive technology, such as "3 unread". |

#### CSS variables

| Variable               | Default                                                                               | Description                                                                                                                                                                                                  |
| ---------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `--critical`           | `var(--red)`                                                                          | Severity color for errors and destructive actions.                                                                                                                                                           |
| `--duration`           | `0.2s`                                                                                | Default transition duration. Multiplied by `--motion`.                                                                                                                                                       |
| `--ease-enter`         | `var(--ease-out-3)`                                                                   | Easing for elements entering the screen.                                                                                                                                                                     |
| `--font-weight-medium` | `var(--font-weight-5)`                                                                | Font weight for badges, overlines and group labels.                                                                                                                                                          |
| `--info`               | `var(--blue)`                                                                         | Severity color for informational messages.                                                                                                                                                                   |
| `--motion`             | `1`                                                                                   | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/svelte/guide/theming.md#motion).   |
| `--neutral`            | `var(--gray-9)`                                                                       | Severity color for neutral messages.                                                                                                                                                                         |
| `--primary`            | `light-dark(var(--color-9), var(--color-6))`                                          | Brand color for primary actions and accents.                                                                                                                                                                 |
| `--primary-contrast`   | `oklch( from var(--primary) clamp(0.15, (0.565 - l) * 1000, 0.98) calc(c * 0.15) h )` | Text color on `--primary`. Derived with relative color: near-black when the primary's lightness is above 0.565, near-white below, tinted with 15% of its chroma, so a custom `--primary` gets readable text. |
| `--success`            | `var(--green)`                                                                        | Severity color for success messages.                                                                                                                                                                         |
| `--surface-default`    | `light-dark(var(--gray-1), var(--gray-13))`                                           | Page and card background.                                                                                                                                                                                    |
| `--warning`            | `var(--orange)`                                                                       | Severity color for warnings.                                                                                                                                                                                 |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/svelte/guide/theme-tokens.md) for the full list.

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
  background-color: var(--primary);
  block-size: var(--size);
  border-radius: var(--radius-round);
  color: var(--primary-contrast);
  display: grid;
  font-size: var(--font-size-0);
  font-weight: var(--font-weight-medium);
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

- Chromium: Full support Supported since v125.
- Firefox: Full support Supported since v151.
- Safari: Full support Supported since v18.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/svelte/guide/browser-support/?components=Badge.md).

## Installation

Import the component from `opui-css/svelte`:

### Dependencies

- [Anchor](https://open-props-ui.netlify.app/svelte/components/anchor.md)

- `opui-css/css/components/badge.css`
- `opui-css/css/components/anchor.css`

## Changelog

### What's new

- Badges on round avatars sit on the avatar's edge ([Alignment](#alignment)), and in an avatar group on the start side.
- [Indicator](#indicator) context for screen readers with `srLabel`.
- [`alignment`](#alignment) takes `"start-end"`, the default placement.
