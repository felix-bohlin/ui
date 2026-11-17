import type { FrameworkId } from "./framework"

export const KINDS = [
  "breaking",
  "removed",
  "added",
  "changed",
  "fixed",
] as const

export type Kind = (typeof KINDS)[number]

export type Note = string | Partial<Record<FrameworkId | "default", string>>

export type Change = {
  entry: string
  migrating?: string[]
  notes?: Record<string, Note | Note[]>
}

export type ChangeRecord = Change & {
  file: string
  kind: Kind
  version: string
}

export const components = (note: string) => ({
  astro: note,
  react: note,
  svelte: note,
  vue: note,
})

export const slots = (note: string) => ({ astro: note, vue: note })

const titleOf = (kind: Kind) => `${kind[0].toUpperCase()}${kind.slice(1)}`

export const leadingName = (entry: string) => entry.match(/^`([^`]+)`/)?.[1]

const tier = (name: string) => (/^[A-Z]/.test(name) ? 0 : 1)

const byFile = new Intl.Collator("en", { numeric: true })

const versionNumbers = (version: string) => version.split(".").map(Number)

const byVersion = (a: string, b: string) => {
  const [x, y] = [versionNumbers(a), versionNumbers(b)]
  return x[0] - y[0] || x[1] - y[1] || x[2] - y[2]
}

export const changesOf = (
  modules: (readonly [path: string, change: Change])[],
) =>
  modules
    .map(([path, change]) => {
      const [version, kind, file] = path.split("/").slice(-3)
      if (!KINDS.includes(kind as Kind)) {
        throw new Error(
          `${path} is in the folder ${kind}, which is no kind of change: put it in ${KINDS.join(", ")}`,
        )
      }
      return {
        ...change,
        file: file.replace(/\.ts$/, ""),
        kind: kind as Kind,
        version,
      }
    })
    .toSorted((a, b) => {
      const [x, y] = [leadingName(a.entry) ?? "", leadingName(b.entry) ?? ""]
      return (
        byVersion(a.version, b.version) ||
        KINDS.indexOf(a.kind) - KINDS.indexOf(b.kind) ||
        tier(x) - tier(y) ||
        x.localeCompare(y, "en") ||
        byFile.compare(a.file, b.file)
      )
    })

export const versionsOf = (changes: ChangeRecord[]) =>
  [...new Set(changes.map(({ version }) => version))].toSorted(byVersion)

export const changelogBody = (changes: ChangeRecord[], version: string) =>
  KINDS.flatMap((kind) => {
    const entries = changes.filter(
      (change) => change.version === version && change.kind === kind,
    )
    return entries.length
      ? [
          `### ${titleOf(kind)}\n\n${entries.map(({ entry }) => `- ${entry}`).join("\n")}\n`,
        ]
      : []
  }).join("\n")

export const withChanges = (
  changelog: string,
  changes: ChangeRecord[],
  version: string,
) => {
  const start = changelog.indexOf(`\n## ${version} `)
  if (start === -1) {
    throw new Error(
      `packages/opui/CHANGELOG.md has no ## ${version} heading for the records in changes/${version}`,
    )
  }
  const next = changelog.indexOf("\n## ", start + 1)
  const end = next === -1 ? changelog.length : next + 1
  const section = changelog.slice(start, end)
  const first = section.indexOf("\n### ")
  const intro =
    first === -1 ? `${section.trimEnd()}\n` : section.slice(0, first)
  return `${changelog.slice(0, start)}${intro}\n${changelogBody(changes, version)}${next === -1 ? "" : "\n"}${changelog.slice(end)}`
}

export const noteText = (note: Note, framework: FrameworkId) =>
  typeof note === "string" ? note : (note[framework] ?? note.default)

export const pageNotes = (
  changes: ChangeRecord[],
  framework: FrameworkId,
  slug: string,
) => {
  const version = versionsOf(changes).at(-1)
  return changes
    .filter((change) => change.version === version)
    .flatMap(({ kind, notes }) =>
      [notes?.[slug] ?? []].flat().flatMap((note) => {
        const text = noteText(note, framework)
        return text ? [{ breaking: kind === "breaking", text }] : []
      }),
    )
}
