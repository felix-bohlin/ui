import ts from "typescript"
import { isBlank, sourceFileOf, unwrap } from "./component-shared.mjs"
import { parseDisplay, UA_CSS } from "./example-display.mjs"

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

const tagOf = (node, component) => {
  if (node.component) return undefined
  if (!node.variable) return node.tag
  const fallback = component.props.find(
    ({ local }) => local === node.tag,
  )?.default
  const literal = fallback
    ? unwrap(sourceFileOf(`(${fallback})`, "tag.ts").statements[0].expression)
    : undefined
  return literal && ts.isStringLiteral(literal) ? literal.text : "div"
}

export const layoutOf = (component) => {
  const outer = (node) => {
    if (node.type === "element") {
      return BLOCK_TAGS.has(tagOf(node, component)) ? "block" : "inline"
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
  return { outer }
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
          layout.outer(node) === "block"
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
