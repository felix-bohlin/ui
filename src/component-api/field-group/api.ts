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
        "Sets `name` on the OPUI fields inside that don't set their own.",
      prop: "name",
    },
    {
      default: '"auto"',
      description:
        "The orientation of the fields. With `auto`, fields stack and a group with only buttons lines up in a row.",
      group: "Orientation",
      prop: "orientation",
      values: {
        auto: null,
        horizontal: ".ui-horizontal",
        vertical: ".ui-vertical",
      },
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
