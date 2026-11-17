# Upstream reports

Every report to post upstream before 6.0, ready to paste: the engine bugs behind the expected failures in `tests/e2e/engine-bugs.ts`, a comment for Vue, an issue for Astro, one filed issue to watch and one bug that still needs a repro.

## Firefox

File these on Bugzilla (bugzilla.mozilla.org, product Core). Search first with the keywords under each report, and comment on a match instead of filing a duplicate. Each test case is the plain-HTML repro from `tests/e2e/engines.spec.ts`, resolved into one file with a small script that logs the numbers the test checks. Once filed, add the report's link next to its constant in `tests/e2e/engine-bugs.ts`.

### position-area self- keywords in a right-to-left part of a left-to-right page

From: `FIREFOX_SELF_RTL` in `tests/e2e/engine-bugs.ts`, its repro in `tests/e2e/engines.spec.ts:104-121`, the Menu item under To check in `TODO.md` ("Menu: in Firefox, a menu in a `dir="rtl"` part of a left-to-right page") and the `firefox-rtl-menu` example in `src/todo-examples/`.

Where: Bugzilla, Core :: Layout: Positioned.

Search first: `position-area self rtl`, `span-self-inline-end`, `self-inline direction`. `TODO.md` notes that bug 2050613 (a `position-area` center-branch mix-up) and bug 2063785 (inline-split anchors) are related but not about direction.

Title:

```text
position-area self- keywords resolve toward the wrong inline side in a dir=rtl element inside a dir=ltr page
```

Summary: a popover with `position-area: self-block-end span-self-inline-end` sits in a `dir="rtl"` block of a left-to-right page and is anchored to its invoker button. The `self-` keywords follow the positioned element's own direction, so the right-to-left popover should open right below the button with its right edge at the button's right edge. Chromium and WebKit place it there in the same test. Firefox puts it far to the side: 447px off in the repo's CI. WPT's `position-area-ambiguous-self.html` covers the `self-` keywords under `direction: rtl`. opui's Menu, Tooltip and Anchor use these keywords, so in Firefox a right-to-left menu in a left-to-right page opens far from its button and its submenu leaves the viewport.

Test case:

<!-- prettier-ignore -->
```html
<!doctype html>
<style>
  body { margin: 0 }
  .center { display: flex; justify-content: center; padding-block-start: 200px }
  #popover { inline-size: 200px; inset: auto; margin: 0; position-area: self-block-end span-self-inline-end }
</style>
<div class="center" dir="rtl">
  <button id="trigger" commandfor="popover" command="toggle-popover">Open</button>
  <div id="popover" popover>Item</div>
</div>
<script>
  const trigger = document.getElementById("trigger")
  const popover = document.getElementById("popover")
  popover.addEventListener("toggle", (event) => {
    if (event.newState !== "open") return
    requestAnimationFrame(() => {
      const button = trigger.getBoundingClientRect()
      const box = popover.getBoundingClientRect()
      console.log(`below: ${Math.round(box.top - button.bottom)}px, right edge: ${Math.round(box.right - button.right)}px (both expected 0)`)
    })
  })
</script>
```

Steps to reproduce:

1. Open the test case.
2. Click Open.
3. Read the console line.

Expected result: the popover opens right below the button, with its right edge at the button's right edge: the console reads 0px and 0px.

Actual result: the popover lands to the side of the button, and the console's right edge reads hundreds of pixels (447px in the repo's CI).

Seen in Playwright's Firefox 155.0 (Playwright 1.63.0). Confirm in a Firefox release before filing.

### getComputedStyle keeps a mid-fade opacity after a position-try fallback

From: `FIREFOX_STALE_FALLBACK_OPACITY` in `tests/e2e/engine-bugs.ts`, its repro in `tests/e2e/engines.spec.ts:123-159`, the Tooltip item under To check in `TODO.md` ("Tooltip: in Firefox, `getComputedStyle` keeps reporting a tooltip's opacity"), which has the first draft of this report, and the `firefox-tooltip-fade` example in `src/todo-examples/`.

Where: Bugzilla, Core :: CSS Transitions and Animations.

Search first: `getComputedStyle opacity transition popover`, `position-try-fallbacks transition`, `stale computed style position-try`.

Title:

```text
getComputedStyle keeps a mid-transition opacity on a popover that a position-try fallback moved after a :hover rule started the transition
```

Summary: a `popover="hint"` with an opacity transition starts fading in from a `:hover` rule on its wrapper (`display: block; opacity: 1`, with `@starting-style`), then opens with `showPopover()`, and `position-try-fallbacks: flip-block` moves it below its anchor because it doesn't fit above. After the transition ends, `getComputedStyle()` keeps returning an opacity from partway through the fade, which never updates, while the popover paints fully opaque and `getAnimations()` is empty. Each part alone reads `1`: the hover fade, the opening and the fallback. With the anchor 200px down the page, so no fallback applies, the same steps read `1` too. Chromium and WebKit read `1` in the same test. Scripts that read the opacity get it wrong: in the repo, the axe contrast checks and the opacity waits on five tooltips of the overlays stress page fail in Firefox only, with readings between 0.09 and 0.99.

Test case:

