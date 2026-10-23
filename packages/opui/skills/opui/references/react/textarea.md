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

- `<textarea>`

  The textarea element.

- `end`

  Content at the inline-end of the field, inside the border.

- `bottom`

  Content below the textarea, inside the border, with a divider.

- `endText`

  Supporting text displayed below the field.

## Variants

Textareas are outlined by default. Set `variant="filled"` for a filled textarea.

```tsx
import { Textarea } from "opui-css/react"

export default function Variants() {
  return (
    <>
      <Textarea label="Outlined" placeholder="Placeholder" />
      <Textarea label="Filled" placeholder="Placeholder" variant="filled" />
    </>
  )
}
```

## Sizes

Choose between four sizes with the `size` prop: `x-small`, `small`, `medium` (the default) and `large`.

On touch screens, x-small and small fields keep the default text size (`--ui-font-size-control`, 16px), so iOS Safari doesn't zoom in when one is focused.

```tsx
import { Textarea } from "opui-css/react"

export default function Sizes() {
  return (
    <>
      <Textarea label="x-small" placeholder="Placeholder" size="x-small" />
      <Textarea label="Small" placeholder="Placeholder" size="small" />
      <Textarea label="Medium" placeholder="Placeholder" />
      <Textarea label="Large" placeholder="Placeholder" size="large" />
    </>
  )
}
```

## Start text

Use the `startText` prop for text between the label and the textarea.

```tsx
import { Textarea } from "opui-css/react"

export default function StartText() {
  return <Textarea startText="Shown on your public profile" label="Bio" />
}
```

## End text

```tsx
import { Textarea } from "opui-css/react"

export default function EndText() {
  return (
    <>
      <Textarea label="Label" placeholder="Default" endText="Supporting text" />
      <Textarea
        label="Label"
        placeholder="Filled"
        endText="Supporting text"
        variant="filled"
      />
    </>
  )
}
```

## Affix

Use the `start`, `end`, `top`, and `bottom` props to affix content inside the textarea's border. Top and bottom are particularly useful for filenames and character counters.

```tsx
import { Textarea } from "opui-css/react"

export default function Affix() {
  return (
    <>
      <Textarea
        label="Notes"
        placeholder="Add a note..."
        start={
          <svg
            aria-hidden="true"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
        }
      />

      <Textarea
        label="Comment"
        placeholder="Write a comment..."
        end="Markdown"
      />
    </>
  )
}
```

### Top and bottom

```tsx
import { Textarea } from "opui-css/react"

export default function TopAndBottom() {
  return (
    <>
      <Textarea
        label="Code"
        placeholder="console.log('Hello, world!')"
        top="script.js"
      />

      <Textarea
        label="Comment"
        placeholder="Write a comment..."
        bottom="0 / 280"
      />
    </>
  )
}
```

## Validation

- `required` toggles the required styles on the `<textarea>`.
- `error` toggles the invalid styles, and screen readers announce the `<textarea>` as invalid. Say what's wrong in the end text. The wrapping `<label>` makes it part of the field's name.
- Fields also get the invalid styles from the browser's own validation (`:user-invalid`), after the user has edited them. Use `error` for server-side errors.

```tsx
import { Textarea } from "opui-css/react"

export default function Validation() {
  return (
    <>
      <div className="example-row">
        <Textarea label="Label" placeholder="Default" required />
        <Textarea
          label="Label"
          placeholder="Filled"
          required
          variant="filled"
        />
      </div>

      <div className="example-row">
        <Textarea
          label="Label"
          placeholder="Default"
          defaultValue="This isn't right"
          endText="Only double-negatives are allowed."
          error
        />
        <Textarea
          label="Label"
          placeholder="Filled"
          defaultValue="Uh-oh"
          endText="Only letters from the first half of the alphabet are allowed."
          error
          variant="filled"
        />
      </div>
    </>
  )
}
```

## Spread

Use the `spread` boolean prop to display the label and start text on the left with the textarea on the right. The layout collapses to a column on narrow containers.

