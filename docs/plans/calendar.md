# Calendar: implementation plan

Status: plan only. This PR carries the plan; the implementation lands on this branch in later commits.

## Summary

Calendar shows one month as a table of days and lets the reader pick a date. Every day is a native radio button (checkboxes with `multiple`), so the server-rendered month is a working form control without a script: it submits, validates `required`, and respects `disabled` days. The `opui-calendar` element adds month navigation, date-grid arrow keys and locale-aware rendering on top. It is also the panel the DateField picker opens.

## Why

- Nuxt UI ships `UCalendar` (`@nuxt/ui` 4.12.0, `dist/runtime/components/Calendar.vue`), on Reka UI's `CalendarRoot` and `@internationalized/date`. Its props: `modelValue` and `defaultValue`, `range`, `multiple`, `type`, `view`, `weekNumbers`, `monthControls`, `yearControls`, `viewControl`, `prevMonth`, `nextMonth`, `prevYear`, `nextYear` (button props), their icons, `color`, `variant`, `size`, and Reka's `locale`, `weekStartsAt`, `minValue`, `maxValue`, `isDateDisabled`, `isDateUnavailable`, `numberOfMonths`, `fixedWeeks`, `readonly`, `disabled`.
  - We take: one month with previous and next month buttons, a single value or `multiple`, `min` and `max`, disabled days, the first day of the week from the locale with an override, sizes, and today marked.
  - We leave for later: `range`, `weekNumbers`, year and decade views, several months side by side. We never take `@internationalized/date`: plain `YYYY-MM-DD` strings (the value format of `<input type="date">`) and `Intl.DateTimeFormat` cover it.
- Where the repo needs it:
  - DateField (its own plan on `feat/date-field`) opens a Calendar in a popover.
  - Blocks with dates have no picker: `src/blocks/` scheduling and booking flows (billing, checkout) use plain text fields today.
  - Rating shows the precedent: its input is a `fieldset` of radios with `aria-label` names (`src/component-examples/rating/Disabled.html` lines 3 to 5), styled as something else.

## Scope

- In:
  - `Calendar`, one month, single date (radios) or `multiple` (checkboxes).
  - Server rendering of the month in all four frameworks from `month`, `value`, `min`, `max`, `firstDay`, `locale` and `disabledDates`.
  - `opui-calendar`: previous and next month, arrow keys, Page Up and Page Down, Home and End, today, `change` from the native inputs.
  - Sizes `small` and `medium`.
- Out:
  - `range`. It needs a start and an end with a hover preview between them, two form values, and state no native control has. Planned as a follow-up with two hidden inputs.
  - Week numbers, year view, several months.
  - Days of the previous and next month in the leading and trailing cells (empty cells in the first version; see Open questions).

## Markup and CSS

```html
<opui-calendar
  class="ui-calendar"
  first-day="1"
  max="2026-12-31"
  min="2026-11-01"
  month="2026-11"
  next-label="Next month"
  previous-label="Previous month"
>
  <fieldset>
    <div class="ui-header">
      <button
        aria-label="Previous month"
        class="ui-button ui-round"
        data-step="-1"
        disabled
        type="button"
      >
        <svg aria-hidden="true"><!-- chevron start --></svg>
      </button>
      <legend class="ui-label">November 2026</legend>
      <button
        aria-label="Next month"
        class="ui-button ui-round"
        data-step="1"
        type="button"
      >
        <svg aria-hidden="true"><!-- chevron end --></svg>
      </button>
    </div>
    <table class="ui-content">
      <thead>
        <tr>
          <th abbr="Monday" scope="col">Mo</th>
          <!-- Tuesday to Sunday -->
        </tr>
      </thead>
      <tbody>
        <tr>
          <td></td>
          <!-- empty cells before the first day -->
          <td>
            <label>
              <input
                aria-label="Sunday, November 1, 2026"
                name="delivery"
                type="radio"
                value="2026-11-01"
              />
              <span aria-hidden="true">1</span>
            </label>
          </td>
        </tr>
        <tr>
          <td>
            <label>
              <input
                aria-current="date"
                aria-label="Sunday, November 8, 2026"
                checked
                name="delivery"
                type="radio"
                value="2026-11-08"
              />
              <span aria-hidden="true">8</span>
            </label>
          </td>
          <!-- ... -->
        </tr>
      </tbody>
    </table>
  </fieldset>
</opui-calendar>
```

