import { existsSync } from "node:fs"
import { readdir } from "node:fs/promises"
import { join } from "node:path"
import { parse } from "@astrojs/compiler"
import ts from "typescript"
import { slotProp } from "../src/component-api/frameworks.ts"
import { shapeWhitespace } from "./component-layout.mjs"
import {
  allCodes,
  capitalize,
  containsKind,
  elementsIn,
  identifiersIn,
  isArrayType,
  isBlank,
  root,
  sourceFileOf,
  spreads,
  unionMembers,
  unsupported,
  unwrap,
} from "./component-shared.mjs"

const apiDir = join(root, "src/component-api")

let apiIndex

export const loadApis = async () => {
  if (apiIndex) return apiIndex
  const folders = (await readdir(apiDir, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .toSorted()
  const entries = []
  for (const folder of folders) {
    const file = join(apiDir, folder, "api.ts")
    if (!existsSync(file)) continue
    const { default: api } = await import(file)
    if (api.source) entries.push([`${api.source}/${api.component}`, api])
  }
  apiIndex = new Map(entries)
  return apiIndex
}

export const apiOf = async (folder, name) =>
  (await loadApis()).get(`${folder}/${name}`)

const MARKUP = "__markup"

const HELPER_MODULES = new Set(["../dev", "../id", "../style", "../tag"])

const CONTEXT_MODULE = /^(?:\.\.\/([^/]+)|\.)\/context\.astro$/

const SLOT_RENDER = /^Astro\.slots\.render\("([^"]+)"\)$/

const ID_BASE = "base"
const ID_FACTORIES = new Set(["createId", "createIds"])

const idFactoryOf = (initializer, sourceFile) => {
  if (
    !ts.isCallExpression(initializer) ||
    !ts.isIdentifier(initializer.expression) ||
    !ID_FACTORIES.has(initializer.expression.text) ||
    initializer.arguments[0]?.getText(sourceFile) !== "Astro.locals"
  ) {
    return undefined
  }
  const [, prefix, id] = initializer.arguments
  if (initializer.expression.text === "createId") {
    return initializer.arguments.length === 1 ? { kind: "prefix" } : undefined
  }
  return prefix &&
    ts.isStringLiteral(prefix) &&
    initializer.arguments.length <= 3
    ? { id: id?.getText(sourceFile), kind: "base", prefix: prefix.text }
    : undefined
}

const withoutIdFactories = (line) => {
  const match = /^import \{([^}]*)\} from "\.\.\/id"$/.exec(line)
  if (!match) return line
  const names = match[1]
    .split(",")
    .map((name) => name.trim())
    .filter((name) => name && !ID_FACTORIES.has(name))
  return names.length ? `import { ${names.join(", ")} } from "../id"` : ""
}

