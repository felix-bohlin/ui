# Contributing

Bug reports, fixes and new examples are welcome. For a new component or a change to a prop, class or theme token, open an issue first, so the API can be agreed before the work starts.

## Setup

Follow [Development](README.md#development) in the README: Node from `.nvmrc`, pnpm, Git LFS, `pnpm install` and `pnpm dev`.

## Making a change

- [AGENTS.md](AGENTS.md) describes the workflows for an example and a component, and the rules the checks enforce. The guides it links cover the components, the examples, the API data and the scripts.
- Write components and examples in Astro. `pnpm build-components` and `pnpm build-examples` write the React, Svelte, Vue and HTML versions from them.
- Log a change people using the package will notice in [packages/opui/CHANGELOG.md](packages/opui/CHANGELOG.md), under the unreleased version at the top.
- Run `pnpm check` before you open a pull request, and `pnpm test:e2e --project=light --project=dark` when the change affects rendering or behavior.
- Visual baselines are generated in CI only. Don't commit screenshots: the `update-snapshots` label regenerates them on the pull request.

## Commit messages

Start with `chore`, `docs`, `feat`, `fix`, `refactor` or `revert`, say what changed, and keep the subject to 100 characters. The `commit-msg` hook that `pnpm install` sets up checks it.
