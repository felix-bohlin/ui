# Avatar

**Quick start**

Run `npm install opui-css open-props`, then import the component and its styles.

```astro
---
import "opui-css/css/components/avatar.css"
import { Avatar } from "opui-css/astro"
---
```

[Getting started](https://open-props-ui.netlify.app/astro/guide/getting-started.md) · [CSS source](#installation)

## Image

```astro
---
import { Avatar } from "opui-css/astro"
---


<Avatar
  src="https://images.unsplash.com/photo-1614530606961-c4ce986825c1?q=80&w=1827&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  alt="Avatar"
/>


<Avatar
  src="https://images.unsplash.com/photo-1672714413950-c9f7c5a45fa1?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  alt="Avatar"
/>


<Avatar
  src="https://plus.unsplash.com/premium_photo-1675674458649-0c667500f3cc?q=80&w=1885&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  alt="Avatar"
/>
```

## Letter

```astro
---
import { Avatar } from "opui-css/astro"
---


<Avatar>LE</Avatar>
<Avatar>TT</Avatar>
<Avatar>ER</Avatar>
```

## Icon

```astro
---
import { Avatar } from "opui-css/astro"
---


<Avatar>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    ><path
      fill="currentColor"
      d="M3 7.5A4.5 4.5 0 0 1 7.5 3h17A4.5 4.5 0 0 1 29 7.5v17a4.5 4.5 0 0 1-4.5 4.5h-17A4.5 4.5 0 0 1 3 24.5zm10.707 2.793a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 0 1.414l5 5a1 1 0 0 0 1.414-1.414L9.414 16l4.293-4.293a1 1 0 0 0 0-1.414m4.586 1.414L22.586 16l-4.293 4.293a1 1 0 0 0 1.414 1.414l5-5a1 1 0 0 0 0-1.414l-5-5a1 1 0 1 0-1.414 1.414"
    ></path></svg
  >
</Avatar>


<Avatar>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    ><path
      fill="currentColor"
      d="M5.25 4A3.25 3.25 0 0 0 2 7.25v17.5A3.25 3.25 0 0 0 5.25 28h21.5A3.25 3.25 0 0 0 30 24.75V7.25A3.25 3.25 0 0 0 26.75 4zM18 13a1 1 0 0 1 1-1h6a1 1 0 0 1 0 2h-6a1 1 0 0 1-1-1m1 4h6a1 1 0 0 1 0 2h-6a1 1 0 1 1 0-2m-6-4a2 2 0 1 1-4 0a2 2 0 0 1 4 0m-6 4.5A1.5 1.5 0 0 1 8.5 16h5a1.5 1.5 0 0 1 1.5 1.5s0 3.5-4 3.5s-4-3.5-4-3.5"
    ></path></svg
  >
</Avatar>


<Avatar>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    ><path
      fill="currentColor"
      d="M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14s14-6.268 14-14S23.732 2 16 2m0 22.5c-3.866 0-7-2.429-7-6.071A2.43 2.43 0 0 1 11.429 16h9.142A2.43 2.43 0 0 1 23 18.429c0 3.642-3.134 6.071-7 6.071m0-10A3.75 3.75 0 1 1 16 7a3.75 3.75 0 0 1 0 7.5"
    ></path></svg
  >
</Avatar>
```

## Variants

Change the shape of the avatar with the `variant` prop.

```astro
---
import { Avatar } from "opui-css/astro"
---


<Avatar variant="squared">SQ</Avatar>


<Avatar
  variant="rounded"
  src="https://images.unsplash.com/photo-1616286608358-0e1b143f7d2f?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  alt="Avatar"
/>


<Avatar
  variant="squircle"
  src="https://plus.unsplash.com/premium_photo-1770631651199-d92007477b6f?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  alt="Avatar"
/>
```

## Grouped

Group multiple avatars by setting the `isGroup` prop on a parent container.

```astro
---
import { Avatar } from "opui-css/astro"
---


<Avatar isGroup>
  <Avatar>AB</Avatar>
  <Avatar>CD</Avatar>
  <Avatar as="button">EF</Avatar>
  <Avatar as="button">GH</Avatar>
  <Avatar href="#">IJ</Avatar>
  <Avatar href="#">KL</Avatar>
</Avatar>
```

## API

| Prop      | Type                                   | Default     | Description                                 |
| --------- | -------------------------------------- | ----------- | ------------------------------------------- |
| `as`      | `any`                                  | -           | The element or component to render as.      |
| `href`    | `string`                               | -           | The link to use if the avatar is an anchor. |
| `variant` | `"squared" \| "rounded" \| "squircle"` | `"default"` | The visual style of the avatar.             |
| `isGroup` | `boolean`                              | `false`     | Renders the avatar as a group.              |
| `src`     | `string`                               | -           | The image source for the avatar.            |
| `alt`     | `string`                               | -           | The alternative text for the avatar image.  |

## Browser support

- Chromium: Full support Supported since v105.
- Firefox: Full support Supported since v121.
- Safari: Full support Supported since v15.4.

See also the [full browser support guide](https://open-props-ui.netlify.app/astro/guide/browser-support.md).

## Source

- `opui-css/css/components/avatar.css`

