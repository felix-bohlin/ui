import type { DocsPage } from "./types"

export const pages = {
  accordion: {
    apis: ["accordion", "accordion-summary", "accordion-actions"],
    fallbacks: {
      "display-animation":
        "Without display animation, the content hides at once when the accordion closes.",
      "interpolate-size":
        "Without `interpolate-size`, the content doesn't slide: it fades in at full height and hides at once.",
    },
    title: "Accordion",
  },
  anchor: {
    examples: ["AlwaysVisible"],
    fallbacks: {
      "interest-invokers":
        "Without interest invokers, the compat layer shows the card while its anchor is hovered or has keyboard focus, and Esc doesn't hide it.",
      "popover-hint":
        'Without `popover="hint"`, the card is a manual popover, which the compat layer still shows on hover and focus.',
    },
    title: "Anchor",
  },
  avatar: {
    examples: ["Image"],
    fallbacks: {
      "corner-shape":
        "Without `corner-shape`, the compat layer draws a squircle avatar as a rounded square with corners at 27% of its size.",
    },
    title: "Avatar",
  },
  badge: { title: "Badge" },
  breadcrumb: { title: "Breadcrumb" },
  button: { examples: ["Variants"], title: "Button" },
  callout: { examples: ["Variants"], title: "Callout" },
  card: {
    apis: ["card", "card-header", "card-actions"],
    examples: ["Variants"],
    title: "Card",
  },
  carousel: {
    fallbacks: {
      if: "Without `if()`, the compat layer still turns smooth scrolling off under reduced motion and with `.ui-motion-off`.",
      "scroll-buttons":
        "Without scroll buttons, the carousel shows its scrollbar instead of previous and next buttons, and still scrolls and snaps.",
      "scroll-marker-targets":
        "Without `:target-current`, the markers don't show which item is current.",
      "scroll-markers":
        "Without scroll markers, the carousel has no markers to jump to an item.",
    },
    title: "Carousel",
  },
  checkbox: {
    apis: ["checkbox", "checkbox-input", "field-group", "select-all"],
    title: "Checkbox",
  },
  chip: { examples: ["Variants"], title: "Chip" },
  "control-group": {
    apis: ["control-group", "button"],
    examples: ["Variants"],
    fallbacks: {
      "customizable-select":
        "Without customizable select, a select in the group opens the browser's own picker.",
      "gap-decorations":
        "Without gap decorations, the compat layer overlaps the controls and draws each line with a control's start border, so a row that wraps starts with a line.",
      if: "Without `if()`, the compat layer draws the lines of a filled or tonal group with the controls' start borders.",
      "reading-flow":
        "Without `reading-flow`, Tab and screen readers follow a field's markup, which puts its top and start parts before its control, as they're drawn.",
    },
    title: "Control group",
  },
  copy: {
    fallbacks: {
      "display-animation":
        "Without display animation, the Copied label disappears at once instead of sliding back.",
      "interest-invokers":
        "Without interest invokers, a tooltip on the copy button shows while the button is hovered or has keyboard focus, and the compat layer hides it while the Copied label shows.",
      overlay:
        "Without `overlay`, the page can cover the Copied label while it slides back.",
      "popover-hint":
        'Without `popover="hint"`, the tooltip on the copy button is a manual popover, which the compat layer still shows on hover and focus.',
    },
    title: "Copy",
  },
  "description-list": { title: "Description list" },
  dialog: {
    apis: ["dialog", "dialog-header", "dialog-footer"],
    fallbacks: {
      "container-scroll-state-queries":
        "Without scroll-state queries, long content scrolls without the shadows that mark more content above or below.",
      "dialog-closedby":
        "Without `closedby`, a modal dialog closes with Esc whatever the value, and a click outside doesn't close it. The [polyfill](/guide/browser-support#polyfills) adds it.",
      "display-animation":
        "Without display animation, the dialog disappears at once instead of fading out.",
      overlay:
        "Without `overlay`, the backdrop disappears as soon as the dialog starts to close, and the page can cover the dialog while it fades out.",
    },
    features: { core: ["overflow-clip", "scrollbar-gutter"] },
    title: "Dialog",
  },
  divider: {
    fallbacks: {
      "text-box":
        "Without `text-box`, a divider with a label keeps the label's full line height, so it takes a little more room.",
    },
    title: "Divider",
  },
  drawer: {
    apis: ["drawer", "drawer-header", "drawer-footer"],
    fallbacks: {
      "container-scroll-state-queries":
        "Without scroll-state queries, long content scrolls without the shadows that mark more content above or below.",
      "dialog-closedby":
        "Without `closedby`, a modal drawer closes with Esc whatever the value, and a click outside doesn't close it. The [polyfill](/guide/browser-support#polyfills) adds it.",
      "display-animation":
        "Without display animation, the drawer disappears at once instead of sliding out.",
      overlay:
        "Without `overlay`, the backdrop disappears as soon as the drawer starts to close, and the page can cover the drawer while it slides out.",
    },
    features: { core: ["scrollbar-gutter"] },
    title: "Drawer",
  },
  field: {
    apis: ["field", "character-count"],
    examples: ["Basics", "Ids"],
    fallbacks: {
      attr: "Without typed `attr()`, a textarea is at least three lines tall, whatever `rows` says.",
      "customizable-select":
        "Without customizable select, a select gets the field's chevron and the browser's picker, with option text only.",
      "display-animation":
        "Without display animation, the select picker closes without fading.",
      overlay:
        "Without `overlay`, the page can cover the select picker while it fades out.",
      "reading-flow":
        "Without `reading-flow`, Tab and screen readers follow the markup, so write the top and start parts before the control.",
    },
    title: "Field",
  },
  "file-upload": {
    fallbacks: {
      attr: "Without typed `attr()` nothing changes: only a round `Progress` reads it, and a file's progress is a bar.",
    },
    title: "File upload",
  },
  form: {
    apis: [
      "form",
      "fieldset",
      "field-legend",
      "field-description",
      "field-group",
    ],
    title: "Form",
  },
  layout: {
    examples: ["Column"],
    fallbacks: {
      "gap-decorations":
        "Without gap decorations, a bordered layout keeps its gaps but draws no lines in them.",
    },
    title: "Layout",
  },
  list: { title: "List" },
  menu: {
    fallbacks: {
      "calc-size":
        "Without `calc-size()`, a menu that doesn't fit on its side of the trigger flips to the other side, instead of shrinking to the space it has.",
      "container-scroll-state-queries":
        "Without scroll-state queries, a long menu scrolls without the shadows that mark more items above or below.",
      "display-animation":
        "Without display animation, the menu disappears at once instead of fading out.",
      overlay:
        "Without `overlay`, the page can cover the menu while it fades out.",
    },
    title: "Menu",
  },
  message: {
    apis: ["message-list", "message", "reactions"],
    fallbacks: {
      "corner-shape":
        "Without `corner-shape`, the bubbles keep plain rounded corners.",
    },
    title: "Message",
  },
  meter: { title: "Meter" },
  "number-field": {
    base: "field",
    fallbacks: {
      "reading-flow":
        "Without `reading-flow`, nothing changes: the step buttons are already in order.",
    },
    features: { ignore: ["popover"] },
    title: "Number field",
  },
  "one-time-code": {
    fallbacks: {
      "reading-flow":
        "Without `reading-flow` nothing changes: a one-time code has no parts before its input.",
    },
    title: "One-time code",
  },
  progress: {
    examples: ["Indeterminate"],
    fallbacks: {
      attr: "Without typed `attr()`, a round progress shows as a bar.",
    },
    title: "Progress",
  },
  radio: {
    apis: ["radio", "radio-input", "field-group"],
    features: { ignore: ["alt-text-generated-content"] },
    title: "Radio",
  },
  range: {
    base: "field",
    fallbacks: {
      "reading-flow":
        "Without `reading-flow`, Tab and screen readers follow the markup, so write any top and start parts before the range.",
    },
    title: "Range",
  },
  rating: {
    fallbacks: {
      attr: "Without typed `attr()`, a read-only rating is as many stars wide as `--_max`, which the components set from `max`, and draws its empty stars solid instead of as outlines.",
    },
    title: "Rating",
  },
  select: {
    base: "field",
    fallbacks: {
      "customizable-select":
        "Without customizable select, the select gets the field's chevron and the browser's picker, with option text only.",
      "display-animation":
        "Without display animation, the picker closes without fading.",
      overlay:
        "Without `overlay`, the page can cover the picker while it fades out.",
      "reading-flow":
        "Without `reading-flow`, Tab and screen readers follow the markup, so write the top and start parts before the control.",
    },
    title: "Select",
  },
  spinner: {
    fallbacks: {
      if: "Without `if()`, the compat layer still draws the spinner at full strength with more contrast.",
    },
    title: "Spinner",
  },
  stat: { title: "Stat" },
  stepper: { title: "Stepper" },
  switch: { apis: ["switch", "switch-input", "field-group"], title: "Switch" },
  table: {
    apis: [
      "table",
      "table-header-cell",
      "table-cell",
      "table-column-group",
      "table-column",
      "sortable-table",
    ],
    examples: ["Normal"],
    fallbacks: {
      "container-scroll-state-queries":
        "Without scroll-state queries, a sticky header gets no shadow once it's stuck.",
    },
    title: "Table",
  },
  tabs: { title: "Tabs" },
  "text-field": {
    base: "field",
    fallbacks: {
      "reading-flow":
        "Without `reading-flow`, Tab and screen readers follow the markup, so write the top and start parts before the control.",
    },
    title: "Text field",
  },
  textarea: {
    base: "field",
    fallbacks: {
      attr: "Without typed `attr()`, a textarea is at least three lines tall, whatever `rows` says.",
      "reading-flow":
        "Without `reading-flow`, Tab and screen readers follow the markup, so write the top and start parts before the control.",
    },
    title: "Textarea",
    uses: ["character-count"],
  },
  timeline: { title: "Timeline" },
  toast: {
    fallbacks: {
      "interpolate-size":
        "Without `interpolate-size`, a dismissed toast collapses partway at once, hiding its text, before it fades out and the others close the gap.",
    },
    title: "Toast",
  },
  toggle: {
    apis: ["toggle-group", "toggle-button"],
    examples: ["Standalone"],
    fallbacks: {
      "gap-decorations":
        "Without gap decorations, the compat layer draws the lines in a group with shadows on each button's start and top edges.",
    },
    title: "Toggle",
  },
  tooltip: {
    fallbacks: {
      "calc-size":
        "Without `calc-size()`, a long tooltip near the edge of the window can wrap into a narrow column.",
      "display-animation":
        "Without display animation, the tooltip disappears at once instead of fading out.",
      "interest-invokers":
        "Without interest invokers, the compat layer shows the tooltip while its trigger is hovered or has keyboard focus, and Esc doesn't hide it. Content later on the page can cover it.",
      overlay:
        "Without `overlay`, the page can cover a tooltip while it fades out.",
      "popover-hint":
        'Without `popover="hint"`, a toggletip is a manual popover, so Esc and a click outside leave it open.',
      "text-wrap-pretty":
        "Without `text-wrap: pretty`, the last line of a tooltip can hold a single word.",
    },
    title: "Tooltip",
  },
  typography: {
    examples: ["Variants"],
    fallbacks: {
      attr: "Without typed `attr()`, an ordered list in rich text with a `start` indents for four-digit numbers.",
      "box-decoration-break":
        "Without `box-decoration-break`, a highlight that wraps keeps its padding and rounded corners only at its start and end.",
      if: "Without `if()`, the compat layer still dims the subtitle of a heading group, and keeps it at full strength with more contrast.",
      "text-wrap-pretty":
        "Without `text-wrap: pretty`, the last line of a paragraph, heading or caption can hold a single word.",
    },
    features: { ignore: ["marker"] },
    title: "Typography",
  },
} satisfies Record<string, DocsPage>
