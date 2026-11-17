import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Switch` marks an invalid switch like an invalid `Checkbox` or `Radio`: its track border is `--ui-invalid`, and a checked track turns red with a `--ui-on-fill` thumb, instead of a ring around the track that pushed the focus ring out and looked like a focus ring in forced colors.",
} satisfies Change
