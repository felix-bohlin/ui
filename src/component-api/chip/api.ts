import type { ComponentApi } from "../types"

export default {
  component: "Chip",
  options: [
    {
      default: '"div"',
      description: 'The element to render. Defaults to `"a"` with `href`.',
      prop: "as",
    },
    {
      description: "Optional colors.",
      group: "Colors",
      prop: "color",
      values: {
        critical: ".ui-critical",
        info: ".ui-info",
        neutral: ".ui-neutral",
        success: ".ui-success",
        warning: ".ui-warning",
      },
    },
    {
      class: ".ui-disabled",
      default: "false",
      description:
        "Dims a static chip. Only changes the look. Use `disabled` on button chips.",
      frameworks: ["html"],
      group: "State",
      prop: "disabled",
    },
    {
      class: ".ui-dot",
      default: "false",
      description:
        "Adds a leading dot in the chip's color. Its shape follows the color.",
      group: "Variants",
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
      description: "The size of the element.",
      group: "Sizes",
      prop: "size",
      values: {
        large: ".ui-large",
        small: ".ui-small",
        "x-small": ".ui-x-small",
      },
    },
    {
      default: '"tonal"',
      description: "The variant to use.",
      group: "Variants",
      prop: "variant",
      values: { outlined: ".ui-outlined", tonal: ".ui-tonal" },
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
      description: "The label.",
      props: ["label"],
      selector: ".ui-text",
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
  slots: [
    {
      description: "Content placed before the label.",
      name: "default",
    },
  ],
  source: "Chip",
} satisfies ComponentApi
