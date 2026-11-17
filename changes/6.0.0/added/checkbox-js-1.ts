import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`checkbox.js` sets itself up on import and keeps each checkbox's `indeterminate` property in step with its `data-indeterminate` attribute, also when the attribute changes or a checkbox is added later, and exports `syncIndeterminate(input)`, which sets one checkbox's property from its attribute. The module ships type declarations.",
} satisfies Change
