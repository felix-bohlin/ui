import { existsSync, readdirSync } from "node:fs"
import type AxeBuilder from "@axe-core/playwright"
import {
  expect,
  test,
  type Locator,
  type Page,
  type Request,
} from "@playwright/test"
import {
  exampleExtension,
  FRAMEWORK_IDS,
  type FrameworkId,
} from "../../src/utils/framework"

const examplesDir = new URL("../../src/component-examples/", import.meta.url)

const carouselWithScrollButtonsOrMarkers = (html: string) => {
  const classes = html.match(/^<[^>]*\bclass="([^"]*)"/)?.[1].split(/\s+/) ?? []
  return (
    classes.includes("ui-carousel") &&
    (!classes.includes("ui-buttons-none") || classes.includes("ui-markers"))
  )
}

export const axeNodes = (
  violations: Awaited<ReturnType<AxeBuilder["analyze"]>>["violations"],
) =>
  violations.flatMap((violation) =>
    violation.nodes
      .filter(
        (node) =>
          violation.id !== "scrollable-region-focusable" ||
          !carouselWithScrollButtonsOrMarkers(node.html),
      )
      .map((node) => ({
        help: violation.help,
        id: violation.id,
        target: node.target.join(" "),
      })),
  )

const PIXEL = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
  "base64",
)

export const FRAMEWORKS = FRAMEWORK_IDS

export type Framework = FrameworkId

