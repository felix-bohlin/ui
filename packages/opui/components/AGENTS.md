# UI Component Implementation Guide

This guide defines the standards for implementing reusable Astro UI components in this package (`packages/opui/components/<Name>/<Name>.astro`) based on the documentation specs at `src/docs/components/`. Use it as a reference for maintaining consistency and accessibility across the library.

**CRITICAL INSTRUCTION**: Always use components from this package (imported via the `@opui/astro` alias) and their corresponding CSS from `packages/opui/css/components/` whenever possible. Avoid writing custom CSS if an existing component or utility can achieve the desired result.

## 0. Implementation Checklist

When implementing or updating a component, ensure:
- [ ] **Title Export**: `export const title = "Component Name"` is present.
- [ ] **Props Type**: Used `type Props = { ... }` (avoid interfaces).
- [ ] **Sorting**: Props, Destructuring, and Classes are sorted alphabetically.
- [ ] **Rest Props**: `...rest` is captured and spread onto the root element.
- [ ] **Class Management**: Used `class:list` for all class manipulations.
- [ ] **ID Stability**: Used `Astro.locals.$id` for any internal element linking.
- [ ] **Accessibility**: ARIA labels, roles, and relationships are correctly handled.
- [ ] **Slot Strategy**: Named slots are used for structural content (icons, actions).

---

## 1. Frontmatter Structure

Every component must follow this exact frontmatter layout:

```astro
---
type Props = {
  [key: string]: any // Required for ...rest support
  class?: string
  disabled?: boolean
  label?: string
  size?: "small" | "large"
  variant?: "outlined" | "tonal" | "filled"
}

export const title = "My Component"

const {
  class: className,
  disabled,
  label,
  size,
  variant = "outlined", // Default values in destructuring
  ...rest
} = Astro.props
---
```

### Key Rules:
- **Alphabetical Sorting**: Sort property definitions in `type Props` and variables in the destructuring statement.
- **REST Support**: Always include `[key: string]: any` in props and `...rest` in destructuring.
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

### Styling Inheritance
Components should often inherit styles from others (e.g., `Dialog` looking like a `Card`). Use conditional classes to apply the inherited base class. All library classes are prefixed with `ui-`.

```astro
<dialog class:list={["ui-dialog", { "ui-card": variant }, variant && `ui-${variant}`, className]} {...rest}>
```

---

## 3. Class Management

Use `class:list` exclusively. Every library-owned class is prefixed with `ui-`; the public prop API stays unprefixed (`<Button size="small" variant="outlined">`) and the component interpolates the prefix when rendering.

Follow this order for readability:
1.  **Component Base Class**: The primary CSS class, prefixed (e.g., `"ui-button"`).
2.  **State Objects**: Boolean flags as quoted prefixed keys (e.g., `{ "ui-disabled": disabled }`).
3.  **Variant Props**: Interpolate the prefix from the prop value (e.g., `size && \`ui-${size}\``).
4.  **External Class**: Always include `className` at the end to allow for overrides. Do not prefix `className`.

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
<label class:list={["ui-field", { "ui-disabled": disabled, "ui-critical": error }]}>
  <span class="ui-label">{label}</span>
  <input type="text" {...rest} />
  {endText && <span class="ui-end-text">{endText}</span>}
</label>
```

### End Text & ARIA
When providing `endText`, use `Astro.locals.$id` to link it to the input via `aria-describedby`.

```astro
---
const { $id } = Astro.locals
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
Always use `Astro.locals.$id` for IDs. This ensures stability across server and client rendering and prevents ID collisions when multiple instances of the same component are on a page.

```astro
const { $id } = Astro.locals
const fieldId = id || $id("input") // Prefer passed ID if available
```

### Default Icons
Components like `Callout` or `Toast` should provide default SVG icons within their named slots, while allowing users to override them.

```astro
<slot name="icon">
  {severity === "error" && <svg>...</svg>}
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

1.  **Read the Spec**: Open `src/docs/components/[name].astro` to see required HTML and CSS classes. (Component docs live under `src/docs/components/` now; `src/pages/components/` only contains route shells.)
2.  **Analyze the API**: Check `src/component-api/[name]/` (`Astro.astro` and `HTML.astro`) or `src/component-api/[name]-api.astro` for the documented props.
3.  **Implement**: Follow the checklist in Section 0.
4.  **Verify**: Check that your implementation matches the "HTML" preview in the rendered `Example` for the spec page (`/components/[name]`). For framework-specific behaviour, also verify the Astro variant at `/astro/components/[name]`.


