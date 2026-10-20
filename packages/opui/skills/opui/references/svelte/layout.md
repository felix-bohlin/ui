# Layout

Four classes for the space between components: `.ui-l-column`, `.ui-l-row`, `.ui-l-grid` and `.ui-l-container`. The `l-` marks a layout class. Put them on wrapper elements, such as `div`, `section` or `ul`. They sit in the `utils` layer, so on a component they replace its own layout. Their gaps come from the [`--space-*` scale](https://open-props-ui.netlify.app/svelte/guide/theming.md#spacing), so they follow `--ui-space-scale`.

## Column

`.ui-l-column` stacks its children in a column with even space between them.

```svelte
<script lang="ts">
  import { Card, CardContent } from "opui-css/svelte"
</script>

<div class="ui-l-column">
  <Card variant="outlined">
    <CardContent>First</CardContent>
  </Card>
  <Card variant="outlined">
    <CardContent>Second</CardContent>
  </Card>
  <Card variant="outlined">
    <CardContent>Third</CardContent>
  </Card>
</div>
```

## Row

`.ui-l-row` puts its children in a row, centered on one line, and wraps them when they run out of room. Set `--_justify-content` to push them to the end or spread them out.

```svelte
<script lang="ts">
  import { Button } from "opui-css/svelte"
</script>

<div class="ui-l-row">
  <Button color="primary" variant="filled">Save</Button>
  <Button variant="outlined">Preview</Button>
  <Button variant="outlined">Share</Button>
  <Button>Cancel</Button>
</div>
```

## Grid

`.ui-l-grid` fills the width with as many columns as fit at `--_min-inline-size` (`16rem` by default), and wraps the rest. No breakpoints: it follows the space it has.

```svelte
<script lang="ts">
  import { Card, CardContent } from "opui-css/svelte"
</script>

<div class="ui-l-grid" style="--_min-inline-size: 10rem">
  <Card variant="outlined">
    <CardContent>One</CardContent>
  </Card>
  <Card variant="outlined">
    <CardContent>Two</CardContent>
  </Card>
  <Card variant="outlined">
    <CardContent>Three</CardContent>
  </Card>
  <Card variant="outlined">
    <CardContent>Four</CardContent>
  </Card>
  <Card variant="outlined">
    <CardContent>Five</CardContent>
  </Card>
  <Card variant="outlined">
    <CardContent>Six</CardContent>
  </Card>
</div>
```

## Gap

The size classes set the gap of `.ui-l-column`, `.ui-l-row` and `.ui-l-grid`: `.ui-x-small` is `--ui-space-1`, `.ui-small` `--ui-space-2`, the default `--ui-space-3` and `.ui-large` `--ui-space-5`. For anything else, set `--_gap`.

```svelte
<script lang="ts">
  import { Button } from "opui-css/svelte"
</script>

<div class="ui-l-column">
  <div class="ui-l-row ui-x-small">
    <Button variant="outlined">One</Button>
    <Button variant="outlined">Two</Button>
    <Button variant="outlined">Three</Button>
  </div>
  <div class="ui-l-row ui-small">
    <Button variant="outlined">One</Button>
    <Button variant="outlined">Two</Button>
    <Button variant="outlined">Three</Button>
  </div>
  <div class="ui-l-row">
    <Button variant="outlined">One</Button>
    <Button variant="outlined">Two</Button>
    <Button variant="outlined">Three</Button>
  </div>
  <div class="ui-l-row ui-large">
    <Button variant="outlined">One</Button>
    <Button variant="outlined">Two</Button>
    <Button variant="outlined">Three</Button>
  </div>
</div>
```

## Container

`.ui-l-container` centers its content, caps its width at `--_max-inline-size` (`72rem` by default) and keeps `--_padding-inline` from the edges. Combine the classes to lay out a whole section:

```svelte
<script lang="ts">
  import { Button, Card, CardContent } from "opui-css/svelte"
</script>

<div class="ui-l-container" style="--_max-inline-size: 40rem">
  <div class="ui-l-column ui-large">
    <div class="ui-l-column ui-x-small">
      <h3 class="ui-h4">Team</h3>
      <p>Invite people to work on this project.</p>
    </div>
    <div class="ui-l-grid" style="--_min-inline-size: 10rem">
      <Card variant="tonal">
        <CardContent>Design</CardContent>
      </Card>
      <Card variant="tonal">
        <CardContent>Engineering</CardContent>
      </Card>
      <Card variant="tonal">
        <CardContent>Support</CardContent>
      </Card>
    </div>
    <div class="ui-l-row" style="--_justify-content: flex-end">
      <Button>Cancel</Button>
      <Button color="primary" variant="filled">Invite</Button>
    </div>
  </div>
</div>
```

## API

| Type      | Modifiers                                        | Default | Description                                                                 |
| --------- | ------------------------------------------------ | ------- | --------------------------------------------------------------------------- |
| Column    | `.ui-l-column`                                   | -       | A column with even space between its children.                              |
| Container | `.ui-l-container`                                | -       | Centers its content and caps its width.                                     |
| Grid      | `.ui-l-grid`                                     | -       | Columns that fill the width and wrap.                                       |
| Row       | `.ui-l-row`                                      | -       | A wrapping row with its children centered on one line.                      |
| Sizes     | default, `.ui-large`, `.ui-small`, `.ui-x-small` | default | The space between children of `.ui-l-column`, `.ui-l-row` and `.ui-l-grid`. |

### Parts

| Part                                                   | Description                                   |
| ------------------------------------------------------ | --------------------------------------------- |
| `.ui-l-column, .ui-l-row, .ui-l-grid, .ui-l-container` | Any element. The classes only set its layout. |

### CSS variables

| Variable       | Default                                       | Description                                                     |
| -------------- | --------------------------------------------- | --------------------------------------------------------------- |
| `--ui-space-1` | `calc(var(--size-1) * var(--ui-space-scale))` | Spacing step 1: Open Props `--size-1` times `--ui-space-scale`. |
| `--ui-space-2` | `calc(var(--size-2) * var(--ui-space-scale))` | Spacing step 2: Open Props `--size-2` times `--ui-space-scale`. |
| `--ui-space-3` | `calc(var(--size-3) * var(--ui-space-scale))` | Spacing step 3: Open Props `--size-3` times `--ui-space-scale`. |
| `--ui-space-4` | `calc(var(--size-4) * var(--ui-space-scale))` | Spacing step 4: Open Props `--size-4` times `--ui-space-scale`. |
| `--ui-space-5` | `calc(var(--size-5) * var(--ui-space-scale))` | Spacing step 5: Open Props `--size-5` times `--ui-space-scale`. |

This component uses these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/svelte/guide/theme-tokens.md).

