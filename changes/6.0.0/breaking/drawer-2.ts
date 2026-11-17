import { slots, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Drawer` locks page scroll while it is modal, like `Dialog`, also without `.ui-scroll-lock`, except with a transparent backdrop on screens `31.25rem` and wider. `scrollLock` is off by default in Astro and Vue, so a drawer that `show()` opens no longer locks the page: set `scrollLock` (`.ui-scroll-lock`) on it to lock it.",
  migrating: ["drawer"],
  notes: {
    drawer: {
      ...slots(
        `a modal drawer <a href="#basics">locks page scrolling</a> like a modal dialog, but a <a href="#non-modal">non-modal</a> one no longer does by default. Set <code>scrollLock</code> on it, and pass the <code>id</code> the trigger points at.`,
      ),
      html: `a modal drawer <a href="#basics">locks page scrolling</a> like a modal dialog, also without <code>.ui-scroll-lock</code>, which a <a href="#non-modal">non-modal</a> one still needs.`,
    },
  },
} satisfies Change
