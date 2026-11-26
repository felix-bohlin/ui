import type { AstroInstance } from "astro"
import { exampleExtension, type FrameworkId } from "./framework"

// Eager globs scoped to the component-examples tree. Vite resolves these at
// build time, so missing files mean `undefined` rather than a runtime fetch.
// Note: every matched file must be parseable; orphaned/broken example files
// will fail the whole build.
export const exampleModules: Partial<Record<string, AstroInstance>> =
  import.meta.glob<AstroInstance>(
    "../component-examples/*/*.{astro,react.tsx,svelte,vue}",
    { eager: true },
  )

export const exampleSources = import.meta.glob<string>(
  "../component-examples/*/*.{astro,html,react.tsx,svelte,vue}",
  { eager: true, import: "default", query: "?raw" },
)

export const examplePath = (
  slug: string,
  name: string,
  framework: FrameworkId,
) => `../component-examples/${slug}/${name}.${exampleExtension(framework)}`

export const parseExamplePath = (path: string) => {
  const [, slug, name, extension] = path.match(
    /component-examples\/([^/]+)\/([^/.]+)\.(react\.tsx|\w+)$/,
  )!
  const framework = (
    extension === "react.tsx" ? "react" : extension
  ) as FrameworkId
  return { framework, name, slug }
}
