# Component Documentation & Refactoring Guide

This document is the definitive guide for creating and refactoring component documentation pages. It outlines the patterns, components, and research steps required to ensure consistency and maintainability across the site.

## 0. Architecture at a Glance

The docs site uses **URL-based framework routing**, not client-side toggling:

- Every framework lives under its own URL prefix (e.g. `/html/components/button`, `/astro/components/button`).
- Configured in [astro.config.mjs](../../../astro.config.mjs) under `i18n` (`defaultLocale: "html"`, `prefixDefaultLocale: true`).
- Legacy unprefixed paths (e.g. `/components/button`) are 301-equivalent meta-refresh pages that point at the default framework variant, declared via the `redirects` map in [astro.config.mjs](../../../astro.config.mjs). The map is built by enumerating component and guide slugs from `src/docs/`, so adding a new component or guide page automatically gets a redirect.
- The active framework is exposed server-side as `Astro.currentLocale`.
- Each per-component documentation file is rendered **once per framework**. `<Conditional>`, `<Example>`, and `<ComponentAPI>` read `Astro.currentLocale` and emit only the matching slot.

Practical implication: **author each page once with all framework slots populated.** The router and these components decide what gets rendered for any given URL.

## 1. Research & Analysis Phase

Before creating or refactoring a page, perform the following research:

1.  **Analyze the Component Source**: Read `packages/opui/components/[Name]/[Name].astro` to identify:
    - Supported props (e.g., `variant`, `size`, `color`).
    - Default prop values.
    - Default HTML structure and class names.
    - Provided slots (e.g., `title`, `summary`, `controls`).
2.  **Analyze the CSS**: Read `packages/opui/css/components/[name].css` to identify:
    - Modifier classes (e.g., `.ui-filled`, `.ui-outlined`, `.ui-small`).
    - Modern CSS features being used (to populate `browserSupport`).
    - Internal part classes (to target for the `anatomy` section).
3.  **Check for API Metadata**: Verify if a corresponding API file or folder exists in `src/component-api/`.
    - For single APIs: `src/component-api/[name]-api.astro`.
    - For multi-framework APIs: `src/component-api/[name]/Astro.astro` and `src/component-api/[name]/HTML.astro`.
    - If not, create them based on the props identified in step 1. Note that some components share APIs (e.g., `field-api.astro`).
4.  **Identify Dependencies**: Determine if the component relies on other components.
    - **Field-based components** (`TextField`, `Select`, `Textarea`): Usually depend on `field.css`.
    - **Group-based components** (`CheckboxGroup`, `RadioGroup`): Usually depend on `form.css`.
    - **Popover-based components** (`Select`): Usually depend on `list.css`.
5.  **Examine Patterns**: Read a similar existing module (e.g., `src/docs/components/accordion.astro`) to ensure UI and content parity.

## 2. File Structure & Location

- **Documentation Modules**: `src/docs/components/[name].astro` (lowercase, kebab-case). These are shared per-component modules consumed by the dynamic route shell. There is no `src/pages/components/` directory — legacy `/components/...` URLs are handled by the `redirects` map in [astro.config.mjs](../../../astro.config.mjs).
- **Route Shell** (do not edit per-component): [`src/pages/[framework]/components/[component].astro`](../../pages/%5Bframework%5D/components/%5Bcomponent%5D.astro) generates one route per (framework × component) and delegates to `src/docs/components/[name].astro`.
- **Example Files**: For each component, create a directory: `src/component-examples/[component]/`.
  - `Basics.astro` (Rendered preview and Astro source)
  - `Basics.html` (Vanilla HTML equivalent)
  - `Variants.astro`, `Variants.html`, etc.
- **Naming**: Use PascalCase for example files (e.g., `Basics.astro`, `LargeSizing.astro`).
  - If a code snippet needs to differ from the rendered preview (e.g., to hide documentation-specific scripts or wrappers), use a suffix like `Code.astro`.

## 3. Implementation Pattern: Externalized Examples

Inline HTML/Astro code examples live in `src/component-examples/`. The active framework is determined by URL routing, and `<Example>` server-renders only the matching slot — but you still author all framework slots in the page so every variant can be served.

### 3.1 Basic Page Template

