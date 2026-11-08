# Breadcrumb: implementation plan

Status: plan only. This PR carries the plan; the implementation lands on this branch in later commits.

## Summary

A `Breadcrumb` shows where the current page sits in a hierarchy, as a `nav` with an ordered list of links that ends in the current page. It is CSS only: the separators are drawn by the stylesheet and skipped by screen readers, and nothing needs a script.

## Why

- Nuxt UI (`@nuxt/ui` 4.12.0, `UBreadcrumb`) renders a `nav` with an `ol`, takes `items` (`label`, `icon`, `avatar`, `to`, `slot`, `class`), a `separatorIcon` (a chevron by default), a `color` for the active item and `labelKey`, and offers `item`, `item-leading`, `item-label`, `item-trailing` and `separator` slots. Its separators are extra `li` elements with `role="presentation"` between the items (`dist/runtime/components/Breadcrumb.vue`).
  - We take: the `items` shorthand, a replaceable separator, the last item as the current page.
  - We leave: separator list items (they change the list's item count for screen readers; a CSS `::before` with empty alt text doesn't), `color` on the active item (the current page is plain strong text, not a paint), `labelKey`, avatars.
- The repo already needs it:
  - `src/blocks/file-manager.html:5-13` styles `.files-breadcrumb ol` and draws `li + li::before { content: "/" }`, and `:55-61` is the markup.
  - `src/blocks/product-detail.html:3-6` styles `.pd-breadcrumb` the same way with another gap, and `:60-67` is the markup.
  - `TODO.md:1380-1383` (open, priority 1) asks for exactly this: `.ui-breadcrumb` on a `nav`, an `ol` of links, `aria-current="page"` on the last item, a separator in `li + li::before` with `content: "/" / ""`, a `--_separator` property and a component in all five formats.
  - `TODO.md:2499-2505` lists Breadcrumb among the components the blocks point to.

## Scope

- In: the `nav.ui-breadcrumb` markup and stylesheet, a separator that a property or a slot replaces, `small` size, `overflow` (`wrap`, `scroll`, `shrink`), right-to-left, `Breadcrumb` and `BreadcrumbItem` in Astro, React, Svelte and Vue, an `items` shorthand, the docs page, both blocks moved onto it.
- Out:
  - A collapsed middle ("Home / ... / Current" with a menu for the hidden levels). It needs a Menu inside the list and a rule for which items collapse; `overflow="shrink"` covers long trails for now. Track it as a TODO.md suggestion.
  - Icons and avatars as item props. A `BreadcrumbItem` takes any content, so an icon is an `svg` in its default slot.
  - JSON-LD `BreadcrumbList` structured data. It belongs to the page, not the component; the docs page links to how to add it.

## Markup and CSS

```html
<nav aria-label="Breadcrumb" class="ui-breadcrumb">
  <ol>
    <li><a class="ui-link" href="/files">My files</a></li>
    <li><a class="ui-link" href="/files/team">Team</a></li>
    <li>
      <a aria-current="page" class="ui-link" href="/files/team/marketing"
        >Marketing</a
      >
    </li>
  </ol>
</nav>
```

The current page can also be text without a link, as both blocks write it today: `<li><span aria-current="page">Marketing</span></li>`.

