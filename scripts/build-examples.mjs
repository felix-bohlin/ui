import { existsSync, readFileSync, realpathSync } from "node:fs"
import { readdir, readFile, writeFile } from "node:fs/promises"
import { stripTypeScriptTypes } from "node:module"
import { join, posix } from "node:path"
import { fileURLToPath } from "node:url"
import { parseArgs } from "node:util"
import { parse, transform } from "@astrojs/compiler"
import { parseFragment } from "parse5"
import ts from "typescript"
import { slotProp } from "../src/component-api/frameworks.ts"
import { splitTopLevel } from "./example-display.mjs"
import {
  attributeText,
  decodeText,
  decodeTextarea,
  jsxAttribute,
  jsxText,
  markupText,
  templateLiteral,
} from "./example-encoders.mjs"
import {
  BLANK_LINE_MARKER,
  cleanRender,
  declarations as styleDeclarations,
  meaningChange,
  meaningOf,
  WHITESPACE_MARK,
  whitespaceRoles,
} from "./example-html.mjs"
import {
  assignExampleIds,
  createExampleIdPlaceholders,
  exampleKeyOf,
  ID_PLACEHOLDER,
} from "./example-ids.mjs"
import {
  reactKinds,
  reactPropsOf,
  resolveReactProp,
} from "./example-react-props.mjs"
import {
  byAttributeName,
  generatedTargets,
  handWrittenProblems,
  readHandWritten,
  staleProblems,
  TARGETS,
} from "./example-targets.mjs"
import { formatStably } from "./format.mjs"
import { parseHtml, VOID_ELEMENTS } from "./html-tokens.mjs"

const root = fileURLToPath(new URL("..", import.meta.url))
const examplesDir = join(root, "src/component-examples")
const componentsDir = join(root, "packages/opui/components")

export const REACT_FIXED_VALUE_TYPES = [
  "button",
  "checkbox",
  "hidden",
  "image",
  "radio",
  "reset",
  "submit",
]

export const REACT_DEFAULT_VALUE = [
  "NumberField",
  "OneTimeCode",
  "Range",
  "Rating",
  "Select",
  "Tabs",
  "TextField",
  "Textarea",
  "ToggleGroup",
]

const NUMERIC_ATTRIBUTES = [
  "colspan",
  "maxlength",
  "minlength",
  "rows",
  "rowspan",
  "span",
  "tabindex",
]

const MAP_KEY_ORDER = ["id", "value", "name", "title"]

const MARKUP = "__markup__"

const BLANK_LINE = /\n[^\S\n]*\n/

const unsupported = (file, what, target, hint) =>
  new Error(
    `${file} uses ${what}, which scripts/build-examples.mjs can't convert${target ? ` to ${target}` : ""}: ${hint ?? "change the example, or support the construct in scripts/build-examples.mjs"}`,
  )

const NOT_LITERAL = Symbol("not a literal")

const unwrap = (node) => {
  while (
    ts.isParenthesizedExpression(node) ||
    ts.isAsExpression(node) ||
    ts.isSatisfiesExpression(node)
  ) {
    node = node.expression
  }
  return node
}

const isFunction = (node) =>
  ts.isArrowFunction(node) || ts.isFunctionExpression(node)

const passesFunction = (value, seen = new WeakSet()) => {
  if (!value || typeof value !== "object" || seen.has(value)) return false
  seen.add(value)
  if (value.kind === "expression" && typeof value.value === "string") {
    const sourceFile = ts.createSourceFile(
      "expression.ts",
      `(${value.value})`,
      ts.ScriptTarget.Latest,
      true,
    )
    const visit = (node) =>
      isFunction(node) || ts.forEachChild(node, visit) === true
    if (visit(sourceFile)) return true
  }
  return Object.values(value).some((child) => passesFunction(child, seen))
}

const literalValue = (node) => {
  node = unwrap(node)
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
    return node.text
  }
  if (ts.isNumericLiteral(node)) return Number(node.text)
  if (node.kind === ts.SyntaxKind.TrueKeyword) return true
  if (node.kind === ts.SyntaxKind.FalseKeyword) return false
  if (ts.isArrayLiteralExpression(node)) {
    const items = node.elements.map(literalValue)
    return items.includes(NOT_LITERAL) ? NOT_LITERAL : items
  }
  if (ts.isObjectLiteralExpression(node)) {
    const entries = node.properties.map((property) => {
      const name = property.name
      const key =
        name && (ts.isIdentifier(name) || ts.isStringLiteral(name))
          ? name.text
          : undefined
      const value = ts.isPropertyAssignment(property)
        ? literalValue(property.initializer)
        : NOT_LITERAL
      return key === undefined || value === NOT_LITERAL
        ? NOT_LITERAL
        : [key, value]
    })
    return entries.includes(NOT_LITERAL)
      ? NOT_LITERAL
      : Object.fromEntries(entries)
  }
  return NOT_LITERAL
}

const hasTypeAssertion = (node) =>
  ts.isTypeAssertionExpression(node) ||
  ts.forEachChild(node, hasTypeAssertion) === true

const commentsAround = (code, statement) => {
  const text = ({ pos, end }) => code.slice(pos, end)
  return {
    leading: (
      ts.getLeadingCommentRanges(code, statement.getFullStart()) ?? []
    ).map(text),
    trailing: (ts.getTrailingCommentRanges(code, statement.getEnd()) ?? []).map(
      text,
    ),
  }
}

const readFrontmatter = (code, file) => {
  const sourceFile = ts.createSourceFile(
    "frontmatter.ts",
    code,
    ts.ScriptTarget.Latest,
    true,
  )
  const imports = []
  const typeImports = []
  const consts = []
  for (const statement of sourceFile.statements) {
    if (
      ts.isImportDeclaration(statement) &&
      statement.moduleSpecifier.text === "opui-css/astro" &&
      statement.importClause?.namedBindings &&
      ts.isNamedImports(statement.importClause.namedBindings)
    ) {
      imports.push(
        ...statement.importClause.namedBindings.elements.map(
          (element) => element.name.text,
        ),
      )
      continue
    }
    if (
      ts.isImportDeclaration(statement) &&
      statement.importClause?.isTypeOnly &&
      !statement.moduleSpecifier.text.startsWith("opui-css/")
    ) {
      typeImports.push({
        names: statement.importClause.namedBindings?.elements?.map(
          (element) => element.name.text,
        ) ?? [statement.importClause.name?.text],
        text: statement.getText(sourceFile),
      })
      continue
    }
    if (
      ts.isVariableStatement(statement) &&
      statement.declarationList.flags & ts.NodeFlags.Const &&
      !statement.modifiers
    ) {
      const { declarations } = statement.declarationList
      const comments = commentsAround(code, statement)
      declarations.forEach((declaration, index) => {
        const fn =
          !!declaration.initializer &&
          isFunction(unwrap(declaration.initializer))
        const items = fn
          ? undefined
          : declaration.initializer
            ? literalValue(declaration.initializer)
            : NOT_LITERAL
        if (
          !ts.isIdentifier(declaration.name) ||
          items === NOT_LITERAL ||
          hasTypeAssertion(declaration)
        ) {
          throw unsupported(file, `\`${declaration.getText(sourceFile)}\``)
        }
        consts.push({
          fn,
          items,
          leading: index === 0 ? comments.leading : [],
          name: declaration.name.text,
          text: `const ${declaration.getText(sourceFile)}`,
          trailing: index === declarations.length - 1 ? comments.trailing : [],
          value: typeof items === "string" ? items : undefined,
        })
      })
      continue
    }
    throw unsupported(
      file,
      `the frontmatter statement \`${statement.getText(sourceFile).split("\n")[0]}\``,
    )
  }
  return { consts, imports, typeImports }
}

