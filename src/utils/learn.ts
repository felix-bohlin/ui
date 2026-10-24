import { computeFeatureSupport } from "./browser-support"
import {
  componentHasFramework,
  DEFAULT_FRAMEWORK,
  hrefFor,
  type FrameworkId,
} from "./framework"
import { posts } from "./learn-posts"
import { componentName } from "./names"

export { componentName, posts }

export const componentHref = (framework: FrameworkId, component: string) =>
  hrefFor(
    componentHasFramework(framework, component) ? framework : DEFAULT_FRAMEWORK,
    `/components/${component}`,
  )

const categoryLabels: Record<string, string> = {
  "under-the-hood": "Under the hood",
}

export const categories = [...new Set(posts.map((post) => post.category))]
  .toSorted()
  .map((id) => ({ id, label: categoryLabels[id] ?? componentName(id) }))

export const levels = [
  {
    description: "every feature is Baseline widely available",
    id: "beginner",
    label: "Beginner",
  },
  {
    description: "a feature is Baseline newly available",
    id: "intermediate",
    label: "Intermediate",
  },
  {
    description: "a feature has limited availability",
    id: "advanced",
    label: "Advanced",
  },
]

export const levelOf = (features: string[]) => {
  const baselines = features.map((id) => computeFeatureSupport(id).baseline)
  if (baselines.includes(false)) return "advanced"
  if (baselines.includes("low")) return "intermediate"
  return "beginner"
}

export const series = [
  {
    id: "modals",
    label: "Modals and popovers",
    posts: [
      "dialog-closedby",
      "drawer-starting-style",
      "menu-popover-anchor",
      "anchor-hover-cards",
      "tooltip-interest-invokers",
    ],
  },
  {
    id: "native-controls",
    label: "Styling native controls",
    posts: [
      "checkbox-appearance-none",
      "switch-checkbox",
      "range-tick-marks",
      "progress-native",
      "select-base-select",
      "textarea-field-sizing",
      "text-field-user-invalid",
      "form-fieldset-has",
    ],
  },
]

export const seriesOf = (slug: string) => {
  const entry = series.find((item) => item.posts.includes(slug))
  if (!entry) return undefined
  const index = entry.posts.indexOf(slug)
  const postOf = (position: number) =>
    posts.find((post) => post.slug === entry.posts[position])
  return {
    id: entry.id,
    label: entry.label,
    next: postOf(index + 1),
    part: index + 1,
    previous: postOf(index - 1),
    total: entry.posts.length,
  }
}

export const topics = [
  { id: "accessibility", label: "Accessibility" },
  { id: "color", label: "Color" },
  { id: "forms", label: "Forms" },
  { id: "layout", label: "Layout" },
  { id: "motion", label: "Motion" },
  { id: "popups", label: "Popups" },
  { id: "selectors", label: "Selectors" },
  { id: "typography", label: "Typography" },
]

const postSources = import.meta.glob<string>("../docs/learn/*.astro", {
  eager: true,
  import: "default",
  query: "?raw",
})

const buildSources = import.meta.glob<string>(
  "../components/UnderTheHood/*Build.astro",
  { eager: true, import: "default", query: "?raw" },
)

export const buildPostSlugs: Record<string, string> = {
  FluidType: "fluid-type-progress",
  Rhythm: "vertical-rhythm-round",
}

export const walkthroughs = Object.keys(buildSources)
  .map((path) => path.split("/").pop()!.replace("Build.astro", ""))
  .filter((name) => !(name in buildPostSlugs))
  .map((name) => name.replace(/(?<!^)([A-Z])/g, "-$1").toLowerCase())
  .filter((slug) => !posts.some((post) => post.component === slug))
  .toSorted()

const countWords = (source: string) =>
  source
    .replace(/<style[\s\S]*?<\/style>/g, "")
    .replace(/<[^>]+>/g, " ")
    .match(/[A-Za-z0-9][\w'’-]*/g)?.length ?? 0

const sourceOf = (slug: string) =>
  Object.entries(postSources).find(([path]) =>
    path.endsWith(`/${slug}.astro`),
  )?.[1] ?? ""

export const readingMinutes = (slug: string) => {
  const source = sourceOf(slug)
  const builds = posts.find((post) => post.slug === slug)?.includesAllBuilds
    ? Object.values(buildSources)
    : [...source.matchAll(/UnderTheHood\/(\w+Build)\.astro/g)].map(
        ([, name]) =>
          Object.entries(buildSources).find(([path]) =>
            path.endsWith(`/${name}.astro`),
          )?.[1] ?? "",
      )
  const words = [source, ...builds].reduce(
    (total, text) => total + countWords(text),
    0,
  )
  return Math.max(1, Math.ceil(words / 200))
}

const dateFormat = new Intl.DateTimeFormat("en", { dateStyle: "long" })

export const formatDate = (date: string) => dateFormat.format(new Date(date))
