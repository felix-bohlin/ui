# Anchor

A structural primitive to enable CSS Anchor Positioning on stuff.

## Anatomy

Floating content

- `<Anchor>`

  Container element. Scopes the anchor to its content.

- `slot="default"`

  The content the floating content is anchored to.

- `slot="anchored"`

  The floating content.

## Always visible

Floating content that is always shown, like a coach mark beside a button. Set `alignment` to any `position-area` value to place it.

```astro
---
import { Anchor, Button, Card } from "opui-css/astro"
---


<Anchor alignment="inline-end">
  <Button variant="outlined">Export</Button>
  <Card slot="anchored" variant="tonal" class="coach-mark">
    <Fragment slot="content">
      <strong>New</strong> Export to PDF and CSV from the same menu.
    </Fragment>
  </Card>
</Anchor>


<style>
  .coach-mark {
    font-size: var(--font-size-1);
    margin-inline-start: var(--size-2);
    max-inline-size: 220px;
  }
</style>
```

## Hover trigger

Set `trigger="hover"` and an `id`, and add `interestfor` with that id to the trigger. The component adds `popover="hint"`.

The trigger has to be a `button` or a link with an `href`, since those are the elements that support `interestfor`. Pointer and keyboard users show interest by hovering or focusing the trigger. Add `commandfor` and `command="toggle-popover"` to a button trigger so touch devices can tap to show the floating content. A link can't take `commandfor`, so tapping it follows the link instead.

Put a [Card](https://open-props-ui.netlify.app/astro/components/card.md) in the floating content for hover cards like GitHub's profile previews. Align the card below the trigger with `block-end span-inline-end`. It flips to the other side when there isn't room.

```astro
---
import { Anchor, Avatar, Button, Card } from "opui-css/astro"
---


<div>
  <Anchor
    alignment="block-end span-inline-end"
    trigger="hover"
    id="profile-card"
  >
    <a class="ui-link" href="#" interestfor="profile-card">@adalindqvist</a>
    <Card slot="anchored" variant="elevated" class="profile-card">
      <Fragment slot="content">
        <div class="profile-card-identity">
          <Avatar
            src="https://images.unsplash.com/photo-1614530606961-c4ce986825c1?q=80&w=1827&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
          <div>
            <strong>Ada Lindqvist</strong>
            <span class="ui-caption">@adalindqvist</span>
          </div>
        </div>
        <p>
          Design engineer. Building accessible component libraries and writing
          about CSS.
        </p>
        <p class="ui-caption">Stockholm · Joined March 2024</p>
      </Fragment>
      <Button slot="actions" variant="outlined" size="small">Follow</Button>
    </Card>
  </Anchor>
  approved these changes.
</div>


<style>
  .profile-card {
    font-size: var(--font-size-05);
    inline-size: 280px;
    margin-block-start: var(--size-2);
  }


  .profile-card .ui-content {
    display: grid;
    gap: var(--size-2);
  }


  .profile-card-identity {
    align-items: center;
    display: flex;
    gap: var(--size-3);
  }


  .profile-card-identity > div {
    display: grid;
  }
</style>
```

## Link preview

Preview where a link goes before following it. The card keeps its interactive content reachable, so the pointer can move from the link into the card without closing it.

```astro
---
import { Anchor, Card } from "opui-css/astro"
---


<div>
  Learn more about
  <Anchor
    alignment="block-end span-inline-end"
    trigger="hover"
    id="link-preview"
  >
    <a
      class="ui-link"
      href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning"
      interestfor="link-preview">CSS anchor positioning</a
    >
    <Card slot="anchored" variant="elevated" class="link-preview">
      <img src="https://picsum.photos/id/1018/800/450" alt="" />
      <hgroup>
        <p class="ui-caption">developer.mozilla.org</p>
        <h3>CSS anchor positioning</h3>
        <p>
          Tether elements to other elements on the page, without JavaScript.
        </p>
      </hgroup>
    </Card>
  </Anchor>
  on MDN.
</div>


<style>
  .link-preview {
    inline-size: 280px;
    margin-block-start: var(--size-2);
  }


  .link-preview img {
    aspect-ratio: 16 / 9;
    inline-size: 100%;
    object-fit: cover;
  }


  .link-preview hgroup {
    padding-block-start: 0;
  }


  .link-preview h3 {
    font-size: var(--font-size-2);
    margin-block: var(--size-1);
  }
</style>
```

## Used by

- [Badge](https://open-props-ui.netlify.app/astro/components/badge.md)
- [Tooltip](https://open-props-ui.netlify.app/astro/components/tooltip.md)

## API

### Anchor API

| Prop        | Type                  | Default       | Description                                                                                                    |
| ----------- | --------------------- | ------------- | -------------------------------------------------------------------------------------------------------------- |
| `alignment` | `string`              | `"start end"` | Any valid `position-area` value. Controls where the floating content is placed.                                |
| `id`        | `string`              | -             | The id of the floating content when `trigger` is `"hover"`. Add `interestfor` with the same id to the trigger. |
| `trigger`   | `"always"`, `"hover"` | `"always"`    | Shows the floating content always, or on hover and focus with `popover="hint"`.                                |

#### Slots

| Slot       | Description                                      |
| ---------- | ------------------------------------------------ |
| `anchored` | The floating content.                            |
| `default`  | The content the floating content is anchored to. |

## Browser support

- Chromium: Full support Supported since v144.
- Firefox: Partial support Missing: interest-invokers.
- Safari: Partial support Missing: interest-invokers, popover-hint.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/astro/guide/browser-support/?components=Anchor.md).

## Installation

- `opui-css/css/components/anchor.css`

