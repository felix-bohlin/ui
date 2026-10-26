import { readdirSync, readFileSync } from "node:fs"
import { parse } from "@astrojs/compiler"
import type { Node } from "@astrojs/compiler/types"
import ts from "typescript"
import { expect, test } from "vitest"
import { FRAMEWORK_IDS } from "../../src/utils/framework"

const BLOCK = new Set([
  "AutoExample",
  "Code",
  "CodeGroup",
  "Example",
  "UICallout",
  "address",
  "article",
  "aside",
  "blockquote",
  "caption",
  "dd",
  "details",
  "dialog",
  "div",
  "dl",
  "dt",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "header",
  "hgroup",
  "hr",
  "legend",
  "li",
  "main",
  "menu",
  "nav",
  "ol",
  "p",
  "pre",
  "search",
  "section",
  "summary",
  "table",
  "tbody",
  "td",
  "tfoot",
  "th",
  "thead",
  "tr",
  "ul",
])

const FRAMEWORK_SLOTS = new Set<string>(["components", ...FRAMEWORK_IDS])

const WRAPPED_SLOTS = new Set([
  "accessibility",
  "anatomy",
  "under-the-hood",
  "usage",
])

const PAGES = readdirSync("src/docs/components")
  .filter((file) => file.endsWith(".astro"))
  .map((file) => file.replace(/\.astro$/, ""))

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

const quoted = (node: Node, name: string) => {
  const found = attribute(node, name)
  return found?.kind === "quoted" ? found.value : undefined
}

const conditionalTag = (node: Node) => quoted(node, "as") ?? "span"

const isBlock = (node: Node) =>
  "name" in node &&
  (node.name === "Conditional"
    ? BLOCK.has(conditionalTag(node))
    : BLOCK.has(node.name))

const hasBlock = (node: Node): boolean =>
  "children" in node &&
  node.children.some((child) => isBlock(child) || hasBlock(child))

const content = (node: Node) =>
  "children" in node
    ? node.children.filter(
        (child) =>
          !["comment", "expression"].includes(child.type) &&
          !(child.type === "text" && !child.value.trim()),
      )
    : []

const descendants = (node: Node): Node[] =>
  "children" in node
    ? node.children.flatMap((child) => [child, ...descendants(child)])
    : []

const onComponentPage = (file: string) =>
  file.startsWith("src/docs/components/") && !file.includes("/partials/")

const frameworkIn = (href: string) =>
  FRAMEWORK_IDS.find((id) => href === `/${id}` || href.startsWith(`/${id}/`))

