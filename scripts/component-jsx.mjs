import { slotProp } from "../src/component-api/frameworks.ts"
import { indent } from "./component-emit.mjs"
import { asFragment, code, join } from "./component-fragment.mjs"
import { isBlank } from "./component-shared.mjs"

export const tagNamer = (component, shadowed = []) => {
  const taken = new Set([
    ...component.declared,
    ...component.slots.map((slot) => slotProp(slot)),
    ...shadowed,
  ])
  return (name) => {
    const camel = `${name[0].toLowerCase()}${name.slice(1)}`
    return taken.has(camel) ? `${camel}Tag` : camel
  }
}

const mapLoop = ({ list, optional, parameters, returned }) =>
  code`{${list}${optional ? "?" : ""}.map((${parameters}) => ${returned})}`

export const jsxEmitter = ({
  attributes,
  each,
  loop = mapLoop,
  narrow,
  rewrite,
  slotCode,
  stringSlots,
  tag = (node) => node.tag,
}) => {
  const branch = (nodes, scope) =>
    wrapFragment(emit(nodes, scope), nodes, scope)
  const wrapFragment = (inner, nodes, scope) => {
    const significant = nodes.filter(
      (node) =>
        !isBlank(node) &&
        !(
          node.type === "slot" &&
          stringSlots.some(({ slot }) => slot === node.name)
        ),
    )
    const [only] = significant
    if (significant.length !== 1) return code`<>${inner}</>`
    if (only.type === "element") return inner
    if (only.type === "if") return conditional(only, scope)
    if (only.type === "slot" && only.fallback.length === 0) {
      return asFragment(slotCode(slotProp(only.name), scope, true))
    }
    if (only.type === "expression") return asFragment(rewrite(only.code, scope))
    return code`<>${inner}</>`
  }
  const ternary = (node, scope) => {
    const test = rewrite(node.test, scope)
    const consequent = branch(node.consequent, scope)
    if (!node.alternate) return code`(${test}) && (${consequent})`
    return code`${test} ? (${consequent}) : (${branch(node.alternate, scope)})`
  }
  const conditional = (node, scope) =>
    narrow?.(node, scope, branch) ?? ternary(node, scope)
  const emit = (nodes, scope) =>
    join(
      nodes.map((node) => {
        if (node.type === "text") {
          return node.value === " " || node.inline ? '{" "}' : node.value
        }
        if (node.type === "expression") {
          return code`{${rewrite(node.code, scope)}}`
        }
        if (node.type === "slot") {
          const name = slotProp(node.name)
          const string = stringSlots.find(({ slot }) => slot === node.name)
          if (string) {
            return nodes.some(
              (sibling) =>
                sibling.type === "expression" &&
                sibling.code.trim() === string.local,
            )
              ? ""
              : code`{${slotCode(name)}}`
          }
          if (node.fallback.length === 0) {
            return code`{${slotCode(name, scope, true)}}`
          }
          return code`{${slotCode(name, scope)} === undefined ? (${branch(node.fallback, scope)}) : (${slotCode(name, scope, true)})}`
        }
        if (node.type === "if") {
          return (
            narrow?.(node, scope, branch) ?? code`{${ternary(node, scope)}}`
          )
        }
        if (node.type === "each") {
          const row = each(node, scope)
          const body = branch(node.children, row.scope)
          const returned = row.consts.length
            ? code`{\n${join(row.consts, "\n")}\nreturn (\n${body}\n)\n}`
            : code`(\n${body}\n)`
          return loop({
            keyed: row.keyed,
            list: row.list,
            optional: node.optional,
            parameters: row.parameters,
            returned,
          })
        }
        const listed = join(attributes(node, scope), " ")
        const name = tag(node, scope)
        const open = code`<${name}${listed.code ? code` ${listed}` : ""}`
        return node.children.length === 0
          ? code`${open} />`
          : code`${open}>${emit(node.children, scope)}</${name}>`
      }),
    )
  const render = (tree, scope) =>
    tree[0].type === "if" ? conditional(tree[0], scope) : emit(tree, scope)
  return { render }
}

export const componentFunction = (name, parameters, body, returned) =>
  `export default function ${name}(${parameters}) {\n${body.map((line) => `  ${line}\n`).join("")}${body.length ? "\n" : ""}  return (\n${indent(returned, 4)}\n  )\n}\n`
