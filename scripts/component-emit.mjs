import ts from "typescript"
import { byName, printer, sourceFileOf } from "./component-shared.mjs"

const transformer =
  (
    sourceFile,
    { quote = '"', rename = new Map(), slotHas = (name) => name, style } = {},
  ) =>
  (context) =>
  (node) => {
    const visit = (child) => {
      if (
        ts.isCallExpression(child) &&
        child.expression.getText(sourceFile) === "Astro.slots.has" &&
        child.arguments.length === 1 &&
        ts.isStringLiteral(child.arguments[0])
      ) {
        return ts.factory.createIdentifier(slotHas(child.arguments[0].text))
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
          ts.factory.createIdentifier(style.code),
        ])
      }
      if (
        ts.isIdentifier(child) &&
        rename.has(child.text) &&
        !(
          ts.isPropertyAccessExpression(child.parent) &&
          child.parent.name === child
        ) &&
        !(ts.isPropertyAssignment(child.parent) && child.parent.name === child)
      ) {
        return ts.factory.createIdentifier(rename.get(child.text))
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

export const objectCode = (entries) =>
  `{ ${entries.map(({ code, key }) => (code === key ? key : `${key}: ${code}`)).join(", ")} }`

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

export const withImport = (lines, module, name) => {
  const index = lines.findIndex((line) =>
    new RegExp(
      `^import \\{[^}]*\\} from "${module.replace(/\./g, "\\.")}"$`,
    ).test(line),
  )
  if (index === -1) return [...lines, `import { ${name} } from "${module}"`]
  const names = [
    ...new Set([
      ...lines[index]
        .replace(/^import \{\s*|\s*\} from .*$/g, "")
        .split(/,\s*/),
      name,
    ]),
  ].toSorted(byName)
  return lines.with(index, `import { ${names.join(", ")} } from "${module}"`)
}

export const groupWarning = (component, item, checked) =>
  `warnGroupedChecked(${JSON.stringify(component.name)}, ${item.grouped}, ${checked}, ${JSON.stringify(item.group)})`

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
