import { features } from "web-features"
import type { FrameworkId } from "./framework-routing"
import { whatsNewFor } from "./whats-new"

export type BaselineStatus = "limited" | "newly" | "widely"

export type ReleaseStatus = "new" | "updated"

const docSources = import.meta.glob("../docs/components/*.astro", {
  query: "raw",
  import: "default",
  eager: true,
}) as Record<string, string>

function baselineFor(source: string): BaselineStatus | undefined {
  const match = source.match(/browserSupport=\{\[([\s\S]*?)\]\}/)
  if (!match) return undefined

  const ids = [...match[1].matchAll(/["']([^"']+)["']/g)].map((m) => m[1])
  if (!ids.length) return undefined

  const levels = ids.map(
    (id) => (features as Record<string, any>)[id]?.status?.baseline ?? false,
  )
  if (levels.includes(false)) return "limited"
  if (levels.includes("low")) return "newly"
  return "widely"
}

export function componentStatusFor(framework: FrameworkId, slug: string) {
  const source = docSources[`../docs/components/${slug}.astro`] ?? ""
  const notes = whatsNewFor(framework, slug)

  let release: ReleaseStatus | undefined
  if (notes.some((note) => note.startsWith("New component"))) release = "new"
  else if (notes.length > 0) release = "updated"

  return { baseline: baselineFor(source), release }
}

export const BASELINE_LABELS: Record<BaselineStatus, string> = {
  limited: "Limited availability",
  newly: "Newly available",
  widely: "Widely available",
}

export const RELEASE_LABELS: Record<ReleaseStatus, string> = {
  new: "New",
  updated: "Updated",
}
