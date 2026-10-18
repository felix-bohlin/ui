import fs from "node:fs"
import path from "node:path"
import { pathToFileURL } from "node:url"

import config from "../astro.config.mjs"
import { parseHtml } from "../src/integrations/html-to-markdown.mjs"
import { hrefRewriter, pageFrom } from "../src/integrations/llms.mjs"
import {
  componentHasFramework,
  FRAMEWORK_IDS,
  FRAMEWORKS,
} from "../src/utils/framework.js"

const DIST = path.resolve(process.cwd(), "dist")
const REFERENCES = path.resolve(
  process.cwd(),
  "packages/opui/skills/opui/references",
)

const COMPONENT_API = path.resolve(process.cwd(), "src/component-api")
const BARREL = path.resolve(process.cwd(), "packages/opui/astro/index.ts")

const kebab = (name) =>
  name.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase()

async function readParts(pages) {
  const apis = []
  for (const entry of fs.readdirSync(COMPONENT_API, { withFileTypes: true })) {
    const file = path.join(COMPONENT_API, entry.name, "api.ts")
    if (!entry.isDirectory() || !fs.existsSync(file)) continue
    const { default: api } = await import(pathToFileURL(file).href)
    apis.push({ api, page: api.page ?? entry.name })
  }
  const pageOf = new Map([
    ...apis.flatMap(({ api, page }) =>
      api.parts.flatMap((part) =>
        part.component ? [[part.component, page]] : [],
      ),
    ),
    ...apis.map(({ api, page }) => [api.component, page]),
  ])
  return [
    ...fs
      .readFileSync(BARREL, "utf-8")
      .matchAll(
        /^export \{ default as (\w+) \} from "\.\.\/components\/(\w+)\//gm,
      ),
  ]
    .map(([, component, folder]) => ({
      component,
      page: pageOf.get(component) ?? kebab(folder),
    }))
    .filter(
      ({ component, page }) => pages.has(page) && kebab(component) !== page,
    )
}

function readComponents(llmsTxt) {
  return Array.from(
    fs
      .readFileSync(llmsTxt, "utf-8")
      .matchAll(/^- \[(.+?)\]\(.*\/components\/([^/]+)\.md\)(?:: (.*))?$/gm),
    ([, title, slug, description = ""]) => ({ description, slug, title }),
  )
}

const pageDirs = (dir) =>
  fs
    .readdirSync(dir, { withFileTypes: true })
    .filter(
      (entry) =>
        entry.isDirectory() &&
        fs.existsSync(path.join(dir, entry.name, "index.html")),
    )
    .map((entry) => entry.name)
    .sort()

async function writeReference(pathname, to, rewriteHref) {
  const html = fs.readFileSync(path.join(DIST, pathname, "index.html"), "utf-8")
  const page = await pageFrom(parseHtml(html), pathname, rewriteHref)
  if (!page?.full) return
  fs.writeFileSync(to, `${page.full}\n`)
}

async function buildSkill() {
  const componentsDir = path.join(DIST, "html/components")
  if (!fs.existsSync(componentsDir)) {
    console.error("No docs build found. Run `pnpm build` first.")
    process.exit(1)
  }

  fs.rmSync(REFERENCES, { force: true, recursive: true })

  for (const framework of FRAMEWORKS) {
    const outDir = path.join(REFERENCES, framework.id)
    fs.mkdirSync(outDir, { recursive: true })
    const rewriteHref = hrefRewriter(framework.id, config.site)

    for (const slug of pageDirs(path.join(DIST, framework.id, "components"))) {
      await writeReference(
        `/${framework.id}/components/${slug}/`,
        path.join(outDir, `${slug}.md`),
        rewriteHref,
      )
    }
    for (const slug of ["getting-started", "theming"]) {
      await writeReference(
        `/${framework.id}/guide/${slug}/`,
        path.join(outDir, `${slug}.md`),
        rewriteHref,
      )
    }
  }

  const components = readComponents(path.join(DIST, "html/llms.txt")).sort(
    (a, b) => a.title.localeCompare(b.title),
  )
  const parts = (await readParts(new Set(components.map((c) => c.slug)))).sort(
    (a, b) => a.component.localeCompare(b.component),
  )

  const index = [
    "# Components",
    "",
    `Each component has one reference per listed framework: ${new Intl.ListFormat("en-GB").format(FRAMEWORK_IDS.map((id) => `\`${id}/<file>\``))}.`,
    "",
    "| Component | File | Frameworks | Description |",
    "| --- | --- | --- | --- |",
    ...components.map((c) => {
      const frameworks = FRAMEWORKS.filter((f) =>
        componentHasFramework(f.id, c.slug),
      )
        .map((f) => f.id)
        .join(", ")
      return `| ${c.title} | \`${c.slug}.md\` | ${frameworks} | ${c.description.replace(/\|/g, "\\|")} |`
    }),
    "",
    "Components documented on another component's page:",
    "",
    "| Component | File |",
    "| --- | --- |",
    ...parts.map((part) => `| ${part.component} | \`${part.page}.md\` |`),
    "",
  ].join("\n")

  fs.writeFileSync(path.join(REFERENCES, "index.md"), index)
  console.log(
    `Wrote ${components.length} components × ${FRAMEWORKS.length} frameworks to ${REFERENCES}`,
  )
}

await buildSkill()
