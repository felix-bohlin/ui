import type { ComponentApi } from "../types"

export default {
  component: "BreadcrumbItem",
  options: [
    {
      attribute: '[aria-current="page"]',
      default: "false",
      description:
        "Marks the current page, in the strong text color at medium weight.",
      group: "Current",
      prop: "current",
    },
    {
      description: "Renders the level as a link. Without it, a `span`.",
      group: "Href",
      prop: "href",
    },
    {
      description: "The name of the level, before the default slot.",
      group: "Label",
      prop: "label",
    },
  ],
  page: "breadcrumb",
  parts: [
    {
      code: '<span class="ui-separator">',
      description:
        "Replaces the drawn separator before the level. Hidden from screen readers.",
      selector: ".ui-separator",
      slots: ["separator"],
    },
    {
      code: "<a>",
      description:
        "The level, as a link in the subtle text color that underlines on hover and focus, or a `span`.",
      props: ["current", "href", "label"],
      selector: "a, span:not(.ui-separator)",
    },
  ],
  root: {
    description: "A level.",
    selector: "li",
  },
  slots: [
    {
      description: "The name of the level, after `label`, such as an icon.",
      name: "default",
    },
  ],
  source: "Breadcrumb",
} satisfies ComponentApi
