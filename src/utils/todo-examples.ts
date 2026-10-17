import buttonKeyboard from "../component-examples/button/Keyboard.html?raw"

const sources = import.meta.glob<string>("../todo-examples/*.html", {
  eager: true,
  import: "default",
  query: "?raw",
})

const sourceOf = (name: string) => sources[`../todo-examples/${name}.html`]

export const todoExamples = {
  "accordion-html-marker": {
    match: "Accordion: the shared preamble",
  },
  "button-keyboard": {
    match: "Button `kbd` looks weird on Mac",
    source: buttonKeyboard,
  },
  "carousel-scroll-button-fallback": {
    match: "Carousel in Chromium 141",
  },
  "carousel-translated-labels": {
    match: "Carousel: the generated button and marker names are English",
  },
  "list-item-as-div": {
    match: 'ListItem: `as="div"` renders',
  },
}

export type TodoExampleName = keyof typeof todoExamples

const missing = Object.entries(todoExamples)
  .filter(
    ([name, example]) => !("source" in example) && sourceOf(name) === undefined,
  )
  .map(([name]) => name)
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

export const todoExampleSource = (name: TodoExampleName) => {
  const example = todoExamples[name]
  return "source" in example ? example.source : sourceOf(name)!
}

export const todoExamplesFor = (text: string) =>
  Object.entries(todoExamples)
    .filter(([, example]) => text.startsWith(example.match))
    .map(([name]) => name)