- Stylesheet: `packages/opui/css/components/breadcrumb.css`, `@layer components.root`, imported in the Root components group of `packages/opui/css/components.css` between `avatar.css` and `button.css` (the group is sorted, `tests/unit/layers.test.ts`). It only styles its own root and the `li` and `a` inside it, so it never has to beat another component's rule.
- Rules:
  - `:where(.ui-breadcrumb)` declares `--_gap: var(--ui-space-1)`, `--_separator: "/"`, `--_separator-color: var(--ui-text-subtle)`, `--_current-text-color: var(--ui-text-strong)` and `--_font-size: var(--ui-font-size-body)` (the role the file manager uses on its caption breadcrumb is `--ui-font-size-caption`, which `.ui-small` sets).
  - `& > ol`: `display: flex; flex-wrap: wrap; align-items: center; gap: var(--_gap); list-style: none; margin: 0; padding: 0; font-size: var(--_font-size)`.
  - `& > ol > li`: `display: inline-flex; align-items: center; gap: var(--_gap)`.
  - `& > ol > li + li::before`: `content: var(--_separator) / ""; color: var(--_separator-color)`, inside `@supports (content: "*" / "")` with `content: var(--_separator)` before it, the pattern `packages/opui/css/components/form.css:75-76` and `choice.css:66` already use. Engines without alt text read the slash, which is the browser default, so this is a zero-cost fallback, not a compat rule.
  - `& [aria-current="page"]`: `color: var(--_current-text-color); font-weight: var(--ui-font-weight-medium)`, and `text-decoration-line: none` on a link, since the current page is not somewhere to go.
  - `& > ol > li:has(> .ui-separator)::before`: `content: none`, so a `separator` slot replaces the drawn one (see Component API).
  - `& .ui-separator`: `color: var(--_separator-color); display: inline-flex`, and `> svg` sized to `--ui-icon-size-small`.
- Modifiers (naming model, `packages/opui/components/AGENTS.md` section 3):
  - `size`: `small` renders `.ui-small` (sets `--_font-size: var(--ui-font-size-caption)` and `--_gap: var(--ui-space-1)`), `medium` is the default and adds no class. `large` and `x-small` are not offered.
  - `overflow`: `wrap` is the default (no class). `.ui-overflow-scroll` keeps one row and scrolls it inline (`flex-wrap: nowrap; overflow-inline: auto; scrollbar-width: thin; overscroll-behavior-inline: contain`, the same declarations as `table.css:152-156`). `.ui-overflow-shrink` keeps one row and truncates every item but the first and the current one (`min-inline-size: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap` on `li:not(:first-child, :has([aria-current]))`, with `flex-shrink: 1`).
- Tokens: none new. Reads `--ui-text-subtle`, `--ui-text-strong`, `--ui-font-size-caption`, `--ui-font-size-body`, `--ui-space-*`, `--ui-icon-size-small`. The links keep `link.css`.
- `--_*` inputs documented in `src/component-api/custom-properties/breadcrumb.ts`: `--_separator` (a string, or `""` with a `separator` slot), `--_separator-color`, `--_gap`.
- Features for `browserSupport`: `has` (the slot rule and the shrink selector). `overflow-inline` needs `css/compat/breadcrumb.css` with `@supports not (overflow-inline: auto) { :where(.ui-breadcrumb).ui-overflow-scroll > ol { overflow-x: auto } }`, mirroring `packages/opui/css/compat/table.css`; listed in the Compat layer section of `src/docs/guide/browser-support.astro` and in the engine lists of `tests/e2e/compat.spec.ts`, imported in `css/compat.css` in ascending order (between `anchor.css` and `button-group.css`). Check first whether `overflow-inline` is still missing anywhere the e2e projects run; if every engine has it, drop the compat file and write `overflow-x`.
- Forced colors: no block. Text and links are forced to `CanvasText` and `LinkText` by the browser and the current page differs by weight and by not being underlined, so no state rests on color. Add `Breadcrumb` to the "without a block" list in `packages/opui/components/AGENTS.md` (section 9) as "text and links only", which `tests/unit/forced-colors.test.ts` checks.
- More contrast: nothing. `--ui-text-subtle` already tightens with the contrast knobs.
- Motion: none.
- Right-to-left: the `/` default reads correctly both ways. A chevron in the `separator` slot is mirrored with `.ui-breadcrumb .ui-separator:dir(rtl) > svg { scale: -1 1 }`, which adds `dir-pseudo` to `browserSupport`. `flex` and logical properties do the rest.

## Behavior

No script and no custom element. The platform gives the link list, the landmark and `aria-current`.

## Component API

Two components, both compiled by `pnpm build-components` (no construct the compiler refuses is expected: a root with a list, and a part with a variable tag).

