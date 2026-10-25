# Select

Leverages the [List component](https://open-props-ui.netlify.app/vue/components/list.md) to provide markup for the Select popover. Use a Select to pick a value in a form. For actions, use a [Menu](https://open-props-ui.netlify.app/vue/components/menu.md).

## Anatomy

Label Start text Option one (1) ¤ EUR Top Bottom Supporting text

- `<Select>`

  Container element.

- `label / v-slot:label`

  The label for the field.

- `startText / v-slot:start-text`

  Start text displayed above the field.

- `.ui-field`

  The boxed select area.

- `v-slot:top`

  Content above the select, inside the border, with a divider.

- `v-slot:start`

  Content at the inline-start of the field, inside the border.

- `v-model`

  The select. Its options are in a popover list.

- `v-slot:end`

  Content at the inline-end of the field, inside the border.

- `v-slot:bottom`

  Content below the select, inside the border, with a divider.

- `endText / v-slot:end-text`

  Supporting text displayed below the field.

## Variants

The select is outlined by default. Use `variant="filled"` for a filled background.

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

## Sizes

Choose between four sizes with the `size` prop: `x-small`, `small`, `medium` (the default) and `large`.

On touch screens, x-small and small fields keep the default text size (`--ui-font-size-control`, 16px), so iOS Safari doesn't zoom in when one is focused.

```vue
<script setup lang="ts">
import { Select } from "opui-css/vue"
</script>

<template>
  <Select label="X-small" size="x-small">
    <option value="">X-small</option>
    <option>Option Two</option>
    <option>Option Three</option>
  </Select>
  <Select label="Small" size="small">
    <option value="">Small</option>
    <option>Option Two</option>
    <option>Option Three</option>
  </Select>
  <Select label="Medium">
    <option value="">Medium</option>
    <option>Option Two</option>
    <option>Option Three</option>
  </Select>
  <Select label="Large" size="large">
    <option value="">Large</option>
    <option>Option Two</option>
    <option>Option Three</option>
  </Select>
</template>
```

## Dense

Use the `dense` prop to pack the options tighter.

```vue
<script setup lang="ts">
import { Select } from "opui-css/vue"
</script>

<template>
  <Select label="Fruit" dense>
    <option value="">-</option>
    <option>Apple</option>
    <option>Banana</option>
    <option>Cherry</option>
  </Select>
</template>
```

## End text

Use `endText` for supporting text below the select.

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

Use the `start` and `end` slots to affix icons or short text alongside the select inside the field's border.

```vue
<script setup lang="ts">
import { Select } from "opui-css/vue"
</script>

<template>
  <Select label="Currency">
    <template #start>¤</template>
    <option value="">-</option>
    <option>EUR</option>
    <option>SEK</option>
    <option>USD</option>
  </Select>

  <Select label="Country">
    <template #start
      ><svg
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
        ></path></svg
    ></template>
    <option value="">-</option>
    <option>Denmark</option>
    <option>Norway</option>
    <option>Sweden</option>
  </Select>

  <Select label="Delivery time">
    <template #end>days</template>
    <option>1</option>
    <option>3</option>
    <option>5</option>
  </Select>
</template>
```

## Top and bottom

Use the `top` and `bottom` slots for short text or a link above and below the select, inside the field's border and set off by a divider.

They sit outside the list of options, so they can't filter it. Keep form controls out of them, since the select's `<label>` wraps them.

The select's `aria-describedby` points at them, so screen readers read them with the select.

```vue
<script setup lang="ts">
import { Select } from "opui-css/vue"
</script>

<template>
  <Select label="Car">
    <template #top>Company cars only</template>
    <template #bottom><a class="ui-link" href="#">Manage cars…</a></template>
    <option value="">-</option>
    <option>Kia EV6</option>
    <option>Volkswagen ID.4</option>
    <option>Volvo EX30</option>
  </Select>
</template>
```

## Preselected

Set `value` or `v-model` to preselect an option, or `selected: true` on an item.

```vue
<script setup lang="ts">
import { ref } from "vue"
import { Select } from "opui-css/vue"

const role = ref("developer")
</script>

<template>
  <Select
    label="Role"
    :items="[
      { label: 'Designer', value: 'designer' },
      { label: 'Developer', value: 'developer' },
      { label: 'Manager', value: 'manager' },
    ]"
    v-model="role"
  />

  <Select
    label="Team"
    :items="[
      { label: 'Design', value: 'design' },
      { label: 'Engineering', selected: true, value: 'engineering' },
      { label: 'Sales', value: 'sales' },
    ]"
  />
</template>
```

## Option groups

Wrap options in a `<div role="group">` and start it with a `<label class="ui-text">` to group them under a heading. The heading takes any content, but it doesn't name the group for screen readers.

```vue
<script setup lang="ts">
import { Select } from "opui-css/vue"
</script>

<template>
  <Select label="Car">
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
  </Select>
</template>
```

### Optgroup

An `<optgroup>` names its group natively through its `label` attribute. Give it a `<legend>` with the same text first in the group: it gets the heading styles in a customizable select, while browsers without one show the `label` in their own picker.

```vue
<script setup lang="ts">
import { Select } from "opui-css/vue"
</script>

<template>
  <Select label="Car">
    <option value="">Select car</option>
    <optgroup label="French cars">
      <legend>French cars</legend>
      <option>Citroën</option>
      <option>Renault</option>
    </optgroup>
    <optgroup label="Swedish cars">
      <legend>Swedish cars</legend>
      <option>Saab</option>
      <option>Volvo</option>
    </optgroup>
  </Select>
</template>
```

## Validation

- `required` toggles the required styles on the `<select>`.
- `error` toggles the invalid styles, and screen readers announce the `<select>` as invalid. Say what's wrong in the end text. The component points `aria-describedby` at it.
- Fields also get the invalid styles from the browser's own validation (`:user-invalid`), after the user has edited them. Use `error` for server-side errors.

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
    <Select label="Label" error endText="Pick another option.">
      <option value="">-</option>
      <option selected>Wrong option</option>
      <option>Also wrong!</option>
      <option>Nothing's right!</option>
    </Select>

    <Select label="Label" variant="filled" error endText="Pick another option.">
      <option value="">-</option>
      <option selected>Wrong option</option>
      <option>Also wrong!</option>
      <option>Nothing's right!</option>
    </Select>
  </div>
</template>
```

## Spread

Use the `spread` boolean prop to display the label and start text on the left with the select on the right. The layout collapses to a column on narrow containers.

```vue
<script setup lang="ts">
import { Select } from "opui-css/vue"
</script>

<template>
  <Select spread>
    <template #label>Country</template>
    <template #start-text>Select your country of residence</template>
    <option value="">Select a country</option>
    <option>Denmark</option>
    <option>Finland</option>
    <option>Iceland</option>
    <option>Norway</option>
    <option>Sweden</option>
  </Select>

  <Select spread variant="filled">
    <template #label>Language</template>
    <template #start-text>Choose your preferred language</template>
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
    <template #start-text>You must select an option</template>
    <option value="">Select an option</option>
    <option>Option 1</option>
    <option>Option 2</option>
  </Select>

  <Select spread disabled>
    <template #label>Disabled</template>
    <template #start-text>This select is disabled</template>
    <option>Option 1</option>
  </Select>

  <Select spread error>
    <template #label>Invalid Select</template>
    <template #start-text>This select has an error</template>
    <template #end-text>Please select a valid option.</template>
    <option>Option 1</option>
  </Select>

  <Select spread>
    <template #label>Time zone</template>
    <template #start-text>Used for reminders and due dates</template>
    <template #start>UTC</template>
    <option>-03:00</option>
    <option>+00:00</option>
    <option>+01:00</option>
    <option>+05:30</option>
    <option>+09:00</option>
  </Select>

  <Select spread variant="filled">
    <template #label>Region</template>
    <template #start-text>Affects data residency and latency</template>
    <template #start>
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
    </template>
    <template #end-text>Cannot be changed after deploy</template>
    <option value="">-</option>
    <option>ap-southeast-1</option>
    <option>eu-north-1</option>
    <option>us-east-1</option>
  </Select>
</template>
```

## Auto-fit

Use `autoFit` to let the field's width follow the selected option, from `25ch`.

```vue
<script setup lang="ts">
import { Select } from "opui-css/vue"
</script>

<template>
  <Select
    autoFit
    :items="[
      { label: 'Citroën', value: 'citroen' },
      { label: 'Renault', value: 'renault' },
      { label: 'Volvo', value: 'volvo' },
    ]"
    label="Car"
  />
