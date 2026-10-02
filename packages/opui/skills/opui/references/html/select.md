# Select

Leverages the [List component](https://open-props-ui.netlify.app/html/components/list.md) to provide markup for the Select popover.

### What's new

- [X-small and large](#sizes) sizes with `.ui-x-small` and `.ui-large`.

## Anatomy

LabelDescriptionOption one (1)¢EURHeaderFooterSupporting text

- `label.ui-select`

  Container element.

- `.ui-label`

  The label for the field.

- `.ui-start-text`

  Description text displayed above the field.

- `.ui-field`

  The boxed select area.

- `.ui-header`

  Content above the select, inside the border, with a divider.

- `.ui-prefix`

  Content at the inline-start of the field, inside the border.

- `<select>`

  The select. Its options are in a popover list.

- `.ui-suffix`

  Content at the inline-end of the field, inside the border.

- `.ui-footer`

  Content below the select, inside the border, with a divider.

- `.ui-end-text`

  Supporting text displayed below the field.

## Variants

```html
<label class="ui-select">
  <span class="ui-label" id="select-variants-1-label">Label</span>
  <span class="ui-field">
    <select aria-labelledby="select-variants-1-label">
      <button>
        <selectedcontent></selectedcontent>
      </button>
      <div class="ui-list">
        <option value="">-</option>
        <option>Outlined (default)</option>
        <option>Option Two</option>
        <option>Option Three</option>
      </div>
    </select>
  </span>
</label>


<label class="ui-select ui-filled">
  <span class="ui-label" id="select-variants-2-label">Label</span>
  <span class="ui-field">
    <select aria-labelledby="select-variants-2-label">
      <button>
        <selectedcontent></selectedcontent>
      </button>
      <div class="ui-list">
        <option value="">-</option>
        <option>Filled</option>
        <option>Option Two</option>
        <option>Option Three</option>
      </div>
    </select>
  </span>
</label>
```

## End text

`.ui-end-text`: end text element

```html
<label class="ui-select">
  <span class="ui-label" id="select-supporting-1-label">Label</span>
  <span class="ui-field">
    <select
      aria-describedby="select-supporting-1-end-text"
      aria-labelledby="select-supporting-1-label"
    >
      <button>
        <selectedcontent></selectedcontent>
      </button>
      <div class="ui-list">
        <option value="">-</option>
        <option>Outlined (default)</option>
        <option>Option Two</option>
        <option>Option Three</option>
      </div>
    </select>
  </span>
  <span class="ui-end-text" id="select-supporting-1-end-text"
    >Supporting text</span
  >
</label>


<label class="ui-select ui-filled">
  <span class="ui-label" id="select-supporting-2-label">Label</span>
  <span class="ui-field">
    <select
      aria-describedby="select-supporting-2-end-text"
      aria-labelledby="select-supporting-2-label"
    >
      <button>
        <selectedcontent></selectedcontent>
      </button>
      <div class="ui-list">
        <option value="">-</option>
        <option>Filled</option>
        <option>Option Two</option>
        <option>Option Three</option>
      </div>
    </select>
  </span>
  <span class="ui-end-text" id="select-supporting-2-end-text"
    >Supporting text</span
  >
</label>
```

## Affix

Add a `.ui-prefix` or `.ui-suffix` element inside`.ui-field` to affix content alongside the select.

```html
<label class="ui-select">
  <span class="ui-label" id="select-affix-1-label">Currency</span>
  <span class="ui-field">
    <select aria-labelledby="select-affix-1-label">
      <button>
        <selectedcontent></selectedcontent>
      </button>
      <div class="ui-list">
        <option value="">-</option>
        <option>EUR</option>
        <option>EUR</option>
        <option>SEK</option>
      </div>
    </select>
    <span class="ui-prefix">¢</span>
  </span>
</label>


<label class="ui-select">
  <span class="ui-label" id="select-affix-2-label">Country</span>
  <span class="ui-field">
    <select aria-labelledby="select-affix-2-label">
      <button>
        <selectedcontent></selectedcontent>
      </button>
      <div class="ui-list">
        <option value="">-</option>
        <option>Sweden</option>
        <option>Norway</option>
        <option>Denmark</option>
      </div>
    </select>
    <span class="ui-prefix">
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M2 12h20"></path>
        <path
          d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
        ></path>
      </svg>
    </span>
  </span>
</label>
```

## Validation

- Add `[required]` to the `<select>` element to toggle required styles.
- Add `data-invalid` on the root element to toggle invalid styles. Make use of the end text to give extra feedback on the error.

```html
<div class="example-row">
  <label class="ui-select">
    <span class="ui-label" id="select-validation-1-label">Label</span>
    <span class="ui-field">
      <select aria-labelledby="select-validation-1-label" required>
        <button>
          <selectedcontent></selectedcontent>
        </button>
        <div class="ui-list">
          <option value="">-</option>
          <option>Pick me!</option>
          <option>No me!!</option>
          <option>Come on!</option>
        </div>
      </select>
    </span>
  </label>


  <label class="ui-select ui-filled">
    <span class="ui-label" id="select-validation-2-label">Label</span>
    <span class="ui-field">
      <select aria-labelledby="select-validation-2-label" required>
        <button>
          <selectedcontent></selectedcontent>
        </button>
        <div class="ui-list">
          <option value="">-</option>
          <option>Pick me!</option>
          <option>No me!!</option>
          <option>Come on!</option>
        </div>
      </select>
    </span>
  </label>
</div>


<div class="example-row">
  <label class="ui-select" data-invalid>
    <span class="ui-label" id="select-validation-3-label">Label</span>
    <span class="ui-field">
      <select
        aria-describedby="select-validation-3-end-text"
        aria-invalid="true"
        aria-labelledby="select-validation-3-label"
      >
        <button>
          <selectedcontent></selectedcontent>
        </button>
        <div class="ui-list">
          <option value="">-</option>
          <option selected>Wrong option</option>
          <option>Also wrong!</option>
          <option>Nothing's right!</option>
        </div>
      </select>
    </span>
    <span class="ui-end-text" id="select-validation-3-end-text"
      >Supporting text</span
    >
  </label>


  <label class="ui-select ui-filled" data-invalid>
    <span class="ui-label" id="select-validation-4-label">Label</span>
    <span class="ui-field">
      <select
        aria-describedby="select-validation-4-end-text"
        aria-invalid="true"
        aria-labelledby="select-validation-4-label"
      >
        <button>
          <selectedcontent></selectedcontent>
        </button>
        <div class="ui-list">
          <option value="">-</option>
          <option selected>Wrong option</option>
          <option>Also wrong!</option>
          <option>Nothing's right!</option>
        </div>
      </select>
    </span>
    <span class="ui-end-text" id="select-validation-4-end-text"
      >Supporting text</span
    >
  </label>
</div>
```

## Spread

Add the `.ui-spread` class to display the label and description on the left with the select on the right. The layout collapses to a column on narrow containers.

```html
<label class="ui-select ui-spread">
  <span class="ui-label" id="select-orientation-1-label">Country</span>
  <span class="ui-start-text">Select your country of residence</span>
  <span class="ui-field">
    <select aria-labelledby="select-orientation-1-label">
      <button>
        <selectedcontent></selectedcontent>
      </button>
      <div class="ui-list">
        <option value="">Select a country</option>
        <option>Denmark</option>
        <option>Finland</option>
        <option>Iceland</option>
        <option>Norway</option>
        <option>Sweden</option>
      </div>
    </select>
  </span>
</label>


<label class="ui-select ui-spread ui-filled">
  <span class="ui-label" id="select-orientation-2-label">Language</span>
  <span class="ui-start-text">Choose your preferred language</span>
  <span class="ui-field">
    <select
      aria-describedby="select-orientation-2-end-text"
      aria-labelledby="select-orientation-2-label"
    >
      <button>
        <selectedcontent></selectedcontent>
      </button>
      <div class="ui-list">
        <option value="">Select a language</option>
        <option>Danish</option>
        <option>Finnish</option>
        <option>Icelandic</option>
        <option>Norwegian</option>
        <option>Swedish</option>
      </div>
    </select>
  </span>
  <span class="ui-end-text" id="select-orientation-2-end-text"
    >This affects UI translations</span
  >
</label>


<label class="ui-select ui-spread">
  <span class="ui-label" id="select-orientation-3-label">Required</span>
  <span class="ui-start-text">You must select an option</span>
  <span class="ui-field">
    <select aria-labelledby="select-orientation-3-label" required>
      <button>
        <selectedcontent></selectedcontent>
      </button>
      <div class="ui-list">
        <option value="">Select an option</option>
        <option>Option 1</option>
        <option>Option 2</option>
      </div>
    </select>
  </span>
</label>


<label class="ui-select ui-spread">
  <span class="ui-label" id="select-orientation-4-label">Disabled</span>
  <span class="ui-start-text">This select is disabled</span>
  <span class="ui-field">
    <select aria-labelledby="select-orientation-4-label" disabled>
      <button>
        <selectedcontent></selectedcontent>
      </button>
      <div class="ui-list">
        <option>Option 1</option>
      </div>
    </select>
  </span>
</label>


<label class="ui-select ui-spread" data-invalid>
  <span class="ui-label" id="select-orientation-5-label">Invalid Select</span>
  <span class="ui-start-text">This select has an error</span>
  <span class="ui-field">
    <select
      aria-describedby="select-orientation-5-end-text"
      aria-invalid="true"
      aria-labelledby="select-orientation-5-label"
    >
      <button>
        <selectedcontent></selectedcontent>
      </button>
      <div class="ui-list">
        <option>Option 1</option>
      </div>
    </select>
  </span>
  <span class="ui-end-text" id="select-orientation-5-end-text"
    >Please select a valid option.</span
  >
</label>


<label class="ui-select ui-spread">
  <span class="ui-label" id="select-orientation-6-label">Currency</span>
  <span class="ui-start-text">Used for billing</span>
  <span class="ui-field">
    <select aria-labelledby="select-orientation-6-label">
      <button>
        <selectedcontent></selectedcontent>
      </button>
      <div class="ui-list">
        <option value="">-</option>
        <option>EUR</option>
        <option>EUR</option>
        <option>SEK</option>
      </div>
    </select>
    <span class="ui-prefix">¢</span>
  </span>
</label>


<label class="ui-select ui-spread ui-filled">
  <span class="ui-label" id="select-orientation-7-label">Region</span>
  <span class="ui-start-text">Affects data residency and latency</span>
  <span class="ui-field">
    <select
      aria-describedby="select-orientation-7-end-text"
      aria-labelledby="select-orientation-7-label"
    >
      <button>
        <selectedcontent></selectedcontent>
      </button>
      <div class="ui-list">
        <option value="">-</option>
        <option>eu-north-1</option>
        <option>us-east-1</option>
        <option>ap-southeast-1</option>
      </div>
    </select>
    <span class="ui-prefix">
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M2 12h20"></path>
        <path
          d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
        ></path>
      </svg>
    </span>
  </span>
  <span class="ui-end-text" id="select-orientation-7-end-text"
    >Cannot be changed after deploy</span
  >
</label>
```

## Sizes

```html
<label class="ui-select ui-x-small">
  <span class="ui-label" id="select-sizes-1-label">X-small</span>
  <span class="ui-field">
    <select aria-labelledby="select-sizes-1-label">
      <button>
        <selectedcontent></selectedcontent>
      </button>
      <div class="ui-list">
        <option value="">X-small</option>
        <option>Option Two</option>
        <option>Option Three</option>
      </div>
    </select>
  </span>
</label>


<label class="ui-select ui-small">
  <span class="ui-label" id="select-sizes-2-label">Small</span>
  <span class="ui-field">
    <select aria-labelledby="select-sizes-2-label">
      <button>
        <selectedcontent></selectedcontent>
      </button>
      <div class="ui-list">
        <option value="">Small</option>
        <option>Option Two</option>
        <option>Option Three</option>
      </div>
    </select>
  </span>
</label>


<label class="ui-select">
  <span class="ui-label" id="select-sizes-3-label">Default</span>
  <span class="ui-field">
    <select aria-labelledby="select-sizes-3-label">
      <button>
        <selectedcontent></selectedcontent>
      </button>
      <div class="ui-list">
        <option value="">Default</option>
        <option>Option Two</option>
        <option>Option Three</option>
      </div>
    </select>
  </span>
</label>


<label class="ui-select ui-large">
  <span class="ui-label" id="select-sizes-4-label">Large</span>
  <span class="ui-field">
    <select aria-labelledby="select-sizes-4-label">
      <button>
        <selectedcontent></selectedcontent>
      </button>
      <div class="ui-list">
        <option value="">Large</option>
        <option>Option Two</option>
        <option>Option Three</option>
      </div>
    </select>
  </span>
</label>
```

## Classic select

Bog-standard native HTML `<select>` without customized option list.

```html
<label class="ui-select">
  <span class="ui-label" id="select-classic-1-label">Label</span>
  <span class="ui-field">
    <select aria-labelledby="select-classic-1-label" id="select-classic-1">
      <option value="">-</option>
      <option>Option 1</option>
      <option>Option 2</option>
    </select>
  </span>
</label>


<label class="ui-select ui-filled">
  <span class="ui-label" id="select-classic-2-label">Label</span>
  <span class="ui-field">
    <select aria-labelledby="select-classic-2-label" id="select-classic-2">
      <option value="">-</option>
      <option>Option 1</option>
      <option>Option 2</option>
    </select>
  </span>
</label>
```

## API

### Select API

| Type       | Modifiers                               | Default | Description                                                               |
| ---------- | --------------------------------------- | ------- | ------------------------------------------------------------------------- |
| Dense      | `.ui-list.ui-dense`                     | -       | Packs the options tighter.                                                |
| Layout     | `.ui-spread`                            | -       | Pushes the label and description to one side and the select to the other. |
| Sizes      | `.ui-large`, `.ui-small`, `.ui-x-small` | -       | The size of the element.                                                  |
| Validation | `[data-invalid]`                        | -       | Shows error styles.                                                       |
| Variants   | default, `.ui-filled`                   | default | The variant to use.                                                       |

#### Parts

| Part              | Description                                                  |
| ----------------- | ------------------------------------------------------------ |
| `label.ui-select` | Container element.                                           |
| `.ui-label`       | The label for the field.                                     |
| `.ui-start-text`  | Description text displayed above the field.                  |
| `.ui-field`       | The boxed select area.                                       |
| `.ui-header`      | Content above the select, inside the border, with a divider. |
| `.ui-prefix`      | Content at the inline-start of the field, inside the border. |
| `<select>`        | The select. Its options are in a popover list.               |
| `.ui-suffix`      | Content at the inline-end of the field, inside the border.   |
| `.ui-footer`      | Content below the select, inside the border, with a divider. |
| `.ui-end-text`    | Supporting text displayed below the field.                   |

#### CSS variables

| Variable                     | Default                                     | Description                                                                                                                |
| ---------------------------- | ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `--disabled-opacity`         | `0.64`                                      | Opacity applied to disabled controls.                                                                                      |
| `--duration`                 | `0.2s`                                      | Default transition duration. Multiplied by `--motion`.                                                                     |
| `--ease`                     | `ease`                                      | Default easing for transitions.                                                                                            |
| `--field-border-color`       | `var(--border-color)`                       | Border color for `TextField`, `Select`, `Textarea`, `Radio` and `Range`.                                                   |
| `--field-border-radius`      | `var(--size-2)`                             | Corner radius for fields.                                                                                                  |
| `--field-border-width`       | `1px`                                       | Border width for fields, `Checkbox`, `Radio` and `Switch`.                                                                 |
| `--field-helper-color`       | `var(--text-muted)`                         | Text color for helper and end text under a field.                                                                          |
| `--field-helper-font-size`   | `var(--font-size-0)`                        | Font size for helper and end text under a field.                                                                           |
| `--field-helper-line-height` | `var(--font-lineheight-3)`                  | Line height for helper and end text under a field.                                                                         |
| `--field-label-color`        | `var(--text-primary)`                       | Text color for field labels.                                                                                               |
| `--field-label-font-size`    | `var(--font-size-05)`                       | Font size for field labels.                                                                                                |
| `--field-label-font-weight`  | `var(--font-weight-semibold)`               | Font weight for emphasized field labels and legends.                                                                       |
| `--field-required-color`     | `var(--invalid-color)`                      | Color of the required asterisk.                                                                                            |
| `--field-size`               | `var(--control-size)`                       | Default field height.                                                                                                      |
| `--field-size-large`         | `var(--control-size-large)`                 | Field height with `.ui-large`.                                                                                             |
| `--field-size-small`         | `var(--control-size-small)`                 | Field height with `.ui-small`.                                                                                             |
| `--field-size-x-small`       | `var(--control-size-x-small)`               | Field height with `.ui-x-small`.                                                                                           |
| `--focus-ring-inset`         | `calc(-1 * var(--focus-ring-width))`        | Negative offset for focus rings drawn inside a control, such as `ButtonGroup`, `List` items and `Select` options.          |
| `--font-size-05`             | `0.875rem`                                  | A font size between Open Props `--font-size-0` and `--font-size-1`, used for labels and compact text.                      |
| `--font-weight-medium`       | `var(--font-weight-5)`                      | Font weight for badges, overlines and group labels.                                                                        |
| `--icon-size`                | `var(--size-4)`                             | Default icon size inside components.                                                                                       |
| `--invalid-color`            | `var(--critical)`                           | Color for invalid fields and validation messages.                                                                          |
| `--motion`                   | `1`                                         | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. |
| `--primary`                  | `var(--color-8)`                            | Brand color for primary actions and accents.                                                                               |
| `--surface-default`          | `light-dark(var(--gray-1), var(--gray-13))` | Page and card background.                                                                                                  |
| `--surface-filled`           | `light-dark(var(--gray-4), var(--gray-15))` | Background of filled areas such as progress tracks and table stripes.                                                      |
| `--surface-tonal`            | `light-dark(var(--gray-3), var(--gray-12))` | Background of tonal variants.                                                                                              |
| `--text-muted`               | `light-dark(var(--gray-13), var(--gray-4))` | Body text color.                                                                                                           |
| `--text-primary`             | `light-dark(var(--gray-15), var(--gray-1))` | Emphasized text color for headings, labels and values.                                                                     |

Theme tokens this component reads. Override them on `html`or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md)for the full list.

The `<select>` holds a `<button>` with `<selectedcontent>`, and a `.ui-list` with the options. Browsers without customizable selects show a native select.

### Classic Select API

| Type       | Modifiers                               | Default | Description              |
| ---------- | --------------------------------------- | ------- | ------------------------ |
| Sizes      | `.ui-large`, `.ui-small`, `.ui-x-small` | -       | The size of the element. |
| Validation | `[data-invalid]`                        | -       | Shows error styles.      |
| Variants   | default, `.ui-filled`                   | default | The variant to use.      |

#### Parts

| Part              | Description                                |
| ----------------- | ------------------------------------------ |
| `label.ui-select` | Container element.                         |
| `.ui-label`       | The label for the field.                   |
| `.ui-field`       | The boxed select area.                     |
| `<select>`        | A native select.                           |
| `.ui-end-text`    | Supporting text displayed below the field. |

#### CSS variables

| Variable                     | Default                                     | Description                                                                                                                |
| ---------------------------- | ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `--disabled-opacity`         | `0.64`                                      | Opacity applied to disabled controls.                                                                                      |
| `--duration`                 | `0.2s`                                      | Default transition duration. Multiplied by `--motion`.                                                                     |
| `--ease`                     | `ease`                                      | Default easing for transitions.                                                                                            |
| `--field-border-color`       | `var(--border-color)`                       | Border color for `TextField`, `Select`, `Textarea`, `Radio` and `Range`.                                                   |
| `--field-border-radius`      | `var(--size-2)`                             | Corner radius for fields.                                                                                                  |
| `--field-border-width`       | `1px`                                       | Border width for fields, `Checkbox`, `Radio` and `Switch`.                                                                 |
| `--field-helper-color`       | `var(--text-muted)`                         | Text color for helper and end text under a field.                                                                          |
| `--field-helper-font-size`   | `var(--font-size-0)`                        | Font size for helper and end text under a field.                                                                           |
| `--field-helper-line-height` | `var(--font-lineheight-3)`                  | Line height for helper and end text under a field.                                                                         |
| `--field-label-color`        | `var(--text-primary)`                       | Text color for field labels.                                                                                               |
| `--field-label-font-size`    | `var(--font-size-05)`                       | Font size for field labels.                                                                                                |
| `--field-label-font-weight`  | `var(--font-weight-semibold)`               | Font weight for emphasized field labels and legends.                                                                       |
| `--field-required-color`     | `var(--invalid-color)`                      | Color of the required asterisk.                                                                                            |
| `--field-size`               | `var(--control-size)`                       | Default field height.                                                                                                      |
| `--field-size-large`         | `var(--control-size-large)`                 | Field height with `.ui-large`.                                                                                             |
| `--field-size-small`         | `var(--control-size-small)`                 | Field height with `.ui-small`.                                                                                             |
| `--field-size-x-small`       | `var(--control-size-x-small)`               | Field height with `.ui-x-small`.                                                                                           |
| `--focus-ring-inset`         | `calc(-1 * var(--focus-ring-width))`        | Negative offset for focus rings drawn inside a control, such as `ButtonGroup`, `List` items and `Select` options.          |
| `--font-size-05`             | `0.875rem`                                  | A font size between Open Props `--font-size-0` and `--font-size-1`, used for labels and compact text.                      |
| `--font-weight-medium`       | `var(--font-weight-5)`                      | Font weight for badges, overlines and group labels.                                                                        |
| `--icon-size`                | `var(--size-4)`                             | Default icon size inside components.                                                                                       |
| `--invalid-color`            | `var(--critical)`                           | Color for invalid fields and validation messages.                                                                          |
| `--motion`                   | `1`                                         | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. |
| `--primary`                  | `var(--color-8)`                            | Brand color for primary actions and accents.                                                                               |
| `--surface-default`          | `light-dark(var(--gray-1), var(--gray-13))` | Page and card background.                                                                                                  |
| `--surface-filled`           | `light-dark(var(--gray-4), var(--gray-15))` | Background of filled areas such as progress tracks and table stripes.                                                      |
| `--surface-tonal`            | `light-dark(var(--gray-3), var(--gray-12))` | Background of tonal variants.                                                                                              |
| `--text-muted`               | `light-dark(var(--gray-13), var(--gray-4))` | Body text color.                                                                                                           |
| `--text-primary`             | `light-dark(var(--gray-15), var(--gray-1))` | Emphasized text color for headings, labels and values.                                                                     |

Theme tokens this component reads. Override them on `html`or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md)for the full list.

## Browser support

- Chromium: Full support Supported since v135.
- Firefox: Partial support Missing: customizable-select, display-animation, overlay.
- Safari: Partial support Missing: customizable-select, overlay.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/html/guide/browser-support/?components=Select.md).

## Installation

### Dependencies

- [Text Field](https://open-props-ui.netlify.app/html/components/text-field.md)
- [Description List](https://open-props-ui.netlify.app/html/components/description-list.md)

- `opui-css/css/components/text-field.css`
- `opui-css/css/components/select.css`
- `opui-css/css/components/list.css`

## See also

- [Customizable select (MDN)](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Customizable_select)