- `Breadcrumb` (root) renders `nav.ui-breadcrumb` with `aria-label="Breadcrumb"` unless the caller passes `aria-label` or `aria-labelledby`, then an `ol` with the `items` first and the default slot after them (the Select pattern, guide section 7).

| Prop       | Type                             | Default    | Renders                                      |
| ---------- | -------------------------------- | ---------- | -------------------------------------------- |
| `items`    | `BreadcrumbItemData[]`           | none       | one `li` per item                            |
| `overflow` | `"scroll" \| "shrink" \| "wrap"` | `"wrap"`   | `.ui-overflow-scroll`, `.ui-overflow-shrink` |
| `size`     | `"medium" \| "small"`            | `"medium"` | `.ui-small`                                  |

- `BreadcrumbItemData` is `{ current?: boolean; href?: string; label: string }`. The last item is the current page when no item sets `current`. The type name follows the rename in `feat/component-proposals` (`TimelineItemData`).
- Slots: `default` (`BreadcrumbItem` parts), `separator` (replaces the drawn separator; each `li` after the first renders it as `<span aria-hidden="true" class="ui-separator">` before its content).
- `BreadcrumbItem` (part) renders `li`, with an `a.ui-link` when `href` is set and a `span` otherwise.

| Prop      | Type      | Default | Renders                                 |
| --------- | --------- | ------- | --------------------------------------- |
| `current` | `boolean` | `false` | `aria-current="page"` on the `a`/`span` |
| `href`    | `string`  | none    | the `a`                                 |
| `label`   | `string`  | none    | the text, with a `label` slot           |

- Context: the root passes the `separator` slot's presence and content to its items through `context.astro.ts`, `context.react.ts`, `context.svelte.js` and `context.vue.ts`, all four from a `Context` type in `types.ts` (guide section 4). Open question 2 is whether to skip the slot and keep the separator CSS only, which removes the context.
- `model`: none, nothing is bound.
- Accessible name: `aria-label` defaults to "Breadcrumb" in English. That is a word the component writes, which the guide disallows for names ("No other prop supplies or hides a name", section 3). So the types require `aria-label` or `aria-labelledby`, as `AvatarGroup` and `Carousel` do, and the docs examples pass `aria-label="Breadcrumb"`.

```astro
---
import { Breadcrumb, BreadcrumbItem } from "opui-css/astro"
---

<Breadcrumb aria-label="Breadcrumb">
  <BreadcrumbItem href="/shop" label="Shop" />
  <BreadcrumbItem href="/shop/women" label="Women" />
  <BreadcrumbItem current label="Merino Trail Hoodie" />
</Breadcrumb>

<Breadcrumb
  aria-label="Breadcrumb"
  items={[
    { href: "/files", label: "My files" },
    { href: "/files/team", label: "Team" },
    { label: "Marketing" },
  ]}
  size="small"
/>
```

## Accessibility

- A `nav` landmark named by the caller, an `ol` (order matters), `aria-current="page"` on the last item. This is the APG Breadcrumb pattern.
- Separators are `::before` with empty alt text, or `aria-hidden` spans, so a screen reader announces "list, 3 items" and no slashes.
- Keyboard: nothing beyond links.

| Key           | Action                      |
| ------------- | --------------------------- |
| `Tab`         | Moves to the next link.     |
| `Shift + Tab` | Moves to the previous link. |
| `Enter`       | Follows the focused link.   |

- What axe can't catch: that the current page is not a second focus stop that goes nowhere (a `span` is the recommendation; a link with `aria-current` is allowed for a page that reloads itself), that the separators are silent in VoiceOver and NVDA (check by hand, listed in the Components checks of `docs/releases/6.0.0.md`), that `overflow="shrink"` keeps the full label available (`title` is not enough; truncation uses `text-overflow`, so the text stays in the accessibility tree).

## Docs page

`src/docs/components/breadcrumb.astro`, `slug="breadcrumb"`, `heroAnatomy`.

