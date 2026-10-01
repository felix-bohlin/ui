# Accordion

Let's you show and hide stuff. Comes with a chevron marker, check out how to add your own [custom marker](#custom-marker).

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

  The marker. Astro and Vue render a chevron by default.

- `.ui-content`

  The collapsible content.

- `.ui-actions`

  A group of actions, such as buttons.

## Basics

```html
<details class="ui-accordion ui-card ui-marker-rotate">
  <summary id="summary-id" aria-controls="content-id">
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
  <div
    id="content-id"
    class="ui-content"
    role="region"
    aria-labelledby="summary-id"
  >
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

Add one of the variant classes (`.ui-card`, `.ui-outlined`, `.ui-elevated`, `.ui-tonal`) to the `<details>` element to change how it looks.

```html
<!-- Text (default) -->
<details class="ui-accordion ui-card ui-marker-rotate">
  <summary id="accordion-text-summary" aria-controls="accordion-text-content">
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
  <div
    id="accordion-text-content"
    class="ui-content"
    role="region"
    aria-labelledby="accordion-text-summary"
  >
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
      nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis
      neque ante id justo.
    </p>
  </div>
</details>


<!-- Elevated -->
<details class="ui-accordion ui-card ui-marker-rotate ui-elevated">
  <summary
    id="accordion-elevated-summary"
    aria-controls="accordion-elevated-content"
  >
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
  <div
    id="accordion-elevated-content"
    class="ui-content"
    role="region"
    aria-labelledby="accordion-elevated-summary"
  >
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
      nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis
      neque ante id justo.
    </p>
  </div>
</details>


<!-- Outlined -->
<details class="ui-accordion ui-card ui-marker-rotate ui-outlined">
  <summary
    id="accordion-outlined-summary"
    aria-controls="accordion-outlined-content"
  >
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
  <div
    id="accordion-outlined-content"
    class="ui-content"
    role="region"
    aria-labelledby="accordion-outlined-summary"
  >
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
      nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis
      neque ante id justo.
    </p>
  </div>
</details>


<!-- Tonal -->
<details class="ui-accordion ui-card ui-marker-rotate ui-tonal">
  <summary id="accordion-tonal-summary" aria-controls="accordion-tonal-content">
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
  <div
    id="accordion-tonal-content"
    class="ui-content"
    role="region"
    aria-labelledby="accordion-tonal-summary"
  >
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
    <summary
      id="accordion-group-1-summary"
      aria-controls="accordion-group-1-content"
    >
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
    <div
      id="accordion-group-1-content"
      class="ui-content"
      role="region"
      aria-labelledby="accordion-group-1-summary"
    >
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
        sodales, nulla sit amet porttitor rhoncus, lacus ex vestibulum libero,
        ac mollis neque ante id justo.
      </p>
    </div>
  </details>
  <details class="ui-accordion ui-card ui-marker-rotate">
    <summary
      id="accordion-group-2-summary"
      aria-controls="accordion-group-2-content"
    >
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
    <div
      id="accordion-group-2-content"
      class="ui-content"
      role="region"
      aria-labelledby="accordion-group-2-summary"
    >
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
        sodales, nulla sit amet porttitor rhoncus, lacus ex vestibulum libero,
        ac mollis neque ante id justo.
      </p>
    </div>
  </details>
  <details class="ui-accordion ui-card ui-marker-rotate">
    <summary
      id="accordion-group-3-summary"
      aria-controls="accordion-group-3-content"
    >
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
    <div
      id="accordion-group-3-content"
      class="ui-content"
      role="region"
      aria-labelledby="accordion-group-3-summary"
    >
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

Set the `name` prop to allow only one accordion in a group to be open at a time.

