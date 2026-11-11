import { expect, test } from "@playwright/test"
import { FIREFOX_SELF_RTL, failsIn } from "./engine-bugs"
import { needs, openFixture } from "./fixtures"
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

test("a dialog without a footer can't scroll itself", async ({ page }) => {
  await openFixture(page, "html", "stress/overlays")
  await run(page, { open: "popover-dialog" })
  const dialog = page.locator(id("popover-dialog"))
  await expect(dialog.locator("> .ui-footer")).toHaveCount(0)
  expect(
    await dialog.evaluate((element) => {
      element.scrollTop = 40
      return element.scrollTop
    }),
  ).toBe(0)
})

test("a tall popover shows a scroll shadow where its content has more to scroll", async ({
  page,
}) => {
  await openFixture(page, "html", "stress/overlays")
  await needs(page, "scroll-state container queries", () =>
    CSS.supports("container-type", "scroll-state"),
  )
  await run(page, { open: "popover-tall" })
  const content = page.locator(`${id("popover-tall")} > .ui-content`)
  const shadows = () =>
    content.evaluate((element) =>
      ["::before", "::after"].map(
        (pseudo) => getComputedStyle(element, pseudo).opacity,
      ),
    )
  await expect.poll(shadows).toEqual(["0", "1"])
  await content.evaluate((element) => {
    element.scrollTop = 80
  })
  await expect.poll(shadows).toEqual(["1", "1"])
  await content.evaluate((element) => {
    element.scrollTop = element.scrollHeight
  })
  await expect.poll(shadows).toEqual(["1", "0"])
})

test("a popover without a footer can't scroll itself", async ({ page }) => {
  await openFixture(page, "html", "stress/overlays")
  await run(page, { open: "popover-end" })
  const popover = page.locator(id("popover-end"))
  await expect(popover.locator("> .ui-footer")).toHaveCount(0)
  expect(
    await popover.evaluate((element) => {
      element.scrollTop = 40
      return element.scrollTop
    }),
  ).toBe(0)
})

for (const name of ["popover-list", "popover-content-list"]) {
  test(`a list between the header and footer of ${name} scrolls on its own`, async ({
    page,
  }) => {
    await openFixture(page, "html", "stress/overlays")
    await run(page, { open: name })
    const edges = await page.locator(id(name)).evaluate((popover) => {
      const list = popover.querySelector(":scope > .ui-list")!
      const box = popover.getBoundingClientRect()
      const header = popover.querySelector(":scope > .ui-header")!
      const footer = popover.querySelector(":scope > .ui-footer")!
      popover.scrollTop = 40
      list.scrollTop = list.scrollHeight
      return {
        footerInside: footer.getBoundingClientRect().bottom <= box.bottom,
        headerInside: header.getBoundingClientRect().top >= box.top,
        lastRowInside:
          list.lastElementChild!.getBoundingClientRect().bottom <=
          footer.getBoundingClientRect().top + 1,
        listScrolled: list.scrollTop > 0,
        popoverScrolled: popover.scrollTop > 0,
      }
    })
    expect(edges).toEqual({
      footerInside: true,
      headerInside: true,
      lastRowInside: true,
      listScrolled: true,
      popoverScrolled: false,
    })
  })
}

test("the content fills a popover with a set height, so its footer stays at the bottom", async ({
  page,
}) => {
  await openFixture(page, "html", "stress/overlays")
  await run(page, { open: "popover-fixed" })
  const gap = await page.locator(id("popover-fixed")).evaluate((popover) => {
    const footer = popover.querySelector(":scope > .ui-footer")!
    return (
      popover.getBoundingClientRect().bottom -
      footer.getBoundingClientRect().bottom
    )
  })
  expect(gap).toBeLessThanOrEqual(2)
})

test("a form with a field takes the footer's row, and a form with only a button doesn't", async ({
  page,
}) => {
  await openFixture(page, "html", "stress/overlays")
  await run(page, { open: "popover-fixed" })
  const widths = await page
    .locator(`${id("popover-fixed")} > .ui-footer`)
    .evaluate((footer) => {
      const style = getComputedStyle(footer)
      const row =
        footer.clientWidth -
        parseFloat(style.paddingInlineStart) -
        parseFloat(style.paddingInlineEnd)
      return [...footer.querySelectorAll(":scope > form")].map((form) =>
        Math.round(form.getBoundingClientRect().width - row),
      )
    })
  expect(widths[0]).toBe(0)
  expect(widths[1]).toBeLessThan(0)
})

test("a dialog with a list beside its content can scroll to its footer", async ({
  page,
}) => {
  await openFixture(page, "html", "stress/overlays")
  await run(page, { open: "list-dialog" })
  const reach = await page.locator(id("list-dialog")).evaluate((dialog) => {
    const footer = dialog.querySelector(":scope > .ui-footer")!
    dialog.scrollTop = dialog.scrollHeight
    return (
      footer.getBoundingClientRect().bottom <=
      dialog.getBoundingClientRect().bottom + 1
    )
  })
  expect(reach).toBe(true)
})
