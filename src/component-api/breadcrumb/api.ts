import type { ComponentApi } from "../types"

export default {
  component: "Breadcrumb",
  keyboard: [
    {
      description: "Moves focus to the next link or the `…` button.",
      keys: ["Tab"],
    },
    {
      description: "Moves focus to the previous link or the `…` button.",
      keys: ["Shift + Tab"],
    },
    {
      description: "Follows the link, or opens the menu from the `…` button.",
      keys: ["Enter"],
    },
    {
      description: "Opens the menu from the `…` button.",
      keys: ["Space"],
    },
    {
      description: "Closes the menu.",
      keys: ["Esc"],
    },
  ],
  notes: {
    html: 'The root is a `nav` with an `aria-label` around an `ol` of links. `aria-current="page"` marks the current page, on its link or on a `span`.',
  },
  options: [
    {
      attribute: "[aria-label]",
      description: "Accessible name of the landmark.",
      group: "Label",
      inherited: true,
      prop: "aria-label",
      type: "string",
    },
    {
      description: "The id of the element that names the landmark.",
      inherited: true,
      prop: "aria-labelledby",
      type: "string",
    },
    {
      description:
        "The levels, as `{ current, href, label }` objects. The last one is current unless it sets `current: false`.",
      group: "Items",
      prop: "items",
    },
    {
      description:
        'Accessible name of the `…` button. Required with `items` and `overflow="menu"`.',
      group: "Menu label",
      prop: "menuLabel",
    },
    {
      default: '"wrap"',
      description: "What a trail too long for its row does.",
      group: "Overflow",
      prop: "overflow",
      values: {
        menu: ".ui-overflow-menu",
        scroll: ".ui-overflow-scroll",
        shrink: ".ui-overflow-shrink",
        wrap: null,
      },
    },
    {
      default: '"medium"',
      description: "The size of the element.",
      group: "Sizes",
      prop: "size",
      values: { medium: null, small: ".ui-small" },
    },
  ],
  parts: [
    {
      code: "<ol>",
      description: "The list of levels.",
      selector: "ol",
    },
    {
      code: "<li>",
      component: "BreadcrumbItem",
      description: "A level, with the separator before it.",
      props: ["items"],
      selector: "li",
    },
    {
      code: "<li>",
      description: 'With `overflow="menu"`, the `…` button and its menu.',
      props: ["menuLabel"],
      selector: "li:has(> .ui-menu)",
    },
    {
      code: '<span class="ui-separator">',
      description: "Replaces the drawn separator of the levels in `items`.",
      selector: ".ui-separator",
      slots: ["separator"],
    },
  ],
  root: {
    description: "The navigation landmark.",
    selector: "nav.ui-breadcrumb",
  },
  slots: [
    {
      description: "The levels, after `items`.",
      name: "default",
    },
  ],
  source: "Breadcrumb",
} satisfies ComponentApi
