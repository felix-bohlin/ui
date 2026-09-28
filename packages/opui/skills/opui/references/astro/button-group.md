# Button group

Groups related buttons.

- Button groups should consist of 2-5 buttons.
- Don't allow them to wrap onto a new line.
- If an icon is used without label text make sure the button communicates clearly what it does.

Button group or Toggle group?

If your buttons depend on state (controlled) - use [Toggle group](https://open-props-ui.netlify.app/astro/components/toggle.md).

If you just need to group a bunch of "dumb" (uncontrolled) buttons - use Button group.

## Variants

Change the appearance of the entire group with the `variant` prop.

```astro
---
import { ButtonGroup } from "opui-css/astro"
import { Button } from "opui-css/astro"
---


<ButtonGroup>
  <Button>Text</Button>
  <Button>Text</Button>
  <Button>Text</Button>
</ButtonGroup>


<ButtonGroup variant="outlined">
  <Button>Outlined</Button>
  <Button>Outlined</Button>
  <Button>Outlined</Button>
</ButtonGroup>


<ButtonGroup variant="tonal">
  <Button>Tonal</Button>
  <Button>Tonal</Button>
  <Button>Tonal</Button>
</ButtonGroup>


<ButtonGroup variant="filled">
  <Button>Filled</Button>
  <Button>Filled</Button>
  <Button>Filled</Button>
</ButtonGroup>
```

## Colors

Set the `color` prop to `primary` or `critical` to recolor the entire group. The default is a neutral gray.

```astro
---
import { ButtonGroup } from "opui-css/astro"
import { Button } from "opui-css/astro"
---


<ButtonGroup color="primary" variant="filled">
  <Button>Primary</Button>
  <Button>Primary</Button>
  <Button>Primary</Button>
</ButtonGroup>


<ButtonGroup color="critical" variant="filled">
  <Button>Critical</Button>
  <Button>Critical</Button>
  <Button>Critical</Button>
</ButtonGroup>
```

## Icons

Yes of course, they're just [buttons.](https://open-props-ui.netlify.app/astro/components/button.md)

```astro
---
import { ButtonGroup } from "opui-css/astro"
import { Button } from "opui-css/astro"


const checkIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M29.907 5.14a1.25 1.25 0 0 1-.047 1.767l-19 18a1.25 1.25 0 0 1-1.775-.055l-6.75-7.25a1.25 1.25 0 0 1 1.83-1.704l5.89 6.327L28.14 5.093a1.25 1.25 0 0 1 1.767.047"></path></svg>`
const helpIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M11.499 10.803A4.505 4.505 0 0 1 16 6.5a4.5 4.5 0 0 1 4.5 4.5c0 1.276-.298 2.02-.676 2.565c-.368.53-.836.925-1.471 1.459l-.286.241c-.745.632-1.614 1.42-2.268 2.628c-.659 1.217-1.049 2.76-1.049 4.857a1.25 1.25 0 0 0 2.5 0c0-1.778.328-2.892.748-3.667c.424-.783.993-1.324 1.685-1.91l.259-.217c.616-.515 1.363-1.139 1.937-1.966C22.579 13.98 23 12.724 23 11a7 7 0 0 0-7-7a7.005 7.005 0 0 0-6.999 6.695a1.25 1.25 0 1 0 2.498.108M16 29a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3"></path></svg>`
const closeIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M26.29 4.293a1 1 0 1 1 1.414 1.414L17.413 16l10.291 10.29a1 1 0 1 1-1.414 1.414L16 17.413L5.707 27.704a1 1 0 0 1-1.414-1.414L14.585 16L4.293 5.707a1 1 0 0 1 1.414-1.414L16 14.584z"></path></svg>`
---


<ButtonGroup variant="outlined">
  <Button aria-label="Label">
    <Fragment set:html={checkIcon} />
  </Button>
  <Button aria-label="Label"> Maybe </Button>
  <Button aria-label="Label">
    <Fragment set:html={closeIcon} />
  </Button>
</ButtonGroup>


<ButtonGroup variant="outlined">
  <Button>
    <Fragment set:html={checkIcon} />
    <span>OK</span>
  </Button>
  <Button>
    <Fragment set:html={helpIcon} />
    <span>Maybe</span>
  </Button>
  <Button>
    <Fragment set:html={closeIcon} />
    <span>No</span>
  </Button>
</ButtonGroup>
```

## Split button

A [Menu](https://open-props-ui.netlify.app/astro/components/menu.md) after the last button. `align="end"` lines it up with the group.

```astro
---
import { Button, ButtonGroup, Menu } from "opui-css/astro"


const chevronIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M5.293 11.293a1 1 0 0 1 1.414 0L16 20.586l9.293-9.293a1 1 0 1 1 1.414 1.414l-10 10a1 1 0 0 1-1.414 0l-10-10a1 1 0 0 1 0-1.414"></path></svg>`
---


<ButtonGroup variant="outlined">
  <Button>Save</Button>
  <Button
    aria-label="More save options"
    commandfor="split-button-menu"
    command="toggle-popover"
  >
    <Fragment set:html={chevronIcon} />
  </Button>
  <Menu
    id="split-button-menu"
    align="end"
    items={[{ label: "Save as draft" }, { label: "Save and publish" }]}
  />
</ButtonGroup>
```

## Sizes

Adjust the size of all buttons in the group using the `size` prop.

```astro
---
import { ButtonGroup } from "opui-css/astro"
import { Button } from "opui-css/astro"
---


<ButtonGroup size="small" variant="outlined">
  <Button>Small</Button>
  <Button>Small</Button>
  <Button>Small</Button>
</ButtonGroup>


<ButtonGroup variant="outlined">
  <Button>Default</Button>
  <Button>Default</Button>
  <Button>Default</Button>
</ButtonGroup>


<ButtonGroup size="large" variant="outlined">
  <Button>Large</Button>
  <Button>Large</Button>
  <Button>Large</Button>
</ButtonGroup>
```

## Vertical orientation

Change the layout of the group with the `orientation="vertical"` prop.

```astro
---
import { ButtonGroup } from "opui-css/astro"
import { Button } from "opui-css/astro"


const plusIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>`
const minusIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>`
---


<div class="example-row">
  <ButtonGroup orientation="vertical">
    <Button aria-label="Up">
      <Fragment set:html={plusIcon} />
    </Button>
    <Button aria-label="Decrease">
      <Fragment set:html={minusIcon} />
    </Button>
  </ButtonGroup>


  <ButtonGroup orientation="vertical" variant="outlined">
    <Button aria-label="Up">
      <Fragment set:html={plusIcon} />
    </Button>
    <Button aria-label="Decrease">
      <Fragment set:html={minusIcon} />
    </Button>
  </ButtonGroup>


  <ButtonGroup orientation="vertical" variant="tonal">
    <Button aria-label="Up">
      <Fragment set:html={plusIcon} />
    </Button>
    <Button aria-label="Decrease">
      <Fragment set:html={minusIcon} />
    </Button>
  </ButtonGroup>


  <ButtonGroup orientation="vertical" variant="filled">
    <Button aria-label="Up">
      <Fragment set:html={plusIcon} />
    </Button>
    <Button aria-label="Decrease">
      <Fragment set:html={minusIcon} />
    </Button>
  </ButtonGroup>
</div>


<div class="example-row">
  <ButtonGroup orientation="vertical">
    <Button>Up</Button>
    <Button>Down</Button>
  </ButtonGroup>


  <ButtonGroup orientation="vertical" variant="outlined">
    <Button>Up</Button>
    <Button>Down</Button>
  </ButtonGroup>


  <ButtonGroup orientation="vertical" variant="tonal">
    <Button>Up</Button>
    <Button>Down</Button>
  </ButtonGroup>


  <ButtonGroup orientation="vertical" variant="filled">
    <Button>Up</Button>
    <Button>Down</Button>
  </ButtonGroup>
</div>
```

## Disabled

Disable individual buttons within a group by setting the `disabled` prop on each `Button`.

```astro
---
import { ButtonGroup } from "opui-css/astro"
import { Button } from "opui-css/astro"
---


<ButtonGroup variant="filled">
  <Button>Enabled</Button>
  <Button disabled>Disabled</Button>
  <Button>Enabled</Button>
</ButtonGroup>


<ButtonGroup variant="filled" color="primary">
  <Button>Enabled</Button>
  <Button disabled>Disabled</Button>
  <Button>Enabled</Button>
</ButtonGroup>
```

## Anatomy

1. Container: `<element role="group" class="ui-button-group">`
2. Buttons: [Button](https://open-props-ui.netlify.app/astro/components/button.md)

## API

### Button group

### Button

## Browser support

- Chromium: Full support Supported since v111.
- Firefox: Full support Supported since v113.
- Safari: Full support Supported since v16.2.

See also the [full browser support guide](https://open-props-ui.netlify.app/astro/guide/browser-support.md).

## Installation

- `opui-css/css/components/button-group.css`

