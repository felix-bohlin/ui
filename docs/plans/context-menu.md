# ContextMenu: implementation plan

Status: plan only. This PR carries the plan; the implementation lands on this branch in later commits.

## Summary

ContextMenu opens a `Menu` at the pointer when someone right-clicks or long-presses a region, and at the focused element when they press Shift+F10 or the Menu key. The `<opui-context-menu>` custom element wraps the region and its menu, moves an anchor point to where the menu should open, and opens the menu's existing popover, so all the Menu styles, items, submenus and light dismiss come for free.

## Why

- Nuxt UI ships `UContextMenu` (`@nuxt/ui` 4.12.0, `dist/runtime/components/ContextMenu.vue`, on Reka UI): an `items` array (with `type` `label`, `separator`, `link` or `checkbox`, `kbds`, `children` for submenus, `onSelect`), `size`, `disabled`, `modal`, and the default slot as the trigger region. We take the trigger region model, the keyboard opening and `disabled`. Items, submenus, shortcuts and dividers already exist in our `Menu` (`items` with `shortcut` and `borderTop`, `packages/opui/components/Menu/types.ts:1-9`), so ContextMenu reuses `Menu` rather than growing its own item model.
- Where the repo needs it today:
  - The Menu page already documents a context menu as a recipe: a section that tells readers to call `showPopover({ source })` from their own `contextmenu` listener (`src/docs/components/menu.astro:163-172`), backed by an example with an inline script (`src/component-examples/menu/ContextMenu.astro`) whose React, Svelte and Vue files are hand-written for exactly that reason (`scripts/hand-written-examples.json:20-22`). Every reader copies that script.
  - The recipe skips the keyboard: Shift+F10 only opens it where the browser turns that key into a `contextmenu` event, nothing opens it on macOS, and focus is never moved into the menu.
  - The file-manager block has a row menu behind a "more" button on every row (`src/blocks/file-manager.html:336-341`, menu at lines 572-610); right-clicking a row is the expected shortcut in a file manager.

## Scope

- In: right-click, Shift+F10 and the Menu key, long press where the browser fires `contextmenu` (Android, desktop touch screens), positioning at the pointer or at the focused element, focus handling, closing, `disabled`, nested regions (the innermost wins), and any `Menu` content including submenus.
- Out:
  - Arrow key movement between items. That's the open Menu item in `TODO.md:1373-1379` (an `<opui-menu>` element with `role="menu"`), a design decision for Menu as a whole. ContextMenu inherits whatever Menu decides; see Open questions.
  - Long press on iOS Safari, which fires no `contextmenu`. A synthetic long press would fight text selection and the system callout. Documented as a limitation, with a `## To check` item.
  - Per-target menus built from data (one menu whose items change with the row clicked). The element exposes the clicked target in its event, which is enough for an app to change items; a declarative API waits for real use.

## Markup and CSS

```html
<opui-context-menu class="ui-context-menu">
  <div aria-label="Canvas" class="canvas" tabindex="0">
    Right-click the canvas, or focus it and press Shift+F10.
  </div>
  <span class="ui-point"></span>
  <menu class="ui-menu" id="canvas-menu" popover>
    <li>
      <button command="hide-popover" commandfor="canvas-menu" type="button">
        <div class="ui-text"><p>Cut</p></div>
        <div class="ui-end"><kbd>Ctrl+X</kbd></div>
      </button>
    </li>
    <li>
      <button command="hide-popover" commandfor="canvas-menu" type="button">
        <div class="ui-text"><p>Copy</p></div>
        <div class="ui-end"><kbd>Ctrl+C</kbd></div>
      </button>
    </li>
    <li>
      <button command="hide-popover" commandfor="canvas-menu" type="button">
        <div class="ui-text"><p>Paste</p></div>
        <div class="ui-end"><kbd>Ctrl+V</kbd></div>
      </button>
    </li>
  </menu>
</opui-context-menu>
```

- The root holds the region, an empty anchor point and one `Menu`. The menu is the plain Menu markup from `menu.css`; nothing about it changes.
- New stylesheet `packages/opui/css/components/context-menu.css`, `components.root` (it styles its own root and point, and sets inputs the Menu reads, without beating any `menu.css` rule), Root group of `css/components.css` in ascending order (between `choice.css` and `description-list.css`).
- Rules:

```css
@layer components.root {
  :where(.ui-context-menu) {
    anchor-scope: --ui-context-menu-point;
    display: block;

    & > .ui-point {
      anchor-name: --ui-context-menu-point;
      block-size: 0;
      inline-size: 0;
      inset-block-start: var(--_point-block, 0);
      inset-inline-start: var(--_point-inline, 0);
      pointer-events: none;
      position: absolute;
    }

    & > .ui-menu[popover] {
      position-anchor: --ui-context-menu-point;
    }
  }
}
```

