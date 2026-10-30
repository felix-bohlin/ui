import { existsSync, readFileSync, realpathSync } from "node:fs"
import { readdir, readFile, writeFile } from "node:fs/promises"
import { stripTypeScriptTypes } from "node:module"
import { join, posix } from "node:path"
import { fileURLToPath } from "node:url"
import { parseArgs } from "node:util"
import { parse, transform } from "@astrojs/compiler"
import { parseFragment } from "parse5"
import postcss from "postcss"
import { format, resolveConfig } from "prettier"
import ts from "typescript"
import { slotProp } from "../src/component-api/frameworks.ts"
import { clean } from "../src/utils/clean-html.ts"
import { createExampleIdGenerator } from "../src/utils/id.ts"
import {
  generatedTargets,
  handWrittenProblems,
  readHandWritten,
  staleProblems,
  TARGETS,
} from "./example-targets.mjs"

const root = fileURLToPath(new URL("..", import.meta.url))
const examplesDir = join(root, "src/component-examples")
const componentsDir = join(root, "packages/opui/components")
const cssDir = join(root, "packages/opui/css/components")

const REACT_ATTRIBUTES = {
  allowfullscreen: "allowFullScreen",
  autocomplete: "autoComplete",
  class: "className",
  colspan: "colSpan",
  for: "htmlFor",
  maxlength: "maxLength",
  minlength: "minLength",
  playsinline: "playsInline",
  readonly: "readOnly",
  referrerpolicy: "referrerPolicy",
  rowspan: "rowSpan",
  "stroke-linecap": "strokeLinecap",
  "stroke-linejoin": "strokeLinejoin",
  "stroke-width": "strokeWidth",
  tabindex: "tabIndex",
}

export const REACT_DEFAULT_VALUE = [
  "ColorField",
  "NumberStepper",
  "Range",
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

const VOID_ELEMENTS = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "source",
  "track",
  "wbr",
])

const MAP_KEY_ORDER = ["id", "value", "name", "title"]

const MARKUP = "__markup__"

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
        const items = declaration.initializer
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
          comments: [
            ...(index === 0 ? comments.leading : []),
            ...(index === declarations.length - 1 ? comments.trailing : []),
          ],
          items,
          name: declaration.name.text,
          text: `const ${declaration.getText(sourceFile)}`,
          trailing: index === declarations.length - 1 ? comments.trailing : [],
          leading: index === 0 ? comments.leading : [],
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

const SVG_TEXT = new Set(["desc", "text", "title"])

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
    if (node.type === "text") return [{ type: "text", value: node.value }]
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
          return { kind: "string", name: item.name, value: item.value }
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
          attributes: attributes.filter((item) => item.name !== "slot"),
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
      return { type: "text", value: expression.text }
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

const hasImport = (code) => {
  const sourceFile = ts.createSourceFile(
    "script.ts",
    code,
    ts.ScriptTarget.Latest,
    true,
  )
  const visit = (node) =>
    ts.isImportDeclaration(node) ||
    (ts.isExportDeclaration(node) && !!node.moduleSpecifier) ||
    (ts.isCallExpression(node) &&
      node.expression.kind === ts.SyntaxKind.ImportKeyword) ||
    ts.forEachChild(node, visit) === true
  return visit(sourceFile)
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
  const { ast } = await parse(source, { position: false })
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
      if (hasImport(text)) throw unsupported(file, "an import in a <script>")
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
    if (seen) blankLines.push(/\n[^\S\n]*\n/.test(gap))
    seen = true
    gap = ""
  }
  return { blankLines, body, frontmatter, scripts, styles }
}

