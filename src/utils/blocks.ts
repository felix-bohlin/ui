import { blockCategories, blocks, type Block } from "./blocks-data"

const sources = import.meta.glob<string>("../blocks/*.html", {
  eager: true,
  import: "default",
  query: "?raw",
})

const sourceOf = (slug: string) => sources[`../blocks/${slug}.html`]

const missing = blocks.filter((block) => sourceOf(block.slug) === undefined)
if (missing.length > 0) {
  throw new Error(
    `[blocks] missing src/blocks/${missing.map((block) => block.slug).join(".html, ")}.html`,
  )
}

const listed = new Set(blocks.map((block) => block.slug))
const unlisted = Object.keys(sources)
  .map((path) => path.match(/blocks\/([^/]+)\.html$/)![1])
  .filter((slug) => !listed.has(slug))
if (unlisted.length > 0) {
  throw new Error(
    `[blocks] add ${unlisted.join(", ")} to src/utils/blocks-data.ts`,
  )
}

export { blockCategories, type Block }

export const allBlocks = blocks
  .map((block) => ({ ...block, source: sourceOf(block.slug)! }))
  .toSorted((a, b) => a.name.localeCompare(b.name))

export const blockGroups = blockCategories
  .map((category) => ({
    ...category,
    blocks: allBlocks.filter((block) => block.category === category.id),
  }))
  .filter((group) => group.blocks.length > 0)

export const blockHref = (slug: string) => `/blocks/${slug}`

export const blockPreviewHref = (slug: string) => `/blocks/${slug}/preview/`

export const isFullPage = (source: string) => /<main\b/.test(source)

const dedent = (code: string) => {
  const lines = code.replace(/^\n+|\s+$/g, "").split("\n")
  const indent = Math.min(
    ...lines
      .filter((line) => line.trim())
      .map((line) => line.match(/^ */)![0].length),
  )
  return lines.map((line) => line.slice(indent)).join("\n")
}

const extract = (source: string, tag: string) =>
  [...source.matchAll(new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)</${tag}>`, "g"))]
    .map(([, code]) => dedent(code))
    .join("\n\n")

export const splitSource = (source: string) => ({
  css: extract(source, "style"),
  html: source.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/g, "").trim(),
  js: extract(source, "script"),
})
