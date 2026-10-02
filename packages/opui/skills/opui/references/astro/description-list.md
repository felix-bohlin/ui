# Description list

## Anatomy

- Price

  6 950 000

* `<DescriptionList>`

  Container element.

* `<DescriptionList.Item>`

  Groups a term with its description.

* `<DescriptionList.Term>`

  The term.

* `<DescriptionList.Description>`

  The description.

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

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/astro/guide/theme-tokens.md) for the full list.

## Browser support

- Chromium: Full support Supported since v105.
- Firefox: Full support Supported since v110.
- Safari: Full support Supported since v16.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/astro/guide/browser-support/?components=Description+List.md).

## Installation

- `opui-css/css/components/description-list.css`

