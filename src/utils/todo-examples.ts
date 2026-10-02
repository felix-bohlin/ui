import buttonKeyboard from "../component-examples/button/Keyboard.html?raw"
import autosuggestSizes from "../todo-examples/autosuggest-sizes.html?raw"
import autosuggestSuffix from "../todo-examples/autosuggest-suffix.html?raw"
import calloutRichText from "../todo-examples/callout-rich-text.html?raw"
import cardDividers from "../todo-examples/card-dividers.html?raw"
import carouselEqualHeight from "../todo-examples/carousel-equal-height.html?raw"
import disabledButtons from "../todo-examples/disabled-buttons.html?raw"
import drawerHeader from "../todo-examples/drawer-header.html?raw"
import fieldsInTables from "../todo-examples/fields-in-tables.html?raw"
import filledBorders from "../todo-examples/filled-borders.html?raw"
import labelLessControls from "../todo-examples/label-less-controls.html?raw"
import listNestedLists from "../todo-examples/list-nested-lists.html?raw"
import primaryContrast from "../todo-examples/primary-contrast.html?raw"
import scrollState from "../todo-examples/scroll-state.html?raw"
import tallMenu from "../todo-examples/tall-menu.html?raw"
import textBoxTrim from "../todo-examples/text-box-trim.html?raw"
import userValid from "../todo-examples/user-valid.html?raw"

export const todoExamples = {
  "autosuggest-sizes": {
    match: "Auto-suggest arrow",
    source: autosuggestSizes,
  },
  "autosuggest-suffix": {
    match: "Auto-suggest arrow",
    source: autosuggestSuffix,
  },
  "button-keyboard": {
    match: "Button `kbd` looks weird on Mac",
    source: buttonKeyboard,
  },
  "callout-rich-text": {
    match: "Callout `.ui-content` grid gap",
    source: calloutRichText,
  },
  "card-dividers": {
    match: "Dividers inside cards",
    source: cardDividers,
  },
  "carousel-equal-height": {
    match: "Carousel slides aren't equal height",
    source: carouselEqualHeight,
  },
  "disabled-buttons": {
    match: "Disabled button text color",
    source: disabledButtons,
  },
  "drawer-header": {
    match: "Drawer header can't hold two icon buttons",
    source: drawerHeader,
  },
  "fields-in-tables": {
    match: "Fields and selects collapse",
    source: fieldsInTables,
  },
  "filled-borders": {
    match: "Light mode: `--border-color` and `--surface-filled`",
    source: filledBorders,
  },
  "label-less-controls": {
    match: "Label-less checkboxes",
    source: labelLessControls,
  },
  "list-nested-lists": {
    match: "`.ui-list` styles nested classless lists",
    source: listNestedLists,
  },
  "primary-contrast": {
    match: "`contrast-color()` for `--primary-contrast`",
    source: primaryContrast,
  },
  "scroll-state": {
    match: "Scroll-state container queries",
    source: scrollState,
  },
  "tall-menu": {
    match: "A tall menu runs off the viewport",
    source: tallMenu,
  },
  "text-box-trim": {
    match: "`text-box: trim-both cap alphabetic`",
    source: textBoxTrim,
  },
  "user-valid": {
    match: "Opt-in `:user-valid`",
    source: userValid,
  },
}

export type TodoExampleName = keyof typeof todoExamples

export const todoExamplesFor = (text: string) =>
  Object.entries(todoExamples)
    .filter(([, example]) => text.startsWith(example.match))
    .map(([name]) => name)
