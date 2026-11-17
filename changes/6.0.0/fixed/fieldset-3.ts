import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Fieldset` with `disabled` dims its legend, description and end text instead of the whole fieldset, so the controls inside, which dim themselves, are no longer dimmed twice.",
} satisfies Change
