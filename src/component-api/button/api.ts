import type { ComponentApi } from "../types"

export default {
  component: "Button",
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
      default: "false",
      description:
        "Marks the button as icon-only, so `label` is required. Types only.",
      frameworks: ["astro", "svelte", "vue"],
      prop: "iconOnly",
      type: "boolean",
    },
    {
      description: "The accessible name. Use it on icon-only buttons.",
      frameworks: ["astro", "svelte", "vue"],
      prop: "label",
      type: "string",
    },
    {
      class: ".ui-rounded",
      default: "false",
      description: "Fully rounded corners, a circle when icon-only.",
      group: "Shape",
      prop: "rounded",
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
      description: "An optional icon.",
      selector: ".ui-button > svg",
    },
    {
      code: '<span class="ui-text">',
      description:
        "The label. Wrap it when the button has an icon. The CSS looks for the element, the class is a hook.",
      selector: ".ui-button > .ui-text",
    },
  ],
  root: {
    description: "Container element.",
    selector: ".ui-button",
  },
  slots: [
    {
      description: "The label and an optional icon.",
      name: "default",
    },
  ],
  source: "Button",
} satisfies ComponentApi
