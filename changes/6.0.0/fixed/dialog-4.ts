import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Dialog` actions only tighten the end padding when the last button is a text button, keeping room for its focus ring like `Card`, and start-aligned actions use Card's padding, so filled buttons line up with the content.",
} satisfies Change
