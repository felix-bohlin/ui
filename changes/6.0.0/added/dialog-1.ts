import { components, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Dialog` and `Drawer` share their parts: a header row whose title (`DialogTitle`, `DrawerTitle`) takes the free space and names the overlay, a paragraph in the header gets a row of its own under the title and the buttons next to it, the content draws its focus ring inside when it is focusable, and the footer (`DialogFooter`, `DrawerFooter`) is a row for buttons, text or anything else, with `align`. `.ui-actions` groups the buttons in a footer and moves them to the end when other content comes first.",
  notes: {
    dialog: [
      {
        ...components(
          `The <a href="#footer"><code>DialogFooter</code></a> holds buttons, text or anything else, and <code>.ui-actions</code> groups the buttons in it.`,
        ),
        html: `The <a href="#footer">footer</a> holds buttons, text or anything else, and <code>.ui-actions</code> groups the buttons in it.`,
      },
      components(
        `<a href="#footer"><code>DialogFooter</code></a> only adds a class for <code>align="start"</code>. The default end alignment renders no <code>.ui-align-end</code>.`,
      ),
    ],
  },
} satisfies Change
