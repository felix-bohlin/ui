## 6.0.0 sweep

Severity 10 = release blocker, 1 = polish.

### Severity 1

- [] Unused/stale types: `ToggleContext` (ToggleGroup), `startText` slot (TextField, Textarea), `headline`/`description` slots (ListItem), `children` slot (Menu, Select). Unsorted destructuring in `Select.astro`, `Textarea.astro`, `TextField.astro`; `astro/index.ts` lists Tooltip before ToggleButton
- [] Root `CHANGELOG.md` is the docs site's ("Open Props UI Docs", v2.1.0 vs root `package.json` 2.0.0): rename or point to `packages/opui/CHANGELOG.md`

### Severity 2

- [] Classes emitted with no CSS: `ui-tonal` (Callout), `ui-title` (Callout h3), `ui-default` (Accordion), `ui-align-start` (Card/Dialog), `ui-column` (FieldGroup), `ui-description` (`dd`)
- [] Anchor sets `--_anchor-inset`, which no CSS reads (`Anchor.astro:17-28`, `Anchor.vue:12-24`)
- [] Vue cleanups: unused `useSlots` (`Card.vue:2`) and `Slot` (`Divider/types.d.vue.ts:1`), Avatar `class` typed as `string`, FieldSet/FieldLegend/FieldDescription/FieldGroup/Form bind `$attrs` without `inheritAttrs: false`, Badge class order differs from Astro
- [] Callout `<article role="note">` (recorded a11y violation): use `div`/`aside` and drop the ledger entries
- [] Progress `aria-busy={false}` renders `aria-busy="false"` in Astro, nothing in Vue
- [] Size API is inconsistent: boolean `small` (Switch, TextField, Textarea) vs `size` (Radio, Checkbox, Select)
- [] dist source maps embed `sourcesContent` and `node_modules/.pnpm` paths (~500KB of 2.1MB unpacked, `scripts/build.mjs`)
- [] No `"./package.json"` in `exports`
- [] Typos: "Let's you" (`accordion.astro:53`, `tooltip.astro:96,100`), "assumtions" (`why-opui.astro:44`), "this is can never" (`why-opui.astro:75`)
- [] Vue getting started has no preamble (empty meta/search description) and doesn't mention Vite + `@vitejs/plugin-vue`
- [] Orphans: `TextFieldInputTypes.vue`, `ToggleGroupInteractive.{astro,vue}`, `definition-list/Anatomy.vue`, dead `../pages/components/*.astro` glob (`src/utils/components.ts:7`), root README "Adding New Components" misses Vue/types/`api.ts`/docs page
- [] `whats-new.ts` Tabs entry only mentions `line`. Favicon `<link>` says `image/svg+xml` for an `.ico`
- [] Dead CSS: `.ui-fieldset-item` (`range.css:266,285`), `select.css:94-99,134`, `text-field.css:255,344,369`, `text-input.css:21-25`, `table.css:113` (z-index without position) and `126/145/165` (`@container` with no container), `@supports (-moz-appearance:none)` (`link.css:17`, `typography.css:124`), `writing-mode: lr` (`typography.css:691`), `--border-size-3` as radius (`typography.css:669`), `--highlight-size` overridden by utils (`radio.css:120`, `checkbox.css:161`), `checkbox.css:189-193`, `card.css:102`, `description-list.css:47` (`::after` without content), `--isLTR` (`utils.css:27`), `normalize.css:148` (`--outline-offset` undefined, always loses)
- [] `components.css` comment groups are off: toast.css listed as Root but uses `components.extended`, drawer.css listed as Extended but uses `components.root`
- [] `range.css:206,226-232`: `--_track-fill` is never set (no fill in Blink/WebKit, fill in Firefox), gradient is physical `to right`

### Severity 3

