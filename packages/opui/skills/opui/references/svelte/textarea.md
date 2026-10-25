# Textarea

## Anatomy

Label Start text  € EUR Top Bottom Supporting text

- `<Textarea>`

  Container element.

- `label`

  The label for the field.

- `startText`

  Start text displayed above the field.

- `.ui-field`

  The boxed textarea area.

- `top`

  Content above the textarea, inside the border, with a divider.

- `start`

  Content at the inline-start of the field, inside the border.

- `bind:value`

  The textarea element.

- `end`

  Content at the inline-end of the field, inside the border.

- `bottom`

  Content below the textarea, inside the border, with a divider.

- `endText`

  Supporting text displayed below the field.

## Variants

Textareas are outlined by default. Set `variant="filled"` for a filled textarea.

```svelte
<script lang="ts">
  import { Textarea } from "opui-css/svelte"
</script>

<Textarea label="Outlined" placeholder="Placeholder" />
<Textarea label="Filled" placeholder="Placeholder" variant="filled" />
```

## Sizes

Choose between four sizes with the `size` prop: `x-small`, `small`, `medium` (the default) and `large`.

On touch screens, x-small and small fields keep the default text size (`--ui-font-size-control`, 16px), so iOS Safari doesn't zoom in when one is focused.

```svelte
<script lang="ts">
  import { Textarea } from "opui-css/svelte"
</script>

<Textarea label="x-small" placeholder="Placeholder" size="x-small" />
<Textarea label="Small" placeholder="Placeholder" size="small" />
<Textarea label="Medium" placeholder="Placeholder" />
<Textarea label="Large" placeholder="Placeholder" size="large" />
```

## Start text

Use the `startText` prop or snippet for text between the label and the textarea.

```svelte
<script lang="ts">
  import { Textarea } from "opui-css/svelte"
</script>

<Textarea startText="Shown on your public profile" label="Bio" />
```

## End text

```svelte
<script lang="ts">
  import { Textarea } from "opui-css/svelte"
</script>

<Textarea label="Label" placeholder="Default" endText="Supporting text" />
<Textarea
  label="Label"
  placeholder="Filled"
  endText="Supporting text"
  variant="filled"
/>
```

## Affix

Use the `start`, `end`, `top`, and `bottom` snippets to affix content inside the textarea's border. Top and bottom are particularly useful for filenames and character counters.

```svelte
<script lang="ts">
  import { Textarea } from "opui-css/svelte"
</script>

<Textarea label="Notes" placeholder="Add a note...">
  {#snippet start()}<svg
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
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
      ></path>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
      ></path></svg
    >{/snippet}
</Textarea>

<Textarea label="Comment" placeholder="Write a comment...">
  {#snippet end()}Markdown{/snippet}
</Textarea>
```

### Top and bottom

```svelte
<script lang="ts">
  import { Textarea } from "opui-css/svelte"
</script>

<Textarea label="Code" placeholder="console.log('Hello, world!')">
  {#snippet top()}script.js{/snippet}
</Textarea>

<Textarea label="Comment" placeholder="Write a comment...">
  {#snippet bottom()}0 / 280{/snippet}
</Textarea>
```

## Validation

- `required` toggles the required styles on the `<textarea>`.
- `error` toggles the invalid styles, and screen readers announce the `<textarea>` as invalid. Say what's wrong in the end text. The wrapping `<label>` makes it part of the field's name.
- Fields also get the invalid styles from the browser's own validation (`:user-invalid`), after the user has edited them. Use `error` for server-side errors.

```svelte
<script lang="ts">
  import { Textarea } from "opui-css/svelte"
</script>

<div class="example-row">
  <Textarea label="Label" placeholder="Default" required />
  <Textarea label="Label" placeholder="Filled" required variant="filled" />
</div>

<div class="example-row">
  <Textarea
    label="Label"
    placeholder="Default"
    value="This isn't right"
    endText="Only double-negatives are allowed."
    error
  />
  <Textarea
    label="Label"
    placeholder="Filled"
    value="Uh-oh"
    endText="Only letters from the first half of the alphabet are allowed."
    error
    variant="filled"
  />
</div>
```

## Spread

