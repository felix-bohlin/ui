# InputGroup: implementation plan

Status: plan only. This PR carries the plan; the implementation lands on this branch in later commits.

## Summary

An `InputGroup` joins separate controls into one row with shared edges: a currency select and an amount field, a search field and its Search button, a discount code and Apply. Each control keeps its own label, value and focus; the group only squares the inner corners, overlaps the borders and lines the fields up. It is CSS only.

## Why

- Nuxt UI (`@nuxt/ui` 4.12.0) calls it `UFieldGroup`: a wrapper with `size` and `orientation` (`horizontal` default, `vertical`) that provides both through `fieldGroupInjectionKey` (`dist/runtime/components/FieldGroup.vue:1-31`). Each joinable component (`Input`, `Select`, `Button` and others) reads it with `useFieldGroup` and adds classes that drop the inner radii and pull the borders together: `not-only:first:rounded-e-none not-only:last:rounded-s-none not-last:not-first:rounded-none focus-visible:z-[1]` and `inline-flex -space-x-px` on the root (`dist/shared/ui.Ba0YYeuK.mjs:552-581`).
  - We take: the joined look, both orientations, the focused control on top so its ring isn't covered.
  - We leave: the context that rewrites the children's classes. Our CSS can reach the children's parts from the group with child combinators, so no component has to know it is in a group. And the size through context (see open question 2).
- Why not the name `FieldGroup`: opui already has `FieldGroup` (`packages/opui/components/FieldGroup/FieldGroup.astro`, `.ui-field-group` in `packages/opui/css/components/form.css:83-100`), the wrapper for the controls of a `Fieldset` that stacks or rows them with a gap. Same name, different job. `InputGroup` is the name Bootstrap and shadcn use for this.
- How it differs from what we have:
  - TextField affixes: `.ui-start` and `.ui-end` put text, icons and small buttons inside the field's border (`packages/opui/css/components/text-field.css:99-170`, `src/component-examples/text-field/Affix.astro`, the password toggle). Use them when the extra piece belongs to one value ("€", "kg", a reveal button). InputGroup is for separate controls with their own values and their own borders, such as a currency `Select` next to an amount `TextField`.
  - ButtonGroup: joins only buttons, through `[role="group"].ui-button-group > .ui-button` with box-shadow dividers and an outline on the group (`packages/opui/css/components/button-group.css:1-60`). It clips its children (`overflow: hidden`), which would cut a field's focus ring and a select's picker anchor. It stays the way to join buttons.
- The repo already needs it:
  - `src/blocks/checkout.html:439-449` and `src/blocks/shopping-cart.html:406-416` put a "Discount code" `TextField` and an "Apply" `Button` side by side in a `.ui-field-group.ui-horizontal`, with a gap and two separate borders.
  - `src/blocks/data-table.html:77` and `:93-97` put a search field and a status select next to each other in a toolbar.

## Scope

- In: `.ui-input-group` joining `.ui-text-field`, `.ui-select`, `.ui-number-field` and `.ui-button` children (Textarea too in the vertical orientation), `horizontal` and `vertical`, field rows lined up through subgrid whatever labels and helper texts the children have, focus on top, `InputGroup` in Astro, React, Svelte and Vue, the docs page, the checkout and cart blocks moved onto it.
- Out:
  - Text addons between controls ("https://" as its own boxed segment). TextField's `start` slot already does that inside the field.
  - Joining Checkbox, Radio, Switch, Range or Rating. They are not boxed fields.
  - A size that propagates to the children (open question 2).

## Markup and CSS

```html
<div class="ui-input-group">
  <label class="ui-select">
    <span class="ui-label">Currency</span>
    <span class="ui-field">
      <select name="currency">
        <button type="button"><selectedcontent></selectedcontent></button>
        <div class="ui-list">
          <option>EUR</option>
          <option>SEK</option>
          <option>USD</option>
        </div>
      </select>
    </span>
  </label>
  <label class="ui-text-field">
    <span class="ui-label ui-sr-only">Amount</span>
    <span class="ui-field"><input inputmode="decimal" name="amount" /></span>
  </label>
</div>

<div class="ui-input-group">
  <label class="ui-text-field ui-small">
    <span class="ui-label">Discount code</span>
    <span class="ui-field"><input name="discount" type="text" /></span>
  </label>
  <button class="ui-button ui-outlined ui-small" type="button">Apply</button>
</div>
```

