import ts from "typescript"
import { identifierCounts, sourceFileOf, unwrap } from "./component-shared.mjs"

export const keyOf = (node) => {
  const inner = unwrap(node)
  if (ts.isIdentifier(inner) || ts.isPrivateIdentifier(inner)) {
    return `I:${inner.text}`
  }
  if (
    ts.isStringLiteral(inner) ||
    ts.isNoSubstitutionTemplateLiteral(inner) ||
    ts.isTemplateHead(inner) ||
    ts.isTemplateMiddle(inner) ||
    ts.isTemplateTail(inner)
  ) {
    return `S${inner.kind}:${JSON.stringify(inner.text)}`
  }
  if (ts.isNumericLiteral(inner)) return `N:${inner.text}`
  const parts = []
  ts.forEachChild(inner, (child) => {
    parts.push(keyOf(child))
  })
  const operator =
    ts.isPrefixUnaryExpression(inner) || ts.isPostfixUnaryExpression(inner)
      ? `.${inner.operator}`
      : ""
  return `${inner.kind}${operator}(${parts.join(",")})`
}

const parse = (code, statement = false) => {
  const sourceFile = sourceFileOf(statement ? code : `(${code})`, "facts.ts")
  return { root: sourceFile.statements[0], sourceFile }
}

const isReference = (node) =>
  ts.isIdentifier(node) &&
  !(ts.isPropertyAccessExpression(node.parent) && node.parent.name === node) &&
  !(ts.isPropertyAssignment(node.parent) && node.parent.name === node)

const isAnd = (node) =>
  ts.isBinaryExpression(node) &&
  node.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken

export const keyOfCode = (code) => keyOf(parse(code).root.expression)

export const conditionsOf = (code) => {
  const { root } = parse(code)
  const found = new Set()
  const visit = (node) => {
    const inner = unwrap(node)
    found.add(keyOf(inner))
    if (isAnd(inner)) {
      visit(inner.left)
      visit(inner.right)
    }
  }
  visit(root.expression)
  return found
}

export const under = (facts, code) => new Set([...facts, ...conditionsOf(code)])

export const mentions = (key, names) => {
  const tokens = new Set(key.replace(/"(?:[^"\\]|\\.)*"/g, '""').split(/[(),]/))
  return [...names].some((name) => tokens.has(`I:${name}`))
}

export const itemWarning = ({ item, name }) =>
  item
    ? `warnGroupedChecked(${JSON.stringify(name)}, ${item.grouped}, ${item.checked ?? "undefined"}, ${JSON.stringify(item.group)})`
    : undefined

export const expand = (
  code,
  { facts = new Set(), inline = new Map() } = {},
) => {
  if (!facts.size && !inline.size) return code
  const { root, sourceFile } = parse(code)
  const { text } = sourceFile
  const rebuild = (node) => {
    if (ts.isConditionalExpression(node) && facts.has(keyOf(node.condition))) {
      return `(${rebuild(node.whenTrue)})`
    }
    if (isReference(node) && inline.has(node.text)) {
      const replaced = `(${expand(inline.get(node.text), { facts, inline })})`
      return ts.isShorthandPropertyAssignment(node.parent)
        ? `${node.text}: ${replaced}`
        : replaced
    }
    let written = ""
    let position = node.getStart(sourceFile)
    ts.forEachChild(node, (child) => {
      written +=
        text.slice(position, child.getStart(sourceFile)) + rebuild(child)
      position = child.getEnd()
    })
    return written + text.slice(position, node.getEnd())
  }
  return rebuild(root.expression.expression)
}

export const isPure = (code, impure) => {
  const { root } = parse(code)
  let pure = true
  const visit = (node) => {
    if (ts.isCallExpression(node)) {
      const callee = unwrap(node.expression)
      if (
        ts.isCallExpression(callee) ||
        (ts.isIdentifier(callee) && impure.has(callee.text))
      ) {
        pure = false
      }
    }
    ts.forEachChild(node, visit)
  }
  visit(root)
  return pure
}

