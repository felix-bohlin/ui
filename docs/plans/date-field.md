# DateField: implementation plan

Status: plan only. This PR carries the plan; the implementation lands on this branch in later commits.

## Summary

DateField is a date input with the library's own calendar picker and an optional start and end range. It keeps the native `<input type="date">` as the control: the browser already gives a segmented field that is localized, validates `min`, `max` and `required`, submits `YYYY-MM-DD`, and works with every keyboard and screen reader. DateField adds what the native control can't: a picker that looks like the rest of the library (a Calendar in a popover), and two dates joined in one field.

There is no TimeField. A time is a TextField with `type="time"`, which already works and is shown on the TextField page (`src/component-examples/text-field/InputTypes.astro`). Reasons below.

## Why

- Nuxt UI ships `UInputDate` and `UInputTime` (`@nuxt/ui` 4.12.0, `dist/runtime/components/InputDate.vue`, `InputTime.vue`), on Reka UI's `DateField` and `TimeField`: a fully custom segmented field (one `contenteditable`-like span per segment), with `modelValue`, `defaultValue`, `range`, `separatorIcon`, `color`, `variant`, `size`, `highlight`, `fixed`, `autofocus`, and Reka's `locale`, `granularity`, `hourCycle`, `minValue`, `maxValue`, `isDateUnavailable`. The calendar is a separate `UCalendar` the docs put in a `UPopover` next to an `InputDate`.
  - We take: the range (two dates in one field with a separator), the calendar in a popover, sizes and variants shared with TextField.
  - We leave: the custom segmented field. The native one already segments, localizes and validates; rebuilding it costs a large script, its own accessibility contract and form participation through `ElementInternals`, which no opui element uses today (`packages/opui/elements/` has none). The `@internationalized/date` value objects too: plain `YYYY-MM-DD` strings are the native format.
