# Marquee: implementation plan

Status: plan only. This PR carries the plan; the implementation lands on this branch in later commits.

## Summary

`Marquee` scrolls a row of supplementary content in a seamless loop: customer logos, short testimonials, a ticker of integrations. It is CSS only, pauses on hover and focus, has a Pause control, and stops moving entirely under reduced motion, where it becomes a row the user scrolls by hand.

## Why

- Nuxt UI ships `UMarquee` (`nuxtui/package/dist/runtime/components/Marquee.vue`): the default slot rendered `repeat` times (4 by default) in a flex row, `pauseOnHover`, `reverse`, `orientation` (`horizontal`, `vertical`) and `overlay` (gradient fades at both ends, on by default). The animation runs only under `motion-safe:`, with an RTL keyframe of its own (`dist/shared/ui.Ba0YYeuK.mjs:4368-4415`).
  - We take: the loop of duplicated content, the edge fade, `reverse`, `orientation`, pausing on hover, and the RTL direction.
  - We leave: pausing only on hover. Nuxt UI has no pause control, so a keyboard or touch user can't stop it, which fails WCAG 2.2.2 (Pause, Stop, Hide) for anything that moves longer than five seconds. We also leave `repeat` as a number: two copies, each at least as wide as the root, always fill the loop.
  - We change reduced motion: Nuxt UI just stops the animation, which leaves the duplicated content cut off at the edge. We drop the copy and let the row scroll.
- Where the repo needs it: `src/blocks/testimonials.html` and `src/blocks/hero.html` are the natural homes for a logo row; peers ship it for landing pages, which the blocks cover.

## How it differs from Carousel

|                | Marquee                                             | Carousel                                    |
| -------------- | --------------------------------------------------- | ------------------------------------------- |
| Who moves it   | the page, continuously                              | the user, one slide or page at a time       |
| Content        | supplementary, nothing the user must read or act on | each item matters (products, photos, steps) |
| Controls       | Pause                                               | Previous, Next, scroll markers              |
| Snap           | none                                                | scroll snap                                 |
| Reduced motion | a still row the user scrolls                        | unchanged (it never moves on its own)       |

Carousel is `packages/opui/css/components/carousel.css`. The Marquee page sends anything with actions per item to the Carousel, and the Carousel page links back for logo rows.

## Scope

- In: horizontal and vertical marquees, `reverse`, pause on hover and focus, a Pause control, an edge fade, reduced motion as a scrollable row, right-to-left.
- Out: speed in pixels per second (needs a script that measures the content); dragging; a marquee of links the user must reach (the copy is inert, and the docs say interactive items belong in a Carousel or a plain list).

## Markup and CSS

```html
<section aria-label="Teams that build with opui" class="ui-marquee">
  <ul class="ui-track">
    <li><img alt="Northwind" src="/logos/northwind.svg" /></li>
    <li><img alt="Fjord Labs" src="/logos/fjord.svg" /></li>
    <li><img alt="Kestrel" src="/logos/kestrel.svg" /></li>
  </ul>
  <ul aria-hidden="true" class="ui-track" inert>
    <li><img alt="" src="/logos/northwind.svg" /></li>
    <li><img alt="" src="/logos/fjord.svg" /></li>
    <li><img alt="" src="/logos/kestrel.svg" /></li>
  </ul>
  <label class="ui-pause ui-toggle-button ui-small">
    <input type="checkbox" />
    <span class="ui-sr-only">Pause</span>
    <svg aria-hidden="true" viewBox="0 0 24 24">...</svg>
  </label>
</section>
```

- Root `.ui-marquee`: `display: flex`, `overflow: clip`, `gap: var(--_gap)`, `position: relative`, `mask-image` with a linear gradient over `--_fade-size` at both ends (0 turns it off). `section` with an `aria-label`, so the row is one named region.
- `.ui-track` (two of them): `display: flex`, `flex-shrink: 0`, `min-inline-size: 100%`, `justify-content: space-around`, `gap: var(--_gap)`, `animation: ui-marquee var(--_duration) linear infinite`. The keyframes translate by `calc(-100% - var(--_gap))` times `--_direction` (`1`, or `-1` under `:dir(rtl)`), so the second copy takes the first one's place without a jump. The copy is `aria-hidden="true"` and `inert`, so it is never read and its links are never reached.
- `.ui-pause`: a `ToggleButton` placed at the inline end over the fade with `position: absolute; inset-inline-end: 0; inset-block-end: 0`. When checked, `:has(> .ui-pause :checked)` sets `animation-play-state: paused` on both tracks. Hover and focus pause too: `.ui-marquee:is(:hover, :focus-within) > .ui-track`.
- Modifiers:
  - `orientation`: `horizontal` (default), `vertical` (`.ui-vertical`, a column with `block-size: var(--_block-size)` and the fade on the block axis).
  - `reverse` (boolean, `.ui-reverse`): `animation-direction: reverse`.
  - `--_duration` (default `40s`) and `--_gap` (`var(--ui-space-8)`) are inputs set with `style`, since the right speed depends on how long the content is; the `duration` prop writes `--_duration`.
