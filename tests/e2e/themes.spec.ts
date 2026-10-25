import { readdirSync, readFileSync } from "node:fs"
import AxeBuilder from "@axe-core/playwright"
import { expect, test } from "@playwright/test"
import { STRESS_TESTS, openFixture } from "./fixtures"
import { expectSizedRows } from "./stress-sizes"

const THEMES = readdirSync(
  new URL("../../packages/opui/themes/", import.meta.url),
)
  .filter((file) => file.endsWith(".css"))
  .map((file) => file.replace(/\.css$/, ""))
  .toSorted()

const known: Record<string, string[]> = JSON.parse(
  readFileSync(
    new URL("./a11y-known-violations.json", import.meta.url),
    "utf-8",
  ),
)

test.use({ viewport: { height: 4000, width: 1280 } })

const THEMED_BLOCKS = [
  "blocks/inbox",
  "blocks/sales-dashboard",
  "blocks/shopping-cart",
]

const isCarousel = (html: string) =>
  /^<[^>]*\bclass="[^"]*\bui-carousel\b/.test(html)

for (const theme of THEMES) {
  for (const component of [...THEMED_BLOCKS, ...STRESS_TESTS]) {
    test(`${component} works with the ${theme} theme`, async ({
      page,
    }, testInfo) => {
      test.setTimeout(180_000)
      await openFixture(page, "html", component, `?theme=${theme}`)
      expect(
        await page.evaluate(() => document.documentElement.dataset.theme),
      ).toBe(theme)

      const isBlock = component.startsWith("blocks/")
      const { violations } = await new AxeBuilder({ page })
        .include(isBlock ? "body" : "main")
        .exclude('iframe[src*="youtube"]')
        .analyze()
      const nodes = violations.flatMap((violation) =>
        violation.nodes
          .filter(
            (node) =>
              violation.id !== "scrollable-region-focusable" ||
              !isCarousel(node.html),
          )
          .map((node) => ({
            id: violation.id,
            target: node.target.join(" "),
          })),
      )
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
        "the theme adds axe violations",
      ).toEqual([])

      if ((await page.locator("[data-size]").count()) > 0) {
        await expectSizedRows(page)
      }

      await page.evaluate(async () => {
        for (const carousel of document.querySelectorAll(".ui-carousel")) {
          carousel.scrollTo({ behavior: "instant", left: 0, top: 0 })
        }
        await new Promise(requestAnimationFrame)
      })

      if (isBlock) {
        const preview = page.locator(".block-preview")
        await expect
          .soft(preview)
          .toHaveScreenshot(`themes/${theme}/${component}.png`, {
            mask: [preview.locator("img"), preview.locator("video")],
          })
      }

      const examplesLocator = page.locator("[data-example]")
      for (let index = 0; index < (await examplesLocator.count()); index++) {
        const example = examplesLocator.nth(index)
        const name = await example.getAttribute("data-example")
        await expect
          .soft(example)
          .toHaveScreenshot(`themes/${theme}/${component}/${name}.png`, {
            mask: [example.locator("img"), example.locator("video")],
          })
      }
    })
  }
}
