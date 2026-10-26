import { expect, test, type Page } from "@playwright/test"
import { normalize } from "../unit/normalize"
import { COMPONENTS, FRAMEWORKS, openFixture, type Framework } from "./fixtures"

const CLIENT_RENDERED: Framework[] = ["react", "svelte", "vue"]

const snapshot = (page: Page, framework: Framework, html?: string) =>
  page.evaluate(
    ([name, source]) => {
      const root = source
        ? new DOMParser().parseFromString(source, "text/html")
        : document
      return [...root.querySelectorAll(`[data-${name}-example]`)].map(
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

          return {
            example: example.getAttribute(`data-${name}-example`)!,
            markup: clone.innerHTML,
            state,
          }
        },
      )
    },
    [framework, html ?? ""] as const,
  )

for (const framework of FRAMEWORKS) {
  const client = CLIENT_RENDERED.includes(framework)
  for (const component of COMPONENTS) {
    test(`${framework}/${component} runs without errors${client ? " and renders its server markup on the client" : ""}`, async ({
      page,
    }) => {
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

      const response = await page.request.get(
        `/${framework}/test/${component}/`,
      )
      await openFixture(page, framework, component)
      expect(errors, "page errors").toEqual([])
      if (!client) return

      const server = await snapshot(page, framework, await response.text())
      const rendered = await snapshot(page, framework)
      expect(rendered.map(({ example }) => example)).toEqual(
        server.map(({ example }) => example),
      )
      expect(server.length).toBeGreaterThan(0)
      for (const [index, { example, markup, state }] of server.entries()) {
        expect
          .soft(normalize(rendered[index].markup), `${example} markup`)
          .toBe(normalize(markup))
        expect
          .soft(rendered[index].state, `${example} form state`)
          .toEqual(state)
      }
    })
  }
}