- Reduced motion: under `@container style(--ui-motion: 0)` (true with `prefers-reduced-motion: reduce`, `packages/opui/css/theme.css:623-625`, and in `.ui-motion-off`, `packages/opui/core/utils.css:2-4`) the tracks have `animation: none`, the copy is `display: none`, the root gets `overflow-x: auto` with `scrollbar-width: thin`, the fade is removed, and the Pause control is hidden since nothing moves. The row is fully readable and scrollable by hand.
- Stylesheet `packages/opui/css/components/marquee.css`, layer `components.root`, between `link.css` and `progress.css` (`packages/opui/css/components.css:22-23`). The Pause button is a ToggleButton placed by this file through its own properties, so no `components.extended` rule.
- Inputs in `src/component-api/custom-properties/marquee.ts`: `--_block-size`, `--_direction`, `--_duration`, `--_fade-size`, `--_gap`.
- No new theme token. It reads `--ui-space-*` and `--ui-motion`.
- Features for `browserSupport`: `container-style-queries`, `dir-pseudo`, `has`, `scrollbar-width`.
- Forced colors: no block; nothing carries a state in color, and the mask fade is decoration. List `Marquee` in the "without a block" part of section 9 of `packages/opui/components/AGENTS.md`.
- More contrast: none.
- Right-to-left: the track moves toward the inline start in both directions, via `--_direction` under `:dir(rtl)`, and the pause button sits at the inline end.

## Behavior

No script. Two copies of the content, the second inert, a CSS animation, and a checkbox for Pause. The component renders the default slot twice; HTML authors write the copy themselves, and the docs explain why it needs `aria-hidden` and `inert`.

## Component API

`packages/opui/components/Marquee/`. Rendering a slot twice is the risky part for the compiler: Astro renders the slot once and sets it twice with `set:html`, React renders `children` twice, Svelte `{@render children()}` twice, Vue `<slot />` twice. If `pnpm build-components` refuses the second render, ledger the three ports in `scripts/hand-written-components.json` with the reason and write them with `/port-component Marquee`.

| Prop          | Type                         | Default                         | Renders                    |
| ------------- | ---------------------------- | ------------------------------- | -------------------------- |
| `aria-label`  | `string`                     | required (or `aria-labelledby`) | on the root                |
| `as`          | `"div" \| "section"`         | `"section"`                     | the root tag               |
| `duration`    | `string` (a CSS time)        | `"40s"`                         | `style="--_duration: ..."` |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"`                  | `.ui-vertical`             |
| `pauseLabel`  | `string`                     | `"Pause"`                       | the Pause control's name   |
| `reverse`     | `boolean`                    | `false`                         | `.ui-reverse`              |
| `trackTag`    | `"div" \| "ul"`              | `"ul"`                          | the tag of both tracks     |

- Slots: default (the items; each a `li` when `trackTag` is `ul`), `pause-icon` (replaces the pause icon, next to `pauseLabel`, as the naming rule for a generated control requires).
- `pauseLabel` follows the `<part>Label` rule; the Pause control is always rendered, since WCAG 2.2.2 needs it whenever the content moves.
- No `model`: the Pause state is the checkbox's own.

```astro
---
import { Marquee } from "opui-css/astro"
---

<Marquee aria-label="Teams that build with opui" duration="60s">
  <li><img alt="Northwind" src="/logos/northwind.svg" /></li>
  <li><img alt="Fjord Labs" src="/logos/fjord.svg" /></li>
  <li><img alt="Kestrel" src="/logos/kestrel.svg" /></li>
</Marquee>
```

## Accessibility

- A named region; the items are read once, from the first track, in order. The copy is `aria-hidden` and `inert`.
- WCAG 2.2.2: the Pause control stops all movement, and hover and focus pause it too. Under reduced motion it never moves.
- Content rule: nothing essential. Links in a marquee are reachable only in the first copy, and they move while the user tabs to them (focus pauses the row, so the focused item stays still). The docs recommend no links, or few.
- Images need real `alt` text in the first copy and `alt=""` in the copy.
- What axe can't catch: a missing Pause control in a hand-written HTML marquee, and a copy without `inert`. The a11y agent and an e2e check cover both.

Keyboard support:

| Key   | Action                                                                                  |
| ----- | --------------------------------------------------------------------------------------- |
| Tab   | Moves to the items' links in the first copy, then to Pause; focus inside pauses the row |
| Space | On Pause: pauses or resumes the row                                                     |

## Docs page

`src/docs/components/marquee.astro`, slug `marquee`.