<!-- prettier-ignore -->
```html
<!doctype html>
<style>
  body { margin: 0 }
  .center { display: flex; justify-content: center; padding-block-start: 0 }
  #wrap { anchor-name: --wrap; display: inline-block }
  #popover { inset: auto; margin: 0; opacity: 0; position-anchor: --wrap; position-area: block-start; position-try-fallbacks: flip-block; transition: display 0.3s allow-discrete, opacity 0.3s, overlay 0.3s allow-discrete }
  #popover:popover-open { opacity: 1; @starting-style { opacity: 0 } }
  #wrap:has(> :hover) > #popover { display: block; opacity: 1; @starting-style { opacity: 0 } }
</style>
<div class="center"><span id="wrap"><button id="trigger">Open</button><span id="popover" popover="hint">Tip</span></span></div>
<script>
  const trigger = document.getElementById("trigger")
  const popover = document.getElementById("popover")
  trigger.addEventListener("mouseenter", () => {
    setTimeout(() => {
      popover.showPopover()
      setTimeout(() => {
        const below = Math.round(popover.getBoundingClientRect().top - trigger.getBoundingClientRect().bottom)
        console.log(`below: ${below}px, computed opacity: ${getComputedStyle(popover).opacity}, animations: ${popover.getAnimations().length} (expected 0px, "1" and 0)`)
      }, 1000)
    }, 50)
  }, { once: true })
</script>
```

The script opens the popover 50 ms after the pointer enters the button, so the hover rule has started the fade first: the e2e test hovers, then calls `showPopover()` in a separate step.

Steps to reproduce:

1. Open the test case.
2. Move the pointer onto Open and keep it there for a second.
3. Read the console line.

Expected result: `below: 0px` (the fallback moved the popover under the button), a computed opacity of `"1"`, the opacity it paints, and no animations.

Actual result: `below: 0px` and no animations, but the computed opacity is a value between 0 and 1 from partway through the fade. Read again later, it stays the same (the e2e test polls for 5 seconds). Set `padding-block-start: 200px` on `.center`, so no fallback applies, and it reads `"1"`.

Seen in Playwright's Firefox 155.0 (Playwright 1.63.0). Confirm in a Firefox release before filing.

### A fixed element anchored inside a sticky header moves down by the page scroll

From: `FIREFOX_STICKY_ANCHOR_SCROLL` in `tests/e2e/engine-bugs.ts`, its repro in `tests/e2e/engines.spec.ts:161-198`, the docs header test it marks in `tests/e2e/docs.spec.ts` ("a long section heading takes the content width...") and commit a7385c1d, which found that the drift needs a second layout.

Where: Bugzilla, Core :: Layout: Positioned.

Search first: `anchor sticky scroll`, `anchor() position sticky fixed`, `anchor positioning scroll offset sticky`.

Title:

```text
A position: fixed element positioned with anchor() moves down by the page scroll when its anchor is inside a sticky header and it is laid out again
```

Summary: a `position: fixed` element's `top` and `bottom` use `anchor()` on an element inside a `position: sticky` header at the top of the page. On a scrolled page, once Firefox lays the fixed element out again (here after a change to its `inset-inline`), it places it lower than the anchor by the page's scroll offset, instead of on the header that is stuck at the top of the viewport. Before that layout it stays on the header. At the top of the page the same steps keep it on the header, and Chromium and WebKit keep it there on the scrolled page too. The opui docs site places the backdrop and panel of its sticky header this way (`src/components/Header.astro`).

Test case:

<!-- prettier-ignore -->
```html
<!doctype html>
<style>
  body { margin: 0 }
  #sticky { inset-block-start: 0; padding-block-start: 16px; position: sticky; z-index: 1 }
  #header { anchor-name: --header; block-size: 60px; margin-inline: auto; max-inline-size: 600px }
  #overlay { bottom: anchor(--header bottom); left: 0; position: fixed; right: 0; top: anchor(--header top) }
  .spacer { block-size: 3000px }
</style>
<div id="sticky"><header><div id="header">Header</div></header></div>
<div id="overlay"></div>
<div class="spacer"></div>
<script>
  const box = (id) => document.getElementById(id).getBoundingClientRect()
  scrollTo(0, 1000)
  requestAnimationFrame(() => {
    document.getElementById("overlay").style.insetInline = "8px"
    requestAnimationFrame(() => {
      console.log(`overlay top minus header top: ${Math.round(box("overlay").top - box("header").top)}px (expected 0)`)
    })
  })
</script>
```

Steps to reproduce:

1. Open the test case. The script scrolls the page down 1000px, waits a frame and changes the overlay's `inset-inline`, which lays it out again.
2. Read the console line.

Expected result: 0px: the overlay stays on the stuck header, as it does with the `scrollTo` line removed.

Actual result: the overlay sits below the header by the page scroll.

Seen in Playwright's Firefox 155.0 (Playwright 1.63.0). Confirm in a Firefox release before filing.

## WebKit

File these on bugs.webkit.org (product WebKit). Search first with the keywords under each report, and comment on a match instead of filing a duplicate. Each test case is the plain-HTML repro from `tests/e2e/engines.spec.ts`, resolved into one file. In Safari on macOS a click doesn't focus a radio button, so for the radio reports press Option+Tab to reach the group (or plain Tab with Safari Settings, Advanced, "Press Tab to highlight each item on a webpage" on). Once filed, add the report's link next to its constant in `tests/e2e/engine-bugs.ts`.

### Arrow-key focus doesn't bring a hidden radio's label fully into view

