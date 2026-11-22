# InputTags: implementation plan

Status: plan only. This PR carries the plan; the implementation lands on this branch in later commits.

## Summary

InputTags is a text field that turns what you type into a row of removable chips, one per value, and submits every value with the form under one name. The `<opui-input-tags>` custom element turns Enter, the delimiter and pastes into chips, removes them with a button or Backspace, and keeps a hidden input per chip, so the values reach `FormData`, server actions and plain form posts like any other field.

## Why

- Nuxt UI ships `UInputTags` (`@nuxt/ui` 4.12.0, `dist/runtime/components/InputTags.vue`): a `modelValue` array, `maxLength`, `delimiter`, `addOnPaste`, `addOnBlur`, `duplicate`, `deleteIcon`, the `addTag`, `removeTag` and `invalid` events, and the usual `color`, `variant`, `size` and `ui` props. We take the behavior (delimiter, paste, blur, duplicates, a maximum, Backspace to remove) and the events. We leave `color` (a field has no paint of its own here), `autofocusDelay`, the icon props (our slots replace them) and the `ui` prop.
- Where the repo needs it today:
  - The blog-list block marks up each post's tags as a hand-made row of chips (`src/blocks/blog-list.html:105`, repeated at lines 148, 188, 228, 265, 302 and 342). There is no way to edit such a list.
  - `Chip` has no remove control: its types offer `start`, `end` and `label` slots only (`packages/opui/components/Chip/types.ts:25-29`), so a removable chip today means hand-wiring a button and a script.
  - The library already puts behavior that HTML can't give into light DOM custom elements (`packages/opui/elements/text-field.js`, `number-field.js`, `toaster.js`), and Command on `origin/feat/command` is the newest one to follow.

## Scope

- In:
  - Free text entry: Enter and the delimiter add a tag, a paste with delimiters adds several, blur adds the pending text when `add-on-blur` is set.
  - Remove with the chip's button, with Backspace or Delete on a focused chip button, and Backspace in an empty entry moves focus to the last chip.
  - Duplicates rejected by default (case-insensitive), a maximum count, `required`, form reset and form submission.
  - Sizes and the `filled` variant shared with TextField.
  - Announcements for added and removed tags.
