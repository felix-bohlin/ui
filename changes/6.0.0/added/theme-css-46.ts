import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`theme.css` adds optional rich text tokens, rounded to `--ui-rhythm-step` where they set a space. `--ui-rich-text-flow-gap` is the space between paragraphs, lists, blockquotes, tables, `details` and `address` in `.ui-rich-text` (`1.25em` when unset), and code blocks, figures and `hr` take multiples of it. `--ui-rich-text-heading-margin-block-start` and `--ui-rich-text-heading-margin-block-end` are the space above and below `h1` to `h6`, where `em` is the heading's own font size (a multiple of the flow gap per level when unset). `--ui-rich-text-line-height` is the line height of rich text (the surrounding one when unset).",
} satisfies Change
