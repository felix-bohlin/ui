# Compiler output census: handover

Status: paused on 19 November 2026, when the compiler was being changed by hand. This file carries over what the census found and had not yet filed in `TODO.md`, so a new session can pick it up. Delete it once every finding below is filed, fixed or dropped.

## What the census was

An evaluation of what `scripts/build-components.mjs` writes for React, Solid, Svelte and Vue, plus the runtime helpers and the compiled type files, for idiom, runtime cost and bugs. The conventions in `packages/opui/components/AGENTS.md` were on trial too. It ran in two stages.

- Stage 1, done and filed: one reviewer per emitter listed every construct it can write and judged it against the installed framework's own source, and a throwaway probe mounted every component in Chromium in all four frameworks, changed one prop or slot at a time (about 15,000 changes) and compared the result with a fresh render. Its findings are in `TODO.md`: 26 open items whose `Fix:` note says "census", "update probe" or "reviewer", one item on the empty `style` attribute React leaves, and two fixed items (the Vue Copy, SortableTable and Toaster attributes, and the Vue Rating `mergeProps()` copy).
- Stage 2, done and not filed: eight reviewers wrote a component from its Astro source alone, without reading the compiled files, then compared and measured: TextField, Checkbox, Tabs, Menu, Rating and Select in all four frameworks, ToggleGroup with ToggleButton and ListItem with Accordion in Solid only. Their findings are the list below.

## Read this before using anything here

Every finding was true of the code at commit `08a80fec5`. Since then the branch gained more than 100 commits that rework the reader, the model kinds, the Vue emitter and `vue.ts`. So:

- Treat each finding as a claim to check against the current code, not as a fact. Several are probably fixed, and some will have moved to another file.
- The line numbers the reviewers cited are left out on purpose. File names may be stale too.
- The 27 stage 1 items in `TODO.md` need the same check. Resolve the ones the compiler changes fixed with `node scripts/todo.mjs resolve`.
- Each scenario below says how it was checked at the time: run in Chromium, run on a test renderer or in jsdom, or reasoned from the framework's source. Only the first kind was seen in a browser.

## How to check a finding

`tests/e2e/models.spec.ts` and its fixtures (`src/fixtures/models.*`, at `/dev/fixtures/<framework>-models/`) are the place for most of these: each scenario is "mount, let the user do something, change a prop or reset the form, read the control". A scenario that fails there is the test the finding needs anyway.

The stage 1 probe was a page under `src/pages/dev/` that imported every component with `import.meta.glob`, mounted one in React, Solid, Svelte or Vue from a props object, and exposed `set(nextProps)`, driven by a Playwright script. Three things it got wrong at first are worth keeping if it is rebuilt as an e2e spec, which one of the open `TODO.md` items asks for:

- Keep the set of prop keys fixed and also add a key after mount. A fixed set hid the Vue attrs bug; a growing set finds it.
- Pass the model key as present but `undefined`, the way a spread passes it. Leaving the key out hid the Svelte entry loss.
- Let the user type or click between two prop changes. Without that step the Solid control that writes its prop back once goes unseen.

## What held up

Not everything was a problem, and this is as useful as the findings:

- The probe found no stale value in any compiled file: every prop or slot change ended in the same DOM as a fresh render.
- A hand-written port was within about 5% of the compiled file in minified, gzipped bytes almost everywhere (Menu, TextField, Tabs, Checkbox, ListItem and Accordion in React, Solid and Svelte). The exceptions were Vue, about 10% larger from declaring `class` as a prop on every component, and the Vue CheckboxInput, 29% larger.
- Where a blind port and the compiled file differed in behavior, the compiled file was more often right: the form reset default and the server `defaultValue` in Svelte, `styleAttrs()` and `TrimmedSlot` in Vue, `cx()` on a class list that can be empty in Solid, `defined(rest)` protecting a fixed `type`.
- `TrimmedSlot` in Vue is not a leftover, which one filed item says it may be: without it a multi-line label slot renders with a space at each edge. Two blind ports confirmed it. Correct that item.

## Stage 2 findings, not yet filed

They are written as `TODO.md` items would be, most severe first within each section. The JSON they were drafted from is not in the repo, so rebuild it from this list before running `node scripts/todo.mjs add`.

### Bugs

