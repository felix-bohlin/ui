import { readdirSync, readFileSync } from "node:fs"
import { test } from "@playwright/test"
import { HYDRATED_FRAMEWORK_IDS } from "../src/utils/framework.js"

const ANCHORS_VISIBLE =
  "A Chromium that takes anchor-visible warns about the anchors-visible fallback in css/compat/anchor.css and copy.css when a page links them unbundled, as the Nunjucks getting-started page does, until Firefox takes anchor-visible and the fallback goes"

const CONTENTS_ROOT_STATUS =
  "the root is display: contents, so it has no box to hold its status text"

const CONTROL_GROUP_BUTTON =
  "a positioned Button would paint over the border of its neighbor in a ControlGroup"

export const FIREFOX_DOWNLOAD_NAVIGATE =
  "Firefox fires a second navigate event for a link with download, without the downloadRequest the first one carries, though the page doesn't navigate"

export const FIREFOX_SELF_RTL =
  "Firefox places a popover with self- position-area keywords toward the wrong inline side in a right-to-left part of a left-to-right page"

export const FIREFOX_STALE_FALLBACK_OPACITY =
  "Firefox's getComputedStyle keeps an opacity from partway through a fade, while it paints the end value, on a popover that a position-try fallback moved after a hover rule started the fade"

export const FIREFOX_STICKY_ANCHOR_SCROLL =
  "Firefox moves a fixed element whose insets use anchor() down by the page scroll when it lays the element out again on a scrolled page and the anchor is inside a sticky header at the top, instead of keeping it on the stuck header"

const HYDRATING =
  "the root of a component that listens for events and is a custom element, or a tag that can be one, carries data-hydrating in the server markup, so the element ignores clicks until the framework has attached the listeners and takes it off: useHydrated in React, hydrated in the root's ref in Solid, the hydrated attachment in Svelte and v-hydrated in Vue. The contract test renders Solid with NoHydration, where hydrating() leaves it out"

const SOLID_ONE_WAY =
  "Solid writes a checked prop only when it changes, so a choice the parent doesn't store stays on screen, as on a native input"

const SVELTE_DEFAULT =
  "Svelte never sets the checked attribute of a native input with bind: or checked= on a client render, so a form reset unchecks it and the bound value becomes empty, where every component's input keeps its first state as defaultChecked and a reset returns to it"

const SVELTE_ONE_WAY =
  "a value passed without bind: is a starting value: the group keeps the selection itself until the parent passes another"

const SVELTE_SELECT_PROBE =
  "Svelte builds one select it never inserts, to test whether the browser keeps elements inside an option"

const SVELTE_SPREAD =
  "Svelte drops the server's checked attribute from a native input with bind: or checked= when it hydrates, so a form reset unchecks it, and checked= also puts back a choice made before hydration, where every component's input keeps the attribute and the choice, as a native input with a spread does"

const VUE_ONE_WAY =
  "a model-value passed without a listener is a starting value: the group keeps the selection itself until the parent passes another"

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
    FIREFOX_DOWNLOAD_NAVIGATE,
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

const REASONS = {
  ANCHORS_VISIBLE,
  CONTENTS_ROOT_STATUS,
  CONTROL_GROUP_BUTTON,
  FIREFOX_DOWNLOAD_NAVIGATE,
  FIREFOX_SELF_RTL,
  FIREFOX_STALE_FALLBACK_OPACITY,
  FIREFOX_STICKY_ANCHOR_SCROLL,
  HYDRATING,
  SOLID_ONE_WAY,
  SVELTE_DEFAULT,
  SVELTE_ONE_WAY,
  SVELTE_SELECT_PROBE,
  SVELTE_SPREAD,
  VUE_ONE_WAY,
  WEBKIT_ARROW_FOCUS_SCROLL,
  WEBKIT_HIGHLIGHT_HIDDEN_TEXT,
  WEBKIT_INNER_TEXT_HIDDEN_NODES,
  WEBKIT_RADIO_NO_WRAP,
  WEBKIT_RADIO_RTL_ARROWS,
  WEBKIT_TOP_LAYER_ANCHOR,
}

type Engine = keyof typeof ENGINE_BUGS

export type EngineBug = (typeof ENGINE_BUGS)[Engine][number]

export type EngineBugs = {
  [engine in Engine]?: (typeof ENGINE_BUGS)[engine][number]
}

type Check =
  | "apps"
  | "apps-console"
  | "contract"
  | "contract-attribute"
  | "example-state"
  | "example-text"
  | "hidden-text"
  | "hydration"
  | "hydration-late"
  | "hydration-probe"
  | "models"
  | "native"
  | "parity"
  | "updates"

const KEYS = [
  "app",
  "framework",
  "engine",
  "component",
  "example",
  "aspect",
] as const

type Where = { check: Check } & {
  [key in (typeof KEYS)[number]]?: string
}

type Expectation = { check: Check } & {
  [key in (typeof KEYS)[number]]?: string | readonly string[]
} & {
  on?: string[]
  reason: (typeof REASONS)[keyof typeof REASONS]
  source?: string
}

const SVELTE_BOUND_CASES = [
  "checkbox-bound",
  "group-bound",
  "radio-bound",
  "rating-bound",
  "rating-default",
  "tabs-bound",
  "toggle-bound",
]

