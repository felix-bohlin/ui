# Component API Documentation Guide

This guide defines the standards for documenting Astro UI component APIs in `src/component-api/`. Use this as a reference when generating or updating `-api.astro` files.

## Checklist for Documentation

When creating or updating a component API table, ensure:

- [ ] **File Format**: All API files must be `.astro` files.
- [ ] **Folder Structure**: If a component has different APIs for Astro and HTML, use a folder (e.g., `src/component-api/button/`) with `Astro.astro` and `HTML.astro`.
- [ ] **Table Component**: Use the `Table` component from `../../ui-components/Table` (adjust path as needed).
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

API tables are **auto-resolved** when the doc page declares `slug="..."` on `<Component>`. The layout globs `src/component-api/<slug>/<Label>.astro` for every framework in `FRAMEWORKS` ([src/utils/framework.js](../../utils/framework.js)) — so the conventional layout is:

```
src/component-api/button/
  Astro.astro
  HTML.astro
```

The doc page is just:

```astro
<Component slug="button">...</Component>
```

No `apis` prop, no manual imports. Adding a framework with a matching `<Label>.astro` file in the same folder picks it up automatically.

You only need to pass `apis={{ ... }}` explicitly for non-standard layouts:

- Shared API tables across components (e.g., `field-api.astro` reused by several form components).
- Multiple API sections per page (e.g., a component plus its `*Group` companion):

```astro
---
import FieldAPIHTML from "../../component-api/field/HTML.astro"
import FieldGroupAPIHTML from "../../component-api/field-group/HTML.astro"
---

<Component
  apis={[
    { title: "Field", id: "field", component: FieldAPIHTML },
    { title: "Field group", id: "field-group", component: FieldGroupAPIHTML },
  ]}>...</Component
>
```

## Example Reference

**Button Astro (src/component-api/button/Astro.astro)**

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
      <Table.Cell><code>size</code></Table.Cell>
      <Table.Cell><code>"small"</code>, <code>"large"</code></Table.Cell>
      <Table.Cell>-</Table.Cell>
      <Table.Cell>The size of the button.</Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell><code>variant</code></Table.Cell>
      <Table.Cell
        ><code>"outlined"</code>, <code>"tonal"</code>, <code>"filled"</code
        ></Table.Cell
      >
      <Table.Cell>-</Table.Cell>
      <Table.Cell>The variant to use.</Table.Cell>
    </Table.Row>
  </Table.Body>
</Table>
```

Refer to [card/Astro.astro](card/Astro.astro) and [card/HTML.astro](card/HTML.astro) for the preferred implementations of multi-language APIs.