Add the classes to elements in your markup. There is no Svelte component.

## Component properties

Set these on the component itself, inline or in your own CSS. Inputs are the knobs. Outputs are derived from the inputs and the current state, so overriding one fixes it in every state. [Customizing](https://open-props-ui.netlify.app/svelte/guide/customizing.md#component-properties) has examples.

| Property             | Kind  | Description                                                                                                                      |
| -------------------- | ----- | -------------------------------------------------------------------------------------------------------------------------------- |
| `--_gap`             | Input | Space between the children of `.ui-l-column`, `.ui-l-row` and `.ui-l-grid`. Defaults to `--ui-space-3`, set by the size classes. |
| `--_justify-content` | Input | How `.ui-l-row` distributes its children along the row, such as `flex-end` or `space-between`.                                   |
| `--_max-inline-size` | Input | Maximum width of `.ui-l-container`.                                                                                              |
| `--_min-inline-size` | Input | Narrowest column of `.ui-l-grid`. Columns are added while they fit at this width.                                                |
| `--_padding-inline`  | Input | Inline padding of `.ui-l-container`. Defaults to `--ui-space-4`.                                                                 |

## Installation

- `opui-css/css/components/layout.css`

## Changelog

### What's new

- New: [`.ui-l-column`](#column), [`.ui-l-row`](#row), [`.ui-l-grid`](#grid) and [`.ui-l-container`](#container) lay out the space between components.
