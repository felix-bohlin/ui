import ts from "typescript"
import { isBlank, sourceFileOf, unwrap } from "./component-shared.mjs"
import { baseCssRules, parseDisplay, UA_CSS } from "./example-display.mjs"

const BLOCK_TAGS = new Set(
  [...UA_CSS.matchAll(/^([^{@]+)\{\s*display:\s*([^;}]+)\}/gm)].flatMap(
    ([, selectors, display]) =>
      parseDisplay(display).outer === "block"
        ? selectors
            .split(",")
            .map((selector) => selector.trim())
            .filter((selector) => /^[a-z][a-z0-9]*$/.test(selector))
        : [],
  ),
)

const staticClasses = (node) => {
  const list = node.attributes.find((item) => item.kind === "class")
  if (list) {
    const expression = unwrap(
      sourceFileOf(`(${list.code})`, "class.ts").statements[0].expression,
    )
    const items = ts.isArrayLiteralExpression(expression)
      ? expression.elements
      : [expression]
    return items.flatMap((item) =>
      ts.isStringLiteral(item) ? item.text.split(/\s+/).filter(Boolean) : [],
    )
  }
  const fixed = node.attributes.find(
    (item) => item.kind === "static" && item.name === "class",
  )
  return fixed ? fixed.value.split(/\s+/).filter(Boolean) : []
}

let inlineRules

const inlineLevelRules = () => {
  inlineRules ??= baseCssRules().filter((rule) => {
    const { outer } = parseDisplay(rule.display ?? "inline")
    return rule.display && outer !== "block" && outer !== "none"
  })
  return inlineRules
}

const couldMatch = (compound, tag, classes) => {
  const type = compound.find((simple) => simple.type === "type")
  if (type && type.name !== tag) return false
  const named = compound.filter((simple) => simple.type === "class")
  if (named.length > 0) {
    return named.some((simple) => classes.includes(simple.name))
  }
  const nested = compound.filter(
    (simple) =>
      simple.type === "pseudo" &&
      (simple.name === "is" || simple.name === "where"),
  )
  if (nested.length > 0) {
    return nested.every((simple) =>
      simple.argument.some((complex) =>
        couldMatch(complex.at(-1).compound, tag, classes),
      ),
    )
  }
  return true
}

const inlineLevelByCss = (tag, classes) =>
  inlineLevelRules().some((rule) =>
    rule.selector.some((complex) =>
      couldMatch(complex.at(-1).compound, tag, classes),
    ),
  )

const tagsOf = (node, component) => {
  if (node.component) return []
  if (!node.variable) return [node.tag]
  const code =
    component.props.find(({ local }) => local === node.tag)?.default ??
    component.derived.find(({ name }) => name === node.tag)?.code
  if (!code) return []
  const tags = []
  const visit = (child) => {
    if (ts.isStringLiteral(child)) tags.push(child.text)
    ts.forEachChild(child, visit)
  }
  visit(sourceFileOf(`(${code})`, "tag.ts"))
  return tags
}

const isBlock = (tags) =>
  tags.length > 0 && tags.every((tag) => BLOCK_TAGS.has(tag))

export const layoutOf = (component) => {
  const uaOuter = (node) =>
    isBlock(tagsOf(node, component)) ? "block" : "inline"
  const outer = (node) => {
    if (node.type === "element") {
      const tags = tagsOf(node, component)
      return isBlock(tags) &&
        !tags.some((tag) => inlineLevelByCss(tag, staticClasses(node)))
        ? "block"
        : "inline"
    }
    const branches =
      node.type === "if"
        ? [...node.consequent, ...(node.alternate ?? [])]
        : node.type === "each"
          ? node.children
          : undefined
    const significant = branches?.filter((child) => !isBlank(child))
    return significant?.length &&
      significant.every((child) => outer(child) === "block")
      ? "block"
      : "inline"
  }
  return { outer, uaOuter }
}

const LINE = { type: "text", value: "\n" }

const isBox = (node) => ["each", "element", "if", "slot"].includes(node.type)

const boxesOnLines = (children) => {
  const boxes = children.filter(isBox)
  if (
    boxes.length === 0 ||
    !children.every((node) => isBox(node) || isBlank(node))
  ) {
    return children
  }
  return [LINE, ...boxes.flatMap((box) => [box, LINE])]
}

const blockChildren = (children) =>
  children.every(isBlank) ? [] : boxesOnLines(children)

const splitEdges = (children) =>
  children.flatMap((child, index) => {
    if (child.type !== "text" || isBlank(child)) return [child]
    const leading = index > 0 && /^\s*\n/.test(child.value)
    const trailing = index < children.length - 1 && /\n\s*$/.test(child.value)
    if (!leading && !trailing) return [child]
    return [
      ...(leading ? [LINE] : []),
      { type: "text", value: child.value.trim() },
      ...(trailing ? [LINE] : []),
    ]
  })

const inlineChildren = (children, outer) => {
  const split = splitEdges(children)
  return split.map((child, index) =>
    isBlank(child) &&
    child.value === "\n" &&
    index > 0 &&
    index < split.length - 1 &&
    !isBlank(split[index - 1]) &&
    !isBlank(split[index + 1]) &&
    outer(split[index - 1]) !== "block" &&
    outer(split[index + 1]) !== "block"
      ? { ...child, inline: true }
      : child,
  )
}

const flowChildren = (children, outer) => {
  const split = splitEdges(children)
  const significant = split.filter((child) => !isBlank(child))
  const boxed = significant.every(isBox)
  const shaped = significant.flatMap((child, index) => {
    if (index === 0) return [child]
    const previous = significant[index - 1]
    const between = split.slice(
      split.indexOf(previous) + 1,
      split.indexOf(child),
    )
    if (outer(previous) === "block" || outer(child) === "block") {
      return [LINE, child]
    }
    if (between.length === 0) return [child]
    return [
      between[0].value === " " ? between[0] : { ...LINE, inline: true },
      child,
    ]
  })
  return boxed ? [LINE, ...shaped, LINE] : shaped
}

export const shapeWhitespace = (tree, component) => {
  const layout = layoutOf(component)
  const shape = (nodes) => {
    for (const node of nodes) {
      if (node.type === "element") {
        const children = node.children
        shape(children)
        if (children.length === 0) continue
        const significant = children.filter((child) => !isBlank(child))
        const allBlocks = significant.every(
          (child) => layout.outer(child) === "block",
        )
        if (node.foreign || allBlocks) {
          node.children = blockChildren(children)
          continue
        }
        node.children =
          layout.uaOuter(node) === "block"
            ? flowChildren(children, layout.outer)
            : inlineChildren(children, layout.outer)
        continue
      }
      if (node.type === "if") {
        shape(node.consequent)
        shape(node.alternate ?? [])
      }
      if (node.type === "each") shape(node.children)
      if (node.type === "slot") shape(node.fallback)
    }
  }
  shape(tree)
  return tree
}