```tsx
import { Textarea } from "opui-css/react"

export default function Spread() {
  return (
    <>
      <Textarea
        spread
        placeholder="Hello, world!"
        label="Message"
        startText="You can write your message here. Keep it short, preferably under 100 characters."
      />

      <Textarea
        spread
        placeholder="Additional notes..."
        variant="filled"
        label="Notes"
        startText="Add any additional notes or comments"
        endText="Maximum 500 characters"
      />

      <Textarea
        spread
        required
        label="Required"
        startText="You must provide a response"
      />

      <Textarea
        spread
        disabled
        label="Disabled"
        startText="This textarea is disabled"
      />

      <Textarea
        spread
        error
        label="Invalid Message"
        startText="This textarea has an error"
        endText="This value is too short."
      />

      <Textarea
        spread
        label="Bio"
        placeholder="Tell us about yourself..."
        startText="Shown on your public profile"
        start={
          <svg
            aria-hidden="true"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
        }
        bottom="280 characters left"
      />

      <Textarea
        spread
        variant="filled"
        label="Release notes"
        placeholder="Markdown supported..."
        startText="Shown on the changelog page"
        top="v1.4.0"
        bottom="Saved 2 minutes ago"
        endText="Drafts are auto-saved"
      />
    </>
  )
}
```

## Auto-fit

Textareas grow with their content, from 3 to 20 lines (`field-sizing: content`). `autoFit` also lets the width follow the longest line, from `25ch`, and allows resizing in both directions.

```tsx
import { Textarea } from "opui-css/react"

export default function AutoFit() {
  return <Textarea label="Auto-fit" placeholder="Auto-fit" autoFit />
}
```

## API

### Textarea API

| Prop        | Type                                             | Default      | Description                                                                |
| ----------- | ------------------------------------------------ | ------------ | -------------------------------------------------------------------------- |
| `autoFit`   | `boolean`                                        | `false`      | Lets the width follow the content and allows resizing in both directions.  |
| `bottom`    | `ReactNode`                                      | -            | Content below the textarea, inside the border, with a divider.             |
| `children`  | `ReactNode`                                      | -            | Extra content inside the root.                                             |
| `end`       | `ReactNode`                                      | -            | Content at the inline-end of the field, inside the border.                 |
| `endText`   | `ReactNode`                                      | -            | Supporting text displayed below the field.                                 |
| `error`     | `boolean`                                        | `false`      | Marks the control invalid and shows error styles.                          |
| `id`        | `string`                                         | -            | The id of the `<textarea>`.                                                |
| `label`     | `ReactNode`                                      | -            | The label for the field.                                                   |
| `size`      | `"large"` , `"medium"` , `"small"` , `"x-small"` | `"medium"`   | The size of the element.                                                   |
| `spread`    | `boolean`                                        | `false`      | Pushes the label and start text to one side and the textarea to the other. |
| `start`     | `ReactNode`                                      | -            | Content at the inline-start of the field, inside the border.               |
| `startText` | `ReactNode`                                      | -            | Start text displayed above the field.                                      |
| `top`       | `ReactNode`                                      | -            | Content above the textarea, inside the border, with a divider.             |
| `variant`   | `"filled"` , `"outlined"`                        | `"outlined"` | The variant to use.                                                        |

#### CSS variables

