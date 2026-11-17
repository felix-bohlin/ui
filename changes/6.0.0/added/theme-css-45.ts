import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`theme.css` adds optional `--ui-button-shadow`, the shadow of `Button` with `.ui-filled`, `.ui-outlined` or `.ui-tonal` and of the `Copy` confirmation (`--ui-shadow-control` when unset), so a theme can give buttons a shadow without giving one to toggle buttons, outlined chips and fields. `--ui-button-hover-shadow` falls back to it.",
} satisfies Change
