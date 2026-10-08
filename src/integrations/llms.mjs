import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

import {
  componentHasFramework,
  DEFAULT_FRAMEWORK,
  FRAMEWORK_FREE_PREFIXES,
  FRAMEWORKS,
} from "../utils/framework.js"
import { markdownPath } from "../utils/markdown.js"
import { articleToMarkdown, pageMeta, parseHtml } from "./html-to-markdown.mjs"

const DOC_PREFIXES = ["/api", "/components", "/guide"]

const { description: SUMMARY } = JSON.parse(
  fs.readFileSync(
    new URL("../../packages/opui/package.json", import.meta.url),
    "utf-8",
  ),
)

const byTitle = (a, b) => a.title.localeCompare(b.title)

function htmlFiles(dir) {
  return fs
    .readdirSync(dir, { recursive: true })
    .filter((file) => path.basename(file) === "index.html")
    .map((file) => path.join(dir, file))
}

const header = (framework) =>
  [
    "# Open Props UI",
    "",
    `> ${SUMMARY}`,
    "",
    `These docs show ${framework.label} usage. Install with \`npm install opui-css open-props\`.`,
    "",
    "- Every class is prefixed with `ui-` (e.g. `.ui-button`, `.ui-filled`).",
    '- With a bundler, import everything with `@import "opui-css/css/imports.css"`, or one component at a time from `opui-css/css/components/<name>.css`. Without one, link `https://cdn.jsdelivr.net/npm/opui-css@6/dist/opui.css`.',
    ...(framework.id === DEFAULT_FRAMEWORK
      ? []
      : [
          `- ${framework.label} components are imported from \`opui-css/${framework.id}\` (e.g. \`import { Button } from "opui-css/${framework.id}"\`). Props mirror the CSS modifiers without the \`ui-\` prefix.`,
        ]),
  ].join("\n")

function llmsTxt({ framework, pages, site, isRoot }) {
  const link = (page) =>
    `- [${page.title}](${new URL(page.mdPath, site)})${page.description ? `: ${page.description}` : ""}`
  const section = (title, entries) =>
    entries.length ? [`## ${title}`, "", ...entries, ""] : []

  const guide = pages.filter((p) => p.kind === "guide").sort(byTitle)
  const components = pages.filter((p) => p.kind === "component").sort(byTitle)
  const optional = pages.filter((p) => p.kind === "api").map(link)
  optional.push(
    `- [Full documentation](${new URL(`/${framework.id}/llms-full.txt`, site)}): Every guide and component page for ${framework.label} in one file.`,
  )

  const frameworks = isRoot
    ? FRAMEWORKS.filter((f) => f.id !== framework.id).map(
        (f) =>
          `- [${f.label}](${new URL(`/${f.id}/llms.txt`, site)}): The same docs with ${f.label} examples.`,
      )
    : []

  return [
    header(framework),
    "",
    ...section("Guide", guide.map(link)),
    ...section("Components", components.map(link)),
    ...section("Frameworks", frameworks),
    ...section("Optional", optional),
  ].join("\n")
}

const hrefRewriter = (frameworkId, site) => (href) => {
  if (!href.startsWith("/") || href.startsWith("//")) return href
  const [pathname, hash] = href.split("#")
  const localized = DOC_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  )
    ? `/${frameworkId}${pathname}`
    : pathname
  const isDoc =
    !path.extname(localized) &&
    FRAMEWORKS.some(
      (f) => localized === `/${f.id}` || localized.startsWith(`/${f.id}/`),
    )
  const target = isDoc ? markdownPath(localized) : localized
  return `${new URL(target, site)}${hash ? `#${hash}` : ""}`
}

async function pageFrom(tree, pathname, rewriteHref) {
  const meta = pageMeta(tree)
  if (meta.isRedirect) return null

  const markdown = await articleToMarkdown(tree, { rewriteHref })
  if (!markdown) return null

  const [, , section, slug] = pathname.split("/")
  const kind =
    section === "components" && slug
      ? "component"
      : section === "guide" && slug
        ? "guide"
        : section === "api"
          ? "api"
          : "other"

  return {
    ...meta,
    full:
      kind === "component" || kind === "guide"
        ? await articleToMarkdown(tree, {
            omitInstallationCode: true,
            rewriteHref,
          })
        : null,
    kind,
    markdown,
    mdPath: markdownPath(pathname),
    pathname,
  }
}

function fullTxt({ framework, pages, site }) {
  const full = pages
    .filter((p) => p.full)
    .sort(
      (a, b) =>
        (a.kind === "guide" ? 0 : 1) - (b.kind === "guide" ? 0 : 1) ||
        byTitle(a, b),
    )
    .map((p) => `Source: ${new URL(p.pathname, site)}\n\n${p.full}`)
    .join("\n\n---\n\n")
  return `${header(framework)}\n\n---\n\n${full}\n`
}

const slugsIn = (relDir) =>
  fs
    .readdirSync(new URL(relDir, import.meta.url))
    .filter((file) => file.endsWith(".astro"))
    .map((file) => file.replace(/\.astro$/, ""))
    .toSorted()