- (5) Checkbox: in Vue, a form reset leaves a checkbox group wrong, in the boxes and in the model. Each input registers its own `reset` listener with its own timer, so the inputs are followed one task at a time, and after the first one assigns the model Vue writes `checked` from that half-updated array onto the other boxes, undoing the browser's reset (`packages/opui/components/vue.ts`, `packages/opui/components/Checkbox/CheckboxInput.vue`, `scripts/component-models.mjs`)
  - Summary: In Vue, resetting a form with a checkbox group leaves some boxes and the bound array in the wrong state.
  - Recommended: Fix. The blind port verified a fix that follows every input of one reset in the same task.
  - Fix: found by the Checkbox blind port and run by it in Chromium, hydrated and client-rendered; the listener code matches its explanation. Three boxes `x`, `y`, `z` with `v-model="group"` and `group = ref(["x", "y"])` in a form: uncheck X and Y, press Reset, and X is checked, Y unchecked and the model `["x"]`. Or check Z, uncheck X, Reset: Z stays checked and the model is `["y", "z", "x"]`. SwitchInput uses the same directive with an array model (reasoned, not run). The repo's unchanged components against the patched helper give `["x", "y"]` and the right boxes in both scenarios. Add a reset with two changed boxes to `tests/e2e/models.spec.ts`: `example-state.spec.ts` only sees it when an example changes two boxes of a bound group.
    ```ts
    // before
    const listener = (event: Event) =>
      setTimeout(() => {
        if (!event.defaultPrevented) followReset(field)
      })
    // after: one task per reset event
    const resetting = new WeakMap<Event, Field[]>()
    const listener = (event: Event) => {
      let fields = resetting.get(event)
      if (!fields) {
        const queue: Field[] = []
        fields = queue
        resetting.set(event, queue)
        setTimeout(() => {
          if (!event.defaultPrevented) queue.forEach(followReset)
        })
      }
      fields.push(field)
    }
    ```
- (4) Checkbox: in Svelte, every form reset appends duplicates to a bound `group`. On a reset Svelte calls the binding's setter for each bound input with its default, and `toggleInGroup` adds a value without checking that the group already holds it (`packages/opui/components/group.ts`, `packages/opui/components/Checkbox/CheckboxInput.svelte`, `packages/opui/components/Switch/SwitchInput.svelte`, `scripts/component-models.mjs`)
  - Summary: In Svelte, resetting a form doubles the values in a checkbox group's bound array each time.
  - Recommended: Fix. The guard is one line in a shared helper.
  - Fix: found by the Checkbox blind port and run by it in Chromium, hydrated and client-rendered; `group.ts` has no membership check, and Svelte 5.57 passes `input.defaultChecked` to the setter on a reset. Three boxes with `bind:group` and `group = $state(["x", "y"])`: Reset on an untouched form gives `["x", "y", "x", "y"]`, a second Reset six entries, and unchecking X then leaves `["y", "y", "y"]`. The boxes stay right, so `example-state.spec.ts` cannot see it. SwitchInput has the same compiled lines (not run). The repo's unchanged Svelte files keep `["x", "y"]` through two resets with the guard. Add a unit test for the helper and the scenario to `tests/e2e/models.spec.ts`.
    ```ts
    // before
    export const toggleInGroup = <T>(group: T[], value: T, on: boolean) =>
      on ? [...group, value] : group.filter((item) => item !== value)
    // after
    export const toggleInGroup = <T>(group: T[], value: T, on: boolean) =>
      group.includes(value) === on
        ? group
        : on
          ? [...group, value]
          : group.filter((item) => item !== value)
    ```
- (4) Select: in Svelte, a choice the user made in a server-rendered Select before the page hydrated is overwritten. The hand-written port seeds `value` from the items, so `bind:value` always mounts with a value and writes it into the server's select, where Svelte only reads the DOM when the value is `undefined`. React, Solid and Vue keep the choice (`packages/opui/components/Select/Select.svelte`, `packages/opui/components/vue.ts`, `tests/apps/apps.spec.ts`)
  - Summary: In SvelteKit, an option picked before the page finished loading jumps back to the starting one.
  - Recommended: Fix. Vue's port already has the check that tells an edited select from an untouched one.
  - Fix: found by the Select blind port and run by it in Chromium through a real `hydrate()`: server-render items A, B (selected) and C, set `select.value = "c"`, hydrate, and the select and the model are back on B, with or without `bind:value`. The app test's `CHANGES` list only changes `select/Variants`, which has child options and no value, the one case where `value` stays `undefined`: add `select/Preselected` and `select/Binding`. Move the edited check that `vue.ts` keeps privately into `Select/selection.ts`, and adopt the DOM's selection in an attachment written before `bind:value`, with `/port-component Select`.
    ```svelte
    const keepEdits = (select: HTMLSelectElement) => {
      if (seen) return
      seen = true
      if (!edited(select)) return
      const options = [...select.selectedOptions].map((option) => option.value)
      value = select.multiple ? options : options[0]
    }

    <select {...rest} {@attach keepEdits} bind:value>
    ```
