import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`SelectAll` component (`opui-select-all.ui-select-all`, `display: contents`), documented on the Checkbox page. Around a group such as a `Fieldset` or a `Table`, the `<opui-select-all>` element makes the checkbox marked `data-select-all` check and uncheck the other enabled checkboxes inside, with `click()` so their own change handlers and bindings follow, and keeps it checked when they all are and `indeterminate` when some are, also after a form reset. The Astro component loads the element, and React, Svelte and Vue load it on the client.",
  notes: {
    checkbox: [
      {
        html: `<code>checkbox.js</code> keeps <code>indeterminate</code> in step when <code>data-indeterminate</code> changes or a checkbox is added, without a call (<a href="#indeterminate">Indeterminate</a>).`,
      },
      {
        default: `<a href="#select-all"><code>SelectAll</code></a> makes a <code>data-select-all</code> checkbox check and uncheck the others in a group, and shows it indeterminate when some are checked, with the <code>&lt;opui-select-all&gt;</code> custom element, which the component loads.`,
        html: `<a href="#select-all"><code>&lt;opui-select-all&gt;</code></a> makes a <code>data-select-all</code> checkbox check and uncheck the others in a group, and shows it indeterminate when some are checked. Import <code>opui-css/elements/select-all.js</code>.`,
      },
    ],
  },
} satisfies Change
