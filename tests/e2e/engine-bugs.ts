import { test } from "@playwright/test"

export const FIREFOX_SELF_RTL =
  "Firefox places a popover with self- position-area keywords toward the wrong inline side in a right-to-left part of a left-to-right page"

export const WEBKIT_FALLBACK_ITEM_CLICK =
  "WebKit can leave a popover that a position-try fallback placed open after a click on a button in it that hides it"

export const WEBKIT_TOP_LAYER_ANCHOR =
  "WebKit moves a popover up by the page scroll when its anchor is in the top layer too, inside a modal dialog or another popover"

export const ENGINE_BUGS = {
  firefox: [FIREFOX_SELF_RTL],
  webkit: [WEBKIT_FALLBACK_ITEM_CLICK, WEBKIT_TOP_LAYER_ANCHOR],
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
