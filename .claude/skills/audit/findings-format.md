# Findings format

Every audit agent reports findings in this format, so `/audit` can merge them and add them to `TODO.md` without rewriting.

## Rules

- Verify every finding before reporting it: open the file, read the lines, and confirm the problem is there on the current code. Drop anything you can't confirm.
- Check `TODO.md` first. Skip a finding that is already listed, open or done, unless it came back after being fixed. Then say so.
- Cite every file with a line or line range, `path/to/file.css:12-18`. `tests/unit/todo.test.ts` checks that the files an open item's headline cites exist and the lines fit them.
- Severity is 1-10, 10 is the most severe. Most findings are 1-3. Use 4 and up for broken behavior, inaccessible components or wrong docs that users copy.
- Keep each finding to what is wrong and where. Put the fix in a `Fix:` note, with a code block when the fix is code.
- Start the notes with `Summary:`, what the reader or user notices with no fix, and `Recommended:`, the action the `/todo` page offers, chosen with the rules in `.claude/skills/todo-triage/SKILL.md`. `tests/unit/todo.test.ts` checks their order, the sentence, its length and the action.
- When there's more than one way to fix it, give the choices as an `Options:` list (see below), which the `/todo` page turns into a radio group.
- Report only. Never edit, create or delete files.
- If you find nothing, say so in one line.

## Item

One finding per item, in the `TODO.md` item format. `Component:` is the component name, a docs page title, or an area from `AREAS` in `tests/unit/todo.test.ts` when it isn't one component.

````md
- [ ] (2) Component: what is wrong, in one or two sentences (`path/to/file.css:12-18`, `path/to/Other.astro:4`)
  - Summary: What the reader or user notices, in one plain sentence.
  - Recommended: Fix. The change is small and matches the other components.
  - Fix: what to change.
    ```css
    .ui-example {
      color: var(--ui-text-strong);
    }
    ```
````

The headline's text before its file references is the item's identity: the `/todo` page keys the user's answers on it, so later notes never change it. Correct a stale citation in the closing file references in place.

With several fixes, `Fix:` keeps what applies to all of them, such as what to confirm first, and each choice is a lettered item under `Options:`. Put a choice's code block under its own item. When the fix only applies if something happens, name it in the heading, such as `Options if a browser fails:`. For example:

````md
- [ ] (2) Component: what is wrong (`path/to/file.css:12-18`)
  - Summary: What the reader or user notices, in one plain sentence.
  - Recommended: Fix with option A. It keeps the API as documented.
  - Fix: confirm first on `/html/components/example/` (Basics).
  - Options:
    - A (recommended): what to change.
      ```css
      .ui-example {
        color: var(--ui-text-strong);
      }
      ```
    - B: the other way to fix it.
````

## Report

Group the items under the `TODO.md` section they belong in, sorted by severity, lowest first, like `TODO.md`:

- `## Accessibility`
- `## Bugs`
- `## Docs`
- `## Limitations`
- `## Questions`
- `## Suggestions`
- `## To check`

End with one line: what you checked, such as "Checked 12 CSS files and 3 docs pages."