const attribute = (node, name) =>
  node.attributes?.find((candidate) => candidate.name === name)

const textOf = (node) =>
  node.children
    .map((child) => (child.type === "text" ? child.value : ""))
    .join("")

const SVG_TEXT = new Set([
  "desc",
  "foreignObject",
  "text",
  "textPath",
  "title",
  "tspan",
])

const svgChildren = (children) => {
  const nodes = children.filter(
    (node) => !(node.type === "text" && !node.value.trim()),
  )
  return !nodes.some((node) => node.type === "element")
    ? nodes
    : nodes
        .flatMap((node) => [{ type: "text", value: "\n" }, node])
        .concat({
          type: "text",
          value: "\n",
        })
}

const slotOf = (node, context) => {
  const slot = attribute(node, "slot")
  if (!slot) return undefined
  if (slot.kind !== "quoted") {
    throw unsupported(
      context.file,
      "a slot attribute that isn't a plain string",
    )
  }
  if (!context.slotHost) {
    throw unsupported(
      context.file,
      `slot="${slot.value}" outside the direct children of a component`,
    )
  }
  return slot.value
}

const htmlNode = (html, context) => {
  const name = html.value.trim()
  const markup =
    html.kind === "expression" ? context.markup.get(name) : undefined
  if (!markup) throw unsupported(context.file, `set:html={${html.value}}`)
  markup.uses++
  return { name, type: "html" }
}

const toTree = (nodes, context) =>
  nodes.flatMap((node) => {
    if (node.type === "text") {
      return [
        { start: node.position?.start.offset, type: "text", value: node.value },
      ]
    }
    if (node.type === "comment") return [{ type: "comment", value: node.value }]
    if (node.type === "expression") return [expressionNode(node, context)]
    if (node.type === "fragment") {
      for (const item of node.attributes) {
        if (item.name !== "slot" && item.name !== "set:html") {
          throw unsupported(
            context.file,
            `the attribute ${item.name} on a <Fragment>`,
          )
        }
      }
      const slot = slotOf(node, context)
      const html = attribute(node, "set:html")
      if (html && !slot) {
        return [htmlNode(html, context)]
      }
      if (!slot) throw unsupported(context.file, "a <Fragment> without a slot")
      return [
        {
          children: html
            ? [htmlNode(html, context)]
            : toTree(node.children, { ...context, slotHost: false }),
          slot,
          type: "fragment",
        },
      ]
    }
    if (node.type === "element" || node.type === "component") {
      if (node.type === "component" && !context.imports.includes(node.name)) {
        throw unsupported(context.file, `<${node.name}>, which isn't imported`)
      }
      if (node.name === "script" || node.name === "style") {
        throw unsupported(context.file, `a nested <${node.name}>`)
      }
      const attributes = node.attributes.map((item) => {
        if (item.name.includes(":")) {
          throw unsupported(context.file, `the directive ${item.name}`)
        }
        if (item.kind === "quoted") {
          return {
            kind: "string",
            name: item.name,
            value:
              item.name === "style"
                ? styleDeclarations(item.value)
                : item.value,
          }
        }
        if (item.kind === "empty") return { kind: "boolean", name: item.name }
        if (item.kind === "expression" || item.kind === "template-literal") {
          return {
            kind: "expression",
            name: item.name,
            value:
              item.kind === "template-literal"
                ? `\`${item.value}\``
                : item.value.trim(),
          }
        }
        throw unsupported(context.file, `the attribute ${item.name}`)
      })
      const slot = slotOf(node, context)
      const children = toTree(node.children, {
        ...context,
        slotHost: node.type === "component",
        svg: SVG_TEXT.has(node.name)
          ? false
          : context.svg || node.name === "svg",
      })
      return [
        {
          attributes: attributes
            .filter((item) => item.name !== "slot")
            .toSorted((a, b) =>
              node.type === "component" ? byAttributeName(a.name, b.name) : 0,
            ),
          children:
            context.svg || node.name === "svg"
              ? svgChildren(children)
              : children,
          component: node.type === "component",
          name: node.name,
          slot,
          type: "element",
        },
      ]
    }
    throw unsupported(context.file, `a ${node.type} node`)
  })

const parseExpression = (code, file) => {
  const sourceFile = ts.createSourceFile(
    "expression.ts",
    `(${code})`,
    ts.ScriptTarget.Latest,
    true,
  )
  const [statement] = sourceFile.statements
  if (
    sourceFile.parseDiagnostics.length > 0 ||
    sourceFile.statements.length !== 1 ||
    !ts.isExpressionStatement(statement)
  ) {
    throw unsupported(file, `the expression {${code}}`)
  }
  return unwrap(statement.expression)
}

const isPropertyChain = (node) =>
  ts.isIdentifier(node) ||
  (ts.isPropertyAccessExpression(node) && isPropertyChain(node.expression))

const FIELD_KINDS = new Set(["number", "string"])

const mapKey = (name, items, param, file) => {
  const objects = items.filter(
    (item) => item && typeof item === "object" && !Array.isArray(item),
  )
  const usable = (field) =>
    objects.length === items.length &&
    items.every((item) => FIELD_KINDS.has(typeof item[field])) &&
    new Set(items.map((item) => String(item[field]))).size === items.length
  if (items.length === 0) {
    throw unsupported(file, `${name}.map over an empty array`)
  }
  if (
    ts.isIdentifier(param.name) &&
    items.every((item) => FIELD_KINDS.has(typeof item))
  ) {
    if (new Set(items.map(String)).size !== items.length) {
      throw unsupported(
        file,
        `${name}.map over items that aren't unique, so React and Vue have no key`,
      )
    }
    return param.name.text
  }
  const fields = [
    ...new Set([
      ...MAP_KEY_ORDER,
      ...(objects.length ? Object.keys(objects[0]) : []),
    ]),
  ]
  if (ts.isIdentifier(param.name)) {
    const field = fields.find(usable)
    if (field) return `${param.name.text}.${field}`
  } else {
    const locals = new Map(
      param.name.elements.map((element) => [
        (element.propertyName ?? element.name).text,
        element.name.text,
      ]),
    )
    const field = fields.find(
      (candidate) => locals.has(candidate) && usable(candidate),
    )
    if (field) return locals.get(field)
  }
  throw unsupported(
    file,
    `${name}.map without a field that is destructured, present in every item, a string or number, and unique, for the React and Vue key`,
  )
}

const paramText = (binding) =>
  ts.isIdentifier(binding)
    ? binding.text
    : `{ ${binding.elements
        .map((element) =>
          element.propertyName
            ? `${element.propertyName.text}: ${element.name.text}`
            : element.name.text,
        )
        .join(", ")} }`

