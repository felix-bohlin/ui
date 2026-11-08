export type FigmaProbeRequest = {
  modes: { classes: string[]; id: string }[]
  text: { classes: string; name: string; tag: string }[]
  tokens: { name: string; type?: string }[]
}

export type FigmaProbeText = {
  fontFamily: string
  fontSize: string
  fontWeight: string
  letterSpacing: string
  lineHeight: string
  textTransform: string
}

export type FigmaProbeMode = {
  relative: string[]
  text: Record<string, FigmaProbeText>
  tokens: Record<string, string>
}

export type FigmaProbe = Record<string, FigmaProbeMode>

export function probeFigmaTokens(
  request: FigmaProbeRequest,
  root: Element = document.body,
) {
  const sentinel = "-123456.5"
  const registered = [
    ["--figma-probe-length", "<length-percentage>", `${sentinel}px`],
    ["--figma-probe-number", "<number>", sentinel],
    ["--figma-probe-time", "<time>", `${sentinel}s`],
  ]
  for (const [name, syntax, initialValue] of registered) {
    try {
      CSS.registerProperty({ inherits: false, initialValue, name, syntax })
    } catch {
      continue
    }
  }
  const properties: Record<string, string> = {
    cubicBezier: "transition-timing-function",
    dimension: "--figma-probe-length",
    duration: "--figma-probe-time",
    fontFamily: "font-family",
    fontWeight: "font-weight",
    number: "--figma-probe-number",
    shadow: "box-shadow",
    strokeStyle: "border-top-style",
  }
  const split = (value: string, separator: string) => {
    const parts: string[] = []
    let depth = 0
    let start = 0
    for (let index = 0; index < value.length; index++) {
      const char = value[index]
      if (char === "(") depth++
      else if (char === ")") depth--
      else if (char === separator && depth === 0) {
        parts.push(value.slice(start, index).trim())
        start = index + 1
      }
    }
    parts.push(value.slice(start).trim())
    return parts.filter(Boolean)
  }
  const result: FigmaProbe = {}
  for (const mode of request.modes) {
    const host = document.createElement("div")
    host.className = mode.classes.join(" ")
    host.hidden = true
    host.style.color = "transparent"
    host.style.forcedColorAdjust = "none"
    const scratch = document.createElement("span")
    host.append(scratch)
    const probes = request.tokens.map(({ name, type }) => {
      const small = document.createElement("span")
      const large = document.createElement("span")
      small.style.fontSize = "16px"
      large.style.fontSize = "32px"
      const property = type && properties[type]
      if (type === "color") {
        small.style.color = `oklch(from var(${name}) l c h / alpha)`
      } else if (property) {
        small.style.setProperty(property, `var(${name})`)
        large.style.setProperty(property, `var(${name})`)
      }
      host.append(small, large)
      return { large, name, property, small, type }
    })
    const texts = request.text.map(({ classes, name, tag }) => {
      const node = document.createElement(tag)
      node.className = classes
      node.textContent = name
      host.append(node)
      return { name, node }
    })
    root.append(host)
    const hostStyle = getComputedStyle(host)
    const normalize = (color: string) => {
      scratch.style.color = `oklch(from ${color} l c h / alpha)`
      return getComputedStyle(scratch).color
    }
    const tokens: Record<string, string> = {}
    const relative: string[] = []
    for (const { large, name, property, small, type } of probes) {
      const raw = hostStyle.getPropertyValue(name).trim()
      if (!raw) {
        tokens[name] = ""
        continue
      }
      if (type === "color") {
        const color = getComputedStyle(small).color
        tokens[name] = color.startsWith("oklch(") ? color : ""
        continue
      }
      if (!property) {
        tokens[name] = raw
        continue
      }
      const value = getComputedStyle(small).getPropertyValue(property).trim()
      if (value.startsWith(sentinel)) {
        tokens[name] = raw
        continue
      }
      if (type === "dimension") {
        const scaled = getComputedStyle(large).getPropertyValue(property).trim()
        if (scaled !== value) relative.push(name)
      }
      tokens[name] =
        type === "shadow" && value !== "none"
          ? split(value, ",")
              .map((layer) =>
                split(layer, " ")
                  .map((part) => (part.includes("(") ? normalize(part) : part))
                  .join(" "),
              )
              .join(", ")
          : value
    }
    const text: Record<string, FigmaProbeText> = {}
    for (const { name, node } of texts) {
      const style = getComputedStyle(node)
      text[name] = {
        fontFamily: style.fontFamily,
        fontSize: style.fontSize,
        fontWeight: style.fontWeight,
        letterSpacing: style.letterSpacing,
        lineHeight: style.lineHeight,
        textTransform: style.textTransform,
      }
    }
    host.remove()
    result[mode.id] = { relative, text, tokens }
  }
  return result
}
