import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`TextField`, `Textarea` and `Select` in Astro and Vue generate an `id` for the control only when the label or the password toggle points at it. Pass `id` when something outside the component needs to reference the control.",
  migrating: ["select", "text-field", "textarea"],
} satisfies Change
