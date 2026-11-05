import ts from "typescript"
import {
  byName,
  isIdentifierName,
  printer,
  sourceFileOf,
  unwrap,
} from "./component-shared.mjs"

const synthesize = (node) => {
  ts.setTextRange(node, { end: -1, pos: -1 })
  ts.forEachChild(node, synthesize)
}

const synthesized = (node) => {
  synthesize(node)
  return node
}

const expressions = new Map()

const parseExpression = (text, quote) => {
  const sourceFile = sourceFileOf(`(${text})`, "replacement.ts")
  const parsed = synthesized(unwrap(sourceFile.statements[0].expression))
  const requote = (node) =>
    ts.isStringLiteral(node) && quote === "'"
      ? ts.factory.createStringLiteral(node.text, true)
      : ts.visitEachChild(node, requote, ts.nullTransformationContext)
  const node = requote(parsed)
  return ts.isBinaryExpression(node) || ts.isConditionalExpression(node)
    ? ts.factory.createParenthesizedExpression(node)
    : node
}

const expressionOf = (text, quote) => {
  const key = `${quote}\n${text}`
  if (!expressions.has(key)) expressions.set(key, parseExpression(text, quote))
  return expressions.get(key)
}

const bindingNames = (name) =>
  ts.isIdentifier(name)
    ? [name.text]
    : ts.isObjectBindingPattern(name) || ts.isArrayBindingPattern(name)
      ? name.elements.flatMap((element) =>
          ts.isBindingElement(element) ? bindingNames(element.name) : [],
        )
      : []

const shadowedBy = (node) =>
  ts.isArrowFunction(node) || ts.isFunctionExpression(node)
    ? node.parameters.flatMap((parameter) => bindingNames(parameter.name))
    : []

const transformer =
  (
    sourceFile,
    { quote = '"', rename = new Map(), slotHas = (name) => name, style } = {},
  ) =>
  (context) =>
  (node) => {
    const scoped = (names) => {
      const inner = new Map(rename)
      names.forEach((name) => inner.delete(name))
      return transformer(sourceFile, { quote, rename: inner, slotHas, style })(
        context,
      )
    }
    const visit = (child) => {
      const shadowed = shadowedBy(child).filter((name) => rename.has(name))
      if (shadowed.length > 0) {
        return ts.visitEachChild(child, scoped(shadowed), context)
      }
      if (
        ts.isShorthandPropertyAssignment(child) &&
        rename.has(child.name.text)
      ) {
        return ts.factory.createPropertyAssignment(
          child.name.text,
          expressionOf(rename.get(child.name.text), quote),
        )
      }
      if (
        ts.isCallExpression(child) &&
        child.expression.getText(sourceFile) === "Astro.slots.has" &&
        child.arguments.length === 1 &&
        ts.isStringLiteral(child.arguments[0])
      ) {
        return expressionOf(slotHas(child.arguments[0].text), quote)
      }
      if (
        ts.isPropertyAccessExpression(child) &&
        child.getText(sourceFile) === "Astro.locals"
      ) {
        return ts.factory.createIdentifier("uid")
      }
      if (
        style &&
        ts.isCallExpression(child) &&
        ts.isIdentifier(child.expression) &&
        child.expression.text === "mergeStyle" &&
        child.arguments.length === 2 &&
        ts.isIdentifier(child.arguments[1]) &&
        child.arguments[1].text === style.local
      ) {
        return ts.factory.createCallExpression(child.expression, undefined, [
          ts.visitNode(child.arguments[0], visit),
          expressionOf(style.code, quote),
        ])
      }
      if (
        ts.isIdentifier(child) &&
        rename.has(child.text) &&
        !(
          ts.isPropertyAccessExpression(child.parent) &&
          child.parent.name === child
        ) &&
        !(
          ts.isPropertyAssignment(child.parent) && child.parent.name === child
        ) &&
        !(
          ts.isBindingElement(child.parent) &&
          child.parent.propertyName === child
        )
      ) {
        return expressionOf(rename.get(child.text), quote)
      }
      if (ts.isStringLiteral(child) && quote === "'") {
        return ts.factory.createStringLiteral(child.text, true)
      }
      if (
        ts.isBinaryExpression(child) &&
        child.operatorToken.kind === ts.SyntaxKind.BarBarToken
      ) {
        const left = ts.visitNode(child.left, visit)
        const right = ts.visitNode(child.right, visit)
        const text = (node) =>
          printer.printNode(ts.EmitHint.Expression, node, sourceFile)
        return text(left) === text(right)
          ? left
          : ts.factory.createBinaryExpression(left, child.operatorToken, right)
      }
      if (ts.isObjectLiteralExpression(child)) {
        return ts.factory.createObjectLiteralExpression(
          child.properties.map((property) => ts.visitNode(property, visit)),
          false,
        )
      }
      if (ts.isArrayLiteralExpression(child)) {
        return ts.factory.createArrayLiteralExpression(
          child.elements.map((element) => ts.visitNode(element, visit)),
          false,
        )
      }
      return ts.visitEachChild(child, visit, context)
    }
    return ts.visitNode(node, visit)
  }

