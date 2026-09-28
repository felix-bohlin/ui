# Card

The card is extremely versatile and can be used on its own, or as a building block for [accordions](https://open-props-ui.netlify.app/astro/components/accordion.md), [dialogs](https://open-props-ui.netlify.app/astro/components/dialog.md) and more.

## Variants

Change the card variant with the `variant` prop.

```astro
---
import { Card } from "opui-css/astro"
---


<Card variant="text">
  <Fragment slot="content">Text</Fragment>
</Card>


<Card variant="outlined">
  <Fragment slot="content">Outlined</Fragment>
</Card>


<Card variant="tonal">
  <Fragment slot="content">Tonal</Fragment>
</Card>


<Card variant="elevated">
  <Fragment slot="content">Elevated</Fragment>
</Card>
```

**Why does a text variant exist?**

It really doesn't make sense to use the text variant unless you really need to. The [accordion group](https://open-props-ui.netlify.app/astro/components/accordion.md#accordion-group) is a great example where Open Props UI leverages the text variant of the`.ui-card` component.

## Header

Using the `header` slot.

```astro
---
import { Card } from "opui-css/astro"
---


<Card variant="outlined">
  <Fragment slot="header">
    <p>Blog</p>
    <h3>My ultra-great blog post</h3>
    <p>Please read it.</p>
  </Fragment>
</Card>
```

## Actions

Using the `actions` slot.

There are some basic styles here to get you going, but for more advanced use-cases (which always happen), you might want to add your own styles.

```astro
---
import { Card } from "opui-css/astro"
import { Button } from "opui-css/astro"
---


<Card variant="outlined">
  <Fragment slot="content">
    Notice how the buttons are made to align with the text above.
  </Fragment>
  <Fragment slot="actions">
    <Button>Cancel</Button>
    <Button>Save</Button>
  </Fragment>
</Card>


<Card variant="outlined">
  <Fragment slot="content"
    >Trying other button types too. Look at that!</Fragment
  >
  <Fragment slot="actions">
    <Button variant="outlined">Cancel</Button>
    <Button variant="filled">Save</Button>
  </Fragment>
</Card>


<Card variant="outlined">
  <Fragment slot="content">Icon buttons work too!</Fragment>
  <Fragment slot="actions">
    <Button ripple rounded size="small" aria-label="Favorite">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
      >
        <path
          fill="currentColor"
          d="M3.384 7.13c2.972-4.17 9.167-4.174 12.146-.008l.465.65l.417-.593c2.955-4.195 9.16-4.236 12.17-.081A7.48 7.48 0 0 1 28 16.583L16.732 28.681a1 1 0 0 1-1.464 0L3.992 16.54a7.46 7.46 0 0 1-.608-9.41m10.52 1.155c-2.181-3.05-6.716-3.046-8.892.007a5.46 5.46 0 0 0 .446 6.887L16.002 26.53l10.534-11.31a5.48 5.48 0 0 0 .427-6.95c-2.205-3.044-6.751-3.013-8.916.06l-1.229 1.744a1 1 0 0 1-1.63.006z"
        ></path>
      </svg>
    </Button>
    <Button ripple rounded size="small" aria-label="Share">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        ><path
          fill="currentColor"
          d="M14 3a1 1 0 1 1 0 2H7.5A2.5 2.5 0 0 0 5 7.5v17A2.5 2.5 0 0 0 7.5 27h17a2.5 2.5 0 0 0 2.5-2.5V19a1 1 0 1 1 2 0v5.5a4.5 4.5 0 0 1-4.5 4.5h-17A4.5 4.5 0 0 1 3 24.5v-17A4.5 4.5 0 0 1 7.5 3zm5.58-.907a1 1 0 0 1 1.067.146l10 8.5a1 1 0 0 1 0 1.523l-10 8.5A1 1 0 0 1 18.999 20v-3.96c-3.193.258-5.636 1.722-7.34 3.213a15.6 15.6 0 0 0-2.115 2.26c-.234.307-.407.56-.52.733c-.085.13-.136.215-.152.243l-.006.006l.001.001A1 1 0 0 1 7 22.036c0-.222-.003-.444.003-.666c.011-.406.042-.982.12-1.67c.155-1.37.5-3.218 1.265-5.08s1.967-3.776 3.855-5.225C13.948 8.086 16.161 7.2 19 7.032V3a1 1 0 0 1 .58-.907M20.998 8a1 1 0 0 1-1 1c-2.925 0-5.018.814-6.539 1.98c-1.533 1.177-2.551 2.763-3.224 4.4a16.5 16.5 0 0 0-.957 3.38c.318-.33.672-.672 1.062-1.013C12.462 15.891 15.687 14 19.999 14a1 1 0 0 1 1 1v2.838l7.456-6.338L21 5.161z"
        ></path></svg
      >
    </Button>
  </Fragment>
</Card>
```

### Alignment

Align actions to the end with the `actionsAlign="end"` prop.

```astro
---
import { Card } from "opui-css/astro"
import { Button } from "opui-css/astro"
---


<Card variant="outlined" actionsAlign="end">
  <Fragment slot="content">Buttons aligned to the end. Works too!</Fragment>
  <Fragment slot="actions">
    <Button>Cancel</Button>
    <Button>Save</Button>
  </Fragment>
</Card>


<Card variant="outlined" actionsAlign="end">
  <Fragment slot="content">Again, buttons are aligned to the end!</Fragment>
  <Fragment slot="actions">
    <Button variant="outlined">Cancel</Button>
    <Button variant="filled">Save</Button>
  </Fragment>
</Card>


<Card variant="outlined" actionsAlign="end">
  <Fragment slot="content">Icon buttons aligned to the end!</Fragment>
  <Fragment slot="actions">
    <Button ripple rounded size="small" aria-label="Favorite">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
      >
        <path
          fill="currentColor"
          d="M3.384 7.13c2.972-4.17 9.167-4.174 12.146-.008l.465.65l.417-.593c2.955-4.195 9.16-4.236 12.17-.081A7.48 7.48 0 0 1 28 16.583L16.732 28.681a1 1 0 0 1-1.464 0L3.992 16.54a7.46 7.46 0 0 1-.608-9.41m10.52 1.155c-2.181-3.05-6.716-3.046-8.892.007a5.46 5.46 0 0 0 .446 6.887L16.002 26.53l10.534-11.31a5.48 5.48 0 0 0 .427-6.95c-2.205-3.044-6.751-3.013-8.916.06l-1.229 1.744a1 1 0 0 1-1.63.006z"
        ></path>
      </svg>
    </Button>
    <Button ripple rounded size="small" aria-label="Share">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        ><path
          fill="currentColor"
          d="M14 3a1 1 0 1 1 0 2H7.5A2.5 2.5 0 0 0 5 7.5v17A2.5 2.5 0 0 0 7.5 27h17a2.5 2.5 0 0 0 2.5-2.5V19a1 1 0 1 1 2 0v5.5a4.5 4.5 0 0 1-4.5 4.5h-17A4.5 4.5 0 0 1 3 24.5v-17A4.5 4.5 0 0 1 7.5 3zm5.58-.907a1 1 0 0 1 1.067.146l10 8.5a1 1 0 0 1 0 1.523l-10 8.5A1 1 0 0 1 18.999 20v-3.96c-3.193.258-5.636 1.722-7.34 3.213a15.6 15.6 0 0 0-2.115 2.26c-.234.307-.407.56-.52.733c-.085.13-.136.215-.152.243l-.006.006l.001.001A1 1 0 0 1 7 22.036c0-.222-.003-.444.003-.666c.011-.406.042-.982.12-1.67c.155-1.37.5-3.218 1.265-5.08s1.967-3.776 3.855-5.225C13.948 8.086 16.161 7.2 19 7.032V3a1 1 0 0 1 .58-.907M20.998 8a1 1 0 0 1-1 1c-2.925 0-5.018.814-6.539 1.98c-1.533 1.177-2.551 2.763-3.224 4.4a16.5 16.5 0 0 0-.957 3.38c.318-.33.672-.672 1.062-1.013C12.462 15.891 15.687 14 19.999 14a1 1 0 0 1 1 1v2.838l7.456-6.338L21 5.161z"
        ></path></svg
      >
    </Button>
  </Fragment>
</Card>
```

## Anatomy

Open Props UI include these complementary utility components to handle various use cases:

1. Container
2. `header` slot (optional): a wrapper for the card header
3. `content` slot (optional): a wrapper for the card content
4. `default` slot (optional): raw content placed directly in the card
5. `actions` slot (optional): a wrapper that groups a set of buttons

## API

| Prop           | Type                                           | Default | Description                       |
| -------------- | ---------------------------------------------- | ------- | --------------------------------- |
| Slots          | `header`, `content`, `actions`,`default`       | -       | Optional slots.                   |
| `actionsAlign` | `"start"`, `"end"`                             | -       | Alignment for the `actions` slot. |
| `variant`      | `"text"`, `"outlined"`, `"tonal"`,`"elevated"` | -       | The variant to use.               |

## Browser support

- Chromium: Full support Supported since v111.
- Firefox: Full support Supported since v151.
- Safari: Full support Supported since v18.

See also the [full browser support guide](https://open-props-ui.netlify.app/astro/guide/browser-support.md).

## Installation

Other components might depend on the card component. Be mindful when making changes. [Accordion](https://open-props-ui.netlify.app/astro/components/accordion.md), [Dialog](https://open-props-ui.netlify.app/astro/components/dialog.md)

- `opui-css/css/components/card.css`

