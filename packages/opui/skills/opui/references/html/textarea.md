# Textarea

## Anatomy

LabelDescription¢EURHeaderFooterSupporting text

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

```html
<label class="ui-textarea ui-small">
  <span class="ui-label">Small outlined</span>
  <span class="ui-field">
    <textarea placeholder="Placeholder"></textarea>
  </span>
</label>


<label class="ui-textarea ui-filled ui-small">
  <span class="ui-label">Small filled</span>
  <span class="ui-field">
    <textarea placeholder="Placeholder"></textarea>
  </span>
</label>
```

## End text

```html
<label class="ui-textarea">
  <span class="ui-label">Label</span>
  <span class="ui-field">
    <textarea aria-describedby="end-text-1" placeholder="Default"></textarea>
  </span>
  <span class="ui-end-text" id="end-text-1">Supporting text</span>
</label>


<label class="ui-textarea ui-filled">
  <span class="ui-label">Label</span>
  <span class="ui-field">
    <textarea aria-describedby="end-text-2" placeholder="Filled"></textarea>
  </span>
  <span class="ui-end-text" id="end-text-2">Supporting text</span>
</label>
```

## Affix

Add `.ui-prefix`, `.ui-suffix`, `.ui-header`, or`.ui-footer` elements inside `.ui-field` to affix content inside the textarea's border.

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

Add `data-invalid` on the root element to toggle invalid styles. Make use of the end text to give extra feedback on the error.

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
  <label class="ui-textarea" data-invalid>
    <span class="ui-label">Label</span>
    <span class="ui-field">
      <textarea
        aria-describedby="end-text-1"
        aria-invalid="true"
        placeholder="Default"
      ></textarea>
    </span>
    <span class="ui-end-text" id="end-text-1"
      >Only double-negatives are allowed.</span
    >
  </label>
  <label class="ui-textarea ui-filled" data-invalid>
    <span class="ui-label">Label</span>
    <span class="ui-field">
      <textarea
        aria-describedby="end-text-2"
        aria-invalid="true"
        placeholder="Filled"
      ></textarea>
    </span>
    <span class="ui-end-text" id="end-text-2"
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
      aria-describedby="end-text-1"
      placeholder="Additional notes..."
    ></textarea>
  </span>
  <span class="ui-end-text" id="end-text-1">Maximum 500 characters</span>
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


<label class="ui-textarea ui-spread" data-invalid>
  <span class="ui-label">Invalid Message</span>
  <span class="ui-start-text">This textarea has an error</span>
  <span class="ui-field">
    <textarea aria-describedby="end-text-2" aria-invalid="true"></textarea>
  </span>
  <span class="ui-end-text" id="end-text-2">This value is too short.</span>
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
      aria-describedby="end-text-3"
      placeholder="Markdown supported..."
    ></textarea>
    <span class="ui-header">v1.4.0</span>
    <span class="ui-footer">Saved 2 minutes ago</span>
  </span>
  <span class="ui-end-text" id="end-text-3">Drafts are auto-saved</span>
</label>
```

## Auto-fit

When enabled the Field changes size depending on its content.

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

| Type       | Modifiers        | Default | Description                                                                 |
| ---------- | ---------------- | ------- | --------------------------------------------------------------------------- |
| Auto-fit   | `.ui-auto-fit`   | -       | Changes height depending on its content.                                    |
| Layout     | `.ui-spread`     | -       | Pushes the label and description to one side and the textarea to the other. |
| Sizes      | `.ui-small`      | -       | The size of the element.                                                    |
| Validation | `[data-invalid]` | -       | Shows error styles.                                                         |
| Variants   | `.ui-filled`     | -       | The variant to use.                                                         |

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

## Browser support

- Chromium: Full support Supported since v125.
- Firefox: Full support Supported since v152.
- Safari: Full support Supported since v26.2.

See also the [full browser support guide](https://open-props-ui.netlify.app/html/guide/browser-support.md).

## Installation

### Dependencies

- [Text Field](https://open-props-ui.netlify.app/html/components/text-field.md)

- `opui-css/css/components/text-field.css`
- `opui-css/css/components/textarea.css`

