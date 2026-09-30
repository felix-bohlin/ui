# Radio

See also: [Form documentation](https://open-props-ui.netlify.app/vue/components/form.md).

## Anatomy

LabelEnd text

- `<Radio>`

  Container element.

- `v-model`

  The radio input.

- `v-slot:default`

  The label.

- `v-slot:end-text`

  Supporting text displayed below the label.

The `name` prop will get passed down to each radio button in the group.

```vue
<script setup lang="ts">
import { FieldGroup, FieldLegend, FieldSet, Form, Radio } from "opui-css/vue"
</script>


<template>
  <Form>
    <FieldSet>
      <FieldLegend>Legend</FieldLegend>
      <FieldGroup name="radio-group">
        <Radio value="1" checked>Radio 1</Radio>
        <Radio value="2">Radio 2</Radio>
        <Radio value="3">Radio 3</Radio>
      </FieldGroup>
    </FieldSet>
  </Form>
</template>
```

## Direction

```vue
<script setup lang="ts">
import { FieldGroup, FieldLegend, FieldSet, Form, Radio } from "opui-css/vue"
</script>


<template>
  <Form>
    <FieldSet>
      <FieldLegend>Legend</FieldLegend>
      <FieldGroup direction="row" name="radio-group-direction">
        <Radio value="1" checked>Radio 1</Radio>
        <Radio value="2">Radio 2</Radio>
        <Radio value="3">Radio 3</Radio>
      </FieldGroup>
    </FieldSet>
  </Form>
</template>
```

## Field description

Can be placed above and below the fields.

```vue
<script setup lang="ts">
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
  Form,
  Radio,
} from "opui-css/vue"
</script>


<template>
  <Form>
    <FieldSet>
      <FieldLegend>Legend</FieldLegend>
      <FieldDescription>Field description above fields</FieldDescription>
      <FieldGroup direction="row" name="radio-group-field-description-1">
        <Radio value="1" checked>Radio 1</Radio>
        <Radio value="2">Radio 2</Radio>
        <Radio value="3">Radio 3</Radio>
      </FieldGroup>
    </FieldSet>


    <FieldSet>
      <FieldLegend>Legend</FieldLegend>
      <FieldGroup direction="row" name="radio-group-field-description-2">
        <Radio value="1" checked>Radio 1</Radio>
        <Radio value="2">Radio 2</Radio>
        <Radio value="3">Radio 3</Radio>
      </FieldGroup>
      <FieldDescription>Field description below fields</FieldDescription>
    </FieldSet>
  </Form>
</template>
```

## Disabled

Attach the `disabled` attribute to the `<fieldset>` element.

```vue
<script setup lang="ts">
import { FieldGroup, FieldLegend, FieldSet, Form, Radio } from "opui-css/vue"
</script>


<template>
  <Form>
    <FieldSet disabled>
      <FieldLegend>Legend</FieldLegend>
      <FieldGroup direction="row" name="radio-group-disabled">
        <Radio value="1" checked>Radio 1</Radio>
        <Radio value="2">Radio 2</Radio>
        <Radio value="3">Radio 3</Radio>
      </FieldGroup>
    </FieldSet>
  </Form>
</template>
```

## Required

Add the `required` attribute on at least one `Radio`. It is forwarded to the underlying `<input>`.

```vue
<script setup lang="ts">
import { FieldGroup, FieldLegend, FieldSet, Form, Radio } from "opui-css/vue"
</script>


<template>
  <Form>
    <FieldSet>
      <FieldLegend>These are required!</FieldLegend>
      <FieldGroup direction="row" name="radio-group-required">
        <Radio value="1" required>Radio 1</Radio>
        <Radio value="2" required>Radio 2</Radio>
        <Radio value="3" required>Radio 3</Radio>
      </FieldGroup>
    </FieldSet>
  </Form>
</template>
```

## Validation

Attach `data-invalid` to the `FieldSet` wrapper, or use the `error` prop on individual `Radio` components.

```vue
<script setup lang="ts">
import { FieldGroup, FieldLegend, FieldSet, Form, Radio } from "opui-css/vue"
</script>


<template>
  <Form>
    <FieldSet data-invalid>
      <FieldLegend>Legend</FieldLegend>
      <FieldGroup direction="row" name="radio-group-validation">
        <Radio value="1" checked>Radio 1</Radio>
        <Radio value="2">Radio 2</Radio>
        <Radio value="3">Radio 3</Radio>
      </FieldGroup>
      <span class="ui-end-text">Something went wrong!</span>
    </FieldSet>
  </Form>
</template>
```

## API

### Radio API

| Prop        | Type                          | Default | Description                       |
| ----------- | ----------------------------- | ------- | --------------------------------- |
| `error`     | `boolean`                     | `false` | Shows error styles.               |
| `hideLabel` | `boolean`                     | `false` | Visually hides the label.         |
| `size`      | `"small"`, `"large"`          | -       | The size of the element.          |
| `stack`     | `boolean`                     | `false` | Stacks the label under the input. |
| `v-model`   | `string`, `number`, `boolean` | -       | The selected value of the group.  |

#### Slots

| Slot       | Description                                |
| ---------- | ------------------------------------------ |
| `default`  | The label.                                 |
| `end-text` | Supporting text displayed below the label. |

Attributes that aren't props, such as `disabled`, `name` or `value`, go to the `<input>`.

### Field group API

| Prop        | Type                | Default | Description                                             |
| ----------- | ------------------- | ------- | ------------------------------------------------------- |
| `direction` | `"row"`, `"column"` | -       | The orientation of the element.                         |
| `name`      | `string`            | -       | Sets `name` on every input, select and textarea inside. |

#### Slots

| Slot      | Description                                         |
| --------- | --------------------------------------------------- |
| `default` | The fields, such as checkboxes, radios or switches. |

## Browser support

- Chromium: Full support Supported since v105.
- Firefox: Full support Supported since v121.
- Safari: Full support Supported since v15.4.

See also the [full browser support guide](https://open-props-ui.netlify.app/vue/guide/browser-support.md).

## Installation

### See also

- [Form](https://open-props-ui.netlify.app/vue/components/form.md)

- `opui-css/css/components/radio.css`
- `opui-css/css/components/form.css`

