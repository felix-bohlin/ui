# ScrollArea: implementation plan

Status: plan only. This PR carries the plan; the implementation lands on this branch in later commits.

## Summary

A `ScrollArea` is a box that scrolls on one axis and fades its edges where more content is hidden, so readers can see that it scrolls. The fade is pure CSS: a scroll-driven animation on the scroller itself drives a mask, so it needs no script, no wrapper and no surface color.

## Why

- Nuxt UI (`@nuxt/ui` 4.12.0) has `UScrollArea` with `orientation`, `shadow` (`boolean | { size }`) and virtualization through TanStack Virtual (`items`, `virtualize`, `estimateSize`, `lanes`), and a `useScrollShadow` composable (`dist/runtime/composables/useScrollShadow.js:1-37`). The composable listens to scroll with VueUse's `useScroll`, compares `scrollHeight` with `clientHeight`, and sets an inline `mask-image: linear-gradient(...)` that fades the start, the end or both by 24px.
  - We take: the mask fade (it works on any background, tinted or image, which a shadow drawn in the surface color doesn't), the size knob, `orientation`.
  - We leave: the script (CSS can now do the same from the scroll position), virtualization (a data grid concern, `TODO.md:1457` keeps it out of scope for tables too), custom scrollbars.
- The repo already scrolls in many places, each on its own:
  - Dialog and Drawer content draws scroll shadows with two `scroll-state` queries and anchored pseudo-elements (`packages/opui/css/components/card.css:373-418`).
  - Table has `.ui-overflow-scroll` (`packages/opui/css/components/table.css:152-165`) with no edge hint, and a sticky header shadow from `scroll-state(stuck: block-start)` (`:167-187`).
  - Tabs scroll their list (`packages/opui/css/components/tabs.css:215-220`), and the `overflow` value `scroll` exists on ButtonGroup, Tabs and ToggleGroup (`TODO.md:842`), all without a hint that more is hidden.
    A `ScrollArea` gives these one documented way, and its fade can later be reused by the `overflow="scroll"` modifiers.

## Scope

- In: `.ui-scroll-area` on any element, block (default) or inline orientation, the edge fade from a scroll-driven animation, a fade size property, `ScrollArea` in Astro, React, Svelte and Vue, the docs page, one block moved onto it.
- Out:
  - Virtualization.
  - Custom scrollbar tracks and thumbs (the platform `scrollbar-width: thin` and `scrollbar-color` are enough; restyling scrollbars is a theme concern).
  - Retrofitting the fade into Table, Tabs, ButtonGroup and ToggleGroup `overflow="scroll"`. Each is a follow-up PR once the mixin proves itself; listed as a TODO.md suggestion.
  - Replacing the Dialog and Drawer shadows. They sit under a header and above a footer, where a shadow reads as elevation; a fade is the right hint inside a plain box. Both stay.

## Markup and CSS

```html
<div
  class="ui-scroll-area"
  tabindex="0"
  role="region"
  aria-label="Recent activity"
>
  <ul class="ui-list">
    ...
  </ul>
</div>

<div
  class="ui-scroll-area ui-horizontal"
  tabindex="0"
  role="region"
  aria-label="Tags"
>
  <div class="ui-layout-row">...chips...</div>
</div>
```

- Stylesheet: `packages/opui/css/components/scroll-area.css`, `@layer components.root`, in the Root components group of `css/components.css` between `rating.css` and `select-all.css`.
- The fade, on the scroller itself:

```css
@property --_fade-start {
  syntax: "<length>";
  inherits: false;
  initial-value: 0px;
}

@property --_fade-end {
  syntax: "<length>";
  inherits: false;
  initial-value: 0px;
}

@layer components.root {
  :where(.ui-scroll-area) {
    --_fade-size: var(--ui-space-6);
    --_axis: block;

    animation:
      ui-scroll-area-fade-start linear both,
      ui-scroll-area-fade-end linear both;
    animation-range:
      0 var(--_fade-size),
      calc(100% - var(--_fade-size)) 100%;
    animation-timeline: scroll(self block), scroll(self block);
    mask-image: linear-gradient(
      to bottom,
      transparent,
      oklch(0% 0 0) var(--_fade-start),
      oklch(0% 0 0) calc(100% - var(--_fade-end)),
      transparent
    );
    overflow-block: auto;
    overscroll-behavior-block: contain;
    scrollbar-width: thin;

    &:focus-visible {
      outline-offset: var(--ui-focus-ring-inset);
    }

    &.ui-horizontal {
      animation-timeline: scroll(self inline), scroll(self inline);
      mask-image: linear-gradient(
        to right,
        transparent,
        oklch(0% 0 0) var(--_fade-start),
        oklch(0% 0 0) calc(100% - var(--_fade-end)),
        transparent
      );
      overflow-block: visible;
      overflow-inline: auto;
      overscroll-behavior-inline: contain;
    }
  }

  @keyframes ui-scroll-area-fade-start {
    from {
      --_fade-start: 0px;
    }
    to {
      --_fade-start: var(--_fade-size);
    }
  }

  @keyframes ui-scroll-area-fade-end {
    from {
      --_fade-end: var(--_fade-size);
    }
    to {
      --_fade-end: 0px;
    }
  }
}
```

How it works: a `scroll()` timeline is inactive when the element can't scroll, so neither animation applies and both fades stay at their `initial-value` of `0px`, a mask that hides nothing. While it scrolls, the start fade grows over the first `--_fade-size` of travel and the end fade shrinks over the last, so each edge fades only while there is content beyond it. The opaque stop is `oklch(0% 0 0)`, as the masks in `packages/opui/css/components/stepper.css:141` write it, since `pnpm check-colors` rejects other color syntax.

- Right-to-left: `to right` in the inline gradient has to follow the writing direction. Use `to right` by default and `to left` under `&:dir(rtl)`, since gradients have no logical direction keyword yet. A `scroll(self inline)` timeline already measures progress from the inline start, so the start fade stays on the correct side.
- Vertical writing modes: out of scope; note it in the docs.
- Modifiers:
  - `orientation`: `vertical` (default, no class), `horizontal` (`.ui-horizontal`). `auto` (both axes) is left out: a mask can fade one axis cleanly, two axes need a second mask layer and `mask-composite: intersect`; add it if a block needs it.
- Tokens: none new. `--_fade-size` is the documented input (`src/component-api/custom-properties/scroll-area.ts`), defaulting to `--ui-space-6`.
- Features for `browserSupport`: `registered-custom-properties`, `scroll-driven-animations`. `masks` is a library-wide basic and not listed (`src/docs/components/AGENTS.md` 4.1).
- Feature first: scroll-driven animations ship in Chromium and Safari 26; Firefox has them behind a flag. Without them `animation-timeline` is ignored, the animations would run once on the document timeline with zero duration, and `both` fill would keep their end keyframes, fading the start edge of a box that sits at its start. Guard the animation declarations in `@supports (animation-timeline: scroll())`, so engines without the feature get a plain scroller and no fade. That `@supports` turns a feature on with the browser default as the fallback, which the browser support rules allow in the component CSS, so no compat file.
- Why not `scroll-state()` queries, as Dialog does: a container query styles descendants of the container, so the fade or shadow can't be on the scroller itself; Dialog works around that with anchored pseudo-elements on `.ui-content` inside a positioned root (`card.css:373-405`). A standalone ScrollArea has no root around it to anchor to without a wrapper element, and `scroll-state` ships in Chromium only (`container-scroll-state-queries`), while scroll-driven animations also ship in Safari.
- Forced colors: no block. A mask is not a color, and forced colors leave masks in place, so the fade still shows. Add `ScrollArea` to the "without a block" list in `packages/opui/components/AGENTS.md` as "a mask over the content, which forced colors keep".
- More contrast: the fade dims text near the edge. Under `@container style(--ui-contrast: more)` set `--_fade-size: var(--ui-space-3)`, a shape change the guide allows, so less text sits under the fade.
- Motion: the fade follows the scroll position, it is not an animation over time, so `prefers-reduced-motion` does not apply.

## Behavior

No script, no custom element. The browser scrolls; the timeline reads the scroll position.

## Component API

`ScrollArea`, compiled by `pnpm build-components`. A polymorphic root (`as`), since a scroll area is often a `ul`, `ol` or `section`.

| Prop          | Type                         | Default      | Renders          |
| ------------- | ---------------------------- | ------------ | ---------------- |
| `as`          | `string`                     | `"div"`      | the root element |
| `orientation` | `"horizontal" \| "vertical"` | `"vertical"` | `.ui-horizontal` |

- Slots: `default`.
- `tabindex="0"`: a scroller with no focusable content can't be scrolled by keyboard in every engine (Chromium 130 and later makes such scrollers focusable on its own; Safari and Firefox don't). The component sets `tabindex="0"` by default and the caller can pass `tabindex="-1"` when the content has its own focusable items. A focusable scroller needs a name, so the types require `aria-label` or `aria-labelledby` and the component renders `role="region"` when the caller passes neither `role` nor `as="ul"`/`"ol"` (open question 2).
- `model`: none.

