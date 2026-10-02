export const posts = [
  {
    date: "2026-10-01",
    description:
      "Menu, Carousel, Button without IconButton, and everything else from three days of branches.",
    slug: "new-components-and-fixes",
    title: "Menu, Carousel and one Button",
  },
  {
    date: "2026-10-02",
    description:
      "Every component, built one step at a time. Pick a step and the demo runs only the CSS up to it.",
    slug: "under-the-hood",
    title: "Under the hood",
  },
  {
    component: "accordion",
    date: "2026-10-02",
    description:
      "interpolate-size and ::details-content let a details element transition to its natural height.",
    slug: "accordion-height-auto",
    title: "An accordion that animates to auto",
  },
  {
    component: "anchor",
    date: "2026-10-02",
    description:
      "interestfor, popover=hint and anchor positioning open a hover card on hover and focus.",
    slug: "anchor-hover-cards",
    title: "Hover cards without JavaScript",
  },
  {
    component: "avatar",
    date: "2026-10-02",
    description: "aspect-ratio, :has(img) and corner-shape for avatars.",
    slug: "avatar-squircles",
    title: "Squircle avatars with corner-shape",
  },
  {
    component: "button",
    date: "2026-10-02",
    description: ":has(> svg:only-child) turns any Button into an icon button.",
    slug: "button-icon-only-has",
    title: "One Button, no IconButton",
  },
  {
    component: "callout",
    date: "2026-10-02",
    description:
      "Relative colors and light-dark() derive every severity shade from one color.",
    slug: "callout-relative-colors",
    title: "Severity colors from one source color",
  },
  {
    component: "card",
    date: "2026-10-02",
    description: "Container style queries let children react to a variant.",
    slug: "card-style-queries",
    title: "Cards that know their variant",
  },
  {
    component: "carousel",
    date: "2026-10-02",
    description:
      "Scroll snap, ::scroll-button() and ::scroll-marker: a carousel without JavaScript.",
    slug: "carousel-css-only",
    title: "A carousel made of CSS",
  },
  {
    component: "checkbox",
    date: "2026-10-02",
    description:
      "appearance: none, a clip-path checkmark and text-box for a native checkbox.",
    slug: "checkbox-appearance-none",
    title: "Drawing a checkbox",
  },
  {
    component: "description-list",
    date: "2026-10-02",
    description:
      "A container query and a grid pseudo-element draw dotted leader lines.",
    slug: "description-list-leader-lines",
    title: "Leader lines with grid",
  },
  {
    component: "dialog",
    date: "2026-10-02",
    description:
      "Invoker commands, closedby and @starting-style for modal dialogs.",
    slug: "dialog-closedby",
    title: "Dialogs without JavaScript",
  },
  {
    component: "drawer",
    date: "2026-10-02",
    description:
      "A dialog that slides in from any edge, and out again with allow-discrete.",
    slug: "drawer-starting-style",
    title: "Sliding drawers with @starting-style",
  },
  {
    component: "form",
    date: "2026-10-02",
    description:
      ":has() lets fieldsets and legends style themselves from what they contain.",
    slug: "form-fieldset-has",
    title: "Smarter fieldsets with :has()",
  },
  {
    component: "menu",
    date: "2026-10-02",
    description:
      "Popover, invoker commands and anchor positioning: a menu with no JavaScript.",
    slug: "menu-popover-anchor",
    title: "Menus with popover and anchor positioning",
  },
  {
    component: "progress",
    date: "2026-10-02",
    description:
      "appearance: none and :indeterminate on the native progress element.",
    slug: "progress-native",
    title: "Styling the native progress bar",
  },
  {
    component: "range",
    date: "2026-10-02",
    description: "A gradient fill and datalist tick marks for input range.",
    slug: "range-tick-marks",
    title: "Range sliders with datalist ticks",
  },
  {
    component: "select",
    date: "2026-10-02",
    description:
      "appearance: base-select, ::picker(select) and :open for a fully styled select.",
    slug: "select-base-select",
    title: "A select you can style",
  },
  {
    component: "spinner",
    date: "2026-10-02",
    description: "aria-busy=true is all it takes to show a spinner.",
    slug: "spinner-aria-busy",
    title: "Spinners from aria-busy",
  },
  {
    component: "switch",
    date: "2026-10-02",
    description: "A native checkbox, appearance: none and an outline trick.",
    slug: "switch-checkbox",
    title: "A switch from a checkbox",
  },
  {
    component: "tabs",
    date: "2026-10-02",
    description: "Radio inputs, order and :nth-child(of S) for CSS-only tabs.",
    slug: "tabs-radio-buttons",
    title: "Tabs from radio buttons",
  },
  {
    component: "text-field",
    date: "2026-10-02",
    description:
      ":user-invalid shows errors after the user interacts, not on page load.",
    slug: "text-field-user-invalid",
    title: "Validation that waits with :user-invalid",
  },
  {
    component: "textarea",
    date: "2026-10-02",
    description:
      "field-sizing: content and lh units for auto-growing textareas.",
    slug: "textarea-field-sizing",
    title: "Textareas that grow with field-sizing",
  },
  {
    component: "toast",
    date: "2026-10-02",
    description:
      "attr() with a type() reads the toast duration straight from HTML.",
    slug: "toast-attr-duration",
    title: "Toast timing with typed attr()",
  },
  {
    component: "tooltip",
    date: "2026-10-02",
    description:
      "interestfor, calc-size() and @position-try for tooltips that stay on screen.",
    slug: "tooltip-interest-invokers",
    title: "Tooltips with interestfor",
  },
  {
    component: "typography",
    date: "2026-10-02",
    description: "round() snaps line heights and font sizes to a rhythm step.",
    slug: "vertical-rhythm-round",
    title: "Vertical rhythm with round()",
  },
].toSorted(
  (a, b) => a.date.localeCompare(b.date) || a.title.localeCompare(b.title),
)

const dateFormat = new Intl.DateTimeFormat("en", { dateStyle: "long" })

export const formatDate = (date: string) => dateFormat.format(new Date(date))