const transformed = (sourceFile, options) =>
  ts.transform(sourceFile, [transformer(sourceFile, options)]).transformed[0]

export const rewriteExpression = (code, options) => {
  const sourceFile = sourceFileOf(`(${code})`, "expression.ts")
  const [statement] = transformed(sourceFile, options).statements
  const text = printer.printNode(
    ts.EmitHint.Expression,
    statement.expression,
    sourceFile,
  )
  return text.replace(/^\((.*)\)$/s, "$1")
}

export const rewriteStatement = (code, options) => {
  const sourceFile = sourceFileOf(code, "statement.ts")
  return transformed(sourceFile, options)
    .statements.map((statement) =>
      printer.printNode(ts.EmitHint.Unspecified, statement, sourceFile),
    )
    .join("\n")
}

export const styleOption = (component, code) => {
  const style = component.props.find(({ prop }) => prop === "style")
  return style ? { code, local: style.local } : undefined
}

const PRINTED = sourceFileOf("", "printed.ts")

const printed = (node) =>
  printer.printNode(ts.EmitHint.Expression, node, PRINTED)

const propertyName = (key, quote) =>
  isIdentifierName(key)
    ? ts.factory.createIdentifier(key)
    : ts.factory.createStringLiteral(key, quote === "'")

export const objectCode = (entries, { quote = '"', shorthand = true } = {}) =>
  printed(
    ts.factory.createObjectLiteralExpression(
      entries.map((entry) =>
        entry.spread !== undefined
          ? ts.factory.createSpreadAssignment(expressionOf(entry.spread, quote))
          : shorthand && entry.code === entry.key
            ? ts.factory.createShorthandPropertyAssignment(entry.key)
            : ts.factory.createPropertyAssignment(
                propertyName(entry.key, quote),
                expressionOf(entry.code, quote),
              ),
      ),
      false,
    ),
  )

export const contextImports = (component, file, namesOf) =>
  component.contexts.flatMap((context) => {
    const names = [
      ...new Set([
        ...(component.provide?.context === context
          ? [namesOf.provide(context.name)]
          : []),
        ...(component.reads.some((read) => read.context === context)
          ? [namesOf.read(context.name)]
          : []),
      ]),
    ].toSorted(byName)
    if (names.length === 0) return []
    return [
      `import { ${names.join(", ")} } from "${context.folder ? `../${context.folder}` : "."}/context.${file}"`,
    ]
  })

const namedImport = (line) => {
  const [statement] = sourceFileOf(line, "import.ts").statements
  return statement &&
    ts.isImportDeclaration(statement) &&
    !statement.importClause?.isTypeOnly &&
    !statement.importClause?.name &&
    statement.importClause?.namedBindings &&
    ts.isNamedImports(statement.importClause.namedBindings)
    ? {
        module: statement.moduleSpecifier.text,
        names: statement.importClause.namedBindings.elements.map((element) =>
          element.getText(),
        ),
      }
    : undefined
}

export const withImport = (lines, module, name) => {
  const imports = lines.map(namedImport)
  const index = imports.findIndex((entry) => entry?.module === module)
  if (index === -1) return [...lines, `import { ${name} } from "${module}"`]
  const names = [...new Set([...imports[index].names, name])].toSorted(byName)
  return lines.with(index, `import { ${names.join(", ")} } from "${module}"`)
}

export const groupWarning = (
  component,
  item,
  checked,
  grouped = item.grouped,
) =>
  printed(
    ts.factory.createCallExpression(
      ts.factory.createIdentifier("warnGroupedChecked"),
      undefined,
      [
        ts.factory.createStringLiteral(component.name),
        expressionOf(grouped),
        expressionOf(checked),
        ts.factory.createStringLiteral(item.group),
      ],
    ),
  )

const helperImport = (component, folder, module) =>
  `${component.file.split("/").at(-2) === folder ? "." : `../${folder}`}/${module}`

export const selectionImport = (component) =>
  helperImport(component, "ToggleGroup", "selection")

export const scriptImports = (component) =>
  component.scripts.map((specifier) => `import ${JSON.stringify(specifier)}`)

export const slotOrder = (slots) => [
  ...slots.filter((slot) => slot === "default"),
  ...slots.filter((slot) => slot !== "default").toSorted(byName),
]

export const indent = (text, spaces) =>
  text
    .split("\n")
    .map((line) => (line ? " ".repeat(spaces) + line : line))
    .join("\n")

export const componentImport = ({ folder, local, name }, extension) =>
  `import ${local} from "${folder ? `../${folder}` : "."}/${name}${extension}"`

export const propsImport = (propsType, file, extra = []) =>
  `import type { ${[propsType === "Props" ? "Props" : `${propsType} as Props`, ...extra].join(", ")} } from "./${file}"`
