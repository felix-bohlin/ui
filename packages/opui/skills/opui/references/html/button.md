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
      aria-hidden="true"
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
      aria-hidden="true"
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
      aria-hidden="true"
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
      aria-hidden="true"
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
      aria-hidden="true"
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
      aria-hidden="true"
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
      aria-hidden="true"
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
      aria-hidden="true"
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
      aria-hidden="true"
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
      aria-hidden="true"
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
      aria-hidden="true"
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
      aria-hidden="true"
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
      aria-hidden="true"
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
      aria-hidden="true"
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
      aria-hidden="true"
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
      aria-hidden="true"
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
  <a class="ui-button" aria-disabled="true">Text</a>

  <a class="ui-button ui-outlined" aria-disabled="true">Outlined</a>

  <a class="ui-button ui-tonal" aria-disabled="true">Tonal</a>

  <a class="ui-button ui-filled" aria-disabled="true">Filled</a>
</div>
```

## File upload

Is it a button? Is it an input? You can find the [docs for it here](https://open-props-ui.netlify.app/html/components/text-field.md#file) at least.

## API

### Button API

| Type     | Modifiers                                 | Default | Description                                                                                                                 |
| -------- | ----------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------- |
| Colors   | `.ui-critical`, `.ui-primary`             | -       | Optional colors.                                                                                                            |
| Shape    | `.ui-round`                               | -       | Fully rounded corners, a circle when icon-only.                                                                             |
| Sizes    | `.ui-large`, `.ui-small`, `.ui-x-small`   | -       | The size of the element.                                                                                                    |
| State    | `[disabled]`, `a[aria-disabled="true"]`   | -       | Disables the button. A link button, which can't take `disabled`, drops its `href` and takes `aria-disabled="true"` instead. |
| Variants | `.ui-filled`, `.ui-outlined`, `.ui-tonal` | -       | The variant to use.                                                                                                         |

#### Parts

| Part                     | Description                                                                                         |
| ------------------------ | --------------------------------------------------------------------------------------------------- |
| `.ui-button`             | Container element.                                                                                  |
| `<svg>`                  | An optional icon.                                                                                   |
| `<span class="ui-text">` | The label. Wrap it when the button has an icon. The CSS looks for the element, the class is a hook. |

#### CSS variables

| Variable                         | Default                                                                                  | Description                                                                                                                                                                                                                                 |
| -------------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--ui-border-radius`             | `var(--size-2)`                                                                          | Corner radius for every component: cards, callouts, menus, buttons and fields follow it, and small parts like `kbd`, tooltips and checkboxes never get rounder than it. Set it to `0` for square corners. Takes a single length.            |
| `--ui-border-width`              | `1px`                                                                                    | Default border width for components that draw a border.                                                                                                                                                                                     |
| `--ui-button-border-color`       | Unset                                                                                    | Border color of `Button` with `.ui-filled`, `.ui-outlined` or `.ui-tonal`, and of the edge and dividers of a `ButtonGroup` with one of them. When unset, filled and tonal buttons have no visible border and outlined ones use their color. |
| `--ui-button-border-radius`      | Unset                                                                                    | Corner radius for `Button`, `ButtonGroup`, `ToggleButton` and `ToggleGroup`. When unset, they follow `--ui-border-radius`, also where it's set on a part of the page.                                                                       |
| `--ui-button-font-weight`        | Unset                                                                                    | Font weight of `Button`. When unset, buttons follow `--ui-font-weight-bold`.                                                                                                                                                                |
| `--ui-button-hover-shadow`       | Unset                                                                                    | Shadow of `Button` with `.ui-filled`, `.ui-outlined` or `.ui-tonal` on hover. When unset, it keeps `--ui-shadow-control`.                                                                                                                   |
| `--ui-button-hover-translate`    | Unset                                                                                    | Moves `Button` with `.ui-filled`, `.ui-outlined` or `.ui-tonal` on hover, as a `translate` value. Pair it with `--ui-button-hover-shadow` to press buttons into their shadow. `none` when unset.                                            |
| `--ui-button-size`               | `var(--ui-control-size)`                                                                 | Default `Button` height.                                                                                                                                                                                                                    |
| `--ui-button-size-large`         | `var(--ui-control-size-large)`                                                           | `Button` height with `.ui-large`.                                                                                                                                                                                                           |
| `--ui-button-size-small`         | `var(--ui-control-size-small)`                                                           | `Button` height with `.ui-small`.                                                                                                                                                                                                           |
| `--ui-button-size-x-small`       | `var(--ui-control-size-x-small)`                                                         | `Button` and `ButtonGroup` height with `.ui-x-small`.                                                                                                                                                                                       |
| `--ui-critical`                  | `var(--ui-red)`                                                                          | Severity color for errors and destructive actions.                                                                                                                                                                                          |
| `--ui-disabled-opacity`          | `0.64`                                                                                   | Opacity applied to disabled controls.                                                                                                                                                                                                       |
| `--ui-duration-fast`             | `0.1s`                                                                                   | Transition duration for hover and press feedback.                                                                                                                                                                                           |
| `--ui-ease`                      | `ease`                                                                                   | Default easing for transitions.                                                                                                                                                                                                             |
| `--ui-font-code`                 | `var(--font-mono)`                                                                       | Font family for `code`, `kbd`, `samp` and `pre` in rich text, `.ui-kbd`, `.ui-samp`, `.ui-var`, code blocks and `kbd` in buttons and lists. Defaults to Open Props `--font-mono`.                                                           |
| `--ui-font-size-05`              | `0.875rem`                                                                               | A font size between Open Props `--font-size-0` and `--font-size-1`, used for labels and compact text.                                                                                                                                       |
| `--ui-font-size-control`         | `var(--font-size-1)`                                                                     | Font size of the default `Button`, `TextField`, `Textarea` and `Select`. The size classes set their own.                                                                                                                                    |
| `--ui-font-weight-bold`          | `var(--font-weight-7)`                                                                   | Font weight for headings, buttons and terms.                                                                                                                                                                                                |
| `--ui-font-weight-normal`        | `var(--font-weight-4)`                                                                   | Font weight for `List` text and `Button` keyboard shortcuts.                                                                                                                                                                                |
| `--ui-motion`                    | `1`                                                                                      | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/html/guide/theming.md#motion).                                    |
| `--ui-primary`                   | `light-dark(var(--ui-color-9), var(--ui-color-6))`                                       | Brand color for primary actions and accents.                                                                                                                                                                                                |
| `--ui-primary-contrast`          | `oklch( from var(--ui-primary) clamp(0.15, (0.565 - l) * 1000, 0.98) calc(c * 0.15) h )` | Text color on `--ui-primary`. Derived with relative color: near-black when the primary's lightness is above 0.565, near-white below, tinted with 15% of its chroma, so a custom `--ui-primary` gets readable text.                          |
| `--ui-primary-text`              | Unset                                                                                    | Primary as a text color: links, and `Button` with `.ui-primary` and no variant or `.ui-outlined`. When unset, each derives a readable shade from `--ui-primary`. Set it when the primary is too light or too dark for text.                 |
| `--ui-shadow-control`            | `none`                                                                                   | Shadow of buttons and button groups with a variant, and of fields. `none` by default, for themes that lift controls off the page.                                                                                                           |
| `--ui-state-active-alpha`        | `20%`                                                                                    | Alpha of the pressed state layer on neutral buttons in light mode.                                                                                                                                                                          |
| `--ui-state-active-alpha-accent` | `25%`                                                                                    | Alpha of the pressed state layer on primary and critical buttons.                                                                                                                                                                           |
| `--ui-state-active-alpha-dark`   | `30%`                                                                                    | Alpha of the pressed state layer on neutral buttons in dark mode.                                                                                                                                                                           |
| `--ui-state-hover-alpha`         | `10%`                                                                                    | Alpha of the hover state layer on neutral buttons in light mode.                                                                                                                                                                            |
| `--ui-state-hover-alpha-accent`  | `15%`                                                                                    | Alpha of the hover state layer on primary and critical buttons.                                                                                                                                                                             |
| `--ui-state-hover-alpha-dark`    | `20%`                                                                                    | Alpha of the hover state layer on neutral buttons in dark mode.                                                                                                                                                                             |
| `--ui-surface-filled`            | `light-dark(var(--ui-gray-4), var(--ui-gray-15))`                                        | Background of filled areas such as progress tracks and table stripes.                                                                                                                                                                       |
| `--ui-surface-tonal`             | `light-dark(var(--ui-gray-3), var(--ui-gray-12))`                                        | Background of tonal variants.                                                                                                                                                                                                               |
| `--ui-text-disabled`             | `color-mix( in oklch, var(--ui-text-muted) 50%, var(--ui-surface-default) )`             | Text color of disabled buttons and chips.                                                                                                                                                                                                   |
| `--ui-text-muted-contrast`       | `light-dark(var(--ui-gray-4), var(--ui-gray-13))`                                        | Muted text color on an inverted surface.                                                                                                                                                                                                    |

