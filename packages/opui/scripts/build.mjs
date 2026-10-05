import { mkdir, readFile, rm, writeFile } from "node:fs/promises"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import postcss from "postcss"
import atImport from "postcss-import"

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, "..")
const dist = resolve(root, "dist")

const targets = [
  { input: "css/imports.css", out: "opui.css" },
  { input: "css/components.css", out: "opui.components.css", layers: true },
  { input: "open-props.css", out: "op.css" },
]

const layerOrder = (await readFile(resolve(root, "css/imports.css"), "utf8"))
  .split("\n")
  .find((line) => line.startsWith("@layer "))

const processor = postcss([atImport()])

await rm(dist, { force: true, recursive: true })
await mkdir(dist, { recursive: true })

for (const { input, layers, out } of targets) {
  const from = resolve(root, input)
  const to = resolve(dist, out)
  const result = await processor.process(`@import "${from}";`, {
    from,
    to,
    map: { annotation: `${out}.map`, inline: false, sourcesContent: false },
  })
  const map = result.map.toJSON()
  map.sources = map.sources.map((source) =>
    source.replace(
      /^(?:\.\.\/)+node_modules\/\.pnpm\/[^/]+\/node_modules\//,
      "../../",
    ),
  )
  if (layers) map.mappings = `;${map.mappings}`
  await writeFile(to, layers ? `${layerOrder}\n${result.css}` : result.css)
  await writeFile(`${to}.map`, JSON.stringify(map))
  console.log(`built dist/${out} (+ .map)`)
}
