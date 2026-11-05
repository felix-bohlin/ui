const sources = import.meta.glob<string>("../todo-examples/*.html", {
  eager: true,
  import: "default",
  query: "?raw",
})

const sourceOf = (name: string) => sources[`../todo-examples/${name}.html`]

export const todoExamples = {
  "accordion-marker": {
    match: "Accordion: the summary hides its marker three ways",
  },
  "astro-raw-issue": {
    match:
      "Tooling: on the first request after `astro dev` starts, Astro's CSS collector",
  },
  "button-group-rtl-dividers": {
    match:
      "ButtonGroup: in right-to-left, filled and tonal groups lose the dividers",
  },
  "callout-dismiss": {
    match:
      "Callout: a close button in a callout only takes its place at the end of the first row",
  },
  "card-content-padding": {
    match:
      "Card: the content padding rule matches `:where(:only-child, :first-child)`",
  },
  "carousel-marker-focus": {
    match: "Carousel: the marker's own ring is drawn with `outline`",
  },
  "dialog-scrollbar-gutter": {
    match: "Dialog, Drawer: the scroll lock's `scrollbar-gutter: stable`",
  },
  "dialog-scrollbar-gutter-root": {
    match: "Dialog, Drawer: the scroll lock's `scrollbar-gutter: stable`",
  },
  "drawer-sidebar": {
    match:
      "Drawer: the app-shell, inbox and chat blocks each hide their sidebar",
  },
  "firefox-rtl-menu": {
    match:
      'Menu: in Firefox, a menu in a `dir="rtl"` part of a left-to-right page',
  },
  "firefox-tooltip-fade": {
    match: "Tooltip: in Firefox, a tooltip that a position-try fallback moves",
  },
  "icon-only-shrink": {
    match: "ButtonGroup: with `.ui-overflow-shrink`, icon-only buttons",
  },
  "ios-one-time-code": {
    match: "OneTimeCode: the iOS fixed width in the compat layer",
  },
  "ios-submenu-anchor": {
    match: "Menu: the iOS submenu anchor in the compat layer",
  },
  "one-time-code-radius": {
    match: "OneTimeCode: the three box masks fix `rx='8'`",
  },
  "range-forced-colors": {
    match:
      "Range: under `forced-colors: active` the range source sets its fill",
  },
  "resolved-tokens": {
    match: "Tokens: there is no Figma kit",
  },
  "rich-text-table": {
    match:
      "Typography: rich text tables are `display: block` so they can scroll",
  },
  "spinner-position": {
    match:
      "Spinner: every busy element except a `dialog` or `[popover]` gets `position: relative`",
  },
  "spread-rem-breakpoint": {
    match:
      "TextField: the spread layout collapses at `@container (inline-size < 400px)`",
  },
  "switch-invalid": {
    match: "Switch: an invalid switch draws a `--ui-focus-ring-width` halo",
  },
  "tabs-rtl": {
    match: "Tabs: the Keyboard support list says Right and Left Arrow",
  },
  "tabs-vertical-links": {
    match: "Tabs: there are no vertical tabs and no tabs made of links",
  },
  "text-field-affix-target": {
    match:
      "TextField: buttons in a small or x-small field's `.ui-start` or `.ui-end` are under 24 by 24 CSS pixels",
  },
  "tonal-surfaces": {
    match: "CSS: a tonal fill inside a tonal surface",
  },
  "tooltip-trigger-command": {
    match:
      'Tooltip: the triggers set `commandfor` and `command="toggle-popover"`',
  },
  "typography-marker-safari": {
    match: "Typography: the `marker` chip shows Safari as unsupported",
  },
  "vue-select-comment": {
    match: "Select: in `vite dev` and `nuxi dev`, the Vue compiler warns",
  },
}

export type TodoExampleName = keyof typeof todoExamples

const missing = Object.keys(todoExamples).filter(
  (name) => sourceOf(name) === undefined,
)
if (missing.length > 0) {
  throw new Error(
    `[todo-examples] missing src/todo-examples/${missing.join(".html, ")}.html`,
  )
}

const unlisted = Object.keys(sources)
  .map((path) => path.match(/todo-examples\/([^/]+)\.html$/)![1])
  .filter((name) => !(name in todoExamples))
if (unlisted.length > 0) {
  throw new Error(
    `[todo-examples] add ${unlisted.join(", ")} to src/utils/todo-examples.ts`,
  )
}

export const todoExampleSource = (name: TodoExampleName) => sourceOf(name)!

export const todoExamplesFor = (text: string) =>
  Object.entries(todoExamples)
    .filter(([, example]) => text.startsWith(example.match))
    .map(([name]) => name)
