# Badge

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
    <span class="ui-badge-indicator">5</span>
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
<span
  class="ui-anchor ui-badge ui-start-start"
  style="
    --anchor-position-area: start start;
    --_anchor-inset: auto 100% 100% auto;
  "
>
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


<span
  class="ui-anchor ui-badge ui-end-start"
  style="
    --anchor-position-area: end start;
    --_anchor-inset: 100% 100% auto auto;
  "
>
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


<span
  class="ui-anchor ui-badge ui-end-end"
  style="--anchor-position-area: end end; --_anchor-inset: 100% auto auto 100%"
>
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

## API

### Badge API

| Type       | Modifiers                                                                   | Default | Description                                      |
| ---------- | --------------------------------------------------------------------------- | ------- | ------------------------------------------------ |
| Alignment  | `.ui-end-end`, `.ui-end-start`, `.ui-start-start`, `--anchor-position-area` | -       | Where the indicator is placed.                   |
| Colors     | `.ui-critical`, `.ui-info`, `.ui-neutral`, `.ui-success`, `.ui-warning`     | -       | Optional colors.                                 |
| Variants   | `.ui-dot`                                                                   | -       | Renders the indicator as a dot, without a label. |
| Visibility | `.ui-invisible`                                                             | -       | Hides the indicator.                             |

#### Parts

| Part                  | Description                                  |
| --------------------- | -------------------------------------------- |
| `.ui-badge`           | Container element. Also takes `.ui-anchor`.  |
| `& > :first-child`    | The element the badge is anchored to.        |
| `.ui-badge-indicator` | The indicator, inside `.ui-anchor-floating`. |

#### CSS variables

| Variable               | Default                                      | Description                                                                                                                |
| ---------------------- | -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `--critical`           | `var(--red)`                                 | Severity color for errors and destructive actions.                                                                         |
| `--duration`           | `0.2s`                                       | Default transition duration. Multiplied by `--motion`.                                                                     |
| `--ease-enter`         | `var(--ease-out-3)`                          | Easing for elements entering the screen.                                                                                   |
| `--font-weight-medium` | `var(--font-weight-5)`                       | Font weight for badges, overlines and group labels.                                                                        |
| `--info`               | `var(--blue)`                                | Severity color for informational messages.                                                                                 |
| `--motion`             | `1`                                          | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. |
| `--neutral`            | `var(--gray-9)`                              | Severity color for neutral messages.                                                                                       |
| `--primary`            | `light-dark(var(--color-9), var(--color-6))` | Brand color for primary actions and accents.                                                                               |
| `--primary-contrast`   | `light-dark(var(--gray-1), var(--gray-15))`  | Text color on a `--primary` background.                                                                                    |
| `--success`            | `var(--green)`                               | Severity color for success messages.                                                                                       |
| `--warning`            | `var(--orange)`                              | Severity color for warnings.                                                                                               |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md) for the full list.

With an alignment class, also set `--anchor-position-area` to the same position, such as `start start`.

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

