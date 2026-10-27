import { expect, test } from "@playwright/test"
import { openFixture } from "./fixtures"

type LogWindow = Window & { __add: (...parts: string[]) => void; __log: string[] }

const instrument = () => {
  const log: string[] = []
  const t0 = performance.now()
  const add = (...parts: string[]) =>
    log.push(`${(performance.now() - t0).toFixed(1)} ${parts.join(" ")}`)
  Object.assign(window, { __add: add, __log: log })
  const desc = (el: unknown) =>
    el instanceof Element
      ? `${el.tagName.toLowerCase()}${el.id ? `#${el.id}` : ""}${el instanceof HTMLInputElement ? `[${el.type}]` : ""}`
      : String(el)
  const state = () => {
    const input = document.querySelector<HTMLInputElement>(
      '[data-example="Value"] input[type="range"]',
    )
    const output = document.querySelector('[data-example="Value"] output')
    return input
      ? `value=${valueDesc.get!.call(input)} attr=${input.getAttribute("value")} out=${output?.textContent} aria=${input.getAttribute("aria-valuetext")} active=${desc(document.activeElement)}`
      : "no input"
  }
  for (const type of [
    "keydown",
    "keyup",
    "input",
    "change",
    "pointerdown",
    "mousedown",
    "mouseup",
    "click",
    "focusin",
    "focusout",
    "reset",
  ]) {
    document.addEventListener(
      type,
      (event) => {
        add("capture", type, desc(event.target), state())
        if (type === "reset") {
          queueMicrotask(() =>
            add("reset microtask", `prevented=${event.defaultPrevented}`, state()),
          )
          setTimeout(() =>
            add("reset timeout", `prevented=${event.defaultPrevented}`, state()),
          )
        }
      },
      true,
    )
  }
  const valueDesc = Object.getOwnPropertyDescriptor(
    HTMLInputElement.prototype,
    "value",
  )!
  Object.defineProperty(HTMLInputElement.prototype, "value", {
    configurable: true,
    enumerable: valueDesc.enumerable,
    get() {
      return valueDesc.get!.call(this)
    },
    set(value) {
      if (this.type === "range")
        add(
          "set .value",
          String(value),
          "was",
          valueDesc.get!.call(this),
          (new Error().stack ?? "").split("\n").slice(1, 5).join(" | "),
        )
      valueDesc.set!.call(this, value)
    },
  })
  const defaultDesc = Object.getOwnPropertyDescriptor(
    HTMLInputElement.prototype,
    "defaultValue",
  )!
  Object.defineProperty(HTMLInputElement.prototype, "defaultValue", {
    configurable: true,
    enumerable: defaultDesc.enumerable,
    get() {
      return defaultDesc.get!.call(this)
    },
    set(value) {
      if (this.type === "range") add("set .defaultValue", String(value))
      defaultDesc.set!.call(this, value)
    },
  })
  const addListener = EventTarget.prototype.addEventListener
  EventTarget.prototype.addEventListener = function (
    this: EventTarget,
    type: string,
    listener: EventListenerOrEventListenerObject | null,
    options?: boolean | AddEventListenerOptions,
  ) {
    if (type === "reset" && typeof listener === "function") {
      const target = this
      add("add reset listener on", desc(target))
      const wrapped = function (this: unknown, event: Event) {
        add("reset listener on", desc(target), `prevented=${event.defaultPrevented}`, state())
        return listener.call(this, event)
      }
      return addListener.call(this, type, wrapped, options)
    }
    return addListener.call(this, type, listener, options)
  }
  new MutationObserver((records) => {
    for (const record of records) {
      const target = record.target
      if (
        target instanceof Element
          ? target.closest('[data-example="Value"]')
          : target.parentElement?.closest('[data-example="Value"]')
      )
        add("mutation", record.type, record.attributeName ?? "", desc(target), state())
    }
  }).observe(document, {
    attributeFilter: ["value", "aria-valuetext"],
    characterData: true,
    subtree: true,
  })
}

for (const framework of ["react", "svelte", "vue"] as const) {
  test(`diag ${framework} range reset`, async ({ browserName, page }) => {
    await page.addInitScript(instrument)
    await openFixture(page, framework, "range")
    const root = page.locator('[data-example="Value"]')
    const slider = root.locator('input[type="range"]')
    const output = root.locator("output")
    const before = await slider.inputValue()
    const add = (text: string) =>
      page.evaluate((text) => (window as unknown as LogWindow).__add(text), text)
    await add("--- focus")
    await slider.focus()
    await add("--- press End")
    await page.keyboard.press("End")
    await expect(output).toHaveText("360°")
    await add("--- click Reset")
    await root.getByRole("button", { name: "Reset" }).click()
    await page.waitForTimeout(1500)
    const after = {
      aria: await slider.getAttribute("aria-valuetext"),
      output: await output.textContent(),
      value: await slider.inputValue(),
    }
    const ok =
      after.value === before &&
      after.output === `${before}°` &&
      after.aria === `${before}°`
    const log = await page.evaluate(() => (window as unknown as LogWindow).__log)
    console.log(
      `\n##### ${browserName} ${framework} range ok=${ok} ${JSON.stringify(after)}\n${log.join("\n")}`,
    )
  })
}

