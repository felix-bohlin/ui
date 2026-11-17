import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Chip` takes a `large` size (`.ui-large`, 40px) for chips next to default-size fields and buttons. Chip heights come from `--ui-chip-size-small`, `--ui-chip-size` and `--ui-chip-size-large`, which follow the control size scale.",
  notes: {
    chip: {
      default: `<a href="#sizes">Large</a> size with <code>size="large"</code>, and small chips are 28px to match the control sizes.`,
      html: `<a href="#sizes">Large</a> size with <code>.ui-large</code>, and small chips are 28px to match the control sizes.`,
    },
  },
} satisfies Change
