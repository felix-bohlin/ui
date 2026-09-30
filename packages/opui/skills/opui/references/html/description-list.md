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

## Browser support

- Chromium: Full support Supported since v105.
- Firefox: Full support Supported since v121.
- Safari: Full support Supported since v16.

See also the [full browser support guide](https://open-props-ui.netlify.app/html/guide/browser-support.md).

## Installation

- `opui-css/css/components/description-list.css`