const readFrontmatter = (code, file) => {
  const sourceFile = sourceFileOf(code)
  const result = {
    components: [],
    contexts: [],
    derived: [],
    helpers: [],
    idBases: [],
    idPrefixes: [],
    imports: [],
    props: [],
    propsType: undefined,
    provide: undefined,
    reads: [],
    optionalTags: [],
    rest: undefined,
    trimmedSlots: [],
    warnings: [],
  }
  const compact = (node) =>
    node.getText(sourceFile).replace(/\s+/g, "").replace(/,\)/g, ")")
  const trimmedSlotOf = (node) => {
    if (!ts.isConditionalExpression(node)) return undefined
    const has = /^Astro\.slots\.has\("([^"]+)"\)$/.exec(compact(node.condition))
    const call = unwrap(node.whenTrue)
    const awaited =
      ts.isCallExpression(call) &&
      call.expression.getText(sourceFile) === "trimEdges" &&
      call.arguments.length === 1
        ? unwrap(call.arguments[0])
        : undefined
    const rendered =
      awaited &&
      ts.isAwaitExpression(awaited) &&
      SLOT_RENDER.exec(compact(unwrap(awaited.expression)))
    const empty = unwrap(node.whenFalse)
    return has &&
      rendered &&
      has[1] === rendered[1] &&
      ts.isStringLiteral(empty) &&
      empty.text === ""
      ? has[1]
      : undefined
  }
  const optionalTagOf = (node) => {
    if (!ts.isConditionalExpression(node)) return undefined
    const branches = [unwrap(node.whenTrue), unwrap(node.whenFalse)]
    const fragment = branches.find(
      (branch) => ts.isIdentifier(branch) && branch.text === "Fragment",
    )
    const tag = branches.find((branch) => ts.isStringLiteral(branch))
    if (!fragment || !tag) return undefined
    const condition = node.condition.getText(sourceFile)
    return {
      tag: tag.text,
      test: tag === branches[0] ? condition : `!(${condition})`,
    }
  }
  const handlerString = (node) =>
    ts.isPropertyAssignment(node) &&
    /^on[a-z]/.test(node.name.getText(sourceFile)) &&
    ts.isStringLiteral(node.initializer)
  const devFunctions = new Set()
  const contextOf = (node) =>
    ts.isPropertyAccessExpression(node) && ts.isIdentifier(node.expression)
      ? result.contexts.find(({ local }) => local === node.expression.text)
      : undefined
  const contextCall = (node, method) =>
    ts.isCallExpression(node) &&
    contextOf(node.expression) &&
    node.expression.name.text === method
  const isWarning = (statement) =>
    ts.isExpressionStatement(statement) &&
    ts.isCallExpression(statement.expression) &&
    ts.isIdentifier(statement.expression.expression) &&
    devFunctions.has(statement.expression.expression.text)
  for (const statement of sourceFile.statements) {
    if (ts.isImportDeclaration(statement)) {
      const specifier = statement.moduleSpecifier.text
      const clause = statement.importClause
      if (specifier === "./types.astro") {
        const [element] = clause.namedBindings.elements
        result.propsType = element.propertyName?.text ?? element.name.text
        continue
      }
      if (
        specifier === "../cx" ||
        specifier === "../whitespace" ||
        specifier === "astro/types"
      ) {
        continue
      }
      const named =
        clause.namedBindings && ts.isNamedImports(clause.namedBindings)
          ? clause.namedBindings.elements
          : undefined
      const context = CONTEXT_MODULE.exec(specifier)
      if (context && named) {
        for (const element of named) {
          const local = element.name.text
          result.contexts.push({
            folder: context[1],
            local,
            name: capitalize(local.replace(/Context$/, "")),
          })
        }
        continue
      }
      if (specifier.endsWith(".astro") && clause.name) {
        const match = /^(?:\.\.\/([^/]+)|\.)\/([^/]+)\.astro$/.exec(specifier)
        if (!match) throw unsupported(file, `the import of ${specifier}`)
        result.components.push({
          folder: match[1],
          local: clause.name.text,
          name: match[2],
        })
        continue
      }
      if (specifier === "../attrs") continue
      if (
        named &&
        ((specifier.startsWith("./") && !specifier.endsWith(".astro")) ||
          HELPER_MODULES.has(specifier) ||
          /^\.\.\/[A-Z]\w*\/[a-z][\w-]*$/.test(specifier))
      ) {
        if (specifier === "../dev") {
          for (const element of clause.namedBindings.elements) {
            devFunctions.add(element.name.text)
          }
        }
        if (specifier === "../tag") {
          result.helpers.push(
            ...clause.namedBindings.elements.map(
              (element) => element.name.text,
            ),
          )
        }
        result.imports.push(statement.getText(sourceFile))
        continue
      }
      throw unsupported(file, `the import of ${specifier}`)
    }
    if (
      ts.isVariableStatement(statement) &&
      statement.modifiers?.some(
        (modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword,
      ) &&
      statement.declarationList.declarations[0]?.name.text === "title"
    ) {
      continue
    }
    const text = statement.getText(sourceFile).split("\n")[0]
    if (
      ts.canHaveModifiers(statement) &&
      ts
        .getModifiers(statement)
        ?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword)
    ) {
      throw unsupported(file, `the frontmatter statement \`${text}\``)
    }
    const usesProps = (node) =>
      containsKind(
        node,
        (child) =>
          ts.isPropertyAccessExpression(child) &&
          child.getText(sourceFile) === "Astro.props",
      )
    if (!ts.isVariableStatement(statement) && usesProps(statement)) {
      throw unsupported(
        file,
        `Astro.props in \`${text}\``,
        "destructure what the statement needs and read the names",
      )
    }
    if (ts.isVariableStatement(statement)) {
      const [declaration] = statement.declarationList.declarations
      const propsSource = declaration.initializer
        ? unwrap(declaration.initializer)
        : undefined
      const fromProps =
        !!propsSource &&
        (propsSource.getText(sourceFile) === "Astro.props" ||
          (ts.isAsExpression(propsSource) &&
            propsSource.expression.getText(sourceFile) === "Astro.props"))
      if (
        statement.declarationList.declarations.length === 1 &&
        ts.isObjectBindingPattern(declaration.name) &&
        fromProps &&
        result.props.length === 0 &&
        !result.rest
      ) {
        for (const element of declaration.name.elements) {
          if (element.dotDotDotToken) {
            result.rest = element.name.text
            continue
          }
          result.props.push({
            default: element.initializer?.getText(sourceFile),
            local: element.name.text,
            prop: element.propertyName
              ? element.propertyName.text
              : element.name.text,
          })
        }
        continue
      }
      const simple =
        statement.declarationList.declarations.length === 1 &&
        ts.isIdentifier(declaration.name) &&
        !declaration.type &&
        !!declaration.initializer
      const initializer = simple ? unwrap(declaration.initializer) : undefined
      if (simple && usesProps(initializer)) {
        throw unsupported(
          file,
          `Astro.props in \`${text}\``,
          "destructure what the statement needs and read the names",
        )
      }
      const factory = simple ? idFactoryOf(initializer, sourceFile) : undefined
      if (factory?.kind === "prefix") {
        result.idPrefixes.push(declaration.name.text)
        continue
      }
      if (factory?.kind === "base") {
        if (result.idBases.length > 0) {
          throw unsupported(file, `a second createIds in \`${text}\``)
        }
        result.idBases.push([declaration.name.text, ID_BASE])
        const fallback = `\`${factory.prefix}-\${Astro.locals}\``
        result.derived.push({
          code: factory.id
            ? `${/^[\w$.?]+$/.test(factory.id) ? factory.id : `(${factory.id})`} || ${fallback}`
            : fallback,
          fn: false,
          name: ID_BASE,
        })
        continue
      }
      if (
        simple &&
        contextCall(initializer, "get") &&
        initializer.arguments.length === 0
      ) {
        result.reads.push({
          context: contextOf(initializer.expression),
          name: declaration.name.text,
        })
        continue
      }
      const trimmedSlot = simple ? trimmedSlotOf(initializer) : undefined
      if (trimmedSlot) {
        result.trimmedSlots.push({
          local: declaration.name.text,
          slot: trimmedSlot,
        })
        continue
      }
      const optionalTag = simple ? optionalTagOf(initializer) : undefined
      if (optionalTag) {
        result.optionalTags.push({
          name: declaration.name.text,
          ...optionalTag,
        })
        continue
      }
      if (
        simple &&
        containsKind(
          initializer,
          (node) => ts.isIdentifier(node) && node.text === "Fragment",
        )
      ) {
        throw unsupported(
          file,
          `Fragment as a value in \`${text}\``,
          "write it as a condition between one tag and Fragment",
        )
      }
      if (simple && containsKind(initializer, handlerString)) {
        throw unsupported(
          file,
          `a handler string in \`${text}\``,
          "React can't attach a string to an event; give the element the attribute, or write the behavior in a helper",
        )
      }
      if (simple && ts.isAwaitExpression(initializer)) {
        const call = unwrap(initializer.expression)
        const [value, render] = ts.isCallExpression(call)
          ? call.arguments.map(unwrap)
          : []
        const rendered =
          render &&
          ts.isArrowFunction(render) &&
          render.parameters.length === 0 &&
          SLOT_RENDER.exec(compact(unwrap(render.body)))
        if (
          rendered &&
          contextCall(call, "provide") &&
          call.arguments.length === 2 &&
          ts.isObjectLiteralExpression(value) &&
          value.properties.every(
            (property) =>
              ts.isShorthandPropertyAssignment(property) ||
              (ts.isPropertyAssignment(property) &&
                ts.isIdentifier(property.name)),
          )
        ) {
          if (result.provide) {
            throw unsupported(file, "a second context provide")
          }
          result.provide = {
            context: contextOf(call.expression),
            html: declaration.name.text,
            slot: rendered[1],
            value: value.properties.map((property) => ({
              code: ts.isShorthandPropertyAssignment(property)
                ? property.name.text
                : property.initializer.getText(sourceFile),
              key: property.name.text,
            })),
          }
          continue
        }
      }
      if (
        simple &&
        containsKind(initializer, (node) => contextCall(node, "get"))
      ) {
        throw unsupported(
          file,
          `a context get() inside \`${text}\``,
          "assign the get() to its own const first",
        )
      }
      if (
        simple &&
        !containsKind(initializer, (node) => ts.isAwaitExpression(node))
      ) {
        result.derived.push({
          code: declaration.initializer.getText(sourceFile),
          fn:
            ts.isArrowFunction(initializer) ||
            ts.isFunctionExpression(initializer),
          name: declaration.name.text,
        })
        continue
      }
      throw unsupported(file, `the frontmatter statement \`${text}\``)
    }
    if (isWarning(statement)) {
      result.warnings.push(statement.expression.getText(sourceFile))
      continue
    }
    if (
      ts.isIfStatement(statement) &&
      !statement.elseStatement &&
      (ts.isBlock(statement.thenStatement)
        ? statement.thenStatement.statements
        : [statement.thenStatement]
      ).every(isWarning)
    ) {
      result.warnings.push(statement.getText(sourceFile))
      continue
    }
    throw unsupported(file, `the frontmatter statement \`${text}\``)
  }
  if (!result.propsType) throw unsupported(file, "no Props import")
  if (result.props.length === 0 && !result.rest) {
    throw unsupported(file, "no Astro.props destructuring")
  }
  if (
    result.idBases.length > 0 &&
    [
      ...result.props.map(({ local }) => local),
      ...result.derived.map(({ name }) => name),
    ].filter((name) => name === ID_BASE).length > 1
  ) {
    throw unsupported(file, `a \`${ID_BASE}\` next to createIds`)
  }
  result.imports = result.imports
    .map((line) => withoutIdFactories(line))
    .filter(Boolean)
  return result
}

