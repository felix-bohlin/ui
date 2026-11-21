const escape = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")

const SECTION = /^### (\w+)\n([\s\S]*?)(?=^### |^## |(?![\s\S]))/gm

const entriesOf = (body: string) =>
  body.split("\n").filter((line) => line.startsWith("- "))

export const releaseHeadings = (text: string) =>
  [...text.matchAll(/^## (.+)$/gm)].map(([, heading]) => heading)

export const releaseDate = (text: string, version: string) =>
  text.match(
    new RegExp(`^## ${escape(version)} - (\\d{4}-\\d{2}-\\d{2})$`, "m"),
  )?.[1]

export const unreleasedHeading = (version: string) =>
  `## ${version} - Unreleased`

export const hasUnreleased = (text: string, version: string) =>
  text.includes(`\n${unreleasedHeading(version)}\n`)

export const dateRelease = (text: string, version: string, date: string) =>
  text.replace(
    `\n${unreleasedHeading(version)}\n`,
    `\n## ${version} - ${date}\n`,
  )

export const changesSince = (text: string, version: string) =>
  text.slice(0, text.indexOf(`\n## ${version} `))

export const unreleasedPart = (text: string) => {
  const released = text.search(/^## .* - \d{4}-\d{2}-\d{2}\s*$/m)
  return released === -1 ? text : text.slice(0, released)
}

export const sectionsIn = (text: string) =>
  [...text.matchAll(SECTION)].map(([, title, body]) => ({
    body,
    entries: entriesOf(body),
    title,
  }))

export const changelogSections = (text: string, version?: string) => {
  const start = text.indexOf(version ? `\n## ${version} ` : "\n## ")
  if (start === -1) return []
  const end = text.indexOf("\n## ", start + 1)
  return sectionsIn(text.slice(start, end === -1 ? undefined : end)).map(
    ({ entries, title }) => ({ entries, title }),
  )
}

export const addedComponents = (text: string, version: string) =>
  (
    changelogSections(text, version).find(
      (section) => section.title === "Added",
    )?.entries ?? []
  ).flatMap((entry) => entry.match(/^- `(\w+)` component\b/)?.[1] ?? [])