const mapArrow = (call, context) => {
  const callee = call.expression
  if (
    !ts.isPropertyAccessExpression(callee) ||
    callee.name.text !== "map" ||
    !ts.isIdentifier(callee.expression) ||
    call.arguments.length !== 1 ||
    !ts.isArrowFunction(call.arguments[0])
  ) {
    throw unsupported(
      context.file,
      "an expression with markup other than array.map(callback)",
    )
  }
  const array = callee.expression.text
  const items = context.arrays.get(array)
  if (!items) {
    throw unsupported(
      context.file,
      `${array}.map, which isn't over an array const in the frontmatter`,
    )
  }
  const [arrow] = call.arguments
  if (arrow.parameters.length !== 1) {
    throw unsupported(
      context.file,
      `the ${array}.map callback, which must take one parameter`,
    )
  }
  const [param] = arrow.parameters
  const simpleBinding = (binding) =>
    ts.isIdentifier(binding) ||
    (ts.isObjectBindingPattern(binding) &&
      binding.elements.every(
        (element) =>
          !element.dotDotDotToken &&
          !element.initializer &&
          ts.isIdentifier(element.name) &&
          (!element.propertyName || ts.isIdentifier(element.propertyName)),
      ))
  if (
    param.dotDotDotToken ||
    param.initializer ||
    param.questionToken ||
    !simpleBinding(param.name)
  ) {
    throw unsupported(
      context.file,
      `the ${array}.map callback parameter \`${param.getText()}\``,
    )
  }
  const body = unwrap(arrow.body)
  if (!ts.isIdentifier(body) || body.text !== MARKUP) {
    throw unsupported(
      context.file,
      `the ${array}.map callback body, which must be one element`,
    )
  }
  return {
    array,
    key: mapKey(array, items, param, context.file),
    params: paramText(param.name),
  }
}

const expressionNode = (node, context) => {
  const markup = node.children.filter((child) => child.type !== "text")
  if (markup.length > 1) {
    throw unsupported(context.file, "an expression with more than one element")
  }
  const code = node.children
    .map((child) => (child.type === "text" ? child.value : MARKUP))
    .join("")
    .trim()
  const expression = parseExpression(code, context.file)
  if (markup.length === 0) {
    if (
      (ts.isStringLiteral(expression) ||
        ts.isNoSubstitutionTemplateLiteral(expression)) &&
      !expression.getText().includes("\\")
    ) {
      return { type: "text", value: markupText(expression.text) }
    }
    if (isPropertyChain(expression)) {
      return { code: expression.getText(), type: "expression" }
    }
    throw unsupported(context.file, `the expression {${code}}`)
  }
  if (!ts.isCallExpression(expression)) {
    throw unsupported(
      context.file,
      "an expression with markup other than array.map(callback)",
    )
  }
  const [child] = markup
  if (child.type !== "element" && child.type !== "component") {
    throw unsupported(
      context.file,
      `a <${child.name ?? child.type}> as the body of array.map`,
    )
  }
  return {
    ...mapArrow(expression, context),
    child: toTree([child], { ...context, slotHost: false })[0],
    type: "map",
  }
}

const importsOf = (code) => {
  const sourceFile = ts.createSourceFile(
    "script.ts",
    code,
    ts.ScriptTarget.Latest,
    true,
  )
  const modules = []
  let foreign = false
  const visit = (node) => {
    if (
      ts.isImportDeclaration(node) &&
      node.moduleSpecifier.text.startsWith("opui-css/")
    ) {
      modules.push(node.moduleSpecifier.text)
    } else if (
      ts.isImportDeclaration(node) ||
      (ts.isExportDeclaration(node) && node.moduleSpecifier) ||
      (ts.isCallExpression(node) &&
        node.expression.kind === ts.SyntaxKind.ImportKeyword)
    ) {
      foreign = true
    }
    ts.forEachChild(node, visit)
  }
  visit(sourceFile)
  return { foreign, modules }
}

const checkNesting = (node, file) => {
  for (const child of node.children ?? []) {
    if (
      child.type === "element" &&
      (child.name === "script" || child.name === "style")
    ) {
      throw unsupported(file, `a nested <${child.name}>`)
    }
    if (
      child.type === "comment" &&
      (node.type === "component" || node.type === "fragment")
    ) {
      throw unsupported(
        file,
        `a comment directly inside <${node.name}>, which the Astro compiler drops`,
      )
    }
    checkNesting(child, file)
  }
}

export const readExample = async (source, file = "Example.astro") => {
  const { ast } = await parse(source, { position: true })
  const frontmatter =
    ast.children.find((node) => node.type === "frontmatter")?.value ?? ""
  const scripts = []
  const styles = []
  const body = []
  const blankLines = []
  let gap = ""
  let seen = false
  for (const node of ast.children) {
    if (node.type === "frontmatter") continue
    if (node.type === "element" && node.name === "script") {
      if (node.attributes.length > 0) {
        throw unsupported(
          file,
          `a <script> with the attribute ${node.attributes[0].name}`,
        )
      }
      const text = textOf(node)
      if (importsOf(text).foreign) {
        throw unsupported(file, "an import from outside opui-css in a <script>")
      }
      scripts.push(text)
      continue
    }
    if (node.type === "element" && node.name === "style") {
      if (
        node.attributes.length !== 1 ||
        node.attributes[0].name !== "is:global"
      ) {
        throw unsupported(
          file,
          "a <style> that isn't exactly <style is:global>",
        )
      }
      styles.push(dedent(textOf(node)))
      continue
    }
    body.push(node)
    if (node.type === "text") {
      gap += node.value
      continue
    }
    checkNesting({ children: [node], type: "root" }, file)
    if (seen) blankLines.push(BLANK_LINE.test(gap))
    seen = true
    gap = ""
  }
  return { blankLines, body, frontmatter, scripts, styles }
}

const RAW_TEXT = new Set([
  "listing",
  "pre",
  "script",
  "style",
  "textarea",
  "title",
  "xmp",
])

export const markWhitespace = async (source) => {
  const { ast } = await parse(source, { position: true })
  const marks = []
  const visit = (nodes, parent, raw) => {
    for (const node of nodes) {
      if (node.type === "text") {
        if (raw || parent === "root" || parent === "expression") continue
        for (const match of node.value.matchAll(/[\t\n\f\r ]+/g)) {
          marks.push(
            node.position.start.offset +
              Buffer.byteLength(node.value.slice(0, match.index)),
          )
        }
        continue
      }
      if (!node.children) continue
      const setsContent = node.attributes?.some((item) =>
        ["set:html", "set:text"].includes(item.name),
      )
      visit(
        node.children,
        node.type,
        raw ||
          setsContent ||
          (node.type === "element" && RAW_TEXT.has(node.name)),
      )
    }
  }
  visit(ast.children, "root", false)
  let bytes = Buffer.from(source)
  for (const offset of marks.toReversed()) {
    bytes = Buffer.concat([
      bytes.subarray(0, offset),
      Buffer.from(`<Fragment set:html="<!--${WHITESPACE_MARK}${offset}-->" />`),
      bytes.subarray(offset),
    ])
  }
  return bytes.toString()
}

