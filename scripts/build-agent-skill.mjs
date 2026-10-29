import fs from "node:fs"
import { registerHooks } from "node:module"
import path from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"

import {
  componentHasFramework,
  exampleExtension,
  FRAMEWORKS,
} from "../src/utils/framework.js"
import { barrelExports } from "../src/utils/package-source.js"

const ROOT = fileURLToPath(new URL("..", import.meta.url))
const DIST = path.resolve(ROOT, "dist")
const REFERENCES = path.resolve(ROOT, "packages/opui/skills/opui/references")
const COMPONENT_API = path.resolve(ROOT, "src/component-api")
const COMPONENTS = path.resolve(ROOT, "packages/opui/components")
const DOCS = path.resolve(ROOT, "src/docs/components")
const EXAMPLES = path.resolve(ROOT, "src/component-examples")
const STYLESHEETS = path.resolve(ROOT, "packages/opui/css/components")
const TOKENS = path.resolve(ROOT, "packages/opui/tokens.json")

process.chdir(ROOT)

registerHooks({
  load(url, context, nextLoad) {
    if (!url.endsWith("?raw")) return nextLoad(url, context)
    const source = fs.readFileSync(fileURLToPath(url), "utf8")
    return {
      format: "module",
      shortCircuit: true,
      source: `export default ${JSON.stringify(source)}`,
    }
  },
  resolve(specifier, context, nextResolve) {
    const [bare, query] = specifier.split("?")
    if (query === "raw") {
      const file = bare.startsWith("@opui/")
        ? path.join(ROOT, "packages/opui", bare.slice("@opui/".length))
        : fileURLToPath(new URL(bare, context.parentURL))
      return { shortCircuit: true, url: `${pathToFileURL(file).href}?raw` }
    }
    try {
      return nextResolve(specifier, context)
    } catch (error) {
      if (!specifier.startsWith(".")) throw error
      for (const extension of [".ts", ".js"]) {
        try {
          return nextResolve(`${specifier}${extension}`, context)
        } catch {}
      }
      throw error
    }
  },
})

const { default: config } = await import("../astro.config.mjs")
const { parseHtml } = await import("../src/integrations/html-to-markdown.mjs")
const { hrefRewriter, pageFrom } = await import("../src/integrations/llms.mjs")
const { cssVarRows, hydrationRows } =
  await import("../src/component-api/rows.ts")
const { frameworks, slotProp } =
  await import("../src/component-api/frameworks.ts")
const { appliesTo, frameworkProps, modelsFor, shipped } =
  await import("../src/utils/component-source.ts")
const { skillGuides } = await import("../src/utils/guide.ts")

const COMPONENT_FRAMEWORKS = FRAMEWORKS.filter((f) => f.id !== "html")
const LANGUAGES = {
  astro: "astro",
  html: "html",
  react: "tsx",
  svelte: "svelte",
  vue: "vue",
}
const GUIDES = skillGuides.filter((slug) => slug !== "getting-started")

const kebab = (name) =>
  name.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase()
const sentence = (name) => {
  const words = kebab(name).replace(/-/g, " ")
  return words.charAt(0).toUpperCase() + words.slice(1)
}
const code = (text) => `\`${text}\``
const list = (items) => new Intl.ListFormat("en-GB").format(items)
const labelOf = (id) => FRAMEWORKS.find((f) => f.id === id).label
const sentenceEnd = (text) => (/[.!?)]$/.test(text) ? text : `${text}.`)
const onPart = (option, modifier) =>
  modifier && option.part ? `${option.part}${modifier}` : modifier
const markdownUrl = (framework, slug) =>
  new URL(`/${framework}/components/${slug}.md`, config.site).href

async function readApis() {
  const apis = []
  for (const entry of fs.readdirSync(COMPONENT_API, { withFileTypes: true })) {
    const file = path.join(COMPONENT_API, entry.name, "api.ts")
    if (!entry.isDirectory() || !fs.existsSync(file)) continue
    const { default: api } = await import(pathToFileURL(file).href)
    apis.push({ api, folder: entry.name, page: api.page ?? entry.name })
  }
  return apis
}

