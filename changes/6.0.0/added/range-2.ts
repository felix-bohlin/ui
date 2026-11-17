import { components, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Range` takes a `size` prop (`.ui-x-small`, `.ui-small`, `.ui-large`), like the other form controls. The thumb and the track scale with it, and on touch screens the x-small and small thumbs keep the 30px touch size.",
  notes: {
    range: {
      ...components(
        `<a href="#sizes">Sizes</a> with the <code>size</code> prop, like the other form controls. The focus ring hugs the thumb.`,
      ),
      html: `<a href="#sizes">Sizes</a> with <code>.ui-x-small</code>, <code>.ui-small</code> and <code>.ui-large</code>, like the other form controls. The focus ring hugs the thumb.`,
    },
  },
} satisfies Change
