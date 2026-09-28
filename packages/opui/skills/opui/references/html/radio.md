# Radio

See also: [Form documentation](https://open-props-ui.netlify.app/html/components/form.md).

Give every `<input type="radio">` in the group the same`name` attribute. Browsers use that shared name to enforce mutual exclusivity within the group.

```html
<fieldset class="ui-fieldset">
  <legend>Legend</legend>
  <div class="ui-field-group" role="group">
    <label class="ui-radio">
      <input name="radio-group-html" type="radio" checked />
      <span class="ui-label">Radio 1</span>
    </label>
    <label class="ui-radio">
      <input name="radio-group-html" type="radio" />
      <span class="ui-label">Radio 2</span>
    </label>
    <label class="ui-radio">
      <input name="radio-group-html" type="radio" />
      <span class="ui-label">Radio 3</span>
    </label>
  </div>
</fieldset>
```

## Direction

```html
<fieldset class="ui-fieldset">
  <legend>Legend</legend>
  <div class="ui-field-group ui-row" role="group">
    <label class="ui-radio">
      <input name="radio-group-direction-html" type="radio" checked />
      <span class="ui-label">Radio 1</span>
    </label>
    <label class="ui-radio">
      <input name="radio-group-direction-html" type="radio" />
      <span class="ui-label">Radio 2</span>
    </label>
    <label class="ui-radio">
      <input name="radio-group-direction-html" type="radio" />
      <span class="ui-label">Radio 3</span>
    </label>
  </div>
</fieldset>
```

## Field description

Can be placed above and below the fields.

```html
<fieldset class="ui-fieldset">
  <legend>Legend</legend>
  <span class="ui-field-description">Field description above fields</span>
  <div class="ui-field-group ui-row" role="group">
    <label class="ui-radio">
      <input name="radio-group-field-description-1-html" type="radio" checked />
      <span class="ui-label">Radio 1</span>
    </label>
    <label class="ui-radio">
      <input name="radio-group-field-description-1-html" type="radio" />
      <span class="ui-label">Radio 2</span>
    </label>
    <label class="ui-radio">
      <input name="radio-group-field-description-1-html" type="radio" />
      <span class="ui-label">Radio 3</span>
    </label>
  </div>
</fieldset>


<fieldset class="ui-fieldset">
  <legend>Legend</legend>
  <div class="ui-field-group ui-row" role="group">
    <label class="ui-radio">
      <input name="radio-group-field-description-2-html" type="radio" checked />
      <span class="ui-label">Radio 1</span>
    </label>
    <label class="ui-radio">
      <input name="radio-group-field-description-2-html" type="radio" />
      <span class="ui-label">Radio 2</span>
    </label>
    <label class="ui-radio">
      <input name="radio-group-field-description-2-html" type="radio" />
      <span class="ui-label">Radio 3</span>
    </label>
  </div>
  <span class="ui-field-description">Field description below fields</span>
</fieldset>
```

## Disabled

Attach the `disabled` attribute to the `<fieldset>` element.

```html
<fieldset class="ui-fieldset" disabled>
  <legend>Legend</legend>
  <div class="ui-field-group ui-row" role="group">
    <label class="ui-radio">
      <input name="radio-group-disabled-html" type="radio" checked />
      <span class="ui-label">Radio 1</span>
    </label>
    <label class="ui-radio">
      <input name="radio-group-disabled-html" type="radio" />
      <span class="ui-label">Radio 2</span>
    </label>
    <label class="ui-radio">
      <input name="radio-group-disabled-html" type="radio" />
      <span class="ui-label">Radio 3</span>
    </label>
  </div>
</fieldset>
```

## Required

Attach the `required` attribute to at least one of your `<input>` elements.

```html
<fieldset class="ui-fieldset">
  <legend>Legend</legend>
  <div class="ui-field-group ui-row" role="group">
    <label class="ui-radio">
      <input name="radio-group-required-html" type="radio" required />
      <span class="ui-label">Radio 1</span>
    </label>
    <label class="ui-radio">
      <input name="radio-group-required-html" type="radio" required />
      <span class="ui-label">Radio 2</span>
    </label>
    <label class="ui-radio">
      <input name="radio-group-required-html" type="radio" required />
      <span class="ui-label">Radio 3</span>
    </label>
  </div>
</fieldset>
```

## Validation

Attach the `data-invalid` attribute to your `<fieldset class="ui-fieldset">` element

```html
<fieldset class="ui-fieldset" data-invalid>
  <legend>Legend</legend>
  <div class="ui-field-group ui-row" role="group">
    <label class="ui-radio">
      <input name="radio-group-validation-html" type="radio" checked />
      <span class="ui-label">Radio 1</span>
    </label>
    <label class="ui-radio">
      <input name="radio-group-validation-html" type="radio" />
      <span class="ui-label">Radio 2</span>
    </label>
    <label class="ui-radio">
      <input name="radio-group-validation-html" type="radio" />
      <span class="ui-label">Radio 3</span>
    </label>
  </div>
  <span class="ui-end-text">Something went wrong!</span>
</fieldset>
```

## API

| Type       | Modifiers                                                                                                           | Default | Description                              |
| ---------- | ------------------------------------------------------------------------------------------------------------------- | ------- | ---------------------------------------- |
| Children   | `<legend>`, `.ui-legend`, `.ui-checkbox`, `.ui-radio`, `.ui-switch`, `.ui-text-field`, `.ui-textarea`, `.ui-select` | -       | Supported child elements.                |
| Direction  | default, `.ui-row`                                                                                                  | -       | The orientation of the element.          |
| Disabled   | `[disabled]`                                                                                                        | -       | When applied, disabled styles are shown. |
| Validation | `[data-invalid]`                                                                                                    | -       | When applied, error styles are shown.    |

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

