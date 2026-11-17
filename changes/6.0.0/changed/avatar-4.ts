import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Avatar` squircle without `corner-shape` falls back to a rounded square with corners at 27% of its size instead of `--radius-3`. The fallback moved from `avatar.css` to `css/compat/avatar.css`: import it, or `compat.css`, with `avatar.css`, or the squircle is a circle there, as in `dist/opui.no-compat.css`.",
  notes: {
    avatar: `Without <code>corner-shape</code>, a squircle is a rounded square with corners at 27% of its size, from the compat layer (<a href="#browser-support">Browser support</a>).`,
  },
} satisfies Change
