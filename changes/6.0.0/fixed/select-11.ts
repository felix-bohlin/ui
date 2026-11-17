import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Select` in Astro closes its `<selectedcontent>` element. The Astro compiler drops the end tag of a literal `<selectedcontent>`, so the whitespace after it ended up inside it.",
} satisfies Change
