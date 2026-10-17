import { features } from "web-features"
import { access, readdir, readFile } from "node:fs/promises"
import { join, basename } from "node:path"
import { fileURLToPath } from "node:url"

import { computeBrowserSupport } from "../src/utils/browser-support.ts"

const componentsDir = fileURLToPath(
  new URL("../src/docs/components", import.meta.url),
)
const cssDir = fileURLToPath(
  new URL("../packages/opui/css/components", import.meta.url),
)

const patterns = [
  { id: "anchor-positioning", pattern: /\b(anchor-name|position-anchor):/ },
  { id: "color-mix", pattern: /color-mix\(/ },
  { id: "container-scroll-state-queries", pattern: /scroll-state\(/ },
  { id: "container-style-queries", pattern: /@container style\(/ },
  { id: "corner-shape", pattern: /corner-shape:/ },
  { id: "dir-pseudo", pattern: /:dir\(/ },
  { id: "field-sizing", pattern: /field-sizing:/ },
  { id: "has", pattern: /:has\(/ },
  { id: "light-dark", pattern: /light-dark\(/ },
  { id: "relative-color", pattern: /\(from / },
]

const files = await readdir(componentsDir)
const components = {}

for (const file of files.sort()) {
  if (!file.endsWith(".astro")) continue
  const name = basename(file, ".astro")
  const content = await readFile(join(componentsDir, file), "utf-8")
  const match = content.match(/browserSupport=\{\[([\s\S]*?)\]\}/)
  if (!match) continue
  const ids = [...match[1].matchAll(/["']([^"']+)["']/g)].map((m) => m[1])
  if (ids.length > 0) components[name] = ids
}

const missing = []

for (const [comp, ids] of Object.entries(components)) {
  const cssFile = join(cssDir, `${comp}.css`)
  const css = await access(cssFile).then(
    () => readFile(cssFile, "utf-8"),
    () => "",
  )
  for (const { id, pattern } of patterns) {
    if (pattern.test(css) && !ids.includes(id)) missing.push(`${comp}: "${id}"`)
  }
}

if (missing.length > 0) {
  console.warn("browserSupport is missing ids that the page's own CSS uses:")
  for (const entry of missing) console.warn(`  ${entry}`)
}

const unknown = Object.entries(components).flatMap(([comp, ids]) =>
  ids.filter((id) => !features[id]).map((id) => `${comp}: "${id}"`),
)
if (unknown.length > 0) {
  console.error("Unknown web-features ids in browserSupport:")
  for (const entry of unknown) console.error(`  ${entry}`)
  process.exit(1)
}

const partials = Object.entries(components).flatMap(([comp, ids]) =>
  computeBrowserSupport(ids)
    .filter((entry) => entry.level === "partial")
    .map((entry) => ({
      browser: entry.browser,
      comp,
      supported: entry.supportedFeatures,
      unsupported: entry.unsupportedFeatures,
    })),
)

if (partials.length === 0) {
  console.log("No components have partial support in any browser.")
} else {
  console.log("Components with PARTIAL support:")
  for (const p of partials) {
    console.log(
      `  ${p.comp.padEnd(20)} ${p.browser.padEnd(8)} missing: [${p.unsupported.join(", ")}]  (has: [${p.supported.join(", ")}])`,
    )
  }
}