Use the `spread` boolean prop to display the label and start text on the left with the textarea on the right. The layout collapses to a column on narrow containers.

```svelte
<script lang="ts">
  import { Textarea } from "opui-css/svelte"
</script>

<Textarea spread placeholder="Hello, world!">
  {#snippet label()}Message{/snippet}
  {#snippet startText()}You can write your message here. Keep it short,
    preferably under 100 characters.{/snippet}
</Textarea>

<Textarea spread placeholder="Additional notes..." variant="filled">
  {#snippet label()}Notes{/snippet}
  {#snippet startText()}Add any additional notes or comments{/snippet}
  {#snippet endText()}Maximum 500 characters{/snippet}
</Textarea>

<Textarea spread required label="Required">
  {#snippet startText()}You must provide a response{/snippet}
</Textarea>

<Textarea spread disabled label="Disabled">
  {#snippet startText()}This textarea is disabled{/snippet}
</Textarea>

<Textarea spread error label="Invalid Message">
  {#snippet startText()}This textarea has an error{/snippet}
  {#snippet endText()}This value is too short.{/snippet}
</Textarea>

<Textarea spread label="Bio" placeholder="Tell us about yourself...">
  {#snippet startText()}Shown on your public profile{/snippet}
  {#snippet start()}
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
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
      ></path>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    </svg>
  {/snippet}
  {#snippet bottom()}280 characters left{/snippet}
</Textarea>

<Textarea
  spread
  variant="filled"
  label="Release notes"
  placeholder="Markdown supported..."
>
  {#snippet startText()}Shown on the changelog page{/snippet}
  {#snippet top()}v1.4.0{/snippet}
  {#snippet bottom()}Saved 2 minutes ago{/snippet}
  {#snippet endText()}Drafts are auto-saved{/snippet}
</Textarea>
```

## Auto-fit

Textareas grow with their content, from 3 to 20 lines (`field-sizing: content`). `autoFit` also lets the width follow the longest line, from `25ch`, and allows resizing in both directions.

```svelte
<script lang="ts">
  import { Textarea } from "opui-css/svelte"
</script>

<Textarea label="Auto-fit" placeholder="Auto-fit" autoFit />
```

## API

### Textarea API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `autoFit` | `boolean` | `false` | Lets the width follow the content and allows resizing in both directions. |
| `bind:value` **Needs hydration** The bound value only updates on the client. The native control still changes and submits with its form. Read the value from the form instead. | `string` | - | The textarea value. |
| `bottom` | `Snippet` , `string` | - | Content below the textarea, inside the border, with a divider. |
| `children` | `Snippet` | - | Extra content inside the root. |
| `disabled` | `boolean` | `false` | Dims the field and blocks input. |
| `end` | `Snippet` , `string` | - | Content at the inline-end of the field, inside the border. |
| `endText` | `Snippet` , `string` | - | Supporting text displayed below the field. |
| `error` | `boolean` | `false` | Marks the control invalid and shows error styles. |
| `hideLabel` | `boolean` | `false` | Visually hides the label, `.ui-sr-only` instead of `.ui-label`. The field keeps it as its accessible name. |
| `id` | `string` | - | The id of the `<textarea>`. |
| `label` | `Snippet` , `string` | - | The label for the field. |
| `name` | `string` | - | The name of the `<textarea>`. Inside a `FieldGroup`, the group's `name` applies. |
| `required` | `boolean` | - | Adds a required mark after the label. The form won't submit while the field is empty. |
| `size` | `"large"` , `"medium"` , `"small"` , `"x-small"` | `"medium"` | The size of the element. |
| `spread` | `boolean` | `false` | Pushes the label and start text to one side and the textarea to the other. |
| `start` | `Snippet` , `string` | - | Content at the inline-start of the field, inside the border. |
| `startText` | `Snippet` , `string` | - | Start text displayed above the field. |
| `top` | `Snippet` , `string` | - | Content above the textarea, inside the border, with a divider. |
| `variant` | `"filled"` , `"outlined"` | `"outlined"` | The variant to use. |

Attributes that aren't props go to the `<textarea>`, like `placeholder` and `rows`, and `class` and `style` go to the root `<label>`.

