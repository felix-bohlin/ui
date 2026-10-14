import buttonKeyboard from "../component-examples/button/Keyboard.html?raw"

const sources = import.meta.glob<string>("../todo-examples/*.html", {
  eager: true,
  import: "default",
  query: "?raw",
})

const sourceOf = (name: string) => sources[`../todo-examples/${name}.html`]

export const todoExamples = {
  "abbr-underline": {
    match: "`.ui-abbr`/`.ui-dfn` underline uses",
  },
  "accordion-actions-padding": {
    match: "Accordion: actions pad",
  },
  "accordion-focus-ring": {
    match: "Accordion `summary` focus ring is mostly invisible",
  },
  "accordion-html-marker": {
    match: "Accordion: the shared preamble",
  },
  "accordion-plain-group": {
    match: 'Accordion: in a plain `.ui-card[role="group"]`',
  },
  "accordion-summary-badge-icon": {
    match: "Accordion: an icon with a badge in the summary collapses",
  },
  "accordion-walkthrough-marker": {
    match: "Accordion walkthrough:",
  },
  "autosuggest-sizes": {
    match: "Auto-suggest arrow",
  },
  "avatar-group-overlap": {
    match: "Avatar: every avatar in `.ui-avatar-group` gets",
  },
  "avatar-group-role-only": {
    match: 'Avatar: the HTML "Grouped" prose',
  },
  "badge-accessible-name": {
    match: "Badge: a count is announced without context",
  },
  "badge-dot-alignment": {
    match: "`.ui-dot` sets fixed",
  },
  "badge-walkthrough-dot": {
    match: "Badge walkthrough:",
  },
  "button-aria-current": {
    match: 'Button: `[aria-current="page"]` gets the',
  },
  "button-group-link-item": {
    match: "Button group: every item rule targets `& > button`",
  },
  "button-group-vertical-small": {
    match: "ButtonGroup: `.ui-vertical > button { padding: var(--size-2) }`",
  },
  "button-group-walkthrough-outline": {
    match: "Button group walkthrough:",
  },
  "button-keyboard": {
    match: "Button `kbd` looks weird on Mac",
    source: buttonKeyboard,
  },
  "button-unwrapped-text": {
    match: "Button with an icon and unwrapped text",
  },
  "callout-bare-text": {
    match: "Callout: `.ui-content` is a grid",
  },
  "callout-html-default-icon": {
    match: "Callout: the `<svg>` part says",
  },
  "callout-icon-color": {
    match: "Callout icon color is set with",
  },
  "callout-link-focus": {
    match: "Callout: links in a tonal callout change colour on hover",
  },
  "callout-rich-text": {
    match: "Callout `.ui-content` grid gap",
  },
  "callout-walkthrough-icon": {
    match: "Callout walkthrough:",
  },
  "card-actions-align-end": {
    match: "Card: `.ui-actions.ui-align-end` reduces the end padding",
  },
  "card-dividers": {
    match: "Dividers inside cards",
  },
  "card-link": {
    match: "Composition example: a clickable card",
  },
  "card-text-class-comment": {
    match: "Card: `Variants.html` opens with",
  },
  "card-text-variant": {
    match: 'Card: the "Why does a text variant exist?"',
  },
  "carousel-equal-height": {
    match: "Carousel slides aren't equal height",
  },
  "carousel-focus-ring": {
    match: "Carousel: the library focus ring",
  },
  "carousel-markers-forced-colors": {
    match: "Carousel: the markers are `background-color`",
  },
  "carousel-motion-off-scroll": {
    match: "Carousel: `scroll-behavior: smooth` is",
  },
  "carousel-scroll-button-fallback": {
    match: "Carousel in Chromium 141",
  },
  "carousel-translated-labels": {
    match: "Carousel: the generated button and marker names are English",
  },
  "carousel-vertical-outside-markers": {
    match: 'Carousel: vertical + `buttons="outside"`',
  },
  "carousel-walkthrough-overrun": {
    match: "Carousel walkthrough:",
  },
  "checkbox-forced-colors": {
    match: "Checkbox forced-colors block loses on specificity",
  },
  "checkbox-indeterminate-helper": {
    match: "Checkbox: the HTML Indeterminate",
  },
  "checkbox-radio-walkthrough-dark": {
    match: "Radio and Checkbox walkthroughs:",
  },
  "checkbox-radio-walkthrough-label": {
    match: "Checkbox and Radio walkthroughs teach",
  },
  "checkbox-walkthrough-forced-colors": {
    match: "Checkbox walkthrough: no forced-colors",
  },
  "chip-disabled-text": {
    match: "Chip: the disabled text color never applies",
  },
  "chip-icon-padding": {
    match: "Chip: a chip with a start and an end icon gets",
  },
  "chip-static-disabled-contrast": {
    match: "Chip: a static `.ui-disabled` chip fails color contrast",
  },
  "chip-truncation": {
    match: "Chip: the Sizes example shows `multiline`",
  },
  "choice-aria-disabled": {
    match:
      "Toggle button, Checkbox, Radio, Switch: `aria-disabled` doesn't dim",
  },
  "choice-halo-layer": {
    match: "Checkbox and Radio: the hover/active halo",
  },
  "choice-invalid-unchecked-border": {
    match: "Checkbox, Radio: an invalid unchecked control has no red border",
  },
  "classic-select-label-slot": {
    match: "Astro ClassicSelect: `aria-labelledby` also points",
  },
  "contrast-custom-values": {
    match: "Contrast, Custom values: the snippet",
  },
  "contrast-normal-nested": {
    match: "Getting started Contrast: `.ui-contrast-normal`",
  },
  "contrast-tinted-surfaces": {
    match: "Contrast: `ui-link` on",
  },
  "control-sizes": {
    match: "Sizes: control size scales differ",
  },
  "description-list-anatomy-width": {
    match: "Description list: the hero anatomy",
  },
  "description-list-narrow-border": {
    match: "Description list: the Bordered",
  },
  "dialog-actions-align": {
    match: "Classes emitted with no CSS",
  },
  "dialog-actions-align-api": {
    match: "Dialog: `actionsAlign` in api.ts",
  },
  "dialog-focus-wrap": {
    match: "Dialog and Drawer docs: the Tab and Shift+Tab rows",
  },
  "dialog-long-content": {
    match: "Dialog: What's new says \"Long content scrolls",
  },
  "dialog-max-inline-size": {
    match: "Dialog: setting `max-inline-size`",
  },
  "disabled-buttons": {
    match: "Disabled button text color",
  },
  "drawer-footer-inline-end": {
    match: "Drawer: the Drawer footer API says",
  },
  "drawer-header": {
    match: "Drawer header can't hold two icon buttons",
  },
  "drawer-transparent-scroll-lock": {
    match: "Drawer: the Usage prose and the",
  },
  "field-group-column": {
    match: "Form: the Field group API shows",
  },
  "field-user-invalid": {
    match: "Switch, Text field, Textarea: the Validation",
  },
  "fields-in-tables": {
    match: "Fields and selects collapse",
  },
  "fieldset-choice-error-color": {
    match:
      "Form: inside `.ui-fieldset`, the error text of an invalid checkbox, radio or switch",
  },
  "fieldset-text-field-row": {
    match: "Dead CSS: `.ui-form:has(.ui-text-field.ui-row)`",
  },
  "filled-borders": {
    match: "Light mode: `--border-color` and `--surface-filled`",
  },
  "forced-colors-divider": {
    match: "Divider disappears in forced colors",
  },
  "forced-colors-switch-toggle": {
    match: "Forced colors: the unchecked Switch dot",
  },
  "form-walkthrough-actions": {
    match: "Form walkthrough: the demo puts",
  },
  "label-less-controls": {
    match: "Label-less checkboxes",
  },
  "link-hover-contrast": {
    match: "Link hover/focus color `--primary-light`",
  },
  "list-dense-group-label": {
    match: "List: the `.ui-dense` row selector",
  },
  "list-item-button-type": {
    match: 'ListItem `as="button"` renders `<button>`',
  },
  "list-nested-lists": {
    match: "`.ui-list` styles nested classless lists",
  },
  "list-separator-surfaces": {
    match: "List: in `.ui-list.ui-bordered.ui-tonal`",
  },
  "list-text-leak": {
    match: "List: the `.ui-text` rule inside",
  },
  "list-video-rtl": {
    match: "List: `li:has(video)` uses physical padding",
  },
  "list-walkthrough-nested": {
    match: "List walkthrough:",
  },
  "mask-icons-forced-colors": {
    match: "Select and Text input: mask icons painted",
  },
  "menu-accessibility": {
    match: "Menu: the Accessibility section is",
  },
  "menu-critical-dark-contrast": {
    match: "Menu: a critical item fails contrast in dark mode",
  },
  "menu-shrink": {
    match: "Menu doesn't shrink to the space",
  },
  "minified-animation-timeline": {
    match: "Range fill and the header scroll fade",
  },
  "palette-hue-rotate": {
    match: "`--palette-hue-rotate-by` is described as",
  },
  "palette-scopes": {
    match: "Concepts: severity scope classes are never defined",
  },
  "palette-source-scope": {
    match: "Getting started Theming says `--palette-source` can be overridden",
  },
  "primary-contrast": {
    match: "`contrast-color()` for `--primary-contrast`",
  },
  "primary-contrast-clamp": {
    match: '`--primary-contrast` description ("Text color',
  },
  "progress-determinate-script": {
    match: "Progress: the Determinate HTML",
  },
  "progress-walkthrough-name": {
    match: "Progress walkthrough:",
  },
  "radio-coarse-sizes": {
    match: "Radio: on touch screens",
  },
  "radio-sizes-stack": {
    match: "Radio: the page has no Sizes, Stack or hidden-label sections",
  },
  "radio-spread": {
    match: "Radio has no `.ui-spread`",
  },
  "range-spread-ticks-value": {
    match: "Range: in `.ui-spread`, `.ui-value` and `datalist`",
  },
  "range-tick-centering": {
    match: "Range: tick labels are not centered",
  },
  "range-track-fill": {
    match: "HTML Range shows no track fill",
  },
  "range-value-script": {
    match: "Range: the Value HTML example has",
  },
  "range-walkthrough-rtl-fill": {
    match: "Range walkthrough:",
  },
  "rhythm-walkthrough-flow-space": {
    match: "Rhythm walkthrough:",
  },
  "rich-text-component-leaks": {
    match: "Rich text still styles component parts",
  },
  "rich-text-inline-code": {
    match: "Typography: rich text inline `code`",
  },
  "rich-text-table-wrapping": {
    match: "Rich text tables break short words",
  },
  "rtl-required-asterisk": {
    match: "RTL: the required asterisk in stacked",
  },
  "scroll-state": {
    match: "Scroll-state container queries",
  },
  "select-header-footer": {
    match: "Select: the `header` and `footer`",
  },
  "select-picker-corners": {
    match: "Select: `::picker(select)` keeps the",
  },
  "select-spread-currency": {
    match: "Select: the Spread example still",
  },
  "select-walkthrough-arrow": {
    match: "Select walkthrough:",
  },
  "shadow-dark-mode": {
    match: "Shadows: `dist/opui.css` and `dist/op.css` ship",
  },
  "small-paragraph": {
    match: "`p.ui-p.ui-small` renders 12px",
  },
  "spinner-described-by": {
    match: "Spinner: the prose never says",
  },
  "sticky-table-header": {
    match: "Sticky table headers: second pass",
  },
  "switch-invalid-focus": {
    match: "Switch: an invalid switch barely shows focus",
  },
  "table-header-hover": {
    match: "Table: row hover also fires on",
  },
  "table-row-header-footer": {
    match: 'Table: footer and "row above the footer" rules match `td` only',
  },
  "table-walkthrough-sticky": {
    match: "Table walkthrough:",
  },
  "tabs-reading-flow": {
    match: "Tabs: in Chromium, `reading-flow`",
  },
  "tabs-scrollable-limit": {
    match: "Tabs: `.ui-scrollable` places the",
  },
  "tabs-shared-name": {
    match: "Tabs: the HTML modifiers table",
  },
  "tabs-walkthrough-rtl": {
    match: "Tabs walkthrough:",
  },
  "tall-menu": {
    match: "A tall menu runs off the viewport",
  },
  "text-field-auto-fit-width": {
    match: "Text field, Textarea: `.ui-auto-fit` doesn't shrink the field",
  },
  "text-field-description": {
    match:
      "Text field, Textarea: `description` (`.ui-start-text`) has no section",
  },
  "text-field-filled-disabled-hover": {
    match: "TextField: the `.ui-filled` hover",
  },
  "text-field-label-width": {
    match: "TextField: `&:has(input[list]) .ui-label` and",
  },
  "textarea-auto-fit": {
    match: "Textarea: Auto-fit is described",
  },
  "textarea-min-block-size": {
    match: "Textarea: `min-block-size` adds `var(--border-width)",
  },
  "textarea-walkthrough-max-size": {
    match: "Textarea walkthrough:",
  },
  "toggle-button-selected-hover": {
    match: "ToggleButton: hovering a selected toggle button drops its tint",
  },
  "toggle-group-forced-colors-height": {
    match: "Toggle group: forced colors make each group one border width short",
  },
  "toggle-group-vertical-stretch": {
    match: "Toggle group: `.ui-vertical` items don't stretch",
  },
  "tooltip-forced-colors-border": {
    match: "Tooltip: no border in forced colors",
  },
  "tooltip-walkthrough-arrow": {
    match: "Tooltip walkthrough:",
  },
  "typography-inline-table": {
    match: 'Typography: the "Inline text elements" table\'s Result column',
  },
  "ui-disabled-where": {
    match: "Menu: disabled items only match",
  },
  "vertical-button-group-icons": {
    match: "Vertical ButtonGroup squares any button",
  },
  "vue-ssr-indicator": {
    match: "Vue SSR: no page says what needs hydration",
  },
}

export type TodoExampleName = keyof typeof todoExamples

const missing = Object.entries(todoExamples)
  .filter(
    ([name, example]) => !("source" in example) && sourceOf(name) === undefined,
  )
  .map(([name]) => name)
if (missing.length > 0) {
  throw new Error(
    `[todo-examples] missing src/todo-examples/${missing.join(".html, ")}.html`,
  )
}

const unlisted = Object.keys(sources)
  .map((path) => path.match(/todo-examples\/([^/]+)\.html$/)![1])
  .filter((name) => !(name in todoExamples))
if (unlisted.length > 0) {
  throw new Error(
    `[todo-examples] add ${unlisted.join(", ")} to src/utils/todo-examples.ts`,
  )
}

export const todoExampleSource = (name: TodoExampleName) => {
  const example = todoExamples[name]
  return "source" in example ? example.source : sourceOf(name)!
}

export const todoExamplesFor = (text: string) =>
  Object.entries(todoExamples)
    .filter(([, example]) => text.startsWith(example.match))
    .map(([name]) => name)
