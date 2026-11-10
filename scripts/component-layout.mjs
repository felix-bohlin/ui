import ts from "typescript"
import {
  isBlank,
  PRESERVED_TAGS,
  sourceFileOf,
  unwrap,
} from "./component-shared.mjs"
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
  if (
    named.length > 0 &&
    !named.some((simple) => classes.includes(simple.name))
  ) {
    return false
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

const FLEX_OR_GRID = new Set(["flex", "grid"])

let authorRules

const authorDisplayRules = () => {
  authorRules ??= baseCssRules()
    .filter((rule) => rule.display && rule.rank > 0)
    .map((rule) => ({ ...rule, layout: parseDisplay(rule.display) }))
    .filter(({ layout }) => layout.outer !== "none")
  return authorRules
}

const isNested = (simple) =>
  simple.type === "pseudo" && (simple.name === "is" || simple.name === "where")

const namesClass = (compound, classes) =>
  compound.some(
    (simple) =>
      (simple.type === "class" && classes.includes(simple.name)) ||
      (isNested(simple) &&
        simple.argument.some((steps) =>
          namesClass(steps.at(-1).compound, classes),
        )),
  )

const contextual = (steps) =>
  steps.length > 1 ||
  steps[0].compound.some(
    (simple) => isNested(simple) && simple.argument.every(contextual),
  )

const guaranteed = (steps, chain, index, step = steps.length - 1) => {
  if (index < 0 || !holds(steps[step].compound, chain, index)) return false
  if (step === 0) return true
  const { combinator } = steps[step]
  if (combinator === ">") return guaranteed(steps, chain, index - 1, step - 1)
  if (combinator !== " ") return false
  for (let parent = index - 1; parent >= 0; parent--) {
    if (guaranteed(steps, chain, parent, step - 1)) return true
  }
  return false
}

function holds(compound, chain, index) {
  const { classes, tags } = chain[index]
  return compound.every((simple) => {
    if (simple.type === "class") return classes.includes(simple.name)
    if (simple.type === "type") {
      return tags.length > 0 && tags.every((tag) => tag === simple.name)
    }
    return (
      isNested(simple) &&
      simple.argument.some((steps) => guaranteed(steps, chain, index))
    )
  })
}

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
  const linkOf = (node) =>
    node.component
      ? { classes: [], tags: [] }
      : { classes: staticClasses(node), tags: tagsOf(node, component) }
  const container = (node, ancestors) => {
    if (node.component || node.foreign) return false
    const chain = [...ancestors, node].map(linkOf)
    const { classes, tags } = chain.at(-1)
    if (classes.length === 0 || tags.length === 0) return false
    const style = node.attributes.find(
      (item) => item.kind === "static" && item.name === "style",
    )
    if (style && /\bdisplay\s*:/.test(style.value)) return false
    const rules = authorDisplayRules()
    const established = rules.some(
      (rule) =>
        FLEX_OR_GRID.has(rule.layout.inner) &&
        rule.selector.some(
          (steps) =>
            namesClass(steps.at(-1).compound, classes) &&
            guaranteed(steps, chain, chain.length - 1),
        ),
    )
    return (
      established &&
      !rules.some(
        (rule) =>
          !FLEX_OR_GRID.has(rule.layout.inner) &&
          rule.selector.some((steps) => {
            const subject = steps.at(-1).compound
            return (
              tags.some((tag) => couldMatch(subject, tag, classes)) &&
              (namesClass(subject, classes) || !contextual(steps))
            )
          }),
      )
    )
  }
  const transparent = (node) =>
    baseCssRules().some(
      (rule) =>
        rule.display &&
        parseDisplay(rule.display).outer === "contents" &&
        rule.selector.some((steps) =>
          tagsOf(node, component).some((tag) =>
            couldMatch(steps.at(-1).compound, tag, staticClasses(node)),
          ),
        ),
    )
  const producesText = (node) => {
    if (node.type === "text") return !isBlank(node)
    if (node.type === "element") {
      return (
        node.component ||
        tagsOf(node, component).length === 0 ||
        transparent(node)
      )
    }
    if (node.type === "if") {
      return [...node.consequent, ...(node.alternate ?? [])].some(producesText)
    }
    if (node.type === "each") return node.children.some(producesText)
    return true
  }
  return { container, outer, producesText, uaOuter }
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

const containerChildren = (children, producesText) => {
  const split = splitEdges(children)
  const significant = split.filter((child) => !isBlank(child))
  const shaped = significant.flatMap((child, index) => {
    if (index === 0) return [child]
    const previous = significant[index - 1]
    const between = split.slice(
      split.indexOf(previous) + 1,
      split.indexOf(child),
    )
    if (between.length === 0) return [child]
    if (!producesText(previous) || !producesText(child)) return [LINE, child]
    return [
      between[0].value === " " ? between[0] : { ...LINE, inline: true },
      child,
    ]
  })
  return significant.every(isBox) ? [LINE, ...shaped, LINE] : shaped
}

export const shapeWhitespace = (tree, component) => {
  const layout = layoutOf(component)
  const shape = (nodes, ancestors) => {
    for (const node of nodes) {
      if (node.type === "element") {
        if (PRESERVED_TAGS.has(node.tag)) continue
        const children = node.children
        shape(children, [...ancestors, node])
        if (children.length === 0) continue
        const significant = children.filter((child) => !isBlank(child))
        const allBlocks = significant.every(
          (child) => layout.outer(child) === "block",
        )
        if (node.foreign || allBlocks) {
          node.children = blockChildren(children)
          continue
        }
        if (layout.container(node, ancestors)) {
          node.children = containerChildren(children, layout.producesText)
          continue
        }
        node.children =
          layout.uaOuter(node) === "block"
            ? flowChildren(children, layout.outer)
            : inlineChildren(children, layout.outer)
        continue
      }
      if (node.type === "if") {
        shape(node.consequent, ancestors)
        shape(node.alternate ?? [], ancestors)
      }
      if (node.type === "each") shape(node.children, ancestors)
      if (node.type === "slot") shape(node.fallback, ancestors)
    }
  }
  shape(tree, [])
  return tree
}
