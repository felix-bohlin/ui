import type { ComponentApi } from "../types"

export default {
  component: "FieldGroup",
  css: ["form"],
  notes: {
    html: "Wrap it in a `.ui-fieldset` with a `<legend>` to group and label it.",
  },
  options: [
    {
      description: "The orientation of the element.",
      group: "Orientation",
      prop: "direction",
      values: { column: null, row: ".ui-row" },
    },
    {
      description:
        "Sets `name` on the fields inside. Skips button, hidden, image, reset and submit inputs. In Solid and Vue, only on OPUI components.",
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
