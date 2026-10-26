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

export const hasExample = (
  framework: Framework,
  component: string,
  name: string,
) =>
  existsSync(
    new URL(`${component}/${name}.${exampleExtension(framework)}`, examplesDir),
  )

export const openFixture = async (
  page: Page,
  framework: Framework,
  component: string,
  search = "",
) => {
  const inflight = new Set<Request>()
  page.on("request", (request) => inflight.add(request))
  page.on("requestfailed", (request) => inflight.delete(request))
  page.on("requestfinished", (request) => inflight.delete(request))
  await page.route(
    (url) => url.hostname !== "localhost",
    (route) =>
      route.request().resourceType() === "image"
        ? route.fulfill({ body: PIXEL, contentType: "image/png" })
        : route.abort(),
  )
  await page.goto(
    (component.startsWith("blocks/")
      ? `/${component}/preview/`
      : component.startsWith("stress/")
        ? `/tests/${component.slice("stress/".length)}/`
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

export const needs = async (
  page: Page,
  feature: string,
  supported: () => boolean,
) => {
  const has = await page.evaluate(supported)
  if (page.context().browser()?.browserType().name() === "chromium") {
    expect(has, `Chromium has ${feature}`).toBe(true)
  } else {
    test.skip(!has, `needs ${feature}`)
  }
}

export const settle = (locator: Locator) =>
  locator.evaluate((element) =>
    Promise.all(
      element
        .getAnimations({ subtree: true })
        .filter(
          (animation) =>
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
