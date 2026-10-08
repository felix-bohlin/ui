# Carousel

## Anatomy

- Destination

  ### Kyoto

- Destination

  ### Lima

- Destination

  ### Lisbon

* `ul.ui-carousel`

  The scroller.

* `<li>`

  An item.

* `::scroll-button(inline-start)`

  The previous button.

* `::scroll-button(inline-end)`

  The next button.

* `li::scroll-marker`

  A marker, one per item.

## Basics

Add `.ui-with-buttons` for previous and next buttons, and `.ui-with-markers` for a marker per item.

Browsers without `::scroll-button()` and `::scroll-marker` get a plain scroll-snap list with a scrollbar.

```html
<ul
  class="ui-carousel ui-buttons-outside ui-with-buttons ui-with-markers"
  aria-label="Destinations"
>
  <li>
    <div class="ui-card ui-tonal">
      <hgroup>
        <p>Destination</p>
        <h3>Kyoto</h3>
        <p>Temples, gardens and quiet lanes.</p>
      </hgroup>
    </div>
  </li>
  <li>
    <div class="ui-card ui-tonal">
      <hgroup>
        <p>Destination</p>
        <h3>Lima</h3>
        <p>Ceviche by the Pacific.</p>
      </hgroup>
    </div>
  </li>
  <li>
    <div class="ui-card ui-tonal">
      <hgroup>
        <p>Destination</p>
        <h3>Lisbon</h3>
        <p>Tiles, trams and custard tarts.</p>
      </hgroup>
    </div>
  </li>
  <li>
    <div class="ui-card ui-tonal">
      <hgroup>
        <p>Destination</p>
        <h3>Oslo</h3>
        <p>Fjords, saunas and modern architecture.</p>
      </hgroup>
    </div>
  </li>
  <li>
    <div class="ui-card ui-tonal">
      <hgroup>
        <p>Destination</p>
        <h3>Tunis</h3>
        <p>Medina markets and Mediterranean light.</p>
      </hgroup>
    </div>
  </li>
</ul>
```

## Items per view

Set `--_per-view` to show more than one item at a time.

```html
<ul
  class="ui-carousel ui-buttons-outside ui-with-buttons"
  aria-label="Destinations"
  style="--_per-view: 3"
>
  <li>
    <div class="ui-card ui-tonal">
      <hgroup>
        <p>Destination</p>
        <h3>Kyoto</h3>
        <p>Temples, gardens and quiet lanes.</p>
      </hgroup>
    </div>
  </li>
  <li>
    <div class="ui-card ui-tonal">
      <hgroup>
        <p>Destination</p>
        <h3>Lima</h3>
        <p>Ceviche by the Pacific.</p>
      </hgroup>
    </div>
  </li>
  <li>
    <div class="ui-card ui-tonal">
      <hgroup>
        <p>Destination</p>
        <h3>Lisbon</h3>
        <p>Tiles, trams and custard tarts.</p>
      </hgroup>
    </div>
  </li>
  <li>
    <div class="ui-card ui-tonal">
      <hgroup>
        <p>Destination</p>
        <h3>Oslo</h3>
        <p>Fjords, saunas and modern architecture.</p>
      </hgroup>
    </div>
  </li>
  <li>
    <div class="ui-card ui-tonal">
      <hgroup>
        <p>Destination</p>
        <h3>Tunis</h3>
        <p>Medina markets and Mediterranean light.</p>
      </hgroup>
    </div>
  </li>
</ul>
```

## Stretch

Items in a row are as tall as the tallest one, but their content keeps its own height.

`.ui-stretch` stretches the content of each item, such as a card, to the item's height.

