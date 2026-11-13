import fs, { realpathSync } from "fs"
import path from "path"
import { fileURLToPath, pathToFileURL } from "url"
import { globby } from "globby"
import { parseFragment } from "parse5"

import { blockCategories, blocks } from "../src/utils/blocks-data.ts"
import { posts } from "../src/utils/blog-posts.ts"
import {
  componentHasFramework,
  conditionalSlot,
  FRAMEWORKS,
  hrefFor,
} from "../src/utils/framework.js"
import { componentName } from "../src/utils/names.js"
import { SEARCH_CATEGORIES } from "../src/utils/search-categories.js"
import { VOID_ELEMENTS } from "./html-tokens.mjs"

/** @typedef {import("../src/utils/search-categories.js").SearchItem} SearchItem */

const CATEGORY_IDS = new Set(SEARCH_CATEGORIES.map((category) => category.id))

const OUTPUT_DIR = fileURLToPath(
  new URL("../public/search-index/", import.meta.url),
)

const textOf = (node) =>
  node.nodeName === "#text"
    ? node.value
    : (node.childNodes ?? []).map(textOf).join("")

const stringExpression =
  /\{\s*(?:"((?:\\.|[^"\\])*)"|'((?:\\.|[^'\\])*)'|`((?:\\.|\$(?!\{)|[^`\\$])*)`)\s*\}/gs

/** @param {string} html */
export function slotText(html) {
  return textOf(
    parseFragment(
      html.replace(stringExpression, (_, double, single, template) =>
        (double ?? single ?? template)
          .replace(/\\(.)/gs, (_escape, char) =>
            "nrt".includes(char) ? " " : char,
          )
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;"),
      ),
    ),
  )
    .replace(/\s+/g, " ")
    .trim()
}

