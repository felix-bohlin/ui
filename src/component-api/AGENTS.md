# Component API Documentation Guide

This guide defines the standards for documenting component APIs (HTML, Astro and Vue) in `src/component-api/`. Use this as a reference when generating or updating `api.ts` files, or the few remaining hand-written `.astro` tables.

## Checklist for Documentation

When creating or updating a component API table, ensure:

- [ ] **File Format**: An `api.ts` data file (see [Data-driven APIs](#data-driven-apis-apits)). Only `menu` and `toast` still use hand-written `.astro` tables.
- [ ] **Folder Structure**: One folder per component (e.g., `src/component-api/button/`) holding `api.ts`, or the legacy `Astro.astro`, `HTML.astro` and `Vue.astro` tables.
- [ ] **Table Component**: Legacy `.astro` tables use the `Table` component from `@opui/astro`.
- [ ] **Table Sub-components**: Use `Table.Head`, `Table.Body`, `Table.Row`, `Table.Cell`, `Table.HeaderCell`, `Table.ColumnGroup`, and `Table.Column` for table structure.
- [ ] **Column Widths**: Use `Table.ColumnGroup` and `Table.Column` to specify widths: `width="min-width: 20%"`, `width="min-width: 20%"`, `width="min-width: 20%"`, `width="min-width: 300px"`.
- [ ] **CSS Verified**: All modifiers and selectors (e.g., `& > .content`) exist in the component's CSS file in `packages/opui/css/components/`.
- [ ] **Dots on Classes**: Every CSS class modifier starts with a dot (e.g., `.ui-primary`).
- [ ] **Code Tags**: All CSS classes, selectors, HTML tags, and Astro component props are wrapped in `<code>` tags (exception: `default` and group names like `Slots`).
- [ ] **Standard Types**: Use `Base` or `Children`, `Variants`, and `Sizes` where appropriate.
- [ ] **Default Keyword**: Use lowercase `default` (no tags, no dot) in the **Modifiers** column when a property has a baseline state with no specific class.
- [ ] **Default Column**: Use a hyphen `-` if there is no default value. If there is a default, match the formatting used in the **Type** or **Modifiers** column (e.g., `<code>"text"</code>` or `<code>.ui-primary</code>`).
- [ ] **Short Descriptions**: All descriptions are very short and concise (often a single sentence fragment).

## Workflow

1.  **Cross-Reference CSS**: Before documenting modifiers, verify the actual selectors and class names in the corresponding CSS file located in `packages/opui/css/components/`. Ensure that structural selectors (like `& > summary`) match the implementation.
2.  **Table Format**:
    - **Astro API**: Use `Prop`, `Type`, `Default`, and `Description`.
    - **HTML API**: Use `Type`, `Modifiers`, `Default`, and `Description`.
3.  **Class Prefixing**: **CRITICAL**: Any modifier that represents a CSS class in an HTML API table must use the `ui-` prefix and a leading dot (e.g., `.ui-primary`, not `primary` or `.primary`).
    - **Note**: The keyword `default` is not a class and should NOT have a dot.
4.  **Code Tags**: All CSS classes, selectors, HTML tags, and Astro component props must be wrapped in `<code>` tags (e.g., `<code>.ui-text</code>`, `<code>& > svg</code>`, `<code>"outlined"</code>`, `<code>size</code>`).
    - **Exception**: The keyword `default` and group names (like `Slots`, `Children`, `Variants`, `Sizes`) are NEVER wrapped in `<code>` tags.
    - **No Code Sausages**: Do not create long `<code>` tags with multiple values. Split them into individual `<code>` tags (e.g., `<code>"text"</code>`, `<code>"outlined"</code>` instead of `<code>"text" | "outlined"</code>`).
5.  **Astro Types**: For Astro components, use TypeScript-like types in the **Type** column (e.g., `<code>"small"</code>`, `<code>"large"</code>`, `<code>boolean</code>`). Use commas as delimiters.
6.  **Default Values**: Use a hyphen `-` in the **Default** column if no default value is applicable (common for structural entries like `Part`, `Children`, or `Slots`). If a default exists, provide it using the same formatting as the **Type** or **Modifiers** column.
7.  **Standard Types**:
    - Use `Slots` for structural child elements in Astro components that ARE slots.
    - Use `Children` for structural child elements in Astro components that AREN'T slots.
    - Use `Children` for structural child elements in HTML documentation.
    - Use `Part` for structural elements or base selectors in HTML documentation.
    - Use `Variants` for style variations.
    - Use `Sizes` for size variations.
8.  **Concise Descriptions**: **CRITICAL**: Descriptions must be very short. Use brief sentence fragments that focus strictly on visual or functional impact.
    - **Standard Phrases**: Reference these for consistency:
      - `The variant to use.` (for Variants)
      - `The size of the element.` (for Sizes)
      - `Optional slots.` (for Slots)
      - `Optional child content.` (for Children)
      - `Optional colors.` (for Colors)
      - `The orientation of the element.` (for Orientation)

## Framework-specific APIs

API tables are **auto-resolved** when the doc page declares `slug="..."` on `<Component>`. The layout uses `src/component-api/<slug>/api.ts` when it exists. Otherwise it globs `src/component-api/<slug>/<Label>.astro` for every framework in `FRAMEWORKS` ([src/utils/framework.js](../utils/framework.js)), which only `menu` and `toast` still use:

```
src/component-api/button/
  api.ts
src/component-api/menu/
  Astro.astro
  HTML.astro
  Vue.astro
```

The doc page is just:

```astro
<Component slug="button">...</Component>
```

No `apis` prop, no manual imports.

Pass `apis={[ ... ]}` explicitly to give the section a title, or to show several API sections on one page (e.g., a component plus its `*Group` companion):

```astro
---
import buttonApi from "../../component-api/button/api"
import buttonGroupApi from "../../component-api/button-group/api"
---

<Component
  apis={[
    { title: "Button group API", api: buttonGroupApi },
    { title: "Button API", api: buttonApi },
  ]}>...</Component
>
```

## Data-driven APIs (`api.ts`)

`src/component-api/<slug>/api.ts` default-exports a `ComponentApi` ([types.ts](types.ts)) and replaces the hand-written tables for every framework. [text-field/api.ts](text-field/api.ts) is the reference implementation.

- `component`: (Required) the name shown in tables and build warnings, such as `TextField` or `Tabs.Item`. Keep `component:` and `page:` as single-line, two-space-indented string literals; `scripts/build-agent-skill.mjs` reads them to build `references/index.md`.
- `source`: the component folder in `packages/opui/components/`. Omit it for CSS-only components, such as `spinner`; every framework then shows the HTML tables plus its `notes`.
- `page`: the docs page slug when it differs from the folder, such as `tabs` for `tabs-item`. The API index links to it, and the build warns when it does not exist.
- `file`: the component file name when it differs from `component`, such as `TabsItem` for `Tabs.Item`. Props are read from the `<file>Props` type, or `Props`.
- `hydration`: per-framework props that need a client directive, each with a `description` and an optional `fallback`. They get a marker in the props table.
- `root` and `parts`: structural elements with a `selector` and a `description`. `code` overrides the selector shown in the table, such as `<summary>`. A part lists the `props` and `slots` that fill it (kebab-case slot names), plus optional `legacy` aliases and `model`. Set `anchorName` when the part's CSS already sets an `anchor-name`, so `<Anatomy>` keeps it. Set `component` when a sub-component renders the part, such as `{ astro: "DescriptionList.Term", vue: "DescriptionListTerm" }`. Keep parts in visual order; they also drive the `<Anatomy>` diagram and the HTML parts table.
- `options`: props and their HTML equivalent (`class` or `attribute`, `group` for the HTML table). Use `frameworks` to limit an option to some frameworks and `type` to override the resolved type.
  - `values` maps each value of an enum prop to its modifier, or `null` when the value adds none (shown as `default`). The build warns when the keys don't match the prop's type.
  - `part` is the selector of the part that gets the modifier, such as `.ui-actions` for `actionsAlign`.
  - `htmlDefault` overrides the default in the HTML table, or hides it with `null`.
  - `cssVar` is the CSS property an option sets, such as `--anchor-position-area` or `font-size`. It can be combined with a class or `values`.
- `slots`: slots that aren't parts, such as `default`.
- `css`: the stylesheets under `packages/opui/css/components/` the component is styled by, without the extension. Defaults to the kebab-cased `source`. The CSS variables table lists every theme token those files read, with the default from `theme.css` and the description from `src/utils/theme-token-descriptions.ts`.
- `model` and `notes`: the bound value and per-framework notes.

Prop names and types are read from each framework's types file, and Astro/Vue slots from the component source, so they are never written by hand. Framework syntax lives in [frameworks.ts](frameworks.ts). The build warns (`[component-api]`) when a prop or slot is missing from `api.ts` or documented but not in the source.

Pages pass it to `<Component>` as `apis={[{ title: "Text field API", api }]}`, or let `<Component slug="...">` pick it up without a title. `<Anatomy>` finds it from the page slug. `tests/e2e/anatomy.spec.ts` checks every page with `heroAnatomy` for overflow, spacing and axe violations.

## Example Reference

**Legacy Astro table (shortened from src/component-api/menu/Astro.astro)**

```astro
---
import { Table } from "@opui/astro"
---

<Table>
  <Table.ColumnGroup>
    <Table.Column width="min-width: 20%" />
    <Table.Column width="min-width: 20%" />
    <Table.Column width="min-width: 20%" />
    <Table.Column width="min-width: 300px" />
  </Table.ColumnGroup>
  <Table.Head>
    <Table.Row>
      <Table.HeaderCell>Prop</Table.HeaderCell>
      <Table.HeaderCell>Type</Table.HeaderCell>
      <Table.HeaderCell>Default</Table.HeaderCell>
      <Table.HeaderCell>Description</Table.HeaderCell>
    </Table.Row>
  </Table.Head>
  <Table.Body>
    <Table.Row>
      <Table.Cell><code>align</code></Table.Cell>
      <Table.Cell><code>"start"</code>, <code>"end"</code></Table.Cell>
      <Table.Cell><code>"start"</code></Table.Cell>
      <Table.Cell>Which edge of the trigger the menu lines up with.</Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell><code>dense</code></Table.Cell>
      <Table.Cell><code>boolean</code></Table.Cell>
      <Table.Cell><code>false</code></Table.Cell>
      <Table.Cell>Less spacing.</Table.Cell>
    </Table.Row>
  </Table.Body>
</Table>
```

Refer to [card/api.ts](card/api.ts) and [text-field/api.ts](text-field/api.ts) for the preferred implementations of multi-framework APIs.
