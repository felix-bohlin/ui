# Tree: implementation plan

Status: plan only. This PR carries the plan; the implementation lands on this branch in later commits.

## Summary

Tree shows nested items that open and close: a file browser, a docs navigation, a settings hierarchy. It is nested lists with `<details>` and `<summary>` for every item that has children, so it opens, closes, animates and works with the keyboard without a script, and an optional `opui-tree` element adds arrow keys on top. No opui component nests disclosures today: Accordion is one level of cards, and List and Menu are flat.

## Why

- Nuxt UI ships `UTree` (`@nuxt/ui` 4.12.0, `dist/runtime/components/Tree.vue`), built on Reka UI's `TreeRoot`, an ARIA `tree` with roving focus. Its props: `items` (objects with `label`, `icon`, `children`, `defaultExpanded`, `disabled`, `slot`), `multiple`, `modelValue` and `expanded` (v-models), `nested`, `virtualize`, `color`, `size`, `expandedIcon`, `collapsedIcon`, `trailingIcon`, `getKey`, `labelKey`, and `onSelect` and `onToggle` per item.
  - We take: the item shape (`label`, an icon at the start, children, open by default, disabled), the two sizes, a marker that turns when open, and the idea of selection as a separate concern from opening.
  - We leave: `virtualize` (a library concern, not CSS), the controlled `expanded` model (the open state lives in `details[open]`, which every framework can bind), and the `tree` role in the first version (see Accessibility).
- Where the repo needs it:
  - `src/blocks/file-manager.html` lists folders as a grid of cards (`.files-folders`, line 146) with a breadcrumb `nav` at line 55, but has no folder tree. A tree in the sidebar is the most common file manager layout.
  - The docs sidebar (`src/components/` sidebar markup) is a two-level navigation that a Tree with links could render.
  - `TODO.md:1373` (Menu: the arrow keys do nothing) asks the same keyboard question for Menu. The `opui-tree` element answers it for Tree the same way, so the two should share the decision.

## Scope

- In:
  - `Tree` root and `TreeItem` part, compiled for Astro, React, Svelte and Vue.
  - Leaves as links (navigation) or buttons (actions), with `aria-current="page"` for the current link.
  - Branches as `<details>` and `<summary>`, opened by `open`, animated with `::details-content` and `interpolate-size` like Accordion.
  - Sizes `small` and `medium`, optional guide lines (`guides`), an icon slot at the start of every item.
  - The `opui-tree` element for arrow keys, Home, End and typeahead, with every item still in the Tab order.
