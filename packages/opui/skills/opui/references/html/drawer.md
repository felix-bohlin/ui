# Drawer

Slides in from the sides, top or bottom of the screen. Good for navigation, filters and side content. For a question or a short task that needs the user's full attention, use a [Dialog](https://open-props-ui.netlify.app/html/components/dialog.md).

## Anatomy

- `dialog.ui-drawer`

  Container element.

- `.ui-header`

  The header, with a close button.

- `<h2>`

  The title. Names the drawer through `aria-labelledby`.

- `.ui-content`

  The scrollable content.

- `.ui-footer`

  The footer.

## Basics

A drawer opens from the inline start by default. Change the side with the `.ui-inline-end`, `.ui-block-start` and `.ui-block-end` classes.

`.ui-header` and `.ui-footer` stay put while `.ui-content` scrolls, with a shadow on the scrolled edge.

The backdrop dims and blurs the page by default. Use the `.ui-backdrop-transparent` class to keep the page behind it fully visible.

Add the `.ui-scroll-lock` utility class to the drawer to lock page scrolling while it's open. With `.ui-backdrop-transparent` the page stays scrollable, except on screens narrower than 500px. Omit the class to allow background scrolling.

```html
<div class="example-compass">
  <button
    type="button"
    class="ui-button"
    commandfor="drawer-basics-3"
    command="show-modal"
  >
    Block Start
  </button>
  <button
    type="button"
    class="ui-button"
    commandfor="drawer-basics-1"
    command="show-modal"
  >
    Inline Start
  </button>
  <button
    type="button"
    class="ui-button"
    commandfor="drawer-basics-2"
    command="show-modal"
  >
    Inline End
  </button>
  <button
    type="button"
    class="ui-button"
    commandfor="drawer-basics-4"
    command="show-modal"
  >
    Block End
  </button>
</div>

<dialog
  class="ui-drawer ui-scroll-lock"
  id="drawer-basics-1"
  aria-labelledby="drawer-basics-1-heading"
  closedby="any"
>
  <div class="ui-header">
    <h2 id="drawer-basics-1-heading">Inline Start</h2>
    <button
      type="button"
      class="ui-button ui-round ui-small"
      aria-label="Close"
      commandfor="drawer-basics-1"
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
      commandfor="drawer-basics-1"
      command="close"
    >
      Close
    </button>
  </div>
</dialog>

<dialog
  class="ui-drawer ui-scroll-lock ui-inline-end"
  id="drawer-basics-2"
  aria-labelledby="drawer-basics-2-heading"
  closedby="any"
>
  <div class="ui-header">
    <h2 id="drawer-basics-2-heading">Inline End</h2>
    <button
      type="button"
      class="ui-button ui-round ui-small"
      aria-label="Close"
      commandfor="drawer-basics-2"
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
      commandfor="drawer-basics-2"
      command="close"
    >
      Close
    </button>
  </div>
</dialog>

<dialog
  class="ui-drawer ui-scroll-lock ui-block-start"
  id="drawer-basics-3"
  aria-labelledby="drawer-basics-3-heading"
  closedby="any"
>
  <div class="ui-header">
    <h2 id="drawer-basics-3-heading">Block Start</h2>
    <button
      type="button"
      class="ui-button ui-round ui-small"
      aria-label="Close"
      commandfor="drawer-basics-3"
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
      commandfor="drawer-basics-3"
      command="close"
    >
      Close
    </button>
  </div>
</dialog>

<dialog
  class="ui-drawer ui-scroll-lock ui-block-end"
  id="drawer-basics-4"
  aria-labelledby="drawer-basics-4-heading"
  closedby="any"
>
  <div class="ui-header">
    <h2 id="drawer-basics-4-heading">Block End</h2>
    <button
      type="button"
      class="ui-button ui-round ui-small"
      aria-label="Close"
      commandfor="drawer-basics-4"
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
      commandfor="drawer-basics-4"
      command="close"
    >
      Close
    </button>
  </div>
</dialog>
```

