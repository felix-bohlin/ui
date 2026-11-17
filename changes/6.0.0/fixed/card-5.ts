import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Card`, `Accordion` and `Dialog` actions line up the label of a text button at their start or end with the content: the button pulls itself out by its padding and border (`--_actions-shift`), as far as the focus ring stays inside the padding the actions have (`--_actions-padding-inline`), in a dense or spacious card and an accordion group too. Accordion actions had no compensation, so the label sat 14px inside the content edge.",
} satisfies Change
