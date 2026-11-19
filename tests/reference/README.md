# Reference app

One small app, a group page with a feed, chat, photos, profiles and settings, written by hand in Astro, SvelteKit, Next (React), Nuxt (Vue) and Solid 2. It's front end only: the data is in `shared/data.ts`, and `shared/fake-api.ts` serves it with a delay. A single Playwright suite in `spec/` runs against every app.

The examples in `tests/apps` render one component at a time. This app tests how the components compose: forms inside dialogs, avatars as links, menus that submit forms, drawers that close on client navigation, a second theme at runtime and phone layouts. Each port is written by hand in its framework's own idiom, and the shared code holds data only, no components.

Solid is plain Solid 2 through `@solidjs/vite-plugin` with `start`, not SolidStart.

## Running it

```bash
pnpm reference prepare
```

This packs `packages/opui` (or fetches `OPUI_VERSION` from npm), installs the workspace, unpacks the tarball into each app and type-checks and builds them. `OPUI_REFERENCE_APPS=sveltekit,next` limits it to some apps.

```bash
pnpm reference test
```

This runs `spec/` against the built apps. It takes the same `OPUI_REFERENCE_APPS`.

```bash
pnpm reference dev sveltekit
```

This starts one app's dev server. Without an app, it starts all five and an index page at <http://localhost:4500> that links each screen in every framework. The dev servers use the tarball unpacked by `prepare`, so run that first, and again after a change to `packages/opui`.

| App       | Port |
| --------- | ---- |
| Index     | 4500 |
| Astro     | 4501 |
| SvelteKit | 4502 |
| Next      | 4503 |
| Nuxt      | 4504 |
| Solid     | 4505 |

## Adding a screen or a feature

1. Add the screen to `SCREENS` in `shared/screens.ts`, with the opui components it uses, or add the components to an existing screen.
2. Add data to `shared/data.ts` and any functions to `shared/fake-api.ts`.
3. Describe the behavior below and write `spec/<screen>.spec.ts`.
4. Implement it in every app in `apps/`. `tests/unit/reference-coverage.test.ts` fails while an app has no element with `data-screen="<id>"` for a screen, or a screen has no spec.

Copy is the same in every app, since the specs find elements by role and name. Take labels from this file and from `shared/`.

## Known library bugs

The app uses the components as their docs say, and doesn't work around a bug in them. A bug that one of the specs hits goes in `spec/known.ts`, with the issue that tracks it:

- A behavior the bug breaks gets a test that calls `test.fail(true, KNOWN.<name>)`, which passes while the bug is there. When a fix lands, it fails with "expected to fail but passed": remove the `test.fail` line and the entry.
- An axe violation goes in `KNOWN_AXE`, and a console message in `KNOWN_CONSOLE`. Every other test ignores them, and the `known:` test fails once the violation is gone.

Fredahead's open findings are indexed in felix-bohlin/ui#443. A bug found here that isn't on that list goes in `TODO.md`.

## The contract

Icons are inline `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">` with one `<path>` from `ICONS` in `shared/icons.ts`. Every app renders the same markup with the opui components of its framework, imports `opui-css/css/imports.css`, `reference-shared/theme.css` and `reference-shared/app.css`, serves `shared/photos` and the repo's `public/photos` at `/photos/`, and sets `data-hydrated` on `<html>` once it is interactive. Paths, ids and text below are exact.

### Shell (every page)

- `<html lang="en">`, `<link href="data:," rel="icon">` so no favicon request fails, and the page `<title>` is `<Screen label> | Reference`, and `<Name> | Reference` on a profile.
- The first focusable element is a skip link, `<a class="ui-sr-only ui-focusable" href="#main">Skip to content</a>`.
- `<header class="app-header">` holds, in order:
  - a `Menu` button (`aria-label="Menu"`, an icon) that opens the navigation `Drawer` (`id="nav-drawer"`, `closeOnNavigate`, title `Navigate`). The drawer has the same links as the nav. The button is hidden from `48rem` up by `app.css`.
  - a home link `Reference` to `/`, with `class="app-brand"`.
  - `<nav aria-label="Main" class="app-nav">` with one link per screen in `SCREENS`, in order, as `Button`s with `href`. The link of the current screen has `aria-current="page"`. Profile pages of other people mark no link.
  - a notifications button (`aria-label="Notifications"`) wrapped in a `Badge` with `hideLabel` and `label="2 unread notifications"` and the visible count `2`, opening a `Menu` (`id="notifications-menu"`, `align="end"`) with one link item per entry in `NOTIFICATIONS`.
  - a theme button (`aria-label="Theme"`) opening a `Menu` (`id="theme-menu"`, `align="end"`) with two button items, `Default` and `Sunset`. Picking one sets `data-theme` on `<html>` (`default` or `sunset`), saves it in `localStorage` under `reference-theme` and closes the menu. On load, a saved theme is applied.
  - an `Avatar` link to `/u/sam` (`aria-label="Your profile"`, the initials `SR`, since Sam has no photo).
