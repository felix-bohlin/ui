# Dialog

Use a Dialog for a question or a short task that needs the user's full attention. For navigation, filters or side content, use a [Drawer](https://open-props-ui.netlify.app/html/components/drawer.md).

## Anatomy

- `dialog.ui-dialog`

  Container element.

- `<hgroup>`

  The dialog header.

- `.ui-content`

  The dialog content.

- `.ui-actions`

  A group of actions, such as buttons.

### Modal vs dialog

The terms "modal" and "dialog" are often used interchangeably, but there's an important difference. A modal window describes parts of a UI that [blocks user interaction](#modal). A dialog [doesn't have to be blocking ](#non-modal).

## Usage

### Non-modal

- [Toast](https://open-props-ui.netlify.app/html/components/toast.md) : informative but non-interruptive

### Modal

### HTML only

In browsers that support [Invoker Commands](https://developer.mozilla.org/en-US/docs/Web/API/Invoker_Commands_API) you can toggle a `<dialog>` with HTML only, using the `commandfor` and `command` attributes.

Name the dialog by pointing `aria-labelledby` at its title.

```html
<button
  type="button"
  commandfor="example-dialog-html"
  command="show-modal"
  class="ui-button ui-outlined"
>
  Open dialog
</button>


<dialog
  id="example-dialog-html"
  class="ui-dialog ui-card ui-elevated"
  aria-labelledby="example-dialog-title-html"
>
  <hgroup id="example-dialog-title-html">
    <h2 class="ui-h4">Newsletter</h2>
  </hgroup>
  <div class="ui-content">
    <p>
      Get a short email when we ship something new. No more than once a month.
    </p>
  </div>
  <div class="ui-actions">
    <button
      commandfor="example-dialog-html"
      command="close"
      class="ui-button"
      type="button"
    >
      Not now
    </button>
    <button
      commandfor="example-dialog-html"
      command="close"
      class="ui-button ui-filled"
      type="button"
    >
      Subscribe
    </button>
  </div>
</dialog>
```

## Alert dialog

Use `role="alertdialog"` when the dialog interrupts with something that needs a response, like confirming a destructive action. Point `aria-describedby` at the message so screen readers read it when the dialog opens.

```html
<button
  type="button"
  commandfor="alert-dialog-html"
  command="show-modal"
  class="ui-button ui-outlined ui-critical"
>
  Delete project
</button>


<dialog
  id="alert-dialog-html"
  class="ui-dialog ui-card ui-elevated"
  role="alertdialog"
  aria-labelledby="alert-dialog-title-html"
  aria-describedby="alert-dialog-description-html"
>
  <hgroup id="alert-dialog-title-html">
    <h2 class="ui-h4">Delete project?</h2>
  </hgroup>
  <div class="ui-content">
    <p id="alert-dialog-description-html">
      This deletes the project and all its files. You can't undo this.
    </p>
  </div>
  <div class="ui-actions">
    <button
      commandfor="alert-dialog-html"
      command="close"
      class="ui-button"
      type="button"
    >
      Cancel
    </button>
    <button
      commandfor="alert-dialog-html"
      command="close"
      class="ui-button ui-filled ui-critical"
      type="button"
    >
      Delete
    </button>
  </div>
</dialog>
```

## Long content

The dialog grows up to 85% of the viewport height. The header and actions stay put while `.ui-content` scrolls, with a shadow on the scrolled edge. A modal dialog also locks page scroll.

```html
<button
  type="button"
  commandfor="example-dialog-long-html"
  command="show-modal"
  class="ui-button ui-outlined"
>
  Read the terms
</button>


<dialog
  id="example-dialog-long-html"
  class="ui-dialog ui-card ui-elevated"
  aria-labelledby="example-dialog-long-title-html"
>
  <hgroup id="example-dialog-long-title-html">
    <h2 class="ui-h4">Terms of service</h2>
  </hgroup>
  <div class="ui-content">
    <p>
      These terms cover your use of the service and any content you upload. By
      creating an account you agree to them, and to any updates we publish on
      this page.
    </p>
    <p>
      You own the files you upload. You give us permission to store, copy and
      display them only as needed to run the service for you and the people you
      share them with.
    </p>
    <p>
      Keep your password safe and tell us right away if someone else gets into
      your account. You are responsible for what happens in your account until
      you do.
    </p>
    <p>
      Don't use the service to break the law, to send spam, or to upload
      anything that harms other people's devices or data. We may remove content
      that does.
    </p>
    <p>
      We back up your data every day, but we can't promise that nothing will
      ever be lost. Keep your own copy of anything you can't afford to lose.
    </p>
    <p>
      Paid plans renew every month until you cancel. You can cancel at any time
      from your account settings, and you keep access until the end of the paid
      period.
    </p>
    <p>
      We may change or stop parts of the service. When a change takes something
      away from you, we tell you at least 30 days before it happens.
    </p>
    <p>
      You can close your account whenever you want. We delete your files within
      30 days, except where the law requires us to keep them longer.
    </p>
    <p>
      If something goes wrong, our liability is limited to what you paid us in
      the last 12 months. Some places don't allow this limit, and then it
      doesn't apply.
    </p>
    <p>
      We use cookies to keep you signed in and to remember your settings. We
      don't use them to show you ads, and we don't sell what we learn from them.
    </p>
    <p>
      We may ask partners to help run parts of the service, like payments and
      email. They only get the data they need for that job, and they have to
      protect it like we do.
    </p>
    <p>
      When we get a legal request for your data, we check that it's valid and
      tell you about it, unless the law doesn't let us.
    </p>
    <p>
      These terms are governed by the law of the country where our company is
      registered. If a part of them can't be enforced, the rest still applies.
    </p>
    <p>
      Questions about these terms go to our support team. We answer within two
      working days.
    </p>
  </div>
  <div class="ui-actions">
    <button
      commandfor="example-dialog-long-html"
      command="close"
      class="ui-button"
      type="button"
    >
      Decline
    </button>
    <button
      commandfor="example-dialog-long-html"
      command="close"
      class="ui-button ui-filled"
      type="button"
    >
      Accept
    </button>
  </div>
</dialog>
```

## How to close a dialog

Set `closedby` on the `<dialog>` to choose how the dialog can be closed.

| Value                     | Closes with                                                                                                                     |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `closedby="any"`          | A click outside the dialog, `Esc` or the platform's close request (like the back gesture on mobile), and your own close button. |
| `closedby="closerequest"` | `Esc` or the platform's close request, and your own close button. A click outside does nothing.                                 |
| `closedby="none"`         | Only your own close button (`command="close"`), `close()` or a form with `method="dialog"`.                                     |

Without `closedby`, the browser picks: a modal dialog, opened with `command="show-modal"` or `showModal()`, acts like `closerequest`, and a non-modal one like `none`.

```html
<button
  type="button"
  commandfor="closing-behaviors-dialog-html"
  command="show-modal"
  class="ui-button ui-outlined"
>
  Open dialog
</button>


<dialog
  aria-labelledby="dialog-header"
  id="closing-behaviors-dialog-html"
  class="ui-dialog ui-card ui-elevated"
  closedby="any"
>
  <hgroup id="dialog-header">
    <h2 class="ui-h4">How to close</h2>
  </hgroup>
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
      commandfor="closing-behaviors-dialog-html"
      command="close"
      class="ui-button"
    >
      Close manually
    </button>
  </div>
</dialog>


<script>
  const radios = document.querySelectorAll('input[name="closedby-demo"]')


  radios.forEach((radio) => {
    radio.addEventListener("change", () => {
      const dialog = radio
        .closest(".example-preview")
        ?.querySelector("#closing-behaviors-dialog-html")
      if (dialog instanceof HTMLDialogElement) {
        dialog.setAttribute("closedby", radio.value)
      }
    })
  })
</script>
```

## Accessibility

- The `tabindex` attribute must **not** be used on the `<dialog>` element.

### Role & attributes

Don't add `role="dialog"` or `aria-modal="true"`. The `<dialog>` element has the dialog role, and opening it with `command="show-modal"` (or `showModal()`) makes it modal and the page behind it inert.

| Role/attribute             | Usage                                                                                                                                                                  |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `aria-labelledby="IDREF"`  | Gives the dialog an accessible name by referring to the element that provides the dialog title.                                                                        |
| `aria-describedby="IDREF"` | Optional. Gives the dialog an accessible description by referring to the dialog content that describes the primary message or purpose of the dialog.                   |
| `role="alertdialog"`       | Only if the dialog is a confirmation window communicating an important message that requires a confirmation or other user response. See [alert dialog](#alert-dialog). |

### Keyboard support

| Key           | Function                                                                                                                                                                                                                  |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Tab`         | Moves focus to the next focusable element in the dialog. After the last one, focus moves to the browser's own controls (like the address bar), then back to the first element in the dialog. The page behind it is inert. |
| `Shift + Tab` | Moves focus to the previous focusable element. Before the first one, focus moves to the browser's controls, then to the last element in the dialog.                                                                       |
| `Esc`         | Closes the dialog, unless `closedby="none"`, and returns focus to the element that opened it.                                                                                                                             |

Source: [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog#accessibility). The [APG modal dialog pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) wraps focus with a script. A native modal dialog doesn't need one.

## API

### Dialog API

| Type           | Modifiers                             | Default | Description                                                              |
| -------------- | ------------------------------------- | ------- | ------------------------------------------------------------------------ |
| Alignment      | default, `.ui-actions.ui-align-start` | default | Alignment for the actions.                                               |
| Close behavior | `[closedby]`                          | -       | How the dialog can be closed. `"any"` also closes it on a click outside. |

#### Parts

| Part               | Description                          |
| ------------------ | ------------------------------------ |
| `dialog.ui-dialog` | Container element.                   |
| `<hgroup>`         | The dialog header.                   |
| `.ui-content`      | The dialog content.                  |
| `.ui-actions`      | A group of actions, such as buttons. |

#### CSS variables

| Variable           | Default             | Description                                                                                                                                                                                              |
| ------------------ | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--backdrop-blur`  | `1px`               | Blur radius behind an open `Dialog` or `Drawer`.                                                                                                                                                         |
| `--backdrop-color` | `rgb(0 0 0 / 0.5)`  | Overlay color behind an open `Dialog` or `Drawer`.                                                                                                                                                       |
| `--duration`       | `0.2s`              | Default transition duration. Multiplied by `--motion`.                                                                                                                                                   |
| `--ease-enter`     | `var(--ease-out-3)` | Easing for elements entering the screen.                                                                                                                                                                 |
| `--motion`         | `1`                 | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/html/guide/theming.md#motion). |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md) for the full list.

Add `.ui-card` and `.ui-elevated` to the root for card styles.

## Under the hood

Read the post: [Dialogs without JavaScript](https://open-props-ui.netlify.app/learn/dialog-closedby)

1. Modal

   - `command="show-modal"`: top layer, inert page, focus moves in, no JavaScript
   - `closedby="any"` closes it on `Esc` and on a click outside
   - `aria-labelledby` names it after its heading
   - `display: flex` overrides the hidden state, so `:not([open])` puts `display: none` back
   - The border is the page color, like an elevated card

2. Place

   - Pinned to 15% from the top, so it doesn't jump around as the content grows
   - `dvb` follows the mobile browser toolbar as it shows and hides
   - Only `.content` scrolls, the heading and actions stay put
   - `overscroll-behavior: contain` stops the scroll from chaining to the page

3. Shadow

   - Scroll the shortcuts: a shadow shows on each edge with more to scroll
   - `container-type: scroll-state` lets the pseudo-elements ask which way `.content` can scroll
   - `anchor()` pins them to the edges of `.content`, so they don't scroll away
   - `clip-path` keeps only the half of the shadow that falls on the content

4. Backdrop

   - `::backdrop` covers the viewport, right under the dialog in the top layer
   - `backdrop-filter` blurs the page behind it
   - The page behind is inert but still scrolls, `html:has(.dialog:modal)` locks it
   - `scrollbar-gutter: stable` keeps the layout still when the scrollbar goes

5. Fade

   - `@starting-style` gives the entry transition a starting point
   - The transition only lives on `[open]`, so closing is instant, on purpose

Step 1 of 5: Modal

- [\<dialog> ](https://webstatus.dev/features/dialog)(Widely available): Chrome 37+, Edge 79+, Firefox 98+, Safari 15.4+
- [\<dialog closedby> ](https://webstatus.dev/features/dialog-closedby)(Limited availability): Chrome 134+, Edge 134+, Firefox 141+, Safari not supported
- [Invoker commands ](https://webstatus.dev/features/invoker-commands)(Newly available): Chrome 135+, Edge 135+, Firefox 144+, Safari 26.2+

```html
<button type="button" commandfor="dialog" command="show-modal">
  Shortcuts
</button>


<dialog
  class="dialog"
  id="dialog"
  aria-labelledby="dialog-title"
  closedby="any"
>
  <h2 id="dialog-title">Keyboard shortcuts</h2>
  <div class="content">…</div>
  <div class="actions">
    <button type="button" commandfor="dialog" command="close">Close</button>
  </div>
</dialog>
```

```css
.dialog {
  background-color: var(--surface-elevated);
  border: 1px solid var(--surface-default);
  border-radius: var(--radius-3);
  box-shadow: var(--shadow-3);
  color: inherit;
  display: flex;
  flex-direction: column;
  padding: 0;
}


.dialog:not([open]) {
  display: none;
}
```

Step 2 of 5: Place

- [`overscroll-behavior` ](https://webstatus.dev/features/overscroll-behavior)(Limited availability): Chrome 144+, Edge 144+, Firefox 150+, Safari not supported
- [Small, large, and dynamic viewport units ](https://webstatus.dev/features/viewport-unit-variants)(Widely available): Chrome 108+, Edge 108+, Firefox 101+, Safari 15.4+

```css
.dialog {
  inline-size: 100%;
  inset: 0;
  margin: auto;
  margin-block-start: 15dvb;
  max-block-size: calc(85dvb - 1rem);
  max-inline-size: min(100% - 1rem, 60ch);
  overflow: auto;
}


.dialog > :not(.content) {
  flex-shrink: 0;
}


.dialog > .content {
  overflow-y: auto;
  overscroll-behavior: contain;
}
```

Step 3 of 5: Shadow

- [Anchor positioning ](https://webstatus.dev/features/anchor-positioning)(Limited availability): Chrome 144+, Edge 144+, Firefox 151+, Safari 26+
- [Container scroll-state queries ](https://webstatus.dev/features/container-scroll-state-queries)(Limited availability): Chrome 133+, Edge 133+, Firefox not supported, Safari not supported

```css
.dialog > .content {
  anchor-name: --content;
  container-type: scroll-state;
}


.dialog > .content::before,
.dialog > .content::after {
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


.dialog > .content::before {
  inset-block-end: anchor(--content outside);
}


.dialog > .content::after {
  inset-block-start: anchor(--content outside);
  scale: 1 -1;
}


@container scroll-state(scrollable: block-start) {
  .dialog > .content::before {
    opacity: 1;
  }
}


@container scroll-state(scrollable: block-end) {
  .dialog > .content::after {
    opacity: 1;
  }
}
```

Step 4 of 5: Backdrop

- [`::backdrop` ](https://webstatus.dev/features/backdrop)(Widely available): Chrome 37+, Edge 79+, Firefox 47+, Safari 15.4+
- [`backdrop-filter` ](https://webstatus.dev/features/backdrop-filter)(Newly available): Chrome 76+, Edge 79+, Firefox 103+, Safari 18+
- [`:has()` ](https://webstatus.dev/features/has)(Widely available): Chrome 105+, Edge 105+, Firefox 121+, Safari 15.4+
- [`scrollbar-gutter` ](https://webstatus.dev/features/scrollbar-gutter)(Newly available): Chrome 94+, Edge 94+, Firefox 97+, Safari 18.2+

```css
.dialog::backdrop {
  backdrop-filter: blur(var(--backdrop-blur));
  background-color: var(--backdrop-color);
}


html:has(.dialog:modal) {
  overflow: clip;
  scrollbar-gutter: stable;
}
```

Step 5 of 5: Fade

- [display animation ](https://webstatus.dev/features/display-animation)(Limited availability): Chrome 117+, Edge 117+, Firefox not supported, Safari 18+
- [`overlay` ](https://webstatus.dev/features/overlay)(Limited availability): Chrome 117+, Edge 117+, Firefox not supported, Safari not supported
- [`@starting-style` ](https://webstatus.dev/features/starting-style)(Newly available): Chrome 117+, Edge 117+, Firefox 129+, Safari 17.5+
- [`transition-behavior` ](https://webstatus.dev/features/transition-behavior)(Newly available): Chrome 117+, Edge 117+, Firefox 129+, Safari 17.4+

```css
.dialog {
  opacity: 0;
}


.dialog[open] {
  opacity: 1;
  transition:
    display 0.2s allow-discrete,
    opacity 0.2s,
    overlay 0.2s allow-discrete;


  @starting-style {
    opacity: 0;
  }
}
```

## Browser support

- Chromium: Full support Supported since v144.
- Firefox: Partial support Missing: container-scroll-state-queries, display-animation, overlay.
- Safari: Partial support Missing: container-scroll-state-queries, dialog-closedby, overlay.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/html/guide/browser-support/?components=Dialog.md).

## Installation

### Dependencies

- [Card](https://open-props-ui.netlify.app/html/components/card.md)

- `opui-css/css/components/dialog.css`
- `opui-css/css/components/card.css`

## Changelog

### What's new

- [Long content](#long-content) scrolls between a fixed header and actions.
- A subtle scroll shadow shows under the header and above the actions while the [content scrolls](#long-content).