```html
<ul
  class="ui-carousel ui-buttons-outside ui-stretch ui-with-buttons"
  aria-label="Destinations"
  style="--_per-view: 3"
>
  <li>
    <div class="ui-card ui-tonal">
      <hgroup>
        <p>Destination</p>
        <h3>Kyoto</h3>
        <p>Temples, gardens and quiet lanes.</p>
      </hgroup>
    </div>
  </li>
  <li>
    <div class="ui-card ui-tonal">
      <hgroup>
        <p>Destination</p>
        <h3>Lima</h3>
        <p>
          Ceviche by the Pacific, colonial plazas and clifftop parks above the
          ocean.
        </p>
      </hgroup>
    </div>
  </li>
  <li>
    <div class="ui-card ui-tonal">
      <hgroup>
        <p>Destination</p>
        <h3>Lisbon</h3>
        <p>Tiles and trams.</p>
      </hgroup>
    </div>
  </li>
  <li>
    <div class="ui-card ui-tonal">
      <hgroup>
        <p>Destination</p>
        <h3>Oslo</h3>
        <p>Fjords, saunas and modern architecture.</p>
      </hgroup>
    </div>
  </li>
  <li>
    <div class="ui-card ui-tonal">
      <hgroup>
        <p>Destination</p>
        <h3>Tunis</h3>
        <p>Medina markets.</p>
      </hgroup>
    </div>
  </li>
</ul>
```

## Peek

Use `.ui-peek` to show part of the neighbouring items, and `.ui-align-center` to snap items to the center.

```html
<ul
  class="ui-carousel ui-align-center ui-peek ui-with-markers"
  aria-label="Destinations"
>
  <li>
    <div class="ui-card ui-tonal">
      <hgroup>
        <p>Destination</p>
        <h3>Kyoto</h3>
        <p>Temples, gardens and quiet lanes.</p>
      </hgroup>
    </div>
  </li>
  <li>
    <div class="ui-card ui-tonal">
      <hgroup>
        <p>Destination</p>
        <h3>Lima</h3>
        <p>Ceviche by the Pacific.</p>
      </hgroup>
    </div>
  </li>
  <li>
    <div class="ui-card ui-tonal">
      <hgroup>
        <p>Destination</p>
        <h3>Lisbon</h3>
        <p>Tiles, trams and custard tarts.</p>
      </hgroup>
    </div>
  </li>
  <li>
    <div class="ui-card ui-tonal">
      <hgroup>
        <p>Destination</p>
        <h3>Oslo</h3>
        <p>Fjords, saunas and modern architecture.</p>
      </hgroup>
    </div>
  </li>
  <li>
    <div class="ui-card ui-tonal">
      <hgroup>
        <p>Destination</p>
        <h3>Tunis</h3>
        <p>Medina markets and Mediterranean light.</p>
      </hgroup>
    </div>
  </li>
</ul>
```

## Vertical

`.ui-vertical` scrolls on the block axis. Set its height with `--_block-size`.

```html
<ul
  class="ui-carousel ui-vertical ui-with-buttons ui-with-markers"
  aria-label="Destinations"
  style="--_block-size: 16rem"
>
  <li>
    <div class="ui-card ui-tonal">
      <hgroup>
        <p>Destination</p>
        <h3>Kyoto</h3>
        <p>Temples, gardens and quiet lanes.</p>
      </hgroup>
    </div>
  </li>
  <li>
    <div class="ui-card ui-tonal">
      <hgroup>
        <p>Destination</p>
        <h3>Lima</h3>
        <p>Ceviche by the Pacific.</p>
      </hgroup>
    </div>
  </li>
  <li>
    <div class="ui-card ui-tonal">
      <hgroup>
        <p>Destination</p>
        <h3>Lisbon</h3>
        <p>Tiles, trams and custard tarts.</p>
      </hgroup>
    </div>
  </li>
  <li>
    <div class="ui-card ui-tonal">
      <hgroup>
        <p>Destination</p>
        <h3>Oslo</h3>
        <p>Fjords, saunas and modern architecture.</p>
      </hgroup>
    </div>
  </li>
  <li>
    <div class="ui-card ui-tonal">
      <hgroup>
        <p>Destination</p>
        <h3>Tunis</h3>
        <p>Medina markets and Mediterranean light.</p>
      </hgroup>
    </div>
  </li>
</ul>
```

## Images

`--_media-aspect-ratio` crops images to the same shape, `16 / 9` by default.

