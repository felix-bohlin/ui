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
import {
  nunjucksKey,
  nunjucksString,
  nunjucksText,
  nunjucksValue,
} from "./component-nunjucks-expression.mjs"
import { join as joinParts } from "./component-fragment.mjs"
import { boundComponents } from "./component-models.mjs"
import { unwrap } from "./component-shared.mjs"
import {
  attributeText,
  decodeText,
  jsxAttribute,
  markupAttribute,
  markupText,
  templateLiteral,
} from "./example-encoders.mjs"
import {
  cleanRender,
  declarations as styleDeclarations,
  meaningChange,
  meaningOf,
} from "./example-html.mjs"
import {
  assignExampleIds,
  createExampleIdPlaceholders,
  exampleKeyOf,
  ID_PLACEHOLDER,
  idBaseOf,
} from "./example-ids.mjs"
import { reactPropsOf } from "./example-react-props.mjs"
import {
  byAttributeName,
  EXAMPLES_DIR,
  generatedTargets,
  handWrittenProblems,
  readHandWritten,
  SOURCE_DIRS,
  staleProblems,
  TARGETS,
} from "./example-targets.mjs"
import { BLANK_LINE, markWhitespace, RAW_TEXT } from "./example-whitespace.mjs"
import { formatStably } from "./format.mjs"
import { parseHtml, VOID_ELEMENTS } from "./html-tokens.mjs"
import { attributeNode } from "./markup-nodes.mjs"
import {
  JSX_DIALECTS,
  jsxAttributeCode,
  jsxName,
  jsxPrinter,
  renderedText as jsxRenderedText,
} from "./print-jsx.mjs"
import {
  renderedText as svelteRenderedText,
  svelteAttribute,
  svelteEach,
  svelteElement,
  svelteExpression,
  svelteRender,
  svelteSnippet,
} from "./print-svelte.mjs"
import {
  renderedText as vueRenderedText,
  slotInputs,
  vueAttribute,
  vueElement,
  vueFor,
  vueInterpolation,
  vueTemplate,
} from "./print-vue.mjs"

const root = fileURLToPath(new URL("..", import.meta.url))
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

const MAP_KEY_ORDER = ["id", "value", "name", "title"]

const MARKUP = "__markup__"

const unsupported = (file, what, target, hint) =>
  new Error(
    `${file} uses ${what}, which scripts/build-examples.mjs can't convert${target ? ` to ${target}` : ""}: ${hint ?? "change the example, or support the construct in scripts/build-examples.mjs"}`,
  )

const NOT_LITERAL = Symbol("not a literal")

const isFunction = (node) =>
  ts.isArrowFunction(node) || ts.isFunctionExpression(node)

