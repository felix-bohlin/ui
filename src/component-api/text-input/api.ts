import type { ComponentApi } from "../types"

export default {
  component: "Text input",
  css: ["text-input"],
  notes: {
    default: "Styles a Text field with a `list`.",
    html: "Needs `text-field.css`. It holds the field, variant and size styles.",
  },
  options: [],
  parts: [],
  root: {
    description:
      "A text field whose input has a `list` (autosuggest). Hides the browser's datalist arrow and draws the Select chevron at the inline end of the field.",
    selector: ".ui-text-field:has(input[list])",
  },
} satisfies ComponentApi
