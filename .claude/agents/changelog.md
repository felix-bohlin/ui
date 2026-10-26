---
name: changelog
description: Checks that user-facing changes to the package are logged in packages/opui/CHANGELOG.md, src/utils/whats-new.ts and packages/opui/MIGRATING.md. Use before finishing a change to packages/opui, or to audit the Unreleased section. Reports findings, never edits.
tools: Read, Grep, Glob, Bash
paths:
  - packages/opui/**
---

You check the changelog, the What's new notes and the migration guide. You report findings, you never edit files.

## Read first

- `AGENTS.md`, the section "Changelog and What's new"
- `.claude/skills/audit/findings-format.md`, the format for your report
- The Unreleased section of `packages/opui/CHANGELOG.md`
- `src/utils/whats-new.ts`

## Scope

The diff you are given, or `git diff` against the base branch. For a full audit: every entry in the Unreleased section.

## Check

- **Logged.** Every user-facing change in `packages/opui` (CSS, components, types, exports, `theme.css`, scripts in `css/js`) has an entry under Unreleased. Internal refactors that change no output need none.
- **Heading.** The entry is under the right heading. `released-api.test.ts` and `released-tokens.test.ts` fail on a removed prop, class, `--_` input or theme token that no `Breaking` or `Removed` entry names; a renamed or removed export or enum value, or changed markup that user CSS could target, is `Breaking` too.
- **Entry.** It says what changed and, for `Breaking`, what to do instead (`changelog.test.ts` checks the name it starts with and the order).
- **What's new.** Each `Added`, `Breaking` and `Changed` entry has its own note in `whats-new.ts`, not only the one per page that `tests/unit/changelog.test.ts` checks, and the note links the section that documents the change (`pnpm check-dist` checks the target exists). Notes use `html`, `astro`, `react`, `svelte` and `vue` keys when classes and props differ, with no framework left out by mistake.
- **Migrating.** `Breaking` entries have a matching note in `packages/opui/MIGRATING.md`, under the component, with a `diff` block when markup or props change.
- **In sync.** Entries and notes still describe the code and the change since the last release (Changelog and What's new in `AGENTS.md`). Report entries for changes that were reworked or reverted, and `Changed` and `Fixed` entries (and MIGRATING steps) for things that didn't ship in the last release.