async function readCustomProperties(stylesheet) {
  const file = path.join(COMPONENT_API, "custom-properties", `${stylesheet}.ts`)
  if (!fs.existsSync(file)) return []
  const { default: properties } = await import(pathToFileURL(file).href)
  return Object.entries(properties)
    .map(([name, property]) => ({ name, ...property }))
    .toSorted((a, b) => a.name.localeCompare(b.name, "en"))
}

function readComponents(llmsTxt) {
  return Array.from(
    fs
      .readFileSync(llmsTxt, "utf-8")
      .matchAll(/^- \[(.+?)\]\(.*\/components\/([^/]+)\.md\)(?:: (.*))?$/gm),
    ([, title, slug, description = ""]) => ({ description, slug, title }),
  ).toSorted((a, b) => a.title.localeCompare(b.title, "en"))
}

function readDocsPage(slug) {
  const source = fs.readFileSync(path.join(DOCS, `${slug}.astro`), "utf-8")
  const imports = new Map(
    Array.from(
      source.matchAll(
        /^import (\w+) from "\.\.\/\.\.\/component-api\/([\w-]+)\/api"/gm,
      ),
      ([, name, folder]) => [name, folder],
    ),
  )
  const apiOrder = Array.from(
    source.match(/apis=\{\[([\s\S]*?)\]\}/)?.[1].matchAll(/api: (\w+)/g) ?? [],
    ([, name]) => imports.get(name),
  ).filter(Boolean)
  const stylesheets = Array.from(
    source
      .match(/installationTabs=\{\[([\s\S]*?)\]\}/)?.[1]
      .matchAll(/title: "([\w-]+)\.css"/g) ?? [],
    ([, name]) => name,
  )
  const example = source.match(/<AutoExample\s+name="(\w+)"/)?.[1]
  return { apiOrder, example, stylesheets }
}

const PARAGRAPH_START = /^(\s*)<p>/
const FILLER_PARAGRAPHS = 3

function trimParagraphs(source) {
  const lines = source.split("\n")
  const kept = []
  let run = []
  const flush = () => {
    const blocks = run.length >= FILLER_PARAGRAPHS ? run.slice(0, 1) : run
    kept.push(...blocks.flatMap((block) => block.lines))
    run = []
  }
  for (let index = 0; index < lines.length; index++) {
    const indent = lines[index].match(PARAGRAPH_START)?.[1]
    if (indent === undefined) {
      flush()
      kept.push(lines[index])
      continue
    }
    let end = index
    while (end < lines.length - 1 && !lines[end].includes("</p>")) end++
    if (run[0]?.indent !== indent) flush()
    run.push({ indent, lines: lines.slice(index, end + 1) })
    index = end
  }
  flush()
  return kept.join("\n")
}

function exampleSource(slug, name, framework) {
  for (const file of [`${name}Code`, name]) {
    const full = path.join(
      EXAMPLES,
      slug,
      `${file}.${exampleExtension(framework)}`,
    )
    if (fs.existsSync(full)) {
      return trimParagraphs(fs.readFileSync(full, "utf-8").trimEnd())
    }
  }
  return undefined
}

function exampleLines(framework, slug, example) {
  if (!example) throw new Error(`${slug}: the docs page has no <AutoExample>`)
  const source = exampleSource(slug, example, framework)
  if (!source) {
    throw new Error(
      `${slug}: no ${labelOf(framework)} source for the ${example} example in ${path.join(EXAMPLES, slug)}`,
    )
  }
  return [
    "",
    `### Example: ${sentence(example)}`,
    "",
    `\`\`\`${LANGUAGES[framework]}\n${source}\n\`\`\``,
  ]
}

const shippedIn = (api, framework) => !api.source || shipped(api, framework)