From: `WEBKIT_ARROW_FOCUS_SCROLL` in `tests/e2e/engine-bugs.ts`, its repro in `tests/e2e/engines.spec.ts:335-368`, and the overflow Tabs test it marks in `tests/e2e/interaction.spec.ts` ("overflow tabs scroll the focused tab into view").

Where: bugs.webkit.org, component Scrolling (or Forms).

Search first: `radio arrow key scroll into view`, `focus scroll clipped radio`, `scrollIntoView focus label`.

Title:

```text
Moving focus with the arrow keys to a visually hidden radio button doesn't scroll its label fully into view
```

Summary: a row of radio buttons sits in a horizontally scrolling grid. Each input is visually hidden (`position: absolute`, `clip-path: inset(50%)`, 1ch wide) in the middle of its label, the usual markup for tabs and segmented controls built on native radios. When the arrow keys move focus to a radio whose label is out of view, WebKit doesn't scroll the container far enough to show that label in full. Chromium and Firefox do in the same test. In opui's Tabs with overflow, the focused tab stays partly hidden.

Test case:

<!-- prettier-ignore -->
```html
<!doctype html>
<style>
  #strip { display: grid; grid-auto-columns: max-content; inline-size: 16rem; overflow-x: auto; position: relative }
  input { block-size: 1lh; clip-path: inset(50%); grid-row: 1; inline-size: 1ch; inset-block-start: 50%; inset-inline-start: 50%; margin: 0; position: absolute }
  label { grid-row: 1; padding: 0.5rem 1.5rem; white-space: nowrap }
  #radio-1 { grid-column: 1 }
  #radio-2 { grid-column: 2 }
  #radio-3 { grid-column: 3 }
  #radio-4 { grid-column: 4 }
  #radio-5 { grid-column: 5 }
  #radio-6 { grid-column: 6 }
  #radio-7 { grid-column: 7 }
  #radio-8 { grid-column: 8 }
</style>
<div id="strip">
  <input type="radio" name="group" id="radio-1" checked><label for="radio-1">Option 1</label>
  <input type="radio" name="group" id="radio-2"><label for="radio-2">Option 2</label>
  <input type="radio" name="group" id="radio-3"><label for="radio-3">Option 3</label>
  <input type="radio" name="group" id="radio-4"><label for="radio-4">Option 4</label>
  <input type="radio" name="group" id="radio-5"><label for="radio-5">Option 5</label>
  <input type="radio" name="group" id="radio-6"><label for="radio-6">Option 6</label>
  <input type="radio" name="group" id="radio-7"><label for="radio-7">Option 7</label>
  <input type="radio" name="group" id="radio-8"><label for="radio-8">Option 8</label>
</div>
<script>
  const strip = document.getElementById("strip")
  strip.addEventListener("focusin", (event) => {
    requestAnimationFrame(() => {
      const label = event.target.labels[0].getBoundingClientRect()
      const box = strip.getBoundingClientRect()
      const inView = label.left >= box.left - 1 && label.right <= box.right + 1
      console.log(`${event.target.id}: label fully in view: ${inView}`)
    })
  })
</script>
```

Steps to reproduce:

1. Open the test case.
2. Click Option 1 (in Safari, Option+Tab to it).
3. Press Right Arrow seven times, to Option 8.
4. Look at the strip and read the last console line.

Expected result: the strip scrolls so Option 8's label is fully inside it: the console reads `radio-8: label fully in view: true`.

Actual result: Option 8 has focus, but its label isn't fully inside the strip: the console reads `false`.

Seen in Playwright's WebKit 26.6 (Playwright 1.63.0). Confirm in a Safari release before filing.

### A StaticRange highlight isn't painted on text that was display: none

From: `WEBKIT_HIGHLIGHT_HIDDEN_TEXT` in `tests/e2e/engine-bugs.ts`, its repro in `tests/e2e/engines.spec.ts:446-506`, and the docs syntax highlighting in `src/utils/syntax-highlight.ts`, which registers `StaticRange`s and renews them when hidden code is revealed (`tests/e2e/docs.spec.ts`, `expectRenewedRanges`).

Where: bugs.webkit.org, component CSS (or Layout and Rendering).

Search first: `highlight StaticRange display none`, `CSS.highlights StaticRange not painted`, `custom highlight hidden element shown`.

Title:

```text
A custom highlight with a StaticRange isn't painted on text that was display: none when a frame rendered after the range was added
```

Summary: a custom highlight (`CSS.highlights`) is registered with a `StaticRange` over the text of a `display: none` element. A frame renders, then the element is shown. WebKit paints the text without the highlight. With a live `Range` over the same text, WebKit paints the highlight. Chromium and Firefox paint it with either range in the same test. Syntax highlighters that use `StaticRange` lose their colors in code that starts hidden, in a closed tab panel for example, until they register the ranges again.

Test case:

<!-- prettier-ignore -->
```html
<!doctype html>
<style>
  pre { color: oklch(0 0 0); display: none; font-size: 40px }
  ::highlight(word) { color: oklch(0.628 0.258 29.2) }
</style>
<pre id="code">highlighted</pre>
<script>
  const code = document.getElementById("code")
  const text = code.firstChild
  const range = new StaticRange({ endContainer: text, endOffset: 11, startContainer: text, startOffset: 0 })
  CSS.highlights.set("word", new Highlight(range))
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      code.style.display = "block"
    }),
  )
</script>
```

Steps to reproduce:

