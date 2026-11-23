import type { ComponentApi } from "../types"

export default {
  component: "PasswordToggle",
  css: ["button", "field"],
  elements: [
    {
      members: [
        {
          description:
            "Hides the password: sets the input's `type` back to `password` and the toggle's `aria-pressed` to `false`. The element calls it when the form resets or submits.",
          kind: "method",
          name: "hidePassword()",
        },
        {
          description:
            "The `<input>` its button's `commandfor` names, or `null`. Read-only.",
          kind: "property",
          name: "input",
        },
        {
          description:
            "Shows the password: sets the input's `type` to `text` and the toggle's `aria-pressed` to `true`.",
          kind: "method",
          name: "showPassword()",
        },
      ],
      tag: "opui-password-toggle",
    },
  ],
  notes: {
    default:
      "Put it in the field's `end` slot, next to a `type=\"password\"` input, and leave that part out of the input's `aria-describedby` when it only holds the toggle. It loads `opui-css/elements/password-toggle.js`, which runs the button. Attributes that aren't props, `class` and `style` go to the `<opui-password-toggle>`, which has `display: contents`, not to the button.",
    react:
      "Put it in the field's `end`, next to a `type=\"password\"` input, and leave that part out of the input's `aria-describedby` when it only holds the toggle. It loads `opui-css/elements/password-toggle.js`, which runs the button. Attributes that aren't props, `className` and `style` go to the `<opui-password-toggle>`, which has `display: contents`, not to the button.",
    html: 'Put `<opui-password-toggle>` in `.ui-end`, around a `.ui-button.ui-round` with `aria-pressed="false"`, `commandfor` naming the input and `command="--toggle-password"`, and import `opui-css/elements/password-toggle.js`. Leave `.ui-end` out of the input\'s `aria-describedby` when it only holds the toggle.',
  },
  options: [
    {
      description:
        "The `id` of the password input the toggle shows and hides, as its button's `commandfor`.",
      frameworks: ["astro", "solid", "svelte", "vue"],
      prop: "for",
      type: "string",
    },
    {
      description:
        "The `id` of the password input the toggle shows and hides, as `htmlFor` like on a label, and its button's `commandfor`.",
      frameworks: ["react"],
      prop: "htmlFor",
      type: "string",
    },
    {
      attribute: "aria-label",
      default: '"Show password"',
      description: "The accessible name of the toggle. Pass it translated.",
      group: "Label",
      prop: "label",
    },
  ],
  page: "text-field",
  parts: [],
  root: {
    code: "<opui-password-toggle>",
    description:
      'A `.ui-button.ui-round` with `aria-pressed` and `command="--toggle-password"` that shows and hides the password. Renders an eye in `.ui-icon-unchecked` and a crossed-out eye in `.ui-icon-checked` by default, or the icons in `icon-unchecked` and `icon-checked`, and shows one of them. Disabled while the input is disabled, and `aria-disabled` while the input is `aria-disabled`. `<opui-password-toggle>` keeps it in step, also when a script changes the input, and hides the password when the input is disabled. Hidden until `<opui-password-toggle>` is defined.',
    selector: "opui-password-toggle > .ui-button",
  },
  slots: [
    {
      description: "The icon while the password is hidden.",
      name: "icon-unchecked",
    },
    {
      description: "The icon while the password shows.",
      name: "icon-checked",
    },
  ],
  source: "PasswordToggle",
} satisfies ComponentApi
