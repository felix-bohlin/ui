# Switch

Use a Switch for a setting that applies right away. Use a [Checkbox](https://open-props-ui.netlify.app/html/components/checkbox.md) for choices that are submitted with a form, and a [Toggle](https://open-props-ui.netlify.app/html/components/toggle.md) for options in a toolbar. See also: [Switch field group](#field-group).

## Anatomy

Theme Label End text

- `label.ui-switch`

  Container element.

- `<input>`

  The switch input.

- `.ui-icon-unchecked`

  An optional icon in the thumb when unchecked.

- `.ui-icon-checked`

  An optional icon in the thumb when checked.

- `.ui-label`

  The label.

- `.ui-end-text`

  Supporting text displayed below the label.

## Basics

All switches should have an accessible name. Put the label text inside the component, also when there's no visible label: use `.ui-sr-only` instead of `.ui-label`.

```html
<!-- Checked -->
<label class="ui-switch">
  <input name="switch-variants" type="checkbox" role="switch" checked />
  <span class="ui-sr-only">Label</span>
</label>

<!-- Unchecked -->
<label class="ui-switch">
  <input name="switch-variants" type="checkbox" role="switch" />
  <span class="ui-sr-only">Label</span>
</label>

<!-- Checked & disabled -->
<label class="ui-switch">
  <input
    name="switch-variants"
    type="checkbox"
    role="switch"
    checked
    disabled
  />
  <span class="ui-sr-only">Label</span>
</label>

<!-- Unchecked & disabled -->
<label class="ui-switch">
  <input name="switch-variants" type="checkbox" role="switch" disabled />
  <span class="ui-sr-only">Label</span>
</label>
```

## Sizes

Choose between four sizes: `.ui-x-small`, `.ui-small`, default and `.ui-large`, on the `<label class="ui-switch">`.

```html
<div class="example-row">
  <label class="ui-switch ui-x-small">
    <input name="switch-sizes" type="checkbox" role="switch" checked />
    <span class="ui-sr-only">x-small</span>
  </label>

  <label class="ui-switch ui-small">
    <input name="switch-sizes" type="checkbox" role="switch" checked />
    <span class="ui-sr-only">Small</span>
  </label>

  <label class="ui-switch">
    <input name="switch-sizes" type="checkbox" role="switch" checked />
    <span class="ui-sr-only">Default</span>
  </label>

  <label class="ui-switch ui-large">
    <input name="switch-sizes" type="checkbox" role="switch" checked />
    <span class="ui-sr-only">Large</span>
  </label>
</div>

<div class="example-row">
  <label class="ui-switch ui-x-small">
    <input name="switch-sizes" type="checkbox" role="switch" checked />
    <span class="ui-label">x-small</span>
  </label>

  <label class="ui-switch ui-small">
    <input name="switch-sizes" type="checkbox" role="switch" checked />
    <span class="ui-label">Small</span>
  </label>

  <label class="ui-switch">
    <input name="switch-sizes" type="checkbox" role="switch" checked />
    <span class="ui-label">Default</span>
  </label>

  <label class="ui-switch ui-large">
    <input name="switch-sizes" type="checkbox" role="switch" checked />
    <span class="ui-label">Large</span>
  </label>
</div>
```

## Visible label

Render the label text inside an element with a `.ui-label` class. Also, don't miss the info on label [accessibility](#accessibility).

```html
<label class="ui-switch">
  <input name="switch-visible-label" type="checkbox" role="switch" />
  <span class="ui-label">Label</span>
</label>

<label class="ui-switch">
  <input name="switch-visible-label" type="checkbox" role="switch" disabled />
  <span class="ui-label">Disabled</span>
</label>

<label class="ui-switch">
  <input name="switch-visible-label" type="checkbox" role="switch" />
  <span class="ui-label"
    >Long text bacon ipsum dolor amet prosciutto tenderloin biltong leberkas
    ribeye short ribs shankle tri-tip doner buffalo chislic meatloaf
    meatball.</span
  >
</label>
```

### Label position

Add `.ui-stack` to the `<label class="ui-switch">` to put the label under the switch.

```html
<label class="ui-switch">
  <input name="switch-label-position" type="checkbox" role="switch" />
  <span class="ui-label">Default</span>
</label>

<label class="ui-switch ui-stack">
  <input name="switch-label-position" type="checkbox" role="switch" />
  <span class="ui-label">Stack</span>
</label>
```

### End text

```html
<label class="ui-switch">
  <input
    name="switch-supporting-text"
    type="checkbox"
    role="switch"
    aria-describedby="switch-supporting-text-end-text-1"
  />
  <span class="ui-label">Default</span>
  <span class="ui-end-text" id="switch-supporting-text-end-text-1"
    >Supporting text</span
  >
</label>

<label class="ui-switch ui-stack">
  <input
    name="switch-supporting-text"
    type="checkbox"
    role="switch"
    aria-describedby="switch-supporting-text-end-text-2"
  />
  <span class="ui-label">Stack</span>
  <span class="ui-end-text" id="switch-supporting-text-end-text-2"
    >Supporting text</span
  >
</label>
```

## Icons

Put the icons in `.ui-icon-unchecked` and `.ui-icon-checked` spans with `aria-hidden="true"` before the `<input>`.

```html
<label class="ui-switch ui-small">
  <span class="ui-icon-unchecked" aria-hidden="true">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M20.026 17.001c-2.762 4.784-8.879 6.423-13.663 3.661A10 10 0 0 1 3.13 17.68a.75.75 0 0 1 .365-1.132c3.767-1.348 5.785-2.91 6.956-5.146c1.233-2.353 1.551-4.93.689-8.463a.75.75 0 0 1 .769-.927a9.96 9.96 0 0 1 4.457 1.327c4.784 2.762 6.423 8.879 3.66 13.662"
      ></path>
    </svg>
  </span>
  <span class="ui-icon-checked" aria-hidden="true">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M12 2a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 12 2m5 10a5 5 0 1 1-10 0a5 5 0 0 1 10 0m4.25.75a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5zM12 19a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 12 19m-7.75-6.25a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5zm-.03-8.53a.75.75 0 0 1 1.06 0l1.5 1.5a.75.75 0 0 1-1.06 1.06l-1.5-1.5a.75.75 0 0 1 0-1.06m1.06 15.56a.75.75 0 1 1-1.06-1.06l1.5-1.5a.75.75 0 1 1 1.06 1.06zm14.5-15.56a.75.75 0 0 0-1.06 0l-1.5 1.5a.75.75 0 0 0 1.06 1.06l1.5-1.5a.75.75 0 0 0 0-1.06m-1.06 15.56a.75.75 0 1 0 1.06-1.06l-1.5-1.5a.75.75 0 1 0-1.06 1.06z"
      ></path>
    </svg>
  </span>
  <input name="switch-icons" type="checkbox" role="switch" />
  <span class="ui-sr-only">Toggle theme</span>
</label>

<label class="ui-switch">
  <span class="ui-icon-unchecked" aria-hidden="true">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M20.026 17.001c-2.762 4.784-8.879 6.423-13.663 3.661A10 10 0 0 1 3.13 17.68a.75.75 0 0 1 .365-1.132c3.767-1.348 5.785-2.91 6.956-5.146c1.233-2.353 1.551-4.93.689-8.463a.75.75 0 0 1 .769-.927a9.96 9.96 0 0 1 4.457 1.327c4.784 2.762 6.423 8.879 3.66 13.662"
      ></path>
    </svg>
  </span>
  <span class="ui-icon-checked" aria-hidden="true">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M12 2a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 12 2m5 10a5 5 0 1 1-10 0a5 5 0 0 1 10 0m4.25.75a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5zM12 19a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 12 19m-7.75-6.25a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5zm-.03-8.53a.75.75 0 0 1 1.06 0l1.5 1.5a.75.75 0 0 1-1.06 1.06l-1.5-1.5a.75.75 0 0 1 0-1.06m1.06 15.56a.75.75 0 1 1-1.06-1.06l1.5-1.5a.75.75 0 1 1 1.06 1.06zm14.5-15.56a.75.75 0 0 0-1.06 0l-1.5 1.5a.75.75 0 0 0 1.06 1.06l1.5-1.5a.75.75 0 0 0 0-1.06m-1.06 15.56a.75.75 0 1 0 1.06-1.06l-1.5-1.5a.75.75 0 1 0-1.06 1.06z"
      ></path>
    </svg>
  </span>
  <input name="switch-icons" type="checkbox" role="switch" checked />
  <span class="ui-sr-only">Toggle theme</span>
</label>
```

## Validation

- `[required]` toggles the required styles on the `<input>`.
- `aria-invalid="true"` toggles the invalid styles, and screen readers announce the `<input>` as invalid. Say what's wrong in the end text. Point `aria-describedby` at it.
- Switches also get the invalid styles from the browser's own validation (`:user-invalid`), after the user has edited them. Use `aria-invalid="true"` for server-side errors.

```html
<div class="example-row ui-spacious">
  <label class="ui-switch">
    <input name="switch-validation" type="checkbox" role="switch" required />
    <span class="ui-label">Default</span>
  </label>

  <label class="ui-switch ui-stack">
    <input name="switch-validation" type="checkbox" role="switch" required />
    <span class="ui-label">Stack</span>
  </label>
</div>

<div class="example-row ui-spacious">
  <label class="ui-switch">
    <input
      aria-invalid="true"
      name="switch-validation"
      type="checkbox"
      role="switch"
      aria-describedby="switch-validation-end-text-1"
    />
    <span class="ui-label">Default</span>
    <span class="ui-end-text" id="switch-validation-end-text-1"
      >Supporting text</span
    >
  </label>

  <label class="ui-switch ui-stack">
    <input
      aria-invalid="true"
      name="switch-validation"
      type="checkbox"
      role="switch"
      aria-describedby="switch-validation-end-text-2"
    />
    <span class="ui-label">Stack</span>
    <span class="ui-end-text" id="switch-validation-end-text-2"
      >Supporting text</span
    >
  </label>
</div>
```

## Spread

Add the `.ui-spread` class to the `<label class="ui-switch">` to push the label to the left and the switch to the right. This is useful for full-width items like lists and menus.

```html
<label class="ui-switch ui-spread">
  <input
    name="switch-spread"
    type="checkbox"
    role="switch"
    aria-describedby="switch-spread-end-text-1"
  />
  <span class="ui-label">Notifications</span>
  <span class="ui-end-text" id="switch-spread-end-text-1"
    >Receive alerts when someone mentions you.</span
  >
</label>

<label class="ui-switch ui-spread">
  <input
    name="switch-spread"
    type="checkbox"
    role="switch"
    required
    aria-describedby="switch-spread-end-text-2"
  />
  <span class="ui-label">Required</span>
  <span class="ui-end-text" id="switch-spread-end-text-2"
    >You must accept this to proceed.</span
  >
</label>

<label class="ui-switch ui-spread">
  <input
    name="switch-spread"
    type="checkbox"
    role="switch"
    disabled
    aria-describedby="switch-spread-end-text-3"
  />
  <span class="ui-label">Disabled</span>
  <span class="ui-end-text" id="switch-spread-end-text-3"
    >This switch is disabled.</span
  >
</label>

<label class="ui-switch ui-spread">
  <input
    aria-invalid="true"
    name="switch-spread"
    type="checkbox"
    role="switch"
    aria-describedby="switch-spread-end-text-4"
  />
  <span class="ui-label">Invalid Switch</span>
  <span class="ui-end-text" id="switch-spread-end-text-4"
    >There is an error with this switch.</span
  >
</label>
```

## Label alignment

The switch lines up with the first line of its label and centers on the label's capital letters, so it looks centered in any font and at any size. If a font still looks off, nudge the label with `--choice-label-offset`, in `em` or `cap` so it scales with the label.

```css
:root {
  --choice-label-offset: 0.05em;
}
```

## Field group

Use field groups to group related switches.

Give every `<input>` in the group the same `name` attribute so they're submitted together.

See also: [Form documentation](https://open-props-ui.netlify.app/html/components/form.md).

```html
<div class="ui-form">
  <fieldset class="ui-fieldset">
    <legend>Legend</legend>
    <div class="ui-field-group">
      <label class="ui-switch">
        <input name="switch-group" type="checkbox" role="switch" />
        <span class="ui-label">Switch 1</span>
      </label>
      <label class="ui-switch">
        <input name="switch-group" type="checkbox" role="switch" />
        <span class="ui-label">Switch 2</span>
      </label>
      <label class="ui-switch">
        <input name="switch-group" type="checkbox" role="switch" />
        <span class="ui-label">Switch 3</span>
      </label>
    </div>
  </fieldset>
</div>
```

### Direction

```html
<form class="ui-form">
  <fieldset class="ui-fieldset">
    <legend>Legend</legend>
    <div class="ui-field-group ui-row">
      <label class="ui-switch">
        <input name="switch-group-direction" type="checkbox" role="switch" />
        <span class="ui-label">Switch 1</span>
      </label>
      <label class="ui-switch">
        <input name="switch-group-direction" type="checkbox" role="switch" />
        <span class="ui-label">Switch 2</span>
      </label>
      <label class="ui-switch">
        <input name="switch-group-direction" type="checkbox" role="switch" />
        <span class="ui-label">Switch 3</span>
      </label>
    </div>
  </fieldset>
</form>
```

### Field description

Can be placed above and below the fields.

```html
<form class="ui-form">
  <fieldset class="ui-fieldset">
    <legend>Legend</legend>
    <p class="ui-field-description">Field description above fields</p>
    <div class="ui-field-group ui-row">
      <label class="ui-switch">
        <input
          name="switch-group-field-description-1"
          type="checkbox"
          role="switch"
        />
        <span class="ui-label">Switch 1</span>
      </label>
      <label class="ui-switch">
        <input
          name="switch-group-field-description-1"
          type="checkbox"
          role="switch"
        />
        <span class="ui-label">Switch 2</span>
      </label>
      <label class="ui-switch">
        <input
          name="switch-group-field-description-1"
          type="checkbox"
          role="switch"
        />
        <span class="ui-label">Switch 3</span>
      </label>
    </div>
  </fieldset>

  <fieldset class="ui-fieldset">
    <legend>Legend</legend>
    <div class="ui-field-group ui-row">
      <label class="ui-switch">
        <input
          name="switch-group-field-description-2"
          type="checkbox"
          role="switch"
        />
        <span class="ui-label">Switch 1</span>
      </label>
      <label class="ui-switch">
        <input
          name="switch-group-field-description-2"
          type="checkbox"
          role="switch"
        />
        <span class="ui-label">Switch 2</span>
      </label>
      <label class="ui-switch">
        <input
          name="switch-group-field-description-2"
          type="checkbox"
          role="switch"
        />
        <span class="ui-label">Switch 3</span>
      </label>
    </div>
    <p class="ui-field-description">Field description below fields</p>
  </fieldset>
</form>
```

### Disabled

Attach the `disabled` attribute to the `<fieldset>` element to disable every switch in it, or to a single `<input>`.

`aria-disabled="true"` on the `<input>` looks the same, but keeps the switch focusable and its value in the form. It doesn't stop the change, so block it with a script.

```html
<form class="ui-form">
  <fieldset class="ui-fieldset" disabled>
    <legend>Legend</legend>
    <div class="ui-field-group ui-row">
      <label class="ui-switch">
        <input name="switch-group-disabled" type="checkbox" role="switch" />
        <span class="ui-label">Switch 1</span>
      </label>
      <label class="ui-switch">
        <input name="switch-group-disabled" type="checkbox" role="switch" />
        <span class="ui-label">Switch 2</span>
      </label>
      <label class="ui-switch">
        <input name="switch-group-disabled" type="checkbox" role="switch" />
        <span class="ui-label">Switch 3</span>
      </label>
    </div>
  </fieldset>
</form>
```

### Required

Each switch with `required` must be on before the form submits. There's no native "at least one" for switches.

```html
<form class="ui-form">
  <fieldset class="ui-fieldset">
    <legend>These are required!</legend>
    <div class="ui-field-group ui-row">
      <label class="ui-switch">
        <input
          name="switch-group-required"
          type="checkbox"
          role="switch"
          required
        />
        <span class="ui-label">Switch 1</span>
      </label>
      <label class="ui-switch">
        <input
          name="switch-group-required"
          type="checkbox"
          role="switch"
          required
        />
        <span class="ui-label">Switch 2</span>
      </label>
      <label class="ui-switch">
        <input
          name="switch-group-required"
          type="checkbox"
          role="switch"
          required
        />
        <span class="ui-label">Switch 3</span>
      </label>
    </div>
  </fieldset>
</form>
```

### Validation

Add `aria-invalid="true"` to each `<input>` in the group. The end text of the `.ui-fieldset` turns red with them.

Give the end text an `id` and point `aria-describedby` on the fieldset at it, so screen readers read the error with the group.

```html
<form class="ui-form">
  <fieldset aria-describedby="switch-group-error" class="ui-fieldset">
    <legend>Legend</legend>
    <div class="ui-field-group ui-row">
      <label class="ui-switch">
        <input
          aria-invalid="true"
          name="switch-field-group-validation"
          type="checkbox"
          role="switch"
        />
        <span class="ui-label">Switch 1</span>
      </label>
      <label class="ui-switch">
        <input
          aria-invalid="true"
          name="switch-field-group-validation"
          type="checkbox"
          role="switch"
        />
        <span class="ui-label">Switch 2</span>
      </label>
      <label class="ui-switch">
        <input
          aria-invalid="true"
          name="switch-field-group-validation"
          type="checkbox"
          role="switch"
        />
        <span class="ui-label">Switch 3</span>
      </label>
    </div>
    <span class="ui-end-text" id="switch-group-error"
      >Something went wrong!</span
    >
  </fieldset>
</form>
```

## Accessibility

### Role & attributes

| Role/attribute  | Usage                                                                            |
| --------------- | -------------------------------------------------------------------------------- |
| `role="switch"` | Required on the `input` element. Identifies the element that serves as a switch. |

### Labels

Accessible switches should have a label. The first two approaches are equally ok:

| Approach                                                       | Usage in Switch component                                                                                                                |
| -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Provide a label inside the element                             | Use a `.ui-label` child for a [visible label](#visible-label), or a `.ui-sr-only` child to hide it visually while keeping it accessible. |
| Add an `aria-label` on the input                               | Not used. Use `.ui-sr-only` instead, also for icon-only switches.                                                                        |
| Have a visible label that you reference with `aria-labelledby` | Not used.                                                                                                                                |

### Keyboard support

| Key     | Function                                     |
| ------- | -------------------------------------------- |
| `Space` | When Switch is focused it changes its state. |

## API

### Switch API

| Type       | Modifiers                               | Default | Description                                       |
| ---------- | --------------------------------------- | ------- | ------------------------------------------------- |
| Sizes      | `.ui-large`, `.ui-small`, `.ui-x-small` | -       | The size of the element.                          |
| Spread     | `.ui-spread`                            | -       | Pushes the label and the switch to opposite ends. |
| Stack      | `.ui-stack`                             | -       | Stacks the label under the switch.                |
| Validation | `input[aria-invalid="true"]`            | -       | Marks the control invalid and shows error styles. |

#### Parts

| Part                 | Description                                   |
| -------------------- | --------------------------------------------- |
| `label.ui-switch`    | Container element.                            |
| `<input>`            | The switch input.                             |
| `.ui-icon-unchecked` | An optional icon in the thumb when unchecked. |
| `.ui-icon-checked`   | An optional icon in the thumb when checked.   |
| `.ui-label`          | The label.                                    |
| `.ui-end-text`       | Supporting text displayed below the label.    |

#### CSS variables

| Variable                        | Default                                                                                 | Description                                                                                                                                                                                                  |
| ------------------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `--choice-label-offset`         | `0px`                                                                                   | Moves `Checkbox`, `Radio` and `Switch` labels down (positive) or up (negative) against their control. Use `em` or `cap` to scale with the label font.                                                        |
| `--choice-size`                 | `calc(var(--size-4) * var(--density))`                                                  | Default `Checkbox` and `Radio` input size.                                                                                                                                                                   |
| `--choice-size-large`           | `calc(var(--size-5) * var(--density))`                                                  | `Checkbox` and `Radio` input size with `.ui-large`.                                                                                                                                                          |
| `--choice-size-small`           | `calc(var(--size-3) * var(--density))`                                                  | `Checkbox` and `Radio` input size with `.ui-small` and inside `List`.                                                                                                                                        |
| `--choice-size-x-small`         | `calc(0.875rem * var(--density))`                                                       | `Checkbox` and `Radio` input size with `.ui-x-small`.                                                                                                                                                        |
| `--disabled-opacity`            | `0.64`                                                                                  | Opacity applied to disabled controls.                                                                                                                                                                        |
| `--duration`                    | `0.2s`                                                                                  | Default transition duration. Multiplied by `--motion`.                                                                                                                                                       |
| `--ease`                        | `ease`                                                                                  | Default easing for transitions.                                                                                                                                                                              |
| `--field-border-width`          | `1px`                                                                                   | Border width for fields, `Checkbox`, `Radio` and `Switch`.                                                                                                                                                   |
| `--field-helper-color`          | `var(--text-muted)`                                                                     | Text color for helper and end text under a field.                                                                                                                                                            |
| `--field-helper-font-size`      | `var(--font-size-0)`                                                                    | Font size for helper and end text under a field.                                                                                                                                                             |
| `--field-helper-line-height`    | `var(--font-lineheight-3)`                                                              | Line height for helper and end text under a field.                                                                                                                                                           |
| `--field-label-color`           | `var(--text-primary)`                                                                   | Text color for field labels.                                                                                                                                                                                 |
| `--field-label-font-size`       | `var(--font-size-05)`                                                                   | Font size for field labels.                                                                                                                                                                                  |
| `--field-label-font-weight`     | `var(--font-weight-semibold)`                                                           | Font weight for emphasized field labels and legends.                                                                                                                                                         |
| `--field-required-color`        | `var(--invalid-text-color)`                                                             | Color of the required asterisk.                                                                                                                                                                              |
| `--focus-ring-color`            | `rgb( from var(--surface-default) calc(255 - r) calc(255 - g) calc(255 - b) )`          | Color of the keyboard focus ring. By default the page background color inverted.                                                                                                                             |
| `--focus-ring-offset`           | `2px`                                                                                   | Distance between a control and its focus ring.                                                                                                                                                               |
| `--focus-ring-style`            | `solid`                                                                                 | Outline style of the focus ring.                                                                                                                                                                             |
| `--focus-ring-width`            | `2px`                                                                                   | Width of the focus ring.                                                                                                                                                                                     |
| `--invalid-color`               | `var(--critical)`                                                                       | Color for invalid field borders, fills and outlines.                                                                                                                                                         |
| `--invalid-text-color`          | `light-dark( var(--invalid-color), oklch(from var(--invalid-color) max(l, 0.75) c h) )` | Color for validation messages and invalid labels. Lighter than `--invalid-color` in dark mode so the text stays readable.                                                                                    |
| `--motion`                      | `1`                                                                                     | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/html/guide/theming.md#motion).     |
| `--primary`                     | `light-dark(var(--color-9), var(--color-6))`                                            | Brand color for primary actions and accents.                                                                                                                                                                 |
| `--primary-contrast`            | `oklch( from var(--primary) clamp(0.15, (0.565 - l) * 1000, 0.98) calc(c * 0.15) h )`   | Text color on `--primary`. Derived with relative color: near-black when the primary's lightness is above 0.565, near-white below, tinted with 15% of its chroma, so a custom `--primary` gets readable text. |
| `--ripple-color`                | `oklch(0.6 0 0 / 0.2)`                                                                  | Halo color for the `Checkbox` and `Radio` hover effect.                                                                                                                                                      |
| `--switch-dot-size`             | `calc(var(--size-3) * var(--density))`                                                  | Diameter of the `Switch` dot.                                                                                                                                                                                |
| `--switch-dot-size-large`       | `calc(var(--size-4) * var(--density))`                                                  | Diameter of the `Switch` dot with `.ui-large`.                                                                                                                                                               |
| `--switch-dot-size-small`       | `calc(0.75rem * var(--density))`                                                        | Diameter of the `Switch` dot with `.ui-small` and inside `List`.                                                                                                                                             |
| `--switch-dot-size-x-small`     | `calc(0.625rem * var(--density))`                                                       | Diameter of the `Switch` dot with `.ui-x-small`.                                                                                                                                                             |
| `--switch-track-height`         | `calc(var(--size-5) * var(--density))`                                                  | Height of the `Switch` track.                                                                                                                                                                                |
| `--switch-track-height-large`   | `calc(var(--size-6) * var(--density))`                                                  | Height of the `Switch` track with `.ui-large`.                                                                                                                                                               |
| `--switch-track-height-small`   | `calc(var(--size-4) * var(--density))`                                                  | Height of the `Switch` track with `.ui-small` and inside `List`.                                                                                                                                             |
| `--switch-track-height-x-small` | `calc(var(--size-3) * var(--density))`                                                  | Height of the `Switch` track with `.ui-x-small`.                                                                                                                                                             |
| `--switch-track-width`          | `calc(var(--size-8) * var(--density))`                                                  | Width of the `Switch` track.                                                                                                                                                                                 |
| `--switch-track-width-large`    | `calc(3.5rem * var(--density))`                                                         | Width of the `Switch` track with `.ui-large`.                                                                                                                                                                |
| `--switch-track-width-small`    | `calc(2.5rem * var(--density))`                                                         | Width of the `Switch` track with `.ui-small` and inside `List`.                                                                                                                                              |
| `--switch-track-width-x-small`  | `calc(var(--size-7) * var(--density))`                                                  | Width of the `Switch` track with `.ui-x-small`.                                                                                                                                                              |
| `--text-primary`                | `light-dark(var(--gray-15), var(--gray-1))`                                             | Emphasized text color for headings, labels and values.                                                                                                                                                       |

This component uses these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md).

The input needs `type="checkbox"` and `role="switch"`. To hide the label, use `.ui-sr-only` instead of `.ui-label`.

### Switch input API

#### Parts

| Part                                    | Description                        |
| --------------------------------------- | ---------------------------------- |
| `<input type="checkbox" role="switch">` | The switch input, without a label. |

#### CSS variables

| Variable                        | Default                                                                                 | Description                                                                                                                                                                                                  |
| ------------------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `--choice-label-offset`         | `0px`                                                                                   | Moves `Checkbox`, `Radio` and `Switch` labels down (positive) or up (negative) against their control. Use `em` or `cap` to scale with the label font.                                                        |
| `--choice-size`                 | `calc(var(--size-4) * var(--density))`                                                  | Default `Checkbox` and `Radio` input size.                                                                                                                                                                   |
| `--choice-size-large`           | `calc(var(--size-5) * var(--density))`                                                  | `Checkbox` and `Radio` input size with `.ui-large`.                                                                                                                                                          |
| `--choice-size-small`           | `calc(var(--size-3) * var(--density))`                                                  | `Checkbox` and `Radio` input size with `.ui-small` and inside `List`.                                                                                                                                        |
| `--choice-size-x-small`         | `calc(0.875rem * var(--density))`                                                       | `Checkbox` and `Radio` input size with `.ui-x-small`.                                                                                                                                                        |
| `--disabled-opacity`            | `0.64`                                                                                  | Opacity applied to disabled controls.                                                                                                                                                                        |
| `--duration`                    | `0.2s`                                                                                  | Default transition duration. Multiplied by `--motion`.                                                                                                                                                       |
| `--ease`                        | `ease`                                                                                  | Default easing for transitions.                                                                                                                                                                              |
| `--field-border-width`          | `1px`                                                                                   | Border width for fields, `Checkbox`, `Radio` and `Switch`.                                                                                                                                                   |
| `--field-helper-color`          | `var(--text-muted)`                                                                     | Text color for helper and end text under a field.                                                                                                                                                            |
| `--field-helper-font-size`      | `var(--font-size-0)`                                                                    | Font size for helper and end text under a field.                                                                                                                                                             |
| `--field-helper-line-height`    | `var(--font-lineheight-3)`                                                              | Line height for helper and end text under a field.                                                                                                                                                           |
| `--field-label-color`           | `var(--text-primary)`                                                                   | Text color for field labels.                                                                                                                                                                                 |
| `--field-label-font-size`       | `var(--font-size-05)`                                                                   | Font size for field labels.                                                                                                                                                                                  |
| `--field-label-font-weight`     | `var(--font-weight-semibold)`                                                           | Font weight for emphasized field labels and legends.                                                                                                                                                         |
| `--field-required-color`        | `var(--invalid-text-color)`                                                             | Color of the required asterisk.                                                                                                                                                                              |
| `--focus-ring-color`            | `rgb( from var(--surface-default) calc(255 - r) calc(255 - g) calc(255 - b) )`          | Color of the keyboard focus ring. By default the page background color inverted.                                                                                                                             |
| `--focus-ring-offset`           | `2px`                                                                                   | Distance between a control and its focus ring.                                                                                                                                                               |
| `--focus-ring-style`            | `solid`                                                                                 | Outline style of the focus ring.                                                                                                                                                                             |
| `--focus-ring-width`            | `2px`                                                                                   | Width of the focus ring.                                                                                                                                                                                     |
| `--invalid-color`               | `var(--critical)`                                                                       | Color for invalid field borders, fills and outlines.                                                                                                                                                         |
| `--invalid-text-color`          | `light-dark( var(--invalid-color), oklch(from var(--invalid-color) max(l, 0.75) c h) )` | Color for validation messages and invalid labels. Lighter than `--invalid-color` in dark mode so the text stays readable.                                                                                    |
| `--motion`                      | `1`                                                                                     | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/html/guide/theming.md#motion).     |
| `--primary`                     | `light-dark(var(--color-9), var(--color-6))`                                            | Brand color for primary actions and accents.                                                                                                                                                                 |
| `--primary-contrast`            | `oklch( from var(--primary) clamp(0.15, (0.565 - l) * 1000, 0.98) calc(c * 0.15) h )`   | Text color on `--primary`. Derived with relative color: near-black when the primary's lightness is above 0.565, near-white below, tinted with 15% of its chroma, so a custom `--primary` gets readable text. |
| `--ripple-color`                | `oklch(0.6 0 0 / 0.2)`                                                                  | Halo color for the `Checkbox` and `Radio` hover effect.                                                                                                                                                      |
| `--switch-dot-size`             | `calc(var(--size-3) * var(--density))`                                                  | Diameter of the `Switch` dot.                                                                                                                                                                                |
| `--switch-dot-size-large`       | `calc(var(--size-4) * var(--density))`                                                  | Diameter of the `Switch` dot with `.ui-large`.                                                                                                                                                               |
| `--switch-dot-size-small`       | `calc(0.75rem * var(--density))`                                                        | Diameter of the `Switch` dot with `.ui-small` and inside `List`.                                                                                                                                             |
| `--switch-dot-size-x-small`     | `calc(0.625rem * var(--density))`                                                       | Diameter of the `Switch` dot with `.ui-x-small`.                                                                                                                                                             |
| `--switch-track-height`         | `calc(var(--size-5) * var(--density))`                                                  | Height of the `Switch` track.                                                                                                                                                                                |
| `--switch-track-height-large`   | `calc(var(--size-6) * var(--density))`                                                  | Height of the `Switch` track with `.ui-large`.                                                                                                                                                               |
| `--switch-track-height-small`   | `calc(var(--size-4) * var(--density))`                                                  | Height of the `Switch` track with `.ui-small` and inside `List`.                                                                                                                                             |
| `--switch-track-height-x-small` | `calc(var(--size-3) * var(--density))`                                                  | Height of the `Switch` track with `.ui-x-small`.                                                                                                                                                             |
| `--switch-track-width`          | `calc(var(--size-8) * var(--density))`                                                  | Width of the `Switch` track.                                                                                                                                                                                 |
| `--switch-track-width-large`    | `calc(3.5rem * var(--density))`                                                         | Width of the `Switch` track with `.ui-large`.                                                                                                                                                                |
| `--switch-track-width-small`    | `calc(2.5rem * var(--density))`                                                         | Width of the `Switch` track with `.ui-small` and inside `List`.                                                                                                                                              |
| `--switch-track-width-x-small`  | `calc(var(--size-7) * var(--density))`                                                  | Width of the `Switch` track with `.ui-x-small`.                                                                                                                                                              |
| `--text-primary`                | `light-dark(var(--gray-15), var(--gray-1))`                                             | Emphasized text color for headings, labels and values.                                                                                                                                                       |

This component uses these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md).

### Field group API

| Type        | Modifiers               | Default | Description                                                                                              |
| ----------- | ----------------------- | ------- | -------------------------------------------------------------------------------------------------------- |
| Orientation | `.ui-column`, `.ui-row` | -       | The orientation of the fields. Without it, fields stack and a group with only buttons lines up in a row. |

#### Parts

| Part              | Description        |
| ----------------- | ------------------ |
| `.ui-field-group` | Container element. |

#### CSS variables

| Variable                     | Default                                                                                 | Description                                                                                                               |
| ---------------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `--disabled-opacity`         | `0.64`                                                                                  | Opacity applied to disabled controls.                                                                                     |
| `--field-helper-color`       | `var(--text-muted)`                                                                     | Text color for helper and end text under a field.                                                                         |
| `--field-helper-font-size`   | `var(--font-size-0)`                                                                    | Font size for helper and end text under a field.                                                                          |
| `--field-helper-line-height` | `var(--font-lineheight-3)`                                                              | Line height for helper and end text under a field.                                                                        |
| `--field-label-color`        | `var(--text-primary)`                                                                   | Text color for field labels.                                                                                              |
| `--field-label-font-weight`  | `var(--font-weight-semibold)`                                                           | Font weight for emphasized field labels and legends.                                                                      |
| `--field-required-color`     | `var(--invalid-text-color)`                                                             | Color of the required asterisk.                                                                                           |
| `--font-size-05`             | `0.875rem`                                                                              | A font size between Open Props `--font-size-0` and `--font-size-1`, used for labels and compact text.                     |
| `--invalid-text-color`       | `light-dark( var(--invalid-color), oklch(from var(--invalid-color) max(l, 0.75) c h) )` | Color for validation messages and invalid labels. Lighter than `--invalid-color` in dark mode so the text stays readable. |
| `--text-muted`               | `light-dark(var(--gray-13), var(--gray-4))`                                             | Body text color.                                                                                                          |

This component uses these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md).

