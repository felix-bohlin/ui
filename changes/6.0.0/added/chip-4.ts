import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Chip` takes a `severity` prop (`.ui-critical`, `.ui-info`, `.ui-neutral`, `.ui-success`, `.ui-warning`) that tints a tonal chip, and `dot` (`.ui-dot`) for a leading dot in that color. The dot is a diamond for critical, a triangle for warning and a ring for neutral, and stays visible in forced colors mode. On an outlined chip only the dot is colored. The tint, border, text, dot and the hover of a button or link chip read the `--ui-palette-*` roles, like `Callout`. In print, `print-color-adjust: exact` keeps the tint and the dot.",
  notes: {
    chip: {
      default: `<a href="#severities">Severities</a> for statuses with <code>severity</code>, and a shape-coded <a href="#dot"><code>dot</code></a>.`,
      html: `<a href="#severities">Severities</a> for statuses with <code>.ui-success</code>, <code>.ui-warning</code> and more, and a shape-coded <a href="#dot"><code>.ui-dot</code></a>.`,
    },
  },
} satisfies Change
