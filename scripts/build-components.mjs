import { existsSync, readFileSync, realpathSync } from "node:fs"
import { readdir, readFile, writeFile } from "node:fs/promises"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { parseArgs } from "node:util"
import { parse } from "@astrojs/compiler"
import { VOID_ELEMENTS } from "./html-tokens.mjs"
import { format, resolveConfig } from "prettier"
import ts from "typescript"
import { slotProp } from "../src/component-api/frameworks.ts"
import { reactPropsOf, resolveReactProp } from "./example-react-props.mjs"

const root = fileURLToPath(new URL("..", import.meta.url))
const componentsDir = join(root, "packages/opui/components")
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

const apiOf = async (folder, name) =>
  (await loadApis()).get(`${folder}/${name}`)

export const PORTS = {
  react: ".react.tsx",
  svelte: ".svelte",
  vue: ".vue",
}

export const TYPE_FILES = {
  react: "types.react.ts",
  svelte: "types.svelte.ts",
  vue: "types.vue-props.ts",
}

const REACT_ATTRIBUTE_NAMES = { class: "className", for: "htmlFor" }

const MARKUP = "__markup"

const unsupported = (file, what, hint) =>
  new Error(
    `${file} uses ${what}, which scripts/build-components.mjs can't compile: ${hint ?? "support the construct in scripts/build-components.mjs, or list the file in scripts/hand-written-components.json with the reason"}`,
  )

const sourceFileOf = (code, name = "frontmatter.ts") =>
  ts.createSourceFile(name, code, ts.ScriptTarget.Latest, true)

const printer = ts.createPrinter({ removeComments: false })

const unwrap = (node) => {
  while (ts.isParenthesizedExpression(node)) node = node.expression
  return node
}

const HELPER_MODULES = new Set(["../dev", "../id", "../style", "../tag"])

const CONTEXT_MODULE = /^(?:\.\.\/([^/]+)|\.)\/context\.astro$/

const SLOT_RENDER = /^Astro\.slots\.render\("([^"]+)"\)$/

const capitalize = (name) => `${name[0].toUpperCase()}${name.slice(1)}`

const containsKind = (node, test) =>
  test(node) ||
  ts.forEachChild(node, (child) => containsKind(child, test)) === true

const readFrontmatter = (code, file) => {
  const sourceFile = sourceFileOf(code)
  const result = {
    components: [],
    contexts: [],
    derived: [],
    helpers: [],
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
  return result
}

const attributeNode = (item, context) => {
  if (item.kind === "quoted") {
    return { kind: "static", name: item.name, value: item.value }
  }
  if (item.kind === "empty") return { kind: "boolean", name: item.name }
  if (item.kind === "spread") {
    const cast = /^(\w+) as [\s\S]+$/.exec(item.name.trim())
    return { code: cast ? cast[1] : item.name.trim(), kind: "spread" }
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

const isBlank = (node) => node.type === "text" && !node.value.trim()

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
    if (callback.parameters.length !== 1) {
      throw describe("map callback doesn't take one parameter")
    }
    const [parameter] = callback.parameters
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
    for (const element of keyed) element.keyed = true
    return [
      {
        children,
        consts,
        item: parameter.getText(sourceFile),
        list: expression.expression.expression.getText(sourceFile),
        optional: !!expression.expression.questionDotToken,
        type: "each",
      },
    ]
  }
  return nodesOf(expression, context)
}

const isBox = (node) => ["each", "element", "if", "slot"].includes(node.type)

const INLINE_ELEMENTS = new Set([
  "a",
  "abbr",
  "audio",
  "b",
  "bdi",
  "bdo",
  "br",
  "button",
  "cite",
  "code",
  "data",
  "dfn",
  "em",
  "i",
  "img",
  "input",
  "kbd",
  "label",
  "mark",
  "meter",
  "output",
  "progress",
  "q",
  "ruby",
  "s",
  "samp",
  "select",
  "small",
  "span",
  "strong",
  "sub",
  "sup",
  "svg",
  "textarea",
  "time",
  "u",
  "var",
  "video",
])

const boxesOnLines = (children) => {
  const boxes = children.filter(isBox)
  if (
    boxes.length === 0 ||
    !children.every((node) => isBox(node) || isBlank(node))
  ) {
    return children
  }
  const line = { type: "text", value: "\n" }
  return [line, ...boxes.flatMap((box) => [box, line])]
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

const blockChildren = (children) =>
  children.every(isBlank) ? [] : boxesOnLines(children)

const inlineChildren = (children) =>
  children.map((child, index) =>
    isBlank(child) &&
    child.value === "\n" &&
    index > 0 &&
    index < children.length - 1 &&
    !isBlank(children[index - 1]) &&
    !isBlank(children[index + 1])
      ? { ...child, inline: true }
      : child,
  )

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
                children: INLINE_ELEMENTS.has(optionalTag.tag)
                  ? inlineChildren(children)
                  : blockChildren(children),
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
      const htmlSlot =
        html && node.children.length === 0 && html.kind === "expression"
          ? slotOfHtml(html.value, context)
          : undefined
      if (html && !htmlSlot) {
        throw unsupported(context.file, `set:html={${html.value}}`)
      }
      const children = htmlSlot
        ? [htmlSlot]
        : node.type !== "component" && !INLINE_ELEMENTS.has(node.name)
          ? blockChildren(toTree(node.children, inner))
          : inlineChildren(toTree(node.children, inner))
      return [
        {
          attributes: node.attributes
            .filter((item) => item !== html)
            .map((item) => attributeNode(item, context)),
          children,
          component,
          custom: node.type === "custom-element",
          foreign: context.foreign === true,
          tag: node.name,
          type: "element",
          variable,
        },
      ]
    }
    throw unsupported(context.file, `a ${node.type} node`)
  })

const elementsIn = (nodes) =>
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

const spreads = (node, code) =>
  node.attributes.some((item) => item.kind === "spread" && item.code === code)

