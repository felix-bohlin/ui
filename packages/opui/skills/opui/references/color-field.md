# Color field

A text field for an oklch() color, with a picker of lightness, chroma, hue and opacity sliders.

- CSS: `opui-css/css/components/color-field.css`, `opui-css/css/components/text-field.css`, `opui-css/css/components/range.css` and `opui-css/css/components/button.css`.
- Full docs with every example: [HTML](https://open-props-ui.netlify.app/html/components/color-field.md), [Astro](https://open-props-ui.netlify.app/astro/components/color-field.md), [React](https://open-props-ui.netlify.app/react/components/color-field.md), [Svelte](https://open-props-ui.netlify.app/svelte/components/color-field.md), [Vue](https://open-props-ui.netlify.app/vue/components/color-field.md).

## ColorField

### Parts

- `opui-color-field.ui-color-field` (root): The `<opui-color-field>` custom element. It keeps the sliders, the swatch and the input in step, and marks text that isn't a color invalid.
- `.ui-color-field > .ui-text-field`: The field, a `TextField` part that holds the label, the input and the texts.
- `.ui-label` (prop `label`, slot `label`): The label for the field.
- `.ui-start-text` (prop `startText`, slot `start-text`): Start text displayed above the field.
- `.ui-field`: The boxed input area.
- `.ui-field > .ui-start` (prop `pickerLabel`): The picker button, with `command="toggle-popover"`. Hidden until the element is defined.
- `.ui-indicator`: The swatch in the picker button, painted with the color over a checkerboard that shows its opacity.
- `<input type="text">` (model): The input element, which holds the `oklch()` value.
- `.ui-end-text` (prop `endText`, slot `end-text`): Supporting text displayed below the field.
- `.ui-floating` (prop `opacity`): The picker, a popover dialog with a `.ui-range` slider per channel. Each slider's track shows the colors its channel reaches, and its thumb shows the color. Its background takes a faint tint of the color's hue, `--_tint-chroma` at most.
- `.ui-floating > .ui-header`: The preview across the top of the picker, painted with the color over a checkerboard that shows its opacity, with the `oklch()` value and the buttons. The color fades into the tint below it.
- `.ui-header > .ui-value`: The `oklch()` value, on the preview.
- `.ui-header > .ui-actions` (prop `copiedLabel`, prop `copyLabel`, prop `eyedropperLabel`): The eyedropper button (`command="--eyedropper"`, shown where the browser has the EyeDropper API) and the copy button (`command="--copy"`), which announces `copiedLabel`.
- `.ui-floating > .ui-description`: Under the sliders, which screens show the color: sRGB, Display P3 or beyond.
- `.ui-floating > .ui-footer` (prop `contrastLabel`): The color's contrast ratio as text on white and on black, in two chips, read out through `contrastLabel`.

### Props and modifiers

- `autoFit`: `boolean`, `.ui-text-field.ui-auto-fit`. Lets the width follow the value, from `25ch`, like a `TextField`.
- `chromaLabel`: `string`, default `"Chroma"`. The label of the chroma slider.
- `contrastLabel`: `string`, default `"{light}:1 on light, {dark}:1 on dark"`. What a screen reader gets for the contrast ratios in the picker, with `{light}` and `{dark}` where the numbers go.
- `copiedLabel`: `string`, default `"Copied"`. What the picker announces after the copy button copied the value.
- `copyLabel`: `string`, default `"Copy"`. The accessible name of the copy button in the picker.
- `disabled`: `boolean`, `input[disabled]`. Dims the field and blocks input and the picker button.
- `error`: `boolean`, `input[aria-invalid="true"]`. Marks the control invalid and shows error styles.
- `eyedropperLabel`: `string`, default `"Pick from the screen"`. The accessible name of the eyedropper button in the picker, shown in browsers with the EyeDropper API.
- `hideLabel`: `boolean`, `.ui-text-field > label.ui-sr-only`. Visually hides the label, `.ui-sr-only` instead of `.ui-label`. The field keeps it as its accessible name.
- `hueLabel`: `string`, default `"Hue"`. The label of the hue slider.
- `id`: `string`. The id of the `<input>`. The label, the picker button and the sliders build their ids from it, so the component generates one when it's left out.
- `invalidText`: `string`, default `"Not a color. Try oklch(0.6 0.2 250) or any CSS color."`. The validation message and the line under the sliders while the text isn't a color.
- `lightnessLabel`: `string`, default `"Lightness"`. The label of the lightness slider.
- `name`: `string`. The name of the `<input>`, which submits the `oklch()` value. Inside a `FieldGroup`, the group's `name` applies.
- `opacity`: `"none"`, `"slider"` (default). The opacity slider, which keeps the alpha in the value. `"none"` leaves it out, so the value is always opaque.
- `opacityLabel`: `string`, default `"Opacity"`. The label of the opacity slider, unless `opacity="none"`.
- `p3Text`: `string`, default `"Display P3. Wide-gamut screens show it, others show the nearest sRGB color."`. The line under the sliders for a color outside sRGB but inside Display P3.
- `pickerLabel`: `string`, default `"Pick a color"`. The accessible name of the picker button.
- `required`: `boolean`, `input[required]`. Adds a required mark after the label. The form won't submit while the field is empty.
- `size`: `"large"` (`.ui-text-field.ui-large`), `"medium"` (default), `"small"` (`.ui-text-field.ui-small`), `"x-small"` (`.ui-text-field.ui-x-small`). The size of the element.
- `spread`: `boolean`, `.ui-text-field.ui-spread`. Pushes the label and start text to one side and the field to the other.
- `srgbText`: `string`, default `"sRGB. Every screen shows it."`. The line under the sliders for a color inside sRGB.
- `variant`: `"filled"` (`.ui-text-field.ui-filled`), `"outlined"` (default). The variant to use.
- `wideText`: `string`, default `"Beyond Display P3. Screens show the nearest color they can."`. The line under the sliders for a color outside Display P3.

Model: `value` (`string`), the `oklch()` color, as the input's text. Astro and React `value`, Svelte `bind:value`, Vue `v-model`.

### Notes

- HTML: Put the picker button in the field's `.ui-start`, with `commandfor` naming the picker and `command="toggle-popover"`, and the sliders in the `.ui-floating` popover, each `input[type=range]` with `data-channel` set to `L`, `C`, `H` or `alpha`. Give the `<label>` a `for` and an id for the picker's `aria-labelledby`, and import `opui-css/elements/color-field.js`. Without it, the picker button is hidden and the field takes an `oklch()` string.
- Astro: Attributes that aren't props go to the `<input>`, like `name`, `placeholder` and `required`, and `class` and `style` go to the root `<opui-color-field>`. The component loads `opui-css/elements/color-field.js`, which runs the picker.
- React: Attributes that aren't props go to the `<input>`, like `name`, `placeholder` and `required`, and `className` and `style` go to the root `<opui-color-field>`. Use `value` with `onChange`, or `defaultValue`. The picker works once the component hydrates, or once the page imports `opui-css/elements/color-field.js`. Until then it's a text field that takes an `oklch()` string.
- Svelte and Vue: Attributes that aren't props go to the `<input>`, like `name`, `placeholder` and `required`, and `class` and `style` go to the root `<opui-color-field>`. The picker works once the component hydrates, or once the page imports `opui-css/elements/color-field.js`. Until then it's a text field that takes an `oklch()` string.

## Component properties

Set inputs on the component, inline or in your CSS. Outputs follow the variant and state, so never override them.

### color-field.css

- `--_picker-inline-size`: Width of the picker popover.
- `--_tint-chroma`: Highest chroma of the picker's tint, `0.03` by default. `0` turns the tint off.
- `--_track-block-size`: Thickness of the slider tracks, thicker than a `Range`'s.

Outputs: `--_c`, `--_h`, `--_indicator-bg-color`, `--_l`, `--_preview-text-color`, `--_size`, `--_text-color`, `--_tint-alpha`, `--_tint-bg-color`, `--_to`, `--_track`, `--_track-fill-bg-color` and `--_trigger-size`.

### text-field.css

- `--_accent`: Border color of `.ui-field` when focused with a pointer; keyboard focus shows the focus ring instead. Defaults to `--ui-primary`, `--ui-invalid` when invalid.
- `--_arrow-inset`: Distance of the select arrow from the inline end.
- `--_chevron-image`: The select arrow, as an image used for a mask.
- `--_chevron-size`: Width and height of the select arrow.
- `--_ease`: Easing of the transitions. Defaults to `--ui-ease`.
- `--_field-padding-block`: The preferred block padding of the control. Set by the size classes.
- `--_field-padding-inline`: The inline padding of the control and affixes. `--ui-field-padding-inline`, or `--ui-space-2` when a theme leaves it unset, and `--ui-field-padding-inline-large` or `--ui-space-3` in `.ui-large`.
- `--_font-size`: The font size of the control and affixes.
- `--_motion`: Motion multiplier for the transitions. `0` turns them off.
- `--_size`: The height of `.ui-field`, a minimum so a textarea can grow, and the width and height of a color field. Defaults to `--ui-field-size`, set by the size classes.

Outputs: `--_affix-button-size`, `--_affix-text-color`, `--_arrow-padding`, `--_bg-color`, `--_border-color`, `--_duration`, `--_field-padding-block-fit` and `--_helper-text-color`.

### range.css

- `--_accent`: Color of the thumb, its ring and the track fill. Defaults to `--ui-choice-accent`, or `--ui-primary` when the theme doesn't set it, and is set by the invalid state.
- `--_ease`: Easing of the thumb ring transition and focus ring. Defaults to `--ui-ease`.
- `--_motion`: Motion multiplier for the thumb highlight and focus ring. `0` turns them off.
- `--_thumb-border-width`: Width of the page-colored ring between the thumb and the track. Set on the `<input>`.
- `--_thumb-size`: Width and height of the thumb. Set by the sizes, and larger on touch screens at the default size.
- `--_track-base-bg-color`: Color of the empty track at rest. `--ui-track-bg-color` when the theme sets it, otherwise the field border, and `--ui-surface` under more contrast; set by `.ui-filled` and `.ui-tonal`.
- `--_track-block-size`: Height of the track. Set by the sizes.
- `--_track-radius`: Corner radius of the track.

Outputs: `--_duration`, `--_focus-ring-duration`, `--_forced-fill-bg-color`, `--_forced-track-bg-color`, `--_inset`, `--_thumb-bg-color`, `--_thumb-highlight-bg-color`, `--_thumb-highlight-size`, `--_thumb-offset`, `--_track-bg-color`, `--_track-fill-bg-color` and `--_track-fill-fraction`.

### button.css

- `--_accent`: The accent color. Fills, borders, text, hover and active states are derived from it. Defaults to `--ui-button-accent` when a theme sets it. `.ui-primary` and `.ui-critical` set it.
- `--_accent-fill`: Fill of filled buttons, of hovered outlined and tonal buttons unless `--ui-button-hover` is `layer`, and the base of the filled hover and pressed shades. `--ui-button-accent-filled` when a theme sets it, else `--_accent`, and in `.ui-critical` `--ui-critical` kept within `--ui-accent-fill-max-lightness`, so the light text stays readable while the border keeps `--ui-critical`. `.ui-primary` resets it to `--_accent`, so the token applies to default buttons only.
- `--_accent-tonal`: Background of `.ui-tonal`. `--ui-surface-tonal`, a palette tint in `.ui-critical`, and `--ui-primary-tonal` or the tint in `.ui-primary`.
- `--_border-width`: The border width.
- `--_ease`: Easing of the transitions. Defaults to `--ui-ease`.
- `--_font-size`: The font size. Set by `.ui-x-small` and `.ui-small`.
- `--_icon-size`: The size of a direct child `svg`. Icon-only buttons scale it with `--_size`.
- `--_motion`: Motion multiplier for the transitions. `0` turns them off.
- `--_on-accent`: Text color on a fill of `--_accent`. Defaults to `--ui-button-on-accent` when a theme sets it. `.ui-primary` sets `--ui-on-primary`, `.ui-critical` `--ui-on-fill`.
- `--_on-accent-fill`: Text color on `--_accent-fill`: filled buttons, and hovered outlined and tonal ones unless `--ui-button-hover` is `layer`. `--ui-button-on-accent-filled` when a theme sets it, else `--_on-accent`.
- `--_on-accent-tonal`: Text color of `.ui-tonal`.
- `--_padding-inline`: The inline padding. Set by the size classes from `--ui-button-padding-inline` and its size variants.
- `--_radius`: The corner radius. Defaults to `--ui-button-radius`, or `--ui-radius` when the theme doesn't set it. `.ui-round` makes it round.
- `--_size`: The height, and the width of an icon-only button. Defaults to `--ui-button-size`, set by the size classes.

Outputs: `--_accent-text`, `--_actions-shift`, `--_bg-color`, `--_border-color`, `--_default-active-bg-color`, `--_default-hover-bg-color`, `--_duration`, `--_filled-active-bg-color`, `--_filled-hover-bg-color`, `--_outlined-active-bg-color`, `--_outlined-active-border-color`, `--_outlined-active-text-color`, `--_outlined-hover-bg-color`, `--_outlined-hover-border-color`, `--_outlined-hover-text-color`, `--_shadow`, `--_text-color`, `--_tonal-active-bg-color`, `--_tonal-active-text-color`, `--_tonal-hover-bg-color` and `--_tonal-hover-text-color`.

## Theme tokens

The stylesheets read `--ui-accent-fill-max-lightness`, `--ui-border-color`, `--ui-border-color-on-raised`, `--ui-border-width`, `--ui-button-accent`, `--ui-button-accent-filled`, `--ui-button-font-weight`, `--ui-button-hover`, `--ui-button-hover-shadow`, `--ui-button-hover-translate`, `--ui-button-on-accent`, `--ui-button-on-accent-filled`, `--ui-button-padding-inline`, `--ui-button-padding-inline-large`, `--ui-button-padding-inline-small`, `--ui-button-padding-inline-x-small`, `--ui-button-radius`, `--ui-button-size`, `--ui-button-size-large`, `--ui-button-size-small`, `--ui-button-size-x-small`, `--ui-card-padding`, `--ui-choice-accent`, `--ui-contrast`, `--ui-control-accent`, `--ui-control-border-color`, `--ui-control-border-color-filled`, `--ui-critical`, `--ui-critical-text`, `--ui-disabled-opacity`, `--ui-duration`, `--ui-duration-fast`, `--ui-ease`, `--ui-field-bg-color`, `--ui-field-border-color`, `--ui-field-border-width`, `--ui-field-helper-font-size`, `--ui-field-helper-line-height`, `--ui-field-helper-text-color`, `--ui-field-label-font-size`, `--ui-field-label-font-weight`, `--ui-field-label-text-color`, `--ui-field-padding-inline`, `--ui-field-padding-inline-large`, `--ui-field-placeholder-text-color`, `--ui-field-radius`, `--ui-field-required-text-color`, `--ui-field-size`, `--ui-field-size-large`, `--ui-field-size-small`, `--ui-field-size-x-small`, `--ui-focus-ring-color`, `--ui-focus-ring-offset`, `--ui-focus-ring-style`, `--ui-focus-ring-width`, `--ui-font-body`, `--ui-font-code`, `--ui-font-size-caption`, `--ui-font-size-control`, `--ui-font-size-small`, `--ui-font-weight-bold`, `--ui-font-weight-normal`, `--ui-font-weight-semibold`, `--ui-icon-size`, `--ui-icon-size-small`, `--ui-invalid`, `--ui-invalid-text`, `--ui-line-height-control`, `--ui-line-height-tight`, `--ui-motion`, `--ui-on-control-accent`, `--ui-on-fill`, `--ui-on-primary`, `--ui-on-primary-tonal`, `--ui-palette-on-strong`, `--ui-palette-on-tint`, `--ui-palette-strong`, `--ui-palette-tint`, `--ui-primary`, `--ui-primary-text`, `--ui-primary-tonal`, `--ui-radius`, `--ui-radius-round`, `--ui-radius-small`, `--ui-shadow-control`, `--ui-shadow-field`, `--ui-shadow-overlay`, `--ui-space-1`, `--ui-space-2`, `--ui-space-3`, `--ui-space-4`, `--ui-space-6`, `--ui-state-active-alpha-accent`, `--ui-state-active-alpha-dark`, `--ui-state-active-alpha-light`, `--ui-state-hover-alpha-accent`, `--ui-state-hover-alpha-dark`, `--ui-state-hover-alpha-light`, `--ui-surface`, `--ui-surface-elevated`, `--ui-surface-filled`, `--ui-surface-tonal`, `--ui-surface-tonal-hover`, `--ui-text`, `--ui-text-disabled`, `--ui-text-max-chroma`, `--ui-text-min-lightness`, `--ui-text-strong`, `--ui-text-subtle` and `--ui-track-bg-color`. `theming.md` and `tokens.json` describe them.

## HTML

### Example: Basics

```html
<opui-color-field class="ui-color-field">
  <div class="ui-text-field">
    <label
      class="ui-label"
      for="color-field-basics-1"
      id="color-field-basics-1-label"
    >
      Brand color
    </label>
    <span class="ui-field">
      <span class="ui-start">
        <button
          type="button"
          aria-label="Pick a color"
          command="toggle-popover"
          commandfor="color-field-basics-1-picker"
          class="ui-button ui-round"
        >
          <span class="ui-indicator"></span>
        </button>
      </span>
      <input
        autocomplete="off"
        spellcheck="false"
        value="oklch(0.6 0.15 250)"
        id="color-field-basics-1"
        type="text"
      />
    </span>
  </div>
  <div
    aria-labelledby="color-field-basics-1-label"
    class="ui-floating"
    id="color-field-basics-1-picker"
    popover="auto"
    role="dialog"
  >
    <div class="ui-header">
      <span aria-hidden="true" class="ui-value"></span>
      <span class="ui-actions">
        <button
          type="button"
          aria-label="Pick from the screen"
          command="--eyedropper"
          commandfor="color-field-basics-1"
          hidden
          class="ui-button ui-round ui-small"
        >
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M20.71 5.63l-2.34-2.34a1 1 0 0 0-1.41 0l-3.12 3.12-1.93-1.91-1.41 1.41 1.42 1.42L3 16.25V21h4.75l8.92-8.92 1.42 1.42 1.41-1.41-1.92-1.92 3.12-3.12c.4-.4.4-1.03.01-1.42M6.92 19 5 17.08l8.06-8.06 1.92 1.92z"
            ></path>
          </svg>
        </button>
        <button
          type="button"
          aria-label="Copy"
          command="--copy"
          commandfor="color-field-basics-1"
          class="ui-button ui-round ui-small"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24"></svg>
        </button>
      </span>
      <span class="ui-sr-only" role="status"></span>
    </div>
    <label class="ui-range" for="color-field-basics-1-lightness">
      <span class="ui-label" id="color-field-basics-1-lightness-label">
        Lightness
      </span>
      <output
        aria-live="off"
        class="ui-value"
        for="color-field-basics-1-lightness"
      ></output>
      <input
        aria-labelledby="color-field-basics-1-lightness-label"
        data-channel="L"
        id="color-field-basics-1-lightness"
        max="1"
        min="0"
        step="0.001"
        type="range"
      /> </label
    ><label class="ui-range" for="color-field-basics-1-chroma">
      <span class="ui-label" id="color-field-basics-1-chroma-label">
        Chroma
      </span>
      <output
        aria-live="off"
        class="ui-value"
        for="color-field-basics-1-chroma"
      ></output>
      <input
        aria-describedby="color-field-basics-1-gamut"
        aria-labelledby="color-field-basics-1-chroma-label"
        data-channel="C"
        id="color-field-basics-1-chroma"
        max="0.37"
        min="0"
        step="0.001"
        type="range"
      /> </label
    ><label class="ui-range" for="color-field-basics-1-hue">
      <span class="ui-label" id="color-field-basics-1-hue-label"> Hue </span>
      <output
        aria-live="off"
        class="ui-value"
        for="color-field-basics-1-hue"
      ></output>
      <input
        aria-labelledby="color-field-basics-1-hue-label"
        data-channel="H"
        id="color-field-basics-1-hue"
        max="360"
        min="0"
        step="0.1"
        type="range"
      /> </label
    ><label class="ui-range" for="color-field-basics-1-opacity">
      <span class="ui-label" id="color-field-basics-1-opacity-label">
        Opacity
      </span>
      <output
        aria-live="off"
        class="ui-value"
        for="color-field-basics-1-opacity"
      ></output>
      <input
        aria-labelledby="color-field-basics-1-opacity-label"
        data-channel="alpha"
        id="color-field-basics-1-opacity"
        max="1"
        min="0"
        step="0.01"
        type="range"
      />
    </label>
    <p class="ui-description" id="color-field-basics-1-gamut"></p>
    <p class="ui-footer">
      <span aria-hidden="true" data-contrast="light"></span>
      <span aria-hidden="true" data-contrast="dark"></span>
      <span class="ui-sr-only"></span>
    </p>
  </div>
</opui-color-field>

<script type="module">
  import "opui-css/elements/color-field.js"
</script>
```

## Astro

`import { ColorField } from "opui-css/astro"`

- `ColorField` named slots: `end-text`, `label` and `start-text`. Fill one with `slot="end-text"` on a child.

### Example: Basics

```astro
---
import { ColorField } from "opui-css/astro"
---

<ColorField
  id="color-field-basics-1"
  label="Brand color"
  value="oklch(0.6 0.15 250)"
/>
```

## React

`import { ColorField } from "opui-css/react"`

- `ColorField` slot props (`ReactNode`): `endText`, `label` and `startText`.
- Client components (`"use client"`): `ColorField`.

### Example: Basics

```tsx
import { ColorField } from "opui-css/react"

export default function Basics() {
  return (
    <ColorField
      defaultValue="oklch(0.6 0.15 250)"
      id="color-field-basics-1"
      label="Brand color"
    />
  )
}
```

## Svelte

`import { ColorField } from "opui-css/svelte"`

- `ColorField` slot snippets: `endText`, `label` and `startText`.
- Hydration: `bind:value` on `ColorField`. The bound value only updates on the client. The native control still changes and submits with its form. Without hydration: Read the value from the form instead.

### Example: Basics

```svelte
<script lang="ts">
  import { ColorField } from "opui-css/svelte"
</script>

<ColorField
  id="color-field-basics-1"
  label="Brand color"
  value="oklch(0.6 0.15 250)"
/>
```

## Vue

`import { ColorField } from "opui-css/vue"`

- `ColorField` named slots: `end-text`, `label` and `start-text`. Fill one with `<template #end-text>`.
- Hydration: `v-model` on `ColorField`. The bound value only updates on the client. The native control still changes and submits with its form. Without hydration: Read the value from the form instead.

### Example: Basics

```vue
<script setup lang="ts">
import { ColorField } from "opui-css/vue"
</script>

<template>
  <ColorField
    id="color-field-basics-1"
    label="Brand color"
    value="oklch(0.6 0.15 250)"
  />
</template>
```
