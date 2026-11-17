import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`TextField` takes `dropZone` (`.ui-drop-zone`), which makes a `type="file"` field a tall area with a dashed border that takes files dropped anywhere on it.',
  notes: {
    "text-field": {
      default: `<a href="#drop-zone"><code>dropZone</code></a> makes a file field a tall area that takes dropped files.`,
      html: `<a href="#drop-zone"><code>.ui-drop-zone</code></a> makes a file field a tall area that takes dropped files.`,
    },
  },
} satisfies Change
