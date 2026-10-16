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

const SUB_APIS = path.resolve(process.cwd(), "src/component-api")

async function readSubApis(pages) {
  const apis = []
  for (const entry of fs.readdirSync(SUB_APIS, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue
    const file = path.join(SUB_APIS, entry.name, "api.ts")
    if (!fs.existsSync(file)) continue
    const { default: api } = await import(pathToFileURL(file).href)
    if (!api.page || !api.component || !pages.has(api.page)) continue
    apis.push({ component: api.component, page: api.page })
  }
  return apis
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
  const subApis = (
    await readSubApis(new Set(components.map((c) => c.slug)))
  ).sort((a, b) => a.component.localeCompare(b.component))

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
    ...subApis.map((s) => `| ${s.component} | \`${s.page}.md\` |`),
    "",
  ].join("\n")

  fs.writeFileSync(path.join(REFERENCES, "index.md"), index)
  console.log(
    `Wrote ${components.length} components × ${FRAMEWORKS.length} frameworks to ${REFERENCES}`,
  )
}

await buildSkill()
