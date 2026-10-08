# Button group

Groups related buttons by wrapping them with `class="ui-button-group"` and `role="group"`.

## Anatomy

- `.ui-button-group`

  Container element.

- `& > .ui-button`

  The buttons and button links.

* Button groups should consist of 2-5 buttons.
* Use `.ui-scrollable` or `.ui-shrink` when a group must stay on one row, see [Overflow](#overflow).
* If an icon is used without label text make sure the button communicates clearly what it does.

Button group or Toggle group?

If your buttons depend on state (controlled) - use [Toggle group](https://open-props-ui.netlify.app/html/components/toggle.md).

If you just need to group a bunch of "dumb" (uncontrolled) buttons - use Button group.

## Variants

Change the appearance of the entire group with the `.ui-outlined`, `.ui-tonal`, and `.ui-filled` classes.

```html
<div role="group" class="ui-button-group">
  <button type="button" class="ui-button">Text</button>
  <button type="button" class="ui-button">Text</button>
  <button type="button" class="ui-button">Text</button>
</div>


<div role="group" class="ui-button-group ui-outlined">
  <button type="button" class="ui-button">Outlined</button>
  <button type="button" class="ui-button">Outlined</button>
  <button type="button" class="ui-button">Outlined</button>
</div>


<div role="group" class="ui-button-group ui-tonal">
  <button type="button" class="ui-button">Tonal</button>
  <button type="button" class="ui-button">Tonal</button>
  <button type="button" class="ui-button">Tonal</button>
</div>


<div role="group" class="ui-button-group ui-filled">
  <button type="button" class="ui-button">Filled</button>
  <button type="button" class="ui-button">Filled</button>
  <button type="button" class="ui-button">Filled</button>
</div>
```

## Colors

Add a `.ui-primary` or `.ui-critical` class to recolor the entire group. The default is a neutral gray.

```html
<div class="ui-button-group ui-primary ui-filled" role="group">
  <button type="button" class="ui-button">Primary</button>
  <button type="button" class="ui-button">Primary</button>
  <button type="button" class="ui-button">Primary</button>
</div>


<div class="ui-button-group ui-critical ui-filled" role="group">
  <button type="button" class="ui-button">Critical</button>
  <button type="button" class="ui-button">Critical</button>
  <button type="button" class="ui-button">Critical</button>
</div>
```

## Sizes

Adjust the size of all buttons in the group using the `.ui-x-small`, `.ui-small` and `.ui-large` classes.

```html
<div role="group" class="ui-button-group ui-x-small ui-outlined">
  <button type="button" class="ui-button">x-small</button>
  <button type="button" class="ui-button">x-small</button>
  <button type="button" class="ui-button">x-small</button>
</div>


<div role="group" class="ui-button-group ui-small ui-outlined">
  <button type="button" class="ui-button">Small</button>
  <button type="button" class="ui-button">Small</button>
  <button type="button" class="ui-button">Small</button>
</div>


<div role="group" class="ui-button-group ui-outlined">
  <button type="button" class="ui-button">Default</button>
  <button type="button" class="ui-button">Default</button>
  <button type="button" class="ui-button">Default</button>
</div>


<div role="group" class="ui-button-group ui-large ui-outlined">
  <button type="button" class="ui-button">Large</button>
  <button type="button" class="ui-button">Large</button>
  <button type="button" class="ui-button">Large</button>
</div>
```

## Icons

Yes of course, they're just [buttons.](https://open-props-ui.netlify.app/html/components/button.md) Wrap the label in a `<span class="ui-text">` when the button has an icon. The CSS looks for the wrapper element, the class is a hook for your own styles.

```html
<div role="group" class="ui-button-group ui-outlined">
  <button type="button" class="ui-button" aria-label="OK">
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


  <button type="button" class="ui-button">Maybe</button>


  <button type="button" class="ui-button" aria-label="No">
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
  <button type="button" class="ui-button">
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
    <span class="ui-text">OK</span>
  </button>


  <button type="button" class="ui-button">
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
    <span class="ui-text">Maybe</span>
  </button>


  <button type="button" class="ui-button">
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
    <span class="ui-text">No</span>
  </button>
</div>
```

## Split button

A [Menu](https://open-props-ui.netlify.app/html/components/menu.md) after the last button. `.ui-align-end` lines it up with the group.

```html
<div role="group" class="ui-button-group ui-outlined">
  <button type="button" class="ui-button">Save</button>


  <button
    type="button"
    class="ui-button"
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
    popover
  >
    <li>
      <button
        type="button"
        command="hide-popover"
        commandfor="split-button-menu-html"
      >
        <div class="ui-text"><p>Save as draft</p></div>
      </button>
    </li>
    <li>
      <button
        type="button"
        command="hide-popover"
        commandfor="split-button-menu-html"
      >
        <div class="ui-text"><p>Save and publish</p></div>
      </button>
    </li>
  </menu>
</div>
```

## Disabled

Disable individual buttons within a group by adding the `disabled` attribute to each `<button>`.

```html
<div role="group" class="ui-button-group ui-filled">
  <button type="button" class="ui-button">Enabled</button>
  <button type="button" class="ui-button" disabled>Disabled</button>
  <button type="button" class="ui-button">Enabled</button>
</div>


<div role="group" class="ui-button-group ui-filled ui-primary">
  <button type="button" class="ui-button">Enabled</button>
  <button type="button" class="ui-button" disabled>Disabled</button>
  <button type="button" class="ui-button">Enabled</button>
</div>
```

## Vertical orientation

Change the layout of the group with the `.ui-vertical` class.

```html
<div class="example-row">
  <div class="ui-button-group ui-vertical" role="group">
    <button type="button" aria-label="Increase" class="ui-button">
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
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
    </button>
    <button type="button" aria-label="Decrease" class="ui-button">
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
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
    </button>
  </div>


  <div class="ui-button-group ui-outlined ui-vertical" role="group">
    <button type="button" aria-label="Increase" class="ui-button">
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
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
    </button>
    <button type="button" aria-label="Decrease" class="ui-button">
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
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
    </button>
  </div>


  <div class="ui-button-group ui-tonal ui-vertical" role="group">
    <button type="button" aria-label="Increase" class="ui-button">
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
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
    </button>
    <button type="button" aria-label="Decrease" class="ui-button">
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
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
    </button>
  </div>


  <div class="ui-button-group ui-filled ui-vertical" role="group">
    <button type="button" aria-label="Increase" class="ui-button">
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
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
    </button>
    <button type="button" aria-label="Decrease" class="ui-button">
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
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
    </button>
  </div>
</div>


<div class="example-row">
  <div class="ui-button-group ui-vertical" role="group">
    <button type="button" class="ui-button">Up</button>
    <button type="button" class="ui-button">Down</button>
  </div>
  <div class="ui-button-group ui-outlined ui-vertical" role="group">
    <button type="button" class="ui-button">Up</button>
    <button type="button" class="ui-button">Down</button>
  </div>
  <div class="ui-button-group ui-tonal ui-vertical" role="group">
    <button type="button" class="ui-button">Up</button>
    <button type="button" class="ui-button">Down</button>
  </div>
  <div class="ui-button-group ui-filled ui-vertical" role="group">
    <button type="button" class="ui-button">Up</button>
    <button type="button" class="ui-button">Down</button>
  </div>
</div>
```

## Overflow

Buttons wrap onto more rows when they don't fit. Add `.ui-scrollable` to keep them on one row and scroll them sideways, or `.ui-shrink` to keep them on one row and truncate their labels. Icon-only items keep their size.

```html
<div style="display: grid; gap: var(--size-3); max-inline-size: 18rem">
  <div role="group" class="ui-button-group ui-outlined">
    <button type="button" class="ui-button">Archive</button>
    <button type="button" class="ui-button">Move to folder</button>
    <button type="button" class="ui-button">Mark as unread</button>
    <button type="button" class="ui-button">Delete</button>
  </div>
  <div role="group" class="ui-button-group ui-outlined ui-scrollable">
    <button type="button" class="ui-button">Archive</button>
    <button type="button" class="ui-button">Move to folder</button>
    <button type="button" class="ui-button">Mark as unread</button>
    <button type="button" class="ui-button">Delete</button>
  </div>
  <div role="group" class="ui-button-group ui-outlined ui-shrink">
    <button type="button" class="ui-button">Archive</button>
    <button type="button" class="ui-button">Move to folder</button>
    <button type="button" class="ui-button">Mark as unread</button>
    <button type="button" class="ui-button">Delete</button>
  </div>
</div>
```

## API

### Button group API

| Type        | Modifiers                                 | Default | Description                                                                                                       |
| ----------- | ----------------------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------- |
| Colors      | `.ui-critical`, `.ui-primary`             | -       | Optional colors for the buttons.                                                                                  |
| Orientation | `.ui-vertical`                            | -       | The orientation of the element.                                                                                   |
| Overflow    | `.ui-scrollable`                          | -       | Keeps the items on one row and scrolls them sideways when they don't fit. By default they wrap onto more rows.    |
| Overflow    | `.ui-shrink`                              | -       | Keeps the items on one row and shrinks them, truncating labels with an ellipsis. Icon-only items keep their size. |
| Sizes       | `.ui-large`, `.ui-small`, `.ui-x-small`   | -       | The size of the buttons.                                                                                          |
| Variants    | `.ui-filled`, `.ui-outlined`, `.ui-tonal` | -       | The variant of the buttons.                                                                                       |

#### Parts

| Part               | Description                   |
| ------------------ | ----------------------------- |
| `.ui-button-group` | Container element.            |
| `& > .ui-button`   | The buttons and button links. |

#### CSS variables

| Variable                      | Default                                                                               | Description                                                                                                                                                                                                  |
| ----------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `--border-width`              | `1px`                                                                                 | Default border width for components that draw a border.                                                                                                                                                      |
| `--button-border-radius`      | `var(--size-2)`                                                                       | Corner radius for `Button`, `ButtonGroup`, `ToggleButton` and `ToggleGroup`.                                                                                                                                 |
| `--button-size`               | `var(--control-size)`                                                                 | Default `Button` height.                                                                                                                                                                                     |
| `--button-size-large`         | `var(--control-size-large)`                                                           | `Button` height with `.ui-large`.                                                                                                                                                                            |
| `--button-size-small`         | `var(--control-size-small)`                                                           | `Button` height with `.ui-small`.                                                                                                                                                                            |
| `--button-size-x-small`       | `var(--control-size-x-small)`                                                         | `Button` and `ButtonGroup` height with `.ui-x-small`.                                                                                                                                                        |
| `--critical`                  | `var(--red)`                                                                          | Severity color for errors and destructive actions.                                                                                                                                                           |
| `--disabled-opacity`          | `0.64`                                                                                | Opacity applied to disabled controls.                                                                                                                                                                        |
| `--duration-fast`             | `0.1s`                                                                                | Transition duration for hover and press feedback.                                                                                                                                                            |
| `--ease`                      | `ease`                                                                                | Default easing for transitions.                                                                                                                                                                              |
| `--focus-ring-inset`          | `calc(-1 * var(--focus-ring-width))`                                                  | Negative offset for focus rings drawn inside a control, such as `ButtonGroup`, `List` items and `Select` options.                                                                                            |
| `--font-size-05`              | `0.875rem`                                                                            | A font size between Open Props `--font-size-0` and `--font-size-1`, used for labels and compact text.                                                                                                        |
| `--font-weight-bold`          | `var(--font-weight-7)`                                                                | Font weight for headings, buttons and terms.                                                                                                                                                                 |
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

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md) for the full list.

The root needs `role="group"`.

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

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md) for the full list.

## Under the hood

1. Join

   - Buttons drop their own radius, `overflow: hidden` on the group rounds the outer corners
   - `flex: auto` stretches the buttons to fill a wrapped row
   - `role="group"` tells assistive tech the buttons belong together, and the styles require it, so it can't be forgotten

2. Dividers

   - Each button draws a line along its left and top edge
   - The group clips the lines on the outer edges, so only the gaps between buttons show one
   - Physical is fine here: in right-to-left the clipped outer edge just switches sides
   - Drag **Width**: wrapped rows get a divider on top for free
   - Relative color: one shade darker in light mode, lighter in dark

3. Outline

   - The outline is always there, transparent until `.outlined` gives `--edge` a strong color
   - `outline` takes no space and `overflow` can't clip it
   - `outline-offset: -1px` pulls it in on top of the buttons' outer edge
   - The dividers switch to the same color, nothing else changes

Step 1 of 3: Join

```html
<div class="group" role="group">
  <button type="button">Day</button>
  <button type="button">Week</button>
  …
</div>
```

```css
[role="group"].group {
  border-radius: var(--radius-2);
  display: inline-flex;
  flex-wrap: wrap;
  inline-size: fit-content;
  max-inline-size: 100%;
  overflow: hidden;
}


[role="group"].group > button {
  border-radius: 0;
  flex: auto;
}
```

Step 2 of 3: Dividers

- [`light-dark()` ](https://webstatus.dev/features/light-dark)(Newly available): Chrome 123+, Edge 123+, Firefox 120+, Safari 17.5+
- [Relative colors ](https://webstatus.dev/features/relative-color)(Newly available): Chrome 125+, Edge 125+, Firefox 128+, Safari 18+

```css
[role="group"].group > button {
  --divider: light-dark(
    oklch(from var(--surface-tonal) calc(l - 0.1) c h),
    oklch(from var(--surface-tonal) calc(l + 0.1) c h)
  );
  box-shadow:
    -1px 0 0 0 var(--divider),
    0 -1px 0 0 var(--divider);
}
```

Step 3 of 3: Outline

- [`light-dark()` ](https://webstatus.dev/features/light-dark)(Newly available): Chrome 123+, Edge 123+, Firefox 120+, Safari 17.5+

```html
<div class="group outlined" role="group">…</div>
```

```css
[role="group"].group {
  --edge: transparent;
  outline: 1px solid var(--edge);
  outline-offset: -1px;
}


[role="group"].group.outlined {
  --edge: light-dark(var(--color-16), var(--color-1));
}


[role="group"].group.outlined > button {
  --divider: var(--edge);
}
```

## Browser support

- Chromium: Full support Supported since v125.
- Firefox: Full support Supported since v151.
- Safari: Full support Supported since v18.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/html/guide/browser-support/?components=Button+Group.md).

## Installation

### Dependencies

- [Button](https://open-props-ui.netlify.app/html/components/button.md)

- `opui-css/css/components/button-group.css`
- `opui-css/css/components/button.css`

## Changelog

### What's new

- Icon-only buttons use the same [icon size](#icons) as buttons with a label.
- The focus ring shows on every [variant](#variants), inside the button.
- [Split button](#split-button) with a `Menu`.
- [Icon-only](#icons) buttons stay square.
- Breaking: [variants](#variants) apply to the whole group. A variant on a single button inside a group is no longer supported.
- [x-small](#sizes) size with `.ui-x-small`.
- [Small](#sizes) groups use the same text size as a small `Button`.
- [Wraps](#overflow) when it doesn't fit, or scrolls with `.ui-scrollable` or truncates with `.ui-shrink`.
- `<a class="ui-button">` links get the group styles too, see [Variants](#variants).
