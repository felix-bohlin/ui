import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`List` only styles direct `li`/`option` children (and options in a `[role="group"]`) as rows, so nested lists inside a row stay normal lists. Headings and paragraphs in `.ui-text` have no margin.',
} satisfies Change
