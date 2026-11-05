import { slotProp } from "../src/component-api/frameworks.ts"
import { indent } from "./component-emit.mjs"
import { isBlank } from "./component-shared.mjs"

export const tagNamer = (component, shadowed = []) => {
  const taken = new Set([
    ...component.props.map(({ local }) => local),
    ...component.slots.map((slot) => slotProp(slot)),
    ...component.derived.map(({ name }) => name),
    ...component.reads.map(({ name }) => name),
    ...shadowed,
  ])
  return (name) => {
    const camel = `${name[0].toLowerCase()}${name.slice(1)}`
    return taken.has(camel) ? `${camel}Tag` : camel
  }
}

export const jsxEmitter = ({
  attributes,
  each,
  narrow,
  rewrite,
  slotCode,
  stringSlots,
}) => {
  const branch = (nodes, scope) =>
    wrapFragment(emit(nodes, scope), nodes, scope)
  const wrapFragment = (code, nodes, scope) => {
    const significant = nodes.filter(
      (node) =>
        !isBlank(node) &&
        !(node.type === "slot" && stringSlots.includes(slotProp(node.name))),
    )
    const [only] = significant
    if (significant.length !== 1) return `<>${code}</>`
    if (only.type === "element") return code
    if (only.type === "if") return conditional(only, scope)
    if (only.type === "slot" && only.fallback.length === 0) {
      return slotCode(slotProp(only.name))
    }
    if (only.type === "expression") return rewrite(only.code, scope)
    return `<>${code}</>`
  }
  const conditional = (node, scope) => {
    const narrowed = narrow?.(node, scope, branch)
    if (narrowed !== undefined) return narrowed
    const test = rewrite(node.test, scope)
    const consequent = branch(node.consequent, scope)
    if (!node.alternate) return `(${test}) && (${consequent})`
    return `${test} ? (${consequent}) : (${branch(node.alternate, scope)})`
  }
  const emit = (nodes, scope) =>
    nodes
      .map((node) => {
        if (node.type === "text") {
          return node.value === " " || node.inline ? '{" "}' : node.value
        }
        if (node.type === "expression") return `{${rewrite(node.code, scope)}}`
        if (node.type === "slot") {
          const name = slotProp(node.name)
          if (stringSlots.includes(name)) {
            return nodes.some(
              (sibling) =>
                sibling.type === "expression" && sibling.code.trim() === name,
            )
              ? ""
              : `{${slotCode(name)}}`
          }
          if (node.fallback.length === 0) return `{${slotCode(name)}}`
          return `{${slotCode(name)} === undefined ? (${branch(node.fallback, scope)}) : (${slotCode(name)})}`
        }
        if (node.type === "if") {
          const code = conditional(node, scope)
          return code.startsWith("<") ? code : `{${code}}`
        }
        if (node.type === "each") {
          const loop = each(node, scope)
          const body = branch(node.children, loop.scope)
          const returned = loop.consts.length
            ? `{\n${loop.consts.join("\n")}\nreturn (\n${body}\n)\n}`
            : `(\n${body}\n)`
          return `{${loop.list}${node.optional ? "?" : ""}.map((${loop.parameters}) => ${returned})}`
        }
        const code = attributes(node, scope).join(" ")
        const open = `<${node.tag}${code ? ` ${code}` : ""}`
        return node.children.length === 0
          ? `${open} />`
          : `${open}>${emit(node.children, scope)}</${node.tag}>`
      })
      .join("")
  const render = (tree, scope) =>
    tree[0].type === "if" ? conditional(tree[0], scope) : emit(tree, scope)
  return { render }
}

export const componentFunction = (name, parameters, body, returned) =>
  `export default function ${name}(${parameters}) {\n${body.map((line) => `  ${line}\n`).join("")}${body.length ? "\n" : ""}  return (\n${indent(returned, 4)}\n  )\n}\n`
