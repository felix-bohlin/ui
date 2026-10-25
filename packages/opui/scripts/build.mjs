import { mkdir, rm, writeFile } from "node:fs/promises"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import postcss from "postcss"
import atImport from "postcss-import"

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, "..")
const dist = resolve(root, "dist")

const targets = [
  {
    inputs: ["css/layers.css", "open-props.css", "css/imports.css"],
    out: "opui.css",
  },
  { inputs: ["css/components.css"], out: "opui.components.css" },
  { inputs: ["open-props.css"], out: "op.css" },
]

const processor = postcss([atImport()])

await rm(dist, { force: true, recursive: true })
await mkdir(dist, { recursive: true })

for (const { inputs, out } of targets) {
  const from = resolve(root, inputs.at(-1))
  const to = resolve(dist, out)
  const source = inputs
    .map((input) => `@import "${resolve(root, input)}";`)
    .join("\n")
  const result = await processor.process(source, {
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
  await writeFile(to, result.css)
  await writeFile(`${to}.map`, JSON.stringify(map))
  console.log(`built dist/${out} (+ .map)`)
}
