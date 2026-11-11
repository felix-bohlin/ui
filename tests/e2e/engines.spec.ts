import { expect, test } from "@playwright/test"
import type { Page } from "@playwright/test"
import {
  ENGINE_BUGS,
  FIREFOX_SELF_RTL,
  FIREFOX_STALE_FALLBACK_OPACITY,
  FIREFOX_STICKY_ANCHOR_SCROLL,
  WEBKIT_ARROW_FOCUS_SCROLL,
  WEBKIT_HIGHLIGHT_HIDDEN_TEXT,
  WEBKIT_INNER_TEXT_HIDDEN_NODES,
  WEBKIT_RADIO_NO_WRAP,
  WEBKIT_RADIO_RTL_ARROWS,
  WEBKIT_TOP_LAYER_ANCHOR,
  failsIn,
  type EngineBug,
} from "./engine-bugs"

const reproduced = new Set<EngineBug>()

const repro = (bug: EngineBug, define: () => void) => {
  reproduced.add(bug)
  test.describe(bug, define)
}

const placement = (page: Page) =>
  page.evaluate(() => {
    const box = (id: string) =>
      document.getElementById(id)!.getBoundingClientRect()
    const round = (value: number) => Math.round(value) || 0
    const trigger = box("trigger")
    const popover = box("popover")
    return {
      below: round(popover.top - trigger.bottom),
      endEdge: round(popover.right - trigger.right),
      startEdge: round(popover.left - trigger.left),
    }
  })

const page = (
  body: string,
  area = "block-end span-inline-end",
) => `<!doctype html>
<style>
  body { margin: 0 }
  .spacer { block-size: 3000px }
  .center { display: flex; justify-content: center; padding-block-start: 200px }
  #popover { inline-size: 200px; inset: auto; margin: 0; position-area: ${area} }
</style>
${body}`

const trigger = `<button id="trigger" commandfor="popover" command="toggle-popover">Open</button><div id="popover" popover>Item</div>`

test("every engine bug has a repro", () => {
  expect(
    Object.values(ENGINE_BUGS)
      .flat()
      .filter((bug) => !reproduced.has(bug)),
    "every reason in engine-bugs.ts needs a plain-HTML repro here, in a repro() block titled with it",
  ).toEqual([])
})

repro(WEBKIT_TOP_LAYER_ANCHOR, () => {
  for (const container of ["modal dialog", "popover"]) {
    for (const scrolled of [false, true]) {
      test(`a popover anchored in a ${container} opens below its trigger ${scrolled ? "on a scrolled page" : "at the top of the page"}`, async ({
        browserName,
        page: tab,
      }) => {
        failsIn(
          browserName,
          scrolled ? { webkit: WEBKIT_TOP_LAYER_ANCHOR } : {},
        )
        await tab.setContent(
          page(
            container === "popover"
              ? `<div class="spacer"></div><div id="container" popover="manual">${trigger}</div><div class="spacer"></div>`
              : `<div class="spacer"></div><dialog id="container">${trigger}</dialog><div class="spacer"></div>`,
          ),
        )
        if (scrolled) await tab.evaluate(() => scrollTo(0, 2000))
        await tab.evaluate(() => {
          const element = document.getElementById("container")!
          if (element instanceof HTMLDialogElement) element.showModal()
          else element.showPopover()
        })
        await tab.locator("#trigger").click()
        await expect.poll(async () => (await placement(tab)).below).toBe(0)
      })
    }
  }

  test("a popover anchored in the page flow opens below its trigger on a scrolled page", async ({
    page: tab,
  }) => {
    await tab.setContent(
      page(`<div class="spacer"></div>${trigger}<div class="spacer"></div>`),
    )
    await tab.locator("#trigger").scrollIntoViewIfNeeded()
    await tab.locator("#trigger").click()
    await expect.poll(async () => (await placement(tab)).below).toBe(0)
  })
})

