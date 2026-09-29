# Accordion

Let's you show and hide stuff. Uses the native HTML arrow, check out how to add your own [custom marker](#custom-marker).

**Quick start**

### npm

```sh
npm install opui-css open-props
```

```css
@import "opui-css/css/components/accordion.css";
@import "opui-css/css/components/card.css";
```

### CDN

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/opui-css/dist/opui.css" />
```

### Copy the CSS

[Jump to source](#installation)

[Full setup guide](https://open-props-ui.netlify.app/html/guide/getting-started.md)

## Basics

```html
<details class="ui-accordion ui-card">
  <summary id="summary-id" aria-controls="content-id">Accordion</summary>
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
<details class="ui-accordion ui-card">
  <summary>Text</summary>
  <div class="ui-content">
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
      nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis
      neque ante id justo.
    </p>
  </div>
</details>


<!-- Elevated -->
<details class="ui-accordion ui-card ui-elevated">
  <summary>Elevated</summary>
  <div class="ui-content">
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
      nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis
      neque ante id justo.
    </p>
  </div>
</details>


<!-- Outlined -->
<details class="ui-accordion ui-card ui-outlined">
  <summary>Outlined</summary>
  <div class="ui-content">
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
      nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis
      neque ante id justo.
    </p>
  </div>
</details>


<!-- Tonal -->
<details class="ui-accordion ui-card ui-tonal">
  <summary>Tonal</summary>
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
  <details class="ui-accordion ui-card">
    <summary>Accordion title</summary>
    <div class="ui-content">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
        sodales, nulla sit amet porttitor rhoncus, lacus ex vestibulum libero,
        ac mollis neque ante id justo.
      </p>
    </div>
  </details>
  <details class="ui-accordion ui-card">
    <summary>Accordion title</summary>
    <div class="ui-content">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
        sodales, nulla sit amet porttitor rhoncus, lacus ex vestibulum libero,
        ac mollis neque ante id justo.
      </p>
    </div>
  </details>
  <details class="ui-accordion ui-card">
    <summary>Accordion title</summary>
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
  <details class="ui-accordion ui-card" name="example-group">
    <summary>Accordion title</summary>
    <div class="ui-content">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
        sodales, nulla sit amet porttitor rhoncus, lacus ex vestibulum libero,
        ac mollis neque ante id justo.
      </p>
    </div>
  </details>
  <details class="ui-accordion ui-card" name="example-group">
    <summary>Accordion title</summary>
    <div class="ui-content">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
        sodales, nulla sit amet porttitor rhoncus, lacus ex vestibulum libero,
        ac mollis neque ante id justo.
      </p>
    </div>
  </details>
  <details class="ui-accordion ui-card" name="example-group">
    <summary>Accordion title</summary>
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
<details open class="ui-accordion ui-card ui-elevated">
  <summary id="summary1" aria-controls="content1">
    Accordion with actions
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

Replace the default marker by adding an SVG inside the `summary`.

```html
<details class="ui-accordion ui-card ui-outlined">
  <summary id="summary1" aria-controls="content1">
    Custom marker
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
      neque ante id justo. Nam tempor euismod nisi ac ornare. Pellentesque id
      sapien lacinia, venenatis est aliquam, dignissim elit. Suspendisse
      potenti. Cras ut ante in libero tempus sodales sed quis dolor.
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
<details class="ui-accordion ui-card anatomy" open>
  <!-- Summary -->
  <summary id="summary-2" aria-controls="content-2">Accordion title</summary>
  <!-- Content -->
  <div
    id="content-2"
    class="ui-content"
    role="region"
    aria-labelledby="summary-2"
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
| Part      | `& > summary`, `& > .ui-content`, `& > .ui-actions`     | -          | Optional wrappers for child content.                                                                                    |
| Variants  | `.ui-text`, `.ui-elevated`, `.ui-tonal`, `.ui-outlined` | `.ui-text` | The variant to use.                                                                                                     |

## Browser support

- Chromium: Full support Supported since v131.
- Firefox: Partial support Missing: interpolate-size.
- Safari: Partial support Missing: interpolate-size.

See also the [full browser support guide](https://open-props-ui.netlify.app/html/guide/browser-support.md).

## Source

### Dependencies

- [Card](https://open-props-ui.netlify.app/html/components/card.md)

- `opui-css/css/components/accordion.css`
- `opui-css/css/components/card.css`

