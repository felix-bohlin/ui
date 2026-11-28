import { readFileSync } from "node:fs"
import AxeBuilder from "@axe-core/playwright"
import { expect, type Page, test } from "@playwright/test"
import { applyIconSwitch } from "../../src/utils/icon-switch"
import { axeNodes, openFixture, settle, STRESS_TESTS } from "./fixtures"
import { HOSTILE_ICONS } from "./hostile-icons"
import { ICON_SCREENSHOT_LIBRARIES } from "./screenshot-targets"
import { expectSizedRows } from "./stress-sizes"

const samples: Record<string, Record<string, string>> = JSON.parse(
  readFileSync(
    new URL("../../src/utils/icon-samples.json", import.meta.url),
    "utf-8",
  ),
)

const LIBRARIES = Object.keys(samples).toSorted()

const sets: Record<string, { icons: Record<string, string> }> = JSON.parse(
  readFileSync(
    new URL("../../src/utils/icon-sets.json", import.meta.url),
    "utf-8",
  ),
)

const known: Record<string, string[]> = JSON.parse(
  readFileSync(
    new URL("./a11y-known-violations.json", import.meta.url),
    "utf-8",
  ),
)

test.use({ viewport: { height: 4000, width: 1280 } })

const boxes = async (page: Page) => {
  await settle(page.locator("main"))
  return page.evaluate(() =>
    [...document.querySelectorAll("main *")]
      .filter((element) => !element.closest("svg"))
      .map((element) => {
        const { height, width, x, y } = element.getBoundingClientRect()
        const round = (value: number) => Math.round(value * 2) / 2
        const name = `${element.tagName.toLowerCase()}${[...element.classList]
          .map((name) => `.${name}`)
          .join("")}`
        return `${name} ${round(x)},${round(y)} ${round(width)}x${round(height)}`
      }),
  )
}

const moved = (expected: string[], actual: string[]) =>
  actual.flatMap((box, index) =>
    box === expected[index] ? [] : [`${expected[index]} -> ${box}`],
  )

const fluentBoxes = async (page: Page, component: string) => {
  await openFixture(page, "html", component, "?icons=fluent")
  return boxes(page)
}

for (const library of LIBRARIES) {
  for (const component of STRESS_TESTS) {
    test(`${component} works with the ${library} icons`, async ({
      page,
    }, testInfo) => {
      test.setTimeout(180_000)
      const expected =
        library === "fluent" ? undefined : await fluentBoxes(page, component)
      await openFixture(page, "html", component, `?icons=${library}`)
      expect(
        await page.evaluate(() => document.documentElement.dataset.icons),
      ).toBe(library)
      const viewBoxes = Object.fromEntries(
        Object.entries(samples[library]!).map(([name, svg]) => [
          name,
          svg.match(/viewBox="([^"]+)"/)?.[1],
        ]),
      )
      const icons = await page.evaluate(() =>
        [...document.querySelectorAll("main svg[data-icon]")].map((svg) => [
          svg.getAttribute("data-icon") ?? "",
          svg.getAttribute("viewBox"),
        ]),
      )
      expect(
        icons.filter(([name, viewBox]) => viewBoxes[name!] !== viewBox),
        "every icon comes from the library",
      ).toEqual([])

      if (expected) {
        expect(
          moved(expected, await boxes(page)).slice(0, 20),
          "an element outside the icons moved or changed size",
        ).toEqual([])
      }

      await settle(page.locator("main"))
      const { violations } = await new AxeBuilder({ page })
        .include("main")
        .analyze()
      const nodes = axeNodes(violations)
      const examples = await page.evaluate(
        (targets) =>
          targets.map(
            (target) =>
              document
                .querySelector(target)
                ?.closest("[data-example]")
                ?.getAttribute("data-example") ?? "",
          ),
        nodes.map((node) => node.target),
      )
      const prefix = `${testInfo.project.name}/html/${component}`
      expect(
        nodes.filter(
          (node, index) =>
            !(
              known[
                examples[index] ? `${prefix}/${examples[index]}` : prefix
              ] ?? []
            ).includes(node.id),
        ),
        "the icons add axe violations",
      ).toEqual([])

      if ((await page.locator("[data-size]").count()) > 0) {
        await expectSizedRows(page)
      }

      if (ICON_SCREENSHOT_LIBRARIES.includes(library)) {
        const examplesLocator = page.locator("[data-example]")
        for (let index = 0; index < (await examplesLocator.count()); index++) {
          const example = examplesLocator.nth(index)
          const name = await example.getAttribute("data-example")
          await expect
            .soft(example)
            .toHaveScreenshot(`icons/${library}/${component}/${name}.png`, {
              mask: [
                example.locator("iframe"),
                example.locator("img"),
                example.locator("video"),
              ],
            })
        }
      }
    })
  }
}

