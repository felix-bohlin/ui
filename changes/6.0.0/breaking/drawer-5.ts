import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Drawer` header, content and footer rules, its backdrop and its closed state live in `card.css`, shared with `Dialog`. If you import single files, import `card.css` too, or the drawer's parts lose their layout and scroll shadows, and a closed drawer stays on the page.",
  migrating: ["drawer"],
  notes: {
    drawer: `the header, content and footer rules, the backdrop and the closed state live in <code>card.css</code>, shared with Dialog. Import it too when you <a href="#installation">install single files</a>, or a closed drawer stays on the page.`,
  },
} satisfies Change
