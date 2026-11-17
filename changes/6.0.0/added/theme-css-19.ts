import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`theme.css` has font tokens: `--ui-font-body` for text, fields and buttons, `--ui-font-heading` for `h1`–`h6` and `.ui-h1`–`.ui-h6`, and `--ui-font-code` for `code`, `kbd`, `samp` and `pre` in rich text, `.ui-kbd`, `.ui-samp`, `.ui-var`, code blocks and `kbd` in buttons and lists. `--ui-font-heading` is unset and headings follow `--ui-font-body` per element.",
} satisfies Change
