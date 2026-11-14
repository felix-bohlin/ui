import { readFileSync } from "node:fs"
import AxeBuilder from "@axe-core/playwright"
import { expect, type Page, test } from "@playwright/test"
import { applyIconSwitch } from "../../src/utils/icon-switch"
import { axeNodes, openFixture, settle, STRESS_TESTS } from "./fixtures"
import { HOSTILE_ICONS } from "./hostile-icons"
import { ICON_SCREENSHOT_LIBRARIES } from "./screenshot-targets"
import { expectSizedRows } from "./stress-sizes"

const sets: Record<string, { samples: Record<string, string> }> = JSON.parse(
  readFileSync(
    new URL("../../src/utils/icon-sets.json", import.meta.url),
    "utf-8",
  ),
)

const LIBRARIES = Object.keys(sets).toSorted()

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
        Object.entries(sets[library]!.samples).map(([name, svg]) => [
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
              mask: [example.locator("img"), example.locator("video")],
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
