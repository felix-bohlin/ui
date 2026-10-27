import { readdirSync } from "node:fs"
import { expect, test } from "@playwright/test"
import type { Locator, Page } from "@playwright/test"
import { FRAMEWORK_IDS } from "../../src/utils/framework"

const pages = (directory: string) =>
  readdirSync(new URL(`../../src/docs/${directory}/`, import.meta.url))
    .filter((file) => file.endsWith(".astro"))
    .map((file) => `/html/${directory}/${file.replace(/\.astro$/, "")}/`)

const DOCS_PAGES = [
  "/",
  "/blocks/",
  "/html/api/",
  "/html/components/",
  "/html/guide/getting-started/",
  "/learn/",
  "/theme-builder/",
  ...pages("components"),
  ...pages("guide"),
].toSorted()

const visiblePicker = (page: Page) =>
  page.locator(".framework-picker select").filter({ visible: true }).first()

const openSearch = async (page: Page, query: string) => {
  await page.locator("[data-open-search]").filter({ visible: true }).click()
  await expect(page.locator("#search-dialog")).toBeVisible()
  const input = page.locator("#search-input")
  await expect(input).toBeFocused()
  await input.fill(query)
  await expect(
    page.locator("#results-list [role=option]").first(),
  ).toBeVisible()
  return input
}

const selectedTitle = (input: Locator) =>
  input.evaluate((element) => {
    const id = element.getAttribute("aria-activedescendant")
    const option = id ? document.getElementById(id) : null
    return option?.getAttribute("aria-selected") === "true"
      ? option.querySelector(".ui-title")?.textContent
      : undefined
  })

type MotionWindow = Window & { motion?: string[] }

const recordMotion = (page: Page) =>
  page.evaluate(() => {
    const motion: string[] = []
    const record = (event: AnimationEvent | TransitionEvent) => {
      const target = event.target as Element
      const name =
        event instanceof TransitionEvent
          ? event.propertyName
          : event.animationName
      const animation = document.getAnimations().find((candidate) => {
        const effect = candidate.effect as KeyframeEffect | null
        return (
          effect?.target === target &&
          (effect.pseudoElement ?? "") === event.pseudoElement &&
          (candidate instanceof CSSTransition
            ? candidate.transitionProperty === name
            : candidate instanceof CSSAnimation &&
              candidate.animationName === name)
        )
      })
      const timing = animation?.effect?.getComputedTiming()
      if (
        target.closest(".example-preview") &&
        animation?.timeline instanceof DocumentTimeline &&
        timing?.endTime !== Infinity &&
        Number(timing?.activeDuration) > 0
      ) {
        motion.push(
          `${name} on ${target.tagName.toLowerCase()}${event.pseudoElement}${[
            ...target.classList,
          ]
            .map((className) => `.${className}`)
            .join("")}`,
        )
      }
    }
    addEventListener("animationstart", record, true)
    addEventListener("transitionrun", record, true)
    ;(window as MotionWindow).motion = motion
  })

const recordedMotion = (page: Page) =>
  page.evaluate(async () => {
    await new Promise(requestAnimationFrame)
    await new Promise(requestAnimationFrame)
    return (window as MotionWindow).motion
  })

test.describe("framework picker", () => {
  test("keeps the component page and the section", async ({ page }) => {
    test.setTimeout(60_000)
    await page.goto("/html/components/divider/#spacing")
    for (const framework of [...FRAMEWORK_IDS.slice(1), FRAMEWORK_IDS[0]]) {
      // waitForURL resolves at commit, before the picker script binds its change listener
      await expect(visiblePicker(page)).toHaveAttribute("data-bound", "true")
      await visiblePicker(page).selectOption(framework)
      await page.waitForURL(`/${framework}/components/divider/#spacing`, {
        waitUntil: "commit",
      })
      await expect(page.locator("html")).toHaveAttribute(
        "data-framework",
        framework,
      )
      await expect(visiblePicker(page)).toHaveValue(framework)
    }
  })

  test("keeps the guide page", async ({ page }) => {
    await page.goto("/html/guide/theming/")
    await visiblePicker(page).selectOption("vue")
    await page.waitForURL("/vue/guide/theming/", { waitUntil: "commit" })
  })
})