- Preamble: "Shows where the page sits in a hierarchy, with a link to each level above it." See also: Tabs (switch between peers, not levels) and Stepper (progress through a sequence), linked both ways with `<DocLink>`; add the Breadcrumb link to the preambles of `tabs.astro` and `stepper.astro`.
- Usage: when to use (a hierarchy of three or more levels, a page reached from search where the context matters, file browsers, shop categories); when not to use (a flat site, a sequence of steps, use Stepper; the primary navigation, use a nav of links or Tabs; only one level above, use a back link).
- Sections, in the order of section 3.3 of `src/docs/components/AGENTS.md`:
  1. Basics (`Basics`): the product trail from `product-detail.html`.
  2. Sizes (`Sizes`): `small` next to the default, with the file manager trail.
  3. Separator (`Separator`): `--_separator: "›"` on one and a chevron `svg` in the `separator` slot on another.
  4. Current page (`CurrentLink`): the current page as a link, and when to choose that.
  5. Overflow (`Overflow`): `wrap`, `scroll` and `shrink` in a narrow container, with a long trail of real category names.
  6. Items (`Items`): the `items` shorthand, for the Astro, React, Svelte and Vue pages (`<Conditional>`), and the HTML that comes out of it.
  7. Accessibility slot: the landmark name, silent separators, the keyboard table (`KeyboardSupport` partial).
- Anatomy: root `.ui-breadcrumb`, parts `ol`, `li`, `[aria-current="page"]`, `.ui-separator`.
- `browserSupport={["dir-pseudo", "has"]}` (run `node scripts/check-browser-support.mjs --write` after the CSS is final).
- See also: Link, Stepper, Tabs.

## Blocks and other pages

- `src/blocks/file-manager.html:55-61`: `<nav aria-label="Breadcrumb" class="ui-breadcrumb ui-small">`, drop `.files-breadcrumb` and its rules at `:5-13`, drop `ui-layout-row ui-x-small` from the `ol`.
- `src/blocks/product-detail.html:60-67`: `class="ui-breadcrumb"`, drop `.pd-breadcrumb` and its rule at `:3-6`.
- The blocks need new visual baselines (`update-snapshots` label) only if the gaps change; aim to match the current spacing.
- Add a breadcrumb above a heading in `src/stress-tests/layout.html` so `tests/e2e/themes.spec.ts` covers it in every theme.

## Files

- `packages/opui/components/Breadcrumb/`: `Breadcrumb.astro`, `BreadcrumbItem.astro`, `types.ts`, `types.astro.ts`, `context.astro.ts`, `context.react.ts`, `context.svelte.js`, `context.vue.ts`, and the compiled `*.react.tsx`, `*.svelte`, `*.vue`, `types.react.ts`, `types.svelte.ts`, `types.vue-props.ts`.
- Barrels: `packages/opui/astro/index.ts`, `react/index.ts`, `svelte/index.ts`, `vue/index.ts` (`Breadcrumb`, `BreadcrumbItem`, `Props as BreadcrumbProps`, `BreadcrumbItemProps`, sorted).
- `packages/opui/css/components.css`, `packages/opui/css/components/breadcrumb.css`, and `packages/opui/css/compat.css` with `css/compat/breadcrumb.css` if the compat rule stays.
- `src/component-api/breadcrumb/api.ts`, `src/component-api/breadcrumb-item/api.ts`, `src/component-api/custom-properties/breadcrumb.ts`.
- `src/component-examples/breadcrumb/` (`Basics`, `CurrentLink`, `Items`, `Overflow`, `Separator`, `Sizes`, each in five formats from `pnpm build-examples`).
- `src/docs/components/breadcrumb.astro`, and the preambles of `stepper.astro` and `tabs.astro`.
- `src/components/ComponentShowcase/ComponentShowcase.astro`.
- `packages/opui/skills/opui/references/breadcrumb.md` and `references/index.md`.
- `packages/opui/README.md` (component list).
- `packages/opui/CHANGELOG.md`, `### Added`: "`Breadcrumb` and `BreadcrumbItem` show where a page sits in a hierarchy: `.ui-breadcrumb` on a `nav` with an `ol`, separators that screen readers skip, `--_separator`, a `separator` slot, `small` and `overflow`."
- `src/utils/whats-new.ts`: a `breadcrumb` entry linking `#basics`, and `breadcrumb` in `added` and `highlighted` (`src/utils/whats-new.ts:1567`, `:1587`).
- `docs/releases/6.0.0.md`: a Components check that links `/html/components/breadcrumb/` (separators silent in a screen reader, RTL chevron).
- `tests/package/package.test.ts`: the new export.
- `packages/opui/components/AGENTS.md`: Breadcrumb in the forced colors "without a block" list.
- `src/blocks/file-manager.html`, `src/blocks/product-detail.html`, `src/stress-tests/layout.html`.
- `TODO.md`: resolve the item at `:1380` with `node scripts/todo.mjs resolve`, and update the Breadcrumb bullet of `:2499`.
- Generated: `public/search-index/*.json`, parity snapshots in `tests/unit/__snapshots__/`, the files in `scripts/generated-files.json`.

