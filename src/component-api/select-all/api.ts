import { elementNotes } from "../frameworks.ts"
import type { ComponentApi } from "../types"

export default {
  component: "SelectAll",
  css: ["select-all"],
  elements: [
    {
      members: [
        {
          description:
            "The controlling checkbox, the one with `data-select-all`, or `null`. Read-only.",
          kind: "property",
          name: "control",
        },
        {
          description:
            "The enabled checkboxes it controls, in document order. Read-only.",
          kind: "property",
          name: "items",
        },
        {
          description:
            "Sets the controlling checkbox's `checked` and `indeterminate` from the others. The element calls it when one changes, so call it only after setting `checked` from a script.",
          kind: "method",
          name: "sync()",
        },
      ],
      tag: "opui-select-all",
    },
  ],
  notes: {
    ...elementNotes(
      "select-all.js",
      "Leave the controlling checkbox uncontrolled: the element sets its `checked` and `indeterminate`.",
    ),
    html: 'Wrap the group in `<opui-select-all class="ui-select-all">`, add `data-select-all` to the controlling checkbox and import `opui-css/elements/select-all.js`.',
  },
  options: [],
  page: "checkbox",
  parts: [
    {
      code: '<input type="checkbox" data-select-all>',
      description:
        "The checkbox that checks and unchecks the other enabled checkboxes inside. It's checked when they all are, and `indeterminate` when some are.",
      selector: "input[data-select-all]",
    },
  ],
  root: {
    description:
      "The `<opui-select-all>` custom element, `display: contents`, around the group, such as a `Fieldset` or a `Table`.",
    selector: "opui-select-all.ui-select-all",
  },
  slots: [
    {
      description:
        "The group: the controlling checkbox and the checkboxes it controls.",
      name: "default",
    },
  ],
  source: "SelectAll",
} satisfies ComponentApi
