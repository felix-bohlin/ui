# Textarea

**Vue.** Import components from `opui-css/vue`. Props and named slots follow the same API as in the Astro sections below; static HTML notes describe class-based markup when you are not using Vue components.

### What's new

- [X-small and large](#sizes) sizes. Breaking: `size="small"` replaces `small`.
- [Spread](#spread) fields line up at one width.
- Breaking: `style` goes to the label instead of the textarea.
- Breaking: [`variant="filled"`](#variants) replaces the boolean `filled`.
- Breaking: no generated input `id`. Pass `id` when something outside the component references the input.

## Anatomy

Label Description  ¢ EUR Header Footer Supporting text

- `<Textarea>`

  Container element.

- `v-slot:label`

  The label for the field.

- `v-slot:description`

  Description text displayed above the field.

- `.ui-field`

  The boxed textarea area.

- `v-slot:header`

  Content above the textarea, inside the border, with a divider.

- `v-slot:prefix`

  Content at the inline-start of the field, inside the border.

- `v-model`

  The textarea element.

- `v-slot:suffix`

  Content at the inline-end of the field, inside the border.

- `v-slot:footer`

  Content below the textarea, inside the border, with a divider.

- `v-slot:end-text`

  Supporting text displayed below the field.

## Variants

Textareas are outlined by default. Set `variant="filled"` for a filled textarea.

```vue
<script setup lang="ts">
import { Textarea } from "opui-css/vue"
</script>


<template>
  <Textarea label="Default" placeholder="Placeholder" />
  <Textarea label="Filled" placeholder="Placeholder" variant="filled" />
</template>
```

## Sizes

```vue
<script setup lang="ts">
import { Textarea } from "opui-css/vue"
</script>


<template>
  <Textarea label="X-small" placeholder="Placeholder" size="x-small" />
  <Textarea label="Small" placeholder="Placeholder" size="small" />
  <Textarea label="Default" placeholder="Placeholder" />
  <Textarea label="Large" placeholder="Placeholder" size="large" />
</template>
```

## End text

```vue
<script setup lang="ts">
import { Textarea } from "opui-css/vue"
</script>


<template>
  <Textarea label="Label" placeholder="Default" endText="Supporting text" />
  <Textarea
    label="Label"
    placeholder="Filled"
    endText="Supporting text"
    variant="filled"
  />
</template>
```

## Affix

Use the `prefix`, `suffix`, `header`, and `footer` slots to affix content inside the textarea's border. Header and footer are particularly useful for filenames and character counters.

```vue
<script setup lang="ts">
import { Textarea } from "opui-css/vue"
</script>


<template>
  <Textarea label="Notes" placeholder="Add a note...">
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
        <path
          d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
        ></path>
        <path
          d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
        ></path></svg
    ></template>
  </Textarea>
</template>
```

### Headers and footers

```vue
<script setup lang="ts">
import { Textarea } from "opui-css/vue"
</script>


<template>
  <Textarea label="Code" placeholder="console.log('Hello, world!')">
    <template #header>script.js</template>
  </Textarea>


  <Textarea label="Comment" placeholder="Write a comment...">
    <template #footer>0 / 280</template>
  </Textarea>
</template>
```

## Validation

Add the `required` attribute on the component. It is forwarded to the underlying `<textarea>`.

Use the `error` prop to toggle invalid styles. It renders `data-invalid` on the root element. Make use of the end text to give extra feedback on the error.

```vue
<script setup lang="ts">
import { Textarea } from "opui-css/vue"
</script>


<template>
  <div class="example-row">
    <Textarea label="Label" placeholder="Default" required />
    <Textarea label="Label" placeholder="Filled" required variant="filled" />
  </div>


  <div class="example-row">
    <Textarea
      label="Label"
      placeholder="Default"
      endText="Only double-negatives are allowed."
      error
    />
    <Textarea
      label="Label"
      placeholder="Filled"
      endText="Only letters from the first half of the alphabet are allowed."
      error
      variant="filled"
    />
  </div>
</template>
```

## Spread

Use the `spread` boolean prop to display the label and description on the left with the textarea on the right. The layout collapses to a column on narrow containers.

```vue
<script setup lang="ts">
import { Textarea } from "opui-css/vue"
</script>


<template>
  <Textarea spread placeholder="Hello, world!">
    <template #label>Message</template>
    <template #description
      >You can write your message here. Keep it short, preferably under 100
      characters.</template
    >
  </Textarea>


  <Textarea spread placeholder="Additional notes..." variant="filled">
    <template #label>Notes</template>
    <template #description>Add any additional notes or comments</template>
    <template #end-text>Maximum 500 characters</template>
  </Textarea>


  <Textarea spread required label="Required">
    <template #description>You must provide a response</template>
  </Textarea>


  <Textarea spread disabled label="Disabled">
    <template #description>This textarea is disabled</template>
  </Textarea>


  <Textarea spread error label="Invalid Message">
    <template #description>This textarea has an error</template>
    <template #end-text>This value is too short.</template>
  </Textarea>


  <Textarea spread label="Bio" placeholder="Tell us about yourself...">
    <template #description>Shown on your public profile</template>
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
        <path
          d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
        ></path>
        <path
          d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
        ></path>
      </svg>
    </template>
    <template #footer>280 characters left</template>
  </Textarea>


  <Textarea
    spread
    variant="filled"
    label="Release notes"
    placeholder="Markdown supported..."
  >
    <template #description>Shown on the changelog page</template>
    <template #header>v1.4.0</template>
    <template #footer>Saved 2 minutes ago</template>
    <template #end-text>Drafts are auto-saved</template>
  </Textarea>
</template>
```

## Auto-fit

When enabled the Field changes size depending on its content.

```vue
<script setup lang="ts">
import { Textarea } from "opui-css/vue"
</script>


<template>
  <Textarea label="Auto-fit" placeholder="Auto-fit" autoFit />
</template>
```

## API

### Textarea API

| Prop          | Type                                | Default      | Description                                                                 |
| ------------- | ----------------------------------- | ------------ | --------------------------------------------------------------------------- |
| `autoFit`     | `boolean`                           | `false`      | Changes height depending on its content.                                    |
| `description` | `string`                            | -            | Description text displayed above the field.                                 |
| `endText`     | `string`                            | -            | Supporting text displayed below the field.                                  |
| `error`       | `boolean`                           | `false`      | Shows error styles.                                                         |
| `id`          | `string`                            | -            | The id of the `<textarea>`.                                                 |
| `label`       | `string`                            | -            | The label for the field.                                                    |
| `size`        | `"x-small"` , `"small"` , `"large"` | -            | The size of the element.                                                    |
| `spread`      | `boolean`                           | `false`      | Pushes the label and description to one side and the textarea to the other. |
| `v-model`     | `string`                            | -            | The textarea value.                                                         |
| `variant`     | `"outlined"` , `"filled"`           | `"outlined"` | The variant to use.                                                         |

#### Slots

| Slot              | Description                                                    |
| ----------------- | -------------------------------------------------------------- |
| `default`         | Extra content inside the root.                                 |
| `description`     | Description text displayed above the field.                    |
| `end-text`        | Supporting text displayed below the field.                     |
| `footer`          | Content below the textarea, inside the border, with a divider. |
| `header`          | Content above the textarea, inside the border, with a divider. |
| `label`           | The label for the field.                                       |
| `prefix`          | Content at the inline-start of the field, inside the border.   |
| `suffix`          | Content at the inline-end of the field, inside the border.     |
| `supporting-text` | Legacy alias of the `end-text` slot.                           |

#### CSS variables

| Variable                     | Default                                                                                 | Description                                                                                                                |
| ---------------------------- | --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `--border-width`             | `1px`                                                                                   | Default border width for components that draw a border.                                                                    |
| `--disabled-opacity`         | `0.64`                                                                                  | Opacity applied to disabled controls.                                                                                      |
| `--duration`                 | `0.2s`                                                                                  | Default transition duration. Multiplied by `--motion`.                                                                     |
| `--ease`                     | `ease`                                                                                  | Default easing for transitions.                                                                                            |
| `--field-border-color`       | `var(--border-color)`                                                                   | Border color for `TextField`, `Select`, `Textarea`, `Radio` and `Range`.                                                   |
| `--field-border-radius`      | `var(--size-2)`                                                                         | Corner radius for fields.                                                                                                  |
| `--field-border-width`       | `1px`                                                                                   | Border width for fields, `Checkbox`, `Radio` and `Switch`.                                                                 |
| `--field-helper-color`       | `var(--text-muted)`                                                                     | Text color for helper and end text under a field.                                                                          |
| `--field-helper-font-size`   | `var(--font-size-0)`                                                                    | Font size for helper and end text under a field.                                                                           |
| `--field-helper-line-height` | `var(--font-lineheight-3)`                                                              | Line height for helper and end text under a field.                                                                         |
| `--field-label-color`        | `var(--text-primary)`                                                                   | Text color for field labels.                                                                                               |
| `--field-label-font-size`    | `var(--font-size-05)`                                                                   | Font size for field labels.                                                                                                |
| `--field-label-font-weight`  | `var(--font-weight-semibold)`                                                           | Font weight for emphasized field labels and legends.                                                                       |
| `--field-required-color`     | `var(--invalid-text-color)`                                                             | Color of the required asterisk.                                                                                            |
| `--field-size`               | `var(--control-size)`                                                                   | Default field height.                                                                                                      |
| `--field-size-large`         | `var(--control-size-large)`                                                             | Field height with `.ui-large`.                                                                                             |
| `--field-size-small`         | `var(--control-size-small)`                                                             | Field height with `.ui-small`.                                                                                             |
| `--field-size-x-small`       | `var(--control-size-x-small)`                                                           | Field height with `.ui-x-small`.                                                                                           |
| `--focus-ring-width`         | `2px`                                                                                   | Width of the focus ring.                                                                                                   |
| `--font-size-05`             | `0.875rem`                                                                              | A font size between Open Props `--font-size-0` and `--font-size-1`, used for labels and compact text.                      |
| `--icon-size`                | `var(--size-4)`                                                                         | Default icon size inside components.                                                                                       |
| `--invalid-color`            | `var(--critical)`                                                                       | Color for invalid field borders, fills and outlines.                                                                       |
| `--invalid-text-color`       | `light-dark( var(--invalid-color), oklch(from var(--invalid-color) max(l, 0.75) c h) )` | Color for validation messages and invalid labels. Lighter than `--invalid-color` in dark mode so the text stays readable.  |
| `--motion`                   | `1`                                                                                     | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. |
| `--primary`                  | `light-dark(var(--color-9), var(--color-6))`                                            | Brand color for primary actions and accents.                                                                               |
| `--surface-default`          | `light-dark(var(--gray-1), var(--gray-13))`                                             | Page and card background.                                                                                                  |
| `--surface-tonal`            | `light-dark(var(--gray-3), var(--gray-12))`                                             | Background of tonal variants.                                                                                              |
| `--text-muted`               | `light-dark(var(--gray-13), var(--gray-4))`                                             | Body text color.                                                                                                           |
| `--text-primary`             | `light-dark(var(--gray-15), var(--gray-1))`                                             | Emphasized text color for headings, labels and values.                                                                     |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/vue/guide/theme-tokens.md) for the full list.

Attributes that aren't props, such as `placeholder` or `rows`, go to the `<textarea>`.

## Under the hood

1. Field

   - Same wrapper and field box as the text field
   - `rows` fixes the height, the content scrolls

2. Grow

   - `field-sizing: content` sizes the box to its text
   - Type a few lines: it grows, delete them: it shrinks
   - No resize observer, no JavaScript

3. Limits

   - `lh` is one line of the textarea's own text
   - At least three lines plus padding, so an empty field still looks like a textarea
   - `--max-block-size` overrides the 20 line cap, then it scrolls

4. Auto-fit

   - Without a fixed width, `field-sizing` grows sideways too
   - `min-inline-size: 25ch` keeps short text from collapsing the box
   - `resize: both` once the width is free

Step 1 of 4: Field

- [\<textarea> ](https://webstatus.dev/features/textarea)(Widely available): Chrome 1+, Edge 12+, Firefox 1+, Safari not supported

```html
<label class="textarea">
  <span class="label">Notes</span>
  <span class="field">
    <textarea rows="2">…</textarea>
  </span>
</label>
```

```css
.textarea {
  display: grid;
}


.label {
  font-size: var(--font-size-05);
  font-weight: 600;
  margin-block-end: 0.25rem;
}


.field {
  background-color: var(--surface-default);
  border: 1px solid var(--field-border-color);
  border-radius: var(--radius-2);
  display: grid;
}


.field textarea {
  background: transparent;
  border: 0;
  color: var(--text-primary);
  font: inherit;
  inline-size: 100%;
  line-height: 1.5;
  outline: 0;
  padding: 0.5rem;
}


.textarea:focus-within .field {
  border-color: var(--primary);
}
```

Step 2 of 4: Grow

- [`field-sizing` ](https://webstatus.dev/features/field-sizing)(Newly available): Chrome 123+, Edge 123+, Firefox 152+, Safari 26.2+

```css
.field textarea {
  block-size: auto;
  field-sizing: content;
}
```

Step 3 of 4: Limits

- [lh unit ](https://webstatus.dev/features/lh)(Widely available): Chrome 109+, Edge 109+, Firefox 120+, Safari 16.4+

```css
.field textarea {
  max-block-size: var(--max-block-size, 20lh);
  min-block-size: calc(0.5rem * 2 + 3lh);
  resize: vertical;
}
```

Step 4 of 4: Auto-fit

```css
.auto-fit {
  inline-size: fit-content;
}


.auto-fit textarea {
  inline-size: auto;
  min-inline-size: 25ch;
  resize: both;
}
```

## Browser support

- Chromium: Full support Supported since v125.
- Firefox: Full support Supported since v152.
- Safari: Full support Supported since v26.2.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/vue/guide/browser-support/?components=Textarea.md).

## Installation

### Dependencies

- [Text Field](https://open-props-ui.netlify.app/vue/components/text-field.md)

- `opui-css/css/components/text-field.css`
- `opui-css/css/components/textarea.css`

