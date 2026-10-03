export const categories = [
  { id: "under-the-hood", label: "Under the hood" },
  { id: "updates", label: "Updates" },
]

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

export const posts = [
  {
    category: "updates",
    date: "2026-10-01",
    description:
      "Menu, Carousel, Button without IconButton, and everything else from three days of branches.",
    slug: "new-components-and-fixes",
    title: "Menu, Carousel and one Button",
  },
  {
    category: "under-the-hood",
    date: "2026-10-02",
    description:
      "Every component, built one step at a time. Pick a step and the demo runs only the CSS up to it.",
    navLabel: "All build-ups",
    slug: "under-the-hood",
    title: "Under the hood",
  },
  {
    category: "under-the-hood",
    component: "accordion",
    date: "2026-10-02",
    description:
      "interpolate-size and ::details-content let a details element transition to its natural height.",
    features: ["details-content", "interpolate-size"],
    level: "intermediate",
    slug: "accordion-height-auto",
    title: "An accordion that animates to auto",
    topics: ["layout", "motion"],
  },
  {
    category: "under-the-hood",
    component: "anchor",
    date: "2026-10-02",
    description:
      "interestfor, popover=hint and anchor positioning open a hover card on hover and focus.",
    features: ["anchor-positioning", "interest-invokers", "popover-hint"],
    level: "advanced",
    slug: "anchor-hover-cards",
    title: "Hover cards without JavaScript",
    topics: ["popups"],
  },
  {
    category: "under-the-hood",
    component: "avatar",
    date: "2026-10-02",
    description: "aspect-ratio, :has(img) and corner-shape for avatars.",
    features: ["aspect-ratio", "corner-shape", "has"],
    level: "beginner",
    slug: "avatar-squircles",
    title: "Squircle avatars with corner-shape",
    topics: ["layout", "selectors"],
  },
  {
    category: "under-the-hood",
    component: "button",
    date: "2026-10-02",
    description: ":has(> svg:only-child) turns any Button into an icon button.",
    features: ["has"],
    level: "beginner",
    slug: "button-icon-only-has",
    title: "One Button, no IconButton",
    topics: ["selectors"],
  },
  {
    category: "under-the-hood",
    component: "callout",
    date: "2026-10-02",
    description:
      "Relative colors and light-dark() derive every severity shade from one color.",
    features: ["light-dark", "relative-color"],
    level: "intermediate",
    slug: "callout-relative-colors",
    title: "Severity colors from one source color",
    topics: ["color"],
  },
  {
    category: "under-the-hood",
    component: "card",
    date: "2026-10-02",
    description:
      "A container style query gives elevated cards a heavier shadow on dark surfaces.",
    features: ["container-style-queries"],
    level: "intermediate",
    slug: "card-style-queries",
    title: "Cards that know their color scheme",
    topics: ["color", "selectors"],
  },
  {
    category: "under-the-hood",
    component: "carousel",
    date: "2026-10-02",
    description:
      "Scroll snap, ::scroll-button() and ::scroll-marker: a carousel without JavaScript.",
    features: ["scroll-buttons", "scroll-markers", "scroll-snap"],
    level: "advanced",
    slug: "carousel-css-only",
    title: "A carousel made of CSS",
    topics: ["layout", "motion"],
  },
  {
    category: "under-the-hood",
    component: "checkbox",
    date: "2026-10-02",
    description:
      "appearance: none, a clip-path checkmark and text-box for a native checkbox.",
    features: ["appearance", "text-box"],
    level: "intermediate",
    slug: "checkbox-appearance-none",
    title: "Drawing a checkbox",
    topics: ["accessibility", "forms"],
  },
  {
    category: "under-the-hood",
    component: "description-list",
    date: "2026-10-02",
    description:
      "A container query and a grid pseudo-element draw dotted leader lines.",
    features: ["container-queries"],
    level: "intermediate",
    slug: "description-list-leader-lines",
    title: "Leader lines with grid",
    topics: ["layout", "typography"],
  },
  {
    category: "under-the-hood",
    component: "dialog",
    date: "2026-10-02",
    description:
      "Invoker commands, closedby and @starting-style for modal dialogs.",
    features: ["dialog-closedby", "invoker-commands", "starting-style"],
    level: "intermediate",
    slug: "dialog-closedby",
    title: "Dialogs without JavaScript",
    topics: ["motion", "popups"],
  },
  {
    category: "under-the-hood",
    component: "drawer",
    date: "2026-10-02",
    description:
      "A dialog that slides in from any edge, and out again with allow-discrete.",
    features: ["overlay", "starting-style", "transition-behavior"],
    level: "intermediate",
    slug: "drawer-starting-style",
    title: "Sliding drawers with @starting-style",
    topics: ["motion", "popups"],
  },
  {
    category: "under-the-hood",
    component: "form",
    date: "2026-10-02",
    description:
      ":has() lets fieldsets and legends style themselves from what they contain.",
    features: ["has"],
    level: "beginner",
    slug: "form-fieldset-has",
    title: "Smarter fieldsets with :has()",
    topics: ["forms", "selectors"],
  },
  {
    category: "under-the-hood",
    component: "menu",
    date: "2026-10-02",
    description:
      "Popover, invoker commands and anchor positioning: a menu with no JavaScript.",
    features: ["anchor-positioning", "invoker-commands", "popover"],
    level: "intermediate",
    slug: "menu-popover-anchor",
    title: "Menus with popover and anchor positioning",
    topics: ["popups"],
  },
  {
    category: "under-the-hood",
    component: "progress",
    date: "2026-10-02",
    description:
      "appearance: none and :indeterminate on the native progress element.",
    features: ["appearance", "container-style-queries", "indeterminate"],
    level: "intermediate",
    slug: "progress-native",
    title: "Styling the native progress bar",
    topics: ["accessibility", "forms", "motion"],
  },
  {
    category: "under-the-hood",
    component: "range",
    date: "2026-10-02",
    description: "A gradient fill and datalist tick marks for input range.",
    features: ["datalist", "input-range"],
    level: "intermediate",
    slug: "range-tick-marks",
    title: "Range sliders with datalist ticks",
    topics: ["forms"],
  },
  {
    category: "under-the-hood",
    component: "select",
    date: "2026-10-02",
    description:
      "appearance: base-select, ::picker(select) and :open for a fully styled select.",
    features: ["customizable-select", "open-pseudo"],
    level: "advanced",
    slug: "select-base-select",
    title: "A select you can style",
    topics: ["forms", "popups"],
  },
  {
    category: "under-the-hood",
    component: "spinner",
    date: "2026-10-02",
    description: "aria-busy=true is all it takes to show a spinner.",
    features: ["animations-css", "not"],
    level: "beginner",
    slug: "spinner-aria-busy",
    title: "Spinners from aria-busy",
    topics: ["accessibility", "motion"],
  },
  {
    category: "under-the-hood",
    component: "switch",
    date: "2026-10-02",
    description: "A native checkbox, appearance: none and an outline trick.",
    features: ["appearance", "light-dark"],
    level: "intermediate",
    slug: "switch-checkbox",
    title: "A switch from a checkbox",
    topics: ["color", "forms"],
  },
  {
    category: "under-the-hood",
    component: "tabs",
    date: "2026-10-02",
    description: "Radio inputs, order and :nth-child(of S) for CSS-only tabs.",
    features: ["nth-child-of"],
    level: "intermediate",
    slug: "tabs-radio-buttons",
    title: "Tabs from radio buttons",
    topics: ["layout", "selectors"],
  },
  {
    category: "under-the-hood",
    component: "text-field",
    date: "2026-10-02",
    description:
      ":user-invalid shows errors after the user interacts, not on page load.",
    features: ["user-pseudos"],
    level: "beginner",
    slug: "text-field-user-invalid",
    title: "Validation that waits with :user-invalid",
    topics: ["accessibility", "forms", "selectors"],
  },
  {
    category: "under-the-hood",
    component: "textarea",
    date: "2026-10-02",
    description:
      "field-sizing: content and lh units for auto-growing textareas.",
    features: ["field-sizing", "lh"],
    level: "beginner",
    slug: "textarea-field-sizing",
    title: "Textareas that grow with field-sizing",
    topics: ["forms", "typography"],
  },
  {
    category: "under-the-hood",
    component: "toast",
    date: "2026-10-02",
    description:
      "attr() with a type() reads the toast duration straight from HTML.",
    features: ["attr", "invoker-commands", "template"],
    level: "advanced",
    slug: "toast-attr-duration",
    title: "Toast timing with typed attr()",
    topics: ["motion", "popups"],
  },
  {
    category: "under-the-hood",
    component: "tooltip",
    date: "2026-10-02",
    description:
      "interestfor, calc-size() and @position-try for tooltips that stay on screen.",
    features: ["calc-size", "interest-invokers", "popover-hint"],
    level: "advanced",
    slug: "tooltip-interest-invokers",
    title: "Tooltips with interestfor",
    topics: ["popups"],
  },
  {
    category: "under-the-hood",
    component: "typography",
    date: "2026-10-02",
    description: "round() snaps line heights and font sizes to a rhythm step.",
    features: ["lh", "round-mod-rem"],
    level: "advanced",
    slug: "vertical-rhythm-round",
    title: "Vertical rhythm with round()",
    topics: ["layout", "typography"],
  },
].toSorted(
  (a, b) => a.date.localeCompare(b.date) || a.title.localeCompare(b.title),
)

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

export const readingMinutes = (slug: string) => {
  const source =
    Object.entries(postSources).find(([path]) =>
      path.endsWith(`/${slug}.astro`),
    )?.[1] ?? ""
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

const dateFormat = new Intl.DateTimeFormat("en", { dateStyle: "long" })

export const formatDate = (date: string) => dateFormat.format(new Date(date))

const monthFormat = new Intl.DateTimeFormat("en", {
  month: "long",
  year: "numeric",
})

export const formatMonth = (date: string) => monthFormat.format(new Date(date))
