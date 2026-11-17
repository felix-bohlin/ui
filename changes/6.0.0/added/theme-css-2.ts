import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`theme.css` adds `--ui-choice-label-offset` to nudge `Checkbox`, `Radio` and `Switch` labels against their control for fonts with unusual metrics, and `--ui-invalid-text` for validation messages, darker in light mode and lighter in dark mode so it keeps its contrast on dark and tinted surfaces. The validation messages and invalid labels of `Checkbox`, `Radio`, `Switch`, `Range`, `TextField`, `Textarea` and `Select` read it.",
} satisfies Change
