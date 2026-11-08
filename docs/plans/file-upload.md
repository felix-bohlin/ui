# FileUpload: implementation plan

Status: plan only. This PR carries the plan; the implementation lands on this branch in later commits.

## Summary

FileUpload is a drop zone around a native `<input type="file">` that lists the chosen files under it, with a name, a size, an image preview and a remove button for each. The `<opui-file-upload>` custom element keeps the native input as the only source of truth: it merges picks and drops into `input.files` through a `DataTransfer`, so the files submit, reset and validate exactly like a plain file input.

## Why

- Nuxt UI ships `UFileUpload` (`@nuxt/ui` 4.12.0, `dist/runtime/components/FileUpload.vue`, `composables/useFileUpload`): `modelValue` (a `File` or a `File[]`), `multiple`, `accept`, `dropzone`, `interactive`, `layout` (`list` or `grid`), `position` (inside or outside the drop zone), `preview` and `fileImage`, `fileDelete`, `label`, `description`, `reset`, and a `reject` event for files that don't match `accept`. We take the list, the previews, the removal, the accumulating picks and the `reject` event. We leave `interactive` (the native input is always the trigger), the `ui` and icon props (slots replace them) and `color`.
- Where the repo needs it today:
  - `TextField` already styles a file input and a dashed drop zone (`dropZone`, `.ui-drop-zone`, `packages/opui/css/components/text-field.css:191-262`, example `src/component-examples/text-field/DropZone.astro`). It shows the browser's own "2 files" text, can't show which files, can't remove one, and a second pick replaces the first.
  - The file-manager block has an Upload button that does nothing (`src/blocks/file-manager.html:91`).
  - The account-settings block has "Upload new photo" (`src/blocks/account-settings.html:69`) with no preview of the chosen image.

## Scope

