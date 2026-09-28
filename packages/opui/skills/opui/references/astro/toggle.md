# Toggle

Buttons (disguised as input checkbox/radio) that can be toggled on and off.

## Toggle button

```astro
---
import { ToggleButton } from "opui-css/astro"
---


<ToggleButton name="standalone-demo-1">Toggle me</ToggleButton>
<ToggleButton name="standalone-demo-2">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    ><path d="M12 21a9 9 0 1 0-9-9 9 9 0 0 0 9 9Z"></path><path d="M12 8v4"
    ></path><path d="M12 16h.01"></path></svg
  >
  Toggle with icon
</ToggleButton>
```

## Toggle group

Group toggle buttons by wrapping them in a `ToggleGroup` component.

### Multi-select

Use `selection="multiple"` for multi-select groups.

```astro
---
import { ToggleGroup, ToggleButton } from "opui-css/astro"
---


<ToggleGroup name="text-style">
  <ToggleButton value="bold" aria-label="Bold"><strong>B</strong></ToggleButton>
  <ToggleButton value="italic" aria-label="Italic"><i>I</i></ToggleButton>
  <ToggleButton value="underline" aria-label="Underline"><u>U</u></ToggleButton>
</ToggleGroup>
```

### Single-select

Use `selection="single"` for single-select groups.

```astro
---
import { ToggleGroup, ToggleButton } from "opui-css/astro"
---


<ToggleGroup selection="single" name="alignment">
  <ToggleButton value="left" aria-label="Align left">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      ><path
        fill="currentColor"
        d="M3 21h18v-2H3v2zm0-4h12v-2H3v2zm0-4h18v-2H3v2zm0-4h12v-2H3v2zm0-6v2h18V3H3z"
      ></path></svg
    >
  </ToggleButton>
  <ToggleButton value="center" checked aria-label="Align center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      ><path
        fill="currentColor"
        d="M3 21h18v-2H3v2zm4-4h10v-2H7v2zm-4-4h18v-2H3v2zm4-4h10v-2H7v2zM3 3v2h18V3H3z"
      ></path></svg
    >
  </ToggleButton>
  <ToggleButton value="right" aria-label="Align right">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      ><path
        fill="currentColor"
        d="M3 21h18v-2H3v2zm6-4h12v-2H9v2zm-6-4h18v-2H3v2zm6-4h12v-2H9v2zM3 3v2h18V3H3z"
      ></path></svg
    >
  </ToggleButton>
</ToggleGroup>
```

### Text + icon

```astro
---
import { ToggleGroup, ToggleButton } from "opui-css/astro"
---


<ToggleGroup selection="single" name="transport">
  <ToggleButton value="walking" checked>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M13 6.5A2.25 2.25 0 1 0 13 2a2.25 2.25 0 0 0 0 4.5m-2.639-.081c.185.045.35.146.493.272a3.24 3.24 0 0 0 2.904.72c.186-.044.379-.056.564-.01l.132.033a1.5 1.5 0 0 1 .919.673l1.332 2.177a1 1 0 0 0 .657.46l1.431.285a1.5 1.5 0 0 1-.587 2.942l-2.504-.5a1.5 1.5 0 0 1-.986-.688l-.183-.3a.54.54 0 0 0-.966.09a1.5 1.5 0 0 0 .17 1.389l.994 1.433a1.5 1.5 0 0 1 .265.767l.25 4.25a1.5 1.5 0 0 1-2.995.176l-.2-3.391a1 1 0 0 0-.247-.602l-.851-.968a.88.88 0 0 0-1.477.252L7.39 21.061a1.5 1.5 0 0 1-2.783-1.122l3.076-7.634q.02-.081.052-.162l.565-1.47a.469.469 0 0 0-.865-.362l-1.268 2.806a1.5 1.5 0 0 1-2.735-1.232l1.624-3.61a1.5 1.5 0 0 1 .846-.792l3.075-1.14a1.5 1.5 0 0 1 .883-.049z"
      ></path>
    </svg>
    Walking
  </ToggleButton>
  <ToggleButton value="cycling">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M12.75 3a.75.75 0 0 0 0 1.5h1.427l.955 3.5H8.5V5.75A.75.75 0 0 0 7.75 5h-3a.75.75 0 0 0 0 1.5H7v2.188L6.698 10.5a4.25 4.25 0 1 0 4.298 4.065l4.656-4.657l.274 1.003a4.25 4.25 0 1 0 1.447-.394l-1.9-6.964A.75.75 0 0 0 14.75 3zm3.58 9.394l.696 2.553a.75.75 0 1 0 1.448-.394L17.777 12a2.75 2.75 0 1 1-1.447.394m-5.765.48a4.26 4.26 0 0 0-2.387-2.128L8.385 9.5h5.554zm-2.64-.611c.71.336 1.254.968 1.471 1.737h-1.76zm-1.48-.246l-.435 2.61a.75.75 0 0 0 .74.873h2.646a2.751 2.751 0 1 1-2.95-3.483"
      ></path>
    </svg>
    Cycling
  </ToggleButton>
  <ToggleButton value="commuting">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M16.25 3A3.75 3.75 0 0 1 20 6.75v9a3.75 3.75 0 0 1-2.89 3.651l2.462 1.172a.75.75 0 0 1-.55 1.392l-.095-.038L13.83 19.5h-3.661l-5.097 2.427a.75.75 0 1 1-.645-1.354L6.89 19.4A3.75 3.75 0 0 1 4 15.75v-9A3.75 3.75 0 0 1 7.75 3zM8 15a1 1 0 1 0 0 2a1 1 0 0 0 0-2m8 0a1 1 0 1 0 0 2a1 1 0 0 0 0-2m.25-10.5h-8.5A2.25 2.25 0 0 0 5.5 6.75v5.75h13V6.75a2.25 2.25 0 0 0-2.25-2.25m-3 1.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1 0-1.5z"
      ></path>
    </svg>
    Commuting
  </ToggleButton>
</ToggleGroup>
```

