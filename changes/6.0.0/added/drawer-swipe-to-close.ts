import type { Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`Drawer` at the block start or end closes when you swipe it toward its edge, from the grab handle it shows on a touch screen or from its header, past a quarter of its size or with a flick. The swipe is a close request: `closedby="none"` turns it off and hides the handle, and a `cancel` listener can keep the drawer open. The content scrolls as usual. `--_handle-border-color` sets the handle\'s color. `opui-css/elements/drawer-swipe.js` runs it, and the Astro, React, Svelte and Vue components import it.',
  notes: {
    drawer: `On a touch screen, a drawer at the block start or end <a href="#swipe-to-close">closes with a swipe</a> of its grab handle or header toward the edge.`,
  },
} satisfies Change