- Stylesheet: `packages/opui/css/components/input-group.css`. Its rules must beat `text-field.css` and `button.css` on the same elements (radius and margin on `.ui-field` and `.ui-button`), so it declares `components.extended` and goes in the Extended components group of `css/components.css`. Sorted, it lands between `form.css` and `list.css`, which is after `button-group.css` but before `text-field.css`; since both layers are `components.extended`, order inside the layer matters, so add `"input-group.css": "text-field.css"` to `BUILDS_ON` in `tests/unit/layers.test.ts:60-62` and import it right after `text-field.css` (as `one-time-code.css` does), or raise specificity with the group's own class so order doesn't matter (open question 3).
- Layout: the children's field rows line up through subgrid, since a TextField is a grid whose field sits on row 2 with helper texts on rows 3 and 4 (`text-field.css:34-46`, `:390-419`).

```css
@layer components.extended {
  :where(.ui-input-group) {
    --_joined-radius: 0;

    align-items: start;
    display: inline-grid;
    grid-auto-columns: auto;
    grid-auto-flow: column;
    grid-template-rows: repeat(4, auto);
    max-inline-size: 100%;

    & > :is(.ui-text-field, .ui-select, .ui-number-field) {
      grid-row: 1 / span 4;
      grid-template-rows: subgrid;
    }

    & > .ui-button {
      align-self: center;
      grid-row: 2;
    }

    /* Inner corners */
    & > :not(:first-child) > .ui-field,
    & > .ui-button:not(:first-child) {
      border-end-start-radius: var(--_joined-radius);
      border-start-start-radius: var(--_joined-radius);
      margin-inline-start: calc(-1 * var(--ui-field-border-width));
    }

    & > :not(:last-child) > .ui-field,
    & > .ui-button:not(:last-child) {
      border-end-end-radius: var(--_joined-radius);
      border-start-end-radius: var(--_joined-radius);
    }

    /* The focused or invalid control sits on top, so its border and ring show whole */
    & > :has(:focus-visible, [aria-invalid="true"], :user-invalid) {
      z-index: 1;
    }
  }
}
```

A Select boxes its `select` in the same `.ui-field` (`src/blocks/data-table.html:93-97`), so one selector covers both.

- The first field's label shows; the others usually use `hideLabel` (`.ui-sr-only`) so the row reads as one labeled control. With subgrid, a visible label on any child still lines up, and a button lines up with the field row, not the label.
- `.ui-vertical`: `grid-auto-flow: row`, every child full width, the block-start and block-end corners squared instead, `margin-block-start` overlap. Textarea joins here (a note above a Save button).
- Columns: text fields and number fields take `minmax(0, 1fr)`, selects and buttons `auto`, written as `& > :is(.ui-text-field, .ui-number-field) { grid-column: auto; }` with `grid-auto-columns: auto` on the group and `inline-size: 100%` plus `grid-template-columns` from `:has()` when a text field is present. Settle the exact rule in step 1 with the two blocks as the test cases; the goal is that the text field grows and the select and button keep their content size.
- Modifiers: `orientation` with `horizontal` (default, no class) and `vertical` (`.ui-vertical`), matching the naming model.
- Tokens: none new. Reads `--ui-field-border-width`. `--_joined-radius` is documented in `src/component-api/custom-properties/input-group.ts` for themes that want a small inner radius.
- Features for `browserSupport`: `has` (the focus rule), `subgrid`, `user-pseudos`.
- Forced colors: no block. The joined borders are real borders, which the browser forces to `CanvasText`; the focus ring is TextField's own `Highlight` block. Add `InputGroup` to the "without a block" list in `packages/opui/components/AGENTS.md`.
- More contrast, motion: nothing of its own.
- Right-to-left: every property is logical (`border-start-start-radius`, `margin-inline-start`), and grid columns follow the inline direction.

## Behavior

No script. Each control keeps its own value and form participation.

## Component API

`InputGroup`, compiled by `pnpm build-components`.

