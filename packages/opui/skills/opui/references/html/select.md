# Select

Leverages the [List component](https://open-props-ui.netlify.app/html/components/list.md) to provide markup for the Select popover. Use a Select to pick a value in a form. For actions, use a [Menu](https://open-props-ui.netlify.app/html/components/menu.md).

## Anatomy

Label Description Option one (1) ¤ EUR Header Footer Supporting text

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

The select is outlined by default. Use `.ui-filled` for a filled background.

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

## Sizes

Choose between four sizes: `.ui-x-small`, `.ui-small`, default and `.ui-large`.

```html
<label class="ui-select ui-x-small">
  <span class="ui-label" id="select-sizes-1-label">x-small</span>
  <span class="ui-field">
    <select aria-labelledby="select-sizes-1-label">
      <button>
        <selectedcontent></selectedcontent>
      </button>
      <div class="ui-list">
        <option value="">x-small</option>
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

## Dense

Add `.ui-dense` to the `.ui-list` to pack the options tighter.

```html
<label class="ui-select">
  <span class="ui-label" id="select-dense-1-label">Fruit</span>
  <span class="ui-field">
    <select aria-labelledby="select-dense-1-label">
      <button>
        <selectedcontent></selectedcontent>
      </button>
      <div class="ui-list ui-dense">
        <option value="">-</option>
        <option>Apple</option>
        <option>Banana</option>
        <option>Cherry</option>
      </div>
    </select>
  </span>
</label>
```

## End text

Use `.ui-end-text` for supporting text below the select.

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

Add a `.ui-prefix` or `.ui-suffix` element inside `.ui-field` to affix content alongside the select.

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
        <option>SEK</option>
        <option>USD</option>
      </div>
    </select>
    <span class="ui-prefix">¤</span>
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
        <option>Denmark</option>
        <option>Norway</option>
        <option>Sweden</option>
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

## Header and footer

Add a `.ui-header` or `.ui-footer` element inside `.ui-field` for short text or a link above and below the select, inside the field's border and set off by a divider.

They sit outside the list of options, so they can't filter it. Keep form controls out of them, since the select's `<label>` wraps them.

```html
<label class="ui-select">
  <span class="ui-label" id="select-header-footer-1-label">Car</span>
  <span class="ui-field">
    <select aria-labelledby="select-header-footer-1-label">
      <button>
        <selectedcontent></selectedcontent>
      </button>
      <div class="ui-list">
        <option value="">-</option>
        <option>Kia EV6</option>
        <option>Volkswagen ID.4</option>
        <option>Volvo EX30</option>
      </div>
    </select>
    <span class="ui-header">Company cars only</span>
    <span class="ui-footer"><a class="ui-link" href="#">Manage cars…</a></span>
  </span>
</label>
```

## Preselected

Add `selected` to the `option` to preselect it.

```html
<label class="ui-select">
  <span class="ui-label" id="select-preselected-1-label">Role</span>
  <span class="ui-field">
    <select aria-labelledby="select-preselected-1-label">
      <button>
        <selectedcontent></selectedcontent>
      </button>
      <div class="ui-list">
        <option value="designer">Designer</option>
        <option selected value="developer">Developer</option>
        <option value="manager">Manager</option>
      </div>
    </select>
  </span>
</label>


<label class="ui-select">
  <span class="ui-label" id="select-preselected-2-label">Team</span>
  <span class="ui-field">
    <select aria-labelledby="select-preselected-2-label">
      <button>
        <selectedcontent></selectedcontent>
      </button>
      <div class="ui-list">
        <option value="design">Design</option>
        <option selected value="engineering">Engineering</option>
        <option value="sales">Sales</option>
      </div>
    </select>
  </span>
</label>
```

## Option groups

Wrap options in a `<div role="group">` and start it with a `<label class="ui-text">` to group them under a heading.

```html
<label class="ui-select">
  <span class="ui-label" id="select-grouped-1-label">Car</span>
  <span class="ui-field">
    <select aria-labelledby="select-grouped-1-label">
      <button>
        <selectedcontent></selectedcontent>
      </button>
      <div class="ui-list">
        <option value="">Select car</option>
        <div role="group">
          <label class="ui-text">French cars</label>
          <option>Citroën</option>
          <option>Renault</option>
        </div>
        <div role="group">
          <label class="ui-text">Swedish cars</label>
          <option>Saab</option>
          <option>Volvo</option>
        </div>
      </div>
    </select>
  </span>
</label>
```

## Validation

- Add `[required]` to the `<select>` element to toggle required styles.
- Add `aria-invalid="true"` to the `<select>` to toggle invalid styles. Screen readers announce it as invalid. Make use of the end text to give extra feedback on the error, and point `aria-describedby` at it.
- Fields also get the invalid styles from the browser's own validation (`:user-invalid`), after the user has edited them. Use `aria-invalid="true"` for server-side errors.

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
  <label class="ui-select">
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


  <label class="ui-select ui-filled">
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


<label class="ui-select ui-spread">
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
  <span class="ui-label" id="select-orientation-6-label">Time zone</span>
  <span class="ui-start-text">Used for reminders and due dates</span>
  <span class="ui-field">
    <select aria-labelledby="select-orientation-6-label">
      <button>
        <selectedcontent></selectedcontent>
      </button>
      <div class="ui-list">
        <option>-03:00</option>
        <option>+00:00</option>
        <option>+01:00</option>
        <option>+05:30</option>
        <option>+09:00</option>
      </div>
    </select>
    <span class="ui-prefix">UTC</span>
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

## Classic select

Bog-standard native HTML `<select>` without customized option list. Use it when the browser's own picker is all you need, and the Select above when the options need styles, icons or groups.

```html
<label class="ui-select">
  <span class="ui-label">Label</span>
  <span class="ui-field">
    <select id="select-classic-1">
      <option value="">-</option>
      <option>Option 1</option>
      <option>Option 2</option>
    </select>
  </span>
</label>


<label class="ui-select ui-filled">
  <span class="ui-label">Label</span>
  <span class="ui-field">
    <select id="select-classic-2">
      <option value="">-</option>
      <option>Option 1</option>
      <option>Option 2</option>
    </select>
  </span>
</label>
```

## Accessibility

`appearance: base-select` only changes how the select looks. The browser keeps the behavior of a native `<select>`:

- `Space` or the arrow keys open the list. In the list, the arrow keys move between options, and `Enter` or `Space` picks one.
- Typing the start of an option's text jumps to it, also while the list is closed.
- `Esc` or a click outside closes the list without changing the value.
- Focus returns to the select when the list closes.
- Screen readers announce it like any select, with its label and the selected option, and the value is submitted with the form.

### Fallback

Browsers without customizable select drop the `<button>` and the list wrapper from the `<select>` and keep its options. The select then looks like the [Classic select](#classic-select) and opens the browser's own picker.

## API

### Select API

| Type       | Modifiers                               | Default | Description                                                               |
| ---------- | --------------------------------------- | ------- | ------------------------------------------------------------------------- |
| Dense      | `.ui-list.ui-dense`                     | -       | Packs the options tighter.                                                |
| Layout     | `.ui-spread`                            | -       | Pushes the label and description to one side and the select to the other. |
| Sizes      | `.ui-large`, `.ui-small`, `.ui-x-small` | -       | The size of the element.                                                  |
| Validation | `select[aria-invalid="true"]`           | -       | Marks the control invalid and shows error styles.                         |
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

| Variable                     | Default                                                                                 | Description                                                                                                                                                                                              |
| ---------------------------- | --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--disabled-opacity`         | `0.64`                                                                                  | Opacity applied to disabled controls.                                                                                                                                                                    |
| `--duration`                 | `0.2s`                                                                                  | Default transition duration. Multiplied by `--motion`.                                                                                                                                                   |
| `--ease`                     | `ease`                                                                                  | Default easing for transitions.                                                                                                                                                                          |
| `--field-border-color`       | `var(--border-color)`                                                                   | Border color for `TextField`, `Select`, `Textarea`, `Radio` and `Range`.                                                                                                                                 |
| `--field-border-radius`      | `var(--size-2)`                                                                         | Corner radius for fields.                                                                                                                                                                                |
| `--field-border-width`       | `1px`                                                                                   | Border width for fields, `Checkbox`, `Radio` and `Switch`.                                                                                                                                               |
| `--field-helper-color`       | `var(--text-muted)`                                                                     | Text color for helper and end text under a field.                                                                                                                                                        |
| `--field-helper-font-size`   | `var(--font-size-0)`                                                                    | Font size for helper and end text under a field.                                                                                                                                                         |
| `--field-helper-line-height` | `var(--font-lineheight-3)`                                                              | Line height for helper and end text under a field.                                                                                                                                                       |
| `--field-label-color`        | `var(--text-primary)`                                                                   | Text color for field labels.                                                                                                                                                                             |
| `--field-label-font-size`    | `var(--font-size-05)`                                                                   | Font size for field labels.                                                                                                                                                                              |
| `--field-label-font-weight`  | `var(--font-weight-semibold)`                                                           | Font weight for emphasized field labels and legends.                                                                                                                                                     |
| `--field-required-color`     | `var(--invalid-text-color)`                                                             | Color of the required asterisk.                                                                                                                                                                          |
| `--field-size`               | `var(--control-size)`                                                                   | Default field height.                                                                                                                                                                                    |
| `--field-size-large`         | `var(--control-size-large)`                                                             | Field height with `.ui-large`.                                                                                                                                                                           |
| `--field-size-small`         | `var(--control-size-small)`                                                             | Field height with `.ui-small`.                                                                                                                                                                           |
| `--field-size-x-small`       | `var(--control-size-x-small)`                                                           | Field height with `.ui-x-small`.                                                                                                                                                                         |
| `--focus-ring-inset`         | `calc(-1 * var(--focus-ring-width))`                                                    | Negative offset for focus rings drawn inside a control, such as `ButtonGroup`, `List` items and `Select` options.                                                                                        |
| `--focus-ring-width`         | `2px`                                                                                   | Width of the focus ring.                                                                                                                                                                                 |
| `--font-size-05`             | `0.875rem`                                                                              | A font size between Open Props `--font-size-0` and `--font-size-1`, used for labels and compact text.                                                                                                    |
| `--font-weight-medium`       | `var(--font-weight-5)`                                                                  | Font weight for badges, overlines and group labels.                                                                                                                                                      |
| `--icon-size`                | `var(--size-4)`                                                                         | Default icon size inside components.                                                                                                                                                                     |
| `--invalid-color`            | `var(--critical)`                                                                       | Color for invalid field borders, fills and outlines.                                                                                                                                                     |
| `--invalid-text-color`       | `light-dark( var(--invalid-color), oklch(from var(--invalid-color) max(l, 0.75) c h) )` | Color for validation messages and invalid labels. Lighter than `--invalid-color` in dark mode so the text stays readable.                                                                                |
| `--motion`                   | `1`                                                                                     | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/html/guide/theming.md#motion). |
| `--primary`                  | `light-dark(var(--color-9), var(--color-6))`                                            | Brand color for primary actions and accents.                                                                                                                                                             |
| `--surface-default`          | `light-dark(var(--gray-1), var(--gray-13))`                                             | Page and card background.                                                                                                                                                                                |
| `--surface-elevated`         | `light-dark(var(--gray-1), var(--gray-12))`                                             | Background of elevated cards and accordions.                                                                                                                                                             |
| `--surface-filled`           | `light-dark(var(--gray-4), var(--gray-15))`                                             | Background of filled areas such as progress tracks and table stripes.                                                                                                                                    |
| `--surface-tonal`            | `light-dark(var(--gray-3), var(--gray-12))`                                             | Background of tonal variants.                                                                                                                                                                            |
| `--text-muted`               | `light-dark(var(--gray-13), var(--gray-4))`                                             | Body text color.                                                                                                                                                                                         |
| `--text-primary`             | `light-dark(var(--gray-15), var(--gray-1))`                                             | Emphasized text color for headings, labels and values.                                                                                                                                                   |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md) for the full list.

