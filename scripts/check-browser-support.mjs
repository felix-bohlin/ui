import { realpathSync } from "node:fs"
import { readdir, readFile } from "node:fs/promises"
import { join } from "node:path"
import { fileURLToPath } from "node:url"
import postcss from "postcss"

import { featureOf, patterns } from "../packages/opui/scripts/features.mjs"
import { withoutComments } from "../src/component-api/browser-features.mjs"
import {
  computeBrowserSupport,
  SHARED_FEATURES,
} from "../src/utils/browser-support.ts"
import { loadCatalog } from "./catalog.mjs"

/** @param {{ core?: string[], detected: string[], ignore?: string[] }} page */
export const exceptionProblems = ({ core = [], detected, ignore = [] }) => ({
  core: core.filter((id) => detected.includes(id)),
  ignore: ignore.filter((id) => !detected.includes(id)),
})

export const lackingIds = (ids) =>
  [
    ...new Set(
      computeBrowserSupport(ids).flatMap(
        ({ unsupportedFeatures }) => unsupportedFeatures,
      ),
    ),
  ].toSorted()

/** @param {{ fallbacks: Record<string, string>, lacking: string[] }} page */
export const fallbackProblems = ({ fallbacks, lacking }) => ({
  missing: lacking.filter((id) => !Object.hasOwn(fallbacks, id)),
  unneeded: Object.keys(fallbacks)
    .filter((id) => !lacking.includes(id))
    .toSorted(),
})

const readCss = (files) =>
  Promise.all(
    files.map(async (file) =>
      withoutComments(await readFile(file, "utf-8"), file),
    ),
  ).then((sources) => sources.join("\n"))

const nests = (source) => {
  let nested = false
  postcss.parse(source).walk((node) => {
    if (node.parent?.type === "rule" && node.type !== "decl") nested = true
  })
  return nested
}

const SHARED_DETECTORS = {
  "cascade-layers": (source) => /@layer\b/.test(source),
  nesting: nests,
  oklab: (source) => /\boklch\(/.test(source),
}

export const unusedSharedFeatures = (source) =>
  SHARED_FEATURES.filter((id) => {
    const pattern = patterns.find((entry) => entry.id === id)?.pattern
    const detect = SHARED_DETECTORS[id] ?? ((css) => !!pattern?.test(css))
    return !detect(source)
  })

const sharedSheets = async () => {
  const coreDir = fileURLToPath(
    new URL("../packages/opui/core", import.meta.url),
  )
  return [
    ...(await readdir(coreDir))
      .filter((file) => file.endsWith(".css"))
      .toSorted()
      .map((file) => join(coreDir, file)),
    ...["layers.css", "theme.css"].map((file) =>
      fileURLToPath(new URL(`../packages/opui/css/${file}`, import.meta.url)),
    ),
  ]
}

const report = (heading, entries) => {
  if (entries.length === 0) return
  console.error(heading)
  for (const entry of entries) console.error(`  ${entry}`)
}

const main = async () => {
  const catalog = await loadCatalog()
  const components = Object.fromEntries(
    catalog.pages.map((slug) => [slug, catalog.featuresOf(slug)]),
  )

  const unknown = Object.entries(components).flatMap(([comp, ids]) =>
    ids.filter((id) => !featureOf(id)).map((id) => `${comp}: "${id}"`),
  )
  const redundantCore = []
  const unusedIgnore = []
  for (const comp of catalog.pages) {
    const problems = exceptionProblems({
      ...catalog.exceptionsOf(comp),
      detected: catalog.detectedFeaturesOf(comp),
    })
    redundantCore.push(...problems.core.map((id) => `${comp}: "${id}"`))
    unusedIgnore.push(...problems.ignore.map((id) => `${comp}: "${id}"`))
  }

  report(
    "Unknown web-features ids that the patterns in packages/opui/scripts/features.mjs or HTML_FEATURES in src/component-api/browser-features.mjs detect:",
    unknown,
  )
  report(
    "features.core in src/component-api/pages.ts lists ids that the page's own stylesheets or HTML examples already use. Remove them:",
    redundantCore,
  )
  report(
    "features.ignore in src/component-api/pages.ts lists ids that neither the page's stylesheets nor its HTML examples use. Remove them:",
    unusedIgnore,
  )
  const unusedShared = unusedSharedFeatures(await readCss(await sharedSheets()))
  const fallbackMissing = []
  const fallbackUnneeded = []
  for (const [comp, ids] of Object.entries(components)) {
    const problems = fallbackProblems({
      fallbacks: catalog.fallbacksOf(comp),
      lacking: lackingIds(ids),
    })
    fallbackMissing.push(...problems.missing.map((id) => `${comp}: "${id}"`))
    fallbackUnneeded.push(...problems.unneeded.map((id) => `${comp}: "${id}"`))
  }
  report(
    "The page uses features that some browser lacks, and its fallbacks in src/component-api/pages.ts have no sentence for them. Add one: say plainly what the component still does without the feature and what's missing, as its CSS, packages/opui/css/compat/ and the features data show it:",
    fallbackMissing,
  )
  report(
    "fallbacks in src/component-api/pages.ts has sentences for ids that the page doesn't use or that every browser supports. Remove them:",
    fallbackUnneeded,
  )
  report(
    "SHARED_FEATURES in src/utils/browser-support.ts lists ids that packages/opui/core, css/layers.css and css/theme.css don't use, which every page counts into its browser versions. Remove them, or detect the id with a pattern in packages/opui/scripts/features.mjs or SHARED_DETECTORS in scripts/check-browser-support.mjs:",
    unusedShared,
  )

  if (
    unknown.length +
      redundantCore.length +
      unusedIgnore.length +
      unusedShared.length +
      fallbackMissing.length +
      fallbackUnneeded.length >
    0
  ) {
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
}

if (
  process.argv[1] &&
  realpathSync(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  await main()
}
