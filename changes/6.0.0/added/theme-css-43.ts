import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`theme.css` adds optional `--ui-link-font-weight`, the weight of `.ui-link` and of links in `.ui-rich-text` (`--ui-font-weight-bold`, the heading weight, when unset), and `--ui-link-visited-text-color`, the text and underline color of a visited link, which promises 4.5:1 against every surface. Visited links look like the others when it is unset.",
} satisfies Change
