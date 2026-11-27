import { fileURLToPath } from "node:url"
import ts from "typescript"
import { DIAGNOSTICS } from "./component-diagnostics.mjs"

export const root = fileURLToPath(new URL("..", import.meta.url))

export const SOLID_PRAGMA = "/** @jsxImportSource @solidjs/web */"

export const unsupported = (
  code,
  file,
  what,
  hint,
  compiler = "scripts/build-components.mjs",
) => {
  if (!(code in DIAGNOSTICS)) {
    throw new Error(
      `unsupported() takes a code from scripts/component-diagnostics.mjs, not ${code}`,
    )
  }
  return Object.assign(
    new Error(
      `${file} uses ${what}, which ${compiler} can't compile: ${hint ?? "support the construct in scripts/build-components.mjs, or list the file in scripts/hand-written-components.json with the reason"} [${code}]`,
    ),
    { code },
  )
}

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

export const spreads = (node, code) =>
  node.attributes.some(
    (item) =>
      item.kind === "spread" &&
      item.code === code &&
      item.condition === undefined,
  )

export const filtersRest = (node, item, component, propOf = (name) => name) => {
  if (
    node.component ||
    item.kind !== "spread" ||
    item.code !== component.rest
  ) {
    return false
  }
  const destructured = new Set(component.props.map(({ prop }) => prop))
  return node.attributes
    .slice(0, node.attributes.indexOf(item))
    .some(
      (entry) =>
        entry.kind === "spread" ||
        !(
          destructured.has(entry.kind === "class" ? "class" : entry.name) ||
          destructured.has(propOf(entry.name ?? ""))
        ),
    )
}

export const filtersSpread = (node, item, component) =>
  item.kind === "spread" &&
  (item.code === component.rest
    ? filtersRest(node, item, component)
    : item.defined === true)

const slotChecked = (node) => {
  const callee = ts.isCallExpression(node) && node.expression
  const owner =
    callee && ts.isPropertyAccessExpression(callee) && callee.expression
  return owner &&
    callee.name.text === "has" &&
    ts.isPropertyAccessExpression(owner) &&
    owner.name.text === "slots" &&
    ts.isIdentifier(owner.expression) &&
    owner.expression.text === "Astro" &&
    node.arguments[0] &&
    ts.isStringLiteralLike(node.arguments[0])
    ? node.arguments[0].text
    : undefined
}

export const scanCode = (code) => {
  const sourceFile = sourceFileOf(`(${code})`, "expression.ts")
  const names = new Map()
  const slots = []
  const visit = (node) => {
    if (
      ts.isIdentifier(node) &&
      !(
        ts.isPropertyAccessExpression(node.parent) && node.parent.name === node
      ) &&
      !(ts.isPropertyAssignment(node.parent) && node.parent.name === node)
    ) {
      names.set(node.text, (names.get(node.text) ?? 0) + 1)
    }
    const slot = slotChecked(node)
    if (slot !== undefined) slots.push(slot)
    ts.forEachChild(node, visit)
  }
  visit(sourceFile)
  return { expression: sourceFile.statements[0]?.expression, names, slots }
}

export const identifierCounts = (code) => scanCode(code).names

export const identifiersIn = (code) => new Set(identifierCounts(code).keys())

export const itemBinding = (text) => {
  const [statement] = sourceFileOf(`(${text}) => 0`, "item.ts").statements
  const arrow =
    statement && ts.isExpressionStatement(statement)
      ? statement.expression
      : undefined
  const name =
    arrow && ts.isArrowFunction(arrow) ? arrow.parameters[0]?.name : undefined
  if (!name) return undefined
  if (ts.isIdentifier(name)) return { fields: [], name: name.text }
  if (!ts.isObjectBindingPattern(name)) return undefined
  const fields = []
  let rest
  for (const element of name.elements) {
    const key = element.propertyName ?? element.name
    if (
      element.initializer ||
      !ts.isIdentifier(element.name) ||
      !ts.isIdentifier(key)
    ) {
      return undefined
    }
    if (element.dotDotDotToken) rest = element.name.text
    else fields.push({ key: key.text, local: element.name.text })
  }
  return { fields, rest }
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

export const withoutClassEntry = (code, name) => {
  const [statement] = sourceFileOf(`(${code})`, "class.ts").statements
  const node =
    statement && ts.isExpressionStatement(statement)
      ? unwrap(statement.expression)
      : undefined
  const isName = (entry) => {
    const value = unwrap(entry)
    return ts.isIdentifier(value) && value.text === name
  }
  if (node && isName(node)) return { code: undefined, dropped: true }
  if (!node || !ts.isArrayLiteralExpression(node)) {
    return { code, dropped: false }
  }
  const kept = node.elements.filter((entry) => !isName(entry))
  return {
    code: kept.length
      ? `[${kept.map((entry) => entry.getText()).join(", ")}]`
      : undefined,
    dropped: kept.length < node.elements.length,
  }
}

export const staticClass = (code) => {
  const node = classNode(code)
  const list = node && unwrap(node)
  const only =
    list && ts.isArrayLiteralExpression(list) && list.elements.length === 1
      ? unwrap(list.elements[0])
      : list
  return only &&
    (ts.isStringLiteral(only) || ts.isNoSubstitutionTemplateLiteral(only))
    ? only.text
    : undefined
}

export const onlyClass = (code) => {
  const [statement] = sourceFileOf(`(${code})`, "class.ts").statements
  const list =
    statement && ts.isExpressionStatement(statement)
      ? unwrap(statement.expression)
      : undefined
  if (!list || !ts.isArrayLiteralExpression(list)) return undefined
  const [entry] = list.elements
  if (list.elements.length !== 1) return undefined
  const value = unwrap(entry)
  return ts.isObjectLiteralExpression(value) ||
    ts.isArrayLiteralExpression(value) ||
    ts.isSpreadElement(value) ||
    (ts.isBinaryExpression(value) &&
      value.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken)
    ? undefined
    : entry.getText()
}
