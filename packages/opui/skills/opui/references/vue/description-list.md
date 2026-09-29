# Description list

**Quick start**

### npm

```sh
npm install opui-css open-props
```

```vue
<script setup lang="ts">
import "opui-css/css/components/description-list.css"
import {
  DescriptionList,
  DescriptionListItem,
  DescriptionListTerm,
} from "opui-css/vue"
</script>
```

[Full setup guide](https://open-props-ui.netlify.app/vue/guide/getting-started.md)

```vue
<script setup lang="ts">
import {
  Description,
  DescriptionList,
  DescriptionListItem,
  DescriptionListTerm,
} from "opui-css/vue"
</script>


<template>
  <DescriptionList>
    <DescriptionListItem>
      <DescriptionListTerm>Price</DescriptionListTerm>
      <Description>6 950 000</Description>
    </DescriptionListItem>
    <DescriptionListItem>
      <DescriptionListTerm>Size</DescriptionListTerm>
      <Description>64 m²</Description>
    </DescriptionListItem>
    <DescriptionListItem>
      <DescriptionListTerm>Rooms</DescriptionListTerm>
      <Description>3</Description>
    </DescriptionListItem>
  </DescriptionList>
</template>
```

## Bordered

Set `bordered` on `DescriptionList` to add a separator between the term and description on all items. Use `bordered="dotted"` for a dotted style.

```vue
<script setup lang="ts">
import {
  Description,
  DescriptionList,
  DescriptionListItem,
  DescriptionListTerm,
} from "opui-css/vue"
</script>


<template>
  <DescriptionList bordered>
    <DescriptionListItem>
      <DescriptionListTerm>Price</DescriptionListTerm>
      <Description>6 950 000</Description>
    </DescriptionListItem>
    <DescriptionListItem>
      <DescriptionListTerm>Size</DescriptionListTerm>
      <Description>64 m²</Description>
    </DescriptionListItem>
    <DescriptionListItem>
      <DescriptionListTerm>Rooms</DescriptionListTerm>
      <Description>3</Description>
    </DescriptionListItem>
  </DescriptionList>


  <DescriptionList bordered="dotted">
    <DescriptionListItem>
      <DescriptionListTerm>Price</DescriptionListTerm>
      <Description>6 950 000</Description>
    </DescriptionListItem>
    <DescriptionListItem>
      <DescriptionListTerm>Size</DescriptionListTerm>
      <Description>64 m²</Description>
    </DescriptionListItem>
    <DescriptionListItem>
      <DescriptionListTerm>Rooms</DescriptionListTerm>
      <Description>3</Description>
    </DescriptionListItem>
  </DescriptionList>
</template>
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

See also the [full browser support guide](https://open-props-ui.netlify.app/vue/guide/browser-support.md).

## Source

- `opui-css/css/components/description-list.css`

