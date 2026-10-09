# Rating

A star rating. A `<meter>` shows a score, and a group of radios collects one. See also: [Radio](https://open-props-ui.netlify.app/html/components/radio.md), [Progress](https://open-props-ui.netlify.app/html/components/progress.md).

## Anatomy

Your rating

- `.ui-rating`

  A `<meter>` for a read-only score, or a `<fieldset>` of radios for input.

- `<legend>`

  The label of the input.

- `input[value="0"]`

  Clears the rating. Drawn as a muted icon, left out with `required`.

- `input[type="radio"]`

  A star, one per value from `1` to `max`.

- `::after`

  The checked and total count, such as `3/5`. Hidden from screen readers.

## Basics

Add `.ui-rating` to a `<meter>` with `max` and `value`. The `aria-label` is its accessible name, so put the score in it.

```html
<meter
  aria-label="Rated 4.5 out of 5"
  class="ui-rating"
  max="5"
  value="4.5"
></meter>
```

## Input

Add `.ui-rating` to a `<fieldset>` with a `<legend>` and one radio per star, named with `aria-label`. The radio with `value="0"` clears the rating.

Hovering previews a rating, and a click or the arrow keys set it. The icon before the stars clears it, and stays visible so touch users can find it. The count after the stars is a CSS counter. Browsers without `:has()` only fill the checked star.

```html
<fieldset class="ui-rating">
  <legend>Your rating</legend>
  <input aria-label="No rating" name="review" type="radio" value="0" />
  <input aria-label="1 star" name="review" type="radio" value="1" />
  <input aria-label="2 stars" name="review" type="radio" value="2" />
  <input aria-label="3 stars" checked name="review" type="radio" value="3" />
  <input aria-label="4 stars" name="review" type="radio" value="4" />
  <input aria-label="5 stars" name="review" type="radio" value="5" />
</fieldset>
```

## Sizes

Resize a rating with `.ui-small` or `.ui-large`. Input stars are bigger than meter stars, so each radio stays at least 24px wide.

```html
<div class="example-column">
  <meter
    aria-label="Rated 4 out of 5"
    class="ui-rating ui-small"
    max="5"
    value="4"
  ></meter>
  <meter
    aria-label="Rated 4 out of 5"
    class="ui-rating"
    max="5"
    value="4"
  ></meter>
  <meter
    aria-label="Rated 4 out of 5"
    class="ui-rating ui-large"
    max="5"
    value="4"
  ></meter>
</div>
<div class="example-column">
  <fieldset class="ui-rating ui-small">
    <legend>Small</legend>
    <input aria-label="No rating" name="size-small" type="radio" value="0" />
    <input aria-label="1 star" name="size-small" type="radio" value="1" />
    <input aria-label="2 stars" name="size-small" type="radio" value="2" />
    <input aria-label="3 stars" name="size-small" type="radio" value="3" />
    <input
      aria-label="4 stars"
      checked
      name="size-small"
      type="radio"
      value="4"
    />
    <input aria-label="5 stars" name="size-small" type="radio" value="5" />
  </fieldset>
  <fieldset class="ui-rating">
    <legend>Default</legend>
    <input aria-label="No rating" name="size-default" type="radio" value="0" />
    <input aria-label="1 star" name="size-default" type="radio" value="1" />
    <input aria-label="2 stars" name="size-default" type="radio" value="2" />
    <input aria-label="3 stars" name="size-default" type="radio" value="3" />
    <input
      aria-label="4 stars"
      checked
      name="size-default"
      type="radio"
      value="4"
    />
    <input aria-label="5 stars" name="size-default" type="radio" value="5" />
  </fieldset>
  <fieldset class="ui-rating ui-large">
    <legend>Large</legend>
    <input aria-label="No rating" name="size-large" type="radio" value="0" />
    <input aria-label="1 star" name="size-large" type="radio" value="1" />
    <input aria-label="2 stars" name="size-large" type="radio" value="2" />
    <input aria-label="3 stars" name="size-large" type="radio" value="3" />
    <input
      aria-label="4 stars"
      checked
      name="size-large"
      type="radio"
      value="4"
    />
    <input aria-label="5 stars" name="size-large" type="radio" value="5" />
  </fieldset>
</div>
```

## Fractions

The meter fills the exact fraction, so 4.9 doesn't round up to five stars.

```html
<meter
  aria-label="Rated 1.3 out of 5"
  class="ui-rating"
  max="5"
  value="1.3"
></meter>
<meter
  aria-label="Rated 2.5 out of 5"
  class="ui-rating"
  max="5"
  value="2.5"
></meter>
<meter
  aria-label="Rated 3.7 out of 5"
  class="ui-rating"
  max="5"
  value="3.7"
></meter>
<meter
  aria-label="Rated 4.9 out of 5"
  class="ui-rating"
  max="5"
  value="4.9"
></meter>
```

## Max

`max` sets the number of stars, read with typed `attr()`. Browsers without it need `--_max` with the same number, or they draw five stars.

```html
<meter
  aria-label="Rated 2 out of 3"
  class="ui-rating"
  max="3"
  style="--_max: 3"
  value="2"
></meter>
<meter
  aria-label="Rated 7.5 out of 10"
  class="ui-rating"
  max="10"
  style="--_max: 10"
  value="7.5"
></meter>
<fieldset class="ui-rating">
  <legend>Difficulty</legend>
  <input aria-label="No rating" name="difficulty" type="radio" value="0" />
  <input aria-label="1 star" name="difficulty" type="radio" value="1" />
  <input
    aria-label="2 stars"
    checked
    name="difficulty"
    type="radio"
    value="2"
  />
  <input aria-label="3 stars" name="difficulty" type="radio" value="3" />
</fieldset>
```

## Disabled

Set `disabled` to disable every radio.

```html
<fieldset class="ui-rating" disabled>
  <legend>Your rating</legend>
  <input aria-label="No rating" name="disabled" type="radio" value="0" />
  <input aria-label="1 star" name="disabled" type="radio" value="1" />
  <input aria-label="2 stars" checked name="disabled" type="radio" value="2" />
  <input aria-label="3 stars" name="disabled" type="radio" value="3" />
  <input aria-label="4 stars" name="disabled" type="radio" value="4" />
  <input aria-label="5 stars" name="disabled" type="radio" value="5" />
</fieldset>
```

## Validation

Set `required` on the radios and leave out the no rating radio, so a star has to be picked. `aria-invalid="true"` on the radios tints the empty stars. Point `aria-describedby` at the error message.

```html
<fieldset aria-describedby="stay-error" class="ui-rating">
  <legend>Rate your stay</legend>
  <input
    aria-invalid="true"
    aria-label="1 star"
    name="stay"
    required
    type="radio"
    value="1"
  />
  <input
    aria-invalid="true"
    aria-label="2 stars"
    name="stay"
    required
    type="radio"
    value="2"
  />
  <input
    aria-invalid="true"
    aria-label="3 stars"
    name="stay"
    required
    type="radio"
    value="3"
  />
  <input
    aria-invalid="true"
    aria-label="4 stars"
    name="stay"
    required
    type="radio"
    value="4"
  />
  <input
    aria-invalid="true"
    aria-label="5 stars"
    name="stay"
    required
    type="radio"
    value="5"
  />
</fieldset>
<p class="ui-caption" id="stay-error">Pick a rating to continue.</p>
```

## Localization

In right-to-left text the meter fills from the right, and the radios and arrow keys follow the reading direction.

Translate the `aria-label` of each radio.

```html
<div class="example-column" dir="rtl" lang="ar">
  <meter
    aria-label="التقييم 3.5 من 5"
    class="ui-rating"
    max="5"
    value="3.5"
  ></meter>
  <fieldset class="ui-rating">
    <legend>قيّم المنتج</legend>
    <input aria-label="بدون تقييم" name="rating-ar" type="radio" value="0" />
    <input aria-label="نجمة واحدة" name="rating-ar" type="radio" value="1" />
    <input aria-label="نجمتان" name="rating-ar" type="radio" value="2" />
    <input aria-label="3 نجوم" name="rating-ar" type="radio" value="3" />
    <input
      aria-label="4 نجوم"
      checked
      name="rating-ar"
      type="radio"
      value="4"
    />
    <input aria-label="5 نجوم" name="rating-ar" type="radio" value="5" />
  </fieldset>
</div>
```

## Accessibility

The meter is announced with its label and value. Screen readers may read the value as a percentage, so put the score in the label, such as "Rated 4.5 out of 5".

The input is a group of native radios named by the legend. Each radio has its own name, such as "3 stars", and the arrow keys move between them. The count after the stars is hidden from screen readers, since the checked radio already says it.

Radios get the library's focus ring. Each input star is at least 24px wide. In forced colors mode filled stars use `SelectedItem` on the input and `CanvasText` on the meter, and empty stars use `GrayText`.

## API

### Rating API

| Type       | Modifiers                    | Default | Description                                         |
| ---------- | ---------------------------- | ------- | --------------------------------------------------- |
| Disabled   | `fieldset[disabled]`         | -       | Disables the input.                                 |
| Max        | `[max]`, `--_max`            | `5`     | Number of stars.                                    |
| Required   | `input[required]`            | -       | Requires a star and drops the no rating radio.      |
| Sizes      | `.ui-large`, `.ui-small`     | -       | The size of the element.                            |
| Validation | `input[aria-invalid="true"]` | -       | Marks the radios invalid and tints the empty stars. |

#### Parts

| Part                  | Description                                                               |
| --------------------- | ------------------------------------------------------------------------- |
| `.ui-rating`          | A `<meter>` for a read-only score, or a `<fieldset>` of radios for input. |
| `<legend>`            | The label of the input.                                                   |
| `input[value="0"]`    | Clears the rating. Drawn as a muted icon, left out with `required`.       |
| `input[type="radio"]` | A star, one per value from `1` to `max`.                                  |
| `::after`             | The checked and total count, such as `3/5`. Hidden from screen readers.   |

#### CSS variables

| Variable                    | Default                                                                                 | Description                                                                                                                                                                                              |
| --------------------------- | --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--disabled-opacity`        | `0.64`                                                                                  | Opacity applied to disabled controls.                                                                                                                                                                    |
| `--duration`                | `0.2s`                                                                                  | Default transition duration. Multiplied by `--motion`.                                                                                                                                                   |
| `--ease`                    | `ease`                                                                                  | Default easing for transitions.                                                                                                                                                                          |
| `--field-label-color`       | `var(--text-primary)`                                                                   | Text color for field labels.                                                                                                                                                                             |
| `--field-label-font-size`   | `var(--font-size-05)`                                                                   | Font size for field labels.                                                                                                                                                                              |
| `--field-label-font-weight` | `var(--font-weight-semibold)`                                                           | Font weight for emphasized field labels and legends.                                                                                                                                                     |
| `--field-required-color`    | `var(--invalid-text-color)`                                                             | Color of the required asterisk.                                                                                                                                                                          |
| `--focus-ring-color`        | Unset                                                                                   | Color of the keyboard focus ring. When unset, the ring uses the page background color inverted.                                                                                                          |
| `--focus-ring-offset`       | `2px`                                                                                   | Distance between a control and its focus ring.                                                                                                                                                           |
| `--focus-ring-style`        | `solid`                                                                                 | Outline style of the focus ring.                                                                                                                                                                         |
| `--focus-ring-width`        | `2px`                                                                                   | Width of the focus ring.                                                                                                                                                                                 |
| `--icon-size`               | `var(--size-4)`                                                                         | Default icon size inside components.                                                                                                                                                                     |
| `--icon-size-large`         | `var(--size-5)`                                                                         | Icon size inside `Avatar` and `List`.                                                                                                                                                                    |
| `--icon-size-small`         | `var(--size-3)`                                                                         | Icon size inside `Chip`.                                                                                                                                                                                 |
| `--invalid-text-color`      | `light-dark( var(--invalid-color), oklch(from var(--invalid-color) max(l, 0.75) c h) )` | Color for validation messages and invalid labels. Lighter than `--invalid-color` in dark mode so the text stays readable.                                                                                |
| `--motion`                  | `1`                                                                                     | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/html/guide/theming.md#motion). |
| `--orange`                  | `oklch(from var(--color-7) l 0.2 75)`                                                   | A literal orange derived from the palette lightness. No severity meaning.                                                                                                                                |
| `--text-muted`              | `light-dark(var(--gray-13), var(--gray-4))`                                             | Body text color.                                                                                                                                                                                         |
| `--text-primary`            | `light-dark(var(--gray-15), var(--gray-1))`                                             | Emphasized text color for headings, labels and values.                                                                                                                                                   |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md) for the full list.

A `<meter>` needs `max`, and `--_max` with the same number for browsers without typed `attr()`. The input is a `<fieldset>` of radios, one per star, plus a `value="0"` radio for no rating.

## Browser support

- Chromium: Full support Supported since v133.
- Firefox: Full support Supported since v151.
- Safari: Full support Supported since v18.4.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/html/guide/browser-support/?components=Rating.md).

## Installation

- `opui-css/css/components/rating.css`

## Changelog

### What's new

- New component. A [star rating](#basics) that shows a score with exact fractions, or [collects one](#input) with radios.
