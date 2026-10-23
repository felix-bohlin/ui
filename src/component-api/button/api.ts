import type { ComponentApi } from "../types"

export default {
  component: "Button",
  options: [
    {
      description:
        "The accessible name. Required with `iconOnly`, for buttons without visible text.",
      prop: "aria-label",
    },
    {
      default: '"button"',
      description: 'The element to render. Defaults to `"a"` with `href`.',
      prop: "as",
    },
    {
      description: "Optional colors.",
      group: "Colors",
      prop: "color",
      values: { critical: ".ui-critical", primary: ".ui-primary" },
    },
    {
      attribute: '[aria-current="page"]',
      description:
        "Keeps the pressed background on a default (text) button link, for the current page in navigation.",
      frameworks: ["html"],
      group: "Current",
      prop: "current",
    },
    {
      default: "false",
      description:
        'Disables the button. A link button drops its `href` and gets `aria-disabled="true"`.',
      prop: "disabled",
    },
    {
      description:
        'Disables the button. A link button, which can\'t take `disabled`, drops its `href` and takes `aria-disabled="true"` instead.',
      frameworks: ["html"],
      group: "State",
      prop: "disabledState",
      values: { button: "[disabled]", link: 'a[aria-disabled="true"]' },
    },
    {
      description: "The link to use. Renders an `<a>`.",
      prop: "href",
    },
    {
      default: "false",
      description:
        "Marks the button as icon-only, so `aria-label` is required. Types only.",
      prop: "iconOnly",
    },
    {
      class: ".ui-round",
      default: "false",
      description: "Fully rounded corners, a circle when icon-only.",
      group: "Shape",
      prop: "round",
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
      default: '"transparent"',
      description: "The variant to use.",
      group: "Variants",
      prop: "variant",
      values: {
        filled: ".ui-filled",
        outlined: ".ui-outlined",
        tonal: ".ui-tonal",
        transparent: null,
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
    {
      code: "<kbd>",
      description: "An optional keyboard hint.",
      selector: ".ui-button kbd",
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