async function devPages(framework, origin, rewriteHref) {
  const pathnames = [
    `/${framework.id}/api/`,
    ...slugsIn("../pages/[framework]/guide/").map(
      (slug) => `/${framework.id}/guide/${slug}/`,
    ),
    ...slugsIn("../docs/components/")
      .filter((slug) => componentHasFramework(framework.id, slug))
      .map((slug) => `/${framework.id}/components/${slug}/`),
  ]
  const pages = []
  for (let index = 0; index < pathnames.length; index += 6) {
    const batch = await Promise.all(
      pathnames.slice(index, index + 6).map(async (pathname) => {
        for (let attempt = 0; attempt < 3; attempt++) {
          try {
            const response = await fetch(new URL(pathname, origin))
            if (!response.ok) return null
            return pageFrom(
              parseHtml(await response.text()),
              pathname,
              rewriteHref,
            )
          } catch {
            await new Promise((resolve) => setTimeout(resolve, 500))
          }
        }
        return null
      }),
    )
    pages.push(...batch.filter(Boolean))
  }
  return pages
}

export default function llms() {
  let site

  return {
    name: "llms",
    hooks: {
      "astro:config:done": ({ config }) => {
        site = config.site
      },
      "astro:server:setup": ({ server }) => {
        const devCache = new Map()
        server.watcher.on("all", (event, file) => {
          if (/\/(packages|src)\//.test(file) && !file.includes("node_modules"))
            devCache.clear()
        })

        server.middlewares.use(async (req, res, next) => {
          const { pathname } = new URL(req.url ?? "/", "http://localhost")
          const llmsFile = pathname.match(
            new RegExp(
              `^/(?:(${FRAMEWORKS.map((f) => f.id).join("|")})/)?(llms(?:-full)?)\\.txt$`,
            ),
          )
          if (llmsFile) {
            const [, frameworkId, file] = llmsFile
            const framework = FRAMEWORKS.find(
              (f) => f.id === (frameworkId ?? DEFAULT_FRAMEWORK),
            )
            if (!framework || (!frameworkId && file !== "llms")) return next()

            if (!devCache.has(framework.id)) {
              devCache.set(
                framework.id,
                devPages(
                  framework,
                  `http://${req.headers.host}`,
                  hrefRewriter(framework.id, site),
                ),
              )
            }
            const pages = await devCache.get(framework.id)
            res.setHeader("Content-Type", "text/plain; charset=utf-8")
            res.end(
              file === "llms"
                ? llmsTxt({ framework, pages, site, isRoot: !frameworkId })
                : fullTxt({ framework, pages, site }),
            )
            return
          }
          const isFrameworkFree = FRAMEWORK_FREE_PREFIXES.some((p) =>
            pathname.startsWith(`${p}/`),
          )
          const framework =
            FRAMEWORKS.find((f) => pathname.startsWith(`/${f.id}/`)) ??
            (isFrameworkFree
              ? FRAMEWORKS.find((f) => f.id === DEFAULT_FRAMEWORK)
              : undefined)
          if (!framework || !pathname.endsWith(".md")) return next()

          const page = await fetch(
            new URL(
              pathname.replace(/\.md$/, "/"),
              `http://${req.headers.host}`,
            ),
          )
          if (!page.ok && !(isFrameworkFree && page.status === 404)) {
            return next()
          }

          const markdown = await articleToMarkdown(
            parseHtml(await page.text()),
            { rewriteHref: hrefRewriter(framework.id, site) },
          )
          if (!markdown) return next()

          res.setHeader("Content-Type", "text/markdown; charset=utf-8")
          res.end(`${markdown}\n`)
        })
      },
      "astro:build:done": async ({ dir, logger }) => {
        const outDir = fileURLToPath(dir)

        for (const framework of FRAMEWORKS) {
          const frameworkDir = path.join(outDir, framework.id)
          if (!fs.existsSync(frameworkDir)) continue

          const rewriteHref = hrefRewriter(framework.id, site)

          const pages = []
          for (const file of htmlFiles(frameworkDir)) {
            const relative = path
              .relative(outDir, path.dirname(file))
              .split(path.sep)
              .join("/")
            const page = await pageFrom(
              parseHtml(fs.readFileSync(file, "utf-8")),
              `/${relative}/`,
              rewriteHref,
            )
            if (!page) continue

            fs.writeFileSync(
              path.join(outDir, page.mdPath),
              `${page.markdown}\n`,
            )
            pages.push(page)
          }

          fs.writeFileSync(
            path.join(frameworkDir, "llms-full.txt"),
            fullTxt({ framework, pages, site }),
          )
          fs.writeFileSync(
            path.join(frameworkDir, "llms.txt"),
            llmsTxt({ framework, pages, site, isRoot: false }),
          )
          if (framework.id === DEFAULT_FRAMEWORK) {
            fs.writeFileSync(
              path.join(outDir, "llms.txt"),
              llmsTxt({ framework, pages, site, isRoot: true }),
            )
          }

          logger.info(
            `${framework.id}: ${pages.length} markdown pages, llms.txt, llms-full.txt`,
          )
        }

        const rewriteHref = hrefRewriter(DEFAULT_FRAMEWORK, site)
        for (const prefix of FRAMEWORK_FREE_PREFIXES) {
          const prefixDir = path.join(outDir, prefix)
          if (!fs.existsSync(prefixDir)) continue
          let count = 0
          for (const file of htmlFiles(prefixDir)) {
            const tree = parseHtml(fs.readFileSync(file, "utf-8"))
            if (pageMeta(tree).isRedirect) continue
            const markdown = await articleToMarkdown(tree, { rewriteHref })
            if (!markdown) continue
            const relative = path
              .relative(outDir, path.dirname(file))
              .split(path.sep)
              .join("/")
            fs.writeFileSync(
              path.join(outDir, markdownPath(`/${relative}/`)),
              `${markdown}\n`,
            )
            count++
          }
          logger.info(`${prefix}: ${count} markdown pages`)
        }
      },
    },
  }
}
