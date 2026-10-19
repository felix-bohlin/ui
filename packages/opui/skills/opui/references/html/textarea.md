# Textarea

## Anatomy

Label Start text  € EUR Header Footer Supporting text

- `label.ui-textarea`

  Container element.

- `.ui-label`

  The label for the field.

- `.ui-start-text`

  Start text displayed above the field.

- `.ui-field`

  The boxed textarea area.

- `.ui-header`

  Content above the textarea, inside the border, with a divider.

- `.ui-prefix`

  Content at the inline-start of the field, inside the border.

- `<textarea>`

  The textarea element.

- `.ui-suffix`

  Content at the inline-end of the field, inside the border.

- `.ui-footer`

  Content below the textarea, inside the border, with a divider.

- `.ui-end-text`

  Supporting text displayed below the field.

## Variants

Textareas are outlined by default. Add `.ui-filled` for a filled textarea.

```html
<label class="ui-textarea">
  <span class="ui-label">Default</span>
  <span class="ui-field">
    <textarea placeholder="Placeholder"></textarea>
  </span>
</label>

<label class="ui-textarea ui-filled">
  <span class="ui-label">Filled</span>
  <span class="ui-field">
    <textarea placeholder="Placeholder"></textarea>
  </span>
</label>
```

## Sizes

Choose between four sizes: `.ui-x-small`, `.ui-small`, default and `.ui-large`.

```html
<label class="ui-textarea ui-x-small">
  <span class="ui-label">x-small</span>
  <span class="ui-field">
    <textarea placeholder="Placeholder"></textarea>
  </span>
</label>

<label class="ui-textarea ui-small">
  <span class="ui-label">Small</span>
  <span class="ui-field">
    <textarea placeholder="Placeholder"></textarea>
  </span>
</label>

<label class="ui-textarea">
  <span class="ui-label">Default</span>
  <span class="ui-field">
    <textarea placeholder="Placeholder"></textarea>
  </span>
</label>

<label class="ui-textarea ui-large">
  <span class="ui-label">Large</span>
  <span class="ui-field">
    <textarea placeholder="Placeholder"></textarea>
  </span>
</label>
```

## Start text

Add a `.ui-start-text` between `.ui-label` and `.ui-field` for text between the label and the textarea.

```html
<label class="ui-textarea">
  <span class="ui-label">Bio</span>
  <span class="ui-start-text">Shown on your public profile</span>
  <span class="ui-field">
    <textarea></textarea>
  </span>
</label>
```

## End text

```html
<label class="ui-textarea">
  <span class="ui-label">Label</span>
  <span class="ui-field">
    <textarea placeholder="Default"></textarea>
  </span>
  <span class="ui-end-text">Supporting text</span>
</label>

<label class="ui-textarea ui-filled">
  <span class="ui-label">Label</span>
  <span class="ui-field">
    <textarea placeholder="Filled"></textarea>
  </span>
  <span class="ui-end-text">Supporting text</span>
</label>
```

## Affix

Add `.ui-prefix`, `.ui-suffix`, `.ui-header`, or `.ui-footer` elements inside `.ui-field` to affix content inside the textarea's border.

```html
<label class="ui-textarea">
  <span class="ui-label">Notes</span>
  <span class="ui-field">
    <textarea placeholder="Add a note..."></textarea>
    <span class="ui-prefix">
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
        <path
          d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
        ></path>
        <path
          d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
        ></path>
      </svg>
    </span>
  </span>
</label>
```

### Headers and footers

```html
<label class="ui-textarea">
  <span class="ui-label">Code</span>
  <span class="ui-field">
    <textarea placeholder="console.log('Hello, world!')"></textarea>
    <span class="ui-header">script.js</span>
  </span>
</label>

<label class="ui-textarea">
  <span class="ui-label">Comment</span>
  <span class="ui-field">
    <textarea placeholder="Write a comment..."></textarea>
    <span class="ui-footer">0 / 280</span>
  </span>
</label>
```

## Validation

- `[required]` toggles the required styles on the `<textarea>`.
- `aria-invalid="true"` toggles the invalid styles, and screen readers announce the `<textarea>` as invalid. Say what's wrong in the end text. Keep it inside the `<label>`, so it's part of the field's name.
- Fields also get the invalid styles from the browser's own validation (`:user-invalid`), after the user has edited them. Use `aria-invalid="true"` for server-side errors.

