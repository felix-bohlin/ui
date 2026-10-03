import { posts } from "./blog-posts"

export { posts }

export const categories = [
  { id: "under-the-hood", label: "Under the hood" },
  { id: "updates", label: "Updates" },
].filter((category) => posts.some((post) => post.category === category.id))

export const levels = [
  { id: "beginner", label: "Beginner" },
  { id: "intermediate", label: "Intermediate" },
  { id: "advanced", label: "Advanced" },
]

export const readingTimes = [
  { id: "short", label: "3 min or less", max: 3 },
  { id: "medium", label: "4–10 min", max: 10 },
  { id: "long", label: "Over 10 min", max: Infinity },
]

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
      "toast-attr-duration",
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

export const componentName = (slug: string) =>
  slug.charAt(0).toUpperCase() + slug.slice(1).replaceAll("-", " ")

const postSources = import.meta.glob<string>("../docs/blog/*.astro", {
  eager: true,
  import: "default",
  query: "?raw",
})

const buildSources = import.meta.glob<string>(
  "../components/UnderTheHood/*Build.astro",
  { eager: true, import: "default", query: "?raw" },
)

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
  const builds = source.includes("*Build.astro")
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

const decodeEntities = (text: string) =>
  text
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&nbsp;", " ")
    .replaceAll("&quot;", `"`)
    .replaceAll("&amp;", "&")

export const excerpt = (slug: string, maxLength = 400) => {
  const body = (sourceOf(slug).split(/^---$/m)[2] ?? "")
    .replace(/code=\{`[\s\S]*?`\}/g, "")
    .replace(/<(script|style)\b[\s\S]*?<\/\1>/g, "")
    .replace(/<section>\s*<h2 id="(outline|read-more)"[\s\S]*?<\/section>/g, "")
  const text = [
    ...body.matchAll(/<(?:li|p)\b[^>]*>([\s\S]*?)(?=<\/?(?:li|ol|p|ul)\b)/g),
  ]
    .map(([, html]) => html.trim())
    .filter((html) => !/^<a\b[^>]*>[\s\S]*<\/a>$/.test(html))
    .map((html) =>
      decodeEntities(
        html
          .replace(/\{[^{}]*\}/g, "")
          .replace(/<[^>]+>/g, "")
          .replace(/\s+/g, " ")
          .trim(),
      ),
    )
    .filter(Boolean)
    .map((line) => (/[.:!?…]$/.test(line) ? line : `${line}.`))
    .join(" ")
  if (text.length <= maxLength) return text
  const cut = text.slice(0, maxLength)
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[\s,.:;–-]+$/, "")}…`
}

const dateFormat = new Intl.DateTimeFormat("en", { dateStyle: "long" })

export const formatDate = (date: string) => dateFormat.format(new Date(date))

const monthFormat = new Intl.DateTimeFormat("en", {
  month: "long",
  year: "numeric",
})

export const formatMonth = (date: string) => monthFormat.format(new Date(date))
