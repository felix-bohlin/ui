import { components, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`Anchor` with `trigger="hover"`, `Drawer`, `Menu` and `Tooltip` warn in development when `id` is missing, since their trigger reaches them through `commandfor` or `interestfor` and a `Drawer` names itself after it.',
  notes: {
    anchor: components(
      `A <a href="#hover-trigger">hover anchor</a> without an <code>id</code> warns in development, since its trigger points at it with <code>interestfor</code>.`,
    ),
  },
} satisfies Change
