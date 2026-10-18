import type { ComponentApi } from "../types"

export default {
  component: "AvatarGroup",
  notes: {
    html: 'The root needs `role="group"` and an `aria-label`.',
  },
  options: [],
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
