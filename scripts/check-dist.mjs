import { existsSync, readdirSync, readFileSync, statSync } from "node:fs"
import { join, relative, sep } from "node:path"
import { fileURLToPath } from "node:url"
import { parse } from "parse5"

const root = fileURLToPath(new URL("..", import.meta.url))
const dist = join(root, "dist")
const site = new URL(
  readFileSync(join(root, "astro.config.mjs"), "utf-8").match(
    /\bsite:\s*"([^"]+)"/,
  )[1],
)

const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? walk(join(dir, entry.name)) : [join(dir, entry.name)],
  )

const files = walk(dist).toSorted()
const urlPath = (file) =>
  `/${relative(dist, file).split(sep).join("/")}`.replace(
    /(^|\/)index\.html$/,
    "$1",
  )

const attr = (node, name) =>
  node.attrs?.find((attribute) => attribute.name === name)?.value

const pages = new Map()
for (const file of files.filter((file) => file.endsWith(".html"))) {
  const ids = []
  const links = []
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
    const example =
      inExample ||
      Boolean(attr(node, "class")?.split(/\s+/).includes("example-preview"))
    for (const child of node.childNodes ?? []) visit(child, example)
  }
  visit(parse(readFileSync(file, "utf-8")))
  pages.set(urlPath(file), { ids: new Set(ids), links, redirect, all: ids })
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

const PLACEHOLDER_FRAGMENTS =
  /^\/(?:blocks\/[^/]+\/preview|[^/]+\/test\/[^/]+|tests\/[^/]+)\/$/

const problems = new Map()
const problem = (message, from) => {
  if (!problems.has(message)) problems.set(message, new Set())
  problems.get(message).add(from)
}

const COMPONENT_PAGE = /^\/[^/]+\/components\/[^/]+\/$/

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

const searchIndex = JSON.parse(
  readFileSync(join(root, "public/search-index.json"), "utf-8"),
)
for (const item of searchIndex) checkLink(item.url, "/search-index.json")

const MARKDOWN_LINK = /\]\((\S+?)\)/g
for (const file of files.filter((file) => /\.(?:md|txt)$/.test(file))) {
  const from = urlPath(file)
  const text = readFileSync(file, "utf-8").replace(/(`+)[\s\S]*?\1/g, "")
  for (const [, href] of text.matchAll(MARKDOWN_LINK)) {
    if (/^(?:https?:)?\/\//.test(href) || href.startsWith("/")) {
      checkLink(href, from)
    }
  }
}

if (problems.size > 0) {
  for (const [message, sources] of [...problems].toSorted(([a], [b]) =>
    a.localeCompare(b),
  )) {
    const list = [...sources].toSorted()
    const examples = list.slice(0, 3).join(", ")
    console.error(
      `${message} (${list.length === 1 ? examples : `${list.length} pages, e.g. ${examples}`})`,
    )
  }
  console.error(`\n${problems.size} problem(s) in dist.`)
  process.exit(1)
}

console.log(`Checked ${pages.size} pages in dist.`)
