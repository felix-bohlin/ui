import fs from "node:fs"
import path from "node:path"

import { FRAMEWORKS } from "../src/utils/framework.js"

const DIST = path.resolve(process.cwd(), "dist")
const REFERENCES = path.resolve(
  process.cwd(),
  "packages/opui/skills/opui/references",
)

function readComponents(llmsTxt) {
  return Array.from(
    fs
      .readFileSync(llmsTxt, "utf-8")
      .matchAll(/^- \[(.+?)\]\(.*\/components\/([^/]+)\.md\)(?:: (.*))?$/gm),
    ([, title, slug, description = ""]) => ({ description, slug, title }),
  )
}

const stripInstallationCode = (markdown) =>
  markdown.replace(
    /^## Installation\n[\s\S]*?(?=^## |(?![\s\S]))/m,
    (section) =>
      section
        .replace(/^```[\s\S]*?^```\n*/gm, "")
        .replace(/^`([\w-]+\.css)`\n+/gm, "- `opui-css/css/components/$1`\n")
        .replace(/\n*$/, "\n\n"),
  )

function copyReference(from, to) {
  fs.writeFileSync(to, stripInstallationCode(fs.readFileSync(from, "utf-8")))
}

function buildSkill() {
  const componentsDir = path.join(DIST, "html/components")
  if (!fs.existsSync(componentsDir)) {
    console.error("No docs build found. Run `pnpm build` first.")
    process.exit(1)
  }

  fs.rmSync(REFERENCES, { force: true, recursive: true })

  for (const framework of FRAMEWORKS) {
    const outDir = path.join(REFERENCES, framework.id)
    fs.mkdirSync(outDir, { recursive: true })

    for (const file of fs.readdirSync(
      path.join(DIST, framework.id, "components"),
    )) {
      if (!file.endsWith(".md")) continue
      copyReference(
        path.join(DIST, framework.id, "components", file),
        path.join(outDir, file),
      )
    }
    copyReference(
      path.join(DIST, framework.id, "guide/getting-started.md"),
      path.join(outDir, "getting-started.md"),
    )
  }

  const components = readComponents(path.join(DIST, "html/llms.txt")).sort(
    (a, b) => a.title.localeCompare(b.title),
  )

  const index = [
    "# Components",
    "",
    "Each component has one reference per framework: `html/<file>`, `astro/<file>` and `vue/<file>`.",
    "",
    "| Component | File | Description |",
    "| --- | --- | --- |",
    ...components.map(
      (c) =>
        `| ${c.title} | \`${c.slug}.md\` | ${c.description.replace(/\|/g, "\\|")} |`,
    ),
    "",
  ].join("\n")

  fs.writeFileSync(path.join(REFERENCES, "index.md"), index)
  console.log(
    `Wrote ${components.length} components × ${FRAMEWORKS.length} frameworks to ${REFERENCES}`,
  )
}

buildSkill()
