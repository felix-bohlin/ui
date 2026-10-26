# UI Component Implementation Guide

This guide defines the standards for implementing reusable UI components in this package. Every component ships an Astro, a React, a Svelte and a Vue version side by side (`packages/opui/components/<Name>/<Name>.astro`, `<Name>.react.tsx`, `<Name>.svelte` and `<Name>.vue`), based on the documentation specs at `src/docs/components/`. All should render the same markup as the HTML examples. A framework can add some markup of its own because of how it works (recorded as `.diff` drift next to the parity snapshots), but in general the output is the same. Use it as a reference for maintaining consistency and accessibility across the library.

**CRITICAL INSTRUCTION**: Always use components from this package (imported via `opui-css/astro`, `opui-css/react`, `opui-css/svelte` and `opui-css/vue`) and their corresponding CSS from `packages/opui/css/components/` whenever possible. Avoid writing custom CSS if an existing component or utility can achieve the desired result.

## 0. Implementation Checklist

When implementing or updating a component, ensure:

- [ ] **All Frameworks**: Every `.astro` file has a matching `.react.tsx`, `.svelte` and `.vue` file in the same folder (`pnpm check-components` fails otherwise).
- [ ] **Title Export**: `export const title = "Component Name"` in `<Name>.astro`, which the docs read (`pnpm check-components` fails without it).
- [ ] **Props Type**: A component types its props with `Props` (the root) or `<Root><Part>Props` (a part, `CardActionsProps`) from its framework's own types file (`./types.astro`, `./types.react`, `./types.svelte`, `./types.vue-props`), and Vue its slots with `Slots` or, for a part with its own slots, `<Root><Part>Slots` (`AccordionSummarySlots`); `pnpm check-components` checks the names and the imports. `types.ts` names the named slots `Slots<S>` (`Badge`, `Range`) and declares no type for the default slot alone: `children` comes from `ComponentProps` and `SvelteHTMLElements`, and `types.vue-props.ts` names its slots `Slots` (`DefaultSlots` from `../vue` when the default slot is the only one).
- [ ] **Sorting**: Props and destructuring are sorted alphabetically, slots last with `children` first. Classes follow section 3 (base, states, variants, `className`), in the same order in every framework. `pnpm check-components` checks the keys of every object type in the type files, the order of the destructured props (React's slots are the Svelte twin's snippets), `className` last, and the order of every class list against Astro.
- [ ] **Rest Props**: `...rest` goes onto the root element, or the input of a form control. `pnpm check-components` checks that Astro, React and Svelte capture and spread it, and that Vue binds the attributes it doesn't inherit.
- [ ] **Class Management**: The class list of section 3 in each framework; `pnpm check-components` checks the `ui-` prefix and that every framework keeps Astro's order.
- [ ] **ID Stability**: Used `createId(Astro.locals)` in Astro, `useId()` in React, `$props.id()` in Svelte and `useId()` in Vue for any internal element linking.
- [ ] **Accessibility**: ARIA labels, roles, and relationships are correctly handled.
- [ ] **Parts or Slots**: Containers expose parts (section 4); form controls and small components use props and named slots.
- [ ] **Exports**: The component and its `Props` type are exported from `packages/opui/astro/index.ts`, `packages/opui/react/index.ts`, `packages/opui/svelte/index.ts` and `packages/opui/vue/index.ts`, sorted, the root's as `Props as <Root>Props` and each part's under its own name (`Props as CardProps`, `CardActionsProps`). `pnpm check-components` checks that the barrels are sorted and export the same components and types, with each `Props` type from the framework's own types file and a `<Name>Props` for every component.

---

## 1. Frontmatter Structure

Every component uses layered type files:

- `types.ts` - shared, framework-agnostic props (component-specific only; no `HTMLAttributes`), and the `Context` shape for components with context
- `types.astro.ts` - Astro props = base + `HTMLAttributes<element>`
- `types.vue-props.ts` - Vue props = base + `Class` from `../vue`, plus the `Slots` type for `defineSlots` (`DefaultSlots` from `../vue` when the default slot is the only one) and a `<Root><Part>Slots` for each part with its own slots. It imports the base types by name (`Props as BaseProps`), because the Vue compiler can't resolve `defineProps` types through `import type * as Base`. The name avoids `types.vue.ts`, which the Vue compiler reads as the `.vue` file, and `types.d.vue.ts`, a declaration file name that `skipLibCheck` leaves unchecked
- `types.react.ts` - React props = base + named slot props (`Base.Slots<ReactNode>`, when there are any) + `ComponentProps<element>`, which brings `children`
- `types.svelte.ts` - Svelte props = base + named snippets (`Base.Slots<Snippet>`, when there are any) + `SvelteHTMLElements[element]`, which brings `children`

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
import type { Props, Slots } from "./types.vue-props"

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

