import { expect, test, type Browser, type Page } from "@playwright/test"
import { APPS, examplesOf, KNOWN_PROBLEMS } from "./apps.ts"

const PIXEL = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
  "base64",
)

const examples = new Map(
  [...new Set(APPS.map((app) => app.framework))].map((framework) => [
    framework,
    examplesOf(framework),
  ]),
)

const slugs = [
  ...new Set([...examples.values()].flatMap((list) => [...list.keys()])),
].toSorted()

const appOf = (name: string) => {
  const app = APPS.find((candidate) => candidate.name === name)
  if (!app) throw new Error(`No app is named ${name}`)
  return app
}

const expectedExamples = (name: string, slug: string) =>
  (examples.get(appOf(name).framework)?.get(slug) ?? []).map(
    (example) => `${slug}/${example.name}`,
  )

const offline = (page: Page) =>
  page.route(
    (url) => url.hostname !== "localhost" || url.pathname === "/favicon.ico",
    (route) =>
      route.request().resourceType() === "image"
        ? route.fulfill({ body: PIXEL, contentType: "image/png" })
        : route.fulfill({ status: 204 }),
  )

const knownProblems = (name: string, slug: string) =>
  KNOWN_PROBLEMS.filter((known) => known.app === name && known.slug === slug)

const unexpected = (problems: string[], name: string, slug: string) =>
  problems.filter(
    (problem) =>
      !knownProblems(name, slug).some((known) => known.message === problem),
  )

const watch = async (page: Page) => {
  const problems: string[] = []
  page.on("pageerror", (error) => problems.push(`uncaught ${error.message}`))
  page.on("console", (message) => {
    if (message.type() === "error" || message.type() === "warning") {
      problems.push(`console.${message.type()}: ${message.text()}`)
    }
  })
  await offline(page)
  return problems
}

const open = async (page: Page, path: string) => {
  await page.goto(path)
  await expect(page.locator("html")).toHaveAttribute("data-hydrated", "")
  await page.waitForLoadState("networkidle")
}

const undefinedElements = (page: Page) =>
  page.evaluate(() => [
    ...new Set(
      [...document.querySelectorAll(":not(:defined)")]
        .map((element) => element.localName)
        .filter((name) => name.startsWith("opui-")),
    ),
  ])

const renderedExamples = (page: Page) =>
  page
    .locator("[data-example]")
    .evaluateAll((elements) =>
      elements.map((element) => element.getAttribute("data-example")),
    )

const serverRender = async (
  browser: Browser,
  baseURL: string,
  path: string,
) => {
  const context = await browser.newContext({
    baseURL,
    javaScriptEnabled: false,
  })
  const page = await context.newPage()
  await offline(page)
  const response = await page.goto(path)
  const rendered = await page
    .locator("[data-example]")
    .evaluateAll((elements) =>
      elements.map((element) => ({
        empty: !element.firstElementChild && !element.textContent?.trim(),
        example: element.getAttribute("data-example"),
      })),
    )
  await context.close()
  return { rendered, status: response?.status() }
}

for (const slug of slugs) {
  test(`${slug} renders on the server, hydrates and defines its elements`, async ({
    browser,
    page,
  }, testInfo) => {
    const app = appOf(testInfo.project.name)
    const expected = expectedExamples(app.name, slug)
    test.skip(!expected.length, `${app.framework} has no ${slug} examples`)

    if (app.ssr) {
      const { rendered, status } = await serverRender(
        browser,
        `http://localhost:${app.port}`,
        `/${slug}`,
      )
      expect(status, `${app.name} answers /${slug}`).toBe(200)
      expect(
        rendered.map(({ example }) => example),
        `${app.name} renders every ${slug} example on the server`,
      ).toEqual(expected)
      expect(
        rendered.filter(({ empty }) => empty).map(({ example }) => example),
        `${app.name} renders these examples empty on the server`,
      ).toEqual([])
    }

    const problems = await watch(page)
    await open(page, `/${slug}`)
    expect(
      await renderedExamples(page),
      `${app.name} renders every ${slug} example in the browser`,
    ).toEqual(expected)
    await expect
      .poll(() => undefinedElements(page), {
        message: `${app.name} /${slug} leaves custom elements undefined`,
      })
      .toEqual([])
    expect(
      unexpected(problems, app.name, slug),
      `${app.name} /${slug} logs errors or warnings`,
    ).toEqual([])
    expect(
      knownProblems(app.name, slug)
        .filter(({ message }) => !problems.includes(message))
        .map(({ reason }) => reason),
      `${app.name} /${slug} no longer logs these known problems: remove them from KNOWN_PROBLEMS in tests/apps/apps.ts`,
    ).toEqual([])
  })
}

test("the CSS loads", async ({ page }, testInfo) => {
  const app = appOf(testInfo.project.name)
  const problems = await watch(page)
  await open(page, "/button")
  expect(
    await page.evaluate(() =>
      getComputedStyle(document.documentElement)
        .getPropertyValue("--ui-primary")
        .trim(),
    ),
    `${app.name} defines the theme roles`,
  ).not.toBe("")
  await expect(page.locator(".ui-button").first()).toHaveCSS(
    "display",
    "inline-flex",
  )
  expect(unexpected(problems, app.name, "button")).toEqual([])
})

test("the components answer input once hydrated", async ({
  page,
}, testInfo) => {
  const app = appOf(testInfo.project.name)
  const problems = await watch(page)
  await open(page, "/text-field")
  const example = page.locator('[data-example="text-field/Binding"]')
  const text = example.locator(".text-field-binding-text")
  await example.getByRole("textbox", { name: "Name" }).fill("Grace")
  await expect(text, `${app.name} updates the bound value`).toHaveText(
    "Hello, Grace.",
  )
  await example.getByRole("button", { name: "Reset" }).click()
  await expect(text, `${app.name} runs the click handler`).toHaveText(
    "Hello, Ada.",
  )
  expect(unexpected(problems, app.name, "text-field")).toEqual([])
})

test("navigating to another page renders its examples", async ({
  page,
}, testInfo) => {
  const app = appOf(testInfo.project.name)
  const problems = await watch(page)
  await open(page, "/button")
  await page.evaluate(() => Object.assign(window, { opuiSameDocument: true }))
  await page
    .locator("nav")
    .getByRole("link", { exact: true, name: "dialog" })
    .click()
  await expect(page).toHaveURL(/\/dialog$/)
  const expected = expectedExamples(app.name, "dialog")
  await expect(page.locator("[data-example]")).toHaveCount(expected.length)
  expect(await renderedExamples(page)).toEqual(expected)
  if (app.ssr) {
    expect(
      await page.evaluate(() => "opuiSameDocument" in window),
      `${app.name} navigates without reloading the page`,
    ).toBe(true)
  }
  await expect
    .poll(() => undefinedElements(page), {
      message: `${app.name} leaves custom elements undefined after navigating`,
    })
    .toEqual([])
  expect(
    unexpected(unexpected(problems, app.name, "button"), app.name, "dialog"),
  ).toEqual([])
})
