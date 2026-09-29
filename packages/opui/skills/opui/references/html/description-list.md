# Description list

**Quick start**

### npm

```sh
npm install opui-css open-props
```

```css
@import "opui-css/css/components/description-list.css";
```

### CDN

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/opui-css/dist/opui.css" />
```

### Copy the CSS

[Jump to source](#installation)

[Full setup guide](https://open-props-ui.netlify.app/html/guide/getting-started.md)

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

## Anatomy

1. List (`<dl>`)
2. Term-description group (`<div>`)
3. Term (`<dt>`)
4. Separator - rendered via CSS when `.ui-bordered` is set on the list (optional)
5. Description (`<dd>`)

```html
<dl class="ui-description-list ui-bordered ui-dotted anatomy">
  <div class="ui-item">
    <dt class="ui-term">Price</dt>
    <dd class="ui-description">6 950 000</dd>
  </div>
</dl>
```

## API

| Type     | Modifiers                                | Default | Description                                                                                          |
| -------- | ---------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------- |
| Bordered | `.ui-bordered`, `.ui-bordered.ui-dotted` | -       | Adds a separator between the term and description on all items. Add `.ui-dotted` for a dotted style. |

## Browser support

- Chromium: Full support Supported since v105.
- Firefox: Full support Supported since v121.
- Safari: Full support Supported since v16.

See also the [full browser support guide](https://open-props-ui.netlify.app/html/guide/browser-support.md).

## Source

- `opui-css/css/components/description-list.css`