| Variable                        | Default                                                                                                                                                                                          | Description                                                                                                                                                                                                                                                                                                              |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `--ui-disabled-opacity`         | `0.64`                                                                                                                                                                                           | Opacity applied to disabled controls.                                                                                                                                                                                                                                                                                    |
| `--ui-duration`                 | `0.2s`                                                                                                                                                                                           | Default transition duration. Multiplied by `--ui-motion`.                                                                                                                                                                                                                                                                |
| `--ui-ease`                     | `ease`                                                                                                                                                                                           | Default easing for transitions.                                                                                                                                                                                                                                                                                          |
| `--ui-field-border-color`       | `color-mix( in oklch, var(--ui-text-strong) 50%, var(--ui-surface-default) )`                                                                                                                    | Border color of every empty control: `TextField`, `Select`, `Textarea`, the unchecked `Checkbox`, `Radio` and `Switch`, the `Range` track and the `Progress` outline. A 50% mix of the text color into the page, so it reaches 3:1. Lighter than `--ui-border-color`, which is decorative, is a choice a theme can make. |
| `--ui-field-border-width`       | `1px`                                                                                                                                                                                            | Border width for fields, `Checkbox`, `Radio` and `Switch`.                                                                                                                                                                                                                                                               |
| `--ui-field-helper-color`       | `var(--ui-text-muted)`                                                                                                                                                                           | Text color for helper and end text under a field.                                                                                                                                                                                                                                                                        |
| `--ui-field-helper-font-size`   | `var(--ui-font-size-caption)`                                                                                                                                                                    | Font size for helper and end text under a field.                                                                                                                                                                                                                                                                         |
| `--ui-field-helper-line-height` | `var(--ui-line-height)`                                                                                                                                                                          | Line height for helper and end text under a field.                                                                                                                                                                                                                                                                       |
| `--ui-field-label-color`        | `var(--ui-text-strong)`                                                                                                                                                                          | Text color for field labels.                                                                                                                                                                                                                                                                                             |
| `--ui-field-label-font-size`    | `var(--ui-font-size-small)`                                                                                                                                                                      | Font size for field labels.                                                                                                                                                                                                                                                                                              |
| `--ui-field-label-font-weight`  | `var(--ui-font-weight-semibold)`                                                                                                                                                                 | Font weight for emphasized field labels and legends.                                                                                                                                                                                                                                                                     |
| `--ui-field-radius`             | Unset                                                                                                                                                                                            | Corner radius for fields. When unset, they follow `--ui-radius`, also where it's set on a part of the page.                                                                                                                                                                                                              |
| `--ui-field-required-color`     | `var(--ui-invalid-text)`                                                                                                                                                                         | Color of the required asterisk.                                                                                                                                                                                                                                                                                          |
| `--ui-field-size`               | `var(--ui-control-size)`                                                                                                                                                                         | Default field height.                                                                                                                                                                                                                                                                                                    |
| `--ui-field-size-large`         | `var(--ui-control-size-large)`                                                                                                                                                                   | Field height with `.ui-large`.                                                                                                                                                                                                                                                                                           |
| `--ui-field-size-small`         | `var(--ui-control-size-small)`                                                                                                                                                                   | Field height with `.ui-small`.                                                                                                                                                                                                                                                                                           |
| `--ui-field-size-x-small`       | `var(--ui-control-size-x-small)`                                                                                                                                                                 | Field height with `.ui-x-small`.                                                                                                                                                                                                                                                                                         |
| `--ui-focus-ring-color`         | `rgb( from var(--ui-surface-default) calc(255 - r) calc(255 - g) calc(255 - b) )`                                                                                                                | Color of the keyboard focus ring. By default the page background color inverted.                                                                                                                                                                                                                                         |
| `--ui-focus-ring-offset`        | `2px`                                                                                                                                                                                            | Distance between a control and its focus ring.                                                                                                                                                                                                                                                                           |
| `--ui-focus-ring-style`         | `solid`                                                                                                                                                                                          | Outline style of the focus ring.                                                                                                                                                                                                                                                                                         |
| `--ui-focus-ring-width`         | `2px`                                                                                                                                                                                            | Width of the focus ring.                                                                                                                                                                                                                                                                                                 |
| `--ui-font-body`                | `var(--font-sans)`                                                                                                                                                                               | Font family for body text, fields and buttons. Defaults to Open Props `--font-sans`.                                                                                                                                                                                                                                     |
| `--ui-font-size-caption`        | `var(--ui-font-size-100)`                                                                                                                                                                        | Font size of captions, `Badge`, `Chip`, `Divider` labels, `List` secondary text, `Menu` shortcuts, overlines, `small`, `figcaption` and x-small buttons, toggles and fields. Defaults to `--ui-font-size-100`.                                                                                                           |
| `--ui-font-size-control`        | `var(--ui-font-size-300)`                                                                                                                                                                        | Font size of the default `Button`, `Select`, `Tabs`, `TextField`, `Textarea` and `ToggleButton`. Small and x-small sizes read `--ui-font-size-small` and `--ui-font-size-caption`. Defaults to `--ui-font-size-300`.                                                                                                     |
| `--ui-font-size-small`          | `var(--ui-font-size-200)`                                                                                                                                                                        | Font size of helper text, `Callout`, `Table`, `Tooltip`, code blocks, dense `List` text and small buttons, chips, toggles and fields. Defaults to `--ui-font-size-200`.                                                                                                                                                  |
| `--ui-icon-size`                | `var(--size-4)`                                                                                                                                                                                  | Default icon size inside components.                                                                                                                                                                                                                                                                                     |
| `--ui-icon-size-small`          | `var(--size-3)`                                                                                                                                                                                  | Icon size inside `Chip`, x-small `Avatar` and dense `List` rows, and the `Select` and autosuggest chevron.                                                                                                                                                                                                               |
| `--ui-invalid`                  | `var(--ui-critical)`                                                                                                                                                                             | Color for invalid field borders, fills and outlines. Lighter in dark mode with more contrast, so invalid borders stand out from the page.                                                                                                                                                                                |
| `--ui-invalid-text`             | `light-dark( oklch(from var(--ui-invalid) min(l, var(--ui-text-max-lightness)) c h), oklch( from var(--ui-invalid) max(l, var(--ui-text-min-lightness)) min(c, var(--ui-text-max-chroma)) h ) )` | Color for validation messages and invalid labels. `--ui-invalid` with its lightness kept within `--ui-text-max-lightness` and `--ui-text-min-lightness`, so it stays readable where `--ui-invalid` is lighter for borders.                                                                                               |
| `--ui-line-height`              | `1.5`                                                                                                                                                                                            | Line height of interface text: labels, helpers, choice labels and field hints.                                                                                                                                                                                                                                           |
| `--ui-line-height-tight`        | `1.25`                                                                                                                                                                                           | Line height of single-line controls and compact text: field inputs, `Table` cells, `Tooltip`, `Card` captions and keyboard hints in buttons.                                                                                                                                                                             |
| `--ui-motion`                   | `1`                                                                                                                                                                                              | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/react/guide/theming.md#motion).                                                                                                                |
| `--ui-primary`                  | `light-dark(var(--ui-color-9), var(--ui-color-6))`                                                                                                                                               | Brand color for primary actions and accents.                                                                                                                                                                                                                                                                             |
| `--ui-radius`                   | `var(--size-2)`                                                                                                                                                                                  | Corner radius for every component: cards, callouts, menus, buttons and fields follow it, and small parts like `kbd`, tooltips and checkboxes never get rounder than it. Set it to `0` for square corners. Takes a single length.                                                                                         |
| `--ui-shadow-control`           | `none`                                                                                                                                                                                           | Shadow of buttons with a variant and of fields. `none` by default, for themes that lift controls off the page.                                                                                                                                                                                                           |
| `--ui-shadow-field`             | Unset                                                                                                                                                                                            | Shadow of `TextField`, `Textarea` and `Select` fields. When unset, they follow `--ui-shadow-control`. Set it to `none` to lift buttons but keep fields flat.                                                                                                                                                             |
| `--ui-space-1`                  | `calc(var(--size-1) * var(--ui-space-scale))`                                                                                                                                                    | Spacing step 1: Open Props `--size-1` times `--ui-space-scale`.                                                                                                                                                                                                                                                          |
| `--ui-space-2`                  | `calc(var(--size-2) * var(--ui-space-scale))`                                                                                                                                                    | Spacing step 2: Open Props `--size-2` times `--ui-space-scale`.                                                                                                                                                                                                                                                          |
| `--ui-space-3`                  | `calc(var(--size-3) * var(--ui-space-scale))`                                                                                                                                                    | Spacing step 3: Open Props `--size-3` times `--ui-space-scale`.                                                                                                                                                                                                                                                          |
| `--ui-space-4`                  | `calc(var(--size-4) * var(--ui-space-scale))`                                                                                                                                                    | Spacing step 4: Open Props `--size-4` times `--ui-space-scale`.                                                                                                                                                                                                                                                          |
| `--ui-surface-default`          | `light-dark(var(--ui-gray-1), var(--ui-gray-13))`                                                                                                                                                | Page and card background.                                                                                                                                                                                                                                                                                                |
| `--ui-surface-tonal`            | `light-dark(var(--ui-gray-3), var(--ui-gray-12))`                                                                                                                                                | Background of tonal variants.                                                                                                                                                                                                                                                                                            |
| `--ui-surface-tonal-hover`      | `light-dark( oklch(from var(--ui-surface-tonal) calc(l * 0.93) c h), oklch(from var(--ui-surface-tonal) calc(l * 1.1) c h) )`                                                                    | Hover fill of a `--ui-surface-tonal` surface: clickable `Chip`s and filled `TextField`, `Select` and `Textarea` fields. Derived from `--ui-surface-tonal`, darker in light mode and lighter in dark mode.                                                                                                                |
| `--ui-text-muted`               | `light-dark(var(--ui-gray-13), var(--ui-gray-4))`                                                                                                                                                | Body text color.                                                                                                                                                                                                                                                                                                         |
| `--ui-text-strong`              | `light-dark(var(--ui-gray-15), var(--ui-gray-1))`                                                                                                                                                | Strongest text color, for headings, labels and values. Body text is `--ui-text-muted`.                                                                                                                                                                                                                                   |

