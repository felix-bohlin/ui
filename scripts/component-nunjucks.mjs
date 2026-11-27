import { readdirSync, readFileSync } from "node:fs"
import { readdir } from "node:fs/promises"
import { join } from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"
import { parseArgs } from "node:util"
import ts from "typescript"
import {
  BOOLEAN_ATTRIBUTES,
  BOOLEAN_WHEN_BOOLEAN,
} from "../packages/opui/nunjucks/attributes.ts"
import { slotProp } from "../src/component-api/frameworks.ts"
import { barrelExports } from "../src/utils/package-source.js"
import {
  at,
  COMPILER,
  dict,
  isNonNull,
  KEYWORDS,
  LEVEL,
  nunjucksKey,
  nunjucksName,
  nunjucksString,
  nunjucksStatement,
  nunjucksValue,
  slotPresent,
  slotRead,
} from "./component-nunjucks-expression.mjs"
import {
  analyze,
  expand,
  isPure,
  itemWarning,
  keyOf,
  mentions,
  under,
} from "./component-nunjucks-facts.mjs"
import { valuesIn } from "./component-analysis.mjs"
import { readComponent } from "./component-reader.mjs"
import {
  identifiersIn,
  itemBinding,
  PRESERVED_TAGS,
  root,
  sourceFileOf,
  unsupported,
  unwrap,
} from "./component-shared.mjs"
import { astroPropsOf, helperReturnsOf } from "./example-react-props.mjs"
import {
  block,
  glue,
  indent,
  layout,
  layoutList,
  LINE,
  trimmedTag,
} from "./component-nunjucks-layout.mjs"
import { VOID_ELEMENTS } from "./html-tokens.mjs"

const componentsDir = join(root, "packages/opui/components")

const UNREGISTERED = new Set([
  "checkedValues",
  "createId",
  "createIds",
  "resetWarnings",
  "selectionOf",
])

export const helperModules = () =>
  readdirSync(componentsDir, { recursive: true })
    .map((file) => file.split("\\").join("/"))
    .filter(
      (file) =>
        /(^|\/)[a-z][\w-]*\.ts$/.test(file) &&
        !/(^|\/)(context|types)\b/.test(file) &&
        !/(^|\/)(react|solid|svelte|vue)\.ts$/.test(file) &&
        !/\.(react|solid|svelte|vue)\.ts$/.test(file),
    )
    .toSorted()

export const RUNTIME_NAMES = ["context", "id", "ids", "merge", "provide"]

export const helperEntries = (modules) => {
  const entries = modules.flatMap(({ file, module }) =>
    Object.entries(module)
      .filter(
        ([name, value]) =>
          typeof value === "function" && !UNREGISTERED.has(name),
      )
      .map(([name, value]) => ({ file, name, value })),
  )
  const names = entries.map(({ name }) => name)
  const repeated = names.find((name, index) => names.indexOf(name) !== index)
  if (repeated) {
    throw new Error(
      `${COMPILER} finds two helpers named ${repeated} in packages/opui/components/`,
    )
  }
  const shadowed = names.find((name) => RUNTIME_NAMES.includes(name))
  if (shadowed) {
    throw new Error(
      `${COMPILER} can't register the helper ${shadowed}: the opui global defines its own ${shadowed}, so rename the helper`,
    )
  }
  return entries.toSorted((a, b) => (a.name < b.name ? -1 : 1))
}

const HELPER_ENTRIES = helperEntries(
  await Promise.all(
    helperModules().map(async (file) => ({
      file,
      module: await import(pathToFileURL(join(componentsDir, file)).href),
    })),
  ),
)

export const HELPERS = Object.fromEntries(
  HELPER_ENTRIES.map(({ name, value }) => [name, value]),
)

let helperReturns

const returnsOf = () =>
  (helperReturns ??= helperReturnsOf(
    HELPER_ENTRIES.map(({ file, name }) => ({ file, name })),
  ))

export const keptNone = (component, types, analysis = analyze(component)) =>
  component.props.filter(
    ({ default: initial, local, prop }) =>
      types.get(prop)?.nullable &&
      (initial !== undefined || !analysis.nullAgnostic(local)),
  )

const RESERVED = new Set([
  "caller",
  "loop",
  "opui",
  "props",
  "undefined",
  ...KEYWORDS,
])

const SERIALIZED_ATTRIBUTES = new Set([...BOOLEAN_WHEN_BOOLEAN, "style"])

