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

`node scripts/todo.mjs list --missing-triage` prints, as JSON, the open items that lack a `Summary:` or a `Recommended:` note, with their `section`, `component`, `files`, `options` and the last answer. Section titles (`Docs`, `Questions`) or component names (`Select`, `Tabs`) in the arguments keep only the items with that `section` or `component`.

With more than about 20 items, split them by section across parallel subagents, each following steps 1 to 3 and returning its JSON, and run step 4 once on the merged list.

## Steps

For each item:

1. Read the file references at the end of the headline (`path:12-18`). For severity 4 and up, confirm the problem is in the current code. If the finding no longer holds, recommend `Remove issue` and say why; if the severity looks wrong, say so in the reason and leave the headline alone.
2. Write `Summary:`: what the reader or user notices, no fix.
3. Write `Recommended:` with the first rule that applies:
   - An option marked `(recommended)` exists: `Fix with option X`.
   - An `Options:` list without a mark: pick the option that follows the repo rules (`AGENTS.md`, `packages/opui/components/AGENTS.md`, `src/docs/components/AGENTS.md`) and give the reason.
   - A single `Fix:` and no options: `Fix`.
   - The finding is moot, already done, or contrary to a decision recorded in a done item or a `> ` answer: `Remove issue`, with the reason.
   - A question of taste or scope, for example in `## Questions`: `Explain further`.
   - The user can only decide after seeing it: `Explain further and provide an example`.
     A reason follows after a period, one short sentence.
4. Write the notes as JSON, `[{ "line", "summary", "recommended" }]`, leaving out a note the item has, and run `node scripts/todo.mjs triage <file>`. It puts them first under the headline and rejects a recommendation the `/todo` page can't offer.

Then run `pnpm exec prettier --write TODO.md`, `pnpm exec vitest run tests/unit/todo.test.ts` (it checks the format) and `pnpm check-characters`, and commit with `chore: add summaries and recommendations to open todos`.

## Report

One line per recommended action with its count, then the items recommended for removal with their reasons.
