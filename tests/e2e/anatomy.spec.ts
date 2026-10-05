import { readdirSync, readFileSync } from "node:fs"
import AxeBuilder from "@axe-core/playwright"
import { expect, test } from "@playwright/test"
import { FRAMEWORKS } from "./fixtures"

const docsDir = new URL("../../src/docs/components/", import.meta.url)

const HEROES = readdirSync(docsDir)
  .filter((file) => file.endsWith(".astro"))
  .filter((file) =>
    readFileSync(new URL(file, docsDir), "utf-8").includes("heroAnatomy"),
  )
  .map((file) => file.replace(/\.astro$/, ""))
  .toSorted()

const WIDTHS = [390, 920, 1280]
const MIN_GAP = 24

for (const framework of FRAMEWORKS) {
  for (const slug of HEROES) {
    test(`${framework}/${slug} anatomy fits its layout`, async ({ page }) => {
      await page.route(
        (url) => url.hostname !== "localhost",
        (route) => route.abort(),
      )
      await page.goto(`/${framework}/components/${slug}/`)
      await page.evaluate(() => document.fonts.ready)

      for (const width of WIDTHS) {
        await page.setViewportSize({ height: 900, width })
        const layout = await page.evaluate(() => {
          const box = (selector: string) =>
            document
              .querySelector(`.anatomy-diagram ${selector}`)!
              .getBoundingClientRect()
          const stage = box(".stage")
          const subject = box(".subject")
          const legend = box(".legend")
          return {
            gap: legend.left - subject.right,
            overflow: document.documentElement.scrollWidth > window.innerWidth,
            sideBySide: legend.top < subject.bottom,
            withinStage:
              subject.left >= stage.left - 1 &&
              subject.right <= stage.right + 1,
          }
        })

        expect.soft(layout.overflow, `page scrolls at ${width}px`).toBe(false)
        expect
          .soft(layout.withinStage, `subject leaves the stage at ${width}px`)
          .toBe(true)
        if (layout.sideBySide) {
          expect
            .soft(
              layout.gap,
              `subject is too close to the legend at ${width}px`,
            )
            .toBeGreaterThanOrEqual(MIN_GAP)
        }
      }

      await page.setViewportSize({ height: 900, width: 1280 })
      const { violations } = await new AxeBuilder({ page })
        .include(".anatomy-diagram")
        .analyze()
      expect(
        violations.map((violation) => ({
          help: violation.help,
          id: violation.id,
          targets: violation.nodes.map((node) => node.target.join(" ")),
        })),
      ).toEqual([])
    })
  }
}
