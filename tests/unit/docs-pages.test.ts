import { readdirSync, readFileSync } from "node:fs"
import { parse } from "@astrojs/compiler"
import type { Node } from "@astrojs/compiler/types"
import { expect, test } from "vitest"

const BLOCK = new Set([
  "AutoExample",
  "Code",
  "Example",
  "UICallout",
  "article",
  "aside",
  "blockquote",
  "details",
  "div",
  "dl",
  "figure",
  "footer",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "header",
  "hr",
  "li",
  "nav",
  "ol",
  "p",
  "pre",
  "section",
  "table",
  "ul",
])

const files = readdirSync("src/docs", { recursive: true })
  .map(String)
  .filter((file) => file.endsWith(".astro"))
  .map((file) => `src/docs/${file}`)
  .toSorted()

type Visit = (node: Node, ancestors: Node[], file: string) => string | void

const pages = await Promise.all(
  files.map(async (file) => ({
    ast: (await parse(readFileSync(file, "utf8"), { position: true })).ast,
    file,
  })),
)

const find = (visit: Visit) =>
  pages.flatMap(({ ast, file }) => {
    const found: string[] = []
    const walk = (node: Node, ancestors: Node[]) => {
      const problem = visit(node, ancestors, file)
      if (problem) found.push(`${file}:${node.position?.start.line} ${problem}`)
      if ("children" in node) {
        for (const child of node.children) walk(child, [...ancestors, node])
      }
    }
    walk(ast, [])
    return found
  })

const attribute = (node: Node, name: string) =>
  "attributes" in node
    ? node.attributes.find((attribute) => attribute.name === name)
    : undefined

const hasBlock = (node: Node): boolean =>
  "children" in node &&
  node.children.some(
    (child) => ("name" in child && BLOCK.has(child.name)) || hasBlock(child),
  )

test("a Conditional with block content sets as", () => {
  expect(
    find((node) =>
      "name" in node &&
      node.name === "Conditional" &&
      !attribute(node, "as") &&
      hasBlock(node)
        ? "<Conditional>"
        : undefined,
    ),
    'a Conditional renders a <span>: set as="div" when its slots hold blocks',
  ).toEqual([])
})

test("links to docs pages use DocLink", () => {
  expect(
    find((node) => {
      if (!("name" in node) || node.name !== "a") return
      const href = attribute(node, "href")
      return href?.kind === "quoted" &&
        /^\/(?!\/)/.test(href.value) &&
        !/\.\w+$/.test(href.value.split(/[?#]/)[0])
        ? `<a href="${href.value}">`
        : undefined
    }),
    "use <DocLink>, which adds the framework prefix, for links to docs pages",
  ).toEqual([])
})

test("callouts sit outside rich text", () => {
  expect(
    find((node, ancestors) =>
      "name" in node &&
      node.name === "UICallout" &&
      !ancestors.some(
        (ancestor) =>
          ("name" in ancestor && ancestor.name === "Anatomy") ||
          /\bui-not-rich-text\b/.test(
            attribute(ancestor, "class")?.value ?? "",
          ),
      )
        ? "<UICallout>"
        : undefined,
    ),
    'wrap the UICallout in <div class="ui-not-rich-text">',
  ).toEqual([])
})
