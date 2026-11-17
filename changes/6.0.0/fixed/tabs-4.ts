import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Tabs` and `ToggleButton` hide their inputs in `tabs.css` and `toggle-button.css` instead of `core/utils.css`, so single-file imports and `dist/opui.components.css` no longer show the radio and checkbox inputs.",
} satisfies Change
