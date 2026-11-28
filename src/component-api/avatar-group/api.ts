import type { ComponentApi } from "../types"

export default {
  component: "AvatarGroup",
  notes: {
    html: 'The root needs `role="group"` and an `aria-label`.',
  },
  options: [
    {
      attribute: "[aria-label]",
      description:
        "The accessible name of the group. Give it one, or `aria-labelledby`.",
      frameworks: ["html", "nunjucks", "vue"],
      group: "Label",
      inherited: true,
      prop: "aria-label",
      type: "string",
    },
    {
      description:
        "The accessible name of the group. The types require it, or `aria-labelledby`.",
      frameworks: ["astro", "react", "solid", "svelte"],
      prop: "aria-label",
    },
    {
      description:
        "The id of the element that names the group, instead of `aria-label`.",
      inherited: true,
      prop: "aria-labelledby",
      type: "string",
    },
    {
      default: '"group"',
      description: "The `role` of the root. A passed role replaces `group`.",
      inherited: true,
      prop: "role",
      type: "string",
    },
  ],
  page: "avatar",
  parts: [],
  root: {
    description: "A group of overlapping avatars.",
    selector: ".ui-avatar-group",
  },
  slots: [
    {
      description: "The avatars.",
      name: "default",
    },
  ],
  source: "Avatar",
} satisfies ComponentApi