const TEMPLATE_START = /\{(?=[{%#])/g

const text = (value) => value.replace(TEMPLATE_START, '{{ "{" }}')

const attributeValue = (value) =>
  text(value.replace(/&/g, "&amp;").replace(/"/g, "&quot;"))

const importedNames = (lines) =>
  lines.flatMap((line) =>
    (/\{([^}]*)\}/.exec(line)?.[1] ?? "")
      .split(",")
      .map((name) =>
        name
          .trim()
          .split(/\s+as\s+/)
          .at(-1),
      )
      .filter(Boolean),
  )

const lowerFirst = (name) => `${name[0].toLowerCase()}${name.slice(1)}`

const camel = (name) =>
  name.replace(/[-:]+(\w)/g, (_, letter) => letter.toUpperCase())

export const toNunjucks = (component, { types = new Map() } = {}) => {
  const { file } = component
  const reserve = (name) => {
    if (RESERVED.has(name) || name.startsWith("__")) {
      throw unsupported(
        "BC705",
        file,
        `the name ${name}`,
        "rename the local",
        COMPILER,
      )
    }
    return name
  }
  const analysis = analyze(component)
  const defaulted = component.props.filter((prop) => prop.default !== undefined)
  const aliased = component.props.filter(
    (prop) =>
      prop.default === undefined &&
      nunjucksName(prop.prop).startsWith("[") &&
      analysis.count(prop.local) > 1 &&
      analysis
        .sitesOf(prop.local)
        .every(
          ({ code, kind }) =>
            kind === "attribute" && code.trim() === prop.local,
        ),
  )
  const idsName = component.idBases[0]?.[0]
  const isIdBase = ({ name }) => !!idsName && name === "base"
  const locals = new Set(
    [
      component.rest,
      ...aliased.map((prop) => prop.local),
      ...defaulted.map((prop) => prop.local),
      ...component.reads.map((read) => read.name),
      ...component.trimmedSlots.map((slot) => slot.local),
      ...component.derived
        .filter((entry) => !isIdBase(entry))
        .map((entry) => entry.name),
      idsName,
    ]
      .filter(Boolean)
      .map(reserve),
  )
  const taken = new Set([...locals, ...RESERVED])
  const renames = new Map()
  for (const tag of component.variableTags ?? []) {
    const lower = lowerFirst(tag)
    if (tag !== lower && locals.has(tag) && !taken.has(lower)) {
      renames.set(tag, { level: LEVEL.primary, text: lower })
      taken.add(lower)
    }
  }
  const localName = (name) => renames.get(name)?.text ?? name
  const fresh = (...names) => {
    const name =
      names.find((item) => !taken.has(item)) ?? `${names[0]}${taken.size}`
    taken.add(name)
    return name
  }
  const named = new Map()
  const nameFor = (item, ...names) => {
    if (!named.has(item)) named.set(item, fresh(...names))
    return named.get(item)
  }
  const used = new Set()
  const returns = returnsOf()
  const helperShape = (node, inner) => {
    const call = unwrap(node)
    if (!ts.isCallExpression(call)) return undefined
    const callee = unwrap(call.expression)
    return ts.isIdentifier(callee) &&
      !inner.locals.has(callee.text) &&
      !inner.props.has(callee.text) &&
      !inner.renames.has(callee.text)
      ? inner.returns.get(callee.text)
      : undefined
  }
  const scope = {
    derived: new Map(
      component.derived
        .filter((entry) => !isIdBase(entry))
        .map(({ code, name }) => [name, code]),
    ),
    facts: new Set(),
    file,
    guarded: new Map(),
    helpers: new Set(Object.keys(HELPERS)),
    idBases: new Set(idsName ? [idsName] : []),
    idPrefixes: new Set(component.idPrefixes),
    imports: new Set(importedNames(component.imports)),
    keepsNone: new Set(
      keptNone(component, types, analysis).map(({ local }) => local),
    ),
    kinds: new Map(
      component.props.map((prop) => [prop.local, types.get(prop.prop)?.kinds]),
    ),
    lists: new Map(
      component.props
        .map((prop) => [prop.local, types.get(prop.prop)?.list])
        .filter(([, list]) => list?.items.size),
    ),
    locals,
    markup: new Set(component.trimmedSlots.map(({ local }) => local)),
    memberLists: new Map(
      component.props
        .map((prop) => [prop.local, types.get(prop.prop)?.lists])
        .filter(([, lists]) => lists?.size),
    ),
    members: new Map(
      component.props
        .map((prop) => [prop.local, types.get(prop.prop)?.members])
        .filter(([, members]) => members?.size),
    ),
    nonNull: new Set(),
    props: new Map(
      component.props
        .filter((prop) => prop.default === undefined && !aliased.includes(prop))
        .map((prop) => [prop.local, prop.prop]),
    ),
    renames,
    returns,
  }
  for (const entry of component.derived) {
    if (isIdBase(entry)) continue
    const shape = helperShape(
      sourceFileOf(`(${entry.code})`, "derived.ts").statements[0].expression,
      scope,
    )
    if (shape?.kinds.size) scope.kinds.set(entry.name, shape.kinds)
    if (shape?.list.items.size) scope.lists.set(entry.name, shape.list)
    if (shape?.lists.size) scope.memberLists.set(entry.name, shape.lists)
    if (shape?.members.size) scope.members.set(entry.name, shape.members)
  }
  for (const { default: initial, local } of defaulted) {
    if (!scope.keepsNone.has(local) && isNonNull(initial, scope)) {
      scope.nonNull.add(local)
    }
  }
  const derivedCode = ({ code, name }) => {
    const sourceFile = sourceFileOf(`(${code})`, "derived.ts")
    const call = unwrap(sourceFile.statements[0].expression)
    return ts.isCallExpression(call) &&
      ts.isIdentifier(call.expression) &&
      call.expression.text === "Boolean" &&
      call.arguments.length === 1 &&
      analysis.testOnly(name)
      ? call.arguments[0].getText(sourceFile)
      : code
  }
  const idsLine = ({ code }) => {
    const sourceFile = sourceFileOf(`(${code})`, "base.ts")
    const expression = unwrap(sourceFile.statements[0].expression)
    const [given, template] =
      ts.isBinaryExpression(expression) &&
      expression.operatorToken.kind === ts.SyntaxKind.BarBarToken
        ? [expression.left.getText(sourceFile), unwrap(expression.right)]
        : [undefined, expression]
    const prefix = nunjucksString(template.head.text.replace(/-$/, ""))
    return `{% set ${idsName} = opui.ids(${prefix}${given ? `, ${value(given).text}` : ""}) %}`
  }
  const inline = new Map()
  const expanded = (code, inner = scope) =>
    expand(code, { facts: inner.facts, inline })
  const value = (code, inner = scope) =>
    nunjucksValue(expanded(code, inner), inner)
  const expression = (code, inner = scope) => value(code, inner).text
  const nonNull = (code, inner = scope) =>
    isNonNull(expanded(code, inner), inner)
  const sink = (inner) => ({ ...inner, undefinedAs: "none" })
  const impure = new Set([
    ...component.idPrefixes,
    ...(idsName ? [idsName] : []),
    "createIds",
  ])
  const isClean = (code) => {
    const node = unwrap(
      sourceFileOf(`(${code})`, "clean.ts").statements[0].expression,
    )
    const chain = (item) =>
      ts.isIdentifier(item) ||
      (ts.isPropertyAccessExpression(item) && chain(item.expression))
    return (
      ts.isStringLiteral(node) ||
      ts.isNoSubstitutionTemplateLiteral(node) ||
      ts.isTemplateExpression(node) ||
      ts.isNumericLiteral(node) ||
      chain(node)
    )
  }
  const derivedLines = new Map()
  for (const entry of component.derived) {
    if (isIdBase(entry)) continue
    const code = derivedCode(entry)
    const agnostic = analysis.nullAgnostic(entry.name)
    const sites = analysis.sitesOf(entry.name)
    const [site] = sites
    if (
      analysis.count(entry.name) === 1 &&
      sites.length === 1 &&
      ["attribute", "test", "text"].includes(site.kind) &&
      !component.variableTags?.includes(entry.name) &&
      isPure(code, impure) &&
      ![entry.name, ...entry.reads.names.keys()].some((name) =>
        site.loops.has(name),
      ) &&
      (site.kind === "test" || isClean(expand(code, { facts: site.facts })))
    ) {
      inline.set(entry.name, code)
      continue
    }
    derivedLines.set(
      entry.name,
      `{% set ${localName(entry.name)} = ${expression(code, agnostic ? sink(scope) : scope)} %}`,
    )
    if (isNonNull(code, scope)) scope.nonNull.add(entry.name)
    const node = unwrap(
      sourceFileOf(`(${code})`, "guard.ts").statements[0].expression,
    )
    if (
      ts.isConditionalExpression(node) &&
      isNonNull(node.whenTrue.getText(), scope) &&
      (node.whenFalse.kind === ts.SyntaxKind.NullKeyword ||
        (ts.isIdentifier(node.whenFalse) &&
          node.whenFalse.text === "undefined"))
    ) {
      scope.guarded.set(entry.name, keyOf(node.condition))
    }
  }
  const contextKey = (context) => {
    const folder = context.folder ?? component.folder
    return folder === context.name ? context.name : `${folder}/${context.name}`
  }
  const provideEntries = component.provide?.value.map(({ code, key }) => [
    key,
    value(code),
  ])
  const provideInline = provideEntries?.every(
    ([, shown]) => shown.level === LEVEL.primary && !shown.text.includes("("),
  )
  const provided = component.provide
    ? provideInline
      ? dict(provideEntries.map(([key, shown]) => [key, shown.text]))
      : fresh(lowerFirst(component.provide.context.name), "provided")
    : undefined
  const hoisted = []
  const preambleOf = () => [
    `{% set props = props | opuiProps(${nunjucksString(component.name)}) %}`,
    ...(component.rest
      ? [
          `{% set ${component.rest} = props | opuiRest(${nunjucksString(component.name)}) %}`,
        ]
      : []),
    ...aliased.map(
      ({ local, prop }) =>
        `{% set ${localName(local)} = props${nunjucksName(prop)} %}`,
    ),
    ...defaulted.map(
      ({ default: initial, local, prop }) =>
        `{% set ${localName(local)} = props${nunjucksName(prop)} | default(${value(initial).text}) %}`,
    ),
    ...component.reads.map(
      ({ context, name }) =>
        `{% set ${name} = opui.context(${nunjucksString(contextKey(context))}) %}`,
    ),
    ...component.trimmedSlots.map(({ local, slot }) => {
      const read = slot === "default" ? "(caller() if caller)" : slotRead(slot)
      return `{% set ${local} = ${read} | opuiTrim %}`
    }),
    ...component.derived.flatMap((entry) =>
      isIdBase(entry)
        ? [idsLine(entry)]
        : derivedLines.has(entry.name)
          ? [derivedLines.get(entry.name)]
          : [],
    ),
    ...[...component.warnings.map(({ code }) => code), itemWarning(component)]
      .filter(Boolean)
      .map((code) => nunjucksStatement(code, scope)),
    ...(component.provide && !provideInline
      ? [
          `{% set ${provided} = ${dict(
            provideEntries.map(([key, shown]) => [key, shown.text]),
          )} %}`,
        ]
      : []),
  ]
  const isSimple = (translated) =>
    translated.level === LEVEL.primary && !translated.text.includes("(")
  const isLiteral = (code) =>
    /^(?:"[^"\\]*"|'[^'\\]*'|\d+(?:\.\d+)?)$/.test(code.trim())
  const quoted = (inner) => ({ ...inner, quote: "'" })
  const attributeOutput = (code, shown, inner) =>
    [...identifiersIn(code)].some((name) => inner.markup?.has(name))
      ? `{{ ${at(shown, LEVEL.filter)} | forceescape }}`
      : `{{ ${shown.text} }}`
  const templateOutput = (node, inner, sourceFile, covered) => {
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
      return attributeValue(node.text)
    }
    if (!ts.isTemplateExpression(node)) return undefined
    const codes = node.templateSpans.map((span) =>
      span.expression.getText(sourceFile),
    )
    const spans = codes.map((code) => value(code, inner))
    if (
      spans.every(
        (span, index) =>
          covered.includes(span.text) || nonNull(codes[index], inner),
      )
    ) {
      return `${attributeValue(node.head.text)}${node.templateSpans
        .map(
          (span, index) =>
            `${attributeOutput(codes[index], spans[index], inner)}${attributeValue(span.literal.text)}`,
        )
        .join("")}`
    }
    const code = node.getText(sourceFile)
    return attributeOutput(code, value(code, inner), inner)
  }
  const classTokens = (code, outer, multiline) => {
    const inner = quoted(outer)
    const sourceFile = sourceFileOf(`(${code})`, "class.ts")
    const list = sourceFile.statements[0]?.expression
    const array =
      list && ts.isParenthesizedExpression(list) ? list.expression : list
    if (!array || !ts.isArrayLiteralExpression(array)) return undefined
    const entries = []
    for (const element of array.elements) {
      if (ts.isStringLiteral(element)) {
        if (element.text) entries.push({ text: element.text })
        continue
      }
      if (ts.isObjectLiteralExpression(element)) {
        for (const property of element.properties) {
          if (
            !ts.isPropertyAssignment(property) ||
            !(
              ts.isStringLiteral(property.name) ||
              ts.isIdentifier(property.name)
            )
          ) {
            return undefined
          }
          entries.push({
            test: value(property.initializer.getText(sourceFile), inner),
            text: property.name.text,
          })
        }
        continue
      }
      if (
        ts.isBinaryExpression(element) &&
        element.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken
      ) {
        const shown = element.right
        const conjuncts = []
        const collect = (node) => {
          if (
            ts.isBinaryExpression(node) &&
            node.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken
          ) {
            collect(node.left)
            collect(node.right)
          } else {
            conjuncts.push(expression(node.getText(sourceFile), inner))
          }
        }
        collect(element.left)
        const output = templateOutput(shown, inner, sourceFile, conjuncts)
        if (output !== undefined) {
          entries.push({
            output,
            test: value(element.left.getText(sourceFile), inner),
          })
          continue
        }
      }
      if (ts.isTemplateExpression(element)) {
        const output = templateOutput(element, inner, sourceFile, [])
        if (
          output !== undefined &&
          (element.head.text ||
            element.templateSpans.some((span) => span.literal.text))
        ) {
          entries.push({ output })
          continue
        }
      }
      if (ts.isConditionalExpression(element)) {
        const [whenTrue, whenFalse] = [element.whenTrue, element.whenFalse]
        if (
          ts.isStringLiteral(whenTrue) &&
          ts.isStringLiteral(whenFalse) &&
          whenTrue.text &&
          whenFalse.text
        ) {
          entries.push({
            output: `{{ ${expression(element.getText(sourceFile), inner)} }}`,
          })
          continue
        }
      }
      const shown = value(element.getText(sourceFile), inner)
      if (!isSimple(shown)) return undefined
      entries.push({
        output: attributeOutput(element.getText(sourceFile), shown, inner),
        test: shown,
      })
    }
    if (!entries.length || entries[0].test) {
      if (entries.length !== 1) return undefined
      const [{ output, test, text: name }] = entries
      return [
        `{% if ${test.text} %} class="${output ?? attributeValue(name)}"{% endif %}`,
      ]
    }
    const parts = entries.map(({ output, test, text: name }, index) => {
      const shown = output ?? attributeValue(name)
      if (!test) return `${index ? " " : ""}${shown}`
      return `{%- if ${test.text} %} ${shown}{% endif %}`
    })
    const [first, ...rest] = parts
    return [
      ` class="${first}${rest
        .map((part) =>
          part.startsWith("{%-")
            ? multiline
              ? `\n${multiline}${part}`
              : part.replace("{%-", "{%")
            : part,
        )
        .join("")}"`,
    ]
  }
  const attributeTokens = (node, outer, sets, multiline) => {
    const inner = sink(quoted(outer))
    const tokens = []
    for (const item of node.attributes) {
      const code = item.code && expanded(item.code, inner)
      if (item.kind === "static") {
        tokens.push(` ${item.name}="${attributeValue(item.value)}"`)
        continue
      }
      if (item.kind === "boolean") {
        tokens.push(` ${item.name}`)
        continue
      }
      if (item.kind === "class") {
        const built = classTokens(code, inner, multiline)
        if (built) {
          tokens.push(...built)
          continue
        }
        const name = nameFor(item, "classes", "classNames")
        sets.push(
          `{% set ${name} = ${at(value(code, inner), LEVEL.filter)} | opuiClass %}`,
        )
        tokens.push(`{% if ${name} %} class="{{ ${name} }}"{% endif %}`)
        continue
      }
      if (item.kind === "spread") {
        const spread = at(value(code, inner), LEVEL.filter)
        const written = `{{ ${spread} | opuiAttributes }}`
        if (item.condition === undefined) {
          tokens.push(written)
          continue
        }
        const condition = value(item.condition, inner)
        tokens.push(
          `{% if ${item.negated ? `not ${at(condition, LEVEL.not)}` : condition.text} %}${written}{% endif %}`,
        )
        continue
      }
      if (isLiteral(code)) {
        const literal = code.trim().replace(/^["']|["']$/g, "")
        tokens.push(` ${item.name}="${attributeValue(literal)}"`)
        continue
      }
      let shown = value(code, inner)
      if (SERIALIZED_ATTRIBUTES.has(item.name)) {
        tokens.push(`{{ ${dict([[item.name, shown.text]])} | opuiAttributes }}`)
        continue
      }
      const certain =
        !BOOLEAN_ATTRIBUTES.has(item.name) && isNonNull(code, inner)
      const source = sourceFileOf(`(${code})`, "attribute.ts")
      const written = unwrap(source.statements[0].expression)
      if (certain && ts.isTemplateExpression(written)) {
        tokens.push(
          ` ${item.name}="${templateOutput(written, inner, source, [])}"`,
        )
        continue
      }
      if (!isSimple(shown)) {
        const name = nameFor(item, camel(item.name), `${camel(item.name)}Value`)
        sets.push(`{% set ${name} = ${shown.text} %}`)
        shown = { level: LEVEL.primary, text: name }
      }
      const output = attributeOutput(code, shown, inner)
      tokens.push(
        BOOLEAN_ATTRIBUTES.has(item.name)
          ? `{% if ${shown.text} %} ${item.name}{% endif %}`
          : certain
            ? ` ${item.name}="${output}"`
            : `{% if ${shown.text} != none %} ${item.name}="${output}"{% endif %}`,
      )
    }
    return tokens
  }
  const classList = (code, inner, depth) => {
    const sourceFile = sourceFileOf(`(${code})`, "class.ts")
    const list = sourceFile.statements[0]?.expression
    const array =
      list && ts.isParenthesizedExpression(list) ? list.expression : list
    if (
      !array ||
      !ts.isArrayLiteralExpression(array) ||
      array.elements.some((element) => ts.isSpreadElement(element))
    ) {
      return `${at(value(code, inner), LEVEL.filter)} | opuiClass`
    }
    return `${layoutList(
      "[",
      array.elements.map((element) =>
        expression(element.getText(sourceFile), inner),
      ),
      "]",
      depth,
    )} | opuiClass`
  }
  const mergedProps = (node, outer, depth, hoistClass = false) => {
    const inner = node.component ? outer : sink(outer)
    const parts = []
    let entries = []
    const flush = () => {
      if (entries.length) parts.push(entries)
      entries = []
    }
    for (const item of node.attributes) {
      if (item.kind === "static") {
        entries.push([item.name, nunjucksString(item.value)])
      } else if (item.kind === "boolean") {
        entries.push([item.name, "true"])
      } else if (item.kind === "class" && hoistClass) {
        const name = nameFor(item, "classes", "classNames")
        hoisted.push(`{% set ${name} = ${classList(item.code, inner, 1)} %}`)
        entries.push(["class", name])
      } else if (item.kind === "class") {
        entries.push(["class", (at) => classList(item.code, inner, at)])
      } else if (item.kind === "expression") {
        entries.push([item.name, expression(item.code, inner)])
      } else {
        flush()
        const spread = value(item.code, inner)
        const test =
          item.condition === undefined
            ? undefined
            : at(value(item.condition, inner), LEVEL.or)
        const chosen =
          test === undefined
            ? spread
            : {
                level: LEVEL.if,
                text: item.negated
                  ? `{} if ${test} else ${at(spread, LEVEL.or)}`
                  : `${at(spread, LEVEL.or)} if ${test} else {}`,
              }
        parts.push(
          item.defined
            ? { level: LEVEL.primary, text: `opui.defined(${chosen.text})` }
            : chosen,
        )
      }
    }
    flush()
    const written = (part, at) =>
      !Array.isArray(part)
        ? part.text
        : layoutList(
            "{",
            part.map(
              ([key, shown]) =>
                `${nunjucksKey(key)}: ${typeof shown === "function" ? shown(at + 1) : shown}`,
            ),
            "}",
            at,
            " ",
          )
    if (parts.length === 0) return { level: LEVEL.primary, text: "{}" }
    const [part] = parts
    if (parts.length === 1 && (Array.isArray(part) || part.level > LEVEL.if)) {
      return Array.isArray(part)
        ? { level: LEVEL.primary, text: written(part, depth) }
        : part
    }
    return {
      level: LEVEL.primary,
      text: layoutList(
        "opui.merge(",
        parts.map((item) => written(item, depth + 1)),
        ")",
        depth,
      ),
    }
  }
  const slotNode = (node, ctx) => {
    if (component.provide?.slot === node.name) {
      if (node.name !== "default") {
        throw unsupported(
          "BC703",
          file,
          `a context provided around the slot ${node.name}`,
          "provide the context around the default slot",
          COMPILER,
        )
      }
      if (node.fallback.length) {
        throw unsupported(
          "BC703",
          file,
          "a context provided around a default slot with fallback content",
          "move the fallback out of the provided slot",
          COMPILER,
        )
      }
      return `{{ opui.provide(${nunjucksString(contextKey(component.provide.context))}, ${provided}, caller) }}`
    }
    const trimmed = component.trimmedSlots.find(
      (item) => item.slot === node.name,
    )
    if (node.trimmed && trimmed) return `{{ ${trimmed.local} }}`
    if (node.name === "default") {
      return node.fallback.length
        ? `{% if caller is defined %}{{ caller() }}{% else %}${emit(node.fallback, { ...ctx, hoist: false })}{% endif %}`
        : "{{ caller() if caller }}"
    }
    const read = slotRead(node.name)
    return node.fallback.length
      ? `{% if ${slotPresent(node.name).text} %}{{ ${read} | safe }}{% else %}${emit(node.fallback, { ...ctx, hoist: false })}{% endif %}`
      : `{{ ${read} | safe }}`
  }
  const loopPlans = new Map()
  const loopPlan = (node, ctx, item, setNames) => {
    if (!loopPlans.has(node)) {
      const visible = new Set([
        ...ctx.scope.locals,
        ...named.values(),
        ...[...ctx.scope.renames.values()].map(({ text }) => text),
      ])
      const renamed = new Map()
      for (const name of setNames) {
        const lower = lowerFirst(name)
        const wanted =
          name !== lower &&
          component.variableTags?.includes(name) &&
          !taken.has(lower)
            ? lower
            : name
        const chosen = visible.has(wanted)
          ? fresh(`${item}${name[0].toUpperCase()}${name.slice(1)}`)
          : wanted
        taken.add(chosen)
        if (chosen !== name) renamed.set(name, chosen)
      }
      loopPlans.set(node, { renamed })
    }
    return loopPlans.get(node)
  }
  const loopNode = (node, ctx) => {
    const binding = itemBinding(node.item)
    if (!binding) {
      throw unsupported(
        "BC701",
        file,
        `the loop item ${node.item}`,
        "name the item and read its fields in the loop",
        COMPILER,
      )
    }
    const loopValues = [...valuesIn(node.children), ...node.consts]
    const references = (name) =>
      loopValues.reduce(
        (sum, { reads }) => sum + (reads.names.get(name) ?? 0),
        0,
      )
    const restOnce = !!binding.rest && references(binding.rest) === 1
    const names = [
      binding.name,
      ...(binding.rest && !restOnce ? [binding.rest] : []),
      node.index,
      ...node.consts.map(({ name }) => name),
    ]
      .filter(Boolean)
      .map(reserve)
    names.forEach((name) => taken.add(name))
    if (!binding.name) {
      binding.fields.forEach(({ local }) => taken.add(local))
      if (binding.rest) taken.add(binding.rest)
    }
    const item = binding.name ?? nameFor(node, "item", "entry", "row")
    const omitted = `${item} | opuiOmit([${(binding.fields ?? [])
      .map(({ key }) => nunjucksString(key))
      .join(", ")}])`
    const indexUsed = !!node.index && references(node.index) > 0
    const { renamed } = loopPlan(node, ctx, item, [
      ...(binding.rest && !restOnce ? [binding.rest] : []),
      ...(indexUsed ? [node.index] : []),
      ...node.consts.map(({ name }) => name),
    ])
    const loopRenames = new Map(ctx.scope.renames)
    for (const [name, text] of renamed) {
      loopRenames.set(name, { level: LEVEL.primary, text })
    }
    if (!binding.name) {
      for (const { key, local } of binding.fields) {
        loopRenames.set(local, {
          level: LEVEL.primary,
          text: `${item}${nunjucksName(key)}`,
        })
      }
      if (restOnce) {
        loopRenames.set(binding.rest, { level: LEVEL.filter, text: omitted })
      }
    }
    const rebound = new Set([
      ...names,
      ...(binding.fields ?? []).map(({ local }) => local),
      ...(binding.rest ? [binding.rest] : []),
    ])
    const outside = (name) => !rebound.has(name)
    const listed = unwrap(
      sourceFileOf(`(${node.list})`, "list.ts").statements[0].expression,
    )
    const list = ts.isIdentifier(listed)
      ? ctx.scope.lists.get(listed.text)
      : ts.isPropertyAccessExpression(listed) &&
          ts.isIdentifier(unwrap(listed.expression))
        ? ctx.scope.memberLists
            .get(unwrap(listed.expression).text)
            ?.get(listed.name.text)
        : helperShape(listed, ctx.scope)?.list
    const fieldKinds = list?.fields.size ? list.fields : undefined
    const inner = {
      ...ctx.scope,
      derived: new Map(
        [...ctx.scope.derived].filter(([name]) => outside(name)),
      ),
      facts: new Set(
        [...ctx.scope.facts].filter((key) => !mentions(key, rebound)),
      ),
      guarded: new Map(
        [...ctx.scope.guarded].filter(
          ([name, key]) => outside(name) && !mentions(key, rebound),
        ),
      ),
      kinds: new Map([
        ...[...ctx.scope.kinds].filter(([name]) => outside(name)),
        ...(binding.fields ?? []).flatMap(({ key, local }) =>
          fieldKinds?.has(key) ? [[local, fieldKinds.get(key)]] : [],
        ),
        ...(binding.name && list?.items.size
          ? [[binding.name, list.items]]
          : []),
        ...(node.index ? [[node.index, new Set(["number"])]] : []),
      ]),
      lists: new Map([...ctx.scope.lists].filter(([name]) => outside(name))),
      locals: new Set([...ctx.scope.locals, item, ...names]),
      markup: new Set([...ctx.scope.markup].filter(outside)),
      memberLists: new Map(
        [...ctx.scope.memberLists].filter(([name]) => outside(name)),
      ),
      members: new Map([
        ...[...ctx.scope.members].filter(([name]) => outside(name)),
        ...(binding.name && fieldKinds ? [[binding.name, fieldKinds]] : []),
        ...(binding.rest && fieldKinds
          ? [
              [
                binding.rest,
                new Map(
                  [...fieldKinds].filter(
                    ([key]) =>
                      !(binding.fields ?? []).some(
                        (field) => field.key === key,
                      ),
                  ),
                ),
              ],
            ]
          : []),
      ]),
      nonNull: new Set([
        ...[...ctx.scope.nonNull].filter(outside),
        ...(binding.name && list?.defined ? [binding.name] : []),
        ...(node.index ? [node.index] : []),
      ]),
      renames: loopRenames,
    }
    const setName = (name) => renamed.get(name) ?? name
    const sets = [
      ...(binding.rest && !restOnce
        ? [`{% set ${setName(binding.rest)} = ${omitted} %}`]
        : []),
      ...(indexUsed ? [`{% set ${setName(node.index)} = loop.index0 %}`] : []),
      ...node.consts.map(
        ({ code, name }) =>
          `{% set ${setName(name)} = ${expression(code, inner)} %}`,
      ),
    ]
    return block(
      `{% for ${item} in ${expression(node.list, ctx.scope)} %}`,
      emit(
        node.children,
        { ...ctx, depth: ctx.depth + 1, hoist: false, scope: inner },
        true,
      ),
      "{% endfor %}",
      ctx.depth,
      sets,
    )
  }
  const componentNode = (node, ctx) => {
    const slotted = (nodes) =>
      nodes.some((item) =>
        item.type === "element"
          ? item.attributes.some((attribute) => attribute.name === "slot")
          : item.type === "if"
            ? slotted(item.consequent) || slotted(item.alternate ?? [])
            : item.type === "each"
              ? slotted(item.children)
              : item.type === "slot" && slotted(item.fallback),
      )
    if (slotted(node.children)) {
      throw unsupported(
        "BC704",
        file,
        `a named slot passed to ${node.tag}`,
        "pass the content in the inner component's default slot, or teach the compiler to capture it into props.slots",
        COMPILER,
      )
    }
    used.add(node.tag)
    const { text: props } = mergedProps(node, ctx.scope, ctx.depth)
    if (node.children.length === 0) return `{{ ${node.tag}(${props}) }}`
    return block(
      `{% call ${node.tag}(${props}) %}`,
      emit(node.children, { ...child(ctx), hoist: false }, true),
      "{% endcall %}",
      ctx.depth,
    )
  }
  const child = (ctx) => ({ ...ctx, depth: ctx.depth + 1 })
  const elementNode = (node, ctx) => {
    if (node.component) return componentNode(node, ctx)
    const inner = child(ctx)
    const variable = node.variable || node.custom
    const tag = node.variable
      ? `{{ ${at(value(node.tag, ctx.scope), LEVEL.filter)} | opuiTag }}`
      : node.tag
    const sets = []
    const layout = (multiline) => {
      if (variable) {
        const props = mergedProps(node, ctx.scope, ctx.depth, ctx.hoist)
        const tagName = node.variable
          ? expression(node.tag, ctx.scope)
          : nunjucksString(node.tag)
        return props.text === "{}"
          ? []
          : [`{{ ${at(props, LEVEL.filter)} | opuiAttributes(${tagName}) }}`]
      }
      return attributeTokens(node, ctx.scope, sets, multiline)
    }
    let tokens = layout(undefined)
    const single = `<${tag}${tokens.join("")}>`
    if (single.length + indent(ctx.depth).length > LINE && tokens.length > 1) {
      sets.length = 0
      tokens = layout(indent(inner.depth + 1))
      tokens = tokens.map((token) => {
        const line = `\n${indent(inner.depth)}`
        if (token.startsWith("{%"))
          return `${line}${trimmedTag(token, { after: false })}`
        if (token.startsWith("{{"))
          return `${line}${trimmedTag(token, { after: false })}`
        return `${line}${token.slice(1)}`
      })
    }
    const before = sets.length
      ? ctx.hoist
        ? (hoisted.push(...sets), "")
        : sets.join("")
      : ""
    const open = `${before}<${tag}${tokens.join("")}`
    if (node.children.length === 0 && !variable) {
      if (VOID_ELEMENTS.has(node.tag)) return `${open}>`
      if (node.foreign) return `${open}/>`
    }
    const preserved = ctx.preserved || PRESERVED_TAGS.has(node.tag)
    const children = node.external
      ? ""
      : edgesTrimmed(
          emit(node.children, { ...inner, preserved }, true),
          preserved ? [] : node.children,
        )
    return `${glue(`${open}>`, children, inner.depth)}</${tag}>`
  }
  const isLine = (node) =>
    node?.type === "text" && node.value === "\n" && !node.inline
  const edgesTrimmed = (children, nodes) => {
    let text = children
    if (isLine(nodes[0])) {
      text = text.replace(/^(\n *\{[{%])(?!-)/, "$1-")
    }
    if (isLine(nodes.at(-1))) {
      text = text.replace(/(?<!-)([}%]\}\n *)$/, "-$1")
    }
    return text
  }
  const BOOLEAN_KINDS = new Set(["any", "boolean", "other"])
  const mayPrintOddly = (code, inner) => {
    const visit = (node) => {
      const item = unwrap(node)
      if (ts.isIdentifier(item)) {
        const name = item.text
        const kinds = inner.kinds?.get(name)
        if (kinds) return [...kinds].some((kind) => BOOLEAN_KINDS.has(kind))
        if (inner.derived?.has(name)) {
          return visit(
            sourceFileOf(`(${inner.derived.get(name)})`, "derived.ts")
              .statements[0].expression,
          )
        }
        return !(name === "undefined" || inner.markup?.has(name))
      }
      if (
        ts.isPropertyAccessExpression(item) &&
        ts.isIdentifier(item.expression) &&
        inner.members?.has(item.expression.text)
      ) {
        const kinds = inner.members
          .get(item.expression.text)
          .get(item.name.text)
        return !kinds || [...kinds].some((kind) => BOOLEAN_KINDS.has(kind))
      }
      if (
        ts.isArrayLiteralExpression(item) ||
        item.kind === ts.SyntaxKind.TrueKeyword ||
        item.kind === ts.SyntaxKind.FalseKeyword ||
        (ts.isPrefixUnaryExpression(item) &&
          item.operator === ts.SyntaxKind.ExclamationToken)
      ) {
        return true
      }
      if (ts.isBinaryExpression(item)) {
        const operator = item.operatorToken.kind
        if (
          operator === ts.SyntaxKind.AmpersandAmpersandToken ||
          operator === ts.SyntaxKind.BarBarToken ||
          operator === ts.SyntaxKind.QuestionQuestionToken
        ) {
          return visit(item.left) || visit(item.right)
        }
        return ![
          ts.SyntaxKind.AsteriskToken,
          ts.SyntaxKind.MinusToken,
          ts.SyntaxKind.PercentToken,
          ts.SyntaxKind.PlusToken,
          ts.SyntaxKind.SlashToken,
        ].includes(operator)
      }
      if (ts.isConditionalExpression(item)) {
        return visit(item.whenTrue) || visit(item.whenFalse)
      }
      if (ts.isCallExpression(item)) {
        const callee = unwrap(item.expression)
        const shape = helperShape(item, inner)
        if (shape) {
          return [...shape.kinds].some((kind) => BOOLEAN_KINDS.has(kind))
        }
        return !(
          (ts.isIdentifier(callee) && callee.text === "String") ||
          isNonNull(item.getText(), inner)
        )
      }
      return (
        ts.isPropertyAccessExpression(item) ||
        ts.isElementAccessExpression(item)
      )
    }
    return visit(sourceFileOf(`(${code})`, "text.ts").statements[0].expression)
  }
  const textOf = (code, outer) => {
    const inner = sink(outer)
    const shown = value(code, inner)
    return mayPrintOddly(expanded(code, inner), inner)
      ? `{{ ${at(shown, LEVEL.filter)} | opuiText }}`
      : `{{ ${shown.text} }}`
  }
  const textNode = (node, ctx, last) => {
    if (ctx.preserved) return text(node.value)
    const value = text(node.value).replace(/\n/g, `\n${indent(ctx.depth)}`)
    return last && /\n[ ]*$/.test(value)
      ? value.replace(/\n[ ]*$/, `\n${indent(Math.max(ctx.depth - 1, 0))}`)
      : value
  }
  const emit = (nodes, ctx, closing = false) =>
    joined(nodes, ctx, (node, index) => {
      if (node.type === "text") {
        return textNode(node, ctx, closing && index === nodes.length - 1)
      }
      if (node.type === "expression") return textOf(node.code, ctx.scope)
      if (node.type === "slot") return slotNode(node, ctx)
      if (node.type === "if") {
        const inner = {
          ...ctx,
          hoist: false,
          scope: {
            ...ctx.scope,
            facts: under(
              under(ctx.scope.facts, node.test),
              expanded(node.test, ctx.scope),
            ),
          },
        }
        const test = expression(node.test, sink(ctx.scope))
        if (node.alternate) {
          return `{% if ${test} %}${emit(node.consequent, inner)}{% else %}${emit(node.alternate, { ...ctx, hoist: false })}{% endif %}`
        }
        const consequent = emit(node.consequent, inner)
        return consequent.length > LINE
          ? block(
              `{% if ${test} %}`,
              emit(node.consequent, { ...inner, depth: ctx.depth + 1 }, true),
              "{% endif %}",
              ctx.depth,
              [],
              true,
            )
          : `{% if ${test} %}${consequent}{% endif %}`
      }
      if (node.type === "each") return loopNode(node, ctx)
      return elementNode(node, ctx)
    })
  const joined = (nodes, ctx, write) =>
    nodes
      .map((node, index) => write(node, index))
      .reduce(
        (written, text, index) =>
          ctx.preserved
            ? written + text
            : glue(written, text, ctx.depth, {
                closes: index > 0 && nodes[index - 1].type !== "text",
              }),
        "",
      )
  const body = emit(component.tree, {
    depth: 1,
    hoist: true,
    preserved: false,
    scope,
  })
  const imports = component.components
    .filter((inner) => used.has(inner.local))
    .map(
      (inner) =>
        `{% from "opui/${inner.name}.njk" import ${inner.name}${inner.local === inner.name ? "" : ` as ${inner.local}`} %}\n`,
    )
    .toSorted()
    .join("")
  const lines = [...preambleOf(), ...hoisted]
  const head = `{% macro ${component.name}(props = {}) %}`
  const startsBlank = /^\s/.test(body)
  const endsBlank = /\s$/.test(body)
  const opening = lines.length
    ? `${head}\n${lines
        .map(
          (line, index) =>
            `${indent(1)}${trimmedTag(line, { after: !(startsBlank && index === lines.length - 1) })}`,
        )
        .join("\n")}`
    : startsBlank
      ? head
      : trimmedTag(head, { before: false })
  const separator = startsBlank ? "" : `\n${indent(1)}`
  const closing = endsBlank ? "{% endmacro %}" : "\n{%- endmacro %}"
  return layout(
    `${imports}${imports ? "\n" : ""}${opening}${separator}${body}${closing}\n`,
  )
}

export const compileNunjucksComponent = async (source, file) => {
  const parts = file.split("/")
  const name = parts.at(-1).replace(/\.astro$/, "")
  const folder = parts.at(-2)
  const component = await readComponent(source, file)
  const types = astroPropsOf(folder, component.propsType)
  if (!types) {
    throw unsupported(
      "BC706",
      file,
      `the props type ${component.propsType}`,
      `export ${component.propsType} from ${folder}/types.astro.ts`,
      COMPILER,
    )
  }
  return {
    file,
    meta: {
      attributes: [...types.keys()].toSorted(),
      depths: Object.fromEntries(
        component.props
          .map(({ prop }) => [prop, types.get(prop)?.depth ?? 0])
          .filter(([, depth]) => depth > 0)
          .toSorted(([a], [b]) => (a < b ? -1 : 1)),
      ),
      keepsNone: keptNone(component, types)
        .map(({ prop }) => prop)
        .toSorted(),
      omit: component.props.map((prop) => prop.prop).toSorted(),
      slots: component.slots
        .filter((slot) => slot !== "default")
        .map(slotProp)
        .toSorted(),
    },
    name,
    template: toNunjucks({ ...component, file, folder, name }, { types }),
  }
}

export const compileNunjucks = async (source, file) =>
  (await compileNunjucksComponent(source, file)).template

const barrelAliases = () =>
  Object.fromEntries(
    barrelExports(
      readFileSync(join(root, "packages/opui/astro/index.ts"), "utf8"),
    )
      .map(({ from, name }) => [
        name,
        from
          .split("/")
          .at(-1)
          .replace(/\.astro$/, ""),
      ])
      .filter(([name, source]) => name !== source),
  )

export const nunjucksIndex = (names, aliases = barrelAliases()) =>
  [
    ...names.map((name) => [name, name]),
    ...Object.entries(aliases).filter(([, source]) => names.includes(source)),
  ]
    .toSorted(([a], [b]) => (a < b ? -1 : 1))
    .map(
      ([name, source]) =>
        `{% from "opui/${source}.njk" import ${source} %}\n{% set ${name} = ${source} %}\n`,
    )
    .join("")

export const nunjucksBuild = async (files) => {
  const results = await Promise.all(
    files.map((file) =>
      compileNunjucksComponent(readFileSync(join(root, file), "utf8"), file),
    ),
  )
  return {
    components: Object.fromEntries(
      results.map(({ file, meta, name }) => [
        name,
        { ...meta, folder: file.split("/").at(-2) },
      ]),
    ),
    templates: {
      ...Object.fromEntries(
        results.map(({ name, template }) => [`opui/${name}.njk`, template]),
      ),
      "opui/index.njk": nunjucksIndex(results.map(({ name }) => name)),
    },
  }
}

const usedHelpers = (templates) => {
  const names = new Set(
    Object.values(templates).flatMap((template) =>
      [...template.matchAll(/\bopui\.(\w+)\(/g)].map(([, name]) => name),
    ),
  )
  return HELPER_ENTRIES.filter(({ name }) => names.has(name))
}

const byName = (a, b) => a.localeCompare(b, "en")

const list = (items) =>
  `[${items.map((item) => JSON.stringify(item)).join(", ")}]`

export const nunjucksModule = ({ components, templates }) => {
  const metas = Object.values(components)
  const counts = new Map()
  for (const { attributes } of metas) {
    for (const name of attributes) counts.set(name, (counts.get(name) ?? 0) + 1)
  }
  const named = (meta) =>
    meta.attributes.filter((name) => !/^(aria|data)-/.test(name))
  const shared = [...counts]
    .filter(
      ([name, count]) =>
        count >= metas.length / 2 && !/^(aria|data)-/.test(name),
    )
    .map(([name]) => name)
    .toSorted(byName)
  const helpers = usedHelpers(templates)
  const modules = [...new Set(helpers.map(({ file }) => file))].toSorted(byName)
  const imports = modules.map(
    (file) =>
      `import { ${helpers
        .filter((helper) => helper.file === file)
        .map(({ name }) => name)
        .join(", ")} } from "../components/${file.replace(/\.ts$/, "")}"`,
  )
  const entries = Object.entries(components)
    .toSorted(([a], [b]) => (a < b ? -1 : 1))
    .map(
      ([name, meta]) =>
        `  ${name}: { added: ${list(named(meta).filter((item) => !shared.includes(item)))}, depths: { ${Object.entries(
          meta.depths,
        )
          .map(([prop, depth]) => `${JSON.stringify(prop)}: ${depth}`)
          .join(
            ", ",
          )} }, folder: ${JSON.stringify(meta.folder)}, keepsNone: ${list(meta.keepsNone)}, props: ${list(meta.omit)}, removed: ${list(shared.filter((item) => !named(meta).includes(item)))}, slots: ${list(meta.slots)} },`,
    )
  return [
    ...imports,
    "",
    `export const attributes = ${list(shared)}`,
    "",
    `export const components = {\n${entries.join("\n")}\n}`,
    "",
    `export const helpers = { ${helpers.map(({ name }) => name).join(", ")} }`,
    "",
    `export const templates = {\n${Object.keys(templates)
      .toSorted(byName)
      .map(
        (name) =>
          `  ${JSON.stringify(name)}: ${JSON.stringify(templates[name])},`,
      )
      .join("\n")}\n}`,
    "",
  ].join("\n")
}

export const NUNJUCKS_DIR = "packages/opui/nunjucks"

export const nunjucksOutputs = async (files) => {
  const build = await nunjucksBuild(files)
  const outputs = new Map(
    Object.entries(build.components).map(([name, { folder }]) => [
      `packages/opui/components/${folder}/${name}.njk`,
      build.templates[`opui/${name}.njk`],
    ]),
  )
  outputs.set(`${NUNJUCKS_DIR}/index.njk`, build.templates["opui/index.njk"])
  outputs.set(`${NUNJUCKS_DIR}/macros.ts`, nunjucksModule(build))
  return outputs
}

export const componentFiles = async () =>
  (await readdir(componentsDir, { recursive: true }))
    .map((file) => file.split("\\").join("/"))
    .filter((file) => /^[A-Z][^/]*\/[A-Z][^/]*\.astro$/.test(file))
    .map((file) => `packages/opui/components/${file}`)
    .toSorted()

export const nunjucksCensus = async () => {
  const compiled = []
  const refused = []
  for (const file of await componentFiles()) {
    try {
      await compileNunjucks(readFileSync(join(root, file), "utf8"), file)
      compiled.push(file)
    } catch (error) {
      if (!error.code) throw error
      refused.push({ code: error.code, file, message: error.message })
    }
  }
  return { compiled, refused }
}

const report = ({ compiled, refused }) => {
  const codes = [...new Set(refused.map(({ code }) => code))].toSorted()
  return [
    `${compiled.length} of ${compiled.length + refused.length} components compile to Nunjucks macros.${refused.length ? " The first construct each refused file can't compile:" : ""}`,
    ...codes.flatMap((code) => {
      const files = refused.filter((item) => item.code === code)
      return [
        "",
        `${code} (${files.length})`,
        ...files.map(
          ({ file, message }) =>
            `  ${file}: ${(/ uses ([\s\S]*?), which /.exec(message)?.[1] ?? message).replace(/\s+/g, " ")}`,
        ),
      ]
    }),
  ].join("\n")
}

const main = async () => {
  const { values } = parseArgs({
    options: { print: { type: "string" }, report: { type: "boolean" } },
  })
  if (values.print) {
    const file = (await componentFiles()).find((item) =>
      item.endsWith(`/${values.print}.astro`),
    )
    if (!file) throw new Error(`No component ${values.print}`)
    process.stdout.write(
      await compileNunjucks(readFileSync(join(root, file), "utf8"), file),
    )
    return
  }
  if (values.report) {
    console.log(report(await nunjucksCensus()))
    return
  }
  console.log(
    "Usage: node scripts/component-nunjucks.mjs --print <Name> | --report",
  )
}

if (process.argv[1] === fileURLToPath(import.meta.url)) await main()
