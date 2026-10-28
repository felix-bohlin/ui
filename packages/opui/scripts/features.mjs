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

export const keepsFallback = (condition, year) => {
  if (!/^not\s/.test(condition)) return true
  const ids = featureIds(condition)
  return ids.length === 0 || ids.some((id) => lowYear(id) > year)
}

export const patterns = [
  { id: "anchor-positioning", pattern: /\b(?:anchor-name|position-anchor):/ },
  { id: "attr", pattern: /\battr\(/ },
  { id: "backdrop-filter", pattern: /\bbackdrop-filter:/ },
  { id: "box-decoration-break", pattern: /\bbox-decoration-break:/ },
  { id: "calc-size", pattern: /\bcalc-size\(/ },
  { id: "color-mix", pattern: /color-mix\(/ },
  {
    id: "container-queries",
    pattern:
      /\bcontainer(?:-type)?:[^;]*\b(?:inline-)?size\b|@container\s+(?:[\w-]+\s+)?\(|(?<![\w.-])\d*\.?\d+cq(?:b|h|i|max|min|w)\b/,
  },
  { id: "container-scroll-state-queries", pattern: /scroll-state\(/ },
  {
    id: "container-style-queries",
    pattern: /@container\s[^{]*?(?<![\w-])style\(/,
  },
  { id: "corner-shape", pattern: /corner-shape:/ },
  {
    id: "customizable-select",
    pattern: /\bappearance:\s*base-select\b|::picker(?:-icon)?\b|::checkmark\b/,
  },
  { id: "details-content", pattern: /::details-content\b/ },
  { id: "dir-pseudo", pattern: /:dir\(/ },
  {
    id: "display-animation",
    pattern: /\b(?:content-visibility|display)\s[^,;]*allow-discrete/,
  },
  { id: "exp-functions", pattern: /\b(?:exp|hypot|log|pow|sqrt)\(/ },
  { id: "field-sizing", pattern: /field-sizing:/ },
  { id: "has", pattern: /:has\(/ },
  {
    id: "interest-invokers",
    pattern: /\binterest-delay(?:-end|-start)?:|:interest-(?:source|target)\b/,
  },
  { id: "interpolate-size", pattern: /\binterpolate-size:/ },
  { id: "lh", pattern: /(?<![\w.])-?\d*\.?\d+lh\b/ },
  { id: "light-dark", pattern: /light-dark\(/ },
  { id: "marker", pattern: /::marker\b/ },
  { id: "nth-child-of", pattern: /:nth-(?:last-)?child\([^)]*\sof\s/ },
  { id: "open-pseudo", pattern: /(?<!:):open\b/ },
  {
    id: "overflow-clip",
    pattern:
      /\boverflow(?:-block|-inline|-x|-y)?:\s*(?:[\w-]+\s+)?clip\b|\boverflow-clip-margin:/,
  },
  {
    id: "overlay",
    pattern: /\btransition(?:-property)?:[^;]*\boverlay\b|(?<![\w-])overlay:/,
  },
  { id: "popover", pattern: /:popover-open\b/ },
  { id: "progress-function", pattern: /\bprogress\(/ },
  { id: "registered-custom-properties", pattern: /@property\s+--/ },
  { id: "relative-color", pattern: /\(\s*from\s/ },
  { id: "round-mod-rem", pattern: /\b(?:mod|rem|round)\(/ },
  { id: "scope", pattern: /@scope\b/ },
  { id: "scroll-buttons", pattern: /::scroll-button\(/ },
  {
    id: "scroll-driven-animations",
    pattern:
      /\banimation-(?:range(?:-end|-start)?|timeline):|\b(?:scroll|view)-timeline(?:-axis|-name)?:/,
  },
  {
    id: "scroll-marker-targets",
    pattern: /:target-(?:after|before|current)\b/,
  },
  {
    id: "scroll-markers",
    pattern: /::scroll-marker(?:-group)?\b|\bscroll-marker-group:/,
  },
  { id: "scroll-snap", pattern: /\bscroll-snap-(?:align|stop|type):/ },
  { id: "scrollbar-gutter", pattern: /scrollbar-gutter:/ },
  { id: "scrollbar-width", pattern: /\bscrollbar-width:/ },
  { id: "sibling-count", pattern: /\bsibling-(?:count|index)\(/ },
  { id: "starting-style", pattern: /@starting-style\b/ },
  { id: "subgrid", pattern: /grid-template-(?:columns|rows):\s*subgrid\b/ },
  { id: "text-box", pattern: /\btext-box(?:-edge|-trim)?:/ },
  { id: "text-wrap-pretty", pattern: /\btext-wrap(?:-style)?:\s*pretty\b/ },
  {
    id: "transition-behavior",
    pattern: /\ballow-discrete\b|\btransition-behavior:/,
  },
  { id: "trig-functions", pattern: /\b(?:acos|asin|atan2?|cos|sin|tan)\(/ },
  { id: "user-pseudos", pattern: /:user-(?:in)?valid\b/ },
]

export const withoutCompat = () => ({
  postcssPlugin: "opui-without-compat",
  OnceExit(root) {
    compatLayers(root, (layer) => layer.remove())
  },
})
