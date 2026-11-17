import { components, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`DialogHeader` takes `closeButton`, which adds a close button at the end of the title row, like `DrawerHeader`, named by `closeLabel` ("Close" by default). It closes its `Dialog` with `command="close"`, through the dialog\'s `id`, and takes a `close-icon` slot (`closeIcon` in React and Svelte). Outside a `Dialog`, set its `commandfor` prop to the dialog\'s `id`. A dev warning says when it\'s missing.',
  notes: {
    dialog: {
      ...components(
        `<a href="#close-button"><code>closeButton</code></a> on <code>DialogHeader</code> adds a close button at the end of the title row, named by <code>closeLabel</code>. Outside a <code>Dialog</code>, <code>commandfor</code> names the dialog it closes.`,
      ),
      html: `A <a href="#basics">close button</a> after the heading stays on the title row when a paragraph follows it.`,
    },
  },
} satisfies Change
