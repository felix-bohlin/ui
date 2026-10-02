Severity 1-10, 1 is the most severe.

Findings with a page and section in brackets come from the stress pages in `src/stress-tests/`. Open the section named in brackets to see each one.

## Accessibility

- [x] (1) Closed drawers are rendered off-screen and keyboard focusable: `dialog.ui-drawer` needs `display: none` when closed (`overlays` DrawerSides)
  - Fixed: `dialog.ui-drawer:not([open])` is `display: none`. The close transition still runs (`display` transitions with `allow-discrete`).
- [x] (3) Dark mode: `--border-color`, `--surface-tonal` and `--surface-elevated` are the same gray, so borders (field borders too) vanish on tonal and elevated surfaces and tonal/elevated cards look the same (`layout` Surfaces, SidebarLayout)
  > borders on tonal and elevated should have the same color as the background
  - Fixed: tonal and elevated cards (and dialogs, which are elevated cards) have a border in the page background color, so a tonal card on a tonal surface stays visible. Inside them, `--border-color` and `--field-border-color` are the page background in dark mode, so dividers and field borders show too (`theme.css` "Raised surfaces"). Light mode only changes the card's own border. The theme generator copies the block from `theme.css`.
- [] (4) Remaining `color-contrast` entries in `a11y-known-violations.json`: Typography (muted overline and heading group text in dark mode, `typography` stress page), List `kbd`, Badges (`layout` Badges) and `data-display` InlineAlignment

## Bugs

- [x] (2) Tooltips more than one viewport down the page never show: `position-visibility: anchors-visible` in `tooltip.css` (`overlays` LongContent, `tests/e2e/stress-overlays.spec.ts`)
  > fix it. what I also noticed was that dialogs that are scrollable should have fixed header and footer - fix that too.
  - Fixed: the cause was `position: absolute` on hover popovers in `anchor.css` (top-layer boxes below the initial containing block are not painted). They are `position: fixed` now. `anchors-visible` stays, so a tooltip hides when its trigger scrolls out of view.
  - Fixed: `Dialog` already had a max height (`85dvb - var(--size-4)`), but the whole dialog scrolled. Now the header and actions stay put and only `.ui-content` scrolls.
- [?] (3) A tall menu runs off the viewport when neither side has `60dvb` of space (`menu.css` `--_max-block-size`) (`overlays` LongContent)
  > give a better example
  - Example: a laptop viewport 700px tall. A toolbar button sits in the middle of the page, at `y = 330`, and opens a 12-item menu (about 480px of items).
    - The menu is capped at `60dvb` = 420px.
    - Below the trigger there are about 330px, above it about 320px. 420px fits on neither side.
    - No `position-try-fallbacks` option fits, so the browser keeps the first one (`block-end`). The menu runs about 90px past the bottom of the viewport. It's `position: fixed` in the top layer, so scrolling the page doesn't reveal the last items. They can only be reached with the keyboard, if at all.
  - Proposed fix: cap the menu to the space on its side and let the browser pick the roomier side:
    ```css
    .ui-menu[popover] {
      /* % resolves against the position-area cell */
      max-block-size: min(var(--_max-block-size), 100%);
      position-try-order: most-block-size;
    }
    ```
- [x] (3) Card actions don't stick to the bottom of stretched cards, never wrap, and get clipped by the card's `overflow: hidden` (`layout` UnevenGrid)
  - Fixed: `.ui-actions` gets `margin-block-start: auto` and `flex-wrap: wrap`. Its top spacing moved from margin to padding, so non-stretched cards look the same.
- [x] (3) Rich text link styles apply to component links inside prose: `a.ui-button`, `a.ui-chip` and `a.ui-avatar` get underlined primary text (`typography` ComponentsInProse)
  - Fixed: rich text moved to a new `components.prose` layer, below `components.root`, so component styles always beat classless prose styles. Layer order is now `openprops, theme, normalize, components.prose, components.root, components.extended, utils` (README, getting started and skill updated). Rich text links also skip elements with a `ui-` class, so `a.ui-chip` isn't bold.
- [] (3) Toasts are inert or under the backdrop while a modal dialog is open (`overlays` ToastLayering)
  > don't do anything with toasts just yet - skip
- [x] (4) Cards clip long unbroken words instead of wrapping them (`layout` UnevenGrid)
  - Fixed: cards have `overflow-wrap: break-word` and `min-inline-size: 0`, so they also stop growing their grid column.
