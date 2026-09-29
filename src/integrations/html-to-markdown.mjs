import rehypeParse from "rehype-parse"
import rehypeRemark from "rehype-remark"
import remarkGfm from "remark-gfm"
import remarkStringify from "remark-stringify"
import { unified } from "unified"
import { select, selectAll } from "hast-util-select"

const REMOVE_SELECTORS = [
  ".component-footer",
  ".controls",
  ".example-preview",
  ".header-anchor",
  ".theme-generator",
  "h1 .ui-anchor-floating",
  "[data-panel='output']",
  "[data-tab='output']",
  "[role='tab']",
  "button",
  "input",
  "script",
  "section:has(> #changelog)",
  "style",
  "svg",
  "template",
]

const parser = unified().use(rehypeParse)
const toMarkdown = unified()
  .use(rehypeRemark)
  .use(remarkGfm)
  .use(remarkStringify, { bullet: "-", fences: true, rule: "-" })

const textContent = (node) =>
  node.type === "text"
    ? node.value
    : (node.children ?? []).map(textContent).join("")

const element = (tagName, properties, children) => ({
  type: "element",
  tagName,
  properties,
  children,
})

const text = (value) => ({ type: "text", value })

function prune(node, removed) {
  if (!node.children) return
  node.children = node.children.filter(
    (child) => child.type !== "comment" && !removed.has(child),
  )
  node.children.forEach((child) => prune(child, removed))
}

function replace(node, test, build) {
  if (!node.children) return
  node.children = node.children.map((child) =>
    child.type === "element" && test(child) ? build(child) : child,
  )
  node.children.forEach((child) => replace(child, test, build))
}

const isClass = (name) => (node) =>
  (node.properties?.className ?? []).includes(name)

const codeBlock = (node) => {
  const pre = select("pre", node)
  const lang = pre?.properties?.dataLanguage
  const lines = selectAll(".ec-line", node).map((line) =>
    textContent(line).replace(/(["'])@opui\//g, "$1opui-css/"),
  )
  return element("pre", {}, [
    element("code", { className: lang ? [`language-${lang}`] : [] }, [
      text(lines.join("\n")),
    ]),
  ])
}

const codeGroup = (node) => {
  const labels = selectAll("[role='tab']", node).map((tab) =>
    textContent(tab).trim(),
  )
  const blocks = selectAll(".expressive-code", node)
  return element(
    "div",
    {},
    labels.flatMap((label, i) => [
      element("p", {}, [element("code", {}, [text(label)])]),
      ...(blocks[i] ? [codeBlock(blocks[i])] : []),
    ]),
  )
}

const detailsSummary = (node) =>
  element("p", {}, [element("strong", {}, node.children)])

const actionRow = (node) =>
  element(
    "p",
    {},
    node.children
      .filter((child) => child.type === "element")
      .flatMap((child, i) => (i ? [text(" · "), child] : [child])),
  )

const ENGINES = { chromium: "Chromium", gecko: "Firefox", webkit: "Safari" }

const browserSupport = (node) =>
  element(
    "ul",
    {},
    selectAll("[popover][id^='browser-support-']", node).map((popover) => {
      const engine = String(popover.properties.id).split("-")[2]
      const summary = popover.children
        .filter((part) => part.type === "element")
        .map((part) => textContent(part).trim())
        .join(" ")
      return element("li", {}, [
        text(`${ENGINES[engine] ?? engine}: ${summary}`),
      ])
    }),
  )

const baselineFeatures = (data) => () =>
  element("section", {}, [
    element("h2", {}, [text("Features by component")]),
    element(
      "ul",
      {},
      Object.entries(data.componentToFeatures)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([component, features]) =>
          element("li", {}, [
            text(`${component}: `),
            ...[...features]
              .sort()
              .flatMap((feature, i) => [
                ...(i ? [text(", ")] : []),
                element("code", {}, [text(feature)]),
              ]),
          ]),
        ),
    ),
  ])

export const parseHtml = (html) => parser.parse(html)

export function pageMeta(tree) {
  const refresh = select("meta[http-equiv='refresh']", tree)
  const description = select("meta[name='description']", tree)
  const h1 = select("#main-content h1", tree) ?? select("h1", tree)
  const title = h1 && structuredClone(h1)
  if (title) prune(title, new Set(selectAll(".ui-anchor-floating", title)))
  return {
    description: String(description?.properties?.content ?? "")
      .replace(/\s+/g, " ")
      .trim(),
    isRedirect: !!refresh,
    title: title ? textContent(title).trim() : "",
  }
}

export async function articleToMarkdown(
  tree,
  { omitInstallationCode = false, rewriteHref },
) {
  const source = select("#main-content > article", tree)
  if (!source) return null
  const article = structuredClone(source)

  if (omitInstallationCode) {
    prune(
      article,
      new Set(
        selectAll("section:has(> #installation) .expressive-code", article),
      ),
    )
  }

  const hgroup = select("#main-heading", article)
  const h1 = hgroup && select("h1", hgroup)
  if (h1) hgroup.children = hgroup.children.slice(hgroup.children.indexOf(h1))

  prune(
    article,
    new Set(
      article.children.filter(
        (child) =>
          child.type === "element" && isClass("browser-support-chips")(child),
      ),
    ),
  )
  const baseline = select("#baseline-data", tree)
  if (baseline) {
    replace(
      article,
      isClass("filter-section"),
      baselineFeatures(JSON.parse(textContent(baseline))),
    )
  }
  replace(article, isClass("browser-support-chips"), browserSupport)
  replace(article, isClass("code-group"), codeGroup)
  replace(article, isClass("expressive-code"), codeBlock)
  replace(article, (node) => node.tagName === "summary", detailsSummary)
  replace(article, isClass("ui-actions"), actionRow)
  prune(article, new Set(selectAll(REMOVE_SELECTORS.join(", "), article)))

  for (const link of selectAll("a[href]", article)) {
    link.properties.href = rewriteHref(String(link.properties.href))
  }

  const mdast = await toMarkdown.run({ type: "root", children: [article] })
  return toMarkdown.stringify(mdast).trim()
}