```html
<div class="ui-card ui-outlined" role="group">
  <details class="ui-accordion ui-card ui-marker-rotate" name="example-group">
    <summary
      id="accordion-single-1-summary"
      aria-controls="accordion-single-1-content"
    >
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
    <div
      id="accordion-single-1-content"
      class="ui-content"
      role="region"
      aria-labelledby="accordion-single-1-summary"
    >
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
        sodales, nulla sit amet porttitor rhoncus, lacus ex vestibulum libero,
        ac mollis neque ante id justo.
      </p>
    </div>
  </details>
  <details class="ui-accordion ui-card ui-marker-rotate" name="example-group">
    <summary
      id="accordion-single-2-summary"
      aria-controls="accordion-single-2-content"
    >
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
    <div
      id="accordion-single-2-content"
      class="ui-content"
      role="region"
      aria-labelledby="accordion-single-2-summary"
    >
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
        sodales, nulla sit amet porttitor rhoncus, lacus ex vestibulum libero,
        ac mollis neque ante id justo.
      </p>
    </div>
  </details>
  <details class="ui-accordion ui-card ui-marker-rotate" name="example-group">
    <summary
      id="accordion-single-3-summary"
      aria-controls="accordion-single-3-content"
    >
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
    <div
      id="accordion-single-3-content"
      class="ui-content"
      role="region"
      aria-labelledby="accordion-single-3-summary"
    >
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

Include interactive elements in the header by using the `.ui-actions` class.

```html
<details open class="ui-accordion ui-card ui-marker-rotate ui-elevated">
  <summary id="summary1" aria-controls="content1">
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
  <div
    id="content1"
    class="ui-content"
    role="region"
    aria-labelledby="summary1"
  >
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
      nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis
      neque ante id justo. Nam tempor euismod nisi ac ornare.
    </p>
  </div>
  <div class="ui-actions">
    <button class="ui-button">Cancel</button>
    <button class="ui-button">Agree</button>
  </div>
</details>
```

## Custom marker

Replace the SVG inside the `summary` to change the marker. Leave it out to fall back to the native arrow.

```html
<details class="ui-accordion ui-card ui-marker-rotate ui-outlined">
  <summary id="summary1" aria-controls="content1">
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
  <div
    id="content1"
    class="ui-content"
    role="region"
    aria-labelledby="summary1"
  >
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
  <summary id="summary1" aria-controls="content1">
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
  <div
    id="content1"
    class="ui-content"
    role="region"
    aria-labelledby="summary1"
  >
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
      nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis
      neque ante id justo.
    </p>
  </div>
</details>


<details class="ui-accordion ui-card ui-marker-rotate ui-outlined">
  <summary id="summary2" aria-controls="content2">
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
  <div
    id="content2"
    class="ui-content"
    role="region"
    aria-labelledby="summary2"
  >
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
      nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis
      neque ante id justo.
    </p>
  </div>
</details>


<details class="ui-accordion ui-card ui-marker-turn ui-outlined">
  <summary id="summary3" aria-controls="content3">
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
  <div
    id="content3"
    class="ui-content"
    role="region"
    aria-labelledby="summary3"
  >
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
      nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis
      neque ante id justo.
    </p>
  </div>
</details>
```

## Accessibility

The [WAI-ARIA guidelines](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/) for accordions recommend:

- `summary` element

  - adding id and aria-controls
  - adding aria-expanded (if using JS)

- content wrapper
  - adding id, role and aria-labelledby

## API

### Accordion API

| Type     | Modifiers                                                 | Default             | Description                                                  |
| -------- | --------------------------------------------------------- | ------------------- | ------------------------------------------------------------ |
| Grouping | `[name]`                                                  | -                   | Groups accordions so only one of them can be open at a time. |
| Marker   | `.ui-marker-flip`, `.ui-marker-rotate`, `.ui-marker-turn` | `.ui-marker-rotate` | How the marker animates when the accordion opens.            |
| State    | `[open]`                                                  | -                   | Whether the accordion is open.                               |
| Variants | default, `.ui-elevated`, `.ui-outlined`, `.ui-tonal`      | default             | The variant to use.                                          |

#### Parts

| Part                   | Description                                            |
| ---------------------- | ------------------------------------------------------ |
| `details.ui-accordion` | Container element.                                     |
| `<summary>`            | The always visible header.                             |
| `<svg>`                | The marker. Astro and Vue render a chevron by default. |
| `.ui-content`          | The collapsible content.                               |
| `.ui-actions`          | A group of actions, such as buttons.                   |

Add `.ui-card` to the root for card styles. Group accordions in a `.ui-card[role="group"]` and set the variant on it to theme the whole group.

## Browser support

- Chromium: Full support Supported since v131.
- Firefox: Partial support Missing: interpolate-size.
- Safari: Partial support Missing: interpolate-size.

See also the [full browser support guide](https://open-props-ui.netlify.app/html/guide/browser-support.md).

## Installation

### Dependencies

- [Card](https://open-props-ui.netlify.app/html/components/card.md)

- `opui-css/css/components/accordion.css`
- `opui-css/css/components/card.css`