### CSS variables

| Variable | Default | Description |
| --- | --- | --- |
| `--ui-disabled-opacity` | `0.64` | Opacity applied to disabled controls. |
| `--ui-duration` | `0.2s` | Default transition duration. Multiplied by `--ui-motion`. |
| `--ui-ease` | `ease` | Default easing for transitions. |
| `--ui-field-bg-color` | Unset | Background of `TextField`, `Textarea` and `Select` fields. When unset, `--ui-surface`, the page color. |
| `--ui-field-border-color` | `color-mix( in oklch, var(--ui-text-strong) var(--ui-field-border-strength), var(--ui-surface) )` | Border color of every empty control: `TextField`, `Select`, `Textarea`, the unchecked `Checkbox`, `Radio` and `Switch` unless `--ui-choice-border-color` is set, the `Range` track and the `Progress` outline. `--ui-text-strong` mixed into `--ui-surface` at `--ui-field-border-strength`, so it reaches 3:1. Lighter than `--ui-border-color`, which is decorative, is a choice a theme can make. |
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
| `--ui-focus-ring-offset` | `2px` | Distance between a control and its focus ring. |
| `--ui-focus-ring-style` | `solid` | Outline style of the focus ring. |
| `--ui-focus-ring-width` | `2px` | Width of the focus ring. |
| `--ui-font-body` | `system-ui, sans-serif` | Font family for body text, fields and buttons. `system-ui, sans-serif` by default. |
| `--ui-font-size-caption` | `var(--ui-font-size-100)` | Font size of captions, `Badge`, `Chip`, `Divider` labels, `List` secondary text, `Menu` shortcuts, overlines, `small`, `figcaption` and x-small buttons, toggles and fields. Defaults to `--ui-font-size-100`. |
| `--ui-font-size-control` | `var(--ui-font-size-300)` | Font size of the default `Button`, `Select`, `Tabs`, `TextField`, `Textarea` and `ToggleButton`. Small and x-small sizes read `--ui-font-size-small` and `--ui-font-size-caption`. Defaults to `--ui-font-size-300`. |
| `--ui-font-size-small` | `var(--ui-font-size-200)` | Font size of helper text, `Callout`, `Table`, `Tooltip`, code blocks, dense `List` text and small buttons, chips, toggles and fields. Defaults to `--ui-font-size-200`. |
| `--ui-icon-size` | `1.25rem` | Default icon size inside components. |
| `--ui-icon-size-small` | `1rem` | Icon size inside `Chip`, x-small `Avatar` and dense `List` rows, and the `Select` and autosuggest chevron. |
| `--ui-invalid` | `light-dark( var(--ui-critical), oklch( from var(--ui-critical) max(l, var(--ui-invalid-min-lightness)) min(c, var(--ui-accent-max-chroma)) h ) )` | Color for invalid field borders, fills and outlines. Lifted to `--ui-invalid-min-lightness` in dark mode, so invalid borders stand out from the page with more contrast. |
| `--ui-invalid-text` | `light-dark( oklch(from var(--ui-invalid) min(l, var(--ui-text-max-lightness)) c h), oklch( from var(--ui-invalid) max(l, var(--ui-text-min-lightness)) min(c, var(--ui-text-max-chroma)) h ) )` | Color for validation messages and invalid labels. `--ui-invalid` with its lightness kept within `--ui-text-max-lightness` and `--ui-text-min-lightness`, so it stays readable where `--ui-invalid` is lighter for borders. |
| `--ui-line-height-control` | `1.5` | Line height of interface text: labels, helpers, choice labels and field hints. |
| `--ui-line-height-tight` | `1.25` | Line height of single-line controls and compact text: field inputs, `Table` cells, `Tooltip`, `Card` captions and keyboard hints in buttons. |
| `--ui-motion` | `1` | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/svelte/guide/theming.md#motion). |
| `--ui-primary` | `light-dark( oklch( from var(--ui-primary-source) min(l, var(--ui-primary-max-lightness)) c h ), oklch( from var(--ui-primary-source) max(l, var(--ui-primary-min-lightness)) min(c, var(--ui-accent-max-chroma)) h ) )` | Brand color for primary actions and accents. Derived from `--ui-primary-source` within `--ui-primary-max-lightness` and `--ui-primary-min-lightness`. Set `--ui-primary-source` to keep more contrast working, or this token to pin the color. |
| `--ui-radius` | `0.5rem` | Corner radius for every component: cards, callouts, menus, buttons and fields follow it, and small parts like `kbd`, tooltips and checkboxes never get rounder than it. Set it to `0` for square corners. Takes a single length. |
| `--ui-shadow-control` | `none` | Shadow of buttons with a variant, standalone `ToggleButton`, outlined `Chip` and fields. `none` by default, for themes that lift controls off the page. |
| `--ui-shadow-field` | Unset | Shadow of `TextField`, `Textarea` and `Select` fields. When unset, they follow `--ui-shadow-control`. Set it to `none` to lift buttons but keep fields flat. |
| `--ui-space-1` | `calc(0.25rem * var(--ui-space-scale))` | Spacing step 1: `0.25rem` times `--ui-space-scale`. |
| `--ui-space-2` | `calc(0.5rem * var(--ui-space-scale))` | Spacing step 2: `0.5rem` times `--ui-space-scale`. |
| `--ui-space-3` | `calc(1rem * var(--ui-space-scale))` | Spacing step 3: `1rem` times `--ui-space-scale`. |
| `--ui-space-4` | `calc(1.25rem * var(--ui-space-scale))` | Spacing step 4: `1.25rem` times `--ui-space-scale`. |
| `--ui-surface` | `light-dark(var(--ui-gray-1), var(--ui-gray-13))` | Page and card background. |
| `--ui-surface-tonal` | `light-dark(var(--ui-gray-3), var(--ui-gray-12))` | Background of tonal variants. |
| `--ui-surface-tonal-hover` | `light-dark( oklch(from var(--ui-surface-tonal) calc(l * 0.93) c h), oklch(from var(--ui-surface-tonal) calc(l * 1.1) c h) )` | Hover fill of a `--ui-surface-tonal` surface: clickable `Chip`s and filled `TextField`, `Select` and `Textarea` fields. Derived from `--ui-surface-tonal`, darker in light mode and lighter in dark mode. |
| `--ui-text` | `light-dark( color-mix( in oklch, var(--ui-text-strong) var(--ui-text-strength-light), var(--ui-surface) ), color-mix( in oklch, var(--ui-text-strong) var(--ui-text-strength-dark), var(--ui-surface) ) )` | Body text color. `--ui-text-strong` mixed into `--ui-surface` at `--ui-text-strength-light` or `--ui-text-strength-dark`. |
| `--ui-text-strong` | `light-dark(var(--ui-gray-15), var(--ui-gray-1))` | Strongest text color, for headings, labels and values. Body text is `--ui-text`. |

