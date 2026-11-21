import type { CustomProperties } from "../types"

export default {
  "--_min-inline-size": {
    description:
      "The least width of the input, which otherwise fits its value, unless `stretch` is set. `4ch`, instead of the `8ch` of the other fields, which `text-field.css` keeps next to the affixes.",
    kind: "input",
  },
} satisfies CustomProperties
