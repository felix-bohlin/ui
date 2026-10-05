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
  anchor: [
    { code: true, href: mdn("Web/CSS/anchor-name"), label: "anchor-name" },
    { code: true, href: mdn("Web/CSS/anchor-scope"), label: "anchor-scope" },
    {
      code: false,
      href: mdn("Web/API/Invoker_Commands_API"),
      label: "Invoker Commands API",
    },
    {
      code: true,
      href: mdn("Web/HTML/Global_attributes/popover"),
      label: "popover",
    },
    { code: true, href: mdn("Web/CSS/position-area"), label: "position-area" },
    {
      code: true,
      href: mdn("Web/CSS/position-try-fallbacks"),
      label: "position-try-fallbacks",
    },
    {
      code: true,
      href: mdn("Web/CSS/position-visibility"),
      label: "position-visibility",
    },
  ],
  avatar: [
    { code: true, href: mdn("Web/CSS/:has"), label: ":has()" },
    { code: true, href: mdn("Web/CSS/@supports"), label: "@supports" },
    { code: true, href: mdn("Web/CSS/aspect-ratio"), label: "aspect-ratio" },
    { code: true, href: mdn("Web/CSS/corner-shape"), label: "corner-shape" },
    { code: true, href: mdn("Web/CSS/object-fit"), label: "object-fit" },
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
  callout: [
    { code: true, href: mdn("Web/CSS/::before"), label: "::before" },
    { code: true, href: mdn("Web/CSS/:has"), label: ":has()" },
    { code: true, href: mdn("Web/CSS/isolation"), label: "isolation" },
    {
      code: true,
      href: mdn("Web/CSS/color_value/light-dark"),
      label: "light-dark()",
    },
    { code: true, href: mdn("Web/CSS/color_value/oklch"), label: "oklch()" },
    {
      code: false,
      href: mdn("Web/CSS/CSS_colors/Relative_colors"),
      label: "Using relative colors",
    },
  ],
  card: [
    { code: true, href: mdn("Web/CSS/:has"), label: ":has()" },
    { code: true, href: mdn("Web/CSS/@container"), label: "@container" },
    {
      code: false,
      href: mdn("Web/CSS/Attribute_selectors"),
      label: "Attribute selectors",
    },
    { code: true, href: mdn("Web/CSS/color-scheme"), label: "color-scheme" },
    {
      code: false,
      href: mdn("Web/CSS/CSS_containment/Container_size_and_style_queries"),
      label: "Container size and style queries",
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
  checkbox: [
    { code: true, href: mdn("Web/CSS/:checked"), label: ":checked" },
    {
      code: true,
      href: mdn("Web/CSS/:indeterminate"),
      label: ":indeterminate",
    },
    { code: true, href: mdn("Web/CSS/appearance"), label: "appearance" },
    { code: true, href: mdn("Web/CSS/clip-path"), label: "clip-path" },
    {
      code: true,
      href: mdn("Web/CSS/@media/forced-colors"),
      label: "forced-colors",
    },
    { code: true, href: mdn("Web/CSS/text-box"), label: "text-box" },
  ],
  "description-list": [
    { code: true, href: mdn("Web/CSS/::after"), label: "::after" },
    { code: true, href: mdn("Web/HTML/Element/dl"), label: "<dl>" },
    {
      code: false,
      href: mdn("Web/CSS/CSS_containment/Container_queries"),
      label: "Container queries",
    },
    {
      code: true,
      href: mdn("Web/CSS/container-type"),
      label: "container-type",
    },
    {
      code: true,
      href: mdn("Web/CSS/grid-template-columns"),
      label: "grid-template-columns",
    },
    { code: true, href: mdn("Web/CSS/order"), label: "order" },
  ],
  dialog: [
    { code: true, href: mdn("Web/CSS/::backdrop"), label: "::backdrop" },
    { code: true, href: mdn("Web/CSS/:has"), label: ":has()" },
    { code: true, href: mdn("Web/HTML/Element/dialog"), label: "<dialog>" },
    {
      code: true,
      href: mdn("Web/CSS/@starting-style"),
      label: "@starting-style",
    },
    {
      code: true,
      href: mdn("Web/HTML/Element/dialog#closedby"),
      label: "closedby",
    },
    {
      code: false,
      href: mdn("Web/API/Invoker_Commands_API"),
      label: "Invoker Commands API",
    },
    {
      code: true,
      href: mdn("Web/CSS/scrollbar-gutter"),
      label: "scrollbar-gutter",
    },
    {
      code: true,
      href: mdn("Web/CSS/transition-behavior"),
      label: "transition-behavior",
    },
  ],
  drawer: [
    { code: true, href: mdn("Web/CSS/::backdrop"), label: "::backdrop" },
    { code: true, href: mdn("Web/CSS/:dir"), label: ":dir()" },
    { code: true, href: mdn("Web/HTML/Element/dialog"), label: "<dialog>" },
    {
      code: true,
      href: mdn("Web/CSS/@starting-style"),
      label: "@starting-style",
    },
    {
      code: false,
      href: mdn("Web/CSS/CSS_logical_properties_and_values"),
      label: "Logical properties",
    },
    { code: true, href: mdn("Web/CSS/overlay"), label: "overlay" },
    {
      code: true,
      href: mdn("Web/CSS/transition-behavior"),
      label: "transition-behavior",
    },
    { code: true, href: mdn("Web/CSS/translate"), label: "translate" },
  ],
  form: [
    { code: true, href: mdn("Web/CSS/:has"), label: ":has()" },
    { code: true, href: mdn("Web/CSS/:not"), label: ":not()" },
    { code: true, href: mdn("Web/CSS/:required"), label: ":required" },
    { code: true, href: mdn("Web/HTML/Element/fieldset"), label: "<fieldset>" },
    { code: true, href: mdn("Web/HTML/Element/legend"), label: "<legend>" },
    { code: true, href: mdn("Web/CSS/all"), label: "all" },
    {
      code: false,
      href: mdn("Web/CSS/Next-sibling_combinator"),
      label: "Next-sibling combinator",
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
  progress: [
    {
      code: true,
      href: mdn("Web/CSS/::-moz-progress-bar"),
      label: "::-moz-progress-bar",
    },
    {
      code: true,
      href: mdn("Web/CSS/::-webkit-progress-value"),
      label: "::-webkit-progress-value",
    },
    { code: true, href: mdn("Web/CSS/:has"), label: ":has()" },
    {
      code: true,
      href: mdn("Web/CSS/:indeterminate"),
      label: ":indeterminate",
    },
    { code: true, href: mdn("Web/HTML/Element/progress"), label: "<progress>" },
    { code: true, href: mdn("Web/CSS/appearance"), label: "appearance" },
    {
      code: true,
      href: mdn("Web/CSS/inset-inline-start"),
      label: "inset-inline-start",
    },
  ],
  range: [
    {
      code: true,
      href: mdn("Web/CSS/::-moz-range-progress"),
      label: "::-moz-range-progress",
    },
    {
      code: true,
      href: mdn("Web/CSS/::-moz-range-thumb"),
      label: "::-moz-range-thumb",
    },
    {
      code: true,
      href: mdn("Web/CSS/::-webkit-slider-runnable-track"),
      label: "::-webkit-slider-runnable-track",
    },
    {
      code: true,
      href: mdn("Web/CSS/::-webkit-slider-thumb"),
      label: "::-webkit-slider-thumb",
    },
    { code: true, href: mdn("Web/CSS/:dir"), label: ":dir()" },
    { code: true, href: mdn("Web/HTML/Element/datalist"), label: "<datalist>" },
    {
      code: true,
      href: mdn("Web/HTML/Element/input/range"),
      label: '<input type="range">',
    },
    { code: true, href: mdn("Web/CSS/@property"), label: "@property" },
    {
      code: true,
      href: mdn("Web/CSS/animation-timeline"),
      label: "animation-timeline",
    },
    {
      code: true,
      href: mdn("Web/CSS/gradient/linear-gradient"),
      label: "linear-gradient()",
    },
    {
      code: true,
      href: mdn("Web/CSS/timeline-scope"),
      label: "timeline-scope",
    },
    {
      code: true,
      href: mdn("Web/CSS/view-timeline"),
      label: "view-timeline",
    },
  ],
  rhythm: [
    { code: true, href: mdn("Web/CSS/length#lh"), label: "lh" },
    { code: true, href: mdn("Web/CSS/line-height"), label: "line-height" },
    { code: true, href: mdn("Web/CSS/round"), label: "round()" },
  ],
  select: [
    { code: true, href: mdn("Web/CSS/::picker"), label: "::picker()" },
    { code: true, href: mdn("Web/CSS/::picker-icon"), label: "::picker-icon" },
    { code: true, href: mdn("Web/CSS/:open"), label: ":open" },
    {
      code: true,
      href: mdn("Web/CSS/@starting-style"),
      label: "@starting-style",
    },
    {
      code: true,
      href: mdn("Web/HTML/Element/selectedcontent"),
      label: "<selectedcontent>",
    },
    { code: true, href: mdn("Web/CSS/appearance"), label: "appearance" },
    {
      code: false,
      href: mdn("Learn_web_development/Extensions/Forms/Customizable_select"),
      label: "Customizable select elements",
    },
    {
      code: true,
      href: mdn("Web/CSS/transition-behavior"),
      label: "transition-behavior",
    },
  ],
  spinner: [
    { code: true, href: mdn("Web/CSS/::before"), label: "::before" },
    { code: true, href: mdn("Web/CSS/:empty"), label: ":empty" },
    { code: true, href: mdn("Web/CSS/:not"), label: ":not()" },
    { code: true, href: mdn("Web/CSS/@keyframes"), label: "@keyframes" },
    {
      code: true,
      href: mdn("Web/Accessibility/ARIA/Reference/Attributes/aria-busy"),
      label: "aria-busy",
    },
    {
      code: true,
      href: mdn("Web/CSS/transform-function/rotate"),
      label: "rotate()",
    },
  ],
  stepper: [
    { code: true, href: mdn("Web/CSS/:checked"), label: ":checked" },
    { code: true, href: mdn("Web/CSS/:has"), label: ":has()" },
  ],
  switch: [
    { code: true, href: mdn("Web/CSS/::after"), label: "::after" },
    { code: true, href: mdn("Web/CSS/::before"), label: "::before" },
    { code: true, href: mdn("Web/CSS/:checked"), label: ":checked" },
    { code: true, href: mdn("Web/CSS/appearance"), label: "appearance" },
    {
      code: false,
      href: mdn("Web/Accessibility/ARIA/Reference/Roles/switch_role"),
      label: "ARIA switch role",
    },
    {
      code: true,
      href: mdn("Web/CSS/inset-inline-start"),
      label: "inset-inline-start",
    },
    {
      code: true,
      href: mdn("Web/CSS/color_value/light-dark"),
      label: "light-dark()",
    },
    {
      code: true,
      href: mdn("Web/CSS/outline-offset"),
      label: "outline-offset",
    },
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
  "text-field": [
    { code: true, href: mdn("Web/CSS/:focus-within"), label: ":focus-within" },
    { code: true, href: mdn("Web/CSS/:has"), label: ":has()" },
    { code: true, href: mdn("Web/CSS/:invalid"), label: ":invalid" },
    { code: true, href: mdn("Web/CSS/:required"), label: ":required" },
    { code: true, href: mdn("Web/CSS/:user-invalid"), label: ":user-invalid" },
  ],
  textarea: [
    { code: true, href: mdn("Web/CSS/field-sizing"), label: "field-sizing" },
    { code: true, href: mdn("Web/CSS/length#lh"), label: "lh" },
    {
      code: true,
      href: mdn("Web/CSS/max-block-size"),
      label: "max-block-size",
    },
    {
      code: true,
      href: mdn("Web/CSS/min-block-size"),
      label: "min-block-size",
    },
    { code: true, href: mdn("Web/CSS/resize"), label: "resize" },
  ],
  toast: [
    { code: true, href: mdn("Web/HTML/Element/template"), label: "<template>" },
    {
      code: true,
      href: mdn("Web/CSS/animation-delay"),
      label: "animation-delay",
    },
    {
      code: true,
      href: mdn("Web/CSS/animation-play-state"),
      label: "animation-play-state",
    },
    {
      code: true,
      href: mdn("Web/API/Element/animationend_event"),
      label: "animationend",
    },
    { code: true, href: mdn("Web/CSS/attr"), label: "attr()" },
  ],
  tooltip: [
    { code: true, href: mdn("Web/CSS/@position-try"), label: "@position-try" },
    { code: true, href: mdn("Web/CSS/calc-size"), label: "calc-size()" },
    {
      code: false,
      href: mdn("Web/API/Invoker_Commands_API"),
      label: "Invoker Commands API",
    },
    { code: false, href: mdn("Web/API/Popover_API"), label: "Popover API" },
    { code: true, href: mdn("Web/CSS/position-area"), label: "position-area" },
    {
      code: true,
      href: mdn("Web/CSS/position-try-fallbacks"),
      label: "position-try-fallbacks",
    },
  ],
}