## How to close a drawer

Set `closedby` on the `<dialog>` to choose how the drawer can be closed.

| Value                     | Closes with                                                                                                                     |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `closedby="any"`          | A click outside the drawer, `Esc` or the platform's close request (like the back gesture on mobile), and your own close button. |
| `closedby="closerequest"` | `Esc` or the platform's close request, and your own close button. A click outside does nothing.                                 |
| `closedby="none"`         | Only your own close button (`command="close"`), `close()` or a form with `method="dialog"`.                                     |

Without `closedby`, the browser picks: a modal drawer, opened with `command="show-modal"` or `showModal()`, acts like `closerequest`, and a non-modal one like `none`.

```html
<button
  type="button"
  commandfor="drawer-close-behaviors-1"
  command="show-modal"
  class="ui-button ui-outlined"
>
  Open drawer
</button>

<dialog
  class="ui-drawer ui-scroll-lock"
  id="drawer-close-behaviors-1"
  aria-labelledby="drawer-close-behaviors-1-heading"
  closedby="any"
>
  <div class="ui-header">
    <h2 id="drawer-close-behaviors-1-heading">How to close</h2>
    <button
      type="button"
      class="ui-button ui-round ui-small"
      aria-label="Close"
      commandfor="drawer-close-behaviors-1"
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
    <fieldset class="ui-fieldset">
      <legend>Choose a closing behavior:</legend>
      <div class="ui-field-group">
        <label class="ui-radio">
          <input type="radio" name="closedby-demo" value="any" checked />
          <span class="ui-label">any</span>
        </label>
        <label class="ui-radio">
          <input type="radio" name="closedby-demo" value="closerequest" />
          <span class="ui-label">closerequest</span>
        </label>
        <label class="ui-radio">
          <input type="radio" name="closedby-demo" value="none" />
          <span class="ui-label">none</span>
        </label>
      </div>
    </fieldset>
  </div>
  <div class="ui-footer">
    <button
      type="button"
      class="ui-button ui-small"
      commandfor="drawer-close-behaviors-1"
      command="close"
    >
      Close manually
    </button>
  </div>
</dialog>

<script>
  {
    const drawer = document.getElementById("drawer-close-behaviors-1")
    document
      .querySelectorAll('input[name="closedby-demo"]')
      .forEach((radio) => {
        radio.addEventListener("change", () =>
          drawer?.setAttribute("closedby", radio.value),
        )
      })
  }
</script>
```

## Accessibility

- Name the drawer with `aria-labelledby` pointing at the heading's `id`, not at `.ui-header`, which also holds the close button.
- The `autofocus` attribute should be added to the element the user is expected to interact with immediately upon opening a modal dialog. If no other element involves more immediate interaction, it is recommended to add autofocus to the close button inside the dialog, or the dialog itself if the user is expected to click/activate it to dismiss.

Source: [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog)

### Role & attributes

The `<dialog>` element has the dialog role, and opening it with `command="show-modal"` (or `showModal()`) makes it modal and the page behind it inert.

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

| Type           | Modifiers                                                     | Default | Description                                                                                                                               |
| -------------- | ------------------------------------------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Backdrop       | default, `.ui-backdrop-transparent`                           | default | The backdrop style. `"transparent"` keeps the page behind it fully visible.                                                               |
| Close behavior | `[closedby]`                                                  | -       | How the drawer can be closed. `"any"` also closes it on a click outside.                                                                  |
| Position       | default, `.ui-block-end`, `.ui-block-start`, `.ui-inline-end` | default | The side it opens from.                                                                                                                   |
| Scroll lock    | `.ui-scroll-lock`                                             | -       | Locks page scroll while the drawer is open. With a transparent backdrop the page stays scrollable, except on screens narrower than 500px. |

#### Parts

