import { mkdir, rm, writeFile } from "node:fs/promises"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import postcss from "postcss"
import atImport from "postcss-import"

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, "..")
const dist = resolve(root, "dist")

const targets = [
  { input: "css/imports.css", out: "opui.css" },
  { input: "css/components.css", out: "opui.components.css" },
  { input: "open-props.css", out: "op.css" },
]

const processor = postcss([atImport()])

await rm(dist, { force: true, recursive: true })
await mkdir(dist, { recursive: true })

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
