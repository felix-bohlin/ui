import type { ComponentApi } from "../types"

export default {
  component: "IconButton",
  notes: {
    astro: "Add `aria-label` to give the button an accessible name.",
    html: "Add `aria-label` to give the button an accessible name.",
    vue: "Add `aria-label` to give the button an accessible name.",
  },
  options: [
    {
      description:
        'The element to render. Defaults to `"a"` with `href`, otherwise `"button"`.',
      prop: "as",
    },
    {
      description: "Optional colors.",
      group: "Colors",
      prop: "color",
      values: { critical: ".ui-critical", primary: ".ui-primary" },
    },
    {
      attribute: "[disabled]",
      default: "false",
      description: "Disables the button.",
      group: "State",
      prop: "disabled",
    },
    {
      description: "The link to use. Renders an `<a>`.",
      prop: "href",
    },
    {
      description: "The size of the element.",
      group: "Sizes",
      prop: "size",
      values: { small: ".ui-small" },
    },
    {
      description: "The variant to use.",
      group: "Variants",
      prop: "variant",
      values: {
        filled: ".ui-filled",
        outlined: ".ui-outlined",
        tonal: ".ui-tonal",
      },
    },
  ],
  parts: [
    {
      code: "<svg>",
      description: "The icon.",
      selector: ".ui-icon-button > svg",
      slots: ["default"],
    },
  ],
  root: {
    description: "Container element.",
    selector: ".ui-icon-button",
  },
  source: "IconButton",
} satisfies ComponentApi
