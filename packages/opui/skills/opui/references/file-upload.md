# File upload

A drop zone around a file input that lists the files your app is uploading, with a preview, progress, a message and a remove button for each.

- CSS: `opui-css/css/components/file-upload.css`, `opui-css/css/components/button.css`, `opui-css/css/components/list.css` and `opui-css/css/components/progress.css`.
- Full docs with every example: [HTML](https://opui.dev/html/components/file-upload.md), [Astro](https://opui.dev/astro/components/file-upload.md), [Nunjucks](https://opui.dev/nunjucks/components/file-upload.md), [React](https://opui.dev/react/components/file-upload.md), [Solid](https://opui.dev/solid/components/file-upload.md), [Svelte](https://opui.dev/svelte/components/file-upload.md), [Vue](https://opui.dev/vue/components/file-upload.md).

## FileUpload

### Parts

- `opui-file-upload.ui-file-upload` (root): The `<opui-file-upload>` custom element, a size container. It fires `select` for picks and drops and `remove` for the remove buttons, and has the `drag-over` custom state while files are dragged over it. While it has `data-hydrating`, which the React, Solid, Svelte and Vue components render until they hydrate, it holds picked files back and remove buttons do nothing.
- `<div class="ui-content">`: Lays out the drop zone and the files: stacked, or in one row when the root is narrower than `28rem`.
- `<div class="ui-field-container">`: The drop zone, dashed, and solid while files are dragged over the root. In the compact row it is a square add tile.
- `<label class="ui-label">`: Names the file input and covers the drop zone, so a click anywhere in it opens the picker. Its plus `<svg>` shows in the compact row.
- `<input class="ui-sr-only" type="file">` (prop `accept`, prop `disabled`, prop `multiple`): The file input, visually hidden. Its focus ring is drawn on the drop zone.
- `<span class="ui-button ui-outlined">` (prop `label`): The visible trigger, a `<span>` since a label can't hold a button. Visually hidden in the compact row.
- `<span class="ui-description">` (prop `description`): The hint, linked to the input with `aria-describedby`.
- `<ul class="ui-list">` (prop `items`): The files, one `<li>` each: List rows, or square previews that scroll sideways in the compact row.
- `<div class="ui-start">`: The preview: the `<img>` of the file, or a tonal placeholder until there is one. On a failed file it also holds the `<button popovertarget>` that opens the message in the compact row.
- `<div class="ui-text">` (prop `progressLabel`): The file name, a `Progress` while the file is queued or uploading, and the message in a `.ui-description`. In the compact row the name is visually hidden and the progress lies along the bottom edge.
- `<div class="ui-end">` (prop `removeLabel`): The remove button, a round `.ui-button` with `command="--remove"`, in every state.
- `<span class="ui-sr-only" role="status">` (prop `status`): The live region. It is always in the page, so a change of its text is announced.

### Props and modifiers

- `@remove` (Vue): `(event: CustomEvent<RemoveDetail>) => void`. Called when a remove button is pressed, with the item's `value` in `event.detail.value`. Take the item out of `items`, and cancel its upload.
- `@select` (Vue): `(event: CustomEvent<SelectDetail>) => void`. Called with the new files of one pick or drop in `event.detail.files`, after the `accept` check, and with only the first one without `multiple`.
- `accept`: `string`, `input[accept]`. The file types the input takes, as on a file input: extensions, MIME types and `type/*`. The element applies it to picks as well as drops.
- `description`: `string`. The hint in the drop zone. It describes the input, and is visually hidden in the compact row.
- `disabled`: `boolean`, `input:disabled`. Disables the input and dims the trigger. A drop does nothing.
- `id`: `string`. The id of the file input. The remove buttons point at it, so the component generates one when it's left out. The ids the component generates start with it: `x-description` for the hint, and `x-label-0` and `x-description-0` for the first file's name and message, for `id="x"`.
- `items`: `FileUploadItem[]`, `.ui-list > li.ui-state-error`. The files, as `{ description, label, preview, progress, state, value }` objects. `label` is the file name, `value` the id the `remove` event names, `preview` the URL of an image, `state` one of `"complete"`, `"error"`, `"queued"` and `"uploading"`, `progress` a fraction from 0 to 1 while uploading, and `description` a message, which a failed file shows in the critical color.
- `label`: `string`. The text of the trigger, which names the file input.
- `multiple`: `boolean`, `input[multiple]`. Takes several files in one pick or drop. Without it, `select` gets the first accepted file.
- `onremove` (Svelte): `(event: CustomEvent<RemoveDetail>) => void`. Called when a remove button is pressed, with the item's `value` in `event.detail.value`. Take the item out of `items`, and cancel its upload.
- `onRemove` (React and Solid): `(event: CustomEvent<RemoveDetail>) => void`. Called when a remove button is pressed, with the item's `value` in `event.detail.value`. Take the item out of `items`, and cancel its upload.
- `onselect` (Svelte): `(event: CustomEvent<SelectDetail>) => void`. Called with the new files of one pick or drop in `event.detail.files`, after the `accept` check, and with only the first one without `multiple`.
- `onSelect` (React and Solid): `(event: CustomEvent<SelectDetail>) => void`. Called with the new files of one pick or drop in `event.detail.files`, after the `accept` check, and with only the first one without `multiple`.
- `progressLabel`: `string`, default `"Uploading {label}"`. The name of each file's progress bar, with `{label}` where the file's `label` goes.
- `removeLabel`: `string`, default `"Remove {label}"`. The name of each file's remove button, with `{label}` where the file's `label` goes.
- `status`: `string`. The text of the `role="status"` region, which a screen reader announces when it changes, like "2 photos didn't upload.".

### Element

- `<opui-file-upload>`, defined by `opui-css/elements/file-upload.js`:
  - `input`: The `<input type="file">` inside, or `null`. Read-only.
  - `remove` event: Fires when a remove button is pressed, with its `value` in `event.detail.value`. It bubbles. Once the row is gone, focus moves to the next row's remove button, or else the previous one, or else the input.
  - `select` event: Fires after a pick or a drop, with the new files in `event.detail.files`: the ones the input's `accept` allows, and only the first without `multiple`. It bubbles. The input is already empty by then, so the same file can be picked again: read the files from `event.detail.files`.

### Notes

- HTML: Import `opui-css/elements/file-upload.js`, and render the rows yourself from the `select` and `remove` events: one `<li>` per file in a `<ul class="ui-list">` after the `.ui-field-container`, with the preview in `.ui-start`, the name, a `.ui-progress` and the message in `.ui-text`, and the remove button in `.ui-end` with `command="--remove"`, `commandfor` set to the input's id and the file's id as its `value`. A failed file's message has `popover` and an `id`, and a `<button type="button" popovertarget>` in `.ui-start` opens it in the compact row.
- Astro: The component loads `opui-css/elements/file-upload.js`. The component uploads nothing and keeps no files: start the upload from the `select` event, and pass each file's state back in `items`. Attributes that aren't props go to the `<opui-file-upload>`, and `id` names the file input.
- Nunjucks: The macro renders the element without its script, so load `opui-css/elements/file-upload.js` on the page. The component uploads nothing and keeps no files: start the upload from the `select` event, and pass each file's state back in `items`. Attributes that aren't props go to the `<opui-file-upload>`, and `id` names the file input.
- React: The component loads `opui-css/elements/file-upload.js` once it mounts, unless the page imports it first. The component uploads nothing and keeps no files: start the upload from the `select` event, and pass each file's state back in `items`. Attributes that aren't props go to the `<opui-file-upload>`, and `id` names the file input.
- Solid, Svelte and Vue: The component imports `opui-css/elements/file-upload.js`, so the element runs as soon as the component's code loads. The component uploads nothing and keeps no files: start the upload from the `select` event, and pass each file's state back in `items`. Attributes that aren't props go to the `<opui-file-upload>`, and `id` names the file input.

## Component properties

Set inputs on the component, inline or in your CSS. Outputs follow the variant and state, so never override them.

### file-upload.css

- `--_description-max-inline-size`: The widest a failed file's message gets when the compact row opens it as a popover. `16rem` by default.
- `--_ease`: Easing of the drop zone's highlight. Defaults to `--ui-ease`.
- `--_item-size`: Width and height of the add tile and of each preview in the compact row. `4.75rem` by default.
- `--_motion`: Motion multiplier for the drop zone's highlight.
- `--_preview-bg-color`: Color of the placeholder a file shows until it has a preview. Defaults to `--ui-surface-tonal`.
- `--_preview-size`: Width and height of a file's preview in a List row. Defaults to `--ui-control-size`.

Outputs: `--_bg-color`, `--_duration`, `--_field-bg-color`, `--_field-border-color` and `--_size`.

### button.css

- `--_accent`: The accent color. Fills, borders, text, hover and active states are derived from it. Defaults to `--ui-button-accent` when a theme sets it. `.ui-primary` and `.ui-critical` set it.
- `--_accent-filled`: Fill of filled buttons, of hovered outlined buttons unless `--ui-button-hover` is `layer`, of hovered tonal ones when it is unset, and the base of the filled hover and pressed shades. `--ui-button-accent-filled` when a theme sets it, else `--_accent`, and in `.ui-critical` `--ui-critical` kept within `--ui-accent-fill-max-lightness`, so the light text stays readable while the border keeps `--ui-critical`. `.ui-primary` resets it to `--_accent`, so the token applies to default buttons only.
- `--_accent-tonal`: Background of `.ui-tonal`. `--ui-surface-tonal`, a palette tint in `.ui-critical`, and `--ui-primary-tonal` or the tint in `.ui-primary`.
- `--_border-width`: The border width.
- `--_ease`: Easing of the transitions. Defaults to `--ui-ease`.
- `--_end-end-radius`: The radius of the end-end corner. Defaults to `--_radius`. A `ControlGroup` sets it to `0` where the button joins the next control.
- `--_end-start-radius`: The radius of the end-start corner. Defaults to `--_radius`. A `ControlGroup` sets it to `0` where the button joins another control.
- `--_font-size`: The font size. Set by `.ui-x-small` and `.ui-small`.
- `--_icon-size`: The size of a direct child `svg`. Icon-only buttons scale it with `--_size`.
- `--_motion`: Motion multiplier for the transitions. `0` turns them off.
- `--_on-accent`: Text color on a fill of `--_accent`. Defaults to `--ui-button-on-accent` when a theme sets it. `.ui-primary` sets `--ui-on-primary`, `.ui-critical` `--ui-on-fill`.
- `--_on-accent-filled`: Text color on `--_accent-filled`: filled buttons, hovered outlined ones unless `--ui-button-hover` is `layer`, and hovered tonal ones when it is unset. `--ui-button-on-accent-filled` when a theme sets it, else `--_on-accent`.
- `--_on-accent-tonal`: Text color of `.ui-tonal`.
- `--_padding-inline`: The inline padding. Set by the size classes from `--ui-button-padding-inline` and its size variants.
- `--_radius`: The corner radius. Defaults to `--ui-button-radius`, or `--ui-radius` when the theme doesn't set it. `.ui-round` makes it round.
- `--_size`: The height, and the width of an icon-only button. Defaults to `--ui-button-size`, set by the size classes.
- `--_start-end-radius`: The radius of the start-end corner. Defaults to `--_radius`. A `ControlGroup` sets it to `0` where the button joins another control.
- `--_start-start-radius`: The radius of the start-start corner. Defaults to `--_radius`. A `ControlGroup` sets it to `0` where the button joins the control before it.

Outputs: `--_accent-text`, `--_actions-shift`, `--_bg-color`, `--_border-color`, `--_duration`, `--_filled-active-bg-color`, `--_filled-hover-bg-color`, `--_outlined-active-bg-color`, `--_outlined-active-border-color`, `--_outlined-active-text-color`, `--_outlined-hover-bg-color`, `--_outlined-hover-border-color`, `--_outlined-hover-text-color`, `--_selected-bg-color`, `--_selected-text-color`, `--_shadow`, `--_text-color`, `--_tonal-active-bg-color`, `--_tonal-active-text-color`, `--_tonal-hover-bg-color`, `--_tonal-hover-text-color`, `--_tonal-selected-bg-color`, `--_transparent-active-bg-color` and `--_transparent-hover-bg-color`.

### list.css

- `--_bg-color`: Background of the list and its items. Defaults to `--ui-surface-filled`, `.ui-transparent` and `.ui-tonal` set it.
- `--_check-image`: The check on the selected item of a `.ui-menu`, a `[role="listbox"]` list or a select picker, as an image used as a mask in the text color. Defaults to `--ui-icon-check`.
- `--_description-text-color`: Text color of the description paragraph in an item. `--ui-text-subtle`, and `--ui-on-selected` on a selected or current row when a theme sets it.
- `--_divider-border-color`: Color of the lines between items in `.ui-bordered` and on `.ui-border-top`. Defaults to `--ui-border-color`, mixed with 20% `--ui-text-strong` in `.ui-tonal`.
- `--_divider-gap`: Space around the lines between items in `.ui-bordered` and on `.ui-border-top`. Smaller in `.ui-dense`.
- `--_hover-bg-color`: Background of hovered items, from `--ui-primary`.
- `--_item-ease`: Easing of the row transitions. Defaults to `--ui-ease`.
- `--_item-gap`: Gap between the content of an item. Smaller in `.ui-dense`.
- `--_item-padding-inline`: Horizontal padding of items, headings and options. `--ui-list-item-padding-inline`, or `--ui-space-3` when a theme leaves it unset.
- `--_motion`: Motion multiplier for the row transitions of a `.ui-list`. `0` turns them off. A `Menu` and a select picker read their own.
- `--_radius`: The corner radius of a `.ui-list`. Defaults to `--ui-radius`, and `0` when the list is a direct child of a `Card`, `Accordion` or `Dialog`, which round and clip it themselves.
- `--_selected-bg-color`: Background of selected and current items and options. `--ui-selected` when the theme sets it, otherwise `--ui-primary` at `--ui-state-selected-alpha-accent`, stronger than `--_hover-bg-color`. With more contrast it is `--_hover-bg-color`, so the text keeps 7:1, and the bar marks the row.
- `--_selected-indicator-bg-color`: Color of the bar on the start edge of selected and current items and options, which marks them without relying on the fill. Defaults to `--ui-selected-strong`.
- `--_selected-indicator-size`: Width of the bar on selected and current items. Defaults to `--ui-border-width-large`.
- `--_start-image-size`: Width of a square image in `.ui-start`.
- `--_start-size`: Maximum size of leading and trailing icons, and the indent of `.ui-inset` items. Smaller in `.ui-dense`.
- `--_start-video-size`: Height of a video in `.ui-start`, which keeps a 16:9 ratio.

Outputs: `--_font-size`, `--_icon-size`, `--_item-duration`, `--_selected-indicator-offset`, `--_selected-shadow` and `--_size`.

### progress.css

- `--_accent`: Color of the bar, and of a `Meter` fill in its optimum range. Defaults to `--ui-selected-strong`, the role Stepper and Timeline read for the done part of their track, which is `--ui-primary` unless a theme sets it.
- `--_bg-color`: Color of the track. `--ui-track-bg-color` when the theme sets it, otherwise `--ui-surface-tonal`; `.ui-filled` sets it to `--ui-surface-filled`.
- `--_block-size`: Height of the track of a `Progress` or a `Meter`. Defaults to `--ui-space-1`. `.ui-round` reads `--_ring-size` instead.
- `--_ease`: Easing of the value transition. Defaults to `--ui-ease-enter`.
- `--_loop-duration`: Length of one cycle of the indeterminate animation, and of the pulse that replaces it when `--_motion` is `0`. `2s` by default, multiplied by `--_motion`.
- `--_motion`: Motion multiplier for the value transition and the indeterminate animation.
- `--_ring-border-width`: Thickness of the ring of `.ui-round`. Defaults to `--ui-border-width-large`.
- `--_ring-size`: Width and height of `.ui-round`. Defaults to `--ui-icon-size-large`.

Outputs: `--_duration` and `--_ring-fraction`.

## Theme tokens

The stylesheets read `--ui-accent-fill-max-lightness`, `--ui-border-color`, `--ui-border-color-on-filled`, `--ui-border-width`, `--ui-border-width-large`, `--ui-button-accent`, `--ui-button-accent-filled`, `--ui-button-focus`, `--ui-button-font-weight`, `--ui-button-hover`, `--ui-button-hover-shadow`, `--ui-button-hover-translate`, `--ui-button-on-accent`, `--ui-button-on-accent-filled`, `--ui-button-padding-inline`, `--ui-button-padding-inline-large`, `--ui-button-padding-inline-small`, `--ui-button-padding-inline-x-small`, `--ui-button-radius`, `--ui-button-shadow`, `--ui-button-size`, `--ui-button-size-large`, `--ui-button-size-small`, `--ui-button-size-x-small`, `--ui-card-padding`, `--ui-choice-size-small`, `--ui-contrast`, `--ui-control-accent`, `--ui-control-border-color`, `--ui-control-border-color-filled`, `--ui-control-on-accent`, `--ui-control-size`, `--ui-control-size-small`, `--ui-control-size-x-small`, `--ui-critical`, `--ui-critical-text`, `--ui-disabled-opacity`, `--ui-duration`, `--ui-duration-fast`, `--ui-ease`, `--ui-ease-enter`, `--ui-ease-move`, `--ui-field-border-color`, `--ui-field-border-color-on-filled`, `--ui-focus-border-color`, `--ui-focus-highlight`, `--ui-focus-ring-color`, `--ui-focus-ring-inset`, `--ui-focus-ring-offset`, `--ui-focus-ring-width`, `--ui-font-code`, `--ui-font-size-caption`, `--ui-font-size-control`, `--ui-font-size-small`, `--ui-font-weight-bold`, `--ui-font-weight-normal`, `--ui-icon-check`, `--ui-icon-close`, `--ui-icon-increase`, `--ui-icon-invalid`, `--ui-icon-size`, `--ui-icon-size-large`, `--ui-icon-size-small`, `--ui-line-height`, `--ui-line-height-tight`, `--ui-list-item-padding-inline`, `--ui-motion`, `--ui-on-fill`, `--ui-on-focus-highlight`, `--ui-on-primary`, `--ui-on-primary-tonal`, `--ui-on-selected`, `--ui-palette-on-strong`, `--ui-palette-on-tint`, `--ui-palette-strong`, `--ui-palette-tint`, `--ui-press-scale`, `--ui-primary`, `--ui-primary-text`, `--ui-primary-tonal`, `--ui-radius`, `--ui-radius-round`, `--ui-radius-small`, `--ui-selected`, `--ui-selected-strong`, `--ui-shadow-control`, `--ui-shadow-overlay`, `--ui-space-1`, `--ui-space-2`, `--ui-space-3`, `--ui-space-4`, `--ui-space-5`, `--ui-state-active-alpha-accent`, `--ui-state-active-alpha-dark`, `--ui-state-active-alpha-light`, `--ui-state-hover-alpha-accent`, `--ui-state-hover-alpha-dark`, `--ui-state-hover-alpha-light`, `--ui-state-selected-alpha-accent`, `--ui-surface`, `--ui-surface-elevated`, `--ui-surface-filled`, `--ui-surface-tonal`, `--ui-surface-tonal-hover`, `--ui-switch-thumb-size-small`, `--ui-switch-track-block-size-small`, `--ui-switch-track-inline-size-small`, `--ui-text-disabled`, `--ui-text-max-chroma`, `--ui-text-min-lightness`, `--ui-text-strong`, `--ui-text-subtle` and `--ui-track-bg-color`. `theming.md` and `tokens.json` describe them.

## HTML

### Example: Basics

```html
<opui-file-upload class="ui-file-upload">
  <div class="ui-content">
    <div class="ui-field-container">
      <label class="ui-label">
        <input
          accept="image/*"
          aria-describedby="file-upload-basics-1-description"
          class="ui-sr-only"
          id="file-upload-basics-1"
          multiple
          type="file"
        />
        <span class="ui-button ui-outlined">Choose photos</span>
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        ></svg>
      </label>
      <span class="ui-description" id="file-upload-basics-1-description"
        >Or drop them here. PNG or JPG.</span
      >
    </div>
  </div>
  <span class="ui-sr-only" role="status"></span>
</opui-file-upload>

<script type="module">
  import "opui-css/elements/file-upload.js"
</script>
```

## Astro

`import { FileUpload } from "opui-css/astro"`

### Example: Basics

```astro
---
import { FileUpload } from "opui-css/astro"
---

<FileUpload
  accept="image/*"
  description="Or drop them here. PNG or JPG."
  label="Choose photos"
  multiple
/>
```

## Nunjucks

`{% from "opui/index.njk" import FileUpload %}`

### Example: Basics

```njk
{% from "opui/index.njk" import FileUpload %}

{{ FileUpload({
  accept: "image/*",
  description: "Or drop them here. PNG or JPG.",
  label: "Choose photos",
  multiple: true
}) }}

<script type="module">
  import "opui-css/elements/file-upload.js"
</script>
```

## React

`import { FileUpload } from "opui-css/react"`

- Client components (`"use client"`): `FileUpload`.

### Example: Basics

```tsx
import { FileUpload } from "opui-css/react"

export default function Basics() {
  return (
    <FileUpload
      accept="image/*"
      description="Or drop them here. PNG or JPG."
      label="Choose photos"
      multiple
    />
  )
}
```

## Solid

`import { FileUpload } from "opui-css/solid"`

### Example: Basics

```tsx
/** @jsxImportSource @solidjs/web */
import { FileUpload } from "opui-css/solid"

export default function Basics() {
  return (
    <FileUpload
      accept="image/*"
      description="Or drop them here. PNG or JPG."
      label="Choose photos"
      multiple
    />
  )
}
```

## Svelte

`import { FileUpload } from "opui-css/svelte"`

### Example: Basics

```svelte
<script lang="ts">
  import { FileUpload } from "opui-css/svelte"
</script>

<FileUpload
  accept="image/*"
  description="Or drop them here. PNG or JPG."
  label="Choose photos"
  multiple
/>
```

## Vue

`import { FileUpload } from "opui-css/vue"`

### Example: Basics

```vue
<script setup lang="ts">
import { FileUpload } from "opui-css/vue"
</script>

<template>
  <FileUpload
    accept="image/*"
    description="Or drop them here. PNG or JPG."
    label="Choose photos"
    multiple
  />
</template>
```