To label the group, wrap it in a `.ui-fieldset` with a `<legend>`.

## Under the hood

Read the post: [A switch from a checkbox](https://open-props-ui.netlify.app/learn/switch-checkbox)

1. Track

   - A checkbox with `role="switch"`: announced as on/off, same form value
   - `appearance: none` frees both pseudo-elements, `::before` is the track
   - `light-dark()` picks the colors per color scheme

2. Dot

   - `::after` is the dot
   - `:checked` moves it to the end: track − dot − gap
   - Logical insets, so it slides the other way in RTL

3. Motion

   - An `outline` in the dot's own color grows it without touching its box
   - Press and hold: `:active` grows it a little more
   - The transition lists position, color and outline, so nothing else animates by accident

4. Icons

   - Icons and input share one grid cell, stacked on the track
   - `:has(:checked)` on the label swaps which icon shows
   - Each icon sits on the side the dot is not
   - `pointer-events: none` lets clicks through to the input
   - A `.ui-sr-only` span names the switch without showing text

Step 1 of 4: Track

- [`appearance` ](https://webstatus.dev/features/appearance)(Widely available): Chrome 84+, Edge 84+, Firefox 80+, Safari 15.4+
- [`light-dark()` ](https://webstatus.dev/features/light-dark)(Newly available): Chrome 123+, Edge 123+, Firefox 120+, Safari 17.5+

```html
<label class="label">
  <input class="switch" type="checkbox" role="switch" />
  <span>Wi-Fi</span>
</label>
```

```css
.switch {
  --dot-color: light-dark(var(--gray-11), var(--gray-14));

  appearance: none;
  block-size: 1.5rem;
  cursor: pointer;
  inline-size: var(--track-width);
  margin: 0;
  position: relative;
}

.switch::before {
  background-color: light-dark(var(--gray-3), var(--gray-8));
  border: 1px solid var(--dot-color);
  border-radius: 1e5px;
  content: "";
  inset: 0;
  position: absolute;
}
```

Step 2 of 4: Dot

- [Logical properties ](https://webstatus.dev/features/logical-properties)(Widely available): Chrome 89+, Edge 89+, Firefox 66+, Safari 15+

```css
.switch::after {
  background-color: var(--dot-color);
  block-size: 1rem;
  border-radius: 50%;
  content: "";
  inline-size: 1rem;
  inset-block-start: 0.25rem;
  inset-inline-start: 0.25rem;
  position: absolute;
}

.switch:checked::before {
  background-color: var(--primary);
  border-color: var(--primary);
}

.switch:checked::after {
  --dot-color: var(--primary-contrast);

  inset-inline-start: calc(var(--track-width) - 1rem - 0.25rem);
}
```

Step 3 of 4: Motion

```css
.switch::before {
  transition:
    background-color 0.2s,
    border-color 0.2s;
}

.switch::after {
  --ring: 0px;

  outline: var(--ring) solid var(--dot-color);
  outline-offset: -1px;
  transition:
    background-color 0.2s var(--ease),
    inset-inline-start 0.2s var(--ease),
    outline-color 0.2s var(--ease),
    outline-width 0.2s var(--ease);
}

.switch:checked::after {
  --ring: 3px;
}

.switch:active::after {
  --ring: 5px;
}
```

Step 4 of 4: Icons

- [`:has()` ](https://webstatus.dev/features/has)(Widely available): Chrome 105+, Edge 105+, Firefox 121+, Safari 15.4+

```html
<label class="label">
  <span class="icon icon-unchecked" aria-hidden="true"><svg>…</svg></span>
  <span class="icon icon-checked" aria-hidden="true"><svg>…</svg></span>
  <input class="switch" type="checkbox" role="switch" />
  <span class="ui-sr-only">Light theme</span>
</label>
```

```css
.label:has(.icon) {
  .icon {
    grid-column: 1;
    grid-row: 1;
    margin-block-start: 0.25rem;
    pointer-events: none;
    z-index: 1;
  }

  .icon-checked {
    display: none;
    margin-inline-start: 0.25rem;
  }

  .icon-unchecked {
    margin-inline-start: calc(var(--track-width) - 1rem - 0.25rem);
  }

  .switch {
    grid-column: 1;
    grid-row: 1;
  }

  &:has(:checked) {
    .icon-checked {
      display: block;
    }

    .icon-unchecked {
      display: none;
    }
  }
}
```

## Browser support

- Chromium: Full support Supported since v125.
- Firefox: Full support Supported since v128.
- Safari: Full support Supported since v18.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/html/guide/browser-support/?components=Switch.md).

## Installation

### See also

- [Form](https://open-props-ui.netlify.app/html/components/form.md)

* `opui-css/css/components/switch.css`
* `opui-css/css/components/choice.css`
* `opui-css/css/components/form.css`

## Changelog

### What's new

- [Lines up](#label-alignment) with the first line of the label and centers on its capitals in any font.
- Without a [visible label](#visible-label), switches center in table cells and lines of text.
- Breaking: mark an invalid switch with `aria-invalid="true"` on the `<input>` instead of `data-invalid` on the root, also in a [group](#field-group-validation) ([Validation](#validation)).
- Takes `.ui-x-small` and `.ui-large`. [Sizes](#sizes)
- Breaking: `--_accent-color` is `--_accent`, and `--_transition-time` and `--_transition-tf` are `--_duration` and `--_ease` ([Under the hood](#under-the-hood)).
- Breaking: [`choice.css`](#basics) holds the layout, label, end text, sizes and disabled styles shared with Checkbox and Radio. Import it before `switch.css`.
