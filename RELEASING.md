# Releasing

The steps every release of `opui-css` repeats. The one-off checks of a major release live in `docs/releases/`, for example [`docs/releases/6.0.0.md`](docs/releases/6.0.0.md).

The package has one version, `version` in `packages/opui/package.json`. The home page shows it and the CDN links in the docs point at its major (`opui-css@6`). The docs deploy from `main` on every push, independently of releases, so `src/utils/release.ts` compares the version with the last published one, `version` in `tests/unit/released-api.json`: while it is newer and the CHANGELOG doesn't date it, the home page marks it as not on npm yet, and the pages with CDN links say how to get the files meanwhile. A bump can land on `main` ahead of the release. The root `package.json` is private and has no version, and the docs site has no changelog of its own: `packages/opui/CHANGELOG.md` is the changelog.

A release goes through a pull request like any other change: the `Release` workflow prepares it on a `release/<version>` branch, CI checks the release commit, merging tags it, and the `Publish` workflow publishes the tag to npm.

## Before

1. CI is green on `main`, `check`, `e2e` and the `firefox` and `webkit` e2e jobs, with everything the release ships merged.
2. `packages/opui/CHANGELOG.md` starts with `## <version> - Unreleased`, and every `Added`, `Breaking` and `Changed` entry has a What's new note (see `AGENTS.md`).

## One-time setup

Turn on "Allow GitHub Actions to create and approve pull requests" in the repository settings (Settings, Actions, General, Workflow permissions). The `Release` workflow opens the release pull request with `GITHUB_TOKEN`, and the `After release` workflow the pull request with the released guards. Without the setting, both push their branch and link the compare page in the run summary to open the pull request from. If a ruleset protects tags or `release/*` branches, let GitHub Actions create them.

Add the trusted publisher on npmjs.com (`opui-css`, Settings, Trusted publishing, GitHub Actions): repository `felix-bohlin/ui`, workflow `publish.yml`, environment `npm`, allowed action `npm publish`. Only a package owner can add it, and a new entry stays "Pending validation" until a publish uses it, by the deadline npm shows next to it. The `Publish` workflow needs no npm token or repository secret. GitHub creates the `npm` environment on the first run; a required reviewer there (Settings, Environments) makes every publish wait for approval.

## Release candidate

A major release, or any release worth trying in a real project first, starts with a release candidate: release `6.0.0-rc.1`, or `prerelease` to pick the next one, `6.0.0-rc.1` while `package.json` says `6.0.0` and the CHANGELOG has `## 6.0.0 - Unreleased`, then `6.0.0-rc.2` and so on. A candidate goes through the same steps as a release (below), except that it leaves `## 6.0.0 - Unreleased` undated, publishes to the `next` dist-tag instead of `latest`, so `npm install opui-css` and `opui-css@6` on the CDN keep the last release, and doesn't regenerate the released guards. Try the candidate with:

```bash
npm install opui-css@next
```

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/opui-css@next/dist/opui.css"
/>
```

The home page shows the candidate's version and marks it as a release candidate. Fixes go through pull requests as usual, and each new candidate is another `prerelease` run. When the candidate holds, release the version itself.

## Release pull request

Run the `Release` workflow from the Actions tab (Actions, Release, Run workflow, on `main`) with the version, for example `6.0.0`. `major`, `minor`, `patch` and `prerelease` compute it from `packages/opui/package.json` (from `6.0.0-rc.2`, `major`, `minor` and `patch` give `6.0.0`); pass the version yourself when `package.json` was bumped ahead of the release.

The workflow runs `node scripts/release.mjs <version>`. It stops if the branch isn't `main`, the working tree isn't clean, `main` isn't `origin/main`, the tag or the `release/<version>` branch exists, or the CHANGELOG has no `## <version> - Unreleased` heading (for a candidate, the heading of the version it leads to). Then, in order, it:

1. creates `release/<version>` from `main`,
2. dates the heading, `## <version> - Unreleased` becomes `## <version> - YYYY-MM-DD` (not for a candidate),
3. sets `version` in `packages/opui/package.json`,
4. runs `pnpm check`,
5. commits everything as `chore: release <version>`,
6. pushes the branch and opens the pull request `chore: release <version>` against `main`.

