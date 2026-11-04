import { components } from "../frameworks.ts"
import type { ComponentApi } from "../types"

export default {
  component: "SelectAll",
  css: ["select-all"],
  notes: {
    ...components(
      "The component loads `opui-css/elements/select-all.js`. In React, Svelte and Vue it runs once the component hydrates, or once the page imports the module. Leave the controlling checkbox uncontrolled: the element sets its `checked` and `indeterminate`.",
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
