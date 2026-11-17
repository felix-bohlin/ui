import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Avatar`, `Button`, `Checkbox`, `Chip`, `ControlGroup`, `Dialog`, `Drawer`, `Fieldset`, `List`, `Radio`, `Switch`, `Tabs` and `ToggleGroup` keep the attributes they set, such as `aria-labelledby`, `role` and `type`, when a caller passes the same attribute as `undefined` or `null`, as a wrapper that forwards its props does. This holds for every component in React, Svelte and Vue, and in Astro for the components that render a dynamic tag or a custom element.",
  notes: {
    switch: {
      react: `A switch without a <a href="#visible-label">label</a>, <code>aria-label</code> or <code>aria-labelledby</code> warns in development.`,
      svelte: `A switch without a <a href="#visible-label">label</a>, <code>aria-label</code> or <code>aria-labelledby</code> warns in development.`,
      vue: `A switch without a <a href="#visible-label">label</a>, <code>aria-label</code> or <code>aria-labelledby</code> warns in development.`,
    },
  },
} satisfies Change
