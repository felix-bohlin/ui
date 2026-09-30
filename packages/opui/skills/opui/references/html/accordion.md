# Accordion

Let's you show and hide stuff. Comes with a chevron marker, check out how to add your own [custom marker](#custom-marker).

## Basics

```html
<details class="ui-accordion ui-card ui-icon-rotate">
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
<details class="ui-accordion ui-card ui-icon-rotate">
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
<details class="ui-accordion ui-card ui-icon-rotate ui-elevated">
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
<details class="ui-accordion ui-card ui-icon-rotate ui-outlined">
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
<details class="ui-accordion ui-card ui-icon-rotate ui-tonal">
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
  <details class="ui-accordion ui-card ui-icon-rotate">
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
  <details class="ui-accordion ui-card ui-icon-rotate">
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
  <details class="ui-accordion ui-card ui-icon-rotate">
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

Set the `name` prop to allow only one accordion in a group to be open at a time.

```html
<div class="ui-card ui-outlined" role="group">
  <details class="ui-accordion ui-card ui-icon-rotate" name="example-group">
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
  <details class="ui-accordion ui-card ui-icon-rotate" name="example-group">
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
  <details class="ui-accordion ui-card ui-icon-rotate" name="example-group">
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

Include interactive elements in the header by using the `.ui-actions` class.

```html
<details open class="ui-accordion ui-card ui-icon-rotate ui-elevated">
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
<details class="ui-accordion ui-card ui-icon-rotate ui-outlined">
  <summary id="summary1" aria-controls="content1">
    Custom marker
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path fill="currentColor" d="M7 10l5 5 5-5z" />
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

## Icon animation

Add `.ui-icon-flip`, `.ui-icon-rotate` or `.ui-icon-turn` to the `<details>` element to animate the marker when the accordion opens.

```html
<details class="ui-accordion ui-card ui-icon-flip ui-outlined">
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


<details class="ui-accordion ui-card ui-icon-rotate ui-outlined">
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


<details class="ui-accordion ui-card ui-icon-turn ui-outlined">
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

## Anatomy

1. `<details class="ui-accordion">`: a wrapper for the accordion
2. `<summary>`: a wrapper for the accordion header
3. `& > .ui-content` (optional): a wrapper for the accordion content
4. `& > .ui-actions` (optional): a wrapper that groups a set of buttons

```html
<details class="ui-accordion ui-card ui-icon-rotate anatomy" open>
  <!-- Summary -->
  <summary id="summary-1" aria-controls="content-1">
    Accordion title<svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M4.293 8.293a1 1 0 0 1 1.414 0L12 14.586l6.293-6.293a1 1 0 1 1 1.414 1.414l-7 7a1 1 0 0 1-1.414 0l-7-7a1 1 0 0 1 0-1.414"
      ></path>
    </svg>
  </summary>
  <!-- Content -->
  <div
    id="content-1"
    class="ui-content"
    role="region"
    aria-labelledby="summary-1"
  >
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
      nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis
      neque ante id justo. Nam tempor euismod nisi ac ornare. Pellentesque id
      sapien lacinia, venenatis est aliquam, dignissim elit. Suspendisse
      potenti. Cras ut ante in libero tempus sodales sed quis dolor.
    </p>
  </div>
  <!-- Actions -->
  <div class="ui-actions">
    <button class="ui-button">Cancel</button
    ><button class="ui-button">Agree</button>
  </div>
</details>
```

## API

| Type      | Modifiers                                               | Default    | Description                                                                                                             |
| --------- | ------------------------------------------------------- | ---------- | ----------------------------------------------------------------------------------------------------------------------- |
| Accordion | `details.ui-accordion`                                  | -          | The root element for the accordion. Requires the `.ui-accordion` class and optionally the `.ui-card` class for styling. |
| Group     | `.ui-card[role="group"]`                                | -          | Optional wrapper for accordion groups. To theme the entire group, apply the variant class to this element.              |
| Attribute | `name`                                                  | -          | The name of the accordion (used for grouping multiple accordions).                                                      |
| Icon      | `.ui-icon-flip`, `.ui-icon-rotate`, `.ui-icon-turn`     | -          | How the marker animates when the accordion opens.                                                                       |
| Part      | `& > summary`, `& > .ui-content`, `& > .ui-actions`     | -          | Optional wrappers for child content.                                                                                    |
| Variants  | `.ui-text`, `.ui-elevated`, `.ui-tonal`, `.ui-outlined` | `.ui-text` | The variant to use.                                                                                                     |

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

