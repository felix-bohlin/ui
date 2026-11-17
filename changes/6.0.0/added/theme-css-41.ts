import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`theme.css` adds optional `--ui-link-focus` and `--ui-button-focus`. `highlight` fills a focused link or `Button` with `--ui-focus-highlight` and `--ui-on-focus-highlight` text instead of the focus ring, like GOV.UK, and draws a block-end bar under every line of a link. The outline stays, transparent, so forced colors still draw the ring, and a button with `aria-disabled="true"` keeps the ring. When unset (`ring`), the ring shows.',
} satisfies Change
