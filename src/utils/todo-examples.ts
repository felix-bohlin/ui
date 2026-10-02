import buttonKeyboard from "../component-examples/button/Keyboard.html?raw"
import autosuggestSizes from "../todo-examples/autosuggest-sizes.html?raw"
import disabledButtons from "../todo-examples/disabled-buttons.html?raw"

export const todoExamples = {
  "autosuggest-sizes": {
    match: "Auto-suggest arrow",
    source: autosuggestSizes,
  },
  "button-keyboard": {
    match: "Button `kbd` looks weird on Mac",
    source: buttonKeyboard,
  },
  "disabled-buttons": {
    match: "Disabled button text color",
    source: disabledButtons,
  },
}

export type TodoExampleName = keyof typeof todoExamples

export const todoExamplesFor = (text: string) =>
  Object.entries(todoExamples)
    .filter(([, example]) => text.startsWith(example.match))
    .map(([name]) => name)
