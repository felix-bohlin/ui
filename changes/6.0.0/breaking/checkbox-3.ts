import { slots, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Checkbox`, `Progress`, `Radio`, `Range`, `Select`, `Switch` and `ToggleButton` in Astro and Vue put `style` on the root, like `class`, instead of the `<select>`, `<input>` or `<progress>`, so `--_` properties set through `style` apply.",
  migrating: [
    "checkbox",
    "progress",
    "radio",
    "range",
    "select",
    "switch",
    "toggle-button-and-toggle-group",
  ],
  notes: {
    checkbox: slots(
      `<code>style</code> goes to the root <code>&lt;label&gt;</code>, like <code>class</code>, so <code>--_</code> properties set through it apply (<a href="#api">API</a>).`,
    ),
    progress: slots(
      `<code>style</code> goes to the root, like <code>class</code>, instead of the <code>&lt;progress&gt;</code> (<a href="#api">API</a>).`,
    ),
    radio: slots(
      `<code>style</code> goes to the root <code>&lt;label&gt;</code>, like <code>class</code>, so <code>--_</code> properties set through it apply (<a href="#api">API</a>).`,
    ),
    range: slots(
      `<code>style</code> goes to the root, like <code>class</code>, instead of the <code>&lt;input&gt;</code> (<a href="#api">API</a>).`,
    ),
    select: slots(
      `<code>style</code> goes to the root, like <code>class</code>, instead of the <code>&lt;select&gt;</code> (<a href="#api">API</a>).`,
    ),
    switch: slots(
      `<code>style</code> goes to the root <code>&lt;label&gt;</code>, like <code>class</code>, so <code>--_</code> properties set through it apply (<a href="#api">API</a>).`,
    ),
    toggle: slots(
      `<code>style</code> on <code>ToggleButton</code> goes to the root, like <code>class</code>, instead of the <code>&lt;input&gt;</code> (<a href="#api">API</a>).`,
    ),
  },
} satisfies Change
