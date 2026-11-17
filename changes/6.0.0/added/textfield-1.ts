import { components, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`TextField`, `Textarea`, `Select` and `Range` take `hideLabel`, which renders the label as `.ui-sr-only` instead of `.ui-label`, so the field keeps its accessible name without a visible label.",
  notes: {
    range: components(
      `<a href="#api"><code>hideLabel</code></a> hides the label visually and keeps it as the accessible name.`,
    ),
    select: components(
      `<a href="#api"><code>hideLabel</code></a> hides the label visually and keeps it as the accessible name.`,
    ),
    "text-field": components(
      `<a href="#api"><code>hideLabel</code></a> hides the label visually and keeps it as the accessible name.`,
    ),
    textarea: components(
      `<a href="#api"><code>hideLabel</code></a> hides the label visually and keeps it as the accessible name.`,
    ),
  },
} satisfies Change