1. Open the test case. The script highlights the hidden text with a `StaticRange`, waits two animation frames and shows the `pre`.
2. Look at the word "highlighted".

Expected result: the word is red, the highlight's color.

Actual result: the word is black, without the highlight. Replace the `StaticRange` line with `const range = new Range(); range.selectNodeContents(text)` and the word is red.

Seen in Playwright's WebKit 26.6 (Playwright 1.63.0). Confirm in a Safari release before filing.

### innerText changes with the whitespace and comments between elements

From: `WEBKIT_INNER_TEXT_HIDDEN_NODES` in `tests/e2e/engine-bugs.ts`, its repro in `tests/e2e/engines.spec.ts:370-444`, and the Avatar, Message, Stepper and Tooltip cases it marks in `tests/e2e/example-text.spec.ts`.

Where: bugs.webkit.org, component DOM.

Search first: `innerText whitespace`, `innerText comment node`, `innerText absolutely positioned`, `innerText grid`.

Title:

```text
innerText of the same rendered elements differs depending on the whitespace and comments between them
```

Summary: whitespace-only text and comments between elements don't render, so they shouldn't change `innerText`. Each case below renders the same elements twice: once with the whitespace a server template writes and once tight, with the comment markers a framework writes for hydration. Chromium and Firefox return the same string for each pair. WebKit returns different strings for all five. The cases involve an open popover, visually hidden spans (`position: absolute`, `clip-path: inset(50%)`), grid items and a table. Text checks that compare server-rendered and hydrated markup fail in WebKit only.

Test case:

<!-- prettier-ignore -->
```html
<!doctype html>
<style>
  .avatar { display: flex; grid-area: start; margin-inline-end: 8px }
  .counter { align-items: center; display: inline-flex; justify-content: center; position: relative }
  .content { display: grid; gap: 4px; grid-area: content; padding: 8px 16px }
  .floating { margin: 8px; padding: 4px 8px }
  .footer { display: flex; gap: 4px }
  .hidden { block-size: 1px; clip-path: inset(50%); inline-size: 1px; overflow: hidden; position: absolute; white-space: nowrap }
  .messages { display: flex; flex-direction: column; gap: 4px; list-style: none; margin: 0; padding: 0 }
  .messages > li { display: grid; grid-template-areas: "start content" ". bottom"; grid-template-columns: 40px 1fr }
  .messages p { margin: 0 }
  .messages time { display: block }
  .steps { display: flex; list-style: none; margin: 0; padding: 0 }
  .steps .description { display: block }
  .steps > li { display: grid; position: relative }
  .tooltip { display: block }
  .tooltip > button { display: inline-flex }
  table { position: relative }
  table input { display: grid; position: relative }
  table label { display: flex }
</style>
<div data-case="a button with an open popover">
<div class="spaced"><span class="tooltip">   <button type="button"> Save </button> <span class="floating" popover="manual"> Save your changes </span>   </span></div>
<div class="tight"><span class="tooltip"><button type="button">Save</button><span class="floating" popover="manual">Save your changes</span></span></div>
</div>
<div data-case="a button with a visually hidden span after its text">
<div class="spaced"><button class="counter" type="button">  +4<span class="hidden"> more reviewers</span>  </button></div>
<div class="tight"><button class="counter" type="button">+4<span class="hidden">more reviewers</span></button></div>
</div>
<div data-case="a grid item of text before a visually hidden span">
<div class="spaced"><ol class="steps">
  <li>
    Account
    <span class="hidden">, completed</span>
    <span class="description">Name and email</span>
  </li>
</ol></div>
<div class="tight"><ol class="steps">  <li>  Account<span class="hidden">, completed</span> <span class="description"> Name and email  </span> </li>  </ol></div>
</div>
<div data-case="a list of grid items">
<div class="spaced"><ol class="messages">  <li> <div class="avatar" aria-label="Saga" role="img">SN</div> <div class="content"> <p>Saga</p>   <p>Did you get a chance to look?</p>  <p class="footer"> <time>14:02</time>  </p> </div>  </li> <li> <div class="avatar" aria-label="Saga" role="img">SN</div> <div class="content"> <p>Saga</p>   <p>No rush.</p>  <p class="footer"> <time>14:03</time>  </p> </div>  </li>  </ol></div>
<div class="tight"><ol class="messages"><!--[--><li><!--[--><div class="avatar" aria-label="Saga" role="img"><!--[-->SN<!--]--></div><!--]--><div class="content"><p>Saga</p><!--[--><p>Did you get a chance to look?</p><!--]--><p class="footer"><time>14:02</time><!----></p></div><!----></li><li><!--[--><div class="avatar" aria-label="Saga" role="img"><!--[-->SN<!--]--></div><!--]--><div class="content"><p>Saga</p><!--[--><p>No rush.</p><!--]--><p class="footer"><time>14:03</time><!----></p></div><!----></li><!--]--></ol></div>
</div>
<div data-case="a table with visually hidden labels">
<div class="spaced"><table><thead>  <tr>  <th>  <label> <input type="checkbox"> <span class="hidden">Select all</span>  </label>  </th> <th> File </th> <th> Size </th>  </tr>  </thead> <tbody>  <tr>  <td>  <label> <input type="checkbox"> <span class="hidden">Select Invoice.pdf</span>  </label>  </td> <td> Invoice.pdf </td> <td> 120 kB </td>  </tr>  </tbody></table></div>
<div class="tight"><table><thead><tr><th><label><input type="checkbox"> <span class="hidden">Select all</span> </label></th><th>File</th><th>Size</th></tr></thead><tbody><tr><td><label><input type="checkbox"> <span class="hidden">Select Invoice.pdf</span> </label></td><td>Invoice.pdf</td><td>120 kB</td></tr></tbody></table></div>
</div>
<script>
  for (const popover of document.querySelectorAll("[popover]")) {
    popover.showPopover()
  }
  for (const pair of document.querySelectorAll("[data-case]")) {
    const spaced = pair.querySelector(".spaced").innerText
    const tight = pair.querySelector(".tight").innerText
    console.log(`${pair.dataset.case}: ${spaced === tight ? "same" : "different"}`, JSON.stringify(spaced), JSON.stringify(tight))
  }
</script>
```

