import { realpathSync } from "node:fs"
import { readdir, readFile } from "node:fs/promises"
import { basename, extname, join, relative } from "node:path"
import { fileURLToPath } from "node:url"
import { parse as parseAstro } from "@astrojs/compiler"
import ts from "typescript"
import {
  componentHasFramework,
  exampleExtension,
  FRAMEWORK_AGNOSTIC_EXAMPLES,
  FRAMEWORK_IDS,
  PACKAGE_FRAMEWORK_IDS,
} from "../src/utils/framework.js"
import { BARREL_TYPES, barrelExports } from "../src/utils/package-source.js"

const root = fileURLToPath(new URL("..", import.meta.url))
const componentsDir = join(root, "packages/opui/components")
const examplesDir = join(root, "src/component-examples")
const docsDir = join(root, "src/docs/components")

const SCRIPTS = [
  [".astro", /^---\n([\s\S]*?)\n---/g],
  [".react.tsx", /^([\s\S]*)$/g],
  [".svelte", /<script\b[^>]*>([\s\S]*?)<\/script>/g],
  [".vue", /<script\b[^>]*>([\s\S]*?)<\/script>/g],
]

const TYPES_FILES = [
  [".astro", "./types.astro"],
  [".react.tsx", "./types.react"],
  [".svelte", "./types.svelte"],
  [".vue", "./types.vue-props"],
]