- [] `<button>` rendered without `type="button"` (Button, Chip/Avatar `as="button"`, DrawerHeader close) submits surrounding forms
- [] `[key: string]: any` in base types (Anchor, Badge, ButtonGroup, Callout, Chip, ClassicSelect, Progress, Range, Tooltip) hides missing props and typos
- [] FieldSet `as="div"` has no `role="group"`; FieldGroup `role="group"` comes after the spread so `role="radiogroup"` is impossible
- [] DescriptionList Term/Description/Item accept `bordered` (stray attribute in Astro). Vue exports `Description` next to `DescriptionListTerm`/`DescriptionListItem`; Astro has no named subcomponent exports (DescriptionList, Table)
- [] ToggleGroup (Astro) forces every input to `type="radio"` in single mode, even an explicit `type="checkbox"` (`ToggleGroup.astro:26-30`)
- [] ListItem types allow `as="li"` (renders `<li><li>`), `type="button"` (no-op), and `class` in base types
- [] Avatar types: `as="div"` requires `href: never`, so it's a type error (`Avatar/types.ts:8-11`)
- [] Tarball ships 73 junk files: `components/AGENTS.md`, 36 `types.solid.ts` (imports `solid-js`), 36 `types.svelte.ts`. Exclude in `files`
- [] Peer ranges pinned to dev versions: `astro ^7.0.6`, `vue ^3.5.39` (Vue needs 3.5, nothing found needs Astro 7)
- [] Select picker never scales in: `@starting-style` sets `transform`, transition is on `scale` (`select.css:36-39`)
- [] Progress `[dir="rtl"]` `animation-direction: reverse` undoes the logical keyframes (`progress.css:75-81`)
- [] Table row hover never shows, cells have an opaque background (`table.css:15-19`)
- [] `p.ui-p.ui-small` renders 12px, not `--font-size-1` (specificity, `typography.css:148`)
- [] Overline text 4.32:1 in dark mode (`typography.css:69-72,90-93,484-487`)
- [] `.ui-light`/`.ui-dark` only set `--color-scheme`, so they do nothing outside `html` (`theme.css:3-9`)
- [] Checkbox required asterisk keys off `:invalid` and disappears once checked, should be `:required` (`checkbox.css:29-35`)
- [] Card dark elevated shadow only with `.ui-dark`, not OS dark mode (`card.css:16`). `body { font-size: 16px }` ignores the user's font size (`normalize.css:63`). Checkbox is the only component selector not in `:where()` (`checkbox.css:2`)
- [] `Document.astro:414-420`: `container-type: scroll-state` with no `@container` rule, plus the 555px TODO
- [] Docs theme toggle writes the OS preference to localStorage on first visit (never follows OS changes later), and the calls aren't wrapped in try/catch (`Header.astro:56-63,110-114`)
- [] Sizes prose: Button HTML text skips `.ui-x-small` (needed by the IconButton migration), Toggle shows classes on Astro/Vue pages (`button.astro:173`, `toggle.astro:137`)
- [] HTML-only content on framework pages: "Text input API" table on Astro/Vue text-field pages and `/vue/api`, "no Astro component" on Vue Spinner/Typography pages
- [] Toast API table: message is `data-title` (not value/textContent), "info" isn't the default, `warning`/`data-description`/`data-template` missing (`component-api/toast/HTML.astro:30-42`)
- [] Duplicate ids: `summary1`/`content1` in accordion `Actions`/`CustomMarker`/`MarkerAnimation` HTML examples, second `#toast-template` on the Toast page
- [] Examples use undefined `--surface-2` (`anchor/AlwaysVisible.*`)

### Severity 4

