import { test } from "@playwright/test"

export const FIREFOX_SELF_RTL =
  "Firefox places a popover with self- position-area keywords toward the wrong inline side in a right-to-left part of a left-to-right page"

export const WEBKIT_ARROW_FOCUS_SCROLL =
  "WebKit doesn't bring the label of a clipped radio that the arrow keys focus fully into view in its scroll container"

export const WEBKIT_RADIO_NO_WRAP =
  "WebKit stops at the last radio of a group instead of wrapping to the first with the arrow keys"

export const WEBKIT_TOP_LAYER_ANCHOR =
  "WebKit moves a popover up by the page scroll when its anchor is in the top layer too, inside a modal dialog or another popover"

export const ENGINE_BUGS = {
  firefox: [FIREFOX_SELF_RTL],
  webkit: [
    WEBKIT_ARROW_FOCUS_SCROLL,
    WEBKIT_RADIO_NO_WRAP,
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