test.describe("search", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/html/guide/getting-started/")
  })

  test("finds components, guide pages and API props", async ({ page }) => {
    const input = await openSearch(page, "Dialog")
    const groups = page.locator("#results-list .command-group-heading")
    const titles = page.locator("#results-list .ui-title")

    await expect(groups).toContainText(["Component"])
    await expect(titles).toContainText(["Dialog"])
    await input.fill("theming")
    await expect(groups).toContainText(["Guide"])
    await expect(titles).toContainText(["Theming"])
    await input.fill("closedby")
    await expect(groups).toContainText(["API"])
    await expect(titles).toContainText(["Dialog API"])
  })

  test("moves with the arrow keys and opens a result with Enter", async ({
    page,
  }) => {
    const input = await openSearch(page, "Dialog")
    const titles = await page
      .locator("#results-list .ui-title")
      .allTextContents()
    const target = titles.indexOf("Dialog")
    expect(target).toBeGreaterThan(0)

    expect(await selectedTitle(input)).toBe(titles[0])
    for (let index = 1; index <= target; index++) {
      await input.press("ArrowDown")
      expect(await selectedTitle(input)).toBe(titles[index])
    }
    await input.press("ArrowUp")
    expect(await selectedTitle(input)).toBe(titles[target - 1])
    await input.press("ArrowDown")
    await input.press("Enter")
    await page.waitForURL(/\/html\/components\/dialog\/?$/)
    await expect(page.locator("h1")).toHaveText("Dialog")
  })

  test("closes with Esc", async ({ page }) => {
    await openSearch(page, "Dialog")
    await page.keyboard.press("Escape")
    await expect(page.locator("#search-dialog")).toBeHidden()
  })
})

for (const framework of FRAMEWORK_IDS) {
  test(`a copy button copies the ${framework} code it shows`, async ({
    page,
  }) => {
    await page.addInitScript(() => {
      navigator.clipboard.writeText = async (text) => {
        document.documentElement.dataset.copied = text
      }
    })
    await page.goto(`/${framework}/components/button/`)
    const example = page
      .locator("section", { has: page.locator("h2#variants") })
      .locator(".example-container")
      .first()
    await example.locator(".show-code-button").focus()
    await page.keyboard.press("Enter")
    const block = example.locator(".code-block").first()
    await expect(block).toBeVisible()
    const shown = (await block.locator("code").innerText()).trimEnd()

    await block.locator(".code-copy").click()
    await expect
      .poll(() =>
        page.evaluate(() => document.documentElement.dataset.copied?.trimEnd()),
      )
      .toBe(shown)
    if (framework === "html") expect(shown).not.toContain("import ")
    else expect(shown).toContain(`from "opui-css/${framework}"`)
  })
}

for (const path of DOCS_PAGES) {
  test(`${path} doesn't scroll sideways at 320px`, async ({ page }) => {
    await page.setViewportSize({ height: 640, width: 320 })
    await page.goto(path)
    await page.evaluate(() => document.fonts.ready)
    expect(
      await page.evaluate(
        () =>
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
      ),
    ).toBeLessThanOrEqual(0)
  })
}

for (const [component, trigger] of [
  ["accordion", "summary"],
  ["dialog", '[command="show-modal"]'],
  ["drawer", '[command="show-modal"]'],
  ["menu", '[command="toggle-popover"]'],
  ["tooltip", '[command="toggle-popover"]'],
]) {
  test(`the ${component} page examples don't animate with reduced motion`, async ({
    browserName,
    page,
  }) => {
    const open = async () => {
      await page.goto(`/html/components/${component}/`)
      await recordMotion(page)
      await page.locator(`.example-preview ${trigger}`).first().click()
      return recordedMotion(page)
    }

    if (browserName === "chromium") {
      expect(await open(), "animates without the preference").not.toEqual([])
    }
    await page.emulateMedia({ reducedMotion: "reduce" })
    expect(await open()).toEqual([])
  })
}

