# Badge

### What's new

- [Indicator](#indicator) context for screen readers with `.ui-sr-only`.

## Anatomy

5

- `.ui-badge`

  Container element. Also takes `.ui-anchor`.

- `& > :first-child`

  The element the badge is anchored to.

- `.ui-badge-indicator`

  The indicator, inside `.ui-anchor-floating`.

## Variants

Default, and `.ui-dot`.

```html
<span class="ui-anchor ui-badge">
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
  <span class="ui-anchor-floating">
    <span class="ui-badge-indicator">5</span>
  </span>
</span>


<span class="ui-anchor ui-badge ui-dot">
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
  <span class="ui-anchor-floating">
    <span class="ui-badge-indicator"></span>
  </span>
</span>
```

## Indicator

Put indicator text inside `.ui-badge-indicator`. The anchored element is the badge's direct child before `.ui-anchor-floating`.

```html
<span class="ui-anchor ui-badge">
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
  <span class="ui-anchor-floating">
    <span class="ui-badge-indicator"
      >5 <span class="ui-sr-only">unread messages</span></span
    >
  </span>
</span>


<span class="ui-anchor ui-badge">
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
  <span class="ui-anchor-floating">
    <span class="ui-badge-indicator"
      >99+ <span class="ui-sr-only">unread messages</span></span
    >
  </span>
</span>
```

## Severities

`.ui-critical`, `.ui-info`, `.ui-neutral`, `.ui-success`, `.ui-warning`.

```html
<span class="ui-anchor ui-badge ui-critical">
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
  <span class="ui-anchor-floating">
    <span class="ui-badge-indicator">5</span>
  </span>
</span>


<span class="ui-anchor ui-badge ui-info">
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
  <span class="ui-anchor-floating">
    <span class="ui-badge-indicator">5</span>
  </span>
</span>


<span class="ui-anchor ui-badge ui-success">
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
  <span class="ui-anchor-floating">
    <span class="ui-badge-indicator">5</span>
  </span>
</span>


<span class="ui-anchor ui-badge ui-warning">
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
  <span class="ui-anchor-floating">
    <span class="ui-badge-indicator">5</span>
  </span>
</span>


<span class="ui-anchor ui-badge ui-neutral">
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
  <span class="ui-anchor-floating">
    <span class="ui-badge-indicator">5</span>
  </span>
</span>
```

## Visibility

Change the badge's visibility using the `.ui-invisible` class.

```html
<span class="ui-anchor ui-badge ui-invisible">
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
  <span class="ui-anchor-floating">
    <span class="ui-badge-indicator">5</span>
  </span>
</span>


<span class="ui-anchor ui-badge ui-dot ui-invisible">
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
  <span class="ui-anchor-floating">
    <span class="ui-badge-indicator"></span>
  </span>
</span>
```

## Alignment

Where the badge should be placed over the child.

`.ui-start-start`, default, `.ui-end-start`, `.ui-end-end`.

```html
<span class="ui-anchor ui-badge ui-start-start">
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
  <span class="ui-anchor-floating">
    <span class="ui-badge-indicator">35</span>
  </span>
</span>


<span class="ui-anchor ui-badge">
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
  <span class="ui-anchor-floating">
    <span class="ui-badge-indicator">99+</span>
  </span>
</span>


<span class="ui-anchor ui-badge ui-end-start">
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
  <span class="ui-anchor-floating">
    <span class="ui-badge-indicator">OK!</span>
  </span>
</span>


<span class="ui-anchor ui-badge ui-end-end">
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
  <span class="ui-anchor-floating">
    <span class="ui-badge-indicator">3K</span>
  </span>
</span>
```

## Accessibility

- A count on its own is read without context, such as "5". Add visually hidden text inside the indicator, so it's read as "5 unread messages":a `.ui-sr-only` element inside `.ui-badge-indicator`.
- Don't use `aria-label` on the indicator. It's a`<span>` without a role, so screen readers ignore the label and read the text.

## API

### Badge API

| Type       | Modifiers                                                               | Default | Description                                      |
| ---------- | ----------------------------------------------------------------------- | ------- | ------------------------------------------------ |
| Alignment  | `.ui-end-end`, `.ui-end-start`, `.ui-start-start`                       | -       | Where the indicator is placed.                   |
| Colors     | `.ui-critical`, `.ui-info`, `.ui-neutral`, `.ui-success`, `.ui-warning` | -       | Optional colors.                                 |
| Variants   | `.ui-dot`                                                               | -       | Renders the indicator as a dot, without a label. |
| Visibility | `.ui-invisible`                                                         | -       | Hides the indicator.                             |

#### Parts

| Part                  | Description                                  |
| --------------------- | -------------------------------------------- |
| `.ui-badge`           | Container element. Also takes `.ui-anchor`.  |
| `& > :first-child`    | The element the badge is anchored to.        |
| `.ui-badge-indicator` | The indicator, inside `.ui-anchor-floating`. |

#### CSS variables

| Variable               | Default                                                                               | Description                                                                                                                |
| ---------------------- | ------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `--critical`           | `var(--red)`                                                                          | Severity color for errors and destructive actions.                                                                         |
| `--duration`           | `0.2s`                                                                                | Default transition duration. Multiplied by `--motion`.                                                                     |
| `--ease-enter`         | `var(--ease-out-3)`                                                                   | Easing for elements entering the screen.                                                                                   |
| `--font-weight-medium` | `var(--font-weight-5)`                                                                | Font weight for badges, overlines and group labels.                                                                        |
| `--info`               | `var(--blue)`                                                                         | Severity color for informational messages.                                                                                 |
| `--motion`             | `1`                                                                                   | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. |
| `--neutral`            | `var(--gray-9)`                                                                       | Severity color for neutral messages.                                                                                       |
| `--primary`            | `light-dark(var(--color-9), var(--color-6))`                                          | Brand color for primary actions and accents.                                                                               |
| `--primary-contrast`   | `oklch( from var(--primary) clamp(0.15, (0.565 - l) * 1000, 0.98) calc(c * 0.15) h )` | Text color on a `--primary` background.                                                                                    |
| `--success`            | `var(--green)`                                                                        | Severity color for success messages.                                                                                       |
| `--warning`            | `var(--orange)`                                                                       | Severity color for warnings.                                                                                               |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md) for the full list.

