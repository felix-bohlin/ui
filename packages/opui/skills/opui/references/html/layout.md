# Layout

Five classes for the space between components: `.ui-layout-column`, `.ui-layout-row`, `.ui-layout-grid`, `.ui-layout-media` and `.ui-layout-container`. Put them on wrapper elements, such as `div`, `section` or `ul`. They sit in the `utils` layer, so on a component they replace its own layout. Their gaps come from the [`--ui-space-*` scale](https://open-props-ui.netlify.app/html/guide/theming.md#spacing), so they follow `--ui-space-scale`.

## Column

`.ui-layout-column` stacks its children in a column with even space between them.

```html
<div class="ui-layout-column">
  <div class="ui-card ui-outlined">
    <div class="ui-content">First</div>
  </div>
  <div class="ui-card ui-outlined">
    <div class="ui-content">Second</div>
  </div>
  <div class="ui-card ui-outlined">
    <div class="ui-content">Third</div>
  </div>
</div>
```

## Row

`.ui-layout-row` puts its children in a row, centered on one line, and wraps them when they run out of room. Set `--_justify-content` to push them to the end.

```html
<div class="ui-layout-row">
  <button type="button" class="ui-button ui-filled ui-primary">Save</button>
  <button type="button" class="ui-button ui-outlined">Preview</button>
  <button type="button" class="ui-button ui-outlined">Share</button>
  <button type="button" class="ui-button">Cancel</button>
</div>
```

### Spread

`.ui-spread` pushes the children to the two ends of the row. A page header is a spread row around a heading group and a row of actions.

```html
<div class="ui-layout-row ui-spread">
  <hgroup class="ui-hgroup">
    <p>Projects</p>
    <h2 class="ui-h4">Website relaunch</h2>
  </hgroup>
  <div class="ui-layout-row ui-small">
    <button type="button" class="ui-button ui-outlined">Share</button>
    <button type="button" class="ui-button ui-filled ui-primary">
      New task
    </button>
  </div>
</div>
```

## Grid

`.ui-layout-grid` fills the width with as many columns as fit at `--_min-inline-size` (`16rem` by default), and wraps the rest. No breakpoints: it follows the space it has.

```html
<div class="ui-layout-grid" style="--_min-inline-size: 10rem">
  <div class="ui-card ui-outlined">
    <div class="ui-content">One</div>
  </div>
  <div class="ui-card ui-outlined">
    <div class="ui-content">Two</div>
  </div>
  <div class="ui-card ui-outlined">
    <div class="ui-content">Three</div>
  </div>
  <div class="ui-card ui-outlined">
    <div class="ui-content">Four</div>
  </div>
  <div class="ui-card ui-outlined">
    <div class="ui-content">Five</div>
  </div>
  <div class="ui-card ui-outlined">
    <div class="ui-content">Six</div>
  </div>
</div>
```

### Lists

On a `ul` or `ol`, `.ui-layout-row` and `.ui-layout-grid` drop the bullets and the list margins, and a `.ui-card` alone in an `li` of a grid fills its cell, so the cards in a row share one height.

```html
<ul class="ui-layout-grid" style="--_min-inline-size: 10rem">
  <li>
    <div class="ui-card ui-outlined">
      <div class="ui-content">Design</div>
    </div>
  </li>
  <li>
    <div class="ui-card ui-outlined">
      <div class="ui-content">
        Engineering, with a longer description that wraps onto a second line.
      </div>
    </div>
  </li>
  <li>
    <div class="ui-card ui-outlined">
      <div class="ui-content">Support</div>
    </div>
  </li>
</ul>
```

## Media

`.ui-layout-media` puts a fixed-size start, such as an avatar or an icon, next to text. The last child fills the rest of the row, truncates instead of pushing the row wider, and its paragraphs lose their margins. The size classes set the gap.

```html
<div class="ui-layout-media">
  <div class="ui-avatar" role="img" aria-label="Lena Ek">LE</div>
  <div>
    <p>Lena Ek</p>
    <p class="ui-caption">Product designer, joined in March</p>
  </div>
</div>
```

## Gap

The size classes set the gap of `.ui-layout-column`, `.ui-layout-row` and `.ui-layout-grid`: `.ui-x-small` is `--ui-space-1`, `.ui-small` `--ui-space-2`, the default `--ui-space-3` and `.ui-large` `--ui-space-5`. For anything else, set `--_gap`. On a `p` or a `span`, `.ui-small` also makes the text smaller, so put a small layout on a `div`.

```html
<div class="ui-layout-column">
  <div class="ui-layout-row ui-x-small">
    <button type="button" class="ui-button ui-outlined">One</button>
    <button type="button" class="ui-button ui-outlined">Two</button>
    <button type="button" class="ui-button ui-outlined">Three</button>
  </div>
  <div class="ui-layout-row ui-small">
    <button type="button" class="ui-button ui-outlined">One</button>
    <button type="button" class="ui-button ui-outlined">Two</button>
    <button type="button" class="ui-button ui-outlined">Three</button>
  </div>
  <div class="ui-layout-row">
    <button type="button" class="ui-button ui-outlined">One</button>
    <button type="button" class="ui-button ui-outlined">Two</button>
    <button type="button" class="ui-button ui-outlined">Three</button>
  </div>
  <div class="ui-layout-row ui-large">
    <button type="button" class="ui-button ui-outlined">One</button>
    <button type="button" class="ui-button ui-outlined">Two</button>
    <button type="button" class="ui-button ui-outlined">Three</button>
  </div>
</div>
```

## Container

`.ui-layout-container` centers its content, caps its width at `--_max-inline-size` (`72rem` by default) and keeps `--_padding-inline` from the edges. Combine the classes to lay out a whole section:

```html
<div class="ui-layout-container" style="--_max-inline-size: 40rem">
  <div class="ui-layout-column ui-large">
    <div class="ui-layout-column ui-x-small">
      <h3 class="ui-h4">Team</h3>
      <p>Invite people to work on this project.</p>
    </div>
    <div class="ui-layout-grid" style="--_min-inline-size: 10rem">
      <div class="ui-card ui-tonal">
        <div class="ui-content">Design</div>
      </div>
      <div class="ui-card ui-tonal">
        <div class="ui-content">Engineering</div>
      </div>
      <div class="ui-card ui-tonal">
        <div class="ui-content">Support</div>
      </div>
    </div>
    <div class="ui-layout-row" style="--_justify-content: flex-end">
      <button type="button" class="ui-button">Cancel</button>
      <button type="button" class="ui-button ui-filled ui-primary">
        Invite
      </button>
    </div>
  </div>
</div>
```

## Breakpoints

The layout classes need none, but a page that changes shape uses the same three container widths everywhere, so similar layouts reflow at the same point. Measure the container, not the viewport, with `container-type: inline-size` on the wrapper:

- `40rem`: two columns, such as a form next to its summary, or a toolbar that stops wrapping.
- `56rem`: a sidebar next to the content, or three columns.
- `72rem`: three panes, such as folders, a list and a reading pane.

```css
.page {
  container-type: inline-size;
}

@container (inline-size >= 40rem) {
  .page-columns {
    grid-template-columns: 1fr 1fr;
  }
}
```

## API

| Type | Modifiers | Default | Description |
| --- | --- | --- | --- |
| Column | `.ui-layout-column` | - | A column with even space between its children. |
| Container | `.ui-layout-container` | - | Centers its content and caps its width. |
| Grid | `.ui-layout-grid` | - | Columns that fill the width and wrap. On a `ul` or `ol` it also drops the list bullets and margins, and a `.ui-card` in each `li` fills its cell. |
| Media | `.ui-layout-media` | - | A media object: a fixed-size start, such as an avatar, next to text that fills the rest and truncates. |
| Row | `.ui-layout-row` | - | A wrapping row with its children centered on one line. On a `ul` or `ol` it also drops the list bullets and margins. |
| Sizes | default, `.ui-large`, `.ui-small`, `.ui-x-small` | default | The space between children of `.ui-layout-column`, `.ui-layout-row`, `.ui-layout-grid` and `.ui-layout-media`. |
| Spread | `.ui-spread` | - | Pushes the children of `.ui-layout-row` to its two ends, for a page header with a heading group and its actions. |

### Parts

| Part | Description |
| --- | --- |
| `.ui-layout-column, .ui-layout-row, .ui-layout-grid, .ui-layout-media, .ui-layout-container` | Any element. The classes only set its layout. |

### CSS variables

| Variable | Default | Description |
| --- | --- | --- |
| `--ui-space-1` | `calc(0.25rem * var(--ui-space-scale))` | Spacing step 1: `0.25rem` times `--ui-space-scale`. |
| `--ui-space-2` | `calc(0.5rem * var(--ui-space-scale))` | Spacing step 2: `0.5rem` times `--ui-space-scale`. |
| `--ui-space-3` | `calc(1rem * var(--ui-space-scale))` | Spacing step 3: `1rem` times `--ui-space-scale`. |
| `--ui-space-4` | `calc(1.25rem * var(--ui-space-scale))` | Spacing step 4: `1.25rem` times `--ui-space-scale`. |
| `--ui-space-5` | `calc(1.5rem * var(--ui-space-scale))` | Spacing step 5: `1.5rem` times `--ui-space-scale`. |

The stylesheets on this page read these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md).

