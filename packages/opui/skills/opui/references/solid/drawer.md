# Drawer

Slides in from the sides, top or bottom of the screen. Good for navigation, filters and side content. For a question or a short task that needs the user's full attention, use a [Dialog](https://open-props-ui.netlify.app/solid/components/dialog.md).

**Solid.** Import components from `opui-css/solid`. Props follow the same API as in the Astro sections below, and named slots are passed as props; static HTML notes describe class-based markup when you are not using Solid components.

### What's new

- Several header actions line up at the end, and a subtle scroll shadow shows while the content scrolls.
- Named by the header heading through `aria-labelledby`.

## Usage

Change the opening side with the `side` prop.

Put a `DrawerHeader` in the `header` prop to add a heading and a close button. Put actions in the `footer` prop, wrapped in a `DrawerFooter`.

The backdrop is blurred by default. Use `backdrop="transparent"` to remove the blur effect.

Page scrolling is locked by default when the drawer is open. Use the `scrollLock=` prop to allow scrolling while the drawer is open.

```tsx
import { Button, Drawer, DrawerFooter, DrawerHeader } from "opui-css/solid"


export default function Example() {
  return (
    <>
      <div class="drawer-examples">
        <Button
          class="top"
          commandfor="drawer-block-start"
          command="show-modal"
        >
          Block Start
        </Button>
        <Button
          class="left"
          commandfor="drawer-inline-start"
          command="show-modal"
        >
          Inline Start
        </Button>
        <Button
          class="right"
          commandfor="drawer-inline-end"
          command="show-modal"
        >
          Inline End
        </Button>
        <Button
          class="bottom"
          commandfor="drawer-block-end"
          command="show-modal"
        >
          Block End
        </Button>
      </div>


      <Drawer
        id="drawer-inline-start"
        side="inline-start"
        closedby="any"
        header={
          <DrawerHeader
            commandfor="drawer-inline-start"
            heading="Inline Start"
          />
        }
        content={
          <>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.
            </p>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo.
            </p>
          </>
        }
        footer={
          <DrawerFooter>
            <Button
              size="small"
              commandfor="drawer-inline-start"
              command="close"
            >
              Close
            </Button>
          </DrawerFooter>
        }
      />


      <Drawer
        id="drawer-inline-end"
        side="inline-end"
        closedby="any"
        header={
          <DrawerHeader commandfor="drawer-inline-end" heading="Inline End" />
        }
        content={
          <>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.
            </p>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo.
            </p>
          </>
        }
        footer={
          <DrawerFooter>
            <Button size="small" commandfor="drawer-inline-end" command="close">
              Close
            </Button>
          </DrawerFooter>
        }
      />


      <Drawer
        id="drawer-block-start"
        side="block-start"
        closedby="any"
        header={
          <DrawerHeader commandfor="drawer-block-start" heading="Block Start" />
        }
        content={
          <>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.
            </p>
          </>
        }
        footer={
          <DrawerFooter>
            <Button
              size="small"
              commandfor="drawer-block-start"
              command="close"
            >
              Close
            </Button>
          </DrawerFooter>
        }
      />


      <Drawer
        id="drawer-block-end"
        side="block-end"
        closedby="any"
        header={
          <DrawerHeader commandfor="drawer-block-end" heading="Block End" />
        }
        content={
          <>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.
            </p>
          </>
        }
        footer={
          <DrawerFooter>
            <Button size="small" commandfor="drawer-block-end" command="close">
              Close
            </Button>
          </DrawerFooter>
        }
      />
    </>
  )
}
```

## How to close a drawer

Use the `closedby` prop to choose how the drawer can be closed.

| Value                      | Closes with                                                                                                                     |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `closedby="any"` (default) | A click outside the drawer, `Esc` or the platform's close request (like the back gesture on mobile), and your own close button. |
| `closedby="closerequest"`  | `Esc` or the platform's close request, and your own close button. A click outside does nothing.                                 |
| `closedby="none"`          | Only your own close button (`command="close"`), `close()` or a form with `method="dialog"`.                                     |

The drawer sets `closedby="any"` when you leave it out.

## Accessibility

- The drawer is named by the `heading` of a `DrawerHeader` in the `header` prop, through `aria-labelledby`. With your own heading, pass `aria-labelledby` or `aria-label` to `Drawer`.
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

