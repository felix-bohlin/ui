# Textarea

**Quick start.** Run `npm install opui-css open-props`, then import the component and its styles. See [Getting started](https://open-props-ui.netlify.app/vue/guide/getting-started.md) for the full setup.

```vue
<script setup lang="ts">
import "opui-css/css/components/text-field.css"
import "opui-css/css/components/textarea.css"
import { Textarea } from "opui-css/vue"
</script>
```

## Variants

```vue
<script setup lang="ts">
import { Textarea } from "opui-css/vue"
</script>


<template>
  <Textarea label="Default" placeholder="Placeholder" />
  <Textarea label="Filled" placeholder="Placeholder" filled />
</template>
```

## Sizes

```vue
<script setup lang="ts">
import { Textarea } from "opui-css/vue"
</script>


<template>
  <Textarea label="Small outlined" placeholder="Placeholder" small />
  <Textarea label="Small filled" placeholder="Placeholder" small filled />
</template>
```

## End text

```vue
<script setup lang="ts">
import { Textarea } from "opui-css/vue"
</script>


<template>
  <Textarea label="Label" placeholder="Default" endText="Supporting text" />
  <Textarea
    label="Label"
    placeholder="Filled"
    endText="Supporting text"
    filled
  />
</template>
```

## Affix

Use the `prefix`, `suffix`, `header`, and `footer` slots to affix content inside the textarea's border. Header and footer are particularly useful for filenames and character counters.

```vue
<script setup lang="ts">
import { Textarea } from "opui-css/vue"
</script>


<template>
  <Textarea label="Notes" placeholder="Add a note...">
    <template #prefix
      ><svg
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
        ></path></svg
    ></template>
  </Textarea>
</template>
```

### Headers and footers

```vue
<script setup lang="ts">
import { Textarea } from "opui-css/vue"
</script>


<template>
  <Textarea label="Code" placeholder="console.log('Hello, world!')">
    <template #header>script.js</template>
  </Textarea>


  <Textarea label="Comment" placeholder="Write a comment...">
    <template #footer>0 / 280</template>
  </Textarea>
</template>
```

## Validation

Add the `required` attribute on the component. It is forwarded to the underlying `<textarea>`.

Use the `error` prop to toggle invalid styles. It renders`data-invalid` on the root element. Make use of the end text to give extra feedback on the error.

```vue
<script setup lang="ts">
import { Textarea } from "opui-css/vue"
</script>


<template>
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
</template>
```

## Spread

Use the `spread` boolean prop to display the label and description on the left with the textarea on the right. The layout collapses to a column on narrow containers.

```vue
<script setup lang="ts">
import { Textarea } from "opui-css/vue"
</script>


<template>
  <Textarea spread placeholder="Hello, world!">
    <template #label>Message</template>
    <template #description
      >You can write your message here. Keep it short, preferably under 100
      characters.</template
    >
  </Textarea>


  <Textarea spread placeholder="Additional notes..." filled>
    <template #label>Notes</template>
    <template #description>Add any additional notes or comments</template>
    <template #end-text>Maximum 500 characters</template>
  </Textarea>


  <Textarea spread required label="Required">
    <template #description>You must provide a response</template>
  </Textarea>


  <Textarea spread disabled label="Disabled">
    <template #description>This textarea is disabled</template>
  </Textarea>


  <Textarea spread error label="Invalid Message">
    <template #description>This textarea has an error</template>
    <template #end-text>This value is too short.</template>
  </Textarea>


  <Textarea spread label="Bio" placeholder="Tell us about yourself...">
    <template #description>Shown on your public profile</template>
    <template #prefix>
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
    </template>
    <template #footer>280 characters left</template>
  </Textarea>


  <Textarea
    spread
    filled
    label="Release notes"
    placeholder="Markdown supported..."
  >
    <template #description>Shown on the changelog page</template>
    <template #header>v1.4.0</template>
    <template #footer>Saved 2 minutes ago</template>
    <template #end-text>Drafts are auto-saved</template>
  </Textarea>
</template>
```

## Auto-fit

When enabled the Field changes size depending on its content.

```vue
<script setup lang="ts">
import { Textarea } from "opui-css/vue"
</script>


<template>
  <Textarea label="Auto-fit" placeholder="Auto-fit" autoFit />
</template>
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

See also the [full browser support guide](https://open-props-ui.netlify.app/vue/guide/browser-support.md).

## Source

### Dependencies

- [Text Field](https://open-props-ui.netlify.app/vue/components/text-field.md)

- `opui-css/css/components/text-field.css`
- `opui-css/css/components/textarea.css`

