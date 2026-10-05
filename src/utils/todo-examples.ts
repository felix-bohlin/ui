import buttonKeyboard from "../component-examples/button/Keyboard.html?raw"
import abbrUnderline from "../todo-examples/abbr-underline.html?raw"
import accordionFocusRing from "../todo-examples/accordion-focus-ring.html?raw"
import autosuggestSizes from "../todo-examples/autosuggest-sizes.html?raw"
import badgeAccessibleName from "../todo-examples/badge-accessible-name.html?raw"
import badgeDotAlignment from "../todo-examples/badge-dot-alignment.html?raw"
import buttonUnwrappedText from "../todo-examples/button-unwrapped-text.html?raw"
import calloutIconColor from "../todo-examples/callout-icon-color.html?raw"
import calloutRichText from "../todo-examples/callout-rich-text.html?raw"
import cardDividers from "../todo-examples/card-dividers.html?raw"
import carouselEqualHeight from "../todo-examples/carousel-equal-height.html?raw"
import checkboxForcedColors from "../todo-examples/checkbox-forced-colors.html?raw"
import classicSelectLabelSlot from "../todo-examples/classic-select-label-slot.html?raw"
import colorContrastLedger from "../todo-examples/color-contrast-ledger.html?raw"
import dialogActionsAlign from "../todo-examples/dialog-actions-align.html?raw"
import disabledButtons from "../todo-examples/disabled-buttons.html?raw"
import drawerHeader from "../todo-examples/drawer-header.html?raw"
import fieldsInTables from "../todo-examples/fields-in-tables.html?raw"
import filledBorders from "../todo-examples/filled-borders.html?raw"
import forcedColorsDivider from "../todo-examples/forced-colors-divider.html?raw"
import forcedColorsSwitchToggle from "../todo-examples/forced-colors-switch-toggle.html?raw"
import labelLessControls from "../todo-examples/label-less-controls.html?raw"
import linkHoverContrast from "../todo-examples/link-hover-contrast.html?raw"
import listNestedLists from "../todo-examples/list-nested-lists.html?raw"
import primaryContrast from "../todo-examples/primary-contrast.html?raw"
import rangeTrackFill from "../todo-examples/range-track-fill.html?raw"
import richTextComponentLeaks from "../todo-examples/rich-text-component-leaks.html?raw"
import richTextTableWrapping from "../todo-examples/rich-text-table-wrapping.html?raw"
import rtlRequiredAsterisk from "../todo-examples/rtl-required-asterisk.html?raw"
import scrollState from "../todo-examples/scroll-state.html?raw"
import smallParagraph from "../todo-examples/small-paragraph.html?raw"
import stickyTableHeader from "../todo-examples/sticky-table-header.html?raw"
import tallMenu from "../todo-examples/tall-menu.html?raw"
import verticalButtonGroupIcons from "../todo-examples/vertical-button-group-icons.html?raw"

export const todoExamples = {
  "abbr-underline": {
    match: "`.ui-abbr`/`.ui-dfn` underline uses",
    source: abbrUnderline,
  },
  "accordion-focus-ring": {
    match: "Accordion `summary` focus ring is mostly invisible",
    source: accordionFocusRing,
  },
  "autosuggest-sizes": {
    match: "Auto-suggest arrow",
    source: autosuggestSizes,
  },
  "badge-accessible-name": {
    match: "Badge: a count is announced without context",
    source: badgeAccessibleName,
  },
  "badge-dot-alignment": {
    match: "`.ui-dot` sets fixed",
    source: badgeDotAlignment,
  },
  "button-keyboard": {
    match: "Button `kbd` looks weird on Mac",
    source: buttonKeyboard,
  },
  "button-unwrapped-text": {
    match: "Button with an icon and unwrapped text",
    source: buttonUnwrappedText,
  },
  "callout-icon-color": {
    match: "Callout icon color is set with",
    source: calloutIconColor,
  },
  "callout-rich-text": {
    match: "Callout `.ui-content` grid gap",
    source: calloutRichText,
  },
  "card-dividers": {
    match: "Dividers inside cards",
    source: cardDividers,
  },
  "carousel-equal-height": {
    match: "Carousel slides aren't equal height",
    source: carouselEqualHeight,
  },
  "checkbox-forced-colors": {
    match: "Checkbox forced-colors block loses on specificity",
    source: checkboxForcedColors,
  },
  "classic-select-label-slot": {
    match: "Astro ClassicSelect: `aria-labelledby` also points",
    source: classicSelectLabelSlot,
  },
  "color-contrast-ledger": {
    match: "Remaining `color-contrast` entries",
    source: colorContrastLedger,
  },
  "dialog-actions-align": {
    match: "Classes emitted with no CSS",
    source: dialogActionsAlign,
  },
  "disabled-buttons": {
    match: "Disabled button text color",
    source: disabledButtons,
  },
  "drawer-header": {
    match: "Drawer header can't hold two icon buttons",
    source: drawerHeader,
  },
  "fields-in-tables": {
    match: "Fields and selects collapse",
    source: fieldsInTables,
  },
  "filled-borders": {
    match: "Light mode: `--border-color` and `--surface-filled`",
    source: filledBorders,
  },
  "forced-colors-divider": {
    match: "Divider disappears in forced colors",
    source: forcedColorsDivider,
  },
  "forced-colors-switch-toggle": {
    match: "Forced colors: the unchecked Switch dot",
    source: forcedColorsSwitchToggle,
  },
  "label-less-controls": {
    match: "Label-less checkboxes",
    source: labelLessControls,
  },
  "link-hover-contrast": {
    match: "Link hover/focus color `--primary-light`",
    source: linkHoverContrast,
  },
  "list-nested-lists": {
    match: "`.ui-list` styles nested classless lists",
    source: listNestedLists,
  },
  "primary-contrast": {
    match: "`contrast-color()` for `--primary-contrast`",
    source: primaryContrast,
  },
  "range-track-fill": {
    match: "HTML Range shows no track fill",
    source: rangeTrackFill,
  },
  "rich-text-component-leaks": {
    match: "Rich text still styles component parts",
    source: richTextComponentLeaks,
  },
  "rich-text-table-wrapping": {
    match: "Rich text tables break short words",
    source: richTextTableWrapping,
  },
  "rtl-required-asterisk": {
    match: "RTL: the required asterisk in stacked",
    source: rtlRequiredAsterisk,
  },
  "scroll-state": {
    match: "Scroll-state container queries",
    source: scrollState,
  },
  "small-paragraph": {
    match: "`p.ui-p.ui-small` renders 12px",
    source: smallParagraph,
  },
  "sticky-table-header": {
    match: "Sticky table headers: second pass",
    source: stickyTableHeader,
  },
  "tall-menu": {
    match: "A tall menu runs off the viewport",
    source: tallMenu,
  },
  "vertical-button-group-icons": {
    match: "Vertical ButtonGroup squares any button",
    source: verticalButtonGroupIcons,
  },
}

export type TodoExampleName = keyof typeof todoExamples

export const todoExamplesFor = (text: string) =>
  Object.entries(todoExamples)
    .filter(([, example]) => text.startsWith(example.match))
    .map(([name]) => name)
