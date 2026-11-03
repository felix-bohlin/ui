import { existsSync, readFileSync, realpathSync } from "node:fs"
import { readdir, readFile, writeFile } from "node:fs/promises"
import { join } from "node:path"
import { fileURLToPath } from "node:url"
import { parseArgs } from "node:util"
import { parse } from "@astrojs/compiler"
import { format, resolveConfig } from "prettier"
import ts from "typescript"
import { slotProp } from "../src/component-api/frameworks.ts"
import { reactPropsOf, resolveReactProp } from "./example-react-props.mjs"

const root = fileURLToPath(new URL("..", import.meta.url))
const componentsDir = join(root, "packages/opui/components")

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

const readFrontmatter = (code, file) => {
  const sourceFile = sourceFileOf(code)
  const result = {
    components: [],
    imports: [],
    props: [],
    propsType: undefined,
    rest: undefined,
  }
  for (const statement of sourceFile.statements) {
    if (ts.isImportDeclaration(statement)) {
      const specifier = statement.moduleSpecifier.text
      const clause = statement.importClause
      if (specifier === "./types.astro") {
        const [element] = clause.namedBindings.elements
        result.propsType = element.propertyName?.text ?? element.name.text
        continue
      }
      if (specifier === "../cx" || specifier === "astro/types") continue
      if (specifier.endsWith(".astro") && clause.name) {
        const match = /^\.\.\/([^/]+)\/([^/]+)\.astro$/.exec(specifier)
        if (!match) throw unsupported(file, `the import of ${specifier}`)
        result.components.push({
          folder: match[1],
          local: clause.name.text,
          name: match[2],
        })
        continue
      }
      if (
        specifier === "./icons" &&
        clause.namedBindings &&
        ts.isNamedImports(clause.namedBindings)
      ) {
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
    if (ts.isVariableStatement(statement)) {
      const [declaration] = statement.declarationList.declarations
      if (
        statement.declarationList.declarations.length === 1 &&
        ts.isObjectBindingPattern(declaration.name) &&
        declaration.initializer?.getText(sourceFile) === "Astro.props" &&
        result.props.length === 0
      ) {
        for (const element of declaration.name.elements) {
          if (element.dotDotDotToken) {
            result.rest = element.name.text
            continue
          }
          const prop = element.propertyName
            ? ts.isIdentifier(element.propertyName)
              ? element.propertyName.text
              : element.propertyName.text
            : element.name.text
          result.props.push({
            default: element.initializer?.getText(sourceFile),
            defaultIsLiteral: element.initializer
              ? ts.isStringLiteral(element.initializer)
              : undefined,
            local: element.name.text,
            prop,
          })
        }
        continue
      }
      throw unsupported(
        file,
        `the frontmatter statement \`${statement.getText(sourceFile).split("\n")[0]}\``,
      )
    }
    throw unsupported(
      file,
      `the frontmatter statement \`${statement.getText(sourceFile).split("\n")[0]}\``,
    )
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
  if (item.kind === "spread") return { kind: "spread", code: item.name }
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
  const branch = (expression) => {
    const child = placeholder(expression)
    if (child) return toTree([child], context)
    if (hasPlaceholder(expression)) {
      throw unsupported(
        context.file,
        `the expression {${code}}, whose branches hold more than one element`,
      )
    }
    const text = expression.getText(sourceFile)
    return text === "undefined" || text === "null"
      ? []
      : [{ code: text, type: "expression" }]
  }
  const expression = unwrap(statement.expression)
  if (
    ts.isBinaryExpression(expression) &&
    expression.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken &&
    placeholder(expression.right)
  ) {
    if (hasPlaceholder(expression.left)) {
      throw unsupported(context.file, `the expression {${code}}`)
    }
    return {
      consequent: branch(expression.right),
      test: expression.left.getText(sourceFile),
      type: "if",
    }
  }
  if (ts.isConditionalExpression(expression) && hasPlaceholder(expression)) {
    if (hasPlaceholder(expression.condition)) {
      throw unsupported(context.file, `the expression {${code}}`)
    }
    return {
      alternate: branch(expression.whenFalse),
      consequent: branch(expression.whenTrue),
      test: expression.condition.getText(sourceFile),
      type: "if",
    }
  }
  if (hasPlaceholder(expression)) {
    throw unsupported(context.file, `the expression {${code}}`)
  }
  return { code, type: "expression" }
}

const isBox = (node) => ["element", "if", "slot"].includes(node.type)

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

const toTree = (nodes, context) =>
  nodes.flatMap((node) => {
    if (node.type === "text") {
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
    if (node.type === "expression") return [expressionNode(node, context)]
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
    if (node.type === "element" || node.type === "component") {
      if (node.type === "element" && /^(script|style)$/.test(node.name)) {
        throw unsupported(context.file, `a <${node.name}>`)
      }
      const component = context.components.find(
        (entry) => entry.local === node.name,
      )
      const variable =
        node.type === "component" && !component && context.locals.has(node.name)
      if (node.type === "component" && !component && !variable) {
        throw unsupported(context.file, `<${node.name}>`)
      }
      return [
        {
          attributes: node.attributes.map((item) =>
            attributeNode(item, context),
          ),
          children: boxesOnLines(toTree(node.children, context)),
          component,
          tag: node.name,
          type: "element",
          variable,
        },
      ]
    }
    throw unsupported(context.file, `a ${node.type} node`)
  })

export const readComponent = async (source, file) => {
  const { ast } = await parse(source, { position: true })
  const frontmatterNode = ast.children.find(
    (node) => node.type === "frontmatter",
  )
  const frontmatter = readFrontmatter(frontmatterNode?.value ?? "", file)
  const body = ast.children.filter((node) => node.type !== "frontmatter")
  if (body.some((node) => node.type === "element" && node.name === "script")) {
    throw unsupported(file, "a <script>")
  }
  const context = {
    components: frontmatter.components,
    file,
    locals: new Set(frontmatter.props.map(({ local }) => local)),
  }
  const tree = toTree(body, context)
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
  const roots = tree.filter((node) => !isBlank(node))
  if (roots.length !== 1 || roots[0].type !== "element") {
    throw unsupported(file, "a template that isn't one element")
  }
  const [rootNode] = roots
  if (
    !rootNode.attributes.some(
      (item) => item.kind === "spread" && item.code === frontmatter.rest,
    )
  ) {
    throw unsupported(
      file,
      `a template that doesn't spread ${frontmatter.rest} on its root`,
    )
  }
  return { ...frontmatter, file, slots: slots.toSorted(), tree: roots }
}

const rewriteExpression = (code, { quote = '"', rename = new Map() } = {}) => {
  const sourceFile = sourceFileOf(`(${code})`, "expression.ts")
  const transformer = (context) => (node) => {
    const visit = (child) => {
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
  const [statement] = ts.transform(sourceFile, [transformer]).transformed[0]
    .statements
  const text = printer.printNode(
    ts.EmitHint.Expression,
    statement.expression,
    sourceFile,
  )
  return text.replace(/^\((.*)\)$/s, "$1")
}

const oneLine = (code) => rewriteExpression(code)

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

const codesIn = (nodes) =>
  nodes.flatMap((node) => {
    if (node.type === "expression") return [node.code]
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

const toReact = (component) => {
  const { components, imports, props, propsType, rest, slots, tree } = component
  const variableTags = props.filter(
    ({ local }) =>
      /^[A-Z]/.test(local) &&
      codesIn(tree).length >= 0 &&
      JSON.stringify(tree).includes(`"tag":"${local}"`),
  )
  const rename = new Map(
    props
      .filter(({ prop }) => prop === "class")
      .map(({ local }) => [local, "className"]),
  )
  const entries = props.map((entry) => {
    const variable = variableTags.includes(entry)
    if (entry.prop === "class") return { key: "className", text: "className" }
    if (variable) return { key: entry.prop, text: entry.prop }
    if (entry.local !== entry.prop) {
      return {
        key: entry.local,
        text: `${JSON.stringify(entry.prop)}: ${entry.local}${entry.default ? ` = ${entry.default}` : ""}`,
      }
    }
    return {
      key: entry.prop,
      text: entry.default ? `${entry.prop} = ${entry.default}` : entry.prop,
    }
  })
  const slotEntries = slotOrder(slots).map((slot) => slotProp(slot))
  const destructured = [
    ...entries.toSorted((a, b) => byName(a.key, b.key)).map(({ text }) => text),
    ...slotEntries,
    ...(rest ? [`...${rest}`] : []),
  ]
  const derived = variableTags.map(
    ({ local, prop, default: fallback }) =>
      `const ${local}: ElementType = ${fallback ? `${prop} || ${fallback}` : prop}`,
  )
  let usesCx = false
  const attribute = (node, item) => {
    if (item.kind === "class") {
      usesCx = true
      return `className={cx(${rewriteExpression(item.code, { rename })})}`
    }
    if (item.kind === "spread") {
      return node.variable
        ? `{...(${item.code} as object)}`
        : `{...${item.code}}`
    }
    const name = node.component
      ? item.name
      : (REACT_ATTRIBUTE_NAMES[item.name] ??
        (node.variable
          ? item.name
          : (resolveReactProp(
              reactPropsOf(node.tag, false) ?? new Map(),
              item.name,
            ) ?? item.name)))
    if (item.kind === "static") return `${name}=${JSON.stringify(item.value)}`
    if (item.kind === "boolean") return name
    return `${name}={${rewriteExpression(item.code, { rename })}}`
  }
  const emit = (nodes) =>
    nodes
      .map((node) => {
        if (node.type === "text")
          return node.value === " " ? '{" "}' : node.value
        if (node.type === "expression") {
          return `{${rewriteExpression(node.code, { rename })}}`
        }
        if (node.type === "slot") {
          const name = slotProp(node.name)
          if (node.fallback.length === 0) return `{${name}}`
          return `{${name} === undefined ? (${wrapFragment(emit(node.fallback), node.fallback)}) : (${name})}`
        }
        if (node.type === "if") {
          const test = rewriteExpression(node.test, { rename })
          const consequent = wrapFragment(
            emit(node.consequent),
            node.consequent,
          )
          if (!node.alternate) return `{${test} && (${consequent})}`
          const alternate = wrapFragment(emit(node.alternate), node.alternate)
          return `{${test} ? (${consequent}) : (${alternate})}`
        }
        const attributes = node.attributes
          .map((item) => attribute(node, item))
          .join(" ")
        const open = `<${node.tag}${attributes ? ` ${attributes}` : ""}`
        return node.children.length === 0
          ? `${open} />`
          : `${open}>${emit(node.children)}</${node.tag}>`
      })
      .join("")
  const wrapFragment = (code, nodes) => {
    const significant = nodes.filter((node) => !isBlank(node))
    return significant.length === 1 && significant[0].type === "element"
      ? code
      : `<>${code}</>`
  }
  const body = emit(tree)
  const importLines = [
    ...(variableTags.length
      ? [`import type { ElementType } from "react"`]
      : []),
    ...(usesCx ? [`import { cx } from "../cx"`] : []),
    ...components
      .map(
        ({ folder, local, name }) =>
          `import ${local} from "../${folder}/${name}.react"`,
      )
      .toSorted(byName),
    ...imports,
    `import type { ${propsType === "Props" ? "Props" : `${propsType} as Props`} } from "./types.react"`,
  ]
  return `${importLines.join("\n")}\n\nexport default function ${component.name}({ ${destructured.join(", ")} }: Props) {\n${derived.map((line) => `  ${line}\n`).join("")}${derived.length ? "\n" : ""}  return (\n${indent(body, 4)}\n  )\n}\n`
}

const toSvelte = (component) => {
  const { components, imports, props, propsType, rest, slots, tree } = component
  const entries = props
    .toSorted((a, b) => byName(a.prop, b.prop))
    .map(
      ({ default: fallback, local, prop }) =>
        `${prop === local ? prop : `${prop}: ${local}`}${fallback ? ` = ${fallback}` : ""}`,
    )
  const slotEntries = slotOrder(slots).map((slot) => slotProp(slot))
  const attribute = (node, item) => {
    if (item.kind === "class") return `class={${oneLine(item.code)}}`
    if (item.kind === "spread") return `{...${item.code}}`
    if (item.kind === "static") {
      return `${item.name}=${JSON.stringify(item.value)}`
    }
    if (item.kind === "boolean") return item.name
    return `${item.name}={${oneLine(item.code)}}`
  }
  const emit = (nodes) =>
    nodes
      .map((node) => {
        if (node.type === "text")
          return node.value === " " ? '{" "}' : node.value
        if (node.type === "expression") return `{${oneLine(node.code)}}`
        if (node.type === "slot") {
          const name = slotProp(node.name)
          if (node.fallback.length === 0) return `{@render ${name}?.()}`
          return `{#if ${name}}{@render ${name}()}{:else}${emit(node.fallback)}{/if}`
        }
        if (node.type === "if") {
          const test = oneLine(node.test)
          const consequent = emit(node.consequent)
          if (!node.alternate) return `{#if ${test}}${consequent}{/if}`
          return `{#if ${test}}${consequent}{:else}${emit(node.alternate)}{/if}`
        }
        const attributes = node.attributes
          .map((item) => attribute(node, item))
          .join(" ")
        const tag = node.variable ? "svelte:element" : node.tag
        const open = `<${tag}${node.variable ? ` this={${node.tag}}` : ""}${attributes ? ` ${attributes}` : ""}`
        if (node.children.length === 0) return `${open} />`
        return `${open}>${emit(node.children)}</${tag}>`
      })
      .join("")
  const importLines = [
    ...components
      .map(
        ({ folder, local, name }) =>
          `import ${local} from "../${folder}/${name}.svelte"`,
      )
      .toSorted(byName),
    ...imports,
    `import type { ${propsType === "Props" ? "Props" : `${propsType} as Props`} } from "./types.svelte"`,
  ]
  const destructured = [
    ...entries,
    ...(slotEntries.length ? ["", "// Snippets", ...slotEntries] : []),
    ...(rest ? [`...${rest}`] : []),
  ]
  const lines = destructured.map((line) =>
    line === "" ? "" : line.startsWith("//") ? `    ${line}` : `    ${line},`,
  )
  return `<script lang="ts">\n${importLines.map((line) => `  ${line}`).join("\n")}\n\n  let {\n${lines.join("\n")}\n  }: Props = $props()\n</script>\n\n${emit(tree)}\n`
}

const toVue = (component) => {
  const { components, imports, props, propsType, rest, slots, tree } = component
  const rename = new Map(
    props.map(({ local, prop }) => [
      local,
      prop === "class" ? "$props.class" : prop,
    ]),
  )
  const tagsIn = (nodes) =>
    nodes.flatMap((node) => [
      ...(node.type === "element" && node.variable ? [node.tag] : []),
      ...tagsIn(node.children ?? []),
      ...tagsIn(node.fallback ?? []),
      ...tagsIn(node.consequent ?? []),
      ...tagsIn(node.alternate ?? []),
    ])
  const used = new Set([
    ...codesIn(tree).flatMap((code) => [...identifiersIn(code)]),
    ...tagsIn(tree),
  ])
  const declared = props
    .filter(({ local, prop }) => prop !== "class" && used.has(local))
    .toSorted((a, b) => byName(a.prop, b.prop))
    .map(({ default: fallback, prop }) =>
      fallback ? `${prop} = ${fallback}` : prop,
    )
  const options = { quote: "'", rename }
  let attrsOnInner = false
  const attribute = (node, item) => {
    if (item.kind === "class") {
      return `:class="${rewriteExpression(item.code, options)}"`
    }
    if (item.kind === "spread") {
      if (item.code !== rest) {
        throw unsupported(component.file, `the spread {...${item.code}}`)
      }
      if (node === tree[0] && !node.variable) return ""
      attrsOnInner = true
      return `v-bind="$attrs"`
    }
    if (item.kind === "static") {
      return `${item.name}=${JSON.stringify(item.value)}`
    }
    if (item.kind === "boolean") return item.name
    return `:${item.name}="${rewriteExpression(item.code, options)}"`
  }
  const directive = (nodes, name, test) => {
    const significant = nodes.filter((node) => !isBlank(node))
    const clause = test === undefined ? name : `${name}="${test}"`
    if (significant.length === 1 && significant[0].type !== "if") {
      return emitOne(significant[0], clause)
    }
    return `<template ${clause}>${emit(nodes)}</template>`
  }
  const emitOne = (node, clause) => {
    if (node.type === "text")
      return node.value === " " ? '{{ " " }}' : node.value
    if (node.type === "expression") {
      const code = rewriteExpression(node.code, options)
      return clause
        ? `<template ${clause}>{{ ${code} }}</template>`
        : `{{ ${code} }}`
    }
    if (node.type === "slot") {
      const name = node.name === "default" ? "" : ` name="${node.name}"`
      const slotClause = clause ? ` ${clause}` : ""
      return `<slot${slotClause}${name}>${emit(node.fallback)}</slot>`
    }
    if (node.type === "if") {
      const test = rewriteExpression(node.test, options)
      const consequent = directive(node.consequent, "v-if", test)
      if (!node.alternate) return consequent
      return `${consequent}${directive(node.alternate, "v-else")}`
    }
    const attributes = [
      ...(clause ? [clause] : []),
      ...node.attributes.map((item) => attribute(node, item)).filter(Boolean),
      ...(node === tree[0] &&
      !node.attributes.some((item) => item.kind === "class")
        ? [':class="$props.class"']
        : []),
    ].join(" ")
    const tag = node.variable ? "component" : node.tag
    const open = `<${tag}${node.variable ? ` :is="${rename.get(node.tag) ?? node.tag}"` : ""}${attributes ? ` ${attributes}` : ""}`
    if (node.children.length === 0 && (node.component || node.variable)) {
      return `${open} />`
    }
    return `${open}>${emit(node.children)}</${tag}>`
  }
  const emit = (nodes) => nodes.map((node) => emitOne(node)).join("")
  const template = emit(tree)
  const slotsType =
    propsType !== "Props" && slots.some((slot) => slot !== "default")
      ? `${component.name}Slots`
      : "Slots"
  const importLines = [
    `import type { ${propsType === "Props" ? "Props" : `${propsType} as Props`}, ${slotsType} } from "./types.vue-props"`,
    ...components
      .map(
        ({ folder, local, name }) =>
          `import ${local} from "../${folder}/${name}.vue"`,
      )
      .toSorted(byName),
    ...imports,
  ]
  const propsLine = declared.length
    ? `const { ${declared.join(", ")} } = defineProps<Props>()`
    : "defineProps<Props>()"
  const setup = [
    importLines.join("\n"),
    `${propsLine}\ndefineSlots<${slotsType}>()`,
    ...(attrsOnInner ? ["defineOptions({\n  inheritAttrs: false,\n})"] : []),
  ].join("\n\n")
  return `<script setup lang="ts">\n${setup}\n</script>\n\n<template>\n${indent(template, 2)}\n</template>\n`
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

export const toTypes = (folder, { astro, base }, slotsByComponent) => {
  const file = `packages/opui/components/${folder}/types.astro.ts`
  if (typeAliases(base).some(({ name }) => name.endsWith("Slots"))) {
    throw unsupported(file, "a Slots type in types.ts")
  }
  if (!astro.includes('import type * as Base from "./types"')) {
    throw unsupported(file, "a types.astro.ts without the Base import")
  }
  const aliases = typeAliases(astro)
  for (const alias of aliases) {
    if (!/^export type \w+ =[\s\S]*HTMLAttributes</.test(alias.text)) {
      throw unsupported(file, `the type ${alias.name}`)
    }
  }
  const asValues = (text) =>
    [...text.matchAll(/\bas\??: ("[^"]+")/g)]
      .map((match) => match[1])
      .toSorted()
  const react = astro
    .replace(
      'import type { HTMLAttributes } from "astro/types"',
      'import type { ComponentProps } from "react"',
    )
    .replace(HTML_ATTRIBUTES, "ComponentProps<$1>")
  const svelte = astro
    .replace(
      'import type { HTMLAttributes } from "astro/types"',
      'import type { SvelteHTMLElements } from "svelte/elements"',
    )
    .replace(HTML_ATTRIBUTES, "SvelteHTMLElements[$1]")
  const based = aliases
    .filter(({ name, text }) => text.includes(`Base.${name}`))
    .map(({ name }) => name)
    .toSorted(byName)
  const slotNames = [...new Set(Object.values(slotsByComponent).flat())]
  const namedSlots = slotNames.filter((slot) => slot !== "default")
  if (namedSlots.length > 0) {
    throw unsupported(file, `the named slots ${namedSlots.join(", ")}`)
  }
  const vue = [
    [
      'import type { Class, DefaultSlots } from "../vue"',
      `import type {\n${based.map((name) => `  ${name} as Base${name},`).join("\n")}\n} from "./types"`,
    ].join("\n"),
    ...aliases
      .toSorted((a, b) => byName(a.name, b.name))
      .map(({ name, text }) => {
        const values = asValues(text)
        const base = based.includes(name) ? `Base${name} & ` : ""
        return `export type ${name} = ${base}Class${values.length ? ` & { as?: ${values.join(" | ")} }` : ""}`
      }),
    "export type Slots = DefaultSlots",
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

export const compileComponent = async (source, file) => {
  const component = await readComponent(source, file)
  const name = file
    .split("/")
    .at(-1)
    .replace(/\.astro$/, "")
  const folder = file.split("/").at(-2)
  const named = { ...component, folder, name }
  const outputs = new Map()
  for (const [framework, extension] of Object.entries(PORTS)) {
    const target = `packages/opui/components/${folder}/${name}${extension}`
    const code = { react: toReact, svelte: toSvelte, vue: toVue }[framework](
      named,
    )
    outputs.set(target, await prettierFormat(code, target))
  }
  return { component: named, outputs }
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
    let allCompiled = true
    for (const file of files.filter((entry) => entry.endsWith(".astro"))) {
      const key = `${folder}/${file}`
      const relative = `packages/opui/components/${key}`
      try {
        const { component, outputs: compiled } = await compileComponent(
          await readFile(join(componentsDir, key), "utf8"),
          relative,
        )
        slotsByComponent[component.name] = component.slots
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
        if (ledgerKeys.every((ledgerKey) => ledgerKey in handWritten)) {
          skipped.push(`${relative}: ${error.message}`)
        } else {
          problems.push(error.message)
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
      )
      for (const [framework, typeFile] of Object.entries(TYPE_FILES)) {
        const target = `packages/opui/components/${folder}/${typeFile}`
        if (`${folder}/${typeFile}` in handWritten) continue
        outputs.set(target, await prettierFormat(types[framework], target))
      }
    } catch (error) {
      if (
        Object.values(TYPE_FILES).every(
          (typeFile) => `${folder}/${typeFile}` in handWritten,
        )
      ) {
        skipped.push(error.message)
      } else {
        problems.push(error.message)
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
