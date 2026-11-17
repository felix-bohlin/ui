import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Accordion` takes a `markerAnimation` prop (`rotate`, `flip`, `turn`) that sets how the marker animates when it opens. Defaults to `rotate`, which needs no class; `.ui-marker-animation-flip` mirrors the chevron and `.ui-marker-animation-turn` points it to the inline end when closed and down when open, also in right-to-left.",
  notes: {
    accordion: {
      default: `<a href="#marker-animation">Marker animation</a> with the <code>markerAnimation</code> prop.`,
      html: `<a href="#marker-animation">Marker animation</a> with <code>.ui-marker-animation-flip</code> or <code>.ui-marker-animation-turn</code>. The marker rotates without a class.`,
    },
  },
} satisfies Change
