import { blockCategories, blocks, type Block } from "./blocks-data"
import { exampleExtension, FRAMEWORK_IDS, type FrameworkId } from "./framework"

const sources = import.meta.glob<string>(
  "../blocks/*/*.{astro,html,react.tsx,svelte,vue}",
  {
    eager: true,
    import: "default",
    query: "?raw",
  },
)

export const blockFile = (slug: string, framework: FrameworkId) =>
  `${slug}/${slug.replace(/(^|-)([a-z0-9])/g, (_, _dash, letter: string) => letter.toUpperCase())}.${exampleExtension(framework)}`

const sourceOf = (slug: string, framework: FrameworkId) =>
  sources[`../blocks/${blockFile(slug, framework)}`]

const missing = blocks.flatMap((block) =>
  FRAMEWORK_IDS.filter(
    (framework) => sourceOf(block.slug, framework) === undefined,
  ).map((framework) => blockFile(block.slug, framework)),
)
if (missing.length > 0) {
  throw new Error(
    `[blocks] missing src/blocks/${missing.join(", src/blocks/")}`,
  )
}

const listed = new Set(blocks.map((block) => block.slug))
const unlisted = [
  ...new Set(
    Object.keys(sources).map((path) => path.match(/blocks\/([^/]+)\//)![1]),
  ),
].filter((slug) => !listed.has(slug))
if (unlisted.length > 0) {
  throw new Error(
    `[blocks] add ${unlisted.join(", ")} to src/utils/blocks-data.ts`,
  )
}

export { blockCategories, type Block }

export const allBlocks = blocks
  .map((block) => ({
    ...block,
    source: sourceOf(block.slug, "html")!,
    sources: Object.fromEntries(
      FRAMEWORK_IDS.map((framework) => [
        framework,
        sourceOf(block.slug, framework)!,
      ]),
    ) as Record<FrameworkId, string>,
  }))
  .toSorted((a, b) => a.name.localeCompare(b.name))

export const blockGroups = blockCategories
  .map((category) => ({
    ...category,
    blocks: allBlocks.filter((block) => block.category === category.id),
  }))
  .filter((group) => group.blocks.length > 0)

export const blockHref = (slug: string) => `/blocks/${slug}`

export const blocksUsing = (classLists: string[][]) =>
  allBlocks.filter((block) =>
    [...block.source.matchAll(/class="([^"]*)"/g)].some(([, list]) => {
      const tokens = list.split(/\s+/)
      return classLists.some((classes) =>
        classes.every((name) => tokens.includes(name)),
      )
    }),
  )

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
