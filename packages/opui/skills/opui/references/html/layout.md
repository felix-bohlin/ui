# Layout

Four classes for the space between components: `.ui-flow`, `.ui-cluster`, `.ui-grid` and `.ui-container`. Put them on wrapper elements, such as `div`, `section` or `ul`. They sit in the `utils` layer, so on a component they replace its own layout. Their gaps come from the [`--space-*` scale](https://open-props-ui.netlify.app/html/guide/theming.md#spacing), so they follow `--space-scale`.

## Flow

`.ui-flow` stacks its children in a column with even space between them.

```html
<div class="ui-flow">
  <div class="ui-card ui-outlined">
    <div class="ui-content">First</div>
  </div>
  <div class="ui-card ui-outlined">
    <div class="ui-content">Second</div>
  </div>
  <div class="ui-card ui-outlined">
    <div class="ui-content">Third</div>
  </div>
</div>
```

## Cluster

`.ui-cluster` puts its children in a row, centered on one line, and wraps them when they run out of room. Set `--_justify-content` to push them to the end or spread them out.

```html
<div class="ui-cluster">
  <button type="button" class="ui-button ui-filled ui-primary">Save</button>
  <button type="button" class="ui-button ui-outlined">Preview</button>
  <button type="button" class="ui-button ui-outlined">Share</button>
  <button type="button" class="ui-button">Cancel</button>
</div>
```

## Grid

`.ui-grid` fills the width with as many columns as fit at `--_min-inline-size` (`16rem` by default), and wraps the rest. No breakpoints: it follows the space it has.

```html
<div class="ui-grid" style="--_min-inline-size: 10rem">
  <div class="ui-card ui-outlined">
    <div class="ui-content">One</div>
  </div>
  <div class="ui-card ui-outlined">
    <div class="ui-content">Two</div>
  </div>
  <div class="ui-card ui-outlined">
    <div class="ui-content">Three</div>
  </div>
  <div class="ui-card ui-outlined">
    <div class="ui-content">Four</div>
  </div>
  <div class="ui-card ui-outlined">
    <div class="ui-content">Five</div>
  </div>
  <div class="ui-card ui-outlined">
    <div class="ui-content">Six</div>
  </div>
</div>
```

## Gap

The size classes set the gap of `.ui-flow`, `.ui-cluster` and `.ui-grid`: `.ui-x-small` is `--space-1`, `.ui-small` `--space-2`, the default `--space-3` and `.ui-large` `--space-5`. For anything else, set `--_gap`.

```html
<div class="ui-flow">
  <div class="ui-cluster ui-x-small">
    <button type="button" class="ui-button ui-outlined">One</button>
    <button type="button" class="ui-button ui-outlined">Two</button>
    <button type="button" class="ui-button ui-outlined">Three</button>
  </div>
  <div class="ui-cluster ui-small">
    <button type="button" class="ui-button ui-outlined">One</button>
    <button type="button" class="ui-button ui-outlined">Two</button>
    <button type="button" class="ui-button ui-outlined">Three</button>
  </div>
  <div class="ui-cluster">
    <button type="button" class="ui-button ui-outlined">One</button>
    <button type="button" class="ui-button ui-outlined">Two</button>
    <button type="button" class="ui-button ui-outlined">Three</button>
  </div>
  <div class="ui-cluster ui-large">
    <button type="button" class="ui-button ui-outlined">One</button>
    <button type="button" class="ui-button ui-outlined">Two</button>
    <button type="button" class="ui-button ui-outlined">Three</button>
  </div>
</div>
```

## Container

`.ui-container` centers its content, caps its width at `--_max-inline-size` (`72rem` by default) and keeps `--_padding-inline` from the edges. Combine the classes to lay out a whole section:

```html
<div class="ui-container" style="--_max-inline-size: 40rem">
  <div class="ui-flow ui-large">
    <div class="ui-flow ui-x-small">
      <h3 class="ui-h4">Team</h3>
      <p>Invite people to work on this project.</p>
    </div>
    <div class="ui-grid" style="--_min-inline-size: 10rem">
      <div class="ui-card ui-tonal">
        <div class="ui-content">Design</div>
      </div>
      <div class="ui-card ui-tonal">
        <div class="ui-content">Engineering</div>
      </div>
      <div class="ui-card ui-tonal">
        <div class="ui-content">Support</div>
      </div>
    </div>
    <div class="ui-cluster" style="--_justify-content: flex-end">
      <button type="button" class="ui-button">Cancel</button>
      <button type="button" class="ui-button ui-filled ui-primary">
        Invite
      </button>
    </div>
  </div>
</div>
```

## API

| Type      | Modifiers                                        | Default   | Description                                                             |
| --------- | ------------------------------------------------ | --------- | ----------------------------------------------------------------------- |
| Cluster   | `.ui-cluster`                                    | -         | A wrapping row with its children centered on one line.                  |
| Container | `.ui-container`                                  | -         | Centers its content and caps its width.                                 |
| Flow      | `.ui-flow`                                       | -         | A column with even space between its children.                          |
| Grid      | `.ui-grid`                                       | -         | Columns that fill the width and wrap.                                   |
| Sizes     | default, `.ui-large`, `.ui-small`, `.ui-x-small` | `default` | The space between children of `.ui-flow`, `.ui-cluster` and `.ui-grid`. |

### Parts

| Part                                             | Description                                   |
| ------------------------------------------------ | --------------------------------------------- |
| `.ui-flow, .ui-cluster, .ui-grid, .ui-container` | Any element. The classes only set its layout. |

### CSS variables

| Variable    | Default                                    | Description                                                  |
| ----------- | ------------------------------------------ | ------------------------------------------------------------ |
| `--space-1` | `calc(var(--size-1) * var(--space-scale))` | Spacing step 1: Open Props `--size-1` times `--space-scale`. |
| `--space-2` | `calc(var(--size-2) * var(--space-scale))` | Spacing step 2: Open Props `--size-2` times `--space-scale`. |
| `--space-3` | `calc(var(--size-3) * var(--space-scale))` | Spacing step 3: Open Props `--size-3` times `--space-scale`. |
| `--space-4` | `calc(var(--size-4) * var(--space-scale))` | Spacing step 4: Open Props `--size-4` times `--space-scale`. |
| `--space-5` | `calc(var(--size-5) * var(--space-scale))` | Spacing step 5: Open Props `--size-5` times `--space-scale`. |

This component uses these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md).

