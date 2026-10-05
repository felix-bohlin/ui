import type { ComponentApi } from "../types"

export default {
  component: "Avatar",
  options: [
    {
      description: "Alternative text for the image.",
      frameworks: ["astro", "svelte", "vue"],
      prop: "alt",
      type: "string",
    },
    {
      description:
        'The element to render. Defaults to `"a"` with `href`, otherwise `"div"`.',
      prop: "as",
    },
    {
      description: "The command to send to the `commandfor` target.",
      prop: "command",
    },
    {
      description: "The id of the element the command targets.",
      prop: "commandfor",
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
      description: "The id of the element to show on interest.",
      prop: "interestfor",
    },
    {
      class: ".ui-avatar-group",
      default: "false",
      description: "Renders a container that groups avatars.",
      group: "Group",
      prop: "isGroup",
    },
    {
      description: "The image source. Replaces the content.",
      frameworks: ["astro", "svelte", "vue"],
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
