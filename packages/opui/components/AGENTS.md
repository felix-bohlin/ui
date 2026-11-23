# UI Component Implementation Guide

This guide defines the standards for implementing reusable UI components in this package. Every component ships an Astro, a React, a Svelte and a Vue version side by side (`packages/opui/components/<Name>/<Name>.astro`, `<Name>.react.tsx`, `<Name>.svelte` and `<Name>.vue`), based on the documentation specs at `src/docs/components/`. All should render the same markup as the HTML examples, which `pnpm build-examples` renders from the Astro ones and the parity snapshots in `tests/unit/__snapshots__/` record, and `tests/unit/component-contract.test.ts` compares the four frameworks over every prop value and slot. A framework can add some markup of its own because of how it works (recorded as `.diff` drift next to the parity snapshots), but in general the output is the same. Use it as a reference for maintaining consistency and accessibility across the library.

Build on this package's components (imported via `opui-css/astro`, `opui-css/react`, `opui-css/svelte` and `opui-css/vue`) and their CSS in `packages/opui/css/components/`, and write custom CSS only where no existing component or utility does the job.

## 0. Implementation Checklist

When implementing or updating a component, ensure:

- [ ] **All Frameworks**: Every `.astro` file has a matching `.react.tsx`, `.svelte` and `.vue` file in the same folder (`pnpm check-components` fails otherwise).
- [ ] **Title Export**: `export const title = "Component Name"` in `<Name>.astro`, which the docs read (`pnpm check-components` fails without it).
- [ ] **Props Type**: A component types its props with `Props` (the root) or `<Root><Part>Props` (a part, `CardActionsProps`) from its framework's own types file (`./types.astro`, `./types.react`, `./types.svelte`, `./types.vue-props`), and Vue its slots with `Slots` or, for a part with its own slots, `<Root><Part>Slots` (`AccordionSummarySlots`); `pnpm check-components` checks the names and the imports. `types.ts` names the named slots `Slots<S>` (`Badge`, `Field`) and declares no type for the default slot alone: `children` comes from `ComponentProps` and `SvelteHTMLElements`, and `types.vue-props.ts` names its slots `Slots` (`DefaultSlots` from `../vue` when the default slot is the only one).
- [ ] **Sorting**: Props and destructuring are sorted alphabetically, slots last with `children` first. Classes follow section 3 (base, states, variants, `className`), in the same order in every framework. `pnpm check-components` checks the keys of every object type in the type files, the order of the destructured props (React's slots are the Svelte twin's snippets), `className` last, the order of every class list against Astro, and the key of every list in React, Svelte and Vue.
- [ ] **Rest Props**: `...rest` goes onto the root element, or the input of a form control. `pnpm check-components` checks that Astro, React and Svelte capture and spread it, and that Vue binds the attributes it doesn't inherit.
- [ ] **Class Management**: The class list of section 3 in each framework; `pnpm check-components` checks the `ui-` prefix and that every framework keeps Astro's order.
- [ ] **ID Stability**: Used `createId(Astro.locals)` in Astro, `useId()` in React, `$props.id()` in Svelte and `useId()` in Vue for any internal element linking.
- [ ] **Accessibility**: Names, roles and relationships follow the Accessible names rules in section 3 and the ids in section 6.
- [ ] **Parts or Slots**: Containers expose parts (section 4); form controls and small components use props and named slots.
- [ ] **No State**: The app owns every value; a form control behaves like the native control bound in the framework's own way ([State belongs to the app](#state-belongs-to-the-app)).
- [ ] **Exports**: The component and its `Props` type are exported from `packages/opui/astro/index.ts`, `packages/opui/react/index.ts`, `packages/opui/solid/index.ts`, `packages/opui/svelte/index.ts` and `packages/opui/vue/index.ts`, sorted, the root's as `Props as <Root>Props` and each part's under its own name (`Props as CardProps`, `CardActionsProps`). `pnpm check-components` checks that the barrels are sorted and export the same components and types, with each `Props` type from the framework's own types file and a `<Name>Props` for every component.

---

## 1. Frontmatter Structure

Every component uses layered type files:

- `types.ts` - shared, framework-agnostic props (component-specific only; no `HTMLAttributes`), and the `Context` shape for components with context
- `types.astro.ts` - Astro props = base + `HTMLAttributes<element>`
- `types.vue-props.ts` - Vue props = base + `Class` from `../vue`, plus the `Slots` type for `defineSlots` (`DefaultSlots` from `../vue` when the default slot is the only one) and a `<Root><Part>Slots` for each part with its own slots. It imports the base types by name (`Props as BaseProps`), because the Vue compiler can't resolve `defineProps` types through `import type * as Base`. The name avoids `types.vue.ts`, which the Vue compiler reads as the `.vue` file, and `types.d.vue.ts`, a declaration file name that `skipLibCheck` leaves unchecked
- `types.react.ts` - React props = base + named slot props (`Base.Slots<ReactNode>`, when there are any) + `ComponentProps<element>`, which brings `children`
- `types.solid.ts` - Solid props = base + named slot props (`Base.Slots<JSX.Element>`, when there are any) + `ComponentProps<element>` from `@solidjs/web`, which brings `children`
- `types.svelte.ts` - Svelte props = base + named snippets (`Base.Slots<Snippet>`, when there are any) + `SvelteHTMLElements[element]`, which brings `children`

Every component folder has all six files; `pnpm check-components` fails when one is missing.

