# Anchor

A structural primitive to enable CSS Anchor Positioning on stuff.

## Anatomy

Floating content

- `<Anchor>`

  Container element. Scopes the anchor to its content.

- `& > :first-child`

  The content the floating content is anchored to.

- `<AnchorContent>`

  The floating content.

## Always visible

Floating content that is always shown, like a coach mark beside a button. Put it in `AnchorContent`, and set `positionArea` to any `position-area` value to place it.

```tsx
import {
  Anchor,
  AnchorContent,
  Button,
  Card,
  CardContent,
} from "opui-css/react"

export default function AlwaysVisible() {
  return (
    <>
      <Anchor positionArea="inline-end">
        <Button variant="outlined">Export</Button>
        <AnchorContent>
          <Card variant="tonal" className="coach-mark">
            <CardContent>
              <strong>New</strong> Export to PDF and CSV from the same menu.
            </CardContent>
          </Card>
        </AnchorContent>
      </Anchor>
      <style>{`
        .coach-mark {
          font-size: var(--font-size-1);
          margin-inline-start: var(--size-2);
          max-inline-size: 220px;
        }
      `}</style>
    </>
  )
}
```

## Hover trigger

Set `trigger="hover"` and an `id`, and add `interestfor` with that id to the trigger. `AnchorContent` gets the id and `popover="hint"`.

