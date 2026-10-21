# Select

Leverages the [List component](https://open-props-ui.netlify.app/html/components/list.md) to provide markup for the Select popover. Use a Select to pick a value in a form. For actions, use a [Menu](https://open-props-ui.netlify.app/html/components/menu.md).

## Anatomy

Label Start text Option one (1) ¤ EUR Header Footer Supporting text

- `label.ui-select`

  Container element.

- `.ui-label`

  The label for the field.

- `.ui-start-text`

  Start text displayed above the field.

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
  <span class="ui-label" id="select-end-text-1-label">Label</span>
  <span class="ui-field">
    <select
      aria-describedby="select-end-text-1-end-text"
      aria-labelledby="select-end-text-1-label"
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
  <span class="ui-end-text" id="select-end-text-1-end-text"
    >Supporting text</span
  >
</label>

<label class="ui-select ui-filled">
  <span class="ui-label" id="select-end-text-2-label">Label</span>
  <span class="ui-field">
    <select
      aria-describedby="select-end-text-2-end-text"
      aria-labelledby="select-end-text-2-label"
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
  <span class="ui-end-text" id="select-end-text-2-end-text"
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
        aria-hidden="true"
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

<label class="ui-select">
  <span class="ui-label" id="select-affix-3-label">Delivery time</span>
  <span class="ui-field">
    <select aria-labelledby="select-affix-3-label">
      <button>
        <selectedcontent></selectedcontent>
      </button>
      <div class="ui-list">
        <option>1</option>
        <option>3</option>
        <option>5</option>
      </div>
    </select>
    <span class="ui-suffix">days</span>
  </span>
</label>
```

## Header and footer

Add a `.ui-header` or `.ui-footer` element inside `.ui-field` for short text or a link above and below the select, inside the field's border and set off by a divider.

They sit outside the list of options, so they can't filter it. Keep form controls out of them, since the select's `<label>` wraps them.

Give them an `id` and list them in the select's `aria-describedby`, so screen readers read them with the select.

```html
<label class="ui-select">
  <span class="ui-label" id="select-header-footer-1-label">Car</span>
  <span class="ui-field">
    <select
      aria-describedby="select-header-footer-1-header select-header-footer-1-footer"
      aria-labelledby="select-header-footer-1-label"
    >
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
    <span class="ui-header" id="select-header-footer-1-header"
      >Company cars only</span
    >
    <span class="ui-footer" id="select-header-footer-1-footer"
      ><a class="ui-link" href="#">Manage cars…</a></span
    >
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

- `[required]` toggles the required styles on the `<select>`.
- `aria-invalid="true"` toggles the invalid styles, and screen readers announce the `<select>` as invalid. Say what's wrong in the end text. Point `aria-describedby` at it.
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

Add the `.ui-spread` class to display the label and start text on the left with the select on the right. The layout collapses to a column on narrow containers.

```html
<label class="ui-select ui-spread">
  <span class="ui-label" id="select-spread-1-label">Country</span>
  <span class="ui-start-text" id="select-spread-1-start-text"
    >Select your country of residence</span
  >
  <span class="ui-field">
    <select
      aria-describedby="select-spread-1-start-text"
      aria-labelledby="select-spread-1-label"
    >
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
  <span class="ui-label" id="select-spread-2-label">Language</span>
  <span class="ui-start-text" id="select-spread-2-start-text"
    >Choose your preferred language</span
  >
  <span class="ui-field">
    <select
      aria-describedby="select-spread-2-start-text select-spread-2-end-text"
      aria-labelledby="select-spread-2-label"
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
  <span class="ui-end-text" id="select-spread-2-end-text"
    >This affects UI translations</span
  >
</label>

<label class="ui-select ui-spread">
  <span class="ui-label" id="select-spread-3-label">Required</span>
  <span class="ui-start-text" id="select-spread-3-start-text"
    >You must select an option</span
  >
  <span class="ui-field">
    <select
      aria-describedby="select-spread-3-start-text"
      aria-labelledby="select-spread-3-label"
      required
    >
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
  <span class="ui-label" id="select-spread-4-label">Disabled</span>
  <span class="ui-start-text" id="select-spread-4-start-text"
    >This select is disabled</span
  >
  <span class="ui-field">
    <select
      aria-describedby="select-spread-4-start-text"
      aria-labelledby="select-spread-4-label"
      disabled
    >
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
  <span class="ui-label" id="select-spread-5-label">Invalid Select</span>
  <span class="ui-start-text" id="select-spread-5-start-text"
    >This select has an error</span
  >
  <span class="ui-field">
    <select
      aria-describedby="select-spread-5-start-text select-spread-5-end-text"
      aria-invalid="true"
      aria-labelledby="select-spread-5-label"
    >
      <button>
        <selectedcontent></selectedcontent>
      </button>
      <div class="ui-list">
        <option>Option 1</option>
      </div>
    </select>
  </span>
  <span class="ui-end-text" id="select-spread-5-end-text"
    >Please select a valid option.</span
  >
</label>

<label class="ui-select ui-spread">
  <span class="ui-label" id="select-spread-6-label">Time zone</span>
  <span class="ui-start-text" id="select-spread-6-start-text"
    >Used for reminders and due dates</span
  >
  <span class="ui-field">
    <select
      aria-describedby="select-spread-6-start-text"
      aria-labelledby="select-spread-6-label"
    >
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
  <span class="ui-label" id="select-spread-7-label">Region</span>
  <span class="ui-start-text" id="select-spread-7-start-text"
    >Affects data residency and latency</span
  >
  <span class="ui-field">
    <select
      aria-describedby="select-spread-7-start-text select-spread-7-end-text"
      aria-labelledby="select-spread-7-label"
    >
      <button>
        <selectedcontent></selectedcontent>
      </button>
      <div class="ui-list">
        <option value="">-</option>
        <option>ap-southeast-1</option>
        <option>eu-north-1</option>
        <option>us-east-1</option>
      </div>
    </select>
    <span class="ui-prefix">
      <svg
        aria-hidden="true"
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
  <span class="ui-end-text" id="select-spread-7-end-text"
    >Cannot be changed after deploy</span
  >
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

Browsers without customizable select drop the `<button>` and the list wrapper from the `<select>` and keep its options. The select keeps the field styles and the chevron, and opens the browser's own picker.

## API

### Select API

| Type       | Modifiers                               | Default | Description                                                              |
| ---------- | --------------------------------------- | ------- | ------------------------------------------------------------------------ |
| Dense      | `.ui-list.ui-dense`                     | -       | Packs the items tighter.                                                 |
| Sizes      | `.ui-large`, `.ui-small`, `.ui-x-small` | -       | The size of the element.                                                 |
| Spread     | `.ui-spread`                            | -       | Pushes the label and start text to one side and the select to the other. |
| Validation | `select[aria-invalid="true"]`           | -       | Marks the control invalid and shows error styles.                        |
| Variants   | default, `.ui-filled`                   | default | The variant to use.                                                      |

#### Parts

| Part              | Description                                                  |
| ----------------- | ------------------------------------------------------------ |
| `label.ui-select` | Container element.                                           |
| `.ui-label`       | The label for the field.                                     |
| `.ui-start-text`  | Start text displayed above the field.                        |
| `.ui-field`       | The boxed select area.                                       |
| `.ui-header`      | Content above the select, inside the border, with a divider. |
| `.ui-prefix`      | Content at the inline-start of the field, inside the border. |
| `<select>`        | The select. Its options are in a popover list.               |
| `.ui-suffix`      | Content at the inline-end of the field, inside the border.   |
| `.ui-footer`      | Content below the select, inside the border, with a divider. |
| `.ui-end-text`    | Supporting text displayed below the field.                   |

#### CSS variables

| Variable                         | Default                                                                                                        | Description                                                                                                                                                                                                                                                                                                                                                                             |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--ui-border-color`              | `light-dark(var(--ui-gray-4), var(--ui-gray-12))`                                                              | Default border color for cards, lists, tables and dividers.                                                                                                                                                                                                                                                                                                                             |
| `--ui-border-width`              | `1px`                                                                                                          | Default border width for components that draw a border.                                                                                                                                                                                                                                                                                                                                 |
| `--ui-border-width-thick`        | `var(--border-size-2)`                                                                                         | Width of emphasized rules: the `Table` head and foot borders, the `AvatarGroup` ring, the `Badge` border, the neutral `Chip` dot, the dotted `DescriptionList` rule, the `Tabs` indicator, and at one and a half times, the blockquote bar.                                                                                                                                             |
| `--ui-choice-size-small`         | `calc(var(--size-3) * var(--ui-density))`                                                                      | `Checkbox` and `Radio` input size with `.ui-small` and inside `List`.                                                                                                                                                                                                                                                                                                                   |
| `--ui-control-size`              | `calc(40px * var(--ui-density))`                                                                               | Shared default height for fields and buttons so they line up.                                                                                                                                                                                                                                                                                                                           |
| `--ui-disabled-opacity`          | `0.64`                                                                                                         | Opacity applied to disabled controls.                                                                                                                                                                                                                                                                                                                                                   |
| `--ui-duration`                  | `0.2s`                                                                                                         | Default transition duration. Multiplied by `--ui-motion`.                                                                                                                                                                                                                                                                                                                               |
| `--ui-ease`                      | `ease`                                                                                                         | Default easing for transitions.                                                                                                                                                                                                                                                                                                                                                         |
| `--ui-field-border-color`        | `color-mix( in oklch, var(--ui-text-strong) 50%, var(--ui-surface-default) )`                                  | Border color of every empty control: `TextField`, `Select`, `Textarea`, the unchecked `Checkbox`, `Radio` and `Switch`, the `Range` track and the `Progress` outline. A 50% mix of the text color into the page, so it reaches 3:1. Lighter than `--ui-border-color`, which is decorative, is a choice a theme can make.                                                                |
| `--ui-field-border-width`        | `1px`                                                                                                          | Border width for fields, `Checkbox`, `Radio` and `Switch`.                                                                                                                                                                                                                                                                                                                              |
| `--ui-field-helper-color`        | `var(--ui-text-muted)`                                                                                         | Text color for helper and end text under a field.                                                                                                                                                                                                                                                                                                                                       |
| `--ui-field-helper-font-size`    | `var(--ui-font-size-caption)`                                                                                  | Font size for helper and end text under a field.                                                                                                                                                                                                                                                                                                                                        |
| `--ui-field-helper-line-height`  | `var(--ui-line-height)`                                                                                        | Line height for helper and end text under a field.                                                                                                                                                                                                                                                                                                                                      |
| `--ui-field-label-color`         | `var(--ui-text-strong)`                                                                                        | Text color for field labels.                                                                                                                                                                                                                                                                                                                                                            |
| `--ui-field-label-font-size`     | `var(--ui-font-size-small)`                                                                                    | Font size for field labels.                                                                                                                                                                                                                                                                                                                                                             |
| `--ui-field-label-font-weight`   | `var(--ui-font-weight-semibold)`                                                                               | Font weight for emphasized field labels and legends.                                                                                                                                                                                                                                                                                                                                    |
| `--ui-field-radius`              | Unset                                                                                                          | Corner radius for fields. When unset, they follow `--ui-radius`, also where it's set on a part of the page.                                                                                                                                                                                                                                                                             |
| `--ui-field-required-color`      | `var(--ui-invalid-text)`                                                                                       | Color of the required asterisk.                                                                                                                                                                                                                                                                                                                                                         |
| `--ui-field-size`                | `var(--ui-control-size)`                                                                                       | Default field height.                                                                                                                                                                                                                                                                                                                                                                   |
| `--ui-field-size-large`          | `var(--ui-control-size-large)`                                                                                 | Field height with `.ui-large`.                                                                                                                                                                                                                                                                                                                                                          |
| `--ui-field-size-small`          | `var(--ui-control-size-small)`                                                                                 | Field height with `.ui-small`.                                                                                                                                                                                                                                                                                                                                                          |
| `--ui-field-size-x-small`        | `var(--ui-control-size-x-small)`                                                                               | Field height with `.ui-x-small`.                                                                                                                                                                                                                                                                                                                                                        |
| `--ui-focus-ring-color`          | `rgb( from var(--ui-surface-default) calc(255 - r) calc(255 - g) calc(255 - b) )`                              | Color of the keyboard focus ring. By default the page background color inverted.                                                                                                                                                                                                                                                                                                        |
| `--ui-focus-ring-inset`          | `calc(-1 * var(--ui-focus-ring-width))`                                                                        | Negative offset for focus rings drawn inside a control, such as `ButtonGroup`, `List` items and `Select` options.                                                                                                                                                                                                                                                                       |
| `--ui-focus-ring-offset`         | `2px`                                                                                                          | Distance between a control and its focus ring.                                                                                                                                                                                                                                                                                                                                          |
| `--ui-focus-ring-style`          | `solid`                                                                                                        | Outline style of the focus ring.                                                                                                                                                                                                                                                                                                                                                        |
| `--ui-focus-ring-width`          | `2px`                                                                                                          | Width of the focus ring.                                                                                                                                                                                                                                                                                                                                                                |
| `--ui-font-body`                 | `var(--font-sans)`                                                                                             | Font family for body text, fields and buttons. Defaults to Open Props `--font-sans`.                                                                                                                                                                                                                                                                                                    |
| `--ui-font-code`                 | `var(--font-mono)`                                                                                             | Font family for `code`, `kbd`, `samp` and `pre` in rich text, `.ui-kbd`, `.ui-samp`, `.ui-var`, code blocks and `kbd` in buttons and lists. Defaults to Open Props `--font-mono`.                                                                                                                                                                                                       |
| `--ui-font-size-caption`         | `var(--ui-font-size-100)`                                                                                      | Font size of captions, `Badge`, `Chip`, `Divider` labels, `List` secondary text, `Menu` shortcuts, overlines, `small`, `figcaption` and x-small buttons, toggles and fields. Defaults to `--ui-font-size-100`.                                                                                                                                                                          |
| `--ui-font-size-control`         | `var(--ui-font-size-300)`                                                                                      | Font size of the default `Button`, `Select`, `Tabs`, `TextField`, `Textarea` and `ToggleButton`. Small and x-small sizes read `--ui-font-size-small` and `--ui-font-size-caption`. Defaults to `--ui-font-size-300`.                                                                                                                                                                    |
| `--ui-font-size-small`           | `var(--ui-font-size-200)`                                                                                      | Font size of helper text, `Callout`, `Table`, `Tooltip`, code blocks, dense `List` text and small buttons, chips, toggles and fields. Defaults to `--ui-font-size-200`.                                                                                                                                                                                                                 |
| `--ui-font-weight-medium`        | `var(--font-weight-5)`                                                                                         | Font weight for badges, overlines and group labels.                                                                                                                                                                                                                                                                                                                                     |
| `--ui-font-weight-normal`        | `var(--font-weight-4)`                                                                                         | Font weight for body text, `List` text and `Button` keyboard shortcuts.                                                                                                                                                                                                                                                                                                                 |
| `--ui-icon-size`                 | `var(--size-4)`                                                                                                | Default icon size inside components.                                                                                                                                                                                                                                                                                                                                                    |
| `--ui-icon-size-small`           | `var(--size-3)`                                                                                                | Icon size inside `Chip`, x-small `Avatar` and dense `List` rows, and the `Select` and autosuggest chevron.                                                                                                                                                                                                                                                                              |
| `--ui-invalid`                   | `var(--ui-critical)`                                                                                           | Color for invalid field borders, fills and outlines. Lighter in dark mode with more contrast, so invalid borders stand out from the page.                                                                                                                                                                                                                                               |
| `--ui-invalid-text`              | `light-dark( var(--ui-invalid), oklch(from var(--ui-invalid) max(l, 0.75) c h) )`                              | Color for validation messages and invalid labels. Lighter than `--ui-invalid` in dark mode so the text stays readable.                                                                                                                                                                                                                                                                  |
| `--ui-line-height`               | `1.5`                                                                                                          | Line height of interface text: labels, helpers, choice labels and field hints.                                                                                                                                                                                                                                                                                                          |
| `--ui-line-height-body`          | `1.6`                                                                                                          | Line height of body copy: prose, captions and `List` text.                                                                                                                                                                                                                                                                                                                              |
| `--ui-line-height-tight`         | `1.25`                                                                                                         | Line height of single-line controls and compact text: field inputs, `Table` cells, `Tooltip`, `Card` captions and keyboard hints in buttons.                                                                                                                                                                                                                                            |
| `--ui-motion`                    | `1`                                                                                                            | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/html/guide/theming.md#motion).                                                                                                                                                                                |
| `--ui-on-selected`               | Unset                                                                                                          | Text color on `--ui-selected`. When unset, `--ui-on-primary` on toggles, the item's own text color on list items and `--ui-primary` on a selected `Select` option.                                                                                                                                                                                                                      |
| `--ui-primary`                   | `light-dark(var(--ui-color-9), var(--ui-color-6))`                                                             | Brand color for primary actions and accents.                                                                                                                                                                                                                                                                                                                                            |
| `--ui-primary-text`              | `light-dark( oklch(from var(--ui-primary) min(l, 0.47) c h), oklch(from var(--ui-primary) max(l, 0.78) c h) )` | Primary as a text color: links, rich text links, `Callout` link hover, and `Button` and `ButtonGroup` with `.ui-primary` and no variant or `.ui-outlined`. Defaults to `--ui-primary` with its lightness clamped, at most 0.47 in light mode and at least 0.78 in dark mode, and is derived again from the more-contrast primary. Set it when the primary needs another shade for text. |
| `--ui-radius`                    | `var(--size-2)`                                                                                                | Corner radius for every component: cards, callouts, menus, buttons and fields follow it, and small parts like `kbd`, tooltips and checkboxes never get rounder than it. Set it to `0` for square corners. Takes a single length.                                                                                                                                                        |
| `--ui-selected`                  | Unset                                                                                                          | Background of a selected control: a checked `ToggleButton`, the selected `ToggleGroup` item, and a selected or current `List` item and `Select` option. When unset, `--ui-primary` on toggles and `--ui-primary` at `--ui-state-active-alpha-accent` on list items and options. Pair it with `--ui-on-selected`.                                                                        |
| `--ui-selected-strong`           | `var(--ui-primary)`                                                                                            | Mark of a selected item that has to stand out from the page on its own: the current `Carousel` marker, the bar on the start edge of a selected `List` row and the selected tab of filled `Tabs`. Defaults to `--ui-primary`. `--ui-selected` is the fill behind a selected item and may be faint.                                                                                       |
| `--ui-shadow-control`            | `none`                                                                                                         | Shadow of buttons with a variant and of fields. `none` by default, for themes that lift controls off the page.                                                                                                                                                                                                                                                                          |
| `--ui-shadow-field`              | Unset                                                                                                          | Shadow of `TextField`, `Textarea` and `Select` fields. When unset, they follow `--ui-shadow-control`. Set it to `none` to lift buttons but keep fields flat.                                                                                                                                                                                                                            |
| `--ui-shadow-overlay`            | `var(--shadow-3)`                                                                                              | Shadow of layers that float above the page: `Menu`, `Select` pickers and `Drawer`.                                                                                                                                                                                                                                                                                                      |
| `--ui-space-1`                   | `calc(var(--size-1) * var(--ui-space-scale))`                                                                  | Spacing step 1: Open Props `--size-1` times `--ui-space-scale`.                                                                                                                                                                                                                                                                                                                         |
| `--ui-space-2`                   | `calc(var(--size-2) * var(--ui-space-scale))`                                                                  | Spacing step 2: Open Props `--size-2` times `--ui-space-scale`.                                                                                                                                                                                                                                                                                                                         |
| `--ui-space-3`                   | `calc(var(--size-3) * var(--ui-space-scale))`                                                                  | Spacing step 3: Open Props `--size-3` times `--ui-space-scale`.                                                                                                                                                                                                                                                                                                                         |
| `--ui-space-4`                   | `calc(var(--size-4) * var(--ui-space-scale))`                                                                  | Spacing step 4: Open Props `--size-4` times `--ui-space-scale`.                                                                                                                                                                                                                                                                                                                         |
| `--ui-space-6`                   | `calc(var(--size-6) * var(--ui-space-scale))`                                                                  | Spacing step 6: Open Props `--size-6` times `--ui-space-scale`.                                                                                                                                                                                                                                                                                                                         |
| `--ui-space-7`                   | `calc(var(--size-7) * var(--ui-space-scale))`                                                                  | Spacing step 7: Open Props `--size-7` times `--ui-space-scale`.                                                                                                                                                                                                                                                                                                                         |
| `--ui-state-active-alpha-accent` | `25%`                                                                                                          | Alpha of the pressed state layer on primary and critical buttons.                                                                                                                                                                                                                                                                                                                       |
| `--ui-state-hover-alpha-accent`  | `15%`                                                                                                          | Alpha of the hover state layer on primary and critical buttons.                                                                                                                                                                                                                                                                                                                         |
| `--ui-surface-default`           | `light-dark(var(--ui-gray-1), var(--ui-gray-13))`                                                              | Page and card background.                                                                                                                                                                                                                                                                                                                                                               |
| `--ui-surface-elevated`          | `light-dark(var(--ui-gray-1), var(--ui-gray-12))`                                                              | Background of elevated cards and accordions, dialogs, drawers, menus and native `Select` options.                                                                                                                                                                                                                                                                                       |
| `--ui-surface-filled`            | `light-dark(var(--ui-gray-4), var(--ui-gray-15))`                                                              | Background of filled areas such as progress tracks and table stripes.                                                                                                                                                                                                                                                                                                                   |
| `--ui-surface-tonal`             | `light-dark(var(--ui-gray-3), var(--ui-gray-12))`                                                              | Background of tonal variants.                                                                                                                                                                                                                                                                                                                                                           |
| `--ui-switch-thumb-size-small`   | `calc(0.75rem * var(--ui-density))`                                                                            | Diameter of the `Switch` thumb with `.ui-small` and inside `List`.                                                                                                                                                                                                                                                                                                                      |
| `--ui-switch-track-height-small` | `calc(var(--size-4) * var(--ui-density))`                                                                      | Height of the `Switch` track with `.ui-small` and inside `List`.                                                                                                                                                                                                                                                                                                                        |
| `--ui-switch-track-width-small`  | `calc(2.5rem * var(--ui-density))`                                                                             | Width of the `Switch` track with `.ui-small` and inside `List`.                                                                                                                                                                                                                                                                                                                         |
| `--ui-text-muted`                | `light-dark(var(--ui-gray-13), var(--ui-gray-4))`                                                              | Body text color.                                                                                                                                                                                                                                                                                                                                                                        |
| `--ui-text-strong`               | `light-dark(var(--ui-gray-15), var(--ui-gray-1))`                                                              | Strongest text color, for headings, labels and values. Body text is `--ui-text-muted`.                                                                                                                                                                                                                                                                                                  |

This component uses these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md).

