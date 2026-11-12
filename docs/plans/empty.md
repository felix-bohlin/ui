# Empty: implementation plan

Status: plan only. This PR carries the plan; the implementation lands on this branch in later commits.

## Summary

`Empty` is the empty state of a page, panel, list or search: a media tile, a heading with one line of explanation, the actions that fill the space, and an optional footer link. Today each block rebuilds it from a Card, an Avatar, an `hgroup` and a layout row with block CSS; `Empty` makes it one container with parts.

## Why

- Nuxt UI ships `UEmpty` (`nuxtui/package/dist/runtime/components/Empty.vue`, props in `Empty.vue.d.ts`): `icon` or `avatar`, `title`, `description`, `actions: ButtonProps[]`, `loading`, `variant` (`solid`, `outline`, `soft`, `subtle`, `naked`), `size` (`xs` to `xl`), and the slots `header`, `leading`, `title`, `description`, `body`, `actions`, `footer`. The theme centers everything in a `max-w-sm` column (`dist/shared/ui.Ba0YYeuK.mjs:3014-3024`).
  - We take: the regions (media, header, actions, footer), centered with a readable measure, and the sizes.
  - We leave: `actions` as an array of button props and `title`/`description` strings. In opui a container composes parts (section 4 of `packages/opui/components/AGENTS.md`), so the heading level and the buttons are the caller's own markup. We leave `loading` too: a loading empty state is a `Skeleton` or a Spinner, not a mode of this component.
- Where the repo needs it:
  - `src/blocks/empty-states.html:8-24` centers `.ui-card > .ui-content`, caps the `hgroup` at `32ch` and sizes the search field, and four cards repeat the same media, `hgroup`, action row structure (`src/blocks/empty-states.html:40-101`, `103-146`, `148-176`, `178-225`).
  - `src/blocks/notifications.html:24-26` and `325-341` build a smaller one in a tab panel with `.ui-layout-column` and a block class for the padding.

## Scope

- In: `Empty` with `EmptyMedia`, `EmptyHeader`, `EmptyActions` and `EmptyFooter` parts, three sizes, three surface variants, a docs page, and the two blocks moved onto it.
- Out: illustrations (the docs show an `img` in `EmptyMedia`, the library ships none); an empty row inside a `Table` (the Table page gets an example of `Empty` in a full-width `td` instead of a new part).

## Markup and CSS

```html
<div class="ui-empty">
  <span aria-hidden="true" class="ui-media">
    <svg aria-hidden="true" viewBox="0 0 24 24">...</svg>
  </span>
  <hgroup class="ui-header">
    <h2>Create your first project</h2>
    <p>Projects keep tasks, files and people in one place.</p>
  </hgroup>
  <div class="ui-actions">
    <button class="ui-button ui-filled" type="button">New project</button>
    <button class="ui-button ui-outlined" type="button">Import CSV</button>
  </div>
  <p class="ui-footer">
    New here? <a class="ui-link" href="/tour">Take the 2-minute tour</a>
  </p>
</div>
```

- Root `.ui-empty` on a `div` (or `section` with `aria-labelledby` when it is a region of its own). A grid with `justify-items: center`, `text-align: center`, `gap: var(--_gap)`, `padding-block: var(--_padding-block)`, and `max-inline-size: var(--_max-inline-size)` (`40ch`) on the header and footer so the text keeps a readable measure.
- Parts, each a direct child, reached with `> .ui-media` and friends:
  - `.ui-media`: a tile of `--_media-size` with `--ui-surface-tonal`, `border-radius: var(--ui-radius-round)` and `corner-shape: squircle` (the Avatar squircle, `packages/opui/css/components/avatar.css:80-83`) when it holds a lone `svg` (`:has(> svg:only-child)`); with an `img`, an `.ui-avatar` or an `.ui-avatar-group` it draws no tile and only sizes the content.
  - `.ui-header`: an `hgroup`, so the heading and the line under it read as one, styled by the `hgroup` rules in `packages/opui/css/components/typography.css:54-75`. The heading takes `--_title-font-size`.
  - `.ui-actions`: a wrapping row of buttons, centered. Takes `align` (`start`, `center` default, `end`) like `CardActions`, rendered `.ui-align-start` and `.ui-align-end`.
  - `.ui-footer`: secondary text and links in `--ui-font-size-small` and `--ui-text-subtle`.