</template>
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

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `autoFit` | `boolean` | `false` | Lets the width follow the selected option, from `25ch`. |
| `dense` | `boolean` | `false` | Packs the items tighter. |
| `disabled` | `boolean` | `false` | Dims the select and blocks input. |
| `endText` | `string` | - | Supporting text displayed below the field. |
| `error` | `boolean` | `false` | Marks the control invalid and shows error styles. |
| `hideLabel` | `boolean` | `false` | Visually hides the label, `.ui-sr-only` instead of `.ui-label`. The field keeps it as its accessible name. |
| `id` | `string` | - | The id of the `<select>`. |
| `items` | `SelectItem[]` | `[]` | The options, as `{ label, selected, value }` objects. |
| `label` | `string` | - | The label for the field. |
| `name` | `string` | - | The name of the `<select>`. Inside a `FieldGroup`, the group's `name` applies. |
| `required` | `boolean` | - | Adds a required mark after the label. The form won't submit until an option with a value is selected. |
| `size` | `"large"` , `"medium"` , `"small"` , `"x-small"` | `"medium"` | The size of the element. |
| `spread` | `boolean` | `false` | Pushes the label and start text to one side and the select to the other. |
| `startText` | `string` | - | Start text displayed above the field. |
| `v-model` **Needs hydration** The bound value only updates on the client. The native control still changes and submits with its form. Read the value from the form instead. | `string` , `number` , `(string \| number)[]` | - | The selected value, or values with `multiple`. |
| `value` | `(string \| number)[]` , `number` , `string` | - | The selected value, or values with `multiple`. |
| `variant` | `"filled"` , `"outlined"` | `"outlined"` | The variant to use. |

