import { readFileSync } from "node:fs"
import { posix } from "node:path"
import { expect, test } from "@playwright/test"
import type { Page } from "@playwright/test"
import { FIREFOX_DOWNLOAD_NAVIGATE, failsIn } from "./engine-bugs"
import { instantScrolling } from "./fixtures"

const ORIGIN = "https://opui.test"

const source = (file: string) =>
  readFileSync(
    new URL(`../../packages/opui/elements/${file}`, import.meta.url),
    "utf8",
  )

const IMPORT = /^import \{([^}]*)\} from "(\.{1,2}\/[^"]+)"\n/gm

const classic = (file: string): string =>
  source(file)
    .replaceAll(IMPORT, (_, names: string, specifier: string) => {
      const list = names
        .split(",")
        .map((name) => name.trim())
        .filter(Boolean)
        .join(", ")
      return `const { ${list} } = (() => {\n${classic(posix.join(posix.dirname(file), specifier))}\nreturn { ${list} }\n})()\n`
    })
    .replaceAll(/^export /gm, "")

const served = (url: string) => source(new URL(url).pathname.slice(1))

const TRACKER = `{
  window.pendingTimers = new Map()
  const { clearInterval, clearTimeout, setInterval, setTimeout } = window
  window.setTimeout = (callback, delay, ...args) => {
    const id = setTimeout(() => {
      pendingTimers.delete(id)
      callback(...args)
    }, delay)
    pendingTimers.set(id, new Error().stack)
    return id
  }
  window.setInterval = (callback, delay, ...args) => {
    const id = setInterval(callback, delay, ...args)
    pendingTimers.set(id, new Error().stack)
    return id
  }
  window.clearTimeout = window.clearInterval = (id) => {
    pendingTimers.delete(id)
    clearTimeout(id)
    clearInterval(id)
  }
  window.globalListeners = new Set()
  const { addEventListener, removeEventListener } = EventTarget.prototype
  const captures = (options) =>
    typeof options === "boolean" ? options : Boolean(options?.capture)
  EventTarget.prototype.addEventListener = function (type, listener, options) {
    if (
      (this === document || this === window) &&
      !options?.signal?.aborted &&
      new Error().stack.includes(location.origin)
    ) {
      const entry = {
        capture: captures(options),
        listener,
        name: (this === document ? "document " : "window ") + type,
      }
      globalListeners.add(entry)
      options?.signal?.addEventListener("abort", () =>
        globalListeners.delete(entry),
      )
    }
    return addEventListener.call(this, type, listener, options)
  }
  EventTarget.prototype.removeEventListener = function (type, listener, options) {
    for (const entry of globalListeners) {
      const name = (this === document ? "document " : "window ") + type
      if (
        entry.name === name &&
        entry.listener === listener &&
        entry.capture === captures(options)
      ) {
        globalListeners.delete(entry)
      }
    }
    return removeEventListener.call(this, type, listener, options)
  }
}
//# sourceURL=tracker.js
`

declare global {
  interface Window {
    globalListeners: Set<{ name: string }>
    pendingTimers: Map<number, string>
    removed: { element: Element; parent: Element }
  }
}

type Order = "after" | "before"

