# Banner: implementation plan

Status: plan only. This PR carries the plan; the implementation lands on this branch in later commits.

## Summary

`Banner` is a full-width strip at the top of a page or app shell for one site-wide message: a release, planned maintenance, a trial that ends, a cookie notice. It stays in the page flow, can carry a link or an action, and can be dismissed, with the dismissal remembered across visits.

## Why

- Nuxt UI ships `UBanner` (`nuxtui/package/dist/runtime/components/Banner.vue`): `icon`, `title`, `actions`, `to` (the whole strip becomes a link through a stretched `a`), `close` and `closeIcon`, `color`, and an `id` that persists the dismissal in `localStorage`, with an inline prehydration script that hides a dismissed banner before the page paints (`Banner.vue`, script lines 42-81). The theme is a 3rem tall strip with left, center and right regions on an inverted or brand fill (`dist/shared/ui.Ba0YYeuK.mjs:707-740`).
  - We take: the strip, the severity fill, the close button, the remembered dismissal keyed by `id`, and the stretched link for a whole-strip link.
  - We leave: the `title` string and `actions` array (parts compose markup, section 4 of `packages/opui/components/AGENTS.md`), and the inline prehydration script injected into `<head>` (a library of HTML and CSS can't inject one; the docs show the one-line snippet instead, see Open questions).
- Where the repo needs it: no block has a site-wide notice today, while `src/blocks/app-shell.html` and the docs site itself (the 6.0 release) are the natural places. The pieces exist (Callout for the look of a message, Toaster for dismissal through invoker commands, `packages/opui/elements/toaster.js:35-44`), but a strip that spans the page edge to edge and remembers a dismissal does not.

## How it differs from Callout and Toast

|           | Banner                                                        | Callout                                      | Toast                                   |
| --------- | ------------------------------------------------------------- | -------------------------------------------- | --------------------------------------- |
| Scope     | the whole site or app                                         | the section it sits in                       | the action that just happened           |
| Place     | top of the page or shell, in flow, full width                 | inside the content, with the content's width | the top layer, a corner of the viewport |
| Lifetime  | until dismissed or the message ends, remembered across visits | as long as the content                       | a few seconds, or until dismissed       |
| How many  | one at a time                                                 | any                                          | a stack                                 |
| Announced | no (it is there on load)                                      | no                                           | yes (`role="status"`)                   |

The docs page opens its Usage slot with this table, and the Callout and Toast pages link back.

## Scope

- In: `Banner` with `BannerIcon`, `BannerContent` and `BannerActions` parts, a close button with remembered dismissal, a stretched link, the five severities plus the inverse default, and a sticky option.
- Out: several banners in a queue or carousel; a banner at the bottom (cookie consent dialogs belong in a non-modal `Dialog`).

## Markup and CSS

```html
<opui-banner
  aria-label="Announcement"
  class="ui-banner ui-info"
  id="release-6"
  role="region"
>
  <svg aria-hidden="true" class="ui-icon" viewBox="0 0 24 24">...</svg>
  <p class="ui-content">
    opui 6.0 is out, with 14 new components.
    <a class="ui-link" href="/blog/6-0">Read the post</a>
  </p>
  <div class="ui-actions">
    <a class="ui-button ui-small" href="/migrating">Migration guide</a>
  </div>
  <button
    aria-label="Dismiss"
    class="ui-button ui-close ui-round ui-small"
    command="--dismiss"
    commandfor="release-6"
    type="button"
  >
    <svg aria-hidden="true" viewBox="0 0 24 24">...</svg>
  </button>
</opui-banner>
```

- Root: `.ui-banner` on `opui-banner`, the custom element that handles dismissal, the way `opui-copy` and `opui-toaster` are the roots of Copy and Toast (`src/component-examples/copy/Basics.html:1`). The element has no implicit role, so it takes `role="region"` and an `aria-label` the caller passes (the types require it). Without the script the element is an unknown inline element, so the CSS sets `display: flex`; everything except dismissal works without JavaScript.
- Layout: a flex row, `min-block-size: var(--ui-control-size)`, `padding-inline: var(--ui-space-4)`, `gap: var(--ui-space-3)`, `justify-content: center`, wrapping at narrow widths with the close button pinned to the inline end (`margin-inline-start: auto`). The content uses `text-wrap: pretty`.
- Parts, direct children:
  - `.ui-icon`: the severity icon, `--ui-icon-size`, `--_icon-text-color`.
  - `.ui-content`: the message, `--ui-font-size-small`, links underlined in the text color.
  - `.ui-actions`: small buttons, which take the banner's text color as their accent through `--ui-button-accent`.
  - `.ui-close`: the close button, `transparent`, `round`, `small`.
- Fill:
  - Default (no severity): `--ui-surface-inverse` with `--ui-on-inverse` text, the same pair as the Tooltip (`packages/opui/css/components/tooltip.css:4-11`), so it reads as chrome and not as a Callout.
  - `severity` (`critical`, `info`, `neutral`, `success`, `warning`): renders `.ui-<severity>`, a severity scope whose fill is `--ui-palette-strong` and text `--ui-palette-on-strong`, the mark the guide names for a severity fill (section 9, Naming tokens).
  - `variant`: `filled` (default, no class) and `tonal` (`.ui-tonal`, `--ui-palette-tint-subtle` with `--ui-palette-strong` text, the Callout's tonal look but edge to edge with a block-end border).
- Stretched link: when `.ui-content` holds an `a.ui-banner-link`, its `::after` covers the strip (`position: absolute; inset: 0`), as `.ui-card-link` does for cards, and the actions and close button sit above it with `position: relative; z-index: 1`. Hover tints the strip with `oklch(from var(--_bg-color) calc(l + 0.05) c h)`; focus draws `--ui-focus-ring` inside the strip on `:has(> .ui-content .ui-banner-link:focus-visible)`.
- `sticky` (boolean, `.ui-sticky`): `position: sticky; inset-block-start: 0; z-index: 1` for a banner that stays while the page scrolls.
- Dismissed: `[hidden]` hides it; the close animation collapses the block size with `interpolate-size: allow-keywords` and `transition-behavior: allow-discrete` over `--_duration` (`calc(var(--ui-duration) * var(--_motion))`), so reduced motion removes it at once.
- Stylesheet `packages/opui/css/components/banner.css`, layer `components.root`, imported in the Root components group between `avatar.css` and `button.css` (`packages/opui/css/components.css:11-12`). The actions and close buttons are plain `.ui-button`s retinted through custom properties, so no `components.extended` rule is needed.
- Inputs in `src/component-api/custom-properties/banner.ts`: `--_bg-color`, `--_text-color`, `--_icon-text-color`, `--_gap`, `--_padding-inline`, `--_min-block-size`, `--_duration`.
- No new theme token.
- Features for `browserSupport`: `has`, `interpolate-size`, `invoker-commands`, `relative-color`, `text-wrap-pretty`, `transition-behavior`.
- Forced colors: the fill is a background, which is dropped, so the strip loses its edge against the page. Add a block with a `CanvasText` `border-block-end`, and list `Banner` in section 9 of `packages/opui/components/AGENTS.md` ("the strip is a fill, so it gets a `CanvasText` border").
- More contrast: none; the severity roles follow the contrast knobs.
- Right-to-left: logical properties; the close button stays at the inline end.

## Behavior

`packages/opui/elements/banner.js` defines `opui-banner`:

- Listens for the `command` event (capture, like `toaster.js:35-44`) and handles `--dismiss`: sets `hidden`, and when the element has `storage-key` (defaulting to its `id` when `persist` is set), writes `opui-banner:<key> = "dismissed"` to `localStorage`, guarded with `try`/`catch` for private windows.
- On `connectedCallback`, reads the key and sets `hidden`. A module script runs after parsing, so a remembered banner can show for a frame first; the docs give an optional inline snippet for `<head>` that reads the same keys and writes `#<id> { display: none }` into a `<style>` before the first paint (Open question 1).
- Fires a `dismiss` event (cancelable) before hiding, so an app can record it on the server. `react/elements.ts` and `svelte/elements.ts` type `persist`, `storage-key` and `ondismiss`; React's `onDismiss` belongs to the component's own types, as the guide says for `onSort`.
- Escape does nothing: a banner is not a dialog.

## Component API

`packages/opui/components/Banner/`, compiled where it can be: `Banner` renders a custom element root, like Copy, so check whether `scripts/build-components.mjs` compiles it; if it refuses, ledger the files in `scripts/hand-written-components.json` and port with `/port-component Banner`.

| Component       | Props                                                                                                                                                                                                                                                                                                | Slots                       |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| `Banner`        | `aria-label` (required), `closeLabel` (string; renders the close button), `id` (required with `closeLabel`), `persist` (boolean; remembers the dismissal), `severity` (`critical`, `info`, `neutral`, `success`, `warning`), `sticky` (boolean, `.ui-sticky`), `variant` (`filled` default, `tonal`) | default, `close-icon`       |
| `BannerActions` | none                                                                                                                                                                                                                                                                                                 | default                     |
| `BannerContent` | none                                                                                                                                                                                                                                                                                                 | default                     |
| `BannerIcon`    | none (reads `severity` from context)                                                                                                                                                                                                                                                                 | default (replaces the icon) |

- `closeLabel` and the `close-icon` slot follow the naming rule for a generated control (`DialogHeader`, `packages/opui/components/Dialog/DialogHeader.astro:10-27`), and the types warn in development when `id` is missing (`warnMissingCloseTarget`).
- `BannerIcon` reads the severity through context, like `CalloutIcon`, so the folder has the four `context.*` files; the icons come from `packages/opui/components/Callout/icons.ts`.
- `BannerContent` takes the link; the docs show `class="ui-banner-link"` on the `a` that should cover the strip.
- No `model`.

```astro
---
import {
  Banner,
  BannerActions,
  BannerContent,
  BannerIcon,
  Button,
} from "opui-css/astro"
---

<Banner
  aria-label="Announcement"
  closeLabel="Dismiss"
  id="release-6"
  persist
  severity="info"
>
  <BannerIcon />
  <BannerContent>
    opui 6.0 is out, with 14 new components.
    <a class="ui-banner-link ui-link" href="/blog/6-0">Read the post</a>
  </BannerContent>
  <BannerActions>
    <Button href="/migrating" size="small">Migration guide</Button>
  </BannerActions>
</Banner>
```

## Accessibility

- A named `region` landmark, so it can be found and skipped. Never `role="banner"`: that is the page header landmark, and the docs say so because the names collide.
- Not a live region: it is present on load, and announcing it would interrupt the page. A banner inserted later for a live event (maintenance starting) uses a Toast instead, or the app adds `role="status"`.
- Severity is never color alone: `BannerIcon` gives the shape, and the text says the rest.
- Placement: before the page `header` in source order, so it is the first thing a screen reader user meets, and after the skip link.
- Dismissal moves focus to the next focusable element (the element does it, since the button it held disappears) so focus is never lost to `body`.
- The stretched link keeps its own accessible name; the actions and close button stay separately focusable above it.

Keyboard support:

| Key          | Action                                                                                  |
| ------------ | --------------------------------------------------------------------------------------- |
| Tab          | Moves to the link, the actions and the close button in order                            |
| Enter        | Follows the link or activates an action                                                 |
| Enter, Space | On the close button: dismisses the banner and moves focus to the next focusable element |

## Docs page

`src/docs/components/banner.astro`, slug `banner`.

- Preamble: "A full-width strip for one site-wide message." Siblings: Callout and Toast, linked both ways.
- Usage: the comparison table above, then when not to (errors in a form, use a Callout; a confirmation, use a Toast; marketing that repeats on every page).
- Sections in the order of section 3.3:
  1. Basics: `Basics` (inverse default with a link).
  2. Severities: `Severities` (the five); Variants: `Variants` (`filled`, `tonal`).
  3. Parts and content: `Actions`, `StretchedLink`, `CustomIcon`.
  4. Dismissal: `Dismissible` (close button), `Persist` (remembered, with a Reset button that clears the key so the example can be tried again).
  5. Layout: `Sticky`, `InAppShell` (above the app shell header).
- Accessibility slot: landmark, placement, focus after dismissal, the `role="banner"` warning, Keyboard support table.
- Anatomy with `heroAnatomy`.
- `browserSupport={["has", "interpolate-size", "invoker-commands", "relative-color", "text-wrap-pretty", "transition-behavior"]}`.
- See also: Callout, Toast, Layout.

## Blocks and other pages

- `src/blocks/app-shell.html`: a dismissible banner above the header (trial ends in 5 days, Upgrade action).
- Add a `Banner` section to `src/stress-tests/data-display.html` with every severity, and check `src/stress-tests/contrast.html` covers the inverse and severity fills.
- `src/docs/components/callout.astro` and `src/docs/components/toast.astro`: a link to Banner in the preamble.

## Files

- Add `packages/opui/components/Banner/` (`Banner`, `BannerActions`, `BannerContent`, `BannerIcon` in four frameworks, `types.*`, `context.*` files).
- Barrels: `Banner`, `BannerActions`, `BannerContent`, `BannerIcon`, `Props as BannerProps` and the part props.
- `packages/opui/css/components/banner.css`; `packages/opui/css/components.css`.
- `packages/opui/elements/banner.js`, `banner.d.ts`; `packages/opui/react/elements.ts`, `packages/opui/svelte/elements.ts`.
- `src/component-api/banner/api.ts`, `src/component-api/custom-properties/banner.ts`.
- `src/component-examples/banner/` (Actions, Basics, CustomIcon, Dismissible, InAppShell, Persist, Severities, Sticky, StretchedLink, Variants).
- `src/docs/components/banner.astro`; `ComponentShowcase.astro`; `src/docs/guide/concepts.astro` if it lists the custom elements.
- `packages/opui/skills/opui/references/banner.md`, `index.md`; `packages/opui/README.md`.
- `packages/opui/CHANGELOG.md` `### Added`: "`Banner` shows one site-wide message in a full-width strip, with the `opui-banner` element to dismiss it and remember the dismissal."
- `src/utils/whats-new.ts` notes, `banner` in `added` and `highlighted`; notes on `callout` and `toast` only if their pages change visibly (they don't, so none).
- `docs/releases/6.0.0.md` Components checks; `tests/package/package.test.ts` (stylesheet and element).
- Section 9 of `packages/opui/components/AGENTS.md`; generated files.

## Tests

- Unit: component contract (every severity, variant, `sticky`, with and without `closeLabel`); parity; naming (`closeLabel` next to `close-icon`); example coverage; `tests/unit/scripts.test.ts` covers `banner.js` through a `banner` case in `tests/unit/elements.test.ts`: dismiss on `--dismiss`, `localStorage` write and read, the cancelable `dismiss` event, the `try`/`catch` path.
- E2E: `tests/e2e/interaction.spec.ts`: clicking Dismiss hides the banner and focuses the next element; with `persist`, a reload keeps it hidden; reduced motion hides it without a transition. Axe on the fixture page and the app shell block. Visual snapshots (CI).
- Engines: invoker commands and `interpolate-size` in `firefox` and `webkit`; a missing feature gets a compat rule in `packages/opui/css/compat/banner.css` (an instant hide), listed in `src/docs/guide/browser-support.astro` and `tests/e2e/compat.spec.ts`.

## Steps

1. `banner.css` and the stress test section. Check: `pnpm sort-css:check`, `pnpm check-css-vars`.
2. `banner.js` with its unit test. Check: `pnpm exec vitest run tests/unit/elements.test.ts -t banner`.
3. Astro parts, types, context; `pnpm build-components` (or ledger and port). Check: `pnpm check-components`, contract test filtered to Banner.
4. `api.ts`, custom properties. Check: `pnpm test` with no `[component-api]` problem.
5. Examples; `pnpm build-examples`. Check: parity test filtered to banner.
6. Docs page, sibling links, showcase, skill reference, README. Check: `pnpm check:fast`.
7. App shell block. Check: `pnpm test:e2e --project=light --project=dark -g "banner|app-shell"`.
8. CHANGELOG, What's new, release checks, AGENTS.md, package test. Then `pnpm check`, `/audit`, labels `update-snapshots` and `e2e-engines`.

## Open questions

1. How does a remembered banner avoid showing for one frame before the module runs? Recommended: document an optional inline snippet for `<head>` that reads the keys and writes a `<style>` with `#<id> { display: none }`, and keep the element's own check as the fallback. Nuxt UI injects the same kind of script; we document it rather than inject it.
2. Should the default (no severity) fill be inverse or the brand color? Recommended: inverse, the Tooltip pair, which reads as chrome in every theme; `color="primary"` can come later through the naming model's `color` prop if asked for.
3. Should `persist` be its own prop or always on with `id`? Recommended: its own prop, since a banner with an `id` for `commandfor` should not remember a dismissal unless asked.
