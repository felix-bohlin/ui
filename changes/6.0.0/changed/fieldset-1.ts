import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Fieldset` rendered as another element with `as` names itself from its `FieldLegend`: it gets `aria-labelledby` pointing at the legend, which takes a generated id in every framework, also over an `id` you pass the legend, unless you pass `aria-label` or `aria-labelledby`.",
} satisfies Change
