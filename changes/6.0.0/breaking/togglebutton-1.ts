import { slots, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`ToggleButton` in Astro and Vue no longer generates an input `id`. Pass `id` when something outside the component needs to reference the input.",
  migrating: ["toggle-button-and-toggle-group"],
  notes: {
    toggle: slots(
      `<a href="#toggle-button"><code>ToggleButton</code></a> no longer generates an input <code>id</code>. Pass <a href="#api"><code>id</code></a> when something outside the component references the input.`,
    ),
  },
} satisfies Change