```html
<ul class="ui-carousel ui-with-buttons ui-with-markers" aria-label="Photos">
  <li>
    <img
      alt="A deep blue fjord between steep mountains"
      height="450"
      loading="lazy"
      src="https://picsum.photos/id/1015/800/450"
      width="800"
    />
  </li>
  <li>
    <img
      alt="Red rock cliffs lit by the setting sun"
      height="450"
      loading="lazy"
      src="https://picsum.photos/id/1016/800/450"
      width="800"
    />
  </li>
  <li>
    <img
      alt="Green cliffs and a winding road under a cloudy sky"
      height="450"
      loading="lazy"
      src="https://picsum.photos/id/1018/800/450"
      width="800"
    />
  </li>
  <li>
    <img
      alt="Yellow tents in a snowy mountain camp"
      height="450"
      loading="lazy"
      src="https://picsum.photos/id/1036/800/450"
      width="800"
    />
  </li>
  <li>
    <img
      alt="A waterfall in a green forest valley"
      height="450"
      loading="lazy"
      src="https://picsum.photos/id/1039/800/450"
      width="800"
    />
  </li>
</ul>
```

```html
<ul
  class="ui-carousel ui-with-buttons"
  aria-label="Gallery"
  style="--_per-view: 3; --_media-aspect-ratio: 1"
>
  <li>
    <img
      alt="A deep blue fjord between steep mountains"
      height="400"
      loading="lazy"
      src="https://picsum.photos/id/1015/400/400"
      width="400"
    />
  </li>
  <li>
    <img
      alt="Red rock cliffs lit by the setting sun"
      height="400"
      loading="lazy"
      src="https://picsum.photos/id/1016/400/400"
      width="400"
    />
  </li>
  <li>
    <img
      alt="Green cliffs and a winding road under a cloudy sky"
      height="400"
      loading="lazy"
      src="https://picsum.photos/id/1018/400/400"
      width="400"
    />
  </li>
  <li>
    <img
      alt="Yellow tents in a snowy mountain camp"
      height="400"
      loading="lazy"
      src="https://picsum.photos/id/1036/400/400"
      width="400"
    />
  </li>
  <li>
    <img
      alt="A waterfall in a green forest valley"
      height="400"
      loading="lazy"
      src="https://picsum.photos/id/1039/400/400"
      width="400"
    />
  </li>
</ul>
```

## Video

`video` and `iframe` fill the item too.

```html
<ul class="ui-carousel ui-with-buttons ui-with-markers" aria-label="Videos">
  <li>
    <video
      aria-label="A red flower bud opening"
      controls
      playsinline
      preload="metadata"
      src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
    ></video>
  </li>
  <li>
    <video
      aria-label="Scene from a black-and-white film"
      controls
      playsinline
      preload="metadata"
      src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/friday.mp4"
    ></video>
  </li>
</ul>
```

```html
<ul class="ui-carousel ui-with-buttons ui-with-markers" aria-label="Tutorials">
  <li>
    <iframe
      allow="encrypted-media; fullscreen; picture-in-picture"
      allowfullscreen
      loading="lazy"
      referrerpolicy="strict-origin-when-cross-origin"
      src="https://www.youtube-nocookie.com/embed/gmI5nvzv170"
      title="CSS only carousel? Learn ::scroll-button() in 9 minutes"
    ></iframe>
  </li>
  <li>
    <iframe
      allow="encrypted-media; fullscreen; picture-in-picture"
      allowfullscreen
      loading="lazy"
      referrerpolicy="strict-origin-when-cross-origin"
      src="https://www.youtube-nocookie.com/embed/bP8mrNdR-hs"
      title="I love the new CSS functions"
    ></iframe>
  </li>
  <li>
    <iframe
      allow="encrypted-media; fullscreen; picture-in-picture"
      allowfullscreen
      loading="lazy"
      referrerpolicy="strict-origin-when-cross-origin"
      src="https://www.youtube-nocookie.com/embed/qu1jE41O_8o"
      title="Use these CSS features instead of JavaScript"
    ></iframe>
  </li>
</ul>
```

