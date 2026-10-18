# UI Component Implementation Guide

This guide defines the standards for implementing reusable UI components in this package. Every component ships an Astro, a React, a Svelte and a Vue version side by side (`packages/opui/components/<Name>/<Name>.astro`, `<Name>.react.tsx`, `<Name>.svelte` and `<Name>.vue`), based on the documentation specs at `src/docs/components/`. All should render the same markup as the HTML examples. A framework can add some markup of its own because of how it works (recorded as `.diff` drift next to the parity snapshots), but in general the output is the same. Use it as a reference for maintaining consistency and accessibility across the library.

**CRITICAL INSTRUCTION**: Always use components from this package (imported via `opui-css/astro`, `opui-css/react`, `opui-css/svelte` and `opui-css/vue`) and their corresponding CSS from `packages/opui/css/components/` whenever possible. Avoid writing custom CSS if an existing component or utility can achieve the desired result.

## 0. Implementation Checklist

When implementing or updating a component, ensure:
- [ ] **All Frameworks**: Every `.astro` file has a matching `.react.tsx`, `.svelte` and `.vue` file in the same folder (`pnpm check-components` fails otherwise).
- [ ] **Title Export**: `export const title = "Component Name"` is present in `<Name>.astro`.
- [ ] **Props Type**: Astro imports `Props` from `./types.astro`, React imports `Props` from `./types.react`, Svelte imports `Props` from `./types.svelte`, Vue imports `Props` and `Slots` from `./types.d.vue` (use `type`, never `interface`).
- [ ] **Sorting**: Props and destructuring are sorted alphabetically, slots last. Classes follow section 3 (base, states, variants, `className`), in the same order in every framework. `pnpm check-components` checks the keys of the object types in the type files, `className` last, and the root class order against Astro.
- [ ] **Rest Props**: `...rest` is captured and spread onto the root element in Astro, React and Svelte. Vue falls through attributes by default.
- [ ] **Class Management**: Used `class:list` in Astro, a `cx([...])` array in React, a `class` array in Svelte and a `:class` array in Vue, in the same order.
- [ ] **ID Stability**: Used `createId(Astro.locals)` in Astro, `useId()` in React, `$props.id()` in Svelte and `useId()` in Vue for any internal element linking.
- [ ] **Accessibility**: ARIA labels, roles, and relationships are correctly handled.
- [ ] **Parts or Slots**: Containers expose parts (section 4); form controls and small components use props and named slots.
- [ ] **Exports**: The component and its `Props` type are exported from `packages/opui/astro/index.ts`, `packages/opui/react/index.ts`, `packages/opui/svelte/index.ts` and `packages/opui/vue/index.ts`, sorted. `pnpm check-components` checks that the barrels export the same components and types, with each `Props` type from the framework's own types file.

---

## 1. Frontmatter Structure

Every component uses layered type files:

- `types.ts` - shared, framework-agnostic props (component-specific only; no `HTMLAttributes`), and the `Context` shape for components with context
- `types.astro.ts` - Astro props = base + `HTMLAttributes<element>`
- `types.d.vue.ts` - Vue props = base + `class`, plus the `Slots` type for `defineSlots`
- `types.react.ts` - React props = base + slot props (`ReactNode`) + `ComponentProps<element>`
- `types.svelte.ts` - Svelte props = base + snippets + `SvelteHTMLElements[element]`
- `types.solid.ts` - framework-specific extensions (for merge parity)

Every component folder has all six files; `pnpm check-components` fails when one is missing.

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

Derived values go in `$derived()`. Slots are snippets: the default slot is `children`, named slots are camelCased (`end-text` becomes `endText`). The components need Svelte 5.29 or later (`{@attach}`). Where Vue uses `defineModel`, Svelte uses `$bindable()`: `bind:value` on Select, TextField, Textarea, Range and ToggleGroup, `bind:checked` and `bind:group` on Checkbox and Switch, and `bind:group` on Radio. Vue's `provide`/`inject` maps to the typed `getContext`/`setContext` helpers in each component's `context.svelte.ts`.

The React component destructures props, slot props and `...rest` the same way, with `className` instead of `class`:

```tsx
import { cx } from "../cx"
import type { Props } from "./types.react"

export default function MyComponent({
  className,
  disabled,
  label,
  size,
  variant = "outlined",
  children,
  ...rest
}: Props) {
  return (
    <div className={cx(["ui-my-component", size && `ui-${size}`, className])} {...rest}>
      {children}
    </div>
  )
}
```

