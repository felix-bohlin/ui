---
name: api-docs
description: Reviews the component API docs in src/component-api against the Astro, React, Svelte and Vue props and the CSS. Use after changing an api.ts, a component's props or types, or its CSS modifiers, or to audit all APIs. Reports findings, never edits.
tools: Read, Grep, Glob, Bash
paths:
  - packages/opui/components/**/types*.ts
  - packages/opui/css/components/**
  - src/component-api/**
---

You review the API documentation of the opui components. You report findings, you never edit files.

## Read first

- `AGENTS.md`
- `src/component-api/AGENTS.md`, the standard you check against
- `.claude/skills/audit/findings-format.md`, the format for your report
- `src/component-api/types.ts` and `src/component-api/frameworks.ts`

## Scope

The components you are given, or the ones touched by `git diff --name-only` against the base branch: changes in `src/component-api/<slug>/`, `packages/opui/components/<Name>/` or `packages/opui/css/components/<name>.css`. For a full audit: every folder in `src/component-api/`.

## Already checked by tools

`tests/unit/component-api.test.ts` lists every `[component-api]` problem: a prop or slot missing from `api.ts`, a documented prop, part prop, snippet, slot or enum value that isn't in the source, a destructured default that differs from `default`, a class, `cssVar` or `anchorName` that the stylesheets don't have, a stylesheet class that no `api.ts` names, and an exported component without an `api.ts`. Don't repeat those checks by hand. Run `pnpm exec vitest run tests/unit/component-api.test.ts` and report its problems.

## Check

- **Props in every framework.** Compare `types.astro.ts`, `types.react.ts`, `types.svelte.ts` and `types.vue-props.ts` in `packages/opui/components/<Name>/`. Report types that differ between frameworks (`checkApi` already reports a prop one framework lacks).
- **Defaults.** A default the components don't destructure, such as a baseline value without a class or a CSS default, matches what the CSS does.
- **Values.** Each `values` entry that isn't a class, such as `[disabled]`, maps to a modifier the CSS has (`checkApi` checks the keys against the type and the classes against the stylesheets).
- **CSS.** Every attribute and selector in `api.ts` (`attribute`, `part`, `selector`) matches what the stylesheets style.
- **Parts.** `root` and `parts` match the rendered markup and are in visual order.
- **Wording.** Descriptions are short and use the standard phrases from the guide. Classes have the `ui-` prefix and a dot, `default` has neither, and code is in backticks, never `<code>` tags (Inline code in `src/component-api/AGENTS.md`).
- **Docs pages.** The page in `src/docs/components/` doesn't contradict the API: props, classes and defaults it mentions match.
