# Customizing

Theme tokens change the whole library. To change one component, or one instance of it, set its `--_*` properties.

## Your theme

A theme is the [knobs, roles and component tokens](https://open-props-ui.netlify.app/react/guide/concepts.md#token-tiers) you change, in the `theme.custom` layer, right after the defaults. Tokens you leave out keep their defaults, also new ones in later releases.

```css
@layer theme.custom {
  :where(html) {
    --ui-radius: 4px;
    --ui-density: 0.9;
    --ui-font-body: "Inter", var(--font-sans);
    --ui-font-heading: "Fraunces", var(--font-serif);
    --ui-palette-chroma: 0.35;
    --ui-palette-hue: 265;
  }
}
```

If it might load before `layers.css`, start it with the two `@layer` statements from there, like the example themes do. The [Theme generator](https://open-props-ui.netlify.app/react/guide/theme-generator.md) writes one for you.

Knobs inherit, so `html` is enough for them. A role you pin, such as `--ui-surface` or `--ui-primary`, goes on `:where(html, .ui-palette, .ui-contrast-more)` so the scope classes keep it. The example themes do that for every token.

### Example themes

Four themes ship with the package to show how far tokens go. Each is only tokens in `theme.custom`, on `html` and, for the colors of severity scopes such as `.ui-info`, on those classes. No component CSS. Every stress test page runs with each of them in light and dark mode. They copy their originals faithfully, also where those fall short of WCAG contrast (the translucent focus rings of Bootstrap and shadcn, the light field borders of Bootstrap and shadcn, the bright blue of brutalist). They name their fonts (Geist, Roboto, DM Sans) but don't load them. Try them in the theme drawer in the header.

- `bootstrap`: Bootstrap 5. Its `#0d6efd` blue, gray secondary buttons, the danger, warning, info and success colors with the subtle alert palettes, `#dee2e6` borders, 38px controls, regular weight buttons and labels, 16px checks and 32px switches, the heading scale, 1.5 line height and the wide translucent focus ring. No shadow on dropdowns and modals.
- `brutalist`: neobrutalism. Black 2px borders, hard 4px shadows on cards, dialogs and menus and on buttons that press into them on hover without changing color, white fields on the gray-blue page, a bright blue main color also behind tooltips, black links and 500 weight body text.
- `m3`: Material 3. The baseline purple scheme and its tinted surfaces, the error red, pill buttons with 24px padding that show 8% state layers and lift on hover, outlined ones in the outline gray, 12px cards, 28px dialogs, 4px menus and outlined fields, 8px chips, 18px checkboxes, 52 by 32px switches, Roboto, the type scale, the emphasized easing and the 3px secondary focus ring over a 32% scrim.
- `shadcn`: shadcn/ui. Neutral grays, a near-black primary also behind tooltips, 36px controls with 14px text and 16px padding, 32px small and 40px large buttons, light borders with a faint shadow, the accent tint on hover instead of a fill, a 3px gray focus ring, 16px checks with 4px corners, a 32px switch with a white thumb, 8px menus and chips, 10px dialogs and 14px cards.

```css
@import "opui-css/css/imports.css";
@import "opui-css/themes/brutalist.css";
```

## Component properties

The `--_*` private properties are each component's wiring, the last [tier](https://open-props-ui.netlify.app/react/guide/concepts.md#token-tiers) before its CSS. Every component page lists its own under Component properties, marked as inputs or outputs, and components share names where they mean the same thing. Button reads these:

- `--_accent`: the accent color. Fills, borders, text, hover and active states are all derived from it.
- `--_bg-color` and `--_text-color`: the current background and text color.
- `--_duration` and `--_ease`: the transition duration and easing.
- `--_icon-size`: the size of a direct child `svg`.
- `--_min-block-size`: the height, set by the size classes.
- `--_motion`: the motion multiplier, `0` turns transitions off.
- `--_padding-inline`: the inline padding, set by the size classes.

The component declares them on itself, so set them on the component, not on a parent. Theme tokens are the ones to set on a parent:

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
  --ui-button-radius: var(--radius-round);
}
```

Prefer inputs like `--_accent` over outputs like `--_bg-color`. The states set the outputs, so a new `--_bg-color` freezes the background in every state, while a new `--_accent` flows through all of them.

## Unlayered or your own layer

Unlayered CSS beats every [layer](https://open-props-ui.netlify.app/react/guide/concepts.md#cascade-layers), which is fine for most apps. If you use layers yourself, add one after `utils`: it beats the library and still loses to your unlayered one-off fixes.

```css
@layer openprops, theme, normalize, components.prose, components.root, components.extended, utils, overrides;
@layer theme.palette, theme.base, theme.custom;

@layer overrides {
  .ui-badge {
    --_size: var(--size-5);
  }
}
```
