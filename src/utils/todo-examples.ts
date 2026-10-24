const sources = import.meta.glob<string>("../todo-examples/*.html", {
  eager: true,
  import: "default",
  query: "?raw",
})

const sourceOf = (name: string) => sources[`../todo-examples/${name}.html`]

export const todoExamples = {
  "dialog-scrollbar-gutter": {
    match: "Dialog, Drawer: the scroll lock's `scrollbar-gutter: stable`",
  },
  "list-item-as-div": {
    match: 'ListItem: `as="div"` renders',
  },
  "tabs-rtl": {
    match: "Tabs: the Keyboard support list says Right and Left Arrow",
  },
  "tooltip-trigger-command": {
    match:
      'Tooltip: the triggers set `commandfor` and `command="toggle-popover"`',
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
