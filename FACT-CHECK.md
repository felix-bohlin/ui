# Docs fact-check

A pass through every docs page for factual faults: statements a reader would take as true that are false, and code samples that do not do what the page says. Nothing was fixed. This file only maps the issues.

- Date: 2026-10-28
- Tree reviewed: `feat/new-components-and-fixes` at `c0d4970`
- Double-checked against: `feat/new-components-and-fixes` at `245eaa1` (30 commits later)
- Branch with this report: `docs/fact-check-pass`

## How it was done

The docs site was built to Markdown per framework, and 16 read-only reviewers each took a slice: component pages (C1 to C8), guide pages (G1 and G2), getting started and entry pages (G3), the Migrating guide (M1 and M2) and Learn posts (L1 to L3; the Learn section has since become Blog). The coordinator reviewed the text shared by every page (Installation, Component properties, Browser support) itself.

Each finding quotes the claim and the source that contradicts it. Sources were the package CSS, JS and component code in all four frameworks, MDN browser-compat-data 8.1.7 and web-features 3.44.0 for platform claims, the published `opui-css` 5.4.3 and 6.0.0-rc.1 packages for claims about earlier versions, and Chromium 153 for behavior that reading could not settle.

Severity follows `.claude/skills/audit/findings-format.md` (1 to 10, most findings are 1 to 3). "verified" means the reviewer saw both sides. "probable" means the claim rests on reasoning the reviewer could not test. "re-checked by the coordinator" means the coordinator re-derived it from source, data or a browser probe. 24 findings were re-checked in the first pass, including every one rated 4 or above at the time, and none turned out to be wrong.

A double check then re-derived every finding against `245eaa1`, the base branch 30 commits later. Twelve fresh reviewers each took a batch and tried to refute it: is the claim still on the page, is "Actually" true, would the correction introduce a new error, and is the severity right. Each entry now carries a **Double check** line with the verdict and a **Now at** line with the current file and line, since many lines moved. Where a finding was only partly right, its fields were corrected in place and the Double check line says what changed. Findings the double check turned up are listed with D- ids. Line numbers in **Where** and **Evidence** are those of `c0d4970`, and evidence that quotes the default palette hue 145 predates 6d0333f, which moved it to 222.8; no conclusion depends on it. One more commit reached the base branch while the double check ran (3909c8d, Color Field only); it changes no line this report cites.

Items are sorted ascending. Sections follow the order below, pages go A to Z and entries within a page by severity, lowest first. Cross-cutting issues are sorted by severity, and the Migrating guide by the line of `MIGRATING.md`.

## Summary

| Double check verdict             | Findings |
| -------------------------------- | -------- |
| Holds                            | 146      |
| Partly right, corrected in place | 34       |
| Fixed since the pass             | 0        |
| Wrong, dropped                   | 0        |
| Found during the double check    | 6        |

No finding turned out wrong, and none was fixed on the current tree. The partly right ones mostly had a correction that would have added a new error, or evidence that changes since `c0d4970` made stale. Severity changed for C1-06 (1 to 2), C3-03 (2 to 3), G2-03 (2 to 1), G3-01 (5 to 7), L3-07 (3 to 5), M2-07 (2 to 1).

180 findings were reported and 6 more turned up in the double check. Findings that describe one underlying issue are merged, which leaves 156 entries.

| Severity | Entries |
| -------- | ------- |
| 1        | 33      |
| 2        | 72      |
| 3        | 42      |
| 4        | 6       |
| 5        | 1       |
| 6        | 1       |
| 7        | 1       |

| Section                         | Entries |
| ------------------------------- | ------- |
| Cross-cutting issues            | 10      |
| Theme token descriptions        | 12      |
| Component pages                 | 54      |
| Guide pages                     | 23      |
| Getting started and entry pages | 10      |
| Migrating guide                 | 27      |
| Blog posts                      | 20      |

### Worth reading first (severity 4 and above)

- **C1-01** (severity 4): Under the hood feature rows (Form, Text field, Textarea): Safari shown as not supporting `<fieldset>`, `<label>` and `<textarea>`, because the chip code cannot read web-features' "≤4".
- **C8-18** (severity 4): Browser support chips (Divider, Rating, Typography): full support reported for a browser when web-features lists none, because missing compat keys are skipped.
- **C5-01** (severity 4): Theme token descriptions and several pages: the selected-row tint is described with `--ui-state-active-alpha-accent` (the pressed-button alpha); it actually reads `--ui-state-selected-alpha-accent`.
- **C7-04** (severity 4): Button group > Under the hood: says dividers are fine in right-to-left, but filled and tonal groups lose their dividers in RTL.
- **C7-08** (severity 4): Chip > Icon: tells readers how to wrap text passed in the default slot or `children`; Chip has neither.
- **G1-09** (severity 6): Accessibility guide: tells Astro, React, Svelte and Vue users to name an icon-only Button with a `label` prop. Button has no such prop; it needs `aria-label` or `aria-labelledby`, so the button ends up unnamed.
- **G3-01** (severity 7): Getting started (all five frameworks): `npm install opui-css` installs 5.4.3, whose exports map cannot resolve the `.css` import paths or `opui-css/react` and `opui-css/svelte` shown on the page. Only the HTML page and Concepts carry an unreleased-version note.
- **M1-14** (severity 4): Migrating guide > Range: tells readers to set `--_track-bg-color` for the old look; it is an output the input re-declares, and the input to set is `--_track-base-bg-color`.
- **L3-07** (severity 5): opui 6.0 release post: says no promised contrast pair falls below its promise at any hue. Since the palette change in 6d0333f, `--ui-primary-text` on `--ui-surface-filled` drops to 4.24:1 at hue 190 in light mode (below 4.5:1 from about hue 160 to 210). A library regression that the e2e test misses because it checks only the default hue.

### Patterns

Most entries trace back to a few causes. They are also where to look for instances this pass did not list.

- Descriptions that no longer match the stylesheet. Token descriptions, component property notes, What's new notes and Under the hood notes name a token or element the stylesheet no longer uses for that: the selected tint (C5-01), the Drawer title (C7-16), table stripes (G2-14), Firefox underline offsets (C8-12), `--ui-line-height` (C8-11), Avatar and List sizes (M1-03, C5-02), Badge text tokens (C7-11), Typography margins (C8-10) and Accordion overflow (C6-02).
- Migration notes about things 5.4.3 never had. The notes say something was removed or changed, but the last release did not have it: `.ui-divided` (M1-11), `headingLevel` (M1-05), the `--_track-fill` script (M1-13), `DrawerHeadingIdKey` (M1-09), the Drawer title token (M1-10), Toast types (M2-05), Open Props shadow tokens (M2-12), classes on `del` and `ins` (M2-13), the FieldGroup Astro note (C3-05) and the React and Svelte `tabId` note (C6-04).
- Astro wording or syntax shown for other frameworks. Vue examples use the Astro `slot=` attribute (M1-02), the React page uses `class=` (C7-09), the guide names a `label` prop that no framework has (G1-09), the Chip page describes a default slot and `children` that Chip lacks (C7-08), and "exports are unchanged" is written for frameworks whose exports did change (M1-08, M2-04).
- Statements that hold in Chromium but not elsewhere. Safari's arrow keys in right-to-left radio groups (C6-05, already open in `TODO.md`), focusable scroll containers (C5-08), `display` transitions in Firefox (L2-01), the Carousel fallback (C6-06), the browser versions for `overflow-inline` (C3-03), polyfill coverage (G2-19) and what clips the compat tooltip (C4-08).
- Generated browser-support chips. Four problems in `src/utils/browser-support.ts` and the lists it reads: a leading "≤" in a version makes a browser read as unsupported (C1-01), a feature that a browser only partly supports reads as fully supported (C8-18), versions compare by major number only (C3-02) and `overflow-block` and `overflow-inline` are not listed (C3-03).
- Snippets and sentences that ignore the scope classes. Derived roles pinned on `html` alone (G2-06), roles said to work on any element (G2-12), the palette said to be computed on elements it is not (G2-02), and the text color said to follow a pinned `--ui-primary` anywhere (M2-08).
- Lists that went stale as the library grew. Readers and members added after the lists were written are missing from them: the components without a build-up (L3-04), the readers of `--ui-font-size-large` and `--ui-line-height` (C7-16, C8-11), the Layout gap classes (C8-08, D-01), the state layer alphas (D-03) and the Rating chip (C8-18). The palette change after `c0d4970` also broke a contrast promise the release post makes (L3-07).
- Counts and lists that disagree with the page or the repo. Four or five frameworks (L3-05), "every component" has a build-up (L3-04), 25 or 26 contrast knobs (L3-06), three or six token tiers (L3-08), blocks called fully functional (G3-05) and theme builder hints naming components that do not read the token (G3-07, G3-08, G3-09).

## Cross-cutting issues

Issues in text, code or data that more than one page renders. Fixing the source clears every page listed.

### C1-03: :user-invalid is described as waiting for an edit

- **Severity:** 2 (verified)
- **Same issue reported as:** L3-02
- **Double check:** holds on `245eaa1`. "Interacted with" in the correction is loose: focus and blur alone don't trigger `:user-invalid`. Better: "...after the user has changed them or tried to submit the form", and in TextFieldBuild "waits until the user has changed the field or tried to submit, not on page load".
- **Now at:** `src/docs/components/partials/ValidationNotes.astro:48-55`, `text-field.astro:306`, `textarea.astro:262`, `select.astro:314`, `checkbox.astro:232`, `switch.astro:251`, `range.astro:262`, `src/components/UnderTheHood/TextFieldBuild.astro:141`
- **Where:** `src/docs/components/partials/ValidationNotes.astro:48-55`, used by `src/docs/components/text-field.astro:306`, `textarea.astro:262`, `select.astro:314`, `checkbox.astro:232`, `switch.astro:251`, `range.astro:262` (rendered at #validation; frameworks: all). Same wording in `src/components/UnderTheHood/TextFieldBuild.astro:141`.
- **Says:** "Fields also get the invalid styles from the browser's own validation (`:user-invalid`), after the user has edited them." and "`:user-invalid` waits until the user has edited the field, not on page load"
- **Actually:** `:user-invalid` also matches a field the user never edited once a form submit is attempted and blocked. The linked Learn post says "after the user interacts".
- **Evidence:** Chromium probe: a required empty input in a form, `:user-invalid` is false on load; clicking the submit button without touching the field makes `input.matches(":user-invalid")` true and the field border `oklch(0.53 0.2 25)`; `src/docs/learn/text-field-user-invalid.astro:29-30`. L3-02 reports the same wording in the Learn post.
- **Correction:** "...after the user has interacted with them or tried to submit the form."
- **Also L3-02 (severity 2):**
  - Double check: holds on `245eaa1`.
  - Now at: `src/utils/blog-posts.ts:306`, `src/docs/blog/text-field-user-invalid.astro:29-30`
  - Where: `src/utils/learn-posts.ts:306` (rendered at /learn/text-field-user-invalid/#then-and-now; frameworks: all)
  - Actually: `:user-invalid` also matches after a failed submit attempt on a field the user never changed. The post's own first bullet says so ("only matches after the user has changed the field and left it, or tried to submit the form", `src/docs/learn/text-field-user-invalid.astro:29-30`) and the "Try it" demo is built around Submit.
  - Correction: say "`:user-invalid` only matches after the user has changed the field and left it, or tried to submit."

### G2-06: Snippets pin derived roles on html only

- **Severity:** 2 (verified)
- **Same issue reported as:** G1-10, M2-06
- **Double check:** holds on `245eaa1`.
- **Now at:** `src/docs/guide/theming.astro:303-305`, `src/docs/guide/theming.astro:332-341`, `src/docs/guide/theming.astro:387-390`
- **Where:** `src/docs/guide/theming.astro:301-318` (`--ui-font-size-caption` and `--ui-font-size-h1` pinned on `:where(html)`) and `:385-391` (`--ui-shadow-elevated: none` on `:where(html)`); the page says "Snippets on this page belong in `@layer theme.custom`"
- **Says:** the samples pin the roles `--ui-font-size-caption` ("Pin one role"), `--ui-font-size-h1` ("Or pin a heading") and `--ui-shadow-elevated` on `:where(html)` alone.
- **Actually:** these are derived roles that `theme.css` declares again on `html`, `.ui-palette` and `.ui-contrast-more`. Pinned on `html` only, the pin is lost inside every `.ui-palette` and `.ui-contrast-more` scope, which the same page presents as the way to re-theme parts of a page. The Customizing page says a pinned role goes on `:where(html, .ui-palette, .ui-contrast-more)`, and the Theme builder exports it that way; the page's own `--ui-border-color` sample in Contrast does too.
- **Evidence:** Chromium 153 on /html/guide/theming/ after `@layer theme.custom { :where(html) { --ui-font-size-caption: 0.8125rem; --ui-font-size-h1: var(--ui-font-size-800); --ui-shadow-elevated: none } }`: `.ui-caption` is 13px on the page and 12px inside `.ui-palette`; `.ui-h1` 40px vs 56px; `box-shadow: var(--ui-shadow-elevated)` is `none` on the page and a five-layer shadow inside `.ui-palette` and `.ui-contrast-more`. `packages/opui/css/theme.css:202` (selector `:where(html, .ui-palette, .ui-contrast-more)`); `src/utils/theme.ts:140-152` (builder output); `src/docs/guide/customizing.astro:47-51` ("A role you pin, such as `--ui-surface` or `--ui-primary`, goes on `:where(html, .ui-palette, .ui-contrast-more)` so the scope classes keep it").
- **Correction:** put the pinned roles in these samples on `:where(html, .ui-palette, .ui-contrast-more)`, or say they only hold outside the scope classes.
- **Also G1-10 (severity 2):**
  - Double check: holds on `245eaa1`.
  - Now at: `src/docs/guide/accessibility.astro:142-147`
  - Where: `src/docs/guide/accessibility.astro:141-149` (also rendered at /html/guide/accessibility/#focus; frameworks: all)
  - Actually: only the color is a derived role. `.ui-palette` and `.ui-contrast-more` re-declare `--ui-focus-ring-color` from their own surface, so the `:where(html)` rule leaves the black/white default ring inside those scopes. The Customizing page tells readers to pin a role on `:where(html, .ui-palette, .ui-contrast-more)` for exactly this reason, and the Theme builder export does. The offset, style and width are plain values and inherit.
  - Correction: put the `--ui-focus-ring-color` line on `:where(html, .ui-palette, .ui-contrast-more)`, or add that scope classes keep their own ring color.
- **Also M2-06 (severity 2):**
  - Double check: holds on `245eaa1`.
  - Now at: `packages/opui/MIGRATING.md:1121-1129`, `packages/opui/MIGRATING.md:1131`
  - Where: `packages/opui/MIGRATING.md:1121-1129` against `:1131` (also rendered at /html/guide/migrating/#theme-and-tokens; frameworks: all)
  - Actually: `--ui-focus-ring-color` is a derived token, computed again on `html`, `.ui-palette` and `.ui-contrast-more`. Set on `:where(html)` only, the old value holds in the page, but every `.ui-palette` and `.ui-contrast-more` scope falls back to the black/white formula. The page's own rule in the next paragraph is "Set pinned roles on `:where(html, .ui-palette, .ui-contrast-more)` so the scopes keep them".
  - Correction: use `:where(html, .ui-palette, .ui-contrast-more)` as the selector in the snippet.

### C3-02: Chips compare major versions only

- **Severity:** 3 (verified)
- **Double check:** holds on `245eaa1`.
- **Now at:** `src/utils/browser-support.ts:83-86`, `src/utils/browser-support.ts:88-93`, `src/components/BrowserSupportChips.astro:98`, `toggle.astro:31-37`, `divider.astro:16`, `toast.astro:23-31`
- **Where:** generated by `src/components/BrowserSupportChips.astro:98` from `src/utils/browser-support.ts:88-94` (`compareVersions` compares major versions only, through `parseMajor` at :83-86); the page's list is `src/docs/components/toggle.astro:31-37` (rendered at /html/components/toggle/#browser-support; frameworks: all). The same code gives the wrong version on `src/docs/components/divider.astro` (Safari) and `src/docs/components/toast.astro` (Safari).
- **Says:** "Safari: Full support Supported since v18."
- **Actually:** the page lists `scrollbar-width`, which web-features 3.43.0 (the data the chips are built from) puts at Safari 18.2 (`relative-color` is 18). `parseMajor` makes 18.2 compare equal to 18, so the first of the two stays and the chip shows 18. Safari 18.0 and 18.1 lack `scrollbar-width` (used by `.ui-overflow-scroll`). The same rounding affects Divider (`container-style-queries` 18, `text-box` 18.2: chip says v18) and Toast (chip says v26.2 where the list needs 26.4).
- **Evidence:** `node -e` over `/home/user/ui/node_modules/web-features` 3.43.0: `status.support.safari` is `18` for `relative-color` and `18.2` for `scrollbar-width`; a script compares major-only against full-version maxima for every page's `browserSupport` list and prints exactly three differences: toggle (safari 18 vs 18.2), divider (safari 18 vs 18.2), toast (safari 26.2 vs 26.4).
- **Correction:** compare the full version (major and minor) in `compareVersions`, so the chip reads "Safari 18.2+" here (and 18.2 on Divider, 26.4 on Toast).

### C3-03: Chips leave out overflow-block and overflow-inline

- **Severity:** 3 (verified; raised from 2 in the double check)
- **Double check:** holds on `245eaa1`. Raised because a documented modifier clips its items, with no wheel, touch or scrollbar scrolling, in Chrome 125 to 134 and Safari 18, which the chips call fully supported. The Drawer note is now `whats-new.ts:616`, and the Accordion (`:60`) and Typography (`:1426`) notes say the same.
- **Now at:** `src/docs/components/toggle.astro:31-37`, `toggle.astro:280-300`
- **Where:** `src/docs/components/toggle.astro:31-37` (`browserSupport`), rendered at /html/components/toggle/#browser-support (frameworks: all); the same gap applies to every page whose stylesheet uses `overflow-block` or `overflow-inline` (Button group, Tabs, Table, Carousel, Dialog, Drawer, Menu, Accordion, Typography).
- **Says:** "Chromium: Full support Supported since v125." and "Safari: Full support Supported since v18." (Toggle page, whose Overflow section documents `.ui-overflow-scroll`)
- **Actually:** `.ui-overflow-scroll` on a toggle group is built from `overflow-block: hidden; overflow-inline: auto;`, which BCD lists at Chrome and Edge 135 and Safari 26 (Firefox 69). Where they are missing the declarations are dropped, the group keeps its base `overflow: hidden` and does not scroll, and `css/compat/` has no fallback for it. So the full-support versions are Chromium 135 and Safari 26 for that modifier, not 125 and 18. The list omits it because `logical-properties` is on the "leave out" list and web-features reports that feature as Chrome 89 / Safari 15 at feature level.
- **Evidence:** BCD `css.properties.overflow-block css.properties.overflow-inline`: chrome 135, edge 135, firefox 69, safari 26 for both; web-features 3.43.0 `logical-properties` has `css.properties.overflow-inline` in `compat_features` with `by_compat_key` support chrome 135 / safari 26 while the feature-level support says chrome 89 / safari 15; `packages/opui/css/components/toggle-group.css:42-43`; `packages/opui/css/compat.css` imports only avatar, menu and tooltip. Not tested in an older browser (only Chromium 153 is installed).
- **Correction:** say on the Overflow section that `overflow="scroll"` / `.ui-overflow-scroll` needs Chromium 135 or Safari 26 (the Drawer's What's new already says it for its own scrolling: `src/utils/whats-new.ts:613`), or add an `@supports not (overflow-inline: auto)` fallback to `overflow-x: auto` in the compat layer.

### C4-08: An ancestor that clips overflow is said to hide the compat tooltip

- **Severity:** 3 (verified)
- **Same issue reported as:** G2-18, L3-03
- **Double check:** holds on `245eaa1`.
- **Now at:** `src/docs/components/tooltip.astro:185-188`
- **Where:** `src/docs/components/tooltip.astro:185-188` (also rendered at /html/components/tooltip/#accessibility; frameworks: all)
- **Says:** "In browsers without interest invokers, the compat layer shows the tooltip while its trigger is hovered or has keyboard focus. It isn't in the top layer there, so an ancestor that clips its overflow can hide it, and Esc doesn't close it."
- **Actually:** the tooltip is `position: fixed` (anchor.css) even outside the top layer, so an ancestor with a plain `overflow: hidden`, `clip` or `auto` does not hide it. Only an ancestor that clips overflow and is also the containing block for fixed descendants (`transform`, `filter`, `contain: paint` or `layout`) clips it. Other problems with a non-top-layer tooltip are stacking order, not overflow.
- **Evidence:** Chromium 153, compat state emulated (the `Save` trigger without `interestfor`, the rules of `packages/opui/css/compat/tooltip.css` applied unconditionally, trigger inside a 100x50 box): with `overflow: hidden`, `overflow: clip`, `overflow: auto`, `position: relative` or `container-type: inline-size` on the box, `elementFromPoint` at the tooltip's right edge, outside the box, returns the tooltip (not clipped); with `overflow: hidden; transform: translateZ(0)`, `contain: paint` or `contain: layout` it returns something else (clipped). `packages/opui/css/components/anchor.css` sets `position: fixed` on `.ui-floating[popover]`. The assumption is first stated in TODO.md:43.
- **Correction:** "so an ancestor that clips overflow and has a `transform`, `filter` or `contain` can hide it, and other content can stack above it".
- **TODO.md:** line 43 (the Explained note that introduced the `overflow: hidden` limit)
- **Also G2-18 (severity 3):**
  - Double check: partly right on `245eaa1`; the fields below are corrected. A transform or filter alone doesn't clip the tooltip (it only moves it, because the box becomes its containing block); it takes overflow clipping plus a containing block. TODO.md line 49 has no clipping wording.
  - Now at: `src/docs/guide/browser-support.astro:80-83`, `tooltip.astro:187`, `src/docs/blog/tooltip-interest-invokers.astro:133`, `packages/opui/CHANGELOG.md:236`
  - Where: `src/docs/guide/browser-support.astro:80-83` (also `src/docs/components/tooltip.astro:187`, `src/docs/learn/tooltip-interest-invokers.astro:133`, `packages/opui/CHANGELOG.md:227`; frameworks: all)
  - Actually: without the top layer the hover popover is still `position: fixed` (set by the library and the UA default for `[popover]`), so an ancestor with `overflow: hidden`, `clip` or `auto` does not clip it. Only an ancestor that is also a containing block for fixed descendants (`transform`, `filter`, `contain: paint` and similar) hides it, and a later sibling that stacks above it can cover it.
  - Correction: "It isn't in the top layer there, so an ancestor that clips its overflow and has a transform, filter or containment can clip it, and later content can cover it."
  - TODO.md: line 43, same wording ("an ancestor with `overflow: hidden` can clip it")
- **Also L3-03 (severity 3):**
  - Double check: partly right on `245eaa1`; the fields below are corrected. Same refinement as G2-18: a transform or filter alone doesn't clip.
  - Now at: `src/docs/blog/tooltip-interest-invokers.astro:133-134`
  - Where: `src/docs/learn/tooltip-interest-invokers.astro:133-134` (also rendered at /learn/tooltip-interest-invokers/#fallback; frameworks: all). The same claim is written at `src/docs/components/tooltip.astro:187`, `src/docs/guide/browser-support.astro:82` and `packages/opui/CHANGELOG.md:227` (other slices).
  - Actually: in the compat path the `.ui-floating[popover]` is `position: fixed` (`anchor.css`), so an ancestor with `overflow: hidden`, `overflow: clip` or `overflow: auto` does not clip it. Only an ancestor that also becomes the containing block of fixed descendants (`transform`/`translate`, `filter`, `contain: paint`) clips it. The sentence names the wrong cause (overflow alone).
  - Correction: say it "can be covered by other stacking contexts, and clipped by an ancestor that clips its overflow and creates a containing block for fixed elements (`transform`, `filter`, `contain`)" instead of "an ancestor that clips its overflow".
  - TODO.md: line 43 (the Explained note says "an ancestor with `overflow: hidden` can clip it")

### C7-06: Icon-only items are said to keep their size in shrink mode

- **Severity:** 3 (verified)
- **Same issue reported as:** C3-01
- **Double check:** holds on `245eaa1`. Fixing the CSS needs `min-inline-size: var(--_size)` on icon-only items in shrink mode; the `flex: none` already there isn't enough. The sentence also ships in the generated `packages/opui/skills/opui/references/button-group.md:20`.
- **Now at:** `src/docs/components/button-group.astro:246-247`, `src/docs/components/button-group.astro:258-259`, `src/component-api/button-group/api.ts:46`, `packages/opui/skills/opui/references/button-group.md:20`
- **Where:** `src/docs/components/button-group.astro:226-227` (components) and `:238-239` (html), `src/component-api/button-group/api.ts:46` (also rendered at /html/components/button-group/#overflow and in the Overflow row of the Button group API table; frameworks: all; the same sentence is at `src/component-api/toggle-group/api.ts:72`, not checked there)
- **Says:** "Icon-only items keep their size."
- **Actually:** Only in `.ui-overflow-scroll` (40x40). In `.ui-overflow-shrink` an icon-only button is 26px wide and 40px tall, no longer square, because the group sets `min-inline-size: 0` on every button and that beats the icon-only `min-inline-size: var(--_size)` from `button.css` (the `components.extended` layer comes after `components.root`). In the default wrap mode an icon-only button in a wrapped row stretches (`flex: auto`), 118x40 in the probe.
- **Evidence:** Chromium 153, `.ui-button-group.ui-outlined` with `max-inline-size: 18rem` and two icon-only buttons among text buttons: wrap `40x40` and `118x40` (last row), `.ui-overflow-scroll` `40x40` and `40x40`, `.ui-overflow-shrink` `26x40` and `26x40` (computed `min-inline-size: 0px`, `flex: 0 0 auto`). With the stress-test markup of `src/stress-tests/layout.html:3379-3412` and `max-inline-size: 40rem` the shrink group still gives `26x40`. Source: `packages/opui/css/components/button-group.css:142-146` (`&.ui-overflow-shrink { ... & > .ui-button { min-inline-size: 0; ... } }`), `packages/opui/css/components/button.css:247-250` (`&:where(:has(> svg:only-child)) { ...; min-inline-size: var(--_size); padding-inline: 0 }`), `packages/opui/css/layers.css`.
- **Correction:** Say icon-only items don't shrink or scroll away, and note they lose their square size with `.ui-overflow-shrink`, or fix the CSS so the claim holds.
- **Also C3-01 (severity 3):**
  - Double check: partly right on `245eaa1`; the fields below are corrected. The Toggle part holds. The aside that the Button group sentence is true was wrong (see C7-06), and the measured width depends on the markup (28px in a 14rem group with this probe).
  - Now at: `src/docs/components/toggle.astro:287-288`, `src/docs/components/toggle.astro:295-296`, `src/component-api/toggle-group/api.ts:72`, `packages/opui/skills/opui/references/toggle.md:22`
  - Where: `src/docs/components/toggle.astro:287-288` (frameworks: astro, react, svelte, vue) and `src/docs/components/toggle.astro:295-296` (html), also `src/component-api/toggle-group/api.ts:72` (the `overflow` row of the Toggle group API table, all frameworks) and its generated copy `packages/opui/skills/opui/references/toggle.md:22`; rendered at /html/components/toggle/#overflow and /html/components/toggle/#api
  - Actually: in a `.ui-overflow-shrink` toggle group icon-only buttons shrink with everything else. Their natural width is 40px (`--_size`), and in a 14rem (224px) group with three icon-only buttons plus two text buttons they render 23.1px wide. Button group has the same flaw (C7-06): its `flex: none` stops shrinking, but `min-inline-size: 0` leaves icon-only buttons 26px wide. `toggle-group.css` has no such rule: it sets `min-inline-size: 0` on every item and the base `flex: auto` lets icon-only items shrink.
  - Correction: drop "Icon-only items keep their size." from the Toggle page and the `toggle-group` api.ts (it holds only for `.ui-overflow-scroll`), or add `flex: none` and `min-inline-size: var(--_size)` for icon-only toggle buttons (not through `:has(> svg:only-child)`, since the toggle's svg sits next to its input; `flex: none` alone gives 36px, not 40px).

### D-05: The Markdown versions drop the `+` and `-` markers of diff code blocks

- **Severity:** 3 (verified by the coordinator)
- **Double check:** found during the double check, on `245eaa1`.
- **Where:** `src/components/Code.astro:36-50` (moves each marker into a `data-diff` attribute) and the HTML to Markdown step in `src/integrations/llms-worker.mjs`; visible in the `.md` version of every page with a `diff` block, such as /html/guide/migrating.md (120 blocks); frameworks: all
- **Says:** a diff block's removed and added lines as plain lines, for example `<details class="ui-accordion ui-card">` followed by `<details class="ui-accordion">` in the Accordion section
- **Actually:** the Markdown versions, which `llms.txt` points agents to, show the removed and the added lines of a diff block next to each other with nothing to tell them apart. A reader of the Markdown Migrating guide can't tell the 5.x line from the 6.x line.
- **Evidence:** `packages/opui/MIGRATING.md:9-12` (`- <details class="ui-accordion ui-card">` / `+ <details class="ui-accordion">`) against the built `html/guide/migrating.md:11-14` (both lines without a marker); `Code.astro` renders each line as `<span class="diff-line" data-diff="del|ins">` with the marker stripped.
- **Correction:** keep the markers in the Markdown output (restore `+`, `-` and a space from `data-diff` when converting a `pre.is-diff` block).

### X-01: The Installation text says the CSS reads Open Props tokens

- **Severity:** 3 (verified, re-checked by the coordinator)
- **Same issue reported as:** G1-11, C5-13, C7-17, G3-03, C8-17
- **Double check:** holds on `245eaa1`.
- **Now at:** `src/components/Installation.astro:120-123`
- **Where:** `src/components/Installation.astro:120-123` (rendered above the CSS tabs on every component page, in all five frameworks)
- **Says:** "Copy the CSS into your project to own it. It reads tokens from Open Props, `palette.css` and `theme.css`, so those go on the page too, after `layers.css`."
- **Actually:** No stylesheet in the package reads an Open Props token. All 476 custom properties the 53 package CSS files read are declared in the package itself (`palette.css`, `theme.css`, the stylesheets) or are optional `--ui-*` hooks with fallbacks, and `css/imports.css` has no Open Props import. The package README says the opposite: `opui-css/open-props` is "for your own CSS (the components don't read them)", `dist/opui.components.css` has "no Open Props, palette, theme, reset or utils", `opui-css/css/imports.css` is "everything but Open Props", and `open-props` is only needed for `opui-css/open-props.css`.
- **Evidence:** `packages/opui/README.md:19`, `packages/opui/README.md:180-187`, `packages/opui/package.json:4` ("the components don't need it"), `packages/opui/css/imports.css:1-18`, scan of the package CSS for reads of undeclared custom properties (none is an Open Props token), `src/docs/guide/getting-started/HTML.astro:163` ("If your own CSS reads Open Props, import ...", which agrees with the README).
- **Correction:** Drop "Open Props," from the sentence ("It reads tokens from `palette.css` and `theme.css`, so those go on the page too, after `layers.css`.").
- **Also G1-11 (severity 3):**
  - Double check: holds on `245eaa1`.
  - Now at: `src/components/Installation.astro:120-123`, `src/docs/guide/why-opui.astro:18-21`
  - Where: `src/components/Installation.astro:120-122`, rendered on every component page under Installation; reached from `src/docs/guide/why-opui.astro:20-25` ("its page lists the files it depends on, with a button that copies them all"); frameworks: all
  - Actually: component CSS reads no Open Props tokens. Every variable the package CSS reads is a `--ui-*` role or a private `--_*` property. The Getting started page says it correctly for the same paragraph ("It reads tokens from `palette.css` and `theme.css`", and "The components don't read it, so both are optional and only there for your own CSS"), and the README says the Open Props bundle is "for your own CSS (the components don't read them)".
  - Correction: "It reads tokens from `palette.css` and `theme.css`, so those go on the page too, after `layers.css`."
- **Also C5-13 (severity 3):**
  - Double check: holds on `245eaa1`.
  - Now at: `src/components/Installation.astro:120-123`
  - Where: `src/components/Installation.astro:120-123` (rendered in the Installation section of /html/components/list/, /select/ and /table/, and of every other component page; frameworks: all)
  - Actually: no component stylesheet, `theme.css` or `palette.css` reads an Open Props token. They read only `--ui-*` roles and their own `--_*` properties, so copying the CSS does not need Open Props on the page. The package README says the components don't need it, and the HTML Getting started page says the CSS "reads tokens from `palette.css` and `theme.css`" only.
  - Correction: "It reads tokens from `palette.css` and `theme.css`, so those go on the page too, after `layers.css`." (drop "Open Props,").
- **Also C7-17 (severity 3):**
  - Double check: holds on `245eaa1`.
  - Now at: `src/components/Installation.astro:120-123`
  - Where: `src/components/Installation.astro:120-123` (also rendered at /&lt;framework>/components/&lt;slug>/#installation on every component page with CSS tabs; frameworks: all)
  - Actually: No stylesheet in the package reads an Open Props token. Component CSS reads only `--ui-*` roles and its own `--_*` properties, and `theme.css` holds its own values. Open Props is an optional companion for the reader's own CSS. The Getting started guide words it correctly, "It reads tokens from `palette.css` and `theme.css`", and the package README says "Nothing in the package reads Open Props".
  - Correction: "It reads tokens from `palette.css` and `theme.css`, so those go on the page too, after `layers.css`." (drop "Open Props,").
- **Also G3-03 (severity 3):**
  - Double check: holds on `245eaa1`.
  - Now at: `src/components/Installation.astro:120-123`
  - Where: `src/components/Installation.astro:120-123` (rendered on every component page, e.g. /html/components/checkbox/#installation; frameworks: all)
  - Actually: no component, compat or core stylesheet reads an Open Props token any more. `palette.css` and `theme.css` are the only token sources, which is what Getting started HTML says ("It reads tokens from `palette.css` and `theme.css`"). A reader following the sentence adds an Open Props import the CSS never uses.
  - Correction: drop "Open Props, " so it reads "It reads tokens from `palette.css` and `theme.css`".
- **Also C8-17 (severity 3):**
  - Double check: holds on `245eaa1`.
  - Now at: `src/components/Installation.astro:120-123`
  - Where: `src/components/Installation.astro:120-123` (rendered at the end of each component page's Installation section, for example /html/components/callout/#installation; frameworks: all)
  - Actually: the component stylesheets do not read Open Props. They read only `--ui-*` roles from `theme.css` and `palette.css` and their own `--_*` properties. Open Props is an optional companion. The Getting started guide says so, so the two pages disagree.
  - Correction: "It reads tokens from `palette.css` and `theme.css`, so those go on the page too, after `layers.css`."

### C1-01: Under the hood feature rows say Safari does not support label, textarea and fieldset

- **Severity:** 4 (verified, re-checked by the coordinator)
- **Same issue reported as:** C3-04
- **Double check:** holds on `245eaa1`. The rows also render on /blog/under-the-hood/.
- **Now at:** `src/utils/browser-support.ts:83-86`, `src/utils/browser-support.ts:103`, `src/components/UnderTheHood/FeatureSupport.astro:54`, `TextFieldBuild.astro:55`, `TextareaBuild.astro:44`
- **Where:** `src/utils/browser-support.ts:83-86` (`parseMajor` matches `^(\d+)`) and `:103` (`isSupported = typeof value === "string" && !!parseMajor(value)`), rendered by `src/components/UnderTheHood/FeatureSupport.astro:54` (`browser.version ?? "No"`). The feature ids come from `src/components/UnderTheHood/TextFieldBuild.astro:55` (`features: ["focus-visible", "focus-within", "label"]`) and `src/components/UnderTheHood/TextareaBuild.astro:44` (`["focus-visible", "textarea"]`). Rendered at /html/components/text-field/#under-the-hood and /html/components/textarea/#under-the-hood (frameworks: all). The Form page has the same row for `<fieldset> and <legend>` (see C3-04).
- **Says:** "[&lt;label>](https://webstatus.dev/features/label) (Widely available): Chrome 1+, Edge 12+, Firefox 1+, Safari not supported" (on the HTML page the Safari cell reads "No" with a dimmed icon); the same line for `<textarea>`.
- **Actually:** Safari has supported `<label>` and `<textarea>` since before Safari 4, and the row itself says "Widely available". web-features stores the Safari version as the range string "≤4" (iOS "≤3.2"). The parser cannot read a leading "≤", treats the browser as unsupported and prints "No".
- **Evidence:** web-features `label` and web-features `textarea`: "support: ... safari ≤4, safari_ios ≤3.2"; BCD `html.elements.label`: safari "≤4"; Chromium DOM probe of `.feature-support li` on both pages: the Safari `dd` is "No" and its row lacks `data-supported`; `grep -rn "Widely available.*not supported" the rendered pages` finds only these three rows (text-field, textarea, form).
- **Correction:** make `parseMajor` accept a leading "≤" (and show "Safari 4+" or "Safari ≤4") so the rows stop saying Safari lacks `<label>`, `<textarea>` and `<fieldset>`.
- **Also C3-04 (severity 4):**
  - Double check: holds on `245eaa1`. The row also renders on /blog/under-the-hood/.
  - Now at: `src/components/UnderTheHood/FormBuild.astro:18`
  - Where: `src/components/UnderTheHood/FormBuild.astro:18` (`features: ["all", "fieldset"]`), rendered by `src/components/UnderTheHood/FeatureSupport.astro:54` (`browser.version ?? "No"`) from `src/utils/browser-support.ts:83-86` (`parseMajor`) and `:103`, at /html/components/form/#under-the-hood (frameworks: all). The same code gives the same wrong chip on Text field (`<label>`, `src/components/UnderTheHood/TextFieldBuild.astro`) and Textarea (`<textarea>`, `src/components/UnderTheHood/TextareaBuild.astro`).
  - Actually: Safari has supported `<fieldset>` and `<legend>` since before Safari 4, and the chip itself says "Widely available". web-features stores the Safari version as the range string "≤4" (also "≤3.2" on iOS), and `parseMajor` uses `/^(\d+)/`, which does not match "≤4", so the browser counts as unsupported.
  - Correction: make `parseMajor` accept a leading "≤" (so the chip reads "Safari 4+" or "Safari ≤4") instead of dropping the browser.

### C8-18: Chips report full support when web-features lists no support for the browser

- **Severity:** 4 (verified, re-checked by the coordinator)
- **Double check:** partly right on `245eaa1`; the fields below are corrected. The blanket fix would add an error: web-features leaves Chrome, Edge and Firefox out of `anchor-positioning` only because of `position-visibility` values the library doesn't use. The correction now keeps an exception list, and the new Rating page has the same overstated Safari chip.
- **Now at:** `src/utils/browser-support.ts:61-81`, `src/utils/browser-support.ts:88-93`
- **Where:** `src/utils/browser-support.ts:61-81` (fallback in `getSupportForFeature`) and `:88-93` (`compareVersions`); rendered at /html/components/divider/#browser-support, /html/components/typography/#browser-support and /html/components/rating/#browser-support (Rating is new since `c0d4970`: Safari "v18.4", should be partial, missing `attr`); frameworks: all
- **Says:** Divider: "Firefox: Full support Supported since v154." and "Safari: Full support Supported since v18." Typography: "Safari: Partial support Missing: box-decoration-break, marker."
- **Actually:** web-features does not list Firefox as supporting `text-box` (aggregate support: chrome 133, edge 133, safari 18.2), and BCD marks `css.types.text-edge`, the type behind `cap alphabetic` in `divider.css:37`, as Firefox "preview, PARTIAL: Rendering not implemented (only parsing and serialization)". Safari needs 18.2 for `text-box`, not 18. For Typography, `attr()` is Chrome 133, Edge 133 and Firefox 155 only, so Safari's missing list should include `attr` (`typography.css` itself comments "Firefox and Safari fallback" for `attr(start type(<number>))`).
- **Evidence:** `node_modules/web-features` 3.43.0 (and 3.44.0): `features["text-box"].status.support` has no `firefox`; `by_compat_key` has `firefox: "154"` for nine `css.properties.text-box*` keys and no Firefox entry for the five `css.types.text-edge*` keys; `features.attr.status.support` has no `safari` while `css.types.attr.declaration-value` and `.fallback` have `safari: "18.4"`. A script replaying the code over the eight pages' ids shows only these differences (Divider Firefox and Safari, Typography Safari). On the Anchor, Carousel, Dialog, Drawer, Menu and Tooltip pages the same fallback reports `anchor-positioning` as supported in Chrome, Edge and Firefox, which is right for what the library uses: only the unused `position-visibility: anchor-valid` and `anchor-visible` keep those browsers out of the aggregate.
- **Correction:** treat a browser missing from the aggregate `support` as unsupported, except where every compat key it lacks is one the library doesn't use (an explicit exception list; today only the two `position-visibility` keys of `anchor-positioning`, which would otherwise flip Chromium to partial on six pages) (Divider: Firefox partial, "Missing: text-box"; Typography: add `attr` to Safari; Rating: Safari partial, "Missing: attr"), and compare full version numbers (Divider: Safari v18.2).
- **Note:** Cause: when the aggregate `status.support` has no entry for a browser, the code falls back to `by_compat_key`, skips keys that have no entry for that browser and reports the highest version of the rest, so a partly supported feature reads as supported. `compareVersions` compares major versions only, so 18 and 18.2 tie and the first one wins.

## Theme token descriptions

The descriptions in `src/utils/theme-token-descriptions.ts` render in the CSS variables table of every component page that reads the token, on the Theme tokens page and in `tokens.json`.

### --ui-button-hover

#### C7-03: Button > CSS variables (`--ui-button-hover`)

- **Severity:** 2 (verified)
- **Double check:** holds on `245eaa1`.
- **Now at:** `src/utils/theme-token-descriptions.ts:39-40`, `packages/opui/CHANGELOG.md:283`
- **Where:** `src/utils/theme-token-descriptions.ts:40` (also rendered in the CSS variables table of /html/components/button/ and /html/components/button-group/; frameworks: all; `packages/opui/CHANGELOG.md:272` repeats it)
- **Says:** "`layer` draws a translucent state layer in `--ui-state-hover-alpha-accent` and `--ui-state-active-alpha-accent`: the text color over filled and tonal buttons, the accent over outlined ones, which keep their text and border."
- **Actually:** The two `-accent` alphas drive filled and tonal buttons of every color, and primary and critical outlined ones. A neutral outlined button (the default color) keeps the neutral alphas, `--ui-state-hover-alpha-light` or `-dark` and `--ui-state-active-alpha-light` or `-dark`, so changing the `-accent` alphas does not move it.
- **Evidence:** Chromium 153, `--ui-button-hover: layer`, `--ui-state-hover-alpha-accent: 40%`, `--ui-state-active-alpha-accent: 50%` on a wrapper: neutral `.ui-outlined` hover `oklch(0.1 0.01 145 / 0.1)`, pressed `oklch(0.1 0.06 145 / 0.2)` (unchanged); `.ui-primary.ui-outlined` hover `/ 0.4`, pressed `/ 0.5`. Source: `packages/opui/css/components/button.css` (`--_outlined-hover-bg-color: var(--_default-hover-bg-color)` in the layer query, and `--_default-hover-bg-color` / `--_default-active-bg-color` use `--ui-state-*-alpha-light` and `-dark`, switching to `-accent` only in `.ui-critical` and `.ui-primary`). The neighbouring token descriptions already say "neutral buttons" for the light and dark alphas.
- **Correction:** Say the layer uses the accent alphas on filled, tonal, primary and critical buttons, and the light and dark alphas on neutral outlined buttons.

### --ui-control-border-color-filled

#### C7-05: Button group > Changelog > What's new (also the `--ui-control-border-color-filled` row in CSS variables on Button, Button group and Chip)

- **Severity:** 3 (verified)
- **Double check:** partly right on `245eaa1`; the fields below are corrected. The token also colors the dividers of default (`transparent`) groups; "Actually" and the correction now say so. `src/component-api/custom-properties/button-group.ts:10` also names only `.ui-tonal` for the token.
- **Now at:** `src/utils/whats-new.ts:235`, `src/utils/theme-token-descriptions.ts:109-110`
- **Where:** `src/utils/whats-new.ts:234` and `src/utils/theme-token-descriptions.ts:110` (also rendered at /html/components/button-group/#changelog and in the CSS variables table of /html/components/button/, /html/components/button-group/ and /html/components/chip/; frameworks: all)
- **Says:** whats-new.ts:234 "the edge and dividers of outlined groups with `--ui-control-border-color` and of filled and tonal groups with `--ui-control-border-color-filled`"; theme-token-descriptions.ts:110 (`--ui-control-border-color-filled`) "the edge and dividers of a `ButtonGroup` with one of them" (`.ui-filled` or `.ui-tonal`)
- **Actually:** `--ui-control-border-color-filled` colors the edge (outline) of filled and tonal groups, and the dividers of tonal and default (transparent) groups, but not of filled ones. The dividers of a filled group stay `currentColor` (or a shade of the accent in a primary or critical filled group), whatever the token says. The Button group's own component property note says so: "filled groups keep `currentColor` so the dividers stay visible on the fill".
- **Evidence:** Chromium 153, group with style="--ui-control-border-color-filled: rgb(255, 0, 0)": `.ui-filled` gives outline rgb(255, 0, 0) and the second button's `box-shadow` `oklch(0.98 0.015 145) -1px 0 0 0, ...` (`--_divider-border-color: currentColor`); `.ui-filled.ui-primary` gives `oklch(0.43 0.1 145)`; `.ui-tonal` gives rgb(255, 0, 0) for both outline and `box-shadow`. Source: `packages/opui/css/components/button-group.css:100-108` (`:where(.ui-button-group.ui-filled) & { --_divider-border-color: currentColor; ... }`) and `src/component-api/custom-properties/button-group.ts` (`--_divider-border-color`).
- **Correction:** Say the token sets the edge of filled and tonal groups and the dividers of tonal and default (`transparent`) groups. Filled groups keep `currentColor` dividers, or a shade of the accent in primary and critical filled groups.

### --ui-font-size-large

#### C7-16: --ui-font-size-large lists the Drawer title

- **Severity:** 2 (verified)
- **Same issue reported as:** G2-15
- **Double check:** partly right on `245eaa1`; the fields below are corrected. The token gained three readers after `c0d4970` (DescriptionList, Stat, OneTimeCode), so the correction now lists them. The Drawer title still doesn't read it.
- **Now at:** `src/utils/theme-token-descriptions.ts:225-226`
- **Where:** `src/utils/theme-token-descriptions.ts:226` (also rendered in the CSS variables table of /html/components/avatar/; frameworks: all)
- **Says:** "Font size of lead paragraphs, `.ui-p.ui-large`, the `Drawer` title and large `Avatar` initials."
- **Actually:** The Drawer title does not read `--ui-font-size-large`. `drawer.css` sets `--_title-font-size: var(--ui-font-size-h4)` for the title, which is fluid between `--ui-font-size-400` and `--ui-font-size-500`. At `c0d4970` only `typography.css` (lead paragraphs, `.ui-p.ui-large`) and `avatar.css` read the token; since then `description-list.css` (`.ui-total`), `stat.css` (small value) and `one-time-code.css` read it too.
- **Evidence:** `grep -rn "ui-font-size-large" packages/opui` finds `typography.css:10,76`, `avatar.css:53` and `theme.css:219` only; `packages/opui/css/components/drawer.css:22` (`--_title-font-size: var(--ui-font-size-h4)`) and `:70-72` (the title uses it).
- **Correction:** Drop "the `Drawer` title" and name the current readers: "Font size of lead paragraphs, `.ui-p.ui-large`, large `Avatar` initials, the `DescriptionList` total row, the value of a small `Stat` and the `OneTimeCode` digits. Defaults to `--ui-font-size-500`."
- **Also G2-15 (severity 2):**
  - Double check: partly right on `245eaa1`; the fields below are corrected. Partly right: the token gained readers after `c0d4970`, so "read only by" no longer holds.
  - Now at: `src/utils/theme-token-descriptions.ts:225-226`, `packages/opui/tokens.json`
  - Where: `src/utils/theme-token-descriptions.ts:225-226` (also tokens.json and CSS variables tables)
  - Actually: the Drawer title is sized by `--_title-font-size`, which defaults to `--ui-font-size-h4` (same as the Dialog title). `--ui-font-size-large` is read by `typography.css` (`.ui-p.ui-large` and the paragraphs after an `hgroup` heading), `avatar.css` (large Avatar) and, since `c0d4970`, `description-list.css` (`.ui-total`), `stat.css` (`.ui-small` value) and `one-time-code.css`.
  - Correction: remove "the `Drawer` title" and name the current readers, as in C7-16.
  - TODO.md: line 218-231 (the fixed item changed the Drawer title; the description was not updated)

### --ui-font-size-small

#### C5-03: --ui-font-size-small lists dense List text and chips

- **Severity:** 2 (verified)
- **Same issue reported as:** C7-10
- **Double check:** holds on `245eaa1`.
- **Now at:** `src/utils/theme-token-descriptions.ts:227-228`
- **Where:** `src/utils/theme-token-descriptions.ts:228` (rendered in the CSS variables table of List, Select and Table; frameworks: all)
- **Says:** "Font size of helper text, `Callout`, `Table`, `Tooltip`, code blocks, dense `List` text and small buttons, chips, toggles and fields."
- **Actually:** every `List` row uses `--ui-font-size-small`, dense or not.
- **Evidence:** `packages/opui/css/components/list.css:170` (`font-size: var(--ui-font-size-small)` on `& > :where(li, option)`, no `.ui-dense` condition); Chromium on /html/components/list/: `getComputedStyle(li).fontSize` is `14px` for both `ul.ui-list` and `ul.ui-list.ui-dense`.
- **Correction:** "`List` text" instead of "dense `List` text".
- **Also C7-10 (severity 2):**
  - Double check: holds on `245eaa1`.
  - Now at: `src/utils/theme-token-descriptions.ts:228`
  - Where: `src/utils/theme-token-descriptions.ts:228` (also rendered in the CSS variables table of /html/components/chip/; frameworks: all)
  - Actually: Chips of every size except `.ui-large` use `--ui-font-size-caption` (12px). A small chip is 12px, and only a large chip reads `--ui-font-size-small`. Small buttons, toggles and fields do read it, so "chips" is the one wrong item (the `--ui-font-size-caption` entry lists `Chip` correctly).
  - Correction: Say "small buttons, toggles and fields, and large chips".

### --ui-line-height

#### C8-11: Typography > CSS variables (`--ui-line-height`)

- **Severity:** 3 (verified)
- **Double check:** partly right on `245eaa1`; the fields below are corrected. The Stat label and description (new since `c0d4970`) read the token too; "Actually" and the correction now say so.
- **Now at:** `src/utils/theme-token-descriptions.ts:263-264`
- **Where:** `src/utils/theme-token-descriptions.ts:263-264` (rendered in the Typography and List "CSS variables" tables; frameworks: all)
- **Says:** "`--ui-line-height` ... Line height of body copy: prose, captions and `List` text."
- **Actually:** prose does not use it. Rich text and `.ui-p` inherit the page line height, `--ui-line-height-relaxed` (1.75). `--ui-line-height` (1.6) is read by `.ui-caption`, one `List` rule and, since `c0d4970`, the `Stat` label and description.
- **Evidence:** `packages/opui/core/normalize.css:21` (`html { line-height: var(--ui-line-height-relaxed) }`), `typography.css:99` and `list.css:322` (the only reads of `var(--ui-line-height)`), `typography.css` rich text `p { line-height: inherit }`. Chromium: `.ui-rich-text p` and `p.ui-p` compute 28px at 16px (1.75); `p.ui-caption` computes 19.2px at 12px (1.6).
- **Correction:** "Line height of captions, `List` text and the `Stat` label and description. Body text and prose use `--ui-line-height-relaxed`."
- **TODO.md:** line 635 covers the description of `--ui-line-height-relaxed` only, not this one

### --ui-line-height-tight

#### C5-09: Table (and Select) > CSS variables (`--ui-line-height-tight`)

- **Severity:** 2 (verified)
- **Double check:** holds on `245eaa1`. Optionally also list the `Stat` value (`stat.css:24`, new since `c0d4970`).
- **Now at:** `src/utils/theme-token-descriptions.ts:269-270`
- **Where:** `src/utils/theme-token-descriptions.ts:270` (rendered in the CSS variables table of /html/components/table/ and /html/components/select/; frameworks: all)
- **Says:** "Line height of single-line controls and compact text: field inputs, `Table` cells, `Tooltip`, `Card` captions and keyboard hints in buttons."
- **Actually:** `Table` cells only use `--ui-line-height-tight` in a `.ui-dense` table. Cells of a normal or spacious table inherit the page line height.
- **Evidence:** `packages/opui/css/components/table.css:200-205` (`&.ui-dense { th, td { line-height: var(--ui-line-height-tight) } }`) and no other `line-height` rule in `table.css`; Chromium on /html/components/table/: `td` line-height / font-size is 1.75 in `.ui-table`, `.ui-spacious` and `.ui-sticky-header` tables and 1.25 in `.ui-dense` ones.
- **Correction:** "dense `Table` cells" instead of "`Table` cells".

### --ui-on-selected and --ui-primary-text

#### C5-07: Select (and List) > CSS variables (`--ui-on-selected`, `--ui-primary-text`)

- **Severity:** 3 (verified)
- **Double check:** holds on `245eaa1`. `packages/opui/CHANGELOG.md:357` says the same ("Selected `Select` options read `--ui-primary-text`").
- **Now at:** `src/utils/theme-token-descriptions.ts:290-291`, `src/utils/theme-token-descriptions.ts:342-343`
- **Where:** `src/utils/theme-token-descriptions.ts:291` (`--ui-on-selected`) and `:343` (`--ui-primary-text`) (rendered in the CSS variables table of /html/components/select/ and /html/components/list/; frameworks: all)
- **Says:** "When unset, `--ui-on-primary` on toggles, the item's own text color on list items and `--ui-primary-text` on a selected `Select` option." (`--ui-on-selected`); "... and a selected `Select` option." (in the list of what `--ui-primary-text` colors)
- **Actually:** the selected option of a `Select` keeps the picker's own text color when `--ui-on-selected` is unset. `list.css` only reads `--ui-primary-text` for `option[aria-selected="true"]`, an attribute neither the `Select` component nor the browser sets on its options; the real selected option matches `option:checked`, which uses `var(--ui-on-selected, currentColor)`. Setting `--ui-primary-text` does not recolor the selected option.
- **Evidence:** `packages/opui/css/components/list.css:227-235` (`&[aria-selected="true"]`, `color: var(--ui-on-selected, var(--ui-primary-text))`) against `:237-245` (`&:checked`, `color: var(--ui-on-selected, currentColor)`); `--ui-primary-text` is not read for options anywhere else (`grep` over `packages/opui/css/components`). Chromium 153 on /html/components/select/ with the "Delivery time" picker open: the `:checked` option has `aria-selected` null and `color: oklch(0.16 0.01 255)`, identical to the other options and to the list, not `--ui-primary-text`.
- **Correction:** say the selected `Select` option keeps the item's own text color when `--ui-on-selected` is unset, and drop "a selected `Select` option" from `--ui-primary-text`.

### --ui-radius-small

#### C7-15: Avatar > CSS variables (`--ui-radius-small`)

- **Severity:** 1 (verified)
- **Double check:** holds on `245eaa1`.
- **Now at:** `src/utils/theme-token-descriptions.ts:352-353`
- **Where:** `src/utils/theme-token-descriptions.ts:353` (also rendered in the CSS variables table of /html/components/avatar/ and /html/components/button/; frameworks: all)
- **Says:** "Corner radius of small parts: `kbd`, inline `code`, `mark`, `var`, `Tooltip`, the file input and a square `Avatar` image."
- **Actually:** It is the `rounded` avatar (`.ui-rounded`, a rounded square) that reads `--ui-radius-small`, and it rounds the avatar, which clips its image. A `squared` avatar (`.ui-squared`) has `border-radius: 0` and never reads it. The CHANGELOG words it as "rounded avatars".
- **Evidence:** `packages/opui/css/components/avatar.css:57-63` (`.ui-squared { border-radius: 0 }`, `.ui-rounded { border-radius: var(--ui-radius-small) }`); `packages/opui/CHANGELOG.md:266` ("rounds `kbd`, inline `code`, `mark`, `var`, `Tooltip`, the file input and rounded avatars").
- **Correction:** Replace "a square `Avatar` image" with "a `rounded` `Avatar`".

### --ui-selected and --ui-primary-tonal

#### C5-01: Selected tint is described with the pressed-button alpha token

- **Severity:** 4 (verified, re-checked by the coordinator)
- **Same issue reported as:** C2-01, G2-16
- **Double check:** holds on `245eaa1`. `packages/opui/CHANGELOG.md:356-357` names the same wrong alpha for the List checked option and selected rows. The Timeline current marker (`timeline.css:133`, new since `c0d4970`) also reads `--ui-state-active-alpha-accent`, so it is no longer read by `button.css` only; the conclusion is unchanged. See also D-03.
- **Now at:** `src/component-api/custom-properties/list.ts:39`, `src/utils/theme-token-descriptions.ts:361`, `src/utils/theme-token-descriptions.ts:345`, `src/utils/whats-new.ts:699`, `src/components/UnderTheHood/SelectBuild.astro:118`, `src/component-api/custom-properties/choice.ts:26`
- **Where:** `src/component-api/custom-properties/list.ts:39` (rendered at /html/components/list/#component-properties, `--_selected-bg-color`, also on /html/components/select/ and /html/components/menu/; frameworks: all). The same wrong token is in `src/utils/theme-token-descriptions.ts:361` (`--ui-selected`, CSS variables table), `src/utils/whats-new.ts:692` (List What's new), `src/components/UnderTheHood/SelectBuild.astro:118` (Select Under the hood, step 3 "Picker" snippet, the `:checked` option fill) and, for the checked `.ui-card`, `src/component-api/custom-properties/choice.ts:26` and `src/utils/theme-token-descriptions.ts:345` (`--ui-primary-tonal`).
- **Says:** "`--ui-selected` when the theme sets it, otherwise `--ui-primary` at `--ui-state-active-alpha-accent`" (list.ts:39); "`--ui-primary` at `--ui-state-active-alpha-accent` on list items and options" (theme-token-descriptions.ts:361); "A checked option uses `--ui-state-active-alpha-accent`." (whats-new.ts:692); the SelectBuild snippet `oklch(from var(--ui-primary) l c h / var(--ui-state-active-alpha-accent))`.
- **Actually:** the selected and current tint reads `--ui-state-selected-alpha-accent` (25%, 15% with more contrast). `--ui-state-active-alpha-accent` is the pressed layer of primary and critical buttons (its own description says so), so setting it does nothing to list rows or options.
- **Evidence:** `packages/opui/css/components/list.css:22-27` (`--_selected-bg-color: var(--ui-selected, oklch(from var(--ui-primary) l c h / var(--ui-state-selected-alpha-accent)))`); `packages/opui/css/components/choice.css:223` (checked card, same token); `packages/opui/css/theme.css:162-163,633,665`; `--ui-state-active-alpha-accent` is read only in `packages/opui/css/components/button.css:82,98,145`; `src/utils/theme-token-descriptions.ts:390-391` and `:402-403` describe the two tokens.
- **Correction:** write `--ui-state-selected-alpha-accent` at list.ts:39, theme-token-descriptions.ts:345 and :361, whats-new.ts:692, choice.ts:26 and SelectBuild.astro:118.
- **Also C2-01 (severity 3):**
  - Double check: holds on `245eaa1`.
  - Now at: `src/component-api/custom-properties/choice.ts:26`, `src/utils/theme-token-descriptions.ts:345`
  - Where: `src/component-api/custom-properties/choice.ts:26` (`--_checked-bg-color`, rendered at /html/components/checkbox/#component-properties, /radio/, /switch/; frameworks: all) and `src/utils/theme-token-descriptions.ts:345` (`--ui-primary-tonal` row of the CSS variables table on checkbox, radio, switch, and also button, button-group, color-field, number-stepper, toast and guide/theme-tokens)
  - Actually: the checked card tint reads `--ui-state-selected-alpha-accent`, not `--ui-state-active-alpha-accent`. The active token is the pressed state layer of Button (the site's own description of it says "Alpha of the pressed state layer on primary and critical buttons"), so a theme that sets only `--ui-state-active-alpha-accent` sees no change in cards. The docs are stale from a working-tree change (published 6.0.0-rc.1 `choice.css` still read the active token).
  - Correction: name `--ui-state-selected-alpha-accent` in both descriptions.
  - Note: Same wrong token elsewhere (List, Menu, Select, Toggle and Chip pages, already reported by the C5 reviewer as C5-01): `src/utils/theme-token-descriptions.ts:361` (`--ui-selected`), `src/component-api/custom-properties/list.ts:39`, `src/utils/whats-new.ts:692`; `packages/opui/css/components/list.css:25` reads `--ui-state-selected-alpha-accent`.
- **Also G2-16 (severity 3):**
  - Double check: holds on `245eaa1`.
  - Now at: `src/utils/theme-token-descriptions.ts:344-345`, `src/utils/theme-token-descriptions.ts:360-361`
  - Where: `src/utils/theme-token-descriptions.ts:344-345` and `:360-361` (also tokens.json, Theme tokens Primary and State sections, and CSS variables tables)
  - Actually: the unset tint on List, Menu and Select options and on checked Checkbox, Radio and Switch cards is `--ui-primary` at `--ui-state-selected-alpha-accent` (25%, 15% with more contrast). `--ui-state-active-alpha-accent` is the pressed layer on primary and critical buttons only. The `--ui-state-selected-alpha-accent` description on the same page names the right consumers.
  - Correction: replace `--ui-state-active-alpha-accent` with `--ui-state-selected-alpha-accent` in both descriptions.

### --ui-surface-filled

#### G2-14: --ui-surface-filled mentions table stripes

- **Severity:** 3 (verified)
- **Same issue reported as:** C5-10
- **Double check:** holds on `245eaa1`.
- **Now at:** `src/utils/theme-token-descriptions.ts:410-411`, `packages/opui/tokens.json`
- **Where:** `src/utils/theme-token-descriptions.ts:410-411` (also tokens.json and every CSS variables table that lists the token; frameworks: all)
- **Says:** "Background of filled areas such as progress tracks and table stripes."
- **Actually:** Table has no stripes (no zebra or `nth-child` rule exists in the package). Table uses `--ui-surface-filled` for header and footer cells and, at 75%, for hovered rows. A Progress track uses it only with `.ui-filled`; the default track is `--ui-track-bg-color`, else `--ui-surface-tonal`. Other readers: Range `.ui-filled`, List, Divider `.ui-filled`. The Theming page's own list says "Lists, tracks, table headers".
- **Evidence:** `packages/opui/css/components/table.css:21,44,108`; `packages/opui/css/components/progress.css:5,22`; `packages/opui/css/components/range.css:119`; `packages/opui/css/components/list.css:10`; `packages/opui/css/components/divider.css:11`; `grep -rniE "stripe|zebra"` over `packages/opui` finds nothing. The `--ui-track-bg-color` description on the same page says "When unset, `Progress` and tonal ranges use `--ui-surface-tonal`".
- **Correction:** "Background of filled areas: lists, `.ui-filled` progress and range tracks, table headers and footers, and hovered table rows."
- **Also C5-10 (severity 2):**
  - Double check: holds on `245eaa1`. Its own correction ("such as progress tracks") kept an inaccuracy; it now uses G2-14's wording.
  - Now at: `src/utils/theme-token-descriptions.ts:411`
  - Where: `src/utils/theme-token-descriptions.ts:411` (rendered in the CSS variables table of /html/components/table/, /html/components/list/ and /html/components/select/; frameworks: all)
  - Actually: tables have no stripes. `table.css` uses `--ui-surface-filled` for the header cells (`th`), the footer cells and, at 75% alpha, the hovered body row.
  - Correction: use G2-14's wording, since only `.ui-filled` progress tracks read the token: "Background of filled areas: lists, `.ui-filled` progress and range tracks, table headers and footers, and hovered table rows."

### --ui-underline-offset

#### C8-12: The underline offset tokens describe a Firefox difference that does not exist

- **Severity:** 3 (verified)
- **Same issue reported as:** G2-17
- **Double check:** holds on `245eaa1`.
- **Now at:** `src/utils/theme-token-descriptions.ts:467-470`
- **Where:** `src/utils/theme-token-descriptions.ts:467-470` (rendered in the Typography "CSS variables" table; frameworks: all)
- **Says:** `--ui-underline-offset`: "Gap between text and its underline: `Link` and rich text links, and in Firefox `abbr`, `dfn`, `ins` and `u`." `--ui-underline-offset-small`: "... Firefox uses `--ui-underline-offset`."
- **Actually:** no stylesheet treats Firefox differently. `abbr`, `dfn`, `ins`, `u` and their classes read `--ui-underline-offset-small` in every browser; `--ui-underline-offset` is read only by `link.css`.
- **Evidence:** `grep -rn underline-offset packages/opui/css packages/opui/core`: `typography.css:140,207,686` (all `--ui-underline-offset-small`) and `link.css:12` (`--ui-underline-offset`); `packages/opui/css/compat/` holds only avatar, menu and tooltip; no Firefox gate in `packages/opui/scripts/features.mjs` or `tests/e2e/engine-bugs.ts`.
- **Correction:** drop the Firefox sentences: `--ui-underline-offset` is for links, `--ui-underline-offset-small` for `abbr`, `dfn`, `ins`, `u` and their classes.
- **Also G2-17 (severity 3):**
  - Double check: holds on `245eaa1`.
  - Now at: `src/utils/theme-token-descriptions.ts:467-470`, `packages/opui/tokens.json`
  - Where: `src/utils/theme-token-descriptions.ts:467-470` (also tokens.json, Theme tokens Typography, CSS variables tables)
  - Actually: no stylesheet treats Firefox differently. `abbr`, `dfn`, `ins`, `u` and their classes read `--ui-underline-offset-small` in every browser; `--ui-underline-offset` is read only by `Link` and rich text links. Setting `--ui-underline-offset` never moves those elements, and `--ui-underline-offset-small` is not ignored in Firefox. The project also forbids per-engine workarounds in component CSS.
  - Correction: "`--ui-underline-offset`: Gap between text and its underline for `Link` and rich text links." and "`--ui-underline-offset-small`: Gap between text and the underline of `abbr`, `dfn`, `ins` and `u` and their classes."

### State layer alphas

#### D-03: `--ui-state-hover-alpha-accent` and `--ui-state-active-alpha-accent`

- **Severity:** 1 (verified by the coordinator)
- **Double check:** found during the double check, on `245eaa1`.
- **Where:** `src/utils/theme-token-descriptions.ts:390-391` and `:396-397` (rendered in the CSS variables tables, on the Theme tokens page and in `tokens.json`; frameworks: all)
- **Says:** "Alpha of the pressed state layer on primary and critical buttons." and "Alpha of the hover state layer on primary and critical buttons."
- **Actually:** with `--ui-button-hover: layer`, every filled and tonal button reads them, neutral ones included (`button.css:78-105`). Outside buttons, the hover alpha also tints hovered List rows (`list.css:14`) and critical Menu items (`menu.css:142`), and the pressed alpha draws the ring of the current Timeline marker (`timeline.css:133`).
- **Evidence:** `grep -rn "state-\(hover\|active\)-alpha-accent" packages/opui/css/components` finds `button.css:82,87,98,104,145,148`, `list.css:14`, `menu.css:142` and `timeline.css:133`.
- **Correction:** name the other readers: "Alpha of the hover state layer on primary and critical buttons (on every filled and tonal button with `--ui-button-hover: layer`), hovered List rows and critical Menu items." and "Alpha of the pressed state layer on primary and critical buttons (on every filled and tonal button with `--ui-button-hover: layer`) and the ring of the current Timeline marker."

## Component pages

### Accordion

#### C6-01: Accordion > Variants (prose and API table)

- **Severity:** 2 (verified)
- **Double check:** holds on `245eaa1`. For `api.ts`: "`transparent` has no surface or border, and no inline padding". `MIGRATING.md:49` ("with no surface or padding") has the same imprecision.
- **Now at:** `src/docs/components/accordion.astro:122-123`, `src/component-api/accordion/api.ts:57`
- **Where:** `src/docs/components/accordion.astro:122-123` and `src/component-api/accordion/api.ts:57` (rendered at /&lt;framework>/components/accordion/#variants and in the Accordion API table; frameworks: astro, react, svelte, vue for the prose, all for the API row)
- **Says:** "`transparent` drops the surface and the padding." (accordion.astro:123) and "`transparent` has no surface, border or padding." (api.ts:57)
- **Actually:** `.ui-transparent` drops the surface, the border and the inline padding only. The block padding stays: `--_summary-padding-block: var(--_padding)` and `--_content-padding-block: var(--ui-space-2) var(--_padding)` are not reset for `.ui-transparent`; only `--_padding-inline` is `0em`. (`packages/opui/MIGRATING.md` repeats "with no surface or padding" for the previous look.)
- **Evidence:** `packages/opui/css/components/accordion.css:14,22,25`. Chromium probe on /html/components/accordion/, Transparent example: summary `padding: 16px 0px`, `.ui-content` `padding: 8px 0px 16px`, margin `0px 4px`, background transparent, border 0. The Component properties table on the same page words the inline part correctly ("`--_padding-inline` ... `0` in `.ui-transparent`").
- **Correction:** Say "drops the surface, the border and the inline padding" (the block padding stays).

#### C6-02: Accordion > Changelog > What's new

- **Severity:** 2 (verified)
- **Double check:** holds on `245eaa1`. The panel animation itself needs `::details-content` (Chrome 131, Firefox 143, Safari 18.4), so the browser sentence in the proposed rewording is partly moot. Simplest: "The panel clips with `overflow-block: clip` while it animates, so it follows the writing mode." with no browser sentence, or drop the note. Also take `Accordion` out of the scrolling list in `packages/opui/CHANGELOG.md:305`.
- **Now at:** `src/utils/whats-new.ts:60`, `packages/opui/CHANGELOG.md:305`
- **Where:** `src/utils/whats-new.ts:60` (rendered at /&lt;framework>/components/accordion/#changelog; frameworks: all). The same sentence is in `packages/opui/CHANGELOG.md:294`.
- **Says:** "Open content scrolls with `overflow-inline` and `overflow-block`, so it follows the writing mode. Browsers older than Chrome 135, Firefox 69 and Safari 26 ignore them and don't scroll it."
- **Actually:** The accordion has no scrolling content and no `overflow-inline`. Its only logical overflow declaration is `overflow-block: clip` on `::details-content`, which clips the panel while it animates open and closed (it replaces `overflow-y: clip` of 5.4.3). `.ui-content` has no overflow declaration and the `<details>` itself clips with `overflow: hidden` (`--_overflow`). In older browsers the declaration is ignored, so the animating panel isn't clipped; nothing "doesn't scroll". The sentence matches the Drawer note (whats-new.ts:613), where `overflow-block: auto` does scroll.
- **Evidence:** `packages/opui/css/components/accordion.css:79-87` (`overflow-block: clip`; `grep overflow-inline accordion.css` finds nothing); 5.4.3 `css/components/accordion.css` `&::details-content { overflow-y: clip; }`; BCD `css.properties.overflow-block` chrome 135, firefox 69, safari 26 (the versions are right, the behavior described is not). Chromium probe with a 1500px wide child in an open `.ui-outlined` accordion: `<details>` computes `overflow: hidden`, `.ui-content` `visible`, `::details-content` `overflow-x: visible` and `overflow-y: clip`; the content is clipped, nothing scrolls.
- **Correction:** Reword to "The panel is clipped while it animates with `overflow-block: clip`, so it follows the writing mode. Browsers older than Chrome 135, Firefox 69 and Safari 26 ignore it and don't clip it." (or drop the note).

### Avatar

#### C7-14: Avatar > Sizes

- **Severity:** 1 (verified)
- **Double check:** holds on `245eaa1`.
- **Now at:** `src/docs/components/avatar.astro:132-133`
- **Where:** `src/docs/components/avatar.astro:111-113` (also rendered at /html/components/avatar/#sizes; frameworks: all)
- **Says:** "Letters and icons scale with the avatar."
- **Actually:** Letters scale at every size (12, 14, 16, 20px), icons only up to the default size: the icon is 16, 20, 24 and 24px for x-small, small, medium and large, because `.ui-large` does not set `--_icon-size`.
- **Evidence:** Chromium 153, `svg width="32"` in each avatar: widths 16, 20, 24, 24; `packages/opui/css/components/avatar.css:5,29,42,48,52-55` (x-small and small set `--_icon-size`, large keeps the default `--ui-icon-size-large`).
- **Correction:** "Letters scale with the avatar, and icons up to the default size."

#### C7-12: Avatar > Changelog > Migrating from 5.x

- **Severity:** 2 (verified)
- **Double check:** holds on `245eaa1`.
- **Now at:** `src/utils/whats-new.ts:108`
- **Where:** `src/utils/whats-new.ts:107` (also rendered at /astro/components/avatar/#migrating-from-5x and the react, svelte and vue pages; not on the HTML page)
- **Says:** "A button avatar needs `as="button"`, and `disabled` only goes with it ([types](#api))."
- **Actually:** In 6.0 `disabled` also goes with a link avatar (`href`), which then drops its `href` and gets `aria-disabled="true"`. The same page says so twice: What's new "A link avatar takes `disabled`: it drops its `href` and gets `aria-disabled="true"`." and Disabled "A link avatar drops its `href` and gets `aria-disabled="true"` instead." "Only" was true in 5.x.
- **Evidence:** `packages/opui/components/Avatar/types.ts` (`{ as?: "a"; disabled?: boolean; href: string }` and `{ as: "button"; disabled?: boolean; href?: never }`, `disabled?: never` only on the `div` member); 5.4.3: `opui-css@5.4.3/components/Avatar/types.ts` (`as?: "a"` has `disabled?: never`).
- **Correction:** "A button avatar needs `as="button"`, and `disabled` goes only with it or with `href`."

### Badge

#### C7-11: Badge > Changelog > What's new

- **Severity:** 2 (verified)
- **Double check:** holds on `245eaa1`. The page already has a separate note for warning badges (`--ui-on-warning`), so "Severity text reads `--ui-on-fill` instead of fixed grays" is enough. The TODO item is now `TODO.md:640-645`.
- **Now at:** `src/utils/whats-new.ts:134`
- **Where:** `src/utils/whats-new.ts:133` (also rendered at /html/components/badge/#whats-new; frameworks: all)
- **Says:** "Severity text reads `--ui-on-fill` and `--ui-palette-strong` instead of fixed grays."
- **Actually:** The Badge never reads `--ui-palette-strong`. Critical, info, neutral and success badges take `--ui-on-fill`, warning badges `--ui-on-warning`, and the default badge `--ui-on-primary`. `--ui-palette-strong` is not in the Badge page's own CSS variables table either, since neither `badge.css` nor `anchor.css` uses it.
- **Evidence:** `packages/opui/css/components/badge.css:19` (`--ui-on-primary`), `:62-68` (`--_text-color: var(--ui-on-fill)`), `:86-90` (`--ui-on-warning`); `grep -rn palette-strong packages/opui/css/components/badge.css packages/opui/css/components/anchor.css` finds nothing; `TODO.md:626-634` (the Badge fill text became `--ui-on-fill`, option B with `--ui-palette-strong` was not taken).
- **Correction:** "Severity text reads `--ui-on-fill` (`--ui-on-warning` for warning) instead of fixed grays."
- **TODO.md:** related, line 626 (the `--ui-on-fill` rename; it does not cover this note)

### Button

#### C7-02: Button > page description (meta description, llms.txt, search index)

- **Severity:** 1 (verified)
- **Double check:** holds on `245eaa1`.
- **Now at:** `src/docs/components/button.astro:18-19`
- **Where:** `src/docs/components/button.astro:18-19` (also in the page `<meta name="description">`, `dist/llms.txt` line 30 and `search-index.json`; frameworks: all)
- **Says:** "Buttons allow users to take actions, and make choices, with a single tap."
- **Actually:** The same page and the Chip page send choices elsewhere: "For filters, tags and choices, use a Chip." (Button preamble), "Filters, tags and choices. Use a Chip." (When not to use), and the Chip description "Use them for filters, tags and choices."
- **Evidence:** `src/docs/components/button.astro:52-53` and `:73-75`; `src/docs/components/chip.astro:44-46`; `dist/llms.txt` lines 30 and 36.
- **Correction:** "Buttons allow users to take actions with a single tap."

#### C7-01: Button > Disabled

- **Severity:** 2 (verified)
- **Double check:** holds on `245eaa1`.
- **Now at:** `src/docs/components/button.astro:212`, `src/docs/components/button.astro:217-218`
- **Where:** `src/docs/components/button.astro:212` (components) and `:217` (html) (also rendered at /html/components/button/#disabled; frameworks: all)
- **Says:** "The link can't be clicked or focused."
- **Actually:** A disabled link button is an `<a aria-disabled="true">` without `href`, so it can't be focused or followed. It can still be clicked: the `click` event fires on it and handlers run, because the component passes `onclick` / `onClick` / `@click` through to the `<a>` and nothing in `button.css` sets `pointer-events: none` (only `cursor: not-allowed`).
- **Evidence:** `packages/opui/css/components/button.css` disabled block (`&:is([disabled], [aria-disabled="true"]) { cursor: not-allowed; ... }`), `packages/opui/components/tag.ts` (sets `aria-disabled`, drops `href`, nothing else), `Button.react.tsx` (`{...(rest as object)}` onto the element). Chromium 153 on /html/components/button/: `a.ui-button[aria-disabled="true"]` has `pointer-events: auto`, `focus()` leaves `document.activeElement` unchanged, and a click listener added to it ran once after `click({ force: true })`. The Migrating note at `src/utils/whats-new.ts:195` ("so they can't be focused or followed") is the accurate wording.
- **Correction:** Say "The link can't be focused or followed" (a `click` handler still runs, so guard it in your own script).

### Button group

#### C7-07: Button group > Changelog > What's new

- **Severity:** 2 (verified)
- **Double check:** holds on `245eaa1`. `packages/opui/CHANGELOG.md:322` says the same and needs the same fix.
- **Now at:** `src/utils/whats-new.ts:214`, `packages/opui/CHANGELOG.md:322`
- **Where:** `src/utils/whats-new.ts:213` (also rendered at /html/components/button-group/#whats-new; frameworks: all; `packages/opui/CHANGELOG.md:311` says the same)
- **Says:** "Icon-only buttons stay square and use the same icon size as buttons with a label."
- **Actually:** Icon-only buttons are square, but their icon is not the same size as a labeled button's icon. An icon-only button draws its icon at 60% of the button height (24px in a 40px button), a button with a label at `0.7lh` (20px), in a group and outside one.
- **Evidence:** Chromium 153 on /html/components/button-group/ (the `#icons` and `#vertical-orientation` examples and a standalone pair): icon-only buttons `40x40` with a `24px` svg, buttons with a label `77x40`, `106x40`, `75x40` with a `20px` svg. Source: `packages/opui/css/components/button.css:55` (`--_icon-size: 0.7lh`) and `:247-250` (`--_icon-size: calc(var(--_size) * 0.6)` on `:has(> svg:only-child)`). The Button page's own Under the hood says "The icon scales with the button instead of the text".
- **Correction:** Say icon-only buttons in a group use Button's own icon-only icon size (60% of the button) and stay square.

#### C7-04: Button group > Under the hood > Dividers

- **Severity:** 4 (verified, re-checked by the coordinator)
- **Double check:** holds on `245eaa1`. The docs fix only stops claiming RTL works. The component bug itself (the divider shadow sits on the physical left, with no `:dir(rtl)` or logical flip) is worth logging too.
- **Now at:** `src/components/UnderTheHood/ButtonGroupBuild.astro:48`
- **Where:** `src/components/UnderTheHood/ButtonGroupBuild.astro:48` (also rendered at /html/components/button-group/#under-the-hood; frameworks: all)
- **Says:** "Physical is fine here: in right-to-left the clipped outer edge just switches sides"
- **Actually:** In right-to-left, filled and tonal groups lose the dividers between their buttons. Each button draws its divider as a left-edge `box-shadow`, which falls on the neighbor to its left. In LTR that neighbor is the next sibling and paints after it, so the line shows over the previous button. In RTL the neighbor on the left is the next sibling in DOM order, and its background paints over the shadow, so every divider between buttons is covered and only the clipped outer edge is lost. Outlined and text groups still show dividers in RTL (transparent backgrounds do not cover them).
- **Evidence:** Chromium 153. A `dir="rtl"` wrapper around `.ui-button-group.ui-filled` with three 100px buttons, screenshot pixel scan along a text-free row: LTR changes at x=99 and x=199 (divider columns `242,251,242`), RTL has no change between x=1 and x=298; `.ui-tonal` the same (LTR divider `195,200,206` at x=99 and 199, RTL none). The real docs example (`#variants` groups) with `document.documentElement.dir = "rtl"` gives the same result (tonal: dividers at x=70 and 142 in LTR, none in RTL). Source: `packages/opui/css/components/button-group.css:58-61` (`box-shadow: calc(-1 * var(--ui-border-width)) 0 0 0 var(--_divider-border-color), 0 calc(-1 * ...) ...`); the demo repeats the same `-1px 0 0 0` shadow.
- **Correction:** Drop the right-to-left sentence, or say that in right-to-left the dividers of filled and tonal groups are painted under the next button and do not show.

### Callout

#### C8-03: Callout > CSS variables and Changelog

- **Severity:** 1 (verified)
- **Double check:** holds on `245eaa1`.
- **Now at:** `src/utils/theme-token-descriptions.ts:22`, `src/utils/theme-token-descriptions.ts:24`, `src/utils/whats-new.ts:256`
- **Where:** `src/utils/theme-token-descriptions.ts:22` and `:24`, `src/utils/whats-new.ts:255` (rendered in the Callout and Card "CSS variables" tables and the Callout What's new; frameworks: all)
- **Says:** "`Callout` without a severity" is a raised surface that reads `--ui-border-color-on-raised` and `--ui-border-color-raised`; "callouts without a severity `--ui-border-color-raised`".
- **Actually:** only a tonal callout without a severity does. An outlined callout without a severity ignores both tokens and keeps `--ui-border-color`.
- **Evidence:** `packages/opui/css/components/callout.css:32-42` (the `--ui-border-color: var(--ui-border-color-on-raised)` rule excludes `.ui-outlined`) and `:58-63` (outlined sets `--_border-color` to `--_outlined-border-color`, which is `--ui-border-color`). Chromium with --ui-border-color-raised: rgb(255, 0, 0) on `html`: tonal callout border rgb(255, 0, 0), `.ui-outlined` callout border `oklch(0.8406 0.01 255)`. The Card wording ("tonal and elevated `Card`") is exact.
- **Correction:** say "tonal `Callout` without a severity".

#### C8-01: Callout > Severities

- **Severity:** 3 (verified, re-checked by the coordinator)
- **Double check:** holds on `245eaa1`. The evidence quotes the old default primary hue 145; since 6d0333f it is 222.8, with the same result: neutral stays a near-gray at hue 255.
- **Now at:** `src/docs/components/callout.astro:132`, `src/docs/components/callout.astro:139`
- **Where:** `src/docs/components/callout.astro:132` (components slot) and `:139` (html slot); rendered at /html/components/callout/#severities; frameworks: all
- **Says:** "`neutral` is a non-severity tone for brand-tinted attention." (html slot: "`.ui-neutral` is a non-severity tone for brand-tinted attention.")
- **Actually:** a neutral callout is gray, not brand-tinted. The `.ui-neutral` scope takes its palette from `--ui-neutral`, which is built from `--ui-gray-hue` (255) and `--ui-gray-chroma` (0.01), not from `--ui-primary` or the brand palette. In 5.x `.ui-neutral` was not a palette scope, so a neutral callout did use the brand palette; the sentence matches that old behavior, not 6.0.
- **Evidence:** `packages/opui/css/theme.css:427-433` (`--ui-neutral` uses `var(--ui-gray-chroma) var(--ui-gray-hue)`) and `:751-752` (`.ui-neutral { --ui-palette-source: oklch(from var(--ui-neutral) 0.58 c h); --ui-palette-hue-rotate-by: 0 }`); `src/docs/guide/theming.astro:96-98` ("follows --ui-gray-hue and --ui-gray-chroma by default"); `src/utils/theme-token-descriptions.ts:277-278`. Chromium on /html/components/callout/: `.ui-callout.ui-neutral` background `oklch(0.93 0.0047619 255 / 0.6)`, border `oklch(0.8 0.00761905 255)`, icon `oklch(0.53 0.00952381 255)`, while `--ui-primary` is hue 145. 5.4.3 `dist/opui.css:1182-1195` lists the palette scopes without `.ui-neutral`.
- **Correction:** describe neutral as a gray tone that follows `--ui-gray-hue` and `--ui-gray-chroma`, for attention that is not a severity.

### Card

#### C8-04: Card > Actions > Alignment (example text)

- **Severity:** 3 (verified, re-checked by the coordinator)
- **Double check:** holds on `245eaa1`. The parity snapshot `tests/unit/__snapshots__/card/Alignment.html` changes with it.
- **Now at:** `src/component-examples/card/Alignment.html:2,10,18`, `Alignment.astro:6,14,22`, `Alignment.react.tsx:7,15,23`, `Alignment.svelte:6,14,22`, `Alignment.vue:7,15,23`
- **Where:** `src/component-examples/card/Alignment.html:2,10,18` (also `Alignment.astro:6,14,22`, `Alignment.react.tsx:7,15,23`, `Alignment.svelte:6,14,22`, `Alignment.vue:7,15,23`; rendered at /html/components/card/#actions-alignment; frameworks: all)
- **Says:** "Buttons aligned to the end. Works too!", "Again, buttons are aligned to the end!", "Icon buttons aligned to the end!" (the visible text of the three example cards)
- **Actually:** all three cards use `.ui-align-start` / `align="start"`, so the buttons sit at the start. The section text above the example says "Actions sit at the end. Add `.ui-align-start` to `.ui-actions` to line them up with the content instead." The example texts date from 5.x, where start was the default and `.ui-align-end` moved them.
- **Evidence:** `packages/opui/css/components/card.css:158-171` (`justify-content: end`; `&.ui-align-start { justify-content: start }`). Chromium on /html/components/card/#actions-alignment: the three `.ui-actions.ui-align-start` rows compute `justify-content: start` and their buttons sit at x=266 to 423 inside a card spanning x=261 to 939.
- **Correction:** change the three example texts to say the buttons are aligned to the start.

### Carousel

#### C6-07: Carousel > Keyboard support

- **Severity:** 2 (verified)
- **Double check:** partly right on `245eaa1`; the fields below are corrected. The per-press counts hold; the examples named as showing the gap were the wrong ones.
- **Now at:** `src/component-api/carousel/api.ts:13`
- **Where:** `src/component-api/carousel/api.ts:13` (rendered at /&lt;framework>/components/carousel/#keyboard-support; frameworks: all)
- **Says:** "On the previous or next button, scrolls by one view."
- **Actually:** In Chromium 153 one press moves the scroller by the browser's page step, snapped to an item, which is less than a view once several items are visible: with `--_items-per-view` of 1 and 2 it advances 1 item, with 3 it advances 2, with 4 it advances 3, with 6 it advances 5 (the last visible item becomes the first). On the page, the 2-per-view examples (Buttons outside, Persistent buttons, Custom buttons) move 1 item per press, not 2; the 3-per-view examples have only 5 items, so their first press reaches the end either way.
- **Evidence:** Chromium probe on a fresh `ul.ui-carousel` (800px wide, 14 items, focus on the Next button, Enter): items scrolled per press for itemsPerView 1, 2, 3, 4, 5, 6 = 1.00, 1.00, 2.00, 3.00, 4.01, 5.00 (544px = 2 items of 272px at 3 per view). Space behaves the same. The rest of the row matched: the button that reaches the end is disabled and `document.activeElement` becomes `BODY`.
- **Correction:** "scrolls about one view, to an item boundary (one item less than the view when several are visible)". (This holds up to about 8 per view; above that the step falls 2 items short.)

#### C6-06: Carousel > Basics

- **Severity:** 3 (verified)
- **Double check:** partly right on `245eaa1`; the fields below are corrected. The page claim is wrong as found, but the failure is milder: the overflowing items widen the page, which scrolls instead. A fallback belongs in the compat layer.
- **Now at:** `src/docs/components/carousel.astro:145-148`
- **Where:** `src/docs/components/carousel.astro:145-149` (the quoted sentence starts at line 146; rendered at /&lt;framework>/components/carousel/#basics; frameworks: all)
- **Says:** "Browsers without `::scroll-button()` and `::scroll-marker` get a plain scroll-snap list with a scrollbar."
- **Actually:** The carousel only becomes a scroll container through the logical `overflow-inline: auto` (and `overflow-block: auto` with `overflow-inline: hidden` when vertical), with no `overflow-x`/`overflow-y` fallback and no compat file. Those properties ship in Chrome 135, Firefox 69 and Safari 26, so only Firefox and Safari 26 and later fall back as described. Chrome 134 and older and Safari 18 and older lack `::scroll-button()`, `::scroll-marker` and `overflow-inline`: the carousel is not a scroll container: its items overflow it and widen the page (or the nearest scrolling ancestor), which scrolls instead with no snapping; they are unreachable only when an ancestor clips the overflow.
- **Evidence:** `packages/opui/css/components/carousel.css:64` (`overflow-inline: auto`) and `:123-124`; `grep -n "overflow-x\|overflow-y" carousel.css` finds nothing; `packages/opui/css/compat/` holds only avatar, menu and tooltip. BCD `css.properties.overflow-inline`: chrome 135, firefox 69, safari 26 (same for `overflow-block`). web-features `scroll-buttons`: chrome 135 only. `packages/opui/CHANGELOG.md:294` lists the containers that don't scroll before those versions (Accordion, Drawer, rich text, Dialog, ButtonGroup, Tabs, ToggleGroup) and leaves out the Carousel.
- **Correction:** "Firefox and Safari 26 and later get a plain scroll-snap list with a scrollbar" and "In Chrome 134 and older and Safari 18 and older the carousel doesn't scroll: its items spill out into the page.", or add a compat-layer fallback (`packages/opui/css/compat/carousel.css`, `@supports not (overflow-inline: auto)`). A fallback in the component CSS is not allowed by `AGENTS.md`, and `overflow-x` next to `overflow-inline` changes the result in vertical writing modes.

### Checkbox

#### C2-04: Checkbox, Radio, Switch > Field group > Disabled (partial)

- **Severity:** 1 (verified)
- **Double check:** holds on `245eaa1`.
- **Now at:** `src/docs/components/partials/FieldGroupNotes.astro:68-75`, `src/docs/components/partials/FieldGroupNotes.astro:63-67`
- **Where:** `src/docs/components/partials/FieldGroupNotes.astro:69-74` (html text; the components text at `:64-66` says the same of `Fieldset`), rendered at /html/components/checkbox/#field-group-disabled, /radio/#field-group-disabled, /switch/#field-group-disabled (frameworks: all). The partial is used only by these three pages.
- **Says:** "Attach the `disabled` attribute to the `<fieldset>` element to disable every checkbox in it, or to a single `<input>`." (radio and switch: "every radio", "every switch")
- **Actually:** HTML exempts the controls inside the fieldset's first `<legend>` from a disabled fieldset. The Select all example on the Checkbox page puts its controlling checkbox in a `<legend>`, so disabling that fieldset leaves that checkbox enabled while `.ui-fieldset[disabled]` dims the whole fieldset: it looks disabled but still toggles.
- **Evidence:** Chromium on /html/components/checkbox/: `<fieldset class="ui-fieldset" disabled>` with one checkbox in its `<legend>` and one in the body: the legend checkbox has `:disabled` false, `click()` toggles it and its label opacity is 1, while the fieldset opacity is 0.64; the body checkbox has `:disabled` true and `click()` does not toggle it (this matches the HTML spec rule for a disabled fieldset's first legend, which is my own knowledge, confirmed in Chromium). `packages/opui/css/components/form.css:50-61` (dimming on `.ui-fieldset[disabled]`).
- **Correction:** say "every checkbox in it except those in its first `<legend>`".

#### C2-06: Checkbox > Select all

- **Severity:** 1 (verified)
- **Double check:** holds on `245eaa1`.
- **Now at:** `src/docs/components/checkbox.astro:315-317`, `src/docs/components/checkbox.astro:327`
- **Where:** `src/docs/components/checkbox.astro:315-316` (components) and `:327` (html), rendered at /html/components/checkbox/#select-all (frameworks: all)
- **Says:** "It works around a fieldset or a [table](/components/table#sorting)" (components: "a `Fieldset` or a [Table](/components/table#sorting)")
- **Actually:** the Table page's Sorting section only documents `opui-sortable-table`; neither it nor any other part of the Table page mentions Select all or shows a working select all checkbox (the only table markup with `data-select-all` is the Data table block, `src/blocks/data-table.html`; the Table page's `Normal` example has a header checkbox with no `<opui-select-all>` around it). The link target does not contain what the sentence points to.
- **Evidence:** `src/docs/components/table.astro:273-345` (Sorting section text); `grep -rn "data-select-all" src/component-examples src/blocks` lists only the Checkbox examples and `src/blocks/data-table.html`.
- **Correction:** link the Data table block, or drop the `#sorting` anchor so it links the Table page.

#### C2-02: Checkbox, Radio, Switch and Range > Component properties (--_accent chain)

- **Severity:** 2 (verified)
- **Same issue reported as:** C3-08
- **Double check:** holds on `245eaa1`. Optionally: the invalid accent is capped in dark mode too (`choice.css:139-144`), so "`--ui-invalid` when invalid" could read "`--ui-invalid`, capped the same way, when invalid".
- **Now at:** `src/component-api/custom-properties/choice.ts:6`, `src/component-api/custom-properties/choice.ts:49`
- **Where:** `src/component-api/custom-properties/choice.ts:5-6` (`--_accent`) and `:48-49` (`--_on-accent`), rendered at /html/components/checkbox/#component-properties, /radio/, /switch/ (frameworks: all)
- **Says:** "Fill and border of the checked input. `--ui-choice-accent` when the theme sets it, otherwise `--ui-primary` with its lightness capped in dark mode, and `--ui-invalid` when invalid." and "Color of the checkmark, dash and dots on `--_accent`. `--ui-choice-on-accent` when the theme sets it, otherwise `--ui-on-primary`, or `--ui-on-fill` in dark mode. `--ui-on-fill` when invalid."
- **Actually:** there is a middle step. `--_accent` is `--ui-choice-accent`, else `--ui-control-accent`, else the capped primary; `--_on-accent` is `--ui-choice-on-accent`, else `--ui-on-control-accent`, else `light-dark(--ui-on-primary, --ui-on-fill)`. The m3 and shadcn themes set `--ui-control-accent` and `--ui-on-control-accent`, so for them "otherwise `--ui-primary` with its lightness capped" is false (their fill is the uncapped primary). The `--ui-choice-accent` token row on the same pages states the chain correctly.
- **Evidence:** `packages/opui/css/components/choice.css:4-16` (`--_accent`) and `:19-25` (`--_on-accent`); `packages/opui/themes/m3.css:29-30`, `packages/opui/themes/shadcn.css:26-27`; Chromium probe (dark mode, docs checkbox page): with neither token set the checked fill is `oklch(0.62 0.095 145)` (capped primary); after setting only `--ui-control-accent: oklch(0.85 0.1 50)` the checked fill and border become `oklch(0.85 0.1 50)` (uncapped) and, with `--ui-on-control-accent: oklch(0.2 0 0)`, the mark becomes `oklch(0.2 0 0)`; setting `--ui-choice-accent` then overrides both.
- **Correction:** add "else `--ui-control-accent`" to `--_accent` and "else `--ui-on-control-accent`" to `--_on-accent`.
- **Also C3-08 (severity 1):**
  - Double check: holds on `245eaa1`.
  - Now at: `src/component-api/custom-properties/range.ts:6`
  - Where: `src/component-api/custom-properties/range.ts:4-7`; rendered at /html/components/range/#component-properties (frameworks: all)
  - Actually: the chain has a middle step: `--_accent: var(--ui-choice-accent, var(--ui-control-accent, var(--ui-primary)))`. A theme that sets only `--ui-control-accent` recolors the Range (the page's own `--ui-control-accent` row says "the `Range` thumb and fill"), which the `--_accent` row does not mention.
  - Correction: "Defaults to `--ui-choice-accent`, then `--ui-control-accent`, then `--ui-primary`, and is set by the invalid state."

#### C2-03: Checkbox, Radio, Switch > Label alignment (partial)

- **Severity:** 2 (verified)
- **Double check:** holds on `245eaa1`. Apply it to the three What's new notes too (`whats-new.ts:356`, `:804` and `:1022`).
- **Now at:** `src/docs/components/partials/LabelAlignment.astro:12-13`, `src/utils/whats-new.ts:356`, `src/utils/whats-new.ts:804`, `src/utils/whats-new.ts:1022`
- **Where:** `src/docs/components/partials/LabelAlignment.astro:12-13` (rendered at /html/components/checkbox/#label-alignment, /radio/#label-alignment, /switch/#label-alignment; frameworks: all; the partial is used only by these three pages). The same wording is in the What's new notes `src/utils/whats-new.ts:354` (Checkbox), `:791` (Radio), `:1006` (Switch).
- **Says:** "The checkbox lines up with the first line of its label and centers on the label's capital letters, so it looks centered in any font and at any size." (What's new: "centers on its capitals in any font")
- **Actually:** the CSS centers the label's first line box on the control (`margin-block-start: calc((var(--_size) - 1lh) / 2 + var(--ui-choice-label-offset))`), not its capital letters. The two coincide only when the font's ascent and descent sit symmetrically around the cap height; in other fonts the capitals sit above or below the control's center. The Under the hood step on the same pages says it correctly: "`(size − 1lh) / 2` centers the first line on the box". Nothing in the package uses `text-box-trim` or `cap` to center on capitals (the only `text-box` is `packages/opui/css/components/divider.css:37`).
- **Evidence:** `packages/opui/css/components/choice.css:78-80`; Chromium probe on the docs checkbox page (14px label, 21px line height): the control's center equals the line box center in every case, while the center of the capital letters (canvas `actualBoundingBoxAscent` of "H" against the baseline of an inline marker) is 0 px off for the page's `system-ui` font, -0.5 px for `serif`, Georgia and Liberation Serif, -1 px for `monospace` and DejaVu Sans, and -1.5 px for the `"Courier New", monospace` stack (negative = above the control's center).
- **Correction:** say it "centers the first line of the label on the control, so it looks centered in most fonts", and keep the `--ui-choice-label-offset` nudge for fonts where the capitals sit off-center.

#### C2-05: Checkbox > Select all (and Select all API)

- **Severity:** 2 (verified)
- **Double check:** holds on `245eaa1`.
- **Now at:** `src/docs/components/checkbox.astro:313-314`, `src/docs/components/checkbox.astro:324-325`, `src/component-api/select-all/api.ts:19`
- **Where:** `src/docs/components/checkbox.astro:313` (components) and `:325` (html); `src/component-api/select-all/api.ts:19` (Parts row for `input[data-select-all]`). Rendered at /html/components/checkbox/#select-all and in the Select all API table (frameworks: all).
- **Says:** "Checking it checks the other enabled checkboxes inside, and it's checked when they all are and indeterminate when some are" and "The checkbox that checks and unchecks the other enabled checkboxes inside. It's checked when they all are, and `indeterminate` when some are."
- **Actually:** "enabled" only means "without its own `disabled` attribute". A checkbox disabled through an ancestor `<fieldset disabled>` (which the same page documents under Field group > Disabled) is counted as enabled, because `items` filters on the `disabled` property, which ignores a disabled ancestor. That checkbox cannot be clicked, so the control can never become checked and the enabled checkboxes can no longer be unchecked through it.
- **Evidence:** `packages/opui/elements/select-all.js:14-18` (`!input.disabled`); Chromium probe on /html/components/checkbox/: an `<opui-select-all>` with the control, checkbox A, and checkbox C inside a `<fieldset disabled>` (`C.matches(":disabled")` true, `C.disabled` false): initial control `[checked false, indeterminate false]`; after click 1 A is checked and the control is `[false, true]` (indeterminate although every enabled checkbox is checked); clicks 2 and 3 leave A checked and the control `[false, true]`. A checkbox with its own `disabled` attribute is skipped as documented.
- **Correction:** say "checkboxes without a `disabled` attribute" (and that one inside a disabled fieldset still counts), or filter on `:disabled` instead of `.disabled` at `select-all.js:16`.

### Chip

#### C7-09: Chip > Disabled (React)

- **Severity:** 3 (verified)
- **Double check:** holds on `245eaa1`.
- **Now at:** `src/docs/components/chip.astro:258-259`, `src/docs/components/chip.astro:254-261`
- **Where:** `src/docs/components/chip.astro:258-259` (also rendered at /react/components/chip/#disabled; frameworks: react)
- **Says:** "A static chip can't be disabled. Give it `class="ui-disabled"` for an inactive look, which announces nothing."
- **Actually:** In React the prop is `className`. `class="ui-disabled"` is not the class prop: React logs "Invalid DOM property `class`. Did you mean `className`?" and the Chip spreads it after its own `className`, so the element gets two `class` attributes. The page's own React example uses `className="ui-disabled"`.
- **Evidence:** React 19.3 `renderToStaticMarkup(<Chip class="ui-disabled" label="Archived" />)` (Chip compiled from `packages/opui/components/Chip/Chip.react.tsx`) gives `<div class="ui-chip" class="ui-disabled">`, a browser keeps the first attribute so the chip is not dimmed, and the dev warning above is logged; `className="ui-disabled"` gives `<div class="ui-chip ui-disabled">`. `src/component-examples/chip/Disabled.react.tsx:10` uses `className`. The Svelte, Vue and Astro text (`class=`) is right for those frameworks, and the React Icon paragraph two sections up already says `className`.
- **Correction:** In the `react` slot write `className="ui-disabled"`.

#### C7-08: Chip > Icon

- **Severity:** 4 (verified, re-checked by the coordinator)
- **Double check:** holds on `245eaa1`. For Svelte write "`label` takes a string or a snippet" (Svelte has snippets, not a `label` slot).
- **Now at:** `src/docs/components/chip.astro:142-147`, `src/docs/components/chip.astro:153-159`, `src/docs/components/chip.astro:161-167`
- **Where:** `src/docs/components/chip.astro:144-147` (components: Astro and Vue), `:155-159` (react), `:163-167` (svelte) (also rendered at /astro/components/chip/#icon and the react, svelte and vue pages; not on the HTML page)
- **Says:** Astro and Vue: "When you use the default slot instead of `label`, wrap the text in `<span class="ui-text">` so it can truncate." React: "When you use `children` instead of `label`, wrap the text in `<span className="ui-text">` so it can truncate." Svelte: "When you use `children` instead of `label`, wrap the text in `<span class="ui-text">` so it can truncate."
- **Actually:** Chip has no default slot in any component framework, so there is no "instead of `label`" way to pass the text. The components render only the `start`, `label` and `end` slots, the API tables list no default slot or `children`, and `types.react.ts` and `types.svelte.ts` omit `children`. Text passed as default content or `children` is dropped. The page's own What's new says so: "Breaking: the default slot is gone. Pass the text as `label`, or rich content in the `label` slot."
- **Evidence:** `packages/opui/components/Chip/Chip.astro` (template is `<slot name="start" />`, the `label` span with `<slot name="label" />`, `<slot name="end" />`, no `<slot />`), `Chip.vue` (same three slots), `Chip.svelte` (renders `start`, `label`, `end`, never `children`), `Chip.react.tsx` (renders `{start}`, the label span, `{end}`), `types.react.ts` and `types.svelte.ts` (`Omit<ComponentProps<"a">, "children">` etc.), `src/utils/whats-new.ts:402-404`. React 19.3 `renderToStaticMarkup(<Chip start={<svg/>}><span className="ui-text">Child text</span></Chip>)` gives `<div class="ui-chip"><svg></svg></div>` (the child text is gone). 5.4.3: `opui-css@5.4.3/components/Chip/Chip.astro` has `<slot />`, which is what the sentence still describes.
- **Correction:** Replace with "Pass rich content in the `label` slot (the `label` prop for plain text); the component wraps it in `<span class="ui-text">` for you" (React: `label` takes a node).

### Dialog

#### C4-02: Dialog > Long content

- **Severity:** 1 (verified)
- **Double check:** holds on `245eaa1`.
- **Now at:** `src/docs/components/dialog.astro:242`, `src/docs/components/dialog.astro:249`
- **Where:** `src/docs/components/dialog.astro:242,249` (also rendered at /html/components/dialog/#long-content; frameworks: all)
- **Says:** "The dialog grows up to 85% of the viewport height."
- **Actually:** the cap is `calc(85dvb - var(--ui-space-4))`, 85% of the dynamic viewport height minus 1.25rem (660px at an 800px tall viewport, not 680px).
- **Evidence:** `packages/opui/css/components/dialog.css:17`; Chromium 153 at 1000x800: `getComputedStyle(dialog).maxBlockSize` is `660px`.
- **Correction:** "up to 85% of the viewport height, minus `--ui-space-4`".

#### C4-03: Dialog and Drawer > How to close a dialog / drawer

- **Severity:** 1 (verified)
- **Double check:** holds on `245eaa1`.
- **Now at:** `src/components/ClosedbyTable.astro:33`, `dialog.astro:301`, `drawer.astro:200`
- **Where:** `src/components/ClosedbyTable.astro:33` (rendered at /&lt;framework>/components/dialog/#how-to-close and /&lt;framework>/components/drawer/#how-to-close; frameworks: all)
- **Says:** `closedby="none"` closes with "Only your own close button (`command="close"`), `close()` or a form with `method="dialog"`."
- **Actually:** `dialog.requestClose()` and a button with `command="request-close"` also close a `closedby="none"` dialog, so the list is not exhaustive.
- **Evidence:** Chromium 153: modal dialog with `closedby="none"`, `requestClose()` leaves `open === false`; clicking `<button commandfor="..." command="request-close">` also closes it.
- **Correction:** add `requestClose()` and `command="request-close"` to the list, or drop "Only".

#### C4-01: Dialog and Drawer > Installation (page scroll lock)

- **Severity:** 3 (verified)
- **Same issue reported as:** C4-04
- **Double check:** holds on `245eaa1`. One part is overstated: the HTML Dialog page's Migrating from 5.x callout does name `utils.css` (`whats-new.ts:537`, `html` key only). The framework pages show nothing. The MIGRATING.md line is now `:443`.
- **Now at:** `src/docs/components/dialog.astro:75-78`, `src/docs/components/dialog.astro:244`, `src/docs/components/dialog.astro:251`
- **Where:** `src/docs/components/dialog.astro:75-78` (installationTabs: dialog.css and card.css only) and `src/docs/components/dialog.astro:244,251` (also rendered at /html/components/dialog/#installation and #long-content; frameworks: all)
- **Says:** Installation offers `dialog.css` with `card.css` ("Dependencies: Card") as the CSS to copy, and Long content says "A modal dialog also locks page scroll."
- **Actually:** the page lock is the `html:has(.ui-dialog:modal, ...)` rule in `packages/opui/core/utils.css`, which the Installation section never lists. `dialog.css` and `card.css` contain no page lock, so a reader who copies the listed files gets a modal dialog that does not lock scroll.
- **Evidence:** `packages/opui/core/utils.css:47-54`. Chromium 153 on a local page with layers.css, palette.css, theme.css, normalize.css, card.css and dialog.css (no utils.css): after `showModal()` the computed `overflow` of `html` is `visible`; after adding utils.css it is `clip`. `src/docs/guide/getting-started/HTML.astro:28` promises that each component page lists "the files it depends on". The dependency is only named in `src/utils/whats-new.ts:534` and `packages/opui/MIGRATING.md:19` ("Import it too if you import single files"), which a new reader never sees. (`HTML.astro:33` and `PickAndChoose.astro:24-25` describe utils.css as holding only `.ui-sr-only` and the motion classes, a related gap for the guide reviewers.)
- **Correction:** list `core/utils.css` as a dependency of Dialog (or say in Long content that the lock comes from utils.css).
- **TODO.md:** not listed (line 232 and 587 are about the lock's visual strip and cost, not this)
- **Also C4-04 (severity 2):**
  - Double check: holds on `245eaa1`.
  - Now at: `src/docs/components/drawer.astro:74`, `src/docs/components/drawer.astro:138-140`, `src/docs/components/drawer.astro:175-180`
  - Where: `src/docs/components/drawer.astro:74` (installationTabs: drawer.css only) and `src/docs/components/drawer.astro:138,175` (also rendered at /html/components/drawer/#installation and #basics; frameworks: all)
  - Actually: `.ui-scroll-lock` is a utility defined in `packages/opui/core/utils.css`. `drawer.css` only holds the `width < 500px` rule for a transparent backdrop, so the copied file alone does not lock the page. Same gap as C4-01 (the only hint is a comment inside the displayed `drawer.css`).
  - Correction: list `core/utils.css` as a dependency of Drawer, or say the utility class comes from it.

### Divider

#### C8-05: Divider > Spacing

- **Severity:** 2 (verified)
- **Double check:** partly right on `245eaa1`; the fields below are corrected. Accordions also set their own `--ui-divider-gap` (they share the `card.css:16` rule), so they join the list. The page's previous sentence ("Cards, callouts, dialogs and drawers set a tighter value", `divider.astro:111`) can add them too.
- **Now at:** `src/docs/components/divider.astro:113-115`
- **Where:** `src/docs/components/divider.astro:113-114` (rendered at /html/components/divider/#spacing; frameworks: all)
- **Says:** "Set `--ui-divider-gap` on any wrapper to change it for every divider inside."
- **Actually:** a wrapper value does not reach dividers inside an accordion, card, callout, dialog or drawer within it. Those components declare `--ui-divider-gap: var(--ui-space-3)` on their own root, which replaces the inherited value. Only dividers outside such components follow the wrapper; for the others the value has to be set on the component.
- **Evidence:** `packages/opui/css/components/callout.css:21`, `card.css:16` (`:where(.ui-accordion, .ui-card, .ui-dialog)`), `drawer.css:24`. Chromium on /html/components/divider/: `<main style="--ui-divider-gap: 4px">` gives a plain `hr.ui-divider` a 4px margin, but the `hr` inside `.ui-callout > .ui-content` and inside `.ui-card > .ui-content` both get 16px.
- **Correction:** say it changes every divider inside that is not in an accordion, card, callout, dialog or drawer, and that those take the value on the component itself.

### Form

#### C3-05: Form > Changelog > What's new (Astro page only)

- **Severity:** 2 (verified)
- **Double check:** holds on `245eaa1`. Dropping the Astro note keeps `tests/unit/changelog.test.ts` passing: the Form page has other non-Breaking notes.
- **Now at:** `src/utils/whats-new.ts:641`, `packages/opui/CHANGELOG.md:349`
- **Where:** `src/utils/whats-new.ts:638` (`astro:` key of the fourth `form` note), also `packages/opui/CHANGELOG.md:338`; rendered at /astro/components/form/#changelog
- **Says:** "`FieldGroup` names its inputs through context, so a bare `input`, `select` or `textarea` no longer gets the group `name`, like in React, Svelte and Vue." (CHANGELOG: "pass the group `name` and selection to their inputs through context instead of rewriting the slot HTML")
- **Actually:** the last release (5.4.3) did not rewrite the slot HTML either. Its `FieldGroup.astro` sets `Astro.locals.currentFieldName` and renders the slot with `set:html`, and only OPUI components read that local, so a bare `<input>`, `<select>` or `<textarea>` never got the group `name` in 5.4.3. Nothing is lost for someone upgrading from it, so the note describes a change that did not happen since the last release (the rc.1 package already uses the context version).
- **Evidence:** `opui-css@5.4.3/components/FieldGroup/FieldGroup.astro:5-22` (locals plus `set:html={html}`, no attribute rewriting), `opui-css@5.4.3/components/ToggleGroup/ToggleGroup.astro` (same pattern with `Astro.locals.currentToggleGroupName`), `grep -rn 'replace\|rewrite' opui-css@5.4.3/components` finds nothing; `opui-css@6.0.0-rc.1/components/FieldGroup/FieldGroup.astro` already uses `fieldGroupContext.provide`.
- **Correction:** drop the Astro note (and the "instead of rewriting the slot HTML ... bare `<input>`" clause of the CHANGELOG entry), or reword it to say what is new relative to 5.4.3 (context replaces `Astro.locals`).

### Layout

#### C8-08: Layout > Gap

- **Severity:** 1 (verified)
- **Double check:** holds on `245eaa1`. The Gap section now lists `.ui-layout-columns` (added since `c0d4970`) but still leaves out `.ui-layout-media`: the full list is column, row, grid, columns and media. The API row has the opposite gap, see D-01.
- **Now at:** `src/docs/components/layout.astro:185-187`
- **Where:** `src/docs/components/layout.astro:121-129` (rendered at /html/components/layout/#gap; frameworks: all)
- **Says:** "The size classes set the gap of `.ui-layout-column`, `.ui-layout-row` and `.ui-layout-grid`"
- **Actually:** they also set the gap of `.ui-layout-media`, as the Media section ("The size classes set the gap.") and the API row ("...`.ui-layout-grid` and `.ui-layout-media`") say.
- **Evidence:** `packages/opui/css/components/layout.css:63-75` (the selector list includes `.ui-layout-media`), `src/component-api/layout/api.ts:49`.
- **Correction:** add `.ui-layout-media` to the list.

#### D-01: Layout > API (`size` row)

- **Severity:** 1 (verified by the coordinator)
- **Double check:** found during the double check, on `245eaa1`.
- **Where:** `src/component-api/layout/api.ts:81` (rendered at /html/components/layout/#api; frameworks: all)
- **Says:** "The space between children of `.ui-layout-column`, `.ui-layout-row`, `.ui-layout-grid` and `.ui-layout-media`."
- **Actually:** the size classes also set the gap of `.ui-layout-columns`, added since `c0d4970`. The page's Gap section lists `.ui-layout-columns` but not `.ui-layout-media` (C8-08), so neither list is complete.
- **Evidence:** `packages/opui/css/components/layout.css:151-170` (`:where(.ui-layout-column, .ui-layout-row, .ui-layout-grid, .ui-layout-columns, .ui-layout-media)` with `.ui-x-small`, `.ui-small` and `.ui-large`).
- **Correction:** add `.ui-layout-columns`, so both lists name all five.

#### C8-07: Layout > Media

- **Severity:** 3 (verified)
- **Double check:** holds on `245eaa1`.
- **Now at:** `src/docs/components/layout.astro:175-176`, `src/component-api/layout/api.ts:67`, `src/utils/whats-new.ts:656`
- **Where:** `src/docs/components/layout.astro:110-113`, `src/component-api/layout/api.ts:35`, `src/utils/whats-new.ts:651` (rendered at /html/components/layout/#media, the API table and the What's new; frameworks: all)
- **Says:** "The last child fills the rest of the row, truncates instead of pushing the row wider"; API: "next to text that fills the rest and truncates"; What's new: "next to text that fills the rest and truncates."
- **Actually:** nothing is truncated. The last child gets `min-inline-size: 0` so it can shrink and the row is not pushed wider, but ordinary text wraps onto more lines and an unbreakable string overflows the child. There is no `overflow`, `text-overflow` or `white-space` rule.
- **Evidence:** `packages/opui/css/components/layout.css:41-61`. Chromium, `.ui-layout-media` 300px wide with an avatar and a long caption: row stays 300px, last child 244px; normal text wraps to 86px high; an unbreakable word gives `scrollWidth` 838 against `clientWidth` 244 with `overflow: visible` and `text-overflow: clip`.
- **Correction:** say the last child can shrink below its content width so long content wraps instead of widening the row, and that truncation needs `overflow: hidden; text-overflow: ellipsis; white-space: nowrap` on the text.

### List

#### C5-12: List > Borders > On every item

- **Severity:** 1 (probable)
- **Double check:** holds on `245eaa1`. The h3 "On every item" (`list.astro:443`) has the same slant ("Between items" would match).
- **Now at:** `src/docs/components/list.astro:446-447`, `src/docs/components/list.astro:450-451`
- **Where:** `src/docs/components/list.astro:444-450` (rendered at /html/components/list/#on-every-item; frameworks: all)
- **Says:** "Apply the `.ui-bordered` class on the `ul.ui-list` element to give all list items a border." (components: "Add the `bordered` prop to the `List` to give all list items a border.")
- **Actually:** `.ui-bordered` draws a divider line above every item except the first. It does not put a border around each item and the first item gets none. The List API row ("Adds a border between list items.") and Under the hood ("a line between items, never above the first") say so; the section text does not.
- **Evidence:** `packages/opui/css/components/list.css:87` (`&.ui-bordered > :where(li + li, option + option)` with `margin-block-start` and a `::before` `border-block-start`); `src/component-api/list/api.ts:30`; `src/components/UnderTheHood/ListBuild.astro:103`.
- **Correction:** "to draw a line between the list items".

#### C5-02: List > Changelog > What's new

- **Severity:** 2 (verified)
- **Double check:** holds on `245eaa1`. The Dense note just above (`whats-new.ts:710`) already names `--ui-control-size-small`, so "Row heights follow `--ui-control-size`." alone also works.
- **Now at:** `src/utils/whats-new.ts:712`
- **Where:** `src/utils/whats-new.ts:705` (rendered at /html/components/list/#changelog; frameworks: all)
- **Says:** "Row heights follow `--ui-control-size` and the `--ui-button-size-*` scale."
- **Actually:** list rows read `--ui-control-size` (default rows) and `--ui-control-size-small` (dense rows). `list.css` and `menu.css` never read a `--ui-button-size*` token. The `--ui-button-size-*` tokens are defined from the `--ui-control-size-*` ones, not the other way round, so changing `--ui-button-size-small` does not change a row.
- **Evidence:** `packages/opui/css/components/list.css:116,174,214,260` (`min-block-size: var(--ui-control-size)` and `var(--ui-control-size-small)`), no `button-size` match in `list.css` or `menu.css`; `packages/opui/css/theme.css:304-317`.
- **Correction:** "Row heights follow `--ui-control-size` and `--ui-control-size-small`."

#### C5-04: List > API (HTML) > List item API > State

- **Severity:** 2 (verified)
- **Double check:** holds on `245eaa1`. Add that a `<label>` row dims when its `<input>` is disabled (`choice.css:48`): "`[disabled]` and `[aria-disabled="true"]` go on the `<a>` or `<button>` (a `<label>` row dims when its input is disabled); `[aria-current="page"]` on the `<a>`, `<button>` or `<label>`."
- **Now at:** `src/component-api/list-item/api.ts:59`
- **Where:** `src/component-api/list-item/api.ts:58-67` (rendered at /html/components/list/#list-item-api; frameworks: html)
- **Says:** "Highlights the current item, or dims a disabled one. Set it on the `<a>`, `<button>` or `<label>`." (values `[aria-current="page"]`, `[aria-disabled="true"]`, `[disabled]`)
- **Actually:** `aria-current="page"` is styled on `a`, `button` and `label`, but `[disabled]` and `[aria-disabled="true"]` only dim an `a` or a `button`. A `<label>` row with `aria-disabled="true"` or `disabled` is not dimmed.
- **Evidence:** `packages/opui/css/components/list.css:285` (`& > :where(a, button):is([disabled], [aria-disabled="true"])`) against `:274` (`aria-current` under `& > a, & > button, & > label`). Chromium probe on /html/components/list/: `label[aria-disabled="true"]` and `label[disabled]` rows have `opacity: 1`; `a[aria-disabled]` and `button[disabled]` rows have `0.64`; `label[aria-current]` and `button[aria-current]` get the selected background and bar.
- **Correction:** say the disabled values go on the `<a>` or `<button>`, and the current value on the `<a>`, `<button>` or `<label>`.

#### C5-05: List > Browser support

- **Severity:** 2 (verified)
- **Double check:** holds on `245eaa1`. The link is not baseless: ListItem has a `submenu` slot, which is what the iOS block re-anchors, so the second option (say the fallback is for a submenu in a `Menu`) is the better fix. The TODO item is now `TODO.md:746`.
- **Now at:** `src/components/BrowserSupport.astro:18-20`, `src/components/BrowserSupport.astro:35-49`, `src/component-api/list-item/api.ts:5`
- **Where:** `src/components/BrowserSupport.astro:35-48`, fed by `src/component-api/list-item/api.ts:5` (`css: ["list", "menu"]`) (rendered at /html/components/list/#browser-support; frameworks: all)
- **Says:** "The compat layer has fallbacks for it in `css/compat/menu.css`."
- **Actually:** none of the List page's listed features (color-mix, container style queries, `:dir()`, `:has()`, `overflow: clip`, relative colors) has a fallback in `compat/menu.css`. That file holds one iOS Safari fix for the anchor of a submenu of a `Menu`. The sentence shows on the List page only because the ListItem `api.ts` lists `menu` as one of its stylesheets.
- **Evidence:** `packages/opui/css/compat/menu.css:1-20` (`@supports (-webkit-touch-callout: none)`, `anchor-name` / `position-anchor` for `.ui-menu[popover]`); `packages/opui/css/compat.css` imports only avatar, menu and tooltip.
- **Correction:** leave `menu.css` out of the compat sentence on the List page (for example filter it to the stylesheets whose features the page lists), or reword it to say the Menu has the fallback.
- **TODO.md:** not listed (related: TODO.md:728 on the Menu compat block)

### Menu

#### C4-06: Menu (and Anchor) > examples

- **Severity:** 1 (probable)
- **Double check:** partly right on `245eaa1`; the fields below are corrected. The original correction understated the fix: changing the examples alone would drift from the components' own output, and a `div` floating root alone stays invalid inside `span.ui-anchor`.
- **Now at:** `src/component-examples/menu/Basics.html:11-14`, `src/component-examples/anchor/AlwaysVisible.html:3-9`, `RepoCard.html:13-37`, `LinkPreview.html:13-24`, `packages/opui/components/ListItem/ListItem.astro:50-107`, `Anchor/Anchor.astro:30`, `Anchor/AnchorContent.astro`
- **Where:** `src/component-examples/menu/Basics.html:11-14` (the same `button > div.ui-text > p` in Bordered, Custom, Dense, Manual, Placement and Submenu, all formats, and in the markup `Menu` itself renders from `items`), and `src/component-examples/anchor/AlwaysVisible.html:3-9`, `RepoCard.html:13-37`, `LinkPreview.html:13-24` (a `div`, `hgroup`, `p` inside `span.ui-floating`)
- **Says:** the code samples read as ordinary HTML to copy.
- **Actually:** by the HTML content models, `<button>` and `<span>` take phrasing content only, so `div` and `p` inside a `button`, and a `div` card inside `span.ui-floating`, are invalid nesting. Browsers parse and render them fine; a validator will flag them. It mirrors the components' own output, so this may be accepted as a repo convention.
- **Evidence:** rests on my knowledge of the HTML content models (button: phrasing content only; span: phrasing content); no validator is installed offline to confirm. Chromium renders and behaves correctly (probed).
- **Correction:** none needed if the convention is intended. Otherwise it is a library-wide markup change, not an example edit: `span`s inside the clickable row in ListItem and Menu in all four frameworks (and the `list.css:334` `p + p` rule that styles the description line, plus the parity snapshots), and a `div` for both `.ui-anchor` and `.ui-floating` where the anchor sits in flow content. A `div` floating root inside a `span.ui-anchor` is still invalid.

### Number stepper

#### D-02: Number stepper > Browser support (Invoker Commands)

- **Severity:** 2 (verified by the coordinator)
- **Double check:** found during the double check, on `245eaa1`.
- **Where:** `src/docs/components/number-stepper.astro:33` (`browserSupport`; rendered in the page's browser support chips and in the Features by component list of /html/guide/browser-support/; frameworks: all)
- **Says:** `invoker-commands` in the page's `browserSupport` list
- **Actually:** since f31976f the stepper doesn't use Invoker Commands. `elements/number-stepper.js` steps on `click` and Space `keydown` and reads the `command` attribute only to tell the two buttons apart, so the buttons work in browsers without the feature (Firefox before 144, Safari before 26.2). The list names a requirement the component no longer has.
- **Evidence:** `packages/opui/elements/number-stepper.js:71-91` (`#click`, `#directionOf` reads `button[command]`, `#keydown` for Space); commit f31976f ("NumberStepper fits its value and steps on click and Space").
- **Correction:** drop `invoker-commands` from the list (and with it Number Stepper from the invokers bullet, G2-19).

### Progress

#### C8-06: Progress > Usage and Variants

- **Severity:** 2 (verified)
- **Double check:** partly right on `245eaa1`; the fields below are corrected. The `<meter>` option is dropped from the correction: there is no Meter component or meter styling (`progress.css` styles only `.ui-progress > progress`), so a `<meter>` would render unstyled and stop demoing the variant.
- **Now at:** `src/docs/components/progress.astro:56-60`, `src/component-examples/progress/Surfaces.html:2,5`, `Surfaces.astro:5-6`, `Surfaces.react.tsx:7,12`, `Surfaces.svelte:5-6`, `Surfaces.vue:6-7`, `progress.astro:88`
- **Where:** `src/docs/components/progress.astro:56-60` against `src/component-examples/progress/Surfaces.html:2,5` (also `Surfaces.astro:5-6`, `Surfaces.react.tsx:7,12`, `Surfaces.svelte:5-6`, `Surfaces.vue:6-7`; rendered at /html/components/progress/#variants; frameworks: all)
- **Says:** (When not to use) "A measurement that isn't progress, like disk usage or a score. That's a `<meter>`." The Variants example is `<progress aria-label="Storage used" value="25" max="100">` and `<progress aria-label="Memory used" value="75" max="100">`.
- **Actually:** the two Variants examples are labeled as measurements (storage used, memory used), the case the page says belongs to `<meter>`. They model the misuse the Usage list warns against, and readers copy examples.
- **Evidence:** the two files above; the Inline and Determinate examples ("Uploading") are real progress.
- **Correction:** label the Variants examples as tasks (for example "Uploading" and "Importing") in all five formats.

### Range

#### C3-07: Range > Value (ValueText example)

- **Severity:** 2 (verified)
- **Double check:** holds on `245eaa1`. Say how the value stays in sync, since a static attribute goes stale after the first step: HTML and Astro update `aria-valuetext` in the same `input` listener (starting from `aria-valuetext="21°"`), React needs state from `onChange` (the example is uncontrolled), Svelte binds the value and builds the attribute from it, and Vue uses `v-model` with `:aria-valuetext`.
- **Now at:** `src/docs/components/range.astro:193-194`, `src/docs/components/range.astro:199-200`
- **Where:** `src/component-examples/range/ValueText.html:3-14` (and `ValueText.astro`, `ValueText.react.tsx`, `ValueText.svelte`, `ValueText.vue`), text at `src/docs/components/range.astro:193-194` (html) and `:199-200` (components); rendered at /html/components/range/#value
- **Says:** "A custom readout sets its own `aria-valuetext` when it adds a unit or words." (components: "With custom value text, pass your own `aria-valuetext` when the readout adds a unit or words.")
- **Actually:** the page's own custom-readout example adds a unit and does not do it. The readout is `<b>21°</b>` (kept in step by an inline script) and the `<input>` has no `aria-valuetext`, in all five formats, so a screen reader announces "21" without the degree sign, which is the case the sentence above it says to handle. (`aria-valuetext` is only added by the component or by `range.js`, and `range.js` does not touch an output without `data-live`.)
- **Evidence:** `src/component-examples/range/ValueText.html` (input has `aria-labelledby`, `id`, `min`, `max`, `value` only; script only writes `value.textContent`); `packages/opui/css/js/range.js:15-26` (`update()` returns at line 19 without a `[data-live]` output); `packages/opui/components/Range/Range.astro:101-102` (`aria-valuetext` is the passed one, else the generated one only when `valueSuffix && !hasValueText`).
- **Correction:** give the ValueText example an `aria-valuetext` that its script keeps in sync with the readout (and pass `aria-valuetext` in the four framework versions).
- **TODO.md:** line 681 (answered: "the Value and ValueText examples carry the attributes in all five formats" and "A custom readout (`value-text`) gets no `aria-valuetext` ... the page says to pass one"; the ValueText examples carry `aria-live="off"` on the output but no `aria-valuetext`, checked in Chromium on all five framework pages)

### Switch

#### C2-07: Switch > Icons (and Anatomy, API parts)

- **Severity:** 3 (verified)
- **Double check:** holds on `245eaa1`. The wrong part text also ships in the generated `packages/opui/skills/opui/references/switch.md:15-16`.
- **Now at:** `src/docs/components/switch.astro:226`, `src/docs/components/switch.astro:238`, `src/docs/components/switch.astro:243`, `src/component-api/switch/api.ts:162`, `src/component-api/switch/api.ts:167`, `packages/opui/skills/opui/references/switch.md:15-16`
- **Where:** `src/docs/components/switch.astro:226` (components), `:238` (react), `:243` (svelte); `src/component-api/switch/api.ts:162` and `:167` (the two part descriptions, rendered in the Anatomy list and the Parts table on every framework, and as the `icon-unchecked`, `icon-checked`, `iconUnchecked`, `iconChecked` rows of the slot and prop tables). Rendered at /html/components/switch/#icons and #api (frameworks: all; the html page only has the part descriptions).
- **Says:** "Put an icon in the `icon-unchecked` and `icon-checked` slots to show it in the thumb." (react: "`iconUnchecked` and `iconChecked` props", svelte: "snippets"); part descriptions "An optional icon in the thumb when unchecked." and "An optional icon in the thumb when checked."
- **Actually:** the icon is drawn on the track, on the side the thumb is not on, not in the thumb. The unchecked icon sits at the end of the track while the thumb is at the start, and the checked icon sits at the start while the thumb is at the end. The Under the hood Icons step on the same page says so ("Each icon sits on the side the dot is not"), and so does the `--_icon-size` row ("computed to fit beside the thumb").
- **Evidence:** `packages/opui/css/components/switch.css:145-148` (`.ui-icon-unchecked` gets `margin-inline-start: calc(track-inline-size - icon-size - thumb-inset)`) and `:120-123` (`.ui-icon-checked` gets `margin-inline-start: var(--_thumb-inset)`) against `:65` (thumb at `inset-inline-start: var(--_thumb-inset)` unchecked) and `:90-92` (`calc(track - thumb - inset)` checked); `src/components/UnderTheHood/SwitchBuild.astro` Icons step notes; Chromium on /html/components/switch/#icons: the small unchecked switch (track 40x20, thumb `inset-inline-start: 4px`, 12px) has its moon icon at offset 24px from the track start, the medium checked switch (track 48x24, thumb at 28px) has its sun icon at offset 4px; the screenshot shows the moon at the right of the empty track with the thumb at the left, and the sun at the left with the white thumb at the right.
- **Correction:** say "to show it on the track, beside the thumb" and describe the parts as "An optional icon on the track, shown while unchecked" and "... while checked".

### Table

#### C5-11: Table > API (HTML) > Table header cell API > Sortable

- **Severity:** 2 (verified)
- **Double check:** holds on `245eaa1`. The option type already has `htmlDescription` (`src/component-api/types.ts:35`), so the HTML text can go there.
- **Now at:** `src/component-api/table-header-cell/api.ts:18`
- **Where:** `src/component-api/table-header-cell/api.ts:14-21` (rendered at /html/components/table/#table-header-cell-api; frameworks: html)
- **Says:** "Wraps the label in a `<button>` that sorts the table by this column, inside a `SortableTable`." (modifier `[data-sort]`)
- **Actually:** in HTML, `data-sort` wraps nothing. The author writes the `<button type="button">` around the label, and the element only sorts a header that matches `th[data-sort] > button`. Only the `sortable` prop of the components wraps the label. "inside a `SortableTable`" also names a component that does not exist in HTML (`<opui-sortable-table>`).
- **Evidence:** `packages/opui/elements/sortable-table.js:3` (`const BUTTON = "th[data-sort] > button"`); `src/docs/components/table.astro:289-293` and `src/component-api/sortable-table/api.ts:11` (HTML text: "add `data-sort` to each header to sort by, with its label in a `<button type="button">`"); `packages/opui/components/Table/TableHeaderCell.astro:52-65` (the component renders the button).
- **Correction:** give the HTML row its own text, for example "Marks the header as sortable, with its label in a `<button type="button">`, inside `<opui-sortable-table>`."

#### C5-08: Table > Keyboard support, Sticky header, In a card, Accessibility, API, Under the hood

- **Severity:** 3 (verified)
- **Double check:** holds on `245eaa1`. Only `table/api.ts:9` and `table.astro:263-266` are false; the other lines are advice that stays true across engines because of Safari.
- **Now at:** `src/component-api/table/api.ts:9`, `src/docs/components/table.astro:263-266`, `table.astro:216-217`, `table.astro:382-383`, `table/api.ts:50`, `TableBuild.astro:127`
- **Where:** `src/component-api/table/api.ts:9` (Tab row, rendered at /html/components/table/#keyboard-support); `src/docs/components/table.astro:263-266` (Sticky header); also `table.astro:216` (In a card), `table.astro:382-383` (Accessibility), `src/component-api/table/api.ts:50` (Overflow row), `src/components/UnderTheHood/TableBuild.astro:127` (Sticky header step); frameworks: all
- **Says:** "Moves focus to a scrolling table, or to its scroll box, when it has `tabindex="0"`. A table without one isn't a tab stop." (api.ts:9); "A table has nothing focusable, so without `tabindex` keyboard users can't reach the box to scroll it" (table.astro:264-265)
- **Actually:** a scroll container with no focusable content is a Tab stop without `tabindex` in Chromium (keyboard focusable scrollers, which I recall shipping in Chrome 130; confirmed in 153 below) and, from my knowledge, in Firefox. Only Safari leaves it out. `tabindex="0"` is still the right advice for Safari (and gives the box a role and name), but the statements are flat and false for Chromium.
- **Evidence:** Chromium 153 on /html/components/table/ with fixtures added to the page: Tab from a button before them lands on a `div` with `overflow: auto` and `max-block-size` holding a `.ui-sticky-header` table, and on a `.ui-table.ui-overflow-scroll` table (`display: block`, scrollable), both with no `tabindex` (order: before, box1, mid1, box2, mid2, t3, mid3, t4, after); ArrowDown, Home, End, PageDown and PageUp then scroll the box. The repo knows it: TODO.md:667 "Chromium and Firefox make such a scroller focusable, Safari doesn't".
- **Correction:** say that Safari does not make a scroll container focusable, so `tabindex="0"` is what makes the box reachable there (as the Dialog "Long content" section already does), and reword the Tab row.
- **TODO.md:** related, lines 667-671 (Dialog, same fact)

### Tabs

#### C6-03: Tabs > Changelog > What's new

- **Severity:** 2 (verified)
- **Double check:** holds on `245eaa1`. The component pages share this note, so "tabs that scroll (`overflow="scroll"`, `.ui-overflow-scroll`)" reads better there than the class alone.
- **Now at:** `src/utils/whats-new.ts:1165`
- **Where:** `src/utils/whats-new.ts:1145` (rendered at /&lt;framework>/components/tabs/#changelog; frameworks: all)
- **Says:** "The focus ring sits at `--ui-focus-ring-inset`, like every other inset ring."
- **Actually:** Only `.ui-overflow-scroll` tabs and tabs that are a direct child of an Accordion, Card or Dialog draw the ring inset. A plain `.ui-tabs` and `.ui-tabs.ui-line` draw it outside the pill at `--ui-focus-ring-offset` (2px).
- **Evidence:** `packages/opui/css/components/tabs.css:63-73` (default `outline-offset: var(--ui-focus-ring-offset)`, line 71) versus `tabs.css:201-204` and `tabs.css:226-231` (`var(--ui-focus-ring-inset)` only under `:where(.ui-accordion, .ui-card, .ui-dialog) > &` and `.ui-overflow-scroll`). Chromium, keyboard focus after ArrowRight, computed `outline-offset` of `.ui-label::before` after the 0.2s ring animation: default tabs 2px, `.ui-line` 2px, `.ui-overflow-scroll` -2px, tabs in `.ui-card` -2px. `packages/opui/CHANGELOG.md:585` words it correctly ("`Tabs` directly in an `Accordion`, `Card` or `Dialog` draw the focus ring inside").
- **Correction:** "Tabs directly in an Accordion, Card or Dialog, and tabs with `.ui-overflow-scroll`, draw the focus ring at `--ui-focus-ring-inset`, like every other inset ring."

#### C6-04: Tabs > Changelog > Migrating from 5.x (React and Svelte pages)

- **Severity:** 2 (verified)
- **Double check:** holds on `245eaa1`. Drop "(`htmlFor` in React)" too, once React no longer gets the note. The first pass listed two lines (837, 989) that are not `Breaking:` notes; the list is corrected.
- **Now at:** `src/utils/whats-new.ts:1156-1158`
- **Where:** `src/utils/whats-new.ts:1136-1138` (the `components(...)` helper puts it on astro, react, svelte and vue; rendered at /react/components/tabs/#changelog and /svelte/components/tabs/#changelog)
- **Says:** "`TabsItem` `tabId` is `id`, and `TabsLabel` `tabId` is `for` (`htmlFor` in React), the native names." under "Migrating from 5.x"
- **Actually:** 5.x had no React or Svelte components, so there is no React or Svelte `tabId` to migrate from; the note is true for Astro and Vue only. The neighbouring Breaking notes about 5.x props (`open`, `panelId`, `TabsTab`) use `slots(...)` (astro and vue) for that reason.
- **Evidence:** 5.4.3 `package.json` exports only `./astro` and `./vue`; `opui-css@5.4.3/components/Tabs/` has only `Tabs.astro`/`Tabs.vue`, `TabsItem.*`, `TabsTab.*`, `TabsPanel.*` (no `.svelte`, no `.tsx`), and its `TabsItem.astro` takes `tabId` and `panelId`. `packages/opui/CHANGELOG.md:5` lists "React and Svelte components" as new in 6.0. Rendered text: the React and Svelte pages list the item under "Migrating from 5.x".
- **Correction:** Use `slots(...)` for the `tabId` note, so React and Svelte pages don't list it. The same `components(` wrapper around a `Breaking:` note is at `whats-new.ts` lines 107, 110, 192, 435, 700, 966, 969, 972, 1209 and 1278 on the current tree (other pages, not checked for the same issue).

#### C6-05: Tabs > Keyboard support

- **Severity:** 3 (verified, re-checked by the coordinator)
- **Double check:** holds on `245eaa1`.
- **Now at:** `src/component-api/tabs/api.ts:13`, `TODO.md:735`
- **Where:** `src/component-api/tabs/api.ts:13` (rendered at /&lt;framework>/components/tabs/#keyboard-support; frameworks: all)
- **Says:** "Moves focus to the previous or next tab and selects it, wrapping around at the ends (Safari stops at the first and the last). Left and Right follow the reading direction."
- **Actually:** True in Chromium and Firefox, not in Safari. WebKit's radio-group code ignores the text direction: `bool forward = (key == "Down"_s || key == "Right"_s);`, with the comment "even for RTL, left still means previous radio button (and so moves to the right)". In a right-to-left `.ui-tabs`, Safari moves Left to the previous tab (DOM order, on the right) and Right to the next, the opposite of Chromium and Firefox. The "stops at the first and the last" part matches WebKit (no wrap).
- **Evidence:** WebKit main `Source/WebCore/html/RadioInputType.cpp:138-145` (read from raw.githubusercontent.com; Safari itself not run). Blink `third_party/blink/renderer/core/html/forms/radio_input_type.cc:142-145` uses `ComputedTextDirection() == TextDirection::kRtl ? (ArrowDown || ArrowLeft) : (ArrowDown || ArrowRight)`. Firefox `dom/html/HTMLInputElement.cpp:4368-4372` `isRtl == (aKeyCode == NS_VK_LEFT) ? Forward : Back`. Chromium 153 probe on /html/components/tabs/ with `dir="rtl"` on `.ui-tabs`: from the first tab, Left goes to the second, then the third, then wraps to the first; Right goes backwards (LTR is the mirror image).
- **Correction:** "Left and Right follow the reading direction in Chromium and Firefox; Safari always takes Left as the previous tab."
- **TODO.md:** line 721 (open item about exactly this row; its "Explained" note says Firefox and Safari were never run)

### Text field

#### C1-05: Text field > API (`characterCount`, `passwordToggle` rows) and Textarea > API (`characterCount` row), Astro, React, Svelte and Vue pages

- **Severity:** 1 (probable)
- **Double check:** holds on `245eaa1`.
- **Now at:** `src/component-api/text-field/api.ts:44`, `src/component-api/textarea/api.ts:39`
- **Where:** `src/component-api/text-field/api.ts:43-44` and `:102`; `src/component-api/textarea/api.ts:39`
- **Says:** "The count needs `opui-css/elements/character-count.js`." and "The button needs `opui-css/elements/text-field.js`."
- **Actually:** every component loads its element itself (`packages/opui/components/TextField/TextField.astro:171-174`, `TextField.svelte:2-3`, `TextField.vue:2-3`, React `useEffect` import at `TextField.react.tsx:48-51`; same for Textarea), and the same pages' What's new says "run by the `<opui-text-field>` custom element, which the component loads". The Number stepper and Color field rows say who loads it, so a reader of the Text field rows may add an import that is not needed.
- **Evidence:** the files above; `src/component-api/number-stepper/api.ts:4-5,37-41`; `src/docs/guide/concepts.astro:557-560` ("The Astro components load their element, and React, Svelte and Vue load it on the client").
- **Correction:** use the Number stepper wording ("The component loads ..., or the page imports ...").

#### C1-06: Text field > Accessibility > Keyboard support

- **Severity:** 2 (verified; raised from 1 in the double check)
- **Double check:** holds on `245eaa1`. Raised because the Keyboard support row names the wrong action for Enter on one of the page's own examples.
- **Now at:** `src/component-api/text-field/api.ts:9`, `src/component-api/text-field/api.ts:14`
- **Where:** `src/component-api/text-field/api.ts:7-16` (rendered at /html/components/text-field/#keyboard-support; frameworks: all)
- **Says:** `Enter`: "In the field, submits the form it's in, when the form has a submit button." and `Space`: "On a file input, opens the file picker."
- **Actually:** on a file input (the page's File example) Enter opens the file picker too and does not submit the form. A form with a single text field and no submit button also submits on Enter (implicit submission), so "when the form has a submit button" is not the only case.
- **Evidence:** Chromium probe on /html/components/text-field/: a focused `input[type=file]` fires a `filechooser` for both Space and Enter; a form with one text input and no submit button submits on Enter. The second point rests on the HTML implicit submission rules as well.
- **Correction:** "`Enter`, `Space`: On a file input, opens the file picker", and say Enter submits "when the form has a submit button or only one field that blocks implicit submission".

#### C1-02: Text field > Component properties > `--_accent` (the same row is on Textarea, Number stepper, Color field and Select)

- **Severity:** 3 (verified)
- **Double check:** partly right on `245eaa1`; the fields below are corrected. The row is wrong for text-entry fields, but file and color inputs and a Select do show the accent border on click. The row now also renders on the One-time code page (new since `c0d4970`).
- **Now at:** `src/component-api/custom-properties/text-field.ts:4-8`, `TextFieldBuild.astro:40-48,64-67`, `TextareaBuild.astro:35-43,55`
- **Where:** `src/component-api/custom-properties/text-field.ts:4-8` (rendered at #component-properties on /html/components/text-field/, /textarea/, /number-stepper/, /color-field/, /select/; frameworks: all). Related picture in `src/components/UnderTheHood/TextFieldBuild.astro:66-67` and `TextareaBuild.astro:55`.
- **Says:** "`--_accent` (Input): Border color of `.ui-field` when focused with a pointer; keyboard focus shows the focus ring instead. Defaults to `--ui-primary`, `--ui-invalid` when invalid."
- **Actually:** on a text-entry control (text, email, password, number, textarea, the Color field input) a mouse click also matches `:focus-visible`, so the focus ring is drawn and the border keeps its normal color. The accent border rule only applies when the focused input does not match `:focus-visible`, which these inputs never do after a click. Setting `--_accent` changes nothing on a clicked text-entry field; it does color the border of a clicked `type="file"` or `type="color"` input (both shown on the Text field page) and of a Select picked with the pointer. The Under the hood steps draw both the accent border and the ring, which the library does not do for text inputs. (G2-09 takes this border for a primary-colored focus cue.)
- **Evidence:** `packages/opui/css/components/text-field.css:295-301` (accent border only inside `:not(:has(:focus-visible))`) and `:303-310` (ring when `:has(:focus-visible)`); Chromium probe, mouse click on the docs inputs: text field, textarea, number input and color-field input each report `:focus-visible` true, `outline: solid 2px`, and `.ui-field` `border-color` unchanged (`oklch(0.57 0.01 255)`, light mode). Select was not tested (its pointer focus opens a popup).
- **Correction:** "Border color of `.ui-field` when its control has focus without `:focus-visible`, such as a clicked file or color input or a Select picked with the pointer. Text-entry fields show the focus ring on click too."

### Textarea

#### C1-07: Textarea > API (note under the Parts table)

- **Severity:** 1 (verified)
- **Double check:** partly right on `245eaa1`; the fields below are corrected. `name` is a documented prop, so it can't be the example, and the note only renders on the framework pages.
- **Now at:** `src/component-api/textarea/api.ts:24`, `src/component-api/frameworks.ts:76`
- **Where:** `src/component-api/textarea/api.ts:24` (`passThrough("textarea", "label", ["placeholder", "rows"], ...)`, built by `src/component-api/frameworks.ts:66-82`; rendered at /astro, /react, /svelte and /vue/components/textarea/#api; the HTML page has no pass-through note)
- **Says:** "Attributes that aren't props go to the `<textarea>`, like `placeholder` and `rows`, and `class` and `style` go to the root `<label>`."
- **Actually:** the attributes do go to the `<textarea>`, but `rows` is a poor example: the textarea sizes itself with `field-sizing: content` and a three-line minimum, so `rows` changes nothing wherever `field-sizing` is supported. A reader who passes `rows` to get a taller textarea sees no change.
- **Evidence:** `packages/opui/css/components/textarea.css:5-11` (`field-sizing: content`, `min-block-size: calc(... + 3lh)`); Chromium probe on /html/components/textarea/: the Outlined textarea is 76px high with `rows` unset, `rows="10"` and `rows="1"`.
- **Correction:** swap the example for `maxlength` (`name` is a documented Textarea prop, so it can't illustrate attributes that aren't props), or note that `rows` has no effect with `field-sizing`.

### Toggle

#### C3-09: Toggle > Under the hood > Step 4 Group

- **Severity:** 1 (verified)
- **Double check:** holds on `245eaa1`.
- **Now at:** `src/components/UnderTheHood/ToggleBuild.astro:114`
- **Where:** `src/components/UnderTheHood/ToggleBuild.astro:114`; rendered at /html/components/toggle/#under-the-hood (frameworks: all)
- **Says:** "Each toggle draws a divider on its start and top edge, the group clips the outer ones"
- **Actually:** the divider is a physical `box-shadow` of `-1px 0 0 0` plus `0 -1px 0 0`, so it sits on the left and top edge in both directions. In right-to-left text that is each toggle's end edge, not its start edge (only the forced-colors rules use logical `border-inline-start`). The separators between buttons still show in RTL, because unchecked toggles are transparent.
- **Evidence:** Chromium 153 on /html/components/toggle/ with `dir="rtl"` on a three-button group: each `label` computes `box-shadow: ... -1px 0px 0px 0px, ... 0px -1px 0px 0px` (same as LTR) and a screenshot shows the divider between "Day" (rightmost, first in the DOM) and "Week" is the left shadow of "Day", which is its end edge; `packages/opui/css/components/toggle-group.css:24-26` (physical offsets) against `:78-80` (logical, forced colors only).
- **Correction:** "on its left and top edge" (or "on its leading edge in left-to-right text").

### Tooltip

#### C4-07: Tooltip > Installation (generated import line)

- **Severity:** 2 (verified)
- **Double check:** holds on `245eaa1`.
- **Now at:** `src/utils/component-imports.ts:36-45`, `src/utils/component-imports.ts:69`, `src/components/Installation.astro:74-80`
- **Where:** `src/utils/component-imports.ts:36-41,59-69` (the filter `ownFolders.has(folders.get(name))`), rendered at /astro|react|svelte|vue/components/tooltip/#installation
- **Says:** "Import the component from `opui-css/react`:" followed by `import { Tooltip } from "opui-css/react"` (same with astro, svelte, vue)
- **Actually:** the page tells the reader to put the tooltip in `TooltipContent`, and every Tooltip example imports it, but the generated import omits it. `TooltipContent` is exported from `../components/Anchor/AnchorContent`, a folder the generator does not count as the Tooltip page's own, so it is dropped. Dialog, Drawer and Anchor list their part components; Tooltip does not.
- **Evidence:** `packages/opui/react/index.ts:79` (`export { default as TooltipContent } from "../components/Anchor/AnchorContent.react"`, likewise astro:78, svelte:80, vue:78); `src/component-examples/tooltip/Basics.react.tsx:1` (`import { Button, Tooltip, TooltipContent } from "opui-css/react"`); rendered page text in all four component frameworks shows only `Tooltip`.
- **Correction:** make the generator include `TooltipContent` for the Tooltip page ("Import the components ... `Tooltip, TooltipContent`").

### Typography

#### C8-14: Typography > Classless showcase (example text)

- **Severity:** 1 (verified)
- **Double check:** holds on `245eaa1`.
- **Now at:** `src/component-examples/typography/Default.html:159`
- **Where:** `src/component-examples/typography/Default.html:159` (rendered at /html/components/typography/#rich-text-showcase and on every framework page; frameworks: all)
- **Says:** `<pre><code>npm install @opui/css</code></pre>`
- **Actually:** the package is `opui-css`; `@opui/css` is only the docs site's import alias and is not on npm.
- **Evidence:** `npm view @opui/css` returns E404; `packages/opui/package.json` name `opui-css`.
- **Correction:** `npm install opui-css`.

#### C8-15: Typography > Classless showcase (example text)

- **Severity:** 1 (verified)
- **Double check:** partly right on `245eaa1`; the fields below are corrected. The original first alternative ("No class names on the content below") repeats the false claim while the `.ui-not-rich-text` demo sits below it.
- **Now at:** `src/component-examples/typography/Default.html:7`, `src/component-examples/typography/Default.html:467`
- **Where:** `src/component-examples/typography/Default.html:7`, contradicted by `:467` (rendered at /html/components/typography/#rich-text-showcase; frameworks: all)
- **Says:** "Not a single class name below, just plain HTML."
- **Actually:** the example later uses `<div class="ui-not-rich-text">` (line 467) and shows `class="ui-rich-text"` inside a code block (line 345).
- **Evidence:** `grep -n 'class=' Default.html` lists lines 1, 345 and 467.
- **Correction:** "Plain HTML below, apart from the `.ui-not-rich-text` opt-out at the end", or move the opt-out demo out of that sentence's scope.

#### C8-16: Typography > Under the hood > Fluid type (step 3, "One ramp")

- **Severity:** 1 (verified)
- **Double check:** holds on `245eaa1`.
- **Now at:** `src/components/UnderTheHood/FluidTypeBuild.astro:42`
- **Where:** `src/components/UnderTheHood/FluidTypeBuild.astro:42` (rendered at /html/components/typography/#under-the-hood; frameworks: all)
- **Says:** "`progress(value, start, end)` is 0 at the start, 1 at the end, clamped in between"
- **Actually:** it is linear between start and end and clamped to 0 and 1 outside the range. "Clamped in between" is wrong; the theme relies on the clamping beyond the window to stop headings at their maximum.
- **Evidence:** Chromium 153: `calc(1px * progress(100px, 0px, 50px))` computes 1px and `progress(-50px, 0px, 50px)` computes 0px; `--ui-fluid-progress` gives `h1` 32px at 320px and 56px at 768px and wider. BCD `css.types.progress.no-clamp` exists as the opt-out (Firefox 155).
- **Correction:** "...0 at the start, 1 at the end, linear in between and clamped outside".

#### C8-09: Typography > Classless

- **Severity:** 2 (verified)
- **Double check:** partly right on `245eaa1`; the fields below are corrected. The `p`, `kbd` and `hgroup` rules ignore classes, so "unclassed" was wrong for them: the Card header's `hgroup.ui-header` is restyled too.
- **Now at:** `src/docs/components/typography.astro:270-272`
- **Where:** `src/docs/components/typography.astro:254-256` (rendered at /html/components/typography/#classless; frameworks: all)
- **Says:** "Headings, lists and tables with a class keep their own styles, and components look the same inside rich text as outside it."
- **Actually:** component roots keep their styles, but unclassed text elements inside a component still get rich text styles, so components do change. Measured differences for the page's own examples: a Callout with an `h3` and a `p` is 94.5px high outside and 86.5px inside `.ui-rich-text` (the `h3 + *` rule zeroes the 8px content gap); the first `p` of a Card header becomes uppercase, weight 500, 0.72px letter spacing (it is plain outside); the `kbd` hint in a List item is 21px high outside and 12px inside (`line-height: 1`).
- **Evidence:** `packages/opui/css/components/typography.css:296` (rich text `p` margins), `:414-417` (`h* + * { margin-block-start: 0 }`), `:58-66` (`hgroup p:first-of-type:first-child` overline styling), `:761-764` (`kbd { line-height: 1 }`), `callout.css:132-152` (the `@scope` block reverts the callout's own content gap), `card.css:84-87`. Chromium: each `src/component-examples/<component>/*.html` rendered in a plain `div` and in a `.ui-rich-text` `div` of equal width, element sizes and computed styles compared (callout/Variants.html, list/EndKeyboard.html, card/Header.html).
- **Correction:** say component roots keep their own styles, that headings without a class, `p`, `kbd` and the first `p` of any `hgroup` (even `hgroup.ui-header` in a Card) inside a component still follow rich text, and that `.ui-not-rich-text` on the component stops it.

#### C8-10: Typography > Changelog > What's new

- **Severity:** 3 (verified)
- **Double check:** holds on `245eaa1`.
- **Now at:** `src/utils/whats-new.ts:1419`, `src/utils/whats-new.ts:1411`, `src/utils/theme-token-descriptions.ts:388-389`
- **Where:** `src/utils/whats-new.ts:1395`; related `src/utils/theme-token-descriptions.ts:388-389` (rendered at /html/components/typography/#changelog; frameworks: all)
- **Says:** "Rich text margins read the `--ui-space-*` scale." (token `--ui-space-scale`: "the gaps, padding and margins of containers such as cards, dialogs, forms, tables and rich text")
- **Actually:** rich text margins do not read the `--ui-space-*` scale and do not follow `--ui-space-scale`. They come from `--_flow-gap`, `round(1.25em, var(--ui-rhythm-step))`, and multiples of it. Only rich text padding and gaps (blockquote and `pre` padding, figure gap, table caption padding) use `--ui-space-*`. The note also contradicts the one above it ("Rich text spacing comes from one flow space").
- **Evidence:** `packages/opui/css/components/typography.css:281` (`--_flow-gap`), `:296` (`p` margin), `:403-407` (`hr`), `:320-340` (blockquote padding uses `--ui-space-3` and `--ui-space-4`, its footer margin the flow gap). Chromium on /html/components/typography/ with an `.ui-rich-text` fixture and `--ui-space-scale` 1 then 2: `--_flow-gap` 20px both times, and the margins are unchanged (`p + p` 20px, `h2` 60px above and 16px below, `hr` 40px, `pre` and `figure` 32px, `blockquote` 20px); blockquote padding 16px/20px became 32px/40px, figure gap 8px became 16px, caption padding 8px became 16px.
- **Correction:** drop the sentence (or say rich text padding and gaps read the scale, margins come from the flow space); make the `--ui-space-scale` description say padding and gaps for rich text.

## Guide pages

### Accessibility

#### G1-09: Accessibility > Accessible names (framework components)

- **Severity:** 6 (verified, re-checked by the coordinator)
- **Double check:** holds on `245eaa1`.
- **Now at:** `src/docs/guide/accessibility.astro:54`
- **Where:** `src/docs/guide/accessibility.astro:53-56` (also rendered at /astro/guide/accessibility/#accessible-names, and /react/, /svelte/, /vue/; frameworks: astro, react, svelte, vue; the html copy says `aria-label` and is right)
- **Says:** "Icon-only Buttons: the `label` prop."
- **Actually:** `Button` has no `label` prop in any framework. An icon-only Button is named with `aria-label` (or `aria-labelledby`), which the React and Svelte types require when there are no children. `label="Close"` is not a Button prop: a type checker rejects it, and untyped it is spread onto the `<button>` as an unknown attribute, so the button stays unnamed. The Button page says `aria-label` for every framework. The `hideLabel` advice for Checkbox, Radio and Switch (next bullet) is correct.
- **Evidence:** `packages/opui/components/Button/types.ts:1-31` (Props: `color`, `round`, `size`, `variant`, `as`, `disabled`, `href`; the `Slots` union needs `"aria-label"` or `"aria-labelledby"` when there are no children); `grep -n label packages/opui/components/Button/Button.{astro,react.tsx,svelte,vue}` finds nothing; `src/component-api/button/api.ts:25-34`; the rendered Button page (all frameworks), "## Icon-only": "Name a button whose only child is an `svg` with `aria-label`."; 5.4.3 `IconButton` had no `label` prop either.
- **Correction:** components slot: "&lt;code>aria-label&lt;/code> (or &lt;code>aria-labelledby&lt;/code>)."

### Browser support

#### G2-19: Browser support > Compat layer > Polyfills

- **Severity:** 3 (verified)
- **Double check:** partly right on `245eaa1`; the fields below are corrected. Right at `c0d4970`. Number Stepper stopped depending on Invoker Commands in f31976f, so it leaves the list.
- **Now at:** `src/docs/guide/browser-support.astro:119`, `src/docs/guide/browser-support.astro:135-136`
- **Where:** `src/docs/guide/browser-support.astro:117-137` (frameworks: all)
- **Says:** "`@oddbird/css-anchor-positioning`: anchor positioning, for Anchor, Menu and Tooltip." and "`invokers-polyfill`: Invoker Commands (`commandfor` and `command`), for Dialog, Drawer, Menu and Tooltip."
- **Actually:** the same page's Features by component list (generated from the components' `browserSupport`) has `invoker-commands` on Button Group, Color Field, Copy, Dialog, Drawer, Menu, Number Stepper, Text Field, Toast and Tooltip, and `anchor-positioning` on Anchor, Carousel, Dialog, Drawer, Menu and Tooltip. Copy (`command="--copy"`), Toast (`--toast`), Text Field (`--toggle-password`) and Color Field (`toggle-popover`, `--copy`, `--eyedropper`) do nothing in a browser without Invoker Commands (Firefox before 144, Safari before 26.2), and `invokers-polyfill` does dispatch the `command` event for `--` custom commands. The other two bullets (`closedby` for Dialog and Drawer, `interestfor` for Anchor and Tooltip) match the data. Number Stepper no longer needs it: since f31976f `elements/number-stepper.js` steps on click and Space and reads `command` only as a marker (see D-02). Button Group needs it only through its split-button Menu.
- **Evidence:** `packages/opui/elements/copy.js:24-26`, `packages/opui/elements/toaster.js:33-35`, `packages/opui/components/TextField/TextField.astro:109-110`, `packages/opui/components/ColorField/ColorField.astro:70-71`; `invokers-polyfill@1.0.4` `invoker.js:150,254-264` (custom `--` commands pass through `CommandEvent`); web-features 3.44.0 `invoker-commands`: Chrome 135, Firefox 144, Safari 26.2; `packages/opui/css/components/carousel.css:157-301,370-383`, `dialog.css:65-94`, `drawer.css:93-124` (`anchor()` use).
- **Correction:** list the components that need the pair in the invokers bullet: "for Button Group (its Menu), Color Field, Copy, Dialog, Drawer, Menu, Text Field (password toggle), Toast and Tooltip" (or say "every component with a button that uses `commandfor`", which no longer includes Number Stepper), and add Carousel, Dialog and Drawer to the anchor positioning bullet if the polyfill is meant to cover them.

### Concepts

#### G1-06: Concepts > Token tiers

- **Severity:** 1 (verified)
- **Double check:** partly right on `245eaa1`; the fields below are corrected. Only the evidence needed refreshing: two stylesheets joined the extended group since `c0d4970`. The claim and the correction hold.
- **Now at:** `src/docs/guide/concepts.astro:83-86`
- **Where:** `src/docs/guide/concepts.astro:83-86` (also rendered at /html/guide/concepts/#token-tiers; frameworks: all)
- **Says:** "The documented inputs among them are per instance: the component declares them on itself in `components.root`, so a theme in `theme.custom` can't set them site-wide."
- **Actually:** the 18 stylesheets of the extended group declare `--_*` properties only in `components.extended`, not `components.root`: Accordion, Badge, Button group, Color field, Copy, Dialog, Form, List, Menu, Message, Number stepper, One time code, Select, Text field, Textarea, Toast, Toggle group and Tooltip. The conclusion holds because the component declares them on its own element, whichever layer.
- **Evidence:** `packages/opui/css/components/badge.css:1-18` (`@layer components.extended { :where(.ui-badge) { ... --_size: var(--ui-space-4)`), `text-field.css:1`, `select.css:1`, `dialog.css:1`, `menu.css:1` (a single `@layer components.extended`); a count of `--_*` declarations per `@layer` block in the 16 extended files finds them only in `components.extended` (51 in Accordion, 43 in Badge, 35 in Text field, 31 in Menu, 27 in List) and none in `components.root` (at `c0d4970`; Message and One time code joined the group since, and Form and Number stepper now declare one each, `form.css:85` and `number-stepper.css:3`); `packages/opui/css/components.css:3-6` (group comment).
- **Correction:** "the component declares them on itself, in `components.root` or `components.extended`".

#### G1-02: Concepts > Naming > Variants

- **Severity:** 2 (verified)
- **Double check:** partly right on `245eaa1`; the fields below are corrected. The original correction ("no fill at all on a Button") left out the outlined Tabs track and the outlined Avatar, which have no fill either.
- **Now at:** `src/docs/guide/concepts.astro:331`
- **Where:** `src/docs/guide/concepts.astro:331` (also rendered at /html/guide/concepts/#variants; frameworks: all)
- **Says:** "`outlined` a border with no fill"
- **Actually:** Button, Button Group, Avatar and the Tabs track are outlined without a fill (`tabs.css:191-199`, and `avatar.css:36-40` since `c0d4970`). Card, Accordion, Chip and the fields paint the page surface color inside the border, and an outlined Range track is filled with the track color, so on a tinted background an outlined card differs from `transparent`. The page's own ladder example right below shows it.
- **Evidence:** `packages/opui/css/components/card.css:59-64` (`&.ui-outlined { --_bg-color: var(--_surface-bg-color); ... }`); `accordion.css:68-70` and `chip.css:38-40` (`--_bg-color: var(--ui-surface)`); `packages/opui/css/components/text-field.css:17,39` (`--_bg-color: var(--ui-field-bg-color, var(--ui-surface))`); `src/component-api/range/api.ts:167` ("The default `outlined` track uses `--ui-track-bg-color`"); `src/component-api/card/api.ts:13` (the plain card "has the page surface color and no border"). Chromium probe on /html/guide/concepts/ in the ladder row "On a tonal surface" (wrapper `oklch(0.93 0.01 255)`): `.ui-card.ui-outlined` has `background-color: oklch(0.98 0.01 255)` and a 1px border, `.ui-card.ui-transparent` has rgba(0, 0, 0, 0).
- **Correction:** "`outlined` a border, around the page surface on a Card, Accordion, Callout, Chip or field and around no fill on a Button, Avatar or Tabs". Range's outlined track, a solid line in the track or field border color, needs its own words.

#### G1-03: Concepts > Rich text

- **Severity:** 2 (verified)
- **Double check:** partly right on `245eaa1`; the fields below are corrected. The original correction said links with any class are left alone; only a `ui-` class is skipped. `address` is styled whatever its class too.
- **Now at:** `src/docs/guide/concepts.astro:406-408`
- **Where:** `src/docs/guide/concepts.astro:406-408` (also rendered at /html/guide/concepts/#rich-text; frameworks: all)
- **Says:** "`.ui-rich-text` styles the classless elements inside it, for Markdown or CMS output. Elements with a class are left alone, so components keep their styles"
- **Actually:** only some rules skip classed elements (headings, `ul`/`ol`, `dl`, `details`, `table` and the `hr` border use `:not([class])`; links skip only a `ui-` class, `a[href]:where(:not([class*="ui-"]))`). `p`, `address`, `blockquote`, `pre` and `figure` are styled whether or not they have a class, so a classed one still gets the rich text margins, the blockquote bar and the code block surface. Components keep their styles partly because some classed elements are skipped and, for the rest, because `components.prose` is the lowest component layer.
- **Evidence:** `packages/opui/css/components/typography.css:286-296` (`:where(address, blockquote, ..., p, ...)` margin list, `blockquote` and `p` without `:not([class])`), `:320` (`blockquote`), `:343` (`pre`), `:354` (`p`), `:361` (`figure`). Chromium probe inside `.ui-rich-text` (bundled package CSS), classed vs classless: `p.x` `margin-block-start: 20px` vs 20px; `blockquote.x` `border-inline-start-width: 3px` and 20px vs 3px and 20px; `pre.x` background `oklch(0.16 0.01 255)` and 32px vs the same; `figure.x` `display: grid` and 32px vs the same. `ul.x`, `ol.x`, `table.x`, `dl.x` and `details.x` get `margin-block-start: 0` (left alone). The same classed `p`, `blockquote`, `pre` and `figure` outside `.ui-rich-text` have margin 0 and no bar or code surface.
- **Correction:** "Headings, lists, tables, definition lists, details and rules with a class, and links with a `ui-` class, are left alone; `p`, `address`, `blockquote`, `pre` and `figure` are styled whatever their class. Components keep their own styles because rich text sits in `components.prose`, the lowest component layer."

#### G1-04: Concepts > Token tiers

- **Severity:** 2 (verified)
- **Double check:** holds on `245eaa1`.
- **Now at:** `src/docs/guide/concepts.astro:59-65`, `src/components/TokenTiers.astro:10`, `src/docs/guide/theme-tokens.astro:98`
- **Where:** `src/docs/guide/concepts.astro:60-64` (also rendered at /html/guide/concepts/#token-tiers; frameworks: all)
- **Says:** "**Primitives**, the palette steps `--ui-color-1` to `--ui-color-16` and the type scale `--ui-font-size-100` to `--ui-font-size-900`, derive from them, and component CSS never reads them." ("them" is the knobs; the figure note says "Derived from the knobs, never read by components".)
- **Actually:** the palette steps derive from the palette knobs, but the type scale steps are literal `rem` values that no knob feeds. The figure agrees with the code (its Font size trace has an empty Knob cell), and the Theme tokens page repeats the wrong claim for the type scale ("`primitive` (derived from the knobs and read by no component, such as `--ui-font-size-300`)", `src/docs/guide/theme-tokens.astro:98`).
- **Evidence:** `packages/opui/css/theme.css:54-62` (`--ui-font-size-100: 0.75rem;` to `--ui-font-size-900: 3.5rem;`, plain values), `packages/opui/core/palette.css:11-79` (steps derive from `--ui-palette-source`), `src/components/TokenTiers.astro:19-22` (`tokens: ["--ui-color-16", "", "--ui-font-size-300"]`, no knob in the Font size column).
- **Correction:** "Primitives are the palette steps, derived from the knobs, and the type scale steps, plain values; component CSS never reads either."

#### G1-05: Concepts > Token tiers

- **Severity:** 2 (verified)
- **Double check:** partly right on `245eaa1`; the fields below are corrected. The list named 13 of the 14 knobs; `--ui-color-scheme` was missing. File counts updated to the current tree.
- **Now at:** `src/docs/guide/concepts.astro:51-52`, `src/components/TokenTiers.astro:96-97`
- **Where:** `src/docs/guide/concepts.astro:51-53` (also rendered at /html/guide/concepts/#token-tiers; frameworks: all)
- **Says:** "A theme sets knobs, roles and component tokens, and component CSS starts reading at the roles." (the figure caption adds "Component CSS reads from the line down.")
- **Actually:** component CSS also reads knobs directly. 14 of the 47 knob tokens appear in `var()` or `style()` reads of the component, compat and normalize CSS: `--ui-motion` in 23 files (every `--_motion` starts from it), `--ui-contrast` (container style queries) in 9, plus `--ui-state-hover-alpha-*`, `--ui-state-active-alpha-*`, `--ui-state-selected-alpha-accent`, `--ui-text-min-lightness`, `--ui-text-max-chroma`, `--ui-accent-fill-max-lightness`, `--ui-choice-fill-max-lightness` and `--ui-color-scheme` (`typography.css:753`, a style query). Only the palette steps and type scale primitives are off limits to components.
- **Evidence:** `packages/opui/css/components/button.css:3` (`--_motion: var(--ui-motion)`), `:12-13` (`--ui-text-min-lightness`, `--ui-text-max-chroma`), `:82-87` and `:145-148` (`--ui-state-active-alpha-accent`, `--ui-state-hover-alpha-accent`), `:157` (`--ui-accent-fill-max-lightness`), `:287` (`@container style(--ui-contrast: more)`); tiers from `packages/opui/tokens.json` (`$extensions.opui.tier: "knob"`) and `src/utils/theme-token-tiers.ts:3-50`; a script over `css/components`, `css/compat` and `core/normalize.css` that matches `var(` and `style(` reads against the knob list found the 14 tokens above; the repo's own check only forbids reading palette steps, type scale steps and Open Props (`scripts/check-css-vars.mjs:21` `PALETTE_STEP`, `:240` "components read --ui-* roles, not palette steps or Open Props").
- **Correction:** "component CSS reads the roles, a few knobs such as `--ui-motion` and `--ui-contrast`, and never the primitives".

#### G1-01: Concepts > Light and dark

- **Severity:** 3 (verified, re-checked by the coordinator)
- **Double check:** partly right on `245eaa1`; the fields below are corrected. The original "only the roles use `light-dark()`" and the correction's "Every role" overgeneralized: four roles hold one value, and two knobs use `light-dark()`.
- **Now at:** `src/docs/guide/concepts.astro:95-97`
- **Where:** `src/docs/guide/concepts.astro:95-96` (also rendered at /html/guide/concepts/#light-and-dark; frameworks: all)
- **Says:** "Every color token holds both schemes in one `light-dark()` under `color-scheme: light dark`, so the OS setting drives them and there is no class to toggle."
- **Actually:** the package never declares `color-scheme: light dark`. `html` gets `color-scheme: var(--ui-color-scheme)`, where `--ui-color-scheme` is `light` and a `prefers-color-scheme: dark` media query switches it to `dark`; `.ui-light` and `.ui-dark` set the same pair. The computed `color-scheme` on `html` is always one value. "Every color token" is also too broad: the palette steps `--ui-color-1` to `--ui-color-16` and the grays hold a single value, and so do the roles `--ui-orange`, `--ui-warning`, `--ui-on-warning` and `--ui-on-fill`; most other color roles, and the knobs `--ui-primary-source` and `--ui-shadow-color`, use `light-dark()`.
- **Evidence:** `packages/opui/css/theme.css:3-13` (`.ui-light`, `.ui-dark`), `:16-20` (`:where(html) { color-scheme: var(--ui-color-scheme); --ui-color-scheme: light; }`), `:195-199` (`@media (prefers-color-scheme: dark) { :where(html) { --ui-color-scheme: dark } }`); `grep -rn "color-scheme: light dark" packages/opui` finds nothing, and the published 6.0.0-rc.1 `dist/opui.css` has only `color-scheme: light`, `dark` and `var(--ui-color-scheme)`. `packages/opui/tokens.json` `ui-color-scheme.$description`: "The color scheme in force: `light`, or `dark` under `prefers-color-scheme: dark`. `html` reads it as its `color-scheme`" (the Theme tokens page states it correctly). Chromium 153 probe on a plain page that links the bundled package CSS: `getComputedStyle(html).colorScheme` is `light` with OS light and `dark` with OS dark, never `light dark`. Single-value color tokens: `packages/opui/core/palette.css:16-79` and `:82-129`, `packages/opui/css/theme.css:390` (`--ui-orange`).
- **Correction:** "Most color roles hold both schemes in one `light-dark()`. `html` sets `color-scheme` from `--ui-color-scheme`, `light` by default and `dark` under `prefers-color-scheme: dark`, so the OS setting drives them and there is no class to toggle."

#### G1-07: Concepts > JavaScript and Custom elements (the note under each code group)

- **Severity:** 3 (verified)
- **Double check:** holds on `245eaa1`. Refined: for the `css/js/` note say `@next` has `checkbox.js` and `range.js` while 5.4.3 has no `range.js` and its exports map blocks the Bundler imports; for the `elements/` note keep only building from the repository (6.0.0-rc.1 has no `elements/`). The same component renders on `src/docs/guide/getting-started/HTML.astro:63` (`file="dist/opui.css"`), where both stand-ins work, so the fix has to depend on `file`.
- **Now at:** `src/components/UnreleasedNote.astro:25,27`, `src/docs/guide/concepts.astro:499`, `src/docs/guide/concepts.astro:579`
- **Where:** `src/components/UnreleasedNote.astro:27`, rendered through `src/docs/guide/concepts.astro:499` (`file="css/js/"`) and `:579` (`file="elements/"`); the same component is on `src/docs/guide/getting-started/HTML.astro:63` (also rendered at /html/guide/concepts/#javascript and #custom-elements; frameworks: all)
- **Says:** "`opui-css@next` has the release candidate, 6.0.0-rc.1. Until then, build the package from the repository (...) and use `packages/opui/elements/`, or load `opui-css@5` (5.4.3), the previous major", offered as the stand-in for the jsDelivr links in the samples (`css/js/range.js`, `elements/number-stepper.js`).
- **Actually:** the stand-ins do not contain those files. 5.4.3 has `css/js/checkbox.js` and `css/js/toast.js` only (no `range.js`) and no `elements/` directory, and its `exports` map has no `./css/js/*` entry (`"./css/*": "./css/*.css"`), so the Bundler sample fails there as well. The published 6.0.0-rc.1 (`opui-css@next`) has `css/js/checkbox.js` and `css/js/range.js` but no `elements/` directory (Color field, Copy, Number stepper, Select all, Sortable table and Toast landed after rc.1), so `opui-css@next/elements/number-stepper.js` would 404 too. Only the build-from-the-repository route works for the Custom elements sample.
- **Evidence:** `ls opui-css@5.4.3/css/js` lists `checkbox.js`, `toast.js`; `.../opui-css@5.4.3/elements` does not exist; `.../opui-css@5.4.3/package.json` exports `"./css/*": "./css/*.css"`; `.../opui-css@6.0.0-rc.1/` has no `elements/` (only `react/elements.ts`, `svelte/elements.ts`) and its `components/` has none of the new element components; `curl https://registry.npmjs.org/opui-css` dist-tags: `latest` 5.4.3, `next` 6.0.0-rc.1.
- **Correction:** for the `elements/` note drop the `opui-css@5` and `@next` stand-ins and say to build from the repository; for the `css/js/` note say `@next` has `checkbox.js` and `range.js`, and that 5.4.3 has no `range.js`.

### Customizing

#### G1-08: Customizing > Example themes (brutalist)

- **Severity:** 2 (verified)
- **Double check:** holds on `245eaa1`.
- **Now at:** `src/utils/example-theme-notes.ts:9`
- **Where:** `src/utils/example-theme-notes.ts:9` (rendered by `src/docs/guide/customizing.astro:67-79`; also at /html/guide/customizing/#example-themes; frameworks: all)
- **Says:** "`brutalist`: neobrutalism. Black 2px borders, hard 4px shadows on cards, dialogs and menus and on buttons that press into them on hover without changing color, filled in the main blue, ..."
- **Actually:** a brutalist Button does change color on hover. `--ui-button-hover: layer` puts a state layer over the fill (the hover alpha tokens are not overridden), while the shadow goes and the button translates 4px 4px. Read as "press into the shadow and keep their color", the sentence is wrong.
- **Evidence:** `packages/opui/themes/brutalist.css:21-24` (`--ui-button-hover: layer; --ui-button-hover-shadow: none; --ui-button-hover-translate: 4px 4px;`), no `--ui-state-hover-alpha-*` override in the file. Chromium probe (bundled package CSS plus `themes/brutalist.css`, real mouse hover, `@media (hover: hover)` matches): `.ui-filled` rest `oklch(0.675 0.1725 259.5)`, hover `oklch(0.58969 0.146625 259.5)`, `box-shadow` `4px 4px` to `none`, `translate: 4px 4px`; `.ui-tonal` rest `oklch(0.852 0.073 260)`, hover `oklch(0.7392 0.0682107 259.925)`; `.ui-outlined` rest rgba(0, 0, 0, 0), hover `oklch(0.1 0.01 259.5 / 0.1)`.
- **Correction:** "... and on buttons that press into them on hover, with a state layer instead of a fill swap" (or drop "without changing color").

### Theme tokens

#### G2-13: Theme tokens > tokens.json

- **Severity:** 1 (verified)
- **Double check:** partly right on `245eaa1`; the fields below are corrected. The original correction ("a `$type` and `$value` unless it is a keyword or unset") would add an error: 38 of the 41 unset tokens have a `$type`, and so do keyword tokens such as `ui-focus-ring-style: solid` (`strokeStyle`) and `ui-shadow-control: none` (`shadow`).
- **Now at:** `src/docs/guide/theme-tokens.astro:81-82`
- **Where:** `src/docs/guide/theme-tokens.astro:81-82`
- **Says:** "each token has a `$type`, a `$description` and a `$value`"
- **Actually:** five tokens have no `$type` (`ui-color-scheme`, `ui-contrast`, `ui-button-hover`, `ui-button-hover-translate`, `ui-anchor-position-area`), and the 41 unset tokens have no `$value` (the page covers that two sentences later).
- **Evidence:** `packages/opui/tokens.json` (292 tokens; 0 without `$description`, 5 without `$type`, 41 without `$value`, each of those 41 has `$extensions.opui.example`).
- **Correction:** "each token has a `$description`, a `$type` when the format has one for it (five keyword tokens such as `--ui-color-scheme` and `--ui-contrast` have none), and a `$value` unless it is unset".

#### G2-12: Theme tokens > Overriding tokens

- **Severity:** 3 (verified)
- **Double check:** partly right on `245eaa1`; the fields below are corrected. The roles half holds. The knobs half was too broad: `.ui-contrast-more` reads the density and space knobs but not the palette inputs, so naming it next to `.ui-palette` "for knobs" would be wrong for `--ui-palette-hue` and `-chroma`.
- **Now at:** `src/docs/guide/theme-tokens.astro:61-66`
- **Where:** `src/docs/guide/theme-tokens.astro:61-66` (rendered at /html/guide/theme-tokens/#overriding; frameworks: all)
- **Says:** "Roles work on `html` and on any element, for the subtree inside it. Knobs (`--ui-density`, `--ui-space-scale` and the `--ui-palette-*` inputs) are only read on `html` and inside a `.ui-palette` scope, so a knob on a form does nothing."
- **Actually:** a role set on a plain element only reaches components that read that very role. Every role derived from another (`--ui-on-primary`, `--ui-primary-text`, `--ui-text`, `--ui-border-color`, the shadows, ...) is declared only on `html`, `.ui-palette` and `.ui-contrast-more`, so inside a plain element it keeps the page's value: pinning `--ui-primary` on a section gives the new fill with the page's white `--ui-on-primary` text. For `--ui-density` and `--ui-space-scale`, `.ui-contrast-more` is a third scope that reads them (`--ui-density` on it resizes controls; the palette inputs are not read there), so "only ... `html` and ... `.ui-palette`" is also short.
- **Evidence:** `packages/opui/css/theme.css:202` (derived block selector `:where(html, .ui-palette, .ui-contrast-more)`) and `:466-490` (`--ui-on-primary`, `--ui-primary-text` computed there). Chromium 153 on /html/guide/theming/, `<button class="ui-button ui-filled ui-primary">` inside `<div style="--ui-primary: oklch(0.95 0.08 100)">`: background oklch(0.95 0.08 100), text color(xyz-d65 0.9505 1 1.089) (white, unchanged); the same style on a `.ui-palette` div gives near-black text color(xyz-d65 0.00114 0.0012 0.0013). `--ui-density: 0.5` on a plain div leaves a button at 40px, on `.ui-palette` and on `.ui-contrast-more` its `min-block-size` drops to 20px (it renders 30px, the height of its text line), on `.ui-critical` 40px. The Customizing page says: "A role you pin, such as `--ui-surface` or `--ui-primary`, goes on `:where(html, .ui-palette, .ui-contrast-more)` so the scope classes keep it" (`src/docs/guide/customizing.astro:47-51`).
- **Correction:** "Roles work on `html` and on any element for the components that read them directly; roles derived from them follow only on `html` and in a `.ui-palette` or `.ui-contrast-more` scope." For knobs: "Knobs are only read where the library derives from them: `--ui-density` and `--ui-space-scale` on `html`, `.ui-palette` and `.ui-contrast-more`, and the `--ui-palette-*` inputs on `html` and `.ui-palette`, so a knob on a form does nothing."

### Theming

#### G2-03: Theming > Palette

- **Severity:** 1 (verified; lowered from 2 in the double check)
- **Double check:** holds on `245eaa1`. Lowered because the neutral ramp has a chroma of about 0.01, so a hue rotation would not show. The sentence also ships in the generated `packages/opui/skills/opui/references/theming.md:42` and `packages/opui/tokens.json:43`.
- **Now at:** `src/docs/guide/theming.astro:80-82`, `src/utils/theme-token-descriptions.ts:312-313`, `packages/opui/tokens.json:43`, `packages/opui/skills/opui/references/theming.md:42`
- **Where:** `src/docs/guide/theming.astro:79-81`; the same sentence is in `src/utils/theme-token-descriptions.ts:312-313` (`--ui-palette-hue-rotate-by`, shown on Theme tokens, in tokens.json and in every CSS variables table that lists it); frameworks: all
- **Says:** "The severity scopes use `1` for livelier tints." (token description: "The severity scopes use `1` for livelier tints, the brand palette `0`.")
- **Actually:** four of the five severity scopes use `1`; `.ui-neutral` sets `--ui-palette-hue-rotate-by: 0`. The same page counts `.ui-neutral` among "the severity classes" in the next paragraph.
- **Evidence:** `packages/opui/css/theme.css:728-753` (`.ui-critical`, `.ui-info`, `.ui-success`, `.ui-warning` set `1`; `.ui-neutral` sets `0` at line 752).
- **Correction:** "`.ui-critical`, `.ui-info`, `.ui-success` and `.ui-warning` use `1` for livelier tints; `.ui-neutral` keeps `0`."

#### G2-05: Theming > Corners

- **Severity:** 1 (verified)
- **Double check:** holds on `245eaa1`. Optionally say "pill and circle shapes (Avatar, Radio, Switch, the range track, the carousel buttons and markers) follow `--ui-radius-round`".
- **Now at:** `src/docs/guide/theming.astro:261-262`
- **Where:** `src/docs/guide/theming.astro:260-261`
- **Says:** "Small parts like `kbd`, tooltips and checkboxes never get rounder than it, so `0` squares everything."
- **Actually:** parts that use `--ui-radius-round` stay round at `--ui-radius: 0`, such as `Avatar`, `Radio`, `Switch`, the range track and the carousel buttons. The next clause of the same sentence names `--ui-radius-round` as "the pill".
- **Evidence:** `packages/opui/css/components/avatar.css:12`, `radio.css:20`, `switch.css:36`, `range.css:34`, `carousel.css:153,324` (`border-radius: var(--ui-radius-round)`). Chromium 153 on /html/guide/theming/ with `:where(html) { --ui-radius: 0 }`: `.ui-avatar` 100000px, `.ui-radio input` 100000px, `.ui-switch input` 100000px; button, card, checkbox 0px.
- **Correction:** "... so `0` squares every corner that follows `--ui-radius`; pill shapes stay round until `--ui-radius-round` is set."

#### D-04: Theming > Scopes (`.ui-contrast-more`)

- **Severity:** 2 (verified by the coordinator)
- **Double check:** found during the double check, on `245eaa1`.
- **Where:** `src/docs/guide/theming.astro:153-157` (rendered at /html/guide/theming/; frameworks: all)
- **Says:** "`.ui-palette` re-derives the palette and every derived token ... from the knobs the element sets or inherits ... `.ui-contrast-more` does the same with the contrast knobs tightened."
- **Actually:** `.ui-contrast-more` re-derives the derived tokens and the palette roles, but not the palette itself. The palette steps are declared only on `:root`, the severity classes and `.ui-palette`, so a hue or chroma knob set on a `.ui-contrast-more` element changes no `--ui-color-*` step there. Same cause as G2-02.
- **Evidence:** `packages/opui/core/palette.css:1-10` (`@layer theme.palette { :where(:root, .ui-warning, .ui-critical, .ui-info, .ui-success, .ui-neutral, .ui-palette)`); `packages/opui/css/theme.css:202` (the derived block, which does list `.ui-contrast-more`).
- **Correction:** "`.ui-contrast-more` re-derives every derived token and palette role with the contrast knobs tightened; the palette steps stay those of the nearest `.ui-palette` or `:root`."

#### G2-01: Theming > intro figure (TokenFlow)

- **Severity:** 2 (verified)
- **Double check:** holds on `245eaa1`.
- **Now at:** `src/components/TokenFlow.astro:10`
- **Where:** `src/components/TokenFlow.astro:11` (renders in the first section of /html/guide/theming/; frameworks: all)
- **Says:** "`--ui-primary` Filled buttons, links, focus ring"
- **Actually:** the keyboard focus ring is drawn with `--ui-focus-ring-color` (black on surfaces lighter than OKLCH 0.6, white on darker ones), not `--ui-primary`. Links read `--ui-primary-text`. The only primary-colored cue on focus is the border of a focused text field, which is not the ring. The Accessibility page and the Theme tokens page both say the ring is black or white.
- **Evidence:** `packages/opui/css/theme.css:209-211` (`--ui-focus-ring-color: oklch(from var(--ui-surface) clamp(0, (0.6 - l) * 1000, 1) 0 0)`); `packages/opui/core/normalize.css:110-114` (`:focus-visible` outline uses it); `packages/opui/css/components/link.css:5`; `src/docs/guide/accessibility.astro:136-138` ("By default it's black on light surfaces and white on dark ones").
- **Correction:** "Filled buttons, links, checked controls" (drop "focus ring").

#### G2-04: Theming > Palette (code sample)

- **Severity:** 2 (verified)
- **Double check:** holds on `245eaa1`.
- **Now at:** `src/docs/guide/theming.astro:103-109`, `src/docs/guide/theming.astro:40-41`
- **Where:** `src/docs/guide/theming.astro:102-108`, read with the page rule at `src/docs/guide/theming.astro:40-41` ("Snippets on this page belong in `@layer theme.custom`")
- **Says:** the sample `:where(.ui-warning) { --ui-palette-source: oklch(from var(--ui-warning) 0.58 0.21 h); --ui-palette-hue-rotate-by: 1; }`, one of the page's snippets.
- **Actually:** it is the library's own rule from the `theme.severity` layer, which comes after `theme.custom` in the layer order, so this rule (or a changed copy) placed in `theme.custom` is overridden. A severity scope is recolored by setting its intent token (`--ui-warning`), as the sentence before the sample says.
- **Evidence:** `packages/opui/css/layers.css:2` (`@layer theme.palette, theme.base, theme.custom, theme.severity;`); `packages/opui/css/theme.css:728-748`. Chromium 153 on /html/guide/theming/, `.ui-warning` with `background-color: var(--ui-color-9)`: oklch(0.53 0.2 83); after `@layer theme.custom { :where(.ui-warning) { --ui-palette-source: oklch(0.58 0.21 10); --ui-palette-hue-rotate-by: 0 } }` still oklch(0.53 0.2 83); after `@layer theme.custom { :where(html) { --ui-warning: oklch(0.66 0.2 10) } }` oklch(0.53 0.2 18).
- **Correction:** mark the sample as the built-in rule (not for `theme.custom`), or replace it with a `--ui-warning` override.

#### G2-07: Theming > Fonts > Fluid headings

- **Severity:** 2 (verified)
- **Double check:** holds on `245eaa1`.
- **Now at:** `src/docs/guide/theming.astro:322-323`
- **Where:** `src/docs/guide/theming.astro:321-322`
- **Says:** "`--ui-font-size-h1` to `--ui-font-size-h4` grow from one step to the next as the viewport widens"
- **Actually:** only `h3` (500 to 600) and `h4` (400 to 500) grow to the adjacent step. `h1` grows from 700 to 900 and `h2` from 600 to 800, two steps each.
- **Evidence:** `packages/opui/css/theme.css:226-245` (h1: 700 + (900 - 700) * progress; h2: 600 + (800 - 600) * progress); `src/utils/theme-token-descriptions.ts:213-220` states the ranges correctly.
- **Correction:** "grow from one step to a larger one (h1 and h2 skip a step)".

#### G2-08: Theming > Motion > Global classes

- **Severity:** 2 (verified)
- **Double check:** holds on `245eaa1`.
- **Now at:** `src/docs/guide/theming.astro:405-409`
- **Where:** `src/docs/guide/theming.astro:404-408`
- **Says:** "On `html`, these override the OS preference for every transition and animation. Smooth scrolling follows the system setting only, since `normalize.css` keys it on `prefers-reduced-motion`."
- **Actually:** true for the page scroll, but the Carousel scroller's `scroll-behavior: smooth` follows `--ui-motion`: `.ui-motion-off` on `html` makes it `auto`, and `.ui-motion-on` makes it `smooth` again under `prefers-reduced-motion: reduce`.
- **Evidence:** `packages/opui/css/components/carousel.css:69,73-74,77-78` (`scroll-behavior: smooth`, `@container style(--ui-motion: 0) { scroll-behavior: auto }`, `&.ui-motion-off`); `packages/opui/core/normalize.css:30-32` (page scroll keyed on `prefers-reduced-motion: no-preference`). Chromium 153 on /html/components/carousel/: no preference: carousel `smooth`; with `html.ui-motion-off` `auto`; with `reducedMotion: reduce` carousel `auto`, but with `html.ui-motion-on` `smooth` while `html` stays `auto`.
- **Correction:** "The page's smooth scrolling follows the system setting only; the Carousel's follows `--ui-motion`."

#### G2-09: Theming > Contrast

- **Severity:** 2 (verified)
- **Same issue reported as:** L3-10
- **Double check:** holds on `245eaa1`. Prefer "drop" over "replace": `--ui-accent-max-chroma` caps `--ui-primary`, `--ui-invalid` and `--ui-palette-text`, not the `-text` roles.
- **Now at:** `src/docs/guide/theming.astro:446-474`, `src/docs/guide/theming.astro:461-463`, `src/docs/guide/theming.astro:469-471`
- **Where:** `src/docs/guide/theming.astro:446-470`
- **Says:** "It tightens the knobs the roles are derived from, and every role follows: ... `--ui-text-max-lightness`, `--ui-text-min-lightness` and `--ui-text-max-chroma` for the `-text` roles ... and `--ui-focus-ring-width`. Their values in both modes are on Theme tokens."
- **Actually:** `--ui-text-max-chroma` is `0.1` in both modes; more contrast does not change it (the chroma knob that drops to `0.1` is `--ui-accent-max-chroma`, which the list omits). And the Theme tokens page gives no more-contrast value for `--ui-focus-ring-width`: its row says only `2px` and "Width of the focus ring." (the `3px` is in tokens.json only), and the row is not in the Contrast section the link points to.
- **Evidence:** `packages/opui/css/theme.css:151` (`--ui-text-max-chroma: 0.1`) and the more-contrast blocks `theme.css:610-640` and `643-671` (no `--ui-text-max-chroma`; `--ui-accent-max-chroma: 0.1` and `--ui-focus-ring-width: 3px` are set); `src/utils/theme-token-descriptions.ts:182,451-452` (the focus ring width and text-max-chroma descriptions carry no more-contrast value); `packages/opui/tokens.json` (`ui-focus-ring-width.$extensions.opui.modes["more-contrast"] = "3px"`); Chromium 153 with `contrast: more` emulation: html `--ui-focus-ring-width` 3px, `--ui-border-strength-light` 55%.
- **Correction:** drop `--ui-text-max-chroma` from the tightened list (or replace it with `--ui-accent-max-chroma`), and add "`3px` with more contrast" to the `--ui-focus-ring-width` description, or reword "Their values in both modes are on Theme tokens".
- **Also L3-10 (severity 2):**
  - Double check: holds on `245eaa1`. Don't put the accent knobs in the `--ui-text-max-chroma` slot; name them for what they cap: "`--ui-accent-max-chroma` and `--ui-accent-max-lightness` for the primary, invalid and palette accents".
  - Now at: `src/docs/guide/theming.astro:459-463`
  - Where: `src/docs/guide/theming.astro:459-462` (rendered at /html/guide/theming/#contrast; frameworks: all)
  - Actually: more contrast leaves `--ui-text-max-chroma` at `0.1`. The chroma knob it tightens is `--ui-accent-max-chroma` (`1` to `0.1`), and `--ui-accent-max-lightness` (`1` to `0.42`) is tightened too.
  - Correction: replace `--ui-text-max-chroma` with `--ui-accent-max-chroma` (and name `--ui-accent-max-lightness`) in that list.

#### G2-10: Theming > Contrast > Classes

- **Severity:** 2 (verified)
- **Double check:** holds on `245eaa1`.
- **Now at:** `src/docs/guide/theming.astro:561-565`
- **Where:** `src/docs/guide/theming.astro:560-564`
- **Says:** "`.ui-contrast-normal`: sets `--ui-contrast: normal`, on `html` to ignore the OS preference. It can't lower the contrast inside a `.ui-contrast-more` ancestor."
- **Actually:** inside a `.ui-contrast-more` ancestor, `.ui-contrast-normal` resets `--ui-contrast` to `normal`. The tightened color knobs are inherited and stay, but every component rule keyed on `@container style(--ui-contrast: more)` reverts to its normal look, so part of the contrast does drop.
- **Evidence:** `packages/opui/core/utils.css:14-19`; `packages/opui/css/components/divider.css:18-23`. Chromium 153 on /html/guide/theming/: `<hr class="ui-divider ui-filled">` has background oklch(0.84 0.01 255) on the normal page, oklch(0.529 0.01 255) inside `.ui-contrast-more`, and oklch(0.84 0.01 255) again inside `.ui-contrast-more > .ui-contrast-normal`, where `--ui-border-color` is still oklch(0.529 ...) and `--ui-contrast` is `normal`.
- **Correction:** "Inside a `.ui-contrast-more` ancestor it keeps the tightened colors but resets what components read from `--ui-contrast`."

#### G2-11: Theming > Forced colors

- **Severity:** 2 (verified)
- **Double check:** partly right on `245eaa1`; the fields below are corrected. The original correction kept "switches ... `CanvasText`", which is wrong for a checked switch.
- **Now at:** `src/docs/guide/theming.astro:594-597`
- **Where:** `src/docs/guide/theming.astro:593-597`
- **Says:** "Under `forced-colors: active`, selected tabs, toggles and list items use `SelectedItem`, switches, ranges, progress bars and dividers `CanvasText`, and focused fields a `Highlight` outline."
- **Actually:** only the range track and the progress outline are `CanvasText`. The progress bar fill and the range thumb are `SelectedItem` (the range source also sets its fill to `SelectedItem`, but in Chromium the filled part of the track rendered black, so I only confirm the thumb). A checked switch is `SelectedItem` too (`switch.css:187-189`); only the unchecked switch is `CanvasText`.
- **Evidence:** `packages/opui/css/components/progress.css:25-29` (`--_accent: SelectedItem` for the fill, `outline: ... CanvasText`); `packages/opui/css/components/range.css:416-418,436-446` (`--_forced-fill-bg-color: SelectedItem`, `--_forced-track-bg-color: CanvasText`, thumb background is the fill color). Chromium 153 with `forcedColors: active`, pixel samples of element screenshots: `.ui-progress` filled part rgb(25,103,210) (= SelectedItem), empty part rgb(255,255,255), top outline rgb(0,0,0); `input[type=range]` thumb rgb(25,103,210), track rgb(0,0,0).
- **Correction:** "selected tabs, toggles and list items, checked switches, progress bars and range thumbs use `SelectedItem`; unchecked switches, range tracks, progress outlines and dividers `CanvasText`".

#### G2-02: Theming > Palette

- **Severity:** 3 (verified)
- **Same issue reported as:** C8-13, M2-14
- **Double check:** holds on `245eaa1`. Since e014a43 a `--ui-palette-source` set on a `.ui-contrast-more` element still moves the light-mode `--ui-primary` there (not the palette steps), so "the knobs do nothing anywhere else" has that one exception. The Scopes section of the same page makes the related claim D-04.
- **Now at:** `src/docs/guide/theming.astro:88-93`
- **Where:** `src/docs/guide/theming.astro:88-92` (also rendered at /html/guide/theming/#palette; frameworks: all)
- **Says:** "The palette is computed on `:root`, `.ui-palette`, `.ui-contrast-more`, the severity classes and the inline `del`, `ins`, `abbr` and `dfn` elements and their classes, so the knobs do nothing anywhere else."
- **Actually:** `--ui-palette-source` and the `--ui-color-1` to `--ui-color-16` steps (with the grays) are declared only on `:root`, `.ui-palette` and the five severity classes. `.ui-contrast-more` only re-derives the roles from the contrast knobs (it is in the derived-token and palette-role selector lists, not in the palette one), so a hue or chroma set on it does nothing. `del`, `ins`, `abbr`, `dfn` and `.ui-del`, `.ui-ins`, `.ui-abbr`, `.ui-dfn` compute no palette at all; they read `--ui-critical-text`, `--ui-success-text` and `--ui-info`. The Theme tokens page states the correct list.
- **Evidence:** `packages/opui/core/palette.css:2-10` (selector list `:root, .ui-warning, .ui-critical, .ui-info, .ui-success, .ui-neutral, .ui-palette`); `packages/opui/css/theme.css:673-682` (palette roles list `.ui-contrast-more` but no steps); `packages/opui/css/components/typography.css:138-148,196-205,684-700` (del/ins/abbr/dfn only set color or decoration). Chromium 153 on /html/guide/theming/ with inline `--ui-palette-hue: 30` and `background-color: var(--ui-color-9)`: `.ui-palette` gives oklch(0.53 0.1 30) and `.ui-critical` derives its own palette from `--ui-critical` (oklch(0.53 0.2 33)), but a plain div, `.ui-contrast-more`, `del`, `ins`, `abbr`, `dfn`, `.ui-del`, `.ui-ins`, `.ui-abbr` and `.ui-dfn` all stay oklch(0.53 0.1 145). Contradicts `src/utils/theme-tokens.ts:247` on Theme tokens: "derives from `--ui-palette-source` on `:root`, `.ui-palette` and every severity scope".
- **Correction:** "The palette is computed on `:root`, `.ui-palette` and the severity classes, so the knobs do nothing anywhere else. `.ui-contrast-more` only re-derives the roles."
- **Also C8-13 (severity 3):**
  - Double check: holds on `245eaa1`.
  - Now at: `src/docs/guide/theming.astro:88-93`, `src/utils/whats-new.ts:1408`
  - Where: `src/docs/guide/theming.astro:87-92` (rendered at /html/guide/theming/#palette; the Typography note is `src/utils/whats-new.ts:1384`)
  - Actually: `del`, `ins`, `abbr`, `dfn` and their classes are not palette scopes in 6.0 (the Typography page's Breaking note says so), and `.ui-contrast-more` does not recompute the palette steps either. Palette knobs set on those elements do nothing.
  - Correction: list `:root`, `.ui-palette` and the severity classes only.
- **Also M2-14 (severity 3):**
  - Double check: holds on `245eaa1`.
  - Now at: `src/docs/guide/theming.astro:88-93`
  - Where: `src/docs/guide/theming.astro:87-92` (rendered at /html/guide/theming/#palette; frameworks: all)
  - Actually: `core/palette.css` computes `--ui-color-N` on `:root`, `.ui-palette` and the five severity classes only. `del`, `ins`, `abbr`, `dfn` and their classes are not scopes (`MIGRATING.md:1278`, `CHANGELOG.md:104` say so), and `.ui-contrast-more` does not recompute the steps either (it only re-derives roles in `theme.css`).
  - Correction: "computed on `:root`, `.ui-palette` and the severity classes".

## Getting started and entry pages

### Blocks

#### D-06: Block pages > Code (the scripts are left out)

- **Severity:** 3 (verified by the coordinator)
- **Double check:** found during the double check, on `245eaa1`.
- **Where:** `src/pages/blocks/[block]/index.astro:29-32` (`codeTabs` has HTML and CSS only) with `src/utils/blocks.ts:69-73` (`splitSource` strips `<script>` from the HTML); rendered on /blocks/data-table/, /blocks/product-detail/, /blocks/shopping-cart/ and /blocks/sign-up/ and in their `.md` versions
- **Says:** the HTML and CSS tabs, offered as the block's code
- **Actually:** four blocks need a `<script type="module">` that imports the library's custom elements (Data table: `select-all.js` and `sortable-table.js`; Product detail and Shopping cart: `number-stepper.js`; Sign up: `text-field.js`). The page drops that script from the HTML tab and shows no script tab, so code copied from the page lacks the imports, and the Data table's sorting and select all, the number steppers and the password toggle don't work.
- **Evidence:** `src/blocks/data-table.html:608-611` (`import "opui-css/elements/select-all.js"`, `import "opui-css/elements/sortable-table.js"`), `product-detail.html:453`, `shopping-cart.html:466`, `sign-up.html:335`; the built `blocks/data-table.md` has no `elements/` import.
- **Correction:** add a JS tab when `splitSource` finds a script (the `js` part is already extracted), or keep the module script in the HTML tab.

#### G3-05: Blocks > intro

- **Severity:** 3 (verified, re-checked by the coordinator)
- **Double check:** holds on `245eaa1`. Two additions to the correction. The block pages' code tabs leave out the scripts, so copied code for the four scripted blocks lacks the element imports (D-06). And `opui-css/elements/*` is exported by neither 5.4.3 nor 6.0.0-rc.1. Suggested: "Markup that shows how the components fit together. The search fields, filters, date ranges and the file manager's sort and select all are not wired up. Four blocks need the library's custom elements." The FAQ accordion and the App shell drawer are native HTML (`<details>`, `<dialog>` with invoker commands) rather than CSS. The script tags are now at `data-table.html:608`, `product-detail.html:453`, `shopping-cart.html:466` and `sign-up.html:335`.
- **Now at:** `src/pages/blocks/index.astro:14-16`
- **Where:** `src/pages/blocks/index.astro:13-19` (rendered at /blocks/)
- **Says:** "Very generic SaaS'y-looking blocks, but they are fully functional ... Every block is plain HTML and CSS, the same on every framework"
- **Actually:** four of the 36 blocks load library scripts with `<script type="module">` (data-table: `select-all.js`, `sortable-table.js`; product-detail and shopping-cart: `number-stepper.js`; sign-up: `text-field.js`), so they are not plain HTML and CSS. And many controls are markup only. In Chromium: the File manager's Name/Modified/Size header buttons do not sort and "Select all files" selects nothing; the Data table's search field and Status/Plan selects do not filter its 5 rows; the User directory's search field and All/Design/Engineering/Sales/Support toggle do not filter its cards; the Analytics dashboard's 7/30/90 days toggle does not change any number. What does work is either CSS (Tabs, the FAQ accordion, the Pricing period toggle, the App shell drawer) or a loaded script (Data table sorting and select all, number steppers).
- **Evidence:** `grep -n "<script" src/blocks/*.html` (data-table.html:629, product-detail.html:547, shopping-cart.html:510, sign-up.html:346); Chromium probes of /blocks/file-manager/preview/, /blocks/data-table/preview/, /blocks/user-directory/preview/, /blocks/analytics-dashboard/preview/; `src/blocks/file-manager.html:287` (fixed `aria-sort="ascending"`, buttons with no behavior).
- **Correction:** say the blocks are static markup that shows how the components fit together, and that four of them import the library's custom elements.
- **TODO.md:** lines 160 and 186 (the data-table sort and select all were fixed; the same pattern in file-manager and the search, filter and date range controls are not listed)

#### G3-06: Blocks > block descriptions

- **Severity:** 3 (verified)
- **Double check:** holds on `245eaa1`. The "Where" lines are in a different order from "Says": `:116` is the File manager and `:269` the User directory. The Data table pagination links are fragment links (`data-table.html:586-590`).
- **Now at:** `src/utils/blocks-data.ts:81`, `src/utils/blocks-data.ts:269`, `src/utils/blocks-data.ts:116`, `src/utils/blocks-data.ts:32`
- **Where:** `src/utils/blocks-data.ts:81,116,269,32` (rendered as the card text on /blocks/ and in `llms.txt`)
- **Says:** "A searchable, filterable table with row selection, statuses, row actions and pagination." (Data table), "A filterable grid of people cards with avatars, roles and contact actions." (User directory), "Storage usage, folders and a file table with sorting and row actions." (File manager), "Key metrics, a bar chart, top pages and traffic sources for a selectable date range." (Analytics dashboard)
- **Actually:** the search, filter, sort and range controls exist but do nothing (Chromium: typing "Kwame" or choosing Status "Churned" leaves all 5 Data table rows; typing "zzzz" or picking Engineering leaves every User directory card; clicking Modified or Size in the File manager keeps the row order; choosing 90 days in Analytics leaves every metric unchanged). Row selection and sorting do work in the Data table (select-all.js and sortable-table.js). The Data table's pagination links point at `#data-table-page-2` and the like.
- **Evidence:** Chromium probes listed under G3-05; `src/blocks/data-table.html:98,117,132` (search input and selects with no handler), `src/blocks/user-directory.html:46-101`, `src/blocks/analytics-dashboard.html:86-98`.
- **Correction:** describe what the markup shows ("A table with a search field, filters, row selection, ...") or add the behavior.
- **TODO.md:** lines 160 and 186 (related, data-table only)

### Getting started

#### G3-02: Getting started (Astro) > Server runtime > Ids

- **Severity:** 3 (verified)
- **Double check:** holds on `245eaa1`. Refine the correction: `Dialog.astro:10` generates only the title id. The dialog's own `id`, which the trigger's `commandfor` needs, is never generated (`src/component-api/dialog/api.ts:10`), so listing Dialog as a component that generates ids repeats the trap. Suggested: "TextField, Select, NumberStepper, Range, ColorField, ToggleGroup, Tabs and the Dialog title read `Astro.locals.$id` ... Components a trigger points at (Dialog, Drawer, Menu, Anchor, Copy, Toaster and Tooltip) need an `id` prop." The same sentence is in `packages/opui/README.md:111` and `packages/opui/skills/opui/references/getting-started.md:184`.
- **Now at:** `src/docs/guide/getting-started/Astro.astro:84-87`, `packages/opui/README.md:111`, `packages/opui/skills/opui/references/getting-started.md:184`
- **Where:** `src/docs/guide/getting-started/Astro.astro:84-87` (rendered at /astro/guide/getting-started/#ids; the same sentence is in `packages/opui/README.md:111` and `packages/opui/skills/opui/references/getting-started.md:184`)
- **Says:** "Components that link elements with ids (form fields, Tabs, Drawer, Menu) read `Astro.locals.$id` when it exists and otherwise generate a random id per render."
- **Actually:** `Drawer` and `Menu` never read or generate an id. They take a required `id` prop, warn "Missing `id`" without it, and build `aria-labelledby` and the item `commandfor` from it. Only ColorField, Dialog, NumberStepper, Range, Select, Tabs, TabsItem, TextField and ToggleGroup call `createId(Astro.locals)`. A reader who leaves `id` off a Menu or Drawer expecting a generated one ends up with a trigger whose `commandfor` points at nothing.
- **Evidence:** `packages/opui/components/Drawer/Drawer.astro:19,38` and `Menu/Menu.astro:23,39` (`warnMissingId`, `id={id}`, no `createId`); `grep -rln createId packages/opui/components --include=*.astro` lists only the nine files above; `src/component-api/drawer/api.ts:31` and `src/component-api/menu/api.ts:81` say the `id` is "Required."
- **Correction:** name the components that do generate ids (form fields, Tabs, Dialog) and say Drawer and Menu need an `id` prop.

#### G3-01: Getting started (HTML, Astro, React, Svelte, Vue) > Install via NPM

- **Severity:** 7 (verified, re-checked by the coordinator; raised from 5 in the double check)
- **Double check:** partly right on `245eaa1`; the fields below are corrected. Raised because, on the Astro, React, Svelte and Vue pages, the npm path leads straight to a failing build, and React and Svelte can't import components at all; it lasts until 6.0.0 is `latest`. The HTML page's note does mention `opui-css@next`, so "Actually" now says so. All 19 specifiers resolve on rc.1 except the `elements/` ones, which neither published version exports.
- **Now at:** `src/docs/guide/getting-started/partials/InstallCommand.astro:9,14`, `HTML.astro:77`, `Astro.astro:35,57`, `React.astro:50,68`, `Svelte.astro:60,90`, `Vue.astro:66,93`, `PickAndChoose.astro:11-19`, `React.astro:21`, `Svelte.astro:13`
- **Where:** `src/docs/guide/getting-started/partials/InstallCommand.astro:9,14` with the CSS imports at `HTML.astro:77`, `Astro.astro:35`, `React.astro:50`, `Svelte.astro:60`, `Vue.astro:66` and the component imports at `Astro.astro:57`, `React.astro:68`, `Svelte.astro:90`, `Vue.astro:93` (rendered at /&lt;framework>/guide/getting-started/#installation and #css)
- **Says:** "pnpm add opui-css" / "npm install opui-css", then `import "opui-css/css/imports.css"`, `import { Button } from "opui-css/react"` and `from "opui-css/svelte"` ("OPUI ships first-class React 19 components." / "Svelte 5 components")
- **Actually:** both commands install 5.4.3 today, because npm `latest` is 5.4.3 and 6.0.0-rc.1 is only on the `next` tag. The 5.4.3 `exports` map appends `.css` itself (`"./css/*": "./css/*.css"`, `"./core/*": "./core/*.css"`), so under Node's exports resolution every `.css` specifier on these pages fails (`opui-css/css/imports.css`, `opui-css/css/layers.css`, `opui-css/core/palette.css`, ... all MODULE_NOT_FOUND, because they map to `imports.css.css`; only the extensionless 5.x spelling `opui-css/css/imports` works; bundlers apply the same map), and 5.4.3 has no `./react`, `./svelte`, `./env.d.ts` or `./open-props.css` export (ERR_PACKAGE_PATH_NOT_EXPORTED). So on `latest` the CSS import fails on all five pages and the React and Svelte component imports fail too. The HTML page's `UnreleasedNote` sits under the CDN heading (`HTML.astro:63`) and is framed around the jsDelivr links; it does say `opui-css@next` has the release candidate (6.0.0-rc.1), but nothing under Install via NPM says `npm install opui-css` gets 5.4.3; the four framework pages have no note and no `opui-css@next` hint, while every `llms.txt` says "`npm install opui-css` gets 5.4.3, the previous major".
- **Evidence:** `npm view opui-css dist-tags` gives `latest: 5.4.3, next: 6.0.0-rc.1`; `opui-css@5.4.3/package.json` exports are `.`, `./open-props`, `./astro`, `./vue`, `./components/*`, `./core/*`, `./css/*`, `./dist/*`; Node `require.resolve` from a project that links 5.4.3 as `node_modules/opui-css` fails on all twelve `.css`/`.js` specifiers of the Getting started snippets and on `opui-css/react`, `opui-css/svelte`, while the same script passes on the rc.1 tarball; `packages/opui/CHANGELOG.md:644-652` (the unreleased 6.0.0 Fixed entries: `exports` now resolve the `.css` specifiers, "Previously they resolved to `*.css.css`"; `env.d.ts` and `open-props.css` were added to `exports`), and the 5.4.3 README itself shows `import "opui-css/css/imports.css"`, which fails on 5.4.3; `src/components/UnreleasedNote.astro` is only used by `HTML.astro:63` and `concepts.astro`; `src/integrations/llms.mjs:73-77`.
- **Correction:** until 6.0.0 is `latest`, show the unreleased warning in the Install via NPM section of all five pages and give `npm install opui-css@next` (rc.1), or change the commands to `opui-css@next`. Don't promise that `@next` matches the docs: 6.0.0-rc.1 has no `./elements/*` export, so the pages and blocks that import `opui-css/elements/*.js` still fail on it.

### Home

#### G3-04: Home > Build your theme

- **Severity:** 2 (probable)
- **Double check:** holds on `245eaa1`.
- **Now at:** `src/docs/Home.astro:240`, `Home.astro:46-48`
- **Where:** `src/docs/Home.astro:240` (rendered at /html/ and the other four framework homes)
- **Says:** "Three choices set 139 role tokens. Try it."
- **Actually:** 139 is the number of role-tier tokens in `tokens.json`, but the three choices (Start from, Brand color, Corners) do not set all of them. In Chromium, applying each preset, each brand swatch and each corner value in turn (and a preset+brand+large corners combination) changed the value of 107 of the 139 role tokens at most, and 32 never changed (`--ui-space-1` to `--ui-space-8`, `--ui-font-size-body`/`-small`/`-large`/`-caption`, `--ui-icon-size-*`, `--ui-focus-ring-style`, `--ui-line-height-tight`, `--ui-blue`/`-green`/`-orange`/`-red`, and others). "Probable" because "set" can be read as "drive".
- **Evidence:** `packages/opui/tokens.json` tier counts (139 role, 47 knob, 42 primitive, 53 component, 10 hook, 1 input); Chromium probe on http://127.0.0.1:4400/html/ comparing `getComputedStyle(documentElement).getPropertyValue(role)` after each `form.theme-quick` choice.
- **Correction:** say "Three choices drive most of the 139 role tokens", or drop the count.

### llms.txt

#### G3-10: llms.txt (all frameworks) > opening bullets

- **Severity:** 3 (verified)
- **Double check:** holds on `245eaa1`. For agents, full specifiers work better: "`opui-css/css/layers.css`, `opui-css/core/palette.css`, `opui-css/css/theme.css`, `opui-css/core/normalize.css`, `opui-css/css/components/<name>.css` (plus `choice.css` for checkbox, radio and switch), optionally `opui-css/css/compat.css`, then `opui-css/core/utils.css`", as on `PickAndChoose.astro:11-19`.
- **Now at:** `src/integrations/llms.mjs:72`
- **Where:** `src/integrations/llms.mjs:72` (rendered at /llms.txt and /&lt;framework>/llms.txt, line 8)
- **Says:** "With a bundler, import everything with `@import "opui-css/css/imports.css"`, or one component at a time from `opui-css/css/components/<name>.css`."
- **Actually:** a component file alone does not style anything. Components read the `--ui-*` roles from `theme.css` and `palette.css`, and need `layers.css` and `normalize.css` for the cascade order and the focus ring; Getting started lists `layers.css`, `palette.css`, `theme.css`, `normalize.css`, the component files and `utils.css`. In Chromium, a page that links only `css/components/button.css` renders `<button class="ui-button ui-filled ui-primary">` with a transparent background, 0 radius and 18px height, against a filled green 40px button with 8px radius once the base files are added.
- **Evidence:** two test pages (button.css alone, and with the base files) (computed {"h":"18px","bg":"rgba(0, 0, 0, 0)","radius":"0px"} against `{"h":"40px","bg":"oklch(0.53 0.1 145)","radius":"8px"}`); `packages/opui/css/components/button.css:4-7,69,71` (`--_accent`, `--_radius`, `--_size` read roles that only `theme.css` and `palette.css` declare).
- **Correction:** "...or the files you need one by one (`layers.css`, `palette.css`, `theme.css`, `normalize.css`, `components/<name>.css`, `utils.css`, see Getting started)".

### Theme builder

#### G3-07: Theme builder > Start > Tonal fill

- **Severity:** 2 (verified)
- **Double check:** partly right on `245eaa1`; the fields below are corrected. Right at `c0d4970`; the tonal Avatar added since reads the token too, so the correction names it.
- **Now at:** `src/utils/theme-builder-controls.ts:263`
- **Where:** `src/utils/theme-builder-controls.ts:263` (rendered under the "Tonal fill" setting at /theme-builder/)
- **Says:** "Tonal buttons and chips"
- **Actually:** the setting writes `--ui-primary-tonal` and `--ui-on-primary-tonal`, and `Button` (primary tonal), the tonal `Avatar` (`avatar.css:9-10`, since `c0d4970`) and the checked background of a Checkbox, Radio or Switch `card` (`choice.css:221`) read them. A `Chip` is always `--ui-surface-tonal`, so the "Brand tint / Neutral" toggle never changes a chip. In Chromium with --ui-primary-tonal: rgb(255 0 0) on `html`, a `.ui-button.ui-tonal.ui-primary` turned red while `.ui-chip` and a plain `.ui-button.ui-tonal` kept `oklch(0.93 0.01 255)`; setting `--ui-surface-tonal` changed the chip and the neutral tonal button but not the primary one.
- **Evidence:** `packages/opui/css/components/button.css:169,172`, `choice.css:221`, `chip.css:3`.
- **Correction:** "Primary tonal buttons, tonal avatars and checked choice cards" (chips follow "Tonal surface", `theme-builder-controls.ts:415-416`).

#### G3-08: Theme builder > Neutrals and surfaces > Filled surface

- **Severity:** 2 (verified)
- **Double check:** partly right on `245eaa1`; the fields below are corrected. "Dividers and tracks" in the old correction was too broad: only the filled variants read the token. Tables have header, footer and hover fills, not stripes.
- **Now at:** `src/utils/theme-builder-controls.ts:413`
- **Where:** `src/utils/theme-builder-controls.ts:413`
- **Says:** "Filled cards and fields"
- **Actually:** `--ui-surface-filled` is read by `List` (its default background), `Table` (header cells, footer cells and row hover), filled `Divider`, `Progress` and `Range`, and the dark code block. Default dividers use `--ui-border-color` and default progress tracks `--ui-surface-tonal`. `Card` has no filled variant, and filled `TextField`, `Select` and `Textarea` use `--ui-surface-tonal`. In Chromium, --ui-surface-filled: rgb(255 0 0) changed a `.ui-list` and a `.ui-table` head and left `.ui-card`, `.ui-card.ui-tonal`, `.ui-card.ui-elevated`, `.ui-card.ui-outlined`, `.ui-text-field.ui-filled` and `.ui-text-field` unchanged. (`src/utils/theme-token-descriptions.ts:410-411` says "table stripes", but `table.css` has no stripes; see G2-14.)
- **Evidence:** `packages/opui/css/components/list.css:10`, `table.css:21,44,108`, `divider.css:11`, `progress.css:22`, `range.css:119`, `text-field.css:404-406`.
- **Correction:** "Lists, table headers and footers, and filled dividers, progress bars and range tracks".

#### G3-09: Theme builder > Typography > Control text size

- **Severity:** 2 (verified)
- **Double check:** holds on `245eaa1`. `--ui-font-size-control` also sizes tab labels and default-size toggle buttons, so "Text in buttons, fields, tabs and toggle buttons".
- **Now at:** `src/utils/theme-builder-controls.ts:917`
- **Where:** `src/utils/theme-builder-controls.ts:917`
- **Says:** "Text in buttons, fields and menus"
- **Actually:** `--ui-font-size-control` is read by `Button`, `TextField`, `Tabs` and `ToggleButton` only. Menu items keep their own size. In Chromium with `--ui-font-size-control: 30px` on `html`, buttons and a text field input went from 16px to 30px while the items of the real `.ui-menu` on /html/components/menu/ stayed 14px.
- **Evidence:** `grep -rn "font-size-control" packages/opui/css` gives only `button.css:54`, `tabs.css:85`, `text-field.css:29,486`, `toggle-button.css:7`, `theme.css:218`.
- **Correction:** "Text in buttons, fields, tabs and toggle buttons".

## Migrating guide

### M1-01: Migrating guide > intro

- **Severity:** 3 (verified)
- **Double check:** holds on `245eaa1`.
- **Now at:** `packages/opui/MIGRATING.md:3`
- **Where:** `packages/opui/MIGRATING.md:3` (rendered at /html/guide/migrating/ intro; frameworks: all)
- **Says:** "Every change is listed in the [changelog](https://github.com/felix-bohlin/ui/blob/main/packages/opui/CHANGELOG.md)."
- **Actually:** two accessibility-relevant changes to components of this guide are in no CHANGELOG entry, no MIGRATING step and no What's new note. `Callout` no longer renders `role="note"` (5.4.3 added it automatically and its docs said so), and `Accordion` lost `role="region"` plus `aria-labelledby` on the content wrapper and `aria-controls` on the summary.
- **Evidence:** 5.4.3 `components/Callout/Callout.astro:10` and `Callout.vue:10` (`role="note"`); 5.4.3 docs at git tag 5.4.3 `src/docs/components/callout.astro:198` ("The `role="note"` attribute is automatically added to the Callout container"); 5.4.3 `components/Accordion/Accordion.astro:26,34,35` and `Accordion.vue:19,27,28` (`aria-controls`, `role="region"`, `aria-labelledby`). Working tree and 6.0.0-rc.1: `components/Callout/Callout.astro`, `Callout.vue`, `components/Accordion/AccordionSummary.*` and `AccordionContent.*` render none of them. `grep -n -i 'role="note"\|region\|aria-controls' packages/opui/CHANGELOG.md` only matches unrelated Dialog and Tabs entries.
- **Correction:** add Breaking or Changed entries (and MIGRATING lines) for both removals, or drop "Every change".

### M1-02: Astro slot attribute shown for Vue

- **Severity:** 2 (verified)
- **Same issue reported as:** M2-02
- **Double check:** holds on `245eaa1`.
- **Now at:** `packages/opui/MIGRATING.md:39`, `packages/opui/MIGRATING.md:45`, `packages/opui/MIGRATING.md:621`, `packages/opui/MIGRATING.md:630`, `packages/opui/MIGRATING.md:716`, `packages/opui/MIGRATING.md:725`, `src/docs/guide/migrating.astro`
- **Where:** `packages/opui/MIGRATING.md:45`, `:630`, `:725` (rendered at /vue/guide/migrating/#accordion, #list-item, #range; frameworks: vue)
- **Says:** "If you put your own chevron in the summary, you get two: move it to the `marker` slot on `AccordionSummary` and give it `.ui-marker`." with the snippet `+   <svg slot="marker" class="ui-marker">…</svg>`; likewise `+ <Fragment slot="label">Checkbox 1</Fragment>` after "Use the `label` and `description` props, or the slots of the same name for rich content", and `+ <b slot="value-text">21°</b>` after "In Astro and Vue, the label goes in the `label` prop or slot instead of the default slot, and the readout slot is `value-text` instead of `value`."
- **Actually:** `slot="name"` on an element is Astro syntax. In Vue 3 the attribute is not a slot assignment, so the content goes to the default slot. For the Accordion step the default chevron still renders next to the custom one (two chevrons, the thing the step warns about), and the Range readout and ListItem label are not picked up. Vue needs `<template #marker>`, `<template #value-text>` and `<template #label>`.
- **Evidence:** Vue 3.5.39 server render of `<Comp>Title<svg slot="marker" class="ui-marker"/></Comp>` with `Comp` = `<summary><slot/><slot name="marker"><svg class="default-marker"/></slot></summary>` gives `Title<svg slot="marker" class="ui-marker"></svg>` followed by `<svg class="default-marker">`; with `<template #marker>` only the custom svg is rendered. `packages/opui/components/Accordion/AccordionSummary.vue` reads `$slots.marker`.
- **Correction:** show the Vue form (`<template #marker>`) next to the Astro one, or say the snippets are Astro.
- **Also M2-02 (severity 2):**
  - Double check: holds on `245eaa1`.
  - Now at: `packages/opui/MIGRATING.md:775`, `packages/opui/MIGRATING.md:950`, `packages/opui/MIGRATING.md:986`
  - Where: `packages/opui/MIGRATING.md:775`, `:950`, `:986` (also rendered at /html/guide/migrating/#select, #text-field, #textarea; frameworks: all, the fault is Vue)
  - Actually: `<span slot="start">` is Astro syntax. Vue 3 has no `slot` attribute on elements: the span lands in the default slot (in `Select`, the option list) and the `start` slot stays empty. Vue needs `<template #start>€</template>`.
  - Correction: "In Astro these are slots (`<span slot="start">€</span>`); in Vue use `<template #start>€</template>`."

### M1-03: Avatar size tokens

- **Severity:** 2 (verified)
- **Same issue reported as:** C7-13
- **Double check:** holds on `245eaa1`.
- **Now at:** `packages/opui/MIGRATING.md:109`, `packages/opui/CHANGELOG.md:308`
- **Where:** `packages/opui/MIGRATING.md:109` (rendered at /html/guide/migrating/#avatar; frameworks: all). The same sentence is in `src/utils/whats-new.ts:123` (avatar) and `packages/opui/CHANGELOG.md:297`.
- **Says:** "Text uses `--ui-on-primary`, and sizes follow `--ui-control-size` and `--ui-button-size-*`."
- **Actually:** Avatar sizes read only `--ui-control-size` and `--ui-control-size-x-small|small|large`. `--ui-button-size-*` is read by Button (its default points at the control sizes), not by Avatar.
- **Evidence:** `packages/opui/css/components/avatar.css:6,43,49,54`. Chromium 153: with `--ui-button-size: 70px` and `--ui-button-size-x-small|small|large: 50|60|80px` on a wrapper, a small `.ui-button` becomes 60px tall while the avatars stay 28, 32, 40 and 48px.
- **Correction:** "sizes follow `--ui-control-size` and `--ui-control-size-*`".
- **Also C7-13 (severity 2):**
  - Double check: holds on `245eaa1`.
  - Now at: `src/utils/whats-new.ts:124`
  - Where: `src/utils/whats-new.ts:123` (also rendered at /html/components/avatar/#whats-new; frameworks: all)
  - Actually: `avatar.css` reads only `--ui-control-size`, `--ui-control-size-x-small`, `--ui-control-size-small` and `--ui-control-size-large`. Setting `--ui-button-size-*` resizes buttons but not avatars.
  - Correction: "Sizes follow `--ui-control-size` and its `-x-small`, `-small` and `-large` steps, which buttons share by default."
  - TODO.md: not listed (the same wording is at `src/utils/whats-new.ts:705` for another page, not checked)

### M1-04: Migrating guide > Button

- **Severity:** 2 (verified)
- **Double check:** holds on `245eaa1`. `packages/opui/CHANGELOG.md:31` has the same clause and needs the same fix.
- **Now at:** `packages/opui/MIGRATING.md:200`, `packages/opui/CHANGELOG.md:31`
- **Where:** `packages/opui/MIGRATING.md:200` (rendered at /html/guide/migrating/#button; frameworks: all). Same clause in `packages/opui/CHANGELOG.md:31`.
- **Says:** "In HTML, remove `href` from links with `aria-disabled="true"`, because the CSS no longer blocks clicks on them. The same goes for `Chip` links."
- **Actually:** no published version blocked clicks on such links. 5.4.3 has no `aria-disabled` rule anywhere and no `pointer-events` in `button.css` or `chip.css`, `Button` types forbid `disabled` on `as="a"`, and `Chip` has no disabled handling. The advice (drop `href`) is right for 6.x, the "no longer blocks" reason describes an unreleased state.
- **Evidence:** 5.4.3 `css/components/button.css` (only `&:where([disabled])`), `css/components/chip.css` (only `&:where([disabled])`), `components/Button/types.ts` (`as?: "a"` with `disabled?: never`); `grep -rn aria-disabled` over the whole 5.4.3 package finds nothing; 6.0.0-rc.1 `button.css` and `chip.css` also have no `pointer-events`.
- **Correction:** "because the CSS doesn't block clicks on them" (or drop the clause).

### M1-05: Callout headingLevel

- **Severity:** 2 (verified)
- **Same issue reported as:** C8-02
- **Double check:** holds on `245eaa1`. With `headingLevel={4}` gone from the "before" code, the "after" heading should be `<h3>` to keep the same level.
- **Now at:** `packages/opui/MIGRATING.md:222`, `packages/opui/MIGRATING.md:225`, `packages/opui/CHANGELOG.md:33`
- **Where:** `packages/opui/MIGRATING.md:222` and `:225` (rendered at /html/guide/migrating/#callout; frameworks: astro, vue). Also `packages/opui/CHANGELOG.md:33` and `src/utils/whats-new.ts:249`.
- **Says:** "The `title` slot and `headingLevel` are gone", with the before snippet `- <Callout severity="info" headingLevel={4}>`.
- **Actually:** 5.4.3 `Callout` has no `headingLevel` prop. Its props are `severity` and `variant`, and the `title` slot always renders `<h3 class="ui-title">`. `headingLevel` appears nowhere in the 5.4.3 package or in the 6.0.0-rc.1 components.
- **Evidence:** 5.4.3 `components/Callout/Callout.astro:68-69`, `components/Callout/types.ts`; `tests/unit/released-api.json` `props.Callout` = ["severity","variant"]; `grep -rni headingLevel` over 5.4.3 and rc.1 `components/`: no match.
- **Correction:** drop `headingLevel` from the sentence and the snippet (the 5.x title was a fixed `h3`; write `<h3>` to keep the level).
- **Also C8-02 (severity 2):**
  - Double check: holds on `245eaa1`.
  - Now at: `src/utils/whats-new.ts:250`
  - Where: `src/utils/whats-new.ts:249` (rendered at /astro/components/callout/#changelog and /vue/components/callout/#changelog). Same wording in `packages/opui/MIGRATING.md:222,225` and `packages/opui/CHANGELOG.md:33`.
  - Actually: no 5.x release has a `headingLevel` prop on Callout. The `title` slot always rendered a fixed `<h3 class="ui-title">`.
  - Correction: drop `headingLevel` from the note and from the MIGRATING.md diff; only the `title` slot (always an `<h3>`) is gone.

### M1-06: Migrating guide > Card

- **Severity:** 3 (verified)
- **Double check:** holds on `245eaa1`.
- **Now at:** `packages/opui/MIGRATING.md:242`, `packages/opui/CHANGELOG.md:326`, `CHANGELOG.md:275`
- **Where:** `packages/opui/MIGRATING.md:242` (rendered at /html/guide/migrating/#card; frameworks: all). Also `packages/opui/CHANGELOG.md:315`, which `packages/opui/CHANGELOG.md:264` contradicts.
- **Says:** "Tonal and elevated cards have a border in the page background color, so they stay visible on tonal surfaces. In dark mode, borders and field borders inside them use the page background too."
- **Actually:** the card's own border is the page background (true in both modes). The second sentence is not true of the library: the default `--ui-border-color-on-raised` and `--ui-field-border-color-on-raised` are the same border mixes as `--ui-border-color` and `--ui-field-border-color` in both modes. In dark mode a border inside a tonal card is oklch(0.3481 0.01 255) and a field border oklch(0.625 0.01 255), not the page background oklch(0.27 0.01 255). Only this docs site does it, by overriding the token in `src/styles/base.css:47-57`. `CHANGELOG.md:264` itself says a theme "such as the page background in dark mode, sets the `-on-raised` tokens".
- **Evidence:** `packages/opui/css/theme.css:547-559` (dark branch is `color-mix(... var(--ui-border-strength-dark), var(--ui-surface))`) and `:342-346`; `packages/opui/css/components/card.css:46-47,55-56`. Chromium 153 on a library-only page (core CSS from the working tree, no docs CSS), dark scheme, `.ui-card.ui-tonal`: `--ui-border-color` resolves to oklch(0.3481 0.01 255), `--ui-field-border-color` to oklch(0.625 0.01 255), `--ui-surface` to oklch(0.27 0.01 255), card border oklch(0.27 0.01 255).
- **Correction:** drop the dark mode sentence (or say a theme can set `--ui-border-color-on-raised` to the page background in dark mode).
- **TODO.md:** not listed (TODO.md:261 is about the tonal surface role, not this claim)

### M1-07: Migrating guide > Checkbox, Radio

- **Severity:** 2 (verified)
- **Double check:** holds on `245eaa1`. Read as "of the two inputs, only `--_size` works through `style`": other root `--_` properties such as `--_accent` also work through `style`. `whats-new.ts:388` and `:839` repeat the pairing.
- **Now at:** `packages/opui/MIGRATING.md:282`, `packages/opui/MIGRATING.md:299`, `packages/opui/MIGRATING.md:662`, `packages/opui/MIGRATING.md:679`, `src/utils/whats-new.ts:388`, `src/utils/whats-new.ts:839`
- **Where:** `packages/opui/MIGRATING.md:282` with `:299` (Checkbox) and `:662` with `:679` (Radio); frameworks: astro, vue. The What's new notes for checkbox and radio ("`style` goes to the root `<label>` ... so `--_` properties set through it apply") repeat the pairing.
- **Says:** "`--_ripple-size` and `--_size` are the inputs to override" and "`style` goes to the root `<label>` instead of the `<input>`, like `class`. Set `--_` properties through `style`".
- **Actually:** `--_size` works through `style` on the label, `--_ripple-size` does not. It is declared on the `input` itself, which overrides the inherited value from the label.
- **Evidence:** `packages/opui/css/components/choice.css:106` (`input:is([type="checkbox"], [type="radio"]) { --_ripple-size: 175% }`); `src/component-api/custom-properties/choice.ts:57-61` ("Set on `input`."). Chromium 153: `<label class="ui-checkbox" style="--_ripple-size: 300%; --_size: 3rem">` gives the input computed `--_ripple-size: 175%` and a 48px box; `style="--_ripple-size: 300%"` on the `<input>` gives `300%`.
- **Correction:** say `--_ripple-size` is set on the `<input>` (class or CSS) and only `--_size` through `style`.

### M1-08: Migrating guide > Description list

- **Severity:** 2 (verified)
- **Double check:** holds on `245eaa1`. `packages/opui/CHANGELOG.md:75` has the same "exports are unchanged" sentence for the DescriptionList part files and needs the same fix.
- **Now at:** `packages/opui/MIGRATING.md:366`
- **Where:** `packages/opui/MIGRATING.md:366` (rendered at /html/guide/migrating/#description-list; frameworks: astro, vue)
- **Says:** "The `opui-css/<framework>` exports are unchanged; update deep `opui-css/components/*` imports."
- **Actually:** the entries did change, as `MIGRATING.md:352-357` says two paragraphs earlier. `opui-css/vue` exports `DescriptionListDescription` instead of `Description`, and `opui-css/astro` now exports the flat parts `DescriptionListDescription`, `DescriptionListItem` and `DescriptionListTerm` (5.4.3 exported only `DescriptionList`, with `.Item`, `.Term` and `.Description` aliases).
- **Evidence:** 5.4.3 `vue/index.ts:13` (`Description`), 5.4.3 `astro/index.ts:13` (only `DescriptionList`); working tree `vue/index.ts:26` and `astro/index.ts:26-28`.
- **Correction:** "Only the Vue `Description` export is renamed (above); the Astro entry now also exports the parts by their flat names."

### M1-09: Migrating guide > Drawer

- **Severity:** 1 (verified)
- **Double check:** holds on `245eaa1`. "(it had no name before)" reads better as "(5.x set no name itself)", since users could always pass `aria-label`. `packages/opui/CHANGELOG.md:52` needs the same fix.
- **Now at:** `packages/opui/MIGRATING.md:469`, `packages/opui/MIGRATING.md:500`, `packages/opui/CHANGELOG.md:52`, `packages/opui/CHANGELOG.md:117`
- **Where:** `packages/opui/MIGRATING.md:469` and `:500` (frameworks: astro, vue). Also `packages/opui/CHANGELOG.md:117`.
- **Says:** "The drawer no longer looks for your own heading, so a drawer without a `DrawerTitle` needs `aria-label`." and "the Vue types no longer export `DrawerHeadingIdKey`, `DrawerSlots`, `DrawerHeaderSlots` or `DrawerFooterSlots`."
- **Actually:** 5.4.3 never looked for a heading (it rendered `<span>{heading}</span>` and set no `aria-labelledby` at all), and it never exported `DrawerHeadingIdKey`. Only `DrawerSlots`, `DrawerHeaderSlots` and `DrawerFooterSlots` existed. The consequence (pass `aria-label` without a `DrawerTitle`) is right.
- **Evidence:** 5.4.3 `components/Drawer/Drawer.astro`, `Drawer.vue`, `DrawerHeader.astro:12` (`{heading && <span>{heading}</span>}`), `components/Drawer/types.d.vue.ts:21-31`; `grep -rn DrawerHeadingIdKey` over 5.4.3 and 6.0.0-rc.1: no match.
- **Correction:** drop `DrawerHeadingIdKey` and say a drawer is named by `DrawerTitle` or `aria-label` (it had no name before).

### M1-10: Drawer title size

- **Severity:** 2 (verified)
- **Same issue reported as:** C4-05
- **Double check:** holds on `245eaa1`.
- **Now at:** `packages/opui/MIGRATING.md:486`, `packages/opui/CHANGELOG.md:55`
- **Where:** `packages/opui/MIGRATING.md:486` (rendered at /html/guide/migrating/#drawer; frameworks: all). Also `src/utils/whats-new.ts:585`.
- **Says:** "The title is `--ui-font-size-h4`, like the `Dialog` title, instead of `--ui-font-size-large`. `--_header-font-size` is `--_title-font-size`."
- **Actually:** v5 has no `--ui-*` tokens. The 5.4.3 drawer title was `--_header-font-size: var(--font-size-3)` (Open Props, 1.25rem). `--ui-font-size-large` was only the value in an unreleased state.
- **Evidence:** 5.4.3 `css/components/drawer.css:14,58`; `grep -rn 'ui-font-size-large'` over 5.4.3: no match; Open Props `--font-size-3: 1.25rem` in 5.4.3 `dist/op.css`.
- **Correction:** "instead of `--font-size-3` (1.25rem)".
- **TODO.md:** 218 (describes the unreleased state where the drawer title was `--ui-font-size-large`)
- **Also C4-05 (severity 2):**
  - Double check: holds on `245eaa1`.
  - Now at: `src/utils/whats-new.ts:588`
  - Where: `src/utils/whats-new.ts:585` (also `packages/opui/MIGRATING.md:486`, `packages/opui/CHANGELOG.md:55`; rendered at /html/components/drawer/#changelog; frameworks: html, astro, vue, which get the Breaking note)
  - Actually: in 5.4.3 the drawer title was `--_header-font-size: var(--font-size-3)` (an Open Props step), and 5.4.3 has no `--ui-font-size-large` token at all. The published rc.1 already uses `--ui-font-size-h4`. No published version sized the title with `--ui-font-size-large`, so the "from" value is wrong.
  - Correction: say "instead of `--font-size-3`" (the 5.x `--_header-font-size` default) in the three places.

### M1-11: List divided

- **Severity:** 1 (verified)
- **Same issue reported as:** C5-06
- **Double check:** holds on `245eaa1`.
- **Now at:** `packages/opui/MIGRATING.md:569`, `src/utils/whats-new.ts:685`
- **Where:** `packages/opui/MIGRATING.md:569` against `src/utils/whats-new.ts:678` (list, html key)
- **Says:** MIGRATING: "`List` no longer takes `divided`. Use `bordered` (`.ui-bordered`)." What's new (html): "Breaking: `.ui-divided` is removed. Use `.ui-bordered`."
- **Actually:** `.ui-divided` never existed in 5.x. `divided` was a type-only prop that neither the Astro nor the Vue List used. So the What's new note announces the removal of a class that no release had, while MIGRATING speaks of the prop.
- **Evidence:** 5.4.3 `components/List/List.astro`, `List.vue` (no `divided`), `components/List/types.ts:4` (type only), `css/components/list.css` (no `.ui-divided`); `tests/unit/released-api.json` `classes` has `.ui-bordered` but no `.ui-divided`.
- **Correction:** drop the html note, or say `divided` was a type with no effect.
- **Also C5-06 (severity 1):**
  - Double check: holds on `245eaa1`.
  - Now at: `src/utils/whats-new.ts:685`
  - Where: `src/utils/whats-new.ts:678` (rendered at /html/components/list/#changelog; frameworks: html)
  - Actually: 5.4.3 has no `.ui-divided` class. `divided` was only a declared prop in the types of `List`; neither `List.astro` nor `List.vue` read it and `list.css` has no such class, so nothing was removed for HTML users.
  - Correction: drop the HTML variant of the note (keep the framework one about the `divided` prop), or say that `.ui-divided` never styled anything.

### M1-12: Migrating guide > Progress

- **Severity:** 2 (verified)
- **Double check:** holds on `245eaa1`.
- **Now at:** `packages/opui/MIGRATING.md:635`, `packages/opui/CHANGELOG.md:333`
- **Where:** `packages/opui/MIGRATING.md:635` (rendered at /html/guide/migrating/#progress; frameworks: all). Same claim in `packages/opui/CHANGELOG.md:322`.
- **Says:** "Without a visible label the progress bar aligns to the middle. Give it a hidden label (`.ui-sr-only` in HTML)."
- **Actually:** the progress bar always aligns to the middle (was `baseline` in 5.x), whether or not a visible label exists. A hidden label does not change the alignment, it only names the `<progress>`. For Checkbox and Radio the middle alignment really depends on the missing label (`:not(:has(.ui-label, .ui-text))`), Progress has no such rule.
- **Evidence:** `packages/opui/css/components/progress.css:18` (`vertical-align: middle`, no `:has()` condition); 5.4.3 `css/components/progress.css:14` (`vertical-align: baseline`). Chromium 153: `.ui-progress` next to a `<label for>` and without one both compute `vertical-align: middle`.
- **Correction:** "The progress bar aligns to the middle of the line (was baseline). Give it an accessible name (`aria-label` or a `.ui-sr-only` label)."

### M1-13: Range --_track-fill

- **Severity:** 2 (verified)
- **Same issue reported as:** C3-06
- **Double check:** holds on `245eaa1`.
- **Now at:** `packages/opui/MIGRATING.md:692`, `packages/opui/CHANGELOG.md:69`
- **Where:** `packages/opui/MIGRATING.md:692` (rendered at /html/guide/migrating/#range; frameworks: astro, vue). Also `packages/opui/CHANGELOG.md:69` and `src/utils/whats-new.ts:849`.
- **Says:** "Astro and Vue no longer set `--_track-fill` from script. The track fill is a scroll-driven animation in CSS, so remove any script that sets it."
- **Actually:** the 5.4.3 Astro and Vue Range never set `--_track-fill`. Their only script mirrors the value into the `<output>`, and the package ships only `css/js/checkbox.js` and `toast.js`. The property was only read by `range.css` (default `0%`); Chromium 153 with the 5.4.3 `dist/opui.css` and `<input type="range" value="50">` computes `--_track-fill: 0%`.
- **Evidence:** 5.4.3 `components/Range/Range.astro` (script mirrors `<output>` only), `components/Range/Range.vue` (no script), `css/components/range.css:206,229` (only reader); `grep -rln track-fill` over 5.4.3 finds only `css/components/range.css` and `dist/*`; the 5.4.3 Range docs (`src/docs/components/range.astro` at tag 5.4.3) have no `--_track-fill` instruction.
- **Correction:** "`--_track-fill` is gone. The track fill is a scroll-driven animation in CSS, so remove any code of yours that sets it."
- **Also C3-06 (severity 2):**
  - Double check: partly right on `245eaa1`; the fields below are corrected. Firefox filled 5.x ranges natively, which "Actually" and the correction now mention. The core claim, that no 5.x component set `--_track-fill` from script, holds.
  - Now at: `src/utils/whats-new.ts:862`
  - Where: `src/utils/whats-new.ts:849` (`slots(...)`, so the Astro and Vue pages), also `packages/opui/CHANGELOG.md:69` and `packages/opui/MIGRATING.md:692`; rendered at /astro/components/range/#migrating-list and /vue/components/range/#migrating-list
  - Actually: no published 5.x `Range` set `--_track-fill` from script, so there is nothing for an upgrader to remove from the component. In 5.4.3 the Astro `Range.astro` script only copies the input value into the `<output>` (`output.textContent = ...`), `Range.vue` has no script that touches the track, and the CSS only reads `var(--_track-fill, 0%)` with no animation, so in Chromium and Safari the fill never moved without user code (Firefox filled the track natively through `::-moz-range-progress`). The same is true of the Astro component in 5.0.0, 5.1.0, 5.2.0, 5.3.0 and 5.4.0 (and of Vue in 5.3.0 and 5.4.0), and of 6.0.0-rc.1, which already has the CSS fill. The note describes a change from an unpublished intermediate state, not from the last release.
  - Correction: drop this Breaking note (the HTML note "plain HTML ranges fill too" is the real change since 5.x), or say that the fill is now CSS and was not set by the 5.x components (only Firefox filled the track, natively).

### M1-14: Migrating guide > Range

- **Severity:** 4 (verified, re-checked by the coordinator)
- **Double check:** holds on `245eaa1`.
- **Now at:** `packages/opui/MIGRATING.md:708`, `packages/opui/MIGRATING.md:1238`
- **Where:** `packages/opui/MIGRATING.md:708` (rendered at /html/guide/migrating/#range; frameworks: all)
- **Says:** "`tonal` is the closest; set `--_track-bg-color: var(--ui-surface)` on the range for the old look."
- **Actually:** `--_track-bg-color` is an output that the `input` re-declares from `--_track-base-bg-color`, so setting it on the `.ui-range` root (where `style` goes in Astro and Vue) has no effect. The input to set is `--_track-base-bg-color`, as `MIGRATING.md:1230` itself says.
- **Evidence:** `packages/opui/css/components/range.css:29,123,265` (`--_track-bg-color: var(--_track-base-bg-color)` on the input); `src/component-api/custom-properties/range.ts:72-81` (`--_track-base-bg-color` kind "input", `--_track-bg-color` kind "output"). Chromium 153: &lt;label class="ui-range ui-tonal" style="--_track-bg-color: rgb(255, 0, 0)"> leaves the input's `--_track-bg-color` at the tonal surface, style="--_track-base-bg-color: rgb(255, 0, 0)" makes it rgb(255, 0, 0).
- **Correction:** "set `--_track-base-bg-color: var(--ui-surface)` on the range for the old look."

### M1-15: Migrating guide > Range

- **Severity:** 1 (verified)
- **Double check:** holds on `245eaa1`.
- **Now at:** `packages/opui/MIGRATING.md:719`
- **Where:** `packages/opui/MIGRATING.md:719` (rendered at /html/guide/migrating/#range; frameworks: astro, vue)
- **Says:** `- <Range options={ticks} valueSuffix="%">Volume</Range>` as the 5.x code.
- **Actually:** in 5.4.3 `options` only types and works together with `list` (the `<datalist>` id). Without `list` the input has no `list` attribute and the `<datalist>` has no id, so no tick marks. The step also does not say that `list` is now optional (generated).
- **Evidence:** 5.4.3 `components/Range/types.ts:12-16` (`{ list?: never; options?: never } | { list: string; options: ... }`), `components/Range/Range.astro:78,89` (`list={list}`, `<datalist id={list}>`); working tree `components/Range/Range.astro` generates `listId`.
- **Correction:** before snippet `<Range options={ticks} list="ticks" ...>`, and note that `list` can go.

### M2-01: Migrating from v5 to v6 > Select, Text field, Textarea

- **Severity:** 2 (verified)
- **Double check:** holds on `245eaa1`. Keep only the first option (write the v5 side as slots). The second option is already what `:775`, `:950` and `:986` say, and it fixes nothing because React and Svelte have no 5.x to migrate from.
- **Now at:** `packages/opui/MIGRATING.md:771`, `packages/opui/MIGRATING.md:911`, `packages/opui/MIGRATING.md:946`, `packages/opui/MIGRATING.md:982`
- **Where:** `packages/opui/MIGRATING.md:771`, `:911`, `:946`, `:982` (also rendered at /html/guide/migrating/#select, #text-field, #textarea; frameworks: all)
- **Says:** the "before" lines of the diffs, shown as the 5.x API: `- <Select label="Price" prefix="€" items={items} />`, `- <TextField label="Name" startText="Full name" supportingText="Required" />`, `- <TextField label="Amount" prefix="€" suffix="EUR" />`, `- <Textarea label="Bio" footer="0 / 160" />`
- **Actually:** in 5.4.3 `prefix`, `suffix`, `header`, `footer` and `supportingText` are slots only (Astro and Vue are the only frameworks 5.4.3 ships). No prop of those names exists, so these lines never rendered an affix or end text (Astro passes the unknown attribute on to the `<select>` or `<label>`). The prop form only exists in React and Svelte, which are new in 6.0 (`MIGRATING.md:775` says so).
- **Evidence:** 5.4.3 `components/Select/Select.astro:72-99`, `components/TextField/TextField.astro:84-119`, `components/Textarea/Textarea.astro:78-113` only read `Astro.slots.has("prefix" | "suffix" | "header" | "footer" | "supporting-text")` and destructure no such prop; 5.4.3 `package.json` exports only `./astro` and `./vue`.
- **Correction:** write the v5 side as slots (`<span slot="prefix">€</span>`, `<Fragment slot="supporting-text">Required</Fragment>`), or say the prop lines are the React/Svelte equivalent.

### M2-04: Migrating from v5 to v6 > Table

- **Severity:** 1 (verified)
- **Double check:** holds on `245eaa1`. Fine for the Table line, but don't copy the sentence to DescriptionList (`MIGRATING.md:366`, `CHANGELOG.md:75`): its Vue export did change (M1-08).
- **Now at:** `packages/opui/MIGRATING.md:823`, `packages/opui/CHANGELOG.md:75`, `MIGRATING.md:366`
- **Where:** `packages/opui/MIGRATING.md:823` (also `packages/opui/CHANGELOG.md:75`; rendered at /html/guide/migrating/#table; frameworks: all, the fault concerns Astro)
- **Says:** "The `opui-css/<framework>` exports are unchanged; update deep `opui-css/components/*` imports."
- **Actually:** true for Vue only. The 5.4.3 Astro barrel exports only `Table`, with the parts as `Table.Head` aliases; 6.x adds `TableBody`, `TableCell`, `TableColumn`, `TableColumnGroup`, `TableHead`, `TableHeaderCell`, `TableRow` (and `TableCaption`, `TableFoot`), which the paragraph at `MIGRATING.md:814` itself tells Astro users to import.
- **Evidence:** 5.4.3 `astro/index.ts:40` (`export { default as Table } from "../components/Table/index"`) and `components/Table/index.ts`; 6.x `astro/index.ts:58-67`; 5.4.3 `vue/index.ts:37-44` exports the same names as 6.x `vue/index.ts:58-67` (plus `TableCaption`, `TableFoot`).
- **Correction:** "The Vue exports are unchanged" (Astro: the flat names above).

### M2-03: Migrating from v5 to v6 > Text field

- **Severity:** 1 (verified)
- **Double check:** holds on `245eaa1`.
- **Now at:** `packages/opui/MIGRATING.md:927-928`, `packages/opui/MIGRATING.md:924`
- **Where:** `packages/opui/MIGRATING.md:927` (also rendered at /html/guide/migrating/#text-field; frameworks: all, the fault is in the HTML markup)
- **Says:** the diff `- <label class="ui-text-field" data-invalid> … <input aria-invalid="true">` / `+ <label class="ui-text-field"> … <input aria-invalid="true">`, under "Put `aria-invalid="true"` on the `<input>`".
- **Actually:** v5 markup had no `aria-invalid`; 5.4.3 only styles `[data-invalid]` and `:has(:user-invalid)`. The "before" line already carries the attribute the text tells the reader to add, so the diff shows only the removal.
- **Evidence:** 5.4.3 `css/components/text-field.css:245,294` (`[data-invalid]`; no `aria-invalid` anywhere in the file).
- **Correction:** before line `<label class="ui-text-field" data-invalid> … <input>`, after line `<label class="ui-text-field"> … <input aria-invalid="true">`.

### M2-05: Migrating from v5 to v6 > Toast

- **Severity:** 1 (verified)
- **Double check:** holds on `245eaa1`.
- **Now at:** `packages/opui/MIGRATING.md:990`, `packages/opui/CHANGELOG.md:127`
- **Where:** `packages/opui/MIGRATING.md:990` (also `packages/opui/CHANGELOG.md:127`; rendered at /html/guide/migrating/#toast; frameworks: all)
- **Says:** "`Toast` is removed. `toast.css`, `css/js/toast.js` and its types are gone"
- **Actually:** 5.4.3 shipped no Toast types. `components/Toast/` holds only `Toast.astro` and `Toast.vue`, `css/js/` has `checkbox.js` and `toast.js` without declaration files, and `astro/index.ts:43` and `vue/index.ts:51` export only the components.
- **Evidence:** 5.4.3 `components/Toast/`, `css/js/`, `astro/index.ts:43`, `vue/index.ts:51`.
- **Correction:** drop "and its types".

### M2-07: Migrating from v5 to v6 > Theme and tokens (corners)

- **Severity:** 1 (verified; lowered from 2 in the double check)
- **Double check:** partly right on `245eaa1`; the fields below are corrected. Dropping "file inputs" would remove a true change: a bare file input did move to `--ui-radius-small`. Only the `TextField` file input follows the field radius, and only a theme that sets `--ui-field-radius` above `--ui-radius` sees it, so the severity drops to 1.
- **Now at:** `packages/opui/MIGRATING.md:1178`, `packages/opui/CHANGELOG.md:311`
- **Where:** `packages/opui/MIGRATING.md:1170` (also `packages/opui/CHANGELOG.md:300`; rendered at /html/guide/migrating/#theme-and-tokens; frameworks: all)
- **Says:** "`kbd`, `mark`, `var`, `Tooltip`, `Checkbox`, file inputs and rounded `Avatar` never get rounder than `--ui-radius`."
- **Actually:** true for the others (they use `--ui-radius-small`, `min(5px, var(--ui-radius))`, or `--ui-radius-x-small`, `min(2px, var(--ui-radius))`), and for a bare `<input type="file">` (`--ui-radius-small`, a fixed `--radius-2` in 5.4.3), but a `TextField` with `type="file"` uses `var(--ui-field-radius, var(--ui-radius))` on its field and its `::file-selector-button`, so a theme that sets `--ui-field-radius` above `--ui-radius` (the case the previous paragraph describes) gets rounder file inputs.
- **Evidence:** `packages/opui/css/components/text-field.css:41,202`; `css/theme.css:205-206`. Chromium 153 with `--ui-radius: 2px; --ui-field-radius: 20px` on `html`: the `::file-selector-button` rule `var(--ui-field-radius,var(--ui-radius))` resolves to 20px, `.ui-field` is 20px, `kbd` is 2px. A second probe read 20px from the pseudo-element directly, and a bare file input stays at 2px.
- **Correction:** keep "file inputs" (the bare file input change is real) but write "file inputs outside `TextField`", or add "(a `TextField` with `type="file"` follows `--ui-field-radius` like other fields)".

### M2-08: Migrating from v5 to v6 > Theme and tokens (primary)

- **Severity:** 2 (verified)
- **Double check:** holds on `245eaa1`. The list can add `.ui-contrast-more`, or say "elsewhere, add `.ui-palette` or set `--ui-on-primary` too".
- **Now at:** `packages/opui/MIGRATING.md:1184`, `packages/opui/MIGRATING.md:1089-1090`
- **Where:** `packages/opui/MIGRATING.md:1176` (also rendered at /html/guide/migrating/#theme-and-tokens; frameworks: all)
- **Says:** "`--ui-on-primary` is derived from `--ui-primary` with relative color. If you set your own `--ui-primary`, its text color now follows it."
- **Actually:** `--ui-on-primary` is derived where `--ui-primary` is, on `html`, `.ui-palette` and `.ui-contrast-more`. Set on any other element, like the `.sidebar { --ui-primary: var(--ui-green); }` rule this section shows at `MIGRATING.md:1089-1091`, `--ui-on-primary` and `--ui-primary-text` stay the page's, so the text color does not follow.
- **Evidence:** `packages/opui/css/theme.css:202,467-490`. Chromium 153: `<div style="--ui-primary: oklch(0.92 0.15 100)">` resolves `--ui-on-primary` to white (the page value, about 1.3:1 on that fill) on its `.ui-button.ui-filled.ui-primary`; the same style on `<div class="ui-palette">` resolves it to near-black.
- **Correction:** "If you set your own `--ui-primary` on `html` (or on `.ui-palette`), its text color follows it."

### M2-09: Migrating from v5 to v6 > Theme and tokens (private properties)

- **Severity:** 2 (verified)
- **Double check:** holds on `245eaa1`. The `--_accent` example fits Range only (`range.ts:43`); Chip's `--_accent` is itself an output and Callout has none.
- **Now at:** `packages/opui/MIGRATING.md:1194`, `packages/opui/MIGRATING.md:1198`, `packages/opui/MIGRATING.md:1213`, `packages/opui/MIGRATING.md:1214`, `packages/opui/MIGRATING.md:1220-1223`, `packages/opui/MIGRATING.md:1229`, `packages/opui/MIGRATING.md:1231`, `packages/opui/MIGRATING.md:1236`, `packages/opui/MIGRATING.md:1242`, `packages/opui/MIGRATING.md:1245`, `packages/opui/MIGRATING.md:1251`
- **Where:** `packages/opui/MIGRATING.md:1186` against the rows `:1190`, `:1205`, `:1206`, `:1212-1215`, `:1221`, `:1223`, `:1228`, `:1234`, `:1237`, `:1243` (rendered at /html/guide/migrating/#theme-and-tokens; frameworks: all)
- **Says:** "A property the component sets (an output in the Component properties table) isn't an override: the rows below name the input to set instead."
- **Actually:** these rows rename to a property the Component properties table marks `output`: Accordion `--_transition` to `--_duration`, ButtonGroup `--_divider-color` to `--_divider-border-color`, Callout `--_color` to `--_text-color`, Card `--_card-bg-color`, `--_card-border-color`, `--_card-border-width`, `--_card-shadow` to `--_bg-color`, `--_border-color`, `--_border-width`, `--_shadow`, Chip `--_color` to `--_text-color`, Drawer `--_transition-duration`, `--_transition-timing` to `--_duration`, `--_ease`, Range `--_thumb-bg` to `--_thumb-bg-color`, Switch `--_transition-time` to `--_duration` and `--_dot-inset`, `--_dot-outline-size` to `--_thumb-inset`, `--_thumb-outline-size`, ToggleButton `--_button-bg-color` to `--_bg-color`. The sentence and these rows disagree.
- **Evidence:** `src/component-api/custom-properties/accordion.ts:50-54`, `button-group.ts:8-12`, `callout.ts:74-78`, `card.ts:4-7,8-12,13-16,51-55`, `chip.ts:51-55`, `drawer.ts:41-50`, `range.ts:43-47`, `switch.ts:9-13,42-51`, `toggle-button.ts:4-8` (all `kind: "output"`); `src/component-api/AGENTS.md`: "`output`: derived from the inputs, the variant or the state ... Overriding it freezes it in every state."
- **Correction:** for those rows name the input (`--_motion` or `--ui-duration`, `--_surface-bg-color` and the variant inputs, `--_accent`, ...) like the Range `--_thumb-highlight-color` row does, or reword the sentence to say the new names are outputs that freeze in every state.

### M2-10: Migrating from v5 to v6 > Theme and tokens (private properties)

- **Severity:** 3 (verified)
- **Double check:** holds on `245eaa1`. For Switch, "set `--_thumb-size` or `--_track-block-size`" is better, since `--_thumb-inset` is computed from them.
- **Now at:** `packages/opui/MIGRATING.md:1245`, `packages/opui/MIGRATING.md:1205`
- **Where:** `packages/opui/MIGRATING.md:1237` (Switch) and `:1197` (Badge) (rendered at /html/guide/migrating/#theme-and-tokens; frameworks: all, the fault is in the HTML/CSS names)
- **Says:** Switch `--_dot-inset` becomes `--_thumb-inset`; Badge `--_badge-inset` becomes "`--_inset`, which the component turns into `--_inset-block` and `--_inset-inline`"
- **Actually:** not renames of the same value. v5 `--_dot-inset` and `--_badge-inset` hold a four-value `inset` shorthand; v6 `--_thumb-inset` and `--_inset` take one length (the gap to the edge). Carrying the v5 value over breaks the layout, and `--_thumb-inset` is documented as a computed output.
- **Evidence:** 5.4.3 `css/components/switch.css:8,60` (`--_dot-inset: var(--size-1) auto auto var(--size-1)`, `inset: var(--_dot-inset)`) and `badge.css:5,19` (`--_badge-inset: auto auto 100% 100%`); 6.x `switch.css:15-19,64-65` (`inset-block-start` and `inset-inline-start: var(--_thumb-inset)`), `badge.css:11-13,29-30`, `custom-properties/switch.ts:42-46` (output), `badge.ts:40-44`. Chromium 153: `.ui-switch` with `--_thumb-inset: 6px` puts the thumb at 6px/6px, with `--_thumb-inset: 6px auto auto 6px` at 0/0, and `--_dot-inset: ...` changes nothing (4px); `.ui-badge` with `--_inset: auto auto 80% 80%` moves the indicator to the opposite corner (left 90, top 110 instead of 130, 90).
- **Correction:** say that `--_thumb-inset` and `--_inset` take a single length and that the old `inset` shorthand value does not carry over.

### M2-11: Text field, Textarea and Select private property renames

- **Severity:** 2 (verified)
- **Same issue reported as:** C1-04
- **Double check:** holds on `245eaa1`.
- **Now at:** `packages/opui/MIGRATING.md:1249-1250`, `src/utils/whats-new.ts:965`, `src/utils/whats-new.ts:1208`, `src/utils/whats-new.ts:1277`
- **Where:** `packages/opui/MIGRATING.md:1241-1242` against `src/utils/whats-new.ts:949` (select), `:1188` (text-field), `:1257` (textarea) (rendered at /html/guide/migrating/#theme-and-tokens and the What's new callouts of Select, Text field and Textarea; frameworks: all)
- **Says:** MIGRATING: "`--_label-color` | removed as an override, `--_affix-text-color` reads `--ui-text` and the invalid state sets it" and "`--_end-text-color` | `--ui-field-helper-text-color`, which `--_helper-text-color` is derived from". What's new, on all three pages: "Breaking: ... `--_label-color` is `--_affix-text-color` and `--_end-text-color` is `--_helper-text-color`".
- **Actually:** the two disagree on what to do with the old properties. `--_affix-text-color` and `--_helper-text-color` are `output` in the Component properties table (the invalid state sets them), so overriding them freezes the invalid color. The MIGRATING rows are the consistent ones.
- **Evidence:** `src/component-api/custom-properties/text-field.ts:14-18,74-78`; `packages/opui/css/components/text-field.css:12,30,396,398`.
- **Correction:** change the three What's new notes to "`--_label-color` and `--_end-text-color` are gone: set `--ui-text` or `--ui-field-helper-text-color`" (or change the two rows to renames).
- **Also C1-04 (severity 2):**
  - Double check: holds on `245eaa1`. The table is under `#theme-and-tokens`; there is no `#custom-properties` id.
  - Now at: `src/utils/whats-new.ts:965`, `src/utils/whats-new.ts:1208`, `src/utils/whats-new.ts:1277`, `packages/opui/MIGRATING.md:1249-1250`
  - Where: `src/utils/whats-new.ts:1188` (text-field), `:1257` (textarea), `:949` (select); the guide the note links is `packages/opui/MIGRATING.md:1241-1242` (rendered at /html/guide/migrating/#theme-and-tokens)
  - Actually: the migration guide table answers the same two properties differently: "`--_label-color` -> removed as an override, `--_affix-text-color` reads `--ui-text` and the invalid state sets it" and "`--_end-text-color` -> `--ui-field-helper-text-color`, which `--_helper-text-color` is derived from". The note gives two plain renames, the guide says one is no longer an override and the other is replaced by a theme token.
  - Correction: make the note and the guide row say the same thing.

### M2-12: Migrating from v5 to v6 > Theme and tokens (shadows)

- **Severity:** 2 (verified)
- **Double check:** holds on `245eaa1`. Can append "(they applied only where PostCSS resolved Open Props' `@custom-media`)": a raw `@media (--OSdark)` never matches in a browser.
- **Now at:** `packages/opui/MIGRATING.md:1273`
- **Where:** `packages/opui/MIGRATING.md:1265` (rendered at /html/guide/migrating/#theme-and-tokens; frameworks: all)
- **Says:** "`theme.css` no longer sets the Open Props `--shadow-color` and `--shadow-strength`."
- **Actually:** `theme.css` never set them, in 5.4.3 or later. Open Props' `props.shadows.css` set them, including the dark values inside `@media (--OSdark)`. What changed is that `open-props.css` now imports `props.shadows.light.css`, which has no dark override.
- **Evidence:** 5.4.3 `css/theme.css` (whole file, no `shadow-color` or `shadow-strength`) and `dist/opui.css:359-360,408-414` (inside the Open Props layer); 5.4.3 `open-props.css:5` against 6.x `open-props.css:9` (`props.shadows.light.css`); `node_modules/open-props/src/props.shadows.css` against `props.shadows.light.css`.
- **Correction:** "The Open Props bundle no longer sets the dark values of `--shadow-color` and `--shadow-strength`."

### M2-13: Migrating from v5 to v6 > Typography and rich text

- **Severity:** 2 (verified)
- **Double check:** holds on `245eaa1`.
- **Now at:** `packages/opui/MIGRATING.md:1286`, `packages/opui/CHANGELOG.md:104`
- **Where:** `packages/opui/MIGRATING.md:1278` (also `packages/opui/CHANGELOG.md:104`; rendered at /html/guide/migrating/#typography-and-rich-text; frameworks: all)
- **Says:** "`del`, `ins`, `abbr`, `dfn` and the `.ui-del`, `.ui-ins`, `.ui-abbr` and `.ui-dfn` classes are no longer severity scopes."
- **Actually:** in 5.4.3 only the elements were scopes. The classes never were; they only had type styles.
- **Evidence:** 5.4.3 `css/theme.css:105,110,115` (`:where(.ui-critical, [data-invalid], del)`, `:where(.ui-info, abbr, dfn)`, `:where(.ui-success, ins)`) and `core/palette.css:205-217` (the elements, no `.ui-del`, `.ui-ins`, `.ui-abbr` or `.ui-dfn`); the four classes appear in 5.4.3 `css/` and `core/` only as type styles in `css/components/typography.css:103-112,167-172`.
- **Correction:** "`del`, `ins`, `abbr` and `dfn` are no longer severity scopes" (drop the classes from the sentence and from the CHANGELOG entry).

### M2-15: Migrating from v5 to v6 > Package and imports

- **Severity:** 2 (verified)
- **Double check:** holds on `245eaa1`. "listed above" in the old correction was off, because the palette note is below (`:1366`). The CHANGELOG line does not say "nothing changes", so it needs no edit.
- **Now at:** `packages/opui/MIGRATING.md:1353`
- **Where:** `packages/opui/MIGRATING.md:1345` ( rendered at /html/guide/migrating/#package-and-imports; frameworks: all)
- **Says:** "`dist/opui.css` still bundles Open Props, so nothing changes if you load it."
- **Actually:** the bundle changed. `open-props.css` imports a subset now: no `props.media.css` (`@custom-media --OSdark`, `--md-n-above` and so on), no `props.palette.css` (`--palette-*`, `--color-1` to `--color-16`) and the light-only shadows. `MIGRATING.md:1265` and `:1358` say as much, so the paragraph contradicts them.
- **Evidence:** `packages/opui/CHANGELOG.md:402` ("`dist/op.css` and `dist/opui.css` no longer contain Open Props' `@custom-media` rules"); 5.4.3 `open-props.css:5` (`open-props/src/index.css`, which imports media, shadows and palette: `node_modules/open-props/src/index.css`) and 5.4.3 `dist/opui.css` (45 `@custom-media`, `--palette-hue: 250`, `--color-1`); 6.x `open-props.css:5-15` and the rc.1 `dist/opui.css` (0 `@custom-media`, no `--color-1`, no Open Props `--palette-hue`).
- **Correction:** "`dist/opui.css` still bundles most of Open Props, without its `@custom-media` definitions, its palette (`--palette-*`, `--color-1` to `--color-16`) and the dark shadow values."

## Blog posts

### A header that knows it's stuck

#### L3-01: A header that knows it's stuck (table-scroll-state) > Scroll shadows

- **Severity:** 1 (verified)
- **Double check:** holds on `245eaa1`.
- **Now at:** `src/docs/blog/table-scroll-state.astro:122`
- **Where:** `src/docs/learn/table-scroll-state.astro:122` (also rendered at /learn/table-scroll-state/#scroll-shadows; frameworks: all)
- **Says:** code block for `.content::before, .content::after` contains `transition: opacity 0.2s;`
- **Actually:** Dialog and Drawer fade the shadows with `transition: opacity var(--_duration)` where `--_duration: calc(var(--ui-duration-slow) * var(--_motion))`, and `--ui-duration-slow` is 0.3s. The 0.2s value is right only for the sticky table header (`--ui-duration`).
- **Evidence:** `packages/opui/css/components/dialog.css:6` and `:85`, `packages/opui/css/components/drawer.css:12` and `:115`, `packages/opui/css/theme.css:123-124` (`--ui-duration: 0.2s`, `--ui-duration-slow: 0.3s`). Chromium probe on /learn/table-scroll-state/: `getComputedStyle(.ui-content, "::before").transitionDuration` is `0.3s`.
- **Correction:** write `transition: opacity 0.3s;` in the scroll-shadow snippet (the table snippet at line 60 is correct at 0.2s).

### A switch from a checkbox

#### L2-04: A switch from a checkbox > Try it

- **Severity:** 3 (verified)
- **Double check:** holds on `245eaa1`.
- **Now at:** `src/docs/blog/switch-checkbox.astro:91-95`, `src/components/Blog/AppearanceCompare.astro:25-27`, `src/components/Blog/AppearanceCompare.astro:65-67`, `src/components/Blog/AppearanceCompare.astro:80-84`
- **Where:** `src/docs/learn/switch-checkbox.astro:91-95` (the demo is `src/components/Learn/AppearanceCompare.astro`; rendered at /learn/switch-checkbox/#try-it; frameworks: all)
- **Says:** "With `none` the track and the dot follow `--ui-switch-track-block-size`, and the input keeps its checked state and keyboard handling"
- **Actually:** the dot does not follow `--ui-switch-track-block-size`. The switch has three separate size tokens, `--ui-switch-track-block-size`, `--ui-switch-track-inline-size` and `--ui-switch-thumb-size`. The demo only looks driven by one token because `src/components/Learn/AppearanceCompare.astro:80-84` sets all three from its own `--_size` (thumb at two thirds, inline size at twice), and its Size slider is labelled with the one token (`:25-27`, `:66`). In the library, setting only `--ui-switch-track-block-size` resizes the track (and, where theme.css derives it, the track width) but leaves the dot at `--ui-switch-thumb-size`.
- **Evidence:** `packages/opui/css/theme.css:359-371` (thumb size 1rem, track block size 1.5rem, `--ui-switch-track-inline-size: calc(2 * var(--ui-switch-track-block-size))` as separate tokens), `packages/opui/css/components/switch.css:21,26,31` (each read on its own), `packages/opui/css/components/choice.css:155-171` (the size classes set all three together), `src/utils/theme-token-descriptions.ts:419,428,435-436` ("Diameter of the `Switch` thumb" for `--ui-switch-thumb-size`, "Height of the `Switch` track", "Twice `--ui-switch-track-block-size` until a theme sets it"). Chromium 153 on /learn/switch-checkbox/: with `html{--ui-switch-track-block-size: 40px}` the track measures 80x40 and the `::after` dot stays 16x16; with `.ui-switch{--ui-switch-track-block-size: 20px}` added, the track is 80x20 (width stays 80) and the dot stays 16x16.
- **Correction:** say that the track follows `--ui-switch-track-block-size` (with `--ui-switch-track-inline-size`) and the dot follows `--ui-switch-thumb-size`, or note that the demo sets all three tokens from the slider.

### An accordion that animates to auto

#### L1-01: An accordion that animates to auto > Try it

- **Severity:** 2 (verified, re-checked by the coordinator)
- **Double check:** holds on `245eaa1`. The demo does fade the opacity; the post's code block leaves it out. Adding the `opacity` lines to the code block is the better fix.
- **Now at:** `src/docs/blog/accordion-height-auto.astro:78-81`, `src/docs/blog/accordion-height-auto.astro:45-59`
- **Where:** `src/docs/learn/accordion-height-auto.astro:78-81` (also rendered at /learn/accordion-height-auto/#try-it; frameworks: all)
- **Says:** "With `numeric-only`, the default, the same transition has nothing to interpolate, so the content snaps and only the opacity fades"
- **Actually:** "the same transition" is the one in the code block under The trick (`accordion-height-auto.astro:45-59`), and that block has no `opacity` declaration and no `opacity` transition, so a reader who copies it gets a snap with no fade at all. The fade comes only from the real accordion the demo uses, which sets `opacity: 0` / `1` and transitions it, and which the code block leaves out.
- **Evidence:** `packages/opui/css/components/accordion.css:80-93` (`opacity: 0`, `[open] { opacity: 1 }`, `transition: content-visibility ..., opacity ..., block-size ...`); `src/components/UnderTheHood/AccordionBuild.astro:23-35` has the opacity lines the post's block lacks. Chromium 153 on /learn/accordion-height-auto/: in the numeric-only column `::details-content` block-size is already 108px at the first frame after opening while opacity ramps 0.31 to 1 over about 400ms.
- **Correction:** add `opacity: 0` / `opacity: 1` and an `opacity 0.2s` transition to the code block (as `accordion.css` and `AccordionBuild.astro` have them), or drop "and only the opacity fades".

### Drawing a checkbox

#### L1-07: Drawing a checkbox > The problem

- **Severity:** 3 (verified, re-checked by the coordinator)
- **Double check:** holds on `245eaa1`.
- **Now at:** `src/docs/blog/checkbox-appearance-none.astro:14-16`
- **Where:** `src/docs/learn/checkbox-appearance-none.astro:14-16` (also rendered at /learn/checkbox-appearance-none/#the-problem; frameworks: all)
- **Says:** "A native checkbox is drawn by the browser. You can tint it with `accent-color`, but not its size, border, radius or checkmark."
- **Actually:** the size of a native checkbox can be set with `inline-size` / `block-size` (`width` / `height`), and the browser draws the box and the check at that size. The post's own demo does exactly that: its `appearance: auto` column keeps only the size and is described as "the browser draws the control" (`checkbox-appearance-none.astro:95-97`, `src/components/Learn/AppearanceCompare.astro:102-111`). What a native checkbox does not allow is changing the border, the radius and the check shape.
- **Evidence:** Chromium 153 on /learn/checkbox-appearance-none/ with the size slider at 40px: the three `appearance: auto` inputs measure 40 x 40 and render a browser-drawn box and check at 40px (screenshot checked).
- **Correction:** drop "size" from the list, e.g. "You can tint it with `accent-color` and size it, but not change its border, radius or checkmark."

### Fluid type with progress()

#### L2-02: Fluid type with progress() > Try it

- **Severity:** 2 (verified, re-checked by the coordinator)
- **Double check:** holds on `245eaa1`. The same claim is in the post's Trick list (`fluid-type-progress.astro:52-54`, "Each heading mixes its two steps with the ramp") and needs the same fix.
- **Now at:** `src/docs/blog/fluid-type-progress.astro:120-123`, `src/component-examples/typography/Variants.astro`, `src/utils/blog-posts.ts:354`, `src/utils/blog-posts.ts:357`, `src/docs/blog/fluid-type-progress.astro:52-54`
- **Where:** `src/docs/learn/fluid-type-progress.astro:120-123` (also `src/utils/learn-posts.ts:354` and `:357`, shown on the Learn index card and in "Then and now"; rendered at /learn/fluid-type-progress/#try-it; frameworks: all)
- **Says:** "The headings below use the real theme. Resize the window and they move along the same ramp." (the example under it, `src/component-examples/typography/Variants.astro`, shows Heading 1 to Heading 6). Registry description: "progress() turns the viewport width into one 0 to 1 ramp that every heading size shares." Registry now: "each heading mixes its two steps with it."
- **Actually:** only h1 to h4 ride the ramp. `--ui-font-size-h5` and `--ui-font-size-h6` are fixed tokens, so Heading 5 and Heading 6 in that example never move.
- **Evidence:** `packages/opui/css/theme.css:226-247` (h1 to h4 are `calc(... * var(--ui-fluid-progress))`, then `--ui-font-size-h5: var(--ui-font-size-400)` and `--ui-font-size-h6: var(--ui-font-size-300)`). The site's own descriptions agree: `src/utils/theme-token-descriptions.ts:175` ("`--ui-font-size-h1` to `--ui-font-size-h4` grow with it") and `src/docs/guide/theming.astro:319-326`. Chromium 153 on /learn/fluid-type-progress/ at viewport widths 320, 400, 500, 600, 700, 768, 900 and 1200px: `.ui-h5` stays 18px and `.ui-h6` 16px, while h1 goes 32 to 56px, h2 24 to 40px, h3 20 to 24px, h4 18 to 20px.
- **Correction:** say that h1 to h4 move along the ramp and h5 and h6 stay fixed; in the registry write "the four fluid heading sizes" instead of "every heading size" and "each fluid heading".

### Hover cards without JavaScript

#### L1-04: Hover cards without JavaScript > Under the hood step "Hint" (linked from Try it)

- **Severity:** 1 (verified, re-checked by the coordinator)
- **Double check:** holds on `245eaa1`. SVG `<a>` also needs an `href`, so the precise wording is "links with an `href` (HTML or SVG)".
- **Now at:** `src/components/UnderTheHood/AnchorBuild.astro:24`
- **Where:** `src/components/UnderTheHood/AnchorBuild.astro:24` (rendered at /html/components/anchor/#under-the-hood, step "Hint"; reached from /learn/anchor-hover-cards/#try-it by the Under the hood link)
- **Says:** "Only `<button>`, `<a href>` and `<area>` can be interest invokers"
- **Actually:** the SVG `<a>` element is an interest invoker too.
- **Evidence:** BCD 8.1.7 `svg.elements.a.interestfor` and `api.SVGAElement.interestForElement` are Chrome 142 (web-features `interest-invokers` lists both). Chromium 153 probe: `<svg><a href="#x" interestfor="hint2">` opens the `popover="hint"` on hover; an `<a>` without `href` and a `<span>` do not.
- **Correction:** say "Only buttons, links with an `href`, `<area>` and SVG `<a>` can be interest invokers", or drop "Only".

#### L1-02: Hover cards without JavaScript > The trick

- **Severity:** 2 (verified)
- **Double check:** holds on `245eaa1`.
- **Now at:** `src/docs/blog/anchor-hover-cards.astro:48-52`, `src/components/UnderTheHood/AnchorBuild.astro:74`, `src/docs/blog/tooltip-interest-invokers.astro:66-67`, `src/components/UnderTheHood/TooltipBuild.astro:69`
- **Where:** `src/docs/learn/anchor-hover-cards.astro:48-52` (also rendered at /learn/anchor-hover-cards/#the-trick; frameworks: all). The same claim is in `src/components/UnderTheHood/AnchorBuild.astro:74` (Anchor page, step "Flip"), and, outside this slice, at `src/docs/learn/tooltip-interest-invokers.astro:66-67` and `src/components/UnderTheHood/TooltipBuild.astro:69`.
- **Says:** "`position-try-fallbacks` flips it when there isn't room, `position-visibility` hides it when the trigger scrolls away" (Under the hood: "`anchors-visible` hides it when the trigger scrolls out of view")
- **Actually:** `position-visibility: anchors-visible` hides the card when an intervening scroll container (an `overflow` box between the trigger and the card's containing block) clips the trigger. When the page itself scrolls the trigger out of the viewport, the card is not hidden: it stays open and scrolls with its anchor.
- **Evidence:** Chromium 153, `anchors-visible` on a top-layer `popover="hint"` opened with `showPopover({ source })`. Trigger inside an `overflow: auto` box scrolled until it is clipped: the card (still inside the viewport at y 8-68) is not hit-testable, so it is hidden. Trigger scrolled above the viewport top by `window.scrollBy`: the card stays at y -3..57 and is hit-testable. On the real /learn/anchor-hover-cards/ card opened by focus, then the page scrolled so the link is just above the viewport: the card is still painted at the top of the viewport (screenshot checked).
- **Correction:** say it hides when the trigger is scrolled out of view inside a scrolling container (page scroll does not hide it), or drop the clause.

#### L1-03: Hover cards without JavaScript > Try it

- **Severity:** 2 (verified, re-checked by the coordinator)
- **Double check:** holds on `245eaa1`.
- **Now at:** `src/docs/blog/anchor-hover-cards.astro:72-76`, `src/docs/blog/anchor-hover-cards.astro:98-102`
- **Where:** `src/docs/learn/anchor-hover-cards.astro:72-76` and `:98-102` (also rendered at /learn/anchor-hover-cards/#try-it; frameworks: all)
- **Says:** "The card stays open here so you can watch it: at an edge of the box it flips to the other side." and "This card is the always-visible variant, positioned inside the box."
- **Actually:** the always-visible variant of Anchor has no `position-try-fallbacks`, so it never flips. The flipping in this demo comes from a rule only the playground adds to its own box, which the post does not say, so a reader takes it as a property of the always-visible variant.
- **Evidence:** `packages/opui/css/components/anchor.css:12-19` (`.ui-floating:not([popover])` sets `position-anchor`, `position-area`, `translate`, no fallbacks; fallbacks are only in the `[popover]` rule at lines 32-35); `src/components/Learn/AnchorPlayground.astro:65-70` adds `position-try-fallbacks: flip-block, flip-inline, flip-block flip-inline` for `.ui-anchor > .ui-floating:not([popover])`. Chromium 153: the always-visible floating content on /html/components/anchor/ has computed `position-try-fallbacks: none`; the one in the playground on the post has the three flips.
- **Correction:** add that the playground gives the always-visible card the same `position-try-fallbacks` as the popover so the flip can be seen, or say that only the hover card (popover) flips.

### One Button, no IconButton

#### L1-06: One Button, no IconButton > Fallback

- **Severity:** 2 (verified, re-checked by the coordinator)
- **Double check:** holds on `245eaa1`.
- **Now at:** `src/docs/blog/button-icon-only-has.astro:85-88`, `src/docs/blog/button-icon-only-has.astro:57-59`
- **Where:** `src/docs/learn/button-icon-only-has.astro:85-88` (also rendered at /learn/button-icon-only-has/#fallback; frameworks: all)
- **Says:** "The button keeps its text padding and line-sized icon: wider than square, but it works"
- **Actually:** in the stylesheet the rule that sizes the icon (`max-block-size: var(--_icon-size)`, with `block-size: auto`, `inline-size: auto`, `flex-shrink: 0` and `gap: 1ex`) is nested inside `&:where(:has(> svg))`, the same `:has()` dependency as the icon-only rule. A browser without `:has()` drops it too, so the icon is not line-sized there: it keeps its own `width`/`height` attributes. The post's code block draws `.button > svg { max-block-size: var(--icon) }` outside any `:has()` (lines 57-59), which is not how the stylesheet is written and is what makes the sentence look true.
- **Evidence:** `packages/opui/css/components/button.css:190-200`. Chromium 153 with the four `:has()` rules inside `:where(.ui-button)` deleted through the CSSOM (a stand-in for an engine without `:has()`): the icon-only "Edit" button of the Button examples (`src/component-examples/button/IconOnly.astro:4`, SVG `width="32" height="32"`) goes from 40 x 40 with a 24px icon to 60 x 43 with a 32px icon and `max-block-size: none`; a line-sized icon (`0.7lh`) would be about 19.6px. The wider-than-square part of the sentence holds.
- **Correction:** say that without `:has()` the icon also loses its size cap and shows at the SVG's own size, or drop "and line-sized icon".

### opui 6.0

#### L3-11: opui 6.0 > Contrast as a guarantee (lab card)

- **Severity:** 1 (verified)
- **Double check:** holds on `245eaa1`. For a framework-aware link, the repo's helpers are `Astro.locals.link()` and `DocLink`.
- **Now at:** `src/components/Release/ContrastLab.astro:187-190`, `src/docs/blog/release-6.astro:139`
- **Where:** `src/components/Release/ContrastLab.astro:187-190` (rendered at /learn/release-6/#contrast-guarantee; frameworks: all)
- **Says:** "The knobs are listed in the [theme guide](#contrast-guarantee)."
- **Actually:** the link goes to `#contrast-guarantee`, the section the reader is already in, not to a theme guide. The knobs are listed in the Theme tokens guide (`/guide/theme-tokens#contrast`) and the Theming guide (`/guide/theming#contrast`).
- **Evidence:** `src/components/Release/ContrastLab.astro:190` (`href="#contrast-guarantee"`); `src/docs/guide/theming.astro:444` (`id="contrast"`), `src/docs/guide/theme-tokens.astro` (Contrast section).
- **Correction:** point the link at `/guide/theme-tokens#contrast` (use `link()` so it follows the framework), or drop the sentence from the mock card.

#### L3-05: opui 6.0 > Four frameworks (the hero tagline, against the Shells note and the numbers)

- **Severity:** 2 (verified)
- **Double check:** partly right on `245eaa1`; the fields below are corrected. The release post was reworked: the "One library, four frameworks" heading is gone and the parity widget is now `Shells.astro`. The tagline still conflicts with the "5 frameworks" in the Shells note and the Numbers tile.
- **Now at:** `src/components/Release/Hero.astro:41`, `src/components/Release/Shells.astro:222-224`, `src/components/Release/Numbers.astro:54`, `src/docs/blog/release-6.astro:251`
- **Where:** `src/components/Release/Hero.astro:41` ("Four frameworks. Four themes. One naming model."), against `src/components/Release/Shells.astro:222-224` and `src/components/Release/Numbers.astro:54` (rendered at /blog/release-6/; frameworks: all)
- **Says:** "Four frameworks."
- **Actually:** the same page then counts five. The Shells note says "the same markup in all 5 frameworks" (HTML, Astro, React, Svelte, Vue) and the "What it took" tile reads "5 Frameworks". Both are `FRAMEWORKS.length`, and `FRAMEWORKS` includes `html`. So the page counts HTML as a framework in two places and not in the tagline.
- **Evidence:** `src/utils/framework.js:16-22` (`FRAMEWORKS` has html, astro, react, svelte, vue). Chromium on /learn/release-6/: `.parity-stamp` text is "Identical markup in 5 frameworks" and the `.numbers-tile` list contains "5 Frameworks". `packages/opui/package.json` description and `TODO.md:194` also say five (HTML plus four).
- **Correction:** pick one count: "HTML and four frameworks." in the hero tagline, or label the Shells note and the Numbers tile as four frameworks plus HTML.

#### L3-06: opui 6.0 > Contrast as a guarantee

- **Severity:** 2 (verified)
- **Double check:** holds on `245eaa1`.
- **Now at:** `src/docs/blog/release-6.astro:143-145`
- **Where:** `src/docs/learn/release-6.astro:156-157` (rendered at /learn/release-6/#contrast-guarantee; frameworks: all)
- **Says:** "`--ui-contrast: more` tightens 25 lightness and strength knobs and never sets a color directly. The lab blends those knobs between their normal and more values."
- **Actually:** more contrast sets 26 knobs (besides `--ui-contrast` itself), and only 20 of them are lightness or strength knobs: 14 lightness limits, 6 strength values, plus 4 alpha values (`--ui-code-bg-alpha-*`, `--ui-state-active-alpha-dark`, `--ui-state-selected-alpha-accent`), 1 chroma cap (`--ui-accent-max-chroma`) and 1 width (`--ui-focus-ring-width`). The lab blends all 26 (it reads every declaration of `.ui-contrast-more` except `--ui-contrast`), so "those knobs" is 26, not 25. "Never sets a color directly" is right.
- **Evidence:** `packages/opui/css/theme.css:611-641` (`@media (prefers-contrast: more)`) and `:643-675` (`.ui-contrast-more`) each declare `--ui-contrast: more` plus 26 knobs; I counted them with a script: 14 `*-lightness`, 6 `*-strength-*`/`*-strength`, 4 `*-alpha-*`, 1 `*-chroma`, 1 `*-width`. `src/components/Release/ContrastLab.astro:44-54` (`knobs` = all of them but `--ui-contrast`). `tokens.json` has 27 tokens with a `more-contrast` mode (the 26 plus `--ui-contrast`).
- **Correction:** "tightens 26 knobs: lightness limits, strengths, alphas, a chroma cap and the focus ring width, and never sets a color directly".

#### L3-08: opui 6.0 > Tokens, rebuilt

- **Severity:** 2 (verified)
- **Double check:** holds on `245eaa1`. The reworked post now renders `<TokenTiers />` a few lines above the bullet, so the bullet also contradicts the table on the same page.
- **Now at:** `src/docs/blog/release-6.astro:102-105`
- **Where:** `src/docs/learn/release-6.astro:116-117` (rendered at /learn/release-6/#tokens-rebuilt; frameworks: all)
- **Says:** "Three tiers, knobs then roles then hooks, and which one to touch for what (Theme tokens)."
- **Actually:** the page it links, and the guide that defines the tiers, name more than three and a different set. Theme tokens: "The tier is `knob` ..., `primitive` ..., `role`, `hook` ..., `component` ... or `input`" (six). Concepts "Token tiers" table: Knob, Primitive, Role, Component token, Private property, and "A theme sets knobs, roles and component tokens". `tokens.json` tiers: role 139, component 53, knob 47, primitive 42, hook 10, input 1. A hook is an optional role, not a third tier after roles.
- **Evidence:** `src/docs/guide/theme-tokens.astro:96-108` (the tier sentence), `src/docs/guide/concepts.astro:49-56` and `src/components/TokenTiers.astro`, `src/docs/guide/customizing.astro:21-22` ("knobs, roles and component tokens"), `packages/opui/CHANGELOG.md:286`, `packages/opui/tokens.json` (`$extensions.opui.tier` counted with a script).
- **Correction:** "Tiers: knobs, roles (some optional hooks) and component tokens, and which one to touch for what", matching the Concepts table, or drop the number.

#### L3-09: opui 6.0 > Tokens, rebuilt > Layer order demo (How 5.x behaved)

- **Severity:** 3 (verified)
- **Double check:** holds on `245eaa1`.
- **Now at:** `src/components/Release/SeverityLayers.astro:46`, `src/components/Release/SeverityLayers.astro:23-33`, `src/components/Release/SeverityLayers.astro:294-300`
- **Where:** `src/components/Release/SeverityLayers.astro:46` (caption) and `:278-284` (the emulating rule), rendered at /learn/release-6/#tokens-rebuilt (Layer order, "How 5.x behaved", with the theme switch on; frameworks: all)
- **Says:** "Emulated: the severity sources sat in theme.base, below your theme, so a theme that pinned --ui-palette-source on .ui-palette recolored every callout too."
- **Actually:** in the published 5.4.3, a theme that pins the palette source on `.ui-palette` does not recolor a callout inside that scope: the callout's own `.ui-info` (or other severity) rule sets its source, so it keeps its hue. Only a severity class on the same element as the scope class got the theme's color, which is what the CHANGELOG says. The demo's 5.x state recolors nested callouts (it forces `--ui-palette-source` on `.ui-callout` inside the `.ui-palette` stage), a behavior 5.x never had. The 5.x layer list also uses 6.0 layer names: 5.4.3 has `theme` and `theme.palette` only, no `theme.base`, `theme.custom` or `theme.severity`.
- **Evidence:** `packages/opui/CHANGELOG.md:237`: "...so a theme that sets `--ui-palette-source` on `.ui-palette` or `.ui-contrast-more` (bootstrap, brutalist and m3 do) no longer gives a severity class on the same element the theme's colors." 5.4.3: `css/theme.css:1,105-121` (`@layer theme`, severity sources) and `core/palette.css:205` (`@layer theme.palette`). Chromium probe with the 5.4.3 `dist/opui.css` plus `@layer theme { :where(.ui-palette) { --palette-source: oklch(0.58 0.21 300) } }`: `.ui-palette > .ui-callout.ui-info` computes `--palette-source: oklch(0.58 0.21 240)` (unchanged), while `.ui-palette.ui-info` on one element computes `oklch(0.58 0.21 300)`.
- **Correction:** say "recolored a severity class on the same element too" and, in the 5.x state, put the severity class on the scope element instead of on nested callouts.
- **TODO.md:** not listed (line 770 is the same-element palette bug, not this caption)

#### L3-07: opui 6.0 > Contrast as a guarantee (the sweep)

- **Severity:** 5 (verified; raised from 3 in the double check)
- **Double check:** partly right on `245eaa1`; the fields below are corrected. A library regression, not only a docs fault: the palette change after `c0d4970` broke a promised pair at some hues, so a stated accessibility guarantee fails. The finding was right at `c0d4970`.
- **Now at:** `src/docs/blog/release-6.astro:160-164`, `src/components/Release/ContrastLab.astro:182`
- **Where:** `src/docs/blog/release-6.astro:160-164` (rendered at /blog/release-6/#contrast-guarantee; frameworks: all), and the lab card at `src/components/Release/ContrastLab.astro:182` ("Every text role keeps its ratio on every surface, at any hue.")
- **Says:** "The sweep: hue 0 to 360 in steps of 10, both contrast extremes, light and dark, 2664 pairs, none below the promise. The closest call is on-primary text at hue 190 in light mode, 4.95:1."
- **Actually:** On the current theme, "none below the promise" is false. Since 6d0333f and e014a43 the light primary is `oklch(0.499 0.191 h)` (`packages/opui/css/theme.css:466-472`), so `--ui-primary-text` is `oklch(0.41 0.191 h)`, out of sRGB gamut near hue 190. Against `--ui-surface-filled` it falls below its 4.5:1 promise in light mode, normal contrast, at hues 160 to 210 (4.24:1 at hue 190). At the default hue 222.8 it is 4.57:1, which is why the e2e promise test, which checks only the default hue, still passes. On-primary at hue 190 is now 4.78:1, not 4.95:1. Also "2664 pairs" matches no pair set: the 62 promised pairs give 62 x 148 = 9176 measurements, and the 13 pairs that follow the palette hue give 13 x 148 = 1924. No test or script in the repo runs this sweep. At `c0d4970` the original finding held: nothing was below its promise, and the closest pair was `--ui-success-text` on the filled surface at 4.69:1.
- **Evidence:** A sweep of the 62 pairs in `src/utils/theme-token-promises.ts`, hue 0 to 360 in steps of 10, light and dark, both contrast settings (9176 measurements), on a bare page that loads the package CSS. Light, normal contrast, `--ui-primary-text` on `--ui-surface-filled`: 4.45 (hue 160), 4.32 (170), 4.25 (180), 4.24 (190), 4.28 (200), 4.37 (210). The coordinator re-measured it in Chromium 153 through an 8-bit canvas: 4.46 at 160, 4.24 at 190 and 4.49 at 220, so hue 220 also falls short by that method. `--ui-surface-filled` is `oklch(0.84 0.01 255)` at every hue. Dark mode and more contrast stay above every promise.
- **Correction:** either fix the library so `--ui-primary-text` keeps 4.5:1 on `--ui-surface-filled` at every hue and add a hue sweep to `tests/e2e/contrast.spec.ts`, or rewrite the bullet and the lab card: drop "none below the promise" and "at any hue". Naming `--ui-success-text` (4.69:1), as the first pass proposed, would now be wrong.

### Range sliders with datalist ticks

#### L2-03: Range sliders with datalist ticks > Try it

- **Severity:** 3 (verified)
- **Double check:** holds on `245eaa1`.
- **Now at:** `src/components/Blog/RangeTicks.astro:18-24`, `src/components/Blog/RangeTicks.astro:70-95`, `src/docs/blog/range-tick-marks.astro:140-141`, `src/docs/blog/range-tick-marks.astro:152-155`
- **Where:** `src/components/Learn/RangeTicks.astro:18-24` (the `<Range>` gets `step` and `value={50}` but no `min` or `max`; script at `:70-95`). The text it contradicts is `src/docs/learn/range-tick-marks.astro:140-141` and `:152-155` (rendered at /learn/range-tick-marks/#try-it; frameworks: all)
- **Says:** "Pick a step. The `<datalist>` is rebuilt with one option per step, and the labels place themselves." and "The thumb snaps to the same `step`, and the fill follows it through the scroll-driven animation"
- **Actually:** with the `step` toggle on 20 the thumb never lands on a tick. The input has no `min`, so its step base is the `value` attribute (50), and the valid values for step 20 become 10, 30, 50, 70, 90 while the datalist has 0, 20, 40, 60, 80, 100. The first and last tick cannot be reached and the thumb rests between two labels (for example 90 between 80 and 100). Steps 10, 25 and 50 divide 50, so only those three line up.
- **Evidence:** Chromium 153 on /learn/range-tick-marks/, keyboard walk (Home, then ArrowRight until the value stops changing) after each toggle: step 10 stops 0,10,...,100 (all on ticks); step 20 stops 10,30,50,70,90 against ticks 0,20,40,60,80,100 (none on a tick; a screenshot shows the thumb at 90 between the 80 and 100 labels); steps 25 and 50 are on the ticks. The rendered input keeps `value="50"` and an empty `min`. The step base rule (min attribute, else value attribute, else 0) is the HTML spec's, from my knowledge, and the walk confirms it. `packages/opui/css/js/range.js:1-8` itself builds a probe input from the same attributes to find the reset value.
- **Correction:** render the demo's `<Range>` with `min={0}` and `max={100}` (step base 0), or drop 20 from `steps` in `RangeTicks.astro`.

### Sliding drawers with @starting-style

#### L2-01: Sliding drawers with @starting-style > Fallback

- **Severity:** 3 (verified, re-checked by the coordinator)
- **Double check:** holds on `245eaa1`. The feature id goes in `src/utils/blog-posts.ts` (the file was `learn-posts.ts`).
- **Now at:** `src/docs/blog/drawer-starting-style.astro:107-111`, `src/utils/blog-posts.ts:159`
- **Where:** `src/docs/learn/drawer-starting-style.astro:107-111` (also rendered at /learn/drawer-starting-style/#fallback; frameworks: all)
- **Says:** "`overlay` is Chromium only. Elsewhere the drawer leaves the top layer as soon as it closes, so the backdrop goes at once while the drawer slides out"
- **Actually:** "Chromium only" is right, but "while the drawer slides out" holds only where `display` can transition (Chrome, Edge, Safari 18+). Firefox cannot transition `display` with `allow-discrete`, so there the drawer does not slide out at all: it disappears together with its backdrop on close (opening still slides in where `@starting-style` works, Firefox 129+).
- **Evidence:** BCD 8.1.7 `css.properties.transition-behavior.transitionable_display` and `css.properties.display.is_animatable`: chrome 117, safari 18, firefox false. BCD `css.properties.transition-behavior`: firefox 129 PARTIAL, note "Transitioning the display property with allow-discrete ... is not supported". web-features `display-animation`: support chrome 117, edge 117, safari 18, no Firefox, Baseline false. BCD `css.properties.overlay`: chrome/edge 117, firefox false, safari false. The site already lists `display-animation` in `src/docs/components/drawer.astro:46`, so the Drawer page's own chip shows Firefox as unsupported. Not run in Firefox (only Chromium is installed).
- **Correction:** say that without `overlay` the backdrop goes at once, and that Firefox, which cannot transition `display`, also drops the slide out; optionally add `display-animation` to the post's `features` (`src/utils/learn-posts.ts`, drawer entry).

### Spinners from aria-busy

#### L2-05: Spinners from aria-busy > Fallback

- **Severity:** 3 (verified, re-checked by the coordinator)
- **Double check:** holds on `245eaa1`.
- **Now at:** `src/docs/blog/spinner-aria-busy.astro:110-112`
- **Where:** `src/docs/learn/spinner-aria-busy.astro:109-112` (rendered at /learn/spinner-aria-busy/#fallback; frameworks: all)
- **Says:** "`:not()` with a selector list is Selectors Level 4. A browser without it drops the rule: no spinner, but `aria-busy` is still announced"
- **Actually:** `aria-busy` does not make a screen reader announce anything; it exposes a busy state (and tells assistive technology it may hold back announcing changes inside the element). The library's own Spinner page says the opposite of the post: "`aria-busy` doesn't announce anything".
- **Evidence:** `src/docs/components/spinner.astro:62-63` ("`aria-busy` doesn't announce anything. Say what's happening in text, like "Loading..." in the busy element or in a `role="status"` element."). Chromium 153, CDP `Accessibility.getFullAXTree` on /learn/spinner-aria-busy/: the busy buttons carry the `busy` state (exposed, nothing spoken). ARIA defines `aria-busy` as a hint that assistive technology may wait before exposing modifications (my knowledge); a few screen readers may say "busy" on focus, which is not an announcement of a loading state.
- **Correction:** write "but `aria-busy` is still exposed to assistive technology" (or drop the clause), and keep the advice to say what is happening in text.

### Squircle avatars with corner-shape

#### L1-05: Squircle avatars with corner-shape > Try it

- **Severity:** 3 (verified, re-checked by the coordinator)
- **Double check:** holds on `245eaa1`.
- **Now at:** `src/docs/blog/avatar-squircles.astro:86-89`
- **Where:** `src/docs/learn/avatar-squircles.astro:86-89` (also rendered at /learn/avatar-squircles/#try-it; frameworks: all)
- **Says:** "Rounded, squared and squircle. The radius is the same, only the corner shape changes."
- **Actually:** the three avatars of the `Shapes` example have three different radii. `shape="rounded"` is `border-radius: var(--ui-radius-small)`, `shape="squared"` is `border-radius: 0`, `shape="squircle"` is `border-radius: var(--ui-radius-round)` plus `corner-shape: squircle`. Only the squircle sets `corner-shape`.
- **Evidence:** `packages/opui/css/components/avatar.css:57-68` (`.ui-squared { border-radius: 0 }`, `.ui-rounded { border-radius: var(--ui-radius-small) }`, `.ui-squircle { border-radius: var(--ui-radius-round); corner-shape: squircle }`); example `src/component-examples/avatar/Shapes.astro:5-17`. Chromium 153 on /learn/avatar-squircles/: computed `border-top-left-radius` of the three is `5px`, `0px`, `100000px`.
- **Correction:** say the shape comes from the radius, e.g. "Rounded, squared and squircle: each has its own radius, and the squircle also sets `corner-shape`."

### Under the hood

#### L3-04: Under the hood (index and Blog card) > description

- **Severity:** 2 (verified)
- **Double check:** partly right on `245eaa1`; the fields below are corrected. Still wrong, by more: five components added since `c0d4970` (Message, One Time Code, Rating, Stat, Timeline) have no build-up either.
- **Now at:** `src/utils/blog-posts.ts:12-13`, `src/layouts/TechniquePost.astro:112`
- **Where:** `src/utils/blog-posts.ts:12-13` (rendered as the page preamble at /learn/under-the-hood/, as the meta description, and as the featured card on /learn/; frameworks: all). The link label "Every component, under the hood" in `src/layouts/TechniquePost.astro:112` repeats it on every technique post.
- **Says:** "Every component, built one step at a time. Pick a step and the demo runs only the CSS up to it."
- **Actually:** the page shows 32 build-ups, and 9 components have none: Color Field, Copy, Message, Number Stepper, One Time Code, Rating, Stat, Timeline and Toast (the Layout page has none either). Of the 41 pages in `src/docs/components/`, 31 have an Under the hood section (Typography has two build-ups, Fluid type and Rhythm, and counts once).
- **Evidence:** `ls src/components/UnderTheHood/*Build.astro` gives 32 files (Accordion, Anchor, Avatar, Badge, Button, ButtonGroup, Callout, Card, Carousel, Checkbox, Chip, DescriptionList, Dialog, Divider, Drawer, FluidType, Form, List, Menu, Progress, Radio, Range, Rhythm, Select, Spinner, Switch, Table, Tabs, TextField, Textarea, Toggle, Tooltip); `grep -c -i "under-the-hood\|UnderTheHood\|BuildUp"` on `src/docs/components/{color-field,copy,number-stepper,toast,layout}.astro` is 0 for each. The Learn index itself says "32 build-ups" (`src/docs/learn/index.astro:228`).
- **Correction:** drop "Every": "Most components, built one step at a time", and "Components, under the hood" for the link label.

## Could not verify

Claims a reviewer suspected or could not settle with the tools available. Each names the check to run. Most need Firefox, Safari, iOS or a screen reader.

### Component pages

- [C1] Text field > Autosuggest, `src/docs/components/text-field.astro:441-443` ("An input with a `list` shows the Select chevron in place of the browser's arrow") | only Chromium is installed; the CSS hides only `::-webkit-calendar-picker-indicator` (`packages/opui/css/components/text-field.css:569-574`), so open /html/components/text-field/#autosuggest in Firefox and Safari and check that no native arrow shows beside the chevron. Chromium shows the chevron only (`::after` mask, 16px).
- [C1] Color field > Accessibility, `src/docs/components/color-field.astro:193-199` ("Each slider reads its value out, like "60%" or "250 degrees"") | the DOM carries `aria-valuetext="60%"`, `"0.15"` and `"250 degrees"` (verified), but Chromium's CDP accessibility tree reports `valuetext` as the plain number for any `input[type=range]`, even a plain control with `aria-valuetext="60 percent"`, so the spoken text could not be confirmed; run NVDA or VoiceOver on /html/components/color-field/ with the picker open and arrow through Lightness.
- [C1] Text field > Character count, `src/docs/components/text-field.astro:162-192` (a polite live region announces how many characters are left) | the live region is verified in the DOM (`div.ui-sr-only[aria-live=polite]` on `body`, text "Characters left: 10" 750ms after the tenth-from-last character, threshold `max(10, ceil(maxlength/10))`); what a screen reader speaks needs NVDA or VoiceOver typing in the Username example.
- [C1] Text field > Sizes, `src/docs/components/text-field.astro:125-129` ("so iOS Safari doesn't zoom in when one is focused") | the 16px size under `pointer: coarse` is verified in Chromium with a touch device profile; the zoom itself needs an iPhone.
- [C1] Text field > Password toggle, Number stepper > Basics and Color field > Basics in Firefox 144+ and Safari 26.2+ | BCD lists `command` and `commandfor` there, but not the custom `--` commands the three elements use (`--toggle-password`, `--step-down`, `--step-up`); click the buttons in those engines.
- [C2] Radio > Keyboard support, `src/component-api/radio/api.ts:11-26` ("wrapping around at the ends (Safari stops at the first and the last). Left and Right follow the reading direction.") | In Safari (WebKit) and Firefox: open /html/components/radio/, Tab into the Basics group, press Down Arrow on the last radio (does focus wrap to the first?), then set `dir="rtl"` on the `.ui-field-group` and press Right and Left Arrow (does Left move to the next radio?). Chromium wraps and flips Left and Right in RTL (probed: from A, RTL ArrowLeft goes to B and ArrowRight wraps to C). TODO.md: line 721 covers the same native radio-group behavior for the Tabs page.
- [C3] Range > Value, "so a screen reader announces each step once, with its unit" (`src/docs/components/range.astro:189-194`, `:197-200`) | the installed Chromium 153 exposes `valuetext` as the plain number (native range) or empty (ARIA slider) in `Accessibility.getFullAXTree` even with `aria-valuetext` set, so the announcement could not be confirmed. Check with NVDA or VoiceOver in Chrome, or in DevTools > Accessibility, on `/html/components/range/#value` (slider "Hue" should read "250°"). TODO.md line 672 asks for that screen reader check and was closed by reasoning about the code, not by a screen reader run.
- [C3] Range > Browser support, "Firefox: Partial support Missing: scroll-driven-animations" (generated from `src/docs/components/range.astro:26-38`) | the same page says Firefox draws the fill with `::-moz-range-progress` (Under the hood, Fill), so the control may be fully functional in Firefox and "Partial" misleading. Open `/html/components/range/` in Firefox 150 or later and check that the fill, the thumb halo, tick labels and the `.ui-spread` layout work without scroll-driven animations.
- [C3] Toggle > Keyboard support, "wrapping around at the ends (Safari stops at the first and the last). Left and Right follow the reading direction." (`src/component-api/toggle-group/api.ts:19`) | verified in Chromium 153 only (wraps; Left and Right swap in `dir="rtl"`). The Safari half is recorded as an engine bug (`tests/e2e/engine-bugs.ts:9`, `WEBKIT_RADIO_NO_WRAP`); run `pnpm test:e2e --project=webkit` for its repro, and press Left/Right in a `dir="rtl"` radiogroup in Firefox and Safari to check the reading-direction claim there.
- [C3] Toggle > Overflow, `overflow="scroll"` in Chromium 125-134 and Safari 18-25 (C3-03) | needs an older browser than the installed Chromium 153: open `/html/components/toggle/#overflow` there and check whether the "Scroll" group scrolls.
- [C3] Copy > Basics and Browser support (`src/docs/components/copy.astro:76-95`, `:22`) | Chromium 153 verified (clipboard text, `data-copied` for 2 s, "Copied" status, select fallback when `navigator.clipboard.writeText` rejects or is undefined, button hidden while `:not(:defined)`); not run in Firefox 144 and Safari 26.2, the stated minimums for `command="--copy"` events with `event.source`. Run `src/component-examples/copy/Basics.html` in both and click the button.
- [C4] Dialog > Long content, `src/docs/components/dialog.astro:259,268,277,286`: "Safari doesn't make a scroll container focusable, so when the content holds only text, a keyboard can't reach it to scroll." | In Safari 26 and 27 (macOS and iPadOS with a keyboard), open /html/components/dialog/#long-content, remove `tabindex`, `role` and `aria-label` from `.ui-content` in DevTools and Tab through the open dialog: focus should skip the scroller, and arrow keys should not scroll it. Chromium 153 does focus the text-only scroller with `tabindex`, `role` and `aria-label` removed (it is the first focus stop on open), so only the Safari half of the sentence is unverified.
- [C4] Dialog and Drawer > Keyboard support, `src/component-api/keyboard.ts:25,29`: "After the last one, focus moves to the browser's own controls (like the address bar), then back to the first element" | In desktop Chrome, Firefox and Safari, open a modal dialog and Tab past its last button. Headless Chromium 153 has no browser UI: focus went to `<body>` and then wrapped to the first element, so the "browser controls" step could not be seen. Safari does not tab to its toolbar by default, so the claim may not hold there.
- [C4] Menu, Tooltip and Anchor > API, `src/component-api/menu/api.ts:60`, `tooltip/api.ts:42`, `anchor/api.ts:30`: "The `self-` keywords follow the menu's own direction, so the placement mirrors in a right-to-left part of a left-to-right page." | Verified in Chromium 153 (a menu in a `dir="rtl"` block of an ltr page opens with its right edge at the trigger's right edge). TODO.md:737 says Firefox places the rtl menu about 1000px from its trigger (an expected failure with a plain-HTML repro in `tests/e2e/engines.spec.ts`), so the sentence is wrong in Firefox. Run /tests/overlays/ (Rtl section) in desktop Firefox to confirm.
- [C4] Tooltip > Accessibility, `src/docs/components/tooltip.astro:185-186`: "In browsers without interest invokers, the compat layer shows the tooltip while its trigger is hovered or has keyboard focus" | Open /html/components/tooltip/ in Firefox and Safari 26 and hover, then Tab to "Save". I only emulated the compat rules in Chromium by removing `interestfor`.
- [C5] Select > Fallback, `src/docs/components/select.astro:361-366` ("Browsers without customizable select drop the `<button>` and the list wrapper from the `<select>` and keep its options. The select keeps the field styles and the chevron, and opens the browser's own picker.") | Load /html/components/select/ in Firefox (or Safari before 27) and check `select.children`, `getComputedStyle(select.closest('.ui-select'), '::after').maskImage` and that the native picker opens. Chromium 153 cannot turn customizable select off (`--disable-blink-features=CustomizableSelect` had no effect). By the HTML parser's "in select" rules I expect it to hold.
- [C5] Select > Sizes, `select.astro:130-134` ("so iOS Safari doesn't zoom in when one is focused") | On an iOS device, focus the Small select on /html/components/select/ with a coarse pointer and see whether the page zooms; the CSS does set `--_font-size: var(--ui-font-size-control)` (16px) under `(pointer: coarse)` for `.ui-small` and `.ui-x-small` (`text-field.css:483-487`).
- [C5] Table > Advanced, `src/docs/components/table.astro:355-360` ("The headers that span columns have `scope="colgroup"` ..., so screen readers read "Capital" together with "Major Cities"") | Test the example with NVDA (Firefox and Chrome), JAWS and VoiceOver, moving into the "København" cell. Also note that the example has one `<colgroup>` spanning all six columns while the spanning `th scope="colgroup"` cells cover 3 and 2 columns; the HTML header-assignment algorithm applies a `colgroup` header to the cells of its column group, so conformance and AT output may differ from the text.
- [C5] Table > Accessibility, `table.astro:390-392` ("screen readers read the sort state with each cell") | Sort the Sortable example, then arrow through body cells with NVDA, JAWS and VoiceOver and listen for "sorted ascending". Chromium's AX tree has `columnheader` nodes and `aria-sort` on them (verified); the spoken output is not.
- [C5] Table > In a card, `table.astro:215-218` ("The caption names it") for a `display: block` scrolling table in Safari | VoiceOver on /html/components/table/ (In a card): is it still announced as a table with the caption as its name? In Chromium 153 it is (`table "Wide table caption 2"`, focusable). TODO.md:707 raises the same Safari risk for rich text tables.
- [C5] List > Accessibility, `src/docs/components/list.astro:501-504` ("Screen readers announce the link with `aria-current="page"` as the current page.") | NVDA, JAWS and VoiceOver on the Selected example. CDP's AX tree has no `current` property, so Chromium could not be probed.
- [C5] Table > Keyboard support, `table/api.ts:9`: Firefox keeps a scroll container focusable (my knowledge, TODO.md:667) | Tab through the C5-08 fixture in Firefox.
- [C6] Accordion > Accessibility, "In supporting browsers, find in page also searches closed accordions and opens the one with the match." (`src/docs/components/accordion.astro:291-294`, the claim starts at line 292) | In headed Chrome, Firefox 148+ and Safari 26.2+, press Ctrl/Cmd+F for a word inside a closed accordion on /html/components/accordion/ and check that it opens and the match scrolls into view despite the `::details-content` `block-size`/`content-visibility` transition. BCD `html.elements.details.search_match_opens` gives chrome 97, firefox 148 (139 partial), safari 26.2 (partial). Headless Playwright cannot drive the find bar, and `window.find()` finds the text but does not open the `<details>`.
- [C6] Carousel > Accessibility, "Screen readers announce the position of each item." (`src/docs/components/carousel.astro:394`) | In Chromium the `ul` keeps role `list` with `listitem` children and its `aria-label` (checked in the AX tree). `carousel.css:61` sets `list-style: none`, which Safari with VoiceOver may treat as dropping the list role unless `role="list"` is added; check with VoiceOver on Safari 26 (no scroll buttons or markers there).
- [C6] Carousel > Images, Gallery, Video and Embeds examples load external media (`picsum.photos` ids 1015, 1016, 1018, 1036, 1039, 1043, MDN `flower.mp4`, three `youtube-nocookie.com/embed` ids) and write alt text for the photos | The sandbox blocks these hosts; open each URL once and check that the photo matches its alt text and the video and embeds still resolve.
- [C7] Button group > Keyboard support (arrow keys scroll an `overflow="scroll"` group, `src/component-api/button-group/api.ts:20-24`) and Under the hood RTL dividers (C7-04) | Only Chromium 153 was available. Run the arrow-key check (focus the first button of `.ui-overflow-scroll`, press ArrowRight, wait about 700ms for smooth scrolling, read `scrollLeft` and `document.activeElement`) and the RTL pixel scan (`dir="rtl"` wrapper around a `.ui-filled` group, element screenshot, scan a text-free row for divider columns) in the `firefox` and `webkit` Playwright projects.
- [C7] Avatar > What's new "Without `corner-shape`, a squircle is a rounded square with corners at 27% of its size, from the compat layer" (`src/utils/whats-new.ts:113`) and Under the hood "Without `corner-shape`, the squircle is a circle" (`src/components/UnderTheHood/AvatarBuild.astro:71`) | Chromium 153 supports `corner-shape`, so the fallback never applies. In Firefox and Safari read `getComputedStyle(document.querySelector(".ui-avatar.ui-squircle")).borderRadius` with `avatar.css` alone (circle) and with `css/compat/avatar.css` (27%). The two sentences are consistent only if the Under the hood one is read as "avatar.css without the compat layer".
- [C7] Button > What's new "Primary and critical colors pass contrast in light and dark mode" (`src/utils/whats-new.ts:183`) | Checked in the default theme only (Chromium, normal and more contrast, rest, hover and pressed, text, outlined, tonal and filled: lowest 4.59:1, dark primary pressed). Repeat the measurement with each theme in `packages/opui/themes/` (`/html/components/button/?theme=<theme>` if the page takes it, else load the theme CSS).
- [C7] Button group and Chip Under the hood interactive demos ("Drag Width: wrapped rows get a divider on top for free", the Hover step) | The BuildUp knobs were not exercised. Open `#under-the-hood`, drag the Width knob, and check that a wrapped second row shows its top divider.
- [C7] Toggle group > Overflow description `src/component-api/toggle-group/api.ts:72` ("Icon-only items keep their size.") | Same sentence as C7-06 on another slice's page. Measure icon-only toggle buttons in `.ui-toggle-group.ui-overflow-shrink` against the default (40px square).
- [C8] Spinner > Basics, `src/docs/components/spinner.astro:62-63`: "Say what's happening in text, like "Loading…" in the busy element or in a `role="status"` element." The open TODO says JAWS holds back the content of a busy element in Chrome and Firefox, which would swallow text placed in the busy element itself. Check: JAWS with Chrome and Firefox, NVDA and VoiceOver on /html/components/spinner/#basics, whether "Loading…" inside `[aria-busy="true"]` is read. TODO.md: line 682.
- [C8] Progress > Under the hood, step "Value", `src/components/UnderTheHood/ProgressBuild.astro:70`: "Value changes transition `inline-size`". Chromium does not expose the computed style of `::-webkit-progress-value`. Check: record frames at 50ms steps after setting `progress.value` from 10 to 90 on /html/components/progress/#determinate in Chromium and Safari and see whether the fill width eases.
- [C8] Typography > Blockquote example, `src/component-examples/typography/Blockquote.html:1-4`: the quote is attributed to "Marika Hackman, No Caffeine". Check: the lyrics and the song title in a music database (no offline source here).
- [C8] Callout > Accessibility, `src/docs/components/callout.astro:188`: "screen readers announce it as self-contained content". Chromium exposes role `article` (ariaSnapshot `- article:`); what NVDA, JAWS and VoiceOver say for an unnamed `<article>` was not tested.

### Guide pages

- [G1] Accessibility > Keyboard, `src/docs/guide/accessibility.astro:104-109`, "After the last element, focus goes to the browser UI, then back to the first element" | In headless Chromium 153 Tab from the last button of a modal dialog went to `body` and then to the first button (sequence `d2, BODY, d1, d2, BODY, d1`), which fits; the browser UI itself and Firefox/Safari need a headed run: open a modal `<dialog>` with two buttons, press Tab three times, watch whether the address bar or toolbar takes focus before the first button.
- [G1] Customizing > Example themes, `src/utils/example-theme-notes.ts:3-26`, "They copy their originals faithfully" | I checked every number in the notes against the theme files and against Chromium measurements of each theme (Bootstrap 38px controls, 16px checks, 32px switches, regular weights, no overlay shadows; m3 24px button padding, pill radius, 12px cards, 28px dialogs, 4px menus and fields, 8px chips, 18px checkboxes, 52 by 32px switches, Roboto; shadcn 36px controls with 14px text and 16px padding, 32px and 40px small and large buttons, 16px checks with 4px corners, 32px switch, 8px menus and chips, 10px dialogs, 14px cards with 24px padding, near-black tooltips; brutalist black 2px borders, 4px hard shadows on cards, dialogs and menus, black links, 500 weight text, blue tooltips): all match except the brutalist hover claim. Bootstrap and Material values match the original hex colors by my own conversion (#0d6efd is `oklch(0.578 0.228 260)`, #dee2e6 is `oklch(0.911 0.007 248)`, #6750A4 is `oklch(0.496 0.13 294)`, #B3261E, #79747E), from knowledge. The brutalist and shadcn token values against neobrutalism.dev and the shadcn/ui neutral theme could not be checked offline: compare `themes/brutalist.css` and `themes/shadcn.css` with the upstream CSS variables.
- [G1] Why Open Props UI? > Backstory, `src/docs/guide/why-opui.astro:35-37`, "Some barely used CSS grid or `gap`" | Anecdote about unnamed libraries, nothing in the repo can confirm it.
- [G1] Why Open Props UI? > Backstory, `src/docs/guide/why-opui.astro:61-65`, link text "the only thing that matters?" to `https://youtu.be/RaQdd8bUaXk?si=SILoMZQZxfyoo-_A&t=657` | YouTube is blocked here: open the link and confirm the video at 10:57 makes that point.
- [G1] Acknowledgments > Sources and Other resources, `src/docs/guide/acknowledgments.astro:44-111` | External links are unreachable from here: `curl -sI` each of mui.com/material-ui/, m3.material.io, tailwindcss.com, picocss.com, ui.shadcn.com, graffiti-ui.com (the one I cannot confirm from knowledge), developer.mozilla.org, web.dev, astro.build. Verified here: the Discord invite `AqA4fU886r` is the one in the open-props README on npm, `github.com/ateliertriay/bricolage` exists (raw.githubusercontent.com README, OFL.txt 200) and the font is used by the docs (`src/styles/base.css:62`, `src/layouts/Layout.astro:39`, `public/BricolageGrotesque[opsz,wdth,wght].ttf`).
- [G1] Acknowledgments > Contributors, `src/components/Contributors.astro:25-27` | Filled at build time from GitHub's contributors graph data (10 avatars in the built page), not hand-written: compare with `https://github.com/felix-bohlin/ui/graphs/contributors`.
- [G1] Accessibility > Contrast, forced colors and motion, `src/docs/guide/accessibility.astro:167-170`, "components switch to system colors" | Not probed per component: run `page.emulateMedia({ forcedColors: "active" })` over the component pages and look for non-system colors.
- [G2] Browser support > Compat layer, Menu: "iOS Safari doesn't place them at their trigger item" (`src/docs/guide/browser-support.astro:75-77`, `packages/opui/css/compat/menu.css:2-3`) | on an iPhone or iPad with Safari 26, open `/tests/overlays/`, untick `position-anchor: --ui-menu` in Web Inspector and see whether a submenu opens level with its item (the same check is written in TODO.md lines 728-732).
- [G2] Browser support > Polyfills: that each polyfill covers what the library uses (`src/docs/guide/browser-support.astro:111-138`) | in Firefox before 147 and Safari before 26 load the four packages and open `/html/components/{tooltip,menu,anchor,dialog,drawer}/`; the `@oddbird/css-anchor-positioning` README lists `position-visibility` and "a `position-area` as a `try-tactic`" as unsupported, and `tooltip.css:34-35,115-125` uses both; Safari also lacks `popover="hint"` (web-features: Chrome 151, Firefox 153), which Anchor sets for hover triggers (`packages/opui/components/Anchor/Anchor.astro:25`) and no polyfill on the page covers.
- [G2] Theme tokens: every "Promises 4.5:1 / 3:1 against ..." sentence (generated from `src/utils/theme-token-promises.ts`, for example the rows for `--ui-text-subtle`, `--ui-primary-text` and `--ui-on-fill`) | enforced by `tests/unit/contrast.test.ts` and `tests/e2e/contrast.spec.ts`; I did not recompute the ratios.
- [G2] Theming > Forced colors: "focused fields a `Highlight` outline" and the `SelectedItem` claims for tabs, toggles and list items (`src/docs/guide/theming.astro:593-597`) | read in the CSS (`text-field.css:312-316`, `tabs.css:260-268`, `toggle-button.css:120-127`, `list.css:415-423`) but not rendered; run Chromium with `forcedColors: active` on those components, and check Firefox and WebKit, which I did not run.

### Getting started and entry pages

- [G3] Getting started (HTML) `HTML.astro:69-70`: "a bundler that resolves CSS `@import`s from `node_modules`, like Vite or webpack" | create a webpack 5 project with css-loader, put `@import "opui-css/css/imports.css";` in a CSS file with 6.0.0-rc.1 installed and build; webpack is not installed here and builds are off limits.
- [G3] Getting started (React) `React.astro:32-35`: "Vite with `@vitejs/plugin-react` and Astro with `@astrojs/react` compile them as they are" | in a Vite+React app and an Astro+@astrojs/react app install the packed tarball (a real folder in `node_modules`, not a workspace link), import `Button` from `opui-css/react`, and run a client build and a server render. I only read the config: plugin-react 6.1.2 sets the automatic JSX runtime for every file (`dist/index.js:86-95`) and Astro 7 puts packages with the `astro-component` keyword in `ssr.noExternal` (`astro/dist/core/create-vite.js:91-92`).
- [G3] Getting started (Svelte) `Svelte.astro:29`: "SvelteKit compiles the package for server rendering through its `svelte` field" | run `vite build --ssr` in a SvelteKit app with the packed tarball. Read in source only: vite-plugin-svelte 7.3.1 treats a package as a Svelte library when it has a `svelte` field or an exports `svelte` condition (`src/utils/options.js:490-503`), and this package has both.

### Migrating guide

- [M1] MIGRATING.md:341 "Browsers without customizable select show the native picker." | run the Select fixture (`/html/test/select` with `OPUI_TEST_PAGES=1`) in the Playwright `firefox` and `webkit` projects (only Chromium 153 was available here). web-features 3.44.0 lists `customizable-select` as Chrome 135, Safari 27, no Firefox.
- [M2] `packages/opui/MIGRATING.md:1157` "If you copied a complete `theme.css` from the v5 Theme generator" | the 5.4.3 package never mentions a generator; check the v5 docs site source (tag v5.4.3, `src/components/ThemeGenerator`) for what it exported. The repo history here is squashed (32 commits).
- [M2] `packages/opui/MIGRATING.md:1070` "shift along the viewport edge instead of squeezing, with or without an arrow" | checked in Chromium 153 only (a long tooltip at the left and right edge of a 500px viewport keeps its 240px width, with and without `.ui-arrow`); open /html/components/tooltip/ in Firefox and Safari 26 at a narrow width and put the trigger at each edge.

### Blog posts

- [L1] All nine registry entries, `date: "2026-10-02"` (`src/utils/learn-posts.ts:23,38,53,67,81,96,111,126,141`) | this checkout has 32 commits, all dated 2026-10-27, so nothing dates the posts; in the original history run `git log --diff-filter=A --format=%ad --date=short -- src/docs/learn/<slug>.astro` for the nine slugs and compare.
- [L1] accordion-height-auto > Fallback, `src/docs/learn/accordion-height-auto.astro:96-101` ("Browsers without `::details-content` ignore the rules and open instantly") | the section names only `::details-content`, but the gap that limits the effect is `interpolate-size` (BCD 8.1.7 and web-features: Chrome and Edge 129 only, baseline false), while Firefox 143 and Safari 18.4 do have `::details-content`. Open /learn/accordion-height-auto/ in Firefox 143+ and Safari 18.4+: expected result from the data is that the height still snaps and only the opacity fades (the `numeric-only` column of the post's own demo). Not a false sentence, an omission, and only Chromium is available here.
- [L1] checkbox-appearance-none > Fallback, `src/docs/learn/checkbox-appearance-none.astro:114-117` ("the box and the check render everywhere") | rests on `::after` drawing on `input[type=checkbox]` with `appearance: none` in Firefox and WebKit; `tests/e2e/engine-bugs.ts` has no entry for it. Open the page in Firefox and Safari and confirm the `appearance: none` column shows the check and the dash.
- [L1] anchor-hover-cards > Fallback, `src/docs/learn/anchor-hover-cards.astro:128-131` ("the unknown value falls back to a manual popover, which doesn't light dismiss") and dialog-closedby > Fallback, `src/docs/learn/dialog-closedby.astro:99-102` ("a modal still closes on Esc, but not on a click outside") | confirmed only through Chromium 153 (`popover="bogus"` reads back as `manual` and does not light dismiss; a modal without `closedby` closes on Esc and not on an outside click). Run the same two checks in Safari, which has neither `popover="hint"` nor `closedby`.
- [L2] `src/docs/learn/range-tick-marks.astro:172-176`, "The labels are plain flex content and render wherever `<datalist>` is parsed" | open /learn/range-tick-marks/ in Firefox and in Safari or Playwright WebKit and check that the numeric labels, which come only from `label=` on empty `<option>` elements (`src/components/Learn/RangeTicks.astro:81-86`, `src/component-examples/range/TickMarksLabels.astro`), show under the track in both demos. Chromium 153 shows them and they sit on the thumb centers (maximum offset 0.1px).
- [L2] `src/docs/learn/switch-checkbox.astro:107-111`, "`appearance: none`, pseudo-elements on a checkbox and logical insets work in every current engine" | open /learn/switch-checkbox/ in Firefox and in Safari or Playwright WebKit and check that the `appearance: none` column of the demo draws a track and a dot (`::before` and `::after` on `input[type="checkbox"][role="switch"]`). BCD has no entry for pseudo-elements on checkboxes, and only Chromium is installed here.
- [L2] `src/docs/learn/menu-popover-anchor.astro:136-143`, the iOS compat block (matches `packages/opui/css/compat/menu.css:2-19`) | on an iPhone or iPad open `/tests/overlays/` and check that submenus sit next to the whole menu while the `(-webkit-touch-callout: none)` block is active, and level with their item without it. TODO.md: line 728 already tracks this.
- [L2] `src/utils/learn-posts.ts` `date` of every entry in this slice (`2026-10-02`, and `2026-10-23` for the fluid type post) | the repository history here is shallow (32 commits, all dated 2026-10-27), so it cannot show when each post was first published; compare `git log --diff-filter=A --format=%ad -- src/docs/learn/<slug>.astro` on the full history.
- [L3] opui 6.0 > One library, four frameworks: `src/docs/learn/release-6.astro:64` "The 22 fixes that aligned one framework with another" | the number is not derivable from the repo. The 6.0.0 `Fixed` section of `packages/opui/CHANGELOG.md` has 242 entries; 29 name a framework, 28 name Astro or Vue, 20 name Vue, 12 name Astro, 25 use the "in &lt;framework>" form. Ask the author which entries were counted (or tag them) and recount.
- [L3] opui 6.0 > Contrast as a guarantee: `src/docs/learn/release-6.astro:174-175` "2664 pairs" | see L3-07: no script or test in the repo runs the sweep. If the author has it, run it and list the pair set (37 hues x 4 modes x N pairs gives 2664 only for N = 18; the repo's promised pairs are 62, of which 13 follow the palette hue).
- [L3] Learn: Tooltips with interestfor > Fallback: `src/docs/learn/tooltip-interest-invokers.astro:140-143` "There's no `@supports` fallback for anchor positioning or `calc-size()`: those declarations are ignored, and the tooltip isn't placed next to its trigger" | in an engine without anchor positioning (Firefox 146 or older, Safari 25 or older) open a Tooltip on /html/components/tooltip/ and check where the tooltip lands. It is `position: fixed` with `inset: unset`, so it may sit at its static position right after the trigger, which would be "next to" it. I only have Chromium.
- [L3] Learn: Table, Tabs and Tooltip fallback bullets (`table-scroll-state.astro:199-209`, `tabs-radio-buttons.astro:83-99`, `tooltip-interest-invokers.astro:122-145`) | they describe Firefox and WebKit behavior from parse rules (unknown `@container` feature, unknown `:nth-child(of S)`); load the three fixture pages in Firefox and WebKit (`pnpm test:e2e --project=firefox --project=webkit`, or the pages by hand) to confirm. Only Chromium was available.
- [L3] opui 6.0 > In one breath: `src/docs/learn/release-6.astro:29-30` "105 breaking entries, the first major since 5.0, most of them renames" | the 105 is right (counted). By my reading roughly 55 of the 105 are renames or replacements and 50 are behavior or structure changes (parts instead of slots, "no longer renders", required `id`, types), so "most" is borderline. Someone could classify the 105 entries by hand.

## Not covered

- Firefox and Safari behavior at runtime. Only Chromium 153 was available, so claims about other engines were checked against compat data and engine source only where a finding says so.
- Screen reader output (NVDA, JAWS, VoiceOver). Reviewers checked the accessibility tree in Chromium instead.
- iOS and touch hardware.
- External links and hosts that the sandbox blocks (MDN, YouTube, picsum.photos, jsDelivr, github.com pages).
- When each blog post (then a Learn post) was first published. The clone has 32 commits, all from 2026-10-27, so the `date` fields could not be checked.
- The body of the `/api` index (read for structure and sampled), the block previews other than the Blocks index text, and the internal `/checks`, `/todo` and test pages.
- Anything that the repo's own checks already enforce and that passes today: names of props, slots, classes and custom properties in `api.ts`, internal links and ids, and markup parity across frameworks.