```astro
---
import { List, ListItem, ScrollArea } from "opui-css/astro"
---

<ScrollArea aria-label="Recent activity" style="max-block-size: 20rem">
  <List>
    <ListItem label="Ada Lovelace commented on Q3 roadmap" />
    ...
  </List>
</ScrollArea>
```

## Accessibility

- A named, focusable region, so keyboard and screen reader users can find and scroll it (axe's `scrollable-region-focusable` rule).
- The fade hides nothing from assistive technology; it is visual only.

| Key                        | Action                               |
| -------------------------- | ------------------------------------ |
| `Tab`                      | Moves focus to the scroll area.      |
| `ArrowDown` / `ArrowUp`    | Scrolls the vertical area by a line. |
| `ArrowRight` / `ArrowLeft` | Scrolls the horizontal area.         |
| `PageDown` / `PageUp`      | Scrolls by a page.                   |
| `Home` / `End`             | Scrolls to the start or the end.     |

- What axe can't catch: that text under the fade is still readable once scrolled to (the fade must end at the scroll limits, which the animation range guarantees; check at the last pixel), that the focus ring shows inside the clipped box (`outline-offset: var(--ui-focus-ring-inset)`, as Dialog content does), that text in a narrow area isn't hidden behind both fades at once.

## Docs page

`src/docs/components/scroll-area.astro`, `slug="scroll-area"`.

- Preamble: "A box that scrolls, with faded edges where more content is hidden." See also: Carousel (snaps and buttons for slides), Table (`overflow="scroll"`), Dialog (scroll shadows in its content).
- Usage: when to use (a side list in a fixed-height panel, a row of chips or filters, a log, a long list inside a card); when not to use (the page itself, which the browser scrolls; slides or galleries, use Carousel; a wide table, use Table's `overflow`).
- Sections:
  1. Basics (`Basics`): a list of activity items in a 20rem box.
  2. Orientation (`Horizontal`): a row of filter chips.
  3. Fade size (`FadeSize`): `--_fade-size` set to `--ui-space-3` and `--ui-space-8` (the largest step in `theme.css`).
  4. In a card (`InCard`): a ScrollArea inside `CardContent`, on a tonal card, to show the mask works on a tinted surface where a shadow wouldn't.
  5. Under the hood: the scroll-driven animation, the `@property` registrations, why it is a mask and not a shadow.
  6. Accessibility slot: the focusable region, its name, the keyboard table.
- `browserSupport={["registered-custom-properties", "scroll-driven-animations"]}` (`dir-pseudo` too with the RTL rule).

## Blocks and other pages

- No block has a fixed-height scroller today (no `overflow` scroller in `src/blocks/*.html`), so none moves. The chat block's message list is the natural first user once it gets a fixed height; leave that to a later block change.
- `src/stress-tests/layout.html`: a section with a vertical and a horizontal ScrollArea in light, dark and on a tonal surface, so `themes.spec.ts` snapshots it in every theme.

## Files

- `packages/opui/components/ScrollArea/`: `ScrollArea.astro`, `types.ts`, `types.astro.ts`, compiled `ScrollArea.react.tsx`, `ScrollArea.svelte`, `ScrollArea.vue`, `types.react.ts`, `types.svelte.ts`, `types.vue-props.ts`.
- Barrels: `packages/opui/astro/index.ts`, `react/index.ts`, `svelte/index.ts`, `vue/index.ts`.
- `packages/opui/css/components.css`, `packages/opui/css/components/scroll-area.css`.
- `src/component-api/scroll-area/api.ts`, `src/component-api/custom-properties/scroll-area.ts`.
- `src/component-examples/scroll-area/` (`Basics`, `FadeSize`, `Horizontal`, `InCard`, five formats each).
- `src/docs/components/scroll-area.astro`, `src/components/ComponentShowcase/ComponentShowcase.astro`.
- `packages/opui/skills/opui/references/scroll-area.md`, `references/index.md`, `packages/opui/README.md`.
- `packages/opui/CHANGELOG.md`, `### Added`: "`ScrollArea` scrolls on one axis and fades its edges while more content is hidden, with a scroll-driven animation and a mask (`.ui-scroll-area`, `.ui-horizontal`, `--_fade-size`)."
- `src/utils/whats-new.ts`: a `scroll-area` entry linking `#basics`, the slug in `added` and `highlighted`.
- `docs/releases/6.0.0.md`: a Components check linking `/html/components/scroll-area/` (fade only while scrollable, RTL horizontal fade, keyboard scrolling in Safari).
- `tests/package/package.test.ts`.
- `packages/opui/components/AGENTS.md`: ScrollArea in the forced colors "without a block" list.
- `src/stress-tests/layout.html`.
- `TODO.md`: a Suggestions item to reuse the fade for `overflow="scroll"` in Table, Tabs, ButtonGroup and ToggleGroup (`node scripts/todo.mjs add`).
- Generated: search index, parity snapshots, generated files.

## Tests

- Unit: `component-contract.test.ts`, `parity.test.ts`, `naming.test.ts` (`orientation` with its values), `example-coverage.test.ts`, `layers.test.ts`, `forced-colors.test.ts`, `css-properties.test.ts` (`--_fade-size`, `--_fade-start`, `--_fade-end` follow the suffix rules; `-size` is right for an extent), `changelog.test.ts`, `whats-new.test.ts`.
- E2E, new `tests/e2e/scroll-area.spec.ts` or cases in `interaction.spec.ts`:
  - A box that doesn't overflow has `--_fade-start` and `--_fade-end` at `0px` (`getComputedStyle`).
  - At the top, `--_fade-start` is `0px` and `--_fade-end` is the fade size; at the bottom, the reverse; in the middle, both.
  - Keyboard: focus the area, press `PageDown`, `scrollTop` grows.
  - In an engine without scroll-driven animations (Firefox today), no mask applies: `failsIn()` is not needed, since the `@supports` makes that the expected result; assert it per engine.
- Visual baselines from CI.

## Steps

1. Write `scroll-area.css` with the `@supports` guard, add it to `components.css`, and try it on a scratch page in Chromium, WebKit and Firefox. Check: `pnpm sort-css:check`, `pnpm check-css-vars`, `pnpm check-colors`.
2. Write the e2e spec for the fade values before the component, so the CSS has a test. Check: `pnpm test:e2e --project=light -g "scroll area"`.
3. `ScrollArea.astro`, `types.ts`, `types.astro.ts`, `pnpm build-components`. Check: `pnpm check-ports`, `component-contract.test.ts -t ScrollArea`.
4. `api.ts`, custom properties, examples, `pnpm build-examples`. Check: `pnpm check-examples`, `parity.test.ts -t scroll-area`.
5. Docs page, stress page, barrels, README, skill reference, CHANGELOG, What's new, release check, guide list, TODO.md. Check: `pnpm check:fast`, `node scripts/check-browser-support.mjs`.
6. `pnpm check`, push, `update-snapshots`.

## Open questions

1. Mask fade or shadow? Recommended: mask fade. It works on any surface, needs no wrapper and no surface color, and matches what Nuxt UI does with a script. Dialog and Drawer keep their shadows.
2. Should the component add `role="region"` and `tabindex="0"` by default? Recommended: yes for `tabindex`, and `role="region"` only on a `div` or `section`, since a `ul` keeps its list role. The types require a name either way.
3. Offer `orientation="auto"` (both axes) now? Recommended: no, until a block needs it.
4. Should `Table`, `Tabs`, `ButtonGroup` and `ToggleGroup` with `overflow="scroll"` get the fade in this PR? Recommended: no, one follow-up per component, each with its own baselines.
