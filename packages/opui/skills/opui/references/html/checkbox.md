# Checkbox

See also: [Checkbox field group](#field-group).

**Quick start**

### npm

```sh
npm install opui-css open-props
```

```css
@import "opui-css/css/components/checkbox.css";
```

### CDN

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/opui-css/dist/opui.css" />
```

### Copy the CSS

[Jump to source](#installation)

[Full setup guide](https://open-props-ui.netlify.app/html/guide/getting-started.md)

```html
<!-- Checked -->
<label class="ui-checkbox">
  <input name="checkbox-variants-html" type="checkbox" checked />
  <span class="ui-sr-only">Checked</span>
</label>


<!-- Unchecked -->
<label class="ui-checkbox">
  <input name="checkbox-variants-html" type="checkbox" />
  <span class="ui-sr-only">Unchecked</span>
</label>


<!-- Indeterminate -->
<label class="ui-checkbox">
  <input name="checkbox-variants-html" type="checkbox" data-indeterminate />
  <span class="ui-sr-only">Indeterminate</span>
</label>


<!-- Disabled -->
<label class="ui-checkbox">
  <input name="checkbox-variants-html" type="checkbox" disabled />
  <span class="ui-sr-only">Disabled</span>
</label>


<!-- Checked and disabled -->
<label class="ui-checkbox">
  <input name="checkbox-variants-html" type="checkbox" checked disabled />
  <span class="ui-sr-only">Checked and disabled</span>
</label>
```

## Visible label

Render the label text inside an element with a `.ui-label` class. Also, don't miss the info on label [accessibility](#accessibility).

```html
<label class="ui-checkbox">
  <input name="checkbox-visible-label-html" type="checkbox" checked />
  <span class="ui-label">Choice A</span>
</label>


<label class="ui-checkbox">
  <input name="checkbox-visible-label-html" type="checkbox" disabled />
  <span class="ui-label">Disabled</span>
</label>


<label class="ui-checkbox">
  <input name="checkbox-visible-label-html" type="checkbox" checked disabled />
  <span class="ui-label">Checked and disabled</span>
</label>


<label class="ui-checkbox">
  <input name="checkbox-visible-label-html" type="checkbox" />
  <span class="ui-label">
    Long text dolor amet mustache knausgaard +1, blue bottle waistcoat tbh
    semiotics artisan synth stumptown gastropub cornhole
    <a class="ui-link" href="#visible-label">privacy policy ipsum</a>
  </span>
</label>
```

### Label position

```html
<label class="ui-checkbox">
  <input name="checkbox-label-position-html" type="checkbox" />
  <span class="ui-label">Default</span>
</label>


<label class="ui-checkbox ui-stack">
  <input name="checkbox-label-position-html" type="checkbox" />
  <span class="ui-label">Stack</span>
</label>
```

### End text

```html
<label class="ui-checkbox">
  <input name="checkbox-supporting-text-html" type="checkbox" />
  <span class="ui-label">Default</span>
  <span class="ui-end-text">Supporting text</span>
</label>


<label class="ui-checkbox ui-stack">
  <input name="checkbox-supporting-text-html" type="checkbox" />
  <span class="ui-label">Stack</span>
  <span class="ui-end-text">Supporting text</span>
</label>
```

### Validation

- Add `[required]` to the `<input>` element to toggle required styles.
- Add `data-invalid` on the root element to toggle invalid styles. Make use of the end text to give extra feedback on the error.

```html
<div class="example-row ui-spacious">
  <label class="ui-checkbox">
    <input name="checkbox-validation-html" type="checkbox" required />
    <span class="ui-label">Default</span>
  </label>


  <label class="ui-checkbox ui-stack">
    <input name="checkbox-validation-html" type="checkbox" required />
    <span class="ui-label">Stack</span>
  </label>
</div>


<div class="example-row ui-spacious">
  <label class="ui-checkbox" data-invalid>
    <input name="checkbox-validation-html" type="checkbox" checked />
    <span class="ui-label">Default</span>
    <span class="ui-end-text">Check yourself</span>
  </label>


  <label class="ui-checkbox ui-stack" data-invalid>
    <input name="checkbox-validation-html" type="checkbox" />
    <span class="ui-label">Stack</span>
    <span class="ui-end-text">Before you wreck yourself</span>
  </label>
</div>
```

## Indeterminate

Add `data-indeterminate` to the `<input type="checkbox">` and run a script that sets `el.indeterminate = true`. `indeterminate` is a JavaScript-only property on `HTMLInputElement` - the attribute alone has no effect.

### JavaScript required

The `indeterminate` state cannot be set with HTML or CSS alone. The browser only exposes it as a property on `HTMLInputElement`, so a small script is needed to flip `el.indeterminate = true` after the element is in the DOM. The `:indeterminate` CSS pseudo-class then matches and the dash glyph appears.

```html
<fieldset class="ui-fieldset indeterminate-demo-html">
  <legend>
    <label class="ui-checkbox parent">
      <input type="checkbox" />
      <span class="ui-label">Select all</span>
    </label>
  </legend>
  <div class="ui-field-group" role="group">
    <label class="ui-checkbox child">
      <input name="indeterminate-children-html" type="checkbox" checked />
      <span class="ui-label">Apples</span>
    </label>
    <label class="ui-checkbox child">
      <input name="indeterminate-children-html" type="checkbox" />
      <span class="ui-label">Bananas</span>
    </label>
    <label class="ui-checkbox child">
      <input name="indeterminate-children-html" type="checkbox" />
      <span class="ui-label">Cherries</span>
    </label>
  </div>
</fieldset>


<script>
  function setupIndeterminateDemoHtml() {
    document.querySelectorAll(".indeterminate-demo-html").forEach((root) => {
      const parent = root.querySelector('.parent input[type="checkbox"]')
      const children = Array.from(
        root.querySelectorAll('.child input[type="checkbox"]'),
      )
      if (!parent || children.length === 0) return


      const sync = () => {
        const checkedCount = children.filter((c) => c.checked).length
        parent.checked = checkedCount === children.length
        parent.indeterminate =
          checkedCount > 0 && checkedCount < children.length
      }


      parent.addEventListener("change", () => {
        children.forEach((c) => (c.checked = parent.checked))
        parent.indeterminate = false
      })
      children.forEach((c) => c.addEventListener("change", sync))
      sync()
    })
  }


  setupIndeterminateDemoHtml()
  document.addEventListener("astro:after-swap", setupIndeterminateDemoHtml)
</script>
```

## Spread

Add the `.ui-spread` class to the `<label class="ui-checkbox">`to push the label to the left and the checkbox to the right. This is useful for full-width items like lists and menus.

```html
<label class="ui-checkbox ui-spread">
  <input name="checkbox-spread-html" type="checkbox" />
  <span class="ui-label">Accept Terms & Conditions</span>
  <span class="ui-end-text">I have read and agree to the privacy policy.</span>
</label>


<label class="ui-checkbox ui-spread">
  <input name="checkbox-spread-html" type="checkbox" required />
  <span class="ui-label">Required</span>
  <span class="ui-end-text">You must accept this to continue.</span>
</label>


<label class="ui-checkbox ui-spread">
  <input name="checkbox-spread-html" type="checkbox" disabled />
  <span class="ui-label">Disabled</span>
  <span class="ui-end-text">This checkbox is disabled.</span>
</label>


<label class="ui-checkbox ui-spread" data-invalid>
  <input name="checkbox-spread-html" type="checkbox" />
  <span class="ui-label">Invalid Checkbox</span>
  <span class="ui-end-text">There is an error with this checkbox.</span>
</label>
```

## Sizes

```html
<div class="example-row">
  <label class="ui-checkbox ui-small">
    <input name="checkbox-sizes-html" type="checkbox" checked />
    <span class="ui-sr-only">Label</span>
  </label>


  <label class="ui-checkbox">
    <input name="checkbox-sizes-html" type="checkbox" checked />
    <span class="ui-sr-only">Label</span>
  </label>


  <label class="ui-checkbox ui-large">
    <input name="checkbox-sizes-html" type="checkbox" checked />
    <span class="ui-sr-only">Label</span>
  </label>
</div>


<div class="example-row">
  <label class="ui-checkbox ui-small">
    <input name="checkbox-sizes-html" type="checkbox" checked />
    <span class="ui-label">Small</span>
  </label>


  <label class="ui-checkbox">
    <input name="checkbox-sizes-html" type="checkbox" checked />
    <span class="ui-label">Default</span>
  </label>


  <label class="ui-checkbox ui-large">
    <input name="checkbox-sizes-html" type="checkbox" checked />
    <span class="ui-label">Large</span>
  </label>
</div>
```

## Field group

Use field groups to group related checkboxes.

Give every `<input type="checkbox">` in the group the same`name` attribute so they're submitted together.

See also: [Form documentation](https://open-props-ui.netlify.app/html/components/form.md).

```html
<fieldset class="ui-fieldset">
  <legend>Legend</legend>
  <div class="ui-field-group" role="group">
    <label class="ui-checkbox">
      <input name="checkbox-group-html" type="checkbox" checked />
      <span class="ui-label">Checkbox 1</span>
    </label>
    <label class="ui-checkbox">
      <input name="checkbox-group-html" type="checkbox" />
      <span class="ui-label">Checkbox 2</span>
    </label>
    <label class="ui-checkbox">
      <input name="checkbox-group-html" type="checkbox" />
      <span class="ui-label">Checkbox 3</span>
    </label>
  </div>
</fieldset>
```

### Direction

```html
<fieldset class="ui-fieldset">
  <legend>Legend</legend>
  <div class="ui-field-group ui-row" role="group">
    <label class="ui-checkbox">
      <input name="checkbox-group-direction-html" type="checkbox" checked />
      <span class="ui-label">Checkbox 1</span>
    </label>
    <label class="ui-checkbox">
      <input name="checkbox-group-direction-html" type="checkbox" />
      <span class="ui-label">Checkbox 2</span>
    </label>
    <label class="ui-checkbox">
      <input name="checkbox-group-direction-html" type="checkbox" />
      <span class="ui-label">Checkbox 3</span>
    </label>
  </div>
</fieldset>
```

### Field description

Can be placed above and below the fields.

```html
<fieldset class="ui-fieldset">
  <legend>Legend</legend>
  <span class="ui-field-description">Field description above fields</span>
  <div class="ui-field-group ui-row" role="group">
    <label class="ui-checkbox">
      <input
        name="checkbox-group-field-description-1-html"
        type="checkbox"
        checked
      />
      <span class="ui-label">Checkbox 1</span>
    </label>
    <label class="ui-checkbox">
      <input name="checkbox-group-field-description-1-html" type="checkbox" />
      <span class="ui-label">Checkbox 2</span>
    </label>
    <label class="ui-checkbox">
      <input name="checkbox-group-field-description-1-html" type="checkbox" />
      <span class="ui-label">Checkbox 3</span>
    </label>
  </div>
</fieldset>


<fieldset class="ui-fieldset">
  <legend>Legend</legend>
  <div class="ui-field-group ui-row" role="group">
    <label class="ui-checkbox">
      <input
        name="checkbox-group-field-description-2-html"
        type="checkbox"
        checked
      />
      <span class="ui-label">Checkbox 1</span>
    </label>
    <label class="ui-checkbox">
      <input name="checkbox-group-field-description-2-html" type="checkbox" />
      <span class="ui-label">Checkbox 2</span>
    </label>
    <label class="ui-checkbox">
      <input name="checkbox-group-field-description-2-html" type="checkbox" />
      <span class="ui-label">Checkbox 3</span>
    </label>
  </div>
  <span class="ui-field-description">Field description below fields</span>
</fieldset>
```

### Disabled

Attach the `disabled` attribute to the `<fieldset>` element.

```html
<fieldset class="ui-fieldset" disabled>
  <legend>Legend</legend>
  <div class="ui-field-group ui-row" role="group">
    <label class="ui-checkbox">
      <input name="checkbox-group-disabled-html" type="checkbox" checked />
      <span class="ui-label">Checkbox 1</span>
    </label>
    <label class="ui-checkbox">
      <input name="checkbox-group-disabled-html" type="checkbox" />
      <span class="ui-label">Checkbox 2</span>
    </label>
    <label class="ui-checkbox">
      <input name="checkbox-group-disabled-html" type="checkbox" />
      <span class="ui-label">Checkbox 3</span>
    </label>
  </div>
</fieldset>
```

### Required

Attach the `required` attribute to at least one of your `<input>` elements.

```html
<fieldset class="ui-fieldset">
  <legend>These are required!</legend>
  <div class="ui-field-group ui-row" role="group">
    <label class="ui-checkbox">
      <input name="checkbox-group-required-html" type="checkbox" required />
      <span class="ui-label">Checkbox 1</span>
    </label>
    <label class="ui-checkbox">
      <input name="checkbox-group-required-html" type="checkbox" required />
      <span class="ui-label">Checkbox 2</span>
    </label>
    <label class="ui-checkbox">
      <input name="checkbox-group-required-html" type="checkbox" required />
      <span class="ui-label">Checkbox 3</span>
    </label>
  </div>
</fieldset>
```

### Validation

Attach the `data-invalid` attribute to your `<fieldset class="ui-fieldset">` element

```html
<fieldset class="ui-fieldset" data-invalid>
  <legend>Legend</legend>
  <div class="ui-field-group ui-row" role="group">
    <label class="ui-checkbox">
      <input name="checkbox-group-validation-html" type="checkbox" checked />
      <span class="ui-label">Checkbox 1</span>
    </label>
    <label class="ui-checkbox">
      <input name="checkbox-group-validation-html" type="checkbox" />
      <span class="ui-label">Checkbox 2</span>
    </label>
    <label class="ui-checkbox">
      <input name="checkbox-group-validation-html" type="checkbox" />
      <span class="ui-label">Checkbox 3</span>
    </label>
  </div>
  <span class="ui-end-text">Something went wrong!</span>
</fieldset>
```

### Labels

Accessible checkboxes must have a label. You can choose between three approaches:

| Approach                                                          | Usage in Checkbox component |
| ----------------------------------------------------------------- | --------------------------- |
| Provide a label text inside the `label`/`role="checkbox"` element | Default                     |
| Add a `aria-label` on the input element                           | Not used                    |
| Have a visible label that you reference with `aria-labelledby`    | Not used                    |

### Keyboard support

| Key     | Function                                                  |
| ------- | --------------------------------------------------------- |
| `Space` | When Checkbox is focused it changes its state.            |
| `Enter` | (Optional) When Checkbox is focused it changes its state. |

1. Container
2. Input
3. Label (optional)
4. End text (optional)

```html
<label class="ui-checkbox anatomy"
  ><input type="checkbox" aria-describedby="end-text-1" checked />
  <script type="module">
    function e(e = document) {
      e.querySelectorAll(`input[type="checkbox"][data-indeterminate]`).forEach(
        (e) => {
          e.indeterminate = !0;
        },
      );
    }
    function t() {
      (e(), document.addEventListener(`astro:after-swap`, () => e()));
    }
    t();
  </script>
  <span class="ui-label">Label</span
  ><span id="end-text-1" class="ui-end-text">End text</span></label
>
```

## API

### Checkbox API

### Field group API

## Browser support

- Chromium: Full support Supported since v105.
- Firefox: Full support Supported since v121.
- Safari: Full support Supported since v15.4.

See also the [full browser support guide](https://open-props-ui.netlify.app/html/guide/browser-support.md).

## Source

### See also

- [Form](https://open-props-ui.netlify.app/html/components/form.md)

- `opui-css/css/components/checkbox.css`
- `opui-css/css/components/form.css`