## Component properties

Set these on the component itself, inline or in your own CSS. Inputs are the knobs. Outputs are derived from the inputs and the current state, so overriding one fixes it in every state. [Customizing](https://open-props-ui.netlify.app/html/guide/customizing.md#component-properties) has examples.

| Property             | Kind  | Description                                                                                                               |
| -------------------- | ----- | ------------------------------------------------------------------------------------------------------------------------- |
| `--_gap`             | Input | Space between the children of `.ui-flow`, `.ui-cluster` and `.ui-grid`. Defaults to `--space-3`, set by the size classes. |
| `--_justify-content` | Input | How `.ui-cluster` distributes its children along the row, such as `flex-end` or `space-between`.                          |
| `--_max-inline-size` | Input | Maximum width of `.ui-container`.                                                                                         |
| `--_min-inline-size` | Input | Narrowest column of `.ui-grid`. Columns are added while they fit at this width.                                           |
| `--_padding-inline`  | Input | Inline padding of `.ui-container`. Defaults to `--space-4`.                                                               |

## Installation

- `opui-css/css/components/layout.css`

## Changelog

### What's new

- New: [`.ui-flow`](#flow), [`.ui-cluster`](#cluster), [`.ui-grid`](#grid) and [`.ui-container`](#container) lay out the space between components.