Steps to reproduce:

1. Open the test case. The script opens the two popovers, then reads `innerText` of both versions of each case.
2. Read the console: one line per case, with both strings.

Expected result: every line says `same`, as in Chromium and Firefox.

Actual result: every line says `different`. The e2e test puts one case on a page at a time: if a case reads `same` here, check it alone, with only its two `div`s in the body.

Seen in Playwright's WebKit 26.6 (Playwright 1.63.0). Confirm in a Safari release before filing.

### The arrow keys don't wrap from the last radio button to the first

From: `WEBKIT_RADIO_NO_WRAP` in `tests/e2e/engine-bugs.ts`, its repro in `tests/e2e/engines.spec.ts:300-319`, and the Tabs test it marks in `tests/e2e/interaction.spec.ts` ("tabs wrap between the last and the first tab with the arrow keys").

Where: bugs.webkit.org, component Forms.

Search first: `radio arrow keys wrap`, `radio group last first arrow`, `radio button keyboard navigation`.

Title:

```text
Right Arrow on the last radio button of a group doesn't move to the first one
```

Summary: in a group of three radio buttons, pressing Right Arrow on the last one should check the first one, as Chromium and Firefox do in the same test. WebKit stops at the last radio. Tab components built on native radio buttons, like opui's Tabs, can't wrap from the last tab to the first in Safari.

Test case:

<!-- prettier-ignore -->
```html
<!doctype html>
<input type="radio" name="group" id="radio-1" checked><label for="radio-1">Option 1</label>
<input type="radio" name="group" id="radio-2"><label for="radio-2">Option 2</label>
<input type="radio" name="group" id="radio-3"><label for="radio-3">Option 3</label>
```

Steps to reproduce:

1. Open the test case.
2. Click Option 3. In Safari on macOS, press Option+Tab to focus Option 1 and Right Arrow twice instead.
3. Press Right Arrow.

Expected result: Option 1 is checked.

Actual result: Option 3 stays checked.

Seen in Playwright's WebKit 26.6 (Playwright 1.63.0). Confirm in a Safari release before filing.

### Left Arrow moves to the previous radio button in right-to-left text

From: `WEBKIT_RADIO_RTL_ARROWS` in `tests/e2e/engine-bugs.ts`, its repro in `tests/e2e/engines.spec.ts:321-333`, and the Tabs and ToggleGroup right-to-left tests it marks in `tests/e2e/interaction.spec.ts`.

Where: bugs.webkit.org, component Forms.

Search first: `radio rtl arrow keys`, `radio right-to-left Left Arrow`, `arrow key direction rtl radio`.

Title:

```text
Left Arrow moves to the previous radio button in a right-to-left radio group instead of the next one
```

Summary: in a `dir="rtl"` group of radio buttons, the radios run from right to left, so Left Arrow should move to the next radio and Right Arrow to the previous one, as Chromium and Firefox do in the same test. WebKit takes Left Arrow as the previous radio in right-to-left text too, so the arrow keys move against the reading direction. opui's Tabs and ToggleGroup docs note that Safari always takes Left as the previous item.

Test case:

<!-- prettier-ignore -->
```html
<!doctype html>
<div dir="rtl">
  <input type="radio" name="group" id="radio-1" checked><label for="radio-1">Option 1</label>
  <input type="radio" name="group" id="radio-2"><label for="radio-2">Option 2</label>
  <input type="radio" name="group" id="radio-3"><label for="radio-3">Option 3</label>
</div>
```

Steps to reproduce:

1. Open the test case.
2. Click Option 1, at the right. In Safari on macOS, press Option+Tab to focus it instead.
3. Press Left Arrow.

Expected result: Option 2, to the left of Option 1, is checked.

Actual result: Option 2 isn't checked: WebKit takes Left Arrow as the previous radio.

Seen in Playwright's WebKit 26.6 (Playwright 1.63.0). Confirm in a Safari release before filing.

### A popover anchored inside a modal dialog moves up by the page scroll

From: `WEBKIT_TOP_LAYER_ANCHOR` in `tests/e2e/engine-bugs.ts`, its repro in `tests/e2e/engines.spec.ts:62-102`, the overlay scenarios it marks in `tests/e2e/stress-overlays.ts`, and the Menu, Tooltip item under To check in `TODO.md` ("Menu, Tooltip: in WebKit, a popover anchored to a trigger inside a modal Dialog").

