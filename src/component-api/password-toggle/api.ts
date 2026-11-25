import type { ComponentApi } from "../types"

export default {
  component: "PasswordToggle",
  css: ["button", "field"],
  elements: [
    {
      members: [
        {
          description: "Hides the password, as on a form reset or submit.",
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
          description: "Shows the password.",
          kind: "method",
          name: "showPassword()",
        },
      ],
      tag: "opui-password-toggle",
    },
  ],
  notes: {
    default:
      'Put it in `end`, next to a `type="password"` input. It loads `opui-css/elements/password-toggle.js`. Attributes that aren\'t props, `class` and `style` go to the `<opui-password-toggle>`, not the button.',
    react:
      'Put it in `end`, next to a `type="password"` input. It loads `opui-css/elements/password-toggle.js`. Attributes that aren\'t props, `className` and `style` go to the `<opui-password-toggle>`, not the button.',
    html: 'Put `<opui-password-toggle>` in `.ui-end`, around a `.ui-button.ui-round` with `aria-pressed="false"`, `command="--toggle-password"` and `commandfor` naming the input, and import `opui-css/elements/password-toggle.js`.',
  },
  options: [
    {
      description:
        "The `id` of the password input, as its button's `commandfor`.",
      frameworks: ["astro", "solid", "svelte", "vue"],
      prop: "for",
      type: "string",
    },
    {
      description:
        "The `id` of the password input, as its button's `commandfor`.",
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
      "A `.ui-button.ui-round` with `aria-pressed` that shows and hides the password, with an eye in `.ui-icon-unchecked` and a crossed-out eye in `.ui-icon-checked`, or your icons. It follows the input's `disabled` and `aria-disabled`, and stays hidden until `<opui-password-toggle>` is defined.",
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
