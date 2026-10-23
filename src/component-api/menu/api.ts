import { components } from "../frameworks.ts"
import type { ComponentApi } from "../types"

export default {
  component: "Menu",
  css: ["list", "menu"],
  notes: {
    ...components(
      "Attributes that aren't props go to the `<menu>`. Item keys that aren't listed go to the item's `<a>` or `<button>`, like `target` or `data-*`.",
    ),
    html: 'Items are built like `List` items: icons in `.ui-start`, the text in `.ui-text` and shortcuts in `.ui-end`. Open the menu with a button that has `commandfor` set to the menu id and `command="toggle-popover"`.',
    react:
      "Attributes that aren't props go to the `<menu>`. Item keys that aren't listed go to the item's `<a>` or `<button>`, like `onClick`, `target` or `data-*`.",
    svelte:
      "Attributes that aren't props go to the `<menu>`. Item keys that aren't listed go to the item's `<a>` or `<button>`, like `onclick`, `target` or `data-*`.",
  },
  options: [
    {
      default: '"start"',
      description: "Which edge of the trigger the menu lines up with.",
      group: "Alignment",
      prop: "align",
      values: { end: ".ui-align-end", start: null },
    },
    {
      cssVar: "--ui-anchor-position-area",
      default: '"self-block-end span-self-inline-end"',
      description:
        "Any valid `position-area` value. Overrides the side and alignment classes. The `self-` keywords follow the menu's own direction, so the placement mirrors in a right-to-left part of a left-to-right page.",
      frameworks: ["html"],
      group: "Position area",
      prop: "anchorPositionArea",
    },
    {
      default: "false",
      description: "Adds a border between the items.",
      prop: "bordered",
    },
    {
      description:
        "A border between every item (`bordered`), or above one item (`borderTop` on an item).",
      frameworks: ["html"],
      group: "Borders",
      prop: "borders",
      values: { borderTop: "li.ui-border-top", bordered: ".ui-bordered" },
    },
    {
      attribute: '[command="hide-popover"]',
      description:
        "Closes the whole menu on click, also from a submenu. Button items only.",
      frameworks: ["html"],
      group: "Close on click",
      part: "li > button",
      prop: "closeOnClick",
    },
    {
      description: 'A destructive item (`color: "critical"` on an item).',
      frameworks: ["html"],
      group: "Colors",
      prop: "critical",
      values: {
        control: "li > :is(a, button).ui-critical",
        item: "li.ui-critical",
      },
    },
    {
      class: ".ui-dense",
      default: "false",
      description: "Packs the items tighter.",
      group: "Dense",
      prop: "dense",
    },
    {
      description:
        "Disables an item (`disabled` on an item). A disabled link has no `href`.",
      frameworks: ["html"],
      group: "State",
      prop: "disabled",
      values: {
        button: "li > button[disabled]",
        link: 'li > a[aria-disabled="true"]',
      },
    },
    {
      description:
        "The id of the menu, which the trigger's `commandfor` points at. Generated when omitted.",
      prop: "id",
    },
    {
      description:
        "The items, as `{ borderTop, closeOnClick, color, disabled, href, shortcut, text }` objects. Other keys go to the item's `<a>` or `<button>`.",
      prop: "items",
    },
    {
      default: '"auto"',
      description:
        "The popover type. With `\"manual\"`, Esc and a click outside don't close the menu, and opening another menu doesn't either.",
      group: "Behavior",
      prop: "popover",
      values: { auto: null, manual: '[popover="manual"]' },
    },
    {
      default: '"block-end"',
      description: "The side of the trigger the menu opens on.",
      group: "Position",
      prop: "side",
      values: {
        "block-end": null,
        "block-start": ".ui-block-start",
        "inline-end": ".ui-inline-end",
        "inline-start": ".ui-inline-start",
      },
    },
    {
      attribute: '[commandfor][command="toggle-popover"]',
      description: "Opens the menu. `commandfor` is the menu id.",
      frameworks: ["html"],
      group: "Trigger",
      part: "button",
      prop: "trigger",
    },
  ],
  parts: [
    {
      code: "li.ui-label",
      description: "A group label. HTML and CSS only.",
      selector: ".ui-menu > li.ui-label",
    },
    {
      code: "<li>",
      description:
        "An item, holding a `<button>` or an `<a>` with `href`. Rendered from `items`, or a `ListItem` in the default slot.",
      selector: ".ui-menu > li",
    },
    {
      code: ".ui-start",
      description: "Optional content at the start, such as an icon.",
      selector: ".ui-menu > li > :is(a, button) > .ui-start",
    },
    {
      code: ".ui-text",
      description: "The text (`text` on an item).",
      selector: ".ui-menu > li > :is(a, button) > .ui-text",
    },
    {
      code: ".ui-end",
      description:
        "Optional content at the end, such as a shortcut in a `<kbd>` (`shortcut` on an item).",
      selector: ".ui-menu > li > :is(a, button) > .ui-end",
    },
  ],
  root: {
    anchorName: "--ui-menu-root",
    description: "The menu surface, a popover anchored to its trigger.",
    selector: "menu.ui-menu.ui-list[popover]",
  },
  slots: [{ description: "The items, such as `ListItem`s.", name: "default" }],
  source: "Menu",
} satisfies ComponentApi
