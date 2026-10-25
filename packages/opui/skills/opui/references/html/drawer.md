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

- `.ui-actions`

  The actions, at the end.

## Basics

A drawer opens from the inline start by default. Change the side with the `.ui-inline-end`, `.ui-block-start` and `.ui-block-end` classes.

Put more actions before the close button in `.ui-header`; they line up at the end. `.ui-header` and `.ui-actions` stay put while `.ui-content` scrolls, with a shadow on the scrolled edge. The actions sit at the end, and `.ui-align-start` lines them up with the content.

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
    <button type="button" class="ui-button ui-round ui-small" aria-label="Edit">
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
      >
        <path
          fill="currentColor"
          d="M21.65 3.434a4.889 4.889 0 1 1 6.915 6.914l-.902.901l-6.914-6.914zM19.335 5.75L4.357 20.73a3.7 3.7 0 0 0-1.002 1.84l-1.333 6.22a1 1 0 0 0 1.188 1.188l6.22-1.333a3.7 3.7 0 0 0 1.84-1.002l14.98-14.98z"
        />
      </svg>
    </button>
    <button
      type="button"
      class="ui-button ui-round ui-small"
      aria-label="Close"
      commandfor="drawer-basics-1"
      command="close"
    >
      <svg aria-hidden="true" viewBox="0 0 32 32"></svg>
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
    <p>
      Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
      fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem
      sequi nesciunt.
    </p>
    <p>
      Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
      consectetur, adipisci velit, sed quia non numquam eius modi tempora
      incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
    </p>
    <p>
      Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis
      suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.
    </p>
    <p>
      Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam
      nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas
      nulla pariatur.
    </p>
    <p>
      At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
      praesentium voluptatum deleniti atque corrupti quos dolores et quas
      molestias excepturi sint occaecati cupiditate non provident.
    </p>
    <p>
      Similique sunt in culpa qui officia deserunt mollitia animi, id est
      laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita
      distinctio.
    </p>
  </div>
  <div class="ui-actions">
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
      <svg aria-hidden="true" viewBox="0 0 32 32"></svg>
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
  <div class="ui-actions">
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
      <svg aria-hidden="true" viewBox="0 0 32 32"></svg>
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
  <div class="ui-actions">
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
      <svg aria-hidden="true" viewBox="0 0 32 32"></svg>
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
  <div class="ui-actions">
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

| Value | Closes with |
| --- | --- |
| `closedby="any"` | A click outside the drawer, `Esc` or the platform's close request (like the back gesture on mobile), and your own close button. |
| `closedby="closerequest"` | `Esc` or the platform's close request, and your own close button. A click outside does nothing. |
| `closedby="none"` | Only your own close button (`command="close"`), `close()` or a form with `method="dialog"`. |

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
      <svg aria-hidden="true" viewBox="0 0 32 32"></svg>
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
  <div class="ui-actions">
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

| Role/attribute | Usage |
| --- | --- |
| `aria-labelledby="IDREF"` | Gives the drawer an accessible name by referring to the element that provides the drawer title. |
| `aria-describedby="IDREF"` | Optional. Gives the drawer an accessible description by referring to the drawer content that describes the primary message or purpose of the drawer. |

### Keyboard support

| Key | Function |
| --- | --- |
| `Tab` | Moves focus to the next focusable element in the drawer. After the last one, focus moves to the browser's own controls (like the address bar), then back to the first element in the drawer. The page behind it is inert. |
| `Shift + Tab` | Moves focus to the previous focusable element. Before the first one, focus moves to the browser's controls, then to the last element in the drawer. |
| `Esc` | Closes the drawer, unless `closedby="none"`, and returns focus to the element that opened it. |

## API

### Drawer API

| Type | Modifiers | Default | Description |
| --- | --- | --- | --- |
| Backdrop | default, `.ui-backdrop-transparent` | default | The backdrop style. `"transparent"` keeps the page behind it fully visible. |
| Behavior | `[closedby]` | - | How the drawer can be closed. `"any"` also closes it on a click outside. |
| Position | default, `.ui-block-end`, `.ui-block-start`, `.ui-inline-end` | default | The side it opens from. |
| Scroll lock | `.ui-scroll-lock` | - | Locks page scroll while the drawer is open. With a transparent backdrop the page stays scrollable, except on screens narrower than 500px. |

#### Parts

| Part | Description |
| --- | --- |
| `dialog.ui-drawer` | Container element. |
| `.ui-header` | The header, with a close button. |
| `<h2>` | The title. Names the drawer through `aria-labelledby`. |
| `.ui-content` | The scrollable content. |
| `.ui-actions` | The actions, at the end. |

