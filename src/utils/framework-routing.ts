import { getRelativeLocaleUrl } from "astro:i18n"
import {
  DEFAULT_FRAMEWORK,
  FRAMEWORK_IDS,
  FRAMEWORKS,
  frameworkPrefixPattern,
  type FrameworkId,
} from "./framework"

export {
  DEFAULT_FRAMEWORK,
  FRAMEWORK_IDS,
  FRAMEWORKS,
  frameworkPrefixPattern,
  type FrameworkId,
}

export function isFrameworkId(value: string | undefined): value is FrameworkId {
  return !!value && FRAMEWORKS.some((l) => l.id === value)
}

/**
 * `getStaticPaths` payload for files under `src/pages/[framework]/`. Emits one
 * route per framework; every framework gets a URL prefix (Astro's
 * `prefixDefaultLocale: true`).
 */
export function frameworkPaths() {
  return FRAMEWORKS.map((l) => ({
    params: { framework: l.id },
  }))
}

/**
 * Strip the framework prefix from a pathname, returning the path segment that
 * is shared across framework variants. Used when computing the equivalent URL
 * on a different framework.
 */
export function stripFrameworkPrefix(pathname: string): string {
  const match = pathname.match(frameworkPrefixPattern())
  if (!match) return pathname || "/"
  const stripped = pathname.slice(match[0].length - (match[2] === "/" ? 1 : 0))
  return stripped || "/"
}

/**
 * Build the URL for the same logical page on a specific framework. Honors the
 * Astro i18n config (default framework is unprefixed). Preserves any query
 * string and hash fragment on the input - Astro's `getRelativeLocaleUrl`
 * treats its input as a single path segment and would otherwise mangle them
 * (e.g. append a trailing slash *after* the hash).
 */
export function hrefFor(framework: FrameworkId, pathname: string): string {
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
  const localized = getRelativeLocaleUrl(
    framework,
    sharedPath.replace(/^\//, ""),
  )
  return `${localized}${suffix}`
}

/**
 * Returns one entry per framework variant of the given pathname. Used for
 * emitting canonical and alternate link tags.
 */
export function frameworkVariantsOf(
  pathname: string,
): { framework: FrameworkId; url: string; isDefault: boolean }[] {
  return FRAMEWORKS.map((l) => ({
    framework: l.id,
    url: hrefFor(l.id, pathname),
    isDefault: l.id === DEFAULT_FRAMEWORK,
  }))
}