The `<select>` holds a `<button>` and a `.ui-list`. The button holds `<selectedcontent>`. The list holds the options. Browsers without customizable selects show a native select.

## Component properties

Set these on the component itself, inline or in your own CSS. Inputs are the knobs. Outputs are derived from the inputs and the current state, so overriding one fixes it in every state. [Customizing](https://open-props-ui.netlify.app/html/guide/customizing.md#component-properties) has examples.

### select.css

| Property      | Kind  | Description                                                                                                                                 |
| ------------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `--_bg-color` | Input | Background of the picker's `.ui-list`. Set it on the `.ui-list`; on the root it is the field background. Defaults to `--ui-surface-filled`. |

### text-field.css

| Property                     | Kind   | Description                                                                                                                                                    |
| ---------------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--_accent`                  | Input  | Border color of `.ui-field` when focused with a pointer; keyboard focus shows the focus ring instead. Defaults to `--ui-primary`, `--ui-invalid` when invalid. |
| `--_affix-color`             | Output | The current color of `.ui-prefix`, `.ui-suffix`, `.ui-header` and `.ui-footer`. Defaults to `--ui-text-muted`, set by the invalid state.                       |
| `--_arrow-inset`             | Input  | Distance of the select arrow from the inline end.                                                                                                              |
| `--_arrow-space`             | Output | Inline-end padding that keeps text clear of the select and `datalist` arrow, from `--_arrow-inset` and `--_chevron-size`.                                      |
| `--_bg-color`                | Output | The current background of `.ui-field`. Set by `.ui-filled` and its hover state.                                                                                |
| `--_border-color`            | Output | The current border color of `.ui-field`, its header and footer. Set by the invalid state.                                                                      |
| `--_chevron-icon`            | Input  | The select arrow, as an image used for a mask.                                                                                                                 |
| `--_chevron-size`            | Input  | Width and height of the select arrow.                                                                                                                          |
| `--_duration`                | Output | Duration of the transitions and focus ring animation, `--ui-duration` times `--_motion`.                                                                       |
| `--_ease`                    | Input  | Easing of the transitions. Defaults to `--ui-ease`.                                                                                                            |
| `--_field-padding-block`     | Input  | The preferred block padding of the control. Set by the size classes.                                                                                           |
| `--_field-padding-block-fit` | Output | The block padding in use, `--_field-padding-block` capped to fit `--_min-height`.                                                                              |
| `--_field-padding-inline`    | Input  | The inline padding of the control and affixes. `.ui-large` sets it.                                                                                            |
| `--_font-size`               | Input  | The font size of the control and affixes.                                                                                                                      |
| `--_helper-color`            | Output | The current color of `.ui-start-text` and `.ui-end-text`. Defaults to `--ui-field-helper-color`, set by the invalid state.                                     |
| `--_min-height`              | Input  | The minimum height of `.ui-field`. Defaults to `--ui-field-size`, set by the size classes.                                                                     |
| `--_motion`                  | Input  | Motion multiplier for the transitions. `0` turns them off.                                                                                                     |

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
   - The browser's checkmark marks the choice, the tint only backs it up
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
  background-color: var(--ui-surface-default);
  border: var(--ui-field-border-width) solid var(--ui-field-border-color);
  border-radius: var(--ui-radius);
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
  scale: 1 -1;
}
```

Step 3 of 4: Picker

- [Relative colors ](https://webstatus.dev/features/relative-color)(Newly available): Chrome 125+, Edge 125+, Firefox 128+, Safari 18+

```css
.select::picker(select) {
  background: transparent;
  border: 0;
  border-radius: var(--ui-radius);
  box-shadow: var(--ui-shadow-overlay);
  padding: 0;
}

.list {
  background-color: var(--ui-surface-filled);
  border: var(--ui-field-border-width) solid var(--ui-field-border-color);
  border-radius: var(--ui-radius);
  padding: 0.5rem 0;
}

.list > option {
  padding: 0.5rem 0.75rem;
}

.list > option:hover {
  background-color: oklch(from var(--ui-primary) l c h / 15%);
}

.list > option::checkmark {
  margin-inline-start: auto;
  order: 1;
}

.list > option:checked {
  background-color: var(
    --ui-selected,
    oklch(
      from var(--ui-primary) l c h / var(--ui-state-active-alpha-accent)
    )
  );
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
- [List](https://open-props-ui.netlify.app/html/components/list.md)

* `opui-css/css/components/text-field.css`
* `opui-css/css/components/select.css`
* `opui-css/css/components/list.css`

## See also

- [Customizable select (MDN)](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Customizable_select)

## Changelog

### What's new

- Small and x-small fields set their text in `--ui-font-size-small` and `--ui-font-size-caption`, like buttons.
- The field border reaches 3:1 against the page by default, and the picker keeps the browser's checkmark on the selected option.
- [Group labels](#option-groups) take a shade of the picker's surface and `--ui-text-muted` instead of fixed grays.
- The selected option reads [`--ui-selected`](#api) and `--ui-on-selected` when a theme sets them.
- The default size reads [`--ui-font-size-control`](#api) for its font size, like buttons.
- The chevron flips when the [picker](#variants) opens.
- [x-small and large](#sizes) sizes with `.ui-x-small` and `.ui-large`.
- [Spread](#spread) fields line up at one width.
- [Preselect](#preselected) options with `selected`.
- The [arrow](#variants) is a chevron.
- Breaking: mark an invalid select with `aria-invalid="true"` on the `<select>` instead of `data-invalid` on the root ([Validation](#validation)).
- Breaking: `--_accent-color` is `--_accent`, `--_height` is `--_min-height`, `--_label-color` is `--_affix-color` and `--_end-text-color` is `--_helper-color` ([Under the hood](#under-the-hood)).
- Corners follow `--ui-radius` through [`--ui-field-radius`](#api), so one token squares or rounds every component.
- The picker shadow is [`--ui-shadow-overlay`](#api), shared with menus and drawers.
- The field reads [`--ui-shadow-field`](#api), or `--ui-shadow-control` when a theme leaves it unset.
