import type { ComponentApi } from "../types"

export default {
  component: "Avatar",
  options: [
    {
      description:
        "The accessible name of a link or button avatar, instead of `label`. The Astro, React and Svelte types require one of `label`, `aria-label` and `aria-labelledby` on a link or button. In Vue it passes through as an attribute.",
      inherited: true,
      prop: "aria-label",
      type: "string",
    },
    {
      description:
        "The id of the element that names a link or button avatar, instead of `label`.",
      inherited: true,
      prop: "aria-labelledby",
      type: "string",
    },
    {
      default: '"div"',
      description: 'The element to render. Defaults to `"a"` with `href`.',
      prop: "as",
    },
    {
      default: "false",
      description:
        'Disables a button avatar. A link avatar drops its `href` and gets `role="link"` and `aria-disabled="true"` instead.',
      prop: "disabled",
    },
    {
      description: "The link to use. Renders an `<a>`.",
      prop: "href",
    },
    {
      description:
        "The name of the person or thing: the `alt` of the image, or visually hidden text next to the letters or icon. Leave it out when the name is shown next to the avatar, which then is decorative. A link or button avatar needs it.",
      htmlDescription:
        'The name of the person or thing: the `alt` of the image, or a `.ui-sr-only` element after the letters or icon. Leave it out when the name is shown next to the avatar, with `alt=""` on the image. A link or button avatar needs it.',
      prop: "label",
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
      description:
        "The image source. Replaces the content. Without it, the avatar shows its content, so a missing photo falls back to the letters.",
      prop: "src",
    },
    {
      default: '"filled"',
      description:
        "The variant to use. `filled` is the primary color, `outlined` the border color with no fill and `tonal` the primary tint.",
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
        'Disables a button avatar. A link avatar, which can\'t take `disabled`, drops its `href` and takes `role="link"` and `aria-disabled="true"` instead.',
      frameworks: ["html"],
      group: "State",
      prop: "state",
      values: { button: "button[disabled]", link: 'a[aria-disabled="true"]' },
    },
  ],
  parts: [
    {
      code: "<img>",
      description: "The avatar image. Its `alt` is `label`.",
      props: ["label", "src"],
      selector: "img",
    },
  ],
  root: {
    description: "Container element.",
    selector: ".ui-avatar",
  },
  slots: [
    {
      description:
        "Letters or an icon, when there's no image. They are hidden from assistive technology: `label` names the avatar.",
      name: "default",
    },
  ],
  source: "Avatar",
} satisfies ComponentApi