const uncast = (node) => {
  const inner = unwrap(node)
  return ts.isAsExpression(inner) ? unwrap(inner.expression) : inner
}

const chosenSpread = (node) => {
  const choice = uncast(node)
  if (!ts.isConditionalExpression(choice)) return undefined
  const whenTrue = uncast(choice.whenTrue)
  const whenFalse = uncast(choice.whenFalse)
  const empty = (branch) =>
    ts.isObjectLiteralExpression(branch) && branch.properties.length === 0
  const spread =
    ts.isIdentifier(whenTrue) && empty(whenFalse)
      ? whenTrue
      : ts.isIdentifier(whenFalse) && empty(whenTrue)
        ? whenFalse
        : undefined
  if (!spread) return undefined
  return {
    condition: choice.condition,
    negated: spread === whenFalse,
    spread,
  }
}

const attributeNode = (item, context) => {
  if (item.kind === "quoted") {
    return { kind: "static", name: item.name, value: item.value }
  }
  if (item.kind === "empty") return { kind: "boolean", name: item.name }
  if (item.kind === "spread") {
    const sourceFile = sourceFileOf(`(${item.name})`, "spread.ts")
    const written = unwrap(sourceFile.statements[0].expression)
    const expression =
      ts.isCallExpression(written) &&
      ts.isIdentifier(written.expression) &&
      written.expression.text === "defined" &&
      written.arguments.length === 1
        ? unwrap(written.arguments[0])
        : written
    const cast =
      ts.isAsExpression(expression) &&
      ts.isIdentifier(unwrap(expression.expression))
        ? unwrap(expression.expression)
        : expression
    const chosen = chosenSpread(expression)
    if (chosen) {
      return {
        code: chosen.spread.text,
        condition: chosen.condition.getText(sourceFile),
        kind: "spread",
        negated: chosen.negated,
      }
    }
    return { code: cast.getText(sourceFile), kind: "spread" }
  }
  if (item.kind === "expression") {
    if (item.name === "class:list") return { kind: "class", code: item.value }
    const code = item.value.trim()
    if (item.name === "class") {
      const match = /^cx\(([\s\S]*)\)$/.exec(code)
      if (!match) throw unsupported(context.file, `class={${code}}`)
      return { kind: "class", code: match[1].trim() }
    }
    if (item.name.includes(":")) {
      throw unsupported(context.file, `the directive ${item.name}`)
    }
    return { code, kind: "expression", name: item.name }
  }
  if (item.kind === "template-literal") {
    return { code: `\`${item.value}\``, kind: "expression", name: item.name }
  }
  throw unsupported(context.file, `the attribute ${item.name}`)
}

