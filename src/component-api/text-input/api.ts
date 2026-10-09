import type { ComponentApi } from "../types"

export default {
  component: "Text input",
  css: ["text-input"],
  notes: {
    astro:
      "Styles a Text field with a `list`. There is no separate Astro component.",
    html: "Needs `text-field.css`. It holds the field, variant and size styles.",
    svelte:
      "Styles a Text field with a `list`. There is no separate Svelte component.",
    vue: "Styles a Text field with a `list`. There is no separate Vue component.",
  },
  options: [],
  parts: [],
  root: {
    description:
      "A text field whose input has a `list` (autosuggest). Hides the browser's datalist arrow and draws the Select chevron at the inline end of the field.",
    selector: ".ui-text-field:has(input[list])",
  },
} satisfies ComponentApi