This component uses these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md).

## Component properties

Set these on the component itself, inline or in your own CSS. Inputs are the knobs. Outputs are derived from the inputs and the current state, so overriding one fixes it in every state. [Customizing](https://open-props-ui.netlify.app/html/guide/customizing.md#component-properties) has examples.

| Property                      | Kind   | Description                                                                                                                   |
| ----------------------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------- |
| `--_accent`                   | Input  | The accent color. Fills, borders, text, hover and active states are derived from it. `.ui-primary` and `.ui-critical` set it. |
| `--_accent-contrast`          | Input  | Text color on a fill of `--_accent`.                                                                                          |
| `--_accent-text`              | Output | Text color of text and outlined buttons. `--_accent`, lightened in dark mode to stay readable.                                |
| `--_accent-tonal`             | Input  | Background of `.ui-tonal`.                                                                                                    |
| `--_accent-tonal-contrast`    | Input  | Text color of `.ui-tonal`.                                                                                                    |
| `--_bg-color`                 | Output | The current background. Set by the variant, hover, active and disabled states.                                                |
| `--_border-color`             | Output | The current border color. Set by the variant and states.                                                                      |
| `--_border-radius`            | Input  | The corner radius. Defaults to `--ui-button-border-radius`, `.ui-rounded` makes it round.                                     |
| `--_border-width`             | Input  | The border width.                                                                                                             |
| `--_default-active-bg-color`  | Output | Pressed background of text buttons, from `--_accent`.                                                                         |
| `--_default-hover-bg-color`   | Output | Hover background of text buttons, from `--_accent`.                                                                           |
| `--_duration`                 | Output | Duration of the transitions, `--ui-duration-fast` times `--_motion`.                                                          |
| `--_ease`                     | Input  | Easing of the transitions. Defaults to `--ui-ease`.                                                                           |
| `--_filled-active-bg-color`   | Output | Pressed background of filled buttons, from `--_accent`.                                                                       |
| `--_filled-hover-bg-color`    | Output | Hover background of filled buttons, from `--_accent`.                                                                         |
| `--_font-size`                | Input  | The font size. Set by the size classes.                                                                                       |
| `--_icon-size`                | Input  | The size of a direct child `svg`. Icon-only buttons scale it with `--_min-height`.                                            |
| `--_min-height`               | Input  | The height. Set by the size classes.                                                                                          |
| `--_motion`                   | Input  | Motion multiplier for the transitions. `0` turns them off.                                                                    |
| `--_outlined-active-bg-color` | Output | Pressed background of outlined buttons, from `--_accent`.                                                                     |
| `--_padding-inline`           | Input  | The inline padding. Set by the size classes.                                                                                  |
| `--_shadow`                   | Input  | The shadow. `--ui-shadow-control` on `.ui-filled`, `.ui-outlined` and `.ui-tonal`, none on text buttons.                      |
| `--_text-color`               | Output | The current text color. Set by the variant, hover, active and disabled states.                                                |

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
  border-radius: var(--radius-2);
  color: var(--ui-text-primary);
  display: inline-flex;
  gap: 1ex;
  min-block-size: var(--size);
  padding-inline: var(--padding-inline);
}