The `<select>` holds a `<button>` with `<selectedcontent>`, and a `.ui-list` with the options. Browsers without customizable selects show a native select.

### Classic select API

| Type       | Modifiers                               | Default | Description                                       |
| ---------- | --------------------------------------- | ------- | ------------------------------------------------- |
| Sizes      | `.ui-large`, `.ui-small`, `.ui-x-small` | -       | The size of the element.                          |
| Validation | `select[aria-invalid="true"]`           | -       | Marks the control invalid and shows error styles. |
| Variants   | default, `.ui-filled`                   | default | The variant to use.                               |

#### Parts

| Part              | Description                                |
| ----------------- | ------------------------------------------ |
| `label.ui-select` | Container element.                         |
| `.ui-label`       | The label for the field.                   |
| `.ui-field`       | The boxed select area.                     |
| `<select>`        | A native select.                           |
| `.ui-end-text`    | Supporting text displayed below the field. |

#### CSS variables

| Variable                     | Default                                                                                 | Description                                                                                                                                                                                              |
| ---------------------------- | --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--disabled-opacity`         | `0.64`                                                                                  | Opacity applied to disabled controls.                                                                                                                                                                    |
| `--duration`                 | `0.2s`                                                                                  | Default transition duration. Multiplied by `--motion`.                                                                                                                                                   |
| `--ease`                     | `ease`                                                                                  | Default easing for transitions.                                                                                                                                                                          |
| `--field-border-color`       | `var(--border-color)`                                                                   | Border color for `TextField`, `Select`, `Textarea`, `Radio` and `Range`.                                                                                                                                 |
| `--field-border-radius`      | `var(--size-2)`                                                                         | Corner radius for fields.                                                                                                                                                                                |
| `--field-border-width`       | `1px`                                                                                   | Border width for fields, `Checkbox`, `Radio` and `Switch`.                                                                                                                                               |
| `--field-helper-color`       | `var(--text-muted)`                                                                     | Text color for helper and end text under a field.                                                                                                                                                        |
| `--field-helper-font-size`   | `var(--font-size-0)`                                                                    | Font size for helper and end text under a field.                                                                                                                                                         |
| `--field-helper-line-height` | `var(--font-lineheight-3)`                                                              | Line height for helper and end text under a field.                                                                                                                                                       |
| `--field-label-color`        | `var(--text-primary)`                                                                   | Text color for field labels.                                                                                                                                                                             |
| `--field-label-font-size`    | `var(--font-size-05)`                                                                   | Font size for field labels.                                                                                                                                                                              |
| `--field-label-font-weight`  | `var(--font-weight-semibold)`                                                           | Font weight for emphasized field labels and legends.                                                                                                                                                     |
| `--field-required-color`     | `var(--invalid-text-color)`                                                             | Color of the required asterisk.                                                                                                                                                                          |
| `--field-size`               | `var(--control-size)`                                                                   | Default field height.                                                                                                                                                                                    |
| `--field-size-large`         | `var(--control-size-large)`                                                             | Field height with `.ui-large`.                                                                                                                                                                           |
| `--field-size-small`         | `var(--control-size-small)`                                                             | Field height with `.ui-small`.                                                                                                                                                                           |
| `--field-size-x-small`       | `var(--control-size-x-small)`                                                           | Field height with `.ui-x-small`.                                                                                                                                                                         |
| `--focus-ring-inset`         | `calc(-1 * var(--focus-ring-width))`                                                    | Negative offset for focus rings drawn inside a control, such as `ButtonGroup`, `List` items and `Select` options.                                                                                        |
| `--focus-ring-width`         | `2px`                                                                                   | Width of the focus ring.                                                                                                                                                                                 |
| `--font-size-05`             | `0.875rem`                                                                              | A font size between Open Props `--font-size-0` and `--font-size-1`, used for labels and compact text.                                                                                                    |
| `--font-weight-medium`       | `var(--font-weight-5)`                                                                  | Font weight for badges, overlines and group labels.                                                                                                                                                      |
| `--icon-size`                | `var(--size-4)`                                                                         | Default icon size inside components.                                                                                                                                                                     |
| `--invalid-color`            | `var(--critical)`                                                                       | Color for invalid field borders, fills and outlines.                                                                                                                                                     |
| `--invalid-text-color`       | `light-dark( var(--invalid-color), oklch(from var(--invalid-color) max(l, 0.75) c h) )` | Color for validation messages and invalid labels. Lighter than `--invalid-color` in dark mode so the text stays readable.                                                                                |
| `--motion`                   | `1`                                                                                     | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/html/guide/theming.md#motion). |
| `--primary`                  | `light-dark(var(--color-9), var(--color-6))`                                            | Brand color for primary actions and accents.                                                                                                                                                             |
| `--surface-default`          | `light-dark(var(--gray-1), var(--gray-13))`                                             | Page and card background.                                                                                                                                                                                |
| `--surface-elevated`         | `light-dark(var(--gray-1), var(--gray-12))`                                             | Background of elevated cards and accordions.                                                                                                                                                             |
| `--surface-filled`           | `light-dark(var(--gray-4), var(--gray-15))`                                             | Background of filled areas such as progress tracks and table stripes.                                                                                                                                    |
| `--surface-tonal`            | `light-dark(var(--gray-3), var(--gray-12))`                                             | Background of tonal variants.                                                                                                                                                                            |
| `--text-muted`               | `light-dark(var(--gray-13), var(--gray-4))`                                             | Body text color.                                                                                                                                                                                         |
| `--text-primary`             | `light-dark(var(--gray-15), var(--gray-1))`                                             | Emphasized text color for headings, labels and values.                                                                                                                                                   |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md) for the full list.

## Under the hood

Read the post: [A select you can style](https://open-props-ui.netlify.app/learn/select-base-select)

1. Base select

   - `appearance: base-select` on the select and its picker opts in to the stylable version
   - Only a select with a `<button>` opts in, a plain one stays native
   - The `<button>` is the trigger, `<selectedcontent>` mirrors the chosen option
   - Browsers without support ignore the button and render a native select

2. Arrow

   - `::picker-icon` is the arrow, redrawn here as a chevron
   - `mask` cuts the chevron out of a `currentColor` box, so it follows the text color
   - `:open` matches while the picker is showing, so the arrow flips

3. Picker

   - `::picker(select)` is the dropdown, a popover anchored to the select
   - The picker is see-through and rounded like the list, so no square corners show behind it
   - Options are ordinary boxes now: padding, `:hover`, `:checked`
   - `::checkmark` hidden, the checked background marks the choice
   - Open the select

4. Animate

   - `@starting-style` gives the entry transition a starting point
   - `allow-discrete` keeps `display` and `overlay` alive during the exit
   - `:not(:open)` is the exit state

Step 1 of 4: Base select

- [Customizable \<select> ](https://webstatus.dev/features/customizable-select)(Limited availability): Chrome 135+, Edge 135+, Firefox not supported, Safari not supported

```html
<label class="field">
  <span id="fruit-label">Fruit</span>
  <select aria-labelledby="fruit-label" class="select">
    <button>
      <selectedcontent></selectedcontent>
    </button>
    <div class="list">
      <option value="apple">Apple</option>
      …
    </div>
  </select>
