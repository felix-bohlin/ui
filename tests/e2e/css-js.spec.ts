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
  await page.addScriptTag(helper("range.js", ""))

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

test("range.js writes through the readout node a framework renders and keeps its anchors", async ({
  page,
}) => {
  await page.setContent(`
    <label class="ui-range">
      <input type="range" min="0" max="10" value="3" />
      <output class="ui-value" data-live data-suffix="°"><!--[-->3°<!--]--></output>
    </label>
    <label class="ui-range">
      <input type="range" min="0" max="10" value="5" />
      <output class="ui-value" data-live></output>
    </label>
  `)
  await page.evaluate(() => {
    const [server, client] = document.querySelectorAll("output")
    client!.append("", "5", "")
    Object.assign(window, {
      readouts: [server!.childNodes[1], client!.childNodes[1]],
    })
  })
  await page.addScriptTag(helper("range.js", ""))

  const outputs = page.locator("output")
  const sliders = page.locator('input[type="range"]')
  await expect(outputs.first()).toHaveJSProperty(
    "innerHTML",
    "<!--[-->3°<!--]-->",
  )

  await sliders.first().fill("7")
  await sliders.nth(1).fill("8")
  await expect(outputs.first()).toHaveJSProperty(
    "innerHTML",
    "<!--[-->7°<!--]-->",
  )
  await expect(outputs.nth(1)).toHaveText("8")
  expect(
    await page.evaluate(() => {
      const { readouts } = window as unknown as { readouts: Text[] }
      const [server, client] = document.querySelectorAll("output")
      return [
        server!.childNodes[1] === readouts[0],
        client!.childNodes.length,
        client!.childNodes[1] === readouts[1],
        readouts.map((node) => node.data),
      ]
    }),
  ).toEqual([true, 3, true, ["7°", "8"]])
})

test("range.js follows a range added after it loads", async ({ page }) => {
  await page.setContent("<main></main>")
  await page.addScriptTag(helper("range.js", ""))

  await page.evaluate(() => {
    document.querySelector("main")!.innerHTML = `
      <label class="ui-range">
        <input type="range" min="0" max="10" value="2" />
        <output class="ui-value" data-live data-suffix="%">2%</output>
      </label>`
  })

  const slider = page.locator('input[type="range"]')
  await slider.fill("9")
  await expect(page.locator("output")).toHaveText("9%")
  await expect(slider).toHaveAttribute("aria-valuetext", "9%")
})

test("range.js names a range added after it loads by the label of its tick", async ({
  page,
}) => {
  await page.setContent("<main></main>")
  await page.addScriptTag(helper("range.js", ""))

  await page.evaluate(() => {
    document.querySelector("main")!.innerHTML = `
      <label class="ui-range">
        <input type="range" list="ticks" max="2" value="1" />
        <datalist id="ticks">
          <option value="0" label="Low"></option>
          <option value="1" label="Medium"></option>
          <option value="2" label="High"></option>
        </datalist>
      </label>`
  })

  await expect(page.locator('input[type="range"]')).toHaveAttribute(
    "aria-valuetext",
    "Medium",
  )
})

declare global {
  interface Window {
    syncIndeterminate: (input: HTMLInputElement) => void
  }
}
