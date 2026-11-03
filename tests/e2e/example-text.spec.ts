import { expect, test, type Page } from "@playwright/test"
import { COMPONENTS, FRAMEWORKS, openFixture, type Framework } from "./fixtures"

const KNOWN_DIFFERENCES: Record<string, string> = {}

const texts = async (page: Page, framework: Framework, component: string) => {
  await openFixture(page, framework, component)
  await page.evaluate(() => {
    for (const details of document.querySelectorAll<HTMLDetailsElement>(
      "[data-example] details",
    )) {
      details.open = true
    }
    for (const dialog of document.querySelectorAll<HTMLDialogElement>(
      "[data-example] dialog",
    )) {
      if (!dialog.open) dialog.show()
    }
    for (const popover of document.querySelectorAll<HTMLElement>(
      "[data-example] [popover]",
    )) {
      popover.popover = "manual"
      if (!popover.matches(":popover-open")) popover.showPopover()
    }
  })
  const examples = page.locator("[data-example]")
  const result = new Map<string, { aria: string; text: string }>()
  for (const example of await examples.all()) {
    result.set((await example.getAttribute("data-example"))!, {
      aria: await example.ariaSnapshot(),
      text: await example.evaluate(
        (element) => (element as HTMLElement).innerText,
      ),
    })
  }
  return result
}

for (const component of COMPONENTS) {
  test(`${component} examples read the same in every framework`, async ({
    page,
  }) => {
    test.setTimeout(120_000)
    const astro = await texts(page, "astro", component)
    expect(astro.size).toBeGreaterThan(0)
    const known: string[] = []
    for (const framework of FRAMEWORKS.filter((name) => name !== "astro")) {
      for (const [name, actual] of await texts(page, framework, component)) {
        const expected = astro.get(name)
        if (!expected) continue
        const key = `${framework}/${component}/${name}`
        const same =
          actual.text === expected.text && actual.aria === expected.aria
        if (key in KNOWN_DIFFERENCES) {
          if (same) known.push(key)
          continue
        }
        expect
          .soft(actual.text, `${key} innerText differs from astro`)
          .toBe(expected.text)
        expect
          .soft(actual.aria, `${key} accessibility tree differs from astro`)
          .toBe(expected.aria)
      }
    }
    expect(
      known,
      "these KNOWN_DIFFERENCES no longer differ: delete them",
    ).toEqual([])
  })
}
