import { slots, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`TextField`, `Textarea` and `Select` slots inside the field's border are `start` and `end` (`.ui-start`, `.ui-end`) instead of `prefix` and `suffix` (`.ui-prefix`, `.ui-suffix`), and `top` and `bottom` (`.ui-top`, `.ui-bottom`) instead of `header` and `footer` (`.ui-header`, `.ui-footer`), so `start` and `end` mean the inline sides in every component and the container regions keep their own names.",
  migrating: ["select", "text-field", "textarea"],
  notes: {
    select: {
      ...slots(
        `the <a href="#affix">affix</a> slots are <code>start</code> and <code>end</code> instead of <code>prefix</code> and <code>suffix</code>, and <a href="#top-and-bottom"><code>top</code> and <code>bottom</code></a> instead of <code>header</code> and <code>footer</code>.`,
      ),
      html: `<a href="#affix"><code>.ui-start</code> and <code>.ui-end</code></a> replace <code>.ui-prefix</code> and <code>.ui-suffix</code>, and <a href="#top-and-bottom"><code>.ui-top</code> and <code>.ui-bottom</code></a> replace <code>.ui-header</code> and <code>.ui-footer</code>.`,
    },
    "text-field": {
      ...slots(
        `the <a href="#affix">affix</a> slots are <code>start</code> and <code>end</code> instead of <code>prefix</code> and <code>suffix</code>, and <a href="#top-and-bottom"><code>top</code> and <code>bottom</code></a> instead of <code>header</code> and <code>footer</code>.`,
      ),
      html: `<a href="#affix"><code>.ui-start</code> and <code>.ui-end</code></a> replace <code>.ui-prefix</code> and <code>.ui-suffix</code>, and <a href="#top-and-bottom"><code>.ui-top</code> and <code>.ui-bottom</code></a> replace <code>.ui-header</code> and <code>.ui-footer</code>.`,
    },
    textarea: {
      ...slots(
        `the <a href="#affix">affix</a> slots are <code>start</code> and <code>end</code> instead of <code>prefix</code> and <code>suffix</code>, and <a href="#top-and-bottom"><code>top</code> and <code>bottom</code></a> instead of <code>header</code> and <code>footer</code>.`,
      ),
      html: `<a href="#affix"><code>.ui-start</code> and <code>.ui-end</code></a> replace <code>.ui-prefix</code> and <code>.ui-suffix</code>, and <a href="#top-and-bottom"><code>.ui-top</code> and <code>.ui-bottom</code></a> replace <code>.ui-header</code> and <code>.ui-footer</code>.`,
    },
  },
} satisfies Change