Derived values go in `$derived()`. Slots are snippets: the default slot is `children`, named slots are camelCased (`end-text` becomes `endText`). The components need Svelte 5.57 or later: `{@attach}` came in 5.29, and older versions clear the Select's `bind:value` when Chromium updates `<selectedcontent>`. Where Vue uses `defineModel`, Svelte uses `$bindable()`, for the props the `model` in the component's `api.ts` lists; `pnpm check-components` checks both. Vue's `provide`/`inject` maps to the typed `getContext`/`setContext` helpers in each component's `context.svelte.ts`.

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
    <div
      className={cx([
        "ui-my-component",
        size && size !== "medium" && `ui-${size}`,
        className,
      ])}
      {...rest}
    >
      {children}
    </div>
  )
}
```

Slots are props: the default slot is `children`, named slots are camelCased `ReactNode` props (`end-text` becomes `endText`), like Svelte snippets. There is no two-way binding: form controls pass the native `value`/`defaultValue`, `checked`/`defaultChecked` and `onChange` through, and a component that shows the current value (Range) follows it with `useState`. ToggleGroup has no native value, so it takes `value`, `defaultValue` and `onValueChange` and passes the selection to its buttons through context. Vue's `provide`/`inject` maps to a React context in each component's `context.react.ts`. Components that use context, state, effects or their own event handlers start with `"use client"`; the others stay server components, so they also render in React Server Components. `pnpm check-components` checks both ways.

### Key Rules:

- **REST Support**: Native attributes come from `HTMLAttributes` in `types.astro.ts` and the other framework type files, never from `types.ts`. `pnpm check-components` checks the `...rest` spread and fails on an index signature such as `[key: string]: any`.

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

Components often share another component's styles (`Accordion` and `Dialog` look like a `Card`, `Menu` like a `List`, `Badge` and `Tooltip` position like an `Anchor`). The shared stylesheet lists every root it styles (`card.css` targets `:where(.ui-accordion, .ui-card, .ui-dialog)`, `list.css` `:where(.ui-list, .ui-menu)` and `anchor.css` `:where(.ui-anchor, .ui-badge, .ui-tooltip)`), so a component renders only its own root class and the variant class it styles.

```astro
<details
  class:list={[
    "ui-accordion",
    variant && variant !== "plain" && `ui-${variant}`,
    className,
  ]}
  {...rest}
>
  <slot />
</details>
```

---

## 3. Class Management

Use `class:list` exclusively in Astro, `cx([...])` from `../cx` in React, a `class` array in Svelte, and a `:class` array in Vue. Every library-owned class is prefixed with `ui-` (`pnpm check-components` checks the class lists); the public prop API stays unprefixed (`<Button size="small" variant="outlined">`) and the component interpolates the prefix when rendering.

Follow this order for readability:

1.  **Component Base Class**: The primary CSS class, prefixed (e.g., `"ui-button"`).
2.  **State Objects**: Boolean flags as quoted prefixed keys (e.g., `{ "ui-dot": dot }`).
3.  **Variant Props**: Interpolate the prefix from the prop value, and skip the default, which adds no class (e.g., `size && size !== "medium" && \`ui-${size}\``).
4.  **External Class**: Always include `className` (Astro, React and Svelte) or `$props.class` (Vue) at the end to allow for overrides. Do not prefix it.

Native states use native attributes, not classes: a disabled `<button>` gets `disabled`, a disabled link gets `aria-disabled="true"`. Stylelint (`opui/state-classes`) rejects state classes in the CSS.

### Naming props, values and classes

One concept has one prop name and one set of values in every component. `tests/unit/naming.test.ts` checks every `api.ts` against this model, with no allowlist. A new rule lands with its check, in the change that makes the check pass.

| Concept                            | Prop                           | Values                                                                    |
| ---------------------------------- | ------------------------------ | ------------------------------------------------------------------------- |
| Paint only                         | `color`                        | `critical`, `info`, `neutral`, `primary`, `success`, `warning`            |
| Meaning                            | `severity`                     | `critical`, `info`, `neutral`, `success`, `warning`                       |
| Surface                            | `variant`                      | `elevated`, `filled`, `line`, `outlined`, `plain`, `tonal`, `transparent` |
| Size                               | `size`                         | `x-small`, `small`, `medium`, `large`                                     |
| Density                            | `dense` (boolean) or `density` | `dense`, `normal`, `spacious`                                             |
| Shape                              | `round` (boolean) or `shape`   | `circle`, `rounded`, `squared`, `squircle`                                |
| Layout axis                        | `orientation`                  | `auto`, `horizontal`, `vertical`                                          |
| Side of a trigger or the viewport  | `side`                         | `block-end`, `block-start`, `inline-end`, `inline-start`                  |
| Alignment on that side or in a row | `align`                        | `start`, `center`, `end`                                                  |
| Corner                             | `corner`                       | `start-start`, `start-end`, `end-start`, `end-end`                        |
| Free CSS position                  | `positionArea`                 | any `position-area` value                                                 |
| Checked state                      | `checked`                      | the native attribute                                                      |
| Open state                         | `open`                         | the native attribute, on a `details`, `dialog` or popover root            |
| One or many                        | `multiple` (boolean)           | the native attribute                                                      |
| Overflow on the layout axis        | `overflow`                     | `scroll`, `shrink`, `wrap`                                                |
| Primary text                       | `label`                        | a string, with a `label` slot for rich content                            |
| Secondary text                     | `description`                  | a string, with a `description` slot for rich content                      |
| A visible label made invisible     | `hideLabel` (boolean)          | renders `.ui-sr-only` on the label                                        |
| A list of entries                  | `items`                        | objects with `label`, `value` and `description`                           |

