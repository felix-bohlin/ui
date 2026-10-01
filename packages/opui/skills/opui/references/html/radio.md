# Radio

See also: [Form documentation](https://open-props-ui.netlify.app/html/components/form.md).

### What's new

- The input is `--choice-size` (20px) like `Checkbox`, and borders follow `--field-border-width`. See [CSS variables](#api).

## Anatomy

LabelEnd text

- `label.ui-radio`

  Container element.

- `<input>`

  The radio input.

- `.ui-label`

  The label.

- `.ui-end-text`

  Supporting text displayed below the label.

Give every `<input type="radio">` in the group the same`name` attribute. Browsers use that shared name to enforce mutual exclusivity within the group.

```html
<form class="ui-form">
  <fieldset class="ui-fieldset">
    <legend>Legend</legend>
    <div class="ui-field-group" role="group">
      <label class="ui-radio">
        <input name="radio-group" type="radio" value="1" checked />
        <span class="ui-label">Radio 1</span>
      </label>
      <label class="ui-radio">
        <input name="radio-group" type="radio" value="2" />
        <span class="ui-label">Radio 2</span>
      </label>
      <label class="ui-radio">
        <input name="radio-group" type="radio" value="3" />
        <span class="ui-label">Radio 3</span>
      </label>
    </div>
  </fieldset>
</form>
```

## Direction

```html
<form class="ui-form">
  <fieldset class="ui-fieldset">
    <legend>Legend</legend>
    <div class="ui-field-group ui-row" role="group">
      <label class="ui-radio">
        <input name="radio-group-direction" type="radio" value="1" checked />
        <span class="ui-label">Radio 1</span>
      </label>
      <label class="ui-radio">
        <input name="radio-group-direction" type="radio" value="2" />
        <span class="ui-label">Radio 2</span>
      </label>
      <label class="ui-radio">
        <input name="radio-group-direction" type="radio" value="3" />
        <span class="ui-label">Radio 3</span>
      </label>
    </div>
  </fieldset>
</form>
```

## Field description

Can be placed above and below the fields.

```html
<form class="ui-form">
  <fieldset class="ui-fieldset">
    <legend>Legend</legend>
    <p class="ui-field-description">Field description above fields</p>
    <div class="ui-field-group ui-row" role="group">
      <label class="ui-radio">
        <input
          name="radio-group-field-description-1"
          type="radio"
          value="1"
          checked
        />
        <span class="ui-label">Radio 1</span>
      </label>
      <label class="ui-radio">
        <input name="radio-group-field-description-1" type="radio" value="2" />
        <span class="ui-label">Radio 2</span>
      </label>
      <label class="ui-radio">
        <input name="radio-group-field-description-1" type="radio" value="3" />
        <span class="ui-label">Radio 3</span>
      </label>
    </div>
  </fieldset>


  <fieldset class="ui-fieldset">
    <legend>Legend</legend>
    <div class="ui-field-group ui-row" role="group">
      <label class="ui-radio">
        <input
          name="radio-group-field-description-2"
          type="radio"
          value="1"
          checked
        />
        <span class="ui-label">Radio 1</span>
      </label>
      <label class="ui-radio">
        <input name="radio-group-field-description-2" type="radio" value="2" />
        <span class="ui-label">Radio 2</span>
      </label>
      <label class="ui-radio">
        <input name="radio-group-field-description-2" type="radio" value="3" />
        <span class="ui-label">Radio 3</span>
      </label>
    </div>
    <p class="ui-field-description">Field description below fields</p>
  </fieldset>
</form>
```

## Disabled

Attach the `disabled` attribute to the `<fieldset>` element.

```html
<form class="ui-form">
  <fieldset class="ui-fieldset" disabled>
    <legend>Legend</legend>
    <div class="ui-field-group ui-row" role="group">
      <label class="ui-radio">
        <input name="radio-group-disabled" type="radio" value="1" checked />
        <span class="ui-label">Radio 1</span>
      </label>
      <label class="ui-radio">
        <input name="radio-group-disabled" type="radio" value="2" />
        <span class="ui-label">Radio 2</span>
      </label>
      <label class="ui-radio">
        <input name="radio-group-disabled" type="radio" value="3" />
        <span class="ui-label">Radio 3</span>
      </label>
    </div>
  </fieldset>
</form>
```

## Required

Attach the `required` attribute to at least one of your `<input>` elements.

```html
<form class="ui-form">
  <fieldset class="ui-fieldset">
    <legend>These are required!</legend>
    <div class="ui-field-group ui-row" role="group">
      <label class="ui-radio">
        <input name="radio-group-required" type="radio" value="1" required />
        <span class="ui-label">Radio 1</span>
      </label>
      <label class="ui-radio">
        <input name="radio-group-required" type="radio" value="2" required />
        <span class="ui-label">Radio 2</span>
      </label>
      <label class="ui-radio">
        <input name="radio-group-required" type="radio" value="3" required />
        <span class="ui-label">Radio 3</span>
      </label>
    </div>
  </fieldset>
</form>
```

## Validation

Attach the `data-invalid` attribute to your `<fieldset class="ui-fieldset">` element

```html
<form class="ui-form">
  <fieldset class="ui-fieldset" data-invalid>
    <legend>Legend</legend>
    <div class="ui-field-group ui-row" role="group">
      <label class="ui-radio">
        <input name="radio-group-validation" type="radio" value="1" checked />
        <span class="ui-label">Radio 1</span>
      </label>
      <label class="ui-radio">
        <input name="radio-group-validation" type="radio" value="2" />
        <span class="ui-label">Radio 2</span>
      </label>
      <label class="ui-radio">
        <input name="radio-group-validation" type="radio" value="3" />
        <span class="ui-label">Radio 3</span>
      </label>
    </div>
    <span class="ui-end-text">Something went wrong!</span>
  </fieldset>
</form>
```

## API

### Radio API

| Type       | Modifiers                | Default | Description                       |
| ---------- | ------------------------ | ------- | --------------------------------- |
| Layout     | `.ui-stack`              | -       | Stacks the label under the input. |
| Sizes      | `.ui-large`, `.ui-small` | -       | The size of the element.          |
| Validation | `[data-invalid]`         | -       | Shows error styles.               |

#### Parts

| Part             | Description                                |
| ---------------- | ------------------------------------------ |
| `label.ui-radio` | Container element.                         |
| `<input>`        | The radio input.                           |
| `.ui-label`      | The label.                                 |
| `.ui-end-text`   | Supporting text displayed below the label. |

#### CSS variables

| Variable                     | Default                                     | Description                                                              |
| ---------------------------- | ------------------------------------------- | ------------------------------------------------------------------------ |
| `--choice-size`              | `var(--size-4)`                             | Default `Checkbox` and `Radio` input size.                               |
| `--choice-size-small`        | `var(--size-3)`                             | `Checkbox` and `Radio` input size with `.ui-small` and inside `List`.    |
| `--disabled-opacity`         | `0.64`                                      | Opacity applied to disabled controls.                                    |
| `--field-border-color`       | `var(--border-color)`                       | Border color for `TextField`, `Select`, `Textarea`, `Radio` and `Range`. |
| `--field-border-width`       | `1px`                                       | Border width for fields, `Checkbox`, `Radio` and `Switch`.               |
| `--field-helper-color`       | `var(--text-muted)`                         | Text color for helper and end text under a field.                        |
| `--field-helper-font-size`   | `var(--font-size-0)`                        | Font size for helper and end text under a field.                         |
| `--field-helper-line-height` | `var(--font-lineheight-3)`                  | Line height for helper and end text under a field.                       |
| `--field-label-color`        | `var(--text-primary)`                       | Text color for field labels.                                             |
| `--field-label-font-size`    | `var(--font-size-05)`                       | Font size for field labels.                                              |
| `--field-required-color`     | `var(--invalid-color)`                      | Color of the required asterisk.                                          |
| `--invalid-color`            | `var(--critical)`                           | Color for invalid fields and validation messages.                        |
| `--primary`                  | `var(--color-8)`                            | Brand color for primary actions and accents.                             |
| `--primary-contrast`         | `var(--gray-1)`                             | Text color on a `--primary` background.                                  |
| `--surface-default`          | `light-dark(var(--gray-1), var(--gray-13))` | Page and card background.                                                |
| `--text-primary`             | `light-dark(var(--gray-15), var(--gray-1))` | Emphasized text color for headings, labels and values.                   |

Theme tokens this component reads. Override them on `html`or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md)for the full list.

Use `.ui-sr-only` instead of `.ui-label` to hide the label visually.

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

- `opui-css/css/components/radio.css`
- `opui-css/css/components/form.css`

