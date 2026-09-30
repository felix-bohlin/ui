# Select

Leverages the [List component](https://open-props-ui.netlify.app/html/components/list.md) to provide markup for the Select popover.

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
    <select aria-labelledby="select-supporting-1-label">
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
    <select aria-labelledby="select-supporting-2-label">
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
      <select aria-labelledby="select-validation-3-label">
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
      <select aria-labelledby="select-validation-4-label">
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
    <select aria-labelledby="select-orientation-2-label">
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
    <select aria-labelledby="select-orientation-5-label">
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
    <select aria-labelledby="select-orientation-7-label">
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
<label class="ui-select ui-small">
  <span class="ui-label" id="select-sizes-1-label">Small</span>
  <span class="ui-field">
    <select aria-labelledby="select-sizes-1-label">
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
  <span class="ui-label" id="select-sizes-2-label">Default</span>
  <span class="ui-field">
    <select aria-labelledby="select-sizes-2-label">
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

| Type       | Modifiers             | Default | Description                                                               |
| ---------- | --------------------- | ------- | ------------------------------------------------------------------------- |
| Dense      | `.ui-list.ui-dense`   | -       | Packs the options tighter.                                                |
| Layout     | `.ui-spread`          | -       | Pushes the label and description to one side and the select to the other. |
| Sizes      | `.ui-small`           | -       | The size of the element.                                                  |
| Validation | `[data-invalid]`      | -       | Shows error styles.                                                       |
| Variants   | default, `.ui-filled` | default | The variant to use.                                                       |

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

The `<select>` holds a `<button>` with `<selectedcontent>`, and a `.ui-list` with the options. Browsers without customizable selects show a native select.

### Classic Select API

| Type       | Modifiers             | Default | Description              |
| ---------- | --------------------- | ------- | ------------------------ |
| Sizes      | `.ui-small`           | -       | The size of the element. |
| Validation | `[data-invalid]`      | -       | Shows error styles.      |
| Variants   | default, `.ui-filled` | default | The variant to use.      |

#### Parts

| Part              | Description                                |
| ----------------- | ------------------------------------------ |
| `label.ui-select` | Container element.                         |
| `.ui-label`       | The label for the field.                   |
| `.ui-field`       | The boxed select area.                     |
| `<select>`        | A native select.                           |
| `.ui-end-text`    | Supporting text displayed below the field. |

## Browser support

- Chromium: Full support Supported since v135.
- Firefox: Partial support Missing: customizable-select, overlay.
- Safari: Partial support Missing: customizable-select, overlay.

See also the [full browser support guide](https://open-props-ui.netlify.app/html/guide/browser-support.md).

## Installation

### Dependencies

- [Text Field](https://open-props-ui.netlify.app/html/components/text-field.md)
- [Description List](https://open-props-ui.netlify.app/html/components/description-list.md)

- `opui-css/css/components/text-field.css`
- `opui-css/css/components/select.css`
- `opui-css/css/components/list.css`

## See also

- [Customizable select (MDN)](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Customizable_select)
