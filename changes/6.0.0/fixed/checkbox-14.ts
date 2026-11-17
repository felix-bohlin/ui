import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Checkbox`, `Radio`, `Select`, `Switch`, `TextField` and `Textarea` in Astro and Vue render the label slot without the whitespace around its content, like React and Svelte, so a required field no longer shows a space before its asterisk.",
} satisfies Change
