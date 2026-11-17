import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`FieldGroup` `name` only applies to its own fields in Astro and Vue, and `ToggleGroup` `name` and selection only to its own buttons in Astro. A field or button after a group, or behind an async component in the next group, no longer takes the group's name.",
} satisfies Change
