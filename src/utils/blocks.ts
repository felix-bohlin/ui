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
