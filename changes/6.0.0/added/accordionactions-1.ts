import { components, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`AccordionActions` takes `align` (`.ui-align-start`), like `CardActions`, `DialogFooter` and `DrawerFooter`.",
  notes: {
    accordion: {
      ...components(
        `<a href="#actions"><code>AccordionActions</code></a> take <code>align="start"</code>.`,
      ),
      html: `<a href="#actions">Actions</a> take <code>.ui-align-start</code>.`,
    },
  },
} satisfies Change
