import { readdirSync, readFileSync } from "node:fs"
import { expect, test, type Page } from "@playwright/test"
import { expectation, expectStill } from "../expectations"
import { COMPONENTS, FRAMEWORKS, openFixture, type Framework } from "./fixtures"

const examplesDir = new URL("../../src/component-examples/", import.meta.url)

const CONTROL = /<(details|dialog|input|progress|select|textarea)\b/

const WITH_CONTROLS = COMPONENTS.filter((component) =>
  readdirSync(new URL(`${component}/`, examplesDir))
    .filter((file) => file.endsWith(".html"))
    .some((file) =>
      CONTROL.test(
        readFileSync(new URL(`${component}/${file}`, examplesDir), "utf8"),
      ),
    ),
)

const readStates = (page: Page) =>
  page.evaluate(() => {
    const describe = (element: Element) => {
      if (element instanceof HTMLInputElement) {
        return ["checkbox", "radio"].includes(element.type)
          ? `${element.type} ${element.checked ? "checked" : "unchecked"}${element.indeterminate ? " indeterminate" : ""}`
          : `${element.type} ${JSON.stringify(element.value)}`
      }
      if (element instanceof HTMLSelectElement) {
        return `select ${JSON.stringify([...element.selectedOptions].map((option) => option.value))}`
      }
      if (element instanceof HTMLTextAreaElement) {
        return `textarea ${JSON.stringify(element.value)}`
      }
      if (element instanceof HTMLProgressElement) {
        return `progress ${element.position}`
      }
      return `${element.localName} ${(element as HTMLDetailsElement).open ? "open" : "closed"}`
    }
    return Object.fromEntries(
      [...document.querySelectorAll("[data-example]")].map((example) => [
        example.getAttribute("data-example")!,
        [
          ...example.querySelectorAll(
            "details, dialog, input, progress, select, textarea",
          ),
        ]
          .map(describe)
          .join("\n"),
      ]),
    )
  })

const states = async (page: Page, framework: Framework, component: string) => {
  await openFixture(page, framework, component)
  const hydrated = await readStates(page)
  await page.evaluate(async () => {
    for (const form of document.querySelectorAll<HTMLFormElement>(
      "[data-example] form",
    )) {
      form.reset()
    }
    await new Promise((resolve) => setTimeout(resolve, 50))
  })
  return { hydrated, reset: await readStates(page) }
}

for (const component of WITH_CONTROLS) {
  test(`${component} examples hold the same control state in every framework`, async ({
    page,
  }) => {
    test.setTimeout(120_000)
    const astro = await states(page, "astro", component)
    for (const framework of FRAMEWORKS.filter((name) => name !== "astro")) {
      const actual = await states(page, framework, component)
      for (const [name, expected] of Object.entries(astro.hydrated)) {
        if (!(name in actual.hydrated)) continue
        const key = `${framework}/${component}/${name}`
        const same =
          actual.hydrated[name] === expected &&
          actual.reset[name] === astro.reset[name]
        const where = {
          check: "example-state",
          example: name,
          framework,
        } as const
        const known = expectation(where)
        if (known) {
          expectStill(expect, !same, known, where)
          continue
        }
        expect
          .soft(
            actual.hydrated[name],
            `${key} control state differs from astro`,
          )
          .toBe(expected)
        expect
          .soft(
            actual.reset[name],
            `${key} control state after a form reset differs from astro`,
          )
          .toBe(astro.reset[name])
      }
    }
  })
}
