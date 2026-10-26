import { features } from "web-features"
import { existsSync, realpathSync } from "node:fs"
import { readdir, readFile } from "node:fs/promises"
import { join, basename } from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"
import { parseFragment } from "parse5"
import postcss from "postcss"

import { patterns } from "../packages/opui/scripts/features.mjs"
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
const apiDir = fileURLToPath(new URL("../src/component-api", import.meta.url))

const attribute = (element, name) =>
  element.attrs?.find((attr) => attr.name === name)?.value

export const HTML_FEATURES = [
  { id: "datalist", test: (element) => element.nodeName === "datalist" },
  {
    id: "details-name",
    test: (element) =>
      element.nodeName === "details" &&
      attribute(element, "name") !== undefined,
  },
  {
    id: "dialog-closedby",
    test: (element) =>
      element.nodeName === "dialog" &&
      attribute(element, "closedby") !== undefined,
  },
  {
    id: "interest-invokers",
    test: (element) => attribute(element, "interestfor") !== undefined,
  },
  {
    id: "invoker-commands",
    test: (element) => attribute(element, "commandfor") !== undefined,
  },
  {
    id: "popover",
    test: (element) => attribute(element, "popover") !== undefined,
  },
  {
    id: "popover-hint",
    test: (element) => attribute(element, "popover") === "hint",
  },
]

const DETECTED = new Set([...patterns, ...HTML_FEATURES].map(({ id }) => id))

const elementsOf = (node) => [
  ...(node.tagName ? [node] : []),
  ...[...(node.childNodes ?? []), ...(node.content?.childNodes ?? [])].flatMap(
    elementsOf,
  ),
]

export const htmlFeatureIds = (sources) => {
  const elements = sources.flatMap((source) =>
    elementsOf(parseFragment(source)),
  )
  return HTML_FEATURES.filter(({ test }) => elements.some(test)).map(
    ({ id }) => id,
  )
}

const widelyAvailable = (id) => features[id]?.status?.baseline === "high"

/** @param {{ available: Set<string>, ids: string[], ignored?: string[], used: Set<string> }} page */
export const pageProblems = ({ available, ids, ignored = [], used }) => {
  const listsWidelyAvailable = ids.some(widelyAvailable)
  return {
    missing: [...used]
      .filter(
        (id) =>
          !ids.includes(id) &&
          !ignored.includes(id) &&
          (!widelyAvailable(id) || listsWidelyAvailable),
      )
      .toSorted(),
    undetected: ids.filter((id) => !DETECTED.has(id)),
    unused: ids.filter(
      (id) => DETECTED.has(id) && !used.has(id) && !available.has(id),
    ),
  }
}

const kebab = (name) =>
  name.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase()

const readPages = async () => {
  const components = {}
  for (const file of (await readdir(componentsDir)).sort()) {
    if (!file.endsWith(".astro")) continue
    const content = await readFile(join(componentsDir, file), "utf-8")
    const match = content.match(/browserSupport=\{\[([\s\S]*?)\]\}/)
    components[basename(file, ".astro")] = match
      ? [...match[1].matchAll(/["']([^"']+)["']/g)].map((m) => m[1])
      : []
  }
  return components
}

const readApis = async () => {
  const pages = {}
  for (const folder of (await readdir(apiDir)).sort()) {
    const file = join(apiDir, folder, "api.ts")
    if (!existsSync(file)) continue
    const { default: api } = await import(pathToFileURL(file).href)
    const page = (pages[api.page ?? folder] ??= {
      classes: new Set(),
      stylesheets: new Set(),
    })
    for (const [name] of JSON.stringify(api).matchAll(/\.ui-[a-z0-9-]+/g)) {
      page.classes.add(name)
    }
    for (const sheet of api.css ?? (api.source ? [kebab(api.source)] : [])) {
      page.stylesheets.add(`${sheet}.css`)
    }
  }
  return pages
}

const withoutComments = (source, file) => {
  const root = postcss.parse(source, { from: file })
  root.walkComments((comment) => {
    comment.remove()
  })
  return root.toString()
}

const readCss = (files) =>
  Promise.all(
    files.map(async (file) =>
      withoutComments(await readFile(file, "utf-8"), file),
    ),
  ).then((sources) => sources.join("\n"))

const readExamples = async (name) => {
  const dir = join(examplesDir, name)
  const files = (await readdir(dir).catch(() => []))
    .filter((file) => file.endsWith(".html"))
    .sort()
  const sources = await Promise.all(
    files.map((file) => readFile(join(dir, file), "utf-8")),
  )
  return {
    elements:
      files.length === 0
        ? null
        : new Set([
            "body",
            "html",
            ...sources.flatMap((source) => [
              ...[...source.matchAll(/<([a-z][\w-]*)/gi)].map((m) =>
                m[1].toLowerCase(),
              ),
              ...[...source.matchAll(/\bclass="([^"]*)"/g)].flatMap((m) =>
                m[1].split(/\s+/).map((name) => `.${name}`),
              ),
            ]),
          ]),
    sources,
  }
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

