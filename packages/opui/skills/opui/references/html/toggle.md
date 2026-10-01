# Toggle

Buttons (disguised as input checkbox/radio) that can be toggled on and off.

### What's new

- `ToggleButton` and `ToggleGroup` borders follow `--border-width`. See [CSS variables](#api).

## Anatomy

DayWeekMonth

- `.ui-toggle-group`

  Container element.

- `.ui-toggle-button`

  A toggle button.

## Toggle button

```html
<label class="ui-toggle-button">
  <input type="checkbox" id="standalone-demo-1" name="standalone-demo-1" />
  Toggle me
</label>
<label class="ui-toggle-button">
  <input type="checkbox" id="standalone-demo-2" name="standalone-demo-2" />
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
    <path d="M12 21a9 9 0 1 0-9-9 9 9 0 0 0 9 9Z"></path>
    <path d="M12 8v4"></path>
    <path d="M12 16h.01"></path>
  </svg>
  Toggle with icon
</label>
```

## Toggle group

Group toggle buttons by wrapping them in a `<div role="radiogroup" class="ui-toggle-group">` (or `role="group"` when multi-select).

### Multi-select

Use `type="checkbox"` for multi-select groups.

```html
<div role="group" class="ui-toggle-group">
  <label class="ui-toggle-button">
    <input
      type="checkbox"
      id="text-style-bold"
      name="text-style"
      value="bold"
      aria-label="Bold"
    />
    <strong>B</strong>
  </label>
  <label class="ui-toggle-button">
    <input
      type="checkbox"
      id="text-style-italic"
      name="text-style"
      value="italic"
      aria-label="Italic"
    />
    <i>I</i>
  </label>
  <label class="ui-toggle-button">
    <input
      type="checkbox"
      id="text-style-underline"
      name="text-style"
      value="underline"
      aria-label="Underline"
    />
    <u>U</u>
  </label>
</div>
```

### Single-select

Use `type="radio"` for single-select groups.

```html
<div role="radiogroup" class="ui-toggle-group">
  <label class="ui-toggle-button">
    <input
      type="radio"
      id="alignment-left"
      name="alignment"
      value="left"
      aria-label="Align left"
    />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M3 21h18v-2H3v2zm0-4h12v-2H3v2zm0-4h18v-2H3v2zm0-4h12v-2H3v2zm0-6v2h18V3H3z"
      />
    </svg>
  </label>
  <label class="ui-toggle-button">
    <input
      type="radio"
      id="alignment-center"
      checked
      name="alignment"
      value="center"
      aria-label="Align center"
    />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M3 21h18v-2H3v2zm4-4h10v-2H7v2zm-4-4h18v-2H3v2zm4-4h10v-2H7v2zM3 3v2h18V3H3z"
      />
    </svg>
  </label>
  <label class="ui-toggle-button">
    <input
      type="radio"
      id="alignment-right"
      name="alignment"
      value="right"
      aria-label="Align right"
    />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M3 21h18v-2H3v2zm6-4h12v-2H9v2zm-6-4h18v-2H3v2zm6-4h12v-2H9v2zM3 3v2h18V3H3z"
      />
    </svg>
  </label>
</div>
```

### Text + icon

```html
<div role="radiogroup" class="ui-toggle-group">
  <label class="ui-toggle-button">
    <input
      type="radio"
      id="transport-walking"
      checked
      name="transport"
      value="walking"
    />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M13 6.5A2.25 2.25 0 1 0 13 2a2.25 2.25 0 0 0 0 4.5m-2.639-.081c.185.045.35.146.493.272a3.24 3.24 0 0 0 2.904.72c.186-.044.379-.056.564-.01l.132.033a1.5 1.5 0 0 1 .919.673l1.332 2.177a1 1 0 0 0 .657.46l1.431.285a1.5 1.5 0 0 1-.587 2.942l-2.504-.5a1.5 1.5 0 0 1-.986-.688l-.183-.3a.54.54 0 0 0-.966.09a1.5 1.5 0 0 0 .17 1.389l.994 1.433a1.5 1.5 0 0 1 .265.767l.25 4.25a1.5 1.5 0 0 1-2.995.176l-.2-3.391a1 1 0 0 0-.247-.602l-.851-.968a.88.88 0 0 0-1.477.252L7.39 21.061a1.5 1.5 0 0 1-2.783-1.122l3.076-7.634q.02-.081.052-.162l.565-1.47a.469.469 0 0 0-.865-.362l-1.268 2.806a1.5 1.5 0 0 1-2.735-1.232l1.624-3.61a1.5 1.5 0 0 1 .846-.792l3.075-1.14a1.5 1.5 0 0 1 .883-.049z"
      ></path>
    </svg>
    Walking
  </label>
  <label class="ui-toggle-button">
    <input
      type="radio"
      id="transport-cycling"
      name="transport"
      value="cycling"
    />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M12.75 3a.75.75 0 0 0 0 1.5h1.427l.955 3.5H8.5V5.75A.75.75 0 0 0 7.75 5h-3a.75.75 0 0 0 0 1.5H7v2.188L6.698 10.5a4.25 4.25 0 1 0 4.298 4.065l4.656-4.657l.274 1.003a4.25 4.25 0 1 0 1.447-.394l-1.9-6.964A.75.75 0 0 0 14.75 3zm3.58 9.394l.696 2.553a.75.75 0 1 0 1.448-.394L17.777 12a2.75 2.75 0 1 1-1.447.394m-5.765.48a4.26 4.26 0 0 0-2.387-2.128L8.385 9.5h5.554zm-2.64-.611c.71.336 1.254.968 1.471 1.737h-1.76zm-1.48-.246l-.435 2.61a.75.75 0 0 0 .74.873h2.646a2.751 2.751 0 1 1-2.95-3.483"
      ></path>
    </svg>
    Cycling
  </label>
  <label class="ui-toggle-button">
    <input
      type="radio"
      id="transport-commuting"
      name="transport"
      value="commuting"
    />
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
    Commuting
  </label>
</div>
```

### Vertical orientation

Change the layout of the group with the `.ui-vertical` class.

```html
<div role="radiogroup" class="ui-toggle-group ui-vertical">
  <label class="ui-toggle-button">
    <input
      type="radio"
      id="alignment-vertical-left"
      name="alignment-vertical"
      value="left"
      aria-label="Align left"
    />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M3 21h18v-2H3v2zm0-4h12v-2H3v2zm0-4h18v-2H3v2zm0-4h12v-2H3v2zm0-6v2h18V3H3z"
      />
    </svg>
  </label>
  <label class="ui-toggle-button">
    <input
      type="radio"
      id="alignment-vertical-center"
      checked
      name="alignment-vertical"
      value="center"
      aria-label="Align center"
    />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M3 21h18v-2H3v2zm4-4h10v-2H7v2zm-4-4h18v-2H3v2zm4-4h10v-2H7v2zM3 3v2h18V3H3z"
      />
    </svg>
  </label>
  <label class="ui-toggle-button">
    <input
      type="radio"
      id="alignment-vertical-right"
      name="alignment-vertical"
      value="right"
      aria-label="Align right"
    />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M3 21h18v-2H3v2zm6-4h12v-2H9v2zm-6-4h18v-2H3v2zm6-4h12v-2H9v2zM3 3v2h18V3H3z"
      />
    </svg>
  </label>
</div>
```

### Sizes

Choose between three sizes: default, `.ui-x-small` and `.ui-small`.

```html
<label class="ui-toggle-button ui-x-small">
  <input type="checkbox" id="toggle-size-1" />
  x-small
</label>


<label class="ui-toggle-button ui-small">
  <input type="checkbox" id="toggle-size-2" />
  small
</label>


<label class="ui-toggle-button">
  <input type="checkbox" id="toggle-size-3" />
  default
</label>
```

## API

### Toggle group API

| Type        | Modifiers                               | Default          | Description                                                                   |
| ----------- | --------------------------------------- | ---------------- | ----------------------------------------------------------------------------- |
| Orientation | `.ui-vertical`                          | -                | The orientation of the element.                                               |
| Selection   | `[role="group"]`, `[role="radiogroup"]` | `[role="group"]` | Whether one or several buttons can be selected. `"single"` uses radio inputs. |
| Sizes       | default, `.ui-small`, `.ui-x-small`     | default          | The size of the buttons.                                                      |

#### Parts

| Part                | Description        |
| ------------------- | ------------------ |
| `.ui-toggle-group`  | Container element. |
| `.ui-toggle-button` | A toggle button.   |

#### CSS variables

| Variable                 | Default                                     | Description                                                                                     |
| ------------------------ | ------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `--border-color`         | `light-dark(var(--gray-4), var(--gray-12))` | Default border color for cards, lists, tables and dividers.                                     |
| `--border-width`         | `1px`                                       | Default border width for components that draw a border.                                         |
| `--button-border-radius` | `var(--size-2)`                             | Corner radius for `Button`, `ButtonGroup`, `ToggleButton` and `ToggleGroup`.                    |
| `--field-size`           | `var(--control-size)`                       | Default field height.                                                                           |
| `--field-size-small`     | `var(--control-size-small)`                 | Field height with `.ui-small`.                                                                  |
| `--field-size-x-small`   | `var(--control-size-x-small)`               | Field height with `.ui-x-small`.                                                                |
| `--focus-ring-color`     | Unset                                       | Color of the keyboard focus ring. When unset, the ring uses the page background color inverted. |
| `--focus-ring-offset`    | `2px`                                       | Distance between a control and its focus ring.                                                  |
| `--focus-ring-style`     | `solid`                                     | Outline style of the focus ring.                                                                |
| `--focus-ring-width`     | `2px`                                       | Width of the focus ring.                                                                        |
| `--icon-size`            | `var(--size-4)`                             | Default icon size inside components.                                                            |
| `--primary`              | `var(--color-8)`                            | Brand color for primary actions and accents.                                                    |
| `--surface-default`      | `light-dark(var(--gray-1), var(--gray-13))` | Page and card background.                                                                       |
| `--text-muted`           | `light-dark(var(--gray-13), var(--gray-4))` | Body text color.                                                                                |
| `--text-primary`         | `light-dark(var(--gray-15), var(--gray-1))` | Emphasized text color for headings, labels and values.                                          |

Theme tokens this component reads. Override them on `html`or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md)for the full list.

