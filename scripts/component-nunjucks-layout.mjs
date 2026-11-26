export const LINE = 80

export const LIMIT = 100

export const indent = (depth) => "  ".repeat(depth)

export const trimmedTag = (tag, { after = true, before = true } = {}) => {
  const open = tag.slice(0, 2)
  const close = tag.slice(-2)
  const head = before && tag[2] !== "-" ? `${open}-` : open
  const tail = after && tag.at(-3) !== "-" ? `-${close}` : close
  return `${head}${tag.slice(2, -2)}${tail}`
}

export const layoutList = (open, items, close, depth, pad = "") => {
  if (!items.length) return `${open}${close}`
  const flat = `${open}${pad}${items.join(", ")}${pad}${close}`
  if (!flat.includes("\n") && indent(depth).length + flat.length <= LINE) {
    return flat
  }
  return `${open}\n${items
    .map((item) => `${indent(depth + 1)}${item}`)
    .join(",\n")}\n${indent(depth)}${close}`
}

export const block = (open, body, close, depth, sets = [], force = false) => {
  const startsBlank = /^\s/.test(body)
  const endsBlank = /\s$/.test(body)
  if (
    !sets.length &&
    (startsBlank || endsBlank || (!force && !body.includes("\n")))
  ) {
    return `${open}${body}${close}`
  }
  const head = sets.length
    ? `${open}${sets
        .map(
          (line, index) =>
            `\n${indent(depth + 1)}${trimmedTag(line, {
              after: !(startsBlank && index === sets.length - 1),
            })}`,
        )
        .join("")}`
    : trimmedTag(open, { before: false })
  return `${head}${startsBlank ? "" : `\n${indent(depth + 1)}`}${body}${
    endsBlank
      ? close
      : `\n${indent(depth)}${trimmedTag(close, { after: false })}`
  }`
}

const MARK = "\u0001"
const END = "\u0002"
const BREAK = new RegExp(`${MARK}(\\d+)${END}`, "g")

export const glue = (before, after, depth, { closes = false } = {}) => {
  if (!before || !after || /\s$/.test(before) || /^\s/.test(after)) {
    return `${before}${after}`
  }
  if (/^\{[{%]/.test(after) || (closes && /[%}]\}$/.test(before))) {
    return `${before}${MARK}${depth}${END}${after}`
  }
  return `${before}${after}`
}

export const unmarked = (text) => text.replace(BREAK, "")

const visible = unmarked

