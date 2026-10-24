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

if (HEROES.length === 0) throw new Error("no heroAnatomy pages found")

const WIDTHS = [390, 920, 1280]
const MIN_GAP = 24

for (const framework of FRAMEWORKS) {
  for (const slug of HEROES) {
    test(`${framework}/${slug} anatomy fits its layout`, async ({
      browserName,
      page,
    }) => {
      test.slow(browserName === "webkit", "WebKit lays out these pages slowly")
      await page.emulateMedia({ reducedMotion: "reduce" })
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

      const diagrams = await page.evaluate(() =>
        [...document.querySelectorAll(".anatomy-diagram")].map((diagram) => {
          const sheet = diagram.querySelector("style")!.sheet!
          const elements = [...diagram.querySelectorAll(".subject *")]
          const anchorNames = () =>
            elements.map((element) =>
              getComputedStyle(element)
                .getPropertyValue("anchor-name")
                .split(/,\s*/)
                .filter((name) => name !== "none"),
            )
          const named = anchorNames()
          sheet.disabled = true
          const own = anchorNames()
          sheet.disabled = false
          const names = new Set(named.flat())
          const unsupported = new Set(
            [
              ...(diagram.querySelector("style")!.textContent ?? "").matchAll(
                /([^{}\n]+::[^{}\n]+)\{\s*anchor-name:\s*([^;}]+)/g,
              ),
            ]
              .filter(
                ([, selector]) => !CSS.supports(`selector(${selector.trim()})`),
              )
              .flatMap(([, , value]) =>
                value.split(/,\s*/).map((name) => name.trim()),
              ),
          )
          for (const rule of sheet.cssRules) {
            if (!(rule instanceof CSSStyleRule)) continue
            const [originating, pseudo] = rule.selectorText.split("::")
            if (pseudo && document.querySelector(originating)) {
              for (const name of rule.style
                .getPropertyValue("anchor-name")
                .split(/,\s*/)) {
                names.add(name)
              }
            }
          }
          return {
            lost: elements.flatMap((element, index) =>
              own[index]
                .filter((name) => !named[index].includes(name))
                .map(
                  (name) =>
                    `${[element.localName, ...element.classList].join(".")}: ${name}`,
                ),
            ),
            unmatched: [
              ...diagram.querySelectorAll<HTMLElement>(".legend .part"),
            ]
              .filter((part) => {
                const name = part.style.getPropertyValue("--part").trim()
                return !names.has(name) && !unsupported.has(name)
              })
              .map((part) => part.querySelector("code")!.textContent),
          }
        }),
      )
      expect(diagrams.length).toBeGreaterThan(0)
      for (const { lost, unmatched } of diagrams) {
        expect.soft(unmatched, "parts that match nothing").toEqual([])
        expect
          .soft(
            lost,
            "anchor names the anatomy overrides; add them to anchorName",
          )
          .toEqual([])
      }

      if (framework !== "html" || browserName !== "chromium") return

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