## Under the hood

1. Indicator

   - `min-inline-size` equals `block-size`: a circle for one digit, a pill for more
   - `max-content` keeps `99+` on one line

2. Corner

   - Insets of `100%` park the indicator just outside the top end corner
   - `translate` pulls its center back onto the corner
   - Built on Anchor, but plain insets: works without `position-area`

3. Direction

   - Logical insets flip in right-to-left, `translate` doesn't
   - `:dir(rtl)` sets `--dir: -1` and the offset follows
   - Offsets live in custom properties, so alignments only swap values

4. Dot

   - Same indicator, emptied and shrunk
   - New `--tx` and `--ty` tuck it inside the corner, no new positioning rules

Step 1 of 4: Indicator

```html
<span class="badge">
  <svg>…</svg>
  <span class="indicator">5</span>
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

- [Individual transform properties](https://webstatus.dev/features/individual-transforms) (Widely available): Chrome 104+, Edge 104+, Firefox 72+, Safari 14.1+
- [Logical properties](https://webstatus.dev/features/logical-properties) (Widely available): Chrome 89+, Edge 89+, Firefox 66+, Safari 15+

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

- [`:dir()`](https://webstatus.dev/features/dir-pseudo) (Widely available): Chrome 120+, Edge 120+, Firefox 49+, Safari 16.4+

```css
.badge {
  --dir: 1;
  --tx: -50%;
  --ty: 50%;
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
  --tx: calc((var(--dot) - 2px) * -1);
  --ty: var(--dot);
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

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/html/guide/browser-support/?components=Badge.md).

## Installation

### Dependencies

- [Anchor](https://open-props-ui.netlify.app/html/components/anchor.md)

- `opui-css/css/components/badge.css`
- `opui-css/css/components/anchor.css`

