# Description list

**Quick start**

### npm

```sh
npm install opui-css open-props
```

```astro
---
import "opui-css/css/components/description-list.css"
import { DescriptionList } from "opui-css/astro"
---
```

[Full setup guide](https://open-props-ui.netlify.app/astro/guide/getting-started.md)

```astro
---
import { DescriptionList } from "opui-css/astro"
---


<DescriptionList>
  <DescriptionList.Item>
    <DescriptionList.Term>Price</DescriptionList.Term>
    <DescriptionList.Description>6 950 000</DescriptionList.Description>
  </DescriptionList.Item>
  <DescriptionList.Item>
    <DescriptionList.Term>Size</DescriptionList.Term>
    <DescriptionList.Description>64 m²</DescriptionList.Description>
  </DescriptionList.Item>
  <DescriptionList.Item>
    <DescriptionList.Term>Rooms</DescriptionList.Term>
    <DescriptionList.Description>3</DescriptionList.Description>
  </DescriptionList.Item>
</DescriptionList>
```

## Bordered

Set `bordered` on `DescriptionList` to add a separator between the term and description on all items. Use `bordered="dotted"` for a dotted style.

```astro
---
import { DescriptionList } from "opui-css/astro"
---


<DescriptionList bordered>
  <DescriptionList.Item>
    <DescriptionList.Term>Price</DescriptionList.Term>
    <DescriptionList.Description>6 950 000</DescriptionList.Description>
  </DescriptionList.Item>
  <DescriptionList.Item>
    <DescriptionList.Term>Size</DescriptionList.Term>
    <DescriptionList.Description>64 m²</DescriptionList.Description>
  </DescriptionList.Item>
  <DescriptionList.Item>
    <DescriptionList.Term>Rooms</DescriptionList.Term>
    <DescriptionList.Description>3</DescriptionList.Description>
  </DescriptionList.Item>
</DescriptionList>


<DescriptionList bordered="dotted">
  <DescriptionList.Item>
    <DescriptionList.Term>Price</DescriptionList.Term>
    <DescriptionList.Description>6 950 000</DescriptionList.Description>
  </DescriptionList.Item>
  <DescriptionList.Item>
    <DescriptionList.Term>Size</DescriptionList.Term>
    <DescriptionList.Description>64 m²</DescriptionList.Description>
  </DescriptionList.Item>
  <DescriptionList.Item>
    <DescriptionList.Term>Rooms</DescriptionList.Term>
    <DescriptionList.Description>3</DescriptionList.Description>
  </DescriptionList.Item>
</DescriptionList>
```

## Anatomy

1. List (`<DescriptionList>`)
2. Term-description group (`<DescriptionList.Item>`)
3. Term (`<DescriptionList.Term>`)
4. Separator - rendered via CSS when `bordered` is set on the list (optional)
5. Description (`<DescriptionList.Description>`)

## API

| Prop       | Type                  | Default | Description                                                                                        |
| ---------- | --------------------- | ------- | -------------------------------------------------------------------------------------------------- |
| `bordered` | `boolean \| "dotted"` | -       | Adds a separator between the term and description on all items. Use `"dotted"` for a dotted style. |
| `class`    | `string`              | -       | Custom CSS classes.                                                                                |

### DescriptionList.Item

| Prop    | Type     | Default | Description         |
| ------- | -------- | ------- | ------------------- |
| `class` | `string` | -       | Custom CSS classes. |

### DescriptionList.Term

| Prop    | Type     | Default | Description         |
| ------- | -------- | ------- | ------------------- |
| `class` | `string` | -       | Custom CSS classes. |

### DescriptionList.Description

| Prop    | Type     | Default | Description         |
| ------- | -------- | ------- | ------------------- |
| `class` | `string` | -       | Custom CSS classes. |

## Browser support

- Chromium: Full support Supported since v105.
- Firefox: Full support Supported since v121.
- Safari: Full support Supported since v16.

See also the [full browser support guide](https://open-props-ui.netlify.app/astro/guide/browser-support.md).

## Source

- `opui-css/css/components/description-list.css`

