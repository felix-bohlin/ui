import type { ComponentApi } from "../types"

export default {
  component: "ListItem",
  css: ["list", "menu"],
  notes: {
    html: "To make the item interactive, wrap the content in an `<a>`, `<button>` or `<label>`.",
  },
  options: [
    {
      description:
        'The element to render inside the `<li>`: `"a"`, `"button"` or `"div"`. Defaults to `"a"` when `href` is set. A `<button>` gets `type="button"`.',
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
      class: ".ui-critical",
      default: "false",
      description: "A destructive item in a [Menu](/components/menu).",
      group: "Colors",
      prop: "critical",
    },
    {
      description: 'Disables the item when `as` is `"button"`.',
      prop: "disabled",
    },
    {
      description: "The `for` attribute of the `<label>` when `type` is set.",
      frameworks: ["astro", "svelte", "vue"],
      prop: "for",
    },
    {
      description: "The link to use. Renders an `<a>` inside the `<li>`.",
      prop: "href",
    },
    {
      description: "The `for` attribute of the `<label>` when `type` is set.",
      frameworks: ["react"],
      prop: "htmlFor",
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
        "Highlights the current item, or dims a disabled one. Set it on the `<a>`, `<button>` or `<label>`.",
      frameworks: ["html"],
      group: "State",
      prop: "state",
      values: {
        current: '[aria-current="page"]',
        disabled: "[disabled]",
        disabledLink: '[aria-disabled="true"]',
      },
    },
    {
      description:
        "Wraps the content in a `<label>` for a checkbox, radio or switch. Can't be combined with `as` or `href`.",
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
      code: "<a>, <button>, <label>",
      description: "The clickable row, rendered by `as`, `href` or `type`.",
      props: ["as", "href", "type"],
      selector: ".ui-list > li > :is(a, button, label)",
    },
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
    {
      description:
        "A submenu `Menu`, rendered inside the `<li>` after the element set by `as`.",
      name: "submenu",
    },
  ],
  source: "ListItem",
} satisfies ComponentApi
