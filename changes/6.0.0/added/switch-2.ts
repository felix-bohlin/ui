import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Switch`, `Progress` and `Range` read the optional `--ui-track-bg-color` for the empty part of their track. When unset, they keep their current colors. shadcn sets it to its field border. A `Switch` reads the optional `--ui-switch-track-bg-color` first.",
  notes: {
    progress: `The track reads <a href="#api"><code>--ui-track-bg-color</code></a> when a theme sets it.`,
    switch: `The unchecked thumb reads <a href="#api"><code>--ui-switch-thumb-bg-color</code></a>, and the unchecked track <code>--ui-switch-track-bg-color</code> ahead of <code>--ui-track-bg-color</code> when a theme sets them.`,
  },
} satisfies Change
