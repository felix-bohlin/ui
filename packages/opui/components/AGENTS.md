# UI Component Implementation Guide

This guide defines the standards for implementing reusable UI components in this package. Every component ships an Astro, a Svelte and a Vue version side by side (`packages/opui/components/<Name>/<Name>.astro`, `<Name>.svelte` and `<Name>.vue`), based on the documentation specs at `src/docs/components/`. All should render the same markup as the HTML examples. A framework can add some markup of its own because of how it works (recorded as `.diff` drift next to the parity snapshots), but in general the output is the same. Use it as a reference for maintaining consistency and accessibility across the library.

**CRITICAL INSTRUCTION**: Always use components from this package (imported via `@opui/astro`, `opui-css/svelte` and `opui-css/vue`) and their corresponding CSS from `packages/opui/css/components/` whenever possible. Avoid writing custom CSS if an existing component or utility can achieve the desired result.

## 0. Implementation Checklist

When implementing or updating a component, ensure:
- [ ] **All Frameworks**: Every `.astro` file has a matching `.svelte` and `.vue` file in the same folder (`pnpm check-components` fails otherwise).
- [ ] **Title Export**: `export const title = "Component Name"` is present in `<Name>.astro`.
- [ ] **Props Type**: Astro imports `Props` from `./types.astro`, Svelte imports `Props` from `./types.svelte`, Vue imports `Props` and `Slots` from `./types.d.vue` (use `type`, never `interface`).
- [ ] **Sorting**: Props, Destructuring, and Classes are sorted alphabetically.
- [ ] **Rest Props**: `...rest` is captured and spread onto the root element in Astro and Svelte. Vue falls through attributes by default.
- [ ] **Class Management**: Used `class:list` in Astro, a `class` array in Svelte and a `:class` array in Vue, in the same order.
- [ ] **ID Stability**: Used `createId(Astro.locals)` in Astro, `$props.id()` in Svelte and `useId()` in Vue for any internal element linking.
- [ ] **Accessibility**: ARIA labels, roles, and relationships are correctly handled.
- [ ] **Slot Strategy**: Named slots are used for structural content (icons, actions).
- [ ] **Exports**: The component and its `Props` type are exported from `packages/opui/astro/index.ts`, `packages/opui/svelte/index.ts` and `packages/opui/vue/index.ts`, sorted.

---

## 1. Frontmatter Structure

Every component uses layered type files:

- `types.ts` - shared, framework-agnostic props (component-specific only; no `HTMLAttributes`)
- `types.astro.ts` - Astro props = base + `HTMLAttributes<element>`
- `types.d.vue.ts` - Vue props = base + `class`, plus the `Slots` type for `defineSlots`
- `types.svelte.ts` - Svelte props = base + snippets + `SvelteHTMLElements[element]`
- `types.solid.ts` - framework-specific extensions (for merge parity)

Every component folder has all five files; `pnpm check-components` fails when one is missing.

Every Astro component must follow this exact frontmatter layout:

```astro
---
import type { Props } from "./types.astro"

export const title = "My Component"

const {
  class: className,
  disabled,
  label,
  size,
  variant = "outlined",
  ...rest
} = Astro.props
---
```

The Vue component mirrors it in `<script setup>`:

```vue
<script setup lang="ts">
import type { Props, Slots } from "./types.d.vue"

const { disabled, label, size, variant = "outlined" } = defineProps<Props>()
defineSlots<Slots>()
</script>
```

Derived values go in `computed()`, so they update when props change.

The Svelte component destructures props, snippets and `...rest` from `$props()`:

```svelte
<script lang="ts">
  import type { Props } from "./types.svelte"

  let {
    class: className,
    disabled,
    label,
    size,
    variant = "outlined",

    // Snippets
    children,
    ...rest
  }: Props = $props()
</script>
```