export const COMPONENTS = readdirSync(examplesDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .toSorted()

export const STRESS_TESTS = readdirSync(
  new URL("../../src/stress-tests/", import.meta.url),
)
  .filter((file) => file.endsWith(".html"))
  .map((file) => `stress/${file.replace(/\.html$/, "")}`)
  .toSorted()

export const BLOCKS = readdirSync(new URL("../../src/blocks/", import.meta.url))
  .filter((file) => file.endsWith(".html"))
  .map((file) => `blocks/${file.replace(/\.html$/, "")}`)
  .toSorted()

export const FIXTURES = [...COMPONENTS, ...STRESS_TESTS].toSorted()

export const THEMES = [
  "default",
  ...readdirSync(new URL("../../packages/opui/themes/", import.meta.url))
    .filter((file) => file.endsWith(".css"))
    .map((file) => file.replace(/\.css$/, ""))
    .toSorted(),
]

export const hasExample = (
  framework: Framework,
  component: string,
  name: string,
) =>
  existsSync(
    new URL(`${component}/${name}.${exampleExtension(framework)}`, examplesDir),
  )

export const instantScrolling = (page: Page) =>
  page.addInitScript(() => {
    document.addEventListener("DOMContentLoaded", () => {
      document.documentElement.style.scrollBehavior = "auto"
    })
  })

export const stubExternalHosts = (page: Page) =>
  page.route(
    (url) =>
      url.hostname !== "localhost" || url.pathname.startsWith("/photos/"),
    (route) =>
      route.request().resourceType() === "image"
        ? route.fulfill({ body: PIXEL, contentType: "image/png" })
        : route.abort(),
  )

export const openFixture = async (
  page: Page,
  framework: Framework,
  component: string,
  search = "",
) => {
  await instantScrolling(page)
  const inflight = new Set<Request>()
  page.on("request", (request) => inflight.add(request))
  page.on("requestfailed", (request) => inflight.delete(request))
  page.on("requestfinished", (request) => inflight.delete(request))
  await stubExternalHosts(page)
  await page.goto(
    (component.startsWith("blocks/")
      ? `/${component}/preview/`
      : component.startsWith("stress/")
        ? `/dev/tests/${component.slice("stress/".length)}/`
        : `/${framework}/test/${component}/`) + search,
  )
  if (!component.startsWith("blocks/")) {
    await expect(
      page.locator("[data-example]").first(),
      `${framework}/${component} renders no examples`,
    ).toBeAttached()
  }
  if (framework !== "astro" && framework !== "html") {
    await page.waitForFunction(
      (name) =>
        [...document.querySelectorAll(`[data-${name}-example]`)].every((el) =>
          el.hasAttribute(`data-${name}-mounted`),
        ),
      framework,
    )
  }
  const fonts = await page.evaluate(() =>
    Promise.race([
      document.fonts.ready.then(() => document.fonts.status),
      new Promise<string>((resolve) =>
        setTimeout(
          () => resolve(`${document.fonts.status}, ${document.readyState}`),
          5_000,
        ),
      ),
    ]),
  )
  if (fonts !== "loaded") {
    test
      .info()
      .annotations.push({ description: fonts, type: "fonts not settled" })
  }
  await page.evaluate(() =>
    Promise.all(
      [...document.images].map((image) => {
        image.loading = "eager"
        return image.complete
          ? undefined
          : new Promise<void>((resolve) => {
              image.addEventListener("load", () => resolve(), { once: true })
              image.addEventListener("error", () => resolve(), { once: true })
            })
      }),
    ),
  )
  for (let quiet = 0; quiet < 5; quiet = inflight.size ? 0 : quiet + 1) {
    await page.waitForTimeout(100)
  }
  await page.evaluate(async () => {
    const { style } = document.body
    style.display = "none"
    void document.body.offsetHeight
    style.display = ""
    await new Promise(requestAnimationFrame)
  })
}

export const pageErrors = (page: Page) => {
  const errors: string[] = []
  page.on("pageerror", (error) => errors.push(error.message))
  page.on("console", (message) => {
    if (
      message.type() === "error" &&
      new URL(message.location().url || "http://localhost").hostname ===
        "localhost"
    ) {
      errors.push(message.text())
    }
  })
  return errors
}

export const HYDRATED: readonly Framework[] = ["solid"]

export const exampleSnapshots = (
  page: Page,
  framework: Framework,
  html?: string,
) =>
  page.evaluate(
    async ([name, source]) => {
      const container = source ? document.createElement("form") : undefined
      if (container) {
        const parsed = new DOMParser().parseFromString(source, "text/html")
        for (const script of parsed.querySelectorAll("script")) script.remove()
        container.hidden = true
        container.append(...document.adoptNode(parsed.body).childNodes)
        document.body.append(container)
      }
      await new Promise((resolve) => setTimeout(resolve))
      const root = container ?? document
      const examples = [...root.querySelectorAll(`[data-${name}-example]`)].map(
        (example) => {
          const state = [
            ...example.querySelectorAll<HTMLElement>(
              "input, select, textarea, video",
            ),
          ].map((control) => {
            if (control instanceof HTMLVideoElement) {
              return `video muted ${control.muted}`
            }
            if (control instanceof HTMLSelectElement) {
              return `select ${[...control.selectedOptions].map((option) => option.value).join(",")}`
            }
            if (control instanceof HTMLTextAreaElement) {
              return `textarea ${control.value}`
            }
            const input = control as HTMLInputElement
            return `input ${input.type} ${
              ["checkbox", "radio"].includes(input.type)
                ? input.checked
                : input.value
            }`
          })

          const clone = example.cloneNode(true) as HTMLElement
          for (const element of clone.querySelectorAll('link[rel="preload"]')) {
            element.remove()
          }
          for (const element of clone.querySelectorAll("img")) {
            element.removeAttribute("loading")
          }
          for (const element of clone.querySelectorAll("svg")) {
            element.removeAttribute("xmlns")
          }
          for (const element of clone.querySelectorAll("[_hk]")) {
            element.removeAttribute("_hk")
          }
          for (const element of clone.querySelectorAll("video")) {
            element.removeAttribute("muted")
          }
          for (const element of clone.querySelectorAll("input, option")) {
            element.removeAttribute("checked")
            element.removeAttribute("selected")
            if (
              element instanceof HTMLInputElement &&
              !["checkbox", "radio"].includes(element.type)
            ) {
              element.removeAttribute("value")
            }
          }
          for (const element of clone.querySelectorAll(
            "selectedcontent, textarea",
          )) {
            element.replaceChildren()
          }
          const names = new Map<string, string>()
          for (const element of clone.querySelectorAll("[name]")) {
            const value = element.getAttribute("name")!
            if (!names.has(value)) names.set(value, `name-${names.size + 1}`)
            element.setAttribute("name", names.get(value)!)
          }

          const hydrating = clone.querySelectorAll("[data-hydrating]").length
          for (const element of clone.querySelectorAll("[data-hydrating]")) {
            element.removeAttribute("data-hydrating")
          }

          return {
            example: example.getAttribute(`data-${name}-example`)!,
            hydrating,
            markup: clone.innerHTML,
            state,
          }
        },
      )
      container?.remove()
      return examples
    },
    [framework, html ?? ""] as const,
  )

export const supports = async (
  page: Page,
  feature: string,
  supported: () => boolean,
) => {
  const has = await page.evaluate(supported)
  if (page.context().browser()?.browserType().name() === "chromium") {
    expect(has, `Chromium has ${feature}`).toBe(true)
  }
  return has
}

export const needs = async (
  page: Page,
  feature: string,
  supported: () => boolean,
) => {
  test.skip(!(await supports(page, feature, supported)), `needs ${feature}`)
}

export const settle = (locator: Locator) =>
  locator.evaluate((element) =>
    Promise.all(
      element
        .getAnimations({ subtree: true })
        .filter(
          (animation) =>
            animation.timeline instanceof DocumentTimeline &&
            animation.effect?.getComputedTiming().endTime !== Infinity,
        )
        .map((animation) => animation.finished.catch(() => undefined)),
    ).then(() => undefined),
  )

export const computed = (locator: Locator, property: string, pseudo?: string) =>
  locator.evaluate(
    (element, [name, pseudoElement]) =>
      getComputedStyle(element, pseudoElement).getPropertyValue(name).trim(),
    [property, pseudo ?? null] as const,
  )

export const resolveColor = (
  locator: Locator,
  color: string,
  colorScheme?: string,
) =>
  locator.evaluate(
    (element, [value, scheme]) => {
      const probe = document.createElement("div")
      if (scheme) probe.style.colorScheme = scheme
      probe.style.color = value
      const host = element.matches("input, select, textarea")
        ? element.parentElement!
        : element
      host.append(probe)
      const resolved = getComputedStyle(probe).color
      probe.remove()
      return resolved
    },
    [color, colorScheme ?? null] as const,
  )

export const layerContrast = async (
  locator: Locator,
  top: string[],
  bottom: string[],
) => {
  const resolve = (layers: string[]) =>
    Promise.all(layers.map((layer) => resolveColor(locator, layer)))
  const colors = await Promise.all([
    resolveColor(locator, "var(--ui-surface)"),
    resolve(top),
    resolve(bottom),
  ])
  return locator.page().evaluate(([page, upper, lower]) => {
    const canvas = document.createElement("canvas")
    canvas.width = canvas.height = 1
    const context = canvas.getContext("2d", { willReadFrequently: true })!
    const paint = (...layers: string[]) => {
      context.clearRect(0, 0, 1, 1)
      for (const layer of layers) {
        context.fillStyle = layer
        context.fillRect(0, 0, 1, 1)
      }
      return [...context.getImageData(0, 0, 1, 1).data].slice(0, 3)
    }
    const luminance = (rgb: number[]) => {
      const [r, g, b] = rgb.map((channel) => {
        const value = channel / 255
        return value <= 0.03928
          ? value / 12.92
          : ((value + 0.055) / 1.055) ** 2.4
      })
      return 0.2126 * r + 0.7152 * g + 0.0722 * b
    }
    const a = luminance(paint(page, ...upper))
    const b = luminance(paint(page, ...lower))
    return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)
  }, colors)
}

export const contrast = (
  locator: Locator,
  foreground: string,
  background: string,
) => layerContrast(locator, [background, foreground], [background])
