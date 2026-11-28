import { expect, test, type Page } from "@playwright/test"
import {
  derivedExpectations,
  expectation,
  expectations,
  expectStill,
} from "../expectations"
import { normalize } from "../unit/normalize"
import {
  COMPONENTS,
  exampleSnapshots,
  type Framework,
  HYDRATED,
  openFixture,
  pageErrors,
} from "./fixtures"

const DERIVED = await derivedExpectations()

const lateOf = (framework: Framework) =>
  expectations({ check: "hydration-late", framework }, DERIVED).map(
    ({ aspect, example, on = [] }) => ({
      attribute: String(aspect),
      examples: typeof example === "string" ? [example] : [...(example ?? [])],
      on: on.join(", "),
    }),
  )

const probesOf = (framework: Framework) =>
  expectations({ check: "hydration-probe", framework }).map(({ aspect }) =>
    String(aspect),
  )

type Captured = {
  attributesOf: (element: Element) => string[]
  claimed: (container: Element, elements: Element[]) => number
  created: Map<string, Element[]>
  elements: Map<
    string,
    { attributes: string[]; element: Element; late: string[] }[]
  >
  lateOf: (element: Element) => string[]
}

const captureOnMount = (page: Page, framework: Framework) =>
  page.addInitScript(
    ([name, late, probes]) => {
      const lateOn = (element: Element) => {
        const id = element
          .closest(`[data-${name}-example]`)
          ?.getAttribute(`data-${name}-example`)
        return late.filter(
          ({ examples, on }) =>
            examples.includes(id ?? "") && element.matches(on),
        )
      }
      const captured: Captured = {
        attributesOf: (element) =>
          element
            .getAttributeNames()
            .filter(
              (key) =>
                key !== "_hk" &&
                !(key === "loading" && element.localName === "img") &&
                !lateOn(element).some(({ attribute }) => attribute === key),
            )
            .map((key) => `${key}=${element.getAttribute(key)}`)
            .toSorted(),
        claimed: (
          {
            react: (_: Element, elements: Element[]) =>
              elements.filter((element) =>
                Object.keys(element).some((key) =>
                  key.startsWith("__reactFiber$"),
                ),
              ).length,
            solid: (_: Element, elements: Element[]) =>
              elements.filter((element) => element.hasAttribute("_hk")).length,
            svelte: (container: Element) => {
              const comments = document.createTreeWalker(
                container,
                NodeFilter.SHOW_COMMENT,
              )
              let markers = 0
              while (comments.nextNode()) {
                if (comments.currentNode.nodeValue?.startsWith("["))
                  markers += 1
              }
              return markers
            },
            vue: (container: Element, elements: Element[]) => {
              type VNode = {
                anchor?: Node
                children?: unknown
                component?: { subTree?: VNode }
                el?: Node
              }
              const claimed = new Set<unknown>()
              const walk = (vnode?: VNode) => {
                if (!vnode || typeof vnode !== "object") return
                for (
                  let node: Node | null | undefined = vnode.el;
                  node;
                  node = node === vnode.anchor ? undefined : node.nextSibling
                ) {
                  claimed.add(node)
                  if (!vnode.anchor) break
                }
                walk(vnode.component?.subTree)
                if (Array.isArray(vnode.children)) vnode.children.forEach(walk)
              }
              walk((container as Element & { _vnode?: VNode })._vnode)
              return elements.filter((element) => claimed.has(element)).length
            },
          } as Record<string, Captured["claimed"]>
        )[name],
        created: new Map(),
        elements: new Map(),
        lateOf: (element) =>
          lateOn(element).map(
            ({ attribute }) =>
              `${attribute}=${element.getAttribute(attribute)}`,
          ),
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
            .push(
              ...elements.filter(
                (element) =>
                  !(
                    element.parentNode === null &&
                    probes.includes(element.localName)
                  ),
              ),
            )
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
            late: captured.lateOf(element),
          })),
        )
      })
    },
    [framework, lateOf(framework), probesOf(framework)] as const,
  )

const hydrationProblems = (page: Page, framework: Framework, id: string) =>
  page.evaluate(
    ([name, example]) => {
      const { attributesOf, claimed, created, elements, lateOf } = (
        window as unknown as { captured: Captured }
      ).captured
      const container = document.querySelector(
        `[data-${name}-example="${example}"]`,
      )!
      const tag = (attributes: string[], element: Element) =>
        `<${[element.localName, ...attributes].join(" ")}>`
      const server = elements.get(example) ?? []
      const fresh = (created.get(example) ?? [])
        .filter(
          (element) =>
            !(
              element.localName === "link" &&
              element.getAttribute("rel") === "modulepreload"
            ),
        )
        .map((element) => element.localName)
      return {
        claimed: claimed(
          container,
          server.map(({ element }) => element),
        ),
        late: [
          ...new Set(
            server.flatMap(({ element, late }) =>
              lateOf(element)
                .filter((attribute, index) => attribute !== late[index])
                .map((attribute) => attribute.split("=")[0]),
            ),
          ),
        ],
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
    await page.addInitScript((name) => {
      document.addEventListener("example-mount", ({ target }) => {
        const elements = [...(target as Element).querySelectorAll("*")]
        if (name !== "solid") elements.at(-1)?.remove()
        for (const element of elements) element.removeAttribute("_hk")
      })
    }, framework)
    await captureOnMount(page, framework)
    await openFixture(page, framework, "button", "?hydrate")
    const { problems } = await hydrationProblems(page, framework, id)
    expect(problems).toEqual([
      expect.stringMatching(/^created <\w+>.* instead of claiming/),
      ...problems.slice(1).map(() => expect.stringMatching(/ was replaced$/)),
    ])
  })

  for (const component of COMPONENTS) {
    test(`${framework}/${component} hydrates each example without replacing or changing its server markup`, async ({
      page,
    }) => {
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

      const errors = pageErrors(page)
      await openFixture(page, framework, component, "?hydrate")
      expect(errors, "page errors").toEqual([])
      const server = await exampleSnapshots(page, framework, html)
      const hydrated = await exampleSnapshots(page, framework)

      for (const id of ids) {
        const { claimed, late, problems } = await hydrationProblems(
          page,
          framework,
          id,
        )
        expect(
          claimed,
          `${id} server elements or markers ${framework} claimed`,
        ).toBeGreaterThan(0)
        for (const entry of expectations(
          { check: "hydration-late", example: id, framework },
          DERIVED,
        )) {
          const aspect = String(entry.aspect)
          expectStill(expect, late.includes(aspect), entry, {
            aspect,
            check: "hydration-late",
            example: id,
            framework,
          })
        }
        const where = { check: "hydration", example: id, framework } as const
        const known = expectation(where)
        if (known) {
          expectStill(expect, problems.length > 0, known, where)
          continue
        }
        expect.soft(problems, `${id} server elements`).toEqual([])

        const before = server.find(({ example }) => example === id)!
        const after = hydrated.find(({ example }) => example === id)!
        expect
          .soft(normalize(after.markup), `${id} markup`)
          .toBe(normalize(before.markup))
        expect.soft(after.state, `${id} form state`).toEqual(before.state)
      }
    })
  }
}
