# Accordion

Lets you show and hide content. Comes with a chevron marker, check out how to add your own [custom marker](#custom-marker).

### What's new

- [Marker animation](#marker-animation) with `.ui-marker-flip`, `.ui-marker-rotate` or `.ui-marker-turn`.
- Breaking: markers only animate with a marker class. Add `.ui-marker-rotate` to keep the previous rotation.

## Anatomy

Accordion title

Explain more about the topic shown in the summary through supporting text.

- `details.ui-accordion`

  Container element.

- `<summary>`

  The always visible header.

- `<svg>`

  The marker. Astro, Svelte and Vue render a chevron by default.

- `.ui-content`

  The collapsible content.

- `.ui-actions`

  A group of actions, such as buttons.

## Basics

```html
<details class="ui-accordion ui-card ui-marker-rotate">
  <summary>
    Accordion
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M4.293 8.293a1 1 0 0 1 1.414 0L12 14.586l6.293-6.293a1 1 0 1 1 1.414 1.414l-7 7a1 1 0 0 1-1.414 0l-7-7a1 1 0 0 1 0-1.414"
      />
    </svg>
  </summary>
  <div class="ui-content">
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
      nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis
      neque ante id justo. Nam tempor euismod nisi ac ornare. Pellentesque id
      sapien lacinia, venenatis est aliquam, dignissim elit. Suspendisse
      potenti. Cras ut ante in libero tempus sodales sed quis dolor.
    </p>
  </div>
</details>
```

## Variants

Add one of the variant classes (`.ui-outlined`, `.ui-elevated`, `.ui-tonal`) to the `<details>` element to change how it looks. Add `.ui-card` for the card styles.

```html
<!-- Text (default) -->
<details class="ui-accordion ui-card ui-marker-rotate">
  <summary>
    Text
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M4.293 8.293a1 1 0 0 1 1.414 0L12 14.586l6.293-6.293a1 1 0 1 1 1.414 1.414l-7 7a1 1 0 0 1-1.414 0l-7-7a1 1 0 0 1 0-1.414"
      />
    </svg>
  </summary>
  <div class="ui-content">
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
      nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis
      neque ante id justo.
    </p>
  </div>
</details>


<!-- Elevated -->
<details class="ui-accordion ui-card ui-marker-rotate ui-elevated">
  <summary>
    Elevated
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M4.293 8.293a1 1 0 0 1 1.414 0L12 14.586l6.293-6.293a1 1 0 1 1 1.414 1.414l-7 7a1 1 0 0 1-1.414 0l-7-7a1 1 0 0 1 0-1.414"
      />
    </svg>
  </summary>
  <div class="ui-content">
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
      nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis
      neque ante id justo.
    </p>
  </div>
</details>


<!-- Outlined -->
<details class="ui-accordion ui-card ui-marker-rotate ui-outlined">
  <summary>
    Outlined
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M4.293 8.293a1 1 0 0 1 1.414 0L12 14.586l6.293-6.293a1 1 0 1 1 1.414 1.414l-7 7a1 1 0 0 1-1.414 0l-7-7a1 1 0 0 1 0-1.414"
      />
    </svg>
  </summary>
  <div class="ui-content">
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
      nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis
      neque ante id justo.
    </p>
  </div>
</details>


<!-- Tonal -->
<details class="ui-accordion ui-card ui-marker-rotate ui-tonal">
  <summary>
    Tonal
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M4.293 8.293a1 1 0 0 1 1.414 0L12 14.586l6.293-6.293a1 1 0 1 1 1.414 1.414l-7 7a1 1 0 0 1-1.414 0l-7-7a1 1 0 0 1 0-1.414"
      />
    </svg>
  </summary>
  <div class="ui-content">
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
      nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis
      neque ante id justo.
    </p>
  </div>
</details>
```

## Accordion group

Group multiple accordions by wrapping them in a `.ui-card` element with `role="group"`. To theme the entire group, apply the variant class to the parent container.

```html
<div class="ui-card ui-outlined" role="group">
  <details class="ui-accordion ui-card ui-marker-rotate">
    <summary>
      Accordion title
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M4.293 8.293a1 1 0 0 1 1.414 0L12 14.586l6.293-6.293a1 1 0 1 1 1.414 1.414l-7 7a1 1 0 0 1-1.414 0l-7-7a1 1 0 0 1 0-1.414"
        />
      </svg>
    </summary>
    <div class="ui-content">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
        sodales, nulla sit amet porttitor rhoncus, lacus ex vestibulum libero,
        ac mollis neque ante id justo.
      </p>
    </div>
  </details>
  <details class="ui-accordion ui-card ui-marker-rotate">
    <summary>
      Accordion title
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M4.293 8.293a1 1 0 0 1 1.414 0L12 14.586l6.293-6.293a1 1 0 1 1 1.414 1.414l-7 7a1 1 0 0 1-1.414 0l-7-7a1 1 0 0 1 0-1.414"
        />
      </svg>
    </summary>
    <div class="ui-content">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
        sodales, nulla sit amet porttitor rhoncus, lacus ex vestibulum libero,
        ac mollis neque ante id justo.
      </p>
    </div>
  </details>
  <details class="ui-accordion ui-card ui-marker-rotate">
    <summary>
      Accordion title
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M4.293 8.293a1 1 0 0 1 1.414 0L12 14.586l6.293-6.293a1 1 0 1 1 1.414 1.414l-7 7a1 1 0 0 1-1.414 0l-7-7a1 1 0 0 1 0-1.414"
        />
      </svg>
    </summary>
    <div class="ui-content">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
        sodales, nulla sit amet porttitor rhoncus, lacus ex vestibulum libero,
        ac mollis neque ante id justo.
      </p>
    </div>
  </details>
</div>
```

### Mutually exclusive

Set the same `name` attribute on each `<details>` element to allow only one of them to be open at a time.

```html
<div class="ui-card ui-outlined" role="group">
  <details class="ui-accordion ui-card ui-marker-rotate" name="example-group">
    <summary>
      Accordion title
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M4.293 8.293a1 1 0 0 1 1.414 0L12 14.586l6.293-6.293a1 1 0 1 1 1.414 1.414l-7 7a1 1 0 0 1-1.414 0l-7-7a1 1 0 0 1 0-1.414"
        />
      </svg>
    </summary>
    <div class="ui-content">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
        sodales, nulla sit amet porttitor rhoncus, lacus ex vestibulum libero,
        ac mollis neque ante id justo.
      </p>
    </div>
  </details>
  <details class="ui-accordion ui-card ui-marker-rotate" name="example-group">
    <summary>
      Accordion title
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M4.293 8.293a1 1 0 0 1 1.414 0L12 14.586l6.293-6.293a1 1 0 1 1 1.414 1.414l-7 7a1 1 0 0 1-1.414 0l-7-7a1 1 0 0 1 0-1.414"
        />
      </svg>
    </summary>
    <div class="ui-content">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
        sodales, nulla sit amet porttitor rhoncus, lacus ex vestibulum libero,
        ac mollis neque ante id justo.
      </p>
    </div>
  </details>
  <details class="ui-accordion ui-card ui-marker-rotate" name="example-group">
    <summary>
      Accordion title
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M4.293 8.293a1 1 0 0 1 1.414 0L12 14.586l6.293-6.293a1 1 0 1 1 1.414 1.414l-7 7a1 1 0 0 1-1.414 0l-7-7a1 1 0 0 1 0-1.414"
        />
      </svg>
    </summary>
    <div class="ui-content">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
        sodales, nulla sit amet porttitor rhoncus, lacus ex vestibulum libero,
        ac mollis neque ante id justo.
      </p>
    </div>
  </details>
</div>
```

## Actions

Add buttons or other interactive elements below the content in a `.ui-actions` element, after `.ui-content`.

```html
<details open class="ui-accordion ui-card ui-marker-rotate ui-elevated">
  <summary>
    Accordion with actions
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M4.293 8.293a1 1 0 0 1 1.414 0L12 14.586l6.293-6.293a1 1 0 1 1 1.414 1.414l-7 7a1 1 0 0 1-1.414 0l-7-7a1 1 0 0 1 0-1.414"
      />
    </svg>
  </summary>
  <div class="ui-content">
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
      nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis
      neque ante id justo. Nam tempor euismod nisi ac ornare.
    </p>
  </div>
  <div class="ui-actions">
    <button type="button" class="ui-button">Cancel</button>
    <button type="button" class="ui-button">Agree</button>
  </div>
</details>
```

## Custom marker

Replace the SVG inside the `summary` to change the marker. Leave it out to fall back to the native arrow.

```html
<details class="ui-accordion ui-card ui-marker-rotate ui-outlined">
  <summary>
    Custom marker
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <!-- Icon from Fluent UI System Icons by Microsoft Corporation - https://github.com/microsoft/fluentui-system-icons/blob/main/LICENSE -->
      <path
        fill="currentColor"
        d="M12 3.25a.75.75 0 0 1 .75.75v7.25H20a.75.75 0 0 1 0 1.5h-7.25V20a.75.75 0 0 1-1.5 0v-7.25H4a.75.75 0 0 1 0-1.5h7.25V4a.75.75 0 0 1 .75-.75"
      />
    </svg>
  </summary>
  <div class="ui-content">
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
      nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis
      neque ante id justo. Nam tempor euismod nisi ac ornare. Pellentesque id
      sapien lacinia, venenatis est aliquam, dignissim elit. Suspendisse
      potenti. Cras ut ante in libero tempus sodales sed quis dolor.
    </p>
  </div>
</details>
```

## Marker animation

Add `.ui-marker-flip`, `.ui-marker-rotate` or `.ui-marker-turn` to the `<details>` element to animate the marker when the accordion opens.

```html
<details class="ui-accordion ui-card ui-marker-flip ui-outlined">
  <summary>
    Flip
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M4.293 8.293a1 1 0 0 1 1.414 0L12 14.586l6.293-6.293a1 1 0 1 1 1.414 1.414l-7 7a1 1 0 0 1-1.414 0l-7-7a1 1 0 0 1 0-1.414"
      />
    </svg>
  </summary>
  <div class="ui-content">
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
      nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis
      neque ante id justo.
    </p>
  </div>
</details>


<details class="ui-accordion ui-card ui-marker-rotate ui-outlined">
  <summary>
    Rotate
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M4.293 8.293a1 1 0 0 1 1.414 0L12 14.586l6.293-6.293a1 1 0 1 1 1.414 1.414l-7 7a1 1 0 0 1-1.414 0l-7-7a1 1 0 0 1 0-1.414"
      />
    </svg>
  </summary>
  <div class="ui-content">
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
      nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis
      neque ante id justo.
    </p>
  </div>
</details>


<details class="ui-accordion ui-card ui-marker-turn ui-outlined">
  <summary>
    Turn
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M8.293 19.707a1 1 0 0 1 0-1.414L14.586 12 8.293 5.707a1 1 0 1 1 1.414-1.414l7 7a1 1 0 0 1 0 1.414l-7 7a1 1 0 0 1-1.414 0"
      />
    </svg>
  </summary>
  <div class="ui-content">
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
      nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis
      neque ante id justo.
    </p>
  </div>
</details>
```

## Accessibility

- Accordions are `<details>` and `<summary>`. The browser announces the summary with its expanded or collapsed state and toggles it with `Enter` and `Space`, so no ARIA is needed.
- In supporting browsers, find in page also searches closed accordions and opens the one with the match.
- Don't add `role="region"` to the content. Every accordion becomes a landmark, which crowds the landmark list on pages with many of them.

## API

### Accordion API

| Type     | Modifiers                                                 | Default | Description                                                  |
| -------- | --------------------------------------------------------- | ------- | ------------------------------------------------------------ |
| Grouping | `[name]`                                                  | -       | Groups accordions so only one of them can be open at a time. |
| Marker   | `.ui-marker-flip`, `.ui-marker-rotate`, `.ui-marker-turn` | -       | How the marker animates when the accordion opens.            |
| State    | `[open]`                                                  | -       | Whether the accordion is open.                               |
| Variants | default, `.ui-elevated`, `.ui-outlined`, `.ui-tonal`      | default | The variant to use.                                          |

#### Parts

| Part                   | Description                                                    |
| ---------------------- | -------------------------------------------------------------- |
| `details.ui-accordion` | Container element.                                             |
| `<summary>`            | The always visible header.                                     |
| `<svg>`                | The marker. Astro, Svelte and Vue render a chevron by default. |
| `.ui-content`          | The collapsible content.                                       |
| `.ui-actions`          | A group of actions, such as buttons.                           |

#### CSS variables

| Variable             | Default                                     | Description                                                                                                                |
| -------------------- | ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `--border-color`     | `light-dark(var(--gray-4), var(--gray-12))` | Default border color for cards, lists, tables and dividers.                                                                |
| `--border-radius`    | `var(--size-2)`                             | Default corner radius for cards, callouts, tables and accordions.                                                          |
| `--border-width`     | `1px`                                       | Default border width for components that draw a border.                                                                    |
| `--duration`         | `0.2s`                                      | Default transition duration. Multiplied by `--motion`.                                                                     |
| `--ease`             | `ease`                                      | Default easing for transitions.                                                                                            |
| `--focus-ring-width` | `2px`                                       | Width of the focus ring.                                                                                                   |
| `--font-weight-bold` | `var(--font-weight-7)`                      | Font weight for headings, buttons and terms.                                                                               |
| `--motion`           | `1`                                         | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. |
| `--surface-default`  | `light-dark(var(--gray-1), var(--gray-13))` | Page and card background.                                                                                                  |
| `--surface-elevated` | `light-dark(var(--gray-1), var(--gray-12))` | Background of elevated cards and accordions.                                                                               |
| `--surface-tonal`    | `light-dark(var(--gray-3), var(--gray-12))` | Background of tonal variants.                                                                                              |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md) for the full list.

Add `.ui-card` to the root for card styles. Group accordions in a `.ui-card[role="group"]` and set the variant on it to theme the whole group.

## Under the hood

1. Details

   - `<details>` and `<summary>`: keyboard, focus and state for free
   - Opens and closes instantly

2. Animate to auto

   - `interpolate-size: allow-keywords` lets `block-size` transition to `auto`
   - `::details-content` targets the hidden part
   - `allow-discrete` keeps the content visible until the close transition ends

3. Marker

   - `list-style: none` removes the native marker
   - Three marker animations: `flip`, `rotate`, `turn`
   - Individual transform properties (`rotate`, `scale`) transition independently

Step 1 of 3: Details

```css
.accordion > summary {
  cursor: pointer;
  font-weight: 700;
}
```

Step 2 of 3: Animate to auto

- [`content-visibility` ](https://webstatus.dev/features/content-visibility)(Newly available): Chrome 108+, Edge 108+, Firefox 130+, Safari 26+
- [`::details-content` ](https://webstatus.dev/features/details-content)(Newly available): Chrome 131+, Edge 131+, Firefox 143+, Safari 18.4+
- [`interpolate-size` ](https://webstatus.dev/features/interpolate-size)(Limited availability): Chrome 129+, Edge 129+, Firefox not supported, Safari not supported
- [`transition-behavior` ](https://webstatus.dev/features/transition-behavior)(Newly available): Chrome 117+, Edge 117+, Firefox 129+, Safari 17.4+

```css
.accordion {
  interpolate-size: allow-keywords;
}


.accordion::details-content {
  block-size: 0;
  opacity: 0;
  overflow-y: clip;
  transition:
    block-size 0.2s,
    content-visibility 0.2s allow-discrete,
    opacity 0.2s;
}


.accordion[open]::details-content {
  block-size: auto;
  opacity: 1;
}
```

Step 3 of 3: Marker

```css
.accordion > summary {
  align-items: center;
  display: flex;
  justify-content: space-between;
  list-style: none;
}


.accordion > summary::-webkit-details-marker {
  display: none;
}


.accordion > summary svg {
  transition:
    rotate 0.2s,
    scale 0.2s;
}


.marker-flip[open] > summary svg {
  scale: 1 -1;
}


.marker-rotate[open] > summary svg {
  rotate: 180deg;
}


.marker-turn[open] > summary svg {
  rotate: 90deg;
}
```

## Browser support

- Chromium: Full support Supported since v131.
- Firefox: Partial support Missing: interpolate-size.
- Safari: Partial support Missing: interpolate-size.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/html/guide/browser-support/?components=Accordion.md).

## Installation

### Dependencies

- [Card](https://open-props-ui.netlify.app/html/components/card.md)

- `opui-css/css/components/accordion.css`
- `opui-css/css/components/card.css`