- The point is `position: absolute`, and the element measures against the point's `offsetParent`, so the reader's layout never has to add `position: relative`. `--_point-inline` and `--_point-block` are lengths from the containing block's inline start and block start, which the element computes for both directions (the inline offset counts from the right edge in right-to-left), so the CSS stays logical.
- The explicit `anchor-name` and `position-anchor` make the menu open at the point even where `showPopover({ source })` doesn't set an implicit anchor; `source` is still passed for the focus and accessibility relation. Menu's own `position-area`, `position-try-fallbacks` and `--ui-menu-block-end`/`--ui-menu-block-start` fallbacks (`packages/opui/css/components/menu.css:44-60` and the `@position-try` rules at lines 166-178) keep the menu on screen near the edges. The submenu rule that reads `--ui-menu-root` (`menu.css:121-140`) is unaffected, since the root menu still sets that name.
- The default Menu side (`self-block-end`, `span-self-inline-end`) opens the menu below and toward the inline end of the pointer, which is where native context menus open. `side` and `align` on the Menu still work for readers who want another corner.
- `--_*` declared: `--_point-block`, `--_point-inline` (set by the element, documented as read-only inputs in `src/component-api/custom-properties/context-menu.ts`). No theme token.
- Features for `browserSupport`: `anchor-positioning`, `popover`. The Menu's own features are listed on the Menu page, linked as a dependency (`isDependency` in `installationTabs`).
- Forced colors: no block. The point is invisible and the menu is styled by `menu.css`. Add `ContextMenu` to the "without a block" list in section 9 of `packages/opui/components/AGENTS.md` ("layout only, the menu is a Menu").
- Motion: Menu's open and close transitions apply unchanged. Reopening at a new point closes the open menu first (no animated jump between points).
- Right-to-left: the element computes the inline offset from the inline start edge in either direction; the menu flips with Menu's existing rules.

## Behavior

The platform gives the popover, light dismiss, Esc, `hide-popover` commands on items, top layer and the anchor. The element adds when and where to open it, and focus.

`packages/opui/elements/context-menu.js` (and `.d.ts`), light DOM, defined as `opui-context-menu`.

