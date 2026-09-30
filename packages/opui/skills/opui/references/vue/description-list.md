# Description list

## Anatomy

- Price

  6 950 000

* `<DescriptionList>`

  Container element.

* `<DescriptionListItem>`

  Groups a term with its description.

* `<DescriptionListTerm>`

  The term.

* `<Description>`

  The description.

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

## API

### Description list API

| Prop       | Type                  | Default | Description                                         |
| ---------- | --------------------- | ------- | --------------------------------------------------- |
| `bordered` | `boolean`, `"dotted"` | `false` | Adds a border between the term and the description. |

#### Slots

| Slot      | Description |
| --------- | ----------- |
| `default` | The items.  |

## Browser support

- Chromium: Full support Supported since v105.
- Firefox: Full support Supported since v121.
- Safari: Full support Supported since v16.

See also the [full browser support guide](https://open-props-ui.netlify.app/vue/guide/browser-support.md).

## Installation

- `opui-css/css/components/description-list.css`

