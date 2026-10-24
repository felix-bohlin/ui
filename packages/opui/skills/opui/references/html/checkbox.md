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
    <span class="ui-label">Medium</span>
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

Use `.ui-vertical` to put the label under the checkbox.

```html
<label class="ui-checkbox">
  <input name="checkbox-label-position" type="checkbox" />
  <span class="ui-label">Default</span>
</label>

<label class="ui-checkbox ui-vertical">
  <input name="checkbox-label-position" type="checkbox" />
  <span class="ui-label">Stack</span>
</label>
```

### End text

Add a `<span class="ui-end-text">` after the `.ui-label` for supporting text under the label. It sits inside the `<label>`, so screen readers read it with the label.

```html
<label class="ui-checkbox">
  <input name="checkbox-end-text" type="checkbox" />
  <span class="ui-label">Default</span>
  <span class="ui-end-text">Supporting text</span>
</label>

<label class="ui-checkbox ui-vertical">
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

  <label class="ui-checkbox ui-vertical">
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

  <label class="ui-checkbox ui-vertical">
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

## Cards

Add the `.ui-card` class to the `<label class="ui-checkbox">` to render the checkbox as a card: an outlined surface that holds the label and `.ui-end-text`, tints when hovered and when checked, and shows the focus ring on its edge. The checkbox sits at the start; add `.ui-spread` to move it to the end. `.ui-tonal` and `.ui-elevated` change the surface like a [Card](https://open-props-ui.netlify.app/html/components/card.md). In a `.ui-field-group.ui-horizontal` the cards share the row equally and wrap.

```html
<form class="ui-form">
  <fieldset class="ui-fieldset">
    <legend>Add-ons</legend>
    <div class="ui-field-group">
      <label class="ui-checkbox ui-card ui-spread">
        <input name="checkbox-cards" type="checkbox" value="support" checked />
        <span class="ui-label">Priority support</span>
        <span class="ui-end-text">Answers within a day.</span>
      </label>
      <label class="ui-checkbox ui-card ui-spread">
        <input name="checkbox-cards" type="checkbox" value="storage" />
        <span class="ui-label">Extra storage</span>
        <span class="ui-end-text">Another 100 GB.</span>
      </label>
      <label class="ui-checkbox ui-card ui-spread">
        <input name="checkbox-cards" type="checkbox" value="domain" disabled />
        <span class="ui-label">Custom domain</span>
        <span class="ui-end-text">Not available on this plan.</span>
      </label>
    </div>
  </fieldset>
</form>
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

### Orientation

Checkboxes stack vertically by default. Add `.ui-horizontal` to the `.ui-field-group` to put them in a row.