## Component properties

Set these on the component itself, inline or in your own CSS. Inputs are the knobs. Outputs are derived from the inputs and the current state, so overriding one fixes it in every state. [Customizing](https://open-props-ui.netlify.app/html/guide/customizing.md#component-properties) has examples.

| Property | Kind | Description |
| --- | --- | --- |
| `--_gap` | Input | Space between the children of `.ui-layout-column`, `.ui-layout-row`, `.ui-layout-grid` and `.ui-layout-media`. Defaults to `--ui-space-3`, set by the size classes. |
| `--_justify-content` | Input | How `.ui-layout-row` distributes its children along the row, such as `flex-end`. `.ui-spread` sets it to `space-between`. |
| `--_max-inline-size` | Input | Maximum width of `.ui-layout-container`. |
| `--_min-inline-size` | Input | Narrowest column of `.ui-layout-grid`. Columns are added while they fit at this width. |
| `--_padding-inline` | Input | Inline padding of `.ui-layout-container`. Defaults to `--ui-space-4`. |

## Installation

Copy the CSS into your project to own it. It reads tokens from Open Props, `palette.css` and `theme.css`, so those go on the page too, after `layers.css`. See [Getting started](https://open-props-ui.netlify.app/html/guide/getting-started.md).

- `opui-css/css/components/layout.css`

## Used in blocks

- [Account settings](https://open-props-ui.netlify.app/blocks/account-settings.md)
- [Analytics dashboard](https://open-props-ui.netlify.app/blocks/analytics-dashboard.md)
- [App shell](https://open-props-ui.netlify.app/blocks/app-shell.md)
- [Billing](https://open-props-ui.netlify.app/blocks/billing.md)
- [Blog list](https://open-props-ui.netlify.app/blocks/blog-list.md)
- [Changelog](https://open-props-ui.netlify.app/blocks/changelog.md)
- [Chat](https://open-props-ui.netlify.app/blocks/chat.md)
- [Checkout](https://open-props-ui.netlify.app/blocks/checkout.md)
- [Data table](https://open-props-ui.netlify.app/blocks/data-table.md)
- [Empty states](https://open-props-ui.netlify.app/blocks/empty-states.md)
- [Error page](https://open-props-ui.netlify.app/blocks/error-page.md)
- [FAQ](https://open-props-ui.netlify.app/blocks/faq.md)
- [Feature grid](https://open-props-ui.netlify.app/blocks/feature-grid.md)
- [File manager](https://open-props-ui.netlify.app/blocks/file-manager.md)
- [Forgot password](https://open-props-ui.netlify.app/blocks/forgot-password.md)
- [Hero](https://open-props-ui.netlify.app/blocks/hero.md)
- [Inbox](https://open-props-ui.netlify.app/blocks/inbox.md)
- [Invoice](https://open-props-ui.netlify.app/blocks/invoice.md)
- [Kanban board](https://open-props-ui.netlify.app/blocks/kanban-board.md)
- [Newsletter](https://open-props-ui.netlify.app/blocks/newsletter.md)
- [Notification settings](https://open-props-ui.netlify.app/blocks/notification-settings.md)
- [Notifications](https://open-props-ui.netlify.app/blocks/notifications.md)
- [Onboarding checklist](https://open-props-ui.netlify.app/blocks/onboarding-checklist.md)
- [Order history](https://open-props-ui.netlify.app/blocks/order-history.md)
- [Pricing](https://open-props-ui.netlify.app/blocks/pricing.md)
- [Product detail](https://open-props-ui.netlify.app/blocks/product-detail.md)
- [Project overview](https://open-props-ui.netlify.app/blocks/project-overview.md)
- [Sales dashboard](https://open-props-ui.netlify.app/blocks/sales-dashboard.md)
- [Server status](https://open-props-ui.netlify.app/blocks/server-status.md)
- [Shopping cart](https://open-props-ui.netlify.app/blocks/shopping-cart.md)
- [Sign in](https://open-props-ui.netlify.app/blocks/sign-in.md)
- [Sign up](https://open-props-ui.netlify.app/blocks/sign-up.md)
- [Team members](https://open-props-ui.netlify.app/blocks/team-members.md)
- [Testimonials](https://open-props-ui.netlify.app/blocks/testimonials.md)
- [Two-factor authentication](https://open-props-ui.netlify.app/blocks/two-factor.md)
- [User directory](https://open-props-ui.netlify.app/blocks/user-directory.md)
