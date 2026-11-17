import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Dialog` page scroll lock lives in `core/utils.css`, shared with a modal `Drawer` and `.ui-scroll-lock`, and no longer sets `block-size: 100%` on `html`. If you import single files, import `utils.css` too, or the page scrolls behind a modal dialog.",
  migrating: ["dialog"],
  notes: {
    dialog: `the page scroll lock of <a href="#modal">modal dialogs</a> lives in <code>utils.css</code>. Import it too if you import single files.`,
  },
} satisfies Change
