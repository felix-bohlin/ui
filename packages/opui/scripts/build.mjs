import { mkdir, rm, writeFile, readdir } from "node:fs/promises"
import { dirname, resolve, basename, extname } from "node:path"
import { fileURLToPath } from "node:url"
import postcss from "postcss"
import atImport from "postcss-import"

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, "..")
const dist = resolve(root, "dist")
const distWc = resolve(dist, "web-components")

const targets = [
  { input: "css/imports.css", out: "opui.css" },
  { input: "css/components.css", out: "opui.components.css" },
  { input: "open-props.css", out: "op.css" },
]

const processor = postcss([atImport()])

await rm(dist, { force: true, recursive: true })
await mkdir(dist, { recursive: true })
await mkdir(distWc, { recursive: true })

for (const { input, out } of targets) {
  const from = resolve(root, input)
  const to = resolve(dist, out)
  const result = await processor.process(`@import "${from}";`, {
    from: root,
    to,
    map: { inline: false, annotation: `${out}.map` },
  })
  await writeFile(to, result.css)
  await writeFile(`${to}.map`, result.map.toString())
  console.log(`built dist/${out} (+ .map)`)
}

// Generate web components CSS strings
const componentsDir = resolve(root, "css", "components")
const componentFiles = await readdir(componentsDir)

let wcStylesJs = ""
let wcStylesDts = ""

for (const file of componentFiles) {
  if (!file.endsWith(".css")) continue

  const from = resolve(componentsDir, file)
  const result = await processor.process(`@import "${from}";`, {
    from,
  })

  // Convert kebab-case file name to camelCase (e.g. text-field.css -> textFieldCSS)
  const name = basename(file, ".css")
  const camelName = name.replace(/-([a-z])/g, (g) => g[1].toUpperCase()) + "CSS"

  wcStylesJs += `export const ${camelName} = \`${result.css.replace(/`/g, "\\`")}\`;\n`
  wcStylesDts += `export const ${camelName}: string;\n`
}

await writeFile(resolve(distWc, "styles.js"), wcStylesJs)
await writeFile(resolve(distWc, "styles.d.ts"), wcStylesDts)
console.log(`built dist/web-components/styles.js (+ .d.ts)`)