const breakAt = (before, after, depth) => {
  if (/^\{[{%]/.test(after)) {
    const tag = after.slice(0, 2)
    const rest = after.slice(2)
    return [
      before,
      `${indent(depth)}${tag}${rest.startsWith("-") ? "" : "-"}${rest}`,
    ]
  }
  const head = before.slice(0, -2)
  const close = before.slice(-2)
  return [
    `${head}${head.endsWith("-") ? "" : "-"}${close}`,
    `${indent(depth)}${after}`,
  ]
}

const fit = (line) => {
  if (visible(line).length <= LIMIT) return [visible(line)]
  const marks = [...line.matchAll(BREAK)]
  if (!marks.length) return [line]
  const column = (mark) => visible(line.slice(0, mark.index)).length
  const chosen =
    marks.findLast((mark) => column(mark) <= LIMIT && column(mark) > 0) ??
    marks[0]
  const [left, right] = breakAt(
    line.slice(0, chosen.index),
    line.slice(chosen.index + chosen[0].length),
    Number(chosen[1]),
  )
  return [visible(left), ...fit(right)]
}

const CLOSERS = { "{#": "#}", "{%": "%}", "{{": "}}" }

const START = { element: false, quote: "", tag: "", value: "" }

const scan = (line, state) => {
  let { element, quote, tag, value } = state
  const lead = /^\s*/.exec(line)[0].length
  const boundaries = []
  const regions = []
  let regionStart = tag ? lead : 0
  let valueHere = false
  const boundary = (index, extra) =>
    boundaries.push({
      ...extra,
      index,
      opened: element && !state.element,
      splits: !!value && valueHere && extra.output,
      value: !!value,
    })
  for (let index = 0; index < line.length; index++) {
    const char = line[index]
    if (tag) {
      if (quote) {
        if (char === "\\") index++
        else if (char === quote) quote = ""
      } else if (tag !== "{#" && (char === '"' || char === "'")) {
        quote = char
      } else if (line.startsWith(CLOSERS[tag], index)) {
        const end = /\s*-?$/.exec(line.slice(regionStart, index))
        regions.push({ end: regionStart + end.index, start: regionStart })
        const next = line[index + 2]
        if (
          tag !== "{#" &&
          next &&
          /\S/.test(next) &&
          !/^\{[{%#]/.test(line.slice(index + 2))
        ) {
          boundary(index + 2, {
            closer: index,
            kind: "after",
            output: tag === "{{",
          })
        }
        tag = ""
        index++
      }
      continue
    }
    const opener = line.slice(index, index + 2)
    if (Object.hasOwn(CLOSERS, opener)) {
      if (opener !== "{#" && index > lead && /\S/.test(line[index - 1])) {
        boundary(index, { kind: "before", output: opener === "{{" })
      }
      tag = opener
      regionStart = index + 2 + /^-?\s*/.exec(line.slice(index + 2))[0].length
      index++
    } else if (value) {
      if (char === value) value = ""
    } else if (element) {
      if (char === '"' || char === "'") {
        value = char
        valueHere = true
      } else if (char === ">") element = false
    } else if (char === "<" && /[A-Za-z/{!]/.test(line[index + 1] ?? "")) {
      element = true
    }
  }
  if (tag) regions.push({ end: line.length, start: regionStart })
  return { boundaries, regions, state: { element, quote, tag, value } }
}

const OPERATORS = [/^ (?:if|else) /, /^ or /, /^ and /]

const structure = (text) => {
  const operators = OPERATORS.map(() => [])
  const groups = []
  const open = []
  let quote = ""
  for (let index = 0; index < text.length; index++) {
    const char = text[index]
    if (quote) {
      if (char === "\\") index++
      else if (char === quote) quote = ""
      continue
    }
    const group = open.at(-1)
    if (char === '"' || char === "'") quote = char
    else if ("([{".includes(char)) {
      open.push({ commas: [], depth: open.length, open: index, operators: 0 })
    } else if (")]}".includes(char)) {
      const closed = open.pop()
      if (closed) groups.push({ ...closed, close: index })
    } else if (char === "," && group) {
      group.commas.push(index)
    } else if (char === " ") {
      const rank = OPERATORS.findIndex((pattern) =>
        pattern.test(text.slice(index)),
      )
      if (rank < 0) continue
      if (group) group.operators++
      else operators[rank].push(index)
    }
  }
  return { groups, operators }
}

const splitRegion = (line, { end, start }, lead) => {
  const text = line.slice(start, end)
  const { groups, operators } = structure(text)
  const inner = `${lead}  `
  const points = operators.find((list) => list.length)
  if (points) {
    const cuts = [...points.map((point) => start + point), line.length]
    return [
      line.slice(0, cuts[0]),
      ...cuts
        .slice(0, -1)
        .map((cut, index) => `${inner}${line.slice(cut + 1, cuts[index + 1])}`),
    ]
  }
  const [group] = groups
    .filter(
      (item) =>
        (item.commas.length || item.operators) &&
        text.slice(item.open + 1, item.close).trim(),
    )
    .toSorted(
      (a, b) => a.depth - b.depth || b.close - b.open - (a.close - a.open),
    )
  if (!group) return undefined
  const items = [group.open, ...group.commas, group.close]
    .slice(0, -1)
    .map((cut, index, cuts) =>
      text.slice(cut + 1, cuts[index + 1] ?? group.close).trim(),
    )
  return [
    line.slice(0, start + group.open + 1),
    ...items.map(
      (item, index) => `${inner}${item}${index < items.length - 1 ? "," : ""}`,
    ),
    `${lead}${line.slice(start + group.close)}`,
  ]
}

const splitAt = (line, item, lead) => {
  const indent = item.opened ? `${lead}  ` : lead
  if (item.kind === "before") {
    const rest = line.slice(item.index + 2)
    return [
      line.slice(0, item.index),
      `${indent}${line.slice(item.index, item.index + 2)}${rest.startsWith("-") ? "" : "-"}${rest}`,
    ]
  }
  const trimmed = line[item.closer - 1] === "-"
  return [
    `${line.slice(0, item.closer)}${trimmed ? "" : "-"}${line.slice(item.closer, item.index)}`,
    `${indent}${line.slice(item.index)}`,
  ]
}

const splitLine = (line, state) => {
  const { boundaries, regions } = scan(line, state)
  const lead = /^\s*/.exec(line)[0]
  const shorter = (pieces) =>
    pieces && pieces.every((piece) => piece.length < line.length)
      ? pieces
      : undefined
  const splits = (items) =>
    items.map((item) => shorter(splitAt(line, item, lead)))
  const fitting = (items) =>
    splits(items).findLast((pieces) => pieces && pieces[0].length <= LIMIT)
  const safe = boundaries.filter((item) => !item.splits)
  const inValue = boundaries.filter((item) => item.splits)
  return (
    fitting(safe.filter((item) => !item.value)) ??
    fitting(safe.filter((item) => item.value)) ??
    splits(safe).find(Boolean) ??
    regions
      .toSorted((a, b) => b.end - b.start - (a.end - a.start))
      .map((region) => shorter(splitRegion(line, region, lead)))
      .find(Boolean) ??
    fitting(inValue) ??
    splits(inValue).find(Boolean)
  )
}

const wrap = (line, state) => {
  if (line.length <= LIMIT) return [line]
  const pieces = splitLine(line, state)
  if (!pieces) return [line]
  let current = state
  return pieces.flatMap((piece) => {
    const lines = wrap(piece, current)
    current = scan(piece, current).state
    return lines
  })
}

export const layout = (text) => {
  let state = START
  return text
    .split("\n")
    .flatMap((line) => fit(line))
    .flatMap((line) => {
      const lines = wrap(line, state)
      state = scan(line, state).state
      return lines
    })
    .join("\n")
}
