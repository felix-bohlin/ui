# Textarea

## Anatomy

Label Description  ¢ EUR Header Footer Supporting text

- `label.ui-textarea`

  Container element.

- `.ui-label`

  The label for the field.

- `.ui-start-text`

  Description text displayed above the field.

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

## Description

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
    <textarea
      aria-describedby="supporting-end-text-1"
      placeholder="Default"
    ></textarea>
  </span>
  <span class="ui-end-text" id="supporting-end-text-1">Supporting text</span>
</label>


<label class="ui-textarea ui-filled">
  <span class="ui-label">Label</span>
  <span class="ui-field">
    <textarea
      aria-describedby="supporting-end-text-2"
      placeholder="Filled"
    ></textarea>
  </span>
  <span class="ui-end-text" id="supporting-end-text-2">Supporting text</span>
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

Add `[required]` to the `<textarea>` element to toggle required styles.

Add `aria-invalid="true"` to the `<textarea>` to toggle invalid styles. Screen readers announce it as invalid. Make use of the end text to give extra feedback on the error, and point `aria-describedby` at it.

Fields also get the invalid styles from the browser's own validation (`:user-invalid`), after the user has edited them. Use `aria-invalid="true"` for server-side errors.

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
      <textarea
        aria-describedby="validation-end-text-1"
        aria-invalid="true"
        placeholder="Default"
      ></textarea>
    </span>
    <span class="ui-end-text" id="validation-end-text-1"
      >Only double-negatives are allowed.</span
    >
  </label>
  <label class="ui-textarea ui-filled">
    <span class="ui-label">Label</span>
    <span class="ui-field">
      <textarea
        aria-describedby="validation-end-text-2"
        aria-invalid="true"
        placeholder="Filled"
      ></textarea>
    </span>
    <span class="ui-end-text" id="validation-end-text-2"
      >Only letters from the first half of the alphabet are allowed.</span
    >
  </label>
