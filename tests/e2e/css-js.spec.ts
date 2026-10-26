import { readFileSync } from "node:fs"
import { expect, test } from "@playwright/test"

const helper = (file: string, init: string) => ({
  content: `${readFileSync(new URL(`../../packages/opui/css/js/${file}`, import.meta.url), "utf8")}\n${init}`,
  type: "module",
})

test("checkbox.js applies indeterminate to marked checkboxes", async ({
  page,
}) => {
  await page.setContent(`
    <input type="checkbox" id="mixed" data-indeterminate />
    <input type="checkbox" id="plain" />
  `)
  await page.addScriptTag(
    helper(
      "checkbox.js",
      "initCheckbox()\nwindow.syncIndeterminate = syncIndeterminate",
    ),
  )

  await expect(page.locator("#mixed")).toHaveJSProperty("indeterminate", true)
  await expect(page.locator("#plain")).toHaveJSProperty("indeterminate", false)

  await page.evaluate(() => {
    const input = document.createElement("input")
    input.type = "checkbox"
    input.id = "swapped"
    input.dataset.indeterminate = ""
    document.body.append(input)
    document.dispatchEvent(new Event("astro:after-swap"))
  })
  await expect(page.locator("#swapped")).toHaveJSProperty("indeterminate", true)

  await page.evaluate(() => {
    const input = document.querySelector<HTMLInputElement>("#mixed")!
    input.removeAttribute("data-indeterminate")
    window.syncIndeterminate(input)
  })
  await expect(page.locator("#mixed")).toHaveJSProperty("indeterminate", false)
})

test("range.js mirrors the value into the output and follows a reset", async ({
  page,
}) => {
  await page.setContent(`
    <form>
      <label class="ui-range">
        <span class="ui-label">Angle</span>
        <input type="range" min="0" max="10" value="3" />
        <output class="ui-value" data-live data-suffix="°"></output>
      </label>
      <label class="ui-range">
        <input type="range" min="0" max="10" value="5" />
        <output class="ui-value"></output>
      </label>
      <button type="reset">Reset</button>
    </form>
  `)
  await page.addScriptTag(helper("range.js", "initRange()"))

  const live = page.locator("output[data-live]")
  const slider = page.locator('input[type="range"]').first()

  await expect(live).toHaveText("3°")
  await expect(page.locator("output").nth(1)).toHaveText("")

  await slider.fill("7")
  await expect(live).toHaveText("7°")
  await expect(slider).toHaveAttribute("aria-valuetext", "7°")

  await page.getByRole("button", { name: "Reset" }).click()
  await expect(slider).toHaveValue("3")
  await expect(live).toHaveText("3°")
  await expect(slider).toHaveAttribute("aria-valuetext", "3°")
  await expect(page.locator('input[type="range"]').nth(1)).not.toHaveAttribute(
    "aria-valuetext",
  )
})

declare global {
  interface Window {
    syncIndeterminate: (input: HTMLInputElement) => void
  }
}
