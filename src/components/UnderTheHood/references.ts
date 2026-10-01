const mdn = (path: string) => `https://developer.mozilla.org/docs/${path}`

export const references = {
  accordion: [
    {
      code: true,
      href: mdn("Web/CSS/::details-content"),
      label: "::details-content",
    },
    { code: true, href: mdn("Web/HTML/Element/details"), label: "<details>" },
    {
      code: true,
      href: mdn("Web/CSS/content-visibility"),
      label: "content-visibility",
    },
    {
      code: true,
      href: mdn("Web/CSS/interpolate-size"),
      label: "interpolate-size",
    },
    { code: true, href: mdn("Web/CSS/rotate"), label: "rotate" },
    {
      code: true,
      href: mdn("Web/CSS/transition-behavior"),
      label: "transition-behavior",
    },
  ],
  button: [
    { code: true, href: mdn("Web/CSS/:has"), label: ":has()" },
    { code: true, href: mdn("Web/CSS/:only-child"), label: ":only-child" },
    { code: true, href: mdn("Web/CSS/clip-path"), label: "clip-path" },
    { code: true, href: mdn("Web/CSS/length#ex"), label: "ex" },
    {
      code: true,
      href: mdn("Web/CSS/transform-style"),
      label: "transform-style",
    },
  ],
  carousel: [
    {
      code: true,
      href: mdn("Web/CSS/::scroll-button"),
      label: "::scroll-button()",
    },
    {
      code: true,
      href: mdn("Web/CSS/::scroll-marker"),
      label: "::scroll-marker",
    },
    {
      code: true,
      href: mdn("Web/CSS/::scroll-marker-group"),
      label: "::scroll-marker-group",
    },
    {
      code: true,
      href: mdn("Web/CSS/:target-current"),
      label: ":target-current",
    },
    { code: true, href: mdn("Web/CSS/anchor"), label: "anchor()" },
    {
      code: false,
      href: mdn("Web/CSS/CSS_overflow/CSS_carousels"),
      label: "Creating CSS carousels",
    },
    {
      code: true,
      href: mdn("Web/CSS/grid-auto-flow"),
      label: "grid-auto-flow",
    },
    {
      code: true,
      href: mdn("Web/CSS/overscroll-behavior"),
      label: "overscroll-behavior",
    },
    {
      code: true,
      href: mdn("Web/CSS/scroll-snap-align"),
      label: "scroll-snap-align",
    },
    {
      code: true,
      href: mdn("Web/CSS/scroll-snap-type"),
      label: "scroll-snap-type",
    },
    {
      code: false,
      href: mdn("Web/CSS/CSS_counter_styles/Using_CSS_counters"),
      label: "Using CSS counters",
    },
  ],
  menu: [
    { code: true, href: mdn("Web/CSS/:popover-open"), label: ":popover-open" },
    {
      code: true,
      href: mdn("Web/CSS/@starting-style"),
      label: "@starting-style",
    },
    { code: true, href: mdn("Web/CSS/anchor-size"), label: "anchor-size()" },
    {
      code: false,
      href: mdn("Web/API/Invoker_Commands_API"),
      label: "Invoker Commands API",
    },
    { code: true, href: mdn("Web/CSS/overlay"), label: "overlay" },
    { code: false, href: mdn("Web/API/Popover_API"), label: "Popover API" },
    { code: true, href: mdn("Web/CSS/position-area"), label: "position-area" },
    {
      code: true,
      href: mdn("Web/CSS/position-try-fallbacks"),
      label: "position-try-fallbacks",
    },
    {
      code: false,
      href: mdn("Web/CSS/CSS_anchor_positioning/Using"),
      label: "Using CSS anchor positioning",
    },
  ],
  rhythm: [
    { code: true, href: mdn("Web/CSS/length#lh"), label: "lh" },
    { code: true, href: mdn("Web/CSS/line-height"), label: "line-height" },
    { code: true, href: mdn("Web/CSS/round"), label: "round()" },
  ],
  stepper: [
    { code: true, href: mdn("Web/CSS/:checked"), label: ":checked" },
    { code: true, href: mdn("Web/CSS/:has"), label: ":has()" },
  ],
  tabs: [
    { code: true, href: mdn("Web/CSS/:checked"), label: ":checked" },
    {
      code: true,
      href: mdn("Web/CSS/:focus-visible"),
      label: ":focus-visible",
    },
    { code: true, href: mdn("Web/CSS/:nth-child"), label: ":nth-child()" },
    { code: true, href: mdn("Web/CSS/isolation"), label: "isolation" },
    {
      code: false,
      href: mdn("Web/CSS/Next-sibling_combinator"),
      label: "Next-sibling combinator",
    },
    { code: true, href: mdn("Web/CSS/order"), label: "order" },
  ],
}