- A `legend` must be the first child of a `fieldset` to name it, so the real implementation renders `<legend class="ui-label">` first and places it in the header row with grid areas (`grid-template-areas: "previous label next"`), keeping the buttons after it in the DOM. The block above shows the visual order; the plan's `Calendar.astro` follows the DOM rule.
- Root `.ui-calendar`; parts `.ui-header`, `.ui-label` (month and year), `.ui-content` (the table). The day `label` and `input` are styled under the root with child combinators, so no part class is needed on 42 cells.
- Without the element (plain HTML, or before it loads), the root is a `div.ui-calendar` with the same children and the navigation buttons are absent or links (Open questions).
- Stylesheet `packages/opui/css/components/calendar.css`, in `components.root`: `radio.css:2` styles radios only under `:where(label.ui-radio)`, so the day inputs meet no other component rule and nothing has to be beaten. Imported in ascending order in its group of `css/components.css`. It builds on `button.css` for the header buttons, which `api.ts` lists in `css`.
- Day cells:
  - The input is `appearance: none` and covers the `label` (`position: absolute; inset: 0`), the number sits on top, so the whole cell is the hit area. A day is `--_day-size: var(--ui-control-size)` square, at least 24 by 24 CSS pixels at `small` (WCAG 2.5.8).
  - Hover: `--_hover-bg-color`, the List formula (`list.css:13`).
  - Checked: `:has(> input:checked)` fills with `--ui-selected-strong` and `--ui-on-selected-strong`, the mark that stands out on its own (section 9 of `packages/opui/components/AGENTS.md`).
  - Today: `:has(> input[aria-current="date"])` draws a `--ui-border-width` ring in `--ui-field-border-color`.
  - Disabled: `input:disabled` gives `--ui-disabled-opacity` and `--ui-text-disabled`, with a line through the number, so disabled doesn't rest on color alone.
  - Focus: `:has(> input:focus-visible)` draws the library focus ring (`--ui-focus-ring-width`, `--ui-focus-ring-offset`).
- Weekday header: `--ui-font-size-caption`, `--ui-text-subtle`, `abbr` gives the full name to assistive technology.
- Private properties, declared on `:where(.ui-calendar)`, sorted: `--_day-gap: var(--ui-space-1)`, `--_day-radius: var(--ui-radius-small)`, `--_day-size: var(--ui-control-size)`, `--_duration`, `--_ease`, `--_hover-bg-color`, `--_motion: var(--ui-motion)`, `--_selected-bg-color: var(--ui-selected-strong)`, `--_selected-text-color: var(--ui-on-selected-strong)`, `--_today-border-color: var(--ui-field-border-color)`.
- Modifiers: `size` `small` (`.ui-small`, `--ui-control-size-small` days), `medium` is the default. `round` (boolean, `.ui-round`) for circular days, following the Shape row of the naming model.
- No new theme token.
- Features for `browserSupport`, sorted: `has`, `user-pseudos` only if `:user-invalid` styles a required calendar left empty (recommended, matching TextField).
- Forced colors: a block. The checked day is a fill, so it gets `SelectedItem` and `SelectedItemText` with `forced-color-adjust: none` on the cell; today keeps its border (forced to `CanvasText`); disabled days get `GrayText`. Add Calendar to the "with a block" list.
- More contrast: nothing of its own.
- Motion: the checked fill changes at once, like a radio (section 11 of the guide: controls that a click turns on change at once); hover fades back over `--ui-duration-fast`. Changing month swaps the table without animation in the first version.
- Right-to-left: the table follows `dir`, so the first weekday sits at the inline start; the chevrons mirror with `:dir(rtl)`; Left and Right swap in the element.

## Behavior

