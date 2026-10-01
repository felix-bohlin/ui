# Description list

### What's new

- Borders follow `--border-width`. See [CSS variables](#api).

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

#### CSS variables

| Variable             | Default                                     | Description                                                 |
| -------------------- | ------------------------------------------- | ----------------------------------------------------------- |
| `--border-color`     | `light-dark(var(--gray-4), var(--gray-12))` | Default border color for cards, lists, tables and dividers. |
| `--border-width`     | `1px`                                       | Default border width for components that draw a border.     |
| `--font-weight-bold` | `var(--font-weight-7)`                      | Font weight for headings, buttons and terms.                |
| `--text-muted`       | `light-dark(var(--gray-13), var(--gray-4))` | Body text color.                                            |

Theme tokens this component reads. Override them on `html`or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/vue/guide/theme-tokens.md)for the full list.

## Browser support

- Chromium: Full support Supported since v105.
- Firefox: Full support Supported since v121.
- Safari: Full support Supported since v16.

See also the [full browser support guide](https://open-props-ui.netlify.app/vue/guide/browser-support.md).

## Installation

- `opui-css/css/components/description-list.css`

