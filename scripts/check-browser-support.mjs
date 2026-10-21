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
const coreDir = fileURLToPath(new URL("../packages/opui/core", import.meta.url))
const themeFile = fileURLToPath(
  new URL("../packages/opui/css/theme.css", import.meta.url),
)

const patterns = [
  { id: "anchor-positioning", pattern: /\b(anchor-name|position-anchor):/ },
  { id: "color-mix", pattern: /color-mix\(/ },
  { id: "container-scroll-state-queries", pattern: /scroll-state\(/ },
  { id: "container-style-queries", pattern: /@container style\(/ },
  { id: "corner-shape", pattern: /corner-shape:/ },
  { id: "dir-pseudo", pattern: /:dir\(/ },
  {
    id: "display-animation",
    pattern: /\b(?:content-visibility|display)\s[^,;]*allow-discrete/,
  },
  { id: "field-sizing", pattern: /field-sizing:/ },
  { id: "has", pattern: /:has\(/ },
  { id: "light-dark", pattern: /light-dark\(/ },
  { id: "relative-color", pattern: /\(\s*from\s/ },
  { id: "scrollbar-gutter", pattern: /scrollbar-gutter:/ },
  { id: "user-pseudos", pattern: /:user-(?:in)?valid\b/ },
]

const STYLESHEET = /@opui\/css\/components\/([\w-]+\.css)\?raw/g

const files = await readdir(componentsDir)
const components = {}
const stylesheets = {}

for (const file of files.sort()) {
  if (!file.endsWith(".astro")) continue
  const name = basename(file, ".astro")
  const content = await readFile(join(componentsDir, file), "utf-8")
  const match = content.match(/browserSupport=\{\[([\s\S]*?)\]\}/)
  if (!match) continue
  const ids = [...match[1].matchAll(/["']([^"']+)["']/g)].map((m) => m[1])
  if (ids.length === 0) continue
  components[name] = ids
  stylesheets[name] = [
    ...new Set([...content.matchAll(STYLESHEET)].map((m) => m[1])),
  ].sort()
}

const readCss = (files) =>
  Promise.all(
    files.map((file) =>
      access(file).then(
        () => readFile(file, "utf-8"),
        () => "",
      ),
    ),
  ).then((sources) => sources.join("\n"))

const shared = await readCss([
  themeFile,
  ...(await readdir(coreDir))
    .filter((file) => file.endsWith(".css"))
    .sort()
    .map((file) => join(coreDir, file)),
])

const missing = []
const unused = []

for (const [comp, ids] of Object.entries(components)) {
  const css = await readCss(stylesheets[comp].map((file) => join(cssDir, file)))
  for (const { id, pattern } of patterns) {
    if (pattern.test(css) && !ids.includes(id)) missing.push(`${comp}: "${id}"`)
    if (ids.includes(id) && !pattern.test(css) && !pattern.test(shared)) {
      unused.push(`${comp}: "${id}"`)
    }
  }
}

if (missing.length > 0) {
  console.warn("browserSupport is missing ids that the page's stylesheets use:")
  for (const entry of missing) console.warn(`  ${entry}`)
}

if (unused.length > 0) {
  console.warn(
    "browserSupport lists ids that no stylesheet the page installs uses:",
  )
  for (const entry of unused) console.warn(`  ${entry}`)
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