- [?] (4) Rich text tables break short words letter by letter: `overflow-wrap: anywhere` lowers the min-content width (`typography` EveryElement)
  - Not fixed, needs a decision. `anywhere` is there so a table never pushes the article wider than the screen. Every fix trades something:
    1. Scroll: `display: block; overflow-x: auto` on the classless `table` plus `overflow-wrap: break-word` on cells. Words stay whole and the table scrolls when it doesn't fit (tried it, checked at 390px and 1100px). But axe flags the scroll region (`scrollable-region-focusable`): Chromium and Firefox make scrollers keyboard focusable, Safari doesn't, and classless markup can't add `tabindex`. Tables also stop stretching to full width when their content is short.
    2. `display: grid` keeps the full width, but splits `thead` and `tbody` into separate tables, so columns don't line up. Not usable.
    3. `hyphens: auto` with `overflow-wrap: break-word`: breaks at syllables instead of letters, but only where the browser has a hyphenation dictionary, and long URLs and numbers would overflow again.
    4. Keep `anywhere` (current). Never overflows, breaks short words on narrow screens.
  - Recommendation: 1, if you accept the Safari keyboard gap for wide tables (it would go in the a11y ledger), otherwise 4. Authors can always wrap a table in a focusable scroll container themselves.

- [x] (4) Sticky table headers don't stick: `.ui-table { overflow: hidden }` should be `overflow: clip` (`data-display` TableStickyHeader)
  > remove the ability to do sticky table headers - they need to be rethought. create a todo for doing a second pass on sticky headers. skip this for now.
  - Removed the leftover `thead { z-index: 1 }`. Sticky headers were never documented. Follow-up below.
- [] (4) Sticky table headers: second pass. Needs `overflow: clip` instead of `hidden` on `.ui-table` (or a scroll wrapper that is the sticky container), a header background and border that survive `border-collapse: separate`, and an opt-in class. See the scroll-state suggestion for the stuck shadow.
- [?] (5) `.ui-list` styles nested classless lists as list rows (descendant `li` selector), and rich text `p` margins make list rows tall (`typography` ProseInComponents)
  > what is the proposed solution? Honestly it's weird to expect rich-text inside ui-list to begin with. It has constraints for a reason.
  - Agreed. We shouldn't support rich text inside list rows. Two small changes would just stop it from breaking:
    1. Only style direct children: `& > :where(li, option)` instead of `:where(li, option)`. A nested list inside a row then stays a normal list, and a nested `.ui-list` already styles its own rows.
    2. Reset margins on the text parts the list already styles: `.ui-text :where(h1, h2, h3, h4, h5, h6, p) { margin: 0 }`. Rich text is now in a lower layer, so this wins.
  - No rich text support beyond that.
- [x] (5) Badge indicators on primary avatars blend in, badges don't mirror in RTL, and a badge on a direct card child is clipped (`layout` Badges, RightToLeft)
  > 1. fix badge mirroring in RTL
  > 2. should ui-list end item icon mirroring be fixed too in RTL? the chevron isn't mirrored but maybe we shouldn't mess with icons? Thoughts?
  > 3. regarding color - that's not our problem. Badge has a lot of colors to choose from. Users can just choose another.
  - Fixed 1: badge insets are logical (`inset-block`/`inset-inline`) and the horizontal offset flips with `:dir(rtl)`, for every alignment and the dot.
  - 2: Don't mirror icons in `.ui-end` automatically. Only directional icons (chevrons, arrows, "back") should mirror. A checkmark, a logo or a play icon must not, and CSS can't tell them apart. The submenu arrow is the exception because we know what it means, so that one mirrors now (see Submenus below). If you want, a small opt-in utility would cover the rest:
    ```css
    .ui-mirror:dir(rtl) {
      scale: -1 1;
    }
    ```
    ```html
    <span class="ui-end"><svg class="ui-mirror">…chevron…</svg></span>
    ```
  - 3: Agreed, left as is.
- [x] (5) Callout switches to the icon layout when any nested `svg` exists: `&:has(svg)` should be `&:has(> svg)` (`layout` Nesting)
  - Fixed. The icon styles only target the direct child `svg` too.
