# Drawer

Slides in from the sides, top or bottom of the screen.

**Quick start**

### npm

```sh
npm install opui-css open-props
```

```vue
<script setup lang="ts">
import "opui-css/css/components/drawer.css"
import { Drawer, DrawerFooter, DrawerHeader } from "opui-css/vue"
</script>
```

[Full setup guide](https://open-props-ui.netlify.app/vue/guide/getting-started.md)

## Usage

Change the opening side with the `side` prop.

Add a title to the header with the `header` slot. A close button is automatically included in the header.

The backdrop is blurred by default. Use `backdrop="transparent"`to remove the blur effect.

Page scrolling is locked by default when the drawer is open. Use the`scrollLock=` prop to allow scrolling while the drawer is open.

```vue
<script setup lang="ts">
import { Button, Drawer, DrawerFooter, DrawerHeader } from "opui-css/vue"
</script>


<template>
  <div class="drawer-examples">
    <Button class="top" commandfor="drawer-block-start" command="show-modal"
      >Block Start</Button
    >
    <Button class="left" commandfor="drawer-inline-start" command="show-modal"
      >Inline Start</Button
    >
    <Button class="right" commandfor="drawer-inline-end" command="show-modal"
      >Inline End</Button
    >
    <Button class="bottom" commandfor="drawer-block-end" command="show-modal"
      >Block End</Button
    >
  </div>


  <Drawer id="drawer-inline-start" side="inline-start" closedby="any">
    <template #header>
      <DrawerHeader commandfor="drawer-inline-start" heading="Inline Start" />
    </template>
    <template #content>
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
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
        accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
        illo inventore veritatis et quasi architecto beatae vitae dicta sunt
        explicabo.
      </p>
    </template>
    <template #footer
      ><DrawerFooter>
        <Button size="small" commandfor="drawer-inline-start" command="close"
          >Close</Button
        >
      </DrawerFooter></template
    >
  </Drawer>


  <Drawer id="drawer-inline-end" side="inline-end" closedby="any">
    <template #header>
      <DrawerHeader commandfor="drawer-inline-end" heading="Inline End" />
    </template>
    <template #content>
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
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
        accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
        illo inventore veritatis et quasi architecto beatae vitae dicta sunt
        explicabo.
      </p>
    </template>
    <template #footer
      ><DrawerFooter>
        <Button size="small" commandfor="drawer-inline-end" command="close"
          >Close</Button
        >
      </DrawerFooter></template
    >
  </Drawer>


  <Drawer id="drawer-block-start" side="block-start" closedby="any">
    <template #header>
      <DrawerHeader commandfor="drawer-block-start" heading="Block Start" />
    </template>
    <template #content>
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
    </template>
    <template #footer
      ><DrawerFooter>
        <Button size="small" commandfor="drawer-block-start" command="close"
          >Close</Button
        >
      </DrawerFooter></template
    >
  </Drawer>


  <Drawer id="drawer-block-end" side="block-end" closedby="any">
    <template #header>
      <DrawerHeader commandfor="drawer-block-end" heading="Block End" />
    </template>
    <template #content>
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
    </template>
    <template #footer
      ><DrawerFooter>
        <Button size="small" commandfor="drawer-block-end" command="close"
          >Close</Button
        >
      </DrawerFooter></template
    >
  </Drawer>
</template>
```

## How to close a drawer

Use the `closedby` prop to control the closing behavior.

| Prop                      | Description                                                                                                                 |
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

### Props

| Prop         | Type                                                            | Default          | Description                                                             |
| ------------ | --------------------------------------------------------------- | ---------------- | ----------------------------------------------------------------------- |
| `id`         | `string`                                                        | auto-generated   | Unique identifier. Defaults to a stable auto-generated id when omitted. |
| `side`       | `"inline-start"`, `"inline-end"`,`"block-start"`, `"block-end"` | `"inline-start"` | The side it opens from.                                                 |
| `backdrop`   | `"transparent"`, `"blurred"`                                    | `"blurred"`      | The backdrop style.                                                     |
| `scrollLock` | `boolean`                                                       | `true`           | Whether to lock page scroll.                                            |
| `class`      | `string`                                                        | -                | Optional CSS class.                                                     |
| `closedby`   | `"any"`, `"closerequest"`, `"none"`                             | `"any"`          | How the drawer is closed.                                               |

### DrawerHeader props

| Prop         | Type     | Default | Description               |
| ------------ | -------- | ------- | ------------------------- |
| `commandfor` | `string` | -       | The drawer `id` to close. |
| `heading`    | `string` | -       | The drawer title.         |

### Slots

| Slot      | - | - | Description                                                     |
| --------- | - | - | --------------------------------------------------------------- |
| `content` | - | - | Main content area, wrapped in a `div` with a`ui-content` class. |
| `default` | - | - | Unwrapped content.                                              |
| `footer`  | - | - | Bottom area, e.g. a `DrawerFooter`.                             |
| `header`  | - | - | Top area, e.g. a `DrawerHeader`.                                |

## Browser support

- Chromium: Full support Supported since v135.
- Firefox: Partial support Missing: overlay.
- Safari: Partial support Missing: dialog-closedby, overlay.

See also the [full browser support guide](https://open-props-ui.netlify.app/vue/guide/browser-support.md).

## Source

- `opui-css/css/components/drawer.css`

