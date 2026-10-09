# Button

Buttons do things, like saving a form or opening a dialog. For filters, tags and choices, use a [Chip](https://open-props-ui.netlify.app/html/components/chip.md).

## Anatomy

- `.ui-button`

  Container element.

- `<svg>`

  An optional icon.

- `<span class="ui-text">`

  The label. Wrap it when the button has an icon. The CSS looks for the element, the class is a hook.

## Variants

Change the button variant with the `.ui-outlined`, `.ui-tonal`, and `.ui-filled` classes.

```html
<div class="example-row">
  <button type="button" class="ui-button">Text</button>
  <button type="button" class="ui-button" disabled>Disabled</button>
  <a class="ui-button" href="#">Link</a>
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

A default (text) button link with `aria-current="page"` keeps the pressed background, to mark the current page in navigation. Outlined, tonal and filled buttons don't change.

## Colors

Add a `.ui-primary` or `.ui-critical` class to apply a brand or destructive color. The default is a neutral gray.

```html
<div class="example-row">
  <button type="button" class="ui-button ui-primary">Primary</button>
  <button type="button" class="ui-button ui-primary ui-outlined">
    Outlined
  </button>
  <button type="button" class="ui-button ui-primary ui-tonal">Tonal</button>
  <button type="button" class="ui-button ui-primary ui-filled">Filled</button>
</div>
<div class="example-row">
  <button type="button" class="ui-button ui-critical">Critical</button>
  <button type="button" class="ui-button ui-critical ui-outlined">
    Outlined
  </button>
  <button type="button" class="ui-button ui-critical ui-tonal">Tonal</button>
  <button type="button" class="ui-button ui-critical ui-filled">Filled</button>
</div>
```

## Sizes

Resize any button with the `.ui-x-small`, `.ui-small` and `.ui-large` classes.

```html
<div class="example-row">
  <button type="button" class="ui-button ui-x-small">x-small</button>
  <button type="button" class="ui-button ui-small">Small</button>
  <button type="button" class="ui-button">Default</button>
  <button type="button" class="ui-button ui-large">Large</button>
</div>

<div class="example-row">
  <button type="button" class="ui-button ui-filled ui-x-small">x-small</button>
  <button type="button" class="ui-button ui-filled ui-small">Small</button>
  <button type="button" class="ui-button ui-filled">Default</button>
  <button type="button" class="ui-button ui-filled ui-large">Large</button>
</div>

<div class="example-row">
  <button type="button" class="ui-button ui-outlined ui-x-small">
    <span class="ui-text">x-small</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M11.75 3a.75.75 0 0 1 .743.648l.007.102l.001 7.25h7.253a.75.75 0 0 1 .102 1.493l-.102.007h-7.253l.002 7.25a.75.75 0 0 1-1.493.101l-.007-.102l-.002-7.249H3.752a.75.75 0 0 1-.102-1.493L3.752 11h7.25L11 3.75a.75.75 0 0 1 .75-.75"
      ></path>
    </svg>
  </button>
  <button type="button" class="ui-button ui-outlined ui-small">
    <span class="ui-text">Small</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M11.75 3a.75.75 0 0 1 .743.648l.007.102l.001 7.25h7.253a.75.75 0 0 1 .102 1.493l-.102.007h-7.253l.002 7.25a.75.75 0 0 1-1.493.101l-.007-.102l-.002-7.249H3.752a.75.75 0 0 1-.102-1.493L3.752 11h7.25L11 3.75a.75.75 0 0 1 .75-.75"
      ></path>
    </svg>
  </button>
  <button type="button" class="ui-button ui-outlined">
    <span class="ui-text">Default</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M11.75 3a.75.75 0 0 1 .743.648l.007.102l.001 7.25h7.253a.75.75 0 0 1 .102 1.493l-.102.007h-7.253l.002 7.25a.75.75 0 0 1-1.493.101l-.007-.102l-.002-7.249H3.752a.75.75 0 0 1-.102-1.493L3.752 11h7.25L11 3.75a.75.75 0 0 1 .75-.75"
      ></path>
    </svg>
  </button>
  <button type="button" class="ui-button ui-outlined ui-large">
    <span class="ui-text">Large</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M11.75 3a.75.75 0 0 1 .743.648l.007.102l.001 7.25h7.253a.75.75 0 0 1 .102 1.493l-.102.007h-7.253l.002 7.25a.75.75 0 0 1-1.493.101l-.007-.102l-.002-7.249H3.752a.75.75 0 0 1-.102-1.493L3.752 11h7.25L11 3.75a.75.75 0 0 1 .75-.75"
      ></path>
    </svg>
  </button>
</div>
```

## Buttons with icon and label

Include an icon alongside text by nesting an SVG element within the button. Wrap the label in a `<span class="ui-text">`. The CSS looks for the wrapper element, the class is a hook for your own styles. The wrapper tightens the padding on the icon side, and a button whose only element is an `svg` is styled as icon-only, even with text next to it.

```html
<div class="example-row">
  <button type="button" class="ui-button">
    <span class="ui-text">Text</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M11.75 3a.75.75 0 0 1 .743.648l.007.102l.001 7.25h7.253a.75.75 0 0 1 .102 1.493l-.102.007h-7.253l.002 7.25a.75.75 0 0 1-1.493.101l-.007-.102l-.002-7.249H3.752a.75.75 0 0 1-.102-1.493L3.752 11h7.25L11 3.75a.75.75 0 0 1 .75-.75"
      ></path>
    </svg>
  </button>

  <button type="button" class="ui-button ui-outlined">
    <span class="ui-text">Outlined</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M11.75 3a.75.75 0 0 1 .743.648l.007.102l.001 7.25h7.253a.75.75 0 0 1 .102 1.493l-.102.007h-7.253l.002 7.25a.75.75 0 0 1-1.493.101l-.007-.102l-.002-7.249H3.752a.75.75 0 0 1-.102-1.493L3.752 11h7.25L11 3.75a.75.75 0 0 1 .75-.75"
      ></path>
    </svg>
  </button>

  <button type="button" class="ui-button ui-tonal">
    <span class="ui-text">Tonal</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M11.75 3a.75.75 0 0 1 .743.648l.007.102l.001 7.25h7.253a.75.75 0 0 1 .102 1.493l-.102.007h-7.253l.002 7.25a.75.75 0 0 1-1.493.101l-.007-.102l-.002-7.249H3.752a.75.75 0 0 1-.102-1.493L3.752 11h7.25L11 3.75a.75.75 0 0 1 .75-.75"
      ></path>
    </svg>
  </button>

  <button type="button" class="ui-button ui-filled">
    <span class="ui-text">Filled</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M11.75 3a.75.75 0 0 1 .743.648l.007.102l.001 7.25h7.253a.75.75 0 0 1 .102 1.493l-.102.007h-7.253l.002 7.25a.75.75 0 0 1-1.493.101l-.007-.102l-.002-7.249H3.752a.75.75 0 0 1-.102-1.493L3.752 11h7.25L11 3.75a.75.75 0 0 1 .75-.75"
      ></path>
    </svg>
  </button>
</div>
<div class="example-row">
  <button type="button" class="ui-button">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M11.75 3a.75.75 0 0 1 .743.648l.007.102l.001 7.25h7.253a.75.75 0 0 1 .102 1.493l-.102.007h-7.253l.002 7.25a.75.75 0 0 1-1.493.101l-.007-.102l-.002-7.249H3.752a.75.75 0 0 1-.102-1.493L3.752 11h7.25L11 3.75a.75.75 0 0 1 .75-.75"
      ></path>
    </svg>
    <span class="ui-text">Text</span>
  </button>
  <button type="button" class="ui-button ui-outlined">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M11.75 3a.75.75 0 0 1 .743.648l.007.102l.001 7.25h7.253a.75.75 0 0 1 .102 1.493l-.102.007h-7.253l.002 7.25a.75.75 0 0 1-1.493.101l-.007-.102l-.002-7.249H3.752a.75.75 0 0 1-.102-1.493L3.752 11h7.25L11 3.75a.75.75 0 0 1 .75-.75"
      ></path>
    </svg>
    <span class="ui-text">Outlined</span>
  </button>

  <button type="button" class="ui-button ui-tonal">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M11.75 3a.75.75 0 0 1 .743.648l.007.102l.001 7.25h7.253a.75.75 0 0 1 .102 1.493l-.102.007h-7.253l.002 7.25a.75.75 0 0 1-1.493.101l-.007-.102l-.002-7.249H3.752a.75.75 0 0 1-.102-1.493L3.752 11h7.25L11 3.75a.75.75 0 0 1 .75-.75"
      ></path>
    </svg>
    <span class="ui-text">Tonal</span>
  </button>

  <button type="button" class="ui-button ui-filled">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M11.75 3a.75.75 0 0 1 .743.648l.007.102l.001 7.25h7.253a.75.75 0 0 1 .102 1.493l-.102.007h-7.253l.002 7.25a.75.75 0 0 1-1.493.101l-.007-.102l-.002-7.249H3.752a.75.75 0 0 1-.102-1.493L3.752 11h7.25L11 3.75a.75.75 0 0 1 .75-.75"
      ></path>
    </svg>
    <span class="ui-text">Filled</span>
  </button>
</div>
```

## Keyboard

Use the `<kbd>` element to provide keyboard hints within a button.

```html
<button type="button" class="ui-button">Search <kbd>⌘K</kbd></button>
<button type="button" class="ui-button ui-outlined">Save <kbd>⌘S</kbd></button>
<button type="button" class="ui-button ui-tonal">Copy <kbd>⌘C</kbd></button>
<button type="button" class="ui-button ui-filled">Delete <kbd>⌘⌫</kbd></button>
```

## Icon-only

Name a button whose only child is an `svg` with `aria-label`. Add `.ui-rounded` for a circle.

```html
<button type="button" class="ui-button" aria-label="Edit">
  <svg
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
<button type="button" class="ui-button ui-rounded" aria-label="Edit">
  <svg
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
<button type="button" class="ui-button ui-rounded ui-tonal" aria-label="Edit">
  <svg
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
  class="ui-button ui-primary ui-rounded ui-filled"
  aria-label="Edit"
>
  <svg
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
<button type="button" class="ui-button ui-rounded ui-small" aria-label="Edit">
  <svg
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
```

## Disabled

Disable the button with the `disabled` attribute. Links can't be disabled, so use `aria-disabled="true"` on an `<a>`, which blocks clicks. The link can still be focused and followed with `Enter`.

```html
<div class="example-row">
  <button type="button" class="ui-button" disabled>Text</button>

  <button type="button" class="ui-button ui-outlined" disabled>Outlined</button>

  <button type="button" class="ui-button ui-tonal" disabled>Tonal</button>

  <button type="button" class="ui-button ui-filled" disabled>Filled</button>
</div>

<div class="example-row">
  <button type="button" class="ui-button" disabled>
    <span class="ui-text">Text</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M11.75 3a.75.75 0 0 1 .743.648l.007.102l.001 7.25h7.253a.75.75 0 0 1 .102 1.493l-.102.007h-7.253l.002 7.25a.75.75 0 0 1-1.493.101l-.007-.102l-.002-7.249H3.752a.75.75 0 0 1-.102-1.493L3.752 11h7.25L11 3.75a.75.75 0 0 1 .75-.75"
      ></path>
    </svg>
  </button>

  <button type="button" class="ui-button ui-outlined" disabled>
    <span class="ui-text">Outlined</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M11.75 3a.75.75 0 0 1 .743.648l.007.102l.001 7.25h7.253a.75.75 0 0 1 .102 1.493l-.102.007h-7.253l.002 7.25a.75.75 0 0 1-1.493.101l-.007-.102l-.002-7.249H3.752a.75.75 0 0 1-.102-1.493L3.752 11h7.25L11 3.75a.75.75 0 0 1 .75-.75"
      ></path>
    </svg>
  </button>

  <button type="button" class="ui-button ui-tonal" disabled>
    <span class="ui-text">Tonal</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M11.75 3a.75.75 0 0 1 .743.648l.007.102l.001 7.25h7.253a.75.75 0 0 1 .102 1.493l-.102.007h-7.253l.002 7.25a.75.75 0 0 1-1.493.101l-.007-.102l-.002-7.249H3.752a.75.75 0 0 1-.102-1.493L3.752 11h7.25L11 3.75a.75.75 0 0 1 .75-.75"
      ></path>
    </svg>
  </button>

  <button type="button" class="ui-button ui-filled" disabled>
    <span class="ui-text">Filled</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M11.75 3a.75.75 0 0 1 .743.648l.007.102l.001 7.25h7.253a.75.75 0 0 1 .102 1.493l-.102.007h-7.253l.002 7.25a.75.75 0 0 1-1.493.101l-.007-.102l-.002-7.249H3.752a.75.75 0 0 1-.102-1.493L3.752 11h7.25L11 3.75a.75.75 0 0 1 .75-.75"
      ></path>
    </svg>
  </button>
</div>

<div class="example-row">
  <a href="#" class="ui-button" aria-disabled="true">Text</a>

  <a href="#" class="ui-button ui-outlined" aria-disabled="true">Outlined</a>

  <a href="#" class="ui-button ui-tonal" aria-disabled="true">Tonal</a>

  <a href="#" class="ui-button ui-filled" aria-disabled="true">Filled</a>
</div>
```

## File upload

Is it a button? Is it an input? You can find the [docs for it here](https://open-props-ui.netlify.app/html/components/text-field.md#file) at least.

## API

### Button API

| Type     | Modifiers                                 | Default | Description                                     |
| -------- | ----------------------------------------- | ------- | ----------------------------------------------- |
| Colors   | `.ui-critical`, `.ui-primary`             | -       | Optional colors.                                |
| Shape    | `.ui-rounded`                             | -       | Fully rounded corners, a circle when icon-only. |
| Sizes    | `.ui-large`, `.ui-small`, `.ui-x-small`   | -       | The size of the element.                        |
| State    | `[disabled]`                              | -       | Disables the button.                            |
| Variants | `.ui-filled`, `.ui-outlined`, `.ui-tonal` | -       | The variant to use.                             |

#### Parts

| Part                     | Description                                                                                         |
| ------------------------ | --------------------------------------------------------------------------------------------------- |
| `.ui-button`             | Container element.                                                                                  |
| `<svg>`                  | An optional icon.                                                                                   |
| `<span class="ui-text">` | The label. Wrap it when the button has an icon. The CSS looks for the element, the class is a hook. |

#### CSS variables

| Variable                      | Default                                                                               | Description                                                                                                                                                                                                  |
| ----------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `--button-border-radius`      | `var(--size-2)`                                                                       | Corner radius for `Button`, `ButtonGroup`, `ToggleButton` and `ToggleGroup`.                                                                                                                                 |
| `--button-size`               | `var(--control-size)`                                                                 | Default `Button` height.                                                                                                                                                                                     |
| `--button-size-large`         | `var(--control-size-large)`                                                           | `Button` height with `.ui-large`.                                                                                                                                                                            |
| `--button-size-small`         | `var(--control-size-small)`                                                           | `Button` height with `.ui-small`.                                                                                                                                                                            |
| `--button-size-x-small`       | `var(--control-size-x-small)`                                                         | `Button` and `ButtonGroup` height with `.ui-x-small`.                                                                                                                                                        |
| `--critical`                  | `var(--red)`                                                                          | Severity color for errors and destructive actions.                                                                                                                                                           |
| `--disabled-opacity`          | `0.64`                                                                                | Opacity applied to disabled controls.                                                                                                                                                                        |
| `--duration-fast`             | `0.1s`                                                                                | Transition duration for hover and press feedback.                                                                                                                                                            |
| `--ease`                      | `ease`                                                                                | Default easing for transitions.                                                                                                                                                                              |
| `--font-size-05`              | `0.875rem`                                                                            | A font size between Open Props `--font-size-0` and `--font-size-1`, used for labels and compact text.                                                                                                        |
| `--font-weight-bold`          | `var(--font-weight-7)`                                                                | Font weight for headings, buttons and terms.                                                                                                                                                                 |
| `--font-weight-normal`        | `var(--font-weight-4)`                                                                | Font weight for `List` text and `Button` keyboard shortcuts.                                                                                                                                                 |
| `--motion`                    | `1`                                                                                   | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/html/guide/theming.md#motion).     |
| `--primary`                   | `light-dark(var(--color-9), var(--color-6))`                                          | Brand color for primary actions and accents.                                                                                                                                                                 |
| `--primary-contrast`          | `oklch( from var(--primary) clamp(0.15, (0.565 - l) * 1000, 0.98) calc(c * 0.15) h )` | Text color on `--primary`. Derived with relative color: near-black when the primary's lightness is above 0.565, near-white below, tinted with 15% of its chroma, so a custom `--primary` gets readable text. |
| `--state-active-alpha`        | `20%`                                                                                 | Alpha of the pressed state layer on neutral buttons in light mode.                                                                                                                                           |
| `--state-active-alpha-accent` | `25%`                                                                                 | Alpha of the pressed state layer on primary and critical buttons.                                                                                                                                            |
| `--state-active-alpha-dark`   | `30%`                                                                                 | Alpha of the pressed state layer on neutral buttons in dark mode.                                                                                                                                            |
| `--state-hover-alpha`         | `10%`                                                                                 | Alpha of the hover state layer on neutral buttons in light mode.                                                                                                                                             |
| `--state-hover-alpha-accent`  | `15%`                                                                                 | Alpha of the hover state layer on primary and critical buttons.                                                                                                                                              |
| `--state-hover-alpha-dark`    | `20%`                                                                                 | Alpha of the hover state layer on neutral buttons in dark mode.                                                                                                                                              |
| `--surface-filled`            | `light-dark(var(--gray-4), var(--gray-15))`                                           | Background of filled areas such as progress tracks and table stripes.                                                                                                                                        |
| `--surface-tonal`             | `light-dark(var(--gray-3), var(--gray-12))`                                           | Background of tonal variants.                                                                                                                                                                                |
| `--text-disabled`             | `color-mix( in oklch, var(--text-muted) 50%, var(--surface-default) )`                | Text color of disabled buttons and chips.                                                                                                                                                                    |
| `--text-muted-contrast`       | `light-dark(var(--gray-4), var(--gray-13))`                                           | Muted text color on an inverted surface.                                                                                                                                                                     |

This component uses these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md).

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
  background-color: var(--surface-tonal);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-2);
  color: var(--text-primary);
  display: inline-flex;
  gap: 1ex;
  min-block-size: var(--size);
  padding-inline: var(--padding-inline);
}

.button > svg {
  block-size: auto;
  flex-shrink: 0;
  inline-size: auto;
  max-block-size: var(--icon-size, 0.7lh);
}
```

Step 2 of 3: Icon-only

- [`:has()` ](https://webstatus.dev/features/has)(Widely available): Chrome 105+, Edge 105+, Firefox 121+, Safari 15.4+

```css
.button:has(> svg:only-child) {
  --icon-size: calc(var(--size) * 0.6);
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

- `opui-css/css/components/button.css`

## Changelog

### What's new

- [Icon-only](#icon-only) buttons need no extra class, and `.ui-rounded` makes them round.
- Replaces `IconButton`. An [icon-only](#icon-only) button is a `Button` with just an `svg`.
- Breaking: icon styles only apply to a direct child `svg`. Wrap the label in a `<span class="ui-text">` next to an icon to [tighten the padding](#buttons-with-icon-and-label), or the button renders as icon-only.
- Breaking: `.ui-icon-only` is removed. A button whose only child is an `svg` is [square](#icon-only).
- Links with `aria-disabled="true"` [look and act disabled](#disabled).
- [Primary and critical](#colors) colors pass contrast in light and dark mode.