Slots are props: the default slot is `children`, named slots are camelCased `ReactNode` props (`end-text` becomes `endText`), like Svelte snippets. There is no two-way binding: form controls pass the native `value`/`defaultValue`, `checked`/`defaultChecked` and `onChange` through, and a component that shows the current value (Range) follows it with `useState`. ToggleGroup has no native value, so it takes `value`, `defaultValue` and `onValueChange` and passes the selection to its buttons through context. Vue's `provide`/`inject` maps to a React context in each component's `context.react.ts`. Components that use context, state, effects or their own event handlers start with `"use client"`; the others stay server components, so they also render in React Server Components. `pnpm check-components` checks both ways.

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
Components should often inherit styles from others (e.g., `Accordion` and `Dialog` looking like a `Card`). Add the inherited base class next to the component's own, and the variant class it styles. All library classes are prefixed with `ui-`.

```astro
<details class:list={["ui-accordion", "ui-card", variant && `ui-${variant}`, className]} {...rest}>
```

---

## 3. Class Management

Use `class:list` exclusively in Astro, `cx([...])` from `../cx` in React, a `class` array in Svelte, and a `:class` array in Vue. Every library-owned class is prefixed with `ui-`; the public prop API stays unprefixed (`<Button size="small" variant="outlined">`) and the component interpolates the prefix when rendering.

Follow this order for readability:
1.  **Component Base Class**: The primary CSS class, prefixed (e.g., `"ui-button"`).
2.  **State Objects**: Boolean flags as quoted prefixed keys (e.g., `{ "ui-dot": dot }`).
3.  **Variant Props**: Interpolate the prefix from the prop value (e.g., `size && \`ui-${size}\``).
4.  **External Class**: Always include `className` (Astro, React and Svelte) or `$props.class` (Vue) at the end to allow for overrides. Do not prefix it.

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

## 4. Parts and Slots

Containers compose, controls configure. Each component has one way to use it.

### Parts (containers)
Containers with block regions (Card, Dialog, Drawer, Accordion, Callout, Anchor, Tooltip) expose a part per region, with flat names: `CardHeader`, `DialogActions`, `AccordionSummary`.

- A part's name is its root's name plus the region, and it renders that region's element and class (`CardActions` renders `.ui-actions`).
- Each part renders its own wrapper. The root renders its children as they are, and never wraps, reorders or inspects them.
- Defaults live in the part that renders them: `AccordionSummary` renders the chevron, `CalloutIcon` the severity icon.
- Parts must be direct children of their root, because the CSS targets `> hgroup`, `> .ui-content` and so on. Title parts sit inside their region part: `DrawerTitle` in `DrawerHeader`. Other titles are plain headings in their region part, like `<h3>` in `CardHeader` or `CalloutContent`.
- Ids and settings reach parts through context: `context.astro.ts` (with `createContext` from `../context.astro`), `context.svelte.ts` (Svelte), `context.react.ts` (React, `"use client"`) and an `InjectionKey` in `context.vue.ts` (Vue). All four take their shape from the `Context` type in `types.ts`, and Vue provides it as a `reactive()` object. A folder with one of them has all four (`pnpm check-components` fails otherwise). Ids are deterministic, so every framework renders the same markup on the server.
- Parts without context stay React server components.
- Every part is exported from all four barrels with its `Props` type.

```astro
<Card variant="outlined">
  <CardHeader><h3>Title</h3></CardHeader>
  <CardContent>Text</CardContent>
  <CardActions align="end"><Button>Open</Button></CardActions>
</Card>
```

### Props and slots (form controls and small components)
Form controls (TextField, Textarea, Select, Range, Checkbox, Radio, Switch), ListItem, Chip, Badge and the like keep a prop and slot API. A text region takes a string prop as a shorthand and a named slot (Astro, Vue), snippet (Svelte) or `ReactNode` prop (React) for rich content.

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

Check that a named slot exists before rendering its wrapper.

---

## 5. Form & Input Patterns

### Label Wrapping
Most inputs should be wrapped in a `<label>` to provide a larger hit area and built-in accessibility.