const markupIdentifier = (index) => `${MARKUP}${index}`

const bindingNames = (name) =>
  ts.isIdentifier(name)
    ? [name.text]
    : ts.isObjectBindingPattern(name) || ts.isArrayBindingPattern(name)
      ? name.elements.flatMap((element) =>
          ts.isBindingElement(element) ? bindingNames(element.name) : [],
        )
      : []

const expressionNode = (node, context) => {
  const markup = []
  const code = node.children
    .map((child) => {
      if (child.type === "text") return child.value
      markup.push(child)
      return markupIdentifier(markup.length - 1)
    })
    .join("")
    .trim()
  const sourceFile = sourceFileOf(`(${code})`, "expression.ts")
  const [statement] = sourceFile.statements
  if (
    sourceFile.parseDiagnostics.length > 0 ||
    sourceFile.statements.length !== 1 ||
    !ts.isExpressionStatement(statement)
  ) {
    throw unsupported(context.file, `the expression {${code}}`)
  }
  const placeholder = (expression) => {
    const inner = unwrap(expression)
    if (!ts.isIdentifier(inner) || !inner.text.startsWith(MARKUP)) {
      return undefined
    }
    return markup[Number(inner.text.slice(MARKUP.length))]
  }
  const hasPlaceholder = (expression) =>
    expression.getText(sourceFile).includes(MARKUP)
  const nodesOf = (expression, scope) => {
    const inner = unwrap(expression)
    const child = placeholder(inner)
    if (child) return toTree([child], { ...scope, jsx: true })
    if (
      ts.isBinaryExpression(inner) &&
      inner.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken &&
      placeholder(inner.right)
    ) {
      if (hasPlaceholder(inner.left)) {
        throw unsupported(context.file, `the expression {${code}}`)
      }
      return [
        {
          consequent: nodesOf(inner.right, scope),
          test: inner.left.getText(sourceFile),
          type: "if",
        },
      ]
    }
    if (ts.isConditionalExpression(inner) && hasPlaceholder(inner)) {
      if (hasPlaceholder(inner.condition)) {
        throw unsupported(context.file, `the expression {${code}}`)
      }
      return [
        {
          alternate: nodesOf(inner.whenFalse, scope),
          consequent: nodesOf(inner.whenTrue, scope),
          test: inner.condition.getText(sourceFile),
          type: "if",
        },
      ]
    }
    if (hasPlaceholder(inner)) {
      throw unsupported(
        context.file,
        `the expression {${code}}, whose branches hold more than one element`,
      )
    }
    const text = inner.getText(sourceFile)
    return text === "undefined" || text === "null"
      ? []
      : [{ code: text, type: "expression" }]
  }
  const expression = unwrap(statement.expression)
  const callback =
    ts.isCallExpression(expression) &&
    ts.isPropertyAccessExpression(expression.expression) &&
    expression.expression.name.text === "map" &&
    expression.arguments.length === 1
      ? unwrap(expression.arguments[0])
      : undefined
  if (callback && ts.isArrowFunction(callback) && hasPlaceholder(callback)) {
    const describe = (what) =>
      unsupported(context.file, `the expression {${code}}, whose ${what}`)
    if (
      callback.parameters.length > 2 ||
      (callback.parameters[1] && !ts.isIdentifier(callback.parameters[1].name))
    ) {
      throw describe("map callback takes more than the item and its index")
    }
    const [parameter, indexParameter] = callback.parameters
    const index = indexParameter?.name.text ?? "index"
    const statements = ts.isBlock(callback.body) ? callback.body.statements : []
    const consts = []
    let returned = ts.isBlock(callback.body) ? undefined : callback.body
    for (const [index, inner] of statements.entries()) {
      const [declaration] = ts.isVariableStatement(inner)
        ? inner.declarationList.declarations
        : []
      if (
        declaration &&
        inner.declarationList.declarations.length === 1 &&
        ts.isIdentifier(declaration.name) &&
        declaration.initializer &&
        !hasPlaceholder(declaration.initializer)
      ) {
        consts.push({
          code: declaration.initializer.getText(sourceFile),
          name: declaration.name.text,
        })
        continue
      }
      if (
        ts.isReturnStatement(inner) &&
        inner.expression &&
        index === statements.length - 1
      ) {
        returned = inner.expression
        continue
      }
      throw describe(
        `map callback has the statement \`${inner.getText(sourceFile).split("\n")[0]}\``,
      )
    }
    if (!returned) throw describe("map callback returns nothing")
    const scope = {
      ...context,
      locals: new Set([
        ...context.locals,
        ...bindingNames(parameter.name),
        ...(indexParameter ? [index] : []),
        ...consts.map(({ name }) => name),
      ]),
    }
    const children = nodesOf(returned, scope)
    const roots = children.filter((child) => !isBlank(child))
    const [root] = roots
    const branchRoots =
      roots.length === 1 && root.type === "if" && root.alternate
        ? [root.consequent, root.alternate].map((branch) =>
            branch.filter((child) => !isBlank(child)),
          )
        : undefined
    const keyed =
      roots.length === 1 && root.type === "element"
        ? [root]
        : branchRoots?.every(
              (branch) => branch.length === 1 && branch[0].type === "element",
            )
          ? branchRoots.map(([element]) => element)
          : undefined
    if (!keyed) {
      throw describe(
        "map callback doesn't return one element or a condition between two",
      )
    }
    for (const element of keyed) element.keyed = index
    return [
      {
        children,
        consts,
        index,
        item: parameter.getText(sourceFile),
        list: expression.expression.expression.getText(sourceFile),
        optional: !!expression.expression.questionDotToken,
        type: "each",
      },
    ]
  }
  return nodesOf(expression, context)
}

