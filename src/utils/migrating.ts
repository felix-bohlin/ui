export const MIGRATING_LABEL = "Migrating to v6"

const MIGRATING_SECTIONS: Record<string, string> = {
  form: "field-group-and-fieldset",
  toggle: "toggle-button-and-toggle-group",
  typography: "typography-and-rich-text",
}

export const migratingAnchor = (markdown: string, slug: string) => {
  const anchors = new Set(
    [...markdown.matchAll(/^## (.+)$/gm)].map(([, heading]) =>
      heading
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, ""),
    ),
  )
  const anchor = MIGRATING_SECTIONS[slug] ?? slug
  return anchors.has(anchor) ? anchor : undefined
}

const strip = (html: string) => html.replace(/<[^>]+>/g, "").trim()

export function parseMigrating(html: string) {
  const start = html.indexOf("<h1")
  if (start === -1) throw new Error("MIGRATING.md has no h1")
  const end = html.indexOf("<h1", start + 1)
  const current = html.slice(start, end === -1 ? undefined : end)
  const h1 = current.match(/^<h1[^>]*>([\s\S]*?)<\/h1>/)
  if (!h1) throw new Error("MIGRATING.md has an unclosed h1")
  const [intro, ...sections] = current.slice(h1[0].length).split(/(?=<h2 id=")/)
  if (sections.length === 0) throw new Error("MIGRATING.md has no h2 sections")
  return {
    intro: intro.trim(),
    sections: sections.map((s) => s.trim()),
    title: strip(h1[1]),
  }
}