- **Values:** a component accepts the values it supports from its set.
- **`color` and `severity`:**
  - `color` changes paint and nothing else.
  - `severity` says what something means, and adds the cues that meaning needs: an icon, a shape-coded dot. Meaning never rests on color alone.
  - `primary` is emphasis, not meaning, so it is a `color` only.
- **Variant words keep Material 3's meaning, and describe the resting look; a hover or selected tint never counts against them:**
  - `filled` is a solid fill in the component's own color: the accent on actions (Button, ButtonGroup, Tabs), a surface on fields, containers and tracks.
  - `tonal` is the tonal surface or palette tint.
  - `outlined` is drawn in the border color with no fill.
  - `elevated` is raised with a shadow.
  - `transparent` has no surface and no border at rest. A text button is `transparent`.
  - `plain` is the page surface with no border, and differs from `transparent` on a tinted parent.
  - `line` is an indicator with no track.
- **Every enum names its default:**
  - The default adds no class. It maps to `null` in `api.ts`, where it shows as the default.
  - The exceptions are `as` and `type`; `bordered`, `color` and `severity`, where leaving the prop out means none; `trigger`, where leaving it out means always shown; and free strings.
- **One class shape per kind of value:**
  - A value of `variant`, `size`, `color`, `severity`, `side`, `orientation`, `density`, `shape` or `corner` renders `.ui-<value>` (`.ui-filled`, `.ui-block-start`).
  - A value of `align`, `overflow` or a component's own enum renders `.ui-<prop>-<value>`, so the class says which prop it belongs to (`.ui-align-end`, `.ui-overflow-scroll`, `.ui-backdrop-transparent`, `.ui-marker-animation-flip`).
  - The default renders nothing, in every framework and in HTML.
- **Booleans and enums:**
  - A modifier with one alternative is a boolean and renders the class of the same name (`round` gives `.ui-round`, `stickyHeader` gives `.ui-sticky-header`). `hideLabel` is the one exception and renders `.ui-sr-only`.
  - A boolean is off when it's left out, so its class is never the framework default. Its name says what turning it on does, never what it turns off: no `no`, `non`, `not` or `un` prefix, no `less` suffix, and no `hide` prefix except `hideLabel` (a Tooltip shows its arrow with `arrow`, not `hideArrow`). `.ui-not-rich-text` is the one exception, since it ends a `.ui-rich-text` scope from inside instead of turning off a feature of its own element.
  - When the usual case is the one people turn off, the modifier is an enum with the usual case as its named default (Carousel `buttons`: `inside`, `none`, `outside`).
  - A modifier with several values is an enum named after the concept.
  - A component never has both for one concept, and never two booleans for one axis (`overflow`, not `scrollable` and `shrink`).
- **One or many is the native `multiple`,** layout along an axis is `orientation` and overflow along it is `overflow`.
- **`align` has one default per part,** wherever the part appears. `.ui-actions` and `.ui-footer` line up at the end in every container that has them.
- **Text:**
  - The primary text of anything is `label`, a string prop with a slot of the same name for rich content. Secondary text is `description`. Never `headline`, `text` or `title`.
  - Item objects (`MenuItem`, `RangeItem`, `SelectItem`) use `label`, `value` and `description`, and a list of them is `items`.
  - The default slot is the main content, never the label. On a choice control (Checkbox, Radio, Switch, ToggleButton) the label is the main content, so there the default slot is the label and `label` is its string shorthand.
- **Accessible names:**
  - When the visible label can be hidden, the prop is `hideLabel`, which renders `.ui-sr-only` on the label.
  - A component with no visible text takes `aria-label` from the caller, and its types require it. No other prop supplies or hides a name.
  - The name of a control the component generates inside one of its parts is `<part>Label`, such as `closeLabel` on `DrawerHeader`.
  - A component never joins a number and words into one name, since their order depends on the language. The caller passes the whole translated string (`<Badge hideLabel label="5 unread messages">`).
