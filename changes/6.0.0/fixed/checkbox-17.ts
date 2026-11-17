import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Checkbox`, `Radio`, `Range`, `Select`, `Switch`, `TabsItem`, `Textarea`, `TextField` and `ToggleButton` in Vue keep what the user changed before the page hydrated (typed, picked, filled in by a password manager or restored by the browser) instead of resetting it, and the `v-model` of a `Tabs` or `ToggleGroup` takes a tab or button picked then. A form reset returns them to the value or state they were rendered with, also when the browser rendered them, and sets the `v-model` value to it, a number `TextField`'s as a number. A `Checkbox` or `Switch` bound to an array adds or removes its value instead of replacing the array with `true` or `false`. A color `TextField` without a value no longer logs a warning in Nuxt.",
} satisfies Change
