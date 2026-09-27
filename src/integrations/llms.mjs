import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

import { DEFAULT_FRAMEWORK, FRAMEWORKS } from "../utils/framework.js"
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
    '- With a bundler, import everything with `@import "opui-css/css/imports.css"`, or one component at a time from `opui-css/css/components/<name>.css`. Without one, link `https://cdn.jsdelivr.net/npm/opui-css/dist/opui.css`.',
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

export default function llms() {
  let site

  return {
    name: "llms",
    hooks: {
      "astro:config:done": ({ config }) => {
        site = config.site
      },
      "astro:server:setup": ({ server }) => {
        server.middlewares.use(async (req, res, next) => {
          const { pathname } = new URL(req.url ?? "/", "http://localhost")
          const framework = FRAMEWORKS.find((f) =>
            pathname.startsWith(`/${f.id}/`),
          )
          if (!framework || !pathname.endsWith(".md")) return next()

          const page = await fetch(
            new URL(pathname.replace(/\.md$/, "/"), `http://${req.headers.host}`),
          )
          if (!page.ok) return next()

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
            const tree = parseHtml(fs.readFileSync(file, "utf-8"))
            const meta = pageMeta(tree)
            if (meta.isRedirect) continue

            const relative = path
              .relative(outDir, path.dirname(file))
              .split(path.sep)
              .join("/")
            const pathname = `/${relative}/`
            const markdown = await articleToMarkdown(tree, { rewriteHref })
            if (!markdown) continue

            const mdPath = markdownPath(pathname)
            fs.writeFileSync(path.join(outDir, mdPath), `${markdown}\n`)

            const [, section, slug] = relative.split("/")
            const kind =
              section === "components" && slug
                ? "component"
                : section === "guide" && slug
                  ? "guide"
                  : section === "api"
                    ? "api"
                    : "other"

            pages.push({
              ...meta,
              full:
                kind === "component" || kind === "guide"
                  ? await articleToMarkdown(tree, {
                      omitInstallationCode: true,
                      rewriteHref,
                    })
                  : null,
              kind,
              mdPath,
              pathname,
            })
          }

          const full = pages
            .filter((p) => p.full)
            .sort(
              (a, b) =>
                (a.kind === "guide" ? 0 : 1) - (b.kind === "guide" ? 0 : 1) ||
                byTitle(a, b),
            )
            .map((p) => `Source: ${new URL(p.pathname, site)}\n\n${p.full}`)
            .join("\n\n---\n\n")

          fs.writeFileSync(
            path.join(frameworkDir, "llms-full.txt"),
            `${header(framework)}\n\n---\n\n${full}\n`,
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
      },
    },
  }
}