- `<main class="app-main" id="main" tabindex="-1">` holds the screen, whose root element is `<div class="app-screen" data-screen="<id>">`.
- Navigation between screens is client-side in every app (Astro uses `ClientRouter`).

### Feed (`/`, `data-screen="feed"`)

- `<h1>Feed</h1>`.
- A composer `<form aria-label="New post">` with a `Textarea` (`label="What's on your mind?"`, `name="text"`, `maxlength="280"`, `characterCount`, `required`) and a filled `Button` `Post` (`type="submit"`). Submitting adds a post by Sam at the top of the list with the time `Just now`, and empties the field.
- A `ToggleGroup` (`aria-label="Filter posts"`, `name="filter"`) with `All`, `Photos` and `Saved` from `FEED_FILTERS`, `All` checked. `Photos` shows only posts with photos. `Saved` shows the posts saved this session, or the empty state `<p class="app-empty">No saved posts yet.</p>`. The `Load more` button only shows for `All`.
- `<ol aria-label="Posts" class="app-posts">` with one `<li>` per post, each a `Card` with `as="article"`, `variant="outlined"` and `aria-labelledby` naming the author's name element:
  - a `CardHeader` with `as="header"` holding an `Avatar` link to `/u/<handle>` that is hidden from assistive tech and Tab (`aria-hidden="true"`, `tabindex="-1"`, the photo with `alt=""` or the initials), then an `<hgroup>` with the author's name as a link to `/u/<handle>` in `<h2 id="post-<id>-author">` and a `<p>` with a `<time datetime>` holding the post time.
  - a post options button (`aria-label="Options for <name>'s post"`) opening a `Menu` (`id="post-menu-<id>"`, `align="end"`) with three items:
    - `Copy link`, a button that writes `<origin>/posts/<id>` to the clipboard.
    - `Save post`, or `Remove from saved` once saved: a submit button (`type="submit"`, `form="save-post-<id>"`) for a hidden `<form id="save-post-<id>">` after the menu. Submitting it toggles the post in the saved list and must close the menu.
    - `Hide post`, a button that removes the post from the list.
  - `CardContent` with the text in `<p>`, and the photos, when there are any, as `<img>` (`alt` from `PHOTOS`) in `<div class="app-post-photos">`.
  - `CardActions` with a `ToggleGroup` (`multiple`, `aria-label="Reactions"`, `size="small"`) with one `ToggleButton` per reaction, labelled `<label> <count>`. Checking one adds 1 to its count.
- The first page shows `PAGE_SIZE` posts. A `Load more` button (`variant="outlined"`) under the list fetches the next page with `fetchFeedPage`. While it loads, the button is `disabled` and the list has `aria-busy="true"`. When no posts are left, the button is replaced by `<p class="app-end">You're all caught up.</p>`.

### Chat (`/chat`, `data-screen="chat"`)

