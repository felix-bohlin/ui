import { components, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`Menu` component (`menu.ui-menu[popover]`), styled by `list.css` like a `List`. It requires an `id` for its trigger\'s `commandfor`, opens over `--ui-duration-slow` with `--ui-ease-enter` and closes with `--ui-ease-exit`. Opens with Invoker Commands, anchors to its trigger with no `anchor-name`, shrinks to the space on its side and flips when that side has less than `12rem`, and moves below or above its trigger when neither side fits. Browsers without `calc-size()` (Firefox and Safari) cap it at `60dvb`, flip it when it doesn\'t fit, and move it below or above its trigger, where it scrolls, when no side has room. Its placements use `self-` `position-area` keywords, so in a right-to-left part of a left-to-right page it opens from its trigger\'s right edge (not yet in Firefox, which places it toward the wrong side). Supports an `items` prop (items take native `a` and `button` attributes in every framework), `bordered` (`.ui-bordered`, a divider between items), custom `ListItem` content, placements, end alignment (`align="end"`, `.ui-align-end`), `--ui-anchor-position-area` and critical items. Items are built like `List` items, with the text in `.ui-text` and shortcuts in `.ui-end`, change color at once on hover and fade back over `--ui-duration-fast`, and a disabled link item keeps the link role (`role="link"` and `aria-disabled="true"` without `href`). Critical items read `--ui-palette-text`, and `--ui-palette-accent` on hover, the roles of the critical scope. Items take a `label`, close the whole menu on click, also from a submenu, unless they set `keepOpen`. The current item (`aria-current`) gets a check at the end instead of the bar of a `List`, drawn from `--ui-icon-check`, and the `icon-checked` slot (`iconChecked` in React and Svelte, `.ui-icon-checked`) replaces it on every item from `items`. Group headings (`li.ui-heading`) are HTML and CSS only. Submenus go in the `submenu` slot of a `ListItem`, and in right-to-left text a submenu item mirrors only the chevron `svg` in `.ui-end`, not a shortcut next to it. On iOS, submenus anchor to their parent menu instead of their trigger item, at every depth (`css/compat/menu.css`). When space is tight, the menu keeps at most 40% of the viewport height. Its border and dividers are `--ui-border-color-on-raised`, like other elevated surfaces. Open menus close when the page navigates, also through a client router, with `opui-css/elements/close-on-navigate.js`, which the component loads. A `pushState()` or `replaceState()` that keeps the path, like one that only updates the query, leaves them open.',
  notes: {
    menu: [
      {
        default: `An open menu <a href="#basics">closes when the page navigates</a>, also with a client router.`,
        html: `Import <code>opui-css/elements/close-on-navigate.js</code> to <a href="#basics">close an open menu</a> when the page navigates.`,
      },
      `Mark the <a href="#current-item">current item</a> with <code>aria-current</code>, like the language in use. It gets a check at the end.`,
      {
        astro: `A <a href="#custom-check">custom check</a>: <code>--ui-icon-check</code> for the check of your icon set, or any icon in the <code>icon-checked</code> slot.`,
        vue: `A <a href="#custom-check">custom check</a>: <code>--ui-icon-check</code> for the check of your icon set, or any icon in the <code>icon-checked</code> slot.`,
        react: `A <a href="#custom-check">custom check</a>: <code>--ui-icon-check</code> for the check of your icon set, or any icon in the <code>iconChecked</code> prop.`,
        svelte: `A <a href="#custom-check">custom check</a>: <code>--ui-icon-check</code> for the check of your icon set, or any icon in the <code>iconChecked</code> snippet.`,
        html: `A <a href="#custom-check">custom check</a>: <code>--ui-icon-check</code> for the check of your icon set, or any icon in <code>.ui-icon-checked</code>.`,
      },
      `The border and dividers are <a href="#api"><code>--ui-border-color-on-raised</code></a>, like other elevated surfaces.`,
      `Items are built like <code>List</code> items, with start and end icons, text and shortcuts (<a href="#basics">Basics</a>).`,
      {
        ...components(
          `New component. A <a href="#basics">popover menu</a> that anchors to its trigger, with groups and submenus, built on <code>Menu</code> and <code>ListItem</code>. No JavaScript.`,
        ),
        html: `New component. A <a href="#basics">popover menu</a> that anchors to its trigger, with groups and submenus. No JavaScript.`,
      },
      {
        astro: `<a href="#submenu">Submenus</a> with the <code>submenu</code> slot on <code>ListItem</code>.`,
        vue: `<a href="#submenu">Submenus</a> with the <code>submenu</code> slot on <code>ListItem</code>.`,
        react: `<a href="#submenu">Submenus</a> with the <code>submenu</code> prop on <code>ListItem</code>.`,
        svelte: `<a href="#submenu">Submenus</a> with the <code>submenu</code> snippet on <code>ListItem</code>.`,
      },
      `Menus shrink to the space on their side and flip when it's less than <code>12rem</code> (<a href="#placement">Placement</a>).`,
      {
        default: `<a href="#bordered">Dividers between items</a> with the <code>bordered</code> prop.`,
        html: `<a href="#bordered">Dividers between items</a> with <code>.ui-bordered</code>.`,
      },
      components(
        `<code>color="critical"</code> on a <code>ListItem</code> marks a destructive <a href="#custom">custom item</a>.`,
      ),
      components(
        `A <code>Menu</code> without an <code>id</code> warns in development, since its trigger and items point at it (<a href="#basics">Basics</a>).`,
      ),
      `<a href="#basics">Items</a> highlight at once on hover and fade back over <code>--ui-duration-fast</code>, so the highlight trails the pointer.`,
      `Themes can make a menu spring open with <a href="#api"><code>--ui-ease-move</code></a>. It closes with <code>--ui-ease-exit</code>.`,
    ],
  },
} satisfies Change
