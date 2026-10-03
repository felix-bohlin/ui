// Client-safe framework constants. Kept separate from `framework-routing.ts`
// because that module imports `astro:i18n`, which is server-only and would
// poison any client bundle that transitively pulls it in.
//
// Authored as `.js` (with JSDoc types) so it can be imported from
// `astro.config.mjs`, Node-only scripts in `scripts/`, TypeScript modules,
// and Astro `<script>` islands without extra tooling.
//
// Order convention: default framework first.

/** @typedef {"html" | "astro" | "vue"} FrameworkId */

/** @type {FrameworkId} */
export const DEFAULT_FRAMEWORK = "html"

/** @type {{ id: FrameworkId, label: string }[]} */
export const FRAMEWORKS = [
  { id: "html", label: "HTML" },
  { id: "astro", label: "Astro" },
  { id: "vue", label: "Vue" },
]

/** @type {FrameworkId[]} */
export const FRAMEWORK_IDS = FRAMEWORKS.map(
  (l) => /** @type {FrameworkId} */ (l.id),
)

/** @type {Record<string, FrameworkId[]>} */
export const COMPONENT_FRAMEWORKS = {
  toast: ["html"],
}

/**
 * @param {FrameworkId} framework
 * @param {string} slug
 */
export function componentHasFramework(framework, slug) {
  return COMPONENT_FRAMEWORKS[slug]?.includes(framework) ?? true
}

/**
 * @param {FrameworkId} framework
 * @param {string} sharedPath
 */
export function pathHasFramework(framework, sharedPath) {
  const slug = sharedPath.match(/^\/components\/([^/]+)/)?.[1]
  return !slug || componentHasFramework(framework, slug)
}

export const FRAMEWORK_FREE_PREFIXES = ["/learn"]

/** @param {string} sharedPath */
export function isFrameworkFree(sharedPath) {
  return FRAMEWORK_FREE_PREFIXES.some(
    (prefix) => sharedPath === prefix || sharedPath.startsWith(`${prefix}/`),
  )
}

/**
 * Build a fresh regex that matches a framework prefix at the start of a
 * pathname (e.g. `/astro/` or `/astro`). Returns a new instance each call so
 * callers can't accidentally share `lastIndex` state.
 */
export function frameworkPrefixPattern() {
  return new RegExp(`^/(${FRAMEWORK_IDS.join("|")})(/|$)`)
}