export const markTopLevelBlankLines = async (source) => {
  const { ast } = await parse(source, { position: true })
  const nodes = ast.children.filter((node) => node.type !== "frontmatter")
  const isBody = (node) =>
    node &&
    node.type !== "text" &&
    !(node.type === "element" && /^(script|style)$/.test(node.name))
  const neighbor = (index, step) => {
    let at = index + step
    while (nodes[at]?.type === "text") at += step
    return nodes[at]
  }
  let bytes = Buffer.from(source)
  for (const [index, node] of [...nodes.entries()].toReversed()) {
    if (
      node.type === "text" &&
      BLANK_LINE.test(node.value) &&
      isBody(neighbor(index, -1)) &&
      isBody(neighbor(index, 1))
    ) {
      const { end, start } = node.position
      bytes = Buffer.concat([
        bytes.subarray(0, start.offset),
        Buffer.from(
          node.value.replace(
            /[^\S\n]*\n[^\S\n]*\n\s*/g,
            `\n<!--${BLANK_LINE_MARKER}-->\n`,
          ),
        ),
        bytes.subarray(end.offset),
      ])
    }
  }
  return bytes.toString()
}

const setHtmlNames = (nodes, names = new Set()) => {
  for (const node of nodes) {
    const html = attribute(node, "set:html")
    if (html?.kind === "expression") names.add(html.value.trim())
    if (node.children) setHtmlNames(node.children, names)
  }
  return names
}

/** @param {string} source @param {string} [file] @param {{ read?: Awaited<ReturnType<typeof readExample>> }} [options] */
export const parseExample = async (
  source,
  file = "Example.astro",
  { read } = {},
) => {
  const { blankLines, body, frontmatter, scripts, styles } =
    read ?? (await readExample(source, file))
  const { consts, imports, typeImports } = readFrontmatter(frontmatter, file)
  const parsedMarkup = new Map()
  const usedAsHtml = setHtmlNames(body)
  for (let found = true; found;) {
    found = false
    for (const item of consts) {
      if (!usedAsHtml.has(item.name) || parsedMarkup.has(item.name)) continue
      if (item.value === undefined) {
        throw unsupported(file, `set:html={${item.name}} with a non-string`)
      }
      if (/[{}]/.test(item.value)) {
        throw unsupported(
          file,
          `set:html={${item.name}} with a string that contains { or }, which the Astro compiler reads as an expression here and as text in the HTML`,
        )
      }
      const { ast: parsed } = await parse(item.value, { position: false })
      if (item.leading.length > 0 || item.trailing.length > 0) {
        throw unsupported(file, `a comment on the set:html const ${item.name}`)
      }
      parsedMarkup.set(item.name, { nodes: parsed.children, uses: 0 })
      for (const name of setHtmlNames(parsed.children)) {
        found ||= !usedAsHtml.has(name)
        usedAsHtml.add(name)
      }
    }
  }
  const markup = new Map(
    consts
      .filter(({ name }) => parsedMarkup.has(name))
      .map(({ name }) => [name, parsedMarkup.get(name)]),
  )
  const arrays = new Map(
    consts
      .filter(({ items }) => Array.isArray(items))
      .map(({ items, name }) => [name, items]),
  )
  const context = { arrays, file, imports, markup, slotHost: false }
  const tree = toTree(body, context).map((node) =>
    node.type === "text" ? { ...node, topLevel: true } : node,
  )
  for (const [name, item] of markup) {
    item.tree = toTree(item.nodes, context)
    item.name = name
    item.shared = item.uses > 1 || markup.size > 1
  }
  return {
    blankLines,
    consts: consts.filter(({ name }) => !markup.has(name)),
    imports,
    markup,
    scripts,
    styles,
    tree: trimTree(tree),
    typeImports,
  }
}

const trimTree = (tree) => {
  const nodes = [...tree]
  while (nodes[0]?.type === "text" && !nodes[0].value.trim()) nodes.shift()
  while (nodes.at(-1)?.type === "text" && !nodes.at(-1).value.trim()) {
    nodes.pop()
  }
  return nodes
}

const dedent = (text) => {
  const lines = text
    .replace(/^\s*\n/, "")
    .trimEnd()
    .split("\n")
  const indent = Math.min(
    ...lines
      .filter((line) => line.trim())
      .map((line) => line.match(/^ */)[0].length),
  )
  return lines.map((line) => line.slice(indent)).join("\n")
}

const indent = (text, spaces) =>
  text
    .split("\n")
    .map((line) => (line ? " ".repeat(spaces) + line : line))
    .join("\n")

const usedComponents = (example) => {
  const names = new Set()
  const walk = (nodes) => {
    for (const node of nodes) {
      if (node.type === "element" && node.component) names.add(node.name)
      if (node.children) walk(node.children)
      if (node.type === "map") walk([node.child])
    }
  }
  walk(example.tree)
  for (const item of example.markup.values()) walk(item.tree)
  return example.imports.filter((name) => names.has(name))
}

const declarations = ({ consts, typeImports }) => {
  const text = consts.map((item) => item.text).join("\n")
  const used = typeImports
    .filter(({ names }) =>
      names.some((name) => new RegExp(`\\b${name}\\b`).test(text)),
    )
    .map(({ text: line }) => line)
  return [
    ...used,
    ...consts.map(({ leading, text: line, trailing }) =>
      [...leading, [line, ...trailing].join(" ")].join("\n"),
    ),
  ]
}

const importLine = (example, framework) => {
  const names = usedComponents(example)
  if (names.length === 0) return ""
  return `import { ${names.join(", ")} } from "opui-css/${framework}"`
}

const markupAttributes = (node, expression, braces) =>
  node.attributes
    .map((item) => {
      if (item.kind === "boolean") return item.name
      if (braces && node.component && NUMERIC_ATTRIBUTES.includes(item.name)) {
        if (item.kind === "string" && /^-?\d+$/.test(item.value)) {
          return expression({ ...item, kind: "expression" })
        }
      }
      if (item.kind !== "string") return expression(item)
      const quoted = item.value.includes('"') && !item.value.includes("'")
      if (braces && (/[{}]/.test(item.value) || quoted)) {
        return expression({ ...item, value: JSON.stringify(item.value) })
      }
      const quote = quoted ? "'" : '"'
      return `${item.name}=${quote}${attributeText(item.value, quote)}${quote}`
    })
    .join(" ")

const openTag = (name, attributes) =>
  attributes ? `<${name} ${attributes}` : `<${name}`

