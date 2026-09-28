# Carousel

A scrolling list of anything, e.g.[Cards](https://open-props-ui.netlify.app/html/components/card.md). CSS only.

## Basics

`.ui-with-buttons`, and `.ui-with-markers` to navigate.

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

`--_per-view`.

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

## Peek

`.ui-peek`, and `.ui-align-center` to snap to the center.

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

## Images

`--_media-aspect-ratio` to crop images.

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

`.ui-buttons-outside` to keep buttons off the content.

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
        <button class="ui-button ui-filled">Choose Basic</button>
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
        <button class="ui-button ui-filled">Contact sales</button>
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
        <button class="ui-button ui-filled">Choose Pro</button>
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
        <button class="ui-button ui-filled">Choose Team</button>
      </div>
    </div>
  </li>
</ul>
```

## Custom buttons

`--_button-prev-icon` and `--_button-next-icon` for custom icons, `--_button-icon-size` to scale them.

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
    --_button-next-icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='white' d='M8.293 4.293a1 1 0 0 0 0 1.414L14.586 12l-6.293 6.293a1 1 0 1 0 1.414 1.414l7-7a1 1 0 0 0 0-1.414l-7-7a1 1 0 0 0-1.414 0'/%3E%3C/svg%3E");
    --_button-prev-icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='white' d='M15.707 4.293a1 1 0 0 1 0 1.414L9.414 12l6.293 6.293a1 1 0 0 1-1.414 1.414l-7-7a1 1 0 0 1 0-1.414l7-7a1 1 0 0 1 1.414 0'/%3E%3C/svg%3E");
  }
</style>
```

## Accessibility

Announces item position. Buttons and markers are named.

## API

| Type           | Modifiers             | Default | Description                           |
| -------------- | --------------------- | ------- | ------------------------------------- |
| Part           | `ul.ui-carousel`      | -       | The scroller. Needs an `aria-label`.  |
| Children       | `li`                  | -       | The items.                            |
| Alignment      | `.ui-align-center`    | default | Where items snap.                     |
| Buttons        | `.ui-with-buttons`    | -       | Previous and next buttons.            |
| Buttons        | `.ui-buttons-outside` | -       | Buttons beside the items.             |
| Markers        | `.ui-with-markers`    | -       | One marker per item, after the list.  |
| Peek           | `.ui-peek`            | -       | Shows part of the neighbouring items. |
| Items per view | `--_per-view`         | `1`     | Number of visible items.              |

## Browser support

- Chromium: Full support Supported since v151.
- Firefox: Partial support Missing: scroll-buttons, scroll-markers.
- Safari: Partial support Missing: scroll-buttons, scroll-markers.

See also the [full browser support guide](https://open-props-ui.netlify.app/html/guide/browser-support.md).

## Installation

- `opui-css/css/components/carousel.css`

