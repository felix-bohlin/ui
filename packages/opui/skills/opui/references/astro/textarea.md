# Textarea

**Quick start**

### npm

```sh
npm install opui-css open-props
```

```astro
---
import "opui-css/css/components/text-field.css"
import "opui-css/css/components/textarea.css"
import { Textarea } from "opui-css/astro"
---
```

[Full setup guide](https://open-props-ui.netlify.app/astro/guide/getting-started.md)

## Variants

```astro
---
import { Textarea } from "opui-css/astro"
---


<Textarea label="Default" placeholder="Placeholder" />
<Textarea label="Filled" placeholder="Placeholder" filled />
```

## Sizes

```astro
---
import { Textarea } from "opui-css/astro"
---


<Textarea label="Small outlined" placeholder="Placeholder" small />
<Textarea label="Small filled" placeholder="Placeholder" small filled />
```

## End text

```astro
---
import { Textarea } from "opui-css/astro"
---


<Textarea label="Label" placeholder="Default" endText="Supporting text" />
<Textarea label="Label" placeholder="Filled" endText="Supporting text" filled />
```

## Affix

Use the `prefix`, `suffix`, `header`, and `footer` slots to affix content inside the textarea's border. Header and footer are particularly useful for filenames and character counters.

```astro
---
import { Textarea } from "opui-css/astro"
---


<Textarea label="Notes" placeholder="Add a note...">
  <svg
    slot="prefix"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
  </svg>
</Textarea>
```

### Headers and footers

```astro
---
import { Textarea } from "opui-css/astro"
---


<Textarea label="Code" placeholder="console.log('Hello, world!')">
  <Fragment slot="header">script.js</Fragment>
</Textarea>


<Textarea label="Comment" placeholder="Write a comment...">
  <Fragment slot="footer">0 / 280</Fragment>
</Textarea>
```

## Validation

Set `required` on the component to toggle required styles on the textarea.

Use the `error` prop to toggle invalid styles. It renders the`data-invalid` attribute on the root element. Make use of the end text to give extra feedback on the error.

```astro
---
import { Textarea } from "opui-css/astro"
---


<div class="example-row">
  <Textarea label="Label" placeholder="Default" required />
  <Textarea label="Label" placeholder="Filled" required filled />
</div>


<div class="example-row">
  <Textarea
    label="Label"
    placeholder="Default"
    endText="Only double-negatives are allowed."
    error
  />
  <Textarea
    label="Label"
    placeholder="Filled"
    endText="Only letters from the first half of the alphabet are allowed."
    error
    filled
  />
</div>
```

## Spread

Use the `spread` boolean prop to display the label and description on the left with the textarea on the right. The layout collapses to a column on narrow containers.

```astro
---
import { Textarea } from "opui-css/astro"
---


<Textarea spread placeholder="Hello, world!">
  <Fragment slot="label">Message</Fragment>
  <Fragment slot="description"
    >You can write your message here. Keep it short, preferably under 100
    characters.</Fragment
  >
</Textarea>


<Textarea spread placeholder="Additional notes..." filled>
  <Fragment slot="label">Notes</Fragment>
  <Fragment slot="description">Add any additional notes or comments</Fragment>
  <Fragment slot="end-text">Maximum 500 characters</Fragment>
</Textarea>


<Textarea spread required label="Required">
  <Fragment slot="description">You must provide a response</Fragment>
</Textarea>


<Textarea spread disabled label="Disabled">
  <Fragment slot="description">This textarea is disabled</Fragment>
</Textarea>


<Textarea spread error label="Invalid Message">
  <Fragment slot="description">This textarea has an error</Fragment>
  <Fragment slot="end-text">This value is too short.</Fragment>
</Textarea>


<Textarea spread label="Bio" placeholder="Tell us about yourself...">
  <Fragment slot="description">Shown on your public profile</Fragment>
  <Fragment slot="prefix">
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
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
      ></path>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    </svg>
  </Fragment>
  <Fragment slot="footer">280 characters left</Fragment>
</Textarea>


<Textarea
  spread
  filled
  label="Release notes"
  placeholder="Markdown supported..."
>
  <Fragment slot="description">Shown on the changelog page</Fragment>
  <Fragment slot="header">v1.4.0</Fragment>
  <Fragment slot="footer">Saved 2 minutes ago</Fragment>
  <Fragment slot="end-text">Drafts are auto-saved</Fragment>
</Textarea>
```

## Auto-fit

When enabled the Field changes size depending on its content.

```astro
---
import { Textarea } from "opui-css/astro"
---


<Textarea label="Auto-fit" placeholder="Auto-fit" autoFit />
```

## Anatomy

1. `label.ui-textarea`: Container element
2. `.ui-label`: Field label element
3. `.ui-field`: The boxed input area
4. `.ui-header`: Optional inside-border header strip (with divider)
5. `.ui-prefix`: Optional inline-start affix
6. `<textarea>`: Textarea element
7. `.ui-suffix`: Optional inline-end affix
8. `.ui-footer`: Optional inside-border footer strip (with divider)
9. `.ui-end-text`: Supporting text element

## API

### Text field API

### Textarea API

## Browser support

- Chromium: Full support Supported since v125.
- Firefox: Full support Supported since v152.
- Safari: Full support Supported since v26.2.

See also the [full browser support guide](https://open-props-ui.netlify.app/astro/guide/browser-support.md).

## Source

### Dependencies

- [Text Field](https://open-props-ui.netlify.app/astro/components/text-field.md)

- `opui-css/css/components/text-field.css`
- `opui-css/css/components/textarea.css`

