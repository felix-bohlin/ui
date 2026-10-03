import { readdir, readFile } from "node:fs/promises"
import { dirname, extname, join, relative, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const root = fileURLToPath(new URL("..", import.meta.url))
const opuiDir = join(root, "packages/opui")
const openPropsEntry = join(opuiDir, "open-props.css")

const CONSUMER_SET = ["--anchor-position-area", "--text-color-2"]
const CONSUMER_SET_PATTERN = /^--_(col|rank|sum)-\d+$/

const DECLARATION = /(--[\w-]+)\s*:/g
const READ = /var\(\s*(--[\w-]+)/g
const IMPORT = /@import\s+["']([^"']+)["']/g

const listCssFiles = async (dir) => {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = await Promise.all(
    entries.map((entry) => {
      const path = join(dir, entry.name)
      if (entry.isDirectory()) {
        return ["dist", "node_modules"].includes(entry.name)
          ? []
          : listCssFiles(path)
      }
      return [".astro", ".css", ".vue"].includes(extname(entry.name))
        ? [path]
        : []
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

const defined = new Set()
const reads = new Map()

for (const file of await collectImports(openPropsEntry)) {
  const source = await readFile(file, "utf8")
  for (const [, name] of source.matchAll(DECLARATION)) defined.add(name)
}

for (const file of (await listCssFiles(opuiDir)).toSorted()) {
  const source = await readFile(file, "utf8")
  for (const [, name] of source.matchAll(DECLARATION)) defined.add(name)
  for (const [, name] of source.matchAll(READ)) {
    if (!reads.has(name)) reads.set(name, new Set())
    reads.get(name).add(relative(root, file))
  }
}

const errors = [...reads]
  .filter(
    ([name]) =>
      !defined.has(name) &&
      !CONSUMER_SET.includes(name) &&
      !CONSUMER_SET_PATTERN.test(name),
  )
  .toSorted(([a], [b]) => a.localeCompare(b))
  .map(
    ([name, files]) =>
      `${name} is read but never defined (${[...files].toSorted().join(", ")})`,
  )

if (errors.length > 0) {
  console.error(errors.join("\n"))
  process.exit(1)
}

console.log(`Checked ${reads.size} custom properties`)
