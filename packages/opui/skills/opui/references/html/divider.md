# Divider

It's just a line.

## Default

```html
This text is placed over
<hr class="ui-divider" />
This text is placed under
```

## Variants

Use `.ui-filled`, `.ui-primary`, or `.ui-tonal` to change the line color.

```html
Tonal
<hr class="ui-divider ui-tonal" />


Filled
<hr class="ui-divider ui-filled" />


Primary
<hr class="ui-divider ui-primary" />
```

## Spacing

The space above and below a divider is `--divider-space`. Cards, callouts, dialogs and drawers set a tighter value, and a divider that is a direct child of a card has no margin, since the card's gap already spaces it. Set `--divider-space` on any wrapper to change it for every divider inside.

```html
<div class="ui-card ui-outlined">
  <div class="ui-content">Inside a card, the gap spaces the divider.</div>
  <hr class="ui-divider" />
  <div class="ui-content">
    Nested deeper, it uses the card's tighter space.
    <hr class="ui-divider" />
    So everything stays close together.
  </div>
</div>


<div style="--divider-space: var(--size-1)">
  A custom space on any wrapper
  <hr class="ui-divider" />
  reaches every divider inside it.
</div>
```

## API

### Divider API

| Type     | Modifiers                                | Default | Description         |
| -------- | ---------------------------------------- | ------- | ------------------- |
| Variants | `.ui-filled`, `.ui-primary`, `.ui-tonal` | -       | The variant to use. |

#### Parts

| Part            | Description       |
| --------------- | ----------------- |
| `hr.ui-divider` | The divider line. |

#### CSS variables

| Variable           | Default                                      | Description                                                                                                                                                                                   |
| ------------------ | -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--border-color`   | `light-dark(var(--gray-4), var(--gray-12))`  | Default border color for cards, lists, tables and dividers.                                                                                                                                   |
| `--divider-space`  | `var(--size-fluid-3)`                        | Block margin around a `Divider`. Cards, callouts, dialogs and drawers set it to `--size-3`. A divider that is a direct child of a card has no margin, since the card's gap already spaces it. |
| `--primary`        | `light-dark(var(--color-9), var(--color-6))` | Brand color for primary actions and accents.                                                                                                                                                  |
| `--surface-filled` | `light-dark(var(--gray-4), var(--gray-15))`  | Background of filled areas such as progress tracks and table stripes.                                                                                                                         |
| `--surface-tonal`  | `light-dark(var(--gray-3), var(--gray-12))`  | Background of tonal variants.                                                                                                                                                                 |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md) for the full list.

## Under the hood

1. Element

   - `<hr>`: a thematic break, semantics included
   - The normalize removes its border, so you are now looking at nothing
   - Some would call this the purest divider

2. Height

   - It has a height now
   - You still can't see it
   - Trust the process

3. Paint

   - There it is
   - Please hold your applause

4. Breathe

   - Keeps the text from touching the line
   - Without it the divider still divides, just aggressively

5. Ship it

   - No JavaScript, no `:has()`, no anchor positioning
   - Drag **Excitement**: nothing reads it, and nothing changes
   - Coming in v3: a second line

Step 1 of 5: Element

- [\<hr> ](https://webstatus.dev/features/hr)(Widely available): Chrome 1+, Edge 12+, Firefox 1+, Safari 3+

```html
<p>Above the line</p>
<hr class="divider" />
<p>Below the line</p>
```

Step 2 of 5: Height

```css
.divider {
  block-size: 1px;
}
```

Step 3 of 5: Paint

- [`background-color` ](https://webstatus.dev/features/background-color)(Widely available): Chrome 1+, Edge 12+, Firefox 1+, Safari 1+

```css
.divider {
  background-color: var(--border-color);
}
```

Step 4 of 5: Breathe

- [Logical properties ](https://webstatus.dev/features/logical-properties)(Widely available): Chrome 89+, Edge 89+, Firefox 66+, Safari 15+
- [`margin` ](https://webstatus.dev/features/margin)(Widely available): Chrome 1+, Edge 12+, Firefox 1+, Safari 1+

```css
.divider {
  margin-block: var(--size-fluid-3);
}
```

Step 5 of 5: Ship it

## Browser support

- Chromium: Full support Supported since v111.
- Firefox: Full support Supported since v151.
- Safari: Full support Supported since v18.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/html/guide/browser-support/?components=Divider.md).

## Installation

- `opui-css/css/components/divider.css`

## Changelog

### What's new

- [Spacing](#spacing) comes from `--divider-space`, which cards, callouts, dialogs and drawers make tighter.
- Breaking: [`.ui-filled`, `.ui-primary` and `.ui-tonal`](#variants) replace the `.ui-border-*` classes.
