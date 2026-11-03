import { components } from "../frameworks.ts"
import type { ComponentApi } from "../types"

export default {
  component: "Command",
  css: ["command", "list"],
  keyboard: [
    {
      description:
        "Activates the selected option: follows its link or presses its button. With Ctrl, Cmd or Shift, a link opens like a click with that key.",
      keys: ["Enter"],
    },
    {
      description:
        "In the input, moves to the next or previous option, and wraps around at either end. Focus stays in the input.",
      keys: ["Up Arrow", "Down Arrow"],
    },
    {
      description:
        "Filters the options to the ones whose text or `data-keywords` hold every word typed, and selects the first.",
      keys: ["Printable characters"],
    },
  ],
  notes: {
    ...components(
      "Attributes that aren't props go to the root `<opui-command>`. The input, the arrow keys and the filter work once the component hydrates, or once the page imports `opui-css/elements/command.js`; the Astro component loads it.",
    ),
    html: 'Put a `.ui-header` with an `input` and a `.ui-content` with `ul.ui-list` groups of links or buttons in `<opui-command class="ui-command">`, end it with `<p role="status">`, and import `opui-css/elements/command.js`. The element adds the combobox and listbox roles. Until it loads, the input is hidden and the options are a list of links and buttons.',
  },
  options: [
    {
      attribute: "[empty-label]",
      default: '"No results"',
      description:
        "The text shown and announced when the typed text matches no option.",
      group: "Label",
      prop: "emptyLabel",
    },
    {
      attribute: "[filter]",
      default: '"auto"',
      description:
        'How the options are filtered. `"none"` leaves it to your code, which renders the options that match.',
      group: "Behavior",
      prop: "filter",
      values: { auto: null, none: '[filter="none"]' },
    },
    {
      default: '"transparent"',
      description: "The variant to use.",
      group: "Variants",
      prop: "variant",
      values: { outlined: ".ui-outlined", transparent: null },
    },
  ],
  parts: [
    {
      code: "<div>",
      component: "CommandInput",
      description:
        "The search icon and the input, which the element makes a combobox. Attributes go to the `input`, which needs an `aria-label` or `aria-labelledby`.",
      selector: ".ui-header",
    },
    {
      component: "CommandList",
      description:
        "The scrollable listbox of options, named after the input unless it has a name of its own.",
      selector: ".ui-content",
    },
    {
      component: "CommandGroup",
      description:
        "A group of options with an optional label. A group with no matching option is hidden.",
      selector: ".ui-command-group",
    },
    {
      code: "<a>, <button>",
      description:
        "An option: a link or a button in a list item, like a clickable `ListItem`. `data-keywords` adds words it matches.",
      selector: ".ui-list > li > :is(a, button)",
    },
    {
      code: '<p role="status">',
      description:
        "The live region that shows and announces `emptyLabel` when nothing matches.",
      props: ["emptyLabel"],
      selector: 'p[role="status"]',
    },
  ],
  root: {
    description:
      "The `<opui-command>` custom element, a column with the input above the options.",
    selector: "opui-command.ui-command",
  },
  slots: [
    {
      description: "The `CommandInput`, the `CommandList` and anything else.",
      name: "default",
    },
  ],
  source: "Command",
} satisfies ComponentApi
