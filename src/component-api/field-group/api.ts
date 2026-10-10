import type { ComponentApi } from "../types"

export default {
  component: "FieldGroup",
  css: ["form"],
  notes: {
    html: "To label the group, wrap it in a `.ui-fieldset` with a `<legend>`.",
  },
  options: [
    {
      description:
        "The orientation of the fields. Without it, fields stack and a group with only buttons lines up in a row.",
      group: "Orientation",
      prop: "direction",
      values: { column: ".ui-column", row: ".ui-row" },
    },
    {
      description:
        "Sets `name` on the fields inside. Skips button, hidden, image, reset and submit inputs. In Svelte and Vue, only on OPUI components.",
      prop: "name",
    },
  ],
  page: "form",
  parts: [],
  root: {
    description: "Container element.",
    selector: ".ui-field-group",
  },
  slots: [
    {
      description: "The fields, such as checkboxes, radios or switches.",
      name: "default",
    },
  ],
  source: "FieldGroup",
} satisfies ComponentApi
