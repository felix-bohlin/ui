import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`theme.css` `--primary-dark` and `--primary-light`. Derive a shade from `--ui-primary` with relative color instead, such as `oklch(from var(--ui-primary) calc(l * 0.75) c h)`.",
} satisfies Change