const passesFunction = (value, seen = new WeakSet()) => {
  if (!value || typeof value !== "object" || seen.has(value)) return false
  seen.add(value)
  if (value.kind === "expression" && typeof value.code === "string") {
    const sourceFile = ts.createSourceFile(
      "expression.ts",
      `(${value.code})`,
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
  node = unwrap(node, { casts: true })
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
          isFunction(unwrap(declaration.initializer, { casts: true }))
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
        const read = attributeNode(item, (what) =>
          unsupported(context.file, what),
        )
        return read.kind === "static" && read.name === "style"
          ? { ...read, value: styleDeclarations(read.value) }
          : read
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
          slot,
          tag: node.name,
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
  return unwrap(statement.expression, { casts: true })
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
  const body = unwrap(arrow.body, { casts: true })
  if (!ts.isIdentifier(body) || body.text !== MARKUP) {
    throw unsupported(
      context.file,
      `the ${array}.map callback body, which must be one element`,
    )
  }
  return {
    item: paramText(param.name),
    key: mapKey(array, items, param, context.file),
    list: array,
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
  const [row] = toTree([child], { ...context, slotHost: false })
  return {
    ...mapArrow(expression, context),
    children: [row],
    row,
    type: "each",
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
      if (node.type === "element" && node.component) names.add(node.tag)
      if (node.children) walk(node.children)
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

const startingProps = (models, framework, node) =>
  new Map(
    node.component
      ? (models.get(node.tag)?.[framework].props.initial ?? [])
      : [],
  )

const kebabCase = (name) =>
  name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)

const markupTarget = (framework, textParts, models) => {
  const vue = framework === "vue"
  const isBlankText = (node) => node.type === "text" && !node.value.trim()
  const markupText = (node, index, nodes) => {
    const content = nodes.filter((item) => !item.slot)
    const at = content.indexOf(node)
    const blank = isBlankText(node)
    return (vue ? vueRenderedText : svelteRenderedText)(textParts(node), {
      between:
        blank &&
        nodes[index - 1]?.type !== "text" &&
        nodes[index + 1]?.type !== "text",
      blank,
      leading: content.slice(0, at).every(isBlankText),
      trailing: content.slice(at + 1).every(isBlankText),
    })
  }
  const emit = (nodes, html, slotted = new Set()) =>
    nodes
      .map((node, index) => {
        if (node.type === "text") return markupText(node, index, nodes)
        if (node.type === "comment") return `<!--${node.value}-->`
        if (node.type === "expression") {
          return (vue ? vueInterpolation : svelteExpression)(node.code).code
        }
        if (node.type === "html") {
          const item = html.get(node.name)
          return item.shared && !vue
            ? svelteRender(node.name)
            : emit(item.tree, html)
        }
        if (node.type === "each") {
          return vue
            ? element(node.row, html, { clause: vueFor(node) })
            : svelteEach(node, `\n${element(node.row, html)}\n`).code
        }
        const block = (code) =>
          `${/\s$/.test(nodes[index - 1]?.value ?? "") ? "" : "\n"}${code}${/^\s/.test(nodes[index + 1]?.value ?? "") ? "" : "\n"}`
        if (node.type === "fragment") {
          return block(
            slotWrapper(node.slot, emit(node.children, html, slotted)),
          )
        }
        const options = { slotted: slotted.has(node) }
        return node.slot
          ? block(
              slotWrapper(
                node.slot,
                element({ ...node, slot: undefined }, html, options),
              ),
            )
          : element(node, html, options)
      })
      .join("")
  const slotWrapper = (slot, content) => {
    const inner = `${content.startsWith("<") ? "\n" : ""}${content}${content.endsWith(">") ? "\n" : ""}`
    return (
      vue
        ? vueTemplate(`#${slot}`, inner)
        : svelteSnippet(slotProp(slot), inner)
    ).code
  }
  const svelteDefaults = (node) => {
    if (vue || !node.component) return node
    const checked = reactPropsOf(node.tag, node.component)?.has(
      "defaultChecked",
    )
    return checked
      ? {
          ...node,
          attributes: node.attributes.map((item) =>
            item.name === "checked"
              ? { ...item, name: "defaultChecked" }
              : item,
          ),
        }
      : node
  }
  const starting = (node) => {
    const renamed = startingProps(models, framework, node)
    return renamed.size
      ? {
          ...node,
          attributes: node.attributes.map((item) =>
            renamed.has(item.name)
              ? {
                  ...item,
                  name: vue
                    ? kebabCase(renamed.get(item.name))
                    : renamed.get(item.name),
                }
              : item,
          ),
        }
      : node
  }
  const element = (node, html, { clause, slotted = false } = {}) => {
    const attributes = joinParts(
      [
        ...(clause ? [clause] : []),
        ...starting(svelteDefaults(node)).attributes.map((item) =>
          vue
            ? vueAttribute(item, undefined, { slotted })
            : svelteAttribute(node, item),
        ),
      ],
      " ",
    )
    const children = emit(
      node.children,
      html,
      vue && node.component ? slotInputs(node.children) : undefined,
    )
    return (vue ? vueElement : svelteElement)(node, {
      attributes,
      content: children,
      emptyElements: "components",
    }).code
  }
  return emit
}

const NUNJUCKS_WIDTH = 80

const NUNJUCKS_BOOLEANS = new Set([
  "checked",
  "disabled",
  "hidden",
  "inert",
  "multiple",
  "open",
  "readonly",
  "required",
  "selected",
])

const spaces = (depth) => "  ".repeat(Math.max(depth, 0))

const columnOf = (text) => text.length - text.lastIndexOf("\n") - 1

const fits = (prefix, text) =>
  !text.includes("\n") && columnOf(prefix) + text.length <= NUNJUCKS_WIDTH

const nunjucksLiteral = (value, prefix, depth) => {
  if (typeof value === "string") return nunjucksString(value)
  if (typeof value === "number" || typeof value === "boolean") {
    return String(value)
  }
  if (value === null) return "none"
  const array = Array.isArray(value)
  const entries = array
    ? value.map((item) => [undefined, item])
    : Object.entries(value)
  if (entries.length === 0) return array ? "[]" : "{}"
  const [open, close] = array ? ["[", "]"] : ["{ ", " }"]
  const entry = ([key, item], at, level) => {
    const head = key === undefined ? "" : `${nunjucksKey(key)}: `
    return `${head}${nunjucksLiteral(item, `${at}${head}`, level)}`
  }
  const flat = `${open}${entries.map((item) => entry(item, "", depth)).join(", ")}${close}`
  if (fits(prefix, flat)) return flat
  const inner = spaces(depth + 1)
  return `${open.trim()}\n${entries
    .map((item) => `${inner}${entry(item, inner, depth + 1)}`)
    .join(",\n")}\n${spaces(depth)}${close.trim()}`
}

const nunjucksDict = (entries, prefix, depth) => {
  if (entries.length === 0) return ""
  const flat = `{ ${entries.map(([key, value]) => `${nunjucksKey(key)}: ${value}`).join(", ")} }`
  if (
    fits(prefix, flat) &&
    !entries.some(([, value]) => value.includes("\n"))
  ) {
    return flat
  }
  const inner = spaces(depth + 1)
  return `{\n${entries
    .map(([key, value]) => `${inner}${nunjucksKey(key)}: ${value}`)
    .join(",\n")}\n${spaces(depth)}}`
}

const singular = (name) =>
  name.endsWith("ies")
    ? `${name.slice(0, -3)}y`
    : name.endsWith("s") && name.length > 1
      ? name.slice(0, -1)
      : `${name}Item`

const toNunjucksExample = (example, file, modules) => {
  const consts = new Map(example.consts.map((item) => [item.name, item]))
  const literalOf = (code) => {
    const node = parseExpression(code, file)
    const value = literalValue(node)
    return value === NOT_LITERAL ? undefined : { value }
  }
  const expression = (code, scope) => {
    try {
      return nunjucksValue(code, { file, ...scope })
    } catch (error) {
      throw unsupported(
        file,
        `the expression {${code}}`,
        "Nunjucks",
        error.message,
      )
    }
  }
  const attribute = (item, scope) => {
    if (item.kind === "boolean") return { text: item.name }
    if (item.kind === "static") {
      return {
        text: nunjucksText(markupAttribute(item.name, item.value, false)),
      }
    }
    const literal = literalOf(item.code)
    if (literal) {
      const { value } = literal
      if (value === true) return { text: item.name }
      if (value === false || value === null) return undefined
      if (typeof value === "string" || typeof value === "number") {
        return {
          text: nunjucksText(markupAttribute(item.name, String(value), false)),
        }
      }
      throw unsupported(
        file,
        `the attribute ${item.name}={${item.code}}`,
        "Nunjucks",
      )
    }
    const node = parseExpression(item.code, file)
    if (ts.isTemplateExpression(node)) {
      const parts = [
        attributeText(node.head.text),
        ...node.templateSpans.flatMap((span) => [
          `{{ ${expression(span.expression.getText(), scope).text} }}`,
          attributeText(span.literal.text),
        ]),
      ]
      return { text: `${item.name}="${parts.join("")}"` }
    }
    const value = expression(item.code, scope).text
    if (NUNJUCKS_BOOLEANS.has(item.name)) {
      return { condition: value, text: item.name }
    }
    return { text: `${item.name}="{{ ${value} }}"` }
  }
  const propValue = (item, scope, prefix, depth) => {
    if (item.kind === "boolean") return "true"
    if (item.kind === "static") return nunjucksString(item.value)
    const literal = literalOf(item.code)
    if (literal) return nunjucksLiteral(literal.value, prefix, depth)
    return expression(item.code, scope).text
  }
  const isBlank = (node) => node?.type === "text" && !node.value.trim()
  const print = (nodes, out, context) => {
    nodes.forEach((node, index) => {
      if (node.type === "text") {
        if (context.raw) {
          out.text += nunjucksText(node.value)
          return
        }
        const last = index === nodes.length - 1
        out.text += nunjucksText(node.value).replace(
          /[\t\n\f\r ]*\n[\t\n\f\r ]*/g,
          (run, offset, whole) =>
            `${BLANK_LINE.test(run) ? "\n\n" : "\n"}${spaces(
              last && offset + run.length === whole.length
                ? context.depth - 1
                : context.depth,
            )}`,
        )
        return
      }
      if (node.type === "comment") {
        out.text += `<!--${node.value}-->`
        return
      }
      if (node.type === "expression") {
        out.text += `{{ ${expression(node.code, context.scope).text} }}`
        return
      }
      if (node.type === "html") {
        const item = example.markup.get(node.name)
        if (item.shared) out.text += `{{ ${node.name} | safe }}`
        else print(item.tree, out, context)
        return
      }
      if (node.type === "each") {
        const taken = new Set([...consts.keys(), ...context.scope.locals])
        const destructured = node.item.startsWith("{")
        const name = destructured
          ? ([singular(node.list), "entry"].find((item) => !taken.has(item)) ??
            `${singular(node.list)}${taken.size}`)
          : node.item
        const renames = new Map(context.scope.renames)
        if (destructured) {
          for (const pair of node.item.slice(1, -1).split(",")) {
            const [key, local = key] = pair
              .split(":")
              .map((part) => part.trim())
            renames.set(local, { level: 0, text: `${name}.${key}` })
          }
        }
        const scope = {
          locals: new Set([
            ...context.scope.locals,
            ...(destructured ? [] : [name]),
          ]),
          renames,
        }
        out.text += `{% for ${name} in ${node.list} -%}\n${spaces(context.depth + 1)}`
        print([node.row], out, {
          ...context,
          depth: context.depth + 1,
          scope,
        })
        out.text += `\n${spaces(context.depth)}{%- endfor %}`
        return
      }
      if (node.component) {
        component(node, out, context)
        return
      }
      element(node, out, context)
    })
  }
  const element = (node, out, context) => {
    const attributes = node.attributes
      .map((item) => attribute(item, context.scope))
      .filter(Boolean)
    const piece = ({ condition, text }, before) =>
      condition
        ? `{% if ${condition} %}${before}${text}{% endif %}`
        : `${before}${text}`
    const flat = attributes.map((item) => piece(item, " ")).join("")
    const end = VOID_ELEMENTS.has(node.tag) ? " />" : ">"
    if (fits(out.text, `<${node.tag}${flat}${end}`)) {
      out.text += `<${node.tag}${flat}${end}`
    } else {
      const inner = spaces(context.depth + 1)
      out.text += `<${node.tag}${attributes
        .map((item) => `\n${inner}${piece(item, "")}`)
        .join("")}\n${spaces(context.depth)}${end.trim()}`
    }
    if (VOID_ELEMENTS.has(node.tag)) return
    print(node.children, out, {
      ...context,
      depth: context.depth + 1,
      raw: context.raw || RAW_TEXT.has(node.tag),
    })
    out.text += `</${node.tag}>`
  }
  const slotValue = (child, depth, context) => {
    const content =
      child.type === "fragment"
        ? child.children
        : [{ ...child, slot: undefined }]
    if (
      content.every((item) => item.type === "text") &&
      !content.some((item) => item.value.includes("\n"))
    ) {
      return {
        text: nunjucksString(content.map((item) => item.value).join("")),
      }
    }
    const out = { text: "" }
    print(content, out, {
      ...context,
      depth: isBlank(content[0]) ? depth + 1 : depth,
    })
    return { markup: out.text }
  }
  const component = (node, out, context) => {
    const slotted = node.children.filter((child) => child.slot)
    const children = []
    for (const child of node.children) {
      if (!child.slot) children.push(child)
      else if (isBlank(children.at(-1))) children.pop()
    }
    const sets = []
    const slots = slotted
      .map((child) => {
        const name = slotProp(child.slot)
        const value = slotValue(child, context.depth, context)
        if (value.text) return [name, value.text]
        sets.push(`{% set ${name} %}${value.markup}{% endset %}`)
        return [name, name]
      })
      .toSorted(([a], [b]) => byAttributeName(a, b))
    for (const set of sets) {
      out.text += `${set}\n${spaces(context.depth)}`
    }
    const props = node.attributes.map((item) => [item.name, item])
    const prefix = (head) => `${out.text}${head}`
    const call = children.length > 0 && !children.every(isBlank)
    const head = call ? `{% call ${node.tag}(` : `{{ ${node.tag}(`
    const entries = props.map(([name, item]) => [
      name,
      propValue(
        item,
        context.scope,
        `${prefix(head)}${nunjucksKey(name)}: `,
        context.depth + 1,
      ),
    ])
    if (slots.length > 0) {
      entries.push([
        "slots",
        nunjucksDict(slots, prefix(`${head}slots: `), context.depth + 1),
      ])
    }
    entries.sort(([a], [b]) => byAttributeName(a, b))
    const dict = nunjucksDict(entries, prefix(head), context.depth)
    if (!call) {
      out.text += `${head}${dict}) }}`
      return
    }
    out.text += `${head}${dict}) %}`
    print(children, out, { ...context, depth: context.depth + 1 })
    out.text += "{% endcall %}"
  }
  const names = usedComponents(example)
  const imports = `{% from "opui/index.njk" import ${names.join(", ")} %}`
  const header = [
    ...(names.length > 0
      ? [
          imports.length <= NUNJUCKS_WIDTH
            ? imports
            : `{% from "opui/index.njk" import\n${names.map((name) => `  ${name}`).join(",\n")}\n%}`,
        ]
      : []),
    ...example.consts.map(({ items, name }) => {
      const head = `{% set ${name} = `
      return `${head}${nunjucksLiteral(items, head, 0)} %}`
    }),
    ...[...example.markup.values()]
      .filter((item) => item.shared)
      .map((item) => {
        const out = { text: `{% set ${item.name} %}` }
        print(item.tree, out, {
          depth: isBlank(item.tree[0]) ? 1 : 0,
          scope: { locals: new Set(), renames: new Map() },
        })
        return `${out.text}{% endset %}`
      }),
  ]
  const out = { text: "" }
  print(example.tree, out, {
    depth: 0,
    scope: { locals: new Set(consts.keys()), renames: new Map() },
  })
  return `${[
    header.join("\n"),
    out.text,
    ...example.styles.map((css) => `<style>\n${indent(css, 2)}\n</style>`),
    ...modules.map(
      (code) => `<script type="module">\n${indent(code, 2)}\n</script>`,
    ),
  ]
    .filter(Boolean)
    .join("\n\n")}\n`
}

const SVG_TEXT_CONTENT = new Set(["text", "textPath", "tspan"])

const mixedSvgText = (nodes) =>
  nodes.some(
    (node) =>
      node.type === "element" &&
      ((SVG_TEXT_CONTENT.has(node.tag) &&
        node.children.some((child) => child.type === "element") &&
        node.children.some(
          (child) => child.type === "text" && child.value.trim(),
        )) ||
        mixedSvgText(node.children)),
  )

const toSvelte = (example, textParts, models) => {
  const emit = markupTarget("svelte", textParts, models)
  const snippets = [...example.markup.values()]
    .filter((item) => item.shared)
    .map(
      (item) =>
        `${svelteSnippet(item.name, `\n${emit(item.tree, example.markup)}\n`).code}\n\n`,
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

const toVue = (example, textParts, models) => {
  const emit = markupTarget("vue", textParts, models)
  const script = [importLine(example, "vue"), ...declarations(example)]
    .filter(Boolean)
    .join("\n\n")
  const styles = example.styles
    .map((css) => `\n\n<style>\n${css}\n</style>`)
    .join("")
  return `${script ? `<script setup lang="ts">\n${script}\n</script>\n\n` : ""}<template>\n${emit(example.tree, example.markup)}\n</template>${styles}\n`
}

const valueIsState = (node, refuse) => {
  const attribute = (name) => node.attributes.find((item) => item.name === name)
  if (attribute("readonly")) return false
  if (node.component) return false
  if (node.tag === "textarea") return true
  if (node.tag !== "input") return false
  const type = attribute("type")
  if (type && type.kind !== "static") {
    throw refuse("an <input> with a dynamic type")
  }
  return !REACT_FIXED_VALUE_TYPES.includes(type?.value)
}

const startingName = (item, table, state) =>
  item.name === "checked" && table.has("defaultChecked")
    ? "defaultChecked"
    : table.has(state.initial.get(item.name))
      ? state.initial.get(item.name)
      : item.name === "value" && state.valueIsState && table.has("defaultValue")
        ? "defaultValue"
        : undefined

const jsxProps = (node, { dialect, markup, models, printer, refuse }) => {
  const { framework } = dialect
  const where = `<${node.tag}>`
  const table = dialect.propsOf(node.tag, node.component)
  if (!table) throw refuse(`${where}, which ${framework}'s types don't have`)
  const state = {
    ...dialect.formState(node, table, refuse),
    initial: startingProps(models, dialect.id, node),
    valueIsState: valueIsState(node, refuse),
  }
  const props = node.attributes.map((item) => {
    const name =
      startingName(item, table, state) ??
      jsxName(dialect, table, item.name, "refuse")
    if (!name) {
      throw refuse(
        `the attribute ${item.name} on ${where}, which ${framework}'s types for it don't have`,
      )
    }
    return {
      code: jsxAttributeCode(
        dialect,
        { item, name, table, where },
        { policy: "refuse", refuse },
      ),
      name,
    }
  })
  const slots = node.children
    .filter((child) => child.slot)
    .map((child) => {
      const name = slotProp(child.slot)
      if (!table.has(name)) {
        throw refuse(
          `the slot ${child.slot} of ${where}, which has no ${name} prop in ${framework}`,
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
      return {
        code: `${name}={${printer.branch(inlined(content, markup)).code}}`,
        name,
      }
    })
  const all = [...props, ...state.extra, ...slots]
  return {
    attributes: (node.component
      ? all.toSorted((a, b) => byAttributeName(a.name, b.name))
      : all
    ).map(({ code }) => code),
    children: state.children,
  }
}

const inlined = (nodes, markup) =>
  nodes.flatMap((node) =>
    node.type === "html" && !markup.get(node.name).shared
      ? markup.get(node.name).tree
      : [node],
  )

const toJsx = (framework, example, textParts, name, file, models) => {
  const dialect = JSX_DIALECTS[framework]
  const { markup } = example
  const refuse = (what) => unsupported(file, what, dialect.framework)
  const printer = jsxPrinter(dialect, {
    emptyElements: "components",
    other: (node, scope, { emit }) => {
      const item = markup.get(node.name)
      return item.shared
        ? `{${dialect.sharedRead(node.name)}}`
        : emit(item.tree, scope)
    },
    props: (node) =>
      jsxProps(node, { dialect, markup, models, printer, refuse }),
    refuse,
    text: jsxRenderedText(textParts),
  })
  const components = usedComponents(example)
  const functionName = components.includes(name) ? `${name}Example` : name
  const shared = [...markup.values()]
    .filter((item) => item.shared)
    .map(
      (item) =>
        `const ${item.name} = ${dialect.sharedMarkup(printer.branch(inlined(item.tree, markup))).code}`,
    )
  const header = [
    ...(dialect.clientFunctions &&
    (example.consts.some(({ fn }) => fn) ||
      passesFunction(example.tree) ||
      passesFunction([...markup.values()].map(({ tree }) => tree)))
      ? ['"use client"']
      : []),
    importLine(example, framework),
    ...declarations(example),
    ...shared,
  ]
    .filter(Boolean)
    .join("\n\n")
  const styles = example.styles.map(
    (css) =>
      `\n<style>{\`\n${indent(templateLiteral(css), 8)}\n      \`}</style>`,
  )
  const body = printer.branch(
    inlined(example.tree, markup),
    undefined,
    styles.join(""),
  ).code
  return `${dialect.pragma}${header ? `${header}\n\n` : ""}export default function ${functionName}() {\n  return (${body})\n}\n`
}

const jsxStyleIndent = (code) =>
  code.replace(
    /^( *)<style>\{`\n([\s\S]*?)\n *`\}<\/style>/gm,
    (_, spaces, css) =>
      `${spaces}<style>{\`\n${indent(dedent(css), spaces.length + 2)}\n${spaces}\`}</style>`,
  )

const toFramework = async (framework, example, textParts, file, modules) => {
  if (framework === "nunjucks") {
    return toNunjucksExample(
      example,
      file,
      await Promise.all(
        modules.map(async (code) =>
          (await formatStably(code, file.replace(/\.astro$/, ".js"))).trim(),
        ),
      ),
    )
  }
  if (example.scripts.length > 0) {
    throw unsupported(
      file,
      "a client <script>",
      framework,
      "write the React, Solid, Svelte and Vue files by hand and list them in scripts/hand-written-examples.json",
    )
  }
  const name = file
    .split("/")
    .at(-1)
    .replace(/\.astro$/, "")
  const target = file.replace(/\.astro$/, TARGETS[framework])
  const models = await boundComponents()
  if (framework in JSX_DIALECTS) {
    return jsxStyleIndent(
      await formatStably(
        toJsx(framework, example, textParts, name, file, models),
        target,
      ),
    )
  }
  if (mixedSvgText(example.tree)) {
    throw unsupported(
      file,
      "text next to an element inside an SVG <text>",
      framework,
      "oxfmt puts them on separate lines in Svelte and Vue, which renders a space: write the file by hand and list it in scripts/hand-written-examples.json",
    )
  }
  if (framework === "svelte") {
    return formatStably(toSvelte(example, textParts, models), target)
  }
  if (framework !== "vue") {
    throw unsupported(file, `the framework ${framework}`, framework)
  }
  return formatStably(toVue(example, textParts, models), target)
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
  const walk = (nodes, parent) => {
    for (const node of nodes) {
      if (!node.tagName) continue
      const element = {
        attrs: new Set(node.attrs.map(({ name }) => name)),
        classes: new Set(
          node.attrs.find(({ name }) => name === "class")?.value.split(/\s+/) ??
            [],
        ),
        parent,
        tag: node.tagName,
        values: new Map(node.attrs.map(({ name, value }) => [name, value])),
      }
      found.push(element)
      walk(node.content?.childNodes ?? node.childNodes, element)
    }
  }
  walk(parseFragment(markup).childNodes)
  return found
}

const HTML_SCRIPT_RULES = [
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
    covers: (path) => path === "elements/close-on-navigate.js",
    lines: (elements) =>
      elements.some(
        ({ attrs, tag }) =>
          tag === "dialog" && attrs.has("data-close-on-navigate"),
      )
        ? ['import "opui-css/elements/close-on-navigate.js"']
        : [],
  },
  {
    covers: (path) => path === "elements/drawer-swipe.js",
    lines: (elements) =>
      elements.some(
        ({ classes, tag, values }) =>
          tag === "dialog" &&
          (classes.has("ui-block-start") || classes.has("ui-block-end")) &&
          values.get("closedby")?.toLowerCase() !== "none",
      )
        ? ['import "opui-css/elements/drawer-swipe.js"']
        : [],
  },
  {
    covers: (path) => path === "elements/menu.js",
    lines: (elements) =>
      elements.some(
        (element) =>
          !element.attrs.has("data-keep-open") &&
          ((element.tag === "a" && element.attrs.has("href")) ||
            (element.tag === "button" &&
              ["reset", "submit"].includes(element.values.get("type")))) &&
          element.parent?.tag === "li" &&
          !!element.parent.parent?.classes.has("ui-menu"),
      )
        ? ['import "opui-css/elements/menu.js"']
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

const renderedMarkup = (rendered, example, file) =>
  cleanRender(assignExampleIds(rendered, exampleKeyOf(file), idBaseOf(file)), {
    css: example.styles,
    file,
  })

const scriptModules = async (markup, example) => {
  const imported = new Set(
    example.scripts.flatMap((script) => importsOf(script).modules),
  )
  const imports = scriptImports(markup, await elementTags()).filter(
    (line) => !imported.has(/"([^"]+)"/.exec(line)?.[1]),
  )
  return [
    imports.join("\n"),
    ...example.scripts.map((script) => stripTypes(script).trim()),
  ].filter(Boolean)
}

const toHtml = async (example, file, { markup, modules, nodes }) => {
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

const EXAMPLE_ASTRO_CONFIG = { compressHTML: false, logLevel: "error" }

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
      ...config.plugins,
    ],
    appType: "custom",
    configFile: false,
    logLevel: "error",
    optimizeDeps: { noDiscovery: true },
    server: { hmr: false, middlewareMode: true, watch: null, ws: false },
  })
  const { experimental_AstroContainer } =
    await server.ssrLoadModule("astro/container")
  const container = await experimental_AstroContainer.create()
  const renderModule = async (id, options = {}) =>
    container.renderToString((await server.ssrLoadModule(id)).default, {
      locals: { $id: createExampleIdPlaceholders() },
      ...options,
    })
  const versions = new Map()
  const addSource = (file, source) => {
    const seen = versions.get(file) ?? []
    if (!seen.includes(source)) seen.push(source)
    versions.set(file, seen)
    const version = seen.indexOf(source)
    const id = version === 0 ? `/${file}` : `/${file}?source=${version}`
    sources.set(join(root, id), source)
    return id
  }
  return {
    close: () => server.close().catch(() => {}),
    loadModule: (id) => server.ssrLoadModule(id),
    loadSource: (file, source) => server.ssrLoadModule(addSource(file, source)),
    renderSource: (file, source, options) =>
      renderModule(addSource(file, source), options),
  }
}

/** @param {string} source @param {string} file @param {{ renderer: Awaited<ReturnType<typeof createRenderer>>, targets?: (keyof typeof TARGETS)[] }} options */
export const compileExample = async (
  source,
  file,
  { renderer, targets = Object.keys(TARGETS) },
) => {
  const outputs = new Map()
  const targetFile = (target) => file.replace(/\.astro$/, TARGETS[target])
  let read
  try {
    if (source.includes(ID_PLACEHOLDER)) {
      throw new Error(
        `${file} contains ${ID_PLACEHOLDER}, which the generator uses for ids from Astro.locals.$id`,
      )
    }
    read = await readExample(source, file)
  } catch (error) {
    return { outputs, problems: [`${file}: ${error.message}`] }
  }
  let example
  let refusal
  if (targets.some((target) => target !== "html")) {
    try {
      example = await parseExample(source, file, { read })
    } catch (error) {
      refusal = error
    }
  }
  if (!targets.includes("html") && !example) {
    return {
      outputs,
      problems: targets.map(
        (target) => `${targetFile(target)}: ${refusal.message}`,
      ),
    }
  }
  let rendered
  let textParts
  try {
    const whitespace = await markWhitespace(source)
    rendered = await renderer.renderSource(file, whitespace.source)
    textParts = whitespace.read(rendered, read.styles)
  } catch (error) {
    return { outputs, problems: [`${file}: ${error.message}`] }
  }
  let page
  const pageOf = () =>
    (page ??= (async () => {
      const { markup, nodes } = renderedMarkup(rendered, read, file)
      return { markup, modules: await scriptModules(markup, read), nodes }
    })())
  const problems = []
  for (const target of targets) {
    try {
      if (target === "html") {
        outputs.set(target, await toHtml(read, file, await pageOf()))
        continue
      }
      if (refusal) throw refusal
      outputs.set(
        target,
        await toFramework(
          target,
          example,
          textParts,
          file,
          target === "nunjucks" ? (await pageOf()).modules : [],
        ),
      )
    } catch (error) {
      problems.push(`${targetFile(target)}: ${error.message}`)
    }
  }
  return { outputs, problems }
}

const exampleKeys = async (only) => {
  const folders = []
  for (const dir of SOURCE_DIRS) {
    for (const slug of (await readdir(join(root, dir))).toSorted()) {
      folders.push({ dir, slug })
    }
  }
  const unknown = only.filter(
    (slug) => !folders.some((folder) => folder.slug === slug),
  )
  if (unknown.length > 0) {
    throw new Error(`--only names no examples folder: ${unknown.join(", ")}`)
  }
  const keys = []
  for (const { dir, slug } of folders.filter(
    ({ slug }) => only.length === 0 || only.includes(slug),
  )) {
    for (const file of (await readdir(join(root, dir, slug))).toSorted()) {
      if (file.endsWith(".astro")) {
        keys.push({ dir, key: `${slug}/${file.slice(0, -6)}` })
      }
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
    for (const { dir, key } of keys) {
      const file = `${dir}/${key}.astro`
      const targets = generatedTargets(
        key,
        dir === EXAMPLES_DIR ? handWritten : {},
      )
      if (targets.length === 0) continue
      const compiled = await compileExample(
        await readFile(join(root, file), "utf8"),
        file,
        { renderer, targets },
      )
      for (const [target, code] of compiled.outputs) {
        outputs.set(file.replace(/\.astro$/, TARGETS[target]), code)
      }
      problems.push(...compiled.problems)
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
