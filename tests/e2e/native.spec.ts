import { expect, test } from "@playwright/test"
import {
  casesOf,
  compareNative,
  differences,
  NATIVE_CASES,
  SVELTE_SPREAD,
} from "../apps/native/cases"
import { FRAMEWORKS, isHydratedFramework } from "../../src/utils/framework"
import { instantScrolling, pageErrors } from "./fixtures"

const DIFFERENCES = differences("svelte", SVELTE_SPREAD, [
  "checkbox-bound",
  "group-bound",
  "radio-bound",
  "rating-bound",
  "rating-default",
  "tabs-bound",
  "toggle-bound",
])

for (const { id, label } of FRAMEWORKS) {
  if (!isHydratedFramework(id)) continue

  test.describe(label, () => {
    test("the native and opui sides each have a form for every case, in the order of the table", async ({
      page,
    }) => {
      await instantScrolling(page)
      await page.goto(`/dev/fixtures/${id}-native/`)
      await expect(page.locator("html")).toHaveAttribute("data-hydrated", "")
      const names = NATIVE_CASES.map(({ name }) => name)
      expect(await casesOf(page)).toEqual([names, names])
    })

    for (const nativeCase of NATIVE_CASES) {
      test(`${nativeCase.name} holds the same state as the native control before hydration, after a change and after a form reset`, async ({
        page,
      }) => {
        const difference = DIFFERENCES.find(
          (entry) => entry.where === id && entry.name === nativeCase.name,
        )
        test.fail(!!difference, difference?.reason)
        const errors = pageErrors(page)
        await instantScrolling(page)
        await page.goto(`/dev/fixtures/${id}-native/?hold`)
        await expect(
          page.locator('[data-example="native/Opui"] form').first(),
        ).toBeVisible()
        await compareNative(page, nativeCase, {
          expect,
          hydrated: () =>
            expect(page.locator("html")).toHaveAttribute("data-hydrated", ""),
          release: () =>
            page.evaluate(() =>
              document.dispatchEvent(new Event("hydrate-native")),
            ),
          where: id,
        })
        expect(errors).toEqual([])
      })
    }
  })
}
