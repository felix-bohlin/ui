# Component API Documentation Guide

This guide defines the standards for documenting component APIs (HTML, Astro, React, Svelte and Vue) in `src/component-api/`. Use this as a reference when generating or updating `api.ts` files.

## Checklist for Documentation

When creating or updating a component API, ensure:

- [ ] **File Format**: An `api.ts` data file (see [Data-driven APIs](#data-driven-apis-apits)) in one folder per component, such as `src/component-api/button/api.ts`.
- [ ] **CSS Verified**: Every class, selector and part selector exists in the component's CSS file in `packages/opui/css/components/`.
- [ ] **Inline code**: Wrap classes, selectors, tags and props in backticks in descriptions and notes. `formatInline` renders them as `<code>` and escapes HTML, so never write `<code>` tags. Link to docs pages with `[label](/components/name)`.
- [ ] **Class Prefixing**: Classes in `class` and `values` use the `ui-` prefix and a leading dot (`.ui-primary`).
- [ ] **Baseline value**: Map an enum value that adds no class to `null` in `values` (`values: { end: ".ui-align-end", start: null }`). The table shows it as `default`.
- [ ] **Named default**: An enum names its default value in `default` (`'"medium"'`), and that value maps to `null`. The exceptions are `as`, `type`, `color`, `severity` and free strings. The names and values follow the naming model in [packages/opui/components/AGENTS.md](../../packages/opui/components/AGENTS.md#naming-props-values-and-classes), and `tests/unit/naming.test.ts` checks them.
- [ ] **Standard groups**: Use `Alignment` for `align`, `Colors` for `color`, `Density` for `density`, `Orientation` for `orientation`, `Position` for `side`, `corner` and `positionArea`, `Severities` for `severity`, `Shape` for `shape`, `Sizes` for `size` and `Variants` for `variant`.
- [ ] **Short Descriptions**: All descriptions are very short and concise (often a single sentence fragment). Reuse the standard phrases:
  - `The variant to use.` (for Variants)
  - `The size of the element.` (for Sizes)
  - `Optional colors.` (for Colors)
  - `The orientation of the element.` (for Orientation)

`ApiTables` generates the rest: the column layout and widths, `default` and `-` in the Default column, and comma-separated types.

## Framework-specific APIs

API tables are **auto-resolved** when the doc page declares `slug="..."` on `<Component>`. The layout uses `src/component-api/<slug>/api.ts` when it exists. Otherwise it globs `src/component-api/<slug>/<Label>.astro` for every framework in `FRAMEWORKS` ([src/utils/framework.js](../utils/framework.js)), a fallback no page uses anymore:

```
src/component-api/button/
  api.ts
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

- `component`: (Required) the name shown in tables and `[component-api]` problems, such as `TextField` or `TabsItem`. It is also the component file name in `source`. Props are read from the `Props` type when `component` is the `source` folder's own component, and from the `<component>Props` type otherwise (`TableColumnProps`), so a sub-API never picks up its root's props.
- `source`: the component folder in `packages/opui/components/`. Omit it for CSS-only components, such as `spinner`; every framework then shows the HTML tables plus its `notes`, followed by "There is no {Framework} component.".
- `page`: the docs page slug when it differs from the folder, such as `tabs` for `tabs-item`. The API index links to it, and the check fails when it does not exist.
- `hydration`: per-framework props that need a client directive in React, Svelte or Vue, each with a `description` and an optional `fallback`. They get a marker in the props table. `default` applies to every hydrated framework without its own entry.
- `root` and `parts`: structural elements with a `selector` and a `description`. `code` overrides the selector shown in the table, such as `<summary>`. A part lists the `props` and `slots` that fill it (kebab-case slot names), plus optional `legacy` aliases and `model`. Set `anchorName` when the part's CSS already sets an `anchor-name`, so `<Anatomy>` keeps it. Set `component` when a sub-component renders the part, such as `"DescriptionListTerm"`. Container parts (`CardHeader`, `AccordionSummary`) always set `component`; a part with its own props or slots also gets its own `api.ts`, like `card-actions`, whose `component` names its root. `snippets` lists the Svelte snippets and React slot props that fill the part when they differ from the slots, such as `valueText` for the Range `value` slot. Keep parts in visual order; they also drive the `<Anatomy>` diagram and the HTML parts table.
- `options`: props and their HTML equivalent (`class` or `attribute`, `group` for the HTML table). Every option has its own `group`; the check fails when two share one. Use `frameworks` to limit an option to some frameworks, such as `["html"]` for a class-only option or `["react"]` for `onValueChange`, and `type` to override the resolved type.
  - `inherited: true` marks a native attribute the types don't declare, such as an `id` or `name` that `...rest` passes on. It needs a `type`, and the props table shows it in every framework that doesn't declare it. The check fails when every framework declares it, and when any other option is missing in a framework it applies to.
  - `values` maps each value of an enum prop to its modifier, or `null` when the value adds none (shown as `default`). The check fails when the keys don't match the prop's type.
  - `part` is the selector of the part that gets the modifier, such as `input` for the Checkbox `error` option.
  - `htmlDefault` overrides the default in the HTML table, or hides it with `null`.
  - `htmlDescription` replaces the description in the HTML table, for an option whose HTML use differs, such as a `name` that Astro, Svelte and Vue generate.
  - `cssVar` is the CSS property an option sets, such as `--ui-anchor-position-area` or `font-size`. It can be combined with a class or `values`.
- `slots`: slots that aren't parts, such as `default`.
- `css`: the stylesheets under `packages/opui/css/components/` the component is styled by, without the extension. Defaults to the kebab-cased `source`. The CSS variables table lists every theme token those files read, with the default from `theme.css` and the description from `src/utils/theme-token-descriptions.ts`.
- `model`: the bound value.
- `notes`: per-framework notes. `default` applies to every framework without its own note, HTML included. For a note that every component framework shares but HTML doesn't, spread `components(note)` from [frameworks.ts](frameworks.ts), imported as `../frameworks.ts` because the search index and skill scripts load `api.ts` in Node.

## Component properties (`custom-properties/<stylesheet>.ts`)

The `--_` custom properties a stylesheet declares are documented per stylesheet, not per `api.ts`, since several APIs share one stylesheet. `src/component-api/custom-properties/<stylesheet>.ts` default-exports a `CustomProperties` record ([types.ts](types.ts)) with a short `description` and a `kind` per property:

- `input`: a knob to set on the component, such as `--_accent`, `--_min-height` or `--_motion`.
- `output`: derived from the inputs, the variant or the state, such as `--_bg-color`. Overriding it freezes it in every state.

Keys are sorted. `tests/unit/custom-properties.test.ts` fails when a stylesheet declares a `--_` property that isn't documented, documents one it doesn't declare, or isn't shown on any page. The Component layout renders the table for the page's stylesheet (`pageStylesheets` in [custom-properties.ts](custom-properties.ts) maps the pages whose stylesheets have other names, such as `toggle`).

Prop names and types are read from each framework's types file (from every member of a union), Astro and Vue slots from the component source, and Svelte snippets and React slot props from `types.svelte.ts` and `types.react.ts`, so they are never written by hand. React and Svelte get a `children` row when `api.ts` documents a `default` slot and the types don't declare `children`. Framework syntax lives in [frameworks.ts](frameworks.ts).

`checkApi` and `checkExports` in [component-source.ts](../utils/component-source.ts) return every `[component-api]` problem: a prop or slot missing from `api.ts`, a documented prop, part prop, snippet or slot that isn't in the source, a `source` and `component` that match no component file, and a component exported from a barrel in `packages/opui/<framework>/index.ts` that is neither an `api.ts`'s `component` nor a part's `component`. `tests/unit/component-api.test.ts` runs them over every `api.ts` in `pnpm test`, and the docs build throws them all at once.

Pages pass it to `<Component>` as `apis={[{ title: "Text field API", api }]}`, or let `<Component slug="...">` pick it up without a title. `<Anatomy>` finds it from the page slug. `tests/e2e/anatomy.spec.ts` checks every page with `heroAnatomy` for overflow and spacing, and for axe violations on the HTML pages.

Refer to [card/api.ts](card/api.ts) and [text-field/api.ts](text-field/api.ts) for the preferred implementations of multi-framework APIs.
