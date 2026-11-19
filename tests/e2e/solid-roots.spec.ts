import { expect, test, type Page } from "@playwright/test"
import { instantScrolling, pageErrors } from "./fixtures"

const hydrateRoots = async (page: Page, second: "later" | "same-task") => {
  await instantScrolling(page)
  await page.goto("/dev/fixtures/solid-roots/")
  await expect(page.locator("html[data-ready]")).toHaveCount(1)
  await page.evaluate((detail) => {
    const server = [
      ...document.querySelectorAll<HTMLElement>("[data-solid-root]"),
    ].map((root) => ({ elements: [...root.querySelectorAll("*")], root }))
    Object.assign(window, { server })
    document.dispatchEvent(new CustomEvent("hydrate-roots", { detail }))
  }, second)
  await expect(page.locator("[data-solid-root][data-hydrated]")).toHaveCount(2)
  const kept = await page.evaluate(() =>
    (
      window as unknown as {
        server: { elements: Element[]; root: HTMLElement }[]
      }
    ).server.map(({ elements, root }) => ({
      kept: elements.filter((element) => root.contains(element)).length,
      server: elements.length,
    })),
  )
  for (const root of await page.locator("[data-solid-root]").all()) {
    await root.getByRole("button").click()
    await expect(root.getByRole("button")).toHaveText("Count 1")
  }
  return kept
}

test("Solid roots hydrated in one task each claim their server markup", async ({
  page,
}) => {
  const errors = pageErrors(page)
  const [first, second] = await hydrateRoots(page, "same-task")
  expect(first.server).toBeGreaterThan(0)
  expect(first.kept).toBe(first.server)
  expect(second.kept).toBe(second.server)
  expect(errors).toEqual([])
})

test("a Solid root hydrated in a later task renders over its server markup", async ({
  page,
}) => {
  const [first, second] = await hydrateRoots(page, "later")
  expect(first.kept).toBe(first.server)
  expect(
    second.kept,
    "Solid now hydrates a root in a later task: drop the sentence about it in src/docs/guide/getting-started/Solid.astro, then this test",
  ).toBe(0)
})
