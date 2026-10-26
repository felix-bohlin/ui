import { experimental_AstroContainer as AstroContainer } from "astro/container"
import { expect, test } from "vitest"
import AccordionActions from "../../packages/opui/components/Accordion/AccordionActions.astro"
import CardActions from "../../packages/opui/components/Card/CardActions.astro"
import DialogFooter from "../../packages/opui/components/Dialog/DialogFooter.astro"
import DrawerFooter from "../../packages/opui/components/Drawer/DrawerFooter.astro"

const container = await AstroContainer.create()
const actions = { AccordionActions, CardActions }
const footers = { DialogFooter, DrawerFooter }

const classes = async (
  part: Parameters<typeof container.renderToString>[0],
  align?: string,
) => {
  const html = await container.renderToString(part, { props: { align } })
  return html.match(/class="([^"]*)"/)?.[1]
}

test.each([undefined, "end", "start"])(
  "every actions part renders the same classes for align=%s",
  async (align) => {
    const rendered = await Promise.all(
      Object.values(actions).map((part) => classes(part, align)),
    )
    expect(new Set(rendered).size).toBe(1)
    expect(rendered[0]).toBe(
      align === "start" ? "ui-actions ui-align-start" : "ui-actions",
    )
  },
)

test.each([undefined, "end", "start"])(
  "every footer part renders the same classes for align=%s",
  async (align) => {
    const rendered = await Promise.all(
      Object.values(footers).map((part) => classes(part, align)),
    )
    expect(new Set(rendered).size).toBe(1)
    expect(rendered[0]).toBe(
      align === "start" ? "ui-footer ui-align-start" : "ui-footer",
    )
  },
)
