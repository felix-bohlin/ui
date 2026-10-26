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

The text starts with `TODO.md with my comments`. It comes in the arguments or in the next message; ask for it if neither has it.

## Steps

1. Save the text to a file in your scratchpad and run `node scripts/todo.mjs apply-answers <file>`. It finds each item by its line, else in the same section by the text before its file references (a citation may have been corrected) or the first 80 characters, adds each answer's `> ` lines word for word under its item and prints a JSON report with the item `line`, the `action`, the `option`, the `comment` and a `status`. Rerunning it changes nothing. Tell the user about every `missing` or `ambiguous` answer, with its `candidates`, and leave it out.
2. Act on each `added` or `already` answer, in report order:
   - `Fix` or `Fix with option`: implement it (the `option` from the item's `Options:` list), following the comment. The outcome is `fixed`, with a note on what changed and where, naming any intended snapshot or drift update.
   - `Remove issue`: the outcome is `removed`, with the reason.
   - `Explain further`: the outcome is `explained`, with the explanation. The item stays open.
   - `Explain further and provide an example`: the outcome is `explained`, with a note that ends in `Example: <name>`. Create `src/todo-examples/<name>.html`, registered in `todoExamples` in `src/utils/todo-examples.ts` with a `match` that only that headline starts with (`tests/unit/todo-examples.test.ts` checks it).
   - Anything you can't finish: the outcome is `still-open`, with what is left. Add an `Options:` list to the item when there is a choice left.
3. Record the outcomes: write them as JSON, `[{ "line", "outcome", "note" }]`, and run `node scripts/todo.mjs resolve <file>`. It marks `fixed` and `removed` items done and adds each note under the answer.
4. Log package changes in `packages/opui/CHANGELOG.md` and `src/utils/whats-new.ts` as `AGENTS.md` says.
5. Run `pnpm exec prettier --write TODO.md` and `pnpm check`, then commit the code and `TODO.md` together, one commit per batch.

## Report

Per item, one line: the action, and what was fixed, removed, explained or left open.
