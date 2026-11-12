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

for (const { failingIn, name, steps, stillOpen = [], top } of SCENARIOS) {
  test(`${name} is on top and inside the viewport`, async ({
    browserName,
    page,
  }) => {
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

test("a dialog with a footer scrolls to it when its header and footer don't fit", async ({
  page,
}) => {
  await openFixture(page, "html", "stress/overlays")
  await run(page, { open: "long-dialog" })
  await page.setViewportSize({ height: 120, width: 320 })
  const reach = await page.locator(id("long-dialog")).evaluate((dialog) => {
    const footer = dialog.querySelector(":scope > .ui-footer")!
    const header = dialog.querySelector(":scope > .ui-header")!
    const tooTall =
      header.getBoundingClientRect().height +
        footer.getBoundingClientRect().height >
      dialog.clientHeight
    dialog.scrollTop = dialog.scrollHeight
    return {
      footerInside:
        footer.getBoundingClientRect().bottom <=
        dialog.getBoundingClientRect().bottom + 1,
      tooTall,
    }
  })
  expect(reach).toEqual({ footerInside: true, tooTall: true })
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

test("a list or an image beside content taller than the popover keeps a height, and the popover scrolls to its footer", async ({
  page,
}) => {
  await openFixture(page, "html", "stress/overlays")
  await needs(page, "calc-size()", () =>
    CSS.supports("min-block-size: calc-size(fit-content, size)"),
  )
  await run(page, { open: "popover-content-list" })
  const sizes = await page
    .locator(id("popover-content-list"))
    .evaluate((popover) => {
      const content = popover.querySelector(":scope > .ui-content")!
      const footer = popover.querySelector(":scope > .ui-footer")!
      const list = popover.querySelector(":scope > .ui-list")!
      for (let index = 0; index < 40; index++) {
        const paragraph = document.createElement("p")
        paragraph.textContent = "Older conversations are kept for a year."
        content.append(paragraph)
      }
      const contentCut = content.scrollHeight > content.clientHeight
      popover.scrollTop = popover.scrollHeight
      const footerInside =
        footer.getBoundingClientRect().bottom <=
        popover.getBoundingClientRect().bottom + 1
      const listHeight = list.clientHeight
      const image = document.createElement("canvas")
      image.height = 150
      list.replaceWith(image)
      return {
        contentCut,
        footerInside,
        image: image.getBoundingClientRect().height,
        list: listHeight,
      }
    })
  expect(sizes.contentCut).toBe(false)
  expect(sizes.footerInside).toBe(true)
  expect(sizes.image).toBeGreaterThanOrEqual(150)
  expect(sizes.list).toBeGreaterThan(80)
})

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

for (const name of ["popover-hidden", "hidden-dialog"]) {
  test(`only the content of ${name} scrolls next to children that render nothing`, async ({
    page,
  }) => {
    await openFixture(page, "html", "stress/overlays")
    await run(page, { open: name })
    const scrolled = await page.locator(id(name)).evaluate((overlay) => {
      const content = overlay.querySelector(":scope > .ui-content")!
      const header = overlay.querySelector(":scope > .ui-header")!
      overlay.scrollTop = 40
      content.scrollTop = 40
      return {
        content: content.scrollTop,
        headerInside:
          header.getBoundingClientRect().top >=
          overlay.getBoundingClientRect().top,
        hidden: [
          ...overlay.querySelectorAll(
            ':scope > :is([popover], [type="hidden"], template)',
          ),
        ].map((element) => element.localName),
        overlay: overlay.scrollTop,
      }
    })
    expect(scrolled).toEqual({
      content: 40,
      headerInside: true,
      hidden: ["input", "menu", "template"],
      overlay: 0,
    })
  })
}

test("a menu straight in a popover keeps its minimum height", async ({
  page,
}) => {
  await openFixture(page, "html", "stress/overlays")
  await run(page, { open: "popover-hidden" })
  await run(page, { open: "popover-hidden-menu" })
  const sizes = await page
    .locator(id("popover-hidden-menu"))
    .evaluate((menu) => ({
      inPopover: menu.parentElement!.id,
      minBlockSize: getComputedStyle(menu).minBlockSize,
    }))
  expect(sizes.inPopover).toBe("stress-overlays-popover-hidden")
  expect(sizes.minBlockSize).not.toBe("0px")
})

test("a paragraph above a list in a popover keeps its height, and only the list scrolls", async ({
  page,
}) => {
  await openFixture(page, "html", "stress/overlays")
  await run(page, { open: "popover-intro" })
  const sizes = await page.locator(id("popover-intro")).evaluate((popover) => {
    const footer = popover.querySelector(":scope > .ui-footer")!
    const list = popover.querySelector(":scope > .ui-list")!
    const paragraph = popover.querySelector(":scope > p")!
    popover.scrollTop = 40
    paragraph.scrollTop = 40
    list.scrollTop = 40
    return {
      footerInside:
        footer.getBoundingClientRect().bottom <=
        popover.getBoundingClientRect().bottom,
      list: list.scrollTop,
      paragraph: paragraph.scrollTop,
      paragraphCut: paragraph.scrollHeight > paragraph.clientHeight,
      popover: popover.scrollTop,
    }
  })
  expect(sizes).toEqual({
    footerInside: true,
    list: 40,
    paragraph: 0,
    paragraphCut: false,
    popover: 0,
  })
})

test("the footer stays at the bottom of a popover with a set height and a list", async ({
  page,
}) => {
  await openFixture(page, "html", "stress/overlays")
  await run(page, { open: "popover-fixed-list" })
  const edges = await page
    .locator(id("popover-fixed-list"))
    .evaluate((popover) => {
      const footer = popover.querySelector(":scope > .ui-footer")!
      const list = popover.querySelector(":scope > .ui-list")!
      return {
        gap:
          popover.getBoundingClientRect().bottom -
          footer.getBoundingClientRect().bottom,
        room:
          footer.getBoundingClientRect().top -
          list.getBoundingClientRect().bottom,
      }
    })
  expect(edges.gap).toBeLessThanOrEqual(2)
  expect(edges.room).toBeGreaterThan(0)
})
