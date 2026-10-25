# Radio

See also: [Form documentation](https://open-props-ui.netlify.app/vue/components/form.md).

## Anatomy

Label End text

- `<Radio>`

  Container element.

- `v-model`

  The radio input.

- `label / v-slot:default`

  The label.

- `endText / v-slot:end-text`

  Supporting text displayed below the label.

## Basics

The `name` prop will get passed down to each radio button in the group.

```vue
<script setup lang="ts">
import { FieldGroup, FieldLegend, Fieldset, Form, Radio } from "opui-css/vue"
</script>

<template>
  <Form>
    <Fieldset>
      <FieldLegend>Legend</FieldLegend>
      <FieldGroup name="radio-group">
        <Radio value="1" checked>Radio 1</Radio>
        <Radio value="2">Radio 2</Radio>
        <Radio value="3">Radio 3</Radio>
      </FieldGroup>
    </Fieldset>
  </Form>
</template>
```

## Sizes

Choose between four sizes with the `size` prop: `x-small`, `small`, `medium` (the default) and `large`.

```vue
<script setup lang="ts">
import { Radio } from "opui-css/vue"
</script>

<template>
  <div class="example-row">
    <Radio
      name="radio-sizes-x-small"
      size="x-small"
      value="selected"
      checked
      hideLabel
      >Selected</Radio
    >
    <Radio
      name="radio-sizes-small"
      size="small"
      value="selected"
      checked
      hideLabel
      >Selected</Radio
    >
    <Radio name="radio-sizes-medium" value="selected" checked hideLabel
      >Selected</Radio
    >
    <Radio
      name="radio-sizes-large"
      size="large"
      value="selected"
      checked
      hideLabel
      >Selected</Radio
    >
  </div>
  <div class="example-row">
    <Radio name="radio-sizes-x-small" size="x-small" value="other"
      >X-small</Radio
    >
    <Radio name="radio-sizes-small" size="small" value="other">Small</Radio>
    <Radio name="radio-sizes-medium" value="other">Medium</Radio>
    <Radio name="radio-sizes-large" size="large" value="other">Large</Radio>
  </div>
</template>
```

## Visible label

The default slot is the label. Without a visible label, keep the text in the slot and set `hideLabel` to hide it visually.

```vue
<script setup lang="ts">
import { Radio } from "opui-css/vue"
</script>

<template>
  <Radio name="radio-visible-label" value="a" checked>Choice A</Radio>
  <Radio name="radio-visible-label" value="b" disabled>Disabled</Radio>
  <Radio name="radio-visible-label" value="c">
    Long text dolor amet mustache knausgaard +1, blue bottle waistcoat tbh
    semiotics artisan synth stumptown gastropub cornhole
    <a class="ui-link" href="#visible-label">privacy policy ipsum</a>
  </Radio>
</template>
```

### Hidden label

A radio with a hidden label centers in a table cell or a line of text, and keeps a 24px click target.

```vue
<script setup lang="ts">
import {
  Radio,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "opui-css/vue"
</script>

<template>
  <Table>
    <TableHead>
      <TableRow>
        <TableHeaderCell><span class="ui-sr-only">Pick</span></TableHeaderCell>
        <TableHeaderCell>Plan</TableHeaderCell>
        <TableHeaderCell>Price</TableHeaderCell>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <TableCell>
          <Radio hideLabel name="radio-hidden-label" value="basic"
            >Pick Basic</Radio
          >
        </TableCell>
        <TableCell>Basic</TableCell>
        <TableCell>$0</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          <Radio checked hideLabel name="radio-hidden-label" value="pro"
            >Pick Pro</Radio
          >
        </TableCell>
        <TableCell>Pro</TableCell>
        <TableCell>$12</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          <Radio hideLabel name="radio-hidden-label" value="team"
            >Pick Team</Radio
          >
        </TableCell>
        <TableCell>Team</TableCell>
        <TableCell>$48</TableCell>
      </TableRow>
    </TableBody>
  </Table>

  <p>
    Ship to
    <Radio checked hideLabel name="radio-hidden-label-shipping" value="home"
      >Home</Radio
    >
    home or
    <Radio hideLabel name="radio-hidden-label-shipping" value="office"
      >Office</Radio
    >
    the office.
  </p>
</template>
```

### Label position

Set `orientation="vertical"` to put the label under the radio.

```vue
<script setup lang="ts">
import { Radio } from "opui-css/vue"
</script>

<template>
  <Radio name="radio-label-position" value="default" checked>Default</Radio>
  <Radio name="radio-label-position" value="stack" orientation="vertical"
    >Stack</Radio
  >
</template>
```

### End text

Use the `endText` prop for supporting text under a single radio's label, or the `end-text` slot for rich content. It sits inside the `<label>`, so screen readers read it with the label.

```vue
<script setup lang="ts">
import { Radio } from "opui-css/vue"
</script>

<template>
  <Radio
    name="radio-end-text"
    value="default"
    checked
    endText="Supporting text"
  >
    Default
  </Radio>
  <Radio
    name="radio-end-text"
    value="stack"
    orientation="vertical"
    endText="Supporting text"
  >
    Stack
  </Radio>
</template>
```

## Spread

Use the `spread` prop to push the label to the left and the radio to the right. Handy for settings lists, and for [cards](#cards).

```vue
<script setup lang="ts">
import { FieldGroup, FieldLegend, Fieldset, Form, Radio } from "opui-css/vue"
</script>

<template>
  <Form>
    <Fieldset>
      <FieldLegend>Delivery</FieldLegend>
      <FieldGroup name="radio-spread">
        <Radio value="standard" checked spread>
          Standard
          <template #end-text>Arrives in 3 to 5 days.</template>
        </Radio>
        <Radio value="express" spread>
          Express
          <template #end-text>Arrives tomorrow.</template>
        </Radio>
        <Radio value="pickup" spread disabled>
          Pickup
          <template #end-text>Not available in your area.</template>
        </Radio>
      </FieldGroup>
    </Fieldset>
  </Form>
</template>
```

## Cards

`card` renders the radio as a card that tints when hovered and when checked. Combine it with `spread` for the radio at the end, and `variant="tonal"` or `variant="elevated"` for the surface, like a [Card](https://open-props-ui.netlify.app/vue/components/card.md). In a horizontal `FieldGroup` the cards share the row.

```vue
<script setup lang="ts">
import { Radio, FieldGroup, FieldLegend, Fieldset, Form } from "opui-css/vue"
</script>

<template>
  <Form>
    <Fieldset>
      <FieldLegend>Input at the end</FieldLegend>
      <FieldGroup name="radio-cards-end" orientation="horizontal">
        <Radio value="outlined" checked card spread>
          Outlined
          <template #end-text>The default surface.</template>
        </Radio>
        <Radio value="tonal" card variant="tonal" spread>
          Tonal
          <template #end-text>A tinted surface.</template>
        </Radio>
        <Radio value="elevated" card variant="elevated" spread>
          Elevated
          <template #end-text>A raised surface.</template>
        </Radio>
      </FieldGroup>
    </Fieldset>
    <Fieldset>
      <FieldLegend>Input at the start</FieldLegend>
      <FieldGroup name="radio-cards-start" orientation="horizontal">
        <Radio value="outlined" checked card>
          Outlined
          <template #end-text>The default surface.</template>
        </Radio>
        <Radio value="tonal" card variant="tonal">
          Tonal
          <template #end-text>A tinted surface.</template>
        </Radio>
        <Radio value="elevated" card variant="elevated">
          Elevated
          <template #end-text>A raised surface.</template>
        </Radio>
      </FieldGroup>
    </Fieldset>
  </Form>
</template>
```

## Label alignment

The radio lines up with the first line of its label and centers on the label's capital letters, so it looks centered in any font and at any size. If a font still looks off, nudge the label with `--ui-choice-label-offset`, in `em` or `cap` so it scales with the label.

```css
:root {
  --ui-choice-label-offset: 0.05em;
}
```

## Radio input

Use `RadioInput` without the label for a custom layout, such as the end of a list item. See [List](https://open-props-ui.netlify.app/vue/components/list.md#radio).

## Field group

Use field groups to group related radios.

The `name` prop will get passed down to each radio in the group.

See also: [Form documentation](https://open-props-ui.netlify.app/vue/components/form.md).

### Orientation

Radios stack vertically by default. Set `orientation="horizontal"` on the `FieldGroup` to put them in a row.

```vue
<script setup lang="ts">
import { FieldGroup, FieldLegend, Fieldset, Form, Radio } from "opui-css/vue"
</script>

<template>
  <Form>
    <Fieldset>
      <FieldLegend>Legend</FieldLegend>
      <FieldGroup name="radio-group-orientation" orientation="horizontal">
        <Radio value="1" checked>Radio 1</Radio>
        <Radio value="2">Radio 2</Radio>
        <Radio value="3">Radio 3</Radio>
      </FieldGroup>
    </Fieldset>
  </Form>
</template>
```

### Field description

Can be placed above and below the fields.

```vue
<script setup lang="ts">
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  Fieldset,
  Form,
  Radio,
} from "opui-css/vue"
</script>

<template>
  <Form>
    <Fieldset>
      <FieldLegend>Legend</FieldLegend>
      <FieldDescription>Field description above fields</FieldDescription>
      <FieldGroup
        orientation="horizontal"
        name="radio-group-field-description-1"
      >
        <Radio value="1" checked>Radio 1</Radio>
        <Radio value="2">Radio 2</Radio>
        <Radio value="3">Radio 3</Radio>
      </FieldGroup>
    </Fieldset>

    <Fieldset>
      <FieldLegend>Legend</FieldLegend>
      <FieldGroup
        orientation="horizontal"
        name="radio-group-field-description-2"
      >
        <Radio value="1" checked>Radio 1</Radio>
        <Radio value="2">Radio 2</Radio>
        <Radio value="3">Radio 3</Radio>
      </FieldGroup>
      <FieldDescription>Field description below fields</FieldDescription>
    </Fieldset>
  </Form>
</template>
```

### Disabled

Set `disabled` on the `Fieldset` to disable every radio in it, or on a single `Radio`.

`aria-disabled="true"` on the `<input>` looks the same, but keeps the radio focusable and its value in the form. It doesn't stop the change, so block it with a script.

```vue
<script setup lang="ts">
import { FieldGroup, FieldLegend, Fieldset, Form, Radio } from "opui-css/vue"
</script>

<template>
  <Form>
    <Fieldset disabled>
      <FieldLegend>Legend</FieldLegend>
      <FieldGroup orientation="horizontal" name="radio-group-disabled">
        <Radio value="1" checked>Radio 1</Radio>
        <Radio value="2">Radio 2</Radio>
        <Radio value="3">Radio 3</Radio>
      </FieldGroup>
    </Fieldset>
    <Fieldset>
      <FieldLegend>One by one</FieldLegend>
      <FieldGroup orientation="horizontal" name="radio-group-disabled-single">
        <Radio value="1" checked>Enabled</Radio>
        <Radio value="2" disabled>Disabled</Radio>
        <Radio value="3" aria-disabled="true">Aria-disabled</Radio>
      </FieldGroup>
    </Fieldset>
  </Form>
</template>
```

### Required

Set the `required` prop on at least one `Radio`. It is forwarded to the underlying `<input>`.

```vue
<script setup lang="ts">
import { FieldGroup, FieldLegend, Fieldset, Form, Radio } from "opui-css/vue"
</script>

<template>
  <Form>
    <Fieldset>
      <FieldLegend>These are required!</FieldLegend>
      <FieldGroup orientation="horizontal" name="radio-group-required">
        <Radio value="1" required>Radio 1</Radio>
        <Radio value="2" required>Radio 2</Radio>
        <Radio value="3" required>Radio 3</Radio>
      </FieldGroup>
    </Fieldset>
  </Form>
</template>
```

### Validation

Set `error` on each `Radio` in the group. The end text of the `Fieldset` turns red with them.

Give the end text an `id` and point `aria-describedby` on the fieldset at it, so screen readers read the error with the group.

```vue
<script setup lang="ts">
import { FieldGroup, FieldLegend, Fieldset, Form, Radio } from "opui-css/vue"
</script>

<template>
  <Form>
    <Fieldset aria-describedby="radio-field-group-validation-1-error">
      <FieldLegend>Legend</FieldLegend>
      <FieldGroup orientation="horizontal" name="radio-group-validation">
        <Radio checked error value="1">Radio 1</Radio>
        <Radio error value="2">Radio 2</Radio>
        <Radio error value="3">Radio 3</Radio>
      </FieldGroup>
      <span class="ui-end-text" id="radio-field-group-validation-1-error"
        >Radio 1 is sold out, pick another.</span
      >
    </Fieldset>
  </Form>
</template>
```

### Binding

Bind the selected value with `v-model` on each `Radio`. It holds the `value` of the checked radio, and setting it updates the radios.

```vue
<script setup lang="ts">
import { ref } from "vue"
import { Button, FieldGroup, FieldLegend, Fieldset, Radio } from "opui-css/vue"

const plan = ref("free")

function reset() {
  plan.value = "free"
}
</script>

<template>
  <Fieldset>
    <FieldLegend>Plan</FieldLegend>
    <FieldGroup name="radio-binding">
      <Radio v-model="plan" value="free">Free</Radio>
      <Radio v-model="plan" value="pro">Pro</Radio>
      <Radio v-model="plan" value="team">Team</Radio>
    </FieldGroup>
  </Fieldset>
  <p class="radio-binding-text">Selected: {{ plan }}</p>
  <Button class="radio-binding-reset" @click="reset">Reset</Button>
</template>
```

Without `v-model`, a radio follows `checked`. Keep the selected value in your own state, and pass each `Radio` a `:checked` and a `@change` that stores its `value`. Setting the state updates the radios.

```vue
<script setup lang="ts">
import { ref } from "vue"
import { Button, FieldGroup, FieldLegend, Fieldset, Radio } from "opui-css/vue"

const shipping = ref("standard")
</script>

<template>
  <Fieldset>
    <FieldLegend>Shipping</FieldLegend>
    <FieldGroup name="radio-controlled">
      <Radio
        :checked="shipping === 'standard'"
        value="standard"
        @change="shipping = 'standard'"
      >
        Standard
      </Radio>
      <Radio
        :checked="shipping === 'express'"
        value="express"
        @change="shipping = 'express'"
      >
        Express
      </Radio>
      <Radio
        :checked="shipping === 'pickup'"
        value="pickup"
        @change="shipping = 'pickup'"
      >
        Pickup
      </Radio>
    </FieldGroup>
  </Fieldset>
  <p class="radio-controlled-text">Selected: {{ shipping }}</p>
  <Button class="radio-controlled-reset" @click="shipping = 'standard'">
    Reset
  </Button>
</template>
```

## Accessibility

### Keyboard support

| Key | Function |
| --- | --- |
| `Tab` | Moves focus into the group, to the checked radio. When none is checked, focus goes to the first radio. |
| Arrow keys | Move focus to the next or previous radio and select it. |
| `Space` | Selects the focused radio. |

## API

### Radio API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `card` | `boolean` | `false` | Renders the radio as a card: a padded, outlined surface that tints when hovered and when checked, with the label and `endText` inside. Add `spread` to put the input at the end, and `variant` to change the surface. |
| `disabled` | `boolean` | `false` | Dims the radio and shows a not-allowed cursor. `aria-disabled="true"` looks the same, but keeps the radio focusable and its value in the form, and doesn't stop the change, so block it with a script. |
| `endText` | `string` | - | Supporting text displayed below the label. |
| `error` | `boolean` | `false` | Marks the control invalid and shows error styles. |
| `hideLabel` | `boolean` | `false` | Visually hides the label, `.ui-sr-only` instead of `.ui-label`. |
| `id` | `string` | - | The id of the `<input>`. |
| `label` | `string` | - | The label. |
| `name` | `string` | - | The name of the `<input>`. Inside a `FieldGroup`, the group's `name` applies. |
| `orientation` | `"horizontal"` , `"vertical"` | `"horizontal"` | The orientation of the element. `vertical` stacks the label under the input. |
| `required` | `boolean` | - | Adds a required mark after the label. The form won't submit until one radio in the group is checked. |
| `size` | `"large"` , `"medium"` , `"small"` , `"x-small"` | `"medium"` | The size of the element. |
| `spread` | `boolean` | `false` | Pushes the label and the input to opposite ends. |
| `v-model` **Needs hydration** The bound value only updates on the client. The native control still changes and submits with its form. Read the value from the form instead. | `string` , `number` , `boolean` | - | The selected value of the group. |
| `value` | `string` | - | The value of the `<input>`, submitted with the form when it's checked. |
| `variant` | `"elevated"` , `"outlined"` , `"tonal"` | `"outlined"` | The surface of the card, with `card`. `outlined` has a border, `tonal` a tinted surface and `elevated` a shadow, like Card. |

#### Slots

| Slot | Description |
| --- | --- |
| `default` | The label. |
| `end-text` | Supporting text displayed below the label. |

Attributes that aren't props go to the `<input>`, like `autofocus` and `form`, and `class` and `style` go to the root `<label>`. To hide the label, set `hideLabel` and keep the text in `label` or the slot.

### Radio input API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `v-model` **Needs hydration** The bound value only updates on the client. The native control still changes and submits with its form. Read the value from the form instead. | `string` , `number` , `boolean` | - | The selected value of the group. |

The radio `<input>` without the label, for a custom layout inside a `label.ui-radio`, such as the end of a `ListItem` with `type="radio"`. Attributes that aren't props go to the `<input>`. Inside a `FieldGroup`, it takes the group's `name`.

### Field group API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `name` | `string` | - | Sets `name` on the OPUI fields inside that don't set their own. |
| `orientation` | `"auto"` , `"horizontal"` , `"vertical"` | `"auto"` | The orientation of the fields. With `auto`, fields stack and a group with only buttons lines up in a row. |

#### Slots

| Slot | Description |
| --- | --- |
| `default` | The fields, such as checkboxes, radios or switches. |

### CSS variables

| Variable | Default | Description |
| --- | --- | --- |
| `--ui-border-color` | `light-dark( color-mix( in oklch, var(--ui-text-strong) var(--ui-border-strength-light), var(--ui-surface) ), color-mix( in oklch, var(--ui-text-strong) var(--ui-border-strength-dark), var(--ui-surface) ) )` | Default border color for cards, lists, tables and dividers. `--ui-text-strong` mixed into `--ui-surface` at `--ui-border-strength-light` or `--ui-border-strength-dark`. |
| `--ui-border-color-on-raised` | `light-dark( color-mix( in oklch, var(--ui-text-strong) var(--ui-border-strength-light), var(--ui-surface) ), color-mix( in oklch, var(--ui-text-strong) var(--ui-border-strength-dark), var(--ui-surface) ) )` | Border color inside raised surfaces: tonal and elevated `Card` and `Accordion`, `Dialog`, `Drawer`, `Menu` and `Callout` without a severity. The same mix as `--ui-border-color` by default. Each raised component sets `--ui-border-color` to it on its root, so a theme that wants another border on raised surfaces, such as the page background in dark mode, sets this one. |
| `--ui-border-color-raised` | Unset | Border color of tonal and elevated `Card` and `Accordion` and of `Callout` without a severity. When unset, cards and accordions use the page background color, so they stay visible on tonal surfaces, and callouts their tonal background. |
| `--ui-border-width` | `1px` | Default border width for components that draw a border. |
| `--ui-card-padding` | Unset | Padding of `Card`, `Dialog` and `Accordion` content, headers and actions. When unset, `--ui-space-3`. |
| `--ui-choice-accent` | Unset | Fill of a checked `Checkbox`, `Radio` and `Switch`, and the thumb and fill of `Range`. When unset, `--ui-control-accent`, else `--ui-primary`, with its lightness capped in dark mode for the choice controls. Set it, or `--ui-control-accent`, to `--ui-primary` for the plain primary, like Material and shadcn. |
| `--ui-choice-border-color` | Unset | Border of the unchecked `Checkbox`, `Radio` and `Switch` track. When unset, `--ui-field-border-color`. Set it for themes whose field border is fainter than 3:1, like shadcn, which outlines its choices with `--ui-primary` like shadcn/ui does. |
| `--ui-choice-fill-max-lightness` | `0.62` | The highest OKLCH lightness of a checked `Checkbox`, `Radio` and `Switch` fill in dark mode, so the light mark keeps 3:1. `0.62`. |
| `--ui-choice-label-offset` | `0px` | Moves `Checkbox`, `Radio` and `Switch` labels down (positive) or up (negative) against their control. Use `em` or `cap` to scale with the label font. |
| `--ui-choice-on-accent` | Unset | Color of the mark on a checked `Checkbox`, `Radio` and `Switch`. Set it with `--ui-choice-accent`. When unset, `--ui-on-control-accent`, else `--ui-on-primary` in light mode and near-white in dark mode. |
| `--ui-choice-ripple-bg-color` | `oklch(from var(--ui-text) l c h / 20%)` | Halo color for the `Checkbox` and `Radio` hover effect. `--ui-text` at 20%. |
| `--ui-choice-size` | `calc(1.25rem * var(--ui-density))` | Default `Checkbox` and `Radio` input size. |
| `--ui-choice-size-large` | `calc(1.5rem * var(--ui-density))` | `Checkbox` and `Radio` input size with `.ui-large`. |
| `--ui-choice-size-small` | `calc(1rem * var(--ui-density))` | `Checkbox` and `Radio` input size with `.ui-small`, and in dense `List` rows unless the control has a size class. |
| `--ui-choice-size-x-small` | `calc(0.875rem * var(--ui-density))` | `Checkbox` and `Radio` input size with `.ui-x-small`. |
| `--ui-control-accent` | Unset | The accent every control shares: `Button` and `ButtonGroup` without `.ui-primary` or `.ui-critical`, a checked `Checkbox`, `Radio` and `Switch`, and the `Range` thumb and fill. Unset by default, so buttons keep `--ui-palette-strong` and choice controls `--ui-primary`. Set it to `--ui-primary` to give every control the brand color in one line, like Material and shadcn, and `--ui-button-accent` or `--ui-choice-accent` to override one of them. |
| `--ui-disabled-opacity` | `0.64` | Opacity applied to disabled controls. |
| `--ui-duration` | `0.2s` | Default transition duration. Multiplied by `--ui-motion`. |
| `--ui-ease` | `ease` | Default easing for transitions. |
| `--ui-field-border-color` | `color-mix( in oklch, var(--ui-text-strong) var(--ui-field-border-strength), var(--ui-surface) )` | Border color of every empty control: `TextField`, `Select`, `Textarea`, the unchecked `Checkbox`, `Radio` and `Switch` unless `--ui-choice-border-color` is set, the `Range` track and the `Progress` outline. `--ui-text-strong` mixed into `--ui-surface` at `--ui-field-border-strength`, so it reaches 3:1. Lighter than `--ui-border-color`, which is decorative, is a choice a theme can make. |
| `--ui-field-border-color-on-raised` | `color-mix( in oklch, var(--ui-text-strong) var(--ui-field-border-strength), var(--ui-surface) )` | Field border color inside raised surfaces. The same mix as `--ui-field-border-color` by default. Each raised component sets `--ui-field-border-color` to it on its root. |
| `--ui-field-border-width` | `1px` | Border width for fields, `Checkbox`, `Radio` and `Switch`. |
| `--ui-field-helper-font-size` | `var(--ui-font-size-caption)` | Font size for helper and end text under a field. |
| `--ui-field-helper-line-height` | `var(--ui-line-height-control)` | Line height for helper and end text under a field. |
| `--ui-field-helper-text-color` | `var(--ui-text-subtle)` | Text color for helper and end text under a field. |
| `--ui-field-label-font-size` | `var(--ui-font-size-small)` | Font size for field labels. |
| `--ui-field-label-font-weight` | `var(--ui-font-weight-semibold)` | Font weight for emphasized field labels and legends. |
| `--ui-field-label-text-color` | `var(--ui-text-strong)` | Text color for field labels. |
| `--ui-field-required-text-color` | `var(--ui-invalid-text)` | Color of the required asterisk. |
| `--ui-focus-ring-color` | `oklch( from var(--ui-surface) clamp(0, (0.6 - l) * 1000, 1) 0 0 )` | Color of the keyboard focus ring. Black on surfaces lighter than OKLCH 0.6 and white on darker ones, so it reaches 3:1 on any `--ui-surface`. |
| `--ui-focus-ring-offset` | `2px` | Distance between a control and its focus ring. |
| `--ui-focus-ring-style` | `solid` | Outline style of the focus ring. |
| `--ui-focus-ring-width` | `2px` | Width of the focus ring. |
| `--ui-font-size-body` | `var(--ui-font-size-300)` | Font size of body copy, `Card` text and the `Callout` title. Defaults to `--ui-font-size-300`. |
| `--ui-font-size-caption` | `var(--ui-font-size-100)` | Font size of captions, `Badge`, `Chip`, `Divider` labels, `List` secondary text, `Menu` shortcuts, overlines, `small`, `figcaption` and x-small buttons, toggles and fields. Defaults to `--ui-font-size-100`. |
| `--ui-font-size-small` | `var(--ui-font-size-200)` | Font size of helper text, `Callout`, `Table`, `Tooltip`, code blocks, dense `List` text and small buttons, chips, toggles and fields. Defaults to `--ui-font-size-200`. |
| `--ui-invalid` | `light-dark( var(--ui-critical), oklch( from var(--ui-critical) max(l, var(--ui-invalid-min-lightness)) min(c, var(--ui-accent-max-chroma)) h ) )` | Color for invalid field borders, fills and outlines. Lifted to `--ui-invalid-min-lightness` in dark mode, so invalid borders stand out from the page with more contrast. |
| `--ui-invalid-text` | `light-dark( oklch(from var(--ui-invalid) min(l, var(--ui-text-max-lightness)) c h), oklch( from var(--ui-invalid) max(l, var(--ui-text-min-lightness)) min(c, var(--ui-text-max-chroma)) h ) )` | Color for validation messages and invalid labels. `--ui-invalid` with its lightness kept within `--ui-text-max-lightness` and `--ui-text-min-lightness`, so it stays readable where `--ui-invalid` is lighter for borders. |
| `--ui-line-height-control` | `1.5` | Line height of interface text: labels, helpers, choice labels and field hints. |
| `--ui-line-height-tight` | `1.25` | Line height of single-line controls and compact text: field inputs, `Table` cells, `Tooltip`, `Card` captions and keyboard hints in buttons. |
| `--ui-motion` | `1` | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/vue/guide/theming.md#motion). |
| `--ui-on-accent` | `var(--ui-gray-1)` | Text on an accent fill, an intent color kept within `--ui-accent-fill-max-lightness`: critical buttons, severity `Badge`s, the invalid choice mark and the checked choice mark in dark mode. Near-white in both modes, since the cap keeps every accent fill dark enough for it. |
| `--ui-on-control-accent` | Unset | Text and mark color on a `--ui-control-accent` fill. Set it with `--ui-control-accent`. `--ui-button-on-accent` and `--ui-choice-on-accent` override it per component. |
| `--ui-on-primary` | `color( from var(--ui-primary) xyz-d65 calc(0.9505 * (0.0012 + 0.9988 * clamp(0, (0.182 - y) * 1000, 1))) calc(0.0012 + 0.9988 * clamp(0, (0.182 - y) * 1000, 1)) calc(1.089 * (0.0012 + 0.9988 * clamp(0, (0.182 - y) * 1000, 1))) )` | Text color on `--ui-primary`. Derived with relative color from the primary's relative luminance (the `y` of `xyz-d65`): white on a primary below 0.182, near-black above it, so either side keeps 4.5:1 and a custom `--ui-primary` gets readable text. |
| `--ui-primary` | `light-dark( oklch( from var(--ui-primary-source) min(l, var(--ui-primary-max-lightness)) c h ), oklch( from var(--ui-primary-source) max(l, var(--ui-primary-min-lightness)) min(c, var(--ui-accent-max-chroma)) h ) )` | Brand color for primary actions and accents. Derived from `--ui-primary-source` within `--ui-primary-max-lightness` and `--ui-primary-min-lightness`. Set `--ui-primary-source` to keep more contrast working, or this token to pin the color. |
| `--ui-primary-tonal` | Unset | Background of `Button` and `ButtonGroup` with `.ui-primary` and `.ui-tonal`, and of a checked `Checkbox`, `Radio` or `Switch` card. When unset, buttons use `--ui-palette-tint` and cards `--ui-primary` at `--ui-state-active-alpha-accent`. Material's `primary-container` and shadcn's `secondary` go here. |
| `--ui-radius` | `0.5rem` | Corner radius for every component: cards, callouts, menus, buttons and fields follow it, and small parts like `kbd`, tooltips and checkboxes never get rounder than it. Set it to `0` for square corners. Takes a single length. |
| `--ui-radius-round` | `1e5px` | The pill radius for round buttons, avatars, badges, chips, radios, switches, the range track and the carousel buttons and markers. |
| `--ui-shadow-elevated` | `0 -1px 3px 0 hsl(from var(--ui-shadow-color) h s l / calc(alpha + 0.02)), 0 1px 2px -5px hsl(from var(--ui-shadow-color) h s l / calc(alpha + 0.02)), 0 2px 5px -5px hsl(from var(--ui-shadow-color) h s l / calc(alpha + 0.04)), 0 4px 12px -5px hsl(from var(--ui-shadow-color) h s l / calc(alpha + 0.05)), 0 12px 15px -5px hsl(from var(--ui-shadow-color) h s l / calc(alpha + 0.07))` | Shadow of elevated `Card` and `Accordion`. Five layers of `--ui-shadow-color`, which follows the color scheme, also in `.ui-light` and `.ui-dark` parts of the page. |
| `--ui-shadow-surface` | `none` | Shadow of tonal and outlined `Card` and `Accordion`, and of `Callout`. `none` by default, for themes that put every surface on the same plane. |
| `--ui-space-1` | `calc(0.25rem * var(--ui-space-scale))` | Spacing step 1: `0.25rem` times `--ui-space-scale`. |
| `--ui-space-2` | `calc(0.5rem * var(--ui-space-scale))` | Spacing step 2: `0.5rem` times `--ui-space-scale`. |
| `--ui-space-3` | `calc(1rem * var(--ui-space-scale))` | Spacing step 3: `1rem` times `--ui-space-scale`. |
| `--ui-space-4` | `calc(1.25rem * var(--ui-space-scale))` | Spacing step 4: `1.25rem` times `--ui-space-scale`. |
| `--ui-space-5` | `calc(1.5rem * var(--ui-space-scale))` | Spacing step 5: `1.5rem` times `--ui-space-scale`. |
| `--ui-space-8` | `calc(3rem * var(--ui-space-scale))` | Spacing step 8: `3rem` times `--ui-space-scale`. |
| `--ui-state-active-alpha-accent` | `25%` | Alpha of the pressed state layer on primary and critical buttons. |
| `--ui-state-hover-alpha-accent` | `15%` | Alpha of the hover state layer on primary and critical buttons. |
| `--ui-surface` | `light-dark(var(--ui-gray-1), var(--ui-gray-13))` | Page and card background. |
| `--ui-surface-elevated` | `light-dark(var(--ui-gray-1), var(--ui-gray-12))` | Background of elevated cards and accordions, dialogs, drawers, menus and native `Select` options. |
| `--ui-surface-tonal` | `light-dark(var(--ui-gray-3), var(--ui-gray-12))` | Background of tonal variants. |
| `--ui-surface-tonal-hover` | `light-dark( oklch(from var(--ui-surface-tonal) calc(l * 0.93) c h), oklch(from var(--ui-surface-tonal) calc(l * 1.1) c h) )` | Hover fill of a `--ui-surface-tonal` surface: clickable `Chip`s and filled `TextField`, `Select` and `Textarea` fields. Derived from `--ui-surface-tonal`, darker in light mode and lighter in dark mode. |
| `--ui-switch-thumb-size-large` | `calc(1.25rem * var(--ui-density))` | Diameter of the `Switch` thumb with `.ui-large`. |
| `--ui-switch-thumb-size-small` | `calc(0.75rem * var(--ui-density))` | Diameter of the `Switch` thumb with `.ui-small`, and in `List` rows unless the switch has a size class. |
| `--ui-switch-thumb-size-x-small` | `calc(0.625rem * var(--ui-density))` | Diameter of the `Switch` thumb with `.ui-x-small`. |
| `--ui-switch-track-block-size-large` | `calc(1.75rem * var(--ui-density))` | Height of the `Switch` track with `.ui-large`. |
| `--ui-switch-track-block-size-small` | `calc(1.25rem * var(--ui-density))` | Height of the `Switch` track with `.ui-small`, and in `List` rows unless the switch has a size class. |
| `--ui-switch-track-block-size-x-small` | `calc(1rem * var(--ui-density))` | Height of the `Switch` track with `.ui-x-small`. |
| `--ui-switch-track-inline-size-large` | `calc( 2 * var(--ui-switch-track-block-size-large) )` | Width of the `Switch` track with `.ui-large`. Twice `--ui-switch-track-block-size-large` until a theme sets it. |
| `--ui-switch-track-inline-size-small` | `calc( 2 * var(--ui-switch-track-block-size-small) )` | Width of the `Switch` track with `.ui-small`, and in `List` rows unless the switch has a size class. Twice `--ui-switch-track-block-size-small` until a theme sets it. |
| `--ui-switch-track-inline-size-x-small` | `calc( 2 * var(--ui-switch-track-block-size-x-small) )` | Width of the `Switch` track with `.ui-x-small`. Twice `--ui-switch-track-block-size-x-small` until a theme sets it. |
| `--ui-text` | `light-dark( color-mix( in oklch, var(--ui-text-strong) var(--ui-text-strength-light), var(--ui-surface) ), color-mix( in oklch, var(--ui-text-strong) var(--ui-text-strength-dark), var(--ui-surface) ) )` | Body text color. `--ui-text-strong` mixed into `--ui-surface` at `--ui-text-strength-light` or `--ui-text-strength-dark`. |
| `--ui-text-strong` | `light-dark(var(--ui-gray-15), var(--ui-gray-1))` | Strongest text color, for headings, labels and values. Body text is `--ui-text`. |

The stylesheets on this page read these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/vue/guide/theme-tokens.md).

## Component properties

Set these on the component itself, inline or in your own CSS. Inputs are the knobs. Outputs are derived from the inputs and the current state, so overriding one fixes it in every state. [Customizing](https://open-props-ui.netlify.app/vue/guide/customizing.md#component-properties) has examples.

### card.css

A dependency, from [Card](https://open-props-ui.netlify.app/vue/components/card.md).

| Property | Kind | Description |
| --- | --- | --- |
| `--_bg-color` | Output | The current background. Set by the variants. |
| `--_border-color` | Output | The current border color. Set by the variants (`--ui-border-color-raised` in `.ui-tonal` and `.ui-elevated` when a theme sets it) and by hovering `.ui-card-link`. |
| `--_border-width` | Output | The current border width. Set by the variants. |
| `--_duration` | Output | Duration of the focus ring animation, `--ui-duration` times `--_motion`. |
| `--_ease` | Input | Easing of the focus ring animation. Defaults to `--ui-ease`. |
| `--_elevated-bg-color` | Input | Background of `.ui-elevated`. Defaults to `--ui-surface-elevated`. |
| `--_elevated-shadow` | Input | Shadow of `.ui-elevated`. Defaults to `--ui-shadow-elevated`. |
| `--_motion` | Input | Motion multiplier for the focus ring animation. `0` turns it off. |
| `--_outlined-border-color` | Input | Border color of `.ui-outlined`. Defaults to `--ui-border-color`. |
| `--_padding` | Input | Padding of the header, content and actions. `--ui-card-padding`, or `--ui-space-3` when a theme leaves it unset. |
| `--_shadow` | Output | The current shadow. `.ui-elevated` sets `--_elevated-shadow`, `.ui-tonal` and `.ui-outlined` set `--ui-shadow-surface`. |
| `--_surface-bg-color` | Input | Background of default and `.ui-outlined` cards, and border color of `.ui-tonal` and `.ui-elevated` unless a theme sets `--ui-border-color-raised`. Defaults to `--ui-surface`. |
| `--_tonal-bg-color` | Input | Background of `.ui-tonal`. Defaults to `--ui-surface-tonal`. |

### choice.css

| Property | Kind | Description |
| --- | --- | --- |
| `--_accent` | Input | Fill and border of the checked input. `--ui-choice-accent` when the theme sets it, otherwise `--ui-primary` with its lightness capped in dark mode, and `--ui-invalid` when invalid. |
| `--_bg-color` | Output | Background of `.ui-card`, read by `card.css`. The surface by default, `--_hover-bg-color` when hovered and `--_checked-bg-color` when checked. |
| `--_border-color` | Output | Border of `.ui-card`, read by `card.css`. `--ui-border-color` by default, `--_accent` when checked and `--ui-invalid` when invalid. |
| `--_border-width` | Output | Border width of `.ui-card`, read by `card.css`. `--ui-border-width`. |
| `--_card-padding` | Input | Padding of `.ui-card`. `--ui-space-3`, and `--ui-space-2` in `.ui-small` and `.ui-x-small`. |
| `--_checked-bg-color` | Input | Background of a checked `.ui-card`. `--ui-primary-tonal` when the theme sets it, otherwise `--ui-primary` at `--ui-state-active-alpha-accent`. |
| `--_duration` | Output | Duration of the transitions, `--ui-duration` times `--_motion`. |
| `--_ease` | Input | Easing of the transitions. Defaults to `--ui-ease`. |
| `--_hover-bg-color` | Input | Background of a hovered `.ui-card`. Defaults to `--ui-surface-tonal-hover`. |
| `--_motion` | Input | Motion multiplier for the transitions. `0` turns them off. |
| `--_on-accent` | Input | Color of the checkmark, dash and dots on `--_accent`. `--ui-choice-on-accent` when the theme sets it, otherwise `--ui-on-primary`, or `--ui-on-accent` in dark mode. `--ui-on-accent` when invalid. |
| `--_ripple-size` | Input | Size of the hover ripple of checkboxes and radios, relative to the input. Set on `input`. |
| `--_shadow` | Output | Shadow of `.ui-card`, read by `card.css`. `--ui-shadow-surface` unless `.ui-tonal` or `.ui-elevated` set their own. |
| `--_size` | Input | Width and height of the checkbox and radio input, which the label centers on. Defaults to `--ui-choice-size`, set by the size classes. `switch.css` sets it to the track height. |
| `--_thumb-scale` | Output | Current scale of the ripple. Set by the hover and active states. |

### radio.css

| Property | Kind | Description |
| --- | --- | --- |
| `--_accent` | Input | Fill and border of the checked circle. `SelectedItem` in forced colors. |
| `--_dot-radius` | Output | Radius of the checked dot, computed from `--_size` and `--ui-field-border-width`. |
| `--_on-accent` | Input | Color of the dot on `--_accent`. `SelectedItemText` in forced colors. |

## Installation

Import the component from `opui-css/vue`:

### Dependencies

- [Form](https://open-props-ui.netlify.app/vue/components/form.md)
- [Card](https://open-props-ui.netlify.app/vue/components/card.md)

Copy the CSS into your project to own it. It reads tokens from Open Props, `palette.css` and `theme.css`, so those go on the page too, after `layers.css`. See [Getting started](https://open-props-ui.netlify.app/vue/guide/getting-started.md).

- `opui-css/css/components/radio.css`
- `opui-css/css/components/choice.css`
- `opui-css/css/components/form.css`
- `opui-css/css/components/card.css`

## Used in blocks

- [Checkout](https://open-props-ui.netlify.app/blocks/checkout.md)
- [Notification settings](https://open-props-ui.netlify.app/blocks/notification-settings.md)
- [Sign up](https://open-props-ui.netlify.app/blocks/sign-up.md)
