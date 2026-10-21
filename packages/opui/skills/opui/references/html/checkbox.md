# Checkbox

Use a Checkbox for choices that are submitted with a form. For a setting that applies right away, use a [Switch](https://open-props-ui.netlify.app/html/components/switch.md), and for options in a toolbar a [Toggle](https://open-props-ui.netlify.app/html/components/toggle.md). See also: [Checkbox field group](#field-group).

## Anatomy

Label End text

- `label.ui-checkbox`

  Container element.

- `<input>`

  The checkbox input.

- `.ui-label`

  The label.

- `.ui-end-text`

  Supporting text displayed below the label.

## Basics

```html
<label class="ui-checkbox">
  <input name="checkbox-basics" type="checkbox" checked />
  <span class="ui-sr-only">Checked</span>
</label>

<label class="ui-checkbox">
  <input name="checkbox-basics" type="checkbox" />
  <span class="ui-sr-only">Unchecked</span>
</label>

<label class="ui-checkbox">
  <input name="checkbox-basics" type="checkbox" data-indeterminate />
  <span class="ui-sr-only">Indeterminate</span>
</label>

<label class="ui-checkbox">
  <input name="checkbox-basics" type="checkbox" disabled />
  <span class="ui-sr-only">Disabled</span>
</label>

<label class="ui-checkbox">
  <input name="checkbox-basics" type="checkbox" checked disabled />
  <span class="ui-sr-only">Checked and disabled</span>
</label>

<script>
  document
    .querySelectorAll('input[type="checkbox"][data-indeterminate]')
    .forEach((input) => (input.indeterminate = true))
</script>
```

## Sizes

Choose between four sizes: `.ui-x-small`, `.ui-small`, default and `.ui-large`, on the `<label class="ui-checkbox">`.

```html
<div class="example-row">
  <label class="ui-checkbox ui-x-small">
    <input name="checkbox-sizes" type="checkbox" checked />
    <span class="ui-sr-only">Label</span>
  </label>

  <label class="ui-checkbox ui-small">
    <input name="checkbox-sizes" type="checkbox" checked />
    <span class="ui-sr-only">Label</span>
  </label>

  <label class="ui-checkbox">
    <input name="checkbox-sizes" type="checkbox" checked />
    <span class="ui-sr-only">Label</span>
  </label>

  <label class="ui-checkbox ui-large">
    <input name="checkbox-sizes" type="checkbox" checked />
    <span class="ui-sr-only">Label</span>
  </label>
</div>

<div class="example-row">
  <label class="ui-checkbox ui-x-small">
    <input name="checkbox-sizes" type="checkbox" checked />
    <span class="ui-label">x-small</span>
  </label>

  <label class="ui-checkbox ui-small">
    <input name="checkbox-sizes" type="checkbox" checked />
    <span class="ui-label">Small</span>
  </label>

  <label class="ui-checkbox">
    <input name="checkbox-sizes" type="checkbox" checked />
    <span class="ui-label">Default</span>
  </label>

  <label class="ui-checkbox ui-large">
    <input name="checkbox-sizes" type="checkbox" checked />
    <span class="ui-label">Large</span>
  </label>
</div>
```

## Visible label

Render the label text inside an element with a `.ui-label` class. Also, don't miss the info on label [accessibility](#accessibility).

```html
<label class="ui-checkbox">
  <input name="checkbox-visible-label" type="checkbox" checked />
  <span class="ui-label">Choice A</span>
</label>

<label class="ui-checkbox">
  <input name="checkbox-visible-label" type="checkbox" disabled />
  <span class="ui-label">Disabled</span>
</label>

<label class="ui-checkbox">
  <input name="checkbox-visible-label" type="checkbox" checked disabled />
  <span class="ui-label">Checked and disabled</span>
</label>

<label class="ui-checkbox">
  <input name="checkbox-visible-label" type="checkbox" />
  <span class="ui-label">
    Long text dolor amet mustache knausgaard +1, blue bottle waistcoat tbh
    semiotics artisan synth stumptown gastropub cornhole
    <a class="ui-link" href="#visible-label">privacy policy ipsum</a>
  </span>
</label>
```

### Label position

```html
<label class="ui-checkbox">
  <input name="checkbox-label-position" type="checkbox" />
  <span class="ui-label">Default</span>
</label>

<label class="ui-checkbox ui-stack">
  <input name="checkbox-label-position" type="checkbox" />
  <span class="ui-label">Stack</span>
</label>
```

### End text

```html
<label class="ui-checkbox">
  <input name="checkbox-end-text" type="checkbox" />
  <span class="ui-label">Default</span>
  <span class="ui-end-text">Supporting text</span>
</label>

<label class="ui-checkbox ui-stack">
  <input name="checkbox-end-text" type="checkbox" />
  <span class="ui-label">Stack</span>
  <span class="ui-end-text">Supporting text</span>
</label>
```

### Validation

- `[required]` toggles the required styles on the `<input>`.
- `aria-invalid="true"` toggles the invalid styles, and screen readers announce the `<input>` as invalid. Say what's wrong in the end text. Keep it inside the `<label>`, so it's part of the field's name.
- Checkboxes also get the invalid styles from the browser's own validation (`:user-invalid`), after the user has edited them. Use `aria-invalid="true"` for server-side errors.

```html
<div class="example-row ui-spacious">
  <label class="ui-checkbox">
    <input name="checkbox-validation" type="checkbox" required />
    <span class="ui-label">Default</span>
  </label>

  <label class="ui-checkbox ui-stack">
    <input name="checkbox-validation" type="checkbox" required />
    <span class="ui-label">Stack</span>
  </label>
</div>

<div class="example-row ui-spacious">
  <label class="ui-checkbox">
    <input
      aria-invalid="true"
      name="checkbox-validation"
      type="checkbox"
      checked
    />
    <span class="ui-label">Default</span>
    <span class="ui-end-text">Check yourself</span>
  </label>

  <label class="ui-checkbox ui-stack">
    <input aria-invalid="true" name="checkbox-validation" type="checkbox" />
    <span class="ui-label">Stack</span>
    <span class="ui-end-text">Before you wreck yourself</span>
  </label>
</div>
```

## Indeterminate

Add `data-indeterminate` to the `<input type="checkbox">` and call `activateIndeterminate()` from `opui-css/css/js/checkbox.js` once the element is in the DOM. The attribute alone has no effect. When you add or remove `data-indeterminate` later, call `syncIndeterminate(input)`.

### JavaScript required

The `indeterminate` state cannot be set with HTML or CSS alone. The browser only exposes it as a property on `HTMLInputElement`, so `activateIndeterminate()` sets `el.indeterminate = true` on every input with `data-indeterminate`. The `:indeterminate` CSS pseudo-class then matches and the dash glyph appears.

```html
<fieldset class="ui-fieldset">
  <legend>
    <label class="ui-checkbox">
      <input type="checkbox" data-indeterminate />
      <span class="ui-label">Select all</span>
    </label>
  </legend>
  <div class="ui-field-group">
    <label class="ui-checkbox">
      <input name="indeterminate-children" type="checkbox" checked />
      <span class="ui-label">Apples</span>
    </label>
    <label class="ui-checkbox">
      <input name="indeterminate-children" type="checkbox" />
      <span class="ui-label">Bananas</span>
    </label>
    <label class="ui-checkbox">
      <input name="indeterminate-children" type="checkbox" />
      <span class="ui-label">Cherries</span>
    </label>
  </div>
</fieldset>

<script>
  {
    document
      .querySelectorAll("fieldset:has(> legend input[data-indeterminate])")
      .forEach((root) => {
        const parent = root.querySelector("legend input")
        const children = [...root.querySelectorAll(".ui-field-group input")]
        if (!parent || children.length === 0) return

        const sync = () => {
          const checkedCount = children.filter((c) => c.checked).length
          parent.checked = checkedCount === children.length
          parent.indeterminate =
            checkedCount > 0 && checkedCount < children.length
        }

        parent.addEventListener("change", () => {
          children.forEach((c) => (c.checked = parent.checked))
          parent.indeterminate = false
        })
        children.forEach((c) => c.addEventListener("change", sync))
        sync()
      })
  }
</script>
```

## Spread

Add the `.ui-spread` class to the `<label class="ui-checkbox">` to push the label to the left and the checkbox to the right. This is useful for full-width items like lists and menus.

```html
<label class="ui-checkbox ui-spread">
  <input name="checkbox-spread" type="checkbox" />
  <span class="ui-label">Accept Terms & Conditions</span>
  <span class="ui-end-text">I have read and agree to the privacy policy.</span>
</label>

<label class="ui-checkbox ui-spread">
  <input name="checkbox-spread" type="checkbox" required />
  <span class="ui-label">Required</span>
  <span class="ui-end-text">You must accept this to continue.</span>
</label>

<label class="ui-checkbox ui-spread">
  <input name="checkbox-spread" type="checkbox" disabled />
  <span class="ui-label">Disabled</span>
  <span class="ui-end-text">This checkbox is disabled.</span>
</label>

<label class="ui-checkbox ui-spread">
  <input aria-invalid="true" name="checkbox-spread" type="checkbox" />
  <span class="ui-label">Invalid Checkbox</span>
  <span class="ui-end-text">There is an error with this checkbox.</span>
</label>
```

## Label alignment

The checkbox lines up with the first line of its label and centers on the label's capital letters, so it looks centered in any font and at any size. If a font still looks off, nudge the label with `--ui-choice-label-offset`, in `em` or `cap` so it scales with the label.

```css
:root {
  --ui-choice-label-offset: 0.05em;
}
```

## Field group

Use field groups to group related checkboxes.

Give every `<input type="checkbox">` in the group the same `name` attribute so they're submitted together.

See also: [Form documentation](https://open-props-ui.netlify.app/html/components/form.md).

```html
<form class="ui-form">
  <fieldset class="ui-fieldset">
    <legend>Legend</legend>
    <div class="ui-field-group">
      <label class="ui-checkbox">
        <input name="checkbox-group" type="checkbox" checked />
        <span class="ui-label">Checkbox 1</span>
      </label>
      <label class="ui-checkbox">
        <input name="checkbox-group" type="checkbox" />
        <span class="ui-label">Checkbox 2</span>
      </label>
      <label class="ui-checkbox">
        <input name="checkbox-group" type="checkbox" />
        <span class="ui-label">Checkbox 3</span>
      </label>
    </div>
  </fieldset>
</form>
```

### Direction

```html
<form class="ui-form">
  <fieldset class="ui-fieldset">
    <legend>Legend</legend>
    <div class="ui-field-group ui-row">
      <label class="ui-checkbox">
        <input name="checkbox-group-direction" type="checkbox" checked />
        <span class="ui-label">Checkbox 1</span>
      </label>
      <label class="ui-checkbox">
        <input name="checkbox-group-direction" type="checkbox" />
        <span class="ui-label">Checkbox 2</span>
      </label>
      <label class="ui-checkbox">
        <input name="checkbox-group-direction" type="checkbox" />
        <span class="ui-label">Checkbox 3</span>
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
      <label class="ui-checkbox">
        <input
          name="checkbox-group-field-description-1"
          type="checkbox"
          checked
        />
        <span class="ui-label">Checkbox 1</span>
      </label>
      <label class="ui-checkbox">
        <input name="checkbox-group-field-description-1" type="checkbox" />
        <span class="ui-label">Checkbox 2</span>
      </label>
      <label class="ui-checkbox">
        <input name="checkbox-group-field-description-1" type="checkbox" />
        <span class="ui-label">Checkbox 3</span>
      </label>
    </div>
  </fieldset>

  <fieldset class="ui-fieldset">
    <legend>Legend</legend>
    <div class="ui-field-group ui-row">
      <label class="ui-checkbox">
        <input
          name="checkbox-group-field-description-2"
          type="checkbox"
          checked
        />
        <span class="ui-label">Checkbox 1</span>
      </label>
      <label class="ui-checkbox">
        <input name="checkbox-group-field-description-2" type="checkbox" />
        <span class="ui-label">Checkbox 2</span>
      </label>
      <label class="ui-checkbox">
        <input name="checkbox-group-field-description-2" type="checkbox" />
        <span class="ui-label">Checkbox 3</span>
      </label>
    </div>
    <p class="ui-field-description">Field description below fields</p>
  </fieldset>
</form>
```

### Disabled

Attach the `disabled` attribute to the `<fieldset>` element to disable every checkbox in it, or to a single `<input>`.

`aria-disabled="true"` on the `<input>` looks the same, but keeps the checkbox focusable and its value in the form. It doesn't stop the change, so block it with a script.

```html
<form class="ui-form">
  <fieldset class="ui-fieldset" disabled>
    <legend>Legend</legend>
    <div class="ui-field-group ui-row">
      <label class="ui-checkbox">
        <input name="checkbox-group-disabled" type="checkbox" checked />
        <span class="ui-label">Checkbox 1</span>
      </label>
      <label class="ui-checkbox">
        <input name="checkbox-group-disabled" type="checkbox" />
        <span class="ui-label">Checkbox 2</span>
      </label>
      <label class="ui-checkbox">
        <input name="checkbox-group-disabled" type="checkbox" />
        <span class="ui-label">Checkbox 3</span>
      </label>
    </div>
  </fieldset>
</form>
```

### Required

Each checkbox with `required` must be checked before the form submits. There's no native "at least one" for checkboxes.

```html
<form class="ui-form">
  <fieldset class="ui-fieldset">
    <legend>These are required!</legend>
    <div class="ui-field-group ui-row">
      <label class="ui-checkbox">
        <input name="checkbox-group-required" type="checkbox" required />
        <span class="ui-label">Checkbox 1</span>
      </label>
      <label class="ui-checkbox">
        <input name="checkbox-group-required" type="checkbox" required />
        <span class="ui-label">Checkbox 2</span>
      </label>
      <label class="ui-checkbox">
        <input name="checkbox-group-required" type="checkbox" required />
        <span class="ui-label">Checkbox 3</span>
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
  <fieldset
    aria-describedby="checkbox-field-group-validation-1-error"
    class="ui-fieldset"
  >
    <legend>Legend</legend>
    <div class="ui-field-group ui-row">
      <label class="ui-checkbox">
        <input
          aria-invalid="true"
          name="checkbox-group-validation"
          type="checkbox"
          checked
        />
        <span class="ui-label">Checkbox 1</span>
      </label>
      <label class="ui-checkbox">
        <input
          aria-invalid="true"
          name="checkbox-group-validation"
          type="checkbox"
        />
        <span class="ui-label">Checkbox 2</span>
      </label>
      <label class="ui-checkbox">
        <input
          aria-invalid="true"
          name="checkbox-group-validation"
          type="checkbox"
        />
        <span class="ui-label">Checkbox 3</span>
      </label>
    </div>
    <span class="ui-end-text" id="checkbox-field-group-validation-1-error"
      >Something went wrong!</span
    >
  </fieldset>
</form>
```

### Binding

The checked values live in the inputs, which share a `name`. Submit them with a form, where `FormData.getAll()` reads them, or read the checked inputs in a script on `change`. Set `input.checked = input.defaultChecked` to go back to the `checked` inputs in the markup.

```html
<fieldset class="ui-fieldset">
  <legend>Fruit</legend>
  <div class="ui-field-group">
    <label class="ui-checkbox">
      <input name="checkbox-binding" type="checkbox" value="apples" checked />
      <span class="ui-label">Apples</span>
    </label>
    <label class="ui-checkbox">
      <input name="checkbox-binding" type="checkbox" value="bananas" />
      <span class="ui-label">Bananas</span>
    </label>
    <label class="ui-checkbox">
      <input name="checkbox-binding" type="checkbox" value="cherries" />
      <span class="ui-label">Cherries</span>
    </label>
  </div>
</fieldset>
<p class="checkbox-binding-text">Selected: apples</p>
<button type="button" class="ui-button checkbox-binding-reset">Reset</button>

<script>
  function setupCheckboxBinding() {
    const text = document.querySelector(".checkbox-binding-text")
    const inputs = [...document.querySelectorAll('[name="checkbox-binding"]')]

    function update() {
      if (!text) return
      text.textContent = `Selected: ${
        inputs
          .filter((input) => input.checked)
          .map((input) => input.value)
          .join(", ") || "none"
      }`
    }

    inputs.forEach((input) => input.addEventListener("change", update))
    document
      .querySelector(".checkbox-binding-reset")
      ?.addEventListener("click", () => {
        inputs.forEach((input) => (input.checked = input.defaultChecked))
        update()
      })
  }

  setupCheckboxBinding()
</script>
```

## Accessibility

### Labels

Accessible checkboxes must have a label. You can choose between three approaches:

| Approach                                                       | Usage in Checkbox component |
| -------------------------------------------------------------- | --------------------------- |
| Provide a label text inside the `label` element                | Default                     |
| Add an `aria-label` on the input element                       | Not used                    |
| Have a visible label that you reference with `aria-labelledby` | Not used                    |

### Keyboard support

| Key     | Function                                       |
| ------- | ---------------------------------------------- |
| `Space` | When Checkbox is focused it changes its state. |

## API

### Checkbox API

| Type       | Modifiers                               | Default | Description                                                                          |
| ---------- | --------------------------------------- | ------- | ------------------------------------------------------------------------------------ |
| Disabled   | `input[disabled]`                       | -       | Dims the checkbox and shows a not-allowed cursor.                                    |
| Required   | `input[required]`                       | -       | Adds a required mark after the label.                                                |
| Sizes      | `.ui-large`, `.ui-small`, `.ui-x-small` | -       | The size of the element.                                                             |
| Spread     | `.ui-spread`                            | -       | Pushes the label and the input to opposite ends.                                     |
| Stack      | `.ui-stack`                             | -       | Stacks the label under the input.                                                    |
| State      | `input[data-indeterminate]`             | -       | Shows a partially checked state. Sets the `indeterminate` property on the `<input>`. |
| Validation | `input[aria-invalid="true"]`            | -       | Marks the control invalid and shows error styles.                                    |

#### Parts

| Part                | Description                                |
| ------------------- | ------------------------------------------ |
| `label.ui-checkbox` | Container element.                         |
| `<input>`           | The checkbox input.                        |
| `.ui-label`         | The label.                                 |
| `.ui-end-text`      | Supporting text displayed below the label. |

#### CSS variables

| Variable                           | Default                                                                                       | Description                                                                                                                                                                                                                                                                                                              |
| ---------------------------------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `--ui-choice-accent`               | Unset                                                                                         | Fill of a checked `Checkbox`, `Radio` and `Switch`, and the thumb and fill of `Range`. When unset, `--ui-primary`, with its lightness capped in dark mode for the choice controls. Set it to `--ui-primary` for the plain primary, like Material and shadcn.                                                             |
| `--ui-choice-accent-contrast`      | Unset                                                                                         | Color of the mark on a checked `Checkbox`, `Radio` and `Switch`. Set it with `--ui-choice-accent`. When unset, `--ui-primary-contrast` in light mode and near-white in dark mode.                                                                                                                                        |
| `--ui-choice-label-offset`         | `0px`                                                                                         | Moves `Checkbox`, `Radio` and `Switch` labels down (positive) or up (negative) against their control. Use `em` or `cap` to scale with the label font.                                                                                                                                                                    |
| `--ui-choice-size`                 | `calc(var(--size-4) * var(--ui-density))`                                                     | Default `Checkbox` and `Radio` input size.                                                                                                                                                                                                                                                                               |
| `--ui-choice-size-large`           | `calc(var(--size-5) * var(--ui-density))`                                                     | `Checkbox` and `Radio` input size with `.ui-large`.                                                                                                                                                                                                                                                                      |
| `--ui-choice-size-small`           | `calc(var(--size-3) * var(--ui-density))`                                                     | `Checkbox` and `Radio` input size with `.ui-small` and inside `List`.                                                                                                                                                                                                                                                    |
| `--ui-choice-size-x-small`         | `calc(0.875rem * var(--ui-density))`                                                          | `Checkbox` and `Radio` input size with `.ui-x-small`.                                                                                                                                                                                                                                                                    |
| `--ui-disabled-opacity`            | `0.64`                                                                                        | Opacity applied to disabled controls.                                                                                                                                                                                                                                                                                    |
| `--ui-duration`                    | `0.2s`                                                                                        | Default transition duration. Multiplied by `--ui-motion`.                                                                                                                                                                                                                                                                |
| `--ui-ease`                        | `ease`                                                                                        | Default easing for transitions.                                                                                                                                                                                                                                                                                          |
| `--ui-field-border-color`          | `color-mix( in oklch, var(--ui-text-primary) 50%, var(--ui-surface-default) )`                | Border color of every empty control: `TextField`, `Select`, `Textarea`, the unchecked `Checkbox`, `Radio` and `Switch`, the `Range` track and the `Progress` outline. A 50% mix of the text color into the page, so it reaches 3:1. Lighter than `--ui-border-color`, which is decorative, is a choice a theme can make. |
| `--ui-field-border-width`          | `1px`                                                                                         | Border width for fields, `Checkbox`, `Radio` and `Switch`.                                                                                                                                                                                                                                                               |
| `--ui-field-helper-color`          | `var(--ui-text-muted)`                                                                        | Text color for helper and end text under a field.                                                                                                                                                                                                                                                                        |
| `--ui-field-helper-font-size`      | `var(--font-size-0)`                                                                          | Font size for helper and end text under a field.                                                                                                                                                                                                                                                                         |
| `--ui-field-helper-line-height`    | `var(--font-lineheight-3)`                                                                    | Line height for helper and end text under a field.                                                                                                                                                                                                                                                                       |
| `--ui-field-label-color`           | `var(--ui-text-primary)`                                                                      | Text color for field labels.                                                                                                                                                                                                                                                                                             |
| `--ui-field-label-font-size`       | `var(--ui-font-size-small)`                                                                   | Font size for field labels.                                                                                                                                                                                                                                                                                              |
| `--ui-field-label-font-weight`     | `var(--ui-font-weight-semibold)`                                                              | Font weight for emphasized field labels and legends.                                                                                                                                                                                                                                                                     |
| `--ui-field-required-color`        | `var(--ui-invalid-text-color)`                                                                | Color of the required asterisk.                                                                                                                                                                                                                                                                                          |
| `--ui-invalid-color`               | `var(--ui-critical)`                                                                          | Color for invalid field borders, fills and outlines.                                                                                                                                                                                                                                                                     |
| `--ui-invalid-text-color`          | `light-dark( var(--ui-invalid-color), oklch(from var(--ui-invalid-color) max(l, 0.75) c h) )` | Color for validation messages and invalid labels. Lighter than `--ui-invalid-color` in dark mode so the text stays readable.                                                                                                                                                                                             |
| `--ui-line-height`                 | `1.5`                                                                                         | Line height of interface text: labels, helpers, choice labels and field hints.                                                                                                                                                                                                                                           |
| `--ui-motion`                      | `1`                                                                                           | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/html/guide/theming.md#motion).                                                                                                                 |
| `--ui-primary`                     | `light-dark(var(--ui-color-9), var(--ui-color-6))`                                            | Brand color for primary actions and accents.                                                                                                                                                                                                                                                                             |
| `--ui-primary-contrast`            | `oklch( from var(--ui-primary) clamp(0.15, (0.565 - l) * 1000, 0.98) calc(c * 0.15) h )`      | Text color on `--ui-primary`. Derived with relative color: near-black when the primary's lightness is above 0.565, near-white below, tinted with 15% of its chroma, so a custom `--ui-primary` gets readable text.                                                                                                       |
| `--ui-radius-x-small`              | `min(var(--radius-1), var(--ui-border-radius))`                                               | Corner radius of the `Checkbox` box. `--ui-border-radius`, capped at 2px.                                                                                                                                                                                                                                                |
| `--ui-ripple-color`                | `oklch(0.6 0 0 / 0.2)`                                                                        | Halo color for the `Checkbox` and `Radio` hover effect.                                                                                                                                                                                                                                                                  |
| `--ui-space-1`                     | `calc(var(--size-1) * var(--ui-space-scale))`                                                 | Spacing step 1: Open Props `--size-1` times `--ui-space-scale`.                                                                                                                                                                                                                                                          |
| `--ui-space-2`                     | `calc(var(--size-2) * var(--ui-space-scale))`                                                 | Spacing step 2: Open Props `--size-2` times `--ui-space-scale`.                                                                                                                                                                                                                                                          |
| `--ui-space-4`                     | `calc(var(--size-4) * var(--ui-space-scale))`                                                 | Spacing step 4: Open Props `--size-4` times `--ui-space-scale`.                                                                                                                                                                                                                                                          |
| `--ui-surface-default`             | `light-dark(var(--ui-gray-1), var(--ui-gray-13))`                                             | Page and card background.                                                                                                                                                                                                                                                                                                |
| `--ui-switch-dot-size-large`       | `calc(var(--size-4) * var(--ui-density))`                                                     | Diameter of the `Switch` dot with `.ui-large`.                                                                                                                                                                                                                                                                           |
| `--ui-switch-dot-size-small`       | `calc(0.75rem * var(--ui-density))`                                                           | Diameter of the `Switch` dot with `.ui-small` and inside `List`.                                                                                                                                                                                                                                                         |
| `--ui-switch-dot-size-x-small`     | `calc(0.625rem * var(--ui-density))`                                                          | Diameter of the `Switch` dot with `.ui-x-small`.                                                                                                                                                                                                                                                                         |
| `--ui-switch-track-height-large`   | `calc(var(--size-6) * var(--ui-density))`                                                     | Height of the `Switch` track with `.ui-large`.                                                                                                                                                                                                                                                                           |
| `--ui-switch-track-height-small`   | `calc(var(--size-4) * var(--ui-density))`                                                     | Height of the `Switch` track with `.ui-small` and inside `List`.                                                                                                                                                                                                                                                         |
| `--ui-switch-track-height-x-small` | `calc(var(--size-3) * var(--ui-density))`                                                     | Height of the `Switch` track with `.ui-x-small`.                                                                                                                                                                                                                                                                         |
| `--ui-switch-track-width-large`    | `calc(3.5rem * var(--ui-density))`                                                            | Width of the `Switch` track with `.ui-large`.                                                                                                                                                                                                                                                                            |
| `--ui-switch-track-width-small`    | `calc(2.5rem * var(--ui-density))`                                                            | Width of the `Switch` track with `.ui-small` and inside `List`.                                                                                                                                                                                                                                                          |
| `--ui-switch-track-width-x-small`  | `calc(var(--size-7) * var(--ui-density))`                                                     | Width of the `Switch` track with `.ui-x-small`.                                                                                                                                                                                                                                                                          |
| `--ui-text-on-accent`              | `var(--ui-gray-1)`                                                                            | Near-white text on a saturated fill in both modes: critical buttons, severity `Badge`s and the checked choice mark in dark mode.                                                                                                                                                                                         |
| `--ui-text-primary`                | `light-dark(var(--ui-gray-15), var(--ui-gray-1))`                                             | Emphasized text color for headings, labels and values.                                                                                                                                                                                                                                                                   |

This component uses these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md).

To hide the label, use `.ui-sr-only` instead of `.ui-label`. `data-indeterminate` needs `checkbox.js`. It sets the `indeterminate` property.

### Checkbox input API

| Type  | Modifiers              | Default | Description                                                                          |
| ----- | ---------------------- | ------- | ------------------------------------------------------------------------------------ |
| State | `[data-indeterminate]` | -       | Shows a partially checked state. Sets the `indeterminate` property on the `<input>`. |

#### Parts

| Part                      | Description                          |
| ------------------------- | ------------------------------------ |
| `<input type="checkbox">` | The checkbox input, without a label. |

#### CSS variables

| Variable                           | Default                                                                                       | Description                                                                                                                                                                                                                                                                                                              |
| ---------------------------------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `--ui-choice-accent`               | Unset                                                                                         | Fill of a checked `Checkbox`, `Radio` and `Switch`, and the thumb and fill of `Range`. When unset, `--ui-primary`, with its lightness capped in dark mode for the choice controls. Set it to `--ui-primary` for the plain primary, like Material and shadcn.                                                             |
| `--ui-choice-accent-contrast`      | Unset                                                                                         | Color of the mark on a checked `Checkbox`, `Radio` and `Switch`. Set it with `--ui-choice-accent`. When unset, `--ui-primary-contrast` in light mode and near-white in dark mode.                                                                                                                                        |
| `--ui-choice-label-offset`         | `0px`                                                                                         | Moves `Checkbox`, `Radio` and `Switch` labels down (positive) or up (negative) against their control. Use `em` or `cap` to scale with the label font.                                                                                                                                                                    |
| `--ui-choice-size`                 | `calc(var(--size-4) * var(--ui-density))`                                                     | Default `Checkbox` and `Radio` input size.                                                                                                                                                                                                                                                                               |
| `--ui-choice-size-large`           | `calc(var(--size-5) * var(--ui-density))`                                                     | `Checkbox` and `Radio` input size with `.ui-large`.                                                                                                                                                                                                                                                                      |
| `--ui-choice-size-small`           | `calc(var(--size-3) * var(--ui-density))`                                                     | `Checkbox` and `Radio` input size with `.ui-small` and inside `List`.                                                                                                                                                                                                                                                    |
| `--ui-choice-size-x-small`         | `calc(0.875rem * var(--ui-density))`                                                          | `Checkbox` and `Radio` input size with `.ui-x-small`.                                                                                                                                                                                                                                                                    |
| `--ui-disabled-opacity`            | `0.64`                                                                                        | Opacity applied to disabled controls.                                                                                                                                                                                                                                                                                    |
| `--ui-duration`                    | `0.2s`                                                                                        | Default transition duration. Multiplied by `--ui-motion`.                                                                                                                                                                                                                                                                |
| `--ui-ease`                        | `ease`                                                                                        | Default easing for transitions.                                                                                                                                                                                                                                                                                          |
| `--ui-field-border-color`          | `color-mix( in oklch, var(--ui-text-primary) 50%, var(--ui-surface-default) )`                | Border color of every empty control: `TextField`, `Select`, `Textarea`, the unchecked `Checkbox`, `Radio` and `Switch`, the `Range` track and the `Progress` outline. A 50% mix of the text color into the page, so it reaches 3:1. Lighter than `--ui-border-color`, which is decorative, is a choice a theme can make. |
| `--ui-field-border-width`          | `1px`                                                                                         | Border width for fields, `Checkbox`, `Radio` and `Switch`.                                                                                                                                                                                                                                                               |
| `--ui-field-helper-color`          | `var(--ui-text-muted)`                                                                        | Text color for helper and end text under a field.                                                                                                                                                                                                                                                                        |
| `--ui-field-helper-font-size`      | `var(--font-size-0)`                                                                          | Font size for helper and end text under a field.                                                                                                                                                                                                                                                                         |
| `--ui-field-helper-line-height`    | `var(--font-lineheight-3)`                                                                    | Line height for helper and end text under a field.                                                                                                                                                                                                                                                                       |
| `--ui-field-label-color`           | `var(--ui-text-primary)`                                                                      | Text color for field labels.                                                                                                                                                                                                                                                                                             |
| `--ui-field-label-font-size`       | `var(--ui-font-size-small)`                                                                   | Font size for field labels.                                                                                                                                                                                                                                                                                              |
| `--ui-field-label-font-weight`     | `var(--ui-font-weight-semibold)`                                                              | Font weight for emphasized field labels and legends.                                                                                                                                                                                                                                                                     |
| `--ui-field-required-color`        | `var(--ui-invalid-text-color)`                                                                | Color of the required asterisk.                                                                                                                                                                                                                                                                                          |
| `--ui-invalid-color`               | `var(--ui-critical)`                                                                          | Color for invalid field borders, fills and outlines.                                                                                                                                                                                                                                                                     |
| `--ui-invalid-text-color`          | `light-dark( var(--ui-invalid-color), oklch(from var(--ui-invalid-color) max(l, 0.75) c h) )` | Color for validation messages and invalid labels. Lighter than `--ui-invalid-color` in dark mode so the text stays readable.                                                                                                                                                                                             |
| `--ui-line-height`                 | `1.5`                                                                                         | Line height of interface text: labels, helpers, choice labels and field hints.                                                                                                                                                                                                                                           |
| `--ui-motion`                      | `1`                                                                                           | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/html/guide/theming.md#motion).                                                                                                                 |
| `--ui-primary`                     | `light-dark(var(--ui-color-9), var(--ui-color-6))`                                            | Brand color for primary actions and accents.                                                                                                                                                                                                                                                                             |
| `--ui-primary-contrast`            | `oklch( from var(--ui-primary) clamp(0.15, (0.565 - l) * 1000, 0.98) calc(c * 0.15) h )`      | Text color on `--ui-primary`. Derived with relative color: near-black when the primary's lightness is above 0.565, near-white below, tinted with 15% of its chroma, so a custom `--ui-primary` gets readable text.                                                                                                       |
| `--ui-radius-x-small`              | `min(var(--radius-1), var(--ui-border-radius))`                                               | Corner radius of the `Checkbox` box. `--ui-border-radius`, capped at 2px.                                                                                                                                                                                                                                                |
| `--ui-ripple-color`                | `oklch(0.6 0 0 / 0.2)`                                                                        | Halo color for the `Checkbox` and `Radio` hover effect.                                                                                                                                                                                                                                                                  |
| `--ui-space-1`                     | `calc(var(--size-1) * var(--ui-space-scale))`                                                 | Spacing step 1: Open Props `--size-1` times `--ui-space-scale`.                                                                                                                                                                                                                                                          |
| `--ui-space-2`                     | `calc(var(--size-2) * var(--ui-space-scale))`                                                 | Spacing step 2: Open Props `--size-2` times `--ui-space-scale`.                                                                                                                                                                                                                                                          |
| `--ui-space-4`                     | `calc(var(--size-4) * var(--ui-space-scale))`                                                 | Spacing step 4: Open Props `--size-4` times `--ui-space-scale`.                                                                                                                                                                                                                                                          |
| `--ui-surface-default`             | `light-dark(var(--ui-gray-1), var(--ui-gray-13))`                                             | Page and card background.                                                                                                                                                                                                                                                                                                |
| `--ui-switch-dot-size-large`       | `calc(var(--size-4) * var(--ui-density))`                                                     | Diameter of the `Switch` dot with `.ui-large`.                                                                                                                                                                                                                                                                           |
| `--ui-switch-dot-size-small`       | `calc(0.75rem * var(--ui-density))`                                                           | Diameter of the `Switch` dot with `.ui-small` and inside `List`.                                                                                                                                                                                                                                                         |
| `--ui-switch-dot-size-x-small`     | `calc(0.625rem * var(--ui-density))`                                                          | Diameter of the `Switch` dot with `.ui-x-small`.                                                                                                                                                                                                                                                                         |
| `--ui-switch-track-height-large`   | `calc(var(--size-6) * var(--ui-density))`                                                     | Height of the `Switch` track with `.ui-large`.                                                                                                                                                                                                                                                                           |
| `--ui-switch-track-height-small`   | `calc(var(--size-4) * var(--ui-density))`                                                     | Height of the `Switch` track with `.ui-small` and inside `List`.                                                                                                                                                                                                                                                         |
| `--ui-switch-track-height-x-small` | `calc(var(--size-3) * var(--ui-density))`                                                     | Height of the `Switch` track with `.ui-x-small`.                                                                                                                                                                                                                                                                         |
| `--ui-switch-track-width-large`    | `calc(3.5rem * var(--ui-density))`                                                            | Width of the `Switch` track with `.ui-large`.                                                                                                                                                                                                                                                                            |
| `--ui-switch-track-width-small`    | `calc(2.5rem * var(--ui-density))`                                                            | Width of the `Switch` track with `.ui-small` and inside `List`.                                                                                                                                                                                                                                                          |
| `--ui-switch-track-width-x-small`  | `calc(var(--size-7) * var(--ui-density))`                                                     | Width of the `Switch` track with `.ui-x-small`.                                                                                                                                                                                                                                                                          |
| `--ui-text-on-accent`              | `var(--ui-gray-1)`                                                                            | Near-white text on a saturated fill in both modes: critical buttons, severity `Badge`s and the checked choice mark in dark mode.                                                                                                                                                                                         |
| `--ui-text-primary`                | `light-dark(var(--ui-gray-15), var(--ui-gray-1))`                                             | Emphasized text color for headings, labels and values.                                                                                                                                                                                                                                                                   |

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

| Variable                        | Default                                                                                       | Description                                                                                                                                                             |
| ------------------------------- | --------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--ui-disabled-opacity`         | `0.64`                                                                                        | Opacity applied to disabled controls.                                                                                                                                   |
| `--ui-field-helper-color`       | `var(--ui-text-muted)`                                                                        | Text color for helper and end text under a field.                                                                                                                       |
| `--ui-field-helper-font-size`   | `var(--font-size-0)`                                                                          | Font size for helper and end text under a field.                                                                                                                        |
| `--ui-field-helper-line-height` | `var(--font-lineheight-3)`                                                                    | Line height for helper and end text under a field.                                                                                                                      |
| `--ui-field-label-color`        | `var(--ui-text-primary)`                                                                      | Text color for field labels.                                                                                                                                            |
| `--ui-field-label-font-weight`  | `var(--ui-font-weight-semibold)`                                                              | Font weight for emphasized field labels and legends.                                                                                                                    |
| `--ui-field-required-color`     | `var(--ui-invalid-text-color)`                                                                | Color of the required asterisk.                                                                                                                                         |
| `--ui-font-size-small`          | `var(--ui-font-size-200)`                                                                     | Font size of helper text, `Callout`, `Table`, `Tooltip`, code blocks, dense `List` text and small buttons, chips, toggles and fields. Defaults to `--ui-font-size-200`. |
| `--ui-invalid-text-color`       | `light-dark( var(--ui-invalid-color), oklch(from var(--ui-invalid-color) max(l, 0.75) c h) )` | Color for validation messages and invalid labels. Lighter than `--ui-invalid-color` in dark mode so the text stays readable.                                            |
| `--ui-line-height`              | `1.5`                                                                                         | Line height of interface text: labels, helpers, choice labels and field hints.                                                                                          |
| `--ui-space-1`                  | `calc(var(--size-1) * var(--ui-space-scale))`                                                 | Spacing step 1: Open Props `--size-1` times `--ui-space-scale`.                                                                                                         |
| `--ui-space-2`                  | `calc(var(--size-2) * var(--ui-space-scale))`                                                 | Spacing step 2: Open Props `--size-2` times `--ui-space-scale`.                                                                                                         |
| `--ui-space-3`                  | `calc(var(--size-3) * var(--ui-space-scale))`                                                 | Spacing step 3: Open Props `--size-3` times `--ui-space-scale`.                                                                                                         |
| `--ui-space-4`                  | `calc(var(--size-4) * var(--ui-space-scale))`                                                 | Spacing step 4: Open Props `--size-4` times `--ui-space-scale`.                                                                                                         |
| `--ui-space-5`                  | `calc(var(--size-5) * var(--ui-space-scale))`                                                 | Spacing step 5: Open Props `--size-5` times `--ui-space-scale`.                                                                                                         |
| `--ui-space-8`                  | `calc(var(--size-8) * var(--ui-space-scale))`                                                 | Spacing step 8: Open Props `--size-8` times `--ui-space-scale`.                                                                                                         |
| `--ui-text-muted`               | `light-dark(var(--ui-gray-13), var(--ui-gray-4))`                                             | Body text color.                                                                                                                                                        |

This component uses these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md).

To label the group, wrap it in a `.ui-fieldset` with a `<legend>`.

## Component properties

Set these on the component itself, inline or in your own CSS. Inputs are the knobs. Outputs are derived from the inputs and the current state, so overriding one fixes it in every state. [Customizing](https://open-props-ui.netlify.app/html/guide/customizing.md#component-properties) has examples.

| Property             | Kind   | Description                                                                                                                                                                                |
| -------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `--_accent`          | Input  | Fill and border of the checked input. `--ui-choice-accent` when the theme sets it, otherwise `--ui-primary` with its lightness capped in dark mode, and `--ui-invalid-color` when invalid. |
| `--_accent-contrast` | Input  | Color of the checkmark, dash and dots on `--_accent`.                                                                                                                                      |
| `--_duration`        | Output | Duration of the transitions, `--ui-duration` times `--_motion`.                                                                                                                            |
| `--_ease`            | Input  | Easing of the transitions. Defaults to `--ui-ease`.                                                                                                                                        |
| `--_input-size`      | Input  | Width and height of the checkbox and radio input, which the label centers on. Defaults to `--ui-choice-size`, set by the size classes.                                                     |
| `--_motion`          | Input  | Motion multiplier for the transitions. `0` turns them off.                                                                                                                                 |
| `--_ripple-size`     | Input  | Size of the hover ripple of checkboxes and radios, relative to the input. Set on `input`.                                                                                                  |
| `--_thumb-scale`     | Output | Current scale of the ripple. Set by the hover and active states.                                                                                                                           |

## Under the hood

Read the post: [Drawing a checkbox](https://open-props-ui.netlify.app/learn/checkbox-appearance-none)

1. Appearance

   - `appearance: none` drops the native box, the input keeps focus, keyboard and form value
   - `:checked` still matches: the fill is plain CSS
   - In dark mode `--accent` caps the primary's lightness, so the light check keeps 3:1

2. Checkmark

   - Without native appearance the input can take a `::after`
   - The check is a `clip-path: polygon()` over a solid fill, no SVG
   - Points in percentages, so it scales with the box

3. Indeterminate

   - Same pseudo-element, a different polygon: a dash
   - `indeterminate` is a JavaScript-only property, there is no attribute
   - The component renders `data-indeterminate` and sets the property on load

4. Label

   - The `<label>` wraps the input, so the text is part of the hit area
   - `:has([disabled])` dims the whole row from the input's state
   - `(size − 1lh) / 2` centers the first line on the box, in every browser
   - Drag the size: the text stays centered

5. Forced colors

   - Forced colors swap author colors for the user's palette, so the fill and the check, both backgrounds, disappear
   - System colors are kept: `SelectedItem` for the fill, `SelectedItemText` for the check
   - Try it with forced colors emulation in DevTools

Step 1 of 5: Appearance

- [`appearance` ](https://webstatus.dev/features/appearance)(Widely available): Chrome 84+, Edge 84+, Firefox 80+, Safari 15.4+
- [`light-dark()` ](https://webstatus.dev/features/light-dark)(Newly available): Chrome 123+, Edge 123+, Firefox 120+, Safari 17.5+
- [Relative colors ](https://webstatus.dev/features/relative-color)(Newly available): Chrome 125+, Edge 125+, Firefox 128+, Safari 18+

```css
.checkbox {
  --accent: light-dark(
    var(--ui-primary),
    oklch(from var(--ui-primary) min(l, 0.62) c h)
  );
  --accent-contrast: light-dark(var(--ui-primary-contrast), var(--ui-gray-1));

  appearance: none;
  aspect-ratio: 1;
  background-color: var(--ui-surface-default);
  block-size: var(--size);
  border: var(--ui-field-border-width) solid var(--ui-field-border-color);
  border-radius: var(--radius-1);
  box-sizing: border-box;
  display: grid;
  inline-size: var(--size);
  margin: 0;
  position: relative;
}

.checkbox:checked {
  background-color: var(--accent);
  border-color: var(--accent);
}
```

Step 2 of 5: Checkmark

- [`clip-path` ](https://webstatus.dev/features/clip-path)(Widely available): Chrome 88+, Edge 88+, Firefox 71+, Safari 13.1+

```css
.checkbox::after {
  background-color: var(--accent-contrast);
  clip-path: polygon(15% 52%, 40% 77%, 85% 32%, 75% 22%, 40% 57%, 25% 42%);
  content: "";
  inset: 0;
  opacity: 0;
  position: absolute;
}

.checkbox:checked::after {
  opacity: 1;
}
```

Step 3 of 5: Indeterminate

- [`:indeterminate` ](https://webstatus.dev/features/indeterminate)(Widely available): Chrome 39+, Edge 79+, Firefox 51+, Safari 10+

```html
<input class="checkbox" type="checkbox" data-indeterminate />

<script>
  for (const input of document.querySelectorAll("[data-indeterminate]")) {
    input.indeterminate = true
  }
</script>
```

```css
.checkbox:indeterminate {
  background-color: var(--accent);
  border-color: var(--accent);
}

.checkbox:indeterminate::after {
  clip-path: polygon(20% 45%, 80% 45%, 80% 55%, 20% 55%);
  opacity: 1;
}
```

Step 4 of 5: Label

- [`:has()` ](https://webstatus.dev/features/has)(Widely available): Chrome 105+, Edge 105+, Firefox 121+, Safari 15.4+
- [lh unit ](https://webstatus.dev/features/lh)(Widely available): Chrome 109+, Edge 109+, Firefox 120+, Safari 16.4+

```css
.label {
  align-items: start;
  cursor: pointer;
  display: inline-grid;
  gap: 0 0.5rem;
  grid-auto-flow: column;
}

.label:has([disabled]) {
  cursor: not-allowed;
  opacity: var(--ui-disabled-opacity);
}

.label > span {
  margin-block-start: calc((var(--size) - 1lh) / 2);
}
```

Step 5 of 5: Forced colors

- [Forced colors ](https://webstatus.dev/features/forced-colors)(Widely available): Chrome 89+, Edge 79+, Firefox 89+, Safari 16+
- [System colors ](https://webstatus.dev/features/system-color)(Widely available): Chrome 1+, Edge 12+, Firefox 1+, Safari 1+

```css
@media (forced-colors: active) {
  .checkbox {
    border-color: CanvasText;
  }

  .checkbox:is(:checked, :indeterminate) {
    background-color: SelectedItem;
    border-color: SelectedItem;
  }

  .checkbox:is(:checked, :indeterminate)::after {
    background-color: SelectedItemText;
  }
}
```

## Browser support

- Chromium: Full support Supported since v125.
- Firefox: Full support Supported since v128.
- Safari: Full support Supported since v18.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/html/guide/browser-support/?components=Checkbox.md).

## Installation

### Dependencies

- [Form](https://open-props-ui.netlify.app/html/components/form.md)

* `opui-css/css/components/checkbox.css`
* `opui-css/css/components/choice.css`
* `opui-css/css/components/form.css`

## Changelog

### What's new

- The unchecked border, [`--ui-field-border-color`](#api), reaches 3:1 against the page by default.
- The checked fill and mark read [`--ui-choice-accent`](#api) and `--ui-choice-accent-contrast` when a theme sets them.
- [Lines up](#label-alignment) with the first line of the label and centers on its capitals in any font.
- Breaking: `--highlight-size` is `--_ripple-size` and `--thumb-scale` is `--_thumb-scale`. `--isLTR` and `--isRTL` are gone, the halo centers itself ([Under the hood](#under-the-hood)).
- Without a [visible label](#visible-label), checkboxes center in table cells and lines of text.
- Breaking: mark an invalid checkbox with `aria-invalid="true"` on the `<input>` instead of `data-invalid` on the root, also in a [group](#field-group-validation) ([Validation](#validation)).
- Takes `.ui-x-small`. [Sizes](#sizes)
- Breaking: [`choice.css`](#basics) holds the layout, label, end text, sizes and disabled styles shared with Radio and Switch.
- `--_duration` and `--_ease` set the transition duration and easing ([Under the hood](#under-the-hood)).
- Corners never get rounder than [`--ui-border-radius`](#api), so `0` squares them.
