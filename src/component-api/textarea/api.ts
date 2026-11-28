import type { ComponentApi } from "../types"

export default {
  component: "Textarea",
  css: ["field", "textarea"],
  notes: {
    default: "Write a `<textarea>` in a `Field`, with its `id` set to `for`.",
    react: "Write a `<textarea>` in a `Field`, with its `id` set to `htmlFor`.",
    html: "Put the `<textarea>` in `.ui-field-container`.",
  },
  options: [],
  parts: [
    {
      code: "<textarea>",
      description:
        "Your textarea, `rows` lines tall (3 by default), growing to `--_max-block-size` (20 lines). It resizes taller, and wider with `autoFit` on the `Field`.",
      htmlDescription:
        "Your textarea, `rows` lines tall (3 by default), growing to `--_max-block-size` (20 lines). It resizes taller, and wider with `.ui-auto-fit` on the `.ui-field`.",
      selector: ".ui-field-container > textarea",
    },
  ],
  root: {
    description: "A `.ui-field` with a `<textarea>`.",
    selector: ".ui-field:has(> .ui-field-container > textarea)",
  },
} satisfies ComponentApi
