import { readdir, readFile } from "node:fs/promises"
import { basename, dirname, extname, join, relative, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const root = fileURLToPath(new URL("..", import.meta.url))
const opuiDir = join(root, "packages/opui")
const srcDir = join(root, "src")
const openPropsEntry = join(opuiDir, "open-props.css")

const CONSUMER_SET = ["--anchor-position-area"]

const BASES = {
  "button-group.css": ["button.css"],
  "checkbox.css": ["choice.css"],
  "radio.css": ["choice.css"],
  "select.css": ["text-field.css"],
  "text-input.css": ["text-field.css"],
  "textarea.css": ["text-field.css"],
  "toggle-group.css": ["toggle-button.css"],
}

const DECLARATION = /(--[\w-]+)\s*:|["'`](--[\w-]+)["'`]/g
const READ = /var\(\s*(--[\w-]+)/g
const IMPORT = /@import\s+["']([^"']+)["']/g
const STYLE = /<style\b[^>]*>([\s\S]*?)<\/style>/g

const listFiles = async (dir, extensions) => {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = await Promise.all(
    entries.map((entry) => {
      const path = join(dir, entry.name)
      if (entry.isDirectory()) {
        return ["dist", "node_modules"].includes(entry.name)
          ? []
          : listFiles(path, extensions)
      }
      return extensions.includes(extname(entry.name)) ? [path] : []
    }),
  )
  return files.flat()
}

const resolveImport = (from, specifier) =>
  specifier.startsWith(".") || from.includes("node_modules")
    ? resolve(dirname(from), specifier)
    : join(root, "node_modules", specifier)

const collectImports = async (file, seen = new Set()) => {
  if (seen.has(file)) return seen
  seen.add(file)
  const source = await readFile(file, "utf8")
  for (const [, specifier] of source.matchAll(IMPORT)) {
    await collectImports(resolveImport(file, specifier), seen)
  }
  return seen
}

const declarations = (source) =>
  [...source.matchAll(DECLARATION)].map(([, name, quoted]) => name ?? quoted)

const scan = async (dir, extensions, css = (_, source) => source) =>
  Promise.all(
    (await listFiles(dir, extensions)).toSorted().map(async (file) => {
      const source = await readFile(file, "utf8")
      return {
        declared: new Set(declarations(source)),
        file,
        read: new Set(
          [...css(file, source).matchAll(READ)].map(([, name]) => name),
        ),
      }
    }),
  )

const styles = (file, source) =>
  extname(file) === ".css"
    ? source
    : [...source.matchAll(STYLE)].map(([, css]) => css).join("\n")

const openProps = await Promise.all(
  [...(await collectImports(openPropsEntry))].map(async (file) =>
    declarations(await readFile(file, "utf8")),
  ),
)
const packageFiles = await scan(opuiDir, [
  ".astro",
  ".css",
  ".svelte",
  ".tsx",
  ".vue",
])
const srcFiles = await scan(
  srcDir,
  [".astro", ".css", ".html", ".svelte", ".tsx", ".vue"],
  styles,
)

const declaredIn = (files) => files.flatMap(({ declared }) => [...declared])
const packageDefined = new Set([
  ...openProps.flat(),
  ...declaredIn(packageFiles),
  ...CONSUMER_SET,
])
const srcDefined = new Set([...packageDefined, ...declaredIn(srcFiles)])
const declaredBy = new Map(
  packageFiles.map(({ declared, file }) => [file, declared]),
)

const undefinedReads = new Map()
const addUndefined = (name, file) => {
  if (!undefinedReads.has(name)) undefinedReads.set(name, new Set())
  undefinedReads.get(name).add(relative(root, file))
}

const privateErrors = []

for (const { declared, file, read } of packageFiles) {
  const bases = BASES[basename(file)] ?? []
  const local = new Set([
    ...declared,
    ...bases.flatMap((base) => [
      ...(declaredBy.get(join(dirname(file), base)) ?? []),
    ]),
  ])
  for (const name of read) {
    if (!name.startsWith("--_")) {
      if (!packageDefined.has(name)) addUndefined(name, file)
    } else if (!local.has(name)) {
      privateErrors.push(
        `${name} is read in ${relative(root, file)} but not defined there${bases.length > 0 ? ` or in ${bases.join(", ")}` : ""}`,
      )
    }
  }
}

for (const { file, read } of srcFiles) {
  for (const name of read) {
    if (!srcDefined.has(name)) addUndefined(name, file)
  }
}

const errors = [
  ...[...undefinedReads]
    .toSorted(([a], [b]) => a.localeCompare(b))
    .map(
      ([name, files]) =>
        `${name} is read but never defined (${[...files].toSorted().join(", ")})`,
    ),
  ...privateErrors.toSorted(),
]

if (errors.length > 0) {
  console.error(errors.join("\n"))
  process.exit(1)
}

const checked = new Set(
  [...packageFiles, ...srcFiles].flatMap(({ read }) => [...read]),
)
console.log(`Checked ${checked.size} custom properties`)