const propType = (api, option) =>
  option.type ??
  COMPONENT_FRAMEWORKS.filter(
    (f) => appliesTo(option, f.id) && shipped(api, f.id),
  )
    .map((f) => frameworkProps(api, f.id).get(option.prop))
    .find(Boolean)

const isProp = (api, option) =>
  Boolean(api.source) &&
  COMPONENT_FRAMEWORKS.some((f) => appliesTo(option, f.id))

const optionName = (api, option) =>
  isProp(api, option) ? code(option.prop) : (option.group ?? option.prop)

function frameworkNote(option) {
  if (!option.frameworks) return ""
  return ` (${list(option.frameworks.map(labelOf))})`
}

function modifierList(option) {
  return [
    ...[option.class ?? option.attribute].flatMap((modifier) =>
      modifier ? [code(onPart(option, modifier))] : [],
    ),
    ...(option.cssVar ? [code(option.cssVar)] : []),
  ]
}

function valueList(option, asProp, defaultValue) {
  return Object.entries(option.values)
    .map(([value, modifier]) => {
      const label = code(asProp ? `"${value}"` : value)
      const notes = [
        ...(modifier ? [code(onPart(option, modifier))] : []),
        ...(value === defaultValue ? ["default"] : []),
      ]
      return notes.length > 0 ? `${label} (${notes.join(", ")})` : label
    })
    .join(", ")
}

function optionLine(api, option) {
  const asProp = isProp(api, option)
  const defaultValue = option.default?.replace(/^"(.*)"$/, "$1")
  const literals = Boolean(option.values) && !option.type
  const type = asProp && !literals ? propType(api, option) : undefined
  const modifiers = literals
    ? option.cssVar
      ? [`sets ${code(option.cssVar)}`]
      : []
    : [
        ...modifierList(option),
        ...Object.values(option.values ?? {}).flatMap((modifier) =>
          modifier ? [code(onPart(option, modifier))] : [],
        ),
      ]
  const showDefault =
    option.default &&
    option.default !== "false" &&
    !(literals && defaultValue in option.values)
  const head = [
    ...(literals ? [valueList(option, asProp, defaultValue)] : []),
    ...(type ? [code(type)] : []),
    ...modifiers,
    ...(showDefault ? [`default ${code(option.default)}`] : []),
  ].join(", ")
  const scope = asProp ? frameworkNote(option) : api.source ? " (HTML)" : ""
  const description = asProp
    ? option.description
    : (option.htmlDescription ?? option.description)
  return `- ${optionName(api, option)}${scope}: ${head ? `${head}. ` : ""}${sentenceEnd(description)}`
}

function partLine(part, root = false) {
  const handles = [
    ...(root ? ["root"] : []),
    ...(part.component ? [code(part.component)] : []),
    ...(part.props ?? []).map((prop) => `prop ${code(prop)}`),
    ...(part.slots ?? []).map((slot) => `slot ${code(slot)}`),
    ...(part.model ? ["model"] : []),
  ]
  const label = code(part.code ?? part.selector)
  return `- ${label}${handles.length > 0 ? ` (${handles.join(", ")})` : ""}: ${sentenceEnd(part.description)}`
}

function grouped(entries) {
  const groups = new Map()
  for (const [framework, text] of entries) {
    if (!text) continue
    groups.set(text, [...(groups.get(text) ?? []), framework])
  }
  return [...groups].map(([text, ids]) => ({ ids, text }))
}

function noteLines(api, frameworkIds) {
  const groups = grouped(
    frameworkIds.map((id) => [id, api.notes?.[id] ?? api.notes?.default]),
  )
  if (groups.length === 1 && groups[0].ids.length === frameworkIds.length) {
    return [`- ${groups[0].text}`]
  }
  return groups.map(({ ids, text }) => `- ${list(ids.map(labelOf))}: ${text}`)
}

