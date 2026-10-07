# Tooltip

Built on top of [Anchor](https://open-props-ui.netlify.app/html/components/anchor.md).

Add the `.ui-tooltip` class alongside `.ui-anchor` on the wrapper. Wire `interestfor` on the trigger to the `.ui-anchor-floating[popover="hint"]` element's ID.

### What's new

- The [arrow](#arrow) points at the trigger in every position, also after a flip.

## Basics

### Text only...

Set the tooltip text inside `.ui-anchor-floating[popover="hint"]`.

```html
<span class="ui-anchor ui-tooltip">
  <button
    type="button"
    class="ui-button"
    interestfor="tooltip-basic"
    commandfor="tooltip-basic"
    command="toggle-popover"
  >
    Save
  </button>
  <span class="ui-anchor-floating" id="tooltip-basic" popover="hint"
    >Save your changes</span
  >
</span>
```

### ... or any markup you want

You can place any markup you want (famous last words) inside `.ui-anchor-floating[popover="hint"]`, not only text.

```html
<span class="ui-anchor ui-tooltip">
  <button
    type="button"
    class="ui-button"
    interestfor="tooltip-rich"
    commandfor="tooltip-rich"
    command="toggle-popover"
  >
    Keyboard shortcuts
  </button>
  <span class="ui-anchor-floating" id="tooltip-rich" popover="hint">
    Press <kbd>⌘</kbd> + <kbd>K</kbd> to open the command palette.
  </span>
</span>
```

## Alignment

Set `--anchor-position-area` on the parent with your preferred `position-area` value.

```html
<div class="tooltip-alignment-grid">
  <span
    class="ui-anchor ui-tooltip"
    style="--anchor-position-area: block-start"
  >
    <button
      type="button"
      class="ui-button"
      interestfor="tooltip-top"
      commandfor="tooltip-top"
      command="toggle-popover"
    >
      Top
    </button>
    <span class="ui-anchor-floating" id="tooltip-top" popover="hint"
      >Above</span
    >
  </span>
  <span
    class="ui-anchor ui-tooltip"
    style="--anchor-position-area: inline-start"
  >
    <button
      type="button"
      class="ui-button"
      interestfor="tooltip-start"
      commandfor="tooltip-start"
      command="toggle-popover"
    >
      Start
    </button>
    <span class="ui-anchor-floating" id="tooltip-start" popover="hint"
      >Before</span
    >
  </span>
  <span class="ui-anchor ui-tooltip" style="--anchor-position-area: inline-end">
    <button
      type="button"
      class="ui-button"
      interestfor="tooltip-end"
      commandfor="tooltip-end"
      command="toggle-popover"
    >
      End
    </button>
    <span class="ui-anchor-floating" id="tooltip-end" popover="hint"
      >After</span
    >
  </span>
  <span class="ui-anchor ui-tooltip" style="--anchor-position-area: block-end">
    <button
      type="button"
      class="ui-button"
      interestfor="tooltip-bottom"
      commandfor="tooltip-bottom"
      command="toggle-popover"
    >
      Bottom
    </button>
    <span class="ui-anchor-floating" id="tooltip-bottom" popover="hint"
      >Below</span
    >
  </span>
</div>


<style>
  .tooltip-alignment-grid {
    display: grid;
    gap: var(--size-3);
    grid-template-areas:
      ".     top    .  "
      "start .      end"
      ".     bottom .  ";
    justify-items: center;
    align-items: center;
  }


  .tooltip-alignment-grid > :nth-child(1) {
    grid-area: top;
  }


  .tooltip-alignment-grid > :nth-child(2) {
    grid-area: start;
  }


  .tooltip-alignment-grid > :nth-child(3) {
    grid-area: end;
  }


  .tooltip-alignment-grid > :nth-child(4) {
    grid-area: bottom;
  }
</style>
```

## Arrow

Add the `.ui-with-arrow` class on the `.ui-tooltip`. This would be cool to solve with `corner-shape` one day.

```html
<span class="ui-anchor ui-tooltip ui-with-arrow">
  <button
    type="button"
    class="ui-button"
    interestfor="tooltip-arrow"
    commandfor="tooltip-arrow"
    command="toggle-popover"
  >
    Save
  </button>
  <span class="ui-anchor-floating" id="tooltip-arrow" popover="hint"
    >Save your changes</span
  >
</span>
```

## API

### Tooltip API

| Type     | Modifiers                | Default       | Description                                                            |
| -------- | ------------------------ | ------------- | ---------------------------------------------------------------------- |
| Arrow    | `.ui-with-arrow`         | -             | Adds an arrow that points to the trigger.                              |
| Position | `--anchor-position-area` | `block-start` | Any valid `position-area` value. Controls where the tooltip is placed. |

#### Parts

| Part                  | Description                                            |
| --------------------- | ------------------------------------------------------ |
| `.ui-tooltip`         | Container element.                                     |
| `& > :first-child`    | The trigger that shows the tooltip on hover and focus. |
| `.ui-anchor-floating` | The tooltip, a `popover="hint"`.                       |

#### CSS variables

| Variable            | Default                                     | Description                                                                                                                                                                                              |
| ------------------- | ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--border-width`    | `1px`                                       | Default border width for components that draw a border.                                                                                                                                                  |
| `--duration`        | `0.2s`                                      | Default transition duration. Multiplied by `--motion`.                                                                                                                                                   |
| `--ease-enter`      | `var(--ease-out-3)`                         | Easing for elements entering the screen.                                                                                                                                                                 |
| `--font-size-05`    | `0.875rem`                                  | A font size between Open Props `--font-size-0` and `--font-size-1`, used for labels and compact text.                                                                                                    |
| `--motion`          | `1`                                         | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/html/guide/theming.md#motion). |
| `--surface-inverse` | `light-dark(var(--gray-15), var(--gray-2))` | Background of `Toast` and `Tooltip`, inverted against the page.                                                                                                                                          |
| `--text-inverse`    | `light-dark(var(--gray-1), var(--gray-15))` | Text color on `--surface-inverse`.                                                                                                                                                                       |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md) for the full list.

Also add `.ui-anchor` to the root. Give `.ui-anchor-floating` `popover="hint"` and an id, and add `interestfor` with that id to the trigger.

## Under the hood

Read the post: [Tooltips with interestfor](https://open-props-ui.netlify.app/learn/tooltip-interest-invokers)

1. Hint

   - `interestfor` + `popover="hint"`: opens on hover and focus, no JavaScript
   - `commandfor` toggles it on tap, where there is no hover
   - The invoker is the implicit anchor: no `anchor-name`, no ids to wire
   - `position-area: block-start` centers it above the trigger

2. Size

   - Hover the icon: long text wraps at `240px`
   - `calc-size()` keeps long text at least `10rem` wide near an edge, short text stays snug
   - `text-wrap: pretty` avoids a lonely last word

3. Shift

   - Scroll the trigger to the top of the window and hover it again
   - The two `@position-try` rules slide it sideways at the edge of the window, keeping it over the trigger
   - `anchors-visible` hides it when the trigger scrolls out of view

4. Arrow

   - Hover Share: a rotated square, centered on the tooltip's edge
   - The tooltip is its own anchor, the wrapper names the trigger
   - `clamp()` moves the arrow towards the trigger's center but keeps it on the tooltip's edge
   - So it still points at the trigger after a flip or a shift

5. Fade

   - `@starting-style` fades it in from `opacity: 0`
   - `allow-discrete` keeps `display` and `overlay` alive while it fades out
   - `--motion` is `0` under reduced motion and with `.ui-motion-off`

Step 1 of 5: Hint

- [Anchor positioning ](https://webstatus.dev/features/anchor-positioning)(Limited availability): Chrome 144+, Edge 144+, Firefox 151+, Safari 26+
- [Interest invokers ](https://webstatus.dev/features/interest-invokers)(Limited availability): Chrome 142+, Edge 142+, Firefox not supported, Safari not supported
- [Invoker commands ](https://webstatus.dev/features/invoker-commands)(Newly available): Chrome 135+, Edge 135+, Firefox 144+, Safari 26.2+
- [popover="hint" ](https://webstatus.dev/features/popover-hint)(Limited availability): Chrome 133+, Edge 133+, Firefox 149+, Safari not supported

```html
<button
  type="button"
  interestfor="tooltip"
  commandfor="tooltip"
  command="toggle-popover"
>
  Save
</button>


<span class="tooltip" id="tooltip" popover="hint">Save changes</span>
```

```css
.tooltip {
  background-color: var(--surface-inverse);
  border: 0;
  border-radius: var(--radius-2);
  color: var(--text-inverse);
  font-size: var(--font-size-05);
  inset: auto;
  line-height: 1.3;
  margin: 0.5rem;
  padding: 0.25rem 0.5rem;
  position-area: block-start;
}
```

Step 2 of 5: Size

- [`calc-size()` ](https://webstatus.dev/features/calc-size)(Limited availability): Chrome 129+, Edge 129+, Firefox not supported, Safari not supported
- [text-wrap: pretty ](https://webstatus.dev/features/text-wrap-pretty)(Limited availability): Chrome 117+, Edge 117+, Firefox not supported, Safari 26+

```css
.tooltip {
  max-inline-size: 240px;
  min-inline-size: calc-size(max-content, min(size, 10rem));
  text-align: center;
  text-wrap: pretty;
}
```

Step 3 of 5: Shift

```css
.tooltip {
  position-try-fallbacks:
    flip-block,
    --build-tooltip-shift-start,
    --build-tooltip-shift-end,
    --build-tooltip-shift-start flip-block,
    --build-tooltip-shift-end flip-block;
  position-visibility: anchors-visible;
}
```

Step 4 of 5: Arrow

- [Anchor positioning ](https://webstatus.dev/features/anchor-positioning)(Limited availability): Chrome 144+, Edge 144+, Firefox 151+, Safari 26+
- [`min(), max(), and clamp()` ](https://webstatus.dev/features/min-max-clamp)(Widely available): Chrome 79+, Edge 79+, Firefox 75+, Safari 13.1+

```html
<span class="anchor">
  <button type="button" interestfor="share" …>Share</button>
  <span class="tooltip arrow" id="share" popover="hint">Copy a link</span>
</span>
```

```css
.anchor {
  anchor-name: --anchor;
  anchor-scope: --anchor;
}


.tooltip.arrow {
  anchor-name: --tooltip;
  anchor-scope: --tooltip;
  margin: 0.75rem;
}


.tooltip.arrow::before {
  background-color: inherit;
  block-size: 0.5rem;
  content: "";
  inline-size: 0.5rem;
  inset-block-start: clamp(
    anchor(--tooltip self-start),
    anchor(--anchor center),
    anchor(--tooltip self-end)
  );
  inset-inline-start: clamp(
    anchor(--tooltip self-start),
    anchor(--anchor center),
    anchor(--tooltip self-end)
  );
  margin: -0.25rem;
  position: fixed;
  rotate: 45deg;
}
```

Step 5 of 5: Fade

- [display animation ](https://webstatus.dev/features/display-animation)(Limited availability): Chrome 117+, Edge 117+, Firefox not supported, Safari 18+
- [`overlay` ](https://webstatus.dev/features/overlay)(Limited availability): Chrome 117+, Edge 117+, Firefox not supported, Safari not supported
- [`@starting-style` ](https://webstatus.dev/features/starting-style)(Newly available): Chrome 117+, Edge 117+, Firefox 129+, Safari 17.5+
- [`transition-behavior` ](https://webstatus.dev/features/transition-behavior)(Newly available): Chrome 117+, Edge 117+, Firefox 129+, Safari 17.4+

```css
.tooltip {
  opacity: 0;
  transition:
    display calc(0.2s * var(--motion, 1)) allow-discrete,
    opacity calc(0.2s * var(--motion, 1)),
    overlay calc(0.2s * var(--motion, 1)) allow-discrete;
}


.tooltip:popover-open {
  opacity: 1;


  @starting-style {
    opacity: 0;
  }
}
```

## Browser support

- Chromium: Full support Supported since v144.
- Firefox: Partial support Missing: calc-size, display-animation, interest-invokers, overlay, text-wrap-pretty.
- Safari: Partial support Missing: calc-size, interest-invokers, overlay, popover-hint.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/html/guide/browser-support/?components=Tooltip.md).

## Installation

- `opui-css/css/components/tooltip.css`
- `opui-css/css/components/anchor.css`

## See also

- [Anchor](https://open-props-ui.netlify.app/html/components/anchor.md)
