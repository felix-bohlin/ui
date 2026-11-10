import type { ComponentApi } from "../types"

export default {
  component: "Button",
  keyboard: [
    {
      description:
        "Moves focus to the button. A disabled button is skipped, and so is a disabled link button, which has no `href`.",
      keys: ["Tab"],
    },
    {
      description:
        "Activates the button, or follows the link of a button with `href`.",
      keys: ["Enter"],
    },
    {
      description:
        "Activates the button. A button with `href` is a link, which ignores it.",
      keys: ["Space"],
    },
  ],
  options: [
    {
      description:
        "The accessible name, for a button without visible text. React and Svelte require it, or `aria-labelledby`, when there are no `children`.",
      inherited: true,
      prop: "aria-label",
      type: "string",
    },
    {
      description:
        "The id of the element that names a button without visible text, instead of `aria-label`.",
      inherited: true,
      prop: "aria-labelledby",
      type: "string",
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
      default: "false",
      description:
        'Disables the button. A link button drops its `href` and gets `role="link"` and `aria-disabled="true"`.',
      prop: "disabled",
    },
    {
      description:
        'Marks the link to the current page in navigation with the selected tint and strong text (a filled button drops its fill), or dims a disabled one. A link button, which can\'t take `disabled`, drops its `href` and takes `role="link"` and `aria-disabled="true"` instead.',
      frameworks: ["html"],
      group: "State",
      prop: "state",
      values: {
        current: '[aria-current="page"]',
        disabled: "[disabled]",
        disabledLink: 'a[aria-disabled="true"]',
      },
    },
    {
      description: "The link to use. Renders an `<a>`.",
      prop: "href",
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
      default: '"button"',
      description:
        'The button type. Use `"submit"` to submit a form, which a native `<button>` does by default.',
      inherited: true,
      prop: "type",
      type: '"button" | "reset" | "submit"',
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
        "The label next to an icon. The CSS styles the `span`, and `.ui-text` is a hook for your own styles.",
      selector: ".ui-button > span",
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