A custom element's attributes and events are typed on the element itself, in `react/elements.ts`, `solid/elements.ts` and `svelte/elements.ts` (`ondismiss` on `opui-callout` in Svelte, `onSort` on `opui-sortable-table` in Solid), so the component's framework types reach them through `ComponentProps<"opui-...">` or `SvelteHTMLElements["opui-..."]` and stay compiled. An event the component's root fires is also the component's own: `types.ts` lists it in `Events` (`<Root><Part>Events` for a part) with the type of its event object (`dismiss: Event`, `sort: CustomEvent<SortDetail>`), and `pnpm build-components` turns it into `onDismiss` in React, which `useListener` from `../react` attaches with a ref callback that also passes the caller's `ref` on, since React 19 attaches a custom element's `ondismiss` on a client render but not on hydration (a custom element root also renders `data-hydrating`, which `useHydrated` takes off once the listener is attached, and the element ignores presses while it's there, so none happens without `onDismiss`), `ondismiss` on the root element in Svelte, and in Vue an `Emits` type that `defineEmits` declares and the root re-emits (`@dismiss`). A custom element root renders `data-hydrating` in Solid, Svelte and Vue too, and each takes it off once the root has hydrated or rendered on the client: Solid spreads `hydrating()` from `../solid`, which prints it on the server only, and removes it with `hydrated` in the root's `ref`, next to the caller's, Svelte removes it with the `hydrated` attachment from `../svelte` and Vue with `v-hydrated` (`vHydrated` from `../vue`). `tests/e2e/hydration.spec.ts` lists the attribute in `LATE`, and `pnpm test:apps` presses the close button and a header before each server-rendered app hydrates. The API docs list them as `onDismiss`, `ondismiss` and `@dismiss` options, one per framework, like `onSort`, `onsort` and `@sort` on `SortableTable`.

`tests/unit/elements.test.ts` checks the class each module in `elements/` exports, its tag in `HTMLElementTagNameMap`, that `react/elements.ts`, `solid/elements.ts` and `svelte/elements.ts` type every attribute it reads, and that the `elements` of an `api.ts` document its members. `tests/e2e/elements.spec.ts` loads each module before and after its markup, removes the element and adds it back.

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

Derived values go in `computed()`, so they update when props change. A template has no place to declare a value per `v-for` row, so a const of a loop callback is written where it is read, and when one is read more than once the loop's consts are computed once per row in a `computed` list (`const rows = computed(() => items?.map((item) => { ...; return { closes, item, Tag } }))`) that `v-for` destructures (`{ closes, item: { href, ...itemRest }, Tag }`). A loop with a const that reads a slot keeps its consts where they are read (`$slots.icon`), since a `computed` list would keep the slot's first answer. So does a nested loop whose list or consts read a name an enclosing loop declares (`group.items`), which the script doesn't have. A value that reads a slot, or reads such a value, is a getter called in the script and the template (`hasEndText()`), since Vue doesn't track slots and a `computed()` would keep its first answer; `tests/unit/vue-slot-getters.test.ts` adds a slot after mount, and the compiler refuses a provided value that reads one. A `computed()` that lists the attributes (`useInputAttrs()` from `../vue`, the compiled `restAttrs`) reads the ones it leaves out by name (`const { style: _style, ...rest } = attrs`): Vue tracks a read of one attribute but not a loop over them, so over a field mounted without attributes it would never see one added later (`tests/e2e/updates.spec.ts`). A control renders its native element twice, `v-if="bound"` with `v-model` and `v-else` with the attributes as passed, where `bound` from `useBound()` in `../vue` says whether the parent passed `v-model` or a `model-value`: unbound, no `v-model` writes the element when it mounts. The unbound branch sets a `checked` through its attribute object, only when it's defined, so Vue doesn't patch an attribute nobody passed when it hydrates. A group (Tabs, ToggleGroup) provides `bound` and its model, and an item binds its input with `v-model` to the group's model when the group is bound, so Vue handles radios, arrays and values itself.

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

Derived values go in `$derived()`. Slots are snippets: the default slot is `children`, named slots are camelCased (`end-text` becomes `endText`). Two sibling blocks with no whitespace between them in the Astro file stay on one line (`{/if}{#if iconChecked}`): a line break between two blocks is a text node in Svelte, one space the Astro markup doesn't have, so the glued form is what keeps the markup the same in every framework. The components need Svelte 5.57 or later: `{@attach}` came in 5.29, and older versions clear a select's `bind:value` when Chromium updates the `<selectedcontent>` of its `SelectButton`. Where Vue uses `defineModel`, Svelte uses `$bindable()`, for the props the `model` in the component's `api.ts` lists; `pnpm check-components` checks both. Vue's `provide`/`inject` maps to the typed `getContext`/`setContext` helpers in each component's `context.svelte.js`, plain JavaScript typed with JSDoc, since Vite's dependency optimizer compiles a `.svelte.ts` module with the Svelte compiler before anything strips its types. A control binds its input with Svelte's own `bind:` and passes `defaultChecked` through, so a form reset goes where Svelte sends a native input. A checkbox's getter only reads props: `checked ?? defaultChecked`, or whether its `group` holds its `value`. `bind:group` takes only a plain name, so a component can't route it to an unbound `checked`: the radios of `Radio` and `Rating` and the inputs of `TabsItem` and `ToggleButton` write `checked` from the bound value through the `seedChecked` attachment from `../svelte`, which also hands on a choice made before hydration, a checkbox's both ways and a radio's only when it was checked (`tests/unit/svelte-seed.test.ts`), and they keep their first state as `defaultChecked` so the attachment can tell that choice from the server's.

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

Slots are props: the default slot is `children`, named slots are camelCased `ReactNode` props (`end-text` becomes `endText`), like Svelte snippets. The value of a provided context is memoized (`const context = useMemo<Context>(() => ({ ... }), [...])`, with every name the value reads as a dependency), so a render of the provider that changes nothing gives its consumers the same object; a provider reads `defined(rest)` into `attrs` above the memo. `tests/unit/react-context.test.ts` renders every provider twice with the same props and names the one whose value changed. The rest of a variable tag is spread as `HTMLAttributes<HTMLElement>`, the attributes every tag takes, and a cast on a plain element's rest in the Astro file carries over as `ComponentProps<"li">`. There is no two-way binding: form controls pass the native `checked`/`defaultChecked` and `onChange` through. ToggleGroup has no native value, so it takes `value`, `defaultValue` and `onValueChange` and passes the selection to its buttons through context (its `change` callback sits in `useCallback` and narrows on `multiple` before it calls `onValueChange`, so the call needs no cast), and Rating, whose radios check themselves against its `value`, takes the same three. A group keeps no state: it hands `value`, `defaultValue` and its `change` to its items through context, an item renders `checked` from the group's `value` or `defaultChecked` from its `defaultValue`, like a native radio, and the caller's `ref` goes on the input as is. React attaches its handlers after hydration and replays no change, so a choice made before the page hydrated stays on screen and calls nothing, as on a plain React input. Vue's `provide`/`inject` maps to a React context in each component's `context.react.ts`. Components that use context, state, effects or their own event handlers, or import an element script, start with `"use client"`; the others stay server components, so they also render in React Server Components. An element script is a side-effect import at the top of the module, as in Solid, Svelte and Vue, so the element is defined before the page hydrates. `pnpm check-components` checks both ways. In the Astro file, `set:html=""` on an empty element marks content the browser or a custom element writes (the character count, Copy's status, the toasts): the compiler gives it `dangerouslySetInnerHTML={{ __html: "" }}` and `suppressHydrationWarning` in React, so hydration leaves it alone.

