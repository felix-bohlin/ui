import { mkdir, rm, writeFile } from "node:fs/promises"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import postcss from "postcss"
import atImport from "postcss-import"

import { baselineYear, baselineYears, withoutCompat } from "./features.mjs"

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, "..")
const dist = resolve(root, "dist")

const library = ["css/layers.css", "open-props.css", "css/imports.css"]

const targets = [
  { inputs: library, out: "opui.css" },
  {
    inputs: ["css/components.css", "css/compat.css"],
    out: "opui.components.css",
  },
  { inputs: ["open-props.css"], out: "op.css" },
  ...baselineYears().map((year) => ({
    inputs: library,
    out: `opui.baseline-${year}.css`,
    plugins: [baselineYear(year)],
  })),
  { inputs: library, out: "opui.no-compat.css", plugins: [withoutCompat()] },
]

await rm(dist, { force: true, recursive: true })
await mkdir(dist, { recursive: true })

for (const { inputs, out, plugins = [] } of targets) {
  const from = resolve(root, inputs.at(-1))
  const to = resolve(dist, out)
  const source = inputs
    .map((input) => `@import "${resolve(root, input)}";`)
    .join("\n")
  const result = await postcss([atImport(), ...plugins]).process(source, {
    from,
    to,
    map: { annotation: `${out}.map`, inline: false, sourcesContent: false },
  })
  const problems = result.warnings().map((warning) => warning.toString())
  if (/@import\b/.test(result.css)) {
    problems.push(`dist/${out} still has an @import`)
  }
  if (problems.length > 0) {
    console.error(problems.join("\n"))
    process.exit(1)
  }
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