#### Slots

| Slot | Description |
| --- | --- |
| `bottom` | Content below the select, inside the border, with a divider. |
| `default` | Extra `<option>` and `<optgroup>` elements. |
| `end` | Content at the inline-end of the field, inside the border. |
| `end-text` | Supporting text displayed below the field. |
| `label` | The label for the field. |
| `start` | Content at the inline-start of the field, inside the border. |
| `start-text` | Start text displayed above the field. |
| `top` | Content above the select, inside the border, with a divider. |

Attributes that aren't props go to the `<select>`, like `autocomplete` and `multiple`, and `class` and `style` go to the root `<label>`.

### CSS variables

| Variable | Default | Description |
| --- | --- | --- |
| `--ui-border-color` | `light-dark( color-mix( in oklch, var(--ui-text-strong) var(--ui-border-strength-light), var(--ui-surface) ), color-mix( in oklch, var(--ui-text-strong) var(--ui-border-strength-dark), var(--ui-surface) ) )` | Default border color for cards, lists, tables and dividers. `--ui-text-strong` mixed into `--ui-surface` at `--ui-border-strength-light` or `--ui-border-strength-dark`. |
| `--ui-border-color-on-filled` | `light-dark( var(--ui-gray-6), var(--ui-gray-12) )` | Border color inside filled surfaces: lists without a variant and table headers. `List` and `Table` set `--ui-border-color` to it on those parts. |
| `--ui-border-width` | `1px` | Default border width for components that draw a border. |
| `--ui-border-width-thick` | `2px` | Width of emphasized rules: the head and foot rules of rich text tables, the `AvatarGroup` ring, the `Badge` border, the neutral `Chip` dot, the dotted `DescriptionList` rule, the `Tabs` indicator, the bar on a selected `List` row, the `Spinner` ring, and at one and a half times, the blockquote bar. |
| `--ui-choice-size-small` | `calc(1rem * var(--ui-density))` | `Checkbox` and `Radio` input size with `.ui-small`, and in dense `List` rows unless the control has a size class. |
| `--ui-control-size` | `calc(2.5rem * var(--ui-density))` | Shared default height for fields and buttons so they line up. |
| `--ui-control-size-small` | `calc(2rem * var(--ui-density))` | Shared small height for fields and buttons. |
| `--ui-disabled-opacity` | `0.64` | Opacity applied to disabled controls. |
| `--ui-duration` | `0.2s` | Default transition duration. Multiplied by `--ui-motion`. |
| `--ui-ease` | `ease` | Default easing for transitions. |
| `--ui-field-bg-color` | Unset | Background of `TextField`, `Textarea` and `Select` fields. When unset, `--ui-surface`, the page color. |
| `--ui-field-border-color` | `color-mix( in oklch, var(--ui-text-strong) var(--ui-field-border-strength), var(--ui-surface) )` | Border color of every empty control: `TextField`, `Select`, `Textarea`, the unchecked `Checkbox`, `Radio` and `Switch` unless `--ui-choice-border-color` is set, the `Range` track and the `Progress` outline. `--ui-text-strong` mixed into `--ui-surface` at `--ui-field-border-strength`, so it reaches 3:1. Lighter than `--ui-border-color`, which is decorative, is a choice a theme can make. |
| `--ui-field-border-color-on-filled` | `color-mix( in oklch, var(--ui-text-strong) var(--ui-field-border-strength), var(--ui-surface-filled) )` | Field border color inside filled surfaces: lists without a variant and table headers. `--ui-text-strong` mixed into `--ui-surface-filled` at `--ui-field-border-strength`. |
| `--ui-field-border-width` | `1px` | Border width for fields, `Checkbox`, `Radio` and `Switch`. |
| `--ui-field-helper-font-size` | `var(--ui-font-size-caption)` | Font size for helper and end text under a field. |
| `--ui-field-helper-line-height` | `var(--ui-line-height-control)` | Line height for helper and end text under a field. |
| `--ui-field-helper-text-color` | `var(--ui-text-subtle)` | Text color for helper and end text under a field. |
| `--ui-field-label-font-size` | `var(--ui-font-size-small)` | Font size for field labels. |
| `--ui-field-label-font-weight` | `var(--ui-font-weight-semibold)` | Font weight for emphasized field labels and legends. |
| `--ui-field-label-text-color` | `var(--ui-text-strong)` | Text color for field labels. |
| `--ui-field-padding-inline` | Unset | Horizontal padding inside `TextField`, `Textarea` and `Select` fields. When unset, `--ui-space-2`. |
| `--ui-field-radius` | Unset | Corner radius for fields. When unset, they follow `--ui-radius`, also where it's set on a part of the page. |
| `--ui-field-required-text-color` | `var(--ui-invalid-text)` | Color of the required asterisk. |
| `--ui-field-size` | `var(--ui-control-size)` | Default field height. |
| `--ui-field-size-large` | `var(--ui-control-size-large)` | Field height with `.ui-large`. |
| `--ui-field-size-small` | `var(--ui-control-size-small)` | Field height with `.ui-small`. |
| `--ui-field-size-x-small` | `var(--ui-control-size-x-small)` | Field height with `.ui-x-small`. |
| `--ui-focus-ring-color` | `oklch( from var(--ui-surface) clamp(0, (0.6 - l) * 1000, 1) 0 0 )` | Color of the keyboard focus ring. Black on surfaces lighter than OKLCH 0.6 and white on darker ones, so it reaches 3:1 on any `--ui-surface`. |
| `--ui-focus-ring-inset` | `calc(-1 * var(--ui-focus-ring-width))` | Negative offset for focus rings drawn inside a control, such as `ButtonGroup`, `List` items and `Select` options. |
| `--ui-focus-ring-offset` | `2px` | Distance between a control and its focus ring. |
| `--ui-focus-ring-style` | `solid` | Outline style of the focus ring. |
| `--ui-focus-ring-width` | `2px` | Width of the focus ring. |
| `--ui-font-body` | `system-ui, sans-serif` | Font family for body text, fields and buttons. `system-ui, sans-serif` by default. |
| `--ui-font-code` | `Dank Mono, Operator Mono, Inconsolata, Fira Mono, ui-monospace, SF Mono, Monaco, Droid Sans Mono, Source Code Pro, Cascadia Code, Menlo, Consolas, DejaVu Sans Mono, monospace` | Font family for `code`, `kbd`, `samp` and `pre` in rich text, `.ui-kbd`, `.ui-samp`, `.ui-var`, code blocks and `kbd` in buttons and lists. A monospace stack by default. |
| `--ui-font-size-caption` | `var(--ui-font-size-100)` | Font size of captions, `Badge`, `Chip`, `Divider` labels, `List` secondary text, `Menu` shortcuts, overlines, `small`, `figcaption` and x-small buttons, toggles and fields. Defaults to `--ui-font-size-100`. |
| `--ui-font-size-control` | `var(--ui-font-size-300)` | Font size of the default `Button`, `Select`, `Tabs`, `TextField`, `Textarea` and `ToggleButton`. Small and x-small sizes read `--ui-font-size-small` and `--ui-font-size-caption`. Defaults to `--ui-font-size-300`. |
| `--ui-font-size-small` | `var(--ui-font-size-200)` | Font size of helper text, `Callout`, `Table`, `Tooltip`, code blocks, dense `List` text and small buttons, chips, toggles and fields. Defaults to `--ui-font-size-200`. |
| `--ui-font-weight-medium` | `500` | Font weight for badges, overlines and group labels. |
| `--ui-font-weight-normal` | `400` | Font weight for body text, `List` text and `Button` keyboard shortcuts. |
| `--ui-icon-size` | `1.25rem` | Default icon size inside components. |
| `--ui-icon-size-small` | `1rem` | Icon size inside `Chip`, x-small `Avatar` and dense `List` rows, and the `Select` and autosuggest chevron. |
| `--ui-invalid` | `light-dark( var(--ui-critical), oklch( from var(--ui-critical) max(l, var(--ui-invalid-min-lightness)) min(c, var(--ui-accent-max-chroma)) h ) )` | Color for invalid field borders, fills and outlines. Lifted to `--ui-invalid-min-lightness` in dark mode, so invalid borders stand out from the page with more contrast. |
| `--ui-invalid-text` | `light-dark( oklch(from var(--ui-invalid) min(l, var(--ui-text-max-lightness)) c h), oklch( from var(--ui-invalid) max(l, var(--ui-text-min-lightness)) min(c, var(--ui-text-max-chroma)) h ) )` | Color for validation messages and invalid labels. `--ui-invalid` with its lightness kept within `--ui-text-max-lightness` and `--ui-text-min-lightness`, so it stays readable where `--ui-invalid` is lighter for borders. |
| `--ui-line-height` | `1.6` | Line height of body copy: prose, captions and `List` text. |
| `--ui-line-height-control` | `1.5` | Line height of interface text: labels, helpers, choice labels and field hints. |
| `--ui-line-height-tight` | `1.25` | Line height of single-line controls and compact text: field inputs, `Table` cells, `Tooltip`, `Card` captions and keyboard hints in buttons. |
| `--ui-list-item-padding-inline` | Unset | Horizontal padding of `List` and `Menu` items, headings and `Select` options. When unset, `--ui-space-3`. |
| `--ui-motion` | `1` | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/vue/guide/theming.md#motion). |
| `--ui-on-selected` | Unset | Text color on `--ui-selected`. When unset, `--ui-on-primary` on toggles, the item's own text color on list items and `--ui-primary-text` on a selected `Select` option. |
| `--ui-primary` | `light-dark( oklch( from var(--ui-primary-source) min(l, var(--ui-primary-max-lightness)) c h ), oklch( from var(--ui-primary-source) max(l, var(--ui-primary-min-lightness)) min(c, var(--ui-accent-max-chroma)) h ) )` | Brand color for primary actions and accents. Derived from `--ui-primary-source` within `--ui-primary-max-lightness` and `--ui-primary-min-lightness`. Set `--ui-primary-source` to keep more contrast working, or this token to pin the color. |
| `--ui-primary-text` | `light-dark( oklch(from var(--ui-primary) min(l, var(--ui-text-max-lightness)) c h), oklch( from var(--ui-primary) max(l, var(--ui-text-min-lightness)) min(c, var(--ui-text-max-chroma)) h ) )` | Primary as a text color: links, rich text links, `Callout` link hover, `Button` and `ButtonGroup` with `.ui-primary` and no variant or `.ui-outlined`, and a selected `Select` option. Defaults to `--ui-primary` with its lightness kept within `--ui-text-max-lightness` and `--ui-text-min-lightness`, and is derived again from the more-contrast primary. Set it when the primary needs another shade for text. |
| `--ui-radius` | `0.5rem` | Corner radius for every component: cards, callouts, menus, buttons and fields follow it, and small parts like `kbd`, tooltips and checkboxes never get rounder than it. Set it to `0` for square corners. Takes a single length. |
| `--ui-selected` | Unset | Background of a selected control: a checked `ToggleButton`, the selected `ToggleGroup` item, and a selected or current `List` item and `Select` option. When unset, `--ui-primary` on toggles and `--ui-primary` at `--ui-state-active-alpha-accent` on list items and options. Pair it with `--ui-on-selected`. |
| `--ui-selected-strong` | `var(--ui-primary)` | Mark of a selected item that has to stand out from the page on its own: the current `Carousel` marker, the bar on the start edge of a selected `List` row and the selected tab of filled `Tabs`. Defaults to `--ui-primary`. `--ui-selected` is the fill behind a selected item and may be faint. |
| `--ui-shadow-control` | `none` | Shadow of buttons with a variant, standalone `ToggleButton`, outlined `Chip` and fields. `none` by default, for themes that lift controls off the page. |
| `--ui-shadow-field` | Unset | Shadow of `TextField`, `Textarea` and `Select` fields. When unset, they follow `--ui-shadow-control`. Set it to `none` to lift buttons but keep fields flat. |
| `--ui-shadow-overlay` | `0 -1px 3px 0 hsl(from var(--ui-shadow-color) h s l / calc(alpha + 0.02)), 0 1px 2px -5px hsl(from var(--ui-shadow-color) h s l / calc(alpha + 0.02)), 0 2px 5px -5px hsl(from var(--ui-shadow-color) h s l / calc(alpha + 0.04)), 0 4px 12px -5px hsl(from var(--ui-shadow-color) h s l / calc(alpha + 0.05)), 0 12px 15px -5px hsl(from var(--ui-shadow-color) h s l / calc(alpha + 0.07))` | Shadow of layers that float above the page: `Dialog`, `Drawer`, `Menu`, `Select` pickers and the `Carousel` buttons. Five layers of `--ui-shadow-color`. |
| `--ui-space-1` | `calc(0.25rem * var(--ui-space-scale))` | Spacing step 1: `0.25rem` times `--ui-space-scale`. |
| `--ui-space-2` | `calc(0.5rem * var(--ui-space-scale))` | Spacing step 2: `0.5rem` times `--ui-space-scale`. |
| `--ui-space-3` | `calc(1rem * var(--ui-space-scale))` | Spacing step 3: `1rem` times `--ui-space-scale`. |
| `--ui-space-4` | `calc(1.25rem * var(--ui-space-scale))` | Spacing step 4: `1.25rem` times `--ui-space-scale`. |
| `--ui-space-6` | `calc(1.75rem * var(--ui-space-scale))` | Spacing step 6: `1.75rem` times `--ui-space-scale`. |
| `--ui-state-active-alpha-accent` | `25%` | Alpha of the pressed state layer on primary and critical buttons. |
| `--ui-state-hover-alpha-accent` | `15%` | Alpha of the hover state layer on primary and critical buttons. |
| `--ui-surface` | `light-dark(var(--ui-gray-1), var(--ui-gray-13))` | Page and card background. |
| `--ui-surface-elevated` | `light-dark(var(--ui-gray-1), var(--ui-gray-12))` | Background of elevated cards and accordions, dialogs, drawers, menus and native `Select` options. |
| `--ui-surface-filled` | `light-dark(var(--ui-gray-4), var(--ui-gray-15))` | Background of filled areas such as progress tracks and table stripes. |
| `--ui-surface-tonal` | `light-dark(var(--ui-gray-3), var(--ui-gray-12))` | Background of tonal variants. |
| `--ui-surface-tonal-hover` | `light-dark( oklch(from var(--ui-surface-tonal) calc(l * 0.93) c h), oklch(from var(--ui-surface-tonal) calc(l * 1.1) c h) )` | Hover fill of a `--ui-surface-tonal` surface: clickable `Chip`s and filled `TextField`, `Select` and `Textarea` fields. Derived from `--ui-surface-tonal`, darker in light mode and lighter in dark mode. |
| `--ui-switch-thumb-size-small` | `calc(0.75rem * var(--ui-density))` | Diameter of the `Switch` thumb with `.ui-small`, and in `List` rows unless the switch has a size class. |
| `--ui-switch-track-block-size-small` | `calc(1.25rem * var(--ui-density))` | Height of the `Switch` track with `.ui-small`, and in `List` rows unless the switch has a size class. |
| `--ui-switch-track-inline-size-small` | `calc( 2 * var(--ui-switch-track-block-size-small) )` | Width of the `Switch` track with `.ui-small`, and in `List` rows unless the switch has a size class. Twice `--ui-switch-track-block-size-small` until a theme sets it. |
| `--ui-text` | `light-dark( color-mix( in oklch, var(--ui-text-strong) var(--ui-text-strength-light), var(--ui-surface) ), color-mix( in oklch, var(--ui-text-strong) var(--ui-text-strength-dark), var(--ui-surface) ) )` | Body text color. `--ui-text-strong` mixed into `--ui-surface` at `--ui-text-strength-light` or `--ui-text-strength-dark`. |
| `--ui-text-strong` | `light-dark(var(--ui-gray-15), var(--ui-gray-1))` | Strongest text color, for headings, labels and values. Body text is `--ui-text`. |
| `--ui-text-subtle` | `var(--ui-text)` | Secondary text: placeholders, field helper text, overlines, descriptions in `List` and `Menu` items, unselected `Tabs` labels and `Table` captions. When unset, `--ui-text`. |

