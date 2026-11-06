# Customizing

A theme in `theme.custom`, `--_*` properties for one component, and your own layer for the rest.

## Your theme

Set the [knobs, roles and component tokens](https://open-props-ui.netlify.app/html/guide/concepts.md#token-tiers) you change in the `theme.custom` layer.

```css
@layer theme.custom {
  :where(html) {
    --ui-density: 0.9;
    --ui-font-body: "Inter", system-ui, sans-serif;
    --ui-font-heading: "Fraunces", serif;
    --ui-palette-chroma: 0.35;
    --ui-palette-hue: 265;
  }
}
```

The [Theme builder](https://open-props-ui.netlify.app/theme-builder.md) writes one for you. Put pinned roles, like `--ui-primary`, on `:where(html, .ui-palette, .ui-contrast-more)`.

### Example themes

Tokens only, no component CSS. They name their fonts but don't load them.

- `bootstrap`: Bootstrap 5. Its `oklch(0.578 0.228 260)` blue, gray secondary buttons, the danger, warning, info and success colors with the subtle alert palettes, `oklch(0.91 0.007 248)` borders, 38px controls, regular weight buttons and labels, 16px checks and 32px switches, solid blue selected items, the heading scale, 1.5 line height and the wide translucent focus ring. No shadow on dropdowns and modals.
- `brutalist`: neobrutalism. Black 2px borders, hard 4px shadows on cards, dialogs and menus and on buttons that press into them on hover, with a state layer instead of a fill swap, filled in the main blue, white fields on the gray-blue page, the main blue also behind tooltips and selected items, black links and 500 weight body text.
- `m3`: Material 3. The baseline purple scheme and its tinted surfaces, the error red, pill buttons with 24px padding that show 8% state layers and lift on hover, outlined ones in the outline gray, 12px cards, 28px dialogs, 4px menus and outlined fields, 8px chips, 18px checkboxes, on-surface text with on-surface-variant secondary text, primary tab labels, 52 by 32px switches, Roboto, the type scale, the emphasized easing and the 3px secondary focus ring over a 32% scrim.
- `shadcn`: shadcn/ui. Neutral grays, a near-black primary also behind tooltips, 36px controls with 14px text and 16px padding, 32px small and 40px large buttons, light borders with a faint shadow, the accent tint on hover instead of a fill, a 3px gray focus ring, 16px checks with 4px corners, a 32px switch with a white thumb, 8px menus and chips, 10px dialogs and 14px cards with 24px padding, muted secondary text.

```css
@import "opui-css/css/imports.css";
@import "opui-css/themes/brutalist.css";
```

## Component properties

Each component page lists its `--_*` properties. Button reads these:

- `--_accent`: the accent color, which every state derives from.
- `--_bg-color` and `--_text-color`: the current background and text color.
- `--_duration` and `--_ease`: the transition duration and easing.
- `--_icon-size`: the size of a direct child `svg`.
- `--_size`: the control size.
- `--_motion`: the motion multiplier.
- `--_padding-inline`: the inline padding.

Set them on the component, not on a parent:

```css
/* Does nothing: every .ui-button declares its own --_icon-size */
.toolbar {
  --_icon-size: 1.25em;
}

/* Works */
.toolbar .ui-button {
  --_icon-size: 1.25em;
}

/* Theme tokens inherit, so a parent is fine */
.toolbar {
  --ui-button-radius: var(--ui-radius-round);
}
```

Prefer inputs like `--_accent` over outputs like `--_bg-color`, which freezes every state.

## Unlayered or your own layer

Unlayered CSS beats every [layer](https://open-props-ui.netlify.app/html/guide/concepts.md#cascade-layers). With your own layers, add one after `utils`.

```css
@layer openprops, theme, normalize, components.prose, components.root, components.extended, components.compat, utils, overrides;
@layer theme.palette, theme.base, theme.custom, theme.severity;

@layer overrides {
  .ui-badge {
    --_size: var(--ui-space-5);
  }
}
```
