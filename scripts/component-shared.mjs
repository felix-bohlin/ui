import { fileURLToPath } from "node:url"
import ts from "typescript"

export const root = fileURLToPath(new URL("..", import.meta.url))

export const unsupported = (file, what, hint) =>
  new Error(
    `${file} uses ${what}, which scripts/build-components.mjs can't compile: ${hint ?? "support the construct in scripts/build-components.mjs, or list the file in scripts/hand-written-components.json with the reason"}`,
  )

export const sourceFileOf = (code, name = "frontmatter.ts") =>
  ts.createSourceFile(name, code, ts.ScriptTarget.Latest, true)

export const printer = ts.createPrinter({ removeComments: false })

export const unwrap = (node) => {
  while (ts.isParenthesizedExpression(node)) node = node.expression
  return node
}

export const capitalize = (name) => `${name[0].toUpperCase()}${name.slice(1)}`

export const containsKind = (node, test) =>
  test(node) ||
  ts.forEachChild(node, (child) => containsKind(child, test)) === true

export const isBlank = (node) => node.type === "text" && !node.value.trim()

export const elementsIn = (nodes) =>
  nodes.flatMap((node) => {
    if (node.type === "element") return [node, ...elementsIn(node.children)]
    if (node.type === "each") return elementsIn(node.children)
    if (node.type === "if") {
      return [
        ...elementsIn(node.consequent),
        ...elementsIn(node.alternate ?? []),
      ]
    }
    if (node.type === "slot") return elementsIn(node.fallback)
    return []
  })

export const spreads = (node, code) =>
  node.attributes.some((item) => item.kind === "spread" && item.code === code)

export const identifiersIn = (code) => {
  const names = new Set()
  const visit = (node) => {
    if (
      ts.isIdentifier(node) &&
      !(
        ts.isPropertyAccessExpression(node.parent) && node.parent.name === node
      ) &&
      !(ts.isPropertyAssignment(node.parent) && node.parent.name === node)
    ) {
      names.add(node.text)
    }
    ts.forEachChild(node, visit)
  }
  visit(sourceFileOf(`(${code})`, "expression.ts"))
  return names
}

export const slotsUsedIn = (code) =>
  [...code.matchAll(/Astro\.slots\.has\("([^"]+)"\)/g)].map((match) => match[1])

export const codesIn = (nodes) =>
  nodes.flatMap((node) => {
    if (node.type === "expression") return [node.code]
    if (node.type === "each") {
      return [
        node.list,
        ...node.consts.map(({ code }) => code),
        ...codesIn(node.children),
      ]
    }
    if (node.type === "if") {
      return [
        node.test,
        ...codesIn(node.consequent),
        ...codesIn(node.alternate ?? []),
      ]
    }
    if (node.type === "slot") return codesIn(node.fallback)
    if (node.type === "element") {
      return [
        ...node.attributes.flatMap((item) =>
          item.kind === "expression" ||
          item.kind === "class" ||
          item.kind === "spread"
            ? [item.code]
            : [],
        ),
        ...codesIn(node.children),
      ]
    }
    return []
  })

export const testsIn = (nodes) =>
  nodes.flatMap((node) =>
    node.type === "if"
      ? [
          node.test,
          ...testsIn(node.consequent),
          ...testsIn(node.alternate ?? []),
        ]
      : node.type === "element" || node.type === "each"
        ? testsIn(node.children)
        : node.type === "slot"
          ? testsIn(node.fallback)
          : [],
  )

export const allCodes = (component) => [
  ...codesIn(component.tree),
  ...component.derived.map(({ code }) => code),
  ...component.warnings,
  ...(component.provide?.value.map(({ code }) => code) ?? []),
]

export const scriptCodes = (component) => [
  ...component.derived.map(({ code }) => code),
  ...component.warnings,
  ...(component.provide?.value.map(({ code }) => code) ?? []),
]

export const byName = (a, b) => a.localeCompare(b, "en")

export const propKey = (prop) =>
  /^[A-Za-z_$][\w$]*$/.test(prop) ? prop : JSON.stringify(prop)
