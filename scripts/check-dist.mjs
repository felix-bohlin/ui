import {
  existsSync,
  readdirSync,
  readFileSync,
  realpathSync,
  statSync,
} from "node:fs"
import { join, relative, sep } from "node:path"
import { fileURLToPath } from "node:url"
import { parse } from "parse5"
import {
  FRAMEWORK_FREE_PREFIXES,
  FRAMEWORK_IDS,
} from "../src/utils/framework.js"
import { markdownPath } from "../src/utils/markdown.js"

const root = fileURLToPath(new URL("..", import.meta.url))

const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? walk(join(dir, entry.name)) : [join(dir, entry.name)],
  )

const attr = (node, name) =>
  node.attrs?.find((attribute) => attribute.name === name)?.value

const PLACEHOLDER_FRAGMENTS =
  /^\/(?:blocks\/[^/]+\/preview|[^/]+\/test\/[^/]+|tests\/[^/]+)\/$/

const COMPONENT_PAGE = /^\/[^/]+\/components\/[^/]+\/$/

const MARKDOWN_LINK = /\]\((\S+?)\)/g

const NO_MARKDOWN = /^\/[^/]+\/$/
const NOT_IN_LLMS = /^\/[^/]+\/(?:components\/)?$/

export const distProblems = ({ dist, searchIndex, site }) => {
  const files = walk(dist).toSorted()
  const urlPath = (file) =>
    `/${relative(dist, file).split(sep).join("/")}`.replace(
      /(^|\/)index\.html$/,
      "$1",
    )

  const pages = new Map()
  for (const file of files.filter((file) => file.endsWith(".html"))) {
    const ids = []
    const links = []
    let noindex = false
    let redirect
    const visit = (node, inExample = false) => {
      if (node.tagName === "template") return
      const id = attr(node, "id")
      if (id) ids.push(id)
      if (node.tagName === "a" && attr(node, "href") !== undefined) {
        links.push({ href: attr(node, "href"), inExample })
      }
      if (
        node.tagName === "link" &&
        attr(node, "rel")?.split(/\s+/).includes("alternate")
      ) {
        links.push({ href: attr(node, "href"), inExample })
      }
      if (
        node.tagName === "meta" &&
        attr(node, "http-equiv")?.toLowerCase() === "refresh"
      ) {
        redirect = attr(node, "content")?.match(/url=(.+)$/i)?.[1]
      }
      if (
        node.tagName === "meta" &&
        attr(node, "name")?.toLowerCase() === "robots" &&
        /\bnoindex\b/i.test(attr(node, "content") ?? "")
      ) {
        noindex = true
      }
      const example =
        inExample ||
        Boolean(attr(node, "class")?.split(/\s+/).includes("example-preview"))
      for (const child of node.childNodes ?? []) visit(child, example)
    }
    visit(parse(readFileSync(file, "utf-8")))
    pages.set(urlPath(file), {
      ids: new Set(ids),
      links,
      noindex,
      redirect,
      all: ids,
    })
  }

  const isFile = (path) => {
    const file = join(dist, decodeURIComponent(path))
    return existsSync(file) && statSync(file).isFile()
  }

  const resolvePage = (path, depth = 0) => {
    const page = pages.get(path) ?? pages.get(`${path}/`)
    if (!page?.redirect || depth > 5) return page
    const target = new URL(page.redirect, new URL(path, site))
    return resolvePage(target.pathname, depth + 1)
  }

  const problems = new Map()
  const problem = (message, from) => {
    if (!problems.has(message)) problems.set(message, new Set())
    problems.get(message).add(from)
  }

  const checkLink = (href, from, inExample = false) => {
    if (/^(?:data|javascript|mailto|tel):/i.test(href)) return
    const url = new URL(href, new URL(from, site))
    if (url.origin !== site.origin) return
    const path = url.pathname
    const hash = decodeURIComponent(url.hash.slice(1))
    const page = resolvePage(path)
    if (!page) {
      if (!isFile(path)) problem(`${path} does not exist`, from)
      return
    }
    if (
      hash &&
      hash !== "top" &&
      !page.ids.has(hash) &&
      !(
        path === from &&
        (PLACEHOLDER_FRAGMENTS.test(from) ||
          (inExample && !COMPONENT_PAGE.test(from)))
      )
    ) {
      problem(`${path}#${hash} has no element with that id`, from)
    }
  }

  for (const [path, page] of pages) {
    for (const { href, inExample } of page.links) {
      checkLink(href, path, inExample)
    }
    const seen = new Set()
    for (const id of page.all) {
      if (seen.has(id)) problem(`id "${id}" is used more than once`, path)
      seen.add(id)
    }
  }

  for (const item of searchIndex) checkLink(item.url, "/search-index.json")

  for (const file of files.filter((file) => /\.(?:md|txt)$/.test(file))) {
    const from = urlPath(file)
    const text = readFileSync(file, "utf-8").replace(/(`+)[\s\S]*?\1/g, "")
    for (const [, href] of text.matchAll(MARKDOWN_LINK)) {
      if (/^(?:https?:)?\/\//.test(href) || href.startsWith("/")) {
        checkLink(href, from)
      }
    }
  }

  const indexable = (path) => {
    const page = pages.get(path)
    return page && !page.redirect && !page.noindex
  }

  for (const file of files.filter((file) => /sitemap-\d+\.xml$/.test(file))) {
    for (const [, loc] of readFileSync(file, "utf-8").matchAll(
      /<loc>([^<]+)<\/loc>/g,
    )) {
      const path = new URL(loc).pathname
      if (pages.get(path)?.noindex) {
        problem(
          `${path} is noindex but listed in the sitemap; the sitemap() filter in astro.config.mjs drops noindex pages`,
          urlPath(file),
        )
      }
    }
  }

  for (const [path] of pages) {
    const shared = FRAMEWORK_FREE_PREFIXES.some(
      (prefix) => path === `${prefix}/` || path.startsWith(`${prefix}/`),
    )
    const framework = FRAMEWORK_IDS.find((id) => path.startsWith(`/${id}/`))
    if ((!shared && !framework) || !indexable(path) || NO_MARKDOWN.test(path)) {
      continue
    }
    if (!isFile(markdownPath(path))) {
      problem(
        `${path} has no Markdown version: articleToMarkdown in src/integrations/html-to-markdown.mjs found no #main-content > article`,
        path,
      )
    }
  }

  for (const framework of FRAMEWORK_IDS) {
    const llms = `/${framework}/llms.txt`
    if (!isFile(llms)) {
      problem(`${llms} does not exist`, `/${framework}/`)
      continue
    }
    const listed = new Set(
      [...readFileSync(join(dist, llms), "utf-8").matchAll(MARKDOWN_LINK)].map(
        ([, href]) => new URL(href, site).pathname,
      ),
    )
    for (const [path] of pages) {
      if (
        !path.startsWith(`/${framework}/`) ||
        !indexable(path) ||
        NOT_IN_LLMS.test(path) ||
        !isFile(markdownPath(path))
      ) {
        continue
      }
      if (!listed.has(markdownPath(path))) {
        problem(
          `${markdownPath(path)} is not linked from ${llms}; llmsTxt in src/integrations/llms.mjs lists component, guide, blog, block and api pages`,
          path,
        )
      }
    }
  }

  return {
    pages: pages.size,
    problems: [...problems]
      .toSorted(([a], [b]) => a.localeCompare(b))
      .map(([message, sources]) => [message, [...sources].toSorted()]),
  }
}

const main = () => {
  const { pages, problems } = distProblems({
    dist: join(root, "dist"),
    searchIndex: JSON.parse(
      readFileSync(join(root, "public/search-index.json"), "utf-8"),
    ),
    site: new URL(
      readFileSync(join(root, "astro.config.mjs"), "utf-8").match(
        /\bsite:\s*"([^"]+)"/,
      )[1],
    ),
  })
  if (problems.length > 0) {
    for (const [message, list] of problems) {
      const examples = list.slice(0, 3).join(", ")
      console.error(
        `${message} (${list.length === 1 ? examples : `${list.length} pages, e.g. ${examples}`})`,
      )
    }
    console.error(`\n${problems.length} problem(s) in dist.`)
    process.exit(1)
  }

  console.log(`Checked ${pages} pages in dist.`)
}

if (
  process.argv[1] &&
  realpathSync(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  main()
}
