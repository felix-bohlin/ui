import { expect, test } from "@playwright/test"
import type { Page } from "@playwright/test"
import {
  ENGINE_BUGS,
  FIREFOX_SELF_RTL,
  WEBKIT_TOP_LAYER_ANCHOR,
  failsIn,
  type EngineBug,
} from "./engine-bugs"

const reproduced = new Set<EngineBug>()

const repro = (bug: EngineBug, define: () => void) => {
  reproduced.add(bug)
  test.describe(bug, define)
}

const placement = (page: Page) =>
  page.evaluate(() => {
    const box = (id: string) =>
      document.getElementById(id)!.getBoundingClientRect()
    const trigger = box("trigger")
    const popover = box("popover")
    return {
      below: Math.round(popover.top - trigger.bottom),
      endEdge: Math.round(popover.right - trigger.right),
      startEdge: Math.round(popover.left - trigger.left),
    }
  })

const page = (
  body: string,
  area = "block-end span-inline-end",
) => `<!doctype html>
<style>
  body { margin: 0 }
  .spacer { block-size: 3000px }
  .center { display: flex; justify-content: center; padding-block-start: 200px }
  #popover { inline-size: 200px; inset: auto; margin: 0; position-area: ${area} }
</style>
${body}`

const trigger = `<button id="trigger" commandfor="popover" command="toggle-popover">Open</button><div id="popover" popover>Item</div>`

test("every engine bug has a repro", () => {
  expect(
    Object.values(ENGINE_BUGS)
      .flat()
      .filter((bug) => !reproduced.has(bug)),
    "every reason in engine-bugs.ts needs a plain-HTML repro here, in a repro() block titled with it",
  ).toEqual([])
})

repro(WEBKIT_TOP_LAYER_ANCHOR, () => {
  for (const container of ["modal dialog", "popover"]) {
    for (const scrolled of [false, true]) {
      test(`a popover anchored in a ${container} opens below its trigger ${scrolled ? "on a scrolled page" : "at the top of the page"}`, async ({
        browserName,
        page: tab,
      }) => {
        failsIn(
          browserName,
          scrolled ? { webkit: WEBKIT_TOP_LAYER_ANCHOR } : {},
        )
        await tab.setContent(
          page(
            container === "popover"
              ? `<div class="spacer"></div><div id="container" popover="manual">${trigger}</div><div class="spacer"></div>`
              : `<div class="spacer"></div><dialog id="container">${trigger}</dialog><div class="spacer"></div>`,
          ),
        )
        if (scrolled) await tab.evaluate(() => scrollTo(0, 2000))
        await tab.evaluate(() => {
          const element = document.getElementById("container")!
          if (element instanceof HTMLDialogElement) element.showModal()
          else element.showPopover()
        })
        await tab.locator("#trigger").click()
        await expect.poll(async () => (await placement(tab)).below).toBe(0)
      })
    }
  }

  test("a popover anchored in the page flow opens below its trigger on a scrolled page", async ({
    page: tab,
  }) => {
    await tab.setContent(
      page(`<div class="spacer"></div>${trigger}<div class="spacer"></div>`),
    )
    await tab.locator("#trigger").scrollIntoViewIfNeeded()
    await tab.locator("#trigger").click()
    await expect.poll(async () => (await placement(tab)).below).toBe(0)
  })
})

repro(FIREFOX_SELF_RTL, () => {
  test("self- position-area keywords mirror in a right-to-left part of the page", async ({
    browserName,
    page: tab,
  }) => {
    failsIn(browserName, { firefox: FIREFOX_SELF_RTL })
    await tab.setContent(
      page(
        `<div class="center" dir="rtl">${trigger}</div>`,
        "self-block-end span-self-inline-end",
      ),
    )
    await tab.locator("#trigger").click()
    await expect
      .poll(() => placement(tab))
      .toMatchObject({ below: 0, endEdge: 0 })
  })
})
