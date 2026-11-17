import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`Range` hides its tick mark `<datalist>` from assistive technology with `aria-hidden="true"`, so it isn\'t exposed as an unnamed listbox next to the slider.',
} satisfies Change
