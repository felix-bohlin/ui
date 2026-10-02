# Description list

## Anatomy

- Price

  6 950 000

* `dl.ui-description-list`

  Container element.

* `.ui-item`

  Groups a term with its description.

* `<dt>`

  The term.

* `<dd>`

  The description.

```html
<dl class="ui-description-list">
  <div class="ui-item">
    <dt class="ui-term">Price</dt>
    <dd class="ui-description">6 950 000</dd>
  </div>
  <div class="ui-item">
    <dt class="ui-term">Size</dt>
    <dd class="ui-description">64 m²</dd>
  </div>
  <div class="ui-item">
    <dt class="ui-term">Rooms</dt>
    <dd class="ui-description">3</dd>
  </div>
</dl>
```

## Bordered

Add `.ui-bordered` to the `<dl>` element. For a dotted style, also add `.ui-dotted`.

```html
<dl class="ui-description-list ui-bordered">
  <div class="ui-item">
    <dt class="ui-term">Price</dt>
    <dd class="ui-description">6 950 000</dd>
  </div>
  <div class="ui-item">
    <dt class="ui-term">Size</dt>
    <dd class="ui-description">64 m²</dd>
  </div>
  <div class="ui-item">
    <dt class="ui-term">Rooms</dt>
    <dd class="ui-description">3</dd>
  </div>
</dl>


<dl class="ui-description-list ui-bordered ui-dotted">
  <div class="ui-item">
    <dt class="ui-term">Price</dt>
    <dd class="ui-description">6 950 000</dd>
  </div>
  <div class="ui-item">
    <dt class="ui-term">Size</dt>
    <dd class="ui-description">64 m²</dd>
  </div>
  <div class="ui-item">
    <dt class="ui-term">Rooms</dt>
    <dd class="ui-description">3</dd>
  </div>
</dl>
```

## API

### Description list API

| Type     | Modifiers                                | Default | Description                                         |
| -------- | ---------------------------------------- | ------- | --------------------------------------------------- |
| Bordered | `.ui-bordered`, `.ui-bordered.ui-dotted` | -       | Adds a border between the term and the description. |

#### Parts

| Part                     | Description                         |
| ------------------------ | ----------------------------------- |
| `dl.ui-description-list` | Container element.                  |
| `.ui-item`               | Groups a term with its description. |
| `<dt>`                   | The term.                           |
| `<dd>`                   | The description.                    |

#### CSS variables

| Variable             | Default                                     | Description                                                 |
| -------------------- | ------------------------------------------- | ----------------------------------------------------------- |
| `--border-color`     | `light-dark(var(--gray-4), var(--gray-12))` | Default border color for cards, lists, tables and dividers. |
| `--border-width`     | `1px`                                       | Default border width for components that draw a border.     |
| `--font-weight-bold` | `var(--font-weight-7)`                      | Font weight for headings, buttons and terms.                |
| `--text-muted`       | `light-dark(var(--gray-13), var(--gray-4))` | Body text color.                                            |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md) for the full list.

## Browser support

- Chromium: Full support Supported since v105.
- Firefox: Full support Supported since v110.
- Safari: Full support Supported since v16.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/html/guide/browser-support/?components=Description+List.md).

## Installation

- `opui-css/css/components/description-list.css`