- Without a script: one month; Tab moves into the radio group (to the checked day, or the first enabled one); the browser's radio keys move by one day and check it (Left and Up go back, Right and Down forward, all in DOM order); Space checks; the value submits with the form; `required` on one radio validates the group. Multiple with checkboxes: Tab visits every day, Space toggles.
- `opui-calendar` (`packages/opui/elements/calendar.js`, `calendar.d.ts`), a light-DOM element like `opui-sortable-table`:
  - Attributes, sorted: `disabled-dates` (space-separated `YYYY-MM-DD`), `first-day` (0 to 6, Sunday is 0), `max`, `min`, `month` (`YYYY-MM`, reflected when the reader changes month), `next-label`, `previous-label` (translated strings, the `${direction}-label` pattern of `sortable-table.js:64`).
  - Locale: the nearest `[lang]`, read the way `sortable-table.js:83` does. Month and weekday names, and the day `aria-label`, come from `Intl.DateTimeFormat(lang, { dateStyle: "full" })` and `{ month: "long", year: "numeric" }`. The first day of the week is `first-day`, else `new Intl.Locale(lang).getWeekInfo().firstDay` where it exists (Chromium, WebKit), else Monday. This is a script fallback, not CSS, so the browser-support rule about compat layers doesn't apply; the page documents `first-day` for Firefox.
  - Dates are never `Date` objects in local time: the element parses `YYYY-MM-DD` into UTC midnight and formats with `timeZone: "UTC"`, so no time zone shifts a day.
  - Navigation: a click on `[data-step]` re-renders `tbody` and the label for the next or previous month, keeps the checked value even when its month is off screen (a hidden `input` of the same `name` holds it, swapped back in when the month returns), disables the button past `min` or `max`, and announces nothing: the `legend` names the new month, and focus stays on the button.
  - Today: set on the client only (`aria-current="date"`), so server and client markup agree and no server time zone leaks into the page.
  - Keyboard: it handles `keydown` on day inputs and moves focus without checking, so arrowing through a month doesn't fire `change` for every day. See the table in Accessibility.
  - Events: the native `change` and `input` from the radios bubble; nothing of its own. A `month` attribute change re-renders, so frameworks can drive the visible month.
- Shared code: `packages/opui/elements/calendar-month.js` exports `monthGrid(month, firstDay)` (weeks of `YYYY-MM-DD` or `null`) and `dayLabel(date, lang)`. The four components import it for server rendering and the element for client rendering, so both produce the same cells. `tests/unit/scripts.test.ts` requires a test for it.

## Component API

- `Calendar`, compiled by `pnpm build-components` if it accepts a loop over `monthGrid()` rows from an imported helper; otherwise listed in `scripts/hand-written-components.json` with the construct it names and ported with `/port-component Calendar`.

Props, sorted:

| Prop            | Type                              | Default                             | Renders                                                   |
| --------------- | --------------------------------- | ----------------------------------- | --------------------------------------------------------- |
| `disabled`      | `boolean`                         | `false`                             | `disabled` on the `fieldset`                              |
| `disabledDates` | `string[]`                        |                                     | `disabled` on those days, `disabled-dates` on the element |
| `firstDay`      | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6` | the locale's                        | column order, `first-day`                                 |
| `locale`        | `string`                          | the page `lang`                     | `lang` on the root, names of months, weekdays and days    |
| `max`           | `string`                          |                                     | `max`, days after it disabled                             |
| `min`           | `string`                          |                                     | `min`, days before it disabled                            |
| `month`         | `string`                          | the month of `value`, else required | `month`, the month shown                                  |
| `multiple`      | `boolean`                         | `false`                             | checkboxes instead of radios                              |
| `name`          | `string`                          |                                     | `name` on every day input                                 |
| `nextLabel`     | `string`                          | `"Next month"`                      | `aria-label` of the next button, `next-label`             |
| `previousLabel` | `string`                          | `"Previous month"`                  | `aria-label` of the previous button, `previous-label`     |
| `required`      | `boolean`                         | `false`                             | `required` on the day inputs                              |
| `round`         | `boolean`                         | `false`                             | `.ui-round`                                               |
| `size`          | `"small" \| "medium"`             | `"medium"`                          | `.ui-small`                                               |
| `value`         | `string \| string[]`              |                                     | `checked` on the matching day(s)                          |

- `model` in `api.ts`: `value`, bound with `$bindable()` in Svelte and `defineModel` in Vue; React takes `value` with `onChange` or `defaultValue`, like Rating (`src/component-api/rating/api.ts` notes).
- `month` is a second bindable (the visible month), so frameworks can sync it; a `month` change re-renders on the client.
- No slots in the first version. A `day` slot for prices or dots under a number is a follow-up.
- Server-side: without `month` and `value`, the component can't know the month without reading the server clock, which would differ from the client; `types.ts` requires one of them.

```astro
---
import { Calendar } from "opui-css/astro"
---

