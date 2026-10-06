# Anchor

A structural primitive to enable CSS Anchor Positioning on stuff.

**Solid.** Import components from `opui-css/solid`. Props follow the same API as in the Astro sections below, and named slots are passed as props; static HTML notes describe class-based markup when you are not using Solid components.

## Anatomy

Floating content

- `<Anchor>`

  Container element. Scopes the anchor to its content.

- `children`

  The content the floating content is anchored to.

- `anchored`

  The floating content.

## Always visible

Floating content that is always shown, like a coach mark beside a button. Set `alignment` to any `position-area` value to place it.

```tsx
import { Anchor, Button, Card } from "opui-css/solid"


export default function Example() {
  return (
    <Anchor
      alignment="inline-end"
      anchored={
        <Card
          variant="tonal"
          class="coach-mark"
          content={
            <>
              <strong>New</strong> Export to PDF and CSV from the same menu.
            </>
          }
        />
      }
    >
      <Button variant="outlined">Export</Button>
    </Anchor>
  )
}
```

## Hover trigger

Set `trigger="hover"` and an `id`, and add `interestfor` with that id to the trigger. The component adds `popover="hint"`.

[Under the hood](#under-the-hood) shows how hover, focus and tap open the card.

Put a [Card](https://open-props-ui.netlify.app/solid/components/card.md) in the floating content for hover cards like GitHub's repository previews. Align the card below the trigger with `block-end span-inline-end`. It flips to the other side when there isn't room.

```tsx
import { Anchor, Avatar, Button, Card } from "opui-css/solid"


export default function Example() {
  return (
    <div>
      The source lives in{" "}
      <Anchor
        alignment="block-end span-inline-end"
        trigger="hover"
        id="anchor-repo-card"
        anchored={
          <Card
            variant="elevated"
            class="repo-card"
            content={
              <>
                <div class="repo-card-identity">
                  <Avatar
                    src="https://github.com/felix-bohlin.png"
                    alt=""
                    variant="rounded"
                  />
                  <div>
                    <strong>felix-bohlin/ui</strong>
                    <span class="ui-caption">Public repository</span>
                  </div>
                </div>
                <p>
                  A CSS UI library exploring how next-gen HTML & CSS
                  features can change the way we create components.
                </p>
                <p class="ui-caption">CSS · MIT license</p>
              </>
            }
            actions={
              <Button variant="outlined" size="small">
                Star
              </Button>
            }
          />
        }
      >
        <a
          class="ui-link"
          href="https://github.com/felix-bohlin/ui"
          interestfor="anchor-repo-card"
        >
          felix-bohlin/ui
        </a>
      </Anchor>{" "}
      on GitHub.
    </div>
  )
}
```

## Link preview

Preview where a link goes before following it. The card keeps its interactive content reachable, so the pointer can move from the link into the card without closing it.

```tsx
import { Anchor, Card } from "opui-css/solid"


export default function Example() {
  return (
    <div>
      Learn more about{" "}
      <Anchor
        alignment="block-end span-inline-end"
        trigger="hover"
        id="anchor-link-preview"
        anchored={
          <Card variant="elevated" class="link-preview">
            <img src="https://picsum.photos/id/1018/800/450" alt="" />
            <hgroup>
              <p class="ui-caption">developer.mozilla.org</p>
              <h3>CSS anchor positioning</h3>
              <p>
                Tether elements to other elements on the page, without
                JavaScript.
              </p>
            </hgroup>
          </Card>
        }
      >
        <a
          class="ui-link"
          href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning"
          interestfor="anchor-link-preview"
        >
          CSS anchor positioning
        </a>
      </Anchor>{" "}
      on MDN.
    </div>
  )
}
```

## Used by

- [Badge](https://open-props-ui.netlify.app/solid/components/badge.md)
- [Tooltip](https://open-props-ui.netlify.app/solid/components/tooltip.md)

## API

### Anchor API

| Prop        | Type                   | Default       | Description                                                                                                                                   |
| ----------- | ---------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `alignment` | `string`               | `"start end"` | Any valid `position-area` value. Controls where the floating content is placed.                                                               |
| `anchored`  | `Element`              | -             | The floating content.                                                                                                                         |
| `id`        | `string`               | -             | The id of the floating content when `trigger` is `"hover"` (add `interestfor` with the same id to the trigger), otherwise the id of the root. |
| `trigger`   | `"always"` , `"hover"` | `"always"`    | Shows the floating content always, or on hover and focus with `popover="hint"`.                                                               |

## Under the hood

1. Hint

   - `interestfor` opens it on hover and keyboard focus, no JavaScript
   - Only `<button>` and `<a href>` can be interest invokers
   - `popover="hint"` leaves open menus and dialogs alone
   - Without positioning it opens in the middle of the viewport

2. Tap

   - Touch screens can't hover, so a tap toggles the card instead
   - A link can't take `commandfor`, so tapping a link follows it

3. Anchor

   - `anchor-name` on the wrapper, `position-anchor` on the card
   - `anchor-scope` keeps the name local, so every anchor can reuse `--anchor`
   - `position-area` places it below, spanning towards the end

4. Flip

   - Scroll the trigger to the bottom of the window and hover it again
   - The browser tries each fallback when the card would overflow

Step 1 of 4: Hint

- [Interest invokers ](https://webstatus.dev/features/interest-invokers)(Limited availability): Chrome 142+, Edge 142+, Firefox not supported, Safari not supported
- [popover="hint" ](https://webstatus.dev/features/popover-hint)(Limited availability): Chrome 133+, Edge 133+, Firefox 149+, Safari not supported

```html
<button interestfor="card">felix-bohlin/ui</button>


<div class="card" id="card" popover="hint">…</div>
```

```css
.card {
  background-color: var(--surface-elevated);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-3);
  box-shadow: var(--shadow-3);
  color: inherit;
  inline-size: 18rem;
  padding: 1rem;
}
```

Step 2 of 4: Tap

- [Invoker commands ](https://webstatus.dev/features/invoker-commands)(Newly available): Chrome 135+, Edge 135+, Firefox 144+, Safari 26.2+

```html
<button
  interestfor="card"
  commandfor="card"
  command="toggle-popover"
>
  felix-bohlin/ui
</button>
```

Step 3 of 4: Anchor

- [Anchor positioning ](https://webstatus.dev/features/anchor-positioning)(Limited availability): Chrome 144+, Edge 144+, Firefox 151+, Safari 26+

```html
<span class="anchor">
  <button interestfor="card" …>felix-bohlin/ui</button>
  <div class="card" id="card" popover="hint">…</div>
</span>
```

```css
.anchor {
  anchor-name: --anchor;
  anchor-scope: --anchor;
}


.card {
  inset: auto;
  margin: 0.5rem 0 0;
  position-anchor: --anchor;
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
}
```

## Browser support

- Chromium: Full support Supported since v144.
- Firefox: Partial support Missing: interest-invokers.
- Safari: Partial support Missing: interest-invokers, popover-hint.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/solid/guide/browser-support/?components=Anchor.md).

## Installation

- `opui-css/css/components/anchor.css`

