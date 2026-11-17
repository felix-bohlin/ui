import { slots, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`TextField`, `Textarea` and `Select` take `startText` (the `start-text` slot) instead of `description`, matching `endText`, `Range` and the `.ui-start-text` class.",
  migrating: ["select", "text-field", "textarea"],
  notes: {
    select: slots(
      `<code>startText</code> replaces <code>description</code>, matching <code>endText</code> (<a href="#spread">Spread</a>).`,
    ),
    "text-field": slots(
      `<a href="#start-text"><code>startText</code></a> replaces <code>description</code>, matching <code>endText</code>. <code>supportingText</code> is gone, use <a href="#end-text"><code>endText</code></a>.`,
    ),
    textarea: slots(
      `<a href="#start-text"><code>startText</code></a> replaces <code>description</code>, matching <code>endText</code>. <code>supportingText</code> is gone, use <a href="#end-text"><code>endText</code></a>.`,
    ),
  },
} satisfies Change
