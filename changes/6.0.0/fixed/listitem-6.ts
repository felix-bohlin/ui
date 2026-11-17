import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`ListItem`, `Range`, `Textarea` and `TextField` in Vue follow a slot the parent adds or removes after they mount: an end text behind `v-if` shows and is linked with `aria-describedby`, and a `label` slot added later makes the `TextField` root a `<label>`.",
} satisfies Change
