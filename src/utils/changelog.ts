import { execSync } from "child_process"
import { dirname, resolve } from "path"
import { fileURLToPath } from "url"

// Resolved at build time — two levels up from src/utils/ to repo root
const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../../")

export type ChangelogPathEntry = {
  path: string
  type: "component" | "css" | "docs" | "api"
}

export type ChangelogEntry = {
  hash: string
  date: string
  relativeDate: string
  message: string
  types: ChangelogPathEntry["type"][]
}

function fileMatchesPath(file: string, path: string): boolean {
  return file === path || file.startsWith(path + "/")
}

const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" })

function formatRelativeDate(dateStr: string): string {
  const diffDays = Math.floor(
    (new Date(dateStr).getTime() - Date.now()) / (1000 * 60 * 60 * 24),
  )
  if (diffDays > -30) return rtf.format(diffDays, "day")
  if (diffDays > -365) return rtf.format(Math.ceil(diffDays / 30), "month")
  return rtf.format(Math.ceil(diffDays / 365), "year")
}

/**
 * Returns the 50 most recent git commits that touched any of the given paths
 * (repo-root-relative). Pass files and/or directories; git handles both.
 *
 * Returns [] when git is unavailable (e.g. shallow CI clones) or no commits
 * match the provided paths.
 */
export function getComponentChangelog(
  pathEntries: ChangelogPathEntry[],
): ChangelogEntry[] {
  if (!pathEntries.length) return []

  const paths = pathEntries.map((e) => e.path)

  try {
    const output = execSync(
      `git log --max-count=50 --name-only --pretty=format:"COMMIT:%H|%ad|%s" --date=short -- ${paths.join(" ")}`,
      { cwd: repoRoot, encoding: "utf-8" },
    ).trim()

    if (!output) return []

    const entries: ChangelogEntry[] = []
    let current: {
      hash: string
      date: string
      message: string
      rawFiles: string[]
    } | null = null

    for (const line of output.split("\n")) {
      if (line.startsWith("COMMIT:")) {
        if (current) entries.push(resolveTypes(current, pathEntries))
        const [hash, date, ...messageParts] = line
          .slice("COMMIT:".length)
          .split("|")
        current = {
          hash: hash ?? "",
          date: date ?? "",
          message: messageParts.join("|"),
          rawFiles: [],
        }
      } else if (line.trim() && current) {
        current.rawFiles.push(line.trim())
      }
    }
    if (current) entries.push(resolveTypes(current, pathEntries))

    return entries
  } catch {
    return []
  }
}

function resolveTypes(
  entry: { hash: string; date: string; message: string; rawFiles: string[] },
  pathEntries: ChangelogPathEntry[],
): ChangelogEntry {
  const typeSet = new Set<ChangelogPathEntry["type"]>()
  for (const file of entry.rawFiles) {
    for (const { path, type } of pathEntries) {
      if (fileMatchesPath(file, path)) typeSet.add(type)
    }
  }
  return {
    hash: entry.hash,
    date: entry.date,
    relativeDate: formatRelativeDate(entry.date),
    message: entry.message,
    types: [...typeSet],
  }
}
