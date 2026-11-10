import { describe, expect, test } from "vitest"
import { addHeadingAnchors } from "../../src/utils/heading-anchors"

const anchor = (id: string, text: string) =>
  `<a class="header-anchor" href="#${id}" aria-label="Permalink to &quot;${text}&quot;">&#8203;</a>`

describe("addHeadingAnchors", () => {
  test("wraps an h2 in a span, copies its text to data-heading and links its section", () => {
    expect(
      addHeadingAnchors(`<section id="basics"><h2>Basics</h2></section>`).html,
    ).toBe(
      `<section id="basics"><h2 data-heading="Basics"><span>Basics</span>${anchor("basics", "Basics")}</h2></section>`,
    )
  })

  test("links a heading by its own id and copies the text of an h2 only", () => {
    expect(
      addHeadingAnchors(
        `<section id="a"><p>Intro</p><h3 id="b">Sub</h3></section>`,
      ).html,
    ).toBe(
      `<section id="a"><p>Intro</p><h3 id="b"><span>Sub</span>${anchor("b", "Sub")}</h3></section>`,
    )
  })

  test("collapses whitespace and escapes the copied text", () => {
    expect(
      addHeadingAnchors(
        `<section id="x"><h2>\n  When <code>aria-busy="true"</code> &amp; more\n</h2></section>`,
      ).html,
    ).toBe(
      `<section id="x"><h2 data-heading="When aria-busy=&quot;true&quot; &amp; more"><span>\n  When <code>aria-busy="true"</code> &amp; more\n</span>${anchor("x", "When aria-busy=&quot;true&quot; &amp; more")}</h2></section>`,
    )
  })

  test("keeps a heading that has a span as it is, apart from the link", () => {
    expect(
      addHeadingAnchors(
        `<section id="props"><h2><span class="conditional">Props</span></h2></section>`,
      ).html,
    ).toBe(
      `<section id="props"><h2><span class="conditional">Props</span>${anchor("props", "Props")}</h2></section>`,
    )
  })

  test("adds no link without an id or twice, and neither a link nor data-heading to a visually hidden heading", () => {
    expect(
      addHeadingAnchors(
        `<h2>Untitled</h2><h2 id="sr" class="ui-sr-only">Hidden</h2><h3 id="has">Has<a class="header-anchor" href="#has"></a></h3>`,
      ).html,
    ).toBe(
      `<h2 data-heading="Untitled"><span>Untitled</span></h2><h2 id="sr" class="ui-sr-only"><span>Hidden</span></h2><h3 id="has"><span>Has<a class="header-anchor" href="#has"></a></span></h3>`,
    )
  })

  test("leaves headings in examples, cards, dialogs and hidden content alone", () => {
    const html = [
      `<div class="example-container"><h2 id="a">Example</h2></div>`,
      `<div class="ui-card"><h3 id="b">Card</h3></div>`,
      `<dialog><h2 id="c">Dialog</h2></dialog>`,
      `<div hidden><h2 id="d">Hidden</h2></div>`,
    ].join("")
    expect(addHeadingAnchors(html).html).toBe(html)
  })

  test("leaves headings in notes, statuses and inert content alone", () => {
    const html = [
      `<div role="note"><h2 id="a">Note</h2></div>`,
      `<div role="status"><h3 id="b">Status</h3></div>`,
      `<div inert><h2 id="c">Inert</h2></div>`,
    ].join("")
    expect(addHeadingAnchors(html)).toEqual({ headings: [], html })
  })

  test("lists each h2 with an id or a section to link, and each h3 and h4 with its own id", () => {
    expect(
      addHeadingAnchors(
        [
          `<section id="a"><h2>\n  One <code>two</code>\n</h2><h3 id="b">Sub</h3><h3>No id</h3><h4 id="c">Deep</h4><h5 id="d">Deeper</h5></section>`,
          `<h2 id="e" class="ui-sr-only">Hidden</h2><h2>Untitled</h2>`,
          `<section id="f"><h3>First</h3></section>`,
          `<div class="ui-card"><h2 id="g">Card</h2></div>`,
        ].join(""),
      ).headings,
    ).toEqual([
      { id: "a", level: 2, text: "One two" },
      { id: "b", level: 3, text: "Sub" },
      { id: "c", level: 4, text: "Deep" },
      { id: "e", level: 2, text: "Hidden" },
    ])
  })

  test("leaves the markup around the headings as it is", () => {
    const html = `<p class='a'>One<br>two</p><template><h2 id="t">Template</h2></template><svg viewBox="0 0 1 1"><path d="M0 0"/></svg>`
    expect(addHeadingAnchors(html).html).toBe(html)
  })
})