The Solid component (`<Name>.solid.tsx`, Solid 2) starts with `/** @jsxImportSource @solidjs/web */`, a compiler directive that makes TypeScript read the file as Solid JSX instead of the React JSX `tsconfig.json` sets. It reads every prop as `props.x` instead of destructuring, so the props stay reactive, and takes the rest with `omit(props, ...)`, the keys sorted like a destructuring with the slots last and `children` first. A prop with a default reads through an accessor that applies the default only to `undefined`, like a destructuring default (`const variant = () => (props.variant === undefined ? "tonal" : props.variant)`), and so does a derived value that reads a prop, a context or a slot (`const inputId = () => ...`, read as `inputId()`). Each read of a JSX prop builds its DOM again, so a slot read more than once resolves once through `children(() => props.label)`, read as `resolvedLabel()`. A node has one parent, so a slot a list renders is built once per item: resolved in the `<For>` callback when the item reads it twice, read as `{props.end}` when it reads it once. A component that provides a context creates its `children()` memos in a `content` function it renders under the provider (`{content()}`), so slot content can read the context. A ternary, `&&`, `||` or `??` in a component's prop that reads a prop or an accessor (`aria-invalid={error ? "true" : ariaInvalid}` on `CheckboxInput`) reads through an accessor too, named after the attribute (`invalid()`, or `buttonTitle()` when `title` is taken): a call is the one form Solid never compiles to a memo, which would take a hydration id per read, and the server and the client don't read a prop equally often. A list is `<For each={items} keyed={false}>`, keyed by index like the other frameworks, never `.map()`, which builds every row again when the list changes. Its callback takes the item as an accessor and the index as a number: `item()`, `item().label` for a field the Astro file destructures and `omit(item(), ...)` for the rest of the pattern, read in JSX or in an accessor and never at the top of the callback, so an `items` array of new objects updates the rows in place and keeps their focus. A name the callback declares for itself says so (`initialItemChecked`, `itemTitle`), since the body may hold the plain one. A condition is `&&` or a ternary, and `<Show when={tag()}>{(shownTag) => ...}</Show>` only where the content passes the narrowed value to a function or renders it as a tag. Classes are a `class={[...]}` array, or the entry itself when the list has one entry that is no object and can't be `false` (`class={props.class}`), ids come from `createUniqueId()`, a tag that reads a prop is `dynamic(tag)` from `@solidjs/web`, a per-item tag in a list is `<Dynamic component={tag()}>`, a tag that is always one string is the element (`<selectedcontent />`), and a provided context is an object of getters, like Svelte's, each written inline when nothing else reads its accessor. Form controls take the native `checked` and report changes with `onInput` and `onChange`. The control keeps the prop out of the rest and hands a read of it to `control()` from `../solid`, which captures the first state itself (`const checkedControl = control(() => props.checked)`). Its second argument is a default the rest doesn't carry: the checked state an item takes from its group. The element spreads `checkedControl.server`, which holds the state, or the default when there is no state, as `checked` on the server and nothing on the client, and takes `checkedControl.ref`, which on a client render sets the state as the `checked` property and a default as `defaultChecked`, leaves a node it hydrates alone (Solid's `setProperty` skips it), and then writes `checked` only when the prop itself changes, like `checked={...}` on a native input. In the rest it would be written again on every run of the element's spread, over the user's choice (`tests/e2e/models.spec.ts`). A value the component reads is an accessor (`const value = () => props.value ?? props.defaultValue`). A group (Tabs, ToggleGroup) and Rating take `value`, `defaultValue` and `onValueChange`: a group keeps no state, hands `props.value`, `props.defaultValue` and its `change` to its items through context, and calls `onValueChange` with each choice. A change the caller doesn't store stays on screen, as on a native Solid input. An event in `Events` needs no code: its `on<Event>` prop (`onDismiss`, typed on the element in `solid/elements.ts`) stays in the rest and the spread on the root attaches it, and a custom element root adds `{...hydrating()}` and `ref={[props.ref, hydrated]}` from `../solid` for the `data-hydrating` guard, with `ref` out of the rest. An input whose owner holds the checked state (`TabsItem`, `ToggleButton`, Rating's radios) follows it the same way (`control(() => grouped() ?? props.checked, ...)`), with the group's `defaultValue` or its own `defaultChecked` as the default: the server prints the state, a client render sets it, and a later change of the owner's value writes `checked`. A choice made before the page hydrated stays on screen and reports nothing. Vue's `provide`/`inject` maps to a Solid context in each component's `context.solid.ts`, created with `null` as its value outside a provider. `pnpm check-components` checks the pragma, the `omit()` order, that each slot is read once outside a `<For>`, and that no port destructures its props, calls `merge`, `mergeProps` or `splitProps`, builds JSX with `.map()`, calls `dynamic()` on a string literal or passes a condition to a component.

### Key Rules:

- **REST Support**: Native attributes come from `HTMLAttributes` in `types.astro.ts` and the other framework type files, never from `types.ts`. `pnpm check-components` checks the `...rest` spread and fails on an index signature such as `[key: string]: any`.
- **Undefined attributes**: an attribute a caller passes as `undefined` or `null` never removes an attribute the component sets, in any framework. `tests/unit/component-contract.test.ts` renders every case again with them and says how to keep the attribute.
- **Attributes before the spread**: a value a caller passes for an attribute an element sets before `{...rest}` renders the same in every framework. `tests/unit/component-contract.test.ts` renders every case again with one for each typed attribute and says how to settle which value wins.
- **Attributes from the root**: the contract test renders a part without its root, so it can't see an attribute the root hands down through context. When another element points at it, the part destructures the attribute, renders the root's value over its own (`id={dialog?.titleId ?? id}`) and warns in development when it gets a different one (`warnReplacedId` on `DialogTitle`, `warnReplacedAnchorAttributes` on `AnchorContent`). `tests/unit/dev-warnings.test.ts` renders each part inside its root.

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
- **Link components**: In React, Solid and Vue, `as` also takes the link component of the app's router (Next's `Link`, Solid Router's `A`, Nuxt's `NuxtLink`): give the props type in `types.ts` a `Link = never` parameter and write `as?: "a" | Link` in the branch with `href`, then resolve the tag with `linkTag(as, disabled)` and spread `tagAttrs(Tag, disabled, href)` (`../tag`), which pass `href` to the component and render a disabled one as the plain disabled `<a>`.
- **Button type**: A rendered `<button>` gets `type="button"` unless the user passes `type`, so it never submits a form by accident.
- **Spreads on a dynamic tag or a custom element**: Astro lets an `undefined` spread value remove an attribute set before it on a `<Tag>` or a custom element, so spread `{...defined(rest)}` (`../attrs`) there. `tests/unit/tooling-bugs.test.ts` says when Astro no longer needs it.
- **Empty unknown elements**: Astro drops the end tag of an empty element it doesn't know, which the browser reads as an unclosed start tag, so `SelectButton` renders `<selectedcontent>` through a variable tag (`const SelectedContent = "selectedcontent"`), which keeps its end tag. Its React, Svelte and Vue files are written by hand (`scripts/hand-written-components.json`): React and Vue leave the element's content to the browser when they hydrate, and Svelte renders the element itself, where the compiler would write a `svelte:element`. `tests/unit/component-whitespace.test.ts` checks the rendered SelectButton for it, and `tests/unit/tooling-bugs.test.ts` says when Astro no longer needs it.

### Styling Inheritance

Components often share another component's styles (`Accordion` and `Dialog` look like a `Card`, `Menu` like a `List`, `Tooltip` positions like an `Anchor`). The shared stylesheet lists every root it styles (`card.css` targets `:where(.ui-accordion, .ui-card, .ui-dialog)`, and the header, content and footer of `:where(.ui-dialog, .ui-drawer)`, `list.css` `:where(.ui-list, .ui-menu)` and `anchor.css` `:where(.ui-anchor, .ui-tooltip)`), so a component renders only its own root class and the variant class it styles.

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