```astro
<label class:list={["ui-text-field", size && `ui-${size}`, className]} style={style}>
  <span class="ui-label">{label}</span>
  <span class="ui-field">
    <input {...rest} aria-invalid={error ? "true" : ariaInvalid} />
  </span>
  {endText && <span class="ui-end-text">{endText}</span>}
</label>
```

### End Text & ARIA
When providing `endText`, use `createId(Astro.locals)` (Astro), `useId()` (React and Vue) or `$props.id()` (Svelte) to link it to the input via `aria-describedby`, merged with the user's own `aria-describedby` by `idRefs` from `../id`. TextField and Textarea are the exception: the wrapping `<label>` names the control and already includes the end text, so they don't link it.

```astro
---
const { "aria-describedby": ariaDescribedBy, endText, ...rest } = Astro.props
const $id = createId(Astro.locals)
const endTextId = endText ? $id("end-text") : undefined
---
<input {...rest} aria-describedby={idRefs(endTextId, ariaDescribedBy)} />
{endText && <span id={endTextId}>{endText}</span>}
```

In Svelte, render a text region that takes a string or a snippet with the shared `content` snippet: `import { content } from "../content.svelte"`, then `{@render content(endText)}`.

### Input Attribute Mapping
Native input attributes (`disabled`, `name`, `value`, …) come from the framework type, such as `HTMLAttributes<"input">`, and reach the input through `...rest`, so don't destructure and re-pass them. Destructure only the attributes the component merges, spread `...rest` first, then set the merged values so they win.

```astro
<input
  {...rest}
  aria-describedby={idRefs(endTextId, ariaDescribedBy)}
  aria-invalid={error ? "true" : ariaInvalid}
/>
```

### Sub-component Decomposition
For complex inputs (like `Checkbox` with custom visuals), split the component into a wrapper (`Checkbox.astro`) and a raw input (`CheckboxInput.astro`) to keep the root element clean. The raw input is a public part too: it is exported from the barrels and documented in its own `api.ts` (`checkbox-input`), for layouts where the label sits elsewhere, such as the end of a list item.

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
Always use `createId(Astro.locals)` from `../id` for IDs in Astro. It falls back to random IDs when no middleware sets `Astro.locals.$id`. In React and Vue, use `useId()`, and in Svelte, `$props.id()`. This ensures stability across server and client rendering and prevents ID collisions when multiple instances of the same component are on a page. Only generate an id for elements the component links itself; don't generate an input `id` the user didn't pass.

```astro
const $id = createId(Astro.locals)
const groupName = name || $id("tabs") // Prefer the passed value if available
```

### Default Icons
A part renders the default icon, so users can leave it out or put their own `svg` in its place. `CalloutIcon` reads the severity from context:

```astro
---
const callout = calloutContext.get()
---
{callout?.severity === "info" && <svg>...</svg>}
```

---

## 7. Data-Driven Components

For repetitive structures (Menu, Select), prefer an `items` prop alongside standard slots.

```astro
type Item = { selected?: boolean; text: string; value: number | string }
type Props = { items?: Item[] }

<select>
  {items.map(item => <option value={item.value}>{item.text}</option>)}
  <slot /> <!-- Still allow manual entries -->
</select>
```

---

## 8. Development Workflow

1.  **Read the Spec**: Open `src/docs/components/[name].astro` to see required HTML and CSS classes, and the examples in `src/component-examples/[name]/` (`.html`, `.astro`, `.react.tsx`, `.svelte` and `.vue` per example). `src/pages/[framework]/components/[component].astro` is the route shell that renders every docs page for each framework.
2.  **Analyze the API**: Check `src/component-api/[name]/api.ts` for the documented props, slots and classes (see `src/component-api/AGENTS.md`). Every prop and slot the component exposes must be described there, or the docs build fails.
3.  **Implement**: Follow the checklist in Section 0, for Astro, React, Svelte and Vue.
4.  **Verify**: Run `npx vitest run tests/unit/parity.test.ts`: Astro output must match the HTML example, and React, Svelte and Vue output must match Astro. Then check the rendered pages at `/html/components/[name]`, `/astro/components/[name]`, `/react/components/[name]`, `/svelte/components/[name]` and `/vue/components/[name]`, and the fixture pages at `/[framework]/test/[name]`, which only exist with `OPUI_TEST_PAGES=1` (`OPUI_TEST_PAGES=1 pnpm dev`, or `pnpm test:e2e:serve`).


