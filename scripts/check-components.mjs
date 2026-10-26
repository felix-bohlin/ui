import { readdir, readFile } from "node:fs/promises"
import { basename, extname, join, relative } from "node:path"
import { fileURLToPath } from "node:url"
import ts from "typescript"
import {
  componentHasFramework,
  exampleExtension,
  FRAMEWORK_AGNOSTIC_EXAMPLES,
  FRAMEWORK_IDS,
  PACKAGE_FRAMEWORK_IDS,
} from "../src/utils/framework.js"
import { barrelExports } from "../src/utils/package-source.js"

const root = fileURLToPath(new URL("..", import.meta.url))
const componentsDir = join(root, "packages/opui/components")
const examplesDir = join(root, "src/component-examples")

const errors = []
const report = (file, message) =>
  errors.push(`${relative(root, file)}: ${message}`)

const folders = (await readdir(componentsDir, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .toSorted()

const SCRIPTS = [
  [".astro", /^---\n([\s\S]*?)\n---/g],
  [".react.tsx", /^([\s\S]*)$/g],
  [".svelte", /<script\b[^>]*>([\s\S]*?)<\/script>/g],
  [".vue", /<script\b[^>]*>([\s\S]*?)<\/script>/g],
]

const CLASS_LISTS = [
  [".astro", /class:list=\{\[/g, "class:list"],
  [".react.tsx", /\bcx\(\[/g, "cx"],
  [".svelte", /\bclass=\{\[/g, "class"],
  [".vue", /:class="\[/g, ":class"],
]

const CLIENT =
  /\buse(?:ActionState|Context|Effect|ImperativeHandle|InsertionEffect|LayoutEffect|Optimistic|Reducer|Ref|State|SyncExternalStore|Transition)\(|\buse\w+Context\(|\bcreateContext\(|<\w+Context\b|\bon[A-Z]\w*(?:=\{|: )/

const CONTEXT_FILES = [
  "context.astro.ts",
  "context.react.ts",
  "context.svelte.ts",
  "context.vue.ts",
]

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

const BARREL_TYPES = {
  astro: "types.astro",
  react: "types.react",
  svelte: "types.svelte",
  vue: "types.vue-props",
}

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
    let depth = 1
    let end = match.index + match[0].length
    while (end < source.length && depth > 0) {
      if (source[end] === "[") depth++
      if (source[end] === "]") depth--
      end++
    }
    return splitTopLevel(source.slice(match.index + match[0].length, end - 1))
  })

const checkClassOrder = (file, lists, label) => {
  for (const items of lists) {
    const index = items.indexOf("className")
    if (index !== -1 && index !== items.length - 1) {
      report(file, `className must be the last entry in ${label}`)
    }
  }
}

const classTokens = (lists) =>
  lists
    .filter((items) => items.includes("className"))
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

const checkClient = (file, source) => {
  const client = source.startsWith('"use client"\n')
  if (CLIENT.test(source) && !client) {
    report(
      file,
      'uses context, state, effects or event handlers; start it with "use client"',
    )
  }
  if (!CLIENT.test(source) && client) {
    report(
      file,
      'starts with "use client" but uses no context, state, effects or event handlers',
    )
  }
}

const checkIndexSignature = (file, source) => {
  if (/^\s*\[key: string\]:/m.test(source)) {
    report(file, "uses an index signature; declare the props explicitly")
  }
}

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

const checkSortedKeys = (file, source) => {
  const visit = (node) => {
    if (ts.isTypeLiteralNode(node)) {
      const sorted = unsorted(
        node.members
          .filter((member) => member.name)
          .map((member) => keyName(member.name)),
      )
      if (sorted) {
        report(
          file,
          `${typeLabel(node)} keys are not sorted: expected ${sorted.join(", ")}`,
        )
      }
    }
    ts.forEachChild(node, visit)
  }
  visit(parse(file, source))
}

const isPropsSource = (node) =>
  node.getText() === "Astro.props" ||
  (ts.isCallExpression(node) &&
    ["$props", "defineProps"].includes(node.expression.getText()))

const propsBinding = (node) => {
  if (
    ts.isVariableDeclaration(node) &&
    ts.isObjectBindingPattern(node.name) &&
    node.initializer &&
    isPropsSource(node.initializer)
  ) {
    return node.name
  }
  if (
    ts.isFunctionDeclaration(node) &&
    node.modifiers?.some((m) => m.kind === ts.SyntaxKind.DefaultKeyword) &&
    node.parameters[0] &&
    ts.isObjectBindingPattern(node.parameters[0].name)
  ) {
    return node.parameters[0].name
  }
  return ts.forEachChild(node, propsBinding)
}

const destructuredRuns = (file, source) => {
  const [, pattern] = SCRIPTS.find(([extension]) => file.endsWith(extension))
  const script = [...source.matchAll(pattern)].map((m) => m[1]).join("\n")
  const binding = propsBinding(parse(file, script))
  if (!binding) return null
  const runs = [[]]
  for (const element of binding.elements) {
    if (element.dotDotDotToken) continue
    if (element.getFullText().includes("// Snippets")) runs.push([])
    runs.at(-1).push(keyName(element.propertyName ?? element.name))
  }
  return runs
}

const checkDestructuring = (file, source, slots) => {
  const runs = destructuredRuns(file, source)
  if (!runs) return
  if (slots) {
    const keys = runs.flat()
    const props = keys.filter((key) => !slots.includes(key))
    const slotKeys = keys.filter((key) => slots.includes(key))
    const expected = [
      ...(unsorted(props) ?? props),
      ...(unsorted(slotKeys, slotOrder) ?? slotKeys),
    ]
    if (keys.join() !== expected.join()) {
      report(
        file,
        `props are not destructured in order, slots last: expected ${expected.join(", ")}`,
      )
    }
    return
  }
  for (const [index, run] of runs.entries()) {
    const sorted = unsorted(run, index > 0 ? slotOrder : undefined)
    if (sorted) {
      report(
        file,
        `props are not destructured in order: expected ${sorted.join(", ")}`,
      )
    }
  }
}

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

  const context = CONTEXT_FILES.filter((name) => files.includes(name))
  if (context.length > 0) {
    for (const name of CONTEXT_FILES.filter((name) => !files.includes(name))) {
      report(join(dir, name), "is missing")
    }
  }

  const tokens = new Map()
  for (const file of files) {
    const path = join(dir, file)
    const source = await readFile(path, "utf-8")

    if (/^types.*\.ts$/.test(file)) checkSortedKeys(path, source)
    if (file.endsWith(".react.tsx")) {
      const svelte = `${basename(file, ".react.tsx")}.svelte`
      const snippets = files.includes(svelte)
        ? (destructuredRuns(
            svelte,
            await readFile(join(dir, svelte), "utf-8"),
          )?.slice(1) ?? [])
        : []
      checkDestructuring(path, source, ["children", ...snippets.flat()])
    } else if ([".astro", ".svelte", ".vue"].includes(extname(file))) {
      checkDestructuring(path, source)
    }
    if (extname(file) === ".ts") checkIndexSignature(path, source)
    for (const [extension, pattern, label] of CLASS_LISTS) {
      if (!file.endsWith(extension)) continue
      const lists = classLists(
        extension === ".vue"
          ? source.replace(/\$?props\.class\b/g, "className")
          : source,
        pattern,
      )
      checkClassOrder(path, lists, label)
      tokens.set(file, classTokens(lists))
    }
    if (file.endsWith(".react.tsx") || file === "context.react.ts") {
      checkClient(path, source)
    }
    if (file === `${folder}.astro` && !/export const title = "/.test(source)) {
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
        report(join(dir, file), `class order differs from ${name}.astro`)
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

for (const slug of exampleFolders) {
  const dir = join(examplesDir, slug)
  const files = (await readdir(dir, { withFileTypes: true }))
    .filter((entry) => entry.isFile() && EXAMPLE_FILE.test(entry.name))
    .map((entry) => entry.name)
  const names = [
    ...new Set(files.map((file) => file.replace(EXAMPLE_FILE, ""))),
  ].toSorted()
  for (const file of files) {
    const source = await readFile(join(dir, file), "utf8")
    for (const [, from] of source.matchAll(/from\s+["'](@opui\/[^"']*)["']/g)) {
      report(join(dir, file), `imports ${from}, use opui-css/<framework>`)
    }
  }
  for (const name of names) {
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

const astroNames = exportedNames(barrels.astro)
const astroTypes = exportedTypes(barrels.astro)
for (const [framework, source] of Object.entries(barrels)) {
  const barrel = join(root, "packages/opui", framework, "index.ts")
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
}

if (errors.length > 0) {
  console.error(errors.join("\n"))
  console.error(`\n${errors.length} component check(s) failed.`)
  process.exit(1)
}

console.log(
  `Checked ${folders.length} component folders and ${exampleFolders.length} example folders.`,
)