const markupTarget = (framework, roles) => {
  const vue = framework === "vue"
  const isBlankText = (node) => node.type === "text" && !node.value.trim()
  const markupText = (node, index, nodes) => {
    const content = nodes.filter((item) => !item.slot)
    const at = content.indexOf(node)
    const leading = content.slice(0, at).every(isBlankText)
    const trailing = content.slice(at + 1).every(isBlankText)
    const parts = textParts(node, roles)
    const between =
      isBlankText(node) &&
      nodes[index - 1]?.type !== "text" &&
      nodes[index + 1]?.type !== "text"
    return parts
      .map((part, position) => {
        if (part.text !== undefined) return part.text
        const run =
          part.run === "\n\n" ? "\n\n" : part.run.includes("\n") ? "\n" : " "
        if (part.role !== "space") return run
        const edge =
          (leading && position === 0) ||
          (trailing && position === parts.length - 1)
        if (vue)
          return between || (edge && isBlankText(node)) ? '{{ " " }}' : " "
        return edge ? '{" "}' : " "
      })
      .join("")
  }
  const emit = (nodes, html) =>
    nodes
      .map((node, index) => {
        if (node.type === "text") return markupText(node, index, nodes)
        if (node.type === "comment") return `<!--${node.value}-->`
        if (node.type === "expression") {
          return vue ? `{{ ${node.code} }}` : `{${node.code}}`
        }
        if (node.type === "html") {
          const item = html.get(node.name)
          return item.shared && !vue
            ? `{@render ${node.name}()}`
            : emit(item.tree, html)
        }
        if (node.type === "map") {
          if (vue) {
            return element(
              {
                ...node.child,
                attributes: [
                  {
                    kind: "string",
                    name: "v-for",
                    value: `${node.params} in ${node.array}`,
                  },
                  { kind: "expression", name: "key", value: node.key },
                  ...node.child.attributes,
                ],
              },
              html,
            )
          }
          const params = node.params.startsWith("{")
            ? node.params.replace(/^\{\s*/, "{ ").replace(/\s*\}$/, " }")
            : node.params
          return `{#each ${node.array} as ${params} (${node.key})}\n${element(node.child, html)}\n{/each}`
        }
        const block = (code) =>
          `${/\s$/.test(nodes[index - 1]?.value ?? "") ? "" : "\n"}${code}${/^\s/.test(nodes[index + 1]?.value ?? "") ? "" : "\n"}`
        if (node.type === "fragment") {
          return block(slotWrapper(node.slot, emit(node.children, html)))
        }
        return node.slot
          ? block(
              slotWrapper(
                node.slot,
                element({ ...node, slot: undefined }, html),
              ),
            )
          : element(node, html)
      })
      .join("")
  const slotWrapper = (slot, content) => {
    const inner = `${content.startsWith("<") ? "\n" : ""}${content}${content.endsWith(">") ? "\n" : ""}`
    return vue
      ? `<template #${slot}>${inner}</template>`
      : `{#snippet ${slotProp(slot)}()}${inner}{/snippet}`
  }
  const expression = (item) =>
    vue
      ? item.name === "v-for"
        ? `v-for="${item.value}"`
        : `:${item.name}="${attributeText(item.value)}"`
      : `${item.name}={${item.value}}`
  const svelteDefaults = (node) =>
    !vue &&
    node.component &&
    reactPropsOf(node.name, node.component)?.has("defaultChecked")
      ? {
          ...node,
          attributes: node.attributes.map((item) =>
            item.name === "checked"
              ? { ...item, name: "defaultChecked" }
              : item,
          ),
        }
      : node
  const element = (node, html) => {
    const attributes = markupAttributes(svelteDefaults(node), expression, !vue)
    const children = emit(node.children, html)
    if (VOID_ELEMENTS.has(node.name)) {
      return `${openTag(node.name, attributes)} />`
    }
    if (!children && node.component) {
      return `${openTag(node.name, attributes)} />`
    }
    return `${openTag(node.name, attributes)}>${children}</${node.name}>`
  }
  return emit
}

const SVG_TEXT_CONTENT = new Set(["text", "textPath", "tspan"])

const mixedSvgText = (nodes) =>
  nodes.some(
    (node) =>
      node.type === "element" &&
      ((SVG_TEXT_CONTENT.has(node.name) &&
        node.children.some((child) => child.type === "element") &&
        node.children.some(
          (child) => child.type === "text" && child.value.trim(),
        )) ||
        mixedSvgText(node.children)),
  )

const toSvelte = (example) => {
  const emit = markupTarget("svelte", example.roles)
  const snippets = [...example.markup.values()]
    .filter((item) => item.shared)
    .map(
      (item) =>
        `{#snippet ${item.name}()}\n${emit(item.tree, example.markup)}\n{/snippet}\n\n`,
    )
    .join("")
  const script = [importLine(example, "svelte"), ...declarations(example)]
    .filter(Boolean)
    .join("\n\n")
  const styles = example.styles
    .map((css) => `\n\n<style>\n  :global {\n${indent(css, 4)}\n  }\n</style>`)
    .join("")
  return `${script ? `<script lang="ts">\n${script}\n</script>\n\n` : ""}${snippets}${emit(example.tree, example.markup)}${styles}\n`
}

const toVue = (example) => {
  const emit = markupTarget("vue", example.roles)
  const script = [importLine(example, "vue"), ...declarations(example)]
    .filter(Boolean)
    .join("\n\n")
  const styles = example.styles
    .map((css) => `\n\n<style>\n${css}\n</style>`)
    .join("")
  return `${script ? `<script setup lang="ts">\n${script}\n</script>\n\n` : ""}<template>\n${emit(example.tree, example.markup)}\n</template>${styles}\n`
}

const styleObject = (css, file) =>
  `{{ ${splitTopLevel(css, ";")
    .map((declaration) => {
      const colon = declaration.indexOf(":")
      if (colon === -1) {
        throw unsupported(
          file,
          `the style declaration ${JSON.stringify(declaration)} has no colon`,
          "React",
        )
      }
      const property = declaration.slice(0, colon).trim()
      const key = property.startsWith("--")
        ? JSON.stringify(property)
        : property.replace(/-(\w)/g, (_, letter) => letter.toUpperCase())
      return `${key}: ${JSON.stringify(declaration.slice(colon + 1).trim())}`
    })
    .join(", ")} }}`

const reactExpression = (nodes, context, extra = "") => {
  const inlined = nodes.flatMap((node) =>
    node.type === "html" && !context.markup.get(node.name).shared
      ? context.markup.get(node.name).tree
      : [node],
  )
  const significant = inlined.filter(
    (node) => !(node.type === "text" && !node.value.trim()),
  )
  return significant.length === 1 && significant[0].type === "element" && !extra
    ? reactNodes(significant, context)
    : `<>${reactNodes(inlined, context)}${extra}</>`
}

const ASCII_WHITESPACE = /[\t\n\f\r ]+/g

const optionsOf = (nodes) =>
  nodes.flatMap((child) => {
    if (child.type !== "element" || child.component) return []
    if (child.name === "option") return [child]
    return child.name === "optgroup" ? optionsOf(child.children) : []
  })

const optionValue = (option) =>
  option.attributes.find((item) => item.name === "value")?.value ??
  decodeText(option.children.map((child) => child.value ?? "").join(""))
    .replace(ASCII_WHITESPACE, " ")
    .replace(/^ | $/g, "")

const withoutSelected = (nodes) =>
  nodes.map((child) => {
    if (child.type !== "element" || child.component) return child
    if (child.name === "option") {
      return {
        ...child,
        attributes: child.attributes.filter((item) => item.name !== "selected"),
      }
    }
    return child.name === "optgroup"
      ? { ...child, children: withoutSelected(child.children) }
      : child
  })

const stringProp = (name, value) =>
  value.includes("\n")
    ? `${name}={${JSON.stringify(value)}}`
    : jsxAttribute(name, value)

