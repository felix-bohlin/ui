## Not now

- [] Toast loading state isn't a real component
- [?] Auto-suggest arrow is misaligned
- [?] button kbd looks weird on Mac
- [x] Button group dividers look double thick (check if the -1px margin applies, or scaling rounds the overlapping borders apart)
- [] Review `feat/pixel-style` (Pixel style switcher in theme drawer): check every component in light/dark, no flash on reload, Default unchanged vs main, logo font now uses `--font-heading`. Rebase may conflict in button-group.css and CHANGELOG.md
- [] Check button changes in the browser: new padding scale, icon side padding with wrapped labels, icon sizing, icon-only, button groups
- [x] components.css lists icon-button under "no dependencies" but it now needs button.css for its tokens
- [?] Disabled button text color only applies to the text variant, filled/tonal/outlined override it (intended?)
- [x] Button group still duplicates the primary/critical button tokens in its "Color inherited from Button Group" block
- [x] Icon button disabled styles ignore `.ui-disabled`

## Bugs

- [x] Getting-started docs (HTML, Astro, Vue) import `opui-css/open-props.css`, which isn't in `exports`
- [x] DrawerHeader's `@click` close fallback never runs in server-rendered Vue without hydration (only `commandfor` works there)
- [x] Carousel: browsers with scroll buttons but no `if()` (Chrome 135-136) show both the glyph and the image icon
- [x] Running pnpm scripts adds `@pnpm/exe` to `pnpm-lock.yaml` (expected: pnpm 12 records the `packageManager` version and its per-platform binaries in the lockfile, so commit it)
- [x] Icon button disabled text color never applies: `rgb(0, 0, 0/0.3)` mixes comma and slash syntax
- [x] `--primary-contrast` on `--primary` is 3.97:1 (AA needs 4.5:1): filled Tabs selected tab and primary filled Buttons. Axe misses the Tabs case because the fill is a pseudo-element
- [] Remaining `color-contrast` entries in `a11y-known-violations.json`: Typography (muted overline in dark, `code`, `ins`, `del` and `mark` combinations), List `kbd` and Badges in the stress pages
- [x] Invalid end text fails contrast in dark mode (`stress/forms` States and KitchenSink in the a11y ledger)
- [x] ButtonGroup and ToggleGroup overflow narrow containers instead of wrapping or shrinking (`stress/forms` LongContent). Proposal: wrap by default with the group drawing its outer edge, opt-in `.ui-scrollable` (like Tabs) and `.ui-shrink`

## Docs