- Out:
  - Selection with checkboxes (Nuxt's `multiple`). It needs indeterminate parents, which `select-all.js` already does for flat lists; a follow-up can reuse it.
  - The `items` prop. A recursive data-driven tree needs a component that renders itself, which `pnpm build-components` may refuse; parts come first and `items` follows once the compiler question is answered (Open questions).
  - The ARIA `tree` role with a single tab stop. It is a different keyboard contract and is listed in Open questions.
  - Drag and drop, lazy loading of children, virtualization.

## Markup and CSS

```html
<nav aria-label="Project files">
  <ul class="ui-tree ui-guides">
    <li>
      <details open>
        <summary>
          <svg aria-hidden="true" class="ui-marker"><!-- chevron --></svg>
          <svg aria-hidden="true" class="ui-start"><!-- folder --></svg>
          <span class="ui-label">src</span>
        </summary>
        <ul>
          <li>
            <a aria-current="page" href="/files/src/index.ts">
              <svg aria-hidden="true" class="ui-start"><!-- file --></svg>
              <span class="ui-label">index.ts</span>
            </a>
          </li>
          <li>
            <details>
              <summary>
                <svg aria-hidden="true" class="ui-marker"></svg>
                <span class="ui-label">components</span>
              </summary>
              <ul>
                <li>
                  <a href="/files/src/components/Button.astro">
                    <span class="ui-label">Button.astro</span>
                  </a>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </details>
    </li>
    <li>
      <a href="/files/package.json"
        ><span class="ui-label">package.json</span></a
      >
    </li>
  </ul>
</nav>
```

- The root is a `ul.ui-tree`. Navigation trees sit in a `nav` with an `aria-label`, which the author writes (the component has no `nav` of its own, like List).
- Every nested level is a plain `ul` inside the `details`, so the CSS reaches it as `.ui-tree ul` and nesting depth needs no class.
- Stylesheet: `packages/opui/css/components/tree.css`, in `components.root` (no other component styles these elements), imported in ascending order in the root group of `css/components.css` (after `timeline.css`, before `toggle-button.css`). It does not build on `list.css`, whose `:where(.ui-list, .ui-menu)` rules at `list.css:9` assume one level and a `components.extended` layer.
- Rows reuse List's look so a tree and a list next to each other match: the same hover tint formula as `list.css:13` (`--_hover-bg-color`), the same `--_radius: var(--ui-radius)`, and the selected look of `list.css:209` and `list.css:279` for `[aria-current="page"]` (`--ui-selected`, `--ui-on-selected`, and the `--ui-selected-strong` indicator bar).
- Private properties, declared on `:where(.ui-tree)`, in ascending order:
  - `--_duration: calc(var(--ui-duration) * var(--_motion))`, `--_ease: var(--ui-ease)`
  - `--_guide-border-color: var(--ui-border-color)`
  - `--_hover-bg-color`, the List formula
  - `--_indent: var(--ui-space-4)`, the inline offset of each level
  - `--_item-gap: var(--ui-space-2)`, between marker, icon and label
  - `--_item-padding-block: var(--ui-space-1)`, `--_item-padding-inline: var(--ui-space-2)`
  - `--_marker-size: var(--ui-icon-size-small)`, `--_start-size: var(--ui-icon-size)`
  - `--_motion: var(--ui-motion)`, `--_radius: var(--ui-radius)`
  - `--_selected-bg-color: var(--ui-selected)`, `--_selected-text-color: var(--ui-on-selected)`
- Modifiers:
  - `size`: `small` renders `.ui-small` (smaller padding, `--ui-icon-size-small` icons, `--ui-font-size-small`), `medium` is the default and adds no class.
  - `guides` (boolean) renders `.ui-guides`: a `border-inline-start` in `--_guide-border-color` on every nested `ul`, lined up under the parent's marker.
- No new theme token. Every color is a role, every length a `--ui-space-*` or icon size.
- Opening:
  - `details::details-content` gets `block-size: 0` and `content-visibility` transitions, with `interpolate-size: allow-keywords` on the root, the pattern at `accordion.css:44` and `accordion.css:76` to `accordion.css:89`.
  - The marker turns a quarter with `rotate`, like `accordion.css:132`, and the other way in right-to-left with `:dir(rtl)`, like `accordion.css:145`.
  - `summary` drops its native marker (`list-style: none` and `::-webkit-details-marker`, a vendor pseudo-element that is the only way to hide it in WebKit, so it isn't a workaround).
- Features for `browserSupport`, sorted: `details-content`, `dir-pseudo`, `has`, `interpolate-size`. `has` only if `summary:has(> .ui-marker)` is used to reserve marker space for leaves (recommended, so leaf labels line up with branch labels).
- Leaves without a marker get an inline start padding of `--_marker-size` plus `--_item-gap`, so labels align in a column at every level.
- Forced colors: a block. The current item is a tint, so it gets `SelectedItem` and `SelectedItemText`, like List (`list.css:429`). Add Tree to the "with a block" list in `packages/opui/components/AGENTS.md` section 9. The guide lines are real borders and need nothing.
- More contrast: nothing of its own; the roles follow the knobs.
- Motion: hover recolors instantly and fades back, like List rows (section 11 of the guide). The open animation and the marker turn read `--_duration` scaled by `--_motion`, so `prefers-reduced-motion` through `--ui-motion` stops them.
- Right-to-left: indentation and guides are logical (`padding-inline-start`, `border-inline-start`), the marker mirrors.

## Behavior

- Without a script: `details` opens and closes on click, Enter and Space on the `summary`; links and buttons work; Tab reaches every visible item; find in page opens a closed branch that holds a match (`details` auto-expands for find in page in Chromium).
- `opui-tree` (`packages/opui/elements/tree.js`, `tree.d.ts`), optional, added by `TreeItem`'s root `Tree` when `keyboard` is set (Open questions: on by default or not):
  - Listens to `keydown` on itself with an `AbortController`, like `sortable-table.js`.
  - Items are the visible `summary`, `a[href]` and `button` elements of the tree, in document order, skipping any inside a closed `details`.
  - Keys: see the Accessibility table. It moves focus with `focus()`; it never changes `tabindex`, so Tab keeps its order.
  - Typeahead: printable characters within 500 ms build a prefix, matched against `.ui-label` text with `Intl.Collator` from the nearest `[lang]` (the lookup at `sortable-table.js:83`), case and accent insensitive.
  - Events: none of its own. Opening fires the native `toggle` event on the `details`, which every framework already handles.
  - Registered like the other elements: `customElements.define("opui-tree", Tree)` guarded by `customElements.get`, typed in `react/elements.ts` and `svelte/elements.ts`.

## Component API

- `Tree` renders the root `ul` (or `opui-tree` wrapping it when `keyboard` is set, like `TextField` switches its root to `opui-text-field` at `TextField.astro:45` to `TextField.astro:50`). `TreeItem` renders the `li`.
- Both compiled by `pnpm build-components`. If the compiler refuses the conditional `details` in `TreeItem`, list the files in `scripts/hand-written-components.json` with the construct it names and port with `/port-component Tree`.

`Tree` props, sorted:

| Prop       | Type                  | Default    | Renders                     |
| ---------- | --------------------- | ---------- | --------------------------- |
| `guides`   | `boolean`             | `false`    | `.ui-guides`                |
| `keyboard` | `boolean`             | `false`    | `opui-tree` around the `ul` |
| `size`     | `"small" \| "medium"` | `"medium"` | `.ui-small`                 |

Slots: the default slot holds the `TreeItem`s.

`TreeItem` props, sorted:

| Prop       | Type      | Default | Renders                                                         |
| ---------- | --------- | ------- | --------------------------------------------------------------- |
| `current`  | `boolean` | `false` | `aria-current="page"` on the link                               |
| `disabled` | `boolean` | `false` | `disabled` on a button, no `href` and `aria-disabled` on a link |
| `href`     | `string`  |         | an `a` leaf instead of a `button`                               |
| `label`    | `string`  |         | `.ui-label`                                                     |
| `name`     | `string`  |         | `name` on the `details`, so siblings close each other           |
| `open`     | `boolean` | `false` | `open` on the `details`                                         |

Slots: `children` (or the default slot) holds nested `TreeItem`s and turns the item into a branch; `label` for rich text; `start` for the icon, rendered with `.ui-start`; `marker` replaces the default chevron (`svg.ui-marker`), as on `AccordionSummary`.

- `model` in `api.ts`: `open` on `TreeItem`, bound in Svelte with `$bindable()` and in Vue with `defineModel`, since the native `details` owns it.
- `disabled` on a link follows the existing rule (section 3 of the guide): it drops `href` and gets `role="link"` and `aria-disabled="true"`.

```astro
---
import { Tree, TreeItem } from "opui-css/astro"
---

<nav aria-label="Project files">
  <Tree guides keyboard>
    <TreeItem label="src" open>
      <TreeItem current href="/files/src/index.ts" label="index.ts" />
      <TreeItem label="components">
        <TreeItem
          href="/files/src/components/Button.astro"
          label="Button.astro"
        />
      </TreeItem>
    </TreeItem>
    <TreeItem href="/files/package.json" label="package.json" />
  </Tree>
</nav>
```

## Accessibility

- Roles: native only. A `ul`/`li` list, `summary` as a disclosure button with its expanded state exposed by the browser, links and buttons. This is the APG "disclosure navigation" pattern, which suits navigation and file browsing better than an ARIA `tree`: links stay links, a screen reader's link list finds them, and nothing breaks when the script doesn't load.
- Names: the tree is named by the `nav` around it, or by `aria-label` on the root when it isn't navigation. Whether a `nav` wraps it can't be checked statically, so the page says so; `warnUnnamedGroup` from `../dev` doesn't apply, since the role doesn't depend on a prop.
- Current item: `aria-current="page"`; a branch that contains it is opened on the server by the author (`open`), documented with an example.
- Icons are `aria-hidden="true"`.
- Keyboard support (the table in `api.ts`, `keyboard`):

| Keys             | Without `keyboard`                          | With `keyboard` (`opui-tree`)                                                 |
| ---------------- | ------------------------------------------- | ----------------------------------------------------------------------------- |
| Down Arrow       | nothing                                     | Moves to the next visible item.                                               |
| End              | nothing                                     | Moves to the last visible item.                                               |
| Enter            | Opens or closes a branch, follows a link.   | Same.                                                                         |
| Home             | nothing                                     | Moves to the first item.                                                      |
| Left Arrow       | nothing                                     | Closes an open branch, or moves to the parent branch. Right in right-to-left. |
| Right Arrow      | nothing                                     | Opens a closed branch, or moves to its first child. Left in right-to-left.    |
| Space            | Opens or closes a branch, presses a button. | Same.                                                                         |
| Tab, Shift Tab   | Moves through every visible item.           | Same: the element adds keys and keeps the Tab order.                          |
| Type a character | nothing                                     | Moves to the next item whose label starts with the typed text.                |
| Up Arrow         | nothing                                     | Moves to the previous visible item.                                           |

- What axe can't catch: the focus ring on a `summary` inside a scrolling sidebar isn't clipped (check with `overflow: auto` on the parent), the indicator bar of the current item is visible in forced colors, and arrow keys follow the reading direction in right-to-left. The `a11y` agent reviews it.

## Docs page

`src/docs/components/tree.astro`, `slug="tree"`, `heroAnatomy`.

- Preamble: nested items that open and close. Name the close siblings: Accordion (one level of large sections) and List (one level), linked both ways with `<DocLink>`.
- Usage: when to use (file browsers, nested navigation, a settings hierarchy deeper than two levels); when not to (one level, use List; a few large sections, use Accordion; choosing one value, use Select).
- Sections, in the order of section 3.3 of `src/docs/components/AGENTS.md`:
  1. Basics (`Basics`): files and folders with links.
  2. Sizes (`Sizes`): `small` next to `medium`.
  3. Icons (`Icons`): the `start` slot with folder and file icons, and a custom `marker`.
  4. Current item (`Current`): `current` on a link, with its branches open.
  5. Disabled (`Disabled`).
  6. Guides (`Guides`).
  7. Exclusive branches (`Exclusive`): `name` on sibling branches.
  8. Actions (`Actions`): button leaves in a settings tree.
  9. Keyboard (`Keyboard`): `keyboard` on, with the table in the Accessibility slot.
- Copy: real file names and settings labels (`tests/unit/example-copy.test.ts` rejects filler).
- Anatomy: `.ui-tree`, `summary`, `.ui-marker`, `.ui-start`, `.ui-label`, nested `ul`.
- `browserSupport`: `details-content`, `dir-pseudo`, `has`, `interpolate-size`, confirmed with `node scripts/check-browser-support.mjs --write`.
- See also: Accordion, List, Menu.

## Blocks and other pages

- `src/blocks/file-manager.html`: add a folder tree to the sidebar next to the breadcrumb (`nav` at line 55), with the current folder marked, so the block shows the component in a real layout.
- Stress tests: add a `tree` section to the layout stress page in `src/stress-tests/` with a long label that wraps, a deep level (six levels), right-to-left, and a tree inside a `Drawer`.
- Consider the docs sidebar as a later change; it isn't part of this PR.

## Files

- [ ] `packages/opui/components/Tree/`: `Tree.astro`, `TreeItem.astro`, compiled `.react.tsx`, `.svelte`, `.vue`, `types.ts`, `types.astro.ts`, compiled `types.react.ts`, `types.svelte.ts`, `types.vue-props.ts`.
- [ ] Barrels: `packages/opui/astro/index.ts`, `react/index.ts`, `svelte/index.ts`, `vue/index.ts` (`Tree`, `TreeItem`, `Props as TreeProps`, `TreeItemProps`), sorted.
- [ ] `packages/opui/css/components/tree.css` and its import in `css/components.css`.
- [ ] `packages/opui/elements/tree.js`, `tree.d.ts`; `react/elements.ts` and `svelte/elements.ts` (`opui-tree`).
- [ ] `src/component-api/tree/api.ts`, `src/component-api/tree-item/api.ts`, `src/component-api/custom-properties/tree.ts`.
- [ ] `src/component-examples/tree/*.astro` and the files `pnpm build-examples` writes.
- [ ] `src/docs/components/tree.astro`, `src/components/ComponentShowcase/ComponentShowcase.astro`.
- [ ] `packages/opui/skills/opui/references/tree.md`, the entry in `references/index.md`.
- [ ] `packages/opui/README.md` component list.
- [ ] `packages/opui/CHANGELOG.md`, Added: "`Tree` and `TreeItem` show nested items in `details` ... " with `.ui-tree` and `.ui-guides` named (`tests/unit/changelog.test.ts` checks new classes are named).
- [ ] `src/utils/whats-new.ts`: a `tree` note linking `#basics`, and `tree` in `added` and `highlighted` (line 1567 and line 1587).
- [ ] `docs/releases/6.0.0.md`, Components: a `- [ ] Tree` check (opens and closes with animation in Chrome, opens without a jump elsewhere, guides line up at every level, RTL, forced colors).
- [ ] `packages/opui/components/AGENTS.md`: Tree in the forced colors "with a block" list and in the root group of section 10.
- [ ] `tests/package/package.test.ts`: the new element and stylesheet.
- [ ] `src/blocks/file-manager.html`, the stress test page.
- [ ] Generated: `public/search-index/*.json`, parity snapshots in `tests/unit/__snapshots__/`, any file in `scripts/generated-files.json`.

## Tests

- Unit:
  - `tests/unit/component-contract.test.ts` and `tests/unit/parity.test.ts` pick up `Tree` and `TreeItem` with every prop and slot.
  - `tests/unit/naming.test.ts`: `guides`, `size`, `open`, `name`, `label`, `marker`, `start` follow the model.
  - `tests/unit/example-coverage.test.ts`: every prop and value appears in an example.
  - New `tests/unit/tree-element.test.ts` (jsdom or happy-dom, like the other element tests): visible item order skips closed branches, Left and Right swap in RTL, typeahead with accents.
- E2E:
  - `tests/e2e/interaction.spec.ts`: click and Enter open a branch, arrow keys with `keyboard`, Left from a child moves to its parent, Tab order unchanged.
  - `a11y.spec.ts` covers the fixture page at `/html/test/tree`.
  - Visual snapshots in CI with the `update-snapshots` label.
  - Firefox and WebKit: if `::details-content` behaves differently, mark the case with `failsIn()` and a reason in `tests/e2e/engine-bugs.ts` with a plain-HTML repro in `tests/e2e/engines.spec.ts`.
- Stress test page coverage through `tests/e2e/stress.spec.ts`.

## Steps

1. Write `tree.css` against a plain HTML fixture and the markup above; `pnpm sort-css` and `node scripts/check-file.mjs packages/opui/css/components/tree.css`.
2. Write `Tree.astro`, `TreeItem.astro`, `types.ts`, `types.astro.ts`; run `pnpm build-components`; `pnpm exec vitest run tests/unit/component-contract.test.ts -t Tree`.
3. Write `api.ts` for both and the custom properties file; `pnpm test` shows no `[component-api]` problems.
4. Write the examples, `pnpm build-examples`, then `pnpm exec vitest run tests/unit/parity.test.ts -t tree`.
5. Write `tree.js` and its unit test; wire `keyboard`.
6. Write the docs page, showcase entry, skill reference, README, CHANGELOG, What's new and release check; `pnpm check:fast`.
7. Update the file manager block and the stress page.
8. `pnpm test:e2e --project=light --project=dark -g Tree`, then add the `update-snapshots` label in CI.
9. `pnpm check`, then run the `audit` skill (a11y, css, api-docs, changelog agents) on the diff.

## Open questions

1. Native disclosure markup or an ARIA `tree`? Recommended: native disclosure, as planned. An ARIA tree needs a script to be usable at all, hides links from the link list, and makes a single tab stop that users who don't know the arrow keys can't get past. The `tree` role can come later as a `selection` mode for pickers, where it pays off.
2. Is `keyboard` on by default? Recommended: off in the first version, so the default renders no custom element and stays a server component in React. Revisit with the Menu arrow keys item at `TODO.md:1373`, so both components answer the same way.
3. An `items` prop? Recommended: after the first version, once `pnpm build-components` is checked against a self-rendering component; if it refuses, a hand-written `TreeItems` helper in each framework is the fallback.
4. Selection with checkboxes? Recommended: a follow-up that reuses `select-all.js` for indeterminate parents.
