# Skeleton: implementation plan

Status: plan only. This PR carries the plan; the implementation lands on this branch in later commits.

## Summary

`Skeleton` is a placeholder drawn in the shape of the content that is still loading: a few lines of text, an avatar circle or an image box. It replaces the Spinner where the layout of the coming content is known, so the page doesn't jump when it arrives. It is CSS only and builds on the `aria-busy` state the Spinner already reads.

## Why

- Nuxt UI ships `USkeleton` (`nuxtui/package/dist/runtime/components/Skeleton.vue`). It is one `div` with `animate-pulse rounded-md bg-elevated` (`dist/shared/ui.Ba0YYeuK.mjs:6625-6627`), and the caller sizes it with utility classes. Each skeleton sets `aria-busy="true"`, `role="alert"`, `aria-live="polite"` and a translated `aria-label`.
  - We take: one element per placeholder, sized by the caller, with a quiet animation that stops under reduced motion.
  - We leave: the ARIA on every placeholder. With `role="alert"` on each skeleton, a list of ten rows announces "Loading" ten times. In opui the region that loads carries `aria-busy="true"` once, and the placeholders are `aria-hidden="true"`.
  - We add: a `lines` option, so one element draws a paragraph with a shorter last line, which Nuxt users build from several divs.
- The repo already asks for it: `TODO.md:1388-1391` ("there is no skeleton"), recommended Fix, with this exact shape (`.ui-skeleton`, shimmer off with `--ui-motion`, `aria-hidden` on the placeholder, `aria-busy` on the container).
- Today the only loading state is the Spinner (`packages/opui/css/components/spinner.css:2-49`), which draws a ring in `::before` on any `[aria-busy="true"]` element. Blocks that load lists (inbox, notifications, data-table, user-directory) show no loading state at all.

## Scope

- In: `.ui-skeleton` for a text line or several lines, a circle, and a free box (image, card media, button). A `Skeleton` component in Astro, React, Svelte and Vue. A Loading section on the Card, List and Table pages that links here.
- Out:
  - Prebuilt composites (`SkeletonCard`, `SkeletonListItem`). The examples show how to compose them from existing components instead, so they keep the real component's paddings.
  - A script that swaps the skeleton for content. That is the app's job; the docs show `aria-busy` toggling.

## Markup and CSS

```html
<section
  aria-busy="true"
  aria-labelledby="team-title"
  class="ui-card ui-outlined"
>
  <div class="ui-header"><h2 id="team-title">Team</h2></div>
  <ul class="ui-list">
    <li>
      <div>
        <div class="ui-start">
          <span
            aria-hidden="true"
            class="ui-skeleton ui-circle"
            style="--_inline-size: 2.5rem"
          ></span>
        </div>
        <span aria-hidden="true" class="ui-skeleton" style="--_lines: 2"></span>
      </div>
    </li>
  </ul>
</section>
```

- Root: `.ui-skeleton` on an empty `span` (inline in text) or `div` (block), always `aria-hidden="true"`.
- Stylesheet: `packages/opui/css/components/skeleton.css`, layer `components.root`. Imported in the Root components group of `packages/opui/css/components.css` between `select-all.css` and `sortable-table.css` (ascending order, `packages/opui/css/components.css:27-28`).
- Default shape: a text line, `block-size: 1lh` with the glyph box trimmed to cap height by a background clip, so it lines up with the text that replaces it, `inline-size: 100%`, `border-radius: var(--ui-radius-small)`.
- Modifiers (naming model, section 3 of `packages/opui/components/AGENTS.md`):
  - `shape`: `circle` (`.ui-circle`), `rounded` (the default, no class), `squared` (`.ui-squared`), `squircle` (`.ui-squircle`), the same set as `Avatar` (`packages/opui/components/Avatar/types.ts:2`). A circle is square, so it takes `aspect-ratio: 1` and only `--_inline-size`.
  - `lines`: a number, written to `--_lines` through `style`. With more than one line the element is `calc(var(--_lines) * 1lh)` tall and a `repeating-linear-gradient` mask draws the gaps between lines; a second mask layer cuts the last line to `--_last-line-inline-size` (60% by default).
