import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Dialog` takes only `.ui-elevated` from `card.css`: `.ui-tonal`, `.ui-outlined` and `.ui-text`, which a 5.x dialog took through `.ui-card`, no longer change it. Set `--_padding` for a denser dialog.",
} satisfies Change