## Buttons outside

Use `.ui-buttons-outside` to keep the buttons off the content.

```html
<ul
  class="ui-carousel ui-buttons-outside ui-with-buttons"
  aria-label="Plans"
  style="--_per-view: 2"
>
  <li>
    <div class="ui-card ui-outlined">
      <hgroup>
        <h3>Basic</h3>
        <p>For personal projects.</p>
      </hgroup>
      <div class="ui-actions">
        <button type="button" class="ui-button ui-filled">Choose Basic</button>
      </div>
    </div>
  </li>
  <li>
    <div class="ui-card ui-outlined">
      <hgroup>
        <h3>Enterprise</h3>
        <p>For large organisations.</p>
      </hgroup>
      <div class="ui-actions">
        <button type="button" class="ui-button ui-filled">Contact sales</button>
      </div>
    </div>
  </li>
  <li>
    <div class="ui-card ui-outlined">
      <hgroup>
        <h3>Pro</h3>
        <p>For growing teams.</p>
      </hgroup>
      <div class="ui-actions">
        <button type="button" class="ui-button ui-filled">Choose Pro</button>
      </div>
    </div>
  </li>
  <li>
    <div class="ui-card ui-outlined">
      <hgroup>
        <h3>Team</h3>
        <p>For small teams.</p>
      </hgroup>
      <div class="ui-actions">
        <button type="button" class="ui-button ui-filled">Choose Team</button>
      </div>
    </div>
  </li>
</ul>
```

## Persistent buttons

Use `.ui-buttons-persistent` to keep both buttons visible at the ends. A disabled button has a muted border.

```html
<ul
  class="ui-carousel ui-buttons-outside ui-buttons-persistent ui-with-buttons"
  aria-label="Destinations"
  style="--_per-view: 2"
>
  <li>
    <div class="ui-card ui-tonal">
      <hgroup>
        <p>Destination</p>
        <h3>Kyoto</h3>
        <p>Temples, gardens and quiet lanes.</p>
      </hgroup>
    </div>
  </li>
  <li>
    <div class="ui-card ui-tonal">
      <hgroup>
        <p>Destination</p>
        <h3>Lisbon</h3>
        <p>Tiles, trams and custard tarts.</p>
      </hgroup>
    </div>
  </li>
  <li>
    <div class="ui-card ui-tonal">
      <hgroup>
        <p>Destination</p>
        <h3>Oslo</h3>
        <p>Fjords, saunas and modern architecture.</p>
      </hgroup>
    </div>
  </li>
  <li>
    <div class="ui-card ui-tonal">
      <hgroup>
        <p>Destination</p>
        <h3>Tunis</h3>
        <p>Medina markets and Mediterranean light.</p>
      </hgroup>
    </div>
  </li>
</ul>
```

## Custom buttons

`--_button-prev-icon` and `--_button-next-icon` take any SVG, for example from your icon library. Set `--_button-icon-size` to scale them.

```html
<ul
  class="ui-carousel ui-buttons-outside ui-with-buttons carousel-custom-buttons"
  aria-label="Destinations"
  style="--_per-view: 2"
>
  <li>
    <div class="ui-card ui-tonal">
      <hgroup>
        <p>Destination</p>
        <h3>Kyoto</h3>
        <p>Temples, gardens and quiet lanes.</p>
      </hgroup>
    </div>
  </li>
  <li>
    <div class="ui-card ui-tonal">
      <hgroup>
        <p>Destination</p>
        <h3>Lima</h3>
        <p>Ceviche by the Pacific.</p>
      </hgroup>
    </div>
  </li>
  <li>
    <div class="ui-card ui-tonal">
      <hgroup>
        <p>Destination</p>
        <h3>Lisbon</h3>
        <p>Tiles, trams and custard tarts.</p>
      </hgroup>
    </div>
  </li>
  <li>
    <div class="ui-card ui-tonal">
      <hgroup>
        <p>Destination</p>
        <h3>Oslo</h3>
        <p>Fjords, saunas and modern architecture.</p>
      </hgroup>
    </div>
  </li>
  <li>
    <div class="ui-card ui-tonal">
      <hgroup>
        <p>Destination</p>
        <h3>Tunis</h3>
        <p>Medina markets and Mediterranean light.</p>
      </hgroup>
    </div>
  </li>
</ul>

<style>
  .carousel-custom-buttons {
    --_button-bg-color: var(--primary);
    --_button-next-icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='none' stroke='white' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 12h14m-6-6 6 6-6 6'/%3E%3C/svg%3E");
    --_button-prev-icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='none' stroke='white' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 12H5m6-6-6 6 6 6'/%3E%3C/svg%3E");
  }
</style>
```

