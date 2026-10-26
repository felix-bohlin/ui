import { expect, test } from "@playwright/test"
import type { Page } from "@playwright/test"

const FIREFOX_SELF_RTL =
  "Firefox places a popover with self- position-area keywords toward the wrong inline side in a right-to-left part of a left-to-right page"

const WEBKIT_SCROLLED_ANCHOR =
  "WebKit moves a popover anchored inside a modal dialog up by the page scroll"

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

for (const scrolled of [false, true]) {
  test(`a popover anchored in a modal dialog opens below its trigger ${scrolled ? "on a scrolled page" : "at the top of the page"}`, async ({
    browserName,
    page: tab,
  }) => {
    test.fail(scrolled && browserName === "webkit", WEBKIT_SCROLLED_ANCHOR)
    await tab.setContent(
      page(
        `<div class="spacer"></div><dialog id="dialog">${trigger}</dialog><div class="spacer"></div>`,
      ),
    )
    if (scrolled) await tab.evaluate(() => scrollTo(0, 2000))
    await tab.evaluate(() =>
      (document.getElementById("dialog") as HTMLDialogElement).showModal(),
    )
    await tab.locator("#trigger").click()
    await expect.poll(async () => (await placement(tab)).below).toBe(0)
  })
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

test("self- position-area keywords mirror in a right-to-left part of the page", async ({
  browserName,
  page: tab,
}) => {
  test.fail(browserName === "firefox", FIREFOX_SELF_RTL)
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

test("a popover hidden while it transitions in ends up hidden", async ({
  page: tab,
}) => {
  await tab.setContent(`<!doctype html>
<style>
  #popover {
    opacity: 0;
    scale: 0.96;
    transition:
      display 0.3s allow-discrete,
      opacity 0.3s,
      overlay 0.3s allow-discrete,
      scale 0.3s;
  }
  #popover:popover-open {
    opacity: 1;
    scale: 1;
  }
  @starting-style {
    #popover:popover-open {
      opacity: 0;
      scale: 0.96;
    }
  }
</style>
<div id="popover" popover>
  <button id="item" commandfor="popover" command="hide-popover">Item</button>
</div>`)
  const stillShown = await tab.evaluate(async () => {
    const popover = document.getElementById("popover")!
    const item = document.getElementById("item")!
    const wait = (ms: number) => new Promise((done) => setTimeout(done, ms))
    const shown: number[] = []
    for (let delay = 0; delay <= 360; delay += 40) {
      popover.showPopover()
      await wait(delay)
      item.click()
      await wait(600)
      if (
        popover.matches(":popover-open") ||
        getComputedStyle(popover).display !== "none"
      ) {
        shown.push(delay)
      }
    }
    return shown
  })
  expect(stillShown, "ms after showing when hiding failed").toEqual([])
})