Use `class:list` in Astro, or `class={cx([...])}` with `cx` from `../cx` on a variable tag such as `Tag`, which `pnpm check-components` checks, `cx([...])` from `../cx` in React, a `class` array in Svelte, and a `:class` array in Vue. `pnpm build-components` writes a list of one entry that is no object and can't be `false` as the entry in every framework (`class={hideLabel ? "ui-sr-only" : "ui-label"}`, `classAttrs(className)`), and turns a list that can come out empty into a `classAttrs()` spread in Svelte and Vue, which print `class=""` otherwise; `tests/unit/component-contract.test.ts` fails on an empty class in any framework. Every library-owned class is prefixed with `ui-` (`pnpm check-components` checks the class lists); the public prop API stays unprefixed (`<Button size="small" variant="outlined">`) and the component interpolates the prefix when rendering.

Follow this order for readability:

1.  **Component Base Class**: The primary CSS class, prefixed (e.g., `"ui-button"`).
2.  **State Objects**: Boolean flags as quoted prefixed keys (e.g., `{ "ui-dot": dot }`).
3.  **Variant Props**: Interpolate the prefix from the prop value, and skip the default, which adds no class (e.g., `size && size !== "medium" && \`ui-${size}\``).
4.  **External Class**: Always include `className` (Astro, React and Svelte) or `$props.class` (Vue) at the end to allow for overrides. Do not prefix it.

Native states use native attributes, not classes: a disabled `<button>` gets `disabled`, and a disabled link loses its `href` and gets `role="link"` and `aria-disabled="true"`. The CSS matches a disabled control with `:disabled`, which also covers a control in a disabled fieldset, next to `[aria-disabled="true"]`, the variant an author manages: it looks the same, stays focusable and needs a script to block the change. Stylelint rejects state classes (`opui/state-classes`) and the `[disabled]` attribute selector (`opui/disabled-pseudo`).

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
  - `filled` is a solid fill in the component's own color: the accent on actions (Button, ControlGroup, Tabs), a surface on fields, containers and tracks.
  - `tonal` is the tonal surface or palette tint.
  - `outlined` is drawn in the border color with no fill.
  - `elevated` is raised with a shadow.
  - `transparent` has no surface and no border at rest. A text button is `transparent`.
  - `plain` is the page surface with no border, and differs from `transparent` on a tinted parent.
  - `line` is an indicator with no track.
- **Every enum names its default:**
  - The default adds no class. It maps to `null` in `api.ts`, where it shows as the default.
  - The exceptions are `as` and `type`; `border`, `choice`, `color` and `severity`, where leaving the prop out means none; `trigger`, where leaving it out means always shown; and free strings.
- **One class shape per kind of value:**
  - A value of `variant`, `size`, `color`, `severity`, `side`, `orientation`, `density`, `shape` or `corner` renders `.ui-<value>` (`.ui-filled`, `.ui-block-start`).
  - A value of `align`, `overflow` or a component's own enum renders `.ui-<prop>-<value>`, so the class says which prop it belongs to (`.ui-align-end`, `.ui-overflow-scroll`, `.ui-backdrop-transparent`, `.ui-marker-animation-flip`).
  - The default renders nothing, in every framework and in HTML.
- **Booleans and enums:**
  - A modifier with one alternative is a boolean and renders the class of the same name (`round` gives `.ui-round`, `stickyHeader` gives `.ui-sticky-header`). `hideLabel` is the one exception and renders `.ui-sr-only`.
  - A boolean is off when it's left out, so its class is never the framework default. Its name says what turning it on does, never what it turns off: no `no`, `non`, `not` or `un` prefix, no `less` suffix, and no `hide` prefix except `hideLabel` (a Tooltip shows its arrow with `arrow`, not `hideArrow`). `.ui-not-rich-text` is the one exception, since it ends a `.ui-rich-text` scope from inside instead of turning off a feature of its own element.
  - When the usual case is the one people turn off, the modifier is an enum with the usual case as its named default (Carousel `buttons`: `inside`, `none`, `outside`).
  - A modifier with several values is an enum named after the concept.
  - `tests/unit/naming.test.ts` fails on a boolean and an enum for one concept. A component never has two booleans for one axis either (`overflow`, not `scrollable` and `shrink`).
- **One or many is the native `multiple`,** layout along an axis is `orientation` and overflow along it is `overflow`.
- **`align` has one default per part,** wherever the part appears: `tests/unit/align.test.ts` renders every part with an `align` option in every framework.
- **Text:**
  - The primary text of anything is `label`, a string prop with a slot of the same name for rich content. Secondary text is `description`. Never `headline`, `text` or `title`.
  - Item objects (`FileUploadItem`, `MenuItem`) use `label`, `value` and `description`, and a list of them is `items`.
  - The default slot is the main content, never the label. On a choice control (Checkbox, Radio, Switch, ToggleButton) the label is the main content, so there the default slot is the label and `label` is its string shorthand.
