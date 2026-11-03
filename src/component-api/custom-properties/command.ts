import type { CustomProperties } from "../types"

export default {
  "--_max-block-size": {
    description:
      "The most the list grows before it scrolls. Defaults to `20rem`; set it to `none` to let a container such as a dialog decide.",
    kind: "input",
  },
  "--_radius": {
    description:
      "Corner radius of the outlined variant. Defaults to `--ui-radius`.",
    kind: "input",
  },
} satisfies CustomProperties