- **Native names:**
  - A prop that passes straight to the element keeps its lowercase native name (`closedby`, `commandfor`, `popover`, `for`). React maps `for` to `htmlFor`, like the element. An inherited native attribute such as `title` keeps its name, so the `label` rule only applies to props the component defines.
  - A prop the component interprets is camelCase, and never reuses a native name for something else (Badge `invisible`, not `hidden`).
  - An overlay that a trigger addresses with `commandfor` or `interestfor` requires `id` in its types (Drawer, Menu, Tooltip and a hover Anchor).
- **One class, one meaning:**
  - A part class (`.ui-text`, `.ui-label`) is never also a variant.
  - Size words on a component root are its size. On a text element they are its text size, and a component's own rules win.
  - `.ui-dot` means a dot is shown, on Badge (the indicator is only a dot) and on Chip (the severity dot). The two roots differ, the visual is the same.
- **`start` and `end` are logical,** along the axis that fits: inline for slots in a row (`.ui-start`, `.ui-end`), block for text above and below a field (`startText`, `endText`). Inside a field's box, the regions above and below the input are `top` and `bottom` (`.ui-top`, `.ui-bottom`).
- **Slots and parts:**
  - A slot has one name in all five frameworks, kebab-case in Astro and Vue (`value-text`) and camelCase in React and Svelte (`valueText`). When a name clashes with a prop in one framework, the slot is renamed everywhere. The allowed names are listed in [src/component-api/AGENTS.md](../../../src/component-api/AGENTS.md#names).
  - The block regions of a container are parts, never slots: `.ui-header`, `.ui-content`, `.ui-actions` for buttons and `.ui-footer` for anything else at the end. Dialog and Drawer end in `.ui-footer`, where `.ui-actions` groups the buttons.
  - A part styled only under its root has a bare role class (`.ui-header`, `.ui-label`, `.ui-indicator`). A class that is also styled on its own, or shared by several roots, is a root class and carries the component name (`.ui-field-group`, `.ui-text-field`). `.ui-card-link` is the one exception, since `.ui-link` is the Link root.
  - A part's CSS reaches it with child combinators (`> .ui-label`), so a bare part class never styles the part of the same name in a nested component.
- **Every option is one of three kinds:** a prop with an HTML equivalent (`class` or `attribute` in `api.ts`), an HTML-only class or attribute (`frameworks: ["html"]`), or a prop-only behavior with no output (`keepOpen`). Every class a stylesheet adds is named by an option or a part.
- **The checked state uses the native name and each framework's native semantics:**
  - In React, `checked` with `onChange` is controlled and `defaultChecked` is uncontrolled.
  - In Svelte, `checked` is `$bindable()` where one input owns the state.
  - In Astro and Vue, `checked` is the native attribute.
  - Inside a group that owns the value (ToggleGroup), the group wins.

```astro
<div
  class:list={[
    "ui-chip",
    {
      "ui-multiline": isMultiline,
    },
    size && size !== "medium" && `ui-${size}`,
    variant && variant !== "tonal" && `ui-${variant}`,
    className,
  ]}
>
  <slot />
</div>
```

---

## 4. Parts and Slots

Containers compose, controls configure. Each component has one way to use it.

### Parts (containers)

Containers with block regions (Card, Dialog, Drawer, Accordion, Callout, Anchor, Tooltip) expose a part per region, with flat names: `CardHeader`, `DialogFooter`, `AccordionSummary`.

- A part's name is its root's name plus the region, and it renders that region's element and class (`CardActions` renders `.ui-actions`).
- Each part renders its own wrapper. The root renders its children as they are, and never wraps, reorders or inspects them.
- Defaults live in the part that renders them: `AccordionSummary` renders the chevron, `CalloutIcon` the severity icon.
- Parts must be direct children of their root, because the CSS targets `> .ui-header`, `> .ui-content` and so on. Title parts sit inside their region part: `DialogTitle` in `DialogHeader` and `DrawerTitle` in `DrawerHeader`. Other titles are plain headings in their region part, like `<h3>` in `CardHeader` or `CalloutContent`.
- Ids and settings reach parts through context: `context.astro.ts` (with `createContext` from `../context.astro`), `context.svelte.ts` (Svelte), `context.react.ts` (React, `"use client"`) and an `InjectionKey` in `context.vue.ts` (Vue). All four take their shape from the `Context` type in `types.ts`, and Vue provides it as a `reactive()` object. A folder with one of them has all four. `pnpm check-components` checks the four files, their imports and exports, and that Vue provides a `reactive()` object. Ids are deterministic, so every framework renders the same markup on the server.

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
  {
    (label || Astro.slots.has("label")) && (
      <span class="ui-label">
        {label}
        <slot name="label" />
      </span>
    )
  }
</div>
```

Check that a named slot exists before rendering its wrapper.

---

## 5. Form & Input Patterns

### Label Wrapping

Most inputs should be wrapped in a `<label>` to provide a larger hit area and built-in accessibility.

```astro
<label
  class:list={[
    "ui-text-field",
    size && size !== "medium" && `ui-${size}`,
    className,
  ]}
  style={style}
>
  <span class="ui-label">{label}</span>
  <span class="ui-field">
    <input {...rest} aria-invalid={error ? "true" : ariaInvalid} />
  </span>
  {endText && <span class="ui-end-text">{endText}</span>}
</label>
```

### End Text & ARIA

When providing `endText`, use `createId(Astro.locals)` (Astro), `useId()` (React and Vue) or `$props.id()` (Svelte) to link it to the input via `aria-describedby`, merged with the user's own `aria-describedby` by `idRefs` from `../id`. Checkbox, Radio, Switch, TextField and Textarea are the exception: the wrapping `<label>` names the control and already includes the end text, so they don't link it.

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

### Form Structure: Fieldset, FieldLegend, FieldDescription, FieldGroup

When building forms, follow this nesting order inside a `Fieldset`:

1. `FieldLegend` - The heading/label for the fieldset
2. `FieldDescription` - Optional helper text
3. `FieldGroup` - Wrapper for the actual form controls

**Always wrap form elements in a `FieldGroup`**, never place them directly after `FieldLegend` or `FieldDescription`.

```astro
<!-- ✅ Correct -->
<Fieldset>
  <FieldLegend>Username</FieldLegend>
  <FieldDescription>Enter your preferred username.</FieldDescription>
  <FieldGroup>
    <TextField placeholder="e.g. jdoe" />
  </FieldGroup>
</Fieldset>

<!-- ❌ Incorrect - TextField directly after FieldDescription -->
<Fieldset>
  <FieldLegend>Username</FieldLegend>
  <FieldDescription>Enter your preferred username.</FieldDescription>
  <TextField placeholder="e.g. jdoe" />
</Fieldset>
```

---

## 6. Identification & Accessibility

### Unique IDs

Always use `createId(Astro.locals)` from `../id` for IDs in Astro. It falls back to random IDs when no middleware sets `Astro.locals.$id`. In React and Vue, use `useId()`, and in Svelte, `$props.id()`. This ensures stability across server and client rendering and prevents ID collisions when multiple instances of the same component are on a page. Only generate an id for elements the component links itself; don't generate an input `id` the user didn't pass.

```astro
---
const $id = createId(Astro.locals)
const groupName = name || $id("tabs") // Prefer the passed value if available
---
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
---
type Item = { label: string; selected?: boolean; value: number | string }
type Props = { items?: Item[] }
---

<select>
  {items.map((item) => <option value={item.value}>{item.label}</option>)}
  <slot />
  <!-- Still allow manual entries -->
</select>
```

---

## 8. Development Workflow

1.  **Read the Spec**: Open `src/docs/components/[name].astro` to see required HTML and CSS classes, and the examples in `src/component-examples/[name]/` (`.html`, `.astro`, `.react.tsx`, `.svelte` and `.vue` per example). `src/pages/[framework]/components/[component].astro` is the route shell that renders every docs page for each framework.
2.  **Analyze the API**: Check `src/component-api/[name]/api.ts` for the documented props, slots and classes (see `src/component-api/AGENTS.md`). `[component-api]` problems in `pnpm test` and the build list what it's missing.
3.  **Implement**: Follow the checklist in Section 0, for Astro, React, Svelte and Vue.
4.  **Verify**: Run `pnpm exec vitest run tests/unit/parity.test.ts`, then check the rendered pages at `/html/components/[name]`, `/astro/components/[name]`, `/react/components/[name]`, `/svelte/components/[name]` and `/vue/components/[name]`, and the fixture pages at `/[framework]/test/[name]`, which only exist with `OPUI_TEST_PAGES=1` (`OPUI_TEST_PAGES=1 pnpm dev`, or `pnpm test:e2e:serve`).

---

## 9. Tokens, Forced Colors and More Contrast

### Read roles, never primitives

Component CSS reads `--ui-*` role tokens and its own `--_*` properties, and `pnpm check-css-vars` fails on a palette step, an Open Props primitive or a literal `px` or `rem` length, with what to read instead. A `--_*` input documented in `src/component-api/custom-properties/` may default to a length in its `:where()` rule, such as a Drawer's size, because it is the knob to change it; modifiers such as `.ui-large` set it from roles. When a component has a job an existing role names, it reads that role: `--ui-control-border-color` for the border of an unfilled control, `--ui-control-border-color-filled` for a filled one, `--ui-selected` and `--ui-on-selected` for the fill of a selected item, `--ui-selected-strong` and `--ui-on-selected-strong` for the mark that has to stand out on its own (a current marker, a bar, a filled selected tab), `--ui-primary-text`, `--ui-critical-text` and the other intent `-text` roles for colored text outside a severity scope, `oklch(from <intent> min(l, var(--ui-accent-fill-max-lightness)) c h)` for an intent fill under `--ui-on-fill` text (its border keeps the intent color, and a checked mark, which needs 3:1, keeps the limit in `choice.css`), `--ui-surface-tonal-hover` for a hovered tonal surface, `--ui-disabled-opacity` for every disabled control plus `--ui-text-disabled` for the label of a control without a fill (text and outlined buttons, chips, toggle buttons), `--ui-underline-*` for underlines, `--ui-choice-accent` for a checked mark, `--ui-track-bg-color` for an empty track, `--ui-shadow-control` for a control's shadow, `--ui-shadow-overlay` for a floating surface, `--ui-radius-small` for a small part, `--ui-font-size-caption` and `--ui-font-size-small` for small text, `--ui-space-N` for every gap and padding, and the `--ui-palette-*` roles for the shades of the current palette inside a severity scope. A new token is named by its role, not the component, is declared in `theme.css` with today's value, or optional with today's value as the fallback at every read site, has an `--ui-on-*` pair when it is a fill, and gets a description in `src/utils/theme-token-descriptions.ts`, a promise in `src/utils/theme-token-promises.ts` when it guarantees contrast, a CHANGELOG entry and a What's new note.

### Declared, optional and hook tokens

Every theme token is one of three kinds, and `tests/unit/theme-tokens.test.ts` checks the reads:

- A declared token has a value in `theme.css` and is read without a fallback. Knobs and derived roles are declared.
- An optional token is a commented-out line in `theme.css` with its example value, read with a fallback, and every read site uses the same fallback (`--ui-button-radius` falls back to `--ui-radius` everywhere). Most component tokens are optional, so a theme that doesn't set them costs nothing.
- A hook is an optional role that several components read, each with a default of its own, so one theme value unifies them: `--ui-selected`, `--ui-on-selected`, `--ui-primary-tonal`, `--ui-control-accent`, `--ui-on-control-accent`, `--ui-choice-accent`, `--ui-track-bg-color`, `--ui-control-border-color`, `--ui-control-border-color-filled` and `--ui-border-color-raised`. `--ui-control-accent` and `--ui-on-control-accent` are the accent every control shares: `Button` and `ButtonGroup` read them before `--ui-palette-strong`, `Choice` and `Range` before `--ui-primary`, and each component's own `--ui-button-accent` or `--ui-choice-accent` still comes first. The list is `OVERRIDE_HOOKS` in `src/utils/theme-tokens.ts`, and a token joins it only when its read sites need different defaults; a second read of an optional token with a new fallback is a hook or a bug, never a third kind.

A new token is declared when one default serves every reader, optional when a component has a sensible default of its own and a theme rarely needs it, and a hook only when the job already spans components. Prefer a formula of an existing token over a new one, and a `-filled`, `-on-raised` or size suffix over a second family. Every token also has a tier, `knob`, `primitive`, `role`, `hook`, `component` or `input`, declared in `src/utils/theme-token-tiers.ts` (hooks come from `OVERRIDE_HOOKS`, inputs from `INSTANCE_INPUTS`, the palette steps of `core/palette.css` are primitives, and a token not listed is a role), shown on the Theme tokens page and exported in `tokens.json`. A knob is an input a theme turns (`--ui-palette-hue`, `--ui-density`, the limits and strengths the contrast rules tighten), a primitive is derived from the knobs and read by no component (`--ui-font-size-100` to `900`), a role is what components read, a component token is read by one component, and an input is a `--ui-*` property a component reads but no theme sets, such as `--ui-anchor-position-area`, listed in `INSTANCE_INPUTS` in `src/utils/theme-tokens.ts`.

### Naming tokens

A new token follows the naming model, so each word means one thing:

- `--ui-on-{fill}` is the text and icon color on a fill: `--ui-on-primary`, `--ui-on-selected`, `--ui-palette-on-tint`. `tests/unit/css-properties.test.ts` fails on a `-contrast` name.
- `-text` after a color is that color tuned for reading: `--ui-primary-text`, `--ui-invalid-text`. Every intent has one, derived with `--ui-text-max-lightness` and `--ui-text-min-lightness`.
- Variant and context come last: `-filled` for a filled control (`--ui-control-border-color-filled`), `-on-{surface}` for what is drawn on a surface (`--ui-border-color-on-raised`).
- `light` and `dark` only name a color scheme, `inverse` only the opposite of it, `primary` only the brand color, and `elevated`, `filled` and `tonal` only their variants. `raised` is any surface above the page.
- One part, one word: the radius family is `--ui-radius-*`, and the Switch part is the thumb.
- `tests/unit/css-properties.test.ts` fails on an `--ui-on-{fill}` without a fill to sit on. The mark on a severity fill is `--ui-palette-on-strong`, since the fill is the palette's strong shade.
- The default of a family is the bare name, and modifiers add a suffix: `--ui-text`, `--ui-text-strong`, `--ui-text-subtle`; `--ui-surface`, `--ui-surface-filled`, `--ui-surface-tonal`, `--ui-surface-inverse`; `--ui-line-height` and `--ui-line-height-control`.
- `control` is anything a user operates (buttons, chips, toggles, tabs, fields), and `field` is the subset that holds a value. A `--ui-field-*` token exists only where fields differ from other controls, and the size tokens of each are aliases of `--ui-control-size*`.
- A token that names a color by its role carries no suffix (`--ui-primary`, `--ui-selected`, `--ui-button-accent`). A token that names a property of a part ends in what it paints.
- Component tokens start with the component and end like the `--_*` properties: `-bg-color`, `-text-color`, `-border-color`, `-size`, `-radius`, `-gap`, `-shadow` or `-padding` (`--ui-code-block-bg-color`, `--ui-choice-ripple-bg-color`, `--ui-button-padding-inline`), or a value named by the CSS property it sets or by its type: `-font-size`, `-font-weight`, `-line-height`, `-position-area`, `-blur`, `-offset`, `-translate`, or a keyword like `-hover` (`--ui-field-label-font-weight`, `--ui-backdrop-blur`, `--ui-button-hover`). A role name carries no suffix (`-accent`, `-on-accent`), a knob ends in `-strength` or `-lightness`, and a size suffix (`-small`, `-large`) or context (`-filled`, `-on-raised`) comes after. A color is never a bare `-color`. `-size` is the one word for an extent, and `-width` only names a border or outline thickness. Sizes are logical (`-inline-size`, `-block-size`). `tests/unit/css-properties.test.ts` enforces the list.

### Naming custom properties

Private `--_*` properties follow the same suffixes as component tokens, so one word means one thing in every stylesheet:

- `--_radius`, never `--_border-radius`.
- Logical sizes only: `--_block-size`, `--_inline-size`, never `--_height` or `--_width`.
- `--_size` is a control's size, the private side of the `--ui-*-size` tokens the size classes set: the height, and the width of a square control (`Avatar`, `Button`, `Checkbox`, `Radio`, `ToggleButton`). The CSS property it feeds (`block-size`, `min-block-size`, `inline-size`) doesn't change the name, and a part's size takes the part's prefix (`--_icon-size`, `--_thumb-size`, `--_track-block-size`). A box that isn't a control names its axis like the CSS property: `--_block-size` and `--_inline-size` (`Carousel`, `Drawer`), `--_max-inline-size` (`Dialog`, `Tooltip`), `--_min-block-size` (`Menu`). Never `--_input-size` or `--_min-height`.
- `selected` names the chosen item (a selected tab, row, option or marker, a checked toggle button): `--_selected-bg-color`, `--_marker-selected-bg-color`. `active` only names the `:active` press, next to `hover`: `--_filled-active-bg-color`, `--_filled-hover-bg-color`.
- A stylesheet that styles several components declares their shared properties once, and a component it styles sets them in its own file instead of declaring a second property for the same job: `card.css` declares `--_elevated-shadow` for `.ui-accordion`, `.ui-card` and `.ui-dialog`, and `dialog.css` sets it to `--ui-shadow-overlay`; `choice.css` declares `--_size` for `.ui-checkbox`, `.ui-radio` and `.ui-switch`, and `switch.css` sets it to the track height. Both `custom-properties` files document the property.
- `-gap` is the distance between siblings, `-padding` an inset and `-margin` an outside offset. Never `-space`.
- No abbreviations: `--_shift-x` and `--_direction`, never `--_tx` or `--_dir`.
- A value that is neither a length nor a color is named by its type: `--_<part>-image`, `--_<part>-label`, `--_<part>-fraction`.
- Role names carry no suffix, like the role tokens: `--_accent`, `--_on-accent`.
- A line that stands in for a border keeps the border name even when a background draws it: the `Divider` line is `--_divider-border-color`, like the dividers in `Accordion`, `List` and `Menu`.

`tests/unit/css-properties.test.ts` fails, with no allowlist, on the names these rules ban (`-border-radius`, `-height` and `-width` except a border or outline width, `-space`, `-tx`, `-ty`, `-dir`, `--_input-size` and a bare `-color`) in every `--_*` property and component token, and on a component token that doesn't end in one of the suffixes above.

### Forced colors

Windows High Contrast (`forced-colors: active`) repaints everything with system colors and drops backgrounds and shadows. A component needs a `@media (forced-colors: active)` block only where a boundary or a state is carried by color alone: a shadow-only edge, a tinted selected state, a filled track. Borders are forced to `CanvasText` by the browser and need nothing, and Chromium forces a `transparent` border color like any other. `tests/unit/forced-colors.test.ts` checks both lists against the stylesheets that contain the media query. The components with a block, and why:

- `Accordion`: the elevated and tonal variants have a shadow-only edge, so they get a `CanvasText` border.
- `Avatar`: a letter avatar is a fill, so it gets a `CanvasText` border.
- `ButtonGroup`: the dividers are box shadows, so the buttons get a `ButtonBorder` border.
- `Card`: the focused card-link border is a tint, so it gets `Highlight`.
- `Carousel`: the scroll markers are fills, so they get a `ButtonText` outline and `SelectedItem` for the current one.
- `Checkbox`, `Radio`, `Switch` and `Choice` (their shared root): the checked mark, the switch track and the checked `.ui-card` border are tints, so they get `SelectedItem`, `SelectedItemText` and `CanvasText`.
- `Chip`: the severity dot and the selected state are fills, so they get `CanvasText` and `SelectedItem`.
- `Divider`: the line is a background, so it becomes a `CanvasText` border.
- `List`: selected and current items are tints, so they get `SelectedItem`.
- `Progress`: the filled track, so it gets `SelectedItem` and a `CanvasText` outline.
- `Range`: the track and its fill are backgrounds, so they get `CanvasText` and `SelectedItem`.
- `Select`: the picker chevron is a mask, so it gets `ButtonText`.
- `Spinner`: a `CanvasText` ring with `forced-color-adjust: none`, so its transparent segment is kept and the spin stays visible.
- `Tabs`: the selected tab is a tint, so it gets `SelectedItem` and a `CanvasText` border.
- `TextField`: the field border is real, but the focus outline gets `Highlight` and the autosuggest mask chevron `ButtonText`. `Select` and `Textarea` share the stylesheet.
- `ToggleButton`: the checked state is a tint, so it gets `SelectedItem`.
- `ToggleGroup`: the dividers between buttons are shadows, so they become `CanvasText` borders.
- `Tooltip`: the surface and the arrow are fills, so they get a `CanvasText` border and arrow.
- `Typography`: the `.ui-swatch` legend dot is a fill, so it keeps a `CanvasText` fill with `forced-color-adjust: none`. Text and underlines are forced by the browser, and code blocks lose their fill and keep their text.

The components without a block, and why:

- `Anchor`, `Form`, `Layout`, `DescriptionList`: layout only, no boundary or state of their own.
- `Badge`, `Callout`, `Dialog`, `Drawer`, `Menu`, `Table`: every boundary is a real border, which the browser forces to `CanvasText`.
- `Button`: the browser styles `button` with `ButtonFace`, `ButtonText` and `ButtonBorder`; the variants only change colors, which are forced anyway.
- `Link`: text and underlines, forced to `LinkText` and `CanvasText`.
- `Textarea`: `textarea.css` only sizes the control; `text-field.css` has the block.

When a component gains a shadow-only edge or a color-only state, it gets a block and this list is updated.

### More contrast

`theme.css` sets no color for more contrast. It tightens the knobs the roles are derived from (the `--ui-*-strength-*` mixes, the `*-max-lightness`, `*-min-lightness` and `*-max-chroma` limits, `--ui-focus-ring-width`) on `html` under `prefers-contrast: more` and on `.ui-contrast-more`, which is a scope, and every role follows. A component only adds its own `@container style(--ui-contrast: more)` block when the shape changes (an outline added, a translucent fill made solid) or to swap a private property to another role. It never re-tunes numbers: a limit it needs is a knob in `theme.css`, set in both contrast rules. A role that has to get stronger with more contrast is a formula of a knob, never a second value in a contrast block.

---

## 10. Stylesheets and Layers

`css/components.css` imports every component stylesheet in one of three groups, named by the layer the files declare, and `tests/unit/layers.test.ts` checks each file against its group:

- **Root components** declare `components.root`: base rules shared by several roots (`card.css` for `.ui-accordion`, `.ui-card` and `.ui-dialog`, `anchor.css` for `.ui-anchor`, `.ui-badge` and `.ui-tooltip`, `choice.css` for the checkbox, radio and switch) and per-component rules, none of which has to beat another component's rules on the same element. `typography.css` also declares `components.prose`, the classless rich text below every component.
- **Extended components** declare `components.extended` for the rules that must beat another component's rules on the same element (a `Dialog` on top of `card.css`, a `Badge` on top of `anchor.css`, a `Menu` or `Select` over `list.css` and `text-field.css`), and `components.root` for rules that must not (the dense `List` sizes for a `Checkbox`, which an explicit size class on the checkbox has to beat).
- **Utilities** declare `utils`: `layout.css`, whose classes beat every component, like `core/utils.css`.

A new stylesheet goes in the group of the layer it declares, and a file that needs a layer its group doesn't allow moves group instead of opening the layer.