- [x] (5) DescriptionList and Table container queries resolve against `body` (a size container in `normalize.css`), not their own column (`layout` DescriptionListContainer, `data-display` DescriptionLists, TableOverflow)
  - Fixed: `.ui-description-list` is its own `inline-size` container. Its items query it, and item spacing moved from the list's `gap` to the items, since a container can't query itself.
  - Fixed: the table's container queries are gone. Tables can't be size containers, and the narrow rules either did nothing (spacious, dense) or made padding bigger (default).
- [?] (5) Fields and selects collapse to a few characters in auto-layout tables (`data-display` TableInlineEditing)
  > what's the proposed solution?
  - Cause: fields are `inline-size: 100%` with `min-inline-size: 0`. In an auto-layout table the column is sized from its content's min-content width, which is about 0 for a field, so the column collapses.
  - Proposal: give fields a minimum inline size through a private custom property that defaults to `0`, and set it in table cells. Fields keep shrinking everywhere else:
    ```css
    :where(.ui-text-field, .ui-textarea, .ui-select) {
      min-inline-size: var(--_min-inline-size, 0);
    }

    .ui-table :where(td, th) > :where(.ui-text-field, .ui-select) {
      --_min-inline-size: 12ch;
    }
    ```
  - For exact widths, `<col>` / `Table.Column width` already works.
- [x] (5) List rows can't shrink below their longest word: `li .ui-text` needs `min-inline-size: 0` (`layout` Columns)
- [x] (5) Long description list terms squeeze values into one word per line, and unbroken values overflow (`data-display` DescriptionLists)
  - Fixed: wide items use `auto auto` columns with `justify-content: space-between`, so a long term and a long value share the space. Items get `overflow-wrap: anywhere`, so unbroken values wrap.
- [x] (5) Rich text `kbd` overrides the `kbd` inside `.ui-button`, and a `.ui-checkbox` first in a classless `li` matches the task list rule (`typography` ComponentsInProse)
  - Fixed: the `kbd` part by the `components.prose` layer. The task list rule only matches a classless `label`, so a `.ui-checkbox` keeps its bullet and its own styles.
- [x] (5) `span.ui-mark` has no background, and `.ui-del`/`.ui-ins` don't get the critical/success palette (`typography` HeadingClasses)
  - Fixed: `.ui-mark` uses `Mark`/`MarkText` like `<mark>`. `.ui-del` and `.ui-ins` join `del`/`ins` in the palette and severity scopes (`palette.css`, `theme.css`). Their text uses `--color-11` in light mode and `--color-6` in dark mode, so `del`, `ins` and both classes pass contrast (the old `--color-9` failed). With the `components.prose` layer this also removed three color-contrast entries for the typography stress page from the a11y ledger.
- [x] (6) A menu in a dialog blends into it in dark mode (`overlays` DialogNesting)
  > give it the same border treatment as the carousel prev/next buttons, ie a light gray border. that way it's consistent with the theme.
  - Fixed: menus use a subtle light gray border in dark mode (`--gray-6` at 40% opacity), in dialogs and everywhere else.
- [x] (6) Avatars shrink in flex rows (no `flex-shrink: 0`), and avatar group overflow counts like "+128" don't fit (`data-display` TableCellContent, InlineAlignment)
  > fix the avatar shrikage. don't worry about "+128", but if you have a scalable and elegant solution for it let me know.
  - Fixed: avatars have `flex-shrink: 0`.
  - "+128": the scalable fix is in the content, not CSS: cap overflow counts at "99+", like most avatar groups and notification badges do. If CSS has to handle any length, size the text with container units: `.ui-avatar { container-type: inline-size }` and `font-size: clamp(0.5rem, 100cqi / 3, 1rem)` on the text inside. That fits about 4 characters at any avatar size, but every initials avatar gets the same smaller text.
- [?] (6) Callout `.ui-content` grid gap doubles rich text margins, and a classless `h3` in a callout is full size (`typography` ProseInComponents)
  > is the solution to set gap: 0 on .ui-content.ui-rich-text? what's the plan?
  - The `h3` is fixed: rich text is in a lower layer now, so the callout's title size wins.
  - Gap: close. `gap: 0` alone isn't enough, because margins don't collapse between grid items, so two paragraphs still get both margins. Make the content a block where rich text applies, so the flow margins collapse like everywhere else in prose. Only where rich text applies, otherwise a callout with plain children loses its spacing. A callout can be rich text itself (`.ui-content.ui-rich-text`) or sit inside a rich text article, so use the same scope as rich text instead of a class check:
    ```css
    @layer components.root {
      @scope (.ui-rich-text) to (.ui-not-rich-text) {
        .ui-callout > .ui-content {
          display: block;
        }
      }
    }
    ```
    The first and last child margins are already trimmed inside `.ui-content`.