export const parseExample = async (source, file = "Example.astro") => {
  const { blankLines, body, frontmatter, scripts, styles } = await readExample(
    source,
    file,
  )
  const { consts, imports, typeImports } = readFrontmatter(frontmatter, file)
  const usedAsHtml = new Set(
    [...source.matchAll(/set:html=\{\s*([\w$]+)\s*\}/g)].map(
      (match) => match[1],
    ),
  )
  const markup = new Map()
  for (const item of consts.filter(({ name }) => usedAsHtml.has(name))) {
    if (item.value === undefined) {
      throw unsupported(file, `set:html={${item.name}} with a non-string`)
    }
    const { ast: parsed } = await parse(item.value, { position: false })
    if (item.comments.length > 0) {
      throw unsupported(file, `a comment on the set:html const ${item.name}`)
    }
    markup.set(item.name, { nodes: parsed.children, uses: 0 })
  }
  const arrays = new Map(
    consts
      .filter(({ items }) => Array.isArray(items))
      .map(({ items, name }) => [name, items]),
  )
  const context = { arrays, file, imports, markup, slotHost: false }
  const tree = toTree(body, context)
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

const attributeValue = (value) =>
  value.replace(/&(?=[a-zA-Z#][a-zA-Z0-9]*;)/g, "&amp;").replace(/"/g, "&quot;")

const markupAttributes = (node, expression, braces) =>
  node.attributes
    .map((item) => {
      if (item.kind === "boolean") return item.name
      if (braces && node.component && NUMERIC_ATTRIBUTES.includes(item.name)) {
        if (item.kind === "string" && /^-?\d+$/.test(item.value)) {
          return expression({ ...item, kind: "expression" })
        }
      }
      if (item.kind === "string" && !(braces && /[{}]/.test(item.value))) {
        if (!item.value.includes('"') || item.value.includes("'")) {
          return `${item.name}="${attributeValue(item.value)}"`
        }
        return braces
          ? expression({ ...item, value: `'${item.value}'` })
          : `${item.name}='${item.value}'`
      }
      return expression(
        item.kind === "string"
          ? { ...item, value: JSON.stringify(item.value) }
          : item,
      )
    })
    .join(" ")

const openTag = (name, attributes) =>
  attributes ? `<${name} ${attributes}` : `<${name}`

const singleQuoted = (code) => {
  const scanner = ts.createScanner(ts.ScriptTarget.Latest, false)
  scanner.setText(code)
  let result = ""
  let position = 0
  for (
    let token = scanner.scan();
    token !== ts.SyntaxKind.EndOfFileToken;
    token = scanner.scan()
  ) {
    if (token === ts.SyntaxKind.StringLiteral) {
      const start = scanner.getTokenStart()
      const text = scanner.getTokenValue()
      result += code.slice(position, start)
      result += `'${text.replace(/\\/g, "\\\\").replace(/'/g, "\\'")}'`
      position = scanner.getTokenEnd()
    }
  }
  return result + code.slice(position)
}

const markupTarget = (framework) => {
  const vue = framework === "vue"
  const emit = (nodes, html) =>
    nodes
      .map((node) => {
        if (node.type === "text") return node.value
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
        if (node.type === "fragment") {
          return slotWrapper(node.slot, emit(node.children, html))
        }
        return node.slot
          ? slotWrapper(node.slot, element({ ...node, slot: undefined }, html))
          : element(node, html)
      })
      .join("")
  const slotWrapper = (slot, content) =>
    vue
      ? `<template #${slot}>${content}</template>`
      : `{#snippet ${slotProp(slot)}()}${content}{/snippet}`
  const expression = (item) =>
    vue
      ? item.name === "v-for"
        ? `v-for="${item.value}"`
        : `:${item.name}="${attributeValue(singleQuoted(item.value))}"`
      : `${item.name}={${item.value}}`
  const element = (node, html) => {
    const attributes = markupAttributes(node, expression, !vue)
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

const toSvelte = (example) => {
  const emit = markupTarget("svelte")
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
  const emit = markupTarget("vue")
  const script = [importLine(example, "vue"), ...declarations(example)]
    .filter(Boolean)
    .join("\n\n")
  const styles = example.styles
    .map((css) => `\n\n<style>\n${css}\n</style>`)
    .join("")
  return `${script ? `<script setup lang="ts">\n${script}\n</script>\n\n` : ""}<template>\n${emit(example.tree, example.markup)}\n</template>${styles}\n`
}

const styleObject = (css) =>
  `{{ ${css
    .split(";")
    .map((declaration) => declaration.trim())
    .filter(Boolean)
    .map((declaration) => {
      const colon = declaration.indexOf(":")
      const property = declaration.slice(0, colon).trim()
      const key = property.startsWith("--")
        ? JSON.stringify(property)
        : property.replace(/-(\w)/g, (_, letter) => letter.toUpperCase())
      return `${key}: ${JSON.stringify(declaration.slice(colon + 1).trim())}`
    })
    .join(", ")} }}`

const isSorted = (names) =>
  names.length > 1 &&
  names.every(
    (name, index) =>
      index === 0 || names[index - 1].localeCompare(name, "en") <= 0,
  )

const jsxText = (value) =>
  value.replace(/[{}>]/g, (character) => `{${JSON.stringify(character)}}`)

const jsxString = (name, value) =>
  !value.includes('"')
    ? `${name}="${value}"`
    : !value.includes("'")
      ? `${name}='${value}'`
      : `${name}={${JSON.stringify(value)}}`

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

const reactProps = (node, context) => {
  const selected =
    node.name === "Select"
      ? node.children
          .filter(
            (child) => child.type === "element" && child.name === "option",
          )
          .find((option) =>
            option.attributes.some((item) => item.name === "selected"),
          )
      : undefined
  const readonly = node.attributes.some((item) => item.name === "readonly")
  const props = node.attributes.map((item) => {
    let name = REACT_ATTRIBUTES[item.name] ?? item.name
    if (item.name === "checked") name = "defaultChecked"
    if (
      item.name === "value" &&
      !readonly &&
      (REACT_DEFAULT_VALUE.includes(node.name) ||
        (!node.component && ["input", "textarea"].includes(node.name)))
    ) {
      name = "defaultValue"
    }
    if (name.includes("-") && !/^(aria|data)-/.test(name)) {
      throw unsupported(context.file, `the attribute ${item.name}`, "React")
    }
    if (item.kind === "boolean") return { code: name, name }
    if (
      NUMERIC_ATTRIBUTES.includes(item.name) &&
      item.kind === "string" &&
      /^-?\d+$/.test(item.value)
    ) {
      return { code: `${name}={${item.value}}`, name }
    }
    if (item.name === "style" && item.kind === "string") {
      return { code: `${name}=${styleObject(item.value)}`, name }
    }
    if (item.kind === "string") {
      return { code: jsxString(name, item.value), name }
    }
    return { code: `${name}={${item.value}}`, name }
  })
  if (selected) {
    const value =
      selected.attributes.find((item) => item.name === "value")?.value ??
      selected.children
        .map((child) => child.value ?? "")
        .join("")
        .trim()
    props.push({
      code: `defaultValue=${JSON.stringify(value)}`,
      name: "defaultValue",
    })
  }
  const slots = node.children
    .filter((child) => child.slot)
    .map((child) => {
      const name = slotProp(child.slot)
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
        return { code: jsxString(name, text), name }
      }
      return { code: `${name}={${reactExpression(content, context)}}`, name }
    })
  const all = isSorted(node.attributes.map(({ name }) => name))
    ? [...props, ...slots].toSorted((a, b) =>
        a.name.localeCompare(b.name, "en"),
      )
    : [...props, ...slots]
  return all.map(({ code }) => code).join(" ")
}

const reactChildren = (nodes) => {
  const merged = []
  for (const node of nodes) {
    const previous = merged.at(-1)
    if (node.type === "text" && previous?.type === "text") {
      merged[merged.length - 1] = {
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
  const children = reactChildren(nodes.filter((node) => !node.slot))
  return children
    .map((node, index) => {
      if (node.type === "text") {
        if (!node.value.trim()) {
          if (!/\n/.test(node.value)) return " "
          return /\n[^\n]*\n/.test(node.value) ? "\n\n" : "\n"
        }
        let text = node.value.replace(/\s+/g, " ")
        if (index === 0) text = text.trimStart()
        if (index === children.length - 1) text = text.trimEnd()
        return jsxText(text)
      }
      if (node.type === "comment") return `{/*${node.value}*/}`
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
  const props = reactProps(node, context)
  const attributes = key ? `key={${key}}${props ? ` ${props}` : ""}` : props
  const children =
    node.name === "Select"
      ? node.children.map((child) =>
          child.type === "element" && child.name === "option"
            ? {
                ...child,
                attributes: child.attributes.filter(
                  (item) => item.name !== "selected",
                ),
              }
            : child,
        )
      : node.children
  const content = reactNodes(children, context)
  if (VOID_ELEMENTS.has(node.name) || (!content.trim() && node.component)) {
    return `${openTag(node.name, attributes)} />`
  }
  return `${openTag(node.name, attributes)}>${content}</${node.name}>`
}

const toReact = (example, name, file = `${name}.astro`) => {
  const context = { file, markup: example.markup }
  const components = usedComponents(example)
  const functionName = components.includes(name) ? `${name}Example` : name
  const shared = [...example.markup.values()]
    .filter((item) => item.shared)
    .map(
      (item) => `const ${item.name} = (${reactExpression(item.tree, context)})`,
    )
  const header = [
    importLine(example, "react"),
    ...declarations(example),
    ...shared,
  ]
    .filter(Boolean)
    .join("\n\n")
  const styles = example.styles.map(
    (css) => `\n<style>{\`\n${indent(css, 8)}\n      \`}</style>`,
  )
  const body = reactExpression(example.tree, context, styles.join(""))
  return `${header ? `${header}\n\n` : ""}export default function ${functionName}() {\n  return (${body})\n}\n`
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

const reactStyleIndent = (code) =>
  code.replace(
    /^( *)<style>\{`\n([\s\S]*?)\n *`\}<\/style>/gm,
    (_, spaces, css) =>
      `${spaces}<style>{\`\n${indent(dedent(css), spaces.length + 2)}\n${spaces}\`}</style>`,
  )

export const convertExample = async (source, framework, file) => {
  const name = file
    .split("/")
    .at(-1)
    .replace(/\.astro$/, "")
  const example = await parseExample(source, file)
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
      await prettierFormat(toReact(example, name, file), target),
    )
  }
  if (framework === "svelte") {
    return prettierFormat(toSvelte(example), target)
  }
  return prettierFormat(toVue(example), target)
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
        ? [
            'import { activateIndeterminate } from "opui-css/css/js/checkbox.js"',
            "",
            "activateIndeterminate()",
          ]
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

const INLINE_PADDING = new RegExp(
  `(<(?!(?:${[...VOID_ELEMENTS].join("|")})\\b)[a-z][\\w-]*\\b[^<>]*>)\\s+(?=[^\\s<])|(?<=[^\\s>])\\s+(</[a-z][\\w-]*>)`,
  "g",
)

const topLevelBreaks = (html, blankLines) => {
  const nodes = parseFragment(html, {
    sourceCodeLocationInfo: true,
  }).childNodes.filter((node) => node.sourceCodeLocation)
  const elements = nodes.filter((node) => node.tagName)
  if (
    elements.length !== blankLines.length + 1 ||
    nodes.some((node) => !node.tagName && node.value?.trim())
  ) {
    return html
  }
  return elements
    .map((node, index) => {
      const { endOffset, startOffset } = node.sourceCodeLocation
      return `${index > 0 && blankLines[index - 1] ? "\n" : ""}${html.slice(startOffset, endOffset)}`
    })
    .join("\n")
}

const BOOLEAN_ATTRIBUTES = new Set([
  "allowfullscreen",
  "async",
  "autofocus",
  "autoplay",
  "checked",
  "controls",
  "default",
  "defer",
  "disabled",
  "formnovalidate",
  "hidden",
  "inert",
  "loop",
  "multiple",
  "muted",
  "nomodule",
  "novalidate",
  "open",
  "playsinline",
  "popover",
  "readonly",
  "required",
  "reversed",
  "selected",
])

const BLOCK_ELEMENTS =
  "address|article|aside|blockquote|caption|dd|details|dialog|div|dl|dt|fieldset|figcaption|figure|footer|form|h[1-6]|header|hgroup|hr|legend|li|main|nav|ol|p|pre|section|summary|table|tbody|td|tfoot|th|thead|tr|ul"

const tidyTag = (tag) =>
  tag.replace(
    /(\s+)([^\s=<>/"']+)(?:=("[^"]*"|'[^']*'|[^\s>]+))?/g,
    (match, space, name, value) => {
      if (name === "slot") return ""
      if (value !== undefined) {
        return `${space}${name}=${value.replace(/&amp;(?![a-zA-Z][a-zA-Z0-9]*;|#)/g, "&")}`
      }
      return BOOLEAN_ATTRIBUTES.has(name) || /^(aria|data)-/.test(name)
        ? match
        : `${space}${name}=""`
    },
  )

const tidyText = (text) => text.replace(/&quot;/g, '"').replace(/&#39;/g, "'")

const layoutClasses = async () => {
  const classes = new Map()
  for (const file of await readdir(cssDir)) {
    if (!file.endsWith(".css")) continue
    postcss
      .parse(await readFile(join(cssDir, file), "utf8"))
      .walkRules((rule) => {
        if (rule.parent?.type !== "atrule" || rule.parent.name !== "layer") {
          return
        }
        const display = rule.nodes.find(
          (node) => node.type === "decl" && node.prop === "display",
        )?.value
        if (!/^(inline-)?(flex|grid)$/.test(display ?? "")) return
        const selectors = rule.selector
          .replace(/^:where\(([\s\S]*)\)$/, "$1")
          .split(",")
          .map((selector) => selector.trim())
        if (selectors.every((selector) => /^\.ui-[\w-]+$/.test(selector))) {
          for (const selector of selectors) {
            classes.set(selector.slice(1), display)
          }
        }
      })
  }
  return classes
}

const BLOCK_TAGS = new RegExp(`^(?:${BLOCK_ELEMENTS})$`)

const spreadLayoutChildren = (html, classes) => {
  const edits = []
  const displays = (node) =>
    (node.attrs?.find(({ name }) => name === "class")?.value ?? "")
      .split(/\s+/)
      .map((name) => classes.get(name))
      .filter(Boolean)
  const isBlock = (node) =>
    !!node?.tagName &&
    (BLOCK_TAGS.test(node.tagName) ||
      displays(node).some((display) => !display.startsWith("inline")))
  const visit = (children, layout, endTag) => {
    children.forEach((child, index) => {
      const previous = children[index - 1]
      const location = child.sourceCodeLocation
      if (!location) return
      if (child.tagName) {
        if (
          (!previous && endTag !== undefined && (layout || isBlock(child))) ||
          (previous?.tagName && (layout || isBlock(child) || isBlock(previous)))
        ) {
          edits.push({ end: location.startOffset, start: location.startOffset })
        }
        visit(
          child.content?.childNodes ?? child.childNodes,
          displays(child).length > 0,
          child.sourceCodeLocation.endTag?.startOffset,
        )
      } else if (layout && child.value !== undefined && !child.value.trim()) {
        if (!child.value.includes("\n")) {
          edits.push({ end: location.endOffset, start: location.startOffset })
        }
      }
    })
    const last = children.at(-1)
    if (endTag !== undefined && last?.tagName && (layout || isBlock(last))) {
      edits.push({ end: endTag, start: endTag })
    }
  }
  visit(parseFragment(html, { sourceCodeLocationInfo: true }).childNodes, false)
  return edits
    .toSorted((a, b) => b.start - a.start)
    .reduce(
      (result, { end, start }) =>
        `${result.slice(0, start)}\n${result.slice(end)}`,
      html,
    )
}

const collapseWhitespace = (html) => {
  const kept = []
  return html
    .replace(
      /(<(pre|textarea)\b[^>]*>)([\s\S]*?)(<\/\2>)/g,
      (_, open, _tag, content, close) => {
        kept.push(content)
        return `${open}\uE000${kept.length - 1}\uE000${close}`
      },
    )
    .replace(/>\s*(<!--[\s\S]*?-->)\s*</g, ">$1<")
    .replace(/>\s+/g, ">\n")
    .replace(/\s+</g, "\n<")
    .replace(/[ \t]*\n\s*/g, "\n")
    .replace(INLINE_PADDING, (_, open, close) => open ?? close)
    .replace(/\uE000(\d+)\uE000/g, (_, index) => kept[index])
}

export const cleanRender = (html, blankLines = [], classes = new Map()) =>
  spreadLayoutChildren(
    topLevelBreaks(
      collapseWhitespace(
        clean(html)
          .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/g, "")
          .replace(/<link\b[^>]*>/g, "")
          .replace(
            /<selectedcontent>(?!<\/selectedcontent>)/g,
            "$&</selectedcontent>",
          )
          .split(/(<!--[\s\S]*?-->|<[^<>]*>)/)
          .map((part, index) =>
            index % 2 === 0
              ? tidyText(part)
              : part.startsWith("<!--")
                ? part
                : tidyTag(part),
          )
          .join(""),
      ).trim(),
      blankLines,
    ),
    classes,
  )

export const htmlFromRender = async (rendered, source, file, classes) => {
  const example = await readExample(source, file)
  const markup = cleanRender(rendered, example.blankLines, classes)
  const imports = scriptImports(markup, await elementTags())
  const modules = [
    imports.join("\n"),
    ...example.scripts.map((script) => stripTypes(script).trim()),
  ].filter(Boolean)
  const parts = [
    markup,
    ...example.styles.map((css) => `<style>\n${indent(css, 2)}\n</style>`),
    ...modules.map((code) => `<script type="module">\n${code}\n</script>`),
  ]
  return prettierFormat(
    `${parts.join("\n\n")}\n`,
    file.replace(/\.astro$/, ".html"),
  )
}

const createRenderer = async () => {
  const { getViteConfig } = await import("astro/config")
  const { createViteServer } = await import("vitest/node")
  const config = await getViteConfig(
    { logLevel: "error" },
    { logLevel: "error" },
  )({
    command: "serve",
    mode: "development",
  })
  const server = await createViteServer({
    ...config,
    appType: "custom",
    configFile: false,
    logLevel: "error",
    optimizeDeps: { noDiscovery: true },
    server: { hmr: false, middlewareMode: true, ws: false },
  })
  const { experimental_AstroContainer } =
    await server.ssrLoadModule("astro/container")
  const container = await experimental_AstroContainer.create()
  return {
    close: () => server.close().catch(() => {}),
    render: async (key, source) => {
      const module = await server.ssrLoadModule(
        `/src/component-examples/${key}.astro`,
      )
      return container.renderToString(module.default, {
        locals: { $id: createExampleIdGenerator(key, source) },
      })
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
  const classes = await layoutClasses()
  const renderer = await createRenderer()
  const outputs = new Map()
  const problems = handWrittenProblems(handWritten, (file) =>
    existsSync(join(root, file)),
  )
  try {
    for (const key of keys) {
      const astroFile = `src/component-examples/${key}.astro`
      const source = await readFile(join(root, astroFile), "utf8")
      for (const framework of generatedTargets(key, handWritten)) {
        const target = `src/component-examples/${key}${TARGETS[framework]}`
        try {
          if (framework === "html") {
            outputs.set(
              target,
              await htmlFromRender(
                await renderer.render(key, source),
                source,
                astroFile,
                classes,
              ),
            )
          } else {
            outputs.set(
              target,
              await convertExample(source, framework, astroFile),
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
