# Button

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

A button whose only child is an `svg` is square. Give it an`aria-label`. See [Icon button](https://open-props-ui.netlify.app/html/components/icon-button.md) for a round one.

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

## Anatomy

1. Container
2. Label text (optional)
3. Icon (optional)

## API

| Type     | Modifiers                                          | Default | Description                                 |
| -------- | -------------------------------------------------- | ------- | ------------------------------------------- |
| Sizes    | `.ui-small`, default, `.ui-large`                  | -       | The size of the element.                    |
| Variants | default, `.ui-outlined`, `.ui-tonal`, `.ui-filled` | -       | The variant to use.                         |
| Colors   | `.ui-critical`, `.ui-primary`                      | -       | Color modifiers. Default is a neutral gray. |

## Browser support

- Chromium: Full support Supported since v125.
- Firefox: Full support Supported since v128.
- Safari: Full support Supported since v18.

See also the [full browser support guide](https://open-props-ui.netlify.app/html/guide/browser-support.md).

## Installation

- `opui-css/css/components/button.css`

