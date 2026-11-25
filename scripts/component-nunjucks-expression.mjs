import ts from "typescript"
import { slotProp } from "../src/component-api/frameworks.ts"
import { sourceFileOf, unsupported, unwrap } from "./component-shared.mjs"

export const COMPILER = "scripts/component-nunjucks.mjs"

export const KEYWORDS = new Set([
  "False",
  "None",
  "True",
  "and",
  "else",
  "false",
  "if",
  "in",
  "is",
  "none",
  "not",
  "null",
  "or",
  "true",
])

const COMPARISONS = new Map([
  [ts.SyntaxKind.EqualsEqualsEqualsToken, "==="],
  [ts.SyntaxKind.EqualsEqualsToken, "=="],
  [ts.SyntaxKind.ExclamationEqualsEqualsToken, "!=="],
  [ts.SyntaxKind.ExclamationEqualsToken, "!="],
  [ts.SyntaxKind.GreaterThanEqualsToken, ">="],
  [ts.SyntaxKind.GreaterThanToken, ">"],
  [ts.SyntaxKind.LessThanEqualsToken, "<="],
  [ts.SyntaxKind.LessThanToken, "<"],
])

const ARITHMETIC = new Map([
  [ts.SyntaxKind.AsteriskToken, "*"],
  [ts.SyntaxKind.MinusToken, "-"],
  [ts.SyntaxKind.PercentToken, "%"],
  [ts.SyntaxKind.PlusToken, "+"],
  [ts.SyntaxKind.SlashToken, "/"],
])

const ID_FACTORY = "createIds"

const IDENTIFIER = /^[A-Za-z_][\w]*$/

export const nunjucksString = (value) =>
  `"${value.replace(/[\\"{}\n\r\t]/g, (char) =>
    char === "\n"
      ? "\\n"
      : char === "\r"
        ? "\\r"
        : char === "\t"
          ? "\\t"
          : `\\${char}`,
  )}"`

export const nunjucksName = (name) =>
  IDENTIFIER.test(name) && !KEYWORDS.has(name)
    ? `.${name}`
    : `[${nunjucksString(name)}]`

const kindOf = (node) => ts.SyntaxKind[node.kind]

const isChain = (node) => {
  const inner = unwrap(node)
  if (ts.isIdentifier(inner)) return true
  if (ts.isPropertyAccessExpression(inner)) return isChain(inner.expression)
  if (ts.isElementAccessExpression(inner)) {
    return (
      isChain(inner.expression) &&
      (ts.isStringLiteral(inner.argumentExpression) ||
        ts.isNumericLiteral(inner.argumentExpression))
    )
  }
  return false
}

const isAstroLocals = (node, sourceFile) =>
  unwrap(node).getText(sourceFile) === "Astro.locals"

const slotHas = (node, sourceFile) => {
  if (
    !ts.isCallExpression(node) ||
    node.expression.getText(sourceFile) !== "Astro.slots.has" ||
    node.arguments.length !== 1 ||
    !ts.isStringLiteral(node.arguments[0])
  ) {
    return undefined
  }
  return node.arguments[0].text
}

const idCall = (node) => {
  const factory = unwrap(node.expression)
  if (
    !ts.isCallExpression(factory) ||
    !ts.isIdentifier(factory.expression) ||
    factory.expression.text !== ID_FACTORY
  ) {
    return undefined
  }
  const [, prefix, id] = factory.arguments
  return { id, part: node.arguments[0], prefix }
}

export const nunjucksExpression = (code, scope) => {
  const sourceFile = sourceFileOf(`(${code})`, "expression.ts")
  const statement = sourceFile.statements[0]
  if (!statement || !ts.isExpressionStatement(statement)) {
    throw unsupported(
      "BC701",
      scope.file,
      `the expression \`${code}\``,
      "write a single expression",
      COMPILER,
    )
  }
  return translate(statement.expression, scope, sourceFile)
}