for (const path of ["/", "/html/guide/getting-started/"]) {
  test(`diag ${path} focus`, async ({ browserName, page }) => {
    test.skip(browserName !== "webkit" && !process.env.DIAG_ALL)
    test.setTimeout(120_000)
    await page.emulateMedia({ reducedMotion: "reduce" })
    await page.goto(path)
    const lines: string[] = []
    const seen = new Set<string>()
    for (let step = 0; step < 400; step++) {
      await page.keyboard.press("Tab")
      const now = await page.evaluate(async () => {
        const element = document.activeElement as HTMLElement | null
        if (!element || element === document.body) return null
        if (element.dataset.diagStop) return { id: element.dataset.diagStop }
        element.dataset.diagStop = String(Math.random())
        const label = `${element.tagName.toLowerCase()}${[...element.classList].map((name) => `.${name}`).join("")} "${(element.getAttribute("aria-label") ?? element.textContent ?? "").trim().slice(0, 30)}"`
        const outside = () => {
          const box = element.getBoundingClientRect()
          return box.bottom <= 0 ||
            box.top >= innerHeight ||
            box.right <= 0 ||
            box.left >= innerWidth
            ? `top=${box.top.toFixed(0)} left=${box.left.toFixed(0)} w=${box.width.toFixed(0)} h=${box.height.toFixed(0)}`
            : ""
        }
        const scrollers = () => {
          const parts = [`win ${scrollX.toFixed(0)},${scrollY.toFixed(0)} ${innerWidth}x${innerHeight}`]
          for (
            let node = element.parentElement;
            node;
            node = node.parentElement
          ) {
            const style = getComputedStyle(node)
            if (
              /auto|scroll|hidden|clip/.test(style.overflowX + style.overflowY) ||
              /sticky|fixed/.test(style.position)
            ) {
              const box = node.getBoundingClientRect()
              parts.push(
                `${node.tagName.toLowerCase()}.${[...node.classList].join(".")} pos=${style.position} ov=${style.overflowX}/${style.overflowY} sb=${style.scrollBehavior} scroll=${node.scrollLeft},${node.scrollTop} client=${node.clientWidth}x${node.clientHeight} box=${box.left.toFixed(0)},${box.top.toFixed(0)}`,
              )
            }
          }
          return parts.join(" ; ")
        }
        const first = outside()
        if (!first) return { id: element.dataset.diagStop, label }
        const firstScrollers = scrollers()
        await new Promise(requestAnimationFrame)
        await new Promise(requestAnimationFrame)
        const second = outside()
        await new Promise((resolve) => setTimeout(resolve, 500))
        const third = outside()
        return {
          id: element.dataset.diagStop,
          label,
          report: `OUTSIDE ${label}\n  now: ${first} | ${firstScrollers}\n  2raf: ${second || "inside"}\n  500ms: ${third || "inside"} | ${scrollers()}`,
        }
      })
      if (!now || seen.has(now.id)) break
      seen.add(now.id)
      if ("report" in now && now.report) lines.push(now.report)
    }
    console.log(
      `\n##### ${browserName} ${path} focus stops=${seen.size}\n${lines.join("\n") || "no problems"}`,
    )
  })
}

test("diag framework picker", async ({ browserName, page }) => {
  test.skip(browserName !== "webkit" && !process.env.DIAG_ALL)
  test.setTimeout(120_000)
  const lines: string[] = []
  await page.goto("/html/components/divider/#spacing")
  for (const framework of ["astro", "react", "svelte", "vue", "html"]) {
    const picker = page
      .locator(".framework-picker select")
      .filter({ visible: true })
      .first()
    const bound = await picker.getAttribute("data-bound")
    const ready = await page.evaluate(() => document.readyState)
    await picker.selectOption(framework)
    const navigated = await page
      .waitForURL(`/${framework}/components/divider/#spacing`, {
        timeout: 10_000,
        waitUntil: "commit",
      })
      .then(() => true)
      .catch(() => false)
    lines.push(
      `${framework}: bound-before-select=${bound} readyState=${ready} navigated=${navigated}`,
    )
    if (!navigated) {
      await page.goto(`/${framework}/components/divider/#spacing`)
    }
  }
  console.log(`\n##### ${browserName} picker\n${lines.join("\n")}`)
})