<form>
  <Calendar
    max="2026-12-31"
    min="2026-11-09"
    name="delivery"
    required
    value="2026-11-12"
  />
  <button class="ui-button ui-filled" type="submit">Book delivery</button>
</form>
```

## Accessibility

- Structure: a `fieldset` named by its `legend` (the month and year), a `table` whose column headers name the weekdays, one radio per day named by its full date. This keeps the native radio group contract instead of the APG `grid` pattern, so it works without a script and needs no `aria-selected` bookkeeping.
- Today: `aria-current="date"` on the input.
- Disabled days: native `disabled`, so they are skipped by arrow keys and announced as dimmed.
- Month change: focus stays on the button so repeated presses work, and the `legend` change is not a live region. Check with VoiceOver and NVDA whether the new month is announced; if not, add a `role="status"` span with the month name, set after a short delay like `sortable-table.js` does in `#announce`.
- Keyboard (with `opui-calendar`):

| Keys        | Action                                                                                |
| ----------- | ------------------------------------------------------------------------------------- |
| Down Arrow  | Moves to the same day next week, into the next month if needed.                       |
| End         | Moves to the last day of the week.                                                    |
| Enter       | Checks the focused day. In a form, it doesn't submit.                                 |
| Home        | Moves to the first day of the week.                                                   |
| Left Arrow  | Moves to the previous day. Next day in right-to-left.                                 |
| Page Down   | Moves to the same day next month. With Shift, next year.                              |
| Page Up     | Moves to the same day previous month. With Shift, previous year.                      |
| Right Arrow | Moves to the next day. Previous day in right-to-left.                                 |
| Space       | Checks the focused day (toggles it with `multiple`).                                  |
| Tab         | Moves from the header buttons to the checked day, or today, or the first enabled day. |
| Up Arrow    | Moves to the same day last week.                                                      |

Without the element, the native radio keys apply (one day per arrow, checking it).

- Disabled days are skipped when moving; a move that lands on one continues in the same direction.
- What axe can't catch: the checked day keeps 3:1 against its neighbours in both schemes and in forced colors; the focus ring isn't hidden under the checked fill; target size at `small`. The `a11y` agent reviews it.

## Docs page

`src/docs/components/calendar.astro`, `slug="calendar"`, `heroAnatomy`.

- Preamble: a month of days to pick a date from. Close siblings: DateField (type a date or open this calendar from a field), Radio (the control under each day), linked both ways.
- Usage: when to use (pick a day where seeing the week matters: bookings, deliveries, scheduling); when not to (a birth date or any date far away, use DateField or a native date input; a time, use a TextField with `type="time"`).
- Sections, in the order of section 3.3:
  1. Basics (`Basics`): a delivery date in a form.
  2. Sizes (`Sizes`), Shape (`Round`).
  3. Limits (`Limits`): `min`, `max`, `disabledDates` (weekends of a delivery calendar).
  4. Multiple (`Multiple`): pick several days for a recurring shift.
  5. Disabled (`Disabled`).
  6. Localization (`Localization`): `lang="sv"` and `lang="ar"` with the first day of the week and right-to-left.
  7. Bound value (`Binding`): `value` and `month` bound in each framework.
- Anatomy: `.ui-calendar`, `.ui-header`, `.ui-label`, `.ui-content`, a day.
- `browserSupport`: `has`, plus what `check-browser-support` reports.
- See also: DateField, Radio, Table.

## Blocks and other pages

- `src/blocks/checkout.html`: a delivery date step with a Calendar, so the block shows the component with a form.
- Stress tests: a calendar in a `Dialog`, in a narrow `Card`, in right-to-left, at every size in a `[data-size]` row of the control size page.

## Files

