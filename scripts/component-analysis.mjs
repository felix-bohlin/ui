import ts from "typescript"
import { slotProp } from "../src/component-api/frameworks.ts"
import { importedNames } from "./component-emit.mjs"
import { scanCode } from "./component-shared.mjs"

const CUSTOM_TAG_LITERAL = /(["'`])[a-z][\w.]*-[\w.-]*\1/

const STATIC_TAG = /^"([a-z][a-z0-9-]*)"$/

const LOGICAL_OPERATORS = [
  ts.SyntaxKind.AmpersandAmpersandToken,
  ts.SyntaxKind.BarBarToken,
  ts.SyntaxKind.QuestionQuestionToken,
]

const buildsAnew = (node, expressions, seen) => {
  if (!node) return false
  if (
    ts.isParenthesizedExpression(node) ||
    ts.isAsExpression(node) ||
    ts.isSatisfiesExpression(node) ||
    ts.isNonNullExpression(node)
  ) {
    return buildsAnew(node.expression, expressions, seen)
  }
  if (ts.isConditionalExpression(node)) {
    return (
      buildsAnew(node.whenTrue, expressions, seen) ||
      buildsAnew(node.whenFalse, expressions, seen)
    )
  }
  if (
    ts.isBinaryExpression(node) &&
    LOGICAL_OPERATORS.includes(node.operatorToken.kind)
  ) {
    return (
      buildsAnew(node.left, expressions, seen) ||
      buildsAnew(node.right, expressions, seen)
    )
  }
  if (ts.isIdentifier(node)) {
    if (!expressions.has(node.text) || seen.has(node.text)) return false
    seen.add(node.text)
    return buildsAnew(expressions.get(node.text), expressions, seen)
  }
  return (
    ts.isArrowFunction(node) ||
    ts.isFunctionExpression(node) ||
    ts.isObjectLiteralExpression(node) ||
    ts.isArrayLiteralExpression(node) ||
    ts.isClassExpression(node) ||
    ts.isNewExpression(node) ||
    ts.isRegularExpressionLiteral(node)
  )
}

const unique = (names) => [...new Set(names)]

export const customTagsOf = ({ derived, props }, node) => {
  if (node.custom) return [node.tag]
  if (!node.variable) return []
  const source = [
    ...derived.filter(({ name }) => name === node.tag),
    ...props.filter(({ local }) => local === node.tag),
  ]
    .map((entry) => entry.code ?? entry.default ?? "")
    .join(" ")
  return [...source.matchAll(new RegExp(CUSTOM_TAG_LITERAL, "g"))].map(
    ([literal]) => literal.slice(1, -1),
  )
}

const customRootsOf = (component) =>
  new Map(
    component.rootElements.flatMap((node) =>
      customTagsOf(component, node).length === 0
        ? []
        : [[node, node.custom ? undefined : node.tag]],
    ),
  )

const customTagOf = ({ restOnRoot, rootElements }) => {
  const tags = restOnRoot
    ? [
        ...new Set(
          rootElements.filter((node) => node.custom).map((node) => node.tag),
        ),
      ]
    : []
  return tags.length === 1 && tags[0].includes("-") ? tags[0] : undefined
}

export const valuesIn = (nodes) =>
  nodes.flatMap((node) => {
    if (node.type === "expression") return [node]
    if (node.type === "each") {
      return [
        { code: node.list, reads: node.reads, readsSlot: node.readsSlot },
        ...node.consts,
        ...valuesIn(node.children),
      ]
    }
    if (node.type === "if") {
      return [
        { code: node.test, reads: node.reads, readsSlot: node.readsSlot },
        ...valuesIn(node.consequent),
        ...valuesIn(node.alternate ?? []),
      ]
    }
    if (node.type === "slot") return valuesIn(node.fallback)
    if (node.type === "element") {
      return [
        ...node.attributes.filter(
          (item) =>
            item.kind === "expression" ||
            item.kind === "class" ||
            item.kind === "spread",
        ),
        ...valuesIn(node.children),
      ]
    }
    return []
  })

export const scriptValues = (component) => [
  ...component.derived,
  ...component.warnings,
  ...(component.provide?.value ?? []),
]

export const allValues = (component) => [
  ...valuesIn(component.tree),
  ...scriptValues(component),
]

export const analyse = (component) => {
  const { derived, ids, props, provide, reads, rest, slots, trimmedSlots } =
    component
  const scope = {
    bases: ids.bases,
    contexts: new Set(reads.map(({ name }) => name)),
    derived: new Set(derived.map(({ name }) => name)),
    props: new Set(props.map(({ local }) => local)),
    trimmed: new Map(trimmedSlots.map(({ local, slot }) => [local, slot])),
  }
  const scanned = (code, loop) => {
    const { expression, names, slots: checked } = scanCode(code)
    const read = [...names.keys()]
    return {
      expression,
      reads: {
        contexts: read.filter((name) => scope.contexts.has(name)),
        derived: unique(
          read.flatMap((name) =>
            scope.derived.has(name)
              ? [name]
              : scope.bases.has(name)
                ? [scope.bases.get(name)]
                : [],
          ),
        ),
        loop: read.filter((name) => loop.has(name)),
        names,
        props: read.filter((name) => scope.props.has(name)),
        rest: rest !== undefined && names.has(rest),
        slots: unique([
          ...checked,
          ...read.flatMap((name) =>
            scope.trimmed.has(name) ? [scope.trimmed.get(name)] : [],
          ),
        ]),
      },
    }
  }
  const scans = derived.map((value) => scanned(value.code, new Set()))
  const expressions = new Map(
    derived.map(({ name }, index) => [name, scans[index].expression]),
  )
  const slotReaders = new Set()
  const readsSlot = ({ derived: consts, slots: checked }) =>
    checked.length > 0 || consts.some((name) => slotReaders.has(name))
  const analysedDerived = derived.map((value, index) => {
    const { expression, reads: valueReads } = scans[index]
    const facts = {
      ...value,
      newEachRender: buildsAnew(expression, expressions, new Set([value.name])),
      reads: valueReads,
      readsSlot: readsSlot(valueReads),
      staticTag: STATIC_TAG.exec(value.code.trim())?.[1],
    }
    if (facts.readsSlot) slotReaders.add(value.name)
    return facts
  })
  const valueOf = (value, loop) => {
    const { expression, reads: valueReads } = scanned(value.code, loop)
    return {
      ...value,
      newEachRender: buildsAnew(expression, expressions, new Set()),
      reads: valueReads,
      readsSlot: readsSlot(valueReads),
    }
  }
  const readsOf = (code, loop) => {
    const { reads: codeReads } = scanned(code, loop)
    return { reads: codeReads, readsSlot: readsSlot(codeReads) }
  }
  const annotate = (nodes, loop) => {
    for (const node of nodes) {
      if (node.type === "expression") {
        Object.assign(node, readsOf(node.code, loop))
      } else if (node.type === "if") {
        Object.assign(node, readsOf(node.test, loop))
        annotate(node.consequent, loop)
        annotate(node.alternate ?? [], loop)
      } else if (node.type === "slot") {
        annotate(node.fallback, loop)
      } else if (node.type === "element") {
        for (const item of node.attributes.filter(
          (entry) => entry.code !== undefined,
        )) {
          Object.assign(item, readsOf(item.code, loop))
        }
        for (const item of node.attributes.filter(
          (entry) => entry.condition !== undefined,
        )) {
          item.conditionReads = readsOf(item.condition, loop).reads
        }
        annotate(node.children, loop)
      } else if (node.type === "each") {
        Object.assign(node, readsOf(node.list, loop))
        const inner = new Set([...loop, ...node.declares])
        node.consts = node.consts.map((value) => valueOf(value, inner))
        annotate(node.children, inner)
      }
    }
  }
  annotate(component.tree, new Set())
  return {
    ...component,
    customRoots: customRootsOf(component),
    customTag: customTagOf(component),
    declared: new Set([
      ...props.map(({ local }) => local),
      ...derived.map(({ name }) => name),
      ...reads.map(({ name }) => name),
      ...importedNames(component.imports),
      ...component.components.map(({ local }) => local),
    ]),
    derived: analysedDerived,
    provide: provide && {
      ...provide,
      value: provide.value.map((value) => valueOf(value, new Set())),
    },
    stringSlots: props.flatMap(({ local, prop }) => {
      const slot = slots.find((name) => slotProp(name) === prop)
      return slot === undefined ? [] : [{ local, prop, slot }]
    }),
    warnings: component.warnings.map((code) => valueOf({ code }, new Set())),
  }
}
