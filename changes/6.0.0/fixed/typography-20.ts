import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Typography` linked `code` in rich text has no inline padding where its background is transparent, so the underline doesn't run past the text.",
} satisfies Change
