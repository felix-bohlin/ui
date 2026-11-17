---
name: port-component
description: Writes or updates by hand the React, Solid, Svelte and Vue files of a component that scripts/build-components.mjs refuses, listed in scripts/hand-written-components.json, and loops on the component tests until every framework renders the same markup. Use when the compiler refuses a component and the construct is not worth supporting, when a ledgered component's .astro file or types change, or when the user asks to port, sync or mirror such a component. Every other component is compiled by pnpm build-components.
argument-hint: "<Component>…"
---

# Port a component

Astro is the source of truth for a component's markup. `pnpm build-components` compiles the React, Solid, Svelte and Vue files from it, so a port is written by hand only for a file in `scripts/hand-written-components.json`: one the compiler refuses with a reason the ledger records, or one that carries behavior the Astro file doesn't express. Before porting, try the compiler: when it refuses a construct that other components would use too, support it in `scripts/build-components.mjs` instead. Otherwise list the file in the ledger with the reason and commit with the `Ledger-Change: intended` trailer. The loop is then: write the port, run the component tests, fix what they name, repeat until green.

## Read first

- `packages/opui/components/AGENTS.md`: the checklist in section 0, the frontmatter layouts in section 1 and the slot, id and class rules the ports follow.
- `packages/opui/components/<Component>/<Component>.astro` and the five type files next to it.
- `src/component-api/<slug>/api.ts`: the props, slots and parts the ports must expose.
- The four files of the closest sibling as the reference for idioms: a form control for a form control (`TextField`), a container part for a part (`Card`, `CardActions`), a wrapper for a wrapper (`Divider`).

## Steps

1. **Types.** Shared props in `types.ts`; `types.astro.ts`, `types.react.ts`, `types.svelte.ts` and `types.vue-props.ts` as section 1 lays them out. A slot becomes a `ReactNode` prop in React, a `Snippet` in Svelte and a `Slots` entry in Vue, named by `slotProp()` in `src/component-api/frameworks.ts` (`end-text` is `endText`).
2. **Ports.** Write `<Component>.react.tsx`, `<Component>.solid.tsx`, `<Component>.svelte` and `<Component>.vue`, mirroring the Astro file element for element: same tag, same class list in the same order, same attributes, slots in the same places. Where Astro trims a slot with `trimEdges()`, Vue uses `<TrimmedSlot>` and React and Svelte need nothing. Where Astro uses `createIds()`, the base is `` id ?? `${prefix}-${uid}` `` with `useId()` or `$props.id()`. Export the component and its props type from the four barrels in `packages/opui/{astro,react,svelte,vue}/index.ts`, sorted.
3. **Loop until green.** Run

   ```sh
   pnpm exec vitest run tests/unit/component-contract.test.ts tests/unit/component-whitespace.test.ts tests/unit/component-ids.test.ts tests/unit/component-formatting.test.ts -t "<Component>"
   ```

   Every failure names the component, the prop value or slot, and the framework, and prints the framework's markup against Astro's with `␣` for a space that renders. Read the diff, change the file it points at, rerun. Common diffs and their fixes:
   - A `␣` one side lacks: a line break between inline siblings in that source. Put the siblings on one line, or trim the slot edge (`trimEdges()` in Astro, `<TrimmedSlot>` in Vue).
   - A class present on one side: the class list of section 3, in Astro's order.
   - An id or `aria-*` reference that differs beyond its uid: the `createIds()` base-and-part pattern of section 6.
   - An attribute one side lacks: `...rest` on the wrong element, or a prop the types don't declare in that framework.
   - Astro is the odd one out: fix the Astro file. The other three then stay as they are.

   The step is done when the command passes with no skipped component.

4. **Structure.** `pnpm check-components` checks the file set, the destructuring order, the class lists, the barrels and the context files. `pnpm exec vitest run tests/unit/component-api.test.ts` checks that every prop and slot is in `api.ts`.
5. **Record.** A user-facing change gets its CHANGELOG entry and What's new note as the root `AGENTS.md` says. Then `pnpm check`.

## Report

For each component: which files changed, what the tests found and how each finding was fixed, and the final test command's result. A difference left in place is named with its reason.
