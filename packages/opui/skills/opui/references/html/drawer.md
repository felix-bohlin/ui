# Drawer

Slides in from the sides, top or bottom of the screen. Good for navigation, filters and side content. For a question or a short task that needs the user's full attention, use a [Dialog](https://open-props-ui.netlify.app/html/components/dialog.md).

## Anatomy

- `dialog.ui-drawer`

  Container element.

- `.ui-header`

  The header. `DrawerHeader` renders it with a close button.

- `.ui-content`

  The scrollable content.

- `.ui-footer`

  The footer. `DrawerFooter` renders it.

## Usage

Change the opening side with the `.ui-inline-start`, `.ui-inline-end`, `.ui-block-start`, and `.ui-block-end` classes.

`.ui-header` and `.ui-footer` stay put while `.ui-content` scrolls, with a shadow on the scrolled edge.

The backdrop dims and blurs the page by default. Use the `.ui-backdrop-transparent` class to keep the page behind it fully visible.

Add the `.ui-scroll-lock` utility class to the drawer to lock page scrolling while it's open. With `.ui-backdrop-transparent` the page stays scrollable, except on screens narrower than 500px. Omit the class to allow background scrolling.

```html
<div class="drawer-examples">
  <button
    type="button"
    class="ui-button top"
    commandfor="drawer-block-start-html"
    command="show-modal"
  >
    Block Start
  </button>
  <button
    type="button"
    class="ui-button left"
    commandfor="drawer-inline-start-html"
    command="show-modal"
  >
    Inline Start
  </button>
  <button
    type="button"
    class="ui-button right"
    commandfor="drawer-inline-end-html"
    command="show-modal"
  >
    Inline End
  </button>
  <button
    type="button"
    class="ui-button bottom"
    commandfor="drawer-block-end-html"
    command="show-modal"
  >
    Block End
  </button>
</div>

<dialog
  class="ui-drawer ui-scroll-lock ui-inline-start"
  id="drawer-inline-start-html"
  aria-labelledby="drawer-inline-start-html-heading"
  closedby="any"
>
  <div class="ui-header">
    <h2 id="drawer-inline-start-html-heading">Inline Start</h2>
    <button
      type="button"
      class="ui-button ui-rounded ui-small"
      aria-label="Close"
      commandfor="drawer-inline-start-html"
      command="close"
    >
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
      >
        <path
          fill="currentColor"
          d="M26.29 4.293a1 1 0 1 1 1.414 1.414L17.413 16l10.291 10.29a1 1 0 1 1-1.414 1.414L16 17.413L5.707 27.704a1 1 0 0 1-1.414-1.414L14.585 16L4.293 5.707a1 1 0 0 1 1.414-1.414L16 14.584z"
        />
      </svg>
    </button>
  </div>
  <div class="ui-content">
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </p>
    <p>
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
      dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
      proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
    <p>
      Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
      doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
      inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
    </p>
  </div>
  <div class="ui-footer">
    <button
      type="button"
      class="ui-button ui-small"
      commandfor="drawer-inline-start-html"
      command="close"
    >
      Close
    </button>
  </div>
</dialog>

<dialog
  class="ui-drawer ui-scroll-lock ui-inline-end"
  id="drawer-inline-end-html"
  aria-labelledby="drawer-inline-end-html-heading"
  closedby="any"
>
  <div class="ui-header">
    <h2 id="drawer-inline-end-html-heading">Inline End</h2>
    <button
      type="button"
      class="ui-button ui-rounded ui-small"
      aria-label="Close"
      commandfor="drawer-inline-end-html"
      command="close"
    >
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
      >
        <path
          fill="currentColor"
          d="M26.29 4.293a1 1 0 1 1 1.414 1.414L17.413 16l10.291 10.29a1 1 0 1 1-1.414 1.414L16 17.413L5.707 27.704a1 1 0 0 1-1.414-1.414L14.585 16L4.293 5.707a1 1 0 0 1 1.414-1.414L16 14.584z"
        />
      </svg>
    </button>
  </div>
  <div class="ui-content">
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </p>
    <p>
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
      dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
      proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
    <p>
      Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
      doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
      inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
    </p>
  </div>
  <div class="ui-footer">
    <button
      type="button"
      class="ui-button ui-small"
      commandfor="drawer-inline-end-html"
      command="close"
    >
      Close
    </button>
  </div>
</dialog>

<dialog
  class="ui-drawer ui-scroll-lock ui-block-start"
  id="drawer-block-start-html"
  aria-labelledby="drawer-block-start-html-heading"
  closedby="any"
>
  <div class="ui-header">
    <h2 id="drawer-block-start-html-heading">Block Start</h2>
    <button
      type="button"
      class="ui-button ui-rounded ui-small"
      aria-label="Close"
      commandfor="drawer-block-start-html"
      command="close"
    >
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
      >
        <path
          fill="currentColor"
          d="M26.29 4.293a1 1 0 1 1 1.414 1.414L17.413 16l10.291 10.29a1 1 0 1 1-1.414 1.414L16 17.413L5.707 27.704a1 1 0 0 1-1.414-1.414L14.585 16L4.293 5.707a1 1 0 0 1 1.414-1.414L16 14.584z"
        />
      </svg>
    </button>
  </div>
  <div class="ui-content">
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </p>
    <p>
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
      dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
      proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
  </div>
  <div class="ui-footer">
    <button
      type="button"
      class="ui-button ui-small"
      commandfor="drawer-block-start-html"
      command="close"
    >
      Close
    </button>
  </div>
</dialog>

<dialog
  class="ui-drawer ui-scroll-lock ui-block-end"
  id="drawer-block-end-html"
  aria-labelledby="drawer-block-end-html-heading"
  closedby="any"
>
  <div class="ui-header">
    <h2 id="drawer-block-end-html-heading">Block End</h2>
    <button
      type="button"
      class="ui-button ui-rounded ui-small"
      aria-label="Close"
      commandfor="drawer-block-end-html"
      command="close"
    >
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
      >
        <path
          fill="currentColor"
          d="M26.29 4.293a1 1 0 1 1 1.414 1.414L17.413 16l10.291 10.29a1 1 0 1 1-1.414 1.414L16 17.413L5.707 27.704a1 1 0 0 1-1.414-1.414L14.585 16L4.293 5.707a1 1 0 0 1 1.414-1.414L16 14.584z"
        />
      </svg>
    </button>
  </div>
  <div class="ui-content">
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </p>
    <p>
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
      dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
      proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
  </div>
  <div class="ui-footer">
    <button
      type="button"
      class="ui-button ui-small"
      commandfor="drawer-block-end-html"
      command="close"
    >
      Close
    </button>
  </div>
</dialog>

<style>
  .drawer-examples {
    display: grid;
    grid-template-areas:
      ". top ."
      "left . right"
      ". bottom .";
    gap: var(--size-3);
    justify-items: center;
    align-items: center;
    margin: var(--size-8) auto;
    width: fit-content;
  }

  .top {
    grid-area: top;
  }

  .left {
    grid-area: left;
  }

  .right {
    grid-area: right;
  }

  .bottom {
    grid-area: bottom;
  }
</style>
```

