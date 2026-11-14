import { readFileSync } from "node:fs"
import { expect, test } from "@playwright/test"
import type { Page } from "@playwright/test"

const ORIGIN = "https://opui.test"

const source = (file: string) =>
  readFileSync(
    new URL(`../../packages/opui/elements/${file}`, import.meta.url),
    "utf8",
  )

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
  const script =
    order === "before"
      ? `<script>{${source(file).replaceAll(/^export /gm, "")}}</script>`
      : ""
  await page.route(`${ORIGIN}/**`, (route) =>
    route.fulfill(
      route.request().url().endsWith(".js")
        ? { body: source(file), contentType: "text/javascript" }
        : {
            body: `<!doctype html><html lang="en"><head><script>${TRACKER}</script>${script}</head><body>${markup}</body></html>`,
            contentType: "text/html",
          },
    ),
  )
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
    markup: `<opui-callout id="note" class="ui-callout" role="article">
      <div class="ui-content"><p>Backups run nightly.</p></div>
      <button class="ui-button" type="button" aria-label="Close" command="--dismiss" commandfor="note">x</button>
    </opui-callout>
    <button type="button">Next</button>`,
    ready: async (page) => {
      await expect(page.getByRole("article")).toBeVisible()
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
    markup: `<label class="ui-text-field">
      <span class="ui-label">Username</span>
      <span class="ui-field"><input maxlength="12" value="ab" type="text" /></span>
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
    file: "number-field.js",
    markup: `<opui-number-field class="ui-number-field">
      <label class="ui-label" for="quantity">Quantity</label>
      <span class="ui-field">
        <span class="ui-start"><button class="ui-button" type="button" aria-label="Decrease" command="--step-down" commandfor="quantity">-</button></span>
        <input max="3" min="1" value="1" id="quantity" type="number" />
        <span class="ui-end"><button class="ui-button" type="button" aria-label="Increase" command="--step-up" commandfor="quantity">+</button></span>
      </span>
    </opui-number-field>`,
    ready: async (page) => {
      await expect(
        page.getByRole("button", { name: "Decrease" }),
      ).toHaveAttribute("aria-disabled", "true")
      await expect(
        page.getByRole("button", { name: "Increase" }),
      ).not.toHaveAttribute("aria-disabled")
    },
    selector: "opui-number-field",
    title: "steps the value and marks a button at its limit",
    works: async (page) => {
      const input = page.getByRole("spinbutton", { name: "Quantity" })
      await page.getByRole("button", { name: "Increase" }).click()
      await expect(input).toHaveValue("2")
      await expect(
        page.getByRole("button", { name: "Decrease" }),
      ).not.toHaveAttribute("aria-disabled")
      await page.evaluate(() =>
        document.querySelector("opui-number-field")!.stepUp(),
      )
      await expect(input).toHaveValue("3")
      await expect(
        page.getByRole("button", { name: "Increase" }),
      ).toHaveAttribute("aria-disabled", "true")
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
    file: "text-field.js",
    markup: `<form>
      <opui-text-field class="ui-text-field">
        <label class="ui-label" for="password">Password</label>
        <span class="ui-field">
          <input id="password" type="password" value="hunter2" />
          <span class="ui-end"><button class="ui-button" type="button" aria-label="Show password" aria-pressed="false" command="--toggle-password" commandfor="password">o</button></span>
        </span>
      </opui-text-field>
      <button type="reset">Reset</button>
    </form>`,
    ready: async (page) => {
      await expect(
        page.getByRole("button", { name: "Show password" }),
      ).toHaveAttribute("aria-pressed", "false")
    },
    selector: "opui-text-field",
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
        document.querySelector("opui-text-field")!.showPassword(),
      )
      await expect(toggle).toHaveAttribute("aria-pressed", "true")
      await page.evaluate(() =>
        document.querySelector("opui-text-field")!.hidePassword(),
      )
      await expect(input).toHaveAttribute("type", "password")
      await input.evaluate((element: HTMLInputElement) => {
        element.disabled = true
      })
      await expect(toggle).toBeDisabled()
      await input.evaluate((element: HTMLInputElement) => {
        element.disabled = false
      })
      await expect(toggle).toBeEnabled()
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
