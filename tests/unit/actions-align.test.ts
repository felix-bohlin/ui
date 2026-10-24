import { experimental_AstroContainer as AstroContainer } from "astro/container"
import { expect, test } from "vitest"
import AccordionActions from "../../packages/opui/components/Accordion/AccordionActions.astro"
import CardActions from "../../packages/opui/components/Card/CardActions.astro"
import DialogActions from "../../packages/opui/components/Dialog/DialogActions.astro"
import DrawerActions from "../../packages/opui/components/Drawer/DrawerActions.astro"

const container = await AstroContainer.create()
const parts = { AccordionActions, CardActions, DialogActions, DrawerActions }

const classes = async (
  part: (typeof parts)[keyof typeof parts],
  align?: string,
) => {
  const html = await container.renderToString(part, { props: { align } })
  return html.match(/class="([^"]*)"/)?.[1]
}

test.each([undefined, "end", "start"])(
  "every actions part renders the same classes for align=%s",
  async (align) => {
    const rendered = await Promise.all(
      Object.values(parts).map((part) => classes(part, align)),
    )
    expect(new Set(rendered).size).toBe(1)
    expect(rendered[0]).toBe(
      align === "start" ? "ui-actions ui-align-start" : "ui-actions",
    )
  },
)