A push or a pull request made with `GITHUB_TOKEN` starts no workflow, so the `Release` workflow then runs the `CI` workflow on the branch. Its `check` and `e2e` jobs run on the release commit and show on the pull request, and later pushes to the branch run CI as usual.

The script works locally too, on a clean `main` that matches `origin/main`, with your git and `gh` logins: `node scripts/release.mjs 6.0.0`, or `pnpm release`, `pnpm release:minor`, `pnpm release:major` and `pnpm release:prerelease` in `packages/opui`. A pull request you open starts CI by itself, and without `gh` the script prints the compare page to open it from. If `pnpm check` fails, nothing is pushed: fix the cause on `main` (locally, `git switch --discard-changes main && git branch -D release/<version>` first) and run it again.

## Merge and tag

Merge the pull request once CI is green. Keep the branch up to date with `main` before merging, so the commit that gets tagged is the one CI checked.

On the push to `main`, the `Release` workflow (`.github/workflows/release.yml`) finds the `chore: release <version>` commit for the version in `package.json` (the branch commit after a merge commit, the new commit after a squash or rebase), checks that it sets that version and dates the heading (or keeps it undated for a candidate), tags it `<version>`, without a `v` prefix like the existing `5.4.3`, and pushes the tag. It runs on the pushes that change the CHANGELOG or `package.json`, and does nothing when the tag exists or no release commit is there. A tag pushed with `GITHUB_TOKEN` starts no workflow either, so `release.yml` runs the `Publish` workflow on the tag and calls the `After release` workflow itself (see After). By hand, `node scripts/release.mjs tag` on an up-to-date `main` does the same, and the tag push starts `Publish` and `After release`.

CI builds `main` and, once the e2e tests pass, deploys the docs. The dated heading tells `src/utils/release.ts` that the version is out, so the docs stop marking it as unreleased with the merge, a few minutes before the `Publish` workflow has the package on npm.

## Publish

The `Publish` workflow (`.github/workflows/publish.yml`) runs on the tag in the `npm` environment. It checks out the tag, runs `pnpm install --frozen-lockfile` and `pnpm check`, then `node scripts/release.mjs publish`, which stops when it runs outside GitHub Actions, when `HEAD` isn't the tag of the `package.json` version, or when `pnpm check` changed `packages/opui`. It packs the package with `pnpm pack` (`prepack` builds `dist`, and pnpm replaces the `catalog:` versions) and publishes the tarball with `npm publish --provenance --tag latest`, or `--tag next` for a candidate. npm trusts the workflow through the trusted publisher (see One-time setup), and the package page links the release to the workflow run and the tagged commit.

If the publish fails, nothing is on npm yet. When the cause is outside the release commit, such as the trusted publisher on npmjs.com, fix it and run the workflow again on the tag (Actions, Publish, Run workflow, with the tag picked under "Use workflow from"). When the cause is in the release commit itself, release the next patch.

## After

1. `https://cdn.jsdelivr.net/npm/opui-css@<major>/dist/opui.css` resolves (`curl -sI`), the docs deploy from `main` and the home page shows the version.
2. Write the GitHub release from the tag: the `Breaking` section of the CHANGELOG and a link to `MIGRATING.md`.
3. The next change to the package starts a new `## <version> - Unreleased` section at the top of the CHANGELOG.
4. The released guards are regenerated by the `After release` workflow (`.github/workflows/after-release.yml`), which `release.yml` calls once it has tagged a release (`6.0.0`, not a candidate), and which a release tag pushed by hand starts too. It checks out the tagged commit, runs `node scripts/released-api.mjs <version>` and `pnpm test:record-released`, pushes the result to `chore/released-<version>`, runs the `CI` workflow on that branch and opens a pull request against `main`. If the repository doesn't let GitHub Actions open pull requests, the run summary links the compare page to open it from instead.

   By hand, on the tagged commit:

   ```bash
   git checkout <version>
   node scripts/released-api.mjs <version>
   pnpm test:record-released
   ```

   `released-api.mjs` reads the tag with `git archive`, so it must exist locally (`git fetch origin tag <version> --no-tags`). `test:record-released` writes `tests/unit/released-tokens.json` from the current `theme.css` and `packages/opui/package.json`.