## Tests

- Unit: `tests/unit/component-contract.test.ts` (every prop value and slot, four frameworks), `parity.test.ts` (every example), `naming.test.ts` (`overflow`, `size`, `label`, `items`), `example-coverage.test.ts` (each `overflow` value and `small` appear in an example), `component-whitespace.test.ts` (the `label` and `separator` slots), `changelog.test.ts`, `whats-new.test.ts`, `layers.test.ts`, `forced-colors.test.ts`, `compat.test.ts` if the compat file stays.
- E2E: `tests/e2e/a11y.spec.ts` picks up the fixture page; add to `tests/e2e/interaction.spec.ts` a check that `innerText` of the list has no slash in engines with alt text, and that `.ui-overflow-shrink` truncates the middle items but never the current one at 320px. Visual baselines from CI (`update-snapshots`).
- `tests/e2e/example-text.spec.ts` compares the frameworks' accessibility trees, which covers the silent separator.

## Steps

1. Write `breadcrumb.css` and add it to `components.css`; move both blocks onto it. Check: `pnpm sort-css:check`, `pnpm check-css-vars`, `node scripts/check-file.mjs packages/opui/css/components/breadcrumb.css`.
2. Write `Breadcrumb.astro`, `BreadcrumbItem.astro`, `types.ts`, `types.astro.ts` and the context files; run `pnpm build-components`. Check: `pnpm check-ports`, `pnpm exec vitest run tests/unit/component-contract.test.ts -t Breadcrumb`.
3. Write both `api.ts` files and the custom properties file. Check: `pnpm test` for `[component-api]` problems, `naming.test.ts`.
4. Write the Astro examples, run `pnpm build-examples`. Check: `pnpm check-examples`, `pnpm exec vitest run tests/unit/parity.test.ts -t breadcrumb`, `example-copy.test.ts`, `example-coverage.test.ts`.
5. Write the docs page and the preamble links. Check: `docs-pages.test.ts`, `node scripts/check-browser-support.mjs`.
6. Barrels, README, skill reference, CHANGELOG, What's new, release checks, guide list, TODO.md. Check: `pnpm check:fast`.
7. E2E: `pnpm test:e2e --project=light --project=dark -g Breadcrumb`.
8. `pnpm check`, push, add the `update-snapshots` label.

## Open questions

1. Default separator: `/` (both blocks, TODO.md:1383) or a chevron (Nuxt UI, most design systems)? Recommended: `/`. It is text, so it needs no icon, mirrors itself in right-to-left and is what the blocks already show; the docs show the chevron in the `separator` slot.
2. Keep the `separator` slot, or only `--_separator`? Recommended: keep it. An `svg` icon can't go in `content` without a `url()` that loses `currentColor`, and the slot is cheap. Without it the context files go away.
3. Should the types require `aria-label`? Recommended: yes, as `AvatarGroup` and `Carousel` do, since the guide forbids the component writing an English name.
4. A collapsed middle with a menu (`Home / ... / Current`): later, as a TODO.md suggestion.