function modelLine(api, frameworkIds) {
  if (!api.model) return []
  const syntax = grouped(
    frameworkIds
      .filter((id) => id !== "html" && shippedIn(api, id))
      .map((id) => [
        id,
        modelsFor(api, id)
          .map((entry) =>
            code(frameworks[id].model?.(entry.prop) ?? entry.prop),
          )
          .join(", "),
      ]),
  )
    .map(({ ids, text }) => `${list(ids.map(labelOf))} ${text}`)
    .join(", ")
  return [
    `Model: ${code(api.model.prop)} (${code(api.model.type)}), ${api.model.description.charAt(0).toLowerCase()}${api.model.description.slice(1).replace(/\.$/, "")}. ${syntax}.`,
  ]
}

function apiSection(api, frameworkIds) {
  const heading = api.source ? api.component : `${api.component} (CSS only)`
  const options = api.options
    .filter((option) => frameworkIds.some((id) => appliesTo(option, id)))
    .toSorted(
      (a, b) =>
        optionName(api, a)
          .replaceAll("`", "")
          .localeCompare(optionName(api, b).replaceAll("`", ""), "en") ||
        Number(isProp(api, b)) - Number(isProp(api, a)),
    )
  const lines = [
    `## ${heading}`,
    "",
    "### Parts",
    "",
    partLine(api.root, true),
    ...api.parts.map((part) => partLine(part)),
  ]
  if (options.length > 0) {
    lines.push(
      "",
      api.source ? "### Props and modifiers" : "### Classes",
      "",
      ...options.map((option) => optionLine(api, option)),
    )
  }
  if (api.slots?.length) {
    lines.push(
      "",
      "### Slots",
      "",
      ...api.slots.map(
        (slot) => `- ${code(slot.name)}: ${sentenceEnd(slot.description)}`,
      ),
    )
  }
  const model = modelLine(api, frameworkIds)
  if (model.length > 0) lines.push("", ...model)
  if (api.notes) {
    lines.push("", "### Notes", "", ...noteLines(api, frameworkIds))
  }
  return lines.join("\n")
}

function slotNamesOf(api) {
  return [
    ...new Set([
      ...(api.slots ?? []).map((slot) => slot.name),
      ...api.parts.flatMap((part) => part.slots ?? []),
    ]),
  ].toSorted()
}

function slotLine(api, framework) {
  const named = slotNamesOf(api).filter((name) => name !== "default")
  if (named.length === 0) return []
  const prefix = code(api.component)
  if (frameworks[framework].slotsAreProps) {
    const kind = framework === "react" ? "props (`ReactNode`)" : "snippets"
    const names = slotNamesOf(api).map(slotProp).toSorted()
    return [`- ${prefix} slot ${kind}: ${list(names.map(code))}.`]
  }
  const fill =
    framework === "astro"
      ? `\`slot="${named[0]}"\` on a child`
      : `\`<template #${named[0]}>\``
  return [
    `- ${prefix} named slots: ${list(named.map(code))}. Fill one with ${fill}.`,
  ]
}

function hydrationLines(apis, framework) {
  const groups = new Map()
  for (const { api } of apis) {
    if (!api.source) continue
    for (const row of hydrationRows(api, framework)) {
      const key = [row.description, row.fallback ?? ""].join("\n")
      const group = groups.get(key) ?? { ...row, targets: new Map() }
      group.targets.set(row.prop, [
        ...(group.targets.get(row.prop) ?? []),
        api.component,
      ])
      groups.set(key, group)
    }
  }
  return [...groups.values()].map((group) => {
    const targets = [...group.targets]
    const componentSets = new Set(targets.map(([, names]) => names.join()))
    const on =
      componentSets.size === 1
        ? `${list(targets.map(([prop]) => code(prop)))} on ${list(targets[0][1].map(code))}`
        : list(
            targets.flatMap(([prop, names]) =>
              names.map((name) => `${code(prop)} on ${code(name)}`),
            ),
          )
    return `- Hydration: ${on}. ${sentenceEnd(group.description)}${group.fallback ? ` Without hydration: ${sentenceEnd(group.fallback)}` : ""}`
  })
}