### Vertical orientation

Change the layout of the group with the `orientation="vertical"` prop.

```astro
---
import { ToggleGroup, ToggleButton } from "opui-css/astro"
---


<ToggleGroup
  selection="single"
  name="alignment-vertical"
  orientation="vertical"
>
  <ToggleButton value="left" aria-label="Align left">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      ><path
        fill="currentColor"
        d="M3 21h18v-2H3v2zm0-4h12v-2H3v2zm0-4h18v-2H3v2zm0-4h12v-2H3v2zm0-6v2h18V3H3z"
      ></path></svg
    >
  </ToggleButton>
  <ToggleButton value="center" checked aria-label="Align center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      ><path
        fill="currentColor"
        d="M3 21h18v-2H3v2zm4-4h10v-2H7v2zm-4-4h18v-2H3v2zm4-4h10v-2H7v2zM3 3v2h18V3H3z"
      ></path></svg
    >
  </ToggleButton>
  <ToggleButton value="right" aria-label="Align right">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      ><path
        fill="currentColor"
        d="M3 21h18v-2H3v2zm6-4h12v-2H9v2zm-6-4h18v-2H3v2zm6-4h12v-2H9v2zM3 3v2h18V3H3z"
      ></path></svg
    >
  </ToggleButton>
</ToggleGroup>
```

### Sizes

Choose between three sizes: default, `.ui-x-small` and `.ui-small`.

```astro
---
import { ToggleButton } from "opui-css/astro"
---


<ToggleButton size="x-small"> x-small </ToggleButton>
<ToggleButton size="small"> small </ToggleButton>
<ToggleButton> default </ToggleButton>
```

## Anatomy

## API

### Toggle Button

Individual toggle button component.

| Prop       | Type                                | Default      | Description                                                                                                            |
| ---------- | ----------------------------------- | ------------ | ---------------------------------------------------------------------------------------------------------------------- |
| `disabled` | `boolean`                           | `false`      | Whether the toggle button is disabled.                                                                                 |
| `label`    | `string`                            | -            | The label text for the toggle button.                                                                                  |
| `name`     | `string`                            | -            | The name of the input element. Inherited from ToggleGroup if used within one.                                          |
| `pressed`  | `boolean`                           | `false`      | Whether the toggle button is pressed. Maps to `aria-pressed`in checkbox mode and to `checked` on the underlying input. |
| `size`     | `"default" \| "small" \| "x-small"` | `"default"`  | The size of the toggle button.                                                                                         |
| `type`     | `"checkbox" \| "radio"`             | `"checkbox"` | The type of input element. Inherited from ToggleGroup (driven by the`selection` prop) if used within one.              |
| `value`    | `string`                            | -            | The value attribute of the input element. Defaults to `label` if not provided.                                         |

### Toggle Group

Container for grouping multiple toggle buttons.

| Prop          | Type                                | Default      | Description                                                                               |
| ------------- | ----------------------------------- | ------------ | ----------------------------------------------------------------------------------------- |
| `name`        | `string`                            | -            | The name property for child inputs. Used for native form submission.                      |
| `size`        | `"default" \| "small" \| "x-small"` | `"default"`  | The size of the toggle group.                                                             |
| `orientation` | `"vertical"`                        | -            | Changes the layout direction of the group.                                                |
| `selection`   | `"single" \| "multiple"`            | `"multiple"` | The selection mode. `"single"` maps to radio inputs;`"multiple"` maps to checkbox inputs. |

## Browser support

- Chromium: Full support Supported since v125.
- Firefox: Full support Supported since v128.
- Safari: Full support Supported since v18.

See also the [full browser support guide](https://open-props-ui.netlify.app/astro/guide/browser-support.md).

## Installation

- `opui-css/css/components/toggle-group.css`
- `opui-css/css/components/toggle-button.css`