export const EXPECTED: Expectation[] = [
  {
    app: "eleventy",
    aspect: "`position-visibility: anchors-visible` value has been deprecated",
    check: "apps-console",
    reason: ANCHORS_VISIBLE,
  },
  {
    check: "example-text",
    engine: "webkit",
    example: ["checkbox", "message", "stepper", "tooltip"],
    reason: WEBKIT_INNER_TEXT_HIDDEN_NODES,
  },
  {
    aspect: ".ui-button > .ui-sr-only",
    check: "hidden-text",
    reason: CONTROL_GROUP_BUTTON,
  },
  {
    aspect: ":is(opui-copy, opui-sortable-table, opui-toaster) > .ui-sr-only",
    check: "hidden-text",
    reason: CONTENTS_ROOT_STATUS,
  },
  {
    aspect: "select",
    check: "hydration-probe",
    framework: "svelte",
    reason: SVELTE_SELECT_PROBE,
  },
  { check: "models", framework: "solid", reason: SOLID_ONE_WAY },
  { check: "models", framework: "svelte", reason: SVELTE_ONE_WAY },
  { check: "models", framework: "vue", reason: VUE_ONE_WAY },
  {
    app: "sveltekit",
    aspect: SVELTE_BOUND_CASES,
    check: "native",
    reason: SVELTE_SPREAD,
  },
  {
    app: "vite-svelte",
    aspect: SVELTE_BOUND_CASES,
    check: "native",
    reason: SVELTE_DEFAULT,
  },
  {
    aspect: SVELTE_BOUND_CASES,
    check: "native",
    framework: "svelte",
    reason: SVELTE_SPREAD,
  },
]

const COMPONENTS_DIR = new URL("../packages/opui/components/", import.meta.url)

const EXAMPLES_DIR = new URL("../src/component-examples/", import.meta.url)

const foldersIn = (dir: URL) =>
  readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .toSorted()

const filesIn = (dir: URL, folder: string, extension: string) =>
  readdirSync(new URL(`${folder}/`, dir))
    .filter((file) => file.endsWith(extension))
    .toSorted()

export const derivedExpectations = async (): Promise<Expectation[]> => {
  const [
    { namedComponent },
    { customTagsOf },
    { hydratingRoots },
    { htmlMarkup },
  ] = await Promise.all([
    import("../scripts/build-components.mjs"),
    import("../scripts/component-analysis.mjs"),
    import("../scripts/component-emit.mjs"),
    import("./unit/example-markup"),
  ])
  const hydrating = new Map<string, string[]>()
  for (const folder of foldersIn(COMPONENTS_DIR)) {
    for (const file of filesIn(COMPONENTS_DIR, folder, ".astro")) {
      const component = await namedComponent(
        readFileSync(new URL(`${folder}/${file}`, COMPONENTS_DIR), "utf8"),
        `packages/opui/components/${folder}/${file}`,
      )
      const tags = [...hydratingRoots(component).keys()].flatMap((node) =>
        customTagsOf(component, node),
      )
      if (tags.length > 0) hydrating.set(component.name, tags)
    }
  }
  const tags = [...hydrating.values()].flat().toSorted()
  const examples = foldersIn(EXAMPLES_DIR).flatMap((slug) =>
    filesIn(EXAMPLES_DIR, slug, ".html")
      .filter((file) =>
        htmlMarkup(
          readFileSync(new URL(`${slug}/${file}`, EXAMPLES_DIR), "utf8"),
        ).tags.some(({ name }) => tags.includes(name)),
      )
      .map((file) => `${slug}/${file.slice(0, -".html".length)}`),
  )
  const source = "hydratingRoots() in scripts/component-emit.mjs"
  return [
    ...[...hydrating].map(([component, on]): Expectation => ({
      aspect: "data-hydrating",
      check: "contract-attribute",
      component,
      framework: HYDRATED_FRAMEWORK_IDS.filter((id) => id !== "solid"),
      on,
      reason: HYDRATING,
      source,
    })),
    {
      aspect: "data-hydrating",
      check: "hydration-late",
      example: examples,
      framework: HYDRATED_FRAMEWORK_IDS,
      on: tags,
      reason: HYDRATING,
      source,
    },
  ]
}

const fits = (entry: Expectation, where: Partial<Where>, exact: boolean) =>
  KEYS.every((key) => {
    const value = entry[key]
    if (value === undefined) return true
    const wanted = where[key]
    if (wanted === undefined) return !exact
    return typeof value === "string" ? value === wanted : value.includes(wanted)
  })

export const expectation = (where: Where, entries = EXPECTED) =>
  entries.find(
    (entry) => entry.check === where.check && fits(entry, where, true),
  )

export const expectations = (
  where: Partial<Where> & Pick<Where, "check">,
  entries = EXPECTED,
) =>
  entries.filter(
    (entry) => entry.check === where.check && fits(entry, where, false),
  )

const nameOf = (reason: Expectation["reason"]) =>
  Object.entries(REASONS).find(([, value]) => value === reason)![0]

type Soft = {
  soft: (
    actual: boolean,
    message: string,
  ) => { toBe: (expected: boolean) => unknown }
}

export const expectStill = (
  expect: Soft,
  happens: boolean,
  entry: Expectation,
  where: Where,
) => {
  const name = nameOf(entry.reason)
  const label = KEYS.flatMap((key) => where[key] ?? []).join(" ")
  expect
    .soft(
      happens,
      `${where.check} ${label}: ${name} no longer happens, so remove its entry from ${entry.source ?? "tests/expectations.ts"} (${name}: ${entry.reason})`,
    )
    .toBe(true)
}

export const failsIn = (browserName: string, bugs: EngineBugs = {}) => {
  const bug = bugs[browserName as Engine]
  test.fail(bug !== undefined, bug)
}

export const failsWhere = (where: Where) => {
  const entry = expectation(where)
  test.fail(entry !== undefined, entry?.reason)
}

export const unusedReasons = (sources: string[], entries: Expectation[]) =>
  Object.entries(REASONS)
    .filter(
      ([name, reason]) =>
        !entries.some((entry) => entry.reason === reason) &&
        !sources.some((source) => new RegExp(`\\b${name}\\b`).test(source)),
    )
    .map(([name]) => name)
