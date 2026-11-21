# Textarea

A multi-line text input in a Field that grows with its text, with a character count.

- CSS: `opui-css/css/components/text-field.css` and `opui-css/css/components/textarea.css`.
- Full docs with every example: [HTML](https://opui.dev/html/components/textarea.md), [Astro](https://opui.dev/astro/components/textarea.md), [React](https://opui.dev/react/components/textarea.md), [Solid](https://opui.dev/solid/components/textarea.md), [Svelte](https://opui.dev/svelte/components/textarea.md), [Vue](https://opui.dev/vue/components/textarea.md).

## CharacterCount

### Parts

- `<opui-character-count>` (root): Shows the characters typed out of the control's `maxlength`, `aria-hidden` so it stays out of the field's description. Once 10% or 10 are left, whichever is more, a live region outside the label announces the characters left.

### Props and modifiers

- `label`: `string`, `label`, default `"Characters left: {count}"`. The announcement near the limit, with `{count}` for the characters left. Pass it translated.

### Element

- `<opui-character-count>`, defined by `opui-css/elements/character-count.js`:
  - `control`: The `<input>` or `<textarea>` of the field it's in, or `null` outside one. Read-only.

### Notes

- HTML: Add `<opui-character-count class="ui-value" aria-hidden="true">` at the end of `.ui-end-text`, set the announcement as its `label` attribute, with `{count}` for the characters left, and import `opui-css/elements/character-count.js`.
- Astro, Solid, Svelte and Vue: Put it in the field's `end-text` slot. It loads `opui-css/elements/character-count.js`, which keeps the count.
- React: Put it in the field's `endText`. It loads `opui-css/elements/character-count.js`, which keeps the count.

## Component properties

Set inputs on the component, inline or in your CSS. Outputs follow the variant and state, so never override them.

### text-field.css

- `--_accent`: Border color of `.ui-field-container` when its control has focus without `:focus-visible`, such as a clicked file or color input or a Select picked with the pointer. Text-entry fields show the focus ring on click too. Defaults to `--ui-primary`, `--ui-invalid` when invalid.
- `--_arrow-inset`: Distance of the select arrow from the inline end.
- `--_chevron-image`: The select arrow, as an image used for a mask.
- `--_chevron-size`: Width and height of the select arrow.
- `--_ease`: Easing of the transitions. Defaults to `--ui-ease`.
- `--_end-end-radius`: The radius of the end-end corner of `.ui-field-container`. Defaults to `--_radius`. A `ControlGroup` sets it to `0` where the field joins the next control.
- `--_end-start-radius`: The radius of the end-start corner of `.ui-field-container`. Defaults to `--_radius`. A `ControlGroup` sets it to `0` where the field joins another control.
- `--_field-padding-block`: The preferred block padding of the control. Set by the size classes.
- `--_field-padding-inline`: The inline padding of the control and affixes. `--ui-field-padding-inline`, or `--ui-space-2` when a theme leaves it unset, and `--ui-field-padding-inline-large` or `--ui-space-3` in `.ui-large`. An affix with a `.ui-button` uses `--ui-space-1`.
- `--_file-button-padding`: The preferred gap around the `::file-selector-button` of a file field: `--ui-space-2`, or `--ui-space-1` in `.ui-small` and `.ui-x-small`.
- `--_font-size`: The font size of the control and affixes. At least 16px on iPhone and iPad (`css/compat/text-field.css`), so iOS Safari doesn't zoom in on focus.
- `--_min-inline-size`: The least width of the control next to `.ui-start` and `.ui-end`, which shrink and end in an ellipsis to keep it, or the whole field when it is narrower. Defaults to `8ch`; a `NumberField` sets its own.
- `--_motion`: Motion multiplier for the transitions. `0` turns them off.
- `--_radius`: The corner radius of `.ui-field-container` and a file input's button. Defaults to `--ui-field-radius`, or `--ui-radius` when the theme doesn't set it.
- `--_shadow`: The shadow of `.ui-field-container`. Defaults to `--ui-field-shadow`, or `--ui-shadow-control` when the theme leaves it unset. `none` in a `ControlGroup`.
- `--_size`: The height of `.ui-field-container`, a minimum so a textarea can grow, and the width and height of a color field. Defaults to `--ui-field-size`, set by the size classes.
- `--_start-end-radius`: The radius of the start-end corner of `.ui-field-container`. Defaults to `--_radius`. A `ControlGroup` sets it to `0` where the field joins another control.
- `--_start-start-radius`: The radius of the start-start corner of `.ui-field-container`. Defaults to `--_radius`. A `ControlGroup` sets it to `0` where the field joins the control before it.

Outputs: `--_affix-block-size`, `--_affix-button-size`, `--_affix-padding-block`, `--_affix-text-color`, `--_arrow-padding`, `--_bg-color`, `--_border-color`, `--_duration`, `--_field-padding-block-fit`, `--_file-button-inset` and `--_helper-text-color`.

### textarea.css

- `--_max-block-size`: Maximum height the `textarea` grows to with its content.

## Theme tokens

The stylesheets read `--ui-disabled-opacity`, `--ui-duration`, `--ui-ease`, `--ui-field-bg-color`, `--ui-field-border-color`, `--ui-field-border-width`, `--ui-field-helper-font-size`, `--ui-field-helper-line-height`, `--ui-field-helper-text-color`, `--ui-field-label-font-size`, `--ui-field-label-font-weight`, `--ui-field-label-text-color`, `--ui-field-padding-inline`, `--ui-field-padding-inline-large`, `--ui-field-placeholder-text-color`, `--ui-field-radius`, `--ui-field-required-text-color`, `--ui-field-shadow`, `--ui-field-size`, `--ui-field-size-large`, `--ui-field-size-small`, `--ui-field-size-x-small`, `--ui-focus-border-color`, `--ui-focus-border-width`, `--ui-focus-ring-color`, `--ui-focus-ring-offset`, `--ui-focus-ring-style`, `--ui-focus-ring-width`, `--ui-font-body`, `--ui-font-size-caption`, `--ui-font-size-control`, `--ui-font-size-small`, `--ui-icon-expand`, `--ui-icon-hide`, `--ui-icon-show`, `--ui-icon-size`, `--ui-icon-size-small`, `--ui-invalid`, `--ui-invalid-text`, `--ui-line-height-control`, `--ui-line-height-tight`, `--ui-motion`, `--ui-primary`, `--ui-radius`, `--ui-shadow-control`, `--ui-space-1`, `--ui-space-2`, `--ui-space-3`, `--ui-space-4`, `--ui-surface`, `--ui-surface-tonal`, `--ui-surface-tonal-hover`, `--ui-target-min-size`, `--ui-text`, `--ui-text-strong` and `--ui-text-subtle`. `theming.md` and `tokens.json` describe them.

## HTML

### Example: Character count

```html
<div class="ui-field">
  <label class="ui-label" for="textarea-character-count-1">Bio</label>
  <span class="ui-field-container">
    <textarea
      aria-describedby="textarea-character-count-1-end-text"
      id="textarea-character-count-1"
      maxlength="160"
    ></textarea>
  </span>
  <span class="ui-end-text" id="textarea-character-count-1-end-text">
    Up to 160 characters, shown on your profile.
    <opui-character-count
      aria-hidden="true"
      label="{count} characters to go"
      class="ui-value"
    ></opui-character-count>
  </span>
</div>

<script type="module">
  import "opui-css/elements/character-count.js"
</script>
```

## Astro

`import { CharacterCount } from "opui-css/astro"`

### Example: Character count

```astro
---
import { CharacterCount, Field } from "opui-css/astro"
---

<Field for="textarea-character-count-1" label="Bio">
  <textarea
    aria-describedby="textarea-character-count-1-end-text"
    id="textarea-character-count-1"
    maxlength="160"
  ></textarea>
  <Fragment slot="end-text">
    Up to 160 characters, shown on your profile.
    <CharacterCount label="{count} characters to go" />
  </Fragment>
</Field>
```

## React

`import { CharacterCount } from "opui-css/react"`

- Client components (`"use client"`): `CharacterCount`.

### Example: Character count

```tsx
import { CharacterCount, Field } from "opui-css/react"

export default function CharacterCountExample() {
  return (
    <Field
      endText={
        <>
          Up to 160 characters, shown on your profile.
          <CharacterCount label="{count} characters to go" />
        </>
      }
      htmlFor="textarea-character-count-1"
      label="Bio"
    >
      <textarea
        aria-describedby="textarea-character-count-1-end-text"
        id="textarea-character-count-1"
        maxLength={160}
      ></textarea>
    </Field>
  )
}
```

## Solid

`import { CharacterCount } from "opui-css/solid"`

### Example: Character count

```tsx
/** @jsxImportSource @solidjs/web */
import { CharacterCount, Field } from "opui-css/solid"

export default function CharacterCountExample() {
  return (
    <Field
      endText={
        <>
          Up to 160 characters, shown on your profile.
          <CharacterCount label="{count} characters to go" />
        </>
      }
      for="textarea-character-count-1"
      label="Bio"
    >
      <textarea
        aria-describedby="textarea-character-count-1-end-text"
        id="textarea-character-count-1"
        maxlength="160"
      ></textarea>
    </Field>
  )
}
```

## Svelte

`import { CharacterCount } from "opui-css/svelte"`

### Example: Character count

```svelte
<script lang="ts">
  import { CharacterCount, Field } from "opui-css/svelte"
</script>

<Field for="textarea-character-count-1" label="Bio">
  <textarea
    aria-describedby="textarea-character-count-1-end-text"
    id="textarea-character-count-1"
    maxlength="160"></textarea>
  {#snippet endText()}
    Up to 160 characters, shown on your profile.
    <CharacterCount label={"{count} characters to go"} />
  {/snippet}
</Field>
```

## Vue

`import { CharacterCount } from "opui-css/vue"`

### Example: Character count

```vue
<script setup lang="ts">
import { CharacterCount, Field } from "opui-css/vue"
</script>

<template>
  <Field for="textarea-character-count-1" label="Bio">
    <textarea
      aria-describedby="textarea-character-count-1-end-text"
      id="textarea-character-count-1"
      maxlength="160"
    ></textarea>
    <template #end-text>
      Up to 160 characters, shown on your profile.
      <CharacterCount label="{count} characters to go" />
    </template>
  </Field>
</template>
```