const slotOfHtml = (value, context) => {
  const code = value.trim()
  if (code === context.provide?.html) {
    return { fallback: [], name: context.provide.slot, type: "slot" }
  }
  if (context.trimmedSlots.has(code)) {
    return {
      fallback: [],
      name: context.trimmedSlots.get(code),
      trimmed: true,
      type: "slot",
    }
  }
  const sourceFile = sourceFileOf(`(${code})`, "expression.ts")
  const [statement] = sourceFile.statements
  const expression =
    statement && ts.isExpressionStatement(statement)
      ? unwrap(statement.expression)
      : undefined
  if (expression && ts.isConditionalExpression(expression)) {
    const isEmpty = (node) =>
      ts.isStringLiteral(unwrap(node)) && unwrap(node).text === ""
    const branches = [expression.whenTrue, expression.whenFalse]
    const shown = branches.find((branch) => !isEmpty(branch))
    const slot =
      shown && branches.some(isEmpty)
        ? slotOfHtml(unwrap(shown).getText(sourceFile), context)
        : undefined
    if (slot?.type === "slot") {
      const condition = expression.condition.getText(sourceFile)
      return {
        consequent: [slot],
        test: shown === expression.whenTrue ? condition : `!(${condition})`,
        type: "if",
      }
    }
  }
  return undefined
}

const toTree = (nodes, context) =>
  nodes.flatMap((node) => {
    if (node.type === "text") {
      if (isBlank(node) && context.jsx && node.value.includes("\n")) return []
      return [
        {
          type: "text",
          value: isBlank(node)
            ? node.value.includes("\n")
              ? "\n"
              : " "
            : node.value,
        },
      ]
    }
    if (node.type === "comment") return []
    if (node.type === "expression") return expressionNode(node, context)
    if (node.type === "element" && node.name === "slot") {
      const name = node.attributes.find((item) => item.name === "name")
      if (node.attributes.some((item) => item.name !== "name")) {
        throw unsupported(
          context.file,
          "a slot with attributes other than name",
        )
      }
      return [
        {
          fallback: toTree(node.children, context),
          name: name?.value ?? "default",
          type: "slot",
        },
      ]
    }
    if (node.type === "fragment") {
      const [attribute] = node.attributes
      if (node.attributes.length === 0) return toTree(node.children, context)
      const slot =
        node.attributes.length === 1 &&
        attribute.kind === "expression" &&
        attribute.name === "set:html" &&
        node.children.length === 0
          ? slotOfHtml(attribute.value, context)
          : undefined
      if (slot) return [slot]
      throw unsupported(context.file, `<Fragment ${attribute.name}>`)
    }
    if (
      node.type === "element" ||
      node.type === "component" ||
      node.type === "custom-element"
    ) {
      if (node.type === "element" && /^(script|style)$/.test(node.name)) {
        throw unsupported(context.file, `a <${node.name}>`)
      }
      const optionalTag = context.optionalTags?.get(node.name)
      if (optionalTag) {
        const children = toTree(node.children, context)
        const tested = identifiersIn(optionalTag.test)
        const emptyWithout = children
          .filter((child) => !isBlank(child))
          .every(
            (child) =>
              (child.type === "expression" && tested.has(child.code.trim())) ||
              (child.type === "slot" &&
                child.trimmed &&
                [...context.trimmedSlots].some(
                  ([local, slot]) => slot === child.name && tested.has(local),
                )),
          )
        return [
          {
            alternate: emptyWithout ? undefined : children,
            consequent: [
              {
                attributes: node.attributes.map((item) =>
                  attributeNode(item, context),
                ),
                children,
                component: undefined,
                custom: false,
                foreign: context.foreign === true,
                tag: optionalTag.tag,
                type: "element",
                variable: false,
              },
            ],
            test: optionalTag.test,
            type: "if",
          },
        ]
      }
      const component = context.components.find(
        (entry) => entry.local === node.name,
      )
      const variable =
        node.type === "component" && !component && context.locals.has(node.name)
      if (node.type === "component" && !component && !variable) {
        throw unsupported(context.file, `<${node.name}>`)
      }
      const inner =
        node.type === "element" && /^(math|svg)$/.test(node.name)
          ? { ...context, foreign: true }
          : context
      const html = node.attributes.find((item) => item.name === "set:html")
      const external =
        html?.kind === "quoted" &&
        html.value === "" &&
        node.children.length === 0
      const htmlSlot =
        html && node.children.length === 0 && html.kind === "expression"
          ? slotOfHtml(html.value, context)
          : undefined
      if (html && !htmlSlot && !external) {
        throw unsupported(context.file, `set:html={${html.value}}`)
      }
      const children = htmlSlot ? [htmlSlot] : toTree(node.children, inner)
      return [
        {
          attributes: node.attributes
            .filter((item) => item !== html)
            .map((item) => attributeNode(item, context)),
          children,
          component,
          custom: node.type === "custom-element",
          external,
          foreign: context.foreign === true,
          tag: node.name,
          type: "element",
          variable,
        },
      ]
    }
    throw unsupported(context.file, `a ${node.type} node`)
  })

