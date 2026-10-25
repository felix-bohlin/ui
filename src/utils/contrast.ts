import type { Theme } from "./theme"
import { contrastRatio } from "./theme-brand"
import {
  THEME_EXCEPTIONS,
  promiseColor,
  themeTokenPromises,
} from "./theme-token-promises"

export type Scheme = "dark" | "light"

export type ContrastMode = { contrast?: "more"; scheme: Scheme }

export type Rgba = [number, number, number, number]

export type ContrastPair = {
  against: string
  bg: string
  fg: string
  ratio: number
  token: string
}

export type ContrastStatus = "fail" | "pass" | "preset"

export type ContrastResult = {
  back: Rgba | null
  exception?: string
  fore: Rgba | null
  mode: ContrastMode
  status: ContrastStatus
  value: number | null
}

export type ContrastRow = ContrastPair & { results: ContrastResult[] }

export const CONTRAST_MODES: ContrastMode[] = [
  { scheme: "light" },
  { scheme: "dark" },
  { contrast: "more", scheme: "light" },
  { contrast: "more", scheme: "dark" },
]

export const CONTRAST_LABELS: Record<string, string> = {
  "--ui-choice-border-color": "Checkbox and radio border",
  "--ui-code-block-bg-color": "Code block",
  "--ui-code-block-text-color": "Code block text",
  "--ui-critical": "Error fill",
  "--ui-critical-text": "Error text",
  "--ui-field-border-color": "Field border",
  "--ui-field-helper-text-color": "Field help text",
  "--ui-field-label-text-color": "Field label",
  "--ui-field-required-text-color": "Required field marker",
  "--ui-focus-ring-color": "Focus ring",
  "--ui-info": "Info fill",
  "--ui-info-text": "Info text",
  "--ui-invalid-text": "Invalid field message",
  "--ui-neutral": "Neutral fill",
  "--ui-neutral-text": "Neutral text",
  "--ui-on-accent": "Text on status fills",
  "--ui-on-inverse": "Text on inverse surface",
  "--ui-on-primary": "Text on brand fill",
  "--ui-on-selected-strong": "Text on selected fill",
  "--ui-on-warning": "Text on warning fill",
  "--ui-palette-on-strong": "Text on palette fill",
  "--ui-palette-on-tint": "Text on palette tint",
  "--ui-palette-strong": "Palette fill",
  "--ui-palette-text": "Palette text",
  "--ui-palette-tint": "Palette tint",
  "--ui-primary": "Brand fill",
  "--ui-primary-text": "Brand text",
  "--ui-selected-strong": "Selected fill",
  "--ui-success": "Success fill",
  "--ui-success-text": "Success text",
  "--ui-surface": "Page",
  "--ui-surface-elevated": "Raised surface",
  "--ui-surface-filled": "Filled surface",
  "--ui-surface-inverse": "Inverse surface",
  "--ui-surface-tonal": "Tonal surface",
  "--ui-text": "Text",
  "--ui-text-strong": "Strong text",
  "--ui-text-subtle": "Subtle text",
  "--ui-warning": "Warning fill",
  "--ui-warning-text": "Warning text",
}

const PAGE = "var(--ui-surface)"

const SENTINEL: Rgba = [1 / 255, 2 / 255, 3 / 255, 1]

const clip = (value: number) => Math.min(1, Math.max(0, value))

export const tokenOf = (color: string) => color.match(/--ui-[\w-]+/)?.[0] ?? ""

export const colorLabel = (color: string) =>
  CONTRAST_LABELS[tokenOf(color)] ?? tokenOf(color)

export const modeLabel = ({ contrast, scheme }: ContrastMode) =>
  `${scheme === "dark" ? "Dark" : "Light"}${contrast === "more" ? " with more contrast" : ""}`

export const formatRatio = (value: number | null) =>
  value === null ? "n/a" : (Math.floor(value * 100) / 100).toFixed(2)

export const parseSrgb = (value: string): Rgba | null => {
  const match = value.match(
    /^color\(srgb ([^\s/)]+) ([^\s/)]+) ([^\s/)]+)(?: \/ ([^\s/)]+))?\)$/,
  )
  if (!match) return null
  const channels = match
    .slice(1)
    .map((channel, index) =>
      channel === undefined && index === 3 ? 1 : Number(channel),
    )
  if (channels.some((channel) => !Number.isFinite(channel))) return null
  const rgba = channels.map(clip) as Rgba
  return rgba.every(
    (channel, index) => Math.abs(channel - SENTINEL[index]) < 1e-4,
  )
    ? null
    : rgba
}

export const composite = (top: Rgba, base: Rgba): Rgba => {
  const alpha = top[3] + base[3] * (1 - top[3])
  if (alpha === 0) return [0, 0, 0, 0]
  const channel = (index: number) =>
    (top[index] * top[3] + base[index] * base[3] * (1 - top[3])) / alpha
  return [channel(0), channel(1), channel(2), alpha]
}

