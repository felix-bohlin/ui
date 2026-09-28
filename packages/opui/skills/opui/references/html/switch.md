# Switch

See also: [Switch field group](#field-group).

All switches should have an accessible name. Either provide a visible or visually-hidden label inside the component, or set `aria-label` on the input. Both approaches are fine.

```html
<!-- Checked -->
<label class="ui-switch">
  <input
    name="switch-variants-html"
    type="checkbox"
    role="switch"
    checked
    aria-label="Label"
  />
</label>


<!-- Unchecked -->
<label class="ui-switch">
  <input
    name="switch-variants-html"
    type="checkbox"
    role="switch"
    aria-label="Label"
  />
</label>


<!-- Checked & disabled -->
<label class="ui-switch">
  <input
    name="switch-variants-html"
    type="checkbox"
    role="switch"
    checked
    disabled
    aria-label="Label"
  />
</label>


<!-- Unchecked & disabled -->
<label class="ui-switch">
  <input
    name="switch-variants-html"
    type="checkbox"
    role="switch"
    disabled
    aria-label="Label"
  />
</label>
```

## Visible label

Render the label text inside an element with a `.ui-label` class. Also, don't miss the info on label [accessibility](#accessibility).

```html
<label class="ui-switch">
  <input name="switch-visible-label-html" type="checkbox" role="switch" />
  <span class="ui-label">Label</span>
</label>


<label class="ui-switch">
  <input type="checkbox" role="switch" disabled />
  <span class="ui-label">Disabled</span>
</label>


<label class="ui-switch">
  <input type="checkbox" role="switch" />
  <span class="ui-label"
    >Long text bacon ipsum dolor amet prosciutto tenderloin biltong leberkas
    ribeye short ribs shankle tri-tip doner buffalo chislic meatloaf
    meatball.</span
  >
</label>
```

### Label position

```html
<label class="ui-switch">
  <input name="switch-label-position-html" type="checkbox" role="switch" />
  <span class="ui-label">Default</span>
</label>


<label class="ui-switch ui-stack">
  <input name="switch-label-position-html" type="checkbox" role="switch" />
  <span class="ui-label">Stack</span>
</label>
```

### End text

```html
<label class="ui-switch">
  <input name="switch-supporting-text-html" type="checkbox" role="switch" />
  <span class="ui-label">Default</span>
  <span class="ui-end-text">Supporting text</span>
</label>


<label class="ui-switch ui-stack">
  <input name="switch-supporting-text-html" type="checkbox" role="switch" />
  <span class="ui-label">Stack</span>
  <span class="ui-end-text">Supporting text</span>
</label>
```

### Validation

- Add `[required]` to the `<input>` element to toggle required styles.
- Add `data-invalid` on the root element to toggle invalid styles. Make use of the end text to give extra feedback on the error.

```html
<div class="example-row ui-spacious">
  <label class="ui-switch">
    <input
      name="switch-validation-html"
      type="checkbox"
      role="switch"
      required
    />
    <span class="ui-label">Default</span>
  </label>


  <label class="ui-switch ui-stack">
    <input
      name="switch-validation-html"
      type="checkbox"
      role="switch"
      required
    />
    <span class="ui-label">Stack</span>
  </label>
</div>


<div class="example-row ui-spacious">
  <label class="ui-switch" data-invalid>
    <input name="switch-validation-html" type="checkbox" role="switch" />
    <span class="ui-label">Default</span>
    <span class="ui-end-text">Supporting text</span>
  </label>


  <label class="ui-switch ui-stack" data-invalid>
    <input name="switch-validation-html" type="checkbox" role="switch" />
    <span class="ui-label">Stack</span>
    <span class="ui-end-text">Supporting text</span>
  </label>
</div>
```

## Spread

Add the `.ui-spread` class to the `<label class="ui-switch">` to push the label to the left and the switch to the right. This is useful for full-width items like lists and menus.

```html
<label class="ui-switch ui-spread">
  <input name="switch-spread-html" type="checkbox" role="switch" />
  <span class="ui-label">Notifications</span>
  <span class="ui-end-text">Receive alerts when someone mentions you.</span>
</label>


<label class="ui-switch ui-spread">
  <input name="switch-spread-html" type="checkbox" role="switch" required />
  <span class="ui-label">Required</span>
  <span class="ui-end-text">You must accept this to proceed.</span>
</label>


<label class="ui-switch ui-spread">
  <input name="switch-spread-html" type="checkbox" role="switch" disabled />
  <span class="ui-label">Disabled</span>
  <span class="ui-end-text">This switch is disabled.</span>
</label>


<label class="ui-switch ui-spread" data-invalid>
  <input name="switch-spread-html" type="checkbox" role="switch" />
  <span class="ui-label">Invalid Switch</span>
  <span class="ui-end-text">There is an error with this switch.</span>
</label>
```

## Sizes

Add the `.ui-small` class on the `<label class="ui-switch">` for a smaller Switch variant.

```html
<div class="example-row">
  <label class="ui-switch ui-small">
    <input
      name="switch-sizes-html"
      type="checkbox"
      role="switch"
      checked
      aria-label="Small"
    />
  </label>


  <label class="ui-switch">
    <input
      name="switch-sizes-html"
      type="checkbox"
      role="switch"
      checked
      aria-label="Default"
    />
  </label>
</div>


<div class="example-row">
  <label class="ui-switch ui-small">
    <input name="switch-sizes-html" type="checkbox" role="switch" checked />
    <span class="ui-label">Small</span>
  </label>


  <label class="ui-switch">
    <input name="switch-sizes-html" type="checkbox" role="switch" checked />
    <span class="ui-label">Default</span>
  </label>
</div>
```

## Icons

```html
<label class="ui-switch ui-small">
  <span class="ui-icon-unchecked">
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
  <span class="ui-icon-checked">
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
  <input
    name="switch-icons-html"
    type="checkbox"
    role="switch"
    aria-label="Toggle theme"
  />
</label>


<label class="ui-switch">
  <span class="ui-icon-unchecked">
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
  <span class="ui-icon-checked">
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
  <input
    name="switch-icons-html"
    type="checkbox"
    role="switch"
    checked
    aria-label="Toggle theme"
  />
</label>
```

## Field group

Use field groups to group related switches.

Give every `<input>` in the group the same `name`attribute so they're submitted together.

See also: [Form documentation](https://open-props-ui.netlify.app/html/components/form.md).

```html
<fieldset class="ui-fieldset">
  <legend>Legend</legend>
  <div class="ui-field-group" role="group">
    <label class="ui-switch">
      <input name="switch-group-html" type="checkbox" role="switch" />
      <span class="ui-label">Switch 1</span>
    </label>
    <label class="ui-switch">
      <input name="switch-group-html" type="checkbox" role="switch" />
      <span class="ui-label">Switch 2</span>
    </label>
    <label class="ui-switch">
      <input name="switch-group-html" type="checkbox" role="switch" />
      <span class="ui-label">Switch 3</span>
    </label>
  </div>
</fieldset>
```

### Direction

```html
<fieldset class="ui-fieldset">
  <legend>Legend</legend>
  <div class="ui-field-group ui-row" role="group">
    <label class="ui-switch">
      <input name="switch-group-direction-html" type="checkbox" role="switch" />
      <span class="ui-label">Switch 1</span>
    </label>
    <label class="ui-switch">
      <input name="switch-group-direction-html" type="checkbox" role="switch" />
      <span class="ui-label">Switch 2</span>
    </label>
    <label class="ui-switch">
      <input name="switch-group-direction-html" type="checkbox" role="switch" />
      <span class="ui-label">Switch 3</span>
    </label>
  </div>
</fieldset>
```

### Field description

Can be placed above and below the fields.

```html
<fieldset class="ui-fieldset">
  <legend>Legend</legend>
  <span class="ui-field-description">Field description above fields</span>
  <div class="ui-field-group ui-row" role="group">
    <label class="ui-switch">
      <input
        name="switch-group-field-description-1-html"
        type="checkbox"
        role="switch"
      />
      <span class="ui-label">Switch 1</span>
    </label>
    <label class="ui-switch">
      <input
        name="switch-group-field-description-1-html"
        type="checkbox"
        role="switch"
      />
      <span class="ui-label">Switch 2</span>
    </label>
    <label class="ui-switch">
      <input
        name="switch-group-field-description-1-html"
        type="checkbox"
        role="switch"
      />
      <span class="ui-label">Switch 3</span>
    </label>
  </div>
</fieldset>


<fieldset class="ui-fieldset">
  <legend>Legend</legend>
  <div class="ui-field-group ui-row" role="group">
    <label class="ui-switch">
      <input
        name="switch-group-field-description-2-html"
        type="checkbox"
        role="switch"
      />
      <span class="ui-label">Switch 1</span>
    </label>
    <label class="ui-switch">
      <input
        name="switch-group-field-description-2-html"
        type="checkbox"
        role="switch"
      />
      <span class="ui-label">Switch 2</span>
    </label>
    <label class="ui-switch">
      <input
        name="switch-group-field-description-2-html"
        type="checkbox"
        role="switch"
      />
      <span class="ui-label">Switch 3</span>
    </label>
  </div>
  <span class="ui-field-description">Field description below fields</span>
</fieldset>
```

### Disabled

Attach the `disabled` attribute to the `<fieldset>` element.

```html
<fieldset class="ui-fieldset" disabled>
  <legend>Legend</legend>
  <div class="ui-field-group ui-row" role="group">
    <label class="ui-switch">
      <input name="switch-group-disabled-html" type="checkbox" role="switch" />
      <span class="ui-label">Switch 1</span>
    </label>
    <label class="ui-switch">
      <input name="switch-group-disabled-html" type="checkbox" role="switch" />
      <span class="ui-label">Switch 2</span>
    </label>
    <label class="ui-switch">
      <input name="switch-group-disabled-html" type="checkbox" role="switch" />
      <span class="ui-label">Switch 3</span>
    </label>
  </div>
</fieldset>
```

### Required

Attach the `required` attribute to at least one of your `<input>` elements.

```html
<fieldset class="ui-fieldset">
  <legend>These are required!</legend>
  <div class="ui-field-group ui-row" role="group">
    <label class="ui-switch">
      <input
        name="switch-group-required-html"
        type="checkbox"
        role="switch"
        required
      />
      <span class="ui-label">Switch 1</span>
    </label>
    <label class="ui-switch">
      <input
        name="switch-group-required-html"
        type="checkbox"
        role="switch"
        required
      />
      <span class="ui-label">Switch 2</span>
    </label>
    <label class="ui-switch">
      <input
        name="switch-group-required-html"
        type="checkbox"
        role="switch"
        required
      />
      <span class="ui-label">Switch 3</span>
    </label>
  </div>
</fieldset>
```

### Validation

Attach the `data-invalid` attribute to your `<fieldset class="ui-fieldset">` element.

```html
<fieldset class="ui-fieldset" data-invalid>
  <legend>Legend</legend>
  <div class="ui-field-group ui-row" role="group">
    <label class="ui-switch">
      <input
        name="switch-field-group-validation-html"
        type="checkbox"
        role="switch"
      />
      <span class="ui-label">Switch 1</span>
    </label>
    <label class="ui-switch">
      <input
        name="switch-field-group-validation-html"
        type="checkbox"
        role="switch"
      />
      <span class="ui-label">Switch 2</span>
    </label>
    <label class="ui-switch">
      <input
        name="switch-field-group-validation-html"
        type="checkbox"
        role="switch"
      />
      <span class="ui-label">Switch 3</span>
    </label>
  </div>
  <span class="ui-end-text">Something went wrong!</span>
</fieldset>
```

## Accessibility

### Role & attributes

| Role/attribute  | Usage                                                                            |
| --------------- | -------------------------------------------------------------------------------- |
| `role="switch"` | Required on the `input` element. Identifies the element that serves as a switch. |

### Labels

Accessible switches should have a label. The first two approaches are equally ok:

| Approach                                                       | Usage in Switch component                                                                                                                                                                                                |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Provide a label inside the element                             | Use a `.ui-label` child for a [visible label](#visible-label), or a `.ui-sr-only` child to hide it visually while keeping it accessible. In Astro, set the `hideLabel` prop to render the slot content as `.ui-sr-only`. |
| Add an `aria-label` on the input                               | Used when there's no visible label inside the component (e.g. icon-only switches). In Astro, pass `aria-label` as a prop on the component and it will land on the input.                                                 |
| Have a visible label that you reference with `aria-labelledby` | Not used.                                                                                                                                                                                                                |

### Keyboard support

| Key     | Function                                                |
| ------- | ------------------------------------------------------- |
| `Space` | When Switch is focused it changes its state.            |
| `Enter` | (Optional) When Switch is focused it changes its state. |

## Anatomy

1. Container: `label` element
2. Switch: `& input type="checkbox" role="switch"`
3. Label (optional): & `.ui-label`
4. End text (optional): `.ui-end-text`

```html
<label class="ui-switch anatomy"
  ><input type="checkbox" role="switch" aria-describedby="end-text-1" /><span
    class="ui-label"
  >
    Label </span
  ><span id="end-text-1" class="ui-end-text">End text</span></label
>
```

## API

### Switch API

### Field group API

## Browser support

- Chromium: Full support Supported since v123.
- Firefox: Full support Supported since v121.
- Safari: Full support Supported since v17.5.

See also the [full browser support guide](https://open-props-ui.netlify.app/html/guide/browser-support.md).

## Installation

### See also

- [Form](https://open-props-ui.netlify.app/html/components/form.md)

- `opui-css/css/components/switch.css`
- `opui-css/css/components/form.css`

