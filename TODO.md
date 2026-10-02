Severity 1-10, 1 is the most severe.

Findings with a page and section in brackets come from the stress pages in `src/stress-tests/`. Open the section named in brackets to see each one.

## Accessibility

- [] (1) Closed drawers are rendered off-screen and keyboard focusable: `dialog.ui-drawer` needs `display: none` when closed (`overlays` DrawerSides)
- [] (3) Dark mode: `--border-color`, `--surface-tonal` and `--surface-elevated` are the same gray, so borders (field borders too) vanish on tonal and elevated surfaces and tonal/elevated cards look the same (`layout` Surfaces, SidebarLayout)

## Bugs

- [] (2) Tooltips more than one viewport down the page never show: `position-visibility: anchors-visible` in `tooltip.css` (`overlays` LongContent, `tests/e2e/stress-overlays.spec.ts`)
- [] (3) A tall menu runs off the viewport when neither side has `60dvb` of space (`menu.css` `--_max-block-size`) (`overlays` LongContent)
- [] (3) Card actions don't stick to the bottom of stretched cards, never wrap, and get clipped by the card's `overflow: hidden` (`layout` UnevenGrid)
- [] (3) Rich text link styles apply to component links inside prose: `a.ui-button`, `a.ui-chip` and `a.ui-avatar` get underlined primary text (`typography` ComponentsInProse)
- [] (3) Toasts are inert or under the backdrop while a modal dialog is open (`overlays` ToastLayering)
- [] (4) Cards clip long unbroken words instead of wrapping them (`layout` UnevenGrid)
- [] (4) Rich text tables break short words letter by letter: `overflow-wrap: anywhere` lowers the min-content width (`typography` EveryElement)
- [] (4) Sticky table headers don't stick: `.ui-table { overflow: hidden }` should be `overflow: clip` (`data-display` TableStickyHeader)
- [] (5) `.ui-list` styles nested classless lists as list rows (descendant `li` selector), and rich text `p` margins make list rows tall (`typography` ProseInComponents)
- [] (5) Badge indicators on primary avatars blend in, badges don't mirror in RTL, and a badge on a direct card child is clipped (`layout` Badges, RightToLeft)
- [] (5) Callout switches to the icon layout when any nested `svg` exists: `&:has(svg)` should be `&:has(> svg)` (`layout` Nesting)
- [] (5) DescriptionList and Table container queries resolve against `body` (a size container in `normalize.css`), not their own column (`layout` DescriptionListContainer, `data-display` DescriptionLists, TableOverflow)
- [] (5) Fields and selects collapse to a few characters in auto-layout tables (`data-display` TableInlineEditing)
- [] (5) List rows can't shrink below their longest word: `li .ui-text` needs `min-inline-size: 0` (`layout` Columns)
- [] (5) Long description list terms squeeze values into one word per line, and unbroken values overflow (`data-display` DescriptionLists)
- [] (5) Rich text `kbd` overrides the `kbd` inside `.ui-button`, and a `.ui-checkbox` first in a classless `li` matches the task list rule (`typography` ComponentsInProse)
- [] (5) `span.ui-mark` has no background, and `.ui-del`/`.ui-ins` don't get the critical/success palette (`typography` HeadingClasses)
- [] (6) A menu in a dialog blends into it in dark mode (`overlays` DialogNesting)
- [] (6) Avatars shrink in flex rows (no `flex-shrink: 0`), and avatar group overflow counts like "+128" don't fit (`data-display` TableCellContent, InlineAlignment)
- [] (6) Callout `.ui-content` grid gap doubles rich text margins, and a classless `h3` in a callout is full size (`typography` ProseInComponents)
- [] (6) Chip labels wrap and overflow the fixed chip height without `.ui-multiline` (`data-display` TableCellContent)
- [] (6) Disabled button text color only applies to the text variant: the disabled block is wrapped in `:where()`, so `.ui-filled`/`.ui-tonal`/`.ui-outlined` override its `--_text-color` (only `opacity` dims them). Fix or confirm it's intended
- [] (6) Light mode: `--border-color` and `--surface-filled` are the same gray, so table header borders and filled bordered list dividers vanish (`data-display` TableStructure, ListSurfaces)
- [] (6) `pre` inside `dir="rtl"` runs code right to left (`typography` Bidi)
- [] (6) Rich text `p` overrides `.ui-p.ui-large`, `.ui-p.ui-small` and `.ui-caption` inside `.ui-rich-text` (`typography` HeadingClasses)
- [] (6) Second-level submenus don't keep the flipped direction, and the submenu arrow doesn't mirror in RTL (`overlays` Submenus, Rtl)
- [] (7) A tooltip at the inline-end edge squeezes into a narrow column instead of flipping (no minimum width) (`overlays` EdgeTriggers)
- [] (7) Components ship `types.solid.ts` importing `solid-js`, but `solid-js` isn't an optional peer dependency like `svelte`, `vue` and `astro`
- [] (7) Drawer header can't hold two icon buttons: every icon-only button gets `margin-inline-start: auto` (`overlays` DrawerNesting)
- [] (7) Rich text headings, `pre` and `small` don't follow the inherited font size (`typography` InheritedSizes)
- [] (7) Toasts have no maximum width, and a toast with an icon centers its text (`overlays` ToastLayering)
- [] (8) `.ui-dense` tables are as tall as default ones (only inline padding changes) (`data-display` TableInlineEditing)
- [] (8) `ol[start]` with 4-digit markers overflows: the wider gutter only applies at 100+ items (`typography` DeepLists)
- [] (8) Carousel slides aren't equal height when they contain cards (`layout` CarouselOfCards)
- [] (8) Label-less checkboxes, switches and progress bars sit off-center in table cells (`vertical-align: baseline`) (`data-display` TableCellContent)
- [] (8) Stretched callouts spread title and text apart (needs `align-content: start`), and the `::before` shows lighter corners inside the border (`layout` UnevenGrid, Nesting)
- [] (9) Dense list padding doesn't line up with card padding, and `.ui-inset` text offset assumes default gaps (`data-display` ListSurfaces)
- [] (9) Dividers inside cards have very large margins (`--size-fluid-3`) (`layout` SidebarLayout)
- [] (9) Narrow-container table padding grows instead of shrinking (`data-display` TableOverflow)