const reactFormState = (node, table, context) => {
  const attribute = (name) => node.attributes.find((item) => item.name === name)
  const where = `<${node.name}>`
  const state = { children: node.children, extra: [], valueIsState: false }
  const selected = optionsOf(node.children).filter((option) =>
    option.attributes.some((item) => item.name === "selected"),
  )
  if (selected.length > 0) {
    if (!table.has("defaultValue")) {
      throw unsupported(
        context.file,
        `a selected <option> inside ${where}, which has no defaultValue`,
        "React",
      )
    }
    if (attribute("value") || attribute("defaultValue")) {
      throw unsupported(
        context.file,
        `a selected <option> next to a value on ${where}`,
        "React",
      )
    }
    const multiple = attribute("multiple")
    if (!multiple && selected.length > 1) {
      throw unsupported(
        context.file,
        `several selected options in ${where} without multiple`,
        "React",
      )
    }
    const values = selected.map(optionValue)
    state.extra.push({
      code: multiple
        ? `defaultValue={${JSON.stringify(values)}}`
        : jsxAttribute("defaultValue", values[0]),
      name: "defaultValue",
    })
    state.children = withoutSelected(node.children)
  }
  if (!node.component && node.name === "textarea") {
    if (node.children.some((child) => child.type !== "text")) {
      throw unsupported(context.file, "a <textarea> with markup", "React")
    }
    const text = decodeTextarea(
      node.children.map((child) => child.value).join(""),
    )
    if (text) {
      state.extra.push({
        code: stringProp("defaultValue", text),
        name: "defaultValue",
      })
    }
    state.children = []
  }
  if (!attribute("readonly")) {
    if (node.component) {
      state.valueIsState = REACT_DEFAULT_VALUE.includes(node.name)
    } else if (node.name === "textarea") {
      state.valueIsState = true
    } else if (node.name === "input") {
      const type = attribute("type")
      if (type && type.kind !== "string") {
        throw unsupported(
          context.file,
          "an <input> with a dynamic type",
          "React",
        )
      }
      state.valueIsState = !REACT_FIXED_VALUE_TYPES.includes(type?.value)
    }
  }
  return state
}

const reactPropCode = (name, item, kinds, where, context) => {
  const has = (...names) => names.some((kind) => kinds.has(kind))
  const fail = (what) =>
    unsupported(
      context.file,
      `${what} for the prop ${name} of ${where}, which React types as ${[...kinds].join(" or ") || "nothing"}`,
      "React",
    )
  if (item.kind === "boolean") {
    if (has("boolean", "any", "other")) return name
    if (has("string")) return `${name}=""`
    throw fail("an attribute without a value")
  }
  if (item.kind === "string") {
    if (name === "style") {
      return `${name}=${styleObject(item.value, context.file)}`
    }
    if (has("string", "any", "other")) return jsxAttribute(name, item.value)
    if (has("number") && /^-?\d+(\.\d+)?$/.test(item.value)) {
      return `${name}={${item.value}}`
    }
    throw fail(`the string ${JSON.stringify(item.value)}`)
  }
  return `${name}={${item.value}}`
}

const reactProps = (node, context) => {
  const where = `<${node.name}>`
  const table = reactPropsOf(node.name, node.component)
  if (!table) {
    throw unsupported(
      context.file,
      `${where}, which React's types don't have`,
      "React",
    )
  }
  const state = reactFormState(node, table, context)
  const props = node.attributes.map((item) => {
    const name =
      item.name === "checked" && table.has("defaultChecked")
        ? "defaultChecked"
        : item.name === "value" && state.valueIsState
          ? "defaultValue"
          : resolveReactProp(table, item.name)
    if (!name) {
      throw unsupported(
        context.file,
        `the attribute ${item.name} on ${where}, which React's types for it don't have`,
        "React",
      )
    }
    return {
      code: reactPropCode(name, item, reactKinds(table, name), where, context),
      name,
    }
  })
  const slots = node.children
    .filter((child) => child.slot)
    .map((child) => {
      const name = slotProp(child.slot)
      if (!table.has(name)) {
        throw unsupported(
          context.file,
          `the slot ${child.slot} of ${where}, which has no ${name} prop in React`,
          "React",
        )
      }
      const content =
        child.type === "fragment"
          ? trimTree(child.children)
          : [{ ...child, slot: undefined }]
      if (content.every((item) => item.type === "text")) {
        const text = content
          .map((item) => item.value)
          .join("")
          .replace(/\s+/g, " ")
          .trim()
        return { code: jsxAttribute(name, decodeText(text)), name }
      }
      return { code: `${name}={${reactExpression(content, context)}}`, name }
    })
  const all = [...props, ...state.extra, ...slots]
  return {
    children: state.children,
    code: (node.component
      ? all.toSorted((a, b) => byAttributeName(a.name, b.name))
      : all
    )
      .map(({ code }) => code)
      .join(" "),
  }
}

const textParts = (node, roles) => {
  const parts = []
  let last = 0
  for (const match of node.value.matchAll(/[\t\n\f\r ]+/g)) {
    if (match.index > last)
      parts.push({ text: node.value.slice(last, match.index) })
    const offset =
      node.start === undefined
        ? undefined
        : node.start + Buffer.byteLength(node.value.slice(0, match.index))
    parts.push({
      role: node.topLevel
        ? "drop"
        : (roles?.get(offset) ?? (match[0].includes("\n") ? "drop" : "space")),
      run: node.topLevel && BLANK_LINE.test(match[0]) ? "\n\n" : match[0],
    })
    last = match.index + match[0].length
  }
  if (last < node.value.length) parts.push({ text: node.value.slice(last) })
  return parts
}

const joinRuns = (parts) =>
  parts.reduce((joined, part) => {
    const previous = joined.at(-1)
    if (part.run !== undefined && previous?.run !== undefined) {
      joined[joined.length - 1] = {
        role:
          previous.role === "space" || part.role === "space" ? "space" : "drop",
        run: previous.run === "\n\n" || part.run === "\n\n" ? "\n\n" : part.run,
      }
    } else {
      joined.push(part)
    }
    return joined
  }, [])

const reactChildren = (nodes) => {
  const merged = []
  for (const node of nodes) {
    const previous = merged.at(-1)
    if (node.type === "text" && previous?.type === "text") {
      merged[merged.length - 1] = {
        parts: [...previous.parts, ...node.parts],
        type: "text",
        value: previous.value + node.value,
      }
    } else {
      merged.push(node)
    }
  }
  return merged
}

const reactNodes = (nodes, context) => {
  const children = reactChildren(
    nodes
      .filter((node) => !node.slot)
      .map((node) =>
        node.type === "text"
          ? { ...node, parts: textParts(node, context.roles) }
          : node,
      ),
  )
  return children
    .map((node) => {
      if (node.type === "text") {
        return jsxText(
          joinRuns(node.parts)
            .map(
              (part) =>
                part.text ??
                (part.role === "space"
                  ? " "
                  : part.run === "\n\n"
                    ? "\n\n"
                    : "\n"),
            )
            .join(""),
        )
      }
      if (node.type === "comment") {
        if (node.value.includes("*/")) {
          throw unsupported(context.file, "a comment that contains */", "React")
        }
        return `{/*${node.value}*/}`
      }
      if (node.type === "expression") return `{${node.code}}`
      if (node.type === "html") {
        const item = context.markup.get(node.name)
        return item.shared ? `{${node.name}}` : reactNodes(item.tree, context)
      }
      if (node.type === "map") {
        return `{${node.array}.map((${node.params}) => (${reactElement(node.child, context, node.key)}))}`
      }
      if (node.type === "fragment") {
        throw unsupported(context.file, "a slot outside a component", "React")
      }
      return reactElement(node, context)
    })
    .join("")
}