## How to close a drawer

Set `closedby` on the `<dialog>` to choose how the drawer can be closed.

| Value                     | Closes with                                                                                                                     |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `closedby="any"`          | A click outside the drawer, `Esc` or the platform's close request (like the back gesture on mobile), and your own close button. |
| `closedby="closerequest"` | `Esc` or the platform's close request, and your own close button. A click outside does nothing.                                 |
| `closedby="none"`         | Only your own close button (`command="close"`), `close()` or a form with `method="dialog"`.                                     |

Without `closedby`, the browser picks: a modal drawer, opened with `command="show-modal"` or `showModal()`, acts like `closerequest`, and a non-modal one like `none`.

## Accessibility

- Name the drawer with `aria-labelledby` pointing at the heading's `id`, not at `.ui-header`, which also holds the close button.
- The `autofocus` attribute should be added to the element the user is expected to interact with immediately upon opening a modal dialog. If no other element involves more immediate interaction, it is recommended to add autofocus to the close button inside the dialog, or the dialog itself if the user is expected to click/activate it to dismiss.
- Do not add the `tabindex` property to the `<dialog>` element as it is not interactive and does not receive focus. The dialog's contents, including the close button contained in the dialog, can receive focus and be interactive.

Source: [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog)

### Role & attributes

Don't add `role="dialog"` or `aria-modal="true"`. The `<dialog>` element has the dialog role, and opening it with `command="show-modal"` (or `showModal()`) makes it modal and the page behind it inert.

