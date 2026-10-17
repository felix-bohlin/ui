import type { ComponentApi } from "../types"

export default {
  component: "Menu",
  css: ["list", "menu"],
  notes: {
    astro:
      "Other attributes go to the `<menu>`. Item keys that aren't listed go to the item's `<a>` or `<button>`, like `target` or `data-*`.",
    html: 'Items are built like `List` items: icons in `.ui-start`, the text in `.ui-text` and shortcuts in `.ui-end`. Open the menu with a button that has `commandfor` set to the menu id and `command="toggle-popover"`.',
    react:
      "Attributes that aren't props go to the `<menu>`. Item keys that aren't listed go to the item's `<a>` or `<button>`, like `onClick`, `target` or `data-*`.",
    svelte:
      "Attributes that aren't props go to the `<menu>`. Item keys that aren't listed go to the item's `<a>` or `<button>`, like `onclick`, `target` or `data-*`.",
    vue: "Attributes that aren't props go to the `<menu>`. Item keys that aren't listed go to the item's `<a>` or `<button>`, like `target` or `data-*`.",
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
      cssVar: "--anchor-position-area",
      default: '"block-end span-inline-end"',
      description:
        "Any valid `position-area` value. Overrides the placement and alignment classes.",
      frameworks: ["html"],
      group: "Position",
      prop: "anchorPositionArea",
    },
    {
      default: "false",
      description: "Adds a border between the items.",
      frameworks: ["astro", "react", "svelte", "vue"],
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
        "Closes the menu when the item is clicked, with `commandfor` set to the root menu id, so an item in a submenu closes the whole menu (`closeOnClick` on an item, `true` by default). Button items only: a link item doesn't close the menu.",
      frameworks: ["html"],
      group: "Close on click",
      part: "li > button",
      prop: "closeOnClick",
    },
    {
      class: ".ui-critical",
      description: "A destructive item (`critical` on an item).",
      frameworks: ["html"],
      group: "Colors",
      part: "li",
      prop: "critical",
    },
    {
      class: ".ui-dense",
      default: "false",
      description: "Less spacing.",
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
        "The items, as `{ borderTop, closeOnClick, critical, disabled, href, shortcut, text }` objects. An item renders a `<button>`, or an `<a>` with `href`. Other keys go to that element. A button item closes the whole menu, also from a submenu, unless `closeOnClick` is `false`.",
      prop: "items",
    },
    {
      default: '"block-end"',
      description: "Where the menu opens.",
      group: "Placement",
      prop: "placement",
      values: {
        "block-end": null,
        "block-start": ".ui-block-start",
        "inline-end": ".ui-inline-end",
        "inline-start": ".ui-inline-start",
      },
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
      code: "<li>",
      description:
        "An item, holding a `<button>` or an `<a>` with `href`. Rendered from `items`, or a `ListItem` in the default slot.",
      selector: ".ui-menu > li",
      slots: ["default"],
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
    {
      code: "li.ui-label",
      description: "A group label. HTML and CSS only.",
      selector: ".ui-menu > li.ui-label",
    },
  ],
  root: {
    anchorName: "--ui-menu-root",
    description: "The menu surface, a popover anchored to its trigger.",
    selector: "menu.ui-menu.ui-list[popover]",
  },
  source: "Menu",
} satisfies ComponentApi