const reactElement = (node, context, key) => {
  const { children, code } = reactProps(node, context)
  const attributes = key ? `key={${key}}${code ? ` ${code}` : ""}` : code
  const content = reactNodes(children, context)
  if (VOID_ELEMENTS.has(node.name) || (!content.trim() && node.component)) {
    return `${openTag(node.name, attributes)} />`
  }
  return `${openTag(node.name, attributes)}>${content}</${node.name}>`
}

const toReact = (example, name, file = `${name}.astro`) => {
  const context = { file, markup: example.markup, roles: example.roles }
  const components = usedComponents(example)
  const functionName = components.includes(name) ? `${name}Example` : name
  const shared = [...example.markup.values()]
    .filter((item) => item.shared)
    .map(
      (item) => `const ${item.name} = (${reactExpression(item.tree, context)})`,
    )
  const client =
    example.consts.some(({ fn }) => fn) ||
    passesFunction(example.tree) ||
    passesFunction([...example.markup.values()].map(({ tree }) => tree))
  const header = [
    ...(client ? ['"use client"'] : []),
    importLine(example, "react"),
    ...declarations(example),
    ...shared,
  ]
    .filter(Boolean)
    .join("\n\n")
  const styles = example.styles.map(
    (css) =>
      `\n<style>{\`\n${indent(templateLiteral(css), 8)}\n      \`}</style>`,
  )
  const body = reactExpression(example.tree, context, styles.join(""))
  return `${header ? `${header}\n\n` : ""}export default function ${functionName}() {\n  return (${body})\n}\n`
}

const reactStyleIndent = (code) =>
  code.replace(
    /^( *)<style>\{`\n([\s\S]*?)\n *`\}<\/style>/gm,
    (_, spaces, css) =>
      `${spaces}<style>{\`\n${indent(dedent(css), spaces.length + 2)}\n${spaces}\`}</style>`,
  )

/** @param {string} source @param {string} framework @param {string} file @param {{ read?: Awaited<ReturnType<typeof readExample>>, roles?: Map<number, string> }} [options] */
export const convertExample = async (
  source,
  framework,
  file,
  { read, roles } = {},
) => {
  const name = file
    .split("/")
    .at(-1)
    .replace(/\.astro$/, "")
  const example = { ...(await parseExample(source, file, { read })), roles }
  if (example.scripts.length > 0) {
    throw unsupported(
      file,
      "a client <script>",
      framework,
      "write the React, Svelte and Vue files by hand and list them in scripts/hand-written-examples.json",
    )
  }
  const target = file.replace(/\.astro$/, TARGETS[framework])
  if (framework === "react") {
    return reactStyleIndent(
      await formatStably(toReact(example, name, file), target),
    )
  }
  if (framework !== "react" && mixedSvgText(example.tree)) {
    throw unsupported(
      file,
      "text next to an element inside an SVG <text>",
      framework,
      "oxfmt puts them on separate lines in Svelte and Vue, which renders a space: write the file by hand and list it in scripts/hand-written-examples.json",
    )
  }
  if (framework === "svelte") {
    return formatStably(toSvelte(example), target)
  }
  return formatStably(toVue(example), target)
}

export const runtimeImports = (code, file) => {
  const sourceFile = ts.createSourceFile(
    "script.ts",
    code,
    ts.ScriptTarget.Latest,
    true,
  )
  const specifiers = []
  const visit = (node) => {
    if (
      (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
      node.moduleSpecifier
    ) {
      specifiers.push(node.moduleSpecifier.text)
    }
    if (
      ts.isCallExpression(node) &&
      node.expression.kind === ts.SyntaxKind.ImportKeyword
    ) {
      const [argument] = node.arguments
      if (
        !argument ||
        !(
          ts.isStringLiteral(argument) ||
          ts.isNoSubstitutionTemplateLiteral(argument)
        )
      ) {
        throw new Error(
          `${file} has a computed import(), which scripts/build-examples.mjs can't follow to the HTML scripts`,
        )
      }
      specifiers.push(argument.text)
    }
    ts.forEachChild(node, visit)
  }
  visit(sourceFile)
  return specifiers
}

const componentRuntimes = async () => {
  const paths = new Set()
  for (const folder of await readdir(componentsDir, { withFileTypes: true })) {
    if (!folder.isDirectory()) continue
    for (const file of await readdir(join(componentsDir, folder.name))) {
      if (!file.endsWith(".astro")) continue
      const where = `packages/opui/components/${folder.name}/${file}`
      const source = await readFile(join(root, where), "utf8")
      const { scripts } = await transform(source, { filename: where })
      for (const script of scripts) {
        for (const specifier of runtimeImports(script.code ?? "", where)) {
          const path = posix.join(posix.dirname(where), specifier)
          const [, runtime] =
            /^packages\/opui\/((?:elements|css\/js)\/[\w-]+\.js)$/.exec(path) ??
            []
          if (runtime) paths.add(runtime)
        }
      }
    }
  }
  return [...paths].toSorted()
}

let tagFiles
export const elementTags = () => {
  tagFiles ??= (async () => {
    const tags = new Map()
    const elementsDir = join(root, "packages/opui/elements")
    for (const file of (await readdir(elementsDir)).toSorted()) {
      if (!file.endsWith(".js")) continue
      const sourceFile = ts.createSourceFile(
        file,
        await readFile(join(elementsDir, file), "utf8"),
        ts.ScriptTarget.Latest,
        true,
      )
      const visit = (node) => {
        if (
          ts.isCallExpression(node) &&
          node.expression.getText(sourceFile) === "customElements.define" &&
          ts.isStringLiteral(node.arguments[0])
        ) {
          tags.set(node.arguments[0].text, `elements/${file}`)
        }
        ts.forEachChild(node, visit)
      }
      visit(sourceFile)
    }
    return tags
  })()
  return tagFiles
}

const htmlElements = (markup) => {
  const found = []
  const walk = (nodes) => {
    for (const node of nodes) {
      if (!node.tagName) continue
      found.push({
        attrs: new Set(node.attrs.map(({ name }) => name)),
        tag: node.tagName,
      })
      walk(node.content?.childNodes ?? node.childNodes)
    }
  }
  walk(parseFragment(markup).childNodes)
  return found
}

export const HTML_SCRIPT_RULES = [
  {
    covers: (path, tags) => [...tags.values()].includes(path),
    lines: (elements, tags) =>
      [
        ...new Set(
          elements
            .filter(({ tag }) => tags.has(tag))
            .map(({ tag }) => tags.get(tag)),
        ),
      ]
        .toSorted()
        .map((path) => `import "opui-css/${path}"`),
  },
  {
    covers: (path) => path === "css/js/checkbox.js",
    lines: (elements) =>
      elements.some(({ attrs }) => attrs.has("data-indeterminate"))
        ? ['import "opui-css/css/js/checkbox.js"']
        : [],
  },
  {
    covers: (path) => path === "css/js/range.js",
    lines: (elements) =>
      elements.some(
        ({ attrs, tag }) => tag === "output" && attrs.has("data-live"),
      )
        ? ['import "opui-css/css/js/range.js"']
        : [],
  },
]

export const scriptImports = (markup, tags) => {
  const elements = htmlElements(markup)
  return HTML_SCRIPT_RULES.flatMap((rule) => rule.lines(elements, tags))
}

const stripTypes = (code) => {
  const { emitWarning } = process
  process.emitWarning = () => {}
  try {
    return stripTypeScriptTypes(code)
  } finally {
    process.emitWarning = emitWarning
  }
}

/** @param {string} rendered @param {string} source @param {string} file @param {{ read?: Awaited<ReturnType<typeof readExample>> }} [options] */
export const htmlFromRender = async (rendered, source, file, { read } = {}) => {
  const example = read ?? (await readExample(source, file))
  const { markup, nodes } = cleanRender(
    assignExampleIds(rendered, exampleKeyOf(file)),
    { css: example.styles, file },
  )
  const imported = new Set(
    example.scripts.flatMap((script) => importsOf(script).modules),
  )
  const imports = scriptImports(markup, await elementTags()).filter(
    (line) => !imported.has(/"([^"]+)"/.exec(line)?.[1]),
  )
  const modules = [
    imports.join("\n"),
    ...example.scripts.map((script) => stripTypes(script).trim()),
  ].filter(Boolean)
  const parts = [
    markup,
    ...example.styles.map((css) => `<style>\n${indent(css, 2)}\n</style>`),
    ...modules.map((code) => `<script type="module">\n${code}\n</script>`),
  ]
  const html = await formatStably(
    `${parts.join("\n\n")}\n`,
    file.replace(/\.astro$/, ".html"),
  )
  const change = meaningChange(
    meaningOf(nodes, example.styles),
    meaningOf(parseHtml(html), example.styles),
  )
  if (change) {
    throw new Error(
      `${file}: formatting the HTML changed what it renders: ${change}`,
    )
  }
  return html
}

