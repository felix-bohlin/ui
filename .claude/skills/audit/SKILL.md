---
name: audit
description: Runs the review agents in .claude/agents on the current changes, or sweeps the whole repo or one area, and merges their findings. Use when the user asks to audit, review or check the project, a component or the current diff against the repo's rules, or before finishing a change.
argument-hint: "[all | <agent>… | <component>…]"
---

# Audit

Run the review agents and merge what they find. The agents only report; you don't fix anything in an audit.

## Scope

Each agent in `.claude/agents` lists the globs it reviews under `paths:` in its frontmatter. `node scripts/audit-scope.mjs` with the skill's arguments picks the agents and prints them as JSON:

- **None: the current changes.** Run `git fetch origin main` first. It prints the agents whose paths the diff against the merge base and the untracked files touch, each with its `files` and `components`. Tell each agent those. If it prints no agents, say nothing changed and stop.
- **`all`: a full sweep.** Every agent, with its `paths` and the `components` they cover.
- **Agent names**, such as `/audit css a11y`: a full sweep with only those agents.
- **Component slugs**, such as `/audit button tabs`: every agent whose paths cover those components, with its `files` limited to them.

Names and slugs can be mixed: `/audit css button` runs `css` on Button only.

## Run

1. Start the agents in parallel, in one message. Give each one its scope, and tell it to follow `.claude/skills/audit/findings-format.md`.
2. In a full sweep, split `a11y`, `api-docs`, `css`, `examples` and `framework-parity` by their `components`, about 10 per agent and in the order the script prints them, so each one reads its files closely.
3. Wait for every agent to finish.

## Merge

1. Drop duplicates. When two agents report the same problem, keep the clearer item and add the other's file references.
2. Check every finding of severity 4 or more yourself by opening the cited lines. Drop it, or lower it, when it doesn't hold.
3. Turn a `Fix:` note that offers alternatives into an `Options:` list, as in `findings-format.md`.
4. Give every finding a `Summary:` and a `Recommended:` note as in `findings-format.md`.
5. For the chat report, group the findings by `TODO.md` section, sorted by severity, lowest first (`todo.mjs add` places a sweep's findings itself).
6. A finding that asks for a new theme token is a design question, not a bug: name the role it would fill and which example theme needs it, and point to section 9 of `packages/opui/components/AGENTS.md`, which says when a token is warranted. The reader first, the token second.

## Report

- **Current changes:** show the merged findings in chat, then one line per agent that found nothing. Don't touch `TODO.md`. Offer to fix the findings.
- **Sweeps:** write the merged findings as JSON, `[{ "section", "severity", "component", "text", "files", "summary", "recommended", "fix", "options", "notes" }]`, and run `node scripts/todo.mjs add <file>`. It adds them as open items, each in its section after the items with the same or a lower severity, and rejects a finding the `/todo` page can't show before it writes anything. Never change or remove existing items. Then run `pnpm exec prettier --write TODO.md` and `pnpm exec vitest run tests/unit/todo.test.ts`, and summarize in chat: how many findings per section, and the most severe ones. The user answers in `TODO.md` with `> ` notes, as with the other items.
