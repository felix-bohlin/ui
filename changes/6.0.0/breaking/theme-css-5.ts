import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`theme.css`, `palette.css` and the components name every theme token with a `--ui-` prefix, like the classes: `--primary` is `--ui-primary`, `--border-color` is `--ui-border-color` and `--color-1` is `--ui-color-1`. Open Props tokens such as `--size-3` keep their names, and no component or theme token reads them any more. Add `ui-` to the tokens you set or read.",
} satisfies Change