## Playground

Try the options together. The code below the carousel updates as you go.

## Grid and flex layouts

With `.ui-with-markers`, the markers are a box next to the carousel, not inside it. In a grid or flex parent they become an item of their own and land in the next cell. Wrap the carousel in a `div` to keep them together.

```html
<div
  style="
    display: grid;
    gap: var(--size-4);
    grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
  "
>
  <div>
    <ul
      class="ui-carousel ui-with-buttons ui-with-markers"
      aria-label="Destinations"
    >
      <li>
        <div class="ui-card ui-tonal">
          <hgroup>
            <p>Destination</p>
            <h3>Kyoto</h3>
          </hgroup>
        </div>
      </li>
      <li>
        <div class="ui-card ui-tonal">
          <hgroup>
            <p>Destination</p>
            <h3>Lima</h3>
          </hgroup>
        </div>
      </li>
      <li>
        <div class="ui-card ui-tonal">
          <hgroup>
            <p>Destination</p>
            <h3>Lisbon</h3>
          </hgroup>
        </div>
      </li>
    </ul>
  </div>
  <hgroup>
    <h3>Spring trips</h3>
    <p>Three cities, two weeks, one carry-on.</p>
  </hgroup>
</div>
```

## Accessibility

### Work in progress

The buttons and markers are generated by CSS, and browser vendors are still working out how these are named, focused and shown in high contrast. Until that settles, making a carousel accessible is up to you: test it with the screen readers and settings your users rely on, and add your own controls where it falls short.

Screen readers announce the position of each item. The buttons and markers have accessible names.

The buttons and markers get the library's focus ring. In forced colors mode the markers get a border, and the current marker is filled with `SelectedItem`.

The buttons and markers scroll smoothly unless motion is off: with reduced motion, `.ui-motion-off` on the carousel or a parent, or `--motion: 0` on a parent.

## API

### Carousel API

| Type               | Modifiers                                 | Default  | Description                                                                                                           |
| ------------------ | ----------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------- |
| Alignment          | default, `.ui-align-center`               | default  | Where items snap.                                                                                                     |
| Aspect ratio       | `--_media-aspect-ratio`                   | `16 / 9` | Aspect ratio that images, videos and iframes are cropped to.                                                          |
| Buttons            | `.ui-buttons-outside`, `.ui-with-buttons` | -        | Previous and next buttons. `"outside"` places them beside the items.                                                  |
| Items per view     | `--_per-view`                             | `1`      | Number of visible items.                                                                                              |
| Label              | `[aria-label]`                            | -        | Accessible name of the carousel.                                                                                      |
| Markers            | `.ui-with-markers`                        | -        | One marker per item, after the list.                                                                                  |
| Orientation        | default, `.ui-vertical`                   | default  | Scroll direction. Vertical carousels need a block size, set with `--_block-size`.                                     |
| Peek               | `.ui-peek`                                | -        | Shows part of the neighbouring items.                                                                                 |
| Persistent buttons | `.ui-buttons-persistent`                  | -        | Keeps the buttons visible at the ends. A disabled button has a muted border.                                          |
| Stretch            | `.ui-stretch`                             | -        | Makes each item a grid, so its content (a card, a link) fills the item's height. Media with an aspect ratio keeps it. |

#### Parts

