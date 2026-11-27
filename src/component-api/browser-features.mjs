import { parseFragment } from "parse5"
import postcss from "postcss"

import { patterns } from "../../packages/opui/scripts/features.mjs"

const attribute = (element, name) =>
  element.attrs?.find((attr) => attr.name === name)?.value

const HTML_FEATURES = [
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

export const withoutComments = (source, file) => {
  const root = postcss.parse(source, { from: file })
  root.walkComments((comment) => {
    comment.remove()
  })
  return root.toString()
}

const exampleElements = (sources) =>
  sources.length === 0
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
      ])

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

const scopeRoot = (node) => {
  for (let ancestor = node.parent; ancestor; ancestor = ancestor.parent) {
    if (ancestor.type === "atrule" && ancestor.name === "scope") {
      const params = ancestor.params.trim()
      return params.startsWith("(")
        ? params.slice(1, groupEnd(params, 0) - 1)
        : undefined
    }
  }
  return undefined
}

const branchApplies = (rule, branch, elements) => {
  if (inKeyframes(rule)) return true
  const root = scopeRoot(rule)
  if (root !== undefined && !listMatches(root, true, elements)) return false
  const parentRule = ancestorRule(rule)
  const parent = parentRule ? ruleApplies(parentRule, elements) : true
  return (
    branchMatches(branch, parent, elements) && (parent || branch.includes("&"))
  )
}

const ruleApplies = (rule, elements) =>
  inKeyframes(rule) ||
  splitList(rule.selector).some((branch) =>
    branchApplies(rule, branch, elements),
  )

const parseSource = (source, file) => {
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
  const tries = []
  root.walkAtRules("position-try", (atRule) => {
    tries.push([atRule.source.start.offset, atRule.source.end.offset])
  })
  return { atRules, rules, source, tries }
}

const parsed = new Map()

const parseCss = (source, file) => {
  if (!parsed.has(source)) {
    parsed.set(source, parseSource(withoutComments(source, file), file))
  }
  return parsed.get(source)
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

const usesFeature = ({ atRules, rules, source, tries }, pattern, elements) => {
  if (!elements) return pattern.test(source)
  return [...source.matchAll(new RegExp(pattern.source, "g"))].some(
    ({ index }) => {
      if (tries.some(([start, end]) => start <= index && index < end)) {
        return false
      }
      const header = atRules.findLast(
        ({ end, start }) => start <= index && index < end,
      )
      if (header) return atRuleApplies(header.atRule, elements)
      const rule = rules.findLast(
        ({ source: { end, start } }) =>
          start.offset <= index && index < end.offset,
      )
      if (!rule) return true
      const start = rule.source.start.offset
      const prelude = source.slice(start, source.indexOf("{", start))
      if (index >= start + prelude.length) return ruleApplies(rule, elements)
      let offset = start
      const branch = splitList(prelude).find((part) => {
        offset += part.length + 1
        return index < offset
      })
      return branchApplies(rule, branch.trim(), elements)
    },
  )
}

export const usedFeatureIds = (source, elements) => {
  const sheet = parseSource(source, "sample.css")
  return patterns
    .filter(({ pattern }) => usesFeature(sheet, pattern, elements))
    .map(({ id }) => id)
}

export const detectedFeatureIds = ({ classes, examples, stylesheets }) => {
  const elements = exampleElements(examples)
  const known = elements && new Set([...elements, ...classes])
  const sheets = stylesheets.map(({ file, source }) => parseCss(source, file))
  return [
    ...new Set([
      ...patterns
        .filter(({ pattern }) =>
          sheets.some((sheet) => usesFeature(sheet, pattern, known)),
        )
        .map(({ id }) => id),
      ...htmlFeatureIds(examples),
    ]),
  ].toSorted()
}

export const withExceptions = (detected, exceptions) =>
  [...new Set([...detected, ...(exceptions?.core ?? [])])]
    .filter((id) => !exceptions?.ignore?.includes(id))
    .toSorted()