export const EXAMPLE_ASTRO_CONFIG = { compressHTML: false, logLevel: "error" }

export const createRenderer = async () => {
  const { getViteConfig } = await import("astro/config")
  const { createViteServer } = await import("vitest/node")
  const config = await getViteConfig(
    { logLevel: "error" },
    EXAMPLE_ASTRO_CONFIG,
  )({
    command: "serve",
    mode: "development",
  })
  const sources = new Map()
  const server = await createViteServer({
    ...config,
    plugins: [
      {
        enforce: "pre",
        load: (id) => sources.get(id),
        name: "opui-example-sources",
        resolveId: (id) =>
          sources.has(join(root, id)) ? join(root, id) : undefined,
      },
      {
        enforce: "pre",
        name: "opui-example-blank-lines",
        transform: (code, id) =>
          id.startsWith(examplesDir) && id.endsWith(".astro")
            ? markWhitespace(code).then(markTopLevelBlankLines)
            : undefined,
      },
      ...config.plugins,
    ],
    appType: "custom",
    configFile: false,
    logLevel: "error",
    optimizeDeps: { noDiscovery: true },
    server: { hmr: false, middlewareMode: true, ws: false },
  })
  const { experimental_AstroContainer } =
    await server.ssrLoadModule("astro/container")
  const container = await experimental_AstroContainer.create()
  const renderModule = async (id, options = {}) =>
    container.renderToString((await server.ssrLoadModule(id)).default, {
      locals: { $id: createExampleIdPlaceholders() },
      ...options,
    })
  const addSource = (file, source) => {
    sources.set(join(root, file), source)
    return `/${file}`
  }
  return {
    close: () => server.close().catch(() => {}),
    loadModule: (id) => server.ssrLoadModule(id),
    loadSource: (file, source) => server.ssrLoadModule(addSource(file, source)),
    renderSource: (file, source, options) =>
      renderModule(addSource(file, source), options),
    render: async (key, source) => {
      if (source.includes(ID_PLACEHOLDER)) {
        throw new Error(
          `src/component-examples/${key}.astro contains ${ID_PLACEHOLDER}, which the generator uses for ids from Astro.locals.$id`,
        )
      }
      return renderModule(`/src/component-examples/${key}.astro`)
    },
  }
}

const exampleKeys = async (only) => {
  const slugs = (await readdir(examplesDir)).toSorted()
  const unknown = only.filter((slug) => !slugs.includes(slug))
  if (unknown.length > 0) {
    throw new Error(`--only names no examples folder: ${unknown.join(", ")}`)
  }
  const keys = []
  for (const slug of slugs.filter(
    (slug) => only.length === 0 || only.includes(slug),
  )) {
    for (const file of (await readdir(join(examplesDir, slug))).toSorted()) {
      if (file.endsWith(".astro")) keys.push(`${slug}/${file.slice(0, -6)}`)
    }
  }
  return keys
}

const checkScriptRules = async () => {
  const tags = await elementTags()
  const missing = (await componentRuntimes()).filter(
    (path) => !HTML_SCRIPT_RULES.some((rule) => rule.covers(path, tags)),
  )
  if (missing.length > 0) {
    throw new Error(
      `A component loads ${missing.join(", ")}, which no rule in HTML_SCRIPT_RULES (scripts/build-examples.mjs) adds to the HTML examples`,
    )
  }
}

/** @param {{ only?: string[], handWritten?: Record<string, string> }} [options] */
export const generate = async ({
  only = [],
  handWritten = readHandWritten(),
} = {}) => {
  await checkScriptRules()
  const keys = await exampleKeys(only)
  const renderer = await createRenderer()
  const outputs = new Map()
  const problems = handWrittenProblems(handWritten, (file) =>
    existsSync(join(root, file)),
  )
  try {
    for (const key of keys) {
      const astroFile = `src/component-examples/${key}.astro`
      const source = await readFile(join(root, astroFile), "utf8")
      const targets = generatedTargets(key, handWritten)
      let read
      let rendered
      let roles
      try {
        if (targets.length > 0) {
          rendered = await renderer.render(key, source)
          read = await readExample(source, astroFile)
          roles = whitespaceRoles(rendered, read.styles)
        }
      } catch (error) {
        problems.push(`${astroFile}: ${error.message}`)
        continue
      }
      for (const framework of targets) {
        const target = `src/component-examples/${key}${TARGETS[framework]}`
        try {
          if (framework === "html") {
            outputs.set(
              target,
              await htmlFromRender(rendered, source, astroFile, { read }),
            )
          } else {
            outputs.set(
              target,
              await convertExample(source, framework, astroFile, {
                read,
                roles,
              }),
            )
          }
        } catch (error) {
          problems.push(`${target}: ${error.message}`)
        }
      }
    }
  } finally {
    await renderer.close()
  }
  return { outputs, problems }
}

const main = async () => {
  const { values } = parseArgs({
    options: {
      check: { type: "boolean" },
      only: { type: "string" },
    },
    strict: true,
  })
  const { outputs, problems } = await generate({
    only: values.only?.split(",") ?? [],
  })
  const read = (file) => {
    try {
      return readFileSync(join(root, file), "utf8")
    } catch {
      return undefined
    }
  }
  const stale = staleProblems(outputs, read)
  if (values.check) {
    const errors = [...problems, ...stale]
    if (errors.length > 0) {
      console.error(errors.join("\n"))
      process.exit(1)
    }
    console.log(`Checked ${outputs.size} example files.`)
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
  console.log(`Generated ${outputs.size} example files.`)
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
