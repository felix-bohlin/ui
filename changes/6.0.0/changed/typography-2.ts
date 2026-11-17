import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Typography` rich text spacing derives from one flow space (`1.25em` of the body text), and every margin derived from it snaps to `--ui-rhythm-step`. Headings get more space above than below, so they sit closer to the text they introduce, and lists with block content, description lists, `details`, `address`, code blocks and figures follow the same rhythm.",
} satisfies Change
