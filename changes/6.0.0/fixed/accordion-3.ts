import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Accordion` focus ring is drawn inside the summary of `.ui-elevated`, `.ui-outlined`, `.ui-tonal` and grouped accordions, so the card no longer clips it, and outside the summary of a transparent accordion, so it no longer cuts through the text and marker.",
} satisfies Change
