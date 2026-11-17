import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`theme.css` adds choice control tokens: `--ui-choice-fill-max-lightness` (the dark mode cap of a checked fill), `--ui-choice-size-small`, `--ui-choice-size`, `--ui-choice-size-large`, `--ui-switch-thumb-size-x-small`, `--ui-switch-thumb-size-small`, `--ui-switch-thumb-size`, `--ui-switch-thumb-size-large`, `--ui-switch-track-block-size-x-small`, `--ui-switch-track-block-size-small`, `--ui-switch-track-block-size`, `--ui-switch-track-block-size-large`, `--ui-switch-track-inline-size-x-small`, `--ui-switch-track-inline-size-small`, `--ui-switch-track-inline-size` and `--ui-switch-track-inline-size-large`. They are multiplied by `--ui-density`, and each track width is twice its track height until a theme sets it.",
} satisfies Change