- Stylesheet `packages/opui/css/components/empty.css`, layer `components.root`, imported in the Root components group of `packages/opui/css/components.css` between `drawer.css` and `link.css` (`packages/opui/css/components.css:21-22`).
- Modifiers:
  - `variant`: `plain` (default, no class: no surface, so it sits in a Card, tab panel or table cell), `outlined` (`.ui-outlined`, a dashed `--ui-border-color` border and `--ui-radius`, the drop-zone look peers use for "nothing here yet"), `tonal` (`.ui-tonal`, `--ui-surface-tonal`).
  - `size`: `small` (`.ui-small`, for a panel or a menu), `medium` (default), `large` (`.ui-large`, a full page). Sets `--_media-size` from `--ui-control-size-*`, `--_title-font-size` from the type scale and `--_gap`, `--_padding-block` from `--ui-space-*`.
- Roles: `--ui-surface-tonal`, `--ui-border-color`, `--ui-text-strong`, `--ui-text-subtle`, `--ui-radius`, `--ui-space-*`, `--ui-font-size-*`. No new theme token.
- Features for `browserSupport`: `corner-shape` (the squircle tile, a circle where it is missing, which costs nothing), `has` (the media tile), `text-wrap-pretty` (the header text).
- Forced colors: no block. The tonal media tile and the `tonal` variant are fills, but the content (icon, heading, text, buttons) stays readable without them and they mark no state. Add `Empty` to the "without a block" list in section 9 of `packages/opui/components/AGENTS.md`: "layout and text, the media tile and the tonal surface are decoration".
- More contrast: none. Motion: none, nothing moves.
- Right-to-left: centered layout and logical properties only; `.ui-align-start` follows the writing direction.

## Behavior

