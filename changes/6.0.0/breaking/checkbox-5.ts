import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Checkbox`, `Radio`, `Switch`, `CheckboxInput` and `SwitchInput` in Astro no longer type a `type` prop, `Switch` and `SwitchInput` no longer type `role`, which stays `switch`, and `Radio` no longer types the native `size` (types).",
  migrating: ["checkbox", "radio", "switch"],
  notes: {
    checkbox: {
      astro: `no <code>type</code> prop in the types (<a href="#api">API</a>).`,
    },
    radio: {
      astro: `no <code>type</code> prop in the types, and the native <code>size</code> isn't typed either (<a href="#api">API</a>).`,
    },
    switch: {
      astro: `no <code>type</code> prop in the types (<a href="#api">API</a>).`,
    },
  },
} satisfies Change
