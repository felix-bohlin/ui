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

`.ui-critical`, `.ui-info`, `.ui-neutral`,`.ui-success`, `.ui-warning`.

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

Change the badge's visibility using the `.ui-invisible`class.

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

With an alignment class, also set `--anchor-position-area` to the same position, such as `start start`.

## Browser support

- Chromium: Full support Supported since v144.
- Firefox: Full support Supported since v151.
- Safari: Full support Supported since v26.

See also the [full browser support guide](https://open-props-ui.netlify.app/html/guide/browser-support.md).

## Installation

### Dependencies

- [Anchor](https://open-props-ui.netlify.app/html/components/anchor.md)

- `opui-css/css/components/badge.css`
- `opui-css/css/components/anchor.css`

