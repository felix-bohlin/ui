import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Carousel` takes a `persistentButtons` prop (`.ui-persistent-buttons`) that keeps both buttons visible. A disabled button keeps its fill and gets a more muted border (`--_button-disabled-border-color`).",
  notes: {
    carousel: {
      default: `<a href="#persistent-buttons">Persistent buttons</a> with the <code>persistentButtons</code> prop.`,
      html: `<a href="#persistent-buttons">Persistent buttons</a> with <code>.ui-persistent-buttons</code>.`,
    },
  },
} satisfies Change
