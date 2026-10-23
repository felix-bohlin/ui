import type { ComponentApi } from "../types"

export default {
  component: "Chip",
  options: [
    {
      default: '"div"',
      description: 'The element to render. Defaults to `"a"` with `href`.',
      prop: "as",
      type: '"a" | "button" | "div"',
    },
    {
      default: "false",
      description:
        'Disables a button chip. A link chip drops its `href` and gets `aria-disabled="true"` instead.',
      prop: "disabled",
    },
    {
      class: ".ui-dot",
      default: "false",
      description:
        "Adds a leading dot in the chip's color. Its shape follows the severity.",
      group: "Dot",
      prop: "dot",
    },
    {
      description: "The link to use. Renders an `<a>`.",
      prop: "href",
    },
    {
      class: ".ui-multiline",
      default: "false",
      description: "Lets the label wrap to multiple lines.",
      group: "Layout",
      prop: "multiline",
    },
    {
      description:
        "The severity of a status chip. It tints the chip, and colors and shapes its dot.",
      group: "Severities",
      prop: "severity",
      values: {
        critical: ".ui-critical",
        info: ".ui-info",
        neutral: ".ui-neutral",
        success: ".ui-success",
        warning: ".ui-warning",
      },
    },
    {
      default: '"medium"',
      description: "The size of the element.",
      group: "Sizes",
      prop: "size",
      values: {
        large: ".ui-large",
        medium: null,
        small: ".ui-small",
        "x-small": ".ui-x-small",
      },
    },
    {
      description:
        'Disables a button chip. A link chip, which can\'t take `disabled`, drops its `href` and takes `aria-disabled="true"` instead. On a static chip, `aria-disabled="true"` only dims it a little and keeps its text readable.',
      frameworks: ["html"],
      group: "State",
      prop: "state",
      values: {
        button: "button[disabled]",
        link: 'a[aria-disabled="true"]',
        static: 'div[aria-disabled="true"]',
      },
    },
    {
      default: '"tonal"',
      description: "The variant to use.",
      group: "Variants",
      prop: "variant",
      values: { outlined: ".ui-outlined", tonal: null },
    },
  ],
  parts: [
    {
      code: "<svg>",
      description: "Optional content at the start, such as an icon.",
      selector: ".ui-chip > svg:first-child",
      slots: ["start"],
    },
    {
      description: "The label, text or rich content.",
      props: ["label"],
      selector: ".ui-chip > .ui-text",
      slots: ["label"],
    },
    {
      code: "<svg>",
      description: "Optional content at the end, such as an icon.",
      selector: ".ui-chip > svg:last-child",
      slots: ["end"],
    },
  ],
  root: {
    description: "Container element. Can be a `<div>`, `<a>` or `<button>`.",
    selector: ".ui-chip",
  },
  source: "Chip",
} satisfies ComponentApi