| Prop          | Type                         | Default        | Renders        |
| ------------- | ---------------------------- | -------------- | -------------- |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | `.ui-vertical` |

- Slots: `default` (the controls).
- Role: none by default. When the controls make up one value (currency and amount), the caller adds `role="group"` and `aria-labelledby` pointing at the visible label. The docs show both cases. If a `role` is passed without a name, warn in development with `warnUnnamedGroup` from `packages/opui/components/dev.ts`, as `ToggleGroup` does (guide section 3, Accessible names).
- `model`: none.

```astro
---
import { Button, InputGroup, Select, TextField } from "opui-css/astro"
---

<InputGroup aria-labelledby="price-label" role="group">
  <Select
    id="price-label"
    items={[
      { label: "EUR", value: "eur" },
      { label: "SEK", value: "sek" },
      { label: "USD", value: "usd" },
    ]}
    label="Price"
    name="currency"
  />
  <TextField hideLabel inputmode="decimal" label="Amount" name="amount" />
</InputGroup>

<InputGroup>
  <TextField label="Discount code" name="discount" size="small" />
  <Button size="small" variant="outlined">Apply</Button>
</InputGroup>
```

(Point `aria-labelledby` at the Select's label id, not the Select's `id`; check how Select exposes its label id when writing the example.)

## Accessibility

- Each control keeps its own label; a hidden label (`hideLabel`) still names the field. A `role="group"` with a name groups them for screen readers when they form one value.
- No keyboard behavior of its own: Tab moves through the controls in DOM order.

| Key           | Action                         |
| ------------- | ------------------------------ |
| `Tab`         | Moves to the next control.     |
| `Shift + Tab` | Moves to the previous control. |

- What axe can't catch: that the focus ring of a middle control isn't covered by its neighbors (`z-index` rule), that an invalid control's red border shows on all four sides when joined, that hidden labels are still meaningful ("Amount", not "Input 2"), and that the visual order matches the DOM order.

## Docs page

`src/docs/components/input-group.astro`, `slug="input-group"`, `heroAnatomy`.

