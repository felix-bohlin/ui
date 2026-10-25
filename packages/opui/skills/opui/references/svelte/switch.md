# Switch

Use a Switch for a setting that applies right away. Use a [Checkbox](https://open-props-ui.netlify.app/svelte/components/checkbox.md) for choices that are submitted with a form, and a [Toggle](https://open-props-ui.netlify.app/svelte/components/toggle.md) for options in a toolbar. See also: [Switch field group](#field-group).

## Anatomy

Theme Label End text

- `<Switch>`

  Container element.

- `bind:checked / bind:group`

  The switch input.

- `iconUnchecked`

  An optional icon in the thumb when unchecked.

- `iconChecked`

  An optional icon in the thumb when checked.

- `label / children`

  The label.

- `endText`

  Supporting text displayed below the label.

## Basics

All switches should have an accessible name. Put the label text inside the component, also when there's no visible label: set `hideLabel` to hide it visually.

```svelte
<script lang="ts">
  import { Switch } from "opui-css/svelte"
</script>

<Switch name="switch-basics" checked hideLabel>Label</Switch>
<Switch name="switch-basics" hideLabel>Label</Switch>
<Switch name="switch-basics" checked disabled hideLabel>Label</Switch>
<Switch name="switch-basics" disabled hideLabel>Label</Switch>
```

## Sizes

Choose between four sizes with the `size` prop: `x-small`, `small`, `medium` (the default) and `large`.

```svelte
<script lang="ts">
  import { Switch } from "opui-css/svelte"
</script>

<div class="example-row">
  <Switch name="switch-sizes" size="x-small" checked hideLabel>X-small</Switch>
  <Switch name="switch-sizes" size="small" checked hideLabel>Small</Switch>
  <Switch name="switch-sizes" checked hideLabel>Medium</Switch>
  <Switch name="switch-sizes" size="large" checked hideLabel>Large</Switch>
</div>
<div class="example-row">
  <Switch name="switch-sizes" size="x-small" checked>X-small</Switch>
  <Switch name="switch-sizes" size="small" checked>Small</Switch>
  <Switch name="switch-sizes" checked>Medium</Switch>
  <Switch name="switch-sizes" size="large" checked>Large</Switch>
</div>
```

## Visible label

The `children` snippet is the label. Also, don't miss the info on label [accessibility](#accessibility).

```svelte
<script lang="ts">
  import { Switch } from "opui-css/svelte"
</script>

<Switch name="switch-visible-label">Label</Switch>
<Switch name="switch-visible-label" disabled>Disabled</Switch>
<Switch name="switch-visible-label">
  Long text bacon ipsum dolor amet prosciutto tenderloin biltong leberkas ribeye
  short ribs shankle tri-tip doner buffalo chislic meatloaf meatball.
</Switch>
```

### Hidden label

Set `hideLabel` to keep the label for screen readers only. The switch then centers in a table cell or a line of text, and keeps a 24px click target.

```svelte
<script lang="ts">
  import {
    Switch,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRow,
  } from "opui-css/svelte"
</script>

<Table>
  <TableHead>
    <TableRow>
      <TableHeaderCell><span class="ui-sr-only">On</span></TableHeaderCell>
      <TableHeaderCell>Channel</TableHeaderCell>
      <TableHeaderCell>Schedule</TableHeaderCell>
    </TableRow>
  </TableHead>
  <TableBody>
    <TableRow>
      <TableCell>
        <Switch checked hideLabel name="switch-hidden-label" value="email"
          >Email</Switch
        >
      </TableCell>
      <TableCell>Email</TableCell>
      <TableCell>Daily</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>
        <Switch hideLabel name="switch-hidden-label" value="push">Push</Switch>
      </TableCell>
      <TableCell>Push</TableCell>
      <TableCell>Right away</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>
        <Switch hideLabel name="switch-hidden-label" value="sms">SMS</Switch>
      </TableCell>
      <TableCell>SMS</TableCell>
      <TableCell>Weekly</TableCell>
    </TableRow>
  </TableBody>
</Table>

<p>
  Play
  <Switch checked hideLabel name="switch-hidden-label-sound" value="sounds"
    >Sounds</Switch
  >
  sounds and
  <Switch hideLabel name="switch-hidden-label-sound" value="haptics"
    >Haptics</Switch
  >
  haptics.
</p>
```

### Label position

Set `orientation="vertical"` to put the label under the switch.

```svelte
<script lang="ts">
  import { Switch } from "opui-css/svelte"
</script>

<Switch name="switch-label-position">Default</Switch>
<Switch name="switch-label-position" orientation="vertical">Stack</Switch>
```

### End text

```svelte
<script lang="ts">
  import { Switch } from "opui-css/svelte"
</script>

<Switch name="switch-end-text" endText="Supporting text">Default</Switch>
<Switch name="switch-end-text" orientation="vertical" endText="Supporting text"
  >Stack</Switch
>
```

## Icons

Put an icon in the `iconUnchecked` and `iconChecked` snippets to show it in the thumb. The component hides them from screen readers.

```svelte
<script lang="ts">
  import { Switch } from "opui-css/svelte"
</script>

<Switch name="switch-icons" size="small" hideLabel>
  Toggle theme
  {#snippet iconUnchecked()}<svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M20.026 17.001c-2.762 4.784-8.879 6.423-13.663 3.661A10 10 0 0 1 3.13 17.68a.75.75 0 0 1 .365-1.132c3.767-1.348 5.785-2.91 6.956-5.146c1.233-2.353 1.551-4.93.689-8.463a.75.75 0 0 1 .769-.927a9.96 9.96 0 0 1 4.457 1.327c4.784 2.762 6.423 8.879 3.66 13.662"
      ></path></svg
    >{/snippet}
  {#snippet iconChecked()}<svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M12 2a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 12 2m5 10a5 5 0 1 1-10 0a5 5 0 0 1 10 0m4.25.75a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5zM12 19a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 12 19m-7.75-6.25a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5zm-.03-8.53a.75.75 0 0 1 1.06 0l1.5 1.5a.75.75 0 0 1-1.06 1.06l-1.5-1.5a.75.75 0 0 1 0-1.06m1.06 15.56a.75.75 0 1 1-1.06-1.06l1.5-1.5a.75.75 0 1 1 1.06 1.06zm14.5-15.56a.75.75 0 0 0-1.06 0l-1.5 1.5a.75.75 0 0 0 1.06 1.06l1.5-1.5a.75.75 0 0 0 0-1.06m-1.06 15.56a.75.75 0 1 0 1.06-1.06l-1.5-1.5a.75.75 0 1 0-1.06 1.06z"
      ></path></svg
    >{/snippet}
</Switch>

<Switch name="switch-icons" checked hideLabel>
  Toggle theme
  {#snippet iconUnchecked()}<svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M20.026 17.001c-2.762 4.784-8.879 6.423-13.663 3.661A10 10 0 0 1 3.13 17.68a.75.75 0 0 1 .365-1.132c3.767-1.348 5.785-2.91 6.956-5.146c1.233-2.353 1.551-4.93.689-8.463a.75.75 0 0 1 .769-.927a9.96 9.96 0 0 1 4.457 1.327c4.784 2.762 6.423 8.879 3.66 13.662"
      ></path></svg
    >{/snippet}
  {#snippet iconChecked()}<svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M12 2a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 12 2m5 10a5 5 0 1 1-10 0a5 5 0 0 1 10 0m4.25.75a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5zM12 19a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 12 19m-7.75-6.25a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5zm-.03-8.53a.75.75 0 0 1 1.06 0l1.5 1.5a.75.75 0 0 1-1.06 1.06l-1.5-1.5a.75.75 0 0 1 0-1.06m1.06 15.56a.75.75 0 1 1-1.06-1.06l1.5-1.5a.75.75 0 1 1 1.06 1.06zm14.5-15.56a.75.75 0 0 0-1.06 0l-1.5 1.5a.75.75 0 0 0 1.06 1.06l1.5-1.5a.75.75 0 0 0 0-1.06m-1.06 15.56a.75.75 0 1 0 1.06-1.06l-1.5-1.5a.75.75 0 1 0-1.06 1.06z"
      ></path></svg
    >{/snippet}
</Switch>
```

## Validation

- `required` toggles the required styles on the `<input>`.
- `error` toggles the invalid styles, and screen readers announce the `<input>` as invalid. Say what's wrong in the end text. The wrapping `<label>` makes it part of the field's name.
- Switches also get the invalid styles from the browser's own validation (`:user-invalid`), after the user has edited them. Use `error` for server-side errors.

```svelte
<script lang="ts">
  import { Switch } from "opui-css/svelte"
</script>

<div class="example-row">
  <Switch name="switch-validation" required>Default</Switch>
  <Switch name="switch-validation" required orientation="vertical">Stack</Switch
  >
</div>

<div class="example-row">
  <Switch name="switch-validation" error checked>
    Default
    {#snippet endText()}Supporting text{/snippet}
  </Switch>
  <Switch name="switch-validation" error orientation="vertical">
    Stack
    {#snippet endText()}Supporting text{/snippet}
  </Switch>
</div>
```

## Spread

Use the `spread` prop to push the label to the left and the switch to the right. Handy for full-width items like lists and menus, and for [cards](#cards).

```svelte
<script lang="ts">
  import { Switch } from "opui-css/svelte"
</script>

<Switch name="switch-spread" spread>
  Notifications
  {#snippet endText()}Receive alerts when someone mentions you.{/snippet}
</Switch>

<Switch name="switch-spread" spread required>
  Required
  {#snippet endText()}You must accept this to proceed.{/snippet}
</Switch>

<Switch name="switch-spread" spread disabled>
  Disabled
  {#snippet endText()}This switch is disabled.{/snippet}
</Switch>

<Switch name="switch-spread" spread error>
  Invalid Switch
  {#snippet endText()}Turn this on to continue.{/snippet}
</Switch>
```

## Cards

`card` renders the switch as a card that tints when hovered and when checked. Combine it with `spread` for the switch at the end, and `variant="tonal"` or `variant="elevated"` for the surface, like a [Card](https://open-props-ui.netlify.app/svelte/components/card.md). In a horizontal `FieldGroup` the cards share the row.

```svelte
<script lang="ts">
  import {
    Switch,
    FieldGroup,
    FieldLegend,
    Fieldset,
    Form,
  } from "opui-css/svelte"
</script>

<Form>
  <Fieldset>
    <FieldLegend>Input at the end</FieldLegend>
    <FieldGroup name="switch-cards-end" orientation="horizontal">
      <Switch value="outlined" checked card spread>
        Outlined
        {#snippet endText()}The default surface.{/snippet}
      </Switch>
      <Switch value="tonal" card variant="tonal" spread>
        Tonal
        {#snippet endText()}A tinted surface.{/snippet}
      </Switch>
      <Switch value="elevated" card variant="elevated" spread>
        Elevated
        {#snippet endText()}A raised surface.{/snippet}
      </Switch>
    </FieldGroup>
  </Fieldset>
  <Fieldset>
    <FieldLegend>Input at the start</FieldLegend>
    <FieldGroup name="switch-cards-start" orientation="horizontal">
      <Switch value="outlined" checked card>
        Outlined
        {#snippet endText()}The default surface.{/snippet}
      </Switch>
      <Switch value="tonal" card variant="tonal">
        Tonal
        {#snippet endText()}A tinted surface.{/snippet}
      </Switch>
      <Switch value="elevated" card variant="elevated">
        Elevated
        {#snippet endText()}A raised surface.{/snippet}
      </Switch>
    </FieldGroup>
  </Fieldset>
</Form>
```

## Label alignment

The switch lines up with the first line of its label and centers on the label's capital letters, so it looks centered in any font and at any size. If a font still looks off, nudge the label with `--ui-choice-label-offset`, in `em` or `cap` so it scales with the label.

```css
:root {
  --ui-choice-label-offset: 0.05em;
}
```

## Switch input

Use `SwitchInput` without the label for a custom layout, such as the end of a list item. See [List](https://open-props-ui.netlify.app/svelte/components/list.md#switch).

## Field group

Use field groups to group related switches.

The `name` prop will get passed down to each switch in the group.

See also: [Form documentation](https://open-props-ui.netlify.app/svelte/components/form.md).

```svelte
<script lang="ts">
  import {
    FieldGroup,
    FieldLegend,
    Fieldset,
    Form,
    Switch,
  } from "opui-css/svelte"
</script>

<Form>
  <Fieldset>
    <FieldLegend>Legend</FieldLegend>
    <FieldGroup name="switch-group">
      <Switch>Switch 1</Switch>
      <Switch>Switch 2</Switch>
      <Switch>Switch 3</Switch>
    </FieldGroup>
  </Fieldset>
</Form>
```

### Orientation

Switches stack vertically by default. Set `orientation="horizontal"` on the `FieldGroup` to put them in a row.

```svelte
<script lang="ts">
  import {
    FieldGroup,
    FieldLegend,
    Fieldset,
    Form,
    Switch,
  } from "opui-css/svelte"
</script>

<Form>
  <Fieldset>
    <FieldLegend>Legend</FieldLegend>
    <FieldGroup name="switch-group-orientation" orientation="horizontal">
      <Switch>Switch 1</Switch>
      <Switch>Switch 2</Switch>
      <Switch>Switch 3</Switch>
    </FieldGroup>
  </Fieldset>
</Form>
```

### Field description

Can be placed above and below the fields.

```svelte
<script lang="ts">
  import {
    FieldDescription,
    FieldGroup,
    FieldLegend,
    Fieldset,
    Form,
    Switch,
  } from "opui-css/svelte"
</script>

<Form>
  <Fieldset>
    <FieldLegend>Legend</FieldLegend>
    <FieldDescription>Field description above fields</FieldDescription>
    <FieldGroup
      orientation="horizontal"
      name="switch-group-field-description-1"
    >
      <Switch>Switch 1</Switch>
      <Switch>Switch 2</Switch>
      <Switch>Switch 3</Switch>
    </FieldGroup>
  </Fieldset>

  <Fieldset>
    <FieldLegend>Legend</FieldLegend>
    <FieldGroup
      orientation="horizontal"
      name="switch-group-field-description-2"
    >
      <Switch>Switch 1</Switch>
      <Switch>Switch 2</Switch>
      <Switch>Switch 3</Switch>
    </FieldGroup>
    <FieldDescription>Field description below fields</FieldDescription>
  </Fieldset>
</Form>
```

### Disabled

Set `disabled` on the `Fieldset` to disable every switch in it, or on a single `Switch`.

`aria-disabled="true"` on the `<input>` looks the same, but keeps the switch focusable and its value in the form. It doesn't stop the change, so block it with a script.

```svelte
<script lang="ts">
  import {
    FieldGroup,
    FieldLegend,
    Fieldset,
    Form,
    Switch,
  } from "opui-css/svelte"
</script>

<Form>
  <Fieldset disabled>
    <FieldLegend>Legend</FieldLegend>
    <FieldGroup orientation="horizontal" name="switch-group-disabled">
      <Switch>Switch 1</Switch>
      <Switch>Switch 2</Switch>
      <Switch>Switch 3</Switch>
    </FieldGroup>
  </Fieldset>
  <Fieldset>
    <FieldLegend>One by one</FieldLegend>
    <FieldGroup orientation="horizontal" name="switch-group-disabled-single">
      <Switch checked>Enabled</Switch>
      <Switch disabled>Disabled</Switch>
      <Switch aria-disabled="true">Aria-disabled</Switch>
    </FieldGroup>
  </Fieldset>
</Form>
```

### Required

Each switch with `required` must be on before the form submits. There's no native "at least one" for switches.

```svelte
<script lang="ts">
  import {
    FieldGroup,
    FieldLegend,
    Fieldset,
    Form,
    Switch,
  } from "opui-css/svelte"
</script>

<Form>
  <Fieldset>
    <FieldLegend>These are required!</FieldLegend>
    <FieldGroup orientation="horizontal" name="switch-group-required">
      <Switch required>Switch 1</Switch>
      <Switch required>Switch 2</Switch>
      <Switch required>Switch 3</Switch>
    </FieldGroup>
  </Fieldset>
</Form>
```

### Validation

Set `error` on each `Switch` in the group. The end text of the `Fieldset` turns red with them.

Give the end text an `id` and point `aria-describedby` on the fieldset at it, so screen readers read the error with the group.

```svelte
<script lang="ts">
  import {
    FieldGroup,
    FieldLegend,
    Fieldset,
    Form,
    Switch,
  } from "opui-css/svelte"
</script>

<Form>
  <Fieldset aria-describedby="switch-field-group-validation-1-error">
    <FieldLegend>Legend</FieldLegend>
    <FieldGroup orientation="horizontal" name="switch-field-group-validation">
      <Switch error>Switch 1</Switch>
      <Switch error>Switch 2</Switch>
      <Switch error>Switch 3</Switch>
    </FieldGroup>
    <span class="ui-end-text" id="switch-field-group-validation-1-error"
      >Turn on at least one to continue.</span
    >
  </Fieldset>
</Form>
```

### Binding

Bind the checked values with `bind:group` on each `Switch`. The array holds the `value` of every checked switch, and setting it updates the switches.

```svelte
<script lang="ts">
  import {
    Button,
    FieldGroup,
    FieldLegend,
    Fieldset,
    Switch,
  } from "opui-css/svelte"

  let notifications = $state(["email"])

  function reset() {
    notifications = ["email"]
  }
</script>

<Fieldset>
  <FieldLegend>Notifications</FieldLegend>
  <FieldGroup name="switch-binding">
    <Switch bind:group={notifications} value="email">Email</Switch>
    <Switch bind:group={notifications} value="push">Push</Switch>
    <Switch bind:group={notifications} value="sms">SMS</Switch>
  </FieldGroup>
</Fieldset>
<p class="switch-binding-text">
  Selected: {notifications.join(", ") || "none"}
</p>
<Button class="switch-binding-reset" onclick={reset}>Reset</Button>
```

## Accessibility

### Role & attributes

| Role/attribute | Usage |
| --- | --- |
| `role="switch"` | Required on the `input` element. Identifies the element that serves as a switch. |

### Labels

Accessible switches should have a label. The first two approaches are equally ok:

| Approach | Usage in Switch component |
| --- | --- |
| Provide a label inside the element | The `children` snippet is the [visible label](#visible-label). Set `hideLabel` to hide it visually while keeping it accessible. |
| Add an `aria-label` on the input | Not used. Use `hideLabel` instead, also for icon-only switches. |
| Have a visible label that you reference with `aria-labelledby` | Not used. |

### Keyboard support

| Key | Function |
| --- | --- |
| `Space` | When Switch is focused it changes its state. |

## API

### Switch API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `bind:checked` **Needs hydration** The bound value only updates on the client. The native control still changes and submits with its form. Read the value from the form instead. | `boolean` | - | The checked state. |
| `bind:group` **Needs hydration** The bound value only updates on the client. The native control still changes and submits with its form. Read the value from the form instead. | `(string \| number)[]` | - | The checked values of a group. |
| `card` | `boolean` | `false` | Renders the switch as a card: a padded, outlined surface that tints when hovered and when checked, with the label and `endText` inside. Add `spread` to put the input at the end, and `variant` to change the surface. |
| `children` | `Snippet` | - | The label. |
| `disabled` | `boolean` | `false` | Dims the switch and shows a not-allowed cursor. `aria-disabled="true"` looks the same, but keeps the switch focusable and its value in the form, and doesn't stop the change, so block it with a script. |
| `endText` | `Snippet` , `string` | - | Supporting text displayed below the label. |
| `error` | `boolean` | `false` | Marks the control invalid and shows error styles. |
| `hideLabel` | `boolean` | `false` | Visually hides the label, `.ui-sr-only` instead of `.ui-label`. |
| `iconChecked` | `Snippet` | - | An optional icon in the thumb when checked. |
| `iconUnchecked` | `Snippet` | - | An optional icon in the thumb when unchecked. |
| `id` | `string` | - | The id of the `<input>`. |
| `label` | `string` | - | The label. |
| `name` | `string` | - | The name of the `<input>`. Inside a `FieldGroup`, the group's `name` applies. |
| `orientation` | `"horizontal"` , `"vertical"` | `"horizontal"` | The orientation of the element. `vertical` stacks the label under the switch. |
| `required` | `boolean` | - | Adds a required mark after the label. The form won't submit until it's on. |
| `size` | `"large"` , `"medium"` , `"small"` , `"x-small"` | `"medium"` | The size of the element. |
| `spread` | `boolean` | `false` | Pushes the label and the switch to opposite ends. |
| `value` | `string` | - | The value of the `<input>`, submitted with the form when it's checked. |
| `variant` | `"elevated"` , `"outlined"` , `"tonal"` | `"outlined"` | The surface of the card, with `card`. `outlined` has a border, `tonal` a tinted surface and `elevated` a shadow, like Card. |

Attributes that aren't props go to the `<input>`, like `autofocus` and `form`, and `class` and `style` go to the root `<label>`. To hide the label, set `hideLabel` and keep the text in `label` or `children`.

### Switch input API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `bind:checked` **Needs hydration** The bound value only updates on the client. The native control still changes and submits with its form. Read the value from the form instead. | `boolean` | - | The checked state. |
| `bind:group` **Needs hydration** The bound value only updates on the client. The native control still changes and submits with its form. Read the value from the form instead. | `(string \| number)[]` | - | The checked values of a group. |

The switch `<input>` without the label, for a custom layout such as the end of a list item. Attributes that aren't props go to the `<input>`. Inside a `FieldGroup`, it takes the group's `name`.

### Field group API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `Snippet` | - | The fields, such as checkboxes, radios or switches. |
| `name` | `string` | - | Sets `name` on the OPUI fields inside that don't set their own. |
| `orientation` | `"auto"` , `"horizontal"` , `"vertical"` | `"auto"` | The orientation of the fields. With `auto`, fields stack and a group with only buttons lines up in a row. |

### CSS variables

| Variable | Default | Description |
| --- | --- | --- |
| `--ui-border-color` | `light-dark( color-mix( in oklch, var(--ui-text-strong) var(--ui-border-strength-light), var(--ui-surface) ), color-mix( in oklch, var(--ui-text-strong) var(--ui-border-strength-dark), var(--ui-surface) ) )` | Default border color for cards, lists, tables and dividers. `--ui-text-strong` mixed into `--ui-surface` at `--ui-border-strength-light` or `--ui-border-strength-dark`. |
| `--ui-border-color-on-raised` | `light-dark( color-mix( in oklch, var(--ui-text-strong) var(--ui-border-strength-light), var(--ui-surface) ), color-mix( in oklch, var(--ui-text-strong) var(--ui-border-strength-dark), var(--ui-surface) ) )` | Border color inside raised surfaces: tonal and elevated `Card` and `Accordion`, `Dialog`, `Drawer`, `Menu` and `Callout` without a severity. The same mix as `--ui-border-color` by default. Each raised component sets `--ui-border-color` to it on its root, so a theme that wants another border on raised surfaces, such as the page background in dark mode, sets this one. |
| `--ui-border-color-raised` | Unset | Border color of tonal and elevated `Card` and `Accordion` and of `Callout` without a severity. When unset, cards and accordions use the page background color, so they stay visible on tonal surfaces, and callouts their tonal background. |
| `--ui-border-width` | `1px` | Default border width for components that draw a border. |
| `--ui-card-padding` | Unset | Padding of `Card`, `Dialog` and `Accordion` content, headers and actions. When unset, `--ui-space-3`. |
| `--ui-choice-accent` | Unset | Fill of a checked `Checkbox`, `Radio` and `Switch`, and the thumb and fill of `Range`. When unset, `--ui-control-accent`, else `--ui-primary`, with its lightness capped in dark mode for the choice controls. Set it, or `--ui-control-accent`, to `--ui-primary` for the plain primary, like Material and shadcn. |
| `--ui-choice-border-color` | Unset | Border of the unchecked `Checkbox`, `Radio` and `Switch` track. When unset, `--ui-field-border-color`. Set it for themes whose field border is fainter than 3:1, like shadcn, which outlines its choices with `--ui-primary` like shadcn/ui does. |
| `--ui-choice-fill-max-lightness` | `0.62` | The highest OKLCH lightness of a checked `Checkbox`, `Radio` and `Switch` fill in dark mode, so the light mark keeps 3:1. `0.62`. |
| `--ui-choice-label-offset` | `0px` | Moves `Checkbox`, `Radio` and `Switch` labels down (positive) or up (negative) against their control. Use `em` or `cap` to scale with the label font. |
| `--ui-choice-on-accent` | Unset | Color of the mark on a checked `Checkbox`, `Radio` and `Switch`. Set it with `--ui-choice-accent`. When unset, `--ui-on-control-accent`, else `--ui-on-primary` in light mode and near-white in dark mode. |
| `--ui-choice-ripple-bg-color` | `oklch(from var(--ui-text) l c h / 20%)` | Halo color for the `Checkbox` and `Radio` hover effect. `--ui-text` at 20%. |
| `--ui-choice-size` | `calc(1.25rem * var(--ui-density))` | Default `Checkbox` and `Radio` input size. |
| `--ui-choice-size-large` | `calc(1.5rem * var(--ui-density))` | `Checkbox` and `Radio` input size with `.ui-large`. |
| `--ui-choice-size-small` | `calc(1rem * var(--ui-density))` | `Checkbox` and `Radio` input size with `.ui-small`, and in dense `List` rows unless the control has a size class. |
| `--ui-choice-size-x-small` | `calc(0.875rem * var(--ui-density))` | `Checkbox` and `Radio` input size with `.ui-x-small`. |
| `--ui-control-accent` | Unset | The accent every control shares: `Button` and `ButtonGroup` without `.ui-primary` or `.ui-critical`, a checked `Checkbox`, `Radio` and `Switch`, and the `Range` thumb and fill. Unset by default, so buttons keep `--ui-palette-strong` and choice controls `--ui-primary`. Set it to `--ui-primary` to give every control the brand color in one line, like Material and shadcn, and `--ui-button-accent` or `--ui-choice-accent` to override one of them. |
| `--ui-disabled-opacity` | `0.64` | Opacity applied to disabled controls. |
| `--ui-duration` | `0.2s` | Default transition duration. Multiplied by `--ui-motion`. |
| `--ui-ease` | `ease` | Default easing for transitions. |
| `--ui-field-border-color` | `color-mix( in oklch, var(--ui-text-strong) var(--ui-field-border-strength), var(--ui-surface) )` | Border color of every empty control: `TextField`, `Select`, `Textarea`, the unchecked `Checkbox`, `Radio` and `Switch` unless `--ui-choice-border-color` is set, the `Range` track and the `Progress` outline. `--ui-text-strong` mixed into `--ui-surface` at `--ui-field-border-strength`, so it reaches 3:1. Lighter than `--ui-border-color`, which is decorative, is a choice a theme can make. |
| `--ui-field-border-color-on-raised` | `color-mix( in oklch, var(--ui-text-strong) var(--ui-field-border-strength), var(--ui-surface) )` | Field border color inside raised surfaces. The same mix as `--ui-field-border-color` by default. Each raised component sets `--ui-field-border-color` to it on its root. |
| `--ui-field-border-width` | `1px` | Border width for fields, `Checkbox`, `Radio` and `Switch`. |
| `--ui-field-helper-font-size` | `var(--ui-font-size-caption)` | Font size for helper and end text under a field. |
| `--ui-field-helper-line-height` | `var(--ui-line-height-control)` | Line height for helper and end text under a field. |
| `--ui-field-helper-text-color` | `var(--ui-text-subtle)` | Text color for helper and end text under a field. |
| `--ui-field-label-font-size` | `var(--ui-font-size-small)` | Font size for field labels. |
| `--ui-field-label-font-weight` | `var(--ui-font-weight-semibold)` | Font weight for emphasized field labels and legends. |
| `--ui-field-label-text-color` | `var(--ui-text-strong)` | Text color for field labels. |
| `--ui-field-required-text-color` | `var(--ui-invalid-text)` | Color of the required asterisk. |
| `--ui-focus-ring-color` | `oklch( from var(--ui-surface) clamp(0, (0.6 - l) * 1000, 1) 0 0 )` | Color of the keyboard focus ring. Black on surfaces lighter than OKLCH 0.6 and white on darker ones, so it reaches 3:1 on any `--ui-surface`. |
| `--ui-focus-ring-offset` | `2px` | Distance between a control and its focus ring. |
| `--ui-focus-ring-style` | `solid` | Outline style of the focus ring. |
| `--ui-focus-ring-width` | `2px` | Width of the focus ring. |
| `--ui-font-size-body` | `var(--ui-font-size-300)` | Font size of body copy, `Card` text and the `Callout` title. Defaults to `--ui-font-size-300`. |
| `--ui-font-size-caption` | `var(--ui-font-size-100)` | Font size of captions, `Badge`, `Chip`, `Divider` labels, `List` secondary text, `Menu` shortcuts, overlines, `small`, `figcaption` and x-small buttons, toggles and fields. Defaults to `--ui-font-size-100`. |
| `--ui-font-size-small` | `var(--ui-font-size-200)` | Font size of helper text, `Callout`, `Table`, `Tooltip`, code blocks, dense `List` text and small buttons, chips, toggles and fields. Defaults to `--ui-font-size-200`. |
| `--ui-invalid` | `light-dark( var(--ui-critical), oklch( from var(--ui-critical) max(l, var(--ui-invalid-min-lightness)) min(c, var(--ui-accent-max-chroma)) h ) )` | Color for invalid field borders, fills and outlines. Lifted to `--ui-invalid-min-lightness` in dark mode, so invalid borders stand out from the page with more contrast. |
| `--ui-invalid-text` | `light-dark( oklch(from var(--ui-invalid) min(l, var(--ui-text-max-lightness)) c h), oklch( from var(--ui-invalid) max(l, var(--ui-text-min-lightness)) min(c, var(--ui-text-max-chroma)) h ) )` | Color for validation messages and invalid labels. `--ui-invalid` with its lightness kept within `--ui-text-max-lightness` and `--ui-text-min-lightness`, so it stays readable where `--ui-invalid` is lighter for borders. |
| `--ui-line-height-control` | `1.5` | Line height of interface text: labels, helpers, choice labels and field hints. |
| `--ui-line-height-tight` | `1.25` | Line height of single-line controls and compact text: field inputs, `Table` cells, `Tooltip`, `Card` captions and keyboard hints in buttons. |
| `--ui-motion` | `1` | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/svelte/guide/theming.md#motion). |
| `--ui-on-accent` | `var(--ui-gray-1)` | Text on an accent fill, an intent color kept within `--ui-accent-fill-max-lightness`: critical buttons, severity `Badge`s, the invalid choice mark and the checked choice mark in dark mode. Near-white in both modes, since the cap keeps every accent fill dark enough for it. |
| `--ui-on-control-accent` | Unset | Text and mark color on a `--ui-control-accent` fill. Set it with `--ui-control-accent`. `--ui-button-on-accent` and `--ui-choice-on-accent` override it per component. |
| `--ui-on-primary` | `color( from var(--ui-primary) xyz-d65 calc(0.9505 * (0.0012 + 0.9988 * clamp(0, (0.182 - y) * 1000, 1))) calc(0.0012 + 0.9988 * clamp(0, (0.182 - y) * 1000, 1)) calc(1.089 * (0.0012 + 0.9988 * clamp(0, (0.182 - y) * 1000, 1))) )` | Text color on `--ui-primary`. Derived with relative color from the primary's relative luminance (the `y` of `xyz-d65`): white on a primary below 0.182, near-black above it, so either side keeps 4.5:1 and a custom `--ui-primary` gets readable text. |
| `--ui-primary` | `light-dark( oklch( from var(--ui-primary-source) min(l, var(--ui-primary-max-lightness)) c h ), oklch( from var(--ui-primary-source) max(l, var(--ui-primary-min-lightness)) min(c, var(--ui-accent-max-chroma)) h ) )` | Brand color for primary actions and accents. Derived from `--ui-primary-source` within `--ui-primary-max-lightness` and `--ui-primary-min-lightness`. Set `--ui-primary-source` to keep more contrast working, or this token to pin the color. |
| `--ui-primary-tonal` | Unset | Background of `Button` and `ButtonGroup` with `.ui-primary` and `.ui-tonal`, and of a checked `Checkbox`, `Radio` or `Switch` card. When unset, buttons use `--ui-palette-tint` and cards `--ui-primary` at `--ui-state-active-alpha-accent`. Material's `primary-container` and shadcn's `secondary` go here. |
| `--ui-radius` | `0.5rem` | Corner radius for every component: cards, callouts, menus, buttons and fields follow it, and small parts like `kbd`, tooltips and checkboxes never get rounder than it. Set it to `0` for square corners. Takes a single length. |
| `--ui-radius-round` | `1e5px` | The pill radius for round buttons, avatars, badges, chips, radios, switches, the range track and the carousel buttons and markers. |
| `--ui-shadow-elevated` | `0 -1px 3px 0 hsl(from var(--ui-shadow-color) h s l / calc(alpha + 0.02)), 0 1px 2px -5px hsl(from var(--ui-shadow-color) h s l / calc(alpha + 0.02)), 0 2px 5px -5px hsl(from var(--ui-shadow-color) h s l / calc(alpha + 0.04)), 0 4px 12px -5px hsl(from var(--ui-shadow-color) h s l / calc(alpha + 0.05)), 0 12px 15px -5px hsl(from var(--ui-shadow-color) h s l / calc(alpha + 0.07))` | Shadow of elevated `Card` and `Accordion`. Five layers of `--ui-shadow-color`, which follows the color scheme, also in `.ui-light` and `.ui-dark` parts of the page. |
| `--ui-shadow-surface` | `none` | Shadow of tonal and outlined `Card` and `Accordion`, and of `Callout`. `none` by default, for themes that put every surface on the same plane. |
| `--ui-space-1` | `calc(0.25rem * var(--ui-space-scale))` | Spacing step 1: `0.25rem` times `--ui-space-scale`. |
| `--ui-space-2` | `calc(0.5rem * var(--ui-space-scale))` | Spacing step 2: `0.5rem` times `--ui-space-scale`. |
| `--ui-space-3` | `calc(1rem * var(--ui-space-scale))` | Spacing step 3: `1rem` times `--ui-space-scale`. |
| `--ui-space-4` | `calc(1.25rem * var(--ui-space-scale))` | Spacing step 4: `1.25rem` times `--ui-space-scale`. |
| `--ui-space-5` | `calc(1.5rem * var(--ui-space-scale))` | Spacing step 5: `1.5rem` times `--ui-space-scale`. |
| `--ui-space-8` | `calc(3rem * var(--ui-space-scale))` | Spacing step 8: `3rem` times `--ui-space-scale`. |
| `--ui-state-active-alpha-accent` | `25%` | Alpha of the pressed state layer on primary and critical buttons. |
| `--ui-state-hover-alpha-accent` | `15%` | Alpha of the hover state layer on primary and critical buttons. |
| `--ui-surface` | `light-dark(var(--ui-gray-1), var(--ui-gray-13))` | Page and card background. |
| `--ui-surface-elevated` | `light-dark(var(--ui-gray-1), var(--ui-gray-12))` | Background of elevated cards and accordions, dialogs, drawers, menus and native `Select` options. |
| `--ui-surface-tonal` | `light-dark(var(--ui-gray-3), var(--ui-gray-12))` | Background of tonal variants. |
| `--ui-surface-tonal-hover` | `light-dark( oklch(from var(--ui-surface-tonal) calc(l * 0.93) c h), oklch(from var(--ui-surface-tonal) calc(l * 1.1) c h) )` | Hover fill of a `--ui-surface-tonal` surface: clickable `Chip`s and filled `TextField`, `Select` and `Textarea` fields. Derived from `--ui-surface-tonal`, darker in light mode and lighter in dark mode. |
| `--ui-switch-thumb-bg-color` | `light-dark( var(--ui-gray-11), var(--ui-gray-14) )` | Color of the unchecked `Switch` thumb. The checked thumb uses `--ui-choice-on-accent`. |
| `--ui-switch-thumb-size` | `calc(1rem * var(--ui-density))` | Diameter of the `Switch` thumb. |
| `--ui-switch-thumb-size-large` | `calc(1.25rem * var(--ui-density))` | Diameter of the `Switch` thumb with `.ui-large`. |
| `--ui-switch-thumb-size-small` | `calc(0.75rem * var(--ui-density))` | Diameter of the `Switch` thumb with `.ui-small`, and in `List` rows unless the switch has a size class. |
| `--ui-switch-thumb-size-x-small` | `calc(0.625rem * var(--ui-density))` | Diameter of the `Switch` thumb with `.ui-x-small`. |
| `--ui-switch-track-bg-color` | `light-dark(var(--ui-gray-3), var(--ui-gray-8))` | Background of the unchecked `Switch` track when `--ui-track-bg-color` is unset. |
| `--ui-switch-track-block-size` | `calc(1.5rem * var(--ui-density))` | Height of the `Switch` track. |
| `--ui-switch-track-block-size-large` | `calc(1.75rem * var(--ui-density))` | Height of the `Switch` track with `.ui-large`. |
| `--ui-switch-track-block-size-small` | `calc(1.25rem * var(--ui-density))` | Height of the `Switch` track with `.ui-small`, and in `List` rows unless the switch has a size class. |
| `--ui-switch-track-block-size-x-small` | `calc(1rem * var(--ui-density))` | Height of the `Switch` track with `.ui-x-small`. |
| `--ui-switch-track-inline-size` | `calc(2 * var(--ui-switch-track-block-size))` | Width of the `Switch` track. Twice `--ui-switch-track-block-size` until a theme sets it. |
| `--ui-switch-track-inline-size-large` | `calc( 2 * var(--ui-switch-track-block-size-large) )` | Width of the `Switch` track with `.ui-large`. Twice `--ui-switch-track-block-size-large` until a theme sets it. |
| `--ui-switch-track-inline-size-small` | `calc( 2 * var(--ui-switch-track-block-size-small) )` | Width of the `Switch` track with `.ui-small`, and in `List` rows unless the switch has a size class. Twice `--ui-switch-track-block-size-small` until a theme sets it. |
| `--ui-switch-track-inline-size-x-small` | `calc( 2 * var(--ui-switch-track-block-size-x-small) )` | Width of the `Switch` track with `.ui-x-small`. Twice `--ui-switch-track-block-size-x-small` until a theme sets it. |
| `--ui-text` | `light-dark( color-mix( in oklch, var(--ui-text-strong) var(--ui-text-strength-light), var(--ui-surface) ), color-mix( in oklch, var(--ui-text-strong) var(--ui-text-strength-dark), var(--ui-surface) ) )` | Body text color. `--ui-text-strong` mixed into `--ui-surface` at `--ui-text-strength-light` or `--ui-text-strength-dark`. |
| `--ui-text-strong` | `light-dark(var(--ui-gray-15), var(--ui-gray-1))` | Strongest text color, for headings, labels and values. Body text is `--ui-text`. |
| `--ui-track-bg-color` | Unset | The empty part of a track: the unchecked `Switch`, `Progress` and the `Range` track. When unset, `Progress` and tonal ranges use `--ui-surface-tonal`, the default range its field border and the switch `--ui-switch-track-bg-color`. |

The stylesheets on this page read these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/svelte/guide/theme-tokens.md).

## Component properties

Set these on the component itself, inline or in your own CSS. Inputs are the knobs. Outputs are derived from the inputs and the current state, so overriding one fixes it in every state. [Customizing](https://open-props-ui.netlify.app/svelte/guide/customizing.md#component-properties) has examples.

### card.css

A dependency, from [Card](https://open-props-ui.netlify.app/svelte/components/card.md).

| Property | Kind | Description |
| --- | --- | --- |
| `--_bg-color` | Output | The current background. Set by the variants. |
| `--_border-color` | Output | The current border color. Set by the variants (`--ui-border-color-raised` in `.ui-tonal` and `.ui-elevated` when a theme sets it) and by hovering `.ui-card-link`. |
| `--_border-width` | Output | The current border width. Set by the variants. |
| `--_duration` | Output | Duration of the focus ring animation, `--ui-duration` times `--_motion`. |
| `--_ease` | Input | Easing of the focus ring animation. Defaults to `--ui-ease`. |
| `--_elevated-bg-color` | Input | Background of `.ui-elevated`. Defaults to `--ui-surface-elevated`. |
| `--_elevated-shadow` | Input | Shadow of `.ui-elevated`. Defaults to `--ui-shadow-elevated`. |
| `--_motion` | Input | Motion multiplier for the focus ring animation. `0` turns it off. |
| `--_outlined-border-color` | Input | Border color of `.ui-outlined`. Defaults to `--ui-border-color`. |
| `--_padding` | Input | Padding of the header, content and actions. `--ui-card-padding`, or `--ui-space-3` when a theme leaves it unset. |
| `--_shadow` | Output | The current shadow. `.ui-elevated` sets `--_elevated-shadow`, `.ui-tonal` and `.ui-outlined` set `--ui-shadow-surface`. |
| `--_surface-bg-color` | Input | Background of default and `.ui-outlined` cards, and border color of `.ui-tonal` and `.ui-elevated` unless a theme sets `--ui-border-color-raised`. Defaults to `--ui-surface`. |
| `--_tonal-bg-color` | Input | Background of `.ui-tonal`. Defaults to `--ui-surface-tonal`. |

### choice.css

| Property | Kind | Description |
| --- | --- | --- |
| `--_accent` | Input | Fill and border of the checked input. `--ui-choice-accent` when the theme sets it, otherwise `--ui-primary` with its lightness capped in dark mode, and `--ui-invalid` when invalid. |
| `--_bg-color` | Output | Background of `.ui-card`, read by `card.css`. The surface by default, `--_hover-bg-color` when hovered and `--_checked-bg-color` when checked. |
| `--_border-color` | Output | Border of `.ui-card`, read by `card.css`. `--ui-border-color` by default, `--_accent` when checked and `--ui-invalid` when invalid. |
| `--_border-width` | Output | Border width of `.ui-card`, read by `card.css`. `--ui-border-width`. |
| `--_card-padding` | Input | Padding of `.ui-card`. `--ui-space-3`, and `--ui-space-2` in `.ui-small` and `.ui-x-small`. |
| `--_checked-bg-color` | Input | Background of a checked `.ui-card`. `--ui-primary-tonal` when the theme sets it, otherwise `--ui-primary` at `--ui-state-active-alpha-accent`. |
| `--_duration` | Output | Duration of the transitions, `--ui-duration` times `--_motion`. |
| `--_ease` | Input | Easing of the transitions. Defaults to `--ui-ease`. |
| `--_hover-bg-color` | Input | Background of a hovered `.ui-card`. Defaults to `--ui-surface-tonal-hover`. |
| `--_motion` | Input | Motion multiplier for the transitions. `0` turns them off. |
| `--_on-accent` | Input | Color of the checkmark, dash and dots on `--_accent`. `--ui-choice-on-accent` when the theme sets it, otherwise `--ui-on-primary`, or `--ui-on-accent` in dark mode. `--ui-on-accent` when invalid. |
| `--_ripple-size` | Input | Size of the hover ripple of checkboxes and radios, relative to the input. Set on `input`. |
| `--_shadow` | Output | Shadow of `.ui-card`, read by `card.css`. `--ui-shadow-surface` unless `.ui-tonal` or `.ui-elevated` set their own. |
| `--_size` | Input | Width and height of the checkbox and radio input, which the label centers on. Defaults to `--ui-choice-size`, set by the size classes. `switch.css` sets it to the track height. |
| `--_thumb-scale` | Output | Current scale of the ripple. Set by the hover and active states. |

### switch.css

| Property | Kind | Description |
| --- | --- | --- |
| `--_accent` | Input | Fill and border of the checked track. In forced colors `SelectedItem`, `GrayText` when disabled. |
| `--_duration` | Output | Duration of the transitions, `--ui-duration` times `--_motion`. |
| `--_ease` | Input | Easing of the transitions. Defaults to `--ui-ease`. |
| `--_icon-size` | Output | Size of the `.ui-icon-checked` and `.ui-icon-unchecked` icons, computed to fit beside the thumb. |
| `--_motion` | Input | Motion multiplier for the transitions. `0` turns them off. |
| `--_on-accent` | Input | Color of the checked thumb on `--_accent`. `SelectedItemText` in forced colors. |
| `--_size` | Output | Height the label in `choice.css` centers on, `--_track-block-size`. |
| `--_thumb-bg-color` | Input | Color of the unchecked thumb. Defaults to `--ui-switch-thumb-bg-color`. The checked thumb uses `--_on-accent`. |
| `--_thumb-inset` | Output | Gap between the thumb and the track edge, computed from `--_track-block-size` and `--_thumb-size`. |
| `--_thumb-outline-size` | Output | Current outline width that grows the thumb. Set by the checked and active states. |
| `--_thumb-size` | Input | Width and height of the thumb. Defaults to `--ui-switch-thumb-size`, set by the size classes. |
| `--_track-bg-color` | Input | Background of the unchecked track. `--ui-track-bg-color` when the theme sets it, otherwise `--ui-switch-track-bg-color`. |
| `--_track-block-size` | Input | Height of the track. Defaults to `--ui-switch-track-block-size`, set by the size classes. |
| `--_track-border-color` | Input | Border of the unchecked track. Defaults to `--ui-choice-border-color`, or `--ui-field-border-color` when the theme leaves it unset, like the checkbox and radio borders. The checked track uses `--_accent`. |
| `--_track-inline-size` | Input | Width of the track. Defaults to `--ui-switch-track-inline-size`, set by the size classes. |

## Installation

Import the component from `opui-css/svelte`:

### Dependencies

- [Form](https://open-props-ui.netlify.app/svelte/components/form.md)
- [Card](https://open-props-ui.netlify.app/svelte/components/card.md)

Copy the CSS into your project to own it. It reads tokens from Open Props, `palette.css` and `theme.css`, so those go on the page too, after `layers.css`. See [Getting started](https://open-props-ui.netlify.app/svelte/guide/getting-started.md).

- `opui-css/css/components/switch.css`
- `opui-css/css/components/choice.css`
- `opui-css/css/components/form.css`
- `opui-css/css/components/card.css`

## Used in blocks

- [Account settings](https://open-props-ui.netlify.app/blocks/account-settings.md)
- [Notification settings](https://open-props-ui.netlify.app/blocks/notification-settings.md)