```html
<div class="example-row">
  <label class="ui-textarea">
    <span class="ui-label">Label</span>
    <span class="ui-field">
      <textarea placeholder="Default" required></textarea>
    </span>
  </label>
  <label class="ui-textarea ui-filled">
    <span class="ui-label">Label</span>
    <span class="ui-field">
      <textarea placeholder="Filled" required></textarea>
    </span>
  </label>
</div>

<div class="example-row">
  <label class="ui-textarea">
    <span class="ui-label">Label</span>
    <span class="ui-field">
      <textarea aria-invalid="true" placeholder="Default"></textarea>
    </span>
    <span class="ui-end-text">Only double-negatives are allowed.</span>
  </label>
  <label class="ui-textarea ui-filled">
    <span class="ui-label">Label</span>
    <span class="ui-field">
      <textarea aria-invalid="true" placeholder="Filled"></textarea>
    </span>
    <span class="ui-end-text"
      >Only letters from the first half of the alphabet are allowed.</span
    >
  </label>
</div>
```

## Spread

Add the `.ui-spread` class to display the label and start text on the left with the textarea on the right. The layout collapses to a column on narrow containers.

```html
<label class="ui-textarea ui-spread">
  <span class="ui-label">Message</span>
  <span class="ui-start-text"
    >You can write your message here. Keep it short, preferably under 100
    characters.</span
  >
  <span class="ui-field">
    <textarea placeholder="Hello, world!"></textarea>
  </span>
</label>

<label class="ui-textarea ui-spread ui-filled">
  <span class="ui-label">Notes</span>
  <span class="ui-start-text">Add any additional notes or comments</span>
  <span class="ui-field">
    <textarea placeholder="Additional notes..."></textarea>
  </span>
  <span class="ui-end-text">Maximum 500 characters</span>
</label>

<label class="ui-textarea ui-spread">
  <span class="ui-label">Required</span>
  <span class="ui-start-text">You must provide a response</span>
  <span class="ui-field">
    <textarea required></textarea>
  </span>
</label>

<label class="ui-textarea ui-spread">
  <span class="ui-label">Disabled</span>
  <span class="ui-start-text">This textarea is disabled</span>
  <span class="ui-field">
    <textarea disabled></textarea>
  </span>
</label>

<label class="ui-textarea ui-spread">
  <span class="ui-label">Invalid Message</span>
  <span class="ui-start-text">This textarea has an error</span>
  <span class="ui-field">
    <textarea aria-invalid="true"></textarea>
  </span>
  <span class="ui-end-text">This value is too short.</span>
</label>

<label class="ui-textarea ui-spread">
  <span class="ui-label">Bio</span>
  <span class="ui-start-text">Shown on your public profile</span>
  <span class="ui-field">
    <textarea placeholder="Tell us about yourself..."></textarea>
    <span class="ui-prefix">
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
        <path
          d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
        ></path>
        <path
          d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
        ></path>
      </svg>
    </span>
    <span class="ui-footer">280 characters left</span>
  </span>
</label>

<label class="ui-textarea ui-spread ui-filled">
  <span class="ui-label">Release notes</span>
  <span class="ui-start-text">Shown on the changelog page</span>
  <span class="ui-field">
    <textarea placeholder="Markdown supported..."></textarea>
    <span class="ui-header">v1.4.0</span>
    <span class="ui-footer">Saved 2 minutes ago</span>
  </span>
  <span class="ui-end-text">Drafts are auto-saved</span>
</label>
```

## Auto-fit

Textareas grow with their content, from 3 to 20 lines (`field-sizing: content`). `.ui-auto-fit` also lets the width follow the longest line, from `25ch`, and allows resizing in both directions.

```html
<label class="ui-textarea ui-auto-fit">
  <span class="ui-label">Auto-fit</span>
  <span class="ui-field">
    <textarea placeholder="Auto-fit"></textarea>
  </span>
</label>
```

## API

### Textarea API

| Type       | Modifiers                               | Default | Description                                                                |
| ---------- | --------------------------------------- | ------- | -------------------------------------------------------------------------- |
| Auto-fit   | `.ui-auto-fit`                          | -       | Lets the width follow the content and allows resizing in both directions.  |
| Layout     | `.ui-spread`                            | -       | Pushes the label and start text to one side and the textarea to the other. |
| Sizes      | `.ui-large`, `.ui-small`, `.ui-x-small` | -       | The size of the element.                                                   |
| Validation | `textarea[aria-invalid="true"]`         | -       | Marks the control invalid and shows error styles.                          |
| Variants   | default, `.ui-filled`                   | default | The variant to use.                                                        |