test("a Conditional with block content renders a div", () => {
  expect(
    find((node) =>
      "name" in node &&
      node.name === "Conditional" &&
      conditionalTag(node) !== "div" &&
      hasBlock(node)
        ? `<Conditional as="${conditionalTag(node)}">`
        : undefined,
    ),
    'a Conditional renders a <span> (or the as tag), which can\'t hold blocks: set as="div" when its slots hold them',
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

test("links don't hard-code a framework", () => {
  expect(
    find((node) => {
      const raw = attribute(node, "href")
      const href =
        raw?.kind === "quoted" || raw?.kind === "template-literal"
          ? raw.value
          : raw?.kind === "expression"
            ? raw.value.match(/^\s*["'`](\/[^"'`$]*)/)?.[1]
            : undefined
      if (href && frameworkIn(href)) return `href="${href}"`
      const code =
        node.type === "frontmatter"
          ? node.value
          : "attributes" in node
            ? node.attributes
                .filter((attribute) => attribute.kind === "expression")
                .map((attribute) => attribute.value)
                .join("\n")
            : node.type === "expression"
              ? node.children
                  .map((child) => ("value" in child ? child.value : ""))
                  .join("")
              : ""
      const link = [...code.matchAll(/\blink\(\s*["'`](\/[^"'`]*)["'`]/g)].find(
        ([, target]) => frameworkIn(target),
      )
      return link ? `link("${link[1]}")` : undefined
    }),
    "link to the canonical path and let DocLink or Astro.locals.link add the reader's framework",
  ).toEqual([])
})

test("sections start with a heading that has an id", () => {
  expect(
    find((node, ancestors, file) => {
      if (!onComponentPage(file) || !("name" in node)) return
      if (node.name !== "section") return
      const level =
        2 +
        ancestors.filter((ancestor, index) => {
          const parent = ancestors[index - 1]
          const slot = quoted(ancestor, "slot") ?? ""
          return (
            ("name" in ancestor && ancestor.name === "section") ||
            (!!parent &&
              "name" in parent &&
              parent.name === "Component" &&
              (WRAPPED_SLOTS.has(slot) ||
                (slot === "installation" &&
                  !!attribute(parent, "installationTabs"))))
          )
        }).length
      const [first] = content(node)
      return first &&
        "name" in first &&
        first.name === `h${level}` &&
        quoted(first, "id")
        ? undefined
        : `<section> without a leading <h${level} id="...">`
    }),
    "the heading names the section in the table of contents and gives it an anchor",
  ).toEqual([])
})

test("examples sit in a section", () => {
  expect(
    find((node, ancestors, file) =>
      onComponentPage(file) &&
      "name" in node &&
      ["AutoExample", "Example"].includes(node.name) &&
      !ancestors.some((ancestor, index) => {
        const parent = ancestors[index - 1]
        return (
          ("name" in ancestor && ancestor.name === "section") ||
          (!!quoted(ancestor, "slot") &&
            "name" in parent &&
            parent.name === "Component")
        )
      })
        ? `<${node.name}> outside a <section>`
        : undefined,
    ),
    'put the example in a <section> that starts with its heading, usually <h2 id="basics">Basics</h2> for the first, or in a slot of the layout',
  ).toEqual([])
})

test("the anatomy slot holds only an Astro <Anatomy>", () => {
  const EXAMPLES = new Set([
    "AutoExample",
    "Code",
    "CodeGroup",
    "Conditional",
    "Example",
    "pre",
  ])
  expect(
    find((node, _, file) => {
      if (!onComponentPage(file) || quoted(node, "slot") !== "anatomy") return
      const subjects =
        "name" in node && node.name === "Fragment" ? content(node) : [node]
      const problems = subjects
        .filter((subject) => !("name" in subject) || subject.name !== "Anatomy")
        .map((subject) => ("name" in subject ? `<${subject.name}>` : "text"))
      for (const child of descendants(node)) {
        if (!("name" in child)) continue
        const slot = quoted(child, "slot") ?? ""
        if (
          EXAMPLES.has(child.name.split(".")[0]) ||
          FRAMEWORK_SLOTS.has(slot) ||
          /^(code|preview)-/.test(slot)
        ) {
          problems.push(`<${child.name}${slot ? ` slot="${slot}"` : ""}>`)
        }
      }
      return problems.length
        ? `the anatomy slot holds ${[...new Set(problems)].join(", ")}`
        : undefined
    }),
    "every framework page shows the same Astro subject: drop framework variants, examples and code",
  ).toEqual([])
})

const installationTabs = (value: string) =>
  ts
    .createSourceFile("tabs.ts", `(${value})`, ts.ScriptTarget.Latest)
    .statements.flatMap((statement) => {
      const found: ts.ObjectLiteralExpression[] = []
      const visit = (node: ts.Node) => {
        if (ts.isObjectLiteralExpression(node)) found.push(node)
        else ts.forEachChild(node, visit)
      }
      visit(statement)
      return found
    })
    .map((tab) => {
      const value = (key: string) =>
        tab.properties.find(
          (property): property is ts.PropertyAssignment =>
            ts.isPropertyAssignment(property) &&
            ts.isIdentifier(property.name) &&
            property.name.text === key,
        )?.initializer
      const title = value("title")
      return {
        dependency: value("isDependency")?.kind === ts.SyntaxKind.TrueKeyword,
        title: title && ts.isStringLiteral(title) ? title.text : undefined,
      }
    })

test("installationTabs mark the CSS that has its own page with isDependency", () => {
  expect(
    find((node, _, file) => {
      if (!("name" in node) || node.name !== "Component") return
      const page = file.match(/^src\/docs\/components\/([\w-]+)\.astro$/)?.[1]
      const tabs = attribute(node, "installationTabs")
      if (!page || tabs?.kind !== "expression") return
      const slug = quoted(node, "slug") ?? page
      const problems = installationTabs(tabs.value).flatMap(
        ({ dependency, title }) => {
          const target = title?.replace(/\.css$/, "")
          const own = !!target && target !== slug && PAGES.includes(target)
          if (own && !dependency) return [`${title} without isDependency`]
          if (!own && dependency) return [`${title} with isDependency`]
          return []
        },
      )
      return problems.length ? problems.join(", ") : undefined
    }),
    "set isDependency on a CSS file that has its own page, so Installation links it under Dependencies and that page lists this one under Used by, and only there",
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