for (const component of STRESS_TESTS) {
  test(`${component} keeps its layout with hostile icons`, async ({ page }) => {
    test.setTimeout(180_000)
    const expected = await fluentBoxes(page, component)
    await openFixture(page, "html", component)
    await page.evaluate(applyIconSwitch, HOSTILE_ICONS)
    expect(
      moved(expected, await boxes(page)).slice(0, 20),
      "an element outside the icons moved or changed size",
    ).toEqual([])
  })
}

const inkOf = (page: Page, icons: Record<string, string>) =>
  page.evaluate(async (icons) => {
    const size = 48
    const canvas = document.createElement("canvas")
    canvas.height = size
    canvas.width = size
    const context = canvas.getContext("2d", { willReadFrequently: true })!
    const ink: Record<string, string> = {}
    for (const [name, svg] of Object.entries(icons)) {
      const image = new Image()
      image.src = `data:image/svg+xml,${encodeURIComponent(
        svg.replace("<svg ", `<svg width="${size}" height="${size}" `),
      )}`
      await image.decode()
      context.clearRect(0, 0, size, size)
      context.drawImage(image, 0, 0, size, size)
      const { data } = context.getImageData(0, 0, size, size)
      ink[name] = Array.from({ length: size * size }, (_, index) =>
        data[index * 4 + 3]! > 64 ? "1" : "0",
      ).join("")
    }
    return ink
  }, icons)

const drawn = (pixels: string) => pixels.replaceAll("0", "").length

for (const library of Object.keys(sets).toSorted()) {
  test(`every ${library} icon draws a shape, and a filled star differs from an empty one`, async ({
    page,
  }) => {
    await page.goto("about:blank")
    const ink = await inkOf(page, sets[library]!.icons)
    expect(
      Object.keys(ink).filter((role) => drawn(ink[role]!) < 24),
      "these icons draw nothing as a mask: check their files and attributes in ICON_LIBRARIES (src/utils/icon-libraries.ts)",
    ).toEqual([])
    expect(
      drawn(ink.rating!) - drawn(ink["rating-empty"]!),
      "Rating fills its stars with --ui-icon-rating over --ui-icon-rating-empty, so the filled star must cover more",
    ).toBeGreaterThan(24)
  })
}

test("the ink reader sees an icon that draws nothing", async ({ page }) => {
  await page.goto("about:blank")
  const ink = await inkOf(page, {
    blank:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><path d="M4 4h16v16H4z"/></svg>',
    filled:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M4 4h16v16H4z"/></svg>',
  })
  expect(drawn(ink.blank!)).toBe(0)
  expect(drawn(ink.filled!)).toBeGreaterThan(24)
})

test("an svg without a fill takes the text color, and the shapes in its mask stay black", async ({
  page,
}) => {
  await openFixture(page, "html", STRESS_TESTS[0]!)
  const fills = await page.evaluate(() => {
    const host = document.createElement("div")
    host.style.color = "rgb(200, 0, 0)"
    host.innerHTML = `
      <svg viewBox="0 0 24 24">
        <mask id="icons-spec-mask">
          <rect width="24" height="24" fill="white" />
          <circle cx="12" cy="12" r="4" />
        </mask>
        <path mask="url(#icons-spec-mask)" d="M0 0h24v24H0z" />
      </svg>
      <svg viewBox="0 0 24 24" fill="none"><path d="M0 0h24v24H0z" /></svg>`
    document.body.append(host)
    const fill = (selector: string) =>
      getComputedStyle(host.querySelector(selector)!).fill
    return {
      masked: fill("mask circle"),
      shape: fill("svg:first-child > path"),
      stroked: fill("svg:last-child > path"),
    }
  })
  expect(fills).toEqual({
    masked: "rgb(0, 0, 0)",
    shape: "rgb(200, 0, 0)",
    stroked: "none",
  })
})
