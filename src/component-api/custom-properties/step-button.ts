import type { CustomProperties } from "../types"

export default {
  "--_min-inline-size": {
    description:
      "The least width of the input of a field with step buttons and `autoFit`, which otherwise fits its value. `4ch`, instead of the `8ch` of the other fields, which `field.css` keeps next to the affixes.",
    kind: "input",
  },
} satisfies CustomProperties
