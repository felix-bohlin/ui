import { slotProp } from "../src/component-api/frameworks.ts"
import { indent } from "./component-emit.mjs"
import { asFragment, code } from "./component-fragment.ts"
import { jsxPrinter, sourceText } from "./print-jsx.mjs"

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

export const componentPrinter = (
  dialect,
  { attributes, rewrite, slotCode, stringSlots, ...hooks },
) => {
  const stringSlot = (node) =>
    node.type === "slot"
      ? stringSlots.find(({ slot }) => slot === node.name)
      : undefined
  return jsxPrinter(dialect, {
    ...hooks,
    bare: (only, scope) => {
      if (only.type === "slot" && only.fallback.length === 0) {
        return asFragment(slotCode(slotProp(only.name), scope, true))
      }
      if (only.type === "expression")
        return asFragment(rewrite(only.code, scope))
      return undefined
    },
    emptyElements: "every",
    ignored: (node) => stringSlot(node) !== undefined,
    other: (node, scope, { branch, siblings }) => {
      const name = slotProp(node.name)
      const string = stringSlot(node)
      if (string) {
        return siblings.some(
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
    },
    props: (node, scope) => ({ attributes: attributes(node, scope) }),
    rewrite,
    text: sourceText,
  })
}

export const componentFunction = (name, parameters, body, returned) =>
  `export default function ${name}(${parameters}) {\n${body.map((line) => `  ${line}\n`).join("")}${body.length ? "\n" : ""}  return (\n${indent(returned, 4)}\n  )\n}\n`