- (4) Package: in Svelte, a form control loses what the user entered when its model prop is read again without a value: an unbound `$bindable()` prop the component wrote is a derived of the parent's getter, so `<TextField {...props} />` with `props` replaced by a new object, or `value={form.name}` while that is still `undefined`, puts the prop back to `undefined` and drops the entry. Solid and Vue keep it (`scripts/component-models.mjs`, `packages/opui/components/TextField/TextField.svelte`, `packages/opui/components/Checkbox/CheckboxInput.svelte`, `packages/opui/components/Select/Select.svelte`)
  - Summary: In Svelte, typed text or a ticked box is erased when the parent replaces the object it spreads onto the control.
  - Recommended: Fix with option A. It keeps the entry and leaves a bound value as it is.
  - Fix: found by the Select blind port and confirmed in Chromium on the compiled files: a TextField whose `value` key reads the parent's state and is `undefined`, type `Ada`, change `error` on the same object, and the input is empty; a Checkbox the user ticked is unticked the same way. With no `value` key at all the entry is kept, and Solid and Vue keep it in both cases. It affects the `value` and `checked` model kinds: Checkbox, CheckboxInput, NumberField, OneTimeCode, Range, Select, Switch, SwitchInput, TextField and Textarea. Add the scenario to `tests/e2e/models.spec.ts`, whose Svelte fixture passes explicit props today.
  - Options:
    - A (recommended): keep the entry in the component's own state and let the prop win when it has a value. A parent that binds and later sets the value to `undefined` then gets the last entry back, so clearing is `""`.
      ```ts
      // before
      const getValue = () => value ?? defaultValue
      const setValue = (next: typeof value) => {
        value = next
      }
      // after
      let entered = $state<typeof value>()
      const getValue = () => value ?? entered ?? defaultValue
      const setValue = (next: typeof value) => {
        entered = value = next
      }
      ```
    - B: leave it and say on the Svelte pages of the ten components that an uncontrolled control must not get its props from a spread of an object that is replaced.
- (4) Tabs, ToggleGroup: in Solid, a group with a controlled value puts its selection back through `restoreChecked`, which reads the value in a microtask and writes every input in the form that has the same name and type. So it unchecks same-named inputs outside the group, and while the caller's update is held by pending async work it reads the old value and undoes the click the user just made (`packages/opui/components/solid.ts`, `packages/opui/components/ToggleGroup/ToggleGroup.solid.tsx`, `packages/opui/components/Tabs/Tabs.solid.tsx`, `packages/opui/components/ToggleGroup/selection.ts`, `scripts/component-models.mjs`)
  - Summary: In Solid, a controlled toggle group can uncheck another group's boxes, and can flip a click back while data loads.
  - Recommended: Fix with option A. It removes the walk through the DOM, so neither case can happen.
  - Fix: found by the ToggleGroup blind port, run on the real Solid 2 client runtime in jsdom, not in a browser; the helper's code matches both explanations (it walks `input.form.elements`, where `checkedValues` in `ToggleGroup/selection.ts` stays inside `.ui-toggle-group`). Two `multiple` groups named `tags` with values `["a"]` and `["x"]`: click B in the first and X is unchecked while the second value is still `["x"]`; a plain checkbox named `tags` in the same form is unchecked too. For the second case, a value that feeds a `createMemo(async ...)` under `<Loading>`: click B, and A is checked again until the data arrives. Rating uses the same helper. A refused change must still snap back, which `tests/e2e/models.spec.ts` covers; add both cases to it.
  - Options:
    - A (recommended): tell the buttons through the signal graph, so the write is held with the caller's: the group keeps a signal it sets on every change, and each button writes its input from the group in an effect.
      ```ts
      // group
      const [selection, setSelection] = createSignal(
        untrack(() => props.defaultValue),
        { equals: false },
      )
      // in change: setSelection((own) => (own === undefined ? own : next))
      // context: get value() { const own = selection(); return props.value ?? own }

      // button
      const checked = () => grouped() ?? props.checked
      let last = untrack(checked)
      createRenderEffect(
        () => [checked(), grouped() !== undefined] as const,
        ([next, owned]) => {
          if (next !== undefined && (owned || next !== last))
            input.checked = next
          last = next
        },
        { defer: true },
      )
      ```
    - B: keep the walk and scope it to `input.closest(".ui-toggle-group")`, like `checkedValues`. It fixes the inputs outside the group and leaves the pending update case.
- (3) Package: in Solid and Svelte, a group or a radio model with a bound or controlled value is never told about a form reset: the inputs go back to the first choice, the value keeps the last one, and setting the value to that last choice again does nothing. Their `seedChecked` helpers run once, where Vue's listens for the form's `reset` (`packages/opui/components/svelte.ts`, `packages/opui/components/solid.ts`, `packages/opui/components/vue.ts`, `packages/opui/components/Rating/Rating.svelte`, `packages/opui/components/Tabs/TabsItem.svelte`)
  - Summary: In Solid and Svelte, resetting a form shows the first tab or star again while the bound value keeps the last pick.
  - Recommended: Fix with option A. One helper fixes Solid, Svelte and the React item on the same gap.
  - Fix: found by the Tabs, Rating and ToggleGroup blind ports and run in Chromium on the repo's files, client-rendered and hydrated: `<Tabs name="t" bind:value>` at `a`, click tab b, Reset: input a is checked and `value` is still `b`; the Solid group with `value` and `onValueChange` does the same, and so do a bound Svelte Rating (3, pick 5, reset: star 3 shown, `value` 5) and a Svelte Radio group. Vue gives `a`. The open item on React groups is the same gap. A second case holds in all four frameworks: after the item that was selected at first is removed, a reset leaves nothing selected while the value still names another item. Add both to `tests/e2e/models.spec.ts`.
  - Options:
    - A (recommended): one shared module with a single document listener, which each framework's seed helper registers its input with. The Tabs port ran it in React, Solid and Svelte. A form inside a shadow root is not seen, the same limit Svelte's own reset handling has.
      ```ts
      // components/reset.ts
      const followers = new WeakMap<Element, () => void>()
      let listening = false

      export const afterReset = (control: Element, follow: () => void) => {
        followers.set(control, follow)
        if (listening) return
        listening = true
        document.addEventListener("reset", (event) => {
          const form = event.target as HTMLFormElement
          setTimeout(() => {
            if (event.defaultPrevented) return
            for (const element of form.elements) followers.get(element)?.()
          })
        })
      }
      // svelte.ts, where the input is first seen
      afterReset(input, () => {
        if (input.checked && !isChecked()) check(input)
      })
      ```
    - B: a `reset` listener per input in each framework's helper, as `vue.ts` has, with the cleanup each needs.
    - C: in the Svelte Rating only, bind the radios with `bind:group` through an accessor object, which Svelte resets and seeds itself; Tabs, ToggleButton and Radio cross a component and still need A or B.
