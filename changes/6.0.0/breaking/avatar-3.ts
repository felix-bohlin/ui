import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`Avatar`, `Button` and `Chip` types match the rendered element: a button `Avatar` or `Chip` needs `as="button"`, a link `Chip` needs `href`, `disabled` only goes with a button or a link, and `Button` takes link attributes only with `href` (types).',
  migrating: ["avatar", "button", "chip"],
} satisfies Change
