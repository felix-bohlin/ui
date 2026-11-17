import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`Badge` takes `hideLabel`, which renders `label` as visually hidden text (`.ui-sr-only`) inside the indicator, and hides the `indicator` slot from assistive technology. Pass the whole translated text as `label` ("5 unread messages") and the short visible form in the `indicator` slot ("5"), so the component never joins a number and words. A `dot` badge hides its `label` the same way.',
  notes: {
    badge: {
      default: `<a href="#indicator">Indicator</a> text for screen readers with <code>hideLabel</code>: one translated <code>label</code>, and the short visible text in <code>indicator</code>.`,
      html: `<a href="#indicator">Indicator</a> text for screen readers with <code>.ui-sr-only</code>, next to the visible text with <code>aria-hidden="true"</code>.`,
    },
  },
} satisfies Change