| Part               | Description                                            |
| ------------------ | ------------------------------------------------------ |
| `dialog.ui-drawer` | Container element.                                     |
| `.ui-header`       | The header, with a close button.                       |
| `<h2>`             | The title. Names the drawer through `aria-labelledby`. |
| `.ui-content`      | The scrollable content.                                |
| `.ui-footer`       | The footer.                                            |

#### CSS variables

| Variable                | Default                                           | Description                                                                                                                                                                                              |
| ----------------------- | ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--ui-backdrop-blur`    | `1px`                                             | Blur radius behind an open `Dialog` or `Drawer`.                                                                                                                                                         |
| `--ui-backdrop-color`   | `rgb(0 0 0 / 0.5)`                                | Overlay color behind an open `Dialog` or `Drawer`.                                                                                                                                                       |
| `--ui-border-color`     | `light-dark(var(--ui-gray-4), var(--ui-gray-12))` | Default border color for cards, lists, tables and dividers.                                                                                                                                              |
| `--ui-border-width`     | `1px`                                             | Default border width for components that draw a border.                                                                                                                                                  |
| `--ui-duration`         | `0.2s`                                            | Default transition duration. Multiplied by `--ui-motion`.                                                                                                                                                |
| `--ui-ease-enter`       | `var(--ease-out-3)`                               | Easing for elements entering the screen.                                                                                                                                                                 |
| `--ui-font-size-large`  | `var(--ui-font-size-500)`                         | Font size of lead paragraphs, `.ui-p.ui-large`, the `Drawer` title and large `Avatar` initials. Defaults to `--ui-font-size-500`.                                                                        |
| `--ui-motion`           | `1`                                               | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/html/guide/theming.md#motion). |
| `--ui-shadow-overlay`   | `var(--shadow-3)`                                 | Shadow of layers that float above the page: `Menu`, `Select` pickers and `Drawer`.                                                                                                                       |
| `--ui-shadow-scroll`    | `var(--shadow-4)`                                 | Shadow under the header and above the footer of a scrolled `Dialog` or `Drawer`, and under a sticky `Table` header. Defaults to Open Props `--shadow-4`.                                                 |
| `--ui-space-1`          | `calc(var(--size-1) * var(--ui-space-scale))`     | Spacing step 1: Open Props `--size-1` times `--ui-space-scale`.                                                                                                                                          |
| `--ui-space-2`          | `calc(var(--size-2) * var(--ui-space-scale))`     | Spacing step 2: Open Props `--size-2` times `--ui-space-scale`.                                                                                                                                          |
| `--ui-space-3`          | `calc(var(--size-3) * var(--ui-space-scale))`     | Spacing step 3: Open Props `--size-3` times `--ui-space-scale`.                                                                                                                                          |
| `--ui-space-6`          | `calc(var(--size-6) * var(--ui-space-scale))`     | Spacing step 6: Open Props `--size-6` times `--ui-space-scale`.                                                                                                                                          |
| `--ui-surface-elevated` | `light-dark(var(--ui-gray-1), var(--ui-gray-12))` | Background of elevated cards and accordions, dialogs, drawers, menus and native `Select` options.                                                                                                        |
| `--ui-text-strong`      | `light-dark(var(--ui-gray-15), var(--ui-gray-1))` | Strongest text color, for headings, labels and values. Body text is `--ui-text-muted`.                                                                                                                   |

This component uses these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md).

Add `autofocus` to the element that gets focus on open. It can be the root or an element inside.

### Drawer header API

#### Parts

| Part         | Description        |
| ------------ | ------------------ |
| `.ui-header` | Container element. |
| `<button>`   | Closes the drawer. |

#### CSS variables

| Variable                | Default                                           | Description                                                                                                                                                                                              |
| ----------------------- | ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--ui-backdrop-blur`    | `1px`                                             | Blur radius behind an open `Dialog` or `Drawer`.                                                                                                                                                         |
| `--ui-backdrop-color`   | `rgb(0 0 0 / 0.5)`                                | Overlay color behind an open `Dialog` or `Drawer`.                                                                                                                                                       |
| `--ui-border-color`     | `light-dark(var(--ui-gray-4), var(--ui-gray-12))` | Default border color for cards, lists, tables and dividers.                                                                                                                                              |
| `--ui-border-width`     | `1px`                                             | Default border width for components that draw a border.                                                                                                                                                  |
| `--ui-duration`         | `0.2s`                                            | Default transition duration. Multiplied by `--ui-motion`.                                                                                                                                                |
| `--ui-ease-enter`       | `var(--ease-out-3)`                               | Easing for elements entering the screen.                                                                                                                                                                 |
| `--ui-font-size-large`  | `var(--ui-font-size-500)`                         | Font size of lead paragraphs, `.ui-p.ui-large`, the `Drawer` title and large `Avatar` initials. Defaults to `--ui-font-size-500`.                                                                        |
| `--ui-motion`           | `1`                                               | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/html/guide/theming.md#motion). |
| `--ui-shadow-overlay`   | `var(--shadow-3)`                                 | Shadow of layers that float above the page: `Menu`, `Select` pickers and `Drawer`.                                                                                                                       |
| `--ui-shadow-scroll`    | `var(--shadow-4)`                                 | Shadow under the header and above the footer of a scrolled `Dialog` or `Drawer`, and under a sticky `Table` header. Defaults to Open Props `--shadow-4`.                                                 |
| `--ui-space-1`          | `calc(var(--size-1) * var(--ui-space-scale))`     | Spacing step 1: Open Props `--size-1` times `--ui-space-scale`.                                                                                                                                          |
| `--ui-space-2`          | `calc(var(--size-2) * var(--ui-space-scale))`     | Spacing step 2: Open Props `--size-2` times `--ui-space-scale`.                                                                                                                                          |
| `--ui-space-3`          | `calc(var(--size-3) * var(--ui-space-scale))`     | Spacing step 3: Open Props `--size-3` times `--ui-space-scale`.                                                                                                                                          |
| `--ui-space-6`          | `calc(var(--size-6) * var(--ui-space-scale))`     | Spacing step 6: Open Props `--size-6` times `--ui-space-scale`.                                                                                                                                          |
| `--ui-surface-elevated` | `light-dark(var(--ui-gray-1), var(--ui-gray-12))` | Background of elevated cards and accordions, dialogs, drawers, menus and native `Select` options.                                                                                                        |
| `--ui-text-strong`      | `light-dark(var(--ui-gray-15), var(--ui-gray-1))` | Strongest text color, for headings, labels and values. Body text is `--ui-text-muted`.                                                                                                                   |

