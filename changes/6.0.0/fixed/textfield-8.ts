import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`TextField` start and end affixes use the field line height, so they no longer make the field taller on pages with a large line height.",
} satisfies Change
