import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`TextField`, `Textarea` and `Select` render a `div` root with a `<label for>` inside, instead of a `<label>` around the whole field, so a field can hold buttons in its `start` and `end` affixes without a label holding them. The label alone names the control: the affixes no longer join the name, so no word order is baked into it. A click on the start or end text, an affix or the `top` or `bottom` part no longer focuses the control, since only the label is a `<label>`. Give a field without `label` an `aria-label` or `aria-labelledby`, target `.ui-text-field`, `.ui-textarea` and `.ui-select` instead of `label.ui-text-field`, `label.ui-textarea` and `label.ui-select` in your CSS, and in HTML give the control an `id` for the label's `for`. `Select` marks the `<button>` inside the `<select>` `inert`, so the select alone takes clicks, focus and the name, also where the browser doesn't render the button; mark it `inert` in HTML too.",
  migrating: ["select", "text-field", "textarea"],
  notes: {
    select: {
      default: `the root is a <code>&lt;div&gt;</code> with a <code>&lt;label for&gt;</code> inside. The label alone <a href="#accessibility">names the select</a>, and the affixes describe it with the start and end text, so they're read after the name. A click on them no longer opens the select.`,
      html: `give the root <code>&lt;div class="ui-select"&gt;</code> a <code>&lt;label class="ui-label" for&gt;</code> that <a href="#accessibility">names the select</a> alone, and describe it with the affixes and the start and end text through <code>aria-describedby</code>. Mark the select's <code>&lt;button&gt;</code> <code>inert</code>, so the select alone takes clicks, focus and the name.`,
    },
    "text-field": {
      default: `the root is a <code>&lt;div&gt;</code> with a <code>&lt;label for&gt;</code> inside, so the <a href="#affix">affixes</a> can hold buttons. The label alone <a href="#accessibility">names the field</a>, and the start text, top, affixes, bottom and end text describe it through <code>aria-describedby</code>, so a unit, a hint or an error is read after the name, in any language's word order. A click on them no longer focuses the field. The ids start with the <code>id</code>: <code>x-start-text</code>, <code>x-start</code>, <code>x-end-text</code> and so on for <code>id="x"</code>.`,
      html: `give the root <code>&lt;div class="ui-text-field"&gt;</code> a <code>&lt;label class="ui-label" for&gt;</code> that <a href="#accessibility">names the field</a> alone, and describe it with the start text, the affixes and the end text through <code>aria-describedby</code>, so a unit, a hint or an error is read after the name, not in it.`,
    },
    textarea: {
      default: `the root is a <code>&lt;div&gt;</code> with a <code>&lt;label for&gt;</code> inside, so the <a href="#affix">affixes</a> can hold buttons. The label alone <a href="#accessibility">names the field</a>, and the start text, top, affixes, bottom and end text describe it through <code>aria-describedby</code>, so a unit, a hint or an error is read after the name, in any language's word order. A click on them no longer focuses the field.`,
      html: `give the root <code>&lt;div class="ui-textarea"&gt;</code> a <code>&lt;label class="ui-label" for&gt;</code> that <a href="#accessibility">names the field</a> alone, and describe it with the start text, the affixes and the end text through <code>aria-describedby</code>, so a unit, a hint or an error is read after the name, not in it.`,
    },
  },
} satisfies Change
