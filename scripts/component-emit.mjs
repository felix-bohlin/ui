import ts from "typescript"
import {
  asFragment,
  code,
  fragment,
  named,
  needsOf,
  uses,
} from "./component-fragment.ts"
import {
  byName,
  isBlank,
  isIdentifierName,
  printer,
  sourceFileOf,
  unsupported,
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

const parseExpression = (text) => {
  const sourceFile = sourceFileOf(`(${text})`, "replacement.ts")
  const node = synthesized(unwrap(sourceFile.statements[0].expression))
  return ts.isBinaryExpression(node) || ts.isConditionalExpression(node)
    ? ts.factory.createParenthesizedExpression(node)
    : node
}

const expressionOf = (text) => {
  if (!expressions.has(text)) expressions.set(text, parseExpression(text))
  return expressions.get(text)
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

const templateOf = (head, spans) =>
  ts.factory.createTemplateExpression(
    ts.factory.createTemplateHead(head),
    spans.map(([expression, text], index) =>
      ts.factory.createTemplateSpan(
        expression,
        index === spans.length - 1
          ? ts.factory.createTemplateTail(text)
          : ts.factory.createTemplateMiddle(text),
      ),
    ),
  )

const UID = fragment("uid", { declarations: ["uid"] })

const generatedId = (prefix, uid) => templateOf(`${prefix}-`, [[uid, ""]])

const ownName = (property) =>
  ts.isShorthandPropertyAssignment(property)
    ? property.name.text
    : ts.isPropertyAssignment(property) &&
        ts.isIdentifier(property.name) &&
        ts.isIdentifier(property.initializer) &&
        property.initializer.text === property.name.text
      ? property.name.text
      : undefined

const isWholeProps = (node, whole, rename) => {
  const [first, ...others] = node.properties
  return (
    whole !== undefined &&
    first !== undefined &&
    ts.isSpreadAssignment(first) &&
    ts.isIdentifier(first.expression) &&
    first.expression.text === whole.rest &&
    others.length > 0 &&
    others.every((property) => {
      const name = ownName(property)
      return name !== undefined && rename.has(name) && whole.props(name)
    })
  )
}

const NO_IDS = { bases: new Map(), prefixes: new Set() }

const NO_NAMES = new Set()

const grouped = (node) =>
  ts.isBinaryExpression(node) || ts.isConditionalExpression(node)
    ? ts.factory.createParenthesizedExpression(node)
    : node

const transformer =
  (
    sourceFile,
    {
      declared = NO_NAMES,
      ids = NO_IDS,
      rename = new Map(),
      slotHas = (name) => name,
      style,
      wholeProps,
    } = {},
    tracked = new Map(),
  ) =>
  (context) =>
  (node) => {
    const renamed = (name, read) => {
      const value = rename.get(name)
      return typeof value === "function" ? value(read) : value
    }
    const substituted = (part) => {
      const replacement = asFragment(part)
      const cached = expressionOf(replacement.code)
      const expression =
        tracked.has(cached) && tracked.get(cached) !== replacement
          ? parseExpression(replacement.code)
          : cached
      tracked.set(expression, replacement)
      return expression
    }
    const scoped = (names) => {
      const inner = new Map(rename)
      names.forEach((name) => inner.delete(name))
      return transformer(
        sourceFile,
        {
          declared: new Set(
            [...declared].filter((name) => !names.includes(name)),
          ),
          ids,
          rename: inner,
          slotHas,
          style,
          wholeProps,
        },
        tracked,
      )(context)
    }
    const visit = (child) => {
      const shadowed = shadowedBy(child).filter(
        (name) => rename.has(name) || declared.has(name),
      )
      if (shadowed.length > 0) {
        return ts.visitEachChild(child, scoped(shadowed), context)
      }
      const [part] = ts.isCallExpression(child) ? child.arguments : []
      const named = part && ts.isStringLiteral(part) ? part.text : undefined
      if (ts.isCallExpression(child) && ts.isIdentifier(child.expression)) {
        const base = ids.bases.get(child.expression.text)
        if (base && (!part || named !== undefined)) {
          const value = substituted(
            renamed(base, child) ??
              (declared.has(base)
                ? fragment(base, { declarations: [base] })
                : base),
          )
          return part ? templateOf("", [[value, `-${named}`]]) : value
        }
        if (ids.prefixes.has(child.expression.text) && named !== undefined) {
          return generatedId(named, substituted(UID))
        }
      }
      if (
        ts.isCallExpression(child) &&
        ts.isCallExpression(child.expression) &&
        ts.isIdentifier(child.expression.expression) &&
        child.expression.expression.text === "createIds" &&
        child.arguments.length === 1 &&
        named !== undefined
      ) {
        const [, prefix, id] = child.expression.arguments
        const fallback = generatedId(prefix.text, substituted(UID))
        const base = id
          ? ts.factory.createBinaryExpression(
              grouped(ts.visitNode(id, visit)),
              ts.SyntaxKind.BarBarToken,
              fallback,
            )
          : fallback
        return templateOf("", [[base, `-${named}`]])
      }
      if (
        ts.isShorthandPropertyAssignment(child) &&
        rename.has(child.name.text)
      ) {
        return ts.factory.createPropertyAssignment(
          child.name.text,
          substituted(renamed(child.name.text, child.name)),
        )
      }
      if (
        ts.isCallExpression(child) &&
        child.expression.getText(sourceFile) === "Astro.slots.has" &&
        child.arguments.length === 1 &&
        ts.isStringLiteral(child.arguments[0])
      ) {
        return substituted(slotHas(child.arguments[0].text))
      }
      if (
        ts.isPropertyAccessExpression(child) &&
        child.getText(sourceFile) === "Astro.locals"
      ) {
        return substituted(UID)
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
          expressionOf(style.code),
        ])
      }
      const read =
        ts.isIdentifier(child) &&
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
      if (read && rename.has(child.text)) {
        return substituted(renamed(child.text, child))
      }
      if (read && declared.has(child.text)) {
        tracked.set(child, fragment(child.text, { declarations: [child.text] }))
        return child
      }
      if (
        ts.isBinaryExpression(child) &&
        child.operatorToken.kind === ts.SyntaxKind.BarBarToken
      ) {
        const left = ts.visitNode(child.left, visit)
        const right = ts.visitNode(child.right, visit)
        const text = (node) =>
          printer.printNode(ts.EmitHint.Expression, node, sourceFile)
        const negated = (node) =>
          ts.isPrefixUnaryExpression(node) &&
          node.operator === ts.SyntaxKind.ExclamationToken
            ? node.operand
            : undefined
        const coerced = negated(left) && negated(negated(left))
        const filledOf = (node) =>
          ts.isCallExpression(node) &&
          ts.isIdentifier(node.expression) &&
          node.expression.text === "filled" &&
          node.arguments.length === 1
            ? node.arguments[0]
            : undefined
        if (
          filledOf(right) &&
          [left, coerced].some(
            (node) => node && text(node) === text(filledOf(right)),
          )
        ) {
          return right
        }
        return text(left) === text(right) ||
          (coerced && text(coerced) === text(right))
          ? left
          : ts.factory.createBinaryExpression(left, child.operatorToken, right)
      }
      if (
        ts.isObjectLiteralExpression(child) &&
        isWholeProps(child, wholeProps, rename)
      ) {
        return ts.factory.createIdentifier("props")
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

const transformed = (sourceFile, options) => {
  const tracked = new Map()
  const [result] = ts.transform(sourceFile, [
    transformer(sourceFile, options, tracked),
  ]).transformed
  const parts = []
  const collect = (node) => {
    if (tracked.has(node)) parts.push(tracked.get(node))
    else ts.forEachChild(node, collect)
  }
  collect(result)
  return { needs: needsOf(parts), result }
}

export const rewriteFragment = (code, options) => {
  const sourceFile = sourceFileOf(`(${code})`, "expression.ts")
  const { needs, result } = transformed(sourceFile, options)
  const [statement] = result.statements
  return fragment(
    printer.printNode(
      ts.EmitHint.Expression,
      ts.isParenthesizedExpression(statement.expression)
        ? statement.expression.expression
        : statement.expression,
      sourceFile,
    ),
    needs,
  )
}

export const rewriteExpression = (code, options) =>
  rewriteFragment(code, options).code

export const rewriteStatementFragment = (code, options) => {
  const sourceFile = sourceFileOf(code, "statement.ts")
  const { needs, result } = transformed(sourceFile, options)
  return fragment(
    result.statements
      .map((statement) =>
        printer.printNode(ts.EmitHint.Unspecified, statement, sourceFile),
      )
      .join("\n"),
    needs,
  )
}

export const rewriteStatement = (code, options) =>
  rewriteStatementFragment(code, options).code

const DEV = ts.factory.createIdentifier("DEV")

const DEV_IMPORT = named("../dev", "DEV")

export const devOnly = (part) => {
  const warning = asFragment(part)
  const sourceFile = sourceFileOf(warning.code, "warning.ts")
  const text = sourceFile.statements
    .map((statement) =>
      printer.printNode(
        ts.EmitHint.Unspecified,
        ts.isIfStatement(statement) && !statement.elseStatement
          ? ts.factory.updateIfStatement(
              statement,
              ts.factory.createLogicalAnd(DEV, statement.expression),
              statement.thenStatement,
              undefined,
            )
          : ts.factory.createIfStatement(DEV, statement),
        sourceFile,
      ),
    )
    .join("\n")
  return uses(fragment(text, needsOf([warning])), DEV_IMPORT)
}

export const chosenSpreadCode = (item, spread, condition) =>
  item.negated
    ? code`${condition} ? {} : ${spread}`
    : code`${condition} ? ${spread} : {}`

export const styleOption = (component, text) => {
  const style = component.props.find(({ prop }) => prop === "style")
  return style ? { code: text, local: style.local } : undefined
}

const PRINTED = sourceFileOf("", "printed.ts")

const printed = (node) =>
  printer.printNode(ts.EmitHint.Expression, node, PRINTED)

const propertyName = (key) =>
  isIdentifierName(key)
    ? ts.factory.createIdentifier(key)
    : ts.factory.createStringLiteral(key)

const objectProperties = (entries, { shorthand = true } = {}) =>
  entries.map((entry) =>
    entry.spread !== undefined
      ? ts.factory.createSpreadAssignment(expressionOf(entry.spread))
      : shorthand && entry.code === entry.key
        ? ts.factory.createShorthandPropertyAssignment(entry.key)
        : ts.factory.createPropertyAssignment(
            propertyName(entry.key),
            expressionOf(entry.code),
          ),
  )

export const objectCode = (entries, options) =>
  printed(
    ts.factory.createObjectLiteralExpression(
      objectProperties(entries, options),
      false,
    ),
  )

export const objectMembers = (entries, options) =>
  objectProperties(entries, options).map((property) =>
    printer.printNode(ts.EmitHint.Unspecified, property, PRINTED),
  )

export const contextModule = (context, file) =>
  `${context.folder ? `../${context.folder}` : "."}/context.${file}`

export const contextModules = (component, file) =>
  component.contexts.map((context) => contextModule(context, file))

export const contextLines = (component, file, imports) =>
  contextModules(component, file).flatMap((module) => imports.line(module))

export const importedNames = (lines) =>
  lines.flatMap((line) => {
    const clause = sourceFileOf(line, "import.ts").statements[0]?.importClause
    if (!clause) return []
    const bindings = clause.namedBindings
    return [
      ...(clause.name ? [clause.name.text] : []),
      ...(bindings && ts.isNamedImports(bindings)
        ? bindings.elements.map((element) => element.name.text)
        : bindings
          ? [bindings.name.text]
          : []),
    ]
  })

export const groupWarning = (
  component,
  item,
  checked,
  grouped = item.grouped,
) =>
  uses(
    fragment(
      printed(
        ts.factory.createCallExpression(
          ts.factory.createIdentifier("warnGroupedChecked"),
          undefined,
          [
            ts.factory.createStringLiteral(component.name),
            expressionOf(asFragment(grouped).code),
            expressionOf(asFragment(checked).code),
            ts.factory.createStringLiteral(item.group),
          ],
        ),
      ),
      needsOf([grouped, checked]),
    ),
    named("../dev", "warnGroupedChecked"),
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

export const eventRoots = (component) => {
  const { events = [], multiRoot, rootElements } = component
  if (events.length === 0) return []
  if (
    multiRoot ||
    rootElements.length === 0 ||
    rootElements.some((node) => node.component)
  ) {
    throw unsupported(
      "BC404",
      component.file,
      `the event ${events[0]} on a component whose root isn't one element`,
      "render one root element, the one that fires the event, or drop the Events type from types.ts",
    )
  }
  return rootElements
}

export const hydratingRoots = (component, listened = eventRoots(component)) =>
  new Map(
    listened
      .filter((node) => component.customRoots.has(node))
      .map((node) => [node, component.customRoots.get(node)]),
  )

export const isLoose = (node) =>
  isBlank(node) && node.value !== " " && !node.inline

export const edgeTrimmed = (nodes, { interpolated = true } = {}) => {
  let start = 0
  let end = nodes.length
  while (start < end && isLoose(nodes[start])) start++
  while (end > start && isLoose(nodes[end - 1])) end--
  const inner = nodes.slice(start, end)
  const edges = [inner[0], inner.at(-1)]
  const lone = inner.length === 1 && inner[0].type === "expression"
  return inner.length > 0 &&
    !lone &&
    edges.every(
      (edge) =>
        edge.type !== "text" && (interpolated || edge.type !== "expression"),
    )
    ? inner
    : undefined
}

export const truthyNames = (code) => {
  const names = []
  const visit = (node) => {
    const inner = unwrap(node)
    if (
      ts.isBinaryExpression(inner) &&
      inner.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken
    ) {
      visit(inner.left)
      visit(inner.right)
    } else if (ts.isIdentifier(inner)) {
      names.push(inner.text)
    }
  }
  visit(sourceFileOf(`(${code})`, "test.ts").statements[0].expression)
  return names
}