```html
<form class="ui-form">
  <fieldset class="ui-fieldset">
    <legend>Legend</legend>
    <div class="ui-field-group ui-horizontal">
      <label class="ui-checkbox">
        <input name="checkbox-group-orientation" type="checkbox" checked />
        <span class="ui-label">Checkbox 1</span>
      </label>
      <label class="ui-checkbox">
        <input name="checkbox-group-orientation" type="checkbox" />
        <span class="ui-label">Checkbox 2</span>
      </label>
      <label class="ui-checkbox">
        <input name="checkbox-group-orientation" type="checkbox" />
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
    <p class="ui-description">Field description above fields</p>
    <div class="ui-field-group ui-horizontal">
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
    <div class="ui-field-group ui-horizontal">
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
    <p class="ui-description">Field description below fields</p>
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
    <div class="ui-field-group ui-horizontal">
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
    <div class="ui-field-group ui-horizontal">
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
    <div class="ui-field-group ui-horizontal">
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

| Type        | Modifiers                                        | Default | Description                                                                                                                                                                                                              |
| ----------- | ------------------------------------------------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Card        | `.ui-card`                                       | -       | Renders the checkbox as a card: a padded, outlined surface that tints when hovered and when checked, with the label and `endText` inside. Add `spread` to put the input at the end, and `variant` to change the surface. |
| Disabled    | `input[disabled]`                                | -       | Dims the checkbox and shows a not-allowed cursor.                                                                                                                                                                        |
| Label       | `.ui-checkbox > span.ui-sr-only`                 | -       | Visually hides the label, `.ui-sr-only` instead of `.ui-label`.                                                                                                                                                          |
| Orientation | default, `.ui-vertical`                          | default | The orientation of the element. `vertical` stacks the label under the input.                                                                                                                                             |
| Required    | `input[required]`                                | -       | Adds a required mark after the label.                                                                                                                                                                                    |
| Sizes       | default, `.ui-large`, `.ui-small`, `.ui-x-small` | default | The size of the element.                                                                                                                                                                                                 |
| Spread      | `.ui-spread`                                     | -       | Pushes the label and the input to opposite ends.                                                                                                                                                                         |
| State       | `input[data-indeterminate]`                      | -       | Shows a partially checked state. Sets the `indeterminate` property on the `<input>`.                                                                                                                                     |
| Validation  | `input[aria-invalid="true"]`                     | -       | Marks the control invalid and shows error styles.                                                                                                                                                                        |
| Variants    | default, `.ui-elevated`, `.ui-tonal`             | default | The surface of the card, with `card`. `outlined` has a border, `tonal` a tinted surface and `elevated` a shadow, like Card.                                                                                              |

#### Parts

| Part                | Description                                |
| ------------------- | ------------------------------------------ |
| `label.ui-checkbox` | Container element.                         |
| `<input>`           | The checkbox input.                        |
| `.ui-label`         | The label.                                 |
| `.ui-end-text`      | Supporting text displayed below the label. |

#### CSS variables

| Variable                                | Default                                                                                                                                                                                                                  | Description                                                                                                                                                                                                                                                                                                                                                 |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--ui-border-color`                     | `light-dark( color-mix( in oklch, var(--ui-text-strong) var(--ui-border-strength-light), var(--ui-surface) ), color-mix( in oklch, var(--ui-text-strong) var(--ui-border-strength-dark), var(--ui-surface) ) )`          | Default border color for cards, lists, tables and dividers. `--ui-text-strong` mixed into `--ui-surface` at `--ui-border-strength-light` or `--ui-border-strength-dark`.                                                                                                                                                                                    |
| `--ui-border-color-on-raised`           | `light-dark( color-mix( in oklch, var(--ui-text-strong) var(--ui-border-strength-light), var(--ui-surface) ), var(--ui-surface) )`                                                                                       | Border color inside raised surfaces: tonal and elevated `Card` and `Accordion`, `Dialog`, `Drawer`, `Menu` and `Callout` without a severity. The light border mix in light mode and the page background in dark mode. Each raised component sets `--ui-border-color` to it on its root.                                                                     |
| `--ui-border-color-raised`              | Unset                                                                                                                                                                                                                    | Border color of tonal and elevated `Card` and `Accordion` and of `Callout` without a severity. When unset, cards and accordions use the page background color, so they stay visible on tonal surfaces, and callouts their tonal background.                                                                                                                 |
| `--ui-border-width`                     | `1px`                                                                                                                                                                                                                    | Default border width for components that draw a border.                                                                                                                                                                                                                                                                                                     |
| `--ui-choice-accent`                    | Unset                                                                                                                                                                                                                    | Fill of a checked `Checkbox`, `Radio` and `Switch`, and the thumb and fill of `Range`. When unset, `--ui-primary`, with its lightness capped in dark mode for the choice controls. Set it to `--ui-primary` for the plain primary, like Material and shadcn.                                                                                                |
| `--ui-choice-fill-max-lightness`        | `0.62`                                                                                                                                                                                                                   | The highest OKLCH lightness of a checked `Checkbox`, `Radio` and `Switch` fill in dark mode, so the light mark keeps 3:1. `0.62`.                                                                                                                                                                                                                           |
| `--ui-choice-label-offset`              | `0px`                                                                                                                                                                                                                    | Moves `Checkbox`, `Radio` and `Switch` labels down (positive) or up (negative) against their control. Use `em` or `cap` to scale with the label font.                                                                                                                                                                                                       |
| `--ui-choice-on-accent`                 | Unset                                                                                                                                                                                                                    | Color of the mark on a checked `Checkbox`, `Radio` and `Switch`. Set it with `--ui-choice-accent`. When unset, `--ui-on-primary` in light mode and near-white in dark mode.                                                                                                                                                                                 |
| `--ui-choice-ripple-bg-color`           | `oklch(0.6 0 0 / 0.2)`                                                                                                                                                                                                   | Halo color for the `Checkbox` and `Radio` hover effect.                                                                                                                                                                                                                                                                                                     |
| `--ui-choice-size`                      | `calc(var(--size-4) * var(--ui-density))`                                                                                                                                                                                | Default `Checkbox` and `Radio` input size.                                                                                                                                                                                                                                                                                                                  |
| `--ui-choice-size-large`                | `calc(var(--size-5) * var(--ui-density))`                                                                                                                                                                                | `Checkbox` and `Radio` input size with `.ui-large`.                                                                                                                                                                                                                                                                                                         |
| `--ui-choice-size-small`                | `calc(var(--size-3) * var(--ui-density))`                                                                                                                                                                                | `Checkbox` and `Radio` input size with `.ui-small`, and in dense `List` rows unless the control has a size class.                                                                                                                                                                                                                                           |
| `--ui-choice-size-x-small`              | `calc(0.875rem * var(--ui-density))`                                                                                                                                                                                     | `Checkbox` and `Radio` input size with `.ui-x-small`.                                                                                                                                                                                                                                                                                                       |
| `--ui-disabled-opacity`                 | `0.64`                                                                                                                                                                                                                   | Opacity applied to disabled controls.                                                                                                                                                                                                                                                                                                                       |
| `--ui-duration`                         | `0.2s`                                                                                                                                                                                                                   | Default transition duration. Multiplied by `--ui-motion`.                                                                                                                                                                                                                                                                                                   |
| `--ui-ease`                             | `ease`                                                                                                                                                                                                                   | Default easing for transitions.                                                                                                                                                                                                                                                                                                                             |
| `--ui-field-border-color`               | `color-mix( in oklch, var(--ui-text-strong) var(--ui-field-border-strength), var(--ui-surface) )`                                                                                                                        | Border color of every empty control: `TextField`, `Select`, `Textarea`, the unchecked `Checkbox`, `Radio` and `Switch`, the `Range` track and the `Progress` outline. `--ui-text-strong` mixed into `--ui-surface` at `--ui-field-border-strength`, so it reaches 3:1. Lighter than `--ui-border-color`, which is decorative, is a choice a theme can make. |
| `--ui-field-border-color-on-raised`     | `color-mix( in oklch, var(--ui-text-strong) var(--ui-field-border-strength), var(--ui-surface) )`                                                                                                                        | Field border color inside raised surfaces. The same mix as `--ui-field-border-color` by default. Each raised component sets `--ui-field-border-color` to it on its root.                                                                                                                                                                                    |
| `--ui-field-border-width`               | `1px`                                                                                                                                                                                                                    | Border width for fields, `Checkbox`, `Radio` and `Switch`.                                                                                                                                                                                                                                                                                                  |
| `--ui-field-helper-font-size`           | `var(--ui-font-size-caption)`                                                                                                                                                                                            | Font size for helper and end text under a field.                                                                                                                                                                                                                                                                                                            |
| `--ui-field-helper-line-height`         | `var(--ui-line-height-control)`                                                                                                                                                                                          | Line height for helper and end text under a field.                                                                                                                                                                                                                                                                                                          |
| `--ui-field-helper-text-color`          | `var(--ui-text)`                                                                                                                                                                                                         | Text color for helper and end text under a field.                                                                                                                                                                                                                                                                                                           |
| `--ui-field-label-font-size`            | `var(--ui-font-size-small)`                                                                                                                                                                                              | Font size for field labels.                                                                                                                                                                                                                                                                                                                                 |
| `--ui-field-label-font-weight`          | `var(--ui-font-weight-semibold)`                                                                                                                                                                                         | Font weight for emphasized field labels and legends.                                                                                                                                                                                                                                                                                                        |
| `--ui-field-label-text-color`           | `var(--ui-text-strong)`                                                                                                                                                                                                  | Text color for field labels.                                                                                                                                                                                                                                                                                                                                |
| `--ui-field-required-text-color`        | `var(--ui-invalid-text)`                                                                                                                                                                                                 | Color of the required asterisk.                                                                                                                                                                                                                                                                                                                             |
| `--ui-focus-ring-color`                 | `oklch( from var(--ui-surface) clamp(0, (0.6 - l) * 1000, 1) 0 0 )`                                                                                                                                                      | Color of the keyboard focus ring. Black on surfaces lighter than OKLCH 0.6 and white on darker ones, so it reaches 3:1 on any `--ui-surface`.                                                                                                                                                                                                               |
| `--ui-focus-ring-offset`                | `2px`                                                                                                                                                                                                                    | Distance between a control and its focus ring.                                                                                                                                                                                                                                                                                                              |
| `--ui-focus-ring-style`                 | `solid`                                                                                                                                                                                                                  | Outline style of the focus ring.                                                                                                                                                                                                                                                                                                                            |
| `--ui-focus-ring-width`                 | `2px`                                                                                                                                                                                                                    | Width of the focus ring.                                                                                                                                                                                                                                                                                                                                    |
| `--ui-font-size-body`                   | `var(--ui-font-size-300)`                                                                                                                                                                                                | Font size of body copy, `Card` text and the `Callout` title. Defaults to `--ui-font-size-300`.                                                                                                                                                                                                                                                              |
| `--ui-font-size-caption`                | `var(--ui-font-size-100)`                                                                                                                                                                                                | Font size of captions, `Badge`, `Chip`, `Divider` labels, `List` secondary text, `Menu` shortcuts, overlines, `small`, `figcaption` and x-small buttons, toggles and fields. Defaults to `--ui-font-size-100`.                                                                                                                                              |
| `--ui-invalid`                          | `light-dark( var(--ui-critical), oklch( from var(--ui-critical) max(l, var(--ui-invalid-min-lightness)) min(c, var(--ui-accent-max-chroma)) h ) )`                                                                       | Color for invalid field borders, fills and outlines. Lifted to `--ui-invalid-min-lightness` in dark mode, so invalid borders stand out from the page with more contrast.                                                                                                                                                                                    |
| `--ui-invalid-text`                     | `light-dark( oklch(from var(--ui-invalid) min(l, var(--ui-text-max-lightness)) c h), oklch( from var(--ui-invalid) max(l, var(--ui-text-min-lightness)) min(c, var(--ui-text-max-chroma)) h ) )`                         | Color for validation messages and invalid labels. `--ui-invalid` with its lightness kept within `--ui-text-max-lightness` and `--ui-text-min-lightness`, so it stays readable where `--ui-invalid` is lighter for borders.                                                                                                                                  |
| `--ui-line-height-control`              | `1.5`                                                                                                                                                                                                                    | Line height of interface text: labels, helpers, choice labels and field hints.                                                                                                                                                                                                                                                                              |
| `--ui-line-height-tight`                | `1.25`                                                                                                                                                                                                                   | Line height of single-line controls and compact text: field inputs, `Table` cells, `Tooltip`, `Card` captions and keyboard hints in buttons.                                                                                                                                                                                                                |
| `--ui-motion`                           | `1`                                                                                                                                                                                                                      | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/html/guide/theming.md#motion).                                                                                                                                                    |
| `--ui-on-accent`                        | `var(--ui-gray-1)`                                                                                                                                                                                                       | Near-white text on a saturated fill in both modes: critical buttons, severity `Badge`s and the checked choice mark in dark mode.                                                                                                                                                                                                                            |
| `--ui-on-primary`                       | `oklch( from var(--ui-primary) clamp(0.15, (0.565 - l) * 1000, 0.98) calc(c * 0.15) h )`                                                                                                                                 | Text color on `--ui-primary`. Derived with relative color: near-black when the primary's lightness is above 0.565, near-white below, tinted with 15% of its chroma, so a custom `--ui-primary` gets readable text.                                                                                                                                          |
| `--ui-primary`                          | `light-dark( oklch( from var(--ui-primary-source) min(l, var(--ui-primary-max-lightness)) c h ), oklch( from var(--ui-primary-source) max(l, var(--ui-primary-min-lightness)) min(c, var(--ui-accent-max-chroma)) h ) )` | Brand color for primary actions and accents. Derived from `--ui-primary-source` within `--ui-primary-max-lightness` and `--ui-primary-min-lightness`. Set `--ui-primary-source` to keep more contrast working, or this token to pin the color.                                                                                                              |
| `--ui-primary-tonal`                    | Unset                                                                                                                                                                                                                    | Background of `Button` and `ButtonGroup` with `.ui-primary` and `.ui-tonal`. When unset, a light tint of the palette. Material's `primary-container` and shadcn's `secondary` go here.                                                                                                                                                                      |
| `--ui-radius`                           | `var(--size-2)`                                                                                                                                                                                                          | Corner radius for every component: cards, callouts, menus, buttons and fields follow it, and small parts like `kbd`, tooltips and checkboxes never get rounder than it. Set it to `0` for square corners. Takes a single length.                                                                                                                            |
| `--ui-radius-x-small`                   | `min(var(--radius-1), var(--ui-radius))`                                                                                                                                                                                 | Corner radius of the `Checkbox` box. `--ui-radius`, capped at 2px.                                                                                                                                                                                                                                                                                          |
| `--ui-shadow-elevated`                  | `var(--ui-shadow-elevated-light)` `var(--ui-shadow-elevated-dark)` in dark mode                                                                                                                                          | Shadow of elevated `Card` and `Accordion`. Switches between `--ui-shadow-elevated-light` and `--ui-shadow-elevated-dark` with the color scheme, also in `.ui-light` and `.ui-dark` parts of the page. Set those two instead of this one.                                                                                                                    |
| `--ui-shadow-surface`                   | `none`                                                                                                                                                                                                                   | Shadow of tonal and outlined `Card` and `Accordion`, and of `Callout`. `none` by default, for themes that put every surface on the same plane.                                                                                                                                                                                                              |
| `--ui-space-1`                          | `calc(var(--size-1) * var(--ui-space-scale))`                                                                                                                                                                            | Spacing step 1: Open Props `--size-1` times `--ui-space-scale`.                                                                                                                                                                                                                                                                                             |
| `--ui-space-2`                          | `calc(var(--size-2) * var(--ui-space-scale))`                                                                                                                                                                            | Spacing step 2: Open Props `--size-2` times `--ui-space-scale`.                                                                                                                                                                                                                                                                                             |
| `--ui-space-3`                          | `calc(var(--size-3) * var(--ui-space-scale))`                                                                                                                                                                            | Spacing step 3: Open Props `--size-3` times `--ui-space-scale`.                                                                                                                                                                                                                                                                                             |
| `--ui-space-4`                          | `calc(var(--size-4) * var(--ui-space-scale))`                                                                                                                                                                            | Spacing step 4: Open Props `--size-4` times `--ui-space-scale`.                                                                                                                                                                                                                                                                                             |
| `--ui-space-5`                          | `calc(var(--size-5) * var(--ui-space-scale))`                                                                                                                                                                            | Spacing step 5: Open Props `--size-5` times `--ui-space-scale`.                                                                                                                                                                                                                                                                                             |
| `--ui-state-active-alpha-accent`        | `25%`                                                                                                                                                                                                                    | Alpha of the pressed state layer on primary and critical buttons.                                                                                                                                                                                                                                                                                           |
| `--ui-surface`                          | `light-dark(var(--ui-gray-1), var(--ui-gray-13))`                                                                                                                                                                        | Page and card background.                                                                                                                                                                                                                                                                                                                                   |
| `--ui-surface-elevated`                 | `light-dark(var(--ui-gray-1), var(--ui-gray-12))`                                                                                                                                                                        | Background of elevated cards and accordions, dialogs, drawers, menus and native `Select` options.                                                                                                                                                                                                                                                           |
| `--ui-surface-tonal`                    | `light-dark(var(--ui-gray-3), var(--ui-gray-12))`                                                                                                                                                                        | Background of tonal variants.                                                                                                                                                                                                                                                                                                                               |
| `--ui-surface-tonal-hover`              | `light-dark( oklch(from var(--ui-surface-tonal) calc(l * 0.93) c h), oklch(from var(--ui-surface-tonal) calc(l * 1.1) c h) )`                                                                                            | Hover fill of a `--ui-surface-tonal` surface: clickable `Chip`s and filled `TextField`, `Select` and `Textarea` fields. Derived from `--ui-surface-tonal`, darker in light mode and lighter in dark mode.                                                                                                                                                   |
| `--ui-switch-thumb-size-large`          | `calc(var(--size-4) * var(--ui-density))`                                                                                                                                                                                | Diameter of the `Switch` thumb with `.ui-large`.                                                                                                                                                                                                                                                                                                            |
| `--ui-switch-thumb-size-small`          | `calc(0.75rem * var(--ui-density))`                                                                                                                                                                                      | Diameter of the `Switch` thumb with `.ui-small`, and in `List` rows unless the switch has a size class.                                                                                                                                                                                                                                                     |
| `--ui-switch-thumb-size-x-small`        | `calc(0.625rem * var(--ui-density))`                                                                                                                                                                                     | Diameter of the `Switch` thumb with `.ui-x-small`.                                                                                                                                                                                                                                                                                                          |
| `--ui-switch-track-block-size-large`    | `calc(var(--size-6) * var(--ui-density))`                                                                                                                                                                                | Height of the `Switch` track with `.ui-large`.                                                                                                                                                                                                                                                                                                              |
| `--ui-switch-track-block-size-small`    | `calc(var(--size-4) * var(--ui-density))`                                                                                                                                                                                | Height of the `Switch` track with `.ui-small`, and in `List` rows unless the switch has a size class.                                                                                                                                                                                                                                                       |
| `--ui-switch-track-block-size-x-small`  | `calc( var(--size-3) * var(--ui-density) )`                                                                                                                                                                              | Height of the `Switch` track with `.ui-x-small`.                                                                                                                                                                                                                                                                                                            |
| `--ui-switch-track-inline-size-large`   | `calc(3.5rem * var(--ui-density))`                                                                                                                                                                                       | Width of the `Switch` track with `.ui-large`.                                                                                                                                                                                                                                                                                                               |
| `--ui-switch-track-inline-size-small`   | `calc(2.5rem * var(--ui-density))`                                                                                                                                                                                       | Width of the `Switch` track with `.ui-small`, and in `List` rows unless the switch has a size class.                                                                                                                                                                                                                                                        |
| `--ui-switch-track-inline-size-x-small` | `calc( var(--size-7) * var(--ui-density) )`                                                                                                                                                                              | Width of the `Switch` track with `.ui-x-small`.                                                                                                                                                                                                                                                                                                             |
| `--ui-text`                             | `light-dark( color-mix( in oklch, var(--ui-text-strong) var(--ui-text-strength-light), var(--ui-surface) ), color-mix( in oklch, var(--ui-text-strong) var(--ui-text-strength-dark), var(--ui-surface) ) )`              | Body text color. `--ui-text-strong` mixed into `--ui-surface` at `--ui-text-strength-light` or `--ui-text-strength-dark`.                                                                                                                                                                                                                                   |
| `--ui-text-strong`                      | `light-dark(var(--ui-gray-15), var(--ui-gray-1))`                                                                                                                                                                        | Strongest text color, for headings, labels and values. Body text is `--ui-text`.                                                                                                                                                                                                                                                                            |