- [x] (6) Chip labels wrap and overflow the fixed chip height without `.ui-multiline` (`data-display` TableCellContent)
  > ellipsis ... should solve it
  - Fixed: chips are `max-inline-size: 100%`, and `.ui-text` truncates with an ellipsis unless the chip is `.ui-multiline`.
- [x] (6) Disabled button text color only applies to the text variant: the disabled block is wrapped in `:where()`, so `.ui-filled`/`.ui-tonal`/`.ui-outlined` override its `--_text-color` (only `opacity` dims them). Fix or confirm it's intended
  - Fixed: the disabled block comes after the variants and uses `:is()`, so text and outlined buttons get `--text-disabled` in every color. Filled and tonal keep their own text color and only dim with `--disabled-opacity`, since gray text on a colored fill was unreadable.
- [?] (6) Light mode: `--border-color` and `--surface-filled` are the same gray, so table header borders and filled bordered list dividers vanish (`data-display` TableStructure, ListSurfaces)
  > what is the most scalable and elegant solution for this?
  - The root cause is the same as the dark mode item: one global border color can't contrast with every surface. Borders need to be relative to the surface they sit on. Two ways to do that:
    1. Surface scopes (what dark mode uses now). Each surface re-maps the border tokens for everything inside it, in `theme.css`. Explicit and easy to theme, but every new surface needs an entry:
       ```css
       /* 15. Raised surfaces */
       :where(.ui-card.ui-elevated, .ui-card.ui-tonal) {
         --border-color: light-dark(var(--gray-4), var(--gray-13));
         --field-border-color: var(--border-color);
       }

       /* 16. Filled surfaces */
       :where(
         .ui-list:not(.ui-default, .ui-tonal, .ui-transparent),
         .ui-table th
       ) {
         --border-color: light-dark(var(--gray-6), var(--gray-13));
       }
       ```
    2. A surface context variable. Every surface sets `--surface`, and borders are derived from it with relative color, so they contrast with any surface, including custom ones:
       ```css
       .ui-card.ui-tonal {
         --surface: var(--surface-tonal);
       }

       .ui-table th {
         border-color: light-dark(
           oklch(
             from var(--surface, var(--surface-default)) calc(l - 0.08) c h
           ),
           oklch(from var(--surface, var(--surface-default)) calc(l + 0.08) c h)
         );
       }
       ```
       The catch: the derivation has to live where the border is drawn, in every component, and themes lose the single `--border-color` knob.
  - Recommendation: option 1. It matches how theme.css already works (severity scopes, raised surfaces) and keeps one place to theme borders. Filled is a one-block addition.
- [x] (6) `pre` inside `dir="rtl"` runs code right to left (`typography` Bidi)
  > in this example I can see code inside RTL run left to right. if that's wrong then fix it.
  - It was wrong. Each line runs left to right, but punctuation at the ends gets moved by the bidi algorithm: `const x = add(1, 2);` showed as `;const x = add(1, 2)`, `x++` as `++x` and `// comment.` as `.comment //`, and lines were right-aligned. Fixed: rich text `pre` and inline `code` are `direction: ltr` with `unicode-bidi: isolate`, unless they have their own `dir`.
- [x] (6) Rich text `p` overrides `.ui-p.ui-large`, `.ui-p.ui-small` and `.ui-caption` inside `.ui-rich-text` (`typography` HeadingClasses)
  - Fixed by the `components.prose` layer.
- [?] (6) Second-level submenus don't keep the flipped direction, and the submenu arrow doesn't mirror in RTL (`overlays` Submenus, Rtl)
  - Fixed: the end icon of an item that holds a submenu (`li:has(> .ui-menu)`) mirrors in RTL.
  - Blocked: keeping the flipped direction needs anchored container queries (Chromium 143+). It worked in Chromium with experimental features on, but lightningcss, Vite's CSS minifier, can't parse `@container anchored(…)` and fails the whole build, so the docs build and any Vite user would break. Removed until lightningcss supports it. The CSS for later:
    ```css
    .ui-menu[popover] {
      container-type: anchored;
    }

    .ui-menu.ui-inline-end {
      --_side: var(--_submenu-inline-end, inline-end);
    }

    .ui-menu.ui-inline-start {
      --_side: var(--_submenu-inline-start, inline-start);
    }

    @container anchored(fallback: flip-inline) or anchored(fallback: flip-block flip-inline) {
      .ui-menu .ui-menu {
        --_submenu-inline-end: inline-start;
        --_submenu-inline-start: inline-end;
      }
    }
    ```
    Submenus of a flipped menu open on the same side, and deeper levels inherit it.
