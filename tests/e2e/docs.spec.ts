import { readdirSync } from "node:fs"
import { expect, test } from "@playwright/test"
import type { Locator, Page } from "@playwright/test"
import { FRAMEWORK_IDS } from "../../src/utils/framework"
import {
  computed,
  instantScrolling,
  resolveColor,
  stubExternalHosts,
} from "./fixtures"

const pages = (directory: string, prefix = "/html") =>
  readdirSync(new URL(`../../src/docs/${directory}/`, import.meta.url))
    .filter((file) => file.endsWith(".astro") && file !== "index.astro")
    .map((file) => `${prefix}/${directory}/${file.replace(/\.astro$/, "")}/`)

const DOCS_PAGES = [
  "/blocks/",
  "/blog/",
  "/html/",
  "/html/api/",
  "/html/components/",
  "/html/guide/getting-started/",
  "/theme-builder/",
  ...pages("blog", ""),
  ...pages("components"),
  ...pages("guide"),
].toSorted()

test.beforeEach(async ({ page }) => {
  await instantScrolling(page)
  await stubExternalHosts(page)
})

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
    expect(titles[0]).toBe("Dialog")

    expect(await selectedTitle(input)).toBe(titles[0])
    await input.press("ArrowDown")
    expect(await selectedTitle(input)).toBe(titles[1])
    await input.press("ArrowDown")
    expect(await selectedTitle(input)).toBe(titles[2])
    await input.press("ArrowUp")
    await input.press("ArrowUp")
    expect(await selectedTitle(input)).toBe(titles[0])
    await input.press("Enter")
    await page.waitForURL(/\/html\/components\/dialog\/?$/)
    await expect(page.locator("h1")).toHaveText("Dialog")
  })

  test("links a section result to its heading", async ({ page }) => {
    await openSearch(page, "dialog close")
    const option = page.locator("#results-list [role=option]").first()
    await expect(option.locator(".ui-title")).toHaveText(
      "How to close a dialog",
    )
    await expect(option.locator(".ui-description")).toHaveText("Dialog")
    await expect(option).toHaveAttribute(
      "href",
      "/html/components/dialog/#how-to-close",
    )
    await expect(option.locator("mark").first()).toHaveText("close")
    await option.click()
    await page.waitForURL(/\/html\/components\/dialog\/#how-to-close$/)
    await expect(page.locator("#search-dialog")).toBeHidden()
  })

  test("jumps to a section on the page it's on without loading it again", async ({
    page,
  }) => {
    await page.goto("/html/components/dialog/")
    await page.evaluate(() => {
      document.documentElement.dataset.loaded = "once"
    })
    await openSearch(page, "dialog close")
    await page.locator("#results-list [role=option]").first().click()
    await page.waitForURL(/\/html\/components\/dialog\/#how-to-close$/)
    await expect(page.locator("#search-dialog")).toBeHidden()
    await expect(page.locator("html")).toHaveAttribute("data-loaded", "once")
  })

  test("matches any word in the selected category when none of its results has every word", async ({
    page,
  }) => {
    await openSearch(page, "switch form")
    await page.locator('.filter-chip[data-filter="Blocks"]').click()
    await expect(page.locator("#search-empty")).toBeHidden()
    await expect(
      page.locator("#results-list .command-group-heading"),
    ).toHaveText(["Blocks"])
    await expect(
      page.locator('.filter-chip[data-filter="Blocks"]'),
    ).toContainText(
      `(${await page.locator("#results-list [role=option]").count()})`,
    )
  })

  test("finds a component by a keyword its page lists", async ({ page }) => {
    await openSearch(page, "snackbar")
    await expect(
      page.locator("#results-list [role=option] .ui-title").first(),
    ).toHaveText("Toast")
  })

  test("moves the caret with the arrow keys and changes the category at either end", async ({
    page,
  }) => {
    const input = await openSearch(page, "Dialog")
    const pressed = page.locator(".filter-chip[aria-pressed=true]")
    await expect(pressed).toHaveAttribute("data-filter", "all")
    await input.press("ArrowLeft")
    expect(
      await input.evaluate((el: HTMLInputElement) => el.selectionStart),
    ).toBe(5)
    await expect(pressed).toHaveAttribute("data-filter", "all")
    await input.press("ArrowRight")
    await expect(pressed).toHaveAttribute("data-filter", "all")
    await input.press("ArrowRight")
    await expect(pressed).not.toHaveAttribute("data-filter", "all")
    await input.press("Home")
    await input.press("ArrowLeft")
    await expect(pressed).toHaveAttribute("data-filter", "all")
  })

  test("shows the first results of a group and the rest of it on Show all", async ({
    page,
  }) => {
    const input = await openSearch(page, "keyboard")
    const more = page.locator("#results-list .search-more").first()
    await expect(more).toContainText(/Show all \d+/)
    const total = Number((await more.textContent())?.match(/\d+/)?.[0])
    expect(total).toBeGreaterThan(6)
    await more.click()
    await expect(input).toBeFocused()
    await expect(
      page.locator(".filter-chip[aria-pressed=true]"),
    ).not.toHaveAttribute("data-filter", "all")
    await expect(page.locator("#results-list .search-more")).toHaveCount(0)
    await expect(page.locator("#results-list [role=option]")).toHaveCount(total)
  })

  test("shows results from other frameworks when the current one has none", async ({
    page,
  }) => {
    await openSearch(page, "itemsPerView")
    await expect(page.locator("#search-empty")).toHaveText(
      "No results in HTML.",
    )
    await expect(
      page.locator("#results-list .command-group-heading"),
    ).toHaveText(["Other frameworks"])
    const options = page.locator("#results-list [role=option]")
    await expect(options.first()).toHaveAttribute(
      "href",
      /^\/(astro|react|svelte|vue)\/api\/#carousel$/,
    )
    await expect(page.locator("#search-status")).toHaveText(
      `No results in HTML, ${await options.count()} in other frameworks`,
    )
  })

  test("shows and counts every result from the other frameworks", async ({
    page,
  }) => {
    await openSearch(page, "startText")
    const status = page.locator("#search-status")
    await expect(status).toHaveText(
      /^No results in HTML, \d+ in other frameworks$/,
    )
    const count = Number((await status.textContent())?.match(/\d+/)?.[0])
    expect(count).toBeGreaterThan(5)
    await expect(page.locator("#results-list [role=option]")).toHaveCount(count)
  })

  test("shows the results of the other frameworks that load", async ({
    page,
  }) => {
    await page.route("**/search-index/react.json", (route) => route.abort())
    await openSearch(page, "itemsPerView")
    await expect(page.locator("#search-status")).toHaveText(
      /^No results in HTML, \d+ in other frameworks$/,
    )
    await expect(page.locator("#results-list [role=option]")).not.toHaveCount(0)
    await expect(
      page.locator('#results-list [role=option][href^="/react/"]'),
    ).toHaveCount(0)
  })

  test("doesn't look in other frameworks for a category they share", async ({
    page,
  }) => {
    const indexes: string[] = []
    page.on("request", (request) => {
      const { pathname } = new URL(request.url())
      if (pathname.startsWith("/search-index/")) indexes.push(pathname)
    })
    await page.locator("[data-open-search]").filter({ visible: true }).click()
    await page.locator('.filter-chip[data-filter="Blog"]').click()
    await page.locator("#search-input").fill("itemsPerView")
    await expect(page.locator("#search-empty")).toHaveText("No results.")
    await expect(page.locator("#search-status")).toHaveText("No results")
    expect(indexes).toEqual(["/search-index/html.json"])
  })

  test("loads the index when a shortcut opens search", async ({ page }) => {
    const request = page.waitForRequest(/\/search-index\/html\.json$/)
    await page.keyboard.press("/")
    await expect(page.locator("#search-dialog")).toBeVisible()
    await request
  })

  test("shows recent searches without highlights", async ({ page }) => {
    await page.evaluate(() =>
      localStorage.setItem(
        "opui-recent-searches",
        JSON.stringify([
          {
            category: "Component",
            description: "A dialog.",
            id: "component-dialog-html",
            terms: ["dialog"],
            title: "Dialog",
            url: "/html/components/dialog",
          },
        ]),
      ),
    )
    await page.locator("[data-open-search]").filter({ visible: true }).click()
    await expect(page.locator("#recent-list .ui-title")).toHaveText(["Dialog"])
    await expect(page.locator("#recent-list mark")).toHaveCount(0)
  })

  test("keeps the selected result readable in forced colors mode", async ({
    page,
  }) => {
    await page.emulateMedia({ forcedColors: "active" })
    await openSearch(page, "dialog")
    const selected = page.locator(
      '#results-list [role=option][aria-selected="true"]',
    )
    for (const part of [
      selected.locator("mark").first(),
      selected.locator(".ui-description"),
    ]) {
      expect(await computed(part, "color")).toBe(
        await resolveColor(part, "SelectedItemText"),
      )
    }
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
    const example = page.locator("section#variants .example-container").first()
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

test("a diff code block copies without its removed lines", async ({ page }) => {
  await page.addInitScript(() => {
    navigator.clipboard.writeText = async (text) => {
      document.documentElement.dataset.copied = text
    }
  })
  await page.goto("/html/guide/migrating/")
  const block = page.locator(".code-block:has([data-diff='del'])").first()
  const kept = (
    await block.locator(".diff-line:not([data-diff='del'])").allTextContents()
  )
    .map((line) => line.replace(/\n$/, ""))
    .join("\n")
    .trim()

  await block.locator(".code-copy").click()
  await expect
    .poll(() => page.evaluate(() => document.documentElement.dataset.copied))
    .toBe(kept)
  await expect(block.locator(".ui-floating[popover]")).toHaveText("Copied")
})

test("highlights code with static ranges, also when it highlights again", async ({
  page,
}) => {
  await page.goto("/html/components/dialog/")
  const rangeTypes = () =>
    page.evaluate(() => [
      ...new Set(
        [...CSS.highlights.values()].flatMap((highlight) =>
          [...highlight].map((range) => range.constructor.name),
        ),
      ),
    ])
  const message =
    "highlight code with highlightCode() from src/utils/syntax-highlight.ts: WebKit recomputes every live Range in a highlight after any DOM change, which stalls pages with many code blocks"
  await expect.poll(rangeTypes, { message }).toEqual(["StaticRange"])
  const first = await page.evaluateHandle(
    () => [...CSS.highlights.values()][0].values().next().value,
  )
  await page.evaluate(() =>
    document.dispatchEvent(new Event("syntax-highlight")),
  )
  await expect
    .poll(() =>
      first.evaluate((range) =>
        [...CSS.highlights.values()].some(
          (highlight) => range && highlight.has(range),
        ),
      ),
    )
    .toBe(false)
  await expect.poll(rangeTypes, { message }).toEqual(["StaticRange"])
})

const rangesIn = (code: Locator) =>
  code.evaluateHandle((element) =>
    [...CSS.highlights.values()]
      .flatMap((highlight) => [...highlight])
      .filter((range) => range.startContainer === element.firstChild),
  )

const expectRenewedRanges = async (
  code: Locator,
  reveal: () => Promise<void>,
) => {
  await expect
    .poll(async () =>
      (await rangesIn(code)).evaluate((ranges) => ranges.length),
    )
    .toBeGreaterThan(0)
  const before = await rangesIn(code)
  await reveal()
  await expect(code).toBeVisible()
  await expect
    .poll(
      () =>
        before.evaluate((ranges) =>
          ranges.some((range) =>
            [...CSS.highlights.values()].some((highlight) =>
              highlight.has(range),
            ),
          ),
        ),
      {
        message:
          "renew the ranges with renewHighlights() from src/utils/syntax-highlight.ts when hidden code is shown: WebKit doesn't paint a highlight of static ranges on text that was inside a display: none element for a rendered frame after the ranges were added",
      },
    )
    .toBe(false)
  expect(
    await (await rangesIn(code)).evaluate((ranges) => ranges.length),
  ).toBeGreaterThan(0)
}

test("renews the highlight ranges of an Installation file when the file picker shows it", async ({
  page,
}) => {
  await page.goto("/html/components/checkbox/")
  const panel = page.locator("#installation .ui-panel").first()
  await expectRenewedRanges(
    panel.locator(".file").nth(1).locator("pre > code"),
    async () => {
      await panel.locator(".file-picker select").selectOption({ index: 1 })
    },
  )
})

test("renews the highlight ranges of an Installation tab when it is shown", async ({
  page,
}) => {
  await page.goto("/react/components/checkbox/")
  const installation = page.locator("#installation")
  const tabs = installation.locator(".code-tabs:has(.file)")
  const firstFileIn = (panel: number) =>
    tabs
      .locator(".ui-panel")
      .nth(panel)
      .locator(".file")
      .first()
      .locator("pre > code")
  await expectRenewedRanges(firstFileIn(0), async () => {
    await installation.locator(".ui-label", { hasText: "Manual" }).click()
  })
  await expectRenewedRanges(firstFileIn(1), async () => {
    await tabs.locator(".ui-label").nth(1).click()
  })
})

test("a section heading that wraps keeps its height and the scroll position when it sticks", async ({
  page,
}) => {
  await page.setViewportSize({ height: 800, width: 1300 })
  await page.goto("/html/components/spinner/")
  await page.evaluate(() => document.fonts.ready)
  const heading = page.locator("#no-spinner > h2")
  const { height, lineHeight, stick } = await heading.evaluate(
    async (element) => {
      const style = getComputedStyle(element)
      const stickAt = () =>
        element.getBoundingClientRect().top +
        scrollY -
        parseFloat(style.insetBlockStart)
      scrollTo(0, stickAt() - 100)
      await new Promise(requestAnimationFrame)
      await new Promise(requestAnimationFrame)
      return {
        height: element.getBoundingClientRect().height,
        lineHeight: parseFloat(style.lineHeight),
        stick: Math.ceil(stickAt()),
      }
    },
  )
  expect(height).toBeGreaterThan(lineHeight * 1.5)

  for (const offset of [2, 20, 60]) {
    const frames = await heading.evaluate(async (element, y) => {
      scrollTo(0, y)
      const samples = []
      for (let frame = 0; frame < 6; frame++) {
        await new Promise(requestAnimationFrame)
        samples.push({
          height: element.getBoundingClientRect().height,
          scroll: Math.round(scrollY),
        })
      }
      return samples
    }, stick + offset)
    expect(frames).toEqual(
      Array.from({ length: 6 }, () => ({ height, scroll: stick + offset })),
    )
  }

  if (
    await page.evaluate(() => CSS.supports("container-type", "scroll-state"))
  ) {
    await expect(heading.locator("> span")).toHaveCSS("opacity", "0")
    expect(
      await heading.evaluate((element) => {
        const after = getComputedStyle(element, "::after")
        const box = element.getBoundingClientRect()
        return {
          opacity: after.opacity,
          underneath: element.contains(
            document.elementFromPoint(box.left + 10, box.bottom - 10),
          ),
          whiteSpace: after.whiteSpace,
        }
      }),
    ).toEqual({
      opacity: "1",
      underneath: false,
      whiteSpace: "nowrap",
    })
  }
})

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

const uncappedBlocks = (page: Page) =>
  page.evaluate(() => {
    const main = document.querySelector("#main-content > .ui-rich-text")
    const blocks = (parent: Element): Element[] =>
      [...parent.children].flatMap((child) =>
        getComputedStyle(child).display === "contents" ||
        (parent === main && child.localName === "section")
          ? blocks(child)
          : [child],
      )
    return blocks(main!)
      .filter(
        (block) =>
          !block.matches(".is-wide") &&
          getComputedStyle(block).maxInlineSize === "none",
      )
      .map(
        (block) =>
          `${block.localName}: ${block.textContent?.trim().slice(0, 40)}`,
      )
  })

for (const path of DOCS_PAGES.filter(
  (path) => !["/html/", "/theme-builder/"].includes(path),
)) {
  test(`${path} keeps its blocks within the content width`, async ({
    page,
  }) => {
    await page.goto(path)
    await page
      .locator("#main-content > .ui-rich-text > section")
      .first()
      .evaluate((section) =>
        section.insertAdjacentHTML(
          "beforeend",
          '<div style="display: contents"><p>Sample</p></div>',
        ),
      )
    expect(
      await uncappedBlocks(page),
      "Every block in the page content, also inside a display: contents wrapper, keeps the content width unless it has .is-wide",
    ).toEqual(["p: Sample"])
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
    // WebKit scrolls the focused element into view on a later frame
    await new Promise(requestAnimationFrame)
    await new Promise(requestAnimationFrame)

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
    const transparent = /^transparent$|,\s*0\)$|\/\s*0\)$/
    const highlighted = (style: CSSStyleDeclaration) =>
      ["--ui-button-focus", "--ui-link-focus"].some(
        (name) => style.getPropertyValue(name).trim() === "highlight",
      ) && !transparent.test(style.backgroundColor)
    const ring = candidates.find((node) => {
      const style = getComputedStyle(node)
      const { outlineColor, outlineStyle, outlineWidth } = style
      return (
        ((outlineStyle !== "none" &&
          parseFloat(outlineWidth) > 0 &&
          !transparent.test(outlineColor)) ||
          highlighted(style)) &&
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
    return {
      id: element.dataset.tabStop,
      problem: problem && `${label} ${problem}`,
    }
  })

for (const path of [
  "/html/",
  "/html/components/button/",
  "/html/guide/getting-started/",
]) {
  test(`${path} shows focus on every Tab stop`, async ({ page }) => {
    test.setTimeout(180_000)
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
    }
    expect(stops.size, "Tab stops").toBeGreaterThan(10)
    expect(problems).toEqual([])
  })
}
