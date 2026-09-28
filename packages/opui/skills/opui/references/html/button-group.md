# Button group

Groups related buttons by wrapping them with `class="ui-button-group"` and `role="group"`.

- Button groups should consist of 2-5 buttons.
- Don't allow them to wrap onto a new line.
- If an icon is used without label text make sure the button communicates clearly what it does.

Button group or Toggle group?

If your buttons depend on state (controlled) - use [Toggle group](https://open-props-ui.netlify.app/html/components/toggle.md).

If you just need to group a bunch of "dumb" (uncontrolled) buttons - use Button group.

## Variants

Change the appearance of the entire group with the `.ui-outlined`, `.ui-tonal`, and `.ui-filled` classes.

```html
<div role="group" class="ui-button-group">
  <button class="ui-button">Text</button>
  <button class="ui-button">Text</button>
  <button class="ui-button">Text</button>
</div>


<div role="group" class="ui-button-group">
  <button class="ui-button ui-outlined">Outlined</button>
  <button class="ui-button ui-outlined">Outlined</button>
  <button class="ui-button ui-outlined">Outlined</button>
</div>


<div role="group" class="ui-button-group">
  <button class="ui-button ui-tonal">Tonal</button>
  <button class="ui-button ui-tonal">Tonal</button>
  <button class="ui-button ui-tonal">Tonal</button>
</div>


<div role="group" class="ui-button-group">
  <button class="ui-button ui-filled">Filled</button>
  <button class="ui-button ui-filled">Filled</button>
  <button class="ui-button ui-filled">Filled</button>
</div>
```

## Colors

Add a `.ui-primary` or `.ui-critical` class to recolor the entire group. The default is a neutral gray.

```html
<div class="ui-button-group ui-primary ui-filled" role="group">
  <button class="ui-button">Primary</button>
  <button class="ui-button">Primary</button>
  <button class="ui-button">Primary</button>
</div>


<div class="ui-button-group ui-critical ui-filled" role="group">
  <button class="ui-button">Critical</button>
  <button class="ui-button">Critical</button>
  <button class="ui-button">Critical</button>
</div>
```

## Icons

Yes of course, they're just [buttons.](https://open-props-ui.netlify.app/html/components/button.md)

`.ui-icon-only` keeps icon-only buttons square.

```html
<div role="group" class="ui-button-group ui-outlined">
  <button class="ui-button ui-icon-only" aria-label="Label">
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
  </button>


  <button class="ui-button" aria-label="Label">Maybe</button>


  <button class="ui-button ui-icon-only" aria-label="Label">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
    >
      <path
        fill="currentColor"
        d="M26.29 4.293a1 1 0 1 1 1.414 1.414L17.413 16l10.291 10.29a1 1 0 1 1-1.414 1.414L16 17.413L5.707 27.704a1 1 0 0 1-1.414-1.414L14.585 16L4.293 5.707a1 1 0 0 1 1.414-1.414L16 14.584z"
      ></path>
    </svg>
  </button>
</div>


<div role="group" class="ui-button-group ui-outlined">
  <button class="ui-button">
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
    OK
  </button>


  <button class="ui-button">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
    >
      <path
        fill="currentColor"
        d="M11.499 10.803A4.505 4.505 0 0 1 16 6.5a4.5 4.5 0 0 1 4.5 4.5c0 1.276-.298 2.02-.676 2.565c-.368.53-.836.925-1.471 1.459l-.286.241c-.745.632-1.614 1.42-2.268 2.628c-.659 1.217-1.049 2.76-1.049 4.857a1.25 1.25 0 0 0 2.5 0c0-1.778.328-2.892.748-3.667c.424-.783.993-1.324 1.685-1.91l.259-.217c.616-.515 1.363-1.139 1.937-1.966C22.579 13.98 23 12.724 23 11a7 7 0 0 0-7-7a7.005 7.005 0 0 0-6.999 6.695a1.25 1.25 0 1 0 2.498.108M16 29a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3"
      ></path>
    </svg>
    Maybe
  </button>


  <button class="ui-button">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
    >
      <path
        fill="currentColor"
        d="M26.29 4.293a1 1 0 1 1 1.414 1.414L17.413 16l10.291 10.29a1 1 0 1 1-1.414 1.414L16 17.413L5.707 27.704a1 1 0 0 1-1.414-1.414L14.585 16L4.293 5.707a1 1 0 0 1 1.414-1.414L16 14.584z"
      ></path>
    </svg>
    No
  </button>
</div>
```

## Split button

A [Menu](https://open-props-ui.netlify.app/html/components/menu.md) after the last button. `.ui-align-end` lines it up with the group.

```html
<div role="group" class="ui-button-group ui-outlined">
  <button class="ui-button">Save</button>


  <button
    class="ui-button ui-icon-only"
    aria-label="More save options"
    commandfor="split-button-menu-html"
    command="toggle-popover"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
    >
      <path
        fill="currentColor"
        d="M5.293 11.293a1 1 0 0 1 1.414 0L16 20.586l9.293-9.293a1 1 0 1 1 1.414 1.414l-10 10a1 1 0 0 1-1.414 0l-10-10a1 1 0 0 1 0-1.414"
      ></path>
    </svg>
  </button>


  <menu
    id="split-button-menu-html"
    class="ui-menu ui-list ui-align-end"
    popover="auto"
  >
    <li>
      <button
        type="button"
        command="hide-popover"
        commandfor="split-button-menu-html"
      >
        Save as draft
      </button>
    </li>
    <li>
      <button
        type="button"
        command="hide-popover"
        commandfor="split-button-menu-html"
      >
        Save and publish
      </button>
    </li>
  </menu>
</div>
```

## Sizes

Adjust the size of all buttons in the group using the `.ui-small` and `.ui-large` classes.

```html
<div role="group" class="ui-button-group ui-small ui-outlined">
  <button class="ui-button">Small</button>
  <button class="ui-button">Small</button>
  <button class="ui-button">Small</button>
</div>


<div role="group" class="ui-button-group ui-outlined">
  <button class="ui-button">Default</button>
  <button class="ui-button">Default</button>
  <button class="ui-button">Default</button>
</div>


<div role="group" class="ui-button-group ui-large ui-outlined">
  <button class="ui-button">Large</button>
  <button class="ui-button">Large</button>
  <button class="ui-button">Large</button>
</div>
```

## Vertical orientation

Change the layout of the group with the `.ui-vertical` class.

```html
<div class="example-row">
  <div class="ui-button-group ui-vertical" role="group">
    <button aria-label="Up" class="ui-button">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
    </button>
    <button aria-label="Decrease" class="ui-button">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
    </button>
  </div>


  <div class="ui-button-group ui-outlined ui-vertical" role="group">
    <button aria-label="Up" class="ui-button">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
    </button>
    <button aria-label="Decrease" class="ui-button">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
    </button>
  </div>


  <div class="ui-button-group ui-tonal ui-vertical" role="group">
    <button aria-label="Up" class="ui-button">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
    </button>
    <button aria-label="Decrease" class="ui-button">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
    </button>
  </div>


  <div class="ui-button-group ui-filled ui-vertical" role="group">
    <button aria-label="Up" class="ui-button">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
    </button>
    <button aria-label="Decrease" class="ui-button">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
    </button>
  </div>
</div>


<div class="example-row">
  <div class="ui-button-group ui-vertical" role="group">
    <button class="ui-button">Up</button>
    <button class="ui-button">Down</button>
  </div>
  <div class="ui-button-group ui-outlined ui-vertical" role="group">
    <button class="ui-button">Up</button>
    <button class="ui-button">Down</button>
  </div>
  <div class="ui-button-group ui-tonal ui-vertical" role="group">
    <button class="ui-button">Up</button>
    <button class="ui-button">Down</button>
  </div>
  <div class="ui-button-group ui-filled ui-vertical" role="group">
    <button class="ui-button">Up</button>
    <button class="ui-button">Down</button>
  </div>
</div>
```

## Disabled

Disable individual buttons within a group by adding the `disabled` attribute to each `<button>`.

```html
<div role="group" class="ui-button-group ui-filled">
  <button class="ui-button">Enabled</button>
  <button class="ui-button" disabled>Disabled</button>
  <button class="ui-button">Enabled</button>
</div>


<div role="group" class="ui-button-group ui-filled ui-primary">
  <button class="ui-button">Enabled</button>
  <button class="ui-button" disabled>Disabled</button>
  <button class="ui-button">Enabled</button>
</div>
```

## Anatomy

1. Container: `<element role="group" class="ui-button-group">`
2. Buttons: [Button](https://open-props-ui.netlify.app/html/components/button.md)

```html
<div class="ui-button-group anatomy" role="group">
  <button class="ui-button">Button</button
  ><button class="ui-button">Button</button
  ><button class="ui-button">Button</button>
</div>
```

## API

### Button group

### Button

## Browser support

- Chromium: Full support Supported since v111.
- Firefox: Full support Supported since v113.
- Safari: Full support Supported since v16.2.

See also the [full browser support guide](https://open-props-ui.netlify.app/html/guide/browser-support.md).

## Installation

- `opui-css/css/components/button-group.css`