This component uses these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md).

`data-indeterminate` needs `checkbox.js`. It sets the `indeterminate` property.

### Checkbox input API

| Type  | Modifiers              | Default | Description                                                                          |
| ----- | ---------------------- | ------- | ------------------------------------------------------------------------------------ |
| State | `[data-indeterminate]` | -       | Shows a partially checked state. Sets the `indeterminate` property on the `<input>`. |

#### Parts

| Part                      | Description                          |
| ------------------------- | ------------------------------------ |
| `<input type="checkbox">` | The checkbox input, without a label. |

#### CSS variables

| Variable                                | Default                                                                                                                                                                                                                  | Description                                                                                                                                                                                                                                                                                                                                                 |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--ui-border-color`                     | `light-dark( color-mix( in oklch, var(--ui-text-strong) var(--ui-border-strength-light), var(--ui-surface) ), color-mix( in oklch, var(--ui-text-strong) var(--ui-border-strength-dark), var(--ui-surface) ) )`          | Default border color for cards, lists, tables and dividers. `--ui-text-strong` mixed into `--ui-surface` at `--ui-border-strength-light` or `--ui-border-strength-dark`.                                                                                                                                                                                    |
| `--ui-border-width`                     | `1px`                                                                                                                                                                                                                    | Default border width for components that draw a border.                                                                                                                                                                                                                                                                                                     |
| `--ui-choice-accent`                    | Unset                                                                                                                                                                                                                    | Fill of a checked `Checkbox`, `Radio` and `Switch`, and the thumb and fill of `Range`. When unset, `--ui-primary`, with its lightness capped in dark mode for the choice controls. Set it to `--ui-primary` for the plain primary, like Material and shadcn.                                                                                                |
| `--ui-choice-fill-max-lightness`        | `0.62`                                                                                                                                                                                                                   | The highest OKLCH lightness of a checked `Checkbox`, `Radio` and `Switch` fill in dark mode, so the light mark keeps 3:1. `0.62`.                                                                                                                                                                                                                           |
| `--ui-choice-label-offset`              | `0px`                                                                                                                                                                                                                    | Moves `Checkbox`, `Radio` and `Switch` labels down (positive) or up (negative) against their control. Use `em` or `cap` to scale with the label font.                                                                                                                                                                                                       |
| `--ui-choice-on-accent`                 | Unset                                                                                                                                                                                                                    | Color of the mark on a checked `Checkbox`, `Radio` and `Switch`. Set it with `--ui-choice-accent`. When unset, `--ui-on-primary` in light mode and near-white in dark mode.                                                                                                                                                                                 |
| `--ui-choice-ripple-bg-color`           | `oklch(0.6 0 0 / 0.2)`                                                                                                                                                                                                   | Halo color for the `Checkbox` and `Radio` hover effect.                                                                                                                                                                                                                                                                                                     |
| `--ui-choice-size`                      | `calc(var(--size-4) * var(--ui-density))`                                                                                                                                                                                | Default `Checkbox` and `Radio` input size.                                                                                                                                                                                                                                                                                                                  |
| `--ui-choice-size-large`                | `calc(var(--size-5) * var(--ui-density))`                                                                                                                                                                                | `Checkbox` and `Radio` input size with `.ui-large`.                                                                                                                                                                                                                                                                                                         |
| `--ui-choice-size-small`                | `calc(var(--size-3) * var(--ui-density))`                                                                                                                                                                                | `Checkbox` and `Radio` input size with `.ui-small`, and in dense `List` rows unless the control has a size class.                                                                                                                                                                                                                                           |
| `--ui-choice-size-x-small`              | `calc(0.875rem * var(--ui-density))`                                                                                                                                                                                     | `Checkbox` and `Radio` input size with `.ui-x-small`.                                                                                                                                                                                                                                                                                                       |
| `--ui-disabled-opacity`                 | `0.64`                                                                                                                                                                                                                   | Opacity applied to disabled controls.                                                                                                                                                                                                                                                                                                                       |
| `--ui-duration`                         | `0.2s`                                                                                                                                                                                                                   | Default transition duration. Multiplied by `--ui-motion`.                                                                                                                                                                                                                                                                                                   |
| `--ui-ease`                             | `ease`                                                                                                                                                                                                                   | Default easing for transitions.                                                                                                                                                                                                                                                                                                                             |
| `--ui-field-border-color`               | `color-mix( in oklch, var(--ui-text-strong) var(--ui-field-border-strength), var(--ui-surface) )`                                                                                                                        | Border color of every empty control: `TextField`, `Select`, `Textarea`, the unchecked `Checkbox`, `Radio` and `Switch`, the `Range` track and the `Progress` outline. `--ui-text-strong` mixed into `--ui-surface` at `--ui-field-border-strength`, so it reaches 3:1. Lighter than `--ui-border-color`, which is decorative, is a choice a theme can make. |
| `--ui-field-border-width`               | `1px`                                                                                                                                                                                                                    | Border width for fields, `Checkbox`, `Radio` and `Switch`.                                                                                                                                                                                                                                                                                                  |
| `--ui-field-helper-font-size`           | `var(--ui-font-size-caption)`                                                                                                                                                                                            | Font size for helper and end text under a field.                                                                                                                                                                                                                                                                                                            |
| `--ui-field-helper-line-height`         | `var(--ui-line-height-control)`                                                                                                                                                                                          | Line height for helper and end text under a field.                                                                                                                                                                                                                                                                                                          |
| `--ui-field-helper-text-color`          | `var(--ui-text)`                                                                                                                                                                                                         | Text color for helper and end text under a field.                                                                                                                                                                                                                                                                                                           |
| `--ui-field-label-font-size`            | `var(--ui-font-size-small)`                                                                                                                                                                                              | Font size for field labels.                                                                                                                                                                                                                                                                                                                                 |
| `--ui-field-label-font-weight`          | `var(--ui-font-weight-semibold)`                                                                                                                                                                                         | Font weight for emphasized field labels and legends.                                                                                                                                                                                                                                                                                                        |
| `--ui-field-label-text-color`           | `var(--ui-text-strong)`                                                                                                                                                                                                  | Text color for field labels.                                                                                                                                                                                                                                                                                                                                |
| `--ui-field-required-text-color`        | `var(--ui-invalid-text)`                                                                                                                                                                                                 | Color of the required asterisk.                                                                                                                                                                                                                                                                                                                             |
| `--ui-focus-ring-color`                 | `oklch( from var(--ui-surface) clamp(0, (0.6 - l) * 1000, 1) 0 0 )`                                                                                                                                                      | Color of the keyboard focus ring. Black on surfaces lighter than OKLCH 0.6 and white on darker ones, so it reaches 3:1 on any `--ui-surface`.                                                                                                                                                                                                               |
| `--ui-focus-ring-offset`                | `2px`                                                                                                                                                                                                                    | Distance between a control and its focus ring.                                                                                                                                                                                                                                                                                                              |
| `--ui-focus-ring-style`                 | `solid`                                                                                                                                                                                                                  | Outline style of the focus ring.                                                                                                                                                                                                                                                                                                                            |
| `--ui-focus-ring-width`                 | `2px`                                                                                                                                                                                                                    | Width of the focus ring.                                                                                                                                                                                                                                                                                                                                    |
| `--ui-invalid`                          | `light-dark( var(--ui-critical), oklch( from var(--ui-critical) max(l, var(--ui-invalid-min-lightness)) min(c, var(--ui-accent-max-chroma)) h ) )`                                                                       | Color for invalid field borders, fills and outlines. Lifted to `--ui-invalid-min-lightness` in dark mode, so invalid borders stand out from the page with more contrast.                                                                                                                                                                                    |
| `--ui-invalid-text`                     | `light-dark( oklch(from var(--ui-invalid) min(l, var(--ui-text-max-lightness)) c h), oklch( from var(--ui-invalid) max(l, var(--ui-text-min-lightness)) min(c, var(--ui-text-max-chroma)) h ) )`                         | Color for validation messages and invalid labels. `--ui-invalid` with its lightness kept within `--ui-text-max-lightness` and `--ui-text-min-lightness`, so it stays readable where `--ui-invalid` is lighter for borders.                                                                                                                                  |
| `--ui-line-height-control`              | `1.5`                                                                                                                                                                                                                    | Line height of interface text: labels, helpers, choice labels and field hints.                                                                                                                                                                                                                                                                              |
| `--ui-motion`                           | `1`                                                                                                                                                                                                                      | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/html/guide/theming.md#motion).                                                                                                                                                    |
| `--ui-on-accent`                        | `var(--ui-gray-1)`                                                                                                                                                                                                       | Near-white text on a saturated fill in both modes: critical buttons, severity `Badge`s and the checked choice mark in dark mode.                                                                                                                                                                                                                            |
| `--ui-on-primary`                       | `oklch( from var(--ui-primary) clamp(0.15, (0.565 - l) * 1000, 0.98) calc(c * 0.15) h )`                                                                                                                                 | Text color on `--ui-primary`. Derived with relative color: near-black when the primary's lightness is above 0.565, near-white below, tinted with 15% of its chroma, so a custom `--ui-primary` gets readable text.                                                                                                                                          |
| `--ui-primary`                          | `light-dark( oklch( from var(--ui-primary-source) min(l, var(--ui-primary-max-lightness)) c h ), oklch( from var(--ui-primary-source) max(l, var(--ui-primary-min-lightness)) min(c, var(--ui-accent-max-chroma)) h ) )` | Brand color for primary actions and accents. Derived from `--ui-primary-source` within `--ui-primary-max-lightness` and `--ui-primary-min-lightness`. Set `--ui-primary-source` to keep more contrast working, or this token to pin the color.                                                                                                              |
| `--ui-primary-tonal`                    | Unset                                                                                                                                                                                                                    | Background of `Button` and `ButtonGroup` with `.ui-primary` and `.ui-tonal`. When unset, a light tint of the palette. Material's `primary-container` and shadcn's `secondary` go here.                                                                                                                                                                      |
| `--ui-radius-x-small`                   | `min(var(--radius-1), var(--ui-radius))`                                                                                                                                                                                 | Corner radius of the `Checkbox` box. `--ui-radius`, capped at 2px.                                                                                                                                                                                                                                                                                          |
| `--ui-shadow-surface`                   | `none`                                                                                                                                                                                                                   | Shadow of tonal and outlined `Card` and `Accordion`, and of `Callout`. `none` by default, for themes that put every surface on the same plane.                                                                                                                                                                                                              |
| `--ui-space-1`                          | `calc(var(--size-1) * var(--ui-space-scale))`                                                                                                                                                                            | Spacing step 1: Open Props `--size-1` times `--ui-space-scale`.                                                                                                                                                                                                                                                                                             |
| `--ui-space-2`                          | `calc(var(--size-2) * var(--ui-space-scale))`                                                                                                                                                                            | Spacing step 2: Open Props `--size-2` times `--ui-space-scale`.                                                                                                                                                                                                                                                                                             |
| `--ui-space-3`                          | `calc(var(--size-3) * var(--ui-space-scale))`                                                                                                                                                                            | Spacing step 3: Open Props `--size-3` times `--ui-space-scale`.                                                                                                                                                                                                                                                                                             |
| `--ui-space-4`                          | `calc(var(--size-4) * var(--ui-space-scale))`                                                                                                                                                                            | Spacing step 4: Open Props `--size-4` times `--ui-space-scale`.                                                                                                                                                                                                                                                                                             |
| `--ui-space-5`                          | `calc(var(--size-5) * var(--ui-space-scale))`                                                                                                                                                                            | Spacing step 5: Open Props `--size-5` times `--ui-space-scale`.                                                                                                                                                                                                                                                                                             |
| `--ui-state-active-alpha-accent`        | `25%`                                                                                                                                                                                                                    | Alpha of the pressed state layer on primary and critical buttons.                                                                                                                                                                                                                                                                                           |
| `--ui-surface`                          | `light-dark(var(--ui-gray-1), var(--ui-gray-13))`                                                                                                                                                                        | Page and card background.                                                                                                                                                                                                                                                                                                                                   |
| `--ui-surface-tonal-hover`              | `light-dark( oklch(from var(--ui-surface-tonal) calc(l * 0.93) c h), oklch(from var(--ui-surface-tonal) calc(l * 1.1) c h) )`                                                                                            | Hover fill of a `--ui-surface-tonal` surface: clickable `Chip`s and filled `TextField`, `Select` and `Textarea` fields. Derived from `--ui-surface-tonal`, darker in light mode and lighter in dark mode.                                                                                                                                                   |
| `--ui-switch-thumb-size-large`          | `calc(var(--size-4) * var(--ui-density))`                                                                                                                                                                                | Diameter of the `Switch` thumb with `.ui-large`.                                                                                                                                                                                                                                                                                                            |
| `--ui-switch-thumb-size-small`          | `calc(0.75rem * var(--ui-density))`                                                                                                                                                                                      | Diameter of the `Switch` thumb with `.ui-small`, and in `List` rows unless the switch has a size class.                                                                                                                                                                                                                                                     |
| `--ui-switch-thumb-size-x-small`        | `calc(0.625rem * var(--ui-density))`                                                                                                                                                                                     | Diameter of the `Switch` thumb with `.ui-x-small`.                                                                                                                                                                                                                                                                                                          |
| `--ui-switch-track-block-size-large`    | `calc(var(--size-6) * var(--ui-density))`                                                                                                                                                                                | Height of the `Switch` track with `.ui-large`.                                                                                                                                                                                                                                                                                                              |
| `--ui-switch-track-block-size-small`    | `calc(var(--size-4) * var(--ui-density))`                                                                                                                                                                                | Height of the `Switch` track with `.ui-small`, and in `List` rows unless the switch has a size class.                                                                                                                                                                                                                                                       |
| `--ui-switch-track-block-size-x-small`  | `calc( var(--size-3) * var(--ui-density) )`                                                                                                                                                                              | Height of the `Switch` track with `.ui-x-small`.                                                                                                                                                                                                                                                                                                            |
| `--ui-switch-track-inline-size-large`   | `calc(3.5rem * var(--ui-density))`                                                                                                                                                                                       | Width of the `Switch` track with `.ui-large`.                                                                                                                                                                                                                                                                                                               |
| `--ui-switch-track-inline-size-small`   | `calc(2.5rem * var(--ui-density))`                                                                                                                                                                                       | Width of the `Switch` track with `.ui-small`, and in `List` rows unless the switch has a size class.                                                                                                                                                                                                                                                        |
| `--ui-switch-track-inline-size-x-small` | `calc( var(--size-7) * var(--ui-density) )`                                                                                                                                                                              | Width of the `Switch` track with `.ui-x-small`.                                                                                                                                                                                                                                                                                                             |
| `--ui-text-strong`                      | `light-dark(var(--ui-gray-15), var(--ui-gray-1))`                                                                                                                                                                        | Strongest text color, for headings, labels and values. Body text is `--ui-text`.                                                                                                                                                                                                                                                                            |

This component uses these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md).

### Field group API

| Type        | Modifiers                                 | Default | Description                                                                                               |
| ----------- | ----------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------- |
| Orientation | default, `.ui-horizontal`, `.ui-vertical` | default | The orientation of the fields. With `auto`, fields stack and a group with only buttons lines up in a row. |

#### Parts

| Part              | Description        |
| ----------------- | ------------------ |
| `.ui-field-group` | Container element. |

#### CSS variables

| Variable                         | Default                                                                                                                                                                                                     | Description                                                                                                                                                                                                                |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--ui-disabled-opacity`          | `0.64`                                                                                                                                                                                                      | Opacity applied to disabled controls.                                                                                                                                                                                      |
| `--ui-field-helper-font-size`    | `var(--ui-font-size-caption)`                                                                                                                                                                               | Font size for helper and end text under a field.                                                                                                                                                                           |
| `--ui-field-helper-line-height`  | `var(--ui-line-height-control)`                                                                                                                                                                             | Line height for helper and end text under a field.                                                                                                                                                                         |
| `--ui-field-helper-text-color`   | `var(--ui-text)`                                                                                                                                                                                            | Text color for helper and end text under a field.                                                                                                                                                                          |
| `--ui-field-label-font-weight`   | `var(--ui-font-weight-semibold)`                                                                                                                                                                            | Font weight for emphasized field labels and legends.                                                                                                                                                                       |
| `--ui-field-label-text-color`    | `var(--ui-text-strong)`                                                                                                                                                                                     | Text color for field labels.                                                                                                                                                                                               |
| `--ui-field-required-text-color` | `var(--ui-invalid-text)`                                                                                                                                                                                    | Color of the required asterisk.                                                                                                                                                                                            |
| `--ui-font-size-small`           | `var(--ui-font-size-200)`                                                                                                                                                                                   | Font size of helper text, `Callout`, `Table`, `Tooltip`, code blocks, dense `List` text and small buttons, chips, toggles and fields. Defaults to `--ui-font-size-200`.                                                    |
| `--ui-invalid-text`              | `light-dark( oklch(from var(--ui-invalid) min(l, var(--ui-text-max-lightness)) c h), oklch( from var(--ui-invalid) max(l, var(--ui-text-min-lightness)) min(c, var(--ui-text-max-chroma)) h ) )`            | Color for validation messages and invalid labels. `--ui-invalid` with its lightness kept within `--ui-text-max-lightness` and `--ui-text-min-lightness`, so it stays readable where `--ui-invalid` is lighter for borders. |
| `--ui-line-height-control`       | `1.5`                                                                                                                                                                                                       | Line height of interface text: labels, helpers, choice labels and field hints.                                                                                                                                             |
| `--ui-space-1`                   | `calc(var(--size-1) * var(--ui-space-scale))`                                                                                                                                                               | Spacing step 1: Open Props `--size-1` times `--ui-space-scale`.                                                                                                                                                            |
| `--ui-space-2`                   | `calc(var(--size-2) * var(--ui-space-scale))`                                                                                                                                                               | Spacing step 2: Open Props `--size-2` times `--ui-space-scale`.                                                                                                                                                            |
| `--ui-space-3`                   | `calc(var(--size-3) * var(--ui-space-scale))`                                                                                                                                                               | Spacing step 3: Open Props `--size-3` times `--ui-space-scale`.                                                                                                                                                            |
| `--ui-space-4`                   | `calc(var(--size-4) * var(--ui-space-scale))`                                                                                                                                                               | Spacing step 4: Open Props `--size-4` times `--ui-space-scale`.                                                                                                                                                            |
| `--ui-space-5`                   | `calc(var(--size-5) * var(--ui-space-scale))`                                                                                                                                                               | Spacing step 5: Open Props `--size-5` times `--ui-space-scale`.                                                                                                                                                            |
| `--ui-space-8`                   | `calc(var(--size-8) * var(--ui-space-scale))`                                                                                                                                                               | Spacing step 8: Open Props `--size-8` times `--ui-space-scale`.                                                                                                                                                            |
| `--ui-text`                      | `light-dark( color-mix( in oklch, var(--ui-text-strong) var(--ui-text-strength-light), var(--ui-surface) ), color-mix( in oklch, var(--ui-text-strong) var(--ui-text-strength-dark), var(--ui-surface) ) )` | Body text color. `--ui-text-strong` mixed into `--ui-surface` at `--ui-text-strength-light` or `--ui-text-strength-dark`.                                                                                                  |