| Role/attribute             | Usage                                                                                                                                                |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `aria-labelledby="IDREF"`  | Gives the drawer an accessible name by referring to the element that provides the drawer title.                                                      |
| `aria-describedby="IDREF"` | Optional. Gives the drawer an accessible description by referring to the drawer content that describes the primary message or purpose of the drawer. |

### Keyboard support

| Key           | Function                                                                                                                                                                                                                  |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Tab`         | Moves focus to the next focusable element in the drawer. After the last one, focus moves to the browser's own controls (like the address bar), then back to the first element in the drawer. The page behind it is inert. |
| `Shift + Tab` | Moves focus to the previous focusable element. Before the first one, focus moves to the browser's controls, then to the last element in the drawer.                                                                       |
| `Esc`         | Closes the drawer, unless `closedby="none"`, and returns focus to the element that opened it.                                                                                                                             |

## API

### Drawer API

| Type           | Modifiers                                                                | Default            | Description                                                                                                                               |
| -------------- | ------------------------------------------------------------------------ | ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Backdrop       | default, `.ui-backdrop-transparent`                                      | default            | The backdrop style. `"transparent"` keeps the page behind it fully visible.                                                               |
| Close behavior | `[closedby]`                                                             | -                  | How the drawer can be closed. `"any"` also closes it on a click outside.                                                                  |
| Scroll lock    | `.ui-scroll-lock`                                                        | -                  | Locks page scroll while the drawer is open. With a transparent backdrop the page stays scrollable, except on screens narrower than 500px. |
| Sides          | `.ui-block-end`, `.ui-block-start`, `.ui-inline-end`, `.ui-inline-start` | `.ui-inline-start` | The side it opens from.                                                                                                                   |

#### Parts

| Part               | Description                                                |
| ------------------ | ---------------------------------------------------------- |
| `dialog.ui-drawer` | Container element.                                         |
| `.ui-header`       | The header. `DrawerHeader` renders it with a close button. |
| `.ui-content`      | The scrollable content.                                    |
| `.ui-footer`       | The footer. `DrawerFooter` renders it.                     |

#### CSS variables

| Variable            | Default                                     | Description                                                                                                                                                                                              |
| ------------------- | ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--backdrop-blur`   | `1px`                                       | Blur radius behind an open `Dialog` or `Drawer`.                                                                                                                                                         |
| `--backdrop-color`  | `rgb(0 0 0 / 0.5)`                          | Overlay color behind an open `Dialog` or `Drawer`.                                                                                                                                                       |
| `--border-color`    | `light-dark(var(--gray-4), var(--gray-12))` | Default border color for cards, lists, tables and dividers.                                                                                                                                              |
| `--border-width`    | `1px`                                       | Default border width for components that draw a border.                                                                                                                                                  |
| `--duration`        | `0.2s`                                      | Default transition duration. Multiplied by `--motion`.                                                                                                                                                   |
| `--ease-enter`      | `var(--ease-out-3)`                         | Easing for elements entering the screen.                                                                                                                                                                 |
| `--motion`          | `1`                                         | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/html/guide/theming.md#motion). |
| `--surface-default` | `light-dark(var(--gray-1), var(--gray-13))` | Page and card background.                                                                                                                                                                                |
| `--text-primary`    | `light-dark(var(--gray-15), var(--gray-1))` | Emphasized text color for headings, labels and values.                                                                                                                                                   |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md) for the full list.