function isClientComponent(api) {
  const file = path.join(
    COMPONENTS,
    api.source ?? "",
    `${api.component}.react.tsx`,
  )
  return (
    fs.existsSync(file) &&
    /^["']use client["']/.test(fs.readFileSync(file, "utf-8"))
  )
}

function exportsOf(framework) {
  return new Set(
    barrelExports(
      fs.readFileSync(
        path.resolve(ROOT, "packages/opui", framework, "index.ts"),
        "utf-8",
      ),
    ).map(({ name }) => name),
  )
}

function frameworkSection(framework, apis, slug, example) {
  const exported = exportsOf(framework)
  const names = [
    ...new Set(
      apis.flatMap(({ api }) => [
        api.component,
        ...api.parts.flatMap((part) => part.component ?? []),
      ]),
    ),
  ]
    .filter((name) => exported.has(name))
    .toSorted()
  const lines = [`## ${labelOf(framework)}`, ""]
  if (names.length === 0) {
    lines.push(
      `There is no ${labelOf(framework)} component. Use the classes in your markup.`,
    )
  } else {
    lines.push(
      `\`import { ${names.join(", ")} } from "opui-css/${framework}"\``,
    )
    const clients =
      framework === "react"
        ? apis.filter(({ api }) => isClientComponent(api))
        : []
    const details = [
      ...apis.flatMap(({ api }) =>
        api.source ? slotLine(api, framework) : [],
      ),
      ...(clients.length > 0
        ? [
            `- Client components (\`"use client"\`): ${list(clients.map(({ api }) => code(api.component)))}.`,
          ]
        : []),
      ...hydrationLines(apis, framework),
    ]
    if (details.length > 0) lines.push("", ...details)
  }
  lines.push(...exampleLines(framework, slug, example))
  return lines.join("\n")
}

async function stylesheetSection(stylesheets) {
  const blocks = []
  for (const stylesheet of stylesheets) {
    const properties = await readCustomProperties(stylesheet)
    if (properties.length === 0) continue
    const inputs = properties.filter((property) => property.kind === "input")
    const outputs = properties.filter((property) => property.kind === "output")
    blocks.push(
      [
        `### ${stylesheet}.css`,
        "",
        ...inputs.map(
          (property) =>
            `- ${code(property.name)}: ${sentenceEnd(property.description)}`,
        ),
        ...(outputs.length > 0
          ? [
              ...(inputs.length > 0 ? [""] : []),
              `Outputs: ${list(outputs.map((property) => code(property.name)))}.`,
            ]
          : []),
      ].join("\n"),
    )
  }
  if (blocks.length === 0) return []
  return [
    [
      "## Component properties",
      "",
      "Set inputs on the component, inline or in your CSS. Outputs follow the variant and state, so never override them.",
      "",
      blocks.join("\n\n"),
    ].join("\n"),
  ]
}

const SVG = /<svg\b([^>]*)>[\s\S]*?<\/svg>/g
const CODE_BLOCK = /(^[ \t]*```[^\n]*\n[\s\S]*?\n[ \t]*```$)/m
const DROPPED_ATTRIBUTES = /\s(?:height|width|xmlns)="[^"]*"/g
const OMITTED_SECTIONS = ["Browser support", "Changelog", "Under the hood"]

const placeholder = (attributes) =>
  `<svg${attributes.replace(DROPPED_ATTRIBUTES, "").replace(/\s+/g, " ").trimEnd()}></svg>`

const compactTables = (text) =>
  text
    .split("\n")
    .map((line) =>
      line.startsWith("|")
        ? line
            .replace(/ {2,}\|/g, " |")
            .replace(/\| {2,}/g, "| ")
            .replace(/^(\|(?: :?-{3,}:? \|)+)$/, (row) =>
              row.replace(/-{3,}/g, "---"),
            )
        : line,
    )
    .join("\n")