The stylesheets on this page read these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/vue/guide/theme-tokens.md).

## Component properties

Set these on the component itself, inline or in your own CSS. Inputs are the knobs. Outputs are derived from the inputs and the current state, so overriding one fixes it in every state. [Customizing](https://open-props-ui.netlify.app/vue/guide/customizing.md#component-properties) has examples.

### list.css

A dependency, from [List](https://open-props-ui.netlify.app/vue/components/list.md).

| Property | Kind | Description |
| --- | --- | --- |
| `--_bg-color` | Input | Background of the list and its items. Defaults to `--ui-surface-filled`, `.ui-transparent` and `.ui-tonal` set it. |
| `--_description-text-color` | Input | Text color of the description paragraph in an item. `--ui-text-subtle`, and `--ui-on-selected` on a selected or current row when a theme sets it. |
| `--_divider-border-color` | Input | Color of the lines between items in `.ui-bordered` and on `.ui-border-top`. Defaults to `--ui-border-color`, mixed with 20% `--ui-text-strong` in `.ui-tonal`. |
| `--_hover-bg-color` | Input | Background of hovered items, from `--ui-primary`. |
| `--_item-gap` | Input | Gap between the content of an item. Smaller in `.ui-dense`. |
| `--_item-padding-inline` | Input | Horizontal padding of items, headings and options. `--ui-list-item-padding-inline`, or `--ui-space-3` when a theme leaves it unset. |
| `--_radius` | Input | The corner radius of a `.ui-list`. Defaults to `--ui-radius`, and `0` when the list is a direct child of a `Card`, `Accordion` or `Dialog`, which round and clip it themselves. |
| `--_selected-bg-color` | Input | Background of selected and current items and options. `--ui-selected` when the theme sets it, otherwise `--ui-primary` at `--ui-state-active-alpha-accent`, stronger than `--_hover-bg-color`. With more contrast it is `--_hover-bg-color`, so the text keeps 7:1, and the bar marks the row. |
| `--_selected-indicator-bg-color` | Input | Color of the bar on the start edge of selected and current items and options, which marks them without relying on the fill. Defaults to `--ui-selected-strong`. |
| `--_selected-indicator-size` | Input | Width of the bar on selected and current items. Defaults to `--ui-border-width-thick`. |
| `--_selected-shadow` | Output | Inset shadow that draws the bar from `--_selected-indicator-bg-color` and `--_selected-indicator-size`, on the start edge in both writing directions. |
| `--_separator-gap` | Input | Space around the lines between items in `.ui-bordered` and on `.ui-border-top`. Smaller in `.ui-dense`. |
| `--_start-image-size` | Input | Width of a square image in `.ui-start`. |
| `--_start-size` | Input | Maximum size of leading and trailing icons, and the indent of `.ui-inset` items. Smaller in `.ui-dense`. |
| `--_start-video-size` | Input | Height of a video in `.ui-start`, which keeps a 16:9 ratio. |

### select.css

| Property | Kind | Description |
| --- | --- | --- |
| `--_bg-color` | Input | Background of the picker's `.ui-list`. Set it on the `.ui-list`; on the root it is the field background. Defaults to `--ui-surface-filled`. |

### text-field.css

A dependency, from [Text Field](https://open-props-ui.netlify.app/vue/components/text-field.md).

| Property | Kind | Description |
| --- | --- | --- |
| `--_accent` | Input | Border color of `.ui-field` when focused with a pointer; keyboard focus shows the focus ring instead. Defaults to `--ui-primary`, `--ui-invalid` when invalid. |
| `--_affix-text-color` | Output | The current color of `.ui-start`, `.ui-end`, `.ui-top` and `.ui-bottom`. Defaults to `--ui-text`, set by the invalid state. |
| `--_arrow-inset` | Input | Distance of the select arrow from the inline end. |
| `--_arrow-padding` | Output | Inline-end padding that keeps text clear of the select and `datalist` arrow, from `--_arrow-inset` and `--_chevron-size`. |
| `--_bg-color` | Output | The current background of `.ui-field`. Set by `.ui-filled` and its hover state. |
| `--_border-color` | Output | The current border color of `.ui-field` and the `.ui-top` and `.ui-bottom` dividers. Set by the invalid state. |
| `--_chevron-image` | Input | The select arrow, as an image used for a mask. |
| `--_chevron-size` | Input | Width and height of the select arrow. |
| `--_duration` | Output | Duration of the transitions and focus ring animation, `--ui-duration` times `--_motion`. |
| `--_ease` | Input | Easing of the transitions. Defaults to `--ui-ease`. |
| `--_field-padding-block` | Input | The preferred block padding of the control. Set by the size classes. |
| `--_field-padding-block-fit` | Output | The block padding in use, `--_field-padding-block` capped to fit `--_size`. |
| `--_field-padding-inline` | Input | The inline padding of the control and affixes. `.ui-large` sets it. |
| `--_font-size` | Input | The font size of the control and affixes. |
| `--_helper-text-color` | Output | The current color of `.ui-start-text` and `.ui-end-text`. Defaults to `--ui-field-helper-text-color`, set by the invalid state. |
| `--_motion` | Input | Motion multiplier for the transitions. `0` turns them off. |
| `--_size` | Input | The height of `.ui-field`, a minimum so a textarea can grow, and the width and height of a color field. Defaults to `--ui-field-size`, set by the size classes. |

## Installation

Import the component from `opui-css/vue`:

### Dependencies

- [Text Field](https://open-props-ui.netlify.app/vue/components/text-field.md)
- [List](https://open-props-ui.netlify.app/vue/components/list.md)

Copy the CSS into your project to own it. It reads tokens from Open Props, `palette.css` and `theme.css`, so those go on the page too, after `layers.css`. See [Getting started](https://open-props-ui.netlify.app/vue/guide/getting-started.md).

- `opui-css/css/components/text-field.css`
- `opui-css/css/components/select.css`
- `opui-css/css/components/list.css`

## Used in blocks

- [Account settings](https://open-props-ui.netlify.app/blocks/account-settings.md)
- [Checkout](https://open-props-ui.netlify.app/blocks/checkout.md)
- [Data table](https://open-props-ui.netlify.app/blocks/data-table.md)
- [Sales dashboard](https://open-props-ui.netlify.app/blocks/sales-dashboard.md)
- [Team members](https://open-props-ui.netlify.app/blocks/team-members.md)

## See also

- [Customizable select (MDN)](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Customizable_select)
