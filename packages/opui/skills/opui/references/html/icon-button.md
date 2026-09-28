# Icon Button

```html
<button class="ui-icon-button" aria-label="Delete">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
  >
    <path
      fill="currentColor"
      d="M13.5 6.5V7h5v-.5a2.5 2.5 0 0 0-5 0m-2 .5v-.5a4.5 4.5 0 1 1 9 0V7H28a1 1 0 1 1 0 2h-1.508L24.6 25.568A5 5 0 0 1 19.63 30h-7.26a5 5 0 0 1-4.97-4.432L5.508 9H4a1 1 0 0 1 0-2zm2.5 6.5a1 1 0 1 0-2 0v10a1 1 0 1 0 2 0zm5-1a1 1 0 0 0-1 1v10a1 1 0 1 0 2 0v-10a1 1 0 0 0-1-1"
    ></path>
  </svg>
</button>


<button class="ui-icon-button" aria-label="Edit">
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

## Variants

Icon buttons come in three variants: `outlined`, `tonal` and `filled`.

```html
<div style="display: flex; gap: 1rem; flex-wrap: wrap">
  <button class="ui-icon-button ui-outlined" aria-label="Outlined">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  </button>
  <button class="ui-icon-button ui-tonal" aria-label="Tonal">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  </button>
  <button class="ui-icon-button ui-filled" aria-label="Filled">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  </button>


  <button
    class="ui-icon-button ui-primary ui-outlined"
    aria-label="Primary Outlined"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  </button>
  <button class="ui-icon-button ui-primary ui-tonal" aria-label="Primary Tonal">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  </button>
  <button
    class="ui-icon-button ui-primary ui-filled"
    aria-label="Primary Filled"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  </button>
</div>
```

## Colors

Add a `.ui-primary` or `.ui-critical` class to apply a brand or destructive color. The default is a neutral gray.

```html
<button class="ui-icon-button ui-primary ui-filled" aria-label="Primary">
  <svg
    fill="none"
    height="20"
    stroke="currentColor"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="2"
    viewBox="0 0 24 24"
    width="20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M5 12h14"></path>
    <path d="M12 5v14"></path>
  </svg>
</button>
<button class="ui-icon-button ui-critical ui-filled" aria-label="Critical">
  <svg
    fill="none"
    height="20"
    stroke="currentColor"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="2"
    viewBox="0 0 24 24"
    width="20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M5 12h14"></path>
    <path d="M12 5v14"></path>
  </svg>
</button>
```

### `aria-label`?

Yes! In order for screen readers to understand what the button is for we can add `aria-label` to the `<button>` element.\
\
Read more: [Icon Button accessibility](#accessibility).

## Sizes

Make the button smaller with the `.ui-small` modifier.

```html
<button class="ui-icon-button ui-small" aria-label="Edit">
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


<button class="ui-icon-button" aria-label="Edit">
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

Prevent user interaction by adding the `disabled` attribute.

