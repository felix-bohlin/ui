# Select

Leverages the [List component](https://open-props-ui.netlify.app/vue/components/list.md) to provide markup for the Select popover.

## Variants

```vue
<script setup lang="ts">
import { Select } from "opui-css/vue"
</script>


<template>
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
</template>
```

## End text

`.ui-end-text`: end text element

```vue
<script setup lang="ts">
import { Select } from "opui-css/vue"
</script>


<template>
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
</template>
```

## Affix

Use the `prefix` and `suffix` slots to affix icons or short text alongside the select inside the field's border.

```vue
<script setup lang="ts">
import { Select } from "opui-css/vue"
</script>


<template>
  <Select label="Currency">
    <template #prefix>¢</template>
    <option value="">-</option>
    <option>EUR</option>
    <option>EUR</option>
    <option>SEK</option>
  </Select>


  <Select label="Country">
    <template #prefix
      ><svg
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
        ></path></svg
    ></template>
    <option value="">-</option>
    <option>Sweden</option>
    <option>Norway</option>
    <option>Denmark</option>
  </Select>
</template>
```

## Validation

- Add the `required` attribute on the component. It is forwarded to the underlying `<select>`.
- Use the `error` prop to toggle invalid styles. It renders`data-invalid` on the root element. Make use of the end text to give extra feedback on the error.

```vue
<script setup lang="ts">
import { Select } from "opui-css/vue"
</script>


<template>
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
</template>
```

## Spread

Use the `spread` boolean prop to display the label and description on the left with the select on the right. The layout collapses to a column on narrow containers.

```vue
<script setup lang="ts">
import { Select } from "opui-css/vue"
</script>


<template>
  <Select spread>
    <template #label>Country</template>
    <template #description>Select your country of residence</template>
    <option value="">Select a country</option>
    <option>Denmark</option>
    <option>Finland</option>
    <option>Iceland</option>
    <option>Norway</option>
    <option>Sweden</option>
  </Select>


  <Select spread variant="filled">
    <template #label>Language</template>
    <template #description>Choose your preferred language</template>
    <template #end-text>This affects UI translations</template>
    <option value="">Select a language</option>
    <option>Danish</option>
    <option>Finnish</option>
    <option>Icelandic</option>
    <option>Norwegian</option>
    <option>Swedish</option>
  </Select>


  <Select spread required>
    <template #label>Required</template>
    <template #description>You must select an option</template>
    <option value="">Select an option</option>
    <option>Option 1</option>
    <option>Option 2</option>
  </Select>


  <Select spread disabled>
    <template #label>Disabled</template>
    <template #description>This select is disabled</template>
    <option>Option 1</option>
  </Select>


  <Select spread error>
    <template #label>Invalid Select</template>
    <template #description>This select has an error</template>
    <template #end-text>Please select a valid option.</template>
    <option>Option 1</option>
  </Select>


  <Select spread>
    <template #label>Currency</template>
    <template #description>Used for billing</template>
    <template #prefix>¢</template>
    <option value="">-</option>
    <option>EUR</option>
    <option>EUR</option>
    <option>SEK</option>
  </Select>


  <Select spread variant="filled">
    <template #label>Region</template>
    <template #description>Affects data residency and latency</template>
    <template #prefix>
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
    </template>
    <template #end-text>Cannot be changed after deploy</template>
    <option value="">-</option>
    <option>eu-north-1</option>
    <option>us-east-1</option>
    <option>ap-southeast-1</option>
  </Select>
</template>
```

## Sizes

```vue
<script setup lang="ts">
import { Select } from "opui-css/vue"
</script>


<template>
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
</template>
```

## Classic select

Bog-standard native HTML `<select>` without customized option list.

```vue
<script setup lang="ts">
import { ClassicSelect } from "opui-css/vue"
</script>


<template>
  <ClassicSelect label="Label">
    <option value="">-</option>
    <option>Option</option>
    <option>Option</option>
  </ClassicSelect>


  <ClassicSelect label="Label" variant="filled">
    <option value="">-</option>
    <option>Option 1</option>
    <option>Option 2</option>
  </ClassicSelect>
</template>
```

## Anatomy

1. Select container: `<select>`
2. Select button: `<button>`
3. Select button selected option: `<selectedcontent>`
4. Select button arrow
5. Popover list: `.ui-list`
6. List option/s: `<option>`
7. List option group/s (optional): `<optgroup>`

## API

| Prop          | Type                     | Default      | Description                                                    |
| ------------- | ------------------------ | ------------ | -------------------------------------------------------------- |
| `dense`       | `boolean`                | `false`      | Select dense state.                                            |
| `disabled`    | `boolean`                | -            | Select disabled state.                                         |
| `description` | `string`                 | -            | Description text displayed above the select.                   |
| `endText`     | `string`                 | -            | Supporting text displayed below the select.                    |
| `error`       | `boolean`                | -            | Select error state. Sets `[data-invalid]` on the root element. |
| `items`       | `Item[]`                 | `[]`         | An array of objects with `text` and `value` properties.        |
| `label`       | `string`                 | -            | The label for the select.                                      |
| `required`    | `boolean`                | -            | Select required state.                                         |
| `size`        | `"small"`                | -            | The size of the select.                                        |
| `spread`      | `boolean`                | `false`      | Spreads the label/description and select to opposite ends.     |
| `variant`     | `"outlined" \| "filled"` | `"outlined"` | The visual variant of the select.                              |

### Slots

| Slot          | Description                                                               |
| ------------- | ------------------------------------------------------------------------- |
| `default`     | Alternative way to define options (using `<option>` elements).            |
| `label`       | Slot for the label element.                                               |
| `description` | Slot for the description (start text) element, displayed above the field. |
| `prefix`      | Content placed at the inline-start of the field, inside the border.       |
| `suffix`      | Content placed at the inline-end of the field, inside the border.         |
| `header`      | Content placed above the select, inside the border, with a divider.       |
| `footer`      | Content placed below the select, inside the border, with a divider.       |
| `end-text`    | Slot for the supporting text (end text) element.                          |

### Classic Select API

## Browser support

- Chromium: Full support Supported since v135.
- Firefox: Partial support Missing: customizable-select, overlay.
- Safari: Partial support Missing: customizable-select, overlay.

See also the [full browser support guide](https://open-props-ui.netlify.app/vue/guide/browser-support.md).

## Installation

### Dependencies

- [Text Field](https://open-props-ui.netlify.app/vue/components/text-field.md)
- [Description List](https://open-props-ui.netlify.app/vue/components/description-list.md)

- `opui-css/css/components/text-field.css`
- `opui-css/css/components/select.css`
- `opui-css/css/components/list.css`

## See also

- [Customizable select (MDN)](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Customizable_select)
