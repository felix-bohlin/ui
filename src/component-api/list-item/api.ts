import type { ComponentApi } from "../types"

export default {
  component: "ListItem",
  css: ["list"],
  notes: {
    html: "Wrap the content in an `<a>`, `<button>` or `<label>` to make the item interactive.",
  },
  options: [
    {
      description:
        'The element to render inside the `<li>`, such as `"a"` or `"button"`.',
      prop: "as",
    },
    {
      class: ".ui-border-top",
      default: "false",
      description: "Adds a border above the item.",
      group: "Border top",
      prop: "borderTop",
    },
    {
      description: "The `for` attribute of the `<label>` when `type` is set.",
      prop: "for",
    },
    {
      description: 'The link to use, with `as="a"`.',
      prop: "href",
    },
    {
      class: ".ui-inset",
      default: "false",
      description: "Aligns the text with items that have start content.",
      group: "Inset",
      prop: "inset",
    },
    {
      description:
        "Wraps the content in a `<label>` for a checkbox, radio or switch.",
      group: "Controls",
      prop: "type",
      values: {
        checkbox: "label.ui-checkbox",
        radio: "label.ui-radio",
        switch: "label.ui-switch",
      },
    },
  ],
  page: "list",
  parts: [
    {
      description: "Optional content at the start, such as an icon or avatar.",
      selector: ".ui-start",
      slots: ["start"],
    },
    {
      description: "The text content.",
      selector: ".ui-text",
      slots: ["text"],
    },
    {
      code: "<p>",
      description: "The headline, the first paragraph.",
      props: ["headline"],
      selector: ".ui-text > p:first-child",
    },
    {
      code: "<p>",
      description: "Supporting text, the second paragraph.",
      props: ["description"],
      selector: ".ui-text > p + p",
    },
    {
      description: "Optional content at the end, such as a value or an action.",
      selector: ".ui-end",
      slots: ["end"],
    },
  ],
  root: {
    code: "<li>",
    description: "The list item.",
    selector: ".ui-list > li",
  },
  slots: [
    {
      description:
        "Extra content inside `.ui-text`, or all the content when there's no text.",
      name: "default",
    },
  ],
  source: "ListItem",
} satisfies ComponentApi
