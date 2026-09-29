# Badge

**Quick start**

### npm

```sh
npm install opui-css open-props
```

```css
@import "opui-css/css/components/anchor.css";
@import "opui-css/css/components/badge.css";
```

### CDN

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/opui-css/dist/opui.css" />
```

### Copy the CSS

[Jump to source](#installation)

[Full setup guide](https://open-props-ui.netlify.app/html/guide/getting-started.md)

## Variants

Default, and `.ui-dot`.

```html
<span class="ui-anchor ui-badge">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
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
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
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
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    <path
      fill="currentColor"
      d="M2.004 9.303A4.5 4.5 0 0 1 6.5 5h19a4.5 4.5 0 0 1 4.496 4.303l-1.476.82L16 16.864L3.48 10.123zM2 11.588V22.5A4.5 4.5 0 0 0 6.5 27h19a4.5 4.5 0 0 0 4.5-4.5V11.588l-.526.293l-13 7a1 1 0 0 1-.948 0L2.514 11.874z"
    ></path>
  </svg>
  <span class="ui-anchor-floating">
    <span class="ui-badge-indicator" aria-label="5">5</span>
  </span>
</span>


<span class="ui-anchor ui-badge">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    <path
      fill="currentColor"
      d="M2.004 9.303A4.5 4.5 0 0 1 6.5 5h19a4.5 4.5 0 0 1 4.496 4.303l-1.476.82L16 16.864L3.48 10.123zM2 11.588V22.5A4.5 4.5 0 0 0 6.5 27h19a4.5 4.5 0 0 0 4.5-4.5V11.588l-.526.293l-13 7a1 1 0 0 1-.948 0L2.514 11.874z"
    ></path>
  </svg>
  <span class="ui-anchor-floating">
    <span class="ui-badge-indicator" aria-label="99+">99+</span>
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
  style="--anchor-position-area: start start"
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
  style="--anchor-position-area: end start"
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
  style="--anchor-position-area: end end"
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

## Anatomy

The badge is composed of an anchored element and a `.ui-badge-indicator` inside `.ui-anchor-floating`.

## API

| Type       | Modifiers                                                              | Default | Description                                                                                     |
| ---------- | ---------------------------------------------------------------------- | ------- | ----------------------------------------------------------------------------------------------- |
| Container  | `.ui-anchor.ui-badge`                                                  | -       | Wrapper element. Extends [Anchor](https://open-props-ui.netlify.app/html/components/anchor.md). |
| Floating   | `.ui-anchor-floating`                                                  | -       | Positioned floating container from Anchor.                                                      |
| Indicator  | `.ui-badge-indicator`                                                  | -       | The badge content element inside `.ui-anchor-floating`.                                         |
| Alignment  | `.ui-start-start`, default, `.ui-end-start`, `.ui-end-end`             | -       | Position modifiers on `.ui-badge`. Default is centered on the end edge.                         |
| Color      | `.ui-critical`, `.ui-info`, `.ui-neutral`,`.ui-success`, `.ui-warning` | -       | Color modifiers on `.ui-badge`.                                                                 |
| Variants   | `.ui-dot`                                                              | -       | Shape modifier on `.ui-badge`.                                                                  |
| Visibility | `.ui-invisible`                                                        | -       | Visibility modifier on `.ui-badge`.                                                             |

## Browser support

- Chromium: Full support Supported since v144.
- Firefox: Full support Supported since v151.
- Safari: Full support Supported since v26.

See also the [full browser support guide](https://open-props-ui.netlify.app/html/guide/browser-support.md).

## Source

### Dependencies

- [Anchor](https://open-props-ui.netlify.app/html/components/anchor.md)

- `opui-css/css/components/badge.css`
- `opui-css/css/components/anchor.css`

