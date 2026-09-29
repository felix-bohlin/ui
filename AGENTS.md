## Sorting

Always sort and order items in ascending order (ASC) whenever possible. This applies to:

- Lists
- Query results
- Arrays
- Data displays
- Any other sortable content

Use ascending order (lowest to highest, A-Ö, oldest to newest) as the default sorting preference.

## Comments

- Never remove comments unless asked to.
- Never add your own comments unless asked to do so. Only retain comments that are already present in the code.

## Typescript

- ALWAYS use type over interface unless interface is specifically required.
- ALWAYS prefer inference over explicit types.

## Commit messages

- Use feat, fix, docs, chore, revert, refactor as commit message prefixes.
- Keep it short
- ONLY explain what, NOT why.

## Testing

- ALWAYS run `pnpm check` before finishing a change. It runs formatting, linting, component checks, type checks, unit tests and the build.
- Run `pnpm test:e2e` when a change affects rendering or behavior. It runs visual, accessibility and interaction tests against the fixture pages at `/<framework>/test/<component>`.
- Parity tests render every example in `src/component-examples/` for Astro, Vue and HTML and compare the markup. Astro output must match the HTML example and Vue output must match Astro. One markup snapshot per example lives in `tests/unit/__snapshots__/`; accepted drift is recorded next to it as a `.diff` file per framework.
- NEVER update snapshots, add or change `.diff` files, or edit `tests/e2e/a11y-known-violations.json` to make a failing test pass unless the change is intended. Say so in the commit message when you do.
- When a recorded drift or violation is fixed, the test fails until its `.diff` file or ledger entry is removed. Re-record intended drift with `pnpm test:record-drift` and violations with `pnpm test:e2e:record-a11y`.
- Visual baselines are only generated in CI. Add the `update-snapshots` label to a PR to regenerate them. Never commit screenshots generated locally.
