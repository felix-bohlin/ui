import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`Accordion` group styles only apply to a `Card` with `role="group"` whose accordions are direct children, and to their own `summary`, so a card with an accordion inside its `CardContent` keeps its layout and padding, and an accordion nested in the first or last item keeps its own corners and focus ring.',
} satisfies Change
