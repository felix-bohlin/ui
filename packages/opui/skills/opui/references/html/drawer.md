# Drawer

Slides in from the sides, top or bottom of the screen.

## Usage

Change the opening side with the `.ui-inline-start`, `.ui-inline-end`, `.ui-block-start`, and `.ui-block-end` classes.

The backdrop is blurred by default. Use the `.ui-backdrop-transparent`class to remove the blur effect.

Add the `.ui-scroll-lock` utility class to the drawer to lock page scrolling while it's open. Omit the class to allow background scrolling.

```html
<div class="drawer-examples">
  <button
    class="ui-button top"
    commandfor="drawer-block-start-html"
    command="show-modal"
  >
    Block Start
  </button>
  <button
    class="ui-button left"
    commandfor="drawer-inline-start-html"
    command="show-modal"
  >
    Inline Start
  </button>
  <button
    class="ui-button right"
    commandfor="drawer-inline-end-html"
    command="show-modal"
  >
    Inline End
  </button>
  <button
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
  closedby="any"
>
  <div class="ui-header">
    <h2>Inline Start</h2>
    <button
      class="ui-button ui-rounded ui-ripple ui-small"
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
  closedby="any"
>
  <div class="ui-header">
    <h2>Inline End</h2>
    <button
      class="ui-button ui-rounded ui-ripple ui-small"
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
  closedby="any"
>
  <div class="ui-header">
    <h2>Block Start</h2>
    <button
      class="ui-button ui-rounded ui-ripple ui-small"
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
  closedby="any"
>
  <div class="ui-header">
    <h2>Block End</h2>
    <button
      class="ui-button ui-rounded ui-ripple ui-small"
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

You can use it like this: `<dialog closedby="">` and give it the following values:

| Attr value                | Description                                                                                                                 |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `closedby="any"`          | Click anywhere outside of the drawer to close it.                                                                           |
| `closedby="closerequest"` | Device-specific way to close, ex: `Esc` on desktop, back button on mobile, and whatever dismiss action assistive tools use. |
| `closedby="none"`         | You have to handroll a closing solution yourself.                                                                           |

## Accessibility

- The `autofocus` attribute should be added to the element the user is expected to interact with immediately upon opening a modal dialog. If no other element involves more immediate interaction, it is recommended to add autofocus to the close button inside the dialog, or the dialog itself if the user is expected to click/activate it to dismiss.
- Do not add the `tabindex` property to the`<dialog>` element as it is not interactive and does not receive focus. The dialog's contents, including the close button contained in the dialog, can receive focus and be interactive.

Source: [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog)

### Role & attributes

| Role/attribute             | Usage                                                                                                                                      |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `role="dialog"`            | Identifies the element that serves as the drawer container.                                                                                |
| `aria-labelledby="IDREF"`  | Gives the drawer an accessible name by referring to the element that provides the drawer title.                                            |
| `aria-describedby="IDREF"` | Gives the drawer an accessible description by referring to the drawer content that describes the primary message or purpose of the drawer. |
| `aria-modal="true"`        | Tells assistive technologies that the windows underneath the current drawer are not available for interaction (inert).                     |

### Keyboard support

| Key           | Function                                                                                                                                                                              |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Tab`         | - Moves focus to next focusable element inside the drawer.
- When focus is on the last focusable element in the drawer, moves focus to the first focusable element in the drawer.     |
| `Shift + Tab` | * Moves focus to previous focusable element inside the drawer.
* When focus is on the first focusable element in the drawer, moves focus to the last focusable element in the drawer. |
| `Esc`         | Closes the drawer.                                                                                                                                                                    |

## API

### Drawer API

