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

export const PRESERVED_TAGS = new Set(["pre", "textarea"])

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

export const REACT_ATTRIBUTE_NAMES = { class: "className", for: "htmlFor" }

export const spreads = (node, code) =>
  node.attributes.some(
    (item) =>
      item.kind === "spread" &&
      item.code === code &&
      item.condition === undefined,
  )

export const chosenSpreadCode = (item, spread, condition) =>
  item.negated
    ? `${condition} ? {} : ${spread}`
    : `${condition} ? ${spread} : {}`

const identifierCache = new Map()

export const identifiersIn = (code) => {
  const cached = identifierCache.get(code)
  if (cached) return cached
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
  identifierCache.set(code, names)
  return names
}

const typeNodeOf = (type) =>
  sourceFileOf(`type T = ${type}`, "type.ts").statements[0].type

export const unionMembers = (type) => {
  const node = typeNodeOf(type)
  return (ts.isUnionTypeNode(node) ? node.types : [node]).map((member) =>
    member.getText(),
  )
}

export const isArrayType = (member) => {
  const node = typeNodeOf(member)
  return (
    ts.isArrayTypeNode(node) ||
    (ts.isTypeReferenceNode(node) &&
      /^(?:Readonly)?Array$/.test(node.typeName.getText()))
  )
}

const slotCache = new Map()

export const slotsUsedIn = (code) => {
  const cached = slotCache.get(code)
  if (cached) return cached
  const names = []
  const visit = (node) => {
    const callee = ts.isCallExpression(node) && node.expression
    const owner =
      callee && ts.isPropertyAccessExpression(callee) && callee.expression
    if (
      owner &&
      callee.name.text === "has" &&
      ts.isPropertyAccessExpression(owner) &&
      owner.name.text === "slots" &&
      ts.isIdentifier(owner.expression) &&
      owner.expression.text === "Astro" &&
      node.arguments[0] &&
      ts.isStringLiteralLike(node.arguments[0])
    ) {
      names.push(node.arguments[0].text)
    }
    ts.forEachChild(node, visit)
  }
  visit(sourceFileOf(`(${code})`, "expression.ts"))
  slotCache.set(code, names)
  return names
}

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

export const isIdentifierName = (name) => /^[A-Za-z_$][\w$]*$/.test(name)

export const propKey = (prop) =>
  isIdentifierName(prop) ? prop : JSON.stringify(prop)

const isClassText = (node) =>
  ts.isParenthesizedExpression(node)
    ? isClassText(node.expression)
    : ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)
      ? !!node.text.trim()
      : ts.isTemplateExpression(node)
        ? [node.head, ...node.templateSpans.map((span) => span.literal)].some(
            (part) => part.text.trim(),
          )
        : ts.isConditionalExpression(node) &&
          isClassText(node.whenTrue) &&
          isClassText(node.whenFalse)

const givesClass = (node) =>
  isClassText(node) ||
  (ts.isParenthesizedExpression(node)
    ? givesClass(node.expression)
    : ts.isConditionalExpression(node)
      ? givesClass(node.whenTrue) && givesClass(node.whenFalse)
      : ts.isArrayLiteralExpression(node) && node.elements.some(givesClass))

const classNode = (code) =>
  ts.createSourceFile("class.ts", `(${code})`, ts.ScriptTarget.Latest, true)
    .statements[0]?.expression

export const classMayBeEmpty = (code) => {
  const node = classNode(code)
  return !node || !givesClass(node)
}

export const classText = (code) => {
  const parsed = classNode(code)
  const node = parsed && unwrap(parsed)
  const only =
    node && ts.isArrayLiteralExpression(node) && node.elements.length === 1
      ? node.elements[0]
      : node
  return only && isClassText(only) ? unwrap(only).getText() : undefined
}
