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
  const vue = names(".vue")
  for (const name of astro.filter((name) => !vue.includes(name))) {
    report(join(dir, `${name}.astro`), "has no matching .vue component")
  }
  for (const name of vue.filter((name) => !astro.includes(name))) {
    report(join(dir, `${name}.vue`), "has no matching .astro component")
  }

  for (const file of files) {
    const path = join(dir, file)
    const source = await readFile(path, "utf-8")

    if (/^\s*(export\s+)?interface\s/m.test(source)) {
      report(path, 'uses "interface"; use "type" instead')
    }
    if (file === "types.ts") checkSortedKeys(path, source)
    if (file === `${folder}.astro` && !/export const title = "/.test(source)) {
      report(path, 'is missing `export const title = "..."`')
    }
  }
}

if (errors.length > 0) {
  console.error(errors.join("\n"))
  console.error(`\n${errors.length} component check(s) failed.`)
  process.exit(1)
}

console.log(`Checked ${folders.length} component folders.`)