- (3) Select: after a form reset, the button of a customizable select still shows the option the user had picked, while the select's value is back at the starting one. Chromium does not refresh `<selectedcontent>` on a reset, in plain HTML and in all four frameworks (`packages/opui/components/Select/Select.astro`, `tests/e2e/example-state.spec.ts`, `tests/e2e/engine-bugs.ts`)
  - Summary: After a form reset a select shows the old option on its button, though its value has gone back.
  - Recommended: Fix with option A. It is an engine bug, and the repo's rule is to record those with a plain repro.
  - Fix: confirmed in Chromium 157 with plain HTML: `<form><select style="appearance: base-select"><button><selectedcontent></selectedcontent></button><div><option value="a">Apple</option><option value="b" selected>Banana</option><option value="c">Cherry</option></div></select></form>`, set the value to `c`, call `form.reset()`: `select.value` is `b` and `<selectedcontent>` still reads Cherry. `example-state.spec.ts` checks the value after a reset, never the text, and `tests/e2e/engine-bugs.ts` has no entry for it. Check whether Chromium has an issue for it and report it if not.
  - Options:
    - A (recommended): record it as an engine bug with this repro in `tests/e2e/engines.spec.ts`, and assert the button's text after a reset in `example-state.spec.ts` as an expected failure.
    - B: refresh the content after a reset in the compat layer, behind an engine gate: `select.selectedIndex = select.selectedIndex` in a `reset` listener makes it read Banana again (run by the blind port).
- (3) Select: in Svelte and Vue, a `multiple` Select whose child options carry `selected` renders with nothing selected. `initialValue` returns an empty array when no item is selected, the hand-written ports take that as the value, and `bind:value` and `v-model` deselect every option. The API says a child option takes `selected` itself, as in HTML (`packages/opui/components/Select/selection.ts`, `packages/opui/components/Select/Select.svelte`, `packages/opui/components/Select/Select.vue`, `src/component-api/select/api.ts`)
  - Summary: In Svelte and Vue, a multiple select with selected child options comes up with none of them selected.
  - Recommended: Fix. Returning no value when no item is selected lets the DOM's own selection stand.
  - Fix: found by the Select blind port and run in Chromium: `<Select multiple><option selected value="x">X</option><option selected value="y">Y</option><option value="z">Z</option></Select>` is right in the server markup and has nothing selected after hydration and on a client mount, in Svelte and Vue; Solid keeps x and y. With the change below Vue's `v-seed` takes the array from the DOM. Svelte needs one more step, since `bind:value` takes a single option from the page even on a multiple select and then warns: adopt the DOM's array in the attachment of the item on a choice made before hydration. The same line picks the first of two `selected` items on a single select, where HTML, Astro and Solid pick the last: `selected.at(-1)`.
    ```ts
    // before
    return multiple ? selected : selected[0]
    // after
    if (!selected.length) return undefined
    return multiple ? selected : selected.at(-1)
    ```
- (2) Package: in Vue, a text prop and the slot of the same name render with no space between them, where Astro renders the line break between the two as a space: `start-text="Max 10 kg"` with a `#start-text` slot reads "Max 10 kgWhy?". The reader drops every blank text node with a line break inside a `{cond && <el>...</el>}` expression before the whitespace rules see it (`scripts/component-reader.mjs`, `packages/opui/components/TextField/TextField.vue`, `packages/opui/components/TextField/TextField.astro`, `scripts/component-layout.mjs`)
  - Summary: In Vue, a field's start text set as a prop runs straight into the slot content that follows it.
  - Recommended: Fix. The whitespace rule that would keep the space already exists and never sees the node.
  - Fix: found by the TextField blind port and confirmed in Chromium on the compiled Vue file: the start text span holds `Max 10 kg<span>...</span>` with nothing between. Only Astro and Vue can have the prop and the slot set together. The same pattern is in Checkbox, ListItem, NumberField, OneTimeCode, Radio, Range, Stat, StepperItem, Switch, Textarea and the hand-written `Select.vue`. Keep the node for `shapeWhitespace`, whose inline rule keeps it, then check the contract and parity tests, which never set a prop and its slot together: add that case.
    ```vue
    <!-- before -->
    <span
      v-if="hasStartText()"
      class="ui-start-text"
      :id="startTextId()"
    >{{ startText }}<slot name="start-text"></slot
    ></span>
    <!-- after -->
    <span v-if="hasStartText()" class="ui-start-text" :id="startTextId()">
      {{ startText }}
      <slot name="start-text" />
    </span>
    ```