- Out:
  - Suggestions while typing (a combobox). The entry input takes a `list` attribute through `...rest`, so a native `<datalist>` gives suggestions for free; a filtered popup belongs with Command (PR #423) and waits for that to land.
  - Drag to reorder chips, editing a chip in place, and chips with severities. Each needs its own design pass.
  - Object values (Nuxt's generic `T`). Tags are strings, which is what a form submits.

## Markup and CSS

The element extends a TextField: same root class, label, field, end text and sizes, so it lines up with the fields around it.

```html
<opui-input-tags
  class="ui-text-field ui-input-tags"
  added-label="Added {tag}"
  name="topics"
  remove-label="Remove {tag}"
  removed-label="Removed {tag}"
>
  <label class="ui-label" for="topics-entry" id="topics-entry-label"
    >Topics</label
  >
  <span class="ui-field">
    <ul class="ui-tags" aria-labelledby="topics-entry-label">
      <li class="ui-chip ui-small">
        <span class="ui-label">Accessibility</span>
        <input name="topics" type="hidden" value="Accessibility" />
        <button
          aria-label="Remove Accessibility"
          class="ui-remove"
          type="button"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" width="24" height="24">
            <path
              fill="currentColor"
              d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
            />
          </svg>
        </button>
      </li>
      <li class="ui-chip ui-small">
        <span class="ui-label">CSS</span>
        <input name="topics" type="hidden" value="CSS" />
        <button aria-label="Remove CSS" class="ui-remove" type="button">
          ...
        </button>
      </li>
    </ul>
    <input
      aria-describedby="topics-entry-end-text"
      autocomplete="off"
      enterkeyhint="enter"
      id="topics-entry"
      type="text"
    />
  </span>
  <span class="ui-end-text" id="topics-entry-end-text"
    >Press Enter or type a comma to add a topic.</span
  >
  <span class="ui-sr-only" role="status"></span>
</opui-input-tags>
```

- The root keeps `.ui-text-field`, so `text-field.css` draws the label, the field border, focus, `:user-invalid`, sizes and `.ui-filled`; `.ui-input-tags` only adds the wrapping row. The entry input has no `name`: only the hidden inputs submit, so leftover text never reaches the server.
- New stylesheet `packages/opui/css/components/input-tags.css`. It has to beat `text-field.css` on the same element (the field becomes a wrapping flex row and the input shrinks to its content), so it declares `components.extended` and goes in the Extended group of `css/components.css`, after `text-field.css` (add `input-tags.css` to `BUILDS_ON` in `tests/unit/layers.test.ts` if the test asks for it). Keep the group in ascending order apart from that `BUILDS_ON` constraint, the same exception `one-time-code.css` uses after `text-field.css`.
- Rules, all under `:where(.ui-input-tags)`:
  - `.ui-field`: `flex-wrap: wrap`, `align-items: center`, `gap: var(--ui-space-1)`, `padding-block: var(--ui-space-1)`, `min-block-size: var(--_size)`, `block-size: auto`, so the field grows a row at a time.
  - `> .ui-field > .ui-tags`: `display: contents`, list reset (`list-style: none`, `margin: 0`, `padding: 0`), so the chips and the input share one flex row.
  - `> .ui-field > input`: `flex: 1 1 8ch`, `min-inline-size: 8ch`, `field-sizing: content` where supported (an `@supports` block that only turns a feature on, allowed by the Browser support rules).
  - `.ui-chip > .ui-remove` goes in `chip.css`, not here, so a plain Chip can reuse it (open question 4): a round icon button sized `1lh`, `--_hover-bg-color` from the chip's own hover role, with a `:focus-visible` ring from `--ui-focus-ring-*`. The `svg` is `1em`.
  - Sizes: the chip size follows the field (`.ui-x-small` and `.ui-small` fields use `ui-x-small` chips, `medium` uses `ui-small`, `large` uses `ui-medium`). The element picks the chip class from the root's size class, and the components render the same, so no CSS reaches into `.ui-chip` sizes.
  - `.ui-filled` field: chips stay `tonal`, which already contrasts on `--ui-surface-filled`. Verify with `tests/unit/contrast.test.ts`; if a pair fails, switch the chips to `--ui-surface` there, not a new token.
- Roles read: `--ui-space-1`, `--ui-space-2`, `--ui-focus-ring-*` (through the chip button), the TextField roles it inherits. No new theme token.
- `--_*` declared: `--_tag-gap` (default `var(--ui-space-1)`), documented in `src/component-api/custom-properties/input-tags.ts`.
- Features for `browserSupport`: `field-sizing`, `has` (the field's `:has(> .ui-tags > li)` state that drops the placeholder), `user-pseudos` (inherited invalid styling). No compat fallback: without `field-sizing` the input keeps its flex basis, which is the browser default the `@supports` block falls back to.
- Forced colors: no block. The chip border and the field border are real borders; the remove button is an icon in `currentColor`. Add `InputTags` to the "without a block" list in section 9 of `packages/opui/components/AGENTS.md` with that reason.
- More contrast: nothing of its own; the chip and field roles follow the knobs.
- Motion: a new chip appears at once, like Checkbox: typing must never look unheard. Only the remove button's hover halo transitions over the chip's `--_duration`.
- Right-to-left: everything is logical, and the flex row follows the direction. Backspace moves focus to the chip before the entry in DOM order, which is the visual inline start side in both directions.

## Behavior

The platform gives the text input, the hidden inputs that submit, reset of the entry text and `required` on nothing useful (hidden inputs are barred from constraint validation). The element adds the rest. `packages/opui/elements/input-tags.js` (with `input-tags.d.ts`), light DOM, `extends Base` like `text-field.js`, defined as `opui-input-tags`.

Form participation, decided: hidden native inputs, not `ElementInternals`.

- A hidden `<input name>` per chip puts every value in `FormData` with no script at all, so server-rendered tags submit even before the element loads, in a form posted to the server, with htmx, Turbo or a React server action.
- `ElementInternals` (`static formAssociated`) would submit nothing until the script runs, needs `formResetCallback` and `formStateRestoreCallback` to match what hidden inputs already do, and the framework components would render a value the server never sees.
- Validation lives on the entry input instead: the element calls `setCustomValidity()` on it, so the native `:user-invalid` styling of `text-field.css`, `reportValidity()` and the form's submit block all work unchanged.

Attributes (all observed):

| Attribute       | Default           | Effect                                                                                                                        |
| --------------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `add-on-blur`   | off               | Leaving the entry adds its pending text.                                                                                      |
| `added-label`   | `"Added {tag}"`   | The status message after a tag is added. `{tag}` is replaced by the value, so a translation puts it where its language needs. |
| `delimiter`     | `","`             | Typing it adds the pending text. A paste is split on it and on newlines.                                                      |
| `duplicates`    | off               | Allows a tag that already exists. Off compares case-insensitively after trimming.                                             |
| `max`           | none              | The most tags. At the limit the entry gets `readonly` and the end text keeps its message.                                     |
| `name`          | none              | The `name` of every hidden input.                                                                                             |
| `remove-label`  | `"Remove {tag}"`  | The `aria-label` of each remove button.                                                                                       |
| `removed-label` | `"Removed {tag}"` | The status message after a tag is removed.                                                                                    |
| `required`      | off               | No tags makes the entry invalid with `valueMissing`.                                                                          |

Properties and methods: `readonly input: HTMLInputElement | null`, `readonly tags: HTMLLIElement[]`, `value: string[]` (getter returns the values in order; setter replaces the chips), `add(value: string): boolean`, `remove(value: string): boolean`.

Events, dispatched on the element and bubbling:

- `tagadd` and `tagremove`, both cancelable, with `detail: { value }`. Calling `preventDefault()` keeps the change from happening, which is how an app validates a value (an email shape, a server check).
- `change`, after any add or remove, so a form-wide `change` listener sees it like on any field.
- `taginvalid`, with `detail: { value, reason }` where `reason` is `"duplicate"`, `"empty"` or `"max"`. The entry keeps the text, so the user can fix it.

Lifecycle:

- `connectedCallback`: one `AbortController`; listeners for `keydown`, `input`, `paste`, `focusout` and `click` on the element; a capture `reset` listener on the owner document filtered to `this.input.form` (the pattern at `packages/opui/elements/text-field.js:19-27`); a snapshot of the initial values for reset; `#sync()` now and in a microtask (frameworks add children after connect, like `text-field.js:28-29`).
- `reset`: after the native reset, `setTimeout` (the NumberField approach, `packages/opui/elements/number-field.js:35-41`) restores the snapshot chips and clears the validity.
- Adding a chip clones the first `li.ui-chip` when there is one (so classes and the remove icon match what the server rendered); otherwise it builds the markup above. The remove icon comes from `packages/opui/components/InputTags/icons.ts`, which the element and the components import, so the shape is written once (the Callout and Drawer icons in `tests/unit/elements.test.ts:46-59` show the test pattern).
- The status region gets its message set to empty and then to the new text in a `requestAnimationFrame`, so the same message twice is still announced.

## Component API

One component, `InputTags`, compiled by `pnpm build-components` from `InputTags.astro`. It renders `opui-input-tags` and loads the element with a `<script>` import, like `TextField.astro` loads `character-count.js` and `text-field.js`.

Props (`types.ts`, sorted):

| Prop           | Type                                          | Default           | Renders                                               |
| -------------- | --------------------------------------------- | ----------------- | ----------------------------------------------------- |
| `addOnBlur`    | `boolean`                                     | `false`           | `add-on-blur`                                         |
| `addedLabel`   | `string`                                      | `"Added {tag}"`   | `added-label`                                         |
| `delimiter`    | `string`                                      | `","`             | `delimiter`                                           |
| `duplicates`   | `boolean`                                     | `false`           | `duplicates`                                          |
| `endText`      | `string`                                      |                   | `.ui-end-text`, linked with `aria-describedby`        |
| `error`        | `boolean`                                     | `false`           | `aria-invalid="true"` on the entry                    |
| `hideLabel`    | `boolean`                                     | `false`           | `.ui-sr-only` on the label                            |
| `label`        | `string`                                      |                   | `.ui-label`                                           |
| `max`          | `number`                                      |                   | `max`                                                 |
| `name`         | `string`                                      |                   | `name` on the element and on every hidden input       |
| `removeLabel`  | `string`                                      | `"Remove {tag}"`  | `remove-label`, and the initial buttons' `aria-label` |
| `removedLabel` | `string`                                      | `"Removed {tag}"` | `removed-label`                                       |
| `required`     | `boolean`                                     | `false`           | `required`                                            |
| `size`         | `"x-small" \| "small" \| "medium" \| "large"` | `"medium"`        | `.ui-<size>`                                          |
| `value`        | `string[]`                                    | `[]`              | one chip per value                                    |
| `variant`      | `"outlined" \| "filled"`                      | `"outlined"`      | `.ui-filled`                                          |

- Slots: `label`, `end-text` (rich content, like TextField), `remove-icon` (replaces the default `svg` in every remove button, the `<part>-icon` naming rule next to `removeLabel`).
- `...rest` goes onto the entry input (the form-control rule in section 0 of the guide), so `placeholder`, `list`, `autocomplete` and `aria-*` reach it.
- `model`: `value` in `src/component-api/input-tags/api.ts`, so Vue gets `defineModel` and Svelte `$bindable()`. The binding listens to the element's `change` event and reads `element.value`.
- React: `defaultValue: string[]` (read once) and `onValueChange(value: string[])`, the ToggleGroup naming. React never re-renders the chip list after the first render: the element owns those nodes, the same way `opui-toaster` owns its toasts. Controlled `value` in React is an open question below.
- If `build-components` refuses the `{tag}` replacement or the `defaultValue` split, list the React file in `scripts/hand-written-components.json` with the compiler's reason and port it with `/port-component InputTags` (needs the `Ledger-Change: intended` trailer).
- Element typings: `"opui-input-tags"` in `packages/opui/react/elements.ts` and `packages/opui/svelte/elements.ts`, with the attributes above and Svelte's `ontagadd`, `ontagremove`, `ontaginvalid` as `EventHandler<CustomEvent<{ value: string }>, HTMLElement>` (the `onsort` precedent). React's `onTagAdd` and `onTagRemove` go in the component's own `types.react.ts`, since React 19 keeps the case after `on`.

```astro
---
import { InputTags } from "opui-css/astro"
---

<InputTags
  endText="Press Enter or type a comma to add a topic."
  label="Topics"
  max={5}
  name="topics"
  placeholder="Add a topic"
  value={["Accessibility", "CSS"]}
/>
```

## Accessibility

- The entry is a text input named by the visible `<label>`; its description is the end text. The chip list is a `<ul>` named by the same label, so a screen reader hears "Topics, list, 2 items".
- Each remove button is named "Remove <tag>" from `remove-label`. The chip text itself is not focusable.
- The status region (`role="status"`, `.ui-sr-only`) says "Added CSS" and "Removed CSS", since adding a chip moves no focus and a sighted user sees the chip appear.
- At `max`, the entry is `readonly`, not `disabled`, so it stays focusable and its end text still explains why.
- An invalid state is `aria-invalid` plus the native validity message, never color alone (the TextField forced colors rule gives it a dashed border).
- What axe can't catch: the focus order after removal. Removing a chip moves focus to the next chip's remove button, or to the previous one when it was the last, or to the entry when none are left, never to `<body>`.

Keyboard support (`keyboard` rows in `api.ts`):

| Keys                             | Where                     | Does                                                                                                          |
| -------------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Enter                            | Entry                     | Adds the pending text. An empty entry lets Enter submit the form as usual.                                    |
| The delimiter (Comma by default) | Entry                     | Adds the pending text.                                                                                        |
| Backspace                        | Entry, caret at the start | Moves focus to the last chip's remove button.                                                                 |
| Left Arrow                       | Entry, caret at the start | Same as Backspace, without removing anything.                                                                 |
| Left Arrow, Right Arrow          | Remove button             | Moves to the previous or next remove button; past the last one, back to the entry. Mirrored in right-to-left. |
| Backspace, Delete                | Remove button             | Removes that tag.                                                                                             |
| Enter, Space                     | Remove button             | Removes that tag (native button).                                                                             |
| Esc                              | Entry                     | Clears the pending text.                                                                                      |
| Tab                              | Anywhere                  | Leaves the field; with `add-on-blur`, adds the pending text first. Remove buttons stay in the Tab order.      |

## Docs page

`src/docs/components/input-tags.astro`, slug `input-tags`, `heroAnatomy` (it has a field, chips and buttons worth labelling).

- Preamble: "A text field that turns each value into a removable chip." Siblings: TextField (one value) and Select with `multiple` (values from a fixed list), linked both ways: add a line to the preambles of `text-field.astro` and `select.astro`.
- Usage: when to use (free values a person types: topics, labels, recipients you can't list in advance); when not (a known set of options: Select `multiple` or Checkbox; a single value: TextField).
- Sections and examples, in the order of section 3.3:
  1. Basics: `Basics` (Topics, two initial tags).
  2. Sizes: `Sizes`. Variants: `Variants` (outlined, filled).
  3. Parts and content: `EndText`, `HideLabel`, `RemoveIcon` (a custom icon in the `remove-icon` slot), `Suggestions` (a `list` attribute and a `<datalist>` of common topics).
  4. Behavior: `Delimiter` (`delimiter=";"` for email recipients), `AddOnBlur`, `Duplicates`, `Max` (`max={3}` with an end text saying so).
  5. States: `Disabled`, `Required` (in a form with a submit button), `Validation` (a `tagadd` listener that rejects values without `@`; the React, Svelte and Vue files of this example are hand-written in `scripts/hand-written-examples.json`, since its listener is framework code, the same reason as `menu/ContextMenu.*`).
  6. Composition: `InForm` (inside a `Fieldset` with a `FieldGroup`, showing the submitted `FormData` in an `<output>`).
- Accessibility slot: the notes above and the KeyboardSupport partial.
- Under the hood: why hidden inputs and not `ElementInternals`, and how to listen for `tagadd`.
- `browserSupport`: `field-sizing`, `has`, `user-pseudos` (run `node scripts/check-browser-support.mjs --write` to confirm).
- See also: Chip, Select, TextField.

## Blocks and other pages

- `src/blocks/blog-list.html` keeps its read-only tag rows (they aren't inputs). Add an "Edit post" settings example instead: no block has a tag editor today, so add InputTags to the `account-settings` block's profile form as "Skills" (`src/blocks/account-settings.html`), which also feeds `tests/unit/app-coverage.test.ts`.
- `src/stress-tests/forms.html`: add InputTags to each `[data-size]` row, so `tests/e2e/stress.spec.ts` checks it shares the row's control size.

## Files

- Add `packages/opui/components/InputTags/`: `InputTags.astro`, `icons.ts`, `types.ts`, `types.astro.ts`, and the compiled `InputTags.react.tsx`, `InputTags.svelte`, `InputTags.vue`, `types.react.ts`, `types.svelte.ts`, `types.vue-props.ts`.
- Export `InputTags` and `InputTagsProps` from `packages/opui/astro/index.ts`, `react/index.ts`, `svelte/index.ts`, `vue/index.ts` (sorted).
- Add the `.ui-chip > .ui-remove` rule to `packages/opui/css/components/chip.css` and the `.ui-remove` part to `src/component-api/chip/api.ts`.
- Add `packages/opui/css/components/input-tags.css`; import it in `packages/opui/css/components.css` (Extended group, after `text-field.css`).
- Add `packages/opui/elements/input-tags.js` and `input-tags.d.ts`; add the element to `packages/opui/react/elements.ts` and `packages/opui/svelte/elements.ts`.
- Add `src/component-api/input-tags/api.ts` and `src/component-api/custom-properties/input-tags.ts`.
- Add the examples in `src/component-examples/input-tags/` (`.astro`, then `pnpm build-examples`).
- Add `src/docs/components/input-tags.astro`; add the card to `src/components/ComponentShowcase/ComponentShowcase.astro`; link from `text-field.astro` and `select.astro`.
- Add `packages/opui/skills/opui/references/input-tags.md` and its line in `references/index.md`.
- Update `packages/opui/README.md` (the list of components that load a custom element).
- `packages/opui/CHANGELOG.md`, Added: "`InputTags` component (`opui-input-tags.ui-text-field.ui-input-tags`): ...", naming `.ui-input-tags`, `.ui-tags` and `.ui-remove` so `tests/unit/changelog.test.ts` finds the new classes.
- `src/utils/whats-new.ts`: an `input-tags` note starting "New component." with a `#basics` link, `html` and component variants like Command's; add the slug to `added` and `highlighted`.
- `docs/releases/6.0.0.md`: a Components check: "- [ ] InputTags" with the steps (Enter and comma add, paste splits, Backspace removes, reset restores, submit sends every value).
- `tests/package/package.test.ts`: `"elements/input-tags.js"`.
- `packages/opui/components/AGENTS.md`: the forced colors "without a block" list.
- Generated, committed after `pnpm build`: `public/search-index/*.json`, parity snapshots in `tests/unit/__snapshots__/input-tags/`.

## Tests

- Unit:
  - `tests/unit/component-contract.test.ts` and `tests/unit/parity.test.ts` cover the four frameworks and the examples once they exist; run `pnpm exec vitest run tests/unit/component-contract.test.ts tests/unit/parity.test.ts -t InputTags`.
  - `tests/unit/naming.test.ts` checks the props (`removeLabel` next to the `remove-icon` slot, `max`, `size`, `variant`).
  - `tests/unit/example-coverage.test.ts`: every prop and enum value appears in an example.
  - `tests/unit/elements.test.ts`: the remove icon in `input-tags.js` matches `InputTags/icons.ts`, with a sample that differs (the "image reader flags an icon that differs" pattern).
  - `tests/unit/component-types.test.ts`: `value` is `string[]`, React `onValueChange` receives `string[]`.
- E2E, in `tests/e2e/interaction.spec.ts` (an `input-tags` describe block, run with `--project=light --project=dark` locally):
  - Enter and comma add; a paste of "a, b\nc" adds three; a duplicate fires `taginvalid` and keeps the text; `max` makes the entry readonly.
  - Backspace in an empty entry focuses the last remove button; a second Backspace removes it and focus lands on the previous button.
  - `new FormData(form).getAll("topics")` equals the chips in order; `form.reset()` restores the initial chips; `required` with no chips blocks submit and the field matches `:user-invalid`.
  - A `tagadd` listener that calls `preventDefault()` keeps the chip from appearing.
  - The status region text after an add and a remove.
- The engines projects run these in Firefox and WebKit on CI (`e2e-engines` label). A failure that's an engine bug gets `failsIn()` with a reason from `tests/e2e/engine-bugs.ts` and a plain-HTML repro in `tests/e2e/engines.spec.ts`.
- Visual baselines come from CI only (`update-snapshots` label); never commit local screenshots.
- Stress: the forms stress page row from "Blocks and other pages".

## Steps

1. Write `input-tags.css` and an HTML-only example (`Basics.html` by hand, temporarily) to settle the wrapping row in every size; `pnpm sort-css:check` and `pnpm check-css-vars`.
2. Write `elements/input-tags.js` and `.d.ts` with the attributes, events and reset handling; check it on the HTML example in `pnpm dev`.
3. Write `InputTags.astro`, `icons.ts`, `types.ts`, `types.astro.ts`; run `pnpm build-components`; fix or ledger what it refuses; `pnpm check-ports`.
4. Add the barrels, the element typings, `api.ts` and `custom-properties/input-tags.ts`; `pnpm test -- component-api` shows no `[component-api]` problems.
5. Write the `.astro` examples, run `pnpm build-examples`, write the docs page; `pnpm check:fast`.
6. Write the interaction tests; `pnpm test:e2e --project=light --project=dark -g "input-tags"`.
7. CHANGELOG, What's new, release check, skill reference, README, package test, guide list; `pnpm exec vitest run tests/unit/changelog.test.ts tests/unit/whats-new.test.ts`.
8. Update the account-settings block and the forms stress page; `pnpm test:apps` with `OPUI_APPS=next` to catch hydration warnings from the element mutating React-rendered chips.
9. `pnpm check`, push, add the `update-snapshots` and `e2e-engines` labels.

## Open questions

1. Controlled `value` in React? Recommended: no for this version. `defaultValue` plus `onValueChange` covers forms; a controlled list would mean React renders every chip and the element only reports intent through cancelable `tagadd`, which is a second rendering mode to test in every framework. Revisit if someone asks.
2. Should the chip text be editable (double-click to edit, as some tag inputs do)? Recommended: no; remove and retype is one key more and keeps chips plain text.
3. Name: `InputTags` (Nuxt's word, and it sorts next to inputs) or `TagField` (matches `TextField`, `NumberField`, `ColorField` in PR #421)? Recommended: `TagField`, slug `tag-field`, class `.ui-tag-field`, so the field family reads the same. This plan uses `InputTags` because that's how the PR was asked for; rename before the first commit of code if accepted.
4. Should `Chip` itself gain a `removable` option with the same `.ui-remove` button, so read-only chip rows (blog-list filters) can use it without InputTags? Recommended: yes, as a follow-up PR. This plan already puts the `.ui-chip > .ui-remove` rule in `chip.css` (and names `.ui-remove` in the Chip `api.ts` as an HTML-only class), so that follow-up only adds the prop.
