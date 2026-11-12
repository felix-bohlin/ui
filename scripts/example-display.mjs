import { readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { fileURLToPath } from "node:url"
import postcss from "postcss"

const root = fileURLToPath(new URL("..", import.meta.url))
const componentCssDir = join(root, "packages/opui/css/components")
const coreCssDir = join(root, "packages/opui/core")
const layersFile = join(root, "packages/opui/css/layers.css")

const CORE_CSS = ["normalize.css", "utils.css"]

const EXAMPLE_LAYOUT_CSS = join(root, "src/styles/example-layout.css")

export const UA_CSS = `
area, base, datalist, head, link, meta, noembed, noframes, param, rp, script, style, template, title { display: none }
address, article, aside, blockquote, center, details, dialog, dir, div, dl, dd, dt, fieldset, figcaption, figure, footer, form, h1, h2, h3, h4, h5, h6, header, hgroup, hr, legend, listing, main, menu, nav, ol, optgroup, option, p, plaintext, pre, search, section, ul, xmp { display: block }
li, summary { display: list-item }
table { display: table }
caption { display: table-caption }
colgroup { display: table-column-group }
col { display: table-column }
thead { display: table-header-group }
tbody { display: table-row-group }
tfoot { display: table-footer-group }
tr { display: table-row }
td, th { display: table-cell }
button, input, marquee, meter, progress, select, textarea { display: inline-block }
ruby { display: ruby }
rt { display: ruby-text }
slot { display: contents }
[hidden]:not([hidden="until-found" i]), dialog:not([open]), [popover]:not(:popover-open):not(dialog[open]) { display: none }
listing, plaintext, pre, xmp { white-space: pre }
textarea { white-space: pre-wrap }
q::before { content: open-quote }
q::after { content: close-quote }
`

export const REPLACED = new Map([
  ["audio", "flow"],
  ["canvas", "flow"],
  ["embed", "flow"],
  ["iframe", "flow"],
  ["img", "flow"],
  ["input", "flow"],
  ["object", "flow"],
  ["select", "items"],
  ["svg", "svg"],
  ["textarea", "flow"],
  ["video", "flow"],
])

const SVG_TEXT_ROOTS = new Set(["desc", "foreignObject", "text", "title"])
const SVG_TEXT_INLINES = new Set(["a", "textPath", "tspan"])
export const SVG_NAMESPACE = "http://www.w3.org/2000/svg"

const OUTER = { block: "block", inline: "inline" }

export const parseDisplay = (value) => {
  const keywords = value.trim().toLowerCase().split(/\s+/).join(" ")
  const table = {
    block: ["block", "flow"],
    "block flex": ["block", "flex"],
    "block flow": ["block", "flow"],
    "block flow-root": ["block", "flow"],
    "block grid": ["block", "grid"],
    "block table": ["block", "table"],
    contents: ["contents", "inline"],
    flex: ["block", "flex"],
    "flow-root": ["block", "flow"],
    grid: ["block", "grid"],
    inline: ["inline", "inline"],
    "inline flex": ["atomic", "flex"],
    "inline flow": ["inline", "inline"],
    "inline flow-root": ["atomic", "flow"],
    "inline grid": ["atomic", "grid"],
    "inline table": ["atomic", "table"],
    "inline-block": ["atomic", "flow"],
    "inline-flex": ["atomic", "flex"],
    "inline-grid": ["atomic", "grid"],
    "inline-table": ["atomic", "table"],
    "list-item": ["block", "flow"],
    none: ["none", "flow"],
    ruby: ["inline", "inline"],
    "ruby-text": ["inline", "inline"],
    table: ["block", "table"],
    "table-caption": ["block", "flow"],
    "table-cell": ["block", "flow"],
    "table-column": ["block", "table"],
    "table-column-group": ["block", "table"],
    "table-footer-group": ["block", "table"],
    "table-header-group": ["block", "table"],
    "table-row": ["block", "table"],
    "table-row-group": ["block", "table"],
  }
  if (!table[keywords]) {
    throw new Error(
      `display: ${value}, which the display model in scripts/example-display.mjs doesn't know`,
    )
  }
  const [outer, inner] = table[keywords]
  return { inner, outer }
}

export const preserves = (whiteSpace) =>
  /^(pre|pre-wrap|pre-line|break-spaces|preserve)/.test(whiteSpace)

const balanced = (text, open) => {
  let depth = 0
  for (let index = open; index < text.length; index++) {
    if (text[index] === "(") depth++
    if (text[index] === ")" && --depth === 0) {
      return text.slice(open + 1, index)
    }
  }
  throw new Error(`unbalanced parentheses in ${text}`)
}

const PSEUDO_ELEMENT = /::|:(after|before|first-letter|first-line|marker)\b/

const GENERATED = /^(.*?)::?(after|before)$/

const PROPERTIES = ["content", "display", "position", "white-space"]

const nest = (selectors, parents) =>
  parents === undefined
    ? selectors
    : selectors.map((selector) =>
        selector.includes("&")
          ? selector.replaceAll("&", `:is(${parents.join(", ")})`)
          : `:is(${parents.join(", ")}) ${selector}`,
      )

const layerOrder = () => {
  const statement = postcss
    .parse(readFileSync(layersFile, "utf8"))
    .nodes.find((node) => node.type === "atrule" && node.name === "layer")
  return statement.params.split(",").map((name) => name.trim())
}

const COMBINATORS = new Set([" ", ">", "+", "~"])

export const splitTopLevel = (text, separator) => {
  const parts = []
  let depth = 0
  let quote = ""
  let start = 0
  for (let index = 0; index < text.length; index++) {
    const character = text[index]
    if (quote) {
      if (character === "\\") index++
      else if (character === quote) quote = ""
    } else if (character === '"' || character === "'") quote = character
    else if (character === "(" || character === "[") depth++
    else if (character === ")" || character === "]") depth--
    else if (character === separator && depth === 0) {
      parts.push(text.slice(start, index))
      start = index + 1
    }
  }
  parts.push(text.slice(start))
  return parts.map((part) => part.trim()).filter(Boolean)
}

const IDENTIFIER = /^-?(?:[\w-]|\\.)+/

const parseCompound = (text) => {
  const simples = []
  let rest = text
  const take = (pattern) => {
    const match = pattern.exec(rest)
    if (!match)
      throw new Error(`the selector ${text} has a part the matcher can't read`)
    rest = rest.slice(match[0].length)
    return match[0]
  }
  if (rest.startsWith("*")) {
    rest = rest.slice(1)
  } else if (IDENTIFIER.test(rest)) {
    simples.push({ name: take(IDENTIFIER).toLowerCase(), type: "type" })
  }
  while (rest) {
    const sigil = rest[0]
    rest = rest.slice(1)
    if (sigil === ".") simples.push({ name: take(IDENTIFIER), type: "class" })
    else if (sigil === "#") simples.push({ name: take(IDENTIFIER), type: "id" })
    else if (sigil === "[") {
      let depth = 1
      let quote = ""
      let index = 0
      for (; index < rest.length && depth > 0; index++) {
        const character = rest[index]
        if (quote) {
          if (character === quote) quote = ""
        } else if (character === '"' || character === "'") quote = character
        else if (character === "]") depth--
      }
      const inside = rest.slice(0, index - 1).trim()
      rest = rest.slice(index)
      const match =
        /^([\w:-]+)\s*(?:([~|^$*]?=)\s*("[^"]*"|'[^']*'|[^\s\]]+)\s*([is])?)?$/.exec(
          inside,
        )
      if (!match)
        throw new Error(`the attribute selector [${inside}] can't be read`)
      const [, name, operator, raw, flag] = match
      simples.push({
        flag,
        name: name.toLowerCase(),
        operator,
        type: "attribute",
        value: raw?.replace(/^(["'])(.*)\1$/, "$2"),
      })
    } else if (sigil === ":") {
      const name = take(/^[\w-]+/).toLowerCase()
      let argument
      if (rest.startsWith("(")) {
        argument = balanced(rest, 0)
        rest = rest.slice(argument.length + 2)
      }
      simples.push({
        argument:
          name === "has"
            ? splitTopLevel(argument, ",").map((part) =>
                parseComplex(part, true),
              )
            : ["is", "not", "where"].includes(name)
              ? parseSelectorList(argument)
              : argument,
        name,
        type: "pseudo",
      })
    } else {
      throw new Error(`the selector ${text} has a part the matcher can't read`)
    }
  }
  return simples
}

const parseComplex = (text, relative = false) => {
  const steps = []
  let compound = ""
  let combinator = relative ? " " : undefined
  let depth = 0
  let quote = ""
  const push = () => {
    if (!compound) return
    steps.push({ combinator, compound: parseCompound(compound) })
    compound = ""
    combinator = undefined
  }
  for (let index = 0; index < text.length; index++) {
    const character = text[index]
    if (quote) {
      compound += character
      if (character === quote) quote = ""
      continue
    }
    if (character === '"' || character === "'") quote = character
    if (character === "(" || character === "[") depth++
    if (character === ")" || character === "]") depth--
    if (depth === 0 && (COMBINATORS.has(character) || /\s/.test(character))) {
      push()
      const symbol = /\s/.test(character) ? " " : character
      if (combinator === undefined || combinator === " ") combinator = symbol
      continue
    }
    compound += character
  }
  push()
  if (!relative) steps[0].combinator = undefined
  return steps
}

export const parseSelectorList = (text) =>
  splitTopLevel(text, ",").map((part) => parseComplex(part))

const ID = 1_000_000
const CLASS = 1_000
const TYPE = 1

const compoundSpecificity = (compound) =>
  compound.reduce((total, simple) => {
    if (simple.type === "id") return total + ID
    if (simple.type === "class" || simple.type === "attribute") {
      return total + CLASS
    }
    if (simple.type === "type") return total + TYPE
    if (simple.type !== "pseudo") return total
    if (simple.name === "where") return total
    if (["has", "is", "not"].includes(simple.name)) {
      return total + Math.max(0, ...simple.argument.map(specificityOf))
    }
    return total + CLASS
  }, 0)

export const specificityOf = (steps) =>
  steps.reduce(
    (total, { compound }) => total + compoundSpecificity(compound),
    0,
  )

const matchingSpecificity = (list, element, tree) =>
  Math.max(
    -1,
    ...list
      .filter((steps) => matchesComplex(steps, element, tree))
      .map(specificityOf),
  )

const nth = (formula, position) => {
  const text = formula.replace(/\s+/g, "").toLowerCase()
  if (text === "odd") return position % 2 === 1
  if (text === "even") return position % 2 === 0
  const match = /^(?:([+-]?\d*)n)?([+-]?\d+)?$/.exec(text)
  if (!match) throw new Error(`the formula ${formula} can't be read`)
  const step =
    match[1] === undefined
      ? 0
      : match[1] === "" || match[1] === "+"
        ? 1
        : match[1] === "-"
          ? -1
          : Number(match[1])
  const offset = Number(match[2] ?? 0)
  if (step === 0) return position === offset
  return (position - offset) / step >= 0 && (position - offset) % step === 0
}

const attributeOf = (element, name) =>
  element.attrs.find((attribute) => attribute.name.toLowerCase() === name)
    ?.value

const classesOf = (element) =>
  (attributeOf(element, "class") ?? "").split(/[\t\n\f\r ]+/).filter(Boolean)

const STATIC_PSEUDOS = {
  active: () => false,
  defined: () => true,
  focus: () => false,
  "focus-visible": () => false,
  "focus-within": () => false,
  hover: () => false,
  indeterminate: () => false,
  "popover-open": () => false,
}

const matchesSimple = (simple, element, tree) => {
  if (simple.type === "type") return element.tag.toLowerCase() === simple.name
  if (simple.type === "class") return classesOf(element).includes(simple.name)
  if (simple.type === "id") return attributeOf(element, "id") === simple.name
  if (simple.type === "attribute") {
    let actual = attributeOf(element, simple.name)
    if (actual === undefined) return false
    if (!simple.operator) return true
    let expected = simple.value
    if (simple.flag === "i") {
      actual = actual.toLowerCase()
      expected = expected.toLowerCase()
    }
    if (simple.operator === "=") return actual === expected
    if (simple.operator === "~=")
      return actual.split(/[\t\n\f\r ]+/).includes(expected)
    if (simple.operator === "|=")
      return actual === expected || actual.startsWith(`${expected}-`)
    if (simple.operator === "^=")
      return expected !== "" && actual.startsWith(expected)
    if (simple.operator === "$=")
      return expected !== "" && actual.endsWith(expected)
    return expected !== "" && actual.includes(expected)
  }
  const { argument, name } = simple
  if (name === "is" || name === "where")
    return matchesList(argument, element, tree)
  if (name === "not") return !matchesList(argument, element, tree)
  if (name === "has")
    return argument.some((relative) => hasMatch(relative, element, tree))
  if (name in STATIC_PSEUDOS) return STATIC_PSEUDOS[name](element)
  const siblings = tree.siblings(element)
  const position = siblings.indexOf(element) + 1
  const ofType = siblings.filter((sibling) => sibling.tag === element.tag)
  const typePosition = ofType.indexOf(element) + 1
  if (name === "first-child") return position === 1
  if (name === "last-child") return position === siblings.length
  if (name === "only-child") return siblings.length === 1
  if (name === "nth-child") return nth(argument, position)
  if (name === "nth-last-child")
    return nth(argument, siblings.length - position + 1)
  if (name === "first-of-type") return typePosition === 1
  if (name === "last-of-type") return typePosition === ofType.length
  if (name === "only-of-type") return ofType.length === 1
  if (name === "nth-of-type") return nth(argument, typePosition)
  if (name === "empty") {
    return element.children.every(
      (child) =>
        child.type === "comment" ||
        (child.type === "text" && child.value === ""),
    )
  }
  if (name === "checked") {
    return (
      (element.tag === "input" &&
        attributeOf(element, "checked") !== undefined) ||
      (element.tag === "option" &&
        attributeOf(element, "selected") !== undefined)
    )
  }
  if (name === "disabled") return attributeOf(element, "disabled") !== undefined
  if (name === "required") {
    return (
      ["input", "select", "textarea"].includes(element.tag) &&
      attributeOf(element, "required") !== undefined
    )
  }
  if (name === "scope") return tree.parent(element) === undefined
  throw new Error(
    `the pseudo-class :${name}, which the matcher in scripts/example-display.mjs doesn't know`,
  )
}

const matchesCompound = (compound, element, tree) =>
  compound.every((simple) =>
    simple.type === "anchor"
      ? element === simple.element
      : matchesSimple(simple, element, tree),
  )

const matchesFrom = (steps, index, element, tree) => {
  if (!matchesCompound(steps[index].compound, element, tree)) return false
  if (index === 0) return true
  const { combinator } = steps[index]
  if (combinator === ">") {
    const parent = tree.parent(element)
    return !!parent && matchesFrom(steps, index - 1, parent, tree)
  }
  if (combinator === " ") {
    for (
      let parent = tree.parent(element);
      parent;
      parent = tree.parent(parent)
    ) {
      if (matchesFrom(steps, index - 1, parent, tree)) return true
    }
    return false
  }
  const siblings = tree.siblings(element)
  const position = siblings.indexOf(element)
  if (combinator === "+") {
    return (
      position > 0 &&
      matchesFrom(steps, index - 1, siblings[position - 1], tree)
    )
  }
  return siblings
    .slice(0, position)
    .some((sibling) => matchesFrom(steps, index - 1, sibling, tree))
}

const matchesComplex = (steps, element, tree) =>
  matchesFrom(steps, steps.length - 1, element, tree)

function matchesList(list, element, tree) {
  return list.some((steps) => matchesComplex(steps, element, tree))
}

const hasMatch = (relative, element, tree) => {
  const anchored = [
    { combinator: undefined, compound: [{ element, type: "anchor" }] },
    ...relative,
  ]
  const first = relative[0].combinator
  const candidates =
    first === ">" || first === " "
      ? tree.descendants(element)
      : tree
          .siblings(element)
          .slice(tree.siblings(element).indexOf(element) + 1)
  return candidates.some((candidate) =>
    matchesComplex(anchored, candidate, tree),
  )
}

const treeOf = (nodes) => {
  const parents = new Map()
  const elements = []
  const visit = (children, parent) => {
    for (const child of children) {
      if (child.type !== "element") continue
      parents.set(child, parent)
      elements.push(child)
      visit(child.children, child)
    }
  }
  visit(nodes, undefined)
  const childElements = (children) =>
    children.filter((child) => child.type === "element")
  return {
    descendants: (element) =>
      elements.filter((candidate) => {
        for (
          let parent = parents.get(candidate);
          parent;
          parent = parents.get(parent)
        ) {
          if (parent === element) return true
        }
        return false
      }),
    elements,
    parent: (element) => parents.get(element),
    siblings: (element) =>
      childElements(parents.get(element)?.children ?? nodes),
  }
}

export const matches = (selector, element, nodes) =>
  matchesList(parseSelectorList(selector), element, treeOf(nodes))

export const cssRules = (css, { layered = true, rank } = {}) => {
  const layers = layerOrder()
  const rules = []
  const visit = (container, parents, layer) => {
    for (const node of container.nodes ?? []) {
      if (node.type === "atrule") {
        if (node.name === "layer") {
          if (!node.nodes) continue
          const name = layer ? `${layer}.${node.params}` : node.params
          visit(node, parents, name)
        } else if (node.name === "supports") {
          node.walkDecls((decl) => {
            if (decl.prop === "display" || decl.prop === "white-space") {
              throw new Error(
                `@supports ${node.params} sets ${decl.prop}, which the display model in scripts/example-display.mjs can't evaluate; it only follows content, which reads the same with or without the alternative text`,
              )
            }
          })
          visit(node, parents, layer)
        } else if (node.name === "scope") {
          const start = node.params.indexOf("(")
          const scope = balanced(node.params, start)
          const rest = node.params.slice(start + scope.length + 2)
          const to = /^\s*to\s*\(/.exec(rest)
          const limit = to ? balanced(rest, to[0].length - 1) : undefined
          const outside = limit
            ? `:where(:not(:is(${limit}), :is(${limit}) *))`
            : ""
          visit(
            {
              nodes: node.nodes.map((child) =>
                child.type === "rule"
                  ? child.clone({
                      selectors: child.selectors.map(
                        (selector) =>
                          (selector.includes(":scope")
                            ? selector.replaceAll(":scope", `:where(${scope})`)
                            : `:where(${scope}) ${selector}`) + outside,
                      ),
                    })
                  : child,
              ),
            },
            parents,
            layer,
          )
        } else {
          let sets = false
          node.walkDecls((decl) => {
            if (
              decl.prop === "display" ||
              decl.prop === "white-space" ||
              (decl.prop === "content" &&
                !/^(none|normal|""|'')$/.test(decl.value.trim()))
            ) {
              sets = true
            }
          })
          if (!sets) continue
          throw new Error(
            `@${node.name} ${node.params} sets content, display or white-space, which the display model in scripts/example-display.mjs doesn't evaluate`,
          )
        }
        continue
      }
      if (node.type !== "rule") continue
      const selectors = nest(node.selectors, parents)
      const declarations = Object.fromEntries(
        node.nodes
          .filter(
            (child) => child.type === "decl" && PROPERTIES.includes(child.prop),
          )
          .map((child) => [child.prop, child.value]),
      )
      if (layer && layered && !layers.includes(layer)) {
        throw new Error(
          `the layer ${layer} isn't in packages/opui/css/layers.css`,
        )
      }
      const order =
        rank ??
        (layer && layered ? layers.indexOf(layer) + 1 : layers.length + 1)
      const own = selectors.filter((selector) => !PSEUDO_ELEMENT.test(selector))
      if (
        (declarations.display || declarations["white-space"]) &&
        own.length > 0
      ) {
        rules.push({
          display: declarations.display,
          rank: order,
          selector: parseSelectorList(own.join(", ")),
          text: own.join(", "),
          whiteSpace: declarations["white-space"],
        })
      }
      for (const pseudo of ["before", "after"]) {
        const bases = selectors
          .map((selector) => GENERATED.exec(selector))
          .filter((match) => match?.[2] === pseudo)
          .map((match) => match[1] || "*")
        if (
          bases.length > 0 &&
          (declarations.content ||
            declarations.display ||
            declarations.position)
        ) {
          rules.push({
            generated: {
              content: declarations.content,
              display: declarations.display,
              position: declarations.position,
            },
            pseudo,
            rank: order,
            selector: parseSelectorList(bases.join(", ")),
            text: `${bases.join(", ")} ::${pseudo}`,
          })
        }
      }
      visit(node, selectors, layer)
    }
  }
  visit(postcss.parse(css), undefined, undefined)
  return rules
}

let baseRules
export const baseCssRules = () => {
  if (!baseRules) {
    const files = readdirSync(componentCssDir)
      .filter((file) => file.endsWith(".css"))
      .toSorted()
      .map((file) => readFileSync(join(componentCssDir, file), "utf8"))
    baseRules = [
      ...cssRules(UA_CSS, { rank: 0 }),
      ...CORE_CSS.flatMap((file) =>
        cssRules(readFileSync(join(coreCssDir, file), "utf8")),
      ),
      ...files.flatMap((css) => cssRules(css)),
      ...cssRules(readFileSync(EXAMPLE_LAYOUT_CSS, "utf8")),
    ]
  }
  return baseRules
}

const inlineStyle = (element, property) => {
  const style = element.attrs.find(({ name }) => name === "style")?.value
  if (!style) return undefined
  return postcss
    .parse(`a{${style}}`)
    .first.nodes.findLast(
      (node) => node.type === "decl" && node.prop === property,
    )?.value
}

const NO_BOX = /^(none|normal)$/

export const generatedAtom = (pseudo) => {
  if (!pseudo?.content || NO_BOX.test(pseudo.content.trim())) return undefined
  if (/^(absolute|fixed)$/.test(pseudo.position?.trim() ?? "")) return undefined
  const { outer } = parseDisplay(pseudo.display ?? "inline")
  if (outer === "none") return undefined
  if (outer === "block") return "break"
  const text = pseudo.content.replace(/\/\s*("[^"]*"|'[^']*')\s*$/, "").trim()
  return /^(""|'')$/.test(text) ? undefined : "generated"
}

/** @param {any[]} nodes @param {string[]} [css] */
export const boxesOf = (nodes, css = []) => {
  const rules = [
    ...baseCssRules(),
    ...css.flatMap((text) => cssRules(text, { layered: false })),
  ].map((rule, order) => ({ ...rule, order }))
  const tree = treeOf(nodes)
  const declared = new Map()
  const generated = new Map()
  const beats = (key, other) => {
    const index = key.findIndex((part, at) => part !== other[at])
    return index !== -1 && key[index] > other[index]
  }
  const declare = (entry, property, value, key) => {
    if (value && (!entry[property] || beats(key, entry[property].key))) {
      entry[property] = { key, value }
    }
  }
  for (const rule of rules) {
    for (const element of tree.elements) {
      const specificity = matchingSpecificity(rule.selector, element, tree)
      if (specificity < 0) continue
      const key = [rule.rank, specificity, rule.order]
      if (rule.pseudo) {
        const pseudos = generated.get(element) ?? {}
        pseudos[rule.pseudo] ??= {}
        for (const [property, value] of Object.entries(rule.generated)) {
          declare(pseudos[rule.pseudo], property, value, key)
        }
        generated.set(element, pseudos)
        continue
      }
      const entry = declared.get(element) ?? {}
      declare(entry, "display", rule.display, key)
      if (rule.display?.trim() !== "none") {
        declare(entry, "shown", rule.display, key)
      }
      declare(entry, "whiteSpace", rule.whiteSpace, key)
      declared.set(element, entry)
    }
  }
  const valueOf = (entry) => entry?.value
  const boxes = new Map()
  const visit = (children, whiteSpace) => {
    for (const element of children) {
      if (element.type !== "element") continue
      const entry = declared.get(element) ?? {}
      const style = inlineStyle(element, "display")
      const display = style ?? valueOf(entry.display) ?? "inline"
      const shown =
        style && style.trim() !== "none" ? style : valueOf(entry.shown)
      const own =
        inlineStyle(element, "white-space") ??
        valueOf(entry.whiteSpace) ??
        whiteSpace
      let box = parseDisplay(display)
      let shownBox = parseDisplay(shown ?? "block")
      if (element.namespace === SVG_NAMESPACE && element.tag !== "svg") {
        box = SVG_TEXT_ROOTS.has(element.tag)
          ? { inner: "flow", outer: OUTER.block }
          : SVG_TEXT_INLINES.has(element.tag)
            ? { inner: "inline", outer: OUTER.inline }
            : { inner: "svg", outer: OUTER.block }
        shownBox = box
      } else if (REPLACED.has(element.tag)) {
        const inner = REPLACED.get(element.tag)
        const replaced = (value) =>
          value.outer === "inline"
            ? { inner, outer: "atomic" }
            : { ...value, inner }
        if (box.outer !== "none" && box.outer !== "contents")
          box = replaced(box)
        shownBox = replaced(shownBox)
      }
      const pseudos = generated.get(element) ?? {}
      const pseudo = (name) =>
        pseudos[name] &&
        Object.fromEntries(
          Object.entries(pseudos[name]).map(([property, entry]) => [
            property,
            entry.value,
          ]),
        )
      boxes.set(element, {
        ...box,
        after: generatedAtom(pseudo("after")),
        before: generatedAtom(pseudo("before")),
        shown: shownBox,
        whiteSpace: own,
      })
      visit(element.children, own)
    }
  }
  visit(nodes, "normal")
  return boxes
}

const isBlank = (text) => /^[\t\n\f\r ]*$/.test(text)

const BREAK = { kind: "break" }
const ATOMIC = { kind: "atomic" }

/** @param {any[]} nodes @param {{ css?: string[], root?: string }} [options] */
export const renderedText = (nodes, { css = [], root = "grid" } = {}) => {
  const boxes = boxesOf(nodes, css)
  const rendered = new Map()

  const settle = (atoms) => {
    let space = true
    for (const atom of atoms) {
      if (atom.kind === "text") {
        if (atom.verbatim) {
          atom.text = atom.node.value
          space = atom.text === "" ? space : false
          continue
        }
        let text = ""
        for (const character of atom.node.value.replace(/[\t\n\f\r ]+/g, " ")) {
          if (character === " ") {
            if (!space) text += " "
            space = true
          } else {
            text += character
            space = false
          }
        }
        atom.text = text
      } else {
        space = atom.kind === "break"
      }
    }
    let end = true
    for (const atom of atoms.toReversed()) {
      if (atom.kind === "text") {
        if (!atom.verbatim) {
          while (end && atom.text.endsWith(" "))
            atom.text = atom.text.slice(0, -1)
        }
        if (atom.text !== "") end = false
        rendered.set(atom.node, {
          items: atom.items ?? false,
          text: atom.text,
          verbatim: atom.verbatim,
        })
      } else {
        end = atom.kind === "break"
      }
    }
  }

  const blockified = (box) => (box.inner === "inline" ? "flow" : box.inner)

  const layout = (children, inner, whiteSpace, owner) =>
    inner === "flow" || inner === "inline"
      ? flow(children, whiteSpace, owner)
      : items(children, whiteSpace)

  const hidden = (element, box) =>
    layout(element.children, blockified(box.shown), box.whiteSpace, box)

  const pseudo = (kind) =>
    kind === "break" ? BREAK : kind === "generated" ? ATOMIC : undefined

  const flow = (children, whiteSpace, owner) => {
    const atoms = []
    const push = (atom) => {
      if (atom) atoms.push(atom)
    }
    const collect = (nodes, inherited) => {
      for (const node of nodes) {
        if (node.type === "comment") continue
        if (node.type === "text") {
          atoms.push({ kind: "text", node, verbatim: preserves(inherited) })
          continue
        }
        const box = boxes.get(node)
        if (box.outer === "none") {
          hidden(node, box)
        } else if (box.outer === "contents") {
          collect(node.children, box.whiteSpace)
        } else if (node.tag === "br" && node.namespace !== SVG_NAMESPACE) {
          atoms.push(BREAK)
        } else if (box.outer === "inline") {
          push(pseudo(box.before))
          collect(node.children, box.whiteSpace)
          push(pseudo(box.after))
        } else if (box.outer === "atomic") {
          atoms.push(ATOMIC)
          layout(node.children, box.inner, box.whiteSpace, box)
        } else {
          atoms.push(BREAK)
          layout(node.children, box.inner, box.whiteSpace, box)
          atoms.push(BREAK)
        }
      }
    }
    push(pseudo(owner?.before))
    collect(children, whiteSpace)
    push(pseudo(owner?.after))
    settle(atoms)
  }

  const items = (children, whiteSpace) => {
    let run = []
    const end = () => {
      if (run.some((atom) => atom.verbatim || !isBlank(atom.node.value))) {
        settle([BREAK, ...run, BREAK])
      } else {
        for (const atom of run) {
          rendered.set(atom.node, { items: true, text: "", verbatim: false })
        }
      }
      run = []
    }
    const visit = (nodes, inherited) => {
      for (const node of nodes) {
        if (node.type === "comment") continue
        if (node.type === "text") {
          run.push({
            items: true,
            kind: "text",
            node,
            verbatim: preserves(inherited),
          })
          continue
        }
        const box = boxes.get(node)
        if (box.outer === "none") {
          hidden(node, box)
        } else if (box.outer === "contents") {
          visit(node.children, box.whiteSpace)
        } else {
          end()
          layout(node.children, blockified(box), box.whiteSpace, box)
        }
      }
    }
    visit(children, whiteSpace)
    end()
  }

  layout(nodes, root, "normal")
  return rendered
}