| Part                            | Description             |
| ------------------------------- | ----------------------- |
| `ul.ui-carousel`                | The scroller.           |
| `<li>`                          | An item.                |
| `::scroll-button(inline-start)` | The previous button.    |
| `::scroll-button(inline-end)`   | The next button.        |
| `li::scroll-marker`             | A marker, one per item. |

#### CSS variables

| Variable              | Default                                      | Description                                                                                                                                                                                              |
| --------------------- | -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--border-radius`     | `var(--size-2)`                              | Default corner radius for cards, callouts, tables and accordions.                                                                                                                                        |
| `--border-width`      | `1px`                                        | Default border width for components that draw a border.                                                                                                                                                  |
| `--button-size-small` | `var(--control-size-small)`                  | `Button` height with `.ui-small`.                                                                                                                                                                        |
| `--duration`          | `0.2s`                                       | Default transition duration. Multiplied by `--motion`.                                                                                                                                                   |
| `--duration-fast`     | `0.1s`                                       | Transition duration for hover and press feedback.                                                                                                                                                        |
| `--ease`              | `ease`                                       | Default easing for transitions.                                                                                                                                                                          |
| `--focus-ring-color`  | Unset                                        | Color of the keyboard focus ring. When unset, the ring uses the page background color inverted.                                                                                                          |
| `--focus-ring-offset` | `2px`                                        | Distance between a control and its focus ring.                                                                                                                                                           |
| `--focus-ring-style`  | `solid`                                      | Outline style of the focus ring.                                                                                                                                                                         |
| `--focus-ring-width`  | `2px`                                        | Width of the focus ring.                                                                                                                                                                                 |
| `--motion`            | `1`                                          | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/html/guide/theming.md#motion). |
| `--primary`           | `light-dark(var(--color-9), var(--color-6))` | Brand color for primary actions and accents.                                                                                                                                                             |
| `--surface-inverse`   | `light-dark(var(--gray-15), var(--gray-2))`  | Background of `Toast` and `Tooltip`, inverted against the page.                                                                                                                                          |
| `--text-primary`      | `light-dark(var(--gray-15), var(--gray-1))`  | Emphasized text color for headings, labels and values.                                                                                                                                                   |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md) for the full list.

The root is a `ul` with an `aria-label`. Buttons and markers are generated by CSS.

## Under the hood

Read the post: [A carousel made of CSS](https://open-props-ui.netlify.app/learn/carousel-css-only)

1. Grid track

   - `grid-auto-flow: column` lays every item out in one row
   - Item width = (track − gaps) ÷ items per view
   - `min-inline-size: 0` lets an item shrink below its content, so it never overruns the gap

2. Scroll snap

   - `scroll-snap-type` on the scroller
   - `scroll-snap-align` on each item
   - `overscroll-behavior-inline: contain` stops the page swiping back

3. Scroll buttons

   - `::scroll-button()`: real, focusable buttons generated by CSS
   - Opt in with `.with-buttons`
   - Disabled automatically at either end
   - `content: "❯" / "Next"` sets the glyph and the accessible name
   - Text glyphs don't flip in right-to-left. The library uses SVG chevrons and swaps them under `:dir(rtl)`
   - Anchor positioning places them over the scroller

4. Scroll markers

   - Opt in with `.with-markers`
   - `scroll-marker-group: after` creates the dot container
   - `::scroll-marker` per item, labelled with a CSS counter
   - `:target-current` follows the snapped item
   - Scrollbar hidden only with buttons or markers on, and only where scroll buttons are supported

Step 1 of 4: Grid track

```css
.carousel {
  display: grid;
  gap: var(--gap);
  grid-auto-columns: calc(
    (100% - (var(--per-view) - 1) * var(--gap)) / var(--per-view)
  );
  grid-auto-flow: column;
  overflow-x: auto;
}

.carousel > li {
  min-inline-size: 0;
}
```

Step 2 of 4: Scroll snap

- [`overscroll-behavior` ](https://webstatus.dev/features/overscroll-behavior)(Limited availability): Chrome 144+, Edge 144+, Firefox 150+, Safari not supported
- [Scroll snap ](https://webstatus.dev/features/scroll-snap)(Widely available): Chrome 69+, Edge 79+, Firefox 68+, Safari 11+

```css
.carousel {
  overscroll-behavior-inline: contain;
  scroll-snap-type: x mandatory;
}