function compact(markdown) {
  let seen = false
  const collapseIcons = (block) =>
    block.replace(SVG, (match, attributes) => {
      const short = placeholder(attributes)
      if (match.length <= short.length) return match
      if (seen) return short
      seen = true
      return match
    })
  return markdown
    .split(CODE_BLOCK)
    .map((segment, index) =>
      index % 2 ? collapseIcons(segment) : compactTables(segment),
    )
    .join("")
}

const stripSections = (markdown) =>
  markdown
    .split(/^(?=## )/m)
    .filter(
      (section) =>
        !OMITTED_SECTIONS.some((title) => section.startsWith(`## ${title}\n`)),
    )
    .join("")
    .trimEnd()

async function componentReference(component, apis, docs) {
  const { slug } = component
  const pageFrameworks = FRAMEWORKS.filter((f) =>
    componentHasFramework(f.id, slug),
  )
  const frameworkIds = pageFrameworks.map((f) => f.id)
  const own = apis.filter((entry) => entry.page === slug)
  const order = (entry) => {
    const index = docs.apiOrder.indexOf(entry.folder)
    return index === -1 ? Infinity : index
  }
  const ordered = own.toSorted(
    (a, b) =>
      order(a) - order(b) ||
      a.api.component.localeCompare(b.api.component, "en"),
  )
  const elsewhere = docs.apiOrder
    .map((folder) => apis.find((entry) => entry.folder === folder))
    .filter((entry) => entry && entry.page !== slug)
  const stylesheets =
    docs.stylesheets.length > 0
      ? docs.stylesheets
      : [
          ...new Set(
            own.flatMap(
              ({ api }) => api.css ?? (api.source ? [kebab(api.source)] : []),
            ),
          ),
        ].filter((name) => fs.existsSync(path.join(STYLESHEETS, `${name}.css`)))
  const tokens = cssVarRows(...ordered.map(({ api }) => api)).map((row) =>
    code(row.name),
  )

  const header = [
    `# ${component.title}`,
    ...(component.description ? ["", component.description] : []),
    "",
    `- CSS: ${list(stylesheets.map((name) => code(`opui-css/css/components/${name}.css`)))}.`,
    `- Full docs with every example: ${pageFrameworks.map((f) => `[${f.label}](${markdownUrl(f.id, slug)})`).join(", ")}.`,
    ...elsewhere.map(
      ({ api, page }) =>
        `- The docs page also documents ${code(api.component)}, see \`${page}.md\`.`,
    ),
  ].join("\n")

  const sections = [
    header,
    ...ordered.map(({ api }) => apiSection(api, frameworkIds)),
    ...(await stylesheetSection(stylesheets)),
    ...(tokens.length > 0
      ? [
          `## Theme tokens\n\nThe stylesheets read ${list(tokens)}. \`theming.md\` and \`tokens.json\` describe them.`,
        ]
      : []),
    ...pageFrameworks.map((f) =>
      f.id === "html"
        ? ["## HTML", ...exampleLines("html", slug, docs.example)].join("\n")
        : frameworkSection(f.id, ordered, slug, docs.example),
    ),
  ]
  return `${compact(sections.join("\n\n"))}\n`
}

async function guideMarkdown(framework, slug) {
  const pathname = `/${framework}/guide/${slug}/`
  const html = fs.readFileSync(path.join(DIST, pathname, "index.html"), "utf-8")
  const page = await pageFrom(
    parseHtml(html),
    pathname,
    hrefRewriter(framework, config.site),
  )
  if (!page?.full) throw new Error(`${pathname} yields no markdown`)
  return stripSections(page.full)
}

const blocksOf = (markdown) =>
  markdown.split(CODE_BLOCK).flatMap((segment, index) =>
    index % 2
      ? [segment]
      : segment
          .split(/\n{2,}/)
          .map((block) => block.trim())
          .filter(Boolean),
  )

async function gettingStarted() {
  const seen = new Set()
  const sections = []
  for (const framework of FRAMEWORKS) {
    const markdown = await guideMarkdown(framework.id, "getting-started")
    const lines = [`## ${framework.label}`]
    for (const block of blocksOf(markdown)) {
      if (block.startsWith("# ")) continue
      if (block.startsWith("#")) {
        lines.push(`#${block}`)
        continue
      }
      if (seen.has(block)) {
        if (block.startsWith("```") && lines.at(-1)?.endsWith(":")) {
          lines.push("Same code as in the HTML section.")
        }
        continue
      }
      seen.add(block)
      lines.push(block)
    }
    sections.push(lines.join("\n\n"))
  }
  return `${compact(
    [
      "# Getting started",
      "Every framework needs the CSS. The HTML section covers the CDN file, the npm imports and the files to copy. The Astro, React, Svelte and Vue sections add their install, CSS import and component import steps.",
      ...sections,
    ].join("\n\n"),
  )}\n`
}

async function readParts(apis, pages) {
  const pageOf = new Map([
    ...apis.flatMap(({ api, page }) =>
      api.parts.flatMap((part) =>
        part.component ? [[part.component, page]] : [],
      ),
    ),
    ...apis.map(({ api, page }) => [api.component, page]),
  ])
  return barrelExports(
    fs.readFileSync(
      path.resolve(ROOT, "packages/opui/astro/index.ts"),
      "utf-8",
    ),
  )
    .map(({ folder, name }) => ({
      component: name,
      page: pageOf.get(name) ?? kebab(folder),
    }))
    .filter(
      ({ component, page }) => pages.has(page) && kebab(component) !== page,
    )
    .toSorted((a, b) => a.component.localeCompare(b.component, "en"))
}

async function buildSkill() {
  const llmsTxt = path.join(DIST, "html/llms.txt")
  if (!fs.existsSync(llmsTxt)) {
    console.error("No docs build found. Run `pnpm build` first.")
    process.exit(1)
  }

  fs.rmSync(REFERENCES, { force: true, recursive: true })
  fs.mkdirSync(REFERENCES, { recursive: true })

  const apis = await readApis()
  const components = readComponents(llmsTxt)

  for (const component of components) {
    const docs = readDocsPage(component.slug)
    fs.writeFileSync(
      path.join(REFERENCES, `${component.slug}.md`),
      await componentReference(component, apis, docs),
    )
  }

  fs.writeFileSync(
    path.join(REFERENCES, "getting-started.md"),
    await gettingStarted(),
  )
  for (const slug of GUIDES) {
    const markdown = await guideMarkdown("html", slug)
    fs.writeFileSync(
      path.join(REFERENCES, `${slug}.md`),
      `${compact(markdown)}\n`,
    )
  }

  const parts = await readParts(apis, new Set(components.map((c) => c.slug)))
  const index = [
    "# References",
    "",
    "Guides: `getting-started.md` (setup, with a section per framework), `theming.md` (colors, scopes, density, spacing, corners, fonts, elevation, motion and contrast) and `customizing.md` (the `theme.custom` layer and component properties).",
    "",
    "Each component reference covers HTML, Astro, React, Svelte and Vue: the parts, props, classes, slots and notes they share, the component properties and theme tokens, then a section per framework with its import line, slots, hydration and an example.",
    "",
    "| Component | File | Description |",
    "| --- | --- | --- |",
    ...components.map(
      (c) =>
        `| ${c.title} | \`${c.slug}.md\` | ${c.description.replace(/\|/g, "\\|")} |`,
    ),
    "",
    "Components documented on another component's page:",
    "",
    "| Component | File |",
    "| --- | --- |",
    ...parts.map((part) => `| ${part.component} | \`${part.page}.md\` |`),
    "",
  ].join("\n")

  fs.writeFileSync(path.join(REFERENCES, "index.md"), index)
  fs.copyFileSync(path.join(DIST, "tokens.json"), TOKENS)
  console.log(
    `Wrote ${components.length} component references and ${GUIDES.length + 1} guides to ${REFERENCES}`,
  )
}

await buildSkill()