</label>
```

```css
.select:has(button),
.select:has(button)::picker(select) {
  appearance: base-select;
}


.select {
  background-color: var(--surface-default);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-2);
  inline-size: 100%;
  padding: 0;
}


.select > button {
  align-items: center;
  display: flex;
  padding: 0.5rem 2.5rem 0.5rem 0.75rem;
}


selectedcontent {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

Step 2 of 4: Arrow

- [Individual transform properties ](https://webstatus.dev/features/individual-transforms)(Widely available): Chrome 104+, Edge 104+, Firefox 72+, Safari 14.1+
- [Masks ](https://webstatus.dev/features/masks)(Widely available): Chrome 120+, Edge 120+, Firefox 53+, Safari 15.4+
- [`:open` ](https://webstatus.dev/features/open-pseudo)(Newly available): Chrome 133+, Edge 133+, Firefox 136+, Safari 26.5+

```css
.select {
  position: relative;
}


.select::picker-icon {
  background-color: currentColor;
  block-size: 1rem;
  content: "";
  inline-size: 1rem;
  inset-block: 50% auto;
  inset-inline: auto 0.75rem;
  mask: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='m6 9 6 6 6-6'/></svg>") center / contain no-repeat;
  position: absolute;
  translate: 0 -50%;
}


.select:open::picker-icon {
  rotate: 180deg;
}
```

Step 3 of 4: Picker

- [Relative colors ](https://webstatus.dev/features/relative-color)(Newly available): Chrome 125+, Edge 125+, Firefox 128+, Safari 18+

```css
.select::picker(select) {
  background: transparent;
  border: 0;
  border-radius: var(--radius-2);
  box-shadow: var(--shadow-2);
  padding: 0;
}


.list {
  background-color: var(--surface-filled);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-2);
  padding: 0.5rem 0;
}


.list > option {
  padding: 0.5rem 0.75rem;
}


.list > option:hover {
  background-color: oklch(from var(--primary) l c h / 15%);
}


.list > option:checked {
  background-color: oklch(from var(--primary) l c h / 30%);
}


.list > option::checkmark {
  display: none;
}
```

Step 4 of 4: Animate

- [Individual transform properties ](https://webstatus.dev/features/individual-transforms)(Widely available): Chrome 104+, Edge 104+, Firefox 72+, Safari 14.1+
- [`@starting-style` ](https://webstatus.dev/features/starting-style)(Newly available): Chrome 117+, Edge 117+, Firefox 129+, Safari 17.5+
- [`transition-behavior` ](https://webstatus.dev/features/transition-behavior)(Newly available): Chrome 117+, Edge 117+, Firefox 129+, Safari 17.4+

```css
.select::picker(select) {
  opacity: 1;
  scale: 1;
  transition:
    display 0.2s allow-discrete,
    opacity 0.2s,
    overlay 0.2s allow-discrete,
    scale 0.2s;


  @starting-style {
    opacity: 0;
    scale: 0.9;
  }
}


.select:not(:open)::picker(select) {
  opacity: 0;
  scale: 0.9;
}
```

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

## Changelog

### What's new

- [x-small and large](#sizes) sizes with `.ui-x-small` and `.ui-large`.
- [Spread](#spread) fields line up at one width.
- [Preselect](#preselected) options with `selected`.
- The arrow is a chevron, also on the [classic select](#classic-select).
- Breaking: mark an invalid select with `aria-invalid="true"` on the `<select>` instead of `data-invalid` on the root ([Validation](#validation)).