- Opening by pointer: a `contextmenu` listener on the element. It ignores events from inside the menu, and events already handled by a nested `opui-context-menu` (the inner element calls `stopPropagation()` after handling, so the innermost region wins). It calls `preventDefault()`, measures the point against its `offsetParent`, sets `--_point-inline` and `--_point-block` on the point, and opens the menu with `showPopover({ source: point })`, after hiding it first if it's already open. On a mouse, the existing example waits for `pointerup` before opening (`src/component-examples/menu/ContextMenu.astro:63-69`) so the release doesn't light-dismiss the new popover; the element keeps that.
- Opening by keyboard: a `keydown` listener for `ContextMenu` and Shift+F10. It calls `preventDefault()` (which also stops the browser's own `contextmenu` from that key where one would follow), places the point at the inline start, block end corner of `document.activeElement` when it's inside the region, or of the element otherwise, opens the menu and focuses its first enabled item. A `contextmenu` event that arrives with `event.button === 0`, no `pointerType` and zero coordinates (a keyboard `contextmenu` the browser synthesizes) is treated the same way.
- Focus: pointer opening focuses the `<menu>` itself (the element sets `tabindex="-1"` on it while open) so Tab enters the items and screen readers land in the menu; keyboard opening focuses the first item. On `toggle` to closed, if focus was inside the menu, it returns to the element focused before opening. Esc and light dismiss are the Menu's.
- `disabled` attribute: the element lets the native context menu through and ignores the keys.
- Events: `contextmenuopen` (cancelable, bubbling) before opening, with `detail: { target: Element, x: number, y: number, source: "keyboard" | "pointer" }`, where `target` is the element the person right-clicked or focused, so an app can change the items or cancel for a target (a header row). Closing is the menu's own `toggle` event.
- The point: if the markup has no `> .ui-point`, the element creates one on connect, so hand-written HTML can leave it out; the components always render it, for parity.

## Component API

`ContextMenu`, compiled by `pnpm build-components`. It renders `opui-context-menu.ui-context-menu`, its default slot as is (the parts rule in section 4 of the guide: the root never wraps its children), and the `span.ui-point` after it, and imports `../../elements/context-menu.js`.

Props:

| Prop       | Type      | Default | Renders                   |
| ---------- | --------- | ------- | ------------------------- |
| `disabled` | `boolean` | `false` | `disabled` on the element |

- Slots: the default slot holds the region and the `Menu`. The element finds the menu as `:scope > .ui-menu[popover]`; a `Menu` nested deeper is ignored, and a development warning in `../dev` (like `warnMissingId`) fires when there is no direct child menu.
- `model`: none.
- Element typings in `packages/opui/react/elements.ts` and `packages/opui/svelte/elements.ts` with `disabled` and Svelte's `oncontextmenuopen`; React's `onContextMenuOpen` in `types.react.ts`.
- The reader's region keeps its own attributes. The docs say to give a region without focusable content `tabindex="0"` and an accessible name, since Shift+F10 needs focus inside the region.

```astro
---
import { ContextMenu, Menu } from "opui-css/astro"
---

<ContextMenu>
  <div aria-label="Canvas" class="canvas" tabindex="0">
    Right-click the canvas, or focus it and press Shift+F10.
  </div>
  <Menu
    id="canvas-menu"
    items={[
      { label: "Cut", shortcut: "Ctrl+X" },
      { label: "Copy", shortcut: "Ctrl+C" },
      { label: "Paste", shortcut: "Ctrl+V" },
    ]}
  />
</ContextMenu>
```

## Accessibility

- The menu is a Menu: a `<menu>` of buttons and links, not `role="menu"` (the current Menu model, `src/docs/components/menu.astro:174-178`).
- The region itself gets no role from the component. A context menu is a shortcut, so every action in it must also be reachable another way (a "more" button, a toolbar). The docs say so in Usage, and the file-manager block keeps its row buttons.
- Discoverability: the docs recommend saying "Shift+F10" or "right-click" in nearby text or a tooltip only where the menu holds actions that exist nowhere else, which the Usage rule above already forbids.
- Focus moves into the menu on open and back on close, so screen reader users aren't left on the region with an invisible menu in the top layer.
- What axe can't catch: the focus return on close, keyboard opening on macOS (no Menu key, Shift+F10 is handled by the element), and that a nested region opens only its own menu.

Keyboard support:

| Keys                 | Where                                | Does                                                                                              |
| -------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------- |
| Shift+F10, Menu      | The region or anything focused in it | Opens the menu at the focused element and focuses the first item.                                 |
| Tab, Shift+Tab       | Open menu                            | Moves between items, as in Menu.                                                                  |
| Enter, Space         | Item                                 | Runs it; an item with `command="hide-popover"` closes the menu and focus returns to where it was. |
| Esc                  | Open menu                            | Closes it and returns focus.                                                                      |
| Up Arrow, Down Arrow | Open menu                            | Don't move between items, as in Menu (see Open questions).                                        |

## Docs page

`src/docs/components/context-menu.astro`, slug `context-menu`.

- Preamble: "Opens a menu at the pointer on right-click, and at the focused element on Shift+F10 or the Menu key." Sibling: Menu, linked both ways: replace the Menu page's Context menu section (`src/docs/components/menu.astro:163-172`) with one sentence and a link to ContextMenu, and delete `src/component-examples/menu/ContextMenu.*`, which drops the three `menu/ContextMenu.*` entries from `scripts/hand-written-examples.json` (the ledger only shrinks, so no trailer needed).
- Usage: when to use (shortcuts for actions on an item that's also reachable another way: rows, cards, a canvas); when not (the only way to reach an action; a single action: a button; a menu attached to a visible trigger: Menu).
- Sections and examples:
  1. Basics: `Basics` (the canvas with Cut, Copy, Paste).
  2. Parts and content: `Shortcuts` (items with `shortcut`), `Submenu` (a "Share" submenu), `Critical` (a `color: "critical"` Move to trash item with `borderTop`).
  3. States: `Disabled`.
  4. Composition: `TableRows` (a table where every row opens the same menu and the `contextmenuopen` event's `target` row name goes into the menu's heading; framework files hand-written, listener in framework code), `Nested` (a card inside a page region, each with its own menu).
- Accessibility slot with the notes and the KeyboardSupport partial.
- Under the hood: the anchor point, `showPopover({ source })`, and why the element waits for `pointerup`.
- `browserSupport`: `anchor-positioning`, `popover`.
- See also: Menu, Anchor.

## Blocks and other pages

- `src/blocks/file-manager.html`: wrap the files table in a ContextMenu whose menu is the existing row menu (`file-manager-row-menu`, lines 572-610), so right-clicking a row opens the same actions as its "more" button. The `contextmenuopen` listener marks the row; this block already ships without scripts, so the listener is optional and the plain version works for any row.
- `src/stress-tests/overlays.html`: a ContextMenu near each viewport edge, so the position-try fallbacks get snapshots like the other overlays (and `tests/e2e/stress-overlays.ts` picks them up).

## Files

- Add `packages/opui/components/ContextMenu/`: `ContextMenu.astro`, `types.ts`, `types.astro.ts`, and the compiled React, Svelte and Vue files and type files.
- Export `ContextMenu` and `ContextMenuProps` from the four barrels.
- Add `packages/opui/css/components/context-menu.css`; import it in the Root group of `css/components.css`.
- Add `packages/opui/elements/context-menu.js` and `.d.ts`; typings in `react/elements.ts` and `svelte/elements.ts`.
- Add `src/component-api/context-menu/api.ts` (root, `.ui-point` part, `keyboard` rows) and `src/component-api/custom-properties/context-menu.ts`.
- Add the examples in `src/component-examples/context-menu/`; delete `src/component-examples/menu/ContextMenu.*` and their ledger entries and parity snapshots.
- Add `src/docs/components/context-menu.astro`; edit `src/docs/components/menu.astro`; the showcase card.
- Add `packages/opui/skills/opui/references/context-menu.md` and its line in `index.md`; update `references/menu.md` where it describes the recipe.
- `packages/opui/README.md`: the custom element list.
- `packages/opui/CHANGELOG.md`, Added: "`ContextMenu` component (`opui-context-menu.ui-context-menu`): ...", naming `.ui-point`.
- `src/utils/whats-new.ts`: a `context-menu` "New component." note; slug in `added` and `highlighted`; and a `menu` note pointing to it.
- `docs/releases/6.0.0.md`: "- [ ] ContextMenu" (right-click, Shift+F10 on Windows and macOS, the Menu key, long press on Android, near each edge, nested regions).
- `tests/package/package.test.ts`: `"elements/context-menu.js"`.
- `packages/opui/components/AGENTS.md`: forced colors list.
- `TODO.md`: a `## To check` item for iOS long press (it fires no `contextmenu`; record what happens), added with `node scripts/todo.mjs add`.
- Generated: `public/search-index/*.json`, parity snapshots.

## Tests

- Unit: component contract, parity, naming, example coverage, component types, and the development warning for a missing menu in `tests/unit/dev-warnings.test.ts`.
- E2E in `tests/e2e/interaction.spec.ts`:
  - Right-click opens the menu with its top-left corner (inline start, block start) within a few pixels of the pointer, and in a `dir="rtl"` wrapper at the mirrored corner.
  - Shift+F10 and `ContextMenu` on a focused region open it at the focused element and focus the first item; Esc closes it and focus returns.
  - Right-clicking near the bottom edge flips the menu above the pointer.
  - A nested region opens only its own menu.
  - `disabled` lets the native menu through (the event isn't `defaultPrevented`).
  - A `contextmenuopen` listener that calls `preventDefault()` keeps the menu closed.
- Overlays stress snapshots for the edge cases (CI baselines, `update-snapshots` label).
- Engines: Firefox and WebKit through `e2e-engines`. If an engine positions the menu wrong because of an anchor positioning bug, mark it with `failingIn` in `tests/e2e/stress-overlays.ts` or `failsIn()` in the spec, with the reason from `tests/e2e/engine-bugs.ts` and a repro in `tests/e2e/engines.spec.ts`; no workaround in the CSS.

## Steps

1. Write `context-menu.css` and `elements/context-menu.js` against a hand-written HTML example; check right-click, keyboard, edges and right-to-left in `pnpm dev`.
2. Write `ContextMenu.astro`, `types.ts`, `types.astro.ts`; `pnpm build-components`; `pnpm check-ports`.
3. Barrels, element typings, `api.ts`, custom properties; no `[component-api]` problems.
4. Examples, `pnpm build-examples`, the docs page; move the Menu page's section and delete the old example and its ledger entries; `pnpm check:fast`.
5. Interaction tests; `pnpm test:e2e --project=light --project=dark -g "context-menu"`.
6. CHANGELOG, What's new, release check, skill references, README, package test, guide list, TODO item.
7. The file-manager block and the overlays stress page.
8. `pnpm check`, push, `update-snapshots` and `e2e-engines` labels.

## Open questions

1. Arrow keys: ship Up and Down in the ContextMenu element now, or wait for the Menu decision in `TODO.md:1373-1379`? Recommended: wait, and keep ContextMenu's keyboard table identical to Menu's. Native context menus are arrow-driven, which makes this the strongest case for option A of that item; resolve that item first so both get `role="menu"` and arrow keys from one shared `<opui-menu>` behavior.
2. Should ContextMenu render the `Menu` itself from an `items` prop (`<ContextMenu items={[...]}>`), like Nuxt? Recommended: no. Composing a `Menu` keeps one item model, submenus, custom items and `ListItem`, and the menu's `id` stays the reader's for `commandfor`.
3. Should the menu close when the page scrolls, like native context menus? Recommended: no. The anchor keeps it next to the point, and Menu doesn't close on scroll either.
4. Should the element add `aria-haspopup="menu"` or similar to the region? Recommended: no. There is no `role="menu"` to point to, and the region often contains its own controls; the Usage rule (every action reachable another way) carries the accessibility instead.