- (2) Select: the hand-written Svelte Select reimplements what `<select defaultValue>` does in Svelte 5.57, and on the server it prints `selected` twice on the starting option, once from its own attribute and once from Svelte's renderer, which is a parse error (`packages/opui/components/Select/Select.svelte`, `packages/opui/components/Select/selection.ts`)
  - Summary: The server markup of a Svelte Select has the `selected` attribute twice on one option.
  - Recommended: Fix. Svelte marks the options from `defaultValue` itself, on the server and when options change.
  - Fix: found by the Select blind port and run on the server: `<option selected="" value="b" selected="">Banana</option>`. Its port resets to the first value with child options too. Keep the spread conditional, since `defaultValue={undefined}` on a select with a spread strips `selected` from the caller's own options.
    ```svelte
    <!-- before -->
    <select {...rest} bind:value {@attach keepFirst}>
      <option selected={isSelected(item) || undefined} value={item.value}>
    <!-- after -->
    <select {...rest} {...resetTo === undefined ? null : { defaultValue: resetTo }} bind:value>
      <option value={item.value}>
    ```

### Questions

- (2) Select: the React, Svelte and Vue Select files are written by hand, and four of the open Select bugs exist only in them. The compiler refuses nothing in `Select.astro` today: its Solid output is the committed file, and the other three build and misbehave for two reasons, a starting value taken once from the selected items and a `<selectedcontent>` the browser fills (`scripts/hand-written-components.json`, `packages/opui/components/Select/Select.astro`, `scripts/component-models.mjs`, `packages/opui/components/Select/selection.ts`)
  - Summary: Three of the four Select ports are kept by hand, about 150 lines each, and they have drifted apart.
  - Recommended: Fix with option A. The blind port puts the gap at about 25 to 60 lines per file, and the drift is measurable.
  - Fix: answered by the Select blind port, which ran `compileComponent` on the Astro file in memory. What the compiler writes today: React gets `selected` on every option (a React warning), a bare `<SelectedContent />` that fails hydration, and no reset default; Svelte gets `svelte:element` on a `$derived("selectedcontent")`, which crashes the server render, and a `selected` that follows the live value; Vue gets a `:selected` that follows the model and no fallback to the items. What the hand-written files add: the first value once, as `value ?? defaultValue ?? the selected items`, used as the reset default and the model's fallback; `<selectedcontent>` as a static tag the browser fills; and in Svelte the item's typed value. The React half of the ledger's reason is already stale: with `set:html=""` on the tag the compiler writes `dangerouslySetInnerHTML` and `suppressHydrationWarning`.
  - Options:
    - A (recommended): compile them, in two steps. First fold a tag that is always one string into the element in the React, Svelte and Vue emitters, as `staticTag` does for Solid, and add `set:html=""` to `<SelectedContent />`. Then give the `value` model kind a select branch in `scripts/component-models.mjs`, like the one Solid has, that writes `defaultValue` on the select and no `selected` on the options in React and Svelte, and the computed fallback with a frozen `:selected` in Vue. React and Vue are then mechanical; Svelte needs the seed, the typed values and the adoption of the DOM.
    - B: keep the three files and move what they share into `selection.ts` (the first value, the typed value, the edited check, unique keys), so they stop diverging.
    - C: only the first step of A, which is generic and removes a crash the compiler would write for any always-one-string tag.

### Suggestions

- (2) Tabs, ToggleGroup: in React, a group's context value changes on every render when `onValueChange` is an inline function, which is how callers normally write it, so every item renders again: the group's `change` callback lists the handler as a dependency. `tests/unit/react-context.test.ts` renders twice with the same props, so it never passes a new handler (`scripts/component-models.mjs`, `packages/opui/components/Tabs/Tabs.react.tsx`, `packages/opui/components/ToggleGroup/ToggleGroup.react.tsx`, `tests/unit/react-context.test.ts`)
  - Summary: In React, every tab and toggle button renders again whenever the parent of a group with an inline handler renders.
  - Recommended: Fix. The helper for element events already keeps the latest handler in a ref.
  - Fix: found by the Tabs blind port and run in Chromium: a parent with its own state renders `<Tabs defaultValue="a" onValueChange={(value) => log(value)}>` with three items as children; one state change reads the items' `value` 15 times against 6 before, and 6 with a handler defined outside the component. Tabs grows from 468 to 536 bytes gzipped. Make the context test pass a new function on the second render.
    ```tsx
    // before
    const change = useCallback((input: HTMLInputElement) => { ...; onValueChange?.(next) }, [onValueChange])
    // after
    const latest = useRef(onValueChange)
    useInsertionEffect(() => {
      latest.current = onValueChange
    })
    const change = useCallback((input: HTMLInputElement) => {
      const next = input.value
      setInner((current) => (current === undefined ? current : next))
      latest.current?.(next)
    }, [])
    ```