const listMatches = (selector, parent, elements, typesOnly) =>
  splitList(selector).some((branch) =>
    branchMatches(branch, parent, elements, typesOnly),
  )

const branchMatches = (branch, parent, elements, typesOnly = false) => {
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
          ["has", "is", "where"].includes(name) &&
          !listMatches(inner, parent, elements, typesOnly || name === "has")
        ) {
          return false
        }
      }
    } else if (char === ".") {
      const end = Math.max(identEnd(branch, i + 1), i + 2)
      if (!typesOnly && !elements.has(branch.slice(i, end))) return false
      i = end
    } else if (char === "#" || char === "\\") {
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
    const atRules = []
    const rules = []
    const root = postcss.parse(source, { from: file })
    root.walkAtRules((atRule) => {
      const start = atRule.source.start.offset
      const body = source.indexOf("{", start)
      atRules.push({
        atRule,
        end: body === -1 ? atRule.source.end.offset : body,
        start,
      })
    })
    root.walkRules((rule) => {
      rules.push(rule)
    })
    parsed.set(file, { atRules, rules, source })
  }
  return parsed.get(file)
}

const atRuleApplies = (atRule, elements) => {
  const nested = []
  atRule.walkRules((rule) => {
    nested.push(rule)
  })
  if (nested.length > 0) {
    return nested.some((rule) => ruleApplies(rule, elements))
  }
  const parent = ancestorRule(atRule)
  return !parent || ruleApplies(parent, elements)
}

const usesFeature = ({ atRules, rules, source }, pattern, elements) => {
  if (!elements) return pattern.test(source)
  return [...source.matchAll(new RegExp(pattern.source, "g"))].some(
    ({ index }) => {
      const header = atRules.findLast(
        ({ end, start }) => start <= index && index < end,
      )
      if (header) return atRuleApplies(header.atRule, elements)
      const rule = rules.findLast(
        ({ source: { end, start } }) =>
          start.offset <= index && index < end.offset,
      )
      return !rule || ruleApplies(rule, elements)
    },
  )
}

const ignore = { accordion: ["marker"], badge: ["anchor-positioning"] }
const viaTheme = { typography: ["progress-function"] }

const report = (heading, entries) => {
  if (entries.length === 0) return
  console.error(heading)
  for (const entry of entries) console.error(`  ${entry}`)
}

const main = async () => {
  const components = await readPages()
  const apis = await readApis()
  const shared = await readCss(
    (await readdir(coreDir))
      .filter((file) => file.endsWith(".css"))
      .sort()
      .map((file) => join(coreDir, file)),
  )
  const sharedIds = patterns
    .filter(({ pattern }) => pattern.test(shared))
    .map(({ id }) => id)

  const missing = []
  const undetected = []
  const unused = []

  for (const [comp, ids] of Object.entries(components)) {
    const { elements, sources } = await readExamples(comp)
    const { classes = [], stylesheets = [] } = apis[comp] ?? {}
    const known = elements && new Set([...elements, ...classes])
    const css = await Promise.all(
      [...stylesheets].toSorted().map((file) => parseCss(join(cssDir, file))),
    )
    const problems = pageProblems({
      available: new Set([...sharedIds, ...(viaTheme[comp] ?? [])]),
      ids,
      ignored: ignore[comp],
      used: new Set([
        ...patterns
          .filter(({ pattern }) =>
            css.some((sheet) => usesFeature(sheet, pattern, known)),
          )
          .map(({ id }) => id),
        ...htmlFeatureIds(sources),
      ]),
    })
    missing.push(...problems.missing.map((id) => `${comp}: "${id}"`))
    undetected.push(...problems.undetected.map((id) => `${comp}: "${id}"`))
    unused.push(...problems.unused.map((id) => `${comp}: "${id}"`))
  }

  const unsorted = Object.entries(components)
    .filter(([, ids]) => ids.join() !== ids.toSorted().join())
    .map(([comp, ids]) => `${comp}: ${ids.toSorted().join(", ")}`)

  const unknown = Object.entries(components).flatMap(([comp, ids]) =>
    ids.filter((id) => !features[id]).map((id) => `${comp}: "${id}"`),
  )

  report(
    "browserSupport is missing ids that the page uses, in the stylesheets of its api.ts files (in rules whose selectors can match the elements of its HTML examples and the classes of those examples and api.ts files; inside :has() only the elements count) or in the HTML examples. A Baseline widely available feature only counts when the page lists one:",
    missing,
  )
  report(
    "browserSupport lists ids that neither the page's stylesheets nor its HTML examples use:",
    unused,
  )
  report(
    "browserSupport lists ids that nothing detects: add a pattern to packages/opui/scripts/features.mjs, or an HTML detector to HTML_FEATURES in scripts/check-browser-support.mjs:",
    undetected,
  )
  report("browserSupport is not sorted, expected:", unsorted)
  report("Unknown web-features ids in browserSupport:", unknown)

  if (
    missing.length +
      undetected.length +
      unused.length +
      unsorted.length +
      unknown.length >
    0
  ) {
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
}

if (
  process.argv[1] &&
  realpathSync(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  await main()
}
