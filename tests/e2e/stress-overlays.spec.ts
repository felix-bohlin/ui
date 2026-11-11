import { expect, test } from "@playwright/test"
import { FIREFOX_SELF_RTL, failsIn } from "./engine-bugs"
import { openFixture } from "./fixtures"
import {
  SCENARIOS,
  id,
  isOpen,
  needsSelect,
  problems,
  run,
} from "./stress-overlays"

for (const {
  failing,
  failingIn,
  name,
  steps,
  stillOpen = [],
  top,
} of SCENARIOS) {
  test(`${name} is on top and inside the viewport`, async ({
    browserName,
    page,
  }) => {
    test.fail(!!failing, failing)
    failsIn(browserName, failingIn)
    test.skip(
      browserName !== "chromium" && steps.some((step) => "container" in step),
      "needs scrollIntoView({ container })",
    )
    await openFixture(page, "html", "stress/overlays")
    await needsSelect(page, steps)
    for (const step of steps) await run(page, step)
    await expect.poll(() => problems(page, top), name).toEqual([])
    for (const overlay of stillOpen)
      expect(await isOpen(page, id(overlay)), `${overlay} stays open`).toBe(
        true,
      )
  })
}

test("a menu in a right-to-left part of the page opens from its trigger's right edge", async ({
  browserName,
  page,
}) => {
  failsIn(browserName, { firefox: FIREFOX_SELF_RTL })
  await openFixture(page, "html", "stress/overlays")
  await run(page, { open: "rtl-menu" })
  const edges = () =>
    page.evaluate(() => {
      const menu = document
        .getElementById("stress-overlays-rtl-menu")!
        .getBoundingClientRect()
      const trigger = document
        .querySelector('[commandfor="stress-overlays-rtl-menu"]')!
        .getBoundingClientRect()
      return Math.round(menu.right - trigger.right)
    })
  await expect.poll(edges).toBe(0)
})

test("text and inline elements straight in a popover's content stay on one line", async ({
  page,
}) => {
  await openFixture(page, "html", "stress/overlays")
  await run(page, { open: "popover-inline" })
  const tops = await page
    .locator(`${id("popover-inline")} > .ui-content`)
    .evaluate((content) =>
      [...content.querySelectorAll("a, strong")].map((element) =>
        Math.round(element.getBoundingClientRect().top),
      ),
    )
  expect(tops).toHaveLength(2)
  expect(Math.abs(tops[0] - tops[1])).toBeLessThanOrEqual(2)
})

test("a tall popover stops at 60% of the viewport and scrolls its content, not itself", async ({
  page,
}) => {
  await openFixture(page, "html", "stress/overlays")
  await run(page, { open: "popover-tall" })
  const sizes = await page.locator(id("popover-tall")).evaluate((popover) => {
    const content = popover.querySelector(".ui-content")!
    const footer = popover.querySelector(".ui-footer")!
    return {
      contentScrolls: content.scrollHeight > content.clientHeight,
      footerInside:
        footer.getBoundingClientRect().bottom <=
        popover.getBoundingClientRect().bottom,
      popoverScrolls: popover.scrollHeight > popover.clientHeight,
      share: popover.getBoundingClientRect().height / window.innerHeight,
    }
  })
  expect(sizes.share).toBeLessThanOrEqual(0.6)
  expect(sizes).toMatchObject({
    contentScrolls: true,
    footerInside: true,
    popoverScrolls: false,
  })
})

test("a popover is between 16rem and 24rem wide", async ({ page }) => {
  await openFixture(page, "html", "stress/overlays")
  const widthOf = (name: string) =>
    page
      .locator(id(name))
      .evaluate(
        (popover) =>
          popover.getBoundingClientRect().width /
          parseFloat(getComputedStyle(document.documentElement).fontSize),
      )
  await run(page, { open: "popover-tall" })
  expect(await widthOf("popover-tall")).toBe(24)
  await run(page, { open: "popover-dialog" })
  await run(page, { open: "popover-in-dialog" })
  expect(await widthOf("popover-in-dialog")).toBe(16)
})