repro(FIREFOX_SELF_RTL, () => {
  test("self- position-area keywords mirror in a right-to-left part of the page", async ({
    browserName,
    page: tab,
  }) => {
    failsIn(browserName, { firefox: FIREFOX_SELF_RTL })
    await tab.setContent(
      page(
        `<div class="center" dir="rtl">${trigger}</div>`,
        "self-block-end span-self-inline-end",
      ),
    )
    await tab.locator("#trigger").click()
    await expect
      .poll(() => placement(tab))
      .toMatchObject({ below: 0, endEdge: 0 })
  })
})

repro(FIREFOX_STALE_FALLBACK_OPACITY, () => {
  for (const flipped of [false, true]) {
    test(`a popover a hover rule fades in reads the opacity it paints ${flipped ? "when a fallback flips it" : "in its first position"}`, async ({
      browserName,
      page: tab,
    }) => {
      failsIn(
        browserName,
        flipped ? { firefox: FIREFOX_STALE_FALLBACK_OPACITY } : {},
      )
      await tab.setContent(`<!doctype html>
<style>
  body { margin: 0 }
  .center { display: flex; justify-content: center; padding-block-start: ${flipped ? 0 : 200}px }
  #wrap { anchor-name: --wrap; display: inline-block }
  #popover { inset: auto; margin: 0; opacity: 0; position-anchor: --wrap; position-area: block-start; position-try-fallbacks: flip-block; transition: display 0.3s allow-discrete, opacity 0.3s, overlay 0.3s allow-discrete }
  #popover:popover-open { opacity: 1; @starting-style { opacity: 0 } }
  #wrap:has(> :hover) > #popover { display: block; opacity: 1; @starting-style { opacity: 0 } }
</style>
<div class="center"><span id="wrap"><button id="trigger">Open</button><span id="popover" popover="hint">Tip</span></span></div>`)
      await tab.hover("#trigger")
      await tab.evaluate(() =>
        document.getElementById("popover")!.showPopover(),
      )
      if (flipped) {
        await expect.poll(() => placement(tab)).toMatchObject({ below: 0 })
      }
      await expect
        .poll(() =>
          tab
            .locator("#popover")
            .evaluate((popover) => getComputedStyle(popover).opacity),
        )
        .toBe("1")
    })
  }
})

repro(FIREFOX_STICKY_ANCHOR_SCROLL, () => {
  for (const scrolled of [false, true]) {
    test(`a fixed element anchored to a sticky header lines up with it ${scrolled ? "on a scrolled page" : "at the top of the page"}`, async ({
      browserName,
      page: tab,
    }) => {
      failsIn(
        browserName,
        scrolled ? { firefox: FIREFOX_STICKY_ANCHOR_SCROLL } : {},
      )
      await tab.setContent(`<!doctype html>
<style>
  body { margin: 0 }
  #header { anchor-name: --header; block-size: 60px; inset-block-start: 16px; margin-block-start: 16px; position: sticky }
  #overlay { bottom: anchor(--header bottom); left: 0; position: fixed; right: 0; top: anchor(--header top) }
  .spacer { block-size: 3000px }
</style>
<div id="header">Header</div>
<div id="overlay"></div>
<div class="spacer"></div>`)
      if (scrolled) await tab.evaluate(() => scrollTo(0, 1000))
      await expect
        .poll(() =>
          tab.evaluate(() => {
            const box = (id: string) =>
              document.getElementById(id)!.getBoundingClientRect()
            return Math.round(box("overlay").top - box("header").top)
          }),
        )
        .toBe(0)
    })
  }
})