</div>
```

## Spread

Add the `.ui-spread` class to display the label and description on the left with the textarea on the right. The layout collapses to a column on narrow containers.

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
    <textarea
      aria-describedby="orientation-end-text-1"
      placeholder="Additional notes..."
    ></textarea>
  </span>
  <span class="ui-end-text" id="orientation-end-text-1"
    >Maximum 500 characters</span
  >
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
    <textarea
      aria-describedby="orientation-end-text-2"
      aria-invalid="true"
    ></textarea>
  </span>
  <span class="ui-end-text" id="orientation-end-text-2"
    >This value is too short.</span
  >
</label>


<label class="ui-textarea ui-spread">
  <span class="ui-label">Bio</span>
  <span class="ui-start-text">Shown on your public profile</span>
  <span class="ui-field">
    <textarea placeholder="Tell us about yourself..."></textarea>
    <span class="ui-prefix">
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
    </span>
    <span class="ui-footer">280 characters left</span>
  </span>
</label>


<label class="ui-textarea ui-spread ui-filled">
  <span class="ui-label">Release notes</span>
  <span class="ui-start-text">Shown on the changelog page</span>
  <span class="ui-field">
    <textarea
      aria-describedby="orientation-end-text-3"
      placeholder="Markdown supported..."
    ></textarea>
    <span class="ui-header">v1.4.0</span>
    <span class="ui-footer">Saved 2 minutes ago</span>
  </span>
  <span class="ui-end-text" id="orientation-end-text-3"
    >Drafts are auto-saved</span
  >
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

| Type       | Modifiers                               | Default | Description                                                                 |
| ---------- | --------------------------------------- | ------- | --------------------------------------------------------------------------- |
| Auto-fit   | `.ui-auto-fit`                          | -       | Lets the width follow the content and allows resizing in both directions.   |
| Layout     | `.ui-spread`                            | -       | Pushes the label and description to one side and the textarea to the other. |
| Sizes      | `.ui-large`, `.ui-small`, `.ui-x-small` | -       | The size of the element.                                                    |
| Validation | `textarea[aria-invalid="true"]`         | -       | Marks the control invalid and shows error styles.                           |
| Variants   | default, `.ui-filled`                   | default | The variant to use.                                                         |

#### Parts

| Part                | Description                                                    |
| ------------------- | -------------------------------------------------------------- |
| `label.ui-textarea` | Container element.                                             |
| `.ui-label`         | The label for the field.                                       |
| `.ui-start-text`    | Description text displayed above the field.                    |
| `.ui-field`         | The boxed textarea area.                                       |
| `.ui-header`        | Content above the textarea, inside the border, with a divider. |
| `.ui-prefix`        | Content at the inline-start of the field, inside the border.   |
| `<textarea>`        | The textarea element.                                          |
| `.ui-suffix`        | Content at the inline-end of the field, inside the border.     |
| `.ui-footer`        | Content below the textarea, inside the border, with a divider. |
| `.ui-end-text`      | Supporting text displayed below the field.                     |

#### CSS variables

| Variable                     | Default                                                                                 | Description                                                                                                                                                                                              |
| ---------------------------- | --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--disabled-opacity`         | `0.64`                                                                                  | Opacity applied to disabled controls.                                                                                                                                                                    |
| `--duration`                 | `0.2s`                                                                                  | Default transition duration. Multiplied by `--motion`.                                                                                                                                                   |
| `--ease`                     | `ease`                                                                                  | Default easing for transitions.                                                                                                                                                                          |
| `--field-border-color`       | `var(--border-color)`                                                                   | Border color for `TextField`, `Select`, `Textarea`, `Radio` and `Range`.                                                                                                                                 |
| `--field-border-radius`      | `var(--size-2)`                                                                         | Corner radius for fields.                                                                                                                                                                                |
| `--field-border-width`       | `1px`                                                                                   | Border width for fields, `Checkbox`, `Radio` and `Switch`.                                                                                                                                               |
| `--field-helper-color`       | `var(--text-muted)`                                                                     | Text color for helper and end text under a field.                                                                                                                                                        |
| `--field-helper-font-size`   | `var(--font-size-0)`                                                                    | Font size for helper and end text under a field.                                                                                                                                                         |
| `--field-helper-line-height` | `var(--font-lineheight-3)`                                                              | Line height for helper and end text under a field.                                                                                                                                                       |
| `--field-label-color`        | `var(--text-primary)`                                                                   | Text color for field labels.                                                                                                                                                                             |
| `--field-label-font-size`    | `var(--font-size-05)`                                                                   | Font size for field labels.                                                                                                                                                                              |
| `--field-label-font-weight`  | `var(--font-weight-semibold)`                                                           | Font weight for emphasized field labels and legends.                                                                                                                                                     |
| `--field-required-color`     | `var(--invalid-text-color)`                                                             | Color of the required asterisk.                                                                                                                                                                          |
| `--field-size`               | `var(--control-size)`                                                                   | Default field height.                                                                                                                                                                                    |
| `--field-size-large`         | `var(--control-size-large)`                                                             | Field height with `.ui-large`.                                                                                                                                                                           |
| `--field-size-small`         | `var(--control-size-small)`                                                             | Field height with `.ui-small`.                                                                                                                                                                           |
| `--field-size-x-small`       | `var(--control-size-x-small)`                                                           | Field height with `.ui-x-small`.                                                                                                                                                                         |
| `--focus-ring-color`         | Unset                                                                                   | Color of the keyboard focus ring. When unset, the ring uses the page background color inverted.                                                                                                          |
| `--focus-ring-offset`        | `2px`                                                                                   | Distance between a control and its focus ring.                                                                                                                                                           |
| `--focus-ring-style`         | `solid`                                                                                 | Outline style of the focus ring.                                                                                                                                                                         |
| `--focus-ring-width`         | `2px`                                                                                   | Width of the focus ring.                                                                                                                                                                                 |
| `--font-size-05`             | `0.875rem`                                                                              | A font size between Open Props `--font-size-0` and `--font-size-1`, used for labels and compact text.                                                                                                    |
| `--icon-size`                | `var(--size-4)`                                                                         | Default icon size inside components.                                                                                                                                                                     |
| `--invalid-color`            | `var(--critical)`                                                                       | Color for invalid field borders, fills and outlines.                                                                                                                                                     |
| `--invalid-text-color`       | `light-dark( var(--invalid-color), oklch(from var(--invalid-color) max(l, 0.75) c h) )` | Color for validation messages and invalid labels. Lighter than `--invalid-color` in dark mode so the text stays readable.                                                                                |
| `--motion`                   | `1`                                                                                     | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/html/guide/theming.md#motion). |
| `--primary`                  | `light-dark(var(--color-9), var(--color-6))`                                            | Brand color for primary actions and accents.                                                                                                                                                             |
| `--surface-default`          | `light-dark(var(--gray-1), var(--gray-13))`                                             | Page and card background.                                                                                                                                                                                |
| `--surface-tonal`            | `light-dark(var(--gray-3), var(--gray-12))`                                             | Background of tonal variants.                                                                                                                                                                            |
| `--text-muted`               | `light-dark(var(--gray-13), var(--gray-4))`                                             | Body text color.                                                                                                                                                                                         |
| `--text-primary`             | `light-dark(var(--gray-15), var(--gray-1))`                                             | Emphasized text color for headings, labels and values.                                                                                                                                                   |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md) for the full list.

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

- `opui-css/css/components/text-field.css`
- `opui-css/css/components/textarea.css`

## Changelog

### What's new

- [x-small and large](#sizes) sizes with `.ui-x-small` and `.ui-large`.
- [Spread](#spread) fields line up at one width.
- Breaking: mark an invalid field with `aria-invalid="true"` on the `<textarea>` instead of `data-invalid` on the root ([Validation](#validation)).