This component uses these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md).

To label the group, wrap it in a `.ui-fieldset` with a `<legend>`.

## Component properties

Set these on the component itself, inline or in your own CSS. Inputs are the knobs. Outputs are derived from the inputs and the current state, so overriding one fixes it in every state. [Customizing](https://open-props-ui.netlify.app/html/guide/customizing.md#component-properties) has examples.

| Property              | Kind   | Description                                                                                                                                                                                         |
| --------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--_accent`           | Input  | Fill and border of the checked input. `--ui-choice-accent` when the theme sets it, otherwise `--ui-primary` with its lightness capped in dark mode, and `--ui-invalid` when invalid.                |
| `--_bg-color`         | Output | Background of `.ui-card`, read by `card.css`. The surface by default, `--_hover-bg-color` when hovered and `--_checked-bg-color` when checked.                                                      |
| `--_border-color`     | Output | Border of `.ui-card`, read by `card.css`. `--ui-border-color` by default, `--_accent` when checked and `--ui-invalid` when invalid.                                                                 |
| `--_border-width`     | Output | Border width of `.ui-card`, read by `card.css`. `--ui-border-width`.                                                                                                                                |
| `--_card-padding`     | Input  | Padding of `.ui-card`. `--ui-space-3`, and `--ui-space-2` in `.ui-small` and `.ui-x-small`.                                                                                                         |
| `--_checked-bg-color` | Input  | Background of a checked `.ui-card`. `--ui-primary-tonal` when the theme sets it, otherwise `--ui-primary` at `--ui-state-active-alpha-accent`.                                                      |
| `--_duration`         | Output | Duration of the transitions, `--ui-duration` times `--_motion`.                                                                                                                                     |
| `--_ease`             | Input  | Easing of the transitions. Defaults to `--ui-ease`.                                                                                                                                                 |
| `--_hover-bg-color`   | Input  | Background of a hovered `.ui-card`. Defaults to `--ui-surface-tonal-hover`.                                                                                                                         |
| `--_input-size`       | Input  | Width and height of the checkbox and radio input, which the label centers on. Defaults to `--ui-choice-size`, set by the size classes.                                                              |
| `--_motion`           | Input  | Motion multiplier for the transitions. `0` turns them off.                                                                                                                                          |
| `--_on-accent`        | Input  | Color of the checkmark, dash and dots on `--_accent`. `--ui-choice-on-accent` when the theme sets it, otherwise `--ui-on-primary`, or `--ui-on-accent` in dark mode. `--ui-on-accent` when invalid. |
| `--_ripple-size`      | Input  | Size of the hover ripple of checkboxes and radios, relative to the input. Set on `input`.                                                                                                           |
| `--_shadow`           | Output | Shadow of `.ui-card`, read by `card.css`. `--ui-shadow-surface` unless `.ui-tonal` or `.ui-elevated` set their own.                                                                                 |
| `--_thumb-scale`      | Output | Current scale of the ripple. Set by the hover and active states.                                                                                                                                    |

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
  --accent-contrast: light-dark(var(--ui-on-primary), var(--ui-on-accent));

  appearance: none;
  aspect-ratio: 1;
  background-color: var(--ui-surface);
  block-size: var(--size);
  border: var(--ui-field-border-width) solid var(--ui-field-border-color);
  border-radius: var(--ui-radius-x-small);
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
- [Card](https://open-props-ui.netlify.app/html/components/card.md)

Copy the CSS into your project to own it. It reads tokens from Open Props, `palette.css` and `theme.css`, so those go on the page too, after `layers.css`. See [Getting started](https://open-props-ui.netlify.app/html/guide/getting-started.md).

- `opui-css/css/components/checkbox.css`
- `opui-css/css/components/choice.css`
- `opui-css/css/components/form.css`
- `opui-css/css/components/card.css`

## Changelog

### What's new

- [Cards](#cards) with `.ui-card` on the label, plus `.ui-spread`, `.ui-tonal` or `.ui-elevated`.
- Breaking: [`.ui-vertical`](#label-position) replaces `.ui-stack`.
- Call `syncIndeterminate(input)` from `checkbox.js` after you change `data-indeterminate` ([Indeterminate](#indeterminate)).
- The unchecked border, [`--ui-field-border-color`](#api), reaches 3:1 against the page by default.
- The checked fill and mark read [`--ui-choice-accent`](#api) and `--ui-choice-on-accent` when a theme sets them.
- [Lines up](#label-alignment) with the first line of the label and centers on its capitals in any font.
- Breaking: `--highlight-size` is `--_ripple-size` and `--thumb-scale` is `--_thumb-scale`. `--isLTR` and `--isRTL` are gone, the halo centers itself ([Under the hood](#under-the-hood)).
- Without a [visible label](#visible-label), checkboxes center in table cells and lines of text, and stay a 24px click target at every size.
- Breaking: mark an invalid checkbox with `aria-invalid="true"` on the `<input>` instead of `data-invalid` on the root, also in a [group](#field-group-validation) ([Validation](#validation)).
- Takes `.ui-x-small`. [Sizes](#sizes)
- Breaking: [`choice.css`](#basics) holds the layout, label, end text, sizes and disabled styles shared with Radio and Switch.
- `--_duration` and `--_ease` set the transition duration and easing ([Under the hood](#under-the-hood)).
- Corners never get rounder than [`--ui-radius`](#api), so `0` squares them.