Status: already on file. `TODO.md` records that WebKit bug 304551, "incorrect anchor positioning when a fixed-positioned element and its anchor are both in the top layer", was closed as a duplicate of bug 301023. Don't file a new one: open bug 301023, and if it's still open and its test case has no scrolled page, add this test case as a comment. Then link 301023 next to `WEBKIT_TOP_LAYER_ANCHOR`.

Where: bugs.webkit.org, bug 301023 (component CSS).

Search first: `anchor top layer scroll`, `anchor positioning dialog scroll`, `position-area popover dialog scrolled`, to find 301023 and anything newer.

Title, for a new report only if 301023 turns out to be something else:

```text
A popover anchored to a button inside a modal dialog or another popover is offset by the page scroll
```

Summary: a popover opened from a button inside a modal `<dialog>` is anchored to that button through its invoker and placed with `position-area: block-end span-inline-end`. At the top of the page it opens right below the button. On a scrolled page, WebKit moves it up by the page's scroll offset, out of view. The same happens when the button is inside a `popover="manual"` instead of a dialog. A popover anchored in the normal page flow is placed right on a scrolled page, and Chromium and Firefox place it right in every case. In opui, menus and tooltips in a dialog, drawer or menu far down a page open far above their trigger in Safari.

Test case:

<!-- prettier-ignore -->
```html
<!doctype html>
<style>
  body { margin: 0 }
  .spacer { block-size: 3000px }
  #popover { inline-size: 200px; inset: auto; margin: 0; position-area: block-end span-inline-end }
</style>
<div class="spacer"></div>
<dialog id="container"><button id="trigger" commandfor="popover" command="toggle-popover">Open</button><div id="popover" popover>Item</div></dialog>
<div class="spacer"></div>
<script>
  scrollTo(0, 2000)
  document.getElementById("container").showModal()
  const trigger = document.getElementById("trigger")
  const popover = document.getElementById("popover")
  popover.addEventListener("toggle", (event) => {
    if (event.newState !== "open") return
    requestAnimationFrame(() => {
      const gap = popover.getBoundingClientRect().top - trigger.getBoundingClientRect().bottom
      console.log(`popover top minus trigger bottom: ${Math.round(gap)}px (expected 0)`)
    })
  })
</script>
```

Steps to reproduce:

1. Open the test case. The script scrolls the page down 2000px and opens the modal dialog.
2. Click Open in the dialog.
3. Read the console line.

Expected result: the popover opens right below the button: the console reads 0px.

Actual result: the popover sits above the button by the page scroll. Remove the `scrollTo` line and it opens right below the button. For the popover case, write `<div id="container" popover="manual">` and `</div>` in place of the `dialog` tags and call `showPopover()` instead of `showModal()`.

Seen in Playwright's WebKit 26.6 (Playwright 1.63.0). Confirm in a Safari release before filing.

## Vue

### Comment on vuejs/core#13608: the customizable select markup warnings

From: the `vue-select-comment` example in `src/todo-examples/vue-select-comment.html` (the `/todo` page), the Select item under Limitations in `TODO.md` ("Select: in `vite dev` and `nuxi dev`, the Vue compiler warns"), `packages/opui/components/Select/Select.vue:123-126` and `KNOWN_VUE_WARNINGS` in `packages/opui/scripts/build-frameworks.mjs`.

