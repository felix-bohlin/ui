import { parse } from "@astrojs/compiler"
import type { AttributeNode, Node } from "@astrojs/compiler/types"
import ts from "typescript"

export type ComponentUsage = {
  component: string
  props: { name: string; value?: string }[]
}

const componentNames = (frontmatter: string) => {
  const named = new Map<string, string>()
  const namespaces = new Set<string>()
  const file = ts.createSourceFile(
    "frontmatter.ts",
    frontmatter,
    ts.ScriptTarget.Latest,
  )
  for (const statement of file.statements) {
    const bindings = ts.isImportDeclaration(statement)
      ? statement.importClause?.namedBindings
      : undefined
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
  return (tag: string) => {
    const dot = tag.indexOf(".")
    return dot > 0 && namespaces.has(tag.slice(0, dot))
      ? tag.slice(dot + 1)
      : (named.get(tag) ?? tag)
  }
}

const literalText = (code: string) => {
  const [statement] = ts.createSourceFile(
    "value.ts",
    `(${code})`,
    ts.ScriptTarget.Latest,
  ).statements
  if (!statement || !ts.isExpressionStatement(statement)) return undefined
  let node = statement.expression
  while (
    ts.isParenthesizedExpression(node) ||
    ts.isAsExpression(node) ||
    ts.isSatisfiesExpression(node)
  ) {
    node = node.expression
  }
  return ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)
    ? node.text
    : undefined
}

const staticValue = ({ kind, value }: AttributeNode) => {
  if (kind === "quoted") return value
  if (kind === "expression") return literalText(value)
  if (kind === "template-literal") return literalText(`\`${value}\``)
  return undefined
}

export const componentUsages = async (source: string) => {
  const { ast } = await parse(source)
  const frontmatter = ast.children.find((node) => node.type === "frontmatter")
  const componentOf = componentNames(
    frontmatter?.type === "frontmatter" ? frontmatter.value : "",
  )
  const usages: ComponentUsage[] = []
  const visit = (node: Node) => {
    if (node.type === "component") {
      usages.push({
        component: componentOf(node.name),
        props: node.attributes
          .filter((attribute) => attribute.kind !== "spread")
          .map((attribute) => ({
            name: attribute.name,
            value: staticValue(attribute),
          })),
      })
    }
    if ("children" in node) node.children.forEach(visit)
  }
  ast.children.forEach(visit)
  return usages
}
