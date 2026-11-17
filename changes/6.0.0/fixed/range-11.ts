import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Range` (Astro) updates its value output after `<ClientRouter>` navigation, leaves `value-text` slot content and ranges it didn't render alone, and wires each output once.",
} satisfies Change