Add `autofocus` to the root, or to an element inside, to choose what gets focus when it opens.

### Drawer header API

#### Parts

| Part         | Description        |
| ------------ | ------------------ |
| `.ui-header` | Container element. |
| `<h2>`       | The heading.       |
| `<button>`   | Closes the drawer. |

#### CSS variables

| Variable            | Default                                     | Description                                                                                                                                                                                              |
| ------------------- | ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--backdrop-blur`   | `1px`                                       | Blur radius behind an open `Dialog` or `Drawer`.                                                                                                                                                         |
| `--backdrop-color`  | `rgb(0 0 0 / 0.5)`                          | Overlay color behind an open `Dialog` or `Drawer`.                                                                                                                                                       |
| `--border-color`    | `light-dark(var(--gray-4), var(--gray-12))` | Default border color for cards, lists, tables and dividers.                                                                                                                                              |
| `--border-width`    | `1px`                                       | Default border width for components that draw a border.                                                                                                                                                  |
| `--duration`        | `0.2s`                                      | Default transition duration. Multiplied by `--motion`.                                                                                                                                                   |
| `--ease-enter`      | `var(--ease-out-3)`                         | Easing for elements entering the screen.                                                                                                                                                                 |
| `--motion`          | `1`                                         | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/html/guide/theming.md#motion). |
| `--surface-default` | `light-dark(var(--gray-1), var(--gray-13))` | Page and card background.                                                                                                                                                                                |
| `--text-primary`    | `light-dark(var(--gray-15), var(--gray-1))` | Emphasized text color for headings, labels and values.                                                                                                                                                   |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md) for the full list.

### Drawer footer API

#### Parts

| Part         | Description                                                                                                      |
| ------------ | ---------------------------------------------------------------------------------------------------------------- |
| `.ui-footer` | Container element. Lays out its content in a row, aligned to the end, or to the start in an `inline-end` drawer. |

#### CSS variables

| Variable            | Default                                     | Description                                                                                                                                                                                              |
| ------------------- | ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--backdrop-blur`   | `1px`                                       | Blur radius behind an open `Dialog` or `Drawer`.                                                                                                                                                         |
| `--backdrop-color`  | `rgb(0 0 0 / 0.5)`                          | Overlay color behind an open `Dialog` or `Drawer`.                                                                                                                                                       |
| `--border-color`    | `light-dark(var(--gray-4), var(--gray-12))` | Default border color for cards, lists, tables and dividers.                                                                                                                                              |
| `--border-width`    | `1px`                                       | Default border width for components that draw a border.                                                                                                                                                  |
| `--duration`        | `0.2s`                                      | Default transition duration. Multiplied by `--motion`.                                                                                                                                                   |
| `--ease-enter`      | `var(--ease-out-3)`                         | Easing for elements entering the screen.                                                                                                                                                                 |
| `--motion`          | `1`                                         | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/html/guide/theming.md#motion). |
| `--surface-default` | `light-dark(var(--gray-1), var(--gray-13))` | Page and card background.                                                                                                                                                                                |
| `--text-primary`    | `light-dark(var(--gray-15), var(--gray-1))` | Emphasized text color for headings, labels and values.                                                                                                                                                   |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md) for the full list.

## Under the hood

