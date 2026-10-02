# Chip

Chips are compact elements that represent an input, attribute, or action.

## Anatomy

Chip

- `.ui-chip`

  Container element. Can be a `<div>`, `<a>` or `<button>`.

- `<svg>`

  Optional content at the start, such as an icon.

- `.ui-text`

  The label.

- `<svg>`

  Optional content at the end, such as an icon.

## Variants

The Chip has two variants: tonal (default) and `.ui-outlined`.

```html
<div class="ui-chip ui-tonal">
  <span class="ui-text">Tonal</span>
</div>


<div class="ui-chip ui-outlined">
  <span class="ui-text">Outlined</span>
</div>
```

## Icon

The icon can be placed before or after the text.\
Make sure the text is wrapped in the `.ui-text` wrapper class.

```html
<div class="ui-chip ui-tonal">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M16.25 3A3.75 3.75 0 0 1 20 6.75v9a3.75 3.75 0 0 1-2.89 3.651l2.462 1.172a.75.75 0 0 1-.55 1.392l-.095-.038L13.83 19.5h-3.661l-5.097 2.427a.75.75 0 1 1-.645-1.354L6.89 19.4A3.75 3.75 0 0 1 4 15.75v-9A3.75 3.75 0 0 1 7.75 3zM8 15a1 1 0 1 0 0 2a1 1 0 0 0 0-2m8 0a1 1 0 1 0 0 2a1 1 0 0 0 0-2m.25-10.5h-8.5A2.25 2.25 0 0 0 5.5 6.75v5.75h13V6.75a2.25 2.25 0 0 0-2.25-2.25m-3 1.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1 0-1.5z"
    ></path>
  </svg>
  <span class="ui-text">Tonal</span>
</div>


<div class="ui-chip ui-outlined">
  <span class="ui-text">Outlined</span>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M16.25 3A3.75 3.75 0 0 1 20 6.75v9a3.75 3.75 0 0 1-2.89 3.651l2.462 1.172a.75.75 0 0 1-.55 1.392l-.095-.038L13.83 19.5h-3.661l-5.097 2.427a.75.75 0 1 1-.645-1.354L6.89 19.4A3.75 3.75 0 0 1 4 15.75v-9A3.75 3.75 0 0 1 7.75 3zM8 15a1 1 0 1 0 0 2a1 1 0 0 0 0-2m8 0a1 1 0 1 0 0 2a1 1 0 0 0 0-2m.25-10.5h-8.5A2.25 2.25 0 0 0 5.5 6.75v5.75h13V6.75a2.25 2.25 0 0 0-2.25-2.25m-3 1.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1 0-1.5z"
    ></path>
  </svg>
</div>
```

## Button

```html
<div class="example-row">
  <button class="ui-chip ui-tonal">
    <span class="ui-text">Tonal button</span>
  </button>
  <button class="ui-chip ui-outlined">
    <span class="ui-text">Outlined button</span>
  </button>
</div>
<div class="example-row">
  <button class="ui-chip ui-tonal">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
    >
      <path
        fill="currentColor"
        d="M29.907 5.14a1.25 1.25 0 0 1-.047 1.767l-19 18a1.25 1.25 0 0 1-1.775-.055l-6.75-7.25a1.25 1.25 0 0 1 1.83-1.704l5.89 6.327L28.14 5.093a1.25 1.25 0 0 1 1.767.047"
      ></path>
    </svg>
    <span class="ui-text">Open now</span>
  </button>
  <button class="ui-chip ui-outlined">
    <span class="ui-text">Sort by</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
    >
      <path
        fill="currentColor"
        d="M5.366 11.116a1.25 1.25 0 0 1 1.768 0L16 19.982l8.866-8.866a1.25 1.25 0 0 1 1.768 1.768l-9.75 9.75a1.25 1.25 0 0 1-1.768 0l-9.75-9.75a1.25 1.25 0 0 1 0-1.768"
      ></path>
    </svg>
  </button>
</div>
```

## Link