Add `autofocus` to the element that gets focus on open. It can be the root or an element inside.

### Drawer header API

#### Parts

| Part | Description |
| --- | --- |
| `.ui-header` | Container element. |
| `<button>` | Closes the drawer. |

### Drawer actions API

| Type | Modifiers | Default | Description |
| --- | --- | --- | --- |
| Alignment | default, `.ui-align-start` | default | Alignment for the actions. |

#### Parts

| Part | Description |
| --- | --- |
| `.ui-actions` | A group of actions, such as buttons. |

### CSS variables

| Variable | Default | Description |
| --- | --- | --- |
| `--ui-backdrop-bg-color` | `light-dark( oklch(from var(--ui-text) l c h / 50%), oklch(from var(--ui-surface) calc(l / 2) c h / 50%) )` | Overlay color behind an open `Dialog` or `Drawer`. `--ui-text` at 50% in light mode, and half the lightness of `--ui-surface` at 50% in dark mode. |
| `--ui-backdrop-blur` | `1px` | Blur radius behind an open `Dialog` or `Drawer`. |
| `--ui-border-color` | `light-dark( color-mix( in oklch, var(--ui-text-strong) var(--ui-border-strength-light), var(--ui-surface) ), color-mix( in oklch, var(--ui-text-strong) var(--ui-border-strength-dark), var(--ui-surface) ) )` | Default border color for cards, lists, tables and dividers. `--ui-text-strong` mixed into `--ui-surface` at `--ui-border-strength-light` or `--ui-border-strength-dark`. |
| `--ui-border-color-on-raised` | `light-dark( color-mix( in oklch, var(--ui-text-strong) var(--ui-border-strength-light), var(--ui-surface) ), color-mix( in oklch, var(--ui-text-strong) var(--ui-border-strength-dark), var(--ui-surface) ) )` | Border color inside raised surfaces: tonal and elevated `Card` and `Accordion`, `Dialog`, `Drawer`, `Menu` and `Callout` without a severity. The same mix as `--ui-border-color` by default. Each raised component sets `--ui-border-color` to it on its root, so a theme that wants another border on raised surfaces, such as the page background in dark mode, sets this one. |
| `--ui-border-width` | `1px` | Default border width for components that draw a border. |
| `--ui-duration-slow` | `0.3s` | Transition duration for entering and leaving overlays: `Dialog`, `Drawer` and `Menu`. |
| `--ui-ease-enter` | `cubic-bezier(0, 0, 0.3, 1)` | Easing for elements entering the screen: opening `Dialog`, `Drawer` and `Menu`, and the `Badge`, `Progress` and `Tooltip` transitions. |
| `--ui-ease-exit` | `cubic-bezier(0.7, 0, 1, 1)` | Easing for elements leaving the screen: closing `Drawer` and `Menu`. |
| `--ui-field-border-color-on-raised` | `color-mix( in oklch, var(--ui-text-strong) var(--ui-field-border-strength), var(--ui-surface) )` | Field border color inside raised surfaces. The same mix as `--ui-field-border-color` by default. Each raised component sets `--ui-field-border-color` to it on its root. |
| `--ui-font-size-large` | `var(--ui-font-size-500)` | Font size of lead paragraphs, `.ui-p.ui-large`, the `Drawer` title and large `Avatar` initials. Defaults to `--ui-font-size-500`. |
| `--ui-motion` | `1` | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/html/guide/theming.md#motion). |
| `--ui-shadow-overlay` | `0 -1px 3px 0 hsl(from var(--ui-shadow-color) h s l / calc(alpha + 0.02)), 0 1px 2px -5px hsl(from var(--ui-shadow-color) h s l / calc(alpha + 0.02)), 0 2px 5px -5px hsl(from var(--ui-shadow-color) h s l / calc(alpha + 0.04)), 0 4px 12px -5px hsl(from var(--ui-shadow-color) h s l / calc(alpha + 0.05)), 0 12px 15px -5px hsl(from var(--ui-shadow-color) h s l / calc(alpha + 0.07))` | Shadow of layers that float above the page: `Dialog`, `Drawer`, `Menu`, `Select` pickers and the `Carousel` buttons. Five layers of `--ui-shadow-color`. |
| `--ui-shadow-scroll` | `0 -2px 5px 0 hsl(from var(--ui-shadow-color) h s l / calc(alpha + 0.02)), 0 1px 1px -2px hsl(from var(--ui-shadow-color) h s l / calc(alpha + 0.03)), 0 2px 2px -2px hsl(from var(--ui-shadow-color) h s l / calc(alpha + 0.03)), 0 5px 5px -2px hsl(from var(--ui-shadow-color) h s l / calc(alpha + 0.04)), 0 9px 9px -2px hsl(from var(--ui-shadow-color) h s l / calc(alpha + 0.05)), 0 16px 16px -2px hsl(from var(--ui-shadow-color) h s l / calc(alpha + 0.06))` | Shadow under the header and above the footer of a scrolled `Dialog` or `Drawer`, and under a sticky `Table` header. Six layers of `--ui-shadow-color`. |
| `--ui-space-1` | `calc(0.25rem * var(--ui-space-scale))` | Spacing step 1: `0.25rem` times `--ui-space-scale`. |
| `--ui-space-2` | `calc(0.5rem * var(--ui-space-scale))` | Spacing step 2: `0.5rem` times `--ui-space-scale`. |
| `--ui-space-3` | `calc(1rem * var(--ui-space-scale))` | Spacing step 3: `1rem` times `--ui-space-scale`. |
| `--ui-space-6` | `calc(1.75rem * var(--ui-space-scale))` | Spacing step 6: `1.75rem` times `--ui-space-scale`. |
| `--ui-surface-elevated` | `light-dark(var(--ui-gray-1), var(--ui-gray-12))` | Background of elevated cards and accordions, dialogs, drawers, menus and native `Select` options. |
| `--ui-text-strong` | `light-dark(var(--ui-gray-15), var(--ui-gray-1))` | Strongest text color, for headings, labels and values. Body text is `--ui-text`. |

