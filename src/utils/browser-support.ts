import { features } from "web-features"

export type BrowserId = "chrome" | "edge" | "firefox" | "safari"

export type EngineId = "chromium" | "gecko" | "webkit"

export type SupportLevel = "full" | "partial" | "none"

export type BrowserSupportEntry = {
  browser: BrowserId
  label: string
  level: SupportLevel
  sinceVersion?: string
  supportedFeatures: string[]
  unsupportedFeatures: string[]
}

export type EngineSupportEntry = {
  engine: EngineId
  label: string
  browsers: BrowserSupportEntry[]
  level: SupportLevel
  sinceVersion?: string
  unsupportedFeatures: string[]
}

const BROWSERS: { id: BrowserId; label: string }[] = [
  { id: "chrome", label: "Chrome" },
  { id: "edge", label: "Edge" },
  { id: "firefox", label: "Firefox" },
  { id: "safari", label: "Safari" },
]

const ENGINES: { id: EngineId; label: string; browsers: BrowserId[] }[] = [
  { id: "chromium", label: "Chromium", browsers: ["chrome", "edge"] },
  { id: "gecko", label: "Gecko", browsers: ["firefox"] },
  { id: "webkit", label: "WebKit", browsers: ["safari"] },
]

type SupportValue = string | false | undefined

function getSupportForFeature(
  featureId: string,
  browser: BrowserId,
): SupportValue {
  const feature = (features as Record<string, any>)[featureId]
  if (!feature) {
    console.warn(
      `[browserSupport] Unknown web-features id: "${featureId}". ` +
        `Check https://github.com/web-platform-dx/web-features for valid ids.`,
    )
    return undefined
  }

  const directSupport = feature.status?.support?.[browser]
  if (directSupport !== undefined) return directSupport

  const byCompat = feature.status?.by_compat_key as
    | Record<string, { support?: Record<string, SupportValue> }>
    | undefined

  if (!byCompat) return undefined

  let worst: SupportValue = undefined
  let sawAny = false
  for (const entry of Object.values(byCompat)) {
    const value = entry.support?.[browser]
    if (value === undefined) continue
    sawAny = true
    if (value === false) return false
    if (worst === undefined || compareVersions(value, worst as string) > 0) {
      worst = value
    }
  }
  return sawAny ? worst : undefined
}

function parseMajor(version: string): number {
  const match = /^(\d+)/.exec(version)
  return match ? Number(match[1]) : NaN
}

function compareVersions(a: string, b: string): number {
  const aMajor = parseMajor(a)
  const bMajor = parseMajor(b)
  if (Number.isNaN(aMajor) || Number.isNaN(bMajor)) return 0
  return aMajor - bMajor
}

export function computeBrowserSupport(ids: string[]): BrowserSupportEntry[] {
  return BROWSERS.map(({ id, label }) => {
    const supportedFeatures: string[] = []
    const unsupportedFeatures: string[] = []
    let maxVersion: string | undefined

    for (const featureId of ids) {
      const value = getSupportForFeature(featureId, id)
      const isSupported = typeof value === "string" && !!parseMajor(value)

      if (isSupported) {
        supportedFeatures.push(featureId)
        if (!maxVersion || compareVersions(value, maxVersion) > 0) {
          maxVersion = value
        }
      } else {
        unsupportedFeatures.push(featureId)
      }
    }

    let level: SupportLevel
    if (unsupportedFeatures.length === 0) level = "full"
    else if (supportedFeatures.length === 0) level = "none"
    else level = "partial"

    return {
      browser: id,
      label,
      level,
      sinceVersion: level === "full" ? maxVersion : undefined,
      supportedFeatures,
      unsupportedFeatures,
    }
  })
}

export function computeEngineBrowserSupport(
  ids: string[],
): EngineSupportEntry[] {
  const browserEntries = computeBrowserSupport(ids)
  const byBrowser = Object.fromEntries(
    browserEntries.map((e) => [e.browser, e]),
  ) as Record<BrowserId, BrowserSupportEntry>

  return ENGINES.map(({ id, label, browsers }) => {
    const entries = browsers.map((b) => byBrowser[b])

    let level: SupportLevel = "full"
    let sinceVersion: string | undefined
    const unsupportedSet = new Set<string>()

    for (const entry of entries) {
      if (entry.level === "none") {
        level = "none"
      } else if (entry.level === "partial" && level !== "none") {
        level = "partial"
      }
      for (const f of entry.unsupportedFeatures) unsupportedSet.add(f)
      if (entry.sinceVersion) {
        if (
          !sinceVersion ||
          compareVersions(entry.sinceVersion, sinceVersion) > 0
        ) {
          sinceVersion = entry.sinceVersion
        }
      }
    }

    return {
      engine: id,
      label,
      browsers: entries,
      level,
      sinceVersion: level === "full" ? sinceVersion : undefined,
      unsupportedFeatures: [...unsupportedSet],
    }
  })
}
