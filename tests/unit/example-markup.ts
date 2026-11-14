import { parse } from "@astrojs/compiler"
import type { AttributeNode, Node } from "@astrojs/compiler/types"
import ts from "typescript"
import { parseHtml } from "../../scripts/html-tokens.mjs"

type HtmlNode = ReturnType<typeof parseHtml>[number]

export type Tag = {
  component: boolean
  name: string
  props: { name: string; value?: string }[]
}

export type Markup = {
  strings: { key: string; value: string }[]
  tags: Tag[]
  texts: string[]
}

const CODE = new Set(["script", "style"])

const unwrap = (node: ts.Expression) => {
  while (
    ts.isParenthesizedExpression(node) ||
    ts.isAsExpression(node) ||
    ts.isSatisfiesExpression(node)
  ) {
    node = node.expression
  }
  return node
}

const stringOf = (node: ts.Expression) => {
  const inner = unwrap(node)
  return ts.isStringLiteral(inner) || ts.isNoSubstitutionTemplateLiteral(inner)
    ? inner.text
    : undefined
}

const expressionOf = (code: string) => {
  const [statement] = ts.createSourceFile(
    "expression.ts",
    `(${code})`,
    ts.ScriptTarget.Latest,
  ).statements
  return statement && ts.isExpressionStatement(statement)
    ? unwrap(statement.expression)
    : undefined
}

const readFrontmatter = (code: string) => {
  const named = new Map<string, string>()
  const namespaces = new Set<string>()
  const consts = new Map<string, string>()
  const strings: Markup["strings"] = []
  const visit = (node: ts.Node) => {
    if (ts.isImportDeclaration(node)) {
      const bindings = node.importClause?.namedBindings
      if (bindings && ts.isNamespaceImport(bindings)) {
        namespaces.add(bindings.name.text)
      } else if (bindings) {
        for (const element of bindings.elements) {
          named.set(
            element.name.text,
            (element.propertyName ?? element.name).text,
          )
        }
      }
    }
    if (
      ts.isVariableDeclaration(node) &&
      ts.isIdentifier(node.name) &&
      node.initializer
    ) {
      const value = stringOf(node.initializer)
      if (value !== undefined) consts.set(node.name.text, value)
    }
    if (
      ts.isPropertyAssignment(node) &&
      (ts.isIdentifier(node.name) || ts.isStringLiteral(node.name))
    ) {
      const value = stringOf(node.initializer)
      if (value !== undefined) strings.push({ key: node.name.text, value })
    }
    ts.forEachChild(node, visit)
  }
  visit(ts.createSourceFile("frontmatter.ts", code, ts.ScriptTarget.Latest))
  const componentOf = (tag: string) => {
    const dot = tag.indexOf(".")
    return dot > 0 && namespaces.has(tag.slice(0, dot))
      ? tag.slice(dot + 1)
      : (named.get(tag) ?? tag)
  }
  return { componentOf, consts, strings }
}

const codeOf = ({ kind, value }: AttributeNode) =>
  kind === "expression"
    ? value
    : kind === "template-literal"
      ? `\`${value}\``
      : undefined

const valueOf = (attribute: AttributeNode) => {
  if (attribute.kind === "quoted") return attribute.value
  const code = codeOf(attribute)
  const expression = code === undefined ? undefined : expressionOf(code)
  return expression && stringOf(expression)
}

const textRuns = () => {
  const texts: string[] = []
  let run = ""
  let copy = false
  return {
    add: (text: string, isCopy = true) => {
      run += text
      copy ||= isCopy && text.trim() !== ""
    },
    end: (keep: boolean) => {
      const text = run.replace(/\s+/g, " ").trim()
      if (keep && copy) texts.push(text)
      run = ""
      copy = false
    },
    texts,
  }
}

export const astroMarkup = async (source: string) => {
  const { ast } = await parse(source)
  const frontmatter = ast.children.find((node) => node.type === "frontmatter")
  const { componentOf, consts, strings } = readFrontmatter(
    frontmatter?.type === "frontmatter" ? frontmatter.value : "",
  )
  const tags: Tag[] = []
  const runs = textRuns()
  const html: string[] = []
  const contentOf = (attribute: AttributeNode) => {
    const code = codeOf(attribute)
    const expression = code === undefined ? undefined : expressionOf(code)
    return expression && ts.isIdentifier(expression)
      ? consts.get(expression.text)
      : valueOf(attribute)
  }
  type Context = { html: boolean; inCode: boolean }
  const visitChildren = (children: Node[], context: Context) => {
    for (const child of children) {
      if (child.type === "text") {
        runs.add(child.value)
        continue
      }
      if (child.type === "comment") continue
      if (child.type === "expression") {
        const parts = child.children.flatMap((part) =>
          part.type === "text" ? [part.value] : [],
        )
        if (parts.length === child.children.length) {
          const code = parts.join("").trim()
          const expression = expressionOf(code)
          const value = expression && stringOf(expression)
          runs.add(value ?? `{${code}}`, value !== undefined)
          continue
        }
      }
      runs.end(!context.inCode)
      visit(child, context)
    }
    runs.end(!context.inCode)
  }
  const visit = (node: Node, context: Context) => {
    if (node.type === "expression") {
      for (const child of node.children) {
        if (child.type !== "text") visit(child, context)
      }
      return
    }
    if (!("attributes" in node)) return
    if (node.type !== "fragment") {
      const component = node.type === "component" && !context.html
      tags.push({
        component,
        name: component ? componentOf(node.name) : node.name,
        props: node.attributes
          .filter((attribute) => attribute.kind !== "spread")
          .map((attribute) => ({
            name: attribute.name,
            value: valueOf(attribute),
          })),
      })
    }
    for (const attribute of node.attributes) {
      const content =
        attribute.name === "set:html" || attribute.name === "set:text"
          ? contentOf(attribute)
          : undefined
      if (content === undefined) continue
      if (attribute.name === "set:html") html.push(content)
      else {
        runs.add(content)
        runs.end(!context.inCode)
      }
    }
    visitChildren(node.children, {
      ...context,
      inCode:
        context.inCode || (node.type === "element" && CODE.has(node.name)),
    })
  }
  visitChildren(ast.children, { html: false, inCode: false })
  for (const markup of html) {
    const { ast: inner } = await parse(markup)
    visitChildren(inner.children, { html: true, inCode: false })
  }
  return { strings, tags, texts: runs.texts } satisfies Markup
}

export const htmlMarkup = (source: string) => {
  const tags: Tag[] = []
  const runs = textRuns()
  const visitChildren = (children: HtmlNode[], inCode: boolean) => {
    for (const child of children) {
      if (child.type === "text") {
        runs.add(child.value)
        continue
      }
      if (child.type !== "element") continue
      runs.end(!inCode)
      tags.push({
        component: false,
        name: child.tag,
        props: child.attrs.map(
          ({ name, value }: { name: string; value: string }) => ({
            name,
            value,
          }),
        ),
      })
      visitChildren(child.children, inCode || CODE.has(child.tag))
    }
    runs.end(!inCode)
  }
  visitChildren(parseHtml(source), false)
  return { strings: [], tags, texts: runs.texts } satisfies Markup
}
