import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Divider` draws its line as a border, like a native `hr`, so it prints when the browser leaves out background graphics, and forced colors mode draws it in `CanvasText` without a rule of its own.",
} satisfies Change