This component uses these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md).

### Drawer footer API

#### Parts

| Part         | Description                                                                                                      |
| ------------ | ---------------------------------------------------------------------------------------------------------------- |
| `.ui-footer` | Container element. Lays out its content in a row, aligned to the end, or to the start in an `inline-end` drawer. |

#### CSS variables

| Variable                | Default                                           | Description                                                                                                                                                                                              |
| ----------------------- | ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--ui-backdrop-blur`    | `1px`                                             | Blur radius behind an open `Dialog` or `Drawer`.                                                                                                                                                         |
| `--ui-backdrop-color`   | `rgb(0 0 0 / 0.5)`                                | Overlay color behind an open `Dialog` or `Drawer`.                                                                                                                                                       |
| `--ui-border-color`     | `light-dark(var(--ui-gray-4), var(--ui-gray-12))` | Default border color for cards, lists, tables and dividers.                                                                                                                                              |
| `--ui-border-width`     | `1px`                                             | Default border width for components that draw a border.                                                                                                                                                  |
| `--ui-duration`         | `0.2s`                                            | Default transition duration. Multiplied by `--ui-motion`.                                                                                                                                                |
| `--ui-ease-enter`       | `var(--ease-out-3)`                               | Easing for elements entering the screen.                                                                                                                                                                 |
| `--ui-font-size-large`  | `var(--ui-font-size-500)`                         | Font size of lead paragraphs, `.ui-p.ui-large`, the `Drawer` title and large `Avatar` initials. Defaults to `--ui-font-size-500`.                                                                        |
| `--ui-motion`           | `1`                                               | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/html/guide/theming.md#motion). |
| `--ui-shadow-overlay`   | `var(--shadow-3)`                                 | Shadow of layers that float above the page: `Menu`, `Select` pickers and `Drawer`.                                                                                                                       |
| `--ui-shadow-scroll`    | `var(--shadow-4)`                                 | Shadow under the header and above the footer of a scrolled `Dialog` or `Drawer`, and under a sticky `Table` header. Defaults to Open Props `--shadow-4`.                                                 |
| `--ui-space-1`          | `calc(var(--size-1) * var(--ui-space-scale))`     | Spacing step 1: Open Props `--size-1` times `--ui-space-scale`.                                                                                                                                          |
| `--ui-space-2`          | `calc(var(--size-2) * var(--ui-space-scale))`     | Spacing step 2: Open Props `--size-2` times `--ui-space-scale`.                                                                                                                                          |
| `--ui-space-3`          | `calc(var(--size-3) * var(--ui-space-scale))`     | Spacing step 3: Open Props `--size-3` times `--ui-space-scale`.                                                                                                                                          |
| `--ui-space-6`          | `calc(var(--size-6) * var(--ui-space-scale))`     | Spacing step 6: Open Props `--size-6` times `--ui-space-scale`.                                                                                                                                          |
| `--ui-surface-elevated` | `light-dark(var(--ui-gray-1), var(--ui-gray-12))` | Background of elevated cards and accordions, dialogs, drawers, menus and native `Select` options.                                                                                                        |
| `--ui-text-strong`      | `light-dark(var(--ui-gray-15), var(--ui-gray-1))` | Strongest text color, for headings, labels and values. Body text is `--ui-text-muted`.                                                                                                                   |

This component uses these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md).

## Component properties

Set these on the component itself, inline or in your own CSS. Inputs are the knobs. Outputs are derived from the inputs and the current state, so overriding one fixes it in every state. [Customizing](https://open-props-ui.netlify.app/html/guide/customizing.md#component-properties) has examples.

| Property               | Kind   | Description                                                                                          |
| ---------------------- | ------ | ---------------------------------------------------------------------------------------------------- |
| `--_backdrop-bg-color` | Input  | The backdrop color. Defaults to `--ui-backdrop-color`, `.ui-backdrop-transparent` clears it.         |
| `--_backdrop-blur`     | Input  | The backdrop filter. Defaults to a `--ui-backdrop-blur` blur, `.ui-backdrop-transparent` removes it. |
| `--_bg-color`          | Input  | The background. Defaults to `--ui-surface-elevated`.                                                 |
| `--_block-size`        | Input  | Height of `.ui-block-start` and `.ui-block-end` drawers.                                             |
| `--_border-color`      | Input  | Color of the inner edge border and the `.ui-header` and `.ui-footer` dividers.                       |
| `--_border-width`      | Input  | Width of the inner edge border and the `.ui-header` and `.ui-footer` dividers.                       |
| `--_content-padding`   | Input  | Padding of `.ui-content`.                                                                            |
| `--_dir`               | Output | Direction of the inline slide, `-1` in right-to-left.                                                |
| `--_duration`          | Output | Duration of the transitions, `--ui-duration` times `--_motion`.                                      |
| `--_ease`              | Input  | Easing of the slide and backdrop fade. Defaults to `--ui-ease-enter`.                                |
| `--_footer-gap`        | Input  | Gap between items in `.ui-footer`.                                                                   |
| `--_footer-padding`    | Input  | Padding of `.ui-footer`.                                                                             |
| `--_header-font-size`  | Input  | Font size of headings in `.ui-header`.                                                               |
| `--_header-padding`    | Input  | Padding of `.ui-header`.                                                                             |
| `--_inline-size`       | Input  | Width of `.ui-inline-start` and `.ui-inline-end` drawers.                                            |
| `--_motion`            | Input  | Motion multiplier for the transitions. `0` turns them off.                                           |
| `--_scroll-shadow`     | Input  | Shadow at the edges of `.ui-content` when it scrolls. Defaults to `--ui-shadow-scroll`.              |
| `--_shadow`            | Input  | The shadow. Defaults to `--ui-shadow-overlay`.                                                       |
| `--_text-color`        | Input  | The text color. Defaults to `--ui-text-strong`.                                                      |

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
  background-color: var(--ui-surface-elevated);
  border: none;
  box-shadow: var(--ui-shadow-overlay);
  color: var(--ui-text-strong);
  display: flex;
  flex-direction: column;
  padding: 0;
}

.drawer:not([open]) {
  display: none;
}

.drawer > .content {
  flex: 1;
  overflow-block: auto;
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
  border-inline-end: 1px solid var(--ui-border-color-on-raised);
  inline-size: min(375px, 100vi);
  inset-block: 0;
  inset-inline: 0 auto;
  max-block-size: 100%;
}

.drawer.block-end {
  block-size: min(80vb, 650px);
  border-block-start: 1px solid var(--ui-border-color-on-raised);
  inline-size: 100dvi;
  inset-block: auto 0;
  inset-inline: 0;
  max-block-size: 80dvb;
}
```