## Docs

- [] (3) Changelog: `divided` removed from `List`, use `bordered` (#395). Removed after 5.5.0 and missing from Unreleased
- [] (6) Hand-written API tables left: Spinner, Text input, Toast, Typography

## Limitations

- [] (4) Menu: arrow key navigation (needs JS or `focusgroup` when it ships)
- [] (8) Carousel: vertical orientation
- [] (9) Toast has no loading state. The loading example only exists on the unmerged `claude/toast-simplify` branch, and isn't a real component there

## Questions

- [] (8) Section comments I added in `carousel.css` and `menu.css` (e.g. `/* Buttons */`): keep or remove per the no-new-comments rule?

## Suggestions

- [] (6) `contrast-color()` for `--primary-contrast` so custom primaries get readable text
- [] (7) Register theme knobs with `@property` (`--motion`, `--border-radius`, focus ring tokens). `--focus-ring-color` is unset by default on purpose, so it can't get an initial value
- [] (8) Opt-in `:user-valid` success styling for forms
- [] (8) Scroll-state container queries: sticky Table header shadow, scroll shadows in Dialog/Drawer
- [] (9) `text-box: trim-both cap alphabetic` on Button/Chip/Badge only works if the label is wrapped in its own element (flex/grid containers ignore it)

## To check

- [] (3) Test Menu and Carousel in Firefox and Safari (only checked in Chromium)
- [] (4) Check button changes in the browser: new padding scale, icon side padding with wrapped labels, icon sizing, icon-only, button groups
- [] (5) Review `feat/pixel-style` (Pixel style switcher in theme drawer): check every component in light/dark, no flash on reload, Default unchanged vs main, logo font now uses `--font-heading`. Rebase may conflict in button-group.css and CHANGELOG.md
- [] (5) Test anatomy heroes in Firefox, Safari and with Windows fonts
- [] (7) Button `kbd` looks weird on Mac
- [] (8) Auto-suggest arrow: vertically centered in Chromium, but sits closer to the edge at `x-small`/`small` than at default/`large`. Check Firefox and Safari too