- Why no TimeField:
  - Nuxt's `InputTime` exists because Reka rebuilds the field. The native `<input type="time">` is the same segmented field, localized to 12 or 24 hours, with `min`, `max` and `step`.
  - There is no panel to add: a time has no equivalent of a month grid, and the native time picker (Chromium's list of hours and minutes) is already optional.
  - A `TimeField` would be a TextField with nothing of its own, and a `type="time"` on DateField would be a DateField without its picker. Neither earns a component. The TextField page gets a Time section instead (see Docs page).
  - `datetime-local` stays a TextField for the same reason in the first version; a DateField with `type="datetime-local"` that pairs the Calendar with the native time segments is an Open question.
- Where the repo needs it:
  - `packages/opui/css/components/text-field.css:86` to `text-field.css:90` already trim the WebKit date segments (`::-webkit-calendar-picker-indicator`, `::-webkit-datetime-edit`, `::-webkit-datetime-edit-fields-wrapper`), so date inputs are styled as fields today; DateField builds on that instead of a new field style.
  - The TextField docs say date and time inputs show their format and ignore `placeholder` (the fix recorded at `TODO.md:1016`); the range field answers the common "from and to" layout that two separate fields don't group.
  - Booking and reporting layouts in `src/blocks/` (analytics and sales dashboards filter by period) have no date range control.

## Scope

- In:
  - `DateField`: one native date input in a TextField-styled field, or two with `range`.
  - `picker` (boolean): a calendar button in the field's end that opens a Calendar in a popover, wired by `opui-date-field`.
  - `min`, `max`, `required`, `name` (or `startName` and `endName` with `range`), `label`, `startText`, `endText`, `error`, `size`, `variant`, `hideLabel`: the TextField set where it applies.
- Out:
  - A custom segmented field and `ElementInternals`.
  - TimeField, `datetime-local`, `month` and `week` types (TextField covers them).
  - A range picker inside the popover (it waits for Calendar `range`; until then, the picker fills the start, then the end).

## Markup and CSS

Single date with a picker:

```html
<opui-date-field class="ui-text-field ui-date-field">
  <label class="ui-label" for="due-date">Due date</label>
  <span class="ui-field">
    <input
      id="due-date"
      max="2026-12-31"
      min="2026-11-09"
      name="due"
      type="date"
      value="2026-11-20"
    />
    <span class="ui-end">
      <button
        aria-label="Choose date"
        class="ui-button ui-round"
        command="toggle-popover"
        commandfor="due-date-picker"
        type="button"
      >
        <svg aria-hidden="true"><!-- calendar icon --></svg>
      </button>
    </span>
  </span>
  <div class="ui-floating" id="due-date-picker" popover>
    <opui-calendar
      class="ui-calendar"
      max="2026-12-31"
      min="2026-11-09"
      month="2026-11"
    >
      <!-- the Calendar markup, days named "due-date-picker-day" so they don't submit -->
    </opui-calendar>
  </div>
</opui-date-field>
```

Range:

```html
<fieldset class="ui-text-field ui-date-field">
  <legend class="ui-label">Stay</legend>
  <span class="ui-field">
    <input aria-label="Check-in" name="check-in" type="date" />
    <span aria-hidden="true" class="ui-separator">to</span>
    <input aria-label="Check-out" name="check-out" type="date" />
  </span>
</fieldset>
```

- Roots: `.ui-text-field.ui-date-field`, so `text-field.css` styles the label, field, affixes, sizes, `ui-filled`, invalid and focus states unchanged. A `fieldset` with a `legend` names a range, the way Rating names its radios (`src/component-api/rating/api.ts` notes).
- New stylesheet `packages/opui/css/components/date-field.css`, in `components.extended` (it adjusts rules of `text-field.css` on the same element, section 10 of `packages/opui/components/AGENTS.md`), and in `BUILDS_ON` after `text-field.css` (`tests/unit/layers.test.ts`). It only does what TextField doesn't:
  - Range: the two inputs share one `.ui-field` with `.ui-separator` between them (`--ui-text-subtle`), each `field-sizing: content` where supported so the pair hugs its dates (feature `field-sizing`, an `@supports` that turns it on, with the full-width default as the free fallback the browser-support rule allows).
  - Picker: with `.ui-end:has(> [commandfor])`, hides the native indicator with `::-webkit-calendar-picker-indicator { display: none }` (a vendor pseudo-element that is the only way to style the native control). Firefox shows its own button and has no hook to hide it (Open questions).
  - The popover: positioned under the field with `position-anchor` and `position-area: block-end span-inline-end`, flipping with `position-try-fallbacks: flip-block`, the same anchor rules as `anchor.css` (the RepoCard example in `src/component-examples/anchor/RepoCard.html` shows `.ui-anchor > .ui-floating[popover]`). The floating surface is a Card look (`--ui-surface-elevated`, `--ui-shadow-overlay`, `--ui-border-color-raised`), like the Menu popover.
  - Segment focus colors in WebKit and Chromium, `::-webkit-datetime-edit-day-field:focus` and siblings, in `--ui-selected` and `--ui-on-selected` so the focused segment matches the library's selection, with no rule in Firefox, which paints its own.
- Private properties on `:where(.ui-date-field)`, sorted: `--_popover-gap: var(--ui-space-1)`, `--_popover-padding: var(--ui-space-2)`, `--_segment-focus-bg-color: var(--ui-selected)`, `--_segment-focus-text-color: var(--ui-on-selected)`, `--_separator-text-color: var(--ui-text-subtle)`.
- No new theme token.
- Features for `browserSupport`, sorted: `anchor-positioning`, `field-sizing`, `has`, `invoker-commands`, `popover`. Confirm with `node scripts/check-browser-support.mjs --write` (`invoker-commands` is an HTML feature there, `scripts/check-browser-support.mjs:44`).
- Compat: anchor positioning is missing in Firefox; if the popover has no position without it, the fallback goes in `packages/opui/css/compat/date-field.css` under `@supports not (anchor-name: --a)`, centered under the field, the way the existing compat files handle Anchor and Tooltip, and is listed in `src/docs/guide/browser-support.astro` and `tests/e2e/compat.spec.ts`.
- Forced colors: nothing of its own. The field border is real and `text-field.css` already has the focus and invalid block; the Calendar inside the popover brings its own block; the separator is text.
- More contrast, motion: nothing of its own. The popover opens with the library's overlay timing (`--ui-ease-enter`, `--ui-ease-exit`, as Copy and Menu do per `TODO.md:420`).
- Right-to-left: the native input follows `dir`; the separator and popover alignment are logical.

## Behavior

- Without a script: the native field types, validates and submits; the picker button opens the popover through `command="toggle-popover"` (invoker commands, no script); the Calendar inside renders its month; light dismiss and Escape close it. What doesn't work without the element is copying the picked day into the input.
- `opui-date-field` (`packages/opui/elements/date-field.js`, `date-field.d.ts`):
  - On `toggle` of the popover to open: sets the Calendar's `month` from the input's value (or the `min`, or the current month), checks the matching day, copies `min` and `max`.
  - On `change` from a Calendar day: writes the date to the input with `input.value = date`, dispatches `input` and `change` from the input (bubbling, so frameworks' `onChange`, `v-model` and `bind:value` see it), closes the popover with `hidePopover()`, and returns focus to the input.
  - Range: the first pick fills the start and keeps the popover open, the second fills the end; picking a day before the start restarts. It keeps `min` of the end input at the start value and `max` of the start at the end value on every `change`, so the native validation rejects an inverted range.
  - The Calendar's day radios must not submit with the field's form; how Calendar keeps them out is Open question 4.
  - No events of its own; the input's native events are the API.
- Registered with `customElements.define("opui-date-field", DateField)` behind the usual `customElements.get` guard, and typed in `react/elements.ts` and `svelte/elements.ts`.

## Component API

- `DateField`, compiled by `pnpm build-components` if it accepts rendering `Calendar` inside conditionally; the root switches between `label`, `fieldset` and `opui-date-field` like `TextField` switches to `opui-text-field` (`TextField.astro:45` to `TextField.astro:50`).
- It reuses TextField's props through `types.ts` composition where the naming model allows, and drops the ones that make no sense for a date (`autoFit`, `characterCount`, `dropZone`, `passwordToggle`).

Props, sorted:

| Prop          | Type                                          | Default         | Renders                                             |
| ------------- | --------------------------------------------- | --------------- | --------------------------------------------------- |
| `endLabel`    | `string`                                      | `"End date"`    | `aria-label` of the second input with `range`       |
| `endName`     | `string`                                      |                 | `name` of the second input with `range`             |
| `endText`     | `string`                                      |                 | `.ui-end-text`, as in TextField                     |
| `endValue`    | `string`                                      |                 | `value` of the second input                         |
| `error`       | `boolean`                                     | `false`         | `aria-invalid="true"`                               |
| `hideLabel`   | `boolean`                                     | `false`         | `.ui-sr-only` on the label                          |
| `label`       | `string`                                      |                 | `.ui-label` or `legend`                             |
| `picker`      | `boolean`                                     | `false`         | the button, popover and Calendar; `opui-date-field` |
| `pickerLabel` | `string`                                      | `"Choose date"` | `aria-label` of the picker button (`<part>Label`)   |
| `range`       | `boolean`                                     | `false`         | two inputs in a `fieldset`, `.ui-separator`         |
| `separator`   | `string`                                      | `"to"`          | `.ui-separator` text, translated by the caller      |
| `size`        | `"x-small" \| "small" \| "medium" \| "large"` | `"medium"`      | `.ui-<size>` as in TextField                        |
| `spread`      | `boolean`                                     | `false`         | `.ui-spread`                                        |
| `startLabel`  | `string`                                      | `"Start date"`  | `aria-label` of the first input with `range`        |
| `startText`   | `string`                                      |                 | `.ui-start-text`                                    |
| `variant`     | `"outlined" \| "filled"`                      | `"outlined"`    | `.ui-filled`                                        |

- Native attributes (`max`, `min`, `name`, `required`, `value`, `disabled`, `readonly`) reach the first input through `...rest`, as in TextField (section 5 of the guide, Input Attribute Mapping); `max` and `min` are also copied to the second input and to the Calendar.
- Slots: `label`, `start-text`, `end-text`, and `picker-icon` replacing the default calendar `svg` next to `pickerLabel` (the `<part>-icon` rule, `tests/unit/naming.test.ts`).
- `model` in `api.ts`: `value`, and `endValue` with `range`.
- `startValue` is not a prop; the first input's value is `value`, so a single field and a range share one name.

```astro
---
import { DateField } from "opui-css/astro"
---

<DateField
  label="Due date"
  max="2026-12-31"
  min="2026-11-09"
  name="due"
  picker
/>

<DateField
  endName="check-out"
  label="Stay"
  name="check-in"
  picker
  range
  separator="to"
/>
```

## Accessibility

- The native input carries the semantics: its segments, spin keys and format are announced by the browser.
- The picker button is named by `pickerLabel` and exposes its expanded state through the invoker command relationship (`aria-expanded` is set by the browser for `commandfor` popovers); it sits after the input in Tab order.
- The popover is not modal: Tab moves into the Calendar after the button, Escape closes and returns focus to the button (native popover behavior).
- A range is a `fieldset` named by its `legend`; each input is named by `startLabel` and `endLabel`, and the separator is `aria-hidden` so it isn't read between them.
- `endText` is linked with `aria-describedby` only where the label doesn't wrap the input, the rule in section 5 of the guide.
- Keyboard:

| Keys                    | Where         | Action                                                                  |
| ----------------------- | ------------- | ----------------------------------------------------------------------- |
| Down Arrow, Up Arrow    | Input segment | Steps the focused segment (native).                                     |
| Enter, Space            | Picker button | Opens or closes the calendar.                                           |
| Escape                  | Calendar      | Closes the calendar and returns focus to the button.                    |
| Left Arrow, Right Arrow | Input         | Moves between segments (native).                                        |
| Tab                     | Field         | Moves from the input to the picker button, then into the open calendar. |

Inside the Calendar, its own table applies (see the Calendar plan).

- What axe can't catch: the focused segment color in Chromium and WebKit keeps 3:1, the popover doesn't cover the field's error text, and Firefox's double calendar button (Open questions) is announced sensibly. The `a11y` agent reviews it.

## Docs page

`src/docs/components/date-field.astro`, `slug="date-field"`.

- Preamble: a date input with the library's calendar and date ranges. Close siblings: TextField (any native input type, including `time` and `datetime-local`) and Calendar (a month always shown), linked both ways.
- Usage: when to use (a date the reader may type or pick, a period with a start and an end); when not to (a date where seeing the month matters more than typing, use Calendar; a time, use TextField with `type="time"`; a birth date, a plain native date input, since a picker makes going back decades slow).
- Sections, in the order of section 3.3 of `src/docs/components/AGENTS.md`:
  1. Basics (`Basics`): a native date field without the picker.
  2. Variants (`Variants`), Sizes (`Sizes`).
  3. Picker (`Picker`).
  4. Range (`Range`): a hotel stay with the picker.
  5. Text (`StartText`, `EndText`).
  6. Limits and validation (`Validation`): `min`, `max`, `required`, `error`.
  7. Bound value (`Binding`).
- TextField page: add a Time section (`Time`) with `type="time"`, `step="900"` and `min`/`max`, and a sentence pointing to DateField for dates, so the decision about TimeField is visible to readers.
- `browserSupport` as listed above. See also: Calendar, TextField, Anchor.

## Blocks and other pages

- `src/blocks/analytics-dashboard.html` and `sales-dashboard.html`: a period filter with a range DateField in the toolbar.
- Stress tests: DateField in the control size page's `[data-size]` rows (`tests/e2e/stress.spec.ts` checks it shares the row's height), a range in a narrow `Card`, a picker near the viewport edge.

## Files

- [ ] `packages/opui/components/DateField/`: `DateField.astro`, compiled `.react.tsx`, `.svelte`, `.vue`, `types.ts`, `types.astro.ts`, `types.react.ts`, `types.svelte.ts`, `types.vue-props.ts`.
- [ ] Barrels in `astro`, `react`, `svelte`, `vue`, sorted.
- [ ] `packages/opui/css/components/date-field.css`, its import after `text-field.css`, its entry in `BUILDS_ON`.
- [ ] `packages/opui/css/compat/date-field.css` and its import in `css/compat.css`, if Firefox needs it.
- [ ] `packages/opui/elements/date-field.js`, `date-field.d.ts`; `react/elements.ts`, `svelte/elements.ts`.
- [ ] `src/component-api/date-field/api.ts` (`css: ["button", "calendar", "date-field", "text-field"]`), `src/component-api/custom-properties/date-field.ts`.
- [ ] `src/component-examples/date-field/*.astro` and generated files; `src/component-examples/text-field/Time.astro`.
- [ ] `src/docs/components/date-field.astro`, the Time section in `src/docs/components/text-field.astro`, `ComponentShowcase.astro`.
- [ ] `packages/opui/skills/opui/references/date-field.md`, `references/index.md`, and the TextField reference for time.
- [ ] `packages/opui/README.md`.
- [ ] `packages/opui/CHANGELOG.md`, Added, naming `.ui-date-field` and `.ui-separator`.
- [ ] `src/utils/whats-new.ts`: `date-field` note linking `#picker`, in `added` and `highlighted`; a `text-field` note linking `#time`.
- [ ] `docs/releases/6.0.0.md`, Components: `- [ ] DateField` (picker in Chrome, Safari, Firefox; range validation; RTL).
- [ ] `packages/opui/components/AGENTS.md`: section 10 (extended group), the "without a block" forced colors list with the reason.
- [ ] `tests/package/package.test.ts`.
- [ ] Dashboard blocks, stress page, generated files.

## Tests

- Unit: component contract and parity (with and without `picker` and `range`), naming (`picker`, `pickerLabel`, `picker-icon`, `range`, `separator`, `startLabel`, `endLabel`), example coverage, and `tests/unit/date-field-element.test.ts` for the value copy, range ordering and `min`/`max` syncing.
- E2E:
  - `interaction.spec.ts`: open the picker with the button and with Enter, pick a day, the input value and a framework binding update, Escape returns focus, a range rejects an end before its start.
  - `example-state.spec.ts`: values after hydration and form reset.
  - a11y on `/html/test/date-field`; visual snapshots in CI.
  - Engines: Firefox's own calendar button is a platform difference, documented, not a `failsIn()`; an anchor positioning gap is covered by the compat layer and `tests/e2e/compat.spec.ts`.

## Steps

1. Land Calendar first (`feat/calendar`); DateField depends on it.
2. Write `date-field.css` against static HTML: single, range, picker; `pnpm sort-css`, `node scripts/check-file.mjs`.
3. Write `DateField.astro`, `types.ts`, `types.astro.ts`; `pnpm build-components`; contract test with `-t DateField`.
4. Write `date-field.js` and its unit test.
5. `api.ts`, custom properties, examples, `pnpm build-examples`, parity test; the TextField Time example.
6. Docs pages, showcase, skill references, README, CHANGELOG, What's new, release check; `pnpm check:fast`.
7. Blocks and stress page; `pnpm test:e2e --project=light --project=dark -g DateField`; `--project=firefox` for the compat layer.
8. `pnpm check`, the `audit` skill on the diff, the `update-snapshots` label.

## Open questions

1. Native input or a custom segmented field? Recommended: native, as planned. It is the feature-first choice, and every behavior Nuxt's custom field has (segments, locale, keyboard, validation) is already in the platform.
2. TimeField? Recommended: no component; a Time section on the TextField page (reasons in Why).
3. Firefox shows its own calendar button next to the picker button, and nothing hides it. Recommended: accept it, say so on the page, and add a `## Limitations` item in `TODO.md`; the alternative, `type="text"` with a pattern, gives up the native field and is the opposite of the plan.
4. How do the Calendar's day radios stay out of the form? Recommended: Calendar renders days without `name` when `name` is missing, groups them with a generated `name` only on the client inside the popover (the element sets it), and the plan for Calendar documents it; or Calendar takes a `form` attribute set to an id that matches no form, which is valid HTML and keeps the radios out of submission. Decide in the Calendar PR.
5. `datetime-local` with the picker? Recommended: later, only if readers ask; the picker would set the date part and leave the native time segments alone.
