# Findings format

Every audit agent reports findings in this format, so `/audit` can merge them and add them to `TODO.md` without rewriting.

## Rules

- Verify every finding before reporting it: open the file, read the lines, and confirm the problem is there on the current code. Drop anything you can't confirm.
- Check `TODO.md` first. Skip a finding that is already listed, open or done, unless it came back after being fixed. Then say so.
- Cite every file with a line or line range, `path/to/file.css:12-18`.
- Severity is 1-10, 10 is the most severe. Most findings are 1-3. Use 4 and up for broken behavior, inaccessible components or wrong docs that users copy.
- Keep each finding to what is wrong and where. Put the fix in a `Fix:` note, with a code block when the fix is code.
- Report only. Never edit, create or delete files.
- If you find nothing, say so in one line.

## Item

One finding per item, in the `TODO.md` item format. `Component:` is the component name, or the area (`CSS`, `Docs`, `Learn`, `Changelog`) when it isn't one component.

````md
- [ ] (2) Component: what is wrong, in one or two sentences (`path/to/file.css:12-18`, `path/to/Other.astro:4`)
  - Fix: what to change.
    ```css
    .ui-example {
      color: var(--text-primary);
    }
    ```
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
