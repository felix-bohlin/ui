import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { loadCatalog } from "../scripts/catalog.mjs"

const root = fileURLToPath(new URL("..", import.meta.url))
const [VERSION, notesFile = "src/utils/whats-new.ts"] = process.argv.slice(2)
if (!VERSION) {
  console.error(
    "usage: node changes/convert.mjs <version> [notes file that exports whatsNew]",
  )
  process.exit(1)
}
const { whatsNew } = await import(root + notesFile)
const { changelogSections } = await import(root + "src/utils/changelog-file.ts")
const { migratingAnchor } = await import(root + "src/utils/migrating.ts")
const catalog = await loadCatalog()
const text = readFileSync(root + "packages/opui/CHANGELOG.md", "utf8")
const migrating = readFileSync(root + "packages/opui/MIGRATING.md", "utf8")

const subjects = (entry) =>
  [
    ...(entry.match(/^- ((?:`[A-Z]\w*`(?:,? and |, )?)+)/)?.[1] ?? "").matchAll(
      /`(\w+)`/g,
    ),
  ].map(([, c]) => c)
const tokens = (s) =>
  new Set(
    [...s.matchAll(/`([^`]+)`|<code>([^<]+)<\/code>/g)].map((m) =>
      (m[1] ?? m[2]).replace(/&lt;/g, "<").replace(/&gt;/g, ">"),
    ),
  )
const slug = (name) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "entry"

const counters = new Map()
const records = changelogSections(text, VERSION).flatMap(({ entries, title }) =>
  entries.map((line) => {
    const kind = title.toLowerCase()
    const name = slug(line.match(/^- `([^`]+)`/)?.[1] ?? "entry")
    const key = `${kind}/${name}`
    counters.set(key, (counters.get(key) ?? 0) + 1)
    const pages = [
      ...new Set(
        subjects(line)
          .map((c) => catalog.pageOfComponent(c))
          .filter(Boolean),
      ),
    ]
    return {
      entry: line.slice(2),
      file: `${key}-${counters.get(key)}`,
      kind,
      notes: {},
      pages,
      tokens: tokens(line),
    }
  }),
)

const textsOf = (note) =>
  typeof note === "string" ? [note] : Object.values(note)
const strip = (t) => t.replace(/^Breaking:\s*/, "")
const legacy = {}
let moved = 0
for (const [page, notes] of Object.entries(whatsNew)) {
  for (const note of notes) {
    const texts = textsOf(note)
    const flags = texts.map((t) => t.startsWith("Breaking:"))
    const breaking = flags.every(Boolean)
    const mixed = flags.some(Boolean) && !breaking
    const nt = new Set(texts.flatMap((t) => [...tokens(t)]))
    const scored = records
      .filter(
        (r) => r.pages.includes(page) && (r.kind === "breaking") === breaking,
      )
      .map((r) => ({ r, score: [...nt].filter((t) => r.tokens.has(t)).length }))
      .sort((a, b) => b.score - a.score)
    const best = scored[0]
    const clear =
      !mixed &&
      best &&
      best.score > 0 &&
      (scored.length === 1 || scored[1].score < best.score)
    if (clear) {
      ;(best.r.notes[page] ??= []).push(
        typeof note === "string"
          ? strip(note)
          : Object.fromEntries(
              Object.entries(note).map(([k, v]) => [k, strip(v)]),
            ),
      )
      moved++
    } else (legacy[page] ??= []).push(note)
  }
}

const lit = (s) =>
  s.includes("`") || s.includes("${") ? JSON.stringify(s) : "`" + s + "`"
const noteCode = (note, used) => {
  if (typeof note === "string") return lit(note)
  const { astro, react, svelte, vue, ...rest } = note
  const extra = Object.entries(rest).map(([k, v]) => `${k}: ${lit(v)}`)
  if (
    astro !== undefined &&
    astro === react &&
    astro === svelte &&
    astro === vue
  ) {
    used.add("components")
    return extra.length
      ? `{ ...components(${lit(astro)}), ${extra.join(", ")} }`
      : `components(${lit(astro)})`
  }
  if (
    astro !== undefined &&
    astro === vue &&
    react === undefined &&
    svelte === undefined
  ) {
    used.add("slots")
    return extra.length
      ? `{ ...slots(${lit(astro)}), ${extra.join(", ")} }`
      : `slots(${lit(astro)})`
  }
  return `{ ${Object.entries(note)
    .map(([k, v]) => `${k}: ${lit(v)}`)
    .join(", ")} }`
}

for (const r of records) {
  const used = new Set()
  const anchors =
    r.kind === "breaking"
      ? [
          ...new Set(
            r.pages.map((p) => migratingAnchor(migrating, p)).filter(Boolean),
          ),
        ].toSorted()
      : []
  const fields = [
    `entry: ${JSON.stringify(r.entry)}`,
    ...(anchors.length ? [`migrating: ${JSON.stringify(anchors)}`] : []),
    ...(Object.keys(r.notes).length
      ? [
          `notes: { ${Object.keys(r.notes)
            .toSorted()
            .map(
              (p) =>
                `${JSON.stringify(p)}: ${r.notes[p].length === 1 ? noteCode(r.notes[p][0], used) : `[${r.notes[p].map((n) => noteCode(n, used)).join(", ")}]`}`,
            )
            .join(", ")} }`,
        ]
      : []),
  ]
  const names = [...[...used].toSorted(), "type Change"]
  const file = `${root}changes/${VERSION}/${r.file}.ts`
  mkdirSync(file.slice(0, file.lastIndexOf("/")), { recursive: true })
  writeFileSync(
    file,
    `import { ${names.join(", ")} } from "../../../src/utils/changes.ts"\n\nexport default { ${fields.join(", ")} } satisfies Change\n`,
  )
}
const used = new Set()
const body = Object.keys(legacy)
  .toSorted()
  .map(
    (page) =>
      `${JSON.stringify(page)}: [${legacy[page].map((n) => noteCode(n, used)).join(", ")}]`,
  )
  .join(",\n")
writeFileSync(root + "changes/legacy-notes.txt", body)
console.log({
  records: records.length,
  notes: Object.values(whatsNew).flat().length,
  moved,
  legacy: Object.values(legacy).flat().length,
  legacyPages: Object.keys(legacy).length,
  helpers: [...used],
})
