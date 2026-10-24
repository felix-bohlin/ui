---
name: todo-triage
description: Adds a one-sentence Summary and a Recommended action to the open items in TODO.md that lack them, so the /todo page can show a short headline and an Accept button. Use after findings were added by hand, or when the user asks to triage, summarize or recommend todos.
argument-hint: "[<section>… | <component>…]"
---

# Todo triage

Give every open `TODO.md` item a `Summary:` and a `Recommended:` note. You only add notes; you never fix anything, and you never change an item's headline line, which the `/todo` page keys the user's answers on.

## Read first

- `AGENTS.md`, the `## TODO.md` and `## Characters` sections.
- `.claude/skills/audit/findings-format.md`, the item format and the note syntax.

## Scope

- No arguments: every `- [ ]` item that lacks a `Summary:` or a `Recommended:` note.
- Section titles (`Docs`, `Questions`): only the items in those sections.
- Component names (`Select`, `Tabs`): only the items whose headline starts with that component.

With more than about 20 items, split them by section across parallel subagents, each following this skill, and merge their edits.

## Steps

For each item:

1. Read the file references at the end of the headline (`path:12-18`). For severity 4 and up, confirm the problem is in the current code. If the finding no longer holds, recommend `Remove issue` and say why; if the severity looks wrong, say so in the reason and leave the headline alone.
2. Write `Summary:`: one plain sentence, what the reader or user notices, no file paths, no fix, under about 140 characters, ending with a period.
3. Write `Recommended:` with the first rule that applies:
   - An option marked `(recommended)` exists: `Fix with option X`.
   - An `Options:` list without a mark: pick the option that follows the repo rules (`AGENTS.md`, `packages/opui/components/AGENTS.md`, `src/docs/components/AGENTS.md`) and give the reason.
   - A single `Fix:` and no options: `Fix`.
   - The finding is moot, already done, or contrary to a decision recorded in a done item or a `> ` answer: `Remove issue`, with the reason.
   - A question of taste or scope, for example in `## Questions`: `Explain further`.
   - The user can only decide after seeing it: `Explain further and provide an example`.
     The action is exactly one of `Fix`, `Fix with option X`, `Remove issue`, `Explain further`, `Explain further and provide an example`. With an `Options:` list it is always `Fix with option X`. A reason follows after a period, one short sentence.
4. Insert both notes as the first two notes under the headline, `Summary:` first, before `Fix:`, `Options:`, `Still open:` and the `> ` answers.

Then run `pnpm exec prettier --write TODO.md`, `pnpm exec vitest run tests/unit/todo.test.ts` (it fails on an action the page doesn't offer, or an option id the item doesn't have) and `pnpm check-characters`, and commit with `chore: add summaries and recommendations to open todos`.

## Report

One line per recommended action with its count, then the items recommended for removal with their reasons.