- [ ] `packages/opui/components/Calendar/`: `Calendar.astro`, compiled or hand-written `.react.tsx`, `.svelte`, `.vue`, `types.ts`, `types.astro.ts`, `types.react.ts`, `types.svelte.ts`, `types.vue-props.ts`.
- [ ] Barrels: `astro/index.ts`, `react/index.ts`, `svelte/index.ts`, `vue/index.ts`, sorted.
- [ ] `packages/opui/css/components/calendar.css`, its import in `css/components.css`.
- [ ] `packages/opui/elements/calendar.js`, `calendar.d.ts`, `calendar-month.js`, `calendar-month.d.ts`; `react/elements.ts`, `svelte/elements.ts`.
- [ ] `src/component-api/calendar/api.ts` (`css: ["button", "calendar"]`, `keyboard`, `model`), `src/component-api/custom-properties/calendar.ts`.
- [ ] `src/component-examples/calendar/*.astro` and generated files; the Binding example's React, Svelte and Vue files may be hand-written (`scripts/hand-written-examples.json`).
- [ ] `src/docs/components/calendar.astro`, `ComponentShowcase.astro`.
- [ ] `packages/opui/skills/opui/references/calendar.md`, `references/index.md`.
- [ ] `packages/opui/README.md`.
- [ ] `packages/opui/CHANGELOG.md`, Added, naming `.ui-calendar` and `.ui-round` on it.
- [ ] `src/utils/whats-new.ts`: `calendar` note linking `#basics`, `calendar` in `added` and `highlighted`.
- [ ] `docs/releases/6.0.0.md`, Components: `- [ ] Calendar` (month navigation, keyboard, Swedish and Arabic localization, forced colors).
- [ ] `packages/opui/components/AGENTS.md`: forced colors list, layer group in section 10.
- [ ] `tests/package/package.test.ts`.
- [ ] `src/blocks/checkout.html`, stress page.
- [ ] Generated files: search index, parity snapshots.

## Tests

- Unit:
  - New `tests/unit/calendar-month.test.ts`: `monthGrid` for every `firstDay`, months starting on each weekday, February in leap years, `dayLabel` in `en`, `sv` and `ar`, no time zone shift with `TZ=Pacific/Kiritimati` and `TZ=Pacific/Pago_Pago`.
  - Component contract and parity: identical markup in four frameworks for a fixed `month` and `value`.
  - Naming and example coverage.
  - New `tests/unit/calendar-element.test.ts`: keys, skipping disabled days, keeping an off-screen value.
- E2E:
  - `interaction.spec.ts`: pick a day and submit the form, arrow through a month boundary, Page Up and Down, `min` disables the previous button, RTL arrows.
  - `example-state.spec.ts` covers the checked day after hydration and after a form reset.
  - a11y on `/html/test/calendar`; visual snapshots in CI.
  - Engines: `getWeekInfo` missing in Firefox is not a bug (the attribute covers it), so no `failsIn()` unless rendering differs.

## Steps

1. Write `calendar-month.js` and its test first: `pnpm exec vitest run tests/unit/calendar-month.test.ts`.
2. Write `calendar.css` against a static HTML month; `pnpm sort-css` and `node scripts/check-file.mjs`.
3. Write `Calendar.astro`, `types.ts`, `types.astro.ts`; `pnpm build-components`, or port by hand if it refuses; contract test with `-t Calendar`.
4. Write `calendar.js` and its unit test.
5. `api.ts`, custom properties, examples, `pnpm build-examples`, parity test.
6. Docs page, showcase, skill reference, README, CHANGELOG, What's new, release check; `pnpm check:fast`.
7. Checkout block and stress page; `pnpm test:e2e --project=light --project=dark -g Calendar`.
8. `pnpm check`, the `audit` skill on the diff, then the `update-snapshots` label.

## Open questions

1. Radios in a table, or the APG date grid (`role="grid"` with buttons and `aria-selected`)? Recommended: radios. They work and submit without a script, and the grid pattern gives nothing a reader needs that the element's keys don't add.
2. What do the previous and next buttons do without the element? Recommended: render them only with the element (the Astro component adds the `<script>` import, so they always have it there); in plain HTML the page shows a month without navigation and a variant with links (`?month=2026-12`) for server-driven pages.
3. Days of the adjacent months in the first and last week? Recommended: empty cells in the first version, so every radio is a day of the shown month and the value can't jump months on a click; Nuxt's `fixedWeeks` look can come later as disabled cells.
4. `range` in this component or a separate `DateRange`? Recommended: a `range` boolean on Calendar later, with `startName` and `endName` for its two values.
