import { readFile, writeFile } from "node:fs/promises"
import { relative } from "node:path"
import { fileURLToPath } from "node:url"
import cssDeclarationSorter from "css-declaration-sorter"
import { globby } from "globby"
import postcss from "postcss"

const root = fileURLToPath(new URL("..", import.meta.url))
const check = process.argv.includes("--check")

const files = await globby(
  [
    "packages/opui/**/*.{astro,css,html,svelte,vue}",
    "src/**/*.{astro,css,html,svelte,vue}",
  ],
  {
    cwd: root,
    absolute: true,
    ignore: ["**/dist/**", "**/node_modules/**"],
  },
)

const PRIVATE_PROPERTY = /^--_/

const privateOrder = (a, b) =>
  a === b ? 0 : a === "--_motion" ? -1 : b === "--_motion" ? 1 : a < b ? -1 : 1

const sortRun = (items) => {
  if (items.length < 2) return
  const sorted = items.toSorted((a, b) =>
    privateOrder(a.decl.prop, b.decl.prop),
  )
  if (sorted.every((item, index) => item === items[index])) return
  const first = items[0].nodes[0]
  const parent = first.parent
  const previous = first.prev()
  const before = items.map(({ nodes }, index) =>
    index === 0
      ? nodes[0].raws.before
      : nodes[0].raws.before?.replace(/\n[^\S\n]*(?=\n)/g, ""),
  )
  for (const { nodes } of items) for (const node of nodes) node.remove()
  let last = previous
  sorted.forEach(({ nodes }, index) => {
    nodes[0].raws.before = before[index]
    for (const node of nodes) {
      if (last) parent.insertAfter(last, node)
      else parent.prepend(node)
      last = node
    }
  })
}

const sortPrivateProperties = {
  postcssPlugin: "sort-private-properties",
  OnceExit(root) {
    root.walk((node) => {
      if (!node.nodes) return
      const runs = [[]]
      let comments = []
      for (const child of node.nodes) {
        const run = runs.at(-1)
        if (child.type === "comment") {
          if (
            run.length &&
            !comments.length &&
            !child.raws.before?.includes("\n")
          ) {
            run.at(-1).nodes.push(child)
          } else comments.push(child)
        } else if (child.type === "decl" && PRIVATE_PROPERTY.test(child.prop)) {
          run.push({ decl: child, nodes: [...comments, child] })
          comments = []
        } else {
          if (run.length) runs.push([])
          comments = []
        }
      }
      runs.forEach(sortRun)
    })
  },
}

const sorter = postcss([
  cssDeclarationSorter({ keepOverrides: true, order: "alphabetical" }),
  sortPrivateProperties,
])
const unsorted = []

const STYLE_BLOCK = /(<style\b[^>]*>)([\s\S]*?)(<\/style>)/g

const sortSource = async (file, source) => {
  if (file.endsWith(".css")) {
    const { css } = await sorter.process(source, { from: file })
    return css
  }
  let result = ""
  let last = 0
  for (const match of source.matchAll(STYLE_BLOCK)) {
    const [block, open, css, close] = match
    const sorted = css.trim()
      ? (await sorter.process(css, { from: undefined })).css
      : css
    result += source.slice(last, match.index) + open + sorted + close
    last = match.index + block.length
  }
  return result + source.slice(last)
}

for (const file of files.toSorted()) {
  const source = await readFile(file, "utf8")
  const css = await sortSource(file, source)
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