Every component module lives under `src/docs/components/` and uses the `Component` layout. The standard pattern uses `<AutoExample>` and the layout's auto-API resolver — both keyed off the page's `slug` — so adding a new section or framework is a filesystem operation, not an import-list edit:

```astro
---
import Component from "../../layouts/Component.astro"
import DocLink from "../../components/DocLink.astro"
import AutoExample from "../../components/AutoExample.astro"

import ComponentCSS from "@opui/css/components/component.css?raw"
---

<Component
  slug="component"
  browserSupport={["feature-id"]}
  installationTabs={[
    { title: "component.css", code: ComponentCSS, lang: "css" },
  ]}
>
  <Fragment slot="title">Component Name</Fragment>
  <Fragment slot="preamble">
    Brief description. See also: <DocLink
      href="/components/related"
      class="ui-link">Related</DocLink
    >.
  </Fragment>

  <section>
    <h2 id="basics">Basics</h2>
    <AutoExample name="Basics" row />
  </section>
</Component>
```

What the conventions handle automatically:

- **`<AutoExample name="Basics">`** globs `src/component-examples/<slug>/Basics.{astro,html}` for every framework registered in `FRAMEWORKS` ([src/utils/framework.js](../../utils/framework.js)). Drop a file in the right folder and the section picks it up.
- **API tables** are auto-resolved from `src/component-api/<slug>/<Label>.astro` (where `<Label>` is the framework's display label, e.g. `Astro.astro`, `HTML.astro`). No `apis={{ ... }}` prop needed unless you have a non-standard layout.
- The layout sets `Astro.locals.componentSlug = slug`, which `<AutoExample>` reads — so each example only repeats `name`, never the slug.

CSS imports use the `@opui/css/...` package alias. UI-component imports use `@opui/astro` (e.g. `import { Button } from "@opui/astro"`). Avoid hand-rolled relative paths into the package.

#### When to fall back to manual `<Example>`

`<AutoExample>` covers the common case (file-per-framework with matching basenames). Use the manual `<Example>` form when a section needs:

- A `<slot name="controls">` for interactive switches.
- A `code-js` slot (JS-driven demos like Toast).
- A `*Code.astro` source override that differs from the rendered preview (used to hide doc-only wrappers).
- Inline JSX content as the preview (used by some `anatomy` slots).

The manual form remains supported and unchanged:

```astro
<Example column>
  <Example.Preview slot="preview-astro" code={ExampleBasics} />
  <Example.Preview slot="preview-html" code={ExampleBasicsHTML} />
  <Example.Code slot="code-astro" code={ExampleBasicsCodeAstro} />
</Example>
```

### 3.2 Refactoring Steps

1.  **Extract Examples**: Move inline code to `src/component-examples/{component}/`.
    - `.astro` files should contain UI components imported via the `@opui/astro` alias (e.g. `import { Button } from "@opui/astro"`).
    - `.html` files should contain vanilla HTML equivalents. **HTML examples must be just as functional and complete as the Astro ones.**
    - Do not wrap the whole example in `<div class="example-row">` / `<div class="example-column">` — set `row` / `column` on `<AutoExample>` in the docs page instead. Multiple sibling `example-row` / `example-column` groups inside one example are fine.
2.  **Replace `<Example>` blocks**: For each standard section, replace the import block + `<Example>` + four slots with a single `<AutoExample name="..." />`.
3.  **Cleanup**: Remove the now-unused `?raw` and component imports from the page frontmatter.

## 4. Layout Props & Slots

The `Component` layout ([src/layouts/Component.astro](../../layouts/Component.astro)) provides the following inputs:

### 4.1 Props

- `apis`: (Optional) Either a single imported API module, an array of `{ title, component }` objects, or a framework-keyed object `{ astro, html }` (preferred when API tables differ per framework).
- `browserSupport`: (Optional) Array of feature IDs (e.g., `["has", "light-dark"]`).
- `changelogPaths`: (Optional) Array of `{ path, type }` entries used to render the per-component changelog.
- `installationTabs`: (Optional) Array of `{ title, code, lang }` objects.
- `overline`: (Optional) Sidebar/breadcrumb overline. Defaults to `"Components"`.
- `seeAlsoLinks`: (Optional) Array of `{ name, href }` entries rendered in a "See also" section.

### 4.2 Slots

- `title`: (Required) The page heading.
- `preamble`: (Optional) Introductory text.
- `default`: Main documentation content.
- `anatomy`: (Optional) Component's internal structure visualization.
- `accessibility`: (Optional) Accessibility notes.
- `installation`: (Optional) Extra context above installation tabs.

## 5. Components & Patterns

### 5.1 `<Example>` and Demos

- **Layout**: Use `row` or `column`. Use `centered` to center items, `spacious` for more padding.
- **No outer layout wrapper in example files**: Files in `src/component-examples/` must not wrap _all_ of their content in a single outer `<div class="example-row">` or `<div class="example-column">`. `<Example row>` / `<Example column>` already applies that class to the surrounding `.example-preview` in [src/components/Example/Example.astro](../../components/Example/Example.astro), so the wrapper is redundant. Inner `example-row` / `example-column` groupings are still allowed when a single example legitimately needs to be split into multiple sibling rows/columns (e.g., one row per variant).
- **Preview**: Use `Example.Preview` with `slot="preview-html"` or `slot="preview-astro"`.
- **Code**: Use `Example.Code` with `slot="code-html"` or `slot="code-astro"`. The HTML route falls back to the prettified preview HTML when `code-html` isn't authored, so an explicit `code-html` is only needed when the snippet must differ from the rendered preview (e.g., to hide doc-only wrappers — see the `*Code.astro` pattern in §2). Use `slot="code-js"` for JS-driven demos where the source is JavaScript regardless of the active framework (e.g., Toast).
- **Controls**: Use `slot="controls"` for interactive elements (like `UISwitch`) that control the preview state.

### 5.2 API Documentation

**DO NOT hardcode API tables.** API resolution is automatic when the page sets `slug="..."` on `<Component>`: the layout globs `src/component-api/<slug>/<Label>.astro` for every framework in `FRAMEWORKS`. You only need the `apis` prop for non-standard layouts (e.g., shared API folders like `field-api.astro`, or multiple API tables per page).

- Markdown files in `src/component-api/` should use tables with: `Type`, `Modifiers`, `Default`, `Description`.
- Link `Type` values to relevant sections (e.g., `[Variants](#variants)`).

### 5.3 `<UICallout>` (Alerts & Info)

- **Severity**: `ok`, `warning`, `critical`, or default (blue).
- **Wrapping**: Always wrap in `<div class="not-rich-text">`.
- **Content**: If multiple paragraphs/lists, wrap content in `<div class="rich-text">`.

### 5.4 Anatomy Section

Use the `anatomy` slot for internal structure visualization.

- **Only Astro**: The anatomy section is purely visual documentation. Do not provide multiple templating-language examples (HTML, Vue, React, etc.). Use a single `.astro` file with the `.anatomy` class applied to the component instance. Use `slot="preview-astro"` on `Example.Preview`. Do not provide an `Example.Code` snippet.
- **Visuals**: Apply an `.anatomy` class to the UI component instance.
- **Styles**: Use `<style is:global>` to define diagnostic outlines (e.g., `outline: var(--_anatomy-border-gray)`).

### 5.5 Interactivity (JavaScript)

Place logic in a `<script>` tag.

- Use specific IDs to avoid global conflicts.
- Wrap logic in a function and call it on `astro:after-swap` for View Transitions.

### 5.6 `<Conditional>` (Framework-Specific Content)

Use `<Conditional>` to display different text or HTML content for different frameworks. This is ideal for descriptions or instructions that only apply to a specific framework (e.g., explaining an `aria-label` attribute for HTML vs. a `label` prop for Astro).

- **Slots**: Named after the framework ids defined in `FRAMEWORKS` ([src/utils/framework.js](../../utils/framework.js)). Today: `html`, `astro`.
- **Props**: `as` (optional). Defaults to `span` for inline content. Use `as="div"` or `as="p"` for block-level content.
- **Resolution**: Server-rendered. The component reads `Astro.currentLocale` (driven by URL routing) and emits only the matching slot. Falls back to the default framework's slot if the active framework's slot is not authored.

## 6. Content Generation & Best Practices

- **Analytical Examples**: Show sections for each major variant, size, and state found in CSS/source.
- **Modifier Descriptions**: Section descriptions should focus on **actionable modifiers** (props or CSS classes).
  - **Include** when explaining how to change the component (e.g., "Set the `orientation` prop to change the button group layout" or "Resize any button with the `.ui-small` and `.ui-large` classes").
  - **Omit** when the heading is self-explanatory and the configuration is static or default (e.g., "Image", "Letter", or "Icon" sections for an Avatar). If the section merely showcases a built-in capability without requiring specific prop-based modification logic to understand, skip the description to avoid "stating the obvious."
  - **Framework-Specific Counterparts**: Descriptions should always have framework-specific counterparts when referring to implementation details (like props vs. classes). Use the `<Conditional>` component to ensure the technical guidance matches the active framework's URL.
- **Functional Parity**: Ensure that HTML examples are just as functional and complete as their Astro counterparts. Both versions should result in the same visual and functional output in their respective previews.
- **Code Example Intent**: Code examples should be **sparse and minimal**. Focus on highlighting the most important change or point of the demo rather than being an exhaustive mirror of the preview's implementation.
- **No Fluff**: Stick to direct, technical descriptions. No conversational filler.
- **Alphabetical Order**: Organize imports and props alphabetically where possible.

## 7. Key Learnings & Debugging

- **Framework Routing**: Every framework lives under its own prefix (e.g. `/html/components/button`, `/astro/components/button`). The active framework comes from `Astro.currentLocale` and flows into `<Conditional>`, `<Example>`, and `<ComponentAPI>` automatically. Legacy unprefixed URLs redirect to the default framework variant.
- **Adding a New Framework**: Add the framework to `FRAMEWORKS` in [src/utils/framework.js](../../utils/framework.js) and a row to the `FRAMEWORK_BRANDING` map in [src/pages/index.astro](../../pages/index.astro). Then drop the per-component content into the right folders — `src/component-examples/<component>/<Name>.<ext>` for each example and `src/component-api/<component>/<Label>.astro` for the API table. `<AutoExample>` and the auto-API resolver pick those up without doc-page edits. Any sections still using the manual `<Example>` form will need `preview-<id>` / `code-<id>` slots added alongside the existing ones.
- **Line Highlighting**: Use the `ins`, `del`, or `mark` props with array syntax (e.g., `mark={[1, 5, 10]}`).
  - **1-indexed**: Highlights are 1-indexed. The opening `---` of an Astro file is line 1.
  - **Validation**: Cross-check that highlighted lines in Astro correspond to the same functionality in HTML.
  - **Accuracy**: Use `cat -n path/to/file` in the terminal to verify indices.
- **Path Resolution**: Inside `src/component-examples/`, prefer the `@opui/astro` alias for UI components and `@opui/css/...` for CSS imports rather than relative paths into the package.
- **API prop vs. Hardcoding**: Always use the `apis` prop on `<Component />` instead of hardcoding `<BadgeAPI />` in the default slot. This ensures consistent positioning and styling.
- **Internal Links in Prose**: Use canonical paths (e.g. `/components/text-field#file`) and let the docs site resolve them per request. Two primitives:
  - **`<DocLink href="...">`** — drop-in replacement for `<a>` in shared docs content. SSR-resolves the href to the active framework variant (`/components/...` or `/astro/components/...`) at build time. Always prefer `DocLink` over a raw `<a>` for cross-doc links.
  - **`Astro.locals.link("/path")`** — same resolution as a function. Use it for `href` props on components that render their own anchor (e.g. `Button`, `Chip`, `IconButton`, `ComponentCard`): `<Button href={link("/components/button")}>`.
  - **Never** hard-code `/astro/...` or `/html/...` in doc prose; `DocLink` and `link` resolve to whichever variant the reader is currently on. The framework switcher chips on the homepage are the only exception (they intentionally name a specific variant).
  - The `componentHrefFor` helper in [src/utils/components.ts](../../utils/components.ts) is still around for slug-only convenience in structural lists (sidebar, pagination, [ComponentList](../../components/ComponentList.astro)). For everything else, prefer `DocLink` / `Astro.locals.link`.