No script. The page decides when to show it. For a search with no results, the region that updates is the live region (the docs show `role="status"` on the result container, not on `Empty`, so it doesn't speak when the page first renders).

## Component API

Parts compiled by `pnpm build-components`, in `packages/opui/components/Empty/`:

| Component      | Element                                   | Props                                                                         | Slots   |
| -------------- | ----------------------------------------- | ----------------------------------------------------------------------------- | ------- |
| `Empty`        | `div.ui-empty`                            | `size` (`small`, `medium`, `large`), `variant` (`outlined`, `plain`, `tonal`) | default |
| `EmptyActions` | `div.ui-actions`                          | `align` (`start`, `center`, `end`; default `center`)                          | default |
| `EmptyFooter`  | `p.ui-footer`                             | none                                                                          | default |
| `EmptyHeader`  | `hgroup.ui-header`                        | none                                                                          | default |
| `EmptyMedia`   | `span.ui-media` with `aria-hidden="true"` | none                                                                          | default |

- Defaults: `size="medium"` and `variant="plain"` add no class, as the naming model requires; `align="center"` is the part's default (one default per part, `tests/unit/align.test.ts`).
- The root renders its children as they are (section 4). No context, so no `context.*` files.
- `EmptyMedia` is `aria-hidden`, since the heading carries the meaning. A caller with a meaningful image puts it in `EmptyHeader` instead.
- No `model`.

```astro
---
import {
  Button,
  Empty,
  EmptyActions,
  EmptyFooter,
  EmptyHeader,
  EmptyMedia,
} from "opui-css/astro"
---

<Empty variant="outlined">
  <EmptyMedia><svg>...</svg></EmptyMedia>
  <EmptyHeader>
    <h2>Create your first project</h2>
    <p>Projects keep tasks, files and people in one place.</p>
  </EmptyHeader>
  <EmptyActions>
    <Button variant="filled">New project</Button>
    <Button variant="outlined">Import CSV</Button>
  </EmptyActions>
  <EmptyFooter
    >New here? <a class="ui-link" href="/tour">Take the tour</a></EmptyFooter
  >
</Empty>
```

## Accessibility

- The heading is a real heading at the level the page needs; the component never picks one.
- `hgroup` keeps the subtitle tied to the heading.
- The media is decorative and hidden.
- No-results states: the container whose content changes is `role="status"` (or `aria-live="polite"`), so the heading of the empty state is read once when it appears.
- Keyboard: no keys of its own. Focus order follows the actions and the footer link. After a "Clear search" action the app moves focus to the search field; the No results example does so.
- What axe can't catch: an empty state with only an icon and no heading, and actions that say "Click here". The a11y agent checks the examples for both.

Keyboard support table: none of its own, one sentence instead.

## Docs page

`src/docs/components/empty.astro`, slug `empty`.

- Preamble: "The empty state of a page, list or search: why there is nothing to show, and what to do next." Siblings linked both ways: Callout (a message about content that is there), Skeleton (content that is on its way).
- Usage: when to use (first run, no results, cleared inbox, missing permission), when not to (an error the user must fix, use a Callout; loading, use a Skeleton).
- Sections in the order of section 3.3:
  1. Basics: `Basics`.
  2. Variants: `Variants` (`plain` in a Card, `outlined`, `tonal`).
  3. Sizes: `Sizes`.
  4. Parts and content: `Media` (icon tile, avatar group, `img` illustration), `Actions` (`align`), `Footer`.
  5. Composition: `NoResults` (search field, suggestion chips, Clear search, with `role="status"` on the results region), `InCard`, `InTable` (an `Empty` in a `td colspan`), `InTabs`.
- Anatomy with `heroAnatomy` (media, header, actions, footer), drawn from the `parts` in `api.ts`.
- `browserSupport={["corner-shape", "has", "text-wrap-pretty"]}`.
- See also: Card, Callout, Skeleton.

## Blocks and other pages

- `src/blocks/empty-states.html`: the four cards become `ui-card ui-outlined` with an `.ui-empty` inside `.ui-content`, and the block CSS at lines 8-21 goes away; only the search field width stays.
- `src/blocks/notifications.html`: the Archived panel (`325-341`) becomes `<div class="ui-empty ui-small">` with a media tile and a heading; `.notifications-empty` (`24-26`) goes away.
- Add an `Empty` section to `src/stress-tests/data-display.html` with each size per `[data-size]` row.

## Files

- Add `packages/opui/components/Empty/` (`Empty`, `EmptyActions`, `EmptyFooter`, `EmptyHeader`, `EmptyMedia` in four frameworks; `types.ts`, `types.astro.ts`, compiled `types.react.ts`, `types.svelte.ts`, `types.vue-props.ts`).
- Export from the four barrels: `Empty`, `EmptyActions`, `EmptyFooter`, `EmptyHeader`, `EmptyMedia`, `Props as EmptyProps`, `EmptyActionsProps`, `EmptyFooterProps`, `EmptyHeaderProps`, `EmptyMediaProps`.
- Add `packages/opui/css/components/empty.css`; import it in `packages/opui/css/components.css`.
- Add `src/component-api/empty/api.ts` (parts for the four regions) and `src/component-api/custom-properties/empty.ts`; one `api.ts` each for the parts that take props (`empty-actions`), following `card-actions`.
- Add `src/component-examples/empty/` (Actions, Basics, Footer, InCard, InTable, InTabs, Media, NoResults, Sizes, Variants).
- Add `src/docs/components/empty.astro`; add Empty to `src/components/ComponentShowcase/ComponentShowcase.astro`.
- `packages/opui/skills/opui/references/empty.md` and `index.md`; `packages/opui/README.md`.
- `packages/opui/CHANGELOG.md` `### Added`: "`Empty` shows the empty state of a page, list or search ...".
- `src/utils/whats-new.ts`: notes, `empty` in `added` and `highlighted`.
- `docs/releases/6.0.0.md` Components checks: an Empty line.
- `tests/package/package.test.ts`; section 9 of `packages/opui/components/AGENTS.md`.
- Blocks above; generated `public/search-index/*.json` and snapshots.

## Tests

- Unit: component contract over `size`, `variant` and `align`; parity of every example; naming; `tests/unit/align.test.ts`; example coverage; example copy (realistic copy, as in the block); forced colors list; layers.
- E2E: axe on the fixture page and the blocks; visual snapshots of the examples, the two blocks and the stress section (CI); `tests/e2e/blocks` layout checks at 320px (the actions wrap).
- `tests/unit/screenshots.test.ts`: the block baselines change, regenerated by the `update-snapshots` label.

## Steps

1. `empty.css`, the stress test section. Check: `pnpm sort-css:check`, `pnpm check-css-vars`.
2. The five Astro parts and types; `pnpm build-components`. Check: `pnpm check-components`, `pnpm exec vitest run tests/unit/component-contract.test.ts -t Empty`.
3. `api.ts` files and custom properties. Check: `pnpm test` without `[component-api]` problems.
4. Examples; `pnpm build-examples`. Check: `pnpm exec vitest run tests/unit/parity.test.ts -t empty`.
5. Docs page, showcase, skill reference, README. Check: `pnpm check:fast`.
6. Move the two blocks. Check: `pnpm test:e2e --project=light --project=dark -g "empty|notifications"`.
7. CHANGELOG, What's new, release checks, AGENTS.md. Check: changelog and whats-new tests.
8. `pnpm check`, `/audit`, then the `update-snapshots` label.

## Open questions

1. Should `outlined` be dashed? Recommended: yes. A solid outline looks like a Card, and the dashed edge is the one cue peers share for "nothing here yet". If the maintainer prefers the naming model's plain meaning of `outlined`, add a `dashed` boolean instead.
2. Should `EmptyHeader` render the heading from a `label` prop? Recommended: no, the heading level depends on the page, and parts keep markup in the caller's hands like `CardHeader`.
3. Is `Empty` the name, or `EmptyState`? Recommended: `Empty`, matching Nuxt UI and shadcn/ui, and short in class names (`.ui-empty`).