- Inputs (documented in `src/component-api/custom-properties/skeleton.ts`): `--_inline-size`, `--_block-size`, `--_lines`, `--_last-line-inline-size`, `--_radius`, `--_bg-color`, `--_shimmer-bg-color`, `--_duration`.
- Roles it reads: `--ui-surface-tonal` for the fill (the same quiet tint as a tonal Callout, `packages/opui/css/components/callout.css:4`), `oklch(from var(--_bg-color) calc(l + 0.04) c h)` inside `light-dark()` for the shimmer, `--ui-radius-small`, `--ui-duration-slow`, `--ui-motion`. No new theme token: a theme that wants another color sets `--ui-surface-tonal` or the `--_bg-color` input.
- Animation: a shimmer, a `linear-gradient` background layer that moves along the inline axis with `background-position`. Its duration is `calc(var(--ui-duration-slow) * 6 / var(--_motion))`: with `--ui-motion: 0` (set under `prefers-reduced-motion: reduce` at `packages/opui/css/theme.css:623-625` and by `.ui-motion-off`, `packages/opui/core/utils.css:2-4`) the division gives an infinite duration and the shimmer stands still at its first frame. If the e2e test shows an engine that rejects the infinite duration, use `@container style(--ui-motion: 0) { animation: none }` instead.
- Spinner conflict: `spinner.css:2-10` draws a ring on every `[aria-busy="true"]` element. A container that holds skeletons must not also spin, so `spinner.css` adds `:not(:has(.ui-skeleton))` to its `:where()` list. This touches the Spinner page's Under the hood text and its What's new notes.
- Features for `browserSupport`: `has` (the spinner exclusion), `lh`, `light-dark`, `relative-color`. `masks` is a library-wide basic and stays out (section 4.1 of `src/docs/components/AGENTS.md`).
- Forced colors: the fill is a background, which forced colors drops, so the placeholder disappears. Add a block: `background: GrayText; forced-color-adjust: none` with the mask kept, and add `Skeleton` to the "with a block" list in section 9 of `packages/opui/components/AGENTS.md` ("the placeholder is a fill, so it keeps a `GrayText` fill"). `tests/unit/forced-colors.test.ts` checks the list.
- More contrast: no block. The fill already follows `--ui-surface-tonal`, which the contrast knobs tighten.
- Right-to-left: the shimmer runs from the inline start: `background-position` animates from `-100%` to `200%` and is flipped under `:dir(rtl)` (`dir-pseudo` joins `browserSupport`). The short last line is cut from the inline end with a logical mask position.

## Behavior

No script and no custom element. The app sets `aria-busy="true"` on the region while it loads, renders skeletons in it, then replaces them with content and removes `aria-busy`. The docs show this with a Load button in one example (a hand-written client script, listed in `scripts/hand-written-examples.json`).

## Component API

- `Skeleton`, compiled by `pnpm build-components`. One file set in `packages/opui/components/Skeleton/`.

| Prop    | Type                                               | Default     | Renders                                              |
| ------- | -------------------------------------------------- | ----------- | ---------------------------------------------------- |
| `as`    | `"div" \| "span"`                                  | `"span"`    | the root tag                                         |
| `lines` | `number`                                           | `1`         | `style="--_lines: N"` when more than 1               |
| `shape` | `"circle" \| "rounded" \| "squared" \| "squircle"` | `"rounded"` | `.ui-circle`, nothing, `.ui-squared`, `.ui-squircle` |

- `aria-hidden="true"` is always rendered and not a prop. No slots: a skeleton has no content. `class` and `style` pass through, so the caller sets `--_inline-size` and `--_block-size`.
- No `model`.