This component uses these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/react/guide/theme-tokens.md).

Attributes that aren't props go to the `<textarea>`, like `placeholder` or `rows`, and `className` and `style` go to the root `<label>`. Use `value` with `onChange`, or `defaultValue`.

## Component properties

Set these on the component itself, inline or in your own CSS. Inputs are the knobs. Outputs are derived from the inputs and the current state, so overriding one fixes it in every state. [Customizing](https://open-props-ui.netlify.app/react/guide/customizing.md#component-properties) has examples.

### text-field.css

| Property                     | Kind   | Description                                                                                                                                                    |
| ---------------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--_accent`                  | Input  | Border color of `.ui-field` when focused with a pointer; keyboard focus shows the focus ring instead. Defaults to `--ui-primary`, `--ui-invalid` when invalid. |
| `--_affix-color`             | Output | The current color of `.ui-start`, `.ui-end`, `.ui-top` and `.ui-bottom`. Defaults to `--ui-text-muted`, set by the invalid state.                              |
| `--_arrow-inset`             | Input  | Distance of the select arrow from the inline end.                                                                                                              |
| `--_arrow-space`             | Output | Inline-end padding that keeps text clear of the select and `datalist` arrow, from `--_arrow-inset` and `--_chevron-size`.                                      |
| `--_bg-color`                | Output | The current background of `.ui-field`. Set by `.ui-filled` and its hover state.                                                                                |
| `--_border-color`            | Output | The current border color of `.ui-field`, its header and footer. Set by the invalid state.                                                                      |
| `--_chevron-icon`            | Input  | The select arrow, as an image used for a mask.                                                                                                                 |
| `--_chevron-size`            | Input  | Width and height of the select arrow.                                                                                                                          |
| `--_duration`                | Output | Duration of the transitions and focus ring animation, `--ui-duration` times `--_motion`.                                                                       |
| `--_ease`                    | Input  | Easing of the transitions. Defaults to `--ui-ease`.                                                                                                            |
| `--_field-padding-block`     | Input  | The preferred block padding of the control. Set by the size classes.                                                                                           |
| `--_field-padding-block-fit` | Output | The block padding in use, `--_field-padding-block` capped to fit `--_min-height`.                                                                              |
| `--_field-padding-inline`    | Input  | The inline padding of the control and affixes. `.ui-large` sets it.                                                                                            |
| `--_font-size`               | Input  | The font size of the control and affixes.                                                                                                                      |
| `--_helper-color`            | Output | The current color of `.ui-start-text` and `.ui-end-text`. Defaults to `--ui-field-helper-color`, set by the invalid state.                                     |
| `--_min-height`              | Input  | The minimum height of `.ui-field`. Defaults to `--ui-field-size`, set by the size classes.                                                                     |
| `--_motion`                  | Input  | Motion multiplier for the transitions. `0` turns them off.                                                                                                     |

### textarea.css

| Property            | Kind  | Description                                              |
| ------------------- | ----- | -------------------------------------------------------- |
| `--_max-block-size` | Input | Maximum height the `textarea` grows to with its content. |

## Under the hood

Read the post: [Textareas that grow with field-sizing](https://open-props-ui.netlify.app/learn/textarea-field-sizing)

1. Field

   - Same wrapper and field box as the text field
   - `rows` fixes the height, the content scrolls
   - A 1px border color change alone is too weak a focus cue, so `:has(:focus-visible)` also draws the focus ring around the box

2. Grow

   - `field-sizing: content` sizes the box to its text
   - Type a few lines: it grows, delete them: it shrinks
   - No resize observer, no JavaScript

3. Limits

   - `lh` is one line of the textarea's own text
   - At least three lines plus padding, so an empty field still looks like a textarea
   - `--_max-block-size` changes the 20 line cap, as in the library. Past it, the text scrolls

4. Auto-fit

   - Without a fixed width, `field-sizing` grows sideways too
   - `min-inline-size: 25ch` keeps short text from collapsing the box
   - `resize: both` once the width is free

Step 1 of 4: Field

- [`:focus-visible` ](https://webstatus.dev/features/focus-visible)(Widely available): Chrome 86+, Edge 86+, Firefox 85+, Safari 15.4+
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
  font-size: var(--ui-field-label-font-size);
  font-weight: 600;
  margin-block-end: var(--ui-space-1);
}

.field {
  background-color: var(--ui-surface-default);
  border: 1px solid var(--ui-field-border-color);
  border-radius: var(--ui-radius);
  display: grid;
}

.field textarea {
  background: transparent;
  border: 0;
  color: var(--ui-text-strong);
  font: inherit;
  inline-size: 100%;
  line-height: 1.5;
  outline: 0;
  padding: var(--ui-space-2);
}

.textarea:focus-within .field {
  border-color: var(--ui-primary);
}

.field:has(:focus-visible) {
  outline: var(--ui-focus-ring-width) var(--ui-focus-ring-style)
    var(--ui-focus-ring-color);
  outline-offset: var(--ui-focus-ring-offset);
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
  max-block-size: var(--_max-block-size, 20lh);
  min-block-size: calc(var(--ui-space-2) * 2 + 3lh);
  resize: block;
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

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/react/guide/browser-support/?components=Textarea.md).

## Installation

Import the component from `opui-css/react`:

### Dependencies

- [Text Field](https://open-props-ui.netlify.app/react/components/text-field.md)

Copy the CSS into your project to own it. It reads tokens from Open Props, `palette.css` and `theme.css`, so those go on the page too, after `layers.css`. See [Getting started](https://open-props-ui.netlify.app/react/guide/getting-started.md).

- `opui-css/css/components/text-field.css`
- `opui-css/css/components/textarea.css`

## Changelog

### What's new

- Small and x-small fields set their text in `--ui-font-size-small` and `--ui-font-size-caption`, like buttons.
- The field border, [`--ui-field-border-color`](#api), reaches 3:1 against the page by default.
- The default size reads [`--ui-font-size-control`](#api) for its font size, like buttons.
- [x-small and large](#sizes) sizes with the `size` prop.
- [Spread](#spread) fields line up at one width.
- The minimum height is three lines plus padding at every [size](#sizes).
- Breaking: `--_accent-color` is `--_accent`, `--_height` is `--_min-height`, `--_label-color` is `--_affix-color` and `--_end-text-color` is `--_helper-color` ([Under the hood](#under-the-hood)).
- Breaking: [`startText`](#start-text) replaces `description`, matching `endText`. `supportingText` is gone, use [`endText`](#end-text).
- `--_duration` and `--_ease` set the transition duration and easing ([Under the hood](#under-the-hood)).
- Corners follow `--ui-radius` through [`--ui-field-radius`](#api), so one token squares or rounds every component.
- The field reads [`--ui-shadow-field`](#api), or `--ui-shadow-control` when a theme leaves it unset.
- The [filled](#variants) hover reads `--ui-surface-tonal-hover`, shared with clickable chips.
- [Sizes](#sizes) name the default: `size="medium"`.