Derived values go in `$derived()`. Slots are snippets: the default slot is `children`, named slots are camelCased (`end-text` becomes `endText`). The components need Svelte 5.29 or later (`{@attach}`). Where Vue uses `defineModel`, Svelte uses `$bindable()`: `bind:value` on Select, ClassicSelect, TextField, Textarea and Range, `bind:checked` and `bind:group` on Checkbox and Switch, and `bind:group` on Radio. Vue's `provide`/`inject` maps to the typed `getContext`/`setContext` helpers in each component's `context.ts`.

### Key Rules:
- **Alphabetical Sorting**: Sort property definitions in `types.ts` and variables in the destructuring statement.
- **REST Support**: Use `HTMLAttributes` in `types.astro.ts` and `...rest` in destructuring. Do not add `[key: string]: any` to `types.ts` - native attributes belong in the framework type files.
- **Title Export**: This is mandatory for documentation generation.

---

## 2. Component Composition & Tags

### Dynamic Elements (Polymorphism)
For components that can be different HTML elements (e.g., `Button` as `<a>` or `<button>`), use a dynamic `Tag` variable.

```astro
---
const { as: Tag = Astro.props.href ? "a" : "button", ...rest } = Astro.props
---
<Tag {...rest}><slot /></Tag>
```
- **Inference**: Default to `"a"` if `href` is present.
- **Override**: Allow manual override via the `as` prop.
- **Button type**: A rendered `<button>` gets `type="button"` unless the user passes `type`, so it never submits a form by accident.

### Styling Inheritance
Components should often inherit styles from others (e.g., `Dialog` looking like a `Card`). Use conditional classes to apply the inherited base class. All library classes are prefixed with `ui-`.

```astro
<dialog class:list={["ui-dialog", { "ui-card": variant }, variant && `ui-${variant}`, className]} {...rest}>
```

---

## 3. Class Management

Use `class:list` exclusively in Astro, a `class` array in Svelte, and a `:class` array in Vue. Every library-owned class is prefixed with `ui-`; the public prop API stays unprefixed (`<Button size="small" variant="outlined">`) and the component interpolates the prefix when rendering.

Follow this order for readability:
1.  **Component Base Class**: The primary CSS class, prefixed (e.g., `"ui-button"`).
2.  **State Objects**: Boolean flags as quoted prefixed keys (e.g., `{ "ui-dot": dot }`).
3.  **Variant Props**: Interpolate the prefix from the prop value (e.g., `size && \`ui-${size}\``).
4.  **External Class**: Always include `className` (Astro and Svelte) or `$props.class` (Vue) at the end to allow for overrides. Do not prefix it.

Native states use native attributes, not classes: a disabled `<button>` gets `disabled`, a disabled link gets `aria-disabled="true"`.

```astro
<div
  class:list={[
    "ui-chip",
    {
      "ui-multiline": isMultiline,
    },
    size && `ui-${size}`,
    variant && `ui-${variant}`,
    className,
  ]}
>
```

---

## 4. Slot Patterns

### Default Slots vs Label Props
For simple text-based components, provide both a `label` prop and a default slot.

```astro
<div class="ui-component">
  { (label || Astro.slots.has("default")) && (
    <span class="ui-text">
      {label}
      <slot />
    </span>
  )}
</div>
```

### Named Slots (Icons & Actions)
Use named slots for specific functional areas. Check for existence before rendering wrapper tags.

```astro
<div class="ui-card">
  {Astro.slots.has("header") && <header><slot name="header" /></header>}
  <slot />
  {Astro.slots.has("actions") && <footer class="ui-actions"><slot name="actions" /></footer>}
</div>
```

---

## 5. Form & Input Patterns

### Label Wrapping
Most inputs should be wrapped in a `<label>` to provide a larger hit area and built-in accessibility.

```astro
<label class:list={["ui-text-field", size && `ui-${size}`, className]}>
  <span class="ui-label">{label}</span>
  <span class="ui-field">
    <input type="text" aria-invalid={error ? "true" : undefined} {...rest} />
  </span>
  {endText && <span class="ui-end-text">{endText}</span>}
</label>
```

### End Text & ARIA
When providing `endText`, use `createId(Astro.locals)` (Astro), `$props.id()` (Svelte) or `useId()` (Vue) to link it to the input via `aria-describedby`.