```astro
---
import { Card, CardHeader, List, ListItem, Skeleton } from "opui-css/astro"
---

<Card aria-busy="true" variant="outlined">
  <CardHeader><h2>Team</h2></CardHeader>
  <List>
    <ListItem>
      <Skeleton shape="circle" slot="start" style="--_inline-size: 2.5rem" />
      <Skeleton lines={2} />
    </ListItem>
  </List>
</Card>
```

## Accessibility

- The placeholders are hidden from assistive technology (`aria-hidden="true"`), so a list of skeletons reads as nothing.
- The region that loads carries `aria-busy="true"`. Screen readers that honor it wait to read the region until it is false.
- When the load ends, the app announces it only if the user asked for it (a search, a Load more button), with a `role="status"` region; the docs say so and show it.
- Keyboard: nothing is focusable. A skeleton never stands in for a control the user could reach, so a Load more button stays a real disabled button (`aria-busy` on the Button already draws the Spinner, `src/component-examples/spinner/Buttons.astro:6-15`).
- What axe can't catch: a region with skeletons but no `aria-busy`, and a skeleton left in the page after the content arrived. The a11y agent checks the examples for both.

Keyboard support table: none (no interactive parts), the page says so in one sentence instead of a table.

## Docs page

`src/docs/components/skeleton.astro`, slug `skeleton`.

- Preamble: "A placeholder in the shape of content that is still loading." Close sibling: Spinner, linked both ways with `<DocLink>`: Spinner when the layout is unknown or the wait is short, Skeleton when the layout is known.
- Usage: when to use (lists, cards, tables and media that load after the page; layouts that would shift), when not to (actions that finish under a second, use a Spinner on the Button; content whose size is unknown; never as decoration).
- Sections, in the order of section 3.3:
  1. Basics: `Basics` (a line, a paragraph of three lines, a circle and a box).
  2. Shapes: `Shapes` (`circle`, `rounded`, `squared`, `squircle`).
  3. Lines: `Lines` (`lines={3}` and a custom `--_last-line-inline-size`).
  4. Composition: `Card` (card with media, title and text), `ListItems` (avatar and two lines per row), `Table` (rows of cells), `Loading` (a Load button that swaps skeletons for content, with `aria-busy`).
- Accessibility slot: the `aria-busy` pattern, the status announcement, no Keyboard table (one sentence instead).
- `heroAnatomy`: no, the component has no parts. Anatomy slot omitted.
- `browserSupport={["dir-pseudo", "has", "lh", "light-dark", "relative-color"]}` (`node scripts/check-browser-support.mjs --write` confirms it).
- See also: Spinner, Progress, Card.

## Blocks and other pages

- `src/blocks/inbox.html` and `src/blocks/user-directory.html`: no change; they show loaded data.
- Add a `Skeleton` section to `src/stress-tests/data-display.html` (a card, a list and a table row in each `[data-size]` row), so themes and contrast get a snapshot.
- `src/docs/components/spinner.astro`: one sentence and a link in the Usage slot.

## Files

