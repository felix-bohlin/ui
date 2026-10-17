import type { ComponentApi } from "../types"

export default {
  component: "Avatar",
  options: [
    {
      description:
        "Alternative text for the image. Required with src; use an empty string when the name is shown next to it.",
      frameworks: ["astro", "react", "svelte", "vue"],
      prop: "alt",
      type: "string",
    },
    {
      description:
        'The element to render. Defaults to `"a"` with `href`, otherwise `"div"`.',
      prop: "as",
    },
    {
      description: 'Disables the avatar when `as` is `"button"`.',
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
      values: {
        large: ".ui-large",
        small: ".ui-small",
        "x-small": ".ui-x-small",
      },
    },
    {
      description: "The image source. Replaces the content.",
      frameworks: ["astro", "react", "svelte", "vue"],
      prop: "src",
      type: "string",
    },
    {
      description: "The variant to use.",
      group: "Variants",
      prop: "variant",
      values: {
        rounded: ".ui-rounded",
        squared: ".ui-squared",
        squircle: ".ui-squircle",
      },
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
