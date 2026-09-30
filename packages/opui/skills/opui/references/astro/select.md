# Select

Leverages the [List component](https://open-props-ui.netlify.app/astro/components/list.md) to provide markup for the Select popover.

## Anatomy

LabelDescriptionOption one (1)¢EURHeaderFooterSupporting text

- `<Select>`

  Container element.

- `slot="label"`

  The label for the field.

- `slot="description"`

  Description text displayed above the field.

- `.ui-field`

  The boxed select area.

- `slot="header"`

  Content above the select, inside the border, with a divider.

- `slot="prefix"`

  Content at the inline-start of the field, inside the border.

- `<select>`

  The select. Its options are in a popover list.

- `slot="suffix"`

  Content at the inline-end of the field, inside the border.

- `slot="footer"`

  Content below the select, inside the border, with a divider.

- `slot="end-text"`

  Supporting text displayed below the field.

## Variants

```astro
---
import { Select } from "opui-css/astro"
---


<Select label="Label">
  <option value="">-</option>
  <option>Outlined (default)</option>
  <option>Option Two</option>
  <option>Option Three</option>
</Select>


<Select label="Label" variant="filled">
  <option value="">-</option>
  <option>Filled</option>
  <option>Option Two</option>
  <option>Option Three</option>
</Select>
```

## End text

`.ui-end-text`: end text element

```astro
---
import { Select } from "opui-css/astro"
---


<Select label="Label" endText="Supporting text">
  <option value="">-</option>
  <option>Outlined (default)</option>
  <option>Option Two</option>
  <option>Option Three</option>
</Select>


<Select label="Label" variant="filled" endText="Supporting text">
  <option value="">-</option>
  <option>Filled</option>
  <option>Option Two</option>
  <option>Option Three</option>
</Select>
```

## Affix

Use the `prefix` and `suffix` slots to affix icons or short text alongside the select inside the field's border.

```astro
---
import { Select } from "opui-css/astro"
---


<Select label="Currency">
  <Fragment slot="prefix">¢</Fragment>
  <option value="">-</option>
  <option>EUR</option>
  <option>EUR</option>
  <option>SEK</option>
</Select>


<Select label="Country">
  <svg
    slot="prefix"
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
  <option value="">-</option>
  <option>Sweden</option>
  <option>Norway</option>
  <option>Denmark</option>
</Select>
```

## Validation

- Set `required` on the component to toggle required styles on the select.
- Use the `error` prop to toggle invalid styles. It renders the`data-invalid` attribute on the root element. Make use of the end text to give extra feedback on the error.

```astro
---
import { Select } from "opui-css/astro"
---


<div class="example-row">
  <Select label="Label" required>
    <option value="">-</option>
    <option>Pick me!</option>
    <option>No me!!</option>
    <option>Come on!</option>
  </Select>


  <Select label="Label" variant="filled" required>
    <option value="">-</option>
    <option>Pick me!</option>
    <option>No me!!</option>
    <option>Come on!</option>
  </Select>
</div>


<div class="example-row">
  <Select label="Label" error endText="Supporting text">
    <option value="">-</option>
    <option selected>Wrong option</option>
    <option>Also wrong!</option>
    <option>Nothing's right!</option>
  </Select>


  <Select label="Label" variant="filled" error endText="Supporting text">
    <option value="">-</option>
    <option selected>Wrong option</option>
    <option>Also wrong!</option>
    <option>Nothing's right!</option>
  </Select>
</div>
```

## Spread

Use the `spread` boolean prop to display the label and description on the left with the select on the right. The layout collapses to a column on narrow containers.

```astro
---
import { Select } from "opui-css/astro"
---


<Select spread>
  <Fragment slot="label">Country</Fragment>
  <Fragment slot="description">Select your country of residence</Fragment>
  <option value="">Select a country</option>
  <option>Denmark</option>
  <option>Finland</option>
  <option>Iceland</option>
  <option>Norway</option>
  <option>Sweden</option>
</Select>


<Select spread variant="filled">
  <Fragment slot="label">Language</Fragment>
  <Fragment slot="description">Choose your preferred language</Fragment>
  <Fragment slot="end-text">This affects UI translations</Fragment>
  <option value="">Select a language</option>
  <option>Danish</option>
  <option>Finnish</option>
  <option>Icelandic</option>
  <option>Norwegian</option>
  <option>Swedish</option>
</Select>


<Select spread required>
  <Fragment slot="label">Required</Fragment>
  <Fragment slot="description">You must select an option</Fragment>
  <option value="">Select an option</option>
  <option>Option 1</option>
  <option>Option 2</option>
</Select>


<Select spread disabled>
  <Fragment slot="label">Disabled</Fragment>
  <Fragment slot="description">This select is disabled</Fragment>
  <option>Option 1</option>
</Select>


<Select spread error>
  <Fragment slot="label">Invalid Select</Fragment>
  <Fragment slot="description">This select has an error</Fragment>
  <Fragment slot="end-text">Please select a valid option.</Fragment>
  <option>Option 1</option>
</Select>


<Select spread>
  <Fragment slot="label">Currency</Fragment>
  <Fragment slot="description">Used for billing</Fragment>
  <Fragment slot="prefix">¢</Fragment>
  <option value="">-</option>
  <option>EUR</option>
  <option>EUR</option>
  <option>SEK</option>
</Select>


<Select spread variant="filled">
  <Fragment slot="label">Region</Fragment>
  <Fragment slot="description">Affects data residency and latency</Fragment>
  <Fragment slot="prefix">
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
  </Fragment>
  <Fragment slot="end-text">Cannot be changed after deploy</Fragment>
  <option value="">-</option>
  <option>eu-north-1</option>
  <option>us-east-1</option>
  <option>ap-southeast-1</option>
</Select>
```

## Sizes

```astro
---
import { Select } from "opui-css/astro"
---


<Select label="Small" size="small">
  <option value="">Small</option>
  <option>Option Two</option>
  <option>Option Three</option>
</Select>
<Select label="Default">
  <option value="">Default</option>
  <option>Option Two</option>
  <option>Option Three</option>
</Select>
```

## Classic select

Bog-standard native HTML `<select>` without customized option list.

```astro
---
import { ClassicSelect } from "opui-css/astro"
---


<ClassicSelect label="Label">
  <option value="">-</option>
  <option>Option 1</option>
  <option>Option 2</option>
</ClassicSelect>


<ClassicSelect label="Label" variant="filled">
  <option value="">-</option>
  <option>Option 1</option>
  <option>Option 2</option>
</ClassicSelect>
```

## API

### Select API

| Prop          | Type                     | Default      | Description                                                               |
| ------------- | ------------------------ | ------------ | ------------------------------------------------------------------------- |
| `dense`       | `boolean`                | `false`      | Packs the options tighter.                                                |
| `description` | `string`                 | -            | Description text displayed above the field.                               |
| `endText`     | `string`                 | -            | Supporting text displayed below the field.                                |
| `error`       | `boolean`                | `false`      | Shows error styles.                                                       |
| `id`          | `string`                 | -            | The id of the `<select>`.                                                 |
| `items`       | `Item[]`                 | `[]`         | The options, as `{ text, value }` objects.                                |
| `label`       | `string`                 | -            | The label for the field.                                                  |
| `size`        | `"small"`                | -            | The size of the element.                                                  |
| `spread`      | `boolean`                | `false`      | Pushes the label and description to one side and the select to the other. |
| `variant`     | `"outlined"`, `"filled"` | `"outlined"` | The variant to use.                                                       |

#### Slots

| Slot          | Description                                                  |
| ------------- | ------------------------------------------------------------ |
| `default`     | Extra `<option>` and `<optgroup>` elements.                  |
| `description` | Description text displayed above the field.                  |
| `end-text`    | Supporting text displayed below the field.                   |
| `footer`      | Content below the select, inside the border, with a divider. |
| `header`      | Content above the select, inside the border, with a divider. |
| `label`       | The label for the field.                                     |
| `prefix`      | Content at the inline-start of the field, inside the border. |
| `suffix`      | Content at the inline-end of the field, inside the border.   |

Other attributes, such as `disabled`, `multiple`, `name` and `required`, go to the `<select>`.

### Classic Select API

| Prop      | Type                     | Default      | Description                                       |
| --------- | ------------------------ | ------------ | ------------------------------------------------- |
| `endText` | `string`                 | -            | Supporting text displayed below the field.        |
| `error`   | `boolean`                | `false`      | Shows error styles.                               |
| `id`      | `string`                 | -            | The id of the `<select>`. Generated when omitted. |
| `items`   | `Item[]`                 | `[]`         | The options, as `{ text, value }` objects.        |
| `label`   | `string`                 | -            | The label for the field.                          |
| `size`    | `"small"`                | -            | The size of the element.                          |
| `variant` | `"outlined"`, `"filled"` | `"outlined"` | The variant to use.                               |

#### Slots

| Slot      | Description                                 |
| --------- | ------------------------------------------- |
| `default` | Extra `<option>` and `<optgroup>` elements. |

Other attributes, such as `disabled`, `multiple`, `name` and `required`, go to the `<select>`.

## Browser support

- Chromium: Full support Supported since v135.
- Firefox: Partial support Missing: customizable-select, overlay.
- Safari: Partial support Missing: customizable-select, overlay.

See also the [full browser support guide](https://open-props-ui.netlify.app/astro/guide/browser-support.md).

## Installation

### Dependencies

- [Text Field](https://open-props-ui.netlify.app/astro/components/text-field.md)
- [Description List](https://open-props-ui.netlify.app/astro/components/description-list.md)

- `opui-css/css/components/text-field.css`
- `opui-css/css/components/select.css`
- `opui-css/css/components/list.css`

## See also

- [Customizable select (MDN)](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Customizable_select)