.carousel > li {
  scroll-snap-align: start;
}
```

Step 3 of 4: Scroll buttons

- [Anchor positioning ](https://webstatus.dev/features/anchor-positioning)(Limited availability): Chrome 144+, Edge 144+, Firefox 151+, Safari 26+
- [`::scroll-button` ](https://webstatus.dev/features/scroll-buttons)(Limited availability): Chrome 135+, Edge 135+, Firefox not supported, Safari not supported

```css
.carousel.with-buttons::scroll-button(inline-start),
.carousel.with-buttons::scroll-button(inline-end) {
  background-color: var(--text-primary);
  block-size: 2rem;
  border: 0;
  border-radius: 50%;
  color: var(--surface-default);
  cursor: pointer;
  inline-size: 2rem;
  inset-block-start: anchor(center);
  position: absolute;
  position-anchor: auto;
  translate: 0 -50%;
}

.carousel.with-buttons::scroll-button(inline-start) {
  content: "❮" / "Previous";
  inset-inline-start: calc(anchor(self-start) + 0.5rem);
}

.carousel.with-buttons::scroll-button(inline-end) {
  content: "❯" / "Next";
  inset-inline-end: calc(anchor(self-end) + 0.5rem);
}

.carousel.with-buttons::scroll-button(inline-start):disabled,
.carousel.with-buttons::scroll-button(inline-end):disabled {
  opacity: 0;
}
```

Step 4 of 4: Scroll markers

- [Relative colors ](https://webstatus.dev/features/relative-color)(Newly available): Chrome 125+, Edge 125+, Firefox 128+, Safari 18+
- [Scroll marker target pseudo-classes ](https://webstatus.dev/features/scroll-marker-targets)(Limited availability): Chrome 142+, Edge 142+, Firefox not supported, Safari not supported
- [Scroll markers ](https://webstatus.dev/features/scroll-markers)(Limited availability): Chrome 135+, Edge 135+, Firefox not supported, Safari not supported
- [`scrollbar-width` ](https://webstatus.dev/features/scrollbar-width)(Newly available): Chrome 121+, Edge 121+, Firefox 64+, Safari 18.2+

```css
.carousel {
  counter-reset: slide;
}

.carousel.with-markers {
  scroll-marker-group: after;
}

.carousel.with-markers::scroll-marker-group {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  margin-block-start: 0.75rem;
}

.carousel > li {
  counter-increment: slide;
}

.carousel.with-markers > li::scroll-marker {
  background-color: oklch(from var(--text-primary) l c h / 25%);
  block-size: 0.5rem;
  border-radius: 50%;
  content: "" / "Slide " counter(slide);
  cursor: pointer;
  inline-size: 0.5rem;
}

.carousel.with-markers > li::scroll-marker:target-current {
  background-color: var(--primary);
}

@supports selector(::scroll-button(*)) {
  .carousel:is(.with-buttons, .with-markers) {
    scrollbar-width: none;
  }
}
```

## Browser support

- Chromium: Full support Supported since v144.
- Firefox: Partial support Missing: scroll-buttons, scroll-marker-targets, scroll-markers.
- Safari: Partial support Missing: scroll-buttons, scroll-marker-targets, scroll-markers.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/html/guide/browser-support/?components=Carousel.md).

## Installation

- `opui-css/css/components/carousel.css`

## Changelog

### What's new

- [Images](#images) are cropped with the `aspectRatio` prop.
- A [playground](#playground) to try the options together.
- New component. A [scroll snap carousel](#basics) with buttons and markers generated by CSS.
- [Persistent buttons](#persistent-buttons) with `.ui-buttons-persistent`.
- [Vertical](#vertical) carousels with `.ui-vertical`.
- [Stretch](#stretch) cards to equal height with `.ui-stretch`.
