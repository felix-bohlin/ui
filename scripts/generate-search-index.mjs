import fs from "fs"
import path from "path"
import { pathToFileURL } from "url"
import { globby } from "globby"

import { posts } from "../src/utils/learn-posts.ts"
import { componentHasFramework, FRAMEWORKS } from "../src/utils/framework.js"

const API_LABEL_PATTERN = FRAMEWORKS.map((f) => f.label).join("|")
const LABEL_TO_ID = Object.fromEntries(FRAMEWORKS.map((f) => [f.label, f.id]))

const OUTPUT_FILE = path.resolve(process.cwd(), "public/search-index.json")

function frameworkUrl(framework, sharedPath) {
  return `/${framework}${sharedPath}`
}

function readHeadings(content) {
  const headingMatches = content.matchAll(
    /<h[23][^>]*id=["'](.*?)["'].*?>(.*?)<\/h[23]>/gi,
  )
  // Dedupe: a docs page may declare the same heading inside both an
  // astro and html `<Conditional>` slot, but at runtime only one is rendered.
  return Array.from(
    new Set(
      Array.from(headingMatches, (m) => m[2].replace(/<[^>]*>/g, "").trim()),
    ),
  )
}

function readMeta(file) {
  const content = fs.readFileSync(file, "utf-8").replace(/\r\n/g, "\n")
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

  const headings = [
    ...readHeadings(content),
    ...readMarkdownHeadings(file, content),
  ]

  return { title, preamble, headings }
}

function readMarkdownHeadings(file, content) {
  const importMatch = content.match(/from\s+["']([^"']+\.md)["']/)
  if (!importMatch) return []
  const markdown = fs.readFileSync(
    path.resolve(path.dirname(file), importMatch[1]),
    "utf-8",
  )
  const firstSection = markdown.split(/^# /m)[1] ?? ""
  return Array.from(firstSection.matchAll(/^##+ (.+)$/gm), (m) =>
    m[1].replace(/`/g, "").trim(),
  )
}

async function generateIndex() {
  console.log("Generating search index...")

  const componentDocs = (await globby(["src/docs/components/*.astro"])).sort()
  const guidePages = (await globby(["src/docs/guide/*.astro"])).sort()
  const gettingStartedPages = (
    await globby(["src/docs/guide/getting-started/[A-Z]*.astro"])
  ).sort()
  const homePages = await globby(["src/pages/index.astro"])
  const apiFiles = (await globby(["src/component-api/**/*.astro"])).sort()
  const apiDataFiles = (await globby(["src/component-api/*/api.ts"])).sort()

  const index = []

  // Component documentation: one entry per (component × framework). Each
  // framework variant is an independent indexable page in the new routing.
  for (const file of componentDocs) {
    const meta = readMeta(file)
    if (!meta) continue

    const slug = path.basename(file, ".astro")
    const sharedPath = `/components/${slug}`

    for (const framework of FRAMEWORKS) {
      if (!componentHasFramework(framework.id, slug)) continue
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

  // Learn posts are framework-agnostic and live at /learn/<slug>.
  for (const post of posts.toSorted((a, b) => a.slug.localeCompare(b.slug))) {
    const content = fs.readFileSync(
      `src/docs/learn/${post.slug}.astro`,
      "utf-8",
    )

    index.push({
      id: `learn-${post.slug}`,
      title: post.title,
      description: post.description,
      headings: [
        ...readHeadings(content),
        post.technique,
        ...(post.features ?? []),
      ]
        .filter(Boolean)
        .join(" "),
      category: "Learn",
      url: `/learn/${post.slug}`,
    })
  }

  const apiEntries = []

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

    const cellMatches = content.matchAll(
      /<Table\.Cell\b[^>]*>(.*?)<\/Table\.Cell\s*>/gs,
    )
    const apiContent = []
    for (const cellMatch of cellMatches) {
      apiContent.push(
        cellMatch[1]
          .replace(/<[^>]*>/g, "")
          .replace(/\s+/g, " ")
          .trim(),
      )
    }

    const apiUrl = frameworkUrl(frameworkId, "/api") + `#${folder}`

    apiEntries.push([
      `${folder}/${type}`,
      {
        id: `api-${folder}-${frameworkId}`,
        title: `${componentName} API`,
        description: `Reference for ${componentName} ${type} component.`,
        headings: apiContent.join(" "),
        category: "API",
        frameworkId,
        type,
        url: apiUrl,
      },
    ])
  }

  for (const file of apiDataFiles) {
    const { default: api } = await import(
      pathToFileURL(path.resolve(file)).href
    )
    const folder = path.basename(path.dirname(file))

    const componentName = folder
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")

    for (const framework of FRAMEWORKS) {
      const html = framework.id === "html"
      const options = api.options.filter(
        (option) =>
          !option.frameworks || option.frameworks.includes(framework.id),
      )
      const terms = [
        html ? api.root.selector : api.component,
        api.root.description,
        ...api.parts.flatMap((part) => [
          part.description,
          ...(html
            ? [part.selector]
            : [...(part.props ?? []), ...(part.slots ?? [])]),
        ]),
        ...options.flatMap((option) =>
          html
            ? [
                option.class,
                option.attribute,
                option.cssVar,
                ...Object.values(option.values ?? {}),
                option.group,
                option.description,
              ]
            : [option.prop, option.description],
        ),
      ].filter(Boolean)

      apiEntries.push([
        `${folder}/${framework.label}`,
        {
          id: `api-${folder}-${framework.id}`,
          title: `${componentName} API`,
          description: `Reference for ${componentName} ${framework.label} component.`,
          headings: terms.join(" "),
          category: "API",
          frameworkId: framework.id,
          type: framework.label,
          url: frameworkUrl(framework.id, "/api") + `#${folder}`,
        },
      ])
    }
  }

  apiEntries.sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
  index.push(...apiEntries.map(([, entry]) => entry))

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(index, null, 2))
  console.log(`Generated index with ${index.length} items at ${OUTPUT_FILE}`)
}

generateIndex().catch((err) => {
  console.error(err)
  process.exit(1)
})
