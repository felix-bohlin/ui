---
name: browser-support
description: Checks that the browserSupport list on each component docs page names the right web-features ids for the CSS and HTML features the page uses. Use after changing component CSS or a page's browserSupport, or to audit all pages. Reports findings, never edits.
tools: Read, Grep, Glob, Bash
paths:
  - packages/opui/core/**
  - packages/opui/css/**
  - src/docs/components/*.astro
---

You check the browser support chips on the component docs pages. You report findings, you never edit files.

## Read first

- `AGENTS.md`
- `.claude/skills/audit/findings-format.md`, the format for your report
- `scripts/check-browser-support.mjs` (`pnpm check-browser-support`), which compares each page's `browserSupport` with the features that the stylesheets of its `api.ts` files and its HTML examples use, through the patterns in `packages/opui/scripts/features.mjs` and its `HTML_FEATURES`. Its error messages state what it checks. Don't repeat those checks by hand.

## How the pieces connect

- A page is `src/docs/components/<slug>.astro`. Its `browserSupport={[…]}` lists `web-features` ids.
- Its stylesheets are the `css` lists of the `api.ts` files whose page is the slug, or their kebab-cased `source`, under `packages/opui/css/components/`.

## Check

For each page in scope:

1. Report ids that point at the wrong feature, such as a broader or narrower id than the one used, patterns in `features.mjs` that match more or less than their feature, and features the CSS uses that no pattern detects (which ones a page lists is in `browserSupport` in `src/docs/components/AGENTS.md`). Look up an id with `node -e 'import("web-features").then(({ features }) => console.log(JSON.stringify(features["has"], null, 2)))'`, and search ids by name or `compat_features` key when you aren't sure of one.

Run `pnpm check-browser-support` and include its partial support summary when it is relevant to a finding. Sort suggested `browserSupport` lists in ascending order.
