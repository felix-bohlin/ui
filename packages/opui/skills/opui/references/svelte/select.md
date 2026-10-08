# Select

Leverages the [List component](https://open-props-ui.netlify.app/svelte/components/list.md) to provide markup for the Select popover. Use a Select to pick a value in a form. For actions, use a [Menu](https://open-props-ui.netlify.app/svelte/components/menu.md).

## Anatomy

Label Description Option one (1) ¤ EUR Header Footer Supporting text

- `<Select>`

  Container element.

- `label`

  The label for the field.

- `description`

  Description text displayed above the field.

- `.ui-field`

  The boxed select area.

- `header`

  Content above the select, inside the border, with a divider.

- `prefix`

  Content at the inline-start of the field, inside the border.

- `bind:value`

  The select. Its options are in a popover list.

- `suffix`

  Content at the inline-end of the field, inside the border.

- `footer`

  Content below the select, inside the border, with a divider.

- `endText`

  Supporting text displayed below the field.

## Variants

The select is outlined by default. Use `variant="filled"` for a filled background.

```svelte
<script lang="ts">
  import { Select } from "opui-css/svelte"
</script>

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

## Sizes

Choose between four sizes with the `size` prop: `x-small`, `small`, default and `large`.

```svelte
<script lang="ts">
  import { Select } from "opui-css/svelte"
</script>

<Select label="x-small" size="x-small">
  <option value="">x-small</option>
  <option>Option Two</option>
  <option>Option Three</option>
</Select>
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
<Select label="Large" size="large">
  <option value="">Large</option>
  <option>Option Two</option>
  <option>Option Three</option>
</Select>
```

## Dense

Use the `dense` prop to pack the options tighter.

```svelte
<script lang="ts">
  import { Select } from "opui-css/svelte"
</script>

<Select label="Fruit" dense>
  <option value="">-</option>
  <option>Apple</option>
  <option>Banana</option>
  <option>Cherry</option>
</Select>
```

## End text

Use `endText` for supporting text below the select.

```svelte
<script lang="ts">
  import { Select } from "opui-css/svelte"
</script>

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

Use the `prefix` and `suffix` snippets to affix icons or short text alongside the select inside the field's border.

```svelte
<script lang="ts">
  import { Select } from "opui-css/svelte"
</script>

<Select label="Currency">
  {#snippet prefix()}¤{/snippet}
  <option value="">-</option>
  <option>EUR</option>
  <option>SEK</option>
  <option>USD</option>
</Select>

<Select label="Country">
  {#snippet prefix()}<svg
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
    >{/snippet}
  <option value="">-</option>
  <option>Denmark</option>
  <option>Norway</option>
  <option>Sweden</option>
</Select>
```

## Header and footer

Use the `header` and `footer` snippets for short text or a link above and below the select, inside the field's border and set off by a divider.

They sit outside the list of options, so they can't filter it. Keep form controls out of them, since the select's `<label>` wraps them.

```svelte
<script lang="ts">
  import { Select } from "opui-css/svelte"
</script>

<Select label="Car">
  {#snippet header()}Company cars only{/snippet}
  {#snippet footer()}<a class="ui-link" href="#">Manage cars…</a>{/snippet}
  <option value="">-</option>
  <option>Kia EV6</option>
  <option>Volkswagen ID.4</option>
  <option>Volvo EX30</option>
</Select>
```

## Preselected

Set `value` or `bind:value` to preselect an option, or `selected: true` on an item.

```svelte
<script lang="ts">
  import { Select } from "opui-css/svelte"

  let role = $state("developer")
</script>

<Select
  label="Role"
  items={[
    { text: "Designer", value: "designer" },
    { text: "Developer", value: "developer" },
    { text: "Manager", value: "manager" },
  ]}
  bind:value={role}
/>

<Select
  label="Team"
  items={[
    { text: "Design", value: "design" },
    { selected: true, text: "Engineering", value: "engineering" },
    { text: "Sales", value: "sales" },
  ]}
/>
```

## Option groups

Wrap options in a `<div role="group">` and start it with a `<label class="ui-text">` to group them under a heading.

```svelte
<script lang="ts">
  import { Select } from "opui-css/svelte"
</script>

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
```

## Validation

- Add the `required` attribute on the component. It is forwarded to the underlying `<select>`.
- Use the `error` prop to toggle invalid styles. It sets `aria-invalid="true"` on the select, so screen readers announce it as invalid. Make use of the end text to give extra feedback on the error.
- Fields also get the invalid styles from the browser's own validation (`:user-invalid`), after the user has edited them. Use the `error` prop for server-side errors.

```svelte
<script lang="ts">
  import { Select } from "opui-css/svelte"
</script>

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

```svelte
<script lang="ts">
  import { Select } from "opui-css/svelte"
</script>

<Select spread>
  {#snippet label()}Country{/snippet}
  {#snippet description()}Select your country of residence{/snippet}
  <option value="">Select a country</option>
  <option>Denmark</option>
  <option>Finland</option>
  <option>Iceland</option>
  <option>Norway</option>
  <option>Sweden</option>
</Select>

<Select spread variant="filled">
  {#snippet label()}Language{/snippet}
  {#snippet description()}Choose your preferred language{/snippet}
  {#snippet endText()}This affects UI translations{/snippet}
  <option value="">Select a language</option>
  <option>Danish</option>
  <option>Finnish</option>
  <option>Icelandic</option>
  <option>Norwegian</option>
  <option>Swedish</option>
</Select>

<Select spread required>
  {#snippet label()}Required{/snippet}
  {#snippet description()}You must select an option{/snippet}
  <option value="">Select an option</option>
  <option>Option 1</option>
  <option>Option 2</option>
</Select>

<Select spread disabled>
  {#snippet label()}Disabled{/snippet}
  {#snippet description()}This select is disabled{/snippet}
  <option>Option 1</option>
</Select>

<Select spread error>
  {#snippet label()}Invalid Select{/snippet}
  {#snippet description()}This select has an error{/snippet}
  {#snippet endText()}Please select a valid option.{/snippet}
  <option>Option 1</option>
</Select>

<Select spread>
  {#snippet label()}Time zone{/snippet}
  {#snippet description()}Used for reminders and due dates{/snippet}
  {#snippet prefix()}UTC{/snippet}
  <option>-03:00</option>
  <option>+00:00</option>
  <option>+01:00</option>
  <option>+05:30</option>
  <option>+09:00</option>
</Select>

<Select spread variant="filled">
  {#snippet label()}Region{/snippet}
  {#snippet description()}Affects data residency and latency{/snippet}
  {#snippet prefix()}
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
  {/snippet}
  {#snippet endText()}Cannot be changed after deploy{/snippet}
  <option value="">-</option>
  <option>eu-north-1</option>
  <option>us-east-1</option>
  <option>ap-southeast-1</option>
</Select>
```

## Classic select

Bog-standard native HTML `<select>` without customized option list. Use it when the browser's own picker is all you need, and the Select above when the options need styles, icons or groups.

```svelte
<script lang="ts">
  import { ClassicSelect } from "opui-css/svelte"
</script>

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

| Prop                                                                                                                                                                           | Type                                         | Default      | Description                                                               |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- | ------------ | ------------------------------------------------------------------------- |
| `bind:value` **Needs hydration** The bound value only updates on the client. The native control still changes and submits with its form. Read the value from the form instead. | `string` , `number` , `(string \| number)[]` | -            | The selected value, or values with `multiple`.                            |
| `children`                                                                                                                                                                     | `Snippet`                                    | -            | Extra `<option>` and `<optgroup>` elements.                               |
| `dense`                                                                                                                                                                        | `boolean`                                    | `false`      | Packs the options tighter.                                                |
| `description`                                                                                                                                                                  | `string` , `Snippet`                         | -            | Description text displayed above the field.                               |
| `endText`                                                                                                                                                                      | `string` , `Snippet`                         | -            | Supporting text displayed below the field.                                |
| `error`                                                                                                                                                                        | `boolean`                                    | `false`      | Marks the control invalid and shows error styles.                         |
| `footer`                                                                                                                                                                       | `string` , `Snippet`                         | -            | Content below the select, inside the border, with a divider.              |
| `header`                                                                                                                                                                       | `string` , `Snippet`                         | -            | Content above the select, inside the border, with a divider.              |
| `id`                                                                                                                                                                           | `string`                                     | -            | The id of the `<select>`.                                                 |
| `items`                                                                                                                                                                        | `Item[]`                                     | `[]`         | The options, as `{ selected, text, value }` objects.                      |
| `label`                                                                                                                                                                        | `string` , `Snippet`                         | -            | The label for the field.                                                  |
| `prefix`                                                                                                                                                                       | `string` , `Snippet`                         | -            | Content at the inline-start of the field, inside the border.              |
| `size`                                                                                                                                                                         | `"x-small"` , `"small"` , `"large"`          | -            | The size of the element.                                                  |
| `spread`                                                                                                                                                                       | `boolean`                                    | `false`      | Pushes the label and description to one side and the select to the other. |
| `suffix`                                                                                                                                                                       | `string` , `Snippet`                         | -            | Content at the inline-end of the field, inside the border.                |
| `variant`                                                                                                                                                                      | `"outlined"` , `"filled"`                    | `"outlined"` | The variant to use.                                                       |

#### CSS variables

| Variable                     | Default                                                                                 | Description                                                                                                                                                                                                |
| ---------------------------- | --------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--disabled-opacity`         | `0.64`                                                                                  | Opacity applied to disabled controls.                                                                                                                                                                      |
| `--duration`                 | `0.2s`                                                                                  | Default transition duration. Multiplied by `--motion`.                                                                                                                                                     |
| `--ease`                     | `ease`                                                                                  | Default easing for transitions.                                                                                                                                                                            |
| `--field-border-color`       | `var(--border-color)`                                                                   | Border color for `TextField`, `Select`, `Textarea`, `Radio` and `Range`.                                                                                                                                   |
| `--field-border-radius`      | `var(--size-2)`                                                                         | Corner radius for fields.                                                                                                                                                                                  |
| `--field-border-width`       | `1px`                                                                                   | Border width for fields, `Checkbox`, `Radio` and `Switch`.                                                                                                                                                 |
| `--field-helper-color`       | `var(--text-muted)`                                                                     | Text color for helper and end text under a field.                                                                                                                                                          |
| `--field-helper-font-size`   | `var(--font-size-0)`                                                                    | Font size for helper and end text under a field.                                                                                                                                                           |
| `--field-helper-line-height` | `var(--font-lineheight-3)`                                                              | Line height for helper and end text under a field.                                                                                                                                                         |
| `--field-label-color`        | `var(--text-primary)`                                                                   | Text color for field labels.                                                                                                                                                                               |
| `--field-label-font-size`    | `var(--font-size-05)`                                                                   | Font size for field labels.                                                                                                                                                                                |
| `--field-label-font-weight`  | `var(--font-weight-semibold)`                                                           | Font weight for emphasized field labels and legends.                                                                                                                                                       |
| `--field-required-color`     | `var(--invalid-text-color)`                                                             | Color of the required asterisk.                                                                                                                                                                            |
| `--field-size`               | `var(--control-size)`                                                                   | Default field height.                                                                                                                                                                                      |
| `--field-size-large`         | `var(--control-size-large)`                                                             | Field height with `.ui-large`.                                                                                                                                                                             |
| `--field-size-small`         | `var(--control-size-small)`                                                             | Field height with `.ui-small`.                                                                                                                                                                             |
| `--field-size-x-small`       | `var(--control-size-x-small)`                                                           | Field height with `.ui-x-small`.                                                                                                                                                                           |
| `--focus-ring-color`         | Unset                                                                                   | Color of the keyboard focus ring. When unset, the ring uses the page background color inverted.                                                                                                            |
| `--focus-ring-inset`         | `calc(-1 * var(--focus-ring-width))`                                                    | Negative offset for focus rings drawn inside a control, such as `ButtonGroup`, `List` items and `Select` options.                                                                                          |
| `--focus-ring-offset`        | `2px`                                                                                   | Distance between a control and its focus ring.                                                                                                                                                             |
| `--focus-ring-style`         | `solid`                                                                                 | Outline style of the focus ring.                                                                                                                                                                           |
| `--focus-ring-width`         | `2px`                                                                                   | Width of the focus ring.                                                                                                                                                                                   |
| `--font-size-05`             | `0.875rem`                                                                              | A font size between Open Props `--font-size-0` and `--font-size-1`, used for labels and compact text.                                                                                                      |
| `--font-weight-medium`       | `var(--font-weight-5)`                                                                  | Font weight for badges, overlines and group labels.                                                                                                                                                        |
| `--icon-size`                | `var(--size-4)`                                                                         | Default icon size inside components.                                                                                                                                                                       |
| `--invalid-color`            | `var(--critical)`                                                                       | Color for invalid field borders, fills and outlines.                                                                                                                                                       |
| `--invalid-text-color`       | `light-dark( var(--invalid-color), oklch(from var(--invalid-color) max(l, 0.75) c h) )` | Color for validation messages and invalid labels. Lighter than `--invalid-color` in dark mode so the text stays readable.                                                                                  |
| `--motion`                   | `1`                                                                                     | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/svelte/guide/theming.md#motion). |
| `--primary`                  | `light-dark(var(--color-9), var(--color-6))`                                            | Brand color for primary actions and accents.                                                                                                                                                               |
| `--surface-default`          | `light-dark(var(--gray-1), var(--gray-13))`                                             | Page and card background.                                                                                                                                                                                  |
| `--surface-elevated`         | `light-dark(var(--gray-1), var(--gray-12))`                                             | Background of elevated cards and accordions.                                                                                                                                                               |
| `--surface-filled`           | `light-dark(var(--gray-4), var(--gray-15))`                                             | Background of filled areas such as progress tracks and table stripes.                                                                                                                                      |
| `--surface-tonal`            | `light-dark(var(--gray-3), var(--gray-12))`                                             | Background of tonal variants.                                                                                                                                                                              |
| `--text-muted`               | `light-dark(var(--gray-13), var(--gray-4))`                                             | Body text color.                                                                                                                                                                                           |
| `--text-primary`             | `light-dark(var(--gray-15), var(--gray-1))`                                             | Emphasized text color for headings, labels and values.                                                                                                                                                     |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/svelte/guide/theme-tokens.md) for the full list.

Attributes that aren't props, such as `disabled` or `name`, go to the `<select>`.

### Classic select API

| Prop                                                                                                                                                                           | Type                                         | Default      | Description                                       |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- | ------------ | ------------------------------------------------- |
| `bind:value` **Needs hydration** The bound value only updates on the client. The native control still changes and submits with its form. Read the value from the form instead. | `string` , `number` , `(string \| number)[]` | -            | The selected value, or values with `multiple`.    |
| `children`                                                                                                                                                                     | `Snippet`                                    | -            | Extra `<option>` and `<optgroup>` elements.       |
| `endText`                                                                                                                                                                      | `string`                                     | -            | Supporting text displayed below the field.        |
| `error`                                                                                                                                                                        | `boolean`                                    | `false`      | Marks the control invalid and shows error styles. |
| `id`                                                                                                                                                                           | `string`                                     | -            | The id of the `<select>`. Generated when omitted. |
| `items`                                                                                                                                                                        | `Item[]`                                     | `[]`         | The options, as `{ text, value }` objects.        |
| `label`                                                                                                                                                                        | `string`                                     | -            | The label for the field.                          |
| `size`                                                                                                                                                                         | `"x-small"` , `"small"` , `"large"`          | -            | The size of the element.                          |
| `variant`                                                                                                                                                                      | `"outlined"` , `"filled"`                    | `"outlined"` | The variant to use.                               |

#### CSS variables

| Variable                     | Default                                                                                 | Description                                                                                                                                                                                                |
| ---------------------------- | --------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--disabled-opacity`         | `0.64`                                                                                  | Opacity applied to disabled controls.                                                                                                                                                                      |
| `--duration`                 | `0.2s`                                                                                  | Default transition duration. Multiplied by `--motion`.                                                                                                                                                     |
| `--ease`                     | `ease`                                                                                  | Default easing for transitions.                                                                                                                                                                            |
| `--field-border-color`       | `var(--border-color)`                                                                   | Border color for `TextField`, `Select`, `Textarea`, `Radio` and `Range`.                                                                                                                                   |
| `--field-border-radius`      | `var(--size-2)`                                                                         | Corner radius for fields.                                                                                                                                                                                  |
| `--field-border-width`       | `1px`                                                                                   | Border width for fields, `Checkbox`, `Radio` and `Switch`.                                                                                                                                                 |
| `--field-helper-color`       | `var(--text-muted)`                                                                     | Text color for helper and end text under a field.                                                                                                                                                          |
| `--field-helper-font-size`   | `var(--font-size-0)`                                                                    | Font size for helper and end text under a field.                                                                                                                                                           |
| `--field-helper-line-height` | `var(--font-lineheight-3)`                                                              | Line height for helper and end text under a field.                                                                                                                                                         |
| `--field-label-color`        | `var(--text-primary)`                                                                   | Text color for field labels.                                                                                                                                                                               |
| `--field-label-font-size`    | `var(--font-size-05)`                                                                   | Font size for field labels.                                                                                                                                                                                |
| `--field-label-font-weight`  | `var(--font-weight-semibold)`                                                           | Font weight for emphasized field labels and legends.                                                                                                                                                       |
| `--field-required-color`     | `var(--invalid-text-color)`                                                             | Color of the required asterisk.                                                                                                                                                                            |
| `--field-size`               | `var(--control-size)`                                                                   | Default field height.                                                                                                                                                                                      |
| `--field-size-large`         | `var(--control-size-large)`                                                             | Field height with `.ui-large`.                                                                                                                                                                             |
| `--field-size-small`         | `var(--control-size-small)`                                                             | Field height with `.ui-small`.                                                                                                                                                                             |
| `--field-size-x-small`       | `var(--control-size-x-small)`                                                           | Field height with `.ui-x-small`.                                                                                                                                                                           |
| `--focus-ring-color`         | Unset                                                                                   | Color of the keyboard focus ring. When unset, the ring uses the page background color inverted.                                                                                                            |
| `--focus-ring-inset`         | `calc(-1 * var(--focus-ring-width))`                                                    | Negative offset for focus rings drawn inside a control, such as `ButtonGroup`, `List` items and `Select` options.                                                                                          |
| `--focus-ring-offset`        | `2px`                                                                                   | Distance between a control and its focus ring.                                                                                                                                                             |
| `--focus-ring-style`         | `solid`                                                                                 | Outline style of the focus ring.                                                                                                                                                                           |
| `--focus-ring-width`         | `2px`                                                                                   | Width of the focus ring.                                                                                                                                                                                   |
| `--font-size-05`             | `0.875rem`                                                                              | A font size between Open Props `--font-size-0` and `--font-size-1`, used for labels and compact text.                                                                                                      |
| `--font-weight-medium`       | `var(--font-weight-5)`                                                                  | Font weight for badges, overlines and group labels.                                                                                                                                                        |
| `--icon-size`                | `var(--size-4)`                                                                         | Default icon size inside components.                                                                                                                                                                       |
| `--invalid-color`            | `var(--critical)`                                                                       | Color for invalid field borders, fills and outlines.                                                                                                                                                       |
| `--invalid-text-color`       | `light-dark( var(--invalid-color), oklch(from var(--invalid-color) max(l, 0.75) c h) )` | Color for validation messages and invalid labels. Lighter than `--invalid-color` in dark mode so the text stays readable.                                                                                  |
| `--motion`                   | `1`                                                                                     | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/svelte/guide/theming.md#motion). |
| `--primary`                  | `light-dark(var(--color-9), var(--color-6))`                                            | Brand color for primary actions and accents.                                                                                                                                                               |
| `--surface-default`          | `light-dark(var(--gray-1), var(--gray-13))`                                             | Page and card background.                                                                                                                                                                                  |
| `--surface-elevated`         | `light-dark(var(--gray-1), var(--gray-12))`                                             | Background of elevated cards and accordions.                                                                                                                                                               |
| `--surface-filled`           | `light-dark(var(--gray-4), var(--gray-15))`                                             | Background of filled areas such as progress tracks and table stripes.                                                                                                                                      |
| `--surface-tonal`            | `light-dark(var(--gray-3), var(--gray-12))`                                             | Background of tonal variants.                                                                                                                                                                              |
| `--text-muted`               | `light-dark(var(--gray-13), var(--gray-4))`                                             | Body text color.                                                                                                                                                                                           |
| `--text-primary`             | `light-dark(var(--gray-15), var(--gray-1))`                                             | Emphasized text color for headings, labels and values.                                                                                                                                                     |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/svelte/guide/theme-tokens.md) for the full list.

Attributes that aren't props, such as `disabled` or `name`, go to the `<select>`.

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

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/svelte/guide/browser-support/?components=Select.md).

## Installation

Import the components from `opui-css/svelte`:

### Dependencies

- [Text Field](https://open-props-ui.netlify.app/svelte/components/text-field.md)
- [Description List](https://open-props-ui.netlify.app/svelte/components/description-list.md)

- `opui-css/css/components/text-field.css`
- `opui-css/css/components/select.css`
- `opui-css/css/components/list.css`

## See also

- [Customizable select (MDN)](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Customizable_select)

## Changelog

### What's new

- The chevron flips when the [picker](#variants) opens.
- [x-small and large](#sizes) sizes with the `size` prop.
- [Spread](#spread) fields line up at one width.
- [Preselect](#preselected) options with `value` or `selected` on an item.
- The arrow is a chevron, also on the [classic select](#classic-select).
