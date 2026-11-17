import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Select` keeps its padding and the height of the other fields in browsers that keep the `<button>` inside the `<select>` but have no customizable select, like Firefox, and wherever React, Svelte or Vue render it in the browser. The button turned the padding off there.",
} satisfies Change
