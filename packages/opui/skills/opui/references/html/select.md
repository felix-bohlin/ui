# Select

Leverages the [List component](https://open-props-ui.netlify.app/html/components/list.md) to provide markup for the Select popover.

**Quick start**

Run `npm install opui-css open-props` and import the styles, or copy the CSS source further down.

```css
@import "opui-css/css/components/list.css";
@import "opui-css/css/components/select.css";
@import "opui-css/css/components/text-field.css";
```

[Getting started](https://open-props-ui.netlify.app/html/guide/getting-started.md) · [CSS source](#installation)

## Variants

```html
<label class="ui-select">
  <span class="ui-label">Label</span>
  <span class="ui-field">
    <select>
      <button>
        <selectedcontent></selectedcontent>
      </button>
      <div class="ui-list">
        <option>Outlined (default)</option>
        <option>Option Two</option>
        <option>Option Three</option>
      </div>
    </select>
  </span>
</label>


<label class="ui-select ui-filled">
  <span class="ui-label">Label</span>
  <span class="ui-field">
    <select>
      <button>
        <selectedcontent></selectedcontent>
      </button>
      <div class="ui-list">
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
  <span class="ui-label">Label</span>
  <span class="ui-field">
    <select>
      <button>
        <selectedcontent></selectedcontent>
      </button>
      <div class="ui-list">
        <option>Outlined (default)</option>
        <option>Option Two</option>
        <option>Option Three</option>
      </div>
    </select>
  </span>
  <span class="ui-end-text">Supporting text</span>
</label>


<label class="ui-select ui-filled">
  <span class="ui-label">Label</span>
  <span class="ui-field">
    <select>
      <button>
        <selectedcontent></selectedcontent>
      </button>
      <div class="ui-list">
        <option>Filled</option>
        <option>Option Two</option>
        <option>Option Three</option>
      </div>
    </select>
  </span>
  <span class="ui-end-text">Supporting text</span>
</label>
```

## Affix

Add a `.ui-prefix` or `.ui-suffix` element inside`.ui-field` to affix content alongside the select.

```html
<label class="ui-select">
  <span class="ui-label">Currency</span>
  <span class="ui-field">
    <select>
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
  <span class="ui-label">Country</span>
  <span class="ui-field">
    <select>
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
<label class="ui-select">
  <span class="ui-label">Label</span>
  <span class="ui-field">
    <select required>
      <button>
        <selectedcontent></selectedcontent>
      </button>
      <div class="ui-list">
        <option>Pick me!</option>
        <option>No me!!</option>
        <option>Come on!</option>
      </div>
    </select>
  </span>
</label>


<label class="ui-select ui-filled">
  <span class="ui-label">Label</span>
  <span class="ui-field">
    <select required>
      <button>
        <selectedcontent></selectedcontent>
      </button>
      <div class="ui-list">
        <option>Pick me!</option>
        <option>No me!!</option>
        <option>Come on!</option>
      </div>
    </select>
  </span>
</label>


<label class="ui-select" data-invalid>
  <span class="ui-label">Label</span>
  <span class="ui-field">
    <select>
      <button>
        <selectedcontent></selectedcontent>
      </button>
      <div class="ui-list">
        <option selected>Wrong option</option>
        <option>Also wrong!</option>
        <option>Nothing's right!</option>
      </div>
    </select>
  </span>
  <span class="ui-end-text">Supporting text</span>
</label>


<label class="ui-select ui-filled" data-invalid>
  <span class="ui-label">Label</span>
  <span class="ui-field">
    <select>
      <button>
        <selectedcontent></selectedcontent>
      </button>
      <div class="ui-list">
        <option selected>Wrong option</option>
        <option>Also wrong!</option>
        <option>Nothing's right!</option>
      </div>
    </select>
  </span>
  <span class="ui-end-text">Supporting text</span>
</label>
```

## Spread

Add the `.ui-spread` class to display the label and description on the left with the select on the right. The layout collapses to a column on narrow containers.

```html
<label class="ui-select ui-spread">
  <span class="ui-label">Country</span>
  <span class="ui-start-text">Select your country of residence</span>
  <span class="ui-field">
    <select>
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
  <span class="ui-label">Language</span>
  <span class="ui-start-text">Choose your preferred language</span>
  <span class="ui-field">
    <select>
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
  <span class="ui-end-text">This affects UI translations</span>
</label>


<label class="ui-select ui-spread">
  <span class="ui-label">Required</span>
  <span class="ui-start-text">You must select an option</span>
  <span class="ui-field">
    <select required>
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
  <span class="ui-label">Disabled</span>
  <span class="ui-start-text">This select is disabled</span>
  <span class="ui-field">
    <select disabled>
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
  <span class="ui-label">Invalid Select</span>
  <span class="ui-start-text">This select has an error</span>
  <span class="ui-field">
    <select>
      <button>
        <selectedcontent></selectedcontent>
      </button>
      <div class="ui-list">
        <option>Option 1</option>
      </div>
    </select>
  </span>
  <span class="ui-end-text">Please select a valid option.</span>
</label>


<label class="ui-select ui-spread">
  <span class="ui-label">Currency</span>
  <span class="ui-start-text">Used for billing</span>
  <span class="ui-field">
    <select>
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
  <span class="ui-label">Region</span>
  <span class="ui-start-text">Affects data residency and latency</span>
  <span class="ui-field">
    <select>
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
  <span class="ui-end-text">Cannot be changed after deploy</span>
</label>
```

## Sizes

```html
<label class="ui-select ui-small">
  <span class="ui-label">Small</span>
  <span class="ui-field">
    <select>
      <button>
        <selectedcontent></selectedcontent>
      </button>
      <div class="ui-list">
        <option>Small</option>
        <option>Option Two</option>
        <option>Option Three</option>
      </div>
    </select>
  </span>
</label>


<label class="ui-select">
  <span class="ui-label">Default</span>
  <span class="ui-field">
    <select>
      <button>
        <selectedcontent></selectedcontent>
      </button>
      <div class="ui-list">
        <option>Default</option>
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
  <span class="ui-label">Label</span>
  <span class="ui-field">
    <select>
      <option value="">-</option>
      <option>Option 1</option>
      <option>Option 2</option>
    </select>
  </span>
</label>


<label class="ui-select ui-filled">
  <span class="ui-label">Label</span>
  <span class="ui-field">
    <select>
      <option value="">-</option>
      <option>Option 1</option>
      <option>Option 2</option>
    </select>
  </span>
</label>
```

## Anatomy

1. Select container: `<select>`
2. Select button: `<button>`
3. Select button selected option: `<selectedcontent>`
4. Select button arrow
5. Popover list: `.ui-list`
6. List option/s: `<option>`
7. List option group/s (optional): `<optgroup>`

```html
<div class="anatomy"><div class="ui-select"><div><button class="anatomy"><selectedcontent></button><div class="ui-list"><option>Option One</option></div></div></div><div class="ui-list"><option selected>Option One</option><option>Option Two</option><option>Option Three</option></div></div>
```

## API

| Type           | Modifiers                                                         | Default | Description                                                                                                 |
| -------------- | ----------------------------------------------------------------- | ------- | ----------------------------------------------------------------------------------------------------------- |
| Children       | `.ui-label`, `.ui-start-text`, `.ui-field`, `.ui-end-text`        | -       | Direct children of the root element.                                                                        |
| Field children | `<select>`, `.ui-prefix`, `.ui-suffix`,`.ui-header`, `.ui-footer` | -       | Children of `.ui-field`. The `<select>` comes first, then optional affixes.                                 |
| Layout         | `.ui-spread`, default                                             | -       | The layout of the component. `.ui-spread` pushes label and description to the left and select to the right. |
| Sizes          | `.ui-small`                                                       | -       | The size of the element.                                                                                    |
| Variants       | default, `.ui-filled`                                             | -       | The variant to use.                                                                                         |
| Validation     | `[data-invalid]`                                                  | -       | Add the `data-invalid` attribute to the root element to show error styles.                                  |

### Classic Select API

## Browser support

- Chromium: Full support Supported since v135.
- Firefox: Partial support Missing: customizable-select, overlay.
- Safari: Partial support Missing: customizable-select, overlay.

See also the [full browser support guide](https://open-props-ui.netlify.app/html/guide/browser-support.md).

## Source

### Dependencies

- [Text Field](https://open-props-ui.netlify.app/html/components/text-field.md)
- [Description List](https://open-props-ui.netlify.app/html/components/description-list.md)

- `opui-css/css/components/text-field.css`
- `opui-css/css/components/select.css`
- `opui-css/css/components/list.css`

## See also

- [Customizable select (MDN)](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Customizable_select)
