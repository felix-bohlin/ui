import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`Select` styles `<optgroup>` groups like `<div role="group">` ones. A `<legend>` first in the group is the heading, and the `label` attribute names the group and shows in browsers without customizable select.',
  notes: {
    select: `<a href="#optgroup"><code>&lt;optgroup&gt;</code></a> groups get the heading styles, with a <code>&lt;legend&gt;</code> as the heading.`,
  },
} satisfies Change
