import type { ComponentApi } from "../types"

export default {
  component: "Textarea",
  css: ["field", "textarea"],
  notes: {
    default:
      "Write a `<textarea>` in a `Field`, with its `id` set to `for`, and bind its `value` instead of writing text inside it.",
    react:
      "Write a `<textarea>` in a `Field`, with its `id` set to `htmlFor`, and give it `value` or `defaultValue` instead of children.",
    html: "Put the `<textarea>` directly in `.ui-field-container`. The text inside it is its default value.",
  },
  options: [],
  parts: [
    {
      code: "<textarea>",
      description:
        "Your textarea, directly in `.ui-field-container`. It is `rows` lines tall, 3 by default, grows with its content up to `--_max-block-size` (20 lines) and can be resized taller. With the field's `autoFit` (`.ui-auto-fit`), it can be resized wider too.",
      selector: ".ui-field-container > textarea",
    },
  ],
  root: {
    description:
      "A `.ui-field` with a `<textarea>` in its container. `field.css` draws the box, and `textarea.css` sizes the textarea.",
    selector: ".ui-field:has(> .ui-field-container > textarea)",
  },
} satisfies ComponentApi