const open = async (page: Page, file: string, markup: string, order: Order) => {
  const script = order === "before" ? `<script>{${classic(file)}}</script>` : ""
  await page.addInitScript(TRACKER)
  await page.route(`${ORIGIN}/**`, (route) =>
    route.fulfill(
      route.request().url().endsWith(".js")
        ? {
            body: served(route.request().url()),
            contentType: "text/javascript",
          }
        : {
            body: `<!doctype html><html lang="en"><head>${script}</head><body>${markup}</body></html>`,
            contentType: "text/html",
          },
    ),
  )
  await instantScrolling(page)
  await page.goto(`${ORIGIN}/`)
  if (order === "after") {
    await page.addScriptTag({ type: "module", url: `${ORIGIN}/${file}` })
  }
  const tag = /customElements\.define\("([\w-]+)"/.exec(source(file))?.[1]
  await page.waitForFunction((name) => customElements.get(name!), tag)
}

const remove = (page: Page, selector: string) =>
  page.evaluate((selector) => {
    const element = document.querySelector(selector)!
    window.removed = { element, parent: element.parentElement! }
    element.remove()
  }, selector)

const readd = (page: Page) =>
  page.evaluate(() => {
    const { element, parent } = window.removed
    parent.prepend(element)
  })

const expectCleanedUp = async (page: Page) => {
  await expect
    .poll(() => page.evaluate(() => [...window.pendingTimers.values()]), {
      message: "no timer of the removed element is still pending",
      timeout: 1000,
    })
    .toEqual([])
  expect(
    await page.evaluate(
      () => document.querySelectorAll(":popover-open").length,
    ),
    "no popover stays open once the element is removed",
  ).toBe(0)
  expect(
    await page.evaluate(() =>
      [...window.globalListeners].map((entry) => entry.name),
    ),
    "no listener on the document or the window outlives the element",
  ).toEqual([])
}

type Scenario = {
  busy?: (page: Page) => Promise<void>
  detached?: (page: Page) => Promise<void>
  file: string
  markup: string
  ready: (page: Page, round: number) => Promise<void>
  selector: string
  title: string
  works: (page: Page, round: number) => Promise<void>
}

const ELEMENTS: Scenario[] = [
  {
    file: "callout.js",
    markup: `<opui-callout id="note" class="ui-callout">
      <div class="ui-content"><p>Backups run nightly.</p></div>
      <button class="ui-button" type="button" aria-label="Close" command="--dismiss" commandfor="note">x</button>
    </opui-callout>
    <button type="button">Next</button>`,
    ready: async (page) => {
      await expect(page.locator("opui-callout")).toBeVisible()
    },
    selector: "opui-callout",
    title: "hides the callout with its close button",
    works: async (page) => {
      const kept = await page.evaluate(() => {
        const callout = document.querySelector("opui-callout")!
        callout.addEventListener("dismiss", (event) => event.preventDefault(), {
          once: true,
        })
        return [callout.dismiss(), callout.hidden]
      })
      expect(kept).toEqual([false, false])
      await page.getByRole("button", { name: "Close" }).click()
      await expect(page.getByRole("article")).toBeHidden()
      await expect(page.getByRole("button", { name: "Next" })).toBeFocused()
      await page.evaluate(() => {
        document.querySelector("opui-callout")!.hidden = false
      })
    },
  },
  {
    busy: async (page) => {
      await page.getByRole("textbox", { name: "Username" }).fill("abcdefg")
    },
    detached: async (page) => {
      await page.evaluate(() => {
        document.querySelector("input")!.value = "abcdefgh"
      })
    },
    file: "character-count.js",
    markup: `<label class="ui-field">
      <span class="ui-label">Username</span>
      <span class="ui-field-container"><input maxlength="12" value="ab" type="text" /></span>
      <span class="ui-end-text">
        <opui-character-count aria-hidden="true" class="ui-value" label="{count} left"></opui-character-count>
      </span>
    </label>`,
    ready: async (page, round) => {
      await expect(page.locator("opui-character-count")).toHaveText(
        round === 0 ? "2/12" : "8/12",
      )
      expect(
        await page.evaluate(
          () =>
            document.querySelector("opui-character-count")!.control?.localName,
        ),
      ).toBe("input")
    },
    selector: "opui-character-count",
    title: "counts the characters and announces the ones left",
    works: async (page, round) => {
      const text = round === 0 ? "abcdef" : "abcde"
      await page.getByRole("textbox", { name: "Username" }).fill(text)
      await expect(page.locator("opui-character-count")).toHaveText(
        `${text.length}/12`,
      )
      await expect(page.locator("[data-opui-announcer]")).toHaveText(
        `${12 - text.length} left`,
      )
      await page.evaluate(() => {
        document.querySelector("input")!.value = ""
      })
      await expect(page.locator("opui-character-count")).toHaveText("0/12")
    },
  },
  {
    busy: async (page) => {
      await page.getByRole("button", { name: "Copy" }).click()
      await expect(page.locator(".ui-floating")).toBeVisible()
    },
    file: "copy.js",
    markup: `<opui-copy id="invite" class="ui-copy" copied-label="Link copied">
      <input readonly value="https://example.com/invite" aria-label="Invite link" />
      <span class="ui-sr-only" role="status"></span>
      <span aria-hidden="true" class="ui-floating" popover></span>
    </opui-copy>
    <button type="button" command="--copy" commandfor="invite">Copy</button>`,
    ready: async (page) => {
      await expect(page.locator(".ui-floating")).toBeHidden()
      await expect(page.getByRole("status")).toHaveText("")
    },
    selector: "opui-copy",
    title: "copies the field's value and shows the label",
    works: async (page) => {
      await page.evaluate(() => {
        Object.defineProperty(navigator, "clipboard", {
          configurable: true,
          value: {
            writeText: async (text: string) => {
              Object.assign(window, { copied: text })
            },
          },
        })
      })
      await page.getByRole("button", { name: "Copy" }).click()
      await expect(page.getByRole("status")).toHaveText("Link copied")
      await expect(page.locator(".ui-floating")).toBeVisible()
      expect(
        await page.evaluate(() => [
          (window as unknown as { copied: string }).copied,
          document.querySelector("opui-copy")!.text,
        ]),
      ).toEqual(["https://example.com/invite", "https://example.com/invite"])
      await expect(page.locator(".ui-floating")).toBeHidden({ timeout: 4000 })
      await expect(page.getByRole("status")).toHaveText("")
    },
  },
  {
    file: "file-upload.js",
    markup: `<opui-file-upload class="ui-file-upload">
      <div class="ui-content">
        <div class="ui-field-container">
          <label class="ui-label">
            <input accept=".png" class="ui-sr-only" id="photos" multiple type="file" />
            <span class="ui-button">Choose photos</span>
          </label>
        </div>
        <ul class="ui-list">
          <li>
            <div class="ui-text"><p>kinga.png</p></div>
            <div class="ui-end"><button class="ui-button" type="button" aria-label="Remove kinga.png" command="--remove" commandfor="photos" value="kinga">x</button></div>
          </li>
        </ul>
      </div>
      <span class="ui-sr-only" role="status"></span>
    </opui-file-upload>`,
    ready: async (page) => {
      await expect(page.getByLabel("Choose photos")).toHaveValue("")
    },
    selector: "opui-file-upload",
    title: "fires select for the accepted files of a pick and remove for a row",
    works: async (page) => {
      const heard = (type: string) =>
        page.evaluate(
          (type) =>
            new Promise<string[]>((resolve) => {
              document.querySelector("opui-file-upload")!.addEventListener(
                type,
                (event) => {
                  const { files, value } = (
                    event as CustomEvent<{ files?: File[]; value?: string }>
                  ).detail
                  resolve(files?.map((file) => file.name) ?? [value ?? ""])
                },
                { once: true },
              )
            }),
          type,
        )
      const input = page.getByLabel("Choose photos")
      const selected = heard("select")
      await input.setInputFiles([
        { buffer: Buffer.from("text"), mimeType: "text/plain", name: "a.txt" },
        { buffer: Buffer.from("png"), mimeType: "image/png", name: "b.png" },
        { buffer: Buffer.from("png"), mimeType: "image/png", name: "c.png" },
      ])
      expect(await selected).toEqual(["b.png", "c.png"])
      await expect(input).toHaveValue("")
      const removed = heard("remove")
      await page.getByRole("button", { name: "Remove kinga.png" }).click()
      expect(await removed).toEqual(["kinga"])
    },
  },
  {
    busy: async (page) => {
      await page.getByRole("button", { name: "Decrease" }).hover()
      await page.mouse.down()
    },
    detached: async (page) => {
      await page.mouse.up()
      await page.evaluate(() => {
        window.removed.element.querySelector("input")!.value = "1"
      })
    },
    file: "step-button.js",
    markup: `<div class="ui-field">
      <label class="ui-label" for="quantity">Quantity</label>
      <span class="ui-field-container">
        <span class="ui-start"><opui-step-button><button class="ui-button" type="button" aria-label="Decrease" command="--step-down" commandfor="quantity">-</button></opui-step-button></span>
        <input max="3" min="1" value="1" id="quantity" type="number" />
        <span class="ui-end"><opui-step-button><button class="ui-button" type="button" aria-label="Increase" command="--step-up" commandfor="quantity">+</button></opui-step-button></span>
      </span>
    </div>`,
    ready: async (page) => {
      await expect(
        page.getByRole("button", { name: "Decrease" }),
      ).toHaveAttribute("aria-disabled", "true")
      await expect(
        page.getByRole("button", { name: "Increase" }),
      ).not.toHaveAttribute("aria-disabled")
    },
    selector: ".ui-field:has(opui-step-button)",
    title: "steps the value and marks a button at its limit",
    works: async (page) => {
      const input = page.getByRole("spinbutton", { name: "Quantity" })
      await page.getByRole("button", { name: "Increase" }).click()
      await expect(input).toHaveValue("2")
      await expect(
        page.getByRole("button", { name: "Decrease" }),
      ).not.toHaveAttribute("aria-disabled")
      await page.evaluate(() =>
        document.querySelectorAll("opui-step-button")[1]!.step(),
      )
      await expect(input).toHaveValue("3")
      await expect(
        page.getByRole("button", { name: "Increase" }),
      ).toHaveAttribute("aria-disabled", "true")
      const decrease = page.getByRole("button", { name: "Decrease" })
      await input.evaluate((element) => {
        element.setAttribute("aria-disabled", "true")
      })
      await expect(decrease).toHaveAttribute("aria-disabled", "true")
      await decrease.click({ force: true })
      await expect(input).toHaveValue("3")
      await input.evaluate((element) => {
        element.removeAttribute("aria-disabled")
      })
      await expect(decrease).not.toHaveAttribute("aria-disabled")
    },
  },
  {
    file: "password-toggle.js",
    markup: `<form><fieldset>
      <div class="ui-field">
        <label class="ui-label" for="password">Password</label>
        <span class="ui-field-container">
          <input id="password" type="password" value="hunter2" />
          <span class="ui-end"><opui-password-toggle><button class="ui-button" type="button" aria-label="Show password" aria-pressed="false" command="--toggle-password" commandfor="password">o</button></opui-password-toggle></span>
        </span>
      </div>
      </fieldset><button type="reset">Reset</button>
    </form>`,
    ready: async (page) => {
      await expect(
        page.getByRole("button", { name: "Show password" }),
      ).toHaveAttribute("aria-pressed", "false")
    },
    selector: "opui-password-toggle",
    title: "shows and hides the password",
    works: async (page) => {
      const toggle = page.getByRole("button", { name: "Show password" })
      const input = page.locator("#password")
      await toggle.click()
      await expect(input).toHaveAttribute("type", "text")
      await expect(toggle).toHaveAttribute("aria-pressed", "true")
      await page.getByRole("button", { name: "Reset" }).click()
      await expect(input).toHaveAttribute("type", "password")
      await expect(toggle).toHaveAttribute("aria-pressed", "false")
      await page.evaluate(() =>
        document.querySelector("opui-password-toggle")!.showPassword(),
      )
      await expect(toggle).toHaveAttribute("aria-pressed", "true")
      await page.evaluate(() =>
        document.querySelector("opui-password-toggle")!.hidePassword(),
      )
      await expect(input).toHaveAttribute("type", "password")
      await toggle.click()
      await expect(input).toHaveAttribute("type", "text")
      await input.evaluate((element: HTMLInputElement) => {
        element.disabled = true
      })
      await expect(toggle).toBeDisabled()
      await expect(input).toHaveAttribute("type", "password")
      await expect(toggle).toHaveAttribute("aria-pressed", "false")
      await input.evaluate((element: HTMLInputElement) => {
        element.disabled = false
      })
      await expect(toggle).toBeEnabled()
      await toggle.click()
      await expect(input).toHaveAttribute("type", "text")
      const fieldset = page.locator("fieldset")
      await fieldset.evaluate((element: HTMLFieldSetElement) => {
        element.disabled = true
      })
      await expect(input).toHaveAttribute("type", "password")
      await expect(toggle).toBeDisabled()
      await fieldset.evaluate((element: HTMLFieldSetElement) => {
        element.disabled = false
      })
      await expect(toggle).toBeEnabled()
      await input.evaluate((element) => {
        element.setAttribute("aria-disabled", "true")
      })
      await expect(toggle).toHaveAttribute("aria-disabled", "true")
      await toggle.click({ force: true })
      await expect(input).toHaveAttribute("type", "password")
      await input.evaluate((element) => {
        element.removeAttribute("aria-disabled")
      })
      await expect(toggle).not.toHaveAttribute("aria-disabled")
    },
  },
  {
    file: "reactions.js",
    markup: `<opui-reactions class="ui-reactions" quick-label="Thumbs up" quick-text="Up" quick-value="+1">
      <div class="ui-toggle-group" role="group" aria-label="Reactions">
        <label class="ui-toggle-button ui-suggested"><input type="checkbox" name="reaction" value="+1" aria-label="Thumbs up" /><span aria-hidden="true">Up</span></label>
      </div>
      <span class="ui-sr-only" role="status"></span>
    </opui-reactions>`,
    ready: async (page) => {
      await expect(page.getByRole("checkbox")).not.toBeChecked()
    },
    selector: "opui-reactions",
    title:
      "asks for a reaction, leaves the pill as it is and applies the reply",
    works: async (page) => {
      const pill = page.locator(".ui-toggle-button")
      const quick = page.getByRole("checkbox")
      await page.evaluate(() => {
        document.querySelector("opui-reactions")!.addEventListener(
          "reaction",
          (event) => {
            Object.assign(window, { asked: (event as CustomEvent).detail })
          },
          { once: true },
        )
      })
      await pill.click()
      await expect(quick).not.toBeChecked()
      await expect
        .poll(() =>
          page.evaluate(() => (window as unknown as { asked: unknown }).asked),
        )
        .toEqual({ checked: true, value: "+1" })
      await page.evaluate(() => {
        document.querySelector("opui-reactions")!.set("+1", {
          checked: true,
          label: "Thumbs up, 1",
          text: "Up 1",
        })
      })
      await expect(quick).toBeChecked()
      await expect(pill).toHaveText("Up 1")
      await expect(pill).not.toHaveClass(/ui-suggested/)
      await page.evaluate(() => {
        const element = document.querySelector("opui-reactions")!
        element.delete("+1")
        element.announce("Thumbs up removed")
      })
      await expect(quick).not.toBeChecked()
      await expect(quick).toHaveAccessibleName("Thumbs up")
      await expect(pill).toHaveText("Up")
      await expect(pill).toHaveClass(/ui-suggested/)
      await expect(page.getByRole("status")).toHaveText("Thumbs up removed")
      const applyAtOnce = () =>
        page.evaluate(() => {
          const element = document.querySelector("opui-reactions")!
          element.addEventListener(
            "reaction",
            (event) => {
              const { checked, value } = (event as CustomEvent).detail
              element.set(value, {
                checked,
                label: checked ? "Thumbs up, 1" : "Thumbs up",
                text: checked ? "Up 1" : "Up",
              })
            },
            { once: true },
          )
        })
      await applyAtOnce()
      await pill.click()
      await expect(quick).toBeChecked()
      await expect(pill).toHaveText("Up 1")
      await applyAtOnce()
      await pill.click()
      await expect(quick).not.toBeChecked()
      await expect(pill).toHaveText("Up")
    },
  },
  {
    detached: async (page) => {
      await page.evaluate(() => {
        for (const input of window.removed.element.querySelectorAll("input")) {
          if (!input.disabled) input.checked = true
        }
      })
    },
    file: "select-all.js",
    markup: `<opui-select-all class="ui-select-all">
      <label><input type="checkbox" data-select-all /> All</label>
      <label><input type="checkbox" checked /> Email</label>
      <label><input type="checkbox" /> Push</label>
      <label><input type="checkbox" disabled /> SMS</label>
    </opui-select-all>`,
    ready: async (page, round) => {
      const all = page.getByRole("checkbox", { name: "All" })
      await expect(all).toHaveJSProperty("indeterminate", round === 0)
      await expect(all).toHaveJSProperty("checked", round > 0)
    },
    selector: "opui-select-all",
    title: "checks the group from one checkbox and follows it",
    works: async (page) => {
      const all = page.getByRole("checkbox", { name: "All" })
      const push = page.getByRole("checkbox", { name: "Push" })
      await page.getByRole("checkbox", { name: "Email" }).check()
      await push.uncheck()
      await expect(all).toHaveJSProperty("indeterminate", true)
      await all.click()
      await expect(push).toBeChecked()
      await expect(all).toBeChecked()
      await expect(all).toHaveJSProperty("indeterminate", false)
      await expect(
        page.getByRole("checkbox", { name: "SMS" }),
      ).not.toBeChecked()
      await push.uncheck()
      await expect(all).toHaveJSProperty("indeterminate", true)
      expect(
        await page.evaluate(() =>
          document
            .querySelector("opui-select-all")!
            .items.map((item) => item.parentElement!.textContent!.trim()),
        ),
      ).toEqual(["Email", "Push"])
      await page.mouse.move(0, 0)
      const setAll = (checked: boolean) =>
        page.evaluate((checked) => {
          for (const input of document.querySelector("opui-select-all")!
            .items) {
            input.checked = checked
          }
        }, checked)
      await setAll(false)
      await expect(all).toHaveJSProperty("checked", false)
      await expect(all).toHaveJSProperty("indeterminate", false)
      await setAll(true)
      await expect(all).toHaveJSProperty("checked", true)
      await expect(all).toHaveJSProperty("indeterminate", false)
    },
  },
  {
    file: "sortable-table.js",
    markup: `<opui-sortable-table class="ui-sortable-table" ascending-label="{column} A to Z">
      <table>
        <thead><tr>
          <th data-sort><button type="button">Planet</button></th>
          <th data-sort><button type="button">Moons</button></th>
        </tr></thead>
        <tbody>
          <tr><td>Mars</td><td>2</td></tr>
          <tr><td>Earth</td><td>1</td></tr>
          <tr><td>Jupiter</td><td>95</td></tr>
        </tbody>
      </table>
      <span class="ui-sr-only" role="status"></span>
    </opui-sortable-table>`,
    ready: async (page, round) => {
      if (round > 0) return
      await expect(page.locator("th[aria-sort]")).toHaveCount(0)
    },
    selector: "opui-sortable-table",
    title: "sorts the rows by a header and announces it",
    works: async (page) => {
      const planets = page.locator("tbody td:first-child")
      await page.evaluate(() => {
        document.querySelector("opui-sortable-table")!.addEventListener(
          "sort",
          (event) => {
            const { column, direction } = (event as CustomEvent).detail
            Object.assign(window, { sorted: [column, direction] })
          },
          { once: true },
        )
      })
      await page.getByRole("button", { name: "Moons" }).click()
      await expect(planets).toHaveText(["Earth", "Mars", "Jupiter"])
      expect(
        await page.evaluate(
          () => (window as unknown as { sorted: unknown }).sorted,
        ),
      ).toEqual([1, "ascending"])
      await page.getByRole("button", { name: "Planet" }).click()
      await expect(planets).toHaveText(["Earth", "Jupiter", "Mars"])
      await expect(
        page.getByRole("columnheader", { name: "Planet" }),
      ).toHaveAttribute("aria-sort", "ascending")
      await expect(page.getByRole("status")).toHaveText("Planet A to Z")
      await page.evaluate(() => {
        const element = document.querySelector("opui-sortable-table")!
        element.sort(element.table!.tHead!.rows[0]!.cells[1]!, "descending")
      })
      await expect(planets).toHaveText(["Jupiter", "Mars", "Earth"])
    },
  },
  {
    busy: async (page) => {
      await page.getByRole("button", { name: "Save" }).click()
      await expect(page.getByRole("listitem")).toHaveCount(1)
    },
    file: "toaster.js",
    markup: `<button type="button" command="--toast" commandfor="toasts" data-toast="Changes saved">Save</button>
    <opui-toaster id="toasts" class="ui-toaster" duration="400">
      <ol popover="manual"></ol>
      <div class="ui-sr-only" role="status"></div>
      <div class="ui-sr-only" role="alert"></div>
    </opui-toaster>`,
    ready: async (page, round) => {
      const toasts = page.getByRole("listitem")
      if (round > 0) {
        await expect(toasts).toHaveCount(1)
        await expect(page.locator("ol")).toBeVisible()
      }
      await expect(toasts).toHaveCount(0)
      await expect(page.locator("ol")).toBeHidden()
    },
    selector: "opui-toaster",
    title: "shows a toast that stays while hovered and then goes",
    works: async (page) => {
      const toasts = page.getByRole("listitem")
      await page.getByRole("button", { name: "Save" }).click()
      await expect(toasts).toHaveText("Changes saved")
      await expect(page.getByRole("status")).toHaveText("Changes saved")
      await toasts.hover()
      await page.waitForTimeout(800)
      await expect(toasts).toHaveCount(1)
      await page.mouse.move(0, 0)
      await expect(toasts).toHaveCount(0)
      await expect(page.locator("ol")).toBeHidden()
    },
  },
]

for (const order of ["before", "after"] as const) {
  test.describe(`an element script loaded ${order} its markup`, () => {
    for (const element of ELEMENTS) {
      test(`${element.file} ${element.title}, cleans up once removed and works again once re-added`, async ({
        page,
      }) => {
        await open(page, element.file, element.markup, order)
        await element.ready(page, 0)
        await element.works(page, 0)
        await element.busy?.(page)
        await remove(page, element.selector)
        await expectCleanedUp(page)
        await element.detached?.(page)
        await readd(page)
        await element.ready(page, 1)
        await element.works(page, 1)
      })
    }
  })
}

const openWith = async (page: Page, markup: string) => {
  await page.route(`${ORIGIN}/**`, (route) => {
    const url = route.request().url()
    return route.fulfill(
      url.endsWith(".js")
        ? { body: served(url), contentType: "text/javascript" }
        : {
            body: `<!doctype html><html lang="en"><head></head><body>${markup}</body></html>`,
            contentType: "text/html",
          },
    )
  })
  await instantScrolling(page)
  await page.goto(`${ORIGIN}/`)
}

const load = async (page: Page, files: string[]) => {
  for (const file of files) {
    await page.addScriptTag({ type: "module", url: `${ORIGIN}/${file}` })
    const tag = /customElements\.define\("([\w-]+)"/.exec(source(file))?.[1]
    await page.waitForFunction((name) => customElements.get(name!), tag)
  }
}

test("password-toggle.js, step-button.js and character-count.js work on fields inside a shadow root", async ({
  page,
}) => {
  await openWith(page, `<div id="host"></div>`)
  await page.evaluate(() => {
    document
      .getElementById("host")!
      .attachShadow({ mode: "open" }).innerHTML = `<form>
        <div class="ui-field">
          <label class="ui-label" for="password">Password</label>
          <span class="ui-field-container">
            <input id="password" type="password" value="hunter2" />
            <span class="ui-end"><opui-password-toggle><button class="ui-button" type="button" aria-label="Show password" aria-pressed="false" command="--toggle-password" commandfor="password">o</button></opui-password-toggle></span>
          </span>
        </div>
        <div class="ui-field">
          <label class="ui-label" for="quantity">Quantity</label>
          <span class="ui-field-container">
            <input id="quantity" max="3" min="1" type="number" value="1" />
            <span class="ui-end"><opui-step-button><button class="ui-button" type="button" aria-label="Increase" command="--step-up" commandfor="quantity">+</button></opui-step-button></span>
          </span>
        </div>
        <div class="ui-field">
          <label class="ui-label" for="bio">Bio</label>
          <span class="ui-field-container"><textarea id="bio" maxlength="20"></textarea></span>
          <span class="ui-end-text"><opui-character-count></opui-character-count></span>
        </div>
        <button type="reset">Reset</button>
      </form>`
  })
  await load(page, [
    "character-count.js",
    "password-toggle.js",
    "step-button.js",
  ])

  const toggle = page.getByRole("button", { name: "Show password" })
  const password = page.locator("#password")
  await toggle.click()
  await expect(password).toHaveAttribute("type", "text")
  await expect(toggle).toHaveAttribute("aria-pressed", "true")
  await page.getByRole("button", { name: "Reset" }).click()
  await expect(password).toHaveAttribute("type", "password")

  const quantity = page.getByRole("spinbutton", { name: "Quantity" })
  const increase = page.getByRole("button", { name: "Increase" })
  await increase.click()
  await increase.click()
  await expect(quantity).toHaveValue("3")
  await expect(increase).toHaveAttribute("aria-disabled", "true")
  await page.getByRole("button", { name: "Reset" }).click()
  await expect(increase).not.toHaveAttribute("aria-disabled")

  await page.getByRole("textbox", { name: "Bio" }).fill("Bass")
  await expect(page.locator("opui-character-count")).toHaveText("4/20")
})

test("character-count.js follows a control the page renders after it, sets or replaces", async ({
  page,
}) => {
  await openWith(
    page,
    `<div class="ui-field">
      <label class="ui-label" for="bio">Bio</label>
      <span class="ui-field-container"></span>
      <span class="ui-end-text"><opui-character-count></opui-character-count></span>
    </div>`,
  )
  await load(page, ["character-count.js"])
  const count = page.locator("opui-character-count")
  await expect(count).toHaveText("")

  await page.evaluate(() => {
    const textarea = document.createElement("textarea")
    textarea.id = "bio"
    textarea.maxLength = 10
    document.querySelector(".ui-field-container")!.append(textarea)
  })
  await expect(count).toHaveText("0/10")
  await page.evaluate(() => {
    document.querySelector("textarea")!.value = "abc"
  })
  await expect(count).toHaveText("3/10")

  const restored = await page.evaluate(() => {
    const old = document.querySelector("textarea")!
    const next = document.createElement("textarea")
    next.id = "bio"
    next.maxLength = 10
    old.replaceWith(next)
    next.value = "abcd"
    return new Promise((resolve) =>
      queueMicrotask(() =>
        resolve(
          Object.getPrototypeOf(old) === HTMLTextAreaElement.prototype &&
            !Object.getOwnPropertyDescriptor(old, "value"),
        ),
      ),
    )
  })
  await expect(count).toHaveText("4/10")
  expect(restored, "the replaced control gets its own value back").toBe(true)
})

test("followControl finds a Field part's control through its button's commandfor, or else its field, and syncs the part on each change until it disconnects", async ({
  page,
}) => {
  await openWith(
    page,
    `<form>
      <div class="ui-field">
        <label class="ui-label" for="bio">Bio</label>
        <span class="ui-field-container"><textarea id="bio" maxlength="20"></textarea></span>
        <span class="ui-end-text"><span id="count"></span></span>
      </div>
      <div class="ui-field">
        <label class="ui-label" for="quantity">Quantity</label>
        <span class="ui-field-container">
          <input id="quantity" max="3" type="number" value="1" />
          <span class="ui-end"><span id="step"><button type="button" commandfor="bio">+</button></span></span>
        </span>
      </div>
    </form>`,
  )
  const result = await page.evaluate(async (url) => {
    const { followControl } = await import(url)
    const log: string[] = []
    const settle = () => new Promise((resolve) => setTimeout(resolve, 10))
    const count = followControl(document.getElementById("count"), {
      attributes: ["maxlength"],
      sync: () => log.push("count"),
      value: true,
    })
    const button = () => document.querySelector("#step button")
    const step = followControl(document.getElementById("step"), {
      attributes: ["max"],
      button,
      sync: () => log.push("step"),
    })
    const controls = () => [count.control?.id, step.control?.id ?? null]
    const found = [controls()]
    button()!.setAttribute("commandfor", "quantity")
    found.push(controls())
    count.connect()
    step.connect()
    await settle()
    const connected = log.splice(0)
    const bio = document.querySelector("textarea")!
    bio.value = "Bass"
    document.querySelector("input")!.max = "4"
    bio.maxLength = 30
    await settle()
    const changed = log.splice(0)
    document.querySelector("form")!.reset()
    await settle()
    const reset = log.splice(0)
    count.disconnect()
    step.disconnect()
    bio.value = "Drums"
    bio.maxLength = 40
    document.querySelector("form")!.reset()
    await settle()
    return { changed, connected, found, reset, stopped: log }
  }, `${ORIGIN}/internal/field-part.js`)
  expect(result).toEqual({
    changed: ["count", "count", "step"],
    connected: ["count", "step", "count", "step"],
    found: [
      ["bio", null],
      ["bio", "quantity"],
    ],
    reset: ["count"],
    stopped: [],
  })
})

test("step-button.js marks its limit when the page sets the value, sharing one value hook with character-count.js", async ({
  page,
}) => {
  await openWith(
    page,
    `<div class="ui-field">
      <label class="ui-label" for="quantity">Quantity</label>
      <span class="ui-field-container">
        <span class="ui-start"><opui-step-button><button class="ui-button" type="button" aria-label="Decrease" command="--step-down" commandfor="quantity">-</button></opui-step-button></span>
        <input id="quantity" max="3" min="1" type="number" value="3" />
        <span class="ui-end"><opui-step-button><button class="ui-button" type="button" aria-label="Increase" command="--step-up" commandfor="quantity">+</button></opui-step-button></span>
      </span>
      <span class="ui-end-text"><opui-character-count></opui-character-count></span>
    </div>`,
  )
  await load(page, ["character-count.js", "step-button.js"])
  const decrease = page.getByRole("button", { name: "Decrease" })
  const increase = page.getByRole("button", { name: "Increase" })
  await expect(increase).toHaveAttribute("aria-disabled", "true")
  await expect(decrease).not.toHaveAttribute("aria-disabled")

  await page.evaluate(() => {
    document.querySelector("input")!.value = "1"
  })
  await expect(increase).not.toHaveAttribute("aria-disabled")
  await expect(decrease).toHaveAttribute("aria-disabled", "true")

  const unwrapped = await page.evaluate(() => {
    const input = document.querySelector("input")!
    for (const element of document.querySelectorAll(
      "opui-step-button, opui-character-count",
    )) {
      element.remove()
    }
    return {
      ownValue: Boolean(Object.getOwnPropertyDescriptor(input, "value")),
      prototype:
        Object.getPrototypeOf(input) === HTMLInputElement.prototype
          ? "HTMLInputElement"
          : String(Object.getPrototypeOf(input)?.constructor?.name),
      watched: Object.getOwnPropertySymbols(input).includes(
        Symbol.for("opui-value-watch"),
      ),
    }
  })
  expect(unwrapped, "the input gets its own value back").toEqual({
    ownValue: false,
    prototype: "HTMLInputElement",
    watched: false,
  })
})

test("an element removes a global attribute set to null or undefined, as React and Svelte do when a prop goes away", async ({
  page,
}) => {
  await openWith(
    page,
    `<opui-step-button class="ui-sample" id="sample" lang="sv" tabindex="0" title="Sample"><button type="button">+</button></opui-step-button>`,
  )
  await load(page, ["step-button.js"])
  const attributes = await page.evaluate(() => {
    const element = document.querySelector("opui-step-button")!
    element.className = undefined as unknown as string
    element.id = null as unknown as string
    element.lang = undefined as unknown as string
    element.tabIndex = undefined as unknown as number
    element.title = null as unknown as string
    const removed = element.getAttributeNames()
    element.title = "Again"
    element.className = "ui-sample"
    return { removed, set: element.getAttributeNames().toSorted() }
  })
  expect(attributes).toEqual({ removed: [], set: ["class", "title"] })
})

const navigationDrawer = async (page: Page) => {
  await page.route(`${ORIGIN}/**`, (route) =>
    route.fulfill(
      route.request().url().endsWith(".js")
        ? {
            body: source("close-on-navigate.js"),
            contentType: "text/javascript",
          }
        : {
            body: `<!doctype html><html lang="en"><head>
              <script type="module" src="/close-on-navigate.js"></script>
              <script>
                document.addEventListener("click", (event) => {
                  const link = event.target.closest("a")
                  if (
                    !link ||
                    link.target ||
                    link.hasAttribute("download") ||
                    event.ctrlKey ||
                    event.metaKey ||
                    event.shiftKey
                  ) {
                    return
                  }
                  event.preventDefault()
                  history.pushState(null, "", link.href)
                })
              </script>
            </head><body>
              <dialog aria-label="Navigate" class="ui-drawer" data-close-on-navigate>
                <a href="/chat">Chat</a>
                <a data-keep-open href="/chat?pages=2">Load more</a>
                <a href="/help" target="_blank">Help</a>
                <a download="export.csv" href="data:text/csv,a%2Cb">Export</a>
              </dialog>
            </body></html>`,
            contentType: "text/html",
          },
    ),
  )
  await instantScrolling(page)
  await page.goto(`${ORIGIN}/chat?with=kinga`)
  const drawer = page.getByRole("dialog", { name: "Navigate" })
  const show = () =>
    page.evaluate(() => document.querySelector("dialog")!.showModal())
  await page.waitForFunction(
    () =>
      (document as unknown as Record<symbol, boolean>)[
        Symbol.for("opui-close-on-navigate")
      ],
  )
  return { drawer, show }
}

test("close-on-navigate.js closes a drawer on a click on a link in it, unless the link has data-keep-open or opens elsewhere", async ({
  page,
}) => {
  const { drawer, show } = await navigationDrawer(page)

  await show()
  const opened = page.context().waitForEvent("page")
  await drawer.getByRole("link", { name: "Help" }).click()
  await (await opened).close()
  await expect(drawer).toBeVisible()
  await drawer
    .getByRole("link", { name: "Chat" })
    .click({ modifiers: ["Shift"] })
  await expect(drawer).toBeVisible()
  await expect(page).toHaveURL(`${ORIGIN}/chat?with=kinga`)
  await drawer.getByRole("link", { name: "Load more" }).click()
  await expect(page).toHaveURL(`${ORIGIN}/chat?pages=2`)
  await expect(drawer).toBeVisible()
  await page.evaluate(() => history.replaceState(null, "", "?sort=new"))
  await expect(drawer).toBeVisible()
  await drawer.getByRole("link", { name: "Chat" }).click()
  await expect(page).toHaveURL(`${ORIGIN}/chat`)
  await expect(drawer).toBeHidden()

  await show()
  await page.evaluate(() => history.pushState(null, "", "/photos"))
  await expect(drawer).toBeHidden()
})

test("close-on-navigate.js keeps a drawer open on a click on a download link in it", async ({
  browserName,
  page,
}) => {
  failsIn(browserName, { firefox: FIREFOX_DOWNLOAD_NAVIGATE })
  const { drawer, show } = await navigationDrawer(page)
  await show()
  const downloaded = page.waitForEvent("download")
  await drawer.getByRole("link", { name: "Export" }).click()
  await (await downloaded).cancel()
  await expect(drawer).toBeVisible()
})