#### Parts

| Part                | Description                                                    |
| ------------------- | -------------------------------------------------------------- |
| `label.ui-textarea` | Container element.                                             |
| `.ui-label`         | The label for the field.                                       |
| `.ui-start-text`    | Start text displayed above the field.                          |
| `.ui-field`         | The boxed textarea area.                                       |
| `.ui-header`        | Content above the textarea, inside the border, with a divider. |
| `.ui-prefix`        | Content at the inline-start of the field, inside the border.   |
| `<textarea>`        | The textarea element.                                          |
| `.ui-suffix`        | Content at the inline-end of the field, inside the border.     |
| `.ui-footer`        | Content below the textarea, inside the border, with a divider. |
| `.ui-end-text`      | Supporting text displayed below the field.                     |

#### CSS variables

| Variable                        | Default                                                                                       | Description                                                                                                                                                                                                                      |
| ------------------------------- | --------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--ui-border-radius`            | `var(--size-2)`                                                                               | Corner radius for every component: cards, callouts, menus, buttons and fields follow it, and small parts like `kbd`, tooltips and checkboxes never get rounder than it. Set it to `0` for square corners. Takes a single length. |
| `--ui-disabled-opacity`         | `0.64`                                                                                        | Opacity applied to disabled controls.                                                                                                                                                                                            |
| `--ui-duration`                 | `0.2s`                                                                                        | Default transition duration. Multiplied by `--ui-motion`.                                                                                                                                                                        |
| `--ui-ease`                     | `ease`                                                                                        | Default easing for transitions.                                                                                                                                                                                                  |
| `--ui-field-border-color`       | `var(--ui-border-color)`                                                                      | Border color for `TextField`, `Select`, `Textarea`, `Radio` and `Range`.                                                                                                                                                         |
| `--ui-field-border-radius`      | Unset                                                                                         | Corner radius for fields. When unset, they follow `--ui-border-radius`, also where it's set on a part of the page.                                                                                                               |
| `--ui-field-border-width`       | `1px`                                                                                         | Border width for fields, `Checkbox`, `Radio` and `Switch`.                                                                                                                                                                       |
| `--ui-field-helper-color`       | `var(--ui-text-muted)`                                                                        | Text color for helper and end text under a field.                                                                                                                                                                                |
| `--ui-field-helper-font-size`   | `var(--font-size-0)`                                                                          | Font size for helper and end text under a field.                                                                                                                                                                                 |
| `--ui-field-helper-line-height` | `var(--font-lineheight-3)`                                                                    | Line height for helper and end text under a field.                                                                                                                                                                               |
| `--ui-field-label-color`        | `var(--ui-text-primary)`                                                                      | Text color for field labels.                                                                                                                                                                                                     |
| `--ui-field-label-font-size`    | `var(--ui-font-size-05)`                                                                      | Font size for field labels.                                                                                                                                                                                                      |
| `--ui-field-label-font-weight`  | `var(--ui-font-weight-semibold)`                                                              | Font weight for emphasized field labels and legends.                                                                                                                                                                             |
| `--ui-field-required-color`     | `var(--ui-invalid-text-color)`                                                                | Color of the required asterisk.                                                                                                                                                                                                  |
| `--ui-field-size`               | `var(--ui-control-size)`                                                                      | Default field height.                                                                                                                                                                                                            |
| `--ui-field-size-large`         | `var(--ui-control-size-large)`                                                                | Field height with `.ui-large`.                                                                                                                                                                                                   |
| `--ui-field-size-small`         | `var(--ui-control-size-small)`                                                                | Field height with `.ui-small`.                                                                                                                                                                                                   |
| `--ui-field-size-x-small`       | `var(--ui-control-size-x-small)`                                                              | Field height with `.ui-x-small`.                                                                                                                                                                                                 |
| `--ui-focus-ring-color`         | `rgb( from var(--ui-surface-default) calc(255 - r) calc(255 - g) calc(255 - b) )`             | Color of the keyboard focus ring. By default the page background color inverted.                                                                                                                                                 |
| `--ui-focus-ring-offset`        | `2px`                                                                                         | Distance between a control and its focus ring.                                                                                                                                                                                   |
| `--ui-focus-ring-style`         | `solid`                                                                                       | Outline style of the focus ring.                                                                                                                                                                                                 |
| `--ui-focus-ring-width`         | `2px`                                                                                         | Width of the focus ring.                                                                                                                                                                                                         |
| `--ui-font-body`                | `var(--font-sans)`                                                                            | Font family for body text, fields and buttons. Defaults to Open Props `--font-sans`.                                                                                                                                             |
| `--ui-font-size-05`             | `0.875rem`                                                                                    | A font size between Open Props `--font-size-0` and `--font-size-1`, used for labels and compact text.                                                                                                                            |
| `--ui-icon-size`                | `var(--size-4)`                                                                               | Default icon size inside components.                                                                                                                                                                                             |
| `--ui-invalid-color`            | `var(--ui-critical)`                                                                          | Color for invalid field borders, fills and outlines.                                                                                                                                                                             |
| `--ui-invalid-text-color`       | `light-dark( var(--ui-invalid-color), oklch(from var(--ui-invalid-color) max(l, 0.75) c h) )` | Color for validation messages and invalid labels. Lighter than `--ui-invalid-color` in dark mode so the text stays readable.                                                                                                     |
| `--ui-motion`                   | `1`                                                                                           | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/html/guide/theming.md#motion).                         |
| `--ui-primary`                  | `light-dark(var(--ui-color-9), var(--ui-color-6))`                                            | Brand color for primary actions and accents.                                                                                                                                                                                     |
| `--ui-shadow-control`           | `none`                                                                                        | Shadow of buttons with a variant and of fields. `none` by default, for themes that lift controls off the page.                                                                                                                   |
| `--ui-surface-default`          | `light-dark(var(--ui-gray-1), var(--ui-gray-13))`                                             | Page and card background.                                                                                                                                                                                                        |
| `--ui-surface-tonal`            | `light-dark(var(--ui-gray-3), var(--ui-gray-12))`                                             | Background of tonal variants.                                                                                                                                                                                                    |
| `--ui-text-muted`               | `light-dark(var(--ui-gray-13), var(--ui-gray-4))`                                             | Body text color.                                                                                                                                                                                                                 |
| `--ui-text-primary`             | `light-dark(var(--ui-gray-15), var(--ui-gray-1))`                                             | Emphasized text color for headings, labels and values.                                                                                                                                                                           |

This component uses these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md).

## Component properties

Set these on the component itself, inline or in your own CSS. Inputs are the knobs. Outputs are derived from the inputs and the current state, so overriding one fixes it in every state. [Customizing](https://open-props-ui.netlify.app/html/guide/customizing.md#component-properties) has examples.

| Property            | Kind  | Description                                              |
| ------------------- | ----- | -------------------------------------------------------- |
| `--_max-block-size` | Input | Maximum height the `textarea` grows to with its content. |

## Under the hood

Read the post: [Textareas that grow with field-sizing](https://open-props-ui.netlify.app/learn/textarea-field-sizing)

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
   - `--_max-block-size` changes the 20 line cap, as in the library. Past it, the text scrolls

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
  font-size: var(--ui-font-size-05);
  font-weight: 600;
  margin-block-end: 0.25rem;
}

.field {
  background-color: var(--ui-surface-default);
  border: 1px solid var(--ui-field-border-color);
  border-radius: var(--radius-2);
  display: grid;
}

.field textarea {
  background: transparent;
  border: 0;
  color: var(--ui-text-primary);
  font: inherit;
  inline-size: 100%;
  line-height: 1.5;
  outline: 0;
  padding: 0.5rem;
}

.textarea:focus-within .field {
  border-color: var(--ui-primary);
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
  min-block-size: calc(0.5rem * 2 + 3lh);
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

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/html/guide/browser-support/?components=Textarea.md).

## Installation

### Dependencies

- [Text Field](https://open-props-ui.netlify.app/html/components/text-field.md)

* `opui-css/css/components/text-field.css`
* `opui-css/css/components/textarea.css`

## Changelog

### What's new

- [x-small and large](#sizes) sizes with `.ui-x-small` and `.ui-large`.
- [Spread](#spread) fields line up at one width.
- The minimum height is three lines plus padding at every [size](#sizes).
- Breaking: mark an invalid field with `aria-invalid="true"` on the `<textarea>` instead of `data-invalid` on the root ([Validation](#validation)).
- Breaking: `--_accent-color` is `--_accent`, `--_height` is `--_min-height`, `--_label-color` is `--_affix-color` and `--_end-text-color` is `--_helper-color` ([Under the hood](#under-the-hood)).
- `--_duration` and `--_ease` set the transition duration and easing ([Under the hood](#under-the-hood)).
- Corners follow `--ui-border-radius` through [`--ui-field-border-radius`](#api), so one token squares or rounds every component.