const splitButton = (start: string) => `<!doctype html>
<style>
  body { margin: 0; padding: 200px 0 0 ${start} }
  .group { display: inline-flex; overflow: hidden }
  #popover {
    inline-size: 12rem;
    inset: auto;
    margin: 0;
    opacity: 0;
    position-area: block-end span-inline-start;
    position-try-fallbacks: flip-inline;
    scale: 0.96;
    transition:
      display 0.3s allow-discrete,
      opacity 0.3s,
      overlay 0.3s allow-discrete,
      scale 0.3s;
  }
  #popover:popover-open {
    opacity: 1;
    scale: 1;
  }
  @starting-style {
    #popover:popover-open {
      opacity: 0;
      scale: 0.96;
    }
  }
  #popover button { display: block; inline-size: 100%; padding: 0.5rem }
</style>
<div class="group">
  <button>Save</button>
  <button id="trigger" commandfor="popover" command="toggle-popover">More</button>
  <div id="popover" popover>
    <button id="item" commandfor="popover" command="hide-popover">Save as draft</button>
    <button commandfor="popover" command="hide-popover">Save and publish</button>
  </div>
</div>`

test.describe("an item click closes an end aligned popover", () => {
  for (const fallback of [false, true]) {
    test(
      fallback ? "that a position-try fallback placed" : "at its own position",
      async ({ page: tab }) => {
        await tab.setContent(splitButton(fallback ? "8px" : "400px"))
        const popover = tab.locator("#popover")
        const open = async () => {
          await tab.locator("#trigger").click()
          await expect(popover).toBeVisible()
        }

        await open()
        // The opening transition can still be scaling it, so poll until it settles
        await expect
          .poll(
            () =>
              placement(tab).then(({ endEdge, startEdge }) =>
                fallback ? startEdge : endEdge,
              ),
            {
              message: fallback
                ? "the popover starts at its trigger"
                : "the popover ends at its trigger",
            },
          )
          .toBe(0)
        await popover.evaluate((element: HTMLElement) => element.hidePopover())
        await expect(popover).toBeHidden()

        const stillOpen: string[] = []
        for (const delay of [
          null,
          null,
          null,
          ...Array.from({ length: 12 }, (_, index) => index * 30),
        ]) {
          await open()
          if (delay === null) await tab.locator("#item").click()
          else {
            await tab.waitForTimeout(delay)
            await tab.locator("#item").click({ force: true })
          }
          const closed = await popover
            .waitFor({ state: "hidden", timeout: 2000 })
            .then(() => true)
            .catch(() => false)
          if (!closed) {
            stillOpen.push(delay === null ? "click" : `${delay}ms`)
            await popover.evaluate((element: HTMLElement) =>
              element.hidePopover(),
            )
            await expect(popover).toBeHidden()
          }
        }
        expect(stillOpen, "clicks after opening that left it open").toEqual([])
      },
    )
  }
})

const radios = (count: number) =>
  Array.from(
    { length: count },
    (_, index) =>
      `<input type="radio" name="group" id="radio-${index + 1}"${index === 0 ? " checked" : ""}><label for="radio-${index + 1}">Option ${index + 1}</label>`,
  ).join("")

repro(WEBKIT_RADIO_NO_WRAP, () => {
  test("the arrow keys wrap from the last radio of a group to the first", async ({
    browserName,
    page: tab,
  }) => {
    failsIn(browserName, { webkit: WEBKIT_RADIO_NO_WRAP })
    await tab.setContent(`<!doctype html>${radios(3)}`)
    await tab.locator("label").last().click()
    await expect(tab.locator("#radio-3")).toBeChecked()
    await tab.keyboard.press("ArrowRight")
    await expect(tab.locator("#radio-1")).toBeChecked()
  })
})

repro(WEBKIT_RADIO_RTL_ARROWS, () => {
  test("Left Arrow moves to the next radio of a right-to-left group", async ({
    browserName,
    page: tab,
  }) => {
    failsIn(browserName, { webkit: WEBKIT_RADIO_RTL_ARROWS })
    await tab.setContent(`<!doctype html><div dir="rtl">${radios(3)}</div>`)
    await tab.locator("label").first().click()
    await expect(tab.locator("#radio-1")).toBeChecked()
    await tab.keyboard.press("ArrowLeft")
    await expect(tab.locator("#radio-2")).toBeChecked()
  })
})

