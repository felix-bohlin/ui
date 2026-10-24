# Button

Buttons do things, like saving a form or opening a dialog. For filters, tags and choices, use a [Chip](https://open-props-ui.netlify.app/html/components/chip.md).

## Anatomy

- `.ui-button`

  Container element.

- `<svg>`

  An optional icon.

- `<kbd>`

  An optional keyboard hint.

## Variants

Change the button variant with the `.ui-outlined`, `.ui-tonal`, and `.ui-filled` classes.

```html
<div class="example-row">
  <button type="button" class="ui-button">Transparent</button>
  <button type="button" class="ui-button" disabled>Disabled</button>
  <a class="ui-button" href="#">Link</a>
  <a class="ui-button" href="#" aria-current="page">Current</a>
</div>
<div class="example-row">
  <button type="button" class="ui-button ui-outlined">Outlined</button>
  <button type="button" class="ui-button ui-outlined" disabled>Disabled</button>
  <a class="ui-button ui-outlined" href="#">Link</a>
</div>
<div class="example-row">
  <button type="button" class="ui-button ui-tonal">Tonal</button>
  <button type="button" class="ui-button ui-tonal" disabled>Disabled</button>
  <a class="ui-button ui-tonal" href="#">Link</a>
</div>
<div class="example-row">
  <button type="button" class="ui-button ui-filled">Filled</button>
  <button type="button" class="ui-button ui-filled" disabled>Disabled</button>
  <a class="ui-button ui-filled" href="#">Link</a>
</div>
```

A transparent (text) button link with `aria-current="page"` keeps the pressed background, to mark the current page in navigation. Outlined, tonal and filled buttons don't change.

## Colors

Add a `.ui-critical` or `.ui-primary` class to apply a destructive or brand color. The default is a neutral gray.

```html
<div class="example-row">
  <button type="button" class="ui-button ui-critical">Critical</button>
  <button type="button" class="ui-button ui-critical ui-outlined">
    Outlined
  </button>
  <button type="button" class="ui-button ui-critical ui-tonal">Tonal</button>
  <button type="button" class="ui-button ui-critical ui-filled">Filled</button>
</div>
<div class="example-row">
  <button type="button" class="ui-button ui-primary">Primary</button>
  <button type="button" class="ui-button ui-primary ui-outlined">
    Outlined
  </button>
  <button type="button" class="ui-button ui-primary ui-tonal">Tonal</button>
  <button type="button" class="ui-button ui-primary ui-filled">Filled</button>
</div>
```

## Sizes

Resize any button with the `.ui-x-small`, `.ui-small` and `.ui-large` classes.

```html
<button type="button" class="ui-button ui-x-small">X-small</button>
<button type="button" class="ui-button ui-small">Small</button>
<button type="button" class="ui-button">Medium</button>
<button type="button" class="ui-button ui-large">Large</button>

<button type="button" class="ui-button ui-filled ui-x-small">X-small</button>
<button type="button" class="ui-button ui-filled ui-small">Small</button>
<button type="button" class="ui-button ui-filled">Medium</button>
<button type="button" class="ui-button ui-filled ui-large">Large</button>

<button type="button" class="ui-button ui-outlined ui-x-small">
  <span class="ui-text">X-small</span>
  <svg aria-hidden="true"><!-- --></svg>
</button>
<button type="button" class="ui-button ui-outlined ui-small">
  <span class="ui-text">Small</span>
  <svg aria-hidden="true"><!-- --></svg>
</button>
<button type="button" class="ui-button ui-outlined">
  <span class="ui-text">Medium</span>
  <svg aria-hidden="true"><!-- --></svg>
</button>
<button type="button" class="ui-button ui-outlined ui-large">
  <span class="ui-text">Large</span>
  <svg aria-hidden="true"><!-- --></svg>
</button>
```

## Buttons with icon and label

Include an icon alongside text by nesting an SVG element within the button. Wrap the label in a `<span class="ui-text">`. The CSS looks for the wrapper element, the class is a hook for your own styles. The wrapper tightens the padding on the icon side, and a button whose only element is an `svg` is styled as icon-only, even with text next to it.

```html
<button type="button" class="ui-button">
  <span class="ui-text">Text</span>
  <svg aria-hidden="true"><!-- --></svg>
</button>
<button type="button" class="ui-button ui-outlined">
  <span class="ui-text">Outlined</span>
  <svg aria-hidden="true"><!-- --></svg>
</button>
<button type="button" class="ui-button ui-tonal">
  <span class="ui-text">Tonal</span>
  <svg aria-hidden="true"><!-- --></svg>
</button>
<button type="button" class="ui-button ui-filled">
  <span class="ui-text">Filled</span>
  <svg aria-hidden="true"><!-- --></svg>
</button>

<button type="button" class="ui-button">
  <svg aria-hidden="true"><!-- --></svg>
  <span class="ui-text">Text</span>
</button>
<button type="button" class="ui-button ui-outlined">
  <svg aria-hidden="true"><!-- --></svg>
  <span class="ui-text">Outlined</span>
</button>
<button type="button" class="ui-button ui-tonal">
  <svg aria-hidden="true"><!-- --></svg>
  <span class="ui-text">Tonal</span>
</button>
<button type="button" class="ui-button ui-filled">
  <svg aria-hidden="true"><!-- --></svg>
  <span class="ui-text">Filled</span>
</button>
```

## Keyboard

Use the `<kbd>` element to provide keyboard hints within a button.

```html
<button type="button" class="ui-button">Terminal <kbd>Ctrl+Alt+T</kbd></button>
<button type="button" class="ui-button ui-outlined">
  Spotlight <kbd>⌘Space</kbd>
</button>
<button type="button" class="ui-button ui-tonal">Lock <kbd>Win+L</kbd></button>
```

## Icon-only

Name a button whose only child is an `svg` with `aria-label`. Add `.ui-round` for a circle.

```html
<div class="example-row">
  <button type="button" class="ui-button" aria-label="Edit">
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
    >
      <path
        fill="currentColor"
        d="M21.65 3.434a4.889 4.889 0 1 1 6.915 6.914l-.902.901l-6.914-6.914zM19.335 5.75L4.357 20.73a3.7 3.7 0 0 0-1.002 1.84l-1.333 6.22a1 1 0 0 0 1.188 1.188l6.22-1.333a3.7 3.7 0 0 0 1.84-1.002l14.98-14.98z"
      ></path>
    </svg>
  </button>
  <button type="button" class="ui-button ui-round" aria-label="Edit">
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
    >
      <path
        fill="currentColor"
        d="M21.65 3.434a4.889 4.889 0 1 1 6.915 6.914l-.902.901l-6.914-6.914zM19.335 5.75L4.357 20.73a3.7 3.7 0 0 0-1.002 1.84l-1.333 6.22a1 1 0 0 0 1.188 1.188l6.22-1.333a3.7 3.7 0 0 0 1.84-1.002l14.98-14.98z"
      ></path>
    </svg>
  </button>
</div>
<div class="example-row">
  <button type="button" class="ui-button ui-outlined" aria-label="Edit">
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
    >
      <path
        fill="currentColor"
        d="M21.65 3.434a4.889 4.889 0 1 1 6.915 6.914l-.902.901l-6.914-6.914zM19.335 5.75L4.357 20.73a3.7 3.7 0 0 0-1.002 1.84l-1.333 6.22a1 1 0 0 0 1.188 1.188l6.22-1.333a3.7 3.7 0 0 0 1.84-1.002l14.98-14.98z"
      ></path>
    </svg>
  </button>
  <button
    type="button"
    class="ui-button ui-round ui-outlined"
    aria-label="Edit"
  >
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
    >
      <path
        fill="currentColor"
        d="M21.65 3.434a4.889 4.889 0 1 1 6.915 6.914l-.902.901l-6.914-6.914zM19.335 5.75L4.357 20.73a3.7 3.7 0 0 0-1.002 1.84l-1.333 6.22a1 1 0 0 0 1.188 1.188l6.22-1.333a3.7 3.7 0 0 0 1.84-1.002l14.98-14.98z"
      ></path>
    </svg>
  </button>
</div>
<div class="example-row">
  <button type="button" class="ui-button ui-tonal" aria-label="Edit">
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
    >
      <path
        fill="currentColor"
        d="M21.65 3.434a4.889 4.889 0 1 1 6.915 6.914l-.902.901l-6.914-6.914zM19.335 5.75L4.357 20.73a3.7 3.7 0 0 0-1.002 1.84l-1.333 6.22a1 1 0 0 0 1.188 1.188l6.22-1.333a3.7 3.7 0 0 0 1.84-1.002l14.98-14.98z"
      ></path>
    </svg>
  </button>
  <button type="button" class="ui-button ui-round ui-tonal" aria-label="Edit">
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
    >
      <path
        fill="currentColor"
        d="M21.65 3.434a4.889 4.889 0 1 1 6.915 6.914l-.902.901l-6.914-6.914zM19.335 5.75L4.357 20.73a3.7 3.7 0 0 0-1.002 1.84l-1.333 6.22a1 1 0 0 0 1.188 1.188l6.22-1.333a3.7 3.7 0 0 0 1.84-1.002l14.98-14.98z"
      ></path>
    </svg>
  </button>
</div>
<div class="example-row">
  <button type="button" class="ui-button ui-filled" aria-label="Edit">
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
    >
      <path
        fill="currentColor"
        d="M21.65 3.434a4.889 4.889 0 1 1 6.915 6.914l-.902.901l-6.914-6.914zM19.335 5.75L4.357 20.73a3.7 3.7 0 0 0-1.002 1.84l-1.333 6.22a1 1 0 0 0 1.188 1.188l6.22-1.333a3.7 3.7 0 0 0 1.84-1.002l14.98-14.98z"
      ></path>
    </svg>
  </button>
  <button type="button" class="ui-button ui-round ui-filled" aria-label="Edit">
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
    >
      <path
        fill="currentColor"
        d="M21.65 3.434a4.889 4.889 0 1 1 6.915 6.914l-.902.901l-6.914-6.914zM19.335 5.75L4.357 20.73a3.7 3.7 0 0 0-1.002 1.84l-1.333 6.22a1 1 0 0 0 1.188 1.188l6.22-1.333a3.7 3.7 0 0 0 1.84-1.002l14.98-14.98z"
      ></path>
    </svg>
  </button>
</div>
<div class="example-row">
  <button
    type="button"
    class="ui-button ui-round ui-x-small ui-tonal"
    aria-label="Edit"
  >
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
    >
      <path
        fill="currentColor"
        d="M21.65 3.434a4.889 4.889 0 1 1 6.915 6.914l-.902.901l-6.914-6.914zM19.335 5.75L4.357 20.73a3.7 3.7 0 0 0-1.002 1.84l-1.333 6.22a1 1 0 0 0 1.188 1.188l6.22-1.333a3.7 3.7 0 0 0 1.84-1.002l14.98-14.98z"
      ></path>
    </svg>
  </button>
  <button
    type="button"
    class="ui-button ui-round ui-small ui-tonal"
    aria-label="Edit"
  >
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
    >
      <path
        fill="currentColor"
        d="M21.65 3.434a4.889 4.889 0 1 1 6.915 6.914l-.902.901l-6.914-6.914zM19.335 5.75L4.357 20.73a3.7 3.7 0 0 0-1.002 1.84l-1.333 6.22a1 1 0 0 0 1.188 1.188l6.22-1.333a3.7 3.7 0 0 0 1.84-1.002l14.98-14.98z"
      ></path>
    </svg>
  </button>
  <button type="button" class="ui-button ui-round ui-tonal" aria-label="Edit">
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
    >
      <path
        fill="currentColor"
        d="M21.65 3.434a4.889 4.889 0 1 1 6.915 6.914l-.902.901l-6.914-6.914zM19.335 5.75L4.357 20.73a3.7 3.7 0 0 0-1.002 1.84l-1.333 6.22a1 1 0 0 0 1.188 1.188l6.22-1.333a3.7 3.7 0 0 0 1.84-1.002l14.98-14.98z"
      ></path>
    </svg>
  </button>
  <button
    type="button"
    class="ui-button ui-round ui-large ui-tonal"
    aria-label="Edit"
  >
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
    >
      <path
        fill="currentColor"
        d="M21.65 3.434a4.889 4.889 0 1 1 6.915 6.914l-.902.901l-6.914-6.914zM19.335 5.75L4.357 20.73a3.7 3.7 0 0 0-1.002 1.84l-1.333 6.22a1 1 0 0 0 1.188 1.188l6.22-1.333a3.7 3.7 0 0 0 1.84-1.002l14.98-14.98z"
      ></path>
    </svg>
  </button>
</div>
```

## Disabled

Disable the button with the `disabled` attribute. Links can't be disabled, so remove the `href` of an `<a>` and add `aria-disabled="true"`. The link can't be clicked or focused.

```html
<button type="button" class="ui-button" disabled>Text</button>
<a class="ui-button" aria-disabled="true">Text link</a>
```

## File upload

Is it a button? Is it an input? You can find the [docs for it here](https://open-props-ui.netlify.app/html/components/text-field.md#file) at least.

## API

### Button API

| Type     | Modifiers                                          | Default | Description                                                                                                                 |
| -------- | -------------------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------- |
| Colors   | `.ui-critical`, `.ui-primary`                      | -       | Optional colors.                                                                                                            |
| Current  | `[aria-current="page"]`                            | -       | Keeps the pressed background on a transparent (text) button link, for the current page in navigation.                       |
| Shape    | `.ui-round`                                        | -       | Fully rounded corners, a circle when icon-only.                                                                             |
| Sizes    | default, `.ui-large`, `.ui-small`, `.ui-x-small`   | default | The size of the element.                                                                                                    |
| State    | `[disabled]`, `a[aria-disabled="true"]`            | -       | Disables the button. A link button, which can't take `disabled`, drops its `href` and takes `aria-disabled="true"` instead. |
| Variants | default, `.ui-filled`, `.ui-outlined`, `.ui-tonal` | default | The variant to use.                                                                                                         |

#### Parts

| Part         | Description                |
| ------------ | -------------------------- |
| `.ui-button` | Container element.         |
| `<svg>`      | An optional icon.          |
| `<kbd>`      | An optional keyboard hint. |

### CSS variables

| Variable                             | Default                                                                                                                                                                                                                  | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--ui-border-width`                  | `1px`                                                                                                                                                                                                                    | Default border width for components that draw a border.                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `--ui-button-accent`                 | Unset                                                                                                                                                                                                                    | Color of `Button` and `ButtonGroup` without `.ui-primary` or `.ui-critical`: the fill of filled buttons, the text and border of outlined and text buttons. When unset, the darkest palette color in light mode and the lightest in dark mode.                                                                                                                                                                                                                                 |
| `--ui-button-accent-filled`          | Unset                                                                                                                                                                                                                    | Fill of `Button` and `ButtonGroup` with `.ui-filled` and no `.ui-primary` or `.ui-critical`, and of hovered outlined and tonal ones. When unset, `--ui-button-accent`, so text, outlined and filled buttons share one color.                                                                                                                                                                                                                                                  |
| `--ui-button-font-weight`            | Unset                                                                                                                                                                                                                    | Font weight of `Button`. When unset, buttons follow `--ui-font-weight-bold`.                                                                                                                                                                                                                                                                                                                                                                                                  |
| `--ui-button-hover-shadow`           | Unset                                                                                                                                                                                                                    | Shadow of `Button` with `.ui-filled`, `.ui-outlined` or `.ui-tonal` on hover. When unset, it keeps `--ui-shadow-control`.                                                                                                                                                                                                                                                                                                                                                     |
| `--ui-button-hover-translate`        | Unset                                                                                                                                                                                                                    | Moves `Button` with `.ui-filled`, `.ui-outlined` or `.ui-tonal` on hover, as a `translate` value. Pair it with `--ui-button-hover-shadow` to press buttons into their shadow. `none` when unset.                                                                                                                                                                                                                                                                              |
| `--ui-button-on-accent`              | Unset                                                                                                                                                                                                                    | Text color on a filled `--ui-button-accent` button. Set it with `--ui-button-accent`.                                                                                                                                                                                                                                                                                                                                                                                         |
| `--ui-button-on-accent-filled`       | Unset                                                                                                                                                                                                                    | Text color on a `--ui-button-accent-filled` fill. Set it with `--ui-button-accent-filled`.                                                                                                                                                                                                                                                                                                                                                                                    |
| `--ui-button-padding-inline`         | Unset                                                                                                                                                                                                                    | Horizontal padding of `Button`. When unset, `1.5ex`, which scales with the font.                                                                                                                                                                                                                                                                                                                                                                                              |
| `--ui-button-padding-inline-large`   | Unset                                                                                                                                                                                                                    | Horizontal padding of `Button` with `.ui-large`. When unset, `2.5ex`.                                                                                                                                                                                                                                                                                                                                                                                                         |
| `--ui-button-padding-inline-small`   | Unset                                                                                                                                                                                                                    | Horizontal padding of `Button` with `.ui-small`. When unset, `1.25ex`.                                                                                                                                                                                                                                                                                                                                                                                                        |
| `--ui-button-padding-inline-x-small` | Unset                                                                                                                                                                                                                    | Horizontal padding of `Button` with `.ui-x-small`. When unset, `1ex`.                                                                                                                                                                                                                                                                                                                                                                                                         |
| `--ui-button-radius`                 | Unset                                                                                                                                                                                                                    | Corner radius for `Button`, `ButtonGroup`, `ToggleButton` and `ToggleGroup`. When unset, they follow `--ui-radius`, also where it's set on a part of the page.                                                                                                                                                                                                                                                                                                                |
| `--ui-button-size`                   | `var(--ui-control-size)`                                                                                                                                                                                                 | Default `Button` height.                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `--ui-button-size-large`             | `var(--ui-control-size-large)`                                                                                                                                                                                           | `Button` height with `.ui-large`.                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `--ui-button-size-small`             | `var(--ui-control-size-small)`                                                                                                                                                                                           | `Button` height with `.ui-small`.                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `--ui-button-size-x-small`           | `var(--ui-control-size-x-small)`                                                                                                                                                                                         | `Button` and `ButtonGroup` height with `.ui-x-small`.                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `--ui-control-border-color`          | Unset                                                                                                                                                                                                                    | Border color of controls without a fill: `Button` with `.ui-outlined`, the edge and dividers of an outlined `ButtonGroup`, `ToggleButton`, `ToggleGroup`, `Chip` with `.ui-outlined`, the track of `Tabs` with `.ui-outlined`, and the selected `Tabs` pill. When unset, outlined buttons use their color, the selected `Tabs` pill `--ui-field-border-color` and the rest `--ui-border-color`. Themes that outline controls like fields set it to `--ui-field-border-color`. |
| `--ui-control-border-color-filled`   | Unset                                                                                                                                                                                                                    | Border color of controls with a fill: `Button` with `.ui-filled` or `.ui-tonal`, the edge and dividers of a `ButtonGroup` with one of them, a checked `ToggleButton`, `Chip` without `.ui-outlined` and the `Carousel` buttons. When unset, buttons have no visible border, the carousel buttons use a shade of their fill and the rest use `--ui-border-color`. Set it with `--ui-control-border-color` to outline every control.                                            |
| `--ui-critical`                      | `var(--ui-red)`                                                                                                                                                                                                          | Severity color for errors and destructive actions.                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `--ui-critical-text`                 | `light-dark( oklch(from var(--ui-critical) min(l, var(--ui-text-max-lightness)) c h), oklch( from var(--ui-critical) max(l, var(--ui-text-min-lightness)) min(c, var(--ui-text-max-chroma)) h ) )`                       | Critical as a text color: the `.ui-critical` items of a `Menu`, and a `.ui-critical` `Button` with no variant or `.ui-outlined`. `--ui-critical` with its lightness kept within `--ui-text-max-lightness` and `--ui-text-min-lightness`.                                                                                                                                                                                                                                      |
| `--ui-disabled-opacity`              | `0.64`                                                                                                                                                                                                                   | Opacity applied to disabled controls.                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `--ui-duration-fast`                 | `0.1s`                                                                                                                                                                                                                   | Transition duration for hover and press feedback.                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `--ui-ease`                          | `ease`                                                                                                                                                                                                                   | Default easing for transitions.                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `--ui-field-border-color`            | `color-mix( in oklch, var(--ui-text-strong) var(--ui-field-border-strength), var(--ui-surface) )`                                                                                                                        | Border color of every empty control: `TextField`, `Select`, `Textarea`, the unchecked `Checkbox`, `Radio` and `Switch` unless `--ui-choice-border-color` is set, the `Range` track and the `Progress` outline. `--ui-text-strong` mixed into `--ui-surface` at `--ui-field-border-strength`, so it reaches 3:1. Lighter than `--ui-border-color`, which is decorative, is a choice a theme can make.                                                                          |
| `--ui-field-border-width`            | `1px`                                                                                                                                                                                                                    | Border width for fields, `Checkbox`, `Radio` and `Switch`.                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `--ui-fill-max-lightness`            | `0.48`                                                                                                                                                                                                                   | The highest OKLCH lightness of an intent color used as a fill under light text: the critical, info, neutral and success `Badge`, and the fills of critical `Button`s, also in a critical `ButtonGroup`. Borders keep the intent color. `0.48`, and `0.45` with more contrast.                                                                                                                                                                                                 |
| `--ui-focus-ring-offset`             | `2px`                                                                                                                                                                                                                    | Distance between a control and its focus ring.                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `--ui-focus-ring-width`              | `2px`                                                                                                                                                                                                                    | Width of the focus ring.                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `--ui-font-code`                     | `var(--font-mono)`                                                                                                                                                                                                       | Font family for `code`, `kbd`, `samp` and `pre` in rich text, `.ui-kbd`, `.ui-samp`, `.ui-var`, code blocks and `kbd` in buttons and lists. Defaults to Open Props `--font-mono`.                                                                                                                                                                                                                                                                                             |
| `--ui-font-size-caption`             | `var(--ui-font-size-100)`                                                                                                                                                                                                | Font size of captions, `Badge`, `Chip`, `Divider` labels, `List` secondary text, `Menu` shortcuts, overlines, `small`, `figcaption` and x-small buttons, toggles and fields. Defaults to `--ui-font-size-100`.                                                                                                                                                                                                                                                                |
| `--ui-font-size-control`             | `var(--ui-font-size-300)`                                                                                                                                                                                                | Font size of the default `Button`, `Select`, `Tabs`, `TextField`, `Textarea` and `ToggleButton`. Small and x-small sizes read `--ui-font-size-small` and `--ui-font-size-caption`. Defaults to `--ui-font-size-300`.                                                                                                                                                                                                                                                          |
| `--ui-font-size-small`               | `var(--ui-font-size-200)`                                                                                                                                                                                                | Font size of helper text, `Callout`, `Table`, `Tooltip`, code blocks, dense `List` text and small buttons, chips, toggles and fields. Defaults to `--ui-font-size-200`.                                                                                                                                                                                                                                                                                                       |
| `--ui-font-weight-bold`              | `var(--font-weight-7)`                                                                                                                                                                                                   | Font weight for headings, buttons and terms.                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `--ui-font-weight-normal`            | `var(--font-weight-4)`                                                                                                                                                                                                   | Font weight for body text, `List` text and `Button` keyboard shortcuts.                                                                                                                                                                                                                                                                                                                                                                                                       |
| `--ui-line-height-tight`             | `1.25`                                                                                                                                                                                                                   | Line height of single-line controls and compact text: field inputs, `Table` cells, `Tooltip`, `Card` captions and keyboard hints in buttons.                                                                                                                                                                                                                                                                                                                                  |
| `--ui-motion`                        | `1`                                                                                                                                                                                                                      | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/html/guide/theming.md#motion).                                                                                                                                                                                                                                                                      |
| `--ui-on-accent`                     | `var(--ui-gray-1)`                                                                                                                                                                                                       | Near-white text on a saturated fill in both modes: critical buttons, severity `Badge`s and the checked choice mark in dark mode.                                                                                                                                                                                                                                                                                                                                              |
| `--ui-on-primary`                    | `oklch( from var(--ui-primary) clamp(0.15, (0.565 - l) * 1000, 0.98) calc(c * 0.15) h )`                                                                                                                                 | Text color on `--ui-primary`. Derived with relative color: near-black when the primary's lightness is above 0.565, near-white below, tinted with 15% of its chroma, so a custom `--ui-primary` gets readable text.                                                                                                                                                                                                                                                            |
| `--ui-on-primary-tonal`              | Unset                                                                                                                                                                                                                    | Text color on `--ui-primary-tonal`. Set it with `--ui-primary-tonal`.                                                                                                                                                                                                                                                                                                                                                                                                         |
| `--ui-palette-on-strong`             | `light-dark(var(--ui-color-1), var(--ui-color-16))`                                                                                                                                                                      | Text color on `--ui-palette-strong`.                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `--ui-palette-on-tint`               | `var(--ui-text-strong)`                                                                                                                                                                                                  | Text color on `--ui-palette-tint`.                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `--ui-palette-strong`                | `light-dark(var(--ui-color-16), var(--ui-color-1))`                                                                                                                                                                      | The strongest shade of the current palette, the darkest in light mode and the lightest in dark mode, with the most contrast against the page: `Callout` text, the default `Button` fill when `--ui-button-accent` is unset. Severity `Chip` text reads it. Re-derived inside every severity scope.                                                                                                                                                                            |
| `--ui-palette-tint`                  | `light-dark( oklch( from var(--ui-color-6) max(l, var(--ui-palette-tint-min-lightness)) c h ), oklch( from var(--ui-color-11) min(l, var(--ui-palette-tint-max-lightness)) c h ) )`                                      | The tonal fill of the current palette: primary and critical tonal buttons when `--ui-primary-tonal` is unset. Stronger with more contrast. Re-derived inside every severity scope.                                                                                                                                                                                                                                                                                            |
| `--ui-primary`                       | `light-dark( oklch( from var(--ui-primary-source) min(l, var(--ui-primary-max-lightness)) c h ), oklch( from var(--ui-primary-source) max(l, var(--ui-primary-min-lightness)) min(c, var(--ui-accent-max-chroma)) h ) )` | Brand color for primary actions and accents. Derived from `--ui-primary-source` within `--ui-primary-max-lightness` and `--ui-primary-min-lightness`. Set `--ui-primary-source` to keep more contrast working, or this token to pin the color.                                                                                                                                                                                                                                |
| `--ui-primary-text`                  | `light-dark( oklch(from var(--ui-primary) min(l, var(--ui-text-max-lightness)) c h), oklch( from var(--ui-primary) max(l, var(--ui-text-min-lightness)) min(c, var(--ui-text-max-chroma)) h ) )`                         | Primary as a text color: links, rich text links, `Callout` link hover, `Button` and `ButtonGroup` with `.ui-primary` and no variant or `.ui-outlined`, and a selected `Select` option. Defaults to `--ui-primary` with its lightness kept within `--ui-text-max-lightness` and `--ui-text-min-lightness`, and is derived again from the more-contrast primary. Set it when the primary needs another shade for text.                                                          |
| `--ui-primary-tonal`                 | Unset                                                                                                                                                                                                                    | Background of `Button` and `ButtonGroup` with `.ui-primary` and `.ui-tonal`. When unset, a light tint of the palette. Material's `primary-container` and shadcn's `secondary` go here.                                                                                                                                                                                                                                                                                        |
| `--ui-radius`                        | `var(--size-2)`                                                                                                                                                                                                          | Corner radius for every component: cards, callouts, menus, buttons and fields follow it, and small parts like `kbd`, tooltips and checkboxes never get rounder than it. Set it to `0` for square corners. Takes a single length.                                                                                                                                                                                                                                              |
| `--ui-radius-round`                  | `var(--radius-round)`                                                                                                                                                                                                    | The pill radius for round buttons, avatars, badges, chips, radios, switches, the range track and the carousel buttons and markers.                                                                                                                                                                                                                                                                                                                                            |
| `--ui-radius-small`                  | `min(var(--radius-2), var(--ui-radius))`                                                                                                                                                                                 | Corner radius of small parts: `kbd`, inline `code`, `mark`, `var`, `Tooltip`, the file input and a square `Avatar` image. `--ui-radius`, capped at 5px.                                                                                                                                                                                                                                                                                                                       |
| `--ui-shadow-control`                | `none`                                                                                                                                                                                                                   | Shadow of buttons with a variant, standalone `ToggleButton`, outlined `Chip` and fields. `none` by default, for themes that lift controls off the page.                                                                                                                                                                                                                                                                                                                       |
| `--ui-shadow-field`                  | Unset                                                                                                                                                                                                                    | Shadow of `TextField`, `Textarea` and `Select` fields. When unset, they follow `--ui-shadow-control`. Set it to `none` to lift buttons but keep fields flat.                                                                                                                                                                                                                                                                                                                  |
| `--ui-space-1`                       | `calc(var(--size-1) * var(--ui-space-scale))`                                                                                                                                                                            | Spacing step 1: Open Props `--size-1` times `--ui-space-scale`.                                                                                                                                                                                                                                                                                                                                                                                                               |
| `--ui-space-2`                       | `calc(var(--size-2) * var(--ui-space-scale))`                                                                                                                                                                            | Spacing step 2: Open Props `--size-2` times `--ui-space-scale`.                                                                                                                                                                                                                                                                                                                                                                                                               |
| `--ui-space-3`                       | `calc(var(--size-3) * var(--ui-space-scale))`                                                                                                                                                                            | Spacing step 3: Open Props `--size-3` times `--ui-space-scale`.                                                                                                                                                                                                                                                                                                                                                                                                               |
| `--ui-state-active-alpha-accent`     | `25%`                                                                                                                                                                                                                    | Alpha of the pressed state layer on primary and critical buttons.                                                                                                                                                                                                                                                                                                                                                                                                             |
| `--ui-state-active-alpha-dark`       | `30%`                                                                                                                                                                                                                    | Alpha of the pressed state layer on neutral buttons in dark mode. `30%`, and `20%` with more contrast so the text keeps 7:1.                                                                                                                                                                                                                                                                                                                                                  |
| `--ui-state-active-alpha-light`      | `20%`                                                                                                                                                                                                                    | Alpha of the pressed state layer on neutral buttons in light mode.                                                                                                                                                                                                                                                                                                                                                                                                            |
| `--ui-state-hover-alpha-accent`      | `15%`                                                                                                                                                                                                                    | Alpha of the hover state layer on primary and critical buttons.                                                                                                                                                                                                                                                                                                                                                                                                               |
| `--ui-state-hover-alpha-dark`        | `20%`                                                                                                                                                                                                                    | Alpha of the hover state layer on neutral buttons in dark mode.                                                                                                                                                                                                                                                                                                                                                                                                               |
| `--ui-state-hover-alpha-light`       | `10%`                                                                                                                                                                                                                    | Alpha of the hover state layer on neutral buttons in light mode.                                                                                                                                                                                                                                                                                                                                                                                                              |
| `--ui-surface-tonal`                 | `light-dark(var(--ui-gray-3), var(--ui-gray-12))`                                                                                                                                                                        | Background of tonal variants.                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `--ui-text`                          | `light-dark( color-mix( in oklch, var(--ui-text-strong) var(--ui-text-strength-light), var(--ui-surface) ), color-mix( in oklch, var(--ui-text-strong) var(--ui-text-strength-dark), var(--ui-surface) ) )`              | Body text color. `--ui-text-strong` mixed into `--ui-surface` at `--ui-text-strength-light` or `--ui-text-strength-dark`.                                                                                                                                                                                                                                                                                                                                                     |
| `--ui-text-disabled`                 | `color-mix( in oklch, var(--ui-text) var(--ui-text-disabled-strength), var(--ui-surface) )`                                                                                                                              | Text color of disabled buttons and chips. `--ui-text` mixed into `--ui-surface` at `--ui-text-disabled-strength`. Also the label and border of an unchecked disabled `ToggleButton`.                                                                                                                                                                                                                                                                                          |
| `--ui-text-max-chroma`               | `0.1`                                                                                                                                                                                                                    | The highest OKLCH chroma of the intent text roles in dark mode, which keeps a light color inside sRGB. `0.1`. Also caps the dark mode text of `Button` and `ButtonGroup` without `.ui-primary` or `.ui-critical`.                                                                                                                                                                                                                                                             |
| `--ui-text-min-lightness`            | `0.8`                                                                                                                                                                                                                    | The lowest OKLCH lightness of the intent text roles in dark mode, so they keep 4.5:1 on every surface. `0.8`, and `0.9` with more contrast. Their chroma is also capped at `--ui-text-max-chroma` in dark mode. Also the lowest lightness of `Button` and `ButtonGroup` text without `.ui-primary` or `.ui-critical` in dark mode.                                                                                                                                            |

The stylesheets on this page read these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md).

## Component properties

Set these on the component itself, inline or in your own CSS. Inputs are the knobs. Outputs are derived from the inputs and the current state, so overriding one fixes it in every state. [Customizing](https://open-props-ui.netlify.app/html/guide/customizing.md#component-properties) has examples.

| Property                          | Kind   | Description                                                                                                                                                                                                                                                                                                                                      |
| --------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `--_accent`                       | Input  | The accent color. Fills, borders, text, hover and active states are derived from it. Defaults to `--ui-button-accent` when a theme sets it. `.ui-primary` and `.ui-critical` set it.                                                                                                                                                             |
| `--_accent-fill`                  | Input  | Fill of filled buttons and of hovered outlined and tonal buttons, and the base of the filled hover and pressed shades. `--ui-button-accent-filled` when a theme sets it, else `--_accent`, and in `.ui-critical` `--ui-critical` kept within `--ui-fill-max-lightness`, so the light text stays readable while the border keeps `--ui-critical`. |
| `--_accent-text`                  | Output | Text color of text and outlined buttons. `--_accent` in light mode. In dark mode its lightness is at least `--ui-text-min-lightness` and its chroma within `--ui-text-max-chroma`. `--ui-primary-text` in `.ui-primary` and `--ui-critical-text` in `.ui-critical`.                                                                              |
| `--_accent-tonal`                 | Input  | Background of `.ui-tonal`. `--ui-surface-tonal`, a palette tint in `.ui-critical`, and `--ui-primary-tonal` or the tint in `.ui-primary`.                                                                                                                                                                                                        |
| `--_actions-shift`                | Output | How far a text button at the start or end of `Card`, `Accordion` and `Dialog` actions pulls itself out, so its label lines up with the content: its padding and border, capped so the focus ring stays inside the card.                                                                                                                          |
| `--_bg-color`                     | Output | The current background. Set by the variant, hover and active states.                                                                                                                                                                                                                                                                             |
| `--_border-color`                 | Output | The current border color. Set by the variant and states.                                                                                                                                                                                                                                                                                         |
| `--_border-width`                 | Input  | The border width.                                                                                                                                                                                                                                                                                                                                |
| `--_default-active-bg-color`      | Output | Pressed and current-page background of text buttons, from `--_accent`. As light as the hover background in dark mode with more contrast, so the text keeps 7:1.                                                                                                                                                                                  |
| `--_default-hover-bg-color`       | Output | Hover background of text buttons, from `--_accent`.                                                                                                                                                                                                                                                                                              |
| `--_duration`                     | Output | Duration of the transitions, `--ui-duration-fast` times `--_motion`.                                                                                                                                                                                                                                                                             |
| `--_ease`                         | Input  | Easing of the transitions. Defaults to `--ui-ease`.                                                                                                                                                                                                                                                                                              |
| `--_filled-active-bg-color`       | Output | Pressed background of filled buttons, from `--_accent`.                                                                                                                                                                                                                                                                                          |
| `--_filled-hover-bg-color`        | Output | Hover background of filled buttons, from `--_accent`.                                                                                                                                                                                                                                                                                            |
| `--_font-size`                    | Input  | The font size. Set by `.ui-x-small` and `.ui-small`.                                                                                                                                                                                                                                                                                             |
| `--_icon-size`                    | Input  | The size of a direct child `svg`. Icon-only buttons scale it with `--_size`.                                                                                                                                                                                                                                                                     |
| `--_motion`                       | Input  | Motion multiplier for the transitions. `0` turns them off.                                                                                                                                                                                                                                                                                       |
| `--_on-accent`                    | Input  | Text color on a fill of `--_accent`. Defaults to `--ui-button-on-accent` when a theme sets it. `.ui-primary` sets `--ui-on-primary`, `.ui-critical` `--ui-on-accent`.                                                                                                                                                                            |
| `--_on-accent-fill`               | Input  | Text color on `--_accent-fill`: filled buttons, and hovered outlined and tonal ones. `--ui-button-on-accent-filled` when a theme sets it, else `--_on-accent`.                                                                                                                                                                                   |
| `--_on-accent-tonal`              | Input  | Text color of `.ui-tonal`.                                                                                                                                                                                                                                                                                                                       |
| `--_outlined-active-bg-color`     | Output | Pressed background of outlined and tonal buttons, from `--_accent`. The pressed state layer with `--ui-button-hover: layer`.                                                                                                                                                                                                                     |
| `--_outlined-active-border-color` | Output | Pressed border of outlined buttons. The pressed background, or `--_accent` with `--ui-button-hover: layer`.                                                                                                                                                                                                                                      |
| `--_outlined-active-text-color`   | Output | Pressed text color of outlined buttons. `--_on-accent`, or `--_accent-text` with `--ui-button-hover: layer`.                                                                                                                                                                                                                                     |
| `--_outlined-hover-bg-color`      | Output | Hover background of outlined buttons. `--_accent-fill`, or the hover state layer with `--ui-button-hover: layer`.                                                                                                                                                                                                                                |
| `--_outlined-hover-border-color`  | Output | Hover border of outlined buttons. `--_accent-fill`, or `--_accent` with `--ui-button-hover: layer`.                                                                                                                                                                                                                                              |
| `--_outlined-hover-text-color`    | Output | Hover text color of outlined buttons. `--_on-accent`, or `--_accent-text` with `--ui-button-hover: layer`.                                                                                                                                                                                                                                       |
| `--_padding-inline`               | Input  | The inline padding. Set by the size classes from `--ui-button-padding-inline` and its size variants.                                                                                                                                                                                                                                             |
| `--_radius`                       | Input  | The corner radius. Defaults to `--ui-button-radius`, or `--ui-radius` when the theme doesn't set it. `.ui-round` makes it round.                                                                                                                                                                                                                 |
| `--_shadow`                       | Output | The shadow. `--ui-shadow-control` on `.ui-filled`, `.ui-outlined` and `.ui-tonal`, `--ui-button-hover-shadow` on hover when a theme sets it, none on text buttons.                                                                                                                                                                               |
| `--_size`                         | Input  | The height, and the width of an icon-only button. Defaults to `--ui-button-size`, set by the size classes.                                                                                                                                                                                                                                       |
| `--_text-color`                   | Output | The current text color. Set by the variant, hover, active and disabled states.                                                                                                                                                                                                                                                                   |
| `--_tonal-active-bg-color`        | Output | Pressed background of tonal buttons. `--_outlined-active-bg-color`, or the pressed state layer over `--_accent-tonal` with `--ui-button-hover: layer`.                                                                                                                                                                                           |
| `--_tonal-active-text-color`      | Output | Pressed text color of tonal buttons. `--_on-accent`, or `--_on-accent-tonal` with `--ui-button-hover: layer`.                                                                                                                                                                                                                                    |
| `--_tonal-hover-bg-color`         | Output | Hover background of tonal buttons. `--_accent-fill`, or the hover state layer over `--_accent-tonal` with `--ui-button-hover: layer`.                                                                                                                                                                                                            |
| `--_tonal-hover-text-color`       | Output | Hover text color of tonal buttons. `--_on-accent`, or `--_on-accent-tonal` with `--ui-button-hover: layer`.                                                                                                                                                                                                                                      |

## Under the hood

Read the post: [One Button, no IconButton](https://open-props-ui.netlify.app/learn/button-icon-only-has)

1. Base

   - Shown tonal for visibility, the library default is a text button
   - Padding in `ex` so it scales with the font
   - One custom property per size, every size reuses the same rules
   - The icon is `0.7lh`, so it follows the line height

2. Icon-only

   - `:has(> svg:only-child)` spots an icon-only button
   - Square at every size: no `IconButton`, no extra class
   - The icon scales with the button instead of the text

3. Icon side

   - Tighter padding on the icon side balances the optical weight
   - Text nodes aren't elements, so the label needs a wrapper element. In `<span class="ui-text">` the class is only a hook

Step 1 of 3: Base

```css
.button {
  align-items: center;
  background-color: var(--ui-surface-tonal);
  border: 1px solid var(--ui-border-color);
  border-radius: var(--ui-button-radius, var(--ui-radius));
  color: var(--ui-text-strong);
  display: inline-flex;
  gap: 1ex;
  min-block-size: var(--size);
  padding-inline: var(--padding-inline);
}

.button > svg {
  block-size: auto;
  flex-shrink: 0;
  inline-size: auto;
  max-block-size: var(--icon, 0.7lh);
}
```

Step 2 of 3: Icon-only

- [`:has()` ](https://webstatus.dev/features/has)(Widely available): Chrome 105+, Edge 105+, Firefox 121+, Safari 15.4+

```css
.button:has(> svg:only-child) {
  --icon: calc(var(--size) * 0.6);
  justify-content: center;
  min-inline-size: var(--size);
  padding-inline: 0;
}
```

Step 3 of 3: Icon side

```html
<button class="button" type="button">
  <svg>…</svg>
  <span class="ui-text">Download</span>
</button>
```

```css
.button:has(> svg:first-child + *) {
  padding-inline-start: calc(var(--padding-inline) * 0.75);
}

.button:has(> * + svg:last-child) {
  padding-inline-end: calc(var(--padding-inline) * 0.75);
}
```

## Browser support

- Chromium: Full support Supported since v125.
- Firefox: Full support Supported since v151.
- Safari: Full support Supported since v18.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/html/guide/browser-support/?components=Button.md).

## Installation

### Used by

- [Button Group](https://open-props-ui.netlify.app/html/components/button-group.md)

Copy the CSS into your project to own it. It reads tokens from Open Props, `palette.css` and `theme.css`, so those go on the page too, after `layers.css`. See [Getting started](https://open-props-ui.netlify.app/html/guide/getting-started.md).

- `opui-css/css/components/button.css`

## Changelog

### What's new

- Themes can set [`--ui-button-accent-filled`](#api) and `--ui-button-on-accent-filled` to give filled buttons a color of their own.
- Breaking: `--_border-radius` is `--_radius` and `--_min-height` is `--_size` ([Under the hood](#under-the-hood)).
- The file input takes `--ui-shadow-field` and `--ui-radius-small` like other fields.
- Primary tonal buttons read [`--ui-primary-tonal`](#api) and `--ui-on-primary-tonal` when a theme sets them.
- [Icon-only](#icon-only) buttons need no extra class, and `.ui-round` makes them round.
- Breaking: `.ui-icon-button` and `icon-button.css` are gone. An [icon-only](#icon-only) button is a `.ui-button` with just an `svg`.
- Breaking: icon styles only apply to a direct child `svg`. Wrap the label in a `<span class="ui-text">` next to an icon to [tighten the padding](#buttons-with-icon-and-label), or the button renders as icon-only.
- Breaking: `.ui-icon-only` is removed. A button whose only child is an `svg` is [square](#icon-only).
- Links with `aria-disabled="true"` [look and act disabled](#disabled).
- [Primary and critical](#colors) colors pass contrast in light and dark mode.
- Breaking: `--_color`, `--_color-contrast` and `--_color-tonal` are `--_accent`, `--_on-accent` and `--_accent-tonal` ([Under the hood](#under-the-hood)).
- Breaking: [disabled links](#disabled) have no `href`, so they can't be focused or followed.
- `--_duration` and `--_ease` set the transition duration and easing ([Under the hood](#under-the-hood)).
- Corners follow `--ui-radius` through [`--ui-button-radius`](#api), so one token squares or rounds every component.
- Themes set the color of [default buttons](#colors) with [`--ui-button-accent`](#api) and `--ui-button-on-accent`, the border with `--ui-control-border-color` (outlined) and `--ui-control-border-color-filled` (filled and tonal), the font weight with `--ui-button-font-weight`, the shadow with `--ui-shadow-control`, the hover shadow and offset with `--ui-button-hover-shadow` and `--ui-button-hover-translate`, and the font size with `--ui-font-size-control`. In dark mode the text stays at least as light as `--ui-text-min-lightness`, like the intent text roles.
- [Primary](#colors) outlined and text buttons read `--ui-primary-text`, the same readable primary as links, and critical ones `--ui-critical-text`.
- [Critical](#colors) fills and their hover and pressed shades stay within `--ui-fill-max-lightness`, and the border keeps `--ui-critical`.
