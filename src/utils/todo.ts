export type TodoItem = {
  line: string
  severity?: number
  status: string
  text: string
}

export type TodoSection = {
  items: TodoItem[]
  title: string
}

const itemPattern = /^- \[(.?)\] (?:\((\d+)\) )?(.*)$/

export const parseTodo = (source: string) => {
  const intro: string[] = []
  const sections: TodoSection[] = []

  for (const line of source.split("\n")) {
    const heading = line.match(/^## (.+)$/)
    if (heading) {
      sections.push({ items: [], title: heading[1] })
      continue
    }

    const item = line.match(itemPattern)
    const section = sections.at(-1)
    if (item && section) {
      section.items.push({
        line,
        severity: item[2] ? Number(item[2]) : undefined,
        status: item[1],
        text: item[3],
      })
      continue
    }

    if (!section && line.trim()) intro.push(line)
  }

  return {
    intro,
    sections: sections
      .map((section) => ({
        ...section,
        items: section.items.filter((item) => item.status !== "x"),
      }))
      .filter((section) => section.items.length),
  }
}

export const splitInlineCode = (text: string) =>
  text.split("`").map((value, index) => ({ code: index % 2 === 1, value }))

export const stressRefs = (text: string) =>
  [...text.matchAll(/\(([^()]*)\)/g)].flatMap(([, group]) =>
    splitInlineCode(group).flatMap((part, index, parts) =>
      part.code
        ? (parts[index + 1]?.value ?? "")
            .split(",")
            .map((name) => name.trim())
            .filter((name) => /^[A-Z][A-Za-z0-9]*$/.test(name))
            .map((example) => ({ example, page: part.value }))
        : [],
    ),
  )

export const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