.button > svg {
  block-size: auto;
  flex-shrink: 0;
  inline-size: auto;
  max-block-size: var(--ui-icon-size, 0.7lh);
}
```

Step 2 of 3: Icon-only

- [`:has()` ](https://webstatus.dev/features/has)(Widely available): Chrome 105+, Edge 105+, Firefox 121+, Safari 15.4+

```css
.button:has(> svg:only-child) {
  --ui-icon-size: calc(var(--size) * 0.6);
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

* `opui-css/css/components/button.css`

## Changelog

### What's new

- [Icon-only](#icon-only) buttons need no extra class, and `.ui-round` makes them round.
- Breaking: `.ui-icon-button` and `icon-button.css` are gone. An [icon-only](#icon-only) button is a `.ui-button` with just an `svg`.
- Breaking: icon styles only apply to a direct child `svg`. Wrap the label in a `<span class="ui-text">` next to an icon to [tighten the padding](#buttons-with-icon-and-label), or the button renders as icon-only.
- Breaking: `.ui-icon-only` is removed. A button whose only child is an `svg` is [square](#icon-only).
- Links with `aria-disabled="true"` [look and act disabled](#disabled).
- [Primary and critical](#colors) colors pass contrast in light and dark mode.
- Breaking: `--_color`, `--_color-contrast` and `--_color-tonal` are `--_accent`, `--_accent-contrast` and `--_accent-tonal` ([Under the hood](#under-the-hood)).
- Breaking: [disabled links](#disabled) have no `href`, so they can't be focused or followed.
- `--_duration` and `--_ease` set the transition duration and easing ([Under the hood](#under-the-hood)).
- Corners follow `--ui-border-radius` through [`--ui-button-border-radius`](#api), so one token squares or rounds every component.
- Themes set the border color, font weight, and hover shadow and offset with [`--ui-button-border-color`, `--ui-button-font-weight`, `--ui-button-hover-shadow` and `--ui-button-hover-translate`](#api), and the font size with `--ui-font-size-control`.
- [Primary](#colors) outlined and text buttons read `--ui-primary-text` when a theme sets it.
