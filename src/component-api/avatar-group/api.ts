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
        "The accessible name of the group. The Astro, React and Svelte types require it, or `aria-labelledby`. In Vue it passes through as an attribute.",
      group: "Label",
      inherited: true,
      prop: "aria-label",
      type: "string",
    },
    {
      description:
        "The id of the element that names the group, instead of `aria-label`.",
      inherited: true,
      prop: "aria-labelledby",
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