- [x] (7) A tooltip at the inline-end edge squeezes into a narrow column instead of flipping (no minimum width) (`overlays` EdgeTriggers)
  - Fixed: tooltips have `min-inline-size: calc-size(max-content, min(size, 10rem))` and shift along the edge instead (`@position-try --ui-tooltip-shift-start`/`-end`, also flipped to the other side). Tooltips with `--anchor-position-area: inline-start`/`inline-end` try `flip-inline` first.
  - Tooltips with an arrow only flip, like before, so the arrow never ends up off-center. Moving the arrow with the shift needs anchored container queries, which break the build for now (see Submenus).
  - Chromium only tries the first five fallbacks, so the list is kept at five.
- [x] (7) Components ship `types.solid.ts` importing `solid-js`, but `solid-js` isn't an optional peer dependency like `svelte`, `vue` and `astro`
  - Fixed.
- [?] (7) Drawer header can't hold two icon buttons: every icon-only button gets `margin-inline-start: auto` (`overlays` DrawerNesting)
  > what's the suggested solution? it should be scalable and easy to use.
  - Push from the heading instead of the buttons: the heading takes the free space and every action after it lines up at the end, however many there are.
    ```css
    .ui-drawer .ui-header {
      gap: var(--size-1);

      :where(h1, h2, h3, h4, h5, h6) {
        flex: 1;
      }
    }
    ```
    ```html
    <div class="ui-header">
      <h2>Settings</h2>
      <button class="ui-button"><svg>…pin…</svg></button>
      <button class="ui-button" commandfor="drawer" command="close">
        <svg>…close…</svg>
      </button>
    </div>
    ```
  - Nothing to learn: the markup is the same as today. A header without a heading can use any element with `flex: 1`, or a single `margin-inline-start: auto` on the first action.
- [x] (7) Rich text headings, `pre` and `small` don't follow the inherited font size (`typography` InheritedSizes)
  - Fixed: headings scale by `1em / 1rem` (typed arithmetic, behind `@supports`), so they're unchanged at 16px and scale with the text around them. `pre` is `0.875em`, `small` is `max(0.75em, var(--font-size-0))`.
- [] (7) Toasts have no maximum width, and a toast with an icon centers its text (`overlays` ToastLayering)
  > skip toasts for now.
- [x] (8) `.ui-dense` tables are as tall as default ones (only inline padding changes) (`data-display` TableInlineEditing)
  - Fixed: dense cells use half the block padding and a tighter line height.
- [x] (8) `ol[start]` with 4-digit markers overflows: the wider gutter only applies at 100+ items (`typography` DeepLists)
  - Fixed: the `ch` gutter is sized by digit count, the larger of the item count (100+, 1000+) and `start` (read with `attr(start type(<number>))` where supported, 4 digits otherwise).
- [?] (8) Carousel slides aren't equal height when they contain cards (`layout` CarouselOfCards)
  > what's best to do here? The library has no opinion on what to put in the carousel. should we have a stretch modifier? What's most elegant and scalable here?
  - The items (`li`) already stretch to the tallest one, because they're grid items. The card inside an item just doesn't fill it.
  - Recommendation: no modifier. Make every item a grid container: `.ui-carousel > * { display: grid }`. A single child then stretches to the item's height by default (cards, links, anything), and images and videos with an aspect ratio don't stretch, since grid only stretches them when asked to explicitly. It's still unopinionated about content. A modifier would be one more thing to learn for what should be the default.
- [?] (8) Label-less checkboxes, switches and progress bars sit off-center in table cells (`vertical-align: baseline`) (`data-display` TableCellContent)
  > what's the fix? it has to be scalable and elegant.
  - Without a label there's no text, so the control's baseline is its bottom edge. It sits on the text baseline and the line box adds the strut's descent below it, so it looks raised in any line of text, not only in tables.
  - Fix: align them to the middle when there's no label. It's per component, so it works in tables, lists and paragraphs alike:
    ```css
    :where(.ui-checkbox, .ui-radio, .ui-switch):not(:has(.ui-label)),
    :where(.ui-progress) {
      vertical-align: middle;
    }
    ```
