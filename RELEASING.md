# Releasing

The steps every release of `opui-css` repeats. The one-off checks of a major release live in `docs/releases/`, for example [`docs/releases/6.0.0.md`](docs/releases/6.0.0.md).

The package has one version, `version` in `packages/opui/package.json`. The home page shows it and the CDN links in the docs point at its major (`opui-css@6`), so a bump that lands on `main` is live on the docs site the moment CI deploys it. The release script bumps and publishes before it pushes, so the docs never show a version that isn't on npm. The root `package.json` is private and has no version, and the docs site has no changelog of its own: `packages/opui/CHANGELOG.md` is the changelog.

## Before

1. CI is green on `main`, both jobs (`check` and `e2e`), with everything the release ships merged.
2. `packages/opui/CHANGELOG.md` starts with `## <version> - Unreleased`, and every `Added`, `Breaking` and `Changed` entry has a What's new note (see `AGENTS.md`).
3. The local `main` is clean and up to date with `origin/main`.

## Publish

Run the release script from the repository root with the version to publish:

```bash
node scripts/release.mjs 6.0.0
```

It stops if the branch isn't `main`, the working tree isn't clean, the tag exists or the CHANGELOG has no `## <version> - Unreleased` heading. Then, in order, it:

1. dates the heading, `## <version> - Unreleased` becomes `## <version> - YYYY-MM-DD`,
2. sets `version` in `packages/opui/package.json`,
3. runs `pnpm check`,
4. commits everything as `chore: release <version>`,
5. publishes with `pnpm publish --provenance` from `packages/opui` (`prepack` builds `dist`),
6. tags the commit `<version>`, without a `v` prefix like the existing `5.4.3`,
7. pushes `main` with `--follow-tags`.

The push is the merge and the deploy: CI builds `main` and deploys the docs, so the docs show the new version only after the package is on npm. `pnpm release`, `pnpm release:minor` and `pnpm release:major` in `packages/opui` call the script with the next patch, minor or major version computed from `package.json`; pass the version yourself when `package.json` was bumped ahead of the release.

If the publish fails, the release commit is local and nothing is tagged or pushed. Fix the cause and run the script again after `git reset --hard origin/main`.

## After

1. `https://cdn.jsdelivr.net/npm/opui-css@<major>/dist/opui.css` resolves (`curl -sI`), the docs deploy from `main` and the home page shows the version.
2. Write the GitHub release from the tag: the `Breaking` section of the CHANGELOG and a link to `MIGRATING.md`.
3. Regenerate the released guards from the tag and commit them as `chore: released guards at <version>`:

   ```bash
   git checkout <version>
   node scripts/released-api.mjs <version>
   pnpm test:record-released
   ```

   `released-api.mjs` reads the tag with `git archive`, so it must exist locally (`git fetch origin tag <version> --no-tags`). `test:record-released` writes `tests/unit/released-tokens.json` from the current `theme.css` and `packages/opui/package.json`, so run it on the tagged commit.

4. The next change to the package starts a new `## <version> - Unreleased` section at the top of the CHANGELOG.