- Preamble: "Joins separate controls into one row with shared edges." Name the siblings, linked both ways: Button group (joins buttons), Text field (affixes inside one field), Field group (lays out a form's controls with a gap). Add the InputGroup link to the preambles of `button-group.astro`, `text-field.astro` and `form.astro`.
- Usage: when to use (a value with a unit picked from a list, a field and the button that acts on it, a search with a scope select); when not to use (a unit or icon that belongs to one value, use TextField's `start`/`end`; buttons only, use ButtonGroup; laying out a form, use FieldGroup).
- Sections:
  1. Basics (`Basics`): discount code and Apply, from the checkout block.
  2. Select and field (`SelectAndField`): currency and amount with `role="group"`.
  3. Search (`Search`): a search field and a Search submit button.
  4. Labels (`Labels`): visible labels on both children, and helper text on one, lined up by subgrid.
  5. Sizes (`Sizes`): `small` and `large` set on each child.
  6. Validation (`Validation`): an invalid amount between a select and a button.
  7. Vertical (`Vertical`): a Textarea above a Send button.
  8. Accessibility slot: group or no group, hidden labels, keyboard table.
- Anatomy: root `.ui-input-group`, the children's `.ui-field` and `.ui-button`.
- `browserSupport={["has", "subgrid", "user-pseudos"]}`.

## Blocks and other pages

- `src/blocks/checkout.html:439-449` and `src/blocks/shopping-cart.html:406-416`: `.ui-field-group.ui-horizontal` becomes `.ui-input-group`. New baselines.
- `src/blocks/data-table.html:70-100`: the search field and the status select could join; check the toolbar's spacing first and leave it alone if it reads as two filters rather than one control.
- `src/stress-tests/forms.html`: an InputGroup in each `[data-size]` row, so `tests/e2e/stress.spec.ts` checks that the joined controls share one control size, and themes snapshot it.

## Files

- `packages/opui/components/InputGroup/`: `InputGroup.astro`, `types.ts`, `types.astro.ts`, compiled `InputGroup.react.tsx`, `InputGroup.svelte`, `InputGroup.vue`, `types.react.ts`, `types.svelte.ts`, `types.vue-props.ts`.
- Barrels: `packages/opui/astro/index.ts`, `react/index.ts`, `svelte/index.ts`, `vue/index.ts`.
- `packages/opui/css/components.css`, `packages/opui/css/components/input-group.css`, `tests/unit/layers.test.ts` (`BUILDS_ON`) if it imports after `text-field.css`.
- `src/component-api/input-group/api.ts`, `src/component-api/custom-properties/input-group.ts`.
- `src/component-examples/input-group/` (the seven examples above, five formats each).
- `src/docs/components/input-group.astro`, and the preambles of `button-group.astro`, `form.astro`, `text-field.astro`.
- `src/components/ComponentShowcase/ComponentShowcase.astro`.
- `packages/opui/skills/opui/references/input-group.md`, `references/index.md`, `packages/opui/README.md`.
- `packages/opui/CHANGELOG.md`, `### Added`: "`InputGroup` joins text fields, selects, number fields and buttons into one row with shared edges, lining up their fields whatever labels and helper texts they have (`.ui-input-group`, `.ui-vertical`)."
- `src/utils/whats-new.ts`: an `input-group` entry linking `#basics`, the slug in `added` and `highlighted`.
- `docs/releases/6.0.0.md`: a Components check linking `/html/components/input-group/` (focus ring of the middle control, invalid border, RTL corners).
- `tests/package/package.test.ts`.
- `packages/opui/components/AGENTS.md`: InputGroup in the forced colors "without a block" list.
- `src/blocks/checkout.html`, `src/blocks/shopping-cart.html`, `src/stress-tests/forms.html`.
- Generated: search index, parity snapshots, generated files.

## Tests

- Unit: `component-contract.test.ts`, `parity.test.ts`, `naming.test.ts`, `example-coverage.test.ts` (`vertical`), `layers.test.ts`, `forced-colors.test.ts`, `changelog.test.ts`, `whats-new.test.ts`.
- E2E: in `interaction.spec.ts` or a new spec, measure with `getBoundingClientRect` that the fields and buttons of each example share one top and bottom edge (the subgrid promise), that adjacent borders overlap by one border width (no double line), and that a focused middle control's outline isn't covered (an `elementFromPoint` check on the ring's edge). `stress.spec.ts` covers control sizes. Visual baselines from CI.
- Engines: subgrid ships everywhere; if WebKit or Firefox lines the rows up differently, record it with `failsIn()` and a repro in `tests/e2e/engines.spec.ts`.

## Steps

1. Write `input-group.css` against the checkout block and the `Labels` case on a scratch page; settle the column sizing and the Select's part names. Check: `pnpm sort-css:check`, `pnpm check-css-vars`, `layers.test.ts`.
2. Move the checkout and cart blocks. Check: the blocks in `pnpm dev` at 320px and 1280px.
3. `InputGroup.astro`, `types.ts`, `types.astro.ts`, `pnpm build-components`. Check: `pnpm check-ports`, `component-contract.test.ts -t InputGroup`.
4. `api.ts`, custom properties, examples, `pnpm build-examples`. Check: `pnpm check-examples`, `parity.test.ts -t input-group`, `example-copy.test.ts`.
5. Docs page and preamble links, barrels, README, skill reference, CHANGELOG, What's new, release check, guide list. Check: `pnpm check:fast`.
6. E2E alignment spec, `pnpm test:e2e --project=light --project=dark -g "Input group"`, then `pnpm check`. Push, `update-snapshots`.

## Open questions

1. Name: `InputGroup`, or extend `ButtonGroup` to take fields? Recommended: `InputGroup`. ButtonGroup's clipping, outline and box-shadow dividers are built for buttons and would cut field focus rings and the Select picker.
2. A `size` on the group that the children follow? Recommended: not now. Each child takes `size` as the blocks already write it, and `stress.spec.ts` checks they match. A context that sizes children would need every joinable component to read it in four frameworks.
3. Import after `text-field.css` with a `BUILDS_ON` entry, or win by specificity? Recommended: `BUILDS_ON`, the same mechanism `one-time-code.css` uses, so no selector is heavier than it needs to be.
4. Move the data-table toolbar onto it? Recommended: only if the joined search and status filter read as one control; otherwise leave it.
