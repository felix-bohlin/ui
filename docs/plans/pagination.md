# Pagination: implementation plan

Status: plan only. This PR carries the plan; the implementation lands on this branch in later commits.

## Summary

A `Pagination` moves between the pages of a long list of results: Previous and Next links, the first and last page, the pages around the current one and an ellipsis for the gaps. It is links in a `nav`, styled with `Button`, so it needs no script; the components compute which pages to show from the current page and the page count.

## Why

- Nuxt UI (`@nuxt/ui` 4.12.0, `UPagination`, built on Reka UI's `PaginationRoot`) takes `page`, `total`, `itemsPerPage`, `siblingCount`, `showEdges`, `showControls`, `disabled`, icons for first, previous, next, last and the ellipsis, `color`, `variant`, `activeColor`, `activeVariant`, `size` and a `to(page)` function that turns the items into links; it emits `update:page` (`dist/runtime/components/Pagination.vue.d.ts`).
  - We take: the page window (`siblingCount`, edges always shown, an ellipsis between), Previous and Next, a function that builds each page's `href`, Button's `size` and `variant`.
  - We leave: buttons with a client-side `page` model. Pagination is navigation, so every page is a URL; a framework router intercepts the links. First and last buttons (the first and last page numbers are always in the window). `activeColor`/`activeVariant` (the current page is Button's `aria-current="page"` state, one look for every pagination). `total` and `itemsPerPage` (the caller knows the page count; dividing is their business).
- The repo already needs it:
  - `src/blocks/data-table.html:565-605` builds pagination from an outlined `ButtonGroup` by hand, with a disabled Previous link written out (`:569-585`), the current page (`:586`) and a jump from 3 to 22 with no ellipsis (`:588-589`).
  - `src/component-examples/button-group/Pagination.astro` documents the same pattern on the Button group page.
  - `TODO.md:1453-1456` (open, priority 2) asks for `.ui-pagination` on a `nav`, a list of links, `aria-current="page"`, an ellipsis item and Previous and Next links that a missing `href` disables, and a component that takes the current page, the page count and a function or template for the `href`.
  - `TODO.md:281-287` (open, priority 3): the current page in a pagination group is hard to spot in some themes (`packages/opui/css/components/button.css:200-203`, measured on `src/stress-tests/data-display.html:2439-2529`). This plan depends on that fix for the look of the current page.
  - `TODO.md:2499-2505` lists pagination among the components the blocks point to.

## Scope

- In: `nav.ui-pagination` with a `ul` of `Button` links, the ellipsis, Previous and Next, `size` and `variant` passed to the buttons, a compact layout in narrow containers, `Pagination` in Astro, React, Svelte and Vue that computes the window, the docs page, the data-table block moved onto it.
- Out:
  - A buttons mode with an `onPageChange` callback and `bind:page`. Add it later if a block needs it; the link mode covers server rendering, SPAs with routers and plain HTML.
  - "Showing 1 to 5 of 128" text and a page size select. That is the caller's layout next to the nav (the data-table block keeps its `<p>`).
  - A joined look. A `ButtonGroup` stays the way to join buttons; the Button group page keeps its Pagination example and links here.

## Markup and CSS

```html
<nav aria-label="Pagination" class="ui-pagination">
  <ul>
    <li>
      <a aria-disabled="true" class="ui-button" role="link">
        <svg aria-hidden="true" class="ui-start" viewBox="0 0 24 24">...</svg>
        Previous
      </a>
    </li>
    <li><a aria-current="page" class="ui-button" href="?page=1">1</a></li>
    <li><a class="ui-button" href="?page=2">2</a></li>
    <li><a class="ui-button" href="?page=3">3</a></li>
    <li class="ui-ellipsis">…</li>
    <li><a class="ui-button" href="?page=22">22</a></li>
    <li>
      <a class="ui-button" href="?page=2">
        Next
        <svg aria-hidden="true" class="ui-end" viewBox="0 0 24 24">...</svg>
      </a>
    </li>
  </ul>
</nav>
```

- A disabled Previous or Next is Button's disabled link (no `href`, `role="link"`, `aria-disabled="true"`), as `tagAttrs` renders it today (`TODO.md:232-241`).
- Stylesheet: `packages/opui/css/components/pagination.css`, `@layer components.root`, in the Root components group of `css/components.css` between `link.css` and `progress.css`. It lays out the list and the ellipsis; the buttons keep `button.css`.
- Rules:
  - `:where(.ui-pagination)`: `container-type: inline-size` (for the compact layout), declares `--_gap: var(--ui-space-1)` and `--_ellipsis-text-color: var(--ui-text-subtle)`.
  - `& > ul`: `display: flex; flex-wrap: wrap; align-items: center; gap: var(--_gap); list-style: none; margin: 0; padding: 0`.
  - `& > ul > li > .ui-button`: `min-inline-size: var(--_size)` and `font-variant-numeric: tabular-nums`, so 1 and 22 are the same width (Button already sets `--_size` per size).
  - `& > ul > .ui-ellipsis`: `color: var(--_ellipsis-text-color); min-inline-size: var(--ui-control-size); text-align: center`, with the size classes on the `nav` mapping it to the matching control size role (Button's `--_size` lives on the button, not the `li`).
  - Previous and Next with a label and an icon use Button's own `.ui-start`/`.ui-end` icon slots.
  - Compact layout: `@container (inline-size < 30rem)` hides every page item except the current one and the first and last pages (`& > ul > li:not(:first-child, :last-child, :has([aria-current="page"]), :nth-child(2), :nth-last-child(2), .ui-ellipsis)` with `display: none`), so a phone shows "Previous 1 ... 7 ... 22 Next". Hidden pages leave the accessibility tree too, which is right for a layout that drops them; Previous and Next still reach every page.
- Modifiers, passed through to each `Button` by the components (in HTML the reader puts them on the buttons, or on the `nav` through the button-group style inheritance pattern; see open question 1):
  - `size`: `x-small`, `small`, `medium` (default), `large`, as Button.
  - `variant`: `transparent` (Button's default), `outlined`, `tonal`. `filled` is left out: every page filled reads as a row of primary actions.
- Tokens: none new. The current page reads Button's `aria-current` style, which TODO.md:281 will give its own token (`--ui-state-selected-alpha-accent`, option A there).
- Features for `browserSupport`: `container-queries`, `has`.
- Forced colors: no block of its own. Button already gives `aria-current="page"` `SelectedItem` (`packages/opui/css/components/button.css:210-218`). Add `Pagination` to the "without a block" list in `packages/opui/components/AGENTS.md` as "layout only, the current page is Button's block".
- More contrast, motion: nothing of its own; Button handles both.
- Right-to-left: the Previous chevron points to the inline start. Mirror the two icons with `.ui-pagination :dir(rtl) .ui-button > svg { scale: -1 1 }` (adds `dir-pseudo`), or ship the components' default icons as logical arrows and mirror them in the component CSS only.

## Behavior

No script. The components compute the window on the server and on the client with one shared function, `pageWindow(page, pageCount, siblingCount)` in `packages/opui/components/Pagination/window.ts`, returning `(number | "ellipsis")[]`:

- Always the first and last page.
- `siblingCount` pages on each side of the current one (default 1).
- An ellipsis where a gap of two or more pages is skipped; a gap of exactly one page shows the page instead (1 2 3 4 5 rather than 1 ... 3 4 5), so the list never jumps in width as you step through it. Nuxt UI and Reka UI keep a constant item count the same way.
- `pageCount` of 0 or 1 renders nothing but the disabled Previous and Next (or nothing at all; open question 3).

A unit test covers the window for every `page` from 1 to 30 at `siblingCount` 0, 1 and 2.

## Component API

One component. Compiled by `pnpm build-components` if the compiler accepts a function prop and an imported helper; otherwise list the files in `scripts/hand-written-components.json` with the construct it names and port them with `/port-component Pagination`.

| Prop            | Type                                     | Default         | Renders                                         |
| --------------- | ---------------------------------------- | --------------- | ----------------------------------------------- |
| `href`          | `(page: number) => string`               | required        | each page's `href`, and Previous and Next       |
| `nextLabel`     | `string`                                 | required        | Next's text, with a `next-label` slot           |
| `page`          | `number`                                 | required        | `aria-current="page"` on that page              |
| `pageCount`     | `number`                                 | required        | the last page                                   |
| `pageLabel`     | `(page: number) => string`               | none            | `aria-label` on each page link ("Page 2")       |
| `previousLabel` | `string`                                 | required        | Previous's text, with a `previous-label` slot   |
| `siblingCount`  | `number`                                 | `1`             | the window                                      |
| `size`          | Button's sizes                           | `"medium"`      | `.ui-x-small`, `.ui-small`, `.ui-large` on each |
| `variant`       | `"outlined" \| "tonal" \| "transparent"` | `"transparent"` | `.ui-outlined`, `.ui-tonal` on each             |

- Slots: `next-icon` and `previous-icon` replace the default chevrons (guide section 3: the icon of a generated control is `<part>-icon` next to its `<part>Label`), `next-label` and `previous-label` for rich labels.
- Previous and Next labels are visible text by default; `hideLabel` makes both icon-only with `.ui-sr-only` text (the one allowed hiding prop), which the data-table block uses.
- The names are required because the component never writes English words (guide section 3, Accessible names). `pageLabel` is a function because a component never joins a number and words (same section): the caller returns "Page 2" or "Sida 2".
- `aria-label` (or `aria-labelledby`) on the root is required in the types, as `Carousel` does.
- `model`: none.

```astro
---
import { Pagination } from "opui-css/astro"

const page = Number(Astro.url.searchParams.get("page") ?? 1)
---

<Pagination
  aria-label="Pagination"
  href={(page) => `?page=${page}`}
  nextLabel="Next"
  page={page}
  pageCount={22}
  previousLabel="Previous"
  variant="outlined"
/>
```

## Accessibility

- A `nav` landmark named by the caller, a `ul` of links, `aria-current="page"` on the current one (WAI pattern used by GOV.UK and USWDS).
- The ellipsis is text in its own `li`. Screen readers read "…" as "dot dot dot" or skip it depending on verbosity; that matches GOV.UK. Do not `aria-hidden` the `li`, which would change the item count.
- A disabled Previous on page 1 is a link with no `href`, which leaves the tab order and reads as "Previous, link, dimmed" with `role="link"` and `aria-disabled="true"`.

| Key           | Action                           |
| ------------- | -------------------------------- |
| `Tab`         | Moves to the next page link.     |
| `Shift + Tab` | Moves to the previous page link. |
| `Enter`       | Opens the focused page.          |

- What axe can't catch: that the current page is visible without color in every theme (TODO.md:281), that the compact layout keeps Previous, Next and the current page, that `pageLabel` text is translated, that focus lands somewhere sensible after the page changes in an SPA (the docs say: move focus to the results heading).

## Docs page

`src/docs/components/pagination.astro`, `slug="pagination"`, `heroAnatomy`.

- Preamble: "Moves between the pages of a long list of results." See also: Button group (its Pagination example now links here, and this page links back for a joined look), Carousel (pages of a slider), Table.
- Usage: when to use (search results, tables and lists with a known page count, pages a reader may link to or come back to); when not to use (a feed that loads more as you scroll, use a "Load more" Button; fewer than two pages; steps of a task, use Stepper).
- Sections:
  1. Basics (`Basics`): 22 pages, current page 1, transparent buttons.
  2. Variants (`Variants`): `outlined` and `tonal`.
  3. Sizes (`Sizes`): `small` and `large`.
  4. Window (`Window`): `siblingCount` 0, 1, 2 on page 8 of 22, with the ellipsis.
  5. Icons only (`IconsOnly`): `hideLabel`, as in the data-table block.
  6. Page labels (`PageLabels`): `pageLabel` for "Page 2".
  7. Compact (`Compact`): a narrow container showing the compact layout.
  8. With a summary (`WithSummary`): the "Showing 1 to 5 of 128 customers" row from the data-table block.
  9. Accessibility slot: landmark, current page, focus after change, keyboard table.
- Anatomy: root `.ui-pagination`, parts `ul`, `.ui-button` with `[aria-current="page"]`, `.ui-ellipsis`.
- `browserSupport={["container-queries", "dir-pseudo", "has"]}`.

## Blocks and other pages

- `src/blocks/data-table.html:565-605`: replace the `ButtonGroup` with `nav.ui-pagination`, small outlined icon-only buttons, an ellipsis between 3 and 22. New visual baseline (`update-snapshots`).
- `src/component-examples/button-group/Pagination.astro` and its four siblings: keep it as a joined look, and add a sentence on `src/docs/components/button-group.astro` pointing to Pagination for page links.
- `src/stress-tests/data-display.html:2439-2529`: add a `.ui-pagination` next to the button group pagination there, so `tests/e2e/stress-data-display.spec.ts` measures both and `tests/e2e/stress.spec.ts` checks the control sizes in the `[data-size]` rows.

## Files

- `packages/opui/components/Pagination/`: `Pagination.astro`, `window.ts`, `types.ts`, `types.astro.ts`, and the compiled or ported `Pagination.react.tsx`, `Pagination.svelte`, `Pagination.vue`, `types.react.ts`, `types.svelte.ts`, `types.vue-props.ts`.
- Barrels: `packages/opui/astro/index.ts`, `react/index.ts`, `svelte/index.ts`, `vue/index.ts`.
- `packages/opui/css/components.css`, `packages/opui/css/components/pagination.css`.
- `src/component-api/pagination/api.ts`, `src/component-api/custom-properties/pagination.ts` (`--_gap`, `--_ellipsis-text-color`).
- `src/component-examples/pagination/` (the eight examples above, five formats each).
- `src/docs/components/pagination.astro`, `src/docs/components/button-group.astro` (link).
- `src/components/ComponentShowcase/ComponentShowcase.astro`.
- `packages/opui/skills/opui/references/pagination.md`, `references/index.md`, `packages/opui/README.md`.
- `packages/opui/CHANGELOG.md`, `### Added`: "`Pagination` links the pages of a long list: `.ui-pagination` on a `nav` with a list of `Button` links, an ellipsis between ranges, Previous and Next, and a compact layout in narrow containers. The components compute the pages around the current one from `page`, `pageCount` and `siblingCount`."
- `src/utils/whats-new.ts`: a `pagination` entry linking `#basics`, the slug in `added` and `highlighted`.
- `docs/releases/6.0.0.md`: a Components check linking `/html/components/pagination/` (current page visible in every theme, compact layout on a phone).
- `tests/package/package.test.ts`, `tests/unit/pagination-window.test.ts` (new).
- `packages/opui/components/AGENTS.md`: Pagination in the forced colors "without a block" list.
- `src/blocks/data-table.html`, `src/stress-tests/data-display.html`.
- `TODO.md`: resolve `:1453`, update `:2499`, note on `:281` that Pagination reads the same current page style.
- Generated: `public/search-index/*.json`, parity snapshots, `scripts/generated-files.json` outputs.

## Tests

- Unit: `pagination-window.test.ts` (the window function, with a sample that must produce an ellipsis and one that must not), `component-contract.test.ts`, `parity.test.ts`, `naming.test.ts` (`size`, `variant`, `hideLabel`, `nextLabel`/`next-icon` pairing), `example-coverage.test.ts`, `component-types.test.ts` (the function props survive the React, Svelte and Vue types), `changelog.test.ts`, `whats-new.test.ts`, `layers.test.ts`, `forced-colors.test.ts`.
- E2E: `interaction.spec.ts`: Tab order skips a disabled Previous, the compact layout keeps the current page at 320px. `a11y.spec.ts` through the fixture page. `tests/e2e/stress-data-display.spec.ts`: the current page in `.ui-pagination` differs visibly from its neighbors. Visual baselines from CI.

## Steps

1. Write `window.ts` and its unit test first. Check: `pnpm exec vitest run tests/unit/pagination-window.test.ts`.
2. Write `pagination.css`, add it to `components.css`, move the data-table block. Check: `pnpm sort-css:check`, `pnpm check-css-vars`.
3. Write `Pagination.astro`, `types.ts`, `types.astro.ts`; run `pnpm build-components`. If it refuses the function props, ledger the files with the reason and run `/port-component Pagination`. Check: `pnpm check-ports`, `component-contract.test.ts -t Pagination`.
4. `api.ts` and custom properties. Check: `pnpm test` (`[component-api]`), `naming.test.ts`.
5. Examples and `pnpm build-examples`. Check: `pnpm check-examples`, `parity.test.ts -t pagination`, `example-copy.test.ts`.
6. Docs page, Button group link, barrels, README, skill reference, CHANGELOG, What's new, release check, guide list, TODO.md. Check: `pnpm check:fast`.
7. `pnpm test:e2e --project=light --project=dark -g Pagination`, then `pnpm check`. Push and add `update-snapshots`.

## Open questions

1. In HTML, does `variant` go on each button or once on the `nav`? Recommended: on the `nav` (`.ui-pagination.ui-outlined`), styled by adding `:where(.ui-pagination.ui-outlined) > ul > li > &` to the selectors in `button.css` that already list `:where(.ui-button-group.ui-filled) > &` (`button.css:322`, `:375`, `:399` for outlined, tonal and filled). One class instead of 22, and the components render the same markup.
2. Fix TODO.md:281 (the current page tint) first, in its own PR? Recommended: yes. Pagination makes the current page more prominent than anything else today, so it should land on the better tint.
3. With one page, render nothing or a disabled Previous and Next? Recommended: render nothing and say so on the page; a lone "1" is noise.
4. Links only, or a buttons mode with `onPageChange`/`bind:page` as Nuxt UI has? Recommended: links only for now, revisit when a block needs client-side paging.