const callsGroupWarning = (code) =>
  containsKind(
    sourceFileOf(code, "warning.ts"),
    (node) =>
      ts.isCallExpression(node) &&
      ts.isIdentifier(node.expression) &&
      node.expression.text === "warnGroupedChecked",
  )

export const readComponent = async (source, file, api) => {
  await loadApis()
  const { ast } = await parse(source, { position: true })
  const frontmatterNode = ast.children.find(
    (node) => node.type === "frontmatter",
  )
  const frontmatter = readFrontmatter(frontmatterNode?.value ?? "", file)
  const body = ast.children.filter((node) => node.type !== "frontmatter")
  const isScript = (node) => node.type === "element" && node.name === "script"
  const scripts = body.filter(isScript).flatMap((node) => {
    const { statements } = sourceFileOf(
      node.children.map((child) => child.value ?? "").join(""),
      "script.ts",
    )
    if (
      node.attributes.length > 0 ||
      statements.length === 0 ||
      !statements.every(
        (statement) =>
          ts.isImportDeclaration(statement) && !statement.importClause,
      )
    ) {
      throw unsupported(file, "a <script> with more than side-effect imports")
    }
    return statements.map((statement) => statement.moduleSpecifier.text)
  })
  const context = {
    components: frontmatter.components,
    file,
    locals: new Set([
      ...frontmatter.props.map(({ local }) => local),
      ...frontmatter.derived.map(({ name }) => name),
    ]),
    optionalTags: new Map(
      frontmatter.optionalTags.map((entry) => [entry.name, entry]),
    ),
    provide: frontmatter.provide,
    trimmedSlots: new Map(
      frontmatter.trimmedSlots.map(({ local, slot }) => [local, slot]),
    ),
  }
  const tree = shapeWhitespace(
    toTree(
      body.filter((node) => !isScript(node)),
      context,
    ),
    frontmatter,
  )
  const slots = []
  const visit = (nodes) => {
    for (const node of nodes) {
      if (node.type === "slot" && !slots.includes(node.name)) {
        slots.push(node.name)
      }
      if (node.children) visit(node.children)
      if (node.fallback) visit(node.fallback)
      if (node.consequent) visit(node.consequent)
      if (node.alternate) visit(node.alternate)
    }
  }
  visit(tree)
  for (const { slot } of frontmatter.trimmedSlots) {
    if (!slots.includes(slot)) slots.push(slot)
  }
  const roots = tree.filter((node) => !isBlank(node))
  const [rootNode] = roots
  const branches =
    roots.length === 1 && rootNode.type === "if"
      ? [
          rootNode.consequent,
          ...(rootNode.alternate ? [rootNode.alternate] : []),
        ]
      : []
  const rootElements =
    roots.length === 1 && rootNode.type === "element"
      ? [rootNode]
      : branches.length > 0 &&
          branches.every(
            (branch) =>
              branch.filter((node) => !isBlank(node)).length === 1 &&
              branch.find((node) => !isBlank(node)).type === "element",
          )
        ? branches.map((branch) => branch.find((node) => !isBlank(node)))
        : undefined
  const restSpreads = elementsIn(roots).flatMap((node) =>
    node.attributes.filter(
      (item) => item.kind === "spread" && item.code === frontmatter.rest,
    ),
  )
  const chosenRest = restSpreads.filter((item) => item.condition !== undefined)
  if (
    chosenRest.length > 0 &&
    (chosenRest.length !== restSpreads.length ||
      new Set(chosenRest.map((item) => item.condition)).size !== 1 ||
      new Set(chosenRest.map((item) => item.negated)).size !== 2)
  ) {
    throw unsupported(
      file,
      `a ${frontmatter.rest} spread behind a condition that doesn't pick one element`,
      `spread ${frontmatter.rest} as \`cond ? ${frontmatter.rest} : {}\` on one element and \`cond ? {} : ${frontmatter.rest}\` on the other, with the same condition`,
    )
  }
  const restElements = elementsIn(roots).filter((node) =>
    spreads(node, frontmatter.rest),
  )
  const multiRoot =
    !rootElements && roots.length > 1 && restElements.length === 1
  if (!rootElements && !multiRoot) {
    throw unsupported(file, "a template that isn't one element")
  }
  if (
    chosenRest.length === 0 &&
    !multiRoot &&
    restElements.length !== rootElements.length
  ) {
    throw unsupported(
      file,
      `a template that doesn't spread ${frontmatter.rest} on each root or on one inner element`,
    )
  }
  const variableTags = [
    ...new Set(
      elementsIn(roots)
        .filter((node) => node.variable)
        .map((node) => node.tag),
    ),
  ]
  const stringSlots = frontmatter.props
    .filter(({ prop }) => slots.some((slot) => slotProp(slot) === prop))
    .map(({ local }) => local)
  const item = itemOf(frontmatter, roots, file.split("/").at(-2))
  const component = {
    ...frontmatter,
    file,
    item,
    warnings: item
      ? frontmatter.warnings.filter((code) => !callsGroupWarning(code))
      : frontmatter.warnings,
    chosenRest: chosenRest.length > 0,
    model: modelOf(frontmatter, roots, api, file, file.split("/").at(-2)),
    multiRoot,
    restOnRoot: (rootElements ?? []).some((node) =>
      spreads(node, frontmatter.rest),
    ),
    scripts,
    stringSlots,
    rootElements: rootElements ?? [],
    slots: slots.toSorted(),
    tree: roots,
    variableTags,
  }
  const untranslated = allCodes(component).find((code) =>
    /\bAstro\.(?!slots\.has\(|locals\b)/.test(code),
  )
  if (untranslated) {
    throw unsupported(
      file,
      `an Astro reference the ports have no form for in \`${untranslated.trim()}\``,
      "read a slot with Astro.slots.has(name), and props from the Astro.props destructuring",
    )
  }
  const ids = {
    bases: new Map(frontmatter.idBases),
    prefixes: new Set(frontmatter.idPrefixes),
  }
  const idProblem = allCodes(component)
    .map((code) => unloweredIdCall(code, ids))
    .find(Boolean)
  if (idProblem) {
    throw unsupported(
      file,
      `an id factory used as \`${idProblem}\``,
      'call createIds(Astro.locals, "prefix", id) once into a const and read it as ids() or ids("part"), or call it inline with one part',
    )
  }
  return {
    ...component,
    ids,
    uid:
      ids.prefixes.size > 0 ||
      allCodes(component).some((code) => /\bAstro\.locals\b/.test(code)),
  }
}

const unloweredIdCall = (code, { bases, prefixes }) => {
  const sourceFile = sourceFileOf(code)
  const single = (call) =>
    call.arguments.length === 1 && ts.isStringLiteral(call.arguments[0])
  let problem
  const visit = (node) => {
    if (problem) return
    if (ts.isIdentifier(node)) {
      const parent = node.parent
      const callee =
        ts.isCallExpression(parent) && parent.expression === node
          ? parent
          : undefined
      const allowed = bases.has(node.text)
        ? callee && (callee.arguments.length === 0 || single(callee))
        : prefixes.has(node.text)
          ? callee && single(callee)
          : ID_FACTORIES.has(node.text)
            ? callee &&
              ts.isCallExpression(callee.parent) &&
              callee.parent.expression === callee &&
              single(callee.parent) &&
              idFactoryOf(callee, sourceFile)?.kind === "base"
            : true
      if (!allowed) problem = (callee?.parent ?? parent).getText(sourceFile)
    }
    ts.forEachChild(node, visit)
  }
  visit(sourceFile)
  return problem
}

const CONTROLS = new Set(["input", "select", "textarea"])

const itemOf = (frontmatter, tree, folder) => {
  const read = frontmatter.reads.find((entry) => {
    const group = entry.context.folder ?? folder
    return apiIndex?.get(`${group}/${group}`)?.model
  })
  const grouped = frontmatter.derived.find(
    ({ code }) =>
      /\bisSelected\(/.test(code) && identifiersIn(code).has(read?.name),
  )
  if (!read || !grouped) return undefined
  const inputs = elementsIn(tree).filter(
    (node) =>
      node.tag === "input" &&
      spreads(node, frontmatter.rest) &&
      node.attributes.some(
        (item) => item.kind === "expression" && item.name === "checked",
      ),
  )
  if (inputs.length !== 1) return undefined
  inputs[0].item = true
  return {
    checked: frontmatter.props.find(({ prop }) => prop === "checked")?.local,
    group: read.context.folder ?? folder,
    grouped: grouped.name,
    parent: read.name,
  }
}

const radioGroupOf = (tree, frontmatter, declared) => {
  const prop = frontmatter.props.find((entry) => entry.prop === declared.prop)
  const radios = elementsIn(tree).filter(
    (node) => node.tag === "input" && staticAttribute(node, "type") === "radio",
  )
  if (declared.prop !== "value" || !prop || radios.length === 0) {
    return undefined
  }
  const values = radios.map((radio) => {
    const value = radio.attributes.find((item) => item.name === "value")
    const checked = radio.attributes.find(
      (item) => item.kind === "expression" && item.name === "checked",
    )
    if (!value || !checked || !["expression", "static"].includes(value.kind)) {
      return undefined
    }
    const test = unwrap(
      sourceFileOf(`(${checked.code})`, "checked.ts").statements[0].expression,
    )
    if (
      !ts.isBinaryExpression(test) ||
      test.operatorToken.kind !== ts.SyntaxKind.EqualsEqualsEqualsToken
    ) {
      return undefined
    }
    const compared = test.right.getText()
    return value.kind === "static"
      ? compared === value.value || compared === JSON.stringify(value.value)
        ? JSON.stringify(value.value)
        : undefined
      : compared === value.code.trim()
        ? value.code.trim()
        : undefined
  })
  if (values.includes(undefined)) return undefined
  radios.forEach((radio, index) => {
    radio.groupRadio = values[index]
  })
  return { local: prop.local }
}

const staticAttribute = (node, name) =>
  node.attributes.find((item) => item.kind === "static" && item.name === name)
    ?.value

const matchesCompound = (node, compound) => {
  const [, tag, classes, attributes] =
    /^([a-z-]*)((?:\.[\w-]+)*)((?:\[[\w-]+="[^"]*"\])*)$/.exec(compound) ?? []
  if (tag === undefined) return false
  if (tag && node.tag !== tag) return false
  const hasClasses = classes
    .split(".")
    .filter(Boolean)
    .every((name) => {
      const list = node.attributes.find((item) => item.kind === "class")
      return (
        (staticAttribute(node, "class") ?? "").split(/\s+/).includes(name) ||
        (list !== undefined && list.code.includes(`"${name}"`))
      )
    })
  const hasAttributes = [
    ...attributes.matchAll(/\[([\w-]+)="([^"]*)"\]/g),
  ].every(([, name, value]) => staticAttribute(node, name) === value)
  return hasClasses && hasAttributes
}

const elementsWithParents = (nodes, parent = undefined) =>
  nodes.flatMap((node) => {
    if (node.type === "element") {
      return [{ node, parent }, ...elementsWithParents(node.children, node)]
    }
    if (node.type === "if") {
      return [
        ...elementsWithParents(node.consequent, parent),
        ...elementsWithParents(node.alternate ?? [], parent),
      ]
    }
    if (node.type === "each") return elementsWithParents(node.children, parent)
    if (node.type === "slot") return elementsWithParents(node.fallback, parent)
    return []
  })

const matchesSelector = (entry, compounds) => {
  const [last, ...ancestors] = compounds
  if (!matchesCompound(entry.node, last)) return false
  return ancestors.length === 0
    ? true
    : !!entry.parent && matchesCompound(entry.parent, ancestors[0])
}

const modelOf = (frontmatter, tree, api, file, folder) => {
  const declared = api?.model
  if (!declared) return undefined
  const describe = (what) => ({
    refusal: unsupported(
      file,
      `the ${declared.prop} model of ${api.component}, ${what}`,
      "write the behavior by hand, or extend the model kinds in scripts/build-components.mjs",
    ),
  })
  const unbound = (what) => ({ ...describe(what), everywhere: true })
  const bindables = declared.frameworks?.svelte ?? [
    { prop: declared.prop, type: declared.type },
  ]
  if (frontmatter.provide) {
    const shared = frontmatter.provide.value.some(
      ({ code, key }) => key === declared.prop && code === declared.prop,
    )
    if (!shared) {
      return {
        ...describe("which its context doesn't share"),
        everywhere: true,
      }
    }
    const prop = frontmatter.props.find((entry) => entry.prop === declared.prop)
    if (!prop || prop.local !== declared.prop) {
      return {
        ...describe("whose prop the destructuring doesn't keep by name"),
        everywhere: true,
      }
    }
    const multiple = unionMembers(declared.type).some(isArrayType)
    if (
      multiple &&
      !frontmatter.props.some(({ prop }) => prop === "multiple")
    ) {
      return {
        ...describe("whose array value needs a multiple prop"),
        everywhere: true,
      }
    }
    return {
      bindables,
      kind: "group",
      local: prop.local,
      prop: declared.prop,
      read: multiple ? "selectionOf(input, multiple)" : "input.value",
      type: declared.type,
    }
  }
  const part = api.parts.find((entry) => entry.model) ?? api.root
  if (!part) return unbound("which no part in api.ts is marked as")
  const compounds = part.selector
    .split(">")
    .map((compound) => compound.trim())
    .toReversed()
  const matches = elementsWithParents(tree).filter((entry) =>
    matchesSelector(entry, compounds),
  )
  if (matches.length === 0) {
    const group = radioGroupOf(tree, frontmatter, declared)
    if (group) {
      return {
        bindables,
        kind: "radioGroup",
        local: group.local,
        prop: declared.prop,
        type: declared.type,
      }
    }
    const children = elementsIn(tree).filter(
      (node) =>
        node.component &&
        apiIndex?.get(
          `${node.component.folder ?? folder}/${node.component.name}`,
        )?.model,
    )
    if (children.length !== 1) {
      return unbound(`whose part ${part.selector} matches no element`)
    }
    const [element] = children
    if (!spreads(element, frontmatter.rest)) {
      return unbound(`whose component doesn't spread ${frontmatter.rest}`)
    }
    element.model = true
    return {
      bindables,
      element,
      kind: "forward",
      prop: declared.prop,
      type: declared.type,
    }
  }
  if (matches.length !== 1) {
    return unbound(
      `whose part ${part.selector} matches ${matches.length} elements`,
    )
  }
  const element = matches[0].node
  if (element.item && declared.prop === "checked") {
    return {
      bindables,
      element,
      kind: "checkedItem",
      prop: declared.prop,
      type: declared.type,
    }
  }
  const type = staticAttribute(element, "type")
  const kind =
    declared.prop === "value" &&
    CONTROLS.has(element.tag) &&
    type !== "checkbox" &&
    type !== "radio"
      ? "value"
      : declared.prop === "checked" &&
          element.tag === "input" &&
          type === "checkbox"
        ? "checked"
        : declared.prop === "value" &&
            element.tag === "input" &&
            type === "radio"
          ? "radio"
          : undefined
  if (!kind)
    return unbound("which isn't a value, checked or radio model of a control")
  if (!spreads(element, frontmatter.rest)) {
    return unbound(`whose element doesn't spread ${frontmatter.rest}`)
  }
  const prop = frontmatter.props.find((entry) => entry.prop === declared.prop)
  if (prop && kind !== "value") {
    return describe(`whose prop ${prop.local} is read by the component`)
  }
  if (prop) {
    const attribute = element.attributes.find(
      (item) =>
        item.kind === "expression" &&
        item.name === declared.prop &&
        item.code.trim() === prop.local,
    )
    const child = element.children.find(
      (node) => node.type === "expression" && node.code.trim() === prop.local,
    )
    if (attribute) {
      element.attributes = element.attributes.filter(
        (item) => item !== attribute,
      )
    }
    if (child) {
      element.children = element.children.filter((node) => node !== child)
    }
  }
  element.model = true
  return {
    bindables,
    element,
    kind,
    local: prop?.local,
    prop: declared.prop,
    rest: frontmatter.rest,
    type: declared.type,
  }
}
