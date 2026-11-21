import { expect, test } from "@playwright/test"
import { COMPONENTS, openFixture } from "./fixtures"

const KNOWN = [
  {
    reason:
      "the root is display: contents, so it has no box to hold its status text",
    selector: ":is(opui-copy, opui-sortable-table, opui-toaster) > .ui-sr-only",
  },
  {
    reason:
      "a positioned Button would paint over the border of its neighbor in a ControlGroup",
    selector: ".ui-button > .ui-sr-only",
  },
]

for (const component of COMPONENTS) {
  test(`${component}: visually hidden text has its containing block inside the example`, async ({
    page,
  }) => {
    await openFixture(page, "html", component)
    const escaped = await page.evaluate(
      (known) =>
        [...document.querySelectorAll<HTMLElement>("[data-example]")].flatMap(
          (example) => {
            const contains = (element: Element) => {
              const style = getComputedStyle(element)
              return (
                style.position !== "static" ||
                style.transform !== "none" ||
                style.translate !== "none" ||
                style.rotate !== "none" ||
                style.scale !== "none" ||
                style.perspective !== "none" ||
                style.filter !== "none" ||
                /paint|layout|strict|content/.test(style.contain)
              )
            }
            return [...example.querySelectorAll("*")]
              .filter((element) => {
                const style = getComputedStyle(element)
                return (
                  style.position === "absolute" &&
                  style.clipPath === "inset(50%)" &&
                  element.checkVisibility() &&
                  !known.some((selector) => element.matches(selector))
                )
              })
              .filter((element) => {
                let block = element.parentElement
                while (block && block !== example && !contains(block)) {
                  block = block.parentElement
                }
                return !block || block === example
              })
              .map(
                (element) =>
                  `${example.dataset.example}: ${element.outerHTML.slice(0, 120)}`,
              )
          },
        ),
      KNOWN.map(({ selector }) => selector),
    )

    expect(
      escaped,
      "position the component around this text, or list it in KNOWN with the reason",
    ).toEqual([])
  })
}
