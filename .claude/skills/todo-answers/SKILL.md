---
name: todo-answers
description: Applies the answers the user copied from the /todo page ("TODO.md with my comments") to TODO.md, does what each answer asks and records the outcome. Use when the user pastes that text or asks to work through their todo answers.
argument-hint: "[pasted answers]"
---

# Todo answers

Take the text the user copied from the `/todo` page, add the answers to `TODO.md`, do the work and record what happened.

## Read first

- `AGENTS.md`, the `## TODO.md`, `## Changelog and What's new` and `## Testing` sections.
- `.claude/skills/audit/findings-format.md`, the item format.

## Input

The text starts with `TODO.md with my comments`, then per section a `## Title` heading and, per answered item, the item's line from `TODO.md` followed by ` >` lines. The first `> ` line is the action when it is one of `Explain further`, `Explain further and provide an example`, `Fix`, `Fix with option X` or `Remove issue`; the other `> ` lines are the user's comment. It comes in the arguments or in the next message; ask for it if neither has it.

## Steps

1. Locate each item in `TODO.md` by its exact line. If the line isn't there, look in the same section for a headline that starts with the same first 80 characters, and say so when it is ambiguous or missing.
2. Append the `> ` lines after the item's existing notes, the action first, then the comment, word for word: the `/todo` page drops the saved answer only when they match it. Keep the `Summary:` and `Recommended:` notes as they are.
3. Act on each item, in file order:
   - `Fix` or `Fix with option X`: implement it (option X from the item's `Options:` list), following the comment. Mark the item `- [x]` and add `- Fixed: what changed and where`, naming any intended snapshot or drift update.
   - `Remove issue`: mark it `- [x]` and add `- Removed: the reason`.
   - `Explain further`: add `- Explained: …` under the answer. The item stays open.
   - `Explain further and provide an example`: add `- Explained: … Example: <name>` and create `src/todo-examples/<name>.html`, registered in `todoExamples` in `src/utils/todo-examples.ts` with a `match` that only that headline starts with (`tests/unit/todo-examples.test.ts` checks it).
   - Anything you can't finish: add `- Still open: …`, with an `Options:` list when there is a choice left.
4. Log package changes in `packages/opui/CHANGELOG.md` and `src/utils/whats-new.ts` as `AGENTS.md` says.
5. Run `pnpm exec prettier --write TODO.md` and `pnpm check`, then commit the code and `TODO.md` together, one commit per batch, with the usual `fix`, `docs` or `chore` prefix.

## Report

Per item, one line: the action, and what was fixed, removed, explained or left open.
