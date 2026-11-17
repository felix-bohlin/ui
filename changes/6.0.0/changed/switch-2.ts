import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Switch`, `Tooltip`, `Textarea`, `Table`, `List`, `Tabs`, `Spinner`, `Dialog`, `Drawer` and the typography styles use logical properties only (`min-inline-size`, `inset-inline-start`, `padding-block`/`padding-inline`, `resize: block` …), so they follow the writing mode, and the `DescriptionList`, `Range`, `Select` and `TextField` container queries read `inline-size`. Horizontal left-to-right rendering is unchanged.",
} satisfies Change
