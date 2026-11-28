---
name: browser-support
description: Checks that the browser support chips of each component docs page name the right web-features ids for the CSS and HTML features the page uses, as the catalog computes them. Use after changing component CSS, the feature patterns or a page's feature exceptions, or to audit all pages. Reports findings, never edits.
tools: Read, Grep, Glob, Bash
paths:
  - packages/opui/core/**
  - packages/opui/css/**
  - packages/opui/scripts/features.mjs
  - src/component-api/browser-features.mjs
  - src/component-api/pages.ts
---

You check the browser support chips on the component docs pages. You report findings, you never edit files.

## Read first

- `AGENTS.md`
- `.claude/skills/audit/findings-format.md`, the format for your report
- `scripts/check-browser-support.mjs` (`pnpm check-browser-support`), which checks the ids the catalog computes, the feature exceptions and the `fallbacks` sentences. Its error messages state what it checks. Don't repeat those checks by hand.

## How the pieces connect

- `featuresOf(slug)` in `src/component-api/catalog.ts` computes a page's ids: the features that the stylesheets of its `api.ts` files use in rules its HTML examples and `api.ts` classes can match, through the patterns in `packages/opui/scripts/features.mjs`, and the HTML features of its examples (`HTML_FEATURES` in `src/component-api/browser-features.mjs`).
- Its stylesheets are the `css` lists of the `api.ts` files whose page is the slug, or their kebab-cased `source`, under `packages/opui/css/components/`.
- The page's entry in `src/component-api/pages.ts` holds what can't be computed: `features.core`, ids the page gets from the core sheets, `features.ignore`, ids its stylesheets use that the page doesn't count, and `fallbacks`, a sentence per id some browser lacks.

## Check

For each page in scope:

1. Report ids that point at the wrong feature, such as a broader or narrower id than the one used, patterns in `features.mjs` that match more or less than their feature, features the CSS uses that no pattern detects, and exceptions in `pages.ts` that hide or add an id they shouldn't (which ids a page counts is in Browser support in `src/docs/components/AGENTS.md`). Look up an id with `node -e 'import("web-features").then(({ features }) => console.log(JSON.stringify(features["has"], null, 2)))'`, and search ids by name or `compat_features` key when you aren't sure of one.

2. Report a `fallbacks` sentence that says more or less than the component CSS and `packages/opui/css/compat/` do without its feature (see `fallbacks` in `src/docs/components/AGENTS.md`).

Run `pnpm check-browser-support` and include its partial support summary when it is relevant to a finding. Sort suggested id lists in ascending order.