const tabStop = (page: Page) =>
  page.evaluate(async () => {
    let element = document.activeElement
    while (element?.shadowRoot?.activeElement)
      element = element.shadowRoot.activeElement
    if (!(element instanceof HTMLElement) || element === document.body)
      return null
    const { dataset } = document.documentElement
    if (element.dataset.tabStop) return { id: element.dataset.tabStop }
    dataset.tabStops = String(Number(dataset.tabStops ?? 0) + 1)
    element.dataset.tabStop = dataset.tabStops

    const parent = (node: Element) => {
      const root = node.getRootNode()
      return (
        node.parentElement ?? (root instanceof ShadowRoot ? root.host : null)
      )
    }
    const candidates: Element[] = []
    for (
      let node: Element | null = element;
      node && candidates.length < 4;
      node = parent(node)
    )
      candidates.push(node)
    await Promise.all(
      candidates
        .flatMap((node) => node.getAnimations())
        .filter(
          (animation) =>
            animation.timeline instanceof DocumentTimeline &&
            animation.effect?.getComputedTiming().endTime !== Infinity,
        )
        .map((animation) => animation.finished.catch(() => undefined)),
    )
    const label = `${element.tagName.toLowerCase()}${[...element.classList]
      .map((className) => `.${className}`)
      .join(
        "",
      )} "${(element.getAttribute("aria-label") ?? element.textContent ?? "").trim().slice(0, 40)}"`
    const visible = (node: Element) =>
      node.checkVisibility({ opacityProperty: true, visibilityProperty: true })
    const ring = candidates.find((node) => {
      const { outlineColor, outlineStyle, outlineWidth } =
        getComputedStyle(node)
      return (
        outlineStyle !== "none" &&
        parseFloat(outlineWidth) > 0 &&
        !/^transparent$|,\s*0\)$|\/\s*0\)$/.test(outlineColor) &&
        visible(node)
      )
    })
    const box = ring?.getBoundingClientRect()
    const problem =
      !ring || !box
        ? visible(element)
          ? "has no focus outline"
          : "is hidden"
        : !box.width || !box.height
          ? "has no size"
          : box.bottom <= 0 ||
              box.top >= innerHeight ||
              box.right <= 0 ||
              box.left >= innerWidth
            ? "is outside the viewport"
            : ""
    let debug = ""
    if (problem && box && ring) {
      const rect = (node: Element) => {
        const r = node.getBoundingClientRect()
        return `${r.left.toFixed(0)},${r.top.toFixed(0)} ${r.width.toFixed(0)}x${r.height.toFixed(0)}`
      }
      const first = `ring=${ring.tagName.toLowerCase()}.${[...ring.classList].join(".")} ringBox=${rect(ring)} element=${rect(element)} next=${element.nextElementSibling ? rect(element.nextElementSibling) : "none"} scrollY=${scrollY.toFixed(0)} innerHeight=${innerHeight} scrollHeight=${document.scrollingElement?.scrollHeight} parentBox=${element.parentElement ? rect(element.parentElement) : ""}`
      await new Promise(requestAnimationFrame)
      await new Promise(requestAnimationFrame)
      const second = `2raf ringBox=${rect(ring)} scrollY=${scrollY.toFixed(0)}`
      await new Promise((resolve) => setTimeout(resolve, 500))
      debug = `${first} | ${second} | 500ms ringBox=${rect(ring)} scrollY=${scrollY.toFixed(0)}`
    }
    return {
      debug,
      id: element.dataset.tabStop,
      problem: problem && `${label} ${problem}`,
    }
  })

for (const path of [
  "/",
  "/html/components/button/",
  "/html/guide/getting-started/",
]) {
  test(`${path} shows focus on every Tab stop`, async ({ page }) => {
    test.setTimeout(120_000)
    await page.emulateMedia({ reducedMotion: "reduce" })
    await page.goto(path)
    const problems: string[] = []
    const stops = new Set<string>()
    for (let step = 0; step < 1000; step++) {
      await page.keyboard.press("Tab")
      const stop = await tabStop(page)
      if (!stop || stops.has(stop.id)) break
      stops.add(stop.id)
      if (stop.problem) problems.push(stop.problem)
      if ("debug" in stop && stop.debug)
        console.log(`##### FOCUSDEBUG ${test.info().project.name} ${path} ${stop.problem}: ${stop.debug}`)
    }
    expect(stops.size, "Tab stops").toBeGreaterThan(10)
    expect(problems).toEqual([])
  })
}
