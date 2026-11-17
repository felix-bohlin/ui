import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Anchor` hover cards and `Tooltip` open in browsers without interest invokers: `css/compat/anchor.css` and `css/compat/tooltip.css` show them while the trigger is hovered or has keyboard focus, and a hover card also while the pointer or the focus is in it. A tap follows the hover card's link there. A tooltip isn't in the top layer there, so an ancestor that clips its overflow and has a transform, filter or containment can hide it, and later content can cover it.",
} satisfies Change
