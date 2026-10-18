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

const isCarousel = (html: string) =>
  /^<[^>]*\bclass="[^"]*\bui-carousel\b/.test(html)

for (const theme of THEMES) {
  for (const component of STRESS_TESTS) {
    test(`${component} works with the ${theme} theme`, async ({
      page,
    }, testInfo) => {
      test.setTimeout(180_000)
      await openFixture(page, "html", component, `?theme=${theme}`)
      expect(
        await page.evaluate(() => document.documentElement.dataset.theme),
      ).toBe(theme)

      const { violations } = await new AxeBuilder({ page })
        .include("main")
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
      const prefix = `${testInfo.project.name}/${component}`
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
