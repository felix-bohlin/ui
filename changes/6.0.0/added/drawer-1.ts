import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Drawer` takes `closeOnNavigate` (`[data-close-on-navigate]`): the drawer closes when the page navigates, through a link inside it, Back and Forward or a client router, with `opui-css/elements/close-on-navigate.js`, which the component loads and which reads the Navigation API. A `pushState()` or `replaceState()` that keeps the path, like one that only updates the query, leaves it open.",
  notes: {
    drawer: {
      default: `<a href="#navigation"><code>closeOnNavigate</code></a> closes a navigation drawer when the page navigates, also with a client router.`,
      html: `<a href="#navigation"><code>data-close-on-navigate</code></a> with <code>opui-css/elements/close-on-navigate.js</code> closes a navigation drawer when the page navigates, also with a client router.`,
    },
  },
} satisfies Change