The stylesheets on this page read these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/svelte/guide/theme-tokens.md).

## Component properties

Set these on the component itself, inline or in your own CSS. Inputs are the knobs. Outputs are derived from the inputs and the current state, so overriding one fixes it in every state. [Customizing](https://open-props-ui.netlify.app/svelte/guide/customizing.md#component-properties) has examples.

### text-field.css

A dependency, from [Text Field](https://open-props-ui.netlify.app/svelte/components/text-field.md).

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

### textarea.css

| Property | Kind | Description |
| --- | --- | --- |
| `--_max-block-size` | Input | Maximum height the `textarea` grows to with its content. |

## Installation

Import the component from `opui-css/svelte`:

### Dependencies

- [Text Field](https://open-props-ui.netlify.app/svelte/components/text-field.md)

Copy the CSS into your project to own it. It reads tokens from Open Props, `palette.css` and `theme.css`, so those go on the page too, after `layers.css`. See [Getting started](https://open-props-ui.netlify.app/svelte/guide/getting-started.md).

- `opui-css/css/components/text-field.css`
- `opui-css/css/components/textarea.css`

## Used in blocks

- [Account settings](https://open-props-ui.netlify.app/blocks/account-settings.md)
- [Chat](https://open-props-ui.netlify.app/blocks/chat.md)
- [Inbox](https://open-props-ui.netlify.app/blocks/inbox.md)
