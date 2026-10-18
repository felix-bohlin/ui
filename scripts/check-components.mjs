import { readdir, readFile } from "node:fs/promises"
import { basename, extname, join, relative } from "node:path"
import { fileURLToPath } from "node:url"
import { PACKAGE_FRAMEWORK_IDS } from "../src/utils/framework.js"

const root = fileURLToPath(new URL("..", import.meta.url))
const componentsDir = join(root, "packages/opui/components")

const errors = []
const report = (file, message) =>
  errors.push(`${relative(root, file)}: ${message}`)

const folders = (await readdir(componentsDir, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .toSorted()

const OBJECT_TYPE =
  /^(?:export )?type (\w+)(?:<[^=\n]*>)? = (?:[^\n{]* & )?\{\n([\s\S]*?)\n\}/gm
const KEY = /^ {2}(?:"([^"]+)"|(\w+))\??:/

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
  "context.ts",
  "context.vue.ts",
]

const TYPE_FILES = [
  "types.astro.ts",
  "types.d.vue.ts",
  "types.react.ts",
  "types.solid.ts",
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
  vue: "types.d.vue",
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
  [...source.matchAll(/^export \{ default as (\w+) \}/gm)]
    .map((match) => match[1])
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

const checkSortedKeys = (file, source) => {
  for (const [, typeName, body] of source.matchAll(OBJECT_TYPE)) {
    const names = body
      .split("\n")
      .map((line) => line.match(KEY))
      .filter(Boolean)
      .map((match) => match[1] ?? match[2])
    const sorted = names.toSorted((a, b) => a.localeCompare(b))
    if (names.join() !== sorted.join()) {
      report(
        file,
        `${typeName} keys are not sorted: expected ${sorted.join(", ")}`,
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

    if (/^\s*(export\s+)?interface\s/m.test(source)) {
      report(path, 'uses "interface"; use "type" instead')
    }
    if (/^types.*\.ts$/.test(file)) checkSortedKeys(path, source)
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

console.log(`Checked ${folders.length} component folders.`)
