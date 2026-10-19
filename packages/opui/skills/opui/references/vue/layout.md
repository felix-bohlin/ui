# Layout

Four classes for the space between components: `.ui-l-flow`, `.ui-l-cluster`, `.ui-l-grid` and `.ui-l-container`. The `l-` marks a layout class. Put them on wrapper elements, such as `div`, `section` or `ul`. They sit in the `utils` layer, so on a component they replace its own layout. Their gaps come from the [`--space-*` scale](https://open-props-ui.netlify.app/vue/guide/theming.md#spacing), so they follow `--space-scale`.

## Flow

`.ui-l-flow` stacks its children in a column with even space between them.

```vue
<script setup lang="ts">
import { Card, CardContent } from "opui-css/vue"
</script>

<template>
  <div class="ui-l-flow">
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
</template>
```

## Cluster

`.ui-l-cluster` puts its children in a row, centered on one line, and wraps them when they run out of room. Set `--_justify-content` to push them to the end or spread them out.

```vue
<script setup lang="ts">
import { Button } from "opui-css/vue"
</script>

<template>
  <div class="ui-l-cluster">
    <Button color="primary" variant="filled">Save</Button>
    <Button variant="outlined">Preview</Button>
    <Button variant="outlined">Share</Button>
    <Button>Cancel</Button>
  </div>
</template>
```

## Grid

`.ui-l-grid` fills the width with as many columns as fit at `--_min-inline-size` (`16rem` by default), and wraps the rest. No breakpoints: it follows the space it has.

```vue
<script setup lang="ts">
import { Card, CardContent } from "opui-css/vue"
</script>

<template>
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
</template>
```

## Gap

The size classes set the gap of `.ui-l-flow`, `.ui-l-cluster` and `.ui-l-grid`: `.ui-x-small` is `--space-1`, `.ui-small` `--space-2`, the default `--space-3` and `.ui-large` `--space-5`. For anything else, set `--_gap`.

```vue
<script setup lang="ts">
import { Button } from "opui-css/vue"
</script>

<template>
  <div class="ui-l-flow">
    <div class="ui-l-cluster ui-x-small">
      <Button variant="outlined">One</Button>
      <Button variant="outlined">Two</Button>
      <Button variant="outlined">Three</Button>
    </div>
    <div class="ui-l-cluster ui-small">
      <Button variant="outlined">One</Button>
      <Button variant="outlined">Two</Button>
      <Button variant="outlined">Three</Button>
    </div>
    <div class="ui-l-cluster">
      <Button variant="outlined">One</Button>
      <Button variant="outlined">Two</Button>
      <Button variant="outlined">Three</Button>
    </div>
    <div class="ui-l-cluster ui-large">
      <Button variant="outlined">One</Button>
      <Button variant="outlined">Two</Button>
      <Button variant="outlined">Three</Button>
    </div>
  </div>
</template>
```

## Container

`.ui-l-container` centers its content, caps its width at `--_max-inline-size` (`72rem` by default) and keeps `--_padding-inline` from the edges. Combine the classes to lay out a whole section:

```vue
<script setup lang="ts">
import { Button, Card, CardContent } from "opui-css/vue"
</script>

<template>
  <div class="ui-l-container" style="--_max-inline-size: 40rem">
    <div class="ui-l-flow ui-large">
      <div class="ui-l-flow ui-x-small">
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
      <div class="ui-l-cluster" style="--_justify-content: flex-end">
        <Button>Cancel</Button>
        <Button color="primary" variant="filled">Invite</Button>
      </div>
    </div>
  </div>
</template>
```

## API

| Type      | Modifiers                                        | Default   | Description                                                                   |
| --------- | ------------------------------------------------ | --------- | ----------------------------------------------------------------------------- |
| Cluster   | `.ui-l-cluster`                                  | -         | A wrapping row with its children centered on one line.                        |
| Container | `.ui-l-container`                                | -         | Centers its content and caps its width.                                       |
| Flow      | `.ui-l-flow`                                     | -         | A column with even space between its children.                                |
| Grid      | `.ui-l-grid`                                     | -         | Columns that fill the width and wrap.                                         |
| Sizes     | default, `.ui-large`, `.ui-small`, `.ui-x-small` | `default` | The space between children of `.ui-l-flow`, `.ui-l-cluster` and `.ui-l-grid`. |

### Parts

| Part                                                     | Description                                   |
| -------------------------------------------------------- | --------------------------------------------- |
| `.ui-l-flow, .ui-l-cluster, .ui-l-grid, .ui-l-container` | Any element. The classes only set its layout. |

### CSS variables

| Variable    | Default                                    | Description                                                  |
| ----------- | ------------------------------------------ | ------------------------------------------------------------ |
| `--space-1` | `calc(var(--size-1) * var(--space-scale))` | Spacing step 1: Open Props `--size-1` times `--space-scale`. |
| `--space-2` | `calc(var(--size-2) * var(--space-scale))` | Spacing step 2: Open Props `--size-2` times `--space-scale`. |
| `--space-3` | `calc(var(--size-3) * var(--space-scale))` | Spacing step 3: Open Props `--size-3` times `--space-scale`. |
| `--space-4` | `calc(var(--size-4) * var(--space-scale))` | Spacing step 4: Open Props `--size-4` times `--space-scale`. |
| `--space-5` | `calc(var(--size-5) * var(--space-scale))` | Spacing step 5: Open Props `--size-5` times `--space-scale`. |

This component uses these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/vue/guide/theme-tokens.md).

Add the classes to elements in your templates. There is no Vue component. There is no Vue component.

## Component properties

Set these on the component itself, inline or in your own CSS. Inputs are the knobs. Outputs are derived from the inputs and the current state, so overriding one fixes it in every state. [Customizing](https://open-props-ui.netlify.app/vue/guide/customizing.md#component-properties) has examples.

| Property             | Kind  | Description                                                                                                                     |
| -------------------- | ----- | ------------------------------------------------------------------------------------------------------------------------------- |
| `--_gap`             | Input | Space between the children of `.ui-l-flow`, `.ui-l-cluster` and `.ui-l-grid`. Defaults to `--space-3`, set by the size classes. |
| `--_justify-content` | Input | How `.ui-l-cluster` distributes its children along the row, such as `flex-end` or `space-between`.                              |
| `--_max-inline-size` | Input | Maximum width of `.ui-l-container`.                                                                                             |
| `--_min-inline-size` | Input | Narrowest column of `.ui-l-grid`. Columns are added while they fit at this width.                                               |
| `--_padding-inline`  | Input | Inline padding of `.ui-l-container`. Defaults to `--space-4`.                                                                   |

## Installation

- `opui-css/css/components/layout.css`

## Changelog

### What's new

- New: [`.ui-l-flow`](#flow), [`.ui-l-cluster`](#cluster), [`.ui-l-grid`](#grid) and [`.ui-l-container`](#container) lay out the space between components.
