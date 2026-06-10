// Client-safe framework constants. Kept separate from `framework-routing.ts`
// because that module imports `astro:i18n`, which is server-only and would
// poison any client bundle that transitively pulls it in.
//
// Authored as `.js` (with JSDoc types) so it can be imported from
// `astro.config.mjs`, Node-only scripts in `scripts/`, TypeScript modules,
// and Astro `<script>` islands without extra tooling.
//
// Order convention: default framework first.

/** @typedef {"html" | "astro" | "vue" | "wc"} FrameworkId */

/** @type {FrameworkId} */
export const DEFAULT_FRAMEWORK = "html"

/** @type {{ id: FrameworkId, label: string }[]} */
export const FRAMEWORKS = [
  { id: "html", label: "HTML" },
  { id: "wc", label: "Web components" },
  { id: "astro", label: "Astro" },
  { id: "vue", label: "Vue" },
]

/** @type {FrameworkId[]} */
export const FRAMEWORK_IDS = FRAMEWORKS.map(
  (l) => /** @type {FrameworkId} */ (l.id),
)

/**
 * Build a fresh regex that matches a framework prefix at the start of a
 * pathname (e.g. `/astro/` or `/astro`). Returns a new instance each call so
 * callers can't accidentally share `lastIndex` state.
 */
export function frameworkPrefixPattern() {
  return new RegExp(`^/(${FRAMEWORK_IDS.join("|")})(/|$)`)
}
