# A 5.x to 6.0 migration command: is it feasible?

An exploration from 2026-11-27, against the 5.4.3 tag and npm tarball, the 6.0.0-rc.7 tarball and this branch. The prototype and its measurements lived in a session scratchpad and are not in the repository; the numbers below are what they measured.

## Answer

Yes, for a narrow and honest scope. A command can rename the 5.x theme tokens, most private `--_` properties and about two thirds of the removed classes in CSS and HTML, idempotently and checkably, and point at the MIGRATING section for everything else. It cannot migrate an app: 61 of the 136 Breaking and Removed entries need judgment, and the most common real 5.x pattern, a token override on part of the page, still compiles after a rename and no longer does anything.

The promise to make: "renames the theme tokens, private properties and classes that have one new name, in CSS, HTML and the custom properties of any file, and lists everything else with the guide section to read."

## Inventory

`parseRenames()` (`src/utils/renames.ts`) reads 137 pairs from `MIGRATING.md`. Classified by what a tool needs:

- **(a) Context-free renames**, safe anywhere: 87 of the 90 theme tokens 5.4.3 declares, 38 private properties, 17 class renames and 3 plain class removals.
- **(b) Syntax-aware**: renames whose target depends on the component or the markup around them, such as `--_border-color` (Card only, while 18 components keep it), `--_size` (Badge's becomes `--_indicator-size`, 17 components keep it), `.ui-text-field`, `.ui-select` and `.ui-textarea`, every prop rename (`variant` means `density`, `shape` or stays), the 18 import changes and the four field slots.
- **(c) Judgment**: structural changes (TextField, Select and Textarea to `Field` with your own control and ids, Range, Toast, IconButton, slots to parts), ids a tool would have to invent, visual changes, and private properties whose value changes type (the transition times became the `--_motion` multiplier).

By CHANGELOG entry (117 Breaking, 19 Removed): 8 are (a), 67 are (b) and 61 are (c).

5.4.3 exported components for Astro and Vue only, so prop migration is an Astro and Vue problem; React, Svelte and Nunjucks code written against 5.x can only hold classes and tokens.

### What breaks idempotence

- A chain inside one component: `.ui-text-field` becomes `.ui-field` while the old `.ui-field` box becomes `.ui-field-container`.
- A target that is another context's old name: a dialog's `.ui-actions` becomes `.ui-footer` while a field's `.ui-footer` becomes `.ui-bottom`.
- Many to one: Range's `--_thumb-bg`, `--_thumb-highlight-color` and `--_track-fill-color` all become `--_accent`.
- Generic names: the prefix regexes also rename a project's own unrelated `--primary`.
- The 6.0 release candidates' space steps (3 to 8 became 4 to 8 and 12), a chain: one run gives `--ui-space-4`, a second `--ui-space-5`.

The rule that makes (a) provably idempotent: apply a rename only when its old name is gone from 6.0 and its new name is no other rename's old name. The derived table has no rename whose target is another's source, and a second run over the 199 5.4.3 HTML examples changed nothing.

## How to guarantee it

- **One tested table.** Make the MIGRATING rename table structured (`Component`, `Old`, `New`, `Kind`: rename, remove or context) and generate both the release page and the command's data from it. Test that every 5.4.3 token, class, private property and prop is unchanged in 6.0 or has a row, that every new name exists in 6.0, and that no (a) row's new name is another row's old name.
- **The guide's diff blocks are the fixtures.** MIGRATING has 141 `diff` blocks; each one marked tool-solvable must turn its `-` side into its `+` side. The prototype solved 14 of them exactly (4 CSS, 10 HTML); 72 are Astro or Vue components and 7 are imports.
- **The 5.4.3 examples are a smoke test, not an oracle.** 123 of the 199 5.4.3 HTML examples have a 6.0 example of the same name, but 41 of the pairs differ because the 6.0 example was rewritten, not migrated.
- **It never claims more than it did.** `--dry-run`, a refusal in a git tree with uncommitted changes, a report of every name it left with the MIGRATING section to read (gone names, kept names in a changed context, token overrides on part of the page), then `npx opui-css check` for the fields. On the migrated 5.4.3 HTML, `check` reported all 98 unmigrated field boxes.

## Prototype numbers

| Input                                               | 5.x-only names before | Left after | Renamed | Second run |
| --------------------------------------------------- | --------------------- | ---------- | ------- | ---------- |
| 199 HTML examples, the table as parsed today        | 310                   | 185        | 125     | no change  |
| Same, with the parser gaps filled                   | 310                   | 169        | 141     | no change  |
| 56 stylesheets and `<style>` blocks of the 5.x docs | 284                   | 0          | 290     | no change  |

Every name left in the HTML is (b) or (c): `.ui-text-field` 49, `.ui-icon-button` 27, `.ui-select` 25, `.ui-textarea` 24, `.ui-range` 18 and a few more.

In the 5.4.3 docs' own CSS, 45 of the 56 declarations of 5.x tokens sit on a selector other than `html`, `:root` or `.ui-palette`. After the rename they are valid 6.0 names that no longer reach the components (`MIGRATING.md`, Theme and tokens). A tool can flag them, not fix them.

## Gaps the exploration found

- Fixed on 2026-11-27: `--motion` and `--anchor-position-area` were public in 5.4.3 (read by ten components and set in seven examples) and are `--ui-motion` and `--ui-anchor-position-area` in 6.0, with no MIGRATING row or Breaking entry. Both are in the prefix regexes and the naming model entry now.
- `tests/unit/released-tokens.json` lists 57 tokens, but 5.4.3 declares 90: it leaves out `--color-1` to `--color-16`, `--gray-1` to `--gray-16` and `--color-scheme`, which `core/palette.css` declares.
- `parseRenames()` misses `.ui-palette` to `.ui-scope`, `.ui-border-tonal`, the field's `.ui-prefix`, `.ui-suffix`, `.ui-header` and `.ui-footer` and a few props, drops the removed rows, keeps only the first row's scope where rows merge, and lists `Select`, `TextField` and `Textarea` to `Field` as import renames.

## Cost

- **(a) with `--dry-run`, the clean-tree refusal, `--from`, the report and the tests: 2 to 3 days.** The prototype was about 200 lines; the work is the structured table and its tests.
- **(b) for Astro and Vue props, slots to parts, imports and class strings: 1 to 2 weeks**, mostly fixtures per framework, worth it only for the frequent ones (ListItem `headline` 50 times and FieldGroup `direction` 20 times in the 5.4.3 Astro examples).
- The table freezes once 6.0.0 ships, but the command is public API: a CHANGELOG entry, a README section and a test.

## The release candidates

rc.7 to 6.0 fits the same command and table: the synonym renames and `.ui-palette` to `.ui-scope` are context-free, the space steps need `--from 6.0.0-rc.7` and the clean-tree refusal, and the private limits and the removed border variants are report-only, since whether a theme's `--ui-text-max-chroma` meant the new accent guard is the author's call.