The stylesheets on this page read these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md).

## Component properties

Set these on the component itself, inline or in your own CSS. Inputs are the knobs. Outputs are derived from the inputs and the current state, so overriding one fixes it in every state. [Customizing](https://open-props-ui.netlify.app/html/guide/customizing.md#component-properties) has examples.

| Property | Kind | Description |
| --- | --- | --- |
| `--_actions-gap` | Input | Gap between items in `.ui-actions`. |
| `--_actions-padding` | Input | Padding of `.ui-actions`. |
| `--_backdrop-bg-color` | Input | The backdrop color. Defaults to `--ui-backdrop-bg-color`, `.ui-backdrop-transparent` clears it. |
| `--_backdrop-blur` | Input | The backdrop filter. Defaults to a `--ui-backdrop-blur` blur, `.ui-backdrop-transparent` removes it. |
| `--_bg-color` | Input | The background. Defaults to `--ui-surface-elevated`. |
| `--_block-size` | Input | Height of `.ui-block-start` and `.ui-block-end` drawers. |
| `--_border-color` | Input | Color of the inner edge border and the `.ui-header` and `.ui-actions` dividers. |
| `--_border-width` | Input | Width of the inner edge border and the `.ui-header` and `.ui-actions` dividers. |
| `--_content-padding` | Input | Padding of `.ui-content`. |
| `--_direction` | Output | Direction of the inline slide, `-1` in right-to-left. |
| `--_duration` | Output | Duration of the transitions, `--ui-duration-slow` times `--_motion`. |
| `--_ease` | Output | Easing of the slide and backdrop fade. `--ui-ease-enter` while opening and `--ui-ease-exit` while closing. |
| `--_header-font-size` | Input | Font size of headings in `.ui-header`. |
| `--_header-padding` | Input | Padding of `.ui-header`. |
| `--_inline-size` | Input | Width of drawers that open from the inline start or end. |
| `--_motion` | Input | Motion multiplier for the transitions. `0` turns them off. |
| `--_scroll-shadow` | Input | Shadow at the edges of `.ui-content` when it scrolls. Defaults to `--ui-shadow-scroll`. |
| `--_shadow` | Input | The shadow. Defaults to `--ui-shadow-overlay`. |
| `--_text-color` | Input | The text color. Defaults to `--ui-text-strong`. |

## Installation

Copy the CSS into your project to own it. It reads tokens from Open Props, `palette.css` and `theme.css`, so those go on the page too, after `layers.css`. See [Getting started](https://open-props-ui.netlify.app/html/guide/getting-started.md).

- `opui-css/css/components/drawer.css`

## Used in blocks

- [App shell](https://open-props-ui.netlify.app/blocks/app-shell.md)
- [Chat](https://open-props-ui.netlify.app/blocks/chat.md)
- [Inbox](https://open-props-ui.netlify.app/blocks/inbox.md)
