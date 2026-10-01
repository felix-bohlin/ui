# Checkbox

See also: [Checkbox field group](#field-group).

## Anatomy

LabelEnd text

- `<Checkbox>`

  Container element.

- `v-model`

  The checkbox input.

- `v-slot:default`

  The label.

- `v-slot:end-text`

  Supporting text displayed below the label.

```vue
<script setup lang="ts">
import { Checkbox } from "opui-css/vue"
</script>


<template>
  <Checkbox checked name="checkbox-variants" hideLabel>Checked</Checkbox>
  <Checkbox name="checkbox-variants" hideLabel>Unchecked</Checkbox>
  <Checkbox indeterminate name="checkbox-variants" hideLabel
    >Indeterminate</Checkbox
  >
  <Checkbox disabled name="checkbox-variants" hideLabel>Disabled</Checkbox>
  <Checkbox checked disabled name="checkbox-variants" hideLabel
    >Checked and disabled</Checkbox
  >
</template>
```

## Visible label

Render the label text inside an element with a `.ui-label` class. Also, don't miss the info on label [accessibility](#accessibility).

```vue
<script setup lang="ts">
import { Checkbox } from "opui-css/vue"
</script>


<template>
  <Checkbox checked name="checkbox-visible-label">Choice A</Checkbox>
  <Checkbox disabled name="checkbox-visible-label">Disabled</Checkbox>
  <Checkbox checked disabled name="checkbox-visible-label"
    >Checked and disabled</Checkbox
  >
  <Checkbox name="checkbox-visible-label">
    Long text dolor amet mustache knausgaard +1, blue bottle waistcoat tbh
    semiotics artisan synth stumptown gastropub cornhole
    <a class="ui-link" href="#visible-label">privacy policy ipsum</a>
  </Checkbox>
</template>
```

### Label position

```vue
<script setup lang="ts">
import { Checkbox } from "opui-css/vue"
</script>


<template>
  <Checkbox name="checkbox-label-position">Default</Checkbox>
  <Checkbox stack name="checkbox-label-position">Stack</Checkbox>
</template>
```

### End text

```vue
<script setup lang="ts">
import { Checkbox } from "opui-css/vue"
</script>


<template>
  <Checkbox name="checkbox-supporting-text">
    Default
    <template #end-text>Supporting text</template>
  </Checkbox>
  <Checkbox stack name="checkbox-supporting-text">
    Stack
    <template #end-text>Supporting text</template>
  </Checkbox>
</template>
```

### Validation

- Add the `required` attribute on the component. It is forwarded to the underlying `<input>`.
- Use the `error` prop to toggle invalid styles. It renders`data-invalid` on the root element. Make use of the end text to give extra feedback on the error.

```vue
<script setup lang="ts">
import { Checkbox } from "opui-css/vue"
</script>


<template>
  <div class="example-row ui-spacious">
    <Checkbox required name="checkbox-validation">Default</Checkbox>
    <Checkbox stack required name="checkbox-validation">Stack</Checkbox>
  </div>
  <div class="example-row ui-spacious">
    <Checkbox error checked name="checkbox-validation">
      Default
      <template #end-text>Check yourself</template>
    </Checkbox>
    <Checkbox stack error name="checkbox-validation">
      Stack
      <template #end-text>Before you wreck yourself</template>
    </Checkbox>
  </div>
</template>
```

## Indeterminate

Set the `indeterminate` prop to render a partially-selected state.`indeterminate` is a JavaScript-only property on `HTMLInputElement`, so the component renders `data-indeterminate` and applies the property at runtime.

```vue
<script setup lang="ts">
import { computed, ref } from "vue"
import { Checkbox, FieldGroup, FieldLegend, FieldSet } from "opui-css/vue"


const items = ["Apples", "Bananas", "Cherries"]
const checked = ref([true, false, false])


const allChecked = computed(() => checked.value.every(Boolean))
const someChecked = computed(() => checked.value.some(Boolean))
const indeterminate = computed(() => someChecked.value && !allChecked.value)


function toggleAll() {
  const next = !allChecked.value
  checked.value = checked.value.map(() => next)
}
</script>


<template>
  <FieldSet class="indeterminate-demo">
    <FieldLegend>
      <Checkbox
        class="parent"
        :model-value="allChecked"
        :indeterminate="indeterminate"
        @update:model-value="toggleAll"
        >Select all</Checkbox
      >
    </FieldLegend>
    <FieldGroup name="indeterminate-children">
      <Checkbox
        class="child"
        v-for="(item, index) in items"
        :key="item"
        v-model="checked[index]"
        >{{ item }}</Checkbox
      >
    </FieldGroup>
  </FieldSet>
</template>
```

## Spread

Use the `spread` prop to push the label to the left and the checkbox to the right. This is useful for full-width items like lists and menus.

```vue
<script setup lang="ts">
import { Checkbox } from "opui-css/vue"
</script>


<template>
  <Checkbox name="checkbox-spread" spread>
    Accept Terms & Conditions
    <template #end-text>I have read and agree to the privacy policy.</template>
  </Checkbox>


  <Checkbox name="checkbox-spread" spread required>
    Required
    <template #end-text>You must accept this to continue.</template>
  </Checkbox>


  <Checkbox name="checkbox-spread" spread disabled>
    Disabled
    <template #end-text>This checkbox is disabled.</template>
  </Checkbox>


  <Checkbox name="checkbox-spread" spread error>
    Invalid Checkbox
    <template #end-text>There is an error with this checkbox.</template>
  </Checkbox>
</template>
```

## Sizes

```vue
<script setup lang="ts">
import { Checkbox } from "opui-css/vue"
</script>


<template>
  <div class="example-row">
    <Checkbox hideLabel size="small" checked name="checkbox-sizes"
      >Label</Checkbox
    >
    <Checkbox hideLabel checked name="checkbox-sizes">Label</Checkbox>
    <Checkbox hideLabel size="large" checked name="checkbox-sizes"
      >Label</Checkbox
    >
  </div>
  <div class="example-row">
    <Checkbox size="small" checked name="checkbox-sizes">Small</Checkbox>
    <Checkbox checked name="checkbox-sizes">Default</Checkbox>
    <Checkbox size="large" checked name="checkbox-sizes">Large</Checkbox>
  </div>
</template>
```

## Field group

Use field groups to group related checkboxes.

The `name` prop will get passed down to each checkbox in the group.

See also: [Form documentation](https://open-props-ui.netlify.app/vue/components/form.md).

```vue
<script setup lang="ts">
import { Checkbox, FieldGroup, FieldLegend, FieldSet, Form } from "opui-css/vue"
</script>


<template>
  <Form>
    <FieldSet>
      <FieldLegend>Legend</FieldLegend>
      <FieldGroup name="checkbox-group">
        <Checkbox checked>Checkbox 1</Checkbox>
        <Checkbox>Checkbox 2</Checkbox>
        <Checkbox>Checkbox 3</Checkbox>
      </FieldGroup>
    </FieldSet>
  </Form>
</template>
```

### Direction

```vue
<script setup lang="ts">
import { Checkbox, FieldGroup, FieldLegend, FieldSet, Form } from "opui-css/vue"
</script>


<template>
  <Form>
    <FieldSet>
      <FieldLegend>Legend</FieldLegend>
      <FieldGroup direction="row" name="checkbox-group-direction">
        <Checkbox checked>Checkbox 1</Checkbox>
        <Checkbox>Checkbox 2</Checkbox>
        <Checkbox>Checkbox 3</Checkbox>
      </FieldGroup>
    </FieldSet>
  </Form>
</template>
```

### Field description

Can be placed above and below the fields.

```vue
<script setup lang="ts">
import {
  Checkbox,
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
  Form,
} from "opui-css/vue"
</script>


<template>
  <Form>
    <FieldSet>
      <FieldLegend>Legend</FieldLegend>
      <FieldDescription>Field description above fields</FieldDescription>
      <FieldGroup direction="row" name="checkbox-group-field-description-1">
        <Checkbox checked>Checkbox 1</Checkbox>
        <Checkbox>Checkbox 2</Checkbox>
        <Checkbox>Checkbox 3</Checkbox>
      </FieldGroup>
    </FieldSet>


    <FieldSet>
      <FieldLegend>Legend</FieldLegend>
      <FieldGroup direction="row" name="checkbox-group-field-description-2">
        <Checkbox checked>Checkbox 1</Checkbox>
        <Checkbox>Checkbox 2</Checkbox>
        <Checkbox>Checkbox 3</Checkbox>
      </FieldGroup>
      <FieldDescription>Field description below fields</FieldDescription>
    </FieldSet>
  </Form>
</template>
```

### Disabled

Attach the `disabled` attribute to the `<fieldset>` element.

```vue
<script setup lang="ts">
import { Checkbox, FieldGroup, FieldLegend, FieldSet, Form } from "opui-css/vue"
</script>


<template>
  <Form>
    <FieldSet disabled>
      <FieldLegend>Legend</FieldLegend>
      <FieldGroup direction="row" name="checkbox-group-disabled">
        <Checkbox checked>Checkbox 1</Checkbox>
        <Checkbox>Checkbox 2</Checkbox>
        <Checkbox>Checkbox 3</Checkbox>
      </FieldGroup>
    </FieldSet>
  </Form>
</template>
```

### Required

Attach the `required` attribute to at least one of your `<input>` elements.

```vue
<script setup lang="ts">
import { Checkbox, FieldGroup, FieldLegend, FieldSet, Form } from "opui-css/vue"
</script>


<template>
  <Form>
    <FieldSet>
      <FieldLegend>These are required!</FieldLegend>
      <FieldGroup direction="row" name="checkbox-group-required">
        <Checkbox required>Checkbox 1</Checkbox>
        <Checkbox required>Checkbox 2</Checkbox>
        <Checkbox required>Checkbox 3</Checkbox>
      </FieldGroup>
    </FieldSet>
  </Form>
</template>
```

### Validation

Attach the `data-invalid` attribute to your `FieldSet` component.

```vue
<script setup lang="ts">
import { Checkbox, FieldGroup, FieldLegend, FieldSet, Form } from "opui-css/vue"
</script>


<template>
  <Form>
    <FieldSet data-invalid>
      <FieldLegend>Legend</FieldLegend>
      <FieldGroup direction="row" name="checkbox-group-validation">
        <Checkbox checked>Checkbox 1</Checkbox>
        <Checkbox>Checkbox 2</Checkbox>
        <Checkbox>Checkbox 3</Checkbox>
      </FieldGroup>
      <span class="ui-end-text">Something went wrong!</span>
    </FieldSet>
  </Form>
</template>
```

## Accessibility

### Labels

Accessible checkboxes must have a label. You can choose between three approaches:

| Approach                                                          | Usage in Checkbox component |
| ----------------------------------------------------------------- | --------------------------- |
| Provide a label text inside the `label`/`role="checkbox"` element | Default                     |
| Add a `aria-label` on the input element                           | Not used                    |
| Have a visible label that you reference with `aria-labelledby`    | Not used                    |

### Keyboard support

| Key     | Function                                       |
| ------- | ---------------------------------------------- |
| `Space` | When Checkbox is focused it changes its state. |

## API

### Checkbox API

| Prop            | Type                              | Default | Description                                                                          |
| --------------- | --------------------------------- | ------- | ------------------------------------------------------------------------------------ |
| `error`         | `boolean`                         | `false` | Shows error styles.                                                                  |
| `hideLabel`     | `boolean`                         | `false` | Visually hides the label.                                                            |
| `indeterminate` | `boolean`                         | `false` | Shows a partially checked state. Sets the `indeterminate` property on the `<input>`. |
| `size`          | `"small"`, `"large"`              | -       | The size of the element.                                                             |
| `spread`        | `boolean`                         | `false` | Pushes the label and the input to opposite ends.                                     |
| `stack`         | `boolean`                         | `false` | Stacks the label under the input.                                                    |
| `v-model`       | `boolean`, `(string`, `number)[]` | -       | The checked state, or the checked values of a group.                                 |

#### Slots

| Slot       | Description                                |
| ---------- | ------------------------------------------ |
| `default`  | The label.                                 |
| `end-text` | Supporting text displayed below the label. |

Attributes that aren't props, such as `disabled` or `name`, go to the `<input>`.

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

- `opui-css/css/components/checkbox.css`
- `opui-css/css/components/form.css`

