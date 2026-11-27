import type { ComponentApi } from "../types"

export default {
  component: "Breadcrumb",
  keyboard: [
    {
      description:
        'Moves focus to the next link. A current page without `href` is no stop. With `overflow="menu"`, the `…` button is a stop, and from it Tab moves into its open menu.',
      keys: ["Tab"],
    },
    {
      description: "Moves focus to the previous link.",
      keys: ["Shift + Tab"],
    },
    {
      description:
        "Follows the focused link. On the `…` button, opens or closes the menu of collapsed levels.",
      keys: ["Enter"],
    },
    {
      description: "On the `…` button, works like Enter.",
      keys: ["Space"],
    },
    {
      description: "Closes the open menu and returns focus to the `…` button.",
      keys: ["Esc"],
    },
  ],
  notes: {
    html: 'The root is a `nav` with an `aria-label` around an `ol` of links. `aria-current="page"` marks the current page, on its link or on a `span`.',
  },
  options: [
    {
      attribute: "[aria-label]",
      description:
        "The accessible name of the landmark. The Astro, React, Solid and Svelte types require it, or `aria-labelledby`. In Vue it passes through as an attribute.",
      group: "Label",
      inherited: true,
      prop: "aria-label",
      type: "string",
    },
    {
      description:
        "The id of the element that names the landmark, instead of `aria-label`.",
      inherited: true,
      prop: "aria-labelledby",
      type: "string",
    },
    {
      description:
        "The levels, as `{ current, href, label }` objects, before the default slot. The last one is the current page unless it sets `current: false`. A level without `href` renders a `span`.",
      group: "Items",
      prop: "items",
    },
    {
      description:
        'The accessible name of the button that opens the collapsed levels, in the page\'s language. Required with `items` and `overflow="menu"`.',
      group: "Menu label",
      prop: "menuLabel",
    },
    {
      default: '"wrap"',
      description:
        "What a trail too long for its row does: wrap onto more rows, collapse the levels between the first and the parent into a menu, scroll inline, or truncate every level but the first and the current one.",
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
      description:
        'With `overflow="menu"`, the second item: a `Button` that opens a `Menu` of the levels between the first and the parent. Shown when there are more than three levels.',
      props: ["menuLabel"],
      selector: "li:has(> .ui-menu)",
    },
    {
      code: '<span class="ui-separator">',
      description:
        "Replaces the drawn separator of the levels in `items`. Hidden from screen readers.",
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
