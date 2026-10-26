import fs from "fs"
import path from "path"
import { pathToFileURL } from "url"
import { globby } from "globby"

import { blockCategories, blocks } from "../src/utils/blocks-data.ts"
import { posts } from "../src/utils/learn-posts.ts"
import { componentHasFramework, FRAMEWORKS } from "../src/utils/framework.js"
import { componentName } from "../src/utils/names.js"
import { SEARCH_CATEGORIES } from "../src/utils/search-categories.js"

/** @typedef {import("../src/utils/search-categories.js").SearchItem} SearchItem */

const CATEGORY_IDS = new Set(SEARCH_CATEGORIES.map((category) => category.id))

const API_LABEL_PATTERN = FRAMEWORKS.map((f) => f.label).join("|")
const LABEL_TO_ID = Object.fromEntries(FRAMEWORKS.map((f) => [f.label, f.id]))

const OUTPUT_FILE = path.resolve(process.cwd(), "public/search-index.json")

function frameworkUrl(framework, sharedPath) {
  return `/${framework}${sharedPath}`
}

function readHeadings(content) {
  const headingMatches = content
    .replace(/^---\n[\s\S]*?\n---\n/, "")
    .matchAll(/<h[23][^>]*\bid=["'][^"']*["'][^>]*>(.*?)<\/h[23]>/gis)
  // Dedupe: a docs page may declare the same heading inside both an
  // astro and html `<Conditional>` slot, but at runtime only one is rendered.
  return Array.from(
    new Set(
      Array.from(headingMatches, (m) =>
        m[1]
          .replace(/<[^>]*>/g, "")
          .replace(/\s+/g, " ")
          .trim(),
      ),
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
  const apiFiles = (await globby(["src/component-api/**/*.astro"])).sort()
  const apiDataFiles = (await globby(["src/component-api/*/api.ts"])).sort()

  /** @type {SearchItem[]} */
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
        post.before,
        post.now,
        ...(post.features ?? []),
      ]
        .filter(Boolean)
        .join(" "),
      category: "Learn",
      url: `/learn/${post.slug}`,
    })
  }

  // Blocks are framework-agnostic and live at /blocks/<slug>.
  for (const block of blocks.toSorted((a, b) => a.slug.localeCompare(b.slug))) {
    index.push({
      id: `block-${block.slug}`,
      title: block.name,
      description: block.description,
      headings: blockCategories.find((entry) => entry.id === block.category)
        ?.label,
      category: "Blocks",
      url: `/blocks/${block.slug}`,
    })
  }

  const themeBuilder = fs.readFileSync("src/pages/theme-builder.astro", "utf-8")
  const themeBuilderTitle = themeBuilder.match(/<h1\b[^>]*>(.*?)<\/h1>/s)?.[1]
  const themeBuilderDescription = themeBuilder.match(
    /const description\s*=\s*"((?:\\.|[^"\\])*)"/s,
  )?.[1]
  if (!themeBuilderTitle || !themeBuilderDescription) {
    throw new Error(
      "src/pages/theme-builder.astro needs an <h1> and a description",
    )
  }
  const exampleThemes = (await globby(["packages/opui/themes/*.css"])).map(
    (file) => path.basename(file, ".css"),
  )
  index.push({
    id: "theme-builder",
    title: themeBuilderTitle.trim(),
    description: themeBuilderDescription,
    headings: [
      ...exampleThemes,
      "Brand color",
      "Contrast check",
      "Corners",
      "Density",
      "Export theme.css",
      "Fonts",
      "Generator",
      "Light and dark mode",
      "Motion",
      "OKLCH",
      "Presets",
      "Shadows",
      "Share link",
      "Spacing",
      "Status colors",
    ]
      .toSorted((a, b) => a.localeCompare(b))
      .join(" "),
    category: "Guide",
    url: "/theme-builder",
  })

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

    const name = componentName(folder)

    const cellMatches = content.matchAll(
      /<TableCell\b[^>]*>(.*?)<\/TableCell\s*>/gs,
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
        title: `${name} API`,
        description: `Reference for ${name} ${type} component.`,
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

    const name = componentName(folder)

    for (const framework of FRAMEWORKS) {
      const html = framework.id === "html"
      const options = api.options
        .filter(
          (option) =>
            !option.frameworks || option.frameworks.includes(framework.id),
        )
        .filter(
          (option) =>
            !html ||
            option.class ||
            option.attribute ||
            option.cssVar ||
            option.values,
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
          title: `${name} API`,
          description: `Reference for ${name} ${framework.label} component.`,
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

  const unknown = index.filter((item) => !CATEGORY_IDS.has(item.category))
  if (unknown.length > 0) {
    throw new Error(
      `Unknown search categories: ${[...new Set(unknown.map((item) => item.category))].toSorted().join(", ")}`,
    )
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(index, null, 2))
  console.log(`Generated index with ${index.length} items at ${OUTPUT_FILE}`)
}

generateIndex().catch((err) => {
  console.error(err)
  process.exit(1)
})