- (2) Rating: in React, the read-only Rating ships and hydrates as a client component: the meter branch has no handler, ref, state or effect, but the file is `"use client"` because the radio branch needs `onChange`. 18 of the 24 Rating uses in the examples and blocks are meters (`packages/opui/components/Rating/Rating.react.tsx`, `packages/opui/components/Rating/Rating.react.tsx`, `scripts/component-models.mjs`, `packages/opui/components/Rating/Rating.astro`)
  - Summary: In React, a page that only shows ratings still sends the rating input's code to the browser.
  - Recommended: Explain further and provide an example. The saving was measured per module, not in a Next.js build.
  - Fix: found by the Rating blind port: 661 bytes gzipped of client code for any Rating today, against none on a page of meters and 564 for the input when the two are split. That an unrendered client reference is never fetched is reasoned, so build it in Next.js first. The compiler gets there most easily if the fieldset branch is its own `.astro` part, such as `RatingInput.astro`, which the root renders when `name` is set.
    ```tsx
    // Rating.react.tsx, a server component
    export default function Rating(props: Props) {
      if (props.name) return <RatingInput {...props} />
      return <meter aria-label={props["aria-label"] ?? props.label} ... />
    }
    ```
- (2) ListItem: ListItem writes its row body twice in all four frameworks, once inside its optional wrapper and once without, because `ListItem.astro` has no way to share it and every emitter copies both branches. In Solid a `choice` row also renders its `<label>` through `dynamic()`, a four-source merge and a spread, for a tag that is always `label` (`packages/opui/components/ListItem/ListItem.astro`, `packages/opui/components/ListItem/ListItem.solid.tsx`, `scripts/component-jsx.mjs`, `scripts/component-solid.mjs`)
  - Summary: The four ListItem files each carry the same 16 to 29 lines twice.
  - Recommended: Explain further and provide an example. It is real compiler work for a saving that mostly compresses away.
  - Fix: found by the ListItem blind port, with no behavior difference in 21 scenarios. Hoisting the body in Solid takes the client module from 2877 to 2266 bytes minified (noise once gzipped) and the server build from 1210 to 1068 gzipped. The `choice` row mounts 2000 times in 61 ms against 34 ms for a static `<label>`, about 13 microseconds a row. The emitters would emit the nodes once, as a local function in React and Solid, a snippet in Svelte and a template in Vue, when the alternate of a condition equals the children of the one element in its consequent; the static label then needs a variable tag split per arm.
    ```tsx
    // after, in Solid
    const content = () => (
      <>
        {resolvedStart() && <div class="ui-start">{resolvedStart()}</div>}
        ...
      </>
    )
    <Show when={tag()} fallback={content()}>
      {(shownTag) => <Tag ...>{content()}</Tag>}
    </Show>
    ```
- (2) TextField, Textarea: every TextField loads both of its element scripts, `character-count.js` and `text-field.js`, whether or not `characterCount` or `passwordToggle` is set, and Textarea the character count. They are 937 and 709 bytes gzipped, next to a component of 1.1 to 2.0 kB. The compiler's tree already knows the condition each `opui-*` tag renders under (`packages/opui/components/TextField/TextField.react.tsx`, `packages/opui/components/TextField/TextField.solid.tsx`, `scripts/component-react.mjs`, `scripts/component-emit.mjs`)
  - Summary: A plain text field brings the code for the character count and the password toggle with it.
  - Recommended: Explain further and provide an example. In React it is pure gain; in the other three it delays the element.
  - Fix: found by the TextField blind port; the sizes are measured and the chunking is reasoned, not run in an app. In React the load is already deferred, so loading each script only when its prop is set costs nothing. In Solid, Svelte and Vue it swaps 1.6 kB of static weight for a later definition, so the toggle and the count appear a chunk later, as they do in React today.
    ```tsx
    // before
    useEffect(() => {
      void import("../../elements/character-count.js")
      void import("../../elements/text-field.js")
    }, [])
    // after
    useEffect(() => {
      if (characterCount) void import("../../elements/character-count.js")
    }, [characterCount])
    useEffect(() => {
      if (passwordToggle) void import("../../elements/text-field.js")
    }, [passwordToggle])
    ```