export const usesOf = (component) => {
  const uses = []
  const walk = (nodes, facts, loops) => {
    for (const node of nodes) {
      if (node.type === "if") {
        uses.push({ code: node.test, facts, kind: "test", loops })
        walk(node.consequent, under(facts, node.test), loops)
        walk(node.alternate ?? [], facts, loops)
      } else if (node.type === "each") {
        uses.push({ code: node.list, facts, kind: "list", loops })
        const bound = new Set([
          ...loops,
          ...identifierCounts(node.item).keys(),
          ...(node.index ? [node.index] : []),
          ...node.consts.map(({ name }) => name),
        ])
        for (const { code } of node.consts) {
          uses.push({ code, facts, kind: "const", loops: bound })
        }
        walk(node.children, facts, bound)
      } else if (node.type === "expression") {
        uses.push({ code: node.code, facts, kind: "text", loops })
      } else if (node.type === "slot") {
        walk(node.fallback, facts, loops)
      } else if (node.type === "element") {
        if (node.variable) {
          uses.push({ code: node.tag, facts, kind: "tag", loops })
        }
        for (const item of node.attributes) {
          const kind = node.component
            ? "component"
            : item.kind === "class"
              ? "class"
              : item.kind === "spread"
                ? "spread"
                : "attribute"
          if (item.code) uses.push({ code: item.code, facts, kind, loops })
          if (item.condition) {
            uses.push({ code: item.condition, facts, kind: "test", loops })
          }
        }
        walk(node.children, facts, loops)
      }
    }
  }
  walk(component.tree, new Set(), new Set())
  return [
    ...uses,
    ...component.derived.map(({ code }) => ({ code, kind: "derived" })),
    ...[...component.warnings, itemWarning(component)]
      .filter(Boolean)
      .map((code) => ({ code, kind: "statement" })),
    ...(component.provide?.value ?? []).map(({ code }) => ({
      code,
      kind: "provide",
    })),
  ]
}

const SINKS = new Set(["attribute", "test", "text"])

const PASSING = new Set([
  ts.SyntaxKind.AmpersandAmpersandToken,
  ts.SyntaxKind.BarBarToken,
  ts.SyntaxKind.QuestionQuestionToken,
])

const LOOSE = new Set([
  ts.SyntaxKind.EqualsEqualsToken,
  ts.SyntaxKind.ExclamationEqualsToken,
])

const isEmpty = (node) =>
  node.kind === ts.SyntaxKind.NullKeyword ||
  (ts.isIdentifier(node) && node.text === "undefined")

const references = (use, name, check) => {
  const { root } = parse(use.code, use.kind === "statement")
  let every = true
  const visit = (node) => {
    if (isReference(node) && node.text === name && !check(node, use)) {
      every = false
    }
    ts.forEachChild(node, visit)
  }
  visit(root)
  return every
}

const testOnly = (node, use) => {
  let current = node
  for (;;) {
    const parent = current.parent
    if (
      ts.isParenthesizedExpression(parent) ||
      (ts.isBinaryExpression(parent) &&
        parent.operatorToken.kind !== ts.SyntaxKind.QuestionQuestionToken &&
        PASSING.has(parent.operatorToken.kind))
    ) {
      current = parent
      continue
    }
    return (
      (ts.isPrefixUnaryExpression(parent) &&
        parent.operator === ts.SyntaxKind.ExclamationToken) ||
      (ts.isConditionalExpression(parent) && parent.condition === current) ||
      (ts.isIfStatement(parent) && parent.expression === current) ||
      (use.kind === "test" && ts.isExpressionStatement(parent))
    )
  }
}

const nullAgnostic = (node, use) => {
  let current = node
  for (;;) {
    const parent = current.parent
    if (
      ts.isBinaryExpression(parent) &&
      parent.operatorToken.kind === ts.SyntaxKind.QuestionQuestionToken &&
      parent.left === current
    ) {
      return true
    }
    if (
      ts.isParenthesizedExpression(parent) ||
      (ts.isConditionalExpression(parent) && parent.condition !== current) ||
      (ts.isBinaryExpression(parent) && PASSING.has(parent.operatorToken.kind))
    ) {
      current = parent
      continue
    }
    if (
      (ts.isPrefixUnaryExpression(parent) &&
        parent.operator === ts.SyntaxKind.ExclamationToken) ||
      (ts.isConditionalExpression(parent) && parent.condition === current) ||
      (ts.isIfStatement(parent) && parent.expression === current)
    ) {
      return true
    }
    if (
      ts.isBinaryExpression(parent) &&
      LOOSE.has(parent.operatorToken.kind) &&
      isEmpty(unwrap(parent.left === current ? parent.right : parent.left))
    ) {
      return true
    }
    return ts.isExpressionStatement(parent) && SINKS.has(use.kind)
  }
}

export const analyze = (component) => {
  const uses = usesOf(component)
  const count = (name) =>
    uses.reduce(
      (sum, { code }) => sum + (identifierCounts(code).get(name) ?? 0),
      0,
    )
  const sitesOf = (name) =>
    uses.filter(({ code }) => identifierCounts(code).has(name))
  return {
    count,
    nullAgnostic: (name) =>
      uses.every((use) => references(use, name, nullAgnostic)),
    sitesOf,
    testOnly: (name) => uses.every((use) => references(use, name, testOnly)),
    uses,
  }
}

export const inResult = (node) => {
  let current = node
  for (;;) {
    const parent = current.parent
    if (
      ts.isParenthesizedExpression(parent) ||
      (ts.isConditionalExpression(parent) && parent.condition !== current) ||
      (ts.isBinaryExpression(parent) && PASSING.has(parent.operatorToken.kind))
    ) {
      current = parent
      continue
    }
    return ts.isExpressionStatement(parent)
  }
}