const translate = (root, scope, sourceFile) => {
  const refuse = (node, what) =>
    unsupported(
      "BC701",
      scope.file,
      `${what ?? kindOf(node)} in \`${node.getText(sourceFile)}\``,
      "move the logic into a helper in packages/opui/components/ and call it",
      COMPILER,
    )
  const identifier = (node) => {
    const name = node.text
    if (scope.locals?.has(name)) return name
    if (scope.props?.has(name))
      return `props${nunjucksName(scope.props.get(name))}`
    if (name === "undefined") return "opui.undefined"
    if (scope.helpers?.has(name)) return `opui.${name}`
    if (scope.imports?.has(name)) {
      throw unsupported(
        "BC702",
        scope.file,
        `the helper ${name}`,
        "export it from a module scripts/nunjucks-runtime.mjs registers",
        COMPILER,
      )
    }
    throw refuse(node, `the global ${name}`)
  }
  const call = (node) => {
    if (node.questionDotToken) throw refuse(node, "an optional call")
    if (node.arguments.some((argument) => ts.isSpreadElement(argument))) {
      throw refuse(node, "a spread argument")
    }
    const has = slotHas(node, sourceFile)
    if (has !== undefined) {
      return has === "default"
        ? "(caller is defined)"
        : `opui.has(props, ${nunjucksString(slotProp(has))})`
    }
    const ids = idCall(node)
    if (ids) {
      const prefix = unwrap(ids.prefix ?? node)
      if (!ts.isStringLiteral(prefix)) throw refuse(node, "an id prefix")
      const generated = `opui.id(${nunjucksString(prefix.text)})`
      const base = ids.id ? `(${visit(ids.id)} or ${generated})` : generated
      return ids.part ? `(${base} ~ "-" ~ ${visit(ids.part)})` : base
    }
    const callee = unwrap(node.expression)
    const args = node.arguments.map(visit).join(", ")
    if (ts.isIdentifier(callee)) {
      const name = callee.text
      if (scope.idPrefixes?.has(name) && node.arguments.length === 1) {
        return `opui.id(${args})`
      }
      if (scope.idBases?.has(name)) {
        const base = scope.idBases.get(name)
        return node.arguments.length ? `(${base} ~ "-" ~ ${args})` : base
      }
      if (!scope.locals?.has(name) && !scope.props?.has(name)) {
        if (name === "Boolean" && node.arguments.length === 1) {
          return `(not (not ${args}))`
        }
        if (name === "String" && node.arguments.length === 1) {
          return `("" ~ ${args})`
        }
      }
      return `${identifier(callee)}(${args})`
    }
    if (ts.isPropertyAccessExpression(callee))
      return `${visit(callee)}(${args})`
    throw refuse(node, "a call of a computed function")
  }
  const literal = (node) => {
    if (ts.isNumericLiteral(node)) {
      if (!/^\d+(\.\d+)?$/.test(node.getText(sourceFile))) {
        throw refuse(node, "a number Nunjucks can't read")
      }
      return node.getText(sourceFile)
    }
    return nunjucksString(node.text)
  }
  const template = (node) => {
    const head = node.head.text
    const [span] = node.templateSpans
    if (
      node.templateSpans.length === 1 &&
      isAstroLocals(span.expression, sourceFile) &&
      span.literal.text === "" &&
      head.endsWith("-")
    ) {
      return `opui.id(${nunjucksString(head.slice(0, -1))})`
    }
    const parts = [
      nunjucksString(head),
      ...node.templateSpans.flatMap((item) => [
        visit(item.expression),
        ...(item.literal.text ? [nunjucksString(item.literal.text)] : []),
      ]),
    ]
    return `(${parts.join(" ~ ")})`
  }
  const object = (node) => {
    const entries = node.properties.map((property) => {
      if (ts.isShorthandPropertyAssignment(property)) {
        return `${nunjucksString(property.name.text)}: ${identifier(property.name)}`
      }
      if (
        ts.isPropertyAssignment(property) &&
        (ts.isIdentifier(property.name) ||
          ts.isStringLiteral(property.name) ||
          ts.isNumericLiteral(property.name))
      ) {
        return `${nunjucksString(property.name.text)}: ${visit(property.initializer)}`
      }
      throw refuse(
        property,
        ts.isSpreadAssignment(property)
          ? "an object spread"
          : ts.isPropertyAssignment(property)
            ? "a computed key"
            : kindOf(property),
      )
    })
    return entries.length ? `{ ${entries.join(", ")} }` : "{}"
  }
  const array = (node) =>
    `[${node.elements
      .map((element) => {
        if (ts.isSpreadElement(element))
          throw refuse(element, "an array spread")
        if (ts.isOmittedExpression(element)) throw refuse(element, "a hole")
        return visit(element)
      })
      .join(", ")}]`
  const binary = (node) => {
    const operator = node.operatorToken.kind
    if (operator === ts.SyntaxKind.AmpersandAmpersandToken) {
      return `(${visit(node.left)} and ${visit(node.right)})`
    }
    if (operator === ts.SyntaxKind.BarBarToken) {
      return `(${visit(node.left)} or ${visit(node.right)})`
    }
    if (operator === ts.SyntaxKind.QuestionQuestionToken) {
      if (!isChain(node.left)) {
        throw refuse(node, "?? after an expression that isn't a name")
      }
      const left = visit(node.left)
      return `(${left} if ${left} != none else ${visit(node.right)})`
    }
    const comparison = COMPARISONS.get(operator)
    if (comparison) {
      return `(${visit(node.left)} ${comparison} ${visit(node.right)})`
    }
    const arithmetic = ARITHMETIC.get(operator)
    if (arithmetic) {
      return `(${visit(node.left)} ${arithmetic} ${visit(node.right)})`
    }
    throw refuse(node, `the operator ${node.operatorToken.getText(sourceFile)}`)
  }
  const visit = (node) => {
    if (
      ts.isAsExpression(node) ||
      ts.isNonNullExpression(node) ||
      ts.isSatisfiesExpression(node) ||
      ts.isTypeAssertionExpression(node)
    ) {
      return visit(node.expression)
    }
    if (ts.isParenthesizedExpression(node)) return visit(node.expression)
    if (ts.isIdentifier(node)) return identifier(node)
    if (
      ts.isStringLiteral(node) ||
      ts.isNoSubstitutionTemplateLiteral(node) ||
      ts.isNumericLiteral(node)
    ) {
      return literal(node)
    }
    if (node.kind === ts.SyntaxKind.TrueKeyword) return "true"
    if (node.kind === ts.SyntaxKind.FalseKeyword) return "false"
    if (node.kind === ts.SyntaxKind.NullKeyword) return "none"
    if (ts.isTemplateExpression(node)) return template(node)
    if (ts.isPrefixUnaryExpression(node)) {
      if (node.operator === ts.SyntaxKind.ExclamationToken) {
        return `(not ${visit(node.operand)})`
      }
      if (node.operator === ts.SyntaxKind.MinusToken) {
        return `(-${visit(node.operand)})`
      }
      throw refuse(node, `the operator ${ts.tokenToString(node.operator)}`)
    }
    if (ts.isConditionalExpression(node)) {
      return `(${visit(node.whenTrue)} if ${visit(node.condition)} else ${visit(node.whenFalse)})`
    }
    if (ts.isBinaryExpression(node)) return binary(node)
    if (ts.isPropertyAccessExpression(node)) {
      if (isAstroLocals(node, sourceFile)) throw refuse(node, "Astro.locals")
      if (ts.isPrivateIdentifier(node.name)) throw refuse(node)
      return `${visit(node.expression)}${nunjucksName(node.name.text)}`
    }
    if (ts.isElementAccessExpression(node)) {
      return `${visit(node.expression)}[${visit(node.argumentExpression)}]`
    }
    if (ts.isCallExpression(node)) return call(node)
    if (ts.isObjectLiteralExpression(node)) return object(node)
    if (ts.isArrayLiteralExpression(node)) return array(node)
    if (ts.isArrowFunction(node) || ts.isFunctionExpression(node)) {
      throw refuse(node, "a function")
    }
    throw refuse(node)
  }
  return visit(root)
}

export const nunjucksStatement = (code, scope) => {
  const sourceFile = sourceFileOf(code, "statement.ts")
  const [statement] = sourceFile.statements
  const calls = (node) => {
    const statements = ts.isBlock(node) ? node.statements : [node]
    return statements.map((item) => {
      if (
        !ts.isExpressionStatement(item) ||
        !ts.isCallExpression(item.expression)
      ) {
        throw unsupported(
          "BC701",
          scope.file,
          `the statement \`${item.getText(sourceFile)}\``,
          "call a helper",
          COMPILER,
        )
      }
      return `{{ ${translate(item.expression, scope, sourceFile)} }}`
    })
  }
  if (ts.isIfStatement(statement) && !statement.elseStatement) {
    return `{% if ${translate(statement.expression, scope, sourceFile)} %}${calls(statement.thenStatement).join("")}{% endif %}`
  }
  return calls(statement).join("")
}
