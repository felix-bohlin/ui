---
name: audit
description: Runs the review agents in .claude/agents on the current changes, or sweeps the whole repo or one area, and merges their findings. Use when the user asks to audit, review or check the project, a component or the current diff against the repo's rules, or before finishing a change.
argument-hint: "[all | <agent>… | <component>…]"
---

# Audit

Run the review agents and merge what they find. The agents only report; you don't fix anything in an audit.

## Agents

| Agent              | Runs when the diff touches                                                                                                           |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| `a11y`             | `packages/opui/components/`, `packages/opui/css/components/`, `src/component-examples/`, `src/docs/components/`                      |
| `api-docs`         | `src/component-api/`, `packages/opui/components/**/types*.ts`, `packages/opui/css/components/`                                       |
| `blog`             | `src/docs/learn/`, `src/utils/learn*.ts`, `src/components/UnderTheHood/`, `packages/opui/css/components/` for components with a post |
| `browser-support`  | `packages/opui/css/`, `packages/opui/core/`, `browserSupport` in `src/docs/components/`                                              |
| `changelog`        | anything in `packages/opui/`                                                                                                         |
| `css`              | `packages/opui/css/`, `packages/opui/core/`                                                                                          |
| `examples`         | `src/component-examples/`, `src/docs/components/`                                                                                    |
| `framework-parity` | `packages/opui/components/`, `packages/opui/{astro,svelte,vue}/`, `src/component-examples/`, `tests/unit/__snapshots__/`             |

## Modes

Read the arguments:

- **None: the current changes.** Run `git fetch origin main`, then collect the changed files with `git diff --name-only $(git merge-base HEAD origin/main)` plus `git status --porcelain`. Pick the agents from the table and tell each one which files and components changed. If nothing changed, say so and stop.
- **`all`: a full sweep.** Run every agent on its whole scope.
- **Agent names**, such as `/audit css a11y`: a full sweep with only those agents.
- **Component slugs**, such as `/audit button tabs`: every agent whose scope covers those components, limited to them.

Names and slugs can be mixed: `/audit css button` runs `css` on Button only.

## Run

1. Start the agents in parallel, in one message. Give each one its scope, and tell it to follow `.claude/skills/audit/findings-format.md`.
2. In a full sweep, split `a11y`, `api-docs`, `css`, `examples` and `framework-parity` by component, about 10 components per agent, so each one reads its files closely. Sort the components in ascending order before splitting.
3. Wait for every agent to finish.

## Merge

1. Drop duplicates. When two agents report the same problem, keep the clearer item and add the other's file references.
2. Check every finding of severity 4 or more yourself by opening the cited lines. Drop it, or lower it, when it doesn't hold.
3. Group the findings by `TODO.md` section, sorted by severity, lowest first.

## Report

- **Current changes:** show the merged findings in chat, then one line per agent that found nothing. Don't touch `TODO.md`. Offer to fix the findings.
- **Sweeps:** add the merged findings to `TODO.md` as open items (`- [ ]`), each in its section, after the items with the same or a lower severity. Never change or remove existing items. Then run `pnpm exec prettier --write TODO.md` and `pnpm exec vitest run tests/unit/todo.test.ts`, and summarize in chat: how many findings per section, and the most severe ones. The user answers in `TODO.md` with `> ` notes, as with the other items.
