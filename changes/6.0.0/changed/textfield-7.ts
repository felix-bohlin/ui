import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`TextField`, `Textarea` and `Select` describe the control with the start text, the `top` part, the `start` and `end` affixes, the `bottom` part and the end text through `aria-describedby`, in that order, like `NumberField`. A unit, a hint or an error is read once, after the name, instead of in it. The part ids start with the `id`: `x-start-text`, `x-top`, `x-start`, `x-end`, `x-bottom` and `x-end-text` for `id="x"`.',
} satisfies Change
