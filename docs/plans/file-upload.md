# FileUpload: what is built and what remains

Status: built on this branch. This file started as the plan for a native form control and now describes the component as it is, with the parts of the plan that are still open at the end.

## Summary

FileUpload is a drop zone around a visually hidden `<input type="file">` and a list of the files the app is uploading, each with a preview, its name, a `Progress`, a message and a remove button. It is controlled and uploads nothing: the app passes the files as `items`, and the `<opui-file-upload>` custom element reports `select` (the new files of one pick or drop) and `remove` (which file). Narrower than `28rem` of its own width it is one row: an add tile, then square previews that scroll sideways.

## Why the model changed

The first plan kept the native input as the source of truth, merging picks into `input.files` through a `DataTransfer`, and left upload state out. Fredahead built a FileUpload in the upstream shape and used it on four pages (field notes on the pull request, 10 and 17 November). What it showed:

- None of the four pages posts files. They upload on pick, resize first, and post ids, so the input's `files` were never what the app needed. It needed the new files once per pick, and a place to show each file's state.
- Every page needed four states per file: queued, uploading with progress, done, and an error with a message. Rows without room for that would change their markup later.
- On a phone the drop zone and a list of file names take most of a composer, a phone can't drag files, and an iPhone's names are `IMG_4821`. The layout that worked is one row of square previews with the add tile first.

So the component follows the working version: controlled `items`, two events, and a compact layout. The native form mode is still worth having and is the first open question.

## Markup

```html
<opui-file-upload class="ui-file-upload">
  <div class="ui-content">
    <div class="ui-field-container">
      <label class="ui-label">
        <input
          accept="image/*"
          aria-describedby="photos-description"
          class="ui-sr-only"
          id="photos"
          multiple
          type="file"
        />
        <span class="ui-button ui-outlined">Choose photos</span>
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        ></svg>
      </label>
      <span class="ui-description" id="photos-description"
        >Or drop them here. PNG or JPG.</span
      >
    </div>
    <ul class="ui-list">
      <li class="ui-error">
        <div class="ui-start">
          <img alt="" src="..." />
          <button
            aria-labelledby="photos-label-0 photos-description-0"
            popovertarget="photos-description-0"
            type="button"
          ></button>
        </div>
        <div class="ui-text">
          <p dir="auto" id="photos-label-0">holly-humbucker.png</p>
          <p class="ui-description" id="photos-description-0" popover="auto">
            This photo is larger than 10 MB.
          </p>
        </div>
        <div class="ui-end">
          <button
            aria-label="Remove holly-humbucker.png"
            class="ui-button ui-round ui-small"
            command="--remove"
            commandfor="photos"
            type="button"
            value="holly"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 32 32"
              width="32"
              height="32"
            ></svg>
          </button>
        </div>
      </li>
    </ul>
  </div>
  <span class="ui-sr-only" role="status">1 photo didn't upload.</span>
</opui-file-upload>
```

- The drop zone is `.ui-field-container`. Its `<label>` holds the input and the visible trigger, a `<span class="ui-button">`, since a label may not hold another labelable element, and covers the zone with its `::after`, so a click anywhere opens the picker. The hint is outside the label and linked with `aria-describedby`, so the input's name is the trigger's text alone.
- The files are List rows (`ul.ui-list > li` with `.ui-start`, `.ui-text` and `.ui-end`). A file that is queued or uploading has a `Progress` in `.ui-text`, a failed one has `.ui-error`, and the remove button is there in every state.
- A failed file's message has `popover`, and a `<button popovertarget>` in `.ui-start` opens it. In a List row the button is hidden and the message reads inline. In the compact row the button covers the preview and the message opens below it, since the scrolling row would clip anything else. The message is in the page once.
- One `role="status"` region for the whole component, always in the page, not an alert per row.
- No part classes of its own: every part is a class from the closed part list or another component's root.

## CSS

`packages/opui/css/components/file-upload.css`, in `components.extended`, since its rules land on `.ui-list` rows and a `.ui-button`.