repro(WEBKIT_ARROW_FOCUS_SCROLL, () => {
  test("a scroll container scrolls to the clipped radio the arrow keys focus", async ({
    browserName,
    page: tab,
  }) => {
    failsIn(browserName, { webkit: WEBKIT_ARROW_FOCUS_SCROLL })
    await tab.setContent(`<!doctype html>
<style>
  #strip { display: grid; grid-auto-columns: max-content; inline-size: 16rem; overflow-x: auto; position: relative }
  input { block-size: 1lh; clip-path: inset(50%); grid-row: 1; inline-size: 1ch; inset-block-start: 50%; inset-inline-start: 50%; margin: 0; position: absolute }
  label { grid-row: 1; padding: 0.5rem 1.5rem; white-space: nowrap }
${Array.from({ length: 8 }, (_, index) => `  #radio-${index + 1} { grid-column: ${index + 1} }`).join("\n")}
</style>
<div id="strip">${radios(8)}</div>`)
    await tab.locator("label").first().click()
    for (let index = 1; index < 8; index++) {
      await tab.keyboard.press("ArrowRight")
    }
    await expect(tab.locator("#radio-8")).toBeFocused()
    await expect
      .poll(() =>
        tab.evaluate(() => {
          const strip = document
            .getElementById("strip")!
            .getBoundingClientRect()
          const last = document
            .querySelector("label:last-of-type")!
            .getBoundingClientRect()
          return last.left >= strip.left - 1 && last.right <= strip.right + 1
        }),
      )
      .toBe(true)
  })
})

const readers = (spaced: string, tight: string) => `<!doctype html>
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
<div id="spaced">${spaced}</div>
<div id="tight">${tight}</div>`

const READERS = {
  "a button with an open popover": [
    `<span class="tooltip">   <button type="button"> Save </button> <span class="floating" popover="manual"> Save your changes </span>   </span>`,
    `<span class="tooltip"><button type="button">Save</button><span class="floating" popover="manual">Save your changes</span></span>`,
  ],
  "a button with a visually hidden span after its text": [
    `<button class="counter" type="button">  +4<span class="hidden"> more reviewers</span>  </button>`,
    `<button class="counter" type="button">+4<span class="hidden">more reviewers</span></button>`,
  ],
  "a grid item of text before a visually hidden span": [
    `<ol class="steps">
  <li>
    Account
    <span class="hidden">, completed</span>
    <span class="description">Name and email</span>
  </li>
</ol>`,
    `<ol class="steps">  <li>  Account<span class="hidden">, completed</span> <span class="description"> Name and email  </span> </li>  </ol>`,
  ],
  "a list of grid items": [
    `<ol class="messages">  <li> <div class="avatar" aria-label="Saga" role="img">SN</div> <div class="content"> <p>Saga</p>   <p>Did you get a chance to look?</p>  <p class="footer"> <time>14:02</time>  </p> </div>  </li> <li> <div class="avatar" aria-label="Saga" role="img">SN</div> <div class="content"> <p>Saga</p>   <p>No rush.</p>  <p class="footer"> <time>14:03</time>  </p> </div>  </li>  </ol>`,
    `<ol class="messages"><!--[--><li><!--[--><div class="avatar" aria-label="Saga" role="img"><!--[-->SN<!--]--></div><!--]--><div class="content"><p>Saga</p><!--[--><p>Did you get a chance to look?</p><!--]--><p class="footer"><time>14:02</time><!----></p></div><!----></li><li><!--[--><div class="avatar" aria-label="Saga" role="img"><!--[-->SN<!--]--></div><!--]--><div class="content"><p>Saga</p><!--[--><p>No rush.</p><!--]--><p class="footer"><time>14:03</time><!----></p></div><!----></li><!--]--></ol>`,
  ],
  "a table with visually hidden labels": [
    `<table><thead>  <tr>  <th>  <label> <input type="checkbox"> <span class="hidden">Select all</span>  </label>  </th> <th> File </th> <th> Size </th>  </tr>  </thead> <tbody>  <tr>  <td>  <label> <input type="checkbox"> <span class="hidden">Select Invoice.pdf</span>  </label>  </td> <td> Invoice.pdf </td> <td> 120 kB </td>  </tr>  </tbody></table>`,
    `<table><thead><tr><th><label><input type="checkbox"> <span class="hidden">Select all</span> </label></th><th>File</th><th>Size</th></tr></thead><tbody><tr><td><label><input type="checkbox"> <span class="hidden">Select Invoice.pdf</span> </label></td><td>Invoice.pdf</td><td>120 kB</td></tr></tbody></table>`,
  ],
}

repro(WEBKIT_INNER_TEXT_HIDDEN_NODES, () => {
  for (const [name, [spacedMarkup, tightMarkup]] of Object.entries(READERS)) {
    test(`${name} reads the same with and without the whitespace and comments between its elements`, async ({
      browserName,
      page: tab,
    }) => {
      failsIn(browserName, { webkit: WEBKIT_INNER_TEXT_HIDDEN_NODES })
      await tab.setContent(readers(spacedMarkup, tightMarkup))
      await tab.evaluate(() => {
        for (const popover of document.querySelectorAll<HTMLElement>(
          "[popover]",
        )) {
          popover.showPopover()
        }
      })
      const [spaced, tight] = await tab.evaluate(() =>
        ["spaced", "tight"].map((id) => document.getElementById(id)!.innerText),
      )
      expect(tight).toBe(spaced)
    })
  }
})

repro(WEBKIT_HIGHLIGHT_HIDDEN_TEXT, () => {
  for (const kind of ["Range", "StaticRange"]) {
    test(`a highlight with a ${kind} paints text that is shown after it was added`, async ({
      browserName,
      page: tab,
    }) => {
      failsIn(
        browserName,
        kind === "StaticRange" ? { webkit: WEBKIT_HIGHLIGHT_HIDDEN_TEXT } : {},
      )
      await tab.setContent(`<!doctype html>
<style>
  pre { color: oklch(0 0 0); display: none; font-size: 40px }
  ::highlight(word) { color: oklch(0.628 0.258 29.2) }
</style>
<pre id="code">highlighted</pre>`)
      await tab.evaluate((kind) => {
        const text = document.getElementById("code")!.firstChild!
        const range =
          kind === "Range"
            ? new Range()
            : new StaticRange({
                endContainer: text,
                endOffset: 11,
                startContainer: text,
                startOffset: 0,
              })
        if (range instanceof Range) range.selectNodeContents(text)
        CSS.highlights.set("word", new Highlight(range))
      }, kind)
      await tab.evaluate(
        () =>
          new Promise((resolve) =>
            requestAnimationFrame(() =>
              requestAnimationFrame(() => resolve(null)),
            ),
          ),
      )
      await tab.locator("#code").evaluate((code) => {
        code.style.display = "block"
      })
      const screenshot = await tab.locator("#code").screenshot()
      const redPixels = await tab.evaluate(async (png) => {
        const image = await createImageBitmap(
          await (await fetch(`data:image/png;base64,${png}`)).blob(),
        )
        const canvas = new OffscreenCanvas(image.width, image.height)
        const context = canvas.getContext("2d")!
        context.drawImage(image, 0, 0)
        const { data } = context.getImageData(0, 0, image.width, image.height)
        let count = 0
        for (let index = 0; index < data.length; index += 4) {
          if (data[index] > 150 && data[index + 1] < 90 && data[index + 2] < 90)
            count++
        }
        return count
      }, screenshot.toString("base64"))
      expect(redPixels).toBeGreaterThan(0)
    })
  }
})
