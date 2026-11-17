import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Range` in Astro types its extra attributes as `<input>` attributes only, since they go to the input (types).",
  migrating: ["range"],
} satisfies Change