Where: a comment on [vuejs/core#13608](https://github.com/vuejs/core/issues/13608), not a new issue, with a thumbs up on [vuejs/core#13720](https://github.com/vuejs/core/pull/13720), the open pull request that widens `onlyValidChildren.select`.

Search first: open #13608 and #13720 to check they're still open and nobody has posted the same thing, and search vuejs/core issues for `cannot be child of <select>`, `base-select` and `selectedcontent` for anything newer. Related: #13778 and #13158 ask for customizable select support, #13616 is another open fix, and #14975 closed without a merge.

Checked against: Vue 3.5.45, installed in `node_modules` and the latest release on npm. Its `@vue/compiler-dom` still allows only `optgroup`, `option` and `hr` in `select`, and only its development build runs the check, so builds with `NODE_ENV=production` don't warn.

Changed from the `/todo` draft, after the latest note on the Select item: the package's Vue entry points now resolve to compiled JavaScript, so apps that install it no longer compile the Select template or see the warnings. Only this repo's own dev server, which compiles the `.vue` sources, still warns. The first paragraph says so now, and a second one names who still gets the warnings.

Comment:

````text
Still seeing this in 3.5.45. A component that writes the customizable select markup (`appearance: base-select`) gets two warnings whenever the dev server compiles it, also when no page renders it, because the compiler checks the template when it compiles it:

```
[Vue warn]: <button> cannot be child of <select>, according to HTML specifications. This can cause hydration errors or potentially disrupt future functionality.
[Vue warn]: <div> cannot be child of <select>, according to HTML specifications. This can cause hydration errors or potentially disrupt future functionality.
```

We ship such a Select in a component library. The package now ships its Vue components compiled, so apps that install it no longer see the warnings, but the library's own docs site, which compiles the `.vue` sources in its Vite dev server, prints both on every start, and so does any app that writes this markup in its own SFC.

Minimal template:

```vue
<template>
  <select>
    <button>
      <selectedcontent></selectedcontent>
    </button>
    <div class="list">
      <option value="a">A</option>
      <option value="b">B</option>
    </div>
  </select>
</template>
```

The HTML spec now allows this content model (https://html.spec.whatwg.org/multipage/form-elements.html#the-select-element: an optional leading `button`, then `option`, `optgroup`, `hr` and `div`, plus script-supporting elements), and the relaxed HTML parser that ships with the customizable select keeps the `button` and the `div` inside the `select`, so there is no hydration mismatch in the browsers that render it. Production builds don't warn.

#13720 updates `onlyValidChildren.select` to that content model; it would remove both warnings here. Is anything blocking it?
````

Once a Vue release widens the rule: update `vue`, remove `KNOWN_VUE_WARNINGS` from `packages/opui/scripts/build-frameworks.mjs` and the Select item from `TODO.md`.

## Astro

### New issue: the dev CSS collector compiles the files behind `?raw` imports

From: the `astro-raw-issue` example in `src/todo-examples/astro-raw-issue.html` (the `/todo` page), the Tooling item under Limitations in `TODO.md` ("Tooling: on the first request after `astro dev` starts, Astro's CSS collector"), the `opui-raw-without-module-edge` plugin in `astro.config.mjs:130-138` and its check in `tests/unit/tooling-bugs.test.ts:39-55`.

Where: a new issue at [github.com/withastro/astro/issues/new/choose](https://github.com/withastro/astro/issues/new/choose), with the Bug report form. Paste each block below into the field it names.

Search first: withastro/astro issues and pull requests for `ensureModulesLoaded`, `?raw dev`, `raw import first request slow` and `vite-plugin-css raw`. When the draft was written, none mentioned it.

Versions: the repo has Astro 7.4.5 installed (`node_modules/astro`). The draft was first checked against Astro 7.3.6, where the timings below were measured, and then against 7.4.5. The latest `TODO.md` note on the item says Astro 7.4.9 moved `ensureModulesLoaded` into `@astrojs/vite-plugin-astro` 0.1.0 (`dist/internal/vite-plugin-css/collect.js`), where it still descends into `?raw` modules, so the one-line fix goes there now. On 2026-11-12 npm has Astro 7.4.11, which depends on `@astrojs/vite-plugin-astro` 0.1.2: its `collect.js` still has no `?raw` check in `ensureModulesLoaded` and already defines `rawRE`. Before posting, run `npm view astro version` and look at `collect.js` in the latest `@astrojs/vite-plugin-astro` again.

Title:

```text
Dev: first request compiles every module behind `?raw` imports (`ensureModulesLoaded` follows the edge `collectCSSWithOrder` skips)
```

Astro Info (from `pnpm exec astro info` in the repo; run it again before posting):

```text
Astro                    v7.4.5
Node                     v26.10.0
System                   Linux (x64)
Package Manager          pnpm
Output                   static
Adapter                  none
Integrations             opui-out-dir
                         @astrojs/vue
                         @astrojs/sitemap
                         @astrojs/svelte
                         @astrojs/react
                         llms

Also read against Astro 7.4.11, the latest release: since 7.4.9, `ensureModulesLoaded` lives in `@astrojs/vite-plugin-astro` (`dist/internal/vite-plugin-css/collect.js`, version 0.1.2 in 7.4.11) and still descends into `?raw` modules.
```

Describe the Bug:

````text
On the first request after `astro dev` starts, the CSS collector calls `ensureModulesLoaded(env, mod)` on the page module. It walks `mod.importedModules` recursively and `fetchModule()`s every module it reaches that has no `transformResult` yet, dynamic imports included. Since Astro 7.4.9 the function lives in `@astrojs/vite-plugin-astro` (`dist/internal/vite-plugin-css/collect.js`); before that it was in `astro/dist/vite-plugin-css/index.js`.

Vite adds a module graph edge from `file.ext?raw` to `file.ext`, so `ensureModulesLoaded` follows a `?raw` import into the file itself, compiles it as a module, and then everything that file imports. `collectCSSWithOrder`, in the same file, already stops at `?raw`:

```js
} else if (id.endsWith("?raw")) {
  return;
}
```

`ensureModulesLoaded` has no such check, so a page that globs source files as text (a docs site showing component source, for example) compiles all of them as modules on its first request. On our docs site that is about 3,000 modules and 9 seconds for the first component page; the edge alone costs 2.8s on a page that only imports examples as `?raw` (11.5s without a workaround, 8.7s with it, measured on Astro 7.3.6).

Steps to reproduce:

1. `src/components/A.astro`, `B.astro` and `C.astro`: any components (each can import something heavy to make the cost visible).
2. `src/pages/index.astro` globs them as text (below).
3. `astro dev`, open `/` and watch the server log (`DEBUG=vite:transform`): A, B and C are transformed as modules, although the page only uses their text.

```astro
---
const sources = import.meta.glob("../components/*.astro", {
  eager: true,
  import: "default",
  query: "?raw",
})
---

<pre>{Object.keys(sources).join("\n")}</pre>
```

Workaround: a `serve`-only Vite plugin with `enforce: "pre"` that loads `?raw` ids itself (`export default ${JSON.stringify(readFileSync(file, "utf-8"))}`), so Vite adds no edge to the file.
````

What's the expected result?

````text
`ensureModulesLoaded` skips `?raw` modules like `collectCSSWithOrder` does, so nothing behind a `?raw` import is compiled. A one-line fix in its loop, in `@astrojs/vite-plugin-astro`'s `dist/internal/vite-plugin-css/collect.js`, where `rawRE` is already defined:

```js
if (rawRE.test(imp.id)) continue;
```

(or `imp.id.endsWith("?raw")`, matching `collectCSSWithOrder`). With it, the repro compiles nothing behind the glob, and a page with 300 `?raw` examples goes from 2.0s to 0.6s on its first request.
````

Link to Minimal Reproducible Example: start a StackBlitz from [astro.new/minimal](https://astro.new/minimal), add the four files below, run `DEBUG=vite:transform npm run dev` in its terminal to check that A, B and C are transformed, and paste the StackBlitz link.

`src/pages/index.astro`:

```text
---
const sources = import.meta.glob("../components/*.astro", {
  eager: true,
  import: "default",
  query: "?raw",
})
---

<pre>{Object.keys(sources).join("\n")}</pre>
```

`src/components/A.astro`, and the same as `B.astro` and `C.astro`:

```text
---
import "../styles/heavy.css"
---

<p>A component whose source the page shows as text.</p>
```

`src/styles/heavy.css`, any CSS for the import:

```text
p { margin: 0 }
```

Once a release skips `?raw` in `ensureModulesLoaded`, `tests/unit/tooling-bugs.test.ts` fails: remove `opui-raw-without-module-edge` from `astro.config.mjs`, then the test. When the repo moves to Astro 7.4.9 or later, that test has to read `collect.js` in `@astrojs/vite-plugin-astro` instead of `astro/dist/vite-plugin-css/index.js`, which no longer has the function, or it stops testing anything.

## Watching

### withastro/compiler-rs#216: line breaks in component children with `compact: "jsx"`

From: the Tooling items under Suggestions in `TODO.md`: the open one ("Tooling: the site builds with `compressHTML: true` and oxfmt formats with the matching `compressHTML: "html"`") and the fixed one before it that switched the repo from Prettier to oxfmt. Settings: `astro.config.mjs:72` and `.oxfmtrc.json:3`.

Where: already filed as [withastro/compiler-rs#216](https://github.com/withastro/compiler-rs/issues/216). Nothing to post; subscribe to it.

The bug, in the fixed item's Blocked note:

> with `compact: "jsx"`, `@astrojs/compiler-rs` 0.5.1 and 0.5.2 drop the line breaks next to tags in elements but keep them in the children of a component and in a `<Fragment slot>`, so `<W><a>group</a>\n  .</W>` renders "group .". The docs prose sits in those children.

Watch for: #216 closing with a fix and an `@astrojs/compiler-rs` release that has it. The repo has 0.5.2 installed and npm has 0.5.3, and the item's latest note says:

> `@astrojs/compiler-rs` 0.5.3 is out (the repo has 0.5.2). Run the before and after comparison with it before waiting longer on compiler-rs#216.

What to change once it's fixed, from the item's Fix note:

> once [withastro/compiler-rs#216](https://github.com/withastro/compiler-rs/issues/216) is fixed and `@astrojs/compiler-rs` is updated, delete `compressHTML: true` from `astro.config.mjs` and the `astro` option from `.oxfmtrc.json` (keep `"astro": {}` so oxfmt still formats `.astro`), run `pnpm format` and `pnpm build`, and compare the text each built page renders before and after. Measured with 0.5.1 and 0.5.2, 240 of 339 pages rendered different text.

## Needs a repro

### WebKit: the Range fill animation keeps `/theme-builder/` redrawing at idle

From: the Range item under Bugs in `TODO.md` ("Range: in WebKit, the fill animation (`ui-range-fill` on the `--ui-range-thumb` view timeline) keeps `/theme-builder/` rendering"), `packages/opui/css/components/range.css:285-305` (the fill animation), `packages/opui/css/components/range.css:377-378` (the thumb's view timeline) and `src/components/ThemeBuilder/PreviewSpecimen.astro:185`.

Not ready to file: there is no plain-HTML repro yet.

What was measured, in Playwright's WebKit (WebKitGTK 2.52): with nothing changing, `/theme-builder/` renders a new frame about every 45 ms, and the main thread is busy for 3.5 s of every 4 s. It comes from the fill animation of the two Range inputs in the preview specimen, 1,900 px below the viewport: with their animation off it is 0.4 s. Chromium shows no idle cost. A plain page with the same Range markup and `dist/opui.css` costs only 0.1 to 0.2 s per 3 s, also inside `.ui-palette`, so the repro still needs the part of the builder that makes it expensive. Every theme builder action is slow in WebKit because of it, and the theme builder e2e tests have timed out in the WebKit engine job.

What's left, in Safari:

1. Open `/theme-builder/` (`pnpm dev` or the Netlify preview), leave it idle, and record a few seconds in Web Inspector's Timelines tab. If Safari doesn't render frames at idle, note that on the item: the cost may be WebKitGTK's alone.
2. If it does, reduce it: start from a plain page with the Range markup and `dist/opui.css` inside `.ui-palette`, and add the builder's pieces one at a time (the preview's containers, `content-visibility: auto`, the `.ui-palette` panes and the page's custom properties) until the idle cost appears.
3. With a repro, search bugs.webkit.org for `view-timeline idle`, `scroll-driven animation repaint` and `animation-timeline continuous rendering`, then file it (component Animations, or Layout and Rendering) with the repro as its test case.
4. Add the reason to `tests/e2e/engine-bugs.ts` with the repro in `tests/e2e/engines.spec.ts`, and mark the theme builder tests slow in WebKit for it (option A on the item).
