# Customizing

Theme tokens change the whole library. When you want to change one component, or one instance of it, reach for its `--_` custom properties.

## Your theme

A custom theme is a short list of [theme tokens](https://open-props-ui.netlify.app/svelte/guide/theme-tokens.md). Put them in the `theme.custom` layer: it sits right after the defaults in `theme.base`, so it beats them, and every component and utility still beats it. Only list what you change, and new tokens in later releases keep their defaults.

```css
@layer theme.custom {
  :where(html) {
    --ui-border-radius: 4px;
    --ui-density: 0.9;
    --ui-font-body: "Inter", var(--font-sans);
    --ui-font-heading: "Fraunces", var(--font-serif);
    --ui-palette-chroma: 0.35;
    --ui-palette-hue: 265;
  }
}
```

Load it after the library, or after `layers.css` when you import single files. If it might load first, start it with the two `@layer` statements from `layers.css`, like the reference themes and the generated file do, so `theme.custom` still lands after the defaults. The [Theme generator](https://open-props-ui.netlify.app/svelte/guide/theme-generator.md) writes one for you, and [Theming](https://open-props-ui.netlify.app/svelte/guide/theming.md) explains each token.

### Reference themes

Three reference themes ship with the package, to use as they are or to start from. Each one is a few tokens in `theme.custom`, and the tests run every stress test page with each of them, in light and dark mode. Try them on this site in the theme drawer in the header, or in the [Theme generator](https://open-props-ui.netlify.app/svelte/guide/theme-generator.md).

- `corporate`: muted blue, cool grays, small corners and soft shadows.
- `dense`: compact controls and tight spacing for data-heavy apps.
- `editorial`: serif headings, warm grays, square corners, no raised shadows and roomy spacing.

```css
@import "opui-css/css/imports.css";
@import "opui-css/themes/dense.css";
```

## Component properties

There are two kinds of custom properties. [Theme tokens](https://open-props-ui.netlify.app/svelte/guide/theme-tokens.md), like `--ui-primary` or `--ui-button-size`, are set on `html` and inherited by everything. Change one and every component that reads it follows.

Component properties start with `--_`, like `--_accent` or `--_icon-size`. Each component declares them on itself and builds its styles from them. They're the knobs for that one component, and the API for customizing it.

For example, Button reads these:

- `--_accent`: the accent color. Fills, borders, text, hover and active states are all derived from it.
- `--_bg-color` and `--_text-color`: the current background and text color.
- `--_duration` and `--_ease`: the transition duration and easing.
- `--_icon-size`: the size of a direct child `svg`.
- `--_min-height`: the height, set by the size classes.
- `--_motion`: the motion multiplier, `0` turns transitions off.
- `--_padding-inline`: the inline padding, set by the size classes.

Other components use the same names where they mean the same thing, like `--_size` for the height of a Badge. Every component page lists its properties under Component properties, marked as inputs or outputs.

## Set them on the component

Theme tokens can be set on any parent, since they're inherited. `--_` properties can't: the component declares its own value, and a declared value always beats an inherited one. So set them on the component itself.

```css
/* Does nothing: every .ui-button sets its own --_icon-size */
.toolbar {
  --_icon-size: 1.25em;
}

/* Works */
.toolbar .ui-button {
  --_icon-size: 1.25em;
}

/* Theme tokens are inherited, so a parent is fine */
.toolbar {
  --ui-button-border-radius: var(--radius-round);
}
```

An inline `style` works too, for a one-off:

Prefer the inputs, like `--_accent`, over the outputs, like `--_bg-color`. Hover, active and disabled states set the outputs too, so overriding `--_bg-color` freezes the background in every state, while a new `--_accent` flows through all of them.

## Unlayered or your own layer

All OPUI styles live in [cascade layers](https://open-props-ui.netlify.app/svelte/guide/concepts.md#cascade-layers). Where you put your overrides decides how they compete with the library, and with each other.

### Unlayered

CSS outside any layer beats every layer, whatever the specificity. Simple, and fine for most apps:

```css
.ui-button.compact {
  --_min-height: var(--size-7);
  --_padding-inline: 1ex;
}
```

### Your own layer

If you use layers yourself, add one after `utils`. It beats the library and still loses to your unlayered CSS, so one-off fixes keep working:

```css
@layer openprops, theme, normalize, components.prose, components.root, components.extended, utils, overrides;
@layer theme.palette, theme.base, theme.custom;

@layer overrides {
  .ui-badge {
    --_size: var(--size-5);
  }
}
```

Layers are ordered by where they're first mentioned, so a layer you first use after the OPUI imports already lands after `utils`. Spelling out the full order is just nicer to read.

## More examples

Bigger icons in a toolbar, without touching the buttons elsewhere:

```css
.toolbar .ui-button {
  --_icon-size: var(--size-5);
}
```

A critical button that skips its color transitions:

```html
<button class="ui-button ui-filled ui-critical" style="--_motion: 0" type="button">
  Delete
</button>
```

Need to change it everywhere instead? Then it's a theme token, see [Theme tokens](https://open-props-ui.netlify.app/svelte/guide/theme-tokens.md) or try the [Theme generator](https://open-props-ui.netlify.app/svelte/guide/theme-generator.md). [Theming](https://open-props-ui.netlify.app/svelte/guide/theming.md) covers the palette, density, spacing, corners, fonts, elevation, motion and contrast.
