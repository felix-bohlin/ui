import AxeBuilder from "@axe-core/playwright"
import { expect, test as base, type Locator, type Page } from "@playwright/test"
import { KNOWN_AXE, KNOWN_CONSOLE } from "./known.ts"

export const PHONE = { height: 844, width: 390 }

export const PHONE_DEVICE = { hasTouch: true, isMobile: true, viewport: PHONE }

export const test = base.extend<{ problems: string[] }>({
  problems: [
    async ({ page }, use) => {
      const problems: string[] = []
      page.on("console", (message) => {
        if (
          ["error", "warning"].includes(message.type()) &&
          !KNOWN_CONSOLE.some((known) => known.message.test(message.text()))
        ) {
          problems.push(`${message.type()}: ${message.text()}`)
        }
      })
      page.on("pageerror", (error) =>
        problems.push(`pageerror: ${error.message}`),
      )
      await use(problems)
      expect(problems, "console errors and warnings").toEqual([])
    },
    { auto: true },
  ],
})

export { expect }

export const open = async (page: Page, path: string) => {
  await page.goto(path)
  await expect(page.locator("html[data-hydrated]")).toBeAttached()
}

export const screen = (page: Page) => page.locator("main [data-screen]")

export const axeViolations = async (page: Page) => {
  const { violations } = await new AxeBuilder({ page }).analyze()
  return violations.flatMap(({ id, nodes }) =>
    nodes.map((node) => ({
      html: node.html,
      id,
      target: node.target.join(" "),
    })),
  )
}

const isKnown = (violation: { html: string; id: string; target: string }) =>
  KNOWN_AXE.some(
    (known) =>
      known.id === violation.id &&
      (known.target.test(violation.target) ||
        known.target.test(violation.html)),
  )

export const expectNoAxeViolations = async (page: Page) => {
  expect(
    (await axeViolations(page))
      .filter((violation) => !isKnown(violation))
      .map(({ id, target }) => `${id}: ${target}`),
  ).toEqual([])
}

export const clientNavigationMarker = async (page: Page) => {
  await page.evaluate(() => {
    ;(window as unknown as { __reference: boolean }).__reference = true
  })
  return () =>
    page.evaluate(
      () => (window as unknown as { __reference?: boolean }).__reference,
    )
}

export const settled = (locator: Locator) =>
  locator.evaluate((element) =>
    Promise.all(
      element
        .getAnimations({ subtree: true })
        .map((animation) => animation.finished),
    ),
  )
