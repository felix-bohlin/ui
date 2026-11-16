import { describe, expect, test } from "vitest"
import { astroMarkup, htmlMarkup } from "./example-markup"

describe("astroMarkup", () => {
  test("reads each tag's props with their static values, and nothing from inside other attributes", async () => {
    const { tags } = await astroMarkup(
      `<Chip description='Pick a size for > the size="small" chip' data-size="small" size="large" open />`,
    )
    expect(tags).toEqual([
      {
        component: true,
        name: "Chip",
        props: [
          {
            name: "description",
            value: 'Pick a size for > the size="small" chip',
          },
          { name: "data-size", value: "small" },
          { name: "size", value: "large" },
          { name: "open", value: undefined },
        ],
      },
    ])
  })

  test("reads string literals in expressions and template literals as static values, and leaves other expressions without one", async () => {
    const [{ props }] = (
      await astroMarkup(
        '<Chip a={"small"} b={("large" as const)} c=`medium` d={`x${y}`} e={size} {f} {...rest} />',
      )
    ).tags
    expect(props).toEqual([
      { name: "a", value: "small" },
      { name: "b", value: "large" },
      { name: "c", value: "medium" },
      { name: "d", value: undefined },
      { name: "e", value: undefined },
      { name: "f", value: undefined },
    ])
  })

  test("names components by their import, renamed and namespaced too, and HTML elements by their tag", async () => {
    const { tags } = await astroMarkup(
      [
        "---",
        'import { Chip as Tag, ListItem } from "opui-css/astro"',
        'import * as UI from "opui-css/astro"',
        "---",
        "<Tag />",
        "<ListItem />",
        "<UI.Button />",
        "<Card />",
        "<p></p>",
        "<opui-copy></opui-copy>",
      ].join("\n"),
    )
    expect(tags.map(({ component, name }) => [name, component])).toEqual([
      ["Chip", true],
      ["ListItem", true],
      ["Button", true],
      ["Card", true],
      ["p", false],
      ["opui-copy", false],
    ])
  })

  test("finds tags inside elements, slots, expressions and set:html, where a component name is only an HTML tag", async () => {
    const { tags } = await astroMarkup(
      [
        "---",
        'const items = ["a"]',
        "const markup = '<Badge size=\"small\"></Badge>'",
        "---",
        '<div><List><ListItem slot="start" /></List></div>',
        "{items.map((item) => <Chip label={item} />)}",
        "<Fragment set:html={markup} />",
      ].join("\n"),
    )
    expect(tags.map(({ component, name }) => [name, component])).toEqual([
      ["div", false],
      ["List", true],
      ["ListItem", true],
      ["Chip", true],
      ["Badge", false],
    ])
  })

  test("reads the text between tags as one run, through expressions and comments, and skips code", async () => {
    const { texts } = await astroMarkup(
      [
        "---",
        "const items = []",
        "---",
        "Bass news",
        '<p>Thanks for the jam, {name}. See you{" "}<!-- soon -->on Friday!</p>',
        "<p>{`Turn it up`}</p>",
        "<p>{items.length}</p>",
        '<p><strong>Rory</strong> booked a gig<span set:text="Tonight" /></p>',
        "{items.map((item) => <li>Item: {item}</li>)}",
        '<script>console.log("Label")</script>',
        "<style>p::after { content: 'Label' }</style>",
      ].join("\n"),
    )
    expect(texts).toEqual([
      "Bass news",
      "Thanks for the jam, {name}. See you on Friday!",
      "Turn it up",
      "Rory",
      "booked a gig",
      "Tonight",
      "Item: {item}",
    ])
  })

  test("reads set:html from a string const or a literal, and the string properties of the frontmatter", async () => {
    const markup = await astroMarkup(
      [
        "---",
        'const note = "<p>Gear Talk</p>"',
        "const photos = [{ alt: 'A fretless bass', size: 2 }, { 'label': `Low End` }]",
        "---",
        "<Fragment set:html={note} />",
        '<div set:html={"<em>Slap</em>"} />',
      ].join("\n"),
    )
    expect(markup.texts).toEqual(["Gear Talk", "Slap"])
    expect(markup.strings).toEqual([
      { key: "alt", value: "A fretless bass" },
      { key: "label", value: "Low End" },
    ])
  })
})

describe("htmlMarkup", () => {
  test("reads tags with their decoded attribute values and text runs, and skips code", () => {
    expect(
      htmlMarkup(
        '<p title="Bass &amp; drums">Rock &amp; roll, <!-- x -->all night</p><script>let a = "Label"</script>',
      ),
    ).toEqual({
      strings: [],
      tags: [
        {
          component: false,
          name: "p",
          props: [{ name: "title", value: "Bass & drums" }],
        },
        { component: false, name: "script", props: [] },
      ],
      texts: ["Rock & roll, all night"],
    })
  })
})
