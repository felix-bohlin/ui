import { readdirSync, readFileSync } from "node:fs"
import AxeBuilder from "@axe-core/playwright"
import { expect, test } from "@playwright/test"
import { STRESS_TESTS, axeNodes, openFixture, settle } from "./fixtures"
import { THEMED_BLOCKS } from "./screenshot-targets"
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
      await settle(page.locator(isBlock ? "body" : "main"))
      const { violations } = await new AxeBuilder({ page })
        .include(isBlock ? "body" : "main")
        .exclude('iframe[src*="youtube"]')
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

const RECOLORED: Record<string, string[]> = {
  bootstrap: ["--ui-focus-ring-color", "--ui-primary"],
  brutalist: ["--ui-primary", "--ui-surface", "--ui-surface-tonal"],
  govuk: ["--ui-primary", "--ui-primary-text", "--ui-surface-filled"],
  m3: ["--ui-border-color", "--ui-primary", "--ui-surface", "--ui-text"],
}
const NEUTRAL: Record<string, string> = {
  shadcn: "a black or white primary and gray surfaces, on purpose",
}

test("every theme says which tokens follow --ui-palette-source", () => {
  expect(
    THEMES.filter((theme) => !RECOLORED[theme] && !NEUTRAL[theme]),
    "add the theme to RECOLORED with the tokens that follow --ui-palette-source, or to NEUTRAL with the reason",
  ).toEqual([])
})

for (const [theme, tokens] of Object.entries(RECOLORED)) {
  test(`the ${theme} theme follows --ui-palette-source in a .ui-palette scope`, async ({
    page,
  }) => {
    await openFixture(page, "html", STRESS_TESTS[0]!, `?theme=${theme}`)
    const colors = await page.evaluate((names) => {
      const scope = document.createElement("div")
      scope.className = "ui-palette"
      scope.style.setProperty("--ui-palette-source", "oklch(0.6 0.15 30)")
      document.body.append(scope)
      const resolve = (host: Element, name: string) => {
        const probe = document.createElement("div")
        probe.style.color = `var(${name})`
        host.append(probe)
        const color = getComputedStyle(probe).color
        probe.remove()
        return color
      }
      return names.map((name) => ({
        name,
        page: resolve(document.body, name),
        scope: resolve(scope, name),
      }))
    }, tokens)
    for (const { name, page: color, scope } of colors) {
      expect(scope, `${name} in the scope`).not.toBe(color)
    }
  })
}
