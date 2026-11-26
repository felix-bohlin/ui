# Field

The label, hints and box around a form control you write: an input, a select or a textarea.

- CSS: `opui-css/css/components/field.css`.
- Full docs with every example: [HTML](https://opui.dev/html/components/field.md), [Astro](https://opui.dev/astro/components/field.md), [Nunjucks](https://opui.dev/nunjucks/components/field.md), [React](https://opui.dev/react/components/field.md), [Solid](https://opui.dev/solid/components/field.md), [Svelte](https://opui.dev/svelte/components/field.md), [Vue](https://opui.dev/vue/components/field.md).

## Field

### Parts

- `.ui-field` (root): A `<div>`, whose `<label for>` names the control.
- `.ui-label` (prop `label`, slot `label`): The label for the field.
- `.ui-start-text` (prop `startText`, slot `start-text`): Text above the box.
- `.ui-field-container`: The box around the control.
- `.ui-field-container > .ui-top` (slot `top`): Content above the control, inside the box.
- `.ui-field-container > .ui-start` (slot `start`): Content before the control, inside the box.
- `<input>, <select> or <textarea>`: Your control, with the field's `for` as its `id`.
- `.ui-field-container > .ui-end` (slot `end`): Content after the control, inside the box, like a `PasswordToggle`.
- `.ui-field-container > .ui-bottom` (slot `bottom`): Content below the control, inside the box.
- `.ui-end-text` (prop `endText`, slot `end-text`): Text below the box, and a `CharacterCount`.

### Props and modifiers

- `autoFit`: `boolean`, `.ui-auto-fit`. Fits the width to the content, from `25ch` (`4ch` with step buttons), and lets a textarea resize sideways.
- `dense`: `boolean`, `.ui-dense`. Tighter select options.
- `dropZone`: `boolean`, `.ui-drop-zone`. Makes a `type="file"` input a tall, dashed drop zone.
- `for` (Astro, Nunjucks, Solid, Svelte and Vue): `string`. The `id` of your control, which the label points at and the part ids start with: `x-start-text`, `x-top`, `x-start`, `x-end`, `x-bottom` and `x-end-text` for `for="x"`.
- `hideLabel`: `boolean`, `.ui-field > label.ui-sr-only`. Visually hides the label but keeps its name.
- `htmlFor` (React): `string`. The `id` of your control, which the label points at and the part ids start with: `x-start-text`, `x-top`, `x-start`, `x-end`, `x-bottom` and `x-end-text` for `htmlFor="x"`.
- `size`: `"large"` (`.ui-large`), `"medium"` (default), `"small"` (`.ui-small`), `"x-small"` (`.ui-x-small`). The size of the element.
- `spread`: `boolean`, `.ui-spread`. Puts the label and start text beside the control.
- State (HTML): `disabled` (`:has(:is(input, select, textarea):is(:disabled, [aria-disabled="true"]))`), `invalid` (`:has([aria-invalid="true"], :user-invalid)`), `readonly` (`:has([readonly])`), `required` (`:has(:required)`). Set on the control: invalid shows the error colors, required marks the label, disabled dims the field and read-only keeps the text cursor.
- `variant`: `"filled"` (`.ui-filled`), `"outlined"` (default). The variant to use.

### Slots

- `default`: Your `<input>`, `<select>` or `<textarea>`, and a `<datalist>` for suggestions.

### Notes

- HTML: Point the `<label class="ui-label" for>` at the control's `id`, and the control's `aria-describedby` at `.ui-start-text`, `.ui-top`, `.ui-start`, `.ui-end`, `.ui-bottom` and `.ui-end-text` in that order, leaving out a part that only holds buttons, an output or hidden content, and keep the list in step with parts that come and go, like an error end text. `npx opui-css check` checks the HTML files. Write `.ui-top` and `.ui-start` before the control, and `.ui-end` and `.ui-bottom` after it.
- Astro, Nunjucks, Solid, Svelte and Vue: Write your control inside, with its `id` set to `for`, and point its `aria-describedby` at the parts with something to read, `x-start-text`, `x-top`, `x-start`, `x-end`, `x-bottom` and `x-end-text` for `for="x"` in that order. Leave out a part that only holds buttons, an output or hidden content, and keep the list in step with parts that come and go, like an error end text. `checkHtml` from `opui-css/check` checks the rendered page. Other attributes go to the `.ui-field` root, so set `aria-describedby` and `aria-invalid` on your control.
- React: Write your control inside, with its `id` set to `htmlFor`, and point its `aria-describedby` at the parts with something to read, `x-start-text`, `x-top`, `x-start`, `x-end`, `x-bottom` and `x-end-text` for `htmlFor="x"` in that order. Leave out a part that only holds buttons, an output or hidden content, and keep the list in step with parts that come and go, like an error end text. `checkHtml` from `opui-css/check` checks the rendered page. Other attributes go to the `.ui-field` root, so set `aria-describedby` and `aria-invalid` on your control.

## CharacterCount

### Parts

- `<opui-character-count>` (root): Shows the characters typed out of `maxlength`, `aria-hidden` so it stays out of the description. Screen readers hear the characters left once 10% or 10 remain, whichever is more.

### Props and modifiers

- `label`: `string`, `label`, default `"Characters left: {count}"`. The announcement near the limit, with `{count}` for the characters left. Pass it translated.

### Element

- `<opui-character-count>`, defined by `opui-css/elements/character-count.js`:
  - `control`: The field's `<input>` or `<textarea>`, or `null` outside a field. Read-only.

### Notes

- HTML: Add `<opui-character-count class="ui-value" aria-hidden="true">` at the end of `.ui-end-text`, with the announcement in `label`, and import `opui-css/elements/character-count.js`.
- Astro and Vue: Put it in the `end-text` slot. It loads `opui-css/elements/character-count.js`.
- Nunjucks: Put it in `slots.endText`, and load `opui-css/elements/character-count.js` on the page.
- React and Solid: Put it in `endText`. It loads `opui-css/elements/character-count.js`.
- Svelte: Put it in the `endText` snippet. It loads `opui-css/elements/character-count.js`.

## Component properties

Set inputs on the component, inline or in your CSS. Outputs follow the variant and state, so never override them.

### field.css

- `--_accent`: Border color of `.ui-field-container` on focus without `:focus-visible`: a clicked select, file or color input, not a text field. Defaults to `--ui-primary`, `--ui-invalid` when invalid.
- `--_arrow-inset`: Distance of the select and `datalist` arrow from the inline end.
- `--_chevron-image`: Mask image of the select and `datalist` arrow. Defaults to `--ui-icon-expand`.
- `--_chevron-size`: Size of the select and `datalist` arrow.
- `--_ease`: Easing of the transitions. Defaults to `--ui-ease`.
- `--_end-end-radius`: End-end corner radius of `.ui-field-container`. Defaults to `--_radius`, `0` against the next control in a `ControlGroup`.
- `--_end-start-radius`: End-start corner radius of `.ui-field-container`. Defaults to `--_radius`, `0` against another control in a `ControlGroup`.
- `--_field-padding-block`: Preferred block padding of the control. Set by the size classes.
- `--_field-padding-inline`: Inline padding of the control and affixes. Defaults to `--ui-field-padding-inline` (else `--ui-space-2`), or `--ui-field-padding-inline-large` (else `--ui-space-3`) in `.ui-large`. An affix with a `.ui-button` uses `--ui-space-1`.
- `--_file-button-padding`: Preferred space above and below the `::file-selector-button`, outside `.ui-drop-zone`. `--ui-space-2`, `--ui-space-1` in `.ui-small` and `.ui-x-small`.
- `--_font-size`: Font size of the control, `.ui-start` and `.ui-end`. Set by `.ui-x-small` and `.ui-small`, at least 16px on iPhone and iPad.
- `--_min-inline-size`: Minimum width of the control beside `.ui-start` and `.ui-end`, which shrink to keep it, capped at the field's width. Defaults to `8ch`, `4ch` with a `StepButton`.
- `--_motion`: Motion multiplier for the transitions. `0` turns them off.
- `--_radius`: Corner radius of `.ui-field-container` and the file button. Defaults to `--ui-field-radius`, else `--ui-radius`.
- `--_shadow`: Shadow of `.ui-field-container`. Defaults to `--ui-field-shadow`, else `--ui-shadow-control`; `none` in a `ControlGroup`.
- `--_size`: Minimum height of `.ui-field-container`, and the width and height of a color field. Defaults to `--ui-field-size`, set by the size classes.
- `--_start-end-radius`: Start-end corner radius of `.ui-field-container`. Defaults to `--_radius`, `0` against another control in a `ControlGroup`.
- `--_start-start-radius`: Start-start corner radius of `.ui-field-container`. Defaults to `--_radius`, `0` against the previous control in a `ControlGroup`.

Outputs: `--_affix-block-size`, `--_affix-button-size`, `--_affix-padding-block`, `--_affix-text-color`, `--_arrow-padding`, `--_bg-color`, `--_border-color`, `--_duration`, `--_field-padding-block-fit`, `--_file-button-inset` and `--_helper-text-color`.

## Theme tokens

The stylesheets read `--ui-border-color`, `--ui-border-color-on-filled`, `--ui-border-color-on-raised`, `--ui-border-color-raised`, `--ui-border-width`, `--ui-border-width-large`, `--ui-choice-size-small`, `--ui-control-size`, `--ui-control-size-small`, `--ui-control-size-x-small`, `--ui-disabled-opacity`, `--ui-duration`, `--ui-duration-fast`, `--ui-ease`, `--ui-ease-move`, `--ui-field-bg-color`, `--ui-field-border-color`, `--ui-field-border-color-on-filled`, `--ui-field-border-color-on-raised`, `--ui-field-border-width`, `--ui-field-helper-font-size`, `--ui-field-helper-line-height`, `--ui-field-helper-text-color`, `--ui-field-label-font-size`, `--ui-field-label-font-weight`, `--ui-field-label-text-color`, `--ui-field-padding-inline`, `--ui-field-padding-inline-large`, `--ui-field-placeholder-text-color`, `--ui-field-radius`, `--ui-field-required-text-color`, `--ui-field-shadow`, `--ui-field-size`, `--ui-field-size-large`, `--ui-field-size-small`, `--ui-field-size-x-small`, `--ui-focus-border-color`, `--ui-focus-border-width`, `--ui-focus-ring-color`, `--ui-focus-ring-inset`, `--ui-focus-ring-offset`, `--ui-focus-ring-style`, `--ui-focus-ring-width`, `--ui-font-body`, `--ui-font-code`, `--ui-font-size-caption`, `--ui-font-size-control`, `--ui-font-size-small`, `--ui-font-weight-medium`, `--ui-font-weight-normal`, `--ui-icon-check`, `--ui-icon-expand`, `--ui-icon-hide`, `--ui-icon-show`, `--ui-icon-size`, `--ui-icon-size-large`, `--ui-icon-size-small`, `--ui-invalid`, `--ui-invalid-text`, `--ui-line-height`, `--ui-line-height-control`, `--ui-line-height-tight`, `--ui-list-item-padding-inline`, `--ui-menu-radius`, `--ui-motion`, `--ui-on-selected`, `--ui-primary`, `--ui-radius`, `--ui-selected`, `--ui-selected-strong`, `--ui-shadow-control`, `--ui-shadow-overlay`, `--ui-space-1`, `--ui-space-2`, `--ui-space-3`, `--ui-space-4`, `--ui-state-hover-alpha-accent`, `--ui-state-selected-alpha-accent`, `--ui-surface`, `--ui-surface-elevated`, `--ui-surface-elevated-image`, `--ui-surface-filled`, `--ui-surface-tonal`, `--ui-surface-tonal-hover`, `--ui-switch-thumb-size-small`, `--ui-switch-track-block-size-small`, `--ui-switch-track-inline-size-small`, `--ui-target-min-size`, `--ui-text`, `--ui-text-strong` and `--ui-text-subtle`. `theming.md` and `tokens.json` describe them.

## HTML

### Example: Basics

```html
<div class="ui-field">
  <label class="ui-label" for="field-basics-1">Band name</label>
  <span class="ui-field-container">
    <input id="field-basics-1" name="band" />
  </span>
</div>
<div class="ui-field">
  <label class="ui-label" for="field-basics-2">Instrument</label>
  <span class="ui-field-container">
    <select id="field-basics-2" name="instrument">
      <button>
        <selectedcontent></selectedcontent>
      </button>
      <option value="">Pick an instrument</option>
      <option>Bass</option>
      <option>Drums</option>
      <option>Guitar</option>
    </select>
  </span>
</div>
<div class="ui-field">
  <label class="ui-label" for="field-basics-3">Influences</label>
  <span class="ui-field-container">
    <textarea id="field-basics-3" name="influences"></textarea>
  </span>
</div>
```

### Example: Ids

```html
<div class="ui-field ui-auto-fit">
  <label class="ui-label" for="field-ids-1">Quantity</label>
  <span class="ui-field-container">
    <span class="ui-start" id="field-ids-1-start">
      <opui-step-button>
        <button
          class="ui-button ui-round"
          type="button"
          aria-controls="field-ids-1"
          aria-label="Decrease"
          command="--step-down"
          commandfor="field-ids-1"
        >
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          ></svg>
        </button>
      </opui-step-button>
    </span>
    <input
      aria-describedby="field-ids-1-end-text"
      id="field-ids-1"
      max="10"
      min="1"
      type="number"
      value="1"
    />
    <span class="ui-end" id="field-ids-1-end">
      <opui-step-button>
        <button
          class="ui-button ui-round"
          type="button"
          aria-controls="field-ids-1"
          aria-label="Increase"
          command="--step-up"
          commandfor="field-ids-1"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24"></svg>
        </button>
      </opui-step-button>
    </span>
  </span>
  <span class="ui-end-text" id="field-ids-1-end-text">Up to 10 per order.</span>
</div>

<script type="module">
  import "opui-css/elements/step-button.js"
</script>
```

## Astro

`import { CharacterCount, Field } from "opui-css/astro"`

- `Field` named slots: `bottom`, `end`, `end-text`, `label`, `start`, `start-text` and `top`. Fill one with `slot="bottom"` on a child.

### Example: Basics

```astro
---
import { Field, SelectButton } from "opui-css/astro"
---

<Field for="field-basics-1" label="Band name">
  <input id="field-basics-1" name="band" />
</Field>
<Field for="field-basics-2" label="Instrument">
  <select id="field-basics-2" name="instrument">
    <SelectButton />
    <option value="">Pick an instrument</option>
    <option>Bass</option>
    <option>Drums</option>
    <option>Guitar</option>
  </select>
</Field>
<Field for="field-basics-3" label="Influences">
  <textarea id="field-basics-3" name="influences"></textarea>
</Field>
```

### Example: Ids

```astro
---
import { Field, StepButton } from "opui-css/astro"

const id = "field-ids-1"
---

<Field autoFit endText="Up to 10 per order." for={id} label="Quantity">
  <input
    aria-describedby={`${id}-end-text`}
    id={id}
    max="10"
    min="1"
    type="number"
    value="1"
  />
  <StepButton command="--step-down" for={id} slot="start" />
  <StepButton command="--step-up" for={id} slot="end" />
</Field>
```

## Nunjucks

`{% from "opui/index.njk" import CharacterCount, Field %}`

- `Field` named slots: `slots.bottom`, `slots.end`, `slots.endText`, `slots.label`, `slots.start`, `slots.startText` and `slots.top`. Pass a string, or markup captured with `{% set %}`.

### Example: Basics

```njk
{% from "opui/index.njk" import Field, SelectButton %}

{% call Field({ for: "field-basics-1", label: "Band name" }) %}
  <input id="field-basics-1" name="band" />
{% endcall %}
{% call Field({ for: "field-basics-2", label: "Instrument" }) %}
  <select id="field-basics-2" name="instrument">
    {{ SelectButton() }}
    <option value="">Pick an instrument</option>
    <option>Bass</option>
    <option>Drums</option>
    <option>Guitar</option>
  </select>
{% endcall %}
{% call Field({ for: "field-basics-3", label: "Influences" }) %}
  <textarea id="field-basics-3" name="influences"></textarea>
{% endcall %}
```

### Example: Ids

```njk
{% from "opui/index.njk" import Field, StepButton %}
{% set id = "field-ids-1" %}

{% set start %}{{ StepButton({ command: "--step-down", for: id }) }}{% endset %}
{% set end %}{{ StepButton({ command: "--step-up", for: id }) }}{% endset %}
{% call Field({
  autoFit: true,
  endText: "Up to 10 per order.",
  for: id,
  label: "Quantity",
  slots: { end: end, start: start }
}) %}
  <input
    aria-describedby="{{ id }}-end-text"
    id="{{ id }}"
    max="10"
    min="1"
    type="number"
    value="1"
  />
{% endcall %}

<script type="module">
  import "opui-css/elements/step-button.js"
</script>
```

## React

`import { CharacterCount, Field } from "opui-css/react"`

- `Field` slot props (`ReactNode`): `bottom`, `children`, `end`, `endText`, `label`, `start`, `startText` and `top`.
- Client components (`"use client"`): `CharacterCount`.

### Example: Basics

```tsx
import { Field, SelectButton } from "opui-css/react"

export default function Basics() {
  return (
    <>
      <Field htmlFor="field-basics-1" label="Band name">
        <input id="field-basics-1" name="band" />
      </Field>
      <Field htmlFor="field-basics-2" label="Instrument">
        <select id="field-basics-2" name="instrument">
          <SelectButton />
          <option value="">Pick an instrument</option>
          <option>Bass</option>
          <option>Drums</option>
          <option>Guitar</option>
        </select>
      </Field>
      <Field htmlFor="field-basics-3" label="Influences">
        <textarea id="field-basics-3" name="influences"></textarea>
      </Field>
    </>
  )
}
```

### Example: Ids

```tsx
import { useId } from "react"
import { Field, StepButton } from "opui-css/react"

export default function Ids() {
  const id = useId()
  return (
    <Field
      autoFit
      end={<StepButton command="--step-up" htmlFor={id} />}
      endText="Up to 10 per order."
      htmlFor={id}
      label="Quantity"
      start={<StepButton command="--step-down" htmlFor={id} />}
    >
      <input
        aria-describedby={`${id}-end-text`}
        defaultValue="1"
        id={id}
        max="10"
        min="1"
        type="number"
      />
    </Field>
  )
}
```

## Solid

`import { CharacterCount, Field } from "opui-css/solid"`

- `Field` slot props (`JSX.Element`): `bottom`, `children`, `end`, `endText`, `label`, `start`, `startText` and `top`.

### Example: Basics

```tsx
/** @jsxImportSource @solidjs/web */
import { Field, SelectButton } from "opui-css/solid"

export default function Basics() {
  return (
    <>
      <Field for="field-basics-1" label="Band name">
        <input id="field-basics-1" name="band" />
      </Field>
      <Field for="field-basics-2" label="Instrument">
        <select id="field-basics-2" name="instrument">
          <SelectButton />
          <option value="">Pick an instrument</option>
          <option>Bass</option>
          <option>Drums</option>
          <option>Guitar</option>
        </select>
      </Field>
      <Field for="field-basics-3" label="Influences">
        <textarea id="field-basics-3" name="influences"></textarea>
      </Field>
    </>
  )
}
```

### Example: Ids

```tsx
/** @jsxImportSource @solidjs/web */
import { createUniqueId } from "solid-js"
import { Field, StepButton } from "opui-css/solid"

export default function Ids() {
  const id = createUniqueId()
  return (
    <Field
      autoFit
      end={<StepButton command="--step-up" for={id} />}
      endText="Up to 10 per order."
      for={id}
      label="Quantity"
      start={<StepButton command="--step-down" for={id} />}
    >
      <input
        aria-describedby={`${id}-end-text`}
        defaultValue="1"
        id={id}
        max="10"
        min="1"
        type="number"
      />
    </Field>
  )
}
```

## Svelte

`import { CharacterCount, Field } from "opui-css/svelte"`

- `Field` slot snippets: `bottom`, `children`, `end`, `endText`, `label`, `start`, `startText` and `top`.

### Example: Basics

```svelte
<script lang="ts">
  import { Field, SelectButton } from "opui-css/svelte"
</script>

<Field for="field-basics-1" label="Band name">
  <input id="field-basics-1" name="band" />
</Field>
<Field for="field-basics-2" label="Instrument">
  <select id="field-basics-2" name="instrument">
    <SelectButton />
    <option value="">Pick an instrument</option>
    <option>Bass</option>
    <option>Drums</option>
    <option>Guitar</option>
  </select>
</Field>
<Field for="field-basics-3" label="Influences">
  <textarea id="field-basics-3" name="influences"></textarea>
</Field>
```

### Example: Ids

```svelte
<script lang="ts">
  import { Field, StepButton } from "opui-css/svelte"

  const id = $props.id()
</script>

<Field autoFit endText="Up to 10 per order." for={id} label="Quantity">
  <input
    aria-describedby="{id}-end-text"
    {id}
    max="10"
    min="1"
    type="number"
    value="1"
  />
  {#snippet start()}
    <StepButton command="--step-down" for={id} />
  {/snippet}
  {#snippet end()}
    <StepButton command="--step-up" for={id} />
  {/snippet}
</Field>
```

## Vue

`import { CharacterCount, Field } from "opui-css/vue"`

- `Field` named slots: `bottom`, `end`, `end-text`, `label`, `start`, `start-text` and `top`. Fill one with `<template #bottom>`.

### Example: Basics

```vue
<script setup lang="ts">
import { Field, SelectButton } from "opui-css/vue"
</script>

<template>
  <Field for="field-basics-1" label="Band name">
    <input id="field-basics-1" name="band" />
  </Field>
  <Field for="field-basics-2" label="Instrument">
    <select id="field-basics-2" name="instrument">
      <SelectButton />
      <option value="">Pick an instrument</option>
      <option>Bass</option>
      <option>Drums</option>
      <option>Guitar</option>
    </select>
  </Field>
  <Field for="field-basics-3" label="Influences">
    <textarea id="field-basics-3" name="influences"></textarea>
  </Field>
</template>
```

### Example: Ids

```vue
<script setup lang="ts">
import { useId } from "vue"
import { Field, StepButton } from "opui-css/vue"

const id = useId()
</script>

<template>
  <Field autoFit endText="Up to 10 per order." :for="id" label="Quantity">
    <input
      :aria-describedby="`${id}-end-text`"
      :id="id"
      max="10"
      min="1"
      type="number"
      :value.attr="'1'"
    />
    <template #start>
      <StepButton command="--step-down" :for="id" />
    </template>
    <template #end>
      <StepButton command="--step-up" :for="id" />
    </template>
  </Field>
</template>
```
