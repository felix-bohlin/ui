// @ts-check
import rehypeParse from "rehype-parse"
import rehypeRemark from "rehype-remark"
import remarkGfm from "remark-gfm"
import remarkStringify from "remark-stringify"
import { unified } from "unified"
import { select, selectAll } from "hast-util-select"

/** @typedef {NonNullable<Parameters<typeof select>[1]>} Nodes */
/** @typedef {NonNullable<ReturnType<typeof select>>} Element */
/** @typedef {Element["children"][number]} ElementContent */
/** @typedef {Extract<Nodes, { type: "root" }>} Root */
/** @typedef {Extract<Nodes, { type: "text" }>} Text */

const REMOVE_SELECTORS = [
  "#changelog-list",
  ".build-up-knobs",
  ".build-up-stage",
  ".build-up-steps legend",
  ".component-footer",
  ".controls",
  ".example-preview",
  ".guide-footer",
  ".header-anchor",
  ".theme-generator",
  ".ui-tab-label",
  "h1 .ui-anchor-floating",
  "[data-panel='output']",
  "[data-tab='output']",
  "button",
  "input",
  "script",
  "section:has(> #changelog):not(:has(.whats-new))",
  "style",
  "svg",
  "template",
]

const parser = unified().use(rehypeParse)
const toMarkdown = unified()
  .use(rehypeRemark)
  .use(remarkGfm)
  .use(remarkStringify, { bullet: "-", fences: true, rule: "-" })

/**
 * @param {Nodes} node
 * @returns {string}
 */
const textContent = (node) =>
  node.type === "text"
    ? node.value
    : ("children" in node ? node.children : []).map(textContent).join("")

/**
 * @param {string} tagName
 * @param {Element["properties"]} properties
 * @param {ElementContent[]} children
 * @returns {Element}
 */
const element = (tagName, properties, children) => ({
  type: "element",
  tagName,
  properties,
  children,
})

/**
 * @param {string} value
 * @returns {Text}
 */
const text = (value) => ({ type: "text", value })

/**
 * @param {ElementContent} node
 * @param {Set<Nodes>} removed
 */
function prune(node, removed) {
  if (node.type !== "element") return
  node.children = node.children.filter(
    (child) => child.type !== "comment" && !removed.has(child),
  )
  node.children.forEach((child) => prune(child, removed))
}

/**
 * @param {ElementContent} node
 * @param {(node: Element) => boolean} test
 * @param {(node: Element) => ElementContent} build
 */
function replace(node, test, build) {
  if (node.type !== "element") return
  node.children = node.children.map((child) =>
    child.type === "element" && test(child) ? build(child) : child,
  )
  node.children.forEach((child) => replace(child, test, build))
}

/**
 * @param {string} name
 * @returns {(node: Element) => boolean}
 */
const isClass = (name) => (node) => {
  const className = node.properties?.className
  return Array.isArray(className) && className.includes(name)
}

/**
 * @param {ElementContent} node
 * @param {(node: Element) => boolean} test
 */
function unwrapTemplates(node, test) {
  if (node.type !== "element") return
  node.children = node.children.flatMap((child) =>
    child.type === "element" && child.tagName === "template" && test(child)
      ? /** @type {ElementContent[]} */ (child.content?.children ?? [])
      : [child],
  )
  node.children.forEach((child) => unwrapTemplates(child, test))
}

/** @param {Element} node */
const codeBlock = (node) => {
  const lang = node.properties?.dataLanguage
  const code = textContent(select("code", node) ?? node)
  return element("pre", {}, [
    element("code", { className: lang ? [`language-${lang}`] : [] }, [
      text(code),
    ]),
  ])
}

/** @param {Element} node */
const codeGroup = (node) => {
  const labels = selectAll(".ui-tab-label", node).map((tab) =>
    textContent(tab).trim(),
  )
  const blocks = selectAll(".code-block", node)
  return element(
    "div",
    {},
    labels.flatMap((label, i) => [
      element("p", {}, [element("code", {}, [text(label)])]),
      ...(blocks[i] ? [codeBlock(blocks[i])] : []),
    ]),
  )
}

/** @param {Element} node */
const installationGroup = (node) => {
  /** @type {Element[]} */
  const children = []
  for (const tab of selectAll(".ui-tab-label", node)) {
    const label = textContent(tab).trim()
    if (!/^[\w-]+\.css$/.test(label)) {
      children.push(element("p", {}, [element("code", {}, [text(label)])]))
      continue
    }
    const item = element("li", {}, [
      element("code", {}, [text(`opui-css/css/components/${label}`)]),
    ])
    const last = children.at(-1)
    if (last?.tagName === "ul") last.children.push(item)
    else children.push(element("ul", {}, [item]))
  }
  return element("div", {}, children)
}

/** @type {Record<string, string>} */
const ENGINES = { chromium: "Chromium", gecko: "Firefox", webkit: "Safari" }

/** @param {Element} node */
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

/**
 * @param {string} selector
 * @param {Element} node
 */
const required = (selector, node) =>
  /** @type {Element} */ (select(selector, node))

/** @param {Element} node */
const featureSupport = (node) =>
  element(
    "ul",
    {},
    selectAll("li", node).map((item) => {
      const status = textContent(required(".feature-support-status", item))
      const browsers = selectAll("dl > div", item).map((row) => {
        const version = textContent(required("dd", row)).trim()
        return `${textContent(required("dt", row)).trim()} ${version === "No" ? "not supported" : `${version}+`}`
      })
      return element("li", {}, [
        required("a", item),
        text(` (${status.trim()}): ${browsers.join(", ")}`),
      ])
    }),
  )

/** @param {{ componentToFeatures: Record<string, string[]> }} data */
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

/** @param {string} html */
export const parseHtml = (html) => parser.parse(html)

/** @param {Root} tree */
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

/**
 * @param {Root} tree
 * @param {{ omitInstallationCode?: boolean, rewriteHref: (href: string) => string }} options
 */
export async function articleToMarkdown(
  tree,
  { omitInstallationCode = false, rewriteHref },
) {
  const source = select("#main-content > article", tree)
  if (!source) return null
  const article = structuredClone(source)
  unwrapTemplates(article, isClass("example-code"))

  if (omitInstallationCode) {
    const installation = select("section:has(> #installation)", article)
    if (installation) {
      prune(installation, new Set(selectAll(".code-block", installation)))
      replace(installation, isClass("code-group"), installationGroup)
    }
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
  replace(article, isClass("feature-support"), featureSupport)
  replace(article, isClass("code-group"), codeGroup)
  replace(article, isClass("code-block"), codeBlock)
  prune(article, new Set(selectAll(REMOVE_SELECTORS.join(", "), article)))

  for (const link of selectAll("a[href]", article)) {
    link.properties.href = rewriteHref(String(link.properties.href))
  }

  const mdast = await toMarkdown.run({ type: "root", children: [article] })
  return toMarkdown.stringify(mdast).trim()
}