- `<h1>Chat</h1>`.
- `<nav aria-label="Conversations">` with a `List` of links, one per conversation, to `/chat?with=<handle>`, as `ListItem`s with the avatar (`aria-hidden="true"`) in `start`, the name as `label` and, when `unread` is above 0, `description="<n> unread"`. The open conversation has `aria-current="page"`.
- `/chat` opens the first conversation, `/chat?with=<handle>` that one, and an unknown handle the first.
- `<section aria-labelledby="chat-title">` with `<h2 id="chat-title">` naming the other person, then a `MessageList` (`aria-label="Messages with <name>"`, `direct`) with a `<li class="ui-divider">` per divider line and a `Message` per message (`outgoing` for Sam, `author`, `time`, `datetime`, the other person's `Avatar` in `start` with `aria-hidden="true"`).
- A `<form aria-label="Send a message">` under it with a `Textarea` (`label="Message"`, `hideLabel`, `name="text"`, `required`) and a filled `Button` `Send` (`type="submit"`). Sending appends an outgoing message with `outgoing()` and empties the field. Switching conversations keeps each one's sent messages for the session.

### Photos (`/photos`, `data-screen="photos"`)

- `<h1>Photos</h1>`.
- `<ul aria-label="Photos" class="app-photo-grid">` with a `<li>` per photo holding a `<button type="button" class="app-photo">` named by its image (`<img alt>`).
- A button opens the viewer: a `Dialog` (`id="photo-viewer"`, `aria-label="Photo viewer"`, `closedby="any"`, `class="app-viewer"`) shown with `showModal()`, holding a `DialogHeader` with `closeButton` and the text `Photo <n> of <total>` in a `<p aria-live="polite">`, the photo as `<img>` with its `alt`, the photographer's name, and `Previous` and `Next` buttons that wrap around. The arrow keys Left and Right do the same while the viewer is open.
- Closing returns focus to the button that opened it.

### Profile (`/u/<handle>`, `data-screen="profile"`)

- An unknown handle is a 404 page with `<h1>Not found</h1>` in the shell, `data-screen="not-found"`.
- `<h1>` with the name, a large `Avatar` (`size="large"`, photo with `alt=""` or initials with `aria-hidden="true"`), the bio in `<p>`.
- A `DescriptionList` with `Location` and `Joined`, and two `Stat`s, `Posts` and `Photos`, with the counts from `postsBy()` and `photosBy()`.
- On `/u/sam`, an `Edit profile` button (`variant="outlined"`) opens a `Dialog` (`id="edit-profile"`) with `DialogHeader` `closeButton`, `DialogTitle` `Edit profile`, and a `<form method="dialog">` around `DialogContent` (`TextField` `Name`, `name="name"`, `required`, the current name; `Textarea` `Bio`, `name="bio"`, the current bio) and `DialogFooter` (`Cancel`, `type="button"`, closes; `Save`, filled, `type="submit"`). Saving updates the `<h1>` and the bio; Cancel and Escape leave them, and the fields show the saved name and bio the next time the dialog opens.
- On other profiles, a `Send message` button links to `/chat?with=<handle>`.
- `Tabs` (`name="profile-tabs"`) with `Posts` (checked: the user's posts as `<article>`s with the text and time, or `<p class="app-empty">No posts yet.</p>`) and `Photos` (the user's photos as images, or `<p class="app-empty">No photos yet.</p>`).

### Settings (`/settings`, `data-screen="settings"`)

- `<h1>Settings</h1>`.
- `<form aria-label="Settings" class="ui-form">` (`Form`) with:
  - `Fieldset` `Account`: `TextField` `Display name` (`name="name"`, `Sam Rivera`), `TextField` `Email` (`type="email"`, `name="email"`, `required`, `sam@example.com`), `Select` `Language` (`name="language"`, `Deutsch`, `English`, `Svenska`; English selected).
  - `Fieldset` `Who can see your posts` with `Radio`s `Everyone`, `Friends` (checked) and `Only me` (`name="visibility"`).
  - `Fieldset` `Notifications` with `Switch`es `Email notifications` (`name="email-notifications"`, checked) and `Push notifications` (`name="push-notifications"`).
  - A filled `Save` button (`type="submit"`). Above it, a `<div role="status" id="settings-status">` that is empty until the form is submitted: a valid submit puts a `Callout` with `severity="success"` and the text `Settings saved.` in it. An invalid form shows the browser's validation and nothing in the status.
- `<section aria-labelledby="two-factor-title">` with `<h2 id="two-factor-title">Two-factor sign-in</h2>` and a form with a `OneTimeCode` (`label="Code from your app"`, `name="code"`, `required`) and a `Verify` button. Verifying calls `verifyCode()`: `123456` shows `Two-factor sign-in is on.` in a success `Callout` inside a `<div role="status">` under the field, and anything else marks the field `error` and shows `That code didn't work. Try again.` as its `endText`.
- `<section aria-labelledby="danger-title">` with `<h2 id="danger-title">Danger zone</h2>` and a `Delete account` button (`color="critical"`, `variant="outlined"`) that opens a `Dialog` (`id="delete-account"`, `DialogTitle` `Delete your account?`, text `This removes your posts and photos.`, `Cancel` and a critical filled `Delete`, both closing it). Delete shows `Account deleted (not really, this is a test app).` in the same status container as the save message.
