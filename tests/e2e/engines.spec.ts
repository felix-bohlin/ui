import { expect, test } from "@playwright/test"
import type { Page } from "@playwright/test"
import {
  ENGINE_BUGS,
  FIREFOX_SELF_RTL,
  WEBKIT_ARROW_FOCUS_SCROLL,
  WEBKIT_RADIO_NO_WRAP,
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
    // Math.round(-0.4) is -0, which toBe(0) rejects
    const round = (value: number) => Math.round(value) || 0
    const trigger = box("trigger")
    const popover = box("popover")
    return {
      below: round(popover.top - trigger.bottom),
      endEdge: round(popover.right - trigger.right),
      startEdge: round(popover.left - trigger.left),
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

const splitButton = (start: string) => `<!doctype html>
<style>
  body { margin: 0; padding: 200px 0 0 ${start} }
  .group { display: inline-flex; overflow: hidden }
  #popover {
    inline-size: 12rem;
    inset: auto;
    margin: 0;
    opacity: 0;
    position-area: block-end span-inline-start;
    position-try-fallbacks: flip-inline;
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
  #popover button { display: block; inline-size: 100%; padding: 0.5rem }
</style>
<div class="group">
  <button>Save</button>
  <button id="trigger" commandfor="popover" command="toggle-popover">More</button>
  <div id="popover" popover>
    <button id="item" commandfor="popover" command="hide-popover">Save as draft</button>
    <button commandfor="popover" command="hide-popover">Save and publish</button>
  </div>
</div>`

test.describe("an item click closes an end aligned popover", () => {
  for (const fallback of [false, true]) {
    test(
      fallback ? "that a position-try fallback placed" : "at its own position",
      async ({ page: tab }) => {
        await tab.setContent(splitButton(fallback ? "8px" : "400px"))
        const popover = tab.locator("#popover")
        const open = async () => {
          await tab.locator("#trigger").click()
          await expect(popover).toBeVisible()
        }

        await open()
        // The opening transition can still be scaling it, so poll until it settles
        await expect
          .poll(
            () =>
              placement(tab).then(({ endEdge, startEdge }) =>
                fallback ? startEdge : endEdge,
              ),
            {
              message: fallback
                ? "the popover starts at its trigger"
                : "the popover ends at its trigger",
            },
          )
          .toBe(0)
        await popover.evaluate((element: HTMLElement) => element.hidePopover())
        await expect(popover).toBeHidden()

        const stillOpen: string[] = []
        for (const delay of [
          null,
          null,
          null,
          ...Array.from({ length: 12 }, (_, index) => index * 30),
        ]) {
          await open()
          if (delay === null) await tab.locator("#item").click()
          else {
            await tab.waitForTimeout(delay)
            await tab.locator("#item").click({ force: true })
          }
          const closed = await popover
            .waitFor({ state: "hidden", timeout: 2000 })
            .then(() => true)
            .catch(() => false)
          if (!closed) {
            stillOpen.push(delay === null ? "click" : `${delay}ms`)
            await popover.evaluate((element: HTMLElement) =>
              element.hidePopover(),
            )
            await expect(popover).toBeHidden()
          }
        }
        expect(stillOpen, "clicks after opening that left it open").toEqual([])
      },
    )
  }
})

const radios = (count: number) =>
  Array.from(
    { length: count },
    (_, index) =>
      `<input type="radio" name="group" id="radio-${index + 1}"${index === 0 ? " checked" : ""}><label for="radio-${index + 1}">Option ${index + 1}</label>`,
  ).join("")

repro(WEBKIT_RADIO_NO_WRAP, () => {
  test("the arrow keys wrap from the last radio of a group to the first", async ({
    browserName,
    page: tab,
  }) => {
    failsIn(browserName, { webkit: WEBKIT_RADIO_NO_WRAP })
    await tab.setContent(`<!doctype html>${radios(3)}`)
    await tab.locator("label").last().click()
    await expect(tab.locator("#radio-3")).toBeChecked()
    await tab.keyboard.press("ArrowRight")
    await expect(tab.locator("#radio-1")).toBeChecked()
  })
})

repro(WEBKIT_ARROW_FOCUS_SCROLL, () => {
  test("a scroll container scrolls to the clipped radio the arrow keys focus", async ({
    browserName,
    page: tab,
  }) => {
    failsIn(browserName, { webkit: WEBKIT_ARROW_FOCUS_SCROLL })
    await tab.setContent(`<!doctype html>
<style>
  #strip { display: grid; grid-auto-columns: max-content; inline-size: 16rem; overflow-x: auto; position: relative }
  input { block-size: 1lh; clip-path: inset(50%); grid-row: 1; inline-size: 1ch; inset-block-start: 50%; inset-inline-start: 50%; margin: 0; position: absolute }
  label { grid-row: 1; padding: 0.5rem 1.5rem; white-space: nowrap }
${Array.from({ length: 8 }, (_, index) => `  #radio-${index + 1} { grid-column: ${index + 1} }`).join("\n")}
</style>
<div id="strip">${radios(8)}</div>`)
    await tab.locator("label").first().click()
    for (let index = 1; index < 8; index++) {
      await tab.keyboard.press("ArrowRight")
    }
    await expect(tab.locator("#radio-8")).toBeFocused()
    await expect
      .poll(() =>
        tab.evaluate(() => {
          const strip = document
            .getElementById("strip")!
            .getBoundingClientRect()
          const last = document
            .querySelector("label:last-of-type")!
            .getBoundingClientRect()
          return last.left >= strip.left - 1 && last.right <= strip.right + 1
        }),
      )
      .toBe(true)
  })
})
