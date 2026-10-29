import type { ComponentApi } from "../types"

export default {
  component: "Avatar",
  options: [
    {
      description:
        "Alternative text for the image. Required with `src`. Use an empty string when the name is shown next to it.",
      prop: "alt",
    },
    {
      default: '"div"',
      description: 'The element to render. Defaults to `"a"` with `href`.',
      prop: "as",
    },
    {
      default: "false",
      description:
        'Disables a button avatar. A link avatar drops its `href` and gets `aria-disabled="true"` instead.',
      prop: "disabled",
    },
    {
      description: "The link to use. Renders an `<a>`.",
      prop: "href",
    },
    {
      default: '"circle"',
      description: "The shape of the avatar.",
      group: "Shape",
      prop: "shape",
      values: {
        circle: null,
        rounded: ".ui-rounded",
        squared: ".ui-squared",
        squircle: ".ui-squircle",
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
      description: "The image source. Replaces the content.",
      prop: "src",
    },
    {
      default: '"filled"',
      description:
        "The variant to use. `filled` is the primary color, `tonal` its tint and `outlined` the border color with no fill.",
      group: "Variants",
      prop: "variant",
      values: {
        filled: null,
        outlined: ".ui-outlined",
        tonal: ".ui-tonal",
      },
    },
    {
      description:
        'Disables a button avatar. A link avatar, which can\'t take `disabled`, drops its `href` and takes `aria-disabled="true"` instead.',
      frameworks: ["html"],
      group: "State",
      prop: "state",
      values: { button: "button[disabled]", link: 'a[aria-disabled="true"]' },
    },
  ],
  parts: [
    {
      code: "<img>",
      description: "The avatar image.",
      props: ["src", "alt"],
      selector: "img",
    },
  ],
  root: {
    description: "Container element.",
    selector: ".ui-avatar",
  },
  slots: [
    {
      description: "Letters or an icon, when there's no image.",
      name: "default",
    },
  ],
  source: "Avatar",
} satisfies ComponentApi
