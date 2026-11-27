import { expect, test } from "@playwright/test"
import { casesOf, compareNative, NATIVE_CASES } from "../apps/native/cases"
import { FRAMEWORKS, isHydratedFramework } from "../../src/utils/framework"
import { failsWhere } from "../expectations"
import { instantScrolling, pageErrors } from "./fixtures"

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
        failsWhere({ aspect: nativeCase.name, check: "native", framework: id })
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
