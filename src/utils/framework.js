// @ts-check
// Client-safe framework constants and routing helpers.
//
// Authored as `.js` (with JSDoc types) so it can be imported from
// `astro.config.mjs`, Node-only scripts in `scripts/`, TypeScript modules,
// and Astro `<script>` islands without extra tooling.
//
// Order convention: default framework first.

/** @typedef {"html" | "astro" | "react" | "svelte" | "vue"} FrameworkId */

/** @type {FrameworkId} */
export const DEFAULT_FRAMEWORK = "html"

/** @type {{ id: FrameworkId, label: string }[]} */
export const FRAMEWORKS = [
  { id: "html", label: "HTML" },
  { id: "astro", label: "Astro" },
  { id: "react", label: "React" },
  { id: "svelte", label: "Svelte" },
  { id: "vue", label: "Vue" },
]

/** @type {FrameworkId[]} */
export const FRAMEWORK_IDS = FRAMEWORKS.map(
  (l) => /** @type {FrameworkId} */ (l.id),
)

/** @typedef {Exclude<FrameworkId, "html">} PackageFrameworkId */

/** @type {PackageFrameworkId[]} */
export const PACKAGE_FRAMEWORK_IDS = FRAMEWORK_IDS.filter(
  (id) => id !== "html",
).map((id) => /** @type {PackageFrameworkId} */ (id))

/**
 * @param {FrameworkId} framework
 * @returns {framework is Exclude<PackageFrameworkId, "astro">}
 */
export function isHydratedFramework(framework) {
  return framework !== "html" && framework !== "astro"
}

/** @param {FrameworkId} framework */
export function exampleExtension(framework) {
  return framework === "react" ? "react.tsx" : framework
}

/**
 * @param {string | null | undefined} value
 * @returns {value is FrameworkId}
 */
export function isFrameworkId(value) {
  return !!value && FRAMEWORKS.some((l) => l.id === value)
}

/**
 * `getStaticPaths` payload for files under `src/pages/[framework]/`. Emits one
 * route per framework; every framework gets a URL prefix.
 */
export function frameworkPaths() {
  return FRAMEWORKS.map((l) => ({
    params: { framework: l.id },
  }))
}

/** @type {Record<string, FrameworkId[]>} */
export const COMPONENT_FRAMEWORKS = {}

export const FRAMEWORK_AGNOSTIC_EXAMPLES = ["typography/Default"]

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

export const FRAMEWORK_FREE_PREFIXES = [
  "/blocks",
  "/blog",
  "/checks",
  "/theme-builder",
  "/todo",
]

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

/**
 * Strip the framework prefix from a pathname, returning the path segment that
 * is shared across framework variants. Used when computing the equivalent URL
 * on a different framework.
 *
 * @param {string} pathname
 */
export function stripFrameworkPrefix(pathname) {
  const match = pathname.match(frameworkPrefixPattern())
  if (!match) return pathname || "/"
  const stripped = pathname.slice(match[0].length - (match[2] === "/" ? 1 : 0))
  return stripped || "/"
}

/** @param {string} pathname */
export function canonicalPath(pathname) {
  return stripFrameworkPrefix(pathname).replace(/\/$/, "")
}

/**
 * Build the URL for the same logical page on a specific framework. Every
 * framework has its own prefix and pages end in a slash. Preserves any query
 * string and hash fragment on the input.
 *
 * @param {FrameworkId} framework
 * @param {string} pathname
 */
export function hrefFor(framework, pathname) {
  // Split off `?query` and `#hash` so we localize only the path portion.
  const hashIndex = pathname.indexOf("#")
  const queryIndex = pathname.indexOf("?")
  const splitAt =
    hashIndex === -1
      ? queryIndex
      : queryIndex === -1
        ? hashIndex
        : Math.min(hashIndex, queryIndex)
  const path = splitAt === -1 ? pathname : pathname.slice(0, splitAt)
  const suffix = splitAt === -1 ? "" : pathname.slice(splitAt)

  const sharedPath = stripFrameworkPrefix(path)
  if (isFrameworkFree(sharedPath)) return `${sharedPath}${suffix}`
  const trimmed = sharedPath.replace(/^\/|\/$/g, "")
  return `/${framework}/${trimmed ? `${trimmed}/` : ""}${suffix}`
}

/**
 * Returns one entry per framework variant of the given pathname. Used for
 * emitting canonical and alternate link tags.
 *
 * @param {string} pathname
 * @returns {{ framework: FrameworkId, url: string, isDefault: boolean }[]}
 */
export function frameworkVariantsOf(pathname) {
  const sharedPath = stripFrameworkPrefix(pathname)
  if (isFrameworkFree(sharedPath)) return []
  return FRAMEWORKS.filter((l) => pathHasFramework(l.id, sharedPath)).map(
    (l) => ({
      framework: l.id,
      url: hrefFor(l.id, pathname),
      isDefault: l.id === DEFAULT_FRAMEWORK,
    }),
  )
}

export const FRAMEWORK_STORAGE_KEY = "opui-framework"
