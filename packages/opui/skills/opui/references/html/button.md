# Button

### What's new

- [Icon-only](#icon-only) buttons are square. `.ui-rounded` makes them round and `.ui-ripple` adds a hover halo.
- Replaces `IconButton`.
- Wrap the label in a `<span>` to [tighten the padding](#buttons-with-icon-and-label) next to an icon.
- Links with `.ui-disabled` or `aria-disabled="true"` look and act disabled.

## Anatomy

- `.ui-button`

  Container element.

- `<svg>`

  An optional icon.

- `<span>`

  The label.

## Variants

Change the button variant with the `.ui-outlined`, `.ui-tonal`, and `.ui-filled` classes.

```html
<div class="example-row">
  <button class="ui-button">Text</button>
  <button class="ui-button" disabled>Disabled</button>
  <a class="ui-button" href="#">Link</a>
</div>
<div class="example-row">
  <button class="ui-button ui-outlined">Outlined</button>
  <button class="ui-button ui-outlined" disabled>Disabled</button>
  <a class="ui-button ui-outlined" href="#">Link</a>
</div>
<div class="example-row">
  <button class="ui-button ui-tonal">Tonal</button>
  <button class="ui-button ui-tonal" disabled>Disabled</button>
  <a class="ui-button ui-tonal" href="#">Link</a>
</div>
<div class="example-row">
  <button class="ui-button ui-filled">Filled</button>
  <button class="ui-button ui-filled" disabled>Disabled</button>
  <a class="ui-button ui-filled" href="#">Link</a>
</div>
```

## Colors

Add a `.ui-primary` or `.ui-critical` class to apply a brand or destructive color. The default is a neutral gray.

```html
<div class="example-row">
  <button class="ui-button ui-primary">Primary</button>
  <button class="ui-button ui-primary ui-outlined">Outlined</button>
  <button class="ui-button ui-primary ui-tonal">Tonal</button>
  <button class="ui-button ui-primary ui-filled">Filled</button>
</div>
<div class="example-row">
  <button class="ui-button ui-critical">Critical</button>
  <button class="ui-button ui-critical ui-outlined">Outlined</button>
  <button class="ui-button ui-critical ui-tonal">Tonal</button>
  <button class="ui-button ui-critical ui-filled">Filled</button>
</div>
```

## Buttons with icon and label

Include an icon alongside text by nesting an SVG element within the button. Always wrap the label in a `<span>`: it tightens the padding on the icon side, and a button whose only element is an `svg` is styled as icon-only.

```html
<div class="example-row">
  <button class="ui-button">
    <span>Text</span>
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


  <button class="ui-button ui-outlined">
    <span>Outlined</span>
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


  <button class="ui-button ui-tonal">
    <span>Tonal</span>
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


  <button class="ui-button ui-filled">
    <span>Filled</span>
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
  <button class="ui-button">
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
    <span>Text</span>
  </button>
  <button class="ui-button ui-outlined">
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
    <span>Outlined</span>
  </button>


  <button class="ui-button ui-tonal">
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
    <span>Tonal</span>
  </button>


  <button class="ui-button ui-filled">
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
    <span>Filled</span>
  </button>
</div>
```

## Keyboard

Use the `<kbd>` element to provide keyboard hints within a button.

```html
<button class="ui-button">Search <kbd>⌘K</kbd></button>
<button class="ui-button ui-outlined">Save <kbd>⌘S</kbd></button>
<button class="ui-button ui-tonal">Copy <kbd>⌘C</kbd></button>
<button class="ui-button ui-filled">Delete <kbd>⌘⌫</kbd></button>
```

## Icon-only

A button whose only child is an `svg` is square. Give it an`aria-label`. Add `.ui-rounded` for a circle and `.ui-ripple` for a hover halo instead of a background change.

```html
<button class="ui-button" aria-label="Edit">
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
<button class="ui-button ui-rounded" aria-label="Edit">
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
<button class="ui-button ui-ripple ui-rounded" aria-label="Edit">
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
<button class="ui-button ui-ripple ui-rounded ui-tonal" aria-label="Edit">
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
  class="ui-button ui-primary ui-ripple ui-rounded ui-filled"
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
<button class="ui-button ui-ripple ui-rounded ui-small" aria-label="Edit">
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

## Sizes

Resize any button with the `.ui-small` and `.ui-large`classes.

```html
<div class="example-row">
  <button class="ui-button ui-small">Small</button>
  <button class="ui-button">Default</button>
  <button class="ui-button ui-large">Large</button>
</div>


<div class="example-row">
  <button class="ui-button ui-filled ui-small">Small</button>
  <button class="ui-button ui-filled">Default</button>
  <button class="ui-button ui-filled ui-large">Large</button>
</div>


<div class="example-row">
  <button class="ui-button ui-outlined ui-small">
    <span>Small</span>
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
  <button class="ui-button ui-outlined">
    <span>Default</span>
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
  <button class="ui-button ui-outlined ui-large">
    <span>Large</span>
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

## Disabled

Add disabled styling with the `disabled` attribute or the `.ui-disabled` class.

```html
<div class="example-row">
  <button class="ui-button" disabled>Text</button>


  <button class="ui-button ui-outlined" disabled>Outlined</button>


  <button class="ui-button ui-tonal" disabled>Tonal</button>


  <button class="ui-button ui-filled" disabled>Filled</button>
</div>


<div class="example-row">
  <button class="ui-button" disabled>
    <span>Text</span>
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


  <button class="ui-button ui-outlined" disabled>
    <span>Outlined</span>
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


  <button class="ui-button ui-tonal" disabled>
    <span>Tonal</span>
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


  <button class="ui-button ui-filled" disabled>
    <span>Filled</span>
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

## File upload

Is it a button? Is it an input? You can find the [docs for it here](https://open-props-ui.netlify.app/html/components/text-field.md#file) at least.

## API

### Button API

| Type     | Modifiers                                 | Default | Description                                                       |
| -------- | ----------------------------------------- | ------- | ----------------------------------------------------------------- |
| Colors   | `.ui-critical`, `.ui-primary`             | -       | Optional colors.                                                  |
| Hover    | `.ui-ripple`                              | -       | A halo behind the button on hover instead of a background change. |
| Shape    | `.ui-rounded`                             | -       | Fully rounded corners, a circle when icon-only.                   |
| Sizes    | `.ui-large`, `.ui-small`, `.ui-x-small`   | -       | The size of the element.                                          |
| State    | `[disabled]`                              | -       | Disables the button.                                              |
| Variants | `.ui-filled`, `.ui-outlined`, `.ui-tonal` | -       | The variant to use.                                               |

#### Parts

| Part         | Description        |
| ------------ | ------------------ |
| `.ui-button` | Container element. |
| `<svg>`      | An optional icon.  |
| `<span>`     | The label.         |

## Under the hood

1. Base

   - Padding in `ex` so it scales with the font
   - One custom property per size, every size reuses the same rules

2. Icon-only

   - `:has(> svg:only-child)` spots an icon-only button
   - Square at every size: no `IconButton`, no extra class

3. Icon side

   - Tighter padding on the icon side balances the optical weight
   - Text nodes aren't elements, so the label needs a `<span>`

4. Ripple

   - `translateZ(-1px)` + `preserve-3d` puts the halo behind the button, no `z-index`
   - `clip-path: circle()` keeps the halo round
   - Hover the last button

Step 1 of 4: Base

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
  flex-shrink: 0;
  max-block-size: 1.25em;
}
```

Step 2 of 4: Icon-only

- [`:has()`](https://webstatus.dev/features/has) (Widely available): Chrome 105+, Edge 105+, Firefox 121+, Safari 15.4+

```css
.button:has(> svg:only-child) {
  justify-content: center;
  min-inline-size: var(--size);
  padding-inline: 0;
}
```

Step 3 of 4: Icon side

```html
<button class="button">
  <svg>…</svg>
  <span>Download</span>
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

Step 4 of 4: Ripple

```css
.ripple {
  --ripple-scale: 0.01;
  border-radius: 50%;
  position: relative;
  transform-style: preserve-3d;
}


.ripple::before {
  background-color: oklch(0.6 0 0 / 0.2);
  block-size: 130%;
  clip-path: circle(50%);
  content: "";
  inline-size: 130%;
  inset: 50% auto auto 50%;
  position: absolute;
  transform: translate(-50%, -50%) translateZ(-1px)
    scale(var(--ripple-scale));
  transition: transform 0.2s ease;
}


.ripple:hover {
  --ripple-scale: 1;
}


.ripple:hover:active {
  --ripple-scale: 1.1;
}
```

### Browser support

Modern CSS and HTML features this component uses.

- [`color-mix()`](https://webstatus.dev/features/color-mix) (Widely available): Chrome 111+, Edge 111+, Firefox 113+, Safari 16.2+
- [`:has()`](https://webstatus.dev/features/has) (Widely available): Chrome 105+, Edge 105+, Firefox 121+, Safari 15.4+
- [`light-dark()`](https://webstatus.dev/features/light-dark) (Newly available): Chrome 123+, Edge 123+, Firefox 120+, Safari 17.5+
- [Relative colors](https://webstatus.dev/features/relative-color) (Newly available): Chrome 125+, Edge 125+, Firefox 128+, Safari 18+

See also the [full browser support guide](https://open-props-ui.netlify.app/html/guide/browser-support.md).

## Installation

- `opui-css/css/components/button.css`

