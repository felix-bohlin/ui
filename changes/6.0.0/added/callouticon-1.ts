import { components, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`CalloutIcon` renders a check icon for `severity="success"`, like `info`, `warning` and `critical`. Its types leave out the `aria-hidden`, `height`, `viewBox`, `width` and `xmlns` it sets.',
  notes: {
    callout: components(
      `<a href="#icon"><code>CalloutIcon</code></a> has a <code>success</code> icon, like <code>info</code>, <code>warning</code> and <code>critical</code>.`,
    ),
  },
} satisfies Change