- The root is the size container (`container: ui-file-upload / inline-size`). A container query can't restyle its own container, so the zone and the list sit in `.ui-content`.
- `@container ui-file-upload (inline-size < 28rem)` is the compact row: `.ui-content` becomes two columns, the zone a square add tile with its plus icon, the list a row that scrolls sideways, each `<li>` a square with the remove button in the corner and the progress along the bottom edge. The trigger's text, the hint and the file names are visually hidden.
- Nothing in the query sets `display`, `white-space` or `content`, because the display model of `scripts/example-display.mjs` evaluates no conditions. The list is a flex column that turns into a row, the plus icon has no size until the row gives it one, the failed file's button is `visibility: hidden` until then, and the hidden texts use `text-wrap: nowrap`.
- `:state(drag-over)` on the root tints the zone and turns its border from dashed to solid, a cue that survives forced colors, where the border gets `Highlight`.
- The plus icon, the remove icon and the mark on a failed preview are masks of `--ui-icon-increase`, `--ui-icon-close` and `--ui-icon-invalid`.
- Inputs: `--_item-size` (the tile and previews of the compact row, `4.75rem`), `--_preview-size`, `--_preview-bg-color` and `--_description-max-inline-size`.

## Behavior

`packages/opui/elements/file-upload.js`, light DOM, defined as `opui-file-upload`.

- A pick: on `change` the element reads `input.files`, keeps the files the input's `accept` allows (extensions, MIME types and `type/*`, the same check for picks and drops, since a desktop dialog lets the person switch its filter off), keeps only the first without `multiple`, clears the input so the same file can be picked again, and fires `select` with `detail.files`. Files the browser restores into the input, or that were picked before a framework hydrated, fire `select` the same way once the element is ready.
- A drop: `dragenter` and `dragover` set the `drag-over` state and allow the drop only when `dataTransfer.types` includes `"Files"` and the input doesn't match `:disabled`, which also covers a disabled fieldset. A drop anywhere on the root counts.
- Removal: a button with `command="--remove"` whose `commandfor` is the input fires `remove` with its `value` in `detail.value`. The element removes nothing. When the row is gone, and focus was lost with it, focus moves to the remove button of the row now in its place, or else the last row's, or else the input.
- Property: `readonly input`. Events: `select` and `remove`, both bubbling.

## Component API

`FileUpload`, compiled by `pnpm build-components` for React, Solid, Svelte and Vue. Nothing is hand-written.

| Prop            | Type               | Default               |
| --------------- | ------------------ | --------------------- |
| `accept`        | `string`           |                       |
| `description`   | `string`           |                       |
| `disabled`      | `boolean`          | `false`               |
| `items`         | `FileUploadItem[]` |                       |
| `label`         | `string`           | required              |
| `multiple`      | `boolean`          | `false`               |
| `progressLabel` | `string`           | `"Uploading {label}"` |
| `removeLabel`   | `string`           | `"Remove {label}"`    |
| `status`        | `string`           |                       |

- A `FileUploadItem` is `{ description?, label, preview?, progress?, state, value }`, with `state` one of `"done"`, `"error"`, `"queued"` and `"uploading"` and `progress` from 0 to 1. The keys follow the naming model (`label`, `value` and `description`).
- Events: `onSelect` and `onRemove` in React and Solid, `onselect` and `onremove` in Svelte, `@select` and `@remove` in Vue, each with the element's `CustomEvent`.
- Other attributes go to the root. `id` names the input, and the description, label and message ids start with it.
- No `name`: the input is cleared after each pick, so it would post an empty file.

## Open questions

1. A native form mode, the first plan: accumulate `input.files` through a `DataTransfer`, so the files post with the form, reset with it, validate `required` and work before the script loads. It needs rows the element renders itself, since `items` can't come from the server for files that exist only in the browser.
2. `max-size` and `max-files`, with a `reject` event (`reason`: `"accept"`, `"count"` or `"size"`). Today a file outside `accept` is left out silently, and the app enforces its own limits in `select`.
3. Label and description slots for rich content, and `remove-icon` for the remove button, which need the slot names added to the naming model.
4. A message on a file that hasn't failed is visually hidden in the compact row. Should every file with a message open it there?
5. De-duplication stays with the app: `select` fires again for a file that is already listed, so a failed file can be retried by picking it again.
6. Pasting files, folders (`webkitdirectory`) and image decoding or resizing are the app's job.
7. An anatomy diagram on the docs page, and the blocks the first plan named (`account-settings`, `file-manager`).
8. Phones: checked in Chromium at phone widths only. `TODO.md` has no item yet for a real iPhone and Android pass.
