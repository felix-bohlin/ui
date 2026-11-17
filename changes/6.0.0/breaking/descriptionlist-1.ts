import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`DescriptionList` in Vue exports `DescriptionListDescription` instead of `Description`, like Astro.",
  migrating: ["description-list"],
} satisfies Change
