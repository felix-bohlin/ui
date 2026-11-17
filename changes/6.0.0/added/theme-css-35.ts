import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`theme.css` adds `--ui-text-subtle`, the secondary text role: placeholders, field helper text (`--ui-field-helper-text-color` reads it), descriptions in `List` and `Menu` items, unselected `Tabs` labels and `Table` captions. It is `--ui-text` unless a theme sets it, so nothing changes by default. bootstrap, m3 and shadcn set their muted text colors, and m3 body text is its on-surface color.",
} satisfies Change