- (2) Checkbox, Radio, Switch: the Vue CheckboxInput, RadioInput and SwitchInput turn attribute inheritance off, read the attrs by hand and wrap the model in a computed, where the input is the single root and Vue's own fallthrough and `v-model` do the same. CheckboxInput is 591 bytes gzipped and 48 lines against 458 and 22 for a hand-written one (`scripts/component-models.mjs`, `scripts/component-vue.mjs`, `packages/opui/components/Checkbox/CheckboxInput.vue`)
  - Summary: Three small Vue inputs are about a third larger than they need to be.
  - Recommended: Explain further and provide an example. Two behaviors differ, so see them before choosing.
  - Fix: found by the Checkbox blind port, which ran both versions in Chromium: server markup, edits before hydration, another prop changing, the owner setting the model, a group, native `checked`, a one-way `:checked` and a reset all behave the same. Two differences: after a reset a bound model that was `undefined` becomes `false` in the plain version and stays `undefined` today, and a caller's `:type="undefined"` strips the type unless the Astro file sets `type` after the rest. RadioInput and SwitchInput are the same kind and were not measured. The contract and parity tests were not run against the plain version.
    ```vue
    <!-- after -->
    <script setup lang="ts">
    const { indeterminate, name } = defineProps<Props>()
    const model = defineModel<boolean | (number | string)[]>({
      default: undefined,
    })
    const field = inject(FieldGroupKey, undefined)
    </script>

    <template>
      <input
        v-seed
        v-model="model"
        type="checkbox"
        :data-indeterminate="indeterminate ? '' : undefined"
        :name="name ?? field?.name"
      />
    </template>
    ```
- (2) Package: cost the blind ports found in the compiled Solid files: a slot with a fallback goes through `children()` only to be compared with `undefined`, Rating loops over a count as an array and writes its handler body four times, every Select option goes through `spread()` to carry a server-only attribute, `dynamic()` never gets the `static` option, and Menu uses `<Dynamic>`, which Solid 2 marks deprecated (`scripts/component-jsx.mjs`, `scripts/component-solid.mjs`, `packages/opui/components/Accordion/AccordionSummary.solid.tsx`, `packages/opui/components/Rating/Rating.solid.tsx`, `packages/opui/components/Select/Select.solid.tsx`, `packages/opui/components/ListItem/ListItem.solid.tsx`, `packages/opui/components/Menu/Menu.solid.tsx`, `packages/opui/components/ToggleButton/ToggleButton.solid.tsx`)
  - Summary: The Solid files create more memos and effects per instance than a hand-written component in five places.
  - Recommended: Explain further. Each is a separate emitter change with its own trade-off, so say which to take.
  - Fix: none changes the markup. In turn: (1) `{resolvedMarker() === undefined ? <svg /> : resolvedMarker()}` costs two lazy memos and a condition memo where `{props.marker ?? <svg />}` compiles to one read, in AccordionSummary, Callout, DialogHeader, DrawerHeader, NumberField and ToggleButton (444 to 401 bytes gzipped, 7 computations to 4); with `??` a `null` slot shows the fallback, where today it renders nothing. (2) Rating builds `stars()` with `Array.from` and loops with `<For keyed={false}>`, where `<Repeat count from>` passes a plain number, and its `onValueChange` plus `restoreChecked` body is written in `onChange` and in `seedChecked` for both radios; a revised port is 10.5% smaller and behaves the same. (3) `{...itemSelectedControl.server}` is empty on the client but makes Solid compile the whole option as a spread: 2000 options mount in 16.5 to 18.1 ms against 13.7 ms without it. (4) `dynamic(tag, { static: isStatic(props, "as") })` saves about four computations per instance in 13 components and costs about 25 bytes each. (5) `<Dynamic component={tag()}>` is `dynamic()` plus an `omit`, and the guide documents it for a per-item tag. (6) `group?.change?.(input)` calls a context member that is required.
    ```tsx
    // before
    const resolvedMarker = children(() => props.marker)
    {resolvedMarker() === undefined ? <svg aria-hidden="true" /> : resolvedMarker()}
    <For each={stars()} keyed={false}>{(star) => ...star()...}</For>
    // after
    {props.marker ?? <svg aria-hidden="true" />}
    <Repeat count={count()} from={1}>{(star) => ...star...}</Repeat>
    ```
- (1) Package: four input parts set `type` before `{...rest}` in their Astro file, so all 16 compiled files filter the rest with `defined()` on every render to keep a caller's `type={undefined}` from removing it, and `Tabs.astro` destructures `role` only to read it and pass it back (`packages/opui/components/Checkbox/CheckboxInput.astro`, `packages/opui/components/Tabs/TabsItem.astro`, `packages/opui/components/Radio/RadioInput.astro`, `packages/opui/components/Switch/SwitchInput.astro`, `packages/opui/components/Tabs/Tabs.astro`, `scripts/component-shared.mjs`)
  - Summary: Four inputs filter their attributes on every render to protect one fixed attribute.
  - Recommended: Fix. The guide's own rule is to spread the rest first and then set the values that must win.
  - Fix: found by the Checkbox and Tabs blind ports. Compiling the reordered `CheckboxInput.astro` in memory gives all four ports without `defined` or its import. The bytes are noise (3 to 6% per file); the cost is an `Object.entries`, a filter and a `fromEntries` per render and per item. The attribute order in the markup changes (`type` last), so run `pnpm build-examples` and re-record the parity snapshots as intended. For `role`, leave it in the rest and read `rest.role` for the warning, like the open item on `aria-labelledby`.
    ```astro
    <!-- before -->
    <input
      type="checkbox"
      data-indeterminate={indeterminate ? "" : undefined}
      name={name ?? field?.name}
      {...rest}
    />
    <!-- after -->
    <input
      {...rest}
      type="checkbox"
      data-indeterminate={indeterminate ? "" : undefined}
      name={name ?? field?.name}
    />
    ```