Read the post: [Sliding drawers with @starting-style](https://open-props-ui.netlify.app/learn/drawer-starting-style)

1. Modal

   - A drawer is a modal `<dialog>`: top layer, focus trap and `Esc` for free
   - `closedby="any"` closes it on a click outside
   - `aria-labelledby` names it after its heading
   - `:not([open])` brings back the `display: none` that `display: flex` overrode

2. Edge

   - `margin: 0` undoes the centering, `inset` pins it to an edge
   - Logical properties: `inline-start` is the left in LTR and the right in RTL
   - `dvb` and `dvi` follow the mobile browser toolbar

3. Shadow

   - Scroll the filters: a shadow shows on each edge with more to scroll
   - `container-type: scroll-state` lets the pseudo-elements ask which way `.content` can scroll
   - `anchor()` pins them to the edges of `.content`, so they don't scroll away

4. Slide

   - Closed, it waits just past its edge
   - `@starting-style` slides it in from there
   - `allow-discrete` keeps `display` and `overlay` alive until it has slid out
   - `--dir` flips to `-1` under `:dir(rtl)`

5. Backdrop

   - `::backdrop` gets its own transition, in step with the drawer
   - `backdrop-filter` blurs the page behind it

Step 1 of 5: Modal

- [\<dialog> ](https://webstatus.dev/features/dialog)(Widely available): Chrome 37+, Edge 79+, Firefox 98+, Safari 15.4+
- [\<dialog closedby> ](https://webstatus.dev/features/dialog-closedby)(Limited availability): Chrome 134+, Edge 134+, Firefox 141+, Safari not supported
- [Invoker commands ](https://webstatus.dev/features/invoker-commands)(Newly available): Chrome 135+, Edge 135+, Firefox 144+, Safari 26.2+
- [`overscroll-behavior` ](https://webstatus.dev/features/overscroll-behavior)(Limited availability): Chrome 144+, Edge 144+, Firefox 150+, Safari not supported

```html
<button type="button" commandfor="drawer" command="show-modal">
  Start
</button>

<dialog
  class="drawer inline-start"
  id="drawer"
  aria-labelledby="drawer-title"
  closedby="any"
>
  <div class="header">
    <h2 id="drawer-title">Filters</h2>
    …
  </div>
  <div class="content">…</div>
  <div class="footer">…</div>
</dialog>
```

```css
.drawer {
  background-color: var(--surface-default);
  border: none;
  box-shadow: var(--shadow-2);
  color: var(--text-primary);
  display: flex;
  flex-direction: column;
  padding: 0;
}

.drawer:not([open]) {
  display: none;
}

.drawer > .content {
  flex: 1;
  overflow-y: auto;
  overscroll-behavior: contain;
}
```

Step 2 of 5: Edge

- [Logical properties ](https://webstatus.dev/features/logical-properties)(Widely available): Chrome 89+, Edge 89+, Firefox 66+, Safari 15+
- [Small, large, and dynamic viewport units ](https://webstatus.dev/features/viewport-unit-variants)(Widely available): Chrome 108+, Edge 108+, Firefox 101+, Safari 15.4+

```css
.drawer {
  margin: 0;
  max-inline-size: 100%;
  position: fixed;
}

.drawer.inline-start {
  block-size: 100dvb;
  border-inline-end: 1px solid var(--border-color);
  inline-size: min(375px, 100vi);
  inset-block: 0;
  inset-inline: 0 auto;
  max-block-size: 100%;
}

.drawer.block-end {
  block-size: min(80vb, 650px);
  border-block-start: 1px solid var(--border-color);
  inline-size: 100dvi;
  inset-block: auto 0;
  inset-inline: 0;
  max-block-size: 80dvb;
}
```

Step 3 of 5: Shadow

- [Anchor positioning ](https://webstatus.dev/features/anchor-positioning)(Limited availability): Chrome 144+, Edge 144+, Firefox 151+, Safari 26+
- [Container scroll-state queries ](https://webstatus.dev/features/container-scroll-state-queries)(Limited availability): Chrome 133+, Edge 133+, Firefox not supported, Safari not supported

```css
.drawer > .content {
  anchor-name: --content;
  container-type: scroll-state;
}

.drawer > .content::before,
.drawer > .content::after {
  block-size: 0.5rem;
  box-shadow: var(--shadow-4);
  clip-path: inset(100% 0 -2rem);
  content: "";
  inset-inline: anchor(--content inside);
  opacity: 0;
  pointer-events: none;
  position: absolute;
  transition: opacity 0.2s;
}

.drawer > .content::before {
  inset-block-end: anchor(--content outside);
}

.drawer > .content::after {
  inset-block-start: anchor(--content outside);
  scale: 1 -1;
}

@container scroll-state(scrollable: block-start) {
  .drawer > .content::before {
    opacity: 1;
  }
}

@container scroll-state(scrollable: block-end) {
  .drawer > .content::after {
    opacity: 1;
  }
}
```

Step 4 of 5: Slide

- [`:dir()` ](https://webstatus.dev/features/dir-pseudo)(Widely available): Chrome 120+, Edge 120+, Firefox 49+, Safari 16.4+
- [display animation ](https://webstatus.dev/features/display-animation)(Limited availability): Chrome 117+, Edge 117+, Firefox not supported, Safari 18+
- [Individual transform properties ](https://webstatus.dev/features/individual-transforms)(Widely available): Chrome 104+, Edge 104+, Firefox 72+, Safari 14.1+
- [`overlay` ](https://webstatus.dev/features/overlay)(Limited availability): Chrome 117+, Edge 117+, Firefox not supported, Safari not supported
- [`@starting-style` ](https://webstatus.dev/features/starting-style)(Newly available): Chrome 117+, Edge 117+, Firefox 129+, Safari 17.5+
- [`transition-behavior` ](https://webstatus.dev/features/transition-behavior)(Newly available): Chrome 117+, Edge 117+, Firefox 129+, Safari 17.4+

```css
.drawer {
  --dir: 1;
  transition:
    display 0.2s allow-discrete,
    overlay 0.2s allow-discrete,
    translate 0.2s;
}

.drawer:dir(rtl) {
  --dir: -1;
}

.drawer.inline-start {
  translate: calc(-100% * var(--dir)) 0;
}

.drawer.block-end {
  translate: 0 100%;
}

.drawer[open] {
  translate: 0 0;

  @starting-style {
    &.inline-start {
      translate: calc(-100% * var(--dir)) 0;
    }

    &.block-end {
      translate: 0 100%;
    }
  }
}
```

Step 5 of 5: Backdrop

- [`::backdrop` ](https://webstatus.dev/features/backdrop)(Widely available): Chrome 37+, Edge 79+, Firefox 47+, Safari 15.4+
- [`backdrop-filter` ](https://webstatus.dev/features/backdrop-filter)(Newly available): Chrome 76+, Edge 79+, Firefox 103+, Safari 18+

```css
.drawer::backdrop {
  backdrop-filter: blur(var(--backdrop-blur));
  background-color: var(--backdrop-color);
  opacity: 0;
  transition:
    display 0.2s allow-discrete,
    opacity 0.2s,
    overlay 0.2s allow-discrete;
}

.drawer[open] {
  &::backdrop {
    opacity: 1;
  }

  @starting-style {
    &::backdrop {
      opacity: 0;
    }
  }
}
```

## Browser support

- Chromium: Full support Supported since v144.
- Firefox: Partial support Missing: container-scroll-state-queries, display-animation, overlay.
- Safari: Partial support Missing: container-scroll-state-queries, dialog-closedby, overlay.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/html/guide/browser-support/?components=Drawer.md).

## Installation

- `opui-css/css/components/drawer.css`

## Changelog

### What's new

- Several header actions line up at the end, and a subtle scroll shadow shows while the content scrolls ([Usage](#usage)).
- Name it with [`aria-labelledby`](#accessibility) pointing at the header heading.
