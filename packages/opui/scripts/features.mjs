import { features } from "web-features"

const COMPAT_LAYER = "components.compat"

const yearOf = (date) => Number(date.match(/\d{4}/)[0])

const lowYear = (id) => {
  const date = features[id]?.status?.baseline_low_date
  return date ? yearOf(date) : Infinity
}

const compatLayers = (root, callback) =>
  root.walkAtRules("layer", (rule) => {
    if (rule.params === COMPAT_LAYER && rule.nodes) callback(rule)
  })

export const ENGINE_GATES = ["(-webkit-touch-callout: none)"]

export const baselineYear = (year) => ({
  postcssPlugin: "opui-baseline-year",
  OnceExit(root) {
    compatLayers(root, (layer) => {
      layer.walkAtRules("supports", (rule) => {
        if (!keepsFallback(rule.params, year)) rule.remove()
      })
      if (layer.nodes.every((node) => node.type === "comment")) layer.remove()
    })
  },
})

export const baselineYears = () => {
  const last = Math.max(
    ...Object.values(features).flatMap(({ status }) =>
      status?.baseline_low_date ? [yearOf(status.baseline_low_date)] : [],
    ),
  )
  return Array.from({ length: last - 2022 }, (_, index) => 2023 + index)
}

export const featureIds = (text) =>
  patterns.filter(({ pattern }) => pattern.test(text)).map(({ id }) => id)

export const keepsFallback = (condition, year) =>
  !/^not\s/.test(condition) ||
  featureIds(condition).some((id) => lowYear(id) > year)

export const patterns = [
  { id: "anchor-positioning", pattern: /\b(anchor-name|position-anchor):/ },
  { id: "color-mix", pattern: /color-mix\(/ },
  { id: "container-scroll-state-queries", pattern: /scroll-state\(/ },
  { id: "container-style-queries", pattern: /@container style\(/ },
  { id: "corner-shape", pattern: /corner-shape:/ },
  { id: "dir-pseudo", pattern: /:dir\(/ },
  {
    id: "display-animation",
    pattern: /\b(?:content-visibility|display)\s[^,;]*allow-discrete/,
  },
  { id: "field-sizing", pattern: /field-sizing:/ },
  { id: "has", pattern: /:has\(/ },
  { id: "light-dark", pattern: /light-dark\(/ },
  { id: "progress-function", pattern: /\bprogress\(/ },
  { id: "relative-color", pattern: /\(\s*from\s/ },
  { id: "scrollbar-gutter", pattern: /scrollbar-gutter:/ },
  { id: "user-pseudos", pattern: /:user-(?:in)?valid\b/ },
]

export const withoutCompat = () => ({
  postcssPlugin: "opui-without-compat",
  OnceExit(root) {
    compatLayers(root, (layer) => layer.remove())
  },
})
