# Checkbox

See also: [Checkbox field group](#field-group).

### What's new

- Borders follow `--field-border-width`. See [CSS variables](#api).

## Anatomy

LabelEnd text

- `label.ui-checkbox`

  Container element.

- `<input>`

  The checkbox input.

- `.ui-label`

  The label.

- `.ui-end-text`

  Supporting text displayed below the label.

```html
<!-- Checked -->
<label class="ui-checkbox">
  <input name="checkbox-variants" type="checkbox" checked />
  <span class="ui-sr-only">Checked</span>
</label>


<!-- Unchecked -->
<label class="ui-checkbox">
  <input name="checkbox-variants" type="checkbox" />
  <span class="ui-sr-only">Unchecked</span>
</label>


<!-- Indeterminate -->
<label class="ui-checkbox">
  <input name="checkbox-variants" type="checkbox" data-indeterminate />
  <span class="ui-sr-only">Indeterminate</span>
</label>


<!-- Disabled -->
<label class="ui-checkbox">
  <input name="checkbox-variants" type="checkbox" disabled />
  <span class="ui-sr-only">Disabled</span>
</label>


<!-- Checked and disabled -->
<label class="ui-checkbox">
  <input name="checkbox-variants" type="checkbox" checked disabled />
  <span class="ui-sr-only">Checked and disabled</span>
</label>
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
  <input
    name="checkbox-supporting-text"
    type="checkbox"
    aria-describedby="checkbox-supporting-text-end-text-1"
  />
  <span class="ui-label">Default</span>
  <span class="ui-end-text" id="checkbox-supporting-text-end-text-1"
    >Supporting text</span
  >
</label>


<label class="ui-checkbox ui-stack">
  <input
    name="checkbox-supporting-text"
    type="checkbox"
    aria-describedby="checkbox-supporting-text-end-text-2"
  />
  <span class="ui-label">Stack</span>
  <span class="ui-end-text" id="checkbox-supporting-text-end-text-2"
    >Supporting text</span
  >
</label>
```

### Validation

- Add `[required]` to the `<input>` element to toggle required styles.
- Add `data-invalid` on the root element to toggle invalid styles. Make use of the end text to give extra feedback on the error.

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
  <label class="ui-checkbox" data-invalid>
    <input
      aria-invalid="true"
      name="checkbox-validation"
      type="checkbox"
      checked
      aria-describedby="checkbox-validation-end-text-1"
    />
    <span class="ui-label">Default</span>
    <span class="ui-end-text" id="checkbox-validation-end-text-1"
      >Check yourself</span
    >
  </label>


  <label class="ui-checkbox ui-stack" data-invalid>
    <input
      aria-invalid="true"
      name="checkbox-validation"
      type="checkbox"
      aria-describedby="checkbox-validation-end-text-2"
    />
    <span class="ui-label">Stack</span>
    <span class="ui-end-text" id="checkbox-validation-end-text-2"
      >Before you wreck yourself</span
    >
  </label>
</div>
```

## Indeterminate

Add `data-indeterminate` to the `<input type="checkbox">` and run a script that sets `el.indeterminate = true`. `indeterminate` is a JavaScript-only property on `HTMLInputElement` - the attribute alone has no effect.

### JavaScript required

The `indeterminate` state cannot be set with HTML or CSS alone. The browser only exposes it as a property on `HTMLInputElement`, so a small script is needed to flip `el.indeterminate = true` after the element is in the DOM. The `:indeterminate` CSS pseudo-class then matches and the dash glyph appears.

```html
<fieldset class="ui-fieldset indeterminate-demo">
  <legend>
    <label class="ui-checkbox parent">
      <input type="checkbox" data-indeterminate />
      <span class="ui-label">Select all</span>
    </label>
  </legend>
  <div class="ui-field-group" role="group">
    <label class="ui-checkbox child">
      <input name="indeterminate-children" type="checkbox" checked />
      <span class="ui-label">Apples</span>
    </label>
    <label class="ui-checkbox child">
      <input name="indeterminate-children" type="checkbox" />
      <span class="ui-label">Bananas</span>
    </label>
    <label class="ui-checkbox child">
      <input name="indeterminate-children" type="checkbox" />
      <span class="ui-label">Cherries</span>
    </label>
  </div>
</fieldset>


<script>
  function setupIndeterminateDemoHtml() {
    document.querySelectorAll(".indeterminate-demo").forEach((root) => {
      const parent = root.querySelector('.parent input[type="checkbox"]')
      const children = Array.from(
        root.querySelectorAll('.child input[type="checkbox"]'),
      )
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


  setupIndeterminateDemoHtml()
  document.addEventListener("astro:after-swap", setupIndeterminateDemoHtml)
</script>
```

## Spread

Add the `.ui-spread` class to the `<label class="ui-checkbox">`to push the label to the left and the checkbox to the right. This is useful for full-width items like lists and menus.

```html
<label class="ui-checkbox ui-spread">
  <input
    name="checkbox-spread"
    type="checkbox"
    aria-describedby="checkbox-spread-end-text-1"
  />
  <span class="ui-label">Accept Terms & Conditions</span>
  <span class="ui-end-text" id="checkbox-spread-end-text-1"
    >I have read and agree to the privacy policy.</span
  >
</label>


<label class="ui-checkbox ui-spread">
  <input
    name="checkbox-spread"
    type="checkbox"
    required
    aria-describedby="checkbox-spread-end-text-2"
  />
  <span class="ui-label">Required</span>
  <span class="ui-end-text" id="checkbox-spread-end-text-2"
    >You must accept this to continue.</span
  >
</label>


<label class="ui-checkbox ui-spread">
  <input
    name="checkbox-spread"
    type="checkbox"
    disabled
    aria-describedby="checkbox-spread-end-text-3"
  />
  <span class="ui-label">Disabled</span>
  <span class="ui-end-text" id="checkbox-spread-end-text-3"
    >This checkbox is disabled.</span
  >
</label>


<label class="ui-checkbox ui-spread" data-invalid>
  <input
    aria-invalid="true"
    name="checkbox-spread"
    type="checkbox"
    aria-describedby="checkbox-spread-end-text-4"
  />
  <span class="ui-label">Invalid Checkbox</span>
  <span class="ui-end-text" id="checkbox-spread-end-text-4"
    >There is an error with this checkbox.</span
  >
</label>
```

## Sizes

```html
<div class="example-row">
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

## Field group

Use field groups to group related checkboxes.

Give every `<input type="checkbox">` in the group the same`name` attribute so they're submitted together.

See also: [Form documentation](https://open-props-ui.netlify.app/html/components/form.md).

```html
<form class="ui-form">
  <fieldset class="ui-fieldset">
    <legend>Legend</legend>
    <div class="ui-field-group" role="group">
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
    <div class="ui-field-group ui-row" role="group">
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
    <div class="ui-field-group ui-row" role="group">
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
    <div class="ui-field-group ui-row" role="group">
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

Attach the `disabled` attribute to the `<fieldset>` element.

```html
<form class="ui-form">
  <fieldset class="ui-fieldset" disabled>
    <legend>Legend</legend>
    <div class="ui-field-group ui-row" role="group">
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

Attach the `required` attribute to at least one of your `<input>` elements.

```html
<form class="ui-form">
  <fieldset class="ui-fieldset">
    <legend>These are required!</legend>
    <div class="ui-field-group ui-row" role="group">
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

Attach the `data-invalid` attribute to your `<fieldset class="ui-fieldset">` element

```html
<form class="ui-form">
  <fieldset class="ui-fieldset" data-invalid>
    <legend>Legend</legend>
    <div class="ui-field-group ui-row" role="group">
      <label class="ui-checkbox">
        <input name="checkbox-group-validation" type="checkbox" checked />
        <span class="ui-label">Checkbox 1</span>
      </label>
      <label class="ui-checkbox">
        <input name="checkbox-group-validation" type="checkbox" />
        <span class="ui-label">Checkbox 2</span>
      </label>
      <label class="ui-checkbox">
        <input name="checkbox-group-validation" type="checkbox" />
        <span class="ui-label">Checkbox 3</span>
      </label>
    </div>
    <span class="ui-end-text">Something went wrong!</span>
  </fieldset>
</form>
```

## Accessibility

### Labels

Accessible checkboxes must have a label. You can choose between three approaches:

| Approach                                                          | Usage in Checkbox component |
| ----------------------------------------------------------------- | --------------------------- |
| Provide a label text inside the `label`/`role="checkbox"` element | Default                     |
| Add a `aria-label` on the input element                           | Not used                    |
| Have a visible label that you reference with `aria-labelledby`    | Not used                    |

### Keyboard support

| Key     | Function                                       |
| ------- | ---------------------------------------------- |
| `Space` | When Checkbox is focused it changes its state. |

## API

### Checkbox API

| Type       | Modifiers                   | Default | Description                                                                          |
| ---------- | --------------------------- | ------- | ------------------------------------------------------------------------------------ |
| Layout     | `.ui-spread`                | -       | Pushes the label and the input to opposite ends.                                     |
| Layout     | `.ui-stack`                 | -       | Stacks the label under the input.                                                    |
| Sizes      | `.ui-large`, `.ui-small`    | -       | The size of the element.                                                             |
| State      | `input[data-indeterminate]` | -       | Shows a partially checked state. Sets the `indeterminate` property on the `<input>`. |
| Validation | `[data-invalid]`            | -       | Shows error styles.                                                                  |

#### Parts

| Part                | Description                                |
| ------------------- | ------------------------------------------ |
| `label.ui-checkbox` | Container element.                         |
| `<input>`           | The checkbox input.                        |
| `.ui-label`         | The label.                                 |
| `.ui-end-text`      | Supporting text displayed below the label. |

#### CSS variables

| Variable                     | Default                                     | Description                                                           |
| ---------------------------- | ------------------------------------------- | --------------------------------------------------------------------- |
| `--border-color`             | `light-dark(var(--gray-4), var(--gray-12))` | Default border color for cards, lists, tables and dividers.           |
| `--choice-size`              | `var(--size-4)`                             | Default `Checkbox` and `Radio` input size.                            |
| `--choice-size-large`        | `var(--size-5)`                             | `Checkbox` and `Radio` input size with `.ui-large`.                   |
| `--choice-size-small`        | `var(--size-3)`                             | `Checkbox` and `Radio` input size with `.ui-small` and inside `List`. |
| `--disabled-opacity`         | `0.64`                                      | Opacity applied to disabled controls.                                 |
| `--field-border-width`       | `1px`                                       | Border width for fields, `Checkbox`, `Radio` and `Switch`.            |
| `--field-helper-color`       | `var(--text-muted)`                         | Text color for helper and end text under a field.                     |
| `--field-helper-font-size`   | `var(--font-size-0)`                        | Font size for helper and end text under a field.                      |
| `--field-helper-line-height` | `var(--font-lineheight-3)`                  | Line height for helper and end text under a field.                    |
| `--field-label-color`        | `var(--text-primary)`                       | Text color for field labels.                                          |
| `--field-label-font-size`    | `var(--font-size-05)`                       | Font size for field labels.                                           |
| `--field-label-font-weight`  | `var(--font-weight-semibold)`               | Font weight for emphasized field labels and legends.                  |
| `--field-required-color`     | `var(--invalid-color)`                      | Color of the required asterisk.                                       |
| `--invalid-color`            | `var(--critical)`                           | Color for invalid fields and validation messages.                     |
| `--primary`                  | `var(--color-8)`                            | Brand color for primary actions and accents.                          |
| `--primary-contrast`         | `var(--gray-1)`                             | Text color on a `--primary` background.                               |
| `--surface-default`          | `light-dark(var(--gray-1), var(--gray-13))` | Page and card background.                                             |
| `--text-primary`             | `light-dark(var(--gray-15), var(--gray-1))` | Emphasized text color for headings, labels and values.                |

Theme tokens this component reads. Override them on `html`or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md)for the full list.

Use `.ui-sr-only` instead of `.ui-label` to hide the label visually. `data-indeterminate` needs `checkbox.js`, which sets the `indeterminate` property.

### Field group API

| Type        | Modifiers          | Default | Description                     |
| ----------- | ------------------ | ------- | ------------------------------- |
| Orientation | default, `.ui-row` | -       | The orientation of the element. |

#### Parts

| Part              | Description        |
| ----------------- | ------------------ |
| `.ui-field-group` | Container element. |

#### CSS variables

| Variable                     | Default                                     | Description                                                                                           |
| ---------------------------- | ------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `--disabled-opacity`         | `0.64`                                      | Opacity applied to disabled controls.                                                                 |
| `--field-helper-color`       | `var(--text-muted)`                         | Text color for helper and end text under a field.                                                     |
| `--field-helper-font-size`   | `var(--font-size-0)`                        | Font size for helper and end text under a field.                                                      |
| `--field-helper-line-height` | `var(--font-lineheight-3)`                  | Line height for helper and end text under a field.                                                    |
| `--field-label-color`        | `var(--text-primary)`                       | Text color for field labels.                                                                          |
| `--field-label-font-weight`  | `var(--font-weight-semibold)`               | Font weight for emphasized field labels and legends.                                                  |
| `--field-required-color`     | `var(--invalid-color)`                      | Color of the required asterisk.                                                                       |
| `--focus-ring-width`         | `2px`                                       | Width of the focus ring.                                                                              |
| `--font-size-05`             | `0.875rem`                                  | A font size between Open Props `--font-size-0` and `--font-size-1`, used for labels and compact text. |
| `--invalid-color`            | `var(--critical)`                           | Color for invalid fields and validation messages.                                                     |
| `--text-muted`               | `light-dark(var(--gray-13), var(--gray-4))` | Body text color.                                                                                      |

Theme tokens this component reads. Override them on `html`or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md)for the full list.

The root needs `role="group"`. Wrap it in a `.ui-fieldset` with a `<legend>` to label it.

## Browser support

- Chromium: Full support Supported since v105.
- Firefox: Full support Supported since v121.
- Safari: Full support Supported since v15.4.

See also the [full browser support guide](https://open-props-ui.netlify.app/html/guide/browser-support.md).

## Installation

### See also

- [Form](https://open-props-ui.netlify.app/html/components/form.md)

- `opui-css/css/components/checkbox.css`
- `opui-css/css/components/form.css`

