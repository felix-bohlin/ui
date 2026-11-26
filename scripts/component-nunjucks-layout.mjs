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

const TAG = /^(\s*)(\{[%{]-?\s*)(set\s+\w+\s*=\s*)?([\s\S]*?)(\s*-?[%}]\})$/

const splitPoints = (expression) => {
  const points = []
  let depth = 0
  let quote = ""
  for (let index = 0; index < expression.length; index++) {
    const char = expression[index]
    if (quote) {
      if (char === "\\") index++
      else if (char === quote) quote = ""
      continue
    }
    if (char === '"' || char === "'") quote = char
    else if ("([{".includes(char)) depth++
    else if (")]}".includes(char)) depth--
    else if (
      depth === 0 &&
      /^ (?:if|else|and|or) /.test(expression.slice(index))
    ) {
      points.push(index)
    }
  }
  return points
}

const wrap = (line) => {
  if (line.length <= LIMIT) return [line]
  const match = TAG.exec(line)
  if (!match || match[1].length + match[2].length > LIMIT) return [line]
  const [, lead, open, set = "", expression, close] = match
  if (expression.includes("\n") || /[%}]\}/.test(expression)) return [line]
  const points = splitPoints(expression)
  if (!points.length) return [line]
  const prefix = `${lead}${open}${set}`
  const pieces = []
  let start = 0
  for (const point of points) {
    pieces.push(expression.slice(start, point))
    start = point + 1
  }
  pieces.push(expression.slice(start))
  const inner = `${lead}  `
  return [
    `${prefix}${pieces[0]}`,
    ...pieces.slice(1, -1).map((piece) => `${inner}${piece}`),
    `${inner}${pieces.at(-1)}${close}`,
  ]
}

export const layout = (text) =>
  text
    .split("\n")
    .flatMap((line) => fit(line))
    .flatMap((line) => wrap(line))
    .join("\n")
