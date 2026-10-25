# Anchor

A structural primitive to enable CSS Anchor Positioning on stuff.

## Anatomy

Floating content

- `.ui-anchor`

  Container element. Scopes the anchor to its content.

- `& > :first-child`

  The content the floating content is anchored to.

- `.ui-floating`

  The floating content.

## Always visible

Floating content that is always shown, like a coach mark beside a button. Set `--ui-anchor-position-area` on `.ui-anchor` to any `position-area` value to place it.

```html
<span class="ui-anchor" style="--ui-anchor-position-area: inline-end">
  <button type="button" class="ui-button ui-outlined">Export</button>
  <span class="ui-floating">
    <div class="ui-card ui-tonal coach-mark">
      <div class="ui-content">
        <strong>New</strong> Export to PDF and CSV from the same menu.
      </div>
    </div>
  </span>
</span>

<style>
  .coach-mark {
    font-size: var(--ui-font-size-body);
    margin-inline-start: var(--ui-space-2);
    max-inline-size: 220px;
  }
</style>
```

## Hover trigger

Add `popover="hint"` and an id to `.ui-floating`, and `interestfor` with that id on the trigger.

[Under the hood](#under-the-hood) shows how hover, focus and tap open the card.

Put a [Card](https://open-props-ui.netlify.app/html/components/card.md) in the floating content for hover cards like GitHub's repository previews. Align the card below the trigger with `block-end span-inline-end`. It flips to the other side when there isn't room. The card keeps its interactive content reachable, so the pointer can move from the link into the card without closing it.

```html
<div>
  The source lives in
  <span
    class="ui-anchor"
    style="--ui-anchor-position-area: block-end span-inline-end"
  >
    <a
      class="ui-link"
      href="https://github.com/felix-bohlin/ui"
      interestfor="anchor-repo-card-1"
      >felix-bohlin/ui</a
    >
    <span class="ui-floating" id="anchor-repo-card-1" popover="hint">
      <div class="ui-card ui-elevated repo-card">
        <div class="ui-content">
          <div class="repo-card-identity">
            <div class="ui-avatar ui-rounded">
              <img src="https://github.com/felix-bohlin.png" alt="" />
            </div>
            <div>
              <strong>felix-bohlin/ui</strong>
              <span class="ui-caption">Public repository</span>
            </div>
          </div>
          <p>
            A CSS UI library exploring how next-gen HTML &amp; CSS features can
            change the way we create components.
          </p>
          <p class="ui-caption">CSS, MIT license</p>
        </div>
        <div class="ui-actions">
          <button type="button" class="ui-button ui-outlined ui-small">
            Star
          </button>
        </div>
      </div>
    </span>
  </span>
  on GitHub.
</div>

<style>
  .repo-card {
    font-size: var(--ui-font-size-small);
    inline-size: 280px;
    margin-block-start: var(--ui-space-2);
  }

  .repo-card .ui-content {
    display: grid;
    gap: var(--ui-space-2);
  }

  .repo-card-identity {
    align-items: center;
    display: flex;
    gap: var(--ui-space-3);
  }

  .repo-card-identity > div {
    display: grid;
  }
</style>
```

## Link preview

Preview where a link goes before following it.

```html
<div>
  Learn more about
  <span
    class="ui-anchor"
    style="--ui-anchor-position-area: block-end span-inline-end"
  >
    <a
      class="ui-link"
      href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning"
      interestfor="anchor-link-preview-1"
      >CSS anchor positioning</a
    >
    <span class="ui-floating" id="anchor-link-preview-1" popover="hint">
      <div class="ui-card ui-elevated link-preview">
        <img src="https://picsum.photos/id/1018/800/450" alt="" />
        <hgroup class="ui-header">
          <p class="ui-caption">developer.mozilla.org</p>
          <h3>CSS anchor positioning</h3>
          <p>
            Tether elements to other elements on the page, without JavaScript.
          </p>
        </hgroup>
      </div>
    </span>
  </span>
  on MDN.
</div>

<style>
  .link-preview {
    inline-size: 280px;
    margin-block-start: var(--ui-space-2);
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
    font-size: var(--ui-font-size-400);
    margin-block: var(--ui-space-1);
  }
</style>
```

## API

### Anchor API

| Type | Modifiers | Default | Description |
| --- | --- | --- | --- |
| Position | `--ui-anchor-position-area` | `self-start self-end` | Any valid `position-area` value. Controls where the floating content is placed. The `self-` keywords follow the content's own direction, so the placement mirrors in a right-to-left part of a left-to-right page. |
| Trigger | `.ui-floating[popover="hint"]` | - | Shows the floating content on hover and focus with `popover="hint"`. Without it, the content always shows. |

#### Parts

| Part | Description |
| --- | --- |
| `.ui-anchor` | Container element. Scopes the anchor to its content. |
| `& > :first-child` | The content the floating content is anchored to. |
| `.ui-floating` | The floating content. |

To show on hover, give `.ui-floating` `popover="hint"` and an id. Add `interestfor` with that id to the trigger.

## Component properties

Set these on the component itself, inline or in your own CSS. Inputs are the knobs. Outputs are derived from the inputs and the current state, so overriding one fixes it in every state. [Customizing](https://open-props-ui.netlify.app/html/guide/customizing.md#component-properties) has examples.

| Property | Kind | Description |
| --- | --- | --- |
| `--_shift-x` | Input | Horizontal shift of `.ui-floating`. Defaults to `0`. |
| `--_shift-y` | Input | Vertical shift of `.ui-floating`. Defaults to `0`. |

## Installation

### Used by

- [Badge](https://open-props-ui.netlify.app/html/components/badge.md)
- [Tooltip](https://open-props-ui.netlify.app/html/components/tooltip.md)

Copy the CSS into your project to own it. It reads tokens from Open Props, `palette.css` and `theme.css`, so those go on the page too, after `layers.css`. See [Getting started](https://open-props-ui.netlify.app/html/guide/getting-started.md).

- `opui-css/css/components/anchor.css`