- In: single and multiple files, drag and drop onto the zone, accumulating picks with `multiple`, removing one file, image previews, `accept` applied to drops (the picker already applies it), a size limit, `required`, form reset, and the existing TextField sizes and `filled` variant.
- Out:
  - Upload progress and sending files anywhere. The component chooses files; uploading is the app's job, and a `Progress` in each row is a later example once the list API is settled.
  - A grid layout of thumbnails (Nuxt's `layout="grid"`). It's a CSS variant that can follow (`.ui-grid`), noted in Open questions.
  - Pasting files from the clipboard. Easy to add later with a `paste` listener; it needs a decision on which element receives the paste.
  - Folder upload (`webkitdirectory`). Non-standard.

## Markup and CSS

```html
<opui-file-upload
  class="ui-file-upload"
  max-size="10000000"
  remove-label="Remove {file}"
  size-too-large-label="{file} is larger than 10 MB."
>
  <label class="ui-text-field ui-drop-zone">
    <span class="ui-label">Attachments</span>
    <span class="ui-field">
      <input
        accept=".pdf,image/png,image/jpeg"
        aria-describedby="attachments-end-text"
        multiple
        name="attachments"
        type="file"
      />
    </span>
    <span class="ui-end-text" id="attachments-end-text"
      >PDF, PNG or JPG, up to 10 MB each.</span
    >
  </label>
  <ul aria-label="Chosen files" class="ui-list ui-files" hidden></ul>
  <span class="ui-sr-only" role="status"></span>
</opui-file-upload>
```

A row the element adds to `.ui-files`, in the List markup (`src/component-examples/list/Basics.html`):

```html
<li>
  <div class="ui-start">
    <img alt="" height="40" src="blob:..." width="40" />
  </div>
  <div class="ui-text">
    <p>Receipt-october.png</p>
    <p>1.2 MB</p>
  </div>
  <div class="ui-end">
    <button
      aria-label="Remove Receipt-october.png"
      class="ui-button ui-round ui-small"
      type="button"
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" width="24" height="24">
        <path fill="currentColor" d="..." />
      </svg>
    </button>
  </div>
</li>
```

- The drop zone is a `TextField` with `dropZone` and `type="file"`, unchanged, so a reader who never loads the script still gets a working field. FileUpload adds the list, the status region and the element around it.
- New stylesheet `packages/opui/css/components/file-upload.css`. Its rules land on `.ui-text-field` and `.ui-list` elements inside the root and must beat `text-field.css` and `list.css`, so it declares `components.extended` and goes in the Extended group after `list.css` and `text-field.css` (`BUILDS_ON` in `tests/unit/layers.test.ts` if the test asks).
- Rules under `:where(.ui-file-upload)`:
  - The root is `display: grid`, `gap: var(--ui-space-2)`.
  - `&:state(drag-over) > .ui-text-field > .ui-field`: the drop target highlight. `border-color: var(--ui-focus-ring-color)` and `background-color: var(--ui-selected)` with `color: var(--ui-on-selected)`, the selected-fill roles the guide names. The custom state comes from `this.attachInternals().states`, which needs no form association.
  - `&:state(has-files) > .ui-text-field input`: `color: transparent`, so only the selector button shows and the list carries the names, which the browser's "3 files" text can't. A custom state, not a class, since Stylelint rejects state classes (`opui/state-classes`).
  - `> .ui-files`: `.ui-list` with `.ui-outlined`-like edge from list roles, `> li > .ui-start > img` is `object-fit: cover`, `border-radius: var(--ui-radius-small)`, `inline-size` and `block-size` of `var(--_preview-size)`.
  - A row for a rejected file (too large or the wrong type) is not added; the reason goes to the end text and the status region instead (see Behavior), so there is no error row style.
- Sizes: the TextField size classes on the inner label size the zone; the list follows with `.ui-dense` on `.ui-small` and `.ui-x-small` zones, set by the components and documented for HTML.
- `--_*` declared: `--_preview-size` (default `var(--ui-control-size)`), documented in `src/component-api/custom-properties/file-upload.ts`.
- Roles read: `--ui-selected`, `--ui-on-selected`, `--ui-focus-ring-color`, `--ui-radius-small`, `--ui-space-2`, `--ui-control-size`. No new theme token.
- Features for `browserSupport`: `has` (inherited), and a detector to add for `:state()`; check the exact web-features id in the `web-features` package (likely `custom-states`) and add its pattern to `packages/opui/scripts/features.mjs`, with a sample in the features test, since `check-browser-support` only accepts ids it can detect.
- Forced colors: a block. The drag-over highlight is a tint, so it gets `Highlight` on the border and `HighlightText` is not needed (the fill is dropped). Add `FileUpload` to the "with a block" list in section 9 of `packages/opui/components/AGENTS.md` and to `tests/unit/forced-colors.test.ts`'s list.
- More contrast: nothing of its own.
- Motion: the drag-over highlight transitions `background-color` and `border-color` over `--_duration` scaled by `--_motion` (Stylelint `opui/motion-duration`), like TextField's focus; rows appear at once.
- Right-to-left: logical properties only; file names get `dir="auto"` so a Hebrew name in an English page reads right.

## Behavior

The platform gives the picker, `accept` and `multiple` in the picker, dropping onto the input (it replaces the selection), `required`, form submission and reset. The element adds:

- Accumulating picks: with `multiple`, a new pick adds to the files already chosen instead of replacing them. On `change`, the element builds a `DataTransfer`, adds the previous files then the new ones (skipping a file with the same name, size and `lastModified`), and assigns `input.files = transfer.files`.
- Drop on the whole zone: `dragenter` and `dragover` (with `preventDefault()` so the drop is allowed) set `:state(drag-over)`; `dragleave` out of the root and `drop` clear it. `drop` filters the files by `accept` (MIME types, `type/*` wildcards and extensions, the same rules as the picker) and by `max-size`, then merges the accepted ones as above, or replaces the single file without `multiple`.
- Rejected files fire a `reject` event (`detail: { files: File[], reason: "accept" | "size" }`) and set the status region and the input's `setCustomValidity()` until the next change, so the zone matches `:user-invalid` and shows the reason.
- Removal: the row's button rebuilds `input.files` without that file, fires `change` on the input, revokes the preview URL and moves focus to the next row's button, or the previous one, or the input when the list is empty.
- Previews: an `image/*` file gets `URL.createObjectURL(file)` in its `img`; others get the file icon. Every URL is revoked on removal, on reset and in `disconnectedCallback`.
- Sizes are written with `Intl.NumberFormat(lang, { maximumFractionDigits: 1, style: "unit", unit: "megabyte" })` (or `kilobyte` under 1 MB), where `lang` is the closest `[lang]`, so "1,2 MB" in Swedish needs no label.
- Reset: a capture `reset` listener on the owner document for `input.form` (the pattern in `packages/opui/elements/text-field.js:19-27`) clears the list after the native reset, in a `setTimeout` like `packages/opui/elements/number-field.js:35-41`.
- Rendering on connect: when `input.files` already has files (the browser restores them on back navigation in Firefox), the element lists them.

Form participation, decided: the native file input, not `ElementInternals`. The input is already form-associated, submits its files as multipart data, resets itself, validates `required`, and keeps working before or without the script. `input.files` is assignable from a `DataTransfer` in every engine, which is everything the element needs to add and remove files. `ElementInternals.setFormValue()` with a `FormData` would duplicate that and drop the no-script fallback.

`packages/opui/elements/file-upload.js` (and `file-upload.d.ts`), light DOM, defined as `opui-file-upload`.

Attributes (observed):

| Attribute              | Default                                 | Effect                                                                     |
| ---------------------- | --------------------------------------- | -------------------------------------------------------------------------- |
| `max-size`             | none                                    | The largest file in bytes. Larger files are rejected with reason `"size"`. |
| `reject-label`         | `"{file} isn't an accepted file type."` | The message for a file `accept` rejects.                                   |
| `remove-label`         | `"Remove {file}"`                       | Each remove button's `aria-label`.                                         |
| `removed-label`        | `"Removed {file}"`                      | The status message after a removal.                                        |
| `size-too-large-label` | `"{file} is too large."`                | The message for a file over `max-size`.                                    |

`{file}` is replaced by the file name, so a translation puts it where its language needs. The labels never join a number and words: the reader writes the limit into the label ("larger than 10 MB"), following the rule in section 3 of the components guide.

Properties: `readonly input: HTMLInputElement | null`, `readonly list: HTMLUListElement | null`, `files: File[]` (getter from `input.files`; setter replaces them through a `DataTransfer`), `remove(file: File): void`, `clear(): void`.

Events: `reject` as above (bubbling); `change` and `input` keep coming from the native input, including after the element adds or removes files.

## Component API

`FileUpload`, compiled by `pnpm build-components`. It renders `opui-file-upload.ui-file-upload` around a `TextField` (`type="file"`, `dropZone`), the empty `ul.ui-list.ui-files` and the status region, and imports `../../elements/file-upload.js` in a `<script>` like `TextField.astro`.

Props (`types.ts`, sorted):

| Prop                | Type                                          | Default          | Renders                                                                  |
| ------------------- | --------------------------------------------- | ---------------- | ------------------------------------------------------------------------ |
| `endText`           | `string`                                      |                  | the TextField's `.ui-end-text`                                           |
| `error`             | `boolean`                                     | `false`          | `aria-invalid="true"` on the input                                       |
| `filesLabel`        | `string`                                      | `"Chosen files"` | the list's `aria-label`                                                  |
| `hideLabel`         | `boolean`                                     | `false`          | `.ui-sr-only` on the label                                               |
| `label`             | `string`                                      |                  | `.ui-label`                                                              |
| `maxSize`           | `number`                                      |                  | `max-size`                                                               |
| `rejectLabel`       | `string`                                      |                  | `reject-label`                                                           |
| `removeLabel`       | `string`                                      |                  | `remove-label`                                                           |
| `removedLabel`      | `string`                                      |                  | `removed-label`                                                          |
| `size`              | `"x-small" \| "small" \| "medium" \| "large"` | `"medium"`       | the TextField's `.ui-<size>`, and `.ui-dense` on the list below `medium` |
| `sizeTooLargeLabel` | `string`                                      |                  | `size-too-large-label`                                                   |
| `variant`           | `"outlined" \| "filled"`                      | `"outlined"`     | the TextField's `.ui-filled`                                             |

- `accept`, `multiple`, `name`, `required`, `disabled`, `capture` and `aria-*` are native and reach the input through `...rest` (section 5 of the guide). The root takes `class` and `style`.
- Slots: `label`, `end-text` (rich content), `file-icon` (the icon for a file without a preview, cloned into each row) and `remove-icon` (cloned into each remove button). The element reads them from two `<template>` elements the component renders (`template.ui-file-icon`, `template.ui-remove-icon`), so the shapes come from the markup, not the script.
- `model`: none in this version. A `File[]` can't be rendered on the server and an input's `files` can't be set from a prop before hydration; frameworks read files from the native `change` event or `element.files`. See Open questions.
- Element typings in `packages/opui/react/elements.ts` and `packages/opui/svelte/elements.ts` (`onreject` as `EventHandler<CustomEvent<{ files: File[]; reason: "accept" | "size" }>, HTMLElement>`); React's `onReject` in `types.react.ts`.

```astro
---
import { FileUpload } from "opui-css/astro"
---

<FileUpload
  accept=".pdf,image/png,image/jpeg"
  endText="PDF, PNG or JPG, up to 10 MB each."
  label="Attachments"
  maxSize={10_000_000}
  multiple
  name="attachments"
  sizeTooLargeLabel="{file} is larger than 10 MB."
/>
```

## Accessibility

- The input keeps its native role and name from the `<label>`; the end text describes it. The drop zone is the label, so the whole area is the click target, as today.
- Dragging is never the only way: the picker opens from click, Enter and Space on the input (native).
- The file list is a `<ul>` named "Chosen files"; each row's remove button is named "Remove <file name>".
- The status region announces "Removed Receipt-october.png" and rejection reasons, since neither moves focus. Additions are not announced: after a pick, focus is back on the input and the list is right after it in reading order.
- Previews have `alt=""` because the file name is next to them.
- Rejections are text, not color: the message and `aria-invalid` through `setCustomValidity()`.
- What axe can't catch: focus after removal (next button, previous button, then the input) and that the drag-over highlight has a non-color cue in forced colors (the `Highlight` border).

Keyboard support:

| Keys              | Where         | Does                                                |
| ----------------- | ------------- | --------------------------------------------------- |
| Enter, Space      | File input    | Opens the picker (native).                          |
| Tab               | Anywhere      | Moves from the input to each remove button in turn. |
| Enter, Space      | Remove button | Removes that file.                                  |
| Delete, Backspace | Remove button | Removes that file.                                  |

## Docs page

`src/docs/components/file-upload.astro`, slug `file-upload`, `heroAnatomy` (zone, list, row, preview, remove button).

- Preamble: "A drop zone that lists the files you choose, with previews and a remove button for each." Sibling: TextField's drop zone, linked both ways (add a sentence to the Drop zone section at `src/docs/components/text-field.astro:296-297` pointing to FileUpload for a list of files).
- Usage: when to use (several files, or one image the person should see before sending); when not (one file where the name is enough: TextField with `type="file"`).
- Sections and examples, in the order of section 3.3:
  1. Basics: `Basics` (one file, a receipt).
  2. Sizes: `Sizes`. Variants: `Variants`.
  3. Parts and content: `Multiple` (accumulating attachments), `Previews` (`accept="image/*"`, profile photos), `Icons` (the `file-icon` and `remove-icon` slots), `EndText`, `HideLabel`.
  4. States: `Disabled`, `Required`, `Limits` (`maxSize` and `accept` with their labels; drop a large file to see the message), `Validation`.
  5. Composition: `InForm` (in a form with a submit button that shows `FormData` names and sizes in an `<output>`; its framework files are hand-written in `scripts/hand-written-examples.json` since the listener is framework code).
- Under the hood: why the native input stays the source of truth, the `DataTransfer` merge, and `:state(drag-over)` for styling.
- `browserSupport`: `has` plus the `:state()` id (run `node scripts/check-browser-support.mjs --write`).
- See also: List, TextField.

## Blocks and other pages

- `src/blocks/account-settings.html:69`: replace "Upload new photo" with a single-file `FileUpload` with `accept="image/*"`, so the chosen photo shows as a preview.
- `src/blocks/file-manager.html:91`: the Upload button opens a `Dialog` with a multiple `FileUpload` and an Upload action.
- `src/stress-tests/forms.html`: a FileUpload in each `[data-size]` row.

## Files

- Add `packages/opui/components/FileUpload/`: `FileUpload.astro`, `icons.ts` (file and remove icons), `types.ts`, `types.astro.ts`, and the compiled React, Svelte and Vue files and type files.
- Export `FileUpload` and `FileUploadProps` from the four barrels in `packages/opui/{astro,react,svelte,vue}/index.ts`.
- Add `packages/opui/css/components/file-upload.css`, import it in `css/components.css` (Extended group).
- Add `packages/opui/elements/file-upload.js` and `.d.ts`; typings in `react/elements.ts` and `svelte/elements.ts`.
- Add a `:state()` detector to `packages/opui/scripts/features.mjs` with its sample test.
- Add `src/component-api/file-upload/api.ts` and `src/component-api/custom-properties/file-upload.ts`.
- Add the examples in `src/component-examples/file-upload/`.
- Add `src/docs/components/file-upload.astro`; the showcase card in `src/components/ComponentShowcase/ComponentShowcase.astro`; the link from `text-field.astro`.
- Add `packages/opui/skills/opui/references/file-upload.md` and its line in `index.md`.
- `packages/opui/README.md`: the list of components that load a custom element.
- `packages/opui/CHANGELOG.md`, Added: "`FileUpload` component (`opui-file-upload.ui-file-upload`): ...", naming `.ui-files`.
- `src/utils/whats-new.ts`: a "New component." note with `#basics` and `#previews` links; slug in `added` and `highlighted`.
- `docs/releases/6.0.0.md`: "- [ ] FileUpload" with the manual checks (drop a file from the desktop, pick twice with `multiple`, remove one, submit, reset, back navigation in Firefox).
- `tests/package/package.test.ts`: `"elements/file-upload.js"`.
- `packages/opui/components/AGENTS.md`: forced colors "with a block" list.
- `tests/unit/forced-colors.test.ts`: the list it checks.
- Generated: `public/search-index/*.json`, parity snapshots.

## Tests

- Unit: component contract, parity, naming (`removeLabel` next to `remove-icon`, `filesLabel`), example coverage, component types, and an `elements.test.ts` check that the icons in `FileUpload/icons.ts` are the ones the component renders into the templates.
- E2E in `tests/e2e/interaction.spec.ts`:
  - `setInputFiles` twice with `multiple` keeps both picks; the list shows names and sizes formatted for `lang`.
  - A synthetic `drop` (`page.dispatchEvent` with a `DataTransfer` built in the page) adds files, sets `:state(drag-over)` during `dragover`, and rejects a file outside `accept` with a `reject` event and a validity message.
  - Removing a row updates `input.files.length` and `FormData`, and moves focus as described.
  - `form.reset()` empties the list and revokes the preview URLs (spy on `URL.revokeObjectURL`).
  - `required` with no files blocks submit.
- Engines: run in Firefox and WebKit with the `e2e-engines` label. Assigning `input.files` from a `DataTransfer` and `:state()` are both in all three engines; anything that fails is an engine bug with `failsIn()`, a reason in `tests/e2e/engine-bugs.ts` and a repro in `tests/e2e/engines.spec.ts`.
- iOS Safari can't be driven by the e2e projects and has no drag and drop from Files on most devices: add a `## To check` item in `TODO.md` with steps (pick two photos, remove one, submit).
- Visual baselines from CI only.

## Steps

1. Add the `:state()` detector and its test; `pnpm exec vitest run tests/unit/check-scripts.test.ts`.
2. Write `file-upload.css` against a hand-written HTML example with a static list; `pnpm sort-css:check`, `pnpm check-css-vars`.
3. Write `elements/file-upload.js` and `.d.ts`; exercise picks, drops, removal and reset in `pnpm dev`.
4. Write `FileUpload.astro`, `icons.ts`, `types.ts`, `types.astro.ts`; `pnpm build-components`; `pnpm check-ports`.
5. Barrels, element typings, `api.ts`, custom properties; no `[component-api]` problems in `pnpm test`.
6. Examples, `pnpm build-examples`, the docs page; `pnpm check:fast`.
7. Interaction tests; `pnpm test:e2e --project=light --project=dark -g "file-upload"`.
8. CHANGELOG, What's new, release check, skill reference, README, package test, guide lists.
9. Blocks and the forms stress page; `OPUI_APPS=next pnpm test:apps`.
10. `pnpm check`, push, `update-snapshots` and `e2e-engines` labels.

## Open questions

1. A bound `files` model in Vue and Svelte (`v-model` of `File[]`)? Recommended: not in this version. Files can't come from the server, and a one-way `onChange` covers every form; add `model` later if apps ask, reading `element.files` on `change`.
2. Should the zone render inside the FileUpload root as a `TextField`, or should FileUpload wrap any child file input the reader writes (`<FileUpload><TextField type="file" dropZone /></FileUpload>`)? Recommended: render it, so the props stay in one place and the HTML stays copyable; the element itself only needs `:scope input[type="file"]`, so wrapping a hand-written field in HTML still works.
3. A grid of thumbnails (`.ui-grid`, Nuxt's `layout="grid"`) in this PR? Recommended: a follow-up, once the list rows are reviewed.
4. Should the native "3 files" text stay visible next to the list? Recommended: hide it with `:state(has-files)` as planned; it repeats the list less precisely and can't be translated.