| Type           | Modifiers                                                                | Default            | Description                                                              |
| -------------- | ------------------------------------------------------------------------ | ------------------ | ------------------------------------------------------------------------ |
| Backdrop       | default, `.ui-backdrop-transparent`                                      | default            | The backdrop style.                                                      |
| Close behavior | `[closedby]`                                                             | -                  | How the drawer can be closed. `"any"` also closes it on a click outside. |
| Scroll lock    | `.ui-scroll-lock`                                                        | -                  | Locks page scroll while the drawer is open.                              |
| Sides          | `.ui-block-end`, `.ui-block-start`, `.ui-inline-end`, `.ui-inline-start` | `.ui-inline-start` | The side it opens from.                                                  |

#### Parts

| Part               | Description                                                |
| ------------------ | ---------------------------------------------------------- |
| `dialog.ui-drawer` | Container element.                                         |
| `.ui-header`       | The header. `DrawerHeader` renders it with a close button. |
| `.ui-content`      | The scrollable content.                                    |
| `.ui-footer`       | The footer. `DrawerFooter` renders it.                     |

#### CSS variables

| Variable            | Default                                     | Description                                                                                                                |
| ------------------- | ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `--backdrop-blur`   | `1px`                                       | Blur radius behind an open `Dialog` or `Drawer`.                                                                           |
| `--backdrop-color`  | `rgb(0 0 0 / 0.5)`                          | Overlay color behind an open `Dialog` or `Drawer`.                                                                         |
| `--border-color`    | `light-dark(var(--gray-4), var(--gray-12))` | Default border color for cards, lists, tables and dividers.                                                                |
| `--border-width`    | `1px`                                       | Default border width for components that draw a border.                                                                    |
| `--duration`        | `0.2s`                                      | Default transition duration. Multiplied by `--motion`.                                                                     |
| `--ease-enter`      | `var(--ease-out-3)`                         | Easing for elements entering the screen.                                                                                   |
| `--motion`          | `1`                                         | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. |
| `--surface-default` | `light-dark(var(--gray-1), var(--gray-13))` | Page and card background.                                                                                                  |
| `--text-primary`    | `light-dark(var(--gray-15), var(--gray-1))` | Emphasized text color for headings, labels and values.                                                                     |

Theme tokens this component reads. Override them on `html`or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md)for the full list.

Add `autofocus` to the root, or to an element inside, to choose what gets focus when it opens.

### Drawer header API

#### Parts

| Part         | Description        |
| ------------ | ------------------ |
| `.ui-header` | Container element. |
| `<h2>`       | The heading.       |
| `<button>`   | Closes the drawer. |

#### CSS variables

| Variable            | Default                                     | Description                                                                                                                |
| ------------------- | ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `--backdrop-blur`   | `1px`                                       | Blur radius behind an open `Dialog` or `Drawer`.                                                                           |
| `--backdrop-color`  | `rgb(0 0 0 / 0.5)`                          | Overlay color behind an open `Dialog` or `Drawer`.                                                                         |
| `--border-color`    | `light-dark(var(--gray-4), var(--gray-12))` | Default border color for cards, lists, tables and dividers.                                                                |
| `--border-width`    | `1px`                                       | Default border width for components that draw a border.                                                                    |
| `--duration`        | `0.2s`                                      | Default transition duration. Multiplied by `--motion`.                                                                     |
| `--ease-enter`      | `var(--ease-out-3)`                         | Easing for elements entering the screen.                                                                                   |
| `--motion`          | `1`                                         | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. |
| `--surface-default` | `light-dark(var(--gray-1), var(--gray-13))` | Page and card background.                                                                                                  |
| `--text-primary`    | `light-dark(var(--gray-15), var(--gray-1))` | Emphasized text color for headings, labels and values.                                                                     |

Theme tokens this component reads. Override them on `html`or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md)for the full list.

## Browser support

- Chromium: Full support Supported since v135.
- Firefox: Partial support Missing: display-animation, overlay.
- Safari: Partial support Missing: dialog-closedby, overlay.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/html/guide/browser-support/?components=Drawer.md).

## Installation

- `opui-css/css/components/drawer.css`

