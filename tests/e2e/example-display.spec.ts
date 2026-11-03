import { existsSync, readFileSync } from "node:fs"
import { expect, test } from "@playwright/test"
import { readExample } from "../../scripts/build-examples.mjs"
import {
  boxesOf,
  generatedAtom,
  parseDisplay,
  preserves,
  REPLACED,
  SVG_NAMESPACE,
} from "../../scripts/example-display.mjs"
import { parseHtml } from "../../scripts/html-tokens.mjs"
import { COMPONENTS, openFixture } from "./fixtures"

type Pseudo = { content: string; display: string; position: string }

type Computed = {
  after: Pseudo
  before: Pseudo
  blockified: boolean
  display: string
  hidden: boolean
  items: boolean
  tag: string
  whiteSpace: string
}

type Node = ReturnType<typeof parseHtml>[number]

const examplesDir = new URL("../../src/component-examples/", import.meta.url)

const elementsOf = (nodes: Node[]): Node[] =>
  nodes.flatMap((node) =>
    node.type === "element" ? [node, ...elementsOf(node.children)] : [],
  )

const stylesOf = async (component: string, name: string) => {
  const file = new URL(`${component}/${name}.astro`, examplesDir)
  if (!existsSync(file)) return []
  const { styles } = await readExample(
    readFileSync(file, "utf8"),
    `${component}/${name}.astro`,
  )
  return styles
}

const blockify = (box: { inner: string; outer: string }) => ({
  inner: box.inner === "inline" ? "flow" : box.inner,
  outer: box.outer === "inline" || box.outer === "atomic" ? "block" : box.outer,
})

const shape = (box: { inner: string; outer: string }, blockified: boolean) => {
  const { inner, outer } = blockified ? blockify(box) : box
  return `${outer} ${inner === "inline" ? "flow" : inner}`
}

for (const component of COMPONENTS) {
  test(`${component}: the display model agrees with the browser`, async ({
    page,
  }) => {
    test.setTimeout(120_000)
    await openFixture(page, "html", component)
    const examples: { html: string; name: string; values: Computed[] }[] =
      await page.evaluate(() =>
        [...document.querySelectorAll<HTMLElement>("[data-example]")].map(
          (example) => {
            const pseudo = (element: Element, name: string): Pseudo => {
              const style = getComputedStyle(element, name)
              return {
                content: style.content,
                display: style.display,
                position: style.position,
              }
            }
            const laysOutItems = (display: string) =>
              /^(inline-)?(flex|grid)$/.test(display)
            const layoutParent = (element: Element) => {
              let parent = element.parentElement
              while (
                parent &&
                getComputedStyle(parent).display === "contents"
              ) {
                parent = parent.parentElement
              }
              return parent
            }
            const hasHiddenAncestor = (element: Element) => {
              for (
                let parent = element.parentElement;
                parent && parent !== example;
                parent = parent.parentElement
              ) {
                if (getComputedStyle(parent).display === "none") return true
              }
              return false
            }
            return {
              html: example.innerHTML,
              name: example.dataset.example!,
              values: [...example.querySelectorAll("*")].map((element) => {
                const style = getComputedStyle(
                  element,
                ) as CSSStyleDeclaration & {
                  whiteSpaceCollapse?: string
                }
                const parent = layoutParent(element)
                return {
                  after: pseudo(element, "::after"),
                  before: pseudo(element, "::before"),
                  blockified:
                    (!!parent &&
                      laysOutItems(getComputedStyle(parent).display)) ||
                    /^(absolute|fixed)$/.test(style.position) ||
                    style.float !== "none",
                  display: style.display,
                  hidden: hasHiddenAncestor(element),
                  items: laysOutItems(style.display),
                  tag: element.tagName.toLowerCase(),
                  whiteSpace: style.whiteSpaceCollapse || style.whiteSpace,
                }
              }),
            }
          },
        ),
      )
    expect(examples.length).toBeGreaterThan(0)
    for (const example of examples) {
      const styles = await stylesOf(component, example.name)
      const nodes = parseHtml(example.html)
      const elements = elementsOf(nodes)
      const boxes = boxesOf(nodes, styles)
      expect(
        elements.map((node) => node.tag.toLowerCase()),
        `${example.name}: the parsed tree has the browser's elements`,
      ).toEqual(example.values.map(({ tag }) => tag))
      elements.forEach((node, index) => {
        const actual = example.values[index]
        const box = boxes.get(node)
        const where = `${example.name}: <${node.tag}> #${index}`
        if (node.namespace === SVG_NAMESPACE && node.tag !== "svg") return
        if (actual.display === "") return
        if (actual.display === "none" || box.outer === "none") {
          expect
            .soft(box.outer, `${where} display`)
            .toBe(actual.display === "none" ? "none" : box.outer)
          return
        }
        if (!REPLACED.has(node.tag)) {
          expect
            .soft(shape(box, actual.blockified), `${where} display`)
            .toBe(shape(parseDisplay(actual.display), actual.blockified))
        }
        if (actual.hidden) return
        if (!REPLACED.has(node.tag)) {
          expect
            .soft(preserves(box.whiteSpace), `${where} white-space`)
            .toBe(/^(pre|preserve|break-spaces)/.test(actual.whiteSpace))
        }
        if (actual.items) return
        expect
          .soft(box.before, `${where} ::before`)
          .toBe(generatedAtom(actual.before))
        expect
          .soft(box.after, `${where} ::after`)
          .toBe(generatedAtom(actual.after))
      })
    }
  })
}