export const readComponent = async (source, file, api) => {
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
  const tree = toTree(
    body.filter((node) => !isScript(node)),
    context,
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
  const restElements = elementsIn(roots).filter((node) =>
    spreads(node, frontmatter.rest),
  )
  const multiRoot =
    !rootElements && roots.length > 1 && restElements.length === 1
  if (!rootElements && !multiRoot) {
    throw unsupported(file, "a template that isn't one element")
  }
  if (!multiRoot && restElements.length !== rootElements.length) {
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
  const component = {
    ...frontmatter,
    file,
    item: itemOf(frontmatter, roots, file.split("/").at(-2)),
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
  return {
    ...component,
    uid: allCodes(component).some((code) => /\bAstro\.locals\b/.test(code)),
  }
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
    const multiple = /\[\]/.test(declared.type)
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
  if (!part) return describe("which no part in api.ts is marked as")
  const compounds = part.selector
    .split(">")
    .map((compound) => compound.trim())
    .toReversed()
  const matches = elementsWithParents(tree).filter((entry) =>
    matchesSelector(entry, compounds),
  )
  if (matches.length === 0) {
    const children = elementsIn(tree).filter(
      (node) =>
        node.component &&
        apiIndex?.get(
          `${node.component.folder ?? folder}/${node.component.name}`,
        )?.model,
    )
    if (children.length !== 1) {
      return describe(`whose part ${part.selector} matches no element`)
    }
    const [element] = children
    if (!spreads(element, frontmatter.rest)) {
      return describe(`whose component doesn't spread ${frontmatter.rest}`)
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
    return describe(
      `whose part ${part.selector} matches ${matches.length} elements`,
    )
  }
  const element = matches[0].node
  if (element.item && declared.prop === "checked") {
    return {
      bindables,
      element,
      item: true,
      kind: "checked",
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
    return describe("which isn't a value, checked or radio model of a control")
  if (!spreads(element, frontmatter.rest)) {
    return describe(`whose element doesn't spread ${frontmatter.rest}`)
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
    const elsewhere = [
      ...codesIn(tree),
      ...frontmatter.derived.map(({ code }) => code),
      ...frontmatter.warnings,
    ].some((code) => identifiersIn(code).has(prop.local))
    if (elsewhere) {
      return describe(`whose prop ${prop.local} is read outside its element`)
    }
  }
  element.model = true
  return {
    bindables,
    element,
    kind,
    local: prop?.local,
    prop: declared.prop,
    type: declared.type,
  }
}

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

const rewriteExpression = (code, options) => {
  const sourceFile = sourceFileOf(`(${code})`, "expression.ts")
  const [statement] = transformed(sourceFile, options).statements
  const text = printer.printNode(
    ts.EmitHint.Expression,
    statement.expression,
    sourceFile,
  )
  return text.replace(/^\((.*)\)$/s, "$1")
}

const rewriteStatement = (code, options) => {
  const sourceFile = sourceFileOf(code, "statement.ts")
  return transformed(sourceFile, options)
    .statements.map((statement) =>
      printer.printNode(ts.EmitHint.Unspecified, statement, sourceFile),
    )
    .join("\n")
}

const identifiersIn = (code) => {
  const names = new Set()
  const visit = (node) => {
    if (
      ts.isIdentifier(node) &&
      !(
        ts.isPropertyAccessExpression(node.parent) && node.parent.name === node
      ) &&
      !(ts.isPropertyAssignment(node.parent) && node.parent.name === node)
    ) {
      names.add(node.text)
    }
    ts.forEachChild(node, visit)
  }
  visit(sourceFileOf(`(${code})`, "expression.ts"))
  return names
}

const slotsUsedIn = (code) =>
  [...code.matchAll(/Astro\.slots\.has\("([^"]+)"\)/g)].map((match) => match[1])

const codesIn = (nodes) =>
  nodes.flatMap((node) => {
    if (node.type === "expression") return [node.code]
    if (node.type === "each") {
      return [
        node.list,
        ...node.consts.map(({ code }) => code),
        ...codesIn(node.children),
      ]
    }
    if (node.type === "if") {
      return [
        node.test,
        ...codesIn(node.consequent),
        ...codesIn(node.alternate ?? []),
      ]
    }
    if (node.type === "slot") return codesIn(node.fallback)
    if (node.type === "element") {
      return [
        ...node.attributes.flatMap((item) =>
          item.kind === "expression" ||
          item.kind === "class" ||
          item.kind === "spread"
            ? [item.code]
            : [],
        ),
        ...codesIn(node.children),
      ]
    }
    return []
  })

const testsIn = (nodes) =>
  nodes.flatMap((node) =>
    node.type === "if"
      ? [
          node.test,
          ...testsIn(node.consequent),
          ...testsIn(node.alternate ?? []),
        ]
      : node.type === "element" || node.type === "each"
        ? testsIn(node.children)
        : node.type === "slot"
          ? testsIn(node.fallback)
          : [],
  )

const allCodes = (component) => [
  ...codesIn(component.tree),
  ...component.derived.map(({ code }) => code),
  ...component.warnings,
  ...(component.provide?.value.map(({ code }) => code) ?? []),
]

const scriptCodes = (component) => [
  ...component.derived.map(({ code }) => code),
  ...component.warnings,
  ...(component.provide?.value.map(({ code }) => code) ?? []),
]

const styleOption = (component, code) => {
  const style = component.props.find(({ prop }) => prop === "style")
  return style ? { code, local: style.local } : undefined
}

const objectCode = (entries) =>
  `{ ${entries.map(({ code, key }) => (code === key ? key : `${key}: ${code}`)).join(", ")} }`

const contextImports = (component, file, namesOf) =>
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

const withImport = (lines, module, name) => {
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

const groupWarning = (component, item, checked) =>
  `warnGroupedChecked(${JSON.stringify(component.name)}, ${item.grouped}, ${checked}${item.group === "ToggleGroup" ? "" : `, ${JSON.stringify(item.group)}`})`

const selectionImport = (component) =>
  component.file.split("/").at(-2) === "ToggleGroup"
    ? "./selection"
    : "../ToggleGroup/selection"

const scriptImports = (component) =>
  component.scripts.map((specifier) => `import ${JSON.stringify(specifier)}`)

const byName = (a, b) => a.localeCompare(b, "en")

const slotOrder = (slots) => [
  ...slots.filter((slot) => slot === "default"),
  ...slots.filter((slot) => slot !== "default").toSorted(byName),
]

const indent = (text, spaces) =>
  text
    .split("\n")
    .map((line) => (line ? " ".repeat(spaces) + line : line))
    .join("\n")

const componentImport = ({ folder, local, name }, extension) =>
  `import ${local} from "${folder ? `../${folder}` : "."}/${name}${extension}"`

const propKey = (prop) =>
  /^[A-Za-z_$][\w$]*$/.test(prop) ? prop : JSON.stringify(prop)

const propsImport = (propsType, file, extra = []) =>
  `import type { ${[propsType === "Props" ? "Props" : `${propsType} as Props`, ...extra].join(", ")} } from "./${file}"`

const toReact = (component) => {
  const {
    components,
    derived,
    imports,
    propsType,
    provide,
    reads,
    rest,
    scripts,
    slots,
    stringSlots,
    tree,
    trimmedSlots,
    uid,
    variableTags,
    warnings,
  } = component
  if (component.model?.everywhere) throw component.model.refusal
  const props = component.props.filter(
    ({ local }) =>
      !stringSlots.includes(local) &&
      !(component.model?.kind === "value" && local === component.model.local),
  )
  const tagProps = props.filter(({ local }) => variableTags.includes(local))
  const tagConsts = derived.filter(({ name }) => variableTags.includes(name))
  const guardedTags = new Set(
    testsIn(tree).filter((test) =>
      tagConsts.some(({ name }) => name === test.trim()),
    ),
  )
  const lowered = (name) => `${name[0].toLowerCase()}${name.slice(1)}`
  const rename = new Map([
    ...props
      .filter(({ prop }) => prop === "class")
      .map(({ local }) => [local, "className"]),
    ...tagConsts.map(({ name }) => [name, lowered(name)]),
    ...trimmedSlots.map(({ local, slot }) => [local, slotProp(slot)]),
  ])
  const options = {
    rename,
    slotHas: (name) => slotProp(name),
    style: styleOption(component, "style ?? {}"),
  }
  const entries = props.map((entry) => {
    if (entry.prop === "class") return { key: "className", text: "className" }
    if (tagProps.includes(entry)) return { key: entry.prop, text: entry.prop }
    const reactProp = REACT_ATTRIBUTE_NAMES[entry.prop] ?? entry.prop
    if (reactProp === entry.local) {
      return {
        key: entry.local,
        text: entry.default ? `${entry.local} = ${entry.default}` : entry.local,
      }
    }
    if (entry.local !== entry.prop) {
      return {
        key: entry.local,
        text: `${JSON.stringify(reactProp)}: ${entry.local}${entry.default ? ` = ${entry.default}` : ""}`,
      }
    }
    return {
      key: entry.prop,
      text: entry.default ? `${entry.prop} = ${entry.default}` : entry.prop,
    }
  })
  const slotEntries = slotOrder(slots).map((slot) => slotProp(slot))
  const { item, model, multiRoot } = component
  const group = model?.kind === "group" ? model : undefined
  const extraEntries = [
    ...(group ? ["defaultValue", "onValueChange"] : []),
    ...(item ? ["defaultChecked", "onChange"] : []),
  ]
    .filter((key) => !entries.some((entry) => entry.key === key))
    .map((key) => ({ key, text: key }))
  const destructured = [
    ...[...entries, ...extraEntries]
      .toSorted((a, b) => byName(a.key, b.key))
      .map(({ text }) => text),
    ...slotEntries,
    ...(rest ? [`...${rest}`] : []),
  ]
  const body = [
    ...reads.map(
      ({ context, name }) => `const ${name} = use${context.name}Context()`,
    ),
    ...(uid ? ["const uid = useId()"] : []),
    ...(group
      ? [
          "const [inner, setInner] = useState(defaultValue)",
          `const change = (input: HTMLInputElement) => {\n  const next = ${group.read}\n  if (inner !== undefined) setInner(next)\n  onValueChange?.(next${/\[\]/.test(group.type) ? " as never" : ""})\n}`,
        ]
      : []),
    ...tagProps.map(
      ({ local, prop, default: fallback }) =>
        `const ${local}: ElementType = ${fallback ? `${prop} || ${fallback}` : prop}`,
    ),
    ...derived.flatMap(({ code, name }) =>
      variableTags.includes(name)
        ? [
            `const ${lowered(name)} = ${rewriteExpression(code, options)}`,
            `const ${name}: ElementType${guardedTags.has(name) ? " | undefined" : ""} = ${lowered(name)}`,
          ]
        : [`const ${name} = ${rewriteExpression(code, options)}`],
    ),
    ...warnings.map((code) => rewriteStatement(code, options)),
    ...(item
      ? [
          groupWarning(
            component,
            item,
            `${item.checked ?? "undefined"} ?? defaultChecked`,
          ),
        ]
      : []),
    ...scripts.map(
      (specifier) =>
        `useEffect(() => {\n  void import(${JSON.stringify(specifier)})\n}, [])`,
    ),
  ]
  let usesCx = false
  const attribute = (node, item) => {
    if (item.kind === "class") {
      usesCx = true
      return `className={cx(${rewriteExpression(item.code, options)})}`
    }
    if (item.kind === "spread") {
      return node.variable && item.code === rest
        ? `{...(${item.code} as object)}`
        : `{...${rewriteExpression(item.code, options)}}`
    }
    const name = node.component
      ? item.name
      : (REACT_ATTRIBUTE_NAMES[item.name] ??
        (node.variable || node.custom
          ? item.name
          : (resolveReactProp(
              reactPropsOf(node.tag, false) ?? new Map(),
              item.name,
            ) ?? item.name)))
    if (item.kind === "static") return `${name}=${JSON.stringify(item.value)}`
    if (item.kind === "boolean") return name
    return `${name}={${rewriteExpression(item.code, options)}}`
  }
  const wrapFragment = (code, nodes) => {
    const significant = nodes.filter(
      (node) =>
        !isBlank(node) &&
        !(node.type === "slot" && stringSlots.includes(slotProp(node.name))),
    )
    const [only] = significant
    if (significant.length !== 1) return `<>${code}</>`
    if (only.type === "element") return code
    if (only.type === "if") return conditional(only)
    if (only.type === "slot" && only.fallback.length === 0) {
      return slotProp(only.name)
    }
    if (only.type === "expression") return rewriteExpression(only.code, options)
    return `<>${code}</>`
  }
  const conditional = (node) => {
    const test = rewriteExpression(node.test, options)
    const consequent = wrapFragment(emit(node.consequent), node.consequent)
    if (!node.alternate) return `(${test}) && (${consequent})`
    const alternate = wrapFragment(emit(node.alternate), node.alternate)
    return `${test} ? (${consequent}) : (${alternate})`
  }
  const emit = (nodes) =>
    nodes
      .map((node) => {
        if (node.type === "text") {
          return node.value === " " || node.inline ? '{" "}' : node.value
        }
        if (node.type === "expression") {
          return `{${rewriteExpression(node.code, options)}}`
        }
        if (node.type === "slot") {
          const name = slotProp(node.name)
          if (stringSlots.includes(name)) {
            return nodes.some(
              (sibling) =>
                sibling.type === "expression" && sibling.code.trim() === name,
            )
              ? ""
              : `{${name}}`
          }
          if (node.fallback.length === 0) return `{${name}}`
          return `{${name} === undefined ? (${wrapFragment(emit(node.fallback), node.fallback)}) : (${name})}`
        }
        if (node.type === "if") return `{${conditional(node)}}`
        if (node.type === "each") {
          const consts = node.consts.map(
            ({ code, name }) =>
              `const ${name} = ${rewriteExpression(code, options)}`,
          )
          const body = wrapFragment(emit(node.children), node.children)
          const returned = consts.length
            ? `{\n${consts.join("\n")}\nreturn (\n${body}\n)\n}`
            : `(\n${body}\n)`
          return `{${node.list}${node.optional ? "?" : ""}.map((${node.item}, index) => ${returned})}`
        }
        const attributes = [
          ...(node.keyed ? ["key={index}"] : []),
          ...node.attributes.flatMap((entry) => [
            attribute(node, entry),
            ...(node.item &&
            entry.kind === "expression" &&
            entry.name === "checked"
              ? [
                  `defaultChecked={${item.grouped} === undefined ? defaultChecked : undefined}`,
                ]
              : []),
          ]),
          ...(node.item
            ? [
                `onChange={(event) => {\n  ${item.parent}?.change?.(event.currentTarget)\n  onChange?.(event)\n}}`,
              ]
            : []),
        ].join(" ")
        const open = `<${node.tag}${attributes ? ` ${attributes}` : ""}`
        return node.children.length === 0
          ? `${open} />`
          : `${open}>${emit(node.children)}</${node.tag}>`
      })
      .join("")
  const [rootNode] = tree
  const rendered = rootNode.type === "if" ? conditional(rootNode) : emit(tree)
  const providedValue = group
    ? [
        { code: "change", key: "change" },
        ...provide.value.map((entry) =>
          entry.key === group.prop
            ? { code: `${group.prop} ?? inner`, key: entry.key }
            : entry,
        ),
      ]
    : provide?.value
  const returned = provide
    ? `<${provide.context.name}Context value={${rewriteExpression(objectCode(providedValue), options)}}>${rootNode.type === "if" ? `{${rendered}}` : rendered}</${provide.context.name}Context>`
    : multiRoot
      ? `<>${rendered}</>`
      : rendered
  const reactValues = [
    ...(scripts.length ? ["useEffect"] : []),
    ...(uid ? ["useId"] : []),
    ...(group ? ["useState"] : []),
  ]
  const usesElementType = tagProps.length > 0 || tagConsts.length > 0
  const reactImport = reactValues.length
    ? `import { ${[...(usesElementType ? ["type ElementType"] : []), ...reactValues].join(", ")} } from "react"`
    : usesElementType
      ? `import type { ElementType } from "react"`
      : undefined
  const importLines = [
    ...(reactImport ? [reactImport] : []),
    ...(usesCx ? [`import { cx } from "../cx"`] : []),
    ...components
      .map((entry) => componentImport(entry, ".react"))
      .toSorted(byName),
    ...contextImports(component, "react", {
      provide: (name) => `${name}Context`,
      read: (name) => `use${name}Context`,
    }),
    ...(group?.read.startsWith("selectionOf")
      ? [`import { selectionOf } from "${selectionImport(component)}"`]
      : []),
    ...(item ? withImport(imports, "../dev", "warnGroupedChecked") : imports),
    propsImport(propsType, "types.react"),
  ]
  const client = reads.length > 0 || provide || scripts.length > 0
  return `${client ? '"use client"\n\n' : ""}${importLines.join("\n")}\n\nexport default function ${component.name}({ ${destructured.join(", ")} }: Props) {\n${body.map((line) => `  ${line}\n`).join("")}${body.length ? "\n" : ""}  return (\n${indent(returned, 4)}\n  )\n}\n`
}

const toSvelte = (component) => {
  const {
    components,
    derived,
    element,
    imports,
    propsType,
    provide,
    reads,
    rest,
    slots,
    stringSlots,
    tree,
    trimmedSlots,
    uid,
    warnings,
  } = component
  const options = {
    rename: new Map(
      trimmedSlots.map(({ local, slot }) => [local, slotProp(slot)]),
    ),
    slotHas: (name) => slotProp(name),
  }
  const props = component.props.filter(
    ({ local }) => !stringSlots.includes(local),
  )
  if (component.model?.refusal) throw component.model.refusal
  const reserved = derived.find(({ name }) => name.startsWith("$"))
  if (reserved) {
    throw unsupported(
      component.file,
      `the const \`${reserved.name}\`, whose \`$\` prefix Svelte reserves`,
      "rename the const in the Astro file",
    )
  }
  const { model } = component
  const bindableProps =
    model?.kind === "value"
      ? [model.prop]
      : (model?.bindables.map(({ prop }) => prop) ?? [])
  const plainProps = [
    ...(model?.kind === "checked" && !model.item
      ? ["value"]
      : model?.kind === "radio"
        ? ["checked", "onchange", "value"]
        : []),
    ...(component.item ? ["onchange"] : []),
  ]
  const added = [...bindableProps, ...plainProps]
    .filter((prop) => !props.some((entry) => entry.prop === prop))
    .map((prop) => ({ local: prop, prop }))
  const entries = [...props, ...added]
    .toSorted((a, b) => byName(a.prop, b.prop))
    .map(({ default: fallback, local, prop }) =>
      bindableProps.includes(prop)
        ? `${prop} = $bindable(${fallback ?? ""})`
        : `${prop === local ? prop : `${propKey(prop)}: ${local}`}${fallback ? ` = ${fallback}` : ""}`,
    )
  const modelAttributes = !model
    ? []
    : model.kind === "value"
      ? [`bind:${model.prop}`]
      : model.kind === "checked"
        ? model.item
          ? []
          : ["bind:checked={getChecked, setChecked}", "{value}"]
        : model.kind === "radio"
          ? [
              "checked={(checked ?? group === (value ?? true)) || undefined}",
              "onchange={(event) => {\n  group = value ?? true\n  onchange?.(event)\n}}",
              "{value}",
            ]
          : model.bindables.map(({ prop }) => `bind:${prop}`)
  const slotEntries = slotOrder(slots).map((slot) => slotProp(slot))
  let usesElements = false
  let usesContent = false
  const attribute = (node, item) => {
    if (item.kind === "class") {
      return `class={${rewriteExpression(item.code, options)}}`
    }
    if (item.kind === "spread") {
      if (
        item.code === rest &&
        !node.variable &&
        !node.component &&
        !node.custom &&
        element &&
        node.tag !== element
      ) {
        usesElements = true
        return `{...${rest} as SvelteHTMLElements[${JSON.stringify(node.tag)}]}`
      }
      return `{...${rewriteExpression(item.code, options)}}`
    }
    if (item.kind === "static") {
      return `${item.name}=${JSON.stringify(item.value)}`
    }
    if (item.kind === "boolean") return item.name
    return `${item.name}={${rewriteExpression(item.code, options)}}`
  }
  const emit = (nodes) =>
    nodes
      .map((node) => {
        if (node.type === "text") {
          return node.value === " " ? '{" "}' : node.value
        }
        if (node.type === "expression") {
          const code = node.code.trim()
          if (stringSlots.includes(code)) {
            return nodes.some(
              (sibling) =>
                sibling.type === "slot" && slotProp(sibling.name) === code,
            )
              ? ""
              : ((usesContent = true), `{@render content(${code})}`)
          }
          return `{${rewriteExpression(node.code, options)}}`
        }
        if (node.type === "slot") {
          const name = slotProp(node.name)
          if (
            stringSlots.includes(name) ||
            component.stringTypedSlots.includes(name)
          ) {
            usesContent = true
            return `{@render content(${name})}`
          }
          if (node.fallback.length === 0) return `{@render ${name}?.()}`
          return `{#if ${name}}{@render ${name}()}{:else}${emit(node.fallback)}{/if}`
        }
        if (node.type === "if") {
          const test = rewriteExpression(node.test, options)
          const consequent = emit(node.consequent)
          if (!node.alternate) return `{#if ${test}}${consequent}{/if}`
          return `{#if ${test}}${consequent}{:else}${emit(node.alternate)}{/if}`
        }
        if (node.type === "each") {
          const consts = node.consts
            .map(
              ({ code, name }) =>
                `{@const ${name} = ${rewriteExpression(code, options)}}`,
            )
            .join("")
          return `{#each ${node.list}${node.optional ? " ?? []" : ""} as ${node.item}, index (index)}${consts}${emit(node.children)}{/each}`
        }
        const attributes = [
          ...node.attributes.map((item) => attribute(node, item)),
          ...(node.model ? modelAttributes : []),
          ...(node.item
            ? [
                `onchange={(event) => {\n${model?.item ? `  if (${component.item.grouped} === undefined) ${model.prop} = event.currentTarget.checked\n` : ""}  ${component.item.parent}?.change?.(event.currentTarget)\n  onchange?.(event)\n}}`,
              ]
            : []),
        ].join(" ")
        const tag = node.variable ? "svelte:element" : node.tag
        const open = `<${tag}${node.variable ? ` this={${node.tag}}` : ""}${attributes ? ` ${attributes}` : ""}`
        if (
          node.children.length === 0 &&
          (node.component ||
            node.variable ||
            node.foreign ||
            VOID_ELEMENTS.has(node.tag))
        ) {
          return `${open} />`
        }
        return `${open}>${emit(node.children)}</${tag}>`
      })
      .join("")
  const markup = emit(tree)
  const importLines = [
    ...scriptImports(component),
    ...(warnings.length || component.item
      ? [`import { untrack } from "svelte"`]
      : []),
    ...(usesContent ? [`import { content } from "../content.svelte"`] : []),
    ...(model?.kind === "group" && model.read.startsWith("selectionOf")
      ? [`import { selectionOf } from "${selectionImport(component)}"`]
      : []),
    ...(model?.kind === "checked" && !model.item
      ? [`import { toggleInGroup } from "../group"`]
      : []),
    ...components
      .map((entry) => componentImport(entry, ".svelte"))
      .toSorted(byName),
    ...contextImports(component, "svelte", {
      provide: (name) => `set${name}Context`,
      read: (name) => `get${name}Context`,
    }),
    ...(component.item
      ? withImport(imports, "../dev", "warnGroupedChecked")
      : imports),
    propsImport(propsType, "types.svelte"),
    ...(usesElements
      ? [`import type { SvelteHTMLElements } from "svelte/elements"`]
      : []),
  ]
  const destructured = [
    ...entries,
    ...(slotEntries.length ? ["", "// Snippets", ...slotEntries] : []),
    ...(rest ? [`...${rest}`] : []),
  ]
  const lines = destructured.map((line) =>
    line === "" ? "" : line.startsWith("//") ? `    ${line}` : `    ${line},`,
  )
  const script = [
    ...reads.map(
      ({ context, name }) => `const ${name} = get${context.name}Context()`,
    ),
    ...(uid ? ["const uid = $props.id()"] : []),
    ...(model?.kind === "checked" && !model.item
      ? [
          "const getChecked = () => (group ? group.includes(value) : !!checked)",
          "const setChecked = (isChecked: boolean) => {\n  if (group) group = toggleInGroup(group, value, isChecked)\n  else checked = isChecked\n}",
        ]
      : []),
    ...derived.map(({ code, fn, name }) =>
      fn
        ? `const ${name} = ${rewriteExpression(code, options)}`
        : `const ${name} = $derived(${rewriteExpression(code, options)})`,
    ),
    ...warnings.map((code) =>
      /^if\b/.test(code)
        ? `untrack(() => {\n${rewriteStatement(code, options)}\n})`
        : `untrack(() => ${rewriteExpression(code, options)})`,
    ),
    ...(component.item
      ? [
          `untrack(() => ${groupWarning(component, component.item, component.item.checked ?? "undefined")})`,
        ]
      : []),
    ...(provide
      ? [
          `set${provide.context.name}Context({\n${[
            ...(model?.kind === "group"
              ? [
                  `change(input) {\nif (${model.prop} !== undefined) ${model.prop} = ${model.read}\n},`,
                ]
              : []),
            ...provide.value.map(
              ({ code, key }) =>
                `get ${key}() {\nreturn ${rewriteExpression(code, options)}\n},`,
            ),
          ].join("\n")}\n})`,
        ]
      : []),
  ]
  return `<script lang="ts">\n${importLines.map((line) => `  ${line}`).join("\n")}\n\n  let {\n${lines.join("\n")}\n  }: Props = $props()\n${script.length ? `\n${script.map((line) => `  ${line}`).join("\n")}\n` : ""}</script>\n\n${markup}\n`
}

const vueSlot = (name) => (name.includes("-") ? `['${name}']` : `.${name}`)

const toVue = (component) => {
  const {
    components,
    derived,
    imports,
    props,
    propsType,
    provide,
    reads,
    rest,
    restOnRoot,
    rootElements,
    slots,
    tree,
    trimmedSlots,
    uid,
    variableTags,
    warnings,
  } = component
  const codes = allCodes(component)
  const used = new Set([
    ...codes.flatMap((code) => [...identifiersIn(code)]),
    ...variableTags,
  ])
  const usedInScript = new Set(
    scriptCodes(component).flatMap((code) => [...identifiersIn(code)]),
  )
  const attrsOnInner = !restOnRoot
  const { multiRoot } = component
  const computedAttrs = attrsOnInner && !multiRoot
  const attributeProps = props.filter(
    ({ local, prop }) => prop.includes("-") && used.has(local),
  )
  const restUsed =
    (!!rest &&
      codes.some((code) => code !== rest && identifiersIn(code).has(rest))) ||
    attributeProps.length > 0
  if (attrsOnInner && codes.some((code) => /\bmergeStyle\(/.test(code))) {
    throw unsupported(
      component.file,
      `mergeStyle with ${rest} on an inner element`,
    )
  }
  const classProp = props.find(({ prop }) => prop === "class")
  const classInScript = classProp && usedInScript.has(classProp.local)
  const rename = new Map([
    ...props.flatMap(({ local, prop }) =>
      prop === "class"
        ? [[local, "$props.class"]]
        : prop === "style"
          ? [[local, "$attrs.style"]]
          : prop.includes("-")
            ? [[local, `attrs['${prop}']`]]
            : [],
    ),
    ...(restUsed ? [[rest, "attrs"]] : []),
    ...trimmedSlots.map(({ local, slot }) => [local, `$slots${vueSlot(slot)}`]),
  ])
  const computedConsts = derived.filter(({ fn }) => !fn)
  const derivedNames = new Set(computedConsts.map(({ name }) => name))
  const scriptRename = new Map([
    ...rename,
    ...(classInScript ? [[classProp.local, classProp.local]] : []),
    ...(computedAttrs && restUsed ? [[rest, "attrs.value"]] : []),
    ...(computedAttrs
      ? attributeProps.map(({ local, prop }) => [
          local,
          `attrs.value['${prop}']`,
        ])
      : []),
    ...computedConsts.map(({ name }) => [name, `${name}.value`]),
    ...trimmedSlots.map(({ local, slot }) => [local, `slots${vueSlot(slot)}`]),
  ])
  const template = {
    quote: "'",
    rename,
    slotHas: (name) => `$slots${vueSlot(name)}`,
    style: styleOption(component, "{}"),
  }
  const script = {
    rename: scriptRename,
    slotHas: (name) => `slots${vueSlot(name)}`,
    style: styleOption(component, "{}"),
  }
  if (component.model?.refusal) throw component.model.refusal
  const { model } = component
  const explicitAttrs =
    (model?.kind === "checked" && !model.item) || model?.kind === "radio"
  const generic =
    model?.kind === "group" && model.read.startsWith("selectionOf")
  const { item } = component
  const forwarded = (component.baseProps ?? [])
    .filter(
      (key) =>
        key !== "class" &&
        key !== "style" &&
        key !== model?.prop &&
        !props.some((entry) => entry.prop === key),
    )
    .toSorted(byName)
  const declared = [
    ...(classInScript
      ? [{ prop: "class", text: `class: ${classProp.local}` }]
      : []),
    ...forwarded.map((key) => ({ prop: key, text: key })),
    ...(model?.kind === "value" && !model.local
      ? [{ prop: model.prop, text: model.prop }]
      : []),
    ...props
      .filter(
        ({ local, prop }) =>
          prop !== "class" &&
          prop !== "style" &&
          !prop.includes("-") &&
          !(model?.kind === "group" && prop === model.prop) &&
          (used.has(local) ||
            prop === model?.prop ||
            (generic && prop === "multiple")),
      )
      .map(({ default: fallback, local, prop }) => ({
        prop,
        text: `${local === prop ? prop : `${propKey(prop)}: ${local}`}${
          fallback
            ? ` = ${fallback}`
            : item && local === item.checked
              ? " = undefined"
              : ""
        }`,
      })),
  ]
    .toSorted((a, b) => byName(a.prop, b.prop))
    .map(({ text }) => text)
  const slotsInScript = scriptCodes(component).some(
    (code) =>
      slotsUsedIn(code).length > 0 ||
      trimmedSlots.some(({ local }) => identifiersIn(code).has(local)),
  )
  let usesTrimmedSlot = false
  const attribute = (node, item, scope) => {
    if (item.kind === "class") {
      return `:class="${rewriteExpression(item.code, scope)}"`
    }
    if (item.kind === "spread") {
      if (item.code === rest) {
        const bound = forwarded.map((key) => `:${key}="${key}"`)
        return [
          ...(rootElements.includes(node) && !explicitAttrs
            ? []
            : [`v-bind="attrs"`]),
          ...bound,
        ].join(" ")
      }
      return `v-bind="${rewriteExpression(item.code, scope)}"`
    }
    if (item.kind === "static") {
      return `${item.name}=${JSON.stringify(item.value)}`
    }
    if (item.kind === "boolean") return item.name
    return `:${item.name}="${rewriteExpression(item.code, scope)}"`
  }
  const directive = (nodes, name, test, scope) => {
    const significant = nodes.filter((node) => !isBlank(node))
    const clause = test === undefined ? name : `${name}="${test}"`
    if (significant.length === 1 && significant[0].type !== "if") {
      return emitOne(significant[0], clause, scope)
    }
    return `<template ${clause}>${emit(nodes, scope)}</template>`
  }
  const emitOne = (node, clause, scope) => {
    if (node.type === "text") {
      return node.value === " " || node.inline ? '{{ " " }}' : node.value
    }
    if (node.type === "expression") {
      const code = rewriteExpression(node.code, scope)
      return clause
        ? `<template ${clause}>{{ ${code} }}</template>`
        : `{{ ${code} }}`
    }
    if (node.type === "slot") {
      const slotClause = clause ? ` ${clause}` : ""
      if (node.trimmed) {
        usesTrimmedSlot = true
        return `<TrimmedSlot${slotClause} :nodes="$slots${vueSlot(node.name)}?.()" />`
      }
      const name = node.name === "default" ? "" : ` name="${node.name}"`
      return `<slot${slotClause}${name}>${emit(node.fallback, scope)}</slot>`
    }
    if (node.type === "if") {
      const test = rewriteExpression(node.test, scope)
      const consequent = directive(node.consequent, "v-if", test, scope)
      if (!node.alternate) return consequent
      return `${consequent}${directive(node.alternate, "v-else", undefined, scope)}`
    }
    if (node.type === "each") {
      const inner = {
        ...scope,
        rename: new Map([
          ...scope.rename,
          ...node.consts.map(({ code, name }) => [
            name,
            `(${rewriteExpression(code, scope)})`,
          ]),
        ]),
      }
      const root = node.children.find((child) => !isBlank(child))
      const loop = `v-for="(${node.item}, index) in ${rewriteExpression(node.list, scope)}" :key="index"`
      return root.type === "element"
        ? emitOne(root, loop, inner)
        : `<template ${loop}>${emitOne(root, undefined, inner)}</template>`
    }
    const spreads = node.attributes.filter(
      (item) =>
        item.kind === "spread" &&
        !(item.code === rest && rootElements.includes(node)),
    )
    const first = node.attributes.indexOf(spreads[0])
    const last = node.attributes.indexOf(spreads.at(-1))
    const merged = (item) => {
      const key = /^[A-Za-z_$][\w$]*$/.test(item.name ?? "")
        ? item.name
        : `'${item.name}'`
      if (item.kind === "spread") {
        return `...${item.code === rest ? "attrs" : rewriteExpression(item.code, scope)}`
      }
      if (item.kind === "static") {
        return `${key}: ${rewriteExpression(JSON.stringify(item.value), scope)}`
      }
      if (item.kind === "boolean") return `${key}: true`
      if (item.kind === "expression") {
        return `${key}: ${rewriteExpression(item.code, scope)}`
      }
      throw unsupported(
        component.file,
        `a class list between two spreads on <${node.tag}>`,
      )
    }
    const bound =
      spreads.length > 1
        ? [
            ...node.attributes.slice(0, first),
            {
              kind: "bound",
              text: `v-bind="{ ${node.attributes
                .slice(first, last + 1)
                .map(merged)
                .join(", ")} }"`,
            },
            ...node.attributes.slice(last + 1),
          ]
        : node.attributes
    const bindScope =
      node.item && model?.item && component.item.checked
        ? {
            ...scope,
            rename: new Map([
              ...scope.rename,
              [component.item.checked, `model ?? ${component.item.checked}`],
            ]),
          }
        : scope
    const attributes = [
      ...(clause ? [clause] : []),
      ...bound
        .map((item) =>
          item.kind === "bound" ? item.text : attribute(node, item, bindScope),
        )
        .filter(Boolean),
      ...(node.model
        ? model.kind === "forward"
          ? ['v-model="modelValue"']
          : model.kind === "radio"
            ? [':value="attrs.value"', 'v-model="model"']
            : ['v-model="model"']
        : []),
      ...(node.item ? ['@change="change"'] : []),
      ...((rootElements.includes(node) ||
        (multiRoot &&
          node.attributes.some(
            (entry) => entry.kind === "spread" && entry.code === rest,
          ))) &&
      !node.attributes.some((entry) => entry.kind === "class")
        ? [':class="$props.class"']
        : []),
    ].join(" ")
    const tag = node.variable || node.custom ? "component" : node.tag
    const is = node.variable
      ? ` :is="${scope.rename.get(node.tag) ?? node.tag}"`
      : node.custom
        ? ` is="${node.tag}"`
        : ""
    const open = `<${tag}${is}${attributes ? ` ${attributes}` : ""}`
    if (
      node.children.length === 0 &&
      (node.component ||
        node.variable ||
        node.foreign ||
        VOID_ELEMENTS.has(node.tag))
    ) {
      return `${open} />`
    }
    return `${open}>${emit(node.children, scope)}</${tag}>`
  }
  const emit = (nodes, scope) =>
    nodes.map((node) => emitOne(node, undefined, scope)).join("")
  const markup = emit(tree, template)
  const slotsType =
    propsType !== "Props" && slots.some((slot) => slot !== "default")
      ? `${component.name}Slots`
      : "Slots"
  const provided = provide
    ? [
        ...(model?.kind === "group" ? ["change"] : []),
        ...provide.value.map(({ code, key }) =>
          model?.kind === "group" && key === model.prop
            ? `${key}: model`
            : derivedNames.has(code)
              ? code === key
                ? key
                : `${key}: ${code}`
              : `${key}: computed(() => ${rewriteExpression(code, script)})`,
        ),
      ]
    : undefined
  const vueImports = [
    ...(computedConsts.length ||
    (model && model.kind !== "forward" && !model.item) ||
    provided?.some((entry) => entry.includes("computed("))
      ? ["computed"]
      : []),
    ...(reads.length ? ["inject"] : []),
    ...(provide ? ["provide", "reactive"] : []),
    ...(explicitAttrs
      ? ["type IntrinsicElementAttributes", "useAttrs"]
      : multiRoot || (restUsed && !attrsOnInner)
        ? ["type HTMLAttributes", "useAttrs"]
        : []),
    ...(item ? ["watchEffect"] : []),
    ...(uid ? ["useId"] : []),
  ].toSorted((a, b) => byName(a.replace(/^type /, ""), b.replace(/^type /, "")))
  const importLines = [
    ...scriptImports(component),
    ...(vueImports.length
      ? [`import { ${vueImports.join(", ")} } from "vue"`]
      : []),
    ...(computedAttrs ? [`import { useInputAttrs } from "../vue"`] : []),
    ...(model?.kind === "group" && model.read.startsWith("selectionOf")
      ? [`import { selectionOf } from "${selectionImport(component)}"`]
      : []),
    ...(usesTrimmedSlot
      ? [`import { TrimmedSlot } from "../whitespace.vue"`]
      : []),
    ...components
      .map((entry) => componentImport(entry, ".vue"))
      .toSorted(byName),
    ...contextImports(component, "vue", {
      provide: (name) => `${name}Key`,
      read: (name) => `${name}Key`,
    }),
    ...(item ? withImport(imports, "../dev", "warnGroupedChecked") : imports),
    propsImport(propsType, "types.vue-props", slots.length ? [slotsType] : []),
  ]
  const vueProps = generic ? "Props & { multiple?: Multiple }" : "Props"
  const modelType = generic
    ? `type Model = Multiple extends true ? ${model.type
        .split("|")
        .map((member) => member.trim())
        .filter((member) => member.endsWith("[]"))
        .join(" | ")} : ${model.type
        .split("|")
        .map((member) => member.trim())
        .filter((member) => !member.endsWith("[]"))
        .join(" | ")}`
    : undefined
  const propsLine = `${modelType ? `${modelType}\n\n` : ""}${
    declared.length
      ? `const { ${declared.join(", ")} } = defineProps<${vueProps}>()`
      : `defineProps<${vueProps}>()`
  }`
  const slotsLine = slotsInScript
    ? `const slots = defineSlots<${slotsType}>()`
    : `defineSlots<${slotsType}>()`
  const setup = [
    importLines.join("\n"),
    slots.length ? `${propsLine}\n${slotsLine}` : propsLine,
    ...(attrsOnInner || explicitAttrs
      ? ["defineOptions({\n  inheritAttrs: false,\n})"]
      : []),
    ...(computedAttrs
      ? ["const attrs = useInputAttrs()"]
      : multiRoot
        ? ["const attrs = useAttrs() as HTMLAttributes"]
        : explicitAttrs
          ? [
              `const attrs = useAttrs() as IntrinsicElementAttributes[${JSON.stringify(model.element.tag)}]`,
            ]
          : restUsed
            ? ["const attrs = useAttrs() as HTMLAttributes"]
            : []),
    ...(model?.kind === "value"
      ? [
          `const modelValue = defineModel<${model.type}>()`,
          `const model = computed({\n  get: () => modelValue.value ?? ${model.local ?? model.prop},\n  set: (value) => {\n    modelValue.value = value\n  },\n})`,
        ]
      : model?.kind === "checked" && model.item
        ? [
            `const model = defineModel<${model.type} | undefined>({\n  default: undefined,\n})`,
          ]
        : model?.kind === "checked"
          ? [
              `const modelValue = defineModel<${model.type} | undefined>({\n  default: undefined,\n})`,
              "const model = computed({\n  get: () =>\n    modelValue.value ??\n    (attrs.checked !== undefined && attrs.checked !== false),\n  set: (value) => {\n    modelValue.value = value\n  },\n})",
            ]
          : model?.kind === "radio"
            ? [
                `const modelValue = defineModel<${model.type} | undefined>({\n  default: undefined,\n})`,
                "const unchecked = Symbol()",
                `const model = computed({\n  get: () =>\n    modelValue.value ??\n    (attrs.checked !== undefined && attrs.checked !== false\n      ? attrs.value\n      : unchecked),\n  set: (value: ${model.type} | undefined) => {\n    modelValue.value = value\n  },\n})`,
              ]
            : model?.kind === "forward"
              ? [
                  `const modelValue = defineModel<${model.type} | undefined>({\n  default: undefined,\n})`,
                ]
              : model?.kind === "group"
                ? [
                    `const model = defineModel<${generic ? "Model" : model.type}>()`,
                    `const change = (input: HTMLInputElement) => {\n  if (model.value !== undefined) model.value = ${model.read}${generic ? " as Model" : ""}\n}`,
                  ]
                : []),
    ...reads.map(
      ({ context, name }) =>
        `const ${name} = inject(${context.name}Key, undefined)`,
    ),
    ...(uid ? ["const uid = useId()"] : []),
    ...derived.map(({ code, fn, name }) =>
      fn
        ? `const ${name} = ${rewriteExpression(code, script)}`
        : `const ${name} = computed(() => ${rewriteExpression(code, script)})`,
    ),
    ...warnings.map((code) => rewriteStatement(code, script)),
    ...(item
      ? [
          `watchEffect(() =>\n  ${groupWarning(component, item, model?.item && item.checked ? `${item.checked} ?? model.value` : (item.checked ?? "undefined")).replace(`, ${item.grouped},`, `, ${item.grouped}.value,`)},\n)`,
          model?.item
            ? `const change = (event: Event) => {\n  const input = event.currentTarget as HTMLInputElement\n  if (${item.grouped}.value === undefined) model.value = input.checked\n  ${item.parent}?.change?.(input)\n}`
            : `const change = (event: Event) =>\n  ${item.parent}?.change?.(event.currentTarget as HTMLInputElement)`,
        ]
      : []),
    ...(provide
      ? [
          `provide(${provide.context.name}Key, reactive({ ${provided.join(", ")} }))`,
        ]
      : []),
  ]
  return `<script setup lang="ts"${generic ? ' generic="Multiple extends boolean = false"' : ""}>\n${setup.join("\n\n")}\n</script>\n\n<template>\n${indent(markup, 2)}\n</template>\n`
}

const HTML_ATTRIBUTES = /HTMLAttributes<("[^"]+")>/g

const typeAliases = (code) =>
  sourceFileOf(code, "types.ts")
    .statements.filter(ts.isTypeAliasDeclaration)
    .map((statement) => ({
      name: statement.name.text,
      text: statement.getText(),
      typeParameters: statement.typeParameters?.length ?? 0,
    }))

const objectKeys = (node) =>
  ts.isTypeLiteralNode(node)
    ? node.members.map((member) => member.name.getText())
    : ts.isIntersectionTypeNode(node)
      ? node.types.flatMap(objectKeys)
      : ts.isParenthesizedTypeNode(node)
        ? objectKeys(node.type)
        : []

const isUnion = (node) =>
  ts.isUnionTypeNode(node) ||
  (ts.isParenthesizedTypeNode(node) && isUnion(node.type)) ||
  (ts.isIntersectionTypeNode(node) && node.types.some(isUnion))

const typeKeys = (node, aliases) =>
  ts.isIntersectionTypeNode(node)
    ? node.types.flatMap((type) => typeKeys(type, aliases))
    : ts.isUnionTypeNode(node)
      ? node.types
          .map((type) => typeKeys(type, aliases))
          .reduce((shared, keys) => shared.filter((key) => keys.includes(key)))
      : ts.isParenthesizedTypeNode(node)
        ? typeKeys(node.type, aliases)
        : ts.isTypeReferenceNode(node) &&
            aliases.some((alias) => alias.name.text === node.typeName.getText())
          ? typeKeys(
              aliases.find(
                (alias) => alias.name.text === node.typeName.getText(),
              ).type,
              aliases,
            )
          : objectKeys(node)

const slotMembers = (node, parameter) =>
  ts.isTypeLiteralNode(node)
    ? node.members
        .filter(
          (member) =>
            ts.isPropertySignature(member) &&
            member.type &&
            new RegExp(`\\b${parameter}\\b`).test(member.type.getText()),
        )
        .map((member) => ({
          name: member.name.getText(),
          text: member.type.getText(),
        }))
    : ts.isUnionTypeNode(node) ||
        ts.isIntersectionTypeNode(node) ||
        ts.isParenthesizedTypeNode(node)
      ? [
          ...new Map(
            (node.types ?? [node.type])
              .flatMap((type) => slotMembers(type, parameter))
              .map((member) => [member.name, member]),
          ).values(),
        ]
      : []

export const toTypes = (
  folder,
  { astro, base },
  slotsByComponent,
  propsByComponent = {},
  rootsByComponent = {},
  modelsByComponent = {},
) => {
  const file = `packages/opui/components/${folder}/types.astro.ts`
  if (!astro.includes('import type * as Base from "./types"')) {
    throw unsupported(file, "a types.astro.ts without the Base import")
  }
  const baseFile = sourceFileOf(base, "types.ts")
  const baseAliases = baseFile.statements.filter(ts.isTypeAliasDeclaration)
  const slotTypes = new Map(
    baseAliases
      .filter(({ name }) => name.text.endsWith("Slots"))
      .map((alias) => [alias.name.text, alias]),
  )
  const slotsTypeOf = (name) =>
    name === "Props" ? "Slots" : name.replace(/Props$/, "Slots")
  const componentOf = (name) =>
    name === "Props" ? folder : name.replace(/Props$/, "")
  const aliases = typeAliases(astro)
  for (const alias of aliases) {
    if (!/^export type \w+ =[\s\S]*HTMLAttributes</.test(alias.text)) {
      throw unsupported(file, `the type ${alias.name}`)
    }
  }
  const propsAliases = aliases.filter(({ name }) => name.endsWith("Props"))
  const slotted = propsAliases.filter(({ name }) =>
    slotTypes.has(slotsTypeOf(name)),
  )
  const slotKeysOf = (slotsAlias) =>
    slotMembers(
      slotsAlias.type,
      slotsAlias.typeParameters?.[0]?.name.text ?? "S",
    )
  for (const { name } of slotted) {
    const slotsAlias = slotTypes.get(slotsTypeOf(name))
    const propsAlias = baseAliases.find((alias) => alias.name.text === name)
    const slotKeys = slotKeysOf(slotsAlias).map((member) => member.name)
    if (slotKeys.length === 0) {
      throw unsupported(
        file,
        `the type ${slotsTypeOf(name)}, which names no slot`,
      )
    }
    const overlap = slotKeysOf(slotsAlias)
      .filter((member) => !/\bstring\b/.test(member.text))
      .map((member) => member.name)
      .filter((key) =>
        (propsAlias ? typeKeys(propsAlias.type, baseAliases) : []).includes(
          key,
        ),
      )
    if (overlap.length > 0) {
      throw unsupported(
        file,
        `a prop and a slot both named ${overlap.join(", ")}`,
      )
    }
    const astroSlots = slotsByComponent[componentOf(name)] ?? []
    const pureSlots = slotKeysOf(slotsAlias)
      .filter((member) => !/\bstring\b/.test(member.text))
      .map((member) => member.name)
      .filter((key) => !astroSlots.some((slot) => slotProp(slot) === key))
    if (pureSlots.some((key) => /[A-Z]/.test(key))) {
      throw unsupported(
        file,
        `the slot ${pureSlots.find((key) => /[A-Z]/.test(key))}, whose Vue name is kebab-case`,
      )
    }
  }
  const withSlots = (text, name, member) =>
    slotTypes.has(slotsTypeOf(name))
      ? text.replaceAll(
          new RegExp(`(Base\\.${name}|Without<Base\\.${name}, [^>]+>) &`, "g"),
          `$1 & Base.${slotsTypeOf(name)}<${member}> &`,
        )
      : text
  const customRoot = (name) => {
    const roots = rootsByComponent[componentOf(name)] ?? []
    return roots.length === 1 && roots[0].includes("-") ? roots[0] : undefined
  }
  const stringSlotKeys = (name) =>
    slotTypes.has(slotsTypeOf(name))
      ? slotKeysOf(slotTypes.get(slotsTypeOf(name)))
          .filter((member) => /\bstring\b/.test(member.text))
          .map((member) => member.name)
          .toSorted(byName)
      : []
  const withoutChildren = (text) =>
    text
      .replace(
        /Omit<\s*HTMLAttributes<("[^"]+")>\s*,\s*((?:"[^"]+"\s*\|?\s*)+)>/g,
        (_, element, keys) =>
          `Omit<HTMLAttributes<${element}>, ${[...keys.matchAll(/"[^"]+"/g)]
            .map(([key]) => key)
            .concat('"children"')
            .toSorted()
            .join(" | ")}>`,
      )
      .replace(
        /HTMLAttributes<("[^"]+")>(?!\s*,)/g,
        'Omit<HTMLAttributes<$1>, "children">',
      )
  const elementTyped = propsAliases.reduce((text, alias) => {
    const tag = customRoot(alias.name)
    const slots = slotsByComponent[componentOf(alias.name)]
    const strings = stringSlotKeys(alias.name)
    let adjusted = tag
      ? alias.text.replace(HTML_ATTRIBUTES, `HTMLAttributes<"${tag}">`)
      : alias.text
    if (slots && !slots.includes("default"))
      adjusted = withoutChildren(adjusted)
    if (strings.length > 0) {
      adjusted = adjusted.replaceAll(
        `Base.${alias.name} &`,
        `Without<Base.${alias.name}, ${strings.map((key) => JSON.stringify(key)).join(" | ")}> &`,
      )
    }
    return text.replace(alias.text, adjusted)
  }, astro)
  const svelteTyped = propsAliases.reduce((text, alias) => {
    const model = modelsByComponent[componentOf(alias.name)]
    if (!model || model.kind === "value") return text
    const baseAlias = baseAliases.find(
      (entry) => entry.name.text === alias.name,
    )
    const known = baseAlias ? typeKeys(baseAlias.type, baseAliases) : []
    const current = [...text.matchAll(/export type \w+ =[^]*?(?=\n\n|\n?$)/g)]
      .map(([match]) => match)
      .find((match) => match.startsWith(`export type ${alias.name} =`))
    const extras = model.bindables
      .filter(
        ({ prop }) =>
          !known.includes(prop) &&
          !(current && new RegExp(`\\b${prop}\\??:`).test(current)),
      )
      .toSorted((a, b) => byName(a.prop, b.prop))
    if (extras.length === 0) return text
    return current
      ? text.replace(
          current,
          `${current} & { ${extras.map(({ prop, type }) => `${prop}?: ${type}`).join("; ")} }`,
        )
      : text
  }, elementTyped)
  const reactTyped = propsAliases.reduce((text, alias) => {
    const model = modelsByComponent[componentOf(alias.name)]
    if (model?.kind !== "group") return text
    const current = [...text.matchAll(/export type \w+ =[^]*?(?=\n\n|\n?$)/g)]
      .map(([match]) => match)
      .find((match) => match.startsWith(`export type ${alias.name} =`))
    if (!current) return text
    const declaresProp = new RegExp(`\\b${model.prop}\\??:`).test(current)
    const literals = []
    const visit = (node) => {
      if (ts.isTypeLiteralNode(node)) {
        const member = node.members.find(
          (entry) =>
            ts.isPropertySignature(entry) &&
            entry.type &&
            entry.name.getText() === model.prop,
        )
        if (member) {
          literals.push({
            end: node.end,
            members: node.members
              .filter((entry) => entry !== member)
              .map((entry) => entry.getText().replace(/[;,]$/, "")),
            start: node.getStart(),
            type: member.type.getText(),
          })
        }
      }
      ts.forEachChild(node, visit)
    }
    visit(sourceFileOf(current, "types.astro.ts"))
    const tied = literals.length
      ? literals
          .toReversed()
          .reduce(
            (text, { end, members, start, type }) =>
              `${text.slice(0, start)}{ ${[
                ...members,
                `defaultValue?: ${type}`,
                `onValueChange?: (value: ${type}) => void`,
                `${model.prop}?: ${type}`,
              ]
                .toSorted(byName)
                .join("; ")} }${text.slice(end)}`,
            current,
          )
      : current.replace(
          `Base.${alias.name} &`,
          `Base.${alias.name} & { defaultValue?: ${model.type}; onValueChange?: (value: ${model.type}) => void${declaresProp ? "" : `; ${model.prop}?: ${model.type}`} } &`,
        )
    const typed = tied
      .replace(
        /Omit<\s*HTMLAttributes<("[^"]+")>\s*,\s*((?:"[^"]+"\s*\|?\s*)+)>/g,
        (_, element, keys) =>
          `Omit<HTMLAttributes<${element}>, ${[...keys.matchAll(/"[^"]+"/g)]
            .map(([key]) => key)
            .concat('"defaultValue"')
            .toSorted()
            .join(" | ")}>`,
      )
      .replace(
        /HTMLAttributes<("[^"]+")>(?!\s*,)/g,
        'Omit<HTMLAttributes<$1>, "defaultValue">',
      )
    return text.replace(current, typed)
  }, elementTyped)
  const usesWithout = elementTyped.includes("Without<")
  const withoutHelper = usesWithout
    ? "\n\ntype Without<T, K extends PropertyKey> = T extends unknown\n  ? Omit<T, K>\n  : never"
    : ""
  const asValues = (text) =>
    [...text.matchAll(/\bas\??: ("[^"]+")/g)]
      .map((match) => match[1])
      .toSorted()
  const react = aliases
    .reduce(
      (text, { name }) => withSlots(text, name, "ReactNode"),
      reactTyped.replace(
        'import type { HTMLAttributes } from "astro/types"',
        `import type { ComponentProps${slotted.length ? ", ReactNode" : ""} } from "react"${withoutHelper}`,
      ),
    )
    .replace(HTML_ATTRIBUTES, "ComponentProps<$1>")
  const svelte = aliases
    .reduce(
      (text, { name }) => withSlots(text, name, "Snippet"),
      svelteTyped.replace(
        'import type { HTMLAttributes } from "astro/types"',
        `import type { SvelteHTMLElements } from "svelte/elements"${slotted.length ? '\nimport type { Snippet } from "svelte"' : ""}${withoutHelper}`,
      ),
    )
    .replace(HTML_ATTRIBUTES, "SvelteHTMLElements[$1]")
  const based = aliases
    .filter(({ name, text }) => text.includes(`Base.${name}`))
    .map(({ name }) => name)
    .toSorted(byName)
  for (const [component, slots] of Object.entries(slotsByComponent)) {
    const named = slots.filter((slot) => slot !== "default")
    const alias = aliases.find(
      ({ name }) =>
        name === (component === folder ? "Props" : `${component}Props`),
    )
    const covered =
      alias && slotTypes.has(slotsTypeOf(alias.name))
        ? slotKeysOf(slotTypes.get(slotsTypeOf(alias.name))).map(
            (member) => member.name,
          )
        : []
    const uncovered = named.filter(
      (slot) => !covered.includes(slot) && !covered.includes(slotProp(slot)),
    )
    if (uncovered.length > 0) {
      throw unsupported(
        file,
        `the slot ${uncovered[0]} of ${component}, which types.ts has no Slots type for`,
      )
    }
  }
  let usesSlot = false
  const vueSlotTypes = slotted.map(({ name }) => {
    const slotsName = slotsTypeOf(name)
    const component = componentOf(name)
    const hasDefault = (slotsByComponent[component] ?? ["default"]).includes(
      "default",
    )
    const slotNames = slotsByComponent[component] ?? []
    const named = slotKeysOf(slotTypes.get(slotsName))
      .map((member) => member.name)
      .filter((key) => key !== "children")
      .map((key) => slotNames.find((slot) => slotProp(slot) === key) ?? key)
      .toSorted(byName)
    if (named.length > 0) usesSlot = true
    const literal = named.length
      ? `{ ${named.map((key) => `${propKey(key)}?: Slot`).join("; ")} }`
      : ""
    return `export type ${slotsName} = ${[literal, ...(hasDefault ? ["DefaultSlots"] : [])].filter(Boolean).join(" & ")}`
  })
  const imported = based
    .map((name) => `${name} as Base${name}`)
    .toSorted(byName)
  const vueMembers = (alias) => {
    const model = modelsByComponent[componentOf(alias.name)]
    const modelOnly = (node) =>
      model?.kind === "group" &&
      ts.isTypeLiteralNode(node) &&
      node.members.length > 0 &&
      node.members.every((member) => member.name.getText() === model.prop)
    const node = sourceFileOf(alias.text, "types.astro.ts").statements[0].type
    const parts = ts.isIntersectionTypeNode(node) ? node.types : [node]
    const kept = []
    let hasClass = false
    for (const part of parts) {
      const text = part.getText()
      if (new RegExp(HTML_ATTRIBUTES.source).test(text)) {
        hasClass = true
        continue
      }
      if (
        modelOnly(part) ||
        (ts.isTypeReferenceNode(part) &&
          part.typeArguments?.length > 0 &&
          part.typeArguments.every(modelOnly))
      ) {
        continue
      }
      if (ts.isTypeLiteralNode(part)) {
        if (part.members.every((member) => member.name.getText() === "as")) {
          continue
        }
        kept.push(text)
        continue
      }
      if (/^(?:Omit<)?Base\.\w+/.test(text)) {
        kept.push(text.replace(/Base\.(\w+)/g, "Base$1"))
        continue
      }
      throw unsupported(
        file,
        `the type ${alias.name}, whose part ${text} has no Vue form`,
      )
    }
    return { hasClass, kept }
  }
  const extrasOf = ({ name, text }) => {
    const component = componentOf(name)
    const baseAlias = baseAliases.find((alias) => alias.name.text === name)
    const known = baseAlias ? typeKeys(baseAlias.type, baseAliases) : []
    const modelled = modelsByComponent[component]
    const extras = (propsByComponent[component] ?? [])
      .filter(
        (prop) =>
          prop !== "as" &&
          !known.includes(prop) &&
          !(modelled?.kind === "group" && prop === modelled.prop),
      )
      .toSorted(byName)
    const elements = [...text.matchAll(HTML_ATTRIBUTES)].map(([, element]) =>
      JSON.parse(element),
    )
    if (
      extras.some((prop) => prop !== modelled?.prop) &&
      elements.length !== 1
    ) {
      throw unsupported(
        file,
        `the prop ${extras[0]} of ${component}, which the Vue types can't take from ${elements.length} elements`,
      )
    }
    return extras.map((prop) =>
      modelled?.prop === prop
        ? `${propKey(prop)}?: ${modelled.type}`
        : `${propKey(prop)}?: IntrinsicElementAttributes[${JSON.stringify(elements[0])}][${JSON.stringify(prop)}]`,
    )
  }
  const extrasByAlias = new Map(
    propsAliases.map((alias) => [alias.name, extrasOf(alias)]),
  )
  const vueAliases = aliases
    .toSorted((a, b) => byName(a.name, b.name))
    .map((alias) => {
      const { name, text } = alias
      if (!name.endsWith("Props")) {
        return `export type ${name} = ${text
          .replace(/^export type \w+ =\s*/, "")
          .replace(/Base\.(\w+)/g, "Base$1")
          .replace(HTML_ATTRIBUTES, "IntrinsicElementAttributes[$1]")}`
      }
      const values = asValues(text)
      const members = [
        ...(values.length ? [`as?: ${values.join(" | ")}`] : []),
        ...extrasByAlias.get(name),
      ]
      const { kept } = isUnion(
        sourceFileOf(text, "types.astro.ts").statements[0].type,
      )
        ? { kept: based.includes(name) ? [`Base${name}`] : [] }
        : vueMembers(alias)
      return `export type ${name} = ${[...kept, "Class", ...(members.length ? [`{ ${members.join("; ")} }`] : [])].join(" & ")}`
    })
  const vueTypeImports = [
    ...([...extrasByAlias.values()].some((extras) => extras.length > 0) ||
    vueAliases.some((alias) => alias.includes("IntrinsicElementAttributes["))
      ? ["IntrinsicElementAttributes"]
      : []),
    ...(usesSlot ? ["Slot"] : []),
  ]
  const vueBody = [
    ...vueAliases,
    ...(slotTypes.has("Slots") ? [] : ["export type Slots = DefaultSlots"]),
    ...vueSlotTypes,
  ]
  const vue = [
    [
      ...(vueTypeImports.length
        ? [`import type { ${vueTypeImports.join(", ")} } from "vue"`]
        : []),
      `import type { Class${vueBody.some((line) => line.includes("DefaultSlots")) ? ", DefaultSlots" : ""} } from "../vue"`,
      `import type {\n${imported.map((entry) => `  ${entry},`).join("\n")}\n} from "./types"`,
    ].join("\n"),
    ...vueBody,
  ].join("\n\n")
  return { react, svelte, vue: `${vue}\n` }
}

const prettierFormat = async (code, file) => {
  const options = await resolveConfig(file)
  const formatted = await format(code, { ...options, filepath: file })
  if ((await format(formatted, { ...options, filepath: file })) !== formatted) {
    throw new Error(
      `${file}: Prettier doesn't format the generated code stably`,
    )
  }
  return formatted
}

const astroTypesOf = (file) => {
  const path = join(root, dirname(file), "types.astro.ts")
  return existsSync(path) ? readFileSync(path, "utf8") : undefined
}

const baseTypesOf = (file) => {
  const path = join(root, dirname(file), "types.ts")
  return existsSync(path) ? readFileSync(path, "utf8") : undefined
}

const basePropsOf = (base, name, folder) => {
  if (!base) return []
  const aliases = sourceFileOf(base, "types.ts").statements.filter(
    ts.isTypeAliasDeclaration,
  )
  const alias = aliases.find(
    (statement) =>
      statement.name.text === (name === folder ? "Props" : `${name}Props`),
  )
  return alias ? typeKeys(alias.type, aliases) : []
}

const stringTypedSlots = (base, name, folder, slots) => {
  if (!base) return []
  const alias = sourceFileOf(base, "types.ts")
    .statements.filter(ts.isTypeAliasDeclaration)
    .find(
      (statement) =>
        statement.name.text === (name === folder ? "Slots" : `${name}Slots`),
    )
  if (!alias) return []
  return slotMembers(alias.type, alias.typeParameters?.[0]?.name.text ?? "S")
    .filter((member) => /\bstring\b/.test(member.text))
    .map((member) => member.name)
    .filter((key) => slots.some((slot) => slotProp(slot) === key))
}

const propsElement = (types, propsType) => {
  if (!types) return undefined
  const alias = typeAliases(types).find(({ name }) => name === propsType)
  const elements = [...(alias?.text.matchAll(HTML_ATTRIBUTES) ?? [])].map(
    ([, element]) => JSON.parse(element),
  )
  return elements.length === 1 ? elements[0] : undefined
}

export const compileComponent = async (source, file, options = {}) => {
  const { api, base = baseTypesOf(file), types = astroTypesOf(file) } = options
  const name = file
    .split("/")
    .at(-1)
    .replace(/\.astro$/, "")
  const folder = file.split("/").at(-2)
  const component = await readComponent(
    source,
    file,
    api === undefined && folder !== "Sample" ? await apiOf(folder, name) : api,
  )
  const named = {
    ...component,
    element: propsElement(types, component.propsType),
    folder,
    name,
    baseProps: basePropsOf(base, name, folder),
    stringTypedSlots: stringTypedSlots(base, name, folder, component.slots),
  }
  const outputs = new Map()
  const refused = new Map()
  for (const [framework, extension] of Object.entries(PORTS)) {
    const target = `packages/opui/components/${folder}/${name}${extension}`
    try {
      const code = { react: toReact, svelte: toSvelte, vue: toVue }[framework](
        named,
      )
      outputs.set(target, await prettierFormat(code, target))
    } catch (error) {
      refused.set(target, error)
    }
  }
  if (refused.size === Object.keys(PORTS).length) throw [...refused.values()][0]
  return { component: named, outputs, refused }
}

const handWrittenFile = join(root, "scripts/hand-written-components.json")

export const readHandWritten = () =>
  existsSync(handWrittenFile)
    ? JSON.parse(readFileSync(handWrittenFile, "utf8"))
    : {}

export const handWrittenProblems = (handWritten, exists) => {
  const files = Object.keys(handWritten)
  const list = "scripts/hand-written-components.json"
  return [
    ...(files.every((file, index) => !index || files[index - 1] < file)
      ? []
      : [`${list} is not sorted`]),
    ...files.flatMap((file) =>
      exists(`packages/opui/components/${file}`)
        ? []
        : [`${list} names ${file}, which doesn't exist`],
    ),
  ]
}

const COMPILED_FILE = new RegExp(
  `^packages/opui/components/([^/]+)/(?:([^/]+)(${Object.values(PORTS)
    .map((extension) => extension.replace(/\./g, "\\."))
    .join("|")})|(${Object.values(TYPE_FILES).join("|")}))$`,
)

export const astroSourceOf = (
  file,
  exists,
  handWritten = readHandWritten(),
) => {
  const match = COMPILED_FILE.exec(file)
  if (!match) return undefined
  const [, folder, name, , typeFile] = match
  if (file.replace("packages/opui/components/", "") in handWritten) {
    return undefined
  }
  const source = typeFile
    ? `packages/opui/components/${folder}/types.astro.ts`
    : `packages/opui/components/${folder}/${name}.astro`
  return exists(source) ? source : undefined
}

/** @param {{ only?: string[], handWritten?: Record<string, string> }} [options] */
export const generate = async ({
  only = [],
  handWritten = readHandWritten(),
} = {}) => {
  const folders = (await readdir(componentsDir, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .toSorted()
  const unknown = only.filter((name) => !folders.includes(name))
  if (unknown.length > 0) {
    throw new Error(`--only names no component folder: ${unknown.join(", ")}`)
  }
  const outputs = new Map()
  const problems = handWrittenProblems(handWritten, (file) =>
    existsSync(join(root, file)),
  )
  const skipped = []
  for (const folder of folders) {
    if (only.length > 0 && !only.includes(folder)) continue
    const files = (await readdir(join(componentsDir, folder))).toSorted()
    const slotsByComponent = {}
    const modelsByComponent = {}
    const propsByComponent = {}
    const rootsByComponent = {}
    let allCompiled = true
    for (const file of files.filter((entry) => entry.endsWith(".astro"))) {
      const key = `${folder}/${file}`
      const relative = `packages/opui/components/${key}`
      try {
        const {
          component,
          outputs: compiled,
          refused,
        } = await compileComponent(
          await readFile(join(componentsDir, key), "utf8"),
          relative,
        )
        for (const [target, error] of refused) {
          allCompiled = false
          const ledgerKey = target.replace("packages/opui/components/", "")
          const message = `${relative}: ${error.message}`
          if (ledgerKey in handWritten) skipped.push(message)
          else problems.push(message)
        }
        slotsByComponent[component.name] = component.slots
        modelsByComponent[component.name] = component.model?.refusal
          ? undefined
          : component.model
        propsByComponent[component.name] = [
          ...component.props
            .filter(
              ({ prop }) =>
                prop !== "class" && prop !== "style" && !prop.includes("-"),
            )
            .map(({ prop }) => prop),
          ...(component.model?.kind === "value" && !component.model.local
            ? [component.model.prop]
            : []),
        ]
        rootsByComponent[component.name] = component.restOnRoot
          ? [
              ...new Set(
                component.rootElements
                  .filter((node) => node.custom)
                  .map((node) => node.tag),
              ),
            ]
          : []
        for (const [target, code] of compiled) {
          const ledgerKey = target.replace("packages/opui/components/", "")
          if (ledgerKey in handWritten) continue
          outputs.set(target, code)
        }
      } catch (error) {
        allCompiled = false
        const ledgerKeys = Object.values(PORTS).map(
          (extension) => `${folder}/${file.replace(/\.astro$/, extension)}`,
        )
        const message = error.message.startsWith(relative)
          ? error.message
          : `${relative}: ${error.message}`
        if (ledgerKeys.every((ledgerKey) => ledgerKey in handWritten)) {
          skipped.push(message)
        } else {
          problems.push(message)
        }
      }
    }
    try {
      if (!allCompiled) {
        throw unsupported(
          `packages/opui/components/${folder}/types.astro.ts`,
          "a folder with a hand-written component",
        )
      }
      const types = toTypes(
        folder,
        {
          astro: await readFile(
            join(componentsDir, folder, "types.astro.ts"),
            "utf8",
          ),
          base: await readFile(join(componentsDir, folder, "types.ts"), "utf8"),
        },
        slotsByComponent,
        propsByComponent,
        rootsByComponent,
        modelsByComponent,
      )
      for (const [framework, typeFile] of Object.entries(TYPE_FILES)) {
        const target = `packages/opui/components/${folder}/${typeFile}`
        if (`${folder}/${typeFile}` in handWritten) continue
        outputs.set(target, await prettierFormat(types[framework], target))
      }
    } catch (error) {
      const types = `packages/opui/components/${folder}/types.astro.ts`
      const message = error.message.startsWith(types)
        ? error.message
        : `${types}: ${error.message}`
      if (
        Object.values(TYPE_FILES).every(
          (typeFile) => `${folder}/${typeFile}` in handWritten,
        )
      ) {
        skipped.push(message)
      } else {
        problems.push(message)
      }
    }
  }
  return { outputs, problems, skipped }
}

const main = async () => {
  const { values } = parseArgs({
    options: {
      check: { type: "boolean" },
      only: { type: "string" },
      report: { type: "boolean" },
    },
    strict: true,
  })
  const { outputs, problems, skipped } = await generate({
    only: values.only?.split(",") ?? [],
  })
  const read = (file) => {
    try {
      return readFileSync(join(root, file), "utf8")
    } catch {
      return undefined
    }
  }
  if (values.report) {
    console.log(skipped.join("\n"))
    console.log(
      `\n${outputs.size} files compile, ${skipped.length} stay hand-written.`,
    )
  }
  const stale = [...outputs]
    .filter(([file, code]) => read(file) !== code)
    .map(
      ([file]) =>
        `${file} is stale: edit ${astroSourceOf(file, () => true, {})} and run pnpm build-components`,
    )
  if (values.check) {
    const errors = [...problems, ...stale]
    if (errors.length > 0) {
      console.error(errors.join("\n"))
      process.exit(1)
    }
    console.log(`Checked ${outputs.size} component files.`)
    return
  }
  for (const [file, code] of outputs) {
    if (read(file) === code) continue
    await writeFile(join(root, file), code)
    console.log(`Wrote ${file}`)
  }
  if (problems.length > 0) {
    console.error(problems.join("\n"))
    process.exit(1)
  }
  console.log(`Generated ${outputs.size} component files.`)
}

if (
  process.argv[1] &&
  realpathSync(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  await main().catch((error) => {
    console.error(error.message)
    process.exit(1)
  })
}
