import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`theme.css` adds motion tokens: `--ui-duration-fast` (`0.1s`), `--ui-duration` (`0.15s`), `--ui-duration-slow` (`0.25s`), `--ui-ease`, `--ui-ease-enter` and `--ui-ease-exit`, which starts moving at once so a close doesn't look delayed. Every component transition and animation reads them, multiplied by `--ui-motion`. The optional `--ui-ease-move` is the easing of movement a theme may make springy (the `Tabs` indicator, the press scale, and `Menu`, `Select`, `Tooltip` and toasts as they open, never anything closing), and the optional `--ui-press-scale` scales `Button`, `ToggleButton` and button and link `Chip`s while pressed. Both are unset, so nothing changes until a theme sets them.",
} satisfies Change