- [x] (8) Stretched callouts spread title and text apart (needs `align-content: start`), and the `::before` shows lighter corners inside the border (`layout` UnevenGrid, Nesting)
  - Fixed: the icon layout has `align-content: start`. The `::before` radius is the inner radius (`border-radius - border-width`), so it covers the corners.
- [x] (9) Dense list padding doesn't line up with card padding, and `.ui-inset` text offset assumes default gaps (`data-display` ListSurfaces)
  - Fixed: dense rows keep the card's inline padding (`--size-3`). Item gap and leading size are `--_item-gap` and `--_start-size`, which dense sets, and `.ui-inset` uses both.
- [?] (9) Dividers inside cards have very large margins (`--size-fluid-3`) (`layout` SidebarLayout)
  > what is the proposed fix. it should be elegant and scalable.
  - A public token with containers opting into a tighter value. It inherits, so it reaches dividers at any depth:
    ```css
    .ui-divider {
      margin-block: var(--divider-space, var(--size-fluid-3));
    }

    :where(.ui-card, .ui-dialog, .ui-drawer, .ui-callout) {
      --divider-space: var(--size-3);
    }
    ```
    Users can set `--divider-space` on any wrapper. Dividers that are direct children of a flex or grid container with `gap` (like a card) could get `margin-block: 0`, since the gap already spaces them.
- [x] (9) Narrow-container table padding grows instead of shrinking (`data-display` TableOverflow)
  - Fixed: removed with the table container queries (see above).

## Docs