```html
<div style="display: flex; gap: 1rem; flex-wrap: wrap">
  <button class="ui-icon-button" disabled aria-label="Delete">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
    >
      <path
        fill="currentColor"
        d="M13.5 6.5V7h5v-.5a2.5 2.5 0 0 0-5 0m-2 .5v-.5a4.5 4.5 0 1 1 9 0V7H28a1 1 0 1 1 0 2h-1.508L24.6 25.568A5 5 0 0 1 19.63 30h-7.26a5 5 0 0 1-4.97-4.432L5.508 9H4a1 1 0 0 1 0-2zm2.5 6.5a1 1 0 1 0-2 0v10a1 1 0 1 0 2 0zm5-1a1 1 0 0 0-1 1v10a1 1 0 1 0 2 0v-10a1 1 0 0 0-1-1"
      ></path>
    </svg>
  </button>


  <button class="ui-icon-button ui-outlined" disabled aria-label="Delete">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
    >
      <path
        fill="currentColor"
        d="M13.5 6.5V7h5v-.5a2.5 2.5 0 0 0-5 0m-2 .5v-.5a4.5 4.5 0 1 1 9 0V7H28a1 1 0 1 1 0 2h-1.508L24.6 25.568A5 5 0 0 1 19.63 30h-7.26a5 5 0 0 1-4.97-4.432L5.508 9H4a1 1 0 0 1 0-2zm2.5 6.5a1 1 0 1 0-2 0v10a1 1 0 1 0 2 0zm5-1a1 1 0 0 0-1 1v10a1 1 0 1 0 2 0v-10a1 1 0 0 0-1-1"
      ></path>
    </svg>
  </button>


  <button class="ui-icon-button ui-tonal" disabled aria-label="Delete">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
    >
      <path
        fill="currentColor"
        d="M13.5 6.5V7h5v-.5a2.5 2.5 0 0 0-5 0m-2 .5v-.5a4.5 4.5 0 1 1 9 0V7H28a1 1 0 1 1 0 2h-1.508L24.6 25.568A5 5 0 0 1 19.63 30h-7.26a5 5 0 0 1-4.97-4.432L5.508 9H4a1 1 0 0 1 0-2zm2.5 6.5a1 1 0 1 0-2 0v10a1 1 0 1 0 2 0zm5-1a1 1 0 0 0-1 1v10a1 1 0 1 0 2 0v-10a1 1 0 0 0-1-1"
      ></path>
    </svg>
  </button>


  <button class="ui-icon-button ui-filled" disabled aria-label="Delete">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
    >
      <path
        fill="currentColor"
        d="M13.5 6.5V7h5v-.5a2.5 2.5 0 0 0-5 0m-2 .5v-.5a4.5 4.5 0 1 1 9 0V7H28a1 1 0 1 1 0 2h-1.508L24.6 25.568A5 5 0 0 1 19.63 30h-7.26a5 5 0 0 1-4.97-4.432L5.508 9H4a1 1 0 0 1 0-2zm2.5 6.5a1 1 0 1 0-2 0v10a1 1 0 1 0 2 0zm5-1a1 1 0 0 0-1 1v10a1 1 0 1 0 2 0v-10a1 1 0 0 0-1-1"
      ></path>
    </svg>
  </button>
</div>
```

## Accessibility

To have an accessible label you can choose between three approaches.

| Variant                                                        | Usage in Icon Button component                                                                                               |
| -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Add a `aria-label` on the `<button>` element                   | Default behavior.                                                                                                            |
| Provide a label inside the `<button>` element                  | Not used (but possible with the `.ui-sr-only`[util](https://open-props-ui.netlify.app/html/guide/getting-started/utils.md)). |
| Have a visible label that you reference with `aria-labelledby` | Not used.                                                                                                                    |

## Anatomy

1. Container: `<button class="ui-icon-button">`
2. Icon: `<svg>`
3. Label text: `<button aria-label="">`

## API

| Type     | Modifiers                                 | Default | Description                                                     |
| -------- | ----------------------------------------- | ------- | --------------------------------------------------------------- |
| Variants | `.ui-outlined`, `.ui-tonal`, `.ui-filled` | -       | The visual style of the icon button.                            |
| Sizes    | `.ui-small`                               | -       | The size of the element.                                        |
| Colors   | `.ui-critical`, `.ui-primary`             | -       | Color modifiers for the icon button. Default is a neutral gray. |
| States   | `[disabled]`                              | -       | Attribute to disable the icon button.                           |

## Browser support

- Chromium: Full support Supported since v125.
- Firefox: Full support Supported since v128.
- Safari: Full support Supported since v18.

See also the [full browser support guide](https://open-props-ui.netlify.app/html/guide/browser-support.md).

## Installation

### Dependencies

- [Button](https://open-props-ui.netlify.app/html/components/button.md)

- `opui-css/css/components/icon-button.css`
- `opui-css/css/components/button.css`

