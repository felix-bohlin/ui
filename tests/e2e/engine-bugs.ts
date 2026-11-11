import { test } from "@playwright/test"

export const FIREFOX_SELF_RTL =
  "Firefox places a popover with self- position-area keywords toward the wrong inline side in a right-to-left part of a left-to-right page"

export const FIREFOX_STALE_FALLBACK_OPACITY =
  "Firefox's getComputedStyle keeps an opacity from partway through a fade, while it paints the end value, on a popover that a position-try fallback moved after a hover rule started the fade"

export const FIREFOX_STICKY_ANCHOR_SCROLL =
  "Firefox moves a fixed element whose insets use anchor() down by the page scroll when it lays the element out again on a scrolled page and the anchor is inside a sticky header at the top, instead of keeping it on the stuck header"

export const WEBKIT_ARROW_FOCUS_SCROLL =
  "WebKit doesn't bring the label of a clipped radio that the arrow keys focus fully into view in its scroll container"

export const WEBKIT_HIGHLIGHT_HIDDEN_TEXT =
  "WebKit doesn't paint a custom highlight of static ranges on text that was inside a display: none element for a rendered frame after the ranges were added, once the element is shown"

export const WEBKIT_INNER_TEXT_HIDDEN_NODES =
  "WebKit's innerText reads the same rendered elements differently depending on the whitespace and comments between them, which don't render"

export const WEBKIT_RADIO_NO_WRAP =
  "WebKit stops at the last radio of a group instead of wrapping to the first with the arrow keys"

export const WEBKIT_RADIO_RTL_ARROWS =
  "WebKit takes Left Arrow as the previous radio of a group in right-to-left text too, instead of following the reading direction"

export const WEBKIT_TOP_LAYER_ANCHOR =
  "WebKit moves a popover up by the page scroll when its anchor is in the top layer too, inside a modal dialog or another popover"

export const ENGINE_BUGS = {
  firefox: [
    FIREFOX_SELF_RTL,
    FIREFOX_STALE_FALLBACK_OPACITY,
    FIREFOX_STICKY_ANCHOR_SCROLL,
  ],
  webkit: [
    WEBKIT_ARROW_FOCUS_SCROLL,
    WEBKIT_HIGHLIGHT_HIDDEN_TEXT,
    WEBKIT_INNER_TEXT_HIDDEN_NODES,
    WEBKIT_RADIO_NO_WRAP,
    WEBKIT_RADIO_RTL_ARROWS,
    WEBKIT_TOP_LAYER_ANCHOR,
  ],
} as const

export type Engine = keyof typeof ENGINE_BUGS

export type EngineBug = (typeof ENGINE_BUGS)[Engine][number]

export type EngineBugs = {
  [engine in Engine]?: (typeof ENGINE_BUGS)[engine][number]
}

export const failsIn = (browserName: string, bugs: EngineBugs = {}) => {
  const bug = bugs[browserName as Engine]
  test.fail(bug !== undefined, bug)
}
