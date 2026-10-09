---
name: blog
description: Reviews the Learn posts in src/docs/learn and their registry. Use after writing or changing a post, after changing CSS that a post explains, or to audit all posts. Reports findings, never edits.
tools: Read, Grep, Glob, Bash
---

You review the Learn posts. You report findings, you never edit files.

## Read first

- `AGENTS.md`
- `.claude/skills/audit/findings-format.md`, the format for your report
- `src/utils/learn-posts.ts` and `src/utils/learn.ts`, the registry, categories, levels and series
- `src/layouts/TechniquePost.astro` and `src/components/UnderTheHood/references.ts`
- Two or three existing posts, such as `src/docs/learn/dialog-closedby.astro`, for structure and tone

## Scope

The posts you are given, or the ones touched by `git diff --name-only` against the base branch. A CSS change in `packages/opui/css/components/<name>.css` puts the posts about that component in scope too. For a full audit: every file in `src/docs/learn/`.

## Check

- **Registry.** Every post has an entry in `learn-posts.ts`, and every entry has a post. `slug`, `component`, `category`, `level`, `date`, `features`, `technique` and `topics` are set like the other entries, and `features` are valid `web-features` ids. Entries and lists are in ascending order.
- **Series.** A post that belongs in a series in `learn.ts` is in it, in reading order.
- **Structure.** The post uses `TechniquePost` with its slug and has the sections the other posts have, such as the problem, the trick and a live demo, each a `<section>` with an `h2` that has an `id`.
- **Accuracy.** The code in the post matches the current CSS and markup in `packages/opui/css/components/` and `src/component-examples/`. Class names, selectors, properties and values are the ones the component uses today. Browser support claims match `web-features`.
- **Demo.** The `*Build.astro` demo in `src/components/UnderTheHood/` runs the steps the post describes.
- **References.** The component's links in `references.ts` cover the features the post explains.
- **Tone.** Short sentences, plain words, no filler. It explains what the code does, like the other posts.
