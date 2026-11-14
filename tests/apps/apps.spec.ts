import {
  expect,
  test,
  type Browser,
  type Locator,
  type Page,
} from "@playwright/test"
import { readdirSync, readFileSync } from "node:fs"
import path from "node:path"
import { APPS, appDir, examplesOf, KNOWN_PROBLEMS } from "./apps.ts"

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
    (url) =>
      url.hostname !== "localhost" ||
      url.pathname === "/favicon.ico" ||
      url.pathname.startsWith("/photos/"),
    (route) =>
      route.request().resourceType() === "image"
        ? route.fulfill({ body: PIXEL, contentType: "image/png" })
        : new URL(route.request().url()).hostname === "localhost"
          ? route.fulfill({ status: 204 })
          : route.abort(),
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
    if (
      (message.type() === "error" || message.type() === "warning") &&
      new URL(message.location().url || "http://localhost").hostname ===
        "localhost"
    ) {
      problems.push(`console.${message.type()}: ${message.text()}`)
    }
  })
  await offline(page)
  return problems
}

const open = async (page: Page, path: string) => {
  await page.goto(path)
  await expect(page.locator("html")).toHaveAttribute("data-hydrated", "")
  await page.waitForLoadState("load")
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

const PREFIXES = [
  { name: "", path: "" },
  { name: " with the elements loaded first", path: "/elements-first" },
]

for (const prefix of PREFIXES) {
  for (const slug of slugs) {
    test(`${slug}${prefix.name} renders on the server, hydrates and defines its elements`, async ({
      browser,
      page,
    }, testInfo) => {
      const app = appOf(testInfo.project.name)
      const expected = expectedExamples(app.name, slug)
      test.skip(!expected.length, `${app.framework} has no ${slug} examples`)
      test.skip(
        !(app.prefixes ?? [""]).includes(prefix.path),
        `${app.name} has no ${prefix.path} routes`,
      )
      const path = `${prefix.path}/${slug}`

      if (app.ssr) {
        const { rendered, status } = await serverRender(
          browser,
          `http://localhost:${app.port}`,
          path,
        )
        expect(status, `${app.name} answers ${path}`).toBe(200)
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
      await open(page, path)
      expect(
        await renderedExamples(page),
        `${app.name} renders every ${slug} example in the browser`,
      ).toEqual(expected)
      await expect
        .poll(() => undefinedElements(page), {
          message: `${app.name} ${path} leaves custom elements undefined`,
        })
        .toEqual([])
      expect(
        unexpected(problems, app.name, slug),
        `${app.name} ${path} logs errors or warnings`,
      ).toEqual([])
      expect(
        knownProblems(app.name, slug)
          .filter(({ message }) => !problems.includes(message))
          .map(({ reason }) => reason),
        `${app.name} ${path} no longer logs these known problems: remove them from KNOWN_PROBLEMS in tests/apps/apps.ts`,
      ).toEqual([])
    })
  }
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

test("the README's build setting keeps light-dark(), which the default build rewrites", () => {
  const app = appOf(test.info().project.name)
  const { readmeBuild } = app
  test.skip(!readmeBuild, `${app.name} has no setting in the README`)
  if (!readmeBuild) return
  const css = (folder: string) => {
    const dir = path.join(appDir(app), folder)
    return readdirSync(dir, { recursive: true })
      .map(String)
      .filter((file) => file.endsWith(".css"))
      .map((file) => readFileSync(path.join(dir, file), "utf8"))
      .join("\n")
  }
  const block = `${readmeBuild.settings}.config`
  expect(
    css(readmeBuild.css),
    `${app.name}'s default build keeps light-dark() now: remove the ${block} block from the README's Builds that rewrite light-dark() section`,
  ).not.toContain("light-dark(")
  expect(
    css(readmeBuild.readmeCss),
    `the ${block} block in the README's Builds that rewrite light-dark() section no longer keeps light-dark() in ${app.name}`,
  ).toContain("light-dark(")
})

test("the components answer input once hydrated", async ({
  page,
}, testInfo) => {
  const app = appOf(testInfo.project.name)
  const problems = await watch(page)
  await open(page, "/text-field")
  const example = page.locator('[data-example="text-field/Binding"]')
  const text = example.locator(".text-field-binding-text")
  await example.getByRole("textbox", { name: "Name" }).fill("Percy")
  await expect(text, `${app.name} updates the bound value`).toHaveText(
    "Heyyy, Percy.",
  )
  await example.getByRole("button", { name: "Reset" }).click()
  await expect(text, `${app.name} runs the click handler`).toHaveText(
    "Heyyy, Holly.",
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

const CHANGES = [
  { example: "checkbox/Basics", label: "Unchecked", to: true },
  { example: "number-field/Basics", label: "Quantity", to: "7" },
  { example: "radio/Basics", label: "PayPal", to: true },
  { example: "range/Basics", label: "Volume", to: "80" },
  { example: "rating/Input", label: "1 star", to: true },
  { example: "select/Variants", label: "Role", to: "Bass" },
  { example: "switch/Basics", label: "Bluetooth", to: true },
  { example: "tabs/Basics", label: "Settings", to: true },
  { example: "tabs/Binding", label: "Notifications", to: true },
  { example: "text-field/InputTypes", label: "Color", to: "#ff0000" },
  { example: "text-field/InputTypes", label: "Email", to: "ada@example.com" },
  { example: "text-field/InputTypes", label: "Password", to: "secret" },
  {
    example: "text-field/InputTypes",
    label: "URL",
    to: "https://example.com/",
  },
  { example: "textarea/Variants", label: "Outlined", to: "Typed early" },
  { example: "toggle/Binding", label: "Bold", to: false },
  { example: "toggle/Binding", label: "Italic", to: true },
  { example: "toggle/Binding", label: "Month", to: true },
  { example: "toggle/Interactive", label: "Cycling", to: true },
]

type Change = (typeof CHANGES)[number]

const changedSlugs = [
  ...new Set(CHANGES.map(({ example }) => example.split("/")[0] ?? "")),
]

const changesOn = (slug: string) =>
  CHANGES.filter(({ example }) => example.startsWith(`${slug}/`))

const CONTROLS = "input, select, textarea"

const controlOf = async (page: Page, { example, label }: Change) => {
  const labelled = page
    .locator(`[data-example="${example}"]`)
    .getByLabel(label, { exact: true })
  await labelled.waitFor({ state: "attached" })
  const position = await labelled.evaluate(
    (element, controls) =>
      [
        ...(element.closest("[data-example]")?.querySelectorAll(controls) ??
          []),
      ].indexOf(element),
    CONTROLS,
  )
  return page
    .locator(`[data-example="${example}"]`)
    .locator(CONTROLS)
    .nth(position)
}

const change = async (control: Locator, item: Change) => {
  if (typeof item.to === "boolean") {
    await control.evaluate((element) => (element as HTMLInputElement).click())
  } else if (
    await control.evaluate((element) => element.localName === "select")
  ) {
    await control.selectOption(item.to)
  } else await control.fill(item.to)
}

const formStateOf = (control: Locator) =>
  control.evaluate((element) => {
    if (element instanceof HTMLSelectElement) {
      const options = [...element.options]
      return {
        current: element.value,
        initial: (
          options.find((option) => option.defaultSelected) ?? options[0]
        )?.value,
      }
    }
    if (
      element instanceof HTMLInputElement &&
      (element.type === "checkbox" || element.type === "radio")
    ) {
      return { current: element.checked, initial: element.defaultChecked }
    }
    const field = element as HTMLInputElement | HTMLTextAreaElement
    return { current: field.value, initial: field.defaultValue }
  })

const holdScripts = async (page: Page, prefix: string) => {
  const { promise, resolve } = Promise.withResolvers<void>()
  await page.route(
    (url) => url.hostname === "localhost" && url.pathname.startsWith(prefix),
    async (route) => {
      await promise
      await route.continue()
    },
  )
  return resolve
}

for (const slug of changedSlugs) {
  test(`${slug} keeps what changed before it hydrated`, async ({
    page,
  }, testInfo) => {
    const app = appOf(testInfo.project.name)
    test.skip(!app.scripts, `${app.name} renders on the client only`)
    const problems = await watch(page)
    const release = await holdScripts(page, app.scripts ?? "")
    await page.goto(`/${slug}`, { waitUntil: "commit" })
    const changed = []
    for (const item of changesOn(slug)) {
      const control = await controlOf(page, item)
      const { initial } = await formStateOf(control)
      await change(control, item)
      expect((await formStateOf(control)).current).toBe(item.to)
      changed.push({ control, initial, item })
    }
    expect(
      await page.evaluate(() => "hydrated" in document.documentElement.dataset),
      `${app.name} hydrated before the changes`,
    ).toBe(false)

    release()
    await expect(page.locator("html")).toHaveAttribute("data-hydrated", "")
    await page.waitForLoadState("load")
    for (const { control, initial, item } of changed) {
      expect(
        await formStateOf(control),
        `${app.name} keeps ${item.example} "${item.label}" and its server default when it hydrates`,
      ).toEqual({ current: item.to, initial })
    }
    expect(unexpected(problems, app.name, slug)).toEqual([])
  })
}

const BOUND = [
  {
    example: "tabs/Binding",
    readout: ".tabs-binding-text",
    text: "Selected: notifications",
  },
  {
    example: "toggle/Binding",
    readout: ".toggle-binding-text",
    text: "View: month. Format: italic.",
  },
]

for (const { example, readout, text } of BOUND) {
  test(`${example} binds what changed before it hydrated`, async ({
    page,
  }, testInfo) => {
    const app = appOf(testInfo.project.name)
    test.skip(!app.scripts, `${app.name} renders on the client only`)
    test.skip(
      app.framework === "react",
      "React keeps a choice made before hydration but calls no onValueChange for it",
    )
    const slug = example.split("/")[0] ?? ""
    const problems = await watch(page)
    const release = await holdScripts(page, app.scripts ?? "")
    await page.goto(`/${slug}`, { waitUntil: "commit" })
    for (const item of CHANGES.filter((entry) => entry.example === example)) {
      await change(await controlOf(page, item), item)
    }
    release()
    await expect(page.locator("html")).toHaveAttribute("data-hydrated", "")
    await expect(
      page.locator(`[data-example="${example}"] ${readout}`),
      `${app.name} sets the bound value of ${example} to the choice made before it hydrated`,
    ).toHaveText(text)
    expect(unexpected(problems, app.name, slug)).toEqual([])
  })
}

for (const slug of changedSlugs) {
  test(`${slug} keeps what the browser restores when the user comes back`, async ({
    page,
  }, testInfo) => {
    const app = appOf(testInfo.project.name)
    test.skip(!app.ssr, `${app.name} renders on the client only`)
    const problems = await watch(page)
    await open(page, `/${slug}`)
    const changed = []
    for (const item of changesOn(slug)) {
      const control = await controlOf(page, item)
      const restored = await control.evaluate(
        (element) => (element as HTMLInputElement).type !== "password",
      )
      await change(control, item)
      if (restored) changed.push({ control, item })
    }
    await page.goto("/button")
    await page.goBack()
    await expect(page.locator("html")).toHaveAttribute("data-hydrated", "")
    await page.waitForLoadState("load")
    for (const { control, item } of changed) {
      expect(
        (await formStateOf(control)).current,
        `${app.name} keeps ${item.example} "${item.label}" when the user comes back`,
      ).toBe(item.to)
    }
    expect(unexpected(problems, app.name, slug)).toEqual([])
  })
}

test("a form reset after hydration restores the values and the readout", async ({
  page,
}, testInfo) => {
  const app = appOf(testInfo.project.name)
  const problems = await watch(page)
  await open(page, "/range")
  const example = page.locator('[data-example="range/Value"]')
  const slider = example.getByRole("slider", { name: "Hue" })
  const readout = example.locator("output")
  await slider.focus()
  await page.keyboard.press("End")
  await expect(readout, `${app.name} follows the slider`).toHaveText("360°")
  await example.getByRole("button", { name: "Reset" }).click()
  await expect(slider).toHaveValue("250")
  await expect(readout, `${app.name} resets the readout`).toHaveText("250°")
  await expect(slider).toHaveAttribute("aria-valuetext", "250°")
  expect(unexpected(problems, app.name, "range")).toEqual([])
})

test("a sortable table clicked before React hydrates it waits for onSort", async ({
  page,
}, testInfo) => {
  const app = appOf(testInfo.project.name)
  test.skip(
    app.framework !== "react" || !app.scripts || !app.ssr,
    `${app.name} loads the element with the component`,
  )
  const problems = await watch(page)
  const { promise, resolve: release } = Promise.withResolvers<void>()
  await page.route(
    (url) =>
      url.hostname === "localhost" &&
      url.pathname.startsWith(app.scripts ?? ""),
    async (route) => {
      if (route.request().resourceType() === "script") await promise
      await route.continue()
    },
  )
  await page.goto("/table", { waitUntil: "commit" })
  const table = page.locator('[data-example="table/Sortable"]')
  const header = (name: string) => table.getByRole("columnheader", { name })
  await header("Planet").waitFor()
  await page.addScriptTag({
    content: readFileSync(
      path.join(
        import.meta.dirname,
        "../../packages/opui/elements/sortable-table.js",
      ),
      "utf8",
    ),
    type: "module",
  })
  await expect(table.locator("opui-sortable-table:defined")).toHaveCount(1)
  await table.getByRole("button", { name: "Moons" }).click()
  await expect(header("Moons")).not.toHaveAttribute("aria-sort")
  expect(
    await page.evaluate(() => "hydrated" in document.documentElement.dataset),
    `${app.name} hydrated before the click`,
  ).toBe(false)

  release()
  await expect(page.locator("html")).toHaveAttribute("data-hydrated", "")
  await page.waitForLoadState("load")
  await expect(table.locator("opui-sortable-table")).not.toHaveAttribute(
    "data-hydrating",
  )
  await table.getByRole("button", { name: "Moons" }).click()
  await expect(header("Moons")).toHaveAttribute("aria-sort", "ascending")
  await expect(table.getByRole("status")).toHaveText("Moons, sorted ascending")
  expect(unexpected(problems, app.name, "table")).toEqual([])
})

test("a callout dismissed before React hydrates it waits for onDismiss", async ({
  page,
}, testInfo) => {
  const app = appOf(testInfo.project.name)
  test.skip(
    app.framework !== "react" || !app.scripts || !app.ssr,
    `${app.name} loads the element with the component`,
  )
  const problems = await watch(page)
  const { promise, resolve: release } = Promise.withResolvers<void>()
  await page.route(
    (url) =>
      url.hostname === "localhost" &&
      url.pathname.startsWith(app.scripts ?? ""),
    async (route) => {
      if (route.request().resourceType() === "script") await promise
      await route.continue()
    },
  )
  const questions: string[] = []
  page.on("dialog", async (dialog) => {
    questions.push(dialog.message())
    await (questions.length === 1 ? dialog.dismiss() : dialog.accept())
  })
  await page.goto("/callout", { waitUntil: "commit" })
  const callout = page.locator(
    '[data-example="callout/Dismissible"] opui-callout',
  )
  const close = callout.getByRole("button", { name: "Dismiss" })
  await callout.waitFor()
  await page.addScriptTag({
    content: readFileSync(
      path.join(import.meta.dirname, "../../packages/opui/elements/callout.js"),
      "utf8",
    ),
    type: "module",
  })
  await expect(
    page.locator('[data-example="callout/Dismissible"] opui-callout:defined'),
  ).toHaveCount(1)
  await close.click()
  await expect(callout).toBeVisible()
  expect(questions).toEqual([])
  expect(
    await page.evaluate(() => "hydrated" in document.documentElement.dataset),
    `${app.name} hydrated before the click`,
  ).toBe(false)

  release()
  await expect(page.locator("html")).toHaveAttribute("data-hydrated", "")
  await page.waitForLoadState("load")
  await expect(callout).not.toHaveAttribute("data-hydrating")
  await close.click()
  await expect.poll(() => questions).toEqual(["Hide this message?"])
  await expect(callout).toBeVisible()
  await close.click()
  await expect.poll(() => questions).toHaveLength(2)
  await expect(callout).toBeHidden()
  expect(unexpected(problems, app.name, "callout")).toEqual([])
})
