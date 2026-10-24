import { features } from "web-features"
import { access, readdir, readFile } from "node:fs/promises"
import { join, basename } from "node:path"
import { fileURLToPath } from "node:url"
import postcss from "postcss"

import { computeBrowserSupport } from "../src/utils/browser-support.ts"

const componentsDir = fileURLToPath(
  new URL("../src/docs/components", import.meta.url),
)
const cssDir = fileURLToPath(
  new URL("../packages/opui/css/components", import.meta.url),
)
const examplesDir = fileURLToPath(
  new URL("../src/component-examples", import.meta.url),
)
const coreDir = fileURLToPath(new URL("../packages/opui/core", import.meta.url))

const patterns = [
  { id: "anchor-positioning", pattern: /\b(anchor-name|position-anchor):/ },
  { id: "color-mix", pattern: /color-mix\(/ },
  { id: "container-scroll-state-queries", pattern: /scroll-state\(/ },
  { id: "container-style-queries", pattern: /@container style\(/ },
  { id: "corner-shape", pattern: /corner-shape:/ },
  { id: "dir-pseudo", pattern: /:dir\(/ },
  {
    id: "display-animation",
    pattern: /\b(?:content-visibility|display)\s[^,;]*allow-discrete/,
  },
  { id: "field-sizing", pattern: /field-sizing:/ },
  { id: "has", pattern: /:has\(/ },
  { id: "light-dark", pattern: /light-dark\(/ },
  { id: "progress-function", pattern: /\bprogress\(/ },
  { id: "relative-color", pattern: /\(\s*from\s/ },
  { id: "scrollbar-gutter", pattern: /scrollbar-gutter:/ },
  { id: "user-pseudos", pattern: /:user-(?:in)?valid\b/ },
]

const STYLESHEET = /@opui\/css\/components\/([\w-]+\.css)\?raw/g

const files = await readdir(componentsDir)
const components = {}
const stylesheets = {}

for (const file of files.sort()) {
  if (!file.endsWith(".astro")) continue
  const name = basename(file, ".astro")
  const content = await readFile(join(componentsDir, file), "utf-8")
  const match = content.match(/browserSupport=\{\[([\s\S]*?)\]\}/)
  if (!match) continue
  const ids = [...match[1].matchAll(/["']([^"']+)["']/g)].map((m) => m[1])
  if (ids.length === 0) continue
  components[name] = ids
  stylesheets[name] = [
    ...new Set([...content.matchAll(STYLESHEET)].map((m) => m[1])),
  ].sort()
}

const readCss = (files) =>
  Promise.all(
    files.map((file) =>
      access(file).then(
        () => readFile(file, "utf-8"),
        () => "",
      ),
    ),
  ).then((sources) => sources.join("\n"))

const shared = await readCss(
  (await readdir(coreDir))
    .filter((file) => file.endsWith(".css"))
    .sort()
    .map((file) => join(coreDir, file)),
)

const exampleElements = async (name) => {
  const dir = join(examplesDir, name)
  const files = (await readdir(dir).catch(() => []))
    .filter((file) => file.endsWith(".html"))
    .sort()
  if (files.length === 0) return null
  const sources = await Promise.all(
    files.map((file) => readFile(join(dir, file), "utf-8")),
  )
  return new Set([
    "body",
    "html",
    ...sources.flatMap((source) =>
      [...source.matchAll(/<([a-z][\w-]*)/gi)].map((m) => m[1].toLowerCase()),
    ),
  ])
}

const IDENT = /(?:[\w-]|\\.)+/y

const identEnd = (selector, start) => {
  IDENT.lastIndex = start
  return IDENT.test(selector) ? IDENT.lastIndex : start
}

const groupEnd = (selector, start) => {
  let depth = 0
  let quote = ""
  for (let i = start; i < selector.length; i++) {
    const char = selector[i]
    if (char === "\\") i++
    else if (quote) {
      if (char !== quote) continue
      quote = ""
      if (depth === 0) return i + 1
    } else if (char === '"' || char === "'") quote = char
    else if (char === "(" || char === "[") depth++
    else if ((char === ")" || char === "]") && --depth === 0) return i + 1
  }
  return selector.length
}

const splitList = (selector) => {
  const branches = []
  let start = 0
  for (let i = 0; i < selector.length; i++) {
    const char = selector[i]
    if (char === "\\") i++
    else if ("\"'([".includes(char)) i = groupEnd(selector, i) - 1
    else if (char === ",") {
      branches.push(selector.slice(start, i))
      start = i + 1
    }
  }
  return [...branches, selector.slice(start)]
}

const listMatches = (selector, parent, elements) =>
  splitList(selector).some((branch) => branchMatches(branch, parent, elements))

const branchMatches = (branch, parent, elements) => {
  let compoundStart = true
  for (let i = 0; i < branch.length;) {
    const char = branch[i]
    if (/[\s>+~]/.test(char)) {
      compoundStart = true
      i++
      continue
    }
    const typeAllowed = compoundStart
    compoundStart = false
    if (char === "&") {
      if (!parent) return false
      i++
    } else if (char === "[" || char === '"' || char === "'") {
      i = groupEnd(branch, i)
    } else if (char === ":") {
      const colons = branch[i + 1] === ":" ? 2 : 1
      const nameEnd = identEnd(branch, i + colons)
      const name = branch.slice(i + colons, nameEnd).toLowerCase()
      i = nameEnd
      if (branch[i] === "(") {
        const end = groupEnd(branch, i)
        const inner = branch.slice(i + 1, end - 1)
        i = end
        if (
          colons === 1 &&
          (name === "is" || name === "where") &&
          !listMatches(inner, parent, elements)
        ) {
          return false
        }
      }
    } else if (char === "." || char === "#" || char === "\\") {
      i = Math.max(identEnd(branch, i + 1), i + 2)
    } else if (/[\w-]/.test(char)) {
      const end = identEnd(branch, i)
      if (typeAllowed && !elements.has(branch.slice(i, end).toLowerCase())) {
        return false
      }
      i = end
    } else {
      i++
    }
  }
  return true
}

const ancestorRule = (node) => {
  for (let ancestor = node.parent; ancestor; ancestor = ancestor.parent) {
    if (ancestor.type === "rule") return ancestor
  }
  return null
}

const inKeyframes = (node) => {
  for (let ancestor = node.parent; ancestor; ancestor = ancestor.parent) {
    if (ancestor.type === "atrule" && /keyframes$/i.test(ancestor.name)) {
      return true
    }
  }
  return false
}

const ruleApplies = (rule, elements) => {
  if (inKeyframes(rule)) return true
  const parentRule = ancestorRule(rule)
  const parent = parentRule ? ruleApplies(parentRule, elements) : true
  return splitList(rule.selector).some(
    (branch) =>
      branchMatches(branch, parent, elements) &&
      (parent || branch.includes("&")),
  )
}

const parsed = new Map()

const parseCss = async (file) => {
  if (!parsed.has(file)) {
    const source = await readCss([file])
    const rules = []
    postcss.parse(source, { from: file }).walkRules((rule) => {
      rules.push(rule)
    })
    parsed.set(file, { rules, source })
  }
  return parsed.get(file)
}

const usesFeature = ({ rules, source }, pattern, elements) => {
  if (!elements) return pattern.test(source)
  return [...source.matchAll(new RegExp(pattern.source, "g"))].some(
    ({ index }) => {
      const rule = rules.findLast(
        ({ source: { end, start } }) =>
          start.offset <= index && index < end.offset,
      )
      return !rule || ruleApplies(rule, elements)
    },
  )
}

const missing = []
const unused = []
const ignore = { badge: ["anchor-positioning"] }

for (const [comp, ids] of Object.entries(components)) {
  const elements = await exampleElements(comp)
  const css = await Promise.all(
    stylesheets[comp].map((file) => parseCss(join(cssDir, file))),
  )
  for (const { id, pattern } of patterns) {
    const used = css.some((sheet) => usesFeature(sheet, pattern, elements))
    if (used && !ids.includes(id) && !ignore[comp]?.includes(id)) {
      missing.push(`${comp}: "${id}"`)
    }
    if (ids.includes(id) && !used && !pattern.test(shared)) {
      unused.push(`${comp}: "${id}"`)
    }
  }
}

if (missing.length > 0) {
  console.warn("browserSupport is missing ids that the page's stylesheets use:")
  for (const entry of missing) console.warn(`  ${entry}`)
}

if (unused.length > 0) {
  console.warn(
    "browserSupport lists ids that no stylesheet the page installs uses:",
  )
  for (const entry of unused) console.warn(`  ${entry}`)
}

const unknown = Object.entries(components).flatMap(([comp, ids]) =>
  ids.filter((id) => !features[id]).map((id) => `${comp}: "${id}"`),
)
if (unknown.length > 0) {
  console.error("Unknown web-features ids in browserSupport:")
  for (const entry of unknown) console.error(`  ${entry}`)
  process.exit(1)
}

const partials = Object.entries(components).flatMap(([comp, ids]) =>
  computeBrowserSupport(ids)
    .filter((entry) => entry.level === "partial")
    .map((entry) => ({
      browser: entry.browser,
      comp,
      supported: entry.supportedFeatures,
      unsupported: entry.unsupportedFeatures,
    })),
)

if (partials.length === 0) {
  console.log("No components have partial support in any browser.")
} else {
  console.log("Components with PARTIAL support:")
  for (const p of partials) {
    console.log(
      `  ${p.comp.padEnd(20)} ${p.browser.padEnd(8)} missing: [${p.unsupported.join(", ")}]  (has: [${p.supported.join(", ")}])`,
    )
  }
}