- Preamble: "A row of supplementary content that scrolls in a loop." Sibling: Carousel, linked both ways, with the comparison table at the top of Usage.
- Usage: when to use (logos, short quotes, decorative tickers on landing pages), when not to (anything the user must read, act on or compare; prices; news; more than one per page).
- Sections in the order of section 3.3:
  1. Basics: `Basics` (logos).
  2. Parts and content: `Testimonials` (short quotes in Cards), `CustomPauseIcon`.
  3. Layout: `Vertical`, `Reverse` (two rows in opposite directions), `Speed` (`duration`), `Fade` (`--_fade-size`).
  4. Reduced motion: `ReducedMotion` (a `.ui-motion-off` wrapper, so readers see the scrollable row without changing their OS setting).
- Accessibility slot: the WCAG 2.2.2 note, the copy, the content rule, Keyboard support.
- Anatomy: root, tracks, Pause, with `heroAnatomy`.
- `browserSupport={["container-style-queries", "dir-pseudo", "has", "scrollbar-width"]}`.
- See also: Carousel, ToggleButton.

## Blocks and other pages

- `src/blocks/testimonials.html` or `src/blocks/hero.html`: a logo row under the hero copy, using realistic company names (not real brands' artwork).
- `src/stress-tests/layout.html`: a Marquee section in a narrow and a wide container, for snapshots with `.ui-motion-off` so the snapshot is stable.

## Files

- `packages/opui/components/Marquee/` (`Marquee` in four frameworks, `types.*`), possibly ledgered in `scripts/hand-written-components.json`.
- Barrels: `Marquee`, `Props as MarqueeProps`.
- `packages/opui/css/components/marquee.css`; `packages/opui/css/components.css`.
- `src/component-api/marquee/api.ts`, `src/component-api/custom-properties/marquee.ts`.
- `src/component-examples/marquee/` (Basics, CustomPauseIcon, Fade, ReducedMotion, Reverse, Speed, Testimonials, Vertical).
- `src/docs/components/marquee.astro`; `ComponentShowcase.astro`; a line on `src/docs/components/carousel.astro`.
- `packages/opui/skills/opui/references/marquee.md`, `index.md`; `packages/opui/README.md`.
- `packages/opui/CHANGELOG.md` `### Added`: "`Marquee` scrolls a row of supplementary content in a loop, with a Pause control, and becomes a still, scrollable row under reduced motion."
- `src/utils/whats-new.ts`: notes, `marquee` in `added` and `highlighted`.
- `docs/releases/6.0.0.md` Components checks; `tests/package/package.test.ts`; section 9 of `packages/opui/components/AGENTS.md`; generated files.

## Tests

- Unit: component contract (`orientation`, `reverse`, `duration`, the slot rendered twice with the copy `aria-hidden` and `inert` in every framework), parity, naming (`pauseLabel` next to `pause-icon`), example coverage, `tests/unit/component-whitespace.test.ts` for the two slot renders.
- E2E (`tests/e2e/interaction.spec.ts`):
  - the track's `translate` changes over 500 ms, and stops when Pause is checked, on hover and on focus;
  - with `reducedMotion: "reduce"` the track doesn't move, the copy is `display: none`, the root scrolls and Pause is hidden;
  - in right-to-left the track moves toward the inline start;
  - Tab never lands in the copy.
- Visual snapshots only with `.ui-motion-off` (a moving snapshot would flake). Axe on the fixture page.
- Engines: container style queries on custom properties in `firefox` and `webkit`; where missing, a compat rule in `packages/opui/css/compat/marquee.css` under `@media (prefers-reduced-motion: reduce)` covers the OS setting (`.ui-motion-off` then has no effect there, said in `src/docs/guide/browser-support.astro`), with `tests/e2e/compat.spec.ts` updated.

## Steps

1. `marquee.css`, the stress test section. Check: `pnpm sort-css:check`, `pnpm check-css-vars`.
2. `Marquee.astro`, types; `pnpm build-components`, or ledger and `/port-component Marquee`. Check: `pnpm check-components`, contract test filtered to Marquee.
3. `api.ts`, custom properties. Check: `pnpm test` without `[component-api]` problems.
4. Examples; `pnpm build-examples`. Check: parity filtered to marquee.
5. Docs page, Carousel link, showcase, skill reference, README. Check: `pnpm check:fast`.
6. Block. Check: `pnpm test:e2e --project=light --project=dark -g marquee`.
7. CHANGELOG, What's new, release checks, AGENTS.md, package test. Then `pnpm check`, `/audit`, labels `update-snapshots` and `e2e-engines`.

## Open questions

1. Is a marquee worth shipping at all, given the accessibility cost? Recommended: yes, with the Pause control and the reduced-motion row built in, since teams build it anyway and usually without either.
2. Should the Pause control be optional (`pauseLabel` absent hides it)? Recommended: no. A marquee shorter than five seconds of movement doesn't exist in practice, so the control is always needed.
3. `duration` as a prop, or only the `--_duration` input? Recommended: a prop, because speed is the first thing every user changes and the naming model allows a free string for it.
