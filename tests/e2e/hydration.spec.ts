import { expect, test, type Page } from "@playwright/test"
import { normalize } from "../unit/normalize"
import {
  COMPONENTS,
  exampleSnapshots,
  type Framework,
  HYDRATED,
  openFixture,
  pageErrors,
} from "./fixtures"

type Captured = {
  attributesOf: (element: Element) => string[]
  created: Map<string, string[]>
  elements: Map<string, { attributes: string[]; element: Element }[]>
}

const captureOnMount = (page: Page, framework: Framework) =>
  page.addInitScript((name) => {
    const captured: Captured = {
      attributesOf: (element) =>
        element
          .getAttributeNames()
          .filter(
            (key) =>
              key !== "_hk" &&
              !(key === "loading" && element.localName === "img"),
          )
          .map((key) => `${key}=${element.getAttribute(key)}`)
          .toSorted(),
      created: new Map(),
      elements: new Map(),
    }
    Object.assign(window, { captured })
    let mounting: Element | undefined
    const record = (node: Node) => {
      const id = mounting?.getAttribute(`data-${name}-example`)
      if (id && !mounting!.hasAttribute(`data-${name}-mounted`)) {
        const elements =
          node instanceof Element
            ? [node, ...node.querySelectorAll("*")]
            : node instanceof DocumentFragment
              ? [...node.querySelectorAll("*")]
              : []
        captured.created
          .get(id)!
          .push(...elements.map((element) => element.localName))
      }
      return node
    }
    const wrap = <T extends object>(target: T, key: keyof T) => {
      const original = target[key] as (...args: unknown[]) => Node
      Object.assign(target, {
        [key](this: unknown, ...args: unknown[]) {
          return record(original.apply(this, args))
        },
      })
    }
    wrap(Node.prototype, "cloneNode")
    wrap(Document.prototype, "createElement")
    wrap(Document.prototype, "createElementNS")
    wrap(Document.prototype, "importNode")
    document.addEventListener("example-mount", ({ target }) => {
      const example = target as Element
      const id = example.getAttribute(`data-${name}-example`)
      if (id === null) return
      mounting = example
      captured.created.set(id, [])
      captured.elements.set(
        id,
        [...example.querySelectorAll("*")].map((element) => ({
          attributes: captured.attributesOf(element),
          element,
        })),
      )
    })
  }, framework)

const hydrationProblems = (page: Page, framework: Framework, id: string) =>
  page.evaluate(
    ([name, example]) => {
      const { attributesOf, created, elements } = (
        window as unknown as { captured: Captured }
      ).captured
      const container = document.querySelector(
        `[data-${name}-example="${example}"]`,
      )!
      const tag = (attributes: string[], element: Element) =>
        `<${[element.localName, ...attributes].join(" ")}>`
      const server = elements.get(example) ?? []
      const fresh = created.get(example) ?? []
      return {
        keyed: server.filter(({ element }) => element.hasAttribute("_hk"))
          .length,
        problems: [
          ...(fresh.length > 0
            ? [
                `created ${fresh.map((tag) => `<${tag}>`).join(" ")} instead of claiming the server's elements`,
              ]
            : []),
          ...server.flatMap(({ attributes, element }) => {
            if (!container.contains(element)) {
              return [`${tag(attributes, element)} was replaced`]
            }
            const after = attributesOf(element)
            return after.join() === attributes.join()
              ? []
              : [`${tag(attributes, element)} became ${tag(after, element)}`]
          }),
        ],
      }
    },
    [framework, id] as const,
  )

for (const framework of HYDRATED) {
  test(`${framework} hydration reports server elements it can't claim`, async ({
    page,
  }) => {
    const id = "button/Variants"
    await page.addInitScript(() => {
      document.addEventListener("example-mount", ({ target }) => {
        for (const element of (target as Element).querySelectorAll("[_hk]")) {
          element.removeAttribute("_hk")
        }
      })
    })
    await captureOnMount(page, framework)
    await openFixture(page, framework, "button", `?hydrate=${id}`)
    const { problems } = await hydrationProblems(page, framework, id)
    expect(problems).toEqual([
      expect.stringMatching(/^created <\w+>.* instead of claiming/),
    ])
  })

  for (const component of COMPONENTS) {
    test(`${framework}/${component} hydrates each example without replacing or changing its server markup`, async ({
      page,
    }) => {
      test.setTimeout(120_000)
      await captureOnMount(page, framework)
      const response = await page.request.get(
        `/${framework}/test/${component}/`,
      )
      const html = await response.text()
      const ids = [
        ...html.matchAll(
          new RegExp(`data-${framework}-example="([^"]+)"`, "g"),
        ),
      ].map(([, id]) => id)
      expect(ids.length, "examples").toBeGreaterThan(0)

      for (const id of ids) {
        const errors = pageErrors(page)
        await openFixture(page, framework, component, `?hydrate=${id}`)
        expect(errors, `${id} page errors`).toEqual([])

        const { keyed, problems } = await hydrationProblems(page, framework, id)
        expect(
          keyed,
          `${id} server elements with a hydration key`,
        ).toBeGreaterThan(0)
        expect.soft(problems, `${id} server elements`).toEqual([])

        const server = (await exampleSnapshots(page, framework, html)).find(
          ({ example }) => example === id,
        )!
        const hydrated = (await exampleSnapshots(page, framework)).find(
          ({ example }) => example === id,
        )!
        expect
          .soft(normalize(hydrated.markup), `${id} markup`)
          .toBe(normalize(server.markup))
        expect.soft(hydrated.state, `${id} form state`).toEqual(server.state)
      }
    })
  }
}