```html
<a href="#" class="ui-chip ui-tonal">
  <span class="ui-text">Tonal link</span>
</a>


<a href="#" class="ui-chip ui-outlined">
  <span class="ui-text">Outlined link</span>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
  >
    <path
      fill="currentColor"
      d="M7.75 5.5A2.25 2.25 0 0 0 5.5 7.75v16.5a2.25 2.25 0 0 0 2.25 2.25h16.5a2.25 2.25 0 0 0 2.25-2.25v-5a1.25 1.25 0 1 1 2.5 0v5A4.75 4.75 0 0 1 24.25 29H7.75A4.75 4.75 0 0 1 3 24.25V7.75A4.75 4.75 0 0 1 7.75 3h5a1.25 1.25 0 1 1 0 2.5zM18 4.25c0-.69.56-1.25 1.25-1.25h8.5c.69 0 1.25.56 1.25 1.25v8.5a1.25 1.25 0 1 1-2.5 0V7.268l-6.366 6.366a1.25 1.25 0 1 1-1.768-1.768L24.732 5.5H19.25c-.69 0-1.25-.56-1.25-1.25"
    ></path>
  </svg>
</a>
```

## Sizes

```html
<div class="ui-chip ui-tonal ui-small">
  <span class="ui-text">Small</span>
</div>


<div class="ui-chip ui-tonal">
  <span class="ui-text">Default</span>
</div>


<div class="ui-chip ui-tonal ui-multiline" style="max-width: 30ch">
  <span class="ui-text"
    >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
    sodales.</span
  >
</div>
```

## Disabled

Add disabled styling with the `disabled` attribute, `aria-disabled="true"` or the `.ui-disabled` class.

```html
<div class="example-row">
  <button class="ui-chip ui-tonal" disabled>
    <span class="ui-text">Tonal</span>
  </button>
  <button class="ui-chip ui-outlined" disabled>
    <span class="ui-text">Outlined</span>
  </button>
</div>
```

## API

### Chip API

| Type     | Modifiers                   | Default     | Description                            |
| -------- | --------------------------- | ----------- | -------------------------------------- |
| Layout   | `.ui-multiline`             | -           | Lets the label wrap to multiple lines. |
| Sizes    | `.ui-small`                 | -           | The size of the element.               |
| Variants | `.ui-outlined`, `.ui-tonal` | `.ui-tonal` | The variant to use.                    |

#### Parts

| Part       | Description                                               |
| ---------- | --------------------------------------------------------- |
| `.ui-chip` | Container element. Can be a `<div>`, `<a>` or `<button>`. |
| `<svg>`    | Optional content at the start, such as an icon.           |
| `.ui-text` | The label.                                                |
| `<svg>`    | Optional content at the end, such as an icon.             |

#### CSS variables

| Variable             | Default                                                                | Description                                                                                                                |
| -------------------- | ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `--border-color`     | `light-dark(var(--gray-4), var(--gray-12))`                            | Default border color for cards, lists, tables and dividers.                                                                |
| `--border-radius`    | `var(--size-2)`                                                        | Default corner radius for cards, callouts, tables and accordions.                                                          |
| `--border-width`     | `1px`                                                                  | Default border width for components that draw a border.                                                                    |
| `--disabled-opacity` | `0.64`                                                                 | Opacity applied to disabled controls.                                                                                      |
| `--icon-size-small`  | `var(--size-3)`                                                        | Icon size inside `Chip`.                                                                                                   |
| `--motion`           | `1`                                                                    | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. |
| `--surface-default`  | `light-dark(var(--gray-1), var(--gray-13))`                            | Page and card background.                                                                                                  |
| `--surface-tonal`    | `light-dark(var(--gray-3), var(--gray-12))`                            | Background of tonal variants.                                                                                              |
| `--text-disabled`    | `color-mix( in oklch, var(--text-muted) 50%, var(--surface-default) )` | Text color of disabled buttons and chips.                                                                                  |
| `--text-primary`     | `light-dark(var(--gray-15), var(--gray-1))`                            | Emphasized text color for headings, labels and values.                                                                     |

Theme tokens this component reads. Override them on `html`or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md)for the full list.

## Browser support

- Chromium: Full support Supported since v125.
- Firefox: Full support Supported since v128.
- Safari: Full support Supported since v18.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/html/guide/browser-support/?components=Chip.md).

## Installation

- `opui-css/css/components/chip.css`

