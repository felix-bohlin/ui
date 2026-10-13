import { readdir, readFile } from "node:fs/promises"
import { basename, extname, join, relative } from "node:path"
import { fileURLToPath } from "node:url"

const root = fileURLToPath(new URL("..", import.meta.url))
const componentsDir = join(root, "packages/opui/components")

const errors = []
const report = (file, message) =>
  errors.push(`${relative(root, file)}: ${message}`)

const folders = (await readdir(componentsDir, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .toSorted()

const OBJECT_TYPE = /export type (\w+)(?:<\w+>)? = \{\n([\s\S]*?)\n\}/g
const KEY = /^ {2}(?:"([^"]+)"|(\w+))\??:/

const CLASS_LIST = /class:list=\{\[/g
const CX = /\bcx\(\[/g

const TYPE_FILES = [
  "types.astro.ts",
  "types.d.vue.ts",
  "types.react.ts",
  "types.solid.ts",
  "types.svelte.ts",
  "types.ts",
]

const BARRELS = {
  astro: ".astro",
  react: ".react",
  svelte: ".svelte",
  vue: ".vue",
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

const checkClassOrder = (file, source, pattern, label) => {
  for (const match of source.matchAll(pattern)) {
    let depth = 1
    let end = match.index + match[0].length
    while (end < source.length && depth > 0) {
      if (source[end] === "[") depth++
      if (source[end] === "]") depth--
      end++
    }
    const items = splitTopLevel(
      source.slice(match.index + match[0].length, end - 1),
    )
    const index = items.indexOf("className")
    if (index !== -1 && index !== items.length - 1) {
      report(file, `className must be the last entry in ${label}`)
    }
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

  for (const file of files) {
    const path = join(dir, file)
    const source = await readFile(path, "utf-8")

    if (/^\s*(export\s+)?interface\s/m.test(source)) {
      report(path, 'uses "interface"; use "type" instead')
    }
    if (file === "types.ts") checkSortedKeys(path, source)
    if (extname(file) === ".ts") checkIndexSignature(path, source)
    if (extname(file) === ".astro") {
      checkClassOrder(path, source, CLASS_LIST, "class:list")
    }
    if (file.endsWith(".react.tsx")) checkClassOrder(path, source, CX, "cx")
    if (file === `${folder}.astro` && !/export const title = "/.test(source)) {
      report(path, 'is missing `export const title = "..."`')
    }
  }
}

const astroNames = exportedNames(barrels.astro)
for (const [framework, source] of Object.entries(barrels)) {
  const names = exportedNames(source)
  const missing = astroNames.filter((name) => !names.includes(name))
  const extra = names.filter((name) => !astroNames.includes(name))
  if (missing.length || extra.length) {
    report(
      join(root, "packages/opui", framework, "index.ts"),
      `exports differ from astro (missing: ${missing.join(", ") || "none"}, extra: ${extra.join(", ") || "none"})`,
    )
  }
}

if (errors.length > 0) {
  console.error(errors.join("\n"))
  console.error(`\n${errors.length} component check(s) failed.`)
  process.exit(1)
}

console.log(`Checked ${folders.length} component folders.`)