export const checkTypesImport = (file, source) => {
  const own = TYPES_FILES.find(([extension]) => file.endsWith(extension))?.[1]
  if (!own) return []
  return [...source.matchAll(/from\s+["'](\.\/types\.[\w-]+)["']/g)]
    .filter(([, from]) => from !== own)
    .map(([, from]) => `imports types from ${from}; import them from ${own}`)
}

const classesIn = (item) => {
  const quoted = /^(["'`])([\s\S]*)\1$/.exec(item)
  if (quoted) return quoted[2].split(/\s+/)
  if (item.startsWith("{")) {
    return [
      ...item.matchAll(
        /[{,]\s*(?:(["'`])([^"'`]+)\1|([A-Za-z_$][\w$-]*))\s*:/g,
      ),
    ].map(([, , quotedKey, key]) => quotedKey ?? key)
  }
  return [
    ...item.matchAll(/\?\s*(["'`])([^"'`]*)\1\s*:\s*(["'`])([^"'`]*)\3/g),
  ].flatMap(([, , yes, , no]) => [yes, no])
}

export const checkClassPrefix = (lists, label) =>
  lists
    .flatMap((items) => items.flatMap(classesIn).filter(Boolean))
    .filter((name) => !name.startsWith("ui-"))
    .map((name) => `${label} has the class "${name}"; prefix it with ui-`)

const CLASS_LISTS = [
  [".astro", /class:list=\{\[|\bclass=\{cx\(\[/g, "class:list"],
  [".react.tsx", /\bcx\(\[|\bclassName=\{(?!cx\()/g, "cx"],
  [".svelte", /\bclass=\{\[/g, "class"],
  [".vue", /:class="\[/g, ":class"],
]

const CLIENT =
  /\buse(?:ActionState|Context|Effect|ImperativeHandle|InsertionEffect|LayoutEffect|Optimistic|Reducer|Ref|State|SyncExternalStore|Transition)\(|\buse\w+Context\(|\bcreateContext\(|<\w+Context\b|\bon[A-Z]\w*(?:=\{|: )/

const CONTEXT_EXPORTS = {
  "context.astro.ts": (name) => [
    `${name[0].toLowerCase()}${name.slice(1)}Context`,
  ],
  "context.react.ts": (name) => [`${name}Context`, `use${name}Context`],
  "context.svelte.ts": (name) => [`get${name}Context`, `set${name}Context`],
  "context.vue.ts": (name) => [`${name}Key`],
}

const CONTEXT_FILES = Object.keys(CONTEXT_EXPORTS)

const CONTEXT_IMPORTS = {
  "context.astro.ts": ["../context.astro", ["createContext"]],
  "context.react.ts": ["react", ["createContext", "useContext"]],
  "context.svelte.ts": ["svelte", ["getContext", "setContext"]],
  "context.vue.ts": ["vue", ["InjectionKey"]],
}

const TYPE_FILES = [
  "types.astro.ts",
  "types.vue-props.ts",
  "types.react.ts",
  "types.svelte.ts",
  "types.ts",
]

const BARRELS = Object.fromEntries(
  PACKAGE_FRAMEWORK_IDS.map((framework) => [framework, `.${framework}`]),
)

const COMPONENT_FILES = {
  astro: ".astro",
  react: ".react.tsx",
  svelte: ".svelte",
  vue: ".vue",
}

const exportedNames = (source) =>
  barrelExports(source)
    .map(({ name }) => name)
    .toSorted()

const typeExports = (source) =>
  [...source.matchAll(/^export type \{([^}]*)\} from "([^"]+)"/gm)].map(
    ([, names, from]) => ({
      from,
      names: names
        .split(",")
        .map((name) =>
          name
            .trim()
            .split(/\s+as\s+/)
            .pop(),
        )
        .filter(Boolean),
    }),
  )

const exportedTypes = (source) =>
  typeExports(source)
    .flatMap((entry) => entry.names)
    .toSorted()

const splitTopLevel = (body) => {
  const items = []
  let depth = 0
  let current = ""
  let quote = null
  for (const char of body) {
    if (quote) {
      current += char
      if (char === quote) quote = null
      continue
    }
    if (char === '"' || char === "'" || char === "`") quote = char
    else if ("([{".includes(char)) depth++
    else if (")]}".includes(char)) depth--
    if (char === "," && depth === 0) {
      items.push(current.trim())
      current = ""
      continue
    }
    current += char
  }
  if (current.trim()) items.push(current.trim())
  return items
}

const classLists = (source, pattern) =>
  [...source.matchAll(pattern)].map((match) => {
    const open = match[0].at(-1)
    const close = open === "[" ? "]" : "}"
    let depth = 1
    let end = match.index + match[0].length
    while (end < source.length && depth > 0) {
      if (source[end] === open) depth++
      if (source[end] === close) depth--
      end++
    }
    return splitTopLevel(source.slice(match.index + match[0].length, end - 1))
  })

export const checkVariableTagClassList = async (source) => {
  const { ast } = await parseAstro(source, { position: false })
  const frontmatter = ast.children.find((node) => node.type === "frontmatter")
  const imported = new Set()
  const sourceFile = ts.createSourceFile(
    "frontmatter.ts",
    frontmatter?.value ?? "",
    ts.ScriptTarget.Latest,
    true,
  )
  for (const statement of sourceFile.statements.filter(
    ts.isImportDeclaration,
  )) {
    const { importClause } = statement
    if (importClause?.name) imported.add(importClause.name.text)
    const bindings = importClause?.namedBindings
    if (bindings && ts.isNamespaceImport(bindings))
      imported.add(bindings.name.text)
    if (bindings && ts.isNamedImports(bindings)) {
      for (const element of bindings.elements) imported.add(element.name.text)
    }
  }
  const problems = []
  const visit = (node) => {
    if (
      node.type === "component" &&
      !imported.has(node.name.split(".")[0]) &&
      node.attributes.some((attribute) => attribute.name === "class:list")
    ) {
      problems.push(
        `<${node.name}> is a variable tag with class:list, which Astro renders after the other attributes; use class={cx([...])} and import cx from "../cx"`,
      )
    }
    node.children?.forEach(visit)
  }
  visit(ast)
  return problems
}

export const checkClassOrder = (lists, label) =>
  lists
    .filter((items) => {
      const index = items.indexOf("className")
      return index !== -1 && index !== items.length - 1
    })
    .map(() => `className must be the last entry in ${label}`)

const classTokens = (lists) =>
  lists
    .map((items) =>
      [
        ...items
          .join(" ")
          .matchAll(/ui-\$\{(?:props\.)?(\w+)|ui-[\w-]+|\bclassName\b/g),
      ]
        .map(([token, name]) => (name ? `ui-\${${name}}` : token))
        .join(" "),
    )
    .join("\n")

const clientProblems = (source, used, uses) => {
  const client = source.startsWith('"use client"\n')
  if (used && !client) return [`uses ${uses}; start it with "use client"`]
  if (!used && client) return [`starts with "use client" but uses no ${uses}`]
  return []
}

export const checkClient = (source) =>
  clientProblems(
    source,
    CLIENT.test(source),
    "context, state, effects or event handlers",
  )

export const checkIndexSignature = (source) =>
  /^\s*\[key: string\]:/m.test(source)
    ? ["uses an index signature; declare the props explicitly"]
    : []

const parse = (file, source) =>
  ts.createSourceFile(
    file,
    source,
    ts.ScriptTarget.Latest,
    true,
    file.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  )

const keyName = (name) =>
  ts.isIdentifier(name) || ts.isStringLiteral(name) ? name.text : name.getText()

const unsorted = (names, compare = (a, b) => a.localeCompare(b)) => {
  const sorted = names.toSorted(compare)
  return names.join() === sorted.join() ? null : sorted
}

const slotOrder = (a, b) =>
  (b === "children") - (a === "children") || a.localeCompare(b)

const typeLabel = (node) => {
  let alias = node.parent
  while (alias && !ts.isTypeAliasDeclaration(alias)) alias = alias.parent
  if (!alias) return "A type literal"
  const direct =
    node.parent === alias ||
    (ts.isIntersectionTypeNode(node.parent) && node.parent.parent === alias)
  return direct ? alias.name.text : `A type literal in ${alias.name.text}`
}

export const checkSortedKeys = (file, source) => {
  const problems = []
  const visit = (node) => {
    if (ts.isTypeLiteralNode(node)) {
      const sorted = unsorted(
        node.members
          .filter((member) => member.name)
          .map((member) => keyName(member.name)),
      )
      if (sorted) {
        problems.push(
          `${typeLabel(node)} keys are not sorted: expected ${sorted.join(", ")}`,
        )
      }
    }
    ts.forEachChild(node, visit)
  }
  visit(parse(file, source))
  return problems
}

const isPropsSource = (node) =>
  (ts.isAsExpression(node) ? node.expression : node).getText() ===
    "Astro.props" ||
  (ts.isCallExpression(node) &&
    ["$props", "defineProps"].includes(node.expression.getText()))

const propsNode = (node) => {
  if (
    ts.isVariableDeclaration(node) &&
    node.initializer &&
    isPropsSource(node.initializer)
  ) {
    return node
  }
  if (
    ts.isFunctionDeclaration(node) &&
    node.modifiers?.some((m) => m.kind === ts.SyntaxKind.DefaultKeyword) &&
    node.parameters[0]
  ) {
    return node.parameters[0]
  }
  return ts.forEachChild(node, propsNode)
}

const parseScript = (file, source) => {
  const [, pattern] = SCRIPTS.find(([extension]) => file.endsWith(extension))
  return parse(file, [...source.matchAll(pattern)].map((m) => m[1]).join("\n"))
}

const propsBinding = (script) => {
  const node = propsNode(script)
  return node && ts.isObjectBindingPattern(node.name) ? node.name : null
}

const destructuredRuns = (file, source) => {
  const binding = propsBinding(parseScript(file, source))
  if (!binding) return null
  const runs = [[]]
  for (const element of binding.elements) {
    if (element.dotDotDotToken) continue
    if (element.getFullText().includes("// Snippets")) runs.push([])
    runs.at(-1).push(keyName(element.propertyName ?? element.name))
  }
  return runs
}

export const checkDestructuring = (file, source, slots) => {
  const runs = destructuredRuns(file, source)
  if (!runs) return []
  if (slots) {
    const keys = runs.flat()
    const props = keys.filter((key) => !slots.includes(key))
    const slotKeys = keys.filter((key) => slots.includes(key))
    const expected = [
      ...(unsorted(props) ?? props),
      ...(unsorted(slotKeys, slotOrder) ?? slotKeys),
    ]
    return keys.join() === expected.join()
      ? []
      : [
          `props are not destructured in order, slots last: expected ${expected.join(", ")}`,
        ]
  }
  return runs.flatMap((run, index) => {
    const sorted = unsorted(run, index > 0 ? slotOrder : undefined)
    return sorted
      ? [`props are not destructured in order: expected ${sorted.join(", ")}`]
      : []
  })
}

const nodesIn = (node, test) => {
  const found = []
  const visit = (child) => {
    if (test(child)) found.push(child)
    ts.forEachChild(child, visit)
  }
  visit(node)
  return found
}

const callsTo = (script, name) =>
  nodesIn(
    script,
    (node) => ts.isCallExpression(node) && node.expression.getText() === name,
  )

const importsFrom = (script, from) =>
  script.statements
    .filter(
      (node) =>
        ts.isImportDeclaration(node) && node.moduleSpecifier.text === from,
    )
    .flatMap((node) => node.importClause?.namedBindings?.elements ?? [])

const importedName = (specifier) =>
  (specifier.propertyName ?? specifier.name).text

const exportedNamesIn = (script) =>
  script.statements.flatMap((node) => {
    if (
      ts.isExportDeclaration(node) &&
      !node.moduleSpecifier &&
      node.exportClause &&
      ts.isNamedExports(node.exportClause)
    ) {
      return node.exportClause.elements.map((element) => element.name.text)
    }
    return node.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)
      ? ts.isVariableStatement(node)
        ? node.declarationList.declarations.map((declaration) =>
            declaration.name.getText(),
          )
        : [node.name?.text]
      : []
  })

const PROPS_TYPE_SITES = {
  react: "annotate the props parameter with it",
  svelte: "annotate the $props() destructuring with it",
  vue: "pass it to defineProps",
}

const propsTypeOf = (framework, script) =>
  framework === "vue"
    ? callsTo(script, "defineProps")[0]?.typeArguments?.[0]
    : propsNode(script)?.type

const references = (type, name) =>
  !!type &&
  nodesIn(
    type,
    (node) => ts.isTypeReferenceNode(node) && node.typeName.getText() === name,
  ).length > 0

export const checkPropsType = (file, source, framework, expected) => {
  const script = parseScript(file, source)
  const from = `./${BARREL_TYPES[framework]}`
  const specifier = importsFrom(script, from).find(
    (element) => importedName(element) === expected,
  )
  if (!specifier) {
    return [
      `does not import ${expected} from "${from}": a component takes its props type from its framework's types file, Props for the root and <Root><Part>Props for a part`,
    ]
  }
  const problems = []
  const local = specifier.name.text
  if (
    framework === "astro"
      ? local !== "Props"
      : !references(propsTypeOf(framework, script), local)
  ) {
    problems.push(
      framework === "astro"
        ? `imports ${expected}${local === expected ? "" : ` as ${local}`}: import it as Props, the type Astro reads for Astro.props`
        : `does not type its props with ${local} from "${from}": ${PROPS_TYPE_SITES[framework]}`,
    )
  }
  const slotTypes = [...new Set(["Slots", expected.replace(/Props$/, "Slots")])]
  for (const call of callsTo(script, "defineSlots")) {
    const slots = call.typeArguments?.[0]?.getText()
    if (
      !importsFrom(script, from).some(
        (element) =>
          slotTypes.includes(importedName(element)) &&
          element.name.text === slots,
      )
    ) {
      problems.push(
        `types defineSlots with ${slots}, not with ${slotTypes.join(" or ")} from "${from}"`,
      )
    }
  }
  return problems
}

const restCarriers = (script) => {
  const declarations = nodesIn(
    script,
    (node) =>
      ts.isVariableDeclaration(node) &&
      ts.isIdentifier(node.name) &&
      !!node.initializer,
  )
  const carriers = new Set(["rest"])
  let grew = true
  while (grew) {
    grew = false
    for (const declaration of declarations) {
      if (carriers.has(declaration.name.text)) continue
      if (
        nodesIn(
          declaration.initializer,
          (node) => ts.isIdentifier(node) && carriers.has(node.text),
        ).length > 0
      ) {
        carriers.add(declaration.name.text)
        grew = true
      }
    }
  }
  return {
    carriers: [...carriers],
    initializers: declarations
      .filter((declaration) => carriers.has(declaration.name.text))
      .map((declaration) => declaration.initializer.getText()),
  }
}

const spreadsRest = (source, carriers) => {
  const carried = new RegExp(`(?<![\\w$])(?:${carriers.join("|")})(?![\\w$])`)
  for (const match of source.matchAll(/\{\s*\.\.\./g)) {
    const call = /([\w$.]+)\(\s*$/.exec(source.slice(0, match.index))
    if (call && call[1] !== "$derived") continue
    let depth = 0
    let end = match.index
    for (; end < source.length; end++) {
      if (source[end] === "{") depth++
      if (source[end] === "}" && --depth === 0) break
    }
    if (carried.test(source.slice(match.index, end))) return true
  }
  return false
}

export const checkRest = (file, source) => {
  const script = parseScript(file, source)
  const node = propsNode(script)
  if (node && ts.isIdentifier(node.name)) {
    return source.includes(`{...${node.name.text}}`)
      ? []
      : [`does not spread ${node.name.text} onto the root element`]
  }
  const rest = node?.name.elements.at(-1)
  if (!rest?.dotDotDotToken || rest.name.getText() !== "rest") {
    return [
      "does not capture ...rest in its props destructuring: Astro, React and Svelte components capture it and spread it onto the root element, or the input of a form control",
    ]
  }
  const { carriers, initializers } = restCarriers(script)
  return spreadsRest(
    [node.name.getText(), ...initializers].reduce(
      (text, part) => text.replace(part, ""),
      source,
    ),
    carriers,
  )
    ? []
    : [
        "captures ...rest but never spreads it: spread it onto the root element, or the input of a form control",
      ]
}

export const checkVueAttrs = (source) =>
  /inheritAttrs:\s*false/.test(source) && !/\sv-bind="[^"]+"/.test(source)
    ? [
        'sets inheritAttrs: false but binds no attributes: bind them with v-bind="$attrs" (or the filtered attrs) where they belong',
      ]
    : []

export const checkModel = (file, source, framework, { api, ...models }) => {
  const script = parseScript(file, source)
  const actual =
    framework === "svelte"
      ? (propsBinding(script)?.elements ?? [])
          .filter(
            (element) =>
              element.initializer &&
              ts.isCallExpression(element.initializer) &&
              element.initializer.expression.getText() === "$bindable",
          )
          .map((element) => keyName(element.propertyName ?? element.name))
          .toSorted()
      : callsTo(script, "defineModel").map(() => "v-model")
  const expected =
    framework === "svelte"
      ? models[framework].toSorted()
      : models[framework].map(() => "v-model")
  if (actual.join() === expected.join()) return []
  return [
    framework === "svelte"
      ? `binds ${actual.join(", ") || "nothing"} with $bindable(), but the model in ${api} lists ${expected.join(", ") || "none"} for Svelte: bind exactly those`
      : `calls defineModel ${actual.length} time(s), but the model in ${api} lists ${expected.length} for Vue: call it once per model entry`,
  ]
}

const isReactive = (node) =>
  !!node &&
  ts.isCallExpression(node) &&
  node.expression.getText() === "reactive"

export const checkProvide = (file, source) => {
  const script = parseScript(file, source)
  return callsTo(script, "provide")
    .filter((call) => {
      const value = call.arguments[1]
      const declared =
        value &&
        ts.isIdentifier(value) &&
        nodesIn(
          script,
          (node) =>
            ts.isVariableDeclaration(node) &&
            node.name.getText() === value.text &&
            isReactive(node.initializer),
        ).length > 0
      return !isReactive(value) && !declared
    })
    .map(
      (call) =>
        `provides ${call.arguments[0]?.getText()} without reactive(): Vue provides the Context object as reactive({ ... })`,
    )
}

export const checkContext = (file, source, folder) => {
  const name = basename(file)
  const script = parse(file, source)
  const problems = []
  const expected = CONTEXT_EXPORTS[name](folder)
  const actual = exportedNamesIn(script)
  if (actual.toSorted().join() !== expected.toSorted().join()) {
    problems.push(
      `exports ${actual.join(", ") || "nothing"}: a ${name} exports ${expected.join(" and ")}`,
    )
  }
  const typed =
    importsFrom(script, "./types").some(
      (element) => importedName(element) === "Context",
    ) &&
    nodesIn(
      script,
      (node) =>
        ts.isTypeReferenceNode(node) && node.typeName.getText() === "Context",
    ).length > 0
  if (!typed) {
    problems.push("does not take its shape from the Context type in ./types")
  }
  const [from, names] = CONTEXT_IMPORTS[name]
  const imported = importsFrom(script, from).map(importedName)
  const missing = names.filter((entry) => !imported.includes(entry))
  if (missing.length > 0) {
    problems.push(
      `does not import ${missing.join(" and ")} from "${from}": build the context the way the other components do (copy Tabs)`,
    )
  }
  return problems
}

export const checkTypeNames = (file, source, parts) => {
  const allowed = ["Props", ...parts.map((part) => `${part}Props`)]
  return parse(file, source)
    .statements.filter(
      (node) =>
        ts.isTypeAliasDeclaration(node) &&
        node.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword) &&
        node.name.text.endsWith("Props") &&
        !allowed.includes(node.name.text),
    )
    .map(
      (node) =>
        `exports ${node.name.text}: name the root's props Props and each part's <Root><Part>Props (${allowed.join(", ")})`,
    )
}

const objectOf = (node) => {
  while (
    node &&
    (ts.isSatisfiesExpression(node) ||
      ts.isAsExpression(node) ||
      ts.isParenthesizedExpression(node))
  ) {
    node = node.expression
  }
  return node && ts.isObjectLiteralExpression(node) ? node : undefined
}

const property = (object, name) =>
  object?.properties.find(
    (node) => ts.isPropertyAssignment(node) && keyName(node.name) === name,
  )?.initializer

const SERVER_HOOKS = ["useCallback", "useDebugValue", "useId", "useMemo"]

const isFunction = (node) =>
  !!node && (ts.isArrowFunction(node) || ts.isFunctionExpression(node))

const usesClientFeatures = (sourceFile) => {
  const functions = nodesIn(
    sourceFile,
    (node) =>
      (ts.isFunctionDeclaration(node) && !!node.name) ||
      (ts.isVariableDeclaration(node) &&
        ts.isIdentifier(node.name) &&
        (isFunction(node.initializer) ||
          (!!node.initializer &&
            ts.isCallExpression(node.initializer) &&
            node.initializer.expression.getText() === "useCallback"))),
  ).map((node) => node.name.text)
  const hooks = nodesIn(
    sourceFile,
    (node) =>
      ts.isCallExpression(node) &&
      ts.isIdentifier(node.expression) &&
      /^use[A-Z]/.test(node.expression.text) &&
      !SERVER_HOOKS.includes(node.expression.text),
  )
  const functionProps = nodesIn(sourceFile, (node) => {
    if (!ts.isJsxAttribute(node)) return false
    const value =
      node.initializer && ts.isJsxExpression(node.initializer)
        ? node.initializer.expression
        : undefined
    return (
      /^on[A-Z]/.test(node.name.getText()) ||
      isFunction(value) ||
      (!!value && ts.isIdentifier(value) && functions.includes(value.text))
    )
  })
  return hooks.length > 0 || functionProps.length > 0
}

export const checkExampleClient = (file, source) =>
  clientProblems(
    source,
    CLIENT.test(source) || usesClientFeatures(parse(file, source)),
    "hooks, event handlers or function props",
  )

const LAYOUT_CLASS = /(?:^|\s)example-(row|column)(?:\s|$)/

const exampleTemplate = (file, source) =>
  (file.endsWith(".vue")
    ? (source.match(/^<template>([\s\S]*)^<\/template>/m)?.[1] ?? "")
    : source.replace(/^---\n[\s\S]*?\n---\n/, "")
  )
    .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/g, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .trim()

const markupWrapper = (markup) => {
  const open = markup.match(/^<([a-z][\w-]*)\b[^>]*?\bclass="([^"]*)"[^>]*>/)
  const layout = open?.[2].match(LAYOUT_CLASS)?.[1]
  if (!layout) return null
  let depth = 0
  for (const match of markup.matchAll(
    new RegExp(`<(/?)${open[1]}\\b[^>]*?(/?)>`, "g"),
  )) {
    if (match[2]) continue
    depth += match[1] ? -1 : 1
    if (depth === 0) {
      return match.index + match[0].length === markup.length ? layout : null
    }
  }
  return null
}

const jsxWrapper = (node) => {
  while (node && ts.isParenthesizedExpression(node)) node = node.expression
  if (node && ts.isJsxFragment(node)) {
    const children = node.children.filter(
      (child) => !(ts.isJsxText(child) && child.containsOnlyTriviaWhiteSpaces),
    )
    return children.length === 1 ? jsxWrapper(children[0]) : null
  }
  if (!node || !ts.isJsxElement(node)) return null
  const className = node.openingElement.attributes.properties.find(
    (attribute) =>
      ts.isJsxAttribute(attribute) && attribute.name.getText() === "className",
  )?.initializer
  return className && ts.isStringLiteral(className)
    ? (className.text.match(LAYOUT_CLASS)?.[1] ?? null)
    : null
}

const defaultFunction = (sourceFile) =>
  sourceFile.statements.find(
    (node) =>
      ts.isFunctionDeclaration(node) &&
      node.modifiers?.some(
        (modifier) => modifier.kind === ts.SyntaxKind.DefaultKeyword,
      ),
  )

export const checkReactExample = (file, name, source) => {
  const sourceFile = parse(file, source)
  const imported = sourceFile.statements
    .filter(ts.isImportDeclaration)
    .flatMap(({ importClause }) => [
      ...(importClause?.name ? [importClause.name.text] : []),
      ...(importClause?.namedBindings?.elements?.map(
        (element) => element.name.text,
      ) ?? []),
    ])
  const expected = imported.includes(name) ? `${name}Example` : name
  return defaultFunction(sourceFile)?.name?.text === expected
    ? []
    : [
        `must default-export \`function ${expected}()\`, named after the file${expected === name ? "" : ` with the Example suffix, since ${name} is imported`}`,
      ]
}

export const checkExampleWrapper = (file, name, source) => {
  const layout = file.endsWith(".react.tsx")
    ? jsxWrapper(
        defaultFunction(parse(file, source))?.body?.statements.findLast(
          ts.isReturnStatement,
        )?.expression,
      )
    : markupWrapper(exampleTemplate(file, source))
  return layout
    ? [
        `wraps all of its content in example-${layout}; drop the wrapper and set ${layout} on <AutoExample name="${name}">`,
      ]
    : []
}

const pageExamples = async (file, slug, seen = new Set()) => {
  if (seen.has(file)) return []
  seen.add(file)
  const raw = await readFile(file, "utf8").catch(() => "")
  const fence = raw.match(/^---\n([\s\S]*?)\n---\n/)
  const frontmatter = fence?.[1] ?? ""
  const source = raw
    .slice(fence?.[0].length ?? 0)
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, "")
  const examples = [...source.matchAll(/<AutoExample\b[^>]*>/g)].flatMap(
    ([tag]) => {
      const name = tag.match(/\bname="([^"]+)"/)?.[1]
      const own = tag.match(/\bslug="([^"]+)"/)?.[1]
      return name ? [{ auto: true, name, slug: own ?? slug }] : []
    },
  )
  for (const [, binding, folder, name] of frontmatter.matchAll(
    /^import\s+([\w$]+)\s+from\s+["'][^"']*component-examples\/([\w-]+)\/(\w+)\.(?:astro|html|react\.tsx|svelte|vue)(?:\?raw)?["']/gm,
  )) {
    if (new RegExp(`(?<![\\w$])${binding}(?![\\w$])`).test(source)) {
      examples.push({ auto: false, name, slug: folder })
    }
  }
  for (const [, partial] of frontmatter.matchAll(
    /from "(\.{1,2}\/[^"]+\.astro)"/g,
  )) {
    const path = join(file, "..", partial)
    if (!relative(docsDir, path).startsWith("..")) {
      examples.push(...(await pageExamples(path, slug, seen)))
    }
  }
  return examples
}

const readModels = async () => {
  const apiDir = join(root, "src/component-api")
  const models = new Map()
  for (const slug of (await readdir(apiDir)).toSorted()) {
    const path = join(apiDir, slug, "api.ts")
    const source = await readFile(path, "utf-8").catch(() => null)
    if (!source) continue
    const api = objectOf(
      parse(path, source).statements.find(ts.isExportAssignment)?.expression,
    )
    const model = objectOf(property(api, "model"))
    const props = (framework) =>
      property(
        objectOf(property(model, "frameworks")),
        framework,
      )?.elements.map((entry) => property(objectOf(entry), "prop").text) ??
      (model ? [property(model, "prop").text] : [])
    models.set(property(api, "component")?.text, {
      api: relative(root, path),
      svelte: props("svelte"),
      vue: props("vue"),
    })
  }
  return models
}

const main = async () => {
  const errors = []
  const report = (file, message) =>
    errors.push(`${relative(root, file)}: ${message}`)
  const reportAll = (file, messages) => {
    for (const message of messages) report(file, message)
  }

  const folders = (await readdir(componentsDir, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .toSorted()

  const barrels = Object.fromEntries(
    await Promise.all(
      Object.keys(BARRELS).map(async (framework) => [
        framework,
        await readFile(
          join(root, "packages/opui", framework, "index.ts"),
          "utf-8",
        ),
      ]),
    ),
  )

  const models = await readModels()

  for (const folder of folders) {
    const dir = join(componentsDir, folder)
    const files = (await readdir(dir)).toSorted()
    const names = (ext) =>
      files
        .filter((file) => extname(file) === ext)
        .map((file) => basename(file, ext))

    const astro = names(".astro")
    const react = files
      .filter((file) => file.endsWith(".react.tsx"))
      .map((file) => basename(file, ".react.tsx"))
    const svelte = names(".svelte")
    const vue = names(".vue")
    for (const name of astro.filter((name) => !react.includes(name))) {
      report(join(dir, `${name}.astro`), "has no matching .react.tsx component")
    }
    for (const name of astro.filter((name) => !svelte.includes(name))) {
      report(join(dir, `${name}.astro`), "has no matching .svelte component")
    }
    for (const name of astro.filter((name) => !vue.includes(name))) {
      report(join(dir, `${name}.astro`), "has no matching .vue component")
    }
    for (const name of react.filter((name) => !astro.includes(name))) {
      report(join(dir, `${name}.react.tsx`), "has no matching .astro component")
    }
    for (const name of svelte.filter((name) => !astro.includes(name))) {
      report(join(dir, `${name}.svelte`), "has no matching .astro component")
    }
    for (const name of vue.filter((name) => !astro.includes(name))) {
      report(join(dir, `${name}.vue`), "has no matching .astro component")
    }
    for (const name of TYPE_FILES.filter((name) => !files.includes(name))) {
      report(join(dir, name), "is missing")
    }
    for (const [framework, extension] of Object.entries(BARRELS)) {
      for (const name of astro) {
        if (!barrels[framework].includes(`/${folder}/${name}${extension}"`)) {
          report(
            join(dir, `${name}.astro`),
            `is not exported from packages/opui/${framework}/index.ts`,
          )
        }
      }
    }

    for (const name of astro.filter((name) => !name.startsWith(folder))) {
      report(
        join(dir, `${name}.astro`),
        `is not named after its root: a part's name is ${folder} plus the region`,
      )
    }

    const context = CONTEXT_FILES.filter((name) => files.includes(name))
    if (context.length > 0) {
      for (const name of CONTEXT_FILES.filter(
        (name) => !files.includes(name),
      )) {
        report(join(dir, name), "is missing")
      }
    }

    const parts = astro.filter((name) => name !== folder)
    const sources = new Map()
    const tokens = new Map()
    for (const file of files) {
      const path = join(dir, file)
      const source = await readFile(path, "utf-8")
      sources.set(file, source)

      if (/^types.*\.ts$/.test(file)) {
        reportAll(path, checkSortedKeys(path, source))
        reportAll(path, checkTypeNames(path, source, parts))
      }
      reportAll(path, checkTypesImport(file, source))
      if (
        file === "types.ts" &&
        context.length > 0 &&
        !/^export type Context\b/m.test(source)
      ) {
        report(path, "has context files but exports no Context type for them")
      }
      if (CONTEXT_FILES.includes(file)) {
        reportAll(path, checkContext(path, source, folder))
      }
      if (file.endsWith(".vue")) {
        reportAll(path, checkProvide(path, source))
        reportAll(path, checkVueAttrs(source))
      }
      if (file.endsWith(".react.tsx")) {
        const svelte = `${basename(file, ".react.tsx")}.svelte`
        const snippets = files.includes(svelte)
          ? (destructuredRuns(
              svelte,
              await readFile(join(dir, svelte), "utf-8"),
            )?.slice(1) ?? [])
          : []
        reportAll(
          path,
          checkDestructuring(path, source, ["children", ...snippets.flat()]),
        )
      } else if ([".astro", ".svelte", ".vue"].includes(extname(file))) {
        reportAll(path, checkDestructuring(path, source))
      }
      if (extname(file) === ".ts") reportAll(path, checkIndexSignature(source))
      if (file.endsWith(".astro")) {
        reportAll(path, await checkVariableTagClassList(source))
      }
      for (const [extension, pattern, label] of CLASS_LISTS) {
        if (!file.endsWith(extension)) continue
        const lists = classLists(
          extension === ".vue"
            ? source.replace(/\$?props\.class\b/g, "className")
            : source,
          pattern,
        )
        reportAll(path, checkClassOrder(lists, label))
        reportAll(path, checkClassPrefix(lists, label))
        tokens.set(file, classTokens(lists))
      }
      if (file.endsWith(".react.tsx") || file === "context.react.ts") {
        reportAll(path, checkClient(source))
      }
      if (
        file === `${folder}.astro` &&
        !/export const title = "/.test(source)
      ) {
        report(path, 'is missing `export const title = "..."`')
      }
    }
    for (const name of astro) {
      for (const [extension] of CLASS_LISTS.slice(1)) {
        const file = `${name}${extension}`
        if (
          tokens.has(file) &&
          tokens.get(file) !== tokens.get(`${name}.astro`)
        ) {
          report(
            join(dir, file),
            `class order differs from ${name}.astro: list the classes in every framework in the order Astro does (base, states, variants, className)`,
          )
        }
      }
      for (const [framework, extension] of Object.entries(COMPONENT_FILES)) {
        const file = `${name}${extension}`
        if (!sources.has(file)) continue
        const path = join(dir, file)
        const source = sources.get(file)
        reportAll(
          path,
          checkPropsType(
            path,
            source,
            framework,
            name === folder ? "Props" : `${name}Props`,
          ),
        )
        if (framework !== "vue") reportAll(path, checkRest(path, source))
        if (["svelte", "vue"].includes(framework)) {
          reportAll(
            path,
            checkModel(
              path,
              source,
              framework,
              models.get(name) ?? {
                api: "its api.ts (none)",
                svelte: [],
                vue: [],
              },
            ),
          )
        }
      }
    }
  }

  const EXAMPLE_FILE = new RegExp(
    `\\.(${FRAMEWORK_IDS.map(exampleExtension).join("|").replaceAll(".", "\\.")})$`,
  )

  const exampleFolders = (await readdir(examplesDir, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .toSorted()

  const shown = []
  for (const file of (await readdir(docsDir))
    .filter((file) => file.endsWith(".astro"))
    .toSorted()) {
    const page = join(docsDir, file)
    for (const example of await pageExamples(page, basename(file, ".astro"))) {
      shown.push({ ...example, page })
    }
  }
  const exampleNames = new Map()

  for (const slug of exampleFolders) {
    const dir = join(examplesDir, slug)
    const files = (await readdir(dir, { withFileTypes: true }))
      .filter((entry) => entry.isFile() && EXAMPLE_FILE.test(entry.name))
      .map((entry) => entry.name)
    const names = [
      ...new Set(files.map((file) => file.replace(EXAMPLE_FILE, ""))),
    ].toSorted()
    exampleNames.set(slug, names)
    const page = join(docsDir, `${slug}.astro`)
    for (const file of files) {
      const path = join(dir, file)
      const source = await readFile(path, "utf8")
      for (const [, from] of source.matchAll(
        /from\s+["'](@opui\/[^"']*)["']/g,
      )) {
        report(path, `imports ${from}, use opui-css/<framework>`)
      }
      const name = file.replace(EXAMPLE_FILE, "")
      if (file.endsWith(".react.tsx")) {
        reportAll(path, checkExampleClient(path, source))
        reportAll(path, checkReactExample(path, name, source))
      }
      reportAll(path, checkExampleWrapper(path, name, source))
    }
    for (const name of names) {
      if (!/^[A-Z][A-Za-z0-9]*$/.test(name)) {
        report(
          join(dir, name),
          "is not PascalCase; name example files like Basics.astro or HiddenLabel.astro",
        )
      }
      if (
        !name.endsWith("Code") &&
        !shown.some((example) => example.slug === slug && example.name === name)
      ) {
        report(
          join(dir, name),
          `is shown on no docs page; add <AutoExample name="${name}" /> to ${relative(root, page)} or delete the files`,
        )
      }
      if (FRAMEWORK_AGNOSTIC_EXAMPLES.includes(`${slug}/${name}`)) continue
      const code = name.endsWith("Code")
      if (code && !names.includes(name.slice(0, -4))) {
        report(join(dir, name), `overrides no ${name.slice(0, -4)} example`)
      }
      for (const framework of FRAMEWORK_IDS) {
        const file = `${name}.${exampleExtension(framework)}`
        if (
          componentHasFramework(framework, slug) &&
          !(code && framework === "html") &&
          !files.includes(file)
        ) {
          report(join(dir, file), "is missing")
        }
      }
    }
  }

  for (const { name, page, slug } of shown.filter(({ auto }) => auto)) {
    if (!(exampleNames.get(slug) ?? []).includes(name)) {
      report(
        page,
        `shows <AutoExample name="${name}">, which has no files in ${relative(root, join(examplesDir, slug))}`,
      )
    }
  }

  const astroNames = exportedNames(barrels.astro)
  const astroTypes = exportedTypes(barrels.astro)
  const firstUnsorted = (list) =>
    list.findIndex(
      (item, index) =>
        index > 0 && list[index - 1].localeCompare(item, "en") > 0,
    )

  for (const [framework, source] of Object.entries(barrels)) {
    const barrel = join(root, "packages/opui", framework, "index.ts")
    const values = barrelExports(source).map(({ name }) => name)
    const value = firstUnsorted(values)
    if (value !== -1) {
      report(
        barrel,
        `sort the exports: ${values[value]} goes before ${values[value - 1]}`,
      )
    }
    const sources = typeExports(source).map(({ from }) => from)
    const line = firstUnsorted(sources)
    if (line !== -1) {
      report(
        barrel,
        `sort the type exports by source: ${sources[line]} goes before ${sources[line - 1]}`,
      )
    }
    for (const { names } of typeExports(source)) {
      const at = firstUnsorted(names)
      if (at !== -1) {
        report(
          barrel,
          `sort the type names: ${names[at]} goes before ${names[at - 1]}`,
        )
      }
    }
    const names = exportedNames(source)
    const missing = astroNames.filter((name) => !names.includes(name))
    const extra = names.filter((name) => !astroNames.includes(name))
    if (missing.length || extra.length) {
      report(
        barrel,
        `exports differ from astro (missing: ${missing.join(", ") || "none"}, extra: ${extra.join(", ") || "none"})`,
      )
    }
    const types = exportedTypes(source)
    const missingTypes = astroTypes.filter((name) => !types.includes(name))
    const extraTypes = types.filter((name) => !astroTypes.includes(name))
    if (missingTypes.length || extraTypes.length) {
      report(
        barrel,
        `type exports differ from astro (missing: ${missingTypes.join(", ") || "none"}, extra: ${extraTypes.join(", ") || "none"})`,
      )
    }
    for (const { from, names } of typeExports(source)) {
      if (
        names.some((name) => name.endsWith("Props")) &&
        !from.endsWith(`/${BARREL_TYPES[framework]}`)
      ) {
        report(
          barrel,
          `exports Props types from "${from}", not from ${BARREL_TYPES[framework]}`,
        )
      }
    }
    for (const name of names.filter(
      (name) => !types.includes(`${name}Props`),
    )) {
      report(
        barrel,
        `exports ${name} but no ${name}Props: export the root's type as Props as ${name}Props and a part's under its own name`,
      )
    }
    const firstType = source.search(/^export type /m)
    if (
      firstType !== -1 &&
      firstType < source.lastIndexOf("export { default")
    ) {
      report(
        barrel,
        "has a type export before a component export: the component exports come first, then the type exports",
      )
    }
  }

  if (errors.length > 0) {
    console.error(errors.join("\n"))
    console.error(`\n${errors.length} component check(s) failed.`)
    process.exit(1)
  }

  console.log(
    `Checked ${folders.length} component folders and ${exampleFolders.length} example folders.`,
  )
}

if (
  process.argv[1] &&
  realpathSync(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  await main()
}
