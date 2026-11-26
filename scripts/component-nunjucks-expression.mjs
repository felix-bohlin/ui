import ts from "typescript"
import { slotProp } from "../src/component-api/frameworks.ts"
import { inResult } from "./component-nunjucks-facts.mjs"
import {
  containsKind,
  sourceFileOf,
  unsupported,
  unwrap,
} from "./component-shared.mjs"

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

export const LEVEL = {
  and: 3,
  compare: 7,
  concat: 8,
  filter: 16,
  if: 1,
  is: 6,
  not: 4,
  or: 2,
  primary: 17,
}

const ARITHMETIC = new Map([
  [ts.SyntaxKind.AsteriskToken, ["*", 11]],
  [ts.SyntaxKind.MinusToken, ["-", 10]],
  [ts.SyntaxKind.PercentToken, ["%", 14]],
  [ts.SyntaxKind.PlusToken, ["+", 9]],
  [ts.SyntaxKind.SlashToken, ["/", 12]],
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

const LOOSE = new Map([
  ["!==", "!="],
  ["===", "=="],
])

const IDENTIFIER = /^[A-Za-z_][\w]*$/

const ID_FACTORY = "createIds"

export const nunjucksString = (value, quote = '"') => {
  const mark = quote === "'" && !value.includes("'") ? "'" : '"'
  const escaped = value.replace(
    mark === "'" ? /[\\\n\r\t]/g : /[\\"\n\r\t]/g,
    (char) =>
      char === "\n"
        ? "\\n"
        : char === "\r"
          ? "\\r"
          : char === "\t"
            ? "\\t"
            : `\\${char}`,
  )
  return `${mark}${escaped}${mark}`
}

const isName = (name) => IDENTIFIER.test(name) && !KEYWORDS.has(name)

export const nunjucksName = (name) =>
  isName(name) ? `.${name}` : `[${nunjucksString(name)}]`

export const nunjucksKey = (name) =>
  isName(name) ? name : nunjucksString(name)

export const at = ({ level, text }, min) => (level >= min ? text : `(${text})`)

export const dict = (entries) =>
  entries.length
    ? `{ ${entries.map(([key, value]) => `${nunjucksKey(key)}: ${value}`).join(", ")} }`
    : "{}"

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

const isUndefined = (node, scope) =>
  ts.isIdentifier(node) &&
  node.text === "undefined" &&
  !scope.locals?.has("undefined")

const isNull = (node) => node.kind === ts.SyntaxKind.NullKeyword

const isAstroLocals = (node, sourceFile) =>
  unwrap(node).getText(sourceFile) === "Astro.locals"

const slotHas = (node, sourceFile) =>
  ts.isCallExpression(node) &&
  node.expression.getText(sourceFile) === "Astro.slots.has" &&
  node.arguments.length === 1 &&
  ts.isStringLiteral(node.arguments[0])
    ? node.arguments[0].text
    : undefined

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

export const slotRead = (name) =>
  name === "default" ? "caller" : `props.slots${nunjucksName(slotProp(name))}`

export const slotPresent = (name) =>
  name === "default"
    ? { level: LEVEL.is, text: "caller is defined" }
    : { level: LEVEL.compare, text: `${slotRead(name)} != none` }

const parse = (code, file) => {
  const sourceFile = sourceFileOf(`(${code})`, "expression.ts")
  const statement = sourceFile.statements[0]
  if (!statement || !ts.isExpressionStatement(statement)) {
    throw unsupported(
      "BC701",
      file,
      `the expression \`${code}\``,
      "write a single expression",
      COMPILER,
    )
  }
  return { node: statement.expression, sourceFile }
}

export const nunjucksValue = (code, scope) => {
  const { node, sourceFile } = parse(code, scope.file)
  return translate(node, scope, sourceFile)
}

export const nunjucksExpression = (code, scope) =>
  nunjucksValue(code, scope).text

const translate = (root, scope, sourceFile) => {
  const refuse = (node, what) =>
    unsupported(
      "BC701",
      scope.file,
      `${what ?? kindOf(node)} in \`${node.getText(sourceFile)}\``,
      "move the logic into a helper in packages/opui/components/ and call it",
      COMPILER,
    )
  const primary = (text) => ({ level: LEVEL.primary, text })
  const string = (raw) => ({
    level: LEVEL.primary,
    string: raw,
    text: nunjucksString(raw, scope.quote),
  })
  const binary = (left, operator, right, level) => ({
    level,
    text: `${at(left, level)} ${operator} ${at(right, level + 1)}`,
  })
  const identifier = (node) => {
    const name = node.text
    if (scope.renames?.has(name)) return scope.renames.get(name)
    if (scope.locals?.has(name)) return primary(name)
    if (scope.props?.has(name)) {
      return primary(`props${nunjucksName(scope.props.get(name))}`)
    }
    if (name === "undefined") {
      return primary(
        scope.undefinedAs === "none" && inResult(node) ? "none" : "undefined",
      )
    }
    if (scope.helpers?.has(name)) return primary(`opui.${name}`)
    if (scope.imports?.has(name)) {
      throw unsupported(
        "BC702",
        scope.file,
        `the helper ${name}`,
        "export it from a module in packages/opui/components/ that scripts/component-nunjucks.mjs finds",
        COMPILER,
      )
    }
    throw refuse(node, `the global ${name}`)
  }
  const known = (node, names) =>
    ts.isIdentifier(unwrap(node)) && !!names?.has(unwrap(node).text)
  const comparison = (node, operator) => {
    const [subject, other] = isUndefined(node.right, scope)
      ? [node.left, node.right]
      : [node.right, node.left]
    if (isUndefined(other, scope) && operator.length === 3) {
      return {
        level: LEVEL.is,
        text: `${at(visit(subject), LEVEL.compare)} is ${operator === "===" ? "undefined" : "defined"}`,
      }
    }
    const [value, empty] = isNull(node.right)
      ? [node.left, node.right]
      : [node.right, node.left]
    if (isNull(empty) && operator.length === 3) {
      return {
        level: LEVEL.is,
        text: `${at(visit(value), LEVEL.compare)} is ${operator === "===" ? "" : "not "}null`,
      }
    }
    const loose =
      LOOSE.has(operator) &&
      ((ts.isStringLiteral(unwrap(node.left)) &&
        known(node.right, scope.strings)) ||
        (ts.isStringLiteral(unwrap(node.right)) &&
          known(node.left, scope.strings)) ||
        (ts.isNumericLiteral(unwrap(node.left)) &&
          known(node.right, scope.numbers)) ||
        (ts.isNumericLiteral(unwrap(node.right)) &&
          known(node.left, scope.numbers)))
    return {
      level: LEVEL.compare,
      text: `${at(visit(node.left), LEVEL.concat)} ${loose ? LOOSE.get(operator) : operator} ${at(visit(node.right), LEVEL.concat)}`,
    }
  }
  const call = (node) => {
    if (node.questionDotToken) throw refuse(node, "an optional call")
    if (node.arguments.some((argument) => ts.isSpreadElement(argument))) {
      throw refuse(node, "a spread argument")
    }
    const has = slotHas(node, sourceFile)
    if (has !== undefined) return slotPresent(has)
    const ids = idCall(node)
    if (ids) {
      const prefix = ids.prefix && unwrap(ids.prefix)
      if (!prefix || !ts.isStringLiteral(prefix)) {
        throw refuse(node, "an id prefix")
      }
      const generated = primary(
        `opui.id(${nunjucksString(prefix.text, scope.quote)})`,
      )
      const base = ids.id
        ? {
            level: LEVEL.or,
            text: `${at(visit(ids.id), LEVEL.or)} or ${generated.text}`,
          }
        : generated
      return ids.part ? concat([base, string("-"), visit(ids.part)]) : base
    }
    const callee = unwrap(node.expression)
    const args = () => node.arguments.map((item) => visit(item).text).join(", ")
    if (ts.isIdentifier(callee)) {
      const name = callee.text
      if (scope.idPrefixes?.has(name) && node.arguments.length === 1) {
        return primary(`opui.id(${args()})`)
      }
      if (!scope.locals?.has(name) && !scope.props?.has(name)) {
        if (name === "Boolean" && node.arguments.length === 1) {
          return {
            level: LEVEL.if,
            text: `true if ${at(visit(node.arguments[0]), LEVEL.or)} else false`,
          }
        }
        if (name === "String" && node.arguments.length === 1) {
          return concat([visit(node.arguments[0]), string("")])
        }
      }
      return primary(`${identifier(callee).text}(${args()})`)
    }
    if (ts.isPropertyAccessExpression(callee)) {
      return primary(`${visit(callee).text}(${args()})`)
    }
    throw refuse(node, "a call of a computed function")
  }
  const concat = (parts) => {
    const merged = parts.reduce((list, part) => {
      const last = list.at(-1)
      return last?.string !== undefined && part.string !== undefined
        ? [...list.slice(0, -1), string(`${last.string}${part.string}`)]
        : [...list, part]
    }, [])
    if (merged.length === 1) {
      return merged[0].string === undefined
        ? concat([merged[0], string("")])
        : merged[0]
    }
    return {
      level: LEVEL.concat,
      text: merged
        .map((part, index) => at(part, index ? LEVEL.concat + 1 : LEVEL.concat))
        .join(" ~ "),
    }
  }
  const literal = (node) => {
    if (ts.isNumericLiteral(node)) {
      if (!/^\d+(\.\d+)?$/.test(node.getText(sourceFile))) {
        throw refuse(node, "a number Nunjucks can't read")
      }
      return primary(node.getText(sourceFile))
    }
    return string(node.text)
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
      return primary(
        `opui.id(${nunjucksString(head.slice(0, -1), scope.quote)})`,
      )
    }
    return concat([
      ...(head ? [string(head)] : []),
      ...node.templateSpans.flatMap((item) => [
        visit(item.expression),
        ...(item.literal.text ? [string(item.literal.text)] : []),
      ]),
    ])
  }
  const object = (node) => {
    const parts = []
    let entries = []
    const flush = () => {
      if (entries.length) parts.push(dict(entries))
      entries = []
    }
    for (const property of node.properties) {
      if (ts.isSpreadAssignment(property)) {
        flush()
        parts.push(visit(property.expression).text)
        continue
      }
      if (ts.isShorthandPropertyAssignment(property)) {
        entries.push([property.name.text, identifier(property.name).text])
        continue
      }
      if (
        ts.isPropertyAssignment(property) &&
        (ts.isIdentifier(property.name) ||
          ts.isStringLiteral(property.name) ||
          ts.isNumericLiteral(property.name))
      ) {
        entries.push([property.name.text, visit(property.initializer).text])
        continue
      }
      throw refuse(
        property,
        ts.isPropertyAssignment(property) ? "a computed key" : kindOf(property),
      )
    }
    flush()
    if (parts.length === 0) return primary("{}")
    return primary(
      parts.length === 1 && !node.properties.some(ts.isSpreadAssignment)
        ? parts[0]
        : `opui.merge(${parts.join(", ")})`,
    )
  }
  const array = (node) =>
    primary(
      `[${node.elements
        .map((element) => {
          if (ts.isSpreadElement(element)) {
            throw refuse(element, "an array spread")
          }
          if (ts.isOmittedExpression(element)) throw refuse(element, "a hole")
          return visit(element).text
        })
        .join(", ")}]`,
    )
  const binaryExpression = (node) => {
    const operator = node.operatorToken.kind
    if (operator === ts.SyntaxKind.AmpersandAmpersandToken) {
      return binary(visit(node.left), "and", visit(node.right), LEVEL.and)
    }
    if (operator === ts.SyntaxKind.BarBarToken) {
      return binary(visit(node.left), "or", visit(node.right), LEVEL.or)
    }
    if (operator === ts.SyntaxKind.QuestionQuestionToken) {
      if (!isChain(node.left)) {
        throw refuse(node, "?? after an expression that isn't a name")
      }
      const left = visit(node.left)
      const name = unwrap(node.left)
      if (
        ts.isIdentifier(name) &&
        !scope.renames?.has(name.text) &&
        !scope.locals?.has(name.text) &&
        scope.props?.has(name.text) &&
        !scope.keepsNone?.has(name.text) &&
        !containsKind(node.right, ts.isCallExpression)
      ) {
        return {
          level: LEVEL.filter,
          text: `${at(left, LEVEL.filter)} | default(${visit(node.right).text})`,
        }
      }
      return {
        level: LEVEL.if,
        text: `${at(left, LEVEL.or)} if ${at(left, LEVEL.concat)} != none else ${at(visit(node.right), LEVEL.or)}`,
      }
    }
    const compared = COMPARISONS.get(operator)
    if (compared) return comparison(node, compared)
    const arithmetic = ARITHMETIC.get(operator)
    if (arithmetic) {
      const [symbol, level] = arithmetic
      return binary(visit(node.left), symbol, visit(node.right), level)
    }
    throw refuse(node, `the operator ${node.operatorToken.getText(sourceFile)}`)
  }
  const visit = (node) => {
    if (
      ts.isAsExpression(node) ||
      ts.isNonNullExpression(node) ||
      ts.isSatisfiesExpression(node) ||
      ts.isTypeAssertionExpression(node) ||
      ts.isParenthesizedExpression(node)
    ) {
      return visit(node.expression)
    }
    if (ts.isIdentifier(node)) return identifier(node)
    if (
      ts.isStringLiteral(node) ||
      ts.isNoSubstitutionTemplateLiteral(node) ||
      ts.isNumericLiteral(node)
    ) {
      return literal(node)
    }
    if (node.kind === ts.SyntaxKind.TrueKeyword) return primary("true")
    if (node.kind === ts.SyntaxKind.FalseKeyword) return primary("false")
    if (isNull(node)) return primary("none")
    if (ts.isTemplateExpression(node)) return template(node)
    if (ts.isPrefixUnaryExpression(node)) {
      if (
        node.operator === ts.SyntaxKind.ExclamationToken &&
        ts.isPrefixUnaryExpression(node.operand) &&
        node.operand.operator === ts.SyntaxKind.ExclamationToken
      ) {
        return {
          level: LEVEL.if,
          text: `true if ${at(visit(node.operand.operand), LEVEL.or)} else false`,
        }
      }
      if (node.operator === ts.SyntaxKind.ExclamationToken) {
        return {
          level: LEVEL.not,
          text: `not ${at(visit(node.operand), LEVEL.not)}`,
        }
      }
      if (node.operator === ts.SyntaxKind.MinusToken) {
        return {
          level: LEVEL.filter,
          text: `-${at(visit(node.operand), LEVEL.filter)}`,
        }
      }
      throw refuse(node, `the operator ${ts.tokenToString(node.operator)}`)
    }
    if (ts.isConditionalExpression(node)) {
      return {
        level: LEVEL.if,
        text: `${at(visit(node.whenTrue), LEVEL.or)} if ${at(visit(node.condition), LEVEL.or)} else ${at(visit(node.whenFalse), LEVEL.or)}`,
      }
    }
    if (ts.isBinaryExpression(node)) return binaryExpression(node)
    if (ts.isPropertyAccessExpression(node)) {
      if (isAstroLocals(node, sourceFile)) throw refuse(node, "Astro.locals")
      if (ts.isPrivateIdentifier(node.name)) throw refuse(node)
      return primary(
        `${at(visit(node.expression), LEVEL.primary)}${nunjucksName(node.name.text)}`,
      )
    }
    if (ts.isElementAccessExpression(node)) {
      return primary(
        `${at(visit(node.expression), LEVEL.primary)}[${visit(node.argumentExpression).text}]`,
      )
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
      return `{{ ${translate(item.expression, scope, sourceFile).text} }}`
    })
  }
  if (ts.isIfStatement(statement) && !statement.elseStatement) {
    const test = translate(statement.expression, scope, sourceFile)
    const lines = calls(statement.thenStatement)
    return lines.length === 1
      ? `${lines[0].slice(0, -3)} if ${at(test, LEVEL.or)} }}`
      : `{% if ${test.text} %}${lines.join("")}{% endif %}`
  }
  return calls(statement).join("")
}

export const isNonNull = (code, scope) => {
  const sourceFile = sourceFileOf(`(${code})`, "expression.ts")
  const check = (node) => {
    const inner = unwrap(node)
    if (
      ts.isStringLiteral(inner) ||
      ts.isNoSubstitutionTemplateLiteral(inner) ||
      ts.isTemplateExpression(inner) ||
      ts.isNumericLiteral(inner)
    ) {
      return true
    }
    if (ts.isIdentifier(inner)) {
      return (
        !!scope.nonNull?.has(inner.text) ||
        (!!scope.guarded?.has(inner.text) &&
          !!scope.facts?.has(scope.guarded.get(inner.text)))
      )
    }
    if (ts.isConditionalExpression(inner)) {
      return check(inner.whenTrue) && check(inner.whenFalse)
    }
    if (ts.isBinaryExpression(inner)) {
      const operator = inner.operatorToken.kind
      if (
        operator === ts.SyntaxKind.BarBarToken ||
        operator === ts.SyntaxKind.QuestionQuestionToken
      ) {
        return check(inner.right)
      }
      return false
    }
    if (ts.isCallExpression(inner)) {
      const callee = unwrap(inner.expression)
      if (ts.isIdentifier(callee)) {
        return (
          !!scope.idPrefixes?.has(callee.text) ||
          !!scope.idBases?.has(callee.text)
        )
      }
      return !!idCall(inner)
    }
    return false
  }
  return check(sourceFile.statements[0].expression)
}