- (1) Package: small things the blind ports found outside Solid: the React Rating gives every radio a new `ref` function on each render, the Svelte TextField declares ten `$derived` an `{#if}` already covers, and the hand-written Vue Select has nine `computed`, six of them a template string (`packages/opui/components/Rating/Rating.react.tsx`, `packages/opui/components/TextField/TextField.svelte`, `scripts/component-svelte.mjs`, `packages/opui/components/Select/Select.vue`)
  - Summary: A few React, Svelte and Vue files allocate more per instance than a hand-written component would.
  - Recommended: Explain further. None is visible to a user, so say which are worth an emitter change.
  - Fix: in turn: (1) `ref={seedChecked(() => onValueChange?.(star))}` makes React detach and attach the ref of every radio on each render (18 seed lookups after two renders of six radios against 6); `useSeedChecked` from `react.ts` gives a stable one. (2) `scripts/component-svelte.mjs` wraps every Astro const in `$derived`; inlining the ten in TextField gives the same markup with 2 derived signals per instance against 12, and 2.9% fewer bytes, which is noise. (3) `const startTextId = computed(() => ...)` and five more in `Select.vue` could be one function, as the compiler's own Vue output writes them.

## Additions to items already in `TODO.md`

The blind ports also sharpened items stage 1 had filed. Add each as a note on its item once the item is confirmed to still hold.

- Vue declares `class` as a prop (the class named `class` is lost): a one-line fix exists. Typing the prop as `unknown` in `vue.ts` makes the SFC compiler emit `class: {}`, so Vue casts nothing and the prop stays. The Menu port rendered `class="ui-menu class"` with it. The Tabs port adds that 61 of the Vue files have default fallthrough to the root, and 29 have a script only to declare props and slots.
- Rating and Menu item types intersect two elements: `toTypes()` already writes a union for all four frameworks when `types.astro.ts` is a union. The compiled Solid Menu type-checks unchanged against it, and the React Menu fails only at the item spread, which one cast fixes. For Rating the union is on `name`, with `name?: never` on the meter branch, and each port needs one cast on the meter's rest. In Solid any inline handler with a parameter on a Rating is an implicit `any` today. `onValueChange` is typed `(value: number | string)` and only ever gets a number.
- Vue attrs that arrive after mount never reach the inner element: the Rating port needs no computed at all. The template spreads the attrs itself, `v-bind="{ ...attrs, 'aria-describedby': undefined, 'aria-invalid': undefined }"`, so nothing can go stale.
- Solid TextField loses its value when the root tag changes: a better fix than writing the value into the new input is not to build a new input. Resolve the root's content once with `children()` and pass it to the `dynamic()` root, so the node is kept and moved and typed text survives. Focus is still lost on the move. The same root cause has a second trigger: a Solid Rating with `value={0}` whose `required` goes true and back to false shows its clear radio unchecked, because the control is declared in the component body and shared across rebuilds.
- Solid control writes an unchanged prop once: confirmed by the ToggleGroup port with `checked={n() > 5}`, a click, then `setN(1)`.
- React loads element scripts in an effect: the Menu and Checkbox ports import them statically with the same results in Chromium and no hydration warning.
- React groups ignore a form reset: the shared `afterReset` helper in the list above fixes it together with Solid and Svelte.
- Select with late `items` in Svelte and Vue: a model getter that falls back to the items fixes the half where an arriving item is `selected`. The half with no selected item stays blank.
- Select throws on duplicate values in Svelte: suffixing the second occurrence of a key (`uniqueKeys(items)`) removes the throw and the React and Vue warnings.
- The missing update test: add a reset after two changed boxes of a bound group, a select choice made before hydration, and a control under a parent that spreads a replaced object.

## Process notes

- This branch moves fast, and other sessions push compiler work to it. Fetch and merge before starting a fix and again before pushing, and check a finding against the merged code before filing it. Stage 1 lost a day of findings to work that landed while it ran.
- A finding went straight to a fix only when all of this held: the compiler broke a convention the guide documents or wrote dead code, the markup could not change, no type, guide text or CHANGELOG entry changed, the fix sat in one emitter, and it touched no model kind. Before the fix, check that it sits where the pattern starts and keys on the construct, never on a component name. Everything else became a `TODO.md` item with a before and an after.
- The commit hook rejects a subject over 100 characters without saying so when its output is piped.
