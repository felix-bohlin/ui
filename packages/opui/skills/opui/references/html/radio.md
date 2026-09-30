# Radio

See also: [Form documentation](https://open-props-ui.netlify.app/html/components/form.md).

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

Use `.ui-sr-only` instead of `.ui-label` to hide the label visually.

### Field group API

| Type        | Modifiers          | Default | Description                     |
| ----------- | ------------------ | ------- | ------------------------------- |
| Orientation | default, `.ui-row` | -       | The orientation of the element. |

#### Parts

| Part              | Description        |
| ----------------- | ------------------ |
| `.ui-field-group` | Container element. |

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

