import { features } from "web-features"
import { readdir, readFile } from "node:fs/promises"
import { join, basename } from "node:path"
import { fileURLToPath } from "node:url"

const componentsDir = fileURLToPath(
  new URL("../src/docs/components", import.meta.url),
)

const files = await readdir(componentsDir)
const components = {}

for (const file of files.sort()) {
  if (!file.endsWith(".astro")) continue
  const name = basename(file, ".astro")
  const content = await readFile(join(componentsDir, file), "utf-8")
  const match = content.match(/browserSupport=\{\[([\s\S]*?)\]\}/)
  if (!match) continue
  const ids = [...match[1].matchAll(/"([^"]+)"/g)].map((m) => m[1])
  if (ids.length > 0) components[name] = ids
}

const BROWSERS = ["chrome", "edge", "firefox", "safari"]

function getSupport(featureId, browser) {
  const f = features[featureId]
  if (!f) return undefined
  const direct = f.status?.support?.[browser]
  if (direct !== undefined) return direct
  const byCompat = f.status?.by_compat_key
  if (!byCompat) return undefined
  let worst,
    sawAny = false
  for (const entry of Object.values(byCompat)) {
    const v = entry.support?.[browser]
    if (v === undefined) continue
    sawAny = true
    if (v === false) return false
    if (!worst || parseInt(v) > parseInt(worst)) worst = v
  }
  return sawAny ? worst : undefined
}

const partials = []

for (const [comp, ids] of Object.entries(components)) {
  for (const browser of BROWSERS) {
    const supported = []
    const unsupported = []
    for (const id of ids) {
      const v = getSupport(id, browser)
      if (typeof v === "string" && parseInt(v)) supported.push(id)
      else unsupported.push(id)
    }
    let level
    if (unsupported.length === 0) level = "full"
    else if (supported.length === 0) level = "none"
    else level = "partial"
    if (level === "partial") {
      partials.push({ comp, browser, supported, unsupported })
    }
  }
}

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
