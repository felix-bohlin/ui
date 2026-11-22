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
    const input = document.querySelector<HTMLInputElement>("#mixed")!
    input.removeAttribute("data-indeterminate")
    window.syncIndeterminate(input)
  })
  await expect(page.locator("#mixed")).toHaveJSProperty("indeterminate", false)
})

test("checkbox.js keeps indeterminate in sync with data-indeterminate once imported", async ({
  page,
}) => {
  await page.setContent(`
    <input type="checkbox" id="mixed" data-indeterminate />
    <input type="checkbox" id="plain" />
    <div id="list"></div>
  `)
  await page.addScriptTag(helper("checkbox.js", ""))

  await expect(page.locator("#mixed")).toHaveJSProperty("indeterminate", true)

  await page.evaluate(() => {
    document.querySelector("#mixed")!.removeAttribute("data-indeterminate")
    document.querySelector("#plain")!.setAttribute("data-indeterminate", "")
  })
  await expect(page.locator("#mixed")).toHaveJSProperty("indeterminate", false)
  await expect(page.locator("#plain")).toHaveJSProperty("indeterminate", true)

  await page.evaluate(() => {
    document.querySelector("#list")!.innerHTML =
      '<label><input type="checkbox" id="added" data-indeterminate /></label>'
    const input = document.createElement("input")
    input.type = "checkbox"
    input.id = "appended"
    input.dataset.indeterminate = ""
    document.body.append(input)
  })
  await expect(page.locator("#added")).toHaveJSProperty("indeterminate", true)
  await expect(page.locator("#appended")).toHaveJSProperty(
    "indeterminate",
    true,
  )

  await page.locator("#appended").click()
  await expect(page.locator("#appended")).toHaveJSProperty(
    "indeterminate",
    false,
  )
  await expect(page.locator("#appended")).toBeChecked()
})

declare global {
  interface Window {
    syncIndeterminate: (input: HTMLInputElement) => void
  }
}
