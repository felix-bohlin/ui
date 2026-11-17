import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry: "`Range`, `Switch` and `TextField` invalid states use `--ui-invalid`.",
  notes: {
    range: `An <a href="#validation">invalid</a> range reads <code>--ui-invalid</code>, like every invalid control.`,
    "text-field": `With more contrast, <a href="#validation">invalid</a> fields keep the lighter <code>--ui-invalid</code> of dark mode, which every invalid control now shares.`,
  },
} satisfies Change