| Key           | Function                                                                                                                                                                              |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Tab`         | - Moves focus to next focusable element inside the drawer.
- When focus is on the last focusable element in the drawer, moves focus to the first focusable element in the drawer.     |
| `Shift + Tab` | * Moves focus to previous focusable element inside the drawer.
* When focus is on the first focusable element in the drawer, moves focus to the last focusable element in the drawer. |
| `Esc`         | Closes the drawer.                                                                                                                                                                    |

## API

### Drawer API

| Prop         | Type                                                                | Default          | Description                                                              |
| ------------ | ------------------------------------------------------------------- | ---------------- | ------------------------------------------------------------------------ |
| `backdrop`   | `"transparent"` , `"blurred"`                                       | `"blurred"`      | The backdrop style.                                                      |
| `children`   | `Element`                                                           | -                | Raw content placed directly in the drawer.                               |
| `closedby`   | `"none"` , `"any"` , `"closerequest"`                               | `"any"`          | How the drawer can be closed. `"any"` also closes it on a click outside. |
| `content`    | `Element`                                                           | -                | The scrollable content.                                                  |
| `footer`     | `Element`                                                           | -                | The footer. `DrawerFooter` renders it.                                   |
| `header`     | `Element`                                                           | -                | The header. `DrawerHeader` renders it with a close button.               |
| `id`         | `string`                                                            | -                | The id of the `<dialog>`. Generated when omitted.                        |
| `scrollLock` | `boolean`                                                           | `true`           | Locks page scroll while the drawer is open.                              |
| `side`       | `"inline-start"` , `"inline-end"` , `"block-start"` , `"block-end"` | `"inline-start"` | The side it opens from.                                                  |

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

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/solid/guide/theme-tokens.md) for the full list.

Attributes that aren't props go to the `<dialog>`.

### Drawer header API

| Prop         | Type     | Default   | Description                                                                                                            |
| ------------ | -------- | --------- | ---------------------------------------------------------------------------------------------------------------------- |
| `closeLabel` | `string` | `"Close"` | The accessible name of the close button.                                                                               |
| `commandfor` | `string` | -         | The id of the drawer to close with the `close` command. Without it, the button closes the nearest `<dialog>` on click. |
| `heading`    | `string` | -         | The heading.                                                                                                           |

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

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/solid/guide/theme-tokens.md) for the full list.

### Drawer footer API

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

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/solid/guide/theme-tokens.md) for the full list.

## Under the hood

1. Modal

   - A drawer is a modal `<dialog>`: top layer, focus trap and `Esc` for free
   - `closedby="any"` closes it on a click outside
   - `:not([open])` brings back the `display: none` that `display: flex` overrode

2. Edge

   - `margin: 0` undoes the centering, `inset` pins it to an edge
   - Logical properties: `inline-start` is the left in LTR and the right in RTL
   - `dvb` and `dvi` follow the mobile browser toolbar

3. Slide

   - Closed, it waits just past its edge
   - `@starting-style` slides it in from there
   - `allow-discrete` keeps `display` and `overlay` alive until it has slid out
   - `--dir` flips to `-1` under `:dir(rtl)`

4. Backdrop

   - `::backdrop` gets its own transition, in step with the drawer
   - `backdrop-filter` blurs the page behind it

Step 1 of 4: Modal

- [\<dialog> ](https://webstatus.dev/features/dialog)(Widely available): Chrome 37+, Edge 79+, Firefox 98+, Safari 15.4+
- [\<dialog closedby> ](https://webstatus.dev/features/dialog-closedby)(Limited availability): Chrome 134+, Edge 134+, Firefox 141+, Safari not supported
- [Invoker commands ](https://webstatus.dev/features/invoker-commands)(Newly available): Chrome 135+, Edge 135+, Firefox 144+, Safari 26.2+

```html
<button commandfor="drawer" command="show-modal">Start</button>


<dialog class="drawer inline-start" id="drawer" closedby="any">
  <div class="header">…</div>
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

Step 2 of 4: Edge

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

Step 3 of 4: Slide

- [`:dir()` ](https://webstatus.dev/features/dir-pseudo)(Widely available): Chrome 120+, Edge 120+, Firefox 49+, Safari 16.4+
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

Step 4 of 4: Backdrop

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

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/solid/guide/browser-support/?components=Drawer.md).

## Installation

- `opui-css/css/components/drawer.css`