```astro
---
const $id = createId(Astro.locals)
const helpId = $id("help")
---
<input aria-describedby={endText ? helpId : undefined} />
{endText && <span id={helpId}>{endText}</span>}
```

### Input Attribute Mapping
Explicitly define and pass through native input attributes in the `Props` type for better IDE support.

```astro
<input
  disabled={disabled}
  name={name}
  required={required}
  type={type}
  value={value}
  {...rest}
/>
```

### Sub-component Decomposition
For complex inputs (like `Checkbox` with custom visuals), split the component into a public wrapper (`Checkbox.astro`) and a private raw input (`CheckboxInput.astro`) to keep the root element clean.

### Form Structure: FieldSet, FieldLegend, FieldDescription, FieldGroup
When building forms, follow this nesting order inside a `FieldSet`:
1. `FieldLegend` - The heading/label for the fieldset
2. `FieldDescription` - Optional helper text
3. `FieldGroup` - Wrapper for the actual form controls

**Always wrap form elements in a `FieldGroup`**, never place them directly after `FieldLegend` or `FieldDescription`.

```astro
<!-- ✅ Correct -->
<FieldSet>
  <FieldLegend>Username</FieldLegend>
  <FieldDescription>Enter your preferred username.</FieldDescription>
  <FieldGroup>
    <TextField placeholder="e.g. jdoe" />
  </FieldGroup>
</FieldSet>

<!-- ❌ Incorrect - TextField directly after FieldDescription -->
<FieldSet>
  <FieldLegend>Username</FieldLegend>
  <FieldDescription>Enter your preferred username.</FieldDescription>
  <TextField placeholder="e.g. jdoe" />
</FieldSet>
```

---

## 6. Identification & Accessibility

### Unique IDs
Always use `createId(Astro.locals)` from `../id` for IDs in Astro. It falls back to random IDs when no middleware sets `Astro.locals.$id`. In Svelte, use `$props.id()`, and in Vue, `useId()`. This ensures stability across server and client rendering and prevents ID collisions when multiple instances of the same component are on a page. Only generate an id for elements the component links itself; don't generate an input `id` the user didn't pass.

```astro
const $id = createId(Astro.locals)
const groupName = name || $id("tabs") // Prefer the passed value if available
```

### Default Icons
Components like `Callout` should provide default SVG icons within their named slots, while allowing users to override them.

```astro
<slot name="icon">
  {severity === "critical" && <svg>...</svg>}
</slot>
```

---

## 7. Data-Driven Components

For repetitive structures (DescriptionLists, Menus, Selects), prefer an `items` prop alongside standard slots.

```astro
type Item = { label: string; value: any }
type Props = { items?: Item[] }

<ul>
  {items.map(item => <li>{item.label}</li>)}
  <slot /> <!-- Still allow manual entries -->
</ul>
```

---

## 8. Development Workflow

1.  **Read the Spec**: Open `src/docs/components/[name].astro` to see required HTML and CSS classes, and the examples in `src/component-examples/[name]/` (`.html`, `.astro`, `.svelte` and `.vue` per example). `src/pages/[framework]/components/[component].astro` is the route shell that renders every docs page for each framework.
2.  **Analyze the API**: Check `src/component-api/[name]/api.ts` for the documented props, slots and classes (see `src/component-api/AGENTS.md`). Every prop and slot the component exposes must be described there, or the docs build fails.
3.  **Implement**: Follow the checklist in Section 0, for Astro, Svelte and Vue.
4.  **Verify**: Run `npx vitest run tests/unit/parity.test.ts`: Astro output must match the HTML example, and Svelte and Vue output must match Astro. Then check the rendered pages at `/html/components/[name]`, `/astro/components/[name]`, `/svelte/components/[name]` and `/vue/components/[name]`, and the fixture pages at `/[framework]/test/[name]`, which only exist with `OPUI_TEST_PAGES=1` (`OPUI_TEST_PAGES=1 pnpm dev`, or `pnpm test:e2e:serve`).


