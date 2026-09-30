import { readFile, writeFile } from "node:fs/promises"
import { relative } from "node:path"
import { fileURLToPath } from "node:url"
import cssDeclarationSorter from "css-declaration-sorter"
import { globby } from "globby"
import postcss from "postcss"

const root = fileURLToPath(new URL("..", import.meta.url))
const check = process.argv.includes("--check")

const files = await globby(["packages/opui/**/*.css", "src/**/*.css"], {
  cwd: root,
  absolute: true,
  ignore: ["**/dist/**", "**/node_modules/**"],
})

const sorter = postcss([
  cssDeclarationSorter({ keepOverrides: true, order: "alphabetical" }),
])
const unsorted = []

for (const file of files.toSorted()) {
  const source = await readFile(file, "utf8")
  const { css } = await sorter.process(source, { from: file })
  if (css === source) continue
  if (check) unsorted.push(relative(root, file))
  else await writeFile(file, css)
}

if (unsorted.length > 0) {
  console.error("CSS declarations are not sorted alphabetically:")
  for (const file of unsorted) console.error(`  ${file}`)
  console.error('Run "pnpm sort-css" to fix.')
  process.exit(1)
}
