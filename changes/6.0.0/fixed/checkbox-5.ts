import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Checkbox` and `Radio` put the hover and press halo behind the input with `isolation` and `z-index` instead of 3D transforms, so a long list of them no longer adds several compositor layers per control.",
} satisfies Change
