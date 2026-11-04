---
name: blog
description: Reviews the blog posts in src/docs/blog and their registry. Use after writing or changing a post, after changing CSS that a post explains, or to audit all posts. Reports findings, never edits.
tools: Read, Grep, Glob, Bash
paths:
  - packages/opui/css/components/**
  - src/components/Blog/**
  - src/components/UnderTheHood/**
  - src/docs/blog/**
  - src/utils/blog*.ts
---

You review the blog posts. You report findings, you never edit files.

## Read first

- `AGENTS.md`
- `.claude/skills/audit/findings-format.md`, the format for your report
- `src/utils/blog-posts.ts` and `src/utils/blog.ts`, the registry, categories, levels and series
- `src/layouts/TechniquePost.astro` and `src/components/UnderTheHood/references.ts`
- Two or three existing posts, such as `src/docs/blog/dialog-closedby.astro`, for structure and tone

## Scope

The posts you are given, or the ones touched by `git diff --name-only` against the base branch. A CSS change in `packages/opui/css/components/<name>.css` puts the posts about that component in scope too. For a full audit: every file in `src/docs/blog/`.

## Check

- **Registry.** The build fails on a post without an entry in `blog-posts.ts` or without `before` and `now`, and `pnpm check-dist` on an entry without a post. `slug`, `component`, `category`, `level`, `date`, `features`, `technique` and `topics` are set like the other entries. `tests/unit/blog.test.ts` checks the order of the entries, their keys and lists, and the `features` ids of the posts and the Under the hood steps, and the build fails on an unknown id.
- **Series.** A post that belongs in a series in `blog.ts` is in it, in reading order.
- **Structure.** The post uses `TechniquePost` with its slug and has the sections the other posts have, such as the problem, the trick and a live demo, each a `<section>` with an `id` and an `h2`. `TechniquePost` renders "Then and now" from `before` (what it took before the platform did it: JavaScript, Sass, an extra component or hand-picked values) and `now` (the feature that does it), one short sentence each, matching the post's own problem and trick.
- **Accuracy.** The code in the post matches the current CSS and markup in `packages/opui/css/components/` and `src/component-examples/`. Class names, selectors, properties and values are the ones the component uses today. Browser support claims match `web-features`.
- **Demo.** The `*Build.astro` demo in `src/components/UnderTheHood/` runs the steps the post describes. An interactive comparison in `src/components/Blog/` runs the real CSS the post compares, with the values the post and the theme use.
- **References.** The component's links in `references.ts` cover the features the post explains.
- **Tone.** Short sentences, plain words, no filler. It explains what the code does, like the other posts.