Step 3 of 5: Shadow

- [Anchor positioning ](https://webstatus.dev/features/anchor-positioning)(Limited availability): Chrome 151+, Edge 151+, Firefox 151+, Safari 27+
- [Container scroll-state queries ](https://webstatus.dev/features/container-scroll-state-queries)(Limited availability): Chrome 133+, Edge 133+, Firefox not supported, Safari not supported

```css
.drawer > .content {
  anchor-name: --content;
  container-type: scroll-state;
}

.drawer > .content::before,
.drawer > .content::after {
  block-size: var(--ui-space-2);
  box-shadow: var(--ui-shadow-scroll);
  clip-path: inset(100% 0 calc(-1 * var(--ui-space-6)));
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
  backdrop-filter: blur(var(--ui-backdrop-blur));
  background-color: var(--ui-backdrop-color);
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

- Chromium: Full support Supported since v151.
- Firefox: Partial support Missing: container-scroll-state-queries, display-animation, overlay.
- Safari: Partial support Missing: container-scroll-state-queries, dialog-closedby, overlay.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/html/guide/browser-support/?components=Drawer.md).

## Installation

Copy the CSS into your project to own it. It reads tokens from Open Props, `palette.css` and `theme.css`, so those go on the page too, after `layers.css`. See [Getting started](https://open-props-ui.netlify.app/html/guide/getting-started.md).

- `opui-css/css/components/drawer.css`

## Changelog

### What's new

- Several header actions line up at the end, and a subtle scroll shadow shows while the content scrolls ([Basics](#basics)).
- Name it with [`aria-labelledby`](#accessibility) pointing at the header heading.
- The [backdrop](#basics) dims and blurs like `Dialog`, through `--ui-backdrop-color` and `--ui-backdrop-blur`.
- Breaking: `--_color` is `--_text-color`, and `--_transition-duration` and `--_transition-timing` are `--_duration` and `--_ease` ([Under the hood](#under-the-hood)).
- The drawer shadow is [`--ui-shadow-overlay`](#api), shared with menus and select pickers. Padding reads the `--ui-space-*` scale.
- Content padding is `--ui-space-3`, like the header and footer ([Basics](#basics)).
- The scroll shadow reads [`--ui-shadow-scroll`](#api).
- The panel sits on [`--ui-surface-elevated`](#api), like Dialog and Menu.
- A drawer opens from the [inline start](#basics) without `.ui-inline-start`.
