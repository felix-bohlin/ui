import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`theme.css` tokens follow one naming model: `--ui-on-*` is the text and icon color on a fill, `-text` after a color is that color tuned for reading, and `light`, `dark`, `inverse` and `contrast` each mean one thing. Beyond the `--ui-` prefix, `--text-primary` is `--ui-text-strong`, `--primary-contrast` is `--ui-on-primary`, `--text-primary-contrast` is `--ui-on-inverse`, `--text-muted` is `--ui-text`, `--text-muted-contrast` is removed (`kbd` and `var` read `--ui-surface-inverse` and `--ui-on-inverse`), `--surface-default` is `--ui-surface`, `--border-radius` is `--ui-radius`, `--button-border-radius` is `--ui-button-radius` and `--field-border-radius` is `--ui-field-radius`. MIGRATING lists them.",
} satisfies Change
