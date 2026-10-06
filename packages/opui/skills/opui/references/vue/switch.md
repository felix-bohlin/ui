# Switch

Use a Switch for a setting that applies right away. Use a [Checkbox](https://open-props-ui.netlify.app/vue/components/checkbox.md) for choices that are submitted with a form, and a [Toggle](https://open-props-ui.netlify.app/vue/components/toggle.md) for options in a toolbar. See also: [Switch field group](#field-group).

**Vue.** Import components from `opui-css/vue`. Props and named slots follow the same API as in the Astro sections below; static HTML notes describe class-based markup when you are not using Vue components.

### What's new

- Breaking: [`size="small"`](#sizes) replaces `small`.
- [Lines up](#label-alignment) with the first line of the label and centers on its capitals in any font.
- Without a visible label, switches center in table cells and lines of text.

## Anatomy

Theme Label End text

- `<Switch>`

  Container element.

- `v-model`

  The switch input.

- `v-slot:icon-unchecked`

  An optional icon in the thumb when unchecked.

- `v-slot:icon-checked`

  An optional icon in the thumb when checked.

- `v-slot:default`

  The label.

- `v-slot:end-text`

  Supporting text displayed below the label.

## Basics

All switches should have an accessible name. Put the label text inside the component, also when there's no visible label: use `.ui-sr-only` instead of `.ui-label`, or the `hideLabel` prop in Astro and Vue.

```vue
<script setup lang="ts">
import { Switch } from "opui-css/vue"
</script>


<template>
  <Switch name="switch-variants" checked hideLabel>Label</Switch>
  <Switch name="switch-variants" hideLabel>Label</Switch>
  <Switch name="switch-variants" checked disabled hideLabel>Label</Switch>
  <Switch name="switch-variants" disabled hideLabel>Label</Switch>
</template>
```

## Sizes

Set `size="small"` for a smaller Switch variant.

```vue
<script setup lang="ts">
import { Switch } from "opui-css/vue"
</script>


<template>
  <div class="example-row">
    <Switch name="switch-sizes" size="small" checked hideLabel>Small</Switch>
    <Switch name="switch-sizes" checked hideLabel>Default</Switch>
  </div>
  <div class="example-row">
    <Switch name="switch-sizes" size="small" checked>Small</Switch>
    <Switch name="switch-sizes" checked>Default</Switch>
  </div>
</template>
```

## Visible label

Render the label text inside an element with a `.ui-label` class. Also, don't miss the info on label [accessibility](#accessibility).

```vue
<script setup lang="ts">
import { Switch } from "opui-css/vue"
</script>


<template>
  <Switch name="switch-visible-label">Label</Switch>
  <Switch name="switch-visible-label" disabled>Disabled</Switch>
  <Switch name="switch-visible-label">
    Long text bacon ipsum dolor amet prosciutto tenderloin biltong leberkas
    ribeye short ribs shankle tri-tip doner buffalo chislic meatloaf meatball.
  </Switch>
</template>
```

### Label position

```vue
<script setup lang="ts">
import { Switch } from "opui-css/vue"
</script>


<template>
  <Switch name="switch-label-position">Default</Switch>
  <Switch name="switch-label-position" stack>Stack</Switch>
</template>
```

### End text

```vue
<script setup lang="ts">
import { Switch } from "opui-css/vue"
</script>


<template>
  <Switch name="switch-supporting-text">
    Default
    <template #end-text>Supporting text</template>
  </Switch>
  <Switch name="switch-supporting-text" stack>
    Stack
    <template #end-text>Supporting text</template>
  </Switch>
</template>
```

### Validation

- Add the `required` attribute on the component. It is forwarded to the underlying `<input>`.
- Use the `error` prop to toggle invalid styles. It renders `data-invalid` on the root element. Make use of the end text to give extra feedback on the error.

```vue
<script setup lang="ts">
import { Switch } from "opui-css/vue"
</script>


<template>
  <div class="example-row ui-spacious">
    <Switch name="switch-validation" required>Default</Switch>
    <Switch name="switch-validation" required stack>Stack</Switch>
  </div>


  <div class="example-row ui-spacious">
    <Switch name="switch-validation" error>
      Default
      <template #end-text>Supporting text</template>
    </Switch>
    <Switch name="switch-validation" error stack>
      Stack
      <template #end-text>Supporting text</template>
    </Switch>
  </div>
</template>
```

## Icons

```vue
<script setup lang="ts">
import { Switch } from "opui-css/vue"
</script>


<template>
  <Switch name="switch-icons" size="small" hideLabel>
    Toggle theme
    <template #icon-unchecked
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M20.026 17.001c-2.762 4.784-8.879 6.423-13.663 3.661A10 10 0 0 1 3.13 17.68a.75.75 0 0 1 .365-1.132c3.767-1.348 5.785-2.91 6.956-5.146c1.233-2.353 1.551-4.93.689-8.463a.75.75 0 0 1 .769-.927a9.96 9.96 0 0 1 4.457 1.327c4.784 2.762 6.423 8.879 3.66 13.662"
        ></path></svg
    ></template>
    <template #icon-checked
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M12 2a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 12 2m5 10a5 5 0 1 1-10 0a5 5 0 0 1 10 0m4.25.75a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5zM12 19a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 12 19m-7.75-6.25a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5zm-.03-8.53a.75.75 0 0 1 1.06 0l1.5 1.5a.75.75 0 0 1-1.06 1.06l-1.5-1.5a.75.75 0 0 1 0-1.06m1.06 15.56a.75.75 0 1 1-1.06-1.06l1.5-1.5a.75.75 0 1 1 1.06 1.06zm14.5-15.56a.75.75 0 0 0-1.06 0l-1.5 1.5a.75.75 0 0 0 1.06 1.06l1.5-1.5a.75.75 0 0 0 0-1.06m-1.06 15.56a.75.75 0 1 0 1.06-1.06l-1.5-1.5a.75.75 0 1 0-1.06 1.06z"
        ></path></svg
    ></template>
  </Switch>


  <Switch name="switch-icons" checked hideLabel>
    Toggle theme
    <template #icon-unchecked
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M20.026 17.001c-2.762 4.784-8.879 6.423-13.663 3.661A10 10 0 0 1 3.13 17.68a.75.75 0 0 1 .365-1.132c3.767-1.348 5.785-2.91 6.956-5.146c1.233-2.353 1.551-4.93.689-8.463a.75.75 0 0 1 .769-.927a9.96 9.96 0 0 1 4.457 1.327c4.784 2.762 6.423 8.879 3.66 13.662"
        ></path></svg
    ></template>
    <template #icon-checked
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M12 2a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 12 2m5 10a5 5 0 1 1-10 0a5 5 0 0 1 10 0m4.25.75a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5zM12 19a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 12 19m-7.75-6.25a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5zm-.03-8.53a.75.75 0 0 1 1.06 0l1.5 1.5a.75.75 0 0 1-1.06 1.06l-1.5-1.5a.75.75 0 0 1 0-1.06m1.06 15.56a.75.75 0 1 1-1.06-1.06l1.5-1.5a.75.75 0 1 1 1.06 1.06zm14.5-15.56a.75.75 0 0 0-1.06 0l-1.5 1.5a.75.75 0 0 0 1.06 1.06l1.5-1.5a.75.75 0 0 0 0-1.06m-1.06 15.56a.75.75 0 1 0 1.06-1.06l-1.5-1.5a.75.75 0 1 0-1.06 1.06z"
        ></path></svg
    ></template>
  </Switch>
</template>
```

## Spread

Use the `spread` prop to push the label to the left and the switch to the right. This is useful for full-width items like lists and menus.

```vue
<script setup lang="ts">
import { Switch } from "opui-css/vue"
</script>


<template>
  <Switch name="switch-spread" spread>
    Notifications
    <template #end-text>Receive alerts when someone mentions you.</template>
  </Switch>


  <Switch name="switch-spread" spread required>
    Required
    <template #end-text>You must accept this to proceed.</template>
  </Switch>


  <Switch name="switch-spread" spread disabled>
    Disabled
    <template #end-text>This switch is disabled.</template>
  </Switch>


  <Switch name="switch-spread" spread error>
    Invalid Switch
    <template #end-text>There is an error with this switch.</template>
  </Switch>
</template>
```

## Label alignment

The switch lines up with the first line of its label and centers on the label's capital letters, so it looks centered in any font and at any size. If a font still looks off, nudge the label with `--choice-label-offset`, in `em` or `cap` so it scales with the label.

```css
:root {
  --choice-label-offset: 0.05em;
}
```

## Field group

Use field groups to group related switches.

The `name` prop will get passed down to each switch in the group.

See also: [Form documentation](https://open-props-ui.netlify.app/vue/components/form.md).

```vue
<script setup lang="ts">
import { FieldGroup, FieldLegend, FieldSet, Form, Switch } from "opui-css/vue"
</script>


<template>
  <Form as="div">
    <FieldSet>
      <FieldLegend>Legend</FieldLegend>
      <FieldGroup name="switch-group">
        <Switch>Switch 1</Switch>
        <Switch>Switch 2</Switch>
        <Switch>Switch 3</Switch>
      </FieldGroup>
    </FieldSet>
  </Form>
</template>
```

### Direction

```vue
<script setup lang="ts">
import { FieldGroup, FieldLegend, FieldSet, Form, Switch } from "opui-css/vue"
</script>


<template>
  <Form>
    <FieldSet>
      <FieldLegend>Legend</FieldLegend>
      <FieldGroup direction="row" name="switch-group-direction">
        <Switch>Switch 1</Switch>
        <Switch>Switch 2</Switch>
        <Switch>Switch 3</Switch>
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
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
  Form,
  Switch,
} from "opui-css/vue"
</script>


<template>
  <Form>
    <FieldSet>
      <FieldLegend>Legend</FieldLegend>
      <FieldDescription>Field description above fields</FieldDescription>
      <FieldGroup direction="row" name="switch-group-field-description-1">
        <Switch>Switch 1</Switch>
        <Switch>Switch 2</Switch>
        <Switch>Switch 3</Switch>
      </FieldGroup>
    </FieldSet>


    <FieldSet>
      <FieldLegend>Legend</FieldLegend>
      <FieldGroup direction="row" name="switch-group-field-description-2">
        <Switch>Switch 1</Switch>
        <Switch>Switch 2</Switch>
        <Switch>Switch 3</Switch>
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
import { FieldGroup, FieldLegend, FieldSet, Form, Switch } from "opui-css/vue"
</script>


<template>
  <Form>
    <FieldSet disabled>
      <FieldLegend>Legend</FieldLegend>
      <FieldGroup direction="row" name="switch-group-disabled">
        <Switch>Switch 1</Switch>
        <Switch>Switch 2</Switch>
        <Switch>Switch 3</Switch>
      </FieldGroup>
    </FieldSet>
  </Form>
</template>
```

### Required

Attach the `required` attribute to at least one of your `<input>` elements.

```vue
<script setup lang="ts">
import { FieldGroup, FieldLegend, FieldSet, Form, Switch } from "opui-css/vue"
</script>


<template>
  <Form>
    <FieldSet>
      <FieldLegend>These are required!</FieldLegend>
      <FieldGroup direction="row" name="switch-group-required">
        <Switch required>Switch 1</Switch>
        <Switch required>Switch 2</Switch>
        <Switch required>Switch 3</Switch>
      </FieldGroup>
    </FieldSet>
  </Form>
</template>
```

### Validation

Attach the `data-invalid` attribute to your `FieldSet` component.

```vue
<script setup lang="ts">
import { FieldGroup, FieldLegend, FieldSet, Form, Switch } from "opui-css/vue"
</script>


<template>
  <Form>
    <FieldSet data-invalid>
      <FieldLegend>Legend</FieldLegend>
      <FieldGroup direction="row" name="switch-field-group-validation">
        <Switch>Switch 1</Switch>
        <Switch>Switch 2</Switch>
        <Switch>Switch 3</Switch>
      </FieldGroup>
      <span class="ui-end-text">Something went wrong!</span>
    </FieldSet>
  </Form>
</template>
```

## Accessibility

### Role & attributes

| Role/attribute  | Usage                                                                            |
| --------------- | -------------------------------------------------------------------------------- |
| `role="switch"` | Required on the `input` element. Identifies the element that serves as a switch. |

### Labels

Accessible switches should have a label. The first two approaches are equally ok:

| Approach                                                       | Usage in Switch component                                                                                                                                                                                                        |
| -------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Provide a label inside the element                             | Use a `.ui-label` child for a [visible label](#visible-label), or a `.ui-sr-only` child to hide it visually while keeping it accessible. In Astro and Vue, set the `hideLabel` prop to render the slot content as `.ui-sr-only`. |
| Add an `aria-label` on the input                               | Not used. Use a `.ui-sr-only` label instead, also for icon-only switches.                                                                                                                                                        |
| Have a visible label that you reference with `aria-labelledby` | Not used.                                                                                                                                                                                                                        |

### Keyboard support

| Key     | Function                                     |
| ------- | -------------------------------------------- |
| `Space` | When Switch is focused it changes its state. |

## API

### Switch API

| Prop        | Type                                | Default | Description                                          |
| ----------- | ----------------------------------- | ------- | ---------------------------------------------------- |
| `error`     | `boolean`                           | `false` | Shows error styles.                                  |
| `hideLabel` | `boolean`                           | `false` | Visually hides the label.                            |
| `size`      | `"small"`                           | -       | The size of the element.                             |
| `spread`    | `boolean`                           | `false` | Pushes the label and the switch to opposite ends.    |
| `stack`     | `boolean`                           | `false` | Stacks the label under the switch.                   |
| `v-model`   | `boolean` , `(string` , `number)[]` | -       | The checked state, or the checked values of a group. |

#### Slots

| Slot             | Description                                   |
| ---------------- | --------------------------------------------- |
| `default`        | The label.                                    |
| `end-text`       | Supporting text displayed below the label.    |
| `icon-checked`   | An optional icon in the thumb when checked.   |
| `icon-unchecked` | An optional icon in the thumb when unchecked. |

#### CSS variables

| Variable                      | Default                                                                                 | Description                                                                                                                                           |
| ----------------------------- | --------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--choice-label-offset`       | `0px`                                                                                   | Moves `Checkbox`, `Radio` and `Switch` labels down (positive) or up (negative) against their control. Use `em` or `cap` to scale with the label font. |
| `--disabled-opacity`          | `0.64`                                                                                  | Opacity applied to disabled controls.                                                                                                                 |
| `--duration`                  | `0.2s`                                                                                  | Default transition duration. Multiplied by `--motion`.                                                                                                |
| `--ease`                      | `ease`                                                                                  | Default easing for transitions.                                                                                                                       |
| `--field-border-width`        | `1px`                                                                                   | Border width for fields, `Checkbox`, `Radio` and `Switch`.                                                                                            |
| `--field-helper-color`        | `var(--text-muted)`                                                                     | Text color for helper and end text under a field.                                                                                                     |
| `--field-helper-font-size`    | `var(--font-size-0)`                                                                    | Font size for helper and end text under a field.                                                                                                      |
| `--field-helper-line-height`  | `var(--font-lineheight-3)`                                                              | Line height for helper and end text under a field.                                                                                                    |
| `--field-label-color`         | `var(--text-primary)`                                                                   | Text color for field labels.                                                                                                                          |
| `--field-label-font-size`     | `var(--font-size-05)`                                                                   | Font size for field labels.                                                                                                                           |
| `--field-label-font-weight`   | `var(--font-weight-semibold)`                                                           | Font weight for emphasized field labels and legends.                                                                                                  |
| `--field-required-color`      | `var(--invalid-text-color)`                                                             | Color of the required asterisk.                                                                                                                       |
| `--focus-ring-color`          | Unset                                                                                   | Color of the keyboard focus ring. When unset, the ring uses the page background color inverted.                                                       |
| `--focus-ring-offset`         | `2px`                                                                                   | Distance between a control and its focus ring.                                                                                                        |
| `--focus-ring-style`          | `solid`                                                                                 | Outline style of the focus ring.                                                                                                                      |
| `--focus-ring-width`          | `2px`                                                                                   | Width of the focus ring.                                                                                                                              |
| `--invalid-color`             | `var(--critical)`                                                                       | Color for invalid field borders, fills and outlines.                                                                                                  |
| `--invalid-text-color`        | `light-dark( var(--invalid-color), oklch(from var(--invalid-color) max(l, 0.75) c h) )` | Color for validation messages and invalid labels. Lighter than `--invalid-color` in dark mode so the text stays readable.                             |
| `--motion`                    | `1`                                                                                     | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`.                            |
| `--primary`                   | `light-dark(var(--color-9), var(--color-6))`                                            | Brand color for primary actions and accents.                                                                                                          |
| `--primary-contrast`          | `oklch( from var(--primary) clamp(0.15, (0.565 - l) * 1000, 0.98) calc(c * 0.15) h )`   | Text color on a `--primary` background.                                                                                                               |
| `--switch-dot-size`           | `var(--size-3)`                                                                         | Diameter of the `Switch` dot.                                                                                                                         |
| `--switch-dot-size-small`     | `0.75rem`                                                                               | Diameter of the `Switch` dot with `.ui-small` and inside `List`.                                                                                      |
| `--switch-track-height`       | `var(--size-5)`                                                                         | Height of the `Switch` track.                                                                                                                         |
| `--switch-track-height-small` | `var(--size-4)`                                                                         | Height of the `Switch` track with `.ui-small` and inside `List`.                                                                                      |
| `--switch-track-width`        | `var(--size-8)`                                                                         | Width of the `Switch` track.                                                                                                                          |
| `--switch-track-width-small`  | `2.5rem`                                                                                | Width of the `Switch` track with `.ui-small` and inside `List`.                                                                                       |
| `--text-primary`              | `light-dark(var(--gray-15), var(--gray-1))`                                             | Emphasized text color for headings, labels and values.                                                                                                |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/vue/guide/theme-tokens.md) for the full list.

Attributes that aren't props, such as `disabled` or `name`, go to the `<input>`. Without a visible label, keep the text in the slot and set `hideLabel`.

### Field group API

| Prop        | Type                 | Default | Description                                                                                                                        |
| ----------- | -------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `direction` | `"row"` , `"column"` | -       | The orientation of the element.                                                                                                    |
| `name`      | `string`             | -       | Sets `name` on the fields inside. Skips button, hidden, image, reset and submit inputs. In Solid and Vue, only on OPUI components. |

#### Slots

| Slot      | Description                                         |
| --------- | --------------------------------------------------- |
| `default` | The fields, such as checkboxes, radios or switches. |

#### CSS variables

| Variable                     | Default                                                                                 | Description                                                                                                               |
| ---------------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `--disabled-opacity`         | `0.64`                                                                                  | Opacity applied to disabled controls.                                                                                     |
| `--field-helper-color`       | `var(--text-muted)`                                                                     | Text color for helper and end text under a field.                                                                         |
| `--field-helper-font-size`   | `var(--font-size-0)`                                                                    | Font size for helper and end text under a field.                                                                          |
| `--field-helper-line-height` | `var(--font-lineheight-3)`                                                              | Line height for helper and end text under a field.                                                                        |
| `--field-label-color`        | `var(--text-primary)`                                                                   | Text color for field labels.                                                                                              |
| `--field-label-font-weight`  | `var(--font-weight-semibold)`                                                           | Font weight for emphasized field labels and legends.                                                                      |
| `--field-required-color`     | `var(--invalid-text-color)`                                                             | Color of the required asterisk.                                                                                           |
| `--focus-ring-width`         | `2px`                                                                                   | Width of the focus ring.                                                                                                  |
| `--font-size-05`             | `0.875rem`                                                                              | A font size between Open Props `--font-size-0` and `--font-size-1`, used for labels and compact text.                     |
| `--invalid-color`            | `var(--critical)`                                                                       | Color for invalid field borders, fills and outlines.                                                                      |
| `--invalid-text-color`       | `light-dark( var(--invalid-color), oklch(from var(--invalid-color) max(l, 0.75) c h) )` | Color for validation messages and invalid labels. Lighter than `--invalid-color` in dark mode so the text stays readable. |
| `--text-muted`               | `light-dark(var(--gray-13), var(--gray-4))`                                             | Body text color.                                                                                                          |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/vue/guide/theme-tokens.md) for the full list.

## Under the hood

1. Track

   - A checkbox with `role="switch"`: announced as on/off, same form value
   - `appearance: none` frees both pseudo-elements, `::before` is the track
   - `light-dark()` picks the colors per color scheme

2. Dot

   - `::after` is the dot
   - `:checked` moves it to the end: track − dot − gap
   - Logical insets, so it slides the other way in RTL

3. Motion

   - An `outline` in the dot's own color grows it without touching its box
   - Press and hold: `:active` grows it a little more
   - `transition: all` animates position, color and outline together

4. Icons

   - Icons and input share one grid cell, stacked on the track
   - `:has(:checked)` on the label swaps which icon shows
   - Each icon sits on the side the dot is not
   - `pointer-events: none` lets clicks through to the input

Step 1 of 4: Track

- [`appearance` ](https://webstatus.dev/features/appearance)(Widely available): Chrome 84+, Edge 84+, Firefox 80+, Safari 15.4+
- [`light-dark()` ](https://webstatus.dev/features/light-dark)(Newly available): Chrome 123+, Edge 123+, Firefox 120+, Safari 17.5+

```html
<label class="label">
  <input class="switch" type="checkbox" role="switch" />
  <span>Wi-Fi</span>
</label>
```

```css
.switch {
  --dot-color: light-dark(var(--gray-11), var(--gray-14));


  appearance: none;
  block-size: 1.5rem;
  cursor: pointer;
  inline-size: var(--track-width);
  margin: 0;
  position: relative;
}


.switch::before {
  background-color: light-dark(var(--gray-3), var(--gray-8));
  border: 1px solid var(--dot-color);
  border-radius: 1e5px;
  content: "";
  inset: 0;
  position: absolute;
}
```

Step 2 of 4: Dot

- [Logical properties ](https://webstatus.dev/features/logical-properties)(Widely available): Chrome 89+, Edge 89+, Firefox 66+, Safari 15+

```css
.switch::after {
  background-color: var(--dot-color);
  block-size: 1rem;
  border-radius: 50%;
  content: "";
  inline-size: 1rem;
  inset-block-start: 0.25rem;
  inset-inline-start: 0.25rem;
  position: absolute;
}


.switch:checked::before {
  background-color: var(--primary);
  border-color: var(--primary);
}


.switch:checked::after {
  --dot-color: var(--primary-contrast);


  inset-inline-start: calc(var(--track-width) - 1rem - 0.25rem);
}
```

Step 3 of 4: Motion

```css
.switch::before {
  transition:
    background-color 0.2s,
    border-color 0.2s;
}


.switch::after {
  --ring: 0px;


  outline: var(--ring) solid var(--dot-color);
  outline-offset: -1px;
  transition: all 0.2s var(--ease);
}


.switch:checked::after {
  --ring: 3px;
}


.switch:active::after {
  --ring: 5px;
}
```

Step 4 of 4: Icons

- [`:has()` ](https://webstatus.dev/features/has)(Widely available): Chrome 105+, Edge 105+, Firefox 121+, Safari 15.4+

```html
<label class="label">
  <span class="icon icon-unchecked" aria-hidden="true"><svg>…</svg></span>
  <span class="icon icon-checked" aria-hidden="true"><svg>…</svg></span>
  <input class="switch" type="checkbox" role="switch" aria-label="Light theme" />
</label>
```

```css
.label:has(.icon) {
  .icon {
    grid-column: 1;
    grid-row: 1;
    margin-block-start: 0.25rem;
    pointer-events: none;
    z-index: 1;
  }


  .icon-checked {
    display: none;
    margin-inline-start: 0.25rem;
  }


  .icon-unchecked {
    margin-inline-start: calc(var(--track-width) - 1rem - 0.25rem);
  }


  .switch {
    grid-column: 1;
    grid-row: 1;
  }


  &:has(:checked) {
    .icon-checked {
      display: block;
    }


    .icon-unchecked {
      display: none;
    }
  }
}
```

## Browser support

- Chromium: Full support Supported since v125.
- Firefox: Full support Supported since v128.
- Safari: Full support Supported since v18.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/vue/guide/browser-support/?components=Switch.md).

## Installation

### See also

- [Form](https://open-props-ui.netlify.app/vue/components/form.md)

- `opui-css/css/components/switch.css`
- `opui-css/css/components/form.css`