- [] Unreleased CHANGELOG still lists IconButton fixes/additions for a component removed in the same release (`CHANGELOG.md:23,46,48,50,51`)
- [] Vue derived values are plain consts, not `computed` (Button, Avatar, Anchor, Badge, Divider, Table Column, ToggleButton, ToggleGroup, Menu, Tabs)
- [] No type exports from `opui-css/astro` / `opui-css/vue` (Props, `MenuItem`, Select `Item`). Astro `Tabs` exported `as any`
- [] Anchor/Badge consume `id` for the floating element, so a user `id` disappears unless `trigger="hover"`
- [] Tooltip without `id` can never open (trigger can't know the generated id): make `id` required
- [] Avatar `<img>` has no `alt` when `alt` is omitted
- [] Dialog/Drawer have no accessible name (header/heading not wired to `aria-labelledby`)
- [] Badge indicator uses `aria-label` on a plain `span`; `dot` is an empty labelled element
- [] Range.vue shows only the suffix until the user drags, and `v-model` returns a string (`Range.vue:50`)
- [] Range.vue/ToggleButton.vue don't inject `CurrentFieldNameKey`, so no `name` inside a named FieldGroup
- [] Badge placement uses physical `inset`/translate and `position-area: none` (no RTL flip); `.ui-dot` overrides offsets for every alignment (`badge.css:5,70-92`)
- [] Neutral Callout is tinted with the primary hue, `.ui-neutral` isn't a palette scope (`callout.css:32`)
- [] Callout icon colour is set with `stroke`, example icons use `fill` (`callout.css:108`)
- [] ButtonGroup sizes are hard-coded and don't match standalone buttons (`button-group.css:31-40`)
- [] Divider disappears in forced colors, drawn with `background-color` (`divider.css:3`)
- [] `normalize.css:74`: `:not(dialog, popover)` should be `[popover]`; every popover loses its margin/centring
- [] Switch, Tabs and ToggleButton redefine `--focus-ring-color`, so the theme token is ignored (`switch.css:47`, `tabs.css:62`, `toggle-button.css:50`)
- [] Forced colors: unchecked Switch dot and selected ToggleButton are invisible
- [] ToggleButton disabled styles only apply with `.ui-disabled`, not `input:disabled` (`toggle-button.css:58`)
- [] Tooltip arrow is always on the block-end side (wrong for other positions and flips), and off-centre in RTL (`tooltip.css:39-49`)
- [] Reduced motion ignored: Spinner (`spinner.css:13`), Toast (`toast.css:33-34`), Badge transition (`badge.css:40`), smooth scroll (`normalize.css:54-56`, `carousel.css:46`). Indeterminate Progress disappears with `--motion: 0` (`progress.css:56`). `.ui-marker-turn` not mirrored in RTL
- [] Toast timer only pauses on `:hover`, not `:focus-within` (`toast.css:55`, WCAG 2.2.1)
- [] Toast Severity example uses nonexistent classes `green`/`red`/`blue` (`toast/Severity.html`)
- [] RTL: required asterisks use physical inset/margin and overlap labels (`radio.css:34,72`, `switch.css:161`, `form.css:101`, `text-field.css:120`, `checkbox.css:29-35`)
- [] ~27 places per framework render with no space after `</code>` ("invisibleprop", "variantprop", "rendersdata-invalid", "aButton", …)
- [] List docs Inset/Gutterless/Borders only describe HTML classes on Astro/Vue pages (`list.astro:289-316`)
- [] Drawer docs: "close button is automatically included" with the `header` slot is wrong (it's `DrawerHeader`), DrawerFooter has no API table (`drawer.astro:58,93`)
- [] Accordion docs: actions aren't "in the header" (they render after content, Astro/Vue have an `actions` slot), "`name` prop" on HTML page, `.ui-card` listed as a variant
- [] `.ui-link` isn't documented anywhere
- [] CDN snippets aren't pinned to a major (`HTML.astro:119`, `packages/opui/README.md:64`): use `opui-css@6`
- [] `_theming.astro:20-41`: invalid HTML (nested `li`, `p`/`Code` inside `ul`), Motion section nested in Theming, `--palette-hue`/`--palette-chroma` undocumented

### Severity 5

- [] Form components never set `aria-invalid` (`error` only sets `data-invalid`). `endText` isn't linked with `aria-describedby` on TextField, Textarea, ClassicSelect, Select (Select generates the id but never references it)
- [] User `aria-describedby` is lost on Checkbox/Radio/Switch (Vue writes `undefined` over it, Astro rest overrides the end-text id)
- [] Astro ClassicSelect `label` slot: `aria-labelledby` points at a span that only renders for the `label` prop (`ClassicSelect.astro:39-47`)
- [] FieldGroup `name`: Astro regex also renames `type="submit"`/hidden inputs; Vue misses native inputs and ClassicSelect
- [] ToggleButton `aria-pressed` on a checkbox (not allowed, never updates). Astro renders `"false"`, Vue omits it
- [] Range.vue always sets `aria-labelledby`, even with no label (`Range.vue:69`)
- [] ListItem `href` without `as`: Astro renders `<li href>`, Vue drops it
- [] Checkbox docs: `<Fragment slot="accessibility">` is nested in a section, so no Accessibility section renders and `#accessibility` is broken (`checkbox.astro:271`)
- [] Installation tabs: ButtonGroup misses `button.css` dependency, Table has no installation tab
- [] Docs Search: input has no label, dialog no name, filter chips are non-focusable `div`s, `aria-selected` without listbox roles. Browser-support filter chips have no `aria-pressed`
- [] Docs examples teach flagged patterns: `aria-selected` on `li` (`list.astro:159-165`), unlabelled icon button (`list/Gutterless.html:7`), Tabs a11y section presents a pattern axe flags
- [] Switch dot doesn't move in RTL, physical `--_dot-inset` (`switch.css:8`)
- [] RTL: select `::picker-icon` and padding are physical, arrow overlaps text (`select.css:14`, `text-field.css:202-212`, `text-input.css:52`)
- [] `--palette-hue: light-dark(...)` is invalid for the `<number>` `@property`, so it falls back to 240 in both schemes (`theme.css:15`)
- [] `core/palette.css:219-221` resets `--palette-hue`/`--palette-chroma` on every scope instead of inheriting the theme
- [] `.ui-del`/`.ui-ins`/`.ui-abbr`/`.ui-dfn` render in the primary colour, palette scopes only match the elements (`typography.css:129-131,184-193`)
- [] Link text contrast: 3.97:1 light, 3.58:1 dark, 2.26:1 on hover (`link.css:3,13`, `typography.css:300,312`)
- [] Vertical ButtonGroup squares any button that contains an svg, icon + label included (`button-group.css:156-159`)
- [] `avatar.css:54`: `:where([role="group"])` gives every `role="group"` on the page `display: flex` (FieldGroup, ButtonGroup, user markup)
- [] Chip ripple uses `--button-ripple-duration`/`--button-ripple-size`, which don't exist (`chip.css:72,76`)
- [] Transparent-backdrop drawer scroll override always loses to the `utils` layer (`drawer.css:161-169`)
- [] Checkbox forced-colors block loses on specificity, checkmark ~1.9:1 (`checkbox.css:195-209`)
- [] Autofill rule uses undefined `--well-1` (`normalize.css:123`)

### Severity 6

- [] `opui-css/css/js/toast.js` and `checkbox.js` don't resolve: `"./css/*"` maps to `*.js.css`. Add `"./css/js/*.js"` to `exports`
- [] CHANGELOG files breaking changes under Changed/Fixed or omits them: Tabs restyle (`--_accent-color`/`--_bg-color` removed, panel margin), Button label wrapping, `.ui-icon-only` removed, Button padding scale and `> svg` icon sizing, Astro/Vue no longer add `.ui-disabled`, Anchor/Tooltip hover `interestfor` wrapper removed, rich text class-less headings and heading sizes, `--focus-ring-color` unset
- [] Accordion API table shows `"rotate"` as default on the HTML page; in HTML no class means no animation (`component-api/accordion/api.ts:22`)
- [] HTML manual install file tree lists `css/components.css` but not `css/components/` or `css/js/` (`getting-started/HTML.astro:43-52`)
- [] Docs site: mobile menu button has no accessible name (`Header.astro:203-219`), skip link stays invisible on focus (`Default.astro:21`, `.ui-sr-only`)
- [] Rich text restyles components inside it (layer order beats specificity): `a.ui-button` gets underline/primary text, Description list `dd` padding, List/Menu links, `p`/`pre`/`code`/`kbd` (`typography.css:299-315,340-362,552-569`)
- [] Callout `:has(svg)` matches nested icons, so an inline icon in the content becomes the icon column (`callout.css:101-109`)
- [] Badge number contrast: warning 3.01:1, info 4.02:1, success 4.44:1 (`badge.css:10`)
- [] Filled TextField/Select/Textarea have no hover: nested `:has()` invalidates the rule (`text-field.css:327`)
- [] Invalid Range keeps the primary thumb (`range.css:186-201`)
- [] Astro Anchor and Badge emit two `style` attributes, user style is dropped (`Anchor.astro:32`, `Badge.astro:40`)
- [] Astro ClassicSelect `value` does nothing (`<select value>`) (`ClassicSelect.astro:17,52,55`)
- [] Astro TextField/Textarea spread extra attributes onto the `<label>` (Vue: the input), so `autocomplete`, `readonly`, `pattern`, `aria-*` can't reach the input

### Severity 7

- [] MIGRATING v5→v6 only covers IconButton. Missing: Accordion marker class, default chevron in Astro/Vue (doubles custom chevrons), Tabs restyle, Button label wrapping, Anchor/Tooltip `interestfor`, rich text headings and sizes, `--focus-ring-color`, `.ui-icon-only`, List `divided`. Line 130 cross-reference is stale
- [] Toast docs don't show the required setup (`output#toast-manager`, `template#toast-template`, `initToastManager()`); examples only work because `Layout.astro:85-123` injects them
- [] Toasts never animate or auto-dismiss without typed `attr()` (Firefox, Safari): no fallback for `animation`/`animation-delay` (`toast.css:37-43`)
- [] Chip.vue: `href` isn't a declared prop, `<Chip href>` renders a `div` (`Chip.vue:11`, `Chip/types.ts`)
- [] Avatar.vue declares `disabled`/`command`/`commandfor`/`interestfor` but never binds them (`Avatar.vue:11-20`)
- [] Astro Textarea `value` is lost, renders `<textarea value>` (`Textarea.astro:72`)
- [] Select can't preselect: Astro puts `value` on `<select>`, Vue SSR outputs no `selected`, `Item` has no `selected` field
- [] Tonal primary/critical buttons: 2.33:1 / 2.61:1 in light mode (`button.css:38`)
- [] Critical text/outlined buttons: 2.56:1 in dark mode, `--critical` doesn't adapt (`button.css:51`, `theme.css:35`)

### Severity 8

- [] Dialog with long content runs off screen and can't scroll: Card `overflow: hidden` replaces dialog `overflow: auto`, `margin-block-start: 15%` is width-based (`dialog.css:9`, `card.css:29`)
- [] Accordion `summary` focus ring is invisible, clipped by Card `overflow: hidden` (`card.css:29`, `accordion.css:71`)
- [] Native validation (`:user-invalid`) shows blue, not red: `--color-9` is only red inside `[data-invalid]`; hover also replaces the invalid border (`text-field.css:312-319`, `range.css:186-196`, `theme.css:105`)

### Severity 9

- [] Closed Drawers are reachable by keyboard and screen readers: `display: flex` overrides `dialog:not([open])` (`drawer.css:25`)
- [] RTL: closed side Drawers sit visibly on the page, the slide uses physical `translate` (`drawer.css:93,100,141-154`)
- [] Button with an icon and unwrapped text renders as icon-only (no padding): `:has(> svg:only-child)` ignores text nodes, so v5 markup `<button><svg/>Save</button>` breaks (`button.css:177`)

### Severity 10

- [] Astro components crash for package users: `Astro.locals.$id` is only set by the docs site's `src/middleware.ts`, not shipped or documented. Hits Accordion, Checkbox, ClassicSelect, Drawer, Menu, Radio, Range, Select, Switch, Tabs, ToggleButton, ToggleGroup, Anchor/Tooltip. Fall back to a local id generator in the components

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
- [?] Running pnpm scripts adds `@pnpm/exe` to `pnpm-lock.yaml`
- [x] Icon button disabled text color never applies: `rgb(0, 0, 0/0.3)` mixes comma and slash syntax
- [] `--primary-contrast` on `--primary` is 3.97:1 (AA needs 4.5:1): filled Tabs selected tab and primary filled Buttons. Axe misses the Tabs case because the fill is a pseudo-element

## Docs

- [x] Drawer API lists `heading` and `actions` as slots (they aren't) and has a stray row after the table
- [x] Carousel: `--_button-prev-icon`/`--_button-next-icon`/`--_button-icon-size` aren't documented anywhere since the custom properties table was removed
- [x] Dialog docs callout still says "No JavaScript required" (positive wording: "HTML only")
- [] Changelog: `divided` removed from `List`, use `bordered` (#395)
- [] Hand-written API tables left: Spinner, Text input, Toast, Typography

## To check

- [] Test Menu and Carousel in Firefox and Safari (only checked in Chromium)
- [] Test anatomy heroes in Firefox, Safari and with Windows fonts
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