- [x] Drawer API lists `heading` and `actions` as slots (they aren't) and has a stray row after the table
- [x] Carousel: `--_button-prev-icon`/`--_button-next-icon`/`--_button-icon-size` aren't documented anywhere since the custom properties table was removed
- [x] Dialog docs callout still says "No JavaScript required" (positive wording: "HTML only")
- [] Changelog: `divided` removed from `List`, use `bordered` (#395)
- [] Hand-written API tables left: Spinner, Text input, Toast, Typography

## To check

- [] Test Menu and Carousel in Firefox and Safari (only checked in Chromium)
- [] Test anatomy heroes in Firefox, Safari and with Windows fonts
- [x] Nested `pnpm` calls (`pnpm check`) fail in the cloud container with "Exec format error": pnpm's self-managed copy keeps its shebang-less placeholder when install scripts are blocked, and `shellEmulator` execs it directly. The session-start hook now relinks the native binary
- [x] Merging main brings back IconButton docs from #395 (`icon-button/api.ts`, `icon-button.astro` with its hero): delete them, and add `rounded` and ripple to Button's `api.ts`
- [x] Remove the orphaned `icon-button-*.png` visual baselines (the examples are gone)

## Limitations

- [] Menu: arrow key navigation (needs JS or `focusgroup` when it ships)
- [] Carousel: vertical orientation

## Suggestions

- [x] Ship a `layers.css` with the `@layer` order for people who import single component files
- [?] Register theme knobs with `@property` (`--motion`, `--border-radius`, focus ring tokens)
- [] `contrast-color()` for `--primary-contrast` so custom primaries get readable text
- [] `text-box: trim-both cap alphabetic` on Button/Chip/Badge only works if the label is wrapped in its own element (flex/grid containers ignore it)
- [] Scroll-state container queries: sticky Table header shadow, scroll shadows in Dialog/Drawer
- [] Opt-in `:user-valid` success styling for forms

## Questions

- [?] `svelte` peer dependency but no Svelte components: remove it, or keep it for planned Svelte support?
- [?] Section comments I added in `carousel.css` and `menu.css` (e.g. `/* Buttons */`): keep or remove per the no-new-comments rule?
- [x] X-small fields use 16px text
- [x] `Switch` takes `size` like the other components
- [x] Checkbox, Radio and Switch align with the first line of their label, centered on its capitals (`--choice-label-offset` to nudge)
- [x] Spread field widths follow their content, so a Select is narrower than a TextField. Give spread fields one width?
- [x] Chip sizes follow the control size scale (small 28px, default 32px, large 40px)
- [x] Stress pages for typography, layout, overlays and data display (HTML only, they test the CSS)

## Stress test findings

Found by the stress pages in `src/stress-tests/`. Open the section named in brackets to see each one.

- [] Rich text link styles apply to component links inside prose: `a.ui-button`, `a.ui-chip` and `a.ui-avatar` get underlined primary text (`typography` ComponentsInProse)
- [] Rich text `p` overrides `.ui-p.ui-large`, `.ui-p.ui-small` and `.ui-caption` inside `.ui-rich-text` (`typography` HeadingClasses)
- [] Rich text tables break short words letter by letter: `overflow-wrap: anywhere` lowers the min-content width (`typography` EveryElement)
- [] `ol[start]` with 4-digit markers overflows: the wider gutter only applies at 100+ items (`typography` DeepLists)
- [] Rich text headings, `pre` and `small` don't follow the inherited font size (`typography` InheritedSizes)
- [] Callout `.ui-content` grid gap doubles rich text margins, and a classless `h3` in a callout is full size (`typography` ProseInComponents)
- [] `.ui-list` styles nested classless lists as list rows (descendant `li` selector), and rich text `p` margins make list rows tall (`typography` ProseInComponents)
- [] `span.ui-mark` has no background, and `.ui-del`/`.ui-ins` don't get the critical/success palette (`typography` HeadingClasses)
- [] `pre` inside `dir="rtl"` runs code right to left (`typography` Bidi)
- [] Rich text `kbd` overrides the `kbd` inside `.ui-button`, and a `.ui-checkbox` first in a classless `li` matches the task list rule (`typography` ComponentsInProse)
- [] Card actions don't stick to the bottom of stretched cards, never wrap, and get clipped by the card's `overflow: hidden` (`layout` UnevenGrid)
- [] Cards clip long unbroken words instead of wrapping them (`layout` UnevenGrid)
- [] List rows can't shrink below their longest word: `li .ui-text` needs `min-inline-size: 0` (`layout` Columns)
- [] Callout switches to the icon layout when any nested `svg` exists: `&:has(svg)` should be `&:has(> svg)` (`layout` Nesting)
- [] Stretched callouts spread title and text apart (needs `align-content: start`), and the `::before` shows lighter corners inside the border (`layout` UnevenGrid, Nesting)
- [] Dark mode: `--border-color`, `--surface-tonal` and `--surface-elevated` are the same gray, so borders vanish on tonal and elevated surfaces and tonal/elevated cards look the same (`layout` Surfaces, SidebarLayout)
- [] Light mode: `--border-color` and `--surface-filled` are the same gray, so table header borders and filled bordered list dividers vanish (`data-display` TableStructure, ListSurfaces)
- [] DescriptionList and Table container queries resolve against `body` (a size container in `normalize.css`), not their own column (`layout` DescriptionListContainer, `data-display` DescriptionLists, TableOverflow)
- [] Dividers inside cards have very large margins (`--size-fluid-3`) (`layout` SidebarLayout)
- [] Badge indicators on primary avatars blend in, badges don't mirror in RTL, and a badge on a direct card child is clipped (`layout` Badges, RightToLeft)
- [] Carousel slides aren't equal height when they contain cards (`layout` CarouselOfCards)
- [] Sticky table headers don't stick: `.ui-table { overflow: hidden }` should be `overflow: clip` (`data-display` TableStickyHeader)
- [] `.ui-dense` tables are as tall as default ones (only inline padding changes) (`data-display` TableInlineEditing)
- [] Label-less checkboxes, switches and progress bars sit off-center in table cells (`vertical-align: baseline`) (`data-display` TableCellContent)
- [] Fields and selects collapse to a few characters in auto-layout tables (`data-display` TableInlineEditing)
- [] Avatars shrink in flex rows (no `flex-shrink: 0`), and avatar group overflow counts like "+128" don't fit (`data-display` TableCellContent, InlineAlignment)
- [] Chip labels wrap and overflow the fixed chip height without `.ui-multiline` (`data-display` TableCellContent)
- [] Long description list terms squeeze values into one word per line, and unbroken values overflow (`data-display` DescriptionLists)
- [] Dense list padding doesn't line up with card padding, and `.ui-inset` text offset assumes default gaps (`data-display` ListSurfaces)
- [] Narrow-container table padding grows instead of shrinking (`data-display` TableOverflow)
- [x] Outlined and text critical buttons fail contrast in dark mode (2.56:1), like primary (`forms` KitchenSink)
- [] Tooltips more than one viewport down the page never show: `position-visibility: anchors-visible` in `tooltip.css` (`overlays` LongContent, `tests/e2e/stress-overlays.spec.ts`)
- [] A tooltip at the inline-end edge squeezes into a narrow column instead of flipping (no minimum width) (`overlays` EdgeTriggers)
- [] A tall menu runs off the viewport when neither side has `60dvb` of space (`menu.css` `--_max-block-size`) (`overlays` LongContent)
- [] Closed drawers are rendered off-screen and keyboard focusable: `dialog.ui-drawer` needs `display: none` when closed (`overlays` DrawerSides)
- [] Toasts are inert or under the backdrop while a modal dialog is open (`overlays` ToastLayering)
- [] Toasts have no maximum width, and a toast with an icon centers its text (`overlays` ToastLayering)
- [] Drawer header can't hold two icon buttons: every icon-only button gets `margin-inline-start: auto` (`overlays` DrawerNesting)
- [] Second-level submenus don't keep the flipped direction, and the submenu arrow doesn't mirror in RTL (`overlays` Submenus, Rtl)
- [x] Critical menu items fail contrast in dark mode (1.92:1)
- [] A menu in a dialog blends into it in dark mode (`overlays` DialogNesting)