- **Accessible names:**
  - When the visible label can be hidden, the prop is `hideLabel`, which renders `.ui-sr-only` on the label.
  - A component with no visible text takes `aria-label` from the caller, and its types require it or `aria-labelledby` (`AvatarGroup`, `Carousel`). Apart from `label` and `hideLabel`, no prop supplies or hides a name.
  - An `Avatar` stands in for a person, so its `label` is the name: the `alt` of the photo, or `.ui-sr-only` text after `aria-hidden` letters. Without `label` it is decorative. Its link and button types require `label`, `aria-label` or `aria-labelledby`.
  - A group whose role depends on a prop warns in development without a name (`warnUnnamedGroup` in `../dev`, `ToggleGroup`), and a container with a title part names itself from it through context (`Dialog`, `Drawer`, and a `Fieldset` rendered as another element).
  - The name of a control the component generates inside one of its parts is `<part>Label`, such as `closeLabel` on `DrawerHeader`.
  - A boolean that adds that control starts with the same word: `closeButton` with `closeLabel` on `Callout`, `DialogHeader` and `DrawerHeader`, and `markers` with `markerLabel` on `Carousel`. `tests/unit/naming.test.ts` checks each part that lists both.
  - The icon of that control is the `<part>-icon` slot, such as `close-icon` on `DrawerHeader`, and replaces the default `svg`. `tests/unit/naming.test.ts` checks that it sits next to its `<part>Label`.
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
  - A slot has one name in all five frameworks, kebab-case in Astro and Vue (`start-text`) and camelCase in React and Svelte (`startText`). When a name clashes with a prop in one framework, the slot is renamed everywhere. The allowed names are listed in [src/component-api/AGENTS.md](../../../src/component-api/AGENTS.md#names).
  - The block regions of a container are parts, never slots: `.ui-header`, `.ui-content`, `.ui-actions` for buttons and `.ui-footer` for anything else at the end. Dialog and Drawer end in `.ui-footer`, where `.ui-actions` groups the buttons.
  - A part styled only under its root has a bare role class (`.ui-header`, `.ui-label`, `.ui-indicator`). A class that is also styled on its own, or shared by several roots, is a root class and carries the component name (`.ui-field`, `.ui-field-group`). `.ui-card-link` is the one exception, since `.ui-link` is the Link root.
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
- Ids and settings reach parts through context: `context.astro.ts` (with `createContext` from `../context.astro`), `context.svelte.js` (Svelte, with JSDoc types), `context.react.ts` (React, `"use client"`) and an `InjectionKey` in `context.vue.ts` (Vue). All four take their shape from the `Context` type in `types.ts`, and Vue provides it as a `reactive()` object. A folder with one of them has all four. `pnpm check-components` checks the four files, their imports and exports, that Vue provides a `reactive()` object, and that a React provider takes no object literal as its `value`. Ids are deterministic, so every framework renders the same markup on the server.

```astro
<Card variant="outlined">
  <CardHeader><h3>Title</h3></CardHeader>
  <CardContent>Text</CardContent>
  <CardActions align="end"><Button>Open</Button></CardActions>
</Card>
```

### Props and slots (form controls and small components)

Form controls (Field, Checkbox, Radio, Switch), ListItem, Chip, Badge and the like keep a prop and slot API. A text region takes a string prop as a shorthand and a named slot (Astro, Vue), snippet (Svelte) or `ReactNode` prop (React) for rich content.

```astro
---
import { trimEdges } from "../whitespace"

const labelSlot = Astro.slots.has("label")
  ? trimEdges(await Astro.slots.render("label"))
  : ""
const LabelTag = label || labelSlot ? "span" : Fragment
---

<div class="ui-component">
  <LabelTag class="ui-label">{label}<Fragment set:html={labelSlot} /></LabelTag>
</div>
```

Check that a named slot exists before rendering its wrapper. `tests/unit/component-whitespace.test.ts` checks the whitespace around every slot in the `api.ts` files, and `tests/unit/component-formatting.test.ts` that a component renders the same from its source formatted at printWidth 40 and 200.

---

## 5. Form & Input Patterns

### State belongs to the app

A component renders its props as HTML and wires up what the platform needs: ids, labels, ARIA, and the custom elements that make a native feature work without a framework. It keeps no state of its own, so it never holds, adopts, restores or corrects a value: no magic. A form control hands its checked state to the native element in the framework's own way (`bind:checked` or `bind:group` in Svelte, `v-model` in Vue, `checked` or `defaultChecked` with `onChange` in React and Solid) and behaves like that framework's native control bound the same way, before the page hydrates, after a change and after a form reset. A `Field` holds no control: the user writes their own `<input>`, `<select>` or `<textarea>` inside it and binds it themselves. A group with no native element for its value (Tabs, ToggleGroup, Rating) takes `value` and reports each choice like a set of native radios bound in that framework. Reading a prop to render is fine: Rating's checked star, the tab a `Tabs` value checks, Stepper's current step. Each framework's pair in `tests/apps/native/` renders every bound control next to the native one, for the cases in `tests/apps/native/cases.ts`: `tests/e2e/native.spec.ts` compares them on one page per framework in seconds, and `pnpm test:apps` in every app. Both fail where they differ. A new case is a row in `cases.ts` and a form in each of the eight files.

### Label Wrapping

Checkbox, Radio and Switch wrap their control in a `<label>` root, which makes the whole row the hit area and names the control.

### Field Labels

Field and OneTimeCode render a `<div>` root with a `<label class="ui-label" for>` inside, around a control the user writes in the default slot. The required `for` prop (`htmlFor` in React) is the control's `id`, which the user sets on it, so the component never generates one. The label alone names the control, so a button can go in `.ui-start` or `.ui-end` without sitting inside a `<label>` or joining the name. Inside `.ui-field-container` the parts come in the order they're drawn, `.ui-top`, `.ui-start`, the control, `.ui-end` and `.ui-bottom`, so Tab and screen readers reach them in that order without `reading-flow`.

```astro
<div
  class:list={[
    "ui-field",
    size && size !== "medium" && `ui-${size}`,
    className,
  ]}
  {...rest}
>
  {hasLabel && <label class="ui-label" for={htmlFor}>{label}</label>}
  <span class="ui-field-container">
    <slot />
  </span>
  {hasEndText && <span class="ui-end-text" id={endTextId}>
    {endText}
    <slot name="end-text" />
  </span>}
</div>
```

### End Text & ARIA

A component that renders its own control and a text that describes it gives the text a part id (see [Unique IDs](#unique-ids)) and points the control's `aria-describedby` at it, like the description of `FileUpload`. Checkbox, Radio and Switch are the exception while their `<label>` root wraps the control: the label names it and already includes the end text, so they don't link it. A Field or OneTimeCode doesn't own the control, so it never sets `aria-describedby`: it names each part it shows after `for` (`${for}-start-text`, `-top`, `-start`, `-end`, `-bottom` and `-end-text`), and the user lists the ones the field shows in that order in the `aria-describedby` of their control, so a unit, a hint or an error is read after the name in any word order. A `.ui-start` or `.ui-end` that only holds buttons stays out of the list. The `for` row of `src/component-api/field/api.ts` and `src/docs/components/field.astro` tell the user so.

```astro
---
const { description, id } = Astro.props
const ids = createIds(Astro.locals, "file-upload", id)
const inputId = ids()
const descriptionId = description ? ids("description") : undefined
---

<input aria-describedby={descriptionId} id={inputId} type="file" />
{description && <span class="ui-description" id={descriptionId}>
  {description}
</span>}
```

In Svelte, render a text region that takes a string or a snippet with the shared `content` snippet: `import { content } from "../content.svelte"`, then `{@render content(endText)}`.

### Input Attribute Mapping

Native input attributes (`disabled`, `name`, `value`, …) come from the framework type, such as `HTMLAttributes<"input">`, and reach the input through `...rest`, so don't destructure and re-pass them. Destructure only the attributes the component merges, spread `...rest` first, then set the merged values so they win.

```astro
<CheckboxInput {...rest} aria-invalid={error ? "true" : ariaInvalid} />
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
  <FieldLegend>Account</FieldLegend>
  <FieldDescription>Enter your preferred username.</FieldDescription>
  <FieldGroup>
    <Field for="username" label="Username">
      <input id="username" placeholder="e.g. jdoe" />
    </Field>
  </FieldGroup>
</Fieldset>

<!-- ❌ Incorrect - Field directly after FieldDescription -->
<Fieldset>
  <FieldLegend>Account</FieldLegend>
  <FieldDescription>Enter your preferred username.</FieldDescription>
  <Field for="username" label="Username">
    <input id="username" placeholder="e.g. jdoe" />
  </Field>
</Fieldset>
```

---

## 6. Identification & Accessibility

### Unique IDs

Always use `createId(Astro.locals)` from `../id` for IDs in Astro. It falls back to random IDs when no middleware sets `Astro.locals.$id`. In React and Vue, use `useId()`, and in Svelte, `$props.id()`. This ensures stability across server and client rendering and prevents ID collisions when multiple instances of the same component are on a page. Only generate an id for elements the component links itself; don't generate an input `id` the user didn't pass.

A component with several linked parts takes one base per instance, the `id` the user passed or one generated id, and names each part after it: `${base}-description`, `${base}-legend`, `${base}-title`. A Field or OneTimeCode names its parts after `for`, the control's own `id`, instead. In Astro, `createIds(Astro.locals, prefix, id)` from `../id` returns that function and asks `$id` for the base at most once; in React, Svelte and Vue the base is `` id ?? `${prefix}-${uid}` ``. `tests/unit/component-ids.test.ts` checks it in every framework.

```astro
---
const $id = createId(Astro.locals)
const groupName = name || $id("tabs") // Prefer the passed value if available
---
```

### Default Icons

A part renders the default icon, so users can leave it out or put their own `svg` in its place, and a theme swaps every default by setting the `--ui-icon-*` tokens. `tests/unit/build-icons.test.ts` fails on a component that renders an `svg` with shapes, and says what to render instead. The stylesheet paints only an `:empty` `svg`, so a slotted one keeps its shapes, in `currentColor`, with a system color in forced colors and `print-color-adjust: exact`, since a mask is a background. A component whose markup is another component's leaves the painting to that stylesheet: a toast is a `Callout`, so `toaster.css` draws no icon.

```css
&:is(.ui-critical, .ui-info, .ui-success, .ui-warning) > svg:empty {
  background-color: currentColor;
  mask: var(--_icon-image) center / contain no-repeat;

  @media (forced-colors: active) {
    background-color: CanvasText;
  }

  @media print {
    print-color-adjust: exact;
  }
}
```

---

## 7. Data-Driven Components

For repetitive structures (Menu, Stepper, Timeline), prefer an `items` prop alongside standard slots.

```astro
---
type Item = { disabled?: boolean; label: string }
type Props = { items?: Item[] }
---

<menu>
  {items?.map((item) => <li>
    <button disabled={item.disabled} type="button">{item.label}</button>
  </li>)}
  <slot />
  <!-- Still allow manual entries -->
</menu>
```

---

## 8. Development Workflow

1.  **Read the Spec**: Open `src/docs/components/[name].astro` to see required HTML and CSS classes, and the examples in `src/component-examples/[name]/` (`.html`, `.astro`, `.react.tsx`, `.svelte` and `.vue` per example, written from the `.astro` one by `pnpm build-examples`). `src/pages/[framework]/components/[component].astro` is the route shell that renders every docs page for each framework.
2.  **Analyze the API**: Check `src/component-api/[name]/api.ts` for the documented props, slots and classes (see `src/component-api/AGENTS.md`). `[component-api]` problems in `pnpm test` and the build list what it's missing.
3.  **Implement**: Write the Astro file, `types.ts` and `types.astro.ts` first, following the checklist in Section 0, then run `pnpm build-components`: it compiles the React, Solid, Svelte and Vue files and the framework type files, or names the construct it can't compile. For a component in `scripts/hand-written-components.json`, `/port-component <Name>` (`.claude/skills/port-component/SKILL.md`) writes or updates the three files and loops on the component tests.
4.  **Verify**: Run `pnpm exec vitest run tests/unit/component-contract.test.ts tests/unit/parity.test.ts -t <Name>`, then check the rendered pages at `/html/components/[name]`, `/astro/components/[name]`, `/react/components/[name]`, `/svelte/components/[name]` and `/vue/components/[name]`, and the fixture pages at `/[framework]/test/[name]`, which only exist with `OPUI_TEST_PAGES=1` (`OPUI_TEST_PAGES=1 pnpm dev`, or `pnpm test:e2e:serve`).

---

## 9. Tokens, Forced Colors and More Contrast

### Read roles, never primitives

Component CSS reads `--ui-*` role tokens and its own `--_*` properties, and `pnpm check-css-vars` fails on a palette step, an Open Props primitive or a literal `px`, `rem` or other absolute length, with what to read instead. A `--_*` input documented in `src/component-api/custom-properties/` may default to a length in its `:where()` rule, such as a Drawer's size, because it is the knob to change it; modifiers such as `.ui-large` set it from roles. When a component has a job an existing role names, it reads that role: `--ui-control-border-color` for the border of an unfilled control, `--ui-field-border-color` for a field's border and for any other edge that needs 3:1 to show an extent or a state (the `Progress` track, a `Stepper` marker), `--ui-control-border-color-filled` for a filled one, `--ui-selected` and `--ui-on-selected` for the fill of a selected item, `--ui-selected-strong` and `--ui-on-selected-strong` for the mark that has to stand out on its own (a current marker, the bar of a selected row, a filled selected tab, the done part of a progress bar or track), `--ui-primary-text`, `--ui-critical-text` and the other intent `-text` roles for colored text outside a severity scope, `oklch(from <intent> min(l, var(--ui-accent-fill-max-lightness)) c h)` for an intent fill under `--ui-on-fill` text (its border keeps the intent color, and a checked mark, which needs 3:1, keeps the limit in `choice.css`), `--ui-surface-tonal-hover` for a hovered tonal surface, `--ui-disabled-opacity` for every disabled control plus `--ui-text-disabled` for the label of a control without a fill (text and outlined buttons, outlined chips, toggle buttons), `--ui-underline-*` for underlines, `--ui-choice-accent` for a checked mark, `--ui-track-bg-color` for an empty track, `--ui-shadow-control` for a control's shadow, `--ui-shadow-overlay` for a floating surface, `--ui-radius-small` for a small part, `--ui-font-size-caption` and `--ui-font-size-small` for small text, `--ui-space-N` for every gap and padding, and the `--ui-palette-*` roles for the shades of the current palette inside a severity scope. A new token is named by its role, not the component, is declared in `theme.css` with today's value, or optional with today's value as the fallback at every read site, has an `--ui-on-*` pair when it is a fill, and gets a description in `src/utils/theme-token-descriptions.ts`, a promise in `src/utils/theme-token-promises.ts` when it guarantees contrast, a CHANGELOG entry and a What's new note.

### Declared, optional and hook tokens

Every theme token is one of three kinds, and `tests/unit/theme-tokens.test.ts` checks the reads:

- A declared token has a value in `theme.css` and is read without a fallback. Knobs and derived roles are declared.
- An optional token is a commented-out line in `theme.css` with its example value, read with a fallback, and every read site uses the same fallback (`--ui-button-radius` falls back to `--ui-radius` everywhere). Most component tokens are optional, so a theme that doesn't set them costs nothing.
- A hook is an optional role that several components read, each with a default of its own, so one theme value unifies them: `--ui-selected`, `--ui-on-selected`, `--ui-control-accent`, `--ui-control-on-accent`, `--ui-choice-accent`, `--ui-track-bg-color`, `--ui-control-border-color`, `--ui-control-border-color-filled`, `--ui-border-color-raised` and `--ui-menu-radius`. `--ui-control-accent` and `--ui-control-on-accent` are the accent every control shares: `Button` and `ControlGroup` read them before `--ui-palette-strong`, `Choice` and a range field before `--ui-primary`, and each component's own `--ui-button-accent` or `--ui-choice-accent` still comes first. The list is `OVERRIDE_HOOKS` in `src/utils/theme-tokens.ts`, and a token joins it only when its read sites need different defaults; a second read of an optional token with a new fallback is a hook or a bug, never a third kind.

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
- Component tokens start with the component and end like the `--_*` properties: `-bg-color`, `-text-color`, `-border-color`, `-size`, `-radius`, `-gap`, `-shadow` or `-padding` (`--ui-code-block-bg-color`, `--ui-choice-ripple-bg-color`, `--ui-button-padding-inline`), or a value named by the CSS property it sets or by its type: `-font-size`, `-font-weight`, `-line-height`, `-margin-block-start`, `-position-area`, `-blur`, `-offset`, `-translate`, or a keyword like `-hover`, `-focus` or `-checked` (`--ui-field-label-font-weight`, `--ui-rich-text-heading-margin-block-start`, `--ui-backdrop-blur`, `--ui-button-hover`). The rich text tokens start with `rich-text`, after `.ui-rich-text`. A role name carries no suffix (`-accent`, `-on-accent`), a knob ends in `-strength` or `-lightness`, and a size suffix (`-small`, `-large`) or context (`-filled`, `-on-raised`) comes after. A color is never a bare `-color`. `-size` is the one word for an extent, and `-width` only names a border or outline thickness. Sizes are logical (`-inline-size`, `-block-size`). `tests/unit/css-properties.test.ts` enforces the list.

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
- A line that stands in for a border keeps the border name even when a background draws it: the `Stepper` line, a background for its round caps, is `--_line-border-color`, like the `Timeline` line, and the `Divider` line is `--_divider-border-color`, like the dividers in `Accordion`, `List` and `Menu`.

`tests/unit/css-properties.test.ts` fails, with no allowlist, on the names these rules ban (`-border-radius`, `-height` and `-width` except a border or outline width, `-space`, `-tx`, `-ty`, `-dir`, `--_input-size` and a bare `-color`) in every `--_*` property and component token, and on a component token that doesn't end in one of the suffixes above.

### Forced colors

Windows High Contrast (`forced-colors: active`) repaints everything with system colors and drops backgrounds and shadows. A component needs a `@media (forced-colors: active)` block only where a boundary or a state is carried by color alone: a shadow-only edge, a tinted selected state, a filled track. Borders are forced to `CanvasText` by the browser and need nothing, and Chromium forces a `transparent` border color like any other. `tests/unit/forced-colors.test.ts` checks both lists against the stylesheets that contain the media query. The components with a block, and why:

- `Accordion`: the default marker is a mask in `currentColor`, so it keeps the summary's forced text color with `forced-color-adjust: none`. Every variant border is real, including the elevated and tonal edge, which the browser forces to `CanvasText`.
- `Avatar`: a letter avatar is a fill, so it gets a `CanvasText` border.
- `Button`: the current page (`aria-current="page"`) is a tint, or a dropped fill on a filled button, so it gets `SelectedItem`, and `aria-disabled="true"` only dims the text or the fill, so it gets the `GrayText` the browser gives a native disabled button.
- `Callout`: every boundary is a real border, but the default severity and close icons are masks, so they get `CanvasText` and `ButtonText`.
- `Card`: the hovered card-link border only changes color, so it gets `Highlight`, and the default close icon of a `Dialog` or `Drawer` header is a mask, so it gets `ButtonText`.
- `Carousel`: the scroll markers are fills, so they get a `ButtonText` outline and `SelectedItem` for the current one, and the scroll buttons draw their icon in the inverse of their face from stacked backgrounds, so they keep it on `Canvas` with a `ButtonText` border and `forced-color-adjust: none`.
- `Checkbox`, `Radio`, `Switch` and `Choice` (their shared root): the checked mark, the switch track and the checked `.ui-card` border are tints, so they get `SelectedItem`, `SelectedItemText` and `CanvasText`, and the invalid state is a color, so an invalid input, switch track or card gets a dashed border.
- `Chip`: the severity dot and the selected state are fills, so they get `CanvasText` and `SelectedItem`, and the dot on a pressed chip `SelectedItemText`, like its label. `aria-disabled="true"` gets `GrayText`, like `Button`.
- `ControlGroup`: the edges between controls are real borders, but a link button's would be `LinkText`, so every button gets a `ButtonBorder` border and the edges are one color.
- `Field`, the `.ui-field` styles every field shares: the field border is real, but the focus outline gets `Highlight`, an invalid field, whose red border is forced away, a dashed border, and the mask chevron of an input with a `list` and the default icons of `PasswordToggle` `ButtonText`. `range.css`, `select.css`, `step-button.css` and `textarea.css` build on it.
- `FileUpload`: the drag-over highlight is a tint, so the drop zone's border, which also turns from dashed to solid, gets `Highlight`, the default plus and remove icons are masks, so they get `CanvasText` and `ButtonText`, and the mark on a failed preview in the compact row is a mask on a tint, so it gets `ButtonText` on `Canvas`.
- `List`: selected and current items are tints, so they get `SelectedItem`, and the check of a `Menu`, listbox or select option is a mask, so it gets their `SelectedItemText`.
- `Message`: the bubble is a fill, so it gets a `CanvasText` border, and the typing dots keep `CanvasText`.
- `Meter`: the fill is a background on the browser's value pseudo-elements, so they get `SelectedItem`, written on them so that a page's own `--_accent` can't take its place. `progress.css` outlines the track in `CanvasText`.
- `OneTimeCode`: the boxes and the ring are masks, so they get `CanvasText`, `GrayText` when disabled and `Highlight` with focus, and the field has no border for the dashed invalid border of `.ui-field`, so an invalid code gets a dashed outline.
- `Progress`: the filled track, so it gets `SelectedItem`, written on the fill so that a page's own `--_accent` can't take its place, and a `CanvasText` outline, and the ring of `.ui-round` is a gradient, so it keeps `SelectedItem` and `GrayText` with `forced-color-adjust: none`.
- `Range`, the range input of a `.ui-field`: the track and its fill are backgrounds, so they get `CanvasText` and `SelectedItem`, and the invalid state is a color, so an invalid thumb gets a dashed border.
- `Rating`: the stars are masks over backgrounds, so filled stars get `SelectedItem` on the input and `CanvasText` on the meter, empty stars `GrayText` and the clear icon `ButtonText`, and the invalid state is a color, so the stars of an invalid input get a dashed border.
- `Reactions`: a checked reaction is a tint, so it gets `SelectedItem`. The unused quick reaction differs by its dashed border style, which the browser keeps.
- `Select`, the select of a `.ui-field`: the picker chevron is a mask, so it gets `ButtonText`, and the check of the selected option `SelectedItemText`.
- `SortableTable`: the sort arrow is a mask, so it gets `ButtonText`.
- `Spinner`: a `CanvasText` ring with `forced-color-adjust: none`, so its transparent segment is kept and the spin stays visible.
- `StepButton`: the default icons are masks, so they get `ButtonText`. `field.css` and `button.css` cover the field and the buttons.
- `Stepper`: complete and error markers and the line after a complete step are fills, so they get `CanvasText`, the current marker `Highlight` and the line to a later step `GrayText`.
- `Tabs`: the selected tab is a tint, so it gets `SelectedItem` and a `CanvasText` border, and its focus ring, where it's drawn inside the fill, `SelectedItemText`.
- `Timeline`: colored and current markers are fills, so they get `CanvasText`, and the current marker and the tracked line `Highlight`.
- `ToggleButton`: the checked state is a tint, so it gets `SelectedItem`.
- `ToggleGroup`: the dividers are column and row rules, which the browser forces to `CanvasText`, but browsers without gap decorations draw them as shadows, which forced colors drops, so the block gives each button `CanvasText` borders, which `css/compat/toggle-group.css` sets to a border width there.
- `Tooltip`: the surface and the arrow are fills, so they get a `CanvasText` border and arrow.
- `Typography`: the `.ui-swatch` legend dot is a fill, so it keeps a `CanvasText` fill with `forced-color-adjust: none`. Text and underlines are forced by the browser, and code blocks lose their fill and keep their text.

The components without a block, and why:

- `Anchor`, `Copy`, `SelectAll`: layout only, no boundary or state of their own. The `Copy` label is a bordered surface, which the browser forces to `CanvasText`, next to its announcement.
- `DescriptionList`, `Divider`, `Form`, `Layout`: the browser forces their lines and colors itself. The `DescriptionList` leaders and total line and the `Divider` line are real borders and the `Layout` `.ui-bordered` lines are column and row rules, all forced to `CanvasText`. The invalid end text of a `Form` fieldset loses its color, while the invalid controls inside keep their dashed border.
- `Badge`, `Dialog`, `Drawer`, `Menu`, `Table`: every boundary is a real border, which the browser forces to `CanvasText`.
- `Toaster`: every toast is a `Callout`, and `callout.css` has the block for its border and its severity and close icons.
- `Link`: text and underlines, forced to `LinkText` and `CanvasText`.
- `Stat`: text only, no boundary or state.
- `Textarea`, the textarea of a `.ui-field`: `textarea.css` only sizes the control; `field.css` has the block.

When a component gains a shadow-only edge or a color-only state, it gets a block and this list is updated.

### More contrast

`theme.css` sets no color for more contrast. It tightens the knobs the roles are derived from (the `--ui-*-strength-*` mixes, the `*-max-lightness`, `*-min-lightness` and `*-max-chroma` limits, `--ui-focus-ring-width`) on `html` under `prefers-contrast: more` and on `.ui-contrast-more`, which is a scope, and every role follows. A component only adds its own `@container style(--ui-contrast: more)` block, or an `if()` value (Switch values and `if()` below), when the shape changes (an outline added, a translucent fill made solid) or to swap a private property to another role. It never re-tunes numbers: a limit it needs is a knob in `theme.css`, set in both contrast rules. A role that has to get stronger with more contrast is a formula of a knob, never a second value in a contrast block.

### Switch values and `if()`

`if()` reads a switch token (`--ui-contrast`, `--ui-motion`) on the element itself, so it also sees a value the element sets, which `@container style()` can't:

- One declaration of a standard property that swaps on the switch is an `if(style(…): …; else: …)` value: `scroll-behavior` on `html` and the `Carousel`, the `Spinner` opacity. A browser without `if()` drops the declaration, so the compat layer holds the style query it replaced, behind `@supports not (inline-size: if(else: 0px))`. `html` has no container to query and `normalize.css` no compat file, so its fallback sits next to the declaration and follows `prefers-reduced-motion` and the motion classes.
- Several declarations, a nested rule or a query that also reads a size stay a `@container style()` block.
- A custom property takes `if()` only where the value has to follow a token set on the element itself, like the `ControlGroup` dividers. A browser without `if()` can't drop it: it is invalid wherever it is read, so it needs its compat rule too. A swap that a `@container style()` block can do stays one.

---

## 10. Stylesheets and Layers

`css/components.css` imports every component stylesheet in one of three groups, named by the layer the files declare, and `tests/unit/layers.test.ts` checks each file against its group:

- **Root components** declare `components.root`: base rules shared by several roots (`card.css` for `.ui-accordion`, `.ui-card` and `.ui-dialog`, and the parts of `.ui-dialog` and `.ui-drawer`, `anchor.css` for `.ui-anchor` and `.ui-tooltip`, `choice.css` for the checkbox, radio and switch) and per-component rules, none of which has to beat another component's rules on the same element. `typography.css` also declares `components.prose`, the classless rich text below every component.
- **Extended components** declare `components.extended` for the rules that must beat another component's rules on the same element (a `Dialog` on top of `card.css`, a `Tooltip` on top of `anchor.css`, a `Menu` or a field's select over `list.css` and `field.css`), and `components.root` for rules that must not (the dense `List` sizes for a `Checkbox`, which an explicit size class on the checkbox has to beat).
- **Utilities** declare `utils`: `layout.css`, whose classes beat every component, like `core/utils.css`.

A new stylesheet goes in the group of the layer it declares, and a file that needs a layer its group doesn't allow moves group instead of opening the layer. `tests/unit/layers.test.ts` also checks the import order within a group, including `BUILDS_ON`, the stylesheets that must follow the one they extend.

---

## 11. Motion

A hover, pressed, checked or selected change that recolors or moves a control transitions, over a `--_*duration` the component scales by `--_motion` (Stylelint's `opui/motion-duration`) and with its `--_ease`, so it matches `Button` next to it. A control a click or tap turns on and off (`Checkbox`, `Radio`, `Switch`) is the exception: it changes at once both ways, so a click never looks unheard, and only its hover halo and focus ring animate. Rows you sweep the pointer across (`List`, `Menu` and `Table` rows, select options) change at once on hover, with `transition-duration: 0s` in the `:hover` rule, and fade back over `--ui-duration-fast`, so a menu never lags behind the pointer. A change of the line itself (`text-decoration-line`, a `text-decoration-thickness` from `auto`) can't interpolate and stays a jump. Movement a theme may make springy (an indicator, a press, an overlay opening) reads `var(--ui-ease-move, var(--_ease))`, and nothing closing does: an overlay sets a private `--_ease-move` to it only in its open state. A press reads `scale: var(--ui-press-scale, none)`, except in a group.