### Toggle button API

| Type  | Modifiers                                       | Default                  | Description                                                |
| ----- | ----------------------------------------------- | ------------------------ | ---------------------------------------------------------- |
| Sizes | `.ui-small`, `.ui-x-small`                      | -                        | The size of the element.                                   |
| State | `.ui-disabled`                                  | -                        | Disables the button.                                       |
| State | `input[checked]`                                | -                        | Selects the button.                                        |
| Type  | `input[type="checkbox"]`, `input[type="radio"]` | `input[type="checkbox"]` | The input type. `"radio"` allows one selection in a group. |

#### Parts

| Part                     | Description                                |
| ------------------------ | ------------------------------------------ |
| `label.ui-toggle-button` | Container element.                         |
| `<input>`                | A visually hidden checkbox or radio input. |

#### CSS variables

| Variable                 | Default                                     | Description                                                                                     |
| ------------------------ | ------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `--border-color`         | `light-dark(var(--gray-4), var(--gray-12))` | Default border color for cards, lists, tables and dividers.                                     |
| `--border-width`         | `1px`                                       | Default border width for components that draw a border.                                         |
| `--button-border-radius` | `var(--size-2)`                             | Corner radius for `Button`, `ButtonGroup`, `ToggleButton` and `ToggleGroup`.                    |
| `--field-size`           | `var(--control-size)`                       | Default field height.                                                                           |
| `--field-size-small`     | `var(--control-size-small)`                 | Field height with `.ui-small`.                                                                  |
| `--field-size-x-small`   | `var(--control-size-x-small)`               | Field height with `.ui-x-small`.                                                                |
| `--focus-ring-color`     | Unset                                       | Color of the keyboard focus ring. When unset, the ring uses the page background color inverted. |
| `--focus-ring-offset`    | `2px`                                       | Distance between a control and its focus ring.                                                  |
| `--focus-ring-style`     | `solid`                                     | Outline style of the focus ring.                                                                |
| `--focus-ring-width`     | `2px`                                       | Width of the focus ring.                                                                        |
| `--icon-size`            | `var(--size-4)`                             | Default icon size inside components.                                                            |
| `--primary`              | `var(--color-8)`                            | Brand color for primary actions and accents.                                                    |
| `--text-muted`           | `light-dark(var(--gray-13), var(--gray-4))` | Body text color.                                                                                |
| `--text-primary`         | `light-dark(var(--gray-15), var(--gray-1))` | Emphasized text color for headings, labels and values.                                          |

Theme tokens this component reads. Override them on `html`or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md)for the full list.

Set `disabled` on the input too. Checkbox inputs also need `aria-pressed`.

## Browser support

- Chromium: Full support Supported since v125.
- Firefox: Full support Supported since v128.
- Safari: Full support Supported since v18.

See also the [full browser support guide](https://open-props-ui.netlify.app/html/guide/browser-support.md).

## Installation

- `opui-css/css/components/toggle-group.css`
- `opui-css/css/components/toggle-button.css`