- [x] (3) Changelog: `divided` removed from `List`, use `bordered` (#395). Removed after 5.5.0 and missing from Unreleased
- [x] (6) Hand-written API tables left: Spinner, Text input, Toast, Typography
  > They're probably unique and that's why but if they can be not hand written then make it so (if the solution is elegant and scalable).
  - Done for Spinner, Text input and Typography: they're `api.ts` files now. `source` is optional for CSS-only components, which show the HTML tables in every framework plus a note (for example "no Astro component"). Their CSS variables tables come from `css`.
  - Toast stays hand-written, since toasts are on hold. It fits the same model later: `[data-severity]` and `[data-duration]` as attribute options.

## Limitations

- [?] (4) Menu: arrow key navigation (needs JS or `focusgroup` when it ships)
  > what do you mean? explain.
  - Today a menu is a list of buttons, and each item is its own Tab stop. That's valid, and it's why we don't use `role="menu"`.
  - The ARIA menu pattern works differently: the whole menu is one Tab stop, arrow keys move between items, Home/End jump to the first and last, typing a letter jumps to a matching item, and Tab leaves the menu. Desktop apps behave like that and screen reader users expect it from `role="menu"`.
  - That "roving focus" needs JavaScript today (track the active item, move focus on keydown, toggle `tabindex`). [focusgroup](https://open-ui.org/components/scoped-focusgroup.explainer/) is a proposed HTML attribute that gives arrow key navigation without JS, e.g. `<menu focusgroup="menu">`. It's behind a flag in Chromium. When it ships we can add it to `Menu` and keep it HTML and CSS only.
- [x] (8) Carousel: vertical orientation
  - Added `.ui-vertical` / `orientation="vertical"`. It scrolls and snaps on the block axis, needs a height (`--_block-size`, default `24rem`), and supports buttons (`::scroll-button(block-start/end)`, rotated icons, also outside), markers and peek. Markers sit in a column at the inline end of the items, centered (anchored to the carousel, so they follow RTL). Docs section and example added.
  - Scroll and snap are checked in Chromium 141. The button positions aren't: Carousel buttons need Chromium 144+. Check them in the docs.
- [] (9) Toast has no loading state. The loading example only exists on the unmerged `claude/toast-simplify` branch, and isn't a real component there
  > skip toast fixes for now.

## Questions

- [x] (8) Section comments I added in `carousel.css` and `menu.css` (e.g. `/* Buttons */`): keep or remove per the no-new-comments rule?
  > keep. the comments I don't want are explainers. Headings like /* Buttons */ that make it easier to read the code are ok.

## Suggestions

- [?] (6) `contrast-color()` for `--primary-contrast` so custom primaries get readable text
  > contrast-color() has its limitations - it can only be black or white. it's better to use relative color syntax imo.
  - Agreed. With relative color the text can keep the primary's hue and stay off pure black and white. Lightness flips at a threshold:
    ```css
    --primary-contrast: oklch(
      from var(--primary) clamp(0.15, (0.62 - l) * 1000, 0.98) calc(c * 0.15) h
    );
    ```
    `(0.62 - l) * 1000` is a big positive number for dark primaries (clamped to 0.98, near white) and a big negative one for light primaries (clamped to 0.15, near black). The chroma keeps a hint of the hue.
  - Caveat: the default primary (`--color-8`, L 58%) gets near-white text at about 4:1, so the existing 3.97:1 issue (Tabs, filled Buttons) stays until the threshold or the primary moves. Want me to implement it and tune the threshold against AA?
- [?] (7) Register theme knobs with `@property` (`--motion`, `--border-radius`, focus ring tokens). `--focus-ring-color` is unset by default on purpose, so it can't get an initial value
  > i don't understand, explain further.
  - `@property` gives a custom property a type, an initial value and inheritance:
    ```css
    @property --motion {
      syntax: "<number>";
      inherits: true;
      initial-value: 1;
    }
    ```
  - What it gets us:
    - Bad values fall back to the initial value instead of breaking everything that uses them. Today `--motion: fast` makes every `calc(0.2s * var(--motion))` invalid, so transitions disappear. Registered, it falls back to `1`.
    - Typed values can be transitioned, e.g. animating `--border-radius`.
    - Defaults live with the property, so a component file imported on its own still has a working `--motion` without `normalize.css`.
  - Why not `--focus-ring-color`: its default comes from `var(--focus-ring-color, var(--_focus-visible-color))`. The fallback only kicks in while the property is unset. A registered property always has a value (its initial value), so the fallback would never run and the inverted page color behavior would be lost.
  - Low impact, mainly safety. Fine to leave until there's a concrete need.
- [?] (8) Opt-in `:user-valid` success styling for forms
  > explain further how this would work.
  - Fields already turn red with `:user-invalid` (only after the user has interacted, unlike `:invalid`). `:user-valid` is its counterpart. An opt-in class on a field or a whole form would show a success state once a value is valid:
    ```css
    :where(.ui-validate)
      :where(.ui-text-field, .ui-textarea, .ui-select):has(:user-valid),
    :where(.ui-text-field, .ui-textarea, .ui-select).ui-validate:has(
        :user-valid
      ) {
      --_accent-color: var(--success);
      --_border-color: var(--success);
      --_label-color: var(--success);
    }
    ```
    ```html
    <form class="ui-validate">
      <label class="ui-text-field">
        <span class="ui-label">Email</span>
        <span class="ui-field"><input type="email" required /></span>
      </label>
    </form>
    ```
  - Opt-in because green on every valid field is noisy for simple forms. It's most useful for fields with rules, like passwords and usernames.
- [?] (8) Scroll-state container queries: sticky Table header shadow, scroll shadows in Dialog/Drawer
  > provide examples here in the todo page how that would work.
  - Scroll-state queries let descendants (and the scroller's own pseudo-elements) react to the scroller's state: `scrollable: top` means there is content scrolled out above.
  - Dialog/Drawer: a shadow under the header that only shows once the content has scrolled. Checked in Chromium:
    ```css
    .ui-dialog > .ui-content {
      container-type: scroll-state;

      &::before {
        block-size: 0;
        content: "";
        display: block;
        inset-block-start: 0;
        margin-inline: calc(-1 * var(--size-3));
        position: sticky;
        transition: box-shadow 0.2s;
      }
    }

    @container scroll-state(scrollable: top) {
      .ui-dialog > .ui-content::before {
        box-shadow: 0 0 12px 6px rgb(0 0 0 / 0.35);
      }
    }
    ```
    The same with `::after`, `inset-block-end: 0` and `scrollable: bottom` gives a shadow above the actions while there's more to read.
  - Sticky table header (for the second pass): the table's scroll wrapper is the container, and the header gets a shadow once it's stuck:
    ```css
    .table-scroll {
      container-type: scroll-state;
    }

    .ui-table thead {
      container-type: scroll-state;
      inset-block-start: 0;
      position: sticky;
    }

    @container scroll-state(stuck: top) {
      .ui-table thead th {
        box-shadow:
          0 1px 0 var(--border-color),
          var(--shadow-2);
      }
    }
    ```
- [?] (9) `text-box: trim-both cap alphabetic` on Button/Chip/Badge only works if the label is wrapped in its own element (flex/grid containers ignore it)
  > is that a problem? explain more and show examples here in the todo page.
  - `text-box` trims the space above the cap height and below the baseline of a block's first and last line, so text is centered on its letters instead of its line box. It looks optically centered no matter the font's ascender and descender metrics.
  - Why a wrapper is needed: `text-box-trim` isn't inherited and applies to block containers. In `<button class="ui-button">Save</button>` the text sits in an anonymous flex item that we can't select, so this does nothing:
    ```css
    .ui-button {
      text-box: trim-both cap alphabetic; /* no effect: the label is anonymous */
    }
    ```
    It only works on a wrapper:
    ```html
    <button class="ui-button"><span>Save</span></button>
    ```
    ```css
    .ui-button > span {
      text-box: trim-both cap alphabetic;
    }
    ```
  - Not a real problem today. Buttons, chips and badges are centered with `align-items: center` and a fixed height, so the difference is a pixel or so with most fonts. It would matter with fonts that have unusual metrics, or if we wanted padding-based sizing without a fixed height.
  - Requiring a wrapper would break bare-text buttons, and applying it only when a wrapper exists makes wrapped and unwrapped buttons look slightly different. Recommendation: leave it. Revisit if `text-box` starts applying to anonymous flex items, or if Button gets a required label part.

## To check

- [] (3) Test Menu and Carousel in Firefox and Safari (only checked in Chromium)
- [] (3) Test Combobox in Firefox and Safari (only checked in Chromium)
- [x] (4) Check button changes in the browser: new padding scale, icon side padding with wrapped labels, icon sizing, icon-only, button groups
  > - keyboard on hover is buggy (the kbd disappears on outlined and tonal buttons; the kbd on outlined and tonal buttons don't inherit the button text color)
  - Fixed: the `kbd` color was `oklch(from currentColor …)`. Chromium resolved it once and didn't update it while the button's color transitioned on hover, so it kept the old color. It now inherits `color` and dims with `opacity: 0.8`, and the background is `color-mix()` with `currentColor`.
- [] (5) Review `feat/pixel-style` (Pixel style switcher in theme drawer): check every component in light/dark, no flash on reload, Default unchanged vs main, logo font now uses `--font-heading`. Rebase may conflict in button-group.css and CHANGELOG.md
- [] (5) Test anatomy heroes in Firefox, Safari and with Windows fonts
- [] (7) Button `kbd` looks weird on Mac
- [?] (8) Auto-suggest arrow: vertically centered in Chromium, but sits closer to the edge at `x-small`/`small` than at default/`large`. Check Firefox and Safari too
  > honestly auto-suggest should look more like select and the arrow should be any svg you choose. is that possible? if you think so explain how it would work and if it would nicely slot into how other field components, ex select and text field work
  - Yes, and most of it is in place. `text-input.css` already hides the browser's datalist indicator (Chromium only, Firefox has none and Safari draws its own) and draws a CSS triangle with `.ui-field::after`, like Select's `::picker-icon`. The arrow sits closer to the edge at `x-small`/`small` on purpose: the inset drops from `--size-3` to `--size-2` with the field padding.
  - Plan: an `svg` in the suffix slot that text fields already have replaces the triangle. The field grid already has a suffix column (prefix, input, suffix), so the arrow lines up and scales like any other suffix:
    ```html
    <label class="ui-text-field">
      <span class="ui-label">Users</span>
      <span class="ui-field">
        <input type="text" list="users" />
        <span class="ui-suffix" aria-hidden="true"><svg>…any arrow…</svg></span>
      </span>
      <datalist id="users">…</datalist>
    </label>
    ```
    ```css
    :where(.ui-text-field:has(input[list])) .ui-field:has(> .ui-suffix) {
      &::after {
        content: none;
      }

      input[list] {
        padding-inline-end: var(--_field-padding-inline);
      }
    }
    ```
  - It fits how Select and TextField work: the default arrow stays CSS-only, and a custom one uses the same slot as any icon. Astro and Vue get an `arrow` slot that renders into `.ui-suffix`. Select could take the same slot later, hiding `::picker-icon` when it's filled.
  - Trade-off: the arrow is decorative (`pointer-events: none`), like today. Typing or pressing the down arrow key opens the list. A clickable arrow would need `input.showPicker()`, which is JavaScript.
