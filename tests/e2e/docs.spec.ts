import { readdirSync } from "node:fs"
import { expect, test } from "@playwright/test"
import type { Locator, Page } from "@playwright/test"
import { FRAMEWORK_IDS } from "../../src/utils/framework"
import { FIREFOX_STICKY_ANCHOR_SCROLL, failsIn } from "./engine-bugs"
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
        waitUntil: "domcontentloaded",
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

  test("shows and changes the framework the links follow on a framework-free page", async ({
    page,
  }) => {
    await page.goto("/react/components/button/")
    await page.goto("/blocks/")
    await expect(visiblePicker(page)).toHaveValue("react")
    await expect(page.locator('a[href^="/react/components/"]')).not.toHaveCount(
      0,
    )
    await expect(visiblePicker(page)).toHaveAttribute("data-bound", "true")
    await visiblePicker(page).selectOption("vue")
    await expect(page.locator("html")).toHaveAttribute("data-framework", "vue")
    await expect(visiblePicker(page)).toHaveValue("vue")
    await expect(page.locator('a[href^="/react/components/"]')).toHaveCount(0)
    await expect(page.locator('a[href^="/vue/components/"]')).not.toHaveCount(0)
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

  test("links to the roadmap when no framework has a result", async ({
    page,
  }) => {
    await page.locator("[data-open-search]").filter({ visible: true }).click()
    await page.locator("#search-input").fill("skeleton")
    await expect(page.locator("#search-empty")).toHaveText(
      "No results in HTML. See what's planned",
    )
    await expect(page.locator("#search-empty a")).toHaveAttribute(
      "href",
      "https://github.com/felix-bohlin/ui/issues/441",
    )
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
  const panel = page.locator("#installation .code-files").first()
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

test("Tab from the Installation heading of an HTML page focuses a control that shows", async ({
  page,
}) => {
  await page.goto("/html/components/button/")
  const installation = page.locator("#installation")
  await expect(installation.locator("input[type='radio']")).toHaveCount(0)
  await installation.locator("h2 .header-anchor").focus()
  await page.keyboard.press("Tab")
  const focused = installation.locator(":focus-visible")
  await expect(focused).toHaveCSS("clip-path", "none")
  await expect
    .poll(() =>
      focused.evaluate((element) =>
        element.checkVisibility({
          opacityProperty: true,
          visibilityProperty: true,
        }),
      ),
    )
    .toBe(true)
})

const codeFocus = (page: Page) =>
  page.locator(".code-block pre").evaluateAll((blocks) =>
    blocks
      .filter((pre) => pre.checkVisibility())
      .map((pre) => ({
        focusable:
          pre.getAttribute("tabindex") === "0" &&
          pre.getAttribute("role") === "group" &&
          !!pre.getAttribute("aria-label"),
        scrolls: pre.scrollWidth > pre.clientWidth,
      })),
  )

test("a code block takes focus only while it scrolls sideways", async ({
  page,
}) => {
  await page.setViewportSize({ height: 844, width: 390 })
  await page.goto("/html/guide/customizing/")
  const scrolling = async () => {
    const blocks = await codeFocus(page)
    expect(
      blocks.filter(({ focusable, scrolls }) => focusable !== scrolls),
    ).toEqual([])
    return blocks.filter(({ scrolls }) => scrolls).length
  }
  await expect.poll(scrolling).toBeGreaterThan(1)
  await page.setViewportSize({ height: 844, width: 1280 })
  await expect.poll(scrolling).toBe(1)
})

test("an example's code takes focus when it opens and scrolls sideways", async ({
  page,
}) => {
  await page.setViewportSize({ height: 844, width: 390 })
  await page.goto("/html/components/button/")
  const example = page.locator("section#variants .example-container").first()
  await example
    .locator(".show-code-button")
    .evaluate((button) => (button as HTMLElement).click())
  const pre = example.locator(".code-block pre")
  await expect(pre).toBeVisible()
  await expect(pre).toHaveAttribute("tabindex", "0")
  await expect(pre).toHaveAttribute("role", "group")
  await expect(pre).toHaveAttribute("aria-label", "Code")
})

test("in print, code blocks wrap and the sidebar, contents and footer are hidden", async ({
  page,
}) => {
  await page.setViewportSize({ height: 794, width: 1123 })
  await page.goto("/html/components/typography/")
  await page.emulateMedia({ media: "print" })
  const overflowing = (selector: string) =>
    page
      .locator(selector)
      .evaluateAll(
        (elements) =>
          elements.filter(
            (element) =>
              element.checkVisibility() &&
              element.scrollWidth > element.clientWidth,
          ).length,
      )
  await expect.poll(() => overflowing("#main-content .code-block pre")).toBe(0)
  await expect
    .poll(() => overflowing("#main-content .example-preview pre"))
    .toBe(0)
  for (const selector of [
    "#document-page > .page-contents",
    "#document-page > .sidebar",
    ".component-footer",
    "[data-table-toggle]",
  ]) {
    await expect(page.locator(selector).first()).toBeHidden()
  }
})

test("the block preview's Tablet and Mobile widths give the block 768px and 390px", async ({
  page,
}) => {
  await page.goto("/blocks/data-table/")
  const iframe = page.locator("iframe[data-block-frame]")
  for (const [label, width] of [
    ["Tablet", 768],
    ["Mobile", 390],
  ] as const) {
    await page.locator(".block-toolbar label", { hasText: label }).click()
    await expect
      .poll(() => iframe.evaluate((element) => element.clientWidth))
      .toBe(width)
  }
})

for (const { block, trigger, width } of [
  {
    block: "account-settings",
    trigger:
      '[commandfor="account-settings-delete-dialog"][command="show-modal"]',
    width: 1280,
  },
  { block: "app-shell", trigger: '[command="show-modal"]', width: 390 },
]) {
  test(`a modal opened in the ${block} preview at ${width}px scrolls into view, or its top when it's taller than the window`, async ({
    page,
  }) => {
    await page.setViewportSize({ height: 800, width })
    await page.goto(`/blocks/${block}/`)
    await expect(page.locator("iframe[data-block-frame]")).toHaveAttribute(
      "style",
      /block-size/,
    )
    const frame = page.frameLocator("iframe[data-block-frame]")
    await frame.locator(trigger).filter({ visible: true }).first().click()
    const dialog = frame.locator("dialog:modal")
    await expect(dialog).toBeVisible()
    await expect
      .poll(async () => {
        const header = await page
          .locator(".site-header")
          .evaluate((element) => element.getBoundingClientRect().bottom)
        const box = (await dialog.boundingBox())!
        return box.height > 800 - header
          ? Math.abs(box.y - header) <= 1
          : box.y >= header && box.y + box.height <= 800
      })
      .toBe(true)
  })
}

test("a long section heading takes the content width, passes under the header links and sticks as a one-line copy without changing its height or the scroll position", async ({
  browserName,
  page,
}) => {
  failsIn(browserName, { firefox: FIREFOX_STICKY_ANCHOR_SCROLL })
  await page.setViewportSize({ height: 800, width: 1300 })
  await page.goto("/html/components/spinner/")
  await page.evaluate(() => document.fonts.ready)
  const heading = page.locator("#no-spinner > h2")
  const { copyMaxWidth, height, paragraphWidth, stick, width } =
    await heading.evaluate(async (element) => {
      const style = getComputedStyle(element)
      const stickAt = () =>
        element.getBoundingClientRect().top +
        scrollY -
        parseFloat(style.insetBlockStart)
      scrollTo(0, stickAt() - 100)
      await new Promise(requestAnimationFrame)
      await new Promise(requestAnimationFrame)
      return {
        copyMaxWidth: parseFloat(
          getComputedStyle(element, "::after").maxInlineSize,
        ),
        height: element.getBoundingClientRect().height,
        paragraphWidth:
          element.nextElementSibling?.getBoundingClientRect().width,
        stick: Math.ceil(stickAt()),
        width: element.getBoundingClientRect().width,
      }
    })
  expect(width).toBe(paragraphWidth)
  expect(width).toBeGreaterThan(copyMaxWidth)

  if (await page.evaluate(() => CSS.supports("anchor-name", "--a"))) {
    await page.evaluate(async (y) => {
      scrollTo(0, y)
      await new Promise(requestAnimationFrame)
      await new Promise(requestAnimationFrame)
    }, stick - 14)
    expect(
      await page
        .getByRole("navigation", { name: "Main navigation" })
        .getByRole("link", { name: "Guide" })
        .evaluate(
          (link, element) => {
            const box = link.getBoundingClientRect()
            const x = box.left + box.width / 2
            const y = box.top + box.height / 2
            const text = element!
              .querySelector(":scope > span")!
              .getBoundingClientRect()
            return {
              textCoversLink:
                x > text.left &&
                x < text.right &&
                y > text.top &&
                y < text.bottom,
              linkOnTop: link.contains(document.elementFromPoint(x, y)),
            }
          },
          await heading.elementHandle(),
        ),
    ).toEqual({ linkOnTop: true, textCoversLink: true })
    const { checks, edges } = await heading.evaluate((element, copyWidth) => {
      const box = (selector: string) =>
        document.querySelector(selector)!.getBoundingClientRect()
      const zIndex = (selector: string) =>
        Number(getComputedStyle(document.querySelector(selector)!).zIndex)
      const header = box("header .ui-content")
      const backdrop = box(".site-header-backdrop")
      const panel = box(".site-header-panel")
      const near = (a: number, b: number) => Math.abs(a - b) < 1
      return {
        checks: {
          backdropMeetsPanel: backdrop.right === panel.left,
          copyClearsPanel:
            element.getBoundingClientRect().left + copyWidth < panel.left,
          fillsHeader: [backdrop, panel].every(
            (part) =>
              near(part.top, header.top) && near(part.bottom, header.bottom),
          ),
          panelAboveHeading:
            zIndex(".site-header-panel") >
            Number(getComputedStyle(element).zIndex),
          panelBehindLinks: panel.left < box("header nav ul").left,
          panelReachesEnd: panel.right === header.right,
        },
        edges: JSON.stringify(
          Object.fromEntries(
            Object.entries({ backdrop, header, panel }).map(([name, part]) => [
              name,
              [part.top, part.right, part.bottom, part.left],
            ]),
          ),
        ),
      }
    }, copyMaxWidth)
    expect(checks, `top, right, bottom, left: ${edges}`).toEqual({
      backdropMeetsPanel: true,
      copyClearsPanel: true,
      fillsHeader: true,
      panelAboveHeading: true,
      panelBehindLinks: true,
      panelReachesEnd: true,
    })
  }

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
    await expect(heading.locator("> .header-anchor")).toHaveCSS("opacity", "0")
    expect(
      await heading.evaluate((element) => {
        const after = getComputedStyle(element, "::after")
        const box = element.getBoundingClientRect()
        const catches = (x: number, y: number) =>
          element.contains(document.elementFromPoint(x, y))
        return {
          catchesClicks: [
            catches(box.left + 10, box.bottom - 10),
            catches(box.right - 10, box.top + 10),
          ],
          opacity: after.opacity,
          whiteSpace: after.whiteSpace,
        }
      }),
    ).toEqual({
      catchesClicks: [false, false],
      opacity: "1",
      whiteSpace: "nowrap",
    })
  }
})

test("the API page filter keeps the components and rows that match", async ({
  page,
}) => {
  test.setTimeout(60_000)
  await page.goto("/html/api/")
  const input = page.locator(".api-filter input")
  const sections = page.locator(".api-section:visible")
  const total = await sections.count()
  await input.fill("closedby")
  await expect(page.locator(".api-filter-status")).toHaveText(
    `2 of ${total} components`,
  )
  await expect(sections.locator("h2")).toHaveText(["Dialog", "Drawer"])
  await expect(page.locator(".api-section tbody tr:visible")).toHaveCount(2)
  await expect(page).toHaveURL(/\?filter=closedby$/)
  await input.fill("no such prop")
  await expect(page.locator(".api-filter-empty")).toBeVisible()
  await page.goto("/html/api/?filter=closedby#dialog")
  await expect(sections).toHaveCount(2)
  await page
    .locator('.table-of-contents:not(.toc-drawer) a[href="#accordion"]')
    .click()
  await expect(input).toHaveValue("")
  await expect(sections).toHaveCount(total)
})

test("the API page lands on a section far down the page", async ({ page }) => {
  test.setTimeout(60_000)
  await page.goto("/html/api/#tooltip")
  await expect(page.locator("#tooltip h2")).toBeInViewport()
  for (const id of ["button", "menu", "tooltip"]) {
    await page
      .locator(`.table-of-contents:not(.toc-drawer) a[href="#${id}"]`)
      .click()
    await expect(page.locator(`#${id} h2`)).toBeInViewport()
  }
})

test("the blog feed lists every post", async ({ page }) => {
  const feed = await (await page.request.get("/blog/rss.xml")).text()
  await page.goto("/blog/")
  await expect(
    page.locator('link[rel="alternate"][type="application/rss+xml"]'),
  ).toHaveAttribute("href", "/blog/rss.xml")
  expect(feed.match(/<item>/g)?.length).toBeGreaterThan(20)
  expect(feed).toContain("<link>https://opui.dev/blog/release-6/</link>")
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
    if (path === "/html/api/") test.setTimeout(60_000)
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
    const outlined = ({
      outlineColor,
      outlineStyle,
      outlineWidth,
    }: CSSStyleDeclaration) =>
      outlineStyle !== "none" &&
      parseFloat(outlineWidth) > 0 &&
      !transparent.test(outlineColor)
    const scrollButtonOutlined = (node: Element) =>
      ["block-end", "block-start", "inline-end", "inline-start"].some(
        (direction) =>
          outlined(getComputedStyle(node, `::scroll-button(${direction})`)),
      )
    const ring = candidates.find((node) => {
      const style = getComputedStyle(node)
      return (
        (outlined(style) ||
          highlighted(style) ||
          (node === element && scrollButtonOutlined(node))) &&
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

test.describe(() => {
  test.use({ deviceScaleFactor: 1 })

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
})
