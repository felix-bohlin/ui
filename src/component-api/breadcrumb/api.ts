import type { ComponentApi } from "../types"

export default {
  component: "Breadcrumb",
  keyboard: [
    {
      description:
        "Moves focus to the next link. A current page without `href` is no stop.",
      keys: ["Tab"],
    },
    {
      description: "Moves focus to the previous link.",
      keys: ["Shift + Tab"],
    },
    {
      description: "Follows the focused link.",
      keys: ["Enter"],
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
      default: '"wrap"',
      description:
        "What a trail too long for its row does: wrap onto more rows, scroll inline, or truncate every level but the first and the current one.",
      group: "Overflow",
      prop: "overflow",
      values: {
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
