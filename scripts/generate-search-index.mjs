import fs from "fs"
import path from "path"
import { globby } from "globby"

import { FRAMEWORKS } from "../src/utils/framework.js"

const API_LABEL_PATTERN = FRAMEWORKS.map((f) => f.label).join("|")
const LABEL_TO_ID = Object.fromEntries(FRAMEWORKS.map((f) => [f.label, f.id]))

const OUTPUT_FILE = path.resolve(process.cwd(), "public/search-index.json")

function frameworkUrl(framework, sharedPath) {
  return `/${framework}${sharedPath}`
}

function readMeta(file) {
  const content = fs.readFileSync(file, "utf-8")
  const titleMatch = content.match(/<Fragment slot="title">(.*?)<\/Fragment>/s)
  const descriptionExportMatch = content.match(
    /export const description\s*=\s*("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')/s,
  )
  const preambleMatch = content.match(
    /<Fragment slot="preamble">(.*?)<\/Fragment>/s,
  )

  if (!titleMatch) return null

  const title = titleMatch[1].replace(/<[^>]*>/g, "").trim()
  const preamble = descriptionExportMatch
    ? descriptionExportMatch[1].slice(1, -1)
    : preambleMatch
      ? preambleMatch[1].replace(/<[^>]*>/g, "").trim()
      : ""

  const headingMatches = content.matchAll(
    /<h[23][^>]*id=["'](.*?)["'].*?>(.*?)<\/h[23]>/gi,
  )
  // Dedupe: a docs page may declare the same heading inside both an
  // astro and html `<Conditional>` slot, but at runtime only one is rendered.
  const headings = Array.from(
    new Set(
      Array.from(headingMatches, (m) => m[2].replace(/<[^>]*>/g, "").trim()),
    ),
  )

  return { title, preamble, headings }
}

async function generateIndex() {
  console.log("Generating search index...")

  const componentDocs = await globby(["src/docs/components/*.astro"])
  const guidePages = await globby(["src/docs/guide/*.astro"])
  const gettingStartedPages = await globby([
    "src/docs/guide/getting-started/[A-Z]*.astro",
  ])
  const homePages = await globby(["src/pages/index.astro"])
  const apiFiles = await globby(["src/component-api/**/*.astro"])

  const index = []

  // Component documentation: one entry per (component × framework). Each
  // framework variant is an independent indexable page in the new routing.
  for (const file of componentDocs) {
    const meta = readMeta(file)
    if (!meta) continue

    const slug = path.basename(file, ".astro")
    const sharedPath = `/components/${slug}`

    for (const framework of FRAMEWORKS) {
      const url = frameworkUrl(framework.id, sharedPath)
      index.push({
        id: `component-${slug}-${framework.id}`,
        title: meta.title,
        description: meta.preamble,
        headings: meta.headings.join(" "),
        category: "Component",
        frameworkId: framework.id,
        type: framework.label,
        url,
      })
    }
  }

  // Framework-agnostic guide pages: one indexable entry per (page × framework).
  for (const file of guidePages) {
    const meta = readMeta(file)
    if (!meta) continue

    const slug = path.basename(file, ".astro")
    const sharedPath = `/guide/${slug}`

    for (const framework of FRAMEWORKS) {
      const url = frameworkUrl(framework.id, sharedPath)
      index.push({
        id: `guide-${slug}-${framework.id}`,
        title: meta.title,
        description: meta.preamble,
        headings: meta.headings.join(" "),
        category: "Guide",
        frameworkId: framework.id,
        url,
      })
    }
  }

  // Getting-started pages are authored per framework (HTML.astro / Astro.astro
  // under src/docs/guide/getting-started/). Each maps to the matching variant.
  for (const file of gettingStartedPages) {
    const meta = readMeta(file)
    if (!meta) continue

    const label = path.basename(file, ".astro")
    const framework = FRAMEWORKS.find((f) => f.label === label)
    if (!framework) continue

    const url = frameworkUrl(framework.id, "/guide/getting-started")
    index.push({
      id: `guide-getting-started-${framework.id}`,
      title: meta.title,
      description: meta.preamble,
      headings: meta.headings.join(" "),
      category: "Guide",
      frameworkId: framework.id,
      url,
    })
  }

  // Home/landing pages
  for (const file of homePages) {
    const meta = readMeta(file)
    if (!meta) continue

    index.push({
      id: "home-/",
      title: meta.title,
      description: meta.preamble,
      headings: meta.headings.join(" "),
      category: "Guide",
      url: "/",
    })
  }

  // Component API tables: index the cell content per framework. The API page
  // itself is framework-aware (lives at /api and /astro/api).
  for (const file of apiFiles) {
    const content = fs.readFileSync(file, "utf-8")
    const folder = path.basename(path.dirname(file))
    const filename = path.basename(file)

    const match = filename.match(
      new RegExp(`^(.*)(${API_LABEL_PATTERN})\\.astro$`),
    )
    if (!match) continue

    const type = match[2]
    const frameworkId = LABEL_TO_ID[type]
    if (!frameworkId) continue

    const componentName = folder
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")

    const cellMatches = content.matchAll(/<Table\.Cell>(.*?)<\/Table\.Cell>/gs)
    const apiContent = []
    for (const cellMatch of cellMatches) {
      apiContent.push(cellMatch[1].replace(/<[^>]*>/g, "").trim())
    }

    const apiUrl = frameworkUrl(frameworkId, "/api") + `#${folder}`

    index.push({
      id: `api-${folder}-${frameworkId}`,
      title: `${componentName} API`,
      description: `Reference for ${componentName} ${type} component.`,
      headings: apiContent.join(" "),
      category: "API",
      frameworkId,
      type,
      url: apiUrl,
    })
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(index, null, 2))
  console.log(`Generated index with ${index.length} items at ${OUTPUT_FILE}`)
}

generateIndex().catch((err) => {
  console.error(err)
  process.exit(1)
})