[Under the hood](#under-the-hood) shows how hover, focus and tap open the card.

Put a [Card](https://open-props-ui.netlify.app/react/components/card.md) in the floating content for hover cards like GitHub's repository previews. Align the card below the trigger with `block-end span-inline-end`. It flips to the other side when there isn't room. The card keeps its interactive content reachable, so the pointer can move from the link into the card without closing it.

```tsx
import {
  Anchor,
  AnchorContent,
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
} from "opui-css/react"

export default function RepoCard() {
  return (
    <>
      <div>
        The source lives in{" "}
        <Anchor
          positionArea="block-end span-inline-end"
          trigger="hover"
          id="anchor-repo-card-1"
        >
          <a
            className="ui-link"
            href="https://github.com/felix-bohlin/ui"
            interestfor="anchor-repo-card-1"
          >
            felix-bohlin/ui
          </a>
          <AnchorContent>
            <Card variant="elevated" className="repo-card">
              <CardContent>
                <div className="repo-card-identity">
                  <Avatar
                    src="https://github.com/felix-bohlin.png"
                    alt=""
                    shape="rounded"
                  />
                  <div>
                    <strong>felix-bohlin/ui</strong>
                    <span className="ui-caption">Public repository</span>
                  </div>
                </div>
                <p>
                  A CSS UI library exploring how next-gen HTML &amp; CSS
                  features can change the way we create components.
                </p>
                <p className="ui-caption">CSS, MIT license</p>
              </CardContent>
              <CardActions>
                <Button variant="outlined" size="small">
                  Star
                </Button>
              </CardActions>
            </Card>
          </AnchorContent>
        </Anchor>{" "}
        on GitHub.
      </div>
      <style>{`
        .repo-card {
          font-size: var(--ui-font-size-small);
          inline-size: 280px;
          margin-block-start: var(--size-2);
        }

        .repo-card .ui-content {
          display: grid;
          gap: var(--size-2);
        }

        .repo-card-identity {
          align-items: center;
          display: flex;
          gap: var(--size-3);
        }

        .repo-card-identity > div {
          display: grid;
        }
      `}</style>
    </>
  )
}
```

## Link preview

Preview where a link goes before following it.

```tsx
import { Anchor, AnchorContent, Card, CardHeader } from "opui-css/react"

export default function LinkPreview() {
  return (
    <>
      <div>
        Learn more about{" "}
        <Anchor
          positionArea="block-end span-inline-end"
          trigger="hover"
          id="anchor-link-preview-1"
        >
          <a
            className="ui-link"
            href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning"
            interestfor="anchor-link-preview-1"
          >
            CSS anchor positioning
          </a>
          <AnchorContent>
            <Card variant="elevated" className="link-preview">
              <img src="https://picsum.photos/id/1018/800/450" alt="" />
              <CardHeader>
                <p className="ui-caption">developer.mozilla.org</p>
                <h3>CSS anchor positioning</h3>
                <p>
                  Tether elements to other elements on the page, without
                  JavaScript.
                </p>
              </CardHeader>
            </Card>
          </AnchorContent>
        </Anchor>{" "}
        on MDN.
      </div>
      <style>{`
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
      `}</style>
    </>
  )
}
```

## API

### Anchor API

| Prop           | Type                   | Default                 | Description                                                                                                                                                                                                        |
| -------------- | ---------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `children`     | `ReactNode`            | -                       | The content to anchor to, followed by `AnchorContent`.                                                                                                                                                             |
| `id`           | `string`               | -                       | The id of the root. With `trigger="hover"`, the id of `AnchorContent`. Add `interestfor` with the same id to the trigger.                                                                                          |
| `positionArea` | `string`               | `"self-start self-end"` | Any valid `position-area` value. Controls where the floating content is placed. The `self-` keywords follow the content's own direction, so the placement mirrors in a right-to-left part of a left-to-right page. |
| `trigger`      | `"always"` , `"hover"` | `"always"`              | Shows the floating content always, or on hover and focus with `popover="hint"`.                                                                                                                                    |

## Component properties

Set these on the component itself, inline or in your own CSS. Inputs are the knobs. Outputs are derived from the inputs and the current state, so overriding one fixes it in every state. [Customizing](https://open-props-ui.netlify.app/react/guide/customizing.md#component-properties) has examples.

| Property       | Kind  | Description                                                 |
| -------------- | ----- | ----------------------------------------------------------- |
| `--_anchor-tx` | Input | Horizontal shift of `.ui-anchor-floating`. Defaults to `0`. |
| `--_anchor-ty` | Input | Vertical shift of `.ui-anchor-floating`. Defaults to `0`.   |

## Under the hood

Read the post: [Hover cards without JavaScript](https://open-props-ui.netlify.app/learn/anchor-hover-cards)

1. Hint

   - `interestfor` opens it on hover and keyboard focus, no JavaScript
   - Only `<button>`, `<a href>` and `<area>` can be interest invokers
   - `popover="hint"` leaves open menus and dialogs alone
   - Without positioning it opens in the middle of the viewport

2. Tap

   - Touch screens can't hover, so a tap toggles the card instead
   - A link can't take `commandfor`, so tapping a link follows it

3. Anchor

   - The invoker is the implicit anchor: no `anchor-name`, no `position-anchor`
   - `position-area` places it below, spanning towards the end
   - A card that's always visible has no invoker, so it needs `anchor-name` and `position-anchor`

4. Flip

   - Scroll the trigger to the bottom of the window and hover it again
   - The browser tries each fallback when the card would overflow
   - `anchors-visible` hides it when the trigger scrolls out of view

Step 1 of 4: Hint

- [Interest invokers ](https://webstatus.dev/features/interest-invokers)(Limited availability): Chrome 142+, Edge 142+, Firefox not supported, Safari not supported
- [popover="hint" ](https://webstatus.dev/features/popover-hint)(Limited availability): Chrome 151+, Edge 151+, Firefox 153+, Safari not supported

```html
<button type="button" interestfor="card">felix-bohlin/ui</button>

<div class="card" id="card" popover="hint">…</div>
```

```css
.card {
  background-color: var(--ui-surface-elevated);
  border: 1px solid var(--ui-surface-default);
  border-radius: var(--ui-radius);
  box-shadow: var(--ui-shadow-elevated);
  color: inherit;
  inline-size: 18rem;
  padding: 1rem;
}
```

Step 2 of 4: Tap

- [Invoker commands ](https://webstatus.dev/features/invoker-commands)(Newly available): Chrome 135+, Edge 135+, Firefox 144+, Safari 26.2+

```html
<button
  type="button"
  interestfor="card"
  commandfor="card"
  command="toggle-popover"
>
  felix-bohlin/ui
</button>
```

Step 3 of 4: Anchor

- [Anchor positioning ](https://webstatus.dev/features/anchor-positioning)(Limited availability): Chrome 151+, Edge 151+, Firefox 151+, Safari 27+

```css
.card {
  inset: auto;
  margin: 0.5rem 0 0;
  position-area: block-end span-inline-end;
}
```

Step 4 of 4: Flip

```css
.card {
  position-try-fallbacks:
    flip-block,
    flip-inline,
    flip-block flip-inline;
  position-visibility: anchors-visible;
}
```

## Browser support

- Chromium: Full support Supported since v151.
- Firefox: Partial support Missing: interest-invokers.
- Safari: Partial support Missing: interest-invokers, popover-hint.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/react/guide/browser-support/?components=Anchor.md).

## Installation

Import the components from `opui-css/react`:

### Used by

- [Badge](https://open-props-ui.netlify.app/react/components/badge.md)
- [Tooltip](https://open-props-ui.netlify.app/react/components/tooltip.md)

Copy the CSS into your project to own it. It reads tokens from Open Props, `palette.css` and `theme.css`, so those go on the page too, after `layers.css`. See [Getting started](https://open-props-ui.netlify.app/react/guide/getting-started.md).

- `opui-css/css/components/anchor.css`
