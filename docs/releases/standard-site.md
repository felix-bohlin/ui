# Standard Site

Every step to publish the blog as a [Standard Site](https://standard.site/) publication with 6.0, in order, with what to expect after each one. The repository side is done: `pnpm standard-site` (`scripts/standard-site.mjs`) writes the records, `src/utils/standard-site.json` holds their URIs, `Layout.astro` adds the `<link>` tags, `src/pages/.well-known/[record].ts` serves the verification file and `pnpm check-dist` checks both. Until the JSON file holds a publication, the site renders none of it.

What gets published: one `site.standard.publication` record for the blog (name, description and `https://opui.dev`) and one `site.standard.document` record per post in `src/utils/blog-posts.ts` (title, description, date, `/blog/<slug>/` and its topics as tags). The posts themselves stay on opui.dev.

## Before release day

These can happen any time before the merge.

1. Create the project's account on [bsky.app](https://bsky.app). Use a project account rather than a personal one: the records live in its repository for as long as the blog is published, and whoever maintains the blog later needs its app password.
2. Optional, recommended: make the handle `opui.dev`, so the records read as the site's own.
   1. In Bluesky, open Settings, Account, Handle, and choose "I have my own domain".
   2. Enter `opui.dev`. Bluesky shows a TXT record: host `_atproto`, value `did=did:plc:...`.
   3. Add that TXT record wherever the opui.dev DNS is managed (Netlify DNS if the domain uses Netlify's name servers).
   4. Back in Bluesky, choose Verify. DNS can take a few minutes to update.
   5. The handle can change again later: the records use the account's DID, which stays the same.
3. Fill in the profile: display name Open Props UI, an avatar, a short bio and the link to `https://opui.dev`. Readers show it next to the posts.
4. Create an app password.
   1. In Bluesky, open Settings, Privacy and security, App passwords, and add one named `opui standard-site`. Leave direct message access off.
   2. Copy it into a password manager right away: Bluesky shows it once.
   3. Never use the account's own password for the script, and never paste the app password into a commit, an issue or a chat.
5. Do a dry run on the branch. It needs no account and changes nothing:

   ```bash
   pnpm standard-site --dry-run
   ```

   Expect `create the publication` and one `create <slug>` line per post (26 today). The dry run also checks every record against the lexicon's rules first, so a title that's too long or a malformed date stops it with the post's name: fix the post and run it again.

## Release day, after the merge

Don't publish the records before the blog is live: until 6.0 deploys, opui.dev has no `/blog/` pages, and readers would link to 404s.

6. Merge 6.0 to `main` and wait for Netlify's production deploy to finish.
7. Check that the blog is live. Expect `HTTP/2 200` on the first line:

   ```bash
   curl -sI https://opui.dev/blog/release-6/
   ```

8. Update your local `main`:

   ```bash
   git switch main && git pull
   ```

9. Load the app password into the terminal. The command waits silently: paste the password, press Enter, and nothing shows. It stays in this terminal window only and out of the shell history:

   ```bash
   read -s ATPROTO_APP_PASSWORD && export ATPROTO_APP_PASSWORD
   ```

10. In the same window, publish the records. Use the account's handle (`opui.dev` after step 2, otherwise the `.bsky.social` one):

    ```bash
    ATPROTO_IDENTIFIER=opui.dev pnpm standard-site
    ```

    Expect `created the publication at://did:plc:.../site.standard.publication/...`, one `created <slug>` line per post, then `Commit src/utils/standard-site.json and deploy the site.`

    If it stops partway, run it again: it writes each record's URI to the JSON file as soon as the record exists, so a second run picks up where the first stopped and creates no duplicates. See Troubleshooting below for the errors.

11. Check the file it wrote:

    ```bash
    git diff src/utils/standard-site.json
    ```

    Expect a `publication` URI and one `documents` entry per post, all with the same `did:plc:...`.

12. Commit and push it to `main`, or open a small pull request if `main` requires the CI checks by then:

    ```bash
    git add src/utils/standard-site.json && git commit -m "chore: link the Standard Site records"
    ```

    ```bash
    git push
    ```

    The build's `pnpm check-dist` fails if the `.well-known` file or a post's `<link>` tags don't match the JSON file, so a green build means the site serves what the file says.

13. Wait for the deploy to finish.

## Check it worked

14. The verification file prints the publication's URI, exactly as in `src/utils/standard-site.json`:

    ```bash
    curl https://opui.dev/.well-known/site.standard.publication
    ```

15. Its headers include `content-type: text/plain` and `access-control-allow-origin: *`:

    ```bash
    curl -sI https://opui.dev/.well-known/site.standard.publication
    ```

16. A post links both records. Expect a `site.standard.publication` and a `site.standard.document` line:

    ```bash
    curl -s https://opui.dev/blog/release-6/ | grep -o '<link rel="site.standard[^>]*>'
    ```

    Any other page, the home page for one, links only the publication.

17. The records exist on the account. For an account Bluesky hosts, this lists the documents, one per post (replace the DID with the one from the JSON file):

    ```bash
    curl -s "https://bsky.social/xrpc/com.atproto.repo.listRecords?repo=did:plc:REPLACE&collection=site.standard.document&limit=100"
    ```

    An AT Protocol record browser such as pdsls.dev shows the same records if you paste the publication's `at://` URI into it.

18. Open one of the readers or validators listed on standard.site and look up the publication, if one is listed by then.

## After launch

- After a post is added, removed, or has its title, description, date or topics changed, run steps 9 and 10 again and commit the JSON file. Changes to a post's body need no run: the records carry no text. `CONTRIBUTING.md` (Blog posts on Standard Site) has the short version.
- A rerun with nothing to change prints `Every record is up to date.` and writes nothing.
- If the app password leaks, delete it under Settings, Privacy and security, App passwords, and create a new one. The records stay.
- To take the blog off Standard Site, delete the records in a record browser that can sign in, or with the account's own tools, set `src/utils/standard-site.json` back to `{ "documents": {} }`, and deploy: the `<link>` tags and the `.well-known` file go away with it.

## Troubleshooting

- `Set ATPROTO_IDENTIFIER ... and ATPROTO_APP_PASSWORD`: the password isn't loaded in this terminal window. Run step 9 again in the window you run the script from.
- `createSession failed with 401: AuthenticationRequired`: the handle or the app password is wrong. Check the handle has no `@` and that the password is the app password, not the account password.
- An account hosted outside Bluesky signs in at its own server, and fails like a wrong password until it does: set `ATPROTO_SERVICE` to its PDS, `ATPROTO_SERVICE=https://pds.example ATPROTO_IDENTIFIER=... pnpm standard-site`.
- `src/utils/standard-site.json holds the records of did:plc:A, but ... is did:plc:B`: the script signed in to a different account than the one that owns the records. Use the account that created them.
- `RateLimitExceeded`: wait a few minutes and run it again.
- The `.well-known` URL still returns Netlify's 404 page after step 13: the JSON file with the publication isn't on `main`, or the deploy hasn't finished. After `git fetch`, `git show origin/main:src/utils/standard-site.json` shows what `main` has.

## Later

Not part of 6.0, each a small change to `scripts/standard-site.mjs`:

- An icon for the publication: a square image of at least 256 by 256 pixels, uploaded as a blob.
- Theme colors for readers that use them (`basicTheme`).
- Each post's plain text (`textContent`) for search in readers, read from the build.
- Cover images from the share images.
- A CI job that runs the script on `main` with the app password as a secret and commits the JSON file.
