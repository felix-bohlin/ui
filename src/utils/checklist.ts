import {
  parseTodo,
  slugify,
  splitInlineCode,
  splitLinks,
  type TodoNote,
} from "./todo"

export const stages = [
  { label: "To do", value: "todo" },
  { label: "In progress", value: "doing" },
  { label: "Done", value: "done" },
  { label: "Skipped", value: "skipped" },
]

const tones = new Map([
  ["Done", "done"],
  ["Drafts", "progress"],
  ["Explained", "progress"],
  ["Fixed", "done"],
  ["Removed", "skipped"],
  ["Skipped", "skipped"],
  ["Started", "progress"],
  ["Still open", "open"],
  ["Update", "progress"],
])

const outcomePattern =
  /^(Done|Drafts|Explained|Fixed|Removed|Skipped|Started|Still open|Update|rc\.\d+)((?: already| in [0-9a-f]{7,40}| with option [A-Z0-9]+)?)(?:: |\.$)(.*)$/s

export const outcomeOf = (text: string) => {
  const match = text.match(outcomePattern)
  if (!match) return
  const [, kind, extra, rest] = match
  return {
    label: `${kind}${extra}`,
    text: rest,
    tone: tones.get(kind) ?? "release",
  }
}

const outcomesOf = (notes: TodoNote[]) =>
  notes.flatMap((note) => {
    if (note.kind !== "item" || note.level) return []
    const outcome = outcomeOf(note.text)
    return outcome ? [outcome] : []
  })

export const openStageOf = (notes: TodoNote[]) => {
  const last = outcomesOf(notes).at(-1)
  if (!last) return "todo"
  return last.tone === "skipped" ? "skipped" : "doing"
}

export const linkText = (text: string) =>
  text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")

const reviewPages = ["/checklist/", "/checks/", "/todo/"]

export const pageLinksOf = (texts: string[]) => {
  const links = texts.flatMap((text) =>
    splitInlineCode(text).flatMap((part) =>
      part.code
        ? []
        : splitLinks(part.value).flatMap(({ href, value }) =>
            href?.startsWith("/") &&
            !href.startsWith("//") &&
            !reviewPages.some((page) => href.startsWith(page))
              ? [{ href, label: value }]
              : [],
          ),
    ),
  )
  return links.filter(
    (link, index) =>
      links.findIndex((other) => other.href === link.href) === index,
  )
}

export const previewOf = (notes: TodoNote[]) => {
  const last = outcomesOf(notes).at(-1)
  if (last) return { ...last, text: linkText(last.text) }
  const first = notes.find(
    (note) => note.kind === "item" || note.kind === "text",
  )
  return {
    label: undefined,
    text: first && "text" in first ? linkText(first.text) : "",
    tone: undefined,
  }
}

export const parseChecklist = (source: string) => {
  const { all, intro } = parseTodo(
    source.replaceAll(
      "](../../",
      "](https://github.com/felix-bohlin/ui/blob/main/",
    ),
  )

  const sections = all.map((section) => ({
    id: slugify(section.title),
    items: section.items.map((item) => {
      const openStage = openStageOf(item.notes)
      return {
        ...item,
        key: slugify(item.text),
        openStage,
        pages: pageLinksOf([
          item.text,
          ...item.notes.flatMap((note) => ("text" in note ? [note.text] : [])),
        ]),
        preview: previewOf(item.notes),
        stage: item.status === "x" ? "done" : openStage,
      }
    }),
    title: section.title,
  }))

  return { intro, sections }
}