/** @param {string} source */
function elementTree(source) {
  const root = {
    attributes: "",
    children: [],
    end: source.length,
    innerEnd: source.length,
    innerStart: 0,
    name: "",
    start: 0,
  }
  const stack = [root]
  for (const m of source.matchAll(
    /<(\/?)([A-Za-z][\w.:-]*)((?:"[^"]*"|'[^']*'|\{[^{}]*\}|[^>"'{}])*)>/g,
  )) {
    const [tag, closing, name, attributes] = m
    const end = m.index + tag.length
    if (closing) {
      const index = stack.findLastIndex((open) => open.name === name)
      if (index < 1) continue
      for (const open of stack.splice(index)) {
        open.innerEnd = m.index
        open.end = open.name === name ? end : m.index
      }
      continue
    }
    const element = {
      attributes,
      children: [],
      end,
      innerEnd: end,
      innerStart: end,
      name,
      start: m.index,
    }
    stack.at(-1).children.push(element)
    if (!tag.endsWith("/>") && !VOID_ELEMENTS.has(name)) stack.push(element)
  }
  return root
}

const slotOf = (element) =>
  element.attributes
    .match(/(?:^|\s)slot=(?:"([^"]*)"|'([^']*)')/)
    ?.slice(1)
    .find(Boolean)

function renderedInner(source, element, framework) {
  let text = ""
  let at = element.innerStart
  for (const child of element.children) {
    text += source.slice(at, child.start) + rendered(source, child, framework)
    at = child.end
  }
  return text + source.slice(at, element.innerEnd)
}

function rendered(source, element, framework) {
  if (element.name !== "Conditional") {
    return (
      source.slice(element.start, element.innerStart) +
      renderedInner(source, element, framework) +
      source.slice(element.innerEnd, element.end)
    )
  }
  const slots = new Map(
    element.children.flatMap((child) => {
      const name = slotOf(child)
      return name ? [[name, child]] : []
    }),
  )
  const slot = slots.get(conditionalSlot(framework, (name) => slots.has(name)))
  if (!slot) return ""
  return slot.name === "Fragment"
    ? renderedInner(source, slot, framework)
    : rendered(source, slot, framework)
}

const findElement = (element, matches) =>
  matches(element)
    ? element
    : element.children.reduce(
        (found, child) => found ?? findElement(child, matches),
        undefined,
      )

/**
 * @param {string} content
 * @param {import("../src/utils/framework.js").FrameworkId} framework
 */
export function readPreamble(content, framework) {
  const description = content.match(
    /export const description\s*=\s*("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')/s,
  )
  if (description) return description[1].slice(1, -1)
  const source = content.replace(/^---\n[\s\S]*?\n---\n/, "")
  const preamble = findElement(
    elementTree(source),
    (element) => element.name === "Fragment" && slotOf(element) === "preamble",
  )
  return preamble ? slotText(renderedInner(source, preamble, framework)) : ""
}

export function readSections(content) {
  const headingMatches = content
    .replace(/^---\n[\s\S]*?\n---\n/, "")
    .matchAll(
      /<section\b[^>]*\bid=["']([^"']*)["'][^>]*>\s*<h2\b[^>]*>(.*?)<\/h2>|<h[23][^>]*\bid=["']([^"']*)["'][^>]*>(.*?)<\/h[23]>/gis,
    )
  // Dedupe: a docs page may declare the same heading inside both an
  // astro and html `<Conditional>` slot, but at runtime only one is rendered.
  const sections = new Map()
  for (const m of headingMatches) {
    const id = m[1] ?? m[3]
    if (sections.has(id)) continue
    sections.set(id, { id, title: slotText(m[2] ?? m[4]) })
  }
  return [...sections.values()]
}

export function readHeadings(content) {
  return Array.from(new Set(readSections(content).map(({ title }) => title)))
}

/** @param {string} content */
export function readKeywords(content) {
  const list = content.match(/export const keywords\s*=\s*\[(.*?)\]/s)?.[1]
  return list ? Array.from(list.matchAll(/"([^"]+)"/g), (m) => m[1]) : []
}

function pageEntries({ category, frameworkId, id, meta, url }) {
  return [
    {
      id,
      title: meta.title,
      description: meta.preambles.get(frameworkId),
      ...(meta.keywords.length > 0
        ? { keywords: meta.keywords.join(" ") }
        : {}),
      ...(meta.headings.length > 0
        ? { headings: meta.headings.join(" ") }
        : {}),
      category,
      frameworkId,
      url,
    },
    ...meta.sections.map((section) => ({
      id: `${id}-${section.id}`,
      title: section.title,
      page: meta.title,
      category,
      frameworkId,
      url: `${url}#${section.id}`,
    })),
  ]
}

function readMeta(file) {
  return readPage(file, fs.readFileSync(file, "utf-8").replace(/\r\n/g, "\n"))
}

/**
 * @param {string} file
 * @param {string} content
 */
export function readPage(file, content) {
  const titleMatch = content.match(
    /<Fragment\s+slot="title"\s*>(.*?)<\/Fragment\s*>/s,
  )

  if (!titleMatch) throw new Error(`${file} has no title slot`)

  const slotTitle = slotText(titleMatch[1])
  const title = /^\{.*\}$/s.test(slotTitle)
    ? (importedMarkdown(file, content)
        .match(/^# (.+)$/m)?.[1]
        .replace(/`/g, "")
        .trim() ?? "")
    : slotTitle
  if (!title || /[{}]/.test(title)) {
    throw new Error(
      `${file} has a title slot the search index can't read: write the title as text, or set it from the first heading of the Markdown file the page imports`,
    )
  }
  const preambles = new Map(
    FRAMEWORKS.map(({ id }) => [id, readPreamble(content, id)]),
  )

  const sections = readSections(content)
  if (
    content.includes("<KeyboardSupport") &&
    !sections.some(({ id }) => id === "keyboard-support")
  ) {
    sections.push({ id: "keyboard-support", title: "Keyboard support" })
  }

  const unreadable = [
    ...preambles.values(),
    ...sections.map((section) => section.title),
  ].filter((text) => /[{}]/.test(text))
  if (unreadable.length > 0) {
    throw new Error(
      `${file} has a preamble or heading the search index can't read: write it as text, or export a description: ${unreadable.join(", ")}`,
    )
  }

  return {
    title,
    preambles,
    headings: readMarkdownHeadings(file, content),
    keywords: readKeywords(content),
    sections,
  }
}

function importedMarkdown(file, content) {
  const importMatch = content.match(/from\s+["']([^"']+\.md)["']/)
  return importMatch
    ? fs.readFileSync(path.resolve(path.dirname(file), importMatch[1]), "utf-8")
    : ""
}

function readMarkdownHeadings(file, content) {
  const markdown = importedMarkdown(file, content)
  if (!markdown) return []
  const firstSection = markdown.split(/^# /m)[1] ?? ""
  return Array.from(firstSection.matchAll(/^##+ (.+)$/gm), (m) =>
    m[1].replace(/`/g, "").trim(),
  )
}

/** @param {{ category: string, description?: string, id: string, page?: string, title: string, url: string }[]} index */
export function indexProblems(index) {
  const unknown = [
    ...new Set(
      index
        .map((item) => item.category)
        .filter((category) => !CATEGORY_IDS.has(category)),
    ),
  ].toSorted()
  const missing = SEARCH_CATEGORIES.map(({ id }) => id).filter(
    (id) => !index.some((item) => item.category === id),
  )
  const empty = index
    .filter((item) => !item.title || !(item.description || item.page))
    .map((item) => item.id)
  const duplicates = [...Map.groupBy(index, (item) => item.id)]
    .filter(([, items]) => items.length > 1)
    .map(([id]) => id)
  const unslashed = index
    .filter(
      (item) => !new URL(item.url, "https://x.test").pathname.endsWith("/"),
    )
    .map((item) => item.id)
  return [
    ...(unknown.length > 0
      ? [`Unknown search categories: ${unknown.join(", ")}`]
      : []),
    ...(missing.length > 0
      ? [`Search categories without entries: ${missing.join(", ")}`]
      : []),
    ...(empty.length > 0
      ? [
          `Search entries without a title, or without a description or page: ${empty.join(", ")}`,
        ]
      : []),
    ...(duplicates.length > 0
      ? [`Search entries that share an id: ${duplicates.join(", ")}`]
      : []),
    ...(unslashed.length > 0
      ? [
          `Search entries whose path doesn't end in a slash: ${unslashed.join(", ")}`,
        ]
      : []),
  ]
}

/**
 * @param {SearchItem[]} index
 * @param {string} frameworkId
 */
export function frameworkIndex(index, frameworkId) {
  return index
    .filter((item) => !item.frameworkId || item.frameworkId === frameworkId)
    .map((item) => {
      const shared = { ...item }
      delete shared.frameworkId
      return shared
    })
}

async function generateIndex() {
  console.log("Generating search index...")

  const componentDocs = (await globby(["src/docs/components/*.astro"])).sort()
  const guidePages = (await globby(["src/docs/guide/*.astro"])).sort()
  const gettingStartedPages = (
    await globby(["src/docs/guide/getting-started/[A-Z]*.astro"])
  ).sort()
  const apiDataFiles = (await globby(["src/component-api/*/api.ts"])).sort()

  /** @type {SearchItem[]} */
  const index = []

  // Component documentation: one entry per (component × framework). Each
  // framework variant is an independent indexable page in the new routing.
  for (const file of componentDocs) {
    const meta = readMeta(file)

    const slug = path.basename(file, ".astro")
    const sharedPath = `/components/${slug}`

    for (const framework of FRAMEWORKS) {
      if (!componentHasFramework(framework.id, slug)) continue
      index.push(
        ...pageEntries({
          category: "Component",
          frameworkId: framework.id,
          id: `component-${slug}-${framework.id}`,
          meta,
          url: hrefFor(framework.id, sharedPath),
        }),
      )
    }
  }

  // Framework-agnostic guide pages: one indexable entry per (page × framework).
  for (const file of guidePages) {
    const meta = readMeta(file)

    const slug = path.basename(file, ".astro")
    const sharedPath = `/guide/${slug}`

    for (const framework of FRAMEWORKS) {
      index.push(
        ...pageEntries({
          category: "Guide",
          frameworkId: framework.id,
          id: `guide-${slug}-${framework.id}`,
          meta,
          url: hrefFor(framework.id, sharedPath),
        }),
      )
    }
  }

  // Getting-started pages are authored per framework (HTML.astro / Astro.astro
  // under src/docs/guide/getting-started/). Each maps to the matching variant.
  for (const file of gettingStartedPages) {
    const meta = readMeta(file)

    const label = path.basename(file, ".astro")
    const framework = FRAMEWORKS.find((f) => f.label === label)
    if (!framework) throw new Error(`${file} names no framework`)

    index.push(
      ...pageEntries({
        category: "Guide",
        frameworkId: framework.id,
        id: `guide-getting-started-${framework.id}`,
        meta,
        url: hrefFor(framework.id, "/guide/getting-started"),
      }),
    )
  }

  // Blog posts are framework-agnostic and live at /blog/<slug>.
  for (const post of posts.toSorted((a, b) => a.slug.localeCompare(b.slug))) {
    const content = fs.readFileSync(`src/docs/blog/${post.slug}.astro`, "utf-8")

    index.push({
      id: `blog-${post.slug}`,
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
      category: "Blog",
      url: `/blog/${post.slug}/`,
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
      url: `/blocks/${block.slug}/`,
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
    url: "/theme-builder/",
  })

  const apiEntries = []

  // Component API tables: index the cell content per framework. The API page
  // itself is framework-aware (lives at /api and /astro/api).
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
        ...(api.elements ?? []).flatMap((element) =>
          element.members.flatMap((member) => [
            member.name,
            member.description,
          ]),
        ),
      ].filter(Boolean)

      apiEntries.push([
        `${folder}/${framework.label}`,
        {
          id: `api-${folder}-${framework.id}`,
          title: `${name} API`,
          description: `Reference for ${name} ${framework.label} component.`,
          api: terms.join(" "),
          category: "API",
          frameworkId: framework.id,
          url: hrefFor(framework.id, `/api#${folder}`),
        },
      ])
    }
  }

  apiEntries.sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
  index.push(...apiEntries.map(([, entry]) => entry))

  const problems = indexProblems(index)
  if (problems.length > 0) throw new Error(problems.join("\n"))

  fs.rmSync(OUTPUT_DIR, { force: true, recursive: true })
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })
  for (const framework of FRAMEWORKS) {
    const items = frameworkIndex(index, framework.id)
    fs.writeFileSync(
      path.join(OUTPUT_DIR, `${framework.id}.json`),
      JSON.stringify(items, null, 2),
    )
    console.log(
      `Generated the ${framework.label} index with ${items.length} items`,
    )
  }
}

if (
  process.argv[1] &&
  realpathSync(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  process.chdir(fileURLToPath(new URL("..", import.meta.url)))
  generateIndex().catch((err) => {
    console.error(err)
    process.exit(1)
  })
}