export const pairContrast = (
  fg: Rgba,
  bg: Rgba,
  page: Rgba,
  canvas: Rgba = [1, 1, 1, 1],
) => {
  const back = composite(bg, composite(page, canvas))
  const fore = composite(fg, back)
  return {
    back,
    fore,
    value: contrastRatio(
      [fore[0], fore[1], fore[2]],
      [back[0], back[1], back[2]],
    ),
  }
}

export const promisePairs = (promises = themeTokenPromises): ContrastPair[] =>
  Object.entries(promises).flatMap(([token, { against, fallback, ratio }]) =>
    against.map((surface) => ({
      against: surface,
      bg: promiseColor(surface),
      fg: fallback ? `var(${token}, var(${fallback}))` : `var(${token})`,
      ratio,
      token,
    })),
  )

export const exceptionFor = (
  { preset, tokens }: Theme,
  { contrast, scheme }: ContrastMode,
  token: string,
) =>
  contrast === "more" || !preset || Object.hasOwn(tokens, token)
    ? undefined
    : THEME_EXCEPTIONS[preset]?.[scheme]?.[token]

export const evaluatePair = (
  pair: ContrastPair,
  colors: Map<string, Rgba | null>,
  mode: ContrastMode,
  theme: Theme,
): ContrastResult => {
  const fg = colors.get(pair.fg)
  const bg = colors.get(pair.bg)
  const page = colors.get(PAGE)
  const measured =
    fg && bg && page
      ? pairContrast(fg, bg, page, colors.get("Canvas") ?? undefined)
      : null
  const value = measured?.value ?? null
  const exception = exceptionFor(theme, mode, pair.token)
  return {
    back: measured?.back ?? null,
    exception,
    fore: measured?.fore ?? null,
    mode,
    status:
      value !== null && value >= pair.ratio
        ? "pass"
        : exception
          ? "preset"
          : "fail",
    value,
  }
}

export const resolveColors = (
  root: Element,
  colors: string[],
  modes: ContrastMode[],
) => {
  const document = root.ownerDocument
  const hosts = modes.map(({ contrast, scheme }) => {
    const host = document.createElement("div")
    host.className = `ui-${scheme}${contrast === "more" ? " ui-contrast-more" : ""}`
    host.hidden = true
    host.style.color = "rgb(1 2 3)"
    host.style.setProperty("forced-color-adjust", "none")
    host.append(
      ...colors.map((color) => {
        const probe = document.createElement("div")
        probe.style.color = `color(from ${color} srgb r g b / alpha)`
        return probe
      }),
    )
    return host
  })
  root.append(...hosts)
  const view = document.defaultView!
  const resolved = hosts.map(
    (host) =>
      new Map(
        colors.map((color, index) => [
          color,
          parseSrgb(view.getComputedStyle(host.children[index]).color),
        ]),
      ),
  )
  for (const host of hosts) host.remove()
  return resolved
}

export const checkPromises = (
  root: Element,
  theme: Theme,
  modes = CONTRAST_MODES,
): ContrastRow[] => {
  const pairs = promisePairs()
  const colors = [
    ...new Set(["Canvas", PAGE, ...pairs.flatMap(({ bg, fg }) => [fg, bg])]),
  ]
  const resolved = resolveColors(root, colors, modes)
  return pairs.map((pair) => ({
    ...pair,
    results: modes.map((mode, index) =>
      evaluatePair(pair, resolved[index], mode, theme),
    ),
  }))
}

export const summarize = (rows: ContrastRow[]) => {
  const failing = rows.filter((row) =>
    row.results.some((result) => result.status === "fail"),
  )
  return {
    checks: rows.length,
    failing: failing.length,
    failingByMode: (rows[0]?.results ?? []).map(
      (_, index) =>
        rows.filter((row) => row.results[index].status === "fail").length,
    ),
    preset: rows.filter(
      (row) =>
        !failing.includes(row) &&
        row.results.some((result) => result.status === "preset"),
    ).length,
  }
}

export const summaryText = (
  { checks, failing, failingByMode, preset }: ReturnType<typeof summarize>,
  modes = CONTRAST_MODES,
) => {
  if (failing > 0) {
    return {
      detail: `: ${failingByMode
        .flatMap((count, index) =>
          count > 0 ? [`${count} in ${modeLabel(modes[index])}`] : [],
        )
        .join(", ")}.`,
      title: `${failing} of ${checks} checks ${failing === 1 ? "fails" : "fail"}`,
    }
  }
  if (preset > 0) {
    return {
      detail: `. The other ${preset === 1 ? "one keeps" : `${preset} keep`} the preset's original colors on purpose.`,
      title: `${checks - preset} of ${checks} checks pass`,
    }
  }
  return { detail: " in every mode.", title: `All ${checks} checks pass` }
}