- Add `packages/opui/components/Skeleton/` (`Skeleton.astro`, `types.ts`, `types.astro.ts`, then the compiled `Skeleton.react.tsx`, `Skeleton.svelte`, `Skeleton.vue`, `types.react.ts`, `types.svelte.ts`, `types.vue-props.ts`).
- Export from `packages/opui/astro/index.ts`, `packages/opui/react/index.ts`, `packages/opui/svelte/index.ts`, `packages/opui/vue/index.ts` (`Skeleton`, `Props as SkeletonProps`), sorted.
- Add `packages/opui/css/components/skeleton.css`; import it in `packages/opui/css/components.css`.
- Change `packages/opui/css/components/spinner.css` (the `:has(.ui-skeleton)` exclusion).
- Add `src/component-api/skeleton/api.ts` and `src/component-api/custom-properties/skeleton.ts`.
- Add `src/component-examples/skeleton/` (Basics, Card, Lines, ListItems, Loading, Shapes, Table; `pnpm build-examples` writes the other formats; `Loading` needs its client script by hand in each framework, ledgered in `scripts/hand-written-examples.json` with `Ledger-Change: intended`).
- Add `src/docs/components/skeleton.astro`; add Skeleton to `src/components/ComponentShowcase/ComponentShowcase.astro`.
- Add `packages/opui/skills/opui/references/skeleton.md` and a line in `packages/opui/skills/opui/references/index.md`.
- `packages/opui/README.md` component list.
- `packages/opui/CHANGELOG.md` under `## 6.0.0 - Unreleased`, `### Added`: "`Skeleton` draws a placeholder in the shape of content that is loading ...", and a `### Changed` entry for Spinner skipping a container with skeletons.
- `src/utils/whats-new.ts`: `skeleton` notes, `skeleton` in `added` and `highlighted`; a `spinner` note.
- `docs/releases/6.0.0.md` Components checks: a Skeleton line linking `/html/components/skeleton/`.
- `tests/package/package.test.ts`: the new stylesheet in the package file list.
- `packages/opui/components/AGENTS.md` section 9 forced colors list.
- Generated files: `public/search-index/*.json`, parity snapshots in `tests/unit/__snapshots__/`.

## Tests

- Unit: `tests/unit/component-contract.test.ts` (every `shape` and `lines`), `tests/unit/parity.test.ts`, `tests/unit/naming.test.ts` (`shape` values), `tests/unit/example-coverage.test.ts`, `tests/unit/forced-colors.test.ts`, `tests/unit/layers.test.ts`, `tests/unit/changelog.test.ts`, `tests/unit/whats-new.test.ts`.
- A spinner unit or e2e case: a `[aria-busy="true"]` card with a skeleton has no `::before` ring; one without still has it.
- E2E: `tests/e2e/interaction.spec.ts` case: with `reducedMotion: "reduce"` the shimmer's `background-position` doesn't change over 500 ms; without it, it does. Visual snapshots of the examples and the stress test section (CI, `update-snapshots` label). Axe on the fixture page.
- Engines: the infinite-duration trick checked in `firefox` and `webkit`; a failure goes to `tests/e2e/engine-bugs.ts` with a plain-HTML repro, or the style query replaces it.

## Steps

1. Write `skeleton.css` and the spinner exclusion; add the stress test section. Check: `pnpm sort-css:check`, `pnpm check-css-vars`, `node scripts/check-file.mjs packages/opui/css/components/skeleton.css`.
2. Write `Skeleton.astro`, `types.ts`, `types.astro.ts`; run `pnpm build-components`. Check: `pnpm check-components`, `pnpm exec vitest run tests/unit/component-contract.test.ts -t Skeleton`.
3. Write `api.ts` and the custom properties file. Check: `pnpm test` shows no `[component-api]` problem.
4. Write the Astro examples; run `pnpm build-examples`; hand-write the `Loading` ports. Check: `pnpm exec vitest run tests/unit/parity.test.ts -t skeleton`.
5. Write the docs page, the showcase entry, the skill reference and README line. Check: `pnpm check:fast`.
6. CHANGELOG, What's new, release checks, package test, AGENTS.md list. Check: `pnpm exec vitest run tests/unit/changelog.test.ts tests/unit/whats-new.test.ts`.
7. E2E: `pnpm test:e2e --project=light --project=dark -g Skeleton`, then label the PR `update-snapshots` and `e2e-engines`.
8. `pnpm check`, then the `/audit` skill on the diff.

## Open questions

1. Shimmer or pulse? Recommended: shimmer, since a pulse changes the whole page's brightness on a dense table; offer `--_shimmer-bg-color: var(--_bg-color)` to turn it off per theme.
2. Should `lines` take a fixed last-line width or a list of widths? Recommended: one `--_last-line-inline-size`; varied widths look busier than they help.
3. Should the Spinner exclusion be `:has(.ui-skeleton)` anywhere inside, or only `> .ui-skeleton`? Recommended: anywhere inside, since skeletons usually sit inside list items or card parts.
